import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Grade } from '../../types';
import { MATCHING_LEVELS, MatchingLevel, MatchingCardItem } from '../../data/skillGamesData';
import { soundEffects, speakText } from '../../services/audioService';
import { triggerRoundSuccessConfetti } from '../../utils/confettiCelebration';
import confetti from 'canvas-confetti';
import { Volume2, RotateCcw, CheckCircle2, Sparkles, Award, ArrowRight, Clock } from 'lucide-react';
import { GameTimer, formatSecondsToMinutes } from './GameTimer';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';

interface MatchingGameViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

interface CardState extends MatchingCardItem {
  instanceId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MatchingGameView: React.FC<MatchingGameViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  // Filter levels by current grade
  const availableLevels = useMemo(() => {
    return MATCHING_LEVELS.filter((l) => l.grade === currentGrade);
  }, [currentGrade]);

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const activeLevel: MatchingLevel = availableLevels[currentLevelIndex] || availableLevels[0] || MATCHING_LEVELS[0];

  const [cards, setCards] = useState<CardState[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardState[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchesFound, setMatchesFound] = useState(0);
  const matchesFoundRef = useRef(0);
  const [movesCount, setMovesCount] = useState(0);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  // Initialize deck for current level
  const setupLevel = useCallback((level: MatchingLevel) => {
    // Shuffle cards
    const deck: CardState[] = level.cards.map((c, i) => ({
      ...c,
      instanceId: `${c.id}-${i}-${Math.random().toString(36).slice(2, 6)}`,
      isFlipped: false,
      isMatched: false,
    }));

    // Knuth shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setSelectedCards([]);
    setIsProcessing(false);
    matchesFoundRef.current = 0;
    setMatchesFound(0);
    setMovesCount(0);
    setIsLevelComplete(false);
    setElapsedSeconds(0);
    setTimerKey((k) => k + 1);

    // Voice instruction
    if (soundVolume > 0) {
      speakText(level.instructionVoice);
    }
  }, [soundVolume]);

  useEffect(() => {
    setupLevel(activeLevel);
  }, [activeLevel, setupLevel]);

  const totalPairs = Math.floor(activeLevel.cards.length / 2);

  // Card click handler
  const handleCardClick = (clickedCard: CardState) => {
    if (isProcessing || clickedCard.isFlipped || clickedCard.isMatched) return;

    soundEffects.playTap(soundVolume);

    // Flip card
    const updatedCards = cards.map((c) =>
      c.instanceId === clickedCard.instanceId ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsProcessing(true);
      setMovesCount((m) => m + 1);

      const [first, second] = newSelected;
      const isMatch = first.matchId === second.matchId && first.instanceId !== second.instanceId;

      if (isMatch) {
        // Success match!
        setTimeout(() => {
          soundEffects.playSuccess(soundVolume);
          confetti({
            particleCount: 25,
            spread: 60,
            origin: { y: 0.6 },
          });

          setCards((prev) =>
            prev.map((c) =>
              c.matchId === first.matchId ? { ...c, isMatched: true } : c
            )
          );
          setSelectedCards([]);
          setIsProcessing(false);

          matchesFoundRef.current += 1;
          const updatedMatches = matchesFoundRef.current;
          setMatchesFound(updatedMatches);

          if (updatedMatches >= totalPairs) {
            // Level Victory!
            setIsLevelComplete(true);
            soundEffects.playVictory(soundVolume);
            if (onEarnStar) {
              onEarnStar();
            }
            triggerRoundSuccessConfetti({
              starCount: 3,
              isPerfect: true,
              origin: { x: 0.5, y: 0.5 },
            });
          }
        }, 500);
      } else {
        // Mismatched
        setTimeout(() => {
          soundEffects.playIncorrect(soundVolume);
          setCards((prev) =>
            prev.map((c) =>
              c.instanceId === first.instanceId || c.instanceId === second.instanceId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelectedCards([]);
          setIsProcessing(false);
        }, 900);
      }
    }
  };

  const handleNextLevel = () => {
    soundEffects.playTap(soundVolume);
    if (currentLevelIndex + 1 < availableLevels.length) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      setCurrentLevelIndex(0);
    }
  };

  return (
    <div className="w-full flex flex-col items-center max-w-5xl mx-auto space-y-4">
      {/* Top Level Selector & Stats Bar */}
      <div className="w-full bg-white/95 rounded-2xl p-3 sm:p-4 border-2 border-indigo-100 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              {activeLevel.type === 'identical' ? '🔍 ภาพเหมือนเป๊ะ' : '🔗 ภาพสัมพันธ์'}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              ด่าน {currentLevelIndex + 1} / {availableLevels.length}
            </span>
            <h3 className="text-sm sm:text-base font-black text-slate-800">
              {activeLevel.title}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{activeLevel.description}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio voice instruction button */}
          <button
            type="button"
            onClick={() => speakText(activeLevel.instructionVoice)}
            className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl border border-indigo-200 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
            title="ฟังเสียงคำแนะนำ"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">ฟังโจทย์</span>
          </button>

          {/* Timer */}
          <GameTimer
            key={`matching-timer-${timerKey}`}
            isRunning={!isLevelComplete}
            onTick={(sec) => setElapsedSeconds(sec)}
            onReset={() => setElapsedSeconds(0)}
          />

          {/* Reset button */}
          <button
            type="button"
            onClick={() => setupLevel(activeLevel)}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
            title="เริ่มเล่นด่านนี้ใหม่"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">รีเซ็ต</span>
          </button>

          {/* Score & Progress */}
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 text-amber-900 text-xs font-black">
            <span>⭐ จับคู่สำเร็จ:</span>
            <span className="text-sm font-black text-amber-600">{matchesFound} / {totalPairs} คู่</span>
          </div>
        </div>
      </div>

      {/* Level Selection Chips */}
      {availableLevels.length > 1 && (
        <SkillGameLevelSelector
          totalLevels={availableLevels.length}
          currentIndex={currentLevelIndex}
          onSelectLevel={(idx) => {
            soundEffects.playTap(soundVolume);
            setCurrentLevelIndex(idx);
          }}
          prefix="ด่าน"
          colorTheme="indigo"
          customLabels={availableLevels.map((lvl, idx) => `${idx + 1}. ${lvl.title.split(':')[0]}`)}
          badgeSubtitle={activeLevel.title}
        />
      )}

      {/* Cards Grid */}
      <div
        className={`w-full grid gap-3 sm:gap-4 justify-center items-center py-2 ${
          cards.length <= 6
            ? 'grid-cols-2 sm:grid-cols-3 max-w-2xl'
            : cards.length <= 8
            ? 'grid-cols-2 sm:grid-cols-4 max-w-3xl'
            : 'grid-cols-2 sm:grid-cols-5 max-w-4xl'
        }`}
      >
        {cards.map((card) => {
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.instanceId}
              type="button"
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched || isProcessing}
              className={`h-32 sm:h-36 md:h-40 rounded-2xl p-2 flex flex-col items-center justify-center transition-all duration-300 transform select-none relative cursor-pointer ${
                isRevealed
                  ? `${card.bgGradient || 'from-indigo-50 to-blue-100'} border-3 ${
                      card.isMatched
                        ? 'border-emerald-400 ring-4 ring-emerald-200/60 shadow-md scale-98'
                        : 'border-indigo-400 shadow-md scale-102'
                    }`
                  : 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 border-3 border-indigo-400 hover:border-white shadow-md hover:scale-103 active:scale-95 text-white'
              }`}
            >
              {isRevealed ? (
                <>
                  {/* Listen button for this card */}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(`${card.name} ${card.subtext || ''}`);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        speakText(`${card.name} ${card.subtext || ''}`);
                      }
                    }}
                    className="absolute top-2 left-2 p-1.5 rounded-xl bg-white/95 hover:bg-white text-indigo-700 shadow-2xs hover:scale-110 active:scale-95 transition-all z-10 cursor-pointer flex items-center gap-1 border border-indigo-100"
                    title="กดฟังเสียงตัวเลือกนี้"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-[9px] font-black hidden sm:inline">ฟังเสียง</span>
                  </span>

                  <span className="text-4xl sm:text-5xl drop-shadow-sm transition-transform animate-in zoom-in-75">
                    {card.icon}
                  </span>
                  <p className="text-xs sm:text-sm font-black text-slate-800 text-center mt-2 line-clamp-1">
                    {card.name}
                  </p>
                  {card.subtext && (
                    <span className="text-[10px] font-bold text-slate-500 bg-white/80 px-1.5 py-0.2 rounded-md mt-0.5">
                      {card.subtext}
                    </span>
                  )}
                  {card.isMatched && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl font-black mb-1">
                    ❓
                  </div>
                  <span className="text-[11px] font-bold text-white/80">แตะเพื่อเปิด</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Completion Modal / Victory Banner */}
      {isLevelComplete && (
        <div className="w-full max-w-xl bg-gradient-to-br from-amber-50 via-yellow-50 to-emerald-50 border-3 border-amber-300 rounded-3xl p-5 sm:p-6 text-center shadow-lg animate-in zoom-in-90 space-y-3">
          <div className="w-16 h-16 bg-amber-400 text-white rounded-3xl flex items-center justify-center text-3xl mx-auto shadow-md">
            🏆
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-800 flex items-center justify-center gap-2">
            <span>ยินดีด้วยจ้า! คนเก่งจับคู่ครบทุกรูปแล้ว</span>
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            หนูจับคู่สำเร็จทั้งหมด {totalPairs} คู่ ในการเปิดเพียง {movesCount} ครั้ง เก่งมากเลย!
          </p>

          <div className="inline-flex items-center gap-1.5 bg-amber-100/80 text-amber-900 px-3 py-1 rounded-full text-xs font-black">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>ใช้เวลาไป: {formatSecondsToMinutes(elapsedSeconds)}</span>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setupLevel(activeLevel)}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-black text-xs sm:text-sm rounded-xl border-2 border-slate-200 transition-all cursor-pointer"
            >
              🔄 เล่นซ้ำอีกครั้ง
            </button>
            <button
              type="button"
              onClick={handleNextLevel}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm rounded-xl border-b-3 border-emerald-700 transition-all shadow-md active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
            >
              <span>เล่นด่านต่อไป</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
