import React, { useState, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Type,
  Volume2,
  CheckCircle2,
  Sparkles,
  Layers,
  Star,
  Eye,
  AlertCircle,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  HelpCircle,
  FolderOpen,
} from 'lucide-react';
import { Grade, Question, Subject, SkillCode } from '../../types';
import { SKILLS_LIST, CBE_COMPETENCIES_LIST, THAI_PHONICS_UNITS_LIST } from '../../data/skills';
import { storageService } from '../../services/storageService';
import { saveCloudCustomQuestion } from '../../services/cloudSyncService';
import {
  processAndCompressImage,
  isImageUrl,
  EDUCATIONAL_STICKER_PRESETS,
  EducationalPresetItem,
} from '../../utils/imageUtils';
import { speakText } from '../../services/audioService';

interface ParentQuestionEditorProps {
  editingQuestion: Question | null;
  onSaved: (question: Question) => void;
  onCancel: () => void;
  onViewJSON?: () => void;
  showToast: (msg: string) => void;
}

export const ParentQuestionEditor: React.FC<ParentQuestionEditorProps> = ({
  editingQuestion,
  onSaved,
  onCancel,
  onViewJSON,
  showToast,
}) => {
  // Question Type: 'image' or 'text'
  const [questionType, setQuestionType] = useState<'image' | 'text'>(() => {
    if (editingQuestion && isImageUrl(editingQuestion.illustration)) {
      return 'image';
    }
    return 'text';
  });

  // Grade, Subject, Difficulty
  const [grade, setGrade] = useState<Grade>(editingQuestion?.grade || 'K1');
  const [subject, setSubject] = useState<Subject>(editingQuestion?.subject || 'literacy');
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(editingQuestion?.difficulty || 1);
  const [skillCode, setSkillCode] = useState<SkillCode>(editingQuestion?.skillCode || '1');

  // Question Content
  const [questionTh, setQuestionTh] = useState(editingQuestion?.question.th || '');
  const [questionEn, setQuestionEn] = useState(editingQuestion?.question.en || '');
  const [illustration, setIllustration] = useState(editingQuestion?.illustration || '⭐');
  const [illustrationSubtitle, setIllustrationSubtitle] = useState(
    editingQuestion?.illustrationSubtitle?.th || ''
  );
  const [explanationTh, setExplanationTh] = useState(editingQuestion?.explanation.th || '');

  // Image Upload / Preset State
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [imageSizeKb, setImageSizeKb] = useState<number | null>(null);
  const [presetCategory, setPresetCategory] = useState<string>('all');
  const [showPresetPicker, setShowPresetPicker] = useState(false);

  // 3 Answer Options
  const [opt1Label, setOpt1Label] = useState('');
  const [opt1Icon, setOpt1Icon] = useState('🍎');
  const [opt2Label, setOpt2Label] = useState('');
  const [opt2Icon, setOpt2Icon] = useState('🍌');
  const [opt3Label, setOpt3Label] = useState('');
  const [opt3Icon, setOpt3Icon] = useState('🍊');
  const [correctIndex, setCorrectIndex] = useState<0 | 1 | 2>(0);

  // Validation state
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Populate form if editing existing question
  useEffect(() => {
    if (editingQuestion) {
      setGrade(editingQuestion.grade);
      setSubject(editingQuestion.subject);
      setDifficulty(editingQuestion.difficulty);
      setSkillCode(editingQuestion.skillCode || '1');
      setQuestionTh(editingQuestion.question.th || '');
      setQuestionEn(editingQuestion.question.en || '');
      setIllustration(editingQuestion.illustration || '⭐');
      setIllustrationSubtitle(editingQuestion.illustrationSubtitle?.th || '');
      setExplanationTh(editingQuestion.explanation.th || '');

      if (isImageUrl(editingQuestion.illustration)) {
        setQuestionType('image');
      } else {
        setQuestionType('text');
      }

      if (editingQuestion.options.length >= 3) {
        setOpt1Label(editingQuestion.options[0].label.th || '');
        setOpt1Icon(editingQuestion.options[0].icon || '🍎');
        setOpt2Label(editingQuestion.options[1].label.th || '');
        setOpt2Icon(editingQuestion.options[1].icon || '🍌');
        setOpt3Label(editingQuestion.options[2].label.th || '');
        setOpt3Icon(editingQuestion.options[2].icon || '🍊');

        const corrIdx = editingQuestion.options.findIndex((o) => o.id === editingQuestion.correctOptionId);
        setCorrectIndex(corrIdx >= 0 ? (corrIdx as 0 | 1 | 2) : 0);
      }
    }
  }, [editingQuestion]);

  // Subject Category Tab ('thai_phonics' | 'early_childhood' | 'cbe')
  const [subjectCategory, setSubjectCategory] = useState<'thai_phonics' | 'early_childhood' | 'cbe'>('thai_phonics');

  // Sync skillCode when subject changes
  const handleSubjectChange = (newSubject: Subject) => {
    setSubject(newSubject);
    const found =
      THAI_PHONICS_UNITS_LIST.find((s) => s.id === newSubject) ||
      CBE_COMPETENCIES_LIST.find((s) => s.id === newSubject) ||
      SKILLS_LIST.find((s) => s.id === newSubject);
    if (found) {
      setSkillCode(found.code);
    }
  };

  // Handle Main Question Image File Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingImage(true);
    try {
      // Compress to max 500px, 82% quality to save space in LocalStorage JSON
      const res = await processAndCompressImage(file, 500, 0.82);
      setIllustration(res.dataUrl);
      setImageSizeKb(res.sizeKb);
      setQuestionType('image');
      showToast(`อัปโหลดรูปภาพสำเร็จ (${res.width}x${res.height}px, ${res.sizeKb} KB) 📸`);
    } catch (err: any) {
      showToast(err.message || 'ไม่สามารถอัปโหลดรูปภาพได้');
    } finally {
      setIsProcessingImage(false);
      e.target.value = '';
    }
  };

  // Handle Option Image Upload
  const handleOptionImageUpload = async (optIdx: 0 | 1 | 2, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await processAndCompressImage(file, 200, 0.8);
      if (optIdx === 0) setOpt1Icon(res.dataUrl);
      if (optIdx === 1) setOpt2Icon(res.dataUrl);
      if (optIdx === 2) setOpt3Icon(res.dataUrl);
      showToast(`อัปโหลดรูปตัวเลือกที่ ${optIdx + 1} สำเร็จ ✨`);
    } catch (err: any) {
      showToast(err.message || 'เกิดข้อผิดพลาดในการอัปโหลดรูปตัวเลือก');
    } finally {
      e.target.value = '';
    }
  };

  // Handle selecting educational preset sticker
  const handleSelectPreset = (item: EducationalPresetItem) => {
    setIllustration(item.symbol);
    if (!illustrationSubtitle) {
      setIllustrationSubtitle(item.name);
    }
    setShowPresetPicker(false);
    showToast(`เลือกสติ๊กเกอร์ "${item.name}" เรียบร้อยแล้ว ✨`);
  };

  // Filtered preset stickers
  const filteredPresets =
    presetCategory === 'all'
      ? EDUCATIONAL_STICKER_PRESETS
      : EDUCATIONAL_STICKER_PRESETS.filter((p) => p.category === presetCategory);

  // Validate form
  const validate = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!questionTh.trim()) {
      errors.questionTh = 'กรุณากรอกข้อความคำถามภาษาไทย';
    }
    if (!opt1Label.trim()) {
      errors.opt1 = 'กรุณาระบุตัวเลือกที่ 1';
    }
    if (!opt2Label.trim()) {
      errors.opt2 = 'กรุณาระบุตัวเลือกที่ 2';
    }
    if (!opt3Label.trim()) {
      errors.opt3 = 'กรุณาระบุตัวเลือกที่ 3';
    }
    if (!illustration.trim()) {
      errors.illustration = 'กรุณาเลือกหรืออัปโหลดภาพ/อีโมจิประกอบ';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save to Local Storage JSON
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }

    const optIds = [
      editingQuestion?.options[0]?.id || `opt-1-${Date.now()}`,
      editingQuestion?.options[1]?.id || `opt-2-${Date.now()}`,
      editingQuestion?.options[2]?.id || `opt-3-${Date.now()}`,
    ];

    const questionData: Question = {
      id: editingQuestion ? editingQuestion.id : `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      grade,
      subject,
      skillCode,
      difficulty,
      question: {
        th: questionTh.trim(),
        en: questionEn.trim() || questionTh.trim(),
        zh: questionTh.trim(),
      },
      illustration: illustration.trim() || '⭐',
      illustrationSubtitle: illustrationSubtitle.trim()
        ? {
            th: illustrationSubtitle.trim(),
            en: illustrationSubtitle.trim(),
            zh: illustrationSubtitle.trim(),
          }
        : undefined,
      options: [
        {
          id: optIds[0],
          label: { th: opt1Label.trim(), en: opt1Label.trim(), zh: opt1Label.trim() },
          icon: opt1Icon.trim() || undefined,
        },
        {
          id: optIds[1],
          label: { th: opt2Label.trim(), en: opt2Label.trim(), zh: opt2Label.trim() },
          icon: opt2Icon.trim() || undefined,
        },
        {
          id: optIds[2],
          label: { th: opt3Label.trim(), en: opt3Label.trim(), zh: opt3Label.trim() },
          icon: opt3Icon.trim() || undefined,
        },
      ],
      correctOptionId: optIds[correctIndex],
      explanation: {
        th:
          explanationTh.trim() ||
          `ยอดเยี่ยมมากเลยครับ! คำตอบที่ถูกต้องคือ "${[opt1Label, opt2Label, opt3Label][correctIndex]}"`,
        en: 'Well done! That is the correct answer!',
        zh: '太棒了！答对了！',
      },
      isCustom: true,
      updatedAt: new Date().toISOString(),
    };

    if (editingQuestion) {
      storageService.updateQuestion(editingQuestion.id, questionData);
      showToast('บันทึกการแก้ไขข้อสอบลง Local Storage JSON สำเร็จแล้ว ✨');
    } else {
      storageService.addCustomQuestion(questionData);
      showToast('เพิ่มข้อสอบใหม่ลง Local Storage JSON สำเร็จแล้ว 🎉');
    }

    // Try cloud sync in background
    saveCloudCustomQuestion(questionData).catch(() => {});

    onSaved(questionData);
  };

  // Quick reset form
  const handleResetForm = () => {
    setQuestionTh('');
    setQuestionEn('');
    setIllustration('⭐');
    setIllustrationSubtitle('');
    setExplanationTh('');
    setOpt1Label('');
    setOpt1Icon('🍎');
    setOpt2Label('');
    setOpt2Icon('🍌');
    setOpt3Label('');
    setOpt3Icon('🍊');
    setCorrectIndex(0);
    setFormErrors({});
    setImageSizeKb(null);
  };

  const currentSkillInfo =
    THAI_PHONICS_UNITS_LIST.find((s) => s.id === subject) ||
    CBE_COMPETENCIES_LIST.find((s) => s.id === subject) ||
    SKILLS_LIST.find((s) => s.id === subject) ||
    SKILLS_LIST[0];

  return (
    <form onSubmit={handleSave} className="space-y-5">
      {/* Top Banner & Mode Toggle */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
            <span>{editingQuestion ? '✏️ แก้ไขข้อสอบ' : '➕ เพิ่มข้อสอบสำหรับผู้ปกครอง & คุณครู'}</span>
            <span className="bg-white/20 text-xs px-2.5 py-0.5 rounded-full font-bold">Local Storage JSON</span>
          </h3>
          <p className="text-amber-100 text-xs mt-0.5">
            สร้างคำถามเพื่อพัฒนาทักษะเด็กปฐมวัยตามหลักสูตร เลือกความยาก วิชา และภาพประกอบได้อิสระ
          </p>
        </div>

        {/* Question Type Switcher */}
        <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setQuestionType('image')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              questionType === 'image'
                ? 'bg-white text-orange-900 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>คำถามแบบรูปภาพ</span>
          </button>
          <button
            type="button"
            onClick={() => setQuestionType('text')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              questionType === 'text'
                ? 'bg-white text-orange-900 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>คำถามแบบข้อความ</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1. Grade & Difficulty Selection */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-4 space-y-3">
            <h4 className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>ระดับชั้น และ ระดับความยาก (Grade & Difficulty)</span>
            </h4>

            <div className="space-y-3">
              {/* Grade Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  ระดับชั้น (Grade Level - ปฐมวัย อ.1-อ.3 & ประถมศึกษา ป.1-ป.6)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-9 gap-1">
                  {(['K1', 'K2', 'K3', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as Grade[]).map((g) => {
                    const gradeLabels: { [key in Grade]: string } = {
                      K1: 'อ.1 (3-4 ขวบ)',
                      K2: 'อ.2 (4-5 ขวบ)',
                      K3: 'อ.3 (5-6 ขวบ)',
                      P1: 'ป.1 (6-7 ขวบ)',
                      P2: 'ป.2 (7-8 ขวบ)',
                      P3: 'ป.3 (8-9 ขวบ)',
                      P4: 'ป.4 (9-10 ขวบ)',
                      P5: 'ป.5 (10-11 ขวบ)',
                      P6: 'ป.6 (11-12 ขวบ)',
                    };
                    const isSel = grade === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGrade(g)}
                        className={`py-1.5 px-1 rounded-xl text-xs font-black border transition-all cursor-pointer text-center ${
                          isSel
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xs ring-2 ring-amber-300'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
                        }`}
                      >
                        <div>{g}</div>
                        <div className="text-[8px] opacity-80 font-normal leading-tight">{gradeLabels[g]}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty Level Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  ระดับความยาก (Difficulty Level)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { level: 1 as const, stars: '⭐', label: 'ง่าย (Easy)', color: 'border-emerald-400 text-emerald-800 bg-emerald-50' },
                    { level: 2 as const, stars: '⭐⭐', label: 'ปานกลาง', color: 'border-amber-400 text-amber-800 bg-amber-50' },
                    { level: 3 as const, stars: '⭐⭐⭐', label: 'ท้าทาย', color: 'border-rose-400 text-rose-800 bg-rose-50' },
                  ].map((d) => {
                    const isSel = difficulty === d.level;
                    return (
                      <button
                        key={d.level}
                        type="button"
                        onClick={() => setDifficulty(d.level)}
                        className={`py-2 px-1 rounded-xl text-xs font-black border transition-all cursor-pointer text-center ${
                          isSel
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-orange-700 shadow-xs scale-102 ring-2 ring-amber-300'
                            : `${d.color} hover:opacity-90`
                        }`}
                      >
                        <div className="text-[11px]">{d.stars}</div>
                        <div className="text-[10px] mt-0.5">{d.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Skill Subject Selection */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-4 space-y-2.5">
            <h4 className="text-xs font-black text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>วิชา / หน่วยการเรียนรู้ (Curriculum Subject)</span>
              </div>
              <span className="text-[11px] font-bold text-amber-700">
                {currentSkillInfo.icon} {currentSkillInfo.name.th}
              </span>
            </h4>

            {/* Subject Curriculum Category Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl text-xs font-black">
              <button
                type="button"
                onClick={() => setSubjectCategory('thai_phonics')}
                className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                  subjectCategory === 'thai_phonics'
                    ? 'bg-white text-amber-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📖 10 หน่วยแจกลูก (ป.1-ป.6)
              </button>
              <button
                type="button"
                onClick={() => setSubjectCategory('early_childhood')}
                className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                  subjectCategory === 'early_childhood'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🧸 8 ทักษะปฐมวัย (อ.1-อ.3)
              </button>
              <button
                type="button"
                onClick={() => setSubjectCategory('cbe')}
                className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                  subjectCategory === 'cbe'
                    ? 'bg-white text-purple-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎯 6 สมรรถนะ (CBE)
              </button>
            </div>

            {/* Subject Buttons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-48 overflow-y-auto p-0.5">
              {(subjectCategory === 'thai_phonics'
                ? THAI_PHONICS_UNITS_LIST
                : subjectCategory === 'cbe'
                ? CBE_COMPETENCIES_LIST
                : SKILLS_LIST
              ).map((s) => {
                const isSel = subject === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSubjectChange(s.id as Subject)}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                      isSel
                        ? 'bg-amber-100 border-amber-500 text-amber-950 font-black shadow-xs ring-2 ring-amber-200'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 font-bold'
                    }`}
                  >
                    <div className="text-base mb-0.5">{s.icon}</div>
                    <div className="text-[11px] leading-tight truncate">{s.name.th}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Question Text & Illustration / Image */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-4 space-y-3">
            <h4 className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                3
              </span>
              <span>ข้อความคำถาม และภาพประกอบ (Question & Illustration)</span>
            </h4>

            {/* Question Text (Thai) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-700">
                  ข้อความคำถาม (ภาษาไทย) <span className="text-rose-500">*</span>
                </label>
                {questionTh.trim() && (
                  <button
                    type="button"
                    onClick={() => speakText(questionTh, 'th', 'adult_female', 1)}
                    className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" /> ฟังเสียงอ่าน
                  </button>
                )}
              </div>
              <input
                type="text"
                value={questionTh}
                onChange={(e) => setQuestionTh(e.target.value)}
                placeholder="เช่น ผลไม้อะไรมีสีแดงและมีรสหวานฉ่ำ?"
                className={`w-full bg-white border ${
                  formErrors.questionTh ? 'border-rose-400 ring-2 ring-rose-200' : 'border-slate-300'
                } rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400`}
              />
              {formErrors.questionTh && (
                <p className="text-[10px] text-rose-500 font-bold mt-1">{formErrors.questionTh}</p>
              )}
            </div>

            {/* Question Text (English - Optional) */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                คำถามภาษาอังกฤษ (English - ไม่บังคับ)
              </label>
              <input
                type="text"
                value={questionEn}
                onChange={(e) => setQuestionEn(e.target.value)}
                placeholder="e.g. Which fruit is red and sweet?"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Illustration / Image Selector */}
            <div className="border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-slate-700">
                  {questionType === 'image' ? '🖼️ รูปภาพประกอบคำถาม' : '✨ อีโมจิหรือสัญลักษณ์ประกอบคำถาม'}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPresetPicker(!showPresetPicker)}
                    className="text-[11px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-lg cursor-pointer transition-colors"
                  >
                    🎨 เลือกจากคลังรูปภาพปฐมวัย
                  </button>
                </div>
              </div>

              {/* Image Upload Box or Text/Emoji Box */}
              {questionType === 'image' ? (
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-300">
                    {/* Preview Thumbnail */}
                    <div className="w-24 h-24 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0 relative">
                      {isImageUrl(illustration) ? (
                        <img
                          src={illustration}
                          alt="Question Preview"
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <span className="text-3xl">{illustration || '🖼️'}</span>
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                        <label className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isProcessingImage ? 'กำลังประมวลผล...' : 'อัปโหลดรูปจากเครื่อง'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isProcessingImage}
                            className="hidden"
                          />
                        </label>
                        {isImageUrl(illustration) && (
                          <button
                            type="button"
                            onClick={() => {
                              setIllustration('⭐');
                              setImageSizeKb(null);
                            }}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-1.5 rounded-xl border border-rose-200 cursor-pointer"
                          >
                            ลบรูปภาพ
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500">
                        รองรับไฟล์ JPG, PNG, WebP • ย่อส่วนและบีบอัดอัตโนมัติเพื่อประหยัดพื้นที่ Local Storage
                        {imageSizeKb !== null && ` (${imageSizeKb} KB)`}
                      </p>
                    </div>
                  </div>

                  {/* Or enter Image URL */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-bold shrink-0">หรือลิงก์รูปภาพ:</span>
                    <input
                      type="text"
                      value={illustration.startsWith('data:') ? '' : illustration}
                      onChange={(e) => setIllustration(e.target.value)}
                      placeholder="https://example.com/image.png"
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>
              ) : (
                /* Text/Emoji Illustration Box */
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={illustration}
                    onChange={(e) => setIllustration(e.target.value)}
                    placeholder="เช่น 🍎 🍎 🍎 หรือ 🚗"
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-base font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <div className="w-12 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    {illustration || '⭐'}
                  </div>
                </div>
              )}

              {/* Subtitle / Clue */}
              <div className="mt-2.5">
                <label className="block text-[10px] font-bold text-slate-500 mb-1">
                  คำใบ้ / ข้อความบรรยายใต้ภาพ (เช่น &quot;แอปเปิ้ล 3 ผล&quot; - ไม่บังคับ)
                </label>
                <input
                  type="text"
                  value={illustrationSubtitle}
                  onChange={(e) => setIllustrationSubtitle(e.target.value)}
                  placeholder="เช่น แอปเปิ้ลสีแดงสด"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Educational Preset Stickers Modal / Drawer */}
              {showPresetPicker && (
                <div className="mt-3 p-3 bg-amber-50/90 rounded-2xl border-2 border-amber-300 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-900">
                      🎨 คลังรูปภาพและสัญลักษณ์เพื่อการศึกษาปฐมวัย (40+ รูปแบบ)
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPresetPicker(false)}
                      className="text-amber-800 hover:text-amber-950 text-xs font-bold cursor-pointer"
                    >
                      ปิด ✕
                    </button>
                  </div>

                  {/* Preset Category Filters */}
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: 'all', label: 'ทั้งหมด' },
                      { id: 'animals', label: 'สัตว์' },
                      { id: 'fruits', label: 'ผลไม้' },
                      { id: 'shapes', label: 'รูปทรง' },
                      { id: 'numbers', label: 'ตัวเลข' },
                      { id: 'vehicles', label: 'ยานพาหนะ' },
                      { id: 'emotions', label: 'อารมณ์' },
                      { id: 'nature', label: 'ธรรมชาติ' },
                      { id: 'objects', label: 'สิ่งของ' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setPresetCategory(cat.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                          presetCategory === cat.id
                            ? 'bg-amber-600 text-white border-amber-700'
                            : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Preset Grid */}
                  <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 max-h-40 overflow-y-auto p-1 bg-white rounded-xl border border-amber-200">
                    {filteredPresets.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectPreset(item)}
                        className="p-1.5 rounded-lg hover:bg-amber-100 flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95"
                        title={item.name}
                      >
                        <span className="text-xl">{item.symbol}</span>
                        <span className="text-[9px] text-slate-600 truncate w-full text-center">
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4. Answer Options (3 Options) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                  4
                </span>
                <span>ตัวเลือกคำตอบ 3 ข้อ (กำหนดคำตอบที่ถูกต้อง)</span>
              </h4>
              <span className="text-[10px] text-slate-500 font-medium">คลิก ⭐ ที่ข้อเพื่อเลือกเป็นคำตอบถูก</span>
            </div>

            {/* Options List */}
            {[
              {
                index: 0 as const,
                label: opt1Label,
                setLabel: setOpt1Label,
                icon: opt1Icon,
                setIcon: setOpt1Icon,
                error: formErrors.opt1,
              },
              {
                index: 1 as const,
                label: opt2Label,
                setLabel: setOpt2Label,
                icon: opt2Icon,
                setIcon: setOpt2Icon,
                error: formErrors.opt2,
              },
              {
                index: 2 as const,
                label: opt3Label,
                setLabel: setOpt3Label,
                icon: opt3Icon,
                setIcon: setOpt3Icon,
                error: formErrors.opt3,
              },
            ].map((opt) => {
              const isCorrect = correctIndex === opt.index;
              return (
                <div
                  key={opt.index}
                  className={`p-2.5 sm:p-3 rounded-xl border-2 transition-all ${
                    isCorrect
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {/* Correct Answer Star Selector */}
                    <button
                      type="button"
                      onClick={() => setCorrectIndex(opt.index)}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                        isCorrect
                          ? 'bg-emerald-600 text-white shadow-xs scale-110'
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                      title={isCorrect ? 'ข้อนี้เป็นคำตอบที่ถูกต้อง' : 'คลิกเพื่อตั้งเป็นคำตอบที่ถูกต้อง'}
                    >
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <Star className="w-3.5 h-3.5" />}
                    </button>

                    {/* Option Icon / Image Thumbnail */}
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shrink-0 overflow-hidden">
                      {isImageUrl(opt.icon) ? (
                        <img src={opt.icon} alt="Option icon" className="w-full h-full object-cover" />
                      ) : (
                        <span>{opt.icon || '✨'}</span>
                      )}
                    </div>

                    {/* Option Icon input */}
                    <input
                      type="text"
                      value={opt.icon.startsWith('data:') ? '' : opt.icon}
                      onChange={(e) => opt.setIcon(e.target.value)}
                      placeholder="อีโมจิ"
                      className="w-14 bg-slate-50 border border-slate-200 rounded-lg px-1.5 py-1 text-center text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                      title="ใส่อีโมจิของตัวเลือก"
                    />

                    {/* Option Upload Mini Button */}
                    <label
                      className="p-1 text-slate-400 hover:text-amber-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                      title="อัปโหลดรูปภาพตัวเลือก"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleOptionImageUpload(opt.index, e)}
                        className="hidden"
                      />
                    </label>

                    {/* Option Label Text */}
                    <input
                      type="text"
                      value={opt.label}
                      onChange={(e) => opt.setLabel(e.target.value)}
                      placeholder={`ข้อที่ ${opt.index + 1}`}
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />

                    {/* TTS Preview */}
                    {opt.label.trim() && (
                      <button
                        type="button"
                        onClick={() => speakText(opt.label, 'th', 'adult_female', 1)}
                        className="p-1 text-slate-400 hover:text-blue-600 rounded-lg cursor-pointer"
                        title="ฟังเสียงตัวเลือก"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {opt.error && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-9">{opt.error}</p>}
                </div>
              );
            })}
          </div>

          {/* 5. Explanation / Praise Message */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-4 space-y-2">
            <h4 className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                5
              </span>
              <span>คำอธิบายเมื่อเด็กตอบถูก (Explanation & Praise)</span>
            </h4>
            <input
              type="text"
              value={explanationTh}
              onChange={(e) => setExplanationTh(e.target.value)}
              placeholder={`เช่น เก่งมากเลยครับ! คำตอบที่ถูกต้องคือ "${[opt1Label, opt2Label, opt3Label][correctIndex] || '...'}"`}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Right Column: Kid's Real Game Preview Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-4 space-y-4">
            {/* Real Game Preview Card Container */}
            <div className="bg-slate-800 rounded-3xl p-3 border-4 border-slate-700 shadow-xl text-white">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700 text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-black">
                  <Eye className="w-4 h-4" />
                  <span>จำลองหน้าจอจริงของเด็ก (Kid&apos;s View)</span>
                </div>
                <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded-full text-slate-300 font-mono">
                  {grade} • {difficulty === 1 ? '⭐ ง่าย' : difficulty === 2 ? '⭐⭐ ปานกลาง' : '⭐⭐⭐ ท้าทาย'}
                </span>
              </div>

              {/* Mock Question Stage */}
              <div className="bg-white rounded-2xl p-3 border-2 border-blue-200 shadow-inner text-slate-800">
                {/* Header Blue Pill */}
                <div className="bg-blue-500 text-white p-2.5 rounded-xl text-center shadow-xs mb-2.5">
                  <div className="text-[11px] font-black leading-snug">
                    ❓ {questionTh.trim() || 'คำถามจะปรากฏที่นี่...'}
                  </div>
                </div>

                {/* Illustration Card */}
                <div className="flex flex-col items-center justify-center py-2 mb-2 bg-slate-50 rounded-xl border border-slate-100 min-h-[90px]">
                  {isImageUrl(illustration) ? (
                    <img
                      src={illustration}
                      alt="Question Illustration"
                      className="max-h-24 max-w-full object-contain rounded-lg p-1"
                    />
                  ) : (
                    <div className="text-4xl select-none">{illustration || '⭐'}</div>
                  )}
                  {illustrationSubtitle && (
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200 mt-1 shadow-2xs">
                      {illustrationSubtitle}
                    </span>
                  )}
                </div>

                {/* Options Cards */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: opt1Label, icon: opt1Icon, isCorrect: correctIndex === 0 },
                    { label: opt2Label, icon: opt2Icon, isCorrect: correctIndex === 1 },
                    { label: opt3Label, icon: opt3Icon, isCorrect: correctIndex === 2 },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-xl border-b-4 text-center flex flex-col items-center justify-center transition-all ${
                        item.isCorrect
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-black ring-2 ring-emerald-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700 font-bold'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg mb-1 shadow-2xs overflow-hidden border border-slate-100">
                        {isImageUrl(item.icon) ? (
                          <img src={item.icon} alt="Option" className="w-full h-full object-cover" />
                        ) : (
                          item.icon || '✨'
                        )}
                      </div>
                      <div className="text-[11px] leading-tight truncate w-full">
                        {item.label.trim() || `ข้อ ${idx + 1}`}
                      </div>
                      {item.isCorrect && (
                        <span className="text-[9px] bg-emerald-600 text-white px-1.5 rounded-md mt-1 font-bold">
                          ✓ คำตอบถูก
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 space-y-2.5">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all text-sm"
              >
                <Save className="w-4 h-4" />
                <span>{editingQuestion ? 'บันทึกการแก้ไขลง Local Storage' : '💾 บันทึกข้อสอบลง Local Storage JSON'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {onViewJSON && (
                  <button
                    type="button"
                    onClick={onViewJSON}
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-amber-600" />
                    <span>ดูใน JSON</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>ล้างฟอร์ม</span>
                </button>
              </div>

              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full text-slate-500 hover:text-slate-800 text-xs font-bold py-1 text-center cursor-pointer transition-colors"
                >
                  ยกเลิกและกลับไปที่รายการ
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
