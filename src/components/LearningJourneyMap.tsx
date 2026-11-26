import React, { useState, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Compass,
  Trophy,
  Sparkles,
  Lock,
  CheckCircle2,
  ChevronRight,
  Flame,
  Star,
  Award,
  HelpCircle,
  Eye,
  Zap,
  BookOpen,
  Calculator,
  Lightbulb,
  Search,
  Palette,
  Heart,
  Users,
  Shield,
  Gift,
  Target,
  Crown,
  Play,
  Share2,
} from 'lucide-react';
import { ChildProfile, Language, Subject } from '../types';
import { INITIAL_BADGES } from '../services/storageService';
import { soundEffects } from '../services/audioService';

export interface LearningJourneyMapProps {
  profile: ChildProfile;
  language?: Language;
  soundVolume?: number;
  onSelectMilestone?: (milestoneId: string) => void;
  onPlaySubject?: (subject: Subject) => void;
  onOpenCertificate?: (milestoneId?: string) => void;
}

export type RealmId =
  | 'all'
  | 'literacy'
  | 'math'
  | 'problem_solving'
  | 'inquiry'
  | 'creativity'
  | 'physical_health'
  | 'socio_emotional'
  | 'citizenship'
  | 'streaks';

export type WaypointStatus = 'unlocked' | 'current_quest' | 'mystery_hidden' | 'locked';

export interface JourneyMilestone {
  id: string;
  realmId: RealmId;
  stepNumber: number;
  badgeId?: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  mysteryIcon: string;
  isSecret: boolean;
  subject?: Subject;
  requiredTarget: number;
  unit: string;
  secretClue: Record<Language, string>;
  rewardTitle: string;
  loreText: string;
}

// 9 Thematic Journey Realms with rich story-based milestones and secret rewards
export const JOURNEY_REALMS: {
  id: RealmId;
  name: Record<Language, string>;
  icon: string;
  colorName: string;
  gradientBg: string;
  accentBorder: string;
  headerBg: string;
  description: Record<Language, string>;
  milestones: JourneyMilestone[];
}[] = [
  {
    id: 'literacy',
    name: {
      th: 'เกาะนิทานและมนตราภาษา',
      en: 'Literacy & Story Isle',
      zh: '语言与故事之岛',
    },
    icon: '📖',
    colorName: 'rose',
    gradientBg: 'from-rose-500/10 via-pink-500/5 to-rose-500/10',
    accentBorder: 'border-rose-300',
    headerBg: 'from-rose-500 to-pink-600',
    description: {
      th: 'ก้าวข้ามสะพานตัวอักษร สะสมคำศัพท์ และปลดผนึกคทาวิเศษแห่งถ้อยคำ',
      en: 'Journey across the alphabet bridge and reveal the Enchanted Word Scepter',
      zh: '漫步字母桥梁，积累词汇，解开言语之杖的神秘封印',
    },
    milestones: [
      {
        id: 'lit_step_1',
        realmId: 'literacy',
        stepNumber: 1,
        title: { th: 'ก้าวแรกแห่งตัวอักษร', en: 'First Letter Step', zh: '识字第一步' },
        description: { th: 'ตอบถูกในหมวดภาษาและการรู้หนังสือสะสม 3 ข้อแรก', en: 'Answer 3 literacy questions correctly', zh: '答对首批3道语言识字题' },
        icon: '🌱',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'literacy',
        requiredTarget: 3,
        unit: 'ข้อ',
        secretClue: { th: 'เริ่มต้นเปิดประตูแห่งภาษาด้วยการสะสมคำตอบที่ถูกต้อง', en: 'Start by answering your first few literacy questions', zh: '以回答几道语言题开启旅程' },
        rewardTitle: 'เข็มกลัดต้นกล้าภาษา (Sprout Pin)',
        loreText: 'ต้นกล้าแห่งการอ่านเริ่มผลิใบอ่อนในใจของหนูน้อย',
      },
      {
        id: 'thai_star',
        realmId: 'literacy',
        stepNumber: 2,
        badgeId: 'thai_star',
        title: { th: 'เซียนภาษาและรู้หนังสือ', en: 'Literacy Master', zh: '语言读写小达人' },
        description: { th: 'ตอบคำถามทักษะภาษาและการรู้หนังสือสะสม 10 ข้อ', en: 'Answer 10 literacy questions correctly', zh: '累计答对10道语言与读写题' },
        icon: '📖',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'literacy',
        requiredTarget: 10,
        unit: 'ข้อ',
        secretClue: { th: 'ฝึกฝนหมวดภาษาต่อเนื่องจนครบ 10 ข้อเพื่อเปิดผนึกเหรียญตราเซียนภาษา', en: 'Reach 10 correct literacy answers', zh: '答对10道语言题' },
        rewardTitle: 'เหรียญตราเซียนภาษาและรู้หนังสือ',
        loreText: 'ความรู้หนังสือเปรียบเสมือนกุญแจทองที่เปิดประตูสู่โลกกว้าง',
      },
      {
        id: 'thai_master',
        realmId: 'literacy',
        stepNumber: 3,
        badgeId: 'thai_master',
        title: { th: 'เก่งภาษาไทยปฐมวัย', en: 'Thai Language Master', zh: '泰语启蒙小状元' },
        description: { th: 'ตอบคำถามภาษาไทย พยัญชนะ สระ และคำศัพท์ถูกต้องสะสม 10 ข้อ', en: 'Answer 10 Thai language questions correctly', zh: '累计答对10道泰语题' },
        icon: '🇹🇭',
        mysteryIcon: '🗝️',
        isSecret: true,
        subject: 'literacy',
        requiredTarget: 10,
        unit: 'ข้อ',
        secretClue: { th: '🔒 รางวัลลับ: ฝึกสะกดคำ พยัญชนะไทย สระให้แม่นยำ เพื่อปลดผนึกคทาภาษาไทยโบราณ!', en: 'Mystery Reward: Master Thai vowels and consonants to unlock!', zh: '神秘奖励：掌握拼读与词汇即可解锁！' },
        rewardTitle: 'คทาวิเศษภาษาไทยโบราณ (Thai Master Scepter)',
        loreText: 'ความงดงามของภาษาไทยส่องประกายเรืองรองไปทั่วผืนแผ่นดิน',
      },
      {
        id: 'english_star',
        realmId: 'literacy',
        stepNumber: 4,
        badgeId: 'english_star',
        title: { th: 'English Superstar', en: 'English Superstar', zh: '英语启蒙小明星' },
        description: { th: 'ตอบคำถามภาษาอังกฤษ Phonics, Alphabet และคำศัพท์สะสม 10 ข้อ', en: 'Answer 10 English questions correctly', zh: '累计答对10道英语自然拼读与单词题' },
        icon: '🔤',
        mysteryIcon: '✨',
        isSecret: true,
        subject: 'english',
        requiredTarget: 10,
        unit: 'ข้อ',
        secretClue: { th: '🔒 รางวัลลับสูงสุด: เดินทางสู่หอคอยนานาชาติ พิชิตภาษาอังกฤษ Phonics ครบ 10 ข้อ!', en: 'Ultimate Mystery: Conquer 10 English Phonics questions to reveal!', zh: '终极秘宝：完成10道英文题目揭开真相！' },
        rewardTitle: 'ดวงดาวสากล English Superstar (Global Star)',
        loreText: 'พร้อมสื่อสารกับเพื่อนๆ จากทั่วทุกมุมโลกอย่างมั่นใจ',
      },
    ],
  },
  {
    id: 'math',
    name: {
      th: 'อาณาจักรตัวเลขและมิติสัมพันธ์',
      en: 'Number Realm & Geometry',
      zh: '数理概念与计算王国',
    },
    icon: '🧮',
    colorName: 'amber',
    gradientBg: 'from-amber-500/10 via-yellow-500/5 to-amber-500/10',
    accentBorder: 'border-amber-300',
    headerBg: 'from-amber-500 to-orange-500',
    description: {
      th: 'ข้ามหุบเขาจำนวน จำแนกมิติรูปทรง และค้นพบมงกุฎอัจฉริยะคิดไว',
      en: 'Traverse counting valleys, classify shapes, and reveal the Math Tiara',
      zh: '翻越数字山谷，分辨形状，探寻速算小天才皇冠',
    },
    milestones: [
      {
        id: 'math_step_1',
        realmId: 'math',
        stepNumber: 1,
        title: { th: 'ก้าวแรกแห่งตัวเลข', en: 'Counting Trail', zh: '数字初识小径' },
        description: { th: 'ตอบคำถามการคิดรวบยอดและคณิตศาสตร์สะสม 3 ข้อแรก', en: 'Answer 3 math questions correctly', zh: '答对前3道数学思维题' },
        icon: '🔢',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'math',
        requiredTarget: 3,
        unit: 'ข้อ',
        secretClue: { th: 'นับจำนวนสิ่งของรอบตัวและตอบคำถามคณิตศาสตร์เบื้องต้น', en: 'Count items and complete basic math', zh: '数清物品完成基础题目' },
        rewardTitle: 'เหรียญตรานักนับตัวน้อย (Little Counter Badge)',
        loreText: 'ตัวเลขเริ่มกลายเป็นเพื่อนเล่นที่แสนสนุกของหนูน้อย',
      },
      {
        id: 'math_ace',
        realmId: 'math',
        stepNumber: 2,
        badgeId: 'math_ace',
        title: { th: 'นักคิดรวบยอดและคำนวณ', en: 'Math Ace', zh: '数学思维小天才' },
        description: { th: 'ตอบคำถามการคิดรวบยอดและคำนวณสะสม 10 ข้อ', en: 'Answer 10 math questions correctly', zh: '累计答对10道概念与数学题' },
        icon: '🧮',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'math',
        requiredTarget: 10,
        unit: 'ข้อ',
        secretClue: { th: 'สะสมความถูกต้องในหมวดคณิตศาสตร์ให้ครบ 10 ข้อ', en: 'Reach 10 correct math answers', zh: '答对10道数学概念题' },
        rewardTitle: 'เหรียญตรานักคิดรวบยอดและคำนวณ (Math Ace)',
        loreText: 'ความเข้าใจจำนวนและรูปทรงเปรียบดั่งเข็มทิศแม่นยำ',
      },
      {
        id: 'math_genius',
        realmId: 'math',
        stepNumber: 3,
        badgeId: 'math_genius',
        title: { th: 'ยอดอัจฉริยะคณิตคิดไว', en: 'Smart Math Genius', zh: '速算心算小天才' },
        description: { th: 'ตอบคำถามคณิตศาสตร์ การนับเลข รูปทรง และการคำนวณสะสม 15 ข้อ', en: 'Answer 15 math questions correctly', zh: '累计答对15道数学计数与几何运算题' },
        icon: '👑',
        mysteryIcon: '🗝️',
        isSecret: true,
        subject: 'math',
        requiredTarget: 15,
        unit: 'ข้อ',
        secretClue: { th: '🔒 รางวัลลับชั้นสูง: พิชิตความท้าทายคณิตศาสตร์สะสม 15 ข้อ เพื่อเปิดหีบมงกุฎทองคำ!', en: 'Mystery Reward: Solve 15 math problems to unlock the Golden Crown!', zh: '神秘奖励：答对15道数学题目揭开金冠！' },
        rewardTitle: 'มงกุฎอัจฉริยะคณิตคิดไว (Math Genius Tiara)',
        loreText: 'มงกุฎทองคำเปล่งประกาย ปรบมือให้กับสุดยอดนักคำนวณตัวจริง',
      },
    ],
  },
  {
    id: 'problem_solving',
    name: {
      th: 'ป่าปริศนานักแก้ปัญหา',
      en: 'Problem Solving & Logic Forest',
      zh: '智慧推理与问题解决森林',
    },
    icon: '💡',
    colorName: 'yellow',
    gradientBg: 'from-yellow-500/10 via-amber-500/5 to-yellow-500/10',
    accentBorder: 'border-yellow-300',
    headerBg: 'from-yellow-500 to-amber-600',
    description: {
      th: 'ฝ่าด่านเขาวงกต ลองผิดลองถูก คิดอย่างเป็นเหตุเป็นผล สู่ตะเกียงแห่งปัญญา',
      en: 'Solve puzzles, test ideas, and discover the Lantern of Insight',
      zh: '穿越迷宫，尝试探索，推理决策，点亮智慧之灯',
    },
    milestones: [
      {
        id: 'prob_step_1',
        realmId: 'problem_solving',
        stepNumber: 1,
        title: { th: 'นักสังเกตเบาะแส', en: 'Clue Finder', zh: '线索小侦探' },
        description: { th: 'ตอบคำถามการคิดแก้ปัญหาและตัดสินใจสะสม 3 ข้อแรก', en: 'Answer 3 problem-solving questions', zh: '答对3道解决问题题' },
        icon: '🔍',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'problem_solving',
        requiredTarget: 3,
        unit: 'ข้อ',
        secretClue: { th: 'มองหารูปแบบและแก้โจทย์ปัญหาแรกเพื่อเปิดทาง', en: 'Look for patterns and solve your first puzzles', zh: '寻找模式解答前几道题目' },
        rewardTitle: 'แว่นขยายสืบเบาะแส (Detective Lens)',
        loreText: 'ความช่างสังเกตทำให้มองเห็นทางออกที่ซ่อนอยู่เสมอ',
      },
      {
        id: 'prob_solver',
        realmId: 'problem_solving',
        stepNumber: 2,
        badgeId: 'prob_solver',
        title: { th: 'ยอดนักแก้ปัญหาและตัดสินใจ', en: 'Problem Solver', zh: '小小问题解决家' },
        description: { th: 'ตอบคำถามทักษะการคิดแก้ปัญหาและตัดสินใจสะสม 10 ข้อ', en: 'Answer 10 problem solving questions correctly', zh: '累计答对10道解决问题题' },
        icon: '💡',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'problem_solving',
        requiredTarget: 10,
        unit: 'ข้อ',
        secretClue: { th: 'พิชิตข้อสอบการคิดแก้ปัญหาครบ 10 ข้อเพื่อเปิดผนึกเหรียญตรา', en: 'Solve 10 problem questions', zh: '完成10道解决问题题' },
        rewardTitle: 'เหรียญตรายอดนักแก้ปัญหาและตัดสินใจ',
        loreText: 'ไม่กลัวอุปสรรค เพราะทุกปัญหามีทางออกอันชาญฉลาดเสมอ',
      },
      {
        id: 'combo_10',
        realmId: 'problem_solving',
        stepNumber: 3,
        badgeId: 'combo_10',
        title: { th: 'ตอบถูก 10 ข้อติดกัน (Combo Master)', en: '10 Combo Streak', zh: '连续答对10题' },
        description: { th: 'ตอบถูกต่อเนื่อง 10 ข้อโดยไม่ผิดเลยในรอบเดียว', en: 'Get 10 correct answers in a row', zh: '连续回答正确10道题' },
        icon: '⚡',
        mysteryIcon: '🗝️',
        isSecret: true,
        requiredTarget: 10,
        unit: 'ข้อติดกัน',
        secretClue: { th: '🔒 รางวัลลับมหัศจรรย์: ใช้สมาธิขั้นสูงสุด ตอบคำถามถูกรวดเดียว 10 ข้อติดกัน!', en: 'Mystery Reward: Answer 10 questions in a row without any mistake!', zh: '神秘奖励：全神贯注连续答对10题！' },
        rewardTitle: 'สายฟ้าคอมโบพลังจิต (Lightning Combo Amulet)',
        loreText: 'พลังสมาธิอันเฉียบคมดุจสายฟ้าฟาดสว่างจ้าทั่วฟากฟ้า',
      },
    ],
  },
  {
    id: 'inquiry',
    name: {
      th: 'ยอดเขานักแสวงหาความรู้',
      en: 'Inquiry Peak & Science',
      zh: '科学探索与求知之峰',
    },
    icon: '🔬',
    colorName: 'emerald',
    gradientBg: 'from-emerald-500/10 via-teal-500/5 to-emerald-500/10',
    accentBorder: 'border-emerald-300',
    headerBg: 'from-emerald-500 to-teal-600',
    description: {
      th: 'สำรวจธรรมชาติ สัตว์ พืช ปรากฏการณ์รอบตัว สู่ลูกแก้วจักรวาลวิทยาศาสตร์',
      en: 'Explore nature, animals, and reveal the Cosmic Science Globe',
      zh: '探索大自然与万千生命，揭开宇宙科学明珠的神秘面纱',
    },
    milestones: [
      {
        id: 'sci_step_1',
        realmId: 'inquiry',
        stepNumber: 1,
        title: { th: 'นักสำรวจธรรมชาติจิ๋ว', en: 'Nature Scout', zh: '自然探索小向导' },
        description: { th: 'ตอบคำถามหมวดการแสวงหาความรู้สะสม 3 ข้อแรก', en: 'Answer 3 inquiry questions correctly', zh: '答对3道探索题' },
        icon: '🌿',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'inquiry',
        requiredTarget: 3,
        unit: 'ข้อ',
        secretClue: { th: 'สังเกตสัตว์ พืช และสิ่งรอบตัวในหมวดการแสวงหาความรู้', en: 'Observe plants, animals and natural world', zh: '观察动植物解答初级探索题' },
        rewardTitle: 'เข็มทิศพฤกษศาสตร์ (Botanical Compass)',
        loreText: 'ทุกใบไม้และหยาดน้ำค้างล้วนซ่อนความลับที่น่าอัศจรรย์',
      },
      {
        id: 'sci_scout',
        realmId: 'inquiry',
        stepNumber: 2,
        badgeId: 'sci_scout',
        title: { th: 'นักแสวงหาความรู้ตัวจริง', en: 'Inquiry Explorer', zh: '求知探索小小家' },
        description: { th: 'ตอบคำถามการแสวงหาความรู้สะสม 10 ข้อ', en: 'Answer 10 inquiry questions correctly', zh: '累计答对10道探索求知题' },
        icon: '🔬',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'inquiry',
        requiredTarget: 10,
        unit: 'ข้อ',
        secretClue: { th: 'ตอบถูกสะสมในหมวดวิทยาศาสตร์และการแสวงหาความรู้ครบ 10 ข้อ', en: 'Reach 10 correct inquiry answers', zh: '答对10道探索求知题' },
        rewardTitle: 'เหรียญตรานักแสวงหาความรู้ตัวจริง',
        loreText: 'ความอยากรู้อยากเห็นคือเชื้อเพลิงของปัญญาที่ไม่เคยดับ',
      },
      {
        id: 'sci_secret_globe',
        realmId: 'inquiry',
        stepNumber: 3,
        title: { th: 'ลูกแก้วแห่งดวงดาวและจักรวาล', en: 'Cosmic Science Globe', zh: '星空宇宙科学明珠' },
        description: { th: 'ตอบถูกสะสมในหมวดการแสวงหาความรู้ 15 ข้อ', en: 'Answer 15 inquiry questions correctly', zh: '累计答对15道科学探索题' },
        icon: '🌌',
        mysteryIcon: '🗝️',
        isSecret: true,
        subject: 'inquiry',
        requiredTarget: 15,
        unit: 'ข้อ',
        secretClue: { th: '🔒 รางวัลลับ: ปีนสู่ยอดเขาแห่งวิทยาศาสตร์ ตอบคำถามธรรมชาติครบ 15 ข้อ!', en: 'Mystery Reward: Reach 15 science inquiry answers to unveil the Cosmic Globe!', zh: '神秘奖励：累计完成15道科学题目开启明珠！' },
        rewardTitle: 'ลูกแก้วจักรวาลส่องแสง (Cosmic Science Orb)',
        loreText: 'ดวงดาวระยิบระยับนำทางให้หนูน้อยก้าวสู่การเป็นนักวิทยาศาสตร์ใหญ่',
      },
    ],
  },
  {
    id: 'creativity',
    name: {
      th: 'เกาะสายรุ้งจินตนาการ',
      en: 'Creative Rainbow Isle',
      zh: '彩虹想象与创造力之岛',
    },
    icon: '🎨',
    colorName: 'purple',
    gradientBg: 'from-purple-500/10 via-pink-500/5 to-purple-500/10',
    accentBorder: 'border-purple-300',
    headerBg: 'from-purple-500 to-indigo-600',
    description: {
      th: 'ระบายสีสันแห่งความคิด ถ่ายทอดจินตนาการไร้ขีดจำกัด ปลดล็อกพู่กันทองคำ',
      en: 'Paint with imagination and reveal the Golden Palette of Wonder',
      zh: '挥洒天马行空的想象力，点亮奇迹金画笔',
    },
    milestones: [
      {
        id: 'cre_step_1',
        realmId: 'creativity',
        stepNumber: 1,
        title: { th: 'แต้มสีสันจุดประกาย', en: 'Color Spark', zh: '色彩初萌点缀' },
        description: { th: 'ตอบคำถามจินตนาการและความคิดสร้างสรรค์สะสม 3 ข้อแรก', en: 'Answer 3 creativity questions', zh: '答对3道创造力题' },
        icon: '🖍️',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'creativity',
        requiredTarget: 3,
        unit: 'ข้อ',
        secretClue: { th: 'ร่วมสร้างสรรค์และตอบคำถามศิลปะจินตนาการ', en: 'Spark imagination with basic questions', zh: '回答几道创造性题目' },
        rewardTitle: 'ดินสอสีสายรุ้ง (Rainbow Crayon)',
        loreText: 'จินตนาการคือพลังวิเศษที่สามารถเนรมิตสิ่งใดก็ได้ในโลก',
      },
      {
        id: 'creativity_star',
        realmId: 'creativity',
        stepNumber: 2,
        badgeId: 'creativity_star',
        title: { th: 'จินตนาการสร้างสรรค์ยอดเยี่ยม', en: 'Creative Star', zh: '创意无限小明星' },
        description: { th: 'ตอบคำถามจินตนาการและความคิดสร้างสรรค์สะสม 10 ข้อ', en: 'Answer 10 creativity questions correctly', zh: '累计答对10道想象与创造力题' },
        icon: '🎨',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'creativity',
        requiredTarget: 10,
        unit: 'ข้อ',
        secretClue: { th: 'สะสมคำตอบหมวดความคิดสร้างสรรค์ครบ 10 ข้อเพื่อเปิดผนึกเหรียญตรา', en: 'Reach 10 creative questions', zh: '累计答对10道想象力题' },
        rewardTitle: 'เหรียญตราจินตนาการสร้างสรรค์ยอดเยี่ยม',
        loreText: 'ศิลปะและความคิดนอกกรอบนำพาสิ่งใหม่ๆ มาสู่ชีวิต',
      },
      {
        id: 'cre_magic_brush',
        realmId: 'creativity',
        stepNumber: 3,
        title: { th: 'พู่กันทองคำมหัศจรรย์', en: 'Golden Magic Palette', zh: '奇迹金色调色盘' },
        description: { th: 'ตอบถูกสะสมในหมวดความคิดสร้างสรรค์ 15 ข้อ', en: 'Answer 15 creativity questions correctly', zh: '累计答对15道创造力题' },
        icon: '🖌️',
        mysteryIcon: '🗝️',
        isSecret: true,
        subject: 'creativity',
        requiredTarget: 15,
        unit: 'ข้อ',
        secretClue: { th: '🔒 รางวัลลับ: แต่งแต้มจินตนาการให้ครบ 15 ข้อ เพื่อปลดผนึกพู่กันทองคำนำโชค!', en: 'Mystery Reward: Master 15 creative questions to reveal the Golden Palette!', zh: '神秘奖励：完成15道创意题目解锁金画笔！' },
        rewardTitle: 'พู่กันทองคำมหัศจรรย์ (Golden Magic Brush)',
        loreText: 'ตวัดพู่กันเพียงครั้งเดียว ความฝันก็กลายเป็นความจริงอันงดงาม',
      },
    ],
  },
  {
    id: 'physical_health',
    name: {
      th: 'โอเอซิสสุขภาพและกายภาพ',
      en: 'Physical Health Oasis',
      zh: '健康体魄与活力绿洲',
    },
    icon: '🏃',
    colorName: 'teal',
    gradientBg: 'from-teal-500/10 via-emerald-500/5 to-teal-500/10',
    accentBorder: 'border-teal-300',
    headerBg: 'from-teal-500 to-emerald-600',
    description: {
      th: 'ฝึกกล้ามเนื้อมัดเล็ก-ใหญ่ สุขอนามัย และเปิดผนึกเหรียญทองนักกรีฑาจิ๋ว',
      en: 'Master motor skills, safety, and reveal the Little Olympian Medal',
      zh: '锻炼大小肌肉，培养卫生习惯，收获小小运动家金牌',
    },
    milestones: [
      {
        id: 'phy_step_1',
        realmId: 'physical_health',
        stepNumber: 1,
        title: { th: 'วอร์มอัพยืดเส้น', en: 'Daily Stretcher', zh: '活力热身操' },
        description: { th: 'ตอบคำถามด้านสุขภาวะทางกายสะสม 3 ข้อแรก', en: 'Answer 3 physical health questions', zh: '答对3道健康卫生题' },
        icon: '👟',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'physical_health',
        requiredTarget: 3,
        unit: 'ข้อ',
        secretClue: { th: 'เรียนรู้เรื่องสุขอนามัยและสุขภาพร่างกาย', en: 'Learn about wellness and hygiene', zh: '了解健康卫生的知识' },
        rewardTitle: 'ริบบิ้นนักวิ่งตัวน้อย (Runner Ribbon)',
        loreText: 'ร่างกายที่แข็งแรงคือจุดเริ่มต้นของทุกการผจญภัย',
      },
      {
        id: 'physical_champ',
        realmId: 'physical_health',
        stepNumber: 2,
        badgeId: 'physical_champ',
        title: { th: 'หนูน้อยสุขภาพดีแข็งแรง', en: 'Physical Health Star', zh: '健康强健小明星' },
        description: { th: 'ตอบคำถามด้านสุขภาวะทางกายและสุขอนามัยสะสม 10 ข้อ', en: 'Answer 10 physical health questions correctly', zh: '累计答对10道身体健康与卫生题' },
        icon: '🏃',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'physical_health',
        requiredTarget: 10,
        unit: 'ข้อ',
        secretClue: { th: 'สะสมคำตอบหมวดสุขภาวะทางกายครบ 10 ข้อเพื่อรับเหรียญ', en: 'Reach 10 health answers', zh: '答对10道健康题' },
        rewardTitle: 'เหรียญตราหนูน้อยสุขภาพดีแข็งแรง',
        loreText: 'ล้างมือ ทานอาหารมีประโยชน์ และออกกำลังกายสม่ำเสมอ',
      },
      {
        id: 'magic_finger',
        realmId: 'physical_health',
        stepNumber: 3,
        badgeId: 'magic_finger',
        title: { th: 'เซียนนิ้ววิเศษ (Magic Finger)', en: 'Magic Finger', zh: '神指魔法师' },
        description: { th: 'ใช้กล้องจับมือ Hand Tracking ตอบถูกสะสม 5 ข้อ', en: 'Score 5 correct answers with hand tracking', zh: '用手势追踪答对5道题' },
        icon: '🖐️',
        mysteryIcon: '🗝️',
        isSecret: true,
        requiredTarget: 5,
        unit: 'ข้อกล้องจับมือ',
        secretClue: { th: '🔒 รางวัลลับกายภาพ: ควบคุมด้วยกล้องจับมือ Hand Tracking ตอบถูก 5 ข้อ!', en: 'Mystery Reward: Use Hand Tracking camera to answer 5 questions!', zh: '神秘奖励：开启AI手势追踪答对5道题！' },
        rewardTitle: 'ถุงมือทองคำมหัศจรรย์ (Magic Hand Gauntlet)',
        loreText: 'นิ้ววิเศษชี้นำทางด้วยเทคโนโลยี AI ผสานกายภาพสุดล้ำ',
      },
    ],
  },
  {
    id: 'socio_emotional',
    name: {
      th: 'หมู่บ้านมิตรภาพและอารมณ์ดี',
      en: 'Socio-Emotional Village',
      zh: '情商友爱与心灵村落',
    },
    icon: '🤝',
    colorName: 'sky',
    gradientBg: 'from-sky-500/10 via-blue-500/5 to-sky-500/10',
    accentBorder: 'border-sky-300',
    headerBg: 'from-sky-500 to-blue-600',
    description: {
      th: 'เข้าใจอารมณ์ เห็นอกเห็นใจผู้อื่น และค้นพบคริสตัลแห่งมิตรภาพแท้',
      en: 'Understand emotions, practice empathy, and reveal the Crystal of Empathy',
      zh: '体察情绪，关怀他人，发现同理心之晶莹水晶',
    },
    milestones: [
      {
        id: 'soc_step_1',
        realmId: 'socio_emotional',
        stepNumber: 1,
        title: { th: 'รอยยิ้มพิมพ์ใจ', en: 'Kind Smile', zh: '暖心微笑' },
        description: { th: 'ตอบคำถามด้านอารมณ์ จิตใจ และสังคมสะสม 3 ข้อแรก', en: 'Answer 3 socio-emotional questions', zh: '答对3道情绪社交题' },
        icon: '😊',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'socio_emotional',
        requiredTarget: 3,
        unit: 'ข้อ',
        secretClue: { th: 'ตอบคำถามเกี่ยวกับการระบุอารมณ์และความรู้สึก', en: 'Recognize emotions and feelings', zh: '识别情绪与感受' },
        rewardTitle: 'หัวใจแห่งความอบอุ่น (Warm Heart Badge)',
        loreText: 'รอยยิ้มเพียงหนึ่งเดียวสามารถทำให้วันของทุกคนสดใส',
      },
      {
        id: 'socio_emotional_star',
        realmId: 'socio_emotional',
        stepNumber: 2,
        badgeId: 'socio_emotional_star',
        title: { th: 'เพื่อนที่น่ารักอารมณ์ดี', en: 'Socio-Emotional Star', zh: '情商与社交小模范' },
        description: { th: 'ตอบคำถามด้านอารมณ์ จิตใจ และสังคมสะสม 10 ข้อ', en: 'Answer 10 socio-emotional questions correctly', zh: '累计答对10道情绪与社交题' },
        icon: '🤝',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'socio_emotional',
        requiredTarget: 10,
        unit: 'ข้อ',
        secretClue: { th: 'สะสมคำตอบหมวดอารมณ์และสังคมครบ 10 ข้อเพื่อเปิดผนึกเหรียญตรา', en: 'Reach 10 socio-emotional answers', zh: '累计答对10道社交情绪题' },
        rewardTitle: 'เหรียญตราเพื่อนที่น่ารักอารมณ์ดี',
        loreText: 'เป็นทั้งผู้ฟังที่ดีและเพื่อนที่คอยให้กำลังใจเสมอ',
      },
      {
        id: 'soc_secret_crystal',
        realmId: 'socio_emotional',
        stepNumber: 3,
        title: { th: 'คริสตัลแห่งมิตรภาพแท้', en: 'Crystal of Empathy', zh: '真挚友谊与共情水晶' },
        description: { th: 'ตอบคำถามหมวดอารมณ์และสังคมสะสม 15 ข้อ', en: 'Answer 15 socio-emotional questions correctly', zh: '累计答对15道社交情绪题' },
        icon: '💎',
        mysteryIcon: '🗝️',
        isSecret: true,
        subject: 'socio_emotional',
        requiredTarget: 15,
        unit: 'ข้อ',
        secretClue: { th: '🔒 รางวัลลับ: แบ่งปันน้ำใจ ตอบคำถามหมวดอารมณ์และสังคมครบ 15 ข้อ!', en: 'Mystery Reward: Share empathy and solve 15 emotional intelligence questions!', zh: '神秘奖励：答对15道情商题目解封水晶！' },
        rewardTitle: 'คริสตัลมิตรภาพบริสุทธิ์ (Crystal of Pure Friendship)',
        loreText: 'คริสตัลส่องแสงประกายสีฟ้าอบอุ่น หลอมรวมหัวใจของมิตรสหาย',
      },
    ],
  },
  {
    id: 'citizenship',
    name: {
      th: 'ปราสาทพลเมืองดีและคุณธรรม',
      en: 'Civic Castle & Values',
      zh: '文明公德与品格之堡',
    },
    icon: '🏛️',
    colorName: 'cyan',
    gradientBg: 'from-cyan-500/10 via-sky-500/5 to-cyan-500/10',
    accentBorder: 'border-cyan-300',
    headerBg: 'from-cyan-600 to-blue-700',
    description: {
      th: 'เคารพกติกา อนุรักษ์ความเป็นไทย มีน้ำใจจิตอาสา ปลดล็อกโล่ทองคำ',
      en: 'Practice respect, rules, community values, and reveal the Golden Shield',
      zh: '遵守公约，传承文化，互助有爱，开启黄金公德徽盾',
    },
    milestones: [
      {
        id: 'cit_step_1',
        realmId: 'citizenship',
        stepNumber: 1,
        title: { th: 'ไหว้สวยยิ้มหวาน', en: 'Polite Manners', zh: '知书达礼小礼仪' },
        description: { th: 'ตอบคำถามหมวดความเป็นพลเมืองสะสม 3 ข้อแรก', en: 'Answer 3 citizenship questions', zh: '答对3道公德礼仪题' },
        icon: '🙏',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'citizenship',
        requiredTarget: 3,
        unit: 'ข้อ',
        secretClue: { th: 'เรียนรู้เรื่องมารยาท ความมีน้ำใจ และความเป็นไทย', en: 'Learn about manners and Thai cultural respect', zh: '学习礼仪与互助' },
        rewardTitle: 'เข็มกลัดมารยาทงาม (Courtesy Pin)',
        loreText: 'ความสุภาพอ่อนโยนคือเสน่ห์ที่ทำให้ใครๆ ก็รักและเอ็นดู',
      },
      {
        id: 'citizenship_hero',
        realmId: 'citizenship',
        stepNumber: 2,
        badgeId: 'citizenship_hero',
        title: { th: 'พลเมืองดีมีน้ำใจ', en: 'Good Citizen Hero', zh: '文明小公民先锋' },
        description: { th: 'ตอบคำถามด้านความเป็นพลเมืองและความเป็นไทยสะสม 10 ข้อ', en: 'Answer 10 citizenship & Thai culture questions correctly', zh: '累计答对10道公民素养与文化题' },
        icon: '🇹🇭',
        mysteryIcon: '❓',
        isSecret: false,
        subject: 'citizenship',
        requiredTarget: 10,
        unit: 'ข้อ',
        secretClue: { th: 'สะสมคำตอบหมวดความเป็นพลเมืองครบ 10 ข้อเพื่อรับเหรียญ', en: 'Reach 10 citizenship answers', zh: '答对10道公德题' },
        rewardTitle: 'เหรียญตราพลเมืองดีมีน้ำใจ (Good Citizen Hero)',
        loreText: 'รู้จักหน้าที่ เคารพกติกา และรักษาความสะอาดของส่วนรวม',
      },
      {
        id: 'cit_secret_shield',
        realmId: 'citizenship',
        stepNumber: 3,
        title: { th: 'โล่เกียรติยศพลเมืองทอง', en: 'Golden Civic Shield', zh: '金质荣耀公民之盾' },
        description: { th: 'ตอบคำถามหมวดความเป็นพลเมืองสะสม 15 ข้อ', en: 'Answer 15 citizenship questions correctly', zh: '累计答对15道公德文化题' },
        icon: '🛡️',
        mysteryIcon: '🗝️',
        isSecret: true,
        subject: 'citizenship',
        requiredTarget: 15,
        unit: 'ข้อ',
        secretClue: { th: '🔒 รางวัลลับ: เป็นพลเมืองต้นแบบ ตอบคำถามความเป็นพลเมืองครบ 15 ข้อ!', en: 'Mystery Reward: Answer 15 questions in citizenship to unveil the Golden Shield!', zh: '神秘奖励：答对15道公德题解密金盾！' },
        rewardTitle: 'โล่เกียรติยศพลเมืองทอง (Golden Shield of Harmony)',
        loreText: 'โล่ทองคำปกป้องรอยยิ้ม ความสุข และความสงบเรียบร้อยของสังคม',
      },
    ],
  },
  {
    id: 'streaks',
    name: {
      th: 'ทางช้างเผือกแห่งความเพียรและสตรีค',
      en: 'Consistency & Streak Galaxy',
      zh: '坚持毅力与连胜银河',
    },
    icon: '⚡',
    colorName: 'indigo',
    gradientBg: 'from-indigo-500/10 via-purple-500/5 to-indigo-500/10',
    accentBorder: 'border-indigo-300',
    headerBg: 'from-indigo-600 to-purple-800',
    description: {
      th: 'ร้อยเรียงดวงดาวแห่งวินัย เล่นต่อเนื่องสะสมวัน สู่ถ้วยแชมเปี้ยน 30 วันเต็ม',
      en: 'Connect constellation stars through daily practice to unlock the 30-Day Master Champion Trophy',
      zh: '串联自律星座，坚持每日挑战，揭开30天总冠军殿堂奖杯',
    },
    milestones: [
      {
        id: 'streak_5',
        realmId: 'streaks',
        stepNumber: 1,
        badgeId: 'streak_5',
        title: { th: 'หนูน้อยสม่ำเสมอ 5 วัน', en: '5-Day Streak', zh: '坚持5天小达人' },
        description: { th: 'เข้าเล่นต่อเนื่องครบ 5 วัน', en: 'Play 5 consecutive days', zh: '连续5天坚持学习' },
        icon: '🔥',
        mysteryIcon: '❓',
        isSecret: false,
        requiredTarget: 5,
        unit: 'วันต่อเนื่อง',
        secretClue: { th: 'ฝึกฝนต่อเนื่องสะสมวันให้ครบ 5 วัน', en: 'Play 5 days in a row', zh: '连续5天学习' },
        rewardTitle: 'เปลวไฟแห่งความมุ่งมั่น (Flame of Dedication)',
        loreText: 'ก้าวแรกของการสร้างวินัยที่ยอดเยี่ยม',
      },
      {
        id: 'streak_7',
        realmId: 'streaks',
        stepNumber: 2,
        badgeId: 'streak_7',
        title: { th: 'ก้าวแรกคนเก่ง 7 วัน', en: '7-Day Streak', zh: '坚持7天小冠军' },
        description: { th: 'ฝึกฝนต่อเนื่องติดต่อกันครบ 7 วัน (1 สัปดาห์)', en: 'Play 7 consecutive days (1 week)', zh: '连续7天坚持学习（满1周）' },
        icon: '🌱',
        mysteryIcon: '❓',
        isSecret: false,
        requiredTarget: 7,
        unit: 'วันต่อเนื่อง',
        secretClue: { th: 'ฝึกฝนติดต่อกันให้ครบ 1 สัปดาห์เต็ม', en: 'Complete 1 full week of daily learning', zh: '坚持完整一周' },
        rewardTitle: 'เหรียญตราก้าวแรกคนเก่ง 7 วัน (Week One Star)',
        loreText: 'ครบ 1 สัปดาห์เต็มแล้ว! นิสัยคนเก่งเริ่มก่อตัวอย่างมั่นคง',
      },
      {
        id: 'streak_14',
        realmId: 'streaks',
        stepNumber: 3,
        badgeId: 'streak_14',
        title: { th: 'นักสู้ตัวจิ๋ว 14 วัน (2 สัปดาห์)', en: '14-Day Streak', zh: '坚持14天小毅士' },
        description: { th: 'ฝึกฝนต่อเนื่องติดต่อกันครบ 14 วัน (2 สัปดาห์)', en: 'Play 14 consecutive days', zh: '连续14天坚持学习' },
        icon: '⚡',
        mysteryIcon: '🗝️',
        isSecret: true,
        requiredTarget: 14,
        unit: 'วันต่อเนื่อง',
        secretClue: { th: '🔒 รางวัลลับดวงดาว: เล่นต่อเนื่องครบ 14 วันเต็มเพื่อเปิดมิติดวงดาวที่สอง!', en: 'Mystery Reward: Reach a 14-day streak to reveal the Two-Week Constellation!', zh: '神秘奖励：连续打卡14天揭开双周星座！' },
        rewardTitle: 'สายฟ้านักสู้ 14 วัน (Thunder of Tenacity)',
        loreText: 'ความเพียรพยายาม 2 สัปดาห์เต็ม สร้างพลังใจที่แข็งแกร่งอย่างแท้จริง',
      },
      {
        id: 'streak_21',
        realmId: 'streaks',
        stepNumber: 4,
        badgeId: 'streak_21',
        title: { th: 'นิสัยรักการเรียนรู้ 21 วัน', en: '21-Day Habit', zh: '21天习惯养成家' },
        description: { th: 'ฝึกฝนต่อเนื่องครบ 21 วัน สร้างนิสัยรักการเรียนรู้', en: 'Play 21 consecutive days', zh: '连续21天坚持学习' },
        icon: '🚀',
        mysteryIcon: '🗝️',
        isSecret: true,
        requiredTarget: 21,
        unit: 'วันต่อเนื่อง',
        secretClue: { th: '🔒 รางวัลลับทางจิตวิทยา: วิทยาศาสตร์พิสูจน์แล้วว่า 21 วันสร้างนิสัยตลอดชีวิต!', en: 'Mystery Reward: 21 days form a lifetime habit of curiosity!', zh: '神秘奖励：21天习惯法则缔造终身好习惯！' },
        rewardTitle: 'จรวดทะยานสู่นิสัยรักเรียนรู้ (Habit Rocket)',
        loreText: 'การเรียนรู้ได้กลายเป็นกิจวัตรที่สนุกสนาน ไม่ต้องถูกบังคับอีกต่อไป',
      },
      {
        id: 'streak_30',
        realmId: 'streaks',
        stepNumber: 5,
        badgeId: 'streak_30',
        title: { th: 'แชมเปี้ยน 30 วันเต็ม (Grand Master)', en: '30-Day Master Champion', zh: '30天满贯总冠军' },
        description: { th: 'พิชิตสตรีคการเรียนรู้ครบ 30 วันเต็ม รับถ้วยรางวัลเกียรติยศสูงสุด', en: 'Play 30 consecutive days and earn the Grand Trophy', zh: '连续30天坚持学习斩获大奖杯' },
        icon: '🏆',
        mysteryIcon: '👑',
        isSecret: true,
        requiredTarget: 30,
        unit: 'วันต่อเนื่อง',
        secretClue: { th: '🔒 ถ้วยรางวัลลับสูงสุดแห่งจักรวาล: ยืนหยัดเรียนรู้ครบ 30 วันเต็มเพื่อเปิดหอเกียรติยศอมตะ!', en: 'Ultimate Galactic Trophy: Achieve 30 consecutive days of learning excellence!', zh: '终极无上秘宝奖杯：打满30天解锁至尊传奇！' },
        rewardTitle: 'ถ้วยเกียรติยศแชมเปี้ยน 30 วัน (Grand 30-Day Trophy)',
        loreText: 'สุดยอดความสำเร็จที่น่าภาคภูมิใจสูงสุดของหนูน้อยคนเก่ง',
      },
    ],
  },
];

export const LearningJourneyMap: React.FC<LearningJourneyMapProps> = ({
  profile,
  language = 'th',
  soundVolume = 0.8,
  onSelectMilestone,
  onPlaySubject,
  onOpenCertificate,
}) => {
  const [selectedRealmId, setSelectedRealmId] = useState<RealmId>('all');
  const [inspectingMilestone, setInspectingMilestone] = useState<JourneyMilestone | null>(null);
  const [justRevealedId, setJustRevealedId] = useState<string | null>(null);

  // Compute profile statistics across history
  const history = profile.history || [];
  const subjectCorrectCounts = useMemo(() => {
    let lit = 0,
      math = 0,
      prob = 0,
      inq = 0,
      cre = 0,
      phy = 0,
      soc = 0,
      cit = 0,
      eng = 0;

    history.forEach((h) => {
      lit += h.literacyScore !== undefined ? h.literacyScore : h.thaiScore || 0;
      math += h.mathScore || 0;
      prob += h.problemSolvingScore || 0;
      inq += h.inquiryScore !== undefined ? h.inquiryScore : h.scienceScore || 0;
      cre += h.creativityScore || 0;
      phy += h.physicalHealthScore || 0;
      soc += h.socioEmotionalScore || 0;
      cit += h.citizenshipScore || 0;
      eng += h.englishScore || 0;
    });

    return {
      literacy: lit,
      math,
      problem_solving: prob,
      inquiry: inq,
      creativity: cre,
      physical_health: phy,
      socio_emotional: soc,
      citizenship: cit,
      english: eng,
    };
  }, [history]);

  // Helper to evaluate milestone progress & status
  const getMilestoneState = useCallback(
    (m: JourneyMilestone): {
      status: WaypointStatus;
      currentValue: number;
      targetValue: number;
      progressPercent: number;
      isUnlocked: boolean;
      isRevealed: boolean;
    } => {
      let currentVal = 0;
      let targetVal = m.requiredTarget;
      let isUnlocked = false;

      // Check if unlocked via profile badges
      if (m.badgeId && profile.badges.includes(m.badgeId)) {
        isUnlocked = true;
      }

      if (m.realmId === 'streaks') {
        currentVal = profile.streakDays || 0;
        if (currentVal >= targetVal) isUnlocked = true;
      } else if (m.id === 'combo_10') {
        isUnlocked = profile.badges.includes('combo_10');
        currentVal = isUnlocked ? 10 : 0;
      } else if (m.id === 'magic_finger') {
        isUnlocked = profile.badges.includes('magic_finger');
        currentVal = isUnlocked ? 5 : 0;
      } else if (m.subject) {
        currentVal = subjectCorrectCounts[m.subject] || 0;
        if (currentVal >= targetVal) {
          isUnlocked = true;
        }
      }

      const progressPercent = Math.min(100, Math.round((currentVal / targetVal) * 100));

      // Discovery / Mystery Reveal criteria:
      // A secret reward is revealed if:
      // 1. It is unlocked, OR
      // 2. The child reached at least 50% of the progress required, OR
      // 3. It's marked as just revealed
      const isRevealed =
        !m.isSecret || isUnlocked || progressPercent >= 50 || justRevealedId === m.id;

      let status: WaypointStatus = 'locked';
      if (isUnlocked) {
        status = 'unlocked';
      } else if (m.isSecret && !isRevealed) {
        status = 'mystery_hidden';
      } else if (progressPercent > 0 || m.stepNumber === 1) {
        status = 'current_quest';
      } else {
        status = 'locked';
      }

      return {
        status,
        currentValue: currentVal,
        targetValue: targetVal,
        progressPercent,
        isUnlocked,
        isRevealed,
      };
    },
    [profile, subjectCorrectCounts, justRevealedId]
  );

  // Overall statistics for header banner
  const overallStats = useMemo(() => {
    let totalMilestones = 0;
    let unlockedMilestones = 0;
    let totalSecrets = 0;
    let revealedSecrets = 0;
    let hiddenSecrets = 0;

    JOURNEY_REALMS.forEach((realm) => {
      realm.milestones.forEach((m) => {
        totalMilestones++;
        const state = getMilestoneState(m);
        if (state.isUnlocked) unlockedMilestones++;
        if (m.isSecret) {
          totalSecrets++;
          if (state.isRevealed) revealedSecrets++;
          else hiddenSecrets++;
        }
      });
    });

    const completionRate = Math.round((unlockedMilestones / Math.max(1, totalMilestones)) * 100);

    return {
      totalMilestones,
      unlockedMilestones,
      totalSecrets,
      revealedSecrets,
      hiddenSecrets,
      completionRate,
    };
  }, [getMilestoneState]);

  // Active realms based on filter
  const displayedRealms = useMemo(() => {
    if (selectedRealmId === 'all') return JOURNEY_REALMS;
    return JOURNEY_REALMS.filter((r) => r.id === selectedRealmId);
  }, [selectedRealmId]);

  // Handle milestone click
  const handleMilestoneClick = (milestone: JourneyMilestone) => {
    soundEffects.playTap(soundVolume);
    const state = getMilestoneState(milestone);

    // If unlocked, play victory fanfare & spray confetti!
    if (state.isUnlocked) {
      soundEffects.playVictory(soundVolume);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }

    setInspectingMilestone(milestone);
    if (onSelectMilestone) {
      onSelectMilestone(milestone.id);
    }
  };

  // Trigger celebration from inspector modal
  const handleCelebrate = () => {
    soundEffects.playVictory(soundVolume);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  // Reveal secret preview with a sparkle
  const handlePeekSecret = (milestone: JourneyMilestone) => {
    soundEffects.playSuccess(soundVolume);
    setJustRevealedId(milestone.id);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="learning-journey-map flex flex-col h-full bg-slate-900 text-white rounded-3xl overflow-hidden select-none border-4 border-amber-400/80 shadow-2xl relative">
      {/* 1. Header Adventure Navigator */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 shadow-lg shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 border-b-2 border-amber-300">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl shadow-sm animate-pulse">
            🗺️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black font-display tracking-tight text-white drop-shadow-xs">
                แผนที่การผจญภัยการเรียนรู้ (Learning Journey Map)
              </h2>
              <span className="text-[10px] font-black bg-amber-950/80 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400">
                8 ดินแดน & รางวัลลับ
              </span>
            </div>
            <p className="text-xs text-amber-100 font-medium">
              เส้นทางสำรวจสมรรถนะปฐมวัยของ {profile.name} • ปลดล็อกความลับและเหรียญเกียรติยศ
            </p>
          </div>
        </div>

        {/* Global Progress Pill */}
        <div className="flex items-center gap-3 bg-amber-950/50 backdrop-blur-xs px-4 py-2 rounded-2xl border border-amber-300/40">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-amber-200 block">สำรวจสำเร็จ</span>
            <span className="text-lg font-black text-amber-300">{overallStats.completionRate}%</span>
          </div>
          <div className="h-7 w-px bg-amber-400/30" />
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-amber-200 block">ปลดล็อกแล้ว</span>
            <span className="text-lg font-black text-white">
              {overallStats.unlockedMilestones}/{overallStats.totalMilestones}
            </span>
          </div>
          <div className="h-7 w-px bg-amber-400/30" />
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-amber-200 block">รางวัลลับซ่อนอยู่</span>
            <span className="text-lg font-black text-yellow-300 flex items-center justify-center gap-0.5">
              <span>🗝️</span>
              <span>{overallStats.hiddenSecrets}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Realm Selector Filter Tabs (Horizontal Scroll) */}
      <div className="bg-slate-950/90 border-b border-slate-800 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        <button
          type="button"
          onClick={() => {
            soundEffects.playTap(soundVolume);
            setSelectedRealmId('all');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
            selectedRealmId === 'all'
              ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
          }`}
        >
          <span>🌍</span>
          <span>ดินแดนทั้งหมด (All Worlds)</span>
        </button>

        {JOURNEY_REALMS.map((realm) => {
          const isSelected = selectedRealmId === realm.id;
          return (
            <button
              key={realm.id}
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setSelectedRealmId(realm.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-md scale-105'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span>{realm.icon}</span>
              <span>{realm.name[language] || realm.name.th}</span>
            </button>
          );
        })}
      </div>

      {/* 3. The Visual Journey World Canvas (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950 space-y-8 relative">
        {/* Ambient star decorations */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

        {displayedRealms.map((realm, realmIndex) => {
          return (
            <div
              key={realm.id}
              id={`realm-section-${realm.id}`}
              className={`rounded-3xl border-2 ${realm.accentBorder} bg-gradient-to-br ${realm.gradientBg} p-4 sm:p-6 relative overflow-hidden shadow-xl backdrop-blur-xs`}
            >
              {/* Realm Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
                    {realm.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-white">
                        {realm.name[language] || realm.name.th}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/20">
                        {realm.milestones.length} ด่านผจญภัย
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mt-0.5 max-w-xl">
                      {realm.description[language] || realm.description.th}
                    </p>
                  </div>
                </div>

                {/* Realm quick jump or play button */}
                {realm.id !== 'streaks' && onPlaySubject && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      onPlaySubject(realm.id as Subject);
                    }}
                    className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all active:scale-95 shadow-md cursor-pointer shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>ไปฝึกฝนวิชานี้</span>
                  </button>
                )}
              </div>

              {/* Journey Stepping Trail (Interactive Map Path) */}
              <div className="relative pt-6 pb-4">
                {/* Visual SVG Path Line connecting waypoints */}
                <div className="hidden md:block absolute top-14 left-8 right-8 h-3 -z-0">
                  <div className="w-full h-2 rounded-full bg-slate-800/80 border border-white/10 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 rounded-full transition-all duration-700"
                      style={{
                        width: `${
                          (realm.milestones.filter((m) => getMilestoneState(m).isUnlocked).length /
                            Math.max(1, realm.milestones.length)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Stepping Stones Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                  {realm.milestones.map((milestone, idx) => {
                    const state = getMilestoneState(milestone);
                    const isInspected = inspectingMilestone?.id === milestone.id;

                    return (
                      <div
                        key={milestone.id}
                        id={`milestone-node-${milestone.id}`}
                        onClick={() => handleMilestoneClick(milestone)}
                        className={`group relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none ${
                          state.status === 'unlocked'
                            ? 'bg-gradient-to-b from-amber-500/20 via-slate-800/80 to-slate-900 border-amber-400 shadow-lg shadow-amber-500/20 hover:border-amber-300 hover:scale-102 ring-2 ring-amber-400/40'
                            : state.status === 'current_quest'
                            ? 'bg-gradient-to-b from-indigo-500/20 via-slate-800/90 to-slate-900 border-indigo-400 shadow-lg shadow-indigo-500/20 hover:border-indigo-300 hover:scale-102 ring-2 ring-indigo-400/50 animate-pulse'
                            : state.status === 'mystery_hidden'
                            ? 'bg-gradient-to-b from-purple-950/40 via-slate-900/90 to-slate-950 border-purple-500/50 hover:border-purple-400 hover:scale-102'
                            : 'bg-slate-900/60 border-slate-700/60 opacity-60 hover:opacity-90'
                        } ${isInspected ? 'ring-4 ring-white' : ''}`}
                      >
                        {/* Current Quest Child Avatar Marker */}
                        {state.status === 'current_quest' && (
                          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md border border-white flex items-center gap-1 z-20 animate-bounce">
                            <span>{profile.avatar}</span>
                            <span>เป้าหมายถัดไป!</span>
                          </div>
                        )}

                        {/* Top Node Row: Step badge & Status Icon */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                              state.status === 'unlocked'
                                ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                                : state.status === 'current_quest'
                                ? 'bg-indigo-400/20 text-indigo-300 border-indigo-400/50'
                                : state.status === 'mystery_hidden'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            ด่านที่ {milestone.stepNumber}
                          </span>

                          {/* Completion / Mystery Status Indicator */}
                          {state.status === 'unlocked' ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/50">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>สำเร็จ!</span>
                            </span>
                          ) : state.status === 'mystery_hidden' ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-yellow-300 bg-purple-950/70 px-2 py-0.5 rounded-full border border-purple-500/50">
                              <span>🌫️</span>
                              <span>รางวัลลับ</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" />
                              <span>{state.progressPercent}%</span>
                            </span>
                          )}
                        </div>

                        {/* Node Icon Avatar with Mystery Fog effects */}
                        <div className="my-2 flex items-center justify-center">
                          <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg relative transition-all group-hover:scale-110 ${
                              state.status === 'unlocked'
                                ? 'bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-950 ring-4 ring-amber-400/40 shadow-amber-500/30'
                                : state.status === 'current_quest'
                                ? 'bg-gradient-to-tr from-indigo-600 to-purple-500 text-white ring-4 ring-indigo-400/40 shadow-indigo-500/30'
                                : state.status === 'mystery_hidden'
                                ? 'bg-gradient-to-br from-purple-900 to-slate-900 text-yellow-300 ring-2 ring-purple-500/40 shadow-inner'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {/* Icon rendering */}
                            {state.status === 'mystery_hidden' ? (
                              <div className="relative flex items-center justify-center">
                                <span className="text-2xl filter drop-shadow-md animate-pulse">
                                  {milestone.mysteryIcon}
                                </span>
                                <span className="absolute -bottom-1 -right-1 text-xs">🌫️</span>
                              </div>
                            ) : (
                              <span>{milestone.icon}</span>
                            )}

                            {/* Sparkling stars for unlocked */}
                            {state.status === 'unlocked' && (
                              <span className="absolute -top-1 -right-1 text-xs animate-spin">
                                ✨
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title and clue */}
                        <div className="text-center mt-1">
                          <h4
                            className={`text-xs sm:text-sm font-black truncate ${
                              state.status === 'unlocked'
                                ? 'text-amber-200'
                                : state.status === 'mystery_hidden'
                                ? 'text-purple-200'
                                : 'text-slate-200'
                            }`}
                          >
                            {state.status === 'mystery_hidden'
                              ? '??? รางวัลปริศนาลับ'
                              : milestone.title[language] || milestone.title.th}
                          </h4>

                          <p className="text-[10.5px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                            {state.status === 'mystery_hidden'
                              ? milestone.secretClue[language] || milestone.secretClue.th
                              : milestone.description[language] || milestone.description.th}
                          </p>
                        </div>

                        {/* Progress Bar Footer */}
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                            <span>
                              {state.status === 'mystery_hidden'
                                ? 'ความคืบหน้าการเปิดผนึก'
                                : `${state.currentValue}/${state.targetValue} ${milestone.unit}`}
                            </span>
                            <span
                              className={state.isUnlocked ? 'text-emerald-400' : 'text-amber-300'}
                            >
                              {state.progressPercent}%
                            </span>
                          </div>

                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                state.isUnlocked
                                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
                                  : state.status === 'mystery_hidden'
                                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500'
                                  : 'bg-gradient-to-r from-amber-400 to-orange-400'
                              }`}
                              style={{ width: `${state.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Milestone Detailed Inspection Modal / Dialog */}
      {inspectingMilestone && (() => {
        const state = getMilestoneState(inspectingMilestone);
        return (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
            onClick={(e) => {
              if (e.target === e.currentTarget) setInspectingMilestone(null);
            }}
          >
            <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl relative overflow-hidden animate-in zoom-in-95 text-white">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setInspectingMilestone(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                ✕
              </button>

              {/* Status Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-md border ${
                    state.status === 'unlocked'
                      ? 'bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-950 border-amber-300 ring-4 ring-amber-400/30'
                      : state.status === 'mystery_hidden'
                      ? 'bg-gradient-to-br from-purple-900 to-slate-900 text-yellow-300 border-purple-500 ring-2 ring-purple-500/40'
                      : 'bg-slate-800 text-indigo-300 border-slate-700'
                  }`}
                >
                  {state.status === 'mystery_hidden'
                    ? inspectingMilestone.mysteryIcon
                    : inspectingMilestone.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                      ด่านที่ {inspectingMilestone.stepNumber}
                    </span>
                    {state.isUnlocked ? (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                        ⭐ ปลดล็อกสมบูรณ์แล้ว
                      </span>
                    ) : state.status === 'mystery_hidden' ? (
                      <span className="text-[10px] font-bold text-yellow-300 bg-purple-950 px-2 py-0.5 rounded-full border border-purple-500/40">
                        🌫️ รางวัลลับในม่านหมอก
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-500/40">
                        🧭 ภารกิจกำลังดำเนินการ
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-white mt-1">
                    {state.status === 'mystery_hidden'
                      ? '??? รางวัลปริศนาที่ซ่อนอยู่'
                      : inspectingMilestone.title[language] || inspectingMilestone.title.th}
                  </h3>
                  <span className="text-xs text-amber-300 font-bold block">
                    {inspectingMilestone.rewardTitle}
                  </span>
                </div>
              </div>

              {/* Description & Mystery Clue Box */}
              <div
                className={`p-3.5 rounded-2xl border mb-4 text-xs leading-relaxed ${
                  state.status === 'mystery_hidden'
                    ? 'bg-purple-950/40 border-purple-500/40 text-purple-200'
                    : 'bg-slate-800/80 border-slate-700 text-slate-200'
                }`}
              >
                {state.status === 'mystery_hidden' ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 font-black text-yellow-300">
                      <span>🗝️ เบาะแสปริศนา (Mystery Hint):</span>
                    </div>
                    <p>{inspectingMilestone.secretClue[language] || inspectingMilestone.secretClue.th}</p>
                    <p className="text-[11px] text-purple-300/80 italic">
                      ทำภารกิจสะสมแต้มให้ถึง 50% หรือปลดล็อกเป้าหมายเพื่อเปิดเผยรางวัลเต็มรูปแบบ!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p>{inspectingMilestone.description[language] || inspectingMilestone.description.th}</p>
                    <p className="text-[11px] text-slate-400 italic">
                      &quot;{inspectingMilestone.loreText}&quot;
                    </p>
                  </div>
                )}
              </div>

              {/* Progress details */}
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-white/10 mb-4">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-400">เป้าหมายความสำเร็จ:</span>
                  <span className={state.isUnlocked ? 'text-emerald-400 font-black' : 'text-amber-300 font-black'}>
                    {state.currentValue} / {state.targetValue} {inspectingMilestone.unit} ({state.progressPercent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      state.isUnlocked
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
                        : 'bg-gradient-to-r from-amber-400 to-orange-400'
                    }`}
                    style={{ width: `${state.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                {state.status === 'mystery_hidden' && (
                  <button
                    type="button"
                    onClick={() => handlePeekSecret(inspectingMilestone)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>แอบดูเบาะแส (Peek)</span>
                  </button>
                )}

                {state.isUnlocked ? (
                  <button
                    type="button"
                    onClick={handleCelebrate}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs transition-all active:scale-95 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>จุดพลุฉลอง! (Celebrate)</span>
                  </button>
                ) : (
                  inspectingMilestone.subject && onPlaySubject && (
                    <button
                      type="button"
                      onClick={() => {
                        setInspectingMilestone(null);
                        onPlaySubject(inspectingMilestone.subject!);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs transition-all active:scale-95 cursor-pointer shadow-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>ไปฝึกฝนวิชานี้ทันที</span>
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() => setInspectingMilestone(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
