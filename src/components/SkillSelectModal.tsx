import React, { useState } from 'react';
import { X, Check, Sparkles, BookOpen, Minus, Plus, Star, Search } from 'lucide-react';
import { Grade, Subject } from '../types';
import {
  SKILLS_LIST,
  CORE_5_SKILL_IDS,
  CBE_COMPETENCIES_LIST,
  CBE_COMPETENCY_IDS,
  THAI_PHONICS_UNITS_LIST,
  THAI_PHONICS_UNIT_IDS,
} from '../data/skills';
import { soundEffects } from '../services/audioService';

interface SkillSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSubjects: Subject[];
  onApplySkills: (subjects: Subject[]) => void;
  currentGrade: Grade;
  soundVolume: number;
  questionsPerSkill?: number;
  onChangeQuestionsPerSkill?: (count: number) => void;
}

export const SkillSelectModal: React.FC<SkillSelectModalProps> = ({
  isOpen,
  onClose,
  selectedSubjects,
  onApplySkills,
  currentGrade,
  soundVolume,
  questionsPerSkill = 3,
  onChangeQuestionsPerSkill,
}) => {
  const isDefaultTab = selectedSubjects.some((s) => THAI_PHONICS_UNIT_IDS.includes(s))
    ? 'thai_phonics'
    : ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(currentGrade) || selectedSubjects.some((s) => CBE_COMPETENCY_IDS.includes(s))
    ? 'cbe_primary'
    : 'early_childhood';

  const [activeTab, setActiveTab] = useState<'early_childhood' | 'cbe_primary' | 'thai_phonics'>(isDefaultTab);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const isCbe = activeTab === 'cbe_primary';
  const isPhonics = activeTab === 'thai_phonics';
  const categoryLabel = isPhonics ? 'หน่วย' : isCbe ? 'สมรรถนะ' : 'ทักษะ';

  // Toggle selection
  const handleToggle = (subjectId: Subject) => {
    soundEffects.playTap(soundVolume);
    if (selectedSubjects.includes(subjectId)) {
      if (selectedSubjects.length === 1) {
        return;
      }
      onApplySkills(selectedSubjects.filter((s) => s !== subjectId));
    } else {
      onApplySkills([...selectedSubjects, subjectId]);
    }
  };

  // Early childhood presets
  const handleSelectAllEarly = () => {
    soundEffects.playCorrect(soundVolume);
    onApplySkills(SKILLS_LIST.map((s) => s.id));
  };

  const handleSelectCore5 = () => {
    soundEffects.playCorrect(soundVolume);
    onApplySkills([...CORE_5_SKILL_IDS]);
  };

  const handleSelectTrio = () => {
    soundEffects.playCorrect(soundVolume);
    onApplySkills(['thai', 'english', 'math']);
  };

  // CBE presets
  const handleSelectAllCbe = () => {
    soundEffects.playCorrect(soundVolume);
    onApplySkills([...CBE_COMPETENCY_IDS]);
  };

  const handleSelectCbeThinkingSelf = () => {
    soundEffects.playCorrect(soundVolume);
    onApplySkills(['self_management', 'higher_order_thinking']);
  };

  const handleSelectCbeCommTeam = () => {
    soundEffects.playCorrect(soundVolume);
    onApplySkills(['communication', 'teamwork_collaboration']);
  };

  const handleSelectCbeCitizenSust = () => {
    soundEffects.playCorrect(soundVolume);
    onApplySkills(['active_citizenship', 'sustainable_living']);
  };

  // Thai Phonics presets
  const handleSelectAllPhonics = () => {
    soundEffects.playCorrect(soundVolume);
    onApplySkills([...THAI_PHONICS_UNIT_IDS]);
  };

  const handleSelectPhonicsBasic = () => {
    soundEffects.playCorrect(soundVolume);
    onApplySkills(['phonics_consonant', 'phonics_vowel', 'phonics_tone', 'phonics_korkaa', 'phonics_tone_korkaa']);
  };

  const handleSelectPhonicsDirect = () => {
    soundEffects.playCorrect(soundVolume);
    onApplySkills(['phonics_direct_spelling', 'phonics_tone_spelling']);
  };

  const handleSelectPhonicsAdvanced = () => {
    soundEffects.playCorrect(soundVolume);
    onApplySkills(['phonics_indirect_spelling', 'phonics_cluster', 'phonics_leading_consonant']);
  };

  const handleSelectOnly = (subjectId: Subject) => {
    soundEffects.playTap(soundVolume);
    onApplySkills([subjectId]);
  };

  const isCore5Selected =
    !isCbe &&
    !isPhonics &&
    selectedSubjects.length === 5 &&
    CORE_5_SKILL_IDS.every((s) => selectedSubjects.includes(s));

  const isAll8Selected = !isCbe && !isPhonics && selectedSubjects.length === 8;

  const isTrioSelected =
    !isCbe &&
    !isPhonics &&
    selectedSubjects.length === 3 &&
    (selectedSubjects.includes('thai') || selectedSubjects.includes('literacy')) &&
    selectedSubjects.includes('english') &&
    selectedSubjects.includes('math');

  const isAll6CbeSelected =
    isCbe &&
    selectedSubjects.length === 6 &&
    CBE_COMPETENCY_IDS.every((s) => selectedSubjects.includes(s));

  const isAll10PhonicsSelected =
    isPhonics &&
    selectedSubjects.length === 10 &&
    THAI_PHONICS_UNIT_IDS.every((s) => selectedSubjects.includes(s));

  const handleCountChange = (newCount: number) => {
    const valid = Math.max(1, Math.min(20, Math.round(newCount)));
    soundEffects.playTap(soundVolume);
    if (onChangeQuestionsPerSkill) {
      onChangeQuestionsPerSkill(valid);
    }
  };

  const gradeName =
    currentGrade === 'K1'
      ? 'อนุบาล 1 (3-4 ปี)'
      : currentGrade === 'K2'
      ? 'อนุบาล 2 (4-5 ปี)'
      : currentGrade === 'K3'
      ? 'อนุบาล 3 (5-6 ปี)'
      : currentGrade === 'P1'
      ? 'ประถมศึกษาปีที่ 1 (ป.1)'
      : currentGrade === 'P2'
      ? 'ประถมศึกษาปีที่ 2 (ป.2)'
      : currentGrade === 'P3'
      ? 'ประถมศึกษาปีที่ 3 (ป.3)'
      : currentGrade === 'P4'
      ? 'ประถมศึกษาปีที่ 4 (ป.4)'
      : currentGrade === 'P5'
      ? 'ประถมศึกษาปีที่ 5 (ป.5)'
      : 'ประถมศึกษาปีที่ 6 (ป.6)';

  const activeSkillsList =
    activeTab === 'thai_phonics'
      ? THAI_PHONICS_UNITS_LIST
      : isCbe
      ? CBE_COMPETENCIES_LIST
      : SKILLS_LIST;

  const filteredSkillsList = activeSkillsList.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.th.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.shortName.th.toLowerCase().includes(q)
    );
  });

  return (
    <div
      id="skill-select-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 animate-in fade-in duration-200"
    >
      <div
        id="skill-select-modal"
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full border-4 border-indigo-200 overflow-hidden max-h-[94vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 sm:p-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-xs">
              {isPhonics ? '📖' : isCbe ? '🧠' : '🎯'}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">
                {isPhonics
                  ? 'หลักสูตรการสอนอ่านเขียนโดยการแจกลูกสะกดคำ สพฐ. (๑๐ หน่วย)'
                  : isCbe
                  ? 'หลักสูตรสถานศึกษาฐานสมรรถนะ (6 สมรรถนะ)'
                  : 'เลือกทักษะที่จะสอบ • พัฒนาการปฐมวัย'}
              </h2>
              <p className="text-xs text-blue-100 font-medium">
                ระดับชั้น: <span className="font-black underline">{gradeName}</span> • กำหนดจำนวนข้อและเลือกหมวดหมู่ที่ต้องการประเมิน
              </p>
            </div>
          </div>
          <button
            id="btn-close-skill-modal"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 flex flex-col gap-4">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-1.5 w-full sm:w-auto flex-wrap sm:flex-nowrap">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('early_childhood');
                  const hasAnyEarly = selectedSubjects.some((s) => SKILLS_LIST.some((sk) => sk.id === s));
                  if (!hasAnyEarly) {
                    onApplySkills(SKILLS_LIST.map((s) => s.id));
                  }
                }}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'early_childhood'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                🌸 1. ปฐมวัย (8 ด้าน • อ.1 - อ.3)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('cbe_primary');
                  const hasAnyCbe = selectedSubjects.some((s) => CBE_COMPETENCY_IDS.includes(s));
                  if (!hasAnyCbe) {
                    onApplySkills([...CBE_COMPETENCY_IDS]);
                  }
                }}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'cbe_primary'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                🏫 2. ฐานสมรรถนะ (6 สมรรถนะ • ป.1 - ป.6)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('thai_phonics');
                  const hasAnyPhonics = selectedSubjects.some((s) => THAI_PHONICS_UNIT_IDS.includes(s));
                  if (!hasAnyPhonics) {
                    onApplySkills([...THAI_PHONICS_UNIT_IDS]);
                  }
                }}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'thai_phonics'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                📖 3. แจกลูกสะกดคำ (๑๐ หน่วย • ป.๑ - ป.๖ สพฐ.)
              </button>
            </div>
            <div className="text-xs font-bold text-slate-500 px-2">
              {isPhonics
                ? '๑๐ หน่วยการเรียนรู้อ่านเขียน สพฐ.'
                : isCbe
                ? '6 สมรรถนะหลักระดับประถมศึกษา'
                : '8 ทักษะพัฒนาการเด็กปฐมวัย'}
            </div>
          </div>

          {/* Controls: Questions Per Skill & Quick Presets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/90 p-3.5 sm:p-4 rounded-2xl border-2 border-indigo-200">
            {/* Setting: Questions per skill with stepper and input */}
            <div className="lg:col-span-6 flex flex-col justify-center gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                  <span>🔢 กำหนดจำนวนข้อสอบต่อ{categoryLabel}:</span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                    {questionsPerSkill} ข้อ / {categoryLabel}
                  </span>
                </span>
                <span className="text-[11px] font-black text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                  รวมทั้งหมด {selectedSubjects.length * questionsPerSkill} ข้อ
                </span>
              </div>

              {/* Stepper + Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <div className="flex items-center bg-white rounded-xl border border-indigo-200 shadow-2xs p-0.5">
                  <button
                    type="button"
                    onClick={() => handleCountChange(questionsPerSkill - 1)}
                    disabled={questionsPerSkill <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    title="ลดจำนวนข้อ"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={questionsPerSkill}
                    onChange={(e) => handleCountChange(parseInt(e.target.value) || 1)}
                    className="w-10 text-center font-black text-indigo-950 text-xs sm:text-sm bg-transparent border-0 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleCountChange(questionsPerSkill + 1)}
                    disabled={questionsPerSkill >= 20}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    title="เพิ่มจำนวนข้อ"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Preset Pills */}
                {[1, 2, 3, 5, 10].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleCountChange(count)}
                    className={`py-1.5 px-2.5 rounded-xl font-black text-xs transition-all cursor-pointer border ${
                      questionsPerSkill === count
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs scale-105'
                        : 'bg-white text-indigo-900 border-indigo-200 hover:bg-indigo-50'
                    }`}
                  >
                    {count} ข้อ
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Select Domain Presets */}
            <div className="lg:col-span-6 flex flex-col justify-center gap-1.5">
              <div className="text-xs font-black text-indigo-950 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>ปุ่มลัดเลือกกลุ่ม{categoryLabel}:</span>
              </div>
              {isPhonics ? (
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    id="btn-modal-select-all-phonics"
                    onClick={handleSelectAllPhonics}
                    className={`text-xs font-black px-3 py-1.5 rounded-xl cursor-pointer transition-all border flex items-center gap-1 shadow-2xs ${
                      isAll10PhonicsSelected
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-300'
                        : 'bg-white text-emerald-900 hover:bg-emerald-50 border-emerald-300'
                    }`}
                  >
                    <span>✨ ครบ ๑๐ หน่วย ({10 * questionsPerSkill} ข้อ)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSelectPhonicsBasic}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 cursor-pointer"
                  >
                    🌱 หน่วย ๑-๕ (พยัญชนะ สระ วรรณยุกต์ ก กา)
                  </button>

                  <button
                    type="button"
                    onClick={handleSelectPhonicsDirect}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-white hover:bg-teal-50 text-teal-900 border border-teal-200 cursor-pointer"
                  >
                    🎯 หน่วย ๖-๗ (ตรงตามมาตรา)
                  </button>

                  <button
                    type="button"
                    onClick={handleSelectPhonicsAdvanced}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-900 border border-indigo-200 cursor-pointer"
                  >
                    🚀 หน่วย ๘-๑๐ (ไม่ตรงมาตรา ควบกล้ำ อักษรนำ)
                  </button>
                </div>
              ) : !isCbe ? (
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    id="btn-modal-select-core-5"
                    onClick={handleSelectCore5}
                    className={`text-xs font-black px-3 py-1.5 rounded-xl cursor-pointer transition-all border flex items-center gap-1.5 shadow-2xs ${
                      isCore5Selected
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-600 shadow-xs scale-102 ring-2 ring-amber-300'
                        : 'bg-white text-amber-900 hover:bg-amber-50 border-amber-300'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-300" />
                    <span>🌟 5 ด้านหลัก ({5 * questionsPerSkill} ข้อ)</span>
                  </button>

                  <button
                    type="button"
                    id="btn-modal-select-all-skills"
                    onClick={handleSelectAllEarly}
                    className={`text-xs font-black px-3 py-1.5 rounded-xl cursor-pointer transition-all border ${
                      isAll8Selected
                        ? 'bg-blue-600 text-white border-blue-700 shadow-xs ring-2 ring-blue-300'
                        : 'bg-white text-blue-700 hover:bg-blue-100 border-blue-200'
                    }`}
                  >
                    ✨ ครบทั้ง 8 ด้าน ({8 * questionsPerSkill} ข้อ)
                  </button>

                  <button
                    type="button"
                    id="btn-modal-select-trio"
                    onClick={handleSelectTrio}
                    className={`text-xs font-black px-3 py-1.5 rounded-xl cursor-pointer transition-all border ${
                      isTrioSelected
                        ? 'bg-gradient-to-r from-rose-600 via-sky-600 to-amber-600 text-white border-transparent shadow-xs ring-2 ring-purple-300'
                        : 'bg-white text-indigo-700 hover:bg-indigo-50 border-indigo-200'
                    }`}
                  >
                    📖 3 เสาหลัก (ไทย•อังกฤษ•คณิต)
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    id="btn-modal-select-all-cbe"
                    onClick={handleSelectAllCbe}
                    className={`text-xs font-black px-3 py-1.5 rounded-xl cursor-pointer transition-all border flex items-center gap-1 shadow-2xs ${
                      isAll6CbeSelected
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs ring-2 ring-indigo-300'
                        : 'bg-white text-indigo-900 hover:bg-indigo-50 border-indigo-300'
                    }`}
                  >
                    <span>🎯 ครบทั้ง 6 สมรรถนะ ({6 * questionsPerSkill} ข้อ)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSelectCbeThinkingSelf}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-white hover:bg-violet-50 text-violet-900 border border-violet-200 cursor-pointer"
                  >
                    🧠 คิดขั้นสูง & ตนเอง
                  </button>

                  <button
                    type="button"
                    onClick={handleSelectCbeCommTeam}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 cursor-pointer"
                  >
                    💬 สื่อสาร & ทำงานเป็นทีม
                  </button>

                  <button
                    type="button"
                    onClick={handleSelectCbeCitizenSust}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-white hover:bg-teal-50 text-teal-900 border border-teal-200 cursor-pointer"
                  >
                    🌿 พลเมือง & วิทยาการยั่งยืน
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cards Grid: 8 Early Childhood or 6 CBE or 10 Phonics */}
          <div>
            <div className="text-xs font-bold text-slate-500 mb-2.5 flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-1.5 flex-wrap">
                <span>
                  {isPhonics
                    ? 'รายการ ๑๐ หน่วยการเรียนรู้แจกลูกสะกดคำ สพฐ. (ป.๑ - ป.๖):'
                    : isCbe
                    ? 'รายการ 6 สมรรถนะหลักสูตรสถานศึกษาฐานสมรรถนะ:'
                    : 'รายการทักษะพัฒนาการ (คลิกเพื่อเลือกหรือยกเลิก):'}
                </span>
                {isPhonics ? (
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                    ๑๐ หน่วยการเรียนรู้ สพฐ. (ป.1 - ป.6)
                  </span>
                ) : isCbe ? (
                  <span className="bg-indigo-100 text-indigo-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-indigo-200">
                    CBE Primary
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200">
                    ทักษะ 1-5 คือ พัฒนาการ 5 ด้านหลัก
                  </span>
                )}
              </span>

              {/* Search Bar & Selected counter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`ค้นหา${categoryLabel}...`}
                    className="pl-8 pr-6 py-1 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400 w-36 sm:w-48 font-semibold"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <span className="text-indigo-600 font-black text-xs shrink-0">
                  เลือกไว้ {selectedSubjects.length} {categoryLabel}
                </span>
              </div>
            </div>

            {filteredSkillsList.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-500 text-xs font-bold">
                ไม่พบ{categoryLabel}ที่ตรงกับคำค้นหา "{searchQuery}"
              </div>
            ) : (
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${isCbe ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-2.5`}>
                {filteredSkillsList.map((skill) => {
                const isSelected = selectedSubjects.includes(skill.id);
                const isCore5 = !isCbe && !isPhonics && CORE_5_SKILL_IDS.includes(skill.id);

                return (
                  <div
                    key={skill.id}
                    id={`skill-modal-card-${skill.id}`}
                    onClick={() => handleToggle(skill.id)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                      isSelected
                        ? isPhonics
                          ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-200 shadow-xs translate-y-[-1px]'
                          : isCbe
                          ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-200 shadow-xs translate-y-[-1px]'
                          : 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-200 shadow-xs translate-y-[-1px]'
                        : 'bg-slate-50/70 border-slate-200 hover:border-indigo-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                              isSelected
                                ? 'bg-white shadow-xs border border-indigo-200'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {skill.icon}
                          </div>
                          {isCore5 && (
                            <span className="text-[9px] font-black bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.2 rounded-md">
                              5 ด้านหลัก
                            </span>
                          )}
                          {isCbe && (
                            <span className="text-[10px] font-black bg-indigo-100 text-indigo-800 border border-indigo-300 px-1.5 py-0.2 rounded-md">
                              {skill.code}
                            </span>
                          )}
                          {isPhonics && (
                            <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.2 rounded-md">
                              {skill.code}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-black bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                            {questionsPerSkill} ข้อ
                          </span>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggle(skill.id);
                            }}
                            className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                              isSelected
                                ? isPhonics
                                  ? 'bg-emerald-600 text-white'
                                  : isCbe
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-blue-600 text-white'
                                : 'border-2 border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      </div>

                      <div className="font-black text-xs text-slate-800">
                        {skill.name.th}
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium mt-1 leading-snug line-clamp-3">
                        {skill.description}
                      </div>

                      {/* Skills Focus Bullet Points */}
                      <div className="mt-2 pt-2 border-t border-slate-200/70 space-y-0.5">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          จุดเน้นสำคัญ:
                        </div>
                        {skill.skillsFocus.slice(0, 3).map((f, i) => (
                          <div key={i} className="text-[10px] text-slate-600 flex items-start gap-1">
                            <span className="text-indigo-400">•</span>
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Button: Solo Select */}
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <button
                        type="button"
                        id={`btn-modal-select-only-${skill.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectOnly(skill.id);
                        }}
                        className={`text-[10px] font-black py-1 px-2 rounded-lg transition-all cursor-pointer border ${
                          isPhonics
                            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                            : isCbe
                            ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200'
                            : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200'
                        }`}
                      >
                        {isPhonics ? 'ประเมินเฉพาะหน่วยนี้' : isCbe ? 'เน้นเฉพาะสมรรถนะนี้' : 'สอบเฉพาะทักษะนี้'}
                      </button>

                      <span className="text-[10px] text-slate-400 font-medium">
                        {isSelected ? '✓ เลือกอยู่' : 'คลิกเพื่อเลือก'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs font-bold text-slate-600">
            รวมคำถามในการเล่นรอบนี้:{' '}
            <span className="font-black text-indigo-900 text-sm">
              {selectedSubjects.length * questionsPerSkill} ข้อ
            </span>{' '}
            (เลือกไว้ {selectedSubjects.length} {categoryLabel})
          </div>
          <button
            id="btn-apply-skills-modal"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md cursor-pointer transition-all active:scale-95"
          >
            เริ่มเล่นด้วยการตั้งค่านี้ ✨
          </button>
        </div>
      </div>
    </div>
  );
};
