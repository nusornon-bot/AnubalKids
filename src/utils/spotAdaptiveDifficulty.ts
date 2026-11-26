import { Grade } from '../types';
import { DifferenceItem, SpotDifferenceLevel } from '../data/skillGamesDataNew';

export type AdaptiveGrade = 'K1' | 'K2' | 'K3' | 'P1' | 'P2' | 'P3';

export interface SpotAdaptiveConfig {
  grade: AdaptiveGrade;
  thaiLabel: string;
  ageRange: string;
  icon: string;
  targetCount: number;
  radiusScale: number;
  hitTolerance: number;
  indicatorScale: number;
  difficultyTitle: string;
  difficultyDetail: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  badgeStyle: string;
}

export const SPOT_ADAPTIVE_CONFIGS: Record<AdaptiveGrade, SpotAdaptiveConfig> = {
  K1: {
    grade: 'K1',
    thaiLabel: 'อนุบาล 1',
    ageRange: '3-4 ขวบ',
    icon: '🐣',
    targetCount: 2,
    radiusScale: 1.35,
    hitTolerance: 8,
    indicatorScale: 1.25,
    difficultyTitle: 'ง่ายพิเศษ (2 จุด • วงใหญ่)',
    difficultyDetail: 'จุดแตกต่างขนาดใหญ่พิเศษ แตะง่าย เหมาะสำหรับฝึกสายตาเบื้องต้น',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-300',
    accentText: 'text-emerald-800',
    badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-300 ring-emerald-200',
  },
  K2: {
    grade: 'K2',
    thaiLabel: 'อนุบาล 2',
    ageRange: '4-5 ขวบ',
    icon: '🐥',
    targetCount: 3,
    radiusScale: 1.15,
    hitTolerance: 6,
    indicatorScale: 1.1,
    difficultyTitle: 'ปานกลาง (3 จุด • มาตรฐาน)',
    difficultyDetail: 'จุดต่างมาตรฐานปฐมวัย ฝึกเปรียบเทียบรูปทรงและสีสันรอบตัว',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-300',
    accentText: 'text-sky-800',
    badgeStyle: 'bg-sky-100 text-sky-800 border-sky-300 ring-sky-200',
  },
  K3: {
    grade: 'K3',
    thaiLabel: 'อนุบาล 3',
    ageRange: '5-6 ขวบ',
    icon: '🎒',
    targetCount: 4,
    radiusScale: 1.0,
    hitTolerance: 5,
    indicatorScale: 1.0,
    difficultyTitle: 'ท้าทาย (4 จุด • เตรียมเข้าประถม)',
    difficultyDetail: 'เพิ่มจุดสังเกตเป็น 4 จุด ฝึกความจำเพื่อใช้งาน (Working Memory)',
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-300',
    accentText: 'text-indigo-800',
    badgeStyle: 'bg-indigo-100 text-indigo-800 border-indigo-300 ring-indigo-200',
  },
  P1: {
    grade: 'P1',
    thaiLabel: 'ประถม 1',
    ageRange: '6-7 ขวบ',
    icon: '📘',
    targetCount: 5,
    radiusScale: 0.82,
    hitTolerance: 4,
    indicatorScale: 0.88,
    difficultyTitle: 'ระดับประถม 1 (5 จุด • สายตาไว)',
    difficultyDetail: 'จุดต่าง 5 จุด ขนาดเล็กลง ต้องการการสังเกตตำแหน่งที่ละเอียดขึ้น',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-300',
    accentText: 'text-amber-900',
    badgeStyle: 'bg-amber-100 text-amber-900 border-amber-300 ring-amber-200',
  },
  P2: {
    grade: 'P2',
    thaiLabel: 'ประถม 2',
    ageRange: '7-8 ขวบ',
    icon: '📗',
    targetCount: 6,
    radiusScale: 0.7,
    hitTolerance: 3,
    indicatorScale: 0.78,
    difficultyTitle: 'ระดับประถม 2 (6 จุด • ละเอียด)',
    difficultyDetail: 'จุดต่าง 6 จุด จุดสังเกตย่อขนาดลง ต้องเพ่งมองรายละเอียดเล็กๆ',
    accentBg: 'bg-orange-50',
    accentBorder: 'border-orange-300',
    accentText: 'text-orange-900',
    badgeStyle: 'bg-orange-100 text-orange-900 border-orange-300 ring-orange-200',
  },
  P3: {
    grade: 'P3',
    thaiLabel: 'ประถม 3+',
    ageRange: '8-9+ ขวบ',
    icon: '🦅',
    targetCount: 7,
    radiusScale: 0.58,
    hitTolerance: 2,
    indicatorScale: 0.68,
    difficultyTitle: 'ระดับประถม 3+ (7 จุด • สายตาเหยี่ยว)',
    difficultyDetail: 'ระดับสูงสุด 7 จุด ขนาดไมโคร ซ่อนเนียนตามฉาก ฝึกสมาธิขั้นสูงสุด',
    accentBg: 'bg-purple-50',
    accentBorder: 'border-purple-300',
    accentText: 'text-purple-900',
    badgeStyle: 'bg-purple-100 text-purple-900 border-purple-300 ring-purple-200',
  },
};

/**
 * Normalizes any grade string into supported AdaptiveGrade
 */
export function normalizeToAdaptiveGrade(grade?: string): AdaptiveGrade {
  if (!grade) return 'K2';
  if (grade === 'K1') return 'K1';
  if (grade === 'K2') return 'K2';
  if (grade === 'K3') return 'K3';
  if (grade === 'P1') return 'P1';
  if (grade === 'P2') return 'P2';
  if (grade.startsWith('P')) return 'P3';
  return 'K2';
}

/**
 * Pseudo-random generator with seed for reproducible re-rolls
 */
function seededRandom(seed: number): () => number {
  let s = Math.abs(seed) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Fisher-Yates shuffle with random function
 */
function shuffleArray<T>(arr: T[], rng: () => number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export interface AdaptiveSamplingResult {
  adaptedDifferences: DifferenceItem[];
  activeDifferenceIds: string[];
  config: SpotAdaptiveConfig;
  targetCount: number;
}

/**
 * Core Adaptive Algorithm:
 * 1. Takes candidate pool of differences from the level
 * 2. Samples N items according to the player's grade (K1=2, K2=3, K3=4, P1=5, P2=6, P3=7)
 * 3. Applies radiusScale to hit detection radius, widthPercent, and heightPercent
 * 4. Yields active difference IDs for the SVG scene renderer to conditionally alter
 */
export function sampleAdaptiveDifferences(
  level: SpotDifferenceLevel,
  grade: Grade | AdaptiveGrade,
  seed: number = Date.now()
): AdaptiveSamplingResult {
  const adaptiveGrade = normalizeToAdaptiveGrade(grade);
  const config = SPOT_ADAPTIVE_CONFIGS[adaptiveGrade];

  const pool = level.differences;
  const targetCount = Math.min(pool.length, config.targetCount);

  // If pool has more than targetCount, sample targetCount items randomly
  let selectedItems: DifferenceItem[];
  if (pool.length <= targetCount) {
    selectedItems = [...pool];
  } else {
    const rng = seededRandom(seed);
    const shuffled = shuffleArray(pool, rng);
    selectedItems = shuffled.slice(0, targetCount);
  }

  // Scale radius and indicator dimensions according to grade difficulty
  const adaptedDifferences: DifferenceItem[] = selectedItems.map((diff) => {
    const scaledRadius = Math.max(7, Math.round(diff.radius * config.radiusScale));
    const scaledWidth = Math.max(12, Math.round((diff.widthPercent || 24) * config.indicatorScale));
    const scaledHeight = Math.max(10, Math.round((diff.heightPercent || 18) * config.indicatorScale));

    return {
      ...diff,
      radius: scaledRadius,
      widthPercent: scaledWidth,
      heightPercent: scaledHeight,
    };
  });

  const activeDifferenceIds = adaptedDifferences.map((d) => d.id);

  return {
    adaptedDifferences,
    activeDifferenceIds,
    config,
    targetCount,
  };
}
