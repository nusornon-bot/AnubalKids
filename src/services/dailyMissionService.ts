import { Subject, ChildProfile, DailyMissionState, CurriculumMode } from '../types';
import { SKILLS_LIST, SkillDefinition, getSkillBySubject } from '../data/skills';

export const DAILY_MISSION_BONUS_POINTS = 50;

// The 8 early childhood foundation subjects (ปฐมวัย อ.1 - อ.3)
export const DAILY_MISSION_SUBJECTS: Subject[] = [
  'literacy', // 1 ภาษาและการรู้หนังสือ
  'math', // 2 การคิดรวบยอดและการคิดคำนวณ
  'problem_solving', // 3 การคิดแก้ปัญหาและตัดสินใจ
  'inquiry', // 4 การแสวงหาความรู้
  'creativity', // 5 จินตนาการและความคิดสร้างสรรค์
  'physical_health', // 6 ด้านสุขภาวะทางกาย
  'socio_emotional', // 7 ด้านอารมณ์ จิตใจ และสังคม
  'citizenship', // 8 ด้านความเป็นพลเมืองและความเป็นไทย
];

// The 6 CBE Primary Core Competencies (หลักสูตรฐานสมรรถนะ ป.1 - ป.3)
export const DAILY_MISSION_CBE_SUBJECTS: Subject[] = [
  'self_management', // CBE1 การจัดการตนเอง
  'higher_order_thinking', // CBE2 การคิดขั้นสูง
  'communication', // CBE3 การสื่อสาร
  'teamwork_collaboration', // CBE4 การรวมพลังทำงานเป็นทีม
  'active_citizenship', // CBE5 การเป็นพลเมืองที่เข้มแข็ง
  'sustainable_living', // CBE6 การอยู่ร่วมกับธรรมชาติและวิทยาการอย่างยั่งยืน
];

// The 10 Thai Phonics Units (สพฐ.)
export const DAILY_MISSION_THAI_PHONICS_SUBJECTS: Subject[] = [
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
 * Determine whether CBE competency curriculum mode is active
 */
export function isCbeCurriculum(profile?: ChildProfile | null, curriculumMode?: CurriculumMode): boolean {
  if (curriculumMode === 'cbe_primary') return true;
  if (curriculumMode === 'early_childhood' || curriculumMode === 'thai_phonics') return false;
  if (profile?.grade && ['P1', 'P2', 'P3'].includes(profile.grade)) return true;
  return false;
}

/**
 * Returns the current date in YYYY-MM-DD formatted to local timezone.
 */
export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Deterministically pick today's daily mission subject based on calendar date.
 */
export function getDailySubjectForDate(
  dateStr?: string,
  mode: CurriculumMode = 'early_childhood'
): Subject {
  const targetDate = dateStr || getTodayDateString();
  const parts = targetDate.split('-');
  const year = parseInt(parts[0], 10) || 2026;
  const month = parseInt(parts[1], 10) || 1;
  const day = parseInt(parts[2], 10) || 1;

  // Day of year calculation
  const startOfYear = new Date(year, 0, 1);
  const current = new Date(year, month - 1, day);
  const diffTime = current.getTime() - startOfYear.getTime();
  const dayOfYear = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

  const pool =
    mode === 'thai_phonics'
      ? DAILY_MISSION_THAI_PHONICS_SUBJECTS
      : mode === 'cbe_primary'
      ? DAILY_MISSION_CBE_SUBJECTS
      : DAILY_MISSION_SUBJECTS;
  const index = dayOfYear % pool.length;
  return pool[index];
}

/**
 * Format a YYYY-MM-DD date into friendly Thai wording.
 */
export function formatDateThai(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const thaiDays = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    const thaiMonthsShort = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const dayName = thaiDays[date.getDay()] || 'วันนี้';
    const monthName = thaiMonthsShort[m - 1] || '';
    const buddhistYear = y + 543;
    return `${dayName}ที่ ${d} ${monthName} ${buddhistYear}`;
  } catch {
    return dateStr;
  }
}

export interface DailyMissionDetails {
  date: string;
  formattedDateTh: string;
  subject: Subject;
  skill: SkillDefinition;
  bonusPoints: number;
  isCompleted: boolean;
  completedAt?: string;
  title: string;
  description: string;
  curriculumMode: CurriculumMode;
  curriculumTitleTh: string;
  isCbe: boolean;
}

/**
 * Get comprehensive info about today's daily mission for a specific child profile
 * aligned with the curriculum mode (8 skills vs 6 CBE competencies).
 */
export function getDailyMissionDetails(
  profile?: ChildProfile | null,
  dateStr?: string,
  curriculumMode?: CurriculumMode
): DailyMissionDetails {
  const today = dateStr || getTodayDateString();
  const isPhonics = curriculumMode === 'thai_phonics';
  const cbeActive = !isPhonics && isCbeCurriculum(profile, curriculumMode);
  const effectiveMode: CurriculumMode = isPhonics
    ? 'thai_phonics'
    : cbeActive
    ? 'cbe_primary'
    : 'early_childhood';
  const subject = getDailySubjectForDate(today, effectiveMode);
  const skill = getSkillBySubject(subject);

  const isCompleted = Boolean(
    profile?.dailyMission &&
      profile.dailyMission.date === today &&
      profile.dailyMission.completed
  );

  const completedAt = isCompleted ? profile?.dailyMission?.completedAt : undefined;

  const curriculumTitleTh = isPhonics
    ? 'หลักสูตรการสอนอ่านเขียน โดยการแจกลูกสะกดคำ (สพฐ.)'
    : cbeActive
    ? 'หลักสูตร 6 สมรรถนะหลัก (CBE ป.1 - ป.3)'
    : 'หลักสูตรพัฒนา 8 ทักษะ (ปฐมวัย อ.1 - อ.3)';

  const title = isPhonics
    ? `ภารกิจประจำวัน: ${skill.shortName.th}`
    : cbeActive
    ? `ภารกิจประจำวัน: สมรรถนะ${skill.shortName.th}`
    : `ภารกิจประจำวัน: หมวด${skill.shortName.th}`;

  const description = `พิชิตแบบทดสอบ 1 รอบใน "${skill.name.th}" เพื่อรับคะแนนโบนัสสะสม +${DAILY_MISSION_BONUS_POINTS} คะแนนทันที!`;

  return {
    date: today,
    formattedDateTh: formatDateThai(today),
    subject,
    skill,
    bonusPoints: DAILY_MISSION_BONUS_POINTS,
    isCompleted,
    completedAt,
    title,
    description,
    curriculumMode: effectiveMode,
    curriculumTitleTh,
    isCbe: cbeActive,
  };
}

export interface DailyMissionAwardResult {
  completedNow: boolean;
  bonusPoints: number;
  subject: Subject;
  skillTitleTh: string;
  skillIcon: string;
}

/**
 * Evaluate if a completed round satisfies today's daily mission for a profile.
 * If eligible and not already completed today, updates profile in-place and returns award details.
 */
export function evaluateDailyMissionForRound(
  profile: ChildProfile,
  roundResults: { subject: Subject; isCorrect: boolean }[],
  curriculumMode?: CurriculumMode
): DailyMissionAwardResult | null {
  if (!profile || roundResults.length === 0) return null;

  const todayStr = getTodayDateString();
  const currentMode: CurriculumMode = curriculumMode || (isCbeCurriculum(profile) ? 'cbe_primary' : 'early_childhood');
  const missionSubject = getDailySubjectForDate(todayStr, currentMode);

  // Check if already completed today
  if (
    profile.dailyMission &&
    profile.dailyMission.date === todayStr &&
    profile.dailyMission.completed
  ) {
    return null;
  }

  // Check if this round included questions from the daily mission subject
  const hasSubject = roundResults.some(
    (r) =>
      r.subject === missionSubject ||
      (missionSubject === 'literacy' && r.subject === 'thai') ||
      (missionSubject === 'inquiry' && r.subject === 'science')
  );

  if (!hasSubject) {
    return null;
  }

  // Award the mission bonus!
  const missionRecord: DailyMissionState = {
    date: todayStr,
    subject: missionSubject,
    completed: true,
    bonusPoints: DAILY_MISSION_BONUS_POINTS,
    completedAt: new Date().toISOString(),
  };

  profile.dailyMission = missionRecord;
  profile.totalScore = (profile.totalScore || 0) + DAILY_MISSION_BONUS_POINTS;

  // Also check if daily mission badge should be unlocked
  if (!profile.badges) {
    profile.badges = [];
  }
  if (!profile.badges.includes('daily_mission_hero')) {
    profile.badges.push('daily_mission_hero');
  }

  const skill = getSkillBySubject(missionSubject);

  return {
    completedNow: true,
    bonusPoints: DAILY_MISSION_BONUS_POINTS,
    subject: missionSubject,
    skillTitleTh: skill.name.th,
    skillIcon: skill.icon,
  };
}
