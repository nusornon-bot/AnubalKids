import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Heart,
  Hand,
  Sparkles,
  Star,
  Smile,
  RefreshCw,
  X,
  Volume2,
  Trophy,
  Zap,
  Play,
  CheckCircle2,
  Gift,
} from 'lucide-react';
import { ChildProfile, Grade, VoicePersona } from '../../types';
import { soundEffects, speakText, isAudioMuted } from '../../services/audioService';
import { storageService } from '../../services/storageService';
import { saveProfileToCloud } from '../../services/cloudSyncService';
import { triggerRoundSuccessConfetti } from '../../utils/confettiCelebration';

export type MiniChallengeType =
  | 'heart_tap'
  | 'wave_hand'
  | 'catch_stars'
  | 'pop_balloons'
  | 'smile_big'
  | 'high_five'
  | 'jump_rhythm';

export interface MiniChallengeDefinition {
  id: MiniChallengeType;
  titleTh: string;
  subtitleTh: string;
  categoryTh: string;
  icon: string;
  targetCount: number;
  bonusPoints: number;
  bonusStars: number;
  speechPromptTh: string;
  victorySpeechTh: string;
  themeColor: {
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
  };
}

export const MINI_CHALLENGES: MiniChallengeDefinition[] = [
  {
    id: 'heart_tap',
    titleTh: 'แตะที่หัวใจ 3 ครั้ง',
    subtitleTh: 'แตะหัวใจดวงโตที่กำลังเต้นดึ๋งๆ เพื่อส่งต่อความรักและความอบอุ่น',
    categoryTh: 'อารมณ์ & จิตใจดีงาม',
    icon: '💖',
    targetCount: 3,
    bonusPoints: 10,
    bonusStars: 1,
    speechPromptTh: 'เพื่อนๆ จ๋า มาแตะที่หัวใจสีชมพู 3 ครั้งเพื่อส่งความรักกันเถอะ!',
    victorySpeechTh: 'ยอดเยี่ยมมากเลย! ส่งความรักครบสามดวงแล้ว รับดาวพิเศษและสิบคะแนนไปเลยจ้า!',
    themeColor: {
      bg: 'from-pink-50 via-rose-50 to-amber-50',
      border: 'border-pink-300',
      badgeBg: 'bg-pink-100',
      badgeText: 'text-pink-700',
      buttonBg: 'bg-rose-500 hover:bg-rose-600',
    },
  },
  {
    id: 'wave_hand',
    titleTh: 'ทำท่าโบกมือทักทาย',
    subtitleTh: 'ยกมือขึ้นมาโบกมือทักทายพี่หมีและเพื่อนๆ 3 ครั้ง สวัสดีครับ/ค่ะ!',
    categoryTh: 'มารยาท & มิตรภาพ',
    icon: '👋',
    targetCount: 3,
    bonusPoints: 10,
    bonusStars: 1,
    speechPromptTh: 'สวัสดีครับ! ลองยกมือขึ้นมาโบกทักทายพี่หมี 3 ครั้งนะ!',
    victorySpeechTh: 'สวัสดีจ้า! มารยาทดีและน่ารักมาก ภารกิจสำเร็จแล้ว รับดาวโบนัสไปเลย!',
    themeColor: {
      bg: 'from-amber-50 via-yellow-50 to-orange-50',
      border: 'border-amber-300',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
      buttonBg: 'bg-amber-500 hover:bg-amber-600',
    },
  },
  {
    id: 'catch_stars',
    titleTh: 'แตะเก็บดาวนำโชค 5 ดวง',
    subtitleTh: 'แตะดวงดาวสีทองประกายแสงวิบวับบนท้องฟ้าให้ครบ 5 ดวง',
    categoryTh: 'สมาธิ & ประสาทสัมผัส',
    icon: '⭐',
    targetCount: 5,
    bonusPoints: 10,
    bonusStars: 1,
    speechPromptTh: 'ท้องฟ้ามีดาวประกายแสงวิบวับ ช่วยกันแตะเก็บให้ครบ 5 ดวงเลย!',
    victorySpeechTh: 'ว้าว! เก็บดาวนำโชคครบทั้งห้าดวงแล้ว สมาธิดีเยี่ยมมากจ้า!',
    themeColor: {
      bg: 'from-sky-50 via-indigo-50 to-amber-50',
      border: 'border-sky-300',
      badgeBg: 'bg-sky-100',
      badgeText: 'text-sky-800',
      buttonBg: 'bg-sky-500 hover:bg-sky-600',
    },
  },
  {
    id: 'pop_balloons',
    titleTh: 'จิ้มลูกโป่งสายรุ้ง 4 ลูก',
    subtitleTh: 'จิ้มลูกโป่งสีสดใสที่กำลังลอยให้แตกป๊อป 4 ลูกแสนสนุก',
    categoryTh: 'กล้ามเนื้อมือ & สายตา',
    icon: '🎈',
    targetCount: 4,
    bonusPoints: 10,
    bonusStars: 1,
    speechPromptTh: 'ลูกโป่งสีสดใสลอยขึ้นฟ้าแล้ว รีบจิ้มให้แตกป๊อป 4 ลูกกันเลย!',
    victorySpeechTh: 'ป๊อป! เก่งมากๆ เลย จิ้มลูกโป่งแตกครบสี่ลูกอย่างว่องไว!',
    themeColor: {
      bg: 'from-purple-50 via-pink-50 to-blue-50',
      border: 'border-purple-300',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-800',
      buttonBg: 'bg-purple-500 hover:bg-purple-600',
    },
  },
  {
    id: 'smile_big',
    titleTh: 'ส่งยิ้มหวานๆ 3 วินาที',
    subtitleTh: 'ยิ้มกว้างๆ ให้หน้าจอและกดเติมพลังรอยยิ้มค้างไว้ 3 วินาที',
    categoryTh: 'อารมณ์ & ความสุขสดใส',
    icon: '😊',
    targetCount: 3,
    bonusPoints: 10,
    bonusStars: 1,
    speechPromptTh: 'ไหนขอดูรอยยิ้มหวานๆ หน่อยจ้า! ส่งยิ้มกว้างๆ ให้กัน 3 วินาทีนะ!',
    victorySpeechTh: 'ว้าว! รอยยิ้มของหนูน่ารักและสดใสที่สุดในโลกเลยจ้า!',
    themeColor: {
      bg: 'from-emerald-50 via-teal-50 to-amber-50',
      border: 'border-emerald-300',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      buttonBg: 'bg-emerald-500 hover:bg-emerald-600',
    },
  },
  {
    id: 'high_five',
    titleTh: 'แปะมือ High-Five 3 ครั้ง',
    subtitleTh: 'แปะมือเสริมพลังบวกกับพี่หมีมาสคอต 3 ครั้ง แปะ แปะ แปะ!',
    categoryTh: 'ความร่วมมือ & พลังใจ',
    icon: '✋',
    targetCount: 3,
    bonusPoints: 10,
    bonusStars: 1,
    speechPromptTh: 'แปะมือกันเถอะเพื่อนเก่ง! ไฮไฟฟ์ 3 ครั้งเพื่อรับพลังพิเศษ!',
    victorySpeechTh: 'เย้! ไฮไฟฟ์สุดพลัง แปะมือสำเร็จ รับคะแนนพิเศษไปเลย!',
    themeColor: {
      bg: 'from-orange-50 via-amber-50 to-yellow-50',
      border: 'border-orange-300',
      badgeBg: 'bg-orange-100',
      badgeText: 'text-orange-800',
      buttonBg: 'bg-orange-500 hover:bg-orange-600',
    },
  },
  {
    id: 'jump_rhythm',
    titleTh: 'กระโดดดึ๋งๆ 3 จังหวะ',
    subtitleTh: 'ยืดเส้นยืดสาย ออกกำลังกายกระโดดดึ๋งๆ 3 ครั้ง ดึ๋ง! ดึ๋ง! ดึ๋ง!',
    categoryTh: 'สุขภาวะ & เคลื่อนไหว',
    icon: '🦘',
    targetCount: 3,
    bonusPoints: 10,
    bonusStars: 1,
    speechPromptTh: 'ดึ๋ง! ดึ๋ง! ดึ๋ง! มาออกกำลังกายกระโดด 3 จังหวะสดชื่นกันนะ!',
    victorySpeechTh: 'กระโดดคล่องแคล่ว แข็งแรงมากเลย! ภารกิจสำเร็จแล้วจ้า!',
    themeColor: {
      bg: 'from-teal-50 via-green-50 to-emerald-50',
      border: 'border-teal-300',
      badgeBg: 'bg-teal-100',
      badgeText: 'text-teal-800',
      buttonBg: 'bg-teal-600 hover:bg-teal-700',
    },
  },
];

interface MiniChallengeWidgetProps {
  activeProfile: ChildProfile;
  soundVolume?: number;
  voicePersona?: VoicePersona;
  onProfileUpdated?: (updated: ChildProfile) => void;
  className?: string;
}

export const MiniChallengeWidget: React.FC<MiniChallengeWidgetProps> = ({
  activeProfile,
  soundVolume = 0.7,
  voicePersona = 'child_girl',
  onProfileUpdated,
  className = '',
}) => {
  // Current challenge selection
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * MINI_CHALLENGES.length));
  const currentChallenge = MINI_CHALLENGES[currentIndex] || MINI_CHALLENGES[0];

  // Interactive playground modal state
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [tapEffectId, setTapEffectId] = useState(0);

  // Challenge-specific interactive state
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const [smileHoldSeconds, setSmileHoldSeconds] = useState(0);
  const smileTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activePersona: VoicePersona = (voicePersona ?? 'child_girl') as VoicePersona;

  // Initialize interactive playground when opened
  const openChallenge = useCallback(() => {
    setProgress(0);
    setIsCompleted(false);
    setActiveItems([]);
    setSmileHoldSeconds(0);
    setIsOpen(true);
    soundEffects.playTap(soundVolume);

    // Audio instruction
    if (soundVolume > 0.01 && !isAudioMuted()) {
      speakText(currentChallenge.speechPromptTh, 'th', activePersona);
    }
  }, [activePersona, currentChallenge, soundVolume]);

  // Roll new challenge
  const rollNewChallenge = useCallback(() => {
    soundEffects.playTap(soundVolume);
    let nextIdx = Math.floor(Math.random() * MINI_CHALLENGES.length);
    if (nextIdx === currentIndex && MINI_CHALLENGES.length > 1) {
      nextIdx = (currentIndex + 1) % MINI_CHALLENGES.length;
    }
    setCurrentIndex(nextIdx);
    setProgress(0);
    setIsCompleted(false);
    setActiveItems([]);
    setSmileHoldSeconds(0);
  }, [currentIndex, soundVolume]);

  // Handle completion reward
  const handleAwardReward = useCallback(() => {
    setIsCompleted(true);
    soundEffects.playVictory(soundVolume);
    triggerRoundSuccessConfetti({ starCount: 3, isPerfect: true });

    // Voice praise
    if (soundVolume > 0.01 && !isAudioMuted()) {
      speakText(currentChallenge.victorySpeechTh, 'th', activePersona);
    }

    // Award bonus score & star to active profile
    try {
      const bonusPts = currentChallenge.bonusPoints;
      const updatedProfile: ChildProfile = {
        ...activeProfile,
        totalScore: (activeProfile.totalScore || 0) + bonusPts,
        updatedAt: new Date().toISOString(),
      };
      storageService.updateProfile(updatedProfile);
      saveProfileToCloud(updatedProfile).catch(() => {});
      if (onProfileUpdated) {
        onProfileUpdated(updatedProfile);
      }
    } catch (e) {
      console.warn('[MiniChallenge] Error saving bonus reward:', e);
    }
  }, [activeProfile, currentChallenge, onProfileUpdated, soundVolume, voicePersona]);

  // Handle action tap/interaction
  const handleActionTap = useCallback(
    (index?: number) => {
      if (isCompleted) return;

      setTapEffectId((prev) => prev + 1);
      soundEffects.playCorrect(soundVolume);

      if (index !== undefined) {
        if (!activeItems.includes(index)) {
          const nextItems = [...activeItems, index];
          setActiveItems(nextItems);
          const newProgress = nextItems.length;
          setProgress(newProgress);
          if (newProgress >= currentChallenge.targetCount) {
            handleAwardReward();
          }
        }
      } else {
        const nextProgress = progress + 1;
        setProgress(nextProgress);
        if (nextProgress >= currentChallenge.targetCount) {
          handleAwardReward();
        }
      }
    },
    [activeItems, currentChallenge.targetCount, handleAwardReward, isCompleted, progress, soundVolume]
  );

  // Smile hold timer for smile_big challenge
  const startSmileHold = () => {
    if (isCompleted) return;
    soundEffects.playTap(soundVolume);
    if (smileTimerRef.current) clearInterval(smileTimerRef.current);

    smileTimerRef.current = setInterval(() => {
      setSmileHoldSeconds((prev) => {
        const next = prev + 1;
        setProgress(next);
        soundEffects.playCorrect(soundVolume);
        if (next >= currentChallenge.targetCount) {
          if (smileTimerRef.current) clearInterval(smileTimerRef.current);
          handleAwardReward();
        }
        return next;
      });
    }, 1000);
  };

  const stopSmileHold = () => {
    if (smileTimerRef.current) {
      clearInterval(smileTimerRef.current);
      smileTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (smileTimerRef.current) clearInterval(smileTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* 1. Main Dashboard Card Widget */}
      <div
        className={`w-full bg-gradient-to-r ${currentChallenge.themeColor.bg} rounded-3xl p-4 sm:p-5 border-2 ${currentChallenge.themeColor.border} shadow-sm hover:shadow-md transition-all ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left info badge & mascot */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-amber-300 shadow-sm flex items-center justify-center text-3xl sm:text-4xl shrink-0 animate-bounce duration-1000">
                {currentChallenge.icon}
              </div>
              <span className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-xs border border-white">
                🎲 มินิ
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full ${currentChallenge.themeColor.badgeBg} ${currentChallenge.themeColor.badgeText} border border-current/20`}
                >
                  ⚡ {currentChallenge.categoryTh}
                </span>
                <span className="text-[11px] font-black text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>+{currentChallenge.bonusPoints} คะแนน · +1 ดาว</span>
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5 font-display flex items-center gap-1.5 truncate">
                <span>{currentChallenge.titleTh}</span>
              </h3>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                {currentChallenge.subtitleTh}
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={rollNewChallenge}
              title="สุ่มภารกิจใหม่"
              className="p-2.5 sm:px-3 sm:py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500 hover:rotate-180 transition-transform duration-300" />
              <span className="hidden sm:inline">สุ่มใหม่</span>
            </button>

            <button
              type="button"
              onClick={openChallenge}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl ${currentChallenge.themeColor.buttonBg} text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>ทำภารกิจเลย! 🚀</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Fullscreen Interactive Playground Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-3xl animate-bounce">{currentChallenge.icon}</span>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-amber-100 flex items-center gap-1">
                    <span>✨ MINI-CHALLENGE ประจำวัน</span>
                    <span>·</span>
                    <span>+{currentChallenge.bonusPoints} คะแนน</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black">{currentChallenge.titleTh}</h2>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    if (soundVolume > 0.01 && !isAudioMuted()) {
                      speakText(currentChallenge.speechPromptTh, 'th', activePersona);
                    }
                  }}
                  title="ฟังคำสั่งเสียง"
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    setIsOpen(false);
                    stopSmileHold();
                  }}
                  title="ปิด"
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body & Progress Area */}
            <div className="p-5 flex-1 flex flex-col items-center justify-center min-h-[320px] bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30 select-none">
              {/* Progress counter pill */}
              <div className="mb-4 flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border-2 border-amber-200 shadow-2xs">
                <span className="text-xs font-black text-slate-700">ความคืบหน้า:</span>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: currentChallenge.targetCount }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                        i < progress
                          ? 'bg-emerald-500 text-white scale-110 shadow-xs'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {i < progress ? '✓' : i + 1}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-black text-amber-800 ml-1">
                  ({progress}/{currentChallenge.targetCount})
                </span>
              </div>

              {/* Subtitle prompt */}
              <p className="text-sm sm:text-base text-slate-700 text-center font-bold mb-6 max-w-sm">
                {currentChallenge.subtitleTh}
              </p>

              {/* DYNAMIC INTERACTIVE GAME STAGES ACCORDING TO CHALLENGE TYPE */}
              {!isCompleted ? (
                <div className="w-full flex flex-col items-center justify-center py-2">
                  {/* TYPE 1: แตะที่หัวใจ 3 ครั้ง */}
                  {currentChallenge.id === 'heart_tap' && (
                    <div className="flex flex-col items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleActionTap()}
                        className="relative group p-6 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 text-white shadow-xl hover:shadow-2xl active:scale-90 transition-all cursor-pointer animate-pulse"
                      >
                        <Heart className="w-24 h-24 sm:w-28 sm:h-28 fill-white text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-2 -right-2 bg-white text-rose-600 text-xs font-black px-2.5 py-1 rounded-full shadow-md border-2 border-rose-400">
                          แตะฉันสิ! 💖
                        </span>
                      </button>
                      <p className="text-xs text-slate-500 font-medium">
                        แตะที่หัวใจอีก {currentChallenge.targetCount - progress} ครั้ง
                      </p>
                    </div>
                  )}

                  {/* TYPE 2: ทำท่าโบกมือทักทาย */}
                  {currentChallenge.id === 'wave_hand' && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-6xl shadow-inner relative">
                        <span className="animate-bounce">🐻</span>
                        <span className="absolute -top-3 -right-3 text-4xl animate-spin origin-bottom-left">
                          👋
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleActionTap()}
                        className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Hand className="w-6 h-6 animate-pulse" />
                        <span>โบกมือทักทายพี่หมี 👋 ({progress}/{currentChallenge.targetCount})</span>
                      </button>
                    </div>
                  )}

                  {/* TYPE 3: แตะเก็บดาวนำโชค 5 ดวง */}
                  {currentChallenge.id === 'catch_stars' && (
                    <div className="w-full max-w-xs grid grid-cols-5 gap-2 sm:gap-3 py-4">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const isCollected = activeItems.includes(i);
                        return (
                          <button
                            key={i}
                            type="button"
                            disabled={isCollected}
                            onClick={() => handleActionTap(i)}
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-all cursor-pointer ${
                              isCollected
                                ? 'bg-amber-400 text-amber-950 scale-105 shadow-md border-2 border-white'
                                : 'bg-white hover:bg-amber-100 border-2 border-amber-200 text-amber-500 hover:scale-110 shadow-xs animate-bounce'
                            }`}
                            style={{ animationDelay: `${i * 150}ms` }}
                          >
                            ⭐
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* TYPE 4: จิ้มลูกโป่งสายรุ้ง 4 ลูก */}
                  {currentChallenge.id === 'pop_balloons' && (
                    <div className="w-full max-w-xs grid grid-cols-4 gap-3 py-4">
                      {['🎈', '🎈', '🎈', '🎈'].map((balloon, i) => {
                        const isPopped = activeItems.includes(i);
                        return (
                          <button
                            key={i}
                            type="button"
                            disabled={isPopped}
                            onClick={() => handleActionTap(i)}
                            className={`w-16 h-20 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                              isPopped
                                ? 'bg-slate-100 text-slate-300 scale-90 border-2 border-dashed border-slate-300'
                                : 'bg-gradient-to-t from-pink-100 to-rose-50 border-2 border-rose-300 text-4xl hover:scale-110 shadow-sm animate-pulse'
                            }`}
                            style={{ animationDelay: `${i * 200}ms` }}
                          >
                            {isPopped ? (
                              <span className="text-xl font-black text-emerald-600">💥 แตก!</span>
                            ) : (
                              balloon
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* TYPE 5: ส่งยิ้มหวานๆ 3 วินาที */}
                  {currentChallenge.id === 'smile_big' && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative w-28 h-28 rounded-full bg-amber-100 border-4 border-amber-400 flex items-center justify-center text-6xl shadow-inner">
                        <Smile className="w-16 h-16 text-amber-600" />
                        <span className="absolute bottom-1 bg-white px-2 py-0.5 rounded-full text-[10px] font-black text-amber-800 shadow-xs">
                          {smileHoldSeconds}/3 วิ
                        </span>
                      </div>
                      <button
                        type="button"
                        onMouseDown={startSmileHold}
                        onMouseUp={stopSmileHold}
                        onTouchStart={startSmileHold}
                        onTouchEnd={stopSmileHold}
                        className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-base shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer select-none"
                      >
                        <Smile className="w-6 h-6" />
                        <span>กดค้างไว้ & ส่งยิ้ม 3 วินาที 😊</span>
                      </button>
                    </div>
                  )}

                  {/* TYPE 6: แปะมือ High-Five 3 ครั้ง */}
                  {currentChallenge.id === 'high_five' && (
                    <div className="flex flex-col items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleActionTap()}
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-orange-400 to-amber-300 hover:from-orange-500 hover:to-amber-400 text-white flex flex-col items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all cursor-pointer"
                      >
                        <Hand className="w-16 h-16 drop-shadow-md" />
                        <span className="text-xs font-black mt-1">แปะมือตรงนี้! ✋</span>
                      </button>
                      <p className="text-xs text-slate-500 font-medium">
                        แปะมืออีก {currentChallenge.targetCount - progress} ครั้ง
                      </p>
                    </div>
                  )}

                  {/* TYPE 7: กระโดดดึ๋งๆ 3 จังหวะ */}
                  {currentChallenge.id === 'jump_rhythm' && (
                    <div className="flex flex-col items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleActionTap()}
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-teal-500 hover:bg-teal-600 text-white flex flex-col items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all cursor-pointer text-5xl"
                      >
                        <span className="animate-bounce">🦘</span>
                        <span className="text-xs font-black mt-1 bg-white/20 px-2 py-0.5 rounded-full">
                          ดึ๋ง! ({progress}/{currentChallenge.targetCount})
                        </span>
                      </button>
                      <p className="text-xs text-slate-500 font-medium">
                        กดกระโดดจังหวะที่ {progress + 1}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* VICTORY & REWARD CELEBRATION STAGE */
                <div className="w-full flex flex-col items-center justify-center py-4 text-center animate-in zoom-in-90 duration-300">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center text-4xl shadow-lg border-2 border-white mb-3 animate-bounce">
                    🏆
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-amber-900 font-display">
                    ภารกิจสำเร็จแล้ว! 🎉
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-xs">
                    {activeProfile.name} เก่งมาก! ได้รับรางวัลพิเศษเข้าโปรไฟล์เรียบร้อย
                  </p>

                  <div className="flex items-center justify-center gap-3 my-4 bg-amber-100/80 px-5 py-2.5 rounded-2xl border-2 border-amber-300">
                    <div className="flex items-center gap-1.5 text-amber-900 font-black text-sm">
                      <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>+{currentChallenge.bonusPoints} คะแนน</span>
                    </div>
                    <span className="text-amber-300">|</span>
                    <div className="flex items-center gap-1.5 text-amber-900 font-black text-sm">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>+1 ดาวโบนัส ⭐</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 w-full max-w-xs">
                    <button
                      type="button"
                      onClick={() => {
                        rollNewChallenge();
                        setProgress(0);
                        setIsCompleted(false);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>สุ่มภารกิจใหม่ 🎲</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playTap(soundVolume);
                        setIsOpen(false);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>เสร็จสิ้น เย้! ✨</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span>👤</span>
                <span>ผู้ท้าชิง: <b>{activeProfile.name}</b></span>
              </span>
              <button
                type="button"
                onClick={rollNewChallenge}
                className="text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer hover:underline"
              >
                <RefreshCw className="w-3 h-3" />
                <span>เปลี่ยนภารกิจ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
