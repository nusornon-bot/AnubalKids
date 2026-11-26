import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  CheckCircle2,
  RefreshCw,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Download,
  AlertCircle,
  HelpCircle,
  Check,
  Target,
  ArrowRight,
  BookOpen,
  Layers,
  Wand2,
  ListChecks,
  Clock,
  Play,
  Shuffle,
  Eye,
  FileCheck,
} from 'lucide-react';
import { ExamSet, Grade, Question, Subject } from '../../types';
import {
  CBE_COMPETENCY_PRESETS,
  CBECompetencyPreset,
  requestAIGeneratedQuestions,
  requestAIGeneratedExamSet,
  convertSuggestedItemToQuestion,
  SuggestedQuestionItem,
  GeneratedExamSetItemQuestion,
  GenerateExamSetResponse,
} from '../../services/aiQuestionSuggesterService';
import { storageService } from '../../services/storageService';
import { saveCloudCustomQuestion, saveExamSetToCloud } from '../../services/cloudSyncService';

interface AIQuestionSuggesterPanelProps {
  onQuestionsSaved: () => void;
  onOpenExamSetBuilder?: () => void;
  onViewQuestionBank?: () => void;
  onPlayExamSet?: (examSet: ExamSet) => void;
}

export const AIQuestionSuggesterPanel: React.FC<AIQuestionSuggesterPanelProps> = ({
  onQuestionsSaved,
  onOpenExamSetBuilder,
  onViewQuestionBank,
  onPlayExamSet,
}) => {
  // Mode Switch: 'exam_set' (AI Exam Set Generator) vs 'single_topic' (AI Question Suggester)
  const [panelMode, setPanelMode] = useState<'exam_set' | 'single_topic'>('exam_set');

  // ==========================================
  // STATE: EXAM SET GENERATOR (6 CBE DOMAINS)
  // ==========================================
  const [examTitle, setExamTitle] = useState<string>('');
  const [examGrade, setExamGrade] = useState<Grade>('P1');
  const [examDifficulty, setExamDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('medium');
  const [questionsPerComp, setQuestionsPerComp] = useState<number>(2); // 2 per comp = 12 total
  const [examTheme, setExamTheme] = useState<string>('');
  const [enabledCompetencies, setEnabledCompetencies] = useState<Record<Subject, boolean>>({
    self_management: true,
    higher_order_thinking: true,
    communication: true,
    teamwork_collaboration: true,
    active_citizenship: true,
    sustainable_living: true,
  } as Record<Subject, boolean>);

  const [isGeneratingExamSet, setIsGeneratingExamSet] = useState<boolean>(false);
  const [examSetError, setExamSetError] = useState<string | null>(null);
  const [generatedExamSetData, setGeneratedExamSetData] = useState<GenerateExamSetResponse | null>(null);
  const [savedExamSet, setSavedExamSet] = useState<ExamSet | null>(null);

  // ==========================================
  // STATE: SINGLE TOPIC QUESTION SUGGESTER
  // ==========================================
  const [selectedGrade, setSelectedGrade] = useState<Grade>('P1');
  const [selectedCompetency, setSelectedCompetency] = useState<Subject>('self_management');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<1 | 2 | 3>(2);
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [scenarioContext, setScenarioContext] = useState<string>('');

  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState<boolean>(false);
  const [questionGenError, setQuestionGenError] = useState<string | null>(null);
  const [generatedItems, setGeneratedItems] = useState<SuggestedQuestionItem[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<Record<number, boolean>>({});

  // Shared Inline Editing State
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<SuggestedQuestionItem | null>(null);
  const [editSource, setEditSource] = useState<'exam_set' | 'single_topic'>('exam_set');

  // Shared Notifications
  const [savedSuccessMessage, setSavedSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Active Competency Preset for single topic mode
  const activePreset = CBE_COMPETENCY_PRESETS.find((p) => p.id === selectedCompetency) || CBE_COMPETENCY_PRESETS[0];
  const effectiveTopic = customTopic.trim() || selectedTopic || activePreset.recommendedTopics[0];

  const selectedCompetenciesCount = Object.values(enabledCompetencies).filter(Boolean).length;
  const totalExamSetQuestionsCount = selectedCompetenciesCount * questionsPerComp;

  // Toggle single competency for exam set generator
  const toggleExamCompetency = (key: Subject) => {
    setEnabledCompetencies((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const count = Object.values(next).filter(Boolean).length;
      return count >= 1 ? next : prev; // keep at least 1
    });
  };

  // ==========================================
  // HANDLERS: EXAM SET GENERATION & SAVING
  // ==========================================
  const handleGenerateExamSet = async () => {
    setIsGeneratingExamSet(true);
    setExamSetError(null);
    setSavedSuccessMessage(null);
    setSavedExamSet(null);
    setGeneratedExamSetData(null);

    const activeList = Object.keys(enabledCompetencies).filter(
      (k) => enabledCompetencies[k as Subject]
    ) as Subject[];

    try {
      const response = await requestAIGeneratedExamSet({
        title: examTitle.trim(),
        grade: examGrade,
        difficulty: examDifficulty,
        questionsPerCompetency: questionsPerComp,
        competencies: activeList,
        themeContext: examTheme.trim(),
      });

      if (response.success && response.questions?.length > 0) {
        setGeneratedExamSetData(response);
      } else {
        setExamSetError('Gemini ไม่สามารถสร้างชุดข้อสอบได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err: any) {
      console.error('Error generating CBE exam set:', err);
      setExamSetError(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ Gemini API');
    } finally {
      setIsGeneratingExamSet(false);
    }
  };

  // Save generated Exam Set into Question Bank and ExamSets
  const handleSaveExamSetToBank = async () => {
    if (!generatedExamSetData || generatedExamSetData.questions.length === 0) return;

    setIsSaving(true);
    setSavedSuccessMessage(null);

    try {
      const createdQuestionIds: string[] = [];

      // 1. Save each question to Question Bank
      for (const item of generatedExamSetData.questions) {
        const itemDifficulty = item.difficulty || (examDifficulty === 'easy' ? 1 : examDifficulty === 'hard' ? 3 : 2);
        const q = convertSuggestedItemToQuestion(
          item,
          generatedExamSetData.examSet.grade,
          item.competency || 'self_management',
          itemDifficulty as 1 | 2 | 3
        );
        const savedQ = storageService.addCustomQuestion(q);
        createdQuestionIds.push(savedQ.id);
        saveCloudCustomQuestion(savedQ).catch((e) => console.log('Cloud sync info:', e));
      }

      // 2. Create the ExamSet object
      const newExamSet: ExamSet = {
        id: `exam-cbe-ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: generatedExamSetData.examSet.title,
        description: generatedExamSetData.examSet.description,
        grade: generatedExamSetData.examSet.grade,
        subjects: generatedExamSetData.examSet.subjects,
        questionIds: createdQuestionIds,
        questionCount: createdQuestionIds.length,
        generationMode: 'auto',
        difficulty: generatedExamSetData.examSet.difficulty,
        estimatedMinutes: generatedExamSetData.examSet.estimatedMinutes || Math.ceil(createdQuestionIds.length * 1.5),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['CBE_6_COMPETENCIES', 'AI_GENERATED', 'GEMINI'],
      };

      const registeredSet = storageService.addExamSet(newExamSet);
      saveExamSetToCloud(registeredSet).catch((e) => console.log('Cloud exam set sync info:', e));

      setSavedExamSet(registeredSet);
      onQuestionsSaved();
      setSavedSuccessMessage(
        `บันทึกชุดข้อสอบ "${registeredSet.title}" (${createdQuestionIds.length} ข้อ) เข้าสู่ระบบเรียบร้อยแล้ว!`
      );
    } catch (err: any) {
      console.error('Error saving exam set:', err);
      alert('เกิดข้อผิดพลาดในการบันทึกชุดข้อสอบ: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ==========================================
  // HANDLERS: SINGLE TOPIC QUESTION SUGGESTER
  // ==========================================
  const handleGenerateQuestions = async () => {
    setIsGeneratingQuestions(true);
    setQuestionGenError(null);
    setSavedSuccessMessage(null);
    setGeneratedItems([]);

    try {
      const response = await requestAIGeneratedQuestions({
        grade: selectedGrade,
        competency: selectedCompetency,
        topic: effectiveTopic,
        difficulty: selectedDifficulty,
        count: questionCount,
        context: scenarioContext.trim(),
      });

      if (response.success && response.questions?.length > 0) {
        setGeneratedItems(response.questions);
        const allSel: Record<number, boolean> = {};
        response.questions.forEach((_, idx) => {
          allSel[idx] = true;
        });
        setSelectedIndexes(allSel);
      } else {
        setQuestionGenError('Gemini ไม่สามารถสร้างข้อสอบได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err: any) {
      console.error('Error in handleGenerateQuestions:', err);
      setQuestionGenError(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ Gemini API');
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleSaveSelectedQuestionsToBank = async () => {
    const itemsToSave = generatedItems.filter((_, idx) => selectedIndexes[idx]);
    if (itemsToSave.length === 0) {
      alert('กรุณาเลือกข้อสอบที่ต้องการบันทึกอย่างน้อย 1 ข้อ');
      return;
    }

    setIsSaving(true);
    setSavedSuccessMessage(null);

    try {
      let savedCount = 0;
      for (const item of itemsToSave) {
        const q = convertSuggestedItemToQuestion(item, selectedGrade, selectedCompetency, selectedDifficulty);
        storageService.addCustomQuestion(q);
        saveCloudCustomQuestion(q).catch((e) => console.log('Cloud sync info:', e));
        savedCount++;
      }

      onQuestionsSaved();
      setSavedSuccessMessage(`บันทึกคำถามประเมินสมรรถนะสำเร็จ ${savedCount} ข้อเรียบร้อยแล้ว!`);
      setSelectedIndexes({});
    } catch (err: any) {
      console.error('Error saving custom questions:', err);
      alert('เกิดข้อผิดพลาดในการบันทึกคำถาม: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Inline Question Edit Handlers
  const handleStartEdit = (item: SuggestedQuestionItem, index: number, source: 'exam_set' | 'single_topic') => {
    setEditingIndex(index);
    setEditItem(JSON.parse(JSON.stringify(item)));
    setEditSource(source);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null || !editItem) return;

    if (editSource === 'exam_set' && generatedExamSetData) {
      const updatedQuestions = [...generatedExamSetData.questions];
      updatedQuestions[editingIndex] = {
        ...updatedQuestions[editingIndex],
        ...editItem,
      };
      setGeneratedExamSetData({
        ...generatedExamSetData,
        questions: updatedQuestions,
      });
    } else if (editSource === 'single_topic') {
      const updated = [...generatedItems];
      updated[editingIndex] = editItem;
      setGeneratedItems(updated);
    }

    setEditingIndex(null);
    setEditItem(null);
  };

  return (
    <div id="ai-cbe-exam-generator-panel" className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* Top Banner with Mode Selector */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-4 sm:p-6 shadow-md border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-purple-500 text-slate-950 flex items-center justify-center text-2xl shadow-inner shrink-0">
            ✨
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-white">
                AI-Powered Exam Set Generator
              </h3>
              <span className="text-[10px] font-black bg-purple-500/40 text-purple-200 px-2.5 py-0.5 rounded-full border border-purple-400/50">
                Gemini 3.8 Flash
              </span>
              <span className="text-[10px] font-black bg-amber-400 text-indigo-950 px-2 py-0.5 rounded-full">
                6 สมรรถนะหลัก สพฐ.
              </span>
            </div>
            <p className="text-xs sm:text-sm text-purple-200 mt-1">
              สร้างชุดข้อสอบประเมินสมรรถนะครบ 6 ด้านแบบอัตโนมัติ พร้อมตั้งชื่อ กำหนดเวลา และนำเข้าคลังทันที
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center bg-white/10 p-1 rounded-2xl border border-white/20 self-start md:self-auto text-xs font-black">
          <button
            type="button"
            id="tab-mode-exam-set"
            onClick={() => {
              setPanelMode('exam_set');
              setSavedSuccessMessage(null);
            }}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              panelMode === 'exam_set'
                ? 'bg-amber-400 text-indigo-950 shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <ListChecks className="w-3.5 h-3.5" />
            <span>สร้างชุดข้อสอบ 6 สมรรถนะ</span>
          </button>

          <button
            type="button"
            id="tab-mode-single-topic"
            onClick={() => {
              setPanelMode('single_topic');
              setSavedSuccessMessage(null);
            }}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              panelMode === 'single_topic'
                ? 'bg-amber-400 text-indigo-950 shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>สร้างคำถามรายหัวข้อ</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {savedSuccessMessage && (
        <div className="bg-emerald-500 text-white p-4 rounded-2xl flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2.5 font-bold text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
            <span>{savedSuccessMessage}</span>
          </div>

          <div className="flex items-center gap-2">
            {savedExamSet && onPlayExamSet && (
              <button
                type="button"
                onClick={() => onPlayExamSet(savedExamSet)}
                className="bg-white text-emerald-950 hover:bg-emerald-50 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>เริ่มเล่นชุดนี้ทันที</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setSavedSuccessMessage(null)}
              className="text-white/80 hover:text-white p-1 text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 1: EXAM SET GENERATOR (6 CBE DOMAINS COMPREHENSIVE) */}
      {/* ======================================================== */}
      {panelMode === 'exam_set' && (
        <div className="space-y-6">
          {/* Error Banner */}
          {examSetError && (
            <div className="bg-rose-50 border-2 border-rose-300 text-rose-800 p-4 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs font-medium">
                <span className="font-black block text-rose-900 mb-0.5">เกิดข้อผิดพลาดในการสร้างชุดข้อสอบ</span>
                <span>{examSetError}</span>
              </div>
            </div>
          )}

          {/* Exam Set Generator Configuration Form */}
          <div className="bg-white rounded-3xl border-2 border-indigo-100 shadow-sm p-4 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-indigo-950 font-black text-sm">
                <Wand2 className="w-4 h-4 text-indigo-600" />
                <span>กำหนดโครงสร้างชุดข้อสอบสมรรถนะ 6 ด้าน</span>
              </div>
              <span className="text-xs font-bold text-slate-500">
                รวมทั้งหมด <strong className="text-indigo-600 font-black">{totalExamSetQuestionsCount} ข้อ</strong>
              </span>
            </div>

            {/* 1. Exam Set Title (Optional / AI Auto-Name) */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                ชื่อชุดข้อสอบ (ระบุเอง หรือเว้นว่างเพื่อให้ AI ตั้งให้อัตโนมัติ):
              </label>
              <input
                type="text"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                placeholder="เช่น ชุดประเมิน 6 สมรรถนะหลัก ป.1 - ชุดบูรณาการสถานการณ์จำลอง"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* 2. Grade and Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Grade */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  ระดับชั้นเป้าหมาย:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
                  {(['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'K3', 'K2', 'K1'] as Grade[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setExamGrade(g)}
                      className={`py-2 rounded-xl text-center border font-black text-xs transition-all cursor-pointer ${
                        examGrade === g
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  ระดับความยากของชุดข้อสอบ:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { key: 'easy', label: 'ง่าย (พื้นฐาน)' },
                    { key: 'medium', label: 'ปานกลาง' },
                    { key: 'hard', label: 'ท้าทาย' },
                    { key: 'mixed', label: 'คละความยาก' },
                  ].map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setExamDifficulty(d.key as any)}
                      className={`py-2 px-1 rounded-xl text-center border font-black text-xs transition-all cursor-pointer ${
                        examDifficulty === d.key
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Questions per Competency & Total Count Selector */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                จำนวนข้อต่อสมรรถนะ:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { count: 1, label: '1 ข้อ / สมรรถนะ', total: 6, time: '10 นาที', tag: 'ชุดด่วน' },
                  { count: 2, label: '2 ข้อ / สมรรถนะ', total: 12, time: '20 นาที', tag: 'มาตรฐาน แนะนำ ✨' },
                  { count: 3, label: '3 ข้อ / สมรรถนะ', total: 18, time: '30 นาที', tag: 'ประเมินลึก' },
                  { count: 4, label: '4 ข้อ / สมรรถนะ', total: 24, time: '40 นาที', tag: 'วัดผลปลายภาค' },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setQuestionsPerComp(item.count)}
                    className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                      questionsPerComp === item.count
                        ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 shadow-xs'
                        : 'bg-slate-50/60 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black">{item.label}</span>
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.2 rounded-md ${
                          questionsPerComp === item.count
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      รวม {item.count * selectedCompetenciesCount} ข้อ • เวลา ~{item.time}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Active CBE Competencies Selector (Defaults to all 6) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-black text-slate-700">
                  สมรรถนะที่ต้องการบรรจุในชุดข้อสอบ ({selectedCompetenciesCount}/6 ด้าน):
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const all: Record<Subject, boolean> = {} as any;
                      CBE_COMPETENCY_PRESETS.forEach((p) => {
                        all[p.id] = true;
                      });
                      setEnabledCompetencies(all);
                    }}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold"
                  >
                    เลือกทั้งหมด
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CBE_COMPETENCY_PRESETS.map((comp) => {
                  const isChecked = !!enabledCompetencies[comp.id];
                  return (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => toggleExamCompetency(comp.id)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        isChecked
                          ? `${comp.badgeBg} ${comp.badgeBorder} text-slate-900 shadow-2xs font-black`
                          : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by button
                        className="w-3.5 h-3.5 rounded text-indigo-600 pointer-events-none"
                      />
                      <span className="text-base shrink-0">{comp.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs truncate">{comp.code}: {comp.title}</div>
                        <div className="text-[10px] text-slate-500 font-normal">
                          {questionsPerComp} ข้อ
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Thematic / Scenario Context (Optional) */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">
                ธีมหรือสถานการณ์ร่วม (ระบุได้เพื่อความสอดคล้อง เช่น สิ่งแวดล้อม, การทำงานกลุ่ม, ชีวิตประจำวัน):
              </label>
              <input
                type="text"
                value={examTheme}
                onChange={(e) => setExamTheme(e.target.value)}
                placeholder="เช่น กิจกรรมทัศนศึกษาชุมชน, การประหยัดพลังงานในโรงเรียน, ค่ายลูกเสือ"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Generate Action Button */}
            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                id="btn-generate-cbe-exam-set"
                onClick={handleGenerateExamSet}
                disabled={isGeneratingExamSet || selectedCompetenciesCount === 0}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingExamSet ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Gemini กำลังออกแบบชุดข้อสอบ {totalExamSetQuestionsCount} ข้อครบ 6 สมรรถนะ...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>สร้างชุดข้อสอบ 6 สมรรถนะด้วย Gemini AI ({totalExamSetQuestionsCount} ข้อ)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Exam Set Preview & Save Action */}
          {generatedExamSetData && (
            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-4 sm:p-6 space-y-5 animate-fadeIn">
              {/* Exam Set Header Preview */}
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-4 sm:p-5 border border-indigo-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black bg-indigo-600 text-white px-2.5 py-0.5 rounded-full">
                      ระดับชั้น {generatedExamSetData.examSet.grade}
                    </span>
                    <span className="text-xs font-black bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full border border-purple-200">
                      {generatedExamSetData.examSet.difficulty}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>~{generatedExamSetData.examSet.estimatedMinutes} นาที</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    {generatedExamSetData.examSet.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {generatedExamSetData.examSet.description}
                  </p>
                </div>

                {/* Save Exam Set Button */}
                <button
                  type="button"
                  id="btn-save-generated-exam-set"
                  onClick={handleSaveExamSetToBank}
                  disabled={isSaving}
                  className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>
                    {isSaving
                      ? 'กำลังบันทึกชุดข้อสอบ...'
                      : `บันทึกชุดข้อสอบและนำเข้าคลัง (${generatedExamSetData.questions.length} ข้อ)`}
                  </span>
                </button>
              </div>

              {/* Competency Grouped Questions List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-indigo-600" />
                    <span>รายการข้อสอบในชุด ({generatedExamSetData.questions.length} ข้อ จำแนกตามสมรรถนะ)</span>
                  </h4>
                  <span className="text-xs text-slate-500">คลิก "แก้ไข" เพื่อปรับแต่งโจทย์หรือตัวเลือก</span>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {generatedExamSetData.questions.map((q, idx) => {
                    const preset = CBE_COMPETENCY_PRESETS.find((p) => p.id === q.competency);
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-2xs space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-900 font-black text-xs flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-xl shrink-0">{q.illustration}</span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${preset?.badgeBg} ${preset?.badgeBorder} ${preset?.badgeText}`}>
                              {q.skillCode || preset?.code}: {preset?.title || q.competency}
                            </span>
                            {q.indicatorAssessed && (
                              <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 truncate max-w-xs font-medium">
                                {q.indicatorAssessed}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleStartEdit(q, idx, 'exam_set')}
                            className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer shrink-0"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>แก้ไข</span>
                          </button>
                        </div>

                        {/* Question Text */}
                        <div className="pl-8">
                          <p className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                            {q.questionTh}
                          </p>
                          {q.questionEn && (
                            <p className="text-[11px] text-slate-500 mt-0.5">{q.questionEn}</p>
                          )}

                          {/* Options Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5">
                            {q.options.map((opt) => {
                              const isCorrect = opt.id === q.correctOptionId;
                              return (
                                <div
                                  key={opt.id}
                                  className={`p-2 rounded-xl border flex items-center gap-2 text-xs ${
                                    isCorrect
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-black shadow-2xs'
                                      : 'bg-white border-slate-200 text-slate-700'
                                  }`}
                                >
                                  <span className="text-base shrink-0">{opt.icon}</span>
                                  <div className="min-w-0 flex-1">
                                    <span className="font-bold mr-1 text-slate-500 uppercase">{opt.id}.</span>
                                    <span>{opt.labelTh}</span>
                                  </div>
                                  {isCorrect && (
                                    <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-black shrink-0">
                                      ถูก ✓
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Pedagogical Explanation */}
                          <div className="mt-2 bg-amber-50/70 p-2 rounded-xl border border-amber-200 text-[10px] text-amber-950">
                            <span className="font-bold text-amber-800">💡 เหตุผลเชิงสมรรถนะ:</span> {q.explanationTh}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleGenerateExamSet}
                  disabled={isGeneratingExamSet}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingExamSet ? 'animate-spin' : ''}`} />
                  <span>สุ่มสร้างชุดใหม่</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveExamSetToBank}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>{isSaving ? 'กำลังบันทึก...' : 'บันทึกชุดข้อสอบนี้'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: SINGLE TOPIC QUESTION SUGGESTER */}
      {/* ======================================================== */}
      {panelMode === 'single_topic' && (
        <div className="space-y-6">
          {/* Error Banner */}
          {questionGenError && (
            <div className="bg-rose-50 border-2 border-rose-300 text-rose-800 p-4 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs font-medium">
                <span className="font-black block text-rose-900 mb-0.5">เกิดข้อผิดพลาดในการสร้างคำถาม</span>
                <span>{questionGenError}</span>
              </div>
            </div>
          )}

          {/* Generator Configuration Form */}
          <div className="bg-white rounded-3xl border-2 border-indigo-100 shadow-sm p-4 sm:p-6 space-y-5">
            <div className="flex items-center gap-2 text-indigo-950 font-black text-sm border-b border-slate-100 pb-3">
              <Wand2 className="w-4 h-4 text-indigo-600" />
              <span>สร้างคำถามเจาะจงรายหัวข้อและสมรรถนะ</span>
            </div>

            {/* 1. Grade Selector */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-2">
                1. เลือกระดับชั้นของผู้เรียน:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
                {(['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'K3', 'K2', 'K1'] as Grade[]).map((g) => {
                  const isPrimary = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(g);
                  const isSelected = selectedGrade === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setSelectedGrade(g)}
                      className={`p-2.5 rounded-2xl text-center border-2 transition-all cursor-pointer font-black text-xs ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-102'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="text-sm">{isPrimary ? '🎒' : '🧸'}</div>
                      <div className="font-black mt-0.5">{g}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. CBE Competency Selector */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-2">
                2. เลือกสมรรถนะหลัก (CBE Competency):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {CBE_COMPETENCY_PRESETS.map((comp) => {
                  const isSelected = selectedCompetency === comp.id;
                  return (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => {
                        setSelectedCompetency(comp.id);
                        setSelectedTopic('');
                        setCustomTopic('');
                      }}
                      className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-start gap-2.5 ${
                        isSelected
                          ? `${comp.badgeBg} ${comp.badgeBorder} shadow-sm ring-2 ring-indigo-500/20`
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="text-2xl shrink-0 p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        {comp.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-white border border-slate-200 text-indigo-900">
                            {comp.code}
                          </span>
                          <span className={`text-xs font-black truncate ${isSelected ? comp.badgeText : 'text-slate-900'}`}>
                            {comp.title}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{comp.engTitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Topics */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-2">
                3. หัวข้อ / พฤติกรรมบ่งชี้ที่ต้องการเน้น:
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {activePreset.recommendedTopics.map((top) => {
                  const isSelected = selectedTopic === top && !customTopic;
                  return (
                    <button
                      key={top}
                      type="button"
                      onClick={() => {
                        setSelectedTopic(top);
                        setCustomTopic('');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {top}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={customTopic}
                onChange={(e) => {
                  setCustomTopic(e.target.value);
                  if (e.target.value) setSelectedTopic('');
                }}
                placeholder={`หรือพิมพ์หัวข้อเฉพาะ เช่น "${activePreset.recommendedTopics[0]}"`}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* 4. Difficulty & Count */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">ความยาก:</label>
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                  {[
                    { level: 1, label: 'ระดับ 1 ง่าย' },
                    { level: 2, label: 'ระดับ 2 ปานกลาง' },
                    { level: 3, label: 'ระดับ 3 ท้าทาย' },
                  ].map(({ level, label }) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSelectedDifficulty(level as 1 | 2 | 3)}
                      className={`flex-1 py-1.5 text-center rounded-lg transition-all cursor-pointer ${
                        selectedDifficulty === level
                          ? 'bg-indigo-600 text-white shadow-2xs font-black'
                          : 'text-slate-700 hover:text-slate-950'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">จำนวนข้อ:</label>
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                  {[3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuestionCount(num)}
                      className={`flex-1 py-1.5 text-center rounded-lg transition-all cursor-pointer ${
                        questionCount === num
                          ? 'bg-indigo-600 text-white shadow-2xs font-black'
                          : 'text-slate-700 hover:text-slate-950'
                      }`}
                    >
                      {num} ข้อ
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">บริบทสถานการณ์:</label>
                <input
                  type="text"
                  value={scenarioContext}
                  onChange={(e) => setScenarioContext(e.target.value)}
                  placeholder="เช่น ทัศนศึกษา, งานกลุ่ม"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                id="btn-ai-generate-single-questions"
                onClick={handleGenerateQuestions}
                disabled={isGeneratingQuestions}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingQuestions ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Gemini กำลังออกแบบข้อสอบ...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>สร้างคำถามด้วย Gemini AI ({questionCount} ข้อ)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Questions List for Single Topic */}
          {generatedItems.length > 0 && (
            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-sm sm:text-base font-black text-slate-900">
                    คำถามที่สร้างขึ้น ({generatedItems.length} ข้อ)
                  </h4>
                </div>

                <button
                  type="button"
                  id="btn-save-single-topic-questions"
                  onClick={handleSaveSelectedQuestionsToBank}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSaving ? 'กำลังบันทึก...' : 'บันทึกคำถามที่เลือก'}</span>
                </button>
              </div>

              <div className="space-y-3.5">
                {generatedItems.map((item, index) => {
                  const isSelected = !!selectedIndexes[index];
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-2xs space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              setSelectedIndexes((prev) => ({
                                ...prev,
                                [index]: !prev[index],
                              }))
                            }
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-900 font-black text-xs flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-xl">{item.illustration}</span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                            {activePreset.code}: {activePreset.title}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleStartEdit(item, index, 'single_topic')}
                          className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>แก้ไข</span>
                        </button>
                      </div>

                      <div className="pl-6.5">
                        <p className="text-xs sm:text-sm font-black text-slate-900">{item.questionTh}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {item.options.map((opt) => (
                            <div
                              key={opt.id}
                              className={`p-2 rounded-xl border flex items-center gap-2 text-xs ${
                                opt.id === item.correctOptionId
                                  ? 'bg-emerald-50 border-emerald-300 font-black text-emerald-950'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <span>{opt.icon}</span>
                              <span>{opt.labelTh}</span>
                              {opt.id === item.correctOptionId && (
                                <span className="ml-auto text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-black">
                                  ถูก ✓
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit Question Modal Overlay (Shared for both modes) */}
      {editingIndex !== null && editItem && (
        <div
          id="modal-edit-ai-question"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditingIndex(null);
              setEditItem(null);
            }
          }}
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border-2 border-indigo-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <span>ปรับแต่งข้อคำถามข้อที่ {editingIndex + 1}</span>
              </h4>
              <button
                type="button"
                onClick={() => {
                  setEditingIndex(null);
                  setEditItem(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ข้อความคำถาม (ภาษาไทย):
              </label>
              <textarea
                value={editItem.questionTh}
                onChange={(e) => setEditItem({ ...editItem, questionTh: e.target.value })}
                rows={2}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                อิโมจิภาพประกอบ:
              </label>
              <input
                type="text"
                value={editItem.illustration}
                onChange={(e) => setEditItem({ ...editItem, illustration: e.target.value })}
                className="w-full p-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                ตัวเลือกคำตอบและคำตอบที่ถูกต้อง:
              </label>
              {editItem.options.map((opt, optIdx) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct-option-edit"
                    checked={editItem.correctOptionId === opt.id}
                    onChange={() => setEditItem({ ...editItem, correctOptionId: opt.id })}
                    title="เลือกให้เป็นคำตอบที่ถูกต้อง"
                    className="w-4 h-4 text-emerald-600"
                  />
                  <input
                    type="text"
                    value={opt.icon}
                    onChange={(e) => {
                      const newOpts = [...editItem.options];
                      newOpts[optIdx].icon = e.target.value;
                      setEditItem({ ...editItem, options: newOpts });
                    }}
                    className="w-12 p-1.5 text-center rounded-lg border border-slate-300 text-sm"
                  />
                  <input
                    type="text"
                    value={opt.labelTh}
                    onChange={(e) => {
                      const newOpts = [...editItem.options];
                      newOpts[optIdx].labelTh = e.target.value;
                      setEditItem({ ...editItem, options: newOpts });
                    }}
                    className="flex-1 p-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                คำอธิบายเหตุผลทางสมรรถนะ:
              </label>
              <textarea
                value={editItem.explanationTh}
                onChange={(e) => setEditItem({ ...editItem, explanationTh: e.target.value })}
                rows={2}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setEditingIndex(null);
                  setEditItem(null);
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700"
              >
                บันทึกการแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
