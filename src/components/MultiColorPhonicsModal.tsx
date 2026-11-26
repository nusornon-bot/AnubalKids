import React, { useState } from 'react';
import { X, Sparkles, BookOpen, Volume2, Search, ArrowRight, Layers, Eye } from 'lucide-react';
import { ColorCodedPhonicsWord, SAMPLE_COLOR_CODED_WORDS, PhonicsWordDetail } from './ColorCodedPhonicsWord';
import { soundEffects, speakText } from '../services/audioService';

interface MultiColorPhonicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundVolume?: number;
}

export const MultiColorPhonicsModal: React.FC<MultiColorPhonicsModalProps> = ({
  isOpen,
  onClose,
  soundVolume = 1,
}) => {
  const [selectedWordId, setSelectedWordId] = useState<string>(SAMPLE_COLOR_CODED_WORDS[0].id);
  const [selectedFilterUnit, setSelectedFilterUnit] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [enableColorCoding, setEnableColorCoding] = useState<boolean>(true);
  const [isDyslexiaMode, setIsDyslexiaMode] = useState<boolean>(false);
  const [showReadingRuler, setShowReadingRuler] = useState<boolean>(false);

  if (!isOpen) return null;

  const filteredWords = SAMPLE_COLOR_CODED_WORDS.filter((w) => {
    const matchesUnit = selectedFilterUnit === 'all' || w.unitId === selectedFilterUnit;
    const matchesSearch =
      searchQuery.trim() === '' ||
      w.word.includes(searchQuery.trim()) ||
      w.reading.includes(searchQuery.trim()) ||
      w.meaning.includes(searchQuery.trim());
    return matchesUnit && matchesSearch;
  });

  const activeWord: PhonicsWordDetail =
    SAMPLE_COLOR_CODED_WORDS.find((w) => w.id === selectedWordId) ||
    filteredWords[0] ||
    SAMPLE_COLOR_CODED_WORDS[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl bg-gradient-to-b from-white to-indigo-50/40 rounded-3xl border-3 border-indigo-300 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 sm:p-5 text-white flex items-center justify-between gap-3 shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
              🎨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black">
                  ห้องเรียนรหัสสีแยกโครงสร้างคำ (Multi-Color Phonics)
                </h2>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>UDL / LD Support</span>
                </span>
              </div>
              <p className="text-xs text-indigo-100 font-medium">
                แยกสีพยัญชนะต้น สระ ตัวสะกด และวรรณยุกต์ ช่วยให้เด็กจำโครงสร้างคำเร็วขึ้น 2 เท่า
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Display Component */}
          <ColorCodedPhonicsWord
            wordDetail={activeWord}
            enableColorCoding={enableColorCoding}
            onToggleColorCoding={() => setEnableColorCoding(!enableColorCoding)}
            showReadingRuler={showReadingRuler}
            onToggleReadingRuler={() => setShowReadingRuler(!showReadingRuler)}
            isDyslexiaMode={isDyslexiaMode}
            onToggleDyslexiaMode={() => setIsDyslexiaMode(!isDyslexiaMode)}
            soundVolume={soundVolume}
          />

          {/* Word Selector & Filters */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-indigo-100 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <h4 className="text-sm font-black text-gray-800">
                  เลือกคำศัพท์เพื่อฝึกสังเกตโครงสร้าง ({filteredWords.length} คำ)
                </h4>
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาคำศัพท์ / มาตรา..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-400 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Word Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2.5">
              {filteredWords.map((item) => {
                const isSelected = item.id === activeWord.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedWordId(item.id);
                      soundEffects.play('pop');
                      speakText(`${item.reading} อ่านว่า ${item.word}`, 'th', 'adult_female', soundVolume);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-500 shadow-md ring-2 ring-indigo-300'
                        : 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-gray-900">{item.word}</span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100/70 px-1.5 py-0.5 rounded-md">
                        {item.gradeLevel}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] text-gray-500 truncate font-medium">
                      {item.reading}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>มาตรฐานการแจกลูกสะกดคำ สพฐ. พ.ศ. ๒๕๖๐</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl transition-all shadow-sm cursor-pointer ml-auto"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
};
