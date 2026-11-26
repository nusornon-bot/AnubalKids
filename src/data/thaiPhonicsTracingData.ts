import { TracingCheckpoint } from './handTracingData';

export interface ThaiVowelDef {
  char: string;
  name: string;
  subname: string;
  sound: string;
  shortLong: 'short' | 'long';
  checkpoints: TracingCheckpoint[];
}

export interface ThaiPhonicsWordDef {
  word: string;
  name: string;
  breakdown: string;
  unitId: string;
  unitName: string;
  emoji: string;
  checkpoints: TracingCheckpoint[];
}

/**
 * ๑๖ รูปสระพื้นฐานของภาษาไทย (หน่วยที่ ๒ สพฐ.) พร้อม Checkpoints สำหรับ Hand Tracking Air-Writing
 */
export const THAI_16_VOWELS_META: ThaiVowelDef[] = [
  {
    char: 'ะ',
    name: 'สระอะ',
    subname: 'สระเสียงสั้น (วิสรรชนีย์) 💧',
    sound: 'อะ สระเสียงสั้น เช่น กะ ปะ จะ',
    shortLong: 'short',
    checkpoints: [
      { order: 1, x: 45, y: 30, label: '1' },
      { order: 2, x: 55, y: 35, label: '2' },
      { order: 3, x: 45, y: 65, label: '3' },
      { order: 4, x: 55, y: 70, label: '4' },
    ],
  },
  {
    char: 'า',
    name: 'สระอา',
    subname: 'สระเสียงยาว (ลากข้าง) 🌂',
    sound: 'อา สระเสียงยาว เช่น กา ตา มา',
    shortLong: 'long',
    checkpoints: [
      { order: 1, x: 40, y: 20, label: '1' },
      { order: 2, x: 60, y: 25, label: '2' },
      { order: 3, x: 60, y: 55, label: '3' },
      { order: 4, x: 60, y: 85, label: '4' },
    ],
  },
  {
    char: 'ิ',
    name: 'สระอิ',
    subname: 'สระเสียงสั้น วางบนพยัญชนะ 🧢',
    sound: 'อิ สระเสียงสั้น เช่น บิด ปิด จิ',
    shortLong: 'short',
    checkpoints: [
      { order: 1, x: 30, y: 40, label: '1' },
      { order: 2, x: 50, y: 20, label: '2' },
      { order: 3, x: 70, y: 40, label: '3' },
      { order: 4, x: 30, y: 40, label: '4' },
    ],
  },
  {
    char: 'ี',
    name: 'สระอี',
    subname: 'สระเสียงยาว มี ๑ ขีดด้านบน ☂️',
    sound: 'อี สระเสียงยาว เช่น ดี ตี มี',
    shortLong: 'long',
    checkpoints: [
      { order: 1, x: 30, y: 40, label: '1' },
      { order: 2, x: 50, y: 20, label: '2' },
      { order: 3, x: 70, y: 40, label: '3' },
      { order: 4, x: 70, y: 15, label: '4' },
    ],
  },
  {
    char: 'ึ',
    name: 'สระอึ',
    subname: 'สระเสียงสั้น มีวงกลมเล็ก ⭕',
    sound: 'อึ สระเสียงสั้น เช่น ดึง ตึก ถึง',
    shortLong: 'short',
    checkpoints: [
      { order: 1, x: 30, y: 40, label: '1' },
      { order: 2, x: 50, y: 20, label: '2' },
      { order: 3, x: 70, y: 40, label: '3' },
      { order: 4, x: 65, y: 25, label: '4' },
    ],
  },
  {
    char: 'ื',
    name: 'สระอือ',
    subname: 'สระเสียงยาว มี ๒ ขีด ✌️',
    sound: 'อือ สระเสียงยาว เช่น มือ ถือ ยืม',
    shortLong: 'long',
    checkpoints: [
      { order: 1, x: 30, y: 40, label: '1' },
      { order: 2, x: 50, y: 20, label: '2' },
      { order: 3, x: 70, y: 40, label: '3' },
      { order: 4, x: 60, y: 15, label: '4' },
      { order: 5, x: 70, y: 15, label: '5' },
    ],
  },
  {
    char: 'ุ',
    name: 'สระอุ',
    subname: 'สระเสียงสั้น วางใต้พยัญชนะ ⚓',
    sound: 'อุ สระเสียงสั้น เช่น กุ ดุ ผุ',
    shortLong: 'short',
    checkpoints: [
      { order: 1, x: 50, y: 50, label: '1' },
      { order: 2, x: 45, y: 65, label: '2' },
      { order: 3, x: 50, y: 80, label: '3' },
    ],
  },
  {
    char: 'ู',
    name: 'สระอู',
    subname: 'สระเสียงยาว วางใต้พยัญชนะ 🐍',
    sound: 'อู สระเสียงยาว เช่น ดู ปู หู',
    shortLong: 'long',
    checkpoints: [
      { order: 1, x: 45, y: 55, label: '1' },
      { order: 2, x: 45, y: 75, label: '2' },
      { order: 3, x: 60, y: 75, label: '3' },
      { order: 4, x: 60, y: 55, label: '4' },
    ],
  },
  {
    char: 'เ',
    name: 'สระเอ',
    subname: 'สระเสียงยาว วางหน้าพยัญชนะ 🦒',
    sound: 'เอ สระเสียงยาว เช่น เก เท เวลา',
    shortLong: 'long',
    checkpoints: [
      { order: 1, x: 50, y: 75, label: '1' },
      { order: 2, x: 45, y: 65, label: '2' },
      { order: 3, x: 50, y: 25, label: '3' },
    ],
  },
  {
    char: 'แ',
    name: 'สระแอ',
    subname: 'สระเสียงยาว สระเอ ๒ ตัวคู่ 👯',
    sound: 'แอ สระเสียงยาว เช่น แก แพ แม่',
    shortLong: 'long',
    checkpoints: [
      { order: 1, x: 38, y: 75, label: '1' },
      { order: 2, x: 38, y: 25, label: '2' },
      { order: 3, x: 62, y: 75, label: '3' },
      { order: 4, x: 62, y: 25, label: '4' },
    ],
  },
  {
    char: 'โ',
    name: 'สระโอ',
    subname: 'สระเสียงยาว สูงชะลูดเกินบรรทัด 🌴',
    sound: 'โอ สระเสียงยาว เช่น โต โบ โพธิ์',
    shortLong: 'long',
    checkpoints: [
      { order: 1, x: 50, y: 75, label: '1' },
      { order: 2, x: 50, y: 20, label: '2' },
      { order: 3, x: 65, y: 15, label: '3' },
      { order: 4, x: 55, y: 35, label: '4' },
    ],
  },
  {
    char: 'ใ',
    name: 'สระใอม้วน',
    subname: 'สระเสียงสั้น ม้วนหัวกลม (๒๐ ม้วน) 🌀',
    sound: 'ไอ สระเสียงสั้น เช่น ใจ ใน ใหม่ ให้',
    shortLong: 'short',
    checkpoints: [
      { order: 1, x: 50, y: 75, label: '1' },
      { order: 2, x: 50, y: 20, label: '2' },
      { order: 3, x: 65, y: 20, label: '3' },
      { order: 4, x: 55, y: 30, label: '4' },
    ],
  },
  {
    char: 'ไ',
    name: 'สระไอไม้มลาย',
    subname: 'สระเสียงสั้น หยักปลายแหลม ⚡',
    sound: 'ไอ สระเสียงสั้น เช่น ไป ไก่ ไม้',
    shortLong: 'short',
    checkpoints: [
      { order: 1, x: 50, y: 75, label: '1' },
      { order: 2, x: 50, y: 25, label: '2' },
      { order: 3, x: 60, y: 15, label: '3' },
      { order: 4, x: 70, y: 25, label: '4' },
    ],
  },
  {
    char: 'ำ',
    name: 'สระอำ',
    subname: 'สระเสียงสั้น นิคหิตกับลากข้าง ⭕',
    sound: 'อำ สระเสียงสั้น เช่น จำ ทำ ขำ',
    shortLong: 'short',
    checkpoints: [
      { order: 1, x: 40, y: 30, label: '1' },
      { order: 2, x: 65, y: 25, label: '2' },
      { order: 3, x: 65, y: 80, label: '3' },
    ],
  },
];

/**
 * คำแจกลูกสะกดคำตัวอย่างสำหรับฝึกเขียนกลางอากาศ (Air-Writing Phonics)
 */
export const THAI_PHONICS_WORDS_META: ThaiPhonicsWordDef[] = [
  {
    word: 'กา',
    name: 'กา (อีกา)',
    breakdown: 'ก + า = กา',
    unitId: 'phonics_korkaa',
    unitName: 'หน่วย ๔: แม่ ก กา',
    emoji: '🦅',
    checkpoints: [
      { order: 1, x: 25, y: 75, label: '1' },
      { order: 2, x: 25, y: 40, label: '2' },
      { order: 3, x: 35, y: 30, label: '3' },
      { order: 4, x: 45, y: 75, label: '4' },
      { order: 5, x: 70, y: 25, label: '5' },
      { order: 6, x: 70, y: 75, label: '6' },
    ],
  },
  {
    word: 'ตา',
    name: 'ตา (ดวงตา / คุณตา)',
    breakdown: 'ต + า = ตา',
    unitId: 'phonics_korkaa',
    unitName: 'หน่วย ๔: แม่ ก กา',
    emoji: '👀',
    checkpoints: [
      { order: 1, x: 25, y: 65, label: '1' },
      { order: 2, x: 30, y: 30, label: '2' },
      { order: 3, x: 40, y: 40, label: '3' },
      { order: 4, x: 45, y: 75, label: '4' },
      { order: 5, x: 70, y: 25, label: '5' },
      { order: 6, x: 70, y: 75, label: '6' },
    ],
  },
  {
    word: 'บ้าน',
    name: 'บ้าน (ที่อยู่อาศัย)',
    breakdown: 'บ + า + น + ้ = บ้าน (แม่กน)',
    unitId: 'phonics_direct_spelling',
    unitName: 'หน่วย ๖: ตัวสะกดตรงมาตรา',
    emoji: '🏡',
    checkpoints: [
      { order: 1, x: 20, y: 35, label: '1' },
      { order: 2, x: 20, y: 75, label: '2' },
      { order: 3, x: 35, y: 75, label: '3' },
      { order: 4, x: 35, y: 35, label: '4' },
      { order: 5, x: 55, y: 25, label: '5' },
      { order: 6, x: 55, y: 75, label: '6' },
      { order: 7, x: 80, y: 35, label: '7' },
      { order: 8, x: 80, y: 75, label: '8' },
    ],
  },
  {
    word: 'ช้าง',
    name: 'ช้าง (สัตว์คู่บ้านเมือง)',
    breakdown: 'ช + า + ง + ้ = ช้าง (แม่กง)',
    unitId: 'phonics_direct_spelling',
    unitName: 'หน่วย ๖: ตัวสะกดตรงมาตรา',
    emoji: '🐘',
    checkpoints: [
      { order: 1, x: 20, y: 40, label: '1' },
      { order: 2, x: 25, y: 75, label: '2' },
      { order: 3, x: 40, y: 30, label: '3' },
      { order: 4, x: 55, y: 25, label: '4' },
      { order: 5, x: 55, y: 75, label: '5' },
      { order: 6, x: 80, y: 35, label: '6' },
      { order: 7, x: 80, y: 75, label: '7' },
    ],
  },
  {
    word: 'ปลา',
    name: 'ปลา (คำควบกล้ำ)',
    breakdown: 'ป + ล + า = ปลา (ควบแท้)',
    unitId: 'phonics_cluster',
    unitName: 'หน่วย ๙: คำควบกล้ำ',
    emoji: '🐟',
    checkpoints: [
      { order: 1, x: 18, y: 40, label: '1' },
      { order: 2, x: 18, y: 75, label: '2' },
      { order: 3, x: 30, y: 15, label: '3' },
      { order: 4, x: 45, y: 75, label: '4' },
      { order: 5, x: 55, y: 35, label: '5' },
      { order: 6, x: 75, y: 25, label: '6' },
      { order: 7, x: 75, y: 75, label: '7' },
    ],
  },
];
