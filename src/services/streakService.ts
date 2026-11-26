import { ChildProfile, HistoryEntry } from '../types';

export interface StreakMilestone {
  days: number;
  title: string;
  subtitle: string;
  icon: string;
  badgeId: string;
  description: string;
  unlocked: boolean;
}

export interface CalendarDayInfo {
  dayIndex: number; // 1 to 30
  date: string; // YYYY-MM-DD
  dayOfMonth: number;
  monthName: string;
  dayOfWeekThai: string;
  dayOfWeekNumber: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  isToday: boolean;
  isCompleted: boolean;
  isInActiveStreak: boolean;
  score: number;
  totalQuestions: number;
  accuracy: number;
  historyEntry?: HistoryEntry;
}

export interface StreakSummary {
  currentStreak: number;
  longestStreak: number;
  totalActiveDaysIn30: number;
  isTodayCompleted: boolean;
  todayStats?: {
    score: number;
    totalQuestions: number;
    accuracy: number;
  };
  thirtyDayProgressPercent: number; // 0 to 100
  nextMilestone: StreakMilestone;
  progressToNextMilestone: number; // 0 to 100
  daysUntilNextMilestone: number;
  milestones: StreakMilestone[];
  calendarDays: CalendarDayInfo[];
  motivationalTip: {
    badge: string;
    text: string;
    subtext: string;
    levelEmoji: string;
  };
}

const THAI_MONTHS_SHORT = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];

const THAI_DAYS_SHORT = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];

export const STREAK_MILESTONES: { days: number; title: string; subtitle: string; icon: string; badgeId: string; description: string }[] = [
  {
    days: 7,
    title: 'ก้าวแรกคนเก่ง 7 วัน',
    subtitle: 'เพาะต้นกล้าแห่งความพยายาม',
    icon: '🌱',
    badgeId: 'streak_7',
    description: 'ฝึกฝนต่อเนื่องติดต่อกัน 7 วัน สัปดาห์แรกแห่งความสำเร็จ',
  },
  {
    days: 14,
    title: 'นักสู้ตัวจิ๋ว 14 วัน',
    subtitle: 'พลังความสม่ำเสมอ 2 สัปดาห์',
    icon: '⚡',
    badgeId: 'streak_14',
    description: 'ฝึกฝนต่อเนื่องติดต่อกัน 14 วัน สร้างระเบียบวินัยยอดเยี่ยม',
  },
  {
    days: 21,
    title: 'นิสัยรักการเรียนรู้ 21 วัน',
    subtitle: 'กฎ 21 วันสร้างอุปนิสัย',
    icon: '🚀',
    badgeId: 'streak_21',
    description: 'ฝึกฝนต่อเนื่องติดต่อกัน 21 วัน สร้างนิสัยรักการเรียนรู้อย่างถาวร',
  },
  {
    days: 30,
    title: 'แชมเปี้ยน 30 วันเต็ม',
    subtitle: 'สุดยอดแชมเปี้ยนประจำเดือน',
    icon: '🏆',
    badgeId: 'streak_30',
    description: 'พิชิตเป้าหมาย 30 วันเต็ม รับถ้วยรางวัลทองคำเกียรติยศ',
  },
];

function formatDateYYYYMMDD(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates complete 30-day streak analytics, calendar grid items,
 * milestone checkpoints, and encouragement messages for a child profile.
 */
export function calculateStreakSummary(profile: ChildProfile, referenceDate: Date = new Date()): StreakSummary {
  const todayStr = formatDateYYYYMMDD(referenceDate);
  const historyMap = new Map<string, HistoryEntry>();

  if (profile.history && Array.isArray(profile.history)) {
    profile.history.forEach((h) => {
      if (h.date) {
        historyMap.set(h.date, h);
      }
    });
  }

  // Check if today has recorded activity
  const todayEntry = historyMap.get(todayStr);
  const isTodayCompleted =
    Boolean(todayEntry) ||
    profile.lastPlayedDate === todayStr;

  // Compute consecutive streak backwards from today (or yesterday if today not yet completed)
  let consecutiveCount = 0;
  let cursor = new Date(referenceDate);

  if (!isTodayCompleted) {
    // If today not yet completed, check yesterday to see if streak is still active
    cursor.setDate(cursor.getDate() - 1);
  }

  const activeStreakDates = new Set<string>();

  while (true) {
    const curStr = formatDateYYYYMMDD(cursor);
    const hasRecord = historyMap.has(curStr) || (consecutiveCount === 0 && profile.lastPlayedDate === curStr);
    if (hasRecord) {
      consecutiveCount++;
      activeStreakDates.add(curStr);
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  // Combine with stored profile streakDays if higher
  const currentStreak = Math.max(consecutiveCount, profile.streakDays || 0);

  // Compute longest streak across all history entries
  let longestStreak = currentStreak;
  const sortedDates = Array.from(historyMap.keys()).sort();
  let tempStreak = 0;
  let prevDateMs: number | null = null;

  sortedDates.forEach((dStr) => {
    const d = new Date(dStr + 'T00:00:00');
    const ms = d.getTime();
    if (prevDateMs === null) {
      tempStreak = 1;
    } else {
      const diffDays = Math.round((ms - prevDateMs) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    }
    prevDateMs = ms;
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
  });

  // Generate 30 Calendar Days (from Day 1 to Day 30 ending today)
  const calendarDays: CalendarDayInfo[] = [];
  let totalActiveDaysIn30 = 0;

  for (let i = 29; i >= 0; i--) {
    const d = new Date(referenceDate);
    d.setDate(referenceDate.getDate() - i);
    const dateStr = formatDateYYYYMMDD(d);
    const isToday = dateStr === todayStr;
    const historyEntry = historyMap.get(dateStr);

    let isCompleted = Boolean(historyEntry);
    if (!isCompleted && isToday && profile.lastPlayedDate === todayStr) {
      isCompleted = true;
    }

    if (isCompleted) {
      totalActiveDaysIn30++;
    }

    let score = 0;
    let totalQuestions = 0;
    let accuracy = 0;

    if (historyEntry) {
      totalQuestions =
        (historyEntry.literacyTotal || historyEntry.thaiTotal || 0) +
        historyEntry.mathTotal +
        (historyEntry.problemSolvingTotal || 0) +
        (historyEntry.inquiryTotal || historyEntry.scienceTotal || 0) +
        (historyEntry.creativityTotal || 0) +
        (historyEntry.physicalHealthTotal || 0) +
        (historyEntry.socioEmotionalTotal || 0) +
        (historyEntry.citizenshipTotal || 0);

      score =
        (historyEntry.literacyScore || historyEntry.thaiScore || 0) +
        historyEntry.mathScore +
        (historyEntry.problemSolvingScore || 0) +
        (historyEntry.inquiryScore || historyEntry.scienceScore || 0) +
        (historyEntry.creativityScore || 0) +
        (historyEntry.physicalHealthScore || 0) +
        (historyEntry.socioEmotionalScore || 0) +
        (historyEntry.citizenshipScore || 0);

      accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : historyEntry.accuracy || 100;
    }

    const dayIndex = 30 - i; // 1 to 30
    calendarDays.push({
      dayIndex,
      date: dateStr,
      dayOfMonth: d.getDate(),
      monthName: THAI_MONTHS_SHORT[d.getMonth()],
      dayOfWeekThai: THAI_DAYS_SHORT[d.getDay()],
      dayOfWeekNumber: d.getDay(),
      isToday,
      isCompleted,
      isInActiveStreak: activeStreakDates.has(dateStr) || (isToday && isTodayCompleted),
      score,
      totalQuestions,
      accuracy,
      historyEntry,
    });
  }

  // Milestones
  const milestones: StreakMilestone[] = STREAK_MILESTONES.map((m) => ({
    ...m,
    unlocked: currentStreak >= m.days || (profile.badges && profile.badges.includes(m.badgeId)),
  }));

  // Find next milestone
  const nextMilestone =
    milestones.find((m) => currentStreak < m.days) ||
    milestones[milestones.length - 1];

  let prevMilestoneDays = 0;
  for (let i = 0; i < milestones.length; i++) {
    if (milestones[i].days === nextMilestone.days) {
      prevMilestoneDays = i > 0 ? milestones[i - 1].days : 0;
      break;
    }
  }

  const daysUntilNextMilestone = Math.max(0, nextMilestone.days - currentStreak);
  const milestoneRange = nextMilestone.days - prevMilestoneDays;
  const progressInMilestone = Math.max(0, currentStreak - prevMilestoneDays);
  const progressToNextMilestone =
    nextMilestone.unlocked
      ? 100
      : Math.min(100, Math.round((progressInMilestone / milestoneRange) * 100));

  const thirtyDayProgressPercent = Math.min(100, Math.round((currentStreak / 30) * 100));

  // Today stats
  let todayStats: { score: number; totalQuestions: number; accuracy: number } | undefined;
  if (todayEntry) {
    const tQ =
      (todayEntry.literacyTotal || todayEntry.thaiTotal || 0) +
      todayEntry.mathTotal +
      (todayEntry.problemSolvingTotal || 0) +
      (todayEntry.inquiryTotal || todayEntry.scienceTotal || 0) +
      (todayEntry.creativityTotal || 0) +
      (todayEntry.physicalHealthTotal || 0) +
      (todayEntry.socioEmotionalTotal || 0) +
      (todayEntry.citizenshipTotal || 0);

    const s =
      (todayEntry.literacyScore || todayEntry.thaiScore || 0) +
      todayEntry.mathScore +
      (todayEntry.problemSolvingScore || 0) +
      (todayEntry.inquiryScore || todayEntry.scienceScore || 0) +
      (todayEntry.creativityScore || 0) +
      (todayEntry.physicalHealthScore || 0) +
      (todayEntry.socioEmotionalScore || 0) +
      (todayEntry.citizenshipScore || 0);

    todayStats = {
      score: s,
      totalQuestions: tQ,
      accuracy: tQ > 0 ? Math.round((s / tQ) * 100) : todayEntry.accuracy || 100,
    };
  }

  // Encouragement quote for child & parents
  const motivationalTip = getMotivationalTip(currentStreak, isTodayCompleted, profile.name);

  return {
    currentStreak,
    longestStreak,
    totalActiveDaysIn30,
    isTodayCompleted,
    todayStats,
    thirtyDayProgressPercent,
    nextMilestone,
    progressToNextMilestone,
    daysUntilNextMilestone,
    milestones,
    calendarDays,
    motivationalTip,
  };
}

function getMotivationalTip(streak: number, isTodayDone: boolean, childName: string) {
  if (streak >= 30) {
    return {
      badge: '🏆 ระดับตำนาน (30 วันเต็ม)',
      levelEmoji: '👑',
      text: `มหัศจรรย์มาก ${childName}! หนูพิชิตการเรียนรู้ครบ 30 วันเต็ม เป็นแชมเปี้ยนตัวจริงของห้องเรียน!`,
      subtext: isTodayDone
        ? 'วันนี้ทำภารกิจสำเร็จแล้ว พักผ่อนและภูมิใจในตัวเองได้เต็มที่เลย!'
        : 'เข้าเล่นวันนี้เพื่อรักษาระดับแชมเปี้ยนสุดยอดไว้ให้ต่อเนื่อง!',
    };
  }

  if (streak >= 21) {
    return {
      badge: '🚀 นิสัยรักเรียนรู้ (21+ วัน)',
      levelEmoji: '🌟',
      text: `ยอดเยี่ยมที่สุด! ${childName} สร้างนิสัยรักการเรียนรู้ที่แข็งแกร่งสำเร็จแล้ว อีกนิดเดียวจะครบ 30 วัน!`,
      subtext: isTodayDone
        ? 'สตรีคไฟลุกพุ่งทะยานต่อเนื่อง วันนี้เก็บดาวครบเรียบร้อย!'
        : 'เหลืออีกนิดเดียวจะถึงถ้วยรางวัลทองคำ 30 วัน มาเริ่มเล่นกันเลย!',
    };
  }

  if (streak >= 14) {
    return {
      badge: '⚡ นักสู้ตัวจิ๋ว (14+ วัน)',
      levelEmoji: '⚡',
      text: `เก่งมากคนดี! สตรีคต่อเนื่องกว่า 2 สัปดาห์ สมองน้อยๆ กำลังจดจำและพัฒนาทักษะได้เร็วขึ้นมาก!`,
      subtext: isTodayDone
        ? 'ยอดเยี่ยม! ความสม่ำเสมอวันละนิดทำให้หนูเก่งขึ้นทุกวัน'
        : 'อย่าลืมเล่นวันนี้ 1 รอบ เพื่อรักษาไฟสตรีค 14 วันไว้นะครับ!',
    };
  }

  if (streak >= 7) {
    return {
      badge: '🌱 ก้าวแรกคนเก่ง (7+ วัน)',
      levelEmoji: '🌱',
      text: `หนูทำได้แล้ว! สตรีคครบสัปดาห์แรกสำเร็จ ความพยายามของ ${childName} ยอดเยี่ยมมากๆ`,
      subtext: isTodayDone
        ? 'วันนี้ภารกิจสำเร็จเรียบร้อย! พรุ่งนี้มาลุยต่อเพื่อพิชิต 14 วัน'
        : 'เหลืออีกก้าวเพื่อมุ่งหน้าสู่สตรีค 14 วัน แตะปุ่มเริ่มเล่นได้เลย!',
    };
  }

  if (streak > 0) {
    return {
      badge: '🔥 กำลังสะสมสตรีค',
      levelEmoji: '🔥',
      text: `เริ่มต้นได้อย่างงดงาม! ฝึกต่อเนื่องอีกเพียง ${7 - streak} วัน ก็จะปลดล็อกเหรียญตรา 7 วันแรกแล้ว`,
      subtext: isTodayDone
        ? 'วันนี้หนูฝึกไปแล้ว เก่งสุดๆ เลย พรุ่งนี้มาสะสมวันต่อไปกันนะ!'
        : 'วันนี้ยังไม่ได้ฝึก แวะมาเล่นเกมสนุกๆ สักรอบเพื่อจุดไฟสตรีคกันเถอะ!',
    };
  }

  return {
    badge: '🎯 เริ่มต้นก้าวแรกวันนี้',
    levelEmoji: '✨',
    text: `มาเริ่มต้นสตรีค 30 วันไปด้วยกันกับ ${childName}! เล่นวันละ 5 นาที เสริมพัฒนาการ 8 ทักษะ`,
    subtext: 'กดปุ่ม "เริ่มเล่นเกม" ด้านล่างเพื่อเริ่มสะสมสตรีควันแรกได้ทันที!',
  };
}
