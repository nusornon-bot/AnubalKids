import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db } from './firebaseDb';

export type DiscussionAuthorRole = 'teacher' | 'parent' | 'specialist' | 'admin';

export type DiscussionCategory =
  | 'early_childhood' // เทคนิคปฐมวัย (8 ทักษะ)
  | 'cbe_primary' // พัฒนา 6 สมรรถนะ (สพฐ.)
  | 'activity_ideas' // ไอเดียกิจกรรมที่บ้านและห้องเรียน
  | 'parenting_qa' // ปรึกษาพัฒนาการ & สมาธิ
  | 'general'; // แลกเปลี่ยนทั่วไป

export type DiscussionTargetCurriculum = 'early_childhood' | 'cbe_primary' | 'both';

export interface DiscussionReply {
  id: string;
  discussionId: string;
  authorName: string;
  authorRole: DiscussionAuthorRole;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  likedByMe?: boolean;
}

export interface DiscussionPost {
  id: string;
  title: string;
  content: string;
  category: DiscussionCategory;
  targetCurriculum: DiscussionTargetCurriculum;
  authorName: string;
  authorRole: DiscussionAuthorRole;
  authorAvatar: string;
  tags: string[];
  practicalTips?: string; // เคล็ดลับที่นำไปปรับใช้ได้จริง
  likes: number;
  likedByMe?: boolean;
  replyCount: number;
  createdAt: string;
  isPinned?: boolean;
  isLocked?: boolean; // ผู้ดูแลระบบสามารถล็อกไม่ให้ตอบกลับเพิ่มได้
  replies?: DiscussionReply[];
}

const LOCAL_STORAGE_KEY = 'kinder_classroom_discussions_v1';
const LIKED_POSTS_KEY = 'kinder_liked_discussion_posts_v1';
const LIKED_REPLIES_KEY = 'kinder_liked_discussion_replies_v1';

const INITIAL_SEED_DISCUSSIONS: DiscussionPost[] = [
  {
    id: 'disc-cbe-competency-guide',
    title: '📌 แนวทางจัดกิจกรรมเสริม 6 สมรรถนะหลัก สพฐ. (ป.1 - ป.3) ให้เชื่อมโยงกับชีวิตประจำวัน',
    content:
      'การจัดกิจกรรมฐานสมรรถนะ (Competency-Based Education) ไม่จำเป็นต้องทำแบบฝึกหัดจำนวนมากเสมอไป แต่เน้นให้เด็กได้ "ลงมือทำ (Active Learning)" เช่น เมื่อสอนเรื่อง "การคิดขั้นสูงและการแก้ปัญหา" ลองจำลองสถานการณ์จริง เช่น การวางแผนแบ่งขนมให้เพื่อนอย่างเท่าเทียม หรือการสำรวจขยะในโรงเรียนแล้วคิดวิธีคัดแยก',
    category: 'cbe_primary',
    targetCurriculum: 'cbe_primary',
    authorName: 'อ.ดร.กานดา รักษ์ปัญญา',
    authorRole: 'specialist',
    authorAvatar: '👩‍🏫',
    tags: ['6 สมรรถนะ สพฐ.', 'ประถม 1-3', 'Active Learning', 'การคิดขั้นสูง'],
    practicalTips: 'เน้นกระบวนการตั้งคำถามปลายเปิด "ทำไม" และ "อย่างไร" แล้วให้เด็กได้ลองแก้ปัญหาด้วยตนเองก่อนสรุปผล',
    likes: 28,
    replyCount: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    isPinned: true,
    replies: [
      {
        id: 'rep-1',
        discussionId: 'disc-cbe-competency-guide',
        authorName: 'ครูวิภาภรณ์ (ครูประจำชั้น ป.2)',
        authorRole: 'teacher',
        authorAvatar: '🍎',
        content: 'เห็นด้วยเป็นอย่างยิ่งค่ะ! ที่ห้องนำกิจกรรมฝึก 5 นาทีในแอปนี้ไปใช้ตอนเช้า เด็กๆ ชอบมากเพราะได้คิดและตอบทันทีค่ะ',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        likes: 12,
      },
      {
        id: 'rep-2',
        discussionId: 'disc-cbe-competency-guide',
        authorName: 'แม่แนน (คุณแม่น้องฟ้าใส ป.2)',
        authorRole: 'parent',
        authorAvatar: '🏡',
        content: 'ขอบคุณอาจารย์มากค่ะ ที่บ้านเอาไปลองคุยเวลาช่วยกันทำกับข้าว น้องเริ่มหัดคำนวณและวางแผนเองได้ดีขึ้นเยอะเลยค่ะ',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        likes: 7,
      },
      {
        id: 'rep-3',
        discussionId: 'disc-cbe-competency-guide',
        authorName: 'ครูบาส',
        authorRole: 'teacher',
        authorAvatar: '📘',
        content: 'ปุ่มพิมพ์รายงาน 6 สมรรถนะแบบ A4 PDF ช่วยให้ครูสื่อสารกับผู้ปกครองตอนประชุมผู้ปกครองได้เข้าใจง่ายขึ้นมากครับ',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        likes: 9,
      },
    ],
  },
  {
    id: 'disc-early-hand-motor',
    title: '📌 เทคนิคฝึกกล้ามเนื้อมัดเล็กและสายตา (Eye-Hand Coordination) ก่อนฝึกเขียน ก-ฮ และ A-Z',
    content:
      'ก่อนที่จะให้เด็กปฐมวัย (อ.1 - อ.3) จับดินสอเขียนตัวอักษรอย่างเข้มงวด การพัฒนากล้ามเนื้อมือและสายตาเป็นรากฐานที่สำคัญที่สุด! การใช้โหมดกล้องจับการเคลื่อนไหวของมือ (Hand Tracking) ในแอปเพื่อวาดรูปทรงและลากเส้นตามรอย ช่วยสร้างความมั่นใจและลดอาการเกร็งนิ้วมือได้อย่างดีเยี่ยม',
    category: 'early_childhood',
    targetCurriculum: 'early_childhood',
    authorName: 'ครูนกแก้ว (ครูปฐมวัย ชำนาญการ)',
    authorRole: 'teacher',
    authorAvatar: '🦜',
    tags: ['กล้ามเนื้อมัดเล็ก', 'Hand Tracing', 'ปฐมวัย 8 ทักษะ', 'คัดลายมือ ก-ฮ'],
    practicalTips: 'เริ่มจากเส้นตรง เส้นโค้ง และรูปทรงเรขาคณิต ก่อนเริ่มตัวอักษรที่มีหัวเข้า-ออก เช่น ข, ช, ฒ',
    likes: 24,
    replyCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isPinned: true,
    replies: [
      {
        id: 'rep-4',
        discussionId: 'disc-early-hand-motor',
        authorName: 'พ่อป๊อป (คุณพ่อน้องต้นกล้า)',
        authorRole: 'parent',
        authorAvatar: '👨‍👧',
        content: 'ตอนแรกน้องไม่ยอมเขียนเลยครับ แต่พอให้ลองชี้นิ้วผ่านกล้อง น้องมองว่าเป็นเกมสนุก เลยยอมฝึกเขียนตามรอยจนคล่องเลยครับ',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        likes: 11,
      },
      {
        id: 'rep-5',
        discussionId: 'disc-early-hand-motor',
        authorName: 'ครูฝน ปฐมวัย',
        authorRole: 'teacher',
        authorAvatar: '🌸',
        content: 'แนะนำเสริมด้วยการปั้นดินน้ำมันหรือฉีกปะกระดาษควบคู่กันไปด้วย จะช่วยให้กล้ามเนื้ออุ้งมือแข็งแรงยิ่งขึ้นค่ะ',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
        likes: 6,
      },
    ],
  },
  {
    id: 'disc-daily-mission-habit',
    title: '💡 สร้างนิสัย "การจัดการตนเอง" (Self-Management) ในเด็ก ป.1 ด้วยภารกิจ Daily Mission วันละ 1 อย่าง',
    content:
      'เด็กในวัยเปลี่ยนผ่านจากอนุบาลขึ้นประถม 1 มักเผชิญความเครียดเรื่องตารางเวลาและการบ้าน การใช้ระบบภารกิจประจำวัน (Daily Mission) ในแอป ช่วยให้เด็กมีเป้าหมายที่ชัดเจนและสั้นพอที่จะทำสำเร็จได้ใน 5-10 นาที การให้เด็กได้ติ๊กถูกรับเหรียญดาวด้วยตนเอง จะเสริมสร้าง Self-Efficacy สูงมาก',
    category: 'activity_ideas',
    targetCurriculum: 'both',
    authorName: 'ครูสมชาย รัตนศิลป์',
    authorRole: 'teacher',
    authorAvatar: '👨‍🏫',
    tags: ['การจัดการตนเอง', 'Daily Mission', 'ประถม 1', 'วินัยเชิงบวก'],
    practicalTips: 'กำหนดเวลาประจำ เช่น ทำภารกิจทุกวันหลังอาบน้ำเสร็จ แล้วให้คำชมที่ความพยายามมากกว่าผลคะแนน',
    likes: 19,
    replyCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    replies: [
      {
        id: 'rep-6',
        discussionId: 'disc-daily-mission-habit',
        authorName: 'แม่พลอย',
        authorRole: 'parent',
        authorAvatar: '🌟',
        content: 'ที่บ้านตั้งกฎว่าทำภารกิจ 1 ข้อเสร็จแล้วจะได้ฟังนิทาน AI 1 เรื่อง ได้ผลดีมากค่ะ ไม่ต้องคอยเคี่ยวเข็ญเลย',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
        likes: 8,
      },
    ],
  },
  {
    id: 'disc-screen-time-nature',
    title: '🌿 ชวนเด็กติดจอออกมาทำ "สำรวจธรรมชาติกลางแจ้ง" (Outdoor Learning) ช่วยฟื้นฟูสมาธิ',
    content:
      'ในยุคดิจิทัล เด็กจำนวนมากมีอาการสมาธิสั้นจากการดูคลิปสั้น เราได้ลองใช้ฟีเจอร์ "สำรวจธรรมชาติกลางแจ้ง" ในแอป พานักเรียนออกไปนับใบไม้ ถ่ายรูปดอกไม้ และบันทึกเสียงนกร้องรอบโรงเรียน พบว่าเด็กกลับเข้ามาในห้องเรียนด้วยอารมณ์ที่สงบขึ้นและมีสมาธิกับการเรียนรู้ได้นานขึ้นอย่างเห็นได้ชัด',
    category: 'early_childhood',
    targetCurriculum: 'early_childhood',
    authorName: 'ครูฟ้าใส วิทยาศาสตร์ปฐมวัย',
    authorRole: 'teacher',
    authorAvatar: '🌱',
    tags: ['สำรวจธรรมชาติ', 'ลดการติดจอ', 'ฟื้นฟูสมาธิ', 'การอยู่ร่วมกับธรรมชาติ'],
    practicalTips: 'ชวนตั้งโจทย์ง่ายๆ เช่น "ตามหาของสีเขียว 3 เฉดสี" หรือ "ฟังเสียงรอบตัว 1 นาทีแล้วบอกว่าได้ยินอะไรบ้าง"',
    likes: 22,
    replyCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    replies: [
      {
        id: 'rep-7',
        discussionId: 'disc-screen-time-nature',
        authorName: 'หมอโอ๊ค (กุมารแพทย์)',
        authorRole: 'specialist',
        authorAvatar: '🩺',
        content: 'ทางการแพทย์ยืนยันว่าการมองสีเขียวและแสงธรรมชาติช่วยผ่อนคลายกล้ามเนื้อตา และกระตุ้นระบบประสาทพาราซิมพาเทติก ลดความเครียดได้จริงครับ',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        likes: 15,
      },
      {
        id: 'rep-8',
        discussionId: 'disc-screen-time-nature',
        authorName: 'แม่ก้อย',
        authorRole: 'parent',
        authorAvatar: '🌺',
        content: 'เสาร์-อาทิตย์นี้จะพาน้องไปลองที่สวนสาธารณะเลยค่ะ ขอบคุณสำหรับไอเดียดีๆ นะคะ',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
        likes: 5,
      },
    ],
  },
  {
    id: 'disc-qa-short-attention',
    title: '❓ [ปรึกษา] ลูก ป.1 วอกแวกง่ายเวลาทำแบบฝึกหัด มีวิธีจูงใจให้มีสมาธิต่อเนื่องไหมคะ?',
    content:
      'น้องเป็นเด็กฉลาดและเข้าใจเร็วค่ะ แต่จะนั่งนิ่งๆ ได้ไม่เกิน 3-5 นาทีก็เริ่มลุกเดินหรือหันไปเล่นอย่างอื่น ลองดุแล้วยิ่งต่อต้าน คุณครูหรือผู้ปกครองท่านไหนมีประสบการณ์หรือเครื่องมือช่วยปรับพฤติกรรมเชิงบวกบ้างไหมคะ?',
    category: 'parenting_qa',
    targetCurriculum: 'cbe_primary',
    authorName: 'คุณแม่ปิ่น',
    authorRole: 'parent',
    authorAvatar: '🧸',
    tags: ['สมาธิสั้น', 'ประถม 1', 'การจัดการตนเอง', 'คำปรึกษา'],
    likes: 16,
    replyCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    replies: [
      {
        id: 'rep-9',
        discussionId: 'disc-qa-short-attention',
        authorName: 'ครูอุ้ม (แนะแนวพัฒนาการ)',
        authorRole: 'specialist',
        authorAvatar: '💡',
        content: 'เด็ก ป.1 ช่วงสมาธิตามธรรมชาติอยู่ที่ประมาณ 10-15 นาทีค่ะ แนะนำเทคนิค Pomodoro สำหรับเด็ก เช่น ฝึก 5 นาที พักยืดเส้นยืดสาย 2 นาที และใช้โหมด Hand Tracking ในแอปเพราะต้องใช้การประสานงานทั้งตัว จะช่วยดึงสมาธิได้ดีกว่าการนั่งจิ้มหน้าจอเฉยๆ ค่ะ',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
        likes: 18,
      },
      {
        id: 'rep-10',
        discussionId: 'disc-qa-short-attention',
        authorName: 'พ่อเจตน์',
        authorRole: 'parent',
        authorAvatar: '🚗',
        content: 'ที่บ้านใช้วิธีเปิดเสียงดนตรีบรรเลงเบาๆ คลอไปด้วย ช่วยให้น้องนิ่งขึ้นเยอะครับ',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
        likes: 7,
      },
    ],
  },
];

class DiscussionService {
  private likedPostIds: Set<string> = new Set();
  private likedReplyIds: Set<string> = new Set();

  constructor() {
    this.loadLikedCache();
  }

  private loadLikedCache() {
    try {
      const savedPosts = localStorage.getItem(LIKED_POSTS_KEY);
      if (savedPosts) {
        this.likedPostIds = new Set(JSON.parse(savedPosts));
      }
      const savedReplies = localStorage.getItem(LIKED_REPLIES_KEY);
      if (savedReplies) {
        this.likedReplyIds = new Set(JSON.parse(savedReplies));
      }
    } catch (e) {
      console.warn('Error loading liked cache from localStorage', e);
    }
  }

  private saveLikedCache() {
    try {
      localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(Array.from(this.likedPostIds)));
      localStorage.setItem(LIKED_REPLIES_KEY, JSON.stringify(Array.from(this.likedReplyIds)));
    } catch (e) {
      console.warn('Error saving liked cache to localStorage', e);
    }
  }

  // Load from local storage with fallback to initial seed
  getLocalDiscussions(): DiscussionPost[] {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const parsed: DiscussionPost[] = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Enrich with likedByMe flag
          return parsed.map((p) => ({
            ...p,
            likedByMe: this.likedPostIds.has(p.id),
            replies: (p.replies || []).map((r) => ({
              ...r,
              likedByMe: this.likedReplyIds.has(r.id),
            })),
          }));
        }
      }
    } catch (e) {
      console.warn('Error reading discussions from localStorage', e);
    }

    // Initialize with seed data
    this.saveLocalDiscussions(INITIAL_SEED_DISCUSSIONS);
    return INITIAL_SEED_DISCUSSIONS.map((p) => ({
      ...p,
      likedByMe: this.likedPostIds.has(p.id),
      replies: (p.replies || []).map((r) => ({
        ...r,
        likedByMe: this.likedReplyIds.has(r.id),
      })),
    }));
  }

  saveLocalDiscussions(posts: DiscussionPost[]) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.warn('Error saving discussions to localStorage', e);
    }
  }

  // Seed initial discussions directly to Cloud Firestore database if empty
  async seedDiscussionsToCloud(): Promise<void> {
    if (!db) return;
    try {
      for (const post of INITIAL_SEED_DISCUSSIONS) {
        const docRef = doc(db, 'classroom_discussions', post.id);
        await setDoc(
          docRef,
          {
            title: post.title,
            content: post.content,
            category: post.category,
            targetCurriculum: post.targetCurriculum,
            authorName: post.authorName,
            authorRole: post.authorRole,
            authorAvatar: post.authorAvatar,
            tags: post.tags,
            practicalTips: post.practicalTips || '',
            likes: post.likes || 0,
            replyCount: (post.replies || []).length,
            createdAt: post.createdAt,
            isPinned: !!post.isPinned,
            isLocked: !!post.isLocked,
            replies: post.replies || [],
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (e) {
      console.warn('Failed to seed discussions to Firestore', e);
    }
  }

  // Fetch all discussions once from Cloud Firestore with local cache fallback
  async fetchDiscussions(): Promise<DiscussionPost[]> {
    if (!db) return this.getLocalDiscussions();
    try {
      const snap = await getDocs(collection(db, 'classroom_discussions'));
      if (snap.empty) {
        await this.seedDiscussionsToCloud();
        return this.getLocalDiscussions();
      }
      const cloudPosts: DiscussionPost[] = [];
      snap.forEach((docSnap) => {
        const data = docSnap.data();
        cloudPosts.push({
          id: docSnap.id,
          title: data.title || '',
          content: data.content || '',
          category: data.category || 'general',
          targetCurriculum: data.targetCurriculum || 'both',
          authorName: data.authorName || 'คุณครู/ผู้ปกครอง',
          authorRole: data.authorRole || 'teacher',
          authorAvatar: data.authorAvatar || '💬',
          tags: Array.isArray(data.tags) ? data.tags : [],
          practicalTips: data.practicalTips || '',
          likes: data.likes || 0,
          replyCount: data.replyCount || 0,
          createdAt: data.createdAt || new Date().toISOString(),
          isPinned: !!data.isPinned,
          isLocked: !!data.isLocked,
          likedByMe: this.likedPostIds.has(docSnap.id),
          replies: Array.isArray(data.replies)
            ? data.replies.map((r: any) => ({
                ...r,
                likedByMe: this.likedReplyIds.has(r.id),
              }))
            : [],
        });
      });
      cloudPosts.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      this.saveLocalDiscussions(cloudPosts);
      return cloudPosts;
    } catch (e) {
      console.warn('Error fetching discussions from Firestore', e);
      return this.getLocalDiscussions();
    }
  }

  // Subscribe to real-time updates from Cloud Firestore with automatic two-way sync
  subscribeDiscussions(
    onUpdate: (discussions: DiscussionPost[]) => void,
    onStatusChange?: (status: { isConnected: boolean; lastSyncedAt: Date | null }) => void
  ): () => void {
    // 1. Immediately emit cached discussions so the UI is instantaneous
    const initialLocal = this.getLocalDiscussions();
    onUpdate(initialLocal);

    if (!db) {
      if (onStatusChange) onStatusChange({ isConnected: false, lastSyncedAt: null });
      return () => {};
    }

    try {
      const discussionsCol = collection(db, 'classroom_discussions');
      const unsubscribe = onSnapshot(
        discussionsCol,
        async (snapshot) => {
          if (snapshot.empty) {
            // Automatically seed to Firestore so the cloud database is initialized
            await this.seedDiscussionsToCloud();
            if (onStatusChange) onStatusChange({ isConnected: true, lastSyncedAt: new Date() });
            return;
          }

          const cloudPosts: DiscussionPost[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            cloudPosts.push({
              id: docSnap.id,
              title: data.title || '',
              content: data.content || '',
              category: data.category || 'general',
              targetCurriculum: data.targetCurriculum || 'both',
              authorName: data.authorName || 'คุณครู/ผู้ปกครอง',
              authorRole: data.authorRole || 'teacher',
              authorAvatar: data.authorAvatar || '💬',
              tags: Array.isArray(data.tags) ? data.tags : [],
              practicalTips: data.practicalTips || '',
              likes: data.likes || 0,
              replyCount: data.replyCount || 0,
              createdAt: data.createdAt || new Date().toISOString(),
              isPinned: !!data.isPinned,
              isLocked: !!data.isLocked,
              likedByMe: this.likedPostIds.has(docSnap.id),
              replies: Array.isArray(data.replies)
                ? data.replies.map((r: any) => ({
                    ...r,
                    likedByMe: this.likedReplyIds.has(r.id),
                  }))
                : [],
            });
          });

          // Sort: pinned first, then by date descending
          cloudPosts.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });

          this.saveLocalDiscussions(cloudPosts);
          onUpdate(cloudPosts);
          if (onStatusChange) onStatusChange({ isConnected: true, lastSyncedAt: new Date() });
        },
        (error) => {
          console.warn('Real-time Firestore listener error, using local fallback', error);
          if (onStatusChange) onStatusChange({ isConnected: false, lastSyncedAt: null });
          onUpdate(this.getLocalDiscussions());
        }
      );

      return unsubscribe;
    } catch (err) {
      console.warn('Failed to attach Firestore snapshot listener', err);
      if (onStatusChange) onStatusChange({ isConnected: false, lastSyncedAt: null });
      return () => {};
    }
  }

  // Create a new discussion post
  async createDiscussion(post: Omit<DiscussionPost, 'id' | 'likes' | 'replyCount' | 'createdAt' | 'replies'>): Promise<DiscussionPost> {
    const id = `disc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newPost: DiscussionPost = {
      ...post,
      id,
      likes: 0,
      replyCount: 0,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    // Update local storage
    const current = this.getLocalDiscussions();
    const updated = [newPost, ...current];
    this.saveLocalDiscussions(updated);

    // Sync to Firestore if online
    try {
      if (db) {
        const docRef = doc(db, 'classroom_discussions', id);
        await setDoc(docRef, {
          title: newPost.title,
          content: newPost.content,
          category: newPost.category,
          targetCurriculum: newPost.targetCurriculum,
          authorName: newPost.authorName,
          authorRole: newPost.authorRole,
          authorAvatar: newPost.authorAvatar,
          tags: newPost.tags,
          practicalTips: newPost.practicalTips || '',
          likes: 0,
          replyCount: 0,
          createdAt: newPost.createdAt,
          isPinned: !!newPost.isPinned,
          replies: [],
        });
      }
    } catch (err) {
      console.warn('Failed to sync new discussion to Firestore', err);
    }

    return newPost;
  }

  // Add a reply to an existing discussion
  async addReply(discussionId: string, reply: { authorName: string; authorRole: DiscussionAuthorRole; authorAvatar: string; content: string }): Promise<DiscussionReply> {
    const replyId = `rep-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newReply: DiscussionReply = {
      id: replyId,
      discussionId,
      authorName: reply.authorName,
      authorRole: reply.authorRole,
      authorAvatar: reply.authorAvatar,
      content: reply.content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    // Update local
    const current = this.getLocalDiscussions();
    const updated = current.map((p) => {
      if (p.id === discussionId) {
        const replies = p.replies || [];
        return {
          ...p,
          replyCount: replies.length + 1,
          replies: [...replies, newReply],
        };
      }
      return p;
    });
    this.saveLocalDiscussions(updated);

    // Sync to Firestore
    try {
      if (db) {
        const docRef = doc(db, 'classroom_discussions', discussionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const currentReplies = docSnap.data().replies || [];
          await updateDoc(docRef, {
            replyCount: currentReplies.length + 1,
            replies: [...currentReplies, newReply],
          });
        }
      }
    } catch (err) {
      console.warn('Failed to sync reply to Firestore', err);
    }

    return newReply;
  }

  // Toggle Like on a discussion post
  async toggleLikePost(postId: string): Promise<{ liked: boolean; count: number }> {
    const isCurrentlyLiked = this.likedPostIds.has(postId);
    const newLiked = !isCurrentlyLiked;

    if (newLiked) {
      this.likedPostIds.add(postId);
    } else {
      this.likedPostIds.delete(postId);
    }
    this.saveLikedCache();

    let newCount = 0;
    const current = this.getLocalDiscussions();
    const updated = current.map((p) => {
      if (p.id === postId) {
        newCount = Math.max(0, (p.likes || 0) + (newLiked ? 1 : -1));
        return {
          ...p,
          likes: newCount,
          likedByMe: newLiked,
        };
      }
      return p;
    });
    this.saveLocalDiscussions(updated);

    // Sync to Firestore
    try {
      if (db) {
        const docRef = doc(db, 'classroom_discussions', postId);
        await updateDoc(docRef, {
          likes: increment(newLiked ? 1 : -1),
        });
      }
    } catch (err) {
      console.warn('Failed to update likes in Firestore', err);
    }

    return { liked: newLiked, count: newCount };
  }

  // Toggle Like on a reply
  async toggleLikeReply(discussionId: string, replyId: string): Promise<{ liked: boolean; count: number }> {
    const isCurrentlyLiked = this.likedReplyIds.has(replyId);
    const newLiked = !isCurrentlyLiked;

    if (newLiked) {
      this.likedReplyIds.add(replyId);
    } else {
      this.likedReplyIds.delete(replyId);
    }
    this.saveLikedCache();

    let newCount = 0;
    const current = this.getLocalDiscussions();
    const updated = current.map((p) => {
      if (p.id === discussionId && p.replies) {
        const updatedReplies = p.replies.map((r) => {
          if (r.id === replyId) {
            newCount = Math.max(0, (r.likes || 0) + (newLiked ? 1 : -1));
            return {
              ...r,
              likes: newCount,
              likedByMe: newLiked,
            };
          }
          return r;
        });
        return { ...p, replies: updatedReplies };
      }
      return p;
    });
    this.saveLocalDiscussions(updated);

    // Sync to Firestore
    try {
      if (db) {
        const docRef = doc(db, 'classroom_discussions', discussionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const postData = docSnap.data();
          const replies = (postData.replies || []).map((r: any) => {
            if (r.id === replyId) {
              return { ...r, likes: Math.max(0, (r.likes || 0) + (newLiked ? 1 : -1)) };
            }
            return r;
          });
          await updateDoc(docRef, { replies });
        }
      }
    } catch (err) {
      console.warn('Failed to update reply like in Firestore', err);
    }

    return { liked: newLiked, count: newCount };
  }

  // Admin: Delete a discussion post
  async deleteDiscussion(discussionId: string): Promise<boolean> {
    const current = this.getLocalDiscussions();
    const updated = current.filter((p) => p.id !== discussionId);
    this.saveLocalDiscussions(updated);

    try {
      if (db) {
        const docRef = doc(db, 'classroom_discussions', discussionId);
        await deleteDoc(docRef);
      }
    } catch (err) {
      console.warn('Failed to delete discussion from Firestore', err);
    }

    return true;
  }

  // Admin: Edit a discussion post
  async updateDiscussion(discussionId: string, updates: Partial<DiscussionPost>): Promise<DiscussionPost | null> {
    const current = this.getLocalDiscussions();
    let updatedPost: DiscussionPost | null = null;

    const updated = current.map((p) => {
      if (p.id === discussionId) {
        updatedPost = { ...p, ...updates };
        return updatedPost;
      }
      return p;
    });

    if (updatedPost) {
      this.saveLocalDiscussions(updated);

      try {
        if (db) {
          const docRef = doc(db, 'classroom_discussions', discussionId);
          await updateDoc(docRef, { ...updates });
        }
      } catch (err) {
        console.warn('Failed to update discussion in Firestore', err);
      }
    }

    return updatedPost;
  }

  // Admin: Toggle Pin / Unpin on a post
  async togglePinDiscussion(discussionId: string): Promise<boolean> {
    const current = this.getLocalDiscussions();
    let isPinned = false;

    const updated = current.map((p) => {
      if (p.id === discussionId) {
        isPinned = !p.isPinned;
        return { ...p, isPinned };
      }
      return p;
    });

    // Re-sort: pinned first
    updated.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    this.saveLocalDiscussions(updated);

    try {
      if (db) {
        const docRef = doc(db, 'classroom_discussions', discussionId);
        await updateDoc(docRef, { isPinned });
      }
    } catch (err) {
      console.warn('Failed to toggle pin in Firestore', err);
    }

    return isPinned;
  }

  // Admin: Toggle Lock / Unlock comments on a post
  async toggleLockDiscussion(discussionId: string): Promise<boolean> {
    const current = this.getLocalDiscussions();
    let isLocked = false;

    const updated = current.map((p) => {
      if (p.id === discussionId) {
        isLocked = !p.isLocked;
        return { ...p, isLocked };
      }
      return p;
    });

    this.saveLocalDiscussions(updated);

    try {
      if (db) {
        const docRef = doc(db, 'classroom_discussions', discussionId);
        await updateDoc(docRef, { isLocked });
      }
    } catch (err) {
      console.warn('Failed to toggle lock in Firestore', err);
    }

    return isLocked;
  }

  // Admin: Delete a specific reply from a discussion
  async deleteReply(discussionId: string, replyId: string): Promise<boolean> {
    const current = this.getLocalDiscussions();
    const updated = current.map((p) => {
      if (p.id === discussionId && p.replies) {
        const filteredReplies = p.replies.filter((r) => r.id !== replyId);
        return {
          ...p,
          replyCount: Math.max(0, filteredReplies.length),
          replies: filteredReplies,
        };
      }
      return p;
    });

    this.saveLocalDiscussions(updated);

    try {
      if (db) {
        const docRef = doc(db, 'classroom_discussions', discussionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const currentReplies = docSnap.data().replies || [];
          const filteredReplies = currentReplies.filter((r: any) => r.id !== replyId);
          await updateDoc(docRef, {
            replyCount: filteredReplies.length,
            replies: filteredReplies,
          });
        }
      }
    } catch (err) {
      console.warn('Failed to delete reply in Firestore', err);
    }

    return true;
  }

  // Admin: Reset to default educational discussion posts
  async resetToDefaultDiscussions(): Promise<DiscussionPost[]> {
    this.saveLocalDiscussions(INITIAL_SEED_DISCUSSIONS);

    try {
      if (db) {
        const snap = await getDocs(collection(db, 'classroom_discussions'));
        const deletePromises = snap.docs.map((docSnap) =>
          deleteDoc(doc(db, 'classroom_discussions', docSnap.id))
        );
        await Promise.all(deletePromises);
        await this.seedDiscussionsToCloud();
      }
    } catch (err) {
      console.warn('Failed to reset Firestore discussions', err);
    }

    return INITIAL_SEED_DISCUSSIONS.map((p) => ({
      ...p,
      likedByMe: this.likedPostIds.has(p.id),
      replies: (p.replies || []).map((r) => ({
        ...r,
        likedByMe: this.likedReplyIds.has(r.id),
      })),
    }));
  }
}

export const discussionService = new DiscussionService();
