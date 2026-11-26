import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grade } from '../../types';
import { MAZE_LEVELS, MazeLevel, MazeCell } from '../../data/skillGamesDataNew';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { GameTimer, formatSecondsToMinutes } from './GameTimer';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Volume2,
  Trophy,
  Award,
  Footprints,
  Compass,
} from 'lucide-react';

interface MazePathViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

export const MazePathView: React.FC<MazePathViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const availableLevels = useMemo(() => {
    return MAZE_LEVELS;
  }, []);

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const activeLevel: MazeLevel = availableLevels[currentLevelIndex] || availableLevels[0] || MAZE_LEVELS[0];

  // Character current position {x, y}
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [visitedCells, setVisitedCells] = useState<string[]>(['0,0']);
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Initialize level
  const setupLevel = useCallback((lvl: MazeLevel) => {
    const startCell = lvl.cells.find((c) => c.type === 'start') || { x: 0, y: 0 };
    setPlayerPos({ x: startCell.x, y: startCell.y });
    setVisitedCells([`${startCell.x},${startCell.y}`]);
    setCollectedItems([]);
    setStepCount(0);
    setIsLevelComplete(false);
    setTimerKey((k) => k + 1);
    setElapsedSeconds(0);

    speakText(lvl.storyPrompt, 'th', soundVolume);
  }, [soundVolume]);

  useEffect(() => {
    setCurrentLevelIndex(0);
  }, [currentGrade]);

  useEffect(() => {
    setupLevel(activeLevel);
  }, [activeLevel, setupLevel]);

  // Construct a strict row-major matrix: row (y) from 0 to rows-1, col (x) from 0 to cols-1
  const sortedGridCells = useMemo(() => {
    const list: MazeCell[] = [];
    for (let r = 0; r < activeLevel.gridSize.rows; r++) {
      for (let c = 0; c < activeLevel.gridSize.cols; c++) {
        const found = activeLevel.cells.find((cell) => cell.x === c && cell.y === r);
        if (found) {
          list.push(found);
        } else {
          list.push({ x: c, y: r, type: 'wall' });
        }
      }
    }
    return list;
  }, [activeLevel]);

  // Check valid move
  const canMoveTo = useCallback(
    (x: number, y: number): boolean => {
      if (x < 0 || x >= activeLevel.gridSize.cols || y < 0 || y >= activeLevel.gridSize.rows) {
        return false;
      }
      const targetCell = activeLevel.cells.find((c) => c.x === x && c.y === y);
      if (!targetCell || targetCell.type === 'wall') {
        return false;
      }
      return true;
    },
    [activeLevel]
  );

  const handleMove = useCallback(
    (dx: number, dy: number) => {
      if (isLevelComplete) return;

      const newX = playerPos.x + dx;
      const newY = playerPos.y + dy;

      if (!canMoveTo(newX, newY)) {
        soundEffects.playIncorrect(soundVolume);
        return;
      }

      soundEffects.playTap(soundVolume);
      setPlayerPos({ x: newX, y: newY });
      setStepCount((s) => s + 1);
      setVisitedCells((prev) => Array.from(new Set([...prev, `${newX},${newY}`])));

      // Check item pickup
      const cellAtNewPos = activeLevel.cells.find((c) => c.x === newX && c.y === newY);
      if (cellAtNewPos && cellAtNewPos.type === 'item' && !collectedItems.includes(`${newX},${newY}`)) {
        setCollectedItems((prev) => [...prev, `${newX},${newY}`]);
        soundEffects.playLevelUp(soundVolume);
        if (cellAtNewPos.itemName) {
          speakText(`เก็บ ${cellAtNewPos.itemName} สำเร็จ!`, 'th', soundVolume);
        }
      }

      // Check Goal
      if (cellAtNewPos && cellAtNewPos.type === 'goal') {
        const required = activeLevel.requiredItemsCount || 0;
        const currentItems = collectedItems.length;

        if (currentItems < required) {
          speakText(`อย่าลืมเก็บไอเทมให้ครบก่อนนะจ๊ะ ยังขาดอีก ${required - currentItems} ชิ้น`, 'th', soundVolume);
          return;
        }

        // Victory!
        setIsLevelComplete(true);
        soundEffects.playVictory(soundVolume);
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        speakText('ยอดเยี่ยมมาก! เดินทางถึงจุดหมายสำเร็จแล้วคนเก่ง', 'th', soundVolume);
        if (onEarnStar) onEarnStar();
      }
    },
    [activeLevel, canMoveTo, collectedItems, isLevelComplete, onEarnStar, playerPos.x, playerPos.y, soundVolume]
  );

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLevelComplete) return;
      if (e.key === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        handleMove(0, -1);
      } else if (e.key === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        handleMove(0, 1);
      } else if (e.key === 'ArrowLeft' || e.code === 'KeyA') {
        e.preventDefault();
        handleMove(-1, 0);
      } else if (e.key === 'ArrowRight' || e.code === 'KeyD') {
        e.preventDefault();
        handleMove(1, 0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, isLevelComplete]);

  // Direct cell tap movement if adjacent
  const handleCellClick = (cell: MazeCell) => {
    if (isLevelComplete) return;
    const dx = cell.x - playerPos.x;
    const dy = cell.y - playerPos.y;
    // Must be orthogonally adjacent
    if ((Math.abs(dx) === 1 && dy === 0) || (Math.abs(dy) === 1 && dx === 0)) {
      handleMove(dx, dy);
    }
  };

  const handleNextLevel = () => {
    soundEffects.playTap(soundVolume);
    if (currentLevelIndex < availableLevels.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      setCurrentLevelIndex(0);
    }
  };

  const itemsRemaining = (activeLevel.requiredItemsCount || 0) - collectedItems.length;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-3">
      {/* Responsive Level Selector for Mobile & Tablet */}
      <SkillGameLevelSelector
        totalLevels={availableLevels.length}
        currentIndex={currentLevelIndex}
        onSelectLevel={(idx) => {
          soundEffects.playTap(soundVolume);
          setCurrentLevelIndex(idx);
        }}
        prefix="ด่าน"
        colorTheme="emerald"
        badgeSubtitle={activeLevel.goalLabel ? `พาไปหา ${activeLevel.goalLabel}` : undefined}
      />

      {/* Sub-Header & Controls */}
      <div className="w-full bg-white rounded-3xl p-3 sm:p-4 border-3 border-emerald-200 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl sm:text-3xl">🧭</span>
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-800">
              {activeLevel.title}
            </h2>
            <p className="text-xs font-bold text-slate-500">{activeLevel.subtitle}</p>
          </div>
        </div>

        {/* Timer & Reset Button */}
        <div className="flex items-center gap-2">
          <GameTimer key={timerKey} isRunning={!isLevelComplete} onTimeUpdate={setElapsedSeconds} />

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setupLevel(activeLevel);
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-all cursor-pointer active:scale-95"
            title="เริ่มใหม่"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Story Prompt Voice Bar */}
      <div className="w-full bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-emerald-900 text-xs sm:text-sm font-bold">
          <Footprints className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{activeLevel.storyPrompt}</span>
        </div>
        <button
          type="button"
          onClick={() => speakText(activeLevel.storyPrompt, 'th', soundVolume)}
          className="p-2 bg-emerald-500 text-white rounded-xl shadow-xs hover:bg-emerald-600 active:scale-95 transition-all shrink-0"
          title="ฟังคำสั่งเสียง"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Maze Grid Card */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-6 border-3 border-emerald-200 shadow-md flex flex-col items-center">
        {/* Item Counter if applicable */}
        {activeLevel.requiredItemsCount && activeLevel.requiredItemsCount > 0 && (
          <div className="mb-3 px-4 py-1.5 bg-amber-50 border-2 border-amber-300 rounded-2xl text-xs sm:text-sm font-black text-amber-800 flex items-center gap-2">
            <span>ภารกิจเก็บไอเทม:</span>
            <span className="text-base font-black text-amber-600">
              {collectedItems.length} / {activeLevel.requiredItemsCount}
            </span>
            {itemsRemaining > 0 ? (
              <span className="text-xs text-amber-700">(เหลืออีก {itemsRemaining} ชิ้น)</span>
            ) : (
              <span className="text-xs text-emerald-600 font-black">ครบแล้ว! มุ่งหน้าสู่เส้นชัยเลย</span>
            )}
          </div>
        )}

        {/* Maze Grid Display */}
        <div
          className="grid gap-1.5 sm:gap-2 p-3 sm:p-4 bg-emerald-100/70 border-3 border-emerald-400 rounded-3xl shadow-inner select-none"
          style={{
            gridTemplateColumns: `repeat(${activeLevel.gridSize.cols}, minmax(0, 1fr))`,
            width: '100%',
            maxWidth: `${activeLevel.gridSize.cols * 70}px`,
          }}
        >
          {sortedGridCells.map((cell) => {
            const isPlayerHere = playerPos.x === cell.x && playerPos.y === cell.y;
            const isVisited = visitedCells.includes(`${cell.x},${cell.y}`);
            const isWall = cell.type === 'wall';
            const isStart = cell.type === 'start';
            const isGoal = cell.type === 'goal';
            const isItem = cell.type === 'item';
            const isItemCollected = collectedItems.includes(`${cell.x},${cell.y}`);

            // Check if adjacent for hint
            const dx = Math.abs(cell.x - playerPos.x);
            const dy = Math.abs(cell.y - playerPos.y);
            const isAdjacent = (dx === 1 && dy === 0) || (dy === 1 && dx === 0);

            return (
              <div
                key={`${cell.x}-${cell.y}`}
                onClick={() => handleCellClick(cell)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all duration-200 cursor-pointer text-center ${
                  isWall
                    ? 'bg-slate-700/80 border-2 border-slate-800 shadow-inner cursor-not-allowed opacity-90'
                    : isPlayerHere
                    ? 'bg-amber-300 ring-4 ring-amber-400 shadow-md scale-105 z-10'
                    : isGoal
                    ? 'bg-emerald-300/80 border-2 border-emerald-500 animate-pulse'
                    : isVisited
                    ? 'bg-emerald-200/90 border border-emerald-300'
                    : isAdjacent
                    ? 'bg-white hover:bg-emerald-100 border-2 border-emerald-300 shadow-xs ring-2 ring-emerald-200/60'
                    : 'bg-white/95 border border-slate-200'
                }`}
              >
                {/* Cell content */}
                {isPlayerHere ? (
                  <div className="flex flex-col items-center justify-center animate-bounce">
                    <span className="text-2xl sm:text-3xl filter drop-shadow">
                      {activeLevel.startIcon}
                    </span>
                  </div>
                ) : isGoal ? (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl">{activeLevel.goalIcon}</span>
                    <span className="text-[9px] font-black text-emerald-800 leading-none">
                      {activeLevel.goalLabel}
                    </span>
                  </div>
                ) : isStart ? (
                  <div className="flex flex-col items-center justify-center opacity-60">
                    <span className="text-xl">🚩</span>
                    <span className="text-[8px] font-black text-slate-500">จุดเริ่ม</span>
                  </div>
                ) : isItem ? (
                  <div className="flex flex-col items-center justify-center">
                    {isItemCollected ? (
                      <span className="text-sm opacity-30">✨</span>
                    ) : (
                      <span className="text-2xl sm:text-3xl animate-pulse filter drop-shadow">
                        {cell.itemIcon || '🌸'}
                      </span>
                    )}
                  </div>
                ) : isWall ? (
                  <span className="text-lg opacity-40">🧱</span>
                ) : isVisited ? (
                  <span className="text-xs text-emerald-600 font-bold opacity-70">🐾</span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300/60" />
                )}
              </div>
            );
          })}
        </div>

        {/* Directional Pad Controls */}
        {(() => {
          const canUp = canMoveTo(playerPos.x, playerPos.y - 1);
          const canDown = canMoveTo(playerPos.x, playerPos.y + 1);
          const canLeft = canMoveTo(playerPos.x - 1, playerPos.y);
          const canRight = canMoveTo(playerPos.x + 1, playerPos.y);

          return (
            <div className="mt-4 flex flex-col items-center gap-1.5 w-full max-w-xs">
              <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                <span>แตะที่ช่อง หรือกดปุ่มลูกศร / คีย์บอร์ด (↑ ↓ ← →)</span>
              </p>
              {/* Up */}
              <button
                type="button"
                onClick={() => handleMove(0, -1)}
                disabled={isLevelComplete || !canUp}
                className={`w-14 h-12 rounded-2xl font-black text-base shadow-md active:scale-90 flex flex-col items-center justify-center transition-all cursor-pointer ${
                  canUp
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white ring-2 ring-emerald-300'
                    : 'bg-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                }`}
                title="เดินขึ้น (ArrowUp หรือ W)"
              >
                <ArrowUp className="w-6 h-6" />
                <span className="text-[8px] opacity-80 leading-none">ขึ้น</span>
              </button>
              {/* Left, Down, Right */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMove(-1, 0)}
                  disabled={isLevelComplete || !canLeft}
                  className={`w-14 h-12 rounded-2xl font-black text-base shadow-md active:scale-90 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    canLeft
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white ring-2 ring-emerald-300'
                      : 'bg-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                  }`}
                  title="เดินซ้าย (ArrowLeft หรือ A)"
                >
                  <ArrowLeft className="w-6 h-6" />
                  <span className="text-[8px] opacity-80 leading-none">ซ้าย</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(0, 1)}
                  disabled={isLevelComplete || !canDown}
                  className={`w-14 h-12 rounded-2xl font-black text-base shadow-md active:scale-90 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    canDown
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white ring-2 ring-emerald-300'
                      : 'bg-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                  }`}
                  title="เดินลง (ArrowDown หรือ S)"
                >
                  <ArrowDown className="w-6 h-6" />
                  <span className="text-[8px] opacity-80 leading-none">ลง</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(1, 0)}
                  disabled={isLevelComplete || !canRight}
                  className={`w-14 h-12 rounded-2xl font-black text-base shadow-md active:scale-90 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    canRight
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white ring-2 ring-emerald-300'
                      : 'bg-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                  }`}
                  title="เดินขวา (ArrowRight หรือ D)"
                >
                  <ArrowRight className="w-6 h-6" />
                  <span className="text-[8px] opacity-80 leading-none">ขวา</span>
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Completion Modal / Banner */}
      {isLevelComplete && (
        <div className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
              ⭐
            </div>
            <div>
              <h3 className="text-lg font-black leading-tight">ยินดีด้วยนะคนเก่ง! ผ่านด่านแล้ว</h3>
              <p className="text-xs text-emerald-100 font-bold mt-0.5">
                เดินทั้งหมด {stepCount} ก้าว | ใช้เวลา {formatSecondsToMinutes(elapsedSeconds)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setupLevel(activeLevel)}
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-xs sm:text-sm border border-white/30 transition-all cursor-pointer"
            >
              เล่นอีกรอบ
            </button>
            <button
              type="button"
              onClick={handleNextLevel}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>ด่านถัดไป</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
