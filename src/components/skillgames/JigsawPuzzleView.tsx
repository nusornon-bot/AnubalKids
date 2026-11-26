import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grade } from '../../types';
import { soundEffects, speakText } from '../../services/audioService';
import { triggerRoundSuccessConfetti } from '../../utils/confettiCelebration';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import {
  JIGSAW_ART_THEMES,
  JigsawArtTheme,
} from '../../data/jigsawImages';
import {
  RotateCcw,
  Home,
  Sparkles,
  Trophy,
  Volume2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';

interface JigsawPuzzleViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
  onExit?: () => void;
}

export const JigsawPuzzleView: React.FC<JigsawPuzzleViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
  onExit,
}) => {
  // Available puzzle themes
  const themes = JIGSAW_ART_THEMES;

  // Active theme index (starts with whale - matching the screenshot!)
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const activeTheme: JigsawArtTheme = themes[selectedThemeIndex] || themes[0];

  // Grid dimensions: K1 defaults to 2x2, K2 & K3 default to 3x3 (matching screenshot)
  const defaultDimension = currentGrade === 'K1' ? 2 : 3;
  const [gridSize, setGridSize] = useState<number>(defaultDimension);

  const totalPieces = gridSize * gridSize;

  // Tiles array: index is board position, value is slice target index (0 to totalPieces - 1)
  const [tiles, setTiles] = useState<number[]>([]);

  // Selected tile position (0 to totalPieces - 1) or null
  const [selectedPos, setSelectedPos] = useState<number | null>(null);

  // Solved state
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Moves count and timer
  const [movesCount, setMovesCount] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Optional number hint toggle for younger kids
  const [showNumberHints, setShowNumberHints] = useState<boolean>(false);

  // Helper to scramble tiles (ensuring not already solved)
  const scrambleTiles = useCallback((total: number): number[] => {
    const arr = Array.from({ length: total }, (_, i) => i);
    let isSolved = true;
    let attempts = 0;

    while (isSolved && attempts < 25) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      isSolved = arr.every((val, idx) => val === idx);
      attempts++;
    }

    // Safety: force at least one swap if still solved
    if (isSolved && total >= 2) {
      const temp = arr[0];
      arr[0] = arr[1];
      arr[1] = temp;
    }

    return arr;
  }, []);

  // Initialize or restart puzzle
  const handleRestart = useCallback(() => {
    soundEffects.playTap(soundVolume);
    const newScramble = scrambleTiles(totalPieces);
    setTiles(newScramble);
    setSelectedPos(null);
    setIsCompleted(false);
    setMovesCount(0);
    setSeconds(0);
    setTimerActive(true);
  }, [soundVolume, totalPieces, scrambleTiles]);

  // When theme or grid size changes, re-initialize
  useEffect(() => {
    const newScramble = scrambleTiles(totalPieces);
    setTiles(newScramble);
    setSelectedPos(null);
    setIsCompleted(false);
    setMovesCount(0);
    setSeconds(0);
    setTimerActive(true);

    if (soundVolume > 0) {
      speakText('แตะ 2 ช่องเพื่อสลับที่ จัดให้เหมือนภาพตัวอย่างนะจ๊ะ');
    }
  }, [selectedThemeIndex, gridSize, totalPieces, scrambleTiles, soundVolume]);

  // Timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerActive && !isCompleted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, isCompleted]);

  // Handle tile click: 2-tile swap mechanism
  const handleTileClick = (pos: number) => {
    if (isCompleted) return;

    // First tile tapped
    if (selectedPos === null) {
      setSelectedPos(pos);
      soundEffects.playTap(soundVolume);
      return;
    }

    // Tapped the same tile again -> deselect
    if (selectedPos === pos) {
      setSelectedPos(null);
      soundEffects.playTap(soundVolume);
      return;
    }

    // Second tile tapped -> swap them!
    const newTiles = [...tiles];
    const temp = newTiles[selectedPos];
    newTiles[selectedPos] = newTiles[pos];
    newTiles[pos] = temp;

    setTiles(newTiles);
    setSelectedPos(null);
    setMovesCount((prev) => prev + 1);

    // Check if the puzzle is solved
    const won = newTiles.every((val, idx) => val === idx);

    if (won) {
      setIsCompleted(true);
      setTimerActive(false);
      soundEffects.playVictory(soundVolume);
      triggerRoundSuccessConfetti({
        starCount: 3,
        isPerfect: true,
        origin: { x: 0.5, y: 0.55 },
      });
      speakText('เก่งมากเลยจ้า! หนูต่อภาพได้สมบูรณ์แบบเหมือนภาพตัวอย่างแล้ว');
      if (onEarnStar) {
        onEarnStar();
      }
    } else {
      soundEffects.playSuccess(soundVolume);
    }
  };

  const handleNextTheme = () => {
    soundEffects.playTap(soundVolume);
    setSelectedThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const handlePrevTheme = () => {
    soundEffects.playTap(soundVolume);
    setSelectedThemeIndex((prev) => (prev - 1 + themes.length) % themes.length);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center select-none py-2 px-2 sm:px-4">
      {/* Top Instruction Header - EXACT text from user's screenshot */}
      <div className="w-full text-center py-2 mb-2 sm:mb-3">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-700 tracking-wide flex items-center justify-center gap-2">
          <span>แตะ 2 ช่องเพื่อสลับที่</span>
          <span className="text-slate-400 font-normal">·</span>
          <span>จัดให้เหมือนภาพตัวอย่าง</span>
          <button
            onClick={() => {
              soundEffects.playTap(soundVolume);
              speakText('แตะ 2 ช่องเพื่อสลับที่ จัดให้เหมือนภาพตัวอย่าง');
            }}
            className="p-1 rounded-full text-slate-400 hover:text-teal-600 hover:bg-slate-100 transition-colors ml-1"
            title="ฟังเสียงคำแนะนำ"
            aria-label="ฟังเสียงคำแนะนำ"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </h2>
      </div>

      {/* Main Game Stage Container */}
      <div className="w-full bg-white/90 backdrop-blur-xs rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col items-center">
        {/* Layout: Puzzle Board (Left) & Preview Box (Right) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 my-2">
          {/* LEFT: Sliced Jigsaw Grid */}
          <div className="relative">
            <div
              className={`p-3 sm:p-4 rounded-3xl bg-slate-100/80 border border-slate-200/80 shadow-inner grid gap-2 sm:gap-2.5 transition-all ${
                gridSize === 2
                  ? 'grid-cols-2 w-64 h-64 sm:w-80 sm:h-80'
                  : 'grid-cols-3 w-72 h-72 sm:w-[350px] sm:h-[350px] md:w-[380px] md:h-[380px]'
              }`}
            >
              {tiles.map((targetIdx, currentPos) => {
                const isSelected = selectedPos === currentPos;
                const isCorrect = targetIdx === currentPos;

                // Compute slice coordinates from targetIdx
                const sliceCol = targetIdx % gridSize;
                const sliceRow = Math.floor(targetIdx / gridSize);

                const xPercent = gridSize > 1 ? (sliceCol / (gridSize - 1)) * 100 : 0;
                const yPercent = gridSize > 1 ? (sliceRow / (gridSize - 1)) * 100 : 0;

                return (
                  <button
                    key={`tile-${currentPos}`}
                    onClick={() => handleTileClick(currentPos)}
                    aria-label={`ชิ้นส่วนจิ๊กซอว์ตำแหน่ง ${currentPos + 1}`}
                    className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer focus:outline-hidden ${
                      isSelected
                        ? 'border-2 border-emerald-400 ring-2 ring-emerald-300 shadow-md scale-[1.03] z-10'
                        : isCompleted
                        ? 'border border-emerald-300 shadow-xs'
                        : 'border-2 border-slate-200/90 hover:border-teal-300 hover:scale-[1.01] shadow-xs active:scale-95'
                    }`}
                    style={{
                      backgroundImage: `url("${activeTheme.imageUrl}")`,
                      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                      backgroundPosition: `${xPercent}% ${yPercent}%`,
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {/* Selected Highlight Overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-emerald-400/10 pointer-events-none rounded-2xl" />
                    )}

                    {/* Optional number hint */}
                    {showNumberHints && !isCompleted && (
                      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-white/80 backdrop-blur-xs text-[10px] font-black text-slate-600 shadow-xs">
                        {targetIdx + 1}
                      </div>
                    )}

                    {/* Correctly placed subtle indicator badge */}
                    {isCorrect && !isCompleted && (
                      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400/70 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Victory Badge Overlay */}
            {isCompleted && (
              <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-950 font-black px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5 animate-bounce text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 text-amber-900" />
                <span>สำเร็จแล้ว!</span>
              </div>
            )}
          </div>

          {/* RIGHT: Preview Card (ภาพตัวอย่าง) & Controls */}
          <div className="flex flex-col items-center justify-start space-y-4">
            {/* "ภาพตัวอย่าง" Card - EXACT match to user's screenshot layout */}
            <div className="bg-teal-50/50 p-3 sm:p-4 rounded-3xl border border-teal-200/80 shadow-xs flex flex-col items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-teal-200/60 shadow-sm bg-white">
                <img
                  src={activeTheme.imageUrl}
                  alt={`ภาพตัวอย่าง ${activeTheme.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-700 mt-2">
                ภาพตัวอย่าง
              </span>
            </div>

            {/* Theme title and switcher */}
            <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-2xl border border-slate-200/60">
              <button
                onClick={handlePrevTheme}
                className="p-1 rounded-full text-slate-500 hover:text-slate-800 hover:bg-white transition-colors"
                title="ภาพก่อนหน้า"
                aria-label="ภาพก่อนหน้า"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 min-w-[130px] justify-center text-center">
                <span>{activeTheme.emoji}</span>
                <span className="truncate">{activeTheme.name}</span>
              </div>
              <button
                onClick={handleNextTheme}
                className="p-1 rounded-full text-slate-500 hover:text-slate-800 hover:bg-white transition-colors"
                title="ภาพถัดไป"
                aria-label="ภาพถัดไป"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Difficulty Toggle (2x2 vs 3x3) */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setGridSize(2);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  gridSize === 2
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                2x2 (4 ชิ้น)
              </button>
              <button
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setGridSize(3);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  gridSize === 3
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                3x3 (9 ชิ้น)
              </button>
            </div>

            {/* Stats row: moves & timer */}
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span>สลับไป: <strong className="text-slate-700">{movesCount}</strong> ครั้ง</span>
              <span>•</span>
              <span>เวลา: <strong className="text-slate-700">{formatTimer(seconds)}</strong></span>
            </div>
          </div>
        </div>

        {/* Completion Celebration Message */}
        {isCompleted && (
          <div className="w-full mt-4 p-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <h4 className="font-black text-sm sm:text-base">
                  เก่งมากจ้า! หนูต่อภาพสำเร็จแล้ว 🌟
                </h4>
                <p className="text-xs text-emerald-100">
                  ต่อได้ตรงตามภาพตัวอย่างเป๊ะเลย ใช้เวลา {formatTimer(seconds)} (สลับ {movesCount} ครั้ง)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRestart}
                className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>เล่นภาพนี้อีกครั้ง</span>
              </button>
              <button
                onClick={handleNextTheme}
                className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-sm transition-transform active:scale-95 flex items-center gap-1"
              >
                <span>ภาพต่อไป</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Responsive Theme Selector */}
        <div className="w-full mt-4 pt-3 border-t border-slate-100">
          <SkillGameLevelSelector
            totalLevels={themes.length}
            currentIndex={selectedThemeIndex}
            onSelectLevel={(idx) => {
              soundEffects.playTap(soundVolume);
              setSelectedThemeIndex(idx);
            }}
            prefix="ภาพ"
            colorTheme="teal"
            customLabels={themes.map((th) => `${th.emoji} ${th.name}`)}
            badgeSubtitle={activeTheme.name}
          />
        </div>
      </div>

      {/* Bottom Action Buttons - EXACT matching the user's screenshot */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
        {/* Button 1: 🔄 เริ่มใหม่ */}
        <button
          onClick={handleRestart}
          className="px-6 sm:px-7 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base border border-slate-300/80 shadow-xs flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-600" />
          <span>เริ่มใหม่</span>
        </button>

        {/* Button 2: 🏠 ออก */}
        <button
          onClick={() => {
            soundEffects.playTap(soundVolume);
            if (onExit) {
              onExit();
            }
          }}
          className="px-6 sm:px-7 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base border border-slate-300/80 shadow-xs flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
        >
          <Home className="w-4 h-4 text-slate-600" />
          <span>ออก</span>
        </button>
      </div>
    </div>
  );
};
