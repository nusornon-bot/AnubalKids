import { Question, Grade, Subject } from '../../types';
import { CBE_QUESTIONS_SELF_MANAGEMENT } from './selfManagementCbe';
import { CBE_QUESTIONS_HIGHER_ORDER_THINKING } from './higherOrderThinkingCbe';
import { CBE_QUESTIONS_COMMUNICATION } from './communicationCbe';
import { CBE_QUESTIONS_TEAMWORK } from './teamworkCbe';
import { CBE_QUESTIONS_ACTIVE_CITIZENSHIP } from './activeCitizenshipCbe';
import { CBE_QUESTIONS_SUSTAINABLE_LIVING } from './sustainableLivingCbe';

// 1,440 expansion questions (240 per competency across P1-P6)
import {
  CBE_EXP_SELF_MANAGEMENT,
  CBE_EXP_COMMUNICATION,
  CBE_EXP_TEAMWORK,
  CBE_EXP_HIGHER_ORDER_THINKING,
  CBE_EXP_ACTIVE_CITIZENSHIP,
  CBE_EXP_SUSTAINABLE_LIVING,
  QUESTIONS_CBE_EXPANSION_1440,
  balanceOptions,
} from './expansion1440';

// +150% expansion: 2,700 questions (450 per competency, 450 per grade P1-P6, 75 per cell, 25:25:25 per cell)
import {
  CBE_EXP2700_SELF_MANAGEMENT,
  CBE_EXP2700_HIGHER_ORDER_THINKING,
  CBE_EXP2700_COMMUNICATION,
  CBE_EXP2700_TEAMWORK,
  CBE_EXP2700_ACTIVE_CITIZENSHIP,
  CBE_EXP2700_SUSTAINABLE_LIVING,
  QUESTIONS_CBE_EXPANSION_2700,
} from './expansion2700';

export {
  CBE_QUESTIONS_SELF_MANAGEMENT,
  CBE_QUESTIONS_HIGHER_ORDER_THINKING,
  CBE_QUESTIONS_COMMUNICATION,
  CBE_QUESTIONS_TEAMWORK,
  CBE_QUESTIONS_ACTIVE_CITIZENSHIP,
  CBE_QUESTIONS_SUSTAINABLE_LIVING,
  QUESTIONS_CBE_EXPANSION_1440,
  QUESTIONS_CBE_EXPANSION_2700,
};

const COMPETENCY_ORDER: Subject[] = [
  'self_management',
  'higher_order_thinking',
  'communication',
  'teamwork_collaboration',
  'active_citizenship',
  'sustainable_living',
];

const GRADE_ORDER: Grade[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];

const RAW_CBE_PRIMARY: Question[] = [
  ...CBE_QUESTIONS_SELF_MANAGEMENT,
  ...CBE_EXP_SELF_MANAGEMENT,
  ...CBE_EXP2700_SELF_MANAGEMENT,
  ...CBE_QUESTIONS_HIGHER_ORDER_THINKING,
  ...CBE_EXP_HIGHER_ORDER_THINKING,
  ...CBE_EXP2700_HIGHER_ORDER_THINKING,
  ...CBE_QUESTIONS_COMMUNICATION,
  ...CBE_EXP_COMMUNICATION,
  ...CBE_EXP2700_COMMUNICATION,
  ...CBE_QUESTIONS_TEAMWORK,
  ...CBE_EXP_TEAMWORK,
  ...CBE_EXP2700_TEAMWORK,
  ...CBE_QUESTIONS_ACTIVE_CITIZENSHIP,
  ...CBE_EXP_ACTIVE_CITIZENSHIP,
  ...CBE_EXP2700_ACTIVE_CITIZENSHIP,
  ...CBE_QUESTIONS_SUSTAINABLE_LIVING,
  ...CBE_EXP_SUSTAINABLE_LIVING,
  ...CBE_EXP2700_SUSTAINABLE_LIVING,
];

function normalizeCbeBank(rawQuestions: Question[]): Question[] {
  // Group by (competency, grade) so each of the 36 cells (125 questions) has balanced options
  // and Latin-square 1:1:1 answer distribution (exact 250:250:250 per competency and per grade)
  const cellIndexCounters: Record<string, number> = {};

  return rawQuestions.map((q) => {
    const cIdx = Math.max(0, COMPETENCY_ORDER.indexOf(q.subject));
    const gIdx = Math.max(0, GRADE_ORDER.indexOf(q.grade));
    const cellKey = `${cIdx}-${gIdx}`;
    const idxInCell = cellIndexCounters[cellKey] || 0;
    cellIndexCounters[cellKey] = idxInCell + 1;

    // In a 125-question cell: 42 + 42 + 41 = 125.
    // Starting the cycle at (cIdx + gIdx + 1) % 3 ensures that slots (c+g+1)%3 and (c+g+2)%3 get 42
    // and slot (c+g)%3 gets 41 -> every competency sums to 250:250:250 and every grade sums to 250:250:250.
    const targetSlot = (idxInCell + cIdx + gIdx + 1) % 3; // 0, 1, or 2
    const targetOptionId = `opt${targetSlot + 1}`;

    const currentCorrectIdx = Math.max(
      0,
      q.options.findIndex((o) => o.id === q.correctOptionId)
    );
    const correctOpt = q.options[currentCorrectIdx];
    const distractors = q.options.filter((_, idx) => idx !== currentCorrectIdx);

    const [bTh0, bTh1, bTh2] = balanceOptions(
      correctOpt.label.th,
      distractors[0]?.label.th || '',
      distractors[1]?.label.th || ''
    );

    const balancedCorrect = {
      ...correctOpt,
      label: { ...correctOpt.label, th: bTh0 },
    };
    const balancedDist1 = {
      ...distractors[0],
      label: { ...distractors[0].label, th: bTh1 },
    };
    const balancedDist2 = {
      ...distractors[1],
      label: { ...distractors[1].label, th: bTh2 },
    };

    const reordered =
      targetSlot === 0
        ? [balancedCorrect, balancedDist1, balancedDist2]
        : targetSlot === 1
        ? [balancedDist1, balancedCorrect, balancedDist2]
        : [balancedDist1, balancedDist2, balancedCorrect];

    return {
      ...q,
      options: reordered.map((opt, i) => ({
        ...opt,
        id: `opt${i + 1}`,
      })),
      correctOptionId: targetOptionId,
    };
  });
}

/**
 * รวมคลังข้อสอบหลักสูตรสถานศึกษาฐานสมรรถนะ (CBE Primary ป.๑ - ป.๖)
 * รวมทั้งหมด ๔,๕๐๐ ข้อ (เพิ่มขึ้น ๑๕๐% จาก ๑,๘๐๐ ข้อ: เดิม ๑,๘๐๐ ข้อ + เพิ่มใหม่ ๒,๗๐๐ ข้อ)
 * กระจายครบทั้ง ๖ สมรรถนะหลัก (สมรรถนะละ ๗๕๐ ข้อ)
 * กระจายครบทั้ง ๖ ระดับชั้น ป.๑ - ป.๖ (ระดับชั้นละ ๗๕๐ ข้อ / สมรรถนะละ ๑๒๕ ข้อต่อชั้น)
 * เฉลยคำตอบกระจายอย่างเท่าเทียม ๑:๑:๑ (๑,๕๐๐ : ๑,๕๐๐ : ๑,๕๐๐ และ ๒๕๐ : ๒๕๐ : ๒๕๐ ในทุกสมรรถนะและทุกระดับชั้น)
 * และความยาวของตัวเลือกทั้ง ๓ ตัวเลือกมีความยาวใกล้เคียงกันทุกข้อ
 */
export const QUESTIONS_CBE_PRIMARY: Question[] = normalizeCbeBank(RAW_CBE_PRIMARY);

