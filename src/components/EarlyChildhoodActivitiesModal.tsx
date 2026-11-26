import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Play,
  Star,
  Clock,
  Search,
  Filter,
  Layers,
  Award,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { EarlyChildhoodActivity, Grade, Subject, VoicePersona } from '../types';
import { EARLY_CHILDHOOD_ACTIVITIES } from '../data/earlyChildhoodActivities';
import { soundEffects } from '../services/audioService';
import { storageService, Completed8SkillActivityRecord } from '../services/storageService';
import { EarlyChildhoodActivityDetailModal } from './EarlyChildhoodActivityDetailModal';

interface EarlyChildhoodActivitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export const EarlyChildhoodActivitiesModal: React.FC<EarlyChildhoodActivitiesModalProps> = ({
  isOpen,
  onClose,
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
    if (isOpen) {
      loadCompletedRecords();
    }
  }, [isOpen, activeProfileId]);

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
    onClose();
    onStartActivitySkill(skillId);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-3 sm:pt-6 md:pt-8 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 my-auto sm:my-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-4 sm:p-5 text-white relative shrink-0 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl sm:text-3xl shadow-inner shrink-0">
                🌟
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-xl md:text-2xl font-black font-display tracking-tight text-white drop-shadow-xs">
                    รายการกิจกรรมพัฒนา 8 ทักษะ
                  </h2>
                  <span className="bg-white text-rose-700 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                    หลักสูตรปฐมวัย 24 กิจกรรม ✨
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-100 font-medium">
                  กิจกรรมแบบปฏิบัติจริง (Hands-on) ครบ 8 ด้าน สำหรับ {activeProfileName} (อ.1 - อ.3)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader Toolbar: Grade filter, Search, and Completed Count */}
          <div className="bg-amber-50/80 px-4 py-3 border-b border-amber-200 flex flex-col sm:flex-row gap-2.5 items-center justify-between shrink-0">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-black text-amber-950 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-amber-700" />
                <span>ระดับชั้น:</span>
              </span>
              <div className="flex items-center gap-1 overflow-x-auto text-xs">
                {(['all', 'K1', 'K2', 'K3'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      setGradeFilter(g);
                    }}
                    className={`px-3 py-1 rounded-full font-black transition-all cursor-pointer ${
                      gradeFilter === g
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    {g === 'all'
                      ? 'ทุกระดับชั้น'
                      : g === 'K1'
                      ? 'อนุบาล 1'
                      : g === 'K2'
                      ? 'อนุบาล 2'
                      : 'อนุบาล 3'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="relative w-full sm:w-48">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหากิจกรรม..."
                  className="w-full pl-8 pr-3 py-1 bg-white rounded-xl border border-amber-200 text-xs text-slate-700 focus:outline-none focus:border-amber-500 shadow-2xs"
                />
              </div>

              <div className="bg-white text-emerald-800 text-xs font-black px-2.5 py-1 rounded-xl border border-emerald-300 shrink-0 shadow-2xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>สำเร็จ {completedRecords.length}/24</span>
              </div>
            </div>
          </div>

          {/* 8 Skill Category Tabs */}
          <div className="bg-white px-3 py-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            {SKILL_CATEGORY_TABS.map((tab) => {
              const isActive = selectedSkillTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    setSelectedSkillTab(tab.id);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Activities Cards Grid */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 min-h-0 bg-slate-50/60">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-amber-200 p-6 space-y-2">
                <Compass className="w-10 h-10 text-amber-300 mx-auto" />
                <p className="text-sm font-bold text-slate-600">
                  ไม่พบกิจกรรมที่ตรงกับการค้นหา
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSkillTab('all');
                    setGradeFilter('all');
                    setSearchQuery('');
                  }}
                  className="bg-amber-500 text-white font-black px-3 py-1.5 rounded-xl text-xs hover:bg-amber-600 transition-colors cursor-pointer"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {filteredActivities.map((act) => {
                  const isDone = completedMap.has(act.id);

                  return (
                    <div
                      key={act.id}
                      onClick={() => handleOpenDetail(act)}
                      className="bg-white rounded-2xl p-4 border-2 border-amber-200/90 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                              {act.icon}
                            </div>
                            <div className="min-w-0">
                              <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                                ทักษะ: {act.skillNameTh}
                              </span>
                              <h4 className="text-sm font-black text-slate-900 group-hover:text-amber-800 transition-colors truncate mt-0.5">
                                {act.title}
                              </h4>
                            </div>
                          </div>

                          {isDone ? (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300 shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              สำเร็จแล้ว ⭐⭐⭐
                            </span>
                          ) : (
                            <span className="bg-amber-50 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
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
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                            🎯 แบบฝึกหัด {act.interactiveQuestionsCount} ข้อ
                          </span>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-amber-700 group-hover:text-amber-900 flex items-center gap-1">
                          <span>ดูวิธีทำกิจกรรม</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartDirectSkillGame(act.skillId);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-1.5 px-3 rounded-xl text-xs flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
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

          {/* Footer */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
            <span className="font-medium">
              💡 กิจกรรมเน้นการเรียนรู้ผ่านการลงมือทำจริง (Learning through Play)
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer transition-colors"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <EarlyChildhoodActivityDetailModal
          activity={selectedActivity}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedActivity(null);
            loadCompletedRecords();
          }}
          onStartActivityGame={(skillId) => {
            setIsDetailModalOpen(false);
            setSelectedActivity(null);
            onClose();
            onStartActivitySkill(skillId);
          }}
          activeProfileName={activeProfileName}
          activeProfileId={activeProfileId}
          soundVolume={soundVolume}
          voicePersona={voicePersona}
          onActivityCompleted={loadCompletedRecords}
        />
      )}
    </>
  );
};
