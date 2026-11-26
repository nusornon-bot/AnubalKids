import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Sparkles,
  Volume2,
  RotateCcw,
  Star,
  Award,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Puzzle,
  Layers,
  Flame,
} from 'lucide-react';
import { soundEffects, speakText, isAudioMuted } from '../../services/audioService';
import confetti from 'canvas-confetti';

interface ThaiPhonicsWordBuilderViewProps {
  onClose?: () => void;
  onEarnStar?: () => void;
  soundVolume?: number;
}

type BuilderMode = 'sequence' | 'missing' | 'matching';

interface SequencePuzzle {
  word: string;
  emoji: string;
  meaning: string;
  blocks: Array<{ id: string; text: string; role: 'consonant' | 'vowel' | 'tone' | 'final' }>;
  targetOrder: string[]; // sequence of IDs
}

const SEQUENCE_PUZZLES: SequencePuzzle[] = [
  {
    word: 'กา',
    emoji: '🦅',
    meaning: 'นกตัวสีดำ ร้องกา กา',
    blocks: [
      { id: 'k', text: 'ก', role: 'consonant' },
      { id: 'aa', text: '—า', role: 'vowel' },
    ],
    targetOrder: ['k', 'aa'],
  },
  {
    word: 'ตา',
    emoji: '👁️',
    meaning: 'อวัยวะใช้มองเห็น หรือคุณพ่อของแม่',
    blocks: [
      { id: 't', text: 'ต', role: 'consonant' },
      { id: 'aa', text: '—า', role: 'vowel' },
    ],
    targetOrder: ['t', 'aa'],
  },
  {
    word: 'บ้าน',
    emoji: '🏠',
    meaning: 'ที่อยู่อาศัยที่อบอุ่นของครอบครัว',
    blocks: [
      { id: 'b', text: 'บ', role: 'consonant' },
      { id: 'aa', text: '—า', role: 'vowel' },
      { id: 'n', text: 'น', role: 'final' },
      { id: 'mai_tho', text: '—้', role: 'tone' },
    ],
    targetOrder: ['b', 'aa', 'mai_tho', 'n'],
  },
  {
    word: 'ช้าง',
    emoji: '🐘',
    meaning: 'สัตว์บกขนาดใหญ่ มีงวงและงา',
    blocks: [
      { id: 'ch', text: 'ช', role: 'consonant' },
      { id: 'aa', text: '—า', role: 'vowel' },
      { id: 'ng', text: 'ง', role: 'final' },
      { id: 'mai_tho', text: '—้', role: 'tone' },
    ],
    targetOrder: ['ch', 'aa', 'mai_tho', 'ng'],
  },
  {
    word: 'ปลา',
    emoji: '🐟',
    meaning: 'สัตว์น้ำมีเกล็ด หายใจด้วยเหงือก (คำควบกล้ำ ปล)',
    blocks: [
      { id: 'p', text: 'ป', role: 'consonant' },
      { id: 'l', text: 'ล', role: 'consonant' },
      { id: 'aa', text: '—า', role: 'vowel' },
    ],
    targetOrder: ['p', 'l', 'aa'],
  },
  {
    word: 'โต๊ะ',
    emoji: '🪵',
    meaning: 'เครื่องเรือนสำหรับวางสิ่งของ (สระโอ๊ะ ตรี)',
    blocks: [
      { id: 'sara_o', text: 'โ—', role: 'vowel' },
      { id: 't', text: 'ต', role: 'consonant' },
      { id: 'sara_a', text: '—ะ', role: 'vowel' },
      { id: 'mai_tree', text: '—๊', role: 'tone' },
    ],
    targetOrder: ['sara_o', 't', 'mai_tree', 'sara_a'],
  },
];

interface MissingPuzzle {
  wordWithBlank: string;
  fullWord: string;
  emoji: string;
  clue: string;
  options: string[];
  answer: string;
}

const MISSING_PUZZLES: MissingPuzzle[] = [
  {
    wordWithBlank: 'ก _ ง',
    fullWord: 'กาง',
    emoji: '👖',
    clue: 'เติมสระอะไรให้เป็นคำว่า "กาง" (เช่น กางเกง)',
    options: ['—า', '—ิ', '—ุ', 'โ—'],
    answer: '—า',
  },
  {
    wordWithBlank: 'บ _ น',
    fullWord: 'บิน',
    emoji: '✈️',
    clue: 'นกหรือเครื่องบินใช้ปีกเหินฟ้า (สระอิ)',
    options: ['—ิ', '—ี', '—ุ', '—ะ'],
    answer: '—ิ',
  },
  {
    wordWithBlank: 'ช้ _ ง',
    fullWord: 'ช้าง',
    emoji: '🐘',
    clue: 'ตัวสะกดแม่กงของคำว่า ช้าง คือตัวใด',
    options: ['ง', 'น', 'ม', 'ก'],
    answer: 'ง',
  },
  {
    wordWithBlank: 'ห _ ว',
    fullWord: 'หิว',
    emoji: '🍔',
    clue: 'เมื่อท้องว่างอยากกินข้าว เติมสระใด',
    options: ['—ิ', '—ะ', '—ู', 'แ—'],
    answer: '—ิ',
  },
  {
    wordWithBlank: 'ป _ า',
    fullWord: 'ปลา',
    emoji: '🐠',
    clue: 'พยัญชนะควบกล้ำคู่กับ ป ให้เป็น ป-ล-า',
    options: ['ล', 'ร', 'ว', 'ย'],
    answer: 'ล',
  },
];

interface MatchingItem {
  id: string;
  word: string;
  emoji: string;
  phonics: string;
}

const MATCHING_CARDS: MatchingItem[] = [
  { id: '1', word: 'แม่เกย (เนย)', emoji: '🧈', phonics: 'น-เอ-ย = เนย (ตัวสะกด ย)' },
  { id: '2', word: 'แม่กม (ร่ม)', emoji: '☂️', phonics: 'ร-โอะ-ม-ไม้เอก = ร่ม (ตัวสะกด ม)' },
  { id: '3', word: 'แม่กบ (ดาบ)', emoji: '🗡️', phonics: 'ด-อา-บ = ดาบ (ตัวสะกด บ)' },
  { id: '4', word: 'แม่กง (กวาง)', emoji: '🦌', phonics: 'กว-อา-ง = กวาง (ตัวสะกด ง)' },
];

export const ThaiPhonicsWordBuilderView: React.FC<ThaiPhonicsWordBuilderViewProps> = ({
  onClose,
  onEarnStar,
  soundVolume = 0.8,
}) => {
  const [activeMode, setActiveMode] = useState<BuilderMode>('sequence');

  // Sequence mode state
  const [seqIndex, setSeqIndex] = useState(0);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [seqCompleted, setSeqCompleted] = useState(false);

  // Missing mode state
  const [missingIndex, setMissingIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [missingFeedback, setMissingFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Matching mode state
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Stats
  const [totalStars, setTotalStars] = useState(0);

  const currentSeq = SEQUENCE_PUZZLES[seqIndex];
  const currentMissing = MISSING_PUZZLES[missingIndex];

  // Voice narration
  const speak = useCallback(
    (text: string) => {
      if (soundVolume <= 0.01 || isAudioMuted()) return;
      try {
        speakText(text, 'th', 'adult_female');
      } catch {
        // fallback
      }
    },
    [soundVolume]
  );

  // Read instructions on mode or question change
  useEffect(() => {
    if (activeMode === 'sequence') {
      setSelectedBlocks([]);
      setSeqCompleted(false);
      speak(`ประกอบคำว่า ${currentSeq.word} ${currentSeq.meaning}`);
    } else if (activeMode === 'missing') {
      setSelectedOption(null);
      setMissingFeedback(null);
      speak(currentMissing.clue);
    } else {
      setSelectedWord(null);
      speak('จับคู่คำศัพท์และมาตราตัวสะกดกับภาพที่ถูกต้อง');
    }
  }, [activeMode, seqIndex, missingIndex, speak, currentSeq, currentMissing]);

  // Sequence handler: Click block
  const handleToggleBlock = (blockId: string) => {
    if (seqCompleted) return;
    soundEffects.playTap(soundVolume);

    if (selectedBlocks.includes(blockId)) {
      setSelectedBlocks(selectedBlocks.filter((id) => id !== blockId));
    } else {
      const nextList = [...selectedBlocks, blockId];
      setSelectedBlocks(nextList);

      // Check if all blocks picked
      if (nextList.length === currentSeq.blocks.length) {
        // Check order
        const isRight = nextList.every((id, idx) => id === currentSeq.targetOrder[idx]);
        if (isRight) {
          setSeqCompleted(true);
          soundEffects.playVictory(soundVolume);
          setTotalStars((s) => s + 1);
          onEarnStar?.();
          confetti({ particleCount: 50, spread: 60 });
          speak(`ถูกต้องแล้ว! รวมเป็นคำว่า ${currentSeq.word}`);
        } else {
          soundEffects.playIncorrect(soundVolume);
          speak('ยังไม่ถูกต้อง ลองเรียงใหม่อีกครั้งนะจ๊ะ');
          setTimeout(() => setSelectedBlocks([]), 800);
        }
      }
    }
  };

  // Missing handler: Pick option
  const handlePickMissing = (opt: string) => {
    if (missingFeedback === 'correct') return;
    setSelectedOption(opt);

    if (opt === currentMissing.answer) {
      setMissingFeedback('correct');
      soundEffects.playVictory(soundVolume);
      setTotalStars((s) => s + 1);
      onEarnStar?.();
      confetti({ particleCount: 40, spread: 50 });
      speak(`เก่งมาก! รวมเป็นคำว่า ${currentMissing.fullWord}`);
    } else {
      setMissingFeedback('wrong');
      soundEffects.playIncorrect(soundVolume);
      speak('ยังไม่ถูก ลองเลือกตัวอื่นดูนะจ๊ะ');
      setTimeout(() => {
        setSelectedOption(null);
        setMissingFeedback(null);
      }, 1000);
    }
  };

  // Matching handler
  const handleMatchCard = (type: 'word' | 'emoji', id: string) => {
    if (matchedPairs.includes(id)) return;
    soundEffects.playTap(soundVolume);

    if (type === 'word') {
      setSelectedWord(id);
    } else {
      if (selectedWord === id) {
        // Correct pair!
        setMatchedPairs([...matchedPairs, id]);
        setSelectedWord(null);
        soundEffects.playVictory(soundVolume);
        setTotalStars((s) => s + 1);
        onEarnStar?.();
        const card = MATCHING_CARDS.find((c) => c.id === id);
        if (card) speak(`ถูกต้อง! ${card.word} ${card.phonics}`);
      } else {
        soundEffects.playIncorrect(soundVolume);
        setSelectedWord(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-200 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
              🧩
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-900 shadow-sm">
                  มินิเกมฝึกสมอง EF x แจกลูกสะกดคำ
                </span>
                <span className="text-xs text-white/80">Cross-Curriculum Mini-Games</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                ศูนย์เกมสร้างคำและแก้ปัญหาแจกลูกสะกดคำ
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full font-black text-amber-300 text-sm">
              <Star className="w-4 h-4 fill-amber-300" />
              <span>{totalStars}</span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/20 transition-colors text-white/90 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="bg-slate-100 p-2 sm:px-6 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => setActiveMode('sequence')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                activeMode === 'sequence'
                  ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                  : 'bg-white text-slate-700 hover:bg-purple-50'
              }`}
            >
              <span>🧱</span>
              <span>๑. จัดเรียงโครงสร้างคำ (Sequence)</span>
            </button>

            <button
              onClick={() => setActiveMode('missing')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                activeMode === 'missing'
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                  : 'bg-white text-slate-700 hover:bg-indigo-50'
              }`}
            >
              <span>🔍</span>
              <span>๒. สระและตัวสะกดที่หายไป (What's Missing)</span>
            </button>

            <button
              onClick={() => setActiveMode('matching')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                activeMode === 'matching'
                  ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                  : 'bg-white text-slate-700 hover:bg-blue-50'
              }`}
            >
              <span>🎴</span>
              <span>๓. จับคู่คำกับภาพ & ความหมาย (Matching)</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          {/* MODE 1: SEQUENCE WORD BUILDER */}
          {activeMode === 'sequence' && (
            <div className="w-full max-w-xl flex flex-col items-center">
              <div className="text-center mb-6">
                <span className="text-5xl mb-2 inline-block animate-bounce">{currentSeq.emoji}</span>
                <h3 className="text-2xl font-black text-slate-800">
                  จงเรียงบล็อกให้เป็นคำว่า "{currentSeq.word}"
                </h3>
                <p className="text-sm text-slate-500 mt-1">{currentSeq.meaning}</p>
              </div>

              {/* Target Slot Drop Area */}
              <div className="w-full p-4 min-h-[90px] rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-dashed border-purple-300 flex items-center justify-center gap-3 mb-6">
                {selectedBlocks.length === 0 ? (
                  <span className="text-sm font-semibold text-purple-400">
                    คลิกเลือกบล็อกด้านล่างเพื่อนำมาต่อเรียงกัน...
                  </span>
                ) : (
                  selectedBlocks.map((id) => {
                    const blk = currentSeq.blocks.find((b) => b.id === id);
                    if (!blk) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => handleToggleBlock(id)}
                        className="px-5 py-3 rounded-2xl bg-white border-2 border-purple-400 text-purple-900 text-2xl font-black shadow-md hover:scale-105 transition-transform"
                      >
                        {blk.text}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Available Blocks Palette */}
              <div className="w-full flex flex-col items-center gap-3">
                <span className="text-xs font-bold text-slate-400">
                  บล็อกชิ้นส่วน (พยัญชนะต้น สระ ตัวสะกด วรรณยุกต์)
                </span>
                <div className="flex items-center justify-center flex-wrap gap-3">
                  {currentSeq.blocks.map((blk) => {
                    const isPicked = selectedBlocks.includes(blk.id);
                    return (
                      <button
                        key={blk.id}
                        onClick={() => handleToggleBlock(blk.id)}
                        disabled={isPicked}
                        className={`px-6 py-4 rounded-2xl text-2xl font-black transition-all shadow-md ${
                          isPicked
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed scale-95 opacity-50'
                            : 'bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 active:scale-95 shadow-purple-200'
                        }`}
                      >
                        {blk.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Completion Banner */}
              {seqCompleted && (
                <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between w-full animate-fade-in">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <div>
                      <h4 className="font-black text-emerald-900">เก่งมาก! ถูกต้องสมบูรณ์</h4>
                      <p className="text-xs text-emerald-700">ได้รับ 1 ดาว ⭐️</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSeqIndex((i) => (i + 1) % SEQUENCE_PUZZLES.length)}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>ข้อถัดไป</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MODE 2: WHAT'S MISSING */}
          {activeMode === 'missing' && (
            <div className="w-full max-w-xl flex flex-col items-center">
              <div className="text-center mb-6">
                <span className="text-5xl mb-2 inline-block animate-pulse">{currentMissing.emoji}</span>
                <div className="text-4xl sm:text-5xl font-black text-indigo-900 tracking-widest my-2 px-6 py-3 bg-indigo-50 rounded-2xl border border-indigo-200 inline-block shadow-inner">
                  {currentMissing.wordWithBlank}
                </div>
                <p className="text-sm font-semibold text-slate-600 mt-2">{currentMissing.clue}</p>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                {currentMissing.options.map((opt) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = isSelected && missingFeedback === 'correct';
                  const isWrong = isSelected && missingFeedback === 'wrong';

                  return (
                    <button
                      key={opt}
                      onClick={() => handlePickMissing(opt)}
                      className={`p-5 rounded-2xl text-2xl font-black border-2 transition-all shadow-md flex items-center justify-center ${
                        isCorrect
                          ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                          : isWrong
                          ? 'bg-rose-500 text-white border-rose-600 animate-shake'
                          : 'bg-white hover:bg-indigo-50 text-indigo-900 border-indigo-200 hover:scale-105'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Next button */}
              {missingFeedback === 'correct' && (
                <button
                  onClick={() => setMissingIndex((i) => (i + 1) % MISSING_PUZZLES.length)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md animate-fade-in"
                >
                  <span>คำถัดไป ➔</span>
                </button>
              )}
            </div>
          )}

          {/* MODE 3: MATCHING */}
          {activeMode === 'matching' && (
            <div className="w-full max-w-2xl flex flex-col items-center">
              <p className="text-sm font-semibold text-slate-600 mb-4 text-center">
                คลิกเลือกคำศัพท์ด้านซ้าย แล้วคลิกเลือกภาพมาตราตัวสะกดที่คู่กันด้านขวา
              </p>

              <div className="grid grid-cols-2 gap-4 w-full">
                {/* Left: Words */}
                <div className="flex flex-col gap-3">
                  {MATCHING_CARDS.map((card) => {
                    const isMatched = matchedPairs.includes(card.id);
                    const isSelected = selectedWord === card.id;

                    return (
                      <button
                        key={`word-${card.id}`}
                        onClick={() => handleMatchCard('word', card.id)}
                        disabled={isMatched}
                        className={`p-4 rounded-2xl text-left border-2 font-bold transition-all shadow-sm ${
                          isMatched
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 opacity-60'
                            : isSelected
                            ? 'bg-blue-600 text-white border-blue-700 ring-4 ring-blue-200 scale-102'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-base font-black">{card.word}</div>
                        <div className="text-xs text-slate-400">{isMatched ? '✓ จับคู่แล้ว' : card.phonics}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Right: Emojis */}
                <div className="flex flex-col gap-3">
                  {MATCHING_CARDS.map((card) => {
                    const isMatched = matchedPairs.includes(card.id);

                    return (
                      <button
                        key={`emoji-${card.id}`}
                        onClick={() => handleMatchCard('emoji', card.id)}
                        disabled={isMatched}
                        className={`p-4 rounded-2xl text-center border-2 transition-all shadow-sm flex items-center justify-center gap-3 ${
                          isMatched
                            ? 'bg-emerald-50 border-emerald-300 opacity-60'
                            : 'bg-white hover:bg-amber-50 border-slate-200 hover:border-amber-300'
                        }`}
                      >
                        <span className="text-3xl">{card.emoji}</span>
                        <span className="text-xs font-semibold text-slate-500">
                          {isMatched ? 'จับคู่สำเร็จ' : 'คลิกเพื่อจับคู่'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {matchedPairs.length === MATCHING_CARDS.length && (
                <div className="mt-6 p-4 rounded-2xl bg-emerald-500 text-white font-black text-center w-full shadow-lg animate-fade-in">
                  🎉 ยอดเยี่ยมมาก! คุณจับคู่มาตราตัวสะกดครบทุกคู่แล้ว
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>บูรณาการสมอง EF (ความจำขณะทำงาน, การยืดหยุ่นทางความคิด) สพฐ.</span>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors"
            >
              เสร็จสิ้น
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
