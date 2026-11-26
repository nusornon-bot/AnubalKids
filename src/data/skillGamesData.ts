import { Grade } from '../types';
import {
  EXTRA_MATCHING_LEVELS,
  EXTRA_SEQUENCE_LEVELS,
  EXTRA_SORTING_LEVELS,
  EXTRA_SIMON_CHALLENGES,
} from './extraSkillGames_1';
import {
  EXPANDED_MATCHING_LEVELS,
  EXPANDED_SEQUENCE_LEVELS,
  EXPANDED_SORTING_LEVELS,
  EXPANDED_JIGSAW_LEVELS,
  EXPANDED_SIMON_SAYS_CHALLENGES,
} from './skillGamesDataExpansion';

// ==========================================
// 1. เกมจับคู่ภาพเหมือนและภาพสัมพันธ์ (MATCHING)
// ==========================================

export interface MatchingCardItem {
  id: string;
  name: string;
  icon: string;
  matchId: string; // pair identifier
  subtext?: string;
  bgGradient?: string;
}

export interface MatchingLevel {
  id: string;
  grade: Grade;
  type: 'identical' | 'relational';
  title: string;
  description: string;
  instructionVoice: string;
  cards: MatchingCardItem[];
}

export const MATCHING_LEVELS: MatchingLevel[] = [
  // --- K1 (อนุบาล 1): ภาพเหมือน & แม่ลูกสัตว์แสนรู้ ---
  {
    id: 'match-k1-1',
    grade: 'K1',
    type: 'identical',
    title: 'จับคู่ภาพเหมือน: ผลไม้แสนอร่อย 🍎',
    description: 'ฝึกการสังเกตรูปร่างและสีสันของผลไม้ที่เหมือนกันทุกประการ',
    instructionVoice: 'หาผลไม้ที่หน้าตาเหมือนกันให้เจอ แล้วแตะจับคู่นะคะ',
    cards: [
      { id: 'k1-1-apple-a', name: 'แอปเปิ้ลสีแดง', icon: '🍎', matchId: 'apple', bgGradient: 'from-rose-100 to-rose-200' },
      { id: 'k1-1-apple-b', name: 'แอปเปิ้ลสีแดง', icon: '🍎', matchId: 'apple', bgGradient: 'from-rose-100 to-rose-200' },
      { id: 'k1-1-banana-a', name: 'กล้วยหอมสีเหลือง', icon: '🍌', matchId: 'banana', bgGradient: 'from-amber-100 to-amber-200' },
      { id: 'k1-1-banana-b', name: 'กล้วยหอมสีเหลือง', icon: '🍌', matchId: 'banana', bgGradient: 'from-amber-100 to-amber-200' },
      { id: 'k1-1-grape-a', name: 'องุ่นสีม่วง', icon: '🍇', matchId: 'grape', bgGradient: 'from-purple-100 to-purple-200' },
      { id: 'k1-1-grape-b', name: 'องุ่นสีม่วง', icon: '🍇', matchId: 'grape', bgGradient: 'from-purple-100 to-purple-200' },
    ],
  },
  {
    id: 'match-k1-2',
    grade: 'K1',
    type: 'identical',
    title: 'จับคู่ภาพเหมือน: สัตว์เลี้ยงน่ารัก 🐶',
    description: 'ฝึกความจำระยะสั้นและการจำแนกประเภทสัตว์เลี้ยง',
    instructionVoice: 'แตะเปิดการ์ดเพื่อหาคู่สัตว์เลี้ยงที่เหมือนกันจ้า',
    cards: [
      { id: 'k1-2-dog-a', name: 'น้องหมา', icon: '🐶', matchId: 'dog', bgGradient: 'from-amber-100 to-orange-200' },
      { id: 'k1-2-dog-b', name: 'น้องหมา', icon: '🐶', matchId: 'dog', bgGradient: 'from-amber-100 to-orange-200' },
      { id: 'k1-2-cat-a', name: 'น้องแมว', icon: '🐱', matchId: 'cat', bgGradient: 'from-pink-100 to-rose-200' },
      { id: 'k1-2-cat-b', name: 'น้องแมว', icon: '🐱', matchId: 'cat', bgGradient: 'from-pink-100 to-rose-200' },
      { id: 'k1-2-rabbit-a', name: 'กระต่ายน้อย', icon: '🐰', matchId: 'rabbit', bgGradient: 'from-sky-100 to-blue-200' },
      { id: 'k1-2-rabbit-b', name: 'กระต่ายน้อย', icon: '🐰', matchId: 'rabbit', bgGradient: 'from-sky-100 to-blue-200' },
    ],
  },
  {
    id: 'match-k1-3',
    grade: 'K1',
    type: 'relational',
    title: 'จับคู่แม่ลูกสัตว์แสนอบอุ่น 🐥',
    description: 'จับคู่แม่สัตว์กับลูกสัตว์ที่มีความสัมพันธ์กัน',
    instructionVoice: 'ช่วยพาลูกสัตว์กลับไปหาคุณแม่ให้ถูกต้องนะคะ',
    cards: [
      { id: 'k1-3-hen', name: 'แม่ไก่', icon: '🐔', matchId: 'chicken', subtext: 'คุณแม่', bgGradient: 'from-amber-100 to-yellow-200' },
      { id: 'k1-3-chick', name: 'ลูกเจี๊ยบ', icon: '🐣', matchId: 'chicken', subtext: 'ลูกน้อย', bgGradient: 'from-amber-100 to-yellow-200' },
      { id: 'k1-3-cow', name: 'แม่วัว', icon: '🐮', matchId: 'cow', subtext: 'คุณแม่', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k1-3-calf', name: 'ลูกวัวน้อย', icon: '🥛', matchId: 'cow', subtext: 'ให้นมสด', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k1-3-duck', name: 'แม่เป็ด', icon: '🦆', matchId: 'duck', subtext: 'คุณแม่', bgGradient: 'from-sky-100 to-cyan-200' },
      { id: 'k1-3-duckling', name: 'ลูกเป็ดก๊าบๆ', icon: '🐤', matchId: 'duck', subtext: 'ลูกน้อย', bgGradient: 'from-sky-100 to-cyan-200' },
    ],
  },
  {
    id: 'match-k1-4',
    grade: 'K1',
    type: 'identical',
    title: 'จับคู่ภาพเหมือน: ขนมของว่างแสนหวาน 🧁',
    description: 'ฝึกการสังเกตรูปร่าง ลวดลาย และสีสันของขนมหวาน',
    instructionVoice: 'แตะเปิดการ์ดเพื่อหาคู่ขนมหวานที่เหมือนกันนะคะ',
    cards: [
      { id: 'k1-4-cupcake-a', name: 'คัพเค้กหวาน', icon: '🧁', matchId: 'cupcake', bgGradient: 'from-pink-100 to-rose-200' },
      { id: 'k1-4-cupcake-b', name: 'คัพเค้กหวาน', icon: '🧁', matchId: 'cupcake', bgGradient: 'from-pink-100 to-rose-200' },
      { id: 'k1-4-icecream-a', name: 'ไอศกรีมโคน', icon: '🍦', matchId: 'icecream', bgGradient: 'from-cyan-100 to-sky-200' },
      { id: 'k1-4-icecream-b', name: 'ไอศกรีมโคน', icon: '🍦', matchId: 'icecream', bgGradient: 'from-cyan-100 to-sky-200' },
      { id: 'k1-4-donut-a', name: 'โดนัทช็อกโกแลต', icon: '🍩', matchId: 'donut', bgGradient: 'from-amber-100 to-orange-200' },
      { id: 'k1-4-donut-b', name: 'โดนัทช็อกโกแลต', icon: '🍩', matchId: 'donut', bgGradient: 'from-amber-100 to-orange-200' },
    ],
  },
  {
    id: 'match-k1-5',
    grade: 'K1',
    type: 'identical',
    title: 'จับคู่ภาพเหมือน: ยานพาหนะคันโปรด 🚗',
    description: 'ฝึกการมองเห็นและจดจำประเภทยานพาหนะที่เด็กคุ้นเคย',
    instructionVoice: 'แตะจับคู่รถและยานพาหนะที่เหมือนกันเป๊ะเลยจ้า',
    cards: [
      { id: 'k1-5-car-a', name: 'รถยนต์สีแดง', icon: '🚗', matchId: 'car', bgGradient: 'from-red-100 to-rose-200' },
      { id: 'k1-5-car-b', name: 'รถยนต์สีแดง', icon: '🚗', matchId: 'car', bgGradient: 'from-red-100 to-rose-200' },
      { id: 'k1-5-train-a', name: 'รถไฟฉึกฉัก', icon: '🚂', matchId: 'train', bgGradient: 'from-indigo-100 to-blue-200' },
      { id: 'k1-5-train-b', name: 'รถไฟฉึกฉัก', icon: '🚂', matchId: 'train', bgGradient: 'from-indigo-100 to-blue-200' },
      { id: 'k1-5-plane-a', name: 'เครื่องบินบนฟ้า', icon: '✈️', matchId: 'plane', bgGradient: 'from-teal-100 to-emerald-200' },
      { id: 'k1-5-plane-b', name: 'เครื่องบินบนฟ้า', icon: '✈️', matchId: 'plane', bgGradient: 'from-teal-100 to-emerald-200' },
    ],
  },
  {
    id: 'match-k1-6',
    grade: 'K1',
    type: 'relational',
    title: 'จับคู่แม่ลูกสัตว์ในฟาร์มสุขสันต์ 🐑',
    description: 'เรียนรู้ความสัมพันธ์ของสัตว์ในฟาร์มและลูกสัตว์ตัวน้อย',
    instructionVoice: 'แตะจับคู่แม่สัตว์กับลูกสัตว์ในฟาร์มให้ถูกต้องนะคะ',
    cards: [
      { id: 'k1-6-sheep', name: 'แม่แกะขนปุย', icon: '🐑', matchId: 'sheep', subtext: 'คุณแม่', bgGradient: 'from-slate-100 to-amber-100' },
      { id: 'k1-6-lamb', name: 'ลูกแกะน้อย', icon: '🧶', matchId: 'sheep', subtext: 'ขนปุยอบอุ่น', bgGradient: 'from-slate-100 to-amber-100' },
      { id: 'k1-6-horse', name: 'แม่ม้าสง่างาม', icon: '🐴', matchId: 'horse', subtext: 'คุณแม่', bgGradient: 'from-amber-100 to-orange-200' },
      { id: 'k1-6-foal', name: 'ลูกม้าวิ่งเล่น', icon: '🐎', matchId: 'horse', subtext: 'ลูกม้าแสนซน', bgGradient: 'from-amber-100 to-orange-200' },
      { id: 'k1-6-pig', name: 'แม่หมูอารมณ์ดี', icon: '🐷', matchId: 'pig', subtext: 'คุณแม่', bgGradient: 'from-pink-100 to-rose-200' },
      { id: 'k1-6-piglet', name: 'ลูกหมูน้อย', icon: '🐽', matchId: 'pig', subtext: 'ลูกน้อยน่ารัก', bgGradient: 'from-pink-100 to-rose-200' },
    ],
  },

  // --- K2 (อนุบาล 2): จับคู่ภาพสัมพันธ์ (สิ่งของคู่กัน, ที่อยู่, อาหาร, คำตรงข้าม) ---
  {
    id: 'match-k2-1',
    grade: 'K2',
    type: 'relational',
    title: 'จับคู่สิ่งของที่ใช้คู่กัน 🪥',
    description: 'ฝึกการเชื่อมโยงความสัมพันธ์ของสิ่งของเครื่องใช้ในชีวิตประจำวัน',
    instructionVoice: 'แตะจับคู่สิ่งของ 2 ชิ้นที่ต้องใช้คู่กันเสมอจ้า',
    cards: [
      { id: 'k2-1-brush', name: 'แปรงสีฟัน', icon: '🪥', matchId: 'teeth', subtext: 'ใช้แปรงฟัน', bgGradient: 'from-sky-100 to-indigo-100' },
      { id: 'k2-1-paste', name: 'ฟองยาสีฟัน', icon: '🫧', matchId: 'teeth', subtext: 'คู่กับแปรง', bgGradient: 'from-sky-100 to-indigo-100' },
      { id: 'k2-1-spoon', name: 'ช้อนทานข้าว', icon: '🥄', matchId: 'tableware', subtext: 'ตักอาหาร', bgGradient: 'from-amber-100 to-orange-100' },
      { id: 'k2-1-fork', name: 'ส้อมจิ้มอาหาร', icon: '🍴', matchId: 'tableware', subtext: 'คู่กับช้อน', bgGradient: 'from-amber-100 to-orange-100' },
      { id: 'k2-1-pencil', name: 'ดินสอเขียน', icon: '✏️', matchId: 'writing', subtext: 'ขีดเขียน', bgGradient: 'from-emerald-100 to-teal-100' },
      { id: 'k2-1-eraser', name: 'ยางลบสะอาด', icon: '🧼', matchId: 'writing', subtext: 'ลบดินสอ', bgGradient: 'from-emerald-100 to-teal-100' },
      { id: 'k2-1-umbrella', name: 'ร่มกันฝน', icon: '☂️', matchId: 'rain', subtext: 'กางกันเปียก', bgGradient: 'from-blue-100 to-cyan-200' },
      { id: 'k2-1-cloud', name: 'เมฆฝนตก', icon: '🌧️', matchId: 'rain', subtext: 'ฝนพรำๆ', bgGradient: 'from-blue-100 to-cyan-200' },
    ],
  },
  {
    id: 'match-k2-2',
    grade: 'K2',
    type: 'relational',
    title: 'จับคู่สัตว์กับบ้านที่อยู่อาศัย 🐝',
    description: 'เรียนรู้ธรรมชาติของสัตว์และที่อยู่อาศัยตามธรรมชาติ',
    instructionVoice: 'ช่วยพาสัตว์แต่ละชนิดกลับไปยังบ้านที่แสนอบอุ่นด้วยนะ',
    cards: [
      { id: 'k2-2-bee', name: 'ผึ้งน้อย', icon: '🐝', matchId: 'honey', subtext: 'บินหาน้ำหวาน', bgGradient: 'from-amber-100 to-yellow-200' },
      { id: 'k2-2-hive', name: 'รังผึ้งหวาน', icon: '🍯', matchId: 'honey', subtext: 'บ้านของผึ้ง', bgGradient: 'from-amber-100 to-yellow-200' },
      { id: 'k2-2-bird', name: 'นกร้องเพลง', icon: '🐦', matchId: 'nest', subtext: 'บนต้นไม้', bgGradient: 'from-teal-100 to-emerald-200' },
      { id: 'k2-2-nest', name: 'รังนกน้อย', icon: '🪺', matchId: 'nest', subtext: 'บ้านของนก', bgGradient: 'from-teal-100 to-emerald-200' },
      { id: 'k2-2-fish', name: 'ปลาแหวกว่าย', icon: '🐠', matchId: 'ocean', subtext: 'มีเกล็ดและครีบ', bgGradient: 'from-cyan-100 to-blue-200' },
      { id: 'k2-2-wave', name: 'ทะเลน้ำใส', icon: '🌊', matchId: 'ocean', subtext: 'บ้านของปลา', bgGradient: 'from-cyan-100 to-blue-200' },
      { id: 'k2-2-spider', name: 'แมงมุม 8 ขา', icon: '🕷️', matchId: 'web', subtext: 'ชักใย', bgGradient: 'from-purple-100 to-pink-200' },
      { id: 'k2-2-web', name: 'ใยแมงมุม', icon: '🕸️', matchId: 'web', subtext: 'บ้านแมงมุม', bgGradient: 'from-purple-100 to-pink-200' },
    ],
  },
  {
    id: 'match-k2-3',
    grade: 'K2',
    type: 'relational',
    title: 'จับคู่สัตว์กับอาหารจานโปรด 🐰🥕',
    description: 'เรียนรู้ว่าสัตว์แต่ละชนิดชอบกินอาหารอะไรเป็นพิเศษ',
    instructionVoice: 'แตะจับคู่สัตว์น่ารักกับอาหารจานโปรดของมันนะจ๊ะ',
    cards: [
      { id: 'k2-3-rabbit', name: 'กระต่ายน้อย', icon: '🐰', matchId: 'carrot', subtext: 'ชอบกินผัก', bgGradient: 'from-orange-100 to-amber-200' },
      { id: 'k2-3-carrot', name: 'แครอทสีส้ม', icon: '🥕', matchId: 'carrot', subtext: 'อาหารกระต่าย', bgGradient: 'from-orange-100 to-amber-200' },
      { id: 'k2-3-monkey', name: 'ลิงจ๋อแสนซน', icon: '🐵', matchId: 'banana', subtext: 'ปีนต้นไม้', bgGradient: 'from-yellow-100 to-amber-200' },
      { id: 'k2-3-banana', name: 'กล้วยสุกหอม', icon: '🍌', matchId: 'banana', subtext: 'อาหารของลิง', bgGradient: 'from-yellow-100 to-amber-200' },
      { id: 'k2-3-panda', name: 'หมีแพนด้า', icon: '🐼', matchId: 'bamboo', subtext: 'กินทั้งวัน', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k2-3-bamboo', name: 'ต้นไผ่ใบเขียว', icon: '🎋', matchId: 'bamboo', subtext: 'อาหารแพนด้า', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k2-3-dog', name: 'น้องหมาผู้ซื่อสัตย์', icon: '🐶', matchId: 'bone', subtext: 'กระดิกหาง', bgGradient: 'from-slate-100 to-amber-100' },
      { id: 'k2-3-bone', name: 'กระดูกแสนอร่อย', icon: '🦴', matchId: 'bone', subtext: 'อาหารน้องหมา', bgGradient: 'from-slate-100 to-amber-100' },
    ],
  },
  {
    id: 'match-k2-4',
    grade: 'K2',
    type: 'relational',
    title: 'จับคู่คำตรงข้าม (Opposites) ☀️❄️',
    description: 'ฝึกการคิดเชิงเปรียบเทียบคุณลักษณะที่ตรงกันข้าม',
    instructionVoice: 'แตะจับคู่สิ่งที่มีคุณสมบัติตรงข้ามกันให้ถูกต้องจ้ะ',
    cards: [
      { id: 'k2-4-hot', name: 'พระอาทิตย์ร้อนจ้า', icon: '☀️', matchId: 'temp', subtext: 'ความร้อน', bgGradient: 'from-amber-100 to-red-200' },
      { id: 'k2-4-cold', name: 'ก้อนน้ำแข็งเย็นเฉียบ', icon: '🧊', matchId: 'temp', subtext: 'ความเย็น', bgGradient: 'from-sky-100 to-cyan-200' },
      { id: 'k2-4-big', name: 'ช้างตัวใหญ่โต', icon: '🐘', matchId: 'size', subtext: 'ขนาดใหญ่', bgGradient: 'from-slate-100 to-blue-200' },
      { id: 'k2-4-small', name: 'มดตัวจิ๋ว', icon: '🐜', matchId: 'size', subtext: 'ขนาดเล็ก', bgGradient: 'from-rose-100 to-amber-200' },
      { id: 'k2-4-happy', name: 'เด็กยิ้มร่าเริง', icon: '😊', matchId: 'emotion', subtext: 'มีความสุข', bgGradient: 'from-yellow-100 to-amber-200' },
      { id: 'k2-4-sad', name: 'เด็กร้องไห้เสียใจ', icon: '😢', matchId: 'emotion', subtext: 'เศร้าใจ', bgGradient: 'from-blue-100 to-indigo-200' },
      { id: 'k2-4-open', name: 'กล่องเปิดออก', icon: '📦', matchId: 'box', subtext: 'เปิดอยู่', bgGradient: 'from-teal-100 to-emerald-200' },
      { id: 'k2-4-closed', name: 'กล่องปิดสนิท', icon: '🗳️', matchId: 'box', subtext: 'ปิดล็อค', bgGradient: 'from-purple-100 to-indigo-200' },
    ],
  },
  {
    id: 'match-k2-5',
    grade: 'K2',
    type: 'relational',
    title: 'จับคู่เครื่องแต่งกายกับร่างกาย 👟',
    description: 'เรียนรู้หน้าที่ของเครื่องแต่งกายและการสวมใส่ให้ถูกตำแหน่ง',
    instructionVoice: 'จับคู่เสื้อผ้าเครื่องแต่งกายกับอวัยวะที่สวมใส่นะคะ',
    cards: [
      { id: 'k2-5-shoe', name: 'รองเท้าผ้าใบ', icon: '👟', matchId: 'foot', subtext: 'สวมใส่', bgGradient: 'from-indigo-100 to-blue-200' },
      { id: 'k2-5-foot', name: 'เท้าของเรา', icon: '🦶', matchId: 'foot', subtext: 'ใช้วิ่งเล่น', bgGradient: 'from-indigo-100 to-blue-200' },
      { id: 'k2-5-glove', name: 'ถุงมืออบอุ่น', icon: '🧤', matchId: 'hand', subtext: 'สวมใส่', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k2-5-hand', name: 'มือทั้งสองข้าง', icon: '🖐️', matchId: 'hand', subtext: 'หยิบจับสิ่งของ', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k2-5-hat', name: 'หมวกแก๊ปกันแดด', icon: '🧢', matchId: 'head', subtext: 'สวมใส่', bgGradient: 'from-amber-100 to-orange-200' },
      { id: 'k2-5-head', name: 'ศีรษะคนเก่ง', icon: '👦', matchId: 'head', subtext: 'ด้านบนสุด', bgGradient: 'from-amber-100 to-orange-200' },
      { id: 'k2-5-glasses', name: 'แว่นตากันแดด', icon: '👓', matchId: 'eyes', subtext: 'สวมใส่', bgGradient: 'from-pink-100 to-rose-200' },
      { id: 'k2-5-eyes', name: 'ดวงตาสดใส', icon: '👀', matchId: 'eyes', subtext: 'มองดูสิ่งต่างๆ', bgGradient: 'from-pink-100 to-rose-200' },
    ],
  },

  // --- K3 (อนุบาล 3): จับคู่อาชีพ, สภาพอากาศ, กีฬา, แหล่งกำเนิด, เหตุและผล ---
  {
    id: 'match-k3-1',
    grade: 'K3',
    type: 'relational',
    title: 'จับคู่อาชีพในฝันกับเครื่องมือทำงาน 🩺',
    description: 'ฝึกการคิดเชิงตรรกะและบทบาทหน้าที่ของอาชีพต่างๆ ในชุมชน',
    instructionVoice: 'แตะจับคู่อาชีพกับอุปกรณ์ทำงานของพวกเขาให้ถูกต้องจ้ะ',
    cards: [
      { id: 'k3-1-doc', name: 'คุณหมอใจดี', icon: '🩺', matchId: 'doctor', subtext: 'ตรวจคนไข้', bgGradient: 'from-rose-100 to-red-200' },
      { id: 'k3-1-med', name: 'ยารักษาโรค', icon: '💊', matchId: 'doctor', subtext: 'อุปกรณ์หมอ', bgGradient: 'from-rose-100 to-red-200' },
      { id: 'k3-1-chef', name: 'เชฟกุ๊กทำอาหาร', icon: '👨‍🍳', matchId: 'cook', subtext: 'ทำของอร่อย', bgGradient: 'from-amber-100 to-orange-200' },
      { id: 'k3-1-pan', name: 'กระทะและตะหลิว', icon: '🍳', matchId: 'cook', subtext: 'อุปกรณ์ครัว', bgGradient: 'from-amber-100 to-orange-200' },
      { id: 'k3-1-fire', name: 'นักดับเพลิงฮีโร่', icon: '👨‍🚒', matchId: 'firefighter', subtext: 'ช่วยดับไฟ', bgGradient: 'from-red-100 to-orange-200' },
      { id: 'k3-1-truck', name: 'รถดับเพลิงน้ำ', icon: '🚒', matchId: 'firefighter', subtext: 'พาหนะดับเพลิง', bgGradient: 'from-red-100 to-orange-200' },
      { id: 'k3-1-teach', name: 'คุณครูแสนดี', icon: '👩‍🏫', matchId: 'teacher', subtext: 'สอนหนังสือ', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k3-1-book', name: 'สมุดและหนังสือ', icon: '📚', matchId: 'teacher', subtext: 'อุปกรณ์เรียน', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k3-1-paint', name: 'จิตรกรศิลปิน', icon: '🎨', matchId: 'artist', subtext: 'วาดภาพสวย', bgGradient: 'from-purple-100 to-pink-200' },
      { id: 'k3-1-brush', name: 'พู่กันระบายสี', icon: '🖌️', matchId: 'artist', subtext: 'แต่งแต้มสี', bgGradient: 'from-purple-100 to-pink-200' },
    ],
  },
  {
    id: 'match-k3-2',
    grade: 'K3',
    type: 'relational',
    title: 'จับคู่สภาพอากาศกับสิ่งของคู่กาย ☀️',
    description: 'เชื่อมโยงเหตุและผล การปรับตัวและเครื่องแต่งกายตามสภาพอากาศ',
    instructionVoice: 'ดูสภาพอากาศแล้วเลือกสิ่งของที่เหมาะสมมาจับคู่กันนะ',
    cards: [
      { id: 'k3-2-sun', name: 'แดดจ้าหน้าร้อน', icon: '☀️', matchId: 'summer', subtext: 'อากาศร้อน', bgGradient: 'from-amber-100 to-yellow-200' },
      { id: 'k3-2-hat', name: 'หมวกกันแดด', icon: '🧢', matchId: 'summer', subtext: 'สวมใส่กันแดด', bgGradient: 'from-amber-100 to-yellow-200' },
      { id: 'k3-2-snow', name: 'หิมะตกหนาวเย็น', icon: '❄️', matchId: 'winter', subtext: 'อากาศหนาว', bgGradient: 'from-sky-100 to-blue-200' },
      { id: 'k3-2-coat', name: 'เสื้อกันหนาวหนา', icon: '🧥', matchId: 'winter', subtext: 'ให้อบอุ่น', bgGradient: 'from-sky-100 to-blue-200' },
      { id: 'k3-2-night', name: 'ท้องฟ้ายามค่ำคืน', icon: '🌙', matchId: 'night', subtext: 'เวลาพักผ่อน', bgGradient: 'from-indigo-100 to-purple-200' },
      { id: 'k3-2-bed', name: 'เตียงนอนนุ่มสบาย', icon: '🛏️', matchId: 'night', subtext: 'นอนหลับฝันดี', bgGradient: 'from-indigo-100 to-purple-200' },
    ],
  },
  {
    id: 'match-k3-3',
    grade: 'K3',
    type: 'relational',
    title: 'จับคู่นักกีฬากับอุปกรณ์แข่งขัน ⚽🎾',
    description: 'เรียนรู้ประเภทกีฬาและอุปกรณ์จำเป็นในการออกกำลังกาย',
    instructionVoice: 'แตะจับคู่นักกีฬากับอุปกรณ์ที่ใช้แข่งขันให้ถูกต้องนะ',
    cards: [
      { id: 'k3-3-soccer', name: 'นักเตะฟุตบอล', icon: '⚽', matchId: 'goal', subtext: 'ยิงประตู', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k3-3-goal', name: 'ตาข่ายประตูโกล์', icon: '🥅', matchId: 'goal', subtext: 'เป้าหมายทำคะแนน', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k3-3-basket', name: 'นักบาสเกตบอล', icon: '🏀', matchId: 'hoop', subtext: 'ชู้ตลูกบอล', bgGradient: 'from-orange-100 to-amber-200' },
      { id: 'k3-3-hoop', name: 'แป้นห่วงบาส', icon: '⛹️', matchId: 'hoop', subtext: 'ห่วงตาข่าย', bgGradient: 'from-orange-100 to-amber-200' },
      { id: 'k3-3-swimmer', name: 'นักว่ายน้ำ', icon: '🏊', matchId: 'goggles', subtext: 'ว่ายน้ำในสระ', bgGradient: 'from-sky-100 to-blue-200' },
      { id: 'k3-3-goggles', name: 'แว่นตาว่ายน้ำ', icon: '🥽', matchId: 'goggles', subtext: 'ป้องกันน้ำเข้าตา', bgGradient: 'from-sky-100 to-blue-200' },
      { id: 'k3-3-cyclist', name: 'นักปั่นจักรยาน', icon: '🚴', matchId: 'helmet', subtext: 'ปั่นออกกำลัง', bgGradient: 'from-purple-100 to-pink-200' },
      { id: 'k3-3-helmet', name: 'หมวกกันน็อกนิรภัย', icon: '🪖', matchId: 'helmet', subtext: 'ปกป้องศีรษะ', bgGradient: 'from-purple-100 to-pink-200' },
    ],
  },
  {
    id: 'match-k3-4',
    grade: 'K3',
    type: 'relational',
    title: 'จับคู่ผลผลิตกับแหล่งกำเนิด 🌾🥛',
    description: 'เรียนรู้ว่าสิ่งของและอาหารที่เราใช้ มีที่มาจากธรรมชาติอย่างไร',
    instructionVoice: 'จับคู่อาหารและสิ่งของกับแหล่งที่มาของมันให้ถูกต้องจ้า',
    cards: [
      { id: 'k3-4-cow', name: 'แม่วัวอารมณ์ดี', icon: '🐮', matchId: 'milk', subtext: 'ในฟาร์ม', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k3-4-milk', name: 'นมสดกล่องแสนอร่อย', icon: '🥛', matchId: 'milk', subtext: 'ได้จากแม่วัว', bgGradient: 'from-emerald-100 to-teal-200' },
      { id: 'k3-4-rice-paddy', name: 'รวงข้าวสีทองในนา', icon: '🌾', matchId: 'rice', subtext: 'ต้นข้าว', bgGradient: 'from-amber-100 to-yellow-200' },
      { id: 'k3-4-rice-bowl', name: 'ข้าวสวยร้อนๆ', icon: '🍚', matchId: 'rice', subtext: 'สีจากรวงข้าว', bgGradient: 'from-amber-100 to-yellow-200' },
      { id: 'k3-4-bee', name: 'ผึ้งน้อยบินหาน้ำหวาน', icon: '🐝', matchId: 'honey', subtext: 'ตอมเกสรดอกไม้', bgGradient: 'from-yellow-100 to-orange-200' },
      { id: 'k3-4-honey', name: 'น้ำผึ้งหวานธรรมชาติ', icon: '🍯', matchId: 'honey', subtext: 'ผลิตโดยผึ้ง', bgGradient: 'from-yellow-100 to-orange-200' },
      { id: 'k3-4-tree', name: 'ต้นไม้ใหญ่ในป่า', icon: '🌳', matchId: 'paper', subtext: 'เนื้อเยื่อไม้', bgGradient: 'from-teal-100 to-emerald-200' },
      { id: 'k3-4-paper', name: 'กระดาษสมุดวาดเขียน', icon: '📄', matchId: 'paper', subtext: 'ผลิตจากเยื่อไม้', bgGradient: 'from-teal-100 to-emerald-200' },
    ],
  },
  {
    id: 'match-k3-5',
    grade: 'K3',
    type: 'relational',
    title: 'จับคู่เหตุการณ์และผลลัพธ์ (Cause & Effect) 🌱🌈',
    description: 'ฝึกการคิดเชิงวิเคราะห์ความสัมพันธ์ของเหตุและผลลัพธ์',
    instructionVoice: 'ดูว่าเมื่อเกิดเหตุการณ์หนึ่งขึ้น จะเกิดผลลัพธ์อะไรตามมานะ',
    cards: [
      { id: 'k3-5-water-can', name: 'รดน้ำพรวนดินต้นไม้', icon: '💧', matchId: 'flower', subtext: 'เหตุ: ดูแลรดน้ำ', bgGradient: 'from-blue-100 to-cyan-200' },
      { id: 'k3-5-flower', name: 'ดอกไม้ผลิบานสวยงาม', icon: '🌸', matchId: 'flower', subtext: 'ผล: เจริญงอกงาม', bgGradient: 'from-pink-100 to-rose-200' },
      { id: 'k3-5-rain-sun', name: 'ฝนตกและแดดออกพร้อมกัน', icon: '🌦️', matchId: 'rainbow', subtext: 'เหตุ: แสงส่องละอองน้ำ', bgGradient: 'from-sky-100 to-indigo-100' },
      { id: 'k3-5-rainbow', name: 'รุ้งกินน้ำ 7 สีสดใส', icon: '🌈', matchId: 'rainbow', subtext: 'ผล: ปรากฏรุ้งบนฟ้า', bgGradient: 'from-amber-100 to-purple-200' },
      { id: 'k3-5-trip', name: 'วิ่งเล่นสะดุดหกล้ม', icon: '🏃', matchId: 'bandage', subtext: 'เหตุ: ไม่ระวังตัว', bgGradient: 'from-orange-100 to-amber-200' },
      { id: 'k3-5-bandage', name: 'แปะพลาสเตอร์ยาทำแผล', icon: '🩹', matchId: 'bandage', subtext: 'ผล: ปฐมพยาบาล', bgGradient: 'from-slate-100 to-rose-100' },
      { id: 'k3-5-candy', name: 'กินลูกอมแล้วไม่แปรงฟัน', icon: '🍭', matchId: 'toothache', subtext: 'เหตุ: คราบน้ำตาลสะสม', bgGradient: 'from-rose-100 to-red-200' },
      { id: 'k3-5-toothache', name: 'ฟันผุมีแมงกินฟัน', icon: '🦷', matchId: 'toothache', subtext: 'ผล: ปวดฟัน', bgGradient: 'from-red-100 to-slate-200' },
    ],
  },
  ...EXPANDED_MATCHING_LEVELS,
  ...EXTRA_MATCHING_LEVELS,
];

// ====================================================
// 2. เกมเรียงลำดับและจัดหมวดหมู่ (SEQUENCING & SORTING)
// ====================================================

// --- 2.1 เรียงลำดับ (Sequencing) ---
export interface SequenceItem {
  id: string;
  order: number; // 1-based index (1, 2, 3...)
  label: string;
  icon: string;
  description: string;
}

export interface SequenceLevel {
  id: string;
  grade: Grade;
  title: string;
  theme: string;
  instructionVoice: string;
  items: SequenceItem[];
}

export const SEQUENCE_LEVELS: SequenceLevel[] = [
  // --- K1: เรียงขนาด, จำนวน, ความสูง (3 ขั้นตอน) ---
  {
    id: 'seq-k1-1',
    grade: 'K1',
    title: 'เรียงลำดับขนาด: ผลส้ม เล็กไปใหญ่ 🍊',
    theme: 'เปรียบเทียบขนาด (เล็ก -> กลาง -> ใหญ่)',
    instructionVoice: 'เรียงลำดับส้มจากผลที่เล็กที่สุด ไปหาผลที่ใหญ่ที่สุดจ้า',
    items: [
      { id: 'k1-seq-1', order: 1, label: 'ส้มลูกเล็กจิ๋ว', icon: '🍊', description: 'ขนาดเล็กที่สุด' },
      { id: 'k1-seq-2', order: 2, label: 'ส้มลูกขนาดกลาง', icon: '🍊', description: 'ขนาดปานกลาง' },
      { id: 'k1-seq-3', order: 3, label: 'ส้มลูกใหญ่ยักษ์', icon: '🍊', description: 'ขนาดใหญ่ที่สุด' },
    ],
  },
  {
    id: 'seq-k1-2',
    grade: 'K1',
    title: 'เรียงลำดับตัวเลข 1, 2, 3 แสนสนุก 🔢',
    theme: 'การนับและลำดับตัวเลข',
    instructionVoice: 'ลากตัวเลขเรียงจาก 1 ไปถึง 3 ให้ถูกต้องนะคะ',
    items: [
      { id: 'k1-num-1', order: 1, label: 'เลข 1 หนึ่ง', icon: '1️⃣', description: 'จำนวนหนึ่ง' },
      { id: 'k1-num-2', order: 2, label: 'เลข 2 สอง', icon: '2️⃣', description: 'จำนวนสอง' },
      { id: 'k1-num-3', order: 3, label: 'เลข 3 สาม', icon: '3️⃣', description: 'จำนวนสาม' },
    ],
  },
  {
    id: 'seq-k1-3',
    grade: 'K1',
    title: 'เรียงลำดับจำนวนลูกโป่ง: น้อยไปมาก 🎈',
    theme: 'การเปรียบเทียบปริมาณจำนวน',
    instructionVoice: 'เรียงลูกโป่งจากจำนวนน้อยที่สุด ไปหาจำนวนมากที่สุดนะจ๊ะ',
    items: [
      { id: 'k1-seq-b1', order: 1, label: 'ลูกโป่ง 1 ลูก', icon: '🎈', description: 'จำนวนน้อยที่สุด' },
      { id: 'k1-seq-b2', order: 2, label: 'ลูกโป่ง 2 ลูก', icon: '🎈🎈', description: 'จำนวนปานกลาง' },
      { id: 'k1-seq-b3', order: 3, label: 'ลูกโป่ง 3 ลูก', icon: '🎈🎈🎈', description: 'จำนวนมากที่สุด' },
    ],
  },
  {
    id: 'seq-k1-4',
    grade: 'K1',
    title: 'เรียงลำดับความสูง: น้องหมีเตี้ยไปสูง 🧸',
    theme: 'เปรียบเทียบความสูง (เตี้ย -> สูง)',
    instructionVoice: 'เรียงลำดับน้องหมีจากตัวที่เตี้ยที่สุด ไปหาตัวที่สูงที่สุดนะคะ',
    items: [
      { id: 'k1-seq-h1', order: 1, label: 'น้องหมีตัวเตี้ยจิ๋ว', icon: '🧸', description: 'ความสูงน้อยที่สุด' },
      { id: 'k1-seq-h2', order: 2, label: 'น้องหมีขนาดกลาง', icon: '🧸', description: 'ความสูงปานกลาง' },
      { id: 'k1-seq-h3', order: 3, label: 'น้องหมีตัวสูงใหญ่', icon: '🧸', description: 'ความสูงมากที่สุด' },
    ],
  },

  // --- K2: วงจรชีวิต, สุขอนามัย และกิจวัตร (3 ขั้นตอน) ---
  {
    id: 'seq-k2-1',
    grade: 'K2',
    title: 'วงจรชีวิตของต้นทานตะวัน 🌱🌻',
    theme: 'การเจริญเติบโตของพืช',
    instructionVoice: 'เรียงลำดับขั้นตอนการปลูกต้นไม้ จากเมล็ดจนดอกไม้บานนะจ๊ะ',
    items: [
      { id: 'k2-seq-1', order: 1, label: 'หยอดเมล็ดพืชลงดิน', icon: '🌰', description: 'ฝังเมล็ดลงดินรดน้ำ' },
      { id: 'k2-seq-2', order: 2, label: 'แตกต้นกล้าใบเขียว', icon: '🌱', description: 'เริ่มมีรากและใบอ่อน' },
      { id: 'k2-seq-3', order: 3, label: 'ดอกทานตะวันบานสะพรั่ง', icon: '🌻', description: 'เจริญเติบโตเต็มที่' },
    ],
  },
  {
    id: 'seq-k2-2',
    grade: 'K2',
    title: 'กิจวัตรยามเช้าของคนเก่ง ⏰🎒',
    theme: 'สุขอนามัยและการจัดลำดับเวลา',
    instructionVoice: 'ตอนเช้าเราควรทำอะไรก่อนหลัง เรียงให้คุณครูดูหน่อยนะคะ',
    items: [
      { id: 'k2-seq-r1', order: 1, label: 'ตื่นนอนเก็บที่นอน', icon: '⏰', description: 'ตื่นเช้าสดใส' },
      { id: 'k2-seq-r2', order: 2, label: 'แปรงฟันและอาบน้ำ', icon: '🪥', description: 'ทำความสะอาดร่างกาย' },
      { id: 'k2-seq-r3', order: 3, label: 'สะพายเป้ไปโรงเรียน', icon: '🎒', description: 'พร้อมไปเรียนรู้' },
    ],
  },
  {
    id: 'seq-k2-3',
    grade: 'K2',
    title: 'ขั้นตอนการล้างมือให้สะอาด 7 ขั้นตอนแบบย่อ 🧼💧',
    theme: 'สุขอนามัยส่วนบุคคล ป้องกันเชื้อโรค',
    instructionVoice: 'เรียงลำดับขั้นตอนการล้างมือให้สะอาดปราศจากเชื้อโรคนะคะ',
    items: [
      { id: 'k2-seq-w1', order: 1, label: 'ฟอกสบู่ให้ทั่วฝ่ามือ', icon: '🧼', description: 'ถูฝ่ามือและซอกนิ้ว' },
      { id: 'k2-seq-w2', order: 2, label: 'ล้างด้วยน้ำสะอาดไหลผ่าน', icon: '💧', description: 'ชะล้างฟองสบู่จนหมด' },
      { id: 'k2-seq-w3', order: 3, label: 'เช็ดมือด้วยผ้าแห้งสะอาด', icon: '🧻', description: 'มือสะอาดแห้งสนิท' },
    ],
  },
  {
    id: 'seq-k2-4',
    grade: 'K2',
    title: 'ขั้นตอนการรับประทานอาหารอย่างถูกวิธี 🍽️',
    theme: 'มารยาทและสุขอนามัยบนโต๊ะอาหาร',
    instructionVoice: 'เวลารับประทานอาหาร เราควรทำสิ่งใดก่อนหลังจ๊ะ',
    items: [
      { id: 'k2-seq-m1', order: 1, label: 'ล้างมือก่อนรับประทาน', icon: '🧼', description: 'รักษาความสะอาดมือก่อนทาน' },
      { id: 'k2-seq-m2', order: 2, label: 'ตักอาหารเคี้ยวให้ละเอียด', icon: '🍛', description: 'ทานอาหารอย่างสุภาพไม่คุย' },
      { id: 'k2-seq-m3', order: 3, label: 'เก็บจานและดื่มน้ำสะอาด', icon: '🥛', description: 'นำจานชามไปไว้จุดเก็บ' },
    ],
  },
  {
    id: 'seq-k2-5',
    grade: 'K2',
    title: 'วงจรชีวิตของกบตัวน้อย 🐸',
    theme: 'การเจริญเติบโตของสัตว์สะเทินน้ำสะเทินบก',
    instructionVoice: 'เรียงลำดับการเติบโตของกบตั้งแต่ฟองไข่จนเป็นกบตัวโตนะจ๊ะ',
    items: [
      { id: 'k2-seq-f1', order: 1, label: 'กลุ่มไข่กบในน้ำใส', icon: '🫧', description: 'เกาะกลุ่มเป็นวุ้นในน้ำ' },
      { id: 'k2-seq-f2', order: 2, label: 'ลูกอ๊อดว่ายน้ำมีหางยาว', icon: '🐟', description: 'หายใจด้วยเหงือกมีหาง' },
      { id: 'k2-seq-f3', order: 3, label: 'กบตัวโตกระโดดบนใบบัว', icon: '🐸', description: 'หางหดหาย มี 4 ขากระโดด' },
    ],
  },

  // --- K3: วงจรชีวิต 4 ขั้นตอน, เวลา, การขนส่ง, วัฏจักรธรรมชาติ ---
  {
    id: 'seq-k3-1',
    grade: 'K3',
    title: 'วงจรชีวิตของผีเสื้อแสนสวย 4 ขั้นตอน 🦋',
    theme: 'วงจรชีวิตสัตว์ (Metamorphosis)',
    instructionVoice: 'เรียงลำดับการเติบโตของผีเสื้อทั้ง 4 ขั้นตอนให้ถูกต้องนะคะ',
    items: [
      { id: 'k3-seq-b1', order: 1, label: 'ไข่ผีเสื้อบนใบไม้', icon: '🥚', description: 'ไข่ฟองเล็กๆ เกาะที่ใบ' },
      { id: 'k3-seq-b2', order: 2, label: 'หนอนผีเสื้อตัวอ้วน', icon: '🐛', description: 'กินใบไม้จนตัวโต' },
      { id: 'k3-seq-b3', order: 3, label: 'ดักแด้จำศีล', icon: '🧶', description: 'นอนหลับในถุงดักแด้' },
      { id: 'k3-seq-b4', order: 4, label: 'ผีเสื้อกางปีกบิน', icon: '🦋', description: 'กลายร่างเป็นผีเสื้อสวยงาม' },
    ],
  },
  {
    id: 'seq-k3-2',
    grade: 'K3',
    title: 'ช่วงเวลาใน 1 วัน (เช้า • เที่ยง • เย็น • คืน) ☀️🌙',
    theme: 'ปรากฏการณ์ธรรมชาติและช่วงเวลา',
    instructionVoice: 'เรียงลำดับช่วงเวลาของวันตั้งแต่พระอาทิตย์ขึ้นจนเข้านอนนะ',
    items: [
      { id: 'k3-time-1', order: 1, label: 'เช้าตรู่ พระอาทิตย์ขึ้น', icon: '🌅', description: 'เริ่มวันใหม่อันสดใส' },
      { id: 'k3-time-2', order: 2, label: 'กลางวัน แดดสว่างจ้า', icon: '☀️', description: 'ทานอาหารกลางวัน' },
      { id: 'k3-time-3', order: 3, label: 'ตอนเย็น พระอาทิตย์ตกดิน', icon: '🌇', description: 'กลับบ้านพักผ่อน' },
      { id: 'k3-time-4', order: 4, label: 'กลางคืน พระจันทร์ส่องแสง', icon: '🌙', description: 'นอนหลับฝันดี' },
    ],
  },
  {
    id: 'seq-k3-3',
    grade: 'K3',
    title: 'การเดินทางของจดหมายและพัสดุ ✉️📦',
    theme: 'การสื่อสารและการขนส่งในสังคม',
    instructionVoice: 'เรียงลำดับการส่งจดหมายตั้งแต่เขียนจนถึงมือผู้รับนะคะ',
    items: [
      { id: 'k3-mail-1', order: 1, label: 'เขียนจดหมายใส่ซองปิดแสตมป์', icon: '✉️', description: 'เขียนข้อความส่งความคิดถึง' },
      { id: 'k3-mail-2', order: 2, label: 'หยอดลงตู้ไปรษณีย์สีแดง', icon: '📮', description: 'รอเจ้าหน้าที่มารับ' },
      { id: 'k3-mail-3', order: 3, label: 'บุรุษไปรษณีย์ขับรถไปส่ง', icon: '🛵', description: 'คัดแยกและออกเดินทางส่ง' },
      { id: 'k3-mail-4', order: 4, label: 'ผู้รับเปิดกล่องพัสดุอย่างดีใจ', icon: '📦', description: 'ส่งถึงบ้านปลายทางสำเร็จ' },
    ],
  },
  {
    id: 'seq-k3-4',
    grade: 'K3',
    title: 'วัฏจักรของน้ำในธรรมชาติ (Water Cycle) 💧🌧️',
    theme: 'วิทยาศาสตร์ธรรมชาติและการหมุนเวียนของน้ำ',
    instructionVoice: 'เรียงลำดับวัฏจักรของน้ำ จากไอระเหยสู่ก้อนเมฆและฝนตกนะจ๊ะ',
    items: [
      { id: 'k3-water-1', order: 1, label: 'แสงแดดส่องน้ำระเหยเป็นไอ', icon: '☀️', description: 'น้ำในแหล่งน้ำระเหยขึ้นฟ้า' },
      { id: 'k3-water-2', order: 2, label: 'ไอน้ำรวมตัวเป็นก้อนเมฆ', icon: '☁️', description: 'กระทบความเย็นกลั่นตัว' },
      { id: 'k3-water-3', order: 3, label: 'เมฆหนาแน่นตกลงมาเป็นฝน', icon: '🌧️', description: 'หยาดน้ำฟ้าโปรยปรายลงสู่พื้น' },
      { id: 'k3-water-4', order: 4, label: 'น้ำฝนไหลรวมลงสู่แม่น้ำทะเล', icon: '🌊', description: 'กลับคืนสู่แหล่งน้ำธรรมชาติ' },
    ],
  },
  {
    id: 'seq-k3-5',
    grade: 'K3',
    title: 'วงจรชีวิตของแม่ไก่และลูกเจี๊ยบ 🐣🐔',
    theme: 'การเกิดและการเจริญเติบโตของสัตว์ปีก',
    instructionVoice: 'เรียงลำดับการเติบโตของไก่ทั้ง 4 ขั้นตอนให้ถูกต้องนะคะ',
    items: [
      { id: 'k3-chick-1', order: 1, label: 'แม่ไก่กกไข่ในรังอบอุ่น', icon: '🥚', description: 'ฟักไข่ด้วยความรัก' },
      { id: 'k3-chick-2', order: 2, label: 'ลูกเจี๊ยบเจาะเปลือกไข่ออกมา', icon: '🐣', description: 'ลืมตาดูโลกครั้งแรก' },
      { id: 'k3-chick-3', order: 3, label: 'ไก่รุ่นตัวโตเริ่มมีขนปีก', icon: '🐤', description: 'คุ้ยเขี่ยหาอาหารกิน' },
      { id: 'k3-chick-4', order: 4, label: 'ไก่โตเต็มวัยขันรับอรุณ', icon: '🐔', description: 'ส่งเสียงร้องและออกไข่' },
    ],
  },
  // --- เพิ่มอีก 5 ด่านเรียงลำดับใหม่ตามคำขอ ---
  {
    id: 'seq-new-k1-stones',
    grade: 'K1',
    title: 'เรียงลำดับขนาด: ก้อนหินจากเล็กไปใหญ่ยักษ์ 🪨',
    theme: 'เปรียบเทียบขนาดรูปทรงธรรมชาติ (เล็ก -> กลาง -> ใหญ่)',
    instructionVoice: 'เรียงลำดับก้อนหินจากก้อนที่เล็กที่สุด ไปหาก้อนที่ใหญ่ที่สุดนะคะ',
    items: [
      { id: 'k1-stone-1', order: 1, label: 'ก้อนหินเล็กจิ๋ว', icon: '🪨', description: 'ขนาดเล็กที่สุด' },
      { id: 'k1-stone-2', order: 2, label: 'ก้อนหินขนาดกลาง', icon: '🪨', description: 'ขนาดปานกลาง' },
      { id: 'k1-stone-3', order: 3, label: 'ก้อนหินใหญ่ยักษ์', icon: '🪨', description: 'ขนาดใหญ่ที่สุด' },
    ],
  },
  {
    id: 'seq-new-k2-honeybee',
    grade: 'K2',
    title: 'วงจรชีวิตของผึ้งน้อยแสนขยัน 🐝🍯',
    theme: 'การเจริญเติบโตของแมลงสังคม (ไข่ -> ตัวอ่อน -> ผึ้งงาน)',
    instructionVoice: 'เรียงลำดับการเจริญเติบโตของผึ้งน้อย จากไข่จนกลายเป็นผึ้งงานนะจ๊ะ',
    items: [
      { id: 'k2-bee-1', order: 1, label: 'ไข่ผึ้งใบจิ๋วในช่องรวง', icon: '🥚', description: 'นางพญาวางไข่ในช่องรวง' },
      { id: 'k2-bee-2', order: 2, label: 'ตัวอ่อนผึ้งได้รับน้ำหวาน', icon: '🐛', description: 'ตัวอ่อนกินนมผึ้งจนตัวอ้วน' },
      { id: 'k2-bee-3', order: 3, label: 'ผึ้งงานบินเก็บน้ำหวาน', icon: '🐝', description: 'โตเต็มวัยบินไปหาน้ำหวานดอกไม้' },
    ],
  },
  {
    id: 'seq-new-k2-make-bed',
    grade: 'K2',
    title: 'ขั้นตอนการเก็บที่นอนและพับผ้าห่ม 🛏️🧸',
    theme: 'กิจวัตรความรับผิดชอบและการดูแลตนเอง',
    instructionVoice: 'เมื่อตื่นนอนตอนเช้า เราควรจัดที่นอนตามลำดับอย่างไรเอ่ย',
    items: [
      { id: 'k2-bed-1', order: 1, label: 'ลุกขึ้นดึงผ้าปูที่นอนให้ตึง', icon: '🛏️', description: 'ดึงผ้าปูที่นอนให้เรียบตึง' },
      { id: 'k2-bed-2', order: 2, label: 'พับครึ่งผ้าห่มให้เรียบร้อย', icon: '🧣', description: 'พับผ้าห่มเป็นสี่เหลี่ยมสวยงาม' },
      { id: 'k2-bed-3', order: 3, label: 'จัดวางหมอนไว้ตรงกลางเตียง', icon: '🛋️', description: 'วางหมอนตรงกลางหัวเตียง' },
    ],
  },
  {
    id: 'seq-new-k3-sea-turtle',
    grade: 'K3',
    title: 'วงจรชีวิตของเต่าทะเลแสนมหัศจรรย์ 🐢🌊',
    theme: 'วิทยาศาสตร์ธรรมชาติและการอนุรักษ์สัตว์ทะเล',
    instructionVoice: 'เรียงลำดับชีวิตของเต่าทะเล จากไข่ริมหาดจนว่ายสู่ทะเลกว้างนะจ๊ะ',
    items: [
      { id: 'k3-turtle-1', order: 1, label: 'แม่เต่าขุดหลุมวางไข่ริมหาด', icon: '🥚', description: 'ฝังไข่ใต้ทรายอุ่นยามค่ำคืน' },
      { id: 'k3-turtle-2', order: 2, label: 'ลูกเต่าตัวจิ๋วฟักออกจากไข่', icon: '🐣', description: 'ขุดทรายตะเกียกตะกายขึ้นมา' },
      { id: 'k3-turtle-3', order: 3, label: 'ลูกเต่าคลานมุ่งสู่ทะเล', icon: '🐢', description: 'ว่ายน้ำตามแสงจันทร์ลงทะเล' },
      { id: 'k3-turtle-4', order: 4, label: 'เต่าทะเลโตเต็มวัยว่ายน้ำลึก', icon: '🌊', description: 'เติบโตและดำน้ำหากินในมหาสมุทร' },
    ],
  },
  {
    id: 'seq-new-k3-cross-zebra',
    grade: 'K3',
    title: 'ขั้นตอนการข้ามถนนบนทางม้าลายอย่างปลอดภัย 🚦🚶',
    theme: 'ความปลอดภัยทางถนนและกฎจราจรเบื้องต้น',
    instructionVoice: 'เมื่อจะข้ามถนน เราควรปฏิบัติตามลำดับความปลอดภัยอย่างไรจ๊ะ',
    items: [
      { id: 'k3-cross-1', order: 1, label: 'หยุดยืนรอหลังเส้นทางม้าลาย', icon: '🛑', description: 'ไม่ลงไปยืนบนพื้นถนน' },
      { id: 'k3-cross-2', order: 2, label: 'มองขวา มองซ้าย มองขวาอีกครั้ง', icon: '👀', description: 'ตรวจสอบว่าไม่มีรถแล่นมา' },
      { id: 'k3-cross-3', order: 3, label: 'รอสัญญาณไฟเขียวคนข้ามถนน', icon: '🟢', description: 'ไฟคนเดินสีเขียวสว่างขึ้น' },
      { id: 'k3-cross-4', order: 4, label: 'เดินข้ามอย่างระมัดระวัง ไม่วิ่ง', icon: '🚶‍♂️', description: 'ข้ามอย่างมีสติและคอยระวังรถ' },
    ],
  },
  ...EXPANDED_SEQUENCE_LEVELS,
  ...EXTRA_SEQUENCE_LEVELS,
];

// --- 2.2 จัดหมวดหมู่ใส่ตะกร้า (Sorting / Categorization) ---
export interface SortingBasket {
  id: string;
  name: string;
  icon: string;
  badgeColor: string;
  borderColor: string;
  bgColor: string;
}

export interface SortingItem {
  id: string;
  name: string;
  icon: string;
  targetBasketId: string;
}

export interface SortingLevel {
  id: string;
  grade: Grade;
  title: string;
  description: string;
  instructionVoice: string;
  baskets: SortingBasket[];
  items: SortingItem[];
}

export const SORTING_LEVELS: SortingLevel[] = [
  // --- K1: แยก 2 หมวด (สัตว์ vs ผลไม้, สีแดง vs สีเหลือง, ของเล่น vs เสื้อผ้า) ---
  {
    id: 'sort-k1-1',
    grade: 'K1',
    title: 'แยกหมวดหมู่: สัตว์น่ารัก vs ผลไม้แสนอร่อย 🐾🍎',
    description: 'ฝึกการสังเกตและจำแนกระหว่างสิ่งมีชีวิตเคลื่อนที่ได้กับพืชผลไม้',
    instructionVoice: 'แตะเลือกสิ่งของ แล้วใส่ลงในตะกร้าสัตว์หรือตะกร้าผลไม้ให้ถูกต้องนะ',
    baskets: [
      {
        id: 'basket-animals',
        name: 'ตะกร้าสัตว์น่ารัก',
        icon: '🐾',
        badgeColor: 'bg-amber-500 text-white',
        borderColor: 'border-amber-400',
        bgColor: 'bg-amber-50/80',
      },
      {
        id: 'basket-fruits',
        name: 'ตะกร้าผลไม้แสนอร่อย',
        icon: '🍎',
        badgeColor: 'bg-rose-500 text-white',
        borderColor: 'border-rose-400',
        bgColor: 'bg-rose-50/80',
      },
    ],
    items: [
      { id: 'sort-dog', name: 'สุนัข', icon: '🐶', targetBasketId: 'basket-animals' },
      { id: 'sort-apple', name: 'แอปเปิ้ล', icon: '🍎', targetBasketId: 'basket-fruits' },
      { id: 'sort-cat', name: 'แมวเหมียว', icon: '🐱', targetBasketId: 'basket-animals' },
      { id: 'sort-banana', name: 'กล้วยหอม', icon: '🍌', targetBasketId: 'basket-fruits' },
      { id: 'sort-rabbit', name: 'กระต่าย', icon: '🐰', targetBasketId: 'basket-animals' },
      { id: 'sort-strawberry', name: 'สตรอว์เบอร์รี', icon: '🍓', targetBasketId: 'basket-fruits' },
    ],
  },
  {
    id: 'sort-k1-2',
    grade: 'K1',
    title: 'แยกหมวดหมู่สี: ของสีแดง vs ของสีเหลือง 🔴🟡',
    description: 'ฝึกการรับรู้และจำแนกสีพื้นฐานจากวัตถุรอบตัว',
    instructionVoice: 'แยกสิ่งของที่มีสีแดงลงกล่องแดง และของสีเหลืองลงกล่องเหลืองนะ',
    baskets: [
      {
        id: 'basket-red',
        name: 'กล่องสีแดงสดใส',
        icon: '🔴',
        badgeColor: 'bg-rose-600 text-white',
        borderColor: 'border-rose-400',
        bgColor: 'bg-rose-50/80',
      },
      {
        id: 'basket-yellow',
        name: 'กล่องสีเหลืองสว่าง',
        icon: '🟡',
        badgeColor: 'bg-amber-500 text-white',
        borderColor: 'border-amber-400',
        bgColor: 'bg-amber-50/80',
      },
    ],
    items: [
      { id: 'sort-k1-red-apple', name: 'แอปเปิ้ลสีแดง', icon: '🍎', targetBasketId: 'basket-red' },
      { id: 'sort-k1-yellow-banana', name: 'กล้วยหอมสีเหลือง', icon: '🍌', targetBasketId: 'basket-yellow' },
      { id: 'sort-k1-red-truck', name: 'รถดับเพลิงสีแดง', icon: '🚒', targetBasketId: 'basket-red' },
      { id: 'sort-k1-yellow-sun', name: 'พระอาทิตย์สีเหลือง', icon: '☀️', targetBasketId: 'basket-yellow' },
      { id: 'sort-k1-red-heart', name: 'หัวใจสีแดง', icon: '❤️', targetBasketId: 'basket-red' },
      { id: 'sort-k1-yellow-duck', name: 'ลูกเป็ดสีเหลือง', icon: '🐤', targetBasketId: 'basket-yellow' },
    ],
  },
  {
    id: 'sort-k1-3',
    grade: 'K1',
    title: 'แยกหมวดหมู่: ของเล่นแสนสนุก vs เสื้อผ้าเครื่องแต่งกาย 🧸👕',
    description: 'จำแนกระหว่างของเล่นสำหรับเล่นเพลิดเพลินกับเสื้อผ้าเครื่องนุ่งห่ม',
    instructionVoice: 'แตะแยกของเล่นใส่กล่องของเล่น และเสื้อผ้าใส่ตะกร้าเสื้อผ้านะคะ',
    baskets: [
      {
        id: 'basket-toys',
        name: 'กล่องของเล่นแสนสนุก',
        icon: '🧸',
        badgeColor: 'bg-purple-600 text-white',
        borderColor: 'border-purple-400',
        bgColor: 'bg-purple-50/80',
      },
      {
        id: 'basket-clothes',
        name: 'ตะกร้าเสื้อผ้าเครื่องแต่งกาย',
        icon: '👕',
        badgeColor: 'bg-teal-600 text-white',
        borderColor: 'border-teal-400',
        bgColor: 'bg-teal-50/80',
      },
    ],
    items: [
      { id: 'sort-k1-robot', name: 'หุ่นยนต์ของเล่น', icon: '🤖', targetBasketId: 'basket-toys' },
      { id: 'sort-k1-shirt', name: 'เสื้อยืดแขนสั้น', icon: '👕', targetBasketId: 'basket-clothes' },
      { id: 'sort-k1-ball', name: 'ลูกฟุตบอลกลม', icon: '⚽', targetBasketId: 'basket-toys' },
      { id: 'sort-k1-dress', name: 'ชุดกระโปรงสวย', icon: '👗', targetBasketId: 'basket-clothes' },
      { id: 'sort-k1-car-toy', name: 'รถแข่งของเล่น', icon: '🏎️', targetBasketId: 'basket-toys' },
      { id: 'sort-k1-socks', name: 'ถุงเท้านุ่ม', icon: '🧦', targetBasketId: 'basket-clothes' },
    ],
  },

  // --- K2: แยก 3 หมวด (ยานพาหนะ บก/น้ำ/อากาศ, สิ่งมีชีวิต vs ไม่มีชีวิต, สัตว์บก/น้ำ/ปีก) ---
  {
    id: 'sort-k2-1',
    grade: 'K2',
    title: 'แยกประเภทยานพาหนะ: บก • น้ำ • อากาศ 🚗⛵✈️',
    description: 'เรียนรู้เส้นทางการคมนาคมของยานพาหนะแต่ละชนิด',
    instructionVoice: 'แยกยานพาหนะลงกล่องทางบก ทางน้ำ หรือทางอากาศให้ถูกต้องนะคะ',
    baskets: [
      {
        id: 'basket-land',
        name: 'ทางบก (วิ่งบนถนน)',
        icon: '🚗',
        badgeColor: 'bg-blue-600 text-white',
        borderColor: 'border-blue-400',
        bgColor: 'bg-blue-50/80',
      },
      {
        id: 'basket-water',
        name: 'ทางน้ำ (แล่นในแม่น้ำทะเล)',
        icon: '⛵',
        badgeColor: 'bg-cyan-600 text-white',
        borderColor: 'border-cyan-400',
        bgColor: 'bg-cyan-50/80',
      },
      {
        id: 'basket-air',
        name: 'ทางอากาศ (บินบนท้องฟ้า)',
        icon: '✈️',
        badgeColor: 'bg-indigo-600 text-white',
        borderColor: 'border-indigo-400',
        bgColor: 'bg-indigo-50/80',
      },
    ],
    items: [
      { id: 'sort-car', name: 'รถยนต์', icon: '🚗', targetBasketId: 'basket-land' },
      { id: 'sort-boat', name: 'เรือใบ', icon: '⛵', targetBasketId: 'basket-water' },
      { id: 'sort-plane', name: 'เครื่องบิน', icon: '✈️', targetBasketId: 'basket-air' },
      { id: 'sort-bus', name: 'รถบัส', icon: '🚌', targetBasketId: 'basket-land' },
      { id: 'sort-ship', name: 'เรือสำราญ', icon: '🚢', targetBasketId: 'basket-water' },
      { id: 'sort-heli', name: 'เฮลิคอปเตอร์', icon: '🚁', targetBasketId: 'basket-air' },
    ],
  },
  {
    id: 'sort-k2-2',
    grade: 'K2',
    title: 'แยกหมวดหมู่: สิ่งมีชีวิต vs สิ่งไม่มีชีวิต 🌱🪨',
    description: 'ฝึกการสังเกตคุณสมบัติของสิ่งมีชีวิต (หายใจ กินอาหาร โตได้) กับสิ่งไม่มีชีวิต',
    instructionVoice: 'แยกสิ่งของลงในกล่องสิ่งมีชีวิต หรือสิ่งไม่มีชีวิตให้ถูกต้องนะจ๊ะ',
    baskets: [
      {
        id: 'basket-living',
        name: 'สิ่งมีชีวิต (กินอาหาร เติบโตได้)',
        icon: '🌱',
        badgeColor: 'bg-emerald-600 text-white',
        borderColor: 'border-emerald-400',
        bgColor: 'bg-emerald-50/80',
      },
      {
        id: 'basket-nonliving',
        name: 'สิ่งไม่มีชีวิต (ไม่กินอาหาร ไม่โต)',
        icon: '🪨',
        badgeColor: 'bg-slate-600 text-white',
        borderColor: 'border-slate-400',
        bgColor: 'bg-slate-50/80',
      },
    ],
    items: [
      { id: 'sort-k2-plant', name: 'ต้นไม้ดอกไม้', icon: '🌱', targetBasketId: 'basket-living' },
      { id: 'sort-k2-puppy', name: 'ลูกสุนัข', icon: '🐶', targetBasketId: 'basket-living' },
      { id: 'sort-k2-bird', name: 'นกน้อยบนต้นไม้', icon: '🐦', targetBasketId: 'basket-living' },
      { id: 'sort-k2-rock', name: 'ก้อนหินริมทาง', icon: '🪨', targetBasketId: 'basket-nonliving' },
      { id: 'sort-k2-chair', name: 'เก้าอี้ไม้', icon: '🪑', targetBasketId: 'basket-nonliving' },
      { id: 'sort-k2-cup', name: 'แก้วน้ำใส', icon: '🥛', targetBasketId: 'basket-nonliving' },
    ],
  },
  {
    id: 'sort-k2-3',
    grade: 'K2',
    title: 'แยกที่อยู่ของสัตว์: สัตว์บก • สัตว์น้ำ • สัตว์ปีก 🐘🐬🦅',
    description: 'จำแนกถิ่นที่อยู่และลักษณะทางกายภาพของสัตว์',
    instructionVoice: 'พาสัตว์แต่ละตัวไปใส่ในกล่องสัตว์บก สัตว์น้ำ หรือสัตว์ปีกให้ถูกต้องนะ',
    baskets: [
      {
        id: 'basket-land-animal',
        name: 'สัตว์บก (เดินบนพื้นดิน)',
        icon: '🐘',
        badgeColor: 'bg-amber-600 text-white',
        borderColor: 'border-amber-400',
        bgColor: 'bg-amber-50/80',
      },
      {
        id: 'basket-water-animal',
        name: 'สัตว์น้ำ (ว่ายน้ำในน้ำ)',
        icon: '🐬',
        badgeColor: 'bg-cyan-600 text-white',
        borderColor: 'border-cyan-400',
        bgColor: 'bg-cyan-50/80',
      },
      {
        id: 'basket-bird-animal',
        name: 'สัตว์ปีก (มีปีกบินบนฟ้า)',
        icon: '🦅',
        badgeColor: 'bg-sky-600 text-white',
        borderColor: 'border-sky-400',
        bgColor: 'bg-sky-50/80',
      },
    ],
    items: [
      { id: 'sort-k2-elephant', name: 'ช้างป่าตัวใหญ่', icon: '🐘', targetBasketId: 'basket-land-animal' },
      { id: 'sort-k2-lion', name: 'สิงโตเจ้าป่า', icon: '🦁', targetBasketId: 'basket-land-animal' },
      { id: 'sort-k2-dolphin', name: 'ปลาโลมาแสนรู้', icon: '🐬', targetBasketId: 'basket-water-animal' },
      { id: 'sort-k2-crab', name: 'ปูทะเลกล้ามโต', icon: '🦀', targetBasketId: 'basket-water-animal' },
      { id: 'sort-k2-parrot', name: 'นกแก้วพูดได้', icon: '🦜', targetBasketId: 'basket-bird-animal' },
      { id: 'sort-k2-owl', name: 'นกฮูกตาโต', icon: '🦉', targetBasketId: 'basket-bird-animal' },
    ],
  },

  // --- K3: แยก 3 หมวด (ขยะ 3 ถัง, อาหารมีประโยชน์ vs ขนม, ของใช้ 3 ห้อง) ---
  {
    id: 'sort-k3-1',
    grade: 'K3',
    title: 'พลเมืองรุ่นจิ๋ว คัดแยกขยะ 3 ถัง ♻️🍎🔋',
    description: 'ส่งเสริมจิตสำนึกรักสิ่งแวดล้อม แยกขยะรีไซเคิล ขยะอินทรีย์ และขยะอันตราย',
    instructionVoice: 'ช่วยนำสิ่งของทิ้งลงถังขยะที่ถูกต้อง เพื่อช่วยดูแลโลกของเรานะจ๊ะ',
    baskets: [
      {
        id: 'basket-recycle',
        name: 'ถังขยะรีไซเคิล (สีเหลือง)',
        icon: '♻️',
        badgeColor: 'bg-amber-600 text-white',
        borderColor: 'border-amber-400',
        bgColor: 'bg-amber-50/80',
      },
      {
        id: 'basket-organic',
        name: 'ถังขยะเปียก/อินทรีย์ (สีเขียว)',
        icon: '🌱',
        badgeColor: 'bg-emerald-600 text-white',
        borderColor: 'border-emerald-400',
        bgColor: 'bg-emerald-50/80',
      },
      {
        id: 'basket-hazard',
        name: 'ถังขยะอันตราย (สีแดง)',
        icon: '⚠️',
        badgeColor: 'bg-rose-600 text-white',
        borderColor: 'border-rose-400',
        bgColor: 'bg-rose-50/80',
      },
    ],
    items: [
      { id: 'sort-bottle', name: 'ขวดพลาสติก', icon: '🍾', targetBasketId: 'basket-recycle' },
      { id: 'sort-paper', name: 'กล่องกระดาษ', icon: '📦', targetBasketId: 'basket-recycle' },
      { id: 'sort-bone', name: 'เศษอาหารก้างปลา', icon: '🐟', targetBasketId: 'basket-organic' },
      { id: 'sort-banana-peel', name: 'เปลือกกล้วย', icon: '🍌', targetBasketId: 'basket-organic' },
      { id: 'sort-battery', name: 'ถ่านไฟฉาย', icon: '🔋', targetBasketId: 'basket-hazard' },
      { id: 'sort-bulb', name: 'หลอดไฟแตก', icon: '💡', targetBasketId: 'basket-hazard' },
    ],
  },
  {
    id: 'sort-k3-2',
    grade: 'K3',
    title: 'สุขนิสัยการกิน: อาหารมีประโยชน์ vs ขนมหวานควรทานแต่น้อย 🥦🍭',
    description: 'เรียนรู้โภชนาการที่ทำให้ร่างกายแข็งแรงและเติบโตสมวัย',
    instructionVoice: 'แยกอาหารที่มีประโยชน์ต่อร่างกาย และขนมหวานที่ควรทานแต่น้อยนะ',
    baskets: [
      {
        id: 'basket-healthy',
        name: 'อาหารมีประโยชน์ (ร่างกายแข็งแรง)',
        icon: '🥦',
        badgeColor: 'bg-emerald-600 text-white',
        borderColor: 'border-emerald-400',
        bgColor: 'bg-emerald-50/80',
      },
      {
        id: 'basket-junk',
        name: 'ขนมหวาน (ควรทานแต่น้อย)',
        icon: '🍭',
        badgeColor: 'bg-rose-600 text-white',
        borderColor: 'border-rose-400',
        bgColor: 'bg-rose-50/80',
      },
    ],
    items: [
      { id: 'sort-k3-broccoli', name: 'ผักบรอกโคลีเขียว', icon: '🥦', targetBasketId: 'basket-healthy' },
      { id: 'sort-k3-milk', name: 'นมสดแคลเซียมสูง', icon: '🥛', targetBasketId: 'basket-healthy' },
      { id: 'sort-k3-fish', name: 'ปลาแซลมอนเนื้อส้ม', icon: '🐟', targetBasketId: 'basket-healthy' },
      { id: 'sort-k3-candy', name: 'อมยิ้มรสหวานจัด', icon: '🍭', targetBasketId: 'basket-junk' },
      { id: 'sort-k3-soda', name: 'น้ำอัดลมซ่า', icon: '🥤', targetBasketId: 'basket-junk' },
      { id: 'sort-k3-chips', name: 'มันฝรั่งทอดกรอบ', icon: '🍟', targetBasketId: 'basket-junk' },
    ],
  },
  {
    id: 'sort-k3-3',
    grade: 'K3',
    title: 'จัดเก็บสิ่งของในบ้าน: ห้องครัว • ห้องน้ำ • ห้องนอน 🍳🛁🛏️',
    description: 'ฝึกการจัดระเบียบสิ่งของเครื่องใช้ให้เข้าที่ตามห้องในบ้าน',
    instructionVoice: 'นำสิ่งของไปจัดเก็บในห้องครัว ห้องน้ำ หรือห้องนอนให้เข้าที่นะจ๊ะ',
    baskets: [
      {
        id: 'basket-kitchen',
        name: 'ห้องครัว (ทำอาหาร)',
        icon: '🍳',
        badgeColor: 'bg-amber-600 text-white',
        borderColor: 'border-amber-400',
        bgColor: 'bg-amber-50/80',
      },
      {
        id: 'basket-bathroom',
        name: 'ห้องน้ำ (อาบน้ำชำระล้าง)',
        icon: '🛁',
        badgeColor: 'bg-sky-600 text-white',
        borderColor: 'border-sky-400',
        bgColor: 'bg-sky-50/80',
      },
      {
        id: 'basket-bedroom',
        name: 'ห้องนอน (พักผ่อนนอนหลับ)',
        icon: '🛏️',
        badgeColor: 'bg-indigo-600 text-white',
        borderColor: 'border-indigo-400',
        bgColor: 'bg-indigo-50/80',
      },
    ],
    items: [
      { id: 'sort-k3-pan', name: 'กระทะทำอาหาร', icon: '🍳', targetBasketId: 'basket-kitchen' },
      { id: 'sort-k3-spoon', name: 'ช้อนและส้อม', icon: '🍴', targetBasketId: 'basket-kitchen' },
      { id: 'sort-k3-soap', name: 'สบู่ก้อนอาบน้ำ', icon: '🧼', targetBasketId: 'basket-bathroom' },
      { id: 'sort-k3-shower', name: 'ฝักบัวอาบน้ำ', icon: '🚿', targetBasketId: 'basket-bathroom' },
      { id: 'sort-k3-pillow', name: 'หมอนหนุนนอนนุ่ม', icon: '🛌', targetBasketId: 'basket-bedroom' },
      { id: 'sort-k3-lamp', name: 'โคมไฟหัวเตียง', icon: '💡', targetBasketId: 'basket-bedroom' },
    ],
  },
  // --- เพิ่มอีก 7 ด่านจัดหมวดหมู่ใหม่ตามคำขอ ---
  {
    id: 'sort-new-k1-bathroom-kitchen',
    grade: 'K1',
    title: 'แยกของใช้ในห้องน้ำ vs ของใช้ในห้องครัว 🚿🍳',
    description: 'ฝึกการจำแนกอุปกรณ์และของใช้ตามห้องต่างๆ ภายในบ้าน',
    instructionVoice: 'แตะเลือกสิ่งของ แล้วแยกใส่ตะกร้าห้องน้ำหรือห้องครัวให้ถูกต้องนะจ๊ะ',
    baskets: [
      {
        id: 'basket-bath',
        name: 'ของใช้ในห้องน้ำ',
        icon: '🚿',
        badgeColor: 'bg-sky-500 text-white',
        borderColor: 'border-sky-400',
        bgColor: 'bg-sky-50/80',
      },
      {
        id: 'basket-kitchen',
        name: 'ของใช้ในห้องครัว',
        icon: '🍳',
        badgeColor: 'bg-amber-500 text-white',
        borderColor: 'border-amber-400',
        bgColor: 'bg-amber-50/80',
      },
    ],
    items: [
      { id: 'item-bath-toothbrush', name: 'แปรงสีฟัน', icon: '🪥', targetBasketId: 'basket-bath' },
      { id: 'item-kitchen-pan', name: 'กระทะทอดไข่', icon: '🍳', targetBasketId: 'basket-kitchen' },
      { id: 'item-bath-soap', name: 'สบู่ก้อนหอม', icon: '🧼', targetBasketId: 'basket-bath' },
      { id: 'item-kitchen-ladle', name: 'ทัพพีตักแกง', icon: '🥄', targetBasketId: 'basket-kitchen' },
      { id: 'item-bath-shampoo', name: 'ยาสระผม', icon: '🧴', targetBasketId: 'basket-bath' },
      { id: 'item-kitchen-pot', name: 'หม้อต้มซุป', icon: '🍲', targetBasketId: 'basket-kitchen' },
    ],
  },
  {
    id: 'sort-new-k1-wheels-nowheels',
    grade: 'K1',
    title: 'แยกสิ่งของมีล้อหมุน vs สิ่งของไม่มีล้อ 🛞⚽',
    description: 'ฝึกการสังเกตคุณลักษณะทางกายภาพ (ล้อเลื่อน)',
    instructionVoice: 'แยกสิ่งของที่มีล้อหมุนได้กับสิ่งของที่ไม่มีล้อลงตะกร้าเลยจ้า',
    baskets: [
      {
        id: 'basket-wheels',
        name: 'สิ่งของมีล้อหมุนได้',
        icon: '🛞',
        badgeColor: 'bg-indigo-600 text-white',
        borderColor: 'border-indigo-400',
        bgColor: 'bg-indigo-50/80',
      },
      {
        id: 'basket-no-wheels',
        name: 'สิ่งของไม่มีล้อ',
        icon: '⚽',
        badgeColor: 'bg-emerald-600 text-white',
        borderColor: 'border-emerald-400',
        bgColor: 'bg-emerald-50/80',
      },
    ],
    items: [
      { id: 'item-wheel-bike', name: 'รถจักรยานสองล้อ', icon: '🚲', targetBasketId: 'basket-wheels' },
      { id: 'item-nowheel-ball', name: 'ลูกฟุตบอลกลม', icon: '⚽', targetBasketId: 'basket-no-wheels' },
      { id: 'item-wheel-skate', name: 'สเก็ตบอร์ดแสนเท่', icon: '🛹', targetBasketId: 'basket-wheels' },
      { id: 'item-nowheel-book', name: 'หนังสือภาพนิทาน', icon: '📚', targetBasketId: 'basket-no-wheels' },
      { id: 'item-wheel-car', name: 'รถยนต์วิ่งฉิว', icon: '🚗', targetBasketId: 'basket-wheels' },
      { id: 'item-nowheel-apple', name: 'ผลแอปเปิ้ลสีแดง', icon: '🍎', targetBasketId: 'basket-no-wheels' },
    ],
  },
  {
    id: 'sort-new-k2-pets-wild',
    grade: 'K2',
    title: 'แยกสัตว์เลี้ยงในบ้าน vs สัตว์ป่าธรรมชาติ 🐕🦁',
    description: 'จำแนกถิ่นที่อยู่และพฤติกรรมความใกล้ชิดของสัตว์กับมนุษย์',
    instructionVoice: 'แยกสัตว์เลี้ยงน่ารักกับสัตว์ป่าดุร้ายลงในบ้านของแต่ละตัวนะจ๊ะ',
    baskets: [
      {
        id: 'basket-pets',
        name: 'สัตว์เลี้ยงในบ้าน',
        icon: '🐕',
        badgeColor: 'bg-pink-500 text-white',
        borderColor: 'border-pink-400',
        bgColor: 'bg-pink-50/80',
      },
      {
        id: 'basket-wild',
        name: 'สัตว์ป่าธรรมชาติ',
        icon: '🦁',
        badgeColor: 'bg-amber-600 text-white',
        borderColor: 'border-amber-400',
        bgColor: 'bg-amber-50/80',
      },
    ],
    items: [
      { id: 'item-pet-dog', name: 'สุนัขแสนรู้', icon: '🐶', targetBasketId: 'basket-pets' },
      { id: 'item-wild-tiger', name: 'เสือลายพาดกลอน', icon: '🐯', targetBasketId: 'basket-wild' },
      { id: 'item-pet-cat', name: 'แมวเหมียวขี้อ้อน', icon: '🐱', targetBasketId: 'basket-pets' },
      { id: 'item-wild-lion', name: 'สิงโตเจ้าป่า', icon: '🦁', targetBasketId: 'basket-wild' },
      { id: 'item-pet-rabbit', name: 'กระต่ายปุกปุย', icon: '🐰', targetBasketId: 'basket-pets' },
      { id: 'item-wild-croc', name: 'จระเข้ตัวใหญ่', icon: '🐊', targetBasketId: 'basket-wild' },
    ],
  },
  {
    id: 'sort-new-k2-sweet-savory',
    grade: 'K2',
    title: 'แยกของหวานชื่นใจ vs อาหารคาวจานหลัก 🍰🍲',
    description: 'เรียนรู้รสชาติและประเภทอาหารคาวหวานในชีวิตประจำวัน',
    instructionVoice: 'แตะแยกขนมของหวานใส่จานของหวาน และอาหารคาวใส่ชามอาหารคาวนะ',
    baskets: [
      {
        id: 'basket-sweet',
        name: 'ของหวาน & ขนมอร่อย',
        icon: '🍰',
        badgeColor: 'bg-rose-500 text-white',
        borderColor: 'border-rose-400',
        bgColor: 'bg-rose-50/80',
      },
      {
        id: 'basket-savory',
        name: 'อาหารคาวจานหลัก',
        icon: '🍲',
        badgeColor: 'bg-orange-600 text-white',
        borderColor: 'border-orange-400',
        bgColor: 'bg-orange-50/80',
      },
    ],
    items: [
      { id: 'item-sweet-icecream', name: 'ไอศกรีมโคนหวานเย็น', icon: '🍦', targetBasketId: 'basket-sweet' },
      { id: 'item-savory-friedrice', name: 'ข้าวผัดไข่ใส่ผัก', icon: '🍛', targetBasketId: 'basket-savory' },
      { id: 'item-sweet-cake', name: 'ขนมเค้กสตรอว์เบอร์รี', icon: '🍰', targetBasketId: 'basket-sweet' },
      { id: 'item-savory-noodle', name: 'ก๋วยเตี๋ยวน้ำซุปกลมกล่อม', icon: '🍜', targetBasketId: 'basket-savory' },
      { id: 'item-sweet-lollipop', name: 'อมยิ้มหลากสี', icon: '🍭', targetBasketId: 'basket-sweet' },
      { id: 'item-savory-omelet', name: 'ไข่เจียวฟูหอมกรุ่น', icon: '🍳', targetBasketId: 'basket-savory' },
    ],
  },
  {
    id: 'sort-new-k2-summer-winter-clothes',
    grade: 'K2',
    title: 'แยกเครื่องแต่งกายฤดูร้อน vs เครื่องแต่งกายฤดูหนาว 🩳🧥',
    description: 'การเลือกสวมใส่เสื้อผ้าให้เหมาะสมกับสภาพภูมิอากาศ',
    instructionVoice: 'ชุดไหนใส่หน้าร้อน ชุดไหนใส่หน้าหนาว แยกใส่ตู้เสื้อผ้าให้ถูกต้องนะจ๊ะ',
    baskets: [
      {
        id: 'basket-summer',
        name: 'เครื่องแต่งกายฤดูร้อน',
        icon: '🩳',
        badgeColor: 'bg-amber-500 text-white',
        borderColor: 'border-amber-400',
        bgColor: 'bg-amber-50/80',
      },
      {
        id: 'basket-winter',
        name: 'เครื่องแต่งกายฤดูหนาว',
        icon: '🧥',
        badgeColor: 'bg-blue-600 text-white',
        borderColor: 'border-blue-400',
        bgColor: 'bg-blue-50/80',
      },
    ],
    items: [
      { id: 'item-summer-glasses', name: 'แว่นตากันแดด', icon: '🕶️', targetBasketId: 'basket-summer' },
      { id: 'item-winter-coat', name: 'เสื้อโค้ตกันหนาวหนา', icon: '🧥', targetBasketId: 'basket-winter' },
      { id: 'item-summer-hat', name: 'หมวกปีกกว้างกันแดด', icon: '👒', targetBasketId: 'basket-summer' },
      { id: 'item-winter-scarf', name: 'ผ้าพันคอไหมพรม', icon: '🧣', targetBasketId: 'basket-winter' },
      { id: 'item-summer-tank', name: 'เสื้อกล้ามใส่สบาย', icon: '🎽', targetBasketId: 'basket-summer' },
      { id: 'item-winter-gloves', name: 'ถุงมือไหมพรมอุ่น', icon: '🧤', targetBasketId: 'basket-winter' },
    ],
  },
  {
    id: 'sort-new-k3-materials-3',
    grade: 'K3',
    title: 'แยกประเภทวัสดุ: แก้วใส vs ไม้ธรรมชาติ vs โลหะแข็งแรง 🥛🪵🥄',
    description: 'วิทยาศาสตร์ปฐมวัย: สังเกตและจำแนกสมบัติของวัสดุรอบตัว',
    instructionVoice: 'สิ่งของชิ้นนี้ทำจาก แก้ว ไม้ หรือโลหะ แตะแยกใส่กล่องวัสดุเลยนะจ๊ะ',
    baskets: [
      {
        id: 'basket-glass',
        name: 'วัสดุแก้วใส',
        icon: '🥛',
        badgeColor: 'bg-cyan-600 text-white',
        borderColor: 'border-cyan-400',
        bgColor: 'bg-cyan-50/80',
      },
      {
        id: 'basket-wood',
        name: 'วัสดุไม้ธรรมชาติ',
        icon: '🪵',
        badgeColor: 'bg-amber-700 text-white',
        borderColor: 'border-amber-500',
        bgColor: 'bg-amber-50/80',
      },
      {
        id: 'basket-metal',
        name: 'วัสดุโลหะ/เหล็ก',
        icon: '🥄',
        badgeColor: 'bg-slate-600 text-white',
        borderColor: 'border-slate-400',
        bgColor: 'bg-slate-50/80',
      },
    ],
    items: [
      { id: 'mat-glass-cup', name: 'แก้วน้ำใสแจ๋ว', icon: '🥛', targetBasketId: 'basket-glass' },
      { id: 'mat-wood-chair', name: 'เก้าอี้ไม้แข็งแรง', icon: '🪑', targetBasketId: 'basket-wood' },
      { id: 'mat-metal-spoon', name: 'ช้อนส้อมสแตนเลส', icon: '🍴', targetBasketId: 'basket-metal' },
      { id: 'mat-glass-jar', name: 'ขวดโหลแก้ว', icon: '🫙', targetBasketId: 'basket-glass' },
      { id: 'mat-wood-chopstick', name: 'ตะเกียบไม้ไผ่', icon: '🥢', targetBasketId: 'basket-wood' },
      { id: 'mat-metal-key', name: 'ลูกกุญแจโลหะ', icon: '🗝️', targetBasketId: 'basket-metal' },
      { id: 'mat-glass-mirror', name: 'กระจกเงาสะท้อน', icon: '🪞', targetBasketId: 'basket-glass' },
      { id: 'mat-wood-log', name: 'ท่อนไม้ซุง', icon: '🪵', targetBasketId: 'basket-wood' },
      { id: 'mat-metal-scissors', name: 'กรรไกรตัดกระดาษ', icon: '✂️', targetBasketId: 'basket-metal' },
    ],
  },
  {
    id: 'sort-new-k3-recycling-bins',
    grade: 'K3',
    title: 'แยกถังขยะรักษ์โลก: ขยะเปียก vs รีไซเคิล vs ขยะอันตราย 🍏📦🔋',
    description: 'การอนุรักษ์สิ่งแวดล้อมและคัดแยกขยะอย่างถูกสุขอนามัย',
    instructionVoice: 'ช่วยโลกให้น่าอยู่! นำขยะแต่ละชิ้นไปทิ้งลงในถังขยะสีที่ถูกต้องนะจ๊ะ',
    baskets: [
      {
        id: 'basket-organic',
        name: 'ขยะเปียก (ย่อยสลายได้)',
        icon: '🍏',
        badgeColor: 'bg-emerald-600 text-white',
        borderColor: 'border-emerald-400',
        bgColor: 'bg-emerald-50/80',
      },
      {
        id: 'basket-recycle',
        name: 'ขยะรีไซเคิล (แปรรูปได้)',
        icon: '📦',
        badgeColor: 'bg-amber-500 text-white',
        borderColor: 'border-amber-400',
        bgColor: 'bg-amber-50/80',
      },
      {
        id: 'basket-hazard',
        name: 'ขยะอันตราย (มีสารพิษ)',
        icon: '🔋',
        badgeColor: 'bg-rose-600 text-white',
        borderColor: 'border-rose-400',
        bgColor: 'bg-rose-50/80',
      },
    ],
    items: [
      { id: 'rec-banana-peel', name: 'เปลือกกล้วยและเศษผัก', icon: '🍌', targetBasketId: 'basket-organic' },
      { id: 'rec-box-cardboard', name: 'ลังกระดาษลูกฟูก', icon: '📦', targetBasketId: 'basket-recycle' },
      { id: 'rec-battery-old', name: 'ถ่านไฟฉายหมดอายุ', icon: '🔋', targetBasketId: 'basket-hazard' },
      { id: 'rec-fish-bone', name: 'ก้างปลาและเศษอาหาร', icon: '🐟', targetBasketId: 'basket-organic' },
      { id: 'rec-bottle-plastic', name: 'ขวดพลาสติกใส', icon: '🍾', targetBasketId: 'basket-recycle' },
      { id: 'rec-light-bulb', name: 'หลอดไฟนีออนแตก', icon: '💡', targetBasketId: 'basket-hazard' },
      { id: 'rec-can-soda', name: 'กระป๋องน้ำอัดลมอลูมิเนียม', icon: '🥫', targetBasketId: 'basket-recycle' },
      { id: 'rec-pesticide', name: 'ขวดยาฆ่าแมลงอันตราย', icon: '☠️', targetBasketId: 'basket-hazard' },
      { id: 'rec-leaves-dry', name: 'เศษใบไม้แห้ง', icon: '🍂', targetBasketId: 'basket-organic' },
    ],
  },
  ...EXPANDED_SORTING_LEVELS,
  ...EXTRA_SORTING_LEVELS,
];

// ==========================================
// 3. เกมต่อภาพจิ๊กซอว์ (JIGSAW PUZZLES)
// ==========================================

export interface JigsawPiece {
  id: string;
  targetIndex: number; // 0 to (totalPieces - 1)
  icon: string;
  label: string;
  color: string;
  borderAccent: string;
}

export interface JigsawLevel {
  id: string;
  grade: Grade;
  rows: number;
  cols: number;
  totalPieces: number;
  title: string;
  themeTitle: string;
  themeBanner: string;
  previewEmoji: string;
  instructionVoice: string;
  pieces: JigsawPiece[];
}

export const JIGSAW_LEVELS: JigsawLevel[] = [
  // --- K1: จิ๊กซอว์ 4 ชิ้น (2 x 2) ---
  {
    id: 'jig-k1-1',
    grade: 'K1',
    rows: 2,
    cols: 2,
    totalPieces: 4,
    title: 'จิ๊กซอว์ 4 ชิ้น: น้องหมาขนปุยในสวน 🐶🌻',
    themeTitle: 'สัตว์เลี้ยงแสนรัก',
    themeBanner: 'from-amber-400 via-orange-300 to-yellow-300',
    previewEmoji: '🐶',
    instructionVoice: 'ลากชิ้นส่วนจิ๊กซอว์ 4 ชิ้นมาวางในกรอบให้เป็นภาพน้องหมาสมบูรณ์นะคะ',
    pieces: [
      { id: 'p0', targetIndex: 0, icon: '👂', label: 'หูน้องหมาซ้าย', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'p1', targetIndex: 1, icon: '🐶', label: 'ใบหน้ายิ้มแย้ม', color: 'bg-amber-200', borderAccent: 'border-amber-400' },
      { id: 'p2', targetIndex: 2, icon: '🐾', label: 'ขาหน้าเดินเล่น', color: 'bg-orange-100', borderAccent: 'border-orange-300' },
      { id: 'p3', targetIndex: 3, icon: '🌻', label: 'ดอกทานตะวันริมรั้ว', color: 'bg-yellow-100', borderAccent: 'border-yellow-400' },
    ],
  },
  {
    id: 'jig-k1-2',
    grade: 'K1',
    rows: 2,
    cols: 2,
    totalPieces: 4,
    title: 'จิ๊กซอว์ 4 ชิ้น: รถโรงเรียนสีเหลืองสดใส 🚌☀️',
    themeTitle: 'ไปโรงเรียนกันเถอะ',
    themeBanner: 'from-yellow-400 via-amber-300 to-orange-300',
    previewEmoji: '🚌',
    instructionVoice: 'ต่อภาพรถโรงเรียนแสนสนุกให้ครบ 4 ชิ้นจ้า',
    pieces: [
      { id: 'p0', targetIndex: 0, icon: '☀️', label: 'พระอาทิตย์ยามเช้า', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
      { id: 'p1', targetIndex: 1, icon: '🪟', label: 'หน้าต่างเพื่อนๆ โบกมือ', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'p2', targetIndex: 2, icon: '🚌', label: 'หน้ารถบัสไฟหน้ากลม', color: 'bg-amber-200', borderAccent: 'border-amber-400' },
      { id: 'p3', targetIndex: 3, icon: '🛞', label: 'ล้อรถหมุนกลมๆ', color: 'bg-slate-200', borderAccent: 'border-slate-400' },
    ],
  },
  {
    id: 'jig-k1-3',
    grade: 'K1',
    rows: 2,
    cols: 2,
    totalPieces: 4,
    title: 'จิ๊กซอว์ 4 ชิ้น: น้องแมวเหมียวในตะกร้า 🐱🧶',
    themeTitle: 'แมวน้อยขี้เล่น',
    themeBanner: 'from-pink-400 via-rose-300 to-amber-300',
    previewEmoji: '🐱',
    instructionVoice: 'ต่อภาพน้องแมวเหมียวน่ารัก 4 ชิ้นให้สมบูรณ์เลยนะ',
    pieces: [
      { id: 'k1-3-p0', targetIndex: 0, icon: '🎀', label: 'โบว์ผูกหูน่ารัก', color: 'bg-pink-100', borderAccent: 'border-pink-300' },
      { id: 'k1-3-p1', targetIndex: 1, icon: '🐱', label: 'หน้าแมวยิ้มสดใส', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'k1-3-p2', targetIndex: 2, icon: '🧶', label: 'ไหมพรมลูกกลม', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k1-3-p3', targetIndex: 3, icon: '🧺', label: 'ตะกร้าสานอบอุ่น', color: 'bg-orange-100', borderAccent: 'border-orange-300' },
    ],
  },
  {
    id: 'jig-k1-4',
    grade: 'K1',
    rows: 2,
    cols: 2,
    totalPieces: 4,
    title: 'จิ๊กซอว์ 4 ชิ้น: เรือใบแล่นในทะเลสีคราม ⛵🌊',
    themeTitle: 'การเดินทางทางน้ำ',
    themeBanner: 'from-sky-400 via-blue-300 to-cyan-300',
    previewEmoji: '⛵',
    instructionVoice: 'ลากชิ้นส่วนเรือใบ 4 ชิ้นมาเรียงให้เป็นเรือใบแล่นฉิวจ้า',
    pieces: [
      { id: 'k1-4-p0', targetIndex: 0, icon: '☁️', label: 'ก้อนเมฆลอยฟ้า', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'k1-4-p1', targetIndex: 1, icon: '⛵', label: 'เสากระโดงและใบเรือ', color: 'bg-cyan-100', borderAccent: 'border-cyan-300' },
      { id: 'k1-4-p2', targetIndex: 2, icon: '🚤', label: 'ลำเรือแล่นตัดน้ำ', color: 'bg-blue-100', borderAccent: 'border-blue-300' },
      { id: 'k1-4-p3', targetIndex: 3, icon: '🌊', label: 'เกลียวคลื่นทะเลใส', color: 'bg-indigo-100', borderAccent: 'border-indigo-300' },
    ],
  },
  {
    id: 'jig-k1-5',
    grade: 'K1',
    rows: 2,
    cols: 2,
    totalPieces: 4,
    title: 'จิ๊กซอว์ 4 ชิ้น: สวนดอกไม้และผึ้งน้อยแสนขยัน 🐝🌸',
    themeTitle: 'ผึ้งน้อยแสนขยัน',
    themeBanner: 'from-amber-300 via-yellow-200 to-lime-300',
    previewEmoji: '🐝',
    instructionVoice: 'ช่วยต่อภาพสวนดอกไม้และผึ้งน้อยแสนขยัน 4 ชิ้นให้เสร็จสมบูรณ์นะจ๊ะ',
    pieces: [
      { id: 'k1-5-p0', targetIndex: 0, icon: '🌤️', label: 'ท้องฟ้าสดใส', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'k1-5-p1', targetIndex: 1, icon: '🐝', label: 'ผึ้งน้อยบินร่า', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k1-5-p2', targetIndex: 2, icon: '🌸', label: 'ดอกไม้สีชมพู', color: 'bg-pink-100', borderAccent: 'border-pink-300' },
      { id: 'k1-5-p3', targetIndex: 3, icon: '🍯', label: 'โถน้ำผึ้งหวาน', color: 'bg-yellow-100', borderAccent: 'border-yellow-400' },
    ],
  },
  {
    id: 'jig-k1-6',
    grade: 'K1',
    rows: 2,
    cols: 2,
    totalPieces: 4,
    title: 'จิ๊กซอว์ 4 ชิ้น: กระต่ายน้อยกับแปลงแครอท 🐰🥕',
    themeTitle: 'กระต่ายน้อยแสนซน',
    themeBanner: 'from-orange-400 via-amber-300 to-emerald-300',
    previewEmoji: '🐰',
    instructionVoice: 'ลากชิ้นส่วนกระต่ายน้อยและแครอทมาต่อให้สมบูรณ์เลยนะ',
    pieces: [
      { id: 'k1-6-p0', targetIndex: 0, icon: '☀️', label: 'แสงแดดอุ่น', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
      { id: 'k1-6-p1', targetIndex: 1, icon: '🐰', label: 'กระต่ายหูยาว', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'k1-6-p2', targetIndex: 2, icon: '🥕', label: 'แครอทสีส้ม', color: 'bg-orange-100', borderAccent: 'border-orange-300' },
      { id: 'k1-6-p3', targetIndex: 3, icon: '🌱', label: 'แปลงผักสวนครัว', color: 'bg-emerald-100', borderAccent: 'border-emerald-300' },
    ],
  },

  // --- K2: จิ๊กซอว์ 6 ชิ้น (2 x 3) ---
  {
    id: 'jig-k2-1',
    grade: 'K2',
    rows: 2,
    cols: 3,
    totalPieces: 6,
    title: 'จิ๊กซอว์ 6 ชิ้น: โลกใต้ท้องทะเลมหัศจรรย์ 🐬🌊',
    themeTitle: 'สัตว์น้ำใต้สมุทร',
    themeBanner: 'from-sky-400 via-cyan-300 to-blue-400',
    previewEmoji: '🐬',
    instructionVoice: 'ต่อชิ้นส่วนใต้ท้องทะเล 6 ชิ้นให้สวยงามสมบูรณ์เลยนะ',
    pieces: [
      { id: 'p0', targetIndex: 0, icon: '🌊', label: 'คลื่นน้ำประกายแสง', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'p1', targetIndex: 1, icon: '🐬', label: 'ปลาโลมาแสนฉลาด', color: 'bg-cyan-200', borderAccent: 'border-cyan-400' },
      { id: 'p2', targetIndex: 2, icon: '🫧', label: 'ฟองอากาศลอยขึ้น', color: 'bg-blue-100', borderAccent: 'border-blue-300' },
      { id: 'p3', targetIndex: 3, icon: '🐠', label: 'ปลาการ์ตูนสีส้ม', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'p4', targetIndex: 4, icon: '🪸', label: 'ปะการังสีชมพู', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'p5', targetIndex: 5, icon: '⭐', label: 'ปลาดาวสีทอง', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
    ],
  },
  {
    id: 'jig-k2-2',
    grade: 'K2',
    rows: 2,
    cols: 3,
    totalPieces: 6,
    title: 'จิ๊กซอว์ 6 ชิ้น: สวนสัตว์ซาฟารีแสนสนุก 🦒🦁',
    themeTitle: 'เพื่อนสัตว์ซาฟารี',
    themeBanner: 'from-amber-400 via-yellow-300 to-orange-400',
    previewEmoji: '🦒',
    instructionVoice: 'ต่อภาพเพื่อนสัตว์ในทุ่งหญ้าซาฟารีทั้ง 6 ชิ้นให้ถูกต้องนะคะ',
    pieces: [
      { id: 'k2-2-p0', targetIndex: 0, icon: '☀️', label: 'ท้องฟ้าแดดอุ่น', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
      { id: 'k2-2-p1', targetIndex: 1, icon: '🦒', label: 'ยีราฟคอยาวชะลูด', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k2-2-p2', targetIndex: 2, icon: '🌳', label: 'ต้นไม้ใหญ่ร่มรื่น', color: 'bg-emerald-100', borderAccent: 'border-emerald-300' },
      { id: 'k2-2-p3', targetIndex: 3, icon: '🦁', label: 'สิงโตเจ้าป่าใจดี', color: 'bg-orange-100', borderAccent: 'border-orange-300' },
      { id: 'k2-2-p4', targetIndex: 4, icon: '🦓', label: 'ม้าลายลายทางขาวดำ', color: 'bg-slate-100', borderAccent: 'border-slate-300' },
      { id: 'k2-2-p5', targetIndex: 5, icon: '🌿', label: 'ทุ่งหญ้าเขียวขจี', color: 'bg-lime-100', borderAccent: 'border-lime-300' },
    ],
  },
  {
    id: 'jig-k2-3',
    grade: 'K2',
    rows: 2,
    cols: 3,
    totalPieces: 6,
    title: 'จิ๊กซอว์ 6 ชิ้น: ฟาร์มสุขสันต์และแปลงผัก 🚜🐮',
    themeTitle: 'ฟาร์มเกษตรกรน้อย',
    themeBanner: 'from-emerald-400 via-teal-300 to-lime-300',
    previewEmoji: '🚜',
    instructionVoice: 'ช่วยต่อภาพฟาร์มสุขสันต์ 6 ชิ้นให้สวยงามสมบูรณ์เลยนะ',
    pieces: [
      { id: 'k2-3-p0', targetIndex: 0, icon: '🏠', label: 'โรงนาสีแดงสด', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'k2-3-p1', targetIndex: 1, icon: '💨', label: 'กังหันลมหมุนติ้ว', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'k2-3-p2', targetIndex: 2, icon: '🐮', label: 'แม่วัวกินหญ้า', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k2-3-p3', targetIndex: 3, icon: '🚜', label: 'รถแทรกเตอร์คันเก่ง', color: 'bg-emerald-100', borderAccent: 'border-emerald-300' },
      { id: 'k2-3-p4', targetIndex: 4, icon: '🥕', label: 'แปลงผักแครอท', color: 'bg-orange-100', borderAccent: 'border-orange-300' },
      { id: 'k2-3-p5', targetIndex: 5, icon: '🐣', label: 'ลูกไก่วิ่งเล่น', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
    ],
  },
  {
    id: 'jig-k2-4',
    grade: 'K2',
    rows: 2,
    cols: 3,
    totalPieces: 6,
    title: 'จิ๊กซอว์ 6 ชิ้น: สวนสนุกหรรษา ชิงช้าสวรรค์ 🎡🎈',
    themeTitle: 'สวนสนุกมหาสนุก',
    themeBanner: 'from-pink-400 via-purple-300 to-amber-300',
    previewEmoji: '🎡',
    instructionVoice: 'ลากชิ้นส่วนสวนสนุกทั้ง 6 ชิ้นมาต่อให้สมบูรณ์เลยนะจ๊ะ',
    pieces: [
      { id: 'k2-4-p0', targetIndex: 0, icon: '🎈', label: 'ลูกโป่งหลากสี', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'k2-4-p1', targetIndex: 1, icon: '🎡', label: 'ชิงช้าสวรรค์หมุน', color: 'bg-purple-100', borderAccent: 'border-purple-300' },
      { id: 'k2-4-p2', targetIndex: 2, icon: '☁️', label: 'ปุยเมฆลอยฟ้า', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'k2-4-p3', targetIndex: 3, icon: '🎠', label: 'ม้าหมุนดนตรี', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k2-4-p4', targetIndex: 4, icon: '🍿', label: 'ข้าวโพดคั่วหอม', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
      { id: 'k2-4-p5', targetIndex: 5, icon: '🎪', label: 'เต็นท์ละครสัตว์', color: 'bg-indigo-100', borderAccent: 'border-indigo-300' },
    ],
  },
  {
    id: 'jig-k2-5',
    grade: 'K2',
    rows: 2,
    cols: 3,
    totalPieces: 6,
    title: 'จิ๊กซอว์ 6 ชิ้น: ชุมชนน่าอยู่ ฮีโร่ช่วยเหลือ 🚑🚒',
    themeTitle: 'ฮีโร่ในชุมชน',
    themeBanner: 'from-blue-500 via-indigo-400 to-rose-400',
    previewEmoji: '🚒',
    instructionVoice: 'ต่อภาพผู้พิทักษ์และฮีโร่ชุมชน 6 ชิ้นให้สมบูรณ์นะจ๊ะ',
    pieces: [
      { id: 'k2-5-p0', targetIndex: 0, icon: '🚁', label: 'เฮลิคอปเตอร์กู้ภัย', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'k2-5-p1', targetIndex: 1, icon: '🚒', label: 'รถดับเพลิงสีแดง', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'k2-5-p2', targetIndex: 2, icon: '👨‍🚒', label: 'นักดับเพลิงผู้กล้า', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k2-5-p3', targetIndex: 3, icon: '🏥', label: 'โรงพยาบาลอบอุ่น', color: 'bg-emerald-100', borderAccent: 'border-emerald-300' },
      { id: 'k2-5-p4', targetIndex: 4, icon: '🚑', label: 'รถพยาบาลฉุกเฉิน', color: 'bg-teal-100', borderAccent: 'border-teal-300' },
      { id: 'k2-5-p5', targetIndex: 5, icon: '👩‍⚕️', label: 'คุณหมอใจดี', color: 'bg-pink-100', borderAccent: 'border-pink-300' },
    ],
  },
  {
    id: 'jig-k2-6',
    grade: 'K2',
    rows: 2,
    cols: 3,
    totalPieces: 6,
    title: 'จิ๊กซอว์ 6 ชิ้น: สวนผลไม้แสนอร่อยตามฤดูกาล 🍎🍌',
    themeTitle: 'ผลไม้แสนอร่อย',
    themeBanner: 'from-amber-400 via-rose-300 to-emerald-300',
    previewEmoji: '🍎',
    instructionVoice: 'ช่วยต่อภาพผลไม้ฉ่ำหวาน 6 ชิ้นให้ถูกต้องเลยนะ',
    pieces: [
      { id: 'k2-6-p0', targetIndex: 0, icon: '🌳', label: 'ต้นไม้ใหญ่แผ่กิ่ง', color: 'bg-emerald-100', borderAccent: 'border-emerald-300' },
      { id: 'k2-6-p1', targetIndex: 1, icon: '🍎', label: 'แอปเปิ้ลผลแดง', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'k2-6-p2', targetIndex: 2, icon: '🍊', label: 'ส้มสายน้ำผึ้ง', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k2-6-p3', targetIndex: 3, icon: '🍌', label: 'กล้วยหอมหวีทอง', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
      { id: 'k2-6-p4', targetIndex: 4, icon: '🍇', label: 'องุ่นม่วงพวงโต', color: 'bg-purple-100', borderAccent: 'border-purple-300' },
      { id: 'k2-6-p5', targetIndex: 5, icon: '🧺', label: 'ตะกร้าเก็บผลไม้', color: 'bg-orange-100', borderAccent: 'border-orange-300' },
    ],
  },

  // --- K3: จิ๊กซอว์ 9 ชิ้น (3 x 3) ---
  {
    id: 'jig-k3-1',
    grade: 'K3',
    rows: 3,
    cols: 3,
    totalPieces: 9,
    title: 'จิ๊กซอว์ 9 ชิ้น: การเดินทางสู่อวกาศและดวงดาว 🚀🪐',
    themeTitle: 'นักบินอวกาศจิ๋ว',
    themeBanner: 'from-indigo-600 via-purple-500 to-pink-500',
    previewEmoji: '🚀',
    instructionVoice: 'ต่อภาพยานอวกาศและดวงดาวให้ครบทั้ง 9 ชิ้น ท้าทายความสามารถคนเก่ง!',
    pieces: [
      { id: 'p0', targetIndex: 0, icon: '✨', label: 'ทางช้างเผือกส่องแสง', color: 'bg-indigo-100', borderAccent: 'border-indigo-300' },
      { id: 'p1', targetIndex: 1, icon: '🚀', label: 'ยอดจรวดยานอวกาศ', color: 'bg-purple-200', borderAccent: 'border-purple-400' },
      { id: 'p2', targetIndex: 2, icon: '🪐', label: 'ดาวเสาร์มีวงแหวน', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'p3', targetIndex: 3, icon: '🛸', label: 'จานบินเพื่อนต่างดาว', color: 'bg-teal-100', borderAccent: 'border-teal-300' },
      { id: 'p4', targetIndex: 4, icon: '🧑‍🚀', label: 'นักบินอวกาศลอยตัว', color: 'bg-sky-200', borderAccent: 'border-sky-400' },
      { id: 'p5', targetIndex: 5, icon: '🌕', label: 'ดวงจันทร์เต็มดวง', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
      { id: 'p6', targetIndex: 6, icon: '🌠', label: 'ดาวตกประกายไฟ', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'p7', targetIndex: 7, icon: '🔥', label: 'ไอพ่นจรวดทะยานฟ้า', color: 'bg-orange-200', borderAccent: 'border-orange-400' },
      { id: 'p8', targetIndex: 8, icon: '🌍', label: 'โลกสีฟ้าอันสวยงาม', color: 'bg-blue-200', borderAccent: 'border-blue-400' },
    ],
  },
  {
    id: 'jig-k3-2',
    grade: 'K3',
    rows: 3,
    cols: 3,
    totalPieces: 9,
    title: 'จิ๊กซอว์ 9 ชิ้น: ป่าดึกดำบรรพ์แดนไดโนเสาร์ 🦕🌋',
    themeTitle: 'ผจญภัยโลกล้านปี',
    themeBanner: 'from-amber-600 via-orange-500 to-emerald-600',
    previewEmoji: '🦕',
    instructionVoice: 'ท้าทายคนเก่ง! ต่อภาพโลกไดโนเสาร์ 9 ชิ้นให้สมบูรณ์แบบนะคะ',
    pieces: [
      { id: 'k3-2-p0', targetIndex: 0, icon: '🌋', label: 'ยอดภูเขาไฟพ่นควัน', color: 'bg-red-100', borderAccent: 'border-red-300' },
      { id: 'k3-2-p1', targetIndex: 1, icon: '🦅', label: 'เทอโรซอร์บินบนฟ้า', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'k3-2-p2', targetIndex: 2, icon: '☁️', label: 'เมฆหมอกดึกดำบรรพ์', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k3-2-p3', targetIndex: 3, icon: '🦕', label: 'คอยาวบรอนโตซอรัส', color: 'bg-emerald-100', borderAccent: 'border-emerald-300' },
      { id: 'k3-2-p4', targetIndex: 4, icon: '🌴', label: 'ป่าเฟิร์นใบยักษ์', color: 'bg-teal-100', borderAccent: 'border-teal-300' },
      { id: 'k3-2-p5', targetIndex: 5, icon: '🦖', label: 'ทีเร็กซ์เจ้าป่าตัวโต', color: 'bg-orange-100', borderAccent: 'border-orange-300' },
      { id: 'k3-2-p6', targetIndex: 6, icon: '🥚', label: 'รังไข่ไดโนเสาร์', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
      { id: 'k3-2-p7', targetIndex: 7, icon: '🐾', label: 'รอยเท้าไดโนเสาร์บนดิน', color: 'bg-slate-100', borderAccent: 'border-slate-300' },
      { id: 'k3-2-p8', targetIndex: 8, icon: '🪨', label: 'ก้อนหินฟอสซิลโบราณ', color: 'bg-stone-200', borderAccent: 'border-stone-400' },
    ],
  },
  {
    id: 'jig-k3-3',
    grade: 'K3',
    rows: 3,
    cols: 3,
    totalPieces: 9,
    title: 'จิ๊กซอว์ 9 ชิ้น: ปราสาทในเทพนิยายแสนสวย 🏰👑',
    themeTitle: 'เมืองเวทมนตร์ในฝัน',
    themeBanner: 'from-pink-500 via-purple-400 to-indigo-500',
    previewEmoji: '🏰',
    instructionVoice: 'ต่อภาพปราสาทเจ้าหญิงเจ้าชาย 9 ชิ้นให้งดงามตระการตานะจ๊ะ',
    pieces: [
      { id: 'k3-3-p0', targetIndex: 0, icon: '🚩', label: 'ธงโบกสะบัดบนหอคอย', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'k3-3-p1', targetIndex: 1, icon: '🏰', label: 'ยอดปราสาทสีชมพู', color: 'bg-purple-100', borderAccent: 'border-purple-300' },
      { id: 'k3-3-p2', targetIndex: 2, icon: '⭐', label: 'ดวงดาวส่องประกาย', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k3-3-p3', targetIndex: 3, icon: '🪟', label: 'หน้าต่างกระจกวิเศษ', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'k3-3-p4', targetIndex: 4, icon: '👑', label: 'มงกุฎทองคำเปล่งแสง', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
      { id: 'k3-3-p5', targetIndex: 5, icon: '🕊️', label: 'นกพิราบขาวบินร่อน', color: 'bg-slate-100', borderAccent: 'border-slate-300' },
      { id: 'k3-3-p6', targetIndex: 6, icon: '🌹', label: 'สวนกุหลาบรอบกำแพง', color: 'bg-pink-100', borderAccent: 'border-pink-300' },
      { id: 'k3-3-p7', targetIndex: 7, icon: '🚪', label: 'ประตูเมืองไม้โบราณ', color: 'bg-amber-200', borderAccent: 'border-amber-400' },
      { id: 'k3-3-p8', targetIndex: 8, icon: '🎠', label: 'สะพานข้ามคูน้ำใส', color: 'bg-teal-100', borderAccent: 'border-teal-300' },
    ],
  },
  {
    id: 'jig-k3-4',
    grade: 'K3',
    rows: 3,
    cols: 3,
    totalPieces: 9,
    title: 'จิ๊กซอว์ 9 ชิ้น: ระบบสุริยะและดาวเคราะห์มหัศจรรย์ ☀️🌍',
    themeTitle: 'ระบบสุริยะจักรวาล',
    themeBanner: 'from-blue-600 via-indigo-500 to-purple-600',
    previewEmoji: '🪐',
    instructionVoice: 'ท้าทายความรอบรู้! ต่อภาพระบบสุริยะ 9 ชิ้นให้สมบูรณ์แบบนะคะ',
    pieces: [
      { id: 'k3-4-p0', targetIndex: 0, icon: '☀️', label: 'พระอาทิตย์เปล่งแสง', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k3-4-p1', targetIndex: 1, icon: '🪐', label: 'ดาวพุธดวงจิ๋ว', color: 'bg-slate-100', borderAccent: 'border-slate-300' },
      { id: 'k3-4-p2', targetIndex: 2, icon: '✨', label: 'ดาวศุกร์ประกายพรึก', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
      { id: 'k3-4-p3', targetIndex: 3, icon: '🌍', label: 'ดาวโลกสีน้ำเงิน', color: 'bg-blue-100', borderAccent: 'border-blue-300' },
      { id: 'k3-4-p4', targetIndex: 4, icon: '🔴', label: 'ดาวอังคารสีแดง', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'k3-4-p5', targetIndex: 5, icon: '🟠', label: 'ดาวพฤหัสบดียักษ์', color: 'bg-orange-100', borderAccent: 'border-orange-300' },
      { id: 'k3-4-p6', targetIndex: 6, icon: '🪐', label: 'ดาวเสาร์วงแหวนงาม', color: 'bg-amber-200', borderAccent: 'border-amber-400' },
      { id: 'k3-4-p7', targetIndex: 7, icon: '🔵', label: 'ดาวยูเรนัสสีฟ้า', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'k3-4-p8', targetIndex: 8, icon: '🌌', label: 'ดาวเนปจูนไกลโพ้น', color: 'bg-indigo-100', borderAccent: 'border-indigo-300' },
    ],
  },
  {
    id: 'jig-k3-5',
    grade: 'K3',
    rows: 3,
    cols: 3,
    totalPieces: 9,
    title: 'จิ๊กซอว์ 9 ชิ้น: ระบบนิเวศป่าฝนเขตร้อน 🦜🌴',
    themeTitle: 'ป่าฝนเขตร้อน',
    themeBanner: 'from-emerald-600 via-teal-500 to-lime-500',
    previewEmoji: '🦜',
    instructionVoice: 'ช่วยต่อภาพความอุดมสมบูรณ์ของป่าเขตร้อน 9 ชิ้นให้ครบถ้วนนะจ๊ะ',
    pieces: [
      { id: 'k3-5-p0', targetIndex: 0, icon: '🦜', label: 'นกแก้วมาคอว์สีสด', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'k3-5-p1', targetIndex: 1, icon: '🌴', label: 'ยอดไม้ป่าดิบชื้น', color: 'bg-emerald-100', borderAccent: 'border-emerald-300' },
      { id: 'k3-5-p2', targetIndex: 2, icon: '🦋', label: 'ผีเสื้อปีกสวยงาม', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'k3-5-p3', targetIndex: 3, icon: '🐆', label: 'เสือดาวพรางตัว', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k3-5-p4', targetIndex: 4, icon: '🌺', label: 'กล้วยไม้ป่าบาน', color: 'bg-pink-100', borderAccent: 'border-pink-300' },
      { id: 'k3-5-p5', targetIndex: 5, icon: '🐒', label: 'ลิงจ๋อยิ้มแป้น', color: 'bg-orange-100', borderAccent: 'border-orange-300' },
      { id: 'k3-5-p6', targetIndex: 6, icon: '🐸', label: 'กบตาโตสีเขียว', color: 'bg-lime-100', borderAccent: 'border-lime-300' },
      { id: 'k3-5-p7', targetIndex: 7, icon: '🌊', label: 'น้ำตกใสเย็นฉ่ำ', color: 'bg-cyan-100', borderAccent: 'border-cyan-300' },
      { id: 'k3-5-p8', targetIndex: 8, icon: '🦎', label: 'กิ้งก่าเปลี่ยนสี', color: 'bg-teal-100', borderAccent: 'border-teal-300' },
    ],
  },
  {
    id: 'jig-k3-6',
    grade: 'K3',
    rows: 3,
    cols: 3,
    totalPieces: 9,
    title: 'จิ๊กซอว์ 9 ชิ้น: ห้องทดลองวิทยาศาสตร์รุ่นจิ๋ว 🔬⚗️',
    themeTitle: 'นักวิทย์รุ่นจิ๋ว',
    themeBanner: 'from-cyan-500 via-teal-400 to-indigo-500',
    previewEmoji: '🔬',
    instructionVoice: 'คนเก่งช่วยต่อภาพห้องทดลองวิทยาศาสตร์ 9 ชิ้นให้สมบูรณ์เลยนะ',
    pieces: [
      { id: 'k3-6-p0', targetIndex: 0, icon: '💡', label: 'โคมไฟส่องสว่าง', color: 'bg-yellow-100', borderAccent: 'border-yellow-300' },
      { id: 'k3-6-p1', targetIndex: 1, icon: '🧪', label: 'หลอดทดลองสารสี', color: 'bg-pink-100', borderAccent: 'border-pink-300' },
      { id: 'k3-6-p2', targetIndex: 2, icon: '⚗️', label: 'บีกเกอร์ทดลอง', color: 'bg-sky-100', borderAccent: 'border-sky-300' },
      { id: 'k3-6-p3', targetIndex: 3, icon: '🔬', label: 'กล้องจุลทรรศน์ขยาย', color: 'bg-teal-100', borderAccent: 'border-teal-300' },
      { id: 'k3-6-p4', targetIndex: 4, icon: '🥽', label: 'แว่นตานิรภัยทดลอง', color: 'bg-indigo-100', borderAccent: 'border-indigo-300' },
      { id: 'k3-6-p5', targetIndex: 5, icon: '⚛️', label: 'แบบจำลองอะตอม', color: 'bg-purple-100', borderAccent: 'border-purple-300' },
      { id: 'k3-6-p6', targetIndex: 6, icon: '📝', label: 'สมุดบันทึกผลการทดลอง', color: 'bg-amber-100', borderAccent: 'border-amber-300' },
      { id: 'k3-6-p7', targetIndex: 7, icon: '🧲', label: 'แม่เหล็กดูดพลังงาน', color: 'bg-rose-100', borderAccent: 'border-rose-300' },
      { id: 'k3-6-p8', targetIndex: 8, icon: '🏆', label: 'เหรียญรางวัลนักวิทย์', color: 'bg-amber-200', borderAccent: 'border-amber-400' },
    ],
  },
  ...EXPANDED_JIGSAW_LEVELS,
];

// =======================================================
// 4. เกมที่มีกฎกติกาง่าย ๆ (RULE-BASED & EF GAMES)
// =======================================================

// --- 4.1 เกมคุณครูหมีสั่งว่า... (Teacher Simon Says) ---
export interface SimonRuleItem {
  id: string;
  name: string;
  icon: string;
  colorName?: string;
  isAnimal?: boolean;
  isFood?: boolean;
  shape?: string;
  number?: number;
}

export interface SimonChallenge {
  id: string;
  grade: Grade;
  promptText: string;
  teacherSays: boolean; // if false => DO NOT TOUCH!
  targetCondition: (item: SimonRuleItem) => boolean;
  explanation: string;
  options: SimonRuleItem[];
}

export const SIMON_SAYS_CHALLENGES: SimonChallenge[] = [
  // --- K1 ---
  {
    id: 'simon-k1-1',
    grade: 'K1',
    promptText: 'คุณครูหมีสั่งว่า: "แตะผลไม้สีแดง 🍎"',
    teacherSays: true,
    targetCondition: (item) => item.colorName === 'red',
    explanation: 'เก่งมาก! คุณครูหมีสั่ง และแอปเปิ้ลมีสีแดงถูกต้องจ้า',
    options: [
      { id: 's-apple', name: 'แอปเปิ้ลแดง', icon: '🍎', colorName: 'red' },
      { id: 's-banana', name: 'กล้วยเหลือง', icon: '🍌', colorName: 'yellow' },
      { id: 's-grape', name: 'องุ่นม่วง', icon: '🍇', colorName: 'purple' },
    ],
  },
  {
    id: 'simon-k1-2',
    grade: 'K1',
    promptText: '"แตะน้องแมวเหมียว 🐱" (ระวังนะ! คุณครูหมีไม่ได้สั่ง!)',
    teacherSays: false,
    targetCondition: () => false,
    explanation: 'เยี่ยมยอด! คำสั่งนี้ไม่มีคำว่า "คุณครูหมีสั่งว่า" ดังนั้นจึงต้องอยู่นิ่งๆ ห้ามแตะนะจ๊ะ',
    options: [
      { id: 's-cat', name: 'แมวเหมียว', icon: '🐱', isAnimal: true },
      { id: 's-dog', name: 'สุนัข', icon: '🐶', isAnimal: true },
      { id: 's-bird', name: 'นกน้อย', icon: '🐦', isAnimal: true },
    ],
  },
  {
    id: 'simon-k1-3',
    grade: 'K1',
    promptText: 'คุณครูหมีสั่งว่า: "แตะสัตว์ที่มีปีกบินได้ 🐥"',
    teacherSays: true,
    targetCondition: (item) => item.id === 's-k1-bird',
    explanation: 'ถูกต้องจ้า! คุณครูหมีสั่ง และนกน้อยมีปีกบินบนท้องฟ้าได้',
    options: [
      { id: 's-k1-bird', name: 'นกน้อยมีปีก', icon: '🐦', isAnimal: true },
      { id: 's-k1-turtle', name: 'เต่าเดินต้วมเตี้ยม', icon: '🐢', isAnimal: true },
      { id: 's-k1-puppy', name: 'ลูกสุนัขวิ่งเล่น', icon: '🐶', isAnimal: true },
    ],
  },
  {
    id: 'simon-k1-4',
    grade: 'K1',
    promptText: '"แตะลูกโป่งสีแดง 🎈" (ระวังให้ดี! คุณครูหมีไม่ได้สั่ง!)',
    teacherSays: false,
    targetCondition: () => false,
    explanation: 'เก่งมากๆ! เพราะไม่มีคำว่า "คุณครูหมีสั่งว่า" จึงต้องอยู่นิ่งๆ ไม่กดตัวเลือกจ้า',
    options: [
      { id: 's-k1-balloon', name: 'ลูกโป่งสีแดง', icon: '🎈', colorName: 'red' },
      { id: 's-k1-orange', name: 'ผลส้มกลม', icon: '🍊', colorName: 'orange' },
      { id: 's-k1-star', name: 'ดาวสีเหลือง', icon: '⭐', colorName: 'yellow' },
    ],
  },

  // --- K2 ---
  {
    id: 'simon-k2-1',
    grade: 'K2',
    promptText: 'คุณครูหมีสั่งว่า: "แตะสัตว์ที่บินบนท้องฟ้าได้ 🕊️"',
    teacherSays: true,
    targetCondition: (item) => item.id === 's-bird' || item.id === 's-butterfly',
    explanation: 'ถูกต้องที่สุด! นกและผีเสื้อบินได้ตามที่คุณครูหมีสั่งเลย',
    options: [
      { id: 's-elephant', name: 'ช้างตัวโต', icon: '🐘', isAnimal: true },
      { id: 's-bird', name: 'นกพิราบ', icon: '🕊️', isAnimal: true },
      { id: 's-turtle', name: 'เต่าเดินช้า', icon: '🐢', isAnimal: true },
      { id: 's-butterfly', name: 'ผีเสื้อแสนสวย', icon: '🦋', isAnimal: true },
    ],
  },
  {
    id: 'simon-k2-2',
    grade: 'K2',
    promptText: '"แตะลูกฟุตบอลกลมๆ ⚽" (สังเกตดีๆ มีคำสั่งครูหมีไหม?)',
    teacherSays: false,
    targetCondition: () => false,
    explanation: 'ตาไวมาก! คุณครูหมีไม่ได้พูดว่าคุณครูสั่ง ดังนั้นอย่าแตะต้องอะไรทั้งนั้นจ้า',
    options: [
      { id: 's-ball', name: 'ฟุตบอล', icon: '⚽' },
      { id: 's-car', name: 'รถของเล่น', icon: '🚗' },
      { id: 's-teddy', name: 'ตุ๊กตาหมี', icon: '🧸' },
    ],
  },
  {
    id: 'simon-k2-3',
    grade: 'K2',
    promptText: 'คุณครูหมีสั่งว่า: "แตะอุปกรณ์ที่ใช้รับประทานอาหาร 🥄"',
    teacherSays: true,
    targetCondition: (item) => item.id === 's-k2-spoon',
    explanation: 'ยอดเยี่ยมมาก! ช้อนเป็นอุปกรณ์สำหรับตักอาหารตามที่คุณครูหมีสั่งเลย',
    options: [
      { id: 's-k2-spoon', name: 'ช้อนทานข้าว', icon: '🥄' },
      { id: 's-k2-pencil', name: 'ดินสอเขียนหนังสือ', icon: '✏️' },
      { id: 's-k2-cap', name: 'หมวกแก๊ป', icon: '🧢' },
      { id: 's-k2-car', name: 'รถยนต์ของเล่น', icon: '🚗' },
    ],
  },
  {
    id: 'simon-k2-4',
    grade: 'K2',
    promptText: '"แตะยานพาหนะที่วิ่งบนถนน 🚗" (อย่าหลงกลนะ! ไม่มีคำว่าคุณครูหมีสั่ง!)',
    teacherSays: false,
    targetCondition: () => false,
    explanation: 'มีสติสุดยอด! เพราะไม่มีคำสั่งครูหมี หนูจึงอยู่นิ่งๆ ถูกต้องแล้ว',
    options: [
      { id: 's-k2-bus', name: 'รถบัสประจำทาง', icon: '🚌' },
      { id: 's-k2-taxi', name: 'รถแท็กซี่', icon: '🚕' },
      { id: 's-k2-bike', name: 'รถจักรยานสองล้อ', icon: '🚲' },
    ],
  },
  {
    id: 'simon-k2-5',
    grade: 'K2',
    promptText: 'คุณครูหมีสั่งว่า: "แตะผลไม้รสเปรี้ยวอมหวานสีเหลือง 🍋"',
    teacherSays: true,
    targetCondition: (item) => item.id === 's-k2-lemon',
    explanation: 'เก่งจังเลย! เลมอนเป็นผลไม้รสเปรี้ยวสีเหลืองสดใสตรงตามคำสั่ง',
    options: [
      { id: 's-k2-lemon', name: 'เลมอนสีเหลือง', icon: '🍋', colorName: 'yellow' },
      { id: 's-k2-bread', name: 'ขนมปังแผ่น', icon: '🍞', colorName: 'brown' },
      { id: 's-k2-milk', name: 'นมสดกล่อง', icon: '🥛', colorName: 'white' },
      { id: 's-k2-cake', name: 'เค้กช็อกโกแลต', icon: '🍰', colorName: 'brown' },
    ],
  },

  // --- K3: กฎซับซ้อน (Double Condition & Specific Inhibit) ---
  {
    id: 'simon-k3-1',
    grade: 'K3',
    promptText: 'คุณครูหมีสั่งว่า: "แตะสิ่งที่เป็นอาหาร และมีสีเขียว 🥦"',
    teacherSays: true,
    targetCondition: (item) => item.id === 's-broccoli',
    explanation: 'ฉลาดมาก! บรอกโคลีเป็นอาหารที่มีประโยชน์และมีสีเขียวตรงตามกฎ 2 ข้อ',
    options: [
      { id: 's-frog', name: 'กบสีเขียว (สัตว์)', icon: '🐸', colorName: 'green' },
      { id: 's-broccoli', name: 'บรอกโคลีสด (อาหาร)', icon: '🥦', colorName: 'green' },
      { id: 's-cake', name: 'เค้กช็อกโกแลต (สีน้ำตาล)', icon: '🍰', colorName: 'brown' },
      { id: 's-leaf', name: 'ใบไม้ (ไม่ใช่ของกิน)', icon: '🍃', colorName: 'green' },
    ],
  },
  {
    id: 'simon-k3-2',
    grade: 'K3',
    promptText: 'คุณครูหมีสั่งว่า: "แตะยานพาหนะที่เดินทางในน้ำ ⛵"',
    teacherSays: true,
    targetCondition: (item) => item.id === 's-k3-ship' || item.id === 's-k3-boat',
    explanation: 'เก่งมากๆ! เรือสำราญและเรือใบเดินทางทางน้ำตามที่คุณครูสั่งจ้า',
    options: [
      { id: 's-k3-plane', name: 'เครื่องบินโดยสาร', icon: '✈️' },
      { id: 's-k3-train', name: 'รถไฟรางคู่', icon: '🚂' },
      { id: 's-k3-ship', name: 'เรือสำราญลอยน้ำ', icon: '🚢' },
      { id: 's-k3-truck', name: 'รถบรรทุกของ', icon: '🚚' },
    ],
  },
  {
    id: 'simon-k3-3',
    grade: 'K3',
    promptText: '"แตะเครื่องเขียนสำหรับวาดเขียน ✏️" (ไม่มีคำว่าคุณครูหมีสั่ง! ห้ามแตะ!)',
    teacherSays: false,
    targetCondition: () => false,
    explanation: 'สุดยอดการยับยั้งใจ (Inhibitory Control)! แม้ของจะน่าแตะ แต่ครูไม่ได้สั่งจึงไม่แตะ เก่งมาก!',
    options: [
      { id: 's-k3-pencil', name: 'ดินสอวาดเขียน', icon: '✏️' },
      { id: 's-k3-book', name: 'สมุดบันทึก', icon: '📚' },
      { id: 's-k3-eraser', name: 'ยางลบสะอาด', icon: '🧼' },
    ],
  },
  {
    id: 'simon-k3-4',
    grade: 'K3',
    promptText: 'คุณครูหมีสั่งว่า: "แตะสัตว์เลี้ยงลูกด้วยนมที่อาศัยในน้ำ 🐬"',
    teacherSays: true,
    targetCondition: (item) => item.id === 's-k3-dolphin',
    explanation: 'มีความรู้รอบตัวยอดเยี่ยม! โลมาเป็นสัตว์เลี้ยงลูกด้วยนมที่อาศัยในน้ำ',
    options: [
      { id: 's-k3-dolphin', name: 'ปลาโลมาแสนรู้', icon: '🐬' },
      { id: 's-k3-crab', name: 'ปูทะเลมีกระดอง', icon: '🦀' },
      { id: 's-k3-goldfish', name: 'ปลาทองว่ายน้ำ', icon: '🐠' },
      { id: 's-k3-squid', name: 'ปลาหมึกหนวดยาว', icon: '🦑' },
    ],
  },
  {
    id: 'simon-k3-5',
    grade: 'K3',
    promptText: 'คุณครูหมีสั่งว่า: "แตะเครื่องแต่งกายที่สวมใส่บริเวณเท้า 👟"',
    teacherSays: true,
    targetCondition: (item) => item.id === 's-k3-shoes' || item.id === 's-k3-socks',
    explanation: 'ถูกต้องตามคำสั่งครูหมีเลย! รองเท้าผ้าใบและถุงเท้าใช้สวมใส่ที่เท้าจ้า',
    options: [
      { id: 's-k3-shoes', name: 'รองเท้าผ้าใบ', icon: '👟' },
      { id: 's-k3-hat', name: 'หมวกกันแดด', icon: '🧢' },
      { id: 's-k3-tshirt', name: 'เสื้อยืดแขนสั้น', icon: '👕' },
      { id: 's-k3-watch', name: 'นาฬิกาข้อมือ', icon: '⌚' },
    ],
  },
  ...EXPANDED_SIMON_SAYS_CHALLENGES,
  ...EXTRA_SIMON_CHALLENGES,
];

// --- 4.2 เกมสัญญาณไฟจราจร เขียว-เหลือง-แดง (Traffic Light Reflex) ---
export interface TrafficLightRound {
  light: 'green' | 'yellow' | 'red';
  instruction: string;
  rule: 'tap_to_score' | 'slow_down' | 'freeze_do_not_tap';
  durationSeconds: number;
}
