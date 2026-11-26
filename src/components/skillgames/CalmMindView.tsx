import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Grade } from '../../types';
import { CALM_MIND_GAMES, CalmMindExercise } from '../../data/extraDevelopmentalGames';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  Heart,
  Volume2,
  Sparkles,
  Wind,
  CheckCircle2,
  Play,
  RotateCcw,
  ChevronRight,
  Sun,
  Smile,
} from 'lucide-react';

interface CalmMindViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

export const CalmMindView: React.FC<CalmMindViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'all' | Grade>('all');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [completedCycles, setCompletedCycles] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Default to ALL 20+ activities so children can explore all 22 exercises
  const availableExercises = useMemo(() => {
    if (selectedGradeFilter === 'all') {
      return CALM_MIND_GAMES;
    }
    const filtered = CALM_MIND_GAMES.filter((g) => g.grade === selectedGradeFilter);
    return filtered.length > 0 ? filtered : CALM_MIND_GAMES;
  }, [selectedGradeFilter]);

  const activeEx: CalmMindExercise =
    availableExercises[currentLevelIndex] || availableExercises[0] || CALM_MIND_GAMES[0];

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Reset state on level switch
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setBreathPhase('idle');
    setCompletedCycles(0);
    setIsSessionActive(false);
    setIsCompleted(false);

    if (soundVolume > 0) {
      speakText(`${activeEx.title} ${activeEx.voiceGuide}`, 'th', soundVolume);
    }
  }, [currentLevelIndex, activeEx.id, soundVolume]);

  // Breathing cycle machine
  const runBreathStep = (phase: 'inhale' | 'hold' | 'exhale', cycleCount: number) => {
    setBreathPhase(phase);

    if (phase === 'inhale') {
      soundEffects.playTap(soundVolume);
      if (soundVolume > 0) {
        speakText('สูดลมหายใจเข้าลึกๆ...', 'th', soundVolume);
      }
      timerRef.current = setTimeout(() => {
        runBreathStep('hold', cycleCount);
      }, 3500);
    } else if (phase === 'hold') {
      soundEffects.playTick(1.2, soundVolume);
      timerRef.current = setTimeout(() => {
        runBreathStep('exhale', cycleCount);
      }, 2000);
    } else if (phase === 'exhale') {
      soundEffects.playTick(0.8, soundVolume);
      if (soundVolume > 0) {
        speakText('ผ่อนลมหายใจออกช้าๆ สบายใจจัง...', 'th', soundVolume);
      }
      timerRef.current = setTimeout(() => {
        const nextCycle = cycleCount + 1;
        setCompletedCycles(nextCycle);

        if (nextCycle >= activeEx.cycles) {
          setIsCompleted(true);
          setIsSessionActive(false);
          setBreathPhase('idle');
          soundEffects.playVictory(soundVolume);
          if (onEarnStar) onEarnStar();
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
          speakText(`หนูเก่งมากเลยจ้า! จิตใจสงบและผ่อนคลาย อารมณ์ดีพร้อมเรียนรู้สิ่งใหม่ๆ แล้วจ้ะ!`, 'th', soundVolume);
        } else {
          runBreathStep('inhale', nextCycle);
        }
      }, 3500);
    }
  };

  const handleStartSession = () => {
    soundEffects.playTap(soundVolume);
    setIsSessionActive(true);
    setCompletedCycles(0);
    setIsCompleted(false);
    runBreathStep('inhale', 0);
  };

  const handleStopSession = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    soundEffects.playTap(soundVolume);
    setBreathPhase('idle');
    setIsSessionActive(false);
  };

  const handleNextLevel = () => {
    soundEffects.playTap(soundVolume);
    if (currentLevelIndex < availableExercises.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      setCurrentLevelIndex(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
      {/* Grade / View Filter Pills */}
      <div className="w-full flex items-center justify-between flex-wrap gap-2 px-2">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-bold text-slate-600">ตัวกรองระดับชั้น:</span>
          {(
            [
              { key: 'all', label: `ทั้งหมด (${CALM_MIND_GAMES.length} กิจกรรม)` },
              { key: 'K1', label: 'อนุบาล 1' },
              { key: 'K2', label: 'อนุบาล 2' },
              { key: 'K3', label: 'อนุบาล 3' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setSelectedGradeFilter(filter.key);
                setCurrentLevelIndex(0);
              }}
              className={`px-3 py-1 rounded-xl font-black text-xs transition-all cursor-pointer ${
                selectedGradeFilter === filter.key
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-black text-pink-800 bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
          ครบ {CALM_MIND_GAMES.length} กิจกรรมคลายใจ 💖
        </span>
      </div>

      {/* Responsive Level Selector for 20+ Activities */}
      <SkillGameLevelSelector
        totalLevels={availableExercises.length}
        currentIndex={currentLevelIndex}
        onSelectLevel={(idx) => {
          soundEffects.playTap(soundVolume);
          setCurrentLevelIndex(idx);
        }}
        prefix="กิจกรรมที่"
        colorTheme="pink"
        badgeSubtitle={`ผ่อนคลาย ${activeEx.cycles} รอบ`}
      />

      {/* Main Calming Card */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-7 border-3 border-pink-200 shadow-md flex flex-col items-center gap-5">
        {/* Title Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-b border-pink-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white text-3xl sm:text-4xl flex items-center justify-center shadow-md animate-pulse">
              {activeEx.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-800 border border-pink-300">
                  💖 การดูแลอารมณ์และจิตใจ
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {activeEx.ambientSoundName}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 mt-1">
                {activeEx.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => speakText(activeEx.voiceGuide, 'th', soundVolume)}
            className="p-2.5 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-300 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="ฟังเสียงบรรยาย"
          >
            <Volume2 className="w-4 h-4" />
            <span>ฟังเสียงนำทาง</span>
          </button>
        </div>

        {/* Guided Breathing Circle / Visual Soother */}
        <div className="relative w-full max-w-md h-64 sm:h-72 rounded-3xl bg-gradient-to-b from-sky-50 via-pink-50 to-indigo-50 border-3 border-pink-200 flex flex-col items-center justify-center p-4 overflow-hidden shadow-inner select-none">
          {/* Breathing Visual Orb */}
          <div
            className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all duration-1000 ${
              breathPhase === 'inhale'
                ? 'scale-125 bg-gradient-to-tr from-pink-400 to-rose-400 ring-8 ring-pink-200'
                : breathPhase === 'hold'
                ? 'scale-125 bg-gradient-to-tr from-amber-400 to-orange-400 ring-8 ring-amber-200 animate-pulse'
                : breathPhase === 'exhale'
                ? 'scale-90 bg-gradient-to-tr from-teal-400 to-sky-400 ring-4 ring-sky-200'
                : 'scale-100 bg-gradient-to-tr from-pink-300 to-indigo-300'
            }`}
          >
            <span className="text-4xl sm:text-5xl select-none mb-1">{activeEx.emoji}</span>
            <span className="text-xs sm:text-sm font-black px-2 py-0.5 rounded-full bg-white/30">
              {breathPhase === 'inhale'
                ? 'สูดหายใจเข้า 🎈'
                : breathPhase === 'hold'
                ? 'กลั้นหายใจนิ่งๆ ⭐'
                : breathPhase === 'exhale'
                ? 'ผ่อนลมหายใจออก 🍃'
                : 'พร้อมผ่อนคลาย 💖'}
            </span>
          </div>

          {/* Cycle Counter Badge */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-black text-pink-900 bg-white/85 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-pink-200 shadow-xs">
            <span>รอบการหายใจ:</span>
            <span className="text-sm text-pink-600 font-black">
              {completedCycles} / {activeEx.cycles} รอบ
            </span>
          </div>
        </div>

        {/* Positive Affirmation Message */}
        <div className="w-full max-w-lg bg-pink-50 border-2 border-pink-200 rounded-2xl p-3.5 text-center">
          <p className="text-xs sm:text-sm font-black text-pink-950">
            "{activeEx.soothingAffirmation}"
          </p>
          <p className="text-[11px] text-pink-700 font-bold mt-1">
            🌱 การฝึกหายใจช่วยให้หัวใจเต้นสม่ำเสมอ ผ่อนคลายความโกรธและความวิตกกังวล
          </p>
        </div>

        {/* Control Buttons */}
        {!isCompleted ? (
          <div className="flex items-center gap-3">
            {!isSessionActive ? (
              <button
                type="button"
                onClick={handleStartSession}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>เริ่มผ่อนคลายลมหายใจ</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStopSession}
                className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs border border-slate-300 transition-all active:scale-95 cursor-pointer"
              >
                หยุดชั่วคราว
              </button>
            )}
          </div>
        ) : (
          /* Finished State */
          <div className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                🌸
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black leading-tight">
                  จิตใจสงบสดชื่น เก่งมากเลยนะจ๊ะ!
                </h3>
                <p className="text-xs text-pink-100 font-bold mt-0.5">
                  ฝึกคลายใจ "{activeEx.title}" สำเร็จครบถ้วน ได้รับ 1 ดาวสะสม!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleStartSession}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-xs transition-all active:scale-95"
              >
                ทำใหม่อีกครั้ง
              </button>
              <button
                type="button"
                onClick={handleNextLevel}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>กิจกรรมถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
