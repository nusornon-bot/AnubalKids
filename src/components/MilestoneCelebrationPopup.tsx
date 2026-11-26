import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Flame, Award, CheckCircle2, Star, Zap, X } from 'lucide-react';
import { Language } from '../types';
import { soundEffects } from '../services/audioService';

export interface MilestoneEvent {
  id: string;
  type: 'streak' | 'subject_mastery' | 'difficulty' | 'halfway';
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  icon: string;
  badgeLabel: Record<Language, string>;
  themeGradient: string;
  accentBorder: string;
  textColor: string;
  metricBadge: string;
  soundType?: 'victory' | 'success';
}

export interface MilestoneCelebrationPopupProps {
  currentMilestone: MilestoneEvent | null;
  onDismiss: () => void;
  language?: Language;
  soundVolume?: number;
}

export const MilestoneCelebrationPopup: React.FC<MilestoneCelebrationPopupProps> = ({
  currentMilestone,
  onDismiss,
  language = 'th',
  soundVolume = 0.8,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState(100);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!currentMilestone) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    setProgressWidth(100);

    // Play celebration sound
    if (currentMilestone.soundType === 'success') {
      soundEffects.playSuccess(soundVolume);
    } else {
      soundEffects.playVictory(soundVolume);
    }

    // Fire celebratory confetti shower
    try {
      confetti({
        particleCount: currentMilestone.type === 'streak' ? 65 : 85,
        spread: 75,
        origin: { y: 0.25 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#FBBF24'],
        disableForReducedMotion: true,
      });

      // Second burst for dramatic effect
      setTimeout(() => {
        try {
          confetti({
            particleCount: 35,
            spread: 50,
            origin: { y: 0.2 },
            colors: ['#FFD700', '#FFA500', '#FFFFFF', '#67E8F9'],
            disableForReducedMotion: true,
          });
        } catch {
          // ignore
        }
      }, 250);
    } catch {
      // ignore
    }

    // Countdown timer for auto-dismiss (3600ms total)
    const duration = 3600;
    const intervalStep = 60;
    const stepDec = (intervalStep / duration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgressWidth((prev) => Math.max(0, prev - stepDec));
    }, intervalStep);

    dismissTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 200);
    }, duration);

    return () => {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentMilestone, onDismiss, soundVolume]);

  if (!currentMilestone || !isVisible) return null;

  const handleManualDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playTap(soundVolume);
    setIsVisible(false);
    setTimeout(onDismiss, 150);
  };

  const handlePopupTap = () => {
    soundEffects.playSuccess(soundVolume);
    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.3 },
      });
    } catch {
      // ignore
    }
  };

  const titleText = currentMilestone.title[language] || currentMilestone.title.th;
  const subtitleText = currentMilestone.subtitle[language] || currentMilestone.subtitle.th;
  const badgeLabelText = currentMilestone.badgeLabel[language] || currentMilestone.badgeLabel.th;

  return (
    <div
      id="milestone-celebration-popup-container"
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-md pointer-events-auto select-none"
    >
      <div
        id={`milestone-popup-${currentMilestone.id}`}
        onClick={handlePopupTap}
        className={`relative overflow-hidden rounded-3xl p-4 sm:p-5 border-3 ${currentMilestone.accentBorder} bg-gradient-to-r ${currentMilestone.themeGradient} text-white shadow-2xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-102 active:scale-98 animate-in zoom-in-75 slide-in-from-top-6`}
      >
        {/* Ambient Shimmer / Starburst Aura */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-yellow-300/20 rounded-full blur-lg pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleManualDismiss}
          className="absolute top-2.5 right-2.5 p-1 rounded-full bg-black/20 hover:bg-black/40 text-white/90 hover:text-white transition-colors cursor-pointer"
          aria-label="ปิดการแจ้งเตือนความสำเร็จ"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Layout */}
        <div className="flex items-center gap-3.5 relative z-10">
          {/* Big 3D Badge Icon with Glow Ring */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/25 border-2 border-white/50 flex items-center justify-center text-3xl sm:text-4xl shadow-md ring-4 ring-white/20 animate-bounce">
              <span>{currentMilestone.icon}</span>
            </div>
            {/* Sparkling Star */}
            <span className="absolute -top-1.5 -right-1.5 text-base sm:text-lg animate-spin">
              ✨
            </span>
          </div>

          {/* Texts and Badges */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/30 border border-white/30 text-amber-200">
                {badgeLabelText}
              </span>
              <span className="text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full bg-white/25 text-white">
                {currentMilestone.metricBadge}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black tracking-tight leading-tight mt-1 text-white drop-shadow-sm font-display">
              {titleText}
            </h3>

            <p className="text-xs text-white/90 font-bold mt-0.5 leading-snug line-clamp-2">
              {subtitleText}
            </p>
          </div>
        </div>

        {/* Animated Countdown Progress Bar at Bottom */}
        <div className="mt-3 w-full bg-black/25 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/80 rounded-full transition-all duration-75"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>
    </div>
  );
};
