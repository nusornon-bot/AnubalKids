import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grade } from '../../types';
import {
  WHATS_MISSING_ROUNDS,
  MissingItemGameRound,
} from '../../data/skillGamesDataNew';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import {
  RotateCcw,
  Sparkles,
  Eye,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Volume2,
  Clock,
  Wand2,
} from 'lucide-react';

interface WhatsMissingViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

type GamePhase = 'memorize' | 'shroud' | 'guess' | 'complete';

export const WhatsMissingView: React.FC<WhatsMissingViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const availableRounds = useMemo(() => {
    return WHATS_MISSING_ROUNDS;
  }, []);

  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const activeRound: MissingItemGameRound =
    availableRounds[currentRoundIndex] || availableRounds[0] || WHATS_MISSING_ROUNDS[0];

  const [phase, setPhase] = useState<GamePhase>('memorize');
  const [countdown, setCountdown] = useState(5);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Setup round
  const setupRound = useCallback((round: MissingItemGameRound) => {
    setPhase('memorize');
    setCountdown(5);
    setSelectedOptionId(null);
    setShowHint(false);

    speakText('จำสิ่งของบนโต๊ะให้ดีนะจ๊ะ มีเวลา 5 วินาที!', 'th', soundVolume);
  }, [soundVolume]);

  useEffect(() => {
    setCurrentRoundIndex(0);
  }, [currentGrade]);

  useEffect(() => {
    setupRound(activeRound);
  }, [activeRound, setupRound]);

  // Memorize countdown timer
  useEffect(() => {
    if (phase !== 'memorize') return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        soundEffects.playTick((5 - countdown) / 5, soundVolume);
        setCountdown((c) => c - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Transition to shroud
      setPhase('shroud');
      soundEffects.playTap(soundVolume);
      speakText('ผ้าคลุมเวทมนตร์ปิดแล้ว! สิ่งของชิ้นไหนหายไปเอ่ย?', 'th', soundVolume);

      setTimeout(() => {
        setPhase('guess');
      }, 1500);
    }
  }, [phase, countdown, soundVolume]);

  const handleSkipToGuess = () => {
    if (phase !== 'memorize') return;
    soundEffects.playTap(soundVolume);
    setPhase('shroud');
    setTimeout(() => {
      setPhase('guess');
      speakText('สิ่งของชิ้นไหนหายไปเอ่ย?', 'th', soundVolume);
    }, 1000);
  };

  const handleSelectOption = (optId: string) => {
    if (phase !== 'guess') return;
    soundEffects.playTap(soundVolume);
    setSelectedOptionId(optId);

    if (optId === activeRound.missingItemId) {
      setPhase('complete');
      soundEffects.playVictory(soundVolume);
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      const missingItem = activeRound.allItemIcons.find((i) => i.id === activeRound.missingItemId);
      speakText(`ถูกต้องแล้วจ้ะ! ${missingItem?.name || ''} หายไปจริงๆ ด้วย`, 'th', soundVolume);
      if (onEarnStar) onEarnStar();
    } else {
      soundEffects.playIncorrect(soundVolume);
      speakText('ยังไม่ใช่จ้ะ ลองนึกดูดีๆ อีกทีนะ', 'th', soundVolume);
    }
  };

  const handleNextRound = () => {
    soundEffects.playTap(soundVolume);
    if (currentRoundIndex < availableRounds.length - 1) {
      setCurrentRoundIndex((prev) => prev + 1);
    } else {
      setCurrentRoundIndex(0);
    }
  };

  // Remaining items during guess phase (exclude missing)
  const displayedItems = useMemo(() => {
    if (phase === 'memorize') {
      return activeRound.allItemIcons;
    }
    // In guess or complete phase, remove the missing one (unless completed and revealed)
    return activeRound.allItemIcons.filter((i) => i.id !== activeRound.missingItemId);
  }, [phase, activeRound]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-3">
      {/* Responsive Round Selector */}
      <SkillGameLevelSelector
        totalLevels={availableRounds.length}
        currentIndex={currentRoundIndex}
        onSelectLevel={(idx) => {
          soundEffects.playTap(soundVolume);
          setCurrentRoundIndex(idx);
        }}
        prefix="ข้อ"
        colorTheme="teal"
        badgeSubtitle="Working Memory"
      />

      {/* Header Bar */}
      <div className="w-full bg-white rounded-3xl p-3 sm:p-5 border-3 border-teal-200 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl sm:text-3xl">🪄</span>
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-800">
              {activeRound.title}
            </h2>
            <p className="text-xs font-bold text-slate-500">
              ฝึกความจำขณะทำงานและการสังเกตภาพ (Working Memory)
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setupRound(activeRound);
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-all cursor-pointer"
            title="เริ่มใหม่"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tray Card */}
      <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border-3 border-teal-200 shadow-md flex flex-col items-center gap-5">
        {/* Phase Notification Banner */}
        {phase === 'memorize' && (
          <div className="w-full max-w-md bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 flex items-center justify-between gap-2 animate-pulse">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-amber-900">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>กำลังจำสิ่งของ... เหลือเวลา {countdown} วินาที!</span>
            </div>
            <button
              type="button"
              onClick={handleSkipToGuess}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl shadow-xs active:scale-95 cursor-pointer"
            >
              จำได้แล้ว!
            </button>
          </div>
        )}

        {phase === 'shroud' && (
          <div className="w-full max-w-md bg-purple-500 text-white rounded-2xl p-4 flex items-center justify-center gap-2 text-sm font-black shadow-md animate-bounce">
            <Wand2 className="w-5 h-5 animate-spin" />
            <span>ผ้าคลุมเวทมนตร์กำลังเสกให้ของหายไป 1 ชิ้น... ✨</span>
          </div>
        )}

        {phase === 'guess' && (
          <div className="w-full max-w-md bg-teal-50 border-2 border-teal-400 rounded-2xl p-3 text-center text-xs sm:text-sm font-black text-teal-900 animate-in fade-in">
            สังเกตดูสิ! ของชิ้นไหนที่เคยอยู่ตรงนี้แล้วหายไปนะ?
          </div>
        )}

        {/* The Magic Tray */}
        <div className="relative w-full max-w-lg min-h-52 bg-gradient-to-b from-amber-50 via-amber-100/50 to-orange-50 rounded-3xl border-4 border-amber-300 shadow-inner p-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {/* Shroud Overlay */}
          {phase === 'shroud' && (
            <div className="absolute inset-0 bg-purple-600/90 backdrop-blur-xs rounded-3xl z-20 flex flex-col items-center justify-center text-white gap-2 transition-all duration-500">
              <span className="text-6xl animate-pulse">🪄✨</span>
              <span className="text-sm font-black">เสกให้ของหายไปแล้ว!</span>
            </div>
          )}

          {/* Items on Tray */}
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl border-2 border-amber-200 shadow-md flex flex-col items-center justify-center p-2 transform hover:scale-105 transition-all"
            >
              <span className="text-4xl sm:text-5xl filter drop-shadow">{item.icon}</span>
              <span className="text-[10px] font-black text-slate-700 mt-1 text-center truncate w-full">
                {item.name}
              </span>
            </div>
          ))}

          {/* Empty slot placeholder during guess / complete */}
          {(phase === 'guess' || phase === 'complete') && (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-3 border-dashed border-teal-400 bg-teal-50/70 flex flex-col items-center justify-center p-2 animate-pulse">
              {phase === 'complete' ? (
                <div className="flex flex-col items-center animate-bounce">
                  <span className="text-4xl">
                    {activeRound.allItemIcons.find((i) => i.id === activeRound.missingItemId)?.icon}
                  </span>
                  <span className="text-[10px] font-black text-emerald-800">เจอแล้ว!</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-teal-600">
                  <span className="text-2xl">❓</span>
                  <span className="text-[9px] font-black text-center">ชิ้นที่หายไป</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Options to Choose During Guess */}
        {(phase === 'guess' || phase === 'complete') && (
          <div className="w-full max-w-lg flex flex-col items-center gap-3">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-black text-slate-600">
                เลือกสิ่งของที่หนูคิดว่าหายไป:
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowHint(!showHint);
                  speakText(activeRound.hint, 'th', soundVolume);
                }}
                className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>คำใบ้</span>
              </button>
            </div>

            {showHint && (
              <div className="w-full bg-teal-50 border border-teal-300 rounded-xl p-2.5 text-xs text-teal-900 font-bold">
                💡 คำใบ้: {activeRound.hint}
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 w-full">
              {activeRound.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === activeRound.missingItemId;

                return (
                  <div
                    key={opt.id}
                    onClick={() => phase !== 'complete' && handleSelectOption(opt.id)}
                    className={`p-3 rounded-2xl border-3 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-sm relative group ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300'
                          : 'bg-rose-100 border-rose-400 ring-2 ring-rose-200'
                        : 'bg-white border-slate-200 hover:border-teal-400 hover:bg-teal-50'
                    }`}
                  >
                    {/* Speaker Button to listen to option item */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(opt.name, 'th', soundVolume);
                      }}
                      className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-white/80 hover:bg-white text-slate-700 hover:text-teal-600 shadow-xs transition-colors"
                      title={`ฟังเสียง ${opt.name}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-4xl">{opt.icon}</span>
                    <span className="text-xs font-black text-slate-800 text-center truncate w-full">
                      {opt.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completion Action */}
        {phase === 'complete' && (
          <button
            type="button"
            onClick={handleNextRound}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer animate-bounce mt-2"
          >
            <span>ไปข้อถัดไป</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
