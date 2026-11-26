import { ChildProfile, CurriculumMode, Subject, WeeklyChallengeAwardResult, WeeklyChallengeState } from '../types';
import { SKILLS_LIST, SkillDefinition, getSkillBySubject } from '../data/skills';
import { storageService } from './storageService';

export const WEEKLY_CHALLENGE_RECORD_BONUS = 100; // Bonus points for breaking weekly record
export const WEEKLY_CHALLENGE_PARTICIPATION_BONUS = 30; // Participation bonus points

const EARLY_CHILDHOOD_SUBJECTS: Subject[] = [
  'literacy',
  'math',
  'problem_solving',
  'inquiry',
  'creativity',
  'physical_health',
  'socio_emotional',
  'citizenship',
];

const CBE_SUBJECTS: Subject[] = [
  'self_management',
  'higher_order_thinking',
  'communication',
  'teamwork_collaboration',
  'active_citizenship',
  'sustainable_living',
];

const THAI_PHONICS_SUBJECTS: Subject[] = [
  'phonics_consonant',
  'phonics_vowel',
  'phonics_tone',
  'phonics_korkaa',
  'phonics_tone_korkaa',
  'phonics_direct_spelling',
  'phonics_tone_spelling',
  'phonics_indirect_spelling',
  'phonics_cluster',
  'phonics_leading_consonant',
];

/**
 * Returns ISO week key e.g. "2026-W42"
 */
export function getCurrentWeekKey(d: Date = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}

/**
 * Returns days remaining until the end of the current week (Sunday midnight)
 */
export function getDaysRemainingInWeek(d: Date = new Date()): number {
  const day = d.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  return day === 0 ? 0 : 7 - day;
}

/**
 * Formats a friendly Thai label for the week, e.g. "สัปดาห์ที่ 42 (12 ต.ค. - 18 ต.ค.)"
 */
export function getWeekLabelTh(d: Date = new Date()): string {
  const weekKey = getCurrentWeekKey(d);
  const weekNum = weekKey.split('-W')[1] || '1';

  const day = d.getDay();
  const diffToMonday = (day + 6) % 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const startStr = `${monday.getDate()} ${monday.toLocaleDateString('th-TH', { month: 'short' })}`;
  const endStr = `${sunday.getDate()} ${sunday.toLocaleDateString('th-TH', { month: 'short' })}`;
  return `สัปดาห์ที่ ${parseInt(weekNum, 10)} (${startStr} - ${endStr})`;
}

export interface BestSkillAnalysis {
  subject: Subject;
  skill: SkillDefinition;
  accuracy: number;
  totalAnswered: number;
  totalScore: number;
  isFallback: boolean;
  explanationTh: string;
}

/**
 * Identifies the child's best-performing skill based on past history (highest accuracy & questions answered)
 */
export function getBestPerformingSkill(
  profile: ChildProfile,
  curriculumMode: CurriculumMode = 'early_childhood'
): BestSkillAnalysis {
  const isCbe = curriculumMode === 'cbe_primary';
  const isPhonics = curriculumMode === 'thai_phonics';
  const targetSubjects = isPhonics
    ? THAI_PHONICS_SUBJECTS
    : isCbe
    ? CBE_SUBJECTS
    : EARLY_CHILDHOOD_SUBJECTS;

  // Initialize aggregated stats
  const statsMap: Record<Subject, { score: number; total: number }> = {} as any;
  targetSubjects.forEach((subj) => {
    statsMap[subj] = { score: 0, total: 0 };
  });

  if (profile && profile.history && profile.history.length > 0) {
    profile.history.forEach((h: any) => {
      // Early childhood
      const litS = h.literacyScore ?? h.thaiScore ?? 0;
      const litT = h.literacyTotal ?? h.thaiTotal ?? 0;
      const inqS = h.inquiryScore ?? h.scienceScore ?? 0;
      const inqT = h.inquiryTotal ?? h.scienceTotal ?? 0;

      if (statsMap.literacy) {
        statsMap.literacy.score += litS;
        statsMap.literacy.total += litT;
      }
      if (statsMap.math) {
        statsMap.math.score += h.mathScore || 0;
        statsMap.math.total += h.mathTotal || 0;
      }
      if (statsMap.problem_solving) {
        statsMap.problem_solving.score += h.problemSolvingScore || 0;
        statsMap.problem_solving.total += h.problemSolvingTotal || 0;
      }
      if (statsMap.inquiry) {
        statsMap.inquiry.score += inqS;
        statsMap.inquiry.total += inqT;
      }
      if (statsMap.creativity) {
        statsMap.creativity.score += h.creativityScore || 0;
        statsMap.creativity.total += h.creativityTotal || 0;
      }
      if (statsMap.physical_health) {
        statsMap.physical_health.score += h.physicalHealthScore || 0;
        statsMap.physical_health.total += h.physicalHealthTotal || 0;
      }
      if (statsMap.socio_emotional) {
        statsMap.socio_emotional.score += h.socioEmotionalScore || 0;
        statsMap.socio_emotional.total += h.socioEmotionalTotal || 0;
      }
      if (statsMap.citizenship) {
        statsMap.citizenship.score += h.citizenshipScore || 0;
        statsMap.citizenship.total += h.citizenshipTotal || 0;
      }

      // CBE
      if (statsMap.self_management) {
        statsMap.self_management.score += h.selfManagementScore || h.self_managementScore || 0;
        statsMap.self_management.total += h.selfManagementTotal || h.self_managementTotal || 0;
      }
      if (statsMap.higher_order_thinking) {
        statsMap.higher_order_thinking.score += h.higherOrderThinkingScore || h.higher_order_thinkingScore || 0;
        statsMap.higher_order_thinking.total += h.higherOrderThinkingTotal || h.higher_order_thinkingTotal || 0;
      }
      if (statsMap.communication) {
        statsMap.communication.score += h.communicationScore || 0;
        statsMap.communication.total += h.communicationTotal || 0;
      }
      if (statsMap.teamwork_collaboration) {
        statsMap.teamwork_collaboration.score += h.teamworkScore || h.teamwork_collaborationScore || 0;
        statsMap.teamwork_collaboration.total += h.teamworkTotal || h.teamwork_collaborationTotal || 0;
      }
      if (statsMap.active_citizenship) {
        statsMap.active_citizenship.score += h.activeCitizenshipScore || h.active_citizenshipScore || 0;
        statsMap.active_citizenship.total += h.activeCitizenshipTotal || h.active_citizenshipTotal || 0;
      }
      if (statsMap.sustainable_living) {
        statsMap.sustainable_living.score += h.sustainableLivingScore || h.sustainable_livingScore || 0;
        statsMap.sustainable_living.total += h.sustainableLivingTotal || h.sustainable_livingTotal || 0;
      }
    });
  }

  // Filter skills that have been answered at least once
  const testedSkills = targetSubjects
    .map((subj) => {
      const data = statsMap[subj] || { score: 0, total: 0 };
      const accuracy = data.total > 0 ? Math.round((data.score / data.total) * 100) : 0;
      return {
        subject: subj,
        accuracy,
        totalAnswered: data.total,
        totalScore: data.score,
      };
    })
    .filter((s) => s.totalAnswered > 0);

  // Sort by highest accuracy first, then by total correct score as tie-breaker
  testedSkills.sort((a, b) => {
    if (b.accuracy !== a.accuracy) {
      return b.accuracy - a.accuracy;
    }
    return b.totalScore - a.totalScore;
  });

  if (testedSkills.length > 0) {
    const best = testedSkills[0];
    const skillDef = getSkillBySubject(best.subject);
    const childName = profile?.name || 'หนูน้อย';
    return {
      subject: best.subject,
      skill: skillDef,
      accuracy: best.accuracy,
      totalAnswered: best.totalAnswered,
      totalScore: best.totalScore,
      isFallback: false,
      explanationTh: `${childName} มีความแม่นยำในหมวดนี้สูงถึง ${best.accuracy}% (ตอบถูก ${best.totalScore}/${best.totalAnswered} ข้อ) ถือเป็นทักษะดาวเด่นอันดับ 1 ประจำสัปดาห์!`,
    };
  }

  // Fallback if no history yet: choose a featured fundamental skill
  const defaultSubj: Subject = isCbe ? 'self_management' : 'math';
  const defaultSkill = getSkillBySubject(defaultSubj);
  const childName = profile?.name || 'หนูน้อย';

  return {
    subject: defaultSubj,
    skill: defaultSkill,
    accuracy: 100,
    totalAnswered: 0,
    totalScore: 0,
    isFallback: true,
    explanationTh: `เริ่มต้นประเดิมสัปดาห์นี้ด้วยวิชา "${defaultSkill.name.th}" ทักษะยอดนิยม เพื่อเริ่มสร้างสถิติสูงสุดครั้งแรกของ ${childName}!`,
  };
}

/**
 * Retrieves weekly challenge status for the specified profile and current week
 */
export function getWeeklyChallengeState(
  profileId: string,
  bestSkillSubject: Subject,
  weekKey: string = getCurrentWeekKey()
): WeeklyChallengeState {
  const storageKey = `k8_weekly_challenge_${profileId}_${weekKey}`;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        weekKey,
        profileId,
        bestSkill: parsed.bestSkill || bestSkillSubject,
        bestScore: parsed.bestScore || 0,
        attemptsCount: parsed.attemptsCount || 0,
        lastPlayedDate: parsed.lastPlayedDate,
        targetScore: parsed.targetScore || Math.max(50, (parsed.bestScore || 0) + 10),
        isRecordBroken: parsed.isRecordBroken || false,
      };
    }
  } catch (e) {
    console.warn('Failed to read weekly challenge state:', e);
  }

  // Initial state for fresh week
  return {
    weekKey,
    profileId,
    bestSkill: bestSkillSubject,
    bestScore: 0,
    attemptsCount: 0,
    targetScore: 50,
    isRecordBroken: false,
  };
}

/**
 * Records a weekly challenge round attempt, checks if new record is broken, and calculates rewards
 */
export function recordWeeklyChallengeAttempt(
  profile: ChildProfile,
  roundScore: number,
  subject: Subject,
  weekKey: string = getCurrentWeekKey()
): WeeklyChallengeAwardResult {
  const currentState = getWeeklyChallengeState(profile.id, subject, weekKey);
  const previousBest = currentState.bestScore;
  const isFirst = currentState.attemptsCount === 0;
  const isNewRecord = roundScore > previousBest || (isFirst && roundScore > 0);
  const newBest = Math.max(previousBest, roundScore);

  const bonusPoints = isNewRecord
    ? WEEKLY_CHALLENGE_RECORD_BONUS
    : WEEKLY_CHALLENGE_PARTICIPATION_BONUS;

  const skillDef = getSkillBySubject(subject);

  const updatedState: WeeklyChallengeState = {
    weekKey,
    profileId: profile.id,
    bestSkill: subject,
    bestScore: newBest,
    attemptsCount: currentState.attemptsCount + 1,
    lastPlayedDate: new Date().toISOString(),
    targetScore: newBest + 10,
    isRecordBroken: isNewRecord,
  };

  try {
    const storageKey = `k8_weekly_challenge_${profile.id}_${weekKey}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedState));

    // Award bonus points to the profile
    const allProfiles = storageService.getProfiles();
    const target = allProfiles.find((p) => p.id === profile.id);
    if (target) {
      target.totalScore = (target.totalScore || 0) + bonusPoints;
      target.updatedAt = new Date().toISOString();
      storageService.saveProfiles(allProfiles);
    }
  } catch (err) {
    console.warn('Failed to save weekly challenge attempt:', err);
  }

  return {
    weekKey,
    skill: subject,
    skillTitleTh: skillDef.name.th,
    roundScore,
    previousBestScore: previousBest,
    newBestScore: newBest,
    isNewRecord,
    bonusPoints,
    isFirstAttempt: isFirst,
  };
}
