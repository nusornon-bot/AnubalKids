import React from 'react';
import {
  X,
  Trophy,
  Sparkles,
  Flame,
  Target,
  Award,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Play,
  Star,
  Zap,
} from 'lucide-react';
import { ChildProfile, CurriculumMode } from '../types';
import {
  BestSkillAnalysis,
  getCurrentWeekKey,
  getDaysRemainingInWeek,
  getWeeklyChallengeState,
  getWeekLabelTh,
  WEEKLY_CHALLENGE_RECORD_BONUS,
  WEEKLY_CHALLENGE_PARTICIPATION_BONUS,
} from '../services/weeklyChallengeService';
import { soundEffects } from '../services/audioService';

interface WeeklyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: ChildProfile;
  bestSkillAnalysis: BestSkillAnalysis;
  curriculumMode?: CurriculumMode;
  onStartChallenge: () => void;
  soundVolume?: number;
}

export const WeeklyChallengeModal: React.FC<WeeklyChallengeModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
  bestSkillAnalysis,
  curriculumMode = 'early_childhood',
  onStartChallenge,
  soundVolume = 0.6,
}) => {
  if (!isOpen) return null;

  const weekKey = getCurrentWeekKey();
  const weekLabel = getWeekLabelTh();
  const daysRemaining = getDaysRemainingInWeek();
  const challengeState = getWeeklyChallengeState(
    activeProfile.id,
    bestSkillAnalysis.subject,
    weekKey
  );
  const isCbe = curriculumMode === 'cbe_primary';

  const handleStart = () => {
    soundEffects.playVictory(soundVolume);
    onClose();
    onStartChallenge();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-5 text-white text-center relative shrink-0 shadow-sm">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-black mb-2 text-amber-100 border border-white/20">
            <Calendar className="w-3.5 h-3.5" />
            <span>{weekLabel}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>เหลืออีก {daysRemaining} วัน</span>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <span className="text-3xl animate-bounce">🏆</span>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white drop-shadow-xs">
              โหมดท้าทายประจำสัปดาห์ (Weekly Challenge)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-amber-100 font-semibold mt-1">
            ท้าทายทำลายสถิติคะแนนสูงสุด ด้วยคำถามจากทักษะที่ทำได้ดีที่สุดของ {activeProfile.name}!
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Best Skill Showcase Card */}
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-4 sm:p-5 border-2 border-amber-300 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-orange-400 text-amber-950 text-[10px] sm:text-xs font-black px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>ทักษะดาวเด่นประจำสัปดาห์</span>
            </div>

            <div className="flex items-start gap-3.5 mt-1">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-md border-2 border-amber-300 flex items-center justify-center text-3xl shrink-0">
                {bestSkillAnalysis.skill.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-black text-slate-800">
                    {bestSkillAnalysis.skill.name.th}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    แม่นยำ {bestSkillAnalysis.accuracy}%
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  {bestSkillAnalysis.explanationTh}
                </p>
              </div>
            </div>
          </div>

          {/* Current Weekly Record Tracker */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3.5 border-2 border-slate-200 text-center flex flex-col items-center justify-center">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-500" />
                สถิติสูงสุดสัปดาห์นี้
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-600 font-display mt-0.5">
                {challengeState.bestScore > 0 ? `${challengeState.bestScore} คะแนน` : 'ยังไม่มีสถิติ'}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                เล่นไปแล้ว {challengeState.attemptsCount} ครั้ง
              </span>
            </div>

            <div className="bg-amber-50 rounded-2xl p-3.5 border-2 border-amber-200 text-center flex flex-col items-center justify-center">
              <span className="text-[11px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1">
                <Target className="w-3 h-3 text-rose-500" />
                เป้าหมายทำลายสถิติ
              </span>
              <span className="text-2xl sm:text-3xl font-black text-rose-600 font-display mt-0.5">
                &gt; {challengeState.bestScore > 0 ? challengeState.bestScore : 50} คะแนน
              </span>
              <span className="text-[10px] text-amber-700 font-semibold mt-0.5">
                สร้างสถิติใหม่รับโบนัสก้อนโต!
              </span>
            </div>
          </div>

          {/* Rules & Rewards */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>กติกาและรางวัลพิเศษในโหมดนี้:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-black shrink-0">1.</span>
                <span>
                  <strong>สุ่มเฉพาะทักษะดาวเด่น:</strong> ข้อสอบในรอบนี้จะคัดเฉพาะวิชาที่ {activeProfile.name} มีความแม่นยำสูงสุด เพื่อเสริมความมั่นใจและทดสอบศักยภาพเต็มที่
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-black shrink-0">2.</span>
                <span>
                  <strong>โบนัสทำลายสถิติ:</strong> หากทำคะแนนในรอบนี้ได้มากกว่าสถิติเดิม รับโบนัสคะแนนสะสมพิเศษทันที <span className="text-rose-600 font-black">+{WEEKLY_CHALLENGE_RECORD_BONUS} คะแนน ⭐</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-black shrink-0">3.</span>
                <span>
                  <strong>รางวัลความมุ่งมั่น:</strong> แม้ยังไม่ทำลายสถิติแต่ตั้งใจเล่นจบ ทุกการทดสอบจะได้รับโบนัสความพยายาม <span className="text-amber-600 font-black">+{WEEKLY_CHALLENGE_PARTICIPATION_BONUS} คะแนน</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-black shrink-0">4.</span>
                <span>
                  <strong>รีเซ็ตสถิติทุกวันจันทร์:</strong> ทุกสัปดาห์ระบบจะวิเคราะห์ทักษะดาวเด่นใหม่ และเริ่มต้นรอบการท้าทายใหม่ร่วมกัน
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-200/60 transition-all cursor-pointer text-center"
          >
            ไว้ทีหลัง
          </button>

          <button
            type="button"
            id="btn-modal-start-weekly-challenge"
            onClick={handleStart}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-sm sm:text-base py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>เริ่มท้าทายทำลายสถิติเดี๋ยวนี้! 🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
};
