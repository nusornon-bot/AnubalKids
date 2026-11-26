import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ClassroomRoom,
  ClassroomStudent,
  listenClassroomRoom,
  listenClassroomStudents,
  sendTeacherCheer,
  broadcastClassroomAlert,
  resolveStudentHelp,
  closeClassroomRoom,
  seedDemoStudents,
  clearAllStudents,
} from '../services/classroomRoomService';
import { soundEffects, speakText } from '../services/audioService';
import confetti from 'canvas-confetti';
import {
  School,
  Users,
  Sparkles,
  Trophy,
  Bell,
  Heart,
  HelpCircle,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Printer,
  X,
  Volume2,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface ClassroomLiveDashboardModalProps {
  room: ClassroomRoom;
  soundVolume: number;
  onClose: () => void;
  onRoomClosed?: () => void;
}

export const ClassroomLiveDashboardModal: React.FC<ClassroomLiveDashboardModalProps> = ({
  room,
  soundVolume,
  onClose,
  onRoomClosed,
}) => {
  const [liveRoom, setLiveRoom] = useState<ClassroomRoom>(room);
  const [students, setStudents] = useState<ClassroomStudent[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isProjectorMode, setIsProjectorMode] = useState(false);
  const [selectedStudentForAction, setSelectedStudentForAction] = useState<ClassroomStudent | null>(null);
  const [customCheerMessage, setCustomCheerMessage] = useState('คุณครูเป็นกำลังใจให้นะคะคนเก่ง!');
  const [customBellMessage, setCustomBellMessage] = useState('เด็กๆ จ๋า หยุดมือสักครู่และฟังคุณครูนะจ๊ะ');
  const [showBellPrompt, setShowBellPrompt] = useState(false);
  const [showCheerPrompt, setShowCheerPrompt] = useState(false);
  const prevHelpCountRef = useRef(0);

  // Real-time listener for Room doc
  useEffect(() => {
    const unsubRoom = listenClassroomRoom(room.roomId, (updated) => {
      if (updated) {
        setLiveRoom(updated);
      }
    });

    // Real-time listener for Students subcollection
    const unsubStudents = listenClassroomStudents(room.roomId, (updatedStudents) => {
      setStudents(updatedStudents);

      // Sound notification when a student raises their hand for help
      const currentHelpCount = updatedStudents.filter((s) => s.helpRequested).length;
      if (currentHelpCount > prevHelpCountRef.current) {
        soundEffects.playIncorrect(soundVolume);
        const asking = updatedStudents.find((s) => s.helpRequested);
        if (asking) {
          speakText(`คุณครูคะ น้อง${asking.studentName} ยกมือขอความช่วยเหลือค่ะ`, 'th', soundVolume);
        }
      }
      prevHelpCountRef.current = currentHelpCount;
    });

    return () => {
      unsubRoom();
      unsubStudents();
    };
  }, [room.roomId, soundVolume]);

  // Aggregate stats
  const totalStars = useMemo(() => {
    return students.reduce((sum, s) => sum + (s.starsEarned || 0), 0);
  }, [students]);

  const averageAccuracy = useMemo(() => {
    if (students.length === 0) return 100;
    const sum = students.reduce((acc, s) => acc + (s.accuracy || 100), 0);
    return Math.round(sum / students.length);
  }, [students]);

  const studentsNeedingHelp = useMemo(() => {
    return students.filter((s) => s.helpRequested);
  }, [students]);

  const activeStudents = useMemo(() => {
    const now = Date.now();
    return students.filter((s) => now - s.lastActive < 120000); // active within 2 minutes
  }, [students]);

  // Copy Room Code
  const handleCopyCode = () => {
    soundEffects.playTap(soundVolume);
    navigator.clipboard.writeText(liveRoom.roomCode);
    setIsCopied(true);
    speakText(`คัดลอกรหัสห้อง ${liveRoom.roomCode} แล้วค่ะ`, 'th', soundVolume);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Broadcast Attention Bell
  const handleBroadcastBell = async () => {
    soundEffects.playSuccess(soundVolume);
    setShowBellPrompt(false);
    speakText('สั่นกระดิ่งรวมสมาธิเด็กๆ ทั้งห้องเรียบร้อยค่ะ', 'th', soundVolume);

    try {
      await broadcastClassroomAlert(liveRoom.roomId, {
        type: 'bell',
        message: customBellMessage,
      });
    } catch (e) {
      console.warn('Failed to broadcast bell:', e);
    }
  };

  // Broadcast Cheer to All
  const handleCheerAll = async () => {
    soundEffects.playVictory(soundVolume);
    setShowCheerPrompt(false);
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.4 } });
    speakText('ส่งกำลังใจให้เด็กๆ ทั้งห้องเรียบร้อยค่ะ', 'th', soundVolume);

    try {
      await sendTeacherCheer(liveRoom.roomId, {
        type: 'cheer',
        message: customCheerMessage,
      });
    } catch (e) {
      console.warn('Failed to cheer all:', e);
    }
  };

  // Direct Student Cheer
  const handleCheerStudent = async (student: ClassroomStudent, type: 'heart' | 'star' | 'clap') => {
    soundEffects.playTap(soundVolume);
    const msg =
      type === 'heart'
        ? `คุณครูส่งหัวใจให้คนเก่ง ${student.studentName} จ้า!`
        : type === 'star'
        ? `สุดยอดมาก ${student.studentName}! คุณครูให้ดาวความตั้งใจ!`
        : `คุณครูปี่ปรบมือให้ ${student.studentName} รัวๆ เลย!`;

    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    speakText(msg, 'th', soundVolume);

    try {
      await sendTeacherCheer(liveRoom.roomId, {
        type,
        message: msg,
        targetStudentId: student.studentId,
      });
    } catch (e) {
      console.warn('Failed to cheer student:', e);
    }
  };

  // Resolve Student Help
  const handleResolveHelp = async (studentId: string) => {
    soundEffects.playTap(soundVolume);
    try {
      await resolveStudentHelp(liveRoom.roomId, studentId);
    } catch (e) {
      console.warn('Failed to resolve help:', e);
    }
  };

  const [isSeedingDemo, setIsSeedingDemo] = useState(false);

  // Seed Demo Students for instant testing
  const handleSeedDemo = async () => {
    setIsSeedingDemo(true);
    soundEffects.playTap(soundVolume);
    try {
      await seedDemoStudents(liveRoom.roomId);
      soundEffects.playVictory(soundVolume);
      speakText('เพิ่มนักเรียนสาธิต 4 คนเรียบร้อยแล้วค่ะ', 'th', soundVolume);
    } catch (e) {
      console.warn('Failed to seed demo students:', e);
    } finally {
      setIsSeedingDemo(false);
    }
  };

  // Clear All Students
  const handleClearStudents = async () => {
    const ok = window.confirm('คุณครูต้องการล้างรายชื่อนักเรียนทั้งหมดในห้องนี้หรือไม่?');
    if (!ok) return;

    soundEffects.playTap(soundVolume);
    try {
      await clearAllStudents(liveRoom.roomId);
      speakText('ล้างรายชื่อนักเรียนเรียบร้อยแล้วค่ะ', 'th', soundVolume);
    } catch (e) {
      console.warn('Failed to clear students:', e);
    }
  };

  // Close Room
  const handleCloseRoom = async () => {
    const ok = window.confirm('คุณครูต้องการปิดห้องเรียนจำลองนี้ใช่หรือไม่? เด็กๆ จะถูกนำออกจากห้อง');
    if (!ok) return;

    soundEffects.playTap(soundVolume);
    try {
      await closeClassroomRoom(liveRoom.roomId);
      speakText('ปิดห้องเรียนจำลองเรียบร้อยแล้วค่ะ', 'th', soundVolume);
      if (onRoomClosed) onRoomClosed();
      onClose();
    } catch (e) {
      console.warn('Failed to close room:', e);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="classroom-dashboard-title"
      className={`fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md transition-all ${
        isProjectorMode ? 'bg-slate-950 p-1 sm:p-2' : ''
      }`}
    >
      <div
        className={`w-full bg-white rounded-3xl shadow-2xl border-4 transition-all flex flex-col overflow-hidden max-h-[95vh] ${
          isProjectorMode
            ? 'max-w-[98vw] border-amber-400 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 text-white'
            : 'max-w-6xl border-indigo-200'
        }`}
      >
        {/* Top Header & Room Code Banner */}
        <header
          className={`p-3.5 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b ${
            isProjectorMode
              ? 'border-indigo-800 bg-indigo-900/60 text-white'
              : 'border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-white to-pink-50/60'
          }`}
        >
          {/* Room Title & Grade Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-2xl sm:text-3xl shadow-md shrink-0">
              🏫
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs animate-pulse">
                  ● สด REAL-TIME
                </span>
                <span
                  className={`text-xs font-bold ${
                    isProjectorMode ? 'text-indigo-200' : 'text-slate-500'
                  }`}
                >
                  คุณครู: {liveRoom.teacherName}
                </span>
              </div>
              <h2
                id="classroom-dashboard-title"
                className={`text-base sm:text-xl font-black mt-0.5 ${
                  isProjectorMode ? 'text-white' : 'text-slate-800'
                }`}
              >
                {liveRoom.name}
              </h2>
            </div>
          </div>

          {/* Room Code Display with 1-Click Copy */}
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border-2 shadow-inner ${
                isProjectorMode
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                  : 'bg-indigo-100/70 border-indigo-300 text-indigo-950'
              }`}
            >
              <span className="text-xs font-bold">รหัสห้อง:</span>
              <span className="font-mono text-lg sm:text-2xl font-black tracking-widest text-indigo-700 dark:text-amber-300">
                {liveRoom.roomCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 shadow-2xs transition-all active:scale-90 cursor-pointer"
                title="คัดลอกรหัสห้อง"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Quick Action Tools */}
            <button
              type="button"
              onClick={() => setShowBellPrompt(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
              title="สั่นกระดิ่งรวมสมาธิทั้งห้อง"
            >
              <Bell className="w-4 h-4 fill-slate-900" />
              <span className="hidden sm:inline">สั่นกระดิ่งสมาธิ</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCheerPrompt(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-black text-xs shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
              title="ส่งกำลังใจให้เด็กๆ ทั้งห้อง"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">ส่งกำลังใจทั้งห้อง</span>
            </button>

            {/* Projector Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsProjectorMode(!isProjectorMode)}
              className={`p-2 rounded-2xl border transition-all cursor-pointer ${
                isProjectorMode
                  ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-md'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
              title={isProjectorMode ? 'ออกจากโหมดโปรเจกเตอร์' : 'เปิดโหมดขึ้นจอโปรเจกเตอร์ / Smart TV'}
            >
              {isProjectorMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Demo Student Actions */}
            <button
              type="button"
              onClick={handleSeedDemo}
              disabled={isSeedingDemo}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-black transition-all cursor-pointer"
              title="เพิ่มนักเรียนจำลอง 4 คนเพื่อทดสอบแดชบอร์ด"
            >
              <span>+ เด็กสาธิต</span>
            </button>
            {students.length > 0 && (
              <button
                type="button"
                onClick={handleClearStudents}
                className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all cursor-pointer"
                title="ล้างรายชื่อนักเรียน"
              >
                ล้างรายชื่อ
              </button>
            )}

            <button
              type="button"
              onClick={handleCloseRoom}
              className="p-2 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300 transition-all cursor-pointer text-xs font-bold"
              title="ปิดห้องเรียนนี้"
            >
              ปิดห้อง
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
              title="ย่อหน้านี้"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Live Metrics Ribbon */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 sm:p-4 border-b ${
            isProjectorMode
              ? 'bg-indigo-900/30 border-indigo-800 text-white'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          {/* Card 1: Students count */}
          <div
            className={`p-3 rounded-2xl border flex items-center gap-3 ${
              isProjectorMode
                ? 'bg-indigo-900/60 border-indigo-700'
                : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl shrink-0">
              👥
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400">นักเรียนในห้อง</p>
              <p className="text-base sm:text-lg font-black leading-tight text-blue-500">
                {activeStudents.length} / {students.length} คน
              </p>
            </div>
          </div>

          {/* Card 2: Total Stars */}
          <div
            className={`p-3 rounded-2xl border flex items-center gap-3 ${
              isProjectorMode
                ? 'bg-indigo-900/60 border-indigo-700'
                : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl shrink-0">
              ⭐
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400">ดาวสะสมรวม</p>
              <p className="text-base sm:text-lg font-black leading-tight text-amber-500">
                {totalStars} / {liveRoom.targetStars} ดวง
              </p>
            </div>
          </div>

          {/* Card 3: Class Accuracy */}
          <div
            className={`p-3 rounded-2xl border flex items-center gap-3 ${
              isProjectorMode
                ? 'bg-indigo-900/60 border-indigo-700'
                : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shrink-0">
              🎯
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400">ความแม่นยำเฉลี่ย</p>
              <p className="text-base sm:text-lg font-black leading-tight text-emerald-500">
                {averageAccuracy}%
              </p>
            </div>
          </div>

          {/* Card 4: Need Help Alert Counter */}
          <div
            className={`p-3 rounded-2xl border flex items-center gap-3 ${
              studentsNeedingHelp.length > 0
                ? 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-300 animate-pulse'
                : isProjectorMode
                ? 'bg-indigo-900/60 border-indigo-700'
                : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                studentsNeedingHelp.length > 0
                  ? 'bg-rose-500 text-white'
                  : 'bg-purple-100 text-purple-600'
              }`}
            >
              {studentsNeedingHelp.length > 0 ? '🚨' : '🙋'}
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400">ต้องการความช่วยเหลือ</p>
              <p
                className={`text-base sm:text-lg font-black leading-tight ${
                  studentsNeedingHelp.length > 0 ? 'text-rose-600' : 'text-slate-700'
                }`}
              >
                {studentsNeedingHelp.length} คน
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Students Grid Body */}
        <div className="p-3.5 sm:p-5 flex-1 overflow-y-auto">
          {students.length === 0 ? (
            /* Empty State */
            <div className="py-12 sm:py-16 text-center flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-4xl sm:text-5xl shadow-inner">
                🏫
              </div>
              <div className="max-w-md">
                <h3
                  className={`text-lg sm:text-xl font-black ${
                    isProjectorMode ? 'text-white' : 'text-slate-800'
                  }`}
                >
                  กำลังรอนักเรียนเชื่อมต่อเข้าห้องเรียน...
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  บอกให้นักเรียนกดปุ่ม "🏫 ห้องเรียนจำลอง" ที่หน้าจอ แล้วพิมพ์รหัสห้อง:
                </p>
                <div className="mt-3 inline-block font-mono text-3xl font-black px-6 py-2 rounded-2xl bg-indigo-600 text-white shadow-md tracking-widest">
                  {liveRoom.roomCode}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleSeedDemo}
                    disabled={isSeedingDemo}
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    <span>👥</span>
                    <span>{isSeedingDemo ? 'กำลังจำลองนักเรียน...' : 'เพิ่มนักเรียนสาธิต 4 คน (Demo Preview)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{isCopied ? 'คัดลอกรหัสแล้ว' : 'คัดลอกรหัสห้อง'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {students.map((student) => {
                const isOnline = Date.now() - student.lastActive < 120000;
                const needsHelp = student.helpRequested;

                return (
                  <div
                    key={student.studentId}
                    className={`rounded-3xl p-4 border-3 transition-all relative flex flex-col justify-between gap-3 ${
                      needsHelp
                        ? 'bg-rose-50 border-rose-500 ring-4 ring-rose-200 shadow-lg scale-102 animate-pulse'
                        : isProjectorMode
                        ? 'bg-indigo-900/50 border-indigo-700 text-white'
                        : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
                    }`}
                  >
                    {/* Top Row: Avatar, Name & Live Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-2xl shadow-xs">
                            {student.avatar || '🧒'}
                          </div>
                          <span
                            className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                              isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                            title={isOnline ? 'ออนไลน์สด' : 'ไม่ได้ขยับ'}
                          />
                        </div>
                        <div>
                          <h4
                            className={`text-sm sm:text-base font-black truncate max-w-[130px] ${
                              isProjectorMode ? 'text-white' : 'text-slate-800'
                            }`}
                          >
                            {student.studentName}
                          </h4>
                          <span className="text-[10px] font-bold text-slate-500">
                            {student.grade === 'K1'
                              ? 'อนุบาล 1'
                              : student.grade === 'K2'
                              ? 'อนุบาล 2'
                              : student.grade === 'K3'
                              ? 'อนุบาล 3'
                              : student.grade === 'P1'
                              ? 'ประถม 1'
                              : student.grade === 'P2'
                              ? 'ประถม 2'
                              : student.grade === 'P3'
                              ? 'ประถม 3'
                              : 'นักเรียน'}
                          </span>
                        </div>
                      </div>

                      {/* Stars count on card */}
                      <div className="flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2 py-1 rounded-xl text-xs font-black shrink-0">
                        <span>⭐</span>
                        <span>{student.starsEarned || 0}</span>
                      </div>
                    </div>

                    {/* Middle Row: Current Activity & Level */}
                    <div
                      className={`p-2.5 rounded-2xl border text-xs ${
                        needsHelp
                          ? 'bg-rose-100/80 border-rose-300 text-rose-950 font-bold'
                          : isProjectorMode
                          ? 'bg-indigo-950/60 border-indigo-800'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-slate-500">
                        <span>กำลังเล่น / ทำกิจกรรม:</span>
                        <span className="font-mono text-emerald-600 font-black">
                          {student.accuracy || 100}% แม่นยำ
                        </span>
                      </div>
                      <p className="font-black text-xs sm:text-sm mt-0.5 truncate">
                        {student.currentGame || 'เกมการศึกษา'}
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                        {student.currentLevel || 'ด่านที่ 1'}
                      </p>
                    </div>

                    {/* Needs Help Banner on Card */}
                    {needsHelp && (
                      <div className="bg-rose-500 text-white rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-xs">
                        <div className="flex items-center gap-1.5 text-xs font-black">
                          <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
                          <span className="truncate">
                            {student.helpMessage || 'หนูขอความช่วยเหลือค่ะ'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleResolveHelp(student.studentId)}
                          className="px-2 py-1 rounded-lg bg-white text-rose-700 font-black text-[10px] shrink-0 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          ช่วยแล้ว ✓
                        </button>
                      </div>
                    )}

                    {/* Bottom Row: Quick Teacher Cheers */}
                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400">ส่งเชียร์:</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleCheerStudent(student, 'heart')}
                          className="p-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs transition-transform active:scale-90 cursor-pointer"
                          title="ส่งหัวใจ"
                        >
                          💖
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCheerStudent(student, 'star')}
                          className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-700 text-xs transition-transform active:scale-90 cursor-pointer"
                          title="ส่งดาวชื่นชม"
                        >
                          ⭐
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCheerStudent(student, 'clap')}
                          className="p-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs transition-transform active:scale-90 cursor-pointer"
                          title="ปรบมือให้"
                        >
                          👏
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <footer
          className={`p-3 sm:p-4 border-t text-xs font-bold flex flex-wrap items-center justify-between gap-2 ${
            isProjectorMode
              ? 'border-indigo-800 bg-indigo-950 text-indigo-300'
              : 'border-slate-100 bg-slate-50 text-slate-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>💡 ข้อมูลอัปเดตแบบ Real-time จากทุกอุปกรณ์ของนักเรียน</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-black shadow-2xs flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์สรุปผลห้องเรียน</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Broadcast Bell Custom Message Prompt Modal */}
      {showBellPrompt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-400 max-w-md w-full flex flex-col gap-4 text-slate-800 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl">
                🔔
              </div>
              <div>
                <h3 className="text-lg font-black">สั่นกระดิ่งรวมสมาธิทั้งห้อง</h3>
                <p className="text-xs text-slate-500">
                  ส่งเสียงระฆังและข้อความเตือนไปยังหน้าจอของนักเรียนทุกคน
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">
                ข้อความประกาศ:
              </label>
              <input
                type="text"
                value={customBellMessage}
                onChange={(e) => setCustomBellMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowBellPrompt(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleBroadcastBell}
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs shadow-md"
              >
                สั่นกระดิ่งทันที 🔔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Cheer Custom Message Prompt Modal */}
      {showCheerPrompt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-pink-400 max-w-md w-full flex flex-col gap-4 text-slate-800 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-3xl">
                💖
              </div>
              <div>
                <h3 className="text-lg font-black">ส่งกำลังใจให้ทั้งห้อง</h3>
                <p className="text-xs text-slate-500">
                  ส่งสายฝนหัวใจและเสียงเอฟเฟกต์ชื่นชมไปให้นักเรียนทุกคน
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">
                ข้อความชื่นชม:
              </label>
              <input
                type="text"
                value={customCheerMessage}
                onChange={(e) => setCustomCheerMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-pink-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCheerPrompt(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleCheerAll}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 text-white font-black text-xs shadow-md"
              >
                ส่งกำลังใจทันที 💖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
