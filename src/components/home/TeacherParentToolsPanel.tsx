import React, { useState, useEffect } from 'react';
import {
  School,
  BarChart3,
  TrendingUp,
  BookOpen,
  Printer,
  FileQuestion,
  Settings,
  Shield,
  ShieldCheck,
  Cloud,
  RefreshCw,
  MessageSquare,
  Gamepad2,
  Award,
  Lightbulb,
  Crown,
  ChevronRight,
  Hand,
  Target,
  FileText,
  Sparkles,
  Mic,
  Palette,
  QrCode,
  FileCheck,
  Star,
  TreePine,
  Home,
  Users,
  Compass,
  Layers,
  Puzzle,
  ShoppingBag,
  Stethoscope,
  Smile,
} from 'lucide-react';
import { ClassroomRoom } from '../../services/classroomRoomService';
import { CurriculumMode } from '../../types';

export interface TeacherParentToolsPanelProps {
  onOpenClassroomRoom?: () => void;
  activeClassroomRoom?: ClassroomRoom | null;
  onOpenClassReport: () => void;
  onOpenWeeklyTrends?: () => void;
  onOpenSkillRadarReport?: () => void;
  onOpenExamSets?: () => void;
  onOpenWorksheets: () => void;
  onOpenQuestionManager?: () => void;
  onOpenSettings: () => void;
  onOpenFeedback?: () => void;
  isAdmin?: boolean;
  onOpenAdminAuth?: (targetProfile?: any) => void;
  onSyncProfiles?: () => Promise<void> | void;
  isSyncingCloud?: boolean;
  // Quick access to enrichment activities
  onOpenSkillGames?: () => void;
  onOpenBadges: () => void;
  onOpenAirWriting?: () => void;
  onOpenWordBuilder?: () => void;
  onOpenHolisticReport?: () => void;
  badgeCount: number;
  onOpenFunFacts?: () => void;
  onOpenTopPerformers?: () => void;
  onOpenPreGameStory?: () => void;
  onOpenHandTracing?: () => void;
  onOpenThaiHandwriting?: () => void;
  onOpenEnglishHandwriting?: () => void;
  onOpenCompetencyActivities?: () => void;
  onOpenCompetencyReport?: () => void;
  onOpenAIQuestionSuggester?: () => void;
  onOpenOutdoorAdventure?: () => void;
  onOpenClassroomDiscussion?: () => void;
  onOpenColorPhonics?: () => void;
  onOpenVoicePhonics?: () => void;
  onOpenDiagnostic?: () => void;
  onOpenAvatarShop?: () => void;
  onOpenOfficialReport?: () => void;
  onOpenHomeSchool?: () => void;
  curriculumMode?: CurriculumMode;
}

export type ToolFilterCategory = 'early_childhood' | 'cbe_primary' | 'thai_phonics' | 'classroom' | 'parent' | 'all';

export const TeacherParentToolsPanel: React.FC<TeacherParentToolsPanelProps> = ({
  onOpenClassroomRoom,
  activeClassroomRoom,
  onOpenClassReport,
  onOpenWeeklyTrends,
  onOpenSkillRadarReport,
  onOpenExamSets,
  onOpenWorksheets,
  onOpenQuestionManager,
  onOpenSettings,
  onOpenFeedback,
  isAdmin = false,
  onOpenAdminAuth,
  onSyncProfiles,
  isSyncingCloud = false,
  onOpenSkillGames,
  onOpenBadges,
  badgeCount,
  onOpenFunFacts,
  onOpenTopPerformers,
  onOpenPreGameStory,
  onOpenHandTracing,
  onOpenThaiHandwriting,
  onOpenEnglishHandwriting,
  onOpenCompetencyActivities,
  onOpenCompetencyReport,
  onOpenAIQuestionSuggester,
  onOpenOutdoorAdventure,
  onOpenClassroomDiscussion,
  curriculumMode = 'early_childhood',
  onOpenAirWriting,
  onOpenWordBuilder,
  onOpenHolisticReport,
  onOpenColorPhonics,
  onOpenVoicePhonics,
  onOpenDiagnostic,
  onOpenAvatarShop,
  onOpenOfficialReport,
  onOpenHomeSchool,
}) => {
  const initialCategory: ToolFilterCategory =
    curriculumMode === 'early_childhood'
      ? 'early_childhood'
      : curriculumMode === 'cbe_primary'
      ? 'cbe_primary'
      : curriculumMode === 'thai_phonics'
      ? 'thai_phonics'
      : 'early_childhood';

  const [activeCategory, setActiveCategory] = useState<ToolFilterCategory>(initialCategory);

  // Automatically sync category filter when curriculum mode changes
  useEffect(() => {
    if (curriculumMode === 'early_childhood') {
      setActiveCategory('early_childhood');
    } else if (curriculumMode === 'cbe_primary') {
      setActiveCategory('cbe_primary');
    } else if (curriculumMode === 'thai_phonics') {
      setActiveCategory('thai_phonics');
    }
  }, [curriculumMode]);

  return (
    <aside
      aria-label="เครื่องมือครูและผู้ปกครอง"
      className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col gap-4"
    >
      {/* Panel Header */}
      <div className="pb-3 border-b border-slate-100 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-xl shadow-2xs">
              👩‍🏫
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                เครื่องมือครูและผู้ปกครอง
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                ระบบจัดการห้องเรียน, ประเมินพัฒนาการ & คลังข้อสอบ
              </p>
            </div>
          </div>

          {/* Admin status pill or quick auth */}
          {onOpenAdminAuth && (
            <button
              type="button"
              id="btn-panel-admin-auth"
              onClick={() => onOpenAdminAuth()}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer border shrink-0 whitespace-nowrap ${
                isAdmin
                  ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200 shadow-2xs'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
              title={isAdmin ? 'เข้าสู่ระบบโหมดคุณครู/แอดมินแล้ว' : 'คลิกเพื่อเข้าสู่ระบบครู (Admin PIN)'}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>ครู/แอดมิน</span>
                </>
              ) : (
                <>
                  <Shield className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>ครู (PIN)</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Live Active Classroom Room Banner if present */}
        {activeClassroomRoom && onOpenClassroomRoom && (
          <div
            onClick={onOpenClassroomRoom}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl p-2.5 px-3 flex items-center justify-between cursor-pointer shadow-xs transition-all active:scale-98"
            title="คลิกเพื่อเปิดห้องเรียนจำลอง Real-time"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg">🏫</span>
              <div className="min-w-0">
                <div className="text-xs font-black truncate flex items-center gap-1.5">
                  <span>ห้องเรียนสด: {activeClassroomRoom.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-200 animate-ping shrink-0" />
                </div>
                <div className="text-[10px] text-emerald-100 truncate">
                  รหัสห้อง: {activeClassroomRoom.roomCode} • กำลังเชื่อมต่อ Real-time
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 shrink-0 text-white/80" />
          </div>
        )}

        {/* Category Filter Tabs: Segmented Control เรียบร้อย สะอาดตา */}
        <div className="flex flex-col gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between px-1 text-[11px] font-bold text-slate-500">
            <span>หมวดหมู่เครื่องมือ:</span>
            {activeCategory !== 'all' ? (
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="text-[10px] text-indigo-600 hover:text-indigo-800 font-black cursor-pointer hover:underline"
              >
                ดูทั้งหมด ({'all'}) →
              </button>
            ) : (
              <span className="text-[10px] text-slate-400 font-medium">แสดงทุกหมวด</span>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
            <button
              type="button"
              id="tab-tools-early-childhood"
              onClick={() => setActiveCategory('early_childhood')}
              className={`py-1.5 px-1 rounded-xl transition-all cursor-pointer text-center text-[11px] font-black border ${
                activeCategory === 'early_childhood'
                  ? 'bg-white text-sky-950 border-sky-300 shadow-2xs ring-1 ring-sky-200'
                  : 'text-slate-600 border-transparent hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              🧸 ปฐมวัย
            </button>

            <button
              type="button"
              id="tab-tools-cbe-primary"
              onClick={() => setActiveCategory('cbe_primary')}
              className={`py-1.5 px-1 rounded-xl transition-all cursor-pointer text-center text-[11px] font-black border ${
                activeCategory === 'cbe_primary'
                  ? 'bg-white text-indigo-950 border-indigo-300 shadow-2xs ring-1 ring-indigo-200'
                  : 'text-slate-600 border-transparent hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              🎓 สมรรถนะ
            </button>

            <button
              type="button"
              id="tab-tools-thai-phonics"
              onClick={() => setActiveCategory('thai_phonics')}
              className={`py-1.5 px-1 rounded-xl transition-all cursor-pointer text-center text-[11px] font-black border ${
                activeCategory === 'thai_phonics'
                  ? 'bg-white text-emerald-950 border-emerald-300 shadow-2xs ring-1 ring-emerald-200'
                  : 'text-slate-600 border-transparent hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              📖 สะกดคำ
            </button>

            <button
              type="button"
              id="tab-tools-classroom"
              onClick={() => setActiveCategory('classroom')}
              className={`py-1.5 px-1 rounded-xl transition-all cursor-pointer text-center text-[11px] font-black border ${
                activeCategory === 'classroom'
                  ? 'bg-white text-emerald-950 border-emerald-300 shadow-2xs ring-1 ring-emerald-200'
                  : 'text-slate-600 border-transparent hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              🏫 ห้องเรียน
            </button>

            <button
              type="button"
              id="tab-tools-parent"
              onClick={() => setActiveCategory('parent')}
              className={`py-1.5 px-1 rounded-xl transition-all cursor-pointer text-center text-[11px] font-black border ${
                activeCategory === 'parent'
                  ? 'bg-white text-slate-900 border-slate-300 shadow-2xs ring-1 ring-slate-200'
                  : 'text-slate-600 border-transparent hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              🛡️ ระบบ
            </button>

            <button
              type="button"
              id="tab-tools-all"
              onClick={() => setActiveCategory('all')}
              className={`py-1.5 px-1 rounded-xl transition-all cursor-pointer text-center text-[11px] font-black border ${
                activeCategory === 'all'
                  ? 'bg-white text-amber-950 border-amber-300 shadow-2xs ring-1 ring-amber-200'
                  : 'text-slate-600 border-transparent hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              🌟 ทั้งหมด
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* โซนที่ 1: เครื่องมือหลักสูตรปฐมวัย (อ.1 - อ.3)              */}
      {/* ======================================================== */}
      {(activeCategory === 'all' || activeCategory === 'early_childhood') && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-black text-sky-950 px-1 pt-1">
            <span className="flex items-center gap-1.5">
              <span>🧸</span>
              <span>เครื่องมือหลักสูตรปฐมวัย (อ.1 - อ.3)</span>
            </span>
            <span className="text-[10px] bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full font-bold border border-sky-200">
              8 ทักษะพัฒนาการ & 4 ด้าน สพฐ.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* 1. รายงานพัฒนาการ 4 ด้าน & 8 ทักษะ สพฐ. (A4 PDF) */}
            <button
              type="button"
              id="btn-panel-early-official-report"
              onClick={onOpenOfficialReport || onOpenClassReport}
              className="p-3 rounded-2xl bg-sky-50/80 hover:bg-sky-100/90 border border-sky-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs col-span-1 sm:col-span-2"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black text-sky-950 truncate flex items-center gap-1.5">
                  <span>รายงานพัฒนาการ 4 ด้าน & 8 ทักษะ</span>
                  <span className="text-[9px] bg-sky-200 text-sky-900 px-1.5 py-0.2 rounded-full font-black">
                    สมุดรายงาน สพฐ. A4 📄
                  </span>
                </div>
                <div className="text-[10px] text-sky-800/90 line-clamp-1 mt-0.5">
                  สรุปผลประเมิน กาย อารมณ์ สังคม สติปัญญา และ 8 ทักษะหลัก พร้อมพิมพ์ใบรายงาน
                </div>
              </div>
            </button>

            {/* 2. ★ ศูนย์เกมการศึกษาปฐมวัย (Featured Flagship Banner with Gradient Border & Gentle Pulsing Glow) ★ */}
            {onOpenSkillGames && (
              <div className="col-span-1 sm:col-span-2 relative group rounded-2xl">
                {/* Gentle Pulsing Ambient Glow Backdrop */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-400 via-indigo-500 to-purple-500 opacity-60 group-hover:opacity-90 animate-gentle-glow transition-opacity pointer-events-none"
                />

                {/* Outer Distinctive Gradient Border (2px multi-stop gradient) */}
                <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-amber-400 via-indigo-500 to-purple-600 shadow-md group-hover:shadow-lg transition-all">
                  <button
                    type="button"
                    id="btn-panel-skill-games"
                    onClick={onOpenSkillGames}
                    className="w-full rounded-[14px] p-3 sm:p-3.5 bg-gradient-to-r from-white via-indigo-50/60 to-amber-50/50 hover:from-white hover:via-indigo-50/90 hover:to-amber-50/80 text-left transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Vibrant Indigo & Gold Gamepad Badge */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-400" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-indigo-950 transition-colors">
                            ศูนย์เกมการศึกษา & ฝึกทักษะ
                          </span>
                          <span className="text-[10px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-0.5 shrink-0">
                            <Sparkles className="w-2.5 h-2.5 fill-amber-950" />
                            <span>แนะนำ</span>
                          </span>
                          <span className="text-[10px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-200 px-1.5 py-0.5 rounded-full shrink-0">
                            24 เกม 🎮
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium truncate mt-0.5">
                          เกมพัฒนาการ 4 ด้าน: จับคู่ภาพ มิติสัมพันธ์ ลำดับ และทักษะสมอง EF (กล้อง/สัมผัส)
                        </p>
                      </div>
                    </div>

                    {/* Direct Action Button */}
                    <div className="shrink-0 flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-700 group-hover:to-purple-700 text-white font-black text-xs px-3 py-1.5 rounded-xl shadow-xs group-hover:shadow transition-all group-hover:translate-x-0.5">
                      <span>เข้าเล่น</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* 3. สรุปผล 8 ทักษะ (Radar Chart D3) */}
            {onOpenSkillRadarReport && (
              <button
                type="button"
                id="btn-panel-radar-skills"
                onClick={onOpenSkillRadarReport}
                className="p-3 rounded-2xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200/90 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Target className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-purple-950 truncate flex items-center gap-1">
                    <span>เรดาร์ 8 ทักษะ (Radar)</span>
                    <span className="text-[9px] bg-purple-200 text-purple-900 px-1 py-0.2 rounded-full font-bold">D3 🕸️</span>
                  </div>
                  <div className="text-[10px] text-purple-700/80 line-clamp-1 mt-0.5">
                    กราฟใยแมงมุมวิเคราะห์จุดเด่น & ข้อเสนอแนะ
                  </div>
                </div>
              </button>
            )}

            {/* 4. กราฟแนวโน้มพัฒนาการรายสัปดาห์ */}
            {onOpenWeeklyTrends && (
              <button
                type="button"
                id="btn-panel-weekly-trends"
                onClick={onOpenWeeklyTrends}
                className="p-3 rounded-2xl bg-teal-50/60 hover:bg-teal-100/70 border border-teal-200/90 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-teal-950 truncate flex items-center gap-1">
                    <span>แนวโน้มรายสัปดาห์</span>
                    <span className="text-[9px] bg-teal-200 text-teal-900 px-1 py-0.2 rounded-full font-bold">กราฟ 📈</span>
                  </div>
                  <div className="text-[10px] text-teal-700/80 line-clamp-1 mt-0.5">
                    กราฟเส้นติดตามการเจริญเติบโตต่อเนื่อง
                  </div>
                </div>
              </button>
            )}

            {/* 5. รายงานผลรวมชั้นเรียน */}
            <button
              type="button"
              id="btn-panel-classroom-report"
              onClick={onOpenClassReport}
              className="p-3 rounded-2xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200/90 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs col-span-1 sm:col-span-2"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black text-blue-950 truncate flex items-center gap-1.5">
                  <span>สถิติรวมห้องเรียน</span>
                  <span className="text-[9px] bg-blue-200 text-blue-900 px-1.5 py-0.2 rounded-full font-bold">รวม 📊</span>
                </div>
                <div className="text-[10px] text-blue-700/80 line-clamp-1 mt-0.5">
                  สรุปผลประเมินเฉลี่ยทุกโปรไฟล์เด็กในห้องเรียน
                </div>
              </div>
            </button>

            {/* 6. นิทานก่อนเล่น AI (8 ทักษะหลัก) */}
            {onOpenPreGameStory && (
              <button
                type="button"
                id="btn-panel-pre-game-story"
                onClick={onOpenPreGameStory}
                className="p-3 rounded-2xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-rose-950 truncate flex items-center gap-1.5">
                    <span>นิทานก่อนเล่น AI (8 ทักษะ)</span>
                    <span className="text-[9px] bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded-full font-black">
                      เสียงพากย์อัตโนมัติ 🔊
                    </span>
                  </div>
                  <div className="text-[10px] text-rose-700/80 line-clamp-1 mt-0.5">
                    นิทานสั้นสร้างแรงบันดาลใจ ดึงดูดความสนใจก่อนเริ่มเรียน
                  </div>
                </div>
              </button>
            )}

            {/* 7. กิจกรรมลากเส้นตามรอย Hand Tracking */}
            {onOpenHandTracing && (
              <button
                type="button"
                id="btn-panel-hand-tracing"
                onClick={onOpenHandTracing}
                className="p-3 rounded-2xl bg-cyan-50/70 hover:bg-cyan-100/80 border border-cyan-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Hand className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-cyan-950 truncate flex items-center gap-1.5">
                    <span>กิจกรรมลากเส้นตามรอย Hand Tracking</span>
                    <span className="text-[9px] bg-cyan-200 text-cyan-900 px-1.5 py-0.2 rounded-full font-black">
                      รูปทรง & ตัวอักษร 🖐️
                    </span>
                  </div>
                  <div className="text-[10px] text-cyan-700/80 line-clamp-1 mt-0.5">
                    ใช้กล้องจับมือลากเส้นรูปทรงเรขาคณิตและตัวอักษร ฝึกกล้ามเนื้อมือ
                  </div>
                </div>
              </button>
            )}

            {/* 8. การเขียนคัดลายมือไทย (ก-ฮ) */}
            {onOpenThaiHandwriting && (
              <button
                type="button"
                id="btn-panel-thai-handwriting"
                onClick={onOpenThaiHandwriting}
                className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-2 border-amber-300 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-sm col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  ✍️
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-amber-950 truncate flex items-center gap-1.5">
                    <span>การเขียนคัดลายมือไทย (Hand Tracking)</span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full font-black">
                      ก ถึง ฮ 44 ตัว 🇹🇭
                    </span>
                  </div>
                  <div className="text-[10px] text-amber-800/90 line-clamp-1 mt-0.5">
                    ฝึกเขียนพยัญชนะไทยบนหน้าจอด้วยกล้อง มีเส้นประนำทาง & ตรวจคะแนนความแม่นยำ
                  </div>
                </div>
              </button>
            )}

            {/* 9. การเขียนตัวอักษรภาษาอังกฤษ (A-Z) */}
            {onOpenEnglishHandwriting && (
              <button
                type="button"
                id="btn-panel-english-handwriting"
                onClick={onOpenEnglishHandwriting}
                className="p-3 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 border-2 border-sky-300 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-sm col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  🔤
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-sky-950 truncate flex items-center gap-1.5">
                    <span>การเขียนตัวอักษรภาษาอังกฤษ (Hand Tracking)</span>
                    <span className="text-[9px] bg-sky-200 text-sky-900 px-1.5 py-0.2 rounded-full font-black">
                      A ถึง Z 26 ตัว 🔠
                    </span>
                  </div>
                  <div className="text-[10px] text-sky-800/90 line-clamp-1 mt-0.5">
                    ฝึกเขียนตัวพิมพ์ใหญ่และตัวพิมพ์เล็ก A-Z ด้วยกล้องจับมือ พร้อมเสียงอ่าน Phonics
                  </div>
                </div>
              </button>
            )}

            {/* 10. เขียนกลางอากาศ Air-Writing ปฐมวัย */}
            {onOpenAirWriting && (
              <button
                type="button"
                id="btn-panel-early-air-writing"
                onClick={onOpenAirWriting}
                className="p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-purple-950 truncate flex items-center gap-1.5">
                    <span>เขียนกลางอากาศ Air-Writing ปฐมวัย</span>
                    <span className="text-[9px] bg-purple-200 text-purple-900 px-1.5 py-0.2 rounded-full font-black">
                      3D Motion ✨
                    </span>
                  </div>
                  <div className="text-[10px] text-purple-700/80 line-clamp-1 mt-0.5">
                    วาดเขียนอิสระกลางอากาศ เสริมสร้างจินตนาการและการประสานสายตามือ
                  </div>
                </div>
              </button>
            )}

            {/* 11. ตัวต่อคำศัพท์ & บัตรภาพปฐมวัย */}
            {onOpenWordBuilder && (
              <button
                type="button"
                id="btn-panel-early-word-builder"
                onClick={onOpenWordBuilder}
                className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Puzzle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-amber-950 truncate flex items-center gap-1">
                    <span>ตัวต่อคำศัพท์ & บัตรภาพ</span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1 py-0.2 rounded-full font-bold">บัตรคำ 🧩</span>
                  </div>
                  <div className="text-[10px] text-amber-700/80 line-clamp-1 mt-0.5">
                    เกมเรียงอักษรและจับคู่ภาพคำศัพท์พื้นฐาน
                  </div>
                </div>
              </button>
            )}

            {/* 12. แบบคัดกรอง & วินิจฉัยพัฒนาการ (สพฐ.) */}
            {onOpenDiagnostic && (
              <button
                type="button"
                id="btn-panel-early-diagnostic"
                onClick={onOpenDiagnostic}
                className="p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-emerald-950 truncate flex items-center gap-1">
                    <span>คัดกรองพัฒนาการ</span>
                    <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1 py-0.2 rounded-full font-bold">เกณฑ์ สพฐ. 🩺</span>
                  </div>
                  <div className="text-[10px] text-emerald-700/80 line-clamp-1 mt-0.5">
                    แบบสำรวจความพร้อมตามช่วงวัย อ.1 - อ.3
                  </div>
                </div>
              </button>
            )}

            {/* 13. สะพานเชื่อมบ้านและโรงเรียน */}
            {onOpenHomeSchool && (
              <button
                type="button"
                id="btn-panel-early-home-school"
                onClick={onOpenHomeSchool}
                className="p-3 rounded-2xl bg-orange-50/70 hover:bg-orange-100/80 border border-orange-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Home className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-orange-950 truncate flex items-center gap-1">
                    <span>สะพานบ้าน-โรงเรียน</span>
                    <span className="text-[9px] bg-orange-200 text-orange-900 px-1 py-0.2 rounded-full font-bold">บ้าน 🏠</span>
                  </div>
                  <div className="text-[10px] text-orange-700/80 line-clamp-1 mt-0.5">
                    สมุดบันทึกพัฒนาการและภารกิจครอบครัว
                  </div>
                </div>
              </button>
            )}

            {/* 14. แฟ้มสะสมงานองค์รวมปฐมวัย */}
            {onOpenHolisticReport && (
              <button
                type="button"
                id="btn-panel-early-holistic"
                onClick={onOpenHolisticReport}
                className="p-3 rounded-2xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-blue-950 truncate flex items-center gap-1">
                    <span>แฟ้มผลงานองค์รวม</span>
                    <span className="text-[9px] bg-blue-200 text-blue-900 px-1 py-0.2 rounded-full font-bold">พอร์ต 📁</span>
                  </div>
                  <div className="text-[10px] text-blue-700/80 line-clamp-1 mt-0.5">
                    จัดเก็บผลงานภาพวาดและบันทึกพฤติกรรม
                  </div>
                </div>
              </button>
            )}

            {/* 15. ระบบสร้างใบงานระบายสี & ลากเส้น (A4 PDF) */}
            {onOpenWorksheets && (
              <button
                type="button"
                id="btn-panel-early-worksheets"
                onClick={onOpenWorksheets}
                className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Printer className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-amber-950 truncate flex items-center gap-1">
                    <span>ใบงานระบายสี & ลากเส้น</span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1 py-0.2 rounded-full font-bold">A4 🖨️</span>
                  </div>
                  <div className="text-[10px] text-amber-700/80 line-clamp-1 mt-0.5">
                    พิมพ์ใบงานระบายสีและเกมจับคู่สำหรับเด็ก
                  </div>
                </div>
              </button>
            )}

            {/* 16. ร้านค้าตัวการ์ตูน & อวตารรางวัล */}
            {onOpenAvatarShop && (
              <button
                type="button"
                id="btn-panel-early-avatar-shop"
                onClick={onOpenAvatarShop}
                className="p-3 rounded-2xl bg-pink-50/70 hover:bg-pink-100/80 border border-pink-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-pink-950 truncate flex items-center gap-1">
                    <span>ร้านค้าตัวการ์ตูน</span>
                    <span className="text-[9px] bg-pink-200 text-pink-900 px-1 py-0.2 rounded-full font-bold">อวตาร 🛍️</span>
                  </div>
                  <div className="text-[10px] text-pink-700/80 line-clamp-1 mt-0.5">
                    นำดาวและเหรียญมาแต่งตัวอวตารตัวโปรด
                  </div>
                </div>
              </button>
            )}

            {/* 17. ผจญภัยสำรวจธรรมชาติ Outdoor Learning Adventure */}
            {onOpenOutdoorAdventure && (
              <button
                type="button"
                id="btn-panel-outdoor-adventure"
                onClick={onOpenOutdoorAdventure}
                className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-2 border-emerald-300 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-sm col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  🌿
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-emerald-950 truncate flex items-center gap-1.5">
                    <span>Outdoor Learning Adventure</span>
                    <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded-full font-black">
                      สำรวจธรรมชาติ 📸🎙️
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-700/80 line-clamp-1 mt-0.5">
                    สังเกตสิ่งแวดล้อมรอบตัว พร้อมบันทึกภาพถ่ายและเสียง
                  </div>
                </div>
              </button>
            )}

            {/* 18. เหรียญความสำเร็จ */}
            <button
              type="button"
              id="btn-panel-badges"
              onClick={onOpenBadges}
              className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-amber-950 truncate flex items-center gap-1">
                  <span>เหรียญความสำเร็จ</span>
                  <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full font-black">
                    {badgeCount} 🏅
                  </span>
                </div>
                <div className="text-[10px] text-amber-700/80 line-clamp-1 mt-0.5">
                  แผนที่ผจญภัย & เหรียญตรา
                </div>
              </div>
            </button>

            {/* 19. กระดานผู้นำยอดเยี่ยม */}
            {onOpenTopPerformers && (
              <button
                type="button"
                id="btn-panel-early-top-performers"
                onClick={onOpenTopPerformers}
                className="p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Crown className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-emerald-950 truncate flex items-center gap-1">
                    <span>กระดานชื่นชมยอดเยี่ยม</span>
                    <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1 py-0.2 rounded-full font-bold">ดาว ⭐</span>
                  </div>
                  <div className="text-[10px] text-emerald-700/80 line-clamp-1 mt-0.5">
                    ห้องเรียน (เสริมแรงบวกนิรนาม)
                  </div>
                </div>
              </button>
            )}

            {/* 20. เรื่องน่ารู้ชวนคิดสำหรับเด็กปฐมวัย */}
            {onOpenFunFacts && (
              <button
                type="button"
                id="btn-panel-early-fun-facts"
                onClick={onOpenFunFacts}
                className="p-3 rounded-2xl bg-sky-50/70 hover:bg-sky-100/80 border border-sky-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-sky-950 truncate flex items-center gap-1.5">
                    <span>เรื่องน่ารู้ชวนคิด (Brain Spark ปฐมวัย)</span>
                    <span className="text-[9px] bg-sky-200 text-sky-900 px-1.5 py-0.2 rounded-full font-black">
                      เกร็ดสนุก 💡
                    </span>
                  </div>
                  <div className="text-[10px] text-sky-700/80 line-clamp-1 mt-0.5">
                    คำถามปลายเปิดและเกร็ดวิทยาศาสตร์รอบตัวสำหรับเด็กปฐมวัย
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* โซนที่ 2: เครื่องมือหลักสูตรสมรรถนะ (ป.1 - ป.3)              */}
      {/* ======================================================== */}
      {(activeCategory === 'all' || activeCategory === 'cbe_primary') && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-black text-indigo-950 px-1 pt-1">
            <span className="flex items-center gap-1.5">
              <span>🎓</span>
              <span>เครื่องมือหลักสูตรสถานศึกษาฐานสมรรถนะ (ป.1 - ป.6)</span>
            </span>
            <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full font-bold border border-indigo-200">
              6 สมรรถนะหลัก CBE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* 1. รายงานสมรรถนะ (6 สมรรถนะหลัก ป.1 - ป.3) */}
            {onOpenCompetencyReport && (
              <button
                type="button"
                id="btn-panel-competency-report"
                onClick={onOpenCompetencyReport}
                className="p-3 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200/90 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-indigo-950 truncate flex items-center gap-1">
                    <span>รายงานสมรรถนะ 6 ด้าน</span>
                    <span className="text-[10px] bg-indigo-200 text-indigo-900 px-1.5 py-0.2 rounded-full font-black">
                      เกณฑ์ สพฐ. A4 PDF 📄
                    </span>
                  </div>
                  <div className="text-[10px] text-indigo-700/80 line-clamp-1 mt-0.5">
                    ประเมิน 6 สมรรถนะหลัก 4 ระดับคุณภาพ พิมพ์ใบรายงานและใบประกาศนียบัตร
                  </div>
                </div>
              </button>
            )}

            {/* 2. AI สร้างชุดข้อสอบ (CBE) */}
            {onOpenAIQuestionSuggester && (
              <button
                type="button"
                id="btn-panel-ai-suggester"
                onClick={onOpenAIQuestionSuggester}
                className="p-3 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 hover:from-purple-100 hover:to-indigo-100 border-2 border-indigo-300 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-xs col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-indigo-950 flex items-center gap-1.5 truncate">
                    <span>AI สร้างชุดข้อสอบอัจฉริยะ</span>
                    <span className="text-[9px] bg-amber-400 text-indigo-950 px-1.5 py-0.2 rounded-full font-black">
                      Gemini AI ✨
                    </span>
                  </div>
                  <div className="text-[10px] text-indigo-700/80 line-clamp-1 mt-0.5">
                    สร้างแบบทดสอบตามตัวชี้วัด 6 สมรรถนะ CBE ตรงตามระดับชั้น ป.1, ป.2, ป.3
                  </div>
                </div>
              </button>
            )}

            {/* 3. กิจกรรมเสริมสมรรถนะ 6 ด้าน (Interactive 5 นาที) */}
            {onOpenCompetencyActivities && (
              <button
                type="button"
                id="btn-panel-competency-activities"
                onClick={onOpenCompetencyActivities}
                className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 hover:from-indigo-500/20 hover:to-pink-500/20 border-2 border-indigo-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-xs col-span-1 sm:col-span-2 relative overflow-hidden"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-lg shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  🎯
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-black text-indigo-950 truncate flex items-center gap-1.5 flex-wrap">
                    <span>กิจกรรมเสริมสมรรถนะ (เน้นลงมือปฏิบัติ)</span>
                    <span className="text-[9px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-black animate-pulse">
                      Interactive 5 นาที ✨
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-indigo-800/80 line-clamp-1 mt-0.5 font-medium">
                    6 สมรรถนะหลัก ป.1-ป.6 • ชุดคำแนะนำขั้นตอนละ 5 นาที สำหรับครูและเด็ก พร้อมตัวจับเวลา
                  </div>
                </div>
              </button>
            )}

            {/* 4. เรดาร์ประเมิน 6 สมรรถนะ D3.js */}
            {onOpenSkillRadarReport && (
              <button
                type="button"
                id="btn-panel-cbe-radar"
                onClick={onOpenSkillRadarReport}
                className="p-3 rounded-2xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-blue-950 truncate flex items-center gap-1">
                    <span>เรดาร์สมรรถนะ 6 ด้าน</span>
                    <span className="text-[9px] bg-blue-200 text-blue-900 px-1.5 py-0.2 rounded-full font-black">
                      Radar D3
                    </span>
                  </div>
                  <div className="text-[10px] text-blue-700/80 line-clamp-1 mt-0.5">
                    กราฟใยแมงมุมวิเคราะห์จุดเด่น 6 มิติ เทียบเกณฑ์ สพฐ.
                  </div>
                </div>
              </button>
            )}

            {/* 5. แนวโน้มพัฒนาการ 6 สมรรถนะรายสัปดาห์ */}
            {onOpenWeeklyTrends && (
              <button
                type="button"
                id="btn-panel-cbe-weekly-trends"
                onClick={onOpenWeeklyTrends}
                className="p-3 rounded-2xl bg-teal-50/70 hover:bg-teal-100/80 border border-teal-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-teal-950 truncate flex items-center gap-1">
                    <span>แนวโน้มการเติบโตสมรรถนะ</span>
                    <span className="text-[9px] bg-teal-200 text-teal-900 px-1.5 py-0.2 rounded-full font-black">
                      สัปดาห์ 📈
                    </span>
                  </div>
                  <div className="text-[10px] text-teal-700/80 line-clamp-1 mt-0.5">
                    วิเคราะห์ความก้าวหน้าการจัดการตนเองและการคิดขั้นสูง
                  </div>
                </div>
              </button>
            )}

            {/* 6. ระบบสร้างใบงาน & แบบประเมินตนเอง A4 PDF */}
            {onOpenWorksheets && (
              <button
                type="button"
                id="btn-panel-cbe-worksheets"
                onClick={onOpenWorksheets}
                className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Printer className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-amber-950 truncate flex items-center gap-1">
                    <span>ใบงาน & ประเมินตนเอง</span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full font-black">
                      A4 PDF 🖨️
                    </span>
                  </div>
                  <div className="text-[10px] text-amber-700/80 line-clamp-1 mt-0.5">
                    พิมพ์ใบภารกิจชีวิตจริง พร้อมแบบสะท้อนคิดตนเอง
                  </div>
                </div>
              </button>
            )}

            {/* 7. คลังชุดข้อสอบสมรรถนะ CBE (1,440+ ข้อ) */}
            {onOpenExamSets && (
              <button
                type="button"
                id="btn-panel-cbe-exam-sets"
                onClick={onOpenExamSets}
                className="p-3 rounded-2xl bg-violet-50/70 hover:bg-violet-100/80 border border-violet-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-violet-950 truncate flex items-center gap-1">
                    <span>คลังข้อสอบสมรรถนะ CBE</span>
                    <span className="text-[9px] bg-violet-200 text-violet-900 px-1.5 py-0.2 rounded-full font-black">
                      1,440+ ข้อ
                    </span>
                  </div>
                  <div className="text-[10px] text-violet-700/80 line-clamp-1 mt-0.5">
                    ข้อสอบสถานการณ์ปัญหา ครบ ป.1-ป.3 ปรับความยากอัตโนมัติ
                  </div>
                </div>
              </button>
            )}

            {/* 8. ภารกิจการเรียนรู้กลางแจ้ง & สิ่งแวดล้อมเพื่อความยั่งยืน */}
            {onOpenOutdoorAdventure && (
              <button
                type="button"
                id="btn-panel-cbe-outdoor"
                onClick={onOpenOutdoorAdventure}
                className="p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <TreePine className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-emerald-950 truncate flex items-center gap-1">
                    <span>ภารกิจเรียนรู้กลางแจ้ง</span>
                    <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded-full font-black">
                      ธรรมชาติ 🌿
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-700/80 line-clamp-1 mt-0.5">
                    สมรรถนะการอยู่ร่วมกับธรรมชาติและการแก้ปัญหาในโลกจริง
                  </div>
                </div>
              </button>
            )}

            {/* 9. ห้องเรียนถ่ายทอดสด & ประลองสมรรถนะเป็นทีม */}
            {onOpenClassroomRoom && (
              <button
                type="button"
                id="btn-panel-cbe-classroom-room"
                onClick={onOpenClassroomRoom}
                className="p-3 rounded-2xl bg-sky-50/70 hover:bg-sky-100/80 border border-sky-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-sky-950 truncate flex items-center gap-1">
                    <span>ห้องเรียนถ่ายทอดสด & ทีม</span>
                    <span className="text-[9px] bg-sky-200 text-sky-900 px-1.5 py-0.2 rounded-full font-black">
                      Live Battle 📡
                    </span>
                  </div>
                  <div className="text-[10px] text-sky-700/80 line-clamp-1 mt-0.5">
                    สมรรถนะการทำงานเป็นทีม แข่งขันตอบคำถามหน้าห้องสด
                  </div>
                </div>
              </button>
            )}

            {/* 10. เวทีเสวนาและแลกเปลี่ยนเรียนรู้ในห้องเรียน */}
            {onOpenClassroomDiscussion && (
              <button
                type="button"
                id="btn-panel-cbe-discussion"
                onClick={onOpenClassroomDiscussion}
                className="p-3 rounded-2xl bg-cyan-50/70 hover:bg-cyan-100/80 border border-cyan-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-cyan-950 truncate flex items-center gap-1">
                    <span>เวทีเสวนาในชั้นเรียน</span>
                    <span className="text-[9px] bg-cyan-200 text-cyan-900 px-1.5 py-0.2 rounded-full font-black">
                      การสื่อสาร 💬
                    </span>
                  </div>
                  <div className="text-[10px] text-cyan-700/80 line-clamp-1 mt-0.5">
                    สะท้อนคิด ถกแถลงเหตุผล และพัฒนาสมรรถนะการสื่อสาร
                  </div>
                </div>
              </button>
            )}

            {/* 11. สะพานเชื่อมบ้านและโรงเรียน (Home-School Mission) */}
            {onOpenHomeSchool && (
              <button
                type="button"
                id="btn-panel-cbe-home-school"
                onClick={onOpenHomeSchool}
                className="p-3 rounded-2xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Home className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-rose-950 truncate flex items-center gap-1">
                    <span>สะพานเชื่อมบ้าน-โรงเรียน</span>
                    <span className="text-[9px] bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded-full font-black">
                      ภารกิจบ้าน 🏠
                    </span>
                  </div>
                  <div className="text-[10px] text-rose-700/80 line-clamp-1 mt-0.5">
                    บันทึกภารกิจช่วยงานบ้านและการจัดการตนเองร่วมกับครอบครัว
                  </div>
                </div>
              </button>
            )}

            {/* 12. แฟ้มสะสมงานผู้เรียนองค์รวม (Holistic Competency Portfolio) */}
            {onOpenHolisticReport && (
              <button
                type="button"
                id="btn-panel-cbe-holistic-report"
                onClick={onOpenHolisticReport}
                className="p-3 rounded-2xl bg-teal-50/70 hover:bg-teal-100/80 border border-teal-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Award className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-teal-950 truncate flex items-center gap-1">
                    <span>แฟ้มสะสมงานองค์รวม</span>
                    <span className="text-[9px] bg-teal-200 text-teal-900 px-1.5 py-0.2 rounded-full font-black">
                      พอร์ตโฟลิโอ 🌟
                    </span>
                  </div>
                  <div className="text-[10px] text-teal-800/90 line-clamp-1 mt-0.5">
                    รายงานพัฒนาการเชื่อมโยง 3 เสาหลักสู่สมรรถนะขั้นสูง
                  </div>
                </div>
              </button>
            )}

            {/* 13. นิทานเสียงพากย์ AI นำเข้าสู่สถานการณ์ปัญหา */}
            {onOpenPreGameStory && (
              <button
                type="button"
                id="btn-panel-cbe-problem-story"
                onClick={onOpenPreGameStory}
                className="p-3 rounded-2xl bg-orange-50/70 hover:bg-orange-100/80 border border-orange-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-orange-950 truncate flex items-center gap-1">
                    <span>นิทานเปิดสถานการณ์ปัญหา</span>
                    <span className="text-[9px] bg-orange-200 text-orange-900 px-1.5 py-0.2 rounded-full font-black">
                      AI Story 🎙️
                    </span>
                  </div>
                  <div className="text-[10px] text-orange-700/80 line-clamp-1 mt-0.5">
                    เสียงพากย์เปิดประเด็น นำเข้าสู่การคิดแก้ปัญหาขั้นสูง
                  </div>
                </div>
              </button>
            )}

            {/* 14. กระดานผู้นำยอดเยี่ยม */}
            {onOpenTopPerformers && (
              <button
                type="button"
                id="btn-panel-top-performers"
                onClick={onOpenTopPerformers}
                className="p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Crown className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-emerald-950 truncate">
                    กระดานผู้นำยอดเยี่ยม
                  </div>
                  <div className="text-[10px] text-emerald-700/80 line-clamp-1 mt-0.5">
                    ห้องเรียน (แบบนิรนาม)
                  </div>
                </div>
              </button>
            )}

            {/* 15. เรื่องน่ารู้ชวนคิด */}
            {onOpenFunFacts && (
              <button
                type="button"
                id="btn-panel-fun-facts"
                onClick={onOpenFunFacts}
                className="p-3 rounded-2xl bg-sky-50/70 hover:bg-sky-100/80 border border-sky-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-sky-950 truncate">
                    เรื่องน่ารู้ชวนคิด
                  </div>
                  <div className="text-[10px] text-sky-700/80 line-clamp-1 mt-0.5">
                    เกร็ดความรู้แสนสนุก
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* โซนที่ ๓: เครื่องมือหลักสูตรแจกลูกสะกดคำ สพฐ. (ป.1 - ป.6) */}
      {/* ======================================================== */}
      {(activeCategory === 'all' || activeCategory === 'thai_phonics') && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-black text-emerald-950 px-1 pt-1">
            <span className="flex items-center gap-1.5">
              <span>📖</span>
              <span>เครื่องมือหลักสูตรแจกลูกสะกดคำ สพฐ. (ป.1 - ป.6)</span>
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
              ๑๐ หน่วยการเรียนรู้ สพฐ.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* 1. คัดลายมือแจกลูกสะกดคำ Hand Tracking / Air-Writing */}
            {(onOpenAirWriting || onOpenThaiHandwriting) && (
              <button
                type="button"
                id="btn-panel-phonics-airwriting"
                onClick={onOpenAirWriting || onOpenThaiHandwriting}
                className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  ✍️
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-amber-950 truncate flex items-center gap-1.5">
                    <span>คัดลายมือแจกลูก & Air-Writing (Hand Tracking)</span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full font-black">
                      สระ ๑๖ + พยัญชนะ ๔๔ + คำ 🖐️
                    </span>
                  </div>
                  <div className="text-[10px] text-amber-800/90 line-clamp-1 mt-0.5">
                    ฝึกเขียนรูปสระ พยัญชนะ ๓ หมู่ และสะกดคำกลางอากาศด้วยกล้องตรวจจับมือ
                  </div>
                </div>
              </button>
            )}

            {/* 2. AI สร้างข้อสอบแจกลูกสะกดคำอัจฉริยะ (Gemini AI) */}
            {onOpenAIQuestionSuggester && (
              <button
                type="button"
                id="btn-panel-phonics-ai-generator"
                onClick={onOpenAIQuestionSuggester}
                className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 hover:from-emerald-100 hover:to-cyan-100 border-2 border-emerald-300 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-sm col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-emerald-950 truncate flex items-center gap-1.5">
                    <span>AI ออกแบบข้อสอบแจกลูกสะกดคำอัจฉริยะ</span>
                    <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded-full font-black">
                      Gemini AI ✨
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-800/90 line-clamp-1 mt-0.5">
                    สร้างแบบทดสอบตาม ๑๐ หน่วยการเรียนรู้ สระเดี่ยว สระประสม มาตราตัวสะกด และคำควบกล้ำ
                  </div>
                </div>
              </button>
            )}

            {/* 3. มินิเกมโครงสร้างคำ EF & ส่วนที่หายไป (Word Builder) */}
            {onOpenWordBuilder && (
              <button
                type="button"
                id="btn-panel-phonics-word-builder"
                onClick={onOpenWordBuilder}
                className="p-3 rounded-2xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  🧩
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-purple-950 truncate flex items-center gap-1.5">
                    <span>มินิเกมฝึกสมอง EF: โครงสร้างคำ & ส่วนที่หายไป</span>
                    <span className="text-[9px] bg-purple-200 text-purple-900 px-1.5 py-0.2 rounded-full font-black">
                      3 มินิเกม 🌟
                    </span>
                  </div>
                  <div className="text-[10px] text-purple-800/90 line-clamp-1 mt-0.5">
                    จัดเรียงบล็อกพยัญชนะ สระ วรรณยุกต์ ตัวสะกด และจับคู่คำกับภาพ
                  </div>
                </div>
              </button>
            )}

            {/* 4. ฝึกออกเสียงสะกดคำผ่านไมค์ (Voice Phonics Check) */}
            {onOpenVoicePhonics && (
              <button
                type="button"
                id="btn-panel-voice-phonics"
                onClick={onOpenVoicePhonics}
                className="p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  🎙️
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-emerald-950 truncate flex items-center gap-1.5">
                    <span>ฝึกออกเสียงสะกดคำผ่านไมค์</span>
                    <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1 py-0.2 rounded-full font-bold">
                      AI Voice 🌟
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-800/90 line-clamp-1 mt-0.5">
                    ตรวจจับการเปล่งเสียงอ่านแจกลูกสะกดคำทีละพยางค์แบบเรียลไทม์
                  </div>
                </div>
              </button>
            )}

            {/* 5. รหัสสีแยกโครงสร้างคำ (Multi-Color Phonics UDL) */}
            {onOpenColorPhonics && (
              <button
                type="button"
                id="btn-panel-color-phonics"
                onClick={onOpenColorPhonics}
                className="p-3 rounded-2xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  🎨
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-blue-950 truncate flex items-center gap-1.5">
                    <span>รหัสสีแยกโครงสร้างคำ (UDL)</span>
                    <span className="text-[9px] bg-blue-200 text-blue-900 px-1 py-0.2 rounded-full font-bold">
                      สีนำทาง ✨
                    </span>
                  </div>
                  <div className="text-[10px] text-blue-800/90 line-clamp-1 mt-0.5">
                    ช่วยจำโครงสร้างคำเร็วขึ้น 2 เท่า ลดความสับสนสำหรับเด็กเริ่มเรียน
                  </div>
                </div>
              </button>
            )}

            {/* 6. เรดาร์ทักษะภาษาไทย ๕ มิติ (D3.js Radar Chart) */}
            {onOpenSkillRadarReport && (
              <button
                type="button"
                id="btn-panel-phonics-radar-report"
                onClick={onOpenSkillRadarReport}
                className="p-3 rounded-2xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Target className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-purple-950 truncate flex items-center gap-1">
                    <span>เรดาร์ทักษะภาษาไทย ๕ มิติ</span>
                    <span className="text-[9px] bg-purple-200 text-purple-900 px-1 py-0.2 rounded-full font-bold">
                      D3 🕸️
                    </span>
                  </div>
                  <div className="text-[10px] text-purple-700/80 line-clamp-1 mt-0.5">
                    วิเคราะห์สมดุลการแจกลูก ตัวสะกด วรรณยุกต์ และการอ่าน
                  </div>
                </div>
              </button>
            )}

            {/* 7. แนวโน้มการเติบโตรายสัปดาห์ (Weekly Trends) */}
            {onOpenWeeklyTrends && (
              <button
                type="button"
                id="btn-panel-phonics-weekly-trends"
                onClick={onOpenWeeklyTrends}
                className="p-3 rounded-2xl bg-teal-50/70 hover:bg-teal-100/80 border border-teal-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-teal-950 truncate flex items-center gap-1">
                    <span>แนวโน้มความก้าวหน้ารายสัปดาห์</span>
                    <span className="text-[9px] bg-teal-200 text-teal-900 px-1 py-0.2 rounded-full font-bold">
                      กราฟ 📈
                    </span>
                  </div>
                  <div className="text-[10px] text-teal-700/80 line-clamp-1 mt-0.5">
                    ติดตามการลดลงของจุดสะดุดและความเร็วในการสะกดคำ
                  </div>
                </div>
              </button>
            )}

            {/* 8. วินิจฉัยจุดอ่อนและแผนซ่อมเสริม (Diagnostic & Remedial) */}
            {onOpenDiagnostic && (
              <button
                type="button"
                id="btn-panel-diagnostic-remedial"
                onClick={onOpenDiagnostic}
                className="p-3 rounded-2xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  🎯
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-rose-950 truncate flex items-center gap-1.5">
                    <span>วินิจฉัยจุดอ่อน & ซ่อมเสริม</span>
                    <span className="text-[9px] bg-rose-200 text-rose-900 px-1 py-0.2 rounded-full font-bold">
                      สพฐ. 📝
                    </span>
                  </div>
                  <div className="text-[10px] text-rose-800/90 line-clamp-1 mt-0.5">
                    ค้นหาจุดสะดุดรายบุคคล พร้อมแบบฝึกซ่อมเสริม 1 คลิก
                  </div>
                </div>
              </button>
            )}

            {/* 9. คลังข้อสอบและชุดแบบฝึกแจกลูกสะกดคำ (3,600+ ข้อ) */}
            {onOpenExamSets && (
              <button
                type="button"
                id="btn-panel-phonics-exam-sets"
                onClick={onOpenExamSets}
                className="p-3 rounded-2xl bg-teal-50/70 hover:bg-teal-100/80 border border-teal-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-teal-950 truncate flex items-center gap-1.5">
                    <span>คลังข้อสอบแจกลูกสะกดคำ</span>
                    <span className="text-[9px] bg-teal-200 text-teal-900 px-1.5 py-0.2 rounded-full font-black">
                      3,600+ ข้อ 📚
                    </span>
                  </div>
                  <div className="text-[10px] text-teal-800/80 line-clamp-1 mt-0.5">
                    จัดชุดทดสอบอัตโนมัติตาม ๑๐ หน่วยการเรียนรู้ ป.1 - ป.6
                  </div>
                </div>
              </button>
            )}

            {/* 10. ระบบจัดการคลังคำศัพท์ & ข้อสอบ (Question Manager) */}
            {onOpenQuestionManager && (
              <button
                type="button"
                id="btn-panel-phonics-question-manager"
                onClick={onOpenQuestionManager}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <FileQuestion className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-slate-900 truncate flex items-center gap-1">
                    <span>จัดการคลังคำศัพท์ & ข้อสอบ</span>
                    <span className="text-[9px] bg-slate-200 text-slate-800 px-1 py-0.2 rounded-full font-bold">
                      คลัง ⚙️
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-600 line-clamp-1 mt-0.5">
                    ตรวจสอบ เพิ่มเติม หรือแก้ไขคำศัพท์ใน ๑๐ หน่วยการเรียนรู้
                  </div>
                </div>
              </button>
            )}

            {/* 11. พิมพ์ใบงานแจกลูกสะกดคำ ๑๐ หน่วย A4/PDF */}
            <button
              type="button"
              id="btn-panel-phonics-worksheets"
              onClick={onOpenWorksheets}
              className="p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Printer className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black text-emerald-950 truncate flex items-center gap-1">
                  <span>พิมพ์ใบงาน สพฐ. ๑๐ หน่วย</span>
                  <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1 py-0.2 rounded-full font-bold">
                    A4 PDF 📄
                  </span>
                </div>
                <div className="text-[10px] text-emerald-700/80 line-clamp-1 mt-0.5">
                  สุ่มข้อสอบแจกลูก A4 พร้อมเฉลย (ป.1 - ป.6)
                </div>
              </div>
            </button>

            {/* 12. แบบรายงานทางการ สพฐ. / ปพ.๕ / วPA */}
            {onOpenOfficialReport && (
              <button
                type="button"
                id="btn-panel-official-report"
                onClick={onOpenOfficialReport}
                className="p-3 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-700 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  📄
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-indigo-950 truncate flex items-center gap-1.5">
                    <span>แบบรายงานทางการ สพฐ. (ปพ.๕)</span>
                    <span className="text-[9px] bg-indigo-200 text-indigo-900 px-1 py-0.2 rounded-full font-bold">
                      วPA 🏆
                    </span>
                  </div>
                  <div className="text-[10px] text-indigo-800/90 line-clamp-1 mt-0.5">
                    รายงานประเมิน 3 มิติทางการ พร้อมช่องลงนามครูและผู้บริหาร
                  </div>
                </div>
              </button>
            )}

            {/* 13. แฟ้มสะสมงานผู้เรียนองค์รวม K1 - P6 */}
            {onOpenHolisticReport && (
              <button
                type="button"
                id="btn-panel-holistic-report"
                onClick={onOpenHolisticReport}
                className="p-3 rounded-2xl bg-teal-50/70 hover:bg-teal-100/80 border border-teal-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  🌟
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-teal-950 truncate flex items-center gap-1.5">
                    <span>แฟ้มสะสมงานองค์รวม (Portfolio)</span>
                    <span className="text-[9px] bg-teal-200 text-teal-900 px-1 py-0.2 rounded-full font-bold">
                      อ.๑ - ป.๖ 📁
                    </span>
                  </div>
                  <div className="text-[10px] text-teal-800/90 line-clamp-1 mt-0.5">
                    รายงานพัฒนาการต่อเนื่อง ปฐมวัย, CBE และแจกลูกสะกดคำ
                  </div>
                </div>
              </button>
            )}

            {/* 14. แข่งขันสะกดคำสดในห้องเรียน (Classroom Spelling Battle) */}
            {onOpenClassroomRoom && (
              <button
                type="button"
                id="btn-panel-phonics-classroom"
                onClick={onOpenClassroomRoom}
                className="p-3 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <School className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-indigo-950 truncate flex items-center gap-1">
                    <span>ประลองสะกดคำสดทั้งห้อง</span>
                    <span className="text-[9px] bg-indigo-200 text-indigo-900 px-1 py-0.2 rounded-full font-bold">
                      Live ⚔️
                    </span>
                  </div>
                  <div className="text-[10px] text-indigo-700/80 line-clamp-1 mt-0.5">
                    Live Classroom แข่งขันสะกดคำ Real-time หน้าชั้นเรียน
                  </div>
                </div>
              </button>
            )}

            {/* 15. เวทีเสวนา & ต่อยอดคำศัพท์ในชั้นเรียน */}
            {onOpenClassroomDiscussion && (
              <button
                type="button"
                id="btn-panel-phonics-discussion"
                onClick={onOpenClassroomDiscussion}
                className="p-3 rounded-2xl bg-cyan-50/70 hover:bg-cyan-100/80 border border-cyan-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-cyan-950 truncate flex items-center gap-1">
                    <span>เวทีสนทนา & ต่อยอดคำศัพท์</span>
                    <span className="text-[9px] bg-cyan-200 text-cyan-900 px-1 py-0.2 rounded-full font-bold">
                      สื่อสาร 💬
                    </span>
                  </div>
                  <div className="text-[10px] text-cyan-700/80 line-clamp-1 mt-0.5">
                    กิจกรรมแต่งประโยค ถกแถลงความหมาย และต่อคำสัมผัสคล้องจอง
                  </div>
                </div>
              </button>
            )}

            {/* 16. เชื่อมโยงการบ้านสู่ผู้ปกครอง (Home-School QR) */}
            {onOpenHomeSchool && (
              <button
                type="button"
                id="btn-panel-home-school-qr"
                onClick={onOpenHomeSchool}
                className="p-3 rounded-2xl bg-teal-50/70 hover:bg-teal-100/80 border border-teal-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  📱
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-teal-950 truncate flex items-center gap-1.5">
                    <span>เชื่อมโยงการบ้านสู่ผู้ปกครอง</span>
                    <span className="text-[9px] bg-teal-200 text-teal-900 px-1 py-0.2 rounded-full font-bold">
                      QR 💬
                    </span>
                  </div>
                  <div className="text-[10px] text-teal-800/90 line-clamp-1 mt-0.5">
                    QR Code สแกนดูสรุปรายวัน พร้อมเทคนิคชวนฝึกสะกดคำที่บ้าน
                  </div>
                </div>
              </button>
            )}

            {/* 17. นิทานเสียงพากย์ AI นำเข้าสู่บทเรียนแจกลูกสะกดคำ */}
            {onOpenPreGameStory && (
              <button
                type="button"
                id="btn-panel-phonics-pre-story"
                onClick={onOpenPreGameStory}
                className="p-3 rounded-2xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-rose-950 truncate flex items-center gap-1">
                    <span>นิทานนำเข้าสู่บทเรียน</span>
                    <span className="text-[9px] bg-rose-200 text-rose-900 px-1 py-0.2 rounded-full font-bold">
                      เสียงพากย์ 🎙️
                    </span>
                  </div>
                  <div className="text-[10px] text-rose-700/80 line-clamp-1 mt-0.5">
                    ฟังนิทานสนุกที่มีคำศัพท์เป้าหมายประจำหน่วยการเรียนรู้
                  </div>
                </div>
              </button>
            )}

            {/* 18. ร้านค้าดาว & ปากกา Air-Writing นีออน (Reward Studio) */}
            {onOpenAvatarShop && (
              <button
                type="button"
                id="btn-panel-avatar-shop"
                onClick={onOpenAvatarShop}
                className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-base shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  🌟
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-amber-950 truncate flex items-center gap-1.5">
                    <span>ร้านค้าดาว & ปากกานีออน</span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1 py-0.2 rounded-full font-bold">
                      รางวัล ⭐
                    </span>
                  </div>
                  <div className="text-[10px] text-amber-800/90 line-clamp-1 mt-0.5">
                    ปลดล็อกหมึกสายรุ้ง ละอองดาวทอง และแต่งตัวมาสคอตประจำตัว
                  </div>
                </div>
              </button>
            )}

            {/* 19. ทำเนียบยอดนักสะกดคำ (Spelling Champions) */}
            {onOpenTopPerformers && (
              <button
                type="button"
                id="btn-panel-phonics-top-performers"
                onClick={onOpenTopPerformers}
                className="p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Crown className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-emerald-950 truncate flex items-center gap-1">
                    <span>ทำเนียบยอดนักสะกดคำ</span>
                    <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1 py-0.2 rounded-full font-bold">
                      แชมป์ 🏆
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-700/80 line-clamp-1 mt-0.5">
                    กระดานชื่นชมความพยายามและความแม่นยำ (แบบนิรนาม)
                  </div>
                </div>
              </button>
            )}

            {/* 20. เกร็ดภาษาน่ารู้ & ปริศนาคำทาย (Thai Word Riddles) */}
            {onOpenFunFacts && (
              <button
                type="button"
                id="btn-panel-phonics-fun-facts"
                onClick={onOpenFunFacts}
                className="p-3 rounded-2xl bg-sky-50/70 hover:bg-sky-100/80 border border-sky-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-sky-950 truncate flex items-center gap-1.5">
                    <span>เกร็ดภาษาน่ารู้ & ปริศนาคำทาย (Thai Riddles)</span>
                    <span className="text-[9px] bg-sky-200 text-sky-900 px-1.5 py-0.2 rounded-full font-black">
                      ปริศนาคำ 💡
                    </span>
                  </div>
                  <div className="text-[10px] text-sky-700/80 line-clamp-1 mt-0.5">
                    เกร็ดความรู้ภาษาไทย คำพ้องรูป พ้องเสียง คำโบราณ และปริศนาคำทายเสริมคลังคำ
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* โซนที่ 4: ห้องเรียน & คลังข้อสอบ (ใช้ร่วมกันได้ทุกระดับชั้น)  */}
      {/* ======================================================== */}
      {(activeCategory === 'all' || activeCategory === 'classroom') && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-black text-slate-800 px-1 pt-1">
            <span className="flex items-center gap-1.5">
              <span>🏫</span>
              <span>เครื่องมือห้องเรียน & คลังข้อสอบ (อ.1 - ป.3)</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold">ส่วนกลาง</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* 0. Classroom Discussion: เวทีเสวนาครู & ผู้ปกครอง */}
            {onOpenClassroomDiscussion && (
              <button
                type="button"
                id="btn-panel-classroom-discussion"
                onClick={onOpenClassroomDiscussion}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-sky-50/80 to-teal-50/90 hover:from-indigo-100 hover:to-teal-100 border-2 border-indigo-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-xs col-span-1 sm:col-span-2"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-teal-600 text-white flex items-center justify-center text-lg shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  💬
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-black text-indigo-950 truncate flex items-center gap-1.5 flex-wrap">
                    <span>Classroom Discussion: เวทีเสวนาครู & ผู้ปกครอง</span>
                    <span className="text-[9px] bg-gradient-to-r from-indigo-600 to-teal-600 text-white px-2 py-0.5 rounded-full font-black animate-pulse">
                      แลกเปลี่ยนเทคนิค & สมรรถนะ ✨
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-indigo-800/80 line-clamp-1 mt-0.5 font-medium">
                    พื้นที่แลกเปลี่ยนเทคนิคการสอน ไอเดียกิจกรรม และแนวทางพัฒนาสมรรถนะผู้เรียน
                  </div>
                </div>
              </button>
            )}

            {/* 1. ห้องเรียนจำลองสด */}
            {onOpenClassroomRoom && (
              <button
                type="button"
                id="btn-panel-classroom-room"
                onClick={onOpenClassroomRoom}
                className="p-3 rounded-2xl bg-indigo-50/60 hover:bg-indigo-100/70 border border-indigo-200/90 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <School className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-indigo-950 truncate flex items-center gap-1">
                    <span>ห้องเรียนจำลองสด</span>
                    {activeClassroomRoom && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    )}
                  </div>
                  <div className="text-[10px] text-indigo-700/80 line-clamp-1 mt-0.5">
                    Real-time Room & ติดตามสถานะเด็ก
                  </div>
                </div>
              </button>
            )}

            {/* 2. พิมพ์ใบงาน PDF */}
            <button
              type="button"
              id="btn-panel-worksheets"
              onClick={onOpenWorksheets}
              className="p-3 rounded-2xl bg-orange-50/60 hover:bg-orange-100/70 border border-orange-200/90 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Printer className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-orange-950 truncate">
                  ใบงานพิมพ์ PDF
                </div>
                <div className="text-[10px] text-orange-700/80 line-clamp-1 mt-0.5">
                  ขนาด A4 พร้อมเฉลย (อ.1 - ป.3)
                </div>
              </div>
            </button>

            {/* 3. ชุดข้อสอบคุณครู */}
            {onOpenExamSets && (
              <button
                type="button"
                id="btn-panel-exam-sets"
                onClick={onOpenExamSets}
                className="p-3 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/90 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-amber-950 truncate">
                    ชุดข้อสอบครู
                  </div>
                  <div className="text-[10px] text-amber-700/80 line-clamp-1 mt-0.5">
                    จัดชุดสอบ & แบบฝึกหัด
                  </div>
                </div>
              </button>
            )}

            {/* 4. คลังข้อสอบไฮบริด */}
            {onOpenQuestionManager && (
              <button
                type="button"
                id="btn-panel-question-manager"
                onClick={onOpenQuestionManager}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <FileQuestion className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-slate-900 truncate">
                    คลังข้อสอบไฮบริด
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    จัดการ & ซิงค์คลาวด์
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* โซนที่ 4: ผู้ปกครอง, ความปลอดภัย & การตั้งค่า                   */}
      {/* ======================================================== */}
      {(activeCategory === 'all' || activeCategory === 'parent') && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-black text-slate-800 px-1 pt-1">
            <span className="flex items-center gap-1.5">
              <span>🛡️</span>
              <span>การตั้งค่าผู้ปกครอง & ระบบความปลอดภัย</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* ตั้งค่าผู้ปกครอง */}
            <button
              type="button"
              id="btn-panel-settings"
              onClick={onOpenSettings}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Settings className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-slate-900 truncate">
                  ตั้งค่าผู้ปกครอง
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  เสียง, ระดับความเร็ว & กล้อง
                </div>
              </div>
            </button>

            {/* ซิงค์คลาวด์ Firebase */}
            {onSyncProfiles && (
              <button
                type="button"
                id="btn-panel-cloud-sync"
                onClick={onSyncProfiles}
                disabled={isSyncingCloud}
                className="p-3 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100/70 border border-emerald-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs disabled:opacity-50"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Cloud className={`w-4 h-4 ${isSyncingCloud ? 'animate-bounce' : ''}`} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-emerald-950 truncate flex items-center gap-1">
                    <span>ซิงค์คลาวด์</span>
                    {isSyncingCloud && (
                      <RefreshCw className="w-3 h-3 animate-spin text-emerald-700" />
                    )}
                  </div>
                  <div className="text-[10px] text-emerald-700/80 line-clamp-1 mt-0.5">
                    สำรองข้อมูลกับ Firestore
                  </div>
                </div>
              </button>
            )}

            {/* ข้อเสนอแนะ */}
            {onOpenFeedback && (
              <button
                type="button"
                id="btn-panel-feedback"
                onClick={onOpenFeedback}
                className="p-3 rounded-2xl bg-teal-50/60 hover:bg-teal-100/70 border border-teal-200 text-left transition-all cursor-pointer group flex items-start gap-2.5 shadow-2xs col-span-1 sm:col-span-2"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-teal-950 truncate">
                    ข้อเสนอแนะถึงผู้พัฒนา
                  </div>
                  <div className="text-[10px] text-teal-700/80 line-clamp-1 mt-0.5">
                    รายงานปัญหาการใช้งาน หรือแนะนำฟังก์ชันเพิ่มเติม
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
