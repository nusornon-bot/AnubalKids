import React, { useEffect, useState } from 'react';
import { Flame, Sparkles, Trophy, Crown, Zap } from 'lucide-react';
import { Language } from '../types';

export interface MasteryLevelInfo {
  tier: 0 | 1 | 2 | 3 | 4;
  titleTh: string;
  titleEn: string;
  badgeTh: string;
  badgeEn: string;
  gradient: string;
  borderClass: string;
  glowClass: string;
  icon: string;
  messageTh: string;
  messageEn: string;
}

export function getMasteryLevel(streak: number): MasteryLevelInfo {
  if (streak >= 4) {
    return {
      tier: 4,
      titleTh: 'ตำนานอัจฉริยะไร้พ่าย',
      titleEn: 'Legendary Mastery',
      badgeTh: 'ระดับตำนาน ⭐',
      badgeEn: 'Legendary ⭐',
      gradient: 'from-amber-500 via-rose-500 to-purple-600',
      borderClass: 'border-amber-300',
      glowClass: 'shadow-[0_0_20px_rgba(245,158,11,0.6)] ring-2 ring-amber-300',
      icon: '👑',
      messageTh: 'ยอดอัจฉริยะระดับตำนาน! ไร้พ่ายในข้อสอบระดับท้าทาย 🔥',
      messageEn: 'Unstoppable! Legendary streak in high-difficulty questions!',
    };
  }
  if (streak === 3) {
    return {
      tier: 3,
      titleTh: 'ปรมาจารย์ระดับสูง',
      titleEn: 'Grandmaster Level',
      badgeTh: 'ปรมาจารย์ 👑',
      badgeEn: 'Grandmaster 👑',
      gradient: 'from-rose-500 via-orange-500 to-amber-500',
      borderClass: 'border-rose-400',
      glowClass: 'shadow-[0_0_16px_rgba(244,63,94,0.5)] ring-2 ring-rose-300',
      icon: '🔥',
      messageTh: 'ตอบถูก 3 ข้อติด! ปรมาจารย์ข้อสอบระดับท้าทาย 🏆',
      messageEn: '3 in a row! Mastery achieved in high-difficulty challenges!',
    };
  }
  if (streak === 2) {
    return {
      tier: 2,
      titleTh: 'ผู้เชี่ยวชาญระดับสูง',
      titleEn: 'Adept Master',
      badgeTh: 'เชี่ยวชาญ ⚡',
      badgeEn: 'Adept ⚡',
      gradient: 'from-amber-500 to-orange-600',
      borderClass: 'border-orange-400',
      glowClass: 'shadow-[0_0_14px_rgba(249,115,22,0.45)] ring-2 ring-orange-300',
      icon: '⚡',
      messageTh: 'ตอบถูก 2 ข้อติด! ฟอร์มกำลังร้อนแรงต่อเนื่อง 🚀',
      messageEn: '2 in a row! Exceptional focus and momentum!',
    };
  }
  if (streak === 1) {
    return {
      tier: 1,
      titleTh: 'ประกายอัจฉริยะ',
      titleEn: 'Mastery Spark',
      badgeTh: 'เริ่มต้น 🌟',
      badgeEn: 'Spark 🌟',
      gradient: 'from-amber-400 to-yellow-500',
      borderClass: 'border-amber-300',
      glowClass: 'shadow-[0_0_10px_rgba(251,191,36,0.4)]',
      icon: '✨',
      messageTh: 'เริ่มต้นสวยงาม! จุดประกายสตรีกระดับท้าทายแล้ว ✨',
      messageEn: 'Great start! Difficulty streak ignited!',
    };
  }
  return {
    tier: 0,
    titleTh: 'ผู้ท้าทายระดับสูง',
    titleEn: 'Challenger',
    badgeTh: 'คำถามท้าทาย 🎯',
    badgeEn: 'Challenge 🎯',
    gradient: 'from-blue-600/70 to-indigo-600/70',
    borderClass: 'border-blue-300/40',
    glowClass: '',
    icon: '🎯',
    messageTh: 'คำถามระดับท้าทาย! ตอบถูกเพื่อเริ่มสะสมสตรีก 🚀',
    messageEn: 'Challenging question! Answer correctly to start streak!',
  };
}

interface DifficultyStreakIndicatorProps {
  streak: number;
  isHighDifficulty: boolean;
  questionDifficulty: number;
  language?: Language;
  isAnimating?: boolean;
}

export const DifficultyStreakIndicator: React.FC<DifficultyStreakIndicatorProps> = ({
  streak,
  isHighDifficulty,
  questionDifficulty,
  language = 'th',
  isAnimating = false,
}) => {
  const [pulseKey, setPulseKey] = useState(0);

  // Trigger brief bounce animation whenever streak increases
  useEffect(() => {
    if (streak > 0 || isAnimating) {
      setPulseKey((k) => k + 1);
    }
  }, [streak, isAnimating]);

  const mastery = getMasteryLevel(streak);
  const isEn = language === 'en';

  return (
    <div
      id="difficulty-streak-indicator"
      key={pulseKey}
      className={`relative w-full rounded-2xl px-3 py-2 text-white transition-all duration-500 border ${
        mastery.borderClass
      } ${
        streak > 0
          ? `bg-gradient-to-r ${mastery.gradient} ${mastery.glowClass} ${
              isAnimating ? 'scale-[1.02] sm:scale-105' : 'scale-100'
            }`
          : 'bg-gradient-to-r from-indigo-700/80 via-blue-700/80 to-purple-800/80 backdrop-blur-xs'
      }`}
    >
      {/* Background Animated Shimmer for active streaks */}
      {streak > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden opacity-30"
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      )}

      <div className="relative z-10 flex flex-col xs:flex-row items-center justify-between gap-1.5 sm:gap-2">
        {/* Left: Streak Counter & Fire Flame Icon */}
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-black text-lg sm:text-xl shrink-0 transition-transform duration-300 ${
              streak > 0
                ? 'bg-white/20 text-yellow-200 shadow-inner scale-105 animate-bounce'
                : 'bg-white/10 text-white/80'
            }`}
          >
            {streak >= 4 ? '👑' : streak >= 3 ? '🔥' : streak >= 2 ? '⚡' : '🔥'}
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-black font-display tracking-tight text-white drop-shadow-xs">
                {isEn ? 'Difficulty Streak' : 'สตรีกระดับท้าทาย'}
              </span>

              {/* Numerical Streak Pill */}
              <span
                className={`text-xs font-black px-2 py-0.5 rounded-full border shadow-2xs transition-transform ${
                  streak > 0
                    ? 'bg-amber-300 text-amber-950 border-amber-200 animate-pulse'
                    : 'bg-white/20 text-white border-white/30'
                }`}
              >
                {streak} {isEn ? (streak === 1 ? 'streak' : 'streaks') : 'ข้อติด!'}
              </span>
            </div>

            {/* Mastery Level Title & Status */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-100 mt-0.5">
              <span>{mastery.icon}</span>
              <span className="text-white font-black">
                {isEn ? mastery.titleEn : mastery.titleTh}
              </span>
              <span className="text-amber-200/80 text-[10px] hidden sm:inline">
                • {isEn ? mastery.badgeEn : mastery.badgeTh}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Visual Mastery Flame Nodes & Level Gauge */}
        <div className="flex items-center gap-2.5">
          {/* Flame Progress Nodes */}
          <div className="flex items-center gap-1 bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-white/20">
            {[1, 2, 3, 4].map((tier) => {
              const isFilled = streak >= tier;
              const isCurrent = streak === tier;

              return (
                <div
                  key={tier}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all duration-300 ${
                    isFilled
                      ? isCurrent
                        ? 'bg-amber-300 text-amber-950 scale-110 shadow-md ring-2 ring-white animate-pulse'
                        : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xs'
                      : 'bg-white/10 text-white/30'
                  }`}
                  title={`${isEn ? 'Mastery Level' : 'ระดับความชำนาญ'} ${tier}`}
                >
                  {tier === 4 ? (
                    <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-900" />
                  ) : tier === 3 ? (
                    <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ) : tier === 2 ? (
                    <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Question Tag */}
          <div className="hidden md:flex flex-col text-right">
            <span className="text-[10px] text-amber-200/90 font-semibold uppercase tracking-wider">
              {isEn ? 'Question Tier' : 'ระดับคำถาม'}
            </span>
            <span className="text-xs font-black text-white">
              {questionDifficulty === 3
                ? isEn
                  ? 'Challenging (Lv.3)'
                  : 'ท้าทายสูงสุด (Lv.3)'
                : isEn
                ? 'Medium (Lv.2)'
                : 'ปานกลาง (Lv.2)'}
            </span>
          </div>
        </div>
      </div>

      {/* Animated streak extension notice badge */}
      {isAnimating && streak > 0 && (
        <div className="mt-1.5 pt-1.5 border-t border-white/20 flex items-center justify-between text-[11px] font-black text-amber-100 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
            <span>{isEn ? mastery.messageEn : mastery.messageTh}</span>
          </div>
          <span className="bg-yellow-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
            +1 Streak 🔥
          </span>
        </div>
      )}
    </div>
  );
};
