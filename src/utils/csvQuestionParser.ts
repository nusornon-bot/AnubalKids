import { Question, Grade, Subject } from '../types';

/**
 * Standard RFC-4180 compliant CSV Parser
 * Handles quotes, commas inside quotes, multiline values, and UTF-8 BOM.
 */
export function parseCSVText(csvText: string): string[][] {
  // Strip BOM if present
  const text = csvText.startsWith('\uFEFF') ? csvText.slice(1) : csvText;
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped double quote
          currentCell += '"';
          i++;
        } else {
          // End of quoted string
          inQuotes = false;
        }
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if (char === '\r') {
        if (nextChar === '\n') {
          i++;
        }
        currentRow.push(currentCell.trim());
        currentCell = '';
        if (currentRow.length > 0 && currentRow.some((c) => c !== '')) {
          rows.push(currentRow);
        }
        currentRow = [];
      } else if (char === '\n') {
        currentRow.push(currentCell.trim());
        currentCell = '';
        if (currentRow.length > 0 && currentRow.some((c) => c !== '')) {
          rows.push(currentRow);
        }
        currentRow = [];
      } else {
        currentCell += char;
      }
    }
  }

  // Push final cell and row
  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c !== '')) {
      rows.push(currentRow);
    }
  }

  return rows;
}

export interface CSVParseResult {
  questions: Question[];
  errors: string[];
  warnings: string[];
  totalRows: number;
}

/**
 * Normalizes subject identifier from English or Thai name
 */
export function normalizeSubject(raw: string): Subject {
  const s = raw.toLowerCase().trim();
  if (s === 'literacy' || s === 'thai' || s.includes('ภาษา') || s.includes('การอ่าน') || s === '1') {
    return 'literacy';
  }
  if (s === 'math' || s.includes('คณิต') || s.includes('คำนวณ') || s === '2') {
    return 'math';
  }
  if (s === 'problem_solving' || s.includes('แก้ปัญหา') || s.includes('ตรรกะ') || s === '3') {
    return 'problem_solving';
  }
  if (s === 'inquiry' || s === 'science' || s.includes('สืบเสาะ') || s.includes('วิทยา') || s === '4') {
    return 'inquiry';
  }
  if (s === 'creativity' || s.includes('สร้างสรรค์') || s.includes('จินตนาการ') || s === '5') {
    return 'creativity';
  }
  if (s === 'physical_health' || s.includes('กาย') || s.includes('สุขภาพ') || s.includes('สุขภาวะ') || s === '6') {
    return 'physical_health';
  }
  if (s === 'socio_emotional' || s.includes('อารมณ์') || s.includes('จิตใจ') || s.includes('สังคม') || s === '7') {
    return 'socio_emotional';
  }
  if (s === 'citizenship' || s.includes('พลเมือง') || s.includes('ความดี') || s.includes('คุณธรรม') || s === '8') {
    return 'citizenship';
  }
  return 'literacy';
}

/**
 * Normalizes grade identifier from English or Thai name
 */
export function normalizeGrade(raw: string): Grade {
  const g = raw.toUpperCase().trim();
  if (g === 'K1' || g.includes('อนุบาล 1') || g.includes('อนุบาล1') || g.includes('อ.1') || g === '1') {
    return 'K1';
  }
  if (g === 'K2' || g.includes('อนุบาล 2') || g.includes('อนุบาล2') || g.includes('อ.2') || g === '2') {
    return 'K2';
  }
  if (g === 'K3' || g.includes('อนุบาล 3') || g.includes('อนุบาล3') || g.includes('อ.3') || g === '3') {
    return 'K3';
  }
  return 'K1';
}

/**
 * Normalizes difficulty level (1, 2, or 3)
 */
export function normalizeDifficulty(raw: string | number): 1 | 2 | 3 {
  const val = String(raw).trim();
  if (val === '3' || val.includes('ท้าทาย') || val.includes('ยาก') || val.includes('⭐⭐⭐')) {
    return 3;
  }
  if (val === '2' || val.includes('ปานกลาง') || val.includes('กลาง') || val.includes('⭐⭐')) {
    return 2;
  }
  return 1; // Default easy
}

/**
 * Maps CSV header name to internal key
 */
function normalizeHeaderKey(header: string): string {
  const clean = header.toLowerCase().replace(/[\s_\-.]/g, '');
  if (clean.includes('grade') || clean.includes('ระดับ') || clean.includes('ชั้น')) return 'grade';
  if (clean.includes('subject') || clean.includes('ทักษะ') || clean.includes('วิชา')) return 'subject';
  if (clean.includes('diff') || clean.includes('ความยาก')) return 'difficulty';
  if (clean.includes('questionth') || clean === 'question' || clean.includes('คำถามไทย') || clean === 'คำถาม') return 'question_th';
  if (clean.includes('questionen') || clean.includes('คำถามอังกฤษ')) return 'question_en';
  if (clean.includes('questionzh') || clean.includes('คำถามจีน')) return 'question_zh';
  if (clean.includes('illus') || clean.includes('รูป') || clean.includes('ภาพ') || clean.includes('อิโมจิ')) return 'illustration';
  if (clean.includes('subtit') || clean.includes('คำบรรยายภาพ')) return 'illustration_subtitle';
  
  // Option 1
  if (clean.includes('opt1icon') || clean.includes('ไอคอน1')) return 'opt1_icon';
  if (clean.includes('opt1') || clean.includes('ตัวเลือก1') || clean.includes('ชอยส์1') || clean.includes('ข้อ1')) return 'opt1_text_th';
  
  // Option 2
  if (clean.includes('opt2icon') || clean.includes('ไอคอน2')) return 'opt2_icon';
  if (clean.includes('opt2') || clean.includes('ตัวเลือก2') || clean.includes('ชอยส์2') || clean.includes('ข้อ2')) return 'opt2_text_th';
  
  // Option 3
  if (clean.includes('opt3icon') || clean.includes('ไอคอน3')) return 'opt3_icon';
  if (clean.includes('opt3') || clean.includes('ตัวเลือก3') || clean.includes('ชอยส์3') || clean.includes('ข้อ3')) return 'opt3_text_th';
  
  // Correct Option
  if (clean.includes('correct') || clean.includes('เฉลย') || clean.includes('คำตอบ') || clean.includes('ข้อถูก')) return 'correct_option';
  
  // Explanation
  if (clean.includes('expl') || clean.includes('อธิบาย') || clean.includes('เหตุผล')) return 'explanation_th';
  
  return clean;
}

/**
 * Parse CSV content and validate question records
 */
export function parseQuestionsFromCSV(csvText: string): CSVParseResult {
  const rows = parseCSVText(csvText);
  const questions: Question[] = [];
  const errors: string[] = [];
  const warnings: string[] = [];

  if (rows.length < 2) {
    return {
      questions: [],
      errors: ['ไฟล์ CSV ว่างเปล่า หรือไม่มีแถวข้อมูล (ต้องมีหัวตารางอย่างน้อย 1 แถว และข้อมูลอย่างน้อย 1 ข้อ)'],
      warnings: [],
      totalRows: 0,
    };
  }

  // Header parsing
  const rawHeaders = rows[0];
  const headerMap = new Map<string, number>();
  rawHeaders.forEach((h, idx) => {
    headerMap.set(normalizeHeaderKey(h), idx);
  });

  // Verify mandatory headers
  const requiredKeys = ['question_th', 'opt1_text_th', 'opt2_text_th', 'opt3_text_th', 'correct_option'];
  const missingKeys = requiredKeys.filter((k) => !headerMap.has(k));
  if (missingKeys.length > 0) {
    const thNames: Record<string, string> = {
      question_th: 'question_th (คำถามภาษาไทย)',
      opt1_text_th: 'opt1_text_th (ตัวเลือกที่ 1)',
      opt2_text_th: 'opt2_text_th (ตัวเลือกที่ 2)',
      opt3_text_th: 'opt3_text_th (ตัวเลือกที่ 3)',
      correct_option: 'correct_option (เฉลยข้อที่ถูกต้อง: 1, 2 หรือ 3)',
    };
    errors.push(`หัวตาราง CSV ขาดคอลัมน์สำคัญ: ${missingKeys.map((k) => thNames[k] || k).join(', ')}`);
    return {
      questions: [],
      errors,
      warnings,
      totalRows: rows.length - 1,
    };
  }

  const getValue = (row: string[], key: string, defaultValue = ''): string => {
    const idx = headerMap.get(key);
    if (idx !== undefined && idx < row.length) {
      return (row[idx] || '').trim();
    }
    return defaultValue;
  };

  const nowIso = new Date().toISOString();
  const timestamp = Date.now();

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const rowNum = r + 1; // 1-indexed for user visibility (including header as row 1)

    // Skip completely empty rows
    if (row.every((cell) => cell.trim() === '')) {
      continue;
    }

    const questionTh = getValue(row, 'question_th');
    if (!questionTh) {
      errors.push(`แถวที่ ${rowNum}: ไม่มีข้อความคำถามภาษาไทย (question_th)`);
      continue;
    }

    const opt1Th = getValue(row, 'opt1_text_th');
    const opt2Th = getValue(row, 'opt2_text_th');
    const opt3Th = getValue(row, 'opt3_text_th');

    if (!opt1Th || !opt2Th || !opt3Th) {
      errors.push(`แถวที่ ${rowNum}: ตัวเลือกไม่ครบ 3 ตัวเลือก (ต้องมี opt1, opt2, opt3)`);
      continue;
    }

    const rawCorrect = getValue(row, 'correct_option');
    let correctNum = 1;
    if (rawCorrect === '2' || rawCorrect.includes('2') || rawCorrect === opt2Th) {
      correctNum = 2;
    } else if (rawCorrect === '3' || rawCorrect.includes('3') || rawCorrect === opt3Th) {
      correctNum = 3;
    } else if (rawCorrect === '1' || rawCorrect.includes('1') || rawCorrect === opt1Th) {
      correctNum = 1;
    } else {
      warnings.push(`แถวที่ ${rowNum}: ช่องเฉลยระบุเป็น "${rawCorrect}" ไม่ชัดเจน ระบบได้ตั้งค่าเฉลยเป็นตัวเลือกที่ 1 อัตโนมัติ`);
    }

    const grade = normalizeGrade(getValue(row, 'grade', 'K1'));
    const subject = normalizeSubject(getValue(row, 'subject', 'literacy'));
    const difficulty = normalizeDifficulty(getValue(row, 'difficulty', '1'));

    const questionEn = getValue(row, 'question_en');
    const questionZh = getValue(row, 'question_zh');
    const illustration = getValue(row, 'illustration') || '⭐';
    const illustrationSubtitle = getValue(row, 'illustration_subtitle');

    const opt1Icon = getValue(row, 'opt1_icon') || '🍎';
    const opt2Icon = getValue(row, 'opt2_icon') || '🍌';
    const opt3Icon = getValue(row, 'opt3_icon') || '🍊';

    const explanationTh =
      getValue(row, 'explanation_th') ||
      `เก่งมากจ้ะ! ข้อนี้ตอบ "${correctNum === 1 ? opt1Th : correctNum === 2 ? opt2Th : opt3Th}"`;

    const qId = `csv_${timestamp}_${r}_${Math.random().toString(36).substring(2, 7)}`;

    const questionObj: Question = {
      id: qId,
      grade,
      subject,
      difficulty,
      question: {
        th: questionTh,
        en: questionEn || questionTh,
        zh: questionZh || questionTh,
      },
      illustration,
      ...(illustrationSubtitle
        ? {
            illustrationSubtitle: {
              th: illustrationSubtitle,
              en: illustrationSubtitle,
              zh: illustrationSubtitle,
            },
          }
        : {}),
      options: [
        {
          id: '1',
          label: { th: opt1Th, en: opt1Th, zh: opt1Th },
          icon: opt1Icon,
        },
        {
          id: '2',
          label: { th: opt2Th, en: opt2Th, zh: opt2Th },
          icon: opt2Icon,
        },
        {
          id: '3',
          label: { th: opt3Th, en: opt3Th, zh: opt3Th },
          icon: opt3Icon,
        },
      ],
      correctOptionId: String(correctNum),
      explanation: {
        th: explanationTh,
        en: explanationTh,
        zh: explanationTh,
      },
      isCustom: true,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    questions.push(questionObj);
  }

  return {
    questions,
    errors,
    warnings,
    totalRows: rows.length - 1,
  };
}

/**
 * Generates ready-to-use Sample CSV Template with UTF-8 BOM
 */
export function generateSampleCSVTemplate(): string {
  const headers = [
    'grade',
    'subject',
    'difficulty',
    'question_th',
    'question_en',
    'question_zh',
    'illustration',
    'opt1_text_th',
    'opt1_icon',
    'opt2_text_th',
    'opt2_icon',
    'opt3_text_th',
    'opt3_icon',
    'correct_option',
    'explanation_th',
  ];

  const sampleRows: (string | number)[][] = [
    [
      'K1',
      'literacy',
      1,
      'พยัญชนะไทยตัวนี้คือตัวอะไรเอ่ย? "ก"',
      'Which Thai consonant is this? "ก"',
      '这个泰文字母是什么？"ก"',
      '🐔',
      'ก ไก่',
      '🐔',
      'ข ไข่',
      '🥚',
      'ค ควาย',
      '🐃',
      1,
      'เก่งมากจ้ะ! "ก ไก่" เป็นพยัญชนะตัวแรกของภาษาไทย',
    ],
    [
      'K1',
      'math',
      1,
      'ผลไม้นี้มีจำนวนทั้งหมดกี่ผลเอ่ย? 🍎 🍎',
      'How many apples are there?',
      '这里有多少个苹果？',
      '🍎 🍎',
      '1 ผล',
      '1️⃣',
      '2 ผล',
      '2️⃣',
      '3 ผล',
      '3️⃣',
      2,
      'ถูกต้องจ้ะ! มีแอปเปิลสีแดงทั้งหมด 2 ผล',
    ],
    [
      'K2',
      'problem_solving',
      2,
      'ภาพใดคือ "รูปสามเหลี่ยม" เอ่ย?',
      'Which shape is a triangle?',
      '哪个形状是三角形？',
      '🔺 ⏹️ ⚪',
      'รูปวงกลม',
      '⚪',
      'รูปสามเหลี่ยม',
      '🔺',
      'รูปสี่เหลี่ยม',
      '⏹️',
      2,
      'ยอดเยี่ยมจ้ะ! รูปสามเหลี่ยมจะมี 3 ด้าน และ 3 มุม',
    ],
    [
      'K2',
      'inquiry',
      2,
      'สิ่งใดต่อไปนี้เป็น "สิ่งมีชีวิต" ที่ต้องหายใจและกินอาหาร?',
      'Which of these is a living thing?',
      '以下哪一个是生物？',
      '🌱 🪨 🚗',
      'ต้นไม้',
      '🌱',
      'ก้อนหิน',
      '🪨',
      'รถของเล่น',
      '🚗',
      1,
      'เก่งมากจ้ะ! ต้นไม้เป็นสิ่งมีชีวิต เจริญเติบโตได้',
    ],
    [
      'K3',
      'citizenship',
      2,
      'เมื่อต้องการข้ามถนนอย่างปลอดภัย เราควรข้ามที่ใด?',
      'Where should we cross the road safely?',
      '在哪里过马路才安全？',
      '🚦 🚶',
      'ทางม้าลายหรือสะพานลอย',
      '🚶',
      'วิ่งตัดหน้ารถ',
      '🏃',
      'หลับตาข้ามถนน',
      '🙈',
      1,
      'ยอดเยี่ยมมากจ้ะ! การข้ามทางม้าลายหรือสะพานลอยช่วยให้ปลอดภัยจากอุบัติเหตุ',
    ],
    [
      'K3',
      'creativity',
      2,
      'เมื่อนำสีน้ำเงินผสมกับสีเหลือง จะเกิดเป็นสีอะไรเอ่ย?',
      'What color do you get when you mix blue and yellow?',
      '蓝色和黄色混合是什么颜色？',
      '🎨 🟡 🔵',
      'สีม่วง',
      '🟣',
      'สีเขียว',
      '🟢',
      'สีส้ม',
      '🟠',
      2,
      'ถูกต้องจ้ะ! สีน้ำเงินผสมสีเหลืองจะได้สีเขียวธรรมชาติ',
    ],
    [
      'K3',
      'physical_health',
      1,
      'ก่อนรับประทานอาหารทุกครั้ง เราควรทำสิ่งใดเป็นอันดับแรก?',
      'What should we do before eating meals?',
      '饭前我们首先应该做什么？',
      '🧼 🫧 🤲',
      'ล้างมือให้สะอาดด้วยสบู่',
      '🧼',
      'ขยี้ตาแรงๆ',
      '👀',
      'เดินไปหยิบของเล่น',
      '🧸',
      1,
      'เก่งมากจ้ะ! การล้างมือด้วยสบู่ช่วยกำจัดเชื้อโรคและทำให้สุขภาพแข็งแรง',
    ],
    [
      'K3',
      'socio_emotional',
      2,
      'เมื่อเห็นเพื่อนกำลังร้องไห้เสียใจ เราควรปฏิบัติตนอย่างไร?',
      'What should we do when our friend is crying?',
      '当朋友哭泣时我们应该怎么做？',
      '😢 🤝 ❤️',
      'เข้าไปปลอบโยนและถามไถ่ด้วยความห่วงใย',
      '🤝',
      'หัวเราะเยาะเพื่อน',
      '😆',
      'วิ่งหนีไปเล่นคนเดียว',
      '🏃',
      1,
      'ยอดเยี่ยมจ้ะ! ความเห็นอกเห็นใจและช่วยเหลือเพื่อนเป็นหัวใจของมิตรภาพที่ดี',
    ],
  ];

  const escapeCSV = (val: string | number) => {
    const s = String(val ?? '');
    if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const headerLine = headers.map(escapeCSV).join(',');
  const rowLines = sampleRows.map((row) => row.map(escapeCSV).join(','));

  // Prepend UTF-8 BOM so Excel opens it with correct Thai encoding without garbled characters
  return '\uFEFF' + [headerLine, ...rowLines].join('\r\n');
}

/**
 * Export existing questions array to CSV text with UTF-8 BOM
 */
export function exportQuestionsToCSV(questions: Question[]): string {
  const headers = [
    'grade',
    'subject',
    'difficulty',
    'question_th',
    'question_en',
    'question_zh',
    'illustration',
    'opt1_text_th',
    'opt1_icon',
    'opt2_text_th',
    'opt2_icon',
    'opt3_text_th',
    'opt3_icon',
    'correct_option',
    'explanation_th',
  ];

  const escapeCSV = (val: string | number) => {
    const s = String(val ?? '');
    if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const lines: string[] = [];
  lines.push(headers.map(escapeCSV).join(','));

  for (const q of questions) {
    const opt1 = q.options[0] || { id: '1', label: { th: '', en: '', zh: '' }, icon: '🍎' };
    const opt2 = q.options[1] || { id: '2', label: { th: '', en: '', zh: '' }, icon: '🍌' };
    const opt3 = q.options[2] || { id: '3', label: { th: '', en: '', zh: '' }, icon: '🍊' };

    let correctIndex = 1;
    if (q.correctOptionId === '2' || q.correctOptionId === opt2.id) {
      correctIndex = 2;
    } else if (q.correctOptionId === '3' || q.correctOptionId === opt3.id) {
      correctIndex = 3;
    }

    const row = [
      q.grade,
      q.subject,
      q.difficulty,
      q.question.th || '',
      q.question.en || '',
      q.question.zh || '',
      q.illustration || '⭐',
      opt1.label.th || '',
      opt1.icon || '🍎',
      opt2.label.th || '',
      opt2.icon || '🍌',
      opt3.label.th || '',
      opt3.icon || '🍊',
      correctIndex,
      q.explanation.th || '',
    ];

    lines.push(row.map(escapeCSV).join(','));
  }

  return '\uFEFF' + lines.join('\r\n');
}

/**
 * Triggers browser download of a CSV file
 */
export function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
