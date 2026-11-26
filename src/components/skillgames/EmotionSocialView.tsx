import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grade } from '../../types';
import {
  EMOTIONS_LIST,
  EmotionCard,
  SOCIAL_SCENARIOS,
  SocialScenario,
} from '../../data/skillGamesDataNew';
import { soundEffects, speakText } from '../../services/audioService';
import { triggerRoundSuccessConfetti } from '../../utils/confettiCelebration';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import {
  Heart,
  Smile,
  Users,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Volume2,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Home,
} from 'lucide-react';

interface EmotionSocialViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
  onExit?: () => void;
}

export const EmotionSocialView: React.FC<EmotionSocialViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
  onExit,
}) => {
  const [subMode, setSubMode] = useState<'emotion_quiz' | 'social_scenario'>('emotion_quiz');

  // --- Sub-Mode 1: 10 Emotion Recognition Questions ---
  const [emotionIndex, setEmotionIndex] = useState(0);
  const currentEmotionTarget: EmotionCard = EMOTIONS_LIST[emotionIndex] || EMOTIONS_LIST[0];
  const [selectedEmotionId, setSelectedEmotionId] = useState<string | null>(null);
  const [isEmotionCorrect, setIsEmotionCorrect] = useState(false);

  // 3.1 สลับตำแหน่งภาพการ์ดอารมณ์เมื่อเปลี่ยนข้อ
  const shuffledEmotionCards = useMemo(() => {
    const list = [...EMOTIONS_LIST];
    let seed = (emotionIndex + 1) * 7919;
    for (let i = list.length - 1; i > 0; i--) {
      const r = ((Math.abs(Math.sin(seed++)) * 10000) % 1);
      const j = Math.floor(r * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [emotionIndex]);

  // --- Sub-Mode 2: Social Scenarios ---
  const availableScenarios = useMemo(() => {
    return SOCIAL_SCENARIOS;
  }, []);

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const activeScenario: SocialScenario =
    availableScenarios[currentScenarioIndex] ||
    availableScenarios[0] ||
    SOCIAL_SCENARIOS[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [scenarioFeedback, setScenarioFeedback] = useState<string | null>(null);
  const [isScenarioResolved, setIsScenarioResolved] = useState(false);

  // Setup prompt audio when changing emotion question
  useEffect(() => {
    if (subMode === 'emotion_quiz') {
      setSelectedEmotionId(null);
      setIsEmotionCorrect(false);
      speakText(`ข้อที่ ${emotionIndex + 1} ใบหน้านี้กำลังแสดงอารมณ์ความรู้สึกใดเอ่ย?`, 'th', soundVolume);
    }
  }, [subMode, emotionIndex, soundVolume]);

  // Setup prompt audio when changing scenario
  useEffect(() => {
    if (subMode === 'social_scenario') {
      setSelectedOptionId(null);
      setScenarioFeedback(null);
      setIsScenarioResolved(false);
      speakText(
        `เรื่องที่ ${currentScenarioIndex + 1}: ${activeScenario.story} ${activeScenario.questionPrompt}`,
        'th',
        soundVolume
      );
    }
  }, [subMode, currentScenarioIndex, activeScenario, soundVolume]);

  const handleSelectEmotion = (card: EmotionCard) => {
    if (isEmotionCorrect) return;
    soundEffects.playTap(soundVolume);
    setSelectedEmotionId(card.id);

    if (card.id === currentEmotionTarget.id) {
      setIsEmotionCorrect(true);
      soundEffects.playSuccess(soundVolume);
      triggerRoundSuccessConfetti({
        starCount: 3,
        isPerfect: true,
        origin: { x: 0.5, y: 0.55 },
      });
      speakText(
        `ถูกต้องแล้วจ้ะ! ${card.name} ${card.description}`,
        'th',
        soundVolume
      );
      if (onEarnStar) onEarnStar();
    } else {
      soundEffects.playIncorrect(soundVolume);
      speakText(`ยังไม่ใช่จ้ะ สังเกตรอยยิ้ม แววตา หรือลองฟังเสียงตัวเลือกอื่นดูนะ`, 'th', soundVolume);
    }
  };

  const handleNextEmotion = () => {
    soundEffects.playTap(soundVolume);
    if (emotionIndex < EMOTIONS_LIST.length - 1) {
      setEmotionIndex((prev) => prev + 1);
    } else {
      setEmotionIndex(0);
    }
  };

  const handlePrevEmotion = () => {
    soundEffects.playTap(soundVolume);
    if (emotionIndex > 0) {
      setEmotionIndex((prev) => prev - 1);
    } else {
      setEmotionIndex(EMOTIONS_LIST.length - 1);
    }
  };

  const handleSelectScenarioOption = (opt: SocialScenario['options'][0]) => {
    if (isScenarioResolved) return;
    soundEffects.playTap(soundVolume);
    setSelectedOptionId(opt.id);
    setScenarioFeedback(opt.feedback);

    if (opt.isProsocial) {
      setIsScenarioResolved(true);
      soundEffects.playVictory(soundVolume);
      triggerRoundSuccessConfetti({
        starCount: 3,
        isPerfect: true,
        origin: { x: 0.5, y: 0.55 },
      });
      speakText(opt.feedback, 'th', soundVolume);
      if (onEarnStar) onEarnStar();
    } else {
      soundEffects.playIncorrect(soundVolume);
      speakText(opt.feedback, 'th', soundVolume);
    }
  };

  const handleNextScenario = () => {
    soundEffects.playTap(soundVolume);
    if (currentScenarioIndex < availableScenarios.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
    } else {
      setCurrentScenarioIndex(0);
    }
  };

  const handlePrevScenario = () => {
    soundEffects.playTap(soundVolume);
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex((prev) => prev - 1);
    } else {
      setCurrentScenarioIndex(availableScenarios.length - 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
      {/* 1. Header with Sub-Mode Switcher and 10 Question Selector Buttons */}
      <div className="w-full bg-white rounded-3xl p-3 sm:p-4 border-3 border-pink-200 shadow-md flex flex-wrap items-center justify-between gap-3">
        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setSubMode('emotion_quiz');
            }}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              subMode === 'emotion_quiz'
                ? 'bg-pink-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-pink-50'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>1. ทายอารมณ์ ({EMOTIONS_LIST.length} ข้อ)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setSubMode('social_scenario');
            }}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              subMode === 'social_scenario'
                ? 'bg-pink-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-pink-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2. สถานการณ์น้ำใจ ({availableScenarios.length} ข้อ)</span>
          </button>
        </div>
      </div>

      {/* Responsive Question Selector for Mobile & Tablet */}
      <SkillGameLevelSelector
        totalLevels={subMode === 'emotion_quiz' ? EMOTIONS_LIST.length : availableScenarios.length}
        currentIndex={subMode === 'emotion_quiz' ? emotionIndex : currentScenarioIndex}
        onSelectLevel={(idx) => {
          soundEffects.playTap(soundVolume);
          if (subMode === 'emotion_quiz') {
            setEmotionIndex(idx);
          } else {
            setCurrentScenarioIndex(idx);
          }
        }}
        prefix="ข้อ"
        colorTheme="pink"
        badgeSubtitle={subMode === 'emotion_quiz' ? 'ทายอารมณ์ความรู้สึก' : 'สถานการณ์จำลองน้ำใจ'}
      />

      {/* ========================================= */}
      {/* SUB-MODE 1: 10 EMOTION QUIZ QUESTIONS     */}
      {/* ========================================= */}
      {subMode === 'emotion_quiz' && (
        <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border-3 border-pink-200 shadow-md flex flex-col items-center gap-5">
          <div className="text-center">
            <span className="px-3.5 py-1 bg-pink-100 text-pink-900 font-black text-xs rounded-full">
              ข้อ {emotionIndex + 1} จาก {EMOTIONS_LIST.length}: ทายอารมณ์ความรู้สึก
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-800 flex items-center justify-center gap-2 mt-2">
              <span>ใบหน้านี้กำลังรู้สึกอย่างไรเอ่ย?</span>
              <button
                type="button"
                onClick={() =>
                  speakText(
                    `ข้อที่ ${emotionIndex + 1} ใบหน้านี้กำลังแสดงอารมณ์ความรู้สึกใดเอ่ย?`,
                    'th',
                    soundVolume
                  )
                }
                className="p-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-xl"
                title="ฟังเสียงคำถาม"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </h2>
            <p className="text-xs text-slate-500 font-bold mt-0.5">
              สังเกตรอยยิ้ม แววตา หรือกดปุ่ม 🔊 เพื่อฟังเสียงอ่านของแต่ละตัวเลือกได้จ้ะ
            </p>
          </div>

          {/* Big Target Face Card */}
          <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-3xl bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-100 border-4 border-pink-300 shadow-xl flex flex-col items-center justify-center p-3 animate-in zoom-in-95 duration-300">
            <span className="text-7xl sm:text-8xl filter drop-shadow-md select-none">
              {currentEmotionTarget.emoji}
            </span>
            {isEmotionCorrect && (
              <span className="mt-2 px-3 py-1 bg-emerald-500 text-white font-black text-xs rounded-full shadow-xs animate-bounce">
                {currentEmotionTarget.name}
              </span>
            )}
          </div>

          {/* Correct feedback with description */}
          {isEmotionCorrect && (
            <div className="w-full max-w-lg bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-3 text-center text-xs sm:text-sm font-bold text-emerald-900 flex items-center justify-between gap-2 animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{currentEmotionTarget.description}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  speakText(
                    `${currentEmotionTarget.name}: ${currentEmotionTarget.description}`,
                    'th',
                    soundVolume
                  )
                }
                className="p-1.5 bg-emerald-500 text-white rounded-xl shrink-0 hover:bg-emerald-600 cursor-pointer"
                title="ฟังคำอธิบาย"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Emotion Cards Options Grid with Sound Speaker on EACH option */}
          <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {shuffledEmotionCards.map((emo) => {
              const isSelected = selectedEmotionId === emo.id;
              const isThisCorrect = emo.id === currentEmotionTarget.id;

              return (
                <div
                  key={emo.id}
                  onClick={() => handleSelectEmotion(emo)}
                  className={`p-3 rounded-2xl border-3 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative group ${emo.color} ${
                    isSelected
                      ? isThisCorrect
                        ? 'border-emerald-500 ring-4 ring-emerald-300 scale-105'
                        : 'border-rose-400 ring-2 ring-rose-200'
                      : 'border-slate-200 hover:border-pink-300'
                  }`}
                >
                  {/* Speaker Button on the Option */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(`${emo.name} ${emo.description}`, 'th', soundVolume);
                    }}
                    className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-white/80 hover:bg-white text-slate-700 hover:text-pink-600 shadow-xs transition-colors"
                    title={`ฟังเสียง ${emo.name}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-3xl sm:text-4xl">{emo.emoji}</span>
                  <span className="text-xs font-black text-center px-1 leading-tight">{emo.name}</span>
                </div>
              );
            })}
          </div>

          {/* Navigation & Next Button */}
          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={handlePrevEmotion}
              className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>ข้อก่อนหน้า</span>
            </button>

            <button
              type="button"
              onClick={handleNextEmotion}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>ข้อถัดไป</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* SUB-MODE 2: 10 SOCIAL SCENARIOS           */}
      {/* ========================================= */}
      {subMode === 'social_scenario' && (
        <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border-3 border-pink-200 shadow-md flex flex-col items-center gap-5">
          <div className="text-center">
            <span className="px-3.5 py-1 bg-pink-100 text-pink-900 font-black text-xs rounded-full">
              เรื่องที่ {currentScenarioIndex + 1} จาก {availableScenarios.length}: {activeScenario.title}
            </span>
          </div>

          {/* Illustrated Story Box */}
          <div className="w-full max-w-lg bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 rounded-3xl border-2 border-pink-200 p-5 flex flex-col items-center gap-3 shadow-inner">
            <span className="text-5xl sm:text-6xl filter drop-shadow">
              {activeScenario.illustration}
            </span>

            <p className="text-sm sm:text-base font-black text-slate-800 text-center leading-relaxed">
              "{activeScenario.story}"
            </p>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-pink-700 bg-white/90 px-3.5 py-1.5 rounded-2xl border border-pink-200">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>{activeScenario.questionPrompt}</span>
              <button
                type="button"
                onClick={() =>
                  speakText(
                    `${activeScenario.story} ${activeScenario.questionPrompt}`,
                    'th',
                    soundVolume
                  )
                }
                className="p-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                title="ฟังเสียงสถานการณ์"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Feedback message banner */}
          {scenarioFeedback && (
            <div
              className={`w-full max-w-lg p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold flex items-center justify-between gap-2 animate-in fade-in ${
                isScenarioResolved
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  : 'bg-amber-50 border-amber-400 text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {isScenarioResolved ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <span>{scenarioFeedback}</span>
              </div>
              <button
                type="button"
                onClick={() => speakText(scenarioFeedback, 'th', soundVolume)}
                className="p-1.5 bg-white/80 hover:bg-white text-slate-700 rounded-xl shrink-0"
                title="ฟังคำอธิบาย"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Choices with Audio Speaker button on EVERY choice */}
          <div className="w-full max-w-lg flex flex-col gap-3">
            {activeScenario.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectScenarioOption(opt)}
                  className={`p-4 rounded-2xl border-3 flex items-center justify-between gap-3 text-left transition-all cursor-pointer active:scale-95 shadow-sm ${
                    isSelected
                      ? opt.isProsocial
                        ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300'
                        : 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                      : 'bg-white border-slate-200 hover:border-pink-300 hover:bg-pink-50/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl shrink-0">{opt.icon}</span>
                    <span className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
                      {opt.label}
                    </span>
                  </div>

                  {/* Speaker Button on the Scenario Option */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(opt.label, 'th', soundVolume);
                    }}
                    className="p-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 shrink-0 transition-colors shadow-xs"
                    title="ฟังเสียงตัวเลือกนี้"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Navigation & Next Button */}
          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={handlePrevScenario}
              className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>เรื่องก่อนหน้า</span>
            </button>

            <button
              type="button"
              onClick={handleNextScenario}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>เรื่องถัดไป</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Exit Button */}
      {onExit && (
        <button
          type="button"
          onClick={() => {
            soundEffects.playTap(soundVolume);
            onExit();
          }}
          className="mt-2 px-6 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm border border-slate-300 shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>ออก</span>
        </button>
      )}
    </div>
  );
};
