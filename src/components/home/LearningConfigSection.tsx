import React from 'react';
import {
  Minus,
  Plus,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Compass,
  BookOpen,
  Printer,
} from 'lucide-react';
import { Grade, Subject, ExamSet, CurriculumMode, PRIMARY_GRADES } from '../../types';
import {
  SKILLS_LIST,
  CORE_5_SKILL_IDS,
  CBE_COMPETENCIES_LIST,
  CBE_COMPETENCY_IDS,
  THAI_PHONICS_UNITS_LIST,
  THAI_PHONICS_UNIT_IDS,
} from '../../data/skills';
import { RecommendationResult } from '../../services/recommendationService';

interface LearningConfigSectionProps {
  currentGrade: Grade;
  onGradeChange: (grade: Grade) => void;
  selectedSubjects: Subject[];
  onSkillChange: (subjects: Subject[]) => void;
  questionsPerSkill: number;
  onCountChange: (count: number) => void;
  activeExamSet?: ExamSet | null;
  onOpenExamSets?: () => void;
  onClearActiveExamSet?: () => void;
  recommendation?: RecommendationResult | null;
  showAllSkillDetails: boolean;
  onToggleSkillDetails: () => void;
  soundVolume: number;
  onOpenCompetencyActivities?: () => void;
  onOpenActivitiesModal?: () => void;
  onOpenWorksheets?: () => void;
  onOpenThaiHandwriting?: () => void;
  onOpenClassroomRoom?: () => void;
  onOpenAirWriting?: () => void;
  onOpenWordBuilder?: () => void;
  onOpenHolisticReport?: () => void;
  curriculumMode?: CurriculumMode;
}

export const LearningConfigSection: React.FC<LearningConfigSectionProps> = ({
  currentGrade,
  onGradeChange,
  selectedSubjects,
  onSkillChange,
  questionsPerSkill,
  onCountChange,
  activeExamSet,
  onOpenExamSets,
  onClearActiveExamSet,
  recommendation,
  showAllSkillDetails,
  onToggleSkillDetails,
  onOpenCompetencyActivities,
  onOpenActivitiesModal,
  onOpenWorksheets,
  onOpenThaiHandwriting,
  onOpenClassroomRoom,
  curriculumMode = 'early_childhood',
}) => {
  const isCbe = curriculumMode === 'cbe_primary';
  const isPhonics = curriculumMode === 'thai_phonics';
  const isEarly = !isCbe && !isPhonics;

  // -------------------------------------------------------------
  // Early Childhood Presets (8 Skills)
  // -------------------------------------------------------------
  const isCore5Selected =
    isEarly &&
    selectedSubjects.length === 5 &&
    CORE_5_SKILL_IDS.every((s) => selectedSubjects.includes(s));

  const isAll8Selected = isEarly && selectedSubjects.length === 8;

  const isTrioSelected =
    isEarly &&
    selectedSubjects.length === 3 &&
    (selectedSubjects.includes('thai') || selectedSubjects.includes('literacy')) &&
    selectedSubjects.includes('english') &&
    selectedSubjects.includes('math');

  const handleSelectCore5 = () => {
    onSkillChange([...CORE_5_SKILL_IDS]);
  };

  const handleSelectAllEarly = () => {
    onSkillChange(SKILLS_LIST.map((s) => s.id));
  };

  const handleSelectTrio = () => {
    onSkillChange(['thai', 'english', 'math']);
  };

  // -------------------------------------------------------------
  // CBE Primary Presets (6 Competencies)
  // -------------------------------------------------------------
  const isAll6CbeSelected =
    isCbe &&
    selectedSubjects.length === 6 &&
    CBE_COMPETENCY_IDS.every((s) => selectedSubjects.includes(s));

  const isCbeThinkingSelfSelected =
    isCbe &&
    selectedSubjects.length === 2 &&
    selectedSubjects.includes('self_management') &&
    selectedSubjects.includes('higher_order_thinking');

  const isCbeCommTeamSelected =
    isCbe &&
    selectedSubjects.length === 2 &&
    selectedSubjects.includes('communication') &&
    selectedSubjects.includes('teamwork_collaboration');

  const handleSelectAllCbe = () => {
    onSkillChange([...CBE_COMPETENCY_IDS]);
  };

  const handleSelectCbeThinkingSelf = () => {
    onSkillChange(['self_management', 'higher_order_thinking']);
  };

  const handleSelectCbeCommTeam = () => {
    onSkillChange(['communication', 'teamwork_collaboration']);
  };

  // -------------------------------------------------------------
  // Thai Phonics Presets (10 Units OBEC)
  // -------------------------------------------------------------
  const isAll10PhonicsSelected =
    isPhonics &&
    selectedSubjects.length === 10 &&
    THAI_PHONICS_UNIT_IDS.every((s) => selectedSubjects.includes(s));

  const isPhonicsBasicSelected =
    isPhonics &&
    selectedSubjects.length === 5 &&
    ['phonics_consonant', 'phonics_vowel', 'phonics_tone', 'phonics_korkaa', 'phonics_tone_korkaa'].every((s) =>
      selectedSubjects.includes(s as Subject)
    );

  const isPhonicsDirectSelected =
    isPhonics &&
    selectedSubjects.length === 3 &&
    ['phonics_direct_spelling', 'phonics_tone_spelling', 'phonics_indirect_spelling'].every((s) =>
      selectedSubjects.includes(s as Subject)
    );

  const isPhonicsAdvancedSelected =
    isPhonics &&
    selectedSubjects.length === 2 &&
    ['phonics_cluster', 'phonics_leading_consonant'].every((s) =>
      selectedSubjects.includes(s as Subject)
    );

  const handleSelectAllPhonics = () => {
    onSkillChange([...THAI_PHONICS_UNIT_IDS]);
  };

  const handleSelectPhonicsBasic = () => {
    onSkillChange(['phonics_consonant', 'phonics_vowel', 'phonics_tone', 'phonics_korkaa', 'phonics_tone_korkaa']);
  };

  const handleSelectPhonicsDirect = () => {
    onSkillChange(['phonics_direct_spelling', 'phonics_tone_spelling', 'phonics_indirect_spelling']);
  };

  const handleSelectPhonicsAdvanced = () => {
    onSkillChange(['phonics_cluster', 'phonics_leading_consonant']);
  };

  // -------------------------------------------------------------
  // Skill / Unit Toggle Handlers
  // -------------------------------------------------------------
  const handleSkillToggle = (subjectId: Subject) => {
    if (selectedSubjects.includes(subjectId)) {
      if (selectedSubjects.length === 1) return;
      onSkillChange(selectedSubjects.filter((s) => s !== subjectId));
    } else {
      onSkillChange([...selectedSubjects, subjectId]);
    }
  };

  const handleSkillSelectOnly = (subjectId: Subject) => {
    onSkillChange([subjectId]);
  };

  // Active items list based on selected curriculum mode
  const activeSkillsList = isPhonics
    ? THAI_PHONICS_UNITS_LIST
    : isCbe
    ? CBE_COMPETENCIES_LIST
    : SKILLS_LIST;

  const categoryLabel = isPhonics ? 'หน่วย' : isCbe ? 'สมรรถนะ' : 'ทักษะ';
  const categoryIcon = isPhonics ? '📖' : isCbe ? '🧠' : '🎯';

  return (
    <div className="w-full flex flex-col gap-3">
      {/* 1. Grade Level Selector */}
      <div
        className={`p-3 rounded-2xl border-2 transition-all ${
          isPhonics
            ? 'bg-gradient-to-r from-emerald-50/80 to-teal-50/60 border-emerald-200'
            : isCbe
            ? 'bg-gradient-to-r from-indigo-50/80 to-purple-50/60 border-indigo-200'
            : 'bg-gradient-to-r from-slate-50 to-blue-50/60 border-blue-100'
        }`}
      >
        <div className="flex items-center justify-between gap-1.5 mb-2.5">
          <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
            <span className="text-sm">🏛️</span>
            <span>หลักสูตรและระดับชั้นเรียน</span>
          </label>
        </div>

        {/* Grade buttons for Thai Phonics (ป.1 - ป.6) */}
        {isPhonics ? (
          <div>
            <div className="text-[10px] font-bold text-emerald-900 mb-1 flex items-center justify-between">
              <span>ระดับชั้นประถมศึกษา (หลักสูตรแจกลูกสะกดคำ สพฐ. ๑๐ หน่วย):</span>
              <span className="text-emerald-700 font-bold">ป.1 - ป.6 (สพฐ.)</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRIMARY_GRADES.map((grade) => {
                const isGradeActive = currentGrade === grade;
                const num = grade.slice(1);
                const ages: Record<string, string> = {
                  P1: '6 - 7 ปี',
                  P2: '7 - 8 ปี',
                  P3: '8 - 9 ปี',
                  P4: '9 - 10 ปี',
                  P5: '10 - 11 ปี',
                  P6: '11 - 12 ปี',
                };
                return (
                  <button
                    key={grade}
                    type="button"
                    id={`btn-select-grade-${grade}`}
                    onClick={() => onGradeChange(grade)}
                    className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isGradeActive
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50/60'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black">
                      {`ป.${num}`}
                    </div>
                    <div className={`text-[10px] ${isGradeActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {ages[grade]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : isCbe ? (
          /* Grade buttons for CBE Primary (ป.1 - ป.6) */
          <div>
            <div className="text-[10px] font-bold text-indigo-900 mb-1 flex items-center justify-between">
              <span>ระดับชั้นประถมศึกษา (หลักสูตรสถานศึกษาฐานสมรรถนะ 6 ด้าน):</span>
              <span className="text-indigo-600 font-bold">ป.1 - ป.6 (CBE Primary)</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRIMARY_GRADES.map((grade) => {
                const isGradeActive = currentGrade === grade;
                const num = grade.slice(1);
                const ages: Record<string, string> = {
                  P1: '6 - 7 ปี',
                  P2: '7 - 8 ปี',
                  P3: '8 - 9 ปี',
                  P4: '9 - 10 ปี',
                  P5: '10 - 11 ปี',
                  P6: '11 - 12 ปี',
                };
                return (
                  <button
                    key={grade}
                    type="button"
                    id={`btn-select-grade-${grade}`}
                    onClick={() => onGradeChange(grade)}
                    className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isGradeActive
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs ring-2 ring-indigo-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-50/60'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black">
                      {`ป.${num}`}
                    </div>
                    <div className={`text-[10px] ${isGradeActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {ages[grade]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Grade buttons for Early Childhood (อ.1 - อ.3) */
          <div>
            <div className="text-[10px] font-bold text-blue-800 mb-1 flex items-center justify-between">
              <span>ระดับชั้นอนุบาล (8 ทักษะพัฒนาการ):</span>
              <span className="text-slate-400">เน้นการเรียนรู้ผ่านการเล่นและปฏิสัมพันธ์</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['K1', 'K2', 'K3'] as Grade[]).map((grade) => {
                const isGradeActive = currentGrade === grade;
                return (
                  <button
                    key={grade}
                    type="button"
                    id={`btn-select-grade-${grade}`}
                    onClick={() => onGradeChange(grade)}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isGradeActive
                        ? 'bg-blue-600 text-white border-blue-700 shadow-xs ring-2 ring-blue-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black">
                      {grade === 'K1' ? 'อนุบาล 1' : grade === 'K2' ? 'อนุบาล 2' : 'อนุบาล 3'}
                    </div>
                    <div className={`text-[10px] ${isGradeActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {grade === 'K1' ? '3 - 4 ขวบ' : grade === 'K2' ? '4 - 5 ขวบ' : '5 - 6 ขวบ'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Active Exam Set Notification if present */}
      {activeExamSet && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base">📚</span>
            <div>
              <div className="text-xs font-black text-amber-950">
                ทำชุดข้อสอบ: {activeExamSet.title}
              </div>
              <div className="text-[10px] text-amber-800">
                จำนวน {activeExamSet.questionCount || activeExamSet.questionIds.length} ข้อ
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {onOpenExamSets && (
              <button
                type="button"
                onClick={onOpenExamSets}
                className="text-xs font-bold text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                เปลี่ยนชุด
              </button>
            )}
            {onClearActiveExamSet && (
              <button
                type="button"
                onClick={onClearActiveExamSet}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded-lg cursor-pointer"
              >
                โหมดอิสระ
              </button>
            )}
          </div>
        </div>
      )}

      {/* Thai Phonics Handbook Banner when in Thai Phonics Mode */}
      {isPhonics && (
        <div className="w-full p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/15 border-2 border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-2xl p-1.5 bg-white rounded-xl shadow-2xs border border-emerald-200 shrink-0">📖</span>
            <div className="min-w-0">
              <div className="text-xs font-black text-emerald-950 flex items-center gap-1.5 flex-wrap">
                <span>คู่มือการสอนอ่านเขียน โดยการแจกลูกสะกดคำ สพฐ.</span>
                <span className="text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black">
                  ๑๐ หน่วยการเรียนรู้
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-emerald-800/90 font-medium mt-0.5">
                สถาบันภาษาไทย สพฐ. เพื่อการอ่านออกเขียนได้ ครอบคลุม ๑๐ หน่วย ป.๑ - ป.๖
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto flex-wrap">
            {onOpenThaiHandwriting && (
              <button
                type="button"
                id="btn-phonics-handwriting"
                onClick={onOpenThaiHandwriting}
                className="text-xs font-black text-amber-950 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                title="เปิดฝึกคัดลายมือแจกลูกสะกดคำด้วยกล้องจับมือ Hand Tracking"
              >
                <span>✍️</span>
                <span>คัดลายมือแจกลูก</span>
              </button>
            )}
            {onOpenClassroomRoom && (
              <button
                type="button"
                id="btn-phonics-classroom"
                onClick={onOpenClassroomRoom}
                className="text-xs font-black text-indigo-950 bg-indigo-100 hover:bg-indigo-200 px-3 py-1.5 rounded-xl border border-indigo-300 transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                title="เปิดห้องเรียนสดประลองสะกดคำทั้งห้องแบบ Real-time"
              >
                <span>🏫</span>
                <span>ประลองสะกดคำสด</span>
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                onClick={onOpenWorksheets}
                className="text-xs font-black text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300 transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                title="เปิดเครื่องมือจัดพิมพ์ใบงาน A4 / PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>พิมพ์ใบงาน สพฐ.</span>
              </button>
            )}
            {onOpenExamSets && (
              <button
                type="button"
                onClick={onOpenExamSets}
                className="text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-xl shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>ชุดข้อสอบ</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Competency Hands-on Activities Banner when in CBE Mode */}
      {isCbe && onOpenCompetencyActivities && (
        <button
          type="button"
          id="btn-cbe-activities-banner"
          onClick={onOpenCompetencyActivities}
          className="w-full p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 hover:from-indigo-500/20 hover:to-pink-500/20 border-2 border-indigo-200/90 flex items-center justify-between gap-2.5 transition-all text-left group cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl p-1.5 bg-white rounded-xl shadow-2xs border border-indigo-100">🎯</span>
            <div className="min-w-0 truncate">
              <div className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                <span>กิจกรรมเสริมสมรรถนะ (เน้นการลงมือปฏิบัติ)</span>
                <span className="text-[9px] bg-indigo-600 text-white px-2 py-0.2 rounded-full font-black animate-pulse">
                  Interactive 5 นาที ✨
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-indigo-800/80 truncate font-medium">
                ชุดคำแนะนำ 5 นาทีต่อขั้นตอน พร้อมตัวจับเวลา สำหรับครูและเด็ก 6 สมรรถนะหลัก
              </div>
            </div>
          </div>
          <span className="text-xs font-black text-indigo-700 bg-white px-2.5 py-1 rounded-xl border border-indigo-200 shrink-0 group-hover:translate-x-0.5 transition-transform shadow-2xs">
            เปิดกิจกรรม →
          </span>
        </button>
      )}

      {/* 8 Skills Hands-on Activities Banner ONLY when in Early Childhood Mode */}
      {isEarly && (
        <button
          type="button"
          id="btn-open-early-childhood-activities-banner"
          onClick={() => {
            if (onOpenActivitiesModal) {
              onOpenActivitiesModal();
            }
          }}
          className="w-full p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 hover:from-amber-500/20 hover:to-rose-500/20 border-2 border-amber-300 flex items-center justify-between gap-2.5 transition-all text-left group cursor-pointer shadow-2xs active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl p-1.5 bg-white rounded-xl shadow-2xs border border-amber-200">🌟</span>
            <div className="min-w-0 truncate">
              <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                <span>กิจกรรมพัฒนา 8 ทักษะ (หลักสูตรปฐมวัย)</span>
                <span className="text-[9px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-black animate-pulse">
                  24 กิจกรรมใหม่ ✨
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-amber-800/80 truncate font-medium">
                เลือกทำกิจกรรมเสริมสร้างพัฒนาการแต่ละด้านได้ทันทีจากหน้าหลัก (อ.1 - อ.3)
              </div>
            </div>
          </div>
          <span className="text-xs font-black text-amber-800 bg-white px-2.5 py-1 rounded-xl border border-amber-200 shrink-0 group-hover:translate-x-0.5 transition-transform shadow-2xs">
            ดูรายการกิจกรรม ↓
          </span>
        </button>
      )}

      {/* 2. Skills / Competencies / Phonics Units Presets & Stepper */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-slate-700 flex items-center gap-1">
              <span>{categoryIcon}</span>
              <span>
                {isPhonics
                  ? 'หน่วยการเรียนรู้ที่จะฝึกฝน'
                  : isCbe
                  ? 'สมรรถนะที่จะประเมิน'
                  : 'ทักษะที่จะฝึกฝน'}
              </span>
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                isPhonics
                  ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                  : isCbe
                  ? 'text-indigo-800 bg-indigo-50 border-indigo-200'
                  : 'text-blue-700 bg-blue-50 border-blue-200'
              }`}
            >
              เลือก {selectedSubjects.length} {categoryLabel} (
              {selectedSubjects.length * questionsPerSkill} ข้อ)
            </span>
          </div>

          {/* Stepper question count */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 self-start sm:self-auto">
            <span className="text-[10px] font-bold text-slate-500 px-1.5">
              ข้อ/{categoryLabel}:
            </span>
            <button
              type="button"
              onClick={() => onCountChange(questionsPerSkill - 1)}
              disabled={questionsPerSkill <= 1}
              className="w-5 h-5 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center text-xs font-black text-slate-800">
              {questionsPerSkill}
            </span>
            <button
              type="button"
              onClick={() => onCountChange(questionsPerSkill + 1)}
              disabled={questionsPerSkill >= 20}
              className="w-5 h-5 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Preset Buttons based on active curriculum */}
        {isPhonics ? (
          /* Thai Phonics Presets */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
            <button
              type="button"
              id="btn-select-all-phonics"
              onClick={handleSelectAllPhonics}
              className={`py-1.5 px-2.5 rounded-xl font-black border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isAll10PhonicsSelected
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                  : 'bg-white text-emerald-950 border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <span>✨ ครบ ๑๐ หน่วย ({10 * questionsPerSkill} ข้อ)</span>
            </button>

            <button
              type="button"
              id="btn-select-phonics-basic"
              onClick={handleSelectPhonicsBasic}
              className={`py-1.5 px-2.5 rounded-xl font-black border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isPhonicsBasicSelected
                  ? 'bg-teal-600 text-white border-teal-700 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>🌱 หน่วย ๑-๕ (พื้นฐาน)</span>
            </button>

            <button
              type="button"
              id="btn-select-phonics-direct"
              onClick={handleSelectPhonicsDirect}
              className={`py-1.5 px-2.5 rounded-xl font-black border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isPhonicsDirectSelected
                  ? 'bg-cyan-600 text-white border-cyan-700 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>🎯 หน่วย ๖-๘ (ตัวสะกด)</span>
            </button>

            <button
              type="button"
              id="btn-select-phonics-advanced"
              onClick={handleSelectPhonicsAdvanced}
              className={`py-1.5 px-2.5 rounded-xl font-black border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isPhonicsAdvancedSelected
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>🚀 หน่วย ๙-๑๐ (ควบกล้ำ/นำ)</span>
            </button>
          </div>
        ) : isCbe ? (
          /* CBE Primary Presets */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
            <button
              type="button"
              id="btn-start-select-all-cbe"
              onClick={handleSelectAllCbe}
              className={`py-1.5 px-2.5 rounded-xl font-black border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isAll6CbeSelected
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                  : 'bg-white text-indigo-950 border-indigo-200 hover:bg-indigo-50'
              }`}
            >
              <span>✨ ครบ 6 สมรรถนะ ({6 * questionsPerSkill} ข้อ)</span>
            </button>

            <button
              type="button"
              onClick={handleSelectCbeThinkingSelf}
              className={`py-1.5 px-2.5 rounded-xl font-black border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isCbeThinkingSelfSelected
                  ? 'bg-violet-600 text-white border-violet-700 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>🧠 คิดขั้นสูง & ตนเอง</span>
            </button>

            <button
              type="button"
              onClick={handleSelectCbeCommTeam}
              className={`py-1.5 px-2.5 rounded-xl font-black border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isCbeCommTeamSelected
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>💬 สื่อสาร & ทีมเวิร์ก</span>
            </button>

            <button
              type="button"
              onClick={onToggleSkillDetails}
              className="py-1.5 px-2.5 rounded-xl font-bold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <span>{showAllSkillDetails ? 'ซ่อนการ์ดสมรรถนะ' : 'ดูสมรรถนะแยกข้อ'}</span>
              {showAllSkillDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        ) : (
          /* Early Childhood Presets */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
            <button
              type="button"
              id="btn-start-select-core-5"
              onClick={handleSelectCore5}
              className={`py-1.5 px-2.5 rounded-xl font-black border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isCore5Selected
                  ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-300 text-amber-200" />
              <span>🌟 5 ด้านหลัก ({5 * questionsPerSkill} ข้อ)</span>
            </button>

            <button
              type="button"
              id="btn-start-select-all-skills"
              onClick={handleSelectAllEarly}
              className={`py-1.5 px-2.5 rounded-xl font-black border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isAll8Selected
                  ? 'bg-blue-600 text-white border-blue-700 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>✨ ครบ 8 ด้าน ({8 * questionsPerSkill} ข้อ)</span>
            </button>

            <button
              type="button"
              id="btn-start-select-trio-skills"
              onClick={handleSelectTrio}
              className={`py-1.5 px-2.5 rounded-xl font-black border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isTrioSelected
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>📖 3 เสาหลัก</span>
            </button>

            <button
              type="button"
              onClick={onToggleSkillDetails}
              className="py-1.5 px-2.5 rounded-xl font-bold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <span>{showAllSkillDetails ? 'ซ่อนการ์ดทักษะ' : 'ดูทักษะแยกข้อ'}</span>
              {showAllSkillDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        )}
      </div>

      {/* Collapsible Cards Grid (10 Phonics Units or 8 Skills or 6 CBE Competencies) */}
      {showAllSkillDetails && (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            isPhonics ? 'lg:grid-cols-5' : isCbe ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          } gap-2 pt-1 border-t border-slate-100`}
        >
          {activeSkillsList.map((skill) => {
            const isSelected = selectedSubjects.includes(skill.id);
            const isCore5 = isEarly && CORE_5_SKILL_IDS.includes(skill.id);

            return (
              <div
                key={skill.id}
                id={`start-skill-card-${skill.id}`}
                onClick={() => handleSkillToggle(skill.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? isPhonics
                      ? 'bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-200 shadow-2xs'
                      : isCbe
                      ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-200 shadow-2xs'
                      : 'bg-blue-50/70 border-blue-300 shadow-2xs'
                    : 'bg-white border-slate-200 opacity-75 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl">{skill.icon}</span>
                      {isCore5 && (
                        <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-1 rounded border border-amber-200">
                          หลัก
                        </span>
                      )}
                      {isCbe && (
                        <span className="text-[9px] font-bold text-indigo-800 bg-indigo-100 px-1.5 py-0.2 rounded border border-indigo-200">
                          {skill.code}
                        </span>
                      )}
                      {isPhonics && (
                        <span className="text-[9px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300">
                          {skill.code}
                        </span>
                      )}
                    </div>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center ${
                        isSelected
                          ? isPhonics
                            ? 'bg-emerald-600 text-white'
                            : isCbe
                            ? 'bg-indigo-600 text-white'
                            : 'bg-blue-600 text-white'
                          : 'border border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="font-black text-xs text-slate-800 truncate">
                    {skill.name.th}
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                    {skill.description}
                  </div>
                </div>

                <button
                  type="button"
                  id={`btn-start-select-only-${skill.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSkillSelectOnly(skill.id);
                  }}
                  className={`mt-2 text-[10px] font-bold py-0.5 rounded text-center border cursor-pointer ${
                    isPhonics
                      ? 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
                      : isCbe
                      ? 'text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100 border-indigo-200'
                      : 'text-slate-500 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 border-slate-200'
                  }`}
                >
                  {isPhonics
                    ? 'เน้นเฉพาะหน่วยนี้'
                    : isCbe
                    ? 'เน้นเฉพาะสมรรถนะนี้'
                    : 'สอบเฉพาะทักษะนี้'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
