import { Grade, Question, Subject, SkillCode } from '../types';

export interface SuggestQuestionsRequest {
  grade: Grade;
  competency: Subject;
  topic?: string;
  difficulty?: 1 | 2 | 3;
  count?: number;
  context?: string;
}

export interface SuggestedQuestionItem {
  questionTh: string;
  questionEn?: string;
  illustration: string;
  options: {
    id: string;
    labelTh: string;
    labelEn?: string;
    icon: string;
  }[];
  correctOptionId: string;
  explanationTh: string;
  explanationEn?: string;
  indicatorAssessed?: string;
}

export interface SuggestQuestionsResponse {
  success: boolean;
  metadata?: {
    grade: Grade;
    competency: Subject;
    competencyCode: string;
    competencyTitle: string;
    topic: string;
    difficulty: number;
    count: number;
  };
  questions: SuggestedQuestionItem[];
  error?: string;
}

export interface CBECompetencyPreset {
  id: Subject;
  code: SkillCode;
  title: string;
  engTitle: string;
  icon: string;
  colorClass: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  recommendedTopics: string[];
}

export const CBE_COMPETENCY_PRESETS: CBECompetencyPreset[] = [
  {
    id: 'self_management',
    code: 'CBE1',
    title: 'การจัดการตนเอง',
    engTitle: 'Self-Management',
    icon: '🎯',
    colorClass: 'text-blue-600',
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-blue-200',
    badgeText: 'text-blue-700',
    recommendedTopics: [
      'การรู้เท่าทันและควบคุมอารมณ์ตนเองเมื่อไม่สมหวัง',
      'การดูแลสุขอนามัยและกิจวัตรประจำวันด้วยตนเอง',
      'การตั้งเป้าหมายและการวางแผนเวลาทำการบ้าน',
      'การปรับตัวและฟื้นคืนพลังจากความผิดพลาด (Resilience)',
      'การปฏิเสธสิ่งที่ไม่ปลอดภัยและปกป้องตนเอง',
    ],
  },
  {
    id: 'higher_order_thinking',
    code: 'CBE2',
    title: 'การคิดขั้นสูง',
    engTitle: 'Higher-Order Thinking',
    icon: '🧠',
    colorClass: 'text-purple-600',
    badgeBg: 'bg-purple-50',
    badgeBorder: 'border-purple-200',
    badgeText: 'text-purple-700',
    recommendedTopics: [
      'การคิดวิเคราะห์จำแนกสาเหตุและผลกระทบ',
      'การคิดแก้ปัญหาในสถานการณ์ใหม่ด้วยเหตุผล',
      'การคิดสร้างสรรค์และออกแบบแนวทางใหม่',
      'การตัดสินใจโดยใช้ข้อมูลหลักฐานประกอบ',
      'การตรวจสอบความน่าเชื่อถือของข้อมูลเบื้องต้น',
    ],
  },
  {
    id: 'communication',
    code: 'CBE3',
    title: 'การสื่อสาร',
    engTitle: 'Communication',
    icon: '💬',
    colorClass: 'text-emerald-600',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-700',
    recommendedTopics: [
      'การฟังอย่างตั้งใจและจับใจความสำคัญ',
      'การสื่อสารความรู้สึกและความต้องการอย่างสุภาพ',
      'การเลือกใช้ภาษาและท่าทางเหมาะสมกับกาลเทศะ',
      'การสื่อสารดิจิทัลอย่างปลอดภัยและสร้างสรรค์',
      'การรับฟังและให้เกียรติผู้พูดในชั้นเรียน',
    ],
  },
  {
    id: 'teamwork_collaboration',
    code: 'CBE4',
    title: 'การรวมพลังทำงานเป็นทีม',
    engTitle: 'Teamwork & Collaboration',
    icon: '🤝',
    colorClass: 'text-amber-600',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-800',
    recommendedTopics: [
      'การรับผิดชอบบทบาทหน้าที่ในกลุ่มและการประสานงาน',
      'การรับฟังความคิดเห็นที่แตกต่างของเพื่อนร่วมทีม',
      'การคลี่คลายความขัดแย้งด้วยการเจรจาเชิงบวก',
      'การช่วยเหลือและให้กำลังใจเพื่อนในกลุ่ม',
      'การร่วมมือกันวางแผนเพื่อให้งานกลุ่มสำเร็จตามเวลา',
    ],
  },
  {
    id: 'active_citizenship',
    code: 'CBE5',
    title: 'การเป็นพลเมืองที่เข้มแข็ง',
    engTitle: 'Active Citizenship',
    icon: '🏛️',
    colorClass: 'text-rose-600',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    badgeText: 'text-rose-700',
    recommendedTopics: [
      'การเคารพกฎกติกาของโรงเรียนและสังคม',
      'การมีจิตสาธารณะและการช่วยเหลือส่วนรวม',
      'ความซื่อสัตย์สุจริตและการรักษาคำพูด',
      'การเห็นคุณค่าวัฒนธรรมไทยและการเคารพความหลากหลาย',
      'การเคารพสิทธิความเสมอภาคและความยุติธรรม',
    ],
  },
  {
    id: 'sustainable_living',
    code: 'CBE6',
    title: 'การอยู่ร่วมกับธรรมชาติและวิทยาการฯ',
    engTitle: 'Sustainable Living with Nature & Tech',
    icon: '🌿',
    colorClass: 'text-teal-600',
    badgeBg: 'bg-teal-50',
    badgeBorder: 'border-teal-200',
    badgeText: 'text-teal-700',
    recommendedTopics: [
      'การคัดแยกขยะและการลดการใช้พลาสติกในโรงเรียน',
      'การอนุรักษ์น้ำและพลังงานไฟฟ้าในชีวิตประจำวัน',
      'การรู้เท่าทันสื่อและภัยคุกคามทางไซเบอร์',
      'การใช้เทคโนโลยีและปัญญาประดิษฐ์อย่างมีจริยธรรม',
      'การดูแลรักษาพืชพรรณและสัตว์ในสิ่งแวดล้อมรอบตัว',
    ],
  },
];

export async function requestAIGeneratedQuestions(
  req: SuggestQuestionsRequest
): Promise<SuggestQuestionsResponse> {
  const response = await fetch('/api/gemini/suggest-cbe-questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody.error || `HTTP error ${response.status}: ไม่สามารถสร้างคำถามจาก Gemini API ได้`
    );
  }

  const data: SuggestQuestionsResponse = await response.json();
  return data;
}

// Convert a SuggestedQuestionItem into a full application Question object
export function convertSuggestedItemToQuestion(
  item: SuggestedQuestionItem,
  grade: Grade,
  subject: Subject,
  difficulty: 1 | 2 | 3 = 2
): Question {
  const preset = CBE_COMPETENCY_PRESETS.find((p) => p.id === subject);
  const now = new Date().toISOString();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const id = `cbe-ai-${subject}-${Date.now().toString(36)}-${randomSuffix}`;

  return {
    id,
    grade,
    subject,
    skillCode: preset?.code,
    difficulty,
    question: {
      th: item.questionTh,
      en: item.questionEn || item.questionTh,
      zh: item.questionTh,
    },
    illustration: item.illustration || preset?.icon || '📝',
    illustrationSubtitle: item.indicatorAssessed
      ? {
          th: item.indicatorAssessed,
          en: item.indicatorAssessed,
          zh: item.indicatorAssessed,
        }
      : undefined,
    options: item.options.map((opt) => ({
      id: opt.id,
      label: {
        th: opt.labelTh,
        en: opt.labelEn || opt.labelTh,
        zh: opt.labelTh,
      },
      icon: opt.icon || '📌',
    })),
    correctOptionId: item.correctOptionId,
    explanation: {
      th: item.explanationTh,
      en: item.explanationEn || item.explanationTh,
      zh: item.explanationTh,
    },
    isCustom: true,
    createdAt: now,
    updatedAt: now,
  };
}

export interface GenerateExamSetRequest {
  title?: string;
  grade: Grade;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  questionsPerCompetency: number; // 1, 2, 3, or 4
  competencies?: Subject[];
  themeContext?: string;
}

export interface GeneratedExamSetItemQuestion extends SuggestedQuestionItem {
  competency: Subject;
  skillCode?: SkillCode;
  difficulty?: 1 | 2 | 3;
}

export interface GenerateExamSetResponse {
  success: boolean;
  examSet: {
    title: string;
    description: string;
    grade: Grade;
    difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
    estimatedMinutes: number;
    subjects: Subject[];
    questionCount: number;
  };
  questions: GeneratedExamSetItemQuestion[];
  error?: string;
}

export async function requestAIGeneratedExamSet(
  req: GenerateExamSetRequest
): Promise<GenerateExamSetResponse> {
  const response = await fetch('/api/gemini/generate-cbe-exam-set', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody.error || `HTTP error ${response.status}: ไม่สามารถสร้างชุดข้อสอบจาก Gemini API ได้`
    );
  }

  const data: GenerateExamSetResponse = await response.json();
  return data;
}
