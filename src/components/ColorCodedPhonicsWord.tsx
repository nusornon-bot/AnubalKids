import React, { useState } from 'react';
import { Volume2, Eye, Sparkles, Layers } from 'lucide-react';
import { soundEffects, speakText } from '../services/audioService';

export interface PhonicsPart {
  char: string;
  type: 'initial' | 'vowel' | 'final' | 'tone' | 'silent';
  label: string;
}

export interface PhonicsWordDetail {
  id: string;
  word: string;
  reading: string; // e.g. "กอ - อา - นอ - กาน"
  meaning: string;
  unitId: string;
  unitName: string;
  gradeLevel: string;
  parts: PhonicsPart[];
}

export const SAMPLE_COLOR_CODED_WORDS: PhonicsWordDetail[] = [
  {
    id: 'cw-1',
    word: 'กา',
    reading: 'กอ - อา - กา',
    meaning: 'นกตัวสีดำ หรือ ภาชนะใส่น้ำ',
    unitId: 'phonics_vowel',
    unitName: 'หน่วยที่ ๒: สระเดี่ยว-สระประสม',
    gradeLevel: 'ป.1',
    parts: [
      { char: 'ก', type: 'initial', label: 'พยัญชนะต้น' },
      { char: 'า', type: 'vowel', label: 'สระอา' },
    ],
  },
  {
    id: 'cw-2',
    word: 'บ้าน',
    reading: 'บอ - อา - นอ - บาน - ไม้โท - บ้าน',
    meaning: 'ที่อยู่อาศัยของคนในครอบครัว',
    unitId: 'phonics_tone',
    unitName: 'หน่วยที่ ๓: การผันวรรณยุกต์',
    gradeLevel: 'ป.1',
    parts: [
      { char: 'บ', type: 'initial', label: 'พยัญชนะต้น' },
      { char: 'า', type: 'vowel', label: 'สระอา' },
      { char: '้', type: 'tone', label: 'วรรณยุกต์โท' },
      { char: 'น', type: 'final', label: 'ตัวสะกด แม่กน' },
    ],
  },
  {
    id: 'cw-3',
    word: 'เรียน',
    reading: 'รอ - เอีย - นอ - เรียน',
    meaning: 'ศึกษาหาความรู้ ฝึกฝนทักษะ',
    unitId: 'phonics_direct_spelling',
    unitName: 'หน่วยที่ ๔: สะกดคำตรงมาตรา',
    gradeLevel: 'ป.1 - ป.2',
    parts: [
      { char: 'ร', type: 'initial', label: 'พยัญชนะต้น' },
      { char: 'เ-ีย', type: 'vowel', label: 'สระเอีย' },
      { char: 'น', type: 'final', label: 'ตัวสะกด แม่กน' },
    ],
  },
  {
    id: 'cw-4',
    word: 'กลม',
    reading: 'กอ - ลอ - โอะ - มอ - กลม',
    meaning: 'มีรูปทรงเป็นวงกลม ไม่มีเหลี่ยม',
    unitId: 'phonics_consonant_cluster',
    unitName: 'หน่วยที่ ๖: คำควบกล้ำ',
    gradeLevel: 'ป.2',
    parts: [
      { char: 'กล', type: 'initial', label: 'พยัญชนะควบแท้' },
      { char: 'โ-ะ', type: 'vowel', label: 'สระโอะ (ลดรูป)' },
      { char: 'ม', type: 'final', label: 'ตัวสะกด แม่กม' },
    ],
  },
  {
    id: 'cw-5',
    word: 'หมอ',
    reading: 'หอ - มอ - ออ - หมอ',
    meaning: 'แพทย์ผู้รักษาผู้ป่วย',
    unitId: 'phonics_leading_consonant',
    unitName: 'หน่วยที่ ๗: อักษรนำ',
    gradeLevel: 'ป.2',
    parts: [
      { char: 'หม', type: 'initial', label: 'อักษรนำ (ห นำ ม)' },
      { char: 'อ', type: 'vowel', label: 'สระออ' },
    ],
  },
  {
    id: 'cw-6',
    word: 'ศิษย์',
    reading: 'สอ - อิ - ดอ - สิด',
    meaning: 'ผู้รับการอบรมสั่งสอนจากครูอาจารย์',
    unitId: 'phonics_silent_mark',
    unitName: 'หน่วยที่ ๘: คำที่มีตัวการันต์',
    gradeLevel: 'ป.2 - ป.3',
    parts: [
      { char: 'ศ', type: 'initial', label: 'พยัญชนะต้น' },
      { char: 'ิ', type: 'vowel', label: 'สระอิ' },
      { char: 'ษ', type: 'final', label: 'ตัวสะกดไม่ตรงมาตรา (แม่กด)' },
      { char: 'ย์', type: 'silent', label: 'ทัณฑฆาต / การันต์' },
    ],
  },
  {
    id: 'cw-7',
    word: 'กล้วย',
    reading: 'กอ - ลอ - อัว - ยอ - กลัวย - ไม้โท - กล้วย',
    meaning: 'ผลไม้สีเหลืองรสหวาน มีประโยชน์สูง',
    unitId: 'phonics_direct_spelling',
    unitName: 'หน่วยที่ ๔: สะกดคำตรงมาตรา (แม่เกย)',
    gradeLevel: 'ป.1 - ป.2',
    parts: [
      { char: 'กล', type: 'initial', label: 'พยัญชนะควบแท้' },
      { char: 'ัว', type: 'vowel', label: 'สระอัว (ลดรูป)' },
      { char: '้', type: 'tone', label: 'ไม้โท' },
      { char: 'ย', type: 'final', label: 'ตัวสะกด แม่เกย' },
    ],
  },
  {
    id: 'cw-8',
    word: 'จันทร์',
    reading: 'จอ - อะ - นอ - จัน',
    meaning: 'ดวงจันทร์ หรือ วันจันทร์',
    unitId: 'phonics_silent_mark',
    unitName: 'หน่วยที่ ๘: คำที่มีตัวการันต์',
    gradeLevel: 'ป.2 - ป.3',
    parts: [
      { char: 'จ', type: 'initial', label: 'พยัญชนะต้น' },
      { char: 'ั', type: 'vowel', label: 'สระอะ (เปลี่ยนรูปเป็นไม้หันอากาศ)' },
      { char: 'น', type: 'final', label: 'ตัวสะกด แม่กน' },
      { char: 'ทร์', type: 'silent', label: 'ตัวการันต์ (ไม่ออกเสียง)' },
    ],
  },
];

export const PHONICS_COLOR_MAP = {
  initial: {
    bg: 'bg-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-700',
    badge: 'bg-blue-600 text-white',
    name: 'พยัญชนะต้น',
    description: 'เสียงนำคำ (ก-ฮ)',
  },
  vowel: {
    bg: 'bg-rose-100',
    border: 'border-rose-400',
    text: 'text-rose-700',
    badge: 'bg-rose-600 text-white',
    name: 'สระ',
    description: 'เสียงสระ (สระเดี่ยว/ประสม/ลดรูป)',
  },
  tone: {
    bg: 'bg-amber-100',
    border: 'border-amber-400',
    text: 'text-amber-800',
    badge: 'bg-amber-600 text-white',
    name: 'วรรณยุกต์',
    description: 'ระดับเสียง (เอก โท ตรี จัตวา)',
  },
  final: {
    bg: 'bg-emerald-100',
    border: 'border-emerald-400',
    text: 'text-emerald-700',
    badge: 'bg-emerald-600 text-white',
    name: 'ตัวสะกด',
    description: 'มาตราตัวสะกด (แม่กน กด กบ กก ฯลฯ)',
  },
  silent: {
    bg: 'bg-purple-100',
    border: 'border-purple-400',
    text: 'text-purple-700',
    badge: 'bg-purple-600 text-white',
    name: 'ตัวการันต์',
    description: 'ทัณฑฆาต (ตัวอักษรที่ไม่ออกเสียง)',
  },
};

interface ColorCodedPhonicsWordProps {
  wordDetail?: PhonicsWordDetail;
  enableColorCoding?: boolean;
  onToggleColorCoding?: () => void;
  showReadingRuler?: boolean;
  onToggleReadingRuler?: () => void;
  isDyslexiaMode?: boolean;
  onToggleDyslexiaMode?: () => void;
  soundVolume?: number;
}

export const ColorCodedPhonicsWord: React.FC<ColorCodedPhonicsWordProps> = ({
  wordDetail = SAMPLE_COLOR_CODED_WORDS[1],
  enableColorCoding = true,
  onToggleColorCoding,
  showReadingRuler = false,
  onToggleReadingRuler,
  isDyslexiaMode = false,
  onToggleDyslexiaMode,
  soundVolume = 1,
}) => {
  const [selectedPartIndex, setSelectedPartIndex] = useState<number | null>(null);

  const handleSpeak = (textToSay: string) => {
    soundEffects.play('pop');
    speakText(textToSay, 'th', 'adult_female', soundVolume);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-6 border-2 border-indigo-100 shadow-xl transition-all">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg">
            🎨
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-black text-gray-800">
              รหัสสีแยกโครงสร้างคำ (Multi-Color Phonics)
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              ช่วยให้จำรูปคำได้ไว แยกแยะพยัญชนะ สระ ตัวสะกด วรรณยุกต์ได้แม่นยำ
            </p>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="flex items-center flex-wrap gap-2">
          {onToggleColorCoding && (
            <button
              type="button"
              onClick={onToggleColorCoding}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                enableColorCoding
                  ? 'bg-indigo-600 text-white shadow-indigo-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{enableColorCoding ? 'เปิดรหัสสี' : 'ปิดรหัสสี (สีขาวดำ)'}</span>
            </button>
          )}

          {onToggleDyslexiaMode && (
            <button
              type="button"
              onClick={onToggleDyslexiaMode}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                isDyslexiaMode
                  ? 'bg-amber-500 text-white shadow-amber-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isDyslexiaMode ? 'โหมด UDL ฟอนต์ขยาย' : 'ฟอนต์ปกติ'}</span>
            </button>
          )}

          {onToggleReadingRuler && (
            <button
              type="button"
              onClick={onToggleReadingRuler}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                showReadingRuler
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showReadingRuler ? 'ซ่อนไม้บรรทัดช่วยอ่าน' : 'ไม้บรรทัดช่วยอ่าน'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Reading Ruler Visual Highlight Overlay if enabled */}
      <div
        className={`relative p-6 sm:p-8 rounded-2xl transition-all ${
          showReadingRuler
            ? 'bg-amber-50/70 border-y-4 border-amber-400 shadow-md ring-8 ring-amber-100/40'
            : 'bg-gradient-to-b from-gray-50/60 to-indigo-50/30 border border-gray-200'
        }`}
      >
        {/* Unit & Metadata Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-black text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-full border border-indigo-200">
            {wordDetail.unitName}
          </span>
          <span className="text-xs font-bold text-gray-500 bg-white px-2.5 py-0.5 rounded-lg border border-gray-200">
            ระดับ: {wordDetail.gradeLevel}
          </span>
        </div>

        {/* Word Display with Color Coding */}
        <div className="flex flex-col items-center justify-center py-4">
          <div
            className={`flex items-center justify-center gap-2 flex-wrap ${
              isDyslexiaMode ? 'tracking-widest' : 'tracking-normal'
            }`}
          >
            {wordDetail.parts.map((part, idx) => {
              const colorInfo = PHONICS_COLOR_MAP[part.type];
              const isSelected = selectedPartIndex === idx;

              return (
                <button
                  key={`${part.char}-${idx}`}
                  type="button"
                  onClick={() => {
                    setSelectedPartIndex(idx);
                    handleSpeak(`${part.label} คือ ${part.char}`);
                  }}
                  className={`group relative px-4 py-3 sm:px-6 sm:py-4 rounded-2xl border-2 sm:border-3 transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-md ${
                    enableColorCoding
                      ? `${colorInfo.bg} ${colorInfo.border} ${colorInfo.text}`
                      : 'bg-white border-gray-300 text-gray-800'
                  } ${isSelected ? 'ring-4 ring-offset-2 ring-indigo-400 scale-105' : ''}`}
                >
                  <span
                    className={`font-black leading-none block select-none ${
                      isDyslexiaMode ? 'text-5xl sm:text-6xl font-sans' : 'text-4xl sm:text-5xl'
                    }`}
                  >
                    {part.char}
                  </span>

                  {/* Micro label underneath */}
                  <span
                    className={`mt-1.5 text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded-full block text-center whitespace-nowrap shadow-xs ${
                      enableColorCoding ? colorInfo.badge : 'bg-gray-600 text-white'
                    }`}
                  >
                    {part.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Phonics Reading Formula */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-indigo-200 shadow-sm max-w-xl text-center">
            <button
              type="button"
              onClick={() => handleSpeak(`${wordDetail.reading} อ่านว่า ${wordDetail.word}`)}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 hover:opacity-90 active:scale-95 cursor-pointer shadow-md"
              title="ฟังเสียงแจกลูกสะกดคำ"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <div className="text-left flex-1">
              <div className="text-xs text-gray-500 font-bold">สูตรการแจกลูกสะกดคำ (สพฐ.):</div>
              <div className="text-base sm:text-lg font-black text-indigo-900 tracking-wide">
                {wordDetail.reading}
              </div>
            </div>
            <div className="text-right border-t sm:border-t-0 sm:border-l border-gray-200 pt-2 sm:pt-0 sm:pl-3">
              <span className="text-xs text-gray-500 font-bold block">ความหมาย:</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                {wordDetail.meaning}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Code Legend Bar */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
        {Object.entries(PHONICS_COLOR_MAP).map(([typeKey, cfg]) => (
          <div
            key={typeKey}
            className={`p-2.5 rounded-xl border flex items-center gap-2 ${cfg.bg} ${cfg.border}`}
          >
            <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${cfg.badge}`} />
            <div className="overflow-hidden">
              <div className={`text-xs font-black truncate ${cfg.text}`}>{cfg.name}</div>
              <div className="text-[10px] text-gray-500 truncate">{cfg.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
