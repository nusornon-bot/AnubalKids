import React, { useState, useEffect, useMemo } from 'react';
import { Grade } from '../../types';
import { BODY_MOVEMENT_GAMES, BodyMovementExercise } from '../../data/extraDevelopmentalGames';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Volume2,
  Activity,
  Heart,
  Timer,
  Play,
  Check,
  ChevronRight,
  ShieldAlert,
  ArrowUp,
  ArrowRight,
  Zap,
} from 'lucide-react';

interface BodyMovementViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

// SVG Posture Illustration Visualizer Component
const PostureIllustrationCard: React.FC<{
  exercise: BodyMovementExercise;
  isExercising: boolean;
}> = ({ exercise, isExercising }) => {
  const getPostureSvg = () => {
    switch (exercise.motionType) {
      case 'jump':
        return (
          <svg viewBox="0 0 160 160" className="w-36 h-36 drop-shadow-md">
            {/* Ground surface */}
            <line x1="20" y1="140" x2="140" y2="140" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
            <path d="M 25 140 Q 30 135 35 140 M 125 140 Q 130 135 135 140" stroke="#059669" strokeWidth="2" />
            {/* Upward Leap Trajectory Arc */}
            <path
              d="M 50 135 Q 80 50 110 135"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
            {/* Motion arrows */}
            <path d="M 75 45 L 80 35 L 85 45" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <line x1="80" y1="35" x2="80" y2="55" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            {/* Cartoon Child in Jumping/Crouch Pose */}
            <g className={isExercising ? 'animate-bounce' : ''}>
              {/* Head */}
              <circle cx="80" cy="70" r="18" fill="#fed7aa" />
              {/* Hair */}
              <path d="M 64 68 Q 80 50 96 68 Q 90 56 80 56 Q 70 56 64 68" fill="#78350f" />
              {/* Smiling Face */}
              <circle cx="74" cy="70" r="2" fill="#78350f" />
              <circle cx="86" cy="70" r="2" fill="#78350f" />
              <path d="M 76 76 Q 80 80 84 76" fill="none" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
              {/* Blush */}
              <circle cx="71" cy="74" r="3" fill="#fca5a5" opacity="0.6" />
              <circle cx="89" cy="74" r="3" fill="#fca5a5" opacity="0.6" />
              {/* Torso in yellow/green sportswear */}
              <rect x="70" y="88" width="20" height="24" rx="6" fill="#10b981" />
              {/* Arms reaching up */}
              <path d="M 70 94 Q 52 75 58 60" fill="none" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
              <path d="M 90 94 Q 108 75 102 60" fill="none" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
              {/* Legs bent in spring jump */}
              <path d="M 74 112 L 65 124 L 75 130" fill="none" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
              <path d="M 86 112 L 95 124 L 85 130" fill="none" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
            </g>
          </svg>
        );
      case 'balance':
        return (
          <svg viewBox="0 0 160 160" className="w-36 h-36 drop-shadow-md">
            {/* Balance Horizon Guide */}
            <line x1="20" y1="135" x2="140" y2="135" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="3 3" />
            {/* Support Base */}
            <ellipse cx="80" cy="138" rx="20" ry="4" fill="#cbd5e1" opacity="0.6" />
            {/* Cartoon Child Standing on One Leg, Arms as Wings */}
            <g className={isExercising ? 'animate-pulse' : ''}>
              {/* Head with tilt */}
              <circle cx="80" cy="55" r="17" fill="#fed7aa" />
              {/* Hair */}
              <path d="M 65 52 Q 80 36 95 52 Q 88 42 80 42 Q 72 42 65 52" fill="#475569" />
              {/* Face */}
              <circle cx="75" cy="55" r="2" fill="#0f172a" />
              <circle cx="85" cy="55" r="2" fill="#0f172a" />
              <path d="M 77 62 Q 80 65 83 62" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
              {/* Pink Flamingo Vest */}
              <rect x="71" y="72" width="18" height="26" rx="6" fill="#f43f5e" />
              {/* Wings Arms spread perfectly horizontal */}
              <line x1="30" y1="80" x2="71" y2="80" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
              <line x1="89" y1="80" x2="130" y2="80" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
              {/* Pink feathers hint */}
              <path d="M 30 80 Q 20 84 32 88" fill="none" stroke="#fb7185" strokeWidth="2" />
              <path d="M 130 80 Q 140 84 128 88" fill="none" stroke="#fb7185" strokeWidth="2" />
              {/* Standing Leg (Straight down) */}
              <line x1="77" y1="98" x2="77" y2="135" stroke="#be123c" strokeWidth="5" strokeLinecap="round" />
              {/* Raised Leg (Bent 90 degrees) */}
              <path d="M 83 98 L 102 108 L 98 122" fill="none" stroke="#be123c" strokeWidth="5" strokeLinecap="round" />
            </g>
          </svg>
        );
      case 'stretch':
        return (
          <svg viewBox="0 0 160 160" className="w-36 h-36 drop-shadow-md">
            {/* Sun / Aura of Vitality */}
            <circle cx="80" cy="25" r="10" fill="#fef08a" className="animate-ping opacity-75" />
            <circle cx="80" cy="25" r="8" fill="#facc15" />
            {/* Gentle breeze spiral */}
            <path d="M 30 40 Q 50 30 70 45" fill="none" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
            <path d="M 90 40 Q 110 30 130 45" fill="none" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
            {/* Cartoon Child in Tree/Reach Tall Stretch */}
            <g className={isExercising ? 'animate-bounce' : ''}>
              {/* Head looking up */}
              <circle cx="80" cy="62" r="16" fill="#fed7aa" />
              {/* Hair */}
              <path d="M 66 60 Q 80 46 94 60" fill="#92400e" stroke="#92400e" strokeWidth="2" />
              {/* Happy eyes curved up */}
              <path d="M 73 62 Q 76 59 79 62" fill="none" stroke="#78350f" strokeWidth="1.5" />
              <path d="M 81 62 Q 84 59 87 62" fill="none" stroke="#78350f" strokeWidth="1.5" />
              <circle cx="80" cy="67" r="2" fill="#e11d48" />
              {/* Torso in green shirt */}
              <rect x="72" y="78" width="16" height="28" rx="5" fill="#22c55e" />
              {/* Both arms reaching straight high to the sun */}
              <line x1="74" y1="84" x2="62" y2="40" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
              <line x1="86" y1="84" x2="98" y2="40" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
              {/* Legs straight and firm */}
              <line x1="76" y1="106" x2="73" y2="138" stroke="#15803d" strokeWidth="5" strokeLinecap="round" />
              <line x1="84" y1="106" x2="87" y2="138" stroke="#15803d" strokeWidth="5" strokeLinecap="round" />
            </g>
          </svg>
        );
      case 'wings':
        return (
          <svg viewBox="0 0 160 160" className="w-36 h-36 drop-shadow-md">
            {/* Wind breeze waves */}
            <path d="M 15 70 Q 40 55 65 70" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 95 70 Q 120 55 145 70" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3 3" />
            {/* Child with flapping wing motions */}
            <g className={isExercising ? 'animate-pulse' : ''}>
              <circle cx="80" cy="60" r="17" fill="#fed7aa" />
              <path d="M 65 58 Q 80 42 95 58" fill="#1e1b4b" />
              <circle cx="75" cy="60" r="2" fill="#000" />
              <circle cx="85" cy="60" r="2" fill="#000" />
              <path d="M 77 66 Q 80 70 83 66" fill="none" stroke="#000" strokeWidth="1.5" />
              <rect x="71" y="77" width="18" height="26" rx="6" fill="#3b82f6" />
              {/* Wing curved arms */}
              <path d="M 71 84 Q 40 60 25 78" fill="none" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
              <path d="M 89 84 Q 120 60 135 78" fill="none" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
              {/* Flap motion lines */}
              <path d="M 28 65 L 20 60" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
              <path d="M 132 65 L 140 60" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
              <line x1="75" y1="103" x2="73" y2="136" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" />
              <line x1="85" y1="103" x2="87" y2="136" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" />
            </g>
          </svg>
        );
      default:
        // March or Generic Animal Motion
        return (
          <svg viewBox="0 0 160 160" className="w-36 h-36 drop-shadow-md">
            <line x1="20" y1="138" x2="140" y2="138" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
            <g className={isExercising ? 'animate-bounce' : ''}>
              <circle cx="80" cy="58" r="17" fill="#fed7aa" />
              <path d="M 65 56 Q 80 40 95 56" fill="#b45309" />
              <circle cx="75" cy="58" r="2" fill="#78350f" />
              <circle cx="85" cy="58" r="2" fill="#78350f" />
              <path d="M 77 65 Q 80 68 83 65" fill="none" stroke="#78350f" strokeWidth="1.5" />
              <rect x="71" y="75" width="18" height="26" rx="6" fill="#f59e0b" />
              {/* Marching arms & high knee legs */}
              <path d="M 71 82 L 54 94 L 56 108" fill="none" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
              <path d="M 89 82 L 104 74 L 114 84" fill="none" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
              <path d="M 76 101 L 64 116 L 68 136" fill="none" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
              <path d="M 84 101 L 98 108 L 98 126" fill="none" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="relative w-full max-w-sm rounded-3xl bg-white border-2 border-emerald-200 shadow-sm p-3.5 flex flex-col items-center">
      <div className="w-full flex items-center justify-between pb-2 border-b border-emerald-100">
        <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          ภาพจำลองท่าทาง {exercise.animalName}
        </span>
        <span className="text-xs font-bold text-slate-500">
          {exercise.motionType === 'jump' && 'กระโดดสปริงตัว 🦘'}
          {exercise.motionType === 'balance' && 'ทรงตัวขาเดียว ⚖️'}
          {exercise.motionType === 'stretch' && 'ยืดเหยียดร่างกาย 🧘'}
          {exercise.motionType === 'wings' && 'โบกแขนเป็นปีก 🦅'}
          {exercise.motionType === 'march' && 'ก้าวเดินเคลื่อนไหว 🐾'}
          {exercise.motionType === 'spin' && 'หมุนเอวคลายเมื่อย 🌀'}
        </span>
      </div>

      {/* Center SVG Figure */}
      <div className="my-2 flex items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-emerald-50/60 to-teal-50/60 w-full">
        {getPostureSvg()}
      </div>

      {/* Movement Cue Steps */}
      <div className="w-full grid grid-cols-2 gap-2 text-left mt-1">
        <div className="bg-emerald-50/80 p-2 rounded-xl border border-emerald-200/60">
          <span className="text-[10px] font-black text-emerald-800 block">1. ท่าเตรียม</span>
          <span className="text-[11px] font-medium text-slate-700 leading-tight">
            ยืนตรงหรือตั้งหลัก มั่นคง ปลอดภัย
          </span>
        </div>
        <div className="bg-amber-50/80 p-2 rounded-xl border border-amber-200/60">
          <span className="text-[10px] font-black text-amber-800 block">2. จังหวะปฏิบัติ</span>
          <span className="text-[11px] font-medium text-slate-700 leading-tight">
            {exercise.unitLabel === 'วินาที' ? 'ค้างไว้ตามเวลานับ' : 'ทำซ้ำตามจำนวนครั้ง'}
          </span>
        </div>
      </div>
    </div>
  );
};

export const BodyMovementView: React.FC<BodyMovementViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'all' | Grade>('all');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [countProgress, setCountProgress] = useState(0);
  const [isExercising, setIsExercising] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);

  // Available exercises: default to ALL 20+ postures so full set is available, or filter by grade
  const availableExercises = useMemo(() => {
    if (selectedGradeFilter === 'all') {
      return BODY_MOVEMENT_GAMES;
    }
    const filtered = BODY_MOVEMENT_GAMES.filter((g) => g.grade === selectedGradeFilter);
    return filtered.length > 0 ? filtered : BODY_MOVEMENT_GAMES;
  }, [selectedGradeFilter]);

  const activeEx: BodyMovementExercise =
    availableExercises[currentLevelIndex] || availableExercises[0] || BODY_MOVEMENT_GAMES[0];

  // Reset exercise when level changes
  useEffect(() => {
    setCountProgress(0);
    setIsExercising(false);
    setIsCompleted(false);

    if (soundVolume > 0) {
      speakText(`${activeEx.title} ${activeEx.voiceGuide}`, 'th', soundVolume);
    }
  }, [currentLevelIndex, activeEx.id, soundVolume]);

  const handleStartExercise = () => {
    soundEffects.playTap(soundVolume);
    setIsExercising(true);
    setCountProgress(0);
    setIsCompleted(false);
    speakText(`เริ่มท่า ${activeEx.title} ได้เลยจ้า!`, 'th', soundVolume);
  };

  const handleDoStep = () => {
    soundEffects.playTick(1 + countProgress * 0.1, soundVolume);
    const nextCount = countProgress + 1;
    setCountProgress(nextCount);

    if (nextCount >= activeEx.targetCount) {
      setIsCompleted(true);
      setIsExercising(false);
      soundEffects.playVictory(soundVolume);
      if (onEarnStar) onEarnStar();
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      speakText(
        `ยอดเยี่ยมมากคนเก่ง! ทำท่า ${activeEx.title} สำเร็จครบ ${activeEx.targetCount} ${activeEx.unitLabel} แล้ว ร่างกายแข็งแรงมากจ้ะ!`,
        'th',
        soundVolume
      );
    }
  };

  const handleReset = () => {
    soundEffects.playTap(soundVolume);
    setCountProgress(0);
    setIsCompleted(false);
    setIsExercising(false);
  };

  const handleNextLevel = () => {
    soundEffects.playTap(soundVolume);
    if (currentLevelIndex < availableExercises.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      setCurrentLevelIndex(0);
    }
  };

  const handleSpeak = () => {
    setIsVoiceSpeaking(true);
    speakText(activeEx.voiceGuide, 'th', soundVolume);
    setTimeout(() => setIsVoiceSpeaking(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
      {/* Grade / View Filter Pills */}
      <div className="w-full flex items-center justify-between flex-wrap gap-2 px-2">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-bold text-slate-600">ตัวกรองระดับชั้น:</span>
          {(
            [
              { key: 'all', label: `ทั้งหมด (${BODY_MOVEMENT_GAMES.length} ท่า)` },
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
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
          ครบ {BODY_MOVEMENT_GAMES.length} ท่าทางหรรษา 🏃‍♂️
        </span>
      </div>

      {/* Responsive Level Selector for 20+ Exercises */}
      <SkillGameLevelSelector
        totalLevels={availableExercises.length}
        currentIndex={currentLevelIndex}
        onSelectLevel={(idx) => {
          soundEffects.playTap(soundVolume);
          setCurrentLevelIndex(idx);
        }}
        prefix="ท่าที่"
        colorTheme="emerald"
        badgeSubtitle={activeEx.animalName}
      />

      {/* Main Exercise Card */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-7 border-3 border-emerald-200 shadow-md flex flex-col items-center gap-5">
        {/* Header Title & Tags */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-b border-emerald-100 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-tr ${activeEx.bgGradient} text-white text-3xl sm:text-4xl flex items-center justify-center shadow-md animate-bounce`}
            >
              {activeEx.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  พัฒนากล้ามเนื้อ & การทรงตัว
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  ระดับ: {activeEx.difficulty}
                </span>
                <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {activeEx.grade}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 mt-1">
                {activeEx.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSpeak}
            className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-black ${
              isVoiceSpeaking
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs scale-105'
                : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
            }`}
            title="ฟังคำแนะนำเสียง"
          >
            <Volume2 className="w-4 h-4" />
            <span>ฟังเสียงคุณครู 🔊</span>
          </button>
        </div>

        {/* Action Prompt Banner */}
        <div className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 text-center">
          <p className="text-sm sm:text-base font-black text-emerald-950">
            "{activeEx.actionInstruction}"
          </p>
          <p className="text-xs text-emerald-700 font-bold mt-1">
            💡 ประโยชน์: {activeEx.benefitDescription}
          </p>
        </div>

        {/* Posture Illustration Component & Interactive Stage (Side-by-side or stacked) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-items-center">
          {/* Posture Illustration Guide */}
          <PostureIllustrationCard exercise={activeEx} isExercising={isExercising} />

          {/* Interactive Motion Canvas / Animation Stage */}
          <div className="relative w-full max-w-sm h-64 sm:h-72 rounded-3xl bg-gradient-to-b from-sky-50 to-emerald-50 border-3 border-emerald-300 flex flex-col items-center justify-center p-4 overflow-hidden shadow-inner">
            {/* Animated Avatar Character */}
            <div
              className={`relative flex flex-col items-center transition-transform duration-300 ${
                isExercising ? 'scale-110' : ''
              }`}
            >
              <div className="text-7xl sm:text-8xl select-none filter drop-shadow-md">
                {activeEx.emoji}
              </div>
              <div className="mt-2 text-xs font-black text-emerald-900 bg-white/90 px-3 py-1 rounded-full shadow-2xs border border-emerald-200">
                {activeEx.animalName}
              </div>
            </div>

            {/* Target Count Ring */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-black text-emerald-800 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-emerald-200 shadow-xs">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>เป้าหมายความสำเร็จ:</span>
              </span>
              <span className="text-sm text-emerald-600 font-black">
                {countProgress} / {activeEx.targetCount} {activeEx.unitLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons & Counters */}
        {!isCompleted ? (
          <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-3">
            {!isExercising ? (
              <button
                type="button"
                onClick={handleStartExercise}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>เริ่มทำท่านี้กันเลย!</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleDoStep}
                  className="w-full flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-base shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ring-4 ring-emerald-200"
                >
                  <Check className="w-5 h-5" />
                  <span>แตะเมื่อทำครบ 1 {activeEx.unitLabel}! ({countProgress + 1}/{activeEx.targetCount})</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-black text-xs transition-all active:scale-95 cursor-pointer"
                  title="เริ่มนับใหม่"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        ) : (
          /* Completed Banner */
          <div className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                ⭐
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black leading-tight">
                  เก่งสุดยอดเลยคนเก่ง! ร่างกายแข็งแรงมาก
                </h3>
                <p className="text-xs text-emerald-100 font-bold mt-0.5">
                  ผ่านท่า "{activeEx.title}" ได้สำเร็จ ได้รับ 1 ดาวสะสม!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-xs transition-all active:scale-95 cursor-pointer"
              >
                ทำซ้ำอีกรอบ
              </button>
              <button
                type="button"
                onClick={handleNextLevel}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>ไปท่าถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

