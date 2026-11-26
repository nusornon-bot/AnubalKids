export interface AvatarColorOption {
  id: string;
  name: string;
  nameEn: string;
  hex: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  ringClass: string;
  gradientClass: string;
}

export const AVATAR_COLOR_OPTIONS: AvatarColorOption[] = [
  {
    id: 'amber',
    name: 'เหลืองสดใส',
    nameEn: 'Sunny Amber',
    hex: '#FDE68A',
    bgClass: 'bg-amber-100',
    borderClass: 'border-amber-300',
    textClass: 'text-amber-900',
    ringClass: 'ring-amber-400',
    gradientClass: 'from-amber-100 to-yellow-200',
  },
  {
    id: 'sky',
    name: 'ฟ้าสดชื่น',
    nameEn: 'Sky Blue',
    hex: '#BAE6FD',
    bgClass: 'bg-sky-100',
    borderClass: 'border-sky-300',
    textClass: 'text-sky-900',
    ringClass: 'ring-sky-400',
    gradientClass: 'from-sky-100 to-blue-200',
  },
  {
    id: 'emerald',
    name: 'เขียวมิ้นต์',
    nameEn: 'Mint Green',
    hex: '#A7F3D0',
    bgClass: 'bg-emerald-100',
    borderClass: 'border-emerald-300',
    textClass: 'text-emerald-900',
    ringClass: 'ring-emerald-400',
    gradientClass: 'from-emerald-100 to-teal-200',
  },
  {
    id: 'pink',
    name: 'ชมพูหวาน',
    nameEn: 'Candy Pink',
    hex: '#FBCFE8',
    bgClass: 'bg-pink-100',
    borderClass: 'border-pink-300',
    textClass: 'text-pink-900',
    ringClass: 'ring-pink-400',
    gradientClass: 'from-pink-100 to-rose-200',
  },
  {
    id: 'purple',
    name: 'ม่วงพาสเทล',
    nameEn: 'Lavender Purple',
    hex: '#E9D5FF',
    bgClass: 'bg-purple-100',
    borderClass: 'border-purple-300',
    textClass: 'text-purple-900',
    ringClass: 'ring-purple-400',
    gradientClass: 'from-purple-100 to-indigo-200',
  },
  {
    id: 'orange',
    name: 'ส้มพีช',
    nameEn: 'Coral Peach',
    hex: '#FED7AA',
    bgClass: 'bg-orange-100',
    borderClass: 'border-orange-300',
    textClass: 'text-orange-900',
    ringClass: 'ring-orange-400',
    gradientClass: 'from-orange-100 to-amber-200',
  },
  {
    id: 'indigo',
    name: 'น้ำเงินคราม',
    nameEn: 'Ocean Indigo',
    hex: '#C7D2FE',
    bgClass: 'bg-indigo-100',
    borderClass: 'border-indigo-300',
    textClass: 'text-indigo-900',
    ringClass: 'ring-indigo-400',
    gradientClass: 'from-indigo-100 to-violet-200',
  },
  {
    id: 'teal',
    name: 'เขียวเทอร์ควอยซ์',
    nameEn: 'Teal Breeze',
    hex: '#99F6E4',
    bgClass: 'bg-teal-100',
    borderClass: 'border-teal-300',
    textClass: 'text-teal-900',
    ringClass: 'ring-teal-400',
    gradientClass: 'from-teal-100 to-cyan-200',
  },
  {
    id: 'rose',
    name: 'แดงกุหลาบ',
    nameEn: 'Rose Red',
    hex: '#FECDD3',
    bgClass: 'bg-rose-100',
    borderClass: 'border-rose-300',
    textClass: 'text-rose-900',
    ringClass: 'ring-rose-400',
    gradientClass: 'from-rose-100 to-red-200',
  },
  {
    id: 'lime',
    name: 'เขียวมะนาว',
    nameEn: 'Fresh Lime',
    hex: '#D9F99D',
    bgClass: 'bg-lime-100',
    borderClass: 'border-lime-300',
    textClass: 'text-lime-900',
    ringClass: 'ring-lime-400',
    gradientClass: 'from-lime-100 to-green-200',
  },
  {
    id: 'marvel_red',
    name: 'แดงฮีโร่มาร์เวล',
    nameEn: 'Marvel Red',
    hex: '#FCA5A5',
    bgClass: 'bg-red-100',
    borderClass: 'border-red-400',
    textClass: 'text-red-950',
    ringClass: 'ring-red-500',
    gradientClass: 'from-red-100 to-rose-300',
  },
  {
    id: 'disney_gold',
    name: 'ทองเวทมนตร์ดิสนีย์',
    nameEn: 'Disney Magic Gold',
    hex: '#FEF08A',
    bgClass: 'bg-yellow-100',
    borderClass: 'border-yellow-400',
    textClass: 'text-yellow-950',
    ringClass: 'ring-yellow-500',
    gradientClass: 'from-yellow-100 to-amber-300',
  },
];

export interface AvatarIconCategory {
  id: string;
  name: string;
  icon: string;
  items: { emoji: string; name: string }[];
}

export const AVATAR_ICON_CATEGORIES: AvatarIconCategory[] = [
  {
    id: 'animals',
    name: 'สัตว์บกน่ารัก',
    icon: '🐾',
    items: [
      { emoji: '🐰', name: 'กระต่าย' },
      { emoji: '🦒', name: 'ยีราฟ' },
      { emoji: '🐼', name: 'แพนด้า' },
      { emoji: '🐨', name: 'โคอาลา' },
      { emoji: '🦊', name: 'จิ้งจอก' },
      { emoji: '🐶', name: 'ลูกหมา' },
      { emoji: '🐱', name: 'ลูกแมว' },
      { emoji: '🦓', name: 'ม้าลาย' },
      { emoji: '🐻', name: 'หมีน้อย' },
      { emoji: '🐵', name: 'ลิงจ๋อ' },
      { emoji: '🦘', name: 'จิงโจ้' },
      { emoji: '🐹', name: 'แฮมสเตอร์' },
    ],
  },
  {
    id: 'marine_sky',
    name: 'สัตว์น้ำ & นก',
    icon: '🐬',
    items: [
      { emoji: '🐬', name: 'โลมา' },
      { emoji: '🐳', name: 'วาฬ' },
      { emoji: '🐙', name: 'ปลาหมึก' },
      { emoji: '🐢', name: 'เต่าทะเล' },
      { emoji: '🐥', name: 'ลูกเจี๊ยบ' },
      { emoji: '🐧', name: 'เพนกวิน' },
      { emoji: '🦉', name: 'นกฮูก' },
      { emoji: '🦩', name: 'ฟลามิงโก' },
      { emoji: '🦋', name: 'ผีเสื้อ' },
      { emoji: '🐝', name: 'ผึ้งน้อย' },
    ],
  },
  {
    id: 'fantasy_space',
    name: 'แฟนตาซี & อวกาศ',
    icon: '🚀',
    items: [
      { emoji: '🦄', name: 'ยูนิคอร์น' },
      { emoji: '🦖', name: 'ทีเร็กซ์' },
      { emoji: '🦕', name: 'ไดโนเสาร์' },
      { emoji: '🚀', name: 'จรวด' },
      { emoji: '🛸', name: 'จานบิน' },
      { emoji: '👾', name: 'เอเลี่ยนอวกาศ' },
      { emoji: '⭐', name: 'ดาวประกาย' },
      { emoji: '🌟', name: 'ดาวเรืองแสง' },
      { emoji: '🌈', name: 'สายรุ้ง' },
      { emoji: '👑', name: 'มงกุฎ' },
    ],
  },
  {
    id: 'learning_fun',
    name: 'การเรียนรู้ & กิจกรรม',
    icon: '🎨',
    items: [
      { emoji: '🎨', name: 'ศิลปะ' },
      { emoji: '⚽', name: 'ฟุตบอล' },
      { emoji: '🏀', name: 'บาสเกตบอล' },
      { emoji: '🎸', name: 'ดนตรี' },
      { emoji: '🧩', name: 'จิ๊กซอว์' },
      { emoji: '💡', name: 'หลอดไฟไอเดีย' },
      { emoji: '🌻', name: 'ทานตะวัน' },
      { emoji: '🍀', name: 'ใบโคลเวอร์' },
      { emoji: '🍎', name: 'แอปเปิ้ล' },
      { emoji: '🎯', name: 'เป้าหมาย' },
    ],
  },
  {
    id: 'disney',
    name: 'นิทานดิสนีย์',
    icon: '🏰',
    items: [
      { emoji: '👸', name: 'เจ้าหญิงเอลซ่า & สโนว์ไวท์' },
      { emoji: '❄️', name: 'เอลซ่า ราชินีหิมะ' },
      { emoji: '☃️', name: 'โอลาฟ มนุษย์หิมะ' },
      { emoji: '🧜‍♀️', name: 'เงือกน้อยแอเรียล' },
      { emoji: '🧚', name: 'ทิงเกอร์เบลล์ แฟรี่' },
      { emoji: '🧞', name: 'จินนี่ ตะเกียงวิเศษ' },
      { emoji: '🦁', name: 'ซิมบ้า สิงโตเจ้าป่า' },
      { emoji: '🐭', name: 'มิกกี้ เมาส์' },
      { emoji: '🎀', name: 'มินนี่ เมาส์' },
      { emoji: '🦆', name: 'โดนัลด์ ดั๊ก' },
      { emoji: '🍯', name: 'หมีพูห์ & โถน้ำผึ้ง' },
      { emoji: '🐯', name: 'ทิกเกอร์เพื่อนรัก' },
      { emoji: '🦌', name: 'กวางน้อยแบมบี้' },
      { emoji: '🤥', name: 'พิน็อกคิโอ' },
      { emoji: '🌊', name: 'มัวน่า ผจญภัย' },
      { emoji: '🗡️', name: 'มู่หลาน วีรสตรี' },
      { emoji: '🌹', name: 'กุหลาบโฉมงามกับเจ้าชายอสูร' },
      { emoji: '👠', name: 'รองเท้าแก้ว ซินเดอเรลล่า' },
      { emoji: '🪞', name: 'กระจกวิเศษ สโนว์ไวท์' },
      { emoji: '🏰', name: 'ปราสาทเวทมนตร์ดิสนีย์' },
    ],
  },
  {
    id: 'marvel',
    name: 'ฮีโร่มาร์เวล',
    icon: '🦸‍♂️',
    items: [
      { emoji: '🕷️', name: 'สไปเดอร์แมน ไอแมงมุม' },
      { emoji: '🕸️', name: 'ใยแมงมุม สไปเดอร์' },
      { emoji: '🤖', name: 'ไอรอนแมน เกราะอัจฉริยะ' },
      { emoji: '🛡️', name: 'กัปตันอเมริกา โล่วิเศษ' },
      { emoji: '⚡', name: 'ทอร์ เทพเจ้าสายฟ้า' },
      { emoji: '🔨', name: 'ค้อนโยเนียร์ ทอร์' },
      { emoji: '💪', name: 'ฮัลค์ ยักษ์เขียวจอมพลัง' },
      { emoji: '🐆', name: 'แบล็ค แพนเธอร์ วาคานด้า' },
      { emoji: '🔮', name: 'ด็อกเตอร์ สเตรนจ์' },
      { emoji: '🏹', name: 'ฮอว์กอาย นักธนู' },
      { emoji: '🐜', name: 'แอนท์แมน มนุษย์มด' },
      { emoji: '🌱', name: 'เบบี้ กรูท ผู้พิทักษ์' },
      { emoji: '🦝', name: 'ร็อคเก็ต แรคคูน' },
      { emoji: '🦸‍♂️', name: 'อเวนเจอร์ส รวมพลัง' },
      { emoji: '🦸‍♀️', name: 'กัปตัน มาร์เวล' },
      { emoji: '🐺', name: 'วูล์ฟเวอรีน กรงเล็บ' },
      { emoji: '🧤', name: 'อินฟินิตี้ ถุงมือพลัง' },
      { emoji: '💥', name: 'พลังระเบิดซูเปอร์ฮีโร่' },
    ],
  },
];

export const ALL_AVATAR_ICONS: { emoji: string; name: string }[] = (() => {
  const seen = new Set<string>();
  const list: { emoji: string; name: string }[] = [];
  for (const cat of AVATAR_ICON_CATEGORIES) {
    for (const item of cat.items) {
      if (!seen.has(item.emoji)) {
        seen.add(item.emoji);
        list.push(item);
      }
    }
  }
  return list;
})();

export const DISNEY_AVATARS =
  AVATAR_ICON_CATEGORIES.find((c) => c.id === 'disney')?.items || [];

export const MARVEL_AVATARS =
  AVATAR_ICON_CATEGORIES.find((c) => c.id === 'marvel')?.items || [];

export interface DisneyMarvelAvatarItem {
  emoji: string;
  name: string;
  category: 'disney' | 'marvel';
}

export const DISNEY_AND_MARVEL_AVATARS: DisneyMarvelAvatarItem[] = [
  ...DISNEY_AVATARS.map((item) => ({ ...item, category: 'disney' as const })),
  ...MARVEL_AVATARS.map((item) => ({ ...item, category: 'marvel' as const })),
];

export interface AvatarUnlockRequirement {
  minScore?: number;
  badgeId?: string;
  badgeName?: string;
  badgeIcon?: string;
  descriptionTh: string;
}

export interface AvatarUnlockStatus {
  unlocked: boolean;
  requirement?: AvatarUnlockRequirement;
  reasonTh: string;
  progressPercent: number;
  currentScore: number;
  neededScore?: number;
  hasBadge?: boolean;
}

export const AVATAR_UNLOCK_REQUIREMENTS: Record<string, AvatarUnlockRequirement> = {
  // Disney Free Starters
  '🐭': { minScore: 0, descriptionTh: 'ปลดล็อกฟรีสำหรับทุกคน' },
  '🎀': { minScore: 0, descriptionTh: 'ปลดล็อกฟรีสำหรับทุกคน' },
  '🦁': { minScore: 0, descriptionTh: 'ปลดล็อกฟรีสำหรับทุกคน' },
  '🍯': { minScore: 0, descriptionTh: 'ปลดล็อกฟรีสำหรับทุกคน' },

  // Disney Score / Badge Unlocks
  '🦆': { minScore: 50, descriptionTh: 'สะสมคะแนนรวมครบ 50 คะแนน' },
  '🐯': { minScore: 100, descriptionTh: 'สะสมคะแนนรวมครบ 100 คะแนน' },
  '🦌': { minScore: 150, descriptionTh: 'สะสมคะแนนรวมครบ 150 คะแนน' },
  '🤥': { minScore: 200, descriptionTh: 'สะสมคะแนนรวมครบ 200 คะแนน' },
  '👠': { minScore: 300, descriptionTh: 'สะสมคะแนนรวมครบ 300 คะแนน' },
  '🌊': { minScore: 400, descriptionTh: 'สะสมคะแนนรวมครบ 400 คะแนน' },
  '🪞': { minScore: 500, descriptionTh: 'สะสมคะแนนรวมครบ 500 คะแนน' },
  '🏰': { minScore: 800, descriptionTh: 'สะสมคะแนนรวมครบ 800 คะแนน' },

  // Disney Special Badges (or alternative score)
  '☃️': {
    minScore: 200,
    badgeId: 'socio_emotional_star',
    badgeName: 'เพื่อนที่น่ารักอารมณ์ดี',
    badgeIcon: '🤝',
    descriptionTh: 'ได้รับเหรียญ 🤝 "เพื่อนที่น่ารักอารมณ์ดี" หรือสะสม 200 คะแนน',
  },
  '🧚': {
    minScore: 250,
    badgeId: 'magic_finger',
    badgeName: 'เซียนนิ้ววิเศษ',
    badgeIcon: '🖐️',
    descriptionTh: 'ได้รับเหรียญ 🖐️ "เซียนนิ้ววิเศษ" หรือสะสม 250 คะแนน',
  },
  '🧜‍♀️': {
    minScore: 350,
    badgeId: 'creativity_star',
    badgeName: 'จินตนาการสร้างสรรค์ยอดเยี่ยม',
    badgeIcon: '🎨',
    descriptionTh: 'ได้รับเหรียญ 🎨 "จินตนาการสร้างสรรค์" หรือสะสม 350 คะแนน',
  },
  '🌹': {
    minScore: 400,
    badgeId: 'streak_14',
    badgeName: 'นักสู้ตัวจิ๋ว 14 วัน',
    badgeIcon: '⚡',
    descriptionTh: 'ได้รับเหรียญ ⚡ "นักสู้ตัวจิ๋ว 14 วัน" หรือสะสม 400 คะแนน',
  },
  '🧞': {
    minScore: 450,
    badgeId: 'prob_solver',
    badgeName: 'ยอดนักแก้ปัญหาและตัดสินใจ',
    badgeIcon: '💡',
    descriptionTh: 'ได้รับเหรียญ 💡 "ยอดนักแก้ปัญหา" หรือสะสม 450 คะแนน',
  },
  '🗡️': {
    minScore: 500,
    badgeId: 'citizenship_hero',
    badgeName: 'พลเมืองดีมีน้ำใจ',
    badgeIcon: '🇹🇭',
    descriptionTh: 'ได้รับเหรียญ 🇹🇭 "พลเมืองดีมีน้ำใจ" หรือสะสม 500 คะแนน',
  },
  '❄️': {
    minScore: 500,
    badgeId: 'streak_7',
    badgeName: 'ก้าวแรกคนเก่ง 7 วัน',
    badgeIcon: '🌱',
    descriptionTh: 'ได้รับเหรียญ 🌱 "ก้าวแรกคนเก่ง 7 วัน" หรือสะสม 500 คะแนน',
  },
  '👸': {
    minScore: 600,
    badgeId: 'accuracy_100',
    badgeName: 'แม่นยำ 100%',
    badgeIcon: '🎯',
    descriptionTh: 'ได้รับเหรียญ 🎯 "แม่นยำ 100%" หรือสะสม 600 คะแนน',
  },

  // Marvel Free Starters
  '🕷️': { minScore: 0, descriptionTh: 'ปลดล็อกฟรีสำหรับทุกคน' },
  '🕸️': { minScore: 0, descriptionTh: 'ปลดล็อกฟรีสำหรับทุกคน' },
  '🌱': { minScore: 0, descriptionTh: 'ปลดล็อกฟรีสำหรับทุกคน' },
  '💥': { minScore: 0, descriptionTh: 'ปลดล็อกฟรีสำหรับทุกคน' },

  // Marvel Score / Badge Unlocks
  '🏹': { minScore: 50, descriptionTh: 'สะสมคะแนนรวมครบ 50 คะแนน' },
  '🐜': { minScore: 100, descriptionTh: 'สะสมคะแนนรวมครบ 100 คะแนน' },
  '🦝': { minScore: 150, descriptionTh: 'สะสมคะแนนรวมครบ 150 คะแนน' },
  '🐺': { minScore: 250, descriptionTh: 'สะสมคะแนนรวมครบ 250 คะแนน' },
  '🤖': { minScore: 350, descriptionTh: 'สะสมคะแนนรวมครบ 350 คะแนน' },
  '🛡️': { minScore: 500, descriptionTh: 'สะสมคะแนนรวมครบ 500 คะแนน' },
  '🦸‍♂️': { minScore: 750, descriptionTh: 'สะสมคะแนนรวมครบ 750 คะแนน' },
  '🧤': { minScore: 1000, descriptionTh: 'สะสมคะแนนรวมครบ 1,000 คะแนน' },

  // Marvel Special Badges (or alternative score)
  '🔨': {
    minScore: 300,
    badgeId: 'magic_finger',
    badgeName: 'เซียนนิ้ววิเศษ',
    badgeIcon: '🖐️',
    descriptionTh: 'ได้รับเหรียญ 🖐️ "เซียนนิ้ววิเศษ" หรือสะสม 300 คะแนน',
  },
  '💪': {
    minScore: 350,
    badgeId: 'physical_champ',
    badgeName: 'หนูน้อยสุขภาพดีแข็งแรง',
    badgeIcon: '🏃',
    descriptionTh: 'ได้รับเหรียญ 🏃 "สุขภาพดีแข็งแรง" หรือสะสม 350 คะแนน',
  },
  '⚡': {
    minScore: 400,
    badgeId: 'combo_10',
    badgeName: 'ตอบถูก 10 ข้อติดกัน',
    badgeIcon: '⚡',
    descriptionTh: 'ได้รับเหรียญ ⚡ "ตอบถูก 10 ข้อติดกัน" หรือสะสม 400 คะแนน',
  },
  '🐆': {
    minScore: 450,
    badgeId: 'math_ace',
    badgeName: 'นักคิดรวบยอดและคำนวณ',
    badgeIcon: '🧮',
    descriptionTh: 'ได้รับเหรียญ 🧮 "นักคิดคำนวณ" หรือสะสม 450 คะแนน',
  },
  '🔮': {
    minScore: 550,
    badgeId: 'sci_scout',
    badgeName: 'นักแสวงหาความรู้ตัวจริง',
    badgeIcon: '🔬',
    descriptionTh: 'ได้รับเหรียญ 🔬 "นักแสวงหาความรู้" หรือสะสม 550 คะแนน',
  },
  '🦸‍♀️': {
    minScore: 650,
    badgeId: 'accuracy_100',
    badgeName: 'แม่นยำ 100%',
    badgeIcon: '🎯',
    descriptionTh: 'ได้รับเหรียญ 🎯 "แม่นยำ 100%" หรือสะสม 650 คะแนน',
  },
};

export function getAvatarUnlockStatus(
  emoji: string,
  profile?: { totalScore?: number; badges?: string[]; unlockedAvatars?: string[] } | null
): AvatarUnlockStatus {
  const req = AVATAR_UNLOCK_REQUIREMENTS[emoji];
  const currentScore = profile?.totalScore || 0;
  const badges = profile?.badges || [];
  const unlockedAvatars = profile?.unlockedAvatars || [];

  // If explicitly unlocked in profile
  if (unlockedAvatars.includes(emoji)) {
    return {
      unlocked: true,
      requirement: req,
      reasonTh: 'ปลดล็อกพิเศษแล้ว 🎉',
      progressPercent: 100,
      currentScore,
      hasBadge: true,
    };
  }

  // Default: if no requirement specified (general animal avatars, emojis, etc.), it's unlocked!
  if (!req) {
    return {
      unlocked: true,
      reasonTh: 'ปลดล็อกแล้ว',
      progressPercent: 100,
      currentScore,
    };
  }

  // Free starter icons
  if (req.minScore === 0 && !req.badgeId) {
    return {
      unlocked: true,
      requirement: req,
      reasonTh: 'ปลดล็อกฟรีสำหรับทุกคน',
      progressPercent: 100,
      currentScore,
    };
  }

  const hasScore = req.minScore !== undefined && currentScore >= req.minScore;
  const hasBadge = req.badgeId ? badges.includes(req.badgeId) : false;

  const unlocked = hasScore || hasBadge;

  const neededScore = req.minScore ?? 0;
  const progressPercent =
    neededScore > 0 ? Math.min(100, Math.round((currentScore / neededScore) * 100)) : 100;

  let reasonTh = 'ปลดล็อกแล้ว';
  if (!unlocked) {
    if (req.badgeId && req.minScore) {
      reasonTh = `สะสมครบ ${neededScore.toLocaleString()} คะแนน หรือได้รับเหรียญ ${req.badgeIcon || '🏆'} ${req.badgeName}`;
    } else if (req.badgeId) {
      reasonTh = `ต้องได้รับเหรียญ ${req.badgeIcon || '🏆'} ${req.badgeName}`;
    } else {
      reasonTh = `ต้องสะสมคะแนนรวมครบ ${neededScore.toLocaleString()} คะแนน (ขาดอีก ${(neededScore - currentScore).toLocaleString()} คะแนน)`;
    }
  }

  return {
    unlocked,
    requirement: req,
    reasonTh,
    progressPercent,
    currentScore,
    neededScore: req.minScore,
    hasBadge,
  };
}

export function getAvatarColorOption(colorId?: string): AvatarColorOption {
  if (!colorId) return AVATAR_COLOR_OPTIONS[0];
  const found = AVATAR_COLOR_OPTIONS.find((c) => c.id === colorId.toLowerCase());
  return found || AVATAR_COLOR_OPTIONS[0];
}

export function getRandomAvatarPair(): { emoji: string; colorId: string } {
  const randomIcon = ALL_AVATAR_ICONS[Math.floor(Math.random() * ALL_AVATAR_ICONS.length)];
  const randomColor = AVATAR_COLOR_OPTIONS[Math.floor(Math.random() * AVATAR_COLOR_OPTIONS.length)];
  return {
    emoji: randomIcon.emoji,
    colorId: randomColor.id,
  };
}
