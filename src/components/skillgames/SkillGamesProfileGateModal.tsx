import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  UserCheck,
  UserPlus,
  Play,
  Sparkles,
  Search,
  Volume2,
  Check,
  Smile,
  ShieldCheck,
  Clock,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { ChildProfile, Grade } from '../../types';
import { soundEffects, speakText } from '../../services/audioService';
import {
  AVATAR_COLOR_OPTIONS,
  AVATAR_ICON_CATEGORIES,
  getAvatarColorOption,
} from '../../utils/avatarUtils';

interface SkillGamesProfileGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: ChildProfile[];
  activeProfile: ChildProfile;
  currentGrade: Grade;
  onSelectProfileAndEnter: (profileId: string) => void;
  onCreateProfileAndEnter: (
    name: string,
    grade: Grade,
    avatar: string,
    avatarBg: string
  ) => void;
  onEnterAsGuest: (guestGrade: Grade) => void;
  soundVolume: number;
}

type GateTab = 'select' | 'create' | 'guest';

export const SkillGamesProfileGateModal: React.FC<SkillGamesProfileGateModalProps> = ({
  isOpen,
  onClose,
  profiles,
  activeProfile,
  currentGrade,
  onSelectProfileAndEnter,
  onCreateProfileAndEnter,
  onEnterAsGuest,
  soundVolume,
}) => {
  const [activeTab, setActiveTab] = useState<GateTab>('select');

  // Search and Grade filter for selecting profiles
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<'ALL' | Grade>('ALL');

  // Create form state
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState<Grade>(currentGrade || 'K1');
  const [selectedAvatar, setSelectedAvatar] = useState('🐰');
  const [selectedAvatarBg, setSelectedAvatarBg] = useState('amber');
  const [avatarCategoryIndex, setAvatarCategoryIndex] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);

  // Guest mode state
  const [guestGrade, setGuestGrade] = useState<Grade>(currentGrade || 'K1');

  // Play audio guidance when modal opens
  useEffect(() => {
    if (isOpen) {
      speakText(
        'ยินดีต้อนรับสู่ศูนย์เกมการศึกษา กรุณาเลือกโปรไฟล์ สร้างโปรไฟล์ใหม่ หรือเข้าเล่นโดยไม่ต้องใช้โปรไฟล์ได้เลยจ้า',
        'th',
        soundVolume
      );
    }
  }, [isOpen, soundVolume]);

  // Filter profiles based on search and grade
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      const matchSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
      const matchGrade = gradeFilter === 'ALL' || p.grade === gradeFilter;
      return matchSearch && matchGrade;
    });
  }, [profiles, searchQuery, gradeFilter]);

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) {
      setFormError('กรุณากรอกชื่อหรือชื่อเล่นของนักเรียนนะจ๊ะ');
      soundEffects.playIncorrect(soundVolume);
      return;
    }
    setFormError(null);
    soundEffects.playSuccess(soundVolume);
    onCreateProfileAndEnter(trimmed, newGrade, selectedAvatar, selectedAvatarBg);
  };

  const handleGuestSubmit = () => {
    soundEffects.playSuccess(soundVolume);
    onEnterAsGuest(guestGrade);
  };

  const currentColorConfig = getAvatarColorOption(selectedAvatarBg);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border-4 border-indigo-200 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 p-4 sm:p-5 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/40 flex items-center justify-center text-2xl shadow-inner shrink-0">
              🧩
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wide text-white drop-shadow-xs">
                  เข้าสู่ศูนย์เกมการศึกษา & ฝึกทักษะปฐมวัย
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    speakText(
                      'กรุณาเลือกโปรไฟล์ สร้างโปรไฟล์ใหม่ หรือเข้าเล่นโดยไม่ต้องใช้โปรไฟล์ได้เลยจ้า',
                      'th',
                      soundVolume
                    )
                  }
                  className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="ฟังเสียงคำแนะนำ"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-purple-100 font-medium">
                เลือกโปรไฟล์ของคุณเพื่อสะสมดาว หรือเริ่มเล่นทันที
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all cursor-pointer shrink-0"
            title="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Main Action Tabs */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50/80 p-1.5 gap-1.5 shrink-0">
          {/* Tab 1: Select Profile */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setActiveTab('select');
            }}
            className={`py-2 px-2 sm:px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'select'
                ? 'bg-white text-indigo-700 shadow-sm border border-indigo-200'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-white/60'
            }`}
          >
            <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="truncate">เลือกโปรไฟล์</span>
            <span className="hidden sm:inline px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800 text-[10px]">
              {profiles.length}
            </span>
          </button>

          {/* Tab 2: Create Profile */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setActiveTab('create');
            }}
            className={`py-2 px-2 sm:px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'create'
                ? 'bg-white text-pink-700 shadow-sm border border-pink-200'
                : 'text-slate-600 hover:text-pink-600 hover:bg-white/60'
            }`}
          >
            <UserPlus className="w-4 h-4 text-pink-600 shrink-0" />
            <span className="truncate">สร้างโปรไฟล์ใหม่</span>
          </button>

          {/* Tab 3: Guest / No Profile */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setActiveTab('guest');
            }}
            className={`py-2 px-2 sm:px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'guest'
                ? 'bg-white text-emerald-700 shadow-sm border border-emerald-200'
                : 'text-slate-600 hover:text-emerald-600 hover:bg-white/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">ไม่ต้องใช้โปรไฟล์</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {/* ========================================================= */}
          {/* TAB 1: SELECT EXISTING PROFILE                            */}
          {/* ========================================================= */}
          {activeTab === 'select' && (
            <div className="flex flex-col gap-3">
              {/* Search and Grade Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full sm:flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ค้นหาชื่อหรือชื่อเล่นนักเรียน..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Grade Filters */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto shrink-0 justify-center">
                  {(['ALL', 'K1', 'K2', 'K3'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        soundEffects.playTap(soundVolume);
                        setGradeFilter(g);
                      }}
                      className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                        gradeFilter === g
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {g === 'ALL'
                        ? 'ทั้งหมด'
                        : g === 'K1'
                        ? 'อ.1'
                        : g === 'K2'
                        ? 'อ.2'
                        : 'อ.3'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Profiles Grid */}
              {filteredProfiles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
                  {filteredProfiles.map((p) => {
                    const isActive = p.id === activeProfile?.id;
                    const colorConfig = getAvatarColorOption(p.avatarBg || 'amber');

                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          soundEffects.playSuccess(soundVolume);
                          onSelectProfileAndEnter(p.id);
                        }}
                        className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all cursor-pointer group active:scale-98 ${
                          isActive
                            ? 'bg-indigo-50/70 border-indigo-500 shadow-sm ring-2 ring-indigo-200'
                            : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Avatar with Custom Background */}
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-2 ${colorConfig.bgClass} ${colorConfig.borderClass} shadow-xs shrink-0`}
                          >
                            <span>{p.avatar || '🐰'}</span>
                          </div>

                          {/* Profile Details */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-black text-xs sm:text-sm text-slate-800 truncate">
                                {p.name}
                              </h4>
                              {isActive && (
                                <span className="bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full shrink-0">
                                  ปัจจุบัน
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 font-bold">
                              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                                {p.grade === 'K1'
                                  ? 'อนุบาล 1'
                                  : p.grade === 'K2'
                                  ? 'อนุบาล 2'
                                  : 'อนุบาล 3'}
                              </span>
                              <span>⭐ {p.totalScore || 0} คะแนน</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Arrow */}
                        <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center gap-2">
                  <span className="text-4xl">🔍</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-600">
                    ไม่พบโปรไฟล์ที่ตรงกับคำค้นหา
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      setActiveTab('create');
                    }}
                    className="mt-1 px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>สร้างโปรไฟล์ใหม่ตอนนี้</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: CREATE NEW PROFILE                                 */}
          {/* ========================================================= */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
              {formError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <span>⚠️</span>
                  <span>{formError}</span>
                </div>
              )}

              {/* Top Row: Name and Grade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    ชื่อ / ชื่อเล่นของนักเรียน <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="เช่น น้องต้นกล้า, น้องมะลิ"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    ระดับชั้นอนุบาล <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(
                      [
                        { id: 'K1', label: 'อ.1 (3 ขวบ)' },
                        { id: 'K2', label: 'อ.2 (4 ขวบ)' },
                        { id: 'K3', label: 'อ.3 (5 ขวบ)' },
                      ] as const
                    ).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          soundEffects.playTap(soundVolume);
                          setNewGrade(item.id);
                        }}
                        className={`py-2 text-[11px] font-black rounded-xl border-2 transition-all cursor-pointer text-center ${
                          newGrade === item.id
                            ? 'bg-pink-50 border-pink-500 text-pink-700 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Avatar Live Preview */}
              <div className="flex items-center gap-3 bg-linear-to-r from-pink-50/60 to-purple-50/60 p-3 rounded-2xl border border-pink-100">
                <div
                  className={`w-14 h-14 rounded-2xl border-3 flex items-center justify-center text-3xl shadow-sm shrink-0 ${currentColorConfig.bgClass} ${currentColorConfig.borderClass}`}
                >
                  <span>{selectedAvatar}</span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800">
                    {newName.trim() ? newName.trim() : 'ชื่อนักเรียน'}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-bold">
                    ระดับชั้น{' '}
                    {newGrade === 'K1'
                      ? 'อนุบาล 1'
                      : newGrade === 'K2'
                      ? 'อนุบาล 2'
                      : 'อนุบาล 3'}{' '}
                    • สี: {currentColorConfig.name}
                  </p>
                </div>
              </div>

              {/* Avatar Background Colors */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  เลือกสีพื้นหลังอวตาร:
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {AVATAR_COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        soundEffects.playTap(soundVolume);
                        setSelectedAvatarBg(c.id);
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                        c.bgClass
                      } ${c.borderClass} ${
                        selectedAvatarBg === c.id
                          ? 'ring-3 ring-pink-400 scale-110 shadow-xs'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                      title={c.name}
                    >
                      {selectedAvatarBg === c.id && (
                        <Check className="w-3.5 h-3.5 text-slate-800" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar Emoji Categories & Picker */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-black text-slate-700">
                    เลือกรูปอวตารน่ารัก:
                  </label>
                  <div className="flex items-center gap-1">
                    {AVATAR_ICON_CATEGORIES.map((cat, idx) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          soundEffects.playTap(soundVolume);
                          setAvatarCategoryIndex(idx);
                        }}
                        className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          avatarCategoryIndex === idx
                            ? 'bg-pink-100 text-pink-800'
                            : 'text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        <span>{cat.icon}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                  {AVATAR_ICON_CATEGORIES[avatarCategoryIndex]?.items.map((item, itemIdx) => (
                    <button
                      key={`gate-avatar-${avatarCategoryIndex}-${item.emoji}-${itemIdx}`}
                      type="button"
                      onClick={() => {
                        soundEffects.playTap(soundVolume);
                        setSelectedAvatar(item.emoji);
                      }}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                        selectedAvatar === item.emoji
                          ? 'bg-white shadow-md ring-2 ring-pink-500 scale-110'
                          : 'hover:bg-white/80'
                      }`}
                      title={item.name}
                    >
                      <span>{item.emoji}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Create and Enter Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <span>บันทึกโปรไฟล์ & เริ่มเล่นทันที</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ========================================================= */}
          {/* TAB 3: GUEST MODE (NO PROFILE REQUIRED)                   */}
          {/* ========================================================= */}
          {activeTab === 'guest' && (
            <div className="flex flex-col items-center gap-4 py-2 text-center">
              {/* Illustrated Badge */}
              <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-emerald-100 via-teal-100 to-cyan-100 border-3 border-emerald-300 shadow-md flex items-center justify-center text-4xl animate-bounce">
                🎈
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-800">
                  เข้าเล่นทันทีโดยไม่ต้องใช้โปรไฟล์
                </h3>
                <p className="text-xs text-slate-500 font-bold max-w-md mt-1 leading-relaxed">
                  โหมดทดลองเล่น / แขกผู้มาเยือน (Guest Mode)
                  เหมาะสำหรับคุณครูที่เปิดเล่นบนจอแสดงผลหน้าร้าน
                  หรือผู้ปกครองที่ต้องการทดลองเล่นเกมก่อน โดยไม่บันทึกคะแนนสะสมลงในระบบ
                </p>
              </div>

              {/* Select Grade for Guest Session */}
              <div className="w-full max-w-sm bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-3">
                <span className="text-xs font-black text-emerald-900 block mb-2">
                  เลือกระดับชั้นที่ต้องการเล่น:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'K1', label: 'อนุบาล 1', age: '3 ขวบ' },
                      { id: 'K2', label: 'อนุบาล 2', age: '4 ขวบ' },
                      { id: 'K3', label: 'อนุบาล 3', age: '5 ขวบ' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        soundEffects.playTap(soundVolume);
                        setGuestGrade(item.id);
                      }}
                      className={`p-2.5 rounded-xl border-2 font-black transition-all cursor-pointer flex flex-col items-center ${
                        guestGrade === item.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm scale-102'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <span className="text-xs">{item.label}</span>
                      <span className="text-[10px] opacity-80">{item.age}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features list */}
              <div className="w-full max-w-sm text-left bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-600 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>เล่นได้ครบทั้ง 11 หมวดเกมการศึกษา</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>สามารถสลับโปรไฟล์หรือบันทึกใหม่ได้ตลอดเวลาในหน้าเกม</span>
                </div>
              </div>

              {/* Big Enter as Guest Button */}
              <button
                type="button"
                onClick={handleGuestSubmit}
                className="w-full max-w-sm py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 text-white font-black text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <span>เข้าเล่นเลย (โหมดผู้มาเยือน)</span>
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
