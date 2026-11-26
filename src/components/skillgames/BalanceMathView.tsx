import React, { useState, useEffect, useMemo } from 'react';
import { Grade } from '../../types';
import {
  BALANCE_QUESTIONS,
  BalanceScaleQuestion,
} from '../../data/skillGamesDataNew';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import {
  Scale,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Volume2,
  HelpCircle,
} from 'lucide-react';

interface BalanceMathViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

export const BalanceMathView: React.FC<BalanceMathViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const availableQuestions = useMemo(() => {
    return BALANCE_QUESTIONS;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeQ: BalanceScaleQuestion =
    availableQuestions[currentIndex] || availableQuestions[0] || BALANCE_QUESTIONS[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
  }, [currentGrade]);

  useEffect(() => {
    setSelectedOptionId(null);
    setIsCorrect(false);
    speakText(`${activeQ.prompt}`, 'th', soundVolume);
  }, [activeQ, soundVolume]);

  // Calculate beam tilt rotation angle in degrees
  const leftTotalWeight = activeQ.leftPan.item.weight * activeQ.leftPan.count;
  const rightTotalWeight = activeQ.rightPan.item.weight * activeQ.rightPan.count;

  const tiltDegrees = useMemo(() => {
    const diff = rightTotalWeight - leftTotalWeight;
    if (diff === 0) return 0;
    // Cap tilt between -12 and +12 degrees
    const angle = Math.max(-12, Math.min(12, diff * 2));
    return angle;
  }, [leftTotalWeight, rightTotalWeight]);

  // Target correct answer
  const correctAnswerId = useMemo<'left' | 'right' | 'equal'>(() => {
    if (activeQ.targetQuestion === 'equal') {
      return leftTotalWeight === rightTotalWeight ? 'equal' : leftTotalWeight > rightTotalWeight ? 'left' : 'right';
    }
    if (activeQ.targetQuestion === 'heavier') {
      return leftTotalWeight > rightTotalWeight ? 'left' : 'right';
    }
    // lighter
    return leftTotalWeight < rightTotalWeight ? 'left' : 'right';
  }, [activeQ, leftTotalWeight, rightTotalWeight]);

  const handleSelectOption = (optId: 'left' | 'right' | 'equal') => {
    if (isCorrect) return;
    soundEffects.playTap(soundVolume);
    setSelectedOptionId(optId);

    if (optId === correctAnswerId) {
      setIsCorrect(true);
      soundEffects.playVictory(soundVolume);
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      speakText(activeQ.explanation, 'th', soundVolume);
      if (onEarnStar) onEarnStar();
    } else {
      soundEffects.playIncorrect(soundVolume);
      speakText(
        'ยังไม่ถูกต้องจ้ะ สังเกตดูฝั่งที่เอียงลงข้างล่างจะหนักกว่า ฝั่งที่ลอยสูงจะเบากว่านะ',
        'th',
        soundVolume
      );
    }
  };

  const handleNext = () => {
    soundEffects.playTap(soundVolume);
    if (currentIndex < availableQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-3">
      {/* Responsive Question Selector */}
      <SkillGameLevelSelector
        totalLevels={availableQuestions.length}
        currentIndex={currentIndex}
        onSelectLevel={(idx) => {
          soundEffects.playTap(soundVolume);
          setCurrentIndex(idx);
        }}
        prefix="ข้อ"
        colorTheme="indigo"
        badgeSubtitle="ตราชั่งสมดุล"
      />

      {/* Header Bar */}
      <div className="w-full bg-white rounded-3xl p-3 sm:p-5 border-3 border-indigo-200 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl sm:text-3xl">⚖️</span>
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-800">
              {activeQ.title}
            </h2>
            <p className="text-xs font-bold text-slate-500">
              เปรียบเทียบน้ำหนัก หนักกว่า-เบากว่า และความสมดุล
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setSelectedOptionId(null);
              setIsCorrect(false);
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-all cursor-pointer"
            title="เริ่มใหม่"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border-3 border-indigo-200 shadow-md flex flex-col items-center gap-6">
        {/* Prompt Speech Bar */}
        <div className="w-full max-w-lg bg-indigo-50 border-2 border-indigo-300 rounded-2xl p-3 flex items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-black text-indigo-900">
            {activeQ.prompt}
          </span>
          <button
            type="button"
            onClick={() => speakText(activeQ.prompt, 'th', soundVolume)}
            className="p-1.5 bg-indigo-600 text-white rounded-xl shadow-xs shrink-0"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* ========================================= */}
        {/* ANIMATED BALANCE SCALE VISUALIZATION      */}
        {/* ========================================= */}
        <div className="relative w-full max-w-lg h-64 sm:h-72 bg-gradient-to-b from-sky-50 to-indigo-50/60 rounded-3xl border-2 border-indigo-200 p-4 flex flex-col items-center justify-end shadow-inner overflow-hidden">
          {/* Fulcrum Stand / Base */}
          <div className="absolute bottom-6 flex flex-col items-center z-10">
            {/* Pivot pin */}
            <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-amber-600 shadow-md z-20" />
            {/* Triangular post */}
            <div
              className="w-0 h-0 border-l-28 border-r-28 border-b-64 border-l-transparent border-r-transparent border-b-slate-700 -mt-2"
            />
            {/* Heavy Base plate */}
            <div className="w-40 h-4 rounded-xl bg-slate-800 shadow-md -mt-1" />
          </div>

          {/* Tilting Balance Beam */}
          <div
            className="absolute top-20 w-80 sm:w-96 h-4 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-full shadow-md z-15 transition-transform duration-700 ease-out origin-center flex items-center justify-between px-2"
            style={{
              transform: `rotate(${tiltDegrees}deg)`,
            }}
          >
            {/* Left Pan Hanging Strings & Dish */}
            <div className="relative -ml-4">
              {/* String */}
              <div className="w-0.5 h-16 bg-slate-500 mx-auto" />
              {/* Dish */}
              <div className="w-32 sm:w-36 min-h-16 bg-amber-100 border-3 border-amber-500 rounded-b-3xl shadow-lg p-2 flex flex-wrap items-center justify-center gap-1 -mt-1">
                {Array.from({ length: activeQ.leftPan.count }).map((_, i) => (
                  <span
                    key={i}
                    className="text-2xl sm:text-3xl filter drop-shadow transform hover:scale-110 transition-transform"
                    title={activeQ.leftPan.item.name}
                  >
                    {activeQ.leftPan.item.icon}
                  </span>
                ))}
              </div>
              <div className="text-center mt-1 text-[10px] font-black text-slate-700 bg-white/80 rounded-full px-2 py-0.5 shadow-2xs">
                {activeQ.leftPan.item.name} ({activeQ.leftPan.count})
              </div>
            </div>

            {/* Right Pan Hanging Strings & Dish */}
            <div className="relative -mr-4">
              {/* String */}
              <div className="w-0.5 h-16 bg-slate-500 mx-auto" />
              {/* Dish */}
              <div className="w-32 sm:w-36 min-h-16 bg-amber-100 border-3 border-amber-500 rounded-b-3xl shadow-lg p-2 flex flex-wrap items-center justify-center gap-1 -mt-1">
                {Array.from({ length: activeQ.rightPan.count }).map((_, i) => (
                  <span
                    key={i}
                    className="text-2xl sm:text-3xl filter drop-shadow transform hover:scale-110 transition-transform"
                    title={activeQ.rightPan.item.name}
                  >
                    {activeQ.rightPan.item.icon}
                  </span>
                ))}
              </div>
              <div className="text-center mt-1 text-[10px] font-black text-slate-700 bg-white/80 rounded-full px-2 py-0.5 shadow-2xs">
                {activeQ.rightPan.item.name} ({activeQ.rightPan.count})
              </div>
            </div>
          </div>
        </div>

        {/* Explanation text on correct */}
        {isCorrect && (
          <div className="w-full max-w-lg bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-3 text-xs sm:text-sm font-bold text-emerald-900 flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{activeQ.explanation}</span>
            </div>
            <button
              type="button"
              onClick={() => speakText(activeQ.explanation, 'th', soundVolume)}
              className="p-1.5 bg-emerald-500 text-white rounded-xl shrink-0"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Answer Choice Buttons */}
        <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {activeQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isThisCorrect = opt.id === correctAnswerId;

            return (
              <div
                key={opt.id}
                onClick={() => !isCorrect && handleSelectOption(opt.id)}
                className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm relative group ${
                  isSelected
                    ? isThisCorrect
                      ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300'
                      : 'bg-rose-100 border-rose-400 ring-2 ring-rose-200'
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
              >
                {/* Speaker Button to listen to option label */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(opt.label, 'th', soundVolume);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-700 hover:text-indigo-600 shadow-xs transition-colors"
                  title={`ฟังเสียง ${opt.label}`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>

                <span className="text-3xl">{opt.icon}</span>
                <span className="text-xs sm:text-sm font-black text-slate-800 text-center">
                  {opt.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Next Question Button */}
        {isCorrect && (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer animate-bounce mt-1"
          >
            <span>ไปข้อถัดไป</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
