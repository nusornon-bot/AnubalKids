import React, { useState, useEffect, useMemo } from 'react';
import { Grade } from '../../types';
import { SOCIAL_MANNERS_GAMES, SocialScenarioQuestion } from '../../data/extraDevelopmentalGames';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import { soundEffects, speakText } from '../../services/audioService';
import { triggerRoundSuccessConfetti } from '../../utils/confettiCelebration';
import {
  Users,
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  Heart,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface SocialMannersViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

export const SocialMannersView: React.FC<SocialMannersViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'all' | Grade>('all');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Default to ALL 20+ scenarios so children have full access to all 22 situations
  const availableScenarios = useMemo(() => {
    if (selectedGradeFilter === 'all') {
      return SOCIAL_MANNERS_GAMES;
    }
    const filtered = SOCIAL_MANNERS_GAMES.filter((g) => g.grade === selectedGradeFilter);
    return filtered.length > 0 ? filtered : SOCIAL_MANNERS_GAMES;
  }, [selectedGradeFilter]);

  const activeQ: SocialScenarioQuestion =
    availableScenarios[currentLevelIndex] || availableScenarios[0] || SOCIAL_MANNERS_GAMES[0];

  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);

    if (soundVolume > 0) {
      speakText(`${activeQ.situationContext} ${activeQ.voicePrompt}`, 'th', soundVolume);
    }
  }, [currentLevelIndex, activeQ.id, soundVolume]);

  const handleSelectOption = (option: { id: string; text: string; isCorrect: boolean; feedback: string }) => {
    if (isAnswered) return;

    setSelectedOptionId(option.id);
    setIsAnswered(true);
    setIsCorrect(option.isCorrect);

    if (option.isCorrect) {
      soundEffects.playVictory(soundVolume);
      if (onEarnStar) onEarnStar();
      triggerRoundSuccessConfetti({
        starCount: 3,
        isPerfect: true,
        origin: { x: 0.5, y: 0.5 },
      });
      speakText(option.feedback, 'th', soundVolume);
    } else {
      soundEffects.playIncorrect(soundVolume);
      speakText(option.feedback, 'th', soundVolume);
    }
  };

  const handleRetry = () => {
    soundEffects.playTap(soundVolume);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleNext = () => {
    soundEffects.playTap(soundVolume);
    if (currentLevelIndex < availableScenarios.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      setCurrentLevelIndex(0);
    }
  };

  const selectedOpt = activeQ.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
      {/* Grade / View Filter Pills */}
      <div className="w-full flex items-center justify-between flex-wrap gap-2 px-2">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-bold text-slate-600">ตัวกรองระดับชั้น:</span>
          {(
            [
              { key: 'all', label: `ทั้งหมด (${SOCIAL_MANNERS_GAMES.length} สถานการณ์)` },
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
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-black text-violet-800 bg-violet-100 px-3 py-1 rounded-full border border-violet-300">
          ครบ {SOCIAL_MANNERS_GAMES.length} สถานการณ์มารยาทดี 🤝
        </span>
      </div>

      {/* Responsive Level Selector for 20+ Scenarios */}
      <SkillGameLevelSelector
        totalLevels={availableScenarios.length}
        currentIndex={currentLevelIndex}
        onSelectLevel={(idx) => {
          soundEffects.playTap(soundVolume);
          setCurrentLevelIndex(idx);
        }}
        prefix="สถานการณ์ที่"
        colorTheme="violet"
        badgeSubtitle={activeQ.socialVirtue}
      />

      {/* Main Social Scenario Card */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-7 border-3 border-violet-200 shadow-md flex flex-col items-center gap-5">
        {/* Scenario Header */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-b border-violet-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-tr from-violet-500 to-purple-600 text-white text-3xl sm:text-4xl flex items-center justify-center shadow-md">
              🤝
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800 border border-violet-300">
                  {activeQ.socialVirtue}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  ทักษะทางสังคมและน้ำใจ
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 mt-1">
                {activeQ.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => speakText(`${activeQ.situationContext} ${activeQ.voicePrompt}`, 'th', soundVolume)}
            className="p-2.5 rounded-2xl bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-300 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="ฟังเสียงโจทย์"
          >
            <Volume2 className="w-4 h-4" />
            <span>ฟังเสียงโจทย์</span>
          </button>
        </div>

        {/* Situation Display Box */}
        <div className="w-full bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 border-2 border-violet-200 rounded-3xl p-5 text-center flex flex-col items-center gap-2 shadow-xs">
          <span className="text-5xl select-none mb-1">{activeQ.situationEmoji}</span>
          <p className="text-sm sm:text-base font-bold text-slate-700 max-w-xl">
            {activeQ.situationContext}
          </p>
          <div className="w-full max-w-md bg-white/90 border border-violet-300 rounded-2xl p-3 text-xs sm:text-sm font-black text-violet-900 mt-1 shadow-2xs">
            ❓ {activeQ.questionPrompt}
          </div>
        </div>

        {/* Options List */}
        <div className="w-full max-w-2xl flex flex-col gap-3">
          {activeQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const showCorrect = isAnswered && opt.isCorrect;
            const showWrong = isAnswered && isSelected && !opt.isCorrect;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-2xl border-2 font-bold text-xs sm:text-sm text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  showCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-3 ring-emerald-200 shadow-md scale-101'
                    : showWrong
                    ? 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200'
                    : isSelected
                    ? 'bg-violet-100 border-violet-500 text-violet-950'
                    : 'bg-white hover:bg-violet-50/60 border-slate-200 text-slate-800 hover:border-violet-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl flex-shrink-0">{opt.emoji}</span>
                  <span className="font-black text-sm">{opt.text}</span>
                </div>

                <div className="flex-shrink-0">
                  {showCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                  {showWrong && <XCircle className="w-6 h-6 text-rose-500" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Answer Feedback Banner */}
        {isAnswered && selectedOpt && (
          <div
            className={`w-full max-w-2xl rounded-2xl p-4 border-2 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <span className="text-2xl">{isCorrect ? '🌟' : '💡'}</span>
              <p className="text-xs sm:text-sm font-black">{selectedOpt.feedback}</p>
            </div>

            <div className="flex items-center gap-2">
              {!isCorrect && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-black text-xs border border-slate-300 transition-all active:scale-95"
                >
                  ลองเลือกใหม่
                </button>
              )}
              {isCorrect && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>สถานการณ์ถัดไป</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
