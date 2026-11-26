import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  RefreshCw,
  X,
  ChevronRight,
  MessageCircle,
  Heart,
  Lightbulb,
  Move,
  Play,
  Pause,
  Clock,
  Zap,
} from 'lucide-react';
import { GameSettings, Language, Question, Subject } from '../types';
import { speakText, stopSpeaking, isAudioMuted, soundEffects } from '../services/audioService';

export interface LearningBuddyMascotProps {
  question?: Question;
  questionNumber?: number;
  totalQuestions?: number;
  settings?: GameSettings;
  isAnswered?: boolean;
  isCorrect?: boolean;
  roundComplete?: boolean;
  effectiveMode?: 'touch' | 'hand';
  dwellProgress?: number;
  customCategory?: string;
  gameTitle?: string;
}

type MascotExpression = 'idle' | 'speaking' | 'celebrating' | 'comforting' | 'thinking';
type MascotCorner = 'top-right' | 'bottom-left';

interface BuddyTip {
  id: string;
  category:
    | 'hand'
    | 'touch'
    | 'math'
    | 'literacy'
    | 'science'
    | 'general'
    | 'growth'
    | 'comfort'
    | 'celebrate'
    | 'calm_mind'
    | 'social'
    | 'body'
    | 'brain_flex'
    | 'sequence';
  text: Record<Language, string>;
  icon: string;
}

const BUDDY_TIPS: BuddyTip[] = [
  // Hand tracking tips
  {
    id: 'hand-1',
    category: 'hand',
    icon: '☝️',
    text: {
      th: 'ชูนิ้วชี้ขึ้นมาตรงหน้ากล้อง แล้วขยับช้าๆ อย่างมั่นใจนะคนเก่ง!',
      en: 'Point your index finger towards the camera and move smoothly!',
      zh: '把食指立在摄像头前，平稳自信地移动哦！',
    },
  },
  {
    id: 'hand-2',
    category: 'hand',
    icon: '⏱️',
    text: {
      th: 'ชี้ค้างไว้ที่ตัวเลือกจนวงกลมสีเขียวเต็มวง เพื่อยืนยันคำตอบนะจ๊ะ',
      en: 'Hold your pointer still on the option until the green circle fills up!',
      zh: '将指针悬停在选项上，直到绿色圆圈填满即可作答！',
    },
  },
  {
    id: 'hand-3',
    category: 'hand',
    icon: '🖐️',
    text: {
      th: 'ขยับมือให้อยู่ตรงกลางหน้ากล้อง จะตรวจจับได้แม่นยำที่สุดเลย!',
      en: 'Keep your hand centered in front of the camera for best tracking!',
      zh: '把手放在摄像头中间位置，识别效果最棒哦！',
    },
  },
  {
    id: 'hand-4',
    category: 'hand',
    icon: '💡',
    text: {
      th: 'ห้องที่มีแสงสว่างพอดีและไม่มีเงาย้อนแสง จะช่วยให้จับนิ้วได้ลื่นไหลสุดๆ',
      en: 'Good lighting with no strong backlights makes hand tracking super smooth!',
      zh: '光线充足、避免逆光可以让手指识别非常流畅！',
    },
  },
  {
    id: 'hand-5',
    category: 'hand',
    icon: '🎯',
    text: {
      th: 'กางนิ้วชี้เดี่ยวๆ หุบนิ้วอื่น จะช่วยให้เล็งเป้าหมายได้นิ่งและแม่นยำมาก!',
      en: 'Extend just your index finger and curl others for the sharpest aim!',
      zh: '只伸出食指并收拢其他手指，瞄准会更加稳定准确！',
    },
  },
  {
    id: 'hand-6',
    category: 'hand',
    icon: '🖱️',
    text: {
      th: 'ถ้าเมื่อยแขน สามารถแตะหน้าจอหรือใช้เมาส์คลิกเล่นแทนได้ทุกเมื่อนะ',
      en: 'Arm feeling tired? You can tap the screen or use the mouse anytime!',
      zh: '手臂累了吗？随时可以轻触屏幕或用鼠标来作答哦！',
    },
  },

  // Touch & Mouse Mode
  {
    id: 'touch-1',
    category: 'touch',
    icon: '📱',
    text: {
      th: 'แตะที่การ์ดคำตอบที่ถูกต้องได้ทันทีเลยนะจ๊ะ ง่าย สนุก และรวดเร็ว!',
      en: 'Tap on your chosen answer directly on the screen! Quick and fun!',
      zh: '直接点击屏幕上正确的答案卡片吧，既轻松又有趣！',
    },
  },
  {
    id: 'touch-2',
    category: 'touch',
    icon: '👀',
    text: {
      th: 'มองสำรวจตัวเลือกให้ทั่วทั้งหน้าจอก่อน แล้วค่อยแตะคำตอบที่มั่นใจนะ',
      en: 'Scan all the options carefully before tapping your best answer!',
      zh: '在轻触之前先看清所有选项，再选出最有信心的答案！',
    },
  },

  // Math & Logic tips
  {
    id: 'math-1',
    category: 'math',
    icon: '🔢',
    text: {
      th: 'ค่อยๆ นับทีละจำนวนนะคนเก่ง ใช้นิ้วแตะตามไปทีละชิ้นเลย',
      en: 'Count carefully one by one, take your time before choosing!',
      zh: '一个一个慢慢数，手指点着数更准确哦！',
    },
  },
  {
    id: 'math-2',
    category: 'math',
    icon: '📐',
    text: {
      th: 'สังเกตรูปร่าง ขนาด และสีสันดูสิจ๊ะ คำตอบแอบซ่อนอยู่ตรงนั้นนะ',
      en: 'Look closely at shapes, sizes, and colors! The answer is right there.',
      zh: '仔细观察形状、大小和颜色，答案就藏在其中呢！',
    },
  },
  {
    id: 'math-3',
    category: 'math',
    icon: '⚖️',
    text: {
      th: 'ลองเปรียบเทียบว่าฝั่งไหนมีมากกว่า หรือฝั่งไหนน้อยกว่าดูนะจ๊ะ',
      en: 'Compare which side has more, and which has fewer!',
      zh: '比一比哪一边比较多，哪一边比较少呢？',
    },
  },
  {
    id: 'math-4',
    category: 'math',
    icon: '🟡',
    text: {
      th: 'วงกลมโค้งมนไม่มีมุม สี่เหลี่ยมมี 4 มุม สังเกตเส้นขอบดีๆ นะคนเก่ง',
      en: 'Circles are round with no corners; squares have 4 corners! Look closely.',
      zh: '圆形圆溜溜没有角，正方形有四个角，仔细看边线哦！',
    },
  },

  // Literacy & Language tips
  {
    id: 'literacy-1',
    category: 'literacy',
    icon: '📖',
    text: {
      th: 'ดูรูปภาพและสังเกตตัวอักษรประกอบกัน จะช่วยให้ตอบได้ง่ายขึ้นเยอะเลย!',
      en: 'Look at both pictures and letters together, it helps you find the answer!',
      zh: '结合图画和文字一起看，能更快找到正确答案哦！',
    },
  },
  {
    id: 'literacy-2',
    category: 'literacy',
    icon: '🎧',
    text: {
      th: 'ลองออกเสียงตามในใจ หรือแตะปุ่มลำโพงเพื่อฟังโจทย์อีกรอบได้นะ',
      en: 'Say the words softly to yourself, or tap the speaker button to listen again!',
      zh: '在心里默读一下，或者点按扬声器重新听题吧！',
    },
  },
  {
    id: 'literacy-3',
    category: 'literacy',
    icon: '🔤',
    text: {
      th: 'สังเกตพยัญชนะไทยตัวกลมๆ มีหัวม้วนเข้าหรือหัวม้วนออก ช่วยจำได้แม่นยำ',
      en: 'Notice the round heads on Thai letters—whether turning in or out helps memory!',
      zh: '注意泰文字母圆圆的小脑袋，向内还是向外转能帮你记牢！',
    },
  },
  {
    id: 'literacy-4',
    category: 'literacy',
    icon: '🎵',
    text: {
      th: 'เสียงสระและคำคล้องจองช่วยให้สมองจำคำศัพท์ได้เร็วและสนุกสนาน!',
      en: 'Rhyming sounds help your brain remember vocabulary with musical fun!',
      zh: '押韵的音节帮助你的大脑快速而欢快地记住生词！',
    },
  },

  // Science & Inquiry tips
  {
    id: 'science-1',
    category: 'science',
    icon: '🔍',
    text: {
      th: 'แปลงร่างเป็นนักวิทยาศาสตร์ตัวน้อย แล้วสังเกตรายละเอียดรอบตัวดูนะ!',
      en: 'Become a little scientist and observe the colorful details!',
      zh: '变成小小科学家，仔细观察画面的各种细节吧！',
    },
  },
  {
    id: 'science-2',
    category: 'science',
    icon: '🐬',
    text: {
      th: 'สัตว์บกเดินบนดิน สัตว์น้ำว่ายในน้ำ นกมีปีกบินบนฟ้า สังเกตที่อยู่และร่างกายดูนะ',
      en: 'Land animals walk, fish swim in water, birds fly in sky! Look at their habitats.',
      zh: '陆地动物在地上走，水生动物在水里游，鸟儿在天空飞，观察生活习性吧！',
    },
  },
  {
    id: 'science-3',
    category: 'science',
    icon: '☀️',
    text: {
      th: 'กลางวันมีแสงแดดอบอุ่น กลางคืนมีดวงจันทร์และดวงดาวระยิบระยับสวยงาม',
      en: 'Daytime brings warm sunshine; night brings moonlight and twinkling stars!',
      zh: '白天有温暖的阳光，夜晚有月亮和闪烁的星星！',
    },
  },

  // Mindfulness & Calm Mind
  {
    id: 'calm-1',
    category: 'calm_mind',
    icon: '🌸',
    text: {
      th: 'สูดหายใจเข้าลึกๆ ดมกลิ่นหอมดอกไม้ แล้วผ่อนลมหายใจออกช้าๆ เป่าลูกโป่ง ฟู่~',
      en: 'Breathe in deep like smelling a flower, exhale slowly like blowing a balloon!',
      zh: '深深吸一口气闻闻花香，慢慢吐气把气球吹得大大的，呼~',
    },
  },
  {
    id: 'calm-2',
    category: 'calm_mind',
    icon: '💖',
    text: {
      th: 'เมื่อรู้สึกตื่นเต้น ให้วางมือบนหน้าอก สัมผัสจังหวะหัวใจที่เต้นอย่างอ่อนโยน',
      en: 'Feeling excited? Rest a hand on your chest and feel your gentle heartbeat.',
      zh: '感到兴奋时，把手放在胸口，感受温柔平稳的心跳吧。',
    },
  },
  {
    id: 'calm-3',
    category: 'calm_mind',
    icon: '💧',
    text: {
      th: 'จิบน้ำเปล่าสักนิด แล้วพักสายตาจากหน้าจอ 5 วินาทีนะคนเก่ง สมองจะสดชื่น!',
      en: 'Take a sip of water and rest your eyes away from the screen for 5 seconds!',
      zh: '喝一小口水，让眼睛离开屏幕休息5秒钟，大脑立刻焕然一新！',
    },
  },

  // Social & Sharing Manners
  {
    id: 'social-1',
    category: 'social',
    icon: '🤝',
    text: {
      th: 'คำว่า "ขอบคุณครับ/ค่ะ" และ "ขอโทษครับ/ค่ะ" เป็นยาวิเศษที่ทำให้ทุกคนยิ้มได้',
      en: '"Thank you" and "I am sorry" are magic words that make everyone smile!',
      zh: '“谢谢”和“对不起”是让大家都开心微笑的神奇咒语！',
    },
  },
  {
    id: 'social-2',
    category: 'social',
    icon: '🎁',
    text: {
      th: 'การแบ่งปันของเล่นและรอคอยตามคิว แสดงถึงน้ำใจของเพื่อนที่น่ารักที่สุด!',
      en: 'Sharing toys and waiting for your turn shows what a wonderful friend you are!',
      zh: '分享玩具、耐心排队等待轮流，是最棒的小朋友！',
    },
  },
  {
    id: 'social-3',
    category: 'social',
    icon: '👏',
    text: {
      th: 'เมื่อเพื่อนตอบถูกเราปรบมือแสดงความยินดี เมื่อเพื่อนตอบผิดเราส่งกำลังใจ "สู้ๆ นะ"',
      en: 'Cheer when friends succeed, and offer gentle encouragement when they make a mistake!',
      zh: '朋友答对时鼓掌祝贺，朋友答错时温暖地说一句“继续加油”！',
    },
  },

  // Body Movement & Posture
  {
    id: 'body-1',
    category: 'body',
    icon: '🧘',
    text: {
      th: 'นั่งตัวตรง หลังสบายๆ ผ่อนคลายหัวไหล่ สมองจะปลอดโปร่งคิดอะไรก็ไวปรี๊ด!',
      en: 'Sit upright comfortably, relax your shoulders, and your brain thinks so fast!',
      zh: '坐姿挺直放松双肩，大脑立刻更灵敏清晰！',
    },
  },
  {
    id: 'body-2',
    category: 'body',
    icon: '🤸',
    text: {
      th: 'ลองสะบัดข้อมือเบาๆ 5 ครั้ง หมุนไหล่ไปข้างหลัง เพื่อคลายกล้ามเนื้อแขนนะ',
      en: 'Shake your wrists 5 times and roll your shoulders back to relax your arms!',
      zh: '轻轻甩甩手腕5次，向后转动肩膀，让手臂彻底放松！',
    },
  },

  // Executive Function (EF) & Flexible Thinking
  {
    id: 'flex-1',
    category: 'brain_flex',
    icon: '🛑',
    text: {
      th: 'หยุดคิด 1 วินาทีก่อนกดตอบ การชะลอความเร่งรีบช่วยให้ตอบถูกแน่นอน!',
      en: 'Pause for 1 second before pressing! Slowing down ensures accuracy.',
      zh: '按下答案前停顿1秒钟，慢一点想得更周全，准确率超高！',
    },
  },
  {
    id: 'flex-2',
    category: 'brain_flex',
    icon: '🔄',
    text: {
      th: 'ถ้ากติกาเปลี่ยนในด่านใหม่ ให้สังเกตกติกาก่อน แล้วปรับตามได้เลย หนูเก่งมาก!',
      en: 'When rules shift, observe the new cue and adapt smoothly—you can do it!',
      zh: '当规则改变时，先仔细看清要求再灵活应对，你非常聪明！',
    },
  },
  {
    id: 'flex-3',
    category: 'brain_flex',
    icon: '🧠',
    text: {
      th: 'อย่าเพิ่งรีบกดสิ่งที่ล่อใจ ให้ตรวจดูโจทย์ว่าต้องการอะไรก่อนนะคนเก่ง',
      en: 'Resist tempting traps! Check carefully what the question is asking for.',
      zh: '先别急着点击诱人的干扰项，仔细确认题目问的是什么！',
    },
  },

  // Sequence & Sorting
  {
    id: 'seq-1',
    category: 'sequence',
    icon: '🌱',
    text: {
      th: 'มองหาลำดับก่อน-หลัง เช่น เมล็ดพืช -> ต้นกล้า -> ดอกไม้บาน หาขั้นแรกให้เจอนะ',
      en: 'Look for sequences like seed -> sprout -> bloom. Spot the first step first!',
      zh: '寻找先后顺序，例如种子 -> 幼苗 -> 开花，先找出第一步吧！',
    },
  },
  {
    id: 'seq-2',
    category: 'sequence',
    icon: '🧺',
    text: {
      th: 'ลองจัดกลุ่มตามการใช้งาน สี หรือประเภทสิ่งของ ค่อยๆ แยกทีละหมวดหมู่นะ',
      en: 'Sort objects by their use, color, or shape. Separate them category by category!',
      zh: '根据用途、颜色或种类来整理，一步步分好类别哦！',
    },
  },

  // General Growth Mindset
  {
    id: 'growth-1',
    category: 'growth',
    icon: '🌟',
    text: {
      th: 'หนูมีความพยายามยอดเยี่ยมมาก ครูและเพื่อนทุกคนเป็นกำลังใจให้นะ!',
      en: 'You are doing great! Keep practicing and have fun learning!',
      zh: '你非常努力，大家都在为你加油鼓劲呢！',
    },
  },
  {
    id: 'growth-2',
    category: 'growth',
    icon: '🧠',
    text: {
      th: 'ทุกข้อที่หนูฝึกคิด ทำให้เซลล์สมองเชื่อมต่อกันและเก่งขึ้นทุกวันเลย!',
      en: 'Every question you try makes your brain cells connect and grow stronger!',
      zh: '每一次思考，都让你的大脑神经元连接得更紧密！',
    },
  },
  {
    id: 'growth-3',
    category: 'growth',
    icon: '🌈',
    text: {
      th: 'สูดหายใจลึกๆ ยิ้มกว้างๆ แล้วค่อยๆ ตัดสินใจนะคนดี หนูทำได้แน่นอน!',
      en: 'Take a deep breath, smile big, and take your time! You can definitely do it!',
      zh: '深呼吸，露出大大的微笑，慢慢想，你一定能做到的！',
    },
  },
  {
    id: 'growth-4',
    category: 'growth',
    icon: '💪',
    text: {
      th: 'ความผิดพลาดคือบันไดสู่การเรียนรู้ ไม่ต้องกลัวที่จะลองทำข้อต่อไปนะ',
      en: 'Mistakes are just steps to learning. Never be afraid to try!',
      zh: '犯错是学习的必经之路，勇敢地去尝试下一题吧！',
    },
  },
  {
    id: 'growth-5',
    category: 'growth',
    icon: '🎖️',
    text: {
      th: 'หนูเป็นเด็กดี มีสมาธิและตั้งใจมาก น้องคิดดี้ภูมิใจในตัวหนูที่สุดเลย!',
      en: 'You are focused, attentive, and awesome! Buddy is super proud of you!',
      zh: '你专注、认真又棒极了！小智伴为你感到无比自豪！',
    },
  },
];

export const LearningBuddyMascot: React.FC<LearningBuddyMascotProps> = ({
  question,
  questionNumber,
  totalQuestions,
  settings = {
    language: 'th' as Language,
    soundVolume: 0.8,
    voicePersona: 'child_girl' as const,
    theme: 'sunny' as const,
    controlMode: 'auto' as const,
    dwellTimeSeconds: 1.2,
    questionsPerRound: 10,
    selectedSubjects: ['math'],
    autoSpeak: true,
    cameraMirrored: true,
    showCameraFeed: true,
    handPointerScale: 1,
  },
  isAnswered = false,
  isCorrect,
  roundComplete = false,
  effectiveMode = 'touch',
  dwellProgress = 0,
  customCategory,
  gameTitle,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [corner, setCorner] = useState<MascotCorner>('top-right');
  const [expression, setExpression] = useState<MascotExpression>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasNewTipPulse, setHasNewTipPulse] = useState(false);
  const [blinkState, setBlinkState] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);

  // Stable references to prevent cascading infinite re-renders
  const currentTipIdRef = useRef<string>(BUDDY_TIPS[0].id);
  const selectContextualTipRef = useRef<(forceRandom?: boolean) => BuddyTip>(() => BUDDY_TIPS[0]);
  const handleSpeakBuddyTipRef = useRef<(tipToSpeak?: BuddyTip) => void>(() => {});
  const prevQuestionIdRef = useRef<string | undefined>(question?.id);
  const prevCategoryRef = useRef<string | undefined>(customCategory);
  const prevAnsweredRef = useRef(false);

  // Pick a smart relevant tip based on context (stable dependencies - does not depend on currentTip)
  const selectContextualTip = useCallback(
    (forceRandom = false): BuddyTip => {
      let pool: BuddyTip[] = [];

      if (!forceRandom) {
        // Mode-based tips
        if (effectiveMode === 'hand') {
          pool.push(...BUDDY_TIPS.filter((t) => t.category === 'hand'));
        } else {
          pool.push(...BUDDY_TIPS.filter((t) => t.category === 'touch'));
        }

        // Question subject-specific tips
        if (question?.subject === 'math') {
          pool.push(...BUDDY_TIPS.filter((t) => t.category === 'math'));
        } else if (
          question?.subject === 'literacy' ||
          question?.subject === 'thai' ||
          question?.subject === 'english'
        ) {
          pool.push(...BUDDY_TIPS.filter((t) => t.category === 'literacy'));
        } else if (question?.subject === 'science' || question?.subject === 'inquiry') {
          pool.push(...BUDDY_TIPS.filter((t) => t.category === 'science'));
        }

        // Skill game customCategory specific tips
        if (customCategory) {
          if (customCategory.includes('calm') || customCategory.includes('breath')) {
            pool.push(...BUDDY_TIPS.filter((t) => t.category === 'calm_mind'));
          } else if (
            customCategory.includes('manner') ||
            customCategory.includes('social') ||
            customCategory.includes('emotion')
          ) {
            pool.push(...BUDDY_TIPS.filter((t) => t.category === 'social'));
          } else if (customCategory.includes('body') || customCategory.includes('movement')) {
            pool.push(...BUDDY_TIPS.filter((t) => t.category === 'body'));
          } else if (
            customCategory.includes('brain') ||
            customCategory.includes('flex') ||
            customCategory.includes('rules')
          ) {
            pool.push(...BUDDY_TIPS.filter((t) => t.category === 'brain_flex'));
          } else if (
            customCategory.includes('sequence') ||
            customCategory.includes('sorting') ||
            customCategory.includes('match')
          ) {
            pool.push(...BUDDY_TIPS.filter((t) => t.category === 'sequence' || t.category === 'math'));
          }
        }
      }

      if (pool.length === 0 || forceRandom) {
        // Broad pool including growth, mindfulness, EF, math, manners
        pool = BUDDY_TIPS.filter(
          (t) =>
            t.category === 'growth' ||
            t.category === 'brain_flex' ||
            t.category === 'calm_mind' ||
            t.category === 'social' ||
            t.category === 'math' ||
            t.category === 'sequence' ||
            t.category === 'hand'
        );
      }

      // Filter out current tip via ref to keep callback strictly stable
      const candidates = pool.filter((t) => t.id !== currentTipIdRef.current);
      const chosen = candidates.length > 0 ? candidates : pool;
      return chosen[Math.floor(Math.random() * chosen.length)] || BUDDY_TIPS[0];
    },
    [effectiveMode, question?.subject, customCategory]
  );

  // Keep selectContextualTip ref synced directly
  selectContextualTipRef.current = selectContextualTip;

  // Initial state computed once cleanly
  const [currentTip, setCurrentTip] = useState<BuddyTip>(() => selectContextualTip());

  // Continuous auto-rotation state ("แสดงทิปการเล่นใหม่ตลอดเวลา")
  const [autoCycle, setAutoCycle] = useState(true);
  const [cycleProgress, setCycleProgress] = useState(0); // 0 to 100%
  const [isPausedByUser, setIsPausedByUser] = useState(false);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speechIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastSpokenTipIdRef = useRef<string | null>(null);

  // Sync ref with current tip directly
  if (currentTip?.id) {
    currentTipIdRef.current = currentTip.id;
  }

  // Periodic mascot eye blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => {
        setBlinkState(false);
      }, 180);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Animate mouth flapping when speaking
  useEffect(() => {
    if (isSpeaking) {
      speechIntervalRef.current = setInterval(() => {
        setMouthOpen((prev) => !prev);
      }, 160);
    } else {
      if (speechIntervalRef.current) {
        clearInterval(speechIntervalRef.current);
        speechIntervalRef.current = null;
      }
      setMouthOpen((prev) => (prev ? false : prev));
    }
    return () => {
      if (speechIntervalRef.current) {
        clearInterval(speechIntervalRef.current);
      }
    };
  }, [isSpeaking]);

  // Handle speech synthesis for the buddy tip
  const handleSpeakBuddyTip = useCallback(
    (tipToSpeak?: BuddyTip) => {
      const tip = tipToSpeak || currentTip;
      if (!tip) return;

      const rawText = tip.text[settings.language] || tip.text.th;
      if (!rawText) return;

      if (isAudioMuted() || settings.soundVolume <= 0.01) {
        // Can't speak if muted
        return;
      }

      // Stop any existing speech and start new
      stopSpeaking();
      setIsSpeaking(true);
      setExpression('speaking');

      const lang: Language = (settings.language as Language) || 'th';
      speakText(rawText, lang, settings.voicePersona, settings.soundVolume);

      // Estimate speech duration (approx ~120 words per min or ~15 chars/sec for Thai)
      const estimatedDurationMs = Math.max(2200, Math.min(8500, rawText.length * 90));
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setIsSpeaking(false);
        setExpression('idle');
      }, estimatedDurationMs);
    },
    [currentTip, settings.language, settings.voicePersona, settings.soundVolume]
  );

  // Keep handleSpeakBuddyTip ref synced directly
  handleSpeakBuddyTipRef.current = handleSpeakBuddyTip;

  // Handle user clicking "Shuffle / Next Tip"
  const handleNextTip = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      soundEffects.playTap(settings.soundVolume > 0.01 ? settings.soundVolume : 0.6);
      const nextTip = selectContextualTip(true);
      currentTipIdRef.current = nextTip.id;
      setCurrentTip(nextTip);
      setCycleProgress(0);
      setHasNewTipPulse(true);
      setTimeout(() => setHasNewTipPulse(false), 600);
      // If voice was speaking, read the new tip
      if (isSpeaking) {
        handleSpeakBuddyTip(nextTip);
      }
    },
    [selectContextualTip, settings.soundVolume, isSpeaking, handleSpeakBuddyTip]
  );

  // Handle toggling Auto-Cycle
  const handleToggleAutoCycle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      soundEffects.playTap(settings.soundVolume > 0.01 ? settings.soundVolume : 0.5);
      setAutoCycle((prev) => !prev);
      setIsPausedByUser((prev) => !prev);
      setCycleProgress(0);
    },
    [settings.soundVolume]
  );

  // CONTINUOUS AUTO-CYCLE: Always rotate to a new gameplay tip every 8 seconds!
  useEffect(() => {
    if (!autoCycle || isPausedByUser || isSpeaking || isAnswered) {
      return;
    }

    const intervalTimeMs = 250;
    const totalDurationMs = 8000; // 8 seconds per tip
    const stepPercent = (intervalTimeMs / totalDurationMs) * 100;

    let accumulatedPercent = 0;

    const timer = setInterval(() => {
      accumulatedPercent += stepPercent;
      if (accumulatedPercent >= 100) {
        accumulatedPercent = 0;
        setCycleProgress(0);
        const nextTip = selectContextualTipRef.current(true);
        currentTipIdRef.current = nextTip.id;
        setCurrentTip(nextTip);
        setHasNewTipPulse(true);
        setTimeout(() => setHasNewTipPulse(false), 600);
      } else {
        setCycleProgress(Math.min(100, accumulatedPercent));
      }
    }, intervalTimeMs);

    return () => clearInterval(timer);
  }, [autoCycle, isPausedByUser, isSpeaking, isAnswered]);

  // Handle clicking on the mascot character directly
  const handleMascotClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isExpanded) {
        setIsExpanded(true);
      }

      soundEffects.playTap(settings.soundVolume > 0.01 ? settings.soundVolume : 0.6);
      const tip = selectContextualTip(true);
      currentTipIdRef.current = tip.id;
      setCurrentTip(tip);
      setCycleProgress(0);
      handleSpeakBuddyTip(tip);
    },
    [isExpanded, selectContextualTip, settings.soundVolume, handleSpeakBuddyTip]
  );

  // When question or category changes, provide an updated tip and reset state
  useEffect(() => {
    const questionChanged = Boolean(question?.id && question.id !== prevQuestionIdRef.current);
    const categoryChanged = Boolean(customCategory && customCategory !== prevCategoryRef.current);

    if (questionChanged || categoryChanged) {
      if (question?.id) prevQuestionIdRef.current = question.id;
      if (customCategory) prevCategoryRef.current = customCategory;

      const tip = selectContextualTipRef.current();
      currentTipIdRef.current = tip.id;
      setCurrentTip(tip);
      setCycleProgress(0);
      setExpression('idle');
      setIsSpeaking(false);
      lastSpokenTipIdRef.current = null;
    }
  }, [question?.id, customCategory]);

  // React to answer result (correct vs incorrect)
  useEffect(() => {
    if (isAnswered && !prevAnsweredRef.current) {
      prevAnsweredRef.current = true;
      if (isCorrect) {
        setExpression('celebrating');
        const celebrationTip: BuddyTip = {
          id: 'celebrate-correct',
          category: 'celebrate',
          icon: '🎉',
          text: {
            th: 'ว้าว! ถูกต้องเป๊ะเลย สุดยอดมากคนเก่ง! รับดาวไปเลย ⭐',
            en: 'Hooray! That is correct, fantastic job! You earned a star! ⭐',
            zh: '太棒了！回答完全正确，超级厉害！获得一颗闪亮星星 ⭐',
          },
        };
        currentTipIdRef.current = celebrationTip.id;
        setCurrentTip(celebrationTip);
        setIsExpanded(true);
        handleSpeakBuddyTipRef.current(celebrationTip);
      } else {
        setExpression('comforting');
        const comfortingTip: BuddyTip = {
          id: 'comfort-retry',
          category: 'comfort',
          icon: '💖',
          text: {
            th: 'ไม่เป็นไรเลยนะคนเก่ง ผิดเป็นครู ข้อต่อไปสู้ใหม่อีกครั้งนะ!',
            en: "It's totally okay! Mistakes help us learn, let's keep going!",
            zh: '没关系哦！错题让我们学得更多，下一题继续加油！',
          },
        };
        currentTipIdRef.current = comfortingTip.id;
        setCurrentTip(comfortingTip);
        setIsExpanded(true);
        handleSpeakBuddyTipRef.current(comfortingTip);
      }
    } else if (!isAnswered) {
      prevAnsweredRef.current = false;
    }
  }, [isAnswered, isCorrect]);

  // React to hand-tracking dwell progress encouraging prompt (functional update to prevent loops)
  useEffect(() => {
    if (isAnswered) return;
    if (dwellProgress > 0.45) {
      setExpression((prev) => (prev === 'idle' ? 'thinking' : prev));
    } else if (dwellProgress === 0) {
      setExpression((prev) => (prev === 'thinking' ? 'idle' : prev));
    }
  }, [dwellProgress, isAnswered]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
    };
  }, []);

  const localizedTipText = useMemo(() => {
    return currentTip.text[settings.language] || currentTip.text.th;
  }, [currentTip, settings.language]);

  const toggleCorner = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    soundEffects.playTap(settings.soundVolume > 0.01 ? settings.soundVolume : 0.5);
    setCorner((prev) => (prev === 'top-right' ? 'bottom-left' : 'top-right'));
  };

  const cornerClasses =
    corner === 'top-right'
      ? 'fixed top-18 sm:top-20 right-2 sm:right-4 z-40'
      : 'fixed bottom-16 sm:bottom-20 left-2 sm:left-4 z-40';

  return (
    <aside
      id="learning-buddy-mascot"
      data-testid="learning-buddy-mascot"
      className={`${cornerClasses} select-none transition-all duration-300 pointer-events-auto flex flex-col ${
        corner === 'top-right' ? 'items-end' : 'items-start'
      }`}
      aria-label="เพื่อนเรียนรู้ - Learning Buddy Mascot"
    >
      {/* Speech Bubble (when expanded) */}
      {isExpanded && (
        <div
          id="buddy-speech-bubble"
          className={`relative mb-2 max-w-[285px] sm:max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border-2 transition-all duration-300 animate-in fade-in zoom-in-95 ${
            expression === 'celebrating'
              ? 'border-amber-400 ring-2 ring-amber-300/60 bg-amber-50/95'
              : expression === 'comforting'
              ? 'border-pink-300 ring-2 ring-pink-200/50 bg-pink-50/95'
              : 'border-indigo-300 ring-2 ring-indigo-100 bg-white/95'
          } ${hasNewTipPulse ? 'scale-103 ring-4 ring-indigo-400 shadow-indigo-200' : ''}`}
        >
          {/* Header row in bubble */}
          <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-600">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-base animate-bounce">{currentTip.icon}</span>
              <span className="font-black text-indigo-700">น้องคิดดี้ (Buddy)</span>
              {/* Continuous tip badge */}
              <span className="inline-flex items-center gap-1 text-[9px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                <span className={`w-1.5 h-1.5 rounded-full ${autoCycle ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                ทิปใหม่ตลอดเวลา
              </span>
            </div>

            <div className="flex items-center gap-1">
              {/* Auto-cycle pause/play toggle */}
              <button
                type="button"
                onClick={handleToggleAutoCycle}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  autoCycle
                    ? 'text-indigo-600 hover:bg-indigo-50'
                    : 'text-slate-400 hover:bg-slate-100'
                }`}
                title={autoCycle ? 'พักการสลับทิปอัตโนมัติ' : 'เปิดการสลับทิปใหม่อัตโนมัติตลอดเวลา'}
                aria-label="สลับโหมดเปลี่ยนทิปอัตโนมัติ"
              >
                {autoCycle ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
              </button>

              {/* Move position button */}
              <button
                type="button"
                onClick={toggleCorner}
                className="p-1 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors cursor-pointer"
                title={corner === 'top-right' ? 'ย้ายไปมุมซ้ายล่าง' : 'ย้ายไปมุมขวาบน'}
                aria-label="ย้ายตำแหน่งเพื่อนเรียนรู้"
              >
                <Move className="w-3.5 h-3.5" />
              </button>

              {/* Minimize button */}
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(settings.soundVolume > 0.01 ? settings.soundVolume : 0.4);
                  setIsExpanded(false);
                }}
                className="p-1 text-slate-400 hover:text-rose-500 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                title="ย่อเพื่อนเรียนรู้"
                aria-label="ย่อเพื่อนเรียนรู้"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Speech Text with active tip animation */}
          <div key={currentTip.id} className="animate-in fade-in slide-in-from-bottom-1 duration-200">
            <p className="text-xs sm:text-[13px] text-slate-700 font-semibold leading-relaxed mt-2 pr-1">
              {localizedTipText}
            </p>
          </div>

          {/* Continuous Countdown Bar (indicates tip rotation timer) */}
          {autoCycle && !isSpeaking && !isAnswered && (
            <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span className="flex items-center gap-1 text-indigo-600">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500 animate-spin" />
                  สลับทิปใหม่ตลอดเวลา
                </span>
                <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                  {Math.max(1, Math.ceil(((100 - cycleProgress) / 100) * 8))}s
                </span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100 ease-linear rounded-full"
                  style={{ width: `${cycleProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Footer: Speak Tip & Next Tip buttons */}
          <div className="flex items-center justify-between gap-1.5 mt-2.5 pt-2 border-t border-slate-100">
            <button
              type="button"
              id="btn-speak-buddy-tip"
              data-testid="speak-buddy-tip"
              onClick={() => handleSpeakBuddyTip()}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                isSpeaking
                  ? 'bg-amber-500 text-white ring-2 ring-amber-300 animate-pulse'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
              }`}
              title="ฟังเสียงคำแนะนำจากน้องคิดดี้"
            >
              {isSpeaking ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                  <span>กำลังพูด...</span>
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-2 bg-white animate-pulse" />
                    <span className="w-0.5 h-3 bg-white animate-pulse delay-75" />
                    <span className="w-0.5 h-1 bg-white animate-pulse delay-150" />
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>ฟังเสียง</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="btn-next-buddy-tip"
              data-testid="next-buddy-tip"
              onClick={handleNextTip}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 px-2 py-1 rounded-xl border border-slate-200 transition-colors cursor-pointer active:scale-95"
              title="เปลี่ยนคำแนะนำข้อถัดไปทันที"
            >
              <RefreshCw className={`w-3 h-3 ${hasNewTipPulse ? 'animate-spin text-indigo-600' : ''}`} />
              <span>ขอทิปใหม่</span>
            </button>
          </div>

          {/* Speech Bubble Arrow pointing towards Mascot */}
          <div
            className={`absolute bottom-[-7px] w-3 h-3 bg-white/95 border-b-2 border-r-2 ${
              expression === 'celebrating'
                ? 'border-amber-400 bg-amber-50'
                : expression === 'comforting'
                ? 'border-pink-300 bg-pink-50'
                : 'border-indigo-300 bg-white'
            } transform rotate-45 ${corner === 'top-right' ? 'right-6' : 'left-6'}`}
          />
        </div>
      )}

      {/* Mascot Character Avatar (Clickable) */}
      <div className="relative group cursor-pointer" onClick={handleMascotClick}>
        {/* Glow Aura Ring */}
        <div
          className={`absolute -inset-1 rounded-full blur-xs transition-opacity duration-300 ${
            expression === 'celebrating'
              ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 opacity-90 animate-pulse'
              : expression === 'speaking'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 opacity-80 animate-ping'
              : 'bg-gradient-to-r from-blue-300 to-indigo-300 opacity-50 group-hover:opacity-80'
          }`}
        />

        {/* Mascot Avatar Container */}
        <div
          className={`relative w-13 h-13 sm:w-15 sm:h-15 rounded-full shadow-lg border-2 flex items-center justify-center transition-transform duration-200 active:scale-95 group-hover:scale-105 ${
            expression === 'celebrating'
              ? 'bg-gradient-to-b from-amber-100 to-amber-200 border-amber-400'
              : expression === 'comforting'
              ? 'bg-gradient-to-b from-pink-100 to-pink-200 border-pink-400'
              : 'bg-gradient-to-b from-amber-50 via-white to-sky-100 border-indigo-300'
          }`}
          title="น้องคิดดี้ - เพื่อนร่วมเรียนรู้ (คลิกเพื่อขอคำแนะนำ & ฟังเสียง)"
        >
          {/* Custom Illustrated Vector Mascot Face (Cute Bunny / Fox Buddy) */}
          <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 64 64" fill="none">
            {/* Left Ear */}
            <path
              d="M20 22 C14 10, 16 2, 22 4 C26 5, 26 14, 25 22 Z"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="2"
              className={expression === 'celebrating' ? 'animate-bounce' : ''}
            />
            <path d="M20 18 C17 11, 18 6, 22 7 C23 8, 24 13, 23 18 Z" fill="#F472B6" opacity="0.8" />

            {/* Right Ear */}
            <path
              d="M44 22 C50 10, 48 2, 42 4 C38 5, 38 14, 39 22 Z"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="2"
              className={expression === 'celebrating' ? 'animate-bounce delay-75' : ''}
            />
            <path d="M44 18 C47 11, 46 6, 42 7 C41 8, 40 13, 41 18 Z" fill="#F472B6" opacity="0.8" />

            {/* Head & Cheeks */}
            <ellipse cx="32" cy="36" rx="20" ry="17" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />

            {/* Rosy Cheeks */}
            <ellipse cx="20" cy="40" rx="3.5" ry="2.2" fill="#FDA4AF" opacity="0.85" />
            <ellipse cx="44" cy="40" rx="3.5" ry="2.2" fill="#FDA4AF" opacity="0.85" />

            {/* Eyes */}
            {blinkState ? (
              // Blinking line eyes
              <>
                <path d="M21 34 Q25 37 28 34" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M36 34 Q39 37 43 34" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : expression === 'celebrating' ? (
              // Joyful crescent / star eyes
              <>
                <path d="M21 35 Q25 31 29 35" stroke="#B45309" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M35 35 Q39 31 43 35" stroke="#B45309" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </>
            ) : (
              // Sparkling open eyes
              <>
                <circle cx="25" cy="34" r="3.2" fill="#451A03" />
                <circle cx="26" cy="33" r="1.1" fill="#FFFFFF" />
                <circle cx="39" cy="34" r="3.2" fill="#451A03" />
                <circle cx="40" cy="33" r="1.1" fill="#FFFFFF" />
              </>
            )}

            {/* Cute Little Nose */}
            <polygon points="32,38 30.5,36.5 33.5,36.5" fill="#D97706" />

            {/* Mouth */}
            {mouthOpen || expression === 'celebrating' ? (
              // Open cheerful talking / smiling mouth
              <path d="M28 41 Q32 46 36 41 Q32 43 28 41 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
            ) : expression === 'comforting' ? (
              // Soft warm gentle smile
              <path d="M29 41 Q32 43.5 35 41" stroke="#B45309" strokeWidth="2" strokeLinecap="round" fill="none" />
            ) : (
              // Gentle cheerful smile
              <path d="M28 41 Q32 44.5 36 41" stroke="#451A03" strokeWidth="2" strokeLinecap="round" fill="none" />
            )}

            {/* Little Star Badge on Forehead */}
            <polygon
              points="32,22 33.2,25 36.5,25 33.8,27 34.8,30 32,28.2 29.2,30 30.2,27 27.5,25 30.8,25"
              fill="#F59E0B"
              stroke="#B45309"
              strokeWidth="0.8"
            />
          </svg>

          {/* Sound waves badge when speaking */}
          {isSpeaking && (
            <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-1 shadow-md animate-bounce">
              <Volume2 className="w-3 h-3" />
            </div>
          )}

          {/* Active auto-cycling indicator on mascot avatar */}
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-slate-200">
            <span className={`block w-2.5 h-2.5 rounded-full ${autoCycle ? 'bg-emerald-500' : 'bg-slate-300'}`} />
          </div>

          {/* Unread / Active hint badge when minimized */}
          {!isExpanded && (
            <div className="absolute -top-1 -left-1 bg-indigo-600 text-white rounded-full p-1 shadow-md ring-2 ring-white animate-pulse">
              <Sparkles className="w-3 h-3 text-yellow-300" />
            </div>
          )}
        </div>

        {/* Minimized label pill */}
        {!isExpanded && (
          <div className="mt-1 text-[10px] font-black text-indigo-900 bg-white/95 px-2 py-0.5 rounded-full shadow-md border border-indigo-200 text-center whitespace-nowrap flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>ทิปใหม่</span>
          </div>
        )}
      </div>
    </aside>
  );
};
