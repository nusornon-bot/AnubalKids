import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Gift,
  Sparkles,
  Star,
  Calendar,
  Flame,
  CheckCircle2,
  Lock,
  X,
  Trophy,
  Award,
  Crown,
  Play,
  Zap,
  Check,
  PartyPopper,
} from 'lucide-react';
import { ChildProfile, VoicePersona } from '../types';
import {
  DAILY_REWARD_TIERS,
  DailyRewardTier,
  DailyRewardClaimResult,
  getRewardStatus,
  claimDailyReward,
  getDailyLoginData,
  canClaimDailyReward,
} from '../services/dailyLoginRewardService';
import { soundEffects, speakText } from '../services/audioService';

interface DailyLoginRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ChildProfile;
  onRewardClaimed?: (result: DailyRewardClaimResult) => void;
  onStartGame?: () => void;
  soundVolume?: number;
  voicePersona?: VoicePersona;
}

export const DailyLoginRewardModal: React.FC<DailyLoginRewardModalProps> = ({
  isOpen,
  onClose,
  profile,
  onRewardClaimed,
  onStartGame,
  soundVolume = 0.7,
  voicePersona = 'adult_female',
}) => {
  const [claimResult, setClaimResult] = useState<DailyRewardClaimResult | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [justClaimedAnim, setJustClaimedAnim] = useState(false);

  // Compute status on open or profile change
  const rewardStatus = useMemo(() => {
    return getRewardStatus(profile);
  }, [profile, isOpen, claimResult]);

  const loginData = useMemo(() => {
    return getDailyLoginData(profile.id);
  }, [profile.id, isOpen, claimResult]);

  // Reset local state when modal opens
  useEffect(() => {
    if (isOpen) {
      setJustClaimedAnim(false);
      setClaimResult(null);
    }
  }, [isOpen]);

  const handleClaim = useCallback(() => {
    if (isClaiming || !rewardStatus.canClaimToday) return;

    setIsClaiming(true);
    soundEffects.playTap(soundVolume);

    try {
      const result = claimDailyReward(profile);
      setClaimResult(result);
      setJustClaimedAnim(true);

      // Play triumphant audio & cheer
      setTimeout(() => {
        soundEffects.playVictory(soundVolume);
      }, 150);

      // Fire vibrant confetti bursts
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FFA500', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 60,
            origin: { x: 0.15, y: 0.7 },
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 60,
            origin: { x: 0.85, y: 0.7 },
          });
        }, 250);
      } catch (e) {
        console.warn('Confetti effect error:', e);
      }

      // Friendly voice feedback
      const cheerThai = result.isGrandPrize
        ? `ยินดีด้วยจ้า ${profile.name}! พิชิตแชมเปี้ยน 7 วันเต็ม รับกล่องสมบัติทองคำ 50 ดวงดาว!`
        : `ยอดเยี่ยมมากค่ะ ${profile.name}! รับดาวโบนัส ${result.starsAwarded} ดวง สำหรับวันที่ ${result.dayInCycle}!`;

      speakText(cheerThai, 'th', (voicePersona as VoicePersona) || 'adult_female', soundVolume);

      if (onRewardClaimed) {
        onRewardClaimed(result);
      }
    } catch (err) {
      console.error('Error claiming daily reward:', err);
    } finally {
      setIsClaiming(false);
    }
  }, [isClaiming, rewardStatus.canClaimToday, profile, soundVolume, voicePersona, onRewardClaimed]);

  if (!isOpen) return null;

  const currentTier = rewardStatus.targetTier;
  const isClaimedToday = rewardStatus.isTodayClaimed || !!claimResult;
  const starsGained = claimResult?.starsAwarded || (isClaimedToday ? currentTier.stars : 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-amber-50 via-white to-orange-50/50 rounded-3xl sm:rounded-4xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col my-auto transition-all transform scale-100">
        {/* Top Decorative Header Banner */}
        <div className="relative bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 p-4 sm:p-5 text-white shadow-md overflow-hidden">
          {/* Background sparkles decoration */}
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-white/20 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-yellow-300/30 rounded-full blur-xl pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            id="btn-close-daily-login-modal"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              onClose();
            }}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-white transition-transform active:scale-90 cursor-pointer z-10"
            title="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="flex items-center gap-3 sm:gap-4 relative z-0 pr-10">
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl sm:text-4xl shadow-inner shrink-0 border border-white/40 animate-pulse">
              🎁
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-100/90 text-amber-900 text-[11px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-600" /> รางวัลประจำวัน
                </span>
                <span className="bg-black/20 text-white text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                  ต่อเนื่อง {loginData.consecutiveDays || rewardStatus.consecutiveDays || 1} วัน
                </span>
              </div>
              <h2
                id="daily-login-modal-title"
                className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-sm mt-0.5 flex items-center gap-2"
              >
                <span>ยินดีต้อนรับ {profile.avatar} {profile.name}!</span>
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 font-medium">
                เข้าแอปสม่ำเสมอทุกวัน สะสมดวงดาวและปลดล็อกโบนัสพิเศษ 🌟
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
          {/* Today's Big Prize Highlight Banner */}
          <div
            className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-2 sm:border-3 transition-all ${
              isClaimedToday
                ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-emerald-300'
                : 'bg-gradient-to-r from-amber-100/90 via-orange-50 to-yellow-100/80 border-amber-400 shadow-lg'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center text-3xl sm:text-4xl shadow-md shrink-0 border-2 ${
                    isClaimedToday
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : currentTier.isGrandPrize
                      ? 'bg-gradient-to-br from-amber-400 to-yellow-500 border-amber-300 text-white animate-bounce'
                      : 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 text-white animate-pulse'
                  }`}
                >
                  {isClaimedToday ? '✅' : currentTier.emoji}
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                      วันที่ {rewardStatus.targetDayInCycle} ของรอบสัปดาห์
                    </span>
                    {currentTier.isGrandPrize && (
                      <span className="text-xs font-black text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5 text-rose-600 fill-rose-600" /> รางวัลใหญ่พิเศษ
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 tracking-tight mt-1">
                    {currentTier.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {currentTier.subtitle}
                  </p>
                </div>
              </div>

              {/* Star reward counter badge */}
              <div className="bg-white/90 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl border-2 border-amber-300 shadow-sm flex items-center gap-2.5 shrink-0">
                <Star className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 leading-none">
                    +{currentTier.stars}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500">
                    ดวงดาวโบนัส ⭐
                  </div>
                </div>
              </div>
            </div>

            {/* Just Claimed Celebration Notification */}
            {justClaimedAnim && (
              <div className="mt-3.5 p-3 bg-emerald-500 text-white rounded-xl font-black text-center text-sm sm:text-base flex items-center justify-center gap-2 shadow-md animate-bounce">
                <PartyPopper className="w-5 h-5" />
                <span>รับรางวัลสำเร็จ! +{starsGained} ดวงดาวถูกบันทึกแล้ว เยี่ยมมาก! 🌟</span>
              </div>
            )}
          </div>

          {/* 7-Day Cycle Roadmap Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>เส้นทางรางวัล 7 วันต่อเนื่อง (7-Day Streak Road)</span>
              </h4>
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                รอบที่ 1-7 วัน
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-2.5">
              {DAILY_REWARD_TIERS.map((tier) => {
                const isTargetToday = tier.day === rewardStatus.targetDayInCycle;
                const isPastClaimed =
                  tier.day < rewardStatus.targetDayInCycle ||
                  (isTargetToday && isClaimedToday);
                const isFuture = tier.day > rewardStatus.targetDayInCycle;

                let cardBg = 'bg-white border-slate-200';
                let iconColor = 'text-slate-400';

                if (isPastClaimed) {
                  cardBg = 'bg-emerald-50/90 border-emerald-400 text-emerald-900';
                  iconColor = 'text-emerald-500';
                } else if (isTargetToday) {
                  cardBg =
                    'bg-amber-100 border-amber-500 ring-2 sm:ring-4 ring-amber-300/60 shadow-md text-amber-950 scale-102';
                  iconColor = 'text-amber-500';
                } else if (isFuture) {
                  cardBg = 'bg-slate-50/90 border-slate-200 text-slate-400';
                  iconColor = 'text-slate-400';
                }

                return (
                  <div
                    key={`tier-day-${tier.day}`}
                    className={`relative rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border-2 flex flex-col items-center justify-between text-center transition-all ${cardBg} ${
                      tier.isGrandPrize ? 'col-span-2 sm:col-span-1 border-dashed' : ''
                    }`}
                  >
                    {/* Status Badge */}
                    <div className="w-full flex items-center justify-between mb-1">
                      <span className="text-[10px] sm:text-[11px] font-black">
                        วันที่ {tier.day}
                      </span>
                      {isPastClaimed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : isTargetToday ? (
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
                      ) : (
                        <Lock className="w-3 h-3 text-slate-300 shrink-0" />
                      )}
                    </div>

                    {/* Emoji / Grand Prize Icon */}
                    <div className="text-xl sm:text-2xl my-1 relative">
                      <span>{tier.emoji}</span>
                      {tier.isGrandPrize && (
                        <Crown className="w-3 h-3 text-amber-500 fill-amber-500 absolute -top-1 -right-1" />
                      )}
                    </div>

                    {/* Stars Value */}
                    <div className="font-black text-xs sm:text-sm text-amber-600 flex items-center gap-0.5">
                      <span>+{tier.stars}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    </div>

                    {/* Small Caption */}
                    <div className="text-[9px] font-bold text-slate-500 line-clamp-1 mt-0.5">
                      {isPastClaimed ? 'รับแล้ว' : isTargetToday ? (isClaimedToday ? 'เสร็จสิ้น' : 'รอรับ') : tier.badgeLabel}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 bg-slate-100/80 p-2.5 sm:p-3 rounded-2xl border border-slate-200 text-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 text-base shadow-xs">
                🔥
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-semibold">
                  ฝึกต่อเนื่อง
                </div>
                <div className="text-xs sm:text-sm font-black text-slate-800">
                  {loginData.consecutiveDays || rewardStatus.consecutiveDays || 1} วันติด
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 text-base shadow-xs">
                ⭐
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-semibold">
                  โบนัสสะสมรวม
                </div>
                <div className="text-xs sm:text-sm font-black text-amber-700">
                  {(loginData.totalBonusStarsClaimed || 0) + (claimResult ? claimResult.starsAwarded : 0)} ดาว
                </div>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
            {rewardStatus.canClaimToday && !isClaimedToday ? (
              <button
                type="button"
                id="btn-claim-daily-login-reward"
                onClick={handleClaim}
                disabled={isClaiming}
                className="w-full flex-1 py-3.5 sm:py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2.5 active:scale-98 border-b-4 border-orange-700 animate-pulse hover:animate-none"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xl shrink-0">
                  🎁
                </div>
                <span>กดรับรางวัลประจำวัน (+{currentTier.stars} ดวงดาว)</span>
              </button>
            ) : (
              <div className="w-full flex-1 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  id="btn-daily-login-claimed-status"
                  disabled
                  className="w-full flex-1 py-3 sm:py-3.5 px-4 bg-emerald-100 border-2 border-emerald-300 text-emerald-800 font-black text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2 cursor-default"
                >
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>รับรางวัลของวันนี้เรียบร้อยแล้ว พรุ่งนี้พบกันใหม่นะ! 🌟</span>
                </button>

                {onStartGame && (
                  <button
                    type="button"
                    id="btn-daily-login-start-game"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      onClose();
                      onStartGame();
                    }}
                    className="w-full sm:w-auto px-5 py-3 sm:py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 shrink-0 border-b-3 border-emerald-700"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>เริ่มเล่นเกมเลย 🚀</span>
                  </button>
                )}
              </div>
            )}

            <button
              type="button"
              id="btn-dismiss-daily-login-modal"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-3 sm:py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-sm sm:text-base rounded-2xl transition-all cursor-pointer text-center"
            >
              ไว้ทีหลัง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
