import React, { useState, useMemo } from 'react';
import {
  X,
  Play,
  Sparkles,
  BookOpen,
  Clock,
  HelpCircle,
  Eye,
  CheckCircle2,
  Award,
  ListChecks,
  PlusCircle,
  Sliders,
  RotateCcw,
  Zap,
  Search,
} from 'lucide-react';
import { ExamSet, Grade, Question, Subject, CurriculumMode } from '../types';
import { storageService } from '../services/storageService';
import { soundEffects } from '../services/audioService';
import { QUESTIONS } from '../data/questions';
import { getCurriculumTheme } from '../utils/curriculumTheme';

interface ExamSetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade: Grade;
  activeExamSetId: string | null;
  allQuestions: Question[];
  onSelectExamSet: (set: ExamSet | null) => void;
  onOpenTeacherBuilder: () => void;
  curriculumMode?: CurriculumMode;
}

export const ExamSetSelectorModal: React.FC<ExamSetSelectorModalProps> = ({
  isOpen,
  onClose,
  currentGrade,
  activeExamSetId,
  allQuestions,
  onSelectExamSet,
  onOpenTeacherBuilder,
  curriculumMode = 'early_childhood',
}) => {
  const currTheme = getCurriculumTheme(curriculumMode);
  const [filterGrade, setFilterGrade] = useState<Grade | 'all'>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'auto' | 'manual'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewingSet, setPreviewingSet] = useState<ExamSet | null>(null);

  const examSets = useMemo(() => {
    return storageService.getExamSets();
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredSets = examSets.filter((set) => {
    const matchGrade = filterGrade === 'all' || set.grade === 'all' || set.grade === filterGrade;
    const matchMode = filterMode === 'all' || set.generationMode === filterMode;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      !q ||
      set.title.toLowerCase().includes(q) ||
      (set.description && set.description.toLowerCase().includes(q));
    return matchGrade && matchMode && matchSearch;
  });

  const handleStartExam = (set: ExamSet) => {
    soundEffects.playTap(0.8);
    soundEffects.playVictory(0.6);
    onSelectExamSet(set);
    onClose();
  };

  const handleSwitchToFreePlay = () => {
    soundEffects.playTap(0.7);
    onSelectExamSet(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className={`bg-gradient-to-b from-amber-50 to-orange-50/60 w-full max-w-4xl rounded-3xl shadow-2xl border-4 ${currTheme.modalBorder} ring-2 ${currTheme.modalRing} overflow-hidden flex flex-col max-h-[92vh] my-auto`}>
        {/* Header Bar */}
        <div className={`${currTheme.modalHeaderBg} text-white p-4 sm:p-5 flex items-center justify-between shadow-md shrink-0 transition-colors`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner shrink-0">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  เลือกชุดข้อสอบสำหรับหนูน้อย
                </h2>
                <span className="hidden sm:inline-block bg-white/25 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                  Quiz Sets
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100 mt-0.5">
                เลือกทำชุดข้อสอบที่คุณครูหรือระบบจัดไว้ เพื่อฝึกฝนและประเมินพัฒนาการอย่างตรงจุด!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action & Filter Bar */}
        <div className="bg-white px-4 py-3 border-b border-amber-200 flex flex-col gap-2.5 shrink-0">
          <div className="flex items-center justify-between flex-wrap gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชื่อชุดข้อสอบ คำอธิบาย..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-bold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mode Filters & Teacher Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSwitchToFreePlay}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                  activeExamSetId === null
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs font-black'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
                title="กลับไปเล่นโหมดฝึกปกติแบบสุ่มทุกทักษะ"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>โหมดฝึกอิสระ</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenTeacherBuilder();
                }}
                className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-black flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>จัดชุดใหม่ (ครู)</span>
              </button>
            </div>
          </div>

          {/* Grade Filters */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100">
            <span className="text-xs font-black text-slate-500 mr-1 shrink-0">ระดับชั้น:</span>
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'K1', label: 'อ.1' },
              { id: 'K2', label: 'อ.2' },
              { id: 'K3', label: 'อ.3' },
              { id: 'P1', label: 'ป.1' },
              { id: 'P2', label: 'ป.2' },
              { id: 'P3', label: 'ป.3' },
              { id: 'P4', label: 'ป.4' },
              { id: 'P5', label: 'ป.5' },
              { id: 'P6', label: 'ป.6' },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setFilterGrade(g.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  filterGrade === g.id
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Current Active Banner (if any) */}
        {activeExamSetId && (
          <div className="bg-amber-500 text-white px-4 py-2 flex items-center justify-between text-xs sm:text-sm font-bold shadow-inner">
            <div className="flex items-center gap-2">
              <span className="text-base animate-pulse">🌟</span>
              <span>
                กำลังเล่นชุดข้อสอบ: <span className="underline font-black">{examSets.find((s) => s.id === activeExamSetId)?.title || 'ชุดข้อสอบ'}</span>
              </span>
            </div>
            <button
              onClick={handleSwitchToFreePlay}
              className="bg-white text-amber-900 text-[11px] font-black px-2.5 py-0.5 rounded-lg hover:bg-amber-50 cursor-pointer transition-all"
            >
              ยกเลิก / กลับโหมดอิสระ
            </button>
          </div>
        )}

        {/* Exam Sets Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSets.map((set) => {
              const isActive = activeExamSetId === set.id;
              return (
                <div
                  key={set.id}
                  className={`bg-white rounded-3xl p-5 border-3 transition-all flex flex-col justify-between shadow-xs hover:shadow-lg relative overflow-hidden group ${
                    isActive
                      ? 'border-amber-500 ring-3 ring-amber-300 bg-amber-50/20'
                      : 'border-slate-200 hover:border-amber-400'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl shadow-xs">
                      กำลังเล่นชุดนี้อยู่ ✨
                    </div>
                  )}

                  <div>
                    {/* Tags row */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                          set.generationMode === 'auto'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-sky-50 text-sky-800 border-sky-200'
                        }`}
                      >
                        {set.generationMode === 'auto' ? '🤖 สุ่มอัตโนมัติ' : '✍️ จัดโดยคุณครู'}
                      </span>

                      <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                        {set.grade === 'all' ? 'ทุกระดับชั้น' : `อนุบาล ${set.grade.replace('K', '')}`}
                      </span>

                      {set.isPreset && (
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          ⭐ แนะนำ
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-black text-slate-800 group-hover:text-amber-600 transition-colors leading-snug">
                      {set.title}
                    </h3>

                    {/* Description */}
                    {set.description && (
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {set.description}
                      </p>
                    )}

                    {/* Stats pills */}
                    <div className="flex items-center gap-3 text-xs font-black text-slate-600 mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1 text-amber-600">
                        <HelpCircle className="w-4 h-4" />
                        <span>{set.questionCount || set.questionIds.length} คำถาม</span>
                      </div>
                      <div className="flex items-center gap-1 text-sky-600">
                        <Clock className="w-4 h-4" />
                        <span>~{set.estimatedMinutes || 4} นาที</span>
                      </div>
                      <div className="text-[11px] text-slate-400 ml-auto font-normal">
                        {set.createdBy || 'คุณครู'}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleStartExam(set)}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{isActive ? 'เล่นต่อจากเดิม' : 'เริ่มทำชุดนี้เลย! 🚀'}</span>
                    </button>

                    <button
                      onClick={() => setPreviewingSet(set)}
                      className="p-3 text-slate-600 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 rounded-2xl transition-colors cursor-pointer"
                      title="ดูตัวอย่างคำถามในชุดนี้"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSets.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <span className="text-4xl">📚</span>
              <h4 className="text-base font-black text-slate-700 mt-2">
                ยังไม่มีชุดข้อสอบในหมวดนี้
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                คลิกปุ่ม "จัดชุดใหม่ (ครู)" ด้านบนเพื่อสร้างชุดข้อสอบแบบอัตโนมัติหรือแบบแมนนวล
              </p>
            </div>
          )}
        </div>

        {/* Question Preview Sub-Modal */}
        {previewingSet && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white rounded-3xl p-5 max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl border-2 border-slate-200 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👁️</span>
                    <h3 className="text-base font-black text-slate-800">
                      {previewingSet.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ตัวอย่างรายการข้อสอบ {previewingSet.questionIds.length} ข้อ
                  </p>
                </div>
                <button
                  type="button"
                  id="btn-close-exam-set-preview"
                  onClick={() => setPreviewingSet(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto py-3 space-y-2 flex-1 pr-1">
                {(() => {
                  const resolvedQuestions = previewingSet.questionIds
                    .map((qId) => allQuestions.find((item) => item.id === qId) || QUESTIONS.find((item) => item.id === qId))
                    .filter((q): q is Question => Boolean(q));

                  if (resolvedQuestions.length === 0) {
                    return (
                      <div className="py-8 text-center text-slate-500 space-y-2">
                        <div className="text-3xl">📝</div>
                        <p className="text-xs font-bold">ไม่พบรายละเอียดข้อสอบสำหรับชุดนี้</p>
                      </div>
                    );
                  }

                  return resolvedQuestions.map((q, idx) => (
                    <div key={`${q.id}_${idx}`} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-black flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xl shrink-0">{q.illustration.slice(0, 4)}</span>
                        <span className="font-bold text-slate-800 truncate">
                          {q.question.th}
                        </span>
                      </div>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-bold shrink-0">
                        {q.grade}
                      </span>
                    </div>
                  ));
                })()}
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewingSet(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  ปิดตัวอย่าง
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleStartExam(previewingSet);
                    setPreviewingSet(null);
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-black py-2.5 px-5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>เริ่มทำชุดนี้ทันที!</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
