import React, { useState, useMemo, useEffect } from 'react';
import {
  Trophy,
  Crown,
  Medal,
  Flame,
  X,
  ShieldCheck,
  Eye,
  EyeOff,
  Users,
  Printer,
  Smile,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChildProfile, Grade, CurriculumMode } from '../types';
import { getAvatarColorOption } from '../utils/avatarUtils';
import { soundEffects } from '../services/audioService';
import { getCurriculumTheme } from '../utils/curriculumTheme';

interface TopPerformersModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: ChildProfile[];
  activeProfile: ChildProfile;
  soundVolume?: number;
  onSelectProfile?: (profileId: string) => void;
  curriculumMode?: CurriculumMode;
}

export type AnonymizeStyle = 'mascot' | 'masked' | 'code';

// Deterministic positive mascot code names
const MASCOT_PREFIXES = [
  'กระต่ายน้อย',
  'สิงโตกล้าหาญ',
  'เจ้าแพนด้า',
  'ลูกหมีใจดี',
  'มังกรน้อย',
  'ลูกสุนัขร่าเริง',
  'แมวเหมียวคิดไว',
  'โลมาแสนรู้',
  'ยูนิคอร์นสดใส',
  'ไดโนเสาร์ยอดนักสืบ',
  'นกฮูกรอบรู้',
  'กระรอกคล่องแคล่ว',
  'เพนกวินนักสำรวจ',
  'จิ้งจอกตาไว',
  'กัปตันอวกาศ',
  'ดาวนำทาง',
];

const MASCOT_TITLES = [
  'ยอดนักคิด 🌟',
  'คนเก่งประจำห้อง 🏆',
  'นักสืบตัวจิ๋ว 🔍',
  'สายรุ้งแห่งความสุข 🌈',
  'ผู้พิทักษ์ดวงดาว 🚀',
  'หัวใจทองคำ 💛',
  'จอมขยันขันแข็ง ⚡',
  'นักสำรวจผจญภัย 🧭',
  'ยิ้มแย้มแจ่มใส 😊',
  'ผู้เปี่ยมพลัง 💥',
  'อัจฉริยะคิดไว 💡',
  'ยอดนักแก้ปัญหา 🎯',
];

/**
 * Generate a consistent, cute anonymous alias from profile ID
 */
function getAnonymousName(
  profile: ChildProfile,
  style: AnonymizeStyle,
  revealMyName: boolean,
  isCurrent: boolean,
  forPrint: boolean = false
): string {
  // If forPrint is true, NEVER reveal real names on printed classroom bulletin boards
  if (isCurrent && revealMyName && !forPrint) {
    return `${profile.name} (คุณเอง ⭐)`;
  }

  const gradeText =
    profile.grade === 'K1' ? 'อ.1' : profile.grade === 'K2' ? 'อ.2' : 'อ.3';

  if (style === 'masked') {
    const raw = profile.name.trim();
    if (!raw) return `น้องนิรนาม (${gradeText})`;
    const firstChar = Array.from(raw)[0];
    return `น้อง ${firstChar}*** (${gradeText})`;
  }

  if (style === 'code') {
    let hash = 0;
    for (let i = 0; i < profile.id.length; i++) {
      hash = (hash * 31 + profile.id.charCodeAt(i)) >>> 0;
    }
    const num = (hash % 90) + 10;
    return `ผู้เล่น #${profile.grade}-${num}`;
  }

  // Default 'mascot' style
  let hash = 0;
  for (let i = 0; i < profile.id.length; i++) {
    hash = (hash * 37 + profile.id.charCodeAt(i)) >>> 0;
  }
  const prefix = MASCOT_PREFIXES[hash % MASCOT_PREFIXES.length];
  const title = MASCOT_TITLES[Math.floor(hash / 7) % MASCOT_TITLES.length];
  return `${prefix} ${title} (${gradeText})`;
}

export const TopPerformersModal: React.FC<TopPerformersModalProps> = ({
  isOpen,
  onClose,
  profiles,
  activeProfile,
  soundVolume = 0.8,
  curriculumMode = 'early_childhood',
}) => {
  const currTheme = getCurriculumTheme(curriculumMode);
  const [selectedGrade, setSelectedGrade] = useState<'ALL' | Grade>('ALL');
  const [sortBy, setSortBy] = useState<'score' | 'questions' | 'streak'>('score');
  const [anonymizeStyle, setAnonymizeStyle] = useState<AnonymizeStyle>('mascot');
  const [revealMyName, setRevealMyName] = useState<boolean>(true); // default: current child can see their own name if they wish

  // Clean up printing class if component unmounts or after print dialog
  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.classList.remove('printing-top-performers');
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
      document.body.classList.remove('printing-top-performers');
    };
  }, []);

  // Trigger celebration confetti on modal open
  useEffect(() => {
    if (isOpen) {
      try {
        soundEffects.playVictory(soundVolume);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899', '#3B82F6'],
        });
      } catch {
        // Ignore audio/confetti errors
      }
    }
  }, [isOpen, soundVolume]);

  // Filter and sort profiles for the leaderboard
  const rankedProfiles = useMemo(() => {
    const list = [...profiles].filter((p) => {
      if (selectedGrade === 'ALL') return true;
      return p.grade === selectedGrade;
    });

    list.sort((a, b) => {
      if (sortBy === 'score') {
        if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
        return (b.totalQuestions || 0) - (a.totalQuestions || 0);
      }
      if (sortBy === 'questions') {
        if ((b.totalQuestions || 0) !== (a.totalQuestions || 0)) {
          return (b.totalQuestions || 0) - (a.totalQuestions || 0);
        }
        return b.totalScore - a.totalScore;
      }
      if (sortBy === 'streak') {
        if ((b.streakDays || 0) !== (a.streakDays || 0)) {
          return (b.streakDays || 0) - (a.streakDays || 0);
        }
        return b.totalScore - a.totalScore;
      }
      return 0;
    });

    return list;
  }, [profiles, selectedGrade, sortBy]);

  // Overall statistics for the classroom session
  const classroomStats = useMemo(() => {
    const totalPoints = profiles.reduce((acc, p) => acc + (p.totalScore || 0), 0);
    const totalQuestions = profiles.reduce((acc, p) => acc + (p.totalQuestions || 0), 0);
    const avgScore = profiles.length > 0 ? Math.round(totalPoints / profiles.length) : 0;
    const maxStreak = Math.max(0, ...profiles.map((p) => p.streakDays || 1));

    return {
      totalPoints,
      totalQuestions,
      avgScore,
      maxStreak,
      learnersCount: profiles.length,
    };
  }, [profiles]);

  // Find the active profile's current rank in this view
  const myRank = useMemo(() => {
    const index = rankedProfiles.findIndex((p) => p.id === activeProfile.id);
    return index >= 0 ? index + 1 : null;
  }, [rankedProfiles, activeProfile.id]);

  if (!isOpen) return null;

  const top3 = rankedProfiles.slice(0, 3);

  const handlePrint = () => {
    try {
      document.body.classList.add('printing-top-performers');
      window.print();
    } catch {
      // Fallback
      window.print();
    } finally {
      setTimeout(() => {
        document.body.classList.remove('printing-top-performers');
      }, 1000);
    }
  };

  return (
    <div
      id="top-performers-modal-backdrop"
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200 select-none print:p-0 print:m-0 print:bg-white print:static print:overflow-visible"
      onClick={onClose}
    >
      <div
        id="top-performers-modal"
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl shadow-2xl max-w-4xl w-full border-4 ${currTheme.modalBorder} ring-2 ${currTheme.modalRing} overflow-hidden max-h-[94vh] flex flex-col animate-in zoom-in-95 duration-200 print:shadow-none print:border-none print:max-w-none print:max-h-none print:overflow-visible print:w-full print:rounded-none`}
      >
        {/* Dedicated Classroom Notice Board Printable Header (Visible ONLY on print) */}
        <div className="hidden print:block p-6 pb-4 bg-white border-b-2 border-slate-800 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-3xl font-black shrink-0 border-2 border-amber-600">
                🏆
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  กระดานเกียรติยศยอดนักคิด (Top Performers Leaderboard)
                </h1>
                <p className="text-xs text-slate-600 font-bold mt-0.5">
                  อนุบาลคิดส์ คิดส์ 🌟 Kids Hand Motion • ห้องเรียนปฐมวัย
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-700 font-medium">
              <div className="font-black text-sm text-slate-900">
                ระดับชั้น: {selectedGrade === 'ALL' ? 'ทุกระดับชั้น' : selectedGrade === 'K1' ? 'อนุบาล 1' : selectedGrade === 'K2' ? 'อนุบาล 2' : 'อนุบาล 3'}
              </div>
              <div className="text-slate-600 text-xs mt-0.5">
                วันที่พิมพ์: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="text-[11px] text-emerald-800 font-bold mt-1">
                🔒 กระดานนิรนามคุ้มครองข้อมูลส่วนบุคคลเด็กปฐมวัย (PDPA)
              </div>
            </div>
          </div>
        </div>

        {/* Modal Top Header with Curriculum Theme Gradient (Hidden during print) */}
        <div className={`no-print ${currTheme.modalHeaderBg} px-4 sm:px-6 py-4 flex items-center justify-between text-white shrink-0 shadow-md transition-colors`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl shadow-inner shrink-0">
              <Trophy className="w-7 h-7 text-yellow-200 fill-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>กระดานผู้นำยอดเยี่ยม</span>
                  <span className="text-xs font-bold bg-white/25 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                    {currTheme.shortName}
                  </span>
                </h2>
              </div>
              <p className={`text-xs sm:text-sm ${currTheme.modalHeaderSubtext} font-medium flex items-center gap-1.5 mt-0.5`}>
                <span>ตารางเกียรติยศสะสมคะแนนประจำเครื่อง / ห้องเรียน</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                <span className="text-emerald-200 font-bold">โหมดปกป้องข้อมูลส่วนบุคคล (Anonymous)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              id="btn-print-board-header"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/25 hover:bg-white/35 text-white text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95"
              title="พิมพ์กระดานคะแนนสำหรับติดบอร์ดห้องเรียน (Print Leaderboard)"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์บอร์ด</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-2xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Privacy Notice Banner (Hidden during print) */}
        <div className="no-print bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-blue-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>การคุ้มครองความเป็นส่วนตัวเด็กปฐมวัย:</strong> ระบบแสดงนามแฝงและสัญลักษณ์น่ารักแทนชื่อจริงโดยอัตโนมัติ เพื่อสร้างแรงบันดาลใจเชิงบวกในห้องเรียน
            </span>
          </div>

          {/* Privacy Toggle: Show my own name */}
          <button
            type="button"
            onClick={() => setRevealMyName(!revealMyName)}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-white hover:bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-200 transition-all cursor-pointer shrink-0 shadow-2xs"
            title="คลิกเพื่อสลับการแสดงชื่อจริงเฉพาะโปรไฟล์ของคุณ"
          >
            {revealMyName ? (
              <>
                <Eye className="w-3.5 h-3.5 text-indigo-600" />
                <span>แสดงชื่อเฉพาะฉัน: <span className="text-emerald-700 font-black">เปิด</span></span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                <span>ซ่อนชื่อทั้งหมด: <span className="text-slate-600 font-black">ปิด</span></span>
              </>
            )}
          </button>
        </div>

        {/* Active Child's Rank Highlight Bar (Hidden during print so board remains impartial) */}
        {myRank !== null && (
          <div className="no-print bg-amber-100/90 border-b-2 border-amber-300 px-4 sm:px-6 py-2 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-amber-950 font-bold">
              <span className="text-base">⭐</span>
              <span>
                อันดับของคุณในขณะนี้ ({revealMyName ? activeProfile.name : 'โปรไฟล์นี้'}):{' '}
                <span className="text-amber-800 font-black text-sm sm:text-base">
                  อันดับที่ #{myRank}
                </span>{' '}
                จากเพื่อนๆ ทั้งหมด {rankedProfiles.length} คน
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow-2xs">
                🪙 {activeProfile.totalScore.toLocaleString()} คะแนน
              </span>
              <span className="hidden sm:inline-block text-amber-800 font-bold text-xs">
                🔥 สตรีค {activeProfile.streakDays || 1} วัน
              </span>
            </div>
          </div>
        )}

        {/* Filter Controls & Anonymize Style Selector (Hidden during print) */}
        <div className="no-print bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2.5">
          {/* Grade Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1 mr-1">
              <span>ระดับชั้น:</span>
            </span>
            <button
              type="button"
              onClick={() => setSelectedGrade('ALL')}
              className={`text-xs font-black px-3 py-1 rounded-xl transition-all cursor-pointer ${
                selectedGrade === 'ALL'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              ทั้งหมด ({profiles.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedGrade('K1')}
              className={`text-xs font-black px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                selectedGrade === 'K1'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              อนุบาล 1
            </button>
            <button
              type="button"
              onClick={() => setSelectedGrade('K2')}
              className={`text-xs font-black px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                selectedGrade === 'K2'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              อนุบาล 2
            </button>
            <button
              type="button"
              onClick={() => setSelectedGrade('K3')}
              className={`text-xs font-black px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                selectedGrade === 'K3'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              อนุบาล 3
            </button>
          </div>

          {/* Sort By & Format Switcher */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Sort Selector */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-0.5">
              <span className="text-[11px] font-bold text-slate-500">เรียงตาม:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer py-0.5"
              >
                <option value="score">🪙 คะแนนรวมสูงสุด</option>
                <option value="questions">📝 คำถามที่ตอบสะสม</option>
                <option value="streak">🔥 วันเรียนรู้ต่อเนื่อง</option>
              </select>
            </div>

            {/* Masking Style */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-0.5">
              <span className="text-[11px] font-bold text-slate-500">รูปแบบชื่อ:</span>
              <select
                value={anonymizeStyle}
                onChange={(e) => setAnonymizeStyle(e.target.value as AnonymizeStyle)}
                className="text-xs font-bold text-indigo-700 bg-transparent outline-none cursor-pointer py-0.5"
              >
                <option value="mascot">🦁 นามแฝงมาสคอต</option>
                <option value="masked">🔒 ชื่อย่อ (น้อง น***)</option>
                <option value="code">🏷️ รหัสผู้เล่น (#K2-01)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Printable Document Scrollable Body */}
        <div className="printable-document p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50/50 print:bg-white print:p-4 print:overflow-visible print:space-y-4 print:max-h-none">
          {/* Top 3 Podium (If at least 1 child exists) */}
          {top3.length > 0 ? (
            <div className="bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30 rounded-3xl border-2 border-amber-200 p-4 sm:p-6 shadow-sm print:shadow-none print:border print:border-amber-300 print:break-inside-avoid print:page-break-inside-avoid">
              <div className="text-center mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-2xs print:border-amber-400">
                  <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                  <span>สุดยอดดาวเด่นประจำห้องเรียน 3 อันดับแรก</span>
                </span>
              </div>

              {/* Podium Flex / Grid: 2nd place (Left), 1st place (Center), 3rd place (Right) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-end max-w-2xl mx-auto pt-2 pb-1 print:grid-cols-3">
                {/* 2nd Place (Silver) */}
                {top3[1] ? (
                  <div
                    className={`order-2 sm:order-1 bg-gradient-to-b from-slate-50 to-slate-100/90 rounded-2xl p-3.5 sm:p-4 border-2 border-slate-300 shadow-sm flex flex-col items-center text-center relative transition-transform hover:scale-[1.02] print:border-slate-400 print:shadow-none print:break-inside-avoid ${
                      top3[1].id === activeProfile.id ? 'ring-4 ring-amber-400 bg-amber-50/80 print:ring-0' : ''
                    }`}
                  >
                    <div className="absolute -top-3.5 bg-slate-200 text-slate-700 font-black text-xs px-2.5 py-0.5 rounded-full border border-slate-400 shadow-2xs flex items-center gap-1">
                      <span>🥈</span>
                      <span>อันดับที่ 2</span>
                    </div>

                    {/* Avatar */}
                    {(() => {
                      const colorCfg = getAvatarColorOption(top3[1].avatarBg);
                      return (
                        <div
                          className={`w-14 h-14 rounded-2xl ${colorCfg.bgClass} border-2 ${colorCfg.borderClass} flex items-center justify-center text-3xl shadow-sm mt-2 mb-2 relative print:shadow-none`}
                        >
                          <span>{top3[1].avatar}</span>
                          <span className="absolute -bottom-1 -right-1 text-base">🥈</span>
                        </div>
                      );
                    })()}

                    <h4 className="font-black text-xs sm:text-sm text-slate-800 line-clamp-1">
                      <span className={top3[1].id === activeProfile.id && revealMyName ? 'print:hidden' : ''}>
                        {getAnonymousName(top3[1], anonymizeStyle, revealMyName, top3[1].id === activeProfile.id, false)}
                      </span>
                      {top3[1].id === activeProfile.id && revealMyName && (
                        <span className="hidden print:inline">
                          {getAnonymousName(top3[1], anonymizeStyle, false, false, true)}
                        </span>
                      )}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-500 mt-0.5">
                      {top3[1].grade === 'K1' ? 'อนุบาล 1' : top3[1].grade === 'K2' ? 'อนุบาล 2' : 'อนุบาล 3'}
                    </span>

                    <div className="mt-2.5 bg-white rounded-xl border border-slate-200 px-3 py-1.5 w-full print:border-slate-300">
                      <div className="font-black text-slate-900 text-sm sm:text-base">
                        🪙 {top3[1].totalScore.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1.5 mt-0.5">
                        <span>{top3[1].totalQuestions || 0} ข้อ</span>
                        <span>•</span>
                        <span>🔥 {top3[1].streakDays || 1} วัน</span>
                      </div>
                    </div>

                    {top3[1].id === activeProfile.id && (
                      <span className="no-print mt-2 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-2xs">
                        ⭐ บัญชีของคุณ
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="order-2 sm:order-1 hidden sm:flex flex-col items-center justify-center h-44 border-2 border-dashed border-slate-200 rounded-2xl text-slate-300 text-xs font-bold">
                    <span>รอผู้ท้าชิงอันดับ 2</span>
                  </div>
                )}

                {/* 1st Place (Gold Champion) */}
                {top3[0] && (
                  <div
                    className={`order-1 sm:order-2 bg-gradient-to-b from-yellow-50 to-amber-100/90 rounded-2xl p-4 sm:p-5 border-3 border-amber-400 shadow-md flex flex-col items-center text-center relative transition-transform hover:scale-[1.03] print:border-amber-500 print:shadow-none print:break-inside-avoid ${
                      top3[0].id === activeProfile.id ? 'ring-4 ring-amber-400 print:ring-0' : ''
                    }`}
                  >
                    <div className="absolute -top-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full border border-yellow-300 shadow-sm flex items-center gap-1.5 animate-bounce print:animate-none">
                      <Crown className="w-3.5 h-3.5 fill-slate-950" />
                      <span>🥇 แชมเปี้ยนอันดับที่ 1</span>
                    </div>

                    {/* Champion Avatar */}
                    {(() => {
                      const colorCfg = getAvatarColorOption(top3[0].avatarBg);
                      return (
                        <div
                          className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl ${colorCfg.bgClass} border-4 border-amber-400 flex items-center justify-center text-4xl shadow-md mt-2 mb-2 relative print:shadow-none`}
                        >
                          <span>{top3[0].avatar}</span>
                          <span className="absolute -top-2.5 -right-2 text-xl animate-pulse print:animate-none">👑</span>
                        </div>
                      );
                    })()}

                    <h4 className="font-black text-sm sm:text-base text-amber-950 line-clamp-1">
                      <span className={top3[0].id === activeProfile.id && revealMyName ? 'print:hidden' : ''}>
                        {getAnonymousName(top3[0], anonymizeStyle, revealMyName, top3[0].id === activeProfile.id, false)}
                      </span>
                      {top3[0].id === activeProfile.id && revealMyName && (
                        <span className="hidden print:inline">
                          {getAnonymousName(top3[0], anonymizeStyle, false, false, true)}
                        </span>
                      )}
                    </h4>
                    <span className="text-[11px] font-bold text-amber-800 mt-0.5">
                      {top3[0].grade === 'K1' ? 'อนุบาล 1' : top3[0].grade === 'K2' ? 'อนุบาล 2' : 'อนุบาล 3'}
                    </span>

                    <div className="mt-2.5 bg-white/95 rounded-xl border-2 border-amber-300 px-3 py-2 w-full shadow-2xs print:border-amber-400">
                      <div className="font-black text-amber-700 text-base sm:text-lg">
                        🪙 {top3[0].totalScore.toLocaleString()} คะแนน
                      </div>
                      <div className="text-[11px] text-amber-900 font-bold flex items-center justify-center gap-2 mt-0.5">
                        <span>📝 {top3[0].totalQuestions || 0} ข้อ</span>
                        <span>•</span>
                        <span>🔥 {top3[0].streakDays || 1} วัน</span>
                      </div>
                    </div>

                    {top3[0].id === activeProfile.id && (
                      <span className="no-print mt-2 bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs">
                        ⭐ บัญชีของคุณ
                      </span>
                    )}
                  </div>
                )}

                {/* 3rd Place (Bronze) */}
                {top3[2] ? (
                  <div
                    className={`order-3 bg-gradient-to-b from-orange-50/70 to-amber-100/70 rounded-2xl p-3.5 sm:p-4 border-2 border-amber-300 shadow-sm flex flex-col items-center text-center relative transition-transform hover:scale-[1.02] print:border-amber-400 print:shadow-none print:break-inside-avoid ${
                      top3[2].id === activeProfile.id ? 'ring-4 ring-amber-400 bg-amber-50/80 print:ring-0' : ''
                    }`}
                  >
                    <div className="absolute -top-3.5 bg-amber-200 text-amber-900 font-black text-xs px-2.5 py-0.5 rounded-full border border-amber-400 shadow-2xs flex items-center gap-1">
                      <span>🥉</span>
                      <span>อันดับที่ 3</span>
                    </div>

                    {/* Avatar */}
                    {(() => {
                      const colorCfg = getAvatarColorOption(top3[2].avatarBg);
                      return (
                        <div
                          className={`w-14 h-14 rounded-2xl ${colorCfg.bgClass} border-2 ${colorCfg.borderClass} flex items-center justify-center text-3xl shadow-sm mt-2 mb-2 relative print:shadow-none`}
                        >
                          <span>{top3[2].avatar}</span>
                          <span className="absolute -bottom-1 -right-1 text-base">🥉</span>
                        </div>
                      );
                    })()}

                    <h4 className="font-black text-xs sm:text-sm text-slate-800 line-clamp-1">
                      <span className={top3[2].id === activeProfile.id && revealMyName ? 'print:hidden' : ''}>
                        {getAnonymousName(top3[2], anonymizeStyle, revealMyName, top3[2].id === activeProfile.id, false)}
                      </span>
                      {top3[2].id === activeProfile.id && revealMyName && (
                        <span className="hidden print:inline">
                          {getAnonymousName(top3[2], anonymizeStyle, false, false, true)}
                        </span>
                      )}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-500 mt-0.5">
                      {top3[2].grade === 'K1' ? 'อนุบาล 1' : top3[2].grade === 'K2' ? 'อนุบาล 2' : 'อนุบาล 3'}
                    </span>

                    <div className="mt-2.5 bg-white rounded-xl border border-amber-200 px-3 py-1.5 w-full print:border-amber-300">
                      <div className="font-black text-slate-900 text-sm sm:text-base">
                        🪙 {top3[2].totalScore.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1.5 mt-0.5">
                        <span>{top3[2].totalQuestions || 0} ข้อ</span>
                        <span>•</span>
                        <span>🔥 {top3[2].streakDays || 1} วัน</span>
                      </div>
                    </div>

                    {top3[2].id === activeProfile.id && (
                      <span className="no-print mt-2 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-2xs">
                        ⭐ บัญชีของคุณ
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="order-3 hidden sm:flex flex-col items-center justify-center h-44 border-2 border-dashed border-slate-200 rounded-2xl text-slate-300 text-xs font-bold">
                    <span>รอผู้ท้าชิงอันดับ 3</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 text-center border-2 border-slate-200 text-slate-500">
              <Smile className="w-12 h-12 mx-auto text-amber-400 mb-2" />
              <h3 className="font-black text-base text-slate-700">ยังไม่มีข้อมูลในระดับชั้นนี้</h3>
              <p className="text-xs text-slate-500 mt-1">เริ่มเล่นและสะสมคะแนนคนแรกเพื่อขึ้นเป็นอันดับที่ 1!</p>
            </div>
          )}

          {/* Full Leaderboard Table / Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden print:shadow-none print:border print:border-slate-300">
            <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between print:bg-slate-100">
              <h3 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-2">
                <Medal className="w-4 h-4 text-amber-500" />
                <span>รายชื่อผู้ทำคะแนนสูงสุดทั้งหมด ({rankedProfiles.length} คน)</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-bold">
                เรียงตาม{sortBy === 'score' ? 'คะแนนรวม' : sortBy === 'questions' ? 'คำถามสะสม' : 'วันสตรีค'}
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {rankedProfiles.map((p, idx) => {
                const rank = idx + 1;
                const isCurrent = p.id === activeProfile.id;
                const colorCfg = getAvatarColorOption(p.avatarBg);

                let rankBadgeBg = 'bg-slate-100 text-slate-600 border-slate-300';
                if (rank === 1) rankBadgeBg = 'bg-amber-400 text-slate-950 border-amber-500 font-black shadow-2xs';
                else if (rank === 2) rankBadgeBg = 'bg-slate-200 text-slate-800 border-slate-400 font-black';
                else if (rank === 3) rankBadgeBg = 'bg-amber-200 text-amber-900 border-amber-300 font-black';

                return (
                  <div
                    key={p.id}
                    id={`leaderboard-row-${p.id}`}
                    className={`px-3.5 sm:px-5 py-3 flex items-center justify-between gap-2.5 transition-colors print:break-inside-avoid print:page-break-inside-avoid ${
                      isCurrent
                        ? 'bg-amber-50/80 border-l-4 border-amber-500 print:bg-white print:border-l-0'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Left: Rank & Avatar & Anonymous Name */}
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                      {/* Rank Number */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center text-xs sm:text-sm font-black shrink-0 ${rankBadgeBg}`}
                      >
                        {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                      </div>

                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${colorCfg.bgClass} border-2 ${colorCfg.borderClass} flex items-center justify-center text-xl sm:text-2xl shadow-2xs shrink-0 print:shadow-none`}
                      >
                        <span>{p.avatar}</span>
                      </div>

                      {/* Name & Details */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`font-black text-xs sm:text-sm truncate ${isCurrent ? 'text-amber-950 font-black print:text-slate-800' : 'text-slate-800'}`}>
                            <span className={isCurrent && revealMyName ? 'print:hidden' : ''}>
                              {getAnonymousName(p, anonymizeStyle, revealMyName, isCurrent, false)}
                            </span>
                            {isCurrent && revealMyName && (
                              <span className="hidden print:inline">
                                {getAnonymousName(p, anonymizeStyle, false, false, true)}
                              </span>
                            )}
                          </span>
                          {isCurrent && (
                            <span className="no-print text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.2 rounded-full shadow-2xs shrink-0">
                              ⭐ คุณ
                            </span>
                          )}
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.2 rounded-md shrink-0 border border-slate-200">
                            {p.grade === 'K1' ? 'อนุบาล 1' : p.grade === 'K2' ? 'อนุบาล 2' : 'อนุบาล 3'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                          <span>ตอบถูก {p.totalQuestions || 0} ข้อ</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-orange-600 font-bold">
                            <Flame className="w-3 h-3 fill-orange-500 text-orange-500" />
                            <span>{p.streakDays || 1} วันต่อเนื่อง</span>
                          </span>
                          <span>•</span>
                          <span>{p.badges?.length || 0} เหรียญ</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Score Pill */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <div className="font-black text-amber-700 text-sm sm:text-base flex items-center justify-end gap-1">
                          <span>🪙</span>
                          <span>{p.totalScore.toLocaleString()}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold">
                          คะแนนสะสม
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Classroom Collective Achievement Summary */}
          <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 rounded-3xl p-4 sm:p-5 text-white shadow-md print:bg-slate-100 print:text-slate-900 print:border print:border-slate-300 print:shadow-none print:break-inside-avoid">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400 print:text-indigo-700" />
                <h4 className="font-black text-sm sm:text-base text-white print:text-slate-900">
                  สถิติความร่วมมือรวมทั้งห้องเรียน (Classroom Collective Stats)
                </h4>
              </div>
              <span className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full font-bold text-indigo-200 print:bg-slate-200 print:text-slate-700">
                เรียนรู้ร่วมกัน เติบโตไปด้วยกัน 🌱
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-center">
              <div className="bg-white/10 rounded-2xl p-2.5 border border-white/10 backdrop-blur-xs print:bg-white print:border-slate-300">
                <div className="text-lg sm:text-xl font-black text-amber-300 print:text-amber-800">
                  🪙 {classroomStats.totalPoints.toLocaleString()}
                </div>
                <div className="text-[10px] text-indigo-200 font-bold mt-0.5 print:text-slate-600">คะแนนรวมทั้งห้อง</div>
              </div>

              <div className="bg-white/10 rounded-2xl p-2.5 border border-white/10 backdrop-blur-xs print:bg-white print:border-slate-300">
                <div className="text-lg sm:text-xl font-black text-emerald-300 print:text-emerald-800">
                  📝 {classroomStats.totalQuestions.toLocaleString()}
                </div>
                <div className="text-[10px] text-indigo-200 font-bold mt-0.5 print:text-slate-600">คำถามที่ร่วมกันตอบ</div>
              </div>

              <div className="bg-white/10 rounded-2xl p-2.5 border border-white/10 backdrop-blur-xs print:bg-white print:border-slate-300">
                <div className="text-lg sm:text-xl font-black text-sky-300 print:text-sky-800">
                  👥 {classroomStats.learnersCount} คน
                </div>
                <div className="text-[10px] text-indigo-200 font-bold mt-0.5 print:text-slate-600">จำนวนเพื่อนในห้อง</div>
              </div>

              <div className="bg-white/10 rounded-2xl p-2.5 border border-white/10 backdrop-blur-xs print:bg-white print:border-slate-300">
                <div className="text-lg sm:text-xl font-black text-orange-300 print:text-orange-800">
                  🔥 {classroomStats.maxStreak} วัน
                </div>
                <div className="text-[10px] text-indigo-200 font-bold mt-0.5 print:text-slate-600">สตรีคสูงสุด</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden during print) */}
        <div className="no-print bg-slate-100 border-t border-slate-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>คะแนนและอันดับอัปเดตแบบเรียลไทม์ทันทีหลังจบรอบการเล่น</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              id="btn-print-board-footer"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-xs transition-all cursor-pointer active:scale-95"
              title="พิมพ์กระดานคะแนนสำหรับติดบอร์ดห้องเรียน"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์บอร์ดห้องเรียน</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-black shadow-xs transition-all cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
