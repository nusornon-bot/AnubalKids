import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  Unsubscribe,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebaseDb';
import { ChildProfile, Grade } from '../types';

export interface ClassroomRoom {
  roomId: string;
  roomCode: string; // 6-character uppercase code e.g. "KID829"
  name: string; // e.g. "ห้องอนุบาล 2/1 ดอกกล้วยไม้"
  teacherName: string;
  grade: Grade | 'ALL';
  targetActivity: string; // 'all' | 'quiz' | 'skill_games' | specific category
  targetStars: number;
  status: 'active' | 'paused' | 'closed';
  createdAt: string;
  updatedAt: string;
  teacherCheer?: {
    id: string;
    type: 'heart' | 'star' | 'clap' | 'cheer';
    message: string;
    targetStudentId?: string; // empty means all students
    timestamp: number;
  } | null;
  broadcastAlert?: {
    id: string;
    type: 'bell' | 'freeze' | 'celebrate' | 'message';
    message: string;
    timestamp: number;
  } | null;
}

export interface ClassroomStudent {
  studentId: string;
  studentName: string;
  avatar: string;
  avatarBg?: string;
  grade: Grade;
  currentGame: string; // e.g. "จับคู่ภาพเหมือน & ภาพสัมพันธ์"
  currentLevel: string; // e.g. "ด่านที่ 3"
  starsEarned: number;
  score: number;
  accuracy: number;
  status: 'active' | 'idle' | 'need_help' | 'completed';
  helpRequested: boolean;
  helpMessage?: string;
  lastActive: number; // Date.now()
  joinedAt: number;
}

const LOCAL_STORAGE_ACTIVE_ROOM_KEY = 'kid_classroom_active_room';
const LOCAL_STORAGE_TEACHER_ROOM_KEY = 'kid_classroom_teacher_room';

// ==========================================
// ROOM CODE GENERATION & NORMALIZATION
// ==========================================
export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function normalizeRoomCode(input: string): string {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
}

// ==========================================
// TEACHER: CREATE & MANAGE ROOM
// ==========================================
export async function createClassroomRoom(data: {
  name: string;
  teacherName: string;
  grade: Grade | 'ALL';
  targetActivity?: string;
  targetStars?: number;
}): Promise<ClassroomRoom> {
  const roomCode = generateRoomCode();
  const roomId = `room_${roomCode.toLowerCase()}_${Date.now().toString(36)}`;
  const nowIso = new Date().toISOString();

  const room: ClassroomRoom = {
    roomId,
    roomCode,
    name: data.name.trim() || `ห้องเรียนจำลอง ${roomCode}`,
    teacherName: data.teacherName.trim() || 'คุณครูประจำชั้น',
    grade: data.grade || 'ALL',
    targetActivity: data.targetActivity || 'all',
    targetStars: data.targetStars || 30,
    status: 'active',
    createdAt: nowIso,
    updatedAt: nowIso,
    teacherCheer: null,
    broadcastAlert: null,
  };

  const roomDocRef = doc(db, 'classroom_rooms', roomId);
  await setDoc(roomDocRef, room);

  // Store in teacher local storage
  saveTeacherActiveRoom(room);
  return room;
}

export function listenClassroomRoom(
  roomId: string,
  onUpdate: (room: ClassroomRoom | null) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const roomDocRef = doc(db, 'classroom_rooms', roomId);
  return onSnapshot(
    roomDocRef,
    (snap) => {
      if (snap.exists()) {
        onUpdate(snap.data() as ClassroomRoom);
      } else {
        onUpdate(null);
      }
    },
    (err) => {
      console.warn('Classroom room snapshot error:', err);
      if (onError) onError(err);
    }
  );
}

export function listenClassroomStudents(
  roomId: string,
  onUpdate: (students: ClassroomStudent[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const studentsColRef = collection(db, 'classroom_rooms', roomId, 'students');
  return onSnapshot(
    studentsColRef,
    (snap) => {
      const list: ClassroomStudent[] = [];
      snap.forEach((docSnap) => {
        list.push(docSnap.data() as ClassroomStudent);
      });
      // Sort: help requested first, then by stars desc, then by name
      list.sort((a, b) => {
        if (a.helpRequested && !b.helpRequested) return -1;
        if (!a.helpRequested && b.helpRequested) return 1;
        if (b.starsEarned !== a.starsEarned) return b.starsEarned - a.starsEarned;
        return a.studentName.localeCompare(b.studentName, 'th');
      });
      onUpdate(list);
    },
    (err) => {
      console.warn('Classroom students snapshot error:', err);
      if (onError) onError(err);
    }
  );
}

export async function sendTeacherCheer(
  roomId: string,
  cheer: {
    type: 'heart' | 'star' | 'clap' | 'cheer';
    message: string;
    targetStudentId?: string;
  }
): Promise<void> {
  const roomDocRef = doc(db, 'classroom_rooms', roomId);
  await updateDoc(roomDocRef, {
    teacherCheer: {
      ...cheer,
      id: `cheer_${Date.now()}`,
      timestamp: Date.now(),
    },
    updatedAt: new Date().toISOString(),
  });
}

export async function broadcastClassroomAlert(
  roomId: string,
  alert: {
    type: 'bell' | 'freeze' | 'celebrate' | 'message';
    message: string;
  }
): Promise<void> {
  const roomDocRef = doc(db, 'classroom_rooms', roomId);
  await updateDoc(roomDocRef, {
    broadcastAlert: {
      ...alert,
      id: `alert_${Date.now()}`,
      timestamp: Date.now(),
    },
    updatedAt: new Date().toISOString(),
  });
}

export async function closeClassroomRoom(roomId: string): Promise<void> {
  const roomDocRef = doc(db, 'classroom_rooms', roomId);
  await updateDoc(roomDocRef, {
    status: 'closed',
    updatedAt: new Date().toISOString(),
  });
  clearTeacherActiveRoom();
}

// ==========================================
// STUDENT: JOIN, LEAVE & SYNC PRESENCE
// ==========================================
export async function findRoomByCode(code: string): Promise<ClassroomRoom | null> {
  const cleanCode = normalizeRoomCode(code);
  if (!cleanCode) return null;

  const roomsColRef = collection(db, 'classroom_rooms');
  const q = query(roomsColRef, where('roomCode', '==', cleanCode), where('status', '==', 'active'));
  const snap = await getDocs(q);

  if (snap.empty) return null;
  return snap.docs[0].data() as ClassroomRoom;
}

export async function joinClassroomRoom(
  room: ClassroomRoom,
  profile: ChildProfile,
  initialGame = 'แบบประเมินหลัก'
): Promise<ClassroomStudent> {
  const studentDocRef = doc(db, 'classroom_rooms', room.roomId, 'students', profile.id);
  const now = Date.now();

  const studentData: ClassroomStudent = {
    studentId: profile.id,
    studentName: profile.name,
    avatar: profile.avatar || '🧒',
    avatarBg: profile.avatarBg,
    grade: profile.grade || 'K1',
    currentGame: initialGame,
    currentLevel: 'ด่านที่ 1',
    starsEarned: 0,
    score: profile.totalScore || 0,
    accuracy: 100,
    status: 'active',
    helpRequested: false,
    helpMessage: '',
    lastActive: now,
    joinedAt: now,
  };

  await setDoc(studentDocRef, studentData, { merge: true });

  // Save joined room in student's local state
  saveStudentActiveRoom(room);
  return studentData;
}

export async function updateStudentPresence(
  roomId: string,
  studentId: string,
  updates: Partial<ClassroomStudent>
): Promise<void> {
  try {
    const studentDocRef = doc(db, 'classroom_rooms', roomId, 'students', studentId);
    await updateDoc(studentDocRef, {
      ...updates,
      lastActive: Date.now(),
    });
  } catch (err) {
    console.warn('Failed to update student presence:', err);
  }
}

export async function requestStudentHelp(
  roomId: string,
  studentId: string,
  message = 'หนูติดขัดข้อนี้ ต้องการให้คุณครูช่วยดูนะจ๊ะ'
): Promise<void> {
  const studentDocRef = doc(db, 'classroom_rooms', roomId, 'students', studentId);
  await updateDoc(studentDocRef, {
    helpRequested: true,
    helpMessage: message,
    status: 'need_help',
    lastActive: Date.now(),
  });
}

export async function resolveStudentHelp(
  roomId: string,
  studentId: string
): Promise<void> {
  const studentDocRef = doc(db, 'classroom_rooms', roomId, 'students', studentId);
  await updateDoc(studentDocRef, {
    helpRequested: false,
    helpMessage: '',
    status: 'active',
    lastActive: Date.now(),
  });
}

export async function leaveClassroomRoom(roomId: string, studentId: string): Promise<void> {
  try {
    const studentDocRef = doc(db, 'classroom_rooms', roomId, 'students', studentId);
    await deleteDoc(studentDocRef);
  } catch (e) {
    console.warn('Failed to delete student presence doc:', e);
  }
  clearStudentActiveRoom();
}

// ==========================================
// LOCAL STORAGE PERSISTENCE HELPERS
// ==========================================
export function getStudentActiveRoom(): ClassroomRoom | null {
  try {
    const str = localStorage.getItem(LOCAL_STORAGE_ACTIVE_ROOM_KEY);
    if (!str) return null;
    return JSON.parse(str) as ClassroomRoom;
  } catch {
    return null;
  }
}

export function saveStudentActiveRoom(room: ClassroomRoom): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_ROOM_KEY, JSON.stringify(room));
  } catch (e) {
    console.warn('Failed to save student room to storage:', e);
  }
}

export function clearStudentActiveRoom(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_ACTIVE_ROOM_KEY);
  } catch (e) {
    console.warn('Failed to clear student room from storage:', e);
  }
}

export function getTeacherActiveRoom(): ClassroomRoom | null {
  try {
    const str = localStorage.getItem(LOCAL_STORAGE_TEACHER_ROOM_KEY);
    if (!str) return null;
    return JSON.parse(str) as ClassroomRoom;
  } catch {
    return null;
  }
}

export function saveTeacherActiveRoom(room: ClassroomRoom): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_TEACHER_ROOM_KEY, JSON.stringify(room));
  } catch (e) {
    console.warn('Failed to save teacher room to storage:', e);
  }
}

export function clearTeacherActiveRoom(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_TEACHER_ROOM_KEY);
  } catch (e) {
    console.warn('Failed to clear teacher room from storage:', e);
  }
}

// ==========================================
// DEMO STUDENTS SEEDER (FOR CLASSROOM TESTING)
// ==========================================
export async function seedDemoStudents(roomId: string): Promise<void> {
  const demoList: Partial<ClassroomStudent>[] = [
    {
      studentId: `demo_1_${Date.now()}`,
      studentName: 'น้องพอใจ',
      avatar: '👧',
      avatarBg: '#FCE7F3',
      grade: 'K2',
      currentGame: 'เกม: จับคู่ภาพเหมือน & สัมพันธ์',
      currentLevel: 'ด่านที่ 3',
      starsEarned: 12,
      score: 120,
      accuracy: 95,
      status: 'active',
      helpRequested: false,
    },
    {
      studentId: `demo_2_${Date.now()}`,
      studentName: 'น้องต้นกล้า',
      avatar: '👦',
      avatarBg: '#DBEAFE',
      grade: 'K2',
      currentGame: 'เกม: ตราชั่งน้ำหนัก & คณิตปฐมวัย',
      currentLevel: 'ด่านที่ 5',
      starsEarned: 18,
      score: 180,
      accuracy: 100,
      status: 'active',
      helpRequested: false,
    },
    {
      studentId: `demo_3_${Date.now()}`,
      studentName: 'น้องมะลิ',
      avatar: '🌸',
      avatarBg: '#FEF3C7',
      grade: 'K2',
      currentGame: 'เกม: เขาวงกต & ลากเส้นตามรอย',
      currentLevel: 'ด่านที่ 2',
      starsEarned: 7,
      score: 70,
      accuracy: 80,
      status: 'need_help',
      helpRequested: true,
      helpMessage: 'หนูหาทางออกเขาวงกตไม่เจอค่ะ คุณครูช่วยดูหน่อยนะคะ',
    },
    {
      studentId: `demo_4_${Date.now()}`,
      studentName: 'น้องภูผา',
      avatar: '🦁',
      avatarBg: '#E0E7FF',
      grade: 'K2',
      currentGame: 'เกม: ยืดหยุ่นความคิด & ยับยั้งใจ (EF)',
      currentLevel: 'ด่านที่ 4',
      starsEarned: 15,
      score: 150,
      accuracy: 90,
      status: 'active',
      helpRequested: false,
    },
  ];

  const now = Date.now();
  for (const item of demoList) {
    const studentDocRef = doc(db, 'classroom_rooms', roomId, 'students', item.studentId!);
    await setDoc(studentDocRef, {
      ...item,
      lastActive: now,
      joinedAt: now,
    });
  }
}

export async function clearAllStudents(roomId: string): Promise<void> {
  const studentsColRef = collection(db, 'classroom_rooms', roomId, 'students');
  const snap = await getDocs(studentsColRef);
  for (const docSnap of snap.docs) {
    await deleteDoc(docSnap.ref);
  }
}
