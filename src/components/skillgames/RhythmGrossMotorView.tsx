import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Grade } from '../../types';
import { soundEffects, speakText } from '../../services/audioService';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import confetti from 'canvas-confetti';
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Volume2,
  ArrowRight,
  Zap,
} from 'lucide-react';

interface RhythmGrossMotorViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

interface GrossMotorMission {
  id: string;
  grade: Grade;
  levelNumber: number;
  title: string;
  actionName: string;
  actionEmoji: string;
  movementSteps: string[];
  targetRounds: number; // e.g. 5 rounds or beats
  durationSec: number;
  voicePrompt: string;
  musicTempo: 'ช้าๆ นุ่มนวล' | 'จังหวะสนุกปานกลาง' | 'คึกคักว่องไว';
  benefitNote: string;
}

const GROSS_MOTOR_MISSIONS: GrossMotorMission[] = [
  // ================= K1 (อ.1) - 20 ด่าน =================
  {
    id: 'k1-1',
    grade: 'K1',
    levelNumber: 1,
    title: 'ด่าน 1: ปรบมือ 2 แปะ + กระโดดดึ๋ง!',
    actionName: 'ปรบมือ & กระโดด',
    actionEmoji: '👏',
    movementSteps: [
      '1. ปรบมือ แปะ แปะ (2 ครั้ง)',
      '2. กระโดดสองเท้าขึ้น ดึ๋ง! (1 ครั้ง)',
      '3. ชูสองมือยิ้มแฉ่ง!',
    ],
    targetRounds: 5,
    durationSec: 15,
    voicePrompt: 'เด็กๆ จ๋า ฟังจังหวะ ปรบมือ แปะ แปะ แล้วกระโดดดึ๋งขึ้นสูงๆ เลยนะจ๊ะ!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'ประสานการรับรู้ทางเสียงและจังหวะเข้ากับการเคลื่อนไหวของกล้ามเนื้อแขนและขา',
  },
  {
    id: 'k1-2',
    grade: 'K1',
    levelNumber: 2,
    title: 'ด่าน 2: ส่ายหางดุ๊กดิ๊กเหมือนลูกเป็ด',
    actionName: 'เป็ดน้อยร่าเริง',
    actionEmoji: '🦆',
    movementSteps: [
      '1. กางปีกเป็ดไว้ที่เอว',
      '2. ย่อเข่าลงเล็กน้อย',
      '3. ส่ายสะโพกซ้าย-ขวา ดุ๊กดิ๊ก ก้าบ ก้าบ',
    ],
    targetRounds: 6,
    durationSec: 15,
    voicePrompt: 'ทำท่าลูกเป็ดน้อย กางปีกก้าบๆ ย่อตัวแล้วส่ายเอวดุ๊กดิ๊กไปพร้อมๆ กันจ้า!',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'เสริมสร้างความยืดหยุ่นของข้อต่อสะโพก กล้ามเนื้อแกนกลาง และอารมณ์ร่าเริง',
  },
  {
    id: 'k1-3',
    grade: 'K1',
    levelNumber: 3,
    title: 'ด่าน 3: กบเขียวกระโดด อ๊บ อ๊บ',
    actionName: 'กบน้อยกระโดด',
    actionEmoji: '🐸',
    movementSteps: [
      '1. นั่งยองๆ สองมือแตะพื้น',
      '2. กระโดดพุ่งขึ้นแล้วร้อง อ๊บ!',
      '3. ลงสู่ท่านั่งยองอย่างนิ่มนวล',
    ],
    targetRounds: 5,
    durationSec: 15,
    voicePrompt: 'นั่งยองๆ มือแตะพื้น แล้วดีดตัวกระโดด อ๊บ อ๊บ สูงๆ เลยจ้า!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'พัฒนากล้ามเนื้อต้นขา น่อง และแรงสปริงตัวของข้อต่อ',
  },
  {
    id: 'k1-4',
    grade: 'K1',
    levelNumber: 4,
    title: 'ด่าน 4: กระพือปีกผีเสื้อร่อนลม',
    actionName: 'ผีเสื้อแสนสวย',
    actionEmoji: '🦋',
    movementSteps: [
      '1. กางแขนสองข้างกว้างๆ',
      '2. ขยับแขนขึ้นลงช้าๆ พลิ้วไหว',
      '3. เดินเขย่งปลายเท้าวนเบาๆ',
    ],
    targetRounds: 6,
    durationSec: 15,
    voicePrompt: 'กางแขนกว้างๆ โบกบินเหมือนผีเสื้อร่อนลม เขย่งเท้าเบาๆ นะจ๊ะ',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'พัฒนาการควบคุมกล้ามเนื้อไหล่ แขน และการทรงตัวบนปลายเท้า',
  },
  {
    id: 'k1-5',
    grade: 'K1',
    levelNumber: 5,
    title: 'ด่าน 5: แกว่งงวงช้าง ร้องแป๋นๆ',
    actionName: 'ช้างน้อยเดินชิล',
    actionEmoji: '🐘',
    movementSteps: [
      '1. ประสานสองมือเป็นงวงช้างยาว',
      '2. แกว่งงวงซ้าย-ขวาอย่างสบายใจ',
      '3. ย่ำเท้าตามจังหวะช้าๆ',
    ],
    targetRounds: 6,
    durationSec: 18,
    voicePrompt: 'ประสานสองมือเป็นงวงช้าง แกว่งไปซ้าย แกว่งไปขวา แล้วย่ำเท้าจ้า!',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ฝึกการหมุนของลำตัวส่วนบนและจังหวะก้าวเท้าที่สม่ำเสมอ',
  },
  {
    id: 'k1-6',
    grade: 'K1',
    levelNumber: 6,
    title: 'ด่าน 6: ลิงจ๋อยกมือเกาหัวกระโดดดึ๋ง',
    actionName: 'ลิงจ๋อขี้เล่น',
    actionEmoji: '🐒',
    movementSteps: [
      '1. มือขวาเกาหัว มือซ้ายจับเอว',
      '2. กระโดดสองเท้าดึ๋ง ดึ๋ง',
      '3. สลับมือแล้วร้อง เจี๊ยก เจี๊ยก',
    ],
    targetRounds: 6,
    durationSec: 16,
    voicePrompt: 'ทำท่าลิงจ๋อ เกาหัวดุ๊กดิ๊ก กระโดดสองเท้า เจี๊ยก เจี๊ยก สนุกจัง!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'ส่งเสริมการขยับร่างกายข้ามแกนกลางและอารมณ์ขันสดชื่น',
  },
  {
    id: 'k1-7',
    grade: 'K1',
    levelNumber: 7,
    title: 'ด่าน 7: หมุนแขนพายเรือใบกลางทะเล',
    actionName: 'พายเรือใบ',
    actionEmoji: '⛵',
    movementSteps: [
      '1. นั่งตัวตรงบนพื้น ยื่นขาสองข้าง',
      '2. ก้มตัวเอื้อมมือไปข้างหน้า',
      '3. ดึงแขนกลับเข้าหาตัวเหมือนพายเรือ',
    ],
    targetRounds: 6,
    durationSec: 18,
    voicePrompt: 'นั่งลงแล้วเอื้อมมือดึงพายเรือ จ้ำอึ๊ก จ้ำอึ๊ก ไปเกาะสมบัติกันนะจ๊ะ',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ยืดเหยียดกล้ามเนื้อหลัง ขา และเสริมความแข็งแรงของแขน',
  },
  {
    id: 'k1-8',
    grade: 'K1',
    levelNumber: 8,
    title: 'ด่าน 8: ปั่นจักรยานอากาศนอนหงาย',
    actionName: 'ปั่นจักรยานอากาศ',
    actionEmoji: '🚲',
    movementSteps: [
      '1. นอนหงายบนเสื่อ ยกขาสองข้างขึ้น',
      '2. ถีบขาสลับกันเหมือนปั่นจักรยาน',
      '3. หายใจเข้าออกสม่ำเสมอ',
    ],
    targetRounds: 8,
    durationSec: 16,
    voicePrompt: 'นอนหงายสบายๆ ยกขาขึ้นแล้วปั่นจักรยานอากาศวนไปตามเพลงเลยจ้า',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'พัฒนากล้ามเนื้อหน้าท้อง สะโพก และการสลับการทำงานของขาทั้งสองข้าง',
  },
  {
    id: 'k1-9',
    grade: 'K1',
    levelNumber: 9,
    title: 'ด่าน 9: เดินย่องเบาๆ เหมือนแมวเหมียว',
    actionName: 'แมวน้อยย่องเบา',
    actionEmoji: '🐱',
    movementSteps: [
      '1. ย่อเข่า ก้าวเท้าเงียบกริบ',
      '2. ยกมือกรงเล็บข้างแก้ม เหมียวๆ',
      '3. เดินย่องไปข้างหน้า 4 ก้าว',
    ],
    targetRounds: 5,
    durationSec: 15,
    voicePrompt: 'เดินย่องเบาๆ ปลายเท้าแตะพื้นเงียบสนิทเหมือนเจ้าเหมียวซุ่มจับหนูจ้า',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ฝึกการควบคุมแรงกดของเท้าและการเคลื่อนไหวที่เงียบและมีสมาธิ',
  },
  {
    id: 'k1-10',
    grade: 'K1',
    levelNumber: 10,
    title: 'ด่าน 10: ย่ำเท้าเปาะแปะ ลูกหมาดีใจ',
    actionName: 'ลูกหมาดีใจ',
    actionEmoji: '🐶',
    movementSteps: [
      '1. ย่ำเท้าอยู่กับที่เร็วๆ ตึกๆๆ',
      '2. โบกมือกระดิกหางโฮ่งๆ',
      '3. กระโดดหมุนครึ่งรอบยิ้มร่าเริง',
    ],
    targetRounds: 6,
    durationSec: 15,
    voicePrompt: 'ย่ำเท้าเร็วๆ ตึกๆๆ ทำมือหมาน้อยกระดิกหาง โฮ่ง โฮ่ง ดีใจใหญ่เลย!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'กระตุ้นอัตราการเต้นของหัวใจและความกระฉับกระเฉง',
  },
  {
    id: 'k1-11',
    grade: 'K1',
    levelNumber: 11,
    title: 'ด่าน 11: ย่อเข่าเก็บดอกไม้ช่อสวย',
    actionName: 'เก็บดอกไม้',
    actionEmoji: '🌸',
    movementSteps: [
      '1. ย่อตัวลงเก็บดอกไม้ที่พื้น',
      '2. ยืนขึ้นชูช่อดอกไม้ขึ้นฟ้า',
      '3. หายใจเข้าดมกลิ่นหอมชื่นใจ',
    ],
    targetRounds: 5,
    durationSec: 15,
    voicePrompt: 'ย่อเข่าลงเก็บดอกไม้ ยืนขึ้นชูขึ้นฟ้า แล้วสูดกลิ่นหอมชื่นใจนะจ๊ะ',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ฝึกการเคลื่อนไหวแนวดิ่ง ท่าก้ม-ยืนที่ถูกสุขลักษณะ',
  },
  {
    id: 'k1-12',
    grade: 'K1',
    levelNumber: 12,
    title: 'ด่าน 12: ยืดตัวสูงแตะเมฆบนฟ้า',
    actionName: 'แตะปุยเมฆ',
    actionEmoji: '☁️',
    movementSteps: [
      '1. เขย่งปลายเท้าทั้งสองข้าง',
      '2. ชูแขนสองข้างยืดขึ้นสุดแขน',
      '3. เอื้อมคว้าปุยเมฆนุ่มนิ่ม',
    ],
    targetRounds: 5,
    durationSec: 15,
    voicePrompt: 'เขย่งปลายเท้า ยืดตัวสูงๆ สองมือเอื้อมแตะก้อนเมฆสีขาวบนท้องฟ้าจ้า',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ยืดกระดูกสันหลัง เพิ่มการทรงตัวบนปลายเท้าและกล้ามเนื้อน่อง',
  },
  {
    id: 'k1-13',
    grade: 'K1',
    levelNumber: 13,
    title: 'ด่าน 13: กางแขนเป็นเครื่องบินเหินฟ้า',
    actionName: 'เครื่องบินน้อย',
    actionEmoji: '✈️',
    movementSteps: [
      '1. กางแขนออกข้างตรงระดับไหล่',
      '2. เอียงตัวซ้าย เอียงตัวขวา',
      '3. ร่อนตัวไปข้างหน้าเบาๆ',
    ],
    targetRounds: 6,
    durationSec: 16,
    voicePrompt: 'กางปีกเครื่องบิน เอียงซ้าย ฟิ้ว เอียงขวา ฟิ้ว เหินข้ามภูเขากันเลย!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'ฝึกการทรงตัวและการเอียงตัวตามระนาบด้านข้าง (Vestibular stimulation)',
  },
  {
    id: 'k1-14',
    grade: 'K1',
    levelNumber: 14,
    title: 'ด่าน 14: โยกตัวซ้ายขวาตามกระดิ่ง',
    actionName: 'กระดิ่งดุ๊กดิ๊ก',
    actionEmoji: '🔔',
    movementSteps: [
      '1. มือเท้าสะเอว แยกเท้าเท่าช่วงไหล่',
      '2. โยกสะโพกไปซ้าย กรุ๊ง',
      '3. โยกสะโพกไปขวา กริ๊ง',
    ],
    targetRounds: 8,
    durationSec: 16,
    voicePrompt: 'มือเท้าสะเอว โยกสะโพกซ้าย กรุ๊ง โยกสะโพกขวา กริ๊ง ดุ๊กดิ๊กตามจังหวะจ้า',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'เสริมความยืดหยุ่นของกระดูกเชิงกรานและการจับจังหวะสม่ำเสมอ',
  },
  {
    id: 'k1-15',
    grade: 'K1',
    levelNumber: 15,
    title: 'ด่าน 15: กระต่ายหูยาวกระโดดสองเท้า',
    actionName: 'กระต่ายหูยาว',
    actionEmoji: '🐰',
    movementSteps: [
      '1. ทำมือสองข้างเป็นหูกระต่ายบนหัว',
      '2. ย่อเข่าเล็กน้อย',
      '3. กระโดดสองเท้าพร้อมกันไปข้างหน้า ดึ๋ง',
    ],
    targetRounds: 6,
    durationSec: 16,
    voicePrompt: 'ชูหูกระต่ายขึ้นมา ย่อเข่าแล้วกระโดดดึ๋งไปข้างหน้าอย่างพร้อมเพรียงจ้า',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'เสริมพลังการกระโดดสองเท้าพร้อมกัน (Bilateral jumping)',
  },
  {
    id: 'k1-16',
    grade: 'K1',
    levelNumber: 16,
    title: 'ด่าน 16: ว่ายน้ำท่ากบสำรวจใต้ทะเล',
    actionName: 'ว่ายน้ำท่ากบ',
    actionEmoji: '🐠',
    movementSteps: [
      '1. สองมือประกบที่หน้าอก',
      '2. วาดมือสองข้างออกเป็นวงกลม',
      '3. เป่าลมฟู่ๆ เหมือนฟองอากาศ',
    ],
    targetRounds: 6,
    durationSec: 16,
    voicePrompt: 'วาดสองมือว่ายน้ำออกกว้างๆ สูดหายใจลึกแล้วเป่าลมฟองสบู่ฟู่ๆ นะจ๊ะ',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ฝึกการประสานงานของแขนทั้งสองข้างและการควบคุมลมหายใจ',
  },
  {
    id: 'k1-17',
    grade: 'K1',
    levelNumber: 17,
    title: 'ด่าน 17: เดินตัวตรงหลังตรงสง่างาม',
    actionName: 'เดินหลังตรง',
    actionEmoji: '📚',
    movementSteps: [
      '1. ยืนหลังตรง อกผาย ไหล่ผึ่ง',
      '2. ก้าวเท้าตรงไปข้างหน้าอย่างช้าๆ',
      '3. แขนแกว่งแนบลำตัวอย่างมั่นคง',
    ],
    targetRounds: 5,
    durationSec: 15,
    voicePrompt: 'จินตนาการว่าถือมงกุฎบนหัว เดินหลังตรง ก้าวเท้าสง่างามยอดเยี่ยมจ้า',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ปรับสรีระโครงสร้างบุคลิกภาพและการทรงตัวแนวดิ่ง',
  },
  {
    id: 'k1-18',
    grade: 'K1',
    levelNumber: 18,
    title: 'ด่าน 18: แกล้งหลับนิ่งแล้วตื่นมาเฮ!',
    actionName: 'หลับ & เฮ',
    actionEmoji: '😴',
    movementSteps: [
      '1. ย่อตัวลงกอดเข่า แกล้งหลับนิ่งสนิท',
      '2. นับ 1 2 3 ในใจ',
      '3. ลุกพรวดขึ้นชูมือสองข้าง ร้อง เฮ้!',
    ],
    targetRounds: 5,
    durationSec: 16,
    voicePrompt: 'ย่อตัวกอดเข่าหลับตาฟี้... พอบอก 3 2 1 ลุกขึ้นชูมือร้อง เฮ้ ดังๆ เลยจ้า!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'ฝึกการเปลี่ยนระดับความตื่นตัวของร่างกาย (Arousal state transition)',
  },
  {
    id: 'k1-19',
    grade: 'K1',
    levelNumber: 19,
    title: 'ด่าน 19: ตีกลองตุ้มต่อมบนหน้าตัก',
    actionName: 'ตีกลองตุ้มต่อม',
    actionEmoji: '🥁',
    movementSteps: [
      '1. นั่งหลังตรง สองมือวางบนตัก',
      '2. ตีตักสลับซ้าย-ขวา ตุ้ม-ต่อม',
      '3. ปรบมือ 1 ครั้ง แปะ!',
    ],
    targetRounds: 8,
    durationSec: 16,
    voicePrompt: 'ตีตักซ้าย ขวา ตุ้ม ต่อม แล้วปรบมือแปะ ตามจังหวะดนตรีเลยนะเด็กๆ',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'พัฒนาจังหวะสลับซ้าย-ขวา และการควบคุมความแรงของมือ',
  },
  {
    id: 'k1-20',
    grade: 'K1',
    levelNumber: 20,
    title: 'ด่าน 20: ยิ้มหวานชูมือหมุนรอบตัวดาวทอง',
    actionName: 'ดาวทองฉลองชัย',
    actionEmoji: '🌟',
    movementSteps: [
      '1. ชูสองมือขึ้นฟ้า ยิ้มหวาน',
      '2. หมุนตัว 1 รอบช้าๆ อย่างนุ่มนวล',
      '3. กระโดดตบมือฉลองชัยชนะ อ.1!',
    ],
    targetRounds: 5,
    durationSec: 15,
    voicePrompt: 'ด่านสุดท้าย อ.1 ชูมือยิ้มหวาน หมุนตัว 1 รอบ แล้วตบมือรับดาวทองเลยจ้า!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'บูรณาการการเคลื่อนไหวรอบทิศทางและความภาคภูมิใจในตนเอง',
  },

  // ================= K2 (อ.2) - 20 ด่าน =================
  {
    id: 'k2-1',
    grade: 'K2',
    levelNumber: 1,
    title: 'ด่าน 1: ย่ำเท้าตึงตัง ช้างน้อยเดินป่า',
    actionName: 'ย่ำเท้าช้างน้อย',
    actionEmoji: '🐘',
    movementSteps: [
      '1. ยกเข่าสูง ย่ำเท้าซ้าย-ขวา ตึง! ตัง!',
      '2. ทำมือเป็นงวงช้าง แกว่งไปข้างหน้า',
      '3. หายใจเข้าลึกๆ ย่ำจังหวะหนักแน่น',
    ],
    targetRounds: 8,
    durationSec: 20,
    voicePrompt: 'ยกเข่าสูงๆ ย่ำเท้าตึง ตัง เหมือนพี่ช้างตัวโตเดินสำรวจป่าใหญ่เลยนะเด็กๆ!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'พัฒนากล้ามเนื้อต้นขา ความแข็งแรงของข้อเท้า และการควบคุมน้ำหนักตัว',
  },
  {
    id: 'k2-2',
    grade: 'K2',
    levelNumber: 2,
    title: 'ด่าน 2: นกกระเรียนทรงตัวขาเดียว 5 วิ',
    actionName: 'นกกระเรียนทรงตัว',
    actionEmoji: '🦩',
    movementSteps: [
      '1. กางแขนออกสองข้างเหมือนปีกนก',
      '2. ยกขาซ้ายขึ้นช้าๆ ทรงตัวนิ่งๆ',
      '3. นับ 1 ถึง 5 แล้วสลับข้างนะจ๊ะ',
    ],
    targetRounds: 5,
    durationSec: 20,
    voicePrompt: 'กางปีกกว้างๆ ยกขาขึ้นหนึ่งข้าง ทรงตัวให้นิ่งเหมือนรูปปั้นนกกระเรียนนะจ๊ะ!',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ฝึกการทรงตัว ระบบประสาทการรับรู้ตำแหน่งข้อต่อ (Proprioception) และสมาธิ',
  },
  {
    id: 'k2-3',
    grade: 'K2',
    levelNumber: 3,
    title: 'ด่าน 3: ก้าวชิดก้าว ปูทะเลเดินเฉียง',
    actionName: 'ปูเดินเฉียง',
    actionEmoji: '🦀',
    movementSteps: [
      '1. ย่อเข่าเล็กน้อย ทำมือก้ามปู แป๊กๆ',
      '2. ก้าวขาขวา ชิดขาซ้าย ไปทางขวา 3 ก้าว',
      '3. สลับเดินไปทางซ้าย 3 ก้าว',
    ],
    targetRounds: 6,
    durationSec: 20,
    voicePrompt: 'ทำมือก้ามปู ย่อตัวลง เดินก้าวชิดก้าวไปด้านข้างเหมือนพี่ปูทะเลจ้า',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'พัฒนากล้ามเนื้อต้นขาด้านนอกและด้านในและการเคลื่อนไหวระนาบข้าง',
  },
  {
    id: 'k2-4',
    grade: 'K2',
    levelNumber: 4,
    title: 'ด่าน 4: กบแตะพื้นแล้วดีดตัวชูมือฟ้า',
    actionName: 'กบดีดตัวชูฟ้า',
    actionEmoji: '🐸',
    movementSteps: [
      '1. ย่อเข่า มือสองข้างแตะพื้น',
      '2. กระโดดพุ่งตัวขึ้นสุดแรง ชูมือแตะฟ้า',
      '3. ลงสู่ท่าย่ออย่างนุ่มนวล',
    ],
    targetRounds: 6,
    durationSec: 20,
    voicePrompt: 'ย่อแตะพื้นให้แน่น แล้วดีดตัวกระโดดขึ้นแตะท้องฟ้า ยอดเยี่ยมเลย!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'เสริมสร้างพลังกล้ามเนื้อขาและการขยายตัวของทรวงอก',
  },
  {
    id: 'k2-5',
    grade: 'K2',
    levelNumber: 5,
    title: 'ด่าน 5: กระโดดตบกางแขนกางขาแตะดาว',
    actionName: 'กระโดดแตะดาว',
    actionEmoji: '⭐️',
    movementSteps: [
      '1. ยืนเท้าชิด มือแนบลำตัว',
      '2. กระโดดกางแขนกางขาเป็นรูปดาว',
      '3. กระโดดกลับมาชิดเท้าตามจังหวะ',
    ],
    targetRounds: 8,
    durationSec: 20,
    voicePrompt: 'กระโดดกางแขนกางขาเป็นดาวประกายแสง แล้วหุบกลับช้าๆ ตามเพลงจ้า',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'พัฒนาการประสานงานของแขนขาพร้อมเพรียงและการควบคุมจังหวะ',
  },
  {
    id: 'k2-6',
    grade: 'K2',
    levelNumber: 6,
    title: 'ด่าน 6: ย่อเข่าสควอทนั่งเก้าอี้ลม',
    actionName: 'นั่งเก้าอี้ลอย',
    actionEmoji: '🪑',
    movementSteps: [
      '1. กางขายืนกว้างเท่าช่วงไหล่',
      '2. ยื่นแขนไปข้างหน้า ย่อเข่านั่งลงช้าๆ',
      '3. นิ่งไว้ 2 วินาที แล้วยืนขึ้นตรง',
    ],
    targetRounds: 6,
    durationSec: 20,
    voicePrompt: 'ยื่นแขนไปข้างหน้า ค่อยๆ นั่งลงบนเก้าอี้ลอยลม นิ่งไว้แล้วยืนขึ้นจ้า',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'เสริมความแข็งแกร่งของกล้ามเนื้อสะโพก เอ็นเข่า และกระดูกสันหลัง',
  },
  {
    id: 'k2-7',
    grade: 'K2',
    levelNumber: 7,
    title: 'ด่าน 7: วิ่งอยู่กับที่ 5 วิ แล้วแช่แข็ง!',
    actionName: 'วิ่งแล้วหยุดนิ่ง',
    actionEmoji: '🧊',
    movementSteps: [
      '1. วิ่งเหยาะๆ อยู่กับที่ นับ 1 2 3 4 5',
      '2. เมื่อได้ยินเสียงหยุด แช่แข็งนิ่งทันที!',
      '3. ยืนนิ่งห้ามกระดิกตา 3 วินาที',
    ],
    targetRounds: 5,
    durationSec: 22,
    voicePrompt: 'วิ่งเหยาะๆ 1 2 3 4 5 พอบอกหยุด แช่แข็งเป็นก้อนน้ำแข็งนิ่งสนิทเลยนะ!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'ฝึกการยับยั้งชั่งใจทางกายภาพ (Inhibition) และการเบรกของกล้ามเนื้อ',
  },
  {
    id: 'k2-8',
    grade: 'K2',
    levelNumber: 8,
    title: 'ด่าน 8: หมุนสะโพกฮูลาฮูปวงใหญ่',
    actionName: 'ฮูลาฮูปวงใหญ่',
    actionEmoji: '⭕',
    movementSteps: [
      '1. มือสองข้างจับที่เอว',
      '2. หมุนสะโพกเป็นวงกลมกว้างๆ ตามเข็ม',
      '3. หมุนทวนเข็มอีกรอบอย่างลื่นไหล',
    ],
    targetRounds: 6,
    durationSec: 18,
    voicePrompt: 'มือจับเอวไว้ หมุนสะโพกเป็นวงกลมใหญ่เหมือนเล่นฮูลาฮูปวิเศษจ้า',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'เสริมความยืดหยุ่นของข้อต่อสะโพกและกระดูกสันหลังส่วนเอว',
  },
  {
    id: 'k2-9',
    grade: 'K2',
    levelNumber: 9,
    title: 'ด่าน 9: แตะสลับ มือขวาแตะเข่าซ้าย',
    actionName: 'แตะเข่าสลับข้าง',
    actionEmoji: '🦵',
    movementSteps: [
      '1. ยกเข่าซ้ายขึ้น มือขวาแตะเข่าซ้าย',
      '2. วางลง ยกเข่าขวา มือซ้ายแตะเข่าขวา',
      '3. สลับข้างตามจังหวะเพลงอย่างคล่องแคล่ว',
    ],
    targetRounds: 8,
    durationSec: 20,
    voicePrompt: 'ยกเข่าสูง มือขวาแตะเข่าซ้าย มือซ้ายแตะเข่าขวา สลับข้างเก่งมาก!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'กระตุ้นการทำงานประสานของสมองสองซีกผ่านการเคลื่อนไหวข้ามแกนกลาง',
  },
  {
    id: 'k2-10',
    grade: 'K2',
    levelNumber: 10,
    title: 'ด่าน 10: เดินตามเส้นตรง ส้นเท้าต่อปลายเท้า',
    actionName: 'เดินต่อส้นเท้า',
    actionEmoji: '📏',
    movementSteps: [
      '1. กางแขนสองข้างช่วยทรงตัว',
      '2. วางส้นเท้าต่อชิดกับปลายเท้าอีกข้าง',
      '3. เดินตรงไปข้างหน้า 5 ก้าวอย่างมั่นคง',
    ],
    targetRounds: 5,
    durationSec: 20,
    voicePrompt: 'กางแขนออก เดินต่อส้นเท้าติดปลายเท้า รักษาการทรงตัวบนเส้นตรงนะจ๊ะ',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ฝึกการรับรู้ตำแหน่งร่างกายในที่แคบและการทรงตัวแบบ Tandem walk',
  },
  {
    id: 'k2-11',
    grade: 'K2',
    levelNumber: 11,
    title: 'ด่าน 11: สะพานโค้งก้มแตะปลายเท้า',
    actionName: 'ก้มแตะปลายเท้า',
    actionEmoji: '🤸',
    movementSteps: [
      '1. ยืนตรง ชูสองมือขึ้นฟ้า สูดหายใจเข้า',
      '2. ค่อยๆ ก้มตัวลง มือเอื้อมแตะปลายเท้า',
      '3. ยืนขึ้นช้าๆ ไม่ให้เวียนหัว',
    ],
    targetRounds: 5,
    durationSec: 20,
    voicePrompt: 'ชูมือขึ้นฟ้า สูดหายใจเข้า ค่อยๆ ก้มลงแตะปลายเท้านุ่มนวล แล้วยืนขึ้นจ้า',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ยืดเหยียดกล้ามเนื้อแฮมสตริง หลังส่วนล่าง และระบบหมุนเวียนเลือด',
  },
  {
    id: 'k2-12',
    grade: 'K2',
    levelNumber: 12,
    title: 'ด่าน 12: เตะสลับขาเบาๆ นักฟุตบอลน้อย',
    actionName: 'นักเตะแข้งทอง',
    actionEmoji: '⚽',
    movementSteps: [
      '1. ยืนมือเท้าสะเอว',
      '2. เตะขาซ้ายไปข้างหน้าช้าๆ',
      '3. วางลงแล้วเตะขาขวาสลับกัน',
    ],
    targetRounds: 8,
    durationSec: 18,
    voicePrompt: 'เตะขาซ้าย เตะขาขวา สลับกันเบาๆ เหมือนนักฟุตบอลฝึกเตะบอลเข้าประตูจ้า',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'พัฒนากล้ามเนื้อหน้าขาและการทรงตัวบนขาข้างเดียวชั่วขณะ',
  },
  {
    id: 'k2-13',
    grade: 'K2',
    levelNumber: 13,
    title: 'ด่าน 13: พายเรือคายัคหมุนแกนลำตัว',
    actionName: 'พายคายัค',
    actionEmoji: '🚣',
    movementSteps: [
      '1. ทำมือถือไม้พายยาวสองข้าง',
      '2. บิดเอวพายลงน้ำด้านซ้าย',
      '3. สลับบิดเอวพายลงน้ำด้านขวา',
    ],
    targetRounds: 8,
    durationSec: 20,
    voicePrompt: 'ถือไม้พายคายัค บิดลำตัวพายซ้าย แล้วบิดลำตัวพายขวา ลุยสายน้ำเชี่ยว!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'เสริมสร้างกล้ามเนื้อแกนกลางลำตัว (Core rotation) และแขน',
  },
  {
    id: 'k2-14',
    grade: 'K2',
    levelNumber: 14,
    title: 'ด่าน 14: เพนกวินกางแขนเดินโยกเยก',
    actionName: 'เพนกวินโยกเยก',
    actionEmoji: '🐧',
    movementSteps: [
      '1. แนบแขนชิดลำตัว แบมือออกข้างๆ',
      '2. เดินโยกตัวซ้าย-ขวา ก้าวสั้นๆ',
      '3. ร้องก้าบๆ เดินบนธารน้ำแข็ง',
    ],
    targetRounds: 6,
    durationSec: 18,
    voicePrompt: 'ทำท่าเพนกวินน้อย กางมือน้อยๆ เดินโยกเยกบนลานน้ำแข็งขั้วโลกจ้า',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ฝึกการถ่ายน้ำหนักจากซ้ายไปขวา (Weight shifting) อย่างมีจังหวะ',
  },
  {
    id: 'k2-15',
    grade: 'K2',
    levelNumber: 15,
    title: 'ด่าน 15: เดินถอยหลัง 4 ก้าวอย่างระวัง',
    actionName: 'เดินถอยหลังสติมา',
    actionEmoji: '🔙',
    movementSteps: [
      '1. กางแขนออกข้าง ยืนนิ่ง',
      '2. ค่อยๆ ก้าวถอยหลังทีละก้าว 1 2 3 4',
      '3. หยุดนิ่งพร้อมยิ้มอย่างปลอดภัย',
    ],
    targetRounds: 5,
    durationSec: 20,
    voicePrompt: 'มีสมาธิ ค่อยๆ ก้าวถอยหลัง 1 2 3 4 อย่างระมัดระวังรอบตัวนะจ๊ะ',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ฝึกการรับรู้ระยะด้านหลัง (Spatial awareness) และความระมัดระวัง',
  },
  {
    id: 'k2-16',
    grade: 'K2',
    levelNumber: 16,
    title: 'ด่าน 16: เขย่งขาเดียว 3 ดึ๋ง แล้วสลับ',
    actionName: 'เขย่งขาเดียวนักสู้',
    actionEmoji: '🦘',
    movementSteps: [
      '1. ยกขาขวาขึ้น เขย่งขาซ้าย 1 2 3',
      '2. สลับยกขาซ้าย เขย่งขาขวา 1 2 3',
      '3. ทรงตัวไม่ให้ล้ม',
    ],
    targetRounds: 6,
    durationSec: 20,
    voicePrompt: 'ยกขาข้างหนึ่ง เขย่งดึ๋งๆๆ 3 ครั้ง แล้วสลับข้างอย่างว่องไวเลยจ้า!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'เสริมสร้างความแข็งแรงของข้อเท้าและกล้ามเนื้อขาข้างเดียว',
  },
  {
    id: 'k2-17',
    grade: 'K2',
    levelNumber: 17,
    title: 'ด่าน 17: ท่าต้นไม้ทรงตัวรับสายลม',
    actionName: 'ต้นไม้สงบนิ่ง',
    actionEmoji: '🌳',
    movementSteps: [
      '1. ยืนขาเดียว ฝ่าเท้าอีกข้างแตะข้อเท้า',
      '2. พนมมือที่หน้าอกหรือชูขึ้นเป็นกิ่งไม้',
      '3. นิ่งไว้ 5 วินาที สูดลมหายใจชื่นใจ',
    ],
    targetRounds: 5,
    durationSec: 20,
    voicePrompt: 'ทำท่าต้นไม้ใหญ่ ยกขาแตะข้อเท้า พนมมือหรือชูเป็นกิ่งไม้ สงบนิ่งจ้า',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ฝึกสมาธิแน่วแน่ ความสงบทางอารมณ์ และการทรงตัวระดับสูง',
  },
  {
    id: 'k2-18',
    grade: 'K2',
    levelNumber: 18,
    title: 'ด่าน 18: เสือน้อยคลานลอดถ้ำสี่ขา',
    actionName: 'คลานสี่ขาเสือน้อย',
    actionEmoji: '🐯',
    movementSteps: [
      '1. วางมือสองข้างและเข่าสองข้างบนพื้น',
      '2. คลานสลับมือและเข่าไปข้างหน้า 4 ก้าว',
      '3. ส่งเสียงคำราม โฮก เบาๆ',
    ],
    targetRounds: 5,
    durationSec: 20,
    voicePrompt: 'วางมือและเข่าลง คลานสลับแขนขาเหมือนลูกเสือสำรวจถ้ำ โฮก!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'กระตุ้นข้อต่อไหล่ สะโพก และพัฒนาการเคลื่อนไหวแบบทแยงมุม (Cross-crawl)',
  },
  {
    id: 'k2-19',
    grade: 'K2',
    levelNumber: 19,
    title: 'ด่าน 19: รำวงมาตรฐาน กรายมืองดงาม',
    actionName: 'รำวงไทยงามสง่า',
    actionEmoji: '🪕',
    movementSteps: [
      '1. ก้าวชิดก้าวตามจังหวะโทน-ทับ',
      '2. จีบมือข้างหนึ่ง ตั้งวงมืออีกข้าง',
      '3. ย่อเข่าสลับมือร่ายรำอย่างอ่อนช้อย',
    ],
    targetRounds: 6,
    durationSec: 22,
    voicePrompt: 'ก้าวเท้าตามจังหวะ ร่ายรำกรายมือจีบสวยงามตามวัฒนธรรมไทยจ้า',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ส่งเสริมความอ่อนช้อย จังหวะดนตรีไทย และการเคลื่อนไหวพหุระบบ',
  },
  {
    id: 'k2-20',
    grade: 'K2',
    levelNumber: 20,
    title: 'ด่าน 20: หมุนตัวรอบทิศแล้วก้มคำนับรับมงกุฎ',
    actionName: 'คำนับรับมงกุฎ อ.2',
    actionEmoji: '👑',
    movementSteps: [
      '1. เดินวนเป็นวงกลม 4 ก้าว',
      '2. หมุนตัว 1 รอบช้าๆ อย่างสง่างาม',
      '3. ก้มคำนับรับมงกุฎแห่งความเก่งกาจ!',
    ],
    targetRounds: 5,
    durationSec: 20,
    voicePrompt: 'ด่านสุดท้าย อ.2 หมุนตัว 1 รอบสง่างาม แล้วโค้งคำนับรับมงกุฎเก่งกาจเลยจ้า!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'เชื่อมโยงทักษะการทรงตัว การหมุนตัว และความภาคภูมิใจในความพยายาม',
  },

  // ================= K3 (อ.3) - 20 ด่าน =================
  {
    id: 'k3-1',
    grade: 'K3',
    levelNumber: 1,
    title: 'ด่าน 1: วิ่งเหยาะแตะส้นเท้า & ชูมือแตะฟ้า',
    actionName: 'นักกรีฑาน้อย',
    actionEmoji: '🏃',
    movementSteps: [
      '1. วิ่งเหยาะๆ อยู่กับที่ 4 ก้าว (1 2 3 4)',
      '2. กระโดดกางแขนกางขาแตะดาว (Jumping Jack)',
      '3. ทำซ้ำตามจังหวะเพลงอย่างคล่องแคล่ว',
    ],
    targetRounds: 8,
    durationSec: 25,
    voicePrompt: 'วิ่งเหยาะๆ 1 2 3 4 แล้วกระโดดแตะดาวบนฟ้าอย่างกระฉับกระเฉงเลยจ้า!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'เสริมสร้างสมรรถภาพหัวใจ ปอด และความคล่องแคล่วว่องไวของร่างกายทุกส่วน',
  },
  {
    id: 'k3-2',
    grade: 'K3',
    levelNumber: 2,
    title: 'ด่าน 2: หมุนตัว 1 รอบ แล้วแช่แข็งเป็นรูปปั้น!',
    actionName: 'หมุนตัว & หยุดนิ่ง',
    actionEmoji: '💃',
    movementSteps: [
      '1. เดินวนเป็นวงกลม 3 ก้าว',
      '2. หมุนตัว 1 รอบช้าๆ อย่างมั่นคง',
      '3. เมื่อเสียงหยุด แช่แข็งนิ่งเป็นรูปปั้น!',
    ],
    targetRounds: 6,
    durationSec: 20,
    voicePrompt: 'หมุนตัว 1 รอบอย่างระมัดระวัง แล้วหยุดนิ่งสนิท ห้ามขยับตัวเด็ดขาดนะจ๊ะ!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'ฝึกระบบควบคุมการยับยั้งตนเอง (Motor Inhibition) และการทรงตัวหลังการหมุน',
  },
  {
    id: 'k3-3',
    grade: 'K3',
    levelNumber: 3,
    title: 'ด่าน 3: ก้าวกระโดดเข่าสูงแตะฝ่ามือ',
    actionName: 'เข่าสูงแตะมือ',
    actionEmoji: '🦵',
    movementSteps: [
      '1. ตั้งฝ่ามือสองข้างระดับเอว',
      '2. ยกเข่าซ้ายขึ้นแตะฝ่ามือซ้าย',
      '3. สลับยกเข่าขวาขึ้นแตะฝ่ามือขวาจังหวะกระฉับกระเฉง',
    ],
    targetRounds: 10,
    durationSec: 22,
    voicePrompt: 'ตั้งฝ่ามือไว้ที่เอว ยกเข่าสูงแตะฝ่ามือ ตึ๊ก ตั๊ก สลับซ้ายขวาอย่างว่องไว!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'เพิ่มพลังกล้ามเนื้องอสะโพก (Hip flexors) และความคล่องตัวของขา',
  },
  {
    id: 'k3-4',
    grade: 'K3',
    levelNumber: 4,
    title: 'ด่าน 4: ทรงตัวนักบินร่อนเครื่องบิน (Airplane pose)',
    actionName: 'เครื่องบินร่อนลม',
    actionEmoji: '✈️',
    movementSteps: [
      '1. ยืนขาเดียว กางแขนสองข้างออก',
      '2. โน้มตัวไปข้างหน้า เหยียดขาอีกข้างไปข้างหลัง',
      '3. ทรงตัวขนานพื้นให้นิ่ง 5 วินาที แล้วสลับข้าง',
    ],
    targetRounds: 5,
    durationSec: 25,
    voicePrompt: 'กางปีกเครื่องบิน โน้มตัวไปข้างหน้า ยกขาหลังขนานพื้น ทรงตัวนิ่งสนิทจ้า!',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'ฝึกกล้ามเนื้อหลัง ขาด้านหลัง และการทรงตัวขั้นสูงแบบ Dynamic balance',
  },
  {
    id: 'k3-5',
    grade: 'K3',
    levelNumber: 5,
    title: 'ด่าน 5: กระโดดสลับเท้าหน้าหลัง (Scissor jumps)',
    actionName: 'กรรไกรกระโดด',
    actionEmoji: '✂️',
    movementSteps: [
      '1. เท้าซ้ายอยู่หน้า เท้าขวาอยู่หลัง',
      '2. กระโดดสลับเท้าขวามาหน้า เท้าซ้ายไปหลัง',
      '3. แกว่งแขนตรงข้ามตามธรรมชาติ',
    ],
    targetRounds: 8,
    durationSec: 20,
    voicePrompt: 'กระโดดสลับเท้าหน้าหลังเหมือนขากรรไกร แกว่งแขนคล่องแคล่วตามจังหวะ!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'ส่งเสริมการแยกการทำงานของขาสองข้าง (Reciprocal leg coordination)',
  },
  {
    id: 'k3-6',
    grade: 'K3',
    levelNumber: 6,
    title: 'ด่าน 6: กระโดดหมุน 90 องศาตามเข็ม',
    actionName: 'กระโดดหมุน 4 ทิศ',
    actionEmoji: '🧭',
    movementSteps: [
      '1. ยืนหันหน้าตรง ย่อเข่าเล็กน้อย',
      '2. กระโดดหมุนตัว 90 องศาไปทางขวา',
      '3. ทำซ้ำ 4 ครั้งจนครบรอบวงกลม',
    ],
    targetRounds: 6,
    durationSec: 22,
    voicePrompt: 'ย่อเข่า กระโดดหมุนไปทางขวา กระโดดหมุน 4 ครั้งให้ครบวงกลมเลยจ้า!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'พัฒนาการกะระยะเชิงพื้นที่ (Spatial orientation) และแรงสปริงตัวของข้อต่อ',
  },
  {
    id: 'k3-7',
    grade: 'K3',
    levelNumber: 7,
    title: 'ด่าน 7: ย่อลันจ์ก้าวไปข้างหน้าสลับซ้ายขวา',
    actionName: 'ก้าวลันจ์ทรงพลัง',
    actionEmoji: '🚶',
    movementSteps: [
      '1. ก้าวเท้าขวาไปข้างหน้า ย่อเข่าลง 90 องศา',
      '2. ดันตัวกลับมายืนตรง',
      '3. สลับก้าวเท้าซ้ายไปข้างหน้าแล้วย่อลง',
    ],
    targetRounds: 8,
    durationSec: 25,
    voicePrompt: 'ก้าวเท้าไปข้างหน้า ย่อเข่าลงให้หลังตรง แล้วดันตัวกลับมาสลับข้างนะจ๊ะ',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'เสริมสร้างความแข็งแกร่งของกล้ามเนื้อต้นขา ก้น และข้อเข่าอย่างปลอดภัย',
  },
  {
    id: 'k3-8',
    grade: 'K3',
    levelNumber: 8,
    title: 'ด่าน 8: ท่าซูเปอร์ฮีโร่บินลอยฟ้า',
    actionName: 'ซูเปอร์ฮีโร่เหินฟ้า',
    actionEmoji: '🦸',
    movementSteps: [
      '1. นอนคว่ำบนเสื่อ',
      '2. ยกแขนสองข้างและขาสองข้างลอยขึ้นจากพื้น',
      '3. ทำท่าเหินฟ้าค้างไว้ 3 วินาที แล้วพัก',
    ],
    targetRounds: 5,
    durationSec: 22,
    voicePrompt: 'นอนคว่ำลง ยกแขนและขาลอยขึ้นเหมือนซูเปอร์ฮีโร่บินกู้โลก ค้างไว้แล้วลงจ้า',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'เสริมความแข็งแรงของกล้ามเนื้อหลังทั้งหมด (Posterior chain strengthening)',
  },
  {
    id: 'k3-9',
    grade: 'K3',
    levelNumber: 9,
    title: 'ด่าน 9: ปรบมือใต้เข่าสลับขาจังหวะเร็ว',
    actionName: 'ปรบมือใต้เข่า',
    actionEmoji: '👏',
    movementSteps: [
      '1. ยกเข่าขวาขึ้นสูง ปรบมือลอดใต้เข่าขวา แปะ!',
      '2. วางลง ยกเข่าซ้าย ปรบมือลอดใต้เข่าซ้าย แปะ!',
      '3. สลับตามจังหวะเพลงอย่างคล่องแคล่ว',
    ],
    targetRounds: 8,
    durationSec: 20,
    voicePrompt: 'ยกเข่าสูงๆ ปรบมือลอดใต้เข่า แปะ แปะ สลับซ้ายขวา สนุกมาก!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'ผสานการทำงานของความยืดหยุ่น ความแม่นยำ และความเร็วของมือและขา',
  },
  {
    id: 'k3-10',
    grade: 'K3',
    levelNumber: 10,
    title: 'ด่าน 10: สไลด์ข้างซ้ายขวาแตะพื้น',
    actionName: 'สไลด์ข้างแตะพื้น',
    actionEmoji: '🎪',
    movementSteps: [
      '1. สไลด์ตัวไปทางขวา 3 ก้าว ก้มแตะพื้น',
      '2. สไลด์ตัวกลับไปทางซ้าย 3 ก้าว ก้มแตะพื้น',
      '3. ขยับตัวว่องไวและกระฉับกระเฉง',
    ],
    targetRounds: 6,
    durationSec: 24,
    voicePrompt: 'สไลด์ไปทางขวาแตะพื้น แล้วสไลด์กลับไปทางซ้ายแตะพื้น ว่องไวปราดเปรียว!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'พัฒนาความคล่องตัวในการเปลี่ยนทิศทาง (Agility and lateral quickness)',
  },
  {
    id: 'k3-11',
    grade: 'K3',
    levelNumber: 11,
    title: 'ด่าน 11: กระโดดเชือกจำลองจังหวะต่อเนื่อง',
    actionName: 'กระโดดเชือกจำลอง',
    actionEmoji: '🪢',
    movementSteps: [
      '1. สองมือทำท่าหมุนด้ามเชือกข้างลำตัว',
      '2. กระโดดสองเท้าขึ้นเบาๆ สปริงข้อเท้า',
      '3. โดดต่อเนื่อง 10 ครั้งตามจังหวะเพลง',
    ],
    targetRounds: 8,
    durationSec: 22,
    voicePrompt: 'หมุนข้อมือกระโดดเชือกดึ๋งๆๆ ข้อเท้าสปริงตัวเบาๆ ต่อเนื่องเก่งมากจ้า',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'เสริมความทนทานของระบบหัวใจและกล้ามเนื้อน่อง',
  },
  {
    id: 'k3-12',
    grade: 'K3',
    levelNumber: 12,
    title: 'ด่าน 12: ปูทะเลคลานถอยหลัง (Crab walk)',
    actionName: 'ปูทะเลหงายท้อง',
    actionEmoji: '🦀',
    movementSteps: [
      '1. นั่งชันเข่า วางสองมือด้านหลังดันก้นลอยขึ้น',
      '2. เดินถอยหลังด้วยมือและเท้า 4 ก้าว',
      '3. เดินไปข้างหน้า 4 ก้าวอย่างแข็งแรง',
    ],
    targetRounds: 5,
    durationSec: 25,
    voicePrompt: 'ดันก้นลอยขึ้น ทำท่าปูทะเลเดินถอยหลังด้วยมือและเท้า แข็งแกร่งมาก!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'เสริมกล้ามเนื้อไหล่ ต้นแขนด้านหลัง (Triceps) และกล้ามเนื้อแกนกลาง',
  },
  {
    id: 'k3-13',
    grade: 'K3',
    levelNumber: 13,
    title: 'ด่าน 13: เขย่งปลายเท้าเดินบนเชือกวิเศษ',
    actionName: 'เขย่งไต่เชือก',
    actionEmoji: '🧗',
    movementSteps: [
      '1. กางแขนออกข้าง เขย่งปลายเท้าทั้งสองข้างสูงสุด',
      '2. ก้าวเดินช้าๆ ไปข้างหน้าโดยส้นเท้าไม่แตะพื้น',
      '3. เดินกลับหลังหันอย่างมั่นใจ',
    ],
    targetRounds: 5,
    durationSec: 20,
    voicePrompt: 'เขย่งปลายเท้าขึ้นสูงสุด กางแขนเดินบนเส้นเชือกวิเศษ นิ่งสงบยอดเยี่ยม!',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'เสริมสร้างความแข็งแรงของกล้ามเนื้อฝ่าเท้าและเอ็นร้อยหวาย',
  },
  {
    id: 'k3-14',
    grade: 'K3',
    levelNumber: 14,
    title: 'ด่าน 14: ชกลมวัน-ทู แล้วหลบซ้ายขวา',
    actionName: 'นักมวยน้อย',
    actionEmoji: '🥊',
    movementSteps: [
      '1. ตั้งการ์ดสองมือหน้าคาง',
      '2. ชกซ้าย-ขวา วัน-ทู!',
      '3. ย่อเข่าเอียงตัวหลบซ้าย เอียงตัวหลบขวา',
    ],
    targetRounds: 8,
    durationSec: 22,
    voicePrompt: 'ตั้งการ์ด ชก วัน ทู แล้วย่อหลบซ้าย ย่อหลบขวา ปราดเปรียวว่องไว!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'ฝึกการตอบสนองที่รวดเร็ว การบิดของลำตัว และการปกป้องตนเอง',
  },
  {
    id: 'k3-15',
    grade: 'K3',
    levelNumber: 15,
    title: 'ด่าน 15: ยกดัมเบลอากาศสร้างกล้ามพลัง',
    actionName: 'ยกดัมเบลพลังใจ',
    actionEmoji: '💪',
    movementSteps: [
      '1. กำมือสองข้าง ยืนตรง',
      '2. พับแขนยกมือขึ้นหาหัวไหล่ เกร็งกล้ามเนื้อ',
      '3. ดันแขนขึ้นเหนือหัว แล้วดึงกลับมาช้าๆ',
    ],
    targetRounds: 8,
    durationSec: 20,
    voicePrompt: 'กำมือสองข้าง ยกดัมเบลอากาศขึ้นไหล่ แล้วดันขึ้นเหนือหัว แข็งแรงสุดๆ!',
    musicTempo: 'จังหวะสนุกปานกลาง',
    benefitNote: 'ส่งเสริมการรับรู้การเกร็ง-คลายของกล้ามเนื้อแขนและหัวไหล่',
  },
  {
    id: 'k3-16',
    grade: 'K3',
    levelNumber: 16,
    title: 'ด่าน 16: ตีกลองชุดจำลอง มือและเท้าสลับกัน',
    actionName: 'มือกลองวงดนตรี',
    actionEmoji: '🥁',
    movementSteps: [
      '1. กระทืบเท้าขวา (กระเดื่องกลอง) ตึ้ง!',
      '2. มือซ้ายตีสแนร์ ป๊ะ!',
      '3. มือขวาตีฉาบ แฉ่ง! ผสมผสานตามจังหวะ',
    ],
    targetRounds: 8,
    durationSec: 22,
    voicePrompt: 'เท้าขวากระทืบตึ้ง มือซ้ายตีป๊ะ มือขวาตีแฉ่ง รวมเป็นวงดนตรีสุดมันส์!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'ฝึกการแยกประสาทแขนขาอิสระ 3 ทิศทาง (Polyrhythmic coordination)',
  },
  {
    id: 'k3-17',
    grade: 'K3',
    levelNumber: 17,
    title: 'ด่าน 17: ทรงตัวกระดานแพลงก์ 8 วินาที',
    actionName: 'สะพานไม้กระดาน',
    actionEmoji: '🧘',
    movementSteps: [
      '1. คว่ำตัวลง วางข้อศอกและปลายเท้าบนเสื่อ',
      '2. ดึงลำตัวตรงเป็นแผ่นกระดาน ไม่งอหลัง',
      '3. หายใจเข้าออกสม่ำเสมอ นับ 1 ถึง 8',
    ],
    targetRounds: 5,
    durationSec: 25,
    voicePrompt: 'วางศอกและปลายเท้า ดึงตัวตรงเป็นสะพานกระดานไม้ นับ 1 ถึง 8 สู้ๆ นะเด็กๆ!',
    musicTempo: 'ช้าๆ นุ่มนวล',
    benefitNote: 'เสริมสร้างกล้ามเนื้อแกนกลางลำตัวทั้งหมด (Total core stabilization)',
  },
  {
    id: 'k3-18',
    grade: 'K3',
    levelNumber: 18,
    title: 'ด่าน 18: กระโดดซิกแซกข้ามสิ่งกีดขวาง',
    actionName: 'กระโดดซิกแซกสายฟ้า',
    actionEmoji: '⚡',
    movementSteps: [
      '1. ย่อเข่า กระโดดสองเท้าเฉียงไปข้างหน้าทางขวา',
      '2. กระโดดสองเท้าเฉียงไปข้างหน้าทางซ้าย',
      '3. กระโดดซิกแซกต่อเนื่อง 4 ครั้งอย่างแม่นยำ',
    ],
    targetRounds: 6,
    durationSec: 22,
    voicePrompt: 'ย่อเข่า กระโดดสองเท้าซิกแซกเฉียงขวา เฉียงซ้าย ข้ามสิ่งกีดขวางคล่องแคล่ว!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'พัฒนาแรงดีดด้านข้าง (Lateral plyometrics) และการดูดซับแรงกระแทก',
  },
  {
    id: 'k3-19',
    grade: 'K3',
    levelNumber: 19,
    title: 'ด่าน 19: เต้นระบำชาวเกาะจังหวะกลองเร็ว',
    actionName: 'ระบำชาวเกาะฮาวาย',
    actionEmoji: '🌺',
    movementSteps: [
      '1. ย่อเข่า ส่ายสะโพกซ้ายขวาอย่างรวดเร็ว',
      '2. วาดมือเป็นคลื่นทะเลพลิ้วไหว',
      '3. หมุนตัวครึ่งรอบแล้วยิ้มสดใส',
    ],
    targetRounds: 8,
    durationSec: 22,
    voicePrompt: 'ย่อเข่าส่ายสะโพกตามเสียงกลอง วาดมือคลื่นทะเล สดใสเบิกบานใจจ้า!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'กระตุ้นระบบเผาผลาญ ความยืดหยุ่น และความสุขในการแสดงออก',
  },
  {
    id: 'k3-20',
    grade: 'K3',
    levelNumber: 20,
    title: 'ด่าน 20: กายบริหารรวมมิตร 4 ท่าสู่แชมป์เปี้ยน',
    actionName: 'แชมป์เปี้ยนขยับกาย',
    actionEmoji: '🏆',
    movementSteps: [
      '1. วิ่งเหยาะ 4 ก้าว (1 2 3 4)',
      '2. กระโดดแตะดาว 1 ครั้ง (ดึ๋ง)',
      '3. ย่อเข่าแตะพื้น แล้วลุกขึ้นชูถ้วยรางวัลฉลองชัย!',
    ],
    targetRounds: 6,
    durationSec: 25,
    voicePrompt: 'ด่านสูงสุด อ.3 วิ่ง 4 ก้าว กระโดดแตะดาว ย่อแตะพื้น ชูถ้วยแชมป์เปี้ยนเลยจ้า!',
    musicTempo: 'คึกคักว่องไว',
    benefitNote: 'บูรณาการการเคลื่อนไหวทุกรูปแบบ สมาธิ และความภาคภูมิใจสูงสุด',
  },
];

export const RhythmGrossMotorView: React.FC<RhythmGrossMotorViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const [levelIndex, setLevelIndex] = useState(0);

  const gradeLevels = useMemo(() => {
    const list = GROSS_MOTOR_MISSIONS.filter((m) => m.grade === currentGrade);
    return list.length > 0 ? list : GROSS_MOTOR_MISSIONS;
  }, [currentGrade]);

  const activeMission = gradeLevels[levelIndex] || gradeLevels[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentRound(0);
    setIsCompleted(false);

    if (soundVolume > 0) {
      speakText(`${activeMission.title}. ${activeMission.voicePrompt}`, 'th', soundVolume);
    }
  }, [activeMission, soundVolume]);

  // Rhythm beat loop
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying && !isCompleted) {
      timer = setInterval(() => {
        setCurrentRound((prev) => {
          const next = prev + 1;
          soundEffects.playTap(soundVolume);

          if (next >= activeMission.targetRounds) {
            setIsCompleted(true);
            setIsPlaying(false);
            soundEffects.playVictory(soundVolume);
            if (onEarnStar) onEarnStar();
            confetti({ particleCount: 70, spread: 80, origin: { y: 0.55 } });
            speakText(
              `สุดยอดมากเลยลูก! ทำภารกิจ ${activeMission.actionName} ครบ ${activeMission.targetRounds} รอบแล้ว! ร่างกายแข็งแรงสุขภาพดีเยี่ยม!`,
              'th',
              soundVolume
            );
          }
          return next;
        });
      }, 2500);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, isCompleted, activeMission, soundVolume, onEarnStar]);

  const handleStartMission = () => {
    soundEffects.playTap(soundVolume);
    setIsPlaying(true);
    speakText('พร้อมแล้ว เริ่มขยับกายไปตามจังหวะเลยจ้า!', 'th', soundVolume);
  };

  const handlePauseMission = () => {
    soundEffects.playTap(soundVolume);
    setIsPlaying(false);
  };

  const handleReset = () => {
    soundEffects.playTap(soundVolume);
    setIsPlaying(false);
    setCurrentRound(0);
    setIsCompleted(false);
  };

  const handleNextLevel = () => {
    soundEffects.playTap(soundVolume);
    if (levelIndex < gradeLevels.length - 1) {
      setLevelIndex((prev) => prev + 1);
    } else {
      setLevelIndex(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
      {/* Level Selector */}
      <SkillGameLevelSelector
        levels={gradeLevels.map((m) => ({ level: m.levelNumber, name: m.title }))}
        currentLevel={levelIndex + 1}
        onSelectLevel={(num) => setLevelIndex(num - 1)}
        accentColor="emerald"
        prefix="ด่าน"
      />

      {/* Main Container */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-6 border-2 border-emerald-200 shadow-sm flex flex-col items-center gap-5">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-emerald-100 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-2xl shadow-2xs">
              🏃
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-emerald-950">
                {activeMission.title}
              </h2>
              <div className="text-xs text-emerald-700 font-bold">
                จังหวะดนตรี: {activeMission.musicTempo} • เป้าหมาย: {activeMission.targetRounds} รอบ
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => speakText(activeMission.voicePrompt, 'th', soundVolume)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 cursor-pointer"
            title="ฟังเสียงคำสั่ง"
          >
            <Volume2 className="w-4 h-4" />
            <span>ฟังเสียงโจทย์</span>
          </button>
        </div>

        {/* Action Showcase Hero Card */}
        <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-3xl p-5 border-2 border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div
              className={`w-24 h-24 rounded-3xl bg-white border-3 border-emerald-300 flex items-center justify-center text-6xl shadow-sm shrink-0 ${
                isPlaying ? 'animate-bounce' : ''
              }`}
            >
              {activeMission.actionEmoji}
            </div>

            <div>
              <div className="text-xs font-black text-emerald-800 bg-white/90 inline-block px-3 py-0.5 rounded-full border border-emerald-200 mb-1">
                ท่าทาง: {activeMission.actionName}
              </div>
              <p className="text-sm sm:text-base font-black text-slate-800">
                {activeMission.voicePrompt}
              </p>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {!isPlaying && !isCompleted && (
              <button
                type="button"
                onClick={handleStartMission}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm sm:text-base shadow-md transition-all cursor-pointer active:scale-95 animate-pulse"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>เริ่มขยับกาย 🚀</span>
              </button>
            )}

            {isPlaying && (
              <button
                type="button"
                onClick={handlePauseMission}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition-all cursor-pointer"
              >
                <Pause className="w-5 h-5" />
                <span>พักสักครู่</span>
              </button>
            )}

            {(currentRound > 0 || isCompleted) && (
              <button
                type="button"
                onClick={handleReset}
                className="p-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                title="เริ่มนับรอบใหม่"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Movement Steps Guidance List */}
        <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col gap-2">
          <div className="text-xs font-black text-slate-700">
            📋 ขั้นตอนการเคลื่อนไหวที่ถูกต้อง:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {activeMission.movementSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{step.replace(/^\d+\.\s*/, '')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Rhythm Meter */}
        <div className="w-full flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-black text-slate-700 px-1">
            <span>จำนวนรอบที่ทำได้:</span>
            <span className="text-emerald-700 text-sm">
              {currentRound} / {activeMission.targetRounds} รอบ
            </span>
          </div>

          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5">
            <div
              style={{
                width: `${Math.min(100, (currentRound / activeMission.targetRounds) * 100)}%`,
              }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-300"
            />
          </div>
        </div>

        {/* Completion Star Reward */}
        {isCompleted && (
          <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left animate-in zoom-in-95">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🌟</span>
              <div>
                <div className="font-black text-emerald-950 text-sm sm:text-base">
                  ยินดีด้วยจ้า! ขยับกายตามจังหวะสำเร็จ +1 ดาว ⭐
                </div>
                <div className="text-xs text-emerald-700 font-medium">
                  {activeMission.benefitNote}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextLevel}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              <span>ด่านต่อไป</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Educational Note on Gross Motor Skills */}
        <div className="w-full bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2 text-xs text-emerald-950 font-medium">
          <Activity className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>พัฒนากล้ามเนื้อมัดใหญ่ (Gross Motor Skills & Agility):</strong> การเคลื่อนไหวตามจังหวะดนตรีช่วยให้สมองเชื่อมโยงสัญญาณการได้ยินเข้ากับการสั่งการกล้ามเนื้อ ปลูกฝังสุขนิสัยรักการออกกำลังกายตั้งแต่ปฐมวัย
          </span>
        </div>
      </div>
    </div>
  );
};
