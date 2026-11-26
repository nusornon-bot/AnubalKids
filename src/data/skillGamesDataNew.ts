import { Grade } from '../types';
import {
  EXTRA_MAZE_LEVELS,
  EXTRA_SILHOUETTE_QUESTIONS,
  EXTRA_TANGRAM_LEVELS,
} from './extraSkillGames_2';
import {
  EXTRA_SPOT_LEVELS,
  EXTRA_AUDITORY_QUESTIONS,
  EXTRA_WHATS_MISSING_ROUNDS,
  EXTRA_EMOTIONS,
  EXTRA_SOCIAL_SCENARIOS,
  EXTRA_BALANCE_QUESTIONS,
} from './extraSkillGames_3';

// ==========================================
// 1. MAZE & PATH TRACING (เขาวงกต & ลากเส้นตามรอย - 10 ข้อ)
// ==========================================
export interface MazeCell {
  x: number;
  y: number;
  type: 'path' | 'wall' | 'start' | 'goal' | 'item';
  itemIcon?: string;
  itemName?: string;
}

export interface MazeLevel {
  id: string;
  grade: Grade;
  title: string;
  subtitle: string;
  startIcon: string;
  goalIcon: string;
  startLabel: string;
  goalLabel: string;
  storyPrompt: string;
  gridSize: { cols: number; rows: number };
  cells: MazeCell[];
  optimalSteps: number;
  requiredItemsCount?: number;
}

export const MAZE_LEVELS: MazeLevel[] = [
  // ข้อ 1: ลูกเจี๊ยบหาแม่ไก่ (4x4)
  {
    id: 'maze-k1-chick',
    grade: 'K1',
    title: 'พาลูกเจี๊ยบไปหาแม่ไก่',
    subtitle: 'เดินตามรอยทางสีเขียว',
    startIcon: '🐥',
    goalIcon: '🐔',
    startLabel: 'ลูกเจี๊ยบ',
    goalLabel: 'แม่ไก่',
    storyPrompt: 'ช่วยลูกเจี๊ยบเดินตามรอยหญ้ากลับไปหาคุณแม่ไก่อย่างปลอดภัยนะจ๊ะ!',
    gridSize: { cols: 4, rows: 4 },
    optimalSteps: 5,
    cells: [
      { x: 0, y: 0, type: 'start' },
      { x: 1, y: 0, type: 'path' },
      { x: 2, y: 0, type: 'path' },
      { x: 3, y: 0, type: 'wall' },
      { x: 0, y: 1, type: 'wall' },
      { x: 1, y: 1, type: 'wall' },
      { x: 2, y: 1, type: 'path' },
      { x: 3, y: 1, type: 'wall' },
      { x: 0, y: 2, type: 'wall' },
      { x: 1, y: 2, type: 'wall' },
      { x: 2, y: 2, type: 'path' },
      { x: 3, y: 2, type: 'path' },
      { x: 0, y: 3, type: 'wall' },
      { x: 1, y: 3, type: 'wall' },
      { x: 2, y: 3, type: 'wall' },
      { x: 3, y: 3, type: 'goal' },
    ],
  },
  // ข้อ 2: กระต่ายหาแครอท (4x4)
  {
    id: 'maze-k1-bunny',
    grade: 'K1',
    title: 'เจ้ากระต่ายน้อยหาแครอท',
    subtitle: 'กระโดดไปตามทุ่งหญ้า',
    startIcon: '🐰',
    goalIcon: '🥕',
    startLabel: 'กระต่าย',
    goalLabel: 'แครอทหวาน',
    storyPrompt: 'พากระต่ายหิวโซกระโดดไปกินแครอทแสนอร่อย!',
    gridSize: { cols: 4, rows: 4 },
    optimalSteps: 6,
    cells: [
      { x: 0, y: 0, type: 'start' },
      { x: 0, y: 1, type: 'path' },
      { x: 0, y: 2, type: 'path' },
      { x: 0, y: 3, type: 'wall' },
      { x: 1, y: 0, type: 'wall' },
      { x: 1, y: 1, type: 'wall' },
      { x: 1, y: 2, type: 'path' },
      { x: 1, y: 3, type: 'wall' },
      { x: 2, y: 0, type: 'wall' },
      { x: 2, y: 1, type: 'wall' },
      { x: 2, y: 2, type: 'path' },
      { x: 2, y: 3, type: 'path' },
      { x: 3, y: 0, type: 'wall' },
      { x: 3, y: 1, type: 'wall' },
      { x: 3, y: 2, type: 'wall' },
      { x: 3, y: 3, type: 'goal' },
    ],
  },
  // ข้อ 3: ผึ้งน้อยเก็บน้ำหวาน (5x5)
  {
    id: 'maze-k2-bee',
    grade: 'K2',
    title: 'ผึ้งน้อยเก็บน้ำหวานเข้าโพรง',
    subtitle: 'เก็บดอกไม้ 🌸 แล้วบินกลับรัง',
    startIcon: '🐝',
    goalIcon: '🍯',
    startLabel: 'ผึ้งน้อย',
    goalLabel: 'รังผึ้ง',
    storyPrompt: 'บินเก็บน้ำหวานจากดอกไม้ 2 ดอก แล้วพากลับเข้ารังผึ้งนะ!',
    gridSize: { cols: 5, rows: 5 },
    optimalSteps: 8,
    requiredItemsCount: 2,
    cells: [
      { x: 0, y: 0, type: 'start' },
      { x: 1, y: 0, type: 'path' },
      { x: 2, y: 0, type: 'item', itemIcon: '🌸', itemName: 'เกสรดอกไม้' },
      { x: 3, y: 0, type: 'wall' },
      { x: 4, y: 0, type: 'wall' },
      { x: 0, y: 1, type: 'wall' },
      { x: 1, y: 1, type: 'wall' },
      { x: 2, y: 1, type: 'path' },
      { x: 3, y: 1, type: 'path' },
      { x: 4, y: 1, type: 'wall' },
      { x: 0, y: 2, type: 'wall' },
      { x: 1, y: 2, type: 'wall' },
      { x: 2, y: 2, type: 'wall' },
      { x: 3, y: 2, type: 'item', itemIcon: '🌸', itemName: 'เกสรดอกไม้' },
      { x: 4, y: 2, type: 'path' },
      { x: 0, y: 3, type: 'wall' },
      { x: 1, y: 3, type: 'path' },
      { x: 2, y: 3, type: 'path' },
      { x: 3, y: 3, type: 'path' },
      { x: 4, y: 3, type: 'path' },
      { x: 0, y: 4, type: 'wall' },
      { x: 1, y: 4, type: 'wall' },
      { x: 2, y: 4, type: 'wall' },
      { x: 3, y: 4, type: 'wall' },
      { x: 4, y: 4, type: 'goal' },
    ],
  },
  // ข้อ 4: รถดับเพลิงไปดับไฟ (5x5)
  {
    id: 'maze-k2-car',
    grade: 'K2',
    title: 'รถดับเพลิงไปช่วยตึกสูง',
    subtitle: 'เก็บถังน้ำ 💦 ระหว่างทาง',
    startIcon: '🚒',
    goalIcon: '🏢',
    startLabel: 'รถดับเพลิง',
    goalLabel: 'ตึกสูง',
    storyPrompt: 'ขับรถดับเพลิงเก็บถังน้ำ 2 ถังเพื่อไปช่วยดับไฟที่ตึกสูง!',
    gridSize: { cols: 5, rows: 5 },
    optimalSteps: 8,
    requiredItemsCount: 2,
    cells: [
      { x: 0, y: 0, type: 'start' },
      { x: 0, y: 1, type: 'path' },
      { x: 0, y: 2, type: 'wall' },
      { x: 0, y: 3, type: 'wall' },
      { x: 0, y: 4, type: 'wall' },
      { x: 1, y: 0, type: 'wall' },
      { x: 1, y: 1, type: 'item', itemIcon: '💦', itemName: 'ถังน้ำ' },
      { x: 1, y: 2, type: 'path' },
      { x: 1, y: 3, type: 'wall' },
      { x: 1, y: 4, type: 'wall' },
      { x: 2, y: 0, type: 'wall' },
      { x: 2, y: 1, type: 'wall' },
      { x: 2, y: 2, type: 'path' },
      { x: 2, y: 3, type: 'path' },
      { x: 2, y: 4, type: 'wall' },
      { x: 3, y: 0, type: 'wall' },
      { x: 3, y: 1, type: 'wall' },
      { x: 3, y: 2, type: 'wall' },
      { x: 3, y: 3, type: 'item', itemIcon: '💦', itemName: 'ถังน้ำ' },
      { x: 3, y: 4, type: 'path' },
      { x: 4, y: 0, type: 'wall' },
      { x: 4, y: 1, type: 'wall' },
      { x: 4, y: 2, type: 'wall' },
      { x: 4, y: 3, type: 'wall' },
      { x: 4, y: 4, type: 'goal' },
    ],
  },
  // ข้อ 5: นักบินอวกาศกลับยาน (6x5)
  {
    id: 'maze-k3-astronaut',
    grade: 'K3',
    title: 'นักบินอวกาศกลับสถานี',
    subtitle: 'เก็บแร่คริสตัล 💎 3 ชิ้น',
    startIcon: '👨‍🚀',
    goalIcon: '🛸',
    startLabel: 'นักบินอวกาศ',
    goalLabel: 'ยานอวกาศ',
    storyPrompt: 'เดินทางข้ามกาแล็กซี เก็บสะสมคริสตัลพลังงาน 3 ชิ้น แล้วกลับขึ้นยาน!',
    gridSize: { cols: 6, rows: 5 },
    optimalSteps: 11,
    requiredItemsCount: 3,
    cells: [
      { x: 0, y: 0, type: 'start' },
      { x: 1, y: 0, type: 'path' },
      { x: 2, y: 0, type: 'item', itemIcon: '💎', itemName: 'คริสตัล 1' },
      { x: 3, y: 0, type: 'path' },
      { x: 4, y: 0, type: 'wall' },
      { x: 5, y: 0, type: 'wall' },
      { x: 0, y: 1, type: 'wall' },
      { x: 1, y: 1, type: 'wall' },
      { x: 2, y: 1, type: 'wall' },
      { x: 3, y: 1, type: 'path' },
      { x: 4, y: 1, type: 'item', itemIcon: '💎', itemName: 'คริสตัล 2' },
      { x: 5, y: 1, type: 'wall' },
      { x: 0, y: 2, type: 'wall' },
      { x: 1, y: 2, type: 'path' },
      { x: 2, y: 2, type: 'path' },
      { x: 3, y: 2, type: 'path' },
      { x: 4, y: 2, type: 'wall' },
      { x: 5, y: 2, type: 'wall' },
      { x: 0, y: 3, type: 'wall' },
      { x: 1, y: 3, type: 'item', itemIcon: '💎', itemName: 'คริสตัล 3' },
      { x: 2, y: 3, type: 'wall' },
      { x: 3, y: 3, type: 'path' },
      { x: 4, y: 3, type: 'path' },
      { x: 5, y: 3, type: 'path' },
      { x: 0, y: 4, type: 'wall' },
      { x: 1, y: 4, type: 'wall' },
      { x: 2, y: 4, type: 'wall' },
      { x: 3, y: 4, type: 'wall' },
      { x: 4, y: 4, type: 'wall' },
      { x: 5, y: 4, type: 'goal' },
    ],
  },
  // ข้อ 6: เจ้าตูบตามหากระดูก (4x4)
  {
    id: 'maze-k1-puppy',
    grade: 'K1',
    title: 'เจ้าตูบตามหากระดูกแสนอร่อย',
    subtitle: 'วิ่งลัดเลาะในสวน',
    startIcon: '🐶',
    goalIcon: '🦴',
    startLabel: 'เจ้าตูบ',
    goalLabel: 'กระดูกแสนอร่อย',
    storyPrompt: 'ช่วยเจ้าตูบดมกลิ่นเดินหาท่อนกระดูกแสนอร่อยในสวนหลังบ้านนะ!',
    gridSize: { cols: 4, rows: 4 },
    optimalSteps: 6,
    cells: [
      { x: 0, y: 0, type: 'start' },
      { x: 1, y: 0, type: 'path' },
      { x: 2, y: 0, type: 'wall' },
      { x: 3, y: 0, type: 'wall' },
      { x: 0, y: 1, type: 'wall' },
      { x: 1, y: 1, type: 'path' },
      { x: 2, y: 1, type: 'path' },
      { x: 3, y: 1, type: 'wall' },
      { x: 0, y: 2, type: 'wall' },
      { x: 1, y: 2, type: 'wall' },
      { x: 2, y: 2, type: 'path' },
      { x: 3, y: 2, type: 'path' },
      { x: 0, y: 3, type: 'wall' },
      { x: 1, y: 3, type: 'wall' },
      { x: 2, y: 3, type: 'wall' },
      { x: 3, y: 3, type: 'goal' },
    ],
  },
  // ข้อ 7: เต่าทองกลับบ้านใบไม้ (5x5)
  {
    id: 'maze-k2-turtle',
    grade: 'K2',
    title: 'เต่าทองน้อยกลับบ้านใบไม้',
    subtitle: 'เก็บหยดน้ำค้าง 💧 2 หยด',
    startIcon: '🐞',
    goalIcon: '🍀',
    startLabel: 'เต่าทอง',
    goalLabel: 'ใบไม้เขียว',
    storyPrompt: 'พาเต่าทองเดินเก็บหยดน้ำค้างชื่นใจ 2 หยดกลับสู่บ้านใบไม้นะจ๊ะ!',
    gridSize: { cols: 5, rows: 5 },
    optimalSteps: 8,
    requiredItemsCount: 2,
    cells: [
      { x: 0, y: 0, type: 'start' },
      { x: 1, y: 0, type: 'path' },
      { x: 2, y: 0, type: 'item', itemIcon: '💧', itemName: 'หยดน้ำค้าง' },
      { x: 3, y: 0, type: 'path' },
      { x: 4, y: 0, type: 'wall' },
      { x: 0, y: 1, type: 'wall' },
      { x: 1, y: 1, type: 'wall' },
      { x: 2, y: 1, type: 'wall' },
      { x: 3, y: 1, type: 'path' },
      { x: 4, y: 1, type: 'wall' },
      { x: 0, y: 2, type: 'wall' },
      { x: 1, y: 2, type: 'path' },
      { x: 2, y: 2, type: 'path' },
      { x: 3, y: 2, type: 'path' },
      { x: 4, y: 2, type: 'wall' },
      { x: 0, y: 3, type: 'wall' },
      { x: 1, y: 3, type: 'item', itemIcon: '💧', itemName: 'หยดน้ำค้าง' },
      { x: 2, y: 3, type: 'wall' },
      { x: 3, y: 3, type: 'path' },
      { x: 4, y: 3, type: 'path' },
      { x: 0, y: 4, type: 'wall' },
      { x: 1, y: 4, type: 'wall' },
      { x: 2, y: 4, type: 'wall' },
      { x: 3, y: 4, type: 'wall' },
      { x: 4, y: 4, type: 'goal' },
    ],
  },
  // ข้อ 8: ลิงจ๋อตามหากล้วย (5x5)
  {
    id: 'maze-k2-monkey',
    grade: 'K2',
    title: 'ลิงจ๋อปีนป่าตามหากล้วย',
    subtitle: 'เก็บผลไม้ 🍌 2 ผล',
    startIcon: '🐒',
    goalIcon: '🌴',
    startLabel: 'ลิงจ๋อ',
    goalLabel: 'ต้นกล้วยใหญ่',
    storyPrompt: 'เจ้าลิงจ๋อหิวแล้ว ช่วยเก็บกล้วยสุก 2 หวีกลับไปกินบนต้นไม้กัน!',
    gridSize: { cols: 5, rows: 5 },
    optimalSteps: 8,
    requiredItemsCount: 2,
    cells: [
      { x: 0, y: 0, type: 'start' },
      { x: 0, y: 1, type: 'path' },
      { x: 0, y: 2, type: 'item', itemIcon: '🍌', itemName: 'กล้วยสุก' },
      { x: 0, y: 3, type: 'path' },
      { x: 0, y: 4, type: 'wall' },
      { x: 1, y: 0, type: 'wall' },
      { x: 1, y: 1, type: 'wall' },
      { x: 1, y: 2, type: 'wall' },
      { x: 1, y: 3, type: 'path' },
      { x: 1, y: 4, type: 'wall' },
      { x: 2, y: 0, type: 'wall' },
      { x: 2, y: 1, type: 'path' },
      { x: 2, y: 2, type: 'path' },
      { x: 2, y: 3, type: 'path' },
      { x: 2, y: 4, type: 'wall' },
      { x: 3, y: 0, type: 'wall' },
      { x: 3, y: 1, type: 'item', itemIcon: '🍌', itemName: 'กล้วยสุก' },
      { x: 3, y: 2, type: 'wall' },
      { x: 3, y: 3, type: 'wall' },
      { x: 3, y: 4, type: 'wall' },
      { x: 4, y: 0, type: 'wall' },
      { x: 4, y: 1, type: 'path' },
      { x: 4, y: 2, type: 'path' },
      { x: 4, y: 3, type: 'path' },
      { x: 4, y: 4, type: 'goal' },
    ],
  },
  // ข้อ 9: เรือดำน้ำสำรวจขุมทรัพย์ (6x5)
  {
    id: 'maze-k3-submarine',
    grade: 'K3',
    title: 'เรือดำน้ำสำรวจขุมทรัพย์ใต้ทะเล',
    subtitle: 'เก็บหีบสมบัติ 💰 3 หีบ',
    startIcon: '🚢',
    goalIcon: '⚓',
    startLabel: 'เรือดำน้ำ',
    goalLabel: 'สมอเรือยักษ์',
    storyPrompt: 'ดำดิ่งสู่ใต้สมุทร หลบปะการังและเก็บหีบสมบัติ 3 ชิ้นให้ครบ!',
    gridSize: { cols: 6, rows: 5 },
    optimalSteps: 11,
    requiredItemsCount: 3,
    cells: [
      { x: 0, y: 0, type: 'start' },
      { x: 1, y: 0, type: 'path' },
      { x: 2, y: 0, type: 'wall' },
      { x: 3, y: 0, type: 'item', itemIcon: '💰', itemName: 'สมบัติ 1' },
      { x: 4, y: 0, type: 'path' },
      { x: 5, y: 0, type: 'wall' },
      { x: 0, y: 1, type: 'wall' },
      { x: 1, y: 1, type: 'item', itemIcon: '💰', itemName: 'สมบัติ 2' },
      { x: 2, y: 1, type: 'path' },
      { x: 3, y: 1, type: 'path' },
      { x: 4, y: 1, type: 'wall' },
      { x: 5, y: 1, type: 'wall' },
      { x: 0, y: 2, type: 'wall' },
      { x: 1, y: 2, type: 'wall' },
      { x: 2, y: 2, type: 'wall' },
      { x: 3, y: 2, type: 'path' },
      { x: 4, y: 2, type: 'item', itemIcon: '💰', itemName: 'สมบัติ 3' },
      { x: 5, y: 2, type: 'path' },
      { x: 0, y: 3, type: 'wall' },
      { x: 1, y: 3, type: 'path' },
      { x: 2, y: 3, type: 'path' },
      { x: 3, y: 3, type: 'path' },
      { x: 4, y: 3, type: 'wall' },
      { x: 5, y: 3, type: 'path' },
      { x: 0, y: 4, type: 'wall' },
      { x: 1, y: 4, type: 'wall' },
      { x: 2, y: 4, type: 'wall' },
      { x: 3, y: 4, type: 'wall' },
      { x: 4, y: 4, type: 'wall' },
      { x: 5, y: 4, type: 'goal' },
    ],
  },
  // ข้อ 10: รถไฟด่วนเข้าชานชาลา (6x5)
  {
    id: 'maze-k3-train',
    grade: 'K3',
    title: 'รถไฟขบวนหรรษาเข้าชานชาลา',
    subtitle: 'รับตั๋วโดยสาร 🎫 3 ใบ',
    startIcon: '🚂',
    goalIcon: '🚉',
    startLabel: 'รถไฟ',
    goalLabel: 'สถานีปลายทาง',
    storyPrompt: 'ขับรถไฟบนรางเก็บตั๋วโดยสาร 3 ใบให้ครบก่อนถึงสถานีปลายทาง!',
    gridSize: { cols: 6, rows: 5 },
    optimalSteps: 11,
    requiredItemsCount: 3,
    cells: [
      { x: 0, y: 0, type: 'start' },
      { x: 1, y: 0, type: 'item', itemIcon: '🎫', itemName: 'ตั๋ว 1' },
      { x: 2, y: 0, type: 'path' },
      { x: 3, y: 0, type: 'path' },
      { x: 4, y: 0, type: 'wall' },
      { x: 5, y: 0, type: 'wall' },
      { x: 0, y: 1, type: 'wall' },
      { x: 1, y: 1, type: 'wall' },
      { x: 2, y: 1, type: 'wall' },
      { x: 3, y: 1, type: 'item', itemIcon: '🎫', itemName: 'ตั๋ว 2' },
      { x: 4, y: 1, type: 'path' },
      { x: 5, y: 1, type: 'wall' },
      { x: 0, y: 2, type: 'wall' },
      { x: 1, y: 2, type: 'path' },
      { x: 2, y: 2, type: 'path' },
      { x: 3, y: 2, type: 'path' },
      { x: 4, y: 2, type: 'wall' },
      { x: 5, y: 2, type: 'wall' },
      { x: 0, y: 3, type: 'wall' },
      { x: 1, y: 3, type: 'item', itemIcon: '🎫', itemName: 'ตั๋ว 3' },
      { x: 2, y: 3, type: 'wall' },
      { x: 3, y: 3, type: 'path' },
      { x: 4, y: 3, type: 'path' },
      { x: 5, y: 3, type: 'path' },
      { x: 0, y: 4, type: 'wall' },
      { x: 1, y: 4, type: 'wall' },
      { x: 2, y: 4, type: 'wall' },
      { x: 3, y: 4, type: 'wall' },
      { x: 4, y: 4, type: 'wall' },
      { x: 5, y: 4, type: 'goal' },
    ],
  },
  ...EXTRA_MAZE_LEVELS,
];

// ==========================================
// 2. SHADOW & TANGRAM (ทายเงา & มิติสัมพันธ์ - 10 ข้อ)
// ==========================================
export interface SilhouetteQuestion {
  id: string;
  grade: Grade;
  silhouetteSvgUrl?: string;
  silhouetteIcon: string;
  correctId: string;
  options: {
    id: string;
    icon: string;
    label: string;
    color: string;
  }[];
  explanation: string;
}

export const SILHOUETTE_QUESTIONS: SilhouetteQuestion[] = [
  // ข้อ 1: ช้าง
  {
    id: 'sil-k1-elephant',
    grade: 'K1',
    silhouetteIcon: '🐘',
    correctId: 'elephant',
    options: [
      { id: 'cat', icon: '🐱', label: 'แมวเหมียว', color: 'bg-amber-100' },
      { id: 'elephant', icon: '🐘', label: 'ช้างตัวโตมีงวง', color: 'bg-blue-100' },
      { id: 'rabbit', icon: '🐰', label: 'กระต่ายหูยาว', color: 'bg-pink-100' },
    ],
    explanation: 'เงาตัวโตและมีงวงยาวด้านหน้า คือคุณช้างนั่นเอง!',
  },
  // ข้อ 2: เครื่องบิน
  {
    id: 'sil-k1-airplane',
    grade: 'K1',
    silhouetteIcon: '✈️',
    correctId: 'airplane',
    options: [
      { id: 'car', icon: '🚗', label: 'รถเก๋ง', color: 'bg-red-100' },
      { id: 'boat', icon: '⛵', label: 'เรือใบ', color: 'bg-cyan-100' },
      { id: 'airplane', icon: '✈️', label: 'เครื่องบินปีกกว้าง', color: 'bg-sky-100' },
    ],
    explanation: 'มีปีกสองข้างบินอยู่บนท้องฟ้า คือเครื่องบิน!',
  },
  // ข้อ 3: ผีเสื้อ
  {
    id: 'sil-k2-butterfly',
    grade: 'K2',
    silhouetteIcon: '🦋',
    correctId: 'butterfly',
    options: [
      { id: 'beetle', icon: '🪲', label: 'ด้วงกว่าง', color: 'bg-emerald-100' },
      { id: 'butterfly', icon: '🦋', label: 'ผีเสื้อปีกแสนสวย', color: 'bg-purple-100' },
      { id: 'spider', icon: '🕷️', label: 'แมงมุม', color: 'bg-slate-100' },
      { id: 'fish', icon: '🐠', label: 'ปลาทอง', color: 'bg-yellow-100' },
    ],
    explanation: 'ปีกกว้างลวดลายสวยงามบินตอมดอกไม้ คือผีเสื้อ!',
  },
  // ข้อ 4: กีตาร์
  {
    id: 'sil-k2-guitar',
    grade: 'K2',
    silhouetteIcon: '🎸',
    correctId: 'guitar',
    options: [
      { id: 'drum', icon: '🥁', label: 'กลองชุด', color: 'bg-rose-100' },
      { id: 'guitar', icon: '🎸', label: 'กีตาร์มีสาย', color: 'bg-amber-100' },
      { id: 'trumpet', icon: '🎺', label: 'แตรทรัมเป็ต', color: 'bg-orange-100' },
      { id: 'bell', icon: '🔔', label: 'กระดิ่งทอง', color: 'bg-yellow-100' },
    ],
    explanation: 'ตัวเครื่องดนตรีคอยาวมีสายสำหรับดีด คือกีตาร์!',
  },
  // ข้อ 5: ไดโนเสาร์
  {
    id: 'sil-k3-dinosaur',
    grade: 'K3',
    silhouetteIcon: '🦖',
    correctId: 'trex',
    options: [
      { id: 'crocodile', icon: '🐊', label: 'จระเข้', color: 'bg-teal-100' },
      { id: 'trex', icon: '🦖', label: 'ไดโนเสาร์ทีเร็กซ์', color: 'bg-lime-100' },
      { id: 'kangaroo', icon: '🦘', label: 'จิงโจ้', color: 'bg-orange-100' },
      { id: 'dragon', icon: '🐉', label: 'มังกรจีน', color: 'bg-red-100' },
    ],
    explanation: 'เดินสองขา หางยาว ฟันคมแหลมคือไดโนเสาร์ยักษ์ใหญ่!',
  },
  // ข้อ 6: กล้องจุลทรรศน์
  {
    id: 'sil-k3-microscope',
    grade: 'K3',
    silhouetteIcon: '🔬',
    correctId: 'microscope',
    options: [
      { id: 'telescope', icon: '🔭', label: 'กล้องดูดาว', color: 'bg-indigo-100' },
      { id: 'microscope', icon: '🔬', label: 'กล้องจุลทรรศน์นักวิทย์', color: 'bg-emerald-100' },
      { id: 'lamp', icon: '💡', label: 'หลอดไฟ', color: 'bg-yellow-100' },
      { id: 'camera', icon: '📷', label: 'กล้องถ่ายรูป', color: 'bg-slate-100' },
    ],
    explanation: 'อุปกรณ์ส่องดูเชื้อโรคและสิ่งมีชีวิตเล็ก ๆ คือกล้องจุลทรรศน์!',
  },
  // ข้อ 7: สิงโตเจ้าป่า
  {
    id: 'sil-k1-lion',
    grade: 'K1',
    silhouetteIcon: '🦁',
    correctId: 'lion',
    options: [
      { id: 'dog', icon: '🐶', label: 'น้องหมา', color: 'bg-amber-100' },
      { id: 'lion', icon: '🦁', label: 'สิงโตแผงคอใหญ่', color: 'bg-orange-100' },
      { id: 'bear', icon: '🐻', label: 'หมีตัวโต', color: 'bg-stone-100' },
    ],
    explanation: 'เงาหัวกลมมีแผงขนรอบคอสง่างาม คือคุณสิงโตเจ้าป่า!',
  },
  // ข้อ 8: จรวดอวกาศ
  {
    id: 'sil-k2-rocket',
    grade: 'K2',
    silhouetteIcon: '🚀',
    correctId: 'rocket',
    options: [
      { id: 'rocket', icon: '🚀', label: 'จรวดพุ่งทะยาน', color: 'bg-rose-100' },
      { id: 'airplane', icon: '✈️', label: 'เครื่องบิน', color: 'bg-sky-100' },
      { id: 'pencil', icon: '✏️', label: 'ดินสอไม้', color: 'bg-yellow-100' },
      { id: 'tree', icon: '🌲', label: 'ต้นสน', color: 'bg-emerald-100' },
    ],
    explanation: 'หัวทรงกรวยแหลม มีปีกท้ายและพ่นไฟ คือจรวดอวกาศ!',
  },
  // ข้อ 9: โลมาแสนรู้
  {
    id: 'sil-k2-dolphin',
    grade: 'K2',
    silhouetteIcon: '🐬',
    correctId: 'dolphin',
    options: [
      { id: 'shark', icon: '🦈', label: 'ฉลามดุ', color: 'bg-slate-100' },
      { id: 'dolphin', icon: '🐬', label: 'โลมาแสนรู้', color: 'bg-cyan-100' },
      { id: 'whale', icon: '🐳', label: 'วาฬพ่นน้ำ', color: 'bg-blue-100' },
      { id: 'duck', icon: '🦆', label: 'เป็ดน้ำ', color: 'bg-teal-100' },
    ],
    explanation: 'ลำตัวโค้งมน ปากยื่น มีครีบหลังน่ารัก คือโลมาแสนรู้!',
  },
  // ข้อ 10: รถจักรยาน
  {
    id: 'sil-k3-bicycle',
    grade: 'K3',
    silhouetteIcon: '🚲',
    correctId: 'bicycle',
    options: [
      { id: 'motorcycle', icon: '🏍️', label: 'มอเตอร์ไซค์', color: 'bg-red-100' },
      { id: 'bicycle', icon: '🚲', label: 'จักรยานสองล้อ', color: 'bg-lime-100' },
      { id: 'scooter', icon: '🛴', label: 'สกู๊ตเตอร์', color: 'bg-amber-100' },
      { id: 'wheelchair', icon: '🦽', label: 'รถเข็น', color: 'bg-purple-100' },
    ],
    explanation: 'มีสองล้อ มีแฮนด์จับและที่ปั่น คือรถจักรยานสองล้อ!',
  },
  ...EXTRA_SILHOUETTE_QUESTIONS,
];

// Tangram Puzzle for preschool (10 ข้อ)
export interface TangramShape {
  id: string;
  name: string;
  shapeType: 'triangle' | 'square' | 'circle' | 'rectangle';
  color: string;
  icon: string;
}

export interface TangramTargetSlot {
  id: string;
  requiredShapeType: 'triangle' | 'square' | 'circle' | 'rectangle';
  label: string;
  xPercent: number;
  yPercent: number;
}

export interface TangramLevel {
  id: string;
  grade: Grade;
  title: string;
  description: string;
  resultIcon: string;
  slots: TangramTargetSlot[];
  shapesPool: TangramShape[];
}

export const TANGRAM_LEVELS: TangramLevel[] = [
  // 1. บ้าน
  {
    id: 'tangram-k1-house',
    grade: 'K1',
    title: 'ประกอบบ้านอบอุ่น',
    description: 'ใส่หลังคาสามเหลี่ยมและตัวบ้านสี่เหลี่ยม',
    resultIcon: '🏠',
    slots: [
      { id: 'roof', requiredShapeType: 'triangle', label: 'หลังคา', xPercent: 50, yPercent: 25 },
      { id: 'body', requiredShapeType: 'square', label: 'ตัวบ้าน', xPercent: 50, yPercent: 65 },
    ],
    shapesPool: [
      { id: 's-tri-red', name: 'สามเหลี่ยมสีแดง', shapeType: 'triangle', color: 'bg-rose-500 text-white', icon: '🔺' },
      { id: 's-squ-blue', name: 'สี่เหลี่ยมสีฟ้า', shapeType: 'square', color: 'bg-blue-500 text-white', icon: '🟦' },
      { id: 's-cir-yellow', name: 'วงกลมสีเหลือง', shapeType: 'circle', color: 'bg-amber-400 text-white', icon: '🟡' },
    ],
  },
  // 2. เรือใบ
  {
    id: 'tangram-k2-boat',
    grade: 'K2',
    title: 'ต่อเรือใบแล่นทะเล',
    description: 'ประกอบใบเรือสามเหลี่ยม 2 ชิ้น และลำเรือสี่เหลี่ยมผืนผ้า',
    resultIcon: '⛵',
    slots: [
      { id: 'sail1', requiredShapeType: 'triangle', label: 'ใบเรือใหญ่', xPercent: 38, yPercent: 30 },
      { id: 'sail2', requiredShapeType: 'triangle', label: 'ใบเรือเล็ก', xPercent: 62, yPercent: 35 },
      { id: 'hull', requiredShapeType: 'rectangle', label: 'ลำเรือ', xPercent: 50, yPercent: 75 },
    ],
    shapesPool: [
      { id: 'b-tri-1', name: 'สามเหลี่ยมใบเรือ', shapeType: 'triangle', color: 'bg-emerald-500 text-white', icon: '🔺' },
      { id: 'b-tri-2', name: 'สามเหลี่ยมใบเรือรอง', shapeType: 'triangle', color: 'bg-teal-400 text-white', icon: '🔺' },
      { id: 'b-rec-1', name: 'สี่เหลี่ยมผืนผ้าลำเรือ', shapeType: 'rectangle', color: 'bg-amber-600 text-white', icon: '🪵' },
      { id: 'b-cir-1', name: 'วงกลมลูกบอล', shapeType: 'circle', color: 'bg-pink-400 text-white', icon: '🟣' },
    ],
  },
  // 3. จรวด
  {
    id: 'tangram-k3-rocket',
    grade: 'K3',
    title: 'สร้างจรวดทะยานสู่อวกาศ',
    description: 'หัวจรวด ตัวถัง ปีกซ้าย-ขวา และหน้าต่างทรงกลม',
    resultIcon: '🚀',
    slots: [
      { id: 'nose', requiredShapeType: 'triangle', label: 'หัวจรวด', xPercent: 50, yPercent: 15 },
      { id: 'window', requiredShapeType: 'circle', label: 'หน้าต่างกลม', xPercent: 50, yPercent: 42 },
      { id: 'body', requiredShapeType: 'rectangle', label: 'ลำตัวจรวด', xPercent: 50, yPercent: 50 },
      { id: 'wing-l', requiredShapeType: 'triangle', label: 'ปีกซ้าย', xPercent: 25, yPercent: 75 },
      { id: 'wing-r', requiredShapeType: 'triangle', label: 'ปีกขวา', xPercent: 75, yPercent: 75 },
    ],
    shapesPool: [
      { id: 'r-tri-nose', name: 'หัวแหลม', shapeType: 'triangle', color: 'bg-rose-500 text-white', icon: '🔺' },
      { id: 'r-cir-win', name: 'หน้าต่างวงกลม', shapeType: 'circle', color: 'bg-cyan-400 text-slate-800', icon: '⚪' },
      { id: 'r-rec-body', name: 'ลำตัวยาว', shapeType: 'rectangle', color: 'bg-indigo-600 text-white', icon: '🏛️' },
      { id: 'r-tri-l', name: 'ปีกซ้าย', shapeType: 'triangle', color: 'bg-amber-500 text-white', icon: '◀️' },
      { id: 'r-tri-r', name: 'ปีกขวา', shapeType: 'triangle', color: 'bg-amber-500 text-white', icon: '▶️' },
    ],
  },
  // 4. ปลา
  {
    id: 'tangram-k1-fish',
    grade: 'K1',
    title: 'ปลาทองว่ายน้ำ',
    description: 'ประกอบหัวปลาและหางปลาสามเหลี่ยม',
    resultIcon: '🐠',
    slots: [
      { id: 'f-body', requiredShapeType: 'square', label: 'ลำตัวปลา', xPercent: 40, yPercent: 50 },
      { id: 'f-tail', requiredShapeType: 'triangle', label: 'หางปลา', xPercent: 72, yPercent: 50 },
    ],
    shapesPool: [
      { id: 'f-squ', name: 'สี่เหลี่ยมลำตัว', shapeType: 'square', color: 'bg-amber-500 text-white', icon: '🟧' },
      { id: 'f-tri', name: 'สามเหลี่ยมหางปลา', shapeType: 'triangle', color: 'bg-rose-400 text-white', icon: '🔺' },
      { id: 'f-cir', name: 'วงกลมฟองน้ำ', shapeType: 'circle', color: 'bg-sky-300 text-slate-800', icon: '🫧' },
    ],
  },
  // 5. ต้นไม้
  {
    id: 'tangram-k2-tree',
    grade: 'K2',
    title: 'ต้นไม้เขียวชอุ่ม',
    description: 'ยอดไม้สามเหลี่ยมซ้อนกันและลำต้น',
    resultIcon: '🌲',
    slots: [
      { id: 't-top', requiredShapeType: 'triangle', label: 'ยอดบน', xPercent: 50, yPercent: 22 },
      { id: 't-mid', requiredShapeType: 'triangle', label: 'พุ่มล่าง', xPercent: 50, yPercent: 48 },
      { id: 't-trunk', requiredShapeType: 'rectangle', label: 'ลำต้น', xPercent: 50, yPercent: 78 },
    ],
    shapesPool: [
      { id: 't-tri1', name: 'สามเหลี่ยมยอดไม้', shapeType: 'triangle', color: 'bg-emerald-500 text-white', icon: '🔺' },
      { id: 't-tri2', name: 'สามเหลี่ยมพุ่มไม้', shapeType: 'triangle', color: 'bg-green-600 text-white', icon: '🔺' },
      { id: 't-rec', name: 'สี่เหลี่ยมลำต้น', shapeType: 'rectangle', color: 'bg-amber-800 text-white', icon: '🪵' },
    ],
  },
  // 6. หงส์ขาว
  {
    id: 'tangram-k2-swan',
    grade: 'K2',
    title: 'หงส์ขาวลอยน้ำ',
    description: 'หัว ปีก และลำตัวหงส์',
    resultIcon: '🦢',
    slots: [
      { id: 's-head', requiredShapeType: 'circle', label: 'หัวหงส์', xPercent: 30, yPercent: 25 },
      { id: 's-neck', requiredShapeType: 'rectangle', label: 'คอหงส์', xPercent: 35, yPercent: 48 },
      { id: 's-body', requiredShapeType: 'triangle', label: 'ลำตัวปีก', xPercent: 62, yPercent: 65 },
    ],
    shapesPool: [
      { id: 'sw-cir', name: 'วงกลมหัว', shapeType: 'circle', color: 'bg-slate-100 text-slate-800 border', icon: '⚪' },
      { id: 'sw-rec', name: 'คอยาว', shapeType: 'rectangle', color: 'bg-sky-200 text-slate-800', icon: '🥢' },
      { id: 'sw-tri', name: 'ปีกสามเหลี่ยม', shapeType: 'triangle', color: 'bg-blue-400 text-white', icon: '🔺' },
    ],
  },
  // 7. ลูกแมว
  {
    id: 'tangram-k1-cat',
    grade: 'K1',
    title: 'ลูกแมวเหมียว',
    description: 'หูแหลมสองข้างและหัวกลม',
    resultIcon: '🐱',
    slots: [
      { id: 'c-ear-l', requiredShapeType: 'triangle', label: 'หูซ้าย', xPercent: 35, yPercent: 25 },
      { id: 'c-ear-r', requiredShapeType: 'triangle', label: 'หูขวา', xPercent: 65, yPercent: 25 },
      { id: 'c-head', requiredShapeType: 'circle', label: 'หน้ากลม', xPercent: 50, yPercent: 60 },
    ],
    shapesPool: [
      { id: 'c-t-1', name: 'หูซ้าย', shapeType: 'triangle', color: 'bg-amber-500 text-white', icon: '🔺' },
      { id: 'c-t-2', name: 'หูขวา', shapeType: 'triangle', color: 'bg-amber-500 text-white', icon: '🔺' },
      { id: 'c-c-1', name: 'หัวกลม', shapeType: 'circle', color: 'bg-amber-200 text-slate-800', icon: '🟡' },
    ],
  },
  // 8. กังหันลม
  {
    id: 'tangram-k3-windmill',
    grade: 'K3',
    title: 'กังหันลมหมุนติ้ว',
    description: 'ใบพัด 3 แฉกและเสากังหัน',
    resultIcon: '🎡',
    slots: [
      { id: 'w-blade1', requiredShapeType: 'triangle', label: 'ใบพัดบน', xPercent: 50, yPercent: 20 },
      { id: 'w-blade2', requiredShapeType: 'triangle', label: 'ใบพัดซ้าย', xPercent: 32, yPercent: 42 },
      { id: 'w-blade3', requiredShapeType: 'triangle', label: 'ใบพัดขวา', xPercent: 68, yPercent: 42 },
      { id: 'w-tower', requiredShapeType: 'rectangle', label: 'เสากังหัน', xPercent: 50, yPercent: 75 },
    ],
    shapesPool: [
      { id: 'wb-1', name: 'ใบพัด 1', shapeType: 'triangle', color: 'bg-cyan-500 text-white', icon: '🔺' },
      { id: 'wb-2', name: 'ใบพัด 2', shapeType: 'triangle', color: 'bg-sky-400 text-white', icon: '🔺' },
      { id: 'wb-3', name: 'ใบพัด 3', shapeType: 'triangle', color: 'bg-teal-400 text-white', icon: '🔺' },
      { id: 'wt-1', name: 'เสาหอคอย', shapeType: 'rectangle', color: 'bg-slate-400 text-white', icon: '🏛️' },
    ],
  },
  // 9. สะพานโค้ง
  {
    id: 'tangram-k2-bridge',
    grade: 'K2',
    title: 'สะพานข้ามลำธาร',
    description: 'ตอม่อสะพาน 2 ฝั่ง และแผ่นสะพาน',
    resultIcon: '🌉',
    slots: [
      { id: 'b-p1', requiredShapeType: 'square', label: 'ตอม่อซ้าย', xPercent: 25, yPercent: 65 },
      { id: 'b-p2', requiredShapeType: 'square', label: 'ตอม่อขวา', xPercent: 75, yPercent: 65 },
      { id: 'b-deck', requiredShapeType: 'rectangle', label: 'พื้นสะพาน', xPercent: 50, yPercent: 40 },
    ],
    shapesPool: [
      { id: 'bp-1', name: 'ตอม่อ 1', shapeType: 'square', color: 'bg-stone-500 text-white', icon: '⬛' },
      { id: 'bp-2', name: 'ตอม่อ 2', shapeType: 'square', color: 'bg-stone-500 text-white', icon: '⬛' },
      { id: 'bd-1', name: 'พื้นสะพานยาว', shapeType: 'rectangle', color: 'bg-amber-600 text-white', icon: '🪵' },
    ],
  },
  // 10. เป็ดก้าบๆ
  {
    id: 'tangram-k3-duck',
    grade: 'K3',
    title: 'เป็ดน้อยเล่นน้ำ',
    description: 'หัวกลม ปากแหลม ลำตัว และปีก',
    resultIcon: '🦆',
    slots: [
      { id: 'd-beak', requiredShapeType: 'triangle', label: 'ปากเป็ด', xPercent: 28, yPercent: 30 },
      { id: 'd-head', requiredShapeType: 'circle', label: 'หัวเป็ด', xPercent: 42, yPercent: 32 },
      { id: 'd-body', requiredShapeType: 'rectangle', label: 'ลำตัว', xPercent: 58, yPercent: 60 },
      { id: 'd-tail', requiredShapeType: 'triangle', label: 'หางเป็ด', xPercent: 82, yPercent: 55 },
    ],
    shapesPool: [
      { id: 'db-1', name: 'ปากแหลม', shapeType: 'triangle', color: 'bg-orange-500 text-white', icon: '◀️' },
      { id: 'dh-1', name: 'หัวกลม', shapeType: 'circle', color: 'bg-yellow-300 text-slate-800', icon: '🟡' },
      { id: 'dbody-1', name: 'ลำตัวยาว', shapeType: 'rectangle', color: 'bg-yellow-400 text-slate-800', icon: '🟨' },
      { id: 'dtail-1', name: 'หางสามเหลี่ยม', shapeType: 'triangle', color: 'bg-amber-500 text-white', icon: '🔺' },
    ],
  },
  ...EXTRA_TANGRAM_LEVELS,
];

// ==========================================
// 3. SPOT DIFFERENCES & HIDDEN OBJECTS (จับผิดภาพ & ค้นหาสิ่งของ - 10 ข้อ)
// ==========================================
export interface DifferenceItem {
  id: string;
  name: string;
  xPercent: number;
  yPercent: number;
  widthPercent?: number;
  heightPercent?: number;
  radius: number; // click hit tolerance
  leftDescription: string;
  rightDescription: string;
  icon: string;
}

export interface SpotDifferenceLevel {
  id: string;
  grade: Grade;
  title: string;
  themeScene: string;
  leftSceneTitle: string;
  rightSceneTitle: string;
  differences: DifferenceItem[];
  bgStyle: string;
  imageUrl?: string;
}

export const SPOT_DIFFERENCE_LEVELS: SpotDifferenceLevel[] = [
  // ข้อ 1: โต๊ะน้ำมันหอมระเหยมะกรูด (ตรงตามภาพตัวอย่างของ User 100%)
  {
    id: 'spot-herbal-bottles',
    grade: 'K1',
    title: 'โต๊ะเครื่องหอมน้ำมันมะกรูด',
    themeScene: 'ขวดแก้วน้ำมันหอมระเหยและพืชสมุนไพรบนโต๊ะไม้',
    leftSceneTitle: 'ภาพซ้าย',
    rightSceneTitle: 'ภาพขวา',
    bgStyle: 'from-amber-100 to-amber-200',
    differences: [
      {
        id: 'diff-purple-liquid',
        name: 'ชั้นน้ำมันสีม่วงที่ก้นขวด',
        xPercent: 50,
        yPercent: 72,
        widthPercent: 44,
        heightPercent: 20,
        radius: 18,
        leftDescription: 'ก้นขวดมีชั้นสีม่วงสะท้อนแสง 💜',
        rightDescription: 'ก้นขวดเป็นน้ำมันสีใสบริสุทธิ์ 🤍',
        icon: '🧴',
      },
      {
        id: 'diff-string-cork',
        name: 'เชือกผูกปากขวดแก้ว',
        xPercent: 54,
        yPercent: 44,
        widthPercent: 20,
        heightPercent: 16,
        radius: 15,
        leftDescription: 'เชือกสีขาวมัดคอขวด 🧶',
        rightDescription: 'เชือกมัดเป็นโบว์สวยงาม 🎀',
        icon: '🪢',
      },
      {
        id: 'diff-amber-cap',
        name: 'ฝาขวดสีชาด้านหลัง',
        xPercent: 34,
        yPercent: 24,
        widthPercent: 18,
        heightPercent: 18,
        radius: 14,
        leftDescription: 'ฝาขวดสีชาสีดำสนิท ⬛',
        rightDescription: 'ฝาขวดสีชาประกายสีทอง 🟡',
        icon: '🫙',
      },
      {
        id: 'diff-spoon-lime',
        name: 'ลูกมะกรูดบนช้อนไม้',
        xPercent: 17,
        yPercent: 73,
        widthPercent: 20,
        heightPercent: 20,
        radius: 15,
        leftDescription: 'มะกรูดมีใบไม้สีเขียวสด 🍃',
        rightDescription: 'ผลมะกรูดกลมเกลี้ยงไม่มีใบ 🍋',
        icon: '🍋',
      },
      {
        id: 'diff-ceramic-jar-accent',
        name: 'แถบสีบนโถเซรามิกด้านหลัง',
        xPercent: 28,
        yPercent: 42,
        widthPercent: 18,
        heightPercent: 18,
        radius: 14,
        leftDescription: 'โถเซรามิกสีเข้มขัดมัน 🏺',
        rightDescription: 'โถเซรามิกมีแถบคาดสีขาว 🏺',
        icon: '🏺',
      },
      {
        id: 'diff-dropper-label',
        name: 'ป้ายฉลากขวดดรอปเปอร์',
        xPercent: 34,
        yPercent: 37,
        widthPercent: 18,
        heightPercent: 18,
        radius: 14,
        leftDescription: 'ฉลากพิมพ์เส้นบรรทัดสีฟ้า 🏷️',
        rightDescription: 'ฉลากพิมพ์รูปใบสมุนไพร 🌿',
        icon: '🏷️',
      },
      {
        id: 'diff-table-wood-grain',
        name: 'ลายตาไม้บนโต๊ะไม้สัก',
        xPercent: 88,
        yPercent: 84,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'เนื้อไม้เรียบเนียนสีทอง 🪵',
        rightDescription: 'มีวงตาไม้สีน้ำตาลเข้ม 🪵',
        icon: '🪵',
      },
    ],
  },
  // ข้อ 2: ฟาร์มสัตว์แสนสุข
  {
    id: 'spot-k1-farm',
    grade: 'K1',
    title: 'ฟาร์มสัตว์แสนสุข',
    themeScene: 'สวนฟาร์มคุณตาคุณยายและสัตว์น่ารัก',
    leftSceneTitle: 'ภาพซ้าย',
    rightSceneTitle: 'ภาพขวา',
    bgStyle: 'from-emerald-50 to-amber-50',
    differences: [
      {
        id: 'diff-sun',
        name: 'แว่นตากันแดดของดวงอาทิตย์',
        xPercent: 18,
        yPercent: 18,
        widthPercent: 20,
        heightPercent: 20,
        radius: 14,
        leftDescription: 'ดวงอาทิตย์ยิ้ม ☀️',
        rightDescription: 'ดวงอาทิตย์ใส่แว่นตาดำเท่ 😎',
        icon: '🕶️',
      },
      {
        id: 'diff-cow',
        name: 'กระดิ่งที่คอวัว',
        xPercent: 50,
        yPercent: 55,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'วัวผูกโบว์แดง 🎀',
        rightDescription: 'วัวคล้องกระดิ่งสีทอง 🔔',
        icon: '🔔',
      },
      {
        id: 'diff-apple',
        name: 'ผลแอปเปิ้ลบนต้นไม้',
        xPercent: 82,
        yPercent: 28,
        widthPercent: 20,
        heightPercent: 20,
        radius: 14,
        leftDescription: 'แอปเปิ้ลสีแดงสด 🍎',
        rightDescription: 'ผลส้มสีส้มสดใส 🍊',
        icon: '🍊',
      },
      {
        id: 'diff-barn-roof',
        name: 'กังหันลมบนโรงนา',
        xPercent: 32,
        yPercent: 39,
        widthPercent: 18,
        heightPercent: 18,
        radius: 15,
        leftDescription: 'โรงนามีใบพัดกังหัน 4 แฉก 🎡',
        rightDescription: 'โรงนามีไก่แจ้บอกทิศทางลม 🐓',
        icon: '🎡',
      },
      {
        id: 'diff-fence-flower',
        name: 'ดอกทานตะวันข้างรั้วไม้',
        xPercent: 85,
        yPercent: 75,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'ดอกทานตะวันสีเหลืองบาน 🌻',
        rightDescription: 'ดอกกุหลาบสีแดงสด 🌹',
        icon: '🌻',
      },
      {
        id: 'diff-chick-corn',
        name: 'ลูกเจี๊ยบกินเมล็ดข้าวโพด',
        xPercent: 22,
        yPercent: 82,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'ลูกเจี๊ยบ 2 ตัวกำลังจิกกิน 🐥',
        rightDescription: 'ลูกเจี๊ยบ 1 ตัวกำลังนอนเล่น 🐥',
        icon: '🐥',
      },
      {
        id: 'diff-hay-bale',
        name: 'โบว์ผูกกองฟาง',
        xPercent: 70,
        yPercent: 65,
        widthPercent: 16,
        heightPercent: 16,
        radius: 13,
        leftDescription: 'กองฟางมัดเชือกสีน้ำตาล 🌾',
        rightDescription: 'กองฟางผูกริบบิ้นสีแดง 🎀',
        icon: '🌾',
      },
    ],
  },
  // ข้อ 3: สวนสาธารณะร่มรื่น
  {
    id: 'spot-k2-park',
    grade: 'K2',
    title: 'สวนสาธารณะร่มรื่น',
    themeScene: 'เด็ก ๆ วิ่งเล่นในสนามหญ้า',
    leftSceneTitle: 'ภาพซ้าย',
    rightSceneTitle: 'ภาพขวา',
    bgStyle: 'from-sky-50 to-teal-50',
    differences: [
      {
        id: 'diff-kite',
        name: 'สีของว่าวลอยฟ้า',
        xPercent: 20,
        yPercent: 20,
        widthPercent: 20,
        heightPercent: 20,
        radius: 14,
        leftDescription: 'ว่าวสีแดง 🪁',
        rightDescription: 'ว่าวสีเหลือง 🪁',
        icon: '🪁',
      },
      {
        id: 'diff-dog',
        name: 'หมวกของเจ้าตูบ',
        xPercent: 50,
        yPercent: 68,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'สุนัขใส่หมวกแก๊ป 🧢',
        rightDescription: 'สุนัขไม่ใส่หมวก 🐶',
        icon: '🧢',
      },
      {
        id: 'diff-bench',
        name: 'ของบนม้านั่ง',
        xPercent: 78,
        yPercent: 62,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'หนังสือนิทานวางอยู่ 📖',
        rightDescription: 'ลูกบอลวางอยู่ ⚽',
        icon: '⚽',
      },
      {
        id: 'diff-fountain-jet',
        name: 'สายน้ำพุกลางสวน',
        xPercent: 50,
        yPercent: 45,
        widthPercent: 18,
        heightPercent: 18,
        radius: 15,
        leftDescription: 'น้ำพุพุ่งขึ้น 3 สาย ⛲',
        rightDescription: 'น้ำพุพุ่งขึ้น 5 สาย ⛲',
        icon: '⛲',
      },
      {
        id: 'diff-tree-nest',
        name: 'รังนกบนต้นไม้ใหญ่',
        xPercent: 85,
        yPercent: 25,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'มีรังนกพร้อมไข่ 🪺',
        rightDescription: 'ไม่มีรังนกบนกิ่งไม้ 🍃',
        icon: '🪺',
      },
      {
        id: 'diff-park-bicycle',
        name: 'กระดิ่งหน้ารถจักรยาน',
        xPercent: 18,
        yPercent: 62,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'จักรยานมีกระดิ่งสีเงิน 🚲',
        rightDescription: 'จักรยานมีไฟหน้าสีส้ม 🚲',
        icon: '🚲',
      },
      {
        id: 'diff-tulip-bed',
        name: 'ดอกทิวลิปในแปลงดอกไม้',
        xPercent: 38,
        yPercent: 88,
        widthPercent: 16,
        heightPercent: 16,
        radius: 13,
        leftDescription: 'ดอกทิวลิปสีเหลืองสดใส 🌷',
        rightDescription: 'ดอกทิวลิปสีชมพูหวาน 🌷',
        icon: '🌷',
      },
    ],
  },
  // ข้อ 4: โลกใต้ท้องทะเลลึก
  {
    id: 'spot-k3-ocean',
    grade: 'K3',
    title: 'โลกใต้ท้องทะเลลึก',
    themeScene: 'ปะการังและเพื่อนสัตว์น้ำใต้สมุทร',
    leftSceneTitle: 'ภาพซ้าย',
    rightSceneTitle: 'ภาพขวา',
    bgStyle: 'from-blue-50 to-cyan-100',
    differences: [
      {
        id: 'diff-crab',
        name: 'แว่นตาดำน้ำของปู',
        xPercent: 25,
        yPercent: 75,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'ปูสีส้มธรรมดา 🦀',
        rightDescription: 'ปูใส่แว่นตาดำน้ำ 🤿',
        icon: '🤿',
      },
      {
        id: 'diff-sub',
        name: 'หน้าต่างเรือดำน้ำ',
        xPercent: 50,
        yPercent: 28,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'หน้าต่างทรงกลม 🟡',
        rightDescription: 'หน้าต่างทรงหัวใจ 💖',
        icon: '💛',
      },
      {
        id: 'diff-jelly',
        name: 'สีของแมงกะพรุน',
        xPercent: 80,
        yPercent: 40,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'แมงกะพรุนสีชมพู 🪼',
        rightDescription: 'แมงกะพรุนสีฟ้าเรืองแสง 🪼',
        icon: '🪼',
      },
      {
        id: 'diff-sea-turtle',
        name: 'ลายกระดองเต่าทะเล',
        xPercent: 76,
        yPercent: 24,
        widthPercent: 18,
        heightPercent: 18,
        radius: 15,
        leftDescription: 'กระดองเต่าสีเขียวมรกต 🐢',
        rightDescription: 'กระดองเต่าสีน้ำตาลทอง 🐢',
        icon: '🐢',
      },
      {
        id: 'diff-jellyfish-glow',
        name: 'หนวดแมงกะพรุนเรืองแสง',
        xPercent: 22,
        yPercent: 32,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'หนวดหยักสีฟ้าใส 🪼',
        rightDescription: 'หนวดมีฟองแสงสีทอง 🪼',
        icon: '🪼',
      },
      {
        id: 'diff-clam-shell',
        name: 'ไข่มุกในฝาหอยใต้ทะเล',
        xPercent: 55,
        yPercent: 88,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'ฝาหอยเปิดเห็นมุกสีชมพู 🦪',
        rightDescription: 'ฝาหอยปิดสนิท 🦪',
        icon: '🦪',
      },
      {
        id: 'diff-anchor-chain',
        name: 'โซ่สมอเรือโบราณ',
        xPercent: 88,
        yPercent: 85,
        widthPercent: 14,
        heightPercent: 14,
        radius: 13,
        leftDescription: 'มีตะไคร่น้ำเกาะที่สมอเรือ ⚓',
        rightDescription: 'สมอเรือสีเทาเกลี้ยง ⚓',
        icon: '⚓',
      },
    ],
  },
  // ข้อ 5: สถานีอวกาศดวงดาว
  {
    id: 'spot-space-station',
    grade: 'K3',
    title: 'สถานีอวกาศดวงดาว',
    themeScene: 'ท่องกาแล็กซีกับมนุษย์อวกาศ',
    leftSceneTitle: 'ภาพซ้าย',
    rightSceneTitle: 'ภาพขวา',
    bgStyle: 'from-indigo-900 to-purple-900',
    differences: [
      {
        id: 'diff-flag',
        name: 'ธงบนดวงจันทร์',
        xPercent: 20,
        yPercent: 65,
        widthPercent: 20,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'ธงสีแดง 🚩',
        rightDescription: 'ธงลายดาวสีทอง 🏴',
        icon: '🚩',
      },
      {
        id: 'diff-saturn-ring',
        name: 'วงแหวนดาวเสาร์',
        xPercent: 78,
        yPercent: 22,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'ดาวเสาร์มีวงแหวน 🪐',
        rightDescription: 'ดาวเสาร์ไม่มีวงแหวน 🌕',
        icon: '🪐',
      },
      {
        id: 'diff-helmet-star',
        name: 'ตราบนหมวกอวกาศ',
        xPercent: 48,
        yPercent: 40,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'หมวกอวกาศมีดาว ⭐',
        rightDescription: 'หมวกอวกาศมีหัวใจ 💖',
        icon: '⭐',
      },
      {
        id: 'diff-rocket-flame',
        name: 'เปลวไฟท้ายยานอวกาศ',
        xPercent: 20,
        yPercent: 18,
        widthPercent: 18,
        heightPercent: 18,
        radius: 15,
        leftDescription: 'เปลวไฟสีส้มสว่าง 🚀',
        rightDescription: 'เปลวไฟสีฟ้าพลาสม่า 🚀',
        icon: '🚀',
      },
      {
        id: 'diff-solar-panel',
        name: 'แผงโซลาร์เซลล์สถานี',
        xPercent: 52,
        yPercent: 26,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'แผงโซลาร์เซลล์สีน้ำเงิน 🛰️',
        rightDescription: 'แผงโซลาร์เซลล์สีทอง 🛰️',
        icon: '🛰️',
      },
      {
        id: 'diff-shooting-star',
        name: 'ดาวหางหางยาว',
        xPercent: 45,
        yPercent: 12,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'มีดาวหางพาดผ่านท้องฟ้า ☄️',
        rightDescription: 'ท้องฟ้ามืดสนิทมีเพียงดาวประกาย ✨',
        icon: '☄️',
      },
      {
        id: 'diff-satellite-dish',
        name: 'จานดาวเทียมสำรวจ',
        xPercent: 85,
        yPercent: 78,
        widthPercent: 14,
        heightPercent: 14,
        radius: 13,
        leftDescription: 'จานดาวเทียมหันไปทางซ้าย 📡',
        rightDescription: 'จานดาวเทียมหันไปทางขวา 📡',
        icon: '📡',
      },
    ],
  },
  // ข้อ 6: ครัวขนมหวานเบเกอรี่
  {
    id: 'spot-bakery',
    grade: 'K2',
    title: 'ครัวขนมหวานเบเกอรี่',
    themeScene: 'เชฟตัวน้อยอบขนมเค้กในครัว',
    leftSceneTitle: 'ภาพซ้าย',
    rightSceneTitle: 'ภาพขวา',
    bgStyle: 'from-pink-50 to-rose-100',
    differences: [
      {
        id: 'diff-cherry',
        name: 'เชอร์รี่บนยอดเค้ก',
        xPercent: 50,
        yPercent: 35,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'เชอร์รี่สีแดงสด 🍒',
        rightDescription: 'สตรอว์เบอร์รีลูกโต 🍓',
        icon: '🍒',
      },
      {
        id: 'diff-cupcake',
        name: 'สีถ้วยคัพเค้ก',
        xPercent: 22,
        yPercent: 65,
        widthPercent: 20,
        heightPercent: 20,
        radius: 14,
        leftDescription: 'คัพเค้กถ้วยสีฟ้า 🧁',
        rightDescription: 'คัพเค้กถ้วยสีชมพู 🧁',
        icon: '🧁',
      },
      {
        id: 'diff-chef-hat',
        name: 'โบว์บนหมวกเชฟ',
        xPercent: 78,
        yPercent: 55,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'เชฟผูกโบว์สีแดง 🎀',
        rightDescription: 'เชฟผูกโบว์สีเขียว 🎀',
        icon: '🎀',
      },
      {
        id: 'diff-croissant-tray',
        name: 'ชิ้นครัวซองต์เนยสด',
        xPercent: 65,
        yPercent: 75,
        widthPercent: 18,
        heightPercent: 18,
        radius: 15,
        leftDescription: 'ครัวซองต์สีเหลืองทอง 🥐',
        rightDescription: 'ขนมปังฝรั่งเศสบาแก็ตต์ 🥖',
        icon: '🥐',
      },
      {
        id: 'diff-cake-candles',
        name: 'เทียนวันเกิดบนเค้ก',
        xPercent: 32,
        yPercent: 78,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'เค้กปักเทียน 3 เล่ม 🎂',
        rightDescription: 'เค้กปักเทียน 5 เล่ม 🎂',
        icon: '🎂',
      },
      {
        id: 'diff-bakery-sign',
        name: 'ป้ายกระดานเมนูเบเกอรี่',
        xPercent: 18,
        yPercent: 25,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'ป้ายวาดรูปคัพเค้ก 🧁',
        rightDescription: 'ป้ายวาดรูปหัวใจ 💖',
        icon: '📋',
      },
      {
        id: 'diff-oven-glow',
        name: 'ไฟเตาอบขนมปัง',
        xPercent: 85,
        yPercent: 35,
        widthPercent: 14,
        heightPercent: 14,
        radius: 13,
        leftDescription: 'เตาอบเปิดไฟสีส้มอุ่น ♨️',
        rightDescription: 'เตาอบปิดไฟมืดสนิท 🔲',
        icon: '♨️',
      },
    ],
  },
  // ข้อ 7: ห้องเรียนปฐมวัย
  {
    id: 'spot-classroom',
    grade: 'K1',
    title: 'ห้องเรียนปฐมวัยแสนสนุก',
    themeScene: 'มุมของเล่นและอุปกรณ์การเรียน',
    leftSceneTitle: 'ภาพซ้าย',
    rightSceneTitle: 'ภาพขวา',
    bgStyle: 'from-yellow-50 to-amber-100',
    differences: [
      {
        id: 'diff-clock',
        name: 'เข็มนาฬิกาแขวนผนัง',
        xPercent: 25,
        yPercent: 22,
        widthPercent: 20,
        heightPercent: 20,
        radius: 14,
        leftDescription: 'นาฬิกาบอกเวลา 9 โมง 🕘',
        rightDescription: 'นาฬิกาบอกเวลา 12 โมง 🕛',
        icon: '⏰',
      },
      {
        id: 'diff-globe',
        name: 'ลูกโลกจำลอง',
        xPercent: 50,
        yPercent: 55,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'ลูกโลกสีฟ้า 🌍',
        rightDescription: 'ลูกโลกสีเขียว 🌐',
        icon: '🌍',
      },
      {
        id: 'diff-crayons',
        name: 'กล่องสีเทียน',
        xPercent: 76,
        yPercent: 68,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'สีเทียน 3 แท่ง 🖍️',
        rightDescription: 'สีเทียน 5 แท่ง 🖍️',
        icon: '🖍️',
      },
      {
        id: 'diff-blackboard-star',
        name: 'รูปดาวบนกระดานดำ',
        xPercent: 50,
        yPercent: 18,
        widthPercent: 18,
        heightPercent: 18,
        radius: 15,
        leftDescription: 'มีรูปดาวสีเหลืองวาดบนกระดาน ⭐',
        rightDescription: 'มีรูปพระอาทิตย์ยิ้ม ☀️',
        icon: '⭐',
      },
      {
        id: 'diff-book-stack',
        name: 'สันปกหนังสือนิทาน',
        xPercent: 20,
        yPercent: 65,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'หนังสือนิทานเล่มสีแดง 📕',
        rightDescription: 'หนังสือนิทานเล่มสีฟ้า 📘',
        icon: '📕',
      },
      {
        id: 'diff-plant-pot',
        name: 'ดอกไม้ในกระถางริมหน้าต่าง',
        xPercent: 84,
        yPercent: 68,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'ดอกไม้สีชมพูในกระถาง 🌸',
        rightDescription: 'กระบองเพชรต้นกลม 🌵',
        icon: '🌸',
      },
      {
        id: 'diff-backpack-hook',
        name: 'กระเป๋านักเรียนแขวนเสา',
        xPercent: 12,
        yPercent: 45,
        widthPercent: 14,
        heightPercent: 14,
        radius: 13,
        leftDescription: 'กระเป๋าสีเหลืองสะพายหลัง 🎒',
        rightDescription: 'กระเป๋าสีเขียวมิ้นต์ 🎒',
        icon: '🎒',
      },
    ],
  },
  // ข้อ 8: หุบเขาไดโนเสาร์
  {
    id: 'spot-dino-valley',
    grade: 'K2',
    title: 'หุบเขาไดโนเสาร์ล้านปี',
    themeScene: 'ไดโนเสาร์และไข่ในรังอบอุ่น',
    leftSceneTitle: 'ภาพซ้าย',
    rightSceneTitle: 'ภาพขวา',
    bgStyle: 'from-lime-50 to-emerald-100',
    differences: [
      {
        id: 'diff-volcano',
        name: 'ควันภูเขาไฟ',
        xPercent: 22,
        yPercent: 25,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'ภูเขาไฟสงบนิ่ง 🏔️',
        rightDescription: 'ภูเขาไฟมีควันพวยพุ่ง 🌋',
        icon: '🌋',
      },
      {
        id: 'diff-dino-egg',
        name: 'ไข่ไดโนเสาร์',
        xPercent: 76,
        yPercent: 70,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'ไข่สีขาวลายจุดเขียว 🥚',
        rightDescription: 'ไข่ฟักมีลูกไดโนเสาร์โผล่ 🐣',
        icon: '🥚',
      },
      {
        id: 'diff-fern',
        name: 'ดอกไม้ข้างก้อนหิน',
        xPercent: 50,
        yPercent: 62,
        widthPercent: 20,
        heightPercent: 20,
        radius: 14,
        leftDescription: 'ใบเฟิร์นสีเขียว 🌿',
        rightDescription: 'ดอกไม้สีม่วงบาน 🌸',
        icon: '🌸',
      },
      {
        id: 'diff-stego-plates',
        name: 'แผ่นหลังสเตโกซอรัส',
        xPercent: 72,
        yPercent: 58,
        widthPercent: 18,
        heightPercent: 18,
        radius: 15,
        leftDescription: 'แผ่นหลังสีส้มสดใส 🦖',
        rightDescription: 'แผ่นหลังสีม่วง 🦖',
        icon: '🦖',
      },
      {
        id: 'diff-dino-footprint',
        name: 'รอยเท้าไดโนเสาร์บนดิน',
        xPercent: 42,
        yPercent: 85,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'มีรอยเท้าไดโนเสาร์ 3 แฉก 🐾',
        rightDescription: 'ดินเรียบไม่มีรอยเท้า 🪨',
        icon: '🐾',
      },
      {
        id: 'diff-palm-coconuts',
        name: 'ผลมะพร้าวดึกดำบรรพ์',
        xPercent: 85,
        yPercent: 42,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'ต้นปาล์มมีลูกมะพร้าว 3 ผล 🥥',
        rightDescription: 'ต้นปาล์มไม่มีผล 🌴',
        icon: '🥥',
      },
      {
        id: 'diff-pterodactyl-sky',
        name: 'เทอโรแดกทิลบินบนฟ้า',
        xPercent: 60,
        yPercent: 18,
        widthPercent: 14,
        heightPercent: 14,
        radius: 13,
        leftDescription: 'ไดโนเสาร์บินกางปีกกว้าง 🦅',
        rightDescription: 'มีก้อนเมฆสีขาวลอยอยู่ ☁️',
        icon: '🦅',
      },
    ],
  },
  // ข้อ 9: สวนผลไม้ฉ่ำหวาน
  {
    id: 'spot-fruit-garden',
    grade: 'K1',
    title: 'สวนผลไม้ฉ่ำหวาน',
    themeScene: 'ตะกร้าผลไม้และผีเสื้อบินตอม',
    leftSceneTitle: 'ภาพซ้าย',
    rightSceneTitle: 'ภาพขวา',
    bgStyle: 'from-orange-50 to-amber-100',
    differences: [
      {
        id: 'diff-butterfly-basket',
        name: 'ผีเสื้อที่ขอบตะกร้า',
        xPercent: 25,
        yPercent: 35,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'ผีเสื้อสีฟ้า 🦋',
        rightDescription: 'ผีเสื้อสีเหลือง 🦋',
        icon: '🦋',
      },
      {
        id: 'diff-watermelon',
        name: 'ชิ้นแตงโมในจาน',
        xPercent: 50,
        yPercent: 65,
        widthPercent: 24,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'แตงโมเนื้อสีแดง 🍉',
        rightDescription: 'แตงโมเนื้อสีเหลือง 🍉',
        icon: '🍉',
      },
      {
        id: 'diff-banana-count',
        name: 'กล้วยหอมในตะกร้า',
        xPercent: 76,
        yPercent: 45,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'กล้วยหอม 2 ผล 🍌',
        rightDescription: 'กล้วยหอม 1 ผล 🍌',
        icon: '🍌',
      },
      {
        id: 'diff-strawberry-plate',
        name: 'สตรอว์เบอร์รีลูกโต',
        xPercent: 35,
        yPercent: 75,
        widthPercent: 18,
        heightPercent: 18,
        radius: 15,
        leftDescription: 'สตรอว์เบอร์รีสีแดงฉ่ำ 🍓',
        rightDescription: 'ลูกเชอร์รี่คู่สีแดง 🍒',
        icon: '🍓',
      },
      {
        id: 'diff-lemon-tree',
        name: 'มะนาวสีเหลืองสด',
        xPercent: 15,
        yPercent: 22,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'มะนาวสีเหลืองลูกกลม 🍋',
        rightDescription: 'มะนาวสีเขียวสด 🍋',
        icon: '🍋',
      },
      {
        id: 'diff-grape-bunch',
        name: 'พวงองุ่นในจานผลไม้',
        xPercent: 68,
        yPercent: 70,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'พวงองุ่นสีม่วงเข้ม 🍇',
        rightDescription: 'พวงองุ่นเขียวสด 🍇',
        icon: '🍇',
      },
      {
        id: 'diff-watering-garden',
        name: 'บัวรดน้ำสวนผลไม้',
        xPercent: 85,
        yPercent: 80,
        widthPercent: 14,
        heightPercent: 14,
        radius: 13,
        leftDescription: 'บัวรดน้ำสีฟ้าสดใส 🪴',
        rightDescription: 'บัวรดน้ำสีส้ม 🪴',
        icon: '🪴',
      },
    ],
  },
  // ข้อ 10: ปราสาทเจ้าหญิงสายรุ้ง
  {
    id: 'spot-fairytale-castle',
    grade: 'K3',
    title: 'ปราสาทเจ้าหญิงสายรุ้ง',
    themeScene: 'ปราสาทเทพนิยาย ม้าบิน และสายรุ้งงาม',
    leftSceneTitle: 'ภาพซ้าย',
    rightSceneTitle: 'ภาพขวา',
    bgStyle: 'from-purple-50 to-pink-100',
    differences: [
      {
        id: 'diff-castle-flag',
        name: 'ธงบนยอดปราสาท',
        xPercent: 50,
        yPercent: 14,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'ธงสีชมพูปลิวไสว 🚩',
        rightDescription: 'ธงสีทองประกาย 🚩',
        icon: '🚩',
      },
      {
        id: 'diff-unicorn-horn',
        name: 'เขาของยูนิคอร์น',
        xPercent: 22,
        yPercent: 65,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'ยูนิคอร์นเขาสีรุ้ง 🦄',
        rightDescription: 'ม้าสีขาวธรรมดา 🐴',
        icon: '🦄',
      },
      {
        id: 'diff-rainbow-cloud',
        name: 'ก้อนเมฆปลายสายรุ้ง',
        xPercent: 80,
        yPercent: 32,
        widthPercent: 22,
        heightPercent: 22,
        radius: 14,
        leftDescription: 'ก้อนเมฆสีขาวนุ่ม ☁️',
        rightDescription: 'ก้อนเมฆมีหยดสายฝนสีทอง 🌧️✨',
        icon: '☁️',
      },
      {
        id: 'diff-castle-door',
        name: 'ประตูไม้โค้งปราสาท',
        xPercent: 50,
        yPercent: 72,
        widthPercent: 18,
        heightPercent: 18,
        radius: 15,
        leftDescription: 'ประตูไม้บานคู่สีน้ำตาล 🚪',
        rightDescription: 'ประตูเหล็กดัดสีทอง 🚪',
        icon: '🚪',
      },
      {
        id: 'diff-magic-wand',
        name: 'ไม้คทาวิเศษนางฟ้า',
        xPercent: 35,
        yPercent: 48,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'ยอดคทารูปดาวเปล่งแสง 🪄',
        rightDescription: 'ยอดคทารูปหัวใจสีชมพู 🪄',
        icon: '🪄',
      },
      {
        id: 'diff-sparkle-stars',
        name: 'ละอองเวทมนตร์รอบสายรุ้ง',
        xPercent: 68,
        yPercent: 25,
        widthPercent: 16,
        heightPercent: 16,
        radius: 14,
        leftDescription: 'ละอองดาวประกายสีทอง ✨',
        rightDescription: 'ละอองดาวประกายสีฟ้าคราม ✨',
        icon: '✨',
      },
      {
        id: 'diff-swan-moat',
        name: 'หงส์ขาวในคูน้ำปราสาท',
        xPercent: 75,
        yPercent: 78,
        widthPercent: 14,
        heightPercent: 14,
        radius: 13,
        leftDescription: 'หงส์ขาวว่ายน้ำอย่างสง่า 🦢',
        rightDescription: 'เป็ดน้อยสีเหลืองเล่นน้ำ 🦆',
        icon: '🦢',
      },
    ],
  },
  ...EXTRA_SPOT_LEVELS,
];

// ==========================================
// 4. AUDITORY & RHYTHM (จำแนกเสียงและเคาะจังหวะ - 10 ข้อ)
// ==========================================
export interface AuditoryQuestion {
  id: string;
  grade: Grade;
  soundType: 'animal' | 'vehicle' | 'nature' | 'musical';
  soundTitle: string;
  soundPromptThai: string;
  audioPitchPattern: number[]; // Frequencies for Web Audio synth
  correctOptionId: string;
  options: {
    id: string;
    label: string;
    icon: string;
    color: string;
  }[];
  revealedStory: string;
}

export const AUDITORY_QUESTIONS: AuditoryQuestion[] = [
  // ข้อ 1: แมว
  {
    id: 'snd-k1-cat',
    grade: 'K1',
    soundType: 'animal',
    soundTitle: 'เสียงร้องของสัตว์เลี้ยง',
    soundPromptThai: 'เหมียว~ เหมียว~ เสียงร้องน่ารักแบบนี้ เสียงของสัตว์ตัวใดเอ่ย?',
    audioPitchPattern: [659, 784, 880, 784],
    correctOptionId: 'cat',
    options: [
      { id: 'cat', label: 'แมวเหมียว', icon: '🐱', color: 'bg-amber-100' },
      { id: 'dog', label: 'สุนัข', icon: '🐶', color: 'bg-blue-100' },
      { id: 'duck', label: 'เป็ดก๊าบ', icon: '🦆', color: 'bg-emerald-100' },
    ],
    revealedStory: 'ใช่แล้วจ้ะ! เจ้าเหมียวร้อง เหมียว~ อ้อนขอกินปลานั่นเอง',
  },
  // ข้อ 2: รถไฟ
  {
    id: 'snd-k1-train',
    grade: 'K1',
    soundType: 'vehicle',
    soundTitle: 'เสียงยานพาหนะเดินทาง',
    soundPromptThai: 'ปู๊น ปู๊น ฉึกฉัก ฉึกฉัก! เสียงยานพาหนะใดกำลังแล่นมา?',
    audioPitchPattern: [440, 440, 523, 523, 440],
    correctOptionId: 'train',
    options: [
      { id: 'train', label: 'รถไฟฉึกฉัก', icon: '🚂', color: 'bg-indigo-100' },
      { id: 'airplane', label: 'เครื่องบิน', icon: '✈️', color: 'bg-sky-100' },
      { id: 'boat', label: 'เรือพาย', icon: '🛶', color: 'bg-teal-100' },
    ],
    revealedStory: 'เก่งมากเลย! รถไฟวิ่งบนรางเหล็ก ปู๊นๆ ฉึกฉักๆ',
  },
  // ข้อ 3: ฟ้าร้องฝนตก
  {
    id: 'snd-k2-thunder',
    grade: 'K2',
    soundType: 'nature',
    soundTitle: 'เสียงธรรมชาติรอบตัว',
    soundPromptThai: 'เปรี้ยง! ครืน ครืน... ซ่า ซ่า! เสียงปรากฏการณ์ธรรมชาติใด?',
    audioPitchPattern: [220, 180, 140, 120],
    correctOptionId: 'thunderstorm',
    options: [
      { id: 'sun', label: 'แดดออกจ้า', icon: '☀️', color: 'bg-yellow-100' },
      { id: 'thunderstorm', label: 'ฟ้าร้องฝนตก', icon: '⛈️', color: 'bg-slate-200' },
      { id: 'wind', label: 'ลมพัดใบไม้', icon: '🍃', color: 'bg-lime-100' },
      { id: 'rainbow', label: 'รุ้งกินน้ำ', icon: '🌈', color: 'bg-pink-100' },
    ],
    revealedStory: 'ถูกต้องแล้วจ้า! เสียงฟ้าร้องและเม็ดฝนตกลงมา ซ่า ซ่า ต้องพกร่มนะ!',
  },
  // ข้อ 4: กระดิ่งระฆัง
  {
    id: 'snd-k2-bell',
    grade: 'K2',
    soundType: 'musical',
    soundTitle: 'เสียงเครื่องเคาะจังหวะ',
    soundPromptThai: 'กริ๊ง กริ๊ง! กรุ๊งกริ๊ง! ใสดังกังวาน เสียงเครื่องเคาะใด?',
    audioPitchPattern: [1046, 1318, 1567, 2093],
    correctOptionId: 'triangle_bell',
    options: [
      { id: 'drum', label: 'กลองใหญ่', icon: '🥁', color: 'bg-rose-100' },
      { id: 'triangle_bell', label: 'กระดิ่งกริ๊ง', icon: '🔔', color: 'bg-amber-100' },
      { id: 'guitar', label: 'กีตาร์', icon: '🎸', color: 'bg-orange-100' },
      { id: 'whistle', label: 'นกหวีด', icon: '🪈', color: 'bg-blue-100' },
    ],
    revealedStory: 'ยอดเยี่ยมมาก! กระดิ่งทองส่งเสียงกริ๊งๆ กังวานสดใส',
  },
  // ข้อ 5: รถพยาบาล
  {
    id: 'snd-k3-ambulance',
    grade: 'K3',
    soundType: 'vehicle',
    soundTitle: 'เสียงไซเรนฉุกเฉินช่วยชีวิต',
    soundPromptThai: 'หว่อ วี หว่อ วี! เสียงไซเรนเร่งด่วนของรถพยาบาลคันใด?',
    audioPitchPattern: [600, 900, 600, 900, 600, 900],
    correctOptionId: 'ambulance',
    options: [
      { id: 'ambulance', label: 'รถพยาบาลฉุกเฉิน', icon: '🚑', color: 'bg-red-100' },
      { id: 'bus', label: 'รถบัสโรงเรียน', icon: '🚌', color: 'bg-amber-100' },
      { id: 'bicycle', label: 'รถจักรยาน', icon: '🚲', color: 'bg-emerald-100' },
      { id: 'tractor', label: 'รถแทรกเตอร์ฟาร์ม', icon: '🚜', color: 'bg-lime-100' },
    ],
    revealedStory: 'เก่งที่สุด! รถพยาบาลเปิดไซเรนรีบนำผู้ป่วยไปหาคุณหมอที่โรงพยาบาล',
  },
  // ข้อ 6: นกฮูก
  {
    id: 'snd-k3-owl',
    grade: 'K3',
    soundType: 'animal',
    soundTitle: 'เสียงสัตว์ยามค่ำคืน',
    soundPromptThai: 'ฮูก ฮูก~ กรู๊ กรู๊~ นกชนิดใดตื่นขึ้นมาร้องในเวลากลางคืน?',
    audioPitchPattern: [350, 310, 350, 290],
    correctOptionId: 'owl',
    options: [
      { id: 'rooster', label: 'ไก่ขันตอนเช้า', icon: '🐓', color: 'bg-orange-100' },
      { id: 'owl', label: 'นกฮูกตาโต', icon: '🦉', color: 'bg-indigo-100' },
      { id: 'parrot', label: 'นกแก้วช่างพูด', icon: '🦜', color: 'bg-teal-100' },
      { id: 'penguin', label: 'เพนกวินน้ำแข็ง', icon: '🐧', color: 'bg-cyan-100' },
    ],
    revealedStory: 'เจ้านกฮูกตาโต ตาใส ร้องฮูกๆ ในคืนที่พระจันทร์เต็มดวง!',
  },
  // ข้อ 7: สุนัขเห่า
  {
    id: 'snd-k1-dog',
    grade: 'K1',
    soundType: 'animal',
    soundTitle: 'เสียงสัตว์เลี้ยงแสนซื่อสัตย์',
    soundPromptThai: 'โฮ่ง โฮ่ง! บ๊อก บ๊อก! เสียงเห่าทักทายของสัตว์ใด?',
    audioPitchPattern: [300, 350, 300, 280],
    correctOptionId: 'dog',
    options: [
      { id: 'dog', label: 'สุนัขแสนรู้', icon: '🐶', color: 'bg-amber-100' },
      { id: 'sheep', label: 'แกะขนปุย', icon: '🐑', color: 'bg-slate-100' },
      { id: 'frog', label: 'กบอบๆ', icon: '🐸', color: 'bg-emerald-100' },
    ],
    revealedStory: 'เก่งมากจ้า! สุนัขเห่าโฮ่งๆ กระดิกหางต้อนรับเจ้าของ',
  },
  // ข้อ 8: ไก่ขันยามเช้า
  {
    id: 'snd-k2-rooster',
    grade: 'K2',
    soundType: 'animal',
    soundTitle: 'เสียงปลุกยามเช้าตรู่',
    soundPromptThai: 'เอก อี๊ เอก เอ้ก! เสียงร้องปลุกให้ตื่นนอนแต่เช้าตรู่?',
    audioPitchPattern: [500, 600, 750, 900],
    correctOptionId: 'rooster',
    options: [
      { id: 'rooster', label: 'ไก่แจ้ตัวผู้', icon: '🐓', color: 'bg-rose-100' },
      { id: 'cow', label: 'แม่วัวมอๆ', icon: '🐄', color: 'bg-stone-100' },
      { id: 'pig', label: 'หมูอู๊ดๆ', icon: '🐷', color: 'bg-pink-100' },
      { id: 'horse', label: 'ม้าฮี้ๆ', icon: '🐴', color: 'bg-orange-100' },
    ],
    revealedStory: 'เอก อี๊ เอก เอ้ก! คุณไก่แจ้ขันรับแสงแดดอุ่นๆ ตอนเช้าตรู่',
  },
  // ข้อ 9: ฝนตกซ่าๆ
  {
    id: 'snd-k1-rain',
    grade: 'K1',
    soundType: 'nature',
    soundTitle: 'เสียงหยดน้ำจากฟากฟ้า',
    soundPromptThai: 'เปาะแปะ เปาะแปะ... ซ่า ซ่า! เสียงของอะไรตกลงมาจากเมฆ?',
    audioPitchPattern: [800, 600, 750, 500],
    correctOptionId: 'rain',
    options: [
      { id: 'rain', label: 'เม็ดฝนฉ่ำเย็น', icon: '🌧️', color: 'bg-sky-100' },
      { id: 'sun', label: 'แสงแดด', icon: '☀️', color: 'bg-yellow-100' },
      { id: 'snow', label: 'หิมะตก', icon: '❄️', color: 'bg-slate-100' },
    ],
    revealedStory: 'ใช่แล้วจ้ะ! ฝนตกเย็นฉ่ำ ช่วยให้ต้นไม้ใบหญ้าสดชื่น',
  },
  // ข้อ 10: กลองชุดเคาะจังหวะ
  {
    id: 'snd-k3-drum',
    grade: 'K3',
    soundType: 'musical',
    soundTitle: 'เสียงดนตรีเคาะจังหวะคึกคัก',
    soundPromptThai: 'ตุ่ม ตุ่ม ต๊ะ! ตุ่ม ตุ่ม โป๊ง! เสียงเครื่องดนตรีชนิดใดตีให้จังหวะเดินแถว?',
    audioPitchPattern: [150, 150, 250, 150, 300],
    correctOptionId: 'drum',
    options: [
      { id: 'drum', label: 'กลองใหญ่ดุริยางค์', icon: '🥁', color: 'bg-red-100' },
      { id: 'flute', label: 'ขลุ่ยเป่า', icon: '🪈', color: 'bg-amber-100' },
      { id: 'piano', label: 'เปียโนกดคีย์', icon: '🎹', color: 'bg-slate-100' },
      { id: 'violin', label: 'ไวโอลินสีสาย', icon: '🎻', color: 'bg-orange-100' },
    ],
    revealedStory: 'ยอดเยี่ยมมาก! กลองใหญ่ให้จังหวะคึกคักในการเดินขบวนพาเหรด',
  },
  ...EXTRA_AUDITORY_QUESTIONS,
];

// Rhythm Pad definition
export interface RhythmPad {
  id: string;
  name: string;
  colorClass: string;
  activeColorClass: string;
  freq: number;
  icon: string;
}

export const RHYTHM_PADS: RhythmPad[] = [
  { id: 'pad-red', name: 'โน้ตแดง (โด)', colorClass: 'bg-red-500 hover:bg-red-600 text-white', activeColorClass: 'bg-red-300 ring-4 ring-white', freq: 523.25, icon: '🔴' },
  { id: 'pad-yellow', name: 'โน้ตเหลือง (เร)', colorClass: 'bg-amber-400 hover:bg-amber-500 text-slate-900', activeColorClass: 'bg-yellow-200 ring-4 ring-white', freq: 587.33, icon: '🟡' },
  { id: 'pad-green', name: 'โน้ตเขียว (มี)', colorClass: 'bg-emerald-500 hover:bg-emerald-600 text-white', activeColorClass: 'bg-emerald-300 ring-4 ring-white', freq: 659.25, icon: '🟢' },
  { id: 'pad-blue', name: 'โน้ตฟ้า (ซอล)', colorClass: 'bg-blue-500 hover:bg-blue-600 text-white', activeColorClass: 'bg-blue-300 ring-4 ring-white', freq: 783.99, icon: '🔵' },
];

// ==========================================
// 5. WHAT'S MISSING? & VISUAL MEMORY (อะไรหายไป? - 10 ข้อ)
// ==========================================
export interface MissingItemGameRound {
  id: string;
  grade: Grade;
  title: string;
  allItemIcons: { id: string; name: string; icon: string }[];
  missingItemId: string;
  options: { id: string; name: string; icon: string }[];
  hint: string;
}

export const WHATS_MISSING_ROUNDS: MissingItemGameRound[] = [
  // ข้อ 1: ของเล่น
  {
    id: 'miss-k1-toys',
    grade: 'K1',
    title: 'ของเล่นบนโต๊ะชิ้นใดหายไป?',
    allItemIcons: [
      { id: 'teddy', name: 'ตุ๊กตาหมี', icon: '🧸' },
      { id: 'car', name: 'รถของเล่น', icon: '🚗' },
      { id: 'ball', name: 'ลูกบอลกลม', icon: '⚽' },
    ],
    missingItemId: 'car',
    options: [
      { id: 'car', name: 'รถของเล่น', icon: '🚗' },
      { id: 'robot', name: 'หุ่นยนต์', icon: '🤖' },
      { id: 'drum', name: 'กลอง', icon: '🥁' },
    ],
    hint: 'ยานพาหนะมีล้อแล่นได้ หายไปจากโต๊ะแล้ว!',
  },
  // ข้อ 2: ผลไม้
  {
    id: 'miss-k1-fruits',
    grade: 'K1',
    title: 'ผลไม้ในจานชิ้นใดหายไป?',
    allItemIcons: [
      { id: 'apple', name: 'แอปเปิ้ลแดง', icon: '🍎' },
      { id: 'banana', name: 'กล้วยหอม', icon: '🍌' },
      { id: 'orange', name: 'ส้มหวาน', icon: '🍊' },
    ],
    missingItemId: 'apple',
    options: [
      { id: 'apple', name: 'แอปเปิ้ลแดง', icon: '🍎' },
      { id: 'grape', name: 'องุ่นม่วง', icon: '🍇' },
      { id: 'watermelon', name: 'แตงโม', icon: '🍉' },
    ],
    hint: 'ผลไม้สีแดงกรอบอร่อย ชิ้นไหนหายไปนะ?',
  },
  // ข้อ 3: เครื่องเขียน
  {
    id: 'miss-k2-stationery',
    grade: 'K2',
    title: 'อุปกรณ์การเรียนชิ้นใดหายไป?',
    allItemIcons: [
      { id: 'pencil', name: 'ดินสอแท่งยาว', icon: '✏️' },
      { id: 'ruler', name: 'ไม้บรรทัด', icon: '📏' },
      { id: 'scissors', name: 'กรรไกรปลายมน', icon: '✂️' },
      { id: 'book', name: 'สมุดบันทึก', icon: '📒' },
    ],
    missingItemId: 'scissors',
    options: [
      { id: 'scissors', name: 'กรรไกรปลายมน', icon: '✂️' },
      { id: 'eraser', name: 'ยางลบ', icon: '🧼' },
      { id: 'sharpener', name: 'กบเหลา', icon: '🖍️' },
      { id: 'palette', name: 'จานสี', icon: '🎨' },
    ],
    hint: 'อุปกรณ์สำหรับตัดกระดาษหายไปจากกล่องดินสอ!',
  },
  // ข้อ 4: สัตว์น่ารัก
  {
    id: 'miss-k2-animals',
    grade: 'K2',
    title: 'สัตว์น้อยน่ารักตัวใดหายไป?',
    allItemIcons: [
      { id: 'bunny', name: 'กระต่าย', icon: '🐰' },
      { id: 'frog', name: 'กบน้อย', icon: '🐸' },
      { id: 'panda', name: 'หมีแพนด้า', icon: '🐼' },
      { id: 'lion', name: 'สิงโตเจ้าป่า', icon: '🦁' },
    ],
    missingItemId: 'panda',
    options: [
      { id: 'tiger', name: 'เสือลายพาดกลอน', icon: '🐯' },
      { id: 'panda', name: 'หมีแพนด้า', icon: '🐼' },
      { id: 'monkey', name: 'ลิงจ๋อ', icon: '🐵' },
      { id: 'koala', name: 'โคอาลา', icon: '🐨' },
    ],
    hint: 'หมีขาวดำชอบกินไผ่ หายไปจากกลุ่มเพื่อน!',
  },
  // ข้อ 5: สำรวจอวกาศ
  {
    id: 'miss-k3-space',
    grade: 'K3',
    title: 'สำรวจอวกาศ: วัตถุใดหายไปจากจอเรดาร์?',
    allItemIcons: [
      { id: 'rocket', name: 'จรวด', icon: '🚀' },
      { id: 'satellite', name: 'ดาวเทียม', icon: '🛰️' },
      { id: 'star', name: 'ดาวฤกษ์สว่าง', icon: '⭐' },
      { id: 'earth', name: 'ดาวโลก', icon: '🌍' },
      { id: 'moon', name: 'ดวงจันทร์', icon: '🌙' },
    ],
    missingItemId: 'satellite',
    options: [
      { id: 'comet', name: 'ดาวหาง', icon: '☄️' },
      { id: 'alien', name: 'เอเลี่ยน', icon: '👽' },
      { id: 'satellite', name: 'ดาวเทียม', icon: '🛰️' },
      { id: 'telescope', name: 'กล้องดูดาว', icon: '🔭' },
    ],
    hint: 'สิ่งประดิษฐ์ส่งสัญญาณวิทยุรอบโลกหายไป!',
  },
  // ข้อ 6: อาหารหลัก 5 หมู่
  {
    id: 'miss-k3-healthy',
    grade: 'K3',
    title: 'อาหารดีมีประโยชน์: อะไรหายไปจากถาดอาหาร?',
    allItemIcons: [
      { id: 'milk', name: 'นมโคสด', icon: '🥛' },
      { id: 'egg', name: 'ไข่ต้มโปรตีน', icon: '🥚' },
      { id: 'carrot', name: 'แครอทวิตามิน', icon: '🥕' },
      { id: 'fish', name: 'ปลาทะเลโอเมก้า', icon: '🐟' },
      { id: 'rice', name: 'ข้าวกล้องหอม', icon: '🍚' },
    ],
    missingItemId: 'milk',
    options: [
      { id: 'milk', name: 'นมโคสดแก้วโต', icon: '🥛' },
      { id: 'candy', name: 'ลูกอม', icon: '🍬' },
      { id: 'soda', name: 'น้ำอัดลม', icon: '🥤' },
      { id: 'cookie', name: 'คุกกี้', icon: '🍪' },
    ],
    hint: 'เครื่องดื่มสีขาวแคลเซียมสูง ช่วยให้กระดูกและฟันแข็งแรง หายไป!',
  },
  // ข้อ 7: ยานพาหนะ
  {
    id: 'miss-k1-vehicles',
    grade: 'K1',
    title: 'ยานพาหนะใดหายไปจากถนน?',
    allItemIcons: [
      { id: 'bus', name: 'รถบัสประจำทาง', icon: '🚌' },
      { id: 'bicycle', name: 'จักรยานสองล้อ', icon: '🚲' },
      { id: 'helicopter', name: 'เฮลิคอปเตอร์', icon: '🚁' },
    ],
    missingItemId: 'bus',
    options: [
      { id: 'bus', name: 'รถบัสประจำทาง', icon: '🚌' },
      { id: 'truck', name: 'รถบรรทุก', icon: '🚚' },
      { id: 'train', name: 'รถไฟ', icon: '🚂' },
    ],
    hint: 'รถคันใหญ่สีเหลืองที่มีคนนั่งได้หลายคนหายไป!',
  },
  // ข้อ 8: แมลงในสวน
  {
    id: 'miss-k2-insects',
    grade: 'K2',
    title: 'แมลงตัวใดบินหายไปจากแปลงดอกไม้?',
    allItemIcons: [
      { id: 'bee', name: 'ผึ้งน้อยหึ่งๆ', icon: '🐝' },
      { id: 'ladybug', name: 'เต่าทองลายจุด', icon: '🐞' },
      { id: 'butterfly', name: 'ผีเสื้อแสนสวย', icon: '🦋' },
      { id: 'ant', name: 'มดขยัน', icon: '🐜' },
    ],
    missingItemId: 'bee',
    options: [
      { id: 'bee', name: 'ผึ้งน้อยหึ่งๆ', icon: '🐝' },
      { id: 'dragonfly', name: 'แมลงปอ', icon: '🪰' },
      { id: 'spider', name: 'แมงมุม', icon: '🕷️' },
      { id: 'worm', name: 'หนอนน้อย', icon: '🐛' },
    ],
    hint: 'แมลงสีเหลืองสลับดำที่ชอบเก็บน้ำหวานเกสรดอกไม้หายไป!',
  },
  // ข้อ 9: เสื้อผ้าเครื่องแต่งกาย
  {
    id: 'miss-k2-clothes',
    grade: 'K2',
    title: 'เครื่องแต่งกายชิ้นใดหายไปจากตู้เสื้อผ้า?',
    allItemIcons: [
      { id: 'hat', name: 'หมวกปีกกว้าง', icon: '👒' },
      { id: 'shirt', name: 'เสื้อเชิ้ต', icon: '👕' },
      { id: 'pants', name: 'กางเกงขายาว', icon: '👖' },
      { id: 'shoes', name: 'รองเท้าผ้าใบ', icon: '👟' },
    ],
    missingItemId: 'hat',
    options: [
      { id: 'hat', name: 'หมวกปีกกว้าง', icon: '👒' },
      { id: 'socks', name: 'ถุงเท้า', icon: '🧦' },
      { id: 'scarf', name: 'ผ้าพันคอ', icon: '🧣' },
      { id: 'glasses', name: 'แว่นตา', icon: '👓' },
    ],
    hint: 'สิ่งที่ใช้สวมใส่บนศีรษะเพื่อกันแดดหายไป!',
  },
  // ข้อ 10: รูปทรงเรขาคณิต
  {
    id: 'miss-k3-shapes',
    grade: 'K3',
    title: 'รูปทรงบล็อกไม้ชิ้นใดหายไปจากกล่อง?',
    allItemIcons: [
      { id: 'star', name: 'ดาวห้าแฉก', icon: '⭐' },
      { id: 'heart', name: 'หัวใจสีแดง', icon: '❤️' },
      { id: 'square', name: 'สี่เหลี่ยมจัตุรัส', icon: '🟦' },
      { id: 'circle', name: 'วงกลมสีทอง', icon: '🟡' },
      { id: 'triangle', name: 'สามเหลี่ยมสีส้ม', icon: '🔺' },
    ],
    missingItemId: 'heart',
    options: [
      { id: 'heart', name: 'หัวใจสีแดง', icon: '❤️' },
      { id: 'diamond', name: 'สี่เหลี่ยมข้าวหลามตัด', icon: '🔷' },
      { id: 'moon', name: 'พระจันทร์เสี้ยว', icon: '🌙' },
      { id: 'cross', name: 'กากบาท', icon: '➕' },
    ],
    hint: 'สัญลักษณ์แห่งความรักความอบอุ่นสีแดงสดหายไป!',
  },
  ...EXTRA_WHATS_MISSING_ROUNDS,
];

// ==========================================
// 6. SOCIAL-EMOTIONAL LEARNING (SEL & EMOTION - 10 ข้อ)
// ==========================================
export interface EmotionCard {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export const EMOTIONS_LIST: EmotionCard[] = [
  { id: 'happy', name: 'ดีใจ / มีความสุข', emoji: '😄', description: 'ยิ้มกว้าง สดใส หัวเราะร่าเริง', color: 'bg-amber-100 border-amber-400 text-amber-900' },
  { id: 'sad', name: 'เศร้า / เสียใจ', emoji: '😢', description: 'น้ำตาซึม หน้าหม่น ต้องการการปลอบโยน', color: 'bg-blue-100 border-blue-400 text-blue-900' },
  { id: 'angry', name: 'โกรธ / หงุดหงิด', emoji: '😡', description: 'คิ้วขมวด หายใจแรง อยากให้คนรับฟัง', color: 'bg-rose-100 border-rose-400 text-rose-900' },
  { id: 'scared', name: 'ตกใจ / กลัว', emoji: '😨', description: 'ตาโต หัวใจเต้นตึกตัก วิ่งไปหาคุณพ่อคุณแม่', color: 'bg-purple-100 border-purple-400 text-purple-900' },
  { id: 'proud', name: 'ภูมิใจ / มั่นใจ', emoji: '🥳', description: 'ทำสิ่งยากสำเร็จด้วยตัวเอง อิ่มเอมใจ', color: 'bg-emerald-100 border-emerald-400 text-emerald-900' },
  { id: 'calm', name: 'สงบ / ผ่อนคลาย', emoji: '😌', description: 'สูดลมหายใจลึกๆ สบายใจและอบอุ่น', color: 'bg-teal-100 border-teal-400 text-teal-900' },
  { id: 'shy', name: 'เขินอาย / ขี้อาย', emoji: '😳', description: 'แก้มแดง ยิ้มเขิน ต้องการกำลังใจและความเข้าใจ', color: 'bg-rose-50 border-rose-300 text-rose-800' },
  { id: 'surprised', name: 'แปลกใจ / ตื่นเต้น', emoji: '😲', description: 'อ้าปากหวอ ตาโต เมื่อเจอสิ่งที่ไม่คาดฝัน', color: 'bg-yellow-50 border-yellow-400 text-yellow-900' },
  { id: 'sleepy', name: 'ง่วงนอน / อ่อนเพลีย', emoji: '🥱', description: 'หาวฟอด ตาปรือ ร่างกายต้องการการพักผ่อน', color: 'bg-indigo-50 border-indigo-300 text-indigo-900' },
  { id: 'loving', name: 'รัก / อบอุ่นใจ', emoji: '🥰', description: 'หัวใจพองโต ยิ้มหวาน ได้รับความรักจากครอบครัว', color: 'bg-pink-100 border-pink-400 text-pink-900' },
  ...EXTRA_EMOTIONS,
];

export interface SocialScenario {
  id: string;
  grade: Grade;
  title: string;
  story: string;
  illustration: string;
  questionPrompt: string;
  options: {
    id: string;
    label: string;
    icon: string;
    isProsocial: boolean;
    feedback: string;
  }[];
}

export const SOCIAL_SCENARIOS: SocialScenario[] = [
{
  "id": "soc-k1-sharing",
  "grade": "K1",
  "title": "ของเล่นชิ้นโปรด",
  "illustration": "🧸🚂",
  "story": "หนูกำลังเล่นรถไฟอยู่ แล้วมีเพื่อนเดินเข้ามาอยากเล่นด้วย",
  "questionPrompt": "หนูควรทำอย่างไรดีเอ่ย?",
  "options": [
    {
      "id": "opt-share",
      "label": "ชวนเพื่อนมาผลัดกันต่อขบวนรถไฟเล่นด้วยกันอย่างสนุกสนาน",
      "icon": "🤝",
      "isProsocial": true,
      "feedback": "ยอดเยี่ยมมาก! การแบ่งปันทำให้เล่นสนุกขึ้น มีเพื่อนรักเพิ่มขึ้นด้วยนะจ๊ะ"
    },
    {
      "id": "opt-hide",
      "label": "กอดรถไฟไว้คนเดียวแน่น ไม่ยอมแบ่งให้เพื่อนร่วมเล่นด้วยเลย",
      "icon": "🙅‍♂️",
      "isProsocial": false,
      "feedback": "ถ้าไม่แบ่งเพื่อน เพื่อนอาจจะเสียใจ ลองผลัดกันเล่นคนละรอบดูนะคนเก่ง"
    }
  ]
},
{
  "id": "soc-k1-bump",
  "grade": "K1",
  "title": "วิ่งสะดุดชนเพื่อน",
  "illustration": "🏃‍♂️💥🏃‍♀️",
  "story": "ขณะวิ่งเล่นในสนาม หนูเผลอสะดุดชนเพื่อนจนเพื่อนล้มลงก้นจ้ำเบ้า",
  "questionPrompt": "คำพูดที่น่ารักที่สุดที่ควรพูดคืออะไร?",
  "options": [
    {
      "id": "opt-run",
      "label": "รีบวิ่งหนีไปแอบหลังต้นไม้ โดยไม่หันกลับมาดูเพื่อนที่ล้มเลย",
      "icon": "🏃",
      "isProsocial": false,
      "feedback": "การวิ่งหนีทำให้เพื่อนเสียใจเพิ่มขึ้น ควรหันมาขอโทษและช่วยเพื่อนนะ"
    },
    {
      "id": "opt-sorry",
      "label": "พูดว่าขอโทษนะเจ็บตรงไหนไหมจ๊ะ แล้วรีบช่วยพยุงเพื่อนลุกขึ้นยืน",
      "icon": "❤️",
      "isProsocial": true,
      "feedback": "หัวใจทองคำมาก! เมื่อทำผิดต้องกล่าวขอโทษและแสดงความห่วงใยเสมอ"
    }
  ]
},
{
  "id": "soc-k2-crying",
  "grade": "K2",
  "title": "เห็นเพื่อนร้องไห้",
  "illustration": "😢👧🎈",
  "story": "ลูกโป่งของเพื่อนหลุดลอยขึ้นฟ้า เพื่อนยืนร้องไห้เสียใจมาก",
  "questionPrompt": "หนูน้อยใจดีควรทำอย่างไร?",
  "options": [
    {
      "id": "opt-comfort",
      "label": "เดินเข้าไปปลอบใจ ยื่นทิชชูให้ และชวนไปเล่นเครื่องเล่นด้วยกัน",
      "icon": "🤗",
      "isProsocial": true,
      "feedback": "น่ารักที่สุดเลย! ความเห็นอกเห็นใจช่วยให้เพื่อนรู้สึกอบอุ่นใจขึ้นมาก"
    },
    {
      "id": "opt-laugh",
      "label": "ยืนชี้นิ้วแล้วหัวเราะเยาะเพื่อนเสียงดัง ล้อเลียนเพื่อนที่ร้องไห้",
      "icon": "😆",
      "isProsocial": false,
      "feedback": "การหัวเราะเวลาเพื่อนเสียใจไม่น่ารักเลยนะลูก ลองเปลี่ยนมาให้กำลังใจเพื่อนแทนนะ"
    }
  ]
},
{
  "id": "soc-k2-line",
  "grade": "K2",
  "title": "ต่อแถวรับขนมและนม",
  "illustration": "🥛🍪🚶‍♂️🚶‍♀️",
  "story": "คุณครูเรียกเข้าแถวรับกล่องนม มีเพื่อนบางคนอยากแซงคิวข้างหน้าหนู",
  "questionPrompt": "ควรแก้ปัญหาอย่างไรด้วยความสุภาพ?",
  "options": [
    {
      "id": "opt-push",
      "label": "ใช้สองมือผลักเพื่อนแรงๆ จนล้ม เพื่อไม่ให้เพื่อนเข้ามาแซงคิว",
      "icon": "🤼",
      "isProsocial": false,
      "feedback": "การใช้ความรุนแรงอาจทำให้เพื่อนบาดเจ็บ ให้ใช้คำพูดหรือบอกคุณครูช่วยดูแลนะ"
    },
    {
      "id": "opt-gentle-remind",
      "label": "บอกเพื่อนด้วยเสียงสุภาพว่า ให้ไปต่อคิวด้านหลังตามลำดับกันนะจ๊ะ",
      "icon": "🗣️",
      "isProsocial": true,
      "feedback": "เก่งมากจ้ะ! การรักษาระเบียบวินัยและพูดอย่างสุภาพคือนักเรียนตัวอย่าง"
    }
  ]
},
{
  "id": "soc-k3-mess",
  "grade": "K3",
  "title": "กล่องสีไม้ของห้องเรียนกระจาย",
  "illustration": "🖍️📦🎨",
  "story": "เพื่อนทำกล่องสีไม้หกหล่นกระจายเต็มพื้นห้องเรียนใกล้เวลาเลิกเรียน",
  "questionPrompt": "หนูควรแสดงน้ำใจอย่างไร?",
  "options": [
    {
      "id": "opt-help-clean",
      "label": "เข้าไปช่วยกันเก็บแท่งสีใส่กล่อง จัดแยกสีให้เป็นระเบียบเรียบร้อย",
      "icon": "🧹",
      "isProsocial": true,
      "feedback": "สุดยอดน้ำใจจิตอาสา! ช่วยกันแป๊บเดียวห้องเรียนก็สะอาดน่าอยู่แล้ว"
    },
    {
      "id": "opt-ignore",
      "label": "เดินข้ามแท่งสีไปเฉยๆ พูดบอกว่าไม่ใช่สีของเรา จึงไม่จำเป็นต้องช่วย",
      "icon": "🚶",
      "isProsocial": false,
      "feedback": "แม้ไม่ใช่ของหนูคนเดียว แต่การมีน้ำใจช่วยเหลือกันในห้องเรียนคือสิ่งดีงามนะ"
    }
  ]
},
{
  "id": "soc-k3-losing",
  "grade": "K3",
  "title": "แข่งวิ่งผลัดแพ้",
  "illustration": "🏃🏅🏁",
  "story": "ในการแข่งขันวิ่งผลัดกีฬาสี ทีมของหนูเข้าเส้นชัยเป็นอันดับที่สอง",
  "questionPrompt": "น้ำใจนักกีฬาที่แท้จริงคืออะไร?",
  "options": [
    {
      "id": "opt-throw-tantrum",
      "label": "ร้องไห้โวยวาย โทษเพื่อนในทีม และขว้างขวดน้ำทิ้งลงกับพื้นสนาม",
      "icon": "😤",
      "isProsocial": false,
      "feedback": "การแพ้ชนะเป็นเรื่องธรรมดา การควบคุมอารมณ์และให้กำลังใจเพื่อนสำคัญกว่ามาก"
    },
    {
      "id": "opt-sportsmanship",
      "label": "ปรบมือแสดงความยินดีกับทีมชนะ และภูมิใจที่พวกเราวิ่งเต็มที่แล้ว",
      "icon": "👏",
      "isProsocial": true,
      "feedback": "นี่คือหัวใจนักกีฬาตัวจริง! รู้แพ้ รู้ชนะ รู้อภัย มิตรภาพสำคัญที่สุด"
    }
  ]
},
{
  "id": "soc-k1-newfriend",
  "grade": "K1",
  "title": "เพื่อนใหม่ย้ายเข้ามา",
  "illustration": "👋🧒🎒",
  "story": "มีเพื่อนใหม่ย้ายเข้ามาในห้อง ยืนเขินอายอยู่คนเดียวข้างประตู",
  "questionPrompt": "หนูควรทำอย่างไรให้เพื่อนอบอุ่นใจ?",
  "options": [
    {
      "id": "opt-welcome",
      "label": "ยิ้มทักทาย แนะนำชื่อตัวเอง และชวนเพื่อนใหม่มานั่งเล่นด้วยกัน",
      "icon": "🌟",
      "isProsocial": true,
      "feedback": "เก่งมากจ้า! รอยยิ้มและการต้อนรับที่อบอุ่นจะช่วยให้เพื่อนใหม่คลายความกังวล"
    },
    {
      "id": "opt-stare",
      "label": "ยืนจ้องหน้าด้วยสายตาดุ แล้วหันไปกระซิบชวนคนอื่นไม่ให้คุยด้วย",
      "icon": "👀",
      "isProsocial": false,
      "feedback": "การจ้องหรือกระซิบอาจทำให้เพื่อนใหม่รู้สึกกลัว ให้ยิ้มทักทายดีกว่านะ"
    }
  ]
},
{
  "id": "soc-k2-elder",
  "grade": "K2",
  "title": "คุณยายถือของหนัก",
  "illustration": "👵🛍️🚪",
  "story": "เห็นคุณยายหรือคุณครูถือถุงของหนักกำลังจะเดินผ่านประตู",
  "questionPrompt": "หนูน้อยคนเก่งควรช่วยเหลืออย่างไร?",
  "options": [
    {
      "id": "opt-rush-first",
      "label": "รีบวิ่งแซงตัดหน้าเข้าไปก่อน โดยปล่อยให้คุณยายเดินถือของลำบาก",
      "icon": "🏃",
      "isProsocial": false,
      "feedback": "การวิ่งตัดหน้าอาจทำให้เกิดอุบัติเหตุได้ ควรหลีกทางให้ผู้ใหญ่เสมอนะ"
    },
    {
      "id": "opt-open-door",
      "label": "รีบวิ่งไปเปิดประตูค้างไว้ให้ และถามคุณยายว่ามีอะไรให้ช่วยถือไหม",
      "icon": "🚪",
      "isProsocial": true,
      "feedback": "ช่างมีน้ำใจงดงามมาก! การช่วยเปิดประตูแสดงถึงความกตัญญูและมารยาทที่ดี"
    }
  ]
},
{
  "id": "soc-k3-anger",
  "grade": "K3",
  "title": "เมื่อรู้สึกโกรธหรือหงุดหงิด",
  "illustration": "😤🧘‍♀️💨",
  "story": "เพื่อนแย่งบล็อกไม้ชิ้นที่หนูกำลังจะต่อ ทำให้หนูรู้สึกโกรธมากจนหน้าแดง",
  "questionPrompt": "วิธีจัดการความโกรธที่ดีและปลอดภัยคืออะไร?",
  "options": [
    {
      "id": "opt-breathe",
      "label": "สูดหายใจเข้าลึกๆ นับ 1 ถึง 5 ช้าๆ แล้วพูดบอกความรู้สึกดีๆ",
      "icon": "🌬️",
      "isProsocial": true,
      "feedback": "ฉลาดทางอารมณ์มาก! การหายใจลึกๆ ช่วยให้สมองสงบลงและแก้ปัญหาได้ดีที่สุด"
    },
    {
      "id": "opt-hit",
      "label": "กรีดร้องเสียงดังโวยวาย แล้วใช้สองมือทุบพังบล็อกไม้ทั้งหมดทิ้ง",
      "icon": "💥",
      "isProsocial": false,
      "feedback": "การทำลายข้าวของไม่ได้ช่วยแก้ปัญหา ลองหยุดพักหายใจเข้าลึกๆ ดูก่อนนะ"
    }
  ]
},
{
  "id": "soc-k2-trash",
  "grade": "K2",
  "title": "ขยะตกอยู่บนพื้นห้อง",
  "illustration": "🧃🗑️✨",
  "story": "หนูเห็นกล่องนมเปล่าและเศษกระดาษตกอยู่ใต้โต๊ะในห้องเรียน",
  "questionPrompt": "หนูควรทำอย่างไรให้ห้องเรียนสะอาด?",
  "options": [
    {
      "id": "opt-kick-trash",
      "label": "แกล้งเตะกล่องนมและเศษกระดาษ ไปไว้ใต้โต๊ะเรียนของเพื่อนคนอื่น",
      "icon": "👞",
      "isProsocial": false,
      "feedback": "การเตะขยะไปให้คนอื่นทำให้ห้องเรียนสกปรก ช่วยกันทิ้งลงถังขยะถูกต้องที่สุดนะ"
    },
    {
      "id": "opt-throw-trash",
      "label": "ก้มลงเก็บกล่องนมและเศษกระดาษ นำไปทิ้งในถังขยะให้เรียบร้อย",
      "icon": "🗑️",
      "isProsocial": true,
      "feedback": "จิตสาธารณะยอดเยี่ยม! ห้องเรียนของเราจะสะอาดน่าอยู่เมื่อทุกคนช่วยกันดูแล"
    }
  ]
},
  ...EXTRA_SOCIAL_SCENARIOS,
];

// ==========================================
// 7. BALANCE & PRE-MATH SCALE (ตราชั่งปริศนา - 10 ข้อ)
// ==========================================
export interface BalanceItemWeight {
  id: string;
  name: string;
  icon: string;
  weight: number; // relative weight unit
}

export interface BalanceScaleQuestion {
  id: string;
  grade: Grade;
  title: string;
  prompt: string;
  leftPan: { item: BalanceItemWeight; count: number };
  rightPan: { item: BalanceItemWeight; count: number };
  targetQuestion: 'heavier' | 'lighter' | 'equal';
  options: {
    id: 'left' | 'right' | 'equal';
    label: string;
    icon: string;
  }[];
  explanation: string;
}

export const BALANCE_QUESTIONS: BalanceScaleQuestion[] = [
  // ข้อ 1: ช้าง vs หนู
  {
    id: 'bal-k1-elephant-mouse',
    grade: 'K1',
    title: 'สัตว์ตัวใดหนักกว่า?',
    prompt: 'ดูตราชั่งที่เอียงลง ฝั่งไหนหนักกว่ากันนะ?',
    leftPan: { item: { id: 'elephant', name: 'คุณช้างตัวโต', icon: '🐘', weight: 10 }, count: 1 },
    rightPan: { item: { id: 'mouse', name: 'หนูน้อย', icon: '🐭', weight: 1 }, count: 1 },
    targetQuestion: 'heavier',
    options: [
      { id: 'left', label: 'ฝั่งซ้าย (ช้าง)', icon: '🐘' },
      { id: 'right', label: 'ฝั่งขวา (หนู)', icon: '🐭' },
    ],
    explanation: 'คุณช้างตัวโตกว่า หนักกว่ามาก ตราชั่งฝั่งช้างจึงกดเอียงลงล่างสุดเลย!',
  },
  // ข้อ 2: แตงโม vs สตรอว์เบอร์รี
  {
    id: 'bal-k1-watermelon-strawberry',
    grade: 'K1',
    title: 'ผลไม้ชนิดใดเบากว่า?',
    prompt: 'ตราชั่งฝั่งที่ลอยสูงขึ้น คือผลไม้ที่เบากว่า ชนิดใดเอ่ย?',
    leftPan: { item: { id: 'watermelon', name: 'แตงโมลูกโต', icon: '🍉', weight: 8 }, count: 1 },
    rightPan: { item: { id: 'strawberry', name: 'สตรอว์เบอร์รี', icon: '🍓', weight: 1 }, count: 1 },
    targetQuestion: 'lighter',
    options: [
      { id: 'left', label: 'ฝั่งซ้าย (แตงโม)', icon: '🍉' },
      { id: 'right', label: 'ฝั่งขวา (สตรอว์เบอร์รี)', icon: '🍓' },
    ],
    explanation: 'สตรอว์เบอร์รีลูกเล็ก น้ำหนักเบากว่า จึงลอยสูงขึ้นด้านบน!',
  },
  // ข้อ 3: นับจำนวนแอปเปิ้ล
  {
    id: 'bal-k2-apples-count',
    grade: 'K2',
    title: 'แอปเปิ้ลฝั่งไหนหนักกว่า?',
    prompt: 'นับจำนวนแอปเปิ้ล ฝั่งไหนมีน้ำหนักมากกว่ากัน?',
    leftPan: { item: { id: 'apple', name: 'แอปเปิ้ล', icon: '🍎', weight: 2 }, count: 4 },
    rightPan: { item: { id: 'apple', name: 'แอปเปิ้ล', icon: '🍎', weight: 2 }, count: 2 },
    targetQuestion: 'heavier',
    options: [
      { id: 'left', label: 'ฝั่งซ้าย (มี 4 ผล)', icon: '🍎🍎🍎🍎' },
      { id: 'right', label: 'ฝั่งขวา (มี 2 ผล)', icon: '🍎🍎' },
    ],
    explanation: 'แอปเปิ้ล 4 ผล หนักกว่า 2 ผล ตราชั่งจึงเอียงลงทางซ้าย!',
  },
  // ข้อ 4: ตราชั่งสมดุล ส้ม vs กล้วย
  {
    id: 'bal-k2-balance-equal',
    grade: 'K2',
    title: 'ตราชั่งสมดุลหรือไม่?',
    prompt: 'ส้ม 2 ผล หนักเท่ากับ กล้วย 2 หวี ตราชั่งอยู่ในระดับเท่ากันหรือไม่?',
    leftPan: { item: { id: 'orange', name: 'ส้มผลใหญ่', icon: '🍊', weight: 3 }, count: 2 },
    rightPan: { item: { id: 'banana', name: 'กล้วยสุก', icon: '🍌', weight: 3 }, count: 2 },
    targetQuestion: 'equal',
    options: [
      { id: 'equal', label: 'สมดุลเท่ากันพอดี ⚖️', icon: '⚖️' },
      { id: 'left', label: 'ฝั่งซ้ายหนักกว่า', icon: '🍊' },
      { id: 'right', label: 'ฝั่งขวาหนักกว่า', icon: '🍌' },
    ],
    explanation: 'น้ำหนักเท่ากันพอดี ตราชั่งจึงตรงเสมอกัน ไม่เอียงไปข้างใดข้างหนึ่ง!',
  },
  // ข้อ 5: ถุงทอง vs เหรียญทอง
  {
    id: 'bal-k3-gold-bars',
    grade: 'K3',
    title: 'ถุงทองปริศนา',
    prompt: 'ถุงทองใบใหญ่ 1 ถุง (น้ำหนัก 6) กับเหรียญทอง 6 เหรียญ (เหรียญละ 1) สิ่งใดหนักกว่า?',
    leftPan: { item: { id: 'gold-bag', name: 'ถุงทองคำ', icon: '💰', weight: 6 }, count: 1 },
    rightPan: { item: { id: 'coin', name: 'เหรียญทอง', icon: '🪙', weight: 1 }, count: 6 },
    targetQuestion: 'equal',
    options: [
      { id: 'equal', label: 'หนักเท่ากันพอดี (สมดุล ⚖️)', icon: '⚖️' },
      { id: 'left', label: 'ถุงทองคำหนักกว่า', icon: '💰' },
      { id: 'right', label: 'เหรียญทอง 6 เหรียญหนักกว่า', icon: '🪙' },
    ],
    explanation: 'แม้รูปร่างต่างกัน แต่มีน้ำหนักรวม 6 เท่ากัน ตราชั่งจึงสมดุล!',
  },
  // ข้อ 6: หนังสือ vs ดินสอ
  {
    id: 'bal-k3-book-pens',
    grade: 'K3',
    title: 'หนังสือนิทานกับกล่องดินสอ',
    prompt: 'หนังสือนิทานเล่มหนา 1 เล่ม (หนัก 8) กับ ดินสอ 3 แท่ง (แท่งละ 1) ฝั่งไหนเบากว่า?',
    leftPan: { item: { id: 'book', name: 'หนังสือนิทาน', icon: '📚', weight: 8 }, count: 1 },
    rightPan: { item: { id: 'pencil', name: 'ดินสอ', icon: '✏️', weight: 1 }, count: 3 },
    targetQuestion: 'lighter',
    options: [
      { id: 'right', label: 'ฝั่งขวา (ดินสอ 3 แท่ง)', icon: '✏️✏️✏️' },
      { id: 'left', label: 'ฝั่งซ้าย (หนังสือนิทาน)', icon: '📚' },
    ],
    explanation: 'ดินสอ 3 แท่ง รวมกันหนัก 3 เบากว่าหนังสือนิทานที่หนัก 8 จึงลอยขึ้นสูงกว่า!',
  },
  // ข้อ 7: ฟักทอง vs มะเขือเทศ
  {
    id: 'bal-k1-pumpkin-tomato',
    grade: 'K1',
    title: 'ฟักทองยักษ์กับมะเขือเทศลูกจิ๋ว',
    prompt: 'ผักชนิดใดมีน้ำหนักมากกว่ากัน?',
    leftPan: { item: { id: 'pumpkin', name: 'ฟักทองผลโต', icon: '🎃', weight: 9 }, count: 1 },
    rightPan: { item: { id: 'tomato', name: 'มะเขือเทศ', icon: '🍅', weight: 1 }, count: 1 },
    targetQuestion: 'heavier',
    options: [
      { id: 'left', label: 'ฝั่งซ้าย (ฟักทอง)', icon: '🎃' },
      { id: 'right', label: 'ฝั่งขวา (มะเขือเทศ)', icon: '🍅' },
    ],
    explanation: 'ฟักทองผลโตแน่น หนักกว่ามะเขือเทศลูกเล็ก ตราชั่งจึงกดเอียงลง!',
  },
  // ข้อ 8: ก้อนอิฐ vs ขนนก
  {
    id: 'bal-k2-brick-feather',
    grade: 'K2',
    title: 'ก้อนอิฐกับขนนก',
    prompt: 'สิ่งใดมีน้ำหนักเบากว่ากัน ลอยขึ้นสูง?',
    leftPan: { item: { id: 'brick', name: 'ก้อนอิฐก่อสร้าง', icon: '🧱', weight: 10 }, count: 1 },
    rightPan: { item: { id: 'feather', name: 'ขนนกฟูฟ่อง', icon: '🪶', weight: 1 }, count: 1 },
    targetQuestion: 'lighter',
    options: [
      { id: 'right', label: 'ฝั่งขวา (ขนนก)', icon: '🪶' },
      { id: 'left', label: 'ฝั่งซ้าย (ก้อนอิฐ)', icon: '🧱' },
    ],
    explanation: 'ขนนกเบาหวิว ปลิวลอยลมได้ น้ำหนักเบากว่าก้อนอิฐมาก!',
  },
  // ข้อ 9: ลูกโบว์ลิ่ง vs ลูกโป่ง
  {
    id: 'bal-k2-bowling-balloon',
    grade: 'K2',
    title: 'ลูกโบว์ลิ่งกับลูกโป่งสวรรค์',
    prompt: 'ลูกกลมชนิดใดหนักกว่ากัน?',
    leftPan: { item: { id: 'bowling', name: 'ลูกโบว์ลิ่ง', icon: '🎳', weight: 10 }, count: 1 },
    rightPan: { item: { id: 'balloon', name: 'ลูกโป่ง', icon: '🎈', weight: 1 }, count: 1 },
    targetQuestion: 'heavier',
    options: [
      { id: 'left', label: 'ฝั่งซ้าย (ลูกโบว์ลิ่ง)', icon: '🎳' },
      { id: 'right', label: 'ฝั่งขวา (ลูกโป่ง)', icon: '🎈' },
    ],
    explanation: 'ลูกโบว์ลิ่งทำจากของแข็ง มีน้ำหนักมาก ส่วนลูกโป่งมีก๊าซเบาๆ อยู่ข้างใน!',
  },
  // ข้อ 10: เค้กปอนด์ใหญ่ vs คัพเค้ก 2 ชิ้น
  {
    id: 'bal-k3-cake-cupcakes',
    grade: 'K3',
    title: 'เค้กวันเกิดก้อนโตกับคัพเค้ก',
    prompt: 'เค้กก้อนโต 1 ก้อน (หนัก 6) กับ คัพเค้ก 2 ชิ้น (ชิ้นละ 3) ตราชั่งเป็นอย่างไร?',
    leftPan: { item: { id: 'big-cake', name: 'เค้กปอนด์ใหญ่', icon: '🎂', weight: 6 }, count: 1 },
    rightPan: { item: { id: 'cupcake', name: 'คัพเค้ก', icon: '🧁', weight: 3 }, count: 2 },
    targetQuestion: 'equal',
    options: [
      { id: 'equal', label: 'สมดุลเท่ากันพอดี ⚖️', icon: '⚖️' },
      { id: 'left', label: 'เค้กก้อนโตหนักกว่า', icon: '🎂' },
      { id: 'right', label: 'คัพเค้ก 2 ชิ้นหนักกว่า', icon: '🧁🧁' },
    ],
    explanation: 'เค้กใหญ่หนัก 6 เท่ากับ คัพเค้ก 2 ชิ้น (3+3=6) พอดี ตราชั่งจึงสมดุลเสมอกัน!',
  },
  ...EXTRA_BALANCE_QUESTIONS,
];
