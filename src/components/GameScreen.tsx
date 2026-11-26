import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, CheckCircle2, XCircle, ArrowRight, Sparkles, RotateCcw, Cloud, Trophy, Flame } from 'lucide-react';
import { Badge, GameSettings, HandPoint, Question, QuestionOption, Subject, WeeklyChallengeAwardResult } from '../types';
import { soundEffects, speakText, isAudioMuted, toggleAudioMute, subscribeAudioMute } from '../services/audioService';
import { AdaptiveState, getDifficultyName, getDifficultyTheme } from '../services/adaptiveDifficultyService';
import { PendingSyncIndicator } from './PendingSyncIndicator';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { isImageUrl } from '../utils/imageUtils';
import { CelebrationParticles } from './CelebrationParticles';
import { DifficultyStreakIndicator, getMasteryLevel } from './DifficultyStreakIndicator';
import { LearningBuddyMascot } from './LearningBuddyMascot';
import { RoundLearningRecap } from './RoundLearningRecap';
import { MilestoneCelebrationPopup, MilestoneEvent } from './MilestoneCelebrationPopup';
import {
  triggerRoundSuccessConfetti,
  triggerBadgeUnlockedConfetti,
  triggerInteractiveConfetti,
} from '../utils/confettiCelebration';
import { PhonicsVoicePronunciationBar } from './PhonicsVoicePronunciationBar';

interface GameScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  settings: GameSettings;
  handPoint: HandPoint | null;
  onDwellProgressChange: (progress: number, isHovering: boolean) => void;
  onAnswerSelected: (optionId: string, isCorrect: boolean) => void;
  onNextQuestion: () => void;
  roundComplete: boolean;
  roundResults: { question: Question; isCorrect: boolean }[];
  onRestartRound: () => void;
  onOpenReport: () => void;
  onReturnToHome?: () => void;
  effectiveMode?: 'touch' | 'hand';
  isAutoSwitched?: boolean;
  dualSaveStatus?: 'idle' | 'saving' | 'saved';
  adaptiveState?: AdaptiveState;
  dailyMissionAwarded?: { bonusPoints: number; subject: Subject; skillTitleTh?: string; skillIcon?: string } | null;
  weeklyChallengeAwarded?: WeeklyChallengeAwardResult | null;
  activeWeeklyChallengeSkill?: Subject | null;
  newlyUnlockedBadges?: Badge[];
  onOpenBadges?: () => void;
  currentStreak?: number;
  onToggleSound?: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  question,
  questionNumber,
  totalQuestions,
  settings,
  handPoint,
  onDwellProgressChange,
  onAnswerSelected,
  onNextQuestion,
  roundComplete,
  roundResults,
  onRestartRound,
  onOpenReport,
  onReturnToHome,
  effectiveMode = 'hand',
  isAutoSwitched = false,
  dualSaveStatus = 'saved',
  adaptiveState,
  dailyMissionAwarded,
  weeklyChallengeAwarded,
  activeWeeklyChallengeSkill,
  newlyUnlockedBadges,
  onOpenBadges,
  currentStreak = 0,
  onToggleSound,
}) => {
  const isOnline = useOnlineStatus();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [hoveredOptionId, setHoveredOptionId] = useState<string | null>(null);
  const [dwellProgress, setDwellProgress] = useState(0);

  // Difficulty streak tracking for high-difficulty mastery visual feedback
  const [difficultyStreak, setDifficultyStreak] = useState(0);
  const [maxDifficultyStreak, setMaxDifficultyStreak] = useState(0);
  const [isStreakAnimating, setIsStreakAnimating] = useState(false);

  // Animated In-Game Milestone Celebration Popups Queue
  const [milestoneQueue, setMilestoneQueue] = useState<MilestoneEvent[]>([]);
  const [activeMilestone, setActiveMilestone] = useState<MilestoneEvent | null>(null);
  const triggeredMilestonesRef = useRef<Set<string>>(new Set());
  const inRoundStreakRef = useRef<number>(0);

  // Milestone Queue consumer
  useEffect(() => {
    if (!activeMilestone && milestoneQueue.length > 0) {
      const next = milestoneQueue[0];
      setActiveMilestone(next);
      setMilestoneQueue((prev) => prev.slice(1));
    }
  }, [activeMilestone, milestoneQueue]);

  const handleDismissMilestone = useCallback(() => {
    setActiveMilestone(null);
  }, []);

  // Determine if current question is high difficulty (Level 2 or 3)
  const isHighDifficulty = useMemo(() => {
    const diff =
      (question.difficulty as number) ||
      (adaptiveState?.enabled ? adaptiveState.currentDifficulty : 1);
    return diff >= 2;
  }, [question.difficulty, adaptiveState?.enabled, adaptiveState?.currentDifficulty]);

  // Reset difficulty streak and milestone triggers when round begins or restarts
  useEffect(() => {
    if (!roundComplete && roundResults.length === 0) {
      setDifficultyStreak(0);
      setMaxDifficultyStreak(0);
      setIsStreakAnimating(false);
      inRoundStreakRef.current = 0;
      triggeredMilestonesRef.current.clear();
      setMilestoneQueue([]);
      setActiveMilestone(null);
    }
  }, [roundComplete, roundResults.length]);

  // Persistent Teacher Quick Sound Toggle state synced with audioService
  const [isSoundMuted, setIsSoundMuted] = useState(() => isAudioMuted() || settings.soundVolume <= 0.01);
  const [showTeacherSoundToast, setShowTeacherSoundToast] = useState(false);
  const soundToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsSoundMuted(isAudioMuted() || settings.soundVolume <= 0.01);
    const unsubscribe = subscribeAudioMute((muted) => {
      setIsSoundMuted(muted);
    });
    return unsubscribe;
  }, [settings.soundVolume]);

  const handleTeacherToggleSound = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (onToggleSound) {
        onToggleSound();
      } else {
        const nextMuted = toggleAudioMute();
        setIsSoundMuted(nextMuted);
        if (!nextMuted) {
          soundEffects.playTap(settings.soundVolume > 0.01 ? settings.soundVolume : 0.8);
        }
      }

      // Show brief confirmation badge next to the button
      setShowTeacherSoundToast(true);
      if (soundToastTimerRef.current) {
        clearTimeout(soundToastTimerRef.current);
      }
      soundToastTimerRef.current = setTimeout(() => {
        setShowTeacherSoundToast(false);
      }, 1600);
    },
    [onToggleSound, settings.soundVolume]
  );

  const renderTeacherSoundToggleButton = () => (
    <div
      id="teacher-sound-control-widget"
      className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-40 flex items-center gap-2 select-none pointer-events-auto"
    >
      <button
        type="button"
        id="btn-teacher-sound-toggle"
        data-testid="teacher-sound-toggle"
        onClick={handleTeacherToggleSound}
        className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border-2 shadow-lg backdrop-blur-md cursor-pointer transition-all duration-200 active:scale-95 ${
          isSoundMuted
            ? 'bg-rose-50/95 hover:bg-rose-100 border-rose-300 hover:border-rose-400 text-rose-700 shadow-rose-200/50'
            : 'bg-white/95 hover:bg-white border-emerald-300/80 hover:border-emerald-400 text-slate-700 shadow-emerald-100/50'
        }`}
        aria-label={isSoundMuted ? 'เปิดเสียงทั้งหมด (สำหรับคุณครู)' : 'ปิดเสียงทั้งหมดทันที (สำหรับคุณครู)'}
        title={
          isSoundMuted
            ? 'เสียงปิดอยู่ • คลิกเพื่อเปิดเสียงทั้งหมดทันที (Teacher Global Sound Toggle)'
            : 'เสียงเปิดอยู่ • คลิกเพื่อปิดเสียงทั้งหมดทันที (Teacher Global Sound Toggle)'
        }
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
            isSoundMuted ? 'bg-rose-200/80 text-rose-700' : 'bg-emerald-100 text-emerald-600'
          }`}
        >
          {isSoundMuted ? (
            <VolumeX className="w-3.5 h-3.5 animate-pulse" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 text-left">
          <span className="text-[11px] sm:text-xs font-black tracking-tight whitespace-nowrap">
            {isSoundMuted ? (
              <span className="text-rose-700">ปิดเสียง</span>
            ) : (
              <span className="text-emerald-800">เปิดเสียง</span>
            )}
          </span>
          <span
            className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded-full whitespace-nowrap flex items-center gap-0.5 ${
              isSoundMuted
                ? 'bg-rose-200 text-rose-900 border border-rose-300'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
          >
            <span>👩‍🏫</span>
            <span className="hidden xs:inline">ครู</span>
          </span>
        </div>
      </button>

      {/* Confirmation feedback pop */}
      {showTeacherSoundToast && (
        <div
          className={`text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-md border animate-in fade-in slide-in-from-left-2 duration-150 whitespace-nowrap ${
            isSoundMuted
              ? 'bg-rose-900 text-rose-100 border-rose-700'
              : 'bg-emerald-900 text-emerald-100 border-emerald-700'
          }`}
        >
          {isSoundMuted ? '🔇 ปิดเสียงทั้งแอปแล้ว' : '🔊 เปิดเสียงทั้งแอปแล้ว'}
        </div>
      )}
    </div>
  );

  const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dwellStartTimeRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef<number>(0);
  const isLockedRef = useRef(false);
  const lastSpokenOptionIdRef = useRef<string | null>(null);

  const onDwellProgressChangeRef = useRef(onDwellProgressChange);
  useEffect(() => {
    onDwellProgressChangeRef.current = onDwellProgressChange;
  });

  const handleSelectAnswerRef = useRef<((optionId: string) => void) | null>(null);

  // Next button 1-second dwell state
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const [nextDwellProgress, setNextDwellProgress] = useState(0);
  const [isNextHovered, setIsNextHovered] = useState(false);
  const nextDwellStartTimeRef = useRef<number | null>(null);
  const nextTriggeredRef = useRef(false);
  const nextIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPointerTouchingNextRef = useRef(false);

  // Cancel Next button dwell
  const cancelNextDwell = useCallback(() => {
    if (nextIntervalRef.current) {
      clearInterval(nextIntervalRef.current);
      nextIntervalRef.current = null;
    }
    nextDwellStartTimeRef.current = null;
    isPointerTouchingNextRef.current = false;
    setIsNextHovered(false);
    setNextDwellProgress(0);
    onDwellProgressChangeRef.current(0, false);
  }, []);

  // Start Next button 1-second dwell
  const startNextDwell = useCallback(() => {
    if (nextTriggeredRef.current || !isAnswered) return;

    if (nextIntervalRef.current) {
      clearInterval(nextIntervalRef.current);
      nextIntervalRef.current = null;
    }

    setIsNextHovered(true);
    nextDwellStartTimeRef.current = Date.now();

    nextIntervalRef.current = setInterval(() => {
      if (!nextDwellStartTimeRef.current || nextTriggeredRef.current) return;

      const elapsedMs = Date.now() - nextDwellStartTimeRef.current;
      const progress = Math.min(1, elapsedMs / 1000); // 1.0 second dwell

      setNextDwellProgress(progress);
      onDwellProgressChangeRef.current(progress, true);

      if (progress >= 1) {
        if (nextIntervalRef.current) {
          clearInterval(nextIntervalRef.current);
          nextIntervalRef.current = null;
        }
        nextTriggeredRef.current = true;
        nextDwellStartTimeRef.current = null;
        setIsNextHovered(false);
        setNextDwellProgress(0);
        onDwellProgressChangeRef.current(0, false);
        soundEffects.playTap(settings.soundVolume);
        onNextQuestion();
      }
    }, 25);
  }, [isAnswered, onNextQuestion, settings.soundVolume]);

  // Clean up Next button dwell timer on unmount
  useEffect(() => {
    return () => {
      if (nextIntervalRef.current) {
        clearInterval(nextIntervalRef.current);
      }
    };
  }, []);

  // Hand tracking hover detection on Next button when isAnswered is true
  useEffect(() => {
    if (!isAnswered || effectiveMode === 'touch' || !handPoint || !nextButtonRef.current) {
      return;
    }

    const rect = nextButtonRef.current.getBoundingClientRect();
    const px = handPoint.screenX;
    const py = handPoint.screenY;
    const isInside = px >= rect.left && px <= rect.right && py >= rect.top && py <= rect.bottom;

    if (isInside) {
      if (!isNextHovered && !nextTriggeredRef.current) {
        startNextDwell();
      }
    } else {
      if (isNextHovered && !isPointerTouchingNextRef.current) {
        cancelNextDwell();
      }
    }
  }, [handPoint, isAnswered, effectiveMode, isNextHovered, startNextDwell, cancelNextDwell]);

  // Read question automatically on question load if autoSpeak is enabled
  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setHoveredOptionId(null);
    setDwellProgress(0);
    isLockedRef.current = false;
    dwellStartTimeRef.current = null;
    lastSpokenOptionIdRef.current = null;
    nextTriggeredRef.current = false;
    cancelNextDwell();

    if (settings.autoSpeak) {
      const timer = setTimeout(() => {
        const textToRead = question.question[settings.language] || question.question.th;
        speakText(textToRead, settings.language, settings.voicePersona, settings.soundVolume);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [question.id, settings.autoSpeak, settings.language, settings.voicePersona, settings.soundVolume]);

  // Audio helper: Pronounce option label on mouse hover, tap/touch, or hand-tracking dwell
  const speakOptionLabel = useCallback(
    (optionId: string, force = false) => {
      if (isAnswered || roundComplete || isLockedRef.current) return;
      if (!force && lastSpokenOptionIdRef.current === optionId) return;

      lastSpokenOptionIdRef.current = optionId;
      const opt = question.options.find((o) => o.id === optionId);
      if (opt && settings.soundVolume > 0.01) {
        const text = opt.label[settings.language] || opt.label.th;
        speakText(text, settings.language, settings.voicePersona, settings.soundVolume);
      }
    },
    [isAnswered, roundComplete, question.options, settings.language, settings.voicePersona, settings.soundVolume]
  );

  const handleSelectAnswer = useCallback(
    (optionId: string) => {
      if (isLockedRef.current || isAnswered) return;
      isLockedRef.current = true;
      setIsAnswered(true);
      setSelectedOptionId(optionId);
      setHoveredOptionId(null);
      setDwellProgress(0);
      dwellStartTimeRef.current = null;
      onDwellProgressChangeRef.current(0, false);

      const opt = question.options.find((o) => o.id === optionId);
      if (opt && settings.soundVolume > 0.01) {
        const text = opt.label[settings.language] || opt.label.th;
        speakText(text, settings.language, settings.voicePersona, settings.soundVolume);
      }

      const isCorrect = optionId === question.correctOptionId;

      // In-game milestone detection for animated popups
      if (isCorrect) {
        inRoundStreakRef.current += 1;
        const currentStreakVal = Math.max(inRoundStreakRef.current, (currentStreak || 0) + 1);

        // Milestone A: '10 Correct Answers in a Row' (and 5, 15)
        if (currentStreakVal >= 15 && !triggeredMilestonesRef.current.has('streak_15')) {
          triggeredMilestonesRef.current.add('streak_15');
          setMilestoneQueue((prev) => [
            ...prev,
            {
              id: 'streak_15',
              type: 'streak',
              title: {
                th: '15 ตอบถูกติดกัน!',
                en: '15 Correct Answers in a Row!',
                zh: '连续答对15题！',
              },
              subtitle: {
                th: 'ระดับตำนาน! แม่นยำเกินร้อย พิชิต 15 ข้อติดกัน',
                en: 'Legendary precision! 15 consecutive answers without a flaw!',
                zh: '传奇级表现！连续答对15题！',
              },
              icon: '🏆',
              badgeLabel: {
                th: 'ตำนานไร้พ่าย 🏆',
                en: 'LEGENDARY STREAK 🏆',
                zh: '传奇连中 🏆',
              },
              themeGradient: 'from-purple-600 via-indigo-600 to-pink-600',
              accentBorder: 'border-purple-300',
              textColor: 'text-white',
              metricBadge: '15 ข้อรวด',
              soundType: 'victory',
            },
          ]);
        } else if (currentStreakVal >= 10 && !triggeredMilestonesRef.current.has('streak_10')) {
          triggeredMilestonesRef.current.add('streak_10');
          setMilestoneQueue((prev) => [
            ...prev,
            {
              id: 'streak_10',
              type: 'streak',
              title: {
                th: '10 ตอบถูกติดกัน!',
                en: '10 Correct Answers in a Row!',
                zh: '连续答对10题！',
              },
              subtitle: {
                th: 'สุดยอดอัจฉริยะ! สมาธิไร้ที่ติ ตอบถูกรวด 10 ข้อติดกัน!',
                en: 'Unstoppable Mastery! 10 flawless answers in a row!',
                zh: '无可匹敌！全神贯注连续攻克10道题！',
              },
              icon: '⚡👑',
              badgeLabel: {
                th: 'คอมโบขั้นเทพ ⚡',
                en: 'UNSTOPPABLE COMBO ⚡',
                zh: '超级连胜 ⚡',
              },
              themeGradient: 'from-amber-500 via-yellow-500 to-orange-600',
              accentBorder: 'border-yellow-200',
              textColor: 'text-amber-950',
              metricBadge: '10 ข้อรวด',
              soundType: 'victory',
            },
          ]);
        } else if (currentStreakVal >= 5 && !triggeredMilestonesRef.current.has('streak_5')) {
          triggeredMilestonesRef.current.add('streak_5');
          setMilestoneQueue((prev) => [
            ...prev,
            {
              id: 'streak_5',
              type: 'streak',
              title: {
                th: '5 ตอบถูกติดกัน!',
                en: '5 in a Row!',
                zh: '连续答对5题！',
              },
              subtitle: {
                th: 'พลังสมาธิยอดเยี่ยม! ตอบถูกรวดเดียว 5 ข้อแล้ว',
                en: 'Great focus! 5 consecutive correct answers',
                zh: '状态火热！已连续答对5题',
              },
              icon: '🔥',
              badgeLabel: {
                th: 'สตรีคไฟแรง 🔥',
                en: 'STREAK ON FIRE 🔥',
                zh: '连击火焰 🔥',
              },
              themeGradient: 'from-orange-500 via-amber-500 to-yellow-500',
              accentBorder: 'border-amber-300',
              textColor: 'text-amber-950',
              metricBadge: '5 ข้อรวด',
              soundType: 'success',
            },
          ]);
        }

        // Milestone B: '3 Subjects Mastered' (and 1, 5, 8)
        const updatedRound = [...roundResults, { question, isCorrect: true }];
        const subjectStats: Record<string, { total: number; correct: number }> = {};
        updatedRound.forEach((r) => {
          const s = r.question.subject;
          if (!subjectStats[s]) subjectStats[s] = { total: 0, correct: 0 };
          subjectStats[s].total += 1;
          if (r.isCorrect) subjectStats[s].correct += 1;
        });

        // A subject is mastered if child answered minimum required questions for that skill with high accuracy (>= 74%)
        const reqPerSubject = Math.min(2, settings.questionsPerSkill || 3);
        const masteredCount = Object.values(subjectStats).filter(
          (stat) => stat.total >= reqPerSubject && stat.correct / stat.total >= 0.74
        ).length;

        if (masteredCount >= 1 && !triggeredMilestonesRef.current.has('subject_mastery_1')) {
          triggeredMilestonesRef.current.add('subject_mastery_1');
          setMilestoneQueue((prev) => [
            ...prev,
            {
              id: 'subject_mastery_1',
              type: 'subject_mastery',
              title: {
                th: 'พิชิตวิชาแรกสำเร็จ!',
                en: 'First Subject Mastered!',
                zh: '首门学科通关！',
              },
              subtitle: {
                th: 'ก้าวแรกแห่งความสำเร็จ! บรรลุความเชี่ยวชาญในหมวดวิชานี้',
                en: 'Brilliant start! Complete mastery achieved in this subject',
                zh: '旗开得胜！已顺利掌握第一门学科',
              },
              icon: '🎓',
              badgeLabel: {
                th: 'ความเชี่ยวชาญวิชาการ 🎓',
                en: 'SUBJECT MASTERY 🎓',
                zh: '学科精通 🎓',
              },
              themeGradient: 'from-teal-600 via-emerald-600 to-green-600',
              accentBorder: 'border-emerald-300',
              textColor: 'text-white',
              metricBadge: '1/8 หมวดวิชา',
              soundType: 'success',
            },
          ]);
        }

        if (masteredCount >= 3 && !triggeredMilestonesRef.current.has('subject_mastery_3')) {
          triggeredMilestonesRef.current.add('subject_mastery_3');
          setMilestoneQueue((prev) => [
            ...prev,
            {
              id: 'subject_mastery_3',
              type: 'subject_mastery',
              title: {
                th: 'พิชิต 3 หมวดวิชาหลัก!',
                en: '3 Subjects Mastered!',
                zh: '三大主科全面精通！',
              },
              subtitle: {
                th: 'เก่งรอบด้าน! บรรลุความเชี่ยวชาญครบ 3 หมวดวิชาปฐมวัย',
                en: 'All-round excellence! 3 academic subjects conquered with mastery',
                zh: '多才多艺！三大幼儿学习领域已全面达标',
              },
              icon: '🌟📚',
              badgeLabel: {
                th: 'ผู้เชี่ยวชาญ 3 วิชาหลัก 🌟',
                en: '3 SUBJECTS MASTERED 🌟',
                zh: '三大科目通关 🌟',
              },
              themeGradient: 'from-indigo-600 via-purple-600 to-pink-600',
              accentBorder: 'border-indigo-300',
              textColor: 'text-white',
              metricBadge: '3/8 หมวดวิชา',
              soundType: 'victory',
            },
          ]);
        }

        if (masteredCount >= 5 && !triggeredMilestonesRef.current.has('subject_mastery_5')) {
          triggeredMilestonesRef.current.add('subject_mastery_5');
          setMilestoneQueue((prev) => [
            ...prev,
            {
              id: 'subject_mastery_5',
              type: 'subject_mastery',
              title: {
                th: 'พิชิต 5 หมวดวิชาปฐมวัย!',
                en: '5 Subjects Mastered!',
                zh: '五大学科融会贯通！',
              },
              subtitle: {
                th: 'สุดยอดคนเก่ง! บรรลุความเชี่ยวชาญ 5 ทักษะหลักหลักสูตร ศธ.',
                en: 'Outstanding scholar! 5 core curriculum areas mastered',
                zh: '出色学童！五项关键素养均达到优秀',
              },
              icon: '🚀',
              badgeLabel: {
                th: 'ดวงดาว 5 วิชา 🚀',
                en: '5 SUBJECTS MASTERED 🚀',
                zh: '五科达人 🚀',
              },
              themeGradient: 'from-blue-600 via-indigo-600 to-purple-700',
              accentBorder: 'border-sky-300',
              textColor: 'text-white',
              metricBadge: '5/8 หมวดวิชา',
              soundType: 'victory',
            },
          ]);
        }

        if (masteredCount >= 8 && !triggeredMilestonesRef.current.has('subject_mastery_8')) {
          triggeredMilestonesRef.current.add('subject_mastery_8');
          setMilestoneQueue((prev) => [
            ...prev,
            {
              id: 'subject_mastery_8',
              type: 'subject_mastery',
              title: {
                th: 'พิชิตครบ 8 ทักษะหลัก!',
                en: 'All 8 Core Skills Mastered!',
                zh: '八大核心素养全部通关！',
              },
              subtitle: {
                th: 'มหาบัณฑิตปฐมวัย! บรรลุความเชี่ยวชาญครบทุก 8 ทักษะหลัก!',
                en: 'Early Childhood Grandmaster! Complete mastery of all 8 core skills!',
                zh: '大满贯！八大幼儿核心素养全面达成！',
              },
              icon: '👑🏆',
              badgeLabel: {
                th: 'แชมเปี้ยน 8 ทักษะ 👑',
                en: 'GRAND MASTER 👑',
                zh: '至尊大满贯 👑',
              },
              themeGradient: 'from-amber-500 via-rose-500 to-purple-700',
              accentBorder: 'border-yellow-300',
              textColor: 'text-white',
              metricBadge: '8/8 ครบทุกวิชา',
              soundType: 'victory',
            },
          ]);
        }
        // Halfway mark milestone (e.g. 50% completed in this round)
        const halfwayNum = Math.ceil(totalQuestions / 2);
        if (
          totalQuestions >= 6 &&
          questionNumber === halfwayNum &&
          !triggeredMilestonesRef.current.has('halfway_mark')
        ) {
          triggeredMilestonesRef.current.add('halfway_mark');
          setMilestoneQueue((prev) => [
            ...prev,
            {
              id: 'halfway_mark',
              type: 'halfway',
              title: {
                th: 'ผ่านครึ่งทางแล้ว! สู้ๆ',
                en: 'Halfway Champion!',
                zh: '已过半程！继续加油！',
              },
              subtitle: {
                th: `เดินทางมาถึงข้อที่ ${questionNumber}/${totalQuestions} แล้ว อีกนิดเดียวจะถึงเป้าหมาย!`,
                en: `Reached question ${questionNumber}/${totalQuestions}! You are doing wonderfully!`,
                zh: `已经答完 ${questionNumber}/${totalQuestions} 题！距离胜利近在咫尺！`,
              },
              icon: '🏃‍♂️✨',
              badgeLabel: {
                th: 'ครึ่งทางสู่ชัยชนะ 🏃‍♂️',
                en: 'HALFWAY MARK 🏃‍♂️',
                zh: '胜利在望 🏃‍♂️',
              },
              themeGradient: 'from-sky-500 via-blue-600 to-indigo-600',
              accentBorder: 'border-sky-300',
              textColor: 'text-white',
              metricBadge: `${questionNumber}/${totalQuestions}`,
              soundType: 'success',
            },
          ]);
        }
      } else {
        // Reset streak on wrong answer
        inRoundStreakRef.current = 0;
      }

      // Update difficulty streak on high-difficulty questions
      const qDifficulty =
        (question.difficulty as number) ||
        (adaptiveState?.enabled ? adaptiveState.currentDifficulty : 1);
      const isHighDiff = qDifficulty >= 2;

      if (isHighDiff) {
        if (isCorrect) {
          const nextStreak = difficultyStreak + 1;
          setDifficultyStreak(nextStreak);
          setMaxDifficultyStreak((prev) => Math.max(prev, nextStreak));
          setIsStreakAnimating(true);
          setTimeout(() => setIsStreakAnimating(false), 2400);

          // If maintaining a streak on high difficulty, fire celebratory feedback
          if (nextStreak >= 2) {
            setTimeout(() => {
              try {
                confetti({
                  particleCount: nextStreak >= 3 ? 55 : 35,
                  spread: 70,
                  origin: { y: 0.45 },
                  colors: ['#F59E0B', '#EF4444', '#F97316', '#FBBF24', '#8B5CF6'],
                  disableForReducedMotion: true,
                });
              } catch {
                // Graceful fallback
              }
            }, 380);
          }

          // Milestone for 3 High-Difficulty questions mastered in a row
          if (nextStreak === 3 && !triggeredMilestonesRef.current.has('diff_streak_3')) {
            triggeredMilestonesRef.current.add('diff_streak_3');
            setMilestoneQueue((prev) => [
              ...prev,
              {
                id: 'diff_streak_3',
                type: 'difficulty',
                title: {
                  th: 'พิชิตโจทย์ยาก 3 ข้อติด!',
                  en: 'Hard Mode Mastery: 3 in a Row!',
                  zh: '高难突破：连过3道难题！',
                },
                subtitle: {
                  th: 'สุดยอดการวิเคราะห์! ฟันฝ่าโจทย์ท้าทายระดับสูงสำเร็จ 3 ข้อติดกัน',
                  en: 'Exceptional critical thinking! 3 advanced challenge questions conquered!',
                  zh: '卓越思维！连续攻克3道高难度思维挑战题！',
                },
                icon: '🔥🧠',
                badgeLabel: {
                  th: 'ยอดนักคิดขั้นสูง 🔥',
                  en: 'ADVANCED THINKER 🔥',
                  zh: '卓越思维者 🔥',
                },
                themeGradient: 'from-amber-600 via-rose-600 to-red-600',
                accentBorder: 'border-amber-300',
                textColor: 'text-white',
                metricBadge: 'โจทย์ยาก x3',
                soundType: 'victory',
              },
            ]);
          }
        } else {
          setDifficultyStreak(0);
          setIsStreakAnimating(false);
        }
      }

      setTimeout(() => {
        if (isCorrect) {
          soundEffects.playSuccess(settings.soundVolume);
          confetti({
            particleCount: 75,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
          });
        } else {
          soundEffects.playIncorrect(settings.soundVolume);
        }
      }, 350);

      onAnswerSelected(optionId, isCorrect);
    },
    [
      isAnswered,
      onAnswerSelected,
      question.correctOptionId,
      question.options,
      question.difficulty,
      adaptiveState,
      difficultyStreak,
      settings.language,
      settings.voicePersona,
      settings.soundVolume,
    ]
  );

  useEffect(() => {
    handleSelectAnswerRef.current = handleSelectAnswer;
  }, [handleSelectAnswer]);

  // Clean reset on unmount
  useEffect(() => {
    return () => {
      onDwellProgressChangeRef.current(0, false);
    };
  }, []);

  // Hand Tracking / Hit-testing: Updates hoveredOptionId ONLY when target changes
  useEffect(() => {
    if (effectiveMode === 'touch' || isAnswered || isLockedRef.current || roundComplete || !handPoint) {
      if (hoveredOptionId !== null) {
        setHoveredOptionId(null);
        setDwellProgress(0);
        dwellStartTimeRef.current = null;
        onDwellProgressChangeRef.current(0, false);
      }
      return;
    }

    const px = handPoint.screenX;
    const py = handPoint.screenY;
    let matchedOptionId: string | null = null;

    for (const [id, rawEl] of Object.entries(optionRefs.current)) {
      const el = rawEl as HTMLButtonElement | null;
      if (el) {
        const rect = el.getBoundingClientRect();
        if (px >= rect.left && px <= rect.right && py >= rect.top && py <= rect.bottom) {
          matchedOptionId = id;
          break;
        }
      }
    }

    if (matchedOptionId !== hoveredOptionId) {
      setHoveredOptionId(matchedOptionId);
      setDwellProgress(0);
      dwellStartTimeRef.current = matchedOptionId ? Date.now() : null;
      onDwellProgressChangeRef.current(0, Boolean(matchedOptionId));
      if (matchedOptionId) {
        speakOptionLabel(matchedOptionId);
      } else {
        lastSpokenOptionIdRef.current = null;
      }
    }
  }, [handPoint, hoveredOptionId, isAnswered, roundComplete]);

  // Dwell countdown timer while an option is actively hovered (Only in hand mode)
  useEffect(() => {
    if (effectiveMode === 'touch' || !hoveredOptionId || isAnswered || roundComplete) {
      return;
    }

    dwellStartTimeRef.current = Date.now();
    lastTickTimeRef.current = Date.now();

    const interval = setInterval(() => {
      if (!dwellStartTimeRef.current || isLockedRef.current) return;

      const elapsedSec = (Date.now() - dwellStartTimeRef.current) / 1000;
      const progress = Math.min(1, elapsedSec / settings.dwellTimeSeconds);

      setDwellProgress(progress);
      onDwellProgressChangeRef.current(progress, true);

      if (Date.now() - lastTickTimeRef.current > 250) {
        soundEffects.playTick(progress, settings.soundVolume);
        lastTickTimeRef.current = Date.now();
      }

      if (progress >= 1) {
        clearInterval(interval);
        dwellStartTimeRef.current = null;
        setDwellProgress(0);
        onDwellProgressChangeRef.current(0, false);
        const targetId = hoveredOptionId;
        setHoveredOptionId(null);
        if (handleSelectAnswerRef.current) {
          handleSelectAnswerRef.current(targetId);
        }
      }
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, [hoveredOptionId, isAnswered, roundComplete, settings.dwellTimeSeconds, settings.soundVolume]);

  // Trigger celebratory confetti and particle animations on round completion or badge earned
  const hasCelebratedRoundRef = useRef(false);

  useEffect(() => {
    if (roundComplete && !hasCelebratedRoundRef.current) {
      hasCelebratedRoundRef.current = true;

      const totalCorrect = roundResults.filter((r) => r.isCorrect).length;
      const accuracy = roundResults.length > 0 ? Math.round((totalCorrect / roundResults.length) * 100) : 0;
      const starCount = accuracy >= 85 ? 3 : accuracy >= 55 ? 2 : 1;
      const isPerfect = totalCorrect === roundResults.length && roundResults.length > 0;
      const hasBadge = Boolean(newlyUnlockedBadges && newlyUnlockedBadges.length > 0);

      // Trigger celebratory multi-stage confetti explosion
      triggerRoundSuccessConfetti({
        starCount,
        hasBadge,
        isPerfect,
      });

      // Special golden fireworks & fanfare if badge unlocked
      if (hasBadge) {
        setTimeout(() => {
          triggerBadgeUnlockedConfetti();
          if (settings.soundVolume > 0.01) {
            soundEffects.playVictory(settings.soundVolume);
          }
        }, 450);
      }
    } else if (!roundComplete) {
      hasCelebratedRoundRef.current = false;
    }
  }, [roundComplete, roundResults, newlyUnlockedBadges, settings.soundVolume]);

  // Round summary view
  if (roundComplete) {
    const totalCorrect = roundResults.filter((r) => r.isCorrect).length;
    const accuracy = roundResults.length > 0 ? Math.round((totalCorrect / roundResults.length) * 100) : 0;
    const starCount = accuracy >= 85 ? 3 : accuracy >= 55 ? 2 : 1;

    return (
      <main
        id="round-summary-view"
        className="flex-1 flex flex-col items-center justify-center p-4 max-w-xl mx-auto w-full text-center select-none relative overflow-hidden"
      >
        {/* Floating Celebration Particles Effect */}
        <CelebrationParticles
          active={roundComplete}
          theme={newlyUnlockedBadges && newlyUnlockedBadges.length > 0 ? 'gold' : 'rainbow'}
          particleCount={starCount === 3 ? 55 : 35}
        />

        <div className="bg-white rounded-[40px] shadow-2xl border-4 border-blue-200 overflow-hidden w-full animate-in zoom-in-95 duration-200 relative z-20">
          <div className="bg-blue-500 p-6 text-center border-b-4 border-blue-700 text-white">
            <div className="flex justify-center gap-2 text-5xl mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`transition-transform duration-300 ${
                    i < starCount ? 'scale-110 animate-bounce' : 'opacity-40 grayscale'
                  }`}
                >
                  ⭐
                </span>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mb-1 font-display">
              {starCount === 3
                ? 'เก่งมากๆ เลยคนเก่ง! 🎉'
                : starCount === 2
                ? 'ทำได้ดีมากจ้า! 👏'
                : 'พยายามได้ดีมากเลย! 💖'}
            </h2>
            <p className="text-blue-100 text-sm font-semibold">
              ตอบถูก {totalCorrect} จาก {roundResults.length} ข้อ (ความแม่นยำ {accuracy}%)
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Newly Unlocked Badge Celebration Card */}
            {newlyUnlockedBadges && newlyUnlockedBadges.length > 0 && (
              <div
                id="newly-unlocked-badge-celebration"
                className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-3xl p-4 sm:p-5 text-amber-950 shadow-xl border-3 border-yellow-200 animate-in zoom-in-95 duration-300 relative overflow-hidden"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl sm:text-3xl animate-bounce">🏆</span>
                  <h3 className="text-base sm:text-xl font-black font-display tracking-tight text-amber-950 drop-shadow-xs">
                    ปลดล็อกเหรียญรางวัลใหม่! 🎉
                  </h3>
                </div>
                <div className="space-y-2 mt-2">
                  {newlyUnlockedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="bg-white/95 backdrop-blur-xs p-3 rounded-2xl border-2 border-amber-300/80 shadow-md flex items-center gap-3.5 text-left"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-200 border-2 border-amber-400 flex items-center justify-center text-3xl shrink-0 shadow-inner animate-pulse">
                        {badge.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base font-black text-amber-950 font-display">
                            {badge.title[settings.language] || badge.title.th}
                          </span>
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300">
                            เหรียญใหม่ ⭐
                          </span>
                        </div>
                        <p className="text-xs text-amber-900 font-semibold line-clamp-2 mt-0.5">
                          {badge.description[settings.language] || badge.description.th}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {onOpenBadges && (
                  <div className="mt-3 flex justify-center">
                    <button
                      type="button"
                      id="btn-view-all-badges-summary"
                      onClick={onOpenBadges}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-950 bg-white/90 hover:bg-white px-4 py-2 rounded-full border-2 border-amber-300 shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
                    >
                      <Trophy className="w-4 h-4 text-amber-600" />
                      <span>ดูตู้สะสมเหรียญรางวัลทั้งหมด</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Daily Mission Bonus Banner */}
            {dailyMissionAwarded && (
              <div
                id="daily-mission-completed-banner"
                className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-4 sm:p-5 text-white shadow-lg border-2 border-amber-300 animate-in zoom-in-95 duration-300"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl sm:text-3xl animate-bounce">🎯</span>
                  <h3 className="text-base sm:text-xl font-black font-display tracking-tight text-white drop-shadow-xs">
                    พิชิตภารกิจประจำวันสำเร็จ! 🎉
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-bold text-amber-50">
                  ทำแบบทดสอบหมวด "{dailyMissionAwarded.skillTitleTh || 'วิชาประจำวัน'}" จบ 1 รอบ
                </p>
                <div className="mt-2.5 inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-4 py-1.5 rounded-full border border-white/30 text-white font-black text-xs sm:text-sm shadow-xs">
                  <span>🏆 คะแนนโบนัสพิเศษสะสมเข้าโปรไฟล์</span>
                  <span className="text-yellow-100 text-sm sm:text-base font-black">
                    +{dailyMissionAwarded.bonusPoints} คะแนน
                  </span>
                  <span>⭐</span>
                </div>
              </div>
            )}

            {/* Weekly Challenge Award & Record Broken Banner */}
            {weeklyChallengeAwarded && (
              <div
                id="weekly-challenge-award-banner"
                className={`rounded-3xl p-4 sm:p-5 text-white shadow-xl border-3 animate-in zoom-in-95 duration-300 relative overflow-hidden ${
                  weeklyChallengeAwarded.isNewRecord
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 border-yellow-200'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 border-blue-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <span className="text-3xl animate-bounce">
                    {weeklyChallengeAwarded.isNewRecord ? '👑' : '🎯'}
                  </span>
                  <h3 className="text-base sm:text-xl font-black font-display tracking-tight text-white drop-shadow-xs">
                    {weeklyChallengeAwarded.isNewRecord
                      ? 'ยินดีด้วย! คุณทำลายสถิติประจำสัปดาห์สำเร็จ! 🎉'
                      : 'ท้าทายประจำสัปดาห์สำเร็จ! 👏'}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-bold text-amber-50">
                  {weeklyChallengeAwarded.isNewRecord
                    ? `ทำสถิติใหม่สูงสุดในวิชา "${weeklyChallengeAwarded.skillTitleTh}" ที่ ${weeklyChallengeAwarded.newBestScore} คะแนน! (เดิม ${weeklyChallengeAwarded.previousBestScore} คะแนน)`
                    : `จบการทดสอบทักษะดาวเด่น "${weeklyChallengeAwarded.skillTitleTh}" ได้ ${weeklyChallengeAwarded.roundScore} คะแนน (สถิติเดิม ${weeklyChallengeAwarded.previousBestScore} คะแนน)`}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-4 py-1.5 rounded-full border border-white/30 text-white font-black text-xs sm:text-sm shadow-xs">
                  <span>
                    {weeklyChallengeAwarded.isNewRecord
                      ? '⭐ โบนัสทำลายสถิติสะสมเข้าโปรไฟล์:'
                      : '🌟 โบนัสความพยายามท้าทาย:'}
                  </span>
                  <span className="text-yellow-200 text-sm sm:text-base font-black">
                    +{weeklyChallengeAwarded.bonusPoints} คะแนน
                  </span>
                  <span>🏆</span>
                </div>
              </div>
            )}

            {/* High-Difficulty Mastery & Streak Showcase in Round Summary */}
            {maxDifficultyStreak > 0 && (
              <div
                id="summary-difficulty-streak-card"
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-3.5 sm:p-4 text-white shadow-lg border-2 border-amber-300 flex items-center justify-between gap-3 text-left animate-in zoom-in-95 duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shrink-0 shadow-inner">
                    {maxDifficultyStreak >= 4 ? '👑' : maxDifficultyStreak >= 3 ? '🔥' : '⚡'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-100">
                        สตรีกระดับท้าทายสูงสุด (Mastery Streak)
                      </span>
                      <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.2 rounded-full">
                        {getMasteryLevel(maxDifficultyStreak).badgeTh}
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-black font-display text-white mt-0.5">
                      ทำสตรีกได้ถึง {maxDifficultyStreak} ข้อติดต่อกัน! ({getMasteryLevel(maxDifficultyStreak).titleTh})
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-2xl sm:text-3xl font-black font-display text-yellow-200">
                    {maxDifficultyStreak}x 🔥
                  </div>
                  <div className="text-[10px] text-amber-100 font-semibold">Mastery Streak</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 rounded-3xl p-4 border-2 border-yellow-200 border-b-6 flex flex-col items-center">
                <span className="text-xs text-yellow-700 font-black uppercase">คะแนนรอบนี้</span>
                <span className="text-3xl md:text-4xl font-black text-yellow-800 font-display mt-1">
                  +{totalCorrect * 10}
                </span>
              </div>
              <div className="bg-emerald-50 rounded-3xl p-4 border-2 border-emerald-200 border-b-6 flex flex-col items-center">
                <span className="text-xs text-emerald-700 font-black uppercase">ความแม่นยำ</span>
                <span className="text-3xl md:text-4xl font-black text-emerald-800 font-display mt-1">
                  {accuracy}%
                </span>
              </div>
            </div>

            {/* Post-Game Learning Recap: Animated Skill Mastery Bar Charts */}
            <RoundLearningRecap
              roundResults={roundResults}
              settings={settings}
              onTriggerConfetti={triggerInteractiveConfetti}
            />

            {/* Adaptive Difficulty Round Summary */}
            {adaptiveState?.enabled && (
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-3 sm:p-4 border-2 border-indigo-200 text-left">
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">🎯</span>
                    <span className="text-xs sm:text-sm font-black text-indigo-950">
                      ระดับความยากแบบปรับตัว (Adaptive Difficulty)
                    </span>
                  </div>
                  <span className="text-[11px] font-black bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-300 flex items-center gap-1">
                    <span>สูงสุด:</span>
                    <span>{getDifficultyTheme(adaptiveState.highestDifficultyReached).icon}</span>
                    <span>{getDifficultyName(adaptiveState.highestDifficultyReached, settings.language)}</span>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {([1, 2, 3] as const).map((lvl) => {
                    const total = adaptiveState.difficultyCounts[lvl] || 0;
                    const correct = adaptiveState.difficultyCorrectCounts[lvl] || 0;
                    const theme = getDifficultyTheme(lvl);
                    return (
                      <div key={lvl} className={`p-2 rounded-xl border ${theme.bgClass} ${theme.borderClass}`}>
                        <div className="text-[11px] font-black flex items-center justify-center gap-1">
                          <span>{theme.icon}</span>
                          <span>{theme.label}</span>
                        </div>
                        <div className="text-sm sm:text-base font-black text-slate-800 mt-0.5">
                          {correct}/{total} ข้อ
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          {total > 0 ? `${Math.round((correct / total) * 100)}% แม่นยำ` : 'ยังไม่ได้เล่น'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dual Save Cloud & Google Sheets Notification */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 bg-emerald-50/90 border border-emerald-300 rounded-2xl p-2.5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Cloud className={`w-4 h-4 text-emerald-600 shrink-0 ${dualSaveStatus === 'saving' ? 'animate-spin' : ''}`} />
                <span>
                  {!isOnline
                    ? 'โหมดออฟไลน์: บันทึกคะแนนลงในเครื่องเรียบร้อยแล้ว (รอซิงก์ขึ้นคลาวด์เมื่อออนไลน์) 📴'
                    : dualSaveStatus === 'saving'
                    ? 'กำลังบันทึกคะแนนลง Google Sheets และ Firebase Cloud...'
                    : 'บันทึกผลการเล่นลง Google Sheets & Firebase Cloud สำเร็จเรียบร้อยแล้ว (ซิงค์อัตโนมัติ) ☁️📊'}
                </span>
              </div>
              <PendingSyncIndicator variant="compact" />
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
              <button
                id="btn-play-again"
                onClick={onRestartRound}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base md:text-lg py-3 px-4 rounded-2xl border-b-4 border-emerald-700 active:translate-y-1 active:border-b-0 shadow-lg cursor-pointer transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                <span>เล่นรอบใหม่ 🚀</span>
              </button>
              <button
                type="button"
                id="btn-celebrate-again"
                onClick={() => {
                  triggerInteractiveConfetti();
                  if (settings.soundVolume > 0.01) {
                    soundEffects.playSuccess(settings.soundVolume);
                  }
                }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-black text-base md:text-lg py-3 px-4 rounded-2xl border-b-4 border-pink-700 active:translate-y-1 active:border-b-0 shadow-lg cursor-pointer transition-all hover:scale-102 active:scale-98"
                title="กดเพื่อจุดพลุฉลองอีกรอบ"
              >
                <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
                <span>จุดพลุฉลอง! 🎉</span>
              </button>
              <button
                id="btn-summary-view-report"
                onClick={onOpenReport}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base md:text-lg py-3 px-4 rounded-2xl border-b-4 border-indigo-800 active:translate-y-1 active:border-b-0 shadow-lg cursor-pointer transition-all"
              >
                <span>ดูรายงานผล 📊</span>
              </button>
              {onReturnToHome && (
                <button
                  id="btn-summary-home"
                  onClick={onReturnToHome}
                  className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-black text-base md:text-lg py-3 px-4 rounded-2xl border-b-4 border-slate-950 active:translate-y-1 active:border-b-0 shadow-lg cursor-pointer transition-all"
                >
                  <span>👥 สลับโปรไฟล์</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Floating Learning Buddy Mascot */}
        <LearningBuddyMascot
          question={question}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          settings={settings}
          isAnswered={isAnswered}
          isCorrect={selectedOptionId === question.correctOptionId}
          roundComplete={roundComplete}
          effectiveMode={effectiveMode}
          dwellProgress={dwellProgress}
        />

        {/* Persistent Teacher Quick Sound Toggle Mini-Button */}
        {renderTeacherSoundToggleButton()}
      </main>
    );
  }

  const optionPalette = [
    {
      bg: 'bg-orange-50 hover:bg-orange-100',
      border: 'border-orange-200 hover:border-orange-300',
      text: 'text-orange-600',
      ring: 'ring-orange-300',
    },
    {
      bg: 'bg-emerald-50 hover:bg-emerald-100',
      border: 'border-emerald-300 hover:border-emerald-400',
      text: 'text-emerald-600',
      ring: 'ring-emerald-300',
    },
    {
      bg: 'bg-blue-50 hover:bg-blue-100',
      border: 'border-blue-200 hover:border-blue-300',
      text: 'text-blue-600',
      ring: 'ring-blue-300',
    },
    {
      bg: 'bg-purple-50 hover:bg-purple-100',
      border: 'border-purple-200 hover:border-purple-300',
      text: 'text-purple-600',
      ring: 'ring-purple-300',
    },
  ];

  return (
    <main
      id="game-active-stage"
      className="flex-1 min-h-0 flex flex-col justify-between p-1 sm:p-2 md:p-3 max-w-5xl mx-auto w-full select-none"
    >
      {/* Central Interactive Question Card with Vibrant Palette styling */}
      <div className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[36px] shadow-xl border-2 sm:border-4 border-blue-200 relative flex flex-col flex-1 min-h-0 mb-1.5 sm:mb-2 overflow-hidden">
        {/* Blue Top Header with Question & Progress Segments */}
        <div className="bg-blue-500 p-2 sm:p-3 md:p-3.5 text-center border-b-2 sm:border-b-4 border-blue-700 relative text-white shrink-0">
          {effectiveMode === 'touch' && (
            <div className="inline-flex items-center gap-1.5 bg-amber-300 text-amber-950 px-2.5 py-0.5 rounded-full text-[11px] font-black shadow-xs mb-1 border border-amber-400">
              <span>📱</span>
              <span>โหมดสัมผัสหน้าจอ (แตะการ์ดคำตอบได้ทันที)</span>
              {isAutoSwitched && (
                <span className="bg-amber-600 text-white text-[9px] px-1.5 py-0.2 rounded-full">
                  ตรวจพบมือถือ
                </span>
              )}
            </div>
          )}

          {activeWeeklyChallengeSkill && (
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-amber-950 px-3 py-1 rounded-full text-xs font-black shadow-md mb-1.5 border border-amber-300">
              <span className="animate-bounce">🏆</span>
              <span>โหมดท้าทายประจำสัปดาห์ (Weekly Challenge) • สุ่มทักษะดาวเด่น!</span>
              <span className="text-white bg-black/30 px-2 py-0.2 rounded-full text-[10px] hidden sm:inline">
                ทำลายสถิติรับโบนัส 👑
              </span>
            </div>
          )}

          {/* Difficulty Streak & High-Difficulty Mastery Indicator */}
          {isHighDifficulty || difficultyStreak > 0 ? (
            <div className="mb-2">
              <DifficultyStreakIndicator
                streak={difficultyStreak}
                isHighDifficulty={isHighDifficulty}
                questionDifficulty={
                  (question.difficulty as number) ||
                  (adaptiveState?.enabled ? adaptiveState.currentDifficulty : 1)
                }
                language={settings.language}
                isAnimating={isStreakAnimating}
              />
            </div>
          ) : adaptiveState?.enabled ? (
            /* Adaptive Difficulty Level & Streak Meter for Level 1 questions */
            <div className="flex items-center justify-between gap-2 px-2.5 sm:px-3 py-1 bg-blue-600/70 rounded-xl mb-1.5 backdrop-blur-xs text-xs border border-blue-400/40">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] sm:text-xs font-black text-white flex items-center gap-1">
                  <span>{getDifficultyTheme(question.difficulty as 1 | 2 | 3).icon}</span>
                  <span>{getDifficultyName(question.difficulty as 1 | 2 | 3, settings.language)}</span>
                </span>
                <span className="text-[9px] sm:text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded-md font-semibold hidden xs:inline">
                  Adaptive
                </span>
              </div>

              {/* Streak gauge to next level */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-blue-100 font-semibold hidden sm:inline">
                  {adaptiveState.currentDifficulty < 3
                    ? `ถูกอีก ${Math.max(0, 3 - adaptiveState.consecutiveCorrect)} ข้อเพื่อเลื่อนระดับ:`
                    : 'ระดับท้าทายสูงสุด! 🔥'}
                </span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`text-xs sm:text-sm transition-all duration-300 ${
                        i < adaptiveState.consecutiveCorrect
                          ? 'scale-125 text-amber-300 drop-shadow-[0_0_6px_rgba(252,211,77,0.8)]'
                          : 'text-white/30'
                      }`}
                      title={`ข้อที่ ${i + 1}`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-center gap-1.5 sm:gap-3">
            <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-wide font-display text-white leading-snug">
              ❓ {question.question[settings.language] || question.question.th}
            </h1>
            <button
              id="btn-speak-question"
              onClick={() =>
                speakText(
                  question.question[settings.language] || question.question.th,
                  settings.language,
                  settings.voicePersona,
                  settings.soundVolume
                )
              }
              className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-transform active:scale-90 cursor-pointer shadow-xs shrink-0"
              title="กดเพื่อฟังเสียงคำถาม"
            >
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>

          {/* Segmented Progress Bars from Vibrant Design */}
          <div className="flex justify-center gap-1 sm:gap-1.5 mt-1 sm:mt-2">
            {Array.from({ length: Math.min(totalQuestions, 10) }).map((_, idx) => (
              <div
                key={idx}
                className={`w-4 sm:w-6 md:w-8 h-1.5 sm:h-2 rounded-full transition-all ${
                  idx < questionNumber ? 'bg-white shadow-xs' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Illustration / Content Body */}
        <div className="p-2 sm:p-2.5 md:p-3.5 flex-1 min-h-0 flex flex-col justify-start sm:justify-center overflow-y-auto overscroll-contain">
          {/* Illustration / Visual Aid */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 shrink-0">
            {isImageUrl(question.illustration) ? (
              <div className="py-1 flex items-center justify-center">
                <img
                  src={question.illustration}
                  alt={question.illustrationSubtitle?.th || 'ภาพประกอบโจทย์'}
                  className="max-h-24 sm:max-h-32 md:max-h-40 max-w-full object-contain rounded-2xl shadow-sm border-2 border-slate-200 bg-white p-1"
                />
              </div>
            ) : (
              <div className="text-3xl sm:text-4xl md:text-5xl tracking-wider py-0.5 select-none transform hover:scale-105 transition-transform drop-shadow-sm">
                {question.illustration}
              </div>
            )}
            {question.illustrationSubtitle && (
              <span className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 sm:px-3 sm:py-0.5 rounded-full">
                {question.illustrationSubtitle[settings.language] || question.illustrationSubtitle.th}
              </span>
            )}
          </div>

          {/* Phonics Voice Pronunciation & Star Challenge (Web Speech API) */}
          <PhonicsVoicePronunciationBar
            question={question}
            settings={settings}
            soundVolume={settings.soundVolume}
          />

          {/* Chunky 3D Answer Cards Grid from Vibrant Theme */}
          <div
            id="answer-options-grid"
            className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 w-full"
          >
            {question.options.map((opt: QuestionOption, idx: number) => {
              const isSelected = selectedOptionId === opt.id;
              const isHovered = hoveredOptionId === opt.id;
              const isCorrect = opt.id === question.correctOptionId;
              const pal = optionPalette[idx % optionPalette.length];

              let cardClasses = `${pal.bg} ${pal.border} ${pal.text} border-b-4 sm:border-b-8`;

              if (isAnswered) {
                if (isCorrect) {
                  cardClasses =
                    'bg-emerald-100 text-emerald-800 border-2 sm:border-4 border-emerald-500 border-b-4 sm:border-b-8 ring-2 sm:ring-4 ring-emerald-300 scale-101 sm:scale-102';
                } else if (isSelected && !isCorrect) {
                  cardClasses =
                    'bg-rose-50 text-rose-800 border-2 sm:border-4 border-rose-300 border-b-4 sm:border-b-8 opacity-60';
                } else {
                  cardClasses = 'bg-slate-50 text-slate-400 border-2 border-slate-200 opacity-40';
                }
              } else if (isHovered && effectiveMode === 'hand') {
                cardClasses = `${pal.bg} border-2 sm:border-4 ${pal.border} border-b-4 sm:border-b-8 scale-101 sm:scale-102 ring-2 sm:ring-4 ${pal.ring} shadow-lg`;
              }

              return (
                <button
                  key={opt.id}
                  id={`option-card-${opt.id}`}
                  ref={(el) => {
                    optionRefs.current[opt.id] = el;
                  }}
                  onClick={() => {
                    if (isAnswered || roundComplete) return;
                    if (effectiveMode === 'touch') {
                      speakOptionLabel(opt.id, true);
                    }
                    handleSelectAnswer(opt.id);
                  }}
                  onMouseEnter={() => {
                    if (effectiveMode === 'hand' && !isAnswered && !roundComplete) {
                      setHoveredOptionId(opt.id);
                      speakOptionLabel(opt.id);
                    }
                  }}
                  onMouseMove={() => {
                    if (effectiveMode === 'hand' && !isAnswered && !roundComplete && hoveredOptionId !== opt.id) {
                      setHoveredOptionId(opt.id);
                      speakOptionLabel(opt.id);
                    }
                  }}
                  onPointerEnter={(e) => {
                    if (effectiveMode === 'hand' && e.pointerType === 'mouse' && !isAnswered && !roundComplete) {
                      setHoveredOptionId(opt.id);
                      speakOptionLabel(opt.id);
                    }
                  }}
                  onTouchStart={() => {
                    if (effectiveMode === 'hand' && !isAnswered && !roundComplete) {
                      setHoveredOptionId(opt.id);
                      speakOptionLabel(opt.id, true);
                    }
                  }}
                  onFocus={() => {
                    if (effectiveMode === 'hand' && !isAnswered && !roundComplete) {
                      setHoveredOptionId(opt.id);
                      speakOptionLabel(opt.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (effectiveMode === 'hand') {
                      if (hoveredOptionId === opt.id) {
                        setHoveredOptionId(null);
                        setDwellProgress(0);
                        dwellStartTimeRef.current = null;
                        onDwellProgressChangeRef.current(0, false);
                      }
                      lastSpokenOptionIdRef.current = null;
                    }
                  }}
                  disabled={isAnswered}
                  className={`rounded-2xl sm:rounded-3xl border-2 sm:border-4 p-2 sm:p-2.5 md:p-3 flex sm:flex-col flex-row items-center justify-between sm:justify-center relative group transition-all duration-150 cursor-pointer overflow-hidden min-h-[54px] sm:min-h-[90px] md:min-h-[110px] touch-manipulation active:scale-95 ${cardClasses}`}
                >
                  {/* Circular Dwell Progress from Theme HTML (Only in hand mode) */}
                  {effectiveMode === 'hand' && isHovered && !isAnswered && (
                    <div className="absolute top-2.5 right-2.5 z-20">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 transform -rotate-90">
                        <circle
                          cx="16"
                          cy="16"
                          r="13"
                          className="sm:hidden"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="82"
                          strokeDashoffset={82 - dwellProgress * 82}
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          className="hidden sm:block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeDasharray="100"
                          strokeDashoffset={100 - dwellProgress * 100}
                        />
                      </svg>
                      <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[9px] sm:text-[10px] font-black text-emerald-800">
                        {dwellProgress > 0
                          ? `${(settings.dwellTimeSeconds * (1 - dwellProgress)).toFixed(1)}s`
                          : ''}
                      </span>
                    </div>
                  )}

                  {/* Circular White Pod from Vibrant Theme */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-xl sm:rounded-full flex items-center justify-center mb-0 sm:mb-1.5 text-xl sm:text-2xl md:text-3xl shadow-inner border border-white shrink-0 overflow-hidden">
                    {isImageUrl(opt.icon) ? (
                      <img src={opt.icon} alt={opt.label.th} className="w-full h-full object-cover rounded-xl sm:rounded-full p-0.5" />
                    ) : (
                      opt.icon || '✨'
                    )}
                  </div>

                  {/* Label & Audio Pronounce */}
                  <div className="flex items-center justify-center gap-1.5 z-10 flex-1 sm:flex-initial px-2 sm:px-0">
                    <p className="text-sm sm:text-base md:text-lg font-black font-display text-left sm:text-center leading-tight">
                      {opt.label[settings.language] || opt.label.th}
                    </p>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        speakOptionLabel(opt.id, true);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          e.preventDefault();
                          speakOptionLabel(opt.id, true);
                        }
                      }}
                      className="p-1 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-white/70 transition-colors cursor-pointer shrink-0"
                      title="กดฟังเสียงตัวเลือกนี้"
                    >
                      <Volume2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isHovered ? 'text-indigo-600 animate-bounce' : ''}`} />
                    </span>
                  </div>

                  {/* Touch mode direct indicator badge */}
                  {effectiveMode === 'touch' && !isAnswered && (
                    <div className="sm:absolute sm:top-2 sm:right-2 text-[10px] font-bold text-slate-500 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200 pointer-events-none shrink-0">
                      แตะ 👆
                    </div>
                  )}

                  {/* Status Badges */}
                  {isAnswered && isCorrect && (
                    <div className="sm:absolute sm:top-2 sm:right-2 shrink-0">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 drop-shadow-md" />
                    </div>
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <div className="sm:absolute sm:top-2 sm:right-2 shrink-0">
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 drop-shadow-md" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio & Level Footer Bar of Question Card */}
        <div className="bg-blue-50 p-2 sm:p-3 md:p-3.5 flex justify-between items-center border-t border-blue-100 text-blue-700 shrink-0 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-xs border border-blue-200 text-xs sm:text-sm">
              🔊
            </div>
            <span className="text-xs sm:text-sm font-bold text-blue-700 italic hidden sm:inline">
              {settings.autoSpeak ? 'กำลังอ่านคำถามอัตโนมัติ' : 'แตะเพื่อฟังเสียงคำถาม'}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">
              {effectiveMode === 'touch' ? '(แตะคำตอบได้ทันที)' : `(ชี้ค้าง ${settings.dwellTimeSeconds} วิ)`}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] sm:text-xs font-black uppercase text-blue-600 flex items-center gap-1">
              <span>ข้อ {questionNumber}/{totalQuestions}</span>
              <span className="text-blue-300">|</span>
              <span>{getDifficultyTheme(question.difficulty as 1 | 2 | 3).icon}</span>
              <span>{getDifficultyName(question.difficulty as 1 | 2 | 3, settings.language)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Answer feedback & Next button banner */}
      {isAnswered && (
        <div className="w-full flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-2 shrink-0">
          {/* Adaptive Adjustment Notice Banner if level changed */}
          {adaptiveState?.enabled && adaptiveState?.recentNotice && (
            <div
              className={`w-full p-2 sm:p-2.5 rounded-xl border-2 flex items-center gap-2 sm:gap-3 text-xs font-black shadow-md ${
                adaptiveState.recentNotice.type === 'up'
                  ? 'bg-purple-100 border-purple-400 text-purple-950 ring-2 ring-purple-200'
                  : 'bg-emerald-100 border-emerald-400 text-emerald-950 ring-2 ring-emerald-200'
              }`}
            >
              <span className="text-2xl sm:text-3xl shrink-0">
                {adaptiveState.recentNotice.type === 'up' ? '🚀' : '🌱'}
              </span>
              <div className="flex-1">
                <div className="font-black text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                  <span>{adaptiveState.recentNotice.title}</span>
                  <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold text-white shadow-2xs ${
                    adaptiveState.recentNotice.type === 'up' ? 'bg-purple-600' : 'bg-emerald-600'
                  }`}>
                    {adaptiveState.recentNotice.type === 'up' ? 'Level Up!' : 'ปรับความยากลง'}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-slate-700 mt-0.5">
                  {adaptiveState.recentNotice.subtitle}
                </div>
              </div>
            </div>
          )}

          <div className="w-full bg-white rounded-xl sm:rounded-2xl p-2 sm:p-2.5 md:p-3 border-2 border-amber-300 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2.5">
          <div className="flex items-center gap-2 sm:gap-2.5 text-left w-full sm:w-auto">
            <span className="text-xl sm:text-2xl shrink-0">
              {selectedOptionId === question.correctOptionId ? '🎉' : '💡'}
            </span>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="font-black text-slate-800 text-xs sm:text-sm md:text-base">
                  {selectedOptionId === question.correctOptionId
                    ? 'ยอดเยี่ยมมากจ้า! ตอบถูกแล้ว'
                    : 'ไม่เป็นไรนะคนเก่ง มาดูคำอธิบายกัน'}
                </div>
                {selectedOptionId === question.correctOptionId && isHighDifficulty && difficultyStreak > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-2 py-0.5 rounded-full shadow-xs animate-bounce">
                    <span>🔥</span>
                    <span>สตรีกท้าทาย {difficultyStreak} ข้อติด! ({getMasteryLevel(difficultyStreak).titleTh})</span>
                  </span>
                )}
                <button
                  id="btn-speak-explanation"
                  type="button"
                  onClick={() => {
                    const praise =
                      selectedOptionId === question.correctOptionId
                        ? 'ยอดเยี่ยมมากจ้า ตอบถูกแล้ว'
                        : 'ไม่เป็นไรนะคนเก่ง มาดูคำอธิบายกัน';
                    const exp =
                      question.explanation[settings.language] || question.explanation.th;
                    speakText(
                      `${praise} ${exp}`,
                      settings.language,
                      settings.voicePersona,
                      settings.soundVolume
                    );
                  }}
                  className="p-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center gap-1 text-[11px] font-bold transition-transform active:scale-95 cursor-pointer"
                  title="ฟังคำอธิบาย"
                >
                  <Volume2 className="w-3 h-3 text-amber-900" />
                  <span className="hidden sm:inline text-[10px]">ฟังเสียง</span>
                </button>
              </div>
              <div className="text-[11px] sm:text-xs md:text-sm text-slate-600 line-clamp-2 sm:line-clamp-none">
                {question.explanation[settings.language] || question.explanation.th}
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto flex flex-col items-center sm:items-end shrink-0">
            <button
              ref={nextButtonRef}
              id="btn-next-question"
              type="button"
              onClick={() => {
                if (nextTriggeredRef.current) return;
                nextTriggeredRef.current = true;
                cancelNextDwell();
                soundEffects.playTap(settings.soundVolume);
                onNextQuestion();
              }}
              onMouseEnter={() => {
                isPointerTouchingNextRef.current = true;
                startNextDwell();
              }}
              onMouseLeave={() => {
                isPointerTouchingNextRef.current = false;
                cancelNextDwell();
              }}
              onTouchStart={() => {
                isPointerTouchingNextRef.current = true;
                startNextDwell();
              }}
              onTouchEnd={() => {
                isPointerTouchingNextRef.current = false;
                if (!nextTriggeredRef.current) {
                  cancelNextDwell();
                }
              }}
              onTouchCancel={() => {
                isPointerTouchingNextRef.current = false;
                cancelNextDwell();
              }}
              className="relative overflow-hidden w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border-b-2 sm:border-b-4 border-indigo-900 active:translate-y-0.5 active:border-b-0 shadow-md cursor-pointer whitespace-nowrap text-xs sm:text-sm md:text-base transition-all select-none"
              title="คลิก หรือ เอาเมาท์ชี้/แตะค้างไว้ 1 วินาที เพื่อเปลี่ยนเป็นข้อถัดไป"
            >
              {/* Animated 1-second dwell progress fill bar */}
              {nextDwellProgress > 0 && (
                <div
                  className="absolute inset-0 bg-emerald-400/40 pointer-events-none transition-none"
                  style={{
                    width: `${Math.min(100, Math.round(nextDwellProgress * 100))}%`,
                  }}
                />
              )}

              {/* Dwell circular ring or timer icon */}
              <div className="relative z-10 flex items-center gap-2">
                {isNextHovered ? (
                  <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                    <svg className="w-5 h-5 -rotate-90" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="3"
                        fill="none"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="#34d399"
                        strokeWidth="3"
                        strokeDasharray={56.55}
                        strokeDashoffset={56.55 * (1 - nextDwellProgress)}
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                    <span className="absolute text-[8px] font-mono font-black text-emerald-200">
                      {Math.max(0, 1 - nextDwellProgress).toFixed(1)}
                    </span>
                  </div>
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-300 hidden sm:inline" />
                )}

                <div className="flex flex-col items-center sm:items-start leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span>
                      {questionNumber >= totalQuestions ? 'ดูสรุปผล 🏆' : 'ข้อถัดไป ➡️'}
                    </span>
                    <ArrowRight className="w-4 h-4 hidden sm:inline" />
                  </div>
                  <span className="text-[10px] text-indigo-100 font-normal">
                    {isNextHovered
                      ? `กำลังค้าง ${Math.round(nextDwellProgress * 100)}% (1 วิ)`
                      : 'ชี้หรือแตะค้าง 1 วิ ⏱️'}
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Floating Learning Buddy Mascot */}
    <LearningBuddyMascot
      question={question}
      questionNumber={questionNumber}
      totalQuestions={totalQuestions}
      settings={settings}
      isAnswered={isAnswered}
      isCorrect={selectedOptionId === question.correctOptionId}
      roundComplete={roundComplete}
      effectiveMode={effectiveMode}
      dwellProgress={dwellProgress}
    />

    {/* Persistent Teacher Quick Sound Toggle Mini-Button */}
    {renderTeacherSoundToggleButton()}

    {/* Animated In-Game Milestone Celebration Popups */}
    <MilestoneCelebrationPopup
      currentMilestone={activeMilestone}
      onDismiss={handleDismissMilestone}
      language={settings.language}
      soundVolume={settings.soundVolume}
    />
  </main>
);
};
