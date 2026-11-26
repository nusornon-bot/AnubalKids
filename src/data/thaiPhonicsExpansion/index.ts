import { Question, Grade, SkillCode, Subject } from '../../types';
import { UNIT_1_ITEMS, UNIT_2_ITEMS, UNIT_3_ITEMS, PhonicsItemTuple } from './units1to3';
import { UNIT_4_ITEMS, UNIT_5_ITEMS, UNIT_6_ITEMS } from './units4to6';
import { UNIT_7_ITEMS, UNIT_8_ITEMS } from './units7to8';
import { UNIT_9_ITEMS, UNIT_10_ITEMS } from './units9to10';

const GRADES: Grade[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
const OPT_ICONS = ['⭐', '📘', '📙'];

function buildUnitQuestions(
  unitNum: number,
  subject: Subject,
  skillCode: SkillCode,
  icon: string,
  subtitlePrefix: string,
  itemsByGrade: Record<string, PhonicsItemTuple[]>
): Question[] {
  const questions: Question[] = [];

  GRADES.forEach((grade, gIdx) => {
    const items = itemsByGrade[grade];
    for (let k = 0; k < 60; k++) {
      const difficulty = (Math.floor(k / 20) + 1) as 1 | 2 | 3;
      const cIdx = (k + gIdx) % 3;
      const qid = `tp${unitNum}-${grade.toLowerCase()}-${String(k + 1).padStart(2, '0')}`;
      const [qText, cText, d1Text, d2Text, expl] = items[k % items.length];

      let cTh: [string, string, string];
      if (cIdx === 0) {
        cTh = [cText, d1Text, d2Text];
      } else if (cIdx === 1) {
        cTh = [d1Text, cText, d2Text];
      } else {
        cTh = [d1Text, d2Text, cText];
      }

      questions.push({
        id: qid,
        grade,
        subject,
        skillCode,
        difficulty,
        question: {
          th: qText,
          en: `Thai Phonics Unit ${unitNum} Question (${grade})`,
          zh: `泰语拼读第${unitNum}单元问题 (${grade})`,
        },
        illustration: icon,
        illustrationSubtitle: {
          th: `${subtitlePrefix} (${grade})`,
          en: `Thai Phonics ${grade}`,
          zh: `泰语拼读 ${grade}`,
        },
        options: [0, 1, 2].map((i) => ({
          id: `opt${i + 1}`,
          label: {
            th: cTh[i],
            en: `Option ${i + 1}`,
            zh: `选项 ${i + 1}`,
          },
          icon: OPT_ICONS[i],
        })),
        correctOptionId: `opt${cIdx + 1}`,
        explanation: {
          th: expl,
          en: `Explanation for question ${qid}`,
          zh: `问题 ${qid} 的解析`,
        },
      });
    }
  });

  return questions;
}

export const TP_QUESTIONS_UNIT_1: Question[] = buildUnitQuestions(
  1,
  'phonics_consonant',
  'TP1',
  '🔤',
  'หน่วย ๑: พยัญชนะ',
  UNIT_1_ITEMS
);

export const TP_QUESTIONS_UNIT_2: Question[] = buildUnitQuestions(
  2,
  'phonics_vowel',
  'TP2',
  '🅰️',
  'หน่วย ๒: สระ',
  UNIT_2_ITEMS
);

export const TP_QUESTIONS_UNIT_3: Question[] = buildUnitQuestions(
  3,
  'phonics_tone',
  'TP3',
  '🎵',
  'หน่วย ๓: วรรณยุกต์',
  UNIT_3_ITEMS
);

export const TP_QUESTIONS_UNIT_4: Question[] = buildUnitQuestions(
  4,
  'phonics_korkaa',
  'TP4',
  '📖',
  'หน่วย ๔: แม่ ก กา',
  UNIT_4_ITEMS
);

export const TP_QUESTIONS_UNIT_5: Question[] = buildUnitQuestions(
  5,
  'phonics_tone_korkaa',
  'TP5',
  '🎼',
  'หน่วย ๕: ผันวรรณยุกต์ ก กา',
  UNIT_5_ITEMS
);

export const TP_QUESTIONS_UNIT_6: Question[] = buildUnitQuestions(
  6,
  'phonics_direct_spelling',
  'TP6',
  '🎯',
  'หน่วย ๖: สะกดตรงมาตรา',
  UNIT_6_ITEMS
);

export const TP_QUESTIONS_UNIT_7: Question[] = buildUnitQuestions(
  7,
  'phonics_tone_spelling',
  'TP7',
  '📊',
  'หน่วย ๗: ผันคำตรงมาตรา',
  UNIT_7_ITEMS
);

export const TP_QUESTIONS_UNIT_8: Question[] = buildUnitQuestions(
  8,
  'phonics_indirect_spelling',
  'TP8',
  '🔍',
  'หน่วย ๘: ไม่ตรงมาตรา',
  UNIT_8_ITEMS
);

export const TP_QUESTIONS_UNIT_9: Question[] = buildUnitQuestions(
  9,
  'phonics_cluster',
  'TP9',
  '👥',
  'หน่วย ๙: อักษรควบ',
  UNIT_9_ITEMS
);

export const TP_QUESTIONS_UNIT_10: Question[] = buildUnitQuestions(
  10,
  'phonics_leading_consonant',
  'TP10',
  '👑',
  'หน่วย ๑๐: อักษรนำ',
  UNIT_10_ITEMS
);

export const QUESTIONS_THAI_PHONICS_EXPANSION_3600: Question[] = [
  ...TP_QUESTIONS_UNIT_1,
  ...TP_QUESTIONS_UNIT_2,
  ...TP_QUESTIONS_UNIT_3,
  ...TP_QUESTIONS_UNIT_4,
  ...TP_QUESTIONS_UNIT_5,
  ...TP_QUESTIONS_UNIT_6,
  ...TP_QUESTIONS_UNIT_7,
  ...TP_QUESTIONS_UNIT_8,
  ...TP_QUESTIONS_UNIT_9,
  ...TP_QUESTIONS_UNIT_10,
];
