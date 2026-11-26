import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Grade } from '../../types';
import {
  SIMON_SAYS_CHALLENGES,
  SimonChallenge,
  SimonRuleItem,
} from '../../data/skillGamesData';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  Volume2,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Award,
  Clock,
  Timer,
} from 'lucide-react';
import { GameTimer, formatSecondsToMinutes } from './GameTimer';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';

interface RuleBasedGameViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

export const RuleBasedGameView: React.FC<RuleBasedGameViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  // Mode selection: 'simon' (คุณครูหมีสั่งว่า...) vs 'traffic' (ไฟเขียว-ไฟแดง)
  const [activeMode, setActiveMode] = useState<'simon' | 'traffic'>('simon');

  // ----------------------------------------------------
  // MODE A: SIMON SAYS (คุณครูหมีสั่งว่า...)
  // ----------------------------------------------------
  const availableChallenges = useMemo(() => {
    return SIMON_SAYS_CHALLENGES.filter((c) => c.grade === currentGrade);
  }, [currentGrade]);

  const [simonIndex, setSimonIndex] = useState(0);
  const activeChallenge: SimonChallenge =
    availableChallenges[simonIndex] || availableChallenges[0] || SIMON_SAYS_CHALLENGES[0];

  const [simonFeedback, setSimonFeedback] = useState<{
    status: 'correct' | 'wrong';
    message: string;
  } | null>(null);
  const [simonSeconds, setSimonSeconds] = useState(0);
  const [simonTimerKey, setSimonTimerKey] = useState(0);

  const setupSimon = useCallback((challenge: SimonChallenge) => {
    setSimonFeedback(null);
    setSimonSeconds(0);
    setSimonTimerKey((k) => k + 1);
    if (soundVolume > 0) {
      speakText(challenge.promptText);
    }
  }, [soundVolume]);

  useEffect(() => {
    if (activeMode === 'simon') {
      setupSimon(activeChallenge);
    }
  }, [activeMode, activeChallenge, setupSimon]);

  const handleSimonChoice = (item: SimonRuleItem) => {
    soundEffects.playTap(soundVolume);

    if (activeChallenge.teacherSays && activeChallenge.targetCondition(item)) {
      // Correct action!
      soundEffects.playSuccess(soundVolume);
      setSimonFeedback({ status: 'correct', message: activeChallenge.explanation });
      if (onEarnStar) onEarnStar();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } else {
      // Violation of rule!
      soundEffects.playIncorrect(soundVolume);
      const msg = !activeChallenge.teacherSays
        ? 'อุ๊ย! คุณครูหมีไม่ได้พูดว่า "คุณครูสั่ง" น้า ต้องอยู่นิ่งๆ หรือแตะปุ่ม "คุณครูไม่ได้สั่ง" จ้า'
        : 'ยังไม่ตรงกับเงื่อนไขที่คุณครูหมีสั่งนะจ๊ะ ลองสังเกตดีๆ จ้า';
      setSimonFeedback({ status: 'wrong', message: msg });
      speakText(msg);
    }
  };

  const handleSimonInhibit = () => {
    soundEffects.playTap(soundVolume);

    if (!activeChallenge.teacherSays) {
      // Successfully recognized that Simon didn't say!
      soundEffects.playVictory(soundVolume);
      setSimonFeedback({
        status: 'correct',
        message: 'เก่งสุดยอด! คุณครูหมีไม่ได้สั่งจริงๆ ด้วย หนูยับยั้งใจได้ยอดเยี่ยม!',
      });
      if (onEarnStar) onEarnStar();
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      speakText('เก่งสุดยอดมากเลยค่ะ มีสติและฟังคำสั่งได้อย่างแม่นยำ');
    } else {
      // Simon DID say, kid should have followed!
      soundEffects.playIncorrect(soundVolume);
      const msg = 'เอ... แต่รอบนี้คุณครูหมีสั่งจริงๆ น้า หนูต้องแตะตามคำสั่งจ้า';
      setSimonFeedback({ status: 'wrong', message: msg });
      speakText(msg);
    }
  };

  // ----------------------------------------------------
  // MODE B: TRAFFIC LIGHT REFLEX (สัญญาณไฟจราจร เขียว-เหลือง-แดง)
  // ----------------------------------------------------
  const [trafficLight, setTrafficLight] = useState<'green' | 'yellow' | 'red'>('red');
  const [trafficScore, setTrafficScore] = useState(0);
  const [isTrafficGameRunning, setIsTrafficGameRunning] = useState(false);
  const [trafficMessage, setTrafficMessage] = useState<string>('กดปุ่ม "เริ่มเล่น" เพื่อฟังเสียงสัญญาณ');
  const [trafficFouls, setTrafficFouls] = useState(0);
  const [isTrafficRoundEnded, setIsTrafficRoundEnded] = useState(false);
  const [trafficTimerKey, setTrafficTimerKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stop traffic game helper
  const stopTrafficGame = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsTrafficGameRunning(false);
  }, []);

  const handleTrafficRoundEnd = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsTrafficGameRunning(false);
    setIsTrafficRoundEnded(true);
    soundEffects.playVictory(soundVolume);
    if (onEarnStar) onEarnStar();
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    speakText(`หมดเวลารอบแล้วจ้า! หนูทำคะแนนได้ ${trafficScore} คะแนน เก่งมากๆ เลย!`);
  }, [soundVolume, trafficScore, onEarnStar]);

  const runTrafficCycle = useCallback(() => {
    // Randomize next light: Green (60%), Yellow (15%), Red (25%)
    const rand = Math.random();
    let nextLight: 'green' | 'yellow' | 'red' = 'green';
    let duration = 3000;

    if (rand < 0.5) {
      nextLight = 'green';
      duration = 2500 + Math.random() * 2000;
    } else if (rand < 0.75) {
      nextLight = 'yellow';
      duration = 1500;
    } else {
      nextLight = 'red';
      duration = 2000 + Math.random() * 1500;
    }

    setTrafficLight(nextLight);

    if (nextLight === 'green') {
      soundEffects.playTap(soundVolume);
      setTrafficMessage('🟢 ไฟเขียว! แตะเก็บเหรียญดาวให้ได้มากที่สุด!');
    } else if (nextLight === 'yellow') {
      soundEffects.playTick(0.5, soundVolume);
      setTrafficMessage('🟡 ไฟเหลือง! เตรียมตัว ระวังไฟแดงกำลังมา!');
    } else {
      soundEffects.playIncorrect(soundVolume);
      setTrafficMessage('🔴 ไฟแดง! หยุดนิ่งทันที! ห้ามแตะเด็ดขาด!');
    }

    timerRef.current = setTimeout(() => {
      runTrafficCycle();
    }, duration);
  }, [soundVolume]);

  const startTrafficGame = () => {
    soundEffects.playTap(soundVolume);
    setTrafficScore(0);
    setTrafficFouls(0);
    setIsTrafficRoundEnded(false);
    setTrafficTimerKey((k) => k + 1);
    setIsTrafficGameRunning(true);
    runTrafficCycle();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Handle tap during traffic game
  const handleTrafficTap = () => {
    if (!isTrafficGameRunning) return;

    if (trafficLight === 'green') {
      soundEffects.playTap(soundVolume);
      setTrafficScore((s) => s + 1);
      if ((trafficScore + 1) % 10 === 0) {
        soundEffects.playSuccess(soundVolume);
        if (onEarnStar) onEarnStar();
        confetti({ particleCount: 20, spread: 50, origin: { y: 0.7 } });
      }
    } else if (trafficLight === 'yellow') {
      // Risk tap
      soundEffects.playTap(soundVolume);
      setTrafficScore((s) => s + 1);
    } else if (trafficLight === 'red') {
      // FOUL! Tapped on red
      soundEffects.playIncorrect(soundVolume);
      setTrafficFouls((f) => f + 1);
      setTrafficScore((s) => Math.max(0, s - 2));
      speakText('ว้าย! แตะช่วงไฟแดง ระวังโดนเป่านกหวีดนะจ๊ะ!');
    }
  };

  return (
    <div className="w-full flex flex-col items-center max-w-4xl mx-auto space-y-4">
      {/* Sub-mode selector */}
      <div className="flex items-center justify-center gap-2 bg-white/90 p-1.5 rounded-2xl border-2 border-indigo-200 shadow-xs">
        <button
          type="button"
          onClick={() => {
            soundEffects.playTap(soundVolume);
            setActiveMode('simon');
            stopTrafficGame();
          }}
          className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeMode === 'simon'
              ? 'bg-indigo-600 text-white shadow-md scale-102'
              : 'text-slate-600 hover:bg-indigo-50'
          }`}
        >
          <span>🐻 1. คุณครูหมีสั่งว่า... (Simon Says)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playTap(soundVolume);
            setActiveMode('traffic');
          }}
          className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeMode === 'traffic'
              ? 'bg-rose-600 text-white shadow-md scale-102'
              : 'text-slate-600 hover:bg-rose-50'
          }`}
        >
          <span>🚦 2. ไฟเขียว-ไฟแดง (Traffic Rules)</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SUB-MODE 1: SIMON SAYS */}
      {/* ========================================================= */}
      {activeMode === 'simon' && (
        <div className="w-full space-y-4">
          {/* Top Bar info */}
          <div className="w-full bg-white/95 rounded-2xl p-3 sm:p-4 border-2 border-indigo-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  ฝึกสมาธิ & กฎกติกา (Executive Function)
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  ด่าน {simonIndex + 1} / {availableChallenges.length}
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-800">
                  เกมคุณครูหมีสั่งว่า...
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                ฟังหรืออ่านคำสั่งให้ดี ถ้ามี "คุณครูหมีสั่งว่า" ให้ทำตาม แต่ถ้าไม่มี ห้ามแตะเด็ดขาด!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <GameTimer
                key={`simon-timer-${simonTimerKey}`}
                isRunning={!simonFeedback || simonFeedback.status !== 'correct'}
                onTick={(s) => setSimonSeconds(s)}
                onReset={() => setSimonSeconds(0)}
              />
              <button
                type="button"
                onClick={() => speakText(activeChallenge.promptText)}
                className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-xl border border-indigo-200 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden sm:inline">ฟังเสียงครูหมี</span>
              </button>
              <button
                type="button"
                onClick={() => setupSimon(activeChallenge)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">ข้อนี้ใหม่</span>
              </button>
            </div>
          </div>

          {/* Level Switcher Chips */}
          {availableChallenges.length > 1 && (
            <SkillGameLevelSelector
              totalLevels={availableChallenges.length}
              currentIndex={simonIndex}
              onSelectLevel={(idx) => {
                soundEffects.playTap(soundVolume);
                setSimonIndex(idx);
              }}
              prefix="ข้อ"
              colorTheme="rose"
              badgeSubtitle={activeChallenge.teacherSays ? 'คุณครูหมีสั่ง' : 'กักใจไว้ก่อน'}
            />
          )}

          {/* Teacher Bear Speech Bubble */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-5 sm:p-6 border-3 border-indigo-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-200 border-3 border-amber-400 flex items-center justify-center text-5xl shadow-md shrink-0 animate-bounce">
              🐻
            </div>

            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs font-black text-indigo-700 uppercase tracking-wide">
                คุณครูหมีใจดีบอกว่า:
              </span>
              <div className="text-base sm:text-lg md:text-xl font-black text-slate-900 bg-white/90 p-3.5 rounded-2xl border-2 border-indigo-100 shadow-xs mt-1">
                "{activeChallenge.promptText}"
              </div>
            </div>
          </div>

          {/* Decision Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Options to Tap (If rule says so) */}
            <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-800 mb-2">
                  👉 ตัวเลือกตามคำสั่ง (แตะหากคุณครูหมีสั่ง):
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {activeChallenge.options.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSimonChoice(item)}
                      className="p-3 bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-400 rounded-2xl flex flex-col items-center justify-between transition-all cursor-pointer active:scale-95 shadow-2xs group"
                    >
                      <div className="flex flex-col items-center text-center my-auto">
                        <span className="text-4xl">{item.icon}</span>
                        <span className="text-xs font-black text-slate-800 mt-1">{item.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(item.name);
                        }}
                        className="mt-2 w-full py-1 px-2 rounded-xl bg-white hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-[11px] font-bold flex items-center justify-center gap-1 hover:scale-102 active:scale-95 transition-all cursor-pointer shadow-2xs"
                        title="กดฟังเสียงตัวเลือกนี้"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>ฟังเสียง</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inhibit Button: "คุณครูไม่ได้สั่ง! อยู่นิ่งๆ" */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-4 border-2 border-rose-200 shadow-xs flex flex-col justify-between items-center text-center">
              <div>
                <span className="text-4xl">🛑</span>
                <h4 className="text-sm sm:text-base font-black text-rose-950 mt-1">
                  กฎข้อสำคัญ: ถ้าคุณครูหมีไม่ได้สั่ง!
                </h4>
                <p className="text-xs text-rose-800 mt-1">
                  หากประโยคไม่มีคำว่า <span className="font-black underline">"คุณครูหมีสั่งว่า"</span> ห้ามแตะรูปเด็ดขาด! ให้แตะปุ่มนี้แทนจ้า
                </p>
              </div>

              <div className="w-full mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimonInhibit}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-black text-sm sm:text-base py-3 px-3 rounded-2xl border-b-4 border-rose-800 shadow-md active:translate-y-0.5 active:border-b-0 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-5 h-5" />
                  <span>🛑 คุณครูไม่ได้สั่ง! (อยู่นิ่งๆ)</span>
                </button>
                <button
                  type="button"
                  onClick={() => speakText('คุณครูหมีไม่ได้สั่ง อยู่นิ่งๆ ห้ามแตะตัวเลือก')}
                  className="p-3 bg-white hover:bg-rose-100 text-rose-800 border-2 border-rose-200 rounded-2xl transition-all cursor-pointer shadow-xs flex items-center justify-center shrink-0"
                  title="ฟังเสียงตัวเลือกนี้"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Card */}
          {simonFeedback && (
            <div
              className={`p-4 rounded-2xl border-2 flex items-center justify-between flex-wrap gap-2 animate-in zoom-in-90 ${
                simonFeedback.status === 'correct'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2 flex-wrap">
                {simonFeedback.status === 'correct' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-black">{simonFeedback.message}</span>
                {simonFeedback.status === 'correct' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/80 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    ใช้เวลา: {formatSecondsToMinutes(simonSeconds)}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (simonIndex + 1 < availableChallenges.length) {
                    setSimonIndex((prev) => prev + 1);
                  } else {
                    setSimonIndex(0);
                  }
                }}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-xs hover:bg-indigo-700 cursor-pointer"
              >
                เล่นข้อถัดไป ➡️
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-MODE 2: TRAFFIC LIGHT REFLEX */}
      {/* ========================================================= */}
      {activeMode === 'traffic' && (
        <div className="w-full space-y-4">
          {/* Top Bar info */}
          <div className="w-full bg-white/95 rounded-2xl p-3 sm:p-4 border-2 border-rose-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  ฝึกการยับยั้งชั่งใจ & ปฏิกิริยาตอบสนอง (Reflex & Inhibition)
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-800">
                  เกมสัญญาณไฟจราจร เขียว-เหลือง-แดง 🚦
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                ไฟเขียว = แตะรัวๆ เพื่อเก็บดาว | ไฟเหลือง = เตรียมหยุด | ไฟแดง = หยุดนิ่งทันที!
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-300 font-black text-xs">
                ⭐ คะแนน: <span className="text-base text-amber-700">{trafficScore}</span>
              </div>
              {trafficFouls > 0 && (
                <div className="bg-rose-100 text-rose-900 px-3 py-1.5 rounded-xl border border-rose-300 font-black text-xs">
                  ⚠️ ฝ่าไฟแดง: <span className="text-base text-rose-700">{trafficFouls}</span> ครั้ง
                </div>
              )}
              {/* Countdown Round Timer */}
              <GameTimer
                key={`traffic-timer-${trafficTimerKey}`}
                isRunning={isTrafficGameRunning}
                direction="down"
                initialSeconds={30}
                onComplete={handleTrafficRoundEnd}
                className="bg-rose-50 border-rose-200 text-rose-900"
              />
            </div>
          </div>

          {/* Traffic Light Visualizer */}
          <div className="bg-slate-900 rounded-3xl p-6 border-4 border-slate-800 shadow-xl flex flex-col items-center text-center max-w-md mx-auto">
            {/* Signal Housing */}
            <div className="bg-slate-950 p-4 rounded-full border-4 border-slate-700 shadow-2xl flex flex-col gap-4 items-center mb-4">
              {/* RED */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 transition-all duration-200 flex items-center justify-center text-2xl ${
                  trafficLight === 'red'
                    ? 'bg-rose-600 border-rose-300 shadow-[0_0_35px_rgba(225,29,72,0.9)] scale-105'
                    : 'bg-rose-950/60 border-rose-900/40 opacity-40'
                }`}
              >
                {trafficLight === 'red' && <span className="animate-pulse">🛑</span>}
              </div>

              {/* YELLOW */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 transition-all duration-200 flex items-center justify-center text-2xl ${
                  trafficLight === 'yellow'
                    ? 'bg-amber-500 border-amber-200 shadow-[0_0_35px_rgba(245,158,11,0.9)] scale-105'
                    : 'bg-amber-950/60 border-amber-900/40 opacity-40'
                }`}
              >
                {trafficLight === 'yellow' && <span className="animate-pulse">⚠️</span>}
              </div>

              {/* GREEN */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 transition-all duration-200 flex items-center justify-center text-2xl ${
                  trafficLight === 'green'
                    ? 'bg-emerald-500 border-emerald-200 shadow-[0_0_35px_rgba(16,185,129,0.9)] scale-105'
                    : 'bg-emerald-950/60 border-emerald-900/40 opacity-40'
                }`}
              >
                {trafficLight === 'green' && <span className="animate-pulse">⭐</span>}
              </div>
            </div>

            {/* Instruction text */}
            <div
              className={`text-sm sm:text-base font-black px-4 py-2 rounded-2xl border transition-colors ${
                trafficLight === 'green'
                  ? 'bg-emerald-900/80 text-emerald-200 border-emerald-500'
                  : trafficLight === 'yellow'
                  ? 'bg-amber-900/80 text-amber-200 border-amber-500'
                  : 'bg-rose-900/80 text-rose-200 border-rose-500'
              }`}
            >
              {trafficMessage}
            </div>

            {/* Interactive Tap Button */}
            {isTrafficGameRunning ? (
              <div className="w-full mt-5 space-y-3">
                <button
                  type="button"
                  onClick={handleTrafficTap}
                  className={`w-full py-5 rounded-2xl font-black text-lg sm:text-xl transition-all cursor-pointer active:scale-95 shadow-lg select-none border-b-4 ${
                    trafficLight === 'green'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-800 hover:brightness-110 animate-pulse'
                      : trafficLight === 'yellow'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-amber-800'
                      : 'bg-gradient-to-r from-rose-600 to-red-700 text-white border-rose-950 ring-4 ring-rose-500'
                  }`}
                >
                  {trafficLight === 'green'
                    ? '⭐ แตะรัวๆ เพื่อเก็บคะแนน! ⭐'
                    : trafficLight === 'yellow'
                    ? '🟡 ช้าลง ระวังไฟแดง! 🟡'
                    : '🚫 ห้ามแตะ! สต็อปนิ่งๆ! 🚫'}
                </button>

                <button
                  type="button"
                  onClick={stopTrafficGame}
                  className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                >
                  ⏹️ พักเกมชั่วคราว
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={startTrafficGame}
                className="w-full mt-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-base sm:text-lg py-3.5 px-6 rounded-2xl border-b-4 border-emerald-800 shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-white text-white" />
                <span>เริ่มเล่นสัญญาณไฟจราจร 🚀</span>
              </button>
            )}
            {/* Round Ended Celebration Card */}
            {isTrafficRoundEnded && (
              <div className="w-full mt-4 bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-emerald-500/20 border-2 border-amber-400/60 rounded-3xl p-5 text-center animate-in zoom-in-95 space-y-3 shadow-lg">
                <div className="text-4xl">🏆</div>
                <h4 className="text-base sm:text-lg font-black text-amber-300">
                  หมดเวลารอบ 30 วินาทีแล้วจ้า!
                </h4>
                <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-bold text-slate-200">
                  <span className="bg-amber-400/20 px-3 py-1 rounded-xl text-amber-300 border border-amber-400/40">
                    ⭐ คะแนนที่ทำได้: {trafficScore} แต้ม
                  </span>
                  <span className="bg-rose-500/20 px-3 py-1 rounded-xl text-rose-300 border border-rose-400/40">
                    ⚠️ ฝ่าไฟแดง: {trafficFouls} ครั้ง
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {trafficFouls === 0
                    ? 'ยอดเยี่ยมมาก! ไม่มีฝ่าไฟแดงเลย มีสมาธิและการยับยั้งชั่งใจระดับยอดคน!'
                    : 'เก่งมากจ้า! พยายามระวังตอนไฟเหลืองเปลี่ยนเป็นไฟแดงนะจ๊ะ'}
                </p>
                <button
                  type="button"
                  onClick={startTrafficGame}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
                >
                  🚀 เล่นอีกรอบ ท้าทายสถิติตัวเอง!
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
