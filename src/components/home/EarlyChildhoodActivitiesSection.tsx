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
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { EarlyChildhoodActivity, Grade, Subject, VoicePersona } from '../../types';
import { EARLY_CHILDHOOD_ACTIVITIES } from '../../data/earlyChildhoodActivities';
import { soundEffects } from '../../services/audioService';
import { storageService, Completed8SkillActivityRecord } from '../../services/storageService';
import { EarlyChildhoodActivityDetailModal } from '../EarlyChildhoodActivityDetailModal';

interface EarlyChildhoodActivitiesSectionProps {
  currentGrade: Grade;
  activeProfileName: string;
  activeProfileId?: string;
  onStartActivitySkill: (skillId: Subject) => void;
  soundVolume?: number;
  voicePersona?: VoicePersona;
}

const SKILL_CATEGORY_TABS: {
  id: Subject | 'all';
  name: string;
  shortName: string;
  icon: string;
  badgeBg: string;
  badgeText: string;
}[] = [
  { id: 'all', name: 'ทั้งหมด (24)', shortName: 'ทั้งหมด', icon: '🌟', badgeBg: 'bg-amber-100', badgeText: 'text-amber-900' },
  { id: 'literacy', name: '1. ภาษาและการรู้หนังสือ', shortName: 'ภาษาไทย', icon: '📖', badgeBg: 'bg-rose-100', badgeText: 'text-rose-900' },
  { id: 'math', name: '2. คิดรวบยอดและคำนวณ', shortName: 'คณิตศาสตร์', icon: '🔢', badgeBg: 'bg-amber-100', badgeText: 'text-amber-900' },
  { id: 'problem_solving', name: '3. คิดแก้ปัญหาและตัดสินใจ', shortName: 'แก้ปัญหา', icon: '🧩', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-900' },
  { id: 'inquiry', name: '4. แสวงหาความรู้/วิทย์', shortName: 'วิทยาศาสตร์', icon: '🔬', badgeBg: 'bg-teal-100', badgeText: 'text-teal-900' },
  { id: 'creativity', name: '5. จินตนาการและความคิดสร้างสรรค์', shortName: 'สร้างสรรค์', icon: '🎨', badgeBg: 'bg-purple-100', badgeText: 'text-purple-900' },
  { id: 'physical_health', name: '6. สุขภาวะและการเคลื่อนไหว', shortName: 'สุขภาวะ', icon: '🏃', badgeBg: 'bg-sky-100', badgeText: 'text-sky-900' },
  { id: 'socio_emotional', name: '7. อารมณ์ จิตใจ และสังคม', shortName: 'อารมณ์สังคม', icon: '💖', badgeBg: 'bg-pink-100', badgeText: 'text-pink-900' },
  { id: 'citizenship', name: '8. ความเป็นพลเมืองและความเป็นไทย', shortName: 'พลเมืองไทย', icon: '🇹🇭', badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-900' },
];

export const EarlyChildhoodActivitiesSection: React.FC<EarlyChildhoodActivitiesSectionProps> = ({
  currentGrade,
  activeProfileName,
  activeProfileId,
  onStartActivitySkill,
  soundVolume = 0.6,
  voicePersona = 'child_girl',
}) => {
  const [selectedSkillTab, setSelectedSkillTab] = useState<Subject | 'all'>('all');
  const [gradeFilter, setGradeFilter] = useState<'all' | 'K1' | 'K2' | 'K3'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  // Selected Activity for Detail Modal
  const [selectedActivity, setSelectedActivity] = useState<EarlyChildhoodActivity | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Completed records tracking
  const [completedRecords, setCompletedRecords] = useState<Completed8SkillActivityRecord[]>([]);

  const loadCompletedRecords = () => {
    if (activeProfileId) {
      setCompletedRecords(storageService.getCompleted8SkillActivities(activeProfileId));
    } else {
      setCompletedRecords(storageService.getCompleted8SkillActivities());
    }
  };

  useEffect(() => {
    loadCompletedRecords();
  }, [activeProfileId]);

  // Set gradeFilter to match currentGrade if it is early childhood
  useEffect(() => {
    if (currentGrade === 'K1' || currentGrade === 'K2' || currentGrade === 'K3') {
      setGradeFilter(currentGrade);
    }
  }, [currentGrade]);

  const completedMap = useMemo(() => {
    const map = new Set<string>();
    completedRecords.forEach((r) => map.add(r.activityId));
    return map;
  }, [completedRecords]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return EARLY_CHILDHOOD_ACTIVITIES.filter((act) => {
      // Skill filter
      if (selectedSkillTab !== 'all') {
        if (selectedSkillTab === 'literacy' && act.skillId !== 'literacy' && act.skillId !== 'thai') {
          return false;
        } else if (act.skillId !== selectedSkillTab) {
          return false;
        }
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
        const matchSkill = act.skillNameTh.toLowerCase().includes(query);
        const matchObj = act.objective.toLowerCase().includes(query);
        if (!matchTitle && !matchSub && !matchSkill && !matchObj) {
          return false;
        }
      }

      return true;
    });
  }, [selectedSkillTab, gradeFilter, searchQuery]);

  const handleOpenDetail = (activity: EarlyChildhoodActivity) => {
    soundEffects.playTap(soundVolume);
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleStartDirectSkillGame = (skillId: Subject) => {
    soundEffects.playCorrect(soundVolume);
    onStartActivitySkill(skillId);
  };

  const totalCompletedCount = completedRecords.length;

  return (
    <div
      id="early-childhood-activities-section"
      className="w-full bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-rose-50/60 rounded-3xl border-2 border-amber-300 p-3 sm:p-5 shadow-sm transition-all relative overflow-hidden"
    >
      {/* Background glow circle */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
            🌟
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>กิจกรรมพัฒนา 8 ทักษะ (หลักสูตรปฐมวัย)</span>
                <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full shadow-2xs">
                  เลือกทำได้ทันที ✨
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              กิจกรรมส่งเสริมพัฒนาการครบ 8 ด้าน สำหรับ <strong className="text-amber-950 font-bold">{activeProfileName}</strong> • เลือกฝึกฝนหรือดูขั้นตอนลงมือปฏิบัติได้ทันที
            </p>
          </div>
        </div>

        {/* Progress Badge & Collapse Button */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <div className="flex items-center gap-1.5 bg-white border border-amber-300 px-3 py-1.5 rounded-2xl shadow-2xs">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black text-slate-800">
              พิชิตแล้ว: <span className="text-emerald-700">{totalCompletedCount}</span>/24 กิจกรรม
            </span>
            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-1.5 py-0.2 rounded-full">
              ⭐ {totalCompletedCount * 3} ดาว
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 cursor-pointer transition-all shadow-2xs"
            title={isExpanded ? 'ย่อเนื้อหา' : 'ขยายเนื้อหา'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3.5 relative z-10 animate-in fade-in duration-200">
          {/* Controls Bar: Skill Category Pills, Grade Filter, Search */}
          <div className="space-y-2.5">
            {/* Skill Category Tabs Scrollable */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
              {SKILL_CATEGORY_TABS.map((tab) => {
                const isSelected = selectedSkillTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      setSelectedSkillTab(tab.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs scale-102'
                        : 'bg-white hover:bg-amber-100/70 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-Filters: Grade Selector & Search Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
              {/* Grade Filter Pill buttons */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs shrink-0">
                <span className="text-[10px] font-bold text-slate-400 px-1.5 hidden sm:inline">ระดับชั้น:</span>
                {(['all', 'K1', 'K2', 'K3'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      setGradeFilter(g);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      gradeFilter === g
                        ? 'bg-amber-500 text-white font-black shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {g === 'all' ? 'ทุกระดับ' : g === 'K1' ? 'อ.1 (3-4 ปี)' : g === 'K2' ? 'อ.2 (4-5 ปี)' : 'อ.3 (5-6 ปี)'}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative flex-1 max-w-xs">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหากิจกรรม เช่น พยัญชนะ, รูปทรง, สะพาน..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-400 shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredActivities.map((act) => {
              const isDone = completedMap.has(act.id);

              return (
                <div
                  key={act.id}
                  className={`rounded-2xl p-3.5 border-2 transition-all flex flex-col justify-between gap-3 relative shadow-xs hover:shadow-md ${
                    isDone
                      ? 'bg-emerald-50/80 border-emerald-300'
                      : 'bg-white border-amber-200/90 hover:border-amber-300'
                  }`}
                >
                  {/* Top Header inside Card */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-2xs border ${
                            isDone ? 'bg-emerald-100 border-emerald-300' : 'bg-amber-100 border-amber-300'
                          }`}
                        >
                          {act.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                            ทักษะที่ {act.skillCode}: {act.skillNameTh}
                          </span>
                          <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug mt-0.5 line-clamp-1">
                            {act.title}
                          </h3>
                        </div>
                      </div>

                      {isDone ? (
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>พิชิตแล้ว ⭐</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0 flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" /> {act.totalDurationMinutes}น.
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {act.subtitle}
                    </p>

                    {/* Fun Challenge preview */}
                    <div className="mt-2 bg-amber-50/70 rounded-xl p-2 border border-amber-200/70 text-[11px] text-amber-950 font-medium flex items-start gap-1.5">
                      <span className="text-amber-600 shrink-0">🎯</span>
                      <span className="line-clamp-1"><strong>ภารกิจ:</strong> {act.funChallenge}</span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    {/* View Guide Steps Modal */}
                    <button
                      type="button"
                      onClick={() => handleOpenDetail(act)}
                      className="flex-1 py-1.5 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-98"
                      title="ดูขั้นตอนและแนวทางจัดกิจกรรมสำหรับเด็กและผู้ปกครอง"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span>ขั้นตอน</span>
                    </button>

                    {/* Quick Play: Launch Directly into Game */}
                    <button
                      type="button"
                      id={`btn-play-activity-${act.id}`}
                      onClick={() => handleStartDirectSkillGame(act.skillId)}
                      className="flex-2 py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-98"
                      title={`เริ่มเล่นแบบทดสอบฝึกทักษะ ${act.skillNameTh} ทันที`}
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>เริ่มฝึกทักษะนี้ →</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-8 bg-white rounded-2xl border border-slate-200">
              <span className="text-3xl block mb-2">🔍</span>
              <p className="text-xs font-bold text-slate-600">
                ไม่พบกิจกรรมที่ตรงกับเงื่อนไขการค้นหา
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedSkillTab('all');
                  setGradeFilter('all');
                  setSearchQuery('');
                }}
                className="mt-2 text-xs font-bold text-amber-600 underline cursor-pointer"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}
        </div>
      )}

      {/* Activity Step-by-Step Detail & Mission Modal */}
      <EarlyChildhoodActivityDetailModal
        activity={selectedActivity}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedActivity(null);
        }}
        onStartActivityGame={handleStartDirectSkillGame}
        activeProfileName={activeProfileName}
        activeProfileId={activeProfileId}
        soundVolume={soundVolume}
        voicePersona={voicePersona}
        onActivityCompleted={loadCompletedRecords}
      />
    </div>
  );
};
