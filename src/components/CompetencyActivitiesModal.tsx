import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Search,
  Award,
  BookOpen,
  Users,
  Target,
  Brain,
  MessageCircle,
  Shield,
  Leaf,
  Compass,
  Printer,
  FileText,
  Star,
  Check,
  Plus,
  Minus,
  HelpCircle,
  Smile,
  BadgeCheck,
} from 'lucide-react';
import { Grade, Subject, VoicePersona } from '../types';
import { COMPETENCY_ACTIVITIES } from '../data/competencyActivities';
import { CompetencyActivity, CompetencyActivityStep } from '../types';
import { soundEffects, speakText, stopSpeaking } from '../services/audioService';
import { storageService, CompletedCompetencyActivityRecord } from '../services/storageService';

export interface CompetencyActivitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade: Grade;
  activeProfileName: string;
  activeProfileId?: string;
  soundVolume?: number;
  voicePersona?: VoicePersona;
}

type RoleMode = 'teacher' | 'kid';

const COMPETENCY_FILTERS: {
  id: Subject | 'all';
  name: string;
  shortName: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}[] = [
  {
    id: 'all',
    name: 'สมรรถนะทั้งหมด (18 กิจกรรม)',
    shortName: 'ทั้งหมด',
    icon: '✨',
    colorClass: 'text-indigo-600',
    bgClass: 'bg-indigo-50',
    borderClass: 'border-indigo-200',
  },
  {
    id: 'self_management',
    name: '1. การจัดการตนเอง',
    shortName: 'จัดการตนเอง',
    icon: '🎯',
    colorClass: 'text-sky-600',
    bgClass: 'bg-sky-50',
    borderClass: 'border-sky-200',
  },
  {
    id: 'higher_order_thinking',
    name: '2. การคิดขั้นสูง',
    shortName: 'คิดขั้นสูง',
    icon: '🧠',
    colorClass: 'text-violet-600',
    bgClass: 'bg-violet-50',
    borderClass: 'border-violet-200',
  },
  {
    id: 'communication',
    name: '3. การสื่อสาร',
    shortName: 'การสื่อสาร',
    icon: '💬',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
  },
  {
    id: 'teamwork_collaboration',
    name: '4. การรวมพลังทำงานเป็นทีม',
    shortName: 'ทำงานเป็นทีม',
    icon: '🤝',
    colorClass: 'text-amber-700',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
  },
  {
    id: 'active_citizenship',
    name: '5. การเป็นพลเมืองที่เข้มแข็ง',
    shortName: 'พลเมืองเข้มแข็ง',
    icon: '🏛️',
    colorClass: 'text-rose-600',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-200',
  },
  {
    id: 'sustainable_living',
    name: '6. อยู่ร่วมกับธรรมชาติและวิทยาการอย่างยั่งยืน',
    shortName: 'ธรรมชาติและวิทยาการ',
    icon: '🌿',
    colorClass: 'text-teal-700',
    bgClass: 'bg-teal-50',
    borderClass: 'border-teal-200',
  },
];

export const CompetencyActivitiesModal: React.FC<CompetencyActivitiesModalProps> = ({
  isOpen,
  onClose,
  currentGrade,
  activeProfileName,
  activeProfileId,
  soundVolume = 0.7,
  voicePersona = 'adult_female' as VoicePersona,
}) => {
  const activePersona: VoicePersona = (voicePersona as VoicePersona) || 'adult_female';

  // Navigation & filter state
  const [selectedCompetency, setSelectedCompetency] = useState<Subject | 'all'>('all');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<Grade | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeActivity, setActiveActivity] = useState<CompetencyActivity | null>(null);

  // Active Runner State
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [roleMode, setRoleMode] = useState<RoleMode>('teacher');
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes default (300s)
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [rubricRating, setRubricRating] = useState<'beginning' | 'developing' | 'proficient'>('proficient');
  const [teacherNotes, setTeacherNotes] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);

  // Completed records tracking from storage
  const [completedRecords, setCompletedRecords] = useState<CompletedCompetencyActivityRecord[]>(() =>
    storageService.getCompletedActivities(activeProfileId)
  );

  // Sync completed records when profile changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCompletedRecords(storageService.getCompletedActivities(activeProfileId));
    }
  }, [isOpen, activeProfileId]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (showCelebration) {
          setShowCelebration(false);
        } else if (activeActivity) {
          stopSpeaking();
          setActiveActivity(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeActivity, showCelebration, onClose]);

  // Interactive 5-Minute Timer countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            // Timer expired!
            setIsTimerRunning(false);
            soundEffects.playVictory(soundVolume);
            speakText('หมดเวลา 5 นาทีสำหรับขั้นตอนนี้แล้วจ้า ยอดเยี่ยมมาก!', 'th', activePersona, soundVolume);
            return 0;
          }
          // Halfway reminder at 2:30 (150s)
          if (prev === 150) {
            soundEffects.playSuccess(soundVolume * 0.7);
          }
          // Warning reminder at 30s
          if (prev === 30) {
            soundEffects.playTick(1, soundVolume * 0.8);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, soundVolume, voicePersona]);

  // Stop speaking when step changes or activity closes
  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, [currentStepIndex, activeActivity]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return COMPETENCY_ACTIVITIES.filter((act) => {
      // Competency filter
      if (selectedCompetency !== 'all' && act.competencyId !== selectedCompetency) {
        return false;
      }
      // Grade level filter
      if (selectedGradeFilter !== 'all' && !act.gradeLevels.includes(selectedGradeFilter)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = act.title.toLowerCase().includes(q);
        const matchSubtitle = act.subtitle.toLowerCase().includes(q);
        const matchObjective = act.objective.toLowerCase().includes(q);
        const matchMaterials = act.materials.some((m) => m.toLowerCase().includes(q));
        if (!matchTitle && !matchSubtitle && !matchObjective && !matchMaterials) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCompetency, selectedGradeFilter, searchQuery]);

  // Completed map
  const completedMap = useMemo(() => {
    const map = new Map<string, CompletedCompetencyActivityRecord>();
    for (const r of completedRecords) {
      map.set(r.activityId, r);
    }
    return map;
  }, [completedRecords]);

  // Start an activity
  const handleStartActivity = (activity: CompetencyActivity) => {
    soundEffects.playTap(soundVolume);
    setActiveActivity(activity);
    setCurrentStepIndex(0);
    setTimerSeconds(300); // 5 minutes
    setIsTimerRunning(false);
    setCheckedItems({});
    setCompletedSteps([]);
    setTeacherNotes('');
    setRubricRating('proficient');
    setShowCelebration(false);
  };

  // Timer controls
  const handleToggleTimer = () => {
    soundEffects.playTap(soundVolume);
    setIsTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    soundEffects.playTap(soundVolume);
    setIsTimerRunning(false);
    setTimerSeconds(300);
  };

  const handleAdjustTimer = (delta: number) => {
    soundEffects.playTap(soundVolume);
    setTimerSeconds((prev) => Math.max(10, Math.min(1800, prev + delta)));
  };

  // Toggle checklist item
  const handleToggleChecklist = (itemKey: string) => {
    soundEffects.playTap(soundVolume);
    setCheckedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  // Step navigation
  const handleNextStep = () => {
    if (!activeActivity) return;
    soundEffects.playCorrect(soundVolume);
    if (!completedSteps.includes(currentStepIndex)) {
      setCompletedSteps((prev) => [...prev, currentStepIndex]);
    }
    if (currentStepIndex < activeActivity.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setTimerSeconds(300); // Reset timer for new 5-minute step
      setIsTimerRunning(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      soundEffects.playTap(soundVolume);
      setCurrentStepIndex((prev) => prev - 1);
      setTimerSeconds(300);
      setIsTimerRunning(false);
    }
  };

  // Text to speech narration
  const handleSpeakText = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(text, 'th', activePersona, soundVolume);
    }
  };

  // Save activity completion
  const handleFinishActivity = () => {
    if (!activeActivity || !activeProfileId) return;
    soundEffects.playVictory(soundVolume);
    const record: CompletedCompetencyActivityRecord = {
      activityId: activeActivity.id,
      competencyId: activeActivity.competencyId,
      completedAt: new Date().toISOString(),
      rating: rubricRating,
      teacherNotes: teacherNotes.trim(),
      durationMinutesSpent: activeActivity.totalDurationMinutes,
      profileId: activeProfileId,
    };
    storageService.saveCompletedActivity(activeProfileId, record);
    setCompletedRecords(storageService.getCompletedActivities(activeProfileId));
    setShowCelebration(true);
  };

  if (!isOpen) return null;

  const currentStep: CompetencyActivityStep | null =
    activeActivity && activeActivity.steps[currentStepIndex] ? activeActivity.steps[currentStepIndex] : null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-competency-activities-title"
      className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-3 sm:pt-6 md:pt-8 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in"
    >
      <div className="bg-white rounded-3xl shadow-2xl border-2 sm:border-4 border-indigo-100 w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95 my-auto sm:my-0">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-3.5 sm:p-5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-inner">
              🎯
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1
                  id="modal-competency-activities-title"
                  className="text-base sm:text-xl font-black tracking-tight leading-tight truncate"
                >
                  กิจกรรมเสริมสมรรถนะ (เน้นการลงมือปฏิบัติ)
                </h1>
                <span className="bg-white/25 text-white text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  Interactive 5 นาทีต่อขั้นตอน
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-indigo-100 font-medium truncate mt-0.5">
                ชุดคำแนะนำแบบ Interactive สำหรับครูและเด็ก • หลักสูตรสถานศึกษาฐานสมรรถนะ ป.1-ป.3
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeActivity && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  stopSpeaking();
                  setActiveActivity(null);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>←</span>
                <span className="hidden sm:inline">เลือกกิจกรรมอื่น</span>
              </button>
            )}
            <button
              type="button"
              id="btn-close-competency-modal"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                stopSpeaking();
                onClose();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
              title="ปิดหน้าต่าง (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col gap-4 bg-slate-50/50">
          {!activeActivity ? (
            /* ========================================================== */
            /* VIEW A: CATALOG & FILTER MODE                              */
            /* ========================================================== */
            <div className="flex flex-col gap-4">
              {/* Top Highlights Banner */}
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-3.5 sm:p-4 rounded-2xl border border-indigo-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-indigo-200 flex items-center justify-center text-2xl">
                    🌟
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-black text-slate-800">
                      ห้องปฏิบัติการสมรรถนะ 6 ด้าน สำหรับ {activeProfileName}
                    </h2>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      ออกแบบโดยแบ่งขั้นตอนละ 5 นาที เพื่อให้เด็กและครูลงมือทำจริง พร้อมตัวจับเวลาและคู่มือแนะนำ
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-indigo-100 shadow-2xs text-center">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">ทำสำเร็จแล้ว</span>
                    <span className="text-sm sm:text-base font-black text-emerald-600">
                      {completedRecords.length} / {COMPETENCY_ACTIVITIES.length} กิจกรรม
                    </span>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-indigo-100 shadow-2xs text-center">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">เวลาฝึกปฏิบัติ</span>
                    <span className="text-sm sm:text-base font-black text-indigo-600">
                      {completedRecords.reduce((acc, r) => acc + (r.durationMinutesSpent || 20), 0)} นาที
                    </span>
                  </div>
                </div>
              </div>

              {/* Competency Filter Pills */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-indigo-600" />
                    <span>เลือกสมรรถนะหลัก (6 สมรรถนะ)</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-500 font-bold mr-1">ระดับชั้น:</span>
                    {(['all', 'P1', 'P2', 'P3'] as const).map((gr) => (
                      <button
                        key={gr}
                        type="button"
                        onClick={() => {
                          soundEffects.playTap(soundVolume);
                          setSelectedGradeFilter(gr);
                        }}
                        className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          selectedGradeFilter === gr
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {gr === 'all' ? 'ทุกชั้น' : gr === 'P1' ? 'ป.1' : gr === 'P2' ? 'ป.2' : 'ป.3'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {COMPETENCY_FILTERS.map((comp) => {
                    const isSelected = selectedCompetency === comp.id;
                    return (
                      <button
                        key={comp.id}
                        type="button"
                        onClick={() => {
                          soundEffects.playTap(soundVolume);
                          setSelectedCompetency(comp.id);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-102'
                            : `${comp.bgClass} ${comp.colorClass} ${comp.borderClass} hover:brightness-95`
                        }`}
                      >
                        <span>{comp.icon}</span>
                        <span>{comp.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหากิจกรรม, อุปกรณ์ที่ต้องใช้, หรือคีย์เวิร์ด..."
                  className="w-full bg-white pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800 placeholder-slate-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Activities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {filteredActivities.map((activity) => {
                  const record = completedMap.get(activity.id);
                  const isCompleted = !!record;
                  return (
                    <div
                      key={activity.id}
                      className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3 group relative overflow-hidden"
                    >
                      {/* Left accent border */}
                      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-600" />

                      <div className="flex flex-col gap-2 pl-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl p-1.5 bg-indigo-50 rounded-xl border border-indigo-100 shadow-2xs">
                              {activity.icon}
                            </span>
                            <div>
                              <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wide block">
                                {activity.competencyCode} • {activity.category}
                              </span>
                              <div className="flex gap-1 items-center mt-0.5">
                                {activity.gradeLevels.map((g) => (
                                  <span
                                    key={g}
                                    className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-md"
                                  >
                                    {g === 'P1' ? 'ป.1' : g === 'P2' ? 'ป.2' : 'ป.3'}
                                  </span>
                                ))}
                                <span className="text-[9px] font-bold bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" />
                                  <span>{activity.totalDurationMinutes} นาที</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {isCompleted && (
                            <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>สำเร็จแล้ว</span>
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="text-sm sm:text-base font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                            {activity.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">
                            {activity.subtitle}
                          </p>
                        </div>

                        {/* 5-minute steps pill preview */}
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-slate-500">
                            โครงสร้างกิจกรรม ({activity.steps.length} ขั้นตอนละ 5 นาที):
                          </span>
                          <div className="flex flex-col gap-0.5">
                            {activity.steps.map((st) => (
                              <div
                                key={st.stepNumber}
                                className="text-[11px] text-slate-700 font-medium truncate flex items-center gap-1.5"
                              >
                                <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 text-[9px] font-black flex items-center justify-center shrink-0">
                                  {st.stepNumber}
                                </span>
                                <span className="truncate">{st.title.replace(/ขั้นที่ \d+: /, '')}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Materials needed */}
                        <div className="text-[10px] text-slate-400 font-medium truncate">
                          📦 อุปกรณ์: {activity.materials.join(', ')}
                        </div>
                      </div>

                      {/* CTA button */}
                      <button
                        type="button"
                        onClick={() => handleStartActivity(activity)}
                        className="w-full py-2.5 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-black shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>เริ่มกิจกรรม Interactive (ขั้นตอนละ 5 นาที)</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {filteredActivities.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl">🔍</span>
                  <p className="text-sm font-bold text-slate-600">
                    ไม่พบกิจกรรมที่ตรงกับการค้นหา "{searchQuery}"
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCompetency('all');
                      setSelectedGradeFilter('all');
                      setSearchQuery('');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100"
                  >
                    ล้างตัวกรองทั้งหมด
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ========================================================== */
            /* VIEW B: INTERACTIVE STEP-BY-STEP RUNNER                    */
            /* ========================================================== */
            <div className="flex flex-col gap-4">
              {/* Activity Header Bar in Runner */}
              <div className="bg-white p-4 rounded-2xl border border-indigo-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-indigo-50 rounded-2xl border border-indigo-100">
                    {activeActivity.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md">
                        {activeActivity.competencyCode}
                      </span>
                      <span className="text-xs text-slate-500 font-bold">
                        รวม {activeActivity.totalDurationMinutes} นาที ({activeActivity.steps.length} ขั้นตอนละ 5 นาที)
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                      {activeActivity.title}
                    </h2>
                  </div>
                </div>

                {/* Role Switcher: Teacher vs Kid */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 self-stretch sm:self-auto justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      setRoleMode('teacher');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                      roleMode === 'teacher'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>👩‍🏫</span>
                    <span>มุมมองคุณครู/ผู้ปกครอง</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      setRoleMode('kid');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                      roleMode === 'kid'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>🧒</span>
                    <span>มุมมองเด็กๆ (ภารกิจลุยเดี่ยว)</span>
                  </button>
                </div>
              </div>

              {/* Step Progress Tracker (1, 2, 3, 4) */}
              <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-2 overflow-x-auto">
                {activeActivity.steps.map((st, idx) => {
                  const isActive = idx === currentStepIndex;
                  const isDone = completedSteps.includes(idx);
                  return (
                    <button
                      key={st.stepNumber}
                      type="button"
                      onClick={() => {
                        soundEffects.playTap(soundVolume);
                        setCurrentStepIndex(idx);
                        setTimerSeconds(300);
                        setIsTimerRunning(false);
                      }}
                      className={`flex-1 min-w-[130px] p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isActive
                          ? 'border-indigo-600 bg-indigo-50/80 shadow-xs'
                          : isDone
                          ? 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isDone ? '✓' : st.stepNumber}
                      </div>
                      <div className="truncate">
                        <span
                          className={`text-[10px] font-black uppercase block ${
                            isActive ? 'text-indigo-700' : 'text-slate-400'
                          }`}
                        >
                          ขั้นที่ {st.stepNumber} (5 นาที)
                        </span>
                        <span className="text-xs font-bold text-slate-800 truncate block">
                          {st.title.replace(/ขั้นที่ \d+: /, '')}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Interactive 5-Minute Timer & Voice Hud */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-4 rounded-3xl shadow-md border border-indigo-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center shrink-0">
                    {/* SVG circular progress ring */}
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`${
                          timerSeconds <= 30
                            ? 'text-rose-500 animate-pulse'
                            : timerSeconds <= 120
                            ? 'text-amber-400'
                            : 'text-indigo-400'
                        }`}
                        strokeDasharray={`${(timerSeconds / 300) * 100}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute font-mono text-base sm:text-lg font-black text-white">
                      {formatTimer(timerSeconds)}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        ตัวจับเวลา 5 นาทีประจำขั้น
                      </span>
                      {isTimerRunning && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 font-medium">
                      {isTimerRunning
                        ? 'กำลังจับเวลา 300 วินาที... โฟกัสลงมือทำอย่างเต็มที่'
                        : timerSeconds === 0
                        ? '🎉 หมดเวลา 5 นาทีแล้ว! ชวนเด็กๆ สะท้อนคิดและเปลี่ยนขั้น'
                        : 'กดปุ่มเพื่อเริ่มนับเวลาถอยหลัง 5 นาทีสำหรับขั้นตอนนี้'}
                    </p>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button
                    type="button"
                    onClick={() => handleAdjustTimer(-60)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                    title="-1 นาที"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleTimer}
                    className={`px-4 py-2 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                      isTimerRunning
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{isTimerRunning ? 'พักเวลาชั่วคราว' : 'เริ่มจับเวลา 5 นาที'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAdjustTimer(60)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                    title="+1 นาที"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleResetTimer}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                    title="รีเซ็ตเป็น 5 นาที"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  {/* Speech Narration Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!currentStep) return;
                      const textToRead =
                        roleMode === 'teacher'
                          ? `ขั้นตอนที่ ${currentStep.stepNumber}: ${currentStep.title}. เป้าหมาย: ${currentStep.teacherGuide.goal}. คำถามชวนคิด: ${currentStep.teacherGuide.promptQuestions.join('. ')}`
                          : `ภารกิจที่ ${currentStep.stepNumber}: ${currentStep.kidMission.missionTitle}. ${currentStep.kidMission.interactiveChallenge}`;
                      handleSpeakText(textToRead);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isSpeaking
                        ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                    title="อ่านคำแนะนำออกเสียงด้วยเสียง AI ครูภาษาไทย"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{isSpeaking ? 'หยุดอ่าน' : 'อ่านออกเสียง'}</span>
                  </button>
                </div>
              </div>

              {/* Main Content Area: Teacher Guide or Kid Mission */}
              {currentStep && (
                <div className="flex flex-col gap-4">
                  {roleMode === 'teacher' ? (
                    /* ---------------------------------------------------- */
                    /* ROLE: TEACHER / FACILITATOR GUIDE                    */
                    /* ---------------------------------------------------- */
                    <div className="bg-white rounded-3xl p-5 border-2 border-indigo-200 shadow-sm flex flex-col gap-4">
                      {/* Step Title & Goal */}
                      <div className="pb-3 border-b border-slate-100 flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                            👩‍🏫 คู่มือสำหรับคุณครู / ผู้ปกครอง
                          </span>
                          <span className="text-xs text-slate-500 font-bold">
                            ขั้นที่ {currentStep.stepNumber} จาก {activeActivity.steps.length} (5 นาที)
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          {currentStep.title}
                        </h3>
                        <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100 text-xs sm:text-sm text-indigo-900 font-medium flex items-start gap-2">
                          <Target className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-bold text-indigo-950">เป้าหมาย 5 นาทีนี้: </strong>
                            <span>{currentStep.teacherGuide.goal}</span>
                          </div>
                        </div>
                      </div>

                      {/* Facilitator Actions */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                          <span>สิ่งที่ครู/ผู้ปกครองต้องจัดหรือนำกิจกรรม (Action Steps):</span>
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {currentStep.teacherGuide.actions.map((act, i) => (
                            <div
                              key={i}
                              className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2.5"
                            >
                              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Open-Ended Prompt Questions */}
                      <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/90 flex flex-col gap-2">
                        <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4 text-amber-700" />
                          <span>คำถามกระตุ้นความคิด (Open-ended Prompts ชวนเด็กคิด):</span>
                        </h4>
                        <div className="flex flex-col gap-1.5">
                          {currentStep.teacherGuide.promptQuestions.map((q, i) => (
                            <div
                              key={i}
                              className="bg-white p-2.5 rounded-xl border border-amber-200 text-xs sm:text-sm font-bold text-amber-950 flex items-center justify-between gap-2"
                            >
                              <span>"{q}"</span>
                              <button
                                type="button"
                                onClick={() => handleSpeakText(q)}
                                className="p-1 rounded-lg hover:bg-amber-100 text-amber-700 transition-colors shrink-0"
                                title="อ่านคำถามนี้ออกเสียง"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Observation Tips */}
                      <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 flex flex-col gap-2">
                        <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Brain className="w-4 h-4 text-emerald-700" />
                          <span>สิ่งที่ครูควรสังเกต (พฤติกรรมบ่งชี้สมรรถนะ):</span>
                        </h4>
                        <ul className="list-disc list-inside text-xs sm:text-sm text-emerald-950 font-medium space-y-1">
                          {currentStep.teacherGuide.observationTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    /* ---------------------------------------------------- */
                    /* ROLE: KID MISSION MODE                               */
                    /* ---------------------------------------------------- */
                    <div className="bg-white rounded-3xl p-5 border-2 border-amber-300 shadow-sm flex flex-col gap-4">
                      {/* Kid Mission Header */}
                      <div className="pb-3 border-b border-amber-100 flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                            🧒 ภารกิจฮีโร่ตัวน้อยของ {activeProfileName}
                          </span>
                          <span className="text-xs text-amber-700 font-bold">
                            ขั้นที่ {currentStep.stepNumber} (5 นาที)
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                          <span>🚀</span>
                          <span>{currentStep.kidMission.missionTitle}</span>
                        </h3>
                      </div>

                      {/* Interactive Challenge Box */}
                      <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 p-4 rounded-2xl border-2 border-amber-400 text-amber-950 flex items-center gap-3 shadow-xs">
                        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-2xl shrink-0 shadow-inner">
                          ⚡
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">
                            ชาเลนจ์ท้าทายประจำ 5 นาทีนี้
                          </span>
                          <p className="text-xs sm:text-sm font-black text-amber-950 mt-0.5">
                            {currentStep.kidMission.interactiveChallenge}
                          </p>
                        </div>
                      </div>

                      {/* Kid Action Steps */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                          สิ่งที่หนูจะได้ลงมือทำทีละขั้น:
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {currentStep.kidMission.actionSteps.map((step, i) => (
                            <div
                              key={i}
                              className="bg-amber-50/50 p-3 rounded-2xl border border-amber-200 text-xs sm:text-sm text-slate-800 font-bold flex items-center gap-3"
                            >
                              <span className="w-7 h-7 rounded-xl bg-amber-400 text-amber-950 text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Checklists */}
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col gap-2.5">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>เช็คลิสต์สิ่งที่หนูทำสำเร็จใน 5 นาทีนี้ (คลิกเพื่อติ๊กถูก):</span>
                        </h4>
                        <div className="flex flex-col gap-2">
                          {currentStep.kidMission.checklistItems.map((chk, i) => {
                            const key = `${activeActivity.id}_step${currentStep.stepNumber}_chk${i}`;
                            const isChecked = !!checkedItems[key];
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleToggleChecklist(key)}
                                className={`p-3 rounded-xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center gap-3 cursor-pointer ${
                                  isChecked
                                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                                }`}
                              >
                                <div
                                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${
                                    isChecked
                                      ? 'bg-emerald-500 border-emerald-600 text-white'
                                      : 'border-slate-300 bg-slate-50'
                                  }`}
                                >
                                  {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                                </div>
                                <span className={isChecked ? 'line-through text-emerald-800' : ''}>
                                  {chk}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reflection Prompt Box (Always Visible) */}
                  <div className="bg-sky-50 p-3.5 sm:p-4 rounded-2xl border border-sky-200 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl shrink-0 mt-0.5">💭</span>
                      <div>
                        <strong className="text-xs sm:text-sm font-black text-sky-950 block">
                          คำถามชวนคิดหลังหมดเวลา 5 นาที:
                        </strong>
                        <p className="text-xs sm:text-sm font-bold text-sky-800 mt-0.5">
                          "{currentStep.reflectionPrompt}"
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSpeakText(currentStep.reflectionPrompt)}
                      className="p-1.5 rounded-xl bg-white text-sky-700 hover:bg-sky-100 transition-colors shrink-0 shadow-2xs"
                      title="อ่านคำถามสะท้อนคิดนี้"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Final Step Assessment Rubric & Notes (When on last step) */}
                  {currentStepIndex === activeActivity.steps.length - 1 && (
                    <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 p-4 sm:p-5 rounded-3xl border-2 border-indigo-300 shadow-xs flex flex-col gap-3.5">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-indigo-600" />
                        <h4 className="text-sm sm:text-base font-black text-slate-900">
                          การประเมินและสะท้อนสมรรถนะ: {activeActivity.assessmentRubric.indicator}
                        </h4>
                      </div>

                      {/* 3-tier Rubric rating */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {(
                          [
                            { key: 'beginning', label: '🥉 ระดับเริ่มต้น', desc: activeActivity.assessmentRubric.beginning },
                            { key: 'developing', label: '🥈 ระดับกำลังพัฒนา', desc: activeActivity.assessmentRubric.developing },
                            { key: 'proficient', label: '🥇 ระดับสามารถ (บรรลุ)', desc: activeActivity.assessmentRubric.proficient },
                          ] as const
                        ).map((lvl) => {
                          const isSelected = rubricRating === lvl.key;
                          return (
                            <button
                              key={lvl.key}
                              type="button"
                              onClick={() => {
                                soundEffects.playTap(soundVolume);
                                setRubricRating(lvl.key);
                              }}
                              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col gap-1 ${
                                isSelected
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-102'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              <span className="text-xs font-black">{lvl.label}</span>
                              <span
                                className={`text-[11px] leading-snug font-medium ${
                                  isSelected ? 'text-indigo-100' : 'text-slate-500'
                                }`}
                              >
                                {lvl.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Teacher Notes Field */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-700">
                          บันทึกข้อสังเกตและคำชื่นชมสำหรับ {activeProfileName} (ไม่บังคับ):
                        </label>
                        <textarea
                          value={teacherNotes}
                          onChange={(e) => setTeacherNotes(e.target.value)}
                          placeholder="เช่น เด็กสามารถอธิบายเหตุผลได้ดีมาก ช่วยเหลือเพื่อนในการพับสะพาน..."
                          rows={2}
                          className="w-full bg-white p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800"
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation Footer */}
                  <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-200">
                    <button
                      type="button"
                      disabled={currentStepIndex === 0}
                      onClick={handlePrevStep}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                        currentStepIndex === 0
                          ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>ขั้นตอนก่อนหน้า</span>
                    </button>

                    <div className="text-xs text-slate-500 font-bold hidden sm:block">
                      ขั้นตอน {currentStepIndex + 1} จาก {activeActivity.steps.length}
                    </div>

                    {currentStepIndex < activeActivity.steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
                      >
                        <span>ไปขั้นตอนถัดไป (5 นาทีถัดไป)</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFinishActivity}
                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>บันทึกความสำเร็จ & รับตราประทับสมรรถนะ ⭐</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Celebration Overlay */}
        {showCelebration && activeActivity && (
          <div className="fixed inset-0 z-60 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 text-center flex flex-col items-center gap-4 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-4xl shadow-lg animate-bounce">
                🌟
              </div>
              <div>
                <span className="text-xs font-black uppercase text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                  ยินดีด้วย! บรรลุสมรรถนะสำเร็จ
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  สุดยอดมาก {activeProfileName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  ผ่านกิจกรรม "{activeActivity.title}" ครบทุกขั้นตอน 20 นาที และบันทึกประวัติการพัฒนาสมรรถนะเรียบร้อยแล้ว
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 w-full text-left flex items-center gap-3">
                <span className="text-2xl">{activeActivity.icon}</span>
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-700">
                    {activeActivity.competencyCode}
                  </span>
                  <div className="text-xs font-bold text-slate-800">
                    ระดับการประเมิน: {rubricRating === 'proficient' ? '🥇 ระดับสามารถ' : rubricRating === 'developing' ? '🥈 ระดับกำลังพัฒนา' : '🥉 ระดับเริ่มต้น'}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 w-full">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    setShowCelebration(false);
                    setActiveActivity(null);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  กลับไปเลือกกิจกรรมอื่น
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
