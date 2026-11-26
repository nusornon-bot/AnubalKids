import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpDown,
  CheckCircle2,
  Calendar,
  Flame,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Sparkles,
  Baby,
  GraduationCap,
  Target,
  BarChart3,
} from 'lucide-react';
import { ChildProfile, Grade, CurriculumMode } from '../../types';
import { soundEffects } from '../../services/audioService';

export interface UserActivityHistoryPanelProps {
  profiles: ChildProfile[];
  activeProfileId?: string;
  onSelectProfile: (id: string) => void;
  soundVolume?: number;
  curriculumMode?: CurriculumMode;
}

export type HistoryZoneTab = 'early_childhood' | 'cbe_primary' | 'thai_phonics' | 'all';

const PAGE_SIZE = 10; // Exactly 10 items per page as requested

function formatRelativeTimeTh(isoDateStr?: string, lastPlayedDateStr?: string): string {
  const targetStr = isoDateStr || (lastPlayedDateStr ? `${lastPlayedDateStr}T12:00:00.000Z` : undefined);
  if (!targetStr) return 'ยังไม่มีบันทึกเข้าใช้';

  const date = new Date(targetStr);
  if (isNaN(date.getTime())) {
    return lastPlayedDateStr || 'เมื่อไม่นานมานี้';
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes >= 0 && diffMinutes < 1) return 'เมื่อสักครู่นี้ 🟢';
  if (diffMinutes >= 1 && diffMinutes < 60) return `เมื่อ ${diffMinutes} นาทีที่แล้ว`;
  if (diffHours < 24 && date.getDate() === now.getDate()) {
    return `วันนี้ ${date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;
  }
  if (diffDays === 1 || (diffHours < 48 && date.getDate() === now.getDate() - 1)) {
    return `เมื่อวานนี้ ${date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;
  }

  return (
    date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' น.'
  );
}

function getGradeBadgeColor(
  grade?: Grade,
  preferredZone?: HistoryZoneTab
): { bg: string; text: string; label: string; zone: 'early_childhood' | 'cbe_primary' | 'thai_phonics' } {
  switch (grade) {
    case 'K1':
      return { bg: 'bg-emerald-100 border-emerald-300', text: 'text-emerald-800', label: 'อนุบาล 1', zone: 'early_childhood' };
    case 'K2':
      return { bg: 'bg-sky-100 border-sky-300', text: 'text-sky-800', label: 'อนุบาล 2', zone: 'early_childhood' };
    case 'K3':
      return { bg: 'bg-purple-100 border-purple-300', text: 'text-purple-800', label: 'อนุบาล 3', zone: 'early_childhood' };
    case 'P1':
      return {
        bg: 'bg-amber-100 border-amber-300',
        text: 'text-amber-800',
        label: 'ประถม 1',
        zone: preferredZone === 'thai_phonics' ? 'thai_phonics' : 'cbe_primary',
      };
    case 'P2':
      return {
        bg: 'bg-orange-100 border-orange-300',
        text: 'text-orange-800',
        label: 'ประถม 2',
        zone: preferredZone === 'thai_phonics' ? 'thai_phonics' : 'cbe_primary',
      };
    case 'P3':
      return {
        bg: 'bg-rose-100 border-rose-300',
        text: 'text-rose-800',
        label: 'ประถม 3',
        zone: preferredZone === 'thai_phonics' ? 'thai_phonics' : 'cbe_primary',
      };
    case 'P4':
      return { bg: 'bg-emerald-100 border-emerald-300', text: 'text-emerald-800', label: 'ประถม 4', zone: 'thai_phonics' };
    case 'P5':
      return { bg: 'bg-cyan-100 border-cyan-300', text: 'text-cyan-800', label: 'ประถม 5', zone: 'thai_phonics' };
    case 'P6':
      return { bg: 'bg-fuchsia-100 border-fuchsia-300', text: 'text-fuchsia-800', label: 'ประถม 6', zone: 'thai_phonics' };
    default:
      return { bg: 'bg-slate-100 border-slate-300', text: 'text-slate-800', label: 'ปฐมวัย', zone: 'early_childhood' };
  }
}

function calculateProfileAccuracy(profile: ChildProfile): number {
  if (profile.totalQuestions > 0 && profile.totalScore > 0) {
    return Math.min(100, Math.round((profile.totalScore / profile.totalQuestions) * 100));
  }
  if (profile.history && profile.history.length > 0) {
    const totalQ = profile.history.reduce(
      (acc, h) =>
        acc +
        (h.literacyTotal || 0) +
        (h.englishTotal || 0) +
        (h.mathTotal || 0) +
        (h.problemSolvingTotal || 0) +
        (h.inquiryTotal || 0) +
        (h.creativityTotal || 0) +
        (h.physicalHealthTotal || 0) +
        (h.socioEmotionalTotal || 0) +
        (h.citizenshipTotal || 0) +
        (h.selfManagementTotal || 0) +
        (h.higherOrderThinkingTotal || 0) +
        (h.communicationTotal || 0) +
        (h.teamworkTotal || 0) +
        (h.activeCitizenshipTotal || 0) +
        (h.sustainableLivingTotal || 0) +
        (h.phonicsConsonantTotal || 0) +
        (h.phonicsVowelTotal || 0) +
        (h.phonicsToneTotal || 0) +
        (h.phonicsKorkaaTotal || 0) +
        (h.phonicsToneKorkaaTotal || 0) +
        (h.phonicsDirectSpellingTotal || 0) +
        (h.phonicsToneSpellingTotal || 0) +
        (h.phonicsIndirectSpellingTotal || 0) +
        (h.phonicsClusterTotal || 0) +
        (h.phonicsLeadingConsonantTotal || 0) ||
        (h.thaiTotal || 0) + (h.scienceTotal || 0),
      0
    );
    const totalS = profile.history.reduce(
      (acc, h) =>
        acc +
        (h.literacyScore || 0) +
        (h.englishScore || 0) +
        (h.mathScore || 0) +
        (h.problemSolvingScore || 0) +
        (h.inquiryScore || 0) +
        (h.creativityScore || 0) +
        (h.physicalHealthScore || 0) +
        (h.socioEmotionalScore || 0) +
        (h.citizenshipScore || 0) +
        (h.selfManagementScore || 0) +
        (h.higherOrderThinkingScore || 0) +
        (h.communicationScore || 0) +
        (h.teamworkScore || 0) +
        (h.activeCitizenshipScore || 0) +
        (h.sustainableLivingScore || 0) +
        (h.phonicsConsonantScore || 0) +
        (h.phonicsVowelScore || 0) +
        (h.phonicsToneScore || 0) +
        (h.phonicsKorkaaScore || 0) +
        (h.phonicsToneKorkaaScore || 0) +
        (h.phonicsDirectSpellingScore || 0) +
        (h.phonicsToneSpellingScore || 0) +
        (h.phonicsIndirectSpellingScore || 0) +
        (h.phonicsClusterScore || 0) +
        (h.phonicsLeadingConsonantScore || 0) ||
        (h.thaiScore || 0) + (h.scienceScore || 0),
      0
    );
    if (totalQ > 0) return Math.min(100, Math.round((totalS / totalQ) * 100));
  }
  return 0;
}

export const UserActivityHistoryPanel: React.FC<UserActivityHistoryPanelProps> = ({
  profiles,
  activeProfileId,
  onSelectProfile,
  soundVolume = 0.6,
  curriculumMode = 'early_childhood',
}) => {
  // 3 Zones: early_childhood (อ.1-3), cbe_primary (ป.1-3), thai_phonics (ป.1-6), plus all
  const [activeZone, setActiveZone] = useState<HistoryZoneTab>(() => {
    if (curriculumMode === 'thai_phonics') return 'thai_phonics';
    if (curriculumMode === 'cbe_primary') return 'cbe_primary';
    return 'early_childhood';
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'score' | 'streak' | 'name'>('recent');
  const [expandedProfileId, setExpandedProfileId] = useState<string | null>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  // Sync activeZone when curriculumMode changes externally
  useEffect(() => {
    if (curriculumMode === 'thai_phonics') {
      setActiveZone('thai_phonics');
    } else if (curriculumMode === 'cbe_primary') {
      setActiveZone('cbe_primary');
    } else {
      setActiveZone('early_childhood');
    }
    setCurrentPage(1);
    setSelectedGrade('all');
  }, [curriculumMode]);

  // Counts for each zone
  const { earlyChildhoodCount, cbePrimaryCount, thaiPhonicsCount } = useMemo(() => {
    let ec = 0;
    let cbe = 0;
    let tp = 0;
    profiles.forEach((p) => {
      const g = p.grade;
      if (g === 'K1' || g === 'K2' || g === 'K3' || !g) {
        ec++;
      }
      if (g === 'P1' || g === 'P2' || g === 'P3') {
        cbe++;
      }
      if (
        ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(g || '') ||
        Boolean(p.history?.some((h) => (h.phonicsConsonantTotal || 0) > 0 || (h.phonicsVowelTotal || 0) > 0))
      ) {
        tp++;
      }
    });
    return { earlyChildhoodCount: ec, cbePrimaryCount: cbe, thaiPhonicsCount: tp };
  }, [profiles]);

  // Sorting and filtering by Zone, Search, Grade, and Sort
  const filteredAndSortedProfiles = useMemo(() => {
    let result = [...profiles];

    // 1. Zone filter (ปฐมวัย, สมรรถนะ CBE, แจกลูกสะกดคำ)
    if (activeZone === 'early_childhood') {
      result = result.filter(
        (p) => p.grade === 'K1' || p.grade === 'K2' || p.grade === 'K3' || !p.grade
      );
    } else if (activeZone === 'cbe_primary') {
      result = result.filter(
        (p) => p.grade === 'P1' || p.grade === 'P2' || p.grade === 'P3'
      );
    } else if (activeZone === 'thai_phonics') {
      result = result.filter(
        (p) =>
          ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(p.grade || '') ||
          Boolean(p.history?.some((h) => (h.phonicsConsonantTotal || 0) > 0 || (h.phonicsVowelTotal || 0) > 0))
      );
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.grade && p.grade.toLowerCase().includes(q))
      );
    }

    // 3. Specific Grade filter within zone
    if (selectedGrade !== 'all') {
      result = result.filter((p) => p.grade === selectedGrade);
    }

    // 4. Sort (Default: เข้าใช้ล่าสุด / recent)
    result.sort((a, b) => {
      if (sortBy === 'recent') {
        const timeA = new Date(a.updatedAt || a.lastPlayedDate || a.createdAt || 0).getTime();
        const timeB = new Date(b.updatedAt || b.lastPlayedDate || b.createdAt || 0).getTime();
        return timeB - timeA;
      }
      if (sortBy === 'score') {
        return (b.totalScore || 0) - (a.totalScore || 0);
      }
      if (sortBy === 'streak') {
        return (b.streakDays || 0) - (a.streakDays || 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'th');
      }
      return 0;
    });

    return result;
  }, [profiles, activeZone, searchQuery, selectedGrade, sortBy]);

  // Pagination calculation: exactly 10 items per page
  const totalItems = filteredAndSortedProfiles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (validCurrentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentProfiles = filteredAndSortedProfiles.slice(startIndex, endIndex);

  const handleZoneSwitch = (zone: HistoryZoneTab) => {
    soundEffects.playTap(soundVolume);
    setActiveZone(zone);
    setCurrentPage(1);
    setSelectedGrade('all');
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      soundEffects.playTap(soundVolume);
    }
  };

  const handleToggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playTap(soundVolume);
    setExpandedProfileId((prev) => (prev === id ? null : id));
  };

  const handleProfileClick = (id: string) => {
    soundEffects.playTap(soundVolume);
    onSelectProfile(id);
  };

  return (
    <div
      id="user-activity-history-panel"
      className="w-full bg-white rounded-3xl p-4 sm:p-5 border-2 border-indigo-100 shadow-md flex flex-col gap-3.5 transition-all mt-1"
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-600 to-teal-500 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-black text-slate-900 font-display">
                ประวัติการเข้าใช้งานล่าสุด
              </h3>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                <span>⚡</span>
                <span>แสดงล่าสุด 10 รายการ</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              บันทึกเวลาเข้าใช้ คะแนนสะสม และประวัติการทำกิจกรรมย้อนหลังของผู้เรียน
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="bg-slate-100 text-slate-700 text-xs font-black px-2.5 py-1 rounded-full border border-slate-200">
            ทั้งหมด {totalItems} คน
          </span>
          <button
            type="button"
            onClick={() => setIsPanelCollapsed((prev) => !prev)}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            title={isPanelCollapsed ? 'ขยายแผงประวัติ' : 'ย่อแผงประวัติ'}
          >
            {isPanelCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!isPanelCollapsed && (
        <>
          {/* Zone Selector: 3 โซน (ปฐมวัย vs สมรรถนะ vs สะกดคำ) + ทั้งหมด */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => handleZoneSwitch('early_childhood')}
              className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeZone === 'early_childhood'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Baby className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">🧸 ปฐมวัย (อ.1-3)</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  activeZone === 'early_childhood'
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-200/90 text-slate-700'
                }`}
              >
                {earlyChildhoodCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleZoneSwitch('cbe_primary')}
              className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeZone === 'cbe_primary'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">🎓 สมรรถนะ (ป.1-3)</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  activeZone === 'cbe_primary'
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-200/90 text-slate-700'
                }`}
              >
                {cbePrimaryCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleZoneSwitch('thai_phonics')}
              className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeZone === 'thai_phonics'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">📖 โซนสะกดคำ (ป.1-6)</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  activeZone === 'thai_phonics'
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-200/90 text-slate-700'
                }`}
              >
                {thaiPhonicsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleZoneSwitch('all')}
              className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeZone === 'all'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">👥 ทั้งหมด</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  activeZone === 'all' ? 'bg-white/25 text-white' : 'bg-slate-200/90 text-slate-700'
                }`}
              >
                {profiles.length}
              </span>
            </button>
          </div>

          {/* Search, Grade and Sort Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-between text-xs">
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ค้นหาชื่อผู้เรียน..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              {/* Grade Filter tailored to current zone */}
              <select
                value={selectedGrade}
                onChange={(e) => {
                  setSelectedGrade(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-bold focus:outline-none cursor-pointer"
              >
                <option value="all">
                  {activeZone === 'early_childhood'
                    ? 'ทุกชั้นปฐมวัย (อ.1-3)'
                    : activeZone === 'cbe_primary'
                    ? 'ทุกชั้นประถม (ป.1-3)'
                    : activeZone === 'thai_phonics'
                    ? 'ทุกชั้นสะกดคำ (ป.1-6)'
                    : 'ทุกชั้นเรียน'}
                </option>
                {(activeZone === 'early_childhood' || activeZone === 'all') && (
                  <>
                    <option value="K1">อนุบาล 1</option>
                    <option value="K2">อนุบาล 2</option>
                    <option value="K3">อนุบาล 3</option>
                  </>
                )}
                {(activeZone === 'cbe_primary' || activeZone === 'thai_phonics' || activeZone === 'all') && (
                  <>
                    <option value="P1">ประถม 1</option>
                    <option value="P2">ประถม 2</option>
                    <option value="P3">ประถม 3</option>
                  </>
                )}
                {(activeZone === 'thai_phonics' || activeZone === 'all') && (
                  <>
                    <option value="P4">ประถม 4</option>
                    <option value="P5">ประถม 5</option>
                    <option value="P6">ประถม 6</option>
                  </>
                )}
              </select>

              {/* Sort selector */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                <ArrowUpDown className="w-3 h-3 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-slate-700 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="recent">เข้าใช้ล่าสุด</option>
                  <option value="score">คะแนนสูงสุด</option>
                  <option value="streak">ความสม่ำเสมอ (Streak)</option>
                  <option value="name">ตามชื่อ (ก-ฮ)</option>
                </select>
              </div>
            </div>
          </div>

          {/* User List (Latest 10 items) */}
          <div className="space-y-2 mt-0.5">
            {currentProfiles.length === 0 ? (
              <div className="py-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-4">
                <Users className="w-8 h-8 mx-auto mb-1 opacity-40" />
                <p className="text-xs font-bold">
                  ไม่พบข้อมูลผู้เรียนใน {activeZone === 'early_childhood' ? 'โซนปฐมวัย' : activeZone === 'cbe_primary' ? 'โซนสมรรถนะ' : 'ระบบ'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  ลองเปลี่ยนเงื่อนไขค้นหา หรือสลับไปดูอีกโซนด้านบน
                </p>
              </div>
            ) : (
              currentProfiles.map((profile, index) => {
                const isActive = profile.id === activeProfileId;
                const isExpanded = expandedProfileId === profile.id;
                const gradeBadge = getGradeBadgeColor(profile.grade, activeZone);
                const accuracy = calculateProfileAccuracy(profile);
                const relativeTimeStr = formatRelativeTimeTh(profile.updatedAt, profile.lastPlayedDate);
                const isPhonics = gradeBadge.zone === 'thai_phonics' || activeZone === 'thai_phonics';
                const isPrimary = gradeBadge.zone === 'cbe_primary';

                return (
                  <div
                    key={profile.id}
                    className={`rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-50/90 via-sky-50/70 to-emerald-50/70 border-indigo-300 ring-2 ring-indigo-300/60 shadow-xs'
                        : 'bg-white hover:bg-slate-50/80 border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    {/* Main Profile Row */}
                    <div
                      onClick={() => handleProfileClick(profile.id)}
                      className="p-3 flex items-center justify-between gap-3 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Index number (1 to 10) & Avatar */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-black text-slate-400 w-5 text-center">
                            {startIndex + index + 1}.
                          </span>
                          <div className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-xl shadow-2xs shrink-0 relative">
                            {profile.avatar || '⭐'}
                            {isActive && (
                              <span
                                className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"
                                title="กำลังใช้งานอยู่นี้"
                              />
                            )}
                          </div>
                        </div>

                        {/* Name, Grade, and Access Time */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs sm:text-sm font-black text-slate-900 truncate">
                              {profile.name}
                            </span>
                            <span
                              className={`text-[9px] font-black px-1.5 py-0.2 rounded-md border ${gradeBadge.bg} ${gradeBadge.text}`}
                            >
                              {gradeBadge.label}
                            </span>
                            {isPhonics ? (
                              <span className="bg-emerald-50 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-300">
                                📖 10 หน่วยสะกดคำ
                              </span>
                            ) : isPrimary ? (
                              <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-1 py-0.2 rounded border border-blue-200">
                                6 สมรรถนะ
                              </span>
                            ) : (
                              <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1 py-0.2 rounded border border-emerald-200">
                                8 ทักษะ
                              </span>
                            )}
                            {isActive && (
                              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded-md">
                                กำลังเล่น 🟢
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5 flex-wrap">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="font-semibold">{relativeTimeStr}</span>
                            {profile.history && profile.history.length > 0 && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span>เล่น {profile.history.length} วัน</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right side stats & expand button */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Quick Stats Badges */}
                        <div className="hidden xs:flex items-center gap-1.5 text-right">
                          <div className="bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-center">
                            <span className="text-[10px] font-black text-amber-900 block leading-tight">
                              {profile.totalScore || 0}
                            </span>
                            <span className="text-[8px] text-amber-700 font-bold block">คะแนน</span>
                          </div>

                          {accuracy > 0 && (
                            <div className="bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg text-center">
                              <span className="text-[10px] font-black text-emerald-900 block leading-tight">
                                {accuracy}%
                              </span>
                              <span className="text-[8px] text-emerald-700 font-bold block">แม่นยำ</span>
                            </div>
                          )}
                        </div>

                        {/* Expand history button */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleExpand(profile.id, e)}
                          className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                          title="ดูประวัติการเข้าเรียนย้อนหลัง"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Session History Drawer */}
                    {isExpanded && (
                      <div className="p-3 pt-0 border-t border-slate-100 mt-1 bg-slate-50/60 rounded-b-2xl animate-in fade-in duration-150">
                        <div className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-indigo-500" />
                            <span>
                              {isPhonics
                                ? 'ประวัติการประเมิน 10 หน่วยสะกดคำย้อนหลัง:'
                                : isPrimary
                                ? 'ประวัติการประเมิน 6 สมรรถนะย้อนหลัง:'
                                : 'ประวัติการฝึก 8 ทักษะปฐมวัยย้อนหลัง:'}
                            </span>
                          </span>
                          <span className="text-slate-400 text-[10px]">
                            สร้างเมื่อ: {new Date(profile.createdAt || Date.now()).toLocaleDateString('th-TH')}
                          </span>
                        </div>

                        {!profile.history || profile.history.length === 0 ? (
                          <p className="text-[11px] text-slate-400 italic py-1 text-center">
                            ยังไม่มีประวัติการทำแบบทดสอบในระบบ
                          </p>
                        ) : (
                          <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                            {profile.history.slice(-5).reverse().map((h, hIdx) => {
                              const dateLabel = new Date(h.date).toLocaleDateString('th-TH', {
                                day: 'numeric',
                                month: 'short',
                              });
                              const totalAnswered =
                                (h.literacyTotal || 0) +
                                (h.englishTotal || 0) +
                                (h.mathTotal || 0) +
                                (h.problemSolvingTotal || 0) +
                                (h.inquiryTotal || 0) +
                                (h.creativityTotal || 0) +
                                (h.physicalHealthTotal || 0) +
                                (h.socioEmotionalTotal || 0) +
                                (h.citizenshipTotal || 0) +
                                (h.selfManagementTotal || 0) +
                                (h.higherOrderThinkingTotal || 0) +
                                (h.communicationTotal || 0) +
                                (h.teamworkTotal || 0) +
                                (h.activeCitizenshipTotal || 0) +
                                (h.sustainableLivingTotal || 0) +
                                (h.phonicsConsonantTotal || 0) +
                                (h.phonicsVowelTotal || 0) +
                                (h.phonicsToneTotal || 0) +
                                (h.phonicsKorkaaTotal || 0) +
                                (h.phonicsToneKorkaaTotal || 0) +
                                (h.phonicsDirectSpellingTotal || 0) +
                                (h.phonicsToneSpellingTotal || 0) +
                                (h.phonicsIndirectSpellingTotal || 0) +
                                (h.phonicsClusterTotal || 0) +
                                (h.phonicsLeadingConsonantTotal || 0) ||
                                (h.thaiTotal || 0) + (h.scienceTotal || 0);

                              const totalCorrect =
                                (h.literacyScore || 0) +
                                (h.englishScore || 0) +
                                (h.mathScore || 0) +
                                (h.problemSolvingScore || 0) +
                                (h.inquiryScore || 0) +
                                (h.creativityScore || 0) +
                                (h.physicalHealthScore || 0) +
                                (h.socioEmotionalScore || 0) +
                                (h.citizenshipScore || 0) +
                                (h.selfManagementScore || 0) +
                                (h.higherOrderThinkingScore || 0) +
                                (h.communicationScore || 0) +
                                (h.teamworkScore || 0) +
                                (h.activeCitizenshipScore || 0) +
                                (h.sustainableLivingScore || 0) +
                                (h.phonicsConsonantScore || 0) +
                                (h.phonicsVowelScore || 0) +
                                (h.phonicsToneScore || 0) +
                                (h.phonicsKorkaaScore || 0) +
                                (h.phonicsToneKorkaaScore || 0) +
                                (h.phonicsDirectSpellingScore || 0) +
                                (h.phonicsToneSpellingScore || 0) +
                                (h.phonicsIndirectSpellingScore || 0) +
                                (h.phonicsClusterScore || 0) +
                                (h.phonicsLeadingConsonantScore || 0) ||
                                (h.thaiScore || 0) + (h.scienceScore || 0);

                              return (
                                <div
                                  key={hIdx}
                                  className="bg-white rounded-xl p-2 border border-slate-200/80 flex items-center justify-between text-[11px]"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-black text-slate-800">{dateLabel}</span>
                                    <span className="text-[10px] text-slate-500">
                                      ({totalAnswered} ข้อ)
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-emerald-700 font-bold">
                                      ถูก {totalCorrect} ข้อ
                                    </span>
                                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-1.5 py-0.2 rounded-md">
                                      {h.accuracy || 100}%
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                          <span>🔥 ความต่อเนื่อง: {profile.streakDays || 0} วัน</span>
                          <span>🏆 เหรียญรางวัล: {profile.badges?.length || 0} ชิ้น</span>
                          <button
                            type="button"
                            onClick={() => handleProfileClick(profile.id)}
                            className="text-indigo-600 hover:text-indigo-800 font-black flex items-center gap-0.5 cursor-pointer"
                          >
                            <UserCheck className="w-3 h-3" />
                            <span>สลับใช้โปรไฟล์นี้</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination Bar (แสดงหน้าละ 10 คน) */}
          <div className="pt-2 border-t border-slate-100 flex flex-col xs:flex-row items-center justify-between gap-2 text-xs">
            <span className="text-[11px] text-slate-500 font-medium text-center xs:text-left">
              แสดง {totalItems > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, totalItems)} จาก{' '}
              <strong className="text-slate-800">{totalItems} คน</strong> (หน้า {validCurrentPage}/{totalPages})
            </span>

            {/* Page Switch Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handlePageChange(validCurrentPage - 1)}
                disabled={validCurrentPage <= 1}
                className={`p-1.5 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
                  validCurrentPage > 1
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 cursor-pointer shadow-2xs'
                    : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                }`}
                title="หน้าก่อนหน้า"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ก่อนหน้า</span>
              </button>

              {/* Numbered page buttons */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, pIdx) => {
                  const pNum = pIdx + 1;
                  if (totalPages > 5 && Math.abs(pNum - validCurrentPage) > 1 && pNum !== 1 && pNum !== totalPages) {
                    if (pNum === 2 || pNum === totalPages - 1) {
                      return (
                        <span key={pNum} className="text-slate-300 text-xs px-0.5">
                          ..
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => handlePageChange(pNum)}
                      className={`w-7 h-7 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        pNum === validCurrentPage
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(validCurrentPage + 1)}
                disabled={validCurrentPage >= totalPages}
                className={`p-1.5 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
                  validCurrentPage < totalPages
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 cursor-pointer shadow-2xs'
                    : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                }`}
                title="หน้าถัดไป"
              >
                <span className="hidden sm:inline">ถัดไป</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
