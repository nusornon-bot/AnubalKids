import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Shuffle,
  Play,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { FunFact, FUN_FACTS, getRandomFunFact } from '../data/funFacts';
import { Language, VoicePersona } from '../types';
import { speakText, soundEffects } from '../services/audioService';

interface FunFactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: () => void;
  targetContext?: 'quiz' | 'skill_games' | 'general';
  language?: Language;
  voicePersona?: VoicePersona;
  soundVolume?: number;
  autoSpeak?: boolean;
}

/**
 * Generate full narrated speech including title, fact, and "ชวนคิดต่อ" question
 */
const getFullFactSpeechText = (fact: FunFact, lang: Language): string => {
  const title = fact.title[lang] || fact.title.th;
  const factText = fact.fact[lang] || fact.fact.th;
  const curiosityIntro = lang === 'en' ? 'Think and wonder' : 'ชวนคิดต่อ';
  const curiosityText = fact.curiosityQuestion[lang] || fact.curiosityQuestion.th;
  return `${title} ... ${factText} ... ${curiosityIntro}: ${curiosityText}`;
};

export const FunFactModal: React.FC<FunFactModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
  targetContext = 'quiz',
  language = 'th',
  voicePersona = 'adult_female',
  soundVolume = 0.8,
  autoSpeak = true,
}) => {
  const [currentFact, setCurrentFact] = useState<FunFact>(() => getRandomFunFact());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingSection, setSpeakingSection] = useState<'all' | 'curiosity' | null>(null);
  const [timeLeft, setTimeLeft] = useState(10); // 10s auto countdown
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safeLang: Language = (language || 'th') as Language;
  const safePersona: VoicePersona = (voicePersona || 'adult_female') as VoicePersona;

  const stopAllSpeech = useCallback(() => {
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    try {
      window.speechSynthesis?.cancel();
    } catch {
      // ignore
    }
    setIsSpeaking(false);
    setSpeakingSection(null);
  }, []);

  const speakFact = useCallback((text: string, section: 'all' | 'curiosity' = 'all') => {
    setIsSpeaking(true);
    setSpeakingSection(section);
    speakText(text, safeLang, safePersona, soundVolume);

    // Rough estimate of speech duration to stop pulse indicator
    const wordCount = text.length;
    const duration = Math.max(3500, wordCount * 120);

    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
    }
    speechTimerRef.current = setTimeout(() => {
      setIsSpeaking(false);
      setSpeakingSection(null);
    }, duration);
  }, [safeLang, safePersona, soundVolume]);

  // When modal opens, pick a fresh random fun fact and reset countdown
  useEffect(() => {
    if (isOpen) {
      const fact = getRandomFunFact();
      setCurrentFact(fact);
      setTimeLeft(10);
      setIsPaused(false);

      // Play soft joyful bell sound
      try {
        soundEffects.playSuccess(soundVolume * 0.5);
      } catch {
        // audio fallback
      }

      // Voice narration if autoSpeak is enabled (reads title + fact + ชวนคิดต่อ)
      if (autoSpeak) {
        speakFact(getFullFactSpeechText(fact, safeLang), 'all');
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      stopAllSpeech();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Gentle auto-countdown timer (10s) to not block young learners
  useEffect(() => {
    if (!isOpen || isPaused) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleStart();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isPaused]);

  const handleReadAloud = () => {
    setIsPaused(true);
    speakFact(getFullFactSpeechText(currentFact, safeLang), 'all');
  };

  const handleReadCuriosityOnly = () => {
    setIsPaused(true);
    const curiosityIntro = safeLang === 'en' ? 'Think and wonder' : 'ชวนคิดต่อ';
    const curiosityText = currentFact.curiosityQuestion[safeLang] || currentFact.curiosityQuestion.th;
    speakFact(`${curiosityIntro}: ${curiosityText}`, 'curiosity');
  };

  const currentIndex = FUN_FACTS.findIndex((f) => f.id === currentFact.id);
  const totalFacts = FUN_FACTS.length;

  const handlePrevFact = () => {
    setIsPaused(true);
    try {
      soundEffects.playTap(soundVolume);
    } catch {
      // ignore
    }
    const prevIdx = currentIndex <= 0 ? totalFacts - 1 : currentIndex - 1;
    const nextFact = FUN_FACTS[prevIdx];
    setCurrentFact(nextFact);
    if (autoSpeak) {
      speakFact(getFullFactSpeechText(nextFact, safeLang), 'all');
    }
  };

  const handleNextFact = () => {
    setIsPaused(true);
    try {
      soundEffects.playTap(soundVolume);
    } catch {
      // ignore
    }
    const nextIdx = (currentIndex + 1) % totalFacts;
    const nextFact = FUN_FACTS[nextIdx];
    setCurrentFact(nextFact);
    if (autoSpeak) {
      speakFact(getFullFactSpeechText(nextFact, safeLang), 'all');
    }
  };

  const handleShuffle = () => {
    setIsPaused(true);
    try {
      soundEffects.playTap(soundVolume);
    } catch {
      // ignore
    }
    const nextFact = getRandomFunFact(currentFact.id);
    setCurrentFact(nextFact);
    if (autoSpeak) {
      speakFact(getFullFactSpeechText(nextFact, safeLang), 'all');
    }
  };

  const handleStart = useCallback(() => {
    stopAllSpeech();
    try {
      soundEffects.playTap(soundVolume);
    } catch {
      // ignore
    }
    onClose();
    onStartGame();
  }, [onClose, onStartGame, soundVolume, stopAllSpeech]);

  if (!isOpen) return null;

  const titleText = currentFact.title[safeLang] || currentFact.title.th;
  const factText = currentFact.fact[safeLang] || currentFact.fact.th;
  const curiosityText = currentFact.curiosityQuestion[safeLang] || currentFact.curiosityQuestion.th;
  const categoryLabel = currentFact.categoryLabel[safeLang] || currentFact.categoryLabel.th;

  return (
    <div
      id="fun-fact-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={handleStart}
      onMouseEnter={() => setIsPaused(true)}
    >
      <div
        id="fun-fact-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
      >
        {/* Top Header Glow Bar */}
        <div
          className={`px-4 py-3 text-slate-950 flex items-center justify-between shadow-xs ${
            targetContext === 'skill_games'
              ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400'
              : 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/40 shadow-2xs text-lg">
              {targetContext === 'skill_games' ? '🎮' : '💡'}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm sm:text-base font-black font-display tracking-tight text-slate-950">
                  {targetContext === 'skill_games'
                    ? language === 'en'
                      ? 'Did You Know? (Skill Games)'
                      : 'เกร็ดความรู้ชวนคิด ก่อนเลือกเกม'
                    : language === 'en'
                    ? 'Did You Know?'
                    : 'รู้หรือไม่? ชวนคิดก่อนเล่น'}
                </h3>
                <Sparkles className="w-4 h-4 text-amber-950 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <p className="text-[11px] font-semibold text-amber-950/80">
                {targetContext === 'skill_games'
                  ? language === 'en'
                    ? 'Spark curiosity before exploring 11 skill game categories!'
                    : 'จุดประกายความคิด ก่อนเข้าเลือกประเภทเกมปฐมวัย 🎮'
                  : language === 'en'
                  ? 'Fun curiosity fact for today!'
                  : 'เกร็ดความรู้แสนสนุกเพื่อหนูน้อยช่างคิด'}
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-close-fun-fact"
            onClick={(e) => {
              e.stopPropagation();
              try {
                window.speechSynthesis?.cancel();
              } catch {
                // ignore
              }
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/40 hover:bg-white/60 text-slate-950 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
            title={language === 'en' ? 'Close' : 'ปิด'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-3.5 bg-gradient-to-b from-amber-50/40 via-white to-orange-50/30">
          {/* Skill Games Hub Context Pill */}
          {targetContext === 'skill_games' && (
            <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 border border-purple-200 text-purple-950 px-3 py-1.5 rounded-xl text-xs font-black flex items-center justify-between shadow-2xs">
              <span className="flex items-center gap-1.5">
                <span className="text-base">🧩</span>
                <span>ศูนย์เกมการศึกษา & ฝึกทักษะปฐมวัย</span>
              </span>
              <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-md font-bold">
                11 หมวดหมู่เกม
              </span>
            </div>
          )}

          {/* Category Badge, Counter & Audio Narration Button */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${currentFact.badgeColor}`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{categoryLabel}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100/80 text-amber-900 border border-amber-300">
                <BookOpen className="w-3 h-3 text-amber-700" />
                <span>{language === 'en' ? `Fact ${currentIndex >= 0 ? currentIndex + 1 : 1} of ${totalFacts}` : `เรื่องที่ ${currentIndex >= 0 ? currentIndex + 1 : 1}/${totalFacts}`}</span>
              </span>
            </div>

            {/* Read Aloud TTS Button */}
            <button
              type="button"
              id="btn-speak-fun-fact"
              onClick={handleReadAloud}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                isSpeaking
                  ? 'bg-amber-500 text-white animate-pulse shadow-sm ring-2 ring-amber-300'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
              }`}
              title="กดเพื่อฟังเสียงอ่าน"
            >
              {isSpeaking ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                  <span>กำลังเล่า...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>ฟังเสียง 🔊</span>
                </>
              )}
            </button>
          </div>

          {/* Big Mascot Icon & Title */}
          <div className="flex items-center gap-3.5 pt-1">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-amber-200 via-orange-100 to-amber-300 border-2 border-amber-300 shadow-md flex items-center justify-center text-4xl select-none shrink-0 transform hover:scale-105 transition-transform">
              {currentFact.icon}
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 font-display leading-snug">
                {titleText}
              </h4>
              <p className="text-xs text-amber-700 font-bold mt-0.5">
                ✨ {language === 'en' ? 'Tap to explore & learn' : 'สะกิดต่อมความสงสัยของคนเก่ง'}
              </p>
            </div>
          </div>

          {/* Fact Content Box */}
          <div className="bg-white/95 rounded-2xl p-4 border border-amber-200/80 shadow-xs text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
            <p className="text-slate-800 font-normal">
              {factText}
            </p>

            {/* Spark Question Box with dedicated Audio Button */}
            <div className="mt-3 pt-3 border-t border-amber-100 flex items-start justify-between gap-2.5 bg-amber-50/70 p-3 rounded-2xl text-xs sm:text-sm text-amber-950 font-bold border border-amber-200/60 shadow-2xs">
              <div className="flex items-start gap-2 flex-1">
                <span className="text-base shrink-0">🌟</span>
                <p className="leading-snug">
                  <span className="text-amber-800 font-black">{language === 'en' ? 'Think & Wonder: ' : 'ชวนคิดต่อ: '}</span>
                  {curiosityText}
                </p>
              </div>

              {/* Dedicated Speaker Button for Curiosity Question */}
              <button
                type="button"
                id="btn-speak-curiosity"
                onClick={handleReadCuriosityOnly}
                className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 ${
                  speakingSection === 'curiosity'
                    ? 'bg-amber-500 text-white animate-pulse ring-2 ring-amber-300'
                    : 'bg-amber-200/90 hover:bg-amber-300 text-amber-900'
                }`}
                title={language === 'en' ? 'Listen to wonder question' : 'ฟังเสียงคำถามชวนคิดต่อ'}
              >
                <Volume2 className={`w-3.5 h-3.5 ${speakingSection === 'curiosity' ? 'animate-bounce' : ''}`} />
                <span className="hidden xs:inline">{speakingSection === 'curiosity' ? 'กำลังอ่าน...' : 'ฟังคำถาม 🔊'}</span>
              </button>
            </div>
          </div>

          {/* Action Row with Navigation Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 pt-1">
            {/* Previous Fact */}
            <button
              type="button"
              id="btn-prev-fun-fact"
              onClick={handlePrevFact}
              className="w-10 h-11 sm:w-11 sm:h-12 flex items-center justify-center rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black border border-amber-300 active:scale-95 cursor-pointer transition-all shrink-0 shadow-2xs"
              title={language === 'en' ? 'Previous Fact' : 'เรื่องก่อนหน้า ◀'}
            >
              <ChevronLeft className="w-5 h-5 text-amber-900" />
            </button>

            {/* Shuffle button to see another fact */}
            <button
              type="button"
              id="btn-shuffle-fun-fact"
              onClick={handleShuffle}
              className="flex items-center justify-center gap-1 px-2.5 sm:px-3 h-11 sm:h-12 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs sm:text-sm border border-amber-300 active:scale-95 cursor-pointer transition-all shrink-0 shadow-2xs"
              title="สุ่มเรื่องน่ารู้อื่นๆ"
            >
              <Shuffle className="w-4 h-4 text-amber-800 shrink-0" />
              <span className="hidden xs:inline">{language === 'en' ? 'Shuffle' : 'สุ่ม 🎲'}</span>
            </button>

            {/* Next Fact */}
            <button
              type="button"
              id="btn-next-fun-fact"
              onClick={handleNextFact}
              className="w-10 h-11 sm:w-11 sm:h-12 flex items-center justify-center rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black border border-amber-300 active:scale-95 cursor-pointer transition-all shrink-0 shadow-2xs"
              title={language === 'en' ? 'Next Fact' : 'เรื่องถัดไป ▶'}
            >
              <ChevronRight className="w-5 h-5 text-amber-900" />
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              id="btn-confirm-start-game"
              onClick={handleStart}
              className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 h-11 sm:h-12 rounded-2xl text-white font-black text-xs sm:text-sm md:text-base shadow-lg border-b-4 active:translate-y-1 active:border-b-0 cursor-pointer transition-all ${
                targetContext === 'skill_games'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-purple-850'
                  : targetContext === 'general'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 border-amber-700'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 border-emerald-700'
              }`}
            >
              {targetContext === 'skill_games' ? (
                <>
                  <span className="text-lg">🎮</span>
                  <span>{language === 'en' ? 'Ready, Choose Games! 🎮' : 'พร้อมแล้ว ไปเลือกประเภทเกมกันเลย! 🎮'}</span>
                </>
              ) : targetContext === 'general' ? (
                <>
                  <span>⭐</span>
                  <span>{language === 'en' ? 'Got It! ✨' : 'เข้าใจแล้ว ขอบคุณครับ/ค่ะ ⭐'}</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-white" />
                  <span>{language === 'en' ? 'Ready, Let’s Play! 🚀' : 'พร้อมแล้ว ลุยเลย! 🚀'}</span>
                </>
              )}
            </button>
          </div>

          {/* Auto-countdown bar indicator */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-semibold px-1">
            <span className="flex items-center gap-1 text-slate-400">
              <span>
                {isPaused
                  ? '⏸️ หยุดนับถอยหลัง'
                  : targetContext === 'skill_games'
                  ? `⏱️ เข้าสู่เกมใน ${timeLeft} วิ`
                  : targetContext === 'general'
                  ? `⏱️ ปิดอัตโนมัติใน ${timeLeft} วิ`
                  : `⏱️ เริ่มอัตโนมัติใน ${timeLeft} วิ`}
              </span>
            </span>
            <span className={targetContext === 'skill_games' ? 'text-purple-700 font-bold' : 'text-emerald-700 font-bold'}>
              {language === 'en' ? 'Click anywhere or button' : 'กดปุ่มเพื่อเริ่มทันที'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
