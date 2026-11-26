import React, { useState, useEffect, useMemo } from 'react';
import { Grade } from '../../types';
import { BRAIN_FLEX_GAMES, BrainFlexChallenge } from '../../data/extraDevelopmentalGames';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  Brain,
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  Zap,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface BrainFlexViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

export const BrainFlexView: React.FC<BrainFlexViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'all' | Grade>('all');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLevelFinished, setIsLevelFinished] = useState(false);

  // Default to ALL 20+ challenges so children have full access to all 23 missions
  const availableChallenges = useMemo(() => {
    if (selectedGradeFilter === 'all') {
      return BRAIN_FLEX_GAMES;
    }
    const filtered = BRAIN_FLEX_GAMES.filter((g) => g.grade === selectedGradeFilter);
    return filtered.length > 0 ? filtered : BRAIN_FLEX_GAMES;
  }, [selectedGradeFilter]);

  const activeChallenge: BrainFlexChallenge =
    availableChallenges[currentLevelIndex] || availableChallenges[0] || BRAIN_FLEX_GAMES[0];

  const currentRound = activeChallenge.rounds[currentRoundIdx] || activeChallenge.rounds[0];

  useEffect(() => {
    setCurrentRoundIdx(0);
    setSelectedChoiceId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setIsLevelFinished(false);

    if (soundVolume > 0) {
      speakText(`${activeChallenge.title} ${activeChallenge.voiceGuide}`, 'th', soundVolume);
    }
  }, [currentLevelIndex, activeChallenge.id, soundVolume]);

  const handleSelectChoice = (choiceId: string) => {
    if (isAnswered) return;

    setSelectedChoiceId(choiceId);
    setIsAnswered(true);
    const correct = choiceId === currentRound.correctAnswerId;
    setIsCorrect(correct);

    if (correct) {
      soundEffects.playVictory(soundVolume);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      speakText(currentRound.explanation, 'th', soundVolume);

      // Check if all rounds in this challenge are completed
      if (currentRoundIdx + 1 >= activeChallenge.rounds.length) {
        setIsLevelFinished(true);
        if (onEarnStar) onEarnStar();
      }
    } else {
      soundEffects.playIncorrect(soundVolume);
      speakText('เอ๊ะ... กฎบอกว่าอย่างไรนะจ๊ะ ลองคิดอีกทีนะ!', 'th', soundVolume);
    }
  };

  const handleNextRound = () => {
    soundEffects.playTap(soundVolume);
    setSelectedChoiceId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setCurrentRoundIdx((prev) => prev + 1);
  };

  const handleNextLevel = () => {
    soundEffects.playTap(soundVolume);
    if (currentLevelIndex < availableChallenges.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      setCurrentLevelIndex(0);
    }
  };

  const handleRetryRound = () => {
    soundEffects.playTap(soundVolume);
    setSelectedChoiceId(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
      {/* Grade / View Filter Pills */}
      <div className="w-full flex items-center justify-between flex-wrap gap-2 px-2">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-bold text-slate-600">ตัวกรองระดับชั้น:</span>
          {(
            [
              { key: 'all', label: `ทั้งหมด (${BRAIN_FLEX_GAMES.length} ภารกิจ)` },
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
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-black text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full border border-cyan-300">
          ครบ {BRAIN_FLEX_GAMES.length} ภารกิจยืดหยุ่นความคิด EF 🧠
        </span>
      </div>

      {/* Responsive Level Selector for 20+ Challenges */}
      <SkillGameLevelSelector
        totalLevels={availableChallenges.length}
        currentIndex={currentLevelIndex}
        onSelectLevel={(idx) => {
          soundEffects.playTap(soundVolume);
          setCurrentLevelIndex(idx);
        }}
        prefix="ภารกิจที่"
        colorTheme="cyan"
        badgeSubtitle={activeChallenge.efDomain.split(' ')[0]}
      />

      {/* Main Challenge Card */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-7 border-3 border-cyan-200 shadow-md flex flex-col items-center gap-5">
        {/* Title & Domain Header */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-b border-cyan-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-tr from-cyan-500 to-teal-600 text-white text-3xl sm:text-4xl flex items-center justify-center shadow-md animate-pulse">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-300">
                  {activeChallenge.efDomain}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  รอบ {currentRoundIdx + 1}/{activeChallenge.rounds.length}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 mt-1">
                {activeChallenge.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => speakText(`${activeChallenge.ruleDescription} ${currentRound.promptText}`, 'th', soundVolume)}
            className="p-2.5 rounded-2xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-300 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="ฟังเสียงกติกา"
          >
            <Volume2 className="w-4 h-4" />
            <span>ฟังกติกา 🔊</span>
          </button>
        </div>

        {/* Rule Explanation Banner */}
        <div className="w-full bg-cyan-50/80 border-2 border-cyan-300 rounded-2xl p-3.5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-black text-cyan-900 mb-1">
            <Zap className="w-4 h-4 text-cyan-600" />
            <span>กติกาสำคัญ:</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800">
            {activeChallenge.ruleDescription}
          </p>
        </div>

        {/* Round Challenge Presentation */}
        <div className="w-full bg-gradient-to-b from-sky-50 to-indigo-50/50 border-2 border-indigo-200 rounded-3xl p-6 text-center flex flex-col items-center gap-3 shadow-inner">
          <div className="text-6xl sm:text-7xl select-none filter drop-shadow-md">
            {currentRound.promptEmoji}
          </div>
          <h3 className="text-sm sm:text-base font-black text-indigo-950 max-w-md">
            {currentRound.promptText}
          </h3>
        </div>

        {/* Choice Buttons Grid */}
        <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentRound.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            const isAnswerCorrect = choice.id === currentRound.correctAnswerId;
            const showSuccess = isAnswered && isAnswerCorrect;
            const showFail = isAnswered && isSelected && !isAnswerCorrect;

            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => handleSelectChoice(choice.id)}
                disabled={isAnswered}
                className={`p-4 rounded-2xl border-2 font-black text-sm flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  showSuccess
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-200 scale-102 shadow-md'
                    : showFail
                    ? 'bg-rose-100 border-rose-400 text-rose-950 ring-2 ring-rose-200'
                    : isSelected
                    ? 'bg-cyan-100 border-cyan-500 text-cyan-950'
                    : 'bg-white hover:bg-cyan-50 border-slate-200 text-slate-800 hover:border-cyan-300 shadow-2xs active:scale-95'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{choice.emoji}</span>
                  <span>{choice.text}</span>
                </div>

                <div>
                  {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  {showFail && <XCircle className="w-5 h-5 text-rose-500" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback & Navigation Actions */}
        {isAnswered && (
          <div
            className={`w-full max-w-lg rounded-2xl p-4 border-2 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="text-2xl">{isCorrect ? '🎉' : '🤔'}</span>
              <p className="text-xs sm:text-sm font-black">{currentRound.explanation}</p>
            </div>

            <div className="flex items-center gap-2">
              {!isCorrect && (
                <button
                  type="button"
                  onClick={handleRetryRound}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-black text-xs border border-slate-300 transition-all active:scale-95"
                >
                  ลองใหม่
                </button>
              )}

              {isCorrect && !isLevelFinished && (
                <button
                  type="button"
                  onClick={handleNextRound}
                  className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>รอบต่อไป</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* All Rounds Finished Banner */}
        {isLevelFinished && (
          <div className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                🌟
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black leading-tight">
                  ทักษะสมอง EF แข็งแกร่งมาก!
                </h3>
                <p className="text-xs text-cyan-100 font-bold mt-0.5">
                  ผ่านภารกิจ "{activeChallenge.title}" สำเร็จครบทุกรอบ ได้รับ 1 ดาวสะสม!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextLevel}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>ภารกิจถัดไป</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
