import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Grade } from '../../types';
import { soundEffects, speakText } from '../../services/audioService';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import { HandTracingActivityView } from './HandTracingActivityView';
import { ThaiHandwritingView } from './ThaiHandwritingView';
import confetti from 'canvas-confetti';
import {
  Compass,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Hand,
  Volume2,
} from 'lucide-react';

interface FineMotorTracingViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

interface Waypoint {
  order: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
}

interface TracingLevel {
  id: string;
  grade: Grade;
  levelNumber: number;
  title: string;
  characterEmoji: string;
  characterName: string;
  goalEmoji: string;
  goalName: string;
  pathDescription: string;
  voicePrompt: string;
  pathType: 'straight' | 'zigzag' | 'wave' | 'spiral' | 'loop';
  waypoints: Waypoint[];
}

const TRACING_LEVELS: TracingLevel[] = [
  // ================= K1 (อ.1) - 20 ด่าน: เส้นตรง เส้นเฉียง เส้นโค้งสั้น 3-5 จุด =================
  {
    id: 'k1-1',
    grade: 'K1',
    levelNumber: 1,
    title: 'ด่าน 1: ลูกเจี๊ยบเดินกลับเล้าไก่',
    characterEmoji: '🐥',
    characterName: 'ลูกเจี๊ยบ',
    goalEmoji: '🏡',
    goalName: 'เล้าไก่อบอุ่น',
    pathDescription: 'ลากเส้นตรงแนวนอน พาลูกเจี๊ยบเดินข้ามสะพาน',
    voicePrompt: 'แตะเรียงจุด 1 2 3 เพื่อพาลูกเจี๊ยบเดินกลับบ้านนะจ๊ะ',
    pathType: 'straight',
    waypoints: [
      { order: 1, x: 15, y: 50, label: '1' },
      { order: 2, x: 45, y: 50, label: '2' },
      { order: 3, x: 80, y: 50, label: '3' },
    ],
  },
  {
    id: 'k1-2',
    grade: 'K1',
    levelNumber: 2,
    title: 'ด่าน 2: ผึ้งน้อยบินขึ้นเนินเขา',
    characterEmoji: '🐝',
    characterName: 'ผึ้งน้อย',
    goalEmoji: '🌻',
    goalName: 'ดอกทานตะวัน',
    pathDescription: 'บินเฉียงขึ้นไปเก็บน้ำหวานเกสรดอกไม้',
    voicePrompt: 'แตะเรียงหมายเลข 1 2 3 4 พาผึ้งน้อยบินขึ้นไปหาดอกไม้จ้า',
    pathType: 'straight',
    waypoints: [
      { order: 1, x: 15, y: 75, label: '1' },
      { order: 2, x: 35, y: 55, label: '2' },
      { order: 3, x: 60, y: 35, label: '3' },
      { order: 4, x: 82, y: 20, label: '4' },
    ],
  },
  {
    id: 'k1-3',
    grade: 'K1',
    levelNumber: 3,
    title: 'ด่าน 3: มดน้อยขนน้ำตาลกลับรัง',
    characterEmoji: '🐜',
    characterName: 'มดน้อยจอมขยัน',
    goalEmoji: '🕳️',
    goalName: 'รังมดใต้ดิน',
    pathDescription: 'ลากเส้นตรงแนวนอน นำขบวนมดขนอาหาร',
    voicePrompt: 'แตะเรียงจุด 1 2 3 4 พามดน้อยขนน้ำตาลเข้าสู่รังนะจ๊ะ',
    pathType: 'straight',
    waypoints: [
      { order: 1, x: 12, y: 40, label: '1' },
      { order: 2, x: 36, y: 40, label: '2' },
      { order: 3, x: 60, y: 40, label: '3' },
      { order: 4, x: 84, y: 40, label: '4' },
    ],
  },
  {
    id: 'k1-4',
    grade: 'K1',
    levelNumber: 4,
    title: 'ด่าน 4: เต่าน้อยคลานลงทะเล',
    characterEmoji: '🐢',
    characterName: 'เต่าน้อย',
    goalEmoji: '🌊',
    goalName: 'น้ำทะเลใส',
    pathDescription: 'คลานเฉียงลงหาดทรายอย่างนุ่มนวล',
    voicePrompt: 'แตะ 1 2 3 4 พาเต่าน้อยคลานลงทะเลสีครามจ้า',
    pathType: 'straight',
    waypoints: [
      { order: 1, x: 15, y: 25, label: '1' },
      { order: 2, x: 38, y: 45, label: '2' },
      { order: 3, x: 62, y: 65, label: '3' },
      { order: 4, x: 85, y: 80, label: '4' },
    ],
  },
  {
    id: 'k1-5',
    grade: 'K1',
    levelNumber: 5,
    title: 'ด่าน 5: ลูกหมากระดิกหางหาชามข้าว',
    characterEmoji: '🐶',
    characterName: 'ลูกหมาด่าง',
    goalEmoji: '🥣',
    goalName: 'ชามข้าวแสนอร่อย',
    pathDescription: 'วิ่งซิกแซกเบาๆ หลบของเล่นในบ้าน',
    voicePrompt: 'แตะเรียงจุด 1 2 3 4 พาลูกหมาวิ่งไปหาชามข้าวกันเถอะ',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 15, y: 55, label: '1' },
      { order: 2, x: 38, y: 30, label: '2' },
      { order: 3, x: 62, y: 70, label: '3' },
      { order: 4, x: 85, y: 45, label: '4' },
    ],
  },
  {
    id: 'k1-6',
    grade: 'K1',
    levelNumber: 6,
    title: 'ด่าน 6: แมวน้อยวิ่งไล่ไหมพรม',
    characterEmoji: '🐱',
    characterName: 'แมวส้ม',
    goalEmoji: '🧶',
    goalName: 'ม้วนไหมพรมสีแดง',
    pathDescription: 'วิ่งโค้งเป็นรูปคลื่นน้อยๆ ตามลูกไหมพรม',
    voicePrompt: 'แตะ 1 2 3 4 ตามเส้นโค้ง พาเจ้าเหมียวไล่จับลูกบอลไหมพรมจ้า',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 14, y: 65, label: '1' },
      { order: 2, x: 36, y: 35, label: '2' },
      { order: 3, x: 60, y: 65, label: '3' },
      { order: 4, x: 84, y: 35, label: '4' },
    ],
  },
  {
    id: 'k1-7',
    grade: 'K1',
    levelNumber: 7,
    title: 'ด่าน 7: ผีเสื้อดอมดมดอกไม้',
    characterEmoji: '🦋',
    characterName: 'ผีเสื้อแสนสวย',
    goalEmoji: '🌺',
    goalName: 'ดอกชบาสีแดง',
    pathDescription: 'บินโบกปีกขึ้นลงเป็นคลื่นสวยงาม',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 4 พาผีเสื้อบินไปเกาะดอกชบานะจ๊ะ',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 15, y: 40, label: '1' },
      { order: 2, x: 38, y: 65, label: '2' },
      { order: 3, x: 62, y: 35, label: '3' },
      { order: 4, x: 85, y: 60, label: '4' },
    ],
  },
  {
    id: 'k1-8',
    grade: 'K1',
    levelNumber: 8,
    title: 'ด่าน 8: รถตุ๊กตุ๊กแล่นข้ามสะพาน',
    characterEmoji: '🛺',
    characterName: 'รถตุ๊กตุ๊ก',
    goalEmoji: '🏛️',
    goalName: 'วัดพระแก้ว',
    pathDescription: 'แล่นตรงบนสะพานคอนกรีตยาว',
    voicePrompt: 'แตะเรียงหมายเลข 1 2 3 4 ขับรถตุ๊กตุ๊กตรงข้ามสะพานไปเลยจ้า',
    pathType: 'straight',
    waypoints: [
      { order: 1, x: 12, y: 52, label: '1' },
      { order: 2, x: 36, y: 52, label: '2' },
      { order: 3, x: 60, y: 52, label: '3' },
      { order: 4, x: 84, y: 52, label: '4' },
    ],
  },
  {
    id: 'k1-9',
    grade: 'K1',
    levelNumber: 9,
    title: 'ด่าน 9: นกนางนวลร่อนลงเกาะเรือ',
    characterEmoji: '🕊️',
    characterName: 'นกนางนวล',
    goalEmoji: '🚢',
    goalName: 'เรือเดินสมุทร',
    pathDescription: 'ร่อนลงจากท้องฟ้าเฉียงลงสู่ดาดฟ้าเรือ',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 4 พานกนางนวลร่อนลงเกาะเสากระโดงเรือจ้า',
    pathType: 'straight',
    waypoints: [
      { order: 1, x: 15, y: 20, label: '1' },
      { order: 2, x: 38, y: 40, label: '2' },
      { order: 3, x: 62, y: 60, label: '3' },
      { order: 4, x: 85, y: 75, label: '4' },
    ],
  },
  {
    id: 'k1-10',
    grade: 'K1',
    levelNumber: 10,
    title: 'ด่าน 10: ปลาทองว่ายน้ำไปกินอาหาร',
    characterEmoji: '🐠',
    characterName: 'ปลาทองตัวกลม',
    goalEmoji: '🌿',
    goalName: 'สาหร่ายหางกระรอก',
    pathDescription: 'ว่ายลอยคอตามรอยคลื่นฟองน้ำ',
    voicePrompt: 'แตะ 1 2 3 4 พาปลาทองว่ายดุ๊กดิ๊กไปกินอาหารจ้า',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 14, y: 50, label: '1' },
      { order: 2, x: 37, y: 70, label: '2' },
      { order: 3, x: 61, y: 30, label: '3' },
      { order: 4, x: 84, y: 55, label: '4' },
    ],
  },
  {
    id: 'k1-11',
    grade: 'K1',
    levelNumber: 11,
    title: 'ด่าน 11: กบเขียวกระโดดขึ้นใบบัว',
    characterEmoji: '🐸',
    characterName: 'กบเขียว',
    goalEmoji: '🪷',
    goalName: 'ดอกบัวสีชมพู',
    pathDescription: 'กระโดดเด้งขึ้นเด้งลงแบบซิกแซก',
    voicePrompt: 'แตะ 1 2 3 4 พากบน้อยกระโดด อ๊บ อ๊บ ไปนั่งบนใบบัวนะจ๊ะ',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 15, y: 65, label: '1' },
      { order: 2, x: 38, y: 25, label: '2' },
      { order: 3, x: 62, y: 65, label: '3' },
      { order: 4, x: 85, y: 30, label: '4' },
    ],
  },
  {
    id: 'k1-12',
    grade: 'K1',
    levelNumber: 12,
    title: 'ด่าน 12: ยีราฟคอยื่นกินยอดไม้',
    characterEmoji: '🦒',
    characterName: 'พี่ยีราฟ',
    goalEmoji: '🌳',
    goalName: 'ยอดไม้อ่อน',
    pathDescription: 'ลากเส้นเฉียงขึ้นสู่ยอดไม้เขียวชอุ่ม',
    voicePrompt: 'แตะ 1 2 3 4 พายีราฟยืดคอยาวกินใบไม้อร่อยจ้า',
    pathType: 'straight',
    waypoints: [
      { order: 1, x: 18, y: 80, label: '1' },
      { order: 2, x: 40, y: 60, label: '2' },
      { order: 3, x: 62, y: 40, label: '3' },
      { order: 4, x: 82, y: 20, label: '4' },
    ],
  },
  {
    id: 'k1-13',
    grade: 'K1',
    levelNumber: 13,
    title: 'ด่าน 13: หอยทากไต่ใบตอง',
    characterEmoji: '🐌',
    characterName: 'หอยทากน้อย',
    goalEmoji: '🥬',
    goalName: 'ผักกาดหอม',
    pathDescription: 'คลานกระดึ๊บเป็นเส้นตรงแนวนอน',
    voicePrompt: 'แตะเรียง 1 ถึง 4 พาหอยทากน้อยคลานอย่างใจเย็นไปหาผักกาดจ้า',
    pathType: 'straight',
    waypoints: [
      { order: 1, x: 14, y: 48, label: '1' },
      { order: 2, x: 38, y: 48, label: '2' },
      { order: 3, x: 62, y: 48, label: '3' },
      { order: 4, x: 85, y: 48, label: '4' },
    ],
  },
  {
    id: 'k1-14',
    grade: 'K1',
    levelNumber: 14,
    title: 'ด่าน 14: กระรอกน้อยเก็บลูกโอ๊ก',
    characterEmoji: '🐿️',
    characterName: 'กระรอกแก้มตุ่ย',
    goalEmoji: '🌰',
    goalName: 'ผลลูกโอ๊กสีน้ำตาล',
    pathDescription: 'วิ่งไต่กิ่งไม้ขึ้นลงเป็นคลื่นสวยงาม',
    voicePrompt: 'แตะจุด 1 2 3 4 พากระรอกน้อยวิ่งไปเก็บลูกโอ๊กแสนอร่อย',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 15, y: 35, label: '1' },
      { order: 2, x: 38, y: 65, label: '2' },
      { order: 3, x: 62, y: 30, label: '3' },
      { order: 4, x: 85, y: 55, label: '4' },
    ],
  },
  {
    id: 'k1-15',
    grade: 'K1',
    levelNumber: 15,
    title: 'ด่าน 15: ช้างน้อยเดินเล่นริมแม่น้ำ',
    characterEmoji: '🐘',
    characterName: 'ช้างน้อยชูก้าน',
    goalEmoji: '🌴',
    goalName: 'ดงกล้วยหอม',
    pathDescription: 'เดินซิกแซกผ่านป่าไผ่ไปดงกล้วย',
    voicePrompt: 'แตะเรียงหมายเลข 1 ถึง 4 พาช้างน้อยเดินข้ามเนินทรายนะจ๊ะ',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 14, y: 60, label: '1' },
      { order: 2, x: 36, y: 30, label: '2' },
      { order: 3, x: 62, y: 68, label: '3' },
      { order: 4, x: 86, y: 40, label: '4' },
    ],
  },
  {
    id: 'k1-16',
    grade: 'K1',
    levelNumber: 16,
    title: 'ด่าน 16: นกฮูกบินกลับโพรงไม้',
    characterEmoji: '🦉',
    characterName: 'นกฮูกตาโต',
    goalEmoji: '🌲',
    goalName: 'โพรงต้นสนใหญ่',
    pathDescription: 'บินร่อนข้ามทิวไม้ในคืนพระจันทร์เต็มดวง',
    voicePrompt: 'แตะเรียงจุด 1 2 3 4 พานกฮูกบินกลับรังนอนอย่างปลอดภัย',
    pathType: 'straight',
    waypoints: [
      { order: 1, x: 15, y: 70, label: '1' },
      { order: 2, x: 38, y: 50, label: '2' },
      { order: 3, x: 62, y: 35, label: '3' },
      { order: 4, x: 85, y: 25, label: '4' },
    ],
  },
  {
    id: 'k1-17',
    grade: 'K1',
    levelNumber: 17,
    title: 'ด่าน 17: เป็ดน้อยว่ายข้ามสระน้ำ',
    characterEmoji: '🦆',
    characterName: 'เป็ดน้อยก้าบๆ',
    goalEmoji: '🌾',
    goalName: 'กอหญ้าริมน้ำ',
    pathDescription: 'ลากเส้นคลื่นน้ำ 5 จุดเบาๆ ท่องแม่น้ำ',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 5 พาเป็ดน้อยว่ายน้ำข้ามฟากอย่างสนุกสนาน',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 12, y: 55, label: '1' },
      { order: 2, x: 30, y: 35, label: '2' },
      { order: 3, x: 50, y: 65, label: '3' },
      { order: 4, x: 70, y: 35, label: '4' },
      { order: 5, x: 88, y: 55, label: '5' },
    ],
  },
  {
    id: 'k1-18',
    grade: 'K1',
    levelNumber: 18,
    title: 'ด่าน 18: กระต่ายกระโดดหาโพรงหญ้า',
    characterEmoji: '🐰',
    characterName: 'กระต่ายหูยาว',
    goalEmoji: '🛖',
    goalName: 'บ้านโพรงดิน',
    pathDescription: 'กระโดดซิกแซก 5 จุดข้ามก้อนหิน',
    voicePrompt: 'แตะ 1 ถึง 5 พากระต่ายกระโดดดึ๋งๆ กลับสู่โพรงบ้านนะจ๊ะ',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 12, y: 60, label: '1' },
      { order: 2, x: 30, y: 30, label: '2' },
      { order: 3, x: 50, y: 70, label: '3' },
      { order: 4, x: 70, y: 30, label: '4' },
      { order: 5, x: 88, y: 55, label: '5' },
    ],
  },
  {
    id: 'k1-19',
    grade: 'K1',
    levelNumber: 19,
    title: 'ด่าน 19: หนูแฮมสเตอร์วิ่งหากล่องเมล็ดพืช',
    characterEmoji: '🐹',
    characterName: 'แฮมสเตอร์ฟู',
    goalEmoji: '🌽',
    goalName: 'ข้าวโพดหวาน',
    pathDescription: 'วิ่งวนเป็นเกลียวโค้งอ่อนๆ 5 จุด',
    voicePrompt: 'แตะเรียง 1 ถึง 5 พาแฮมสเตอร์วิ่งไปหาข้าวโพดแสนอร่อยจ้า',
    pathType: 'spiral',
    waypoints: [
      { order: 1, x: 15, y: 60, label: '1' },
      { order: 2, x: 32, y: 25, label: '2' },
      { order: 3, x: 68, y: 25, label: '3' },
      { order: 4, x: 82, y: 60, label: '4' },
      { order: 5, x: 50, y: 70, label: '5' },
    ],
  },
  {
    id: 'k1-20',
    grade: 'K1',
    levelNumber: 20,
    title: 'ด่าน 20: แพนด้าน้อยปีนต้นไผ่สู่ดวงดาว',
    characterEmoji: '🐼',
    characterName: 'แพนด้าน้อย',
    goalEmoji: '⭐',
    goalName: 'ดาวประกายแสง',
    pathDescription: 'ปีนซิกแซกขึ้นสู่ยอดเขาคว้าดวงดาว',
    voicePrompt: 'ด่านสุดท้ายของ อ.1 แตะ 1 ถึง 5 พาแพนด้าคว้าดาวทองเลยจ้า!',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 15, y: 75, label: '1' },
      { order: 2, x: 35, y: 35, label: '2' },
      { order: 3, x: 55, y: 75, label: '3' },
      { order: 4, x: 75, y: 35, label: '4' },
      { order: 5, x: 88, y: 20, label: '5' },
    ],
  },

  // ================= K2 (อ.2) - 20 ด่าน: ซิกแซก คลื่น และวงวน 5-6 จุด =================
  {
    id: 'k2-1',
    grade: 'K2',
    levelNumber: 1,
    title: 'ด่าน 1: กระต่ายกระโดดซิกแซก',
    characterEmoji: '🐰',
    characterName: 'กระต่ายน้อย',
    goalEmoji: '🥕',
    goalName: 'แครอทหัวโต',
    pathDescription: 'กระโดดขึ้น-ลงซิกแซกหลบก้อนหิน',
    voicePrompt: 'แตะเรียงจุดตามรอยฟันปลาซิกแซก 1 ถึง 5 เพื่อหาแครอทนะจ๊ะ',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 12, y: 50, label: '1' },
      { order: 2, x: 28, y: 22, label: '2' },
      { order: 3, x: 48, y: 75, label: '3' },
      { order: 4, x: 68, y: 22, label: '4' },
      { order: 5, x: 85, y: 55, label: '5' },
    ],
  },
  {
    id: 'k2-2',
    grade: 'K2',
    levelNumber: 2,
    title: 'ด่าน 2: เรือใบลอยล่องคลื่นน้ำ',
    characterEmoji: '⛵',
    characterName: 'เรือใบสีคราม',
    goalEmoji: '🏝️',
    goalName: 'เกาะมหาสมบัติ',
    pathDescription: 'แล่นตามรอยลูกคลื่นทะเลพริ้วไหว',
    voicePrompt: 'ลากนิ้วตามลูกคลื่นทะเลแตะ 1 2 3 4 5 ไปให้ถึงเกาะสมบัติเลยจ้า',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 12, y: 65, label: '1' },
      { order: 2, x: 30, y: 30, label: '2' },
      { order: 3, x: 50, y: 70, label: '3' },
      { order: 4, x: 70, y: 30, label: '4' },
      { order: 5, x: 88, y: 60, label: '5' },
    ],
  },
  {
    id: 'k2-3',
    grade: 'K2',
    levelNumber: 3,
    title: 'ด่าน 3: นกนางแอ่นบินโฉบยอดไม้',
    characterEmoji: '🕊️',
    characterName: 'นกนางแอ่น',
    goalEmoji: '🌲',
    goalName: 'ยอดไม้เขียวชอุ่ม',
    pathDescription: 'บินโฉบขึ้นลงเป็นคลื่นพลิ้วอย่างนุ่มนวล',
    voicePrompt: 'แตะเรียงหมายเลข 1 ถึง 5 พานกนางแอ่นบินร่อนผ่านยอดไม้นะจ๊ะ',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 12, y: 40, label: '1' },
      { order: 2, x: 32, y: 72, label: '2' },
      { order: 3, x: 52, y: 25, label: '3' },
      { order: 4, x: 72, y: 68, label: '4' },
      { order: 5, x: 88, y: 30, label: '5' },
    ],
  },
  {
    id: 'k2-4',
    grade: 'K2',
    levelNumber: 4,
    title: 'ด่าน 4: โลมาน้อยกระโดดลอดห่วง',
    characterEmoji: '🐬',
    characterName: 'โลมาแสนรู้',
    goalEmoji: '⭕',
    goalName: 'ห่วงทองคำกลางทะเล',
    pathDescription: 'กระโดดโค้งเป็นวงกลมเหนือผิวน้ำ',
    voicePrompt: 'แตะ 1 ถึง 5 พาโลมาพุ่งทะยานลอดห่วงกลางคลื่นทะเลจ้า',
    pathType: 'loop',
    waypoints: [
      { order: 1, x: 15, y: 70, label: '1' },
      { order: 2, x: 35, y: 30, label: '2' },
      { order: 3, x: 60, y: 20, label: '3' },
      { order: 4, x: 75, y: 55, label: '4' },
      { order: 5, x: 88, y: 70, label: '5' },
    ],
  },
  {
    id: 'k2-5',
    grade: 'K2',
    levelNumber: 5,
    title: 'ด่าน 5: กวางเรนเดียร์วิ่งข้ามหุบเขาหิมะ',
    characterEmoji: '🦌',
    characterName: 'กวางเรนเดียร์',
    goalEmoji: '🏔️',
    goalName: 'ยอดเขาหิมะขาว',
    pathDescription: 'กระโจนซิกแซกไต่ระดับขึ้นสู่ยอดเขา',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 5 พากวางวิ่งข้ามเนินหิมะอย่างมั่นคง',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 14, y: 75, label: '1' },
      { order: 2, x: 32, y: 40, label: '2' },
      { order: 3, x: 50, y: 60, label: '3' },
      { order: 4, x: 70, y: 25, label: '4' },
      { order: 5, x: 88, y: 45, label: '5' },
    ],
  },
  {
    id: 'k2-6',
    grade: 'K2',
    levelNumber: 6,
    title: 'ด่าน 6: ม้าน้ำว่ายหมุนวนสาหร่าย',
    characterEmoji: '🪸',
    characterName: 'ม้าน้ำสีชมพู',
    goalEmoji: '🐚',
    goalName: 'เปลือกหอยมุก',
    pathDescription: 'ว่ายหมุนวนเป็นเกลียวรอบดงปะการัง',
    voicePrompt: 'แตะจุด 1 ถึง 5 บังคับม้าน้ำว่ายโค้งเกลียวรอบปะการังจ้า',
    pathType: 'spiral',
    waypoints: [
      { order: 1, x: 18, y: 30, label: '1' },
      { order: 2, x: 75, y: 25, label: '2' },
      { order: 3, x: 80, y: 72, label: '3' },
      { order: 4, x: 32, y: 75, label: '4' },
      { order: 5, x: 50, y: 48, label: '5' },
    ],
  },
  {
    id: 'k2-7',
    grade: 'K2',
    levelNumber: 7,
    title: 'ด่าน 7: จิงโจ้กระโดดข้ามทุ่งหญ้า',
    characterEmoji: '🦘',
    characterName: 'จิงโจ้น้อย',
    goalEmoji: '🌿',
    goalName: 'ต้นยูคาลิปตัส',
    pathDescription: 'กระโดดสูงซิกแซกอย่างสนุกสนาน',
    voicePrompt: 'แตะหมายเลข 1 ถึง 5 พาจิงโจ้กระโดดข้ามพุ่มไม้เลยจ้า',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 12, y: 68, label: '1' },
      { order: 2, x: 30, y: 25, label: '2' },
      { order: 3, x: 50, y: 70, label: '3' },
      { order: 4, x: 70, y: 25, label: '4' },
      { order: 5, x: 88, y: 65, label: '5' },
    ],
  },
  {
    id: 'k2-8',
    grade: 'K2',
    levelNumber: 8,
    title: 'ด่าน 8: ลิงจ๋อโหนเถาวัลย์ในป่าดงดิบ',
    characterEmoji: '🐒',
    characterName: 'ลิงจ๋อ',
    goalEmoji: '🍌',
    goalName: 'กล้วยสุกสีเหลือง',
    pathDescription: 'โหนเป็นคลื่นตัว U เชื่อมกิ่งไม้',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 5 พาลิงจ๋อโหนเถาวัลย์ไปเก็บกล้วยจ้า',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 14, y: 35, label: '1' },
      { order: 2, x: 32, y: 75, label: '2' },
      { order: 3, x: 50, y: 30, label: '3' },
      { order: 4, x: 70, y: 75, label: '4' },
      { order: 5, x: 88, y: 35, label: '5' },
    ],
  },
  {
    id: 'k2-9',
    grade: 'K2',
    levelNumber: 9,
    title: 'ด่าน 9: เพนกวินไถลตัวบนลานน้ำแข็ง',
    characterEmoji: '🐧',
    characterName: 'เพนกวินปุ๊กปิ๊ก',
    goalEmoji: '🐟',
    goalName: 'ปลาทะเลสดชื่น',
    pathDescription: 'ไถลพุงซิกแซกอย่างรวดเร็วบนธารน้ำแข็ง',
    voicePrompt: 'แตะเรียง 1 ถึง 5 พาเพนกวินสไลด์พุงขั้วโลกอย่างเพลิดเพลิน',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 15, y: 30, label: '1' },
      { order: 2, x: 35, y: 68, label: '2' },
      { order: 3, x: 55, y: 28, label: '3' },
      { order: 4, x: 72, y: 65, label: '4' },
      { order: 5, x: 86, y: 40, label: '5' },
    ],
  },
  {
    id: 'k2-10',
    grade: 'K2',
    levelNumber: 10,
    title: 'ด่าน 10: รถไฟเหาะตีลังกาขึ้นเขา',
    characterEmoji: '🎢',
    characterName: 'ขบวนรถไฟเหาะ',
    goalEmoji: '🎪',
    goalName: 'สวนสนุกมหัศจรรย์',
    pathDescription: 'แล่นวนเป็นวงลูปตีลังกาปลอดภัย',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 5 บังคับรถไฟเหาะตีลังกาสุดตื่นเต้น',
    pathType: 'loop',
    waypoints: [
      { order: 1, x: 12, y: 75, label: '1' },
      { order: 2, x: 32, y: 35, label: '2' },
      { order: 3, x: 60, y: 22, label: '3' },
      { order: 4, x: 75, y: 60, label: '4' },
      { order: 5, x: 88, y: 35, label: '5' },
    ],
  },
  {
    id: 'k2-11',
    grade: 'K2',
    levelNumber: 11,
    title: 'ด่าน 11: หิ่งห้อยส่องแสงวนต้นลำพู',
    characterEmoji: '✨',
    characterName: 'หิ่งห้อยน้อย',
    goalEmoji: '🌳',
    goalName: 'ต้นลำพูริมคลอง',
    pathDescription: 'บินวนรอบกิ่งไม้ส่งแสงระยิบระยับ',
    voicePrompt: 'แตะเรียง 1 ถึง 5 พาหิ่งห้อยบินวนเปล่งแสงวิบวับยามค่ำคืน',
    pathType: 'spiral',
    waypoints: [
      { order: 1, x: 15, y: 45, label: '1' },
      { order: 2, x: 45, y: 20, label: '2' },
      { order: 3, x: 82, y: 45, label: '3' },
      { order: 4, x: 55, y: 75, label: '4' },
      { order: 5, x: 45, y: 45, label: '5' },
    ],
  },
  {
    id: 'k2-12',
    grade: 'K2',
    levelNumber: 12,
    title: 'ด่าน 12: จระเข้น้อยว่ายข้ามแก่งหิน',
    characterEmoji: '🐊',
    characterName: 'จระเข้น้อย',
    goalEmoji: '🏝️',
    goalName: 'หาดทรายอบอุ่น',
    pathDescription: 'ว่ายหลบแก่งหินซ้ายขวาเป็นระลอกคลื่น',
    voicePrompt: 'แตะ 1 ถึง 5 นำทางจระเข้น้อยว่ายผ่านแก่งน้ำตกนะจ๊ะ',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 12, y: 55, label: '1' },
      { order: 2, x: 32, y: 28, label: '2' },
      { order: 3, x: 52, y: 72, label: '3' },
      { order: 4, x: 72, y: 28, label: '4' },
      { order: 5, x: 88, y: 55, label: '5' },
    ],
  },
  {
    id: 'k2-13',
    grade: 'K2',
    levelNumber: 13,
    title: 'ด่าน 13: แมงมุมไต่สายใยวิเศษ',
    characterEmoji: '🕷️',
    characterName: 'แมงมุมตาโต',
    goalEmoji: '🕸️',
    goalName: 'ใยแมงมุมหกเหลี่ยม',
    pathDescription: 'ไต่ซิกแซกตามโครงสร้างเส้นใยแข็งแรง',
    voicePrompt: 'แตะจุด 1 ถึง 5 พาแมงมุมไต่รังใยอย่างคล่องแคล่ว',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 15, y: 70, label: '1' },
      { order: 2, x: 30, y: 25, label: '2' },
      { order: 3, x: 52, y: 72, label: '3' },
      { order: 4, x: 72, y: 25, label: '4' },
      { order: 5, x: 86, y: 65, label: '5' },
    ],
  },
  {
    id: 'k2-14',
    grade: 'K2',
    levelNumber: 14,
    title: 'ด่าน 14: ปูเสฉวนเดินเฉียงหาก้นหอย',
    characterEmoji: '🦀',
    characterName: 'ปูเสฉวน',
    goalEmoji: '🐚',
    goalName: 'เปลือกหอยลายสวย',
    pathDescription: 'เดินซิกแซกลัดเลาะตามริ้วทรายทะเล',
    voicePrompt: 'แตะ 1 ถึง 5 พาปูเสฉวนเดินเฉียงหาก้นหอยหลังใหม่จ้า',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 14, y: 35, label: '1' },
      { order: 2, x: 35, y: 65, label: '2' },
      { order: 3, x: 52, y: 30, label: '3' },
      { order: 4, x: 72, y: 68, label: '4' },
      { order: 5, x: 88, y: 40, label: '5' },
    ],
  },
  {
    id: 'k2-15',
    grade: 'K2',
    levelNumber: 15,
    title: 'ด่าน 15: ค้างคาวบินวนถ้ำหินงอก',
    characterEmoji: '🦇',
    characterName: 'ค้างคาวน้อย',
    goalEmoji: '🌕',
    goalName: 'ปากถ้ำใต้แสงจันทร์',
    pathDescription: 'บินวนรอบแท่งหินย้อยเป็นรูปเกือกม้า',
    voicePrompt: 'แตะเรียงหมายเลข 1 ถึง 5 พาค้างคาวบินออกจากถ้ำมืดนะจ๊ะ',
    pathType: 'loop',
    waypoints: [
      { order: 1, x: 15, y: 65, label: '1' },
      { order: 2, x: 35, y: 25, label: '2' },
      { order: 3, x: 65, y: 25, label: '3' },
      { order: 4, x: 82, y: 60, label: '4' },
      { order: 5, x: 50, y: 75, label: '5' },
    ],
  },
  {
    id: 'k2-16',
    grade: 'K2',
    levelNumber: 16,
    title: 'ด่าน 16: ม้าลายวิ่งลัดเลาะทุ่งสะวันนา',
    characterEmoji: '🦓',
    characterName: 'ม้าลายร่าเริง',
    goalEmoji: '💧',
    goalName: 'บ่อน้ำใสกลางทุ่ง',
    pathDescription: 'วิ่งลัดเลาะคลื่น 6 จุดข้ามแอ่งดิน',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 6 พาม้าลายวิ่งไปดื่มน้ำดับกระหาย',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 10, y: 65, label: '1' },
      { order: 2, x: 26, y: 32, label: '2' },
      { order: 3, x: 44, y: 68, label: '3' },
      { order: 4, x: 62, y: 32, label: '4' },
      { order: 5, x: 78, y: 68, label: '5' },
      { order: 6, x: 90, y: 40, label: '6' },
    ],
  },
  {
    id: 'k2-17',
    grade: 'K2',
    levelNumber: 17,
    title: 'ด่าน 17: ตุ่นน้อยขุดอุโมงค์ใต้ดิน',
    characterEmoji: '🦔',
    characterName: 'ตุ่นจอมขุด',
    goalEmoji: '🥕',
    goalName: 'รากแครอทใต้ดิน',
    pathDescription: 'ขุดซิกแซก 6 จุดหลบรากไม้ใหญ่',
    voicePrompt: 'แตะจุด 1 ถึง 6 พาเจ้าตุ่นขุดดินลึกไปหาอาหาร',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 12, y: 30, label: '1' },
      { order: 2, x: 28, y: 70, label: '2' },
      { order: 3, x: 46, y: 25, label: '3' },
      { order: 4, x: 64, y: 72, label: '4' },
      { order: 5, x: 78, y: 30, label: '5' },
      { order: 6, x: 90, y: 65, label: '6' },
    ],
  },
  {
    id: 'k2-18',
    grade: 'K2',
    levelNumber: 18,
    title: 'ด่าน 18: ผึ้งบินเต้นระบำเลขแปด',
    characterEmoji: '🐝',
    characterName: 'นางพญาผึ้ง',
    goalEmoji: '🍯',
    goalName: 'รวงผึ้งทองคำ',
    pathDescription: 'บินวนเป็นเลข 8 ส่งสัญญาณให้เพื่อน',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 6 บินโค้งเลขแปดบอกตำแหน่งเกสรดอกไม้',
    pathType: 'loop',
    waypoints: [
      { order: 1, x: 15, y: 50, label: '1' },
      { order: 2, x: 30, y: 25, label: '2' },
      { order: 3, x: 50, y: 50, label: '3' },
      { order: 4, x: 70, y: 75, label: '4' },
      { order: 5, x: 85, y: 50, label: '5' },
      { order: 6, x: 70, y: 25, label: '6' },
    ],
  },
  {
    id: 'k2-19',
    grade: 'K2',
    levelNumber: 19,
    title: 'ด่าน 19: นกอินทรีร่อนเวียนยอดเขา',
    characterEmoji: '🦅',
    characterName: 'นกอินทรีทอง',
    goalEmoji: '🪺',
    goalName: 'รังบนยอดผาสูง',
    pathDescription: 'บินร่อนวนรอบยอดเขาเป็นเกลียววงกว้าง',
    voicePrompt: 'แตะเรียงหมายเลข 1 ถึง 6 พานกอินทรีร่อนลงรังอย่างสง่างาม',
    pathType: 'spiral',
    waypoints: [
      { order: 1, x: 12, y: 25, label: '1' },
      { order: 2, x: 80, y: 22, label: '2' },
      { order: 3, x: 85, y: 75, label: '3' },
      { order: 4, x: 25, y: 75, label: '4' },
      { order: 5, x: 35, y: 45, label: '5' },
      { order: 6, x: 60, y: 48, label: '6' },
    ],
  },
  {
    id: 'k2-20',
    grade: 'K2',
    levelNumber: 20,
    title: 'ด่าน 20: รถสำรวจข้ามหลุมอุกกาบาต',
    characterEmoji: '🚙',
    characterName: 'รถสำรวจอวกาศ',
    goalEmoji: '🚩',
    goalName: 'ธงชัยชนะบนดวงจันทร์',
    pathDescription: 'ขับซิกแซกไต่ขอบหลุมอุกกาบาต 6 จุด',
    voicePrompt: 'ด่านสุดท้ายของ อ.2 แตะ 1 ถึง 6 นำรถสำรวจปักธงชัยชนะเลยจ้า!',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 10, y: 70, label: '1' },
      { order: 2, x: 26, y: 25, label: '2' },
      { order: 3, x: 44, y: 72, label: '3' },
      { order: 4, x: 62, y: 25, label: '4' },
      { order: 5, x: 78, y: 70, label: '5' },
      { order: 6, x: 92, y: 30, label: '6' },
    ],
  },

  // ================= K3 (อ.3) - 20 ด่าน: โค้งซับซ้อน เกลียว ลูป และพิกัด 6-8 จุด =================
  {
    id: 'k3-1',
    grade: 'K3',
    levelNumber: 1,
    title: 'ด่าน 1: ยานอวกาศโคจรรอบกาแล็กซี',
    characterEmoji: '🚀',
    characterName: 'ยานอวกาศ',
    goalEmoji: '🪐',
    goalName: 'ดาวเสาร์วงแหวนงาม',
    pathDescription: 'บินโค้งเป็นวงแหวนดวงดาวอย่างแม่นยำ',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 6 บังคับยานอวกาศโคจรรอบดวงดาวอย่างนุ่มนวล',
    pathType: 'spiral',
    waypoints: [
      { order: 1, x: 15, y: 50, label: '1' },
      { order: 2, x: 30, y: 20, label: '2' },
      { order: 3, x: 60, y: 20, label: '3' },
      { order: 4, x: 82, y: 45, label: '4' },
      { order: 5, x: 65, y: 78, label: '5' },
      { order: 6, x: 35, y: 78, label: '6' },
    ],
  },
  {
    id: 'k3-2',
    grade: 'K3',
    levelNumber: 2,
    title: 'ด่าน 2: กบน้อยกระโดดข้ามใบบัววนสระ',
    characterEmoji: '🐸',
    characterName: 'กบน้อย',
    goalEmoji: '🪷',
    goalName: 'ดอกบัวหลวง',
    pathDescription: 'กระโดดข้ามใบบัว 6 จุดอย่างคล่องแคล่ว',
    voicePrompt: 'แตะใบบัวตามลำดับ 1 ถึง 6 พากบน้อยไปนั่งบนดอกบัวจ้า',
    pathType: 'loop',
    waypoints: [
      { order: 1, x: 10, y: 70, label: '1' },
      { order: 2, x: 25, y: 35, label: '2' },
      { order: 3, x: 45, y: 65, label: '3' },
      { order: 4, x: 62, y: 25, label: '4' },
      { order: 5, x: 78, y: 60, label: '5' },
      { order: 6, x: 90, y: 30, label: '6' },
    ],
  },
  {
    id: 'k3-3',
    grade: 'K3',
    levelNumber: 3,
    title: 'ด่าน 3: เหยี่ยวเวหาบินจับทิศทางลม',
    characterEmoji: '🦅',
    characterName: 'เหยี่ยวเวหา',
    goalEmoji: '🏔️',
    goalName: 'ยอดผาสูงชัน',
    pathDescription: 'บินวนเกลียวคลื่นลม 6 จุดสู่จุดชมวิว',
    voicePrompt: 'แตะจุด 1 ถึง 6 บังคับเหยี่ยวเวหาร่อนฝ่ากระแสลมอย่างมั่นคง',
    pathType: 'spiral',
    waypoints: [
      { order: 1, x: 12, y: 75, label: '1' },
      { order: 2, x: 75, y: 70, label: '2' },
      { order: 3, x: 80, y: 25, label: '3' },
      { order: 4, x: 25, y: 28, label: '4' },
      { order: 5, x: 35, y: 55, label: '5' },
      { order: 6, x: 65, y: 50, label: '6' },
    ],
  },
  {
    id: 'k3-4',
    grade: 'K3',
    levelNumber: 4,
    title: 'ด่าน 4: มังกรน้อยบินลอดซุ้มเมฆสวรรค์',
    characterEmoji: '🐉',
    characterName: 'มังกรสายรุ้ง',
    goalEmoji: '🌈',
    goalName: 'สายรุ้งเจ็ดสี',
    pathDescription: 'เลื้อยพลิ้วเป็นคลื่นลึก 6 จุดลอดก้อนเมฆ',
    voicePrompt: 'แตะเรียงหมายเลข 1 ถึง 6 พามังกรน้อยเลื้อยข้ามหมู่เมฆสู่สายรุ้ง',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 10, y: 50, label: '1' },
      { order: 2, x: 26, y: 20, label: '2' },
      { order: 3, x: 44, y: 80, label: '3' },
      { order: 4, x: 60, y: 20, label: '4' },
      { order: 5, x: 76, y: 80, label: '5' },
      { order: 6, x: 92, y: 45, label: '6' },
    ],
  },
  {
    id: 'k3-5',
    grade: 'K3',
    levelNumber: 5,
    title: 'ด่าน 5: รถแข่งฟอร์มูล่าวันเลี้ยวโค้งเอส',
    characterEmoji: '🏎️',
    characterName: 'รถแข่งเบอร์หนึ่ง',
    goalEmoji: '🏁',
    goalName: 'เส้นชัยธงหมากรุก',
    pathDescription: 'เข้าโค้งเอสรูปตัว S ต่อเนื่องอย่างคมชัด',
    voicePrompt: 'แตะ 1 ถึง 6 บังคับพวงมาลัยเข้าโค้งเอสเข้าเส้นชัยเลยจ้า',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 10, y: 70, label: '1' },
      { order: 2, x: 28, y: 30, label: '2' },
      { order: 3, x: 45, y: 75, label: '3' },
      { order: 4, x: 65, y: 25, label: '4' },
      { order: 5, x: 80, y: 70, label: '5' },
      { order: 6, x: 92, y: 30, label: '6' },
    ],
  },
  {
    id: 'k3-6',
    grade: 'K3',
    levelNumber: 6,
    title: 'ด่าน 6: ปลาหมึกยักษ์ว่ายหมุนวนคลื่นทะเล',
    characterEmoji: '🐙',
    characterName: 'หมึกยักษ์ใจดี',
    goalEmoji: '🪸',
    goalName: 'แนวปะการังเรืองแสง',
    pathDescription: 'ว่ายหมุนหนวดเป็นลูปเลข 8 ต่อเนื่อง',
    voicePrompt: 'แตะจุด 1 ถึง 6 นำทางหมึกยักษ์ว่ายวนเป็นลูปอย่างพริ้วไหว',
    pathType: 'loop',
    waypoints: [
      { order: 1, x: 15, y: 50, label: '1' },
      { order: 2, x: 30, y: 25, label: '2' },
      { order: 3, x: 48, y: 75, label: '3' },
      { order: 4, x: 68, y: 25, label: '4' },
      { order: 5, x: 85, y: 50, label: '5' },
      { order: 6, x: 50, y: 40, label: '6' },
    ],
  },
  {
    id: 'k3-7',
    grade: 'K3',
    levelNumber: 7,
    title: 'ด่าน 7: นักบินอวกาศเดินสำรวจดาวเสาร์',
    characterEmoji: '👨‍🚀',
    characterName: 'นักบินอวกาศ',
    goalEmoji: '🛸',
    goalName: 'สถานีอวกาศลอยฟ้า',
    pathDescription: 'เดินสำรวจวงแหวนโค้ง 6 พิกัด',
    voicePrompt: 'แตะเรียงหมายเลข 1 ถึง 6 พานักบินอวกาศลอยตัวกลับยานแม่',
    pathType: 'spiral',
    waypoints: [
      { order: 1, x: 12, y: 35, label: '1' },
      { order: 2, x: 78, y: 28, label: '2' },
      { order: 3, x: 85, y: 70, label: '3' },
      { order: 4, x: 22, y: 72, label: '4' },
      { order: 5, x: 38, y: 45, label: '5' },
      { order: 6, x: 65, y: 52, label: '6' },
    ],
  },
  {
    id: 'k3-8',
    grade: 'K3',
    levelNumber: 8,
    title: 'ด่าน 8: ลูกข่างวิเศษหมุนวนเป็นเกลียว',
    characterEmoji: '🪀',
    characterName: 'ลูกข่างสายรุ้ง',
    goalEmoji: '🎯',
    goalName: 'เป้าหมายศูนย์กลาง',
    pathDescription: 'หมุนวนเป็นเกลียวเข้าสู่ศูนย์กลาง 7 จุด',
    voicePrompt: 'แตะ 1 ถึง 7 ตามรอบหมุนเกลียวของลูกข่างเข้าสู่เป้าหมาย',
    pathType: 'spiral',
    waypoints: [
      { order: 1, x: 10, y: 20, label: '1' },
      { order: 2, x: 88, y: 22, label: '2' },
      { order: 3, x: 88, y: 80, label: '3' },
      { order: 4, x: 20, y: 80, label: '4' },
      { order: 5, x: 25, y: 40, label: '5' },
      { order: 6, x: 72, y: 45, label: '6' },
      { order: 7, x: 50, y: 60, label: '7' },
    ],
  },
  {
    id: 'k3-9',
    grade: 'K3',
    levelNumber: 9,
    title: 'ด่าน 9: เสือดาวกระโจนข้ามโขดหินผา',
    characterEmoji: '🐆',
    characterName: 'เสือดาวหิมะ',
    goalEmoji: '🍖',
    goalName: 'รางวัลยอดฝีมือ',
    pathDescription: 'กระโจนซิกแซกมุมแหลม 7 จุดต่อเนื่อง',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 7 พาเสือดาวกระโดดข้ามหินผาด้วยความแม่นยำ',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 10, y: 70, label: '1' },
      { order: 2, x: 24, y: 25, label: '2' },
      { order: 3, x: 38, y: 75, label: '3' },
      { order: 4, x: 52, y: 25, label: '4' },
      { order: 5, x: 68, y: 75, label: '5' },
      { order: 6, x: 82, y: 25, label: '6' },
      { order: 7, x: 92, y: 65, label: '7' },
    ],
  },
  {
    id: 'k3-10',
    grade: 'K3',
    levelNumber: 10,
    title: 'ด่าน 10: ว่าวจุฬาเหินฟ้าวนลมว่าว',
    characterEmoji: '🪁',
    characterName: 'ว่าวจุฬาทอง',
    goalEmoji: '☁️',
    goalName: 'ปุยเมฆขาวนุ่ม',
    pathDescription: 'เหินวนเป็นวงกลมลูปซ้อนกัน 7 จุด',
    voicePrompt: 'แตะเรียง 1 ถึง 7 ชักว่าวจุฬาเหินลมบนฟ้าสวยงามจ้า',
    pathType: 'loop',
    waypoints: [
      { order: 1, x: 12, y: 75, label: '1' },
      { order: 2, x: 25, y: 35, label: '2' },
      { order: 3, x: 50, y: 20, label: '3' },
      { order: 4, x: 75, y: 35, label: '4' },
      { order: 5, x: 88, y: 70, label: '5' },
      { order: 6, x: 60, y: 55, label: '6' },
      { order: 7, x: 35, y: 55, label: '7' },
    ],
  },
  {
    id: 'k3-11',
    grade: 'K3',
    levelNumber: 11,
    title: 'ด่าน 11: เรือดำน้ำดำลึกผ่านร่องสมุทร',
    characterEmoji: '🚢',
    characterName: 'เรือดำน้ำเหลือง',
    goalEmoji: '💎',
    goalName: 'เพชรใต้ทะเลลึก',
    pathDescription: 'ดำดิ่งลึกเป็นคลื่นสูงต่ำ 7 จุด',
    voicePrompt: 'แตะจุด 1 ถึง 7 บังคับเรือดำน้ำลงสำรวจขุมทรัพย์ใต้สมุทร',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 10, y: 30, label: '1' },
      { order: 2, x: 24, y: 75, label: '2' },
      { order: 3, x: 38, y: 25, label: '3' },
      { order: 4, x: 52, y: 75, label: '4' },
      { order: 5, x: 68, y: 25, label: '5' },
      { order: 6, x: 82, y: 75, label: '6' },
      { order: 7, x: 92, y: 35, label: '7' },
    ],
  },
  {
    id: 'k3-12',
    grade: 'K3',
    levelNumber: 12,
    title: 'ด่าน 12: หงส์ขาวร่ายรำบนผิวน้ำ',
    characterEmoji: '🦢',
    characterName: 'หงส์ขาวสง่างาม',
    goalEmoji: '👑',
    goalName: 'มงกุฎราชินีหงส์',
    pathDescription: 'ร่ายรำเป็นวงกลมลูปอ่อนหวาน 7 จุด',
    voicePrompt: 'แตะเรียงหมายเลข 1 ถึง 7 พาหงส์ขาวร่ายรำบนผืนน้ำประกายแสง',
    pathType: 'loop',
    waypoints: [
      { order: 1, x: 14, y: 60, label: '1' },
      { order: 2, x: 28, y: 25, label: '2' },
      { order: 3, x: 50, y: 20, label: '3' },
      { order: 4, x: 72, y: 35, label: '4' },
      { order: 5, x: 86, y: 65, label: '5' },
      { order: 6, x: 65, y: 75, label: '6' },
      { order: 7, x: 40, y: 65, label: '7' },
    ],
  },
  {
    id: 'k3-13',
    grade: 'K3',
    levelNumber: 13,
    title: 'ด่าน 13: นักปีนเขาไต่ยอดเอเวอเรสต์',
    characterEmoji: '🧗',
    characterName: 'นักปีนเขาผู้กล้าหาญ',
    goalEmoji: '🚩',
    goalName: 'ยอดเขาสูงเทียมฟ้า',
    pathDescription: 'ปีนซิกแซกไต่ตามสันเขาชัน 7 จุด',
    voicePrompt: 'แตะเรียง 1 ถึง 7 พานักปีนเขาพิชิตยอดเขาสูงสุดของโลก',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 12, y: 80, label: '1' },
      { order: 2, x: 28, y: 55, label: '2' },
      { order: 3, x: 42, y: 70, label: '3' },
      { order: 4, x: 56, y: 40, label: '4' },
      { order: 5, x: 70, y: 55, label: '5' },
      { order: 6, x: 84, y: 25, label: '6' },
      { order: 7, x: 92, y: 15, label: '7' },
    ],
  },
  {
    id: 'k3-14',
    grade: 'K3',
    levelNumber: 14,
    title: 'ด่าน 14: โดรนสำรวจป่าลึกส่งสัญญาณ',
    characterEmoji: '🛸',
    characterName: 'โดรนสำรวจ',
    goalEmoji: '📡',
    goalName: 'จานดาวเทียมรับสัญญาณ',
    pathDescription: 'บินสำรวจวนเป็นก้นหอย 7 จุดส่งสัญญาณ',
    voicePrompt: 'แตะเรียงหมายเลข 1 ถึง 7 ควบคุมโดรนบินวนตรวจการณ์ป่าไม้',
    pathType: 'spiral',
    waypoints: [
      { order: 1, x: 15, y: 75, label: '1' },
      { order: 2, x: 15, y: 25, label: '2' },
      { order: 3, x: 85, y: 25, label: '3' },
      { order: 4, x: 85, y: 75, label: '4' },
      { order: 5, x: 35, y: 75, label: '5' },
      { order: 6, x: 35, y: 45, label: '6' },
      { order: 7, x: 65, y: 50, label: '7' },
    ],
  },
  {
    id: 'k3-15',
    grade: 'K3',
    levelNumber: 15,
    title: 'ด่าน 15: ลูกบอลพินบอลเด้งกระทบเป้า',
    characterEmoji: '⚽',
    characterName: 'ลูกบอลเงิน',
    goalEmoji: '🎰',
    goalName: 'ตู้แจ็คพอตโบนัส',
    pathDescription: 'เด้งสะท้อนมุมซิกแซกแม่นยำ 7 จุด',
    voicePrompt: 'แตะ 1 ถึง 7 ตามรอยลูกบอลเด้งกระทบเป้าหมายคว้าแต้มพิเศษ',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 10, y: 75, label: '1' },
      { order: 2, x: 30, y: 20, label: '2' },
      { order: 3, x: 45, y: 80, label: '3' },
      { order: 4, x: 60, y: 20, label: '4' },
      { order: 5, x: 75, y: 80, label: '5' },
      { order: 6, x: 85, y: 25, label: '6' },
      { order: 7, x: 92, y: 60, label: '7' },
    ],
  },
  {
    id: 'k3-16',
    grade: 'K3',
    levelNumber: 16,
    title: 'ด่าน 16: ดาวหางฮัลเลย์โคจรผ่านระบบสุริยะ',
    characterEmoji: '☄️',
    characterName: 'ดาวหางฮัลเลย์',
    goalEmoji: '☀️',
    goalName: 'ดวงอาทิตย์เจิดจ้า',
    pathDescription: 'โค้งเป็นวงรีพาดผ่านระบบสุริยะ 7 จุด',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 7 นำทางหางประกายแสงของดาวหางโคจร',
    pathType: 'loop',
    waypoints: [
      { order: 1, x: 10, y: 75, label: '1' },
      { order: 2, x: 30, y: 35, label: '2' },
      { order: 3, x: 60, y: 20, label: '3' },
      { order: 4, x: 85, y: 35, label: '4' },
      { order: 5, x: 80, y: 75, label: '5' },
      { order: 6, x: 50, y: 70, label: '6' },
      { order: 7, x: 35, y: 55, label: '7' },
    ],
  },
  {
    id: 'k3-17',
    grade: 'K3',
    levelNumber: 17,
    title: 'ด่าน 17: กายกรรมเหินหาวลอดบ่วงไฟ',
    characterEmoji: '🎪',
    characterName: 'นักกายกรรมเหินหาว',
    goalEmoji: '🥇',
    goalName: 'เหรียญทองเกียรติยศ',
    pathDescription: 'เหินหาวเป็นคลื่นสูง 7 จุดตีลังกา',
    voicePrompt: 'แตะจุด 1 ถึง 7 นำพานักกายกรรมเหินฟ้าลงสู่เบาะนุ่มอย่างสวยงาม',
    pathType: 'wave',
    waypoints: [
      { order: 1, x: 10, y: 65, label: '1' },
      { order: 2, x: 22, y: 25, label: '2' },
      { order: 3, x: 36, y: 75, label: '3' },
      { order: 4, x: 50, y: 20, label: '4' },
      { order: 5, x: 65, y: 75, label: '5' },
      { order: 6, x: 80, y: 25, label: '6' },
      { order: 7, x: 92, y: 55, label: '7' },
    ],
  },
  {
    id: 'k3-18',
    grade: 'K3',
    levelNumber: 18,
    title: 'ด่าน 18: พายุทอร์นาโดหมุนเกลียวสู่ยอดเขา',
    characterEmoji: '🌪️',
    characterName: 'ลมหมุนวิเศษ',
    goalEmoji: '🌈',
    goalName: 'เมืองสายรุ้งบนฟ้า',
    pathDescription: 'หมุนวนเป็นเกลียวทอร์นาโด 8 จุดซับซ้อน',
    voicePrompt: 'แตะ 1 ถึง 8 บังคับเกลียวลมวิเศษหมุนขึ้นสู่สรวงสวรรค์',
    pathType: 'spiral',
    waypoints: [
      { order: 1, x: 12, y: 80, label: '1' },
      { order: 2, x: 85, y: 80, label: '2' },
      { order: 3, x: 85, y: 25, label: '3' },
      { order: 4, x: 20, y: 25, label: '4' },
      { order: 5, x: 25, y: 65, label: '5' },
      { order: 6, x: 75, y: 65, label: '6' },
      { order: 7, x: 70, y: 45, label: '7' },
      { order: 8, x: 45, y: 45, label: '8' },
    ],
  },
  {
    id: 'k3-19',
    grade: 'K3',
    levelNumber: 19,
    title: 'ด่าน 19: สกีหิมะแล่นคดเคี้ยวลงยอดเขาแอลป์',
    characterEmoji: '⛷️',
    characterName: 'นักสกีเหรียญทอง',
    goalEmoji: '🏆',
    goalName: 'ถ้วยแชมป์โลกสกีหิมะ',
    pathDescription: 'สกีหิมะซิกแซกเลี้ยวคม 8 จุดฝ่าหิมะ',
    voicePrompt: 'แตะเรียงจุด 1 ถึง 8 ไถลสกีหลบหลักประตูหิมะเข้าเส้นชัย',
    pathType: 'zigzag',
    waypoints: [
      { order: 1, x: 10, y: 25, label: '1' },
      { order: 2, x: 22, y: 75, label: '2' },
      { order: 3, x: 34, y: 25, label: '3' },
      { order: 4, x: 46, y: 75, label: '4' },
      { order: 5, x: 58, y: 25, label: '5' },
      { order: 6, x: 70, y: 75, label: '6' },
      { order: 7, x: 82, y: 25, label: '7' },
      { order: 8, x: 92, y: 70, label: '8' },
    ],
  },
  {
    id: 'k3-20',
    grade: 'K3',
    levelNumber: 20,
    title: 'ด่าน 20: นกฟีนิกซ์คืนชีพทะยานสู่วงแหวนสุริยะ',
    characterEmoji: '🔥',
    characterName: 'พญาฟีนิกซ์เพลิง',
    goalEmoji: '☀️',
    goalName: 'มหาดวงสุริยะนิรันดร์',
    pathDescription: 'บินทะยานผ่านวงแหวนเวทมนตร์ 8 จุดแห่งเกียรติยศ',
    voicePrompt: 'ด่านสุดยอดสูงสุดระดับ อ.3 แตะ 1 ถึง 8 พาพญาฟีนิกซ์พิชิตจักรวาล!',
    pathType: 'loop',
    waypoints: [
      { order: 1, x: 10, y: 75, label: '1' },
      { order: 2, x: 22, y: 35, label: '2' },
      { order: 3, x: 42, y: 20, label: '3' },
      { order: 4, x: 62, y: 20, label: '4' },
      { order: 5, x: 82, y: 35, label: '5' },
      { order: 6, x: 92, y: 75, label: '6' },
      { order: 7, x: 65, y: 60, label: '7' },
      { order: 8, x: 40, y: 60, label: '8' },
    ],
  },
];

export const FineMotorTracingView: React.FC<FineMotorTracingViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const [activeMode, setActiveMode] = useState<'handwriting' | 'hand_tracking' | 'waypoints'>('handwriting');
  const [levelIndex, setLevelIndex] = useState(0);

  const gradeLevels = useMemo(() => {
    const list = TRACING_LEVELS.filter((l) => l.grade === currentGrade);
    return list.length > 0 ? list : TRACING_LEVELS;
  }, [currentGrade]);

  const activeLevel = gradeLevels[levelIndex] || gradeLevels[0];

  // Current progress in waypoints: index of next waypoint to be tapped
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setCurrentWaypointIndex(0);
    setIsCompleted(false);

    if (soundVolume > 0) {
      speakText(activeLevel.voicePrompt, 'th', soundVolume);
    }
  }, [activeLevel, soundVolume]);

  const handleTapWaypoint = (wp: Waypoint, index: number) => {
    if (isCompleted) return;

    if (index === currentWaypointIndex) {
      // Correct next point!
      soundEffects.playCorrect(soundVolume);
      const nextIdx = currentWaypointIndex + 1;
      setCurrentWaypointIndex(nextIdx);

      if (nextIdx === activeLevel.waypoints.length) {
        // Complete path!
        setIsCompleted(true);
        soundEffects.playVictory(soundVolume);
        if (onEarnStar) onEarnStar();
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.55 } });
        speakText(
          `ยอดเยี่ยมมากจ้า! พาส่งถึง ${activeLevel.goalName} สำเร็จแล้ว! กล้ามเนื้อมือประสานสายตาแม่นยำมาก!`,
          'th',
          soundVolume
        );
      } else {
        speakText(`จุดที่ ${wp.label} เก่งมากจ้า!`, 'th', soundVolume);
      }
    } else if (index < currentWaypointIndex) {
      // Already passed
      soundEffects.playTap(soundVolume);
    } else {
      // Wrong point (skipped ahead)
      soundEffects.playIncorrect(soundVolume);
      speakText(
        `แตะจุดที่ ${activeLevel.waypoints[currentWaypointIndex]?.label} ก่อนนะจ๊ะ`,
        'th',
        soundVolume
      );
    }
  };

  const handleReset = () => {
    soundEffects.playTap(soundVolume);
    setCurrentWaypointIndex(0);
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

  // SVG lines connecting waypoints
  const pathCoordinates = useMemo(() => {
    return activeLevel.waypoints.map((w) => `${w.x},${w.y}`).join(' ');
  }, [activeLevel]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-4">
      {/* Activity Mode Switcher: Thai Handwriting vs Hand Tracking Animals/Shapes vs Waypoints Adventure */}
      <div className="w-full flex flex-wrap items-center justify-center p-1.5 bg-emerald-50/80 rounded-2xl border-2 border-emerald-200 gap-1.5 max-w-2xl shadow-xs">
        <button
          type="button"
          onClick={() => {
            soundEffects.playTap(soundVolume);
            setActiveMode('handwriting');
          }}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeMode === 'handwriting'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
              : 'text-amber-950 hover:bg-amber-100/60'
          }`}
        >
          <span>✍️</span>
          <span>คัดลายมือ (ไทย & อังกฤษ A-Z)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playTap(soundVolume);
            setActiveMode('hand_tracking');
          }}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeMode === 'hand_tracking'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
              : 'text-emerald-950 hover:bg-emerald-100/60'
          }`}
        >
          <span>🖐️</span>
          <span>ลากเส้นตามรอยรูปสัตว์/รูปทรง</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playTap(soundVolume);
            setActiveMode('waypoints');
          }}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeMode === 'waypoints'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
              : 'text-emerald-950 hover:bg-emerald-100/60'
          }`}
        >
          <span>🧭</span>
          <span>ลากเส้นนำทาง (ผจญภัย)</span>
        </button>
      </div>

      {activeMode === 'handwriting' ? (
        <ThaiHandwritingView
          currentGrade={currentGrade}
          soundVolume={soundVolume}
          onEarnStar={onEarnStar}
        />
      ) : activeMode === 'hand_tracking' ? (
        <HandTracingActivityView
          currentGrade={currentGrade}
          soundVolume={soundVolume}
          onEarnStar={onEarnStar}
        />
      ) : (
        <>
          {/* Level Selector */}
          <SkillGameLevelSelector
            levels={gradeLevels.map((l) => ({ level: l.levelNumber, name: l.title }))}
            currentLevel={levelIndex + 1}
            onSelectLevel={(num) => setLevelIndex(num - 1)}
            accentColor="emerald"
            prefix="ด่าน"
          />

          {/* Main Game Container */}
          <div className="w-full bg-white rounded-3xl p-4 sm:p-6 border-2 border-emerald-200 shadow-sm flex flex-col items-center gap-4">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-emerald-100 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-2xl shadow-2xs">
              🧭
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-emerald-950">
                {activeLevel.title}
              </h2>
              <div className="text-xs text-emerald-700 font-bold">
                {activeLevel.pathDescription}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => speakText(activeLevel.voicePrompt, 'th', soundVolume)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 cursor-pointer"
              title="ฟังเสียงคำสั่ง"
            >
              <Volume2 className="w-4 h-4" />
              <span>ฟังเสียง</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              title="เริ่มลากเส้นใหม่"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>เริ่มใหม่</span>
            </button>
          </div>
        </div>

        {/* Tracing Canvas Area */}
        <div className="w-full relative h-72 sm:h-84 rounded-3xl bg-gradient-to-br from-emerald-50/60 via-teal-50/30 to-sky-50/50 border-3 border-emerald-300 overflow-hidden shadow-inner select-none">
          {/* SVG Connector Track */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Guide line track */}
            <polyline
              points={pathCoordinates}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              strokeLinecap="round"
            />
            {/* Completed path highlighted */}
            {currentWaypointIndex > 0 && (
              <polyline
                points={activeLevel.waypoints
                  .slice(0, currentWaypointIndex)
                  .map((w) => `${w.x},${w.y}`)
                  .join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Start Character Marker */}
          <div
            style={{
              left: `${activeLevel.waypoints[0].x}%`,
              top: `${activeLevel.waypoints[0].y - 8}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center animate-bounce"
          >
            <span className="text-3xl sm:text-4xl">{activeLevel.characterEmoji}</span>
          </div>

          {/* Goal Marker */}
          <div
            style={{
              left: `${activeLevel.waypoints[activeLevel.waypoints.length - 1].x}%`,
              top: `${activeLevel.waypoints[activeLevel.waypoints.length - 1].y + 8}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center"
          >
            <span className="text-3xl sm:text-4xl">{activeLevel.goalEmoji}</span>
            <span className="text-[10px] font-black text-emerald-900 bg-white/90 px-1.5 py-0.2 rounded border border-emerald-300 shadow-2xs">
              {activeLevel.goalName}
            </span>
          </div>

          {/* Interactive Waypoints */}
          {activeLevel.waypoints.map((wp, idx) => {
            const isPassed = idx < currentWaypointIndex;
            const isNext = idx === currentWaypointIndex;

            let circleClass = 'bg-white border-slate-300 text-slate-700';
            if (isPassed) {
              circleClass =
                'bg-emerald-500 border-emerald-600 text-white shadow-xs scale-105';
            } else if (isNext) {
              circleClass =
                'bg-amber-400 border-amber-600 text-amber-950 font-black shadow-md scale-120 animate-pulse ring-4 ring-amber-200';
            }

            return (
              <button
                key={wp.order}
                type="button"
                onClick={() => handleTapWaypoint(wp, idx)}
                style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full border-3 flex items-center justify-center font-black text-sm sm:text-base cursor-pointer transition-all z-20 ${circleClass}`}
                title={`จุดที่ ${wp.label}`}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                ) : (
                  <span>{wp.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Status Prompt & Progress */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Hand className="w-4 h-4 text-emerald-600" />
            <span>
              ความคืบหน้าการลากเส้น: <strong>{currentWaypointIndex}</strong> / {activeLevel.waypoints.length} จุด
            </span>
          </div>

          <div className="font-bold text-emerald-800">
            {isCompleted
              ? '🎉 ถึงเป้าหมายเรียบร้อยแล้ว!'
              : `👉 แตะจุดหมายเลข ${activeLevel.waypoints[currentWaypointIndex]?.label} เพื่อไปต่อ`}
          </div>
        </div>

        {/* Completion Card */}
        {isCompleted && (
          <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left animate-in zoom-in-95">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🌟</span>
              <div>
                <div className="font-black text-emerald-950 text-sm sm:text-base">
                  ยินดีด้วยจ้า! ลากเส้นประสานตาสำเร็จ +1 ดาว ⭐
                </div>
                <div className="text-xs text-emerald-700 font-medium">
                  {activeLevel.characterName} ขอบคุณที่พามาส่งถึง {activeLevel.goalName} อย่างปลอดภัย!
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

        {/* Educational Note on Motor Skills */}
        <div className="w-full bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2 text-xs text-emerald-950 font-medium">
          <Compass className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>พัฒนากล้ามเนื้อมัดเล็กและสายตา (Fine Motor & Eye-Hand Coordination):</strong> การลากเส้นเชื่อมจุดอย่างมีทิศทาง ช่วยเตรียมความพร้อมในการจับดินสอ การเขียนพยัญชนะ และการกะระยะมิติสัมพันธ์
          </span>
        </div>
      </div>
    </>
    )}
  </div>
);
};
