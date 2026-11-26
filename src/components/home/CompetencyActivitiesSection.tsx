import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Play,
  Star,
  Clock,
  Compass,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Award,
  Layers,
  ArrowRight,
  Target,
  Brain,
  MessageCircle,
  Users,
  Shield,
  Leaf,
  Maximize2,
} from 'lucide-react';
import { Grade, Subject, VoicePersona, CompetencyActivity } from '../../types';
import { COMPETENCY_ACTIVITIES } from '../../data/competencyActivities';
import { soundEffects } from '../../services/audioService';
import { storageService, CompletedCompetencyActivityRecord } from '../../services/storageService';

interface CompetencyActivitiesSectionProps {
  currentGrade: Grade;
  activeProfileName: string;
  activeProfileId?: string;
  onStartActivityCompetency: (competencyId: Subject) => void;
  onOpenFullModal?: () => void;
  soundVolume?: number;
  voicePersona?: VoicePersona;
}

const COMPETENCY_CATEGORY_TABS: {
  id: Subject | 'all';
  code: string;
  name: string;
  shortName: string;
  icon: string;
  colorClass: string;
  badgeBg: string;
  badgeText: string;
}[] = [
  {
    id: 'all',
    code: 'ALL',
    name: 'สมรรถนะทั้งหมด (18)',
    shortName: 'ทั้งหมด',
    icon: '✨',
    colorClass: 'text-indigo-600',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-900',
  },
  {
    id: 'self_management',
    code: 'CBE1',
    name: '1. การจัดการตนเอง',
    shortName: 'จัดการตนเอง',
    icon: '🎯',
    colorClass: 'text-sky-600',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-900',
  },
  {
    id: 'higher_order_thinking',
    code: 'CBE2',
    name: '2. การคิดขั้นสูง',
    shortName: 'คิดขั้นสูง',
    icon: '🧠',
    colorClass: 'text-violet-600',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-900',
  },
  {
    id: 'communication',
    code: 'CBE3',
    name: '3. การสื่อสาร',
    shortName: 'การสื่อสาร',
    icon: '💬',
    colorClass: 'text-emerald-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
  },
  {
    id: 'teamwork_collaboration',
    code: 'CBE4',
    name: '4. การรวมพลังทำงานเป็นทีม',
    shortName: 'ทำงานเป็นทีม',
    icon: '🤝',
    colorClass: 'text-amber-600',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
  },
  {
    id: 'active_citizenship',
    code: 'CBE5',
    name: '5. พลเมืองที่เข้มแข็ง',
    shortName: 'พลเมืองเข้มแข็ง',
    icon: '🛡️',
    colorClass: 'text-rose-600',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-900',
  },
  {
    id: 'sustainable_living',
    code: 'CBE6',
    name: '6. อยู่ร่วมกับธรรมชาติยั่งยืน',
    shortName: 'ธรรมชาติยั่งยืน',
    icon: '🌿',
    colorClass: 'text-teal-600',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-900',
  },
];

export const CompetencyActivitiesSection: React.FC<CompetencyActivitiesSectionProps> = ({
  currentGrade,
  activeProfileName,
  activeProfileId,
  onStartActivityCompetency,
  onOpenFullModal,
  soundVolume = 0.6,
  voicePersona = 'child_girl',
}) => {
  const [selectedCompetencyTab, setSelectedCompetencyTab] = useState<Subject | 'all'>('all');
  const [gradeFilter, setGradeFilter] = useState<'all' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  // Completed records tracking
  const [completedRecords, setCompletedRecords] = useState<CompletedCompetencyActivityRecord[]>([]);

  const loadCompletedRecords = () => {
    if (activeProfileId) {
      setCompletedRecords(storageService.getCompletedActivities(activeProfileId));
    } else {
      setCompletedRecords(storageService.getCompletedActivities());
    }
  };

  useEffect(() => {
    loadCompletedRecords();
  }, [activeProfileId]);

  // Set gradeFilter to match currentGrade if it is primary
  useEffect(() => {
    if (currentGrade === 'P1' || currentGrade === 'P2' || currentGrade === 'P3') {
      setGradeFilter(currentGrade);
    }
  }, [currentGrade]);

  const completedMap = useMemo(() => {
    const map = new Map<string, CompletedCompetencyActivityRecord>();
    completedRecords.forEach((r) => map.set(r.activityId, r));
    return map;
  }, [completedRecords]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return COMPETENCY_ACTIVITIES.filter((act) => {
      // Competency filter
      if (selectedCompetencyTab !== 'all' && act.competencyId !== selectedCompetencyTab) {
        return false;
      }

      // Grade filter
      if (gradeFilter !== 'all' && !act.gradeLevels.includes(gradeFilter)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = act.title.toLowerCase().includes(query);
        const matchSub = act.subtitle.toLowerCase().includes(query);
        const matchObj = act.objective.toLowerCase().includes(query);
        const matchCode = act.competencyCode.toLowerCase().includes(query);
        if (!matchTitle && !matchSub && !matchObj && !matchCode) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCompetencyTab, gradeFilter, searchQuery]);

  const handleStartDirectGame = (competencyId: Subject) => {
    soundEffects.playCorrect(soundVolume);
    onStartActivityCompetency(competencyId);
  };

  return (
    <div
      id="competency-activities-section"
      className="w-full bg-gradient-to-br from-indigo-50/90 via-sky-50/60 to-purple-50/60 rounded-3xl border-2 border-indigo-300 p-3 sm:p-5 shadow-sm transition-all relative overflow-hidden"
    >
      {/* Background glow circle */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-indigo-200/80">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
            🎯
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-slate-900 font-display">
                กิจกรรมเสริมสมรรถนะ (ฐานสมรรถนะ)
              </h3>
              <span className="bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                หลักสูตรประถม ป.1 - ป.3 🚀
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              18 กิจกรรมเน้นการลงมือปฏิบัติจริง เสริมสร้าง 6 สมรรถนะหลัก สำหรับ{' '}
              <strong className="text-indigo-900">{activeProfileName}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {onOpenFullModal && (
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                onOpenFullModal();
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="เปิดหน้าต่างกิจกรรมเต็มจอ"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>เปิดเต็มจอ</span>
            </button>
          )}

          <div className="bg-white text-indigo-900 text-xs font-black px-3 py-1.5 rounded-xl border border-indigo-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>ประเมินแล้ว {completedRecords.length}/18</span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setIsExpanded((v) => !v);
            }}
            className="w-8 h-8 rounded-xl bg-white hover:bg-indigo-100 text-indigo-800 flex items-center justify-center border border-indigo-200 transition-colors cursor-pointer shadow-2xs"
            title={isExpanded ? 'ย่อเนื้อหากิจกรรม' : 'ขยายเนื้อหากิจกรรม'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-3.5 space-y-3.5 animate-in fade-in duration-200">
          {/* Subheader Toolbar: Grade filter & Search */}
          <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
              <span className="text-slate-600 font-bold text-xs flex items-center gap-1 shrink-0 mr-1">
                <Filter className="w-3 h-3 text-indigo-500" />
                <span>ระดับชั้น:</span>
              </span>
              {(['all', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    setGradeFilter(g);
                  }}
                  className={`px-2.5 py-1 rounded-full font-black text-xs transition-all cursor-pointer ${
                    gradeFilter === g
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-indigo-50 border border-indigo-200'
                  }`}
                >
                  {g === 'all'
                    ? 'ทุกชั้นเรียน'
                    : g === 'P1'
                    ? 'ป.1'
                    : g === 'P2'
                    ? 'ป.2'
                    : g === 'P3'
                    ? 'ป.3'
                    : g === 'P4'
                    ? 'ป.4'
                    : g === 'P5'
                    ? 'ป.5'
                    : 'ป.6'}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหากิจกรรมเสริมสมรรถนะ..."
                className="w-full pl-8 pr-3 py-1.5 bg-white rounded-xl border border-indigo-200 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 shadow-2xs"
              />
            </div>
          </div>

          {/* 6 Competencies Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {COMPETENCY_CATEGORY_TABS.map((tab) => {
              const isActive = selectedCompetencyTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    setSelectedCompetencyTab(tab.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                      : 'bg-white hover:bg-indigo-50 text-slate-700 border-indigo-200'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Activity Cards Grid */}
          {filteredActivities.length === 0 ? (
            <div className="text-center py-10 bg-white/70 rounded-2xl border-2 border-dashed border-indigo-200 p-6 space-y-2">
              <Compass className="w-10 h-10 text-indigo-300 mx-auto" />
              <p className="text-xs font-bold text-slate-600">
                ไม่พบกิจกรรมที่ตรงกับเงื่อนไขการค้นหา
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCompetencyTab('all');
                  setGradeFilter('all');
                  setSearchQuery('');
                }}
                className="bg-indigo-600 text-white font-black px-3 py-1.5 rounded-xl text-xs hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                ล้างตัวกรอง
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {filteredActivities.map((act) => {
                const completedRecord = completedMap.get(act.id);
                const isDone = !!completedRecord;

                return (
                  <div
                    key={act.id}
                    className="bg-white rounded-2xl p-4 border-2 border-indigo-100 hover:border-indigo-300 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Top: Competency Badge & Status */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                            {act.icon}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-black text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                              {act.competencyCode} • {act.gradeLevels.join(', ')}
                            </span>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-indigo-800 transition-colors truncate mt-0.5">
                              {act.title}
                            </h4>
                          </div>
                        </div>

                        {isDone ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300 shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>ประเมินแล้ว</span>
                          </span>
                        ) : (
                          <span className="bg-amber-50 text-amber-900 text-[9px] font-black px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
                            พร้อมทำ 🌟
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-1 leading-relaxed">
                        {act.objective}
                      </p>

                      <div className="mt-2.5 flex items-center gap-2 text-[10px] text-slate-500 font-semibold flex-wrap">
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{act.totalDurationMinutes} นาที</span>
                        </span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                          📋 {act.steps.length} ขั้นตอน
                        </span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded-md truncate max-w-[200px]">
                          🎯 {act.assessmentRubric.indicator}
                        </span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      {onOpenFullModal ? (
                        <button
                          type="button"
                          onClick={onOpenFullModal}
                          className="text-xs font-black text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
                        >
                          <span>ดูวิธีจัดกิจกรรม</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-[11px] text-indigo-600 font-bold">
                          เน้นการลงมือปฏิบัติจริง
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleStartDirectGame(act.competencyId)}
                        className="bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-black py-1.5 px-3 rounded-xl text-xs flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>เริ่มทำข้อสอบ</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
