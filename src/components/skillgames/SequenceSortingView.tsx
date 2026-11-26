import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grade } from '../../types';
import {
  SEQUENCE_LEVELS,
  SequenceLevel,
  SequenceItem,
  SORTING_LEVELS,
  SortingLevel,
  SortingItem,
  SortingBasket,
} from '../../data/skillGamesData';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  Volume2,
  RotateCcw,
  Sparkles,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Check,
  X,
  Clock,
} from 'lucide-react';
import { GameTimer, formatSecondsToMinutes } from './GameTimer';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';

interface SequenceSortingViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

// Helper to remove any numeric ordering prefix from choice labels
const cleanOptionLabel = (label: string): string => {
  return label.replace(/^(\d+[\.\:\)\-]\s*|ขั้น(?:ตอน)?ที่\s*\d+[:\s]*)/, '').trim();
};

export const SequenceSortingView: React.FC<SequenceSortingViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  // Sub-mode tabs: 'sequencing' (เรียงลำดับ) vs 'sorting' (จัดหมวดหมู่)
  const [activeTab, setActiveTab] = useState<'sequencing' | 'sorting'>('sequencing');

  // ----------------------------------------------------
  // SEQUENCING STATE
  // ----------------------------------------------------
  const availableSeqLevels = useMemo(() => {
    return SEQUENCE_LEVELS.filter((lvl) => lvl.grade === currentGrade);
  }, [currentGrade]);

  const [currentSeqIndex, setCurrentSeqIndex] = useState(0);
  const activeSeqLevel: SequenceLevel =
    availableSeqLevels[currentSeqIndex] || availableSeqLevels[0] || SEQUENCE_LEVELS[0];

  // Placed items in sequence slots (slot 0, slot 1, ...)
  const [slots, setSlots] = useState<(SequenceItem | null)[]>([]);
  // Tray pool of available scrambled items
  const [poolItems, setPoolItems] = useState<SequenceItem[]>([]);
  const [selectedPoolItem, setSelectedPoolItem] = useState<SequenceItem | null>(null);
  const [seqStatus, setSeqStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [seqSeconds, setSeqSeconds] = useState(0);
  const [seqTimerKey, setSeqTimerKey] = useState(0);

  const setupSeqLevel = useCallback((lvl: SequenceLevel) => {
    const scrambled = [...lvl.items].sort(() => Math.random() - 0.5);
    setPoolItems(scrambled);
    setSlots(new Array(lvl.items.length).fill(null));
    setSelectedPoolItem(null);
    setSeqStatus('idle');
    setSeqSeconds(0);
    setSeqTimerKey((k) => k + 1);

    if (soundVolume > 0) {
      speakText(lvl.instructionVoice);
    }
  }, [soundVolume]);

  useEffect(() => {
    if (activeTab === 'sequencing') {
      setupSeqLevel(activeSeqLevel);
    }
  }, [activeTab, activeSeqLevel.id, setupSeqLevel]);

  // Click pool item
  const handleSelectPoolItem = (item: SequenceItem) => {
    soundEffects.playTap(soundVolume);
    if (selectedPoolItem?.id === item.id) {
      setSelectedPoolItem(null);
    } else {
      setSelectedPoolItem(item);
    }
  };

  // Place item into target slot
  const handlePlaceInSlot = (slotIdx: number) => {
    soundEffects.playTap(soundVolume);
    const currentInSlot = slots[slotIdx];

    if (selectedPoolItem) {
      // Move selected item into slot
      const newSlots = [...slots];
      newSlots[slotIdx] = selectedPoolItem;

      // Remove from pool, and if slot already had item, put old one back in pool
      const newPool = poolItems.filter((it) => it.id !== selectedPoolItem.id);
      if (currentInSlot) {
        newPool.push(currentInSlot);
      }

      setSlots(newSlots);
      setPoolItems(newPool);
      setSelectedPoolItem(null);
      setSeqStatus('idle');

      // If all slots filled, auto-verify
      if (newSlots.every((s) => s !== null)) {
        verifySequence(newSlots as SequenceItem[]);
      }
    } else if (currentInSlot) {
      // Remove item from slot back to pool
      const newSlots = [...slots];
      newSlots[slotIdx] = null;
      setSlots(newSlots);
      setPoolItems([...poolItems, currentInSlot]);
      setSeqStatus('idle');
    }
  };

  // Verify sequence logic
  const verifySequence = (placed: SequenceItem[]) => {
    const isCorrect = placed.every((item, idx) => item.order === idx + 1);

    if (isCorrect) {
      setSeqStatus('correct');
      soundEffects.playVictory(soundVolume);
      if (onEarnStar) onEarnStar();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.55 },
      });
      speakText('ยอดเยี่ยมมากเลยค่ะ! หนูเรียงลำดับขั้นตอนได้ถูกต้องสมบูรณ์แบบ');
    } else {
      setSeqStatus('wrong');
      soundEffects.playIncorrect(soundVolume);
      speakText('ลองดูใหม่อีกครั้งนะจ๊ะ สังเกตขั้นตอนว่าอะไรเกิดขึ้นก่อน');
    }
  };

  // ----------------------------------------------------
  // SORTING (CATEGORIZATION) STATE
  // ----------------------------------------------------
  const availableSortLevels = useMemo(() => {
    return SORTING_LEVELS.filter((lvl) => lvl.grade === currentGrade);
  }, [currentGrade]);

  const [currentSortIndex, setCurrentSortIndex] = useState(0);
  const activeSortLevel: SortingLevel =
    availableSortLevels[currentSortIndex] || availableSortLevels[0] || SORTING_LEVELS[0];

  const [remainingItems, setRemainingItems] = useState<SortingItem[]>([]);
  const [currentItem, setCurrentItem] = useState<SortingItem | null>(null);
  const [basketContents, setBasketContents] = useState<Record<string, SortingItem[]>>({});
  const [sortStatus, setSortStatus] = useState<'playing' | 'completed'>('playing');
  const [sortMistakeFeedback, setSortMistakeFeedback] = useState<string | null>(null);
  const [sortSeconds, setSortSeconds] = useState(0);
  const [sortTimerKey, setSortTimerKey] = useState(0);

  const setupSortLevel = useCallback((lvl: SortingLevel) => {
    const shuffled = [...lvl.items].sort(() => Math.random() - 0.5);
    const initialContents: Record<string, SortingItem[]> = {};
    lvl.baskets.forEach((b) => {
      initialContents[b.id] = [];
    });

    setRemainingItems(shuffled.slice(1));
    setCurrentItem(shuffled[0] || null);
    setBasketContents(initialContents);
    setSortStatus('playing');
    setSortMistakeFeedback(null);
    setSortSeconds(0);
    setSortTimerKey((k) => k + 1);

    if (soundVolume > 0) {
      speakText(lvl.instructionVoice);
    }
  }, [soundVolume]);

  useEffect(() => {
    if (activeTab === 'sorting') {
      setupSortLevel(activeSortLevel);
    }
  }, [activeTab, activeSortLevel.id, setupSortLevel]);

  // Handle drop into basket
  const handleSelectBasket = (basket: SortingBasket) => {
    if (!currentItem || sortStatus === 'completed') return;

    if (currentItem.targetBasketId === basket.id) {
      // Correct drop!
      soundEffects.playSuccess(soundVolume);
      setSortMistakeFeedback(null);

      // Add to basket
      const updated = {
        ...basketContents,
        [basket.id]: [...(basketContents[basket.id] || []), currentItem],
      };
      setBasketContents(updated);

      if (remainingItems.length > 0) {
        setCurrentItem(remainingItems[0]);
        setRemainingItems(remainingItems.slice(1));
      } else {
        // Complete!
        setCurrentItem(null);
        setSortStatus('completed');
        soundEffects.playVictory(soundVolume);
        if (onEarnStar) onEarnStar();
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.5 },
        });
        speakText('เก่งมากเลยจ้า! หนูแยกหมวดหมู่สิ่งของลงตะกร้าได้ถูกต้องครบทุกชิ้นแล้ว');
      }
    } else {
      // Wrong basket
      soundEffects.playIncorrect(soundVolume);
      setSortMistakeFeedback(`ลองดูใหม่อีกนิดนะ "${currentItem.name}" ควรใส่ในหมวดไหนเอ่ย?`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center max-w-5xl mx-auto space-y-4">
      {/* Sub-mode switcher (เรียงลำดับ vs จัดหมวดหมู่) */}
      <div className="flex items-center justify-center gap-2 bg-white/90 p-1.5 rounded-2xl border-2 border-amber-200 shadow-xs">
        <button
          type="button"
          onClick={() => {
            soundEffects.playTap(soundVolume);
            setActiveTab('sequencing');
          }}
          className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'sequencing'
              ? 'bg-amber-500 text-white shadow-md scale-102'
              : 'text-slate-600 hover:bg-amber-50'
          }`}
        >
          <span>🔢 1. เกมเรียงลำดับ (Sequencing)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playTap(soundVolume);
            setActiveTab('sorting');
          }}
          className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'sorting'
              ? 'bg-rose-500 text-white shadow-md scale-102'
              : 'text-slate-600 hover:bg-rose-50'
          }`}
        >
          <span>🧺 2. เกมจัดหมวดหมู่ (Sorting)</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: SEQUENCING (เรียงลำดับ) */}
      {/* ========================================================= */}
      {activeTab === 'sequencing' && (
        <div className="w-full space-y-4">
          {/* Top Bar info */}
          <div className="w-full bg-white/95 rounded-2xl p-3 sm:p-4 border-2 border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {activeSeqLevel.theme}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  ด่าน {currentSeqIndex + 1} / {availableSeqLevels.length}
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-800">
                  {activeSeqLevel.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                เลือกรูปภาพด้านล่าง แล้วแตะใส่ลงในช่องหมายเลข 1, 2, 3 ให้ถูกต้องตามลำดับ
              </p>
            </div>

            <div className="flex items-center gap-2">
              <GameTimer
                key={`seq-timer-${seqTimerKey}`}
                isRunning={seqStatus !== 'correct'}
                onTick={(s) => setSeqSeconds(s)}
                onReset={() => setSeqSeconds(0)}
              />
              <button
                type="button"
                onClick={() => speakText(activeSeqLevel.instructionVoice)}
                className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl border border-amber-200 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden sm:inline">ฟังโจทย์</span>
              </button>
              <button
                type="button"
                onClick={() => setupSeqLevel(activeSeqLevel)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">จัดใหม่</span>
              </button>
            </div>
          </div>

          {/* Level Switcher Chips */}
          {availableSeqLevels.length > 1 && (
            <SkillGameLevelSelector
              totalLevels={availableSeqLevels.length}
              currentIndex={currentSeqIndex}
              onSelectLevel={(idx) => {
                soundEffects.playTap(soundVolume);
                setCurrentSeqIndex(idx);
              }}
              prefix="ด่าน"
              colorTheme="amber"
              customLabels={availableSeqLevels.map((lvl, idx) => `${idx + 1}. ${lvl.title.split(':')[0]}`)}
              badgeSubtitle={activeSeqLevel.title}
            />
          )}

          {/* Target Sequence Drop Slots */}
          <div className="bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-yellow-50/70 rounded-3xl p-4 sm:p-6 border-2 border-amber-200 shadow-xs">
            <h4 className="text-xs sm:text-sm font-black text-amber-950 mb-3 flex items-center gap-2">
              <span>🎯 เรียงลำดับจากซ้ายไปขวา (ก่อน ➡️ หลัง):</span>
              {selectedPoolItem && (
                <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-lg animate-pulse">
                  กำลังเลือก "{selectedPoolItem.label}" ➡️ แตะช่องที่ต้องการวาง
                </span>
              )}
            </h4>

            <div
              className={`grid gap-3 sm:gap-4 ${
                slots.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
              }`}
            >
              {slots.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handlePlaceInSlot(idx)}
                  className={`min-h-[140px] sm:min-h-[170px] rounded-2xl border-3 border-dashed p-3 flex flex-col items-center justify-between transition-all cursor-pointer select-none relative ${
                    item
                      ? 'bg-white border-amber-400 shadow-sm'
                      : selectedPoolItem
                      ? 'bg-amber-100/70 border-amber-500 ring-2 ring-amber-300 animate-pulse'
                      : 'bg-white/60 border-slate-300 hover:border-amber-300'
                  }`}
                >
                  {/* Step order badge */}
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-2xs">
                      ช่องที่ {idx + 1}
                    </span>
                    {item && (
                      <span className="text-[10px] text-slate-400 hover:text-rose-500 font-bold">
                        แตะเพื่อคืน
                      </span>
                    )}
                  </div>

                  {item ? (
                    <div className="flex flex-col items-center my-auto text-center animate-in zoom-in-75">
                      <span className="text-4xl sm:text-5xl">{item.icon}</span>
                      <p className="text-xs sm:text-sm font-black text-slate-800 mt-1.5">
                        {cleanOptionLabel(item.label)}
                      </p>
                      <span className="text-[10px] text-slate-500">{item.description}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(`${cleanOptionLabel(item.label)}. ${item.description || ''}`);
                        }}
                        className="mt-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-[10px] font-bold flex items-center gap-1 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-2xs"
                        title="กดฟังเสียงตัวเลือกนี้"
                      >
                        <Volume2 className="w-3 h-3 text-amber-700" />
                        <span>ฟังเสียง</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center my-auto text-slate-400">
                      <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-base font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-[11px] font-bold mt-1">แตะเพื่อวางที่นี่</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Status notification */}
            {seqStatus === 'correct' && (
              <div className="mt-4 p-3 bg-emerald-100 text-emerald-900 rounded-2xl border border-emerald-300 flex items-center justify-between flex-wrap gap-2 animate-in zoom-in-90">
                <div className="flex items-center gap-2 flex-wrap">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs sm:text-sm font-black">
                    ถูกต้องแล้วจ้า! เรียงลำดับขั้นตอนได้สมบูรณ์แบบ 🌟
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/80 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    ใช้เวลา: {formatSecondsToMinutes(seqSeconds)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (currentSeqIndex + 1 < availableSeqLevels.length) {
                      setCurrentSeqIndex((prev) => prev + 1);
                    } else {
                      setCurrentSeqIndex(0);
                    }
                  }}
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-xs hover:bg-emerald-700 cursor-pointer flex items-center gap-1"
                >
                  <span>ด่านถัดไป</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {seqStatus === 'wrong' && (
              <div className="mt-4 p-3 bg-rose-100 text-rose-900 rounded-2xl border border-rose-300 flex items-center gap-2 animate-in shake">
                <X className="w-5 h-5 text-rose-600" />
                <span className="text-xs sm:text-sm font-black">
                  ยังไม่ถูกต้องจ้า ลองแตะสลับเพื่อเรียงลำดับใหม่อีกครั้งนะ
                </span>
              </div>
            )}
          </div>

          {/* Tray Pool of Scrambled Items */}
          <div className="w-full bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-xs">
            <h4 className="text-xs sm:text-sm font-black text-slate-700 mb-2">
              📦 ชิ้นส่วนที่ต้องนำไปเรียง (แตะเลือก แล้วนำไปวางในช่องด้านบน):
            </h4>
            {poolItems.length === 0 ? (
              <div className="text-center py-4 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-xl border border-emerald-200">
                ✨ วางครบทุกช่องแล้ว! ตรวจสอบลำดับได้เลยจ้า
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {poolItems.map((item) => {
                  const isSelected = selectedPoolItem?.id === item.id;
                  const labelCleaned = cleanOptionLabel(item.label);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectPoolItem(item)}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 ring-3 ring-amber-300 scale-103 shadow-md'
                          : 'bg-slate-50 border-slate-200 hover:bg-amber-50/50 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center my-auto">
                        <span className="text-4xl">{item.icon}</span>
                        <p className="text-xs font-black text-slate-800 mt-1.5">{labelCleaned}</p>
                        <span className="text-[10px] text-slate-500">{item.description}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(`${labelCleaned}. ${item.description || ''}`);
                        }}
                        className="mt-2 w-full py-1 px-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-bold flex items-center justify-center gap-1 hover:scale-102 active:scale-95 transition-all cursor-pointer shadow-2xs"
                        title="กดฟังเสียงตัวเลือกนี้"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>ฟังเสียง</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: SORTING (จัดหมวดหมู่ใส่ตะกร้า) */}
      {/* ========================================================= */}
      {activeTab === 'sorting' && (
        <div className="w-full space-y-4">
          {/* Top Bar info */}
          <div className="w-full bg-white/95 rounded-2xl p-3 sm:p-4 border-2 border-rose-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  หมวดหมู่และการจำแนก
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  ด่าน {currentSortIndex + 1} / {availableSortLevels.length}
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-800">
                  {activeSortLevel.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{activeSortLevel.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <GameTimer
                key={`sort-timer-${sortTimerKey}`}
                isRunning={sortStatus !== 'completed'}
                onTick={(s) => setSortSeconds(s)}
                onReset={() => setSortSeconds(0)}
              />
              <button
                type="button"
                onClick={() => speakText(activeSortLevel.instructionVoice)}
                className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl border border-rose-200 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden sm:inline">ฟังโจทย์</span>
              </button>
              <button
                type="button"
                onClick={() => setupSortLevel(activeSortLevel)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">เริ่มใหม่</span>
              </button>
            </div>
          </div>

          {/* Level Switcher Chips */}
          {availableSortLevels.length > 1 && (
            <SkillGameLevelSelector
              totalLevels={availableSortLevels.length}
              currentIndex={currentSortIndex}
              onSelectLevel={(idx) => {
                soundEffects.playTap(soundVolume);
                setCurrentSortIndex(idx);
              }}
              prefix="ด่าน"
              colorTheme="rose"
              customLabels={availableSortLevels.map((lvl, idx) => `${idx + 1}. ${lvl.title.split(':')[0]}`)}
              badgeSubtitle={activeSortLevel.title}
            />
          )}

          {/* Active Item to Sort Card */}
          {currentItem && sortStatus === 'playing' ? (
            <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-5 border-3 border-rose-300 shadow-md flex flex-col items-center text-center animate-in zoom-in-90">
              <span className="text-xs font-black text-slate-400 mb-1 uppercase tracking-wider">
                ของชิ้นต่อไปที่จะแยกหมวดหมู่:
              </span>
              <span className="text-6xl my-2 drop-shadow-sm animate-bounce">{currentItem.icon}</span>
              <h3 className="text-lg font-black text-slate-800">{currentItem.name}</h3>
              
              {/* Button to listen to current item */}
              <button
                type="button"
                onClick={() => speakText(currentItem.name)}
                className="mt-2 px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-full font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                title="กดฟังเสียงของชิ้นนี้"
              >
                <Volume2 className="w-3.5 h-3.5 text-rose-700" />
                <span>ฟังเสียงชื่อสิ่งนี้</span>
              </button>

              <p className="text-xs text-rose-600 font-bold mt-2">
                👇 ควรใส่ลงในตะกร้าไหนดีเอ่ย? แตะตะกร้าตัวเลือกด้านล่างได้เลย!
              </p>

              {sortMistakeFeedback && (
                <div className="mt-3 p-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold">
                  {sortMistakeFeedback}
                </div>
              )}
            </div>
          ) : null}

          {/* Baskets Grid */}
          <div
            className={`grid gap-3 sm:gap-4 ${
              activeSortLevel.baskets.length === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-3'
            }`}
          >
            {activeSortLevel.baskets.map((basket) => {
              const contents = basketContents[basket.id] || [];

              return (
                <button
                  key={basket.id}
                  type="button"
                  onClick={() => handleSelectBasket(basket)}
                  disabled={sortStatus === 'completed'}
                  className={`${basket.bgColor} ${basket.borderColor} border-3 rounded-3xl p-4 sm:p-5 flex flex-col justify-between min-h-[220px] transition-all cursor-pointer shadow-sm hover:scale-102 hover:shadow-md active:scale-98 text-left select-none relative group`}
                >
                  {/* Basket Header */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl sm:text-4xl">{basket.icon}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(basket.name);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.stopPropagation();
                              speakText(basket.name);
                            }
                          }}
                          className="p-1 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:scale-110 active:scale-95 transition-all shadow-2xs cursor-pointer flex items-center gap-1 z-10"
                          title="กดฟังเสียงชื่อตะกร้านี้"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold">ฟังเสียง</span>
                        </span>
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full ${basket.badgeColor}`}>
                          {contents.length} ชิ้น
                        </span>
                      </div>
                    </div>
                    <h4 className="text-sm sm:text-base font-black text-slate-900">
                      {basket.name}
                    </h4>
                  </div>

                  {/* Basket Contents Icons */}
                  <div className="mt-3 pt-3 border-t border-slate-200/80 bg-white/70 rounded-2xl p-2.5 min-h-[70px]">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">
                      สิ่งของในตะกร้านี้:
                    </span>
                    {contents.length === 0 ? (
                      <span className="text-[11px] text-slate-400 italic">ยังไม่มีสิ่งของ</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {contents.map((it, i) => (
                          <span
                            key={i}
                            className="text-xl bg-white p-1 rounded-lg border border-slate-200 shadow-2xs"
                            title={it.name}
                          >
                            {it.icon}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Victory Banner for Sorting */}
          {sortStatus === 'completed' && (
            <div className="w-full max-w-xl mx-auto bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border-3 border-emerald-300 rounded-3xl p-5 sm:p-6 text-center shadow-lg animate-in zoom-in-90 space-y-3">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-3xl flex items-center justify-center text-3xl mx-auto shadow-md">
                🎉
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-800">
                แยกหมวดหมู่สำเร็จครบทุกชิ้นแล้ว!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                คนเก่งแยกแยะสิ่งของได้อย่างถูกต้องครบถ้วน เสริมสร้างทักษะการจำแนกยอดเยี่ยมเลย
              </p>

              <div className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-900 px-3 py-1 rounded-full text-xs font-black mx-auto">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>ใช้เวลาไป: {formatSecondsToMinutes(sortSeconds)}</span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setupSortLevel(activeSortLevel)}
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-black text-xs sm:text-sm rounded-xl border-2 border-slate-200 transition-all cursor-pointer"
                >
                  🔄 เล่นซ้ำอีกครั้ง
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (currentSortIndex + 1 < availableSortLevels.length) {
                      setCurrentSortIndex((prev) => prev + 1);
                    } else {
                      setCurrentSortIndex(0);
                    }
                  }}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm rounded-xl border-b-3 border-emerald-700 transition-all shadow-md active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                >
                  <span>ด่านต่อไป</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
