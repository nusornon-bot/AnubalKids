import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Sparkles,
  Flame,
  Target,
  ArrowRight,
  Play,
  Calendar,
  CheckCircle2,
  Info,
  Crown,
} from 'lucide-react';
import { ChildProfile, CurriculumMode, Subject } from '../../types';
import {
  getBestPerformingSkill,
  getCurrentWeekKey,
  getDaysRemainingInWeek,
  getWeeklyChallengeState,
  getWeekLabelTh,
  WEEKLY_CHALLENGE_RECORD_BONUS,
} from '../../services/weeklyChallengeService';
import { WeeklyChallengeModal } from '../WeeklyChallengeModal';
import { soundEffects } from '../../services/audioService';

interface WeeklyChallengeSectionProps {
  activeProfile: ChildProfile;
  curriculumMode?: CurriculumMode;
  onStartWeeklyChallenge: (skill: Subject) => void;
  soundVolume?: number;
}

export const WeeklyChallengeSection: React.FC<WeeklyChallengeSectionProps> = ({
  activeProfile,
  curriculumMode = 'early_childhood',
  onStartWeeklyChallenge,
  soundVolume = 0.6,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const weekKey = getCurrentWeekKey();
  const weekLabel = getWeekLabelTh();
  const daysRemaining = getDaysRemainingInWeek();

  // Find best performing skill for active profile
  const bestSkillAnalysis = useMemo(() => {
    return getBestPerformingSkill(activeProfile, (curriculumMode as CurriculumMode) || 'early_childhood');
  }, [activeProfile, curriculumMode]);

  // Read current weekly challenge state
  const challengeState = useMemo(() => {
    return getWeeklyChallengeState(activeProfile.id, bestSkillAnalysis.subject, weekKey);
  }, [activeProfile.id, bestSkillAnalysis.subject, weekKey]);

  const handleStartDirectly = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playVictory(soundVolume);
    onStartWeeklyChallenge(bestSkillAnalysis.subject);
  };

  const isCbe = curriculumMode === 'cbe_primary';

  return (
    <>
      <div
        id="weekly-challenge-home-card"
        className="w-full max-w-lg bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-4 sm:p-5 text-white shadow-lg border-2 border-amber-300 relative overflow-hidden transition-all duration-200 hover:shadow-xl group"
      >
        {/* Background decorative elements */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute right-4 top-4 text-4xl opacity-15 pointer-events-none select-none">
          👑
        </div>

        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 mb-2 relative z-10 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-lg shadow-inner">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-black font-display tracking-tight text-white drop-shadow-xs">
                  ท้าทายประจำสัปดาห์ (Weekly Challenge)
                </span>
                <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.2 rounded-full shadow-2xs">
                  โหมดทำลายสถิติ 🔥
                </span>
              </div>
              <p className="text-[11px] text-amber-100 font-medium">
                {isCbe ? 'หลักสูตรสมรรถนะ CBE (ป.1 - ป.3)' : 'หลักสูตรพัฒนา 8 ทักษะปฐมวัย'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-amber-100 border border-white/20 shrink-0">
            <Calendar className="w-3 h-3 text-amber-300" />
            <span>{weekLabel.split(' (')[0]}</span>
            <span className="opacity-60">•</span>
            <span className="text-yellow-200 font-bold">เหลือ {daysRemaining} วัน</span>
          </div>
        </div>

        {/* Highlight Star Skill Card */}
        <div className="bg-white/95 backdrop-blur-xs rounded-2xl p-3 sm:p-3.5 text-slate-800 shadow-md border border-white/40 my-3 relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-200 border border-amber-300 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              {bestSkillAnalysis.skill.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  ทักษะดาวเด่นที่ทำได้ดีที่สุด
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ความแม่นยำ {bestSkillAnalysis.accuracy}%
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 font-display mt-0.5">
                {bestSkillAnalysis.skill.name.th}
              </h4>
              <p className="text-[11px] text-slate-600 font-medium line-clamp-2 mt-0.5">
                {bestSkillAnalysis.explanationTh}
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-center">
            <div className="bg-amber-50/80 rounded-xl p-1.5 border border-amber-200/60">
              <span className="text-[10px] text-slate-500 font-bold block">สถิติสูงสุดสัปดาห์นี้</span>
              <span className="text-sm sm:text-base font-black text-amber-700">
                {challengeState.bestScore > 0 ? `${challengeState.bestScore} คะแนน` : 'รอสร้างสถิติแรก ⭐'}
              </span>
            </div>
            <div className="bg-rose-50/80 rounded-xl p-1.5 border border-rose-200/60">
              <span className="text-[10px] text-slate-500 font-bold block">เป้าหมายทำลายสถิติ</span>
              <span className="text-sm sm:text-base font-black text-rose-700">
                &gt; {challengeState.bestScore > 0 ? challengeState.bestScore : 50} คะแนน
              </span>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex items-center gap-2 relative z-10">
          <button
            type="button"
            id="btn-start-weekly-challenge-direct"
            onClick={handleStartDirectly}
            className="flex-1 bg-white hover:bg-amber-50 text-amber-950 font-black py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 text-xs sm:text-sm"
          >
            <Play className="w-4 h-4 fill-amber-700 text-amber-700 ml-0.5" />
            <span>เริ่มท้าทายทำลายสถิติ! (สุ่มเฉพาะทักษะนี้) 🚀</span>
          </button>

          <button
            type="button"
            id="btn-open-weekly-challenge-modal"
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-2.5 bg-black/20 hover:bg-black/30 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0"
            title="ดูกติกาและรางวัล"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">กติกา</span>
          </button>
        </div>

        {/* Bonus reward tagline */}
        <div className="mt-2 text-center text-[10px] sm:text-[11px] text-amber-100 font-semibold flex items-center justify-center gap-1">
          <span>👑 ทำลายสถิติรับคะแนนโบนัสสะสม</span>
          <span className="text-yellow-200 font-black">+{WEEKLY_CHALLENGE_RECORD_BONUS} คะแนน</span>
          <span>ทันที!</span>
        </div>
      </div>

      {/* Modal */}
      <WeeklyChallengeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeProfile={activeProfile}
        bestSkillAnalysis={bestSkillAnalysis}
        curriculumMode={curriculumMode}
        onStartChallenge={() => onStartWeeklyChallenge(bestSkillAnalysis.subject)}
        soundVolume={soundVolume}
      />
    </>
  );
};
