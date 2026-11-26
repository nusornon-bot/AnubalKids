import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grade } from '../../types';
import {
  SPOT_DIFFERENCE_LEVELS,
  SpotDifferenceLevel,
  DifferenceItem,
} from '../../data/skillGamesDataNew';
import { SpotSceneRenderer } from '../../data/spotScenesSvg';
import { soundEffects, speakText } from '../../services/audioService';
import {
  triggerRoundSuccessConfetti,
  triggerInteractiveConfetti,
} from '../../utils/confettiCelebration';
import { CelebrationParticles } from '../CelebrationParticles';
import { GameTimer, formatSecondsToMinutes } from './GameTimer';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import {
  RotateCcw,
  Sparkles,
  Volume2,
  Lightbulb,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Home,
  Sliders,
  Dices,
} from 'lucide-react';
import {
  AdaptiveGrade,
  SPOT_ADAPTIVE_CONFIGS,
  normalizeToAdaptiveGrade,
  sampleAdaptiveDifferences,
} from '../../utils/spotAdaptiveDifficulty';

interface SpotDifferencesViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
  onExit?: () => void;
}

export const SpotDifferencesView: React.FC<SpotDifferencesViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
  onExit,
}) => {
  const availableLevels = useMemo(() => {
    return SPOT_DIFFERENCE_LEVELS;
  }, []);

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const activeLevel: SpotDifferenceLevel =
    availableLevels[currentLevelIndex] || availableLevels[0];

  // Adaptive Grade & Sampling State
  const [selectedGrade, setSelectedGrade] = useState<AdaptiveGrade>(() =>
    normalizeToAdaptiveGrade(currentGrade)
  );
  const [seed, setSeed] = useState<number>(() => Date.now());

  // Dynamically compute the adaptive sampled differences and active IDs
  const adaptiveState = useMemo(() => {
    return sampleAdaptiveDifferences(activeLevel, selectedGrade, seed);
  }, [activeLevel, selectedGrade, seed]);

  const activeLevelDifferences = adaptiveState.adaptedDifferences;
  const activeDifferenceIds = adaptiveState.activeDifferenceIds;
  const adaptiveConfig = adaptiveState.config;

  const [foundDifferenceIds, setFoundDifferenceIds] = useState<string[]>([]);
  const [hintedDiffId, setHintedDiffId] = useState<string | null>(null);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [lastMissCoords, setLastMissCoords] = useState<{ x: number; y: number } | null>(null);

  const setupLevel = useCallback(() => {
    setFoundDifferenceIds([]);
    setHintedDiffId(null);
    setIsLevelComplete(false);
    setTimerKey((k) => k + 1);
    setElapsedSeconds(0);
    setLastMissCoords(null);

    if (soundVolume > 0) {
      speakText(
        `ระดับ ${adaptiveConfig.thaiLabel}: มองหาจุดต่าง ${activeLevelDifferences.length} จุด ระหว่างภาพซ้ายกับภาพขวานะจ๊ะ แตะเพื่อวงจุดต่างได้เลย`,
        'th',
        soundVolume
      );
    }
  }, [adaptiveConfig.thaiLabel, activeLevelDifferences.length, soundVolume]);

  useEffect(() => {
    setupLevel();
  }, [currentLevelIndex, selectedGrade, seed, setupLevel]);

  // Click handling on either Left or Right scene
  const handleSceneClick = (
    e: React.MouseEvent<HTMLDivElement>,
    _sceneSide: 'left' | 'right'
  ) => {
    if (isLevelComplete) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Check if clicked near any unfound difference using adaptive scaled radius + hitTolerance
    let hitDiff: DifferenceItem | null = null;
    for (const diff of activeLevelDifferences) {
      if (foundDifferenceIds.includes(diff.id)) continue;

      const dx = clickX - diff.xPercent;
      const dy = clickY - diff.yPercent;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Hit if within adaptive scaled radius + grade tolerance
      if (dist <= diff.radius + adaptiveConfig.hitTolerance) {
        hitDiff = diff;
        break;
      }
    }

    if (hitDiff) {
      // Spot found!
      soundEffects.playSuccess(soundVolume);
      const updated = [...foundDifferenceIds, hitDiff.id];
      setFoundDifferenceIds(updated);
      setHintedDiffId(null);
      speakText(`พบแล้ว! ${hitDiff.name}`, 'th', soundVolume);

      if (updated.length === activeLevelDifferences.length) {
        setIsLevelComplete(true);
        soundEffects.playVictory(soundVolume);
        // Multi-stage celebratory particle confetti animation
        triggerRoundSuccessConfetti({
          starCount: 3,
          isPerfect: true,
          origin: { x: 0.5, y: 0.55 },
        });
        speakText(
          `เก่งมากเลยจ้า! หาจุดต่างระดับ ${adaptiveConfig.thaiLabel} ครบทั้ง ${activeLevelDifferences.length} จุดแล้ว`,
          'th',
          soundVolume
        );
        if (onEarnStar) onEarnStar();
      }
    } else {
      // Missed tap
      setLastMissCoords({ x: clickX, y: clickY });
      soundEffects.playTap(soundVolume);
      setTimeout(() => setLastMissCoords(null), 700);
    }
  };

  // Give a hint: highlight an unfound difference with the purple arrow
  const handleGiveHint = () => {
    const unfound = activeLevelDifferences.find((d) => !foundDifferenceIds.includes(d.id));
    if (unfound) {
      soundEffects.playTap(soundVolume);
      setHintedDiffId(unfound.id);
      speakText(`ลองสังเกตตรง ${unfound.name} ดูสิจ๊ะ`, 'th', soundVolume);
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

  const handlePrevLevel = () => {
    soundEffects.playTap(soundVolume);
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex((prev) => prev - 1);
    } else {
      setCurrentLevelIndex(availableLevels.length - 1);
    }
  };

  const remainingCount = activeLevelDifferences.length - foundDifferenceIds.length;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center select-none py-2 px-2 sm:px-4 gap-2.5">
      {/* Responsive Question Selector */}
      <SkillGameLevelSelector
        totalLevels={availableLevels.length}
        currentIndex={currentLevelIndex}
        onSelectLevel={(idx) => {
          soundEffects.playTap(soundVolume);
          setCurrentLevelIndex(idx);
        }}
        prefix="ข้อ"
        colorTheme="amber"
        badgeSubtitle={activeLevel.themeScene}
      />

      {/* ADAPTIVE DIFFICULTY CONTROL BAR */}
      <div className="w-full bg-linear-to-r from-amber-50 via-orange-50 to-amber-100 rounded-3xl p-3 sm:p-4 border-2 border-amber-300 shadow-sm flex flex-col gap-2.5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow-xs">
              <Sliders className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-amber-950">
                  ปรับความยากแบบ Adaptive ตามระดับ Grade
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                  K1-K3, P1-P3
                </span>
              </div>
              <p className="text-[11px] text-amber-800 font-bold hidden sm:block">
                ระดับชั้นสูงขึ้นจะเพิ่มจำนวนจุดสังเกต และลดขนาดจุดจับผิดภาพให้ท้าทายยิ่งขึ้น
              </p>
            </div>
          </div>

          {/* Re-roll random differences button */}
          <button
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setSeed(Date.now());
            }}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 font-black text-xs border border-amber-300 shadow-2xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            title="สุ่มชุดจุดต่างใหม่สำหรับข้อนี้"
          >
            <Dices className="w-4 h-4 text-amber-600" />
            <span>สุ่มชุดจุดต่างใหม่</span>
          </button>
        </div>

        {/* Grade Pills Selector: K1 to P3 */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2 w-full">
          {(['K1', 'K2', 'K3', 'P1', 'P2', 'P3'] as AdaptiveGrade[]).map((g) => {
            const cfg = SPOT_ADAPTIVE_CONFIGS[g];
            const isSelected = selectedGrade === g;

            return (
              <button
                key={g}
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setSelectedGrade(g);
                  setSeed(Date.now());
                }}
                className={`px-2 py-2 rounded-2xl flex flex-col items-center justify-center gap-0.5 border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102 ring-2 ring-amber-300'
                    : 'bg-white/90 text-slate-700 border-amber-200 hover:border-amber-400 hover:bg-amber-50/70'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-sm">{cfg.icon}</span>
                  <span className="font-black text-xs">{cfg.thaiLabel}</span>
                </div>
                <div
                  className={`text-[10px] font-bold ${
                    isSelected ? 'text-amber-100' : 'text-slate-500'
                  }`}
                >
                  {cfg.targetCount} จุด • {Math.round(cfg.radiusScale * 100)}%
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Level Metrics Banner */}
        <div className="w-full bg-white/85 rounded-2xl px-3 py-2 border border-amber-200/90 flex items-center justify-between flex-wrap gap-2 text-xs font-bold text-amber-950">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-black text-xs">
              {adaptiveConfig.icon} {adaptiveConfig.thaiLabel} ({adaptiveConfig.ageRange})
            </span>
            <span className="text-slate-700">{adaptiveConfig.difficultyTitle}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 text-[11px] sm:text-xs">
            <span>
              🎯 เป้าหมาย: <strong className="text-amber-900">{activeLevelDifferences.length} จุด</strong>
            </span>
            <span>
              🔍 ขนาดจุด: <strong className="text-amber-900">{Math.round(adaptiveConfig.radiusScale * 100)}%</strong>
            </span>
            <span>
              🛡️ ความคลาดเคลื่อนคลิก: <strong className="text-amber-900">±{adaptiveConfig.hitTolerance}px</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 1. Header Navigation Bar */}
      <div className="w-full bg-white/95 rounded-3xl p-3 sm:p-4 border-2 border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-3 mb-1">
        {/* Title & Level Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-black flex items-center justify-center shadow-xs text-base sm:text-lg">
            🔍
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                ข้อ {currentLevelIndex + 1} จาก {availableLevels.length}
              </span>
              <span className="text-xs font-bold text-slate-500">
                {activeLevel.themeScene}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-slate-800 mt-0.5">
              {activeLevel.title}
            </h2>
          </div>
        </div>

        {/* Controls & Timer */}
        <div className="flex items-center gap-2 flex-wrap">
          <GameTimer key={timerKey} isRunning={!isLevelComplete} onTimeUpdate={setElapsedSeconds} />

          {/* Hint button */}
          <button
            onClick={handleGiveHint}
            disabled={isLevelComplete || remainingCount === 0}
            className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300 font-bold text-xs flex items-center gap-1 transition-all disabled:opacity-40 cursor-pointer shadow-xs"
            title="ขอคำใบ้"
          >
            <Lightbulb className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">ใบ้</span>
          </button>

          {/* Audio repeat */}
          <button
            onClick={() =>
              speakText(
                `มองหาจุดต่างอีก ${remainingCount} จุด ระหว่างสองภาพนี้นะจ๊ะ`,
                'th',
                soundVolume
              )
            }
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors shadow-xs"
            title="ฟังเสียงคำแนะนำ"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Restart */}
          <button
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setupLevel();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors shadow-xs cursor-pointer"
            title="เริ่มใหม่"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Main Comparative Game Board - Side-by-Side */}
      <div className="w-full bg-linear-to-b from-amber-50 to-orange-50/60 rounded-3xl p-3 sm:p-4 border-3 border-amber-300 shadow-md flex flex-col items-center">
        {/* Sub-header instruction */}
        <div className="w-full text-center py-1 mb-2">
          <p className="text-xs sm:text-sm font-bold text-amber-950">
            แตะตรงจุดที่แตกต่างกันในภาพซ้ายหรือภาพขวา (เหลืออีก {remainingCount} จุด จากทั้งหมด {activeLevelDifferences.length} จุด)
          </p>
        </div>

        {/* Side-by-Side Images Container */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* LEFT SCENE */}
          <div
            onClick={(e) => handleSceneClick(e, 'left')}
            className="relative w-full aspect-square rounded-2xl overflow-hidden border-4 border-amber-700/80 shadow-md bg-white cursor-pointer select-none group"
          >
            <SpotSceneRenderer
              levelId={activeLevel.id}
              variant="left"
              foundDifferenceIds={foundDifferenceIds}
              activeDifferenceIds={activeDifferenceIds}
            />

            {/* Glowing Neon Purple Boxes & Arrows for Found or Hinted Differences on LEFT */}
            {activeLevelDifferences.map((diff) => {
              const isFound = foundDifferenceIds.includes(diff.id);
              const isHinted = hintedDiffId === diff.id;
              if (!isFound && !isHinted) return null;

              const w = diff.widthPercent || 24;
              const h = diff.heightPercent || 18;

              return (
                <div
                  key={`left-box-${diff.id}`}
                  style={{
                    left: `${diff.xPercent}%`,
                    top: `${diff.yPercent}%`,
                    width: `${w}%`,
                    height: `${h}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="absolute pointer-events-none z-20 flex items-center justify-center"
                >
                  <div className="w-full h-full rounded-2xl border-[3.5px] border-purple-400 ring-2 ring-purple-300 shadow-[0_0_18px_rgba(192,132,252,0.9),inset_0_0_10px_rgba(192,132,252,0.4)] bg-purple-500/10 animate-pulse" />

                  {/* Bright Purple Pointer Arrow on top */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 animate-bounce z-30 drop-shadow-md">
                    <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
                      <path
                        d="M 14 30 L 3 16 H 9 V 2 H 19 V 16 H 25 Z"
                        fill="url(#purpleArrowGrad)"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient id="purpleArrowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#d8b4fe" />
                          <stop offset="50%" stopColor="#c084fc" />
                          <stop offset="100%" stopColor="#9333ea" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              );
            })}

            {/* Tap ripple effect on miss */}
            {lastMissCoords && (
              <div
                style={{
                  left: `${lastMissCoords.x}%`,
                  top: `${lastMissCoords.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute w-10 h-10 rounded-full border-2 border-red-400/80 bg-red-400/20 animate-ping pointer-events-none"
              />
            )}
          </div>

          {/* RIGHT SCENE */}
          <div
            onClick={(e) => handleSceneClick(e, 'right')}
            className="relative w-full aspect-square rounded-2xl overflow-hidden border-4 border-amber-700/80 shadow-md bg-white cursor-pointer select-none group"
          >
            <SpotSceneRenderer
              levelId={activeLevel.id}
              variant="right"
              foundDifferenceIds={foundDifferenceIds}
              activeDifferenceIds={activeDifferenceIds}
            />

            {/* Glowing Neon Purple Boxes for Found or Hinted Differences on RIGHT */}
            {activeLevelDifferences.map((diff) => {
              const isFound = foundDifferenceIds.includes(diff.id);
              const isHinted = hintedDiffId === diff.id;
              if (!isFound && !isHinted) return null;

              const w = diff.widthPercent || 24;
              const h = diff.heightPercent || 18;

              return (
                <div
                  key={`right-box-${diff.id}`}
                  style={{
                    left: `${diff.xPercent}%`,
                    top: `${diff.yPercent}%`,
                    width: `${w}%`,
                    height: `${h}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="absolute pointer-events-none z-20 flex items-center justify-center"
                >
                  <div className="w-full h-full rounded-2xl border-[3.5px] border-purple-400 ring-2 ring-purple-300 shadow-[0_0_18px_rgba(192,132,252,0.9),inset_0_0_10px_rgba(192,132,252,0.4)] bg-purple-500/10 animate-pulse" />
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Bottom Wooden Shelf Bar */}
        <div className="w-full mt-3 rounded-2xl bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 border-t-3 border-b-2 border-amber-500/80 shadow-md py-2.5 px-4 flex items-center justify-center">
          {/* Wooden Pill Counter Centerpiece */}
          <div className="bg-amber-100/90 border border-amber-300/80 shadow-inner px-4 py-1.5 rounded-full flex items-center gap-3">
            {/* Progress Squares matching adaptive difference count */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {activeLevelDifferences.map((diff, idx) => {
                const isFound = foundDifferenceIds.includes(diff.id);
                return (
                  <div
                    key={`slot-${diff.id}-${idx}`}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 ${
                      isFound
                        ? 'bg-purple-600 text-white shadow-md scale-110'
                        : 'bg-amber-200/90 border border-amber-300/80 shadow-inner text-amber-700/60'
                    }`}
                  >
                    {isFound ? '★' : ''}
                  </div>
                );
              })}
            </div>

            {/* Total Remaining / Difference Count */}
            <span className="text-amber-950 font-black text-base sm:text-lg pl-1">
              {activeLevelDifferences.length}
            </span>
          </div>
        </div>

        {/* Victory Banner with Particle Confetti & Celebration Controls */}
        {isLevelComplete && (
          <div className="relative w-full mt-3 p-4 rounded-2xl bg-linear-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg animate-bounce-once overflow-hidden">
            {/* Embedded Celebration Floating Particles */}
            <CelebrationParticles active={isLevelComplete} theme="rainbow" particleCount={30} />

            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <Trophy className="w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
              <div>
                <h4 className="font-black text-sm sm:text-base flex items-center gap-1.5">
                  <span>ยอดเยี่ยมมาก! ผ่านระดับ {adaptiveConfig.thaiLabel} ครบทั้ง {activeLevelDifferences.length} จุด</span>
                  <span className="text-base animate-bounce">🎉</span>
                </h4>
                <p className="text-xs text-emerald-100">
                  ใช้เวลา {formatSecondsToMinutes(elapsedSeconds)} • ความยาก {adaptiveConfig.difficultyTitle}
                </p>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-2 flex-wrap justify-center">
              {/* Interactive Confetti Cannon Button */}
              <button
                type="button"
                onClick={() => {
                  soundEffects.playVictory(soundVolume);
                  triggerInteractiveConfetti();
                }}
                className="px-3 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-amber-950 font-black text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
                title="ยิงพลุกระดาษฉลองอีกรอบ!"
              >
                <span>🎉</span>
                <span>จุดพลุฉลอง</span>
              </button>
              <button
                onClick={setupLevel}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>เล่นอีกครั้ง</span>
              </button>
              <button
                onClick={handleNextLevel}
                className="px-4 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs shadow-sm transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
              >
                <span>ข้อต่อไป</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Action Buttons: เริ่มใหม่ & ออก */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 flex-wrap">
        <button
          onClick={() => {
            soundEffects.playTap(soundVolume);
            setupLevel();
          }}
          className="px-6 sm:px-7 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base border border-slate-300/80 shadow-xs flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-600" />
          <span>เริ่มใหม่</span>
        </button>

        <button
          onClick={handlePrevLevel}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base border border-slate-300/80 shadow-xs flex items-center gap-1 transition-transform active:scale-95 cursor-pointer"
          title="ข้อก่อนหน้า"
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
          <span>ข้อก่อนหน้า</span>
        </button>

        <button
          onClick={handleNextLevel}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base border border-slate-300/80 shadow-xs flex items-center gap-1 transition-transform active:scale-95 cursor-pointer"
          title="ข้อถัดไป"
        >
          <span>ข้อถัดไป</span>
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>

        {onExit && (
          <button
            onClick={() => {
              soundEffects.playTap(soundVolume);
              onExit();
            }}
            className="px-6 sm:px-7 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base border border-slate-300/80 shadow-xs flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4 text-slate-600" />
            <span>ออก</span>
          </button>
        )}
      </div>
    </div>
  );
};
