import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grade } from '../../types';
import { soundEffects, speakText } from '../../services/audioService';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import confetti from 'canvas-confetti';
import {
  Heart,
  Users,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Gift,
  Smile,
  Volume2,
} from 'lucide-react';

interface SocialSharingViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

interface FriendTarget {
  id: string;
  name: string;
  avatar: string;
  receivedCount: number;
}

interface SharingLevel {
  id: string;
  grade: Grade;
  levelNumber: number;
  title: string;
  itemName: string;
  itemEmoji: string;
  totalItems: number;
  targetPerFriend: number;
  friends: { id: string; name: string; avatar: string }[];
  lessonPrompt: string;
}

const SHARING_LEVELS: SharingLevel[] = [
  // ================= K1 (อ.1) - 3-4 ปี: ของ 2-4 ชิ้น แบ่ง 2 หรือ 3 คน =================
  {
    id: 'k1-1',
    grade: 'K1',
    levelNumber: 1,
    title: 'ด่าน 1: แบ่งคุกกี้หอมกรุ่น',
    itemName: 'คุกกี้',
    itemEmoji: '🍪',
    totalItems: 2,
    targetPerFriend: 1,
    friends: [
      { id: 'f1', name: 'น้องน้ำใจ', avatar: '👧' },
      { id: 'f2', name: 'น้องต้นกล้า', avatar: '👦' },
    ],
    lessonPrompt: 'มีคุกกี้ 2 ชิ้น แบ่งให้เพื่อน 2 คน คนละ 1 ชิ้นเท่ากันนะจ๊ะ',
  },
  {
    id: 'k1-2',
    grade: 'K1',
    levelNumber: 2,
    title: 'ด่าน 2: แบ่งแอปเปิ้ลสีแดง',
    itemName: 'แอปเปิ้ล',
    itemEmoji: '🍎',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'พี่กระต่าย', avatar: '🐰' },
      { id: 'f2', name: 'พี่หมีน้อย', avatar: '🐻' },
    ],
    lessonPrompt: 'แบ่งแอปเปิ้ล 4 ผล ให้เพื่อน 2 ตัว ตัวละ 2 ผลเท่ากันนะจ๊ะ',
  },
  {
    id: 'k1-3',
    grade: 'K1',
    levelNumber: 3,
    title: 'ด่าน 3: แบ่งลูกโป่งหลากสี',
    itemName: 'ลูกโป่ง',
    itemEmoji: '🎈',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องแก้มใส', avatar: '👧' },
      { id: 'f2', name: 'น้องข้าวหอม', avatar: '👦' },
    ],
    lessonPrompt: 'ลูกโป่ง 4 ลูก แบ่งให้เพื่อนคนละ 2 ลูก สดใสไปด้วยกันจ้า',
  },
  {
    id: 'k1-4',
    grade: 'K1',
    levelNumber: 4,
    title: 'ด่าน 4: แบ่งกล่องนมรสจืด',
    itemName: 'นมกล่อง',
    itemEmoji: '🥛',
    totalItems: 2,
    targetPerFriend: 1,
    friends: [
      { id: 'f1', name: 'น้องฟ้าใส', avatar: '👧' },
      { id: 'f2', name: 'น้องภูผา', avatar: '👦' },
    ],
    lessonPrompt: 'มีนม 2 กล่อง ดื่มด้วยกันคนละ 1 กล่อง ร่างกายแข็งแรงนะจ๊ะ',
  },
  {
    id: 'k1-5',
    grade: 'K1',
    levelNumber: 5,
    title: 'ด่าน 5: แบ่งกล้วยหอมทอง',
    itemName: 'กล้วยหอม',
    itemEmoji: '🍌',
    totalItems: 3,
    targetPerFriend: 1,
    friends: [
      { id: 'f1', name: 'ลิงจิ๋ว', avatar: '🐵' },
      { id: 'f2', name: 'ช้างน้อย', avatar: '🐘' },
      { id: 'f3', name: 'ลูกหมี', avatar: '🐻' },
    ],
    lessonPrompt: 'มีกล้วย 3 ผล แบ่งให้เพื่อนสัตว์ 3 ตัว ตัวละ 1 ผลจ้า',
  },
  {
    id: 'k1-6',
    grade: 'K1',
    levelNumber: 6,
    title: 'ด่าน 6: แบ่งส้มสายน้ำผึ้ง',
    itemName: 'ผลส้ม',
    itemEmoji: '🍊',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องมะลิ', avatar: '👧' },
      { id: 'f2', name: 'น้องวิน', avatar: '👦' },
    ],
    lessonPrompt: 'มีส้ม 4 ผล แบ่งให้เพื่อน 2 คน คนละ 2 ผลหวานชื่นใจจ้า',
  },
  {
    id: 'k1-7',
    grade: 'K1',
    levelNumber: 7,
    title: 'ด่าน 7: แบ่งดินน้ำมันปั้นสนุก',
    itemName: 'ก้อนดินน้ำมัน',
    itemEmoji: '🎨',
    totalItems: 2,
    targetPerFriend: 1,
    friends: [
      { id: 'f1', name: 'น้องมายด์', avatar: '👧' },
      { id: 'f2', name: 'น้องพีช', avatar: '👦' },
    ],
    lessonPrompt: 'ดินน้ำมัน 2 ก้อน แบ่งเล่นคนละ 1 ก้อน ปั้นรูปสัตว์กันเถอะ',
  },
  {
    id: 'k1-8',
    grade: 'K1',
    levelNumber: 8,
    title: 'ด่าน 8: แบ่งลูกสตรอว์เบอร์รี',
    itemName: 'สตรอว์เบอร์รี',
    itemEmoji: '🍓',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องเนย', avatar: '👧' },
      { id: 'f2', name: 'น้องบอส', avatar: '👦' },
    ],
    lessonPrompt: 'สตรอว์เบอร์รี 4 ผล แบ่งให้เพื่อนคนละ 2 ผลเท่ากันนะ',
  },
  {
    id: 'k1-9',
    grade: 'K1',
    levelNumber: 9,
    title: 'ด่าน 9: แบ่งลูกบอลเด้งดึ๋ง',
    itemName: 'ลูกบอล',
    itemEmoji: '⚽',
    totalItems: 2,
    targetPerFriend: 1,
    friends: [
      { id: 'f1', name: 'เจ้าตูบ', avatar: '🐶' },
      { id: 'f2', name: 'เจ้าเหมียว', avatar: '🐱' },
    ],
    lessonPrompt: 'มีลูกบอล 2 ลูก แบ่งให้เพื่อนเล่นคนละ 1 ลูก วิ่งสนุกสนาน',
  },
  {
    id: 'k1-10',
    grade: 'K1',
    levelNumber: 10,
    title: 'ด่าน 10: แบ่งแครอทกรุบกรอบ',
    itemName: 'แครอท',
    itemEmoji: '🥕',
    totalItems: 3,
    targetPerFriend: 1,
    friends: [
      { id: 'f1', name: 'กระต่ายขาว', avatar: '🐰' },
      { id: 'f2', name: 'กระต่ายเทา', avatar: '🐇' },
      { id: 'f3', name: 'กระรอกน้อย', avatar: '🐿️' },
    ],
    lessonPrompt: 'มีแครอท 3 หัว แบ่งให้เพื่อนสัตว์ 3 ตัว ตัวละ 1 หัวนะจ๊ะ',
  },
  {
    id: 'k1-11',
    grade: 'K1',
    levelNumber: 11,
    title: 'ด่าน 11: แบ่งไอศกรีมแท่ง',
    itemName: 'ไอศกรีมแท่ง',
    itemEmoji: '🍦',
    totalItems: 2,
    targetPerFriend: 1,
    friends: [
      { id: 'f1', name: 'น้องพลอย', avatar: '👧' },
      { id: 'f2', name: 'น้องกันต์', avatar: '👦' },
    ],
    lessonPrompt: 'ไอศกรีม 2 แท่ง แบ่งให้เพื่อนคนละ 1 แท่ง ดับร้อนชื่นใจ',
  },
  {
    id: 'k1-12',
    grade: 'K1',
    levelNumber: 12,
    title: 'ด่าน 12: แบ่งดอกกุหลาบสดใส',
    itemName: 'ดอกกุหลาบ',
    itemEmoji: '🌹',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'คุณแม่', avatar: '👩' },
      { id: 'f2', name: 'คุณยาย', avatar: '👵' },
    ],
    lessonPrompt: 'มีดอกกุหลาบ 4 ดอก มอบให้คุณแม่และคุณยายคนละ 2 ดอกจ้า',
  },
  {
    id: 'k1-13',
    grade: 'K1',
    levelNumber: 13,
    title: 'ด่าน 13: แบ่งลูกเชอร์รีแดง',
    itemName: 'เชอร์รี',
    itemEmoji: '🍒',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องออม', avatar: '👧' },
      { id: 'f2', name: 'น้องโอม', avatar: '👦' },
    ],
    lessonPrompt: 'มีเชอร์รี 4 ลูก แบ่งให้เพื่อน 2 คน คนละ 2 ลูกหวานอร่อย',
  },
  {
    id: 'k1-14',
    grade: 'K1',
    levelNumber: 14,
    title: 'ด่าน 14: แบ่งรถของเล่น',
    itemName: 'รถของเล่น',
    itemEmoji: '🚗',
    totalItems: 2,
    targetPerFriend: 1,
    friends: [
      { id: 'f1', name: 'น้องเบิ้ล', avatar: '👦' },
      { id: 'f2', name: 'น้องเต้', avatar: '👦' },
    ],
    lessonPrompt: 'รถของเล่น 2 คัน แบ่งกันผลัดกันเล่นคนละ 1 คันอย่างมีน้ำใจ',
  },
  {
    id: 'k1-15',
    grade: 'K1',
    levelNumber: 15,
    title: 'ด่าน 15: แบ่งขนมปังแผ่น',
    itemName: 'ขนมปัง',
    itemEmoji: '🍞',
    totalItems: 3,
    targetPerFriend: 1,
    friends: [
      { id: 'f1', name: 'ลูกเจี๊ยบ', avatar: '🐥' },
      { id: 'f2', name: 'ลูกเป็ด', avatar: '🦆' },
      { id: 'f3', name: 'นกน้อย', avatar: '🐦' },
    ],
    lessonPrompt: 'ขนมปัง 3 แผ่น แบ่งให้เพื่อนสัตว์ปีกตัวละ 1 แผ่นเท่ากันจ้า',
  },
  {
    id: 'k1-16',
    grade: 'K1',
    levelNumber: 16,
    title: 'ด่าน 16: แบ่งสีเทียนวาดฝัน',
    itemName: 'สีเทียน',
    itemEmoji: '🖍️',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องกิ่ง', avatar: '👧' },
      { id: 'f2', name: 'น้องก้าน', avatar: '👦' },
    ],
    lessonPrompt: 'มีสีเทียน 4 แท่ง แบ่งกันวาดภาพคนละ 2 แท่ง ระบายสวยงาม',
  },
  {
    id: 'k1-17',
    grade: 'K1',
    levelNumber: 17,
    title: 'ด่าน 17: แบ่งโดนัทเคลือบน้ำตาล',
    itemName: 'โดนัท',
    itemEmoji: '🍩',
    totalItems: 2,
    targetPerFriend: 1,
    friends: [
      { id: 'f1', name: 'น้องพิมพ์', avatar: '👧' },
      { id: 'f2', name: 'น้องแพร', avatar: '👧' },
    ],
    lessonPrompt: 'โดนัท 2 ชิ้น แบ่งให้เพื่อนคนละ 1 ชิ้น ทานด้วยกันอย่างสุขใจ',
  },
  {
    id: 'k1-18',
    grade: 'K1',
    levelNumber: 18,
    title: 'ด่าน 18: แบ่งเมล็ดทานตะวัน',
    itemName: 'เมล็ดทานตะวัน',
    itemEmoji: '🌻',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'นกแก้ว', avatar: '🦜' },
      { id: 'f2', name: 'หนูแฮมสเตอร์', avatar: '🐹' },
    ],
    lessonPrompt: 'มีดอกทานตะวัน 4 ดอก แบ่งให้เพื่อน 2 ตัว ตัวละ 2 ดอกนะจ๊ะ',
  },
  {
    id: 'k1-19',
    grade: 'K1',
    levelNumber: 19,
    title: 'ด่าน 19: แบ่งลูกอมหัวใจ',
    itemName: 'ลูกอม',
    itemEmoji: '🍬',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องตอง', avatar: '👧' },
      { id: 'f2', name: 'น้องไตเติล', avatar: '👦' },
    ],
    lessonPrompt: 'ลูกอม 4 เม็ด แบ่งให้เพื่อนคนละ 2 เม็ด กินแล้วอย่าลืมแปรงฟันน้า',
  },
  {
    id: 'k1-20',
    grade: 'K1',
    levelNumber: 20,
    title: 'ด่าน 20: แบ่งดาวทองแสนสวย',
    itemName: 'ดาวทอง',
    itemEmoji: '⭐',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องต้นกล้า', avatar: '👦' },
      { id: 'f2', name: 'น้องน้ำใจ', avatar: '👧' },
    ],
    lessonPrompt: 'ด่าน 20 K1! แบ่งดาวทอง 4 ดวงให้เพื่อน 2 คน คนละ 2 ดวงเท่ากันอย่างภาคภูมิใจ!',
  },

  // ================= K2 (อ.2) - 4-5 ปี: ของ 4-8 ชิ้น แบ่ง 2, 3 หรือ 4 คน =================
  {
    id: 'k2-1',
    grade: 'K2',
    levelNumber: 1,
    title: 'ด่าน 1: สตรอว์เบอร์รีหวานฉ่ำ',
    itemName: 'สตรอว์เบอร์รี',
    itemEmoji: '🍓',
    totalItems: 6,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องฟ้าใส', avatar: '👧' },
      { id: 'f2', name: 'น้องภูผา', avatar: '👦' },
      { id: 'f3', name: 'น้องมะลิ', avatar: '👧' },
    ],
    lessonPrompt: 'มีสตรอว์เบอร์รี 6 ผล แบ่งให้เพื่อน 3 คน คนละ 2 ผลเท่ากันนะจ๊ะ',
  },
  {
    id: 'k2-2',
    grade: 'K2',
    levelNumber: 2,
    title: 'ด่าน 2: สีเทียนศิลปะแสนสนุก',
    itemName: 'สีเทียน',
    itemEmoji: '🖍️',
    totalItems: 6,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'น้องวิน', avatar: '👦' },
      { id: 'f2', name: 'น้องมายด์', avatar: '👧' },
    ],
    lessonPrompt: 'สีเทียน 6 แท่ง แบ่งวาดภาพ 2 คน แบ่งคนละ 3 แท่งนะคนเก่ง',
  },
  {
    id: 'k2-3',
    grade: 'K2',
    levelNumber: 3,
    title: 'ด่าน 3: กล้วยหอมของเจ้าจ๋อ',
    itemName: 'กล้วยหอม',
    itemEmoji: '🍌',
    totalItems: 6,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'ลิงจิ๋ว', avatar: '🐵' },
      { id: 'f2', name: 'ช้างน้อย', avatar: '🐘' },
      { id: 'f3', name: 'แพนด้า', avatar: '🐼' },
    ],
    lessonPrompt: 'มีกล้วย 6 ผล แบ่งให้เพื่อนสัตว์ 3 ตัว ตัวละ 2 ผลเท่าๆ กันจ้า',
  },
  {
    id: 'k2-4',
    grade: 'K2',
    levelNumber: 4,
    title: 'ด่าน 4: แบ่งชิ้นพิซซ่าเตาถ่าน',
    itemName: 'ชิ้นพิซซ่า',
    itemEmoji: '🍕',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องพีช', avatar: '👦' },
      { id: 'f2', name: 'น้องมิน', avatar: '👧' },
    ],
    lessonPrompt: 'พิซซ่า 4 ชิ้น แบ่งทานด้วยกัน 2 คน คนละ 2 ชิ้นอิ่มอร่อย',
  },
  {
    id: 'k2-5',
    grade: 'K2',
    levelNumber: 5,
    title: 'ด่าน 5: แบ่งผลแอปเปิ้ลเขียว',
    itemName: 'แอปเปิ้ลเขียว',
    itemEmoji: '🍏',
    totalItems: 8,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องข้าวปั้น', avatar: '👦' },
      { id: 'f2', name: 'น้องใบเตย', avatar: '👧' },
      { id: 'f3', name: 'น้องกัส', avatar: '👦' },
      { id: 'f4', name: 'น้องพิมพ์', avatar: '👧' },
    ],
    lessonPrompt: 'มีแอปเปิ้ลเขียว 8 ผล แบ่งให้เพื่อน 4 คน คนละ 2 ผลอย่างยุติธรรม',
  },
  {
    id: 'k2-6',
    grade: 'K2',
    levelNumber: 6,
    title: 'ด่าน 6: แบ่งคัพเค้กวานิลลา',
    itemName: 'คัพเค้ก',
    itemEmoji: '🧁',
    totalItems: 6,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องแอนดี้', avatar: '👦' },
      { id: 'f2', name: 'น้องโบว์', avatar: '👧' },
      { id: 'f3', name: 'น้องซี', avatar: '👦' },
    ],
    lessonPrompt: 'คัพเค้ก 6 ถ้วย แบ่งให้เพื่อน 3 คน คนละ 2 ถ้วยเท่ากันพอดี',
  },
  {
    id: 'k2-7',
    grade: 'K2',
    levelNumber: 7,
    title: 'ด่าน 7: แบ่งดินสอไม้ขีดเขียน',
    itemName: 'ดินสอไม้',
    itemEmoji: '✏️',
    totalItems: 6,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'น้องปอนด์', avatar: '👦' },
      { id: 'f2', name: 'น้องป่าน', avatar: '👧' },
    ],
    lessonPrompt: 'ดินสอ 6 แท่ง แบ่งทำการบ้าน 2 คน คนละ 3 แท่งนะจ๊ะ',
  },
  {
    id: 'k2-8',
    grade: 'K2',
    levelNumber: 8,
    title: 'ด่าน 8: แบ่งผลส้มโอหวานฉ่ำ',
    itemName: 'ผลส้ม',
    itemEmoji: '🍊',
    totalItems: 8,
    targetPerFriend: 4,
    friends: [
      { id: 'f1', name: 'พี่ยีราฟ', avatar: '🦒' },
      { id: 'f2', name: 'พี่ม้าลาย', avatar: '🦓' },
    ],
    lessonPrompt: 'มีส้ม 8 ผล แบ่งให้เพื่อนสัตว์ 2 ตัว ตัวละ 4 ผลอิ่มอร่อย',
  },
  {
    id: 'k2-9',
    grade: 'K2',
    levelNumber: 9,
    title: 'ด่าน 9: แบ่งลูกโป่งงานวันเด็ก',
    itemName: 'ลูกโป่ง',
    itemEmoji: '🎈',
    totalItems: 6,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องแทน', avatar: '👦' },
      { id: 'f2', name: 'น้องทราย', avatar: '👧' },
      { id: 'f3', name: 'น้องทับทิม', avatar: '👧' },
    ],
    lessonPrompt: 'ลูกโป่ง 6 ลูก แบ่งให้เพื่อน 3 คน คนละ 2 ลูกสดใสเบิกบาน',
  },
  {
    id: 'k2-10',
    grade: 'K2',
    levelNumber: 10,
    title: 'ด่าน 10: แบ่งขนมปังฝรั่งเศส',
    itemName: 'ขนมปัง',
    itemEmoji: '🥖',
    totalItems: 4,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'คุณพ่อ', avatar: '👨' },
      { id: 'f2', name: 'คุณแม่', avatar: '👩' },
    ],
    lessonPrompt: 'ขนมปัง 4 ชิ้น แบ่งให้คุณพ่อและคุณแม่คนละ 2 ชิ้นกตัญญูน่ารัก',
  },
  {
    id: 'k2-11',
    grade: 'K2',
    levelNumber: 11,
    title: 'ด่าน 11: แบ่งแซนด์วิชทูน่า',
    itemName: 'แซนด์วิช',
    itemEmoji: '🥪',
    totalItems: 6,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'เพื่อนกลุ่มดาว', avatar: '⭐' },
      { id: 'f2', name: 'เพื่อนกลุ่มจันทร์', avatar: '🌙' },
      { id: 'f3', name: 'เพื่อนกลุ่มอาทิตย์', avatar: '☀️' },
    ],
    lessonPrompt: 'แซนด์วิช 6 ชิ้น แบ่งให้ 3 กลุ่ม กลุ่มละ 2 ชิ้นทานพร้อมกัน',
  },
  {
    id: 'k2-12',
    grade: 'K2',
    levelNumber: 12,
    title: 'ด่าน 12: แบ่งกล่องนมช็อกโกแลต',
    itemName: 'นมกล่อง',
    itemEmoji: '🧃',
    totalItems: 8,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องนัท', avatar: '👦' },
      { id: 'f2', name: 'น้องแนน', avatar: '👧' },
      { id: 'f3', name: 'น้องนนท์', avatar: '👦' },
      { id: 'f4', name: 'น้องน้ำ', avatar: '👧' },
    ],
    lessonPrompt: 'นม 8 กล่อง แบ่งให้เพื่อน 4 คน คนละ 2 กล่องดื่มตอนพักเบรก',
  },
  {
    id: 'k2-13',
    grade: 'K2',
    levelNumber: 13,
    title: 'ด่าน 13: แบ่งแตงโมคลายร้อน',
    itemName: 'ชิ้นแตงโม',
    itemEmoji: '🍉',
    totalItems: 6,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'น้องมีนา', avatar: '👧' },
      { id: 'f2', name: 'น้องเมฆ', avatar: '👦' },
    ],
    lessonPrompt: 'แตงโม 6 ชิ้น แบ่งทานแก้ร้อน 2 คน คนละ 3 ชิ้นหวานฉ่ำ',
  },
  {
    id: 'k2-14',
    grade: 'K2',
    levelNumber: 14,
    title: 'ด่าน 14: แบ่งลูกท้อผลไม้มงคล',
    itemName: 'ผลท้อ',
    itemEmoji: '🍑',
    totalItems: 6,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'ลูกกระรอก', avatar: '🐿️' },
      { id: 'f2', name: 'ลูกกวาง', avatar: '🦌' },
      { id: 'f3', name: 'ลูกนก', avatar: '🐦' },
    ],
    lessonPrompt: 'ลูกท้อ 6 ผล แบ่งเพื่อนสัตว์ป่า 3 ตัว ตัวละ 2 ผลอย่างอบอุ่น',
  },
  {
    id: 'k2-15',
    grade: 'K2',
    levelNumber: 15,
    title: 'ด่าน 15: แบ่งดอกไม้จัดแจกัน',
    itemName: 'ดอกไม้',
    itemEmoji: '💐',
    totalItems: 8,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'แจกันครูประจำชั้น', avatar: '👩‍🏫' },
      { id: 'f2', name: 'แจกันห้องสมุด', avatar: '📚' },
      { id: 'f3', name: 'แจกันห้องพยาบาล', avatar: '🏥' },
      { id: 'f4', name: 'แจกันหน้าห้อง', avatar: '🚪' },
    ],
    lessonPrompt: 'ดอกไม้ 8 ช่อ แบ่งประดับ 4 จุด จุดละ 2 ช่อสวยงามทั่วโรงเรียน',
  },
  {
    id: 'k2-16',
    grade: 'K2',
    levelNumber: 16,
    title: 'ด่าน 16: แบ่งชิ้นวาฟเฟิลกรอบ',
    itemName: 'วาฟเฟิล',
    itemEmoji: '🧇',
    totalItems: 6,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องออย', avatar: '👧' },
      { id: 'f2', name: 'น้องอาร์ต', avatar: '👦' },
      { id: 'f3', name: 'น้องอุ้ม', avatar: '👧' },
    ],
    lessonPrompt: 'วาฟเฟิล 6 ชิ้น แบ่งให้เพื่อน 3 คน คนละ 2 ชิ้นหอมเนยจ้า',
  },
  {
    id: 'k2-17',
    grade: 'K2',
    levelNumber: 17,
    title: 'ด่าน 17: แบ่งผลลูกแพร์สีทอง',
    itemName: 'ลูกแพร์',
    itemEmoji: '🍐',
    totalItems: 6,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'น้องเคน', avatar: '👦' },
      { id: 'f2', name: 'น้องเค้ก', avatar: '👧' },
    ],
    lessonPrompt: 'ลูกแพร์ 6 ผล แบ่งให้เพื่อนรัก 2 คน คนละ 3 ผลเท่าๆ กัน',
  },
  {
    id: 'k2-18',
    grade: 'K2',
    levelNumber: 18,
    title: 'ด่าน 18: แบ่งช็อกโกแลตบาร์',
    itemName: 'ช็อกโกแลต',
    itemEmoji: '🍫',
    totalItems: 8,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องบอย', avatar: '👦' },
      { id: 'f2', name: 'น้องเบลล์', avatar: '👧' },
      { id: 'f3', name: 'น้องบีม', avatar: '👦' },
      { id: 'f4', name: 'น้องโบ', avatar: '👧' },
    ],
    lessonPrompt: 'ช็อกโกแลต 8 ชิ้น แบ่งเพื่อน 4 คน คนละ 2 ชิ้นหวานอร่อย',
  },
  {
    id: 'k2-19',
    grade: 'K2',
    levelNumber: 19,
    title: 'ด่าน 19: แบ่งลูกอมเยลลี่ผลไม้',
    itemName: 'เยลลี่',
    itemEmoji: '🍬',
    totalItems: 8,
    targetPerFriend: 4,
    friends: [
      { id: 'f1', name: 'น้องจัสติน', avatar: '👦' },
      { id: 'f2', name: 'น้องจอย', avatar: '👧' },
    ],
    lessonPrompt: 'เยลลี่ 8 เม็ด แบ่งให้เพื่อน 2 คน คนละ 4 เม็ดเคี้ยวหนึบหนับ',
  },
  {
    id: 'k2-20',
    grade: 'K2',
    levelNumber: 20,
    title: 'ด่าน 20: ถ้วยรางวัลแห่งมิตรภาพ 20 ด่าน',
    itemName: 'เหรียญทอง',
    itemEmoji: '🥇',
    totalItems: 6,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'ทีมสีแดง', avatar: '🔴' },
      { id: 'f2', name: 'ทีมสีเขียว', avatar: '🟢' },
      { id: 'f3', name: 'ทีมสีฟ้า', avatar: '🔵' },
    ],
    lessonPrompt: 'ด่าน 20 K2! มอบเหรียญทองแห่งน้ำใจ 6 เหรียญ ให้ 3 ทีม ทีมละ 2 เหรียญเท่ากันเป๊ะ!',
  },

  // ================= K3 (อ.3) - 5-6 ปี: ของ 6-12 ชิ้น แบ่ง 2, 3, 4 หรือ 5 คน =================
  {
    id: 'k3-1',
    grade: 'K3',
    levelNumber: 1,
    title: 'ด่าน 1: ขนมคัพเค้กงานเลี้ยง',
    itemName: 'คัพเค้ก',
    itemEmoji: '🧁',
    totalItems: 8,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องต้นหม่อน', avatar: '👧' },
      { id: 'f2', name: 'น้องไหมมุก', avatar: '👧' },
      { id: 'f3', name: 'น้องภัทร', avatar: '👦' },
      { id: 'f4', name: 'น้องกันต์', avatar: '👦' },
    ],
    lessonPrompt: 'คัพเค้ก 8 ถ้วย แบ่งให้เพื่อน 4 คน คนละ 2 ถ้วยอย่างเป็นธรรม',
  },
  {
    id: 'k3-2',
    grade: 'K3',
    levelNumber: 2,
    title: 'ด่าน 2: บล็อกไม้สร้างเมืองร่วมใจ',
    itemName: 'บล็อกไม้',
    itemEmoji: '🧱',
    totalItems: 9,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'ทีมสีแดง', avatar: '🔴' },
      { id: 'f2', name: 'ทีมสีน้ำเงิน', avatar: '🔵' },
      { id: 'f3', name: 'ทีมสีเขียว', avatar: '🟢' },
    ],
    lessonPrompt: 'บล็อกไม้ 9 ชิ้น แบ่ง 3 ทีม ช่วยกันต่อเมืองในฝันคนละ 3 ชิ้น',
  },
  {
    id: 'k3-3',
    grade: 'K3',
    levelNumber: 3,
    title: 'ด่าน 3: ส้มโอหวานฉ่ำผลไม้มิตรภาพ',
    itemName: 'ส้มผลใหญ่',
    itemEmoji: '🍊',
    totalItems: 8,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องพีช', avatar: '👦' },
      { id: 'f2', name: 'น้องมิน', avatar: '👧' },
      { id: 'f3', name: 'น้องโอ๊ค', avatar: '👦' },
      { id: 'f4', name: 'น้องเนย', avatar: '👧' },
    ],
    lessonPrompt: 'ส้ม 8 ผล แบ่งให้เพื่อน 4 คนอย่างเท่าเทียมและมีน้ำใจคนละ 2 ผล',
  },
  {
    id: 'k3-4',
    grade: 'K3',
    levelNumber: 4,
    title: 'ด่าน 4: ข้าวปั้นซูชิงวดเบรก',
    itemName: 'ข้าวปั้นซูชิ',
    itemEmoji: '🍣',
    totalItems: 9,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'น้องท็อป', avatar: '👦' },
      { id: 'f2', name: 'น้องทิพย์', avatar: '👧' },
      { id: 'f3', name: 'น้องเท็น', avatar: '👦' },
    ],
    lessonPrompt: 'ข้าวปั้น 9 ชิ้น แบ่ง 3 คน คนละ 3 ชิ้นอิ่มอร่อยได้สารอาหารครบถ้วน',
  },
  {
    id: 'k3-5',
    grade: 'K3',
    levelNumber: 5,
    title: 'ด่าน 5: แบ่งหนังสือการ์ตูนนิทาน',
    itemName: 'หนังสือนิทาน',
    itemEmoji: '📚',
    totalItems: 8,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'มุมอ่านหนังสือ 1', avatar: '📖' },
      { id: 'f2', name: 'มุมอ่านหนังสือ 2', avatar: '🧸' },
      { id: 'f3', name: 'มุมอ่านหนังสือ 3', avatar: '🎨' },
      { id: 'f4', name: 'มุมอ่านหนังสือ 4', avatar: '🔬' },
    ],
    lessonPrompt: 'หนังสือนิทาน 8 เล่ม จัดเข้า 4 มุมห้องเรียน มุมละ 2 เล่มเพื่อแบ่งปันกันอ่าน',
  },
  {
    id: 'k3-6',
    grade: 'K3',
    levelNumber: 6,
    title: 'ด่าน 6: แบ่งขนมปังครัวซองต์เนยสด',
    itemName: 'ครัวซองต์',
    itemEmoji: '🥐',
    totalItems: 10,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องข้าวเจ้า', avatar: '👧' },
      { id: 'f2', name: 'น้องข้าวสวย', avatar: '👧' },
      { id: 'f3', name: 'น้องข้าวตัง', avatar: '👦' },
      { id: 'f4', name: 'น้องข้าวเหนียว', avatar: '👦' },
      { id: 'f5', name: 'น้องข้าวต้ม', avatar: '👦' },
    ],
    lessonPrompt: 'ครัวซองต์ 10 ชิ้น แบ่งเพื่อน 5 คน คนละ 2 ชิ้นเท่ากันพอดิบพอดี',
  },
  {
    id: 'k3-7',
    grade: 'K3',
    levelNumber: 7,
    title: 'ด่าน 7: แบ่งชิ้นแตงโมปิกนิกสวนสัตว์',
    itemName: 'ชิ้นแตงโม',
    itemEmoji: '🍉',
    totalItems: 12,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'พี่ช้าง', avatar: '🐘' },
      { id: 'f2', name: 'พี่ยีราฟ', avatar: '🦒' },
      { id: 'f3', name: 'พี่ม้าลาย', avatar: '🦓' },
      { id: 'f4', name: 'พี่ฮิปโป', avatar: '🦛' },
    ],
    lessonPrompt: 'แตงโม 12 ชิ้น เลี้ยงเพื่อนสัตว์ 4 ตัว ตัวละ 3 ชิ้นหวานฉ่ำชื่นใจ',
  },
  {
    id: 'k3-8',
    grade: 'K3',
    levelNumber: 8,
    title: 'ด่าน 8: แบ่งสีน้ำวาดภาพธรรมชาติ',
    itemName: 'หลอดสีน้ำ',
    itemEmoji: '🎨',
    totalItems: 9,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'จิตรกรน้อยพลอย', avatar: '👧' },
      { id: 'f2', name: 'จิตรกรน้อยเพชร', avatar: '👦' },
      { id: 'f3', name: 'จิตรกรน้อยพู่กัน', avatar: '👦' },
    ],
    lessonPrompt: 'สีน้ำ 9 หลอด แบ่ง 3 คน คนละ 3 หลอด วาดภาพประกวดร่วมกัน',
  },
  {
    id: 'k3-9',
    grade: 'K3',
    levelNumber: 9,
    title: 'ด่าน 9: แบ่งผลแอปเปิ้ลฟูจิ',
    itemName: 'แอปเปิ้ล',
    itemEmoji: '🍎',
    totalItems: 12,
    targetPerFriend: 4,
    friends: [
      { id: 'f1', name: 'น้องการ์ตูน', avatar: '👧' },
      { id: 'f2', name: 'น้องเกม', avatar: '👦' },
      { id: 'f3', name: 'น้องกีต้าร์', avatar: '👦' },
    ],
    lessonPrompt: 'แอปเปิ้ล 12 ผล แบ่งให้เพื่อนรัก 3 คน คนละ 4 ผลสุขภาพดีแข็งแรง',
  },
  {
    id: 'k3-10',
    grade: 'K3',
    levelNumber: 10,
    title: 'ด่าน 10: แบ่งแฮมเบอร์เกอร์มินิ',
    itemName: 'เบอร์เกอร์',
    itemEmoji: '🍔',
    totalItems: 8,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องจัสติน', avatar: '👦' },
      { id: 'f2', name: 'น้องเจนนี่', avatar: '👧' },
      { id: 'f3', name: 'น้องเจมส์', avatar: '👦' },
      { id: 'f4', name: 'น้องจอย', avatar: '👧' },
    ],
    lessonPrompt: 'เบอร์เกอร์ 8 ชิ้น แบ่ง 4 คน คนละ 2 ชิ้นรับประทานร่วมกันในปาร์ตี้',
  },
  {
    id: 'k3-11',
    grade: 'K3',
    levelNumber: 11,
    title: 'ด่าน 11: แบ่งผลไม้ส้มโอและกีวี',
    itemName: 'ผลกีวี',
    itemEmoji: '🥝',
    totalItems: 10,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องวินเนอร์', avatar: '👦' },
      { id: 'f2', name: 'น้องวิว', avatar: '👧' },
      { id: 'f3', name: 'น้องวา', avatar: '👧' },
      { id: 'f4', name: 'น้องเวียร์', avatar: '👦' },
      { id: 'f5', name: 'น้องวาวา', avatar: '👧' },
    ],
    lessonPrompt: 'กีวี 10 ผล วิตามินซีสูง แบ่งเพื่อน 5 คน คนละ 2 ผลอย่างยุติธรรม',
  },
  {
    id: 'k3-12',
    grade: 'K3',
    levelNumber: 12,
    title: 'ด่าน 12: แบ่งลูกบอลเทนนิสฝึกซ้อม',
    itemName: 'ลูกเทนนิส',
    itemEmoji: '🎾',
    totalItems: 12,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'คอร์ท 1', avatar: '👦' },
      { id: 'f2', name: 'คอร์ท 2', avatar: '👧' },
      { id: 'f3', name: 'คอร์ท 3', avatar: '👦' },
      { id: 'f4', name: 'คอร์ท 4', avatar: '👧' },
    ],
    lessonPrompt: 'ลูกเทนนิส 12 ลูก แบ่ง 4 สนาม สนามละ 3 ลูก ฝึกซ้อมออกกำลังกาย',
  },
  {
    id: 'k3-13',
    grade: 'K3',
    levelNumber: 13,
    title: 'ด่าน 13: แบ่งชิ้นพิซซ่าถาดใหญ่',
    itemName: 'พิซซ่า',
    itemEmoji: '🍕',
    totalItems: 10,
    targetPerFriend: 5,
    friends: [
      { id: 'f1', name: 'พี่ชายคนโต', avatar: '👦' },
      { id: 'f2', name: 'น้องสาวคนเล็ก', avatar: '👧' },
    ],
    lessonPrompt: 'พิซซ่า 10 ชิ้น แบ่งให้สองพี่น้องรักใคร่กัน คนละ 5 ชิ้นอิ่มหนำสำราญ',
  },
  {
    id: 'k3-14',
    grade: 'K3',
    levelNumber: 14,
    title: 'ด่าน 14: แบ่งช่อดอกไม้ไหว้ครู',
    itemName: 'ช่อดอกไม้',
    itemEmoji: '💐',
    totalItems: 9,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'คุณครูประจำชั้น', avatar: '👩‍🏫' },
      { id: 'f2', name: 'คุณครูสอนศิลปะ', avatar: '🎨' },
      { id: 'f3', name: 'คุณครูสอนดนตรี', avatar: '🎵' },
    ],
    lessonPrompt: 'ช่อดอกไม้ 9 ช่อ นำไปไหว้คุณครู 3 ท่าน ท่านละ 3 ช่อแสดงความเคารพ',
  },
  {
    id: 'k3-15',
    grade: 'K3',
    levelNumber: 15,
    title: 'ด่าน 15: แบ่งกล่องของขวัญจับฉลาก',
    itemName: 'กล่องของขวัญ',
    itemEmoji: '🎁',
    totalItems: 12,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'โต๊ะที่ 1', avatar: '🔴' },
      { id: 'f2', name: 'โต๊ะที่ 2', avatar: '🔵' },
      { id: 'f3', name: 'โต๊ะที่ 3', avatar: '🟢' },
      { id: 'f4', name: 'โต๊ะที่ 4', avatar: '🟡' },
    ],
    lessonPrompt: 'ของขวัญ 12 กล่อง แจกให้ 4 โต๊ะ โต๊ะละ 3 กล่อง สร้างความสุขวันปีใหม่',
  },
  {
    id: 'k3-16',
    grade: 'K3',
    levelNumber: 16,
    title: 'ด่าน 16: แบ่งซาลาเปานึ่งร้อนๆ',
    itemName: 'ซาลาเปา',
    itemEmoji: '🥟',
    totalItems: 10,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'น้องปังปอนด์', avatar: '👦' },
      { id: 'f2', name: 'น้องเปีย', avatar: '👧' },
      { id: 'f3', name: 'น้องปอ', avatar: '👦' },
      { id: 'f4', name: 'น้องปุ๊ก', avatar: '👧' },
      { id: 'f5', name: 'น้องปิ๊ก', avatar: '👦' },
    ],
    lessonPrompt: 'ซาลาเปา 10 ลูก แบ่งเพื่อน 5 คน คนละ 2 ลูกนุ่มฟูอร่อย',
  },
  {
    id: 'k3-17',
    grade: 'K3',
    levelNumber: 17,
    title: 'ด่าน 17: แบ่งลูกเบอร์รี่สดจากไร่',
    itemName: 'บลูเบอร์รี่',
    itemEmoji: '🫐',
    totalItems: 12,
    targetPerFriend: 4,
    friends: [
      { id: 'f1', name: 'กระรอกน้อย', avatar: '🐿️' },
      { id: 'f2', name: 'กระต่ายป่า', avatar: '🐇' },
      { id: 'f3', name: 'ลูกกวางดาว', avatar: '🦌' },
    ],
    lessonPrompt: 'บลูเบอร์รี่ 12 ผล แบ่งสัตว์ป่า 3 ตัว ตัวละ 4 ผลบำรุงสายตา',
  },
  {
    id: 'k3-18',
    grade: 'K3',
    levelNumber: 18,
    title: 'ด่าน 18: แบ่งแท่งไอติมผลไม้แท้',
    itemName: 'ไอศกรีมผลไม้',
    itemEmoji: '🍧',
    totalItems: 12,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'น้องภูผา', avatar: '👦' },
      { id: 'f2', name: 'น้องธารา', avatar: '👧' },
      { id: 'f3', name: 'น้องเวหา', avatar: '👦' },
      { id: 'f4', name: 'น้องคีรี', avatar: '👧' },
    ],
    lessonPrompt: 'ไอศกรีมผลไม้ 12 ถ้วย แบ่ง 4 คน คนละ 3 ถ้วยสดชื่นใจหลังเล่นกีฬา',
  },
  {
    id: 'k3-19',
    grade: 'K3',
    levelNumber: 19,
    title: 'ด่าน 19: แบ่งอุปกรณ์ปลูกต้นไม้',
    itemName: 'ต้นกล้าดอกไม้',
    itemEmoji: '🌱',
    totalItems: 10,
    targetPerFriend: 2,
    friends: [
      { id: 'f1', name: 'แปลงผักที่ 1', avatar: '🌻' },
      { id: 'f2', name: 'แปลงผักที่ 2', avatar: '🌷' },
      { id: 'f3', name: 'แปลงผักที่ 3', avatar: '🌹' },
      { id: 'f4', name: 'แปลงผักที่ 4', avatar: '🌼' },
      { id: 'f5', name: 'แปลงผักที่ 5', avatar: '🪷' },
    ],
    lessonPrompt: 'ต้นกล้า 10 ต้น ปลูกลง 5 แปลง แปลงละ 2 ต้น เพิ่มพื้นที่สีเขียวให้โรงเรียน',
  },
  {
    id: 'k3-20',
    grade: 'K3',
    levelNumber: 20,
    title: 'ด่าน 20: ถ้วยเกียรติยศแห่งการแบ่งปันสูงสุด 20 ด่าน',
    itemName: 'ถ้วยเกียรติยศ',
    itemEmoji: '🏆',
    totalItems: 12,
    targetPerFriend: 3,
    friends: [
      { id: 'f1', name: 'ตัวแทนชั้น อ.1', avatar: '🐥' },
      { id: 'f2', name: 'ตัวแทนชั้น อ.2', avatar: '🐰' },
      { id: 'f3', name: 'ตัวแทนชั้น อ.3', avatar: '🦁' },
      { id: 'f4', name: 'คุณครูใหญ่', avatar: '🏫' },
    ],
    lessonPrompt: 'ด่าน 20 แชมเปี้ยน K3! แบ่งถ้วยรางวัลแห่งมิตรภาพ 12 ถ้วย ให้ 4 ฝ่าย ฝ่ายละ 3 ถ้วยเท่าเทียมสมบูรณ์แบบ!',
  },
];

export const SocialSharingView: React.FC<SocialSharingViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const [levelIndex, setLevelIndex] = useState(0);

  const gradeLevels = useMemo(() => {
    const list = SHARING_LEVELS.filter((l) => l.grade === currentGrade);
    return list.length > 0 ? list : SHARING_LEVELS;
  }, [currentGrade]);

  const activeLevel = gradeLevels[levelIndex] || gradeLevels[0];

  // Track how many items each friend has received
  const [friendAllocations, setFriendAllocations] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize allocations on level change
  useEffect(() => {
    const initial: Record<string, number> = {};
    activeLevel.friends.forEach((f) => {
      initial[f.id] = 0;
    });
    setFriendAllocations(initial);
    setIsCompleted(false);

    if (soundVolume > 0) {
      speakText(activeLevel.lessonPrompt, 'th', soundVolume);
    }
  }, [activeLevel, soundVolume]);

  // Count items given so far
  const totalGiven = useMemo(() => {
    return Object.values(friendAllocations).reduce((sum: number, n: number) => sum + n, 0);
  }, [friendAllocations]);

  const itemsRemaining = activeLevel.totalItems - totalGiven;

  // Check if each friend has exactly targetPerFriend
  const isFairlyShared = useMemo(() => {
    return (
      itemsRemaining === 0 &&
      activeLevel.friends.every((f) => friendAllocations[f.id] === activeLevel.targetPerFriend)
    );
  }, [itemsRemaining, activeLevel, friendAllocations]);

  // Give item to friend
  const handleGiveItemToFriend = (friendId: string) => {
    if (isCompleted || itemsRemaining <= 0) return;

    soundEffects.playTap(soundVolume);
    setFriendAllocations((prev) => {
      const nextCount = (prev[friendId] || 0) + 1;
      const updated = { ...prev, [friendId]: nextCount };

      const newGiven = Object.values(updated).reduce((s: number, n: number) => s + n, 0);
      if (newGiven === activeLevel.totalItems) {
        // All items placed! Check fairness
        const isFair = activeLevel.friends.every(
          (f) => updated[f.id] === activeLevel.targetPerFriend
        );

        if (isFair) {
          setIsCompleted(true);
          soundEffects.playVictory(soundVolume);
          if (onEarnStar) onEarnStar();
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
          speakText(
            `ยอดเยี่ยมมากจ้า! แบ่ง ${activeLevel.itemName} ให้เพื่อนๆ คนละ ${activeLevel.targetPerFriend} เท่ากันเป๊ะเลย! มีน้ำใจสุดๆ!`,
            'th',
            soundVolume
          );
        } else {
          soundEffects.playIncorrect(soundVolume);
          speakText(
            `เอ๊ะ... ยังแบ่งไม่เท่ากันนะจ๊ะ ลองแตะนำของคืนแล้วแบ่งให้เท่ากันคนละ ${activeLevel.targetPerFriend} อันนะ`,
            'th',
            soundVolume
          );
        }
      }

      return updated;
    });
  };

  // Return item from friend if child wants to adjust
  const handleReturnItem = (friendId: string) => {
    if (isCompleted) return;
    if ((friendAllocations[friendId] || 0) <= 0) return;

    soundEffects.playTap(soundVolume);
    setFriendAllocations((prev) => ({
      ...prev,
      [friendId]: Math.max(0, (prev[friendId] || 0) - 1),
    }));
  };

  const handleReset = () => {
    soundEffects.playTap(soundVolume);
    const initial: Record<string, number> = {};
    activeLevel.friends.forEach((f) => {
      initial[f.id] = 0;
    });
    setFriendAllocations(initial);
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
        levels={gradeLevels.map((l) => ({ level: l.levelNumber, name: l.title }))}
        currentLevel={levelIndex + 1}
        onSelectLevel={(num) => setLevelIndex(num - 1)}
        accentColor="violet"
        prefix="ด่าน"
      />

      {/* Game Card Container */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-6 border-2 border-violet-200 shadow-sm flex flex-col items-center gap-4">
        {/* Header & Prompt */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-violet-100 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 border border-violet-300 flex items-center justify-center text-2xl shadow-2xs">
              🤝
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-violet-950">
                {activeLevel.title}
              </h2>
              <p className="text-xs sm:text-sm text-violet-800 font-bold">
                {activeLevel.lessonPrompt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => speakText(activeLevel.lessonPrompt, 'th', soundVolume)}
              className="p-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 transition-colors cursor-pointer"
              title="ฟังเสียงคำสั่งอีกครั้ง"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              title="เริ่มแบ่งใหม่"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>เริ่มใหม่</span>
            </button>
          </div>
        </div>

        {/* Central Tray: Items to be Shared */}
        <div className="w-full bg-gradient-to-r from-violet-50 to-pink-50 border-2 border-dashed border-violet-300 rounded-3xl p-4 flex flex-col items-center gap-2">
          <div className="text-xs font-black text-violet-900 flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-violet-600" />
            <span>ถาดของขวัญมิตรภาพ: เหลือ {itemsRemaining} จากทั้งหมด {activeLevel.totalItems} ชิ้น</span>
          </div>

          {/* Visual Remaining Items Tray */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 min-h-[56px] py-1">
            {itemsRemaining > 0 ? (
              Array.from({ length: itemsRemaining }).map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-white rounded-2xl border-2 border-violet-200 shadow-2xs flex items-center justify-center text-3xl animate-in zoom-in-50 duration-200 hover:scale-110 transition-transform"
                >
                  <span>{activeLevel.itemEmoji}</span>
                </div>
              ))
            ) : (
              <div className="text-xs font-black text-emerald-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-emerald-300 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>แบ่งของในถาดครบแล้ว! ตรวจสอบความเท่าเทียมด้านล่างได้เลย</span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            แตะที่ช่องเพื่อนด้านล่างเพื่อแบ่ง {activeLevel.itemName} ให้เพื่อนคนละ {activeLevel.targetPerFriend} ชิ้นเท่ากัน
          </div>
        </div>

        {/* Target Friends Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {activeLevel.friends.map((friend) => {
            const count = friendAllocations[friend.id] || 0;
            const isFriendTargetReached = count === activeLevel.targetPerFriend;
            const isOverTarget = count > activeLevel.targetPerFriend;

            return (
              <div
                key={friend.id}
                className={`p-3.5 rounded-3xl border-3 flex flex-col items-center justify-between gap-2.5 transition-all text-center relative ${
                  isFriendTargetReached
                    ? 'bg-emerald-50/70 border-emerald-400 ring-4 ring-emerald-100 shadow-xs'
                    : isOverTarget
                    ? 'bg-rose-50/70 border-rose-300'
                    : 'bg-white border-slate-200 hover:border-violet-300 shadow-2xs'
                }`}
              >
                {/* Friend Avatar & Name */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 bg-white rounded-2xl border-2 border-slate-200 flex items-center justify-center text-3xl shadow-2xs">
                    <span>{friend.avatar}</span>
                  </div>
                  <div className="font-black text-sm text-slate-800">{friend.name}</div>
                  <div className="text-[11px] font-bold text-slate-500">
                    ได้รับแล้ว: <span className="font-black text-violet-700 text-xs">{count}</span> / {activeLevel.targetPerFriend} ชิ้น
                  </div>
                </div>

                {/* Items received visual slot */}
                <div className="w-full bg-slate-100/80 rounded-2xl p-2 min-h-[48px] flex flex-wrap items-center justify-center gap-1.5 border border-slate-200/80">
                  {count > 0 ? (
                    Array.from({ length: count }).map((_, idx) => (
                      <span
                        key={idx}
                        className="text-2xl animate-in zoom-in-75 duration-150 cursor-pointer"
                        title="แตะเพื่อนำของคืนเข้าถาด"
                        onClick={() => handleReturnItem(friend.id)}
                      >
                        {activeLevel.itemEmoji}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">ยังไม่ได้รับ</span>
                  )}
                </div>

                {/* Allocation Action Button */}
                <div className="w-full flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleGiveItemToFriend(friend.id)}
                    disabled={isCompleted || itemsRemaining <= 0}
                    className="flex-1 py-2 px-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-95 disabled:opacity-40 text-white font-black text-xs transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>+ แบ่งให้</span>
                  </button>
                  {count > 0 && !isCompleted && (
                    <button
                      type="button"
                      onClick={() => handleReturnItem(friend.id)}
                      className="py-2 px-2 rounded-xl bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-600 font-bold text-xs transition-all cursor-pointer"
                      title="นำของคืน 1 ชิ้น"
                    >
                      คืน
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion & Next Level Card */}
        {isCompleted && (
          <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🌟</span>
              <div>
                <div className="font-black text-emerald-950 text-sm sm:text-base">
                  ยินดีด้วยจ้า! แบ่งปันอย่างเป็นธรรมสำเร็จ +1 ดาว ⭐
                </div>
                <div className="text-xs text-emerald-700 font-medium mt-0.5">
                  เพื่อนๆ ทุกคนยิ้มแย้มมีความสุข ขอบคุณน้ำใจของหนูนะจ๊ะ
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextLevel}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              <span>ด่านถัดไป</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Educational Kindness Note */}
        <div className="w-full bg-violet-50/80 border border-violet-200 rounded-2xl p-3 flex items-start gap-2 text-xs text-violet-900 font-medium">
          <Heart className="w-4 h-4 text-violet-600 shrink-0 mt-0.5 fill-violet-200" />
          <span>
            <strong>ทักษะสังคมที่ได้ฝึก:</strong> การแบ่งปัน (Sharing) และความยุติธรรมเท่าเทียม (Fairness) ช่วยให้เด็กเรียนรู้การอยู่ร่วมกับผู้อื่นในสังคมและห้องเรียนอย่างมีความสุข รู้จักคิดถึงใจเขาใจเรา
          </span>
        </div>
      </div>
    </div>
  );
};
