import { ExamSet, Grade, Language, Question, Subject } from '../types';
import { soundEffects } from './audioService';

export type DifficultyLevel = 1 | 2 | 3;
export type DifficultyAdjustment = 'up' | 'down' | 'stay';

export interface AdaptiveNotice {
  type: 'up' | 'down';
  fromLevel: DifficultyLevel;
  toLevel: DifficultyLevel;
  title: string;
  subtitle: string;
  timestamp: number;
}

export interface AdaptiveState {
  enabled: boolean;
  currentDifficulty: DifficultyLevel;
  consecutiveCorrect: number; // 0, 1, 2, 3
  targetConsecutiveForLevelUp: number; // 3 as per requirement
  highestDifficultyReached: DifficultyLevel;
  difficultyCounts: Record<DifficultyLevel, number>;
  difficultyCorrectCounts: Record<DifficultyLevel, number>;
  lastAdjustment: DifficultyAdjustment | null;
  recentNotice: AdaptiveNotice | null;
}

/**
 * Return human-readable Thai/English labels for difficulty level
 */
export function getDifficultyName(level: DifficultyLevel, lang: Language = 'th'): string {
  switch (level) {
    case 1:
      return lang === 'en' ? 'Easy (Level 1)' : lang === 'zh' ? '初级 (第1级)' : 'ระดับง่าย (Level 1)';
    case 2:
      return lang === 'en' ? 'Medium (Level 2)' : lang === 'zh' ? '中级 (第2级)' : 'ระดับปานกลาง (Level 2)';
    case 3:
      return lang === 'en' ? 'Challenging (Level 3)' : lang === 'zh' ? '挑战 (第3级)' : 'ระดับท้าทาย (Level 3)';
    default:
      return `Level ${level}`;
  }
}

/**
 * Visual badge theme properties for each difficulty level
 */
export function getDifficultyTheme(level: DifficultyLevel): {
  icon: string;
  label: string;
  badgeClass: string;
  borderClass: string;
  bgClass: string;
  textClass: string;
  gradientClass: string;
  glowClass: string;
} {
  switch (level) {
    case 1:
      return {
        icon: '🌱',
        label: 'ระดับง่าย',
        badgeClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
        borderClass: 'border-emerald-300',
        bgClass: 'bg-emerald-50',
        textClass: 'text-emerald-700',
        gradientClass: 'from-emerald-400 to-teal-500',
        glowClass: 'ring-emerald-300',
      };
    case 2:
      return {
        icon: '⚡',
        label: 'ระดับปานกลาง',
        badgeClass: 'bg-amber-100 text-amber-900 border border-amber-300',
        borderClass: 'border-amber-300',
        bgClass: 'bg-amber-50',
        textClass: 'text-amber-800',
        gradientClass: 'from-amber-400 to-orange-500',
        glowClass: 'ring-amber-300',
      };
    case 3:
      return {
        icon: '🔥',
        label: 'ระดับท้าทาย',
        badgeClass: 'bg-purple-100 text-purple-900 border border-purple-300',
        borderClass: 'border-purple-300',
        bgClass: 'bg-purple-50',
        textClass: 'text-purple-700',
        gradientClass: 'from-purple-500 to-indigo-600',
        glowClass: 'ring-purple-300',
      };
  }
}

/**
 * Initialize adaptive state for a new round
 */
export function createInitialAdaptiveState(
  grade: Grade = 'K1',
  startingDifficulty?: DifficultyLevel,
  enabled: boolean = true
): AdaptiveState {
  // Appropriate starting level for early childhood:
  // K1 starts at Level 1 (Easy)
  // K2 starts at Level 1 (Easy)
  // K3 starts at Level 2 (Medium) or 1
  const initialLevel: DifficultyLevel =
    startingDifficulty ?? (grade === 'K3' ? 2 : 1);

  return {
    enabled,
    currentDifficulty: initialLevel,
    consecutiveCorrect: 0,
    targetConsecutiveForLevelUp: 3,
    highestDifficultyReached: initialLevel,
    difficultyCounts: { 1: 0, 2: 0, 3: 0 },
    difficultyCorrectCounts: { 1: 0, 2: 0, 3: 0 },
    lastAdjustment: null,
    recentNotice: null,
  };
}

/**
 * Process answer and adapt difficulty level accordingly:
 * - 3 consecutive correct answers -> Increase difficulty level by +1 (max 3), reset consecutive count
 * - 1 incorrect answer -> Decrease difficulty level by -1 (min 1), reset consecutive count
 */
export function applyAnswerToAdaptiveState(
  prevState: AdaptiveState,
  isCorrect: boolean,
  currentQuestionDifficulty: DifficultyLevel,
  soundVolume: number = 0.8
): {
  nextState: AdaptiveState;
  notice: AdaptiveNotice | null;
  adjustment: DifficultyAdjustment;
} {
  // If adaptive difficulty is toggled off, record stats only without shifting level
  if (!prevState.enabled) {
    const updatedCounts = { ...prevState.difficultyCounts };
    const updatedCorrect = { ...prevState.difficultyCorrectCounts };
    updatedCounts[currentQuestionDifficulty] = (updatedCounts[currentQuestionDifficulty] || 0) + 1;
    if (isCorrect) {
      updatedCorrect[currentQuestionDifficulty] = (updatedCorrect[currentQuestionDifficulty] || 0) + 1;
    }
    return {
      nextState: {
        ...prevState,
        difficultyCounts: updatedCounts,
        difficultyCorrectCounts: updatedCorrect,
        consecutiveCorrect: isCorrect ? prevState.consecutiveCorrect + 1 : 0,
        lastAdjustment: null,
        recentNotice: null,
      },
      notice: null,
      adjustment: 'stay',
    };
  }

  const updatedCounts = { ...prevState.difficultyCounts };
  const updatedCorrect = { ...prevState.difficultyCorrectCounts };
  updatedCounts[currentQuestionDifficulty] = (updatedCounts[currentQuestionDifficulty] || 0) + 1;

  if (isCorrect) {
    updatedCorrect[currentQuestionDifficulty] = (updatedCorrect[currentQuestionDifficulty] || 0) + 1;
    const newConsecutive = prevState.consecutiveCorrect + 1;

    // Trigger LEVEL UP when 3 consecutive correct answers reached
    if (newConsecutive >= prevState.targetConsecutiveForLevelUp) {
      if (prevState.currentDifficulty < 3) {
        const nextDifficulty = (prevState.currentDifficulty + 1) as DifficultyLevel;
        const notice: AdaptiveNotice = {
          type: 'up',
          fromLevel: prevState.currentDifficulty,
          toLevel: nextDifficulty,
          title: `🌟 ปรับความยากขึ้นเป็น ${getDifficultyName(nextDifficulty)}!`,
          subtitle: 'ยอดเยี่ยมมากเลยคนเก่ง! ตอบถูกติดต่อกัน 3 ข้อแล้ว 🚀',
          timestamp: Date.now(),
        };

        // Sound effect
        soundEffects.playLevelUp(soundVolume);

        return {
          nextState: {
            ...prevState,
            currentDifficulty: nextDifficulty,
            consecutiveCorrect: 0, // Reset streak counter for next tier
            highestDifficultyReached: Math.max(prevState.highestDifficultyReached, nextDifficulty) as DifficultyLevel,
            difficultyCounts: updatedCounts,
            difficultyCorrectCounts: updatedCorrect,
            lastAdjustment: 'up',
            recentNotice: notice,
          },
          notice,
          adjustment: 'up',
        };
      } else {
        // Already at maximum challenge level (Level 3)
        return {
          nextState: {
            ...prevState,
            consecutiveCorrect: prevState.targetConsecutiveForLevelUp, // maintain max streak display
            difficultyCounts: updatedCounts,
            difficultyCorrectCounts: updatedCorrect,
            lastAdjustment: 'stay',
            recentNotice: null,
          },
          notice: null,
          adjustment: 'stay',
        };
      }
    } else {
      // Correct, but has not reached 3 consecutive yet
      return {
        nextState: {
          ...prevState,
          consecutiveCorrect: newConsecutive,
          difficultyCounts: updatedCounts,
          difficultyCorrectCounts: updatedCorrect,
          lastAdjustment: 'stay',
          recentNotice: null,
        },
        notice: null,
        adjustment: 'stay',
      };
    }
  } else {
    // Incorrect answer:
    // Reset streak and step down difficulty if above level 1
    if (prevState.currentDifficulty > 1) {
      const nextDifficulty = (prevState.currentDifficulty - 1) as DifficultyLevel;
      const notice: AdaptiveNotice = {
        type: 'down',
        fromLevel: prevState.currentDifficulty,
        toLevel: nextDifficulty,
        title: `🌱 ปรับคำถามลงเป็น ${getDifficultyName(nextDifficulty)}`,
        subtitle: 'ไม่เป็นไรนะจ๊ะคนเก่ง! ปรับระดับให้พอดี สู้ๆ นะเด็กดี 🌈',
        timestamp: Date.now(),
      };

      // Sound effect
      soundEffects.playLevelDown(soundVolume);

      return {
        nextState: {
          ...prevState,
          currentDifficulty: nextDifficulty,
          consecutiveCorrect: 0,
          difficultyCounts: updatedCounts,
          difficultyCorrectCounts: updatedCorrect,
          lastAdjustment: 'down',
          recentNotice: notice,
        },
        notice,
        adjustment: 'down',
      };
    } else {
      // Already at Level 1 (easiest level)
      return {
        nextState: {
          ...prevState,
          currentDifficulty: 1,
          consecutiveCorrect: 0,
          difficultyCounts: updatedCounts,
          difficultyCorrectCounts: updatedCorrect,
          lastAdjustment: 'stay',
          recentNotice: null,
        },
        notice: null,
        adjustment: 'stay',
      };
    }
  }
}

/**
 * Pick the best matching question adaptively according to current target difficulty
 */
export function pickAdaptiveQuestion({
  allQuestions,
  usedQuestionIds,
  targetSubject,
  targetGrade,
  targetDifficulty,
  activeExamSet,
}: {
  allQuestions: Question[];
  usedQuestionIds: Set<string>;
  targetSubject: Subject;
  targetGrade: Grade;
  targetDifficulty: DifficultyLevel;
  activeExamSet?: ExamSet | null;
}): Question {
  // If exam set is active, try to select from the exam set's pool
  if (activeExamSet && activeExamSet.questionIds && activeExamSet.questionIds.length > 0) {
    const examQuestions = allQuestions.filter((q) => activeExamSet.questionIds.includes(q.id));
    const unusedExamQuestions = examQuestions.filter((q) => !usedQuestionIds.has(q.id));

    if (unusedExamQuestions.length > 0) {
      // Try to find one matching targetDifficulty
      const exactMatch = unusedExamQuestions.find((q) => q.difficulty === targetDifficulty);
      if (exactMatch) return exactMatch;

      // Try adjacent difficulty
      const diff1 = Math.abs(1 - targetDifficulty);
      unusedExamQuestions.sort((a, b) => Math.abs(a.difficulty - targetDifficulty) - Math.abs(b.difficulty - targetDifficulty));
      return unusedExamQuestions[0];
    }
  }

  // 1. Exact match: target grade + target subject + target difficulty + unused
  const exactCandidates = allQuestions.filter(
    (q) =>
      q.grade === targetGrade &&
      q.subject === targetSubject &&
      q.difficulty === targetDifficulty &&
      !usedQuestionIds.has(q.id)
  );
  if (exactCandidates.length > 0) {
    const randomPick = exactCandidates[Math.floor(Math.random() * exactCandidates.length)];
    return randomPick;
  }

  // 2. Adjacent difficulty for same grade and subject:
  // e.g. If target is 2, check 1 then 3; if target is 3, check 2; if target is 1, check 2
  const adjacentLevels: DifficultyLevel[] =
    targetDifficulty === 2 ? [1, 3] : targetDifficulty === 3 ? [2, 1] : [2, 3];

  for (const altLevel of adjacentLevels) {
    const altCandidates = allQuestions.filter(
      (q) =>
        q.grade === targetGrade &&
        q.subject === targetSubject &&
        q.difficulty === altLevel &&
        !usedQuestionIds.has(q.id)
    );
    if (altCandidates.length > 0) {
      return altCandidates[Math.floor(Math.random() * altCandidates.length)];
    }
  }

  // 3. Any unused question for this subject and grade
  const anyUnusedForSubject = allQuestions.filter(
    (q) => q.grade === targetGrade && q.subject === targetSubject && !usedQuestionIds.has(q.id)
  );
  if (anyUnusedForSubject.length > 0) {
    return anyUnusedForSubject[Math.floor(Math.random() * anyUnusedForSubject.length)];
  }

  // 4. Any unused question for this grade
  const anyUnused = allQuestions.filter((q) => q.grade === targetGrade && !usedQuestionIds.has(q.id));
  if (anyUnused.length > 0) {
    return anyUnused[Math.floor(Math.random() * anyUnused.length)];
  }

  // 5. Fallback if all questions exhausted
  const anyMatchingSubject = allQuestions.filter((q) => q.subject === targetSubject && q.grade === targetGrade);
  if (anyMatchingSubject.length > 0) {
    return anyMatchingSubject[Math.floor(Math.random() * anyMatchingSubject.length)];
  }

  return allQuestions[0];
}

/**
 * Generate sequence of target subjects for the round, interleaving them cleanly
 */
export function generateRoundSubjectPlan(
  selectedSubjects: Subject[],
  questionsPerSkill: number = 3
): Subject[] {
  if (selectedSubjects.length === 0) {
    return ['literacy', 'math'];
  }

  // Interleave subjects so the child doesn't get stuck on one skill for too long
  // e.g. [Subject A, Subject B, Subject A, Subject B, ...]
  const plan: Subject[] = [];
  for (let round = 0; round < questionsPerSkill; round++) {
    for (const sub of selectedSubjects) {
      plan.push(sub);
    }
  }
  return plan;
}
