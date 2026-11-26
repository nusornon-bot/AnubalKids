import React, { useState, useEffect } from 'react';
import {
  ClassroomRoom,
  createClassroomRoom,
  findRoomByCode,
  joinClassroomRoom,
  getTeacherActiveRoom,
  getStudentActiveRoom,
  normalizeRoomCode,
} from '../services/classroomRoomService';
import { ChildProfile, Grade } from '../types';
import { soundEffects, speakText } from '../services/audioService';
import {
  School,
  LogIn,
  PlusCircle,
  Sparkles,
  Users,
  CheckCircle2,
  X,
  Volume2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface ClassroomJoinModalProps {
  activeProfile: ChildProfile;
  soundVolume: number;
  onClose: () => void;
  onJoinedAsStudent: (room: ClassroomRoom) => void;
  onOpenTeacherDashboard: (room: ClassroomRoom) => void;
}

export const ClassroomJoinModal: React.FC<ClassroomJoinModalProps> = ({
  activeProfile,
  soundVolume,
  onClose,
  onJoinedAsStudent,
  onOpenTeacherDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'join' | 'create'>('join');

  // Student Join State
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [joinError, setJoinError] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  // Teacher Create State
  const [roomNameInput, setRoomNameInput] = useState(() => {
    const g = activeProfile.grade;
    if (g === 'K1') return 'ห้องเรียนจำลอง อ.1';
    if (g === 'K2') return 'ห้องเรียนจำลอง อ.2';
    if (g === 'K3') return 'ห้องเรียนจำลอง อ.3';
    if (g === 'P1') return 'ห้องเรียนจำลอง ป.1';
    if (g === 'P2') return 'ห้องเรียนจำลอง ป.2';
    if (g === 'P3') return 'ห้องเรียนจำลอง ป.3';
    return 'ห้องเรียนจำลอง';
  });
  const [teacherNameInput, setTeacherNameInput] = useState('คุณครูใจดี');
  const [selectedGrade, setSelectedGrade] = useState<Grade | 'ALL'>(activeProfile.grade || 'ALL');
  const [targetActivity, setTargetActivity] = useState<string>('all');
  const [targetStars, setTargetStars] = useState<number>(30);
  const [isCreating, setIsCreating] = useState(false);

  // Existing active rooms
  const [savedTeacherRoom, setSavedTeacherRoom] = useState<ClassroomRoom | null>(null);
  const [savedStudentRoom, setSavedStudentRoom] = useState<ClassroomRoom | null>(null);

  useEffect(() => {
    setSavedTeacherRoom(getTeacherActiveRoom());
    setSavedStudentRoom(getStudentActiveRoom());
  }, []);

  // Handle Student Join by Code
  const handleJoin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setJoinError('');

    const cleanCode = normalizeRoomCode(roomCodeInput);
    if (!cleanCode || cleanCode.length < 4) {
      setJoinError('กรุณากรอกรหัสห้องให้ถูกต้อง (อย่างน้อย 4-6 หลัก)');
      speakText('กรุณาใส่รหัสห้องให้ถูกต้องนะจ๊ะ', 'th', soundVolume);
      return;
    }

    setIsJoining(true);
    soundEffects.playTap(soundVolume);

    try {
      const room = await findRoomByCode(cleanCode);
      if (!room) {
        setJoinError('ไม่พบห้องเรียนรหัสนี้ หรือห้องเรียนอาจปิดไปแล้ว');
        speakText('ไม่พบห้องเรียนรหัสนี้จ้ะ ลองตรวจสอบอีกครั้งนะ', 'th', soundVolume);
        setIsJoining(false);
        return;
      }

      // Join room in Firestore
      await joinClassroomRoom(room, activeProfile, 'ศูนย์เกมการศึกษา & ฝึกทักษะ');
      soundEffects.playVictory(soundVolume);
      speakText(`เชื่อมต่อเข้า ${room.name} สำเร็จแล้วจ้า!`, 'th', soundVolume);
      onJoinedAsStudent(room);
      onClose();
    } catch (err) {
      console.warn('Error joining classroom room:', err);
      setJoinError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsJoining(false);
    }
  };

  // Handle Teacher Create Room
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNameInput.trim()) return;

    setIsCreating(true);
    soundEffects.playTap(soundVolume);

    try {
      const room = await createClassroomRoom({
        name: roomNameInput,
        teacherName: teacherNameInput,
        grade: selectedGrade,
        targetActivity,
        targetStars,
      });

      soundEffects.playVictory(soundVolume);
      speakText(`สร้างห้อง ${room.name} รหัส ${room.roomCode} สำเร็จแล้วค่ะ`, 'th', soundVolume);
      onOpenTeacherDashboard(room);
      onClose();
    } catch (err) {
      console.warn('Error creating classroom room:', err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="classroom-join-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-indigo-200 overflow-hidden flex flex-col text-slate-800 animate-fadeIn">
        {/* Modal Header */}
        <header className="p-4 sm:p-5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner shrink-0">
              🏫
            </div>
            <div>
              <h2 id="classroom-join-title" className="text-lg sm:text-xl font-black">
                ห้องเรียนจำลอง Real-time
              </h2>
              <p className="text-xs text-indigo-100 font-bold">
                Classroom Virtual Room สำหรับครู, เด็กปฐมวัย และประถมศึกษา
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
            title="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Tab Switcher: Student vs Teacher */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setActiveTab('join');
            }}
            className={`flex-1 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'join'
                ? 'bg-white text-indigo-700 shadow-sm border border-indigo-100'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>เข้าห้องเรียน (เด็กๆ / นักเรียน)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setActiveTab('create');
            }}
            className={`flex-1 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'create'
                ? 'bg-white text-indigo-700 shadow-sm border border-indigo-100'
                : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>สร้างห้องเรียน (คุณครู)</span>
          </button>
        </div>

        {/* Tab 1: Student Join by Code */}
        {activeTab === 'join' && (
          <div className="p-5 sm:p-6 flex flex-col gap-4">
            {/* Quick Resume Active Room if joined previously */}
            {savedStudentRoom && (
              <div className="bg-indigo-50 border-2 border-indigo-300 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-indigo-900">
                    มีห้องเรียนที่เคยเชื่อมต่อไว้:
                  </p>
                  <p className="text-sm font-black text-indigo-700">
                    {savedStudentRoom.name} ({savedStudentRoom.roomCode})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    onJoinedAsStudent(savedStudentRoom);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-xs cursor-pointer active:scale-95"
                >
                  เข้าห้องนี้เลย
                </button>
              </div>
            )}

            <form onSubmit={handleJoin} className="flex flex-col gap-4">
              <div className="text-center">
                <label className="block text-sm font-black text-slate-800 mb-1">
                  กรอกรหัสห้อง 6 หลักที่คุณครูให้:
                </label>
                <p className="text-xs text-slate-500">
                  เช่น <span className="font-mono font-black text-indigo-600">KID829</span> หรือ <span className="font-mono font-black text-indigo-600">A1B2C3</span>
                </p>
              </div>

              <div className="flex justify-center">
                <input
                  type="text"
                  maxLength={8}
                  placeholder="KID..."
                  value={roomCodeInput}
                  onChange={(e) => {
                    setRoomCodeInput(e.target.value.toUpperCase());
                    setJoinError('');
                  }}
                  className="w-full max-w-xs text-center font-mono text-2xl sm:text-3xl font-black tracking-widest px-4 py-3 rounded-2xl border-3 border-indigo-300 focus:border-indigo-600 focus:outline-hidden uppercase bg-indigo-50/50 shadow-inner"
                  autoFocus
                />
              </div>

              {joinError && (
                <div className="bg-rose-50 border border-rose-300 text-rose-700 px-3 py-2 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{joinError}</span>
                </div>
              )}

              {/* Student Profile Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 flex items-center justify-center text-xl shrink-0">
                    {activeProfile.avatar || '🧒'}
                  </div>
                  <div>
                    <span className="font-bold text-slate-500">จะเข้าห้องด้วยชื่อ:</span>
                    <p className="font-black text-slate-800">{activeProfile.name}</p>
                  </div>
                </div>

                <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-lg font-black text-[11px]">
                  {activeProfile.grade === 'K1'
                    ? 'อนุบาล 1'
                    : activeProfile.grade === 'K2'
                    ? 'อนุบาล 2'
                    : activeProfile.grade === 'K3'
                    ? 'อนุบาล 3'
                    : activeProfile.grade === 'P1'
                    ? 'ประถมศึกษาปีที่ 1'
                    : activeProfile.grade === 'P2'
                    ? 'ประถมศึกษาปีที่ 2'
                    : 'ประถมศึกษาปีที่ 3'}
                </span>
              </div>

              <button
                type="submit"
                disabled={isJoining || !roomCodeInput.trim()}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-base shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isJoining ? 'กำลังเชื่อมต่อห้องเรียน...' : 'เชื่อมต่อเข้าห้องเรียนสด 🚀'}</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Teacher Create Room */}
        {activeTab === 'create' && (
          <div className="p-5 sm:p-6 flex flex-col gap-4">
            {/* Quick Resume Active Teacher Room if exists */}
            {savedTeacherRoom && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-amber-900">
                    คุณครูมีห้องเรียนสดที่เปิดค้างไว้:
                  </p>
                  <p className="text-sm font-black text-amber-800">
                    {savedTeacherRoom.name} (รหัส {savedTeacherRoom.roomCode})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    onOpenTeacherDashboard(savedTeacherRoom);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs shadow-xs cursor-pointer active:scale-95"
                >
                  เปิดแดชบอร์ด 🖥️
                </button>
              </div>
            )}

            <form onSubmit={handleCreate} className="flex flex-col gap-3.5">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  ชื่อห้องเรียน / กิจกรรม:
                </label>
                <input
                  type="text"
                  required
                  value={roomNameInput}
                  onChange={(e) => setRoomNameInput(e.target.value)}
                  placeholder="เช่น ห้องอนุบาล 2/1 ดอกกล้วยไม้ หรือ ห้อง ป.1/2 คนเก่ง"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  ชื่อคุณครูผู้สอน:
                </label>
                <input
                  type="text"
                  required
                  value={teacherNameInput}
                  onChange={(e) => setTeacherNameInput(e.target.value)}
                  placeholder="เช่น ครูดาว, ครูใจดี"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    ระดับชั้น:
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value as Grade | 'ALL')}
                    className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="ALL">ทุกระดับชั้น (อ.1 - ป.6 ครบทุกหลักสูตร)</option>
                    <optgroup label="ระดับปฐมวัย (อนุบาล 1 - 3)">
                      <option value="K1">อนุบาล 1 (K1)</option>
                      <option value="K2">อนุบาล 2 (K2)</option>
                      <option value="K3">อนุบาล 3 (K3)</option>
                    </optgroup>
                    <optgroup label="ระดับประถมศึกษา (ป.1 - ป.6 แจกลูกสะกดคำ & สมรรถนะ)">
                      <option value="P1">ประถมศึกษาปีที่ 1 (ป.1)</option>
                      <option value="P2">ประถมศึกษาปีที่ 2 (ป.2)</option>
                      <option value="P3">ประถมศึกษาปีที่ 3 (ป.3)</option>
                      <option value="P4">ประถมศึกษาปีที่ 4 (ป.4)</option>
                      <option value="P5">ประถมศึกษาปีที่ 5 (ป.5)</option>
                      <option value="P6">ประถมศึกษาปีที่ 6 (ป.6)</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    เป้าหมายดาวรวมทั้งห้อง:
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={500}
                    value={targetStars}
                    onChange={(e) => setTargetStars(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  กิจกรรมเป้าหมายของห้อง:
                </label>
                <select
                  value={targetActivity}
                  onChange={(e) => setTargetActivity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="all">เล่นเสรีทุกกิจกรรม (ทั้งศูนย์เกม, แบบประเมิน และแจกลูกสะกดคำ)</option>
                  <optgroup label="หลักสูตรที่ ๓: ประลองแจกลูกสะกดคำ สพฐ. (ป.1 - ป.6)">
                    <option value="phonics_battle">⚔️ แข่งขันแจกลูกสะกดคำ ๑๐ หน่วย สพฐ. สดทั้งห้อง</option>
                    <option value="phonics_handwriting">✍️ ประลองคัดลายมือแจกลูกสะกดคำ (Hand Tracking)</option>
                    <option value="phonics_direct_indirect">🎯 ประลองมาตราตัวสะกดตรงและไม่ตรงมาตรา ๘ มาตรา</option>
                    <option value="phonics_cluster_lead">🚀 ประลองคำควบกล้ำและอักษรนำ</option>
                    <option value="phonics_tone_inflection">🎶 ประลองผันวรรณยุกต์อักษร ๓ หมู่</option>
                  </optgroup>
                  <optgroup label="หลักสูตรที่ ๒: สถานศึกษาฐานสมรรถนะ (CBE Primary ป.1 - ป.3)">
                    <option value="cbe_competencies">แบบฝึก 6 สมรรถนะหลัก (ป.1 - ป.3)</option>
                    <option value="cbe_interactive">ภารกิจ Interactive เสริมสมรรถนะ 5 นาที</option>
                  </optgroup>
                  <optgroup label="หลักสูตรที่ ๑: ระดับปฐมวัย (8 ทักษะพัฒนาการ)">
                    <option value="skill_games">เน้นศูนย์เกมการศึกษา 15 หมวด</option>
                    <option value="quiz">เน้นแบบประเมินพัฒนาการ 8 ด้าน</option>
                    <option value="matching">เกมจับคู่ภาพเหมือน & ภาพสัมพันธ์</option>
                    <option value="jigsaw">เกมต่อภาพจิ๊กซอว์มิติสัมพันธ์</option>
                    <option value="maze_path">เกมเขาวงกต & ลากเส้นตามรอย</option>
                    <option value="body_movement">เกมกายบริหาร & ท่าทางหรรษา</option>
                    <option value="calm_mind">เกมคลายใจ & ลมหายใจสุขสันต์</option>
                    <option value="social_manners">เกมมารยาทดี & เพื่อนรักแบ่งปัน</option>
                    <option value="brain_flex">เกมยืดหยุ่นความคิด & ยับยั้งใจ (EF)</option>
                  </optgroup>
                </select>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 text-xs text-indigo-900 font-bold">
                💡 เมื่อสร้างห้องแล้ว คุณครูจะได้ <strong>รหัสห้อง 6 หลัก</strong> และหน้าจอ <strong>แดชบอร์ดหลัก (Real-time Live Monitor)</strong> แสดงความคืบหน้าของเด็กทุกคนสดๆ!
              </div>

              <button
                type="submit"
                disabled={isCreating}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-base shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isCreating ? 'กำลังสร้างห้อง...' : 'สร้างห้องเรียน & เปิดแดชบอร์ดสด 🏫'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
