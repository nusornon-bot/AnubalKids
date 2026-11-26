import React, { useState, useMemo } from 'react';
import {
  Flame,
  Calendar,
  Trophy,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info,
  Play,
  Award,
  HelpCircle,
  X,
  Target,
  Zap,
} from 'lucide-react';
import { ChildProfile, Language } from '../types';
import { soundEffects } from '../services/audioService';
import {
  calculateStreakSummary,
  CalendarDayInfo,
  StreakMilestone,
} from '../services/streakService';
import { SKILLS_LIST } from '../data/skills';

interface StreakTrackerCardProps {
  profile: ChildProfile;
  onStartGame: () => void;
  soundVolume: number;
  onOpenBadges?: () => void;
  language?: Language;
}

export const StreakTrackerCard: React.FC<StreakTrackerCardProps> = ({
  profile,
  onStartGame,
  soundVolume,
  onOpenBadges,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedDay, setSelectedDay] = useState<CalendarDayInfo | null>(null);
  const [activeView, setActiveView] = useState<'calendar' | 'milestones'>('calendar');

  const summary = useMemo(() => {
    return calculateStreakSummary(profile);
  }, [profile]);

  const handleDayClick = (day: CalendarDayInfo) => {
    soundEffects.playTap(soundVolume);
    setSelectedDay(day);
  };

  const handleCloseDayModal = () => {
    setSelectedDay(null);
  };

  // Milestone checkpoint positions on the 30-day bar (in percentages)
  const milestonePins = [
    { day: 7, percent: (7 / 30) * 100, icon: '🌱', label: '7 วัน' },
    { day: 14, percent: (14 / 30) * 100, icon: '⚡', label: '14 วัน' },
    { day: 21, percent: (21 / 30) * 100, icon: '🚀', label: '21 วัน' },
    { day: 30, percent: 100, icon: '🏆', label: '30 วัน' },
  ];

  return (
    <div
      id="streak-tracker-30day-card"
      className="w-full bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-white rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-amber-300 shadow-md p-3.5 sm:p-5 relative overflow-hidden transition-all"
    >
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-amber-200/40 to-transparent rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-amber-200/80 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-center text-xl shadow-md shrink-0 animate-bounce">
            🔥
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                <span>บันทึกการเรียนรู้ต่อเนื่อง 30 วัน</span>
                <span className="text-xs font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-full border border-amber-300">
                  30-Day Learning Streak
                </span>
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
              ฝึกฝนวันละนิด สร้างวินัยการเรียนรู้ของ{' '}
              <span className="font-bold text-amber-900">
                {profile.avatar} {profile.name}
              </span>
            </p>
          </div>
        </div>

        {/* View Switcher & Expand/Collapse */}
        <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
          <div className="inline-flex p-0.5 rounded-xl bg-amber-100/90 border border-amber-200 text-xs font-bold">
            <button
              type="button"
              id="btn-streak-view-calendar"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setActiveView('calendar');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                activeView === 'calendar'
                  ? 'bg-white text-amber-900 shadow-2xs font-black'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>ปฏิทิน 30 วัน</span>
            </button>
            <button
              type="button"
              id="btn-streak-view-milestones"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setActiveView('milestones');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                activeView === 'milestones'
                  ? 'bg-white text-amber-900 shadow-2xs font-black'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>เป้าหมายขั้น (Milestones)</span>
            </button>
          </div>

          {onOpenBadges && (
            <button
              type="button"
              id="btn-streak-open-badges"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                onOpenBadges();
              }}
              title="ดูเหรียญรางวัลทั้งหมด"
              className="p-1.5 bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <Award className="w-4 h-4 text-amber-600" />
            </button>
          )}

          <button
            type="button"
            id="btn-toggle-streak-card"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 bg-white hover:bg-amber-100 text-slate-600 border border-amber-200 rounded-xl transition-all cursor-pointer shadow-2xs"
            title={isExpanded ? 'ย่อการแสดงผล' : 'ขยายการแสดงผล'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-amber-700" />
            ) : (
              <ChevronDown className="w-4 h-4 text-amber-700" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isExpanded && (
        <div className="mt-3.5 space-y-3.5 relative z-10">
          {/* SECTION A: Streak Hero Banner (Current Streak + Today's Status) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Left Box: Current Streak Counter */}
            <div className="md:col-span-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-3.5 sm:p-4 shadow-sm border-2 border-amber-400 flex items-center justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-amber-100 text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 fill-amber-200 text-amber-200 animate-pulse" />
                  <span>สตรีคการเรียนรู้ปัจจุบัน</span>
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
                    {summary.currentStreak}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-amber-100">
                    วันติดต่อกัน 🔥
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-amber-100 font-medium">
                  <span className="bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs font-bold">
                    🏆 สูงสุด: {summary.longestStreak} วัน
                  </span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    📅 เรียนไปแล้ว {summary.totalActiveDaysIn30}/30 วัน
                  </span>
                </div>
              </div>

              <div className="text-5xl sm:text-6xl drop-shadow-md select-none transform hover:scale-110 transition-transform">
                {summary.currentStreak >= 30
                  ? '👑'
                  : summary.currentStreak >= 21
                  ? '🚀'
                  : summary.currentStreak >= 14
                  ? '⚡'
                  : summary.currentStreak >= 7
                  ? '🌱'
                  : '🔥'}
              </div>
            </div>

            {/* Right Box: Today's Status & Quick Action */}
            <div
              className={`md:col-span-6 rounded-2xl p-3.5 sm:p-4 border-2 flex flex-col justify-between transition-all ${
                summary.isTodayCompleted
                  ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                  : 'bg-amber-100/70 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    {summary.isTodayCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-black bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        ภารกิจวันนี้สำเร็จแล้ว
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-black bg-amber-300 text-amber-900 px-2 py-0.5 rounded-full animate-pulse">
                        <Clock className="w-3.5 h-3.5 text-amber-800" />
                        วันนี้ยังไม่ได้ฝึกฝน
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-black mt-1">
                    {summary.isTodayCompleted
                      ? '🌟 ยอดเยี่ยมมาก! เก็บคะแนนประจำวันเรียบร้อย'
                      : '⏳ มาร่วมเล่น 1 รอบ เพื่อรักษาสตรีคให้ต่อเนื่อง!'}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {summary.isTodayCompleted && summary.todayStats
                      ? `ตอบคำถาม ${summary.todayStats.score} จาก ${summary.todayStats.totalQuestions} ข้อ • ความแม่นยำ ${summary.todayStats.accuracy}%`
                      : `เป้าหมายถัดไป: ปลดล็อก "${summary.nextMilestone.title}" (อีก ${summary.daysUntilNextMilestone} วัน)`}
                  </p>
                </div>

                <div className="text-3xl shrink-0">
                  {summary.isTodayCompleted ? '🎉' : '🎯'}
                </div>
              </div>

              <div className="pt-2 mt-1 border-t border-slate-200/60 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500 font-medium truncate">
                  {summary.isTodayCompleted
                    ? 'สตรีคได้รับการบันทึกปลอดภัยใน Firestore'
                    : 'ใช้เวลาเพียง 3-5 นาที ต่อวัน'}
                </span>

                <button
                  type="button"
                  id="btn-streak-play-now"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    onStartGame();
                  }}
                  className={`text-xs font-black px-3.5 py-1.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-xs active:scale-95 shrink-0 ${
                    summary.isTodayCompleted
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white'
                  }`}
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>{summary.isTodayCompleted ? 'เล่นทบทวนเพิ่ม' : 'เริ่มฝึกเลย 🚀'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* SECTION B: Visual Progress Bar (30-Day Continuum + Milestone Pins) */}
          <div
            id="streak-progress-bar-container"
            className="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-amber-200/80 shadow-2xs space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-black">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-600" />
                <span className="text-slate-800 text-sm font-black">
                  ความก้าวหน้าสู่เป้าหมาย 30 วัน
                </span>
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-extrabold text-[11px]">
                  {Math.min(30, summary.currentStreak)} / 30 วัน ({summary.thirtyDayProgressPercent}%)
                </span>
              </div>
              <div className="text-slate-500 text-[11px] font-bold">
                เป้าหมายถัดไป:{' '}
                <span className="text-amber-800 font-black">
                  {summary.nextMilestone.title}
                </span>{' '}
                (อีก {summary.daysUntilNextMilestone} วัน)
              </div>
            </div>

            {/* Continuous Track Bar with Pins */}
            <div className="relative pt-6 pb-2 px-3 sm:px-4">
              {/* Milestone Checkpoint Markers pinned on the bar */}
              <div className="absolute top-0 left-3 right-3 sm:left-4 sm:right-4 h-5 pointer-events-none flex justify-between">
                {milestonePins.map((pin) => {
                  const isReached = summary.currentStreak >= pin.day;
                  return (
                    <div
                      key={pin.day}
                      style={{ left: `${pin.percent}%` }}
                      className="absolute transform -translate-x-1/2 flex flex-col items-center pointer-events-auto"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-xs border transition-all ${
                          isReached
                            ? 'bg-amber-400 border-amber-600 text-amber-950 scale-110'
                            : 'bg-slate-100 border-slate-300 text-slate-400'
                        }`}
                        title={`${pin.label}: ${isReached ? 'สำเร็จแล้ว' : 'ยังไม่ถึง'}`}
                      >
                        {pin.icon}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bar Background & Fill */}
              <div className="w-full bg-slate-100 rounded-full h-4 sm:h-5 p-0.5 border border-slate-200 overflow-hidden relative shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 rounded-full transition-all duration-700 relative"
                  style={{ width: `${Math.max(4, summary.thirtyDayProgressPercent)}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                </div>
              </div>

              {/* Pin Labels below bar */}
              <div className="relative w-full h-4 mt-1 text-[10px] font-bold text-slate-500">
                {milestonePins.map((pin) => {
                  const isReached = summary.currentStreak >= pin.day;
                  return (
                    <div
                      key={pin.day}
                      style={{ left: `${pin.percent}%` }}
                      className={`absolute transform -translate-x-1/2 whitespace-nowrap ${
                        isReached ? 'text-amber-800 font-black' : 'text-slate-400 font-medium'
                      }`}
                    >
                      {pin.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sub-Progress: Towards Next Milestone */}
            {!summary.nextMilestone.unlocked && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-bold text-slate-700">
                    ก้าวสู่ <span className="text-amber-900 font-black">{summary.nextMilestone.title}</span>:
                  </span>
                  <span className="text-slate-500">
                    ต้องการอีก {summary.daysUntilNextMilestone} วัน
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-28 sm:w-36 bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${summary.progressToNextMilestone}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-black text-amber-800">
                    {summary.progressToNextMilestone}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* SECTION C: Switchable Content (Calendar Grid vs Milestones List) */}
          {activeView === 'calendar' ? (
            /* CALENDAR-STYLE 30-DAY DISPLAY */
            <div
              id="streak-calendar-grid-card"
              className="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-amber-200/80 shadow-2xs space-y-3"
            >
              {/* Calendar Title & Legend */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>ปฏิทินบันทึกการเรียนรู้ 30 วันล่าสุด</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    แตะที่ช่องวันที่เพื่อดูสรุปสถิติคะแนนและทักษะที่ฝึกฝนในวันนั้น
                  </p>
                </div>

                {/* Calendar Legend */}
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-600">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-md bg-amber-400 border border-amber-600 flex items-center justify-center text-[8px] text-white">
                      ★
                    </span>
                    <span>ฝึกสำเร็จ</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-md bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-[8px] text-blue-700 font-black">
                      •
                    </span>
                    <span>วันนี้</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200" />
                    <span>ไม่ได้ฝึก</span>
                  </span>
                </div>
              </div>

              {/* 30-Day Grid: 6 rows of 5 or 7 columns */}
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-1.5 sm:gap-2">
                {summary.calendarDays.map((day) => {
                  return (
                    <button
                      key={day.date}
                      type="button"
                      id={`calendar-day-cell-${day.date}`}
                      onClick={() => handleDayClick(day)}
                      className={`p-1.5 sm:p-2 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center relative group active:scale-95 ${
                        day.isToday
                          ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-300 shadow-xs'
                          : day.isCompleted
                          ? 'bg-amber-50/90 border-amber-400 hover:bg-amber-100/90 shadow-2xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* Day of Week & Date */}
                      <div className="w-full flex items-center justify-between text-[9px] text-slate-500 font-bold px-0.5">
                        <span className="text-[8px] font-semibold">{day.dayOfWeekThai}</span>
                        <span>{day.dayOfMonth} {day.monthName}</span>
                      </div>

                      {/* Center Badge / Icon */}
                      <div className="my-1 flex items-center justify-center text-lg sm:text-xl">
                        {day.isCompleted ? (
                          day.isInActiveStreak ? (
                            <span className="transform group-hover:scale-125 transition-transform">
                              🔥
                            </span>
                          ) : (
                            <span className="transform group-hover:scale-125 transition-transform">
                              🌟
                            </span>
                          )
                        ) : day.isToday ? (
                          <span className="text-xs font-black text-blue-600 bg-blue-100 px-1 py-0.5 rounded">
                            วันนี้
                          </span>
                        ) : (
                          <span className="text-slate-300 text-sm">•</span>
                        )}
                      </div>

                      {/* Bottom Info: accuracy or status */}
                      <div className="w-full text-[9px] font-black truncate">
                        {day.isCompleted ? (
                          <span className="text-amber-900 bg-amber-200/80 px-1 rounded-sm">
                            {day.accuracy}%
                          </span>
                        ) : day.isToday ? (
                          <span className="text-blue-700 font-bold text-[8px]">
                            {summary.isTodayCompleted ? 'สำเร็จ' : 'รอเล่น'}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal">D{day.dayIndex}</span>
                        )}
                      </div>

                      {/* Tiny streak flame indicator if part of active streak */}
                      {day.isInActiveStreak && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-500 border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick tip below calendar */}
              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 pt-1">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  สะสมการเล่นทุกวัน ไฟสตรีคจะลุกต่อเนื่องไม่ดับ และช่วยให้จำทักษะการเรียนรู้ได้แม่นยำยิ่งขึ้น
                </span>
              </div>
            </div>
          ) : (
            /* MILESTONES VIEW */
            <div
              id="streak-milestones-grid-card"
              className="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-amber-200/80 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-800 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>เป้าหมายบันได 4 ขั้นสู่แชมเปี้ยน 30 วัน</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    สะสมวันเรียนรู้เพื่อปลดล็อกเหรียญตราเกียรติยศและของรางวัล
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {summary.milestones.map((m: StreakMilestone) => {
                  const isUnlocked = m.unlocked;
                  const isNext = m.days === summary.nextMilestone.days && !isUnlocked;
                  return (
                    <div
                      key={m.days}
                      id={`milestone-card-${m.days}`}
                      className={`rounded-xl sm:rounded-2xl p-3 border-2 transition-all flex items-start gap-3 relative overflow-hidden ${
                        isUnlocked
                          ? 'bg-gradient-to-br from-amber-50 to-orange-50/80 border-amber-400 shadow-xs'
                          : isNext
                          ? 'bg-blue-50/50 border-blue-300 ring-2 ring-blue-100'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-xs border ${
                          isUnlocked
                            ? 'bg-amber-400 border-amber-500 text-amber-950 scale-105'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        {m.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-black text-slate-800 text-sm truncate">
                            {m.title}
                          </h4>
                          {isUnlocked ? (
                            <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-0.5 shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              ปลดล็อกแล้ว
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full shrink-0">
                              เหลืออีก {Math.max(0, m.days - summary.currentStreak)} วัน
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-amber-900 font-bold mt-0.5">
                          {m.subtitle}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION D: Pedagogical Motivational Speech Bubble */}
          <div className="bg-gradient-to-r from-amber-100/90 via-orange-100/80 to-yellow-100/90 border border-amber-300 rounded-2xl p-3 sm:p-3.5 flex items-start gap-3 shadow-2xs">
            <div className="text-3xl shrink-0 mt-0.5 select-none">
              {summary.motivationalTip.levelEmoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-300 text-amber-950 px-2 py-0.5 rounded-md">
                  {summary.motivationalTip.badge}
                </span>
                <span className="text-xs font-black text-amber-900">
                  ข้อแนะนำสำหรับผู้ปกครอง & หนูน้อย
                </span>
              </div>
              <p className="text-xs sm:text-sm font-black text-slate-800 mt-1 leading-snug">
                "{summary.motivationalTip.text}"
              </p>
              <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                {summary.motivationalTip.subtext}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL: Interactive Day Details */}
      {selectedDay && (
        <div
          id="day-detail-modal-backdrop"
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-3 animate-in fade-in duration-150"
          onClick={handleCloseDayModal}
        >
          <div
            id="day-detail-modal"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-sm w-full border-3 border-amber-300 overflow-hidden animate-in zoom-in-95 duration-150"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {selectedDay.isCompleted ? '🌟' : selectedDay.isToday ? '🔵' : '📅'}
                </span>
                <div>
                  <h3 className="font-black text-base">
                    วันที่ {selectedDay.dayOfMonth} {selectedDay.monthName} ({selectedDay.dayOfWeekThai})
                  </h3>
                  <p className="text-xs text-amber-100 font-medium">
                    วันที่ {selectedDay.dayIndex} ในภารกิจสตรีค 30 วัน
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseDayModal}
                className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {selectedDay.isCompleted ? (
                <div className="space-y-2.5">
                  <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ฝึกฝนสำเร็จในวันนี้
                      </span>
                      <div className="text-lg font-black text-slate-800 mt-0.5">
                        ตอบถูก {selectedDay.score} / {selectedDay.totalQuestions} ข้อ
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 font-medium block">
                        ความแม่นยำ
                      </span>
                      <span className="text-xl font-black text-emerald-700">
                        {selectedDay.accuracy}%
                      </span>
                    </div>
                  </div>

                  {/* Skills practiced breakdown if available */}
                  {selectedDay.historyEntry && (
                    <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/80 space-y-1.5">
                      <span className="text-xs font-black text-slate-700 block">
                        ทักษะที่ได้ฝึกฝน:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                        {SKILLS_LIST.map((sk) => {
                          const h = selectedDay.historyEntry!;
                          let count = 0;
                          if (sk.id === 'literacy' || sk.id === 'thai') {
                            count = h.literacyTotal || h.thaiTotal || 0;
                          } else if (sk.id === 'math') {
                            count = h.mathTotal || 0;
                          } else if (sk.id === 'problem_solving') {
                            count = h.problemSolvingTotal || 0;
                          } else if (sk.id === 'inquiry' || sk.id === 'science') {
                            count = h.inquiryTotal || h.scienceTotal || 0;
                          } else if (sk.id === 'creativity') {
                            count = h.creativityTotal || 0;
                          } else if (sk.id === 'physical_health') {
                            count = h.physicalHealthTotal || 0;
                          } else if (sk.id === 'socio_emotional') {
                            count = h.socioEmotionalTotal || 0;
                          } else if (sk.id === 'citizenship') {
                            count = h.citizenshipTotal || 0;
                          }

                          if (count <= 0) return null;
                          return (
                            <div
                              key={sk.id}
                              className="bg-white p-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5"
                            >
                              <span>{sk.icon}</span>
                              <span className="font-bold text-slate-700 truncate">
                                {sk.shortName.th || sk.name.th} ({count} ข้อ)
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : selectedDay.isToday ? (
                <div className="text-center py-4 space-y-2">
                  <div className="text-4xl">⏳</div>
                  <h4 className="font-black text-slate-800 text-sm">
                    วันนี้ยังไม่ได้ทำแบบฝึกหัด
                  </h4>
                  <p className="text-xs text-slate-500">
                    เข้าเล่นตอนนี้เพียง 1 รอบ เพื่อรักษาสตรีคและรับดาวประจำวัน!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      handleCloseDayModal();
                      onStartGame();
                    }}
                    className="w-full mt-2 py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>เริ่มเล่นทันที</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-4 space-y-1 text-slate-500">
                  <div className="text-3xl">💤</div>
                  <h4 className="font-black text-slate-700 text-sm">
                    ไม่มีประวัติการฝึกในวันนี้
                  </h4>
                  <p className="text-xs text-slate-400">
                    ฝึกฝนอย่างสม่ำเสมอในวันต่อๆ ไป เพื่อสร้างสตรีคยาวนาน
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleCloseDayModal}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition-colors"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
