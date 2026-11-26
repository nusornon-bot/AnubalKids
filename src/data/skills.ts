import { Language, Subject, SkillCode } from '../types';

export interface SkillDefinition {
  code: SkillCode;
  id: Subject;
  name: Record<Language, string>;
  shortName: Record<Language, string>;
  icon: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  colorClass: string;
  dotColor: string;
  gradient: string;
  description: string;
  skillsFocus: string[];
}

export const SKILLS_LIST: SkillDefinition[] = [
  {
    code: '1',
    id: 'literacy',
    name: {
      th: '1. ภาษาและการรู้หนังสือ',
      en: '1. Language & Literacy',
      zh: '1. 语言与读写能力',
    },
    shortName: { th: 'ภาษาและการรู้หนังสือ', en: 'Literacy', zh: '语言读写' },
    icon: '📖',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    badgeText: 'text-rose-700',
    colorClass: 'text-rose-600',
    dotColor: 'bg-rose-500',
    gradient: 'from-rose-500 to-pink-600',
    description:
      'เด็กสามารถฟังและสนทนาโต้ตอบ เล่าเรื่อง อ่านภาพและสัญลักษณ์ รู้จักตัวอักษร และเขียนเพื่อสื่อความหมายในชีวิตประจำวัน โดยพัฒนาจากการฟังและพูดประโยคง่าย ๆ ไปสู่การสื่อสารและการเขียนที่มีความหมายมากขึ้น',
    skillsFocus: [
      'ฟังและสนทนาโต้ตอบ',
      'เล่าเรื่องจากภาพ',
      'อ่านภาพและสัญลักษณ์รอบตัว',
      'รู้จักตัวพยัญชนะ สระ และเสียงสัมผัส',
      'สื่อความหมายในชีวิตประจำวัน',
    ],
  },
  {
    code: '2',
    id: 'math',
    name: {
      th: '2. การคิดรวบยอดและการคิดคำนวณ',
      en: '2. Conceptual & Math Thinking',
      zh: '2. 概念与数学思维',
    },
    shortName: { th: 'คิดรวบยอดและคำนวณ', en: 'Math Thinking', zh: '概念计算' },
    icon: '🧮',
    badgeBg: 'bg-indigo-50',
    badgeBorder: 'border-indigo-200',
    badgeText: 'text-indigo-700',
    colorClass: 'text-indigo-600',
    dotColor: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-blue-600',
    description:
      'พัฒนาทักษะการสังเกต จับคู่ เปรียบเทียบ จำแนก จัดกลุ่ม เรียงลำดับ สร้างแบบรูป รู้ค่าของจำนวน ใช้ตัวเลข และเข้าใจตำแหน่ง ทิศทาง ระยะทาง รวมถึงสามารถสร้างแผนที่หรือแบบจำลองอย่างง่ายได้',
    skillsFocus: [
      'สังเกต จับคู่ เปรียบเทียบ',
      'จำแนก จัดกลุ่ม และเรียงลำดับ',
      'สร้างแบบรูปและอนุกรม',
      'รู้ค่าของจำนวนและใช้ตัวเลข',
      'เข้าใจตำแหน่ง ทิศทาง ระยะทาง และแผนผัง',
    ],
  },
  {
    code: '3',
    id: 'problem_solving',
    name: {
      th: '3. การคิดแก้ปัญหาและตัดสินใจ',
      en: '3. Problem Solving & Decision',
      zh: '3. 问题解决与决策',
    },
    shortName: { th: 'คิดแก้ปัญหาและตัดสินใจ', en: 'Problem Solving', zh: '解决问题' },
    icon: '💡',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-800',
    colorClass: 'text-amber-600',
    dotColor: 'bg-amber-500',
    gradient: 'from-amber-500 to-orange-500',
    description:
      'เด็กเรียนรู้การระบุปัญหา ทดลองแก้ปัญหา สร้างทางเลือก เลือกวิธีการ และลงมือแก้ปัญหา รวมทั้งเรียนรู้ที่จะตัดสินใจและยอมรับผลที่เกิดจากการตัดสินใจของตนเอง',
    skillsFocus: [
      'ระบุปัญหาที่เกิดขึ้น',
      'ทดลองแก้ปัญหาด้วยตนเอง',
      'สร้างทางเลือกและเลือกวิธีการที่เหมาะสม',
      'ตัดสินใจในสถานการณ์ชีวิตประจำวัน',
      'เรียนรู้และยอมรับผลของการตัดสินใจ',
    ],
  },
  {
    code: '4',
    id: 'inquiry',
    name: {
      th: '4. การแสวงหาความรู้',
      en: '4. Inquiry & Exploration',
      zh: '4. 探索与求知',
    },
    shortName: { th: 'การแสวงหาความรู้', en: 'Inquiry', zh: '探索求知' },
    icon: '🔬',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-700',
    colorClass: 'text-emerald-600',
    dotColor: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-teal-600',
    description:
      'ส่งเสริมให้เด็กมีความกระตือรือร้นในการเรียนรู้ สนใจสิ่งรอบตัว ตั้งคำถาม สังเกต สำรวจ วางแผน เก็บข้อมูล และนำเสนอสิ่งที่ค้นพบ โดยระดับอนุบาล 3 สามารถค้นหาคำตอบด้วยวิธีการที่หลากหลายมากขึ้น',
    skillsFocus: [
      'ตั้งคำถามและสงสัยใคร่รู้',
      'สังเกตและสำรวจสิ่งแวดล้อมรอบตัว',
      'วางแผนและทดลองวิทยาศาสตร์อย่างง่าย',
      'เก็บข้อมูล สังเกตการเปลี่ยนแปลง',
      'นำเสนอและสื่อสารสิ่งที่ค้นพบ',
    ],
  },
  {
    code: '5',
    id: 'creativity',
    name: {
      th: '5. จินตนาการและความคิดสร้างสรรค์',
      en: '5. Imagination & Creativity',
      zh: '5. 想象力与创造力',
    },
    shortName: { th: 'จินตนาการและความคิดสร้างสรรค์', en: 'Creativity', zh: '想象创造' },
    icon: '🎨',
    badgeBg: 'bg-purple-50',
    badgeBorder: 'border-purple-200',
    badgeText: 'text-purple-700',
    colorClass: 'text-purple-600',
    dotColor: 'bg-purple-500',
    gradient: 'from-purple-500 to-pink-500',
    description:
      'เด็กสามารถสร้างผลงานศิลปะและแสดงท่าทางหรือการเคลื่อนไหวเพื่อสื่อสารความคิดและความรู้สึก โดยพัฒนาจากการสร้างสรรค์ผลงานพื้นฐานไปสู่การดัดแปลง สร้างความแปลกใหม่ และเพิ่มรายละเอียดด้วยตนเอง',
    skillsFocus: [
      'สร้างสรรค์ผลงานศิลปะและสีสัน',
      'แสดงท่าทางการเคลื่อนไหวเลียนแบบ',
      'ดัดแปลงวัสดุสิ่งของเครื่องใช้',
      'สร้างความแปลกใหม่จากจินตนาการ',
      'เพิ่มรายละเอียดและความประณีตในผลงาน',
    ],
  },
  {
    code: '6',
    id: 'physical_health',
    name: {
      th: '6. ด้านสุขภาวะทางกาย',
      en: '6. Physical Health & Well-being',
      zh: '6. 身体健康与动作发展',
    },
    shortName: { th: 'สุขภาวะทางกาย', en: 'Physical Health', zh: '身体健康' },
    icon: '🏃',
    badgeBg: 'bg-teal-50',
    badgeBorder: 'border-teal-200',
    badgeText: 'text-teal-700',
    colorClass: 'text-teal-600',
    dotColor: 'bg-teal-500',
    gradient: 'from-teal-500 to-emerald-600',
    description:
      'เด็กควรมีร่างกายแข็งแรง มีสุขอนามัยและสุขนิสัยที่ดี รู้จักดูแลความปลอดภัยของตนเองและผู้อื่น รวมทั้งมีทักษะการเคลื่อนไหวและการประสานสัมพันธ์ระหว่างมือกับตา โดยความสามารถจะพัฒนาจากการทำกิจกรรมพื้นฐานใน อนุบาล 1 ไปสู่การเคลื่อนไหวที่คล่องแคล่วและซับซ้อนขึ้นในอนุบาล 3',
    skillsFocus: [
      'สุขอนามัยและการดูแลร่างกายตนเอง',
      'รับประทานอาหารที่มีประโยชน์และถูกหลักโภชนาการ',
      'ความปลอดภัยในชีวิตประจำวันและของเล่นของใช้',
      'การเคลื่อนไหวร่างกายและการทรงตัว',
      'การประสานสัมพันธ์ระหว่างกล้ามเนื้อมือและสายตา',
    ],
  },
  {
    code: '7',
    id: 'socio_emotional',
    name: {
      th: '7. ด้านอารมณ์ จิตใจ และสังคม',
      en: '7. Socio-Emotional Development',
      zh: '7. 情绪与社会性发展',
    },
    shortName: { th: 'อารมณ์ จิตใจ และสังคม', en: 'Socio-Emotional', zh: '情绪社会' },
    icon: '🤝',
    badgeBg: 'bg-cyan-50',
    badgeBorder: 'border-cyan-200',
    badgeText: 'text-cyan-700',
    colorClass: 'text-cyan-600',
    dotColor: 'bg-cyan-500',
    gradient: 'from-cyan-500 to-blue-500',
    description:
      'มุ่งให้เด็กรู้จักและแสดงออกทางอารมณ์อย่างเหมาะสม สามารถกำกับตนเอง มีความสัมพันธ์ที่ดีกับผู้อื่น เห็นอกเห็นใจ รับผิดชอบต่อการตัดสินใจ มีความสุขกับศิลปะ ดนตรี และการเคลื่อนไหว รวมถึงช่วยเหลือตนเองในชีวิตประจำวันและยอมรับความแตกต่างระหว่างบุคคล',
    skillsFocus: [
      'การรู้เท่าทันและควบคุมอารมณ์ตนเอง',
      'การวางแผน มุ่งมั่น และทำงานจนสำเร็จ',
      'การทำงานร่วมกับผู้อื่น แบ่งปัน และเข้าแถวรอคอย',
      'การแสดงความเห็นอกเห็นใจและมีน้ำใจ',
      'ความรับผิดชอบและการช่วยเหลือตนเองในชีวิตประจำวัน',
    ],
  },
  {
    code: '8',
    id: 'citizenship',
    name: {
      th: '8. ด้านความเป็นพลเมืองและความเป็นไทย',
      en: '8. Citizenship & Thai Culture',
      zh: '8. 公民素养与泰国文化',
    },
    shortName: { th: 'ความเป็นพลเมืองและความเป็นไทย', en: 'Citizenship & Culture', zh: '公民文化' },
    icon: '🇹🇭',
    badgeBg: 'bg-orange-50',
    badgeBorder: 'border-orange-200',
    badgeText: 'text-orange-800',
    colorClass: 'text-orange-600',
    dotColor: 'bg-orange-500',
    gradient: 'from-orange-500 to-amber-600',
    description:
      'เน้นให้เด็กมีคุณธรรม จริยธรรม มีจิตใจที่ดี มีมารยาทไทย รู้จักวัฒนธรรมและประเพณีไทย รักและภูมิใจในความเป็นไทย ใช้ชีวิตอย่างประหยัดและพอเพียง ดูแลธรรมชาติและสิ่งแวดล้อม มีวินัย และเป็นสมาชิกที่ดีของสังคม',
    skillsFocus: [
      'มารยาทไทย การไหว้ ทักทาย และการพูดจาสุภาพ',
      'ประเพณี วัฒนธรรม และสัญลักษณ์ความเป็นไทย',
      'คุณธรรม ความซื่อสัตย์ ความกตัญญู และมีวินัย',
      'การใช้ชีวิตอย่างประหยัด พอเพียง และรู้คุณค่าทรัพยากร',
      'การดูแลธรรมชาติ รักษาสิ่งแวดล้อม และเป็นพลเมืองที่ดี',
    ],
  },
];

// สมรรถนะและพัฒนาการ 5 ด้านหลักของการศึกษาปฐมวัย
export const CORE_5_SKILL_IDS: Subject[] = [
  'literacy',
  'math',
  'problem_solving',
  'inquiry',
  'creativity',
];

export const THAI_SKILL_DEFINITION: SkillDefinition = {
  code: '1',
  id: 'thai',
  name: {
    th: 'ภาษาไทยปฐมวัย (Thai Language Mastery)',
    en: 'Thai Early Literacy (Alphabet & Vowels)',
    zh: '泰语启蒙 (辅音与元音)',
  },
  shortName: { th: 'ภาษาไทย', en: 'Thai', zh: '泰语' },
  icon: '🇹🇭',
  badgeBg: 'bg-rose-50',
  badgeBorder: 'border-rose-200',
  badgeText: 'text-rose-700',
  colorClass: 'text-rose-600',
  dotColor: 'bg-rose-500',
  gradient: 'from-rose-500 to-pink-600',
  description:
    'ส่งเสริมทักษะพยัญชนะไทย 44 ตัว (ก-ฮ), สระเสียงสั้นและเสียงยาว, รูปและเสียงวรรณยุกต์, คำประสมและคำคล้องจอง, เพื่อสร้างรากฐานการอ่านออกเขียนได้',
  skillsFocus: [
    'พยัญชนะไทย 44 ตัว และภาพสัญลักษณ์',
    'สระพื้นฐาน (อะ อา อิ อี อุ อู)',
    'เสียงวรรณยุกต์และคำตรงข้าม',
    'คำคล้องจองและสัมผัสสระ',
    'การประสมคำง่ายๆ ในชีวิตประจำวัน',
  ],
};

export const ENGLISH_SKILL_DEFINITION: SkillDefinition = {
  code: '1',
  id: 'english',
  name: {
    th: 'ภาษาอังกฤษวัยซน (English for Kids)',
    en: 'English for Kids (Phonics & Vocab)',
    zh: '幼儿英语 (自然拼读与词汇)',
  },
  shortName: { th: 'ภาษาอังกฤษ', en: 'English', zh: '英语' },
  icon: '🔤',
  badgeBg: 'bg-sky-50',
  badgeBorder: 'border-sky-200',
  badgeText: 'text-sky-700',
  colorClass: 'text-sky-600',
  dotColor: 'bg-sky-500',
  gradient: 'from-sky-500 to-blue-600',
  description:
    'ฝึกฝนตัวอักษรภาษาอังกฤษ A-Z (ตัวพิมพ์ใหญ่และตัวพิมพ์เล็ก), เสียงโฟนิกส์ (Initial Phonics), คำศัพท์พื้นฐานรอบตัว (Sight Words: สี สัตว์ ผลไม้ อวัยวะ), และประโยคทักทายง่ายๆ',
  skillsFocus: [
    'ตัวอักษร A-Z พิมพ์ใหญ่และพิมพ์เล็ก',
    'เสียงโฟนิกส์เบื้องต้น (Initial Phonics)',
    'คำศัพท์ Sight Words สัตว์ สี และสิ่งของ',
    'การนับจำนวนและตัวเลขภาษาอังกฤษ',
    'การทักทายและสื่อสารภาษาอังกฤษเบื้องต้น',
  ],
};

export interface TrioPillar {
  id: 'thai' | 'english' | 'math';
  subject: Subject;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  icon: string;
  accentGradient: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  topics: string[];
}

export const TRIO_PILLARS: TrioPillar[] = [
  {
    id: 'thai',
    subject: 'thai',
    title: { th: 'ภาษาไทย', en: 'Thai Language', zh: '泰语' },
    subtitle: { th: 'พยัญชนะ สระ วรรณยุกต์ คำคล้องจอง', en: 'Alphabet, Vowels & Words', zh: '字母元音与拼读' },
    icon: '🇹🇭',
    accentGradient: 'from-rose-500 via-pink-500 to-red-500',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    badgeText: 'text-rose-700',
    topics: ['ก-ฮ พยัญชนะ 44 ตัว', 'สระ อะ-อา-อิ-อี-อุ-อู', 'คำประสม & คำคล้องจอง', 'ความหมายคำศัพท์'],
  },
  {
    id: 'english',
    subject: 'english',
    title: { th: 'ภาษาอังกฤษ', en: 'English Fun', zh: '英语启蒙' },
    subtitle: { th: 'Alphabet A-Z, Phonics & Sight Words', en: 'Alphabet, Phonics & Sight Words', zh: '字母、自然拼读与常用词' },
    icon: '🔤',
    accentGradient: 'from-sky-500 via-blue-500 to-indigo-500',
    badgeBg: 'bg-sky-50',
    badgeBorder: 'border-sky-200',
    badgeText: 'text-sky-700',
    topics: ['Alphabet A to Z', 'Initial Phonics Sounds', 'Sight Words & Vocab', 'Daily Greetings'],
  },
  {
    id: 'math',
    subject: 'math',
    title: { th: 'คณิตศาสตร์', en: 'Smart Math', zh: '趣味数学' },
    subtitle: { th: 'นับจำนวน 1-20 รูปทรง การบวก-ลบ', en: 'Counting, Shapes & Operations', zh: '数数、几何图形与加减法' },
    icon: '🧮',
    accentGradient: 'from-amber-500 via-orange-500 to-yellow-500',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-800',
    topics: ['นับจำนวน 1-20', 'เปรียบเทียบ มากกว่า-น้อยกว่า', 'รูปทรง & แบบรูปอนุกรม', 'การบวก-ลบภาพเบื้องต้น'],
  },
];

// =========================================================================
// หลักสูตรสถานศึกษาฐานสมรรถนะ (Competency-Based Education: CBE Primary P1-P3)
// 6 สมรรถนะหลักสำหรับระดับชั้นประถมศึกษาปีที่ 1, 2 และ 3
// =========================================================================
export const CBE_COMPETENCIES_LIST: SkillDefinition[] = [
  {
    code: 'CBE1',
    id: 'self_management',
    name: {
      th: '1. การจัดการตนเอง',
      en: '1. Self-Management',
      zh: '1. 自我管理',
    },
    shortName: { th: 'การจัดการตนเอง', en: 'Self-Management', zh: '自我管理' },
    icon: '🎯',
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-blue-200',
    badgeText: 'text-blue-700',
    colorClass: 'text-blue-600',
    dotColor: 'bg-blue-500',
    gradient: 'from-blue-500 to-indigo-600',
    description:
      'ความสามารถในการรู้จักตนเอง เห็นคุณค่าในตนเอง ตั้งเป้าหมาย จัดการอารมณ์และความเครียด มีสุขภาวะที่ดี นำตนเองและกำกับตนเองในการเรียนรู้และดำเนินชีวิตอย่างมีทิศทาง',
    skillsFocus: [
      'รู้จักตนเอง เห็นคุณค่าและจุดเด่นของตนเอง',
      'การรู้เท่าทันและจัดการอารมณ์ ความเครียด',
      'การตั้งเป้าหมายและการวางแผนชีวิตประจำวัน',
      'สุขภาวะและการดูแลสุขภาพกายและใจ',
      'การนำตนเอง ความรับผิดชอบ และการกำกับตนเอง',
    ],
  },
  {
    code: 'CBE2',
    id: 'higher_order_thinking',
    name: {
      th: '2. การคิดขั้นสูง',
      en: '2. Higher-Order Thinking',
      zh: '2. 高阶思维',
    },
    shortName: { th: 'การคิดขั้นสูง', en: 'Higher Thinking', zh: '高阶思维' },
    icon: '🧠',
    badgeBg: 'bg-violet-50',
    badgeBorder: 'border-violet-200',
    badgeText: 'text-violet-700',
    colorClass: 'text-violet-600',
    dotColor: 'bg-violet-500',
    gradient: 'from-violet-500 to-purple-600',
    description:
      'ความสามารถในการคิดวิเคราะห์ คิดวิพากษ์ คิดสร้างสรรค์ และคิดแก้ปัญหาอย่างเป็นระบบ สามารถตัดสินใจบนฐานของข้อมูลและเหตุผลที่ถูกต้องรอบด้าน',
    skillsFocus: [
      'การคิดวิเคราะห์ จำแนกแยกแยะ และหาความสัมพันธ์',
      'การคิดวิพากษ์ ตรวจสอบข้อเท็จจริง และใช้เหตุผล',
      'การคิดสร้างสรรค์ จินตนาการ และสร้างสิ่งใหม่',
      'การแก้ปัญหาอย่างเป็นระบบตามกระบวนการ',
      'การตัดสินใจบนฐานข้อมูลและหลักฐานเชิงประจักษ์',
    ],
  },
  {
    code: 'CBE3',
    id: 'communication',
    name: {
      th: '3. การสื่อสาร',
      en: '3. Communication',
      zh: '3. 沟通表达',
    },
    shortName: { th: 'การสื่อสาร', en: 'Communication', zh: '沟通表达' },
    icon: '💬',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-700',
    colorClass: 'text-emerald-600',
    dotColor: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-teal-600',
    description:
      'ความสามารถในการรับสารและส่งสารด้วยภาษาและสัญลักษณ์ที่หลากหลาย เข้าใจสารอย่างลึกซึ้ง แสดงออกทางความคิด ความรู้สึก และเจตนาได้อย่างมีประสิทธิภาพ สุภาพ และสร้างสรรค์',
    skillsFocus: [
      'การรับสารอย่างตั้งใจ ฟัง ดู อ่าน อย่างเข้าใจความหมาย',
      'การถ่ายทอดความคิด ความรู้สึก และเจตนาอย่างชัดเจน',
      'การเลือกใช้ภาษา ถ้อยคำ และกิริยาท่าทางที่เหมาะสมกับกาลเทศะ',
      'การสื่อสารอย่างเห็นอกเห็นใจและเปิดรับฟังผู้อื่น',
      'การสื่อสารผ่านสื่อและเทคโนโลยีดิจิทัลอย่างสร้างสรรค์',
    ],
  },
  {
    code: 'CBE4',
    id: 'teamwork_collaboration',
    name: {
      th: '4. การรวมพลังทำงานเป็นทีม',
      en: '4. Teamwork & Collaboration',
      zh: '4. 团队协作',
    },
    shortName: { th: 'รวมพลังทำงานเป็นทีม', en: 'Teamwork', zh: '团队协作' },
    icon: '🤝',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-800',
    colorClass: 'text-amber-600',
    dotColor: 'bg-amber-500',
    gradient: 'from-amber-500 to-orange-500',
    description:
      'ความสามารถในการเป็นสมาชิกที่ดีของทีม การเป็นผู้นำและผู้ตาม การทำงานร่วมกับผู้อื่นที่มีความหลากหลาย รับฟังและแลกเปลี่ยนอย่างสร้างสรรค์ แก้ปัญหาความขัดแย้ง และร่วมมือกันให้บรรลุเป้าหมาย',
    skillsFocus: [
      'การสร้างความสัมพันธ์เชิงบวกและความไว้วางใจในทีม',
      'บทบาทผู้นำและผู้ตามที่ยืดหยุ่นตามสถานการณ์',
      'การแบ่งงาน ประสานงาน และรับผิดชอบหน้าที่ร่วมกัน',
      'การจัดการความขัดแย้งด้วยการเจรจาและสันติวิธี',
      'การรวมพลังระดมความคิดเพื่อบรรลุเป้าหมายของทีม',
    ],
  },
  {
    code: 'CBE5',
    id: 'active_citizenship',
    name: {
      th: '5. การเป็นพลเมืองที่เข้มแข็ง',
      en: '5. Active Citizenship',
      zh: '5. 积极公民',
    },
    shortName: { th: 'พลเมืองที่เข้มแข็ง', en: 'Active Citizen', zh: '积极公民' },
    icon: '🏛️',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    badgeText: 'text-rose-700',
    colorClass: 'text-rose-600',
    dotColor: 'bg-rose-500',
    gradient: 'from-rose-500 to-red-600',
    description:
      'ความภาคภูมิใจในความเป็นไทย ความเป็นพลเมืองโลก มีจิตสาธารณะ เคารพสิทธิ เสรีภาพ กฎหมาย และวิถีประชาธิปไตย มีส่วนร่วมในการแก้ปัญหาและพัฒนาชุมชน สังคม และประเทศชาติ',
    skillsFocus: [
      'ความรักชาติ ศาสนา พระมหากษัตริย์ และภูมิปัญญาไทย',
      'การเคารพสิทธิ เสรีภาพ และความเสมอภาคของทุกคน',
      'การปฏิบัติตามกฎกติกา กฎหมาย และวิถีประชาธิปไตย',
      'จิตสาธารณะ การเสียสละ และมีส่วนร่วมพัฒนาชุมชน',
      'ความรับผิดชอบในฐานะพลเมืองโลก (Global Citizenship)',
    ],
  },
  {
    code: 'CBE6',
    id: 'sustainable_living',
    name: {
      th: '6. การอยู่ร่วมกับธรรมชาติและวิทยาการอย่างยั่งยืน',
      en: '6. Sustainable Living with Nature & Tech',
      zh: '6. 与自然和科技和谐共生',
    },
    shortName: { th: 'อยู่ร่วมกับธรรมชาติและวิทยาการ', en: 'Sustainable Living', zh: '自然与科技共生' },
    icon: '🌿',
    badgeBg: 'bg-teal-50',
    badgeBorder: 'border-teal-200',
    badgeText: 'text-teal-700',
    colorClass: 'text-teal-600',
    dotColor: 'bg-teal-500',
    gradient: 'from-teal-500 to-emerald-600',
    description:
      'ความเข้าใจความสัมพันธ์ระหว่างมนุษย์ ธรรมชาติ สิ่งแวดล้อม และเทคโนโลยี ใช้เทคโนโลยีและวิทยาการอย่างรู้เท่าทัน ปลอดภัย และมีจริยธรรม อนุรักษ์ทรัพยากรธรรมชาติและร่วมสร้างวิถีชีวิตที่ยั่งยืน',
    skillsFocus: [
      'ความเข้าใจระบบนิเวศ ความหลากหลายทางชีวภาพ และสิ่งแวดล้อม',
      'การอนุรักษ์ทรัพยากร ลดขยะ และประหยัดพลังงาน',
      'การรู้เท่าทันสื่อ เทคโนโลยีสารสนเทศ และความปลอดภัยไซเบอร์',
      'การใช้เทคโนโลยีและ AI อย่างมีจริยธรรมและเกิดประโยชน์',
      'การสร้างสรรค์นวัตกรรมสีเขียวและวิถีชีวิตที่ยั่งยืน',
    ],
  },
];

export const CBE_COMPETENCY_IDS: Subject[] = [
  'self_management',
  'higher_order_thinking',
  'communication',
  'teamwork_collaboration',
  'active_citizenship',
  'sustainable_living',
];

// =========================================================================
// หลักสูตรที่ ๓: คู่มือการสอนอ่านเขียน โดยการแจกลูกสะกดคำ (สพฐ. ๑๐ หน่วยการเรียนรู้)
// =========================================================================
export const THAI_PHONICS_UNITS_LIST: SkillDefinition[] = [
  {
    code: 'TP1',
    id: 'phonics_consonant',
    name: {
      th: 'หน่วยที่ ๑: รูปและเสียงพยัญชนะ',
      en: 'Unit 1: Thai Consonants & Sounds',
      zh: '第1单元：辅音字母与发音',
    },
    shortName: { th: 'รูปและเสียงพยัญชนะ', en: 'Consonants', zh: '辅音字母' },
    icon: '🔤',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-800',
    colorClass: 'text-amber-600',
    dotColor: 'bg-amber-500',
    gradient: 'from-amber-500 to-yellow-600',
    description:
      'เรียนรู้รูปและเสียงพยัญชนะไทย ๔๔ ตัว, ไตรยางศ์อักษร ๓ หมู่ (อักษรกลาง ๙ ตัว ก จ ด ต บ ป อ ฎ ฏ, อักษรสูง ๑๑ ตัว ข ฃ ฉ ฐ ถ ผ ฝ ศ ษ ส ห, อักษรต่ำ ๒๔ ตัว), และการเขียนเส้นพื้นฐาน ๑๓ เส้นตามคู่มือ สพฐ.',
    skillsFocus: [
      'พยัญชนะไทย ๔๔ ตัวและการออกเสียง',
      'อักษรกลาง ๙ ตัว (ไก่จิกเด็กตายเด็กตายบนปากโอ่ง)',
      'อักษรสูง ๑๑ ตัว (ผีฝากถุงข้าวสารให้ฉัน)',
      'อักษรต่ำ ๒๔ ตัว (ต่ำเดี่ยว ๑๐ ต่ำคู่ ๑๔)',
      'การลากเส้นพื้นฐาน ๑๓ เส้นและการเขียนพยัญชนะ',
    ],
  },
  {
    code: 'TP2',
    id: 'phonics_vowel',
    name: {
      th: 'หน่วยที่ ๒: รูปและเสียงสระ',
      en: 'Unit 2: Thai Vowels & Sounds',
      zh: '第2单元：元音字母与发音',
    },
    shortName: { th: 'รูปและเสียงสระ', en: 'Vowels', zh: '元音字母' },
    icon: '🅰️',
    badgeBg: 'bg-sky-50',
    badgeBorder: 'border-sky-200',
    badgeText: 'text-sky-800',
    colorClass: 'text-sky-600',
    dotColor: 'bg-sky-500',
    gradient: 'from-sky-500 to-blue-600',
    description:
      'เรียนรู้รูปและเสียงสระเดี่ยว ๑๘ เสียง, สระประสม ๖ เสียง, สระเกิน ๔ เสียง, สระเสียงสั้น (รัสสระ) และสระเสียงยาว (ทีฆสระ) ตำแหน่งของรูปสระ และสระลดรูป-สระเปลี่ยนรูป',
    skillsFocus: [
      'สระเดี่ยว ๑๘ เสียงและตำแหน่งรูปสระ',
      'สระประสม ๖ เสียง (เอียะ เอีย เอือะ เอือ อัวะ อัว)',
      'สระเสียงสั้นและสระเสียงยาว',
      'สระลดรูป (สระโอะ สระอัว สระออ)',
      'สระเปลี่ยนรูป (สระอะเป็นไม้หันอากาศ, สระเอะ สระแอะ)',
    ],
  },
  {
    code: 'TP3',
    id: 'phonics_tone',
    name: {
      th: 'หน่วยที่ ๓: รูปและเสียงวรรณยุกต์',
      en: 'Unit 3: Thai Tones & Marks',
      zh: '第3单元：声调与声调符号',
    },
    shortName: { th: 'รูปและเสียงวรรณยุกต์', en: 'Tones', zh: '声调与调号' },
    icon: '🎵',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    badgeText: 'text-rose-800',
    colorClass: 'text-rose-600',
    dotColor: 'bg-rose-500',
    gradient: 'from-rose-500 to-pink-600',
    description:
      'เรียนรู้รูปวรรณยุกต์ ๔ รูป (ไม้เอก ่, ไม้โท ้, ไม้ตรี ๊, ไม้จัตวา ๋) และเสียงวรรณยุกต์ ๕ เสียง (สามัญ เอก โท ตรี จัตวา) การวางรูปวรรณยุกต์ และความหมายคำที่เปลี่ยนไปตามระดับเสียง',
    skillsFocus: [
      '๔ รูปวรรณยุกต์ (เอก โท ตรี จัตวา)',
      '๕ เสียงวรรณยุกต์ (สามัญ เอก โท ตรี จัตวา)',
      'เสียงสามัญไม่มีรูปวรรณยุกต์',
      'ตำแหน่งการวางรูปวรรณยุกต์บนพยัญชนะต้น',
      'ความหมายคำที่เปลี่ยนตามระดับเสียงวรรณยุกต์',
    ],
  },
  {
    code: 'TP4',
    id: 'phonics_korkaa',
    name: {
      th: 'หน่วยที่ ๔: การแจกลูกสะกดคำในแม่ ก กา',
      en: 'Unit 4: Phonics Word Family in Mae Kor Kaa',
      zh: '第4单元：开音节无尾音拼读 (Mae Kor Kaa)',
    },
    shortName: { th: 'แจกลูกแม่ ก กา', en: 'Mae Kor Kaa', zh: '母音拼读' },
    icon: '📖',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-800',
    colorClass: 'text-emerald-600',
    dotColor: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-teal-600',
    description:
      'ฝึกประสมคำในแม่ ก กา (ไม่มีตัวสะกด) ทั้งแบบยึดพยัญชนะเป็นหลัก (กา กิ กุ เก โก) และแบบยึดสระเป็นหลัก (กา ขา คา งา ตา) เพื่อสร้างฐานการออกเสียงสะกดคำอย่างเป็นระบบ',
    skillsFocus: [
      'การแจกลูกโดยยึดสระเป็นหลัก',
      'การแจกลูกโดยยึดพยัญชนะเป็นหลัก',
      'การสะกดคำและอ่านแจกลูกทีละหน่วยเสียง',
      'คำที่มีความหมายในแม่ ก กา (ตา, มา, ปู, กา, ยา)',
      'การอ่านประโยคง่ายที่ประกอบด้วยคำแม่ ก กา',
    ],
  },
  {
    code: 'TP5',
    id: 'phonics_tone_korkaa',
    name: {
      th: 'หน่วยที่ ๕: การผันวรรณยุกต์คำในแม่ ก กา',
      en: 'Unit 5: Tone Inflection in Mae Kor Kaa',
      zh: '第5单元：开音节声调拼读',
    },
    shortName: { th: 'ผันวรรณยุกต์แม่ ก กา', en: 'Tone Mae Kor Kaa', zh: '开音节调号' },
    icon: '🎼',
    badgeBg: 'bg-indigo-50',
    badgeBorder: 'border-indigo-200',
    badgeText: 'text-indigo-800',
    colorClass: 'text-indigo-600',
    dotColor: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-purple-600',
    description:
      'ฝึกผันวรรณยุกต์คำในแม่ ก กา ตามอักษร ๓ หมู่: อักษรกลางผันได้ ๕ เสียงครบรูป, อักษรสูงผันได้ ๓ เสียง (เอก โท จัตวา), อักษรต่ำผันได้ ๓ เสียง (สามัญ โท ตรี) และคำตายสระเสียงสั้น',
    skillsFocus: [
      'ผันอักษรกลาง ๕ เสียง (ปา ป่า ป้า ป๊า ป๋า)',
      'ผันอักษรสูง ๓ เสียง (ผา ผ่า ผ้า)',
      'ผันอักษรต่ำ ๓ เสียง (มา ม่า ม้า)',
      'รูปและเสียงวรรณยุกต์ที่ไม่ตรงกันในอักษรต่ำ',
      'การผันคำเป็นและคำตายในแม่ ก กา',
    ],
  },
  {
    code: 'TP6',
    id: 'phonics_direct_spelling',
    name: {
      th: 'หน่วยที่ ๖: การแจกลูกสะกดคำตรงตามมาตรา',
      en: 'Unit 6: Direct Spelling Finals (8 Matra)',
      zh: '第6单元：规则尾音拼读 (8大尾音)',
    },
    shortName: { th: 'ตัวสะกดตรงมาตรา', en: 'Direct Finals', zh: '规则尾音' },
    icon: '🎯',
    badgeBg: 'bg-teal-50',
    badgeBorder: 'border-teal-200',
    badgeText: 'text-teal-800',
    colorClass: 'text-teal-600',
    dotColor: 'bg-teal-500',
    gradient: 'from-teal-500 to-emerald-600',
    description:
      'เรียนรู้การแจกลูกสะกดคำที่มีตัวสะกดตรงตามมาตราทั้ง ๘ มาตรา: แม่กง (ง), แม่กน (น), แม่กม (ม), แม่เกย (ย), แม่เกอว (ว), แม่กก (ก), แม่กด (ด), และแม่กบ (บ) พร้อมฝึกสระลดรูปและเปลี่ยนรูป',
    skillsFocus: [
      'ตัวสะกดตรงมาตราทั้ง ๘ แม่',
      'แม่กง (กาง, ยุง, ช้าง) แม่กน (บ้าน, กิน, นอน)',
      'แม่กม (ลม, แก้ม) แม่เกย (กล้วย, ยาย) แม่เกอว (ดาว, ข้าว)',
      'แม่กก แม่กด แม่กบ ตัวสะกดตรงมาตรา',
      'สระเปลี่ยนรูปเมื่อมีตัวสะกด (วัน, เด็ก, เก็บ)',
    ],
  },
  {
    code: 'TP7',
    id: 'phonics_tone_spelling',
    name: {
      th: 'หน่วยที่ ๗: การผันวรรณยุกต์คำตรงตามมาตรา',
      en: 'Unit 7: Tone Inflection with Final Consonants',
      zh: '第7单元：尾音词声调拼读',
    },
    shortName: { th: 'ผันคำตรงมาตรา', en: 'Tone with Finals', zh: '带尾音变调' },
    icon: '📊',
    badgeBg: 'bg-violet-50',
    badgeBorder: 'border-violet-200',
    badgeText: 'text-violet-800',
    colorClass: 'text-violet-600',
    dotColor: 'bg-violet-500',
    gradient: 'from-violet-500 to-purple-700',
    description:
      'ผันวรรณยุกต์คำที่มีตัวสะกดตรงตามมาตรา โดยจำแนกคำเป็น (แม่กง กน กม เกย เกอว) และคำตาย (แม่กก กด กบ) สระสั้น-ยาว ร่วมกับไตรยางศ์อักษร ๓ หมู่',
    skillsFocus: [
      'คำเป็น (สะกดด้วย ง น ม ย ว) ผันวรรณยุกต์ได้ครบ',
      'คำตาย (สะกดด้วย ก ด บ) พื้นเสียงวรรณยุกต์เอก/ตรี',
      'การผันอักษรกลางมีตัวสะกดครบ ๕ เสียง (บาง บ่าง บ้าง บ๊าง บ๋าง)',
      'การผันอักษรสูงและอักษรต่ำมีตัวสะกด',
      'การจับคู่อักษรสูงกับอักษรต่ำคู่เพื่อผันให้ครบ ๕ เสียง',
    ],
  },
  {
    code: 'TP8',
    id: 'phonics_indirect_spelling',
    name: {
      th: 'หน่วยที่ ๘: การแจกลูกสะกดคำไม่ตรงตามมาตรา',
      en: 'Unit 8: Indirect Spelling Finals',
      zh: '第8单元：不规则尾音拼读',
    },
    shortName: { th: 'ตัวสะกดไม่ตรงมาตรา', en: 'Indirect Finals', zh: '非规则尾音' },
    icon: '🔍',
    badgeBg: 'bg-cyan-50',
    badgeBorder: 'border-cyan-200',
    badgeText: 'text-cyan-800',
    colorClass: 'text-cyan-600',
    dotColor: 'bg-cyan-500',
    gradient: 'from-cyan-500 to-blue-600',
    description:
      'เรียนรู้คำที่มีตัวสะกดไม่ตรงตามมาตรา: แม่กก (ข ค ฆ), แม่กด (จ ช ซ ฎ ฏ ฐ ฑ ฒ ต ถ ท ธ ศ ษ ส), แม่กบ (ป พ ฟ ภ), และแม่กน (ญ ณ ร ล ฬ) พร้อมเทคนิคการเทียบเสียงกับมาตราตัวสะกดแท้',
    skillsFocus: [
      'แม่กก ไม่ตรงมาตรา (เลข, สุนัข, เมฆ, วิหค)',
      'แม่กด ไม่ตรงมาตรา (ตรวจ, ก๊าซ, ปรากฏ, ตำรวจ, รถ, โกรธ, อากาศ)',
      'แม่กบ ไม่ตรงมาตรา (ธูป, ภาพ, ลาภ, กราฟ, ยีราฟ)',
      'แม่กน ไม่ตรงมาตรา (กุญแจ, วาฬ, บอล, ขอบคุณ, กาล)',
      'การเขียนคำให้ถูกต้องตามรูปและความหมาย',
    ],
  },
  {
    code: 'TP9',
    id: 'phonics_cluster',
    name: {
      th: 'หน่วยที่ ๙: การแจกลูกสะกดคำที่มีอักษรควบ',
      en: 'Unit 9: Consonant Clusters (True & False)',
      zh: '第9单元：辅音丛/复辅音拼读',
    },
    shortName: { th: 'คำที่มีอักษรควบ', en: 'Clusters', zh: '复辅音' },
    icon: '👥',
    badgeBg: 'bg-fuchsia-50',
    badgeBorder: 'border-fuchsia-200',
    badgeText: 'text-fuchsia-800',
    colorClass: 'text-fuchsia-600',
    dotColor: 'bg-fuchsia-500',
    gradient: 'from-fuchsia-500 to-pink-600',
    description:
      'เรียนรู้การแจกลูกสะกดคำที่มีอักษรควบแท้ (พยัญชนะควบ ร ล ว เช่น กวาด, คลอง, กรอง, แปลง) และอักษรควบไม่แท้ (จ ซ ศ ส ควบ ร ออกเสียงเฉพาะตัวหน้า และ ทร ออกเสียงเป็น ซ)',
    skillsFocus: [
      'อักษรควบแท้ ร ล ว ออกเสียงกล้ำพร้อมกัน',
      'คำควบแท้ที่พบบ่อย (กราบ, กลอง, กวาด, พริก, คลอง)',
      'อักษรควบไม่แท้ (จริง, สร้อย, สร้าง, ศรัทธา)',
      'ทร ออกเสียงเป็น ซ (ทราย, ทราบ, ทรุดโทรม, พุทรา)',
      'การสะกดคำและอ่านออกเสียงอักษรควบอย่างถูกต้อง',
    ],
  },
  {
    code: 'TP10',
    id: 'phonics_leading_consonant',
    name: {
      th: 'หน่วยที่ ๑๐: การแจกลูกสะกดคำที่มีอักษรนำ',
      en: 'Unit 10: Leading Consonants (Ho Nam & Or Nam)',
      zh: '第10单元：前导字母拼读 (Ho Nam & Or Nam)',
    },
    shortName: { th: 'คำที่มีอักษรนำ', en: 'Leading Consonants', zh: '前导辅音' },
    icon: '👑',
    badgeBg: 'bg-orange-50',
    badgeBorder: 'border-orange-200',
    badgeText: 'text-orange-800',
    colorClass: 'text-orange-600',
    dotColor: 'bg-orange-500',
    gradient: 'from-orange-500 to-amber-600',
    description:
      'เรียนรู้การแจกลูกสะกดคำที่มีอักษรนำ: อ นำ ย (อย่า อยู่ อย่าง อยาก ๔ คำ), ห นำ อักษรต่ำเดี่ยว ๘ ตัว (ง ญ น ย ร ล ว ม), อักษรสูงนำ และอักษรกลางนำที่ออกเสียง ๒ พยางค์ พยางค์หลังออกเสียงตามวรรณยุกต์ตัวนำ',
    skillsFocus: [
      'อ นำ ย ๔ คำ (อย่า อยู่ อย่าง อยาก)',
      'ห นำ อักษรต่ำเดี่ยว (หนู, หมู, แหวน, หมวก, หญ้า, หยุด)',
      'อักษรสูงนำอักษรต่ำเดี่ยว ๒ พยางค์ (ขนม, ขยะ, ฉลาม, ถนน)',
      'อักษรกลางนำอักษรต่ำเดี่ยว ๒ พยางค์ (ตลาด, จมูก, อร่อย, องุ่น)',
      'การผันเสียงวรรณยุกต์ของพยางค์หลังตามเสียงพยัญชนะนำ',
    ],
  },
];

export const THAI_PHONICS_UNIT_IDS: Subject[] = [
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

export function getSkillBySubject(subject: Subject): SkillDefinition {
  if (subject === 'thai') return THAI_SKILL_DEFINITION;
  if (subject === 'english') return ENGLISH_SKILL_DEFINITION;
  if (subject === 'science') return SKILLS_LIST[3]; // inquiry
  const matchPhonics = THAI_PHONICS_UNITS_LIST.find((s) => s.id === subject);
  if (matchPhonics) return matchPhonics;
  const matchCbe = CBE_COMPETENCIES_LIST.find((s) => s.id === subject);
  if (matchCbe) return matchCbe;
  const match = SKILLS_LIST.find((s) => s.id === subject);
  return match || SKILLS_LIST[0];
}

export function getSkillByCode(code: SkillCode): SkillDefinition {
  const matchPhonics = THAI_PHONICS_UNITS_LIST.find((s) => s.code === code);
  if (matchPhonics) return matchPhonics;
  const matchCbe = CBE_COMPETENCIES_LIST.find((s) => s.code === code);
  if (matchCbe) return matchCbe;
  const match = SKILLS_LIST.find((s) => s.code === code);
  return match || SKILLS_LIST[0];
}
