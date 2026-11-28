import { GoogleGenAI, Type } from '@google/genai';

export const DEFAULT_GEMINI_MODEL = 'gemini-4-hydrogen';

export const CBE_METADATA_MAP: Record<
  string,
  { code: string; title: string; defaultTopics: string[] }
> = {
  self_management: {
    code: 'CBE1',
    title: 'การจัดการตนเอง (Self-Management)',
    defaultTopics: [
      'การรู้เท่าทันและควบคุมอารมณ์ตนเองเมื่อไม่สมหวัง',
      'การดูแลสุขอนามัยและกิจวัตรประจำวันด้วยตนเอง',
      'การตั้งเป้าหมายและการวางแผนเวลาทำการบ้าน',
      'การปรับตัวและฟื้นคืนพลังจากความผิดพลาด (Resilience)',
    ],
  },
  higher_order_thinking: {
    code: 'CBE2',
    title: 'การคิดขั้นสูง (Higher-Order Thinking)',
    defaultTopics: [
      'การคิดวิเคราะห์จำแนกสาเหตุและผลกระทบ',
      'การคิดแก้ปัญหาในสถานการณ์ใหม่ด้วยเหตุผล',
      'การคิดสร้างสรรค์และออกแบบแนวทางใหม่',
      'การตัดสินใจโดยใช้ข้อมูลหลักฐานประกอบ',
    ],
  },
  communication: {
    code: 'CBE3',
    title: 'การสื่อสาร (Communication)',
    defaultTopics: [
      'การฟังอย่างตั้งใจและจับใจความสำคัญ',
      'การสื่อสารความรู้สึกและความต้องการอย่างสุภาพ',
      'การเลือกใช้ภาษาและท่าทางเหมาะสมกับกาลเทศะ',
      'การสื่อสารดิจิทัลอย่างปลอดภัยและสร้างสรรค์',
    ],
  },
  teamwork_collaboration: {
    code: 'CBE4',
    title: 'การรวมพลังทำงานเป็นทีม (Teamwork & Collaboration)',
    defaultTopics: [
      'การรับผิดชอบบทบาทหน้าที่ในกลุ่มและการประสานงาน',
      'การรับฟังความคิดเห็นที่แตกต่างของเพื่อนร่วมทีม',
      'การคลี่คลายความขัดแย้งด้วยการเจรจาเชิงบวก',
      'การช่วยเหลือและให้กำลังใจเพื่อนในกลุ่ม',
    ],
  },
  active_citizenship: {
    code: 'CBE5',
    title: 'การเป็นพลเมืองที่เข้มแข็ง (Active Citizenship)',
    defaultTopics: [
      'การเคารพกฎกติกาของโรงเรียนและสังคม',
      'การมีจิตสาธารณะและการช่วยเหลือส่วนรวม',
      'ความซื่อสัตย์สุจริตและการรักษาคำพูด',
      'การเห็นคุณค่าวัฒนธรรมไทยและการเคารพความหลากหลาย',
    ],
  },
  sustainable_living: {
    code: 'CBE6',
    title: 'การอยู่ร่วมกับธรรมชาติและวิทยาการอย่างยั่งยืน (Sustainable Living with Nature & Tech)',
    defaultTopics: [
      'การคัดแยกขยะและการลดการใช้พลาสติกในโรงเรียน',
      'การอนุรักษ์น้ำและพลังงานไฟฟ้าในชีวิตประจำวัน',
      'การรู้เท่าทันสื่อและภัยคุกคามทางไซเบอร์',
      'การใช้เทคโนโลยีและปัญญาประดิษฐ์อย่างมีจริยธรรม',
    ],
  },
};

const GRADE_DESCRIPTIONS: Record<string, string> = {
  K1: 'เด็กอนุบาล 1 (อายุ 3-4 ปี)',
  K2: 'เด็กอนุบาล 2 (อายุ 4-5 ปี)',
  K3: 'เด็กอนุบาล 3 (อายุ 5-6 ปี)',
  P1: 'นักเรียนชั้นประถมศึกษาปีที่ 1 (อายุ 6-7 ปี)',
  P2: 'นักเรียนชั้นประถมศึกษาปีที่ 2 (อายุ 7-8 ปี)',
  P3: 'นักเรียนชั้นประถมศึกษาปีที่ 3 (อายุ 8-9 ปี)',
  P4: 'นักเรียนชั้นประถมศึกษาปีที่ 4 (อายุ 9-10 ปี)',
  P5: 'นักเรียนชั้นประถมศึกษาปีที่ 5 (อายุ 10-11 ปี)',
  P6: 'นักเรียนชั้นประถมศึกษาปีที่ 6 (อายุ 11-12 ปี)',
};

export interface HandlerResult<T = unknown> {
  status: number;
  body: T;
}

function createGeminiClient(apiKey: string): GoogleGenAI {
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function getSafeModelName(overrideModel?: string): string {
  const trimmed = typeof overrideModel === 'string' ? overrideModel.trim() : '';
  return trimmed || DEFAULT_GEMINI_MODEL;
}

export async function handleSuggestCbeQuestions(
  payload: Record<string, unknown>,
  apiKey: string,
  modelOverride?: string
): Promise<HandlerResult> {
  try {
    if (!apiKey) {
      return {
        status: 500,
        body: {
          error:
            'Missing GEMINI_API_KEY. Please configure GEMINI_API_KEY as a server-side secret.',
        },
      };
    }

    const grade = typeof payload?.grade === 'string' ? payload.grade : 'P1';
    const competency =
      typeof payload?.competency === 'string' ? payload.competency : 'self_management';
    const topic = typeof payload?.topic === 'string' ? payload.topic : '';
    const difficulty = Number(payload?.difficulty) || 2;
    const count = Number(payload?.count) || 3;
    const context = typeof payload?.context === 'string' ? payload.context : '';

    const cbeMeta = CBE_METADATA_MAP[competency] || CBE_METADATA_MAP.self_management;
    const focusTopic = topic.trim() || cbeMeta.defaultTopics[0];

    const difficultyDesc: Record<number, string> = {
      1: 'ระดับ 1 ง่าย/พื้นฐาน (เน้นสังเกต จำแนก แยกแยะ สถานการณ์ตรงไปตรงมา)',
      2: 'ระดับ 2 ปานกลาง (เน้นการคิดวิเคราะห์ ตัดสินใจเลือกแนวทางที่เหมาะสมที่สุด)',
      3: 'ระดับ 3 ท้าทาย/ประยุกต์ใช้ (สถานการณ์ซับซ้อน มีเงื่อนไขเฉพาะ หรือต้องการการตัดสินใจเชิงจริยธรรม)',
    };

    const targetGrade = GRADE_DESCRIPTIONS[grade] || GRADE_DESCRIPTIONS.P1;
    const targetDifficulty = difficultyDesc[difficulty] || difficultyDesc[2];
    const safeCount = Math.min(10, Math.max(1, Math.trunc(count) || 3));

    const systemPrompt = `คุณคือผู้เชี่ยวชาญด้านการวัดและประเมินผลการศึกษาฐานสมรรถนะ (Competency-Based Assessment Specialist) ของกระทรวงศึกษาธิการไทย (สพฐ.)
หน้าที่ของคุณคือการออกแบบ "แบบทดสอบสถานการณ์จำลองเพื่อประเมินสมรรถนะ (Situational Judgment Test / Performance Scenario)"
สำหรับนักเรียนไทยในระดับ ${targetGrade}
ตามกรอบหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน (หลักสูตรฐานสมรรถนะ CBE)

แนวทางการออกข้อสอบ:
1. ภาษาเข้าใจง่าย เหมาะสมกับวัย ${targetGrade} รูปประโยคกระชับชัดเจน
2. จำลองสถานการณ์จริงที่เด็กพบเจอในโรงเรียน ที่บ้าน หรือชุมชน
3. ตัวเลือก 3-4 ตัวเลือก มีคำตอบที่สะท้อนระดับสมรรถนะเชี่ยวชาญชัดเจน 1 ข้อ ส่วนตัวเลือกอื่นเป็นพฤติกรรมที่ยังต้องพัฒนา
4. แนบอิโมจิประกอบเพื่อความน่าสนใจและช่วยการสื่อสารทางสายตา
5. มีคำอธิบายเหตุผล (Explanation) เชิงพัฒนาการและเสริมแรงบวกสำหรับคุณครูนำไปให้คำแนะนำแก่นักเรียน`;

    const userPrompt = `กรุณาสร้างชุดคำถามประเมินสมรรถนะจำนวน ${safeCount} ข้อ:
- ระดับชั้น: ${targetGrade} (${grade})
- สมรรถนะหลัก: ${cbeMeta.code} - ${cbeMeta.title}
- รหัสสมรรถนะ: ${competency}
- หัวข้อ/พฤติกรรมบ่งชี้ที่เน้น: "${focusTopic}"
- ระดับความยาก: ${targetDifficulty}
${context ? `- บริบทหรือสถานการณ์เพิ่มเติมที่ต้องการ: "${context}"` : ''}

กำหนดให้ออกแบบคำถาม ตัวเลือก พร้อมระบุตัวเลือกที่ถูกต้องและคำอธิบายเป็น JSON ตามโครงสร้างที่กำหนด`;

    const ai = createGeminiClient(apiKey);
    const response = await ai.models.generateContent({
      model: getSafeModelName(modelOverride),
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              description: 'รายการข้อคำถามประเมินสมรรถนะที่สร้างขึ้น',
              items: {
                type: Type.OBJECT,
                properties: {
                  questionTh: {
                    type: Type.STRING,
                    description: 'ข้อความคำถามสถานการณ์จำลองภาษาไทย ชัดเจน กระชับ เหมาะกับระดับชั้น',
                  },
                  questionEn: {
                    type: Type.STRING,
                    description: 'English translation of the question scenario',
                  },
                  illustration: {
                    type: Type.STRING,
                    description: 'อิโมจิหลัก 1-3 ตัวที่สื่อถึงโจทย์ เช่น 🤝🎨 หรือ 🌿🚴',
                  },
                  options: {
                    type: Type.ARRAY,
                    description: 'ตัวเลือกคำตอบ 3 ถึง 4 ตัวเลือก',
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: {
                          type: Type.STRING,
                          description: 'รหัสตัวเลือก เช่น a, b, c, d',
                        },
                        labelTh: {
                          type: Type.STRING,
                          description: 'ข้อความตัวเลือกภาษาไทย',
                        },
                        labelEn: {
                          type: Type.STRING,
                          description: 'Option text in English',
                        },
                        icon: {
                          type: Type.STRING,
                          description: 'อิโมจิตัวเลือก เช่น 🍎 หรือ 🏃',
                        },
                      },
                      required: ['id', 'labelTh', 'icon'],
                    },
                  },
                  correctOptionId: {
                    type: Type.STRING,
                    description: 'รหัส ID ของตัวเลือกที่ถูกต้อง เช่น a หรือ b',
                  },
                  explanationTh: {
                    type: Type.STRING,
                    description: 'คำอธิบายเหตุผลและข้อแนะนำทางสมรรถนะภาษาไทย',
                  },
                  explanationEn: {
                    type: Type.STRING,
                    description: 'Pedagogical explanation in English',
                  },
                  indicatorAssessed: {
                    type: Type.STRING,
                    description: 'พฤติกรรมบ่งชี้หรือตัวชี้วัดสมรรถนะที่ประเมินในข้อนี้',
                  },
                },
                required: [
                  'questionTh',
                  'illustration',
                  'options',
                  'correctOptionId',
                  'explanationTh',
                ],
              },
            },
          },
          required: ['questions'],
        },
      },
    });

    const parsed = JSON.parse((response.text || '{}').trim());

    return {
      status: 200,
      body: {
        success: true,
        metadata: {
          grade,
          competency,
          competencyCode: cbeMeta.code,
          competencyTitle: cbeMeta.title,
          topic: focusTopic,
          difficulty,
          count: parsed.questions?.length || 0,
        },
        questions: parsed.questions || [],
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error in /api/gemini/suggest-cbe-questions:', err);
    return {
      status: 500,
      body: {
        error: 'เกิดข้อผิดพลาดในการสร้างคำถามด้วย Gemini API: ' + message,
      },
    };
  }
}

export async function handleGenerateCbeExamSet(
  payload: Record<string, unknown>,
  apiKey: string,
  modelOverride?: string
): Promise<HandlerResult> {
  try {
    if (!apiKey) {
      return {
        status: 500,
        body: {
          error:
            'Missing GEMINI_API_KEY. Please configure GEMINI_API_KEY as a server-side secret.',
        },
      };
    }

    const title = typeof payload?.title === 'string' ? payload.title : '';
    const grade = typeof payload?.grade === 'string' ? payload.grade : 'P1';
    const difficulty = typeof payload?.difficulty === 'string' ? payload.difficulty : 'medium';
    const questionsPerCompetency = Number(payload?.questionsPerCompetency) || 1;
    const competencies = payload?.competencies;
    const themeContext = typeof payload?.themeContext === 'string' ? payload.themeContext : '';

    const targetGrade = GRADE_DESCRIPTIONS[grade] || GRADE_DESCRIPTIONS.P1;
    const perComp = Math.max(1, Math.min(4, Math.trunc(questionsPerCompetency) || 1));
    const activeCompetencyKeys =
      Array.isArray(competencies) && competencies.length > 0
        ? competencies.map(String)
        : [
            'self_management',
            'higher_order_thinking',
            'communication',
            'teamwork_collaboration',
            'active_citizenship',
            'sustainable_living',
          ];

    const difficultyPrompt =
      difficulty === 'easy'
        ? 'ระดับง่าย (เน้นพฤติกรรมพื้นฐาน การสังเกต จดจำ และแยกแยะแบบตรงไปตรงมา)'
        : difficulty === 'hard'
        ? 'ระดับท้าทาย (เน้นการวิเคราะห์เชิงลึก การตัดสินใจในสถานการณ์กำกวม และการแก้ปัญหาซับซ้อน)'
        : difficulty === 'mixed'
        ? 'คละระดับความยาก (มีทั้งข้อทดสอบพื้นฐาน ปานกลาง และท้าทายสลับกัน)'
        : 'ระดับปานกลาง (เน้นการตัดสินใจเลือกพฤติกรรมที่เหมาะสมและมีเหตุผลตามวัย)';

    const competencyListDetails = activeCompetencyKeys
      .map((k: string) => {
        const meta = CBE_METADATA_MAP[k];
        return meta ? `- ${meta.code} (${k}): ${meta.title}` : `- ${k}`;
      })
      .join('\n');

    const systemPrompt = `คุณคือผู้เชี่ยวชาญการออกแบบชุดข้อสอบมาตรฐานด้านการประเมินสมรรถนะผู้เรียน (Competency-Based Exam Architect) สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)
งานของคุณคือสร้าง "ชุดข้อสอบประเมินสมรรถนะครบวงจร (Comprehensive CBE Exam Set)"
สำหรับระดับชั้น: ${targetGrade} (${grade})
ตามกรอบหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน (ฉบับปรับปรุง)

เกณฑ์การออกแบบ:
1. ชุดข้อสอบต้องครอบคลุมสมรรถนะที่ระบุอย่างสมดุล (สมรรถนะละ ${perComp} ข้อ)
2. โจทย์เป็นสถานการณ์จำลองในชีวิตจริง (Situational Judgement / Real-Life Scenarios) ที่เด็กวัย ${targetGrade} เข้าใจง่าย ไม่ซับซ้อนเกินวัย
3. แต่ละข้อมีตัวเลือก 3-4 ข้อที่แยกพฤติกรรมชัดเจน (มี 1 ตัวเลือกที่เป็นพฤติกรรมเชี่ยวชาญสะท้อนสมรรถนะสูงสุด)
4. มีอิโมจิภาพประกอบที่สื่อความหมายชัดเจน น่าดึงดูดสำหรับเด็ก
5. มีคำอธิบายเชิงจิตวิทยาพัฒนาการและคำแนะนำสำหรับครูผู้ประเมิน`;

    const userPrompt = `กรุณาออกแบบชุดข้อสอบประเมินสมรรถนะหลักสูตรสถานศึกษา:
- ระดับชั้น: ${targetGrade} (${grade})
${title ? `- ชื่อชุดข้อสอบที่ครูกำหนดเบื้องต้น: "${title}"` : '- กรุณาตั้งชื่อชุดข้อสอบที่สร้างสรรค์และเป็นทางการ'}
- ระดับความยาก: ${difficultyPrompt}
- จำนวนข้อต่อแต่ละสมรรถนะ: ${perComp} ข้อ
${themeContext ? `- ธีมหรือสถานการณ์เชื่อมโยงร่วม: "${themeContext}"` : ''}

สมรรถนะที่ต้องครอบคลุม (${activeCompetencyKeys.length} ด้าน):
${competencyListDetails}

กรุณาส่งกลับเป็น JSON ที่มี examSetTitle, examSetDescription, estimatedMinutes และ questions ตามโครงสร้างที่กำหนด`;

    const ai = createGeminiClient(apiKey);
    const response = await ai.models.generateContent({
      model: getSafeModelName(modelOverride),
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            examSetTitle: {
              type: Type.STRING,
              description:
                'ชื่อชุดข้อสอบทางการและสร้างสรรค์ เช่น "ชุดประเมิน 6 สมรรถนะหลัก ป.1 - ชุดที่ 1"',
            },
            examSetDescription: {
              type: Type.STRING,
              description: 'คำอธิบายวัตถุประสงค์และภาพรวมของชุดข้อสอบชุดนี้',
            },
            estimatedMinutes: {
              type: Type.NUMBER,
              description: 'เวลาโดยประมาณที่เหมาะสมในการทำข้อสอบ (นาที) เช่น 15',
            },
            questions: {
              type: Type.ARRAY,
              description: 'รายการข้อสอบทั้งหมดที่จัดเข้าชุดข้อสอบนี้',
              items: {
                type: Type.OBJECT,
                properties: {
                  competency: {
                    type: Type.STRING,
                    description:
                      'รหัสสมรรถนะ เช่น self_management, higher_order_thinking, communication, teamwork_collaboration, active_citizenship, sustainable_living',
                  },
                  skillCode: {
                    type: Type.STRING,
                    description: 'รหัสสมรรถนะ เช่น CBE1, CBE2, CBE3, CBE4, CBE5, CBE6',
                  },
                  difficulty: {
                    type: Type.NUMBER,
                    description: 'ระดับความยาก 1, 2, หรือ 3',
                  },
                  questionTh: {
                    type: Type.STRING,
                    description:
                      'ข้อความคำถามสถานการณ์จำลองภาษาไทย ชัดเจน เข้าใจง่ายสำหรับระดับชั้นนี้',
                  },
                  questionEn: {
                    type: Type.STRING,
                    description: 'English translation of the question',
                  },
                  illustration: {
                    type: Type.STRING,
                    description: 'อิโมจิภาพประกอบ 1-3 ตัว เช่น 🤝🎨 หรือ 🌿🚴',
                  },
                  options: {
                    type: Type.ARRAY,
                    description: 'ตัวเลือกคำตอบ 3 ถึง 4 ตัวเลือก',
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING, description: 'Option id เช่น a, b, c, d' },
                        labelTh: { type: Type.STRING, description: 'ข้อความตัวเลือกภาษาไทย' },
                        labelEn: { type: Type.STRING, description: 'Option text in English' },
                        icon: {
                          type: Type.STRING,
                          description: 'อิโมจิตัวเลือก เช่น 🍎 หรือ 🏃',
                        },
                      },
                      required: ['id', 'labelTh', 'icon'],
                    },
                  },
                  correctOptionId: {
                    type: Type.STRING,
                    description: 'ID ของตัวเลือกที่ถูกต้อง เช่น a หรือ b',
                  },
                  explanationTh: {
                    type: Type.STRING,
                    description: 'คำอธิบายเหตุผลและข้อแนะนำทางสมรรถนะภาษาไทย',
                  },
                  indicatorAssessed: {
                    type: Type.STRING,
                    description: 'พฤติกรรมบ่งชี้หรือตัวชี้วัดสมรรถนะที่ประเมินในข้อนี้',
                  },
                },
                required: [
                  'competency',
                  'questionTh',
                  'illustration',
                  'options',
                  'correctOptionId',
                  'explanationTh',
                ],
              },
            },
          },
          required: ['examSetTitle', 'examSetDescription', 'estimatedMinutes', 'questions'],
        },
      },
    });

    const parsed = JSON.parse((response.text || '{}').trim());

    return {
      status: 200,
      body: {
        success: true,
        examSet: {
          title: title.trim() || parsed.examSetTitle || `ชุดประเมิน 6 สมรรถนะหลัก (${grade})`,
          description:
            parsed.examSetDescription || 'แบบทดสอบวัดสมรรถนะผู้เรียนตามมาตรฐาน สพฐ.',
          grade,
          difficulty,
          estimatedMinutes: parsed.estimatedMinutes || 15,
          subjects: activeCompetencyKeys,
          questionCount: parsed.questions?.length || 0,
        },
        questions: parsed.questions || [],
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error in /api/gemini/generate-cbe-exam-set:', err);
    return {
      status: 500,
      body: {
        error: 'เกิดข้อผิดพลาดในการสร้างชุดข้อสอบด้วย Gemini API: ' + message,
      },
    };
  }
}

export async function handleGenerateStory(
  payload: Record<string, unknown>,
  apiKey: string,
  modelOverride?: string
): Promise<HandlerResult> {
  try {
    if (!apiKey) {
      return {
        status: 500,
        body: {
          error:
            'Missing GEMINI_API_KEY. Please configure GEMINI_API_KEY as a server-side secret.',
        },
      };
    }

    const skillId = typeof payload?.skillId === 'string' ? payload.skillId : 'math';
    const grade = typeof payload?.grade === 'string' ? payload.grade : 'K2';
    const childName = typeof payload?.childName === 'string' ? payload.childName : 'น้องคนเก่ง';
    const curriculumMode =
      typeof payload?.curriculumMode === 'string' ? payload.curriculumMode : 'early_childhood';

    const isCbe =
      curriculumMode === 'cbe_primary' ||
      ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(grade);
    const cbeMeta = CBE_METADATA_MAP[skillId];
    const targetGrade = GRADE_DESCRIPTIONS[grade] || GRADE_DESCRIPTIONS.K2;

    const systemPrompt = `คุณคือนักเขียนนิทานเด็กและผู้เชี่ยวชาญด้านจิตวิทยาพัฒนาการเด็ก
ภารกิจของคุณคือแต่ง "นิทานสั้นก่อนเริ่มเล่นเกม (Pre-Game Pedagogical Story)"
สำหรับเด็กชื่อ: "${childName}"
ระดับชั้น: ${targetGrade}
กรอบหลักสูตร: ${isCbe ? 'หลักสูตรแกนกลางฐานสมรรถนะ (CBE Primary P1-P6)' : 'หลักสูตรการศึกษาปฐมวัย (Early Childhood 8 Skills)'}

ข้อกำหนดสำคัญ:
1. นิทานมีความยาวสั้นกระชับ พอดีสำหรับการฟังก่อนเริ่มเล่นเกม (3 ย่อหน้า ความยาวรวมประมาณ 80-120 คำ)
2. มีตัวละครสัตว์น่ารักหรือเด็กผู้กล้า พร้อมอิโมจิประกอบ
3. ภาษาไทยไพเราะ เข้าใจง่าย สื่อความหมายเชิงบวก เสริมพลังใจ (Empowerment)
4. มีข้อคิดหรือคติสอนใจ (Moral) ที่สอดคล้องกับทักษะหรือสมรรถนะที่ระบุ
5. ตอบกลับเป็น JSON ตาม schema ที่กำหนด`;

    const userPrompt = `กรุณาแต่งนิทานสร้างแรงบันดาลใจสำหรับ ${childName} (${targetGrade}):
- ทักษะ/สมรรถนะที่มุ่งส่งเสริม: ${isCbe && cbeMeta ? `${cbeMeta.code} - ${cbeMeta.title}` : skillId}
- โครงสร้าง: 3 ย่อหน้า (เริ่มต้น -> เผชิญความท้าทาย -> บทสรุปแห่งความสำเร็จ)`;

    const ai = createGeminiClient(apiKey);
    const response = await ai.models.generateContent({
      model: getSafeModelName(modelOverride),
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'ชื่อเรื่องนิทานที่น่าตื่นเต้นและสร้างสรรค์สำหรับเด็ก',
            },
            heroEmoji: {
              type: Type.STRING,
              description: 'อิโมจิตัวละครหลัก เช่น 🐰 หรือ 🦁',
            },
            skillTag: {
              type: Type.STRING,
              description:
                'ป้ายชื่อทักษะหรือสมรรถนะ เช่น การจัดการตนเอง 🎯 หรือ คิดรวบยอดและคำนวณ 🧮',
            },
            moral: {
              type: Type.STRING,
              description: 'ข้อคิดสอนใจสั้นๆ เสริมแรงบวก 1 ประโยค',
            },
            paragraphs: {
              type: Type.ARRAY,
              description: 'เนื้อเรื่อง 3 ย่อหน้าสั้นๆ',
              items: {
                type: Type.OBJECT,
                properties: {
                  text: {
                    type: Type.STRING,
                    description: 'ข้อความในแต่ละย่อหน้า ภาษาอบอุ่นเข้าใจง่าย',
                  },
                  emoji: {
                    type: Type.STRING,
                    description: 'อิโมจิประกอบย่อหน้า เช่น 🌳 หรือ ✨',
                  },
                },
                required: ['text', 'emoji'],
              },
            },
          },
          required: ['title', 'heroEmoji', 'skillTag', 'moral', 'paragraphs'],
        },
      },
    });

    const parsed = JSON.parse((response.text || '{}').trim());
    return {
      status: 200,
      body: {
        success: true,
        story: parsed,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error in /api/story/generate:', err);
    return {
      status: 500,
      body: {
        error: 'Story generation error: ' + message,
      },
    };
  }
}
