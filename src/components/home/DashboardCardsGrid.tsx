import React, { useState } from 'react';
import {
  Play,
  Award,
  Crown,
  BarChart3,
  Printer,
  Sparkles,
  Gamepad2,
  BookOpen,
  FileText,
  Pencil,
  Compass,
  Puzzle,
  TrendingUp,
  School,
  FileCheck,
  Star,
  Users,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ChildProfile, Grade, Subject, ExamSet, CurriculumMode, VoicePersona, PRIMARY_GRADES } from '../../types';
import { soundEffects } from '../../services/audioService';
import { getCurriculumTheme } from '../../utils/curriculumTheme';
import { RecommendationResult } from '../../services/recommendationService';
import { MiniChallengeWidget } from './MiniChallengeWidget';
import { LearningConfigSection } from './LearningConfigSection';
import { SmartAssistantSection } from './SmartAssistantSection';
import { ClassroomRoom } from '../../services/classroomRoomService';

export interface DashboardCardsGridProps {
  // Learner & State
  activeProfile: ChildProfile;
  currentGrade: Grade;
  onGradeChange: (grade: Grade) => void;
  curriculumMode: CurriculumMode;
  onSelectCurriculumMode?: (mode: CurriculumMode, rememberChoice: boolean) => void;
  onOpenCurriculumSwitch?: () => void;
  selectedSubjects: Subject[];
  onSkillChange: (subjects: Subject[]) => void;
  questionsPerSkill: number;
  onCountChange: (count: number) => void;
  activeExamSet?: ExamSet | null;
  onOpenExamSets?: () => void;
  onClearActiveExamSet?: () => void;
  onStart: () => void;
  onOpenProfiles: () => void;
  soundVolume: number;
  effectiveMode: 'touch' | 'hand';
  voicePersona?: VoicePersona;
  onProfileUpdated?: (updated: ChildProfile) => void;

  // AI Recommendation
  recommendation: RecommendationResult | null;
  isLoadingRec: boolean;
  recFeedback: string | null;
  onSelectBothRecommended: () => void;
  isBothRecommendedSelected: boolean;
  onRefreshRecommendations: () => void;

  // Section 2: Skill Games & Activities
  onOpenSkillGames?: () => void;
  onOpenThaiHandwriting?: () => void;
  onOpenEnglishHandwriting?: () => void;
  onOpenAirWriting?: () => void;
  onOpenWordBuilder?: () => void;
  onOpenPreGameStory: () => void;
  onOpenOutdoorAdventure: () => void;
  onOpenCompetencyActivities?: () => void;
  onOpenActivitiesModal: () => void;
  onOpenHandTracing?: () => void;
  onStartWeeklyChallenge?: (skill: Subject) => void;

  // Section 3: Reports & Certificates
  onOpenClassReport: () => void;
  onOpenSkillRadarReport?: () => void;
  onOpenWeeklyTrends?: () => void;
  onOpenBadges: () => void;
  onOpenTopPerformers?: () => void;
  onOpenWorksheets: () => void;
  onOpenQuestionManager?: () => void;
  onOpenOfficialReport?: () => void;
  onOpenHolisticReport?: () => void;
  onOpenCompetencyReport?: () => void;
  onOpenDiagnostic?: () => void;
  badgeCount: number;

  // Classroom
  onOpenClassroomRoom?: () => void;
  activeClassroomRoom?: ClassroomRoom | null;
}

export const DashboardCardsGrid: React.FC<DashboardCardsGridProps> = ({
  activeProfile,
  currentGrade,
  onGradeChange,
  curriculumMode,
  onSelectCurriculumMode,
  onOpenCurriculumSwitch,
  selectedSubjects,
  onSkillChange,
  questionsPerSkill,
  onCountChange,
  activeExamSet,
  onOpenExamSets,
  onClearActiveExamSet,
  onStart,
  onOpenProfiles,
  soundVolume,
  effectiveMode,
  voicePersona,
  onProfileUpdated,
  recommendation,
  isLoadingRec,
  recFeedback,
  onSelectBothRecommended,
  isBothRecommendedSelected,
  onRefreshRecommendations,
  onOpenSkillGames,
  onOpenThaiHandwriting,
  onOpenEnglishHandwriting,
  onOpenAirWriting,
  onOpenWordBuilder,
  onOpenPreGameStory,
  onOpenOutdoorAdventure,
  onOpenCompetencyActivities,
  onOpenActivitiesModal,
  onOpenHandTracing,
  onStartWeeklyChallenge,
  onOpenClassReport,
  onOpenSkillRadarReport,
  onOpenWeeklyTrends,
  onOpenBadges,
  onOpenTopPerformers,
  onOpenWorksheets,
  onOpenQuestionManager,
  onOpenOfficialReport,
  onOpenHolisticReport,
  onOpenCompetencyReport,
  onOpenDiagnostic,
  badgeCount,
  onOpenClassroomRoom,
  activeClassroomRoom,
}) => {
  const currTheme = getCurriculumTheme(curriculumMode);
  const [activeSectionFilter, setActiveSectionFilter] = useState<'all' | 'curriculum' | 'skill_games' | 'reports'>('all');
  const [showSkillDetailBox, setShowSkillDetailBox] = useState<boolean>(false);
  const [showAiAdvisor, setShowAiAdvisor] = useState<boolean>(false);

  const totalQuestions = selectedSubjects.length * questionsPerSkill;

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 🧭 Top Section Filter Bar: ให้ผู้ใช้เลือกดูเฉพาะส่วน หรือดูการ์ดทั้งหมดเพื่อลดความแออัด */}
      <div className="w-full flex items-center justify-between gap-2 flex-wrap pb-1 border-b border-slate-200/80">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/90 text-xs font-bold overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setActiveSectionFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSectionFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🌟</span>
            <span>แสดงการ์ดทั้งหมด (Cards Grid)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setActiveSectionFilter('curriculum');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSectionFilter === 'curriculum'
                ? 'bg-white text-blue-950 shadow-xs border border-blue-200 font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>📚</span>
            <span>๑. หลักสูตรปัจจุบัน</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setActiveSectionFilter('skill_games');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSectionFilter === 'skill_games'
                ? 'bg-white text-emerald-950 shadow-xs border border-emerald-200 font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🎮</span>
            <span>๒. เกมเสริมทักษะ</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setActiveSectionFilter('reports');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSectionFilter === 'reports'
                ? 'bg-white text-purple-950 shadow-xs border border-purple-200 font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>📊</span>
            <span>๓. รายงานและเกียรติบัตร</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>จัดระเบียบ 3 ส่วนชัดเจน ไร้ความแออัด</span>
        </div>
      </div>

      {/* =========================================================================
          หมวดที่ ๑: 📚 หลักสูตรปัจจุบันและการเรียนรู้ (Current Curriculum & Learning Zone)
         ========================================================================= */}
      {(activeSectionFilter === 'all' || activeSectionFilter === 'curriculum') && (
        <section aria-labelledby="section-curriculum-title" className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                1
              </div>
              <h2 id="section-curriculum-title" className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <span>หลักสูตรปัจจุบัน & โหมดเรียนรู้</span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {currTheme.shortName}
                </span>
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenCurriculumSwitch}
              className="text-xs font-bold text-slate-600 hover:text-blue-700 hover:bg-slate-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-slate-200"
            >
              สลับหลักสูตร ▾
            </button>
          </div>

          {/* Cards Grid: 3 cards row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
            {/* Card 1A: ข้อมูลผู้เรียน & ระดับชั้น (Learner Info & Grade Switcher) */}
            <div className="md:col-span-5 bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    ข้อมูลผู้เรียนปัจจุบัน
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      onOpenProfiles();
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                  >
                    สลับผู้เรียน 👥
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shadow-xs shrink-0">
                    {activeProfile.avatar || '⭐'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-black text-slate-900 truncate">{activeProfile.name}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span className="text-amber-700 font-bold">⭐ {activeProfile.totalScore || 0} คะแนน</span>
                      <span>·</span>
                      <span className="text-orange-700 font-bold">🔥 {activeProfile.streakDays || 0} วันต่อเนื่อง</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grade Selector */}
              <div className="pt-2.5 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center justify-between">
                  <span>เลือกระดับชั้นเรียน:</span>
                  <span className="text-blue-600 font-black">
                    {currentGrade.startsWith('K')
                      ? `อนุบาล ${currentGrade.slice(1)}`
                      : `ประถมศึกษาปีที่ ${currentGrade.slice(1)}`}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {curriculumMode === 'early_childhood' ? (
                    (['K1', 'K2', 'K3'] as Grade[]).map((grade) => (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => {
                          soundEffects.playTap(soundVolume);
                          onGradeChange(grade);
                        }}
                        className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer border text-center ${
                          currentGrade === grade
                            ? 'bg-blue-600 text-white border-blue-700 shadow-2xs ring-1 ring-blue-300'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {grade === 'K1' ? 'อนุบาล 1' : grade === 'K2' ? 'อนุบาล 2' : 'อนุบาล 3'}
                      </button>
                    ))
                  ) : (
                    PRIMARY_GRADES.map((grade) => (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => {
                          soundEffects.playTap(soundVolume);
                          onGradeChange(grade);
                        }}
                        className={`py-1.5 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border text-center ${
                          currentGrade === grade
                            ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs ring-1 ring-indigo-300'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {`ป.${grade.slice(1)}`}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Card 1B: ทักษะและข้อสอบที่เลือก (Skills & Content Setup) */}
            <div className="md:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    เนื้อหาและข้อสอบ
                  </span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    {selectedSubjects.length} ทักษะ ({totalQuestions} ข้อ)
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 mb-2">
                  <div className="text-xs font-black text-slate-800 flex items-center justify-between">
                    <span>จำนวนข้อต่อทักษะ:</span>
                    <span className="text-blue-700 font-bold">{questionsPerSkill} ข้อ</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    {[3, 5, 10].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => onCountChange(count)}
                        className={`flex-1 py-1 rounded-lg text-xs font-black transition-colors cursor-pointer border ${
                          questionsPerSkill === count
                            ? 'bg-blue-600 text-white border-blue-700'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {count} ข้อ
                      </button>
                    ))}
                  </div>
                </div>

                {activeExamSet && (
                  <div className="bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-center justify-between text-xs text-amber-900">
                    <span className="truncate">ชุดข้อสอบ: {activeExamSet.title}</span>
                    <button
                      type="button"
                      onClick={onClearActiveExamSet}
                      className="text-[10px] font-bold text-rose-600 hover:underline shrink-0 ml-1"
                    >
                      ยกเลิก
                    </button>
                  </div>
                )}
              </div>

              {/* Skill Modal & Exam Sets Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSkillDetailBox((v) => !v)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>{showSkillDetailBox ? 'ซ่อนทักษะ ▴' : 'เลือกทักษะ ▾'}</span>
                </button>
                {onOpenExamSets && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      onOpenExamSets();
                    }}
                    className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  >
                    ชุดข้อสอบ 📋
                  </button>
                )}
              </div>
            </div>

            {/* Card 1C: เริ่มต้นเล่นทันที (Big Action Launchpad) */}
            <div className="md:col-span-3 bg-gradient-to-b from-blue-50/80 via-indigo-50/50 to-white rounded-2xl p-4 border-2 border-blue-300 shadow-xs flex flex-col justify-between gap-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-900 block mb-1">
                  พร้อมเริ่มเรียนรู้
                </span>
                <p className="text-xs text-slate-600 leading-snug">
                  ทำแบบฝึกหัด {totalQuestions} ข้อ รับคะแนนสะสมและปลดล็อกเหรียญตรา
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  id="btn-cards-grid-start"
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    onStart();
                  }}
                  className={`w-full ${currTheme.primaryButton} font-black py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-98 text-sm sm:text-base text-white`}
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>เริ่มเล่นเกมทันที!</span>
                </button>

                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      onOpenPreGameStory();
                    }}
                    className="py-1.5 px-2 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 shadow-2xs truncate text-center cursor-pointer"
                    title="นิทานสร้างแรงบันดาลใจก่อนเริ่มทำแบบฝึกหัด"
                  >
                    📖 นิทานก่อนเล่น
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      onOpenOutdoorAdventure();
                    }}
                    className="py-1.5 px-2 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 shadow-2xs truncate text-center cursor-pointer"
                    title="สำรวจสิ่งแวดล้อมรอบตัว"
                  >
                    🌿 สำรวจธรรมชาติ
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Skill Detail Selector if user opened */}
          {showSkillDetailBox && (
            <div className="w-full bg-white rounded-2xl p-4 border border-slate-200 shadow-sm animate-in fade-in duration-150">
              <LearningConfigSection
                currentGrade={currentGrade}
                onGradeChange={onGradeChange}
                selectedSubjects={selectedSubjects}
                onSkillChange={onSkillChange}
                questionsPerSkill={questionsPerSkill}
                onCountChange={onCountChange}
                activeExamSet={activeExamSet}
                onOpenExamSets={onOpenExamSets}
                onClearActiveExamSet={onClearActiveExamSet}
                recommendation={recommendation}
                showAllSkillDetails={true}
                onToggleSkillDetails={() => setShowSkillDetailBox(false)}
                soundVolume={soundVolume}
                onOpenCompetencyActivities={onOpenCompetencyActivities}
                onOpenActivitiesModal={onOpenActivitiesModal}
                onOpenWorksheets={onOpenWorksheets}
                onOpenThaiHandwriting={onOpenThaiHandwriting}
                onOpenClassroomRoom={onOpenClassroomRoom}
                onOpenAirWriting={onOpenAirWriting}
                onOpenWordBuilder={onOpenWordBuilder}
                onOpenHolisticReport={onOpenHolisticReport}
                curriculumMode={curriculumMode}
              />
            </div>
          )}

          {/* AI Advisor Pill / Bar */}
          <div className="w-full bg-slate-50 hover:bg-slate-100/80 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-base">💡</span>
              <span className="font-bold text-slate-700 truncate">
                AI คำแนะนำอัจฉริยะ: {recommendation?.recommendations?.[0]?.shortName ? `ควรเน้น "${recommendation.recommendations[0].shortName}"` : 'วิเคราะห์ผลเพื่อความก้าวหน้า'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAiAdvisor((v) => !v)}
              className="text-blue-700 font-bold hover:underline shrink-0 cursor-pointer"
            >
              {showAiAdvisor ? 'ซ่อนคำแนะนำ ▴' : 'เปิดดู AI Insights ▾'}
            </button>
          </div>

          {showAiAdvisor && (
            <div className="w-full bg-white p-3 rounded-2xl border border-blue-200 shadow-2xs">
              <SmartAssistantSection
                activeProfile={activeProfile}
                selectedSubjects={selectedSubjects}
                onSelectSubject={(subj) => onSkillChange([subj])}
                onStartMissionDirectly={() => onStart()}
                soundVolume={soundVolume}
                recommendation={recommendation}
                isLoadingRec={isLoadingRec}
                recFeedback={recFeedback}
                onSelectBothRecommended={onSelectBothRecommended}
                isBothRecommendedSelected={isBothRecommendedSelected}
                onRefreshRecommendations={onRefreshRecommendations}
                curriculumMode={curriculumMode}
              />
            </div>
          )}
        </section>
      )}

      {/* =========================================================================
          หมวดที่ ๒: 🎮 เกมเสริมทักษะและกิจกรรมพัฒนาการ (Skill Games & Enrichment Activities)
         ========================================================================= */}
      {(activeSectionFilter === 'all' || activeSectionFilter === 'skill_games') && (
        <section aria-labelledby="section-skill-games-title" className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                2
              </div>
              <h2 id="section-skill-games-title" className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <span>เกมเสริมทักษะ & กิจกรรมสร้างสรรค์</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  เรียนสนุกผ่านการลงมือทำ
                </span>
              </h2>
            </div>
            {onOpenSkillGames && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  onOpenSkillGames();
                }}
                className="text-xs font-black text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-300 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span>เข้าสู่คลังเกมทั้งหมด</span>
                <span>→</span>
              </button>
            )}
          </div>

          {/* Cards Grid: 4 Interactive Enrichment Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {/* Card 2A: คลังเกมเสริมทักษะ (Skill Games Arcade) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  🎮
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">เกมเสริมทักษะแสนสนุก</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    จับผิดภาพ & ค้นหาสิ่งของ, จิ๊กซอว์ภาพ, ตะลุยเก็บผลไม้, พลอยวิเศษ, ผึ้งหาน้ำหวาน
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  if (onOpenSkillGames) onOpenSkillGames();
                }}
                className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>เล่นเกมเสริมทักษะ 🎯</span>
              </button>
            </div>

            {/* Card 2B: คัดลายมือ & Air Writing */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  ✍️
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">คัดลายมือ & Air Writing</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    ฝึกเขียนพยัญชนะไทยและสากล ด้วยการลากเส้นสัมผัสหรือตรวจจับมือผ่านกล้อง
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    if (onOpenThaiHandwriting) onOpenThaiHandwriting();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  คัดลายมือ ✏️
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    if (onOpenAirWriting) onOpenAirWriting();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  Air Writing 🖐️
                </button>
              </div>
            </div>

            {/* Card 2C: มินิชาเลนจ์ & ภารกิจสะสมดาว */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  🎯
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">มินิชาเลนจ์ & ภารกิจ</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    ภารกิจด่วนแบบสุ่ม ท้าทายให้ทำท่าทางสนุกๆ เพื่อรับคะแนนพิเศษสะสม
                  </p>
                </div>
              </div>

              {/* Integrated Mini-Challenge Widget */}
              <div className="w-full">
                <MiniChallengeWidget
                  activeProfile={activeProfile}
                  soundVolume={soundVolume}
                  voicePersona={voicePersona}
                  onProfileUpdated={onProfileUpdated}
                />
              </div>
            </div>

            {/* Card 2D: สำรวจธรรมชาติ & กิจกรรมหลักสูตร */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  🌿
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">สำรวจธรรมชาติ & ทักษะ</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    ภารกิจสำรวจโลกภายนอก บันทึกภาพ-เสียง และกิจกรรมพัฒนาการตามหลักสูตร
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    onOpenOutdoorAdventure();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  สำรวจธรรมชาติ 📸
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    if (curriculumMode === 'cbe_primary' && onOpenCompetencyActivities) {
                      onOpenCompetencyActivities();
                    } else {
                      onOpenActivitiesModal();
                    }
                  }}
                  className="py-2 px-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  กิจกรรมทักษะ 🧩
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          หมวดที่ ๓: 📊 รายงาน สถิติ และเกียรติบัตร (Reports, Analytics & Certificates)
         ========================================================================= */}
      {(activeSectionFilter === 'all' || activeSectionFilter === 'reports') && (
        <section aria-labelledby="section-reports-title" className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                3
              </div>
              <h2 id="section-reports-title" className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <span>รายงาน สถิติ & เกียรติบัตร</span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                  ติดตามผลสัมฤทธิ์
                </span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                onOpenClassReport();
              }}
              className="text-xs font-black text-purple-800 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-xl border border-purple-300 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <span>เปิดดูผลคะแนนสะสม</span>
              <span>→</span>
            </button>
          </div>

          {/* Cards Grid: 4 Professional Report & Certificate Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {/* Card 3A: รายงานพัฒนาการรายบุคคล (Individual Report & Radar) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  📈
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">พัฒนาการ & เรดาร์ทักษะ</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    กราฟเรดาร์วิเคราะห์ 8 ด้าน พัฒนาการย้อนหลัง และความแม่นยำรายวิชา
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    onOpenClassReport();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  รายงานผล 📊
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    if (onOpenSkillRadarReport) onOpenSkillRadarReport();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  กราฟเรดาร์ 🕸️
                </button>
              </div>
            </div>

            {/* Card 3B: เกียรติบัตรและการประเมินทางการ (Certificates & MOE Reports) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  📜
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">เกียรติบัตร & แบบประเมิน</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    ออกเกียรติบัตรรับรองความก้าวหน้า และรายงานประเมินตามเกณฑ์มาตรฐาน สพฐ.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    if (onOpenOfficialReport) onOpenOfficialReport();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  เกียรติบัตร 🎖️
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    if (onOpenHolisticReport) onOpenHolisticReport();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  รายงาน สพฐ. 📋
                </button>
              </div>
            </div>

            {/* Card 3C: หอเกียรติยศและเหรียญรางวัล (Badges & Hall of Fame) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-yellow-50 border border-yellow-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  🏆
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">เหรียญรางวัล & หอเกียรติยศ</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    ปลดล็อกแล้ว {badgeCount} เหรียญรางวัล และสถิติผู้เรียนดีเด่นประจำห้องเรียน
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    onOpenBadges();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-yellow-900 border border-yellow-200 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  เหรียญตรา 🏅
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    if (onOpenTopPerformers) onOpenTopPerformers();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  หอเกียรติยศ 👑
                </button>
              </div>
            </div>

            {/* Card 3D: พิมพ์ใบงาน & เครื่องมือผู้สอน (Worksheets & Tools) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  🖨️
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">พิมพ์ใบงาน & จัดการข้อสอบ</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    สร้างใบงานแบบฝึกหัดสำหรับแจกเด็ก และจัดการคลังข้อสอบของคุณครู
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    onOpenWorksheets();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  สร้างใบงาน 📄
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    if (onOpenQuestionManager) onOpenQuestionManager();
                  }}
                  className="py-2 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold text-xs transition-all cursor-pointer text-center truncate"
                >
                  จัดการข้อสอบ 📝
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
