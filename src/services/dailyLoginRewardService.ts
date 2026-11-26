import { ChildProfile } from '../types';
import { storageService } from './storageService';
import { writeToAllDatabases } from './cloudSyncService';

export interface DailyRewardTier {
  day: number; // 1 to 7
  stars: number; // 10, 15, 20, 25, 30, 35, 50 bonus stars
  title: string;
  subtitle: string;
  badgeLabel: string;
  emoji: string;
  isGrandPrize?: boolean;
}

export const DAILY_REWARD_TIERS: DailyRewardTier[] = [
  {
    day: 1,
    stars: 10,
    title: 'ก้าวแรกคนเก่ง',
    subtitle: 'เริ่มต้นวันใหม่ด้วยพลังสดใส',
    badgeLabel: 'ก้าวแรก',
    emoji: '🌱',
  },
  {
    day: 2,
    stars: 15,
    title: 'นักสู้ขยันขันแข็ง',
    subtitle: 'ความพยายามต่อเนื่อง 2 วันติด',
    badgeLabel: 'นักสู้ 2 วัน',
    emoji: '⚡',
  },
  {
    day: 3,
    stars: 20,
    title: 'สมาธิยอดเยี่ยม',
    subtitle: 'ตั้งใจเรียนรู้ 3 วันสม่ำเสมอ',
    badgeLabel: 'สมาธิเยี่ยม',
    emoji: '🌟',
  },
  {
    day: 4,
    stars: 25,
    title: 'ต้นกล้าแห่งปัญญา',
    subtitle: 'สมองแจ่มใส ต่อเนื่อง 4 วัน',
    badgeLabel: 'ยอดปัญญา',
    emoji: '🎯',
  },
  {
    day: 5,
    stars: 30,
    title: 'สุดยอดระเบียบวินัย',
    subtitle: 'ก้าวสู่คนเก่ง 5 วันติด',
    badgeLabel: 'วินัยยอดเยี่ยม',
    emoji: '🚀',
  },
  {
    day: 6,
    stars: 35,
    title: 'อัจฉริยะตัวจิ๋ว',
    subtitle: 'พลังแห่งความสม่ำเสมอ 6 วัน',
    badgeLabel: 'อัจฉริยะ',
    emoji: '💎',
  },
  {
    day: 7,
    stars: 50,
    title: 'แชมเปี้ยน 7 วันเต็ม',
    subtitle: 'กล่องสมบัติทองคำเกียรติยศ!',
    badgeLabel: 'แชมเปี้ยน 7 วัน',
    emoji: '👑',
    isGrandPrize: true,
  },
];

export interface DailyLoginData {
  lastClaimedDate: string; // YYYY-MM-DD
  currentDayInCycle: number; // 1 to 7
  consecutiveDays: number;
  totalBonusStarsClaimed: number;
  history: {
    date: string;
    day: number;
    stars: number;
    claimedAt: string;
  }[];
}

export interface DailyRewardClaimResult {
  tier: DailyRewardTier;
  dayInCycle: number;
  consecutiveDays: number;
  starsAwarded: number;
  updatedProfile: ChildProfile;
  isFirstDay: boolean;
  isGrandPrize: boolean;
}

const STORAGE_PREFIX = 'kinder_edugame_daily_login_';

export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(referenceDate: Date = new Date()): string {
  const d = new Date(referenceDate);
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
}

export function getDailyLoginData(profileId: string): DailyLoginData {
  const defaultData: DailyLoginData = {
    lastClaimedDate: '',
    currentDayInCycle: 0,
    consecutiveDays: 0,
    totalBonusStarsClaimed: 0,
    history: [],
  };

  if (!profileId || typeof window === 'undefined') return defaultData;

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${profileId}`);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    return {
      lastClaimedDate: parsed.lastClaimedDate || '',
      currentDayInCycle: typeof parsed.currentDayInCycle === 'number' ? parsed.currentDayInCycle : 0,
      consecutiveDays: typeof parsed.consecutiveDays === 'number' ? parsed.consecutiveDays : 0,
      totalBonusStarsClaimed: typeof parsed.totalBonusStarsClaimed === 'number' ? parsed.totalBonusStarsClaimed : 0,
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch (err) {
    console.warn('Failed to parse daily login data:', err);
    return defaultData;
  }
}

export function saveDailyLoginData(profileId: string, data: DailyLoginData): void {
  if (!profileId || typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${profileId}`, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to save daily login data:', err);
  }
}

/**
 * Checks whether the profile can claim a daily login reward today.
 */
export function canClaimDailyReward(profile: ChildProfile | null | undefined): boolean {
  if (!profile || !profile.id) return false;
  const loginData = getDailyLoginData(profile.id);
  const todayStr = getLocalDateString();
  return loginData.lastClaimedDate !== todayStr;
}

/**
 * Determines which reward tier is ready for today (either pending claim or already claimed).
 */
export function getRewardStatus(profile: ChildProfile | null | undefined): {
  canClaimToday: boolean;
  targetDayInCycle: number;
  consecutiveDays: number;
  targetTier: DailyRewardTier;
  isTodayClaimed: boolean;
} {
  const defaultTier = DAILY_REWARD_TIERS[0];
  if (!profile || !profile.id) {
    return {
      canClaimToday: false,
      targetDayInCycle: 1,
      consecutiveDays: 0,
      targetTier: defaultTier,
      isTodayClaimed: false,
    };
  }

  const todayStr = getLocalDateString();
  const yesterdayStr = getYesterdayDateString();
  const currentData = getDailyLoginData(profile.id);

  if (currentData.lastClaimedDate === todayStr) {
    const day = currentData.currentDayInCycle || 1;
    const tier = DAILY_REWARD_TIERS.find((t) => t.day === day) || defaultTier;
    return {
      canClaimToday: false,
      targetDayInCycle: day,
      consecutiveDays: currentData.consecutiveDays,
      targetTier: tier,
      isTodayClaimed: true,
    };
  }

  let nextDay = 1;
  let nextConsecutive = 1;

  if (currentData.lastClaimedDate === yesterdayStr) {
    nextDay = (currentData.currentDayInCycle % 7) + 1;
    nextConsecutive = (currentData.consecutiveDays || 0) + 1;
  } else {
    nextDay = 1;
    nextConsecutive = 1;
  }

  const tier = DAILY_REWARD_TIERS.find((t) => t.day === nextDay) || defaultTier;
  return {
    canClaimToday: true,
    targetDayInCycle: nextDay,
    consecutiveDays: nextConsecutive,
    targetTier: tier,
    isTodayClaimed: false,
  };
}

/**
 * Claims today's daily login bonus reward for the student.
 * Awards bonus stars to the child's profile totalScore and updates streak.
 */
export function claimDailyReward(profile: ChildProfile): DailyRewardClaimResult {
  const todayStr = getLocalDateString();
  const yesterdayStr = getYesterdayDateString();
  const currentData = getDailyLoginData(profile.id);

  if (currentData.lastClaimedDate === todayStr) {
    const day = currentData.currentDayInCycle || 1;
    const tier = DAILY_REWARD_TIERS.find((t) => t.day === day) || DAILY_REWARD_TIERS[0];
    return {
      tier,
      dayInCycle: day,
      consecutiveDays: currentData.consecutiveDays,
      starsAwarded: 0,
      updatedProfile: profile,
      isFirstDay: day === 1,
      isGrandPrize: tier.isGrandPrize || false,
    };
  }

  let nextDayInCycle = 1;
  let newConsecutiveDays = 1;

  if (currentData.lastClaimedDate === yesterdayStr) {
    nextDayInCycle = (currentData.currentDayInCycle % 7) + 1;
    newConsecutiveDays = (currentData.consecutiveDays || 0) + 1;
  } else {
    nextDayInCycle = 1;
    newConsecutiveDays = 1;
  }

  const tier = DAILY_REWARD_TIERS.find((t) => t.day === nextDayInCycle) || DAILY_REWARD_TIERS[0];
  const starsAwarded = tier.stars;

  const updatedData: DailyLoginData = {
    lastClaimedDate: todayStr,
    currentDayInCycle: nextDayInCycle,
    consecutiveDays: newConsecutiveDays,
    totalBonusStarsClaimed: (currentData.totalBonusStarsClaimed || 0) + starsAwarded,
    history: [
      ...(currentData.history || []).slice(-30),
      {
        date: todayStr,
        day: nextDayInCycle,
        stars: starsAwarded,
        claimedAt: new Date().toISOString(),
      },
    ],
  };

  saveDailyLoginData(profile.id, updatedData);

  // Update profile totalScore & streak
  const updatedProfile: ChildProfile = {
    ...profile,
    totalScore: (profile.totalScore || 0) + starsAwarded,
    streakDays: Math.max(profile.streakDays || 1, newConsecutiveDays),
    lastPlayedDate: todayStr,
    updatedAt: new Date().toISOString(),
  };

  storageService.updateProfile(updatedProfile);

  // Background Cloud Sync
  try {
    writeToAllDatabases('profiles', updatedProfile.id, {
      id: updatedProfile.id,
      name: updatedProfile.name,
      grade: updatedProfile.grade,
      avatar: updatedProfile.avatar,
      avatarBg: updatedProfile.avatarBg || 'amber',
      totalScore: updatedProfile.totalScore,
      totalQuestions: updatedProfile.totalQuestions,
      streakDays: updatedProfile.streakDays,
      lastPlayedDate: updatedProfile.lastPlayedDate,
      badges: updatedProfile.badges || [],
      history: (updatedProfile.history || []).slice(-30),
      updatedAt: updatedProfile.updatedAt,
      dailyLogin: updatedData,
    }).catch((err) => console.warn('Daily login cloud sync warning:', err));
  } catch (err) {
    console.warn('Daily login cloud sync warning:', err);
  }

  return {
    tier,
    dayInCycle: nextDayInCycle,
    consecutiveDays: newConsecutiveDays,
    starsAwarded,
    updatedProfile,
    isFirstDay: nextDayInCycle === 1,
    isGrandPrize: tier.isGrandPrize || false,
  };
}
