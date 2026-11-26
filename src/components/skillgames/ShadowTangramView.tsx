import React, { useState, useEffect, useMemo } from 'react';
import { Grade } from '../../types';
import {
  SILHOUETTE_QUESTIONS,
  SilhouetteQuestion,
  TANGRAM_LEVELS,
  TangramLevel,
  TangramShape,
} from '../../data/skillGamesDataNew';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { GameTimer } from './GameTimer';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import {
  RotateCcw,
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Eye,
  Shapes,
  HelpCircle,
} from 'lucide-react';

interface ShadowTangramViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

export const ShadowTangramView: React.FC<ShadowTangramViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const [subMode, setSubMode] = useState<'silhouette' | 'tangram'>('silhouette');

  // --- Mode 1: Silhouette ---
  const availableSilhouettes = useMemo(() => {
    return SILHOUETTE_QUESTIONS;
  }, []);

  const [currentSilIndex, setCurrentSilIndex] = useState(0);
  const activeSil: SilhouetteQuestion =
    availableSilhouettes[currentSilIndex] || availableSilhouettes[0] || SILHOUETTE_QUESTIONS[0];

  const [selectedSilOption, setSelectedSilOption] = useState<string | null>(null);
  const [isSilCorrect, setIsSilCorrect] = useState(false);

  // --- Mode 2: Tangram ---
  const availableTangrams = useMemo(() => {
    return TANGRAM_LEVELS;
  }, []);

  const [currentTangramIndex, setCurrentTangramIndex] = useState(0);
  const activeTangram: TangramLevel =
    availableTangrams[currentTangramIndex] || availableTangrams[0] || TANGRAM_LEVELS[0];

  const [filledSlots, setFilledSlots] = useState<Record<string, TangramShape>>({});
  const [selectedShapeToPlace, setSelectedShapeToPlace] = useState<TangramShape | null>(null);
  const [isTangramComplete, setIsTangramComplete] = useState(false);

  // Reset states on grade change
  useEffect(() => {
    setCurrentSilIndex(0);
    setCurrentTangramIndex(0);
  }, [currentGrade]);

  // Reset silhouette state on question change
  useEffect(() => {
    setSelectedSilOption(null);
    setIsSilCorrect(false);
    if (subMode === 'silhouette') {
      speakText('สังเกตภาพเงาดำนี้สิจ๊ะ คิดว่าเป็นเงาของสิ่งใด?', 'th', soundVolume);
    }
  }, [activeSil, subMode, soundVolume]);

  // Reset tangram state on tangram level change
  useEffect(() => {
    setFilledSlots({});
    setSelectedShapeToPlace(null);
    setIsTangramComplete(false);
    if (subMode === 'tangram') {
      speakText(activeTangram.description, 'th', soundVolume);
    }
  }, [activeTangram, subMode, soundVolume]);

  // Silhouette Option Select
  const handleSelectSilOption = (optId: string) => {
    if (isSilCorrect) return;
    soundEffects.playTap(soundVolume);
    setSelectedSilOption(optId);

    if (optId === activeSil.correctId) {
      setIsSilCorrect(true);
      soundEffects.playSuccess(soundVolume);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      speakText(activeSil.explanation, 'th', soundVolume);
      if (onEarnStar) onEarnStar();
    } else {
      soundEffects.playIncorrect(soundVolume);
      speakText('ยังไม่ใช่จ้ะ ลองสังเกตความยาวและรูปทรงของเงาอีกครั้งนะ', 'th', soundVolume);
    }
  };

  const handleNextSil = () => {
    soundEffects.playTap(soundVolume);
    if (currentSilIndex < availableSilhouettes.length - 1) {
      setCurrentSilIndex((prev) => prev + 1);
    } else {
      setCurrentSilIndex(0);
    }
  };

  // Tangram Slot Placement
  const handleSlotClick = (slotId: string, requiredType: string) => {
    if (isTangramComplete) return;

    if (!selectedShapeToPlace) {
      soundEffects.playTap(soundVolume);
      speakText('เลือกชิ้นส่วนรูปทรงจากด้านล่างก่อนนะจ๊ะ', 'th', soundVolume);
      return;
    }

    if (selectedShapeToPlace.shapeType === requiredType) {
      soundEffects.playSuccess(soundVolume);
      const updated = { ...filledSlots, [slotId]: selectedShapeToPlace };
      setFilledSlots(updated);
      setSelectedShapeToPlace(null);

      // Check if all slots filled
      const allFilled = activeTangram.slots.every((s) => updated[s.id] !== undefined);
      if (allFilled) {
        setIsTangramComplete(true);
        soundEffects.playVictory(soundVolume);
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
        speakText(`ยอดเยี่ยมมาก! ประกอบ ${activeTangram.title} สำเร็จอย่างสมบูรณ์แบบ`, 'th', soundVolume);
        if (onEarnStar) onEarnStar();
      }
    } else {
      soundEffects.playIncorrect(soundVolume);
      speakText('รูปทรงนี้ยังไม่พอดีกับช่องจ้ะ ลองหารูปทรงอื่นดูนะ', 'th', soundVolume);
    }
  };

  const handleNextTangram = () => {
    soundEffects.playTap(soundVolume);
    if (currentTangramIndex < availableTangrams.length - 1) {
      setCurrentTangramIndex((prev) => prev + 1);
    } else {
      setCurrentTangramIndex(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-3">
      {/* Sub-Mode Switcher */}
      <div className="w-full bg-white rounded-3xl p-3 sm:p-4 border-3 border-purple-200 shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setSubMode('silhouette');
            }}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              subMode === 'silhouette'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-purple-50'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>1. ทายเงาปริศนา</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setSubMode('tangram');
            }}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              subMode === 'tangram'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-purple-50'
            }`}
          >
            <Shapes className="w-4 h-4" />
            <span>2. แทนแกรมรูปทรง</span>
          </button>
        </div>
      </div>

      {/* Responsive Level Selector */}
      <SkillGameLevelSelector
        totalLevels={subMode === 'silhouette' ? availableSilhouettes.length : availableTangrams.length}
        currentIndex={subMode === 'silhouette' ? currentSilIndex : currentTangramIndex}
        onSelectLevel={(idx) => {
          soundEffects.playTap(soundVolume);
          if (subMode === 'silhouette') setCurrentSilIndex(idx);
          else setCurrentTangramIndex(idx);
        }}
        prefix={subMode === 'silhouette' ? 'ข้อ' : 'ด่าน'}
        colorTheme="purple"
        badgeSubtitle={subMode === 'silhouette' ? 'ทายเงาปริศนา' : 'แทนแกรมรูปทรง'}
      />

      {/* ========================================= */}
      {/* SUB-MODE 1: SILHOUETTE QUESTION           */}
      {/* ========================================= */}
      {subMode === 'silhouette' && (
        <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border-3 border-purple-200 shadow-md flex flex-col items-center gap-5">
          <div className="text-center">
            <h2 className="text-base sm:text-lg font-black text-slate-800 flex items-center justify-center gap-2">
              <span>👤</span>
              <span>เงาปริศนานี้ คือภาพของสิ่งใดเอ่ย?</span>
            </h2>
            <p className="text-xs text-slate-500 font-bold mt-0.5">
              สังเกตรูปร่าง โครงร่าง และสัดส่วนของเงา
            </p>
          </div>

          {/* Silhouette Display Card */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950 p-4 flex flex-col items-center justify-center shadow-xl border-4 border-purple-300 overflow-hidden">
            {/* Spotlight Beam */}
            <div className="absolute inset-0 bg-radial from-purple-500/30 to-transparent pointer-events-none" />

            {/* Silhouette / Revealed Icon */}
            <div className="relative z-10 transition-all duration-500 transform">
              {isSilCorrect ? (
                <div className="flex flex-col items-center animate-bounce">
                  <span className="text-7xl sm:text-8xl filter drop-shadow-2xl">
                    {activeSil.silhouetteIcon}
                  </span>
                  <span className="mt-2 px-3 py-1 bg-amber-400 text-slate-900 font-black text-xs rounded-full shadow-md">
                    ถูกต้องแล้ว! ✨
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span
                    className="text-7xl sm:text-8xl filter brightness-0 invert-0 contrast-200 opacity-90 select-none"
                    style={{ filter: 'brightness(0)' }}
                  >
                    {activeSil.silhouetteIcon}
                  </span>
                  <span className="mt-2 px-3 py-1 bg-white/20 text-purple-200 font-bold text-[11px] rounded-full">
                    เงาลึกลับ ❓
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Explanation Banner when correct */}
          {isSilCorrect && (
            <div className="w-full max-w-lg bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-3 flex items-center justify-between gap-2 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-900 text-xs sm:text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{activeSil.explanation}</span>
              </div>
              <button
                type="button"
                onClick={() => speakText(activeSil.explanation, 'th', soundVolume)}
                className="p-1.5 bg-emerald-500 text-white rounded-xl shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Options Grid */}
          <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeSil.options.map((opt) => {
              const isSelected = selectedSilOption === opt.id;
              const isThisCorrect = opt.id === activeSil.correctId;

              return (
                <div
                  key={opt.id}
                  onClick={() => !isSilCorrect && handleSelectSilOption(opt.id)}
                  className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm relative group ${opt.color} ${
                    isSelected
                      ? isThisCorrect
                        ? 'border-emerald-500 ring-4 ring-emerald-300'
                        : 'border-rose-400 ring-2 ring-rose-200'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  {/* Speaker Button to listen to option */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(opt.label, 'th', soundVolume);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-700 hover:text-purple-600 shadow-xs transition-colors"
                    title={`ฟังเสียง ${opt.label}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-4xl">{opt.icon}</span>
                  <span className="text-xs sm:text-sm font-black text-slate-800 text-center">
                    {opt.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Next Button */}
          {isSilCorrect && (
            <button
              type="button"
              onClick={handleNextSil}
              className="mt-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>ไปข้อถัดไป</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* ========================================= */}
      {/* SUB-MODE 2: TANGRAM SHAPE PUZZLE           */}
      {/* ========================================= */}
      {subMode === 'tangram' && (
        <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border-3 border-purple-200 shadow-md flex flex-col items-center gap-5">
          <div className="text-center">
            <h2 className="text-base sm:text-lg font-black text-slate-800 flex items-center justify-center gap-2">
              <span>{activeTangram.resultIcon}</span>
              <span>{activeTangram.title}</span>
            </h2>
            <p className="text-xs text-slate-500 font-bold mt-0.5">
              {activeTangram.description}
            </p>
          </div>

          {/* Tangram Assembly Canvas Board */}
          <div className="relative w-full max-w-md h-64 sm:h-72 bg-gradient-to-b from-indigo-50/70 to-purple-100/50 rounded-3xl border-3 border-dashed border-purple-400 p-4 shadow-inner flex items-center justify-center">
            {activeTangram.slots.map((slot) => {
              const filledShape = filledSlots[slot.id];
              return (
                <div
                  key={slot.id}
                  onClick={() => handleSlotClick(slot.id, slot.requiredShapeType)}
                  style={{
                    left: `${slot.xPercent}%`,
                    top: `${slot.yPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    filledShape
                      ? 'bg-white shadow-md border-emerald-400 scale-105'
                      : selectedShapeToPlace?.shapeType === slot.requiredShapeType
                      ? 'bg-amber-100 border-amber-400 animate-pulse ring-2 ring-amber-300'
                      : 'bg-white/80 border-purple-300 hover:bg-purple-100'
                  }`}
                >
                  {filledShape ? (
                    <div className="flex flex-col items-center">
                      <span className="text-3xl">{filledShape.icon}</span>
                      <span className="text-[10px] font-black text-emerald-800">{slot.label}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center opacity-70">
                      <span className="text-xl">
                        {slot.requiredShapeType === 'triangle'
                          ? '🔺'
                          : slot.requiredShapeType === 'circle'
                          ? '⚪'
                          : slot.requiredShapeType === 'rectangle'
                          ? '🪵'
                          : '🟦'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600">{slot.label}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Shape Tray for Placement */}
          <div className="w-full max-w-md bg-slate-50 p-4 rounded-3xl border-2 border-slate-200 flex flex-col items-center gap-2">
            <span className="text-xs font-black text-slate-600">
              แตะเลือกรูปทรง แล้วแตะใส่ลงในช่องว่างด้านบน
            </span>
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              {activeTangram.shapesPool.map((shape) => {
                const isSelected = selectedShapeToPlace?.id === shape.id;
                return (
                  <button
                    key={shape.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      setSelectedShapeToPlace(shape);
                      speakText(shape.name, 'th', soundVolume);
                    }}
                    className={`px-3 py-2 rounded-2xl border-2 flex items-center gap-1.5 font-black text-xs sm:text-sm transition-all cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'bg-amber-400 border-amber-500 text-slate-900 shadow-md ring-2 ring-amber-300 scale-105'
                        : 'bg-white border-slate-300 text-slate-800 hover:bg-purple-50'
                    }`}
                  >
                    <span className="text-xl">{shape.icon}</span>
                    <span>{shape.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Button on Complete */}
          {isTangramComplete && (
            <button
              type="button"
              onClick={handleNextTangram}
              className="mt-1 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer animate-bounce"
            >
              <span>ต่อภาพถัดไป</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
