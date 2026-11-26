import { ChildProfile, Grade } from '../types';
import { SKILLS_LIST } from '../data/skills';

export type MilestoneCategory = 'overall' | 'subject' | 'streak' | 'volume';

export interface MasteryMilestone {
  id: string;
  category: MilestoneCategory;
  title: string;
  subtitle: string;
  citationText: string;
  icon: string;
  badgeLabel: string;
  isUnlocked: boolean;
  accuracy?: number;
  score?: number;
  total?: number;
  currentValue: number;
  targetValue: number;
  progressPercent: number;
  criteriaText: string;
  themeGradient: string; // e.g., 'from-amber-500 to-yellow-400'
  accentColor: string;
  sealColor: string;
}

export interface ProfileMilestoneSummary {
  profile: ChildProfile;
  overallAccuracy: number | null;
  totalQuestions: number;
  totalScore: number;
  unlockedCount: number;
  totalMilestones: number;
  milestones: MasteryMilestone[];
  unlockedMilestones: MasteryMilestone[];
  primaryMilestone: MasteryMilestone;
}

export function evaluateProfileMilestones(profile: ChildProfile): ProfileMilestoneSummary {
  const history = profile.history || [];
  let totalLitS = 0, totalLitQ = 0;
  let totalMathS = 0, totalMathQ = 0;
  let totalProbS = 0, totalProbQ = 0;
  let totalInqS = 0, totalInqQ = 0;
  let totalCreS = 0, totalCreQ = 0;
  let totalPhyS = 0, totalPhyQ = 0;
  let totalSocS = 0, totalSocQ = 0;
  let totalCitS = 0, totalCitQ = 0;

  history.forEach((h) => {
    totalLitS += h.literacyScore !== undefined ? h.literacyScore : h.thaiScore || 0;
    totalLitQ += h.literacyTotal !== undefined ? h.literacyTotal : h.thaiTotal || 0;
    totalInqS += h.inquiryScore !== undefined ? h.inquiryScore : h.scienceScore || 0;
    totalInqQ += h.inquiryTotal !== undefined ? h.inquiryTotal : h.scienceTotal || 0;
    totalMathS += h.mathScore || 0;
    totalMathQ += h.mathTotal || 0;
    totalProbS += h.problemSolvingScore || 0;
    totalProbQ += h.problemSolvingTotal || 0;
    totalCreS += h.creativityScore || 0;
    totalCreQ += h.creativityTotal || 0;
    totalPhyS += h.physicalHealthScore || 0;
    totalPhyQ += h.physicalHealthTotal || 0;
    totalSocS += h.socioEmotionalScore || 0;
    totalSocQ += h.socioEmotionalTotal || 0;
    totalCitS += h.citizenshipScore || 0;
    totalCitQ += h.citizenshipTotal || 0;
  });

  const totalAllS = totalLitS + totalMathS + totalProbS + totalInqS + totalCreS + totalPhyS + totalSocS + totalCitS;
  const totalAllQ = totalLitQ + totalMathQ + totalProbQ + totalInqQ + totalCreQ + totalPhyQ + totalSocQ + totalCitQ;
  const overallRate = totalAllQ > 0 ? Math.round((totalAllS / totalAllQ) * 100) : null;

  const skillTotals: Record<string, { s: number; q: number; rate: number | null }> = {
    literacy: { s: totalLitS, q: totalLitQ, rate: totalLitQ > 0 ? Math.round((totalLitS / totalLitQ) * 100) : null },
    math: { s: totalMathS, q: totalMathQ, rate: totalMathQ > 0 ? Math.round((totalMathS / totalMathQ) * 100) : null },
    problem_solving: { s: totalProbS, q: totalProbQ, rate: totalProbQ > 0 ? Math.round((totalProbS / totalProbQ) * 100) : null },
    inquiry: { s: totalInqS, q: totalInqQ, rate: totalInqQ > 0 ? Math.round((totalInqS / totalInqQ) * 100) : null },
    creativity: { s: totalCreS, q: totalCreQ, rate: totalCreQ > 0 ? Math.round((totalCreS / totalCreQ) * 100) : null },
    physical_health: { s: totalPhyS, q: totalPhyQ, rate: totalPhyQ > 0 ? Math.round((totalPhyS / totalPhyQ) * 100) : null },
    socio_emotional: { s: totalSocS, q: totalSocQ, rate: totalSocQ > 0 ? Math.round((totalSocS / totalSocQ) * 100) : null },
    citizenship: { s: totalCitS, q: totalCitQ, rate: totalCitQ > 0 ? Math.round((totalCitS / totalCitQ) * 100) : null },
  };

  const streakDays = profile.streakDays || 0;
  const totalQuestions = profile.totalQuestions || totalAllQ || 0;

  const milestones: MasteryMilestone[] = [];

  // 1. Overall Excellence (ระดับ 3 ยอดเยี่ยม ≥ 80%, ขั้นต่ำ 5 ข้อ)
  const isOverallMastery = (overallRate !== null && overallRate >= 80 && totalAllQ >= 5);
  milestones.push({
    id: 'overall_excellence',
    category: 'overall',
    title: 'เกียรติบัตรยอดเยี่ยมรอบด้านระดับ 3',
    subtitle: 'Overall Early Childhood Mastery • Level 3 Excellence',
    citationText: 'ได้ผ่านการประเมินทักษะและบรรลุมาตรฐานความเป็นเลิศระดับยอดเยี่ยม (Mastery Level 3) ครอบคลุมรอบด้านตามเกณฑ์มาตรฐานหลักสูตรการศึกษาปฐมวัย',
    icon: '🏆',
    badgeLabel: 'ยอดเยี่ยมระดับ 3',
    isUnlocked: isOverallMastery,
    accuracy: overallRate ?? 0,
    score: totalAllS,
    total: totalAllQ,
    currentValue: overallRate ?? 0,
    targetValue: 80,
    progressPercent: Math.min(100, Math.round(((overallRate ?? 0) / 80) * 100)),
    criteriaText: 'ความแม่นยำรวม ≥ 80% (ทำแบบฝึกหัดอย่างน้อย 5 ข้อ)',
    themeGradient: 'from-amber-500 via-yellow-400 to-amber-600',
    accentColor: '#D97706',
    sealColor: '#B45309',
  });

  // 2. Foundational Competence Standard (ระดับ 2 ผ่านเกณฑ์มาตรฐาน ≥ 60%, ขั้นต่ำ 5 ข้อ)
  const isOverallCompetence = (overallRate !== null && overallRate >= 60 && totalAllQ >= 5);
  milestones.push({
    id: 'overall_competence',
    category: 'overall',
    title: 'เกียรติบัตรผ่านเกณฑ์มาตรฐานปฐมวัย',
    subtitle: 'Foundational Early Childhood Competence • Level 2',
    citationText: 'ได้ผ่านการประเมินและบรรลุสมรรถนะการเรียนรู้ตามเกณฑ์มาตรฐานการศึกษาปฐมวัย มีพัฒนาการที่เหมาะสมตามวัยอย่างต่อเนื่อง',
    icon: '🎖️',
    badgeLabel: 'ผ่านเกณฑ์มาตรฐาน',
    isUnlocked: isOverallCompetence,
    accuracy: overallRate ?? 0,
    score: totalAllS,
    total: totalAllQ,
    currentValue: overallRate ?? 0,
    targetValue: 60,
    progressPercent: Math.min(100, Math.round(((overallRate ?? 0) / 60) * 100)),
    criteriaText: 'ความแม่นยำรวม ≥ 60% (ทำแบบฝึกหัดอย่างน้อย 5 ข้อ)',
    themeGradient: 'from-blue-500 via-indigo-400 to-blue-600',
    accentColor: '#2563EB',
    sealColor: '#1D4ED8',
  });

  // 3. Subject-Specific Mastery (8 Core Skills)
  SKILLS_LIST.forEach((sk) => {
    const data = skillTotals[sk.id] || { s: 0, q: 0, rate: null };
    const isSubjectUnlocked = data.rate !== null && data.rate >= 80 && data.q >= 3;
    const progress = data.rate !== null ? Math.min(100, Math.round((data.rate / 80) * 100)) : 0;

    milestones.push({
      id: `skill_mastery_${sk.id}`,
      category: 'subject',
      title: `เกียรติบัตรความเป็นเลิศ: ${sk.shortName.th}`,
      subtitle: `Excellence in ${sk.name.en || sk.shortName.en}`,
      citationText: `ได้ผ่านการประเมินทักษะด้าน "${sk.name.th}" โดยมีผลสัมฤทธิ์ระดับยอดเยี่ยม (ความแม่นยำ ${data.rate ?? 0}%) มีความรู้ความเข้าใจและทักษะปฏิบัติที่โดดเด่น`,
      icon: sk.icon,
      badgeLabel: `${sk.shortName.th} ยอดเยี่ยม`,
      isUnlocked: isSubjectUnlocked,
      accuracy: data.rate ?? 0,
      score: data.s,
      total: data.q,
      currentValue: data.rate ?? 0,
      targetValue: 80,
      progressPercent: progress,
      criteriaText: `ความแม่นยำทักษะนี้ ≥ 80% (ทำอย่างน้อย 3 ข้อ)`,
      themeGradient: 'from-emerald-500 via-teal-400 to-emerald-600',
      accentColor: '#059669',
      sealColor: '#047857',
    });
  });

  // 4. Learning Streak Milestones
  const streakMilestones = [
    {
      days: 7,
      id: 'streak_7',
      title: 'เกียรติบัตรความเพียรพยายาม 7 วัน',
      subtitle: '7-Day Dedicated Learning Streak',
      citation: 'มีความมุ่งมั่นและมีวินัยในการเรียนรู้อย่างต่อเนื่องครบ 7 วัน สะท้อนถึงความสม่ำเสมอและนิสัยรักการเรียนรู้',
      icon: '🔥',
    },
    {
      days: 14,
      id: 'streak_14',
      title: 'เกียรติบัตรยอดนักเรียนรู้ต่อเนื่อง 14 วัน',
      subtitle: '14-Day Consistent Learner Award',
      citation: 'มีความมุ่งมั่นและมีวินัยในการฝึกฝนทักษะอย่างต่อเนื่องครบ 14 วัน เป็นแบบอย่างที่ดีในการสร้างนิสัยการเรียนรู้',
      icon: '🌟',
    },
    {
      days: 30,
      id: 'streak_30',
      title: 'เกียรติบัตรแชมเปียนความสม่ำเสมอ 30 วัน',
      subtitle: '30-Day Monthly Champion Streak',
      citation: 'บรรลุความสำเร็จสูงสุดในการฝึกฝนทักษะอย่างต่อเนื่องสม่ำเสมอครบ 30 วัน แสดงถึงพลังแห่งความมุ่งมั่นและความเพียรพยายามอันยอดเยี่ยม',
      icon: '👑',
    },
  ];

  streakMilestones.forEach((st) => {
    const isUnlocked = streakDays >= st.days;
    milestones.push({
      id: st.id,
      category: 'streak',
      title: st.title,
      subtitle: st.subtitle,
      citationText: st.citation,
      icon: st.icon,
      badgeLabel: `สตรีค ${st.days} วัน`,
      isUnlocked,
      currentValue: streakDays,
      targetValue: st.days,
      progressPercent: Math.min(100, Math.round((streakDays / st.days) * 100)),
      criteriaText: `เข้าฝึกฝนต่อเนื่องติดต่อกันครบ ${st.days} วัน`,
      themeGradient: 'from-orange-500 via-amber-400 to-red-500',
      accentColor: '#EA580C',
      sealColor: '#C2410C',
    });
  });

  // 5. Volume Milestone (50 Questions)
  const isVolume50Unlocked = totalQuestions >= 50;
  milestones.push({
    id: 'volume_50',
    category: 'volume',
    title: 'เกียรติบัตรนักสำรวจความรู้ 50 ข้อ',
    subtitle: '50 Questions Knowledge Explorer',
    citationText: 'ได้เพียรพยายามและสั่งสมประสบการณ์ผ่านการทำแบบฝึกหัดสะสมครบ 50 ข้ออย่างมุ่งมั่นและตั้งใจ',
    icon: '🚀',
    badgeLabel: '50 ข้อสะสม',
    isUnlocked: isVolume50Unlocked,
    currentValue: totalQuestions,
    targetValue: 50,
    progressPercent: Math.min(100, Math.round((totalQuestions / 50) * 100)),
    criteriaText: 'ทำแบบฝึกหัดสะสมครบ 50 ข้อ',
    themeGradient: 'from-purple-500 via-violet-400 to-indigo-500',
    accentColor: '#7C3AED',
    sealColor: '#6D28D9',
  });

  const unlockedMilestones = milestones.filter((m) => m.isUnlocked);

  // Primary milestone to display by default:
  // If overall excellence is unlocked, choose it.
  // Otherwise, highest rate subject mastery, or the first unlocked milestone, or the first overall milestone.
  const primaryMilestone =
    unlockedMilestones.find((m) => m.id === 'overall_excellence') ||
    unlockedMilestones.find((m) => m.category === 'subject') ||
    unlockedMilestones[0] ||
    milestones[0];

  return {
    profile,
    overallAccuracy: overallRate,
    totalQuestions,
    totalScore: totalAllS,
    unlockedCount: unlockedMilestones.length,
    totalMilestones: milestones.length,
    milestones,
    unlockedMilestones,
    primaryMilestone,
  };
}

export function formatGradeThai(grade: Grade): string {
  switch (grade) {
    case 'K1':
      return 'อนุบาล 1 (K1)';
    case 'K2':
      return 'อนุบาล 2 (K2)';
    case 'K3':
      return 'อนุบาล 3 (K3)';
    default:
      return `อนุบาล (${grade})`;
  }
}

export function generateCertificateNumber(profileId: string, milestoneId: string): string {
  const year = new Date().getFullYear();
  const cleanProfile = profileId.replace(/[^a-zA-Z0-9]/g, '').slice(-4).toUpperCase() || 'KID1';
  const cleanMilestone = milestoneId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
  return `CERT-${year}-${cleanProfile}-${cleanMilestone}`;
}
