import React from 'react';
import {
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  Trophy,
  BarChart3,
  Settings,
  Printer,
  Sparkles,
  Users,
  Flame,
  Home,
  Target,
  BookOpen,
  Crosshair,
} from 'lucide-react';
import { ChildProfile, ExamSet, GameSettings, Grade, Language, Subject, CurriculumMode } from '../types';
import { ClassroomRoom } from '../services/classroomRoomService';
import { SKILLS_LIST, CBE_COMPETENCIES_LIST } from '../data/skills';
import { getAvatarColorOption } from '../utils/avatarUtils';
import { getCurriculumTheme } from '../utils/curriculumTheme';
import { PendingSyncIndicator } from './PendingSyncIndicator';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderBarProps {
  activeProfile: ChildProfile;
  settings: GameSettings;
  score: number;
  currentStreak: number;
  currentGrade: Grade;
  activeExamSet?: ExamSet | null;
  onGradeChange: (grade: Grade) => void;
  onOpenProfiles: () => void;
  onOpenStreakModal?: () => void;
  onOpenExamSets?: () => void;
  onOpenSkillSelect?: () => void;
  onOpenBadges: () => void;
  onOpenTopPerformers?: () => void;
  onOpenReport: () => void;
  onOpenCompetencyReport?: () => void;
  onOpenSkillRadarReport?: () => void;
  onOpenSettings: () => void;
  onOpenWorksheets: () => void;
  onOpenSkillGames?: () => void;
  onOpenThaiHandwriting?: () => void;
  onOpenEnglishHandwriting?: () => void;
  onOpenClassroomRoom?: () => void;
  activeClassroomRoom?: ClassroomRoom | null;
  onOpenQuestionManager?: () => void;
  onOpenFeedback?: () => void;
  onOpenFunFacts?: () => void;
  onOpenWeeklyTrends?: () => void;
  onToggleSound: () => void;
  onToggleCamera: () => void;
  onOpenHandCalibration?: () => void;
  onReplaySpeech: () => void;
  onReturnToHome?: () => void;
  effectiveMode?: 'touch' | 'hand';
  isAutoSwitched?: boolean;
  onToggleControlMode?: () => void;
  onOpenDailyLogin?: () => void;
  hasUnclaimedDailyReward?: boolean;
  onOpenCompetencyActivities?: () => void;
  curriculumMode?: CurriculumMode;
  onOpenCurriculumSwitch?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  activeProfile,
  settings,
  score,
  currentStreak,
  currentGrade,
  activeExamSet,
  onGradeChange,
  onOpenProfiles,
  onOpenStreakModal,
  onOpenExamSets,
  onOpenSkillSelect,
  onOpenBadges,
  onOpenTopPerformers,
  onOpenReport,
  onOpenCompetencyReport,
  onOpenSkillRadarReport,
  onOpenSettings,
  onOpenWorksheets,
  onOpenSkillGames,
  onOpenThaiHandwriting,
  onOpenEnglishHandwriting,
  onOpenClassroomRoom,
  activeClassroomRoom,
  onOpenQuestionManager,
  onOpenFeedback,
  onOpenFunFacts,
  onOpenWeeklyTrends,
  onToggleSound,
  onToggleCamera,
  onOpenHandCalibration,
  onReplaySpeech,
  onReturnToHome,
  effectiveMode = 'hand',
  isAutoSwitched = false,
  onToggleControlMode,
  onOpenDailyLogin,
  hasUnclaimedDailyReward = false,
  onOpenCompetencyActivities,
  curriculumMode = 'early_childhood',
  onOpenCurriculumSwitch,
}: HeaderBarProps) => {
  const currTheme = getCurriculumTheme(curriculumMode);

  return (
    <header
      id="app-header-bar"
      className={`no-print w-full bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-3.5 shadow-sm border-b-2 sm:border-b-4 ${currTheme.headerBorder} flex items-center justify-between gap-2 sm:gap-3 z-30 select-none mb-1.5 sm:mb-2 shrink-0 transition-colors`}
    >
      {/* Left side: Profile switcher & Grade indicator */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Kid Profile Badge with Vibrant Pink 3D style */}
        <button
          id="btn-profile-switcher"
          onClick={onOpenProfiles}
          className="flex items-center gap-2 sm:gap-3 bg-white hover:bg-pink-50/50 rounded-xl sm:rounded-2xl p-0.5 sm:p-1 pr-2 sm:pr-3 transition-all cursor-pointer group text-left"
          title="สลับโปรไฟล์ผู้เล่น"
        >
          {(() => {
            const colorCfg = getAvatarColorOption(activeProfile.avatarBg);
            return (
              <div
                className={`w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 ${colorCfg.bgClass} rounded-xl sm:rounded-2xl flex items-center justify-center border-b-2 sm:border-b-4 ${colorCfg.borderClass} shadow-sm text-xl sm:text-2xl group-hover:scale-105 transition-transform shrink-0`}
              >
                <span>{activeProfile.avatar}</span>
              </div>
            );
          })()}
          <div>
            <h1 className="text-sm sm:text-base md:text-lg font-black text-pink-500 leading-tight max-w-[90px] sm:max-w-none truncate">
              {activeProfile.name}
            </h1>
            <div className="flex gap-1.5 items-center mt-0.5">
              <span className="bg-blue-100 text-blue-600 text-[10px] sm:text-[11px] font-black px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full uppercase">
                {activeProfile.grade === 'K1'
                  ? 'อนุบาล 1'
                  : activeProfile.grade === 'K2'
                  ? 'อนุบาล 2'
                  : activeProfile.grade === 'K3'
                  ? 'อนุบาล 3'
                  : activeProfile.grade === 'P1'
                  ? 'ประถมศึกษา 1'
                  : activeProfile.grade === 'P2'
                  ? 'ประถมศึกษา 2'
                  : activeProfile.grade === 'P3'
                  ? 'ประถมศึกษา 3'
                  : activeProfile.grade === 'P4'
                  ? 'ประถมศึกษา 4'
                  : activeProfile.grade === 'P5'
                  ? 'ประถมศึกษา 5'
                  : activeProfile.grade === 'P6'
                  ? 'ประถมศึกษา 6'
                  : activeProfile.grade}
              </span>
              <span className="text-slate-400 text-[10px] font-medium hidden md:inline">
                สลับโปรไฟล์
              </span>
            </div>
          </div>
        </button>

        {/* Back to Home / Profile Select Button */}
        {onReturnToHome && (
          <button
            id="btn-nav-home"
            onClick={onReturnToHome}
            className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 sm:border-2 text-xs font-black p-1.5 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl shadow-xs transition-all active:scale-95 cursor-pointer"
            title="กลับหน้าแรก / เลือกโปรไฟล์"
          >
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
            <span className="hidden sm:inline">หน้าแรก</span>
          </button>
        )}

        {/* Curriculum Switcher Button */}
        {onOpenCurriculumSwitch && (
          <button
            id="btn-header-curriculum-switch"
            onClick={onOpenCurriculumSwitch}
            className={`flex items-center gap-1 text-xs font-black p-1.5 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl shadow-xs transition-all active:scale-95 cursor-pointer border ${currTheme.headerCurriculumPill}`}
            title="สลับระบบ: 8 ทักษะปฐมวัย ⇄ สมรรถนะ ป.1-6 ⇄ แจกลูกสะกดคำ สพฐ."
          >
            <span>{currTheme.emoji}</span>
            <span className="hidden md:inline">
              {currTheme.shortName} ({currTheme.gradeRange})
            </span>
            <span className="text-[10px] bg-white/20 px-1 rounded-sm ml-0.5">สลับ ⇄</span>
          </button>
        )}

        {/* Grade Quick Switcher Tabs (แยกแสดงเฉพาะระดับชั้นของหลักสูตรที่กำลังใช้งาน ไม่ปะปนกัน) */}
        {curriculumMode === 'thai_phonics' ? (
          <div className={`hidden xl:flex items-center ${currTheme.headerGradeContainer} p-1 rounded-2xl gap-1 text-[11px] shadow-2xs`}>
            <span className="text-[10px] font-black px-1.5 flex items-center gap-1">
              <span>📖</span>
              <span>แจกลูก (ป.๑ - ป.๖)</span>
            </span>
            {(['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as Grade[]).map((g) => {
              const isActive = currentGrade === g;
              const num = g.slice(1);
              return (
                <button
                  key={g}
                  id={`tab-grade-${g}`}
                  onClick={() => onGradeChange(g)}
                  className={`px-2 py-1 font-black rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? currTheme.headerActiveGradeTab
                      : 'text-emerald-800 hover:text-emerald-950 hover:bg-white/80'
                  }`}
                  title={`สลับชั้นเรียนเป็น ประถมศึกษาปีที่ ${num}`}
                >
                  {`ป.${num}`}
                </button>
              );
            })}
          </div>
        ) : curriculumMode === 'cbe_primary' ? (
          <div className={`hidden xl:flex items-center ${currTheme.headerGradeContainer} p-1 rounded-2xl gap-1 text-[11px] shadow-2xs`}>
            <span className="text-[10px] font-black px-1.5 flex items-center gap-1">
              <span>🎓</span>
              <span>สมรรถนะ (ป.๑ - ป.๖)</span>
            </span>
            {(['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as Grade[]).map((g) => {
              const isActive = currentGrade === g;
              const num = g.slice(1);
              return (
                <button
                  key={g}
                  id={`tab-grade-${g}`}
                  onClick={() => onGradeChange(g)}
                  className={`px-2 py-1 font-black rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? currTheme.headerActiveGradeTab
                      : 'text-indigo-800 hover:text-indigo-950 hover:bg-white/80'
                  }`}
                  title={`สลับชั้นเรียนเป็น ประถมศึกษาปีที่ ${num}`}
                >
                  {`ป.${num}`}
                </button>
              );
            })}
          </div>
        ) : (
          <div className={`hidden xl:flex items-center ${currTheme.headerGradeContainer} p-1 rounded-2xl gap-1 text-[11px] shadow-2xs`}>
            <span className="text-[10px] font-black px-1.5 flex items-center gap-1">
              <span>🧸</span>
              <span>ปฐมวัย (อ.๑ - อ.๓)</span>
            </span>
            {(['K1', 'K2', 'K3'] as Grade[]).map((g) => {
              const isActive = currentGrade === g;
              return (
                <button
                  key={g}
                  id={`tab-grade-${g}`}
                  onClick={() => onGradeChange(g)}
                  className={`px-3 py-1 font-black rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? currTheme.headerActiveGradeTab
                      : 'text-sky-800 hover:text-sky-950 hover:bg-white/80'
                  }`}
                  title={`สลับชั้นเรียนเป็น อนุบาล ${g === 'K1' ? '1' : g === 'K2' ? '2' : '3'}`}
                >
                  {g === 'K1' ? 'อ.1' : g === 'K2' ? 'อ.2' : 'อ.3'}
                </button>
              );
            })}
          </div>
        )}

        {/* Streak Flame Counter */}
        {currentStreak > 1 && (
          <button
            type="button"
            onClick={onOpenStreakModal}
            className="hidden sm:flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-900 text-xs font-black px-2.5 py-1 rounded-2xl shadow-xs cursor-pointer transition-all active:scale-95"
            title="คลิกเพื่อดู 30-Day Learning Streak Tracker"
          >
            <Flame className="w-4 h-4 fill-amber-500 text-amber-600 animate-bounce" />
            <span>{currentStreak} ข้อติด!</span>
          </button>
        )}

        {/* Skill Selector Badge/Button */}
        {onOpenSkillSelect && (
          <button
            id="btn-header-skill-select"
            onClick={onOpenSkillSelect}
            className="hidden md:flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-2 border-indigo-200 text-xs font-black px-3 py-1.5 rounded-2xl shadow-xs transition-all active:scale-95 cursor-pointer"
            title="คลิกเพื่อเลือกทักษะที่จะสอบ (8 ทักษะหลัก เลือก 3, 6 หรือ 9 ข้อต่อทักษะ)"
          >
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              {(() => {
                const qPerSkill = settings.questionsPerSkill || 3;
                const totalQ = settings.selectedSubjects.length * qPerSkill;
                const isCbe = ['P1', 'P2', 'P3'].includes(currentGrade) || settings.selectedSubjects.some((s) => ['self_management', 'higher_order_thinking', 'communication', 'teamwork_collaboration', 'active_citizenship', 'sustainable_living'].includes(s));
                if (isCbe) {
                  if (settings.selectedSubjects.length === 6) {
                    return `ครบ 6 สมรรถนะ (${totalQ} ข้อ)`;
                  }
                  if (settings.selectedSubjects.length === 1) {
                    const sk = CBE_COMPETENCIES_LIST.find((s) => s.id === settings.selectedSubjects[0]);
                    return sk ? `${sk.icon} ${sk.shortName.th} (${totalQ} ข้อ)` : `1 สมรรถนะ (${totalQ} ข้อ)`;
                  }
                  return `${settings.selectedSubjects.length} สมรรถนะ (${totalQ} ข้อ)`;
                }
                if (settings.selectedSubjects.length === 8) {
                  return `ครบ 8 ทักษะ (${totalQ} ข้อ)`;
                }
                if (settings.selectedSubjects.length === 1) {
                  const sk = SKILLS_LIST.find((s) => s.id === settings.selectedSubjects[0]);
                  return sk ? `${sk.icon} ${sk.shortName.th} (${totalQ} ข้อ)` : `สอบ 1 ทักษะ (${totalQ} ข้อ)`;
                }
                return `${settings.selectedSubjects.length} ทักษะ (${totalQ} ข้อ)`;
              })()}
            </span>
          </button>
        )}

        {/* Exam Set Pill / Button */}
        {onOpenExamSets && (
          activeExamSet ? (
            <button
              id="btn-active-exam-set"
              onClick={onOpenExamSets}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-xs border-b-2 border-orange-700 cursor-pointer active:scale-95 transition-all"
              title="กำลังทำชุดข้อสอบ: คลิกเพื่อเปลี่ยนชุดข้อสอบ"
            >
              <span className="animate-pulse">🎯</span>
              <span className="max-w-[100px] sm:max-w-[160px] truncate">{activeExamSet.title}</span>
            </button>
          ) : (
            <button
              id="btn-open-exam-sets"
              onClick={onOpenExamSets}
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-amber-300 text-xs font-black px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-xs transition-all active:scale-95 cursor-pointer"
              title="เลือกชุดข้อสอบที่คุณครูหรือระบบจัดไว้ (Quiz Sets)"
            >
              <span>📚</span>
              <span className="hidden sm:inline">ชุดข้อสอบครูจัด</span>
              <span className="sm:hidden">ชุดข้อสอบ</span>
            </button>
          )
        )}

        {/* Competency Activities Button (CBE 6 Core Competencies 5-min steps) */}
        {onOpenCompetencyActivities && (
          <button
            id="btn-header-competency-activities"
            onClick={onOpenCompetencyActivities}
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-xs border-b-2 border-purple-800 cursor-pointer active:scale-95 transition-all"
            title="กิจกรรมเสริมสมรรถนะ (เน้นการลงมือปฏิบัติ 6 สมรรถนะหลัก ขั้นตอนละ 5 นาที)"
          >
            <span className="animate-pulse">🎯</span>
            <span className="hidden sm:inline">กิจกรรมเสริมสมรรถนะ</span>
            <span className="sm:hidden">สมรรถนะ</span>
          </button>
        )}

        {/* Skill Games Hub Button */}
        {onOpenSkillGames && (
          <button
            id="btn-header-skill-games"
            onClick={onOpenSkillGames}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-xs border-b-2 border-purple-700 cursor-pointer active:scale-95 transition-all"
            title="ศูนย์เกมการศึกษา & ฝึกทักษะ (15 หมวดหมู่)"
          >
            <span className="animate-pulse">🎮</span>
            <span className="hidden sm:inline">เกมฝึกทักษะ</span>
            <span className="sm:hidden">เกม</span>
          </button>
        )}

        {/* Thai Handwriting Module Button */}
        {onOpenThaiHandwriting && (
          <button
            id="btn-header-thai-handwriting"
            onClick={onOpenThaiHandwriting}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-xs border-b-2 border-orange-700 cursor-pointer active:scale-95 transition-all"
            title="การเขียนคัดลายมือไทย (Hand Tracking) ก-ฮ 44 ตัว พร้อมเส้นประ 5 เส้น"
          >
            <span>✍️</span>
            <span className="hidden sm:inline">คัดลายมือไทย</span>
            <span className="sm:hidden">คัดลายมือ</span>
          </button>
        )}

        {/* English Handwriting Module Button */}
        {onOpenEnglishHandwriting && (
          <button
            id="btn-header-english-handwriting"
            onClick={onOpenEnglishHandwriting}
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-xs border-b-2 border-indigo-800 cursor-pointer active:scale-95 transition-all"
            title="การเขียนตัวอักษรภาษาอังกฤษ (Hand Tracking) A-Z 26 ตัว พร้อมเสียงอ่าน Phonics"
          >
            <span>🔤</span>
            <span className="hidden sm:inline">อักษรภาษาอังกฤษ</span>
            <span className="sm:hidden">A-Z</span>
          </button>
        )}

        {/* Classroom Virtual Room Button */}
        {onOpenClassroomRoom && (
          <button
            id="btn-header-classroom-room"
            onClick={onOpenClassroomRoom}
            className={`flex items-center gap-1.5 font-black text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-xs border-b-2 cursor-pointer active:scale-95 transition-all ${
              activeClassroomRoom
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-emerald-800'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-300'
            }`}
            title="ห้องเรียนจำลอง Real-time: สร้างห้องเรียน, แสดงสถานะเด็กสดๆ และแดชบอร์ดหลักสำหรับครู"
          >
            <span>🏫</span>
            {activeClassroomRoom ? (
              <>
                <span className="hidden sm:inline font-bold">ห้อง:</span>
                <span className="max-w-[80px] sm:max-w-[120px] truncate">{activeClassroomRoom.name.split(' ')[0]}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping shrink-0" />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">ห้องเรียนสด</span>
                <span className="sm:hidden">ห้องเรียน</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Right side: Score, Badges, TTS, Camera, Report, Settings */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
        {/* Offline & Pending Sync Status Indicator */}
        <PendingSyncIndicator />

        {/* PWA Install Button (Compact) */}
        <PWAInstallButton className="hidden xl:flex" />

        {/* Yellow Coin/Points Pill from Vibrant Theme */}
        <div className="bg-yellow-100 px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl border sm:border-2 border-yellow-200 flex items-center gap-1 sm:gap-1.5 shadow-xs">
          <span className="text-sm sm:text-base md:text-lg">🪙</span>
          <span className="font-black text-yellow-700 text-xs sm:text-sm md:text-base">
            {score.toLocaleString()}
          </span>
        </div>

        {/* Vibrant Circular 3D Trophy/Badges Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Daily Login Reward Button */}
          {onOpenDailyLogin && (
            <button
              id="btn-header-daily-login"
              type="button"
              onClick={onOpenDailyLogin}
              className={`relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border-b-2 sm:border-b-4 shadow-sm text-xs sm:text-sm hover:translate-y-0.5 active:border-b-0 cursor-pointer transition-all ${
                hasUnclaimedDailyReward
                  ? 'bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-500 border-orange-700 text-white animate-pulse'
                  : 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-800'
              }`}
              title={
                hasUnclaimedDailyReward
                  ? '🎁 มีรางวัลล็อกอินประจำวันรออยู่! คลิกเพื่อรับดาวโบนัส'
                  : '🎁 รางวัลล็อกอินประจำวัน (Daily Login Rewards)'
              }
            >
              <span className="text-sm sm:text-base">🎁</span>
              {hasUnclaimedDailyReward && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-rose-500 border-2 border-white rounded-full animate-ping" />
              )}
            </button>
          )}

          {onOpenTopPerformers && (
            <button
              id="btn-open-top-performers"
              onClick={onOpenTopPerformers}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-amber-500 rounded-full flex items-center justify-center border-b-2 sm:border-b-4 border-amber-700 shadow-sm text-white text-xs sm:text-sm hover:translate-y-0.5 active:border-b-0 cursor-pointer transition-all"
              title="กระดานผู้นำยอดเยี่ยม (Top Performers - นิรนามปลอดภัย)"
            >
              👑
            </button>
          )}
          <button
            id="btn-open-badges"
            onClick={onOpenBadges}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-indigo-500 rounded-full flex items-center justify-center border-b-2 sm:border-b-4 border-indigo-700 shadow-sm text-white text-xs sm:text-sm hover:translate-y-0.5 active:border-b-0 cursor-pointer transition-all"
            title="แผนที่การผจญภัยการเรียนรู้ & เหรียญรางวัล (Learning Journey Map)"
          >
            🏆
          </button>
          <button
            onClick={onOpenReport}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-emerald-500 rounded-full flex items-center justify-center border-b-2 sm:border-b-4 border-emerald-700 shadow-sm text-white text-xs sm:text-sm hover:translate-y-0.5 active:border-b-0 cursor-pointer transition-all"
            title="รายงานพัฒนาการ"
          >
            📊
          </button>
          {onOpenCompetencyReport && (
            <button
              id="btn-header-competency-report"
              onClick={onOpenCompetencyReport}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-indigo-600 rounded-full flex items-center justify-center border-b-2 sm:border-b-4 border-indigo-800 shadow-sm text-white text-xs sm:text-sm hover:translate-y-0.5 active:border-b-0 cursor-pointer transition-all"
              title="รายงานสมรรถนะหลัก 6 ด้าน (ป.1 - ป.3 สพฐ.)"
            >
              🎓
            </button>
          )}
          {onOpenSkillRadarReport && (
            <button
              id="btn-header-radar-skills"
              onClick={onOpenSkillRadarReport}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-purple-500 rounded-full flex items-center justify-center border-b-2 sm:border-b-4 border-purple-700 shadow-sm text-white text-xs sm:text-sm hover:translate-y-0.5 active:border-b-0 cursor-pointer transition-all"
              title="รายงานสรุปผลรายทักษะ (Radar Chart ใยแมงมุม 8 ทักษะหลัก)"
            >
              🕸️
            </button>
          )}
          {onOpenWeeklyTrends && (
            <button
              id="btn-header-weekly-trends"
              onClick={onOpenWeeklyTrends}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-teal-500 rounded-full flex items-center justify-center border-b-2 sm:border-b-4 border-teal-700 shadow-sm text-white text-xs sm:text-sm hover:translate-y-0.5 active:border-b-0 cursor-pointer transition-all"
              title="แนวโน้มพัฒนาการรายสัปดาห์ (Line Chart จาก Firestore)"
            >
              📈
            </button>
          )}
          <button
            onClick={onOpenWorksheets}
            className="hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-amber-500 rounded-full items-center justify-center border-b-2 sm:border-b-4 border-amber-700 shadow-sm text-white text-xs sm:text-sm hover:translate-y-0.5 active:border-b-0 cursor-pointer transition-all"
            title="ใบงานพิมพ์ PDF"
          >
            🖨️
          </button>
          {onOpenQuestionManager && (
            <button
              id="btn-open-question-manager"
              onClick={onOpenQuestionManager}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center border-b-2 sm:border-b-4 border-orange-700 shadow-sm text-white text-xs sm:text-sm hover:translate-y-0.5 active:border-b-0 cursor-pointer transition-all relative"
              title="ระบบจัดการแบบทดสอบ (เฉพาะอีเมลที่กำหนด เช่น nusornon@gmail.com)"
            >
              📝
              <span className="absolute -top-1 -right-1 text-[9px] bg-slate-900 text-amber-300 rounded-full w-4 h-4 flex items-center justify-center border border-white font-bold">
                🔒
              </span>
            </button>
          )}
          {onOpenFeedback && (
            <button
              id="btn-open-feedback"
              onClick={onOpenFeedback}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-teal-500 rounded-full flex items-center justify-center border-b-2 sm:border-b-4 border-teal-700 shadow-sm text-white text-xs sm:text-sm hover:translate-y-0.5 active:border-b-0 cursor-pointer transition-all"
              title="ส่งข้อเสนอแนะถึงผู้พัฒนา (Feedback)"
            >
              💬
            </button>
          )}
          {onOpenFunFacts && (
            <button
              id="btn-open-fun-facts-header"
              onClick={onOpenFunFacts}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-amber-400 hover:bg-amber-500 rounded-full flex items-center justify-center border-b-2 sm:border-b-4 border-amber-600 shadow-sm text-white text-xs sm:text-sm hover:translate-y-0.5 active:border-b-0 cursor-pointer transition-all animate-pulse hover:animate-none"
              title="เกร็ดความรู้ชวนคิด (Fun Facts)"
            >
              💡
            </button>
          )}
        </div>

        {/* Sound Mute / Unmute Button with Hotkey 'M' Indicator */}
        <button
          id="btn-toggle-sound-header"
          onClick={onToggleSound}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border sm:border-2 shadow-xs cursor-pointer active:scale-95 transition-all relative ${
            settings.soundVolume > 0
              ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border-emerald-300'
              : 'bg-rose-100 hover:bg-rose-200 text-rose-600 border-rose-300 animate-pulse hover:animate-none'
          }`}
          title={
            settings.soundVolume > 0
              ? 'เปิดเสียงอยู่ • คลิกเพื่อปิดเสียงทั้งแอป (หรือกดปุ่ม M บนแป้นพิมพ์)'
              : 'ปิดเสียงอยู่ • คลิกเพื่อเปิดเสียง (หรือกดปุ่ม M บนแป้นพิมพ์)'
          }
        >
          {settings.soundVolume > 0 ? (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />
          )}
          <span className="hidden xl:flex absolute -bottom-1.5 -right-1 text-[8px] font-black px-1 rounded-sm bg-slate-800 text-amber-300 shadow-xs leading-none py-0.5">
            M
          </span>
        </button>

        {/* TTS button */}
        <button
          id="btn-replay-speech"
          onClick={onReplaySpeech}
          disabled={settings.soundVolume <= 0}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border sm:border-2 shadow-xs active:scale-95 transition-all ${
            settings.soundVolume <= 0
              ? 'bg-slate-100 text-slate-400 border-slate-200 opacity-60 cursor-not-allowed'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-200 cursor-pointer'
          }`}
          title={
            settings.soundVolume <= 0
              ? 'เสียงถูกปิดอยู่ (กดปุ่ม M บนคีย์บอร์ดเพื่อเปิดเสียง)'
              : 'ฟังเสียงคำถามอีกครั้ง'
          }
        >
          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
        </button>

        {/* Mode Switcher Button (Phone Touch vs Hand Camera) */}
        {onToggleControlMode && (
          <button
            id="btn-toggle-control-mode"
            onClick={onToggleControlMode}
            className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl flex items-center gap-1 border sm:border-2 shadow-xs cursor-pointer active:scale-95 transition-all text-xs font-black ${
              effectiveMode === 'touch'
                ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                : 'bg-sky-100 text-sky-900 border-sky-300 hover:bg-sky-200'
            }`}
            title={
              effectiveMode === 'touch'
                ? 'โหมดสัมผัสหน้าจอ (แตะตอบทันที) • คลิกเพื่อสลับเป็นโหมดกล้องจับมือ'
                : 'โหมดจับภาพมือ (ชี้ค้างด้วยกล้อง) • คลิกเพื่อสลับเป็นโหมดสัมผัสหน้าจอ'
            }
          >
            <span className="text-sm">{effectiveMode === 'touch' ? '📱' : '🖐️'}</span>
            <span className="hidden md:inline">
              {effectiveMode === 'touch' ? 'โหมดสัมผัส' : 'โหมดกล้อง'}
            </span>
          </button>
        )}

        {/* Camera toggle - only in hand tracking mode */}
        {effectiveMode === 'hand' && (
          <button
            id="btn-toggle-camera"
            onClick={onToggleCamera}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border sm:border-2 shadow-xs cursor-pointer active:scale-95 transition-all ${
              settings.showCameraFeed
                ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
            title={settings.showCameraFeed ? 'ซ่อนกล้องจับมือ' : 'เปิดกล้องจับมือ'}
          >
            {settings.showCameraFeed ? (
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
            ) : (
              <CameraOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            )}
          </button>
        )}

        {/* Hand Tracking Calibration Button - only in hand tracking mode */}
        {effectiveMode === 'hand' && onOpenHandCalibration && (
          <button
            id="btn-calibrate-hand-header"
            onClick={onOpenHandCalibration}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border sm:border-2 shadow-xs cursor-pointer active:scale-95 transition-all bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300"
            title="🎯 ปรับเทียบกล้องจับมือ (Calibrate Hand) เพื่อความแม่นยำสำหรับเด็กเล็ก"
          >
            <Crosshair className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
          </button>
        )}

        {/* Dark Tactile Settings Button from Vibrant Design */}
        <button
          id="btn-open-settings"
          onClick={onOpenSettings}
          className="bg-slate-800 hover:bg-slate-900 text-white p-1.5 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-bold border-b-2 sm:border-b-4 border-slate-950 active:translate-y-0.5 active:border-b-0 shadow-md cursor-pointer transition-all flex items-center gap-1"
          title="ตั้งค่าผู้ปกครอง / ครู"
        >
          <span>⚙️</span>
          <span className="hidden sm:inline">ตั้งค่า</span>
        </button>
      </div>
    </header>
  );
};
