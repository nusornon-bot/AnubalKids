import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Sparkles,
  ListChecks,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Play,
  CheckCircle2,
  RefreshCw,
  Cloud,
  Download,
  Upload,
  Search,
  Clock,
  Shuffle,
  ChevronRight,
  Eye,
  BookOpen,
  HelpCircle,
  AlertCircle,
  FolderPlus,
  Sliders,
} from 'lucide-react';
import { ExamSet, ExamGenerationMode, Grade, Question, Subject } from '../types';
import { storageService } from '../services/storageService';
import { saveExamSetToCloud, deleteExamSetFromCloud, syncHybridExamSets } from '../services/cloudSyncService';
import { soundEffects } from '../services/audioService';
import { QUESTIONS } from '../data/questions';

interface ExamSetBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  allQuestions: Question[];
  currentGrade: Grade;
  onSelectAndPlayExamSet: (set: ExamSet) => void;
  onOpenAIGenerator?: () => void;
}

const ALL_SUBJECTS: { id: Subject; nameTh: string; icon: string; color: string }[] = [
  { id: 'literacy', nameTh: '1. ภาษาและการรู้หนังสือ', icon: '📖', color: 'border-rose-300 bg-rose-50 text-rose-800' },
  { id: 'thai', nameTh: 'ภาษาไทย (ก-ฮ & สระ)', icon: '🇹🇭', color: 'border-pink-300 bg-pink-50 text-pink-800' },
  { id: 'english', nameTh: 'ภาษาอังกฤษ (Alphabet & Phonics)', icon: '🔤', color: 'border-sky-300 bg-sky-50 text-sky-800' },
  { id: 'math', nameTh: '2. การคิดรวบยอดและคำนวณ', icon: '🧮', color: 'border-blue-300 bg-blue-50 text-blue-800' },
  { id: 'problem_solving', nameTh: '3. การคิดแก้ปัญหาและตัดสินใจ', icon: '🧩', color: 'border-amber-300 bg-amber-50 text-amber-800' },
  { id: 'inquiry', nameTh: '4. การแสวงหาความรู้', icon: '🔬', color: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
  { id: 'creativity', nameTh: '5. จินตนาการและความคิดสร้างสรรค์', icon: '🎨', color: 'border-purple-300 bg-purple-50 text-purple-800' },
  { id: 'physical_health', nameTh: '6. ด้านสุขภาวะทางกาย', icon: '🏃', color: 'border-teal-300 bg-teal-50 text-teal-800' },
  { id: 'socio_emotional', nameTh: '7. ด้านอารมณ์ จิตใจ และสังคม', icon: '❤️', color: 'border-pink-300 bg-pink-50 text-pink-800' },
  { id: 'citizenship', nameTh: '8. ความเป็นพลเมืองและความเป็นไทย', icon: '🇹🇭', color: 'border-orange-300 bg-orange-50 text-orange-800' },
  // 10 หน่วยการแจกลูกสะกดคำ สพฐ. (ป.1 - ป.6)
  { id: 'phonics_consonant', nameTh: 'หน่วย ๑: รูปและเสียงพยัญชนะ', icon: '🔤', color: 'border-amber-300 bg-amber-50 text-amber-800' },
  { id: 'phonics_vowel', nameTh: 'หน่วย ๒: รูปและเสียงสระ', icon: '🅰️', color: 'border-sky-300 bg-sky-50 text-sky-800' },
  { id: 'phonics_tone', nameTh: 'หน่วย ๓: รูปและเสียงวรรณยุกต์', icon: '🎵', color: 'border-rose-300 bg-rose-50 text-rose-800' },
  { id: 'phonics_korkaa', nameTh: 'หน่วย ๔: แจกลูกสะกดคำแม่ ก กา', icon: '📖', color: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
  { id: 'phonics_tone_korkaa', nameTh: 'หน่วย ๕: ผันวรรณยุกต์แม่ ก กา', icon: '🎼', color: 'border-indigo-300 bg-indigo-50 text-indigo-800' },
  { id: 'phonics_direct_spelling', nameTh: 'หน่วย ๖: ตัวสะกดตรงตามมาตรา', icon: '🎯', color: 'border-teal-300 bg-teal-50 text-teal-800' },
  { id: 'phonics_tone_spelling', nameTh: 'หน่วย ๗: ผันวรรณยุกต์ตรงตามมาตรา', icon: '📊', color: 'border-violet-300 bg-violet-50 text-violet-800' },
  { id: 'phonics_indirect_spelling', nameTh: 'หน่วย ๘: ตัวสะกดไม่ตรงตามมาตรา', icon: '🔍', color: 'border-cyan-300 bg-cyan-50 text-cyan-800' },
  { id: 'phonics_cluster', nameTh: 'หน่วย ๙: แจกลูกคำที่มีอักษรควบ', icon: '👥', color: 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-800' },
  { id: 'phonics_leading_consonant', nameTh: 'หน่วย ๑๐: แจกลูกคำที่มีอักษรนำ', icon: '👑', color: 'border-orange-300 bg-orange-50 text-orange-800' },
];

export const ExamSetBuilderModal: React.FC<ExamSetBuilderModalProps> = ({
  isOpen,
  onClose,
  allQuestions,
  currentGrade,
  onSelectAndPlayExamSet,
  onOpenAIGenerator,
}) => {
  const [activeTab, setActiveTab] = useState<'manage' | 'auto' | 'manual'>('manage');
  const [examSets, setExamSets] = useState<ExamSet[]>(() => storageService.getExamSets());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [previewingSet, setPreviewingSet] = useState<ExamSet | null>(null);

  // --- Auto Generator State ---
  const [autoTitle, setAutoTitle] = useState('');
  const [autoDesc, setAutoDesc] = useState('');
  const [autoGrade, setAutoGrade] = useState<Grade | 'all'>(currentGrade);
  const [autoSubjects, setAutoSubjects] = useState<Subject[]>([
    'literacy',
    'math',
    'problem_solving',
    'inquiry',
    'creativity',
    'physical_health',
    'socio_emotional',
    'citizenship',
  ]);
  const [autoDifficulty, setAutoDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('mixed');
  const [autoQuestionCount, setAutoQuestionCount] = useState<number>(8);
  const [generatedQuestionIds, setGeneratedQuestionIds] = useState<string[]>([]);

  // --- Manual Builder State ---
  const [manualTitle, setManualTitle] = useState('');
  const [manualDesc, setManualDesc] = useState('');
  const [manualGrade, setManualGrade] = useState<Grade | 'all'>(currentGrade);
  const [manualSearch, setManualSearch] = useState('');
  const [manualFilterSubject, setManualFilterSubject] = useState<Subject | 'all'>('all');
  const [manualFilterGrade, setManualFilterGrade] = useState<Grade | 'all'>(currentGrade);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [editingSetId, setEditingSetId] = useState<string | null>(null);

  // Manage tab filters
  const [manageSearch, setManageSearch] = useState('');
  const [manageFilterGrade, setManageFilterGrade] = useState<Grade | 'all'>('all');

  const filteredManageSets = useMemo(() => {
    return examSets.filter((set) => {
      const matchGrade = manageFilterGrade === 'all' || set.grade === 'all' || set.grade === manageFilterGrade;
      const q = manageSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        set.title.toLowerCase().includes(q) ||
        (set.description && set.description.toLowerCase().includes(q));
      return matchGrade && matchSearch;
    });
  }, [examSets, manageFilterGrade, manageSearch]);

  // Filter questions for manual picker (must be called unconditionally)
  const filteredQuestionsForManual = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchGrade = manualFilterGrade === 'all' || q.grade === manualFilterGrade;
      const matchSubject = manualFilterSubject === 'all' || q.subject === manualFilterSubject;
      const matchSearch =
        !manualSearch.trim() ||
        q.question.th.toLowerCase().includes(manualSearch.toLowerCase()) ||
        q.explanation.th.toLowerCase().includes(manualSearch.toLowerCase());
      return matchGrade && matchSubject && matchSearch;
    });
  }, [allQuestions, manualFilterGrade, manualFilterSubject, manualSearch]);

  // Sync exam sets from storage whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setExamSets(storageService.getExamSets());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const refreshSets = () => {
    setExamSets(storageService.getExamSets());
  };

  // --- Auto Generation Algorithm ---
  const handleGenerateAutoQuestions = () => {
    soundEffects.playTap(0.7);

    // 1. Filter pool of candidates
    const candidates = allQuestions.filter((q) => {
      const matchGrade = autoGrade === 'all' || q.grade === autoGrade;
      const matchSubject = autoSubjects.includes(q.subject);
      const matchDiff =
        autoDifficulty === 'mixed'
          ? true
          : autoDifficulty === 'easy'
          ? q.difficulty === 1
          : autoDifficulty === 'medium'
          ? q.difficulty === 2
          : q.difficulty === 3;
      return matchGrade && matchSubject && matchDiff;
    });

    if (candidates.length === 0) {
      showToast('⚠️ ไม่พบข้อสอบที่ตรงกับเงื่อนไขที่เลือก กรุณาปรับเปลี่ยนระดับชั้นหรือวิชา');
      return;
    }

    // 2. Balanced distribution per subject
    const subjectBuckets: Record<string, Question[]> = {};
    autoSubjects.forEach((s) => (subjectBuckets[s] = []));
    candidates.forEach((q) => {
      if (subjectBuckets[q.subject]) {
        subjectBuckets[q.subject].push(q);
      }
    });

    // Shuffle within each bucket
    Object.keys(subjectBuckets).forEach((s) => {
      subjectBuckets[s].sort(() => Math.random() - 0.5);
    });

    const chosenIds: string[] = [];
    let cycleIndex = 0;
    const activeSubjectKeys = autoSubjects.filter((s) => (subjectBuckets[s]?.length || 0) > 0);

    if (activeSubjectKeys.length === 0) {
      // Fallback: pick randomly from all candidates
      const shuffled = [...candidates].sort(() => Math.random() - 0.5);
      setGeneratedQuestionIds(shuffled.slice(0, autoQuestionCount).map((q) => q.id));
      showToast(`🎲 สุ่มเลือกข้อสอบได้ ${Math.min(shuffled.length, autoQuestionCount)} ข้อเรียบร้อยแล้ว!`);
      return;
    }

    while (chosenIds.length < autoQuestionCount) {
      const subj = activeSubjectKeys[cycleIndex % activeSubjectKeys.length];
      const bucket = subjectBuckets[subj];
      if (bucket && bucket.length > 0) {
        const q = bucket.pop()!;
        if (!chosenIds.includes(q.id)) {
          chosenIds.push(q.id);
        }
      }

      // Check if all buckets empty
      const remainingCount = activeSubjectKeys.reduce((acc, k) => acc + (subjectBuckets[k]?.length || 0), 0);
      if (remainingCount === 0) break;

      cycleIndex++;
    }

    setGeneratedQuestionIds(chosenIds);
    showToast(`🎲 สุ่มชุดข้อสอบสมดุล ${chosenIds.length} ข้อสำเร็จ! ตรวจสอบพรีวิวด้านล่างได้เลย`);
  };

  const handleSaveAutoExamSet = async () => {
    if (!autoTitle.trim()) {
      showToast('⚠️ กรุณาระบุชื่อชุดข้อสอบ');
      return;
    }
    if (generatedQuestionIds.length === 0) {
      showToast('⚠️ กรุณากด "สุ่มจัดชุดข้อสอบ" ก่อนบันทึก');
      return;
    }

    const newSet: Omit<ExamSet, 'id'> = {
      title: autoTitle.trim(),
      description: autoDesc.trim() || `ชุดข้อสอบสุ่มอัตโนมัติ ${generatedQuestionIds.length} ข้อ ครอบคลุม ${autoSubjects.length} ทักษะ`,
      grade: autoGrade,
      subjects: autoSubjects,
      questionIds: generatedQuestionIds,
      questionCount: generatedQuestionIds.length,
      generationMode: 'auto',
      difficulty: autoDifficulty,
      estimatedMinutes: Math.ceil(generatedQuestionIds.length * 0.5),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'คุณครู (ระบบอัตโนมัติ)',
      isPreset: false,
      tags: [autoGrade === 'all' ? 'ทุกชั้น' : autoGrade, 'อัตโนมัติ', `${generatedQuestionIds.length} ข้อ`],
    };

    const saved = storageService.addExamSet(newSet);
    refreshSets();

    // Auto-sync to cloud
    saveExamSetToCloud(saved).catch(() => {});

    soundEffects.playVictory(0.7);
    showToast('✨ บันทึกชุดข้อสอบอัตโนมัติเรียบร้อยและซิงค์คลาวด์แล้ว!');
    setActiveTab('manage');
    setAutoTitle('');
    setAutoDesc('');
    setGeneratedQuestionIds([]);
  };

  // --- Manual Builder Handlers ---
  const handleToggleQuestionInManual = (qId: string) => {
    soundEffects.playTap(0.5);
    setSelectedQuestionIds((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const handleSaveManualExamSet = async () => {
    if (!manualTitle.trim()) {
      showToast('⚠️ กรุณาระบุชื่อชุดข้อสอบ');
      return;
    }
    if (selectedQuestionIds.length === 0) {
      showToast('⚠️ กรุณาเลือกข้อสอบอย่างน้อย 1 ข้อ');
      return;
    }

    // Determine subjects covered
    const selectedQuestions = allQuestions.filter((q) => selectedQuestionIds.includes(q.id));
    const coveredSubjects = Array.from(new Set(selectedQuestions.map((q) => q.subject))) as Subject[];

    if (editingSetId) {
      const updated = storageService.updateExamSet(editingSetId, {
        title: manualTitle.trim(),
        description: manualDesc.trim(),
        grade: manualGrade,
        subjects: coveredSubjects,
        questionIds: selectedQuestionIds,
        questionCount: selectedQuestionIds.length,
        updatedAt: new Date().toISOString(),
      });
      if (updated) {
        saveExamSetToCloud(updated).catch(() => {});
        showToast('✏️ แก้ไขชุดข้อสอบเรียบร้อยแล้ว!');
      }
    } else {
      const newSet: Omit<ExamSet, 'id'> = {
        title: manualTitle.trim(),
        description: manualDesc.trim() || `ชุดข้อสอบคัดเลือกโดยครูผู้สอน ${selectedQuestionIds.length} ข้อ`,
        grade: manualGrade,
        subjects: coveredSubjects,
        questionIds: selectedQuestionIds,
        questionCount: selectedQuestionIds.length,
        generationMode: 'manual',
        difficulty: 'mixed',
        estimatedMinutes: Math.ceil(selectedQuestionIds.length * 0.5),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'คุณครู (คัดเลือกเอง)',
        isPreset: false,
        tags: [manualGrade === 'all' ? 'ทุกชั้น' : manualGrade, 'จัดเอง', `${selectedQuestionIds.length} ข้อ`],
      };

      const saved = storageService.addExamSet(newSet);
      saveExamSetToCloud(saved).catch(() => {});
      showToast('✨ บันทึกชุดข้อสอบคัดเลือกเองเรียบร้อยแล้ว!');
    }

    refreshSets();
    soundEffects.playVictory(0.7);
    setActiveTab('manage');
    setManualTitle('');
    setManualDesc('');
    setSelectedQuestionIds([]);
    setEditingSetId(null);
  };

  const handleEditSet = (set: ExamSet) => {
    setEditingSetId(set.id);
    setManualTitle(set.title);
    setManualDesc(set.description || '');
    setManualGrade(set.grade);
    setSelectedQuestionIds([...set.questionIds]);
    setActiveTab('manual');
  };

  const handleDuplicateSet = (set: ExamSet) => {
    const duplicated: Omit<ExamSet, 'id'> = {
      ...set,
      title: `${set.title} (สำเนา)`,
      isPreset: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const saved = storageService.addExamSet(duplicated);
    saveExamSetToCloud(saved).catch(() => {});
    refreshSets();
    showToast(`📋 คัดลอก "${set.title}" เรียบร้อยแล้ว`);
  };

  const handleDeleteSet = (id: string, title: string) => {
    if (confirm(`คุณต้องการลบชุดข้อสอบ "${title}" ใช่หรือไม่?`)) {
      storageService.deleteExamSet(id);
      deleteExamSetFromCloud(id).catch(() => {});
      refreshSets();
      showToast(`🗑️ ลบชุดข้อสอบ "${title}" แล้ว`);
    }
  };

  const handleSyncCloud = async () => {
    setIsSyncing(true);
    soundEffects.playTap(0.6);
    try {
      const res = await syncHybridExamSets();
      refreshSets();
      showToast(res.message);
    } catch (e: any) {
      showToast('ซิงค์กับระบบคลาวด์เสร็จสิ้น');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(examSets, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kinder_exam_sets_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('📥 ส่งออกไฟล์ชุดข้อสอบ JSON เรียบร้อยแล้ว');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          let count = 0;
          parsed.forEach((item) => {
            if (item.title && Array.isArray(item.questionIds)) {
              storageService.addExamSet(item);
              count++;
            }
          });
          refreshSets();
          showToast(`📤 นำเข้าชุดข้อสอบสำเร็จ ${count} ชุด!`);
        } else {
          showToast('⚠️ รูปแบบไฟล์ไม่ถูกต้อง');
        }
      } catch (err) {
        showToast('⚠️ เกิดข้อผิดพลาดในการอ่านไฟล์ JSON');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden flex flex-col max-h-[94vh] my-auto">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 sm:p-5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner shrink-0">
              📚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight">
                  ระบบจัดชุดข้อสอบสำหรับครู (Quiz & Exam Set Builder)
                </h2>
                <span className="hidden sm:inline-block bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  อัตโนมัติ & แมนนวล
                </span>
              </div>
              <p className="text-xs text-amber-100 mt-0.5">
                จัดชุดแบบทดสอบเฉพาะทักษะ หรือประเมินพัฒนาการ 8 ด้าน เพื่อให้นักเรียนเลือกเล่นได้ตามเป้าหมาย
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
            title="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                setActiveTab('manage');
                setEditingSetId(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'manage'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>รายการชุดข้อสอบ</span>
              <span className="text-[11px] bg-black/10 px-1.5 py-0.2 rounded-full font-bold">
                {examSets.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('auto');
                setEditingSetId(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'auto'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>จัดแบบอัตโนมัติ (Auto)</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
                🎲 Smart
              </span>
            </button>

            <button
              onClick={() => setActiveTab('manual')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'manual'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <ListChecks className="w-4 h-4 text-sky-500" />
              <span>{editingSetId ? '✏️ กำลังแก้ไขชุดข้อสอบ' : 'จัดแบบแมนนวล (Manual)'}</span>
              <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded-full font-bold">
                ✍️ ครูเลือกเอง
              </span>
            </button>

            {onOpenAIGenerator && (
              <button
                type="button"
                id="btn-exam-builder-ai-gen"
                onClick={() => {
                  onClose();
                  onOpenAIGenerator();
                }}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xs"
                title="ใช้ Gemini 3.8 Flash ช่วยครูสร้างชุดข้อสอบประเมินสมรรถนะ (CBE) 6 ด้านอัตโนมัติ"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>AI สร้างชุดข้อสอบ (CBE)</span>
                <span className="text-[10px] bg-amber-400 text-indigo-950 font-black px-1.5 py-0.2 rounded-full">
                  Gemini ✨
                </span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncCloud}
              disabled={isSyncing}
              className="px-2.5 py-1.5 bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              title="ซิงค์ชุดข้อสอบกับ Firestore"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">ซิงค์คลาวด์</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
              title="ส่งออกชุดข้อสอบเป็น JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">ส่งออก JSON</span>
            </button>
            <label className="px-2.5 py-1.5 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95">
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden md:inline">นำเข้า JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="bg-amber-600 text-white text-xs sm:text-sm font-bold px-4 py-2 text-center animate-fadeIn shadow-xs flex items-center justify-center gap-2">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* ========================================================= */}
          {/* TAB 1: MANAGE EXISTING EXAM SETS */}
          {/* ========================================================= */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 bg-amber-50/70 border border-amber-200 p-3.5 rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-sm font-black">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-amber-950">
                      ชุดข้อสอบทั้งหมดในระบบ ({examSets.length} ชุด)
                    </h3>
                    <p className="text-xs text-amber-800">
                      คลิก "ทดลองเล่นชุดนี้" เพื่อเริ่มเล่น หรือกดสร้างชุดใหม่ด้วยระบบอัตโนมัติหรือแบบครูจัดเอง
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {onOpenAIGenerator && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAIGenerator();
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                      title="สร้างชุดข้อสอบรายสมรรถนะ (CBE) 6 ด้านด้วย Gemini AI"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>+ AI สร้างชุดสอบ</span>
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('auto')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>+ สร้างแบบอัตโนมัติ</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('manual')}
                    className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ สร้างแบบแมนนวล</span>
                  </button>
                </div>
              </div>

              {/* Search & Grade Filter Bar for Manage Tab */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={manageSearch}
                    onChange={(e) => setManageSearch(e.target.value)}
                    placeholder="ค้นหาชื่อชุดข้อสอบ หรือคำอธิบาย..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-bold"
                  />
                  {manageSearch && (
                    <button
                      onClick={() => setManageSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Grade pills */}
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[11px] font-black text-slate-500 mr-1 shrink-0">ระดับชั้น:</span>
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
                      onClick={() => setManageFilterGrade(g.id as any)}
                      className={`px-2 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        manageFilterGrade === g.id
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Exam Sets */}
              {filteredManageSets.length === 0 ? (
                <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center text-slate-500">
                  <p className="font-bold text-sm">ไม่พบชุดข้อสอบที่ตรงกับการค้นหา</p>
                  <p className="text-xs text-slate-400 mt-1">ลองเปลี่ยนคำค้นหา หรือเลือกระดับชั้น "ทั้งหมด"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {filteredManageSets.map((set) => {
                  const setQuestions = allQuestions.filter((q) => set.questionIds.includes(q.id));
                  return (
                    <div
                      key={set.id}
                      className="bg-white border-2 border-slate-200 hover:border-amber-400 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Tags & Badges */}
                        <div className="flex items-center justify-between gap-1 mb-2 flex-wrap">
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${
                              set.generationMode === 'auto'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-sky-50 text-sky-800 border-sky-200'
                            }`}
                          >
                            {set.generationMode === 'auto' ? '🤖 จัดแบบอัตโนมัติ' : '✍️ จัดแบบแมนนวล'}
                          </span>

                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                            {set.grade === 'all' ? 'ทุกระดับชั้น' : `ชั้น ${set.grade}`}
                          </span>

                          {set.isPreset && (
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-200">
                              🌟 ชุดแนะนำ
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-black text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {set.title}
                        </h4>

                        {/* Description */}
                        {set.description && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {set.description}
                          </p>
                        )}

                        {/* Metrics Bar */}
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-600 mt-3 pt-2 border-t border-slate-100">
                          <span className="flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                            <span>{set.questionCount || set.questionIds.length} ข้อ</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-sky-500" />
                            <span>~{set.estimatedMinutes || 4} นาที</span>
                          </span>
                          <span className="text-[11px] text-slate-400 ml-auto">
                            {set.createdBy || 'คุณครู'}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5">
                        <button
                          onClick={() => {
                            onSelectAndPlayExamSet(set);
                            onClose();
                          }}
                          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black py-2 px-3 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>เล่นชุดนี้</span>
                        </button>

                        <button
                          onClick={() => setPreviewingSet(set)}
                          className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-xl border border-slate-200 cursor-pointer transition-colors"
                          title="ดูข้อสอบในชุดนี้"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {!set.isPreset && (
                          <button
                            onClick={() => handleEditSet(set)}
                            className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl border border-slate-200 cursor-pointer transition-colors"
                            title="แก้ไขชุดข้อสอบนี้"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDuplicateSet(set)}
                          className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl border border-slate-200 cursor-pointer transition-colors"
                          title="คัดลอกชุดข้อสอบนี้"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        {!set.isPreset && (
                          <button
                            onClick={() => handleDeleteSet(set.id, set.title)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 cursor-pointer transition-colors"
                            title="ลบชุดข้อสอบนี้"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: SMART AUTO GENERATOR */}
          {/* ========================================================= */}
          {activeTab === 'auto' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-black text-amber-950">
                    ระบบสุ่มจัดชุดข้อสอบอัจฉริยะ (Smart Balanced Auto-Generator)
                  </h3>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  ระบบจะคัดเลือกข้อสอบจากคลังโดยกระจายสัดส่วนตามวิชาที่เลือกอย่างเท่าเทียมกัน (Balanced Distribution) ช่วยประหยัดเวลาของคุณครูในการคัดเลือกทีละข้อ
                </p>
              </div>

              {/* AI Recommendation Banner */}
              {onOpenAIGenerator && (
                <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 text-white p-4 rounded-2xl shadow-md border border-indigo-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🤖</span>
                      <h4 className="text-sm font-black text-white">
                        ต้องการสร้างข้อสอบใหม่แบบอัตโนมัติด้วย Gemini AI?
                      </h4>
                      <span className="text-[10px] bg-amber-400 text-indigo-950 font-black px-2 py-0.2 rounded-full">
                        CBE 6 ด้าน
                      </span>
                    </div>
                    <p className="text-xs text-purple-200">
                      ให้ Gemini 3.8 Flash ช่วยร่างคำถามประเมินสมรรถนะครบ 6 ด้าน พร้อมตั้งชื่อ กำหนดเวลา และตัวเลือกพฤติกรรม
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAIGenerator();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-indigo-950 font-black text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>เปิด AI Exam Set Generator</span>
                  </button>
                </div>
              )}

              {/* Form Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    ชื่อชุดข้อสอบ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={autoTitle}
                    onChange={(e) => setAutoTitle(e.target.value)}
                    placeholder="เช่น แบบทดสอบวัดพัฒนาการ 8 ด้าน ปลายภาคเรียนที่ 1"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                  {/* Quick template title suggestions */}
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-400 font-bold">แนะนำ:</span>
                    {[
                      'แบบประเมินความพร้อม 8 ด้าน',
                      'ชุดฝึกทักษะคณิตศาสตร์ & เหตุผล',
                      'ชุดเตรียมความพร้อมก่อนเรียน',
                    ].map((sugg) => (
                      <button
                        key={sugg}
                        type="button"
                        onClick={() => setAutoTitle(sugg)}
                        className="text-[10px] bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Grade */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    ระดับชั้นเป้าหมาย
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                    {[
                      { id: 'K1', label: 'อ.1' },
                      { id: 'K2', label: 'อ.2' },
                      { id: 'K3', label: 'อ.3' },
                      { id: 'P1', label: 'ป.1' },
                      { id: 'P2', label: 'ป.2' },
                      { id: 'P3', label: 'ป.3' },
                      { id: 'P4', label: 'ป.4' },
                      { id: 'P5', label: 'ป.5' },
                      { id: 'P6', label: 'ป.6' },
                      { id: 'all', label: 'ทุกระดับ' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setAutoGrade(g.id as any)}
                        className={`py-1.5 px-1 text-center rounded-xl text-xs font-black border transition-all cursor-pointer ${
                          autoGrade === g.id
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    ระดับความยากของคำถาม
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'mixed', label: 'คละความยาก' },
                      { id: 'easy', label: 'ง่าย (ระดับ 1)' },
                      { id: 'medium', label: 'ปานกลาง (ระดับ 2)' },
                      { id: 'hard', label: 'ท้าทาย (ระดับ 3)' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setAutoDifficulty(d.id as any)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-black border transition-all cursor-pointer ${
                          autoDifficulty === d.id
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Count */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    จำนวนข้อสอบที่ต้องการ (ข้อ)
                  </label>
                  <div className="flex items-center gap-2">
                    {[5, 8, 10, 16, 24].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setAutoQuestionCount(cnt)}
                        className={`flex-1 py-2 text-center rounded-xl text-xs font-black border transition-all cursor-pointer ${
                          autoQuestionCount === cnt
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {cnt} ข้อ
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subject Selection Chips */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-slate-700">
                    เลือกทักษะที่ต้องการรวมในชุดข้อสอบ ({autoSubjects.length} / 8 ด้าน)
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setAutoSubjects(ALL_SUBJECTS.map((s) => s.id))}
                      className="text-[11px] text-amber-700 hover:underline font-bold cursor-pointer"
                    >
                      เลือกทั้งหมด
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={() => setAutoSubjects(['thai', 'english', 'math'])}
                      className="text-[11px] text-indigo-600 hover:underline font-bold cursor-pointer"
                    >
                      3 เสาหลัก (ไทย • อังกฤษ • คณิต)
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={() => setAutoSubjects(['literacy', 'math'])}
                      className="text-[11px] text-slate-500 hover:underline font-bold cursor-pointer"
                    >
                      ภาษา & คณิต
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ALL_SUBJECTS.map((s) => {
                    const isSelected = autoSubjects.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setAutoSubjects((prev) =>
                            prev.includes(s.id)
                              ? prev.length > 1
                                ? prev.filter((id) => id !== s.id)
                                : prev
                              : [...prev, s.id]
                          );
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? `${s.color} ring-1 ring-amber-400 shadow-2xs font-black`
                            : 'bg-white border-slate-200 text-slate-600 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <span className="text-lg">{s.icon}</span>
                        <span className="text-xs truncate">{s.nameTh}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button: Generate */}
              <div className="flex items-center justify-center pt-2">
                <button
                  type="button"
                  onClick={handleGenerateAutoQuestions}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Shuffle className="w-5 h-5" />
                  <span>🎲 สุ่มจัดชุดข้อสอบทันที (Smart Generate)</span>
                </button>
              </div>

              {/* Generated Question Preview */}
              {generatedQuestionIds.length > 0 && (
                <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ข้อสอบที่ระบบสุ่มเลือกให้ ({generatedQuestionIds.length} ข้อ)
                    </h4>
                    <button
                      type="button"
                      onClick={handleGenerateAutoQuestions}
                      className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Shuffle className="w-3 h-3" /> สุ่มใหม่อีกครั้ง
                    </button>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {generatedQuestionIds.map((qId, idx) => {
                      const q = allQuestions.find((item) => item.id === qId);
                      if (!q) return null;
                      return (
                        <div
                          key={`${qId}_${idx}`}
                          className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-black flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-base shrink-0">{q.illustration.slice(0, 4)}</span>
                            <span className="font-bold text-slate-800 truncate">
                              {q.question.th}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                              {q.grade} • ระดับ {q.difficulty}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setGeneratedQuestionIds((prev) => prev.filter((id) => id !== qId));
                              }}
                              className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                              title="นำข้อนี้ออก"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Save Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveAutoExamSet}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-6 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>บันทึกชุดข้อสอบนี้</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: MANUAL QUESTION PICKER */}
          {/* ========================================================= */}
          {activeTab === 'manual' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-sky-50 border-2 border-sky-200 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-sm font-black text-sky-950 flex items-center gap-1.5">
                    <ListChecks className="w-4 h-4 text-sky-600" />
                    {editingSetId ? 'แก้ไขชุดข้อสอบ' : 'จัดชุดข้อสอบแบบแมนนวล (Manual Question Picker)'}
                  </h3>
                  <p className="text-xs text-sky-800 mt-0.5">
                    คุณครูสามารถค้นหาและติ๊กเลือกข้อสอบทีละข้อได้ตามที่ต้องการสำหรับแผนการสอน
                  </p>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-xl border border-sky-300 text-xs font-black text-sky-900 shadow-2xs">
                  เลือกแล้ว: <span className="text-amber-600 text-sm">{selectedQuestionIds.length}</span> ข้อ
                </div>
              </div>

              {/* Set Meta Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    ชื่อชุดข้อสอบ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={manualTitle}
                    onChange={(e) => setManualTitle(e.target.value)}
                    placeholder="เช่น แบบทดสอบกลางภาค อนุบาล 2 (ครูวรรณา)"
                    className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    คำอธิบายสั้นๆ (ตัวเลือก)
                  </label>
                  <input
                    type="text"
                    value={manualDesc}
                    onChange={(e) => setManualDesc(e.target.value)}
                    placeholder="เช่น แบบทดสอบวัดความเข้าใจเรื่องสัตว์และตัวเลข"
                    className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                  />
                </div>
              </div>

              {/* Filters for Questions Pool */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-100 p-2.5 rounded-2xl border border-slate-200">
                <div className="sm:col-span-5 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={manualSearch}
                    onChange={(e) => setManualSearch(e.target.value)}
                    placeholder="ค้นหาโจทย์ หรือคำอธิบาย..."
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={manualFilterGrade}
                    onChange={(e) => setManualFilterGrade(e.target.value as any)}
                    className="w-full py-1.5 px-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                  >
                    <option value="all">ทุกระดับชั้น (อ.1 - ป.6)</option>
                    <optgroup label="ระดับปฐมวัย">
                      <option value="K1">ชั้นอนุบาล 1 (K1)</option>
                      <option value="K2">ชั้นอนุบาล 2 (K2)</option>
                      <option value="K3">ชั้นอนุบาล 3 (K3)</option>
                    </optgroup>
                    <optgroup label="ระดับประถมศึกษา">
                      <option value="P1">ประถมศึกษาปีที่ 1 (ป.1)</option>
                      <option value="P2">ประถมศึกษาปีที่ 2 (ป.2)</option>
                      <option value="P3">ประถมศึกษาปีที่ 3 (ป.3)</option>
                      <option value="P4">ประถมศึกษาปีที่ 4 (ป.4)</option>
                      <option value="P5">ประถมศึกษาปีที่ 5 (ป.5)</option>
                      <option value="P6">ประถมศึกษาปีที่ 6 (ป.6)</option>
                    </optgroup>
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <select
                    value={manualFilterSubject}
                    onChange={(e) => setManualFilterSubject(e.target.value as any)}
                    className="w-full py-1.5 px-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                  >
                    <option value="all">ทุกวิชา / 8 ด้าน</option>
                    {ALL_SUBJECTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.icon} {s.nameTh}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Questions List with Checkboxes */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-72 overflow-y-auto bg-white">
                <div className="divide-y divide-slate-100">
                  {filteredQuestionsForManual.map((q, idx) => {
                    const isChecked = selectedQuestionIds.includes(q.id);
                    return (
                      <div
                        key={`${q.id}_${idx}`}
                        onClick={() => handleToggleQuestionInManual(q.id)}
                        className={`p-3 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                          isChecked ? 'bg-sky-50/80 hover:bg-sky-100/70' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // Handled by parent div
                            className="w-4 h-4 rounded-md text-sky-600 focus:ring-sky-500 cursor-pointer shrink-0"
                          />
                          <span className="text-xl shrink-0">{q.illustration.slice(0, 4)}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">
                              {q.question.th}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">
                              เฉลย: {q.options.find((o) => o.id === q.correctOptionId)?.label.th || 'ตัวเลือก'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                            {q.grade}
                          </span>
                          <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200 font-bold">
                            ยากระดับ {q.difficulty}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  แสดง {filteredQuestionsForManual.length} ข้อสอบที่ตรงกับการค้นหา
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedQuestionIds([]);
                      setManualTitle('');
                    }}
                    className="px-3 py-2 text-slate-500 hover:text-rose-600 text-xs font-bold cursor-pointer"
                  >
                    ล้างที่เลือกทั้งหมด
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveManualExamSet}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{editingSetId ? 'บันทึกการแก้ไข' : 'บันทึกชุดข้อสอบนี้'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Question Preview Sub-Modal */}
        {previewingSet && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white rounded-3xl p-5 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border-2 border-slate-200 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👁️</span>
                    <h3 className="text-base font-black text-slate-800">
                      {previewingSet.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ตัวอย่างรายการข้อสอบทั้งหมด {previewingSet.questionIds.length} ข้อ
                  </p>
                </div>
                <button
                  type="button"
                  id="btn-close-builder-set-preview"
                  onClick={() => setPreviewingSet(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto py-3 space-y-2.5 flex-1 pr-1">
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
                    <div key={`${q.id}_${idx}`} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-lg">{q.illustration.slice(0, 4)}</span>
                          <span className="font-black text-xs text-slate-800">
                            {q.question.th}
                          </span>
                        </div>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-bold shrink-0">
                          {q.grade} • ทักษะ {q.skillCode || 'รอบรู้'}
                        </span>
                      </div>

                      {/* Options Preview */}
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-2 rounded-xl text-center text-xs font-bold border ${
                              opt.id === q.correctOptionId
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-black'
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            <span>{opt.icon} {opt.label.th}</span>
                            {opt.id === q.correctOptionId && (
                              <span className="block text-[9px] text-emerald-600">✓ ถูกต้อง</span>
                            )}
                          </div>
                        ))}
                      </div>
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
                    onSelectAndPlayExamSet(previewingSet);
                    setPreviewingSet(null);
                    onClose();
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
