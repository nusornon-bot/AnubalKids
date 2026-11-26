import { Question } from '../../types';
import { EXPANSION_30_LITERACY } from './literacy30';
import { EXPANSION_30_MATH } from './math30';
import { EXPANSION_30_PROBLEM_SOLVING } from './problemSolving30';
import { EXPANSION_30_INQUIRY } from './inquiry30';
import { EXPANSION_30_CREATIVITY } from './creativity30';
import { EXPANSION_30_PHYSICAL_HEALTH } from './physicalHealth30';
import { EXPANSION_30_SOCIO_EMOTIONAL } from './socioEmotional30';
import { EXPANSION_30_CITIZENSHIP } from './citizenship30';

export {
  EXPANSION_30_LITERACY,
  EXPANSION_30_MATH,
  EXPANSION_30_PROBLEM_SOLVING,
  EXPANSION_30_INQUIRY,
  EXPANSION_30_CREATIVITY,
  EXPANSION_30_PHYSICAL_HEALTH,
  EXPANSION_30_SOCIO_EMOTIONAL,
  EXPANSION_30_CITIZENSHIP,
};

/**
 * รวมข้อคำถามทั้ง 8 ทักษะ ทักษะละ 30 ข้อ (ระดับชั้น K1=10 ข้อ, K2=10 ข้อ, K3=10 ข้อ)
 * รวมทั้งหมด 8 x 30 = 240 ข้อสมบูรณ์
 */
export const QUESTIONS_EXPANSION_30: Question[] = [
  ...EXPANSION_30_LITERACY,
  ...EXPANSION_30_MATH,
  ...EXPANSION_30_PROBLEM_SOLVING,
  ...EXPANSION_30_INQUIRY,
  ...EXPANSION_30_CREATIVITY,
  ...EXPANSION_30_PHYSICAL_HEALTH,
  ...EXPANSION_30_SOCIO_EMOTIONAL,
  ...EXPANSION_30_CITIZENSHIP,
];
