import { Badge, ChildProfile, ExamSet, FeedbackItem, GameSettings, Grade, HistoryEntry, Question, Subject, CurriculumMode, Completed8SkillActivityRecord, OutdoorMissionSubmission } from '../types';
export type { Completed8SkillActivityRecord, OutdoorMissionSubmission };
import { PRESET_EXAM_SETS } from '../data/presetExamSets';
import { getDeviceId, getDeviceName } from './deviceService';
import { evaluateDailyMissionForRound, DailyMissionAwardResult } from './dailyMissionService';

const SETTINGS_KEY = 'kinder_edugame_settings';
const PROFILES_KEY = 'kinder_edugame_profiles';
const ACTIVE_PROFILE_KEY = 'kinder_edugame_active_profile';
const FEEDBACK_KEY = 'kinder_edugame_feedbacks';
const CUSTOM_QUESTIONS_KEY = 'kinder_edugame_custom_questions';
const DELETED_QUESTIONS_KEY = 'kinder_edugame_deleted_question_ids';
const LAST_QUESTION_SYNC_KEY = 'kinder_edugame_questions_last_sync';
const EXAM_SETS_KEY = 'kinder_edugame_exam_sets';
const ACTIVE_EXAM_SET_ID_KEY = 'kinder_edugame_active_exam_set_id';
const PARENT_PIN_KEY = 'kinder_edugame_parent_pin';
export const DEFAULT_PARENT_PIN = '1234';

export const DEFAULT_SETTINGS: GameSettings = {
  dwellTimeSeconds: 1.2, // Default 1.2s as specified
  questionsPerRound: 24,
  questionsPerSkill: 3,
  selectedSubjects: [
    'literacy',
    'math',
    'problem_solving',
    'inquiry',
    'creativity',
    'physical_health',
    'socio_emotional',
    'citizenship',
  ],
  theme: 'sunny',
  voicePersona: 'adult_female',
  language: 'th',
  autoSpeak: true,
  soundVolume: 0.8,
  cameraMirrored: true,
  showCameraFeed: true,
  handPointerScale: 1.0,
  controlMode: 'auto',
  enableAdaptiveDifficulty: true,
  showFunFacts: true,
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'streak_5',
    title: { th: 'หนูน้อยสม่ำเสมอ', en: '5-Day Streak', zh: '坚持5天小达人' },
    description: { th: 'เข้าเล่นต่อเนื่องครบ 5 วัน', en: 'Play 5 consecutive days', zh: '连续5天坚持学习' },
    icon: '🔥',
    unlocked: false,
    progress: 1,
    maxProgress: 5,
  },
  {
    id: 'streak_7',
    title: { th: 'ก้าวแรกคนเก่ง 7 วัน', en: '7-Day Streak', zh: '坚持7天小冠军' },
    description: { th: 'ฝึกฝนต่อเนื่องติดต่อกันครบ 7 วัน', en: 'Play 7 consecutive days', zh: '连续7天坚持学习' },
    icon: '🌱',
    unlocked: false,
    progress: 1,
    maxProgress: 7,
  },
  {
    id: 'streak_14',
    title: { th: 'นักสู้ตัวจิ๋ว 14 วัน', en: '14-Day Streak', zh: '坚持14天小毅士' },
    description: { th: 'ฝึกฝนต่อเนื่องติดต่อกันครบ 14 วัน (2 สัปดาห์)', en: 'Play 14 consecutive days', zh: '连续14天坚持学习' },
    icon: '⚡',
    unlocked: false,
    progress: 1,
    maxProgress: 14,
  },
  {
    id: 'streak_21',
    title: { th: 'นิสัยรักการเรียนรู้ 21 วัน', en: '21-Day Habit', zh: '21天习惯养成家' },
    description: { th: 'ฝึกฝนต่อเนื่องครบ 21 วัน สร้างนิสัยรักการเรียนรู้', en: 'Play 21 consecutive days', zh: '连续21天坚持学习' },
    icon: '🚀',
    unlocked: false,
    progress: 1,
    maxProgress: 21,
  },
  {
    id: 'streak_30',
    title: { th: 'แชมเปี้ยน 30 วันเต็ม', en: '30-Day Master Champion', zh: '30天满贯总冠军' },
    description: { th: 'พิชิตสตรีคการเรียนรู้ครบ 30 วันเต็ม รับถ้วยรางวัลเกียรติยศ', en: 'Play 30 consecutive days', zh: '连续30天坚持学习' },
    icon: '🏆',
    unlocked: false,
    progress: 1,
    maxProgress: 30,
  },
  {
    id: 'accuracy_100',
    title: { th: 'แม่นยำ 100%', en: '100% Perfection', zh: '满分神童' },
    description: { th: 'ตอบถูกครบทุกข้อใน 1 รอบการเล่น', en: 'Answer all questions right in a round', zh: '一轮游戏中全部答对' },
    icon: '🎯',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'combo_10',
    title: { th: 'ตอบถูก 10 ข้อติดกัน', en: '10 Combo Streak', zh: '连续答对10题' },
    description: { th: 'ตอบถูกต่อเนื่อง 10 ข้อโดยไม่ผิดเลย', en: 'Get 10 correct answers in a row', zh: '连续回答正确10道题' },
    icon: '⚡',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'thai_star',
    title: { th: '1. เซียนภาษาและรู้หนังสือ', en: 'Literacy Master', zh: '语言读写小达人' },
    description: { th: 'ตอบคำถามทักษะภาษาและการรู้หนังสือสะสม 10 ข้อ', en: 'Answer 10 literacy questions correctly', zh: '累计答对10道语言与读写题' },
    icon: '📖',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'math_ace',
    title: { th: '2. นักคิดรวบยอดและคำนวณ', en: 'Math Ace', zh: '数学思维小天才' },
    description: { th: 'ตอบคำถามการคิดรวบยอดและคำนวณสะสม 10 ข้อ', en: 'Answer 10 math questions correctly', zh: '累计答对10道概念与数学题' },
    icon: '🧮',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'prob_solver',
    title: { th: '3. ยอดนักแก้ปัญหาและตัดสินใจ', en: 'Problem Solver', zh: '小小问题解决家' },
    description: { th: 'ตอบคำถามทักษะการคิดแก้ปัญหาและตัดสินใจสะสม 10 ข้อ', en: 'Answer 10 problem solving questions correctly', zh: '累计答对10道解决问题题' },
    icon: '💡',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'sci_scout',
    title: { th: '4. นักแสวงหาความรู้ตัวจริง', en: 'Inquiry Explorer', zh: '求知探索小小家' },
    description: { th: 'ตอบคำถามการแสวงหาความรู้สะสม 10 ข้อ', en: 'Answer 10 inquiry questions correctly', zh: '累计答对10道探索求知题' },
    icon: '🔬',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'creativity_star',
    title: { th: '5. จินตนาการสร้างสรรค์ยอดเยี่ยม', en: 'Creative Star', zh: '创意无限小明星' },
    description: { th: 'ตอบคำถามจินตนาการและความคิดสร้างสรรค์สะสม 10 ข้อ', en: 'Answer 10 creativity questions correctly', zh: '累计答对10道想象与创造力题' },
    icon: '🎨',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'physical_champ',
    title: { th: '6. หนูน้อยสุขภาพดีแข็งแรง', en: 'Physical Health Star', zh: '健康强健小明星' },
    description: { th: 'ตอบคำถามด้านสุขภาวะทางกายและสุขอนามัยสะสม 10 ข้อ', en: 'Answer 10 physical health questions correctly', zh: '累计答对10道身体健康与卫生题' },
    icon: '🏃',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'socio_emotional_star',
    title: { th: '7. เพื่อนที่น่ารักอารมณ์ดี', en: 'Socio-Emotional Star', zh: '情商与社交小模范' },
    description: { th: 'ตอบคำถามด้านอารมณ์ จิตใจ และสังคมสะสม 10 ข้อ', en: 'Answer 10 socio-emotional questions correctly', zh: '累计答对10道情绪与社交题' },
    icon: '🤝',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'citizenship_hero',
    title: { th: '8. พลเมืองดีมีน้ำใจ', en: 'Good Citizen Hero', zh: '文明小公民先锋' },
    description: { th: 'ตอบคำถามด้านความเป็นพลเมืองและความเป็นไทยสะสม 10 ข้อ', en: 'Answer 10 citizenship & Thai culture questions correctly', zh: '累计答对10道公民素养与文化题' },
    icon: '🇹🇭',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'magic_finger',
    title: { th: 'เซียนนิ้ววิเศษ', en: 'Magic Finger', zh: '神指魔法师' },
    description: { th: 'ใช้กล้องจับมือ Hand Tracking ตอบถูก 5 ข้อ', en: 'Score 5 correct answers with hand tracking', zh: '用手势追踪答对5道题' },
    icon: '🖐️',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'daily_mission_hero',
    title: { th: 'ผู้พิชิตภารกิจประจำวัน', en: 'Daily Mission Hero', zh: '每日任务小勇士' },
    description: { th: 'พิชิตภารกิจประจำวันสำเร็จอย่างน้อย 1 ครั้ง เพื่อรับคะแนนโบนัสพิเศษ', en: 'Complete at least 1 Daily Mission and earn bonus points', zh: '完成至少1次每日任务并赢取奖励分' },
    icon: '🎯',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'thai_master',
    title: { th: 'เก่งภาษาไทยปฐมวัย', en: 'Thai Language Master', zh: '泰语启蒙小状元' },
    description: { th: 'ตอบคำถามภาษาไทย พยัญชนะ สระ และคำศัพท์ถูกต้องสะสม 10 ข้อ', en: 'Answer 10 Thai language questions correctly', zh: '累计答对10道泰语字母与词汇题' },
    icon: '🇹🇭',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'english_star',
    title: { th: 'English Superstar', en: 'English Superstar', zh: '英语启蒙小明星' },
    description: { th: 'ตอบคำถามภาษาอังกฤษ Phonics, Alphabet และคำศัพท์สะสม 10 ข้อ', en: 'Answer 10 English questions correctly', zh: '累计答对10道英语自然拼读与单词题' },
    icon: '🔤',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'math_genius',
    title: { th: 'ยอดอัจฉริยะคณิตคิดไว', en: 'Smart Math Genius', zh: '速算心算小天才' },
    description: { th: 'ตอบคำถามคณิตศาสตร์ การนับเลข รูปทรง และการคำนวณสะสม 15 ข้อ', en: 'Answer 15 math questions correctly', zh: '累计答对15道数学计数与几何运算题' },
    icon: '🧮',
    unlocked: false,
    progress: 0,
    maxProgress: 15,
  },
  {
    id: 'trio_champion',
    title: { th: 'ผู้พิชิต 3 วิชาหลักสู่ ป.1', en: 'Trio Foundation Champion', zh: '幼升小三大主科全能王' },
    description: { th: 'ฝึกฝนวิชาภาษาไทย ภาษาอังกฤษ และคณิตศาสตร์ได้อย่างยอดเยี่ยม', en: 'Achieve great mastery across Thai, English, and Math', zh: '泰语、英语和数学三大主科均达到优秀' },
    icon: '🌟',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
  },
];

// Generate 30 days of past mock data for sample profiles covering the 8 early childhood skills
function generatePast30DaysHistory(baseRate = 0.85): HistoryEntry[] {
  const list: HistoryEntry[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Every 2-3 days there is learning activity
    if (i % 2 === 0 || i < 5) {
      const litTotal = 2 + Math.floor(Math.random() * 2);
      const litScore = Math.max(1, Math.round(litTotal * (baseRate + (Math.random() * 0.2 - 0.1))));

      const mathTotal = 2 + Math.floor(Math.random() * 2);
      const mathScore = Math.max(1, Math.round(mathTotal * (baseRate + (Math.random() * 0.2 - 0.1))));

      const probTotal = 2 + Math.floor(Math.random() * 2);
      const probScore = Math.max(1, Math.round(probTotal * (baseRate + (Math.random() * 0.2 - 0.1))));

      const inqTotal = 2 + Math.floor(Math.random() * 2);
      const inqScore = Math.max(1, Math.round(inqTotal * (baseRate + (Math.random() * 0.2 - 0.1))));

      const creTotal = 2 + Math.floor(Math.random() * 2);
      const creScore = Math.max(1, Math.round(creTotal * (baseRate + (Math.random() * 0.2 - 0.1))));

      const phyTotal = 2 + Math.floor(Math.random() * 2);
      const phyScore = Math.max(1, Math.round(phyTotal * (baseRate + (Math.random() * 0.2 - 0.1))));

      const socTotal = 2 + Math.floor(Math.random() * 2);
      const socScore = Math.max(1, Math.round(socTotal * (baseRate + (Math.random() * 0.2 - 0.1))));

      const citTotal = 2 + Math.floor(Math.random() * 2);
      const citScore = Math.max(1, Math.round(citTotal * (baseRate + (Math.random() * 0.2 - 0.1))));

      const totalQ = litTotal + mathTotal + probTotal + inqTotal + creTotal + phyTotal + socTotal + citTotal;
      const totalS = litScore + mathScore + probScore + inqScore + creScore + phyScore + socScore + citScore;

      list.push({
        date: dateStr,
        literacyScore: litScore,
        literacyTotal: litTotal,
        mathScore,
        mathTotal,
        problemSolvingScore: probScore,
        problemSolvingTotal: probTotal,
        inquiryScore: inqScore,
        inquiryTotal: inqTotal,
        creativityScore: creScore,
        creativityTotal: creTotal,
        physicalHealthScore: phyScore,
        physicalHealthTotal: phyTotal,
        socioEmotionalScore: socScore,
        socioEmotionalTotal: socTotal,
        citizenshipScore: citScore,
        citizenshipTotal: citTotal,
        // 6 Competencies (หลักสูตรสถานศึกษาฐานสมรรถนะ ป.1-ป.3)
        selfManagementScore: Math.max(1, Math.round(citTotal * baseRate)),
        selfManagementTotal: citTotal,
        higherOrderThinkingScore: Math.max(1, Math.round(probTotal * baseRate)),
        higherOrderThinkingTotal: probTotal,
        communicationScore: Math.max(1, Math.round(litTotal * baseRate)),
        communicationTotal: litTotal,
        teamworkScore: Math.max(1, Math.round(socTotal * baseRate)),
        teamworkTotal: socTotal,
        activeCitizenshipScore: Math.max(1, Math.round(citTotal * baseRate)),
        activeCitizenshipTotal: citTotal,
        sustainableLivingScore: Math.max(1, Math.round(inqTotal * baseRate)),
        sustainableLivingTotal: inqTotal,
        // Legacy compatibility
        scienceScore: inqScore,
        scienceTotal: inqTotal,
        thaiScore: litScore,
        thaiTotal: litTotal,
        accuracy: Math.round((totalS / totalQ) * 100),
      });
    }
  }
  return list;
}

function generateHistoryFromTotalScore(
  totalScore: number,
  totalQuestions: number,
  lastPlayedDate?: string
): HistoryEntry[] {
  if (totalScore <= 0 || totalQuestions <= 0) return [];
  const entries: HistoryEntry[] = [];
  const accuracy = Math.min(100, Math.max(10, Math.round((totalScore / totalQuestions) * 100)));
  const baseDate = lastPlayedDate ? new Date(lastPlayedDate) : new Date();

  // Distribute questions into 1-5 daily sessions
  const numSessions = Math.min(5, Math.max(1, Math.ceil(totalQuestions / 30)));
  let remainingScore = totalScore;
  let remainingQuestions = totalQuestions;

  for (let i = numSessions - 1; i >= 0; i--) {
    const sessionDate = new Date(baseDate.getTime() - i * 86400000);
    const dateStr = sessionDate.toISOString().split('T')[0];

    const sessionQuestions = i === 0 ? remainingQuestions : Math.round(remainingQuestions / (i + 1));
    const sessionScore = i === 0 ? remainingScore : Math.min(remainingScore, Math.round((sessionQuestions * accuracy) / 100));

    remainingQuestions -= sessionQuestions;
    remainingScore -= sessionScore;

    const basePerSkill = Math.floor(sessionQuestions / 8);
    const extra = sessionQuestions % 8;

    const skillsCount = [
      basePerSkill + (extra > 0 ? 1 : 0),
      basePerSkill + (extra > 1 ? 1 : 0),
      basePerSkill + (extra > 2 ? 1 : 0),
      basePerSkill + (extra > 3 ? 1 : 0),
      basePerSkill + (extra > 4 ? 1 : 0),
      basePerSkill + (extra > 5 ? 1 : 0),
      basePerSkill + (extra > 6 ? 1 : 0),
      basePerSkill,
    ];

    let allocScoreRem = sessionScore;
    const skillsScore = skillsCount.map((q, idx) => {
      if (q === 0) return 0;
      if (idx === 7) return Math.min(q, Math.max(0, allocScoreRem));
      const s = Math.min(q, Math.round((q * sessionScore) / Math.max(1, sessionQuestions)));
      allocScoreRem -= s;
      return Math.max(0, s);
    });

    entries.push({
      date: dateStr,
      literacyScore: skillsScore[0],
      literacyTotal: skillsCount[0],
      mathScore: skillsScore[1],
      mathTotal: skillsCount[1],
      problemSolvingScore: skillsScore[2],
      problemSolvingTotal: skillsCount[2],
      inquiryScore: skillsScore[3],
      inquiryTotal: skillsCount[3],
      creativityScore: skillsScore[4],
      creativityTotal: skillsCount[4],
      physicalHealthScore: skillsScore[5],
      physicalHealthTotal: skillsCount[5],
      socioEmotionalScore: skillsScore[6],
      socioEmotionalTotal: skillsCount[6],
      citizenshipScore: skillsScore[7],
      citizenshipTotal: skillsCount[7],
      thaiScore: skillsScore[0],
      thaiTotal: skillsCount[0],
      scienceScore: skillsScore[3],
      scienceTotal: skillsCount[3],
      accuracy: sessionQuestions > 0 ? Math.round((sessionScore / sessionQuestions) * 100) : accuracy,
    });
  }

  return entries;
}

const DEFAULT_PROFILES: ChildProfile[] = [
  {
    id: 'profile-1',
    name: 'น้องต้นหม่อน',
    grade: 'K2',
    avatar: '🌱',
    avatarBg: 'emerald',
    createdAt: '2026-08-01T08:00:00.000Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    totalScore: 142,
    totalQuestions: 160,
    streakDays: 4,
    lastPlayedDate: new Date().toISOString().split('T')[0],
    badges: ['accuracy_100', 'math_ace'],
    history: generatePast30DaysHistory(0.9),
  },
  {
    id: 'profile-2',
    name: 'น้องไหมมุก',
    grade: 'K1',
    avatar: '🌸',
    avatarBg: 'pink',
    createdAt: '2026-08-10T09:15:00.000Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    totalScore: 195,
    totalQuestions: 220,
    streakDays: 5,
    lastPlayedDate: new Date().toISOString().split('T')[0],
    badges: ['streak_5', 'accuracy_100', 'sci_scout'],
    history: generatePast30DaysHistory(0.85),
  },
  {
    id: 'profile-3',
    name: 'น้องภูผา',
    grade: 'K3',
    avatar: '🦁',
    avatarBg: 'orange',
    createdAt: '2026-08-15T10:30:00.000Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    totalScore: 210,
    totalQuestions: 230,
    streakDays: 6,
    lastPlayedDate: new Date().toISOString().split('T')[0],
    badges: ['thai_star', 'math_ace', 'prob_solver'],
    history: generatePast30DaysHistory(0.92),
  },
  {
    id: 'profile-4',
    name: 'น้องพอใจ',
    grade: 'K1',
    avatar: '🐰',
    avatarBg: 'amber',
    createdAt: '2026-08-18T11:00:00.000Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    totalScore: 120,
    totalQuestions: 130,
    streakDays: 3,
    lastPlayedDate: new Date().toISOString().split('T')[0],
    badges: ['creativity_star', 'physical_champ'],
    history: generatePast30DaysHistory(0.88),
  },
  {
    id: 'profile-5',
    name: 'น้องสายฟ้า',
    grade: 'K2',
    avatar: '⚡',
    avatarBg: 'sky',
    createdAt: '2026-08-20T14:20:00.000Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    totalScore: 165,
    totalQuestions: 180,
    streakDays: 4,
    lastPlayedDate: new Date().toISOString().split('T')[0],
    badges: ['accuracy_100', 'magic_finger'],
    history: generatePast30DaysHistory(0.86),
  },
  {
    id: 'profile-6',
    name: 'น้องเอลซ่า',
    grade: 'K2',
    avatar: '👸',
    avatarBg: 'disney_gold',
    createdAt: '2026-08-22T08:00:00.000Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    totalScore: 180,
    totalQuestions: 200,
    streakDays: 5,
    lastPlayedDate: new Date().toISOString().split('T')[0],
    badges: ['creativity_star', 'accuracy_100'],
    history: generatePast30DaysHistory(0.9),
  },
  {
    id: 'profile-7',
    name: 'น้องสไปเดอร์',
    grade: 'K3',
    avatar: '🕷️',
    avatarBg: 'marvel_red',
    createdAt: '2026-08-25T09:30:00.000Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    totalScore: 220,
    totalQuestions: 240,
    streakDays: 7,
    lastPlayedDate: new Date().toISOString().split('T')[0],
    badges: ['streak_5', 'math_ace'],
    history: generatePast30DaysHistory(0.93),
  },
  // ประถมศึกษา (ป.1 - ป.3) หลักสูตรสถานศึกษาฐานสมรรถนะ
  {
    id: 'profile-p1-tonkla',
    name: 'พี่ต้นกล้า',
    grade: 'P1',
    avatar: '🚀',
    avatarBg: 'indigo',
    createdAt: '2026-08-26T08:00:00.000Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    totalScore: 210,
    totalQuestions: 230,
    streakDays: 6,
    lastPlayedDate: new Date().toISOString().split('T')[0],
    badges: ['accuracy_100', 'math_ace', 'sci_scout'],
    history: generatePast30DaysHistory(0.92),
  },
  {
    id: 'profile-p2-fah',
    name: 'พี่ฟ้าใส',
    grade: 'P2',
    avatar: '🐬',
    avatarBg: 'sky',
    createdAt: '2026-08-28T09:15:00.000Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    totalScore: 245,
    totalQuestions: 260,
    streakDays: 8,
    lastPlayedDate: new Date().toISOString().split('T')[0],
    badges: ['streak_5', 'sci_scout', 'creativity_star'],
    history: generatePast30DaysHistory(0.94),
  },
  {
    id: 'profile-p3-phumin',
    name: 'พี่ภูมินทร์',
    grade: 'P3',
    avatar: '🦁',
    avatarBg: 'amber',
    createdAt: '2026-08-30T10:00:00.000Z',
    updatedAt: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
    totalScore: 280,
    totalQuestions: 300,
    streakDays: 10,
    lastPlayedDate: new Date().toISOString().split('T')[0],
    badges: ['streak_5', 'math_ace', 'prob_solver'],
    history: generatePast30DaysHistory(0.95),
  },
];

// Default Google Apps Script Webhook URL for direct Google Sheets logging
export const DEFAULT_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzqkj13ymux9qacLqYDxtrlDLohQJKQfajLPDusvJZde6HxBk75iWCHOES0PW3-Dk1XSg/exec';

export class StorageService {
  getSettings(): GameSettings {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Normalize subjects if legacy subjects exist or empty
        let subjects = parsed.selectedSubjects;
        if (!Array.isArray(subjects) || subjects.length === 0) {
          subjects = DEFAULT_SETTINGS.selectedSubjects;
        } else {
          // If contains legacy 'thai' or 'science', ensure modern equivalents
          const mapped = subjects.map((s: string) => {
            if (s === 'thai') return 'literacy';
            if (s === 'science') return 'inquiry';
            return s;
          });
          // Ensure all 8 skills are represented if previously just 3 or 5 (only if not CBE mode)
          const hasCbeSubject = mapped.some((s: string) =>
            ['self_management', 'higher_order_thinking', 'communication', 'teamwork_collaboration', 'active_citizenship', 'sustainable_living'].includes(s)
          );
          if (!hasCbeSubject && mapped.length <= 5 && !mapped.includes('physical_health')) {
            subjects = DEFAULT_SETTINGS.selectedSubjects;
          } else {
            subjects = Array.from(new Set(mapped));
          }
        }
        const controlMode = parsed.controlMode || 'auto';
        const questionsPerSkill = parsed.questionsPerSkill || 3;
        const questionsPerRound = parsed.questionsPerRound || (subjects.length * questionsPerSkill);
        const curriculumMode = parsed.curriculumMode || (['P1', 'P2', 'P3'].includes(parsed.currentGrade) ? 'cbe_primary' : 'early_childhood');
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          controlMode,
          curriculumMode,
          selectedSubjects: subjects,
          questionsPerSkill,
          questionsPerRound,
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  }

  saveSettings(settings: GameSettings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }

  getParentPin(): string {
    try {
      const pin = localStorage.getItem(PARENT_PIN_KEY);
      if (pin && /^\d{4}$/.test(pin)) {
        return pin;
      }
    } catch {
      // ignore
    }
    return DEFAULT_PARENT_PIN;
  }

  setParentPin(newPin: string): boolean {
    if (!/^\d{4}$/.test(newPin)) return false;
    try {
      localStorage.setItem(PARENT_PIN_KEY, newPin);
      return true;
    } catch {
      return false;
    }
  }

  verifyParentPin(enteredPin: string): boolean {
    return enteredPin.trim() === this.getParentPin();
  }

  getProfiles(): ChildProfile[] {
    try {
      const raw = localStorage.getItem(PROFILES_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check if existing profiles contain old defaults (ฟ้าใส, วินเนอร์, ภูมิ)
          const hasOldDefaults = parsed.some(
            (p: ChildProfile) =>
              p.name.includes('ฟ้าใส') ||
              p.name.includes('วินเนอร์') ||
              p.name.includes('ภูมิ')
          );
          if (hasOldDefaults) {
            this.saveProfiles(DEFAULT_PROFILES);
            return DEFAULT_PROFILES;
          }

          // Auto-repair profiles that have totalScore > 0 but lost or empty history
          let repaired = false;
          parsed.forEach((p: ChildProfile) => {
            if (!p.deviceId) {
              p.deviceId = getDeviceId();
              p.createdDeviceName = getDeviceName();
              repaired = true;
            }
            if (!p.history) {
              p.history = [];
              repaired = true;
            }
            if (p.totalScore > 0 && p.history.length === 0) {
              p.history = generateHistoryFromTotalScore(
                p.totalScore,
                p.totalQuestions || p.totalScore,
                p.lastPlayedDate
              );
              repaired = true;
            }
          });

          // Ensure primary P1-P3 profiles exist so that CBE curriculum mode always has students
          const hasPrimary = parsed.some((p: ChildProfile) => ['P1', 'P2', 'P3'].includes(p.grade));
          if (!hasPrimary) {
            const devId = getDeviceId();
            const devName = getDeviceName();
            const pDefaults = DEFAULT_PROFILES.filter((p) => ['P1', 'P2', 'P3'].includes(p.grade)).map((p) => ({
              ...p,
              deviceId: devId,
              createdDeviceName: devName,
            }));
            parsed.push(...pDefaults);
            repaired = true;
          }

          if (repaired) {
            this.saveProfiles(parsed);
          }

          return parsed;
        }
      }
    } catch {
      // ignore
    }
    const currentDevId = getDeviceId();
    const currentDevName = getDeviceName();
    const seeded = DEFAULT_PROFILES.map((p) => ({
      ...p,
      deviceId: currentDevId,
      createdDeviceName: currentDevName,
    }));
    this.saveProfiles(seeded);
    return seeded;
  }

  saveProfiles(profiles: ChildProfile[]) {
    try {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    } catch {
      // ignore
    }
  }

  getActiveProfile(): ChildProfile {
    const profiles = this.getProfiles();
    try {
      const activeId = localStorage.getItem(ACTIVE_PROFILE_KEY);
      if (activeId) {
        const found = profiles.find((p) => p.id === activeId);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return profiles[0];
  }

  setActiveProfile(profileId: string) {
    try {
      localStorage.setItem(ACTIVE_PROFILE_KEY, profileId);
    } catch {
      // ignore
    }
  }

  createProfile(
    name: string,
    grade: Grade,
    avatar: string,
    avatarBg: string = 'amber'
  ): ChildProfile {
    const profiles = this.getProfiles();
    const nowIso = new Date().toISOString();
    const newProfile: ChildProfile = {
      id: `profile-${Date.now()}`,
      name: name.trim() || 'เพื่อนตัวน้อย',
      grade,
      avatar: avatar || '⭐',
      avatarBg: avatarBg || 'amber',
      createdAt: nowIso,
      updatedAt: nowIso,
      deviceId: getDeviceId(),
      createdDeviceName: getDeviceName(),
      totalScore: 0,
      totalQuestions: 0,
      streakDays: 0,
      lastPlayedDate: '',
      badges: [],
      history: [],
    };
    profiles.push(newProfile);
    this.saveProfiles(profiles);
    this.setActiveProfile(newProfile.id);
    return newProfile;
  }

  updateProfile(updated: ChildProfile) {
    const profiles = this.getProfiles();
    const index = profiles.findIndex((p) => p.id === updated.id);
    if (index !== -1) {
      updated.updatedAt = new Date().toISOString();
      profiles[index] = updated;
      this.saveProfiles(profiles);
    }
  }

  recordRoundResult(
    profileId: string,
    results: { subject: Subject; isCorrect: boolean }[],
    usedHandTracking = false
  ): { newlyUnlockedBadges: Badge[]; dailyMissionAwarded?: DailyMissionAwardResult | null } {
    const profiles = this.getProfiles();
    const profile = profiles.find((p) => p.id === profileId);
    if (!profile) return { newlyUnlockedBadges: [], dailyMissionAwarded: null };

    const todayStr = new Date().toISOString().split('T')[0];

    // Calc breakdown for all 8 skills + 6 CBE competencies
    let roundLitScore = 0;
    let roundLitTotal = 0;
    let roundEngScore = 0;
    let roundEngTotal = 0;
    let roundMathScore = 0;
    let roundMathTotal = 0;
    let roundProbScore = 0;
    let roundProbTotal = 0;
    let roundInqScore = 0;
    let roundInqTotal = 0;
    let roundCreScore = 0;
    let roundCreTotal = 0;
    let roundPhyScore = 0;
    let roundPhyTotal = 0;
    let roundSocScore = 0;
    let roundSocTotal = 0;
    let roundCitScore = 0;
    let roundCitTotal = 0;
    // 6 CBE Competencies
    let roundSelfMgmtScore = 0;
    let roundSelfMgmtTotal = 0;
    let roundHotScore = 0;
    let roundHotTotal = 0;
    let roundCommScore = 0;
    let roundCommTotal = 0;
    let roundTeamScore = 0;
    let roundTeamTotal = 0;
    let roundActiveCitScore = 0;
    let roundActiveCitTotal = 0;
    let roundSustScore = 0;
    let roundSustTotal = 0;
    // 10 Thai Phonics Units (สพฐ.)
    let roundPhonicsConsonantScore = 0;
    let roundPhonicsConsonantTotal = 0;
    let roundPhonicsVowelScore = 0;
    let roundPhonicsVowelTotal = 0;
    let roundPhonicsToneScore = 0;
    let roundPhonicsToneTotal = 0;
    let roundPhonicsKorkaaScore = 0;
    let roundPhonicsKorkaaTotal = 0;
    let roundPhonicsToneKorkaaScore = 0;
    let roundPhonicsToneKorkaaTotal = 0;
    let roundPhonicsDirectScore = 0;
    let roundPhonicsDirectTotal = 0;
    let roundPhonicsToneSpellingScore = 0;
    let roundPhonicsToneSpellingTotal = 0;
    let roundPhonicsIndirectScore = 0;
    let roundPhonicsIndirectTotal = 0;
    let roundPhonicsClusterScore = 0;
    let roundPhonicsClusterTotal = 0;
    let roundPhonicsLeadingScore = 0;
    let roundPhonicsLeadingTotal = 0;

    results.forEach((r) => {
      const isCorrect = r.isCorrect;
      if (r.subject === 'literacy' || r.subject === 'thai') {
        roundLitTotal++;
        if (isCorrect) roundLitScore++;
      } else if (r.subject === 'english') {
        roundEngTotal++;
        if (isCorrect) roundEngScore++;
      } else if (r.subject === 'math') {
        roundMathTotal++;
        if (isCorrect) roundMathScore++;
      } else if (r.subject === 'problem_solving') {
        roundProbTotal++;
        if (isCorrect) roundProbScore++;
      } else if (r.subject === 'inquiry' || r.subject === 'science') {
        roundInqTotal++;
        if (isCorrect) roundInqScore++;
      } else if (r.subject === 'creativity') {
        roundCreTotal++;
        if (isCorrect) roundCreScore++;
      } else if (r.subject === 'physical_health') {
        roundPhyTotal++;
        if (isCorrect) roundPhyScore++;
      } else if (r.subject === 'socio_emotional') {
        roundSocTotal++;
        if (isCorrect) roundSocScore++;
      } else if (r.subject === 'citizenship') {
        roundCitTotal++;
        if (isCorrect) roundCitScore++;
      } else if (r.subject === 'self_management') {
        roundSelfMgmtTotal++;
        if (isCorrect) roundSelfMgmtScore++;
      } else if (r.subject === 'higher_order_thinking') {
        roundHotTotal++;
        if (isCorrect) roundHotScore++;
      } else if (r.subject === 'communication') {
        roundCommTotal++;
        if (isCorrect) roundCommScore++;
      } else if (r.subject === 'teamwork_collaboration') {
        roundTeamTotal++;
        if (isCorrect) roundTeamScore++;
      } else if (r.subject === 'active_citizenship') {
        roundActiveCitTotal++;
        if (isCorrect) roundActiveCitScore++;
      } else if (r.subject === 'sustainable_living') {
        roundSustTotal++;
        if (isCorrect) roundSustScore++;
      } else if (r.subject === 'phonics_consonant') {
        roundPhonicsConsonantTotal++;
        if (isCorrect) roundPhonicsConsonantScore++;
      } else if (r.subject === 'phonics_vowel') {
        roundPhonicsVowelTotal++;
        if (isCorrect) roundPhonicsVowelScore++;
      } else if (r.subject === 'phonics_tone') {
        roundPhonicsToneTotal++;
        if (isCorrect) roundPhonicsToneScore++;
      } else if (r.subject === 'phonics_korkaa') {
        roundPhonicsKorkaaTotal++;
        if (isCorrect) roundPhonicsKorkaaScore++;
      } else if (r.subject === 'phonics_tone_korkaa') {
        roundPhonicsToneKorkaaTotal++;
        if (isCorrect) roundPhonicsToneKorkaaScore++;
      } else if (r.subject === 'phonics_direct_spelling') {
        roundPhonicsDirectTotal++;
        if (isCorrect) roundPhonicsDirectScore++;
      } else if (r.subject === 'phonics_tone_spelling') {
        roundPhonicsToneSpellingTotal++;
        if (isCorrect) roundPhonicsToneSpellingScore++;
      } else if (r.subject === 'phonics_indirect_spelling') {
        roundPhonicsIndirectTotal++;
        if (isCorrect) roundPhonicsIndirectScore++;
      } else if (r.subject === 'phonics_cluster') {
        roundPhonicsClusterTotal++;
        if (isCorrect) roundPhonicsClusterScore++;
      } else if (r.subject === 'phonics_leading_consonant') {
        roundPhonicsLeadingTotal++;
        if (isCorrect) roundPhonicsLeadingScore++;
      }
    });

    const totalRoundCorrect =
      roundLitScore +
      roundEngScore +
      roundMathScore +
      roundProbScore +
      roundInqScore +
      roundCreScore +
      roundPhyScore +
      roundSocScore +
      roundCitScore +
      roundSelfMgmtScore +
      roundHotScore +
      roundCommScore +
      roundTeamScore +
      roundActiveCitScore +
      roundSustScore +
      roundPhonicsConsonantScore +
      roundPhonicsVowelScore +
      roundPhonicsToneScore +
      roundPhonicsKorkaaScore +
      roundPhonicsToneKorkaaScore +
      roundPhonicsDirectScore +
      roundPhonicsToneSpellingScore +
      roundPhonicsIndirectScore +
      roundPhonicsClusterScore +
      roundPhonicsLeadingScore;
    const totalRoundQuestions =
      roundLitTotal +
      roundEngTotal +
      roundMathTotal +
      roundProbTotal +
      roundInqTotal +
      roundCreTotal +
      roundPhyTotal +
      roundSocTotal +
      roundCitTotal +
      roundSelfMgmtTotal +
      roundHotTotal +
      roundCommTotal +
      roundTeamTotal +
      roundActiveCitTotal +
      roundSustTotal +
      roundPhonicsConsonantTotal +
      roundPhonicsVowelTotal +
      roundPhonicsToneTotal +
      roundPhonicsKorkaaTotal +
      roundPhonicsToneKorkaaTotal +
      roundPhonicsDirectTotal +
      roundPhonicsToneSpellingTotal +
      roundPhonicsIndirectTotal +
      roundPhonicsClusterTotal +
      roundPhonicsLeadingTotal;
    const isPerfectRound = totalRoundQuestions > 0 && totalRoundCorrect === totalRoundQuestions;

    profile.totalScore += totalRoundCorrect;
    profile.totalQuestions += totalRoundQuestions;

    // Check streak
    if (profile.lastPlayedDate !== todayStr) {
      const last = new Date(profile.lastPlayedDate);
      const now = new Date(todayStr);
      const diffTime = Math.abs(now.getTime() - last.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        profile.streakDays += 1;
      } else if (diffDays > 1) {
        profile.streakDays = 1;
      }
      profile.lastPlayedDate = todayStr;
    }

    // Append / update history entry
    const existingEntryIndex = profile.history.findIndex((h) => h.date === todayStr);
    if (existingEntryIndex !== -1) {
      const cur = profile.history[existingEntryIndex];
      cur.literacyScore = (cur.literacyScore || 0) + roundLitScore;
      cur.literacyTotal = (cur.literacyTotal || 0) + roundLitTotal;
      cur.englishScore = (cur.englishScore || 0) + roundEngScore;
      cur.englishTotal = (cur.englishTotal || 0) + roundEngTotal;
      cur.mathScore += roundMathScore;
      cur.mathTotal += roundMathTotal;
      cur.problemSolvingScore = (cur.problemSolvingScore || 0) + roundProbScore;
      cur.problemSolvingTotal = (cur.problemSolvingTotal || 0) + roundProbTotal;
      cur.inquiryScore = (cur.inquiryScore || 0) + roundInqScore;
      cur.inquiryTotal = (cur.inquiryTotal || 0) + roundInqTotal;
      cur.creativityScore = (cur.creativityScore || 0) + roundCreScore;
      cur.creativityTotal = (cur.creativityTotal || 0) + roundCreTotal;
      cur.physicalHealthScore = (cur.physicalHealthScore || 0) + roundPhyScore;
      cur.physicalHealthTotal = (cur.physicalHealthTotal || 0) + roundPhyTotal;
      cur.socioEmotionalScore = (cur.socioEmotionalScore || 0) + roundSocScore;
      cur.socioEmotionalTotal = (cur.socioEmotionalTotal || 0) + roundSocTotal;
      cur.citizenshipScore = (cur.citizenshipScore || 0) + roundCitScore;
      cur.citizenshipTotal = (cur.citizenshipTotal || 0) + roundCitTotal;
      // 6 CBE Competencies
      cur.selfManagementScore = (cur.selfManagementScore || 0) + roundSelfMgmtScore;
      cur.selfManagementTotal = (cur.selfManagementTotal || 0) + roundSelfMgmtTotal;
      cur.higherOrderThinkingScore = (cur.higherOrderThinkingScore || 0) + roundHotScore;
      cur.higherOrderThinkingTotal = (cur.higherOrderThinkingTotal || 0) + roundHotTotal;
      cur.communicationScore = (cur.communicationScore || 0) + roundCommScore;
      cur.communicationTotal = (cur.communicationTotal || 0) + roundCommTotal;
      cur.teamworkScore = (cur.teamworkScore || 0) + roundTeamScore;
      cur.teamworkTotal = (cur.teamworkTotal || 0) + roundTeamTotal;
      cur.activeCitizenshipScore = (cur.activeCitizenshipScore || 0) + roundActiveCitScore;
      cur.activeCitizenshipTotal = (cur.activeCitizenshipTotal || 0) + roundActiveCitTotal;
      cur.sustainableLivingScore = (cur.sustainableLivingScore || 0) + roundSustScore;
      cur.sustainableLivingTotal = (cur.sustainableLivingTotal || 0) + roundSustTotal;
      // 10 Thai Phonics Units (สพฐ.)
      cur.phonicsConsonantScore = (cur.phonicsConsonantScore || 0) + roundPhonicsConsonantScore;
      cur.phonicsConsonantTotal = (cur.phonicsConsonantTotal || 0) + roundPhonicsConsonantTotal;
      cur.phonicsVowelScore = (cur.phonicsVowelScore || 0) + roundPhonicsVowelScore;
      cur.phonicsVowelTotal = (cur.phonicsVowelTotal || 0) + roundPhonicsVowelTotal;
      cur.phonicsToneScore = (cur.phonicsToneScore || 0) + roundPhonicsToneScore;
      cur.phonicsToneTotal = (cur.phonicsToneTotal || 0) + roundPhonicsToneTotal;
      cur.phonicsKorkaaScore = (cur.phonicsKorkaaScore || 0) + roundPhonicsKorkaaScore;
      cur.phonicsKorkaaTotal = (cur.phonicsKorkaaTotal || 0) + roundPhonicsKorkaaTotal;
      cur.phonicsToneKorkaaScore = (cur.phonicsToneKorkaaScore || 0) + roundPhonicsToneKorkaaScore;
      cur.phonicsToneKorkaaTotal = (cur.phonicsToneKorkaaTotal || 0) + roundPhonicsToneKorkaaTotal;
      cur.phonicsDirectSpellingScore = (cur.phonicsDirectSpellingScore || 0) + roundPhonicsDirectScore;
      cur.phonicsDirectSpellingTotal = (cur.phonicsDirectSpellingTotal || 0) + roundPhonicsDirectTotal;
      cur.phonicsToneSpellingScore = (cur.phonicsToneSpellingScore || 0) + roundPhonicsToneSpellingScore;
      cur.phonicsToneSpellingTotal = (cur.phonicsToneSpellingTotal || 0) + roundPhonicsToneSpellingTotal;
      cur.phonicsIndirectSpellingScore = (cur.phonicsIndirectSpellingScore || 0) + roundPhonicsIndirectScore;
      cur.phonicsIndirectSpellingTotal = (cur.phonicsIndirectSpellingTotal || 0) + roundPhonicsIndirectTotal;
      cur.phonicsClusterScore = (cur.phonicsClusterScore || 0) + roundPhonicsClusterScore;
      cur.phonicsClusterTotal = (cur.phonicsClusterTotal || 0) + roundPhonicsClusterTotal;
      cur.phonicsLeadingConsonantScore = (cur.phonicsLeadingConsonantScore || 0) + roundPhonicsLeadingScore;
      cur.phonicsLeadingConsonantTotal = (cur.phonicsLeadingConsonantTotal || 0) + roundPhonicsLeadingTotal;

      // Legacy fields
      cur.scienceScore += roundInqScore;
      cur.scienceTotal += roundInqTotal;
      cur.thaiScore += roundLitScore;
      cur.thaiTotal += roundLitTotal;

      const tQ =
        (cur.literacyTotal || 0) +
        (cur.englishTotal || 0) +
        cur.mathTotal +
        (cur.problemSolvingTotal || 0) +
        (cur.inquiryTotal || 0) +
        (cur.creativityTotal || 0) +
        (cur.physicalHealthTotal || 0) +
        (cur.socioEmotionalTotal || 0) +
        (cur.citizenshipTotal || 0) +
        (cur.selfManagementTotal || 0) +
        (cur.higherOrderThinkingTotal || 0) +
        (cur.communicationTotal || 0) +
        (cur.teamworkTotal || 0) +
        (cur.activeCitizenshipTotal || 0) +
        (cur.sustainableLivingTotal || 0) +
        (cur.phonicsConsonantTotal || 0) +
        (cur.phonicsVowelTotal || 0) +
        (cur.phonicsToneTotal || 0) +
        (cur.phonicsKorkaaTotal || 0) +
        (cur.phonicsToneKorkaaTotal || 0) +
        (cur.phonicsDirectSpellingTotal || 0) +
        (cur.phonicsToneSpellingTotal || 0) +
        (cur.phonicsIndirectSpellingTotal || 0) +
        (cur.phonicsClusterTotal || 0) +
        (cur.phonicsLeadingConsonantTotal || 0);
      const tS =
        (cur.literacyScore || 0) +
        (cur.englishScore || 0) +
        cur.mathScore +
        (cur.problemSolvingScore || 0) +
        (cur.inquiryScore || 0) +
        (cur.creativityScore || 0) +
        (cur.physicalHealthScore || 0) +
        (cur.socioEmotionalScore || 0) +
        (cur.citizenshipScore || 0) +
        (cur.selfManagementScore || 0) +
        (cur.higherOrderThinkingScore || 0) +
        (cur.communicationScore || 0) +
        (cur.teamworkScore || 0) +
        (cur.activeCitizenshipScore || 0) +
        (cur.sustainableLivingScore || 0) +
        (cur.phonicsConsonantScore || 0) +
        (cur.phonicsVowelScore || 0) +
        (cur.phonicsToneScore || 0) +
        (cur.phonicsKorkaaScore || 0) +
        (cur.phonicsToneKorkaaScore || 0) +
        (cur.phonicsDirectSpellingScore || 0) +
        (cur.phonicsToneSpellingScore || 0) +
        (cur.phonicsIndirectSpellingScore || 0) +
        (cur.phonicsClusterScore || 0) +
        (cur.phonicsLeadingConsonantScore || 0);
      cur.accuracy = tQ > 0 ? Math.round((tS / tQ) * 100) : 100;
    } else {
      profile.history.push({
        date: todayStr,
        literacyScore: roundLitScore,
        literacyTotal: roundLitTotal,
        englishScore: roundEngScore,
        englishTotal: roundEngTotal,
        mathScore: roundMathScore,
        mathTotal: roundMathTotal,
        problemSolvingScore: roundProbScore,
        problemSolvingTotal: roundProbTotal,
        inquiryScore: roundInqScore,
        inquiryTotal: roundInqTotal,
        creativityScore: roundCreScore,
        creativityTotal: roundCreTotal,
        physicalHealthScore: roundPhyScore,
        physicalHealthTotal: roundPhyTotal,
        socioEmotionalScore: roundSocScore,
        socioEmotionalTotal: roundSocTotal,
        citizenshipScore: roundCitScore,
        citizenshipTotal: roundCitTotal,
        // 6 CBE Competencies
        selfManagementScore: roundSelfMgmtScore,
        selfManagementTotal: roundSelfMgmtTotal,
        higherOrderThinkingScore: roundHotScore,
        higherOrderThinkingTotal: roundHotTotal,
        communicationScore: roundCommScore,
        communicationTotal: roundCommTotal,
        teamworkScore: roundTeamScore,
        teamworkTotal: roundTeamTotal,
        activeCitizenshipScore: roundActiveCitScore,
        activeCitizenshipTotal: roundActiveCitTotal,
        sustainableLivingScore: roundSustScore,
        sustainableLivingTotal: roundSustTotal,
        // 10 Thai Phonics Units (สพฐ.)
        phonicsConsonantScore: roundPhonicsConsonantScore,
        phonicsConsonantTotal: roundPhonicsConsonantTotal,
        phonicsVowelScore: roundPhonicsVowelScore,
        phonicsVowelTotal: roundPhonicsVowelTotal,
        phonicsToneScore: roundPhonicsToneScore,
        phonicsToneTotal: roundPhonicsToneTotal,
        phonicsKorkaaScore: roundPhonicsKorkaaScore,
        phonicsKorkaaTotal: roundPhonicsKorkaaTotal,
        phonicsToneKorkaaScore: roundPhonicsToneKorkaaScore,
        phonicsToneKorkaaTotal: roundPhonicsToneKorkaaTotal,
        phonicsDirectSpellingScore: roundPhonicsDirectScore,
        phonicsDirectSpellingTotal: roundPhonicsDirectTotal,
        phonicsToneSpellingScore: roundPhonicsToneSpellingScore,
        phonicsToneSpellingTotal: roundPhonicsToneSpellingTotal,
        phonicsIndirectSpellingScore: roundPhonicsIndirectScore,
        phonicsIndirectSpellingTotal: roundPhonicsIndirectTotal,
        phonicsClusterScore: roundPhonicsClusterScore,
        phonicsClusterTotal: roundPhonicsClusterTotal,
        phonicsLeadingConsonantScore: roundPhonicsLeadingScore,
        phonicsLeadingConsonantTotal: roundPhonicsLeadingTotal,
        // Legacy
        scienceScore: roundInqScore,
        scienceTotal: roundInqTotal,
        thaiScore: roundLitScore,
        thaiTotal: roundLitTotal,
        accuracy:
          totalRoundQuestions > 0 ? Math.round((totalRoundCorrect / totalRoundQuestions) * 100) : 100,
      });
    }

    // Keep max 30 entries
    if (profile.history.length > 30) {
      profile.history = profile.history.slice(-30);
    }

    // Check badge unlocks
    const newlyUnlockedBadges: Badge[] = [];

    const tryUnlock = (badgeId: string) => {
      if (!profile.badges.includes(badgeId)) {
        profile.badges.push(badgeId);
        const b = INITIAL_BADGES.find((x) => x.id === badgeId);
        if (b) newlyUnlockedBadges.push(b);
      }
    };

    if (profile.streakDays >= 5) tryUnlock('streak_5');
    if (profile.streakDays >= 7) tryUnlock('streak_7');
    if (profile.streakDays >= 14) tryUnlock('streak_14');
    if (profile.streakDays >= 21) tryUnlock('streak_21');
    if (profile.streakDays >= 30) tryUnlock('streak_30');
    if (isPerfectRound && totalRoundQuestions >= 4) tryUnlock('accuracy_100');

    // Totals across all history for subject badges
    const totalLitCorrect = profile.history.reduce(
      (sum, h) => sum + (h.literacyScore !== undefined ? h.literacyScore : h.thaiScore || 0),
      0
    );
    const totalEngCorrect = profile.history.reduce(
      (sum, h) => sum + (h.englishScore || 0),
      0
    );
    const totalMathCorrect = profile.history.reduce((sum, h) => sum + h.mathScore, 0);
    const totalProbCorrect = profile.history.reduce(
      (sum, h) => sum + (h.problemSolvingScore || 0),
      0
    );
    const totalInqCorrect = profile.history.reduce(
      (sum, h) => sum + (h.inquiryScore !== undefined ? h.inquiryScore : h.scienceScore || 0),
      0
    );
    const totalCreCorrect = profile.history.reduce(
      (sum, h) => sum + (h.creativityScore || 0),
      0
    );
    const totalPhyCorrect = profile.history.reduce(
      (sum, h) => sum + (h.physicalHealthScore || 0),
      0
    );
    const totalSocCorrect = profile.history.reduce(
      (sum, h) => sum + (h.socioEmotionalScore || 0),
      0
    );
    const totalCitCorrect = profile.history.reduce(
      (sum, h) => sum + (h.citizenshipScore || 0),
      0
    );

    if (totalLitCorrect >= 10) tryUnlock('thai_star');
    if (totalLitCorrect >= 10) tryUnlock('thai_master');
    if (totalEngCorrect >= 10) tryUnlock('english_star');
    if (totalMathCorrect >= 10) tryUnlock('math_ace');
    if (totalMathCorrect >= 15) tryUnlock('math_genius');
    if (totalLitCorrect >= 8 && totalEngCorrect >= 8 && totalMathCorrect >= 8) tryUnlock('trio_champion');
    if (totalProbCorrect >= 10) tryUnlock('prob_solver');
    if (totalInqCorrect >= 10) tryUnlock('sci_scout');
    if (totalCreCorrect >= 10) tryUnlock('creativity_star');
    if (totalPhyCorrect >= 10) tryUnlock('physical_champ');
    if (totalSocCorrect >= 10) tryUnlock('socio_emotional_star');
    if (totalCitCorrect >= 10) tryUnlock('citizenship_hero');
    if (usedHandTracking && totalRoundCorrect >= 4) tryUnlock('magic_finger');

    // Evaluate Daily Mission for today's featured subject aligned with curriculum
    const dailyMissionAwarded = evaluateDailyMissionForRound(profile, results, this.getCurriculumMode());
    if (dailyMissionAwarded) {
      tryUnlock('daily_mission_hero');
    }

    this.updateProfile(profile);
    return { newlyUnlockedBadges, dailyMissionAwarded };
  }

  /**
   * Recalculate all statistics (total score, questions, streak, last played date, badges)
   * from the ground up based on the actual remaining play history.
   */
  recalculateProfileStats(profile: ChildProfile): void {
    const history = profile.history || [];

    let newScore = 0;
    let newQuestions = 0;
    let totalLitCorrect = 0;
    let totalEngCorrect = 0;
    let totalMathCorrect = 0;
    let totalProbCorrect = 0;
    let totalInqCorrect = 0;
    let totalCreCorrect = 0;
    let totalPhyCorrect = 0;
    let totalSocCorrect = 0;
    let totalCitCorrect = 0;
    let hasPerfectRound = false;

    history.forEach((h) => {
      const lit = h.literacyScore !== undefined ? h.literacyScore : h.thaiScore || 0;
      const litTot = h.literacyTotal !== undefined ? h.literacyTotal : h.thaiTotal || 0;
      const eng = h.englishScore || 0;
      const engTot = h.englishTotal || 0;
      const inq = h.inquiryScore !== undefined ? h.inquiryScore : h.scienceScore || 0;
      const inqTot = h.inquiryTotal !== undefined ? h.inquiryTotal : h.scienceTotal || 0;
      const prob = h.problemSolvingScore || 0;
      const probTot = h.problemSolvingTotal || 0;
      const cre = h.creativityScore || 0;
      const creTot = h.creativityTotal || 0;
      const phy = h.physicalHealthScore || 0;
      const phyTot = h.physicalHealthTotal || 0;
      const soc = h.socioEmotionalScore || 0;
      const socTot = h.socioEmotionalTotal || 0;
      const cit = h.citizenshipScore || 0;
      const citTot = h.citizenshipTotal || 0;

      const roundCorrect = lit + eng + h.mathScore + prob + inq + cre + phy + soc + cit;
      const roundTotal = litTot + engTot + h.mathTotal + probTot + inqTot + creTot + phyTot + socTot + citTot;

      newScore += roundCorrect;
      newQuestions += roundTotal;
      totalLitCorrect += lit;
      totalEngCorrect += eng;
      totalMathCorrect += h.mathScore;
      totalProbCorrect += prob;
      totalInqCorrect += inq;
      totalCreCorrect += cre;
      totalPhyCorrect += phy;
      totalSocCorrect += soc;
      totalCitCorrect += cit;

      if (roundTotal >= 4 && roundCorrect === roundTotal) {
        hasPerfectRound = true;
      }
    });

    profile.totalScore = newScore;
    profile.totalQuestions = newQuestions;

    // Recalculate lastPlayedDate and consecutive streakDays
    if (history.length === 0) {
      profile.lastPlayedDate = '';
      profile.streakDays = 0;
    } else {
      const dates = Array.from(new Set(history.map((h) => h.date))).sort();
      profile.lastPlayedDate = dates[dates.length - 1];

      let streak = 1;
      for (let i = dates.length - 1; i > 0; i--) {
        const dCurrent = new Date(dates[i]);
        const dPrev = new Date(dates[i - 1]);
        const diffDays = Math.round(
          (dCurrent.getTime() - dPrev.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays === 1) {
          streak++;
        } else {
          break;
        }
      }
      profile.streakDays = streak;
    }

    // Re-audit badge achievements to ensure complete accuracy
    const validBadges: string[] = [];
    if (profile.streakDays >= 5) validBadges.push('streak_5');
    if (hasPerfectRound) validBadges.push('accuracy_100');
    if (totalLitCorrect >= 10) validBadges.push('thai_star');
    if (totalLitCorrect >= 10) validBadges.push('thai_master');
    if (totalEngCorrect >= 10) validBadges.push('english_star');
    if (totalMathCorrect >= 10) validBadges.push('math_ace');
    if (totalMathCorrect >= 15) validBadges.push('math_genius');
    if (totalLitCorrect >= 8 && totalEngCorrect >= 8 && totalMathCorrect >= 8) validBadges.push('trio_champion');
    if (totalProbCorrect >= 10) validBadges.push('prob_solver');
    if (totalInqCorrect >= 10) validBadges.push('sci_scout');
    if (totalCreCorrect >= 10) validBadges.push('creativity_star');
    if (totalPhyCorrect >= 10) validBadges.push('physical_champ');
    if (totalSocCorrect >= 10) validBadges.push('socio_emotional_star');
    if (totalCitCorrect >= 10) validBadges.push('citizenship_hero');
    if (profile.badges.includes('magic_finger')) validBadges.push('magic_finger');
    if (profile.badges.includes('combo_10')) validBadges.push('combo_10');
    if (profile.badges.includes('daily_mission_hero')) validBadges.push('daily_mission_hero');

    profile.badges = validBadges;
  }

  deleteProfile(profileId: string): {
    success: boolean;
    message?: string;
    remainingProfiles: ChildProfile[];
    newActiveProfile?: ChildProfile;
  } {
    const profiles = this.getProfiles();
    if (profiles.length <= 1) {
      return {
        success: false,
        message: 'ไม่สามารถลบได้ เนื่องจากต้องมีโปรไฟล์อย่างน้อย 1 คน',
        remainingProfiles: profiles,
      };
    }

    const remaining = profiles.filter((p) => p.id !== profileId);
    this.saveProfiles(remaining);

    // If active profile was deleted, switch active to the first remaining profile
    let active = this.getActiveProfile();
    if (active.id === profileId) {
      this.setActiveProfile(remaining[0].id);
      active = remaining[0];
    }

    return {
      success: true,
      message: 'ลบโปรไฟล์และปรับปรุงสถิติรวมเรียบร้อยแล้ว',
      remainingProfiles: remaining,
      newActiveProfile: active,
    };
  }

  deleteHistoryEntry(
    profileId: string,
    historyIndex: number
  ): { success: boolean; message?: string; updatedProfile?: ChildProfile } {
    const profiles = this.getProfiles();
    const profile = profiles.find((p) => p.id === profileId);
    if (!profile) {
      return { success: false, message: 'ไม่พบโปรไฟล์ที่ต้องการ' };
    }

    if (!profile.history || historyIndex < 0 || historyIndex >= profile.history.length) {
      return { success: false, message: 'ไม่พบรายการประวัติที่ต้องการลบ' };
    }

    // Remove entry
    profile.history.splice(historyIndex, 1);

    // Recalculate totalScore, totalQuestions, streak, lastPlayedDate, and badges
    this.recalculateProfileStats(profile);

    this.updateProfile(profile);
    return {
      success: true,
      message: 'ลบประวัติการเล่นและคำนวณสถิติใหม่ทั้งหมดเรียบร้อยแล้ว ✨',
      updatedProfile: profile,
    };
  }

  // --- Feedback to Developer Methods ---
  getFeedbacks(): FeedbackItem[] {
    try {
      const raw = localStorage.getItem(FEEDBACK_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  saveFeedback(item: FeedbackItem): FeedbackItem[] {
    const list = this.getFeedbacks();
    const updated = [item, ...list];
    try {
      localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save feedback', e);
    }
    return updated;
  }

  deleteFeedback(id: string): FeedbackItem[] {
    const list = this.getFeedbacks();
    const updated = list.filter((f) => f.id !== id);
    try {
      localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete feedback', e);
    }
    return updated;
  }

  clearFeedbacks(): void {
    try {
      localStorage.removeItem(FEEDBACK_KEY);
    } catch {
      // ignore
    }
  }

  // --- Google Apps Script Webhook URL for Google Sheets ---
  getAppsScriptUrl(): string {
    try {
      const envUrl = ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_APPS_SCRIPT_URL as string) || '';
      return envUrl || DEFAULT_APPS_SCRIPT_URL;
    } catch {
      return DEFAULT_APPS_SCRIPT_URL;
    }
  }

  setAppsScriptUrl(url: string): void {
    try {
      if (!url.trim()) {
        localStorage.removeItem('kids_game_apps_script_url');
      } else {
        localStorage.setItem('kids_game_apps_script_url', url.trim());
      }
    } catch (e) {
      console.error('Failed to save Apps Script URL', e);
    }
  }

  // --- Question Management Methods (เพิ่ม/แก้ไข/ลบ/ดึงข้อสอบ) ---
  getCustomQuestions(): Question[] {
    try {
      const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      const map = new Map<string, Question>();
      for (const item of parsed) {
        if (item && item.id && !map.has(item.id)) {
          map.set(item.id, item);
        }
      }
      return Array.from(map.values());
    } catch {
      return [];
    }
  }

  saveCustomQuestions(questions: Question[]): void {
    try {
      const map = new Map<string, Question>();
      for (const q of questions) {
        if (q && q.id) {
          map.set(q.id, q);
        }
      }
      localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(Array.from(map.values())));
    } catch (e) {
      console.error('Failed to save custom questions', e);
    }
  }

  addCustomQuestion(q: Omit<Question, 'id'> & { id?: string }): Question {
    const questions = this.getCustomQuestions();
    const newQuestion: Question = {
      ...q,
      id: q.id || `custom-q-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      isCustom: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newQuestion, ...questions];
    this.saveCustomQuestions(updated);
    return newQuestion;
  }

  updateQuestion(id: string, updates: Partial<Question>): Question | null {
    const questions = this.getCustomQuestions();
    const idx = questions.findIndex((q) => q.id === id);
    if (idx !== -1) {
      const updatedQ: Question = {
        ...questions[idx],
        ...updates,
        id,
        isCustom: true,
        updatedAt: new Date().toISOString(),
      };
      questions[idx] = updatedQ;
      this.saveCustomQuestions(questions);
      return updatedQ;
    }
    return null;
  }

  deleteQuestion(id: string): void {
    // 1. Remove from custom questions
    const questions = this.getCustomQuestions();
    const filtered = questions.filter((q) => q.id !== id);
    this.saveCustomQuestions(filtered);

    // 2. Add to deleted IDs (in case it is a built-in question)
    const deletedIds = this.getDeletedQuestionIds();
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      this.saveDeletedQuestionIds(deletedIds);
    }
  }

  getDeletedQuestionIds(): string[] {
    try {
      const raw = localStorage.getItem(DELETED_QUESTIONS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  saveDeletedQuestionIds(ids: string[]): void {
    try {
      localStorage.setItem(DELETED_QUESTIONS_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to save deleted question ids', e);
    }
  }

  restoreQuestion(id: string): void {
    const deletedIds = this.getDeletedQuestionIds();
    const filtered = deletedIds.filter((item) => item !== id);
    this.saveDeletedQuestionIds(filtered);
  }

  resetQuestionsToDefault(): void {
    try {
      localStorage.removeItem(CUSTOM_QUESTIONS_KEY);
      localStorage.removeItem(DELETED_QUESTIONS_KEY);
      localStorage.removeItem(LAST_QUESTION_SYNC_KEY);
    } catch {
      // ignore
    }
  }

  getLastQuestionSyncTime(): string {
    try {
      return localStorage.getItem(LAST_QUESTION_SYNC_KEY) || '';
    } catch {
      return '';
    }
  }

  setLastQuestionSyncTime(timestamp: string): void {
    try {
      localStorage.setItem(LAST_QUESTION_SYNC_KEY, timestamp);
    } catch {
      // ignore
    }
  }

  /**
   * Get raw JSON string directly from localStorage for custom questions
   */
  getCustomQuestionsRawJSON(): string {
    try {
      const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
      if (!raw) return '[]';
      // Pretty format for viewer/editor
      const parsed = JSON.parse(raw);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return localStorage.getItem(CUSTOM_QUESTIONS_KEY) || '[]';
    }
  }

  /**
   * Save raw JSON directly into localStorage with schema validation
   */
  saveCustomQuestionsRawJSON(jsonStr: string): { success: boolean; count?: number; error?: string } {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!Array.isArray(parsed)) {
        return { success: false, error: 'ข้อมูล JSON ต้องเป็น Array [...] ของข้อสอบ' };
      }

      // Validate each item has minimal required fields
      const validated: Question[] = [];
      for (let i = 0; i < parsed.length; i++) {
        const item = parsed[i];
        if (!item || typeof item !== 'object') {
          return { success: false, error: `รายการที่ ${i + 1} ไม่ใช่ Object ที่ถูกต้อง` };
        }
        if (!item.question || (!item.question.th && typeof item.question !== 'string')) {
          return { success: false, error: `รายการที่ ${i + 1} ไม่มีข้อความคำถาม (question)` };
        }
        if (!Array.isArray(item.options) || item.options.length < 2) {
          return { success: false, error: `รายการที่ ${i + 1} ต้องมีตัวเลือกอย่างน้อย 2 ตัวเลือก (options)` };
        }

        const normalized: Question = {
          ...item,
          id: item.id || `custom-q-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          grade: item.grade || 'K1',
          subject: item.subject || 'literacy',
          difficulty: item.difficulty || 1,
          question: typeof item.question === 'string'
            ? { th: item.question, en: item.question, zh: item.question }
            : {
                th: item.question.th || '',
                en: item.question.en || item.question.th || '',
                zh: item.question.zh || item.question.th || '',
              },
          illustration: item.illustration || '⭐',
          illustrationSubtitle: item.illustrationSubtitle,
          options: item.options.map((opt: any, optIdx: number) => ({
            id: opt.id || `opt-${optIdx + 1}`,
            label: typeof opt.label === 'string'
              ? { th: opt.label, en: opt.label, zh: opt.label }
              : opt.label || { th: `ตัวเลือก ${optIdx + 1}`, en: `Option ${optIdx + 1}`, zh: `选项 ${optIdx + 1}` },
            icon: opt.icon || undefined,
          })),
          correctOptionId: item.correctOptionId || item.options[0]?.id || 'opt-1',
          explanation: typeof item.explanation === 'string'
            ? { th: item.explanation, en: item.explanation, zh: item.explanation }
            : item.explanation || {
                th: 'คำตอบถูกต้อง ยอดเยี่ยมมากครับ!',
                en: 'Great job! Correct answer!',
                zh: '太棒了！答对了！',
              },
          isCustom: true,
          updatedAt: new Date().toISOString(),
        };

        validated.push(normalized);
      }

      localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(validated));
      return { success: true, count: validated.length };
    } catch (e: any) {
      return { success: false, error: e.message || 'รูปแบบ JSON ไม่ถูกต้อง (Syntax Error)' };
    }
  }

  /**
   * Clears only custom questions from localStorage JSON without resetting defaults
   */
  clearCustomQuestionsOnly(): void {
    try {
      localStorage.removeItem(CUSTOM_QUESTIONS_KEY);
    } catch {
      // ignore
    }
  }

  /**
   * Get storage usage statistics for custom questions
   */
  getCustomQuestionsStorageStats(): {
    customCount: number;
    sizeBytes: number;
    sizeKb: number;
    keyName: string;
    lastSyncTime: string;
  } {
    try {
      const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY) || '[]';
      const parsed = JSON.parse(raw);
      const customCount = Array.isArray(parsed) ? parsed.length : 0;
      const sizeBytes = new Blob([raw]).size;
      const sizeKb = Math.round((sizeBytes / 1024) * 10) / 10;
      return {
        customCount,
        sizeBytes,
        sizeKb,
        keyName: CUSTOM_QUESTIONS_KEY,
        lastSyncTime: this.getLastQuestionSyncTime(),
      };
    } catch {
      return {
        customCount: 0,
        sizeBytes: 0,
        sizeKb: 0,
        keyName: CUSTOM_QUESTIONS_KEY,
        lastSyncTime: '',
      };
    }
  }

  // --- Exam Set Management (ระบบจัดชุดข้อสอบสำหรับคุณครู & ผู้เล่น) ---

  /**
   * Returns all available exam sets (custom created + built-in presets)
   */
  getExamSets(): ExamSet[] {
    try {
      const raw = localStorage.getItem(EXAM_SETS_KEY);
      let customSets: ExamSet[] = [];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          customSets = parsed;
        }
      }

      // Merge presets with custom sets (custom sets take precedence if matching ID)
      const customIds = new Set(customSets.map((s) => s.id));
      const activePresets = PRESET_EXAM_SETS.filter((p) => !customIds.has(p.id));

      return [...customSets, ...activePresets];
    } catch {
      return [...PRESET_EXAM_SETS];
    }
  }

  saveExamSets(sets: ExamSet[]): void {
    try {
      localStorage.setItem(EXAM_SETS_KEY, JSON.stringify(sets));
    } catch (e) {
      console.error('Failed to save exam sets', e);
    }
  }

  addExamSet(set: Omit<ExamSet, 'id'> & { id?: string }): ExamSet {
    const sets = this.getExamSets();
    const newSet: ExamSet = {
      ...set,
      id: set.id || `exam-set-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: set.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questionCount: set.questionIds.length,
    };
    const updated = [newSet, ...sets.filter((s) => s.id !== newSet.id)];
    this.saveExamSets(updated);
    return newSet;
  }

  updateExamSet(id: string, updates: Partial<ExamSet>): ExamSet | null {
    const sets = this.getExamSets();
    const idx = sets.findIndex((s) => s.id === id);
    if (idx !== -1) {
      const existing = sets[idx];
      const updated: ExamSet = {
        ...existing,
        ...updates,
        id,
        questionCount: updates.questionIds ? updates.questionIds.length : existing.questionCount,
        updatedAt: new Date().toISOString(),
      };
      sets[idx] = updated;
      this.saveExamSets(sets);
      return updated;
    }
    return null;
  }

  deleteExamSet(id: string): boolean {
    const sets = this.getExamSets();
    const filtered = sets.filter((s) => s.id !== id);
    this.saveExamSets(filtered);

    // If active set was deleted, clear it
    if (this.getActiveExamSetId() === id) {
      this.setActiveExamSetId(null);
    }
    return true;
  }

  getActiveExamSetId(): string | null {
    try {
      return localStorage.getItem(ACTIVE_EXAM_SET_ID_KEY) || null;
    } catch {
      return null;
    }
  }

  setActiveExamSetId(id: string | null): void {
    try {
      if (id) {
        localStorage.setItem(ACTIVE_EXAM_SET_ID_KEY, id);
      } else {
        localStorage.removeItem(ACTIVE_EXAM_SET_ID_KEY);
      }
    } catch {
      // ignore
    }
  }

  getActiveExamSet(): ExamSet | null {
    const activeId = this.getActiveExamSetId();
    if (!activeId) return null;
    const all = this.getExamSets();
    return all.find((s) => s.id === activeId) || null;
  }

  getCertificateConfig(): CertificateConfig {
    try {
      const raw = localStorage.getItem('kinder_edugame_certificate_config');
      if (raw) {
        return { ...DEFAULT_CERTIFICATE_CONFIG, ...JSON.parse(raw) };
      }
    } catch {
      // fallback
    }
    return { ...DEFAULT_CERTIFICATE_CONFIG };
  }

  saveCertificateConfig(config: Partial<CertificateConfig>): CertificateConfig {
    try {
      const current = this.getCertificateConfig();
      const updated = { ...current, ...config };
      localStorage.setItem('kinder_edugame_certificate_config', JSON.stringify(updated));
      return updated;
    } catch {
      return { ...DEFAULT_CERTIFICATE_CONFIG, ...config };
    }
  }

  getCompletedActivities(profileId?: string): CompletedCompetencyActivityRecord[] {
    try {
      const key = profileId
        ? `cbe_activities_completed_${profileId}`
        : 'cbe_activities_completed_global';
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveCompletedActivity(profileId: string, record: CompletedCompetencyActivityRecord): void {
    try {
      const key = `cbe_activities_completed_${profileId}`;
      const existing = this.getCompletedActivities(profileId);
      const filtered = existing.filter((r) => r.activityId !== record.activityId);
      filtered.unshift(record);
      localStorage.setItem(key, JSON.stringify(filtered));

      // Also track in global key
      const globalExisting = this.getCompletedActivities();
      const globalFiltered = globalExisting.filter((r) => !(r.activityId === record.activityId && (r as any).profileId === profileId));
      globalFiltered.unshift({ ...record, profileId } as any);
      localStorage.setItem('cbe_activities_completed_global', JSON.stringify(globalFiltered));
    } catch (e) {
      console.warn('Failed to save completed competency activity:', e);
    }
  }

  getCompleted8SkillActivities(profileId?: string): Completed8SkillActivityRecord[] {
    try {
      const key = profileId
        ? `k8_activities_completed_${profileId}`
        : 'k8_activities_completed_global';
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveCompleted8SkillActivity(profileId: string, record: Completed8SkillActivityRecord): void {
    try {
      const key = `k8_activities_completed_${profileId}`;
      const existing = this.getCompleted8SkillActivities(profileId);
      const filtered = existing.filter((r) => r.activityId !== record.activityId);
      filtered.unshift(record);
      localStorage.setItem(key, JSON.stringify(filtered));

      // Also track in global key
      const globalExisting = this.getCompleted8SkillActivities();
      const globalFiltered = globalExisting.filter(
        (r) => !(r.activityId === record.activityId && (r as any).profileId === profileId)
      );
      globalFiltered.unshift({ ...record, profileId } as any);
      localStorage.setItem('k8_activities_completed_global', JSON.stringify(globalFiltered));
    } catch (e) {
      console.warn('Failed to save completed 8-skill activity:', e);
    }
  }

  getCurriculumMode(): CurriculumMode {
    try {
      const mode = localStorage.getItem('kinder_edugame_curriculum_mode');
      if (mode === 'cbe_primary' || mode === 'early_childhood' || mode === 'thai_phonics') {
        return mode as CurriculumMode;
      }
    } catch {
      // ignore
    }
    return 'early_childhood';
  }

  setCurriculumMode(mode: CurriculumMode): void {
    try {
      localStorage.setItem('kinder_edugame_curriculum_mode', mode);
      const settings = this.getSettings();
      this.saveSettings({ ...settings, curriculumMode: mode });
    } catch (e) {
      console.warn('Failed to save curriculum mode:', e);
    }
  }

  hasChosenCurriculum(): boolean {
    try {
      return localStorage.getItem('kinder_edugame_has_chosen_curriculum') === 'true';
    } catch {
      return false;
    }
  }

  setChosenCurriculum(chosen: boolean = true): void {
    try {
      localStorage.setItem('kinder_edugame_has_chosen_curriculum', chosen ? 'true' : 'false');
    } catch (e) {
      console.warn('Failed to save chosen curriculum state:', e);
    }
  }

  getOutdoorMissionSubmissions(profileId?: string): OutdoorMissionSubmission[] {
    try {
      const key = profileId
        ? `k8_outdoor_missions_${profileId}`
        : 'k8_outdoor_missions_global';
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveOutdoorMissionSubmission(submission: OutdoorMissionSubmission): void {
    try {
      const profileKey = `k8_outdoor_missions_${submission.profileId}`;
      const existing = this.getOutdoorMissionSubmissions(submission.profileId);
      const filtered = existing.filter((s) => s.id !== submission.id);
      filtered.unshift(submission);
      localStorage.setItem(profileKey, JSON.stringify(filtered));

      // Also maintain global journal
      const globalExisting = this.getOutdoorMissionSubmissions();
      const globalFiltered = globalExisting.filter((s) => s.id !== submission.id);
      globalFiltered.unshift(submission);
      localStorage.setItem('k8_outdoor_missions_global', JSON.stringify(globalFiltered));

      // Award bonus points to the active profile
      const profiles = this.getProfiles();
      const target = profiles.find((p) => p.id === submission.profileId);
      if (target) {
        target.totalScore = (target.totalScore || 0) + submission.pointsEarned;
        target.updatedAt = new Date().toISOString();
        this.saveProfiles(profiles);
      }
    } catch (e) {
      console.warn('Failed to save outdoor mission submission:', e);
    }
  }
}

export interface CompletedCompetencyActivityRecord {
  activityId: string;
  competencyId: string;
  completedAt: string;
  rating: 'beginning' | 'developing' | 'proficient';
  teacherNotes?: string;
  durationMinutesSpent: number;
  profileId?: string;
}



export interface CertificateConfig {
  schoolName: string;
  teacherName: string;
  directorName: string;
  directorTitle: string;
  evaluatorTitle?: string;
  schoolLogoUrl?: string; // base64 data URL or web image URL
  schoolLogoPreset?: string; // e.g. 'emblem-torch' | 'emblem-crest' | 'emblem-kinder' | 'emblem-lotus' | 'emblem-schoolhouse'
  showSchoolLogo: boolean;
  fontFamily: 'sarabun' | 'prompt' | 'kanit';
  fontScale: 'compact' | 'standard' | 'large';
}

export const DEFAULT_CERTIFICATE_CONFIG: CertificateConfig = {
  schoolName: 'โรงเรียนอนุบาลพัฒนาการปฐมวัย',
  teacherName: 'คุณครูประจำชั้น',
  directorName: 'ดร.สมชาย การศึกษา',
  directorTitle: 'ผู้อำนวยการสถานศึกษา',
  schoolLogoUrl: '',
  schoolLogoPreset: 'emblem-torch',
  showSchoolLogo: true,
  fontFamily: 'sarabun',
  fontScale: 'standard',
};

export const storageService = new StorageService();
