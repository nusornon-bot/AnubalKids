import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grade } from '../../types';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  Brain,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Target,
  Trophy,
  ArrowRight,
  Flame,
  Search,
} from 'lucide-react';

interface EFFocusDistractionViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
  gameStartedKey?: number;
}

interface FocusItem {
  id: string;
  emoji: string;
  isTarget: boolean;
  name: string;
  isCollected?: boolean;
}

interface FocusRound {
  id: string;
  title: string;
  targetEmoji: string;
  targetName: string;
  targetCount: number;
  instruction: string;
  themeColor: string;
  distractors: { emoji: string; name: string }[];
}

const FOCUS_ROUNDS_CONFIG: Partial<Record<Grade, FocusRound[]>> & { K1: FocusRound[]; K2: FocusRound[]; K3: FocusRound[] } = {
  K1: [
    {
      id: 'f_k1_1',
      title: 'ด่าน 1: เก็บแอปเปิ้ลสีแดง 🍎',
      targetEmoji: '🍎',
      targetName: 'แอปเปิ้ล',
      targetCount: 4,
      instruction: 'ตามหาแอปเปิ้ลสีแดง 4 ผลให้เจอ ท่ามกลางใบไม้และผลไม้อื่น!',
      themeColor: 'from-rose-500 to-red-600',
      distractors: [{ emoji: '🍃', name: 'ใบไม้' }, { emoji: '🍌', name: 'กล้วย' }, { emoji: '🌸', name: 'ดอกไม้' }],
    },
    {
      id: 'f_k1_2',
      title: 'ด่าน 2: ตามหาลูกเป็ดก้าบๆ 🦆',
      targetEmoji: '🦆',
      targetName: 'ลูกเป็ด',
      targetCount: 4,
      instruction: 'จดจ่อสายตา! แตะเฉพาะเป็ดน้อย 4 ตัวในสระน้ำ',
      themeColor: 'from-amber-500 to-yellow-600',
      distractors: [{ emoji: '🐸', name: 'กบ' }, { emoji: '🪨', name: 'ก้อนหิน' }, { emoji: '🌿', name: 'สาหร่าย' }],
    },
    {
      id: 'f_k1_3',
      title: 'ด่าน 3: ส่องหาดาวสีทอง ⭐',
      targetEmoji: '⭐',
      targetName: 'ดวงดาว',
      targetCount: 5,
      instruction: 'บนท้องฟ้ายามค่ำคืน แตะเฉพาะดวงดาวสีทอง 5 ดวง!',
      themeColor: 'from-indigo-500 to-blue-600',
      distractors: [{ emoji: '☁️', name: 'ก้อนเมฆ' }, { emoji: '🌙', name: 'พระจันทร์' }, { emoji: '🛸', name: 'ยานอวกาศ' }],
    },
    {
      id: 'f_k1_4',
      title: 'ด่าน 4: หาลูกสตรอว์เบอร์รี 🍓',
      targetEmoji: '🍓',
      targetName: 'สตรอว์เบอร์รี',
      targetCount: 5,
      instruction: 'มองหาสตรอว์เบอร์รีสีแดงฉ่ำ 5 ผล อย่าเผลอกดลูกอื่นน้า',
      themeColor: 'from-pink-500 to-rose-600',
      distractors: [{ emoji: '🍇', name: 'องุ่น' }, { emoji: '🍊', name: 'ส้ม' }, { emoji: '🍒', name: 'เชอร์รี' }],
    },
    {
      id: 'f_k1_5',
      title: 'ด่าน 5: กระต่ายหูยาว 🐰',
      targetEmoji: '🐰',
      targetName: 'กระต่าย',
      targetCount: 4,
      instruction: 'จดจ่อค้นหากระต่ายน้อย 4 ตัวที่ซ่อนอยู่หลังพุ่มไม้!',
      themeColor: 'from-emerald-500 to-teal-600',
      distractors: [{ emoji: '🥕', name: 'แครอท' }, { emoji: '🥬', name: 'ผักกาด' }, { emoji: '🍄', name: 'เห็ด' }],
    },
    {
      id: 'f_k1_6',
      title: 'ด่าน 6: ลูกโป่งสีฟ้า 🎈',
      targetEmoji: '🎈',
      targetName: 'ลูกโป่ง',
      targetCount: 4,
      instruction: 'มองหาลูกโป่ง 4 ลูกที่ลอยอยู่บนฟ้า แตะเก็บให้ครบ!',
      themeColor: 'from-sky-500 to-blue-600',
      distractors: [{ emoji: '🪁', name: 'ว่าว' }, { emoji: '🕊️', name: 'นกพิราบ' }, { emoji: '☁️', name: 'เมฆ' }],
    },
    {
      id: 'f_k1_7',
      title: 'ด่าน 7: ส้มหวานฉ่ำ 🍊',
      targetEmoji: '🍊',
      targetName: 'ส้ม',
      targetCount: 5,
      instruction: 'ในตะกร้าผลไม้ คัดกรองแตะเฉพาะผลส้ม 5 ผล!',
      themeColor: 'from-orange-500 to-amber-600',
      distractors: [{ emoji: '🍋', name: 'มะนาว' }, { emoji: '🍐', name: 'สาลี่' }, { emoji: '🍏', name: 'แอปเปิ้ลเขียว' }],
    },
    {
      id: 'f_k1_8',
      title: 'ด่าน 8: ลูกเจี๊ยบสีเหลือง 🐥',
      targetEmoji: '🐥',
      targetName: 'ลูกเจี๊ยบ',
      targetCount: 4,
      instruction: 'ค้นหาลูกเจี๊ยบตัวจิ๋ว 4 ตัวท่ามกลางไข่ไก่และรังฟาง',
      themeColor: 'from-amber-400 to-yellow-500',
      distractors: [{ emoji: '🥚', name: 'ไข่ไก่' }, { emoji: '🌾', name: 'รวงข้าว' }, { emoji: '🪶', name: 'ขนนก' }],
    },
    {
      id: 'f_k1_9',
      title: 'ด่าน 9: ดอกทิวลิปสีชมพู 🌷',
      targetEmoji: '🌷',
      targetName: 'ทิวลิป',
      targetCount: 5,
      instruction: 'ในสวนดอกไม้ แตะเฉพาะดอกทิวลิป 5 ดอกนะจ๊ะ',
      themeColor: 'from-pink-400 to-rose-500',
      distractors: [{ emoji: '🌻', name: 'ทานตะวัน' }, { emoji: '🌼', name: 'เดซี่' }, { emoji: '🌱', name: 'ต้นกล้า' }],
    },
    {
      id: 'f_k1_10',
      title: 'ด่าน 10: รถเก๋งสีแดง 🚗',
      targetEmoji: '🚗',
      targetName: 'รถเก๋ง',
      targetCount: 4,
      instruction: 'บนถนนแสนวุ่นวาย โฟกัสแตะเฉพาะรถเก๋ง 4 คัน!',
      themeColor: 'from-red-500 to-rose-600',
      distractors: [{ emoji: '🚲', name: 'จักรยาน' }, { emoji: '🛴', name: 'สกู๊ตเตอร์' }, { emoji: '🛞', name: 'ล้อรถ' }],
    },
    {
      id: 'f_k1_11',
      title: 'ด่าน 11: น้องแมวเหมียว 🐱',
      targetEmoji: '🐱',
      targetName: 'น้องแมว',
      targetCount: 5,
      instruction: 'ตามหาน้องแมวตาแป๋ว 5 ตัว อย่าเผลอกดสัตว์อื่นน้า',
      themeColor: 'from-violet-500 to-purple-600',
      distractors: [{ emoji: '🐶', name: 'น้องหมา' }, { emoji: '🐭', name: 'หนู' }, { emoji: '🧶', name: 'ไหมพรม' }],
    },
    {
      id: 'f_k1_12',
      title: 'ด่าน 12: กล้วยหอมทอง 🍌',
      targetEmoji: '🍌',
      targetName: 'กล้วยหอม',
      targetCount: 5,
      instruction: 'โฟกัสสายตา แตะเฉพาะกล้วยหอมสีเหลือง 5 ผล!',
      themeColor: 'from-yellow-400 to-amber-500',
      distractors: [{ emoji: '🍍', name: 'สับปะรด' }, { emoji: '🥭', name: 'มะม่วง' }, { emoji: '🥥', name: 'มะพร้าว' }],
    },
    {
      id: 'f_k1_13',
      title: 'ด่าน 13: เต่าทองตัวจิ๋ว 🐞',
      targetEmoji: '🐞',
      targetName: 'เต่าทอง',
      targetCount: 4,
      instruction: 'บนใบไม้สีเขียว มองหาเต่าทองจุดดำ 4 ตัว!',
      themeColor: 'from-emerald-500 to-green-600',
      distractors: [{ emoji: '🍃', name: 'ใบไม้' }, { emoji: '🐛', name: 'หนอน' }, { emoji: '🐌', name: 'หอยทาก' }],
    },
    {
      id: 'f_k1_14',
      title: 'ด่าน 14: ขนมคุกกี้ช็อกโกแลต 🍪',
      targetEmoji: '🍪',
      targetName: 'คุกกี้',
      targetCount: 5,
      instruction: 'ในจานขนม แตะเฉพาะคุกกี้หอมกรุ่น 5 ชิ้น!',
      themeColor: 'from-amber-600 to-yellow-700',
      distractors: [{ emoji: '🍩', name: 'โดนัท' }, { emoji: '🧁', name: 'คัพเค้ก' }, { emoji: '🍬', name: 'ลูกอม' }],
    },
    {
      id: 'f_k1_15',
      title: 'ด่าน 15: พระอาทิตย์ยิ้ม ☀️',
      targetEmoji: '☀️',
      targetName: 'พระอาทิตย์',
      targetCount: 4,
      instruction: 'ท้องฟ้าแจ่มใส ค้นหาพระอาทิตย์ยิ้มแฉ่ง 4 ดวง!',
      themeColor: 'from-amber-500 to-orange-500',
      distractors: [{ emoji: '🌈', name: 'สายรุ้ง' }, { emoji: '☁️', name: 'ก้อนเมฆ' }, { emoji: '⚡', name: 'สายฟ้า' }],
    },
    {
      id: 'f_k1_16',
      title: 'ด่าน 16: ลูกฟุตบอลลาย ⚽',
      targetEmoji: '⚽',
      targetName: 'ลูกฟุตบอล',
      targetCount: 5,
      instruction: 'ในสนามเด็กเล่น แตะเฉพาะลูกฟุตบอล 5 ลูก!',
      themeColor: 'from-teal-600 to-emerald-700',
      distractors: [{ emoji: '🏀', name: 'บาส' }, { emoji: '🎾', name: 'เทนนิส' }, { emoji: '🪀', name: 'โยโย่' }],
    },
    {
      id: 'f_k1_17',
      title: 'ด่าน 17: นกฮูกตาโต 🦉',
      targetEmoji: '🦉',
      targetName: 'นกฮูก',
      targetCount: 4,
      instruction: 'ในป่าราตรี มองหานกฮูกเกาะกิ่งไม้ 4 ตัว!',
      themeColor: 'from-indigo-600 to-purple-700',
      distractors: [{ emoji: '🦇', name: 'ค้างคาว' }, { emoji: '🌲', name: 'ต้นสน' }, { emoji: '🌕', name: 'พระจันทร์เต็มดวง' }],
    },
    {
      id: 'f_k1_18',
      title: 'ด่าน 18: แตงโมฉ่ำชื่นใจ 🍉',
      targetEmoji: '🍉',
      targetName: 'แตงโม',
      targetCount: 5,
      instruction: 'แตะเฉพาะชิ้นแตงโมสีแดงสด 5 ชิ้น คลายร้อนชื่นใจ!',
      themeColor: 'from-rose-500 to-red-600',
      distractors: [{ emoji: '🍈', name: 'เมลอน' }, { emoji: '🥝', name: 'กีวี' }, { emoji: '🥑', name: 'อะโวคาโด' }],
    },
    {
      id: 'f_k1_19',
      title: 'ด่าน 19: ปลาทองว่ายน้ำ 🐠',
      targetEmoji: '🐠',
      targetName: 'ปลาทอง',
      targetCount: 5,
      instruction: 'ในตู้ปลาใส แตะเฉพาะปลาทองว่ายน้ำ 5 ตัว!',
      themeColor: 'from-cyan-500 to-blue-600',
      distractors: [{ emoji: '🫧', name: 'ฟองสบู่' }, { emoji: '🐚', name: 'เปลือกหอย' }, { emoji: '🪸', name: 'ปะการัง' }],
    },
    {
      id: 'f_k1_20',
      title: 'ด่าน 20: กล่องของขวัญผูกโบ 🎁',
      targetEmoji: '🎁',
      targetName: 'ของขวัญ',
      targetCount: 5,
      instruction: 'ด่านสุดท้าย K1! แตะเก็บกล่องของขวัญรางวัลความพยายาม 5 กล่อง!',
      themeColor: 'from-violet-600 to-pink-600',
      distractors: [{ emoji: '🎉', name: 'พลุกระดาษ' }, { emoji: '🎀', name: 'โบ' }, { emoji: '🎊', name: 'ลูกบอลฉลอง' }],
    },
  ],
  K2: [
    {
      id: 'f_k2_1',
      title: 'ด่าน 1: ปลาการ์ตูนนีโม 🐠',
      targetEmoji: '🐠',
      targetName: 'ปลาการ์ตูน',
      targetCount: 5,
      instruction: 'ในแนวปะการัง มีปลาการ์ตูน 5 ตัว แตะเก็บให้ครบ!',
      themeColor: 'from-teal-500 to-cyan-600',
      distractors: [{ emoji: '🐡', name: 'ปลาปักเป้า' }, { emoji: '🐙', name: 'หมึก' }, { emoji: '🦀', name: 'ปู' }, { emoji: '🫧', name: 'ฟองอากาศ' }],
    },
    {
      id: 'f_k2_2',
      title: 'ด่าน 2: ดอกทานตะวันยิ้มแฉ่ง 🌻',
      targetEmoji: '🌻',
      targetName: 'ทานตะวัน',
      targetCount: 5,
      instruction: 'มองหาดอกทานตะวันสีเหลืองสดใส 5 ดอกในทุ่งกว้าง',
      themeColor: 'from-amber-500 to-orange-600',
      distractors: [{ emoji: '🌹', name: 'กุหลาบ' }, { emoji: '🌷', name: 'ทิวลิป' }, { emoji: '🐝', name: 'ผึ้ง' }, { emoji: '🦋', name: 'ผีเสื้อ' }],
    },
    {
      id: 'f_k2_3',
      title: 'ด่าน 3: รถดับเพลิงสีแดง 🚒',
      targetEmoji: '🚒',
      targetName: 'รถดับเพลิง',
      targetCount: 6,
      instruction: 'เมืองใหญ่แสนวุ่นวาย โฟกัสค้นหารถดับเพลิง 6 คัน!',
      themeColor: 'from-rose-600 to-red-700',
      distractors: [{ emoji: '🚓', name: 'รถตำรวจ' }, { emoji: '🚑', name: 'รถพยาบาล' }, { emoji: '🚕', name: 'แท็กซี่' }, { emoji: '🚌', name: 'รถบัส' }],
    },
    {
      id: 'f_k2_4',
      title: 'ด่าน 4: หมีแพนด้ากินไผ่ 🐼',
      targetEmoji: '🐼',
      targetName: 'แพนด้า',
      targetCount: 6,
      instruction: 'ค้นหาแพนด้าขาวดำ 6 ตัว ท่ามกลางเพื่อนสัตว์ป่ามากมาย',
      themeColor: 'from-slate-700 to-slate-900',
      distractors: [{ emoji: '🐨', name: 'โคอาลา' }, { emoji: '🐻', name: 'หมีสีน้ำตาล' }, { emoji: '🦊', name: 'จิ้งจอก' }, { emoji: '🐰', name: 'กระต่าย' }],
    },
    {
      id: 'f_k2_5',
      title: 'ด่าน 5: จานบินมนุษย์ต่างดาว 🛸',
      targetEmoji: '🛸',
      targetName: 'จานบิน',
      targetCount: 5,
      instruction: 'ในห้วงอวกาศกว้างใหญ่ ส่องกล้องหาจานบิน 5 ลำ!',
      themeColor: 'from-indigo-600 to-purple-700',
      distractors: [{ emoji: '🚀', name: 'จรวด' }, { emoji: '🛰️', name: 'ดาวเทียม' }, { emoji: '🪐', name: 'ดาวเสาร์' }, { emoji: '⭐', name: 'ดาว' }],
    },
    {
      id: 'f_k2_6',
      title: 'ด่าน 6: กระรอกน้อยแทะถั่ว 🐿️',
      targetEmoji: '🐿️',
      targetName: 'กระรอก',
      targetCount: 5,
      instruction: 'บนต้นไม้ในสวน มองหากระรอกหางพวง 5 ตัว!',
      themeColor: 'from-amber-600 to-orange-700',
      distractors: [{ emoji: '🌰', name: 'ลูกเกาลัด' }, { emoji: '🥜', name: 'ถั่วลิสง' }, { emoji: '🦔', name: 'เม่น' }, { emoji: '🍁', name: 'ใบเมเปิ้ล' }],
    },
    {
      id: 'f_k2_7',
      title: 'ด่าน 7: ปราสาทเจ้าหญิง 🏰',
      targetEmoji: '🏰',
      targetName: 'ปราสาท',
      targetCount: 5,
      instruction: 'ในแผนที่แดนเวทมนตร์ ค้นหาปราสาทหลังงาม 5 แห่ง!',
      themeColor: 'from-pink-500 to-purple-600',
      distractors: [{ emoji: '👑', name: 'มงกุฎ' }, { emoji: '🎠', name: 'ม้าหมุน' }, { emoji: '🦄', name: 'ยูนิคอร์น' }, { emoji: '🪄', name: 'ไม้กายสิทธิ์' }],
    },
    {
      id: 'f_k2_8',
      title: 'ด่าน 8: เฮลิคอปเตอร์กู้ภัย 🚁',
      targetEmoji: '🚁',
      targetName: 'เฮลิคอปเตอร์',
      targetCount: 6,
      instruction: 'บนท้องฟ้ายามบ่าย ค้นหาเฮลิคอปเตอร์กู้ภัย 6 ลำ!',
      themeColor: 'from-cyan-600 to-blue-700',
      distractors: [{ emoji: '✈️', name: 'เครื่องบิน' }, { emoji: '🪂', name: 'ร่มชูชีพ' }, { emoji: '🦅', name: 'นกอินทรี' }, { emoji: '☁️', name: 'เมฆ' }],
    },
    {
      id: 'f_k2_9',
      title: 'ด่าน 9: สิงโตเจ้าป่า 🦁',
      targetEmoji: '🦁',
      targetName: 'สิงโต',
      targetCount: 5,
      instruction: 'ในทุ่งสะวันนา ส่องดูสิงโตผู้สง่างาม 5 ตัว!',
      themeColor: 'from-amber-500 to-yellow-600',
      distractors: [{ emoji: '🐯', name: 'เสือโคร่ง' }, { emoji: '🐆', name: 'เสือดาว' }, { emoji: '🦓', name: 'ม้าลาย' }, { emoji: '🦒', name: 'ยีราฟ' }],
    },
    {
      id: 'f_k2_10',
      title: 'ด่าน 10: เรือใบสีคราม ⛵',
      targetEmoji: '⛵',
      targetName: 'เรือใบ',
      targetCount: 6,
      instruction: 'กลางทะเลสีคราม แตะเฉพาะเรือใบสีขาว 6 ลำ!',
      themeColor: 'from-blue-500 to-teal-600',
      distractors: [{ emoji: '🚢', name: 'เรือสำราญ' }, { emoji: '🚤', name: 'เรือเร็ว' }, { emoji: '⚓', name: 'สมอเรือ' }, { emoji: '🌊', name: 'คลื่น' }],
    },
    {
      id: 'f_k2_11',
      title: 'ด่าน 11: ดนตรีกีตาร์ 🎸',
      targetEmoji: '🎸',
      targetName: 'กีตาร์',
      targetCount: 5,
      instruction: 'ในห้องซ้อมดนตรี ค้นหากีตาร์โปร่ง 5 ตัว!',
      themeColor: 'from-rose-500 to-amber-600',
      distractors: [{ emoji: '🥁', name: 'กลอง' }, { emoji: '🎺', name: 'ทรัมเป็ต' }, { emoji: '🎹', name: 'เปียโน' }, { emoji: '🎷', name: 'แซกโซโฟน' }],
    },
    {
      id: 'f_k2_12',
      title: 'ด่าน 12: กบเขียวร้องอ๊บ 🐸',
      targetEmoji: '🐸',
      targetName: 'กบเขียว',
      targetCount: 6,
      instruction: 'ในบึงบัวอันร่มรื่น แตะเฉพาะกบน้อย 6 ตัว!',
      themeColor: 'from-emerald-600 to-green-700',
      distractors: [{ emoji: '🪷', name: 'ดอกบัว' }, { emoji: '🐢', name: 'เต่า' }, { emoji: '🦎', name: 'จิ้งจก' }, { emoji: '🪲', name: 'แมลงปีกแข็ง' }],
    },
    {
      id: 'f_k2_13',
      title: 'ด่าน 13: แพนเค้กราดน้ำผึ้ง 🥞',
      targetEmoji: '🥞',
      targetName: 'แพนเค้ก',
      targetCount: 5,
      instruction: 'ร้านเบเกอรี่แสนอร่อย แตะเฉพาะแพนเค้ก 5 จาน!',
      themeColor: 'from-amber-500 to-orange-600',
      distractors: [{ emoji: '🧇', name: 'วาฟเฟิล' }, { emoji: '🥐', name: 'ครัวซองต์' }, { emoji: '🍞', name: 'ขนมปัง' }, { emoji: '🍯', name: 'น้ำผึ้ง' }],
    },
    {
      id: 'f_k2_14',
      title: 'ด่าน 14: เพนกวินขั้วโลก 🐧',
      targetEmoji: '🐧',
      targetName: 'เพนกวิน',
      targetCount: 6,
      instruction: 'บนเกาะน้ำแข็งสีขาว โฟกัสค้นหาเพนกวิน 6 ตัว!',
      themeColor: 'from-cyan-600 to-blue-800',
      distractors: [{ emoji: '🐻‍❄️', name: 'หมีขาว' }, { emoji: '🦭', name: 'แมวน้ำ' }, { emoji: '🧊', name: 'ก้อนน้ำแข็ง' }, { emoji: '❄️', name: 'เกล็ดหิมะ' }],
    },
    {
      id: 'f_k2_15',
      title: 'ด่าน 15: กระเป๋านักเรียน 🎒',
      targetEmoji: '🎒',
      targetName: 'กระเป๋า',
      targetCount: 5,
      instruction: 'เตรียมตัวไปโรงเรียน แตะเฉพาะกระเป๋านักเรียน 5 ใบ!',
      themeColor: 'from-teal-600 to-emerald-700',
      distractors: [{ emoji: '📚', name: 'หนังสือ' }, { emoji: '✏️', name: 'ดินสอ' }, { emoji: '📏', name: 'ไม้บรรทัด' }, { emoji: '✂️', name: 'กรรไกร' }],
    },
    {
      id: 'f_k2_16',
      title: 'ด่าน 16: ผึ้งน้อยขยันขันแข็ง 🐝',
      targetEmoji: '🐝',
      targetName: 'ผึ้งน้อย',
      targetCount: 6,
      instruction: 'ท่ามกลางฝูงแมลง แตะเฉพาะผึ้งลายเหลืองดำ 6 ตัว!',
      themeColor: 'from-yellow-500 to-amber-600',
      distractors: [{ emoji: '🐜', name: 'มด' }, { emoji: '🪰', name: 'แมลงวัน' }, { emoji: '🦗', name: 'ตั๊กแตน' }, { emoji: '🐞', name: 'เต่าทอง' }],
    },
    {
      id: 'f_k2_17',
      title: 'ด่าน 17: ไอศกรีมโคน 🍦',
      targetEmoji: '🍦',
      targetName: 'ไอศกรีม',
      targetCount: 6,
      instruction: 'วันแดดร้อนจัด แตะเฉพาะไอศกรีมโคนหวานเย็น 6 อัน!',
      themeColor: 'from-pink-500 to-rose-600',
      distractors: [{ emoji: '🍧', name: 'น้ำแข็งไส' }, { emoji: '🍨', name: 'ไอศกรีมถ้วย' }, { emoji: '🧋', name: 'ชานม' }, { emoji: '🥤', name: 'น้ำอัดลม' }],
    },
    {
      id: 'f_k2_18',
      title: 'ด่าน 18: ยีราฟคอยาว 🦒',
      targetEmoji: '🦒',
      targetName: 'ยีราฟ',
      targetCount: 6,
      instruction: 'มองหายีราฟคอยาวลายจุด 6 ตัวในสวนสัตว์เปิด!',
      themeColor: 'from-amber-600 to-yellow-600',
      distractors: [{ emoji: '🦘', name: 'จิงโจ้' }, { emoji: '🦙', name: 'ลามะ' }, { emoji: '🦌', name: 'กวาง' }, { emoji: '🐪', name: 'อูฐ' }],
    },
    {
      id: 'f_k2_19',
      title: 'ด่าน 19: พลอยมรกตสีเขียว 💚',
      targetEmoji: '💚',
      targetName: 'หัวใจเขียว',
      targetCount: 6,
      instruction: 'ท่ามกลางประกายแสง แตะเฉพาะหัวใจสีเขียว 6 ดวง!',
      themeColor: 'from-emerald-600 to-teal-700',
      distractors: [{ emoji: '💛', name: 'หัวใจเหลือง' }, { emoji: '💙', name: 'หัวใจฟ้า' }, { emoji: '💜', name: 'หัวใจม่วง' }, { emoji: '🧡', name: 'หัวใจส้ม' }],
    },
    {
      id: 'f_k2_20',
      title: 'ด่าน 20: มหาสมบัติถ้วยทอง 🏆',
      targetEmoji: '🏆',
      targetName: 'ถ้วยทอง',
      targetCount: 7,
      instruction: 'ด่านสูงสุด K2! ค้นหาถ้วยรางวัลทองคำ 7 ใบ พิชิต 20 ด่าน!',
      themeColor: 'from-amber-500 to-yellow-600',
      distractors: [{ emoji: '🥇', name: 'เหรียญทอง' }, { emoji: '👑', name: 'มงกุฎ' }, { emoji: '💎', name: 'เพชร' }, { emoji: '🎖️', name: 'เหรียญเกียรติยศ' }],
    },
  ],
  K3: [
    {
      id: 'f_k3_1',
      title: 'ด่าน 1: ลูกบอลฟุตบอล ⚽',
      targetEmoji: '⚽',
      targetName: 'ฟุตบอล',
      targetCount: 6,
      instruction: 'คัดกรองตัวรบกวน! หาฟุตบอลลายขาวดำ 6 ลูกให้ครบ',
      themeColor: 'from-emerald-600 to-teal-700',
      distractors: [{ emoji: '🏀', name: 'บาส' }, { emoji: '🏈', name: 'รักบี้' }, { emoji: '🎾', name: 'เทนนิส' }, { emoji: '🏐', name: 'วอลเลย์' }, { emoji: '⚾', name: 'เบสบอล' }],
    },
    {
      id: 'f_k3_2',
      title: 'ด่าน 2: ผีเสื้อปีกสีฟ้า 🦋',
      targetEmoji: '🦋',
      targetName: 'ผีเสื้อสีฟ้า',
      targetCount: 7,
      instruction: 'ผีเสื้อบินว่อนเต็มสวน แตะเฉพาะผีเสื้อ 7 ตัวเท่านั้น!',
      themeColor: 'from-blue-600 to-indigo-700',
      distractors: [{ emoji: '🐝', name: 'ผึ้ง' }, { emoji: '🐞', name: 'เต่าทอง' }, { emoji: '🦗', name: 'ตั๊กแตน' }, { emoji: '🌸', name: 'ดอกไม้' }, { emoji: '🍃', name: 'ใบไม้' }],
    },
    {
      id: 'f_k3_3',
      title: 'ด่าน 3: จรวดสำรวจอวกาศ 🚀',
      targetEmoji: '🚀',
      targetName: 'จรวด',
      targetCount: 7,
      instruction: 'ท่ามกลางดวงดาวและดาวเคราะห์ ค้นหาจรวด 7 ลำให้เจอ!',
      themeColor: 'from-purple-600 to-indigo-800',
      distractors: [{ emoji: '🛸', name: 'จานบิน' }, { emoji: '🛰️', name: 'ดาวเทียม' }, { emoji: '🪐', name: 'ดาวเสาร์' }, { emoji: '☄️', name: 'ดาวหาง' }, { emoji: '⭐', name: 'ดาว' }],
    },
    {
      id: 'f_k3_4',
      title: 'ด่าน 4: เพชรประกายแสง 💎',
      targetEmoji: '💎',
      targetName: 'เพชรน้ำงาม',
      targetCount: 7,
      instruction: 'ในถ้ำสมบัติล้ำค่า โฟกัสค้นหาเพชรประกายฟ้า 7 เม็ด!',
      themeColor: 'from-cyan-600 to-blue-700',
      distractors: [{ emoji: '💍', name: 'แหวน' }, { emoji: '🪙', name: 'เหรียญ' }, { emoji: '👑', name: 'มงกุฎ' }, { emoji: '🔮', name: 'ลูกแก้ว' }, { emoji: '✨', name: 'ประกาย' }],
    },
    {
      id: 'f_k3_5',
      title: 'ด่าน 5: แว่นขยายน้อยนักสืบ 🔍',
      targetEmoji: '🔍',
      targetName: 'แว่นขยาย',
      targetCount: 7,
      instruction: 'ห้องสืบสวนคดี แตะเฉพาะแว่นขยาย 7 อันเพื่อหาหลักฐาน!',
      themeColor: 'from-slate-700 to-zinc-900',
      distractors: [{ emoji: '🔦', name: 'ไฟฉาย' }, { emoji: '🗝️', name: 'กุญแจ' }, { emoji: '📜', name: 'ม้วนกระดาษ' }, { emoji: '🧭', name: 'เข็มทิศ' }, { emoji: '🔒', name: 'แม่กุญแจ' }],
    },
    {
      id: 'f_k3_6',
      title: 'ด่าน 6: เสือโคร่งลายพาดกลอน 🐯',
      targetEmoji: '🐯',
      targetName: 'เสือโคร่ง',
      targetCount: 7,
      instruction: 'ในป่าดงดิบลึก ค้นหาเสือโคร่ง 7 ตัวอย่างระมัดระวัง!',
      themeColor: 'from-orange-600 to-amber-700',
      distractors: [{ emoji: '🦁', name: 'สิงโต' }, { emoji: '🐆', name: 'เสือดาว' }, { emoji: '🐺', name: 'หมาป่า' }, { emoji: '🦊', name: 'จิ้งจอก' }, { emoji: '🐻', name: 'หมี' }],
    },
    {
      id: 'f_k3_7',
      title: 'ด่าน 7: ลูกแก้ววิเศษ 🔮',
      targetEmoji: '🔮',
      targetName: 'ลูกแก้ววิเศษ',
      targetCount: 7,
      instruction: 'ห้องนักเล่นแร่แปรธาตุ แตะเฉพาะลูกแก้วมนตรา 7 ลูก!',
      themeColor: 'from-purple-700 to-indigo-900',
      distractors: [{ emoji: '🧪', name: 'หลอดทดลอง' }, { emoji: '🕯️', name: 'เทียน' }, { emoji: '🪄', name: 'คทา' }, { emoji: '📜', name: 'คัมภีร์' }, { emoji: '✨', name: 'แสงเวท' }],
    },
    {
      id: 'f_k3_8',
      title: 'ด่าน 8: หุ่นยนต์แอนดรอยด์ 🤖',
      targetEmoji: '🤖',
      targetName: 'หุ่นยนต์',
      targetCount: 8,
      instruction: 'โรงงานเทคโนโลยีอนาคต คัดกรองแตะหุ่นยนต์ 8 ตัว!',
      themeColor: 'from-cyan-700 to-slate-800',
      distractors: [{ emoji: '💻', name: 'โน้ตบุ๊ก' }, { emoji: '🕹️', name: 'จอยเกม' }, { emoji: '🔋', name: 'แบตเตอรี่' }, { emoji: '⚙️', name: 'ฟันเฟือง' }, { emoji: '📡', name: 'เสาสัญญาณ' }],
    },
    {
      id: 'f_k3_9',
      title: 'ด่าน 9: ฉลามเพชฌฆาต 🦈',
      targetEmoji: '🦈',
      targetName: 'ฉลาม',
      targetCount: 7,
      instruction: 'ใต้ท้องทะเลลึก ค้นหาฉลามลายสีเทา 7 ตัว!',
      themeColor: 'from-blue-700 to-cyan-900',
      distractors: [{ emoji: '🐬', name: 'โลมา' }, { emoji: '🐳', name: 'วาฬ' }, { emoji: '🐙', name: 'หมึกยักษ์' }, { emoji: '🐠', name: 'ปลาการ์ตูน' }, { emoji: '🐡', name: 'ปลาปักเป้า' }],
    },
    {
      id: 'f_k3_10',
      title: 'ด่าน 10: รถสปอร์ตซูเปอร์คาร์ 🏎️',
      targetEmoji: '🏎️',
      targetName: 'รถแข่ง',
      targetCount: 8,
      instruction: 'สนามแข่งความเร็วระดับโลก แตะเฉพาะรถแข่งสูตรหนึ่ง 8 คัน!',
      themeColor: 'from-red-600 to-rose-800',
      distractors: [{ emoji: '🏁', name: 'ธงตาหมากรุก' }, { emoji: '🚗', name: 'รถเก๋ง' }, { emoji: '🏍️', name: 'มอเตอร์ไซค์' }, { emoji: '🛞', name: 'ยางรถ' }, { emoji: '⛽', name: 'ปั๊มน้ำมัน' }],
    },
    {
      id: 'f_k3_11',
      title: 'ด่าน 11: นกอินทรีเหินเวหา 🦅',
      targetEmoji: '🦅',
      targetName: 'นกอินทรี',
      targetCount: 7,
      instruction: 'เหนือน่านฟ้ายอดเขาสูง แตะค้นหานกอินทรี 7 ตัว!',
      themeColor: 'from-amber-700 to-stone-800',
      distractors: [{ emoji: '🦉', name: 'นกฮูก' }, { emoji: '🦜', name: 'นกแก้ว' }, { emoji: '🦩', name: 'ฟลามิงโก' }, { emoji: '🦚', name: 'นกยูง' }, { emoji: '🕊️', name: 'นกพิราบ' }],
    },
    {
      id: 'f_k3_12',
      title: 'ด่าน 12: ดาบอัศวิน ⚔️',
      targetEmoji: '⚔️',
      targetName: 'ดาบไขว้',
      targetCount: 8,
      instruction: 'คลังอาวุธปราสาท แตะเฉพาะดาบไขว้อัศวิน 8 คู่!',
      themeColor: 'from-slate-700 to-zinc-900',
      distractors: [{ emoji: '🛡️', name: 'โล่' }, { emoji: '🏹', name: 'ธนู' }, { emoji: '🪓', name: 'ขวาน' }, { emoji: '🗡️', name: 'กริช' }, { emoji: '🪖', name: 'หมวกเหล็ก' }],
    },
    {
      id: 'f_k3_13',
      title: 'ด่าน 13: อุกกาบาตดาวหาง ☄️',
      targetEmoji: '☄️',
      targetName: 'อุกกาบาต',
      targetCount: 8,
      instruction: 'ท้องฟ้าฝนดาวตก โฟกัสค้นหาอุกกาบาตหางเพลิง 8 ลูก!',
      themeColor: 'from-orange-700 to-red-900',
      distractors: [{ emoji: '🌟', name: 'ดาวเปล่งแสง' }, { emoji: '🪐', name: 'ดาวเสาร์' }, { emoji: '🌕', name: 'พระจันทร์' }, { emoji: '🛸', name: 'จานบิน' }, { emoji: '🚀', name: 'จรวด' }],
    },
    {
      id: 'f_k3_14',
      title: 'ด่าน 14: ไดโนเสาร์ทีเร็กซ์ 🦖',
      targetEmoji: '🦖',
      targetName: 'ทีเร็กซ์',
      targetCount: 7,
      instruction: 'ท่องโลกดึกดำบรรพ์ แตะเฉพาะทีเร็กซ์เจ้าป่า 7 ตัว!',
      themeColor: 'from-emerald-700 to-stone-800',
      distractors: [{ emoji: '🦕', name: 'คอยาว' }, { emoji: '🌋', name: 'ภูเขาไฟ' }, { emoji: '🦴', name: 'กระดูก' }, { emoji: '🥚', name: 'ไข่ไดโนเสาร์' }, { emoji: '🌿', name: 'เฟิร์นโบราณ' }],
    },
    {
      id: 'f_k3_15',
      title: 'ด่าน 15: มะงกุฎกษัตริย์ 👑',
      targetEmoji: '👑',
      targetName: 'มงกุฎทอง',
      targetCount: 8,
      instruction: 'พิพิธภัณฑ์เครื่องราชฯ คัดกรองค้นหามงกุฎทอง 8 องค์!',
      themeColor: 'from-yellow-600 to-amber-700',
      distractors: [{ emoji: '💎', name: 'เพชร' }, { emoji: '💍', name: 'แหวน' }, { emoji: '🏆', name: 'ถ้วยทอง' }, { emoji: '🥇', name: 'เหรียญรางวัล' }, { emoji: '🏰', name: 'ปราสาท' }],
    },
    {
      id: 'f_k3_16',
      title: 'ด่าน 16: หัวใจเพลิงประกาย 🔥',
      targetEmoji: '🔥',
      targetName: 'กองไฟ',
      targetCount: 8,
      instruction: 'ตั้งแคมป์ยามค่ำคืน แตะเฉพาะกองไฟอบอุ่น 8 กอง!',
      themeColor: 'from-red-600 to-orange-700',
      distractors: [{ emoji: '⛺', name: 'เต็นท์' }, { emoji: '🪵', name: 'ท่อนฟืน' }, { emoji: '🔦', name: 'ไฟฉาย' }, { emoji: '🥾', name: 'รองเท้าบูท' }, { emoji: '🎒', name: 'เป้เดินทาง' }],
    },
    {
      id: 'f_k3_17',
      title: 'ด่าน 17: ยูนิคอร์นเขาแก้ว 🦄',
      targetEmoji: '🦄',
      targetName: 'ยูนิคอร์น',
      targetCount: 8,
      instruction: 'ในป่าแห่งความฝัน ค้นหายูนิคอร์นเขาแก้ว 8 ตัว!',
      themeColor: 'from-fuchsia-600 to-pink-700',
      distractors: [{ emoji: '🌈', name: 'สายรุ้ง' }, { emoji: '🧚', name: 'นางฟ้า' }, { emoji: '🍄', name: 'เห็ดวิเศษ' }, { emoji: '✨', name: 'ประกายดาว' }, { emoji: '🌸', name: 'ซากุระ' }],
    },
    {
      id: 'f_k3_18',
      title: 'ด่าน 18: แซกโซโฟนทองเหลือง 🎷',
      targetEmoji: '🎷',
      targetName: 'แซกโซโฟน',
      targetCount: 8,
      instruction: 'วงดนตรีแจ๊สระดับโลก แตะเฉพาะแซกโซโฟน 8 ตัว!',
      themeColor: 'from-amber-600 to-yellow-700',
      distractors: [{ emoji: '🎺', name: 'ทรัมเป็ต' }, { emoji: '🎻', name: 'ไวโอลิน' }, { emoji: '🥁', name: 'กลอง' }, { emoji: '🎹', name: 'เปียโน' }, { emoji: '🎸', name: 'กีตาร์' }],
    },
    {
      id: 'f_k3_19',
      title: 'ด่าน 19: สายฟ้าฟาดแลบ ⚡',
      targetEmoji: '⚡',
      targetName: 'สายฟ้า',
      targetCount: 8,
      instruction: 'คืนพายุคะนอง โฟกัสจับสายฟ้าแลบ 8 เส้น อย่ามองตัวกวน!',
      themeColor: 'from-yellow-500 to-amber-600',
      distractors: [{ emoji: '🌧️', name: 'ฝนตก' }, { emoji: '🌩️', name: 'เมฆฟ้าผ่า' }, { emoji: '🌪️', name: 'พายุหมุน' }, { emoji: '💨', name: 'ลมพัด' }, { emoji: '☂️', name: 'ร่ม' }],
    },
    {
      id: 'f_k3_20',
      title: 'ด่าน 20: ถ้วยเกียรติยศสูงสุด 🏆',
      targetEmoji: '🏆',
      targetName: 'ถ้วยเกียรติยศ',
      targetCount: 8,
      instruction: 'ด่านแชมเปี้ยน 20! ค้นหาถ้วยเกียรติยศ 8 ถ้วย คว้าชัยชนะสมาธิตามล่า!',
      themeColor: 'from-amber-500 to-yellow-600',
      distractors: [{ emoji: '🥇', name: 'เหรียญทอง' }, { emoji: '👑', name: 'มงกุฎ' }, { emoji: '💎', name: 'เพชร' }, { emoji: '🎁', name: 'กล่องของขวัญ' }, { emoji: '⭐', name: 'ดาว' }],
    },
  ],
};

export const EFFocusDistractionView: React.FC<EFFocusDistractionViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
  gameStartedKey,
}) => {
  const roundList = FOCUS_ROUNDS_CONFIG[currentGrade] || FOCUS_ROUNDS_CONFIG.K2;
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const activeRound = roundList[currentLevelIndex] || roundList[0];

  const [items, setItems] = useState<FocusItem[]>([]);
  const [collectedCount, setCollectedCount] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'success'>('idle');
  const [score, setScore] = useState(0);
  const [hintMessage, setHintMessage] = useState('');

  // Generate board items (mix of targets and distractors)
  const generateBoardItems = useCallback(() => {
    const newItems: FocusItem[] = [];

    // Add target items
    for (let i = 0; i < activeRound.targetCount; i++) {
      newItems.push({
        id: `target_${i}`,
        emoji: activeRound.targetEmoji,
        name: activeRound.targetName,
        isTarget: true,
        isCollected: false,
      });
    }

    // Add distractor items
    const distractorCount = activeRound.targetCount * 2;
    for (let i = 0; i < distractorCount; i++) {
      const d = activeRound.distractors[i % activeRound.distractors.length];
      newItems.push({
        id: `distractor_${i}`,
        emoji: d.emoji,
        name: d.name,
        isTarget: false,
        isCollected: false,
      });
    }

    // Shuffle items
    return newItems.sort(() => Math.random() - 0.5);
  }, [activeRound]);

  // Setup round
  const handleStartGame = useCallback(() => {
    soundEffects.playTap(soundVolume);
    const newBoard = generateBoardItems();
    setItems(newBoard);
    setCollectedCount(0);
    setGameState('playing');
    setHintMessage(`มองหาและแตะเฉพาะ "${activeRound.targetName}" ${activeRound.targetEmoji} ให้ครบ ${activeRound.targetCount} อันนะจ๊ะ!`);
  }, [activeRound, generateBoardItems, soundVolume]);

  useEffect(() => {
    const newBoard = generateBoardItems();
    setItems(newBoard);
    setCollectedCount(0);
    setGameState('playing');
    setHintMessage(`มองหาและแตะเฉพาะ "${activeRound.targetName}" ${activeRound.targetEmoji} ให้ครบ ${activeRound.targetCount} อันนะจ๊ะ!`);
  }, [currentLevelIndex, currentGrade, gameStartedKey, generateBoardItems, activeRound]);

  // Handle tap item on board
  const handleItemClick = (item: FocusItem) => {
    if (gameState !== 'playing' || item.isCollected) return;

    if (item.isTarget) {
      // Correct!
      soundEffects.playLevelUp(soundVolume);
      const nextCount = collectedCount + 1;
      setCollectedCount(nextCount);
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, isCollected: true } : it))
      );

      if (nextCount >= activeRound.targetCount) {
        // Complete round!
        soundEffects.playVictory(soundVolume);
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        setGameState('success');
        setScore((s) => s + 15);
        setHintMessage(`🎉 ยอดเยี่ยมมาก! เก็บ ${activeRound.targetName} ครบ ${activeRound.targetCount} อันแล้ว`);
        speakText(`เก่งมากจ้า! เก็บครบทุกอันแล้ว สมาธิยอดเยี่ยมมาก`, 'th', soundVolume);
        if (onEarnStar) onEarnStar();
      } else {
        setHintMessage(`ยอดเยี่ยม! เก็บได้แล้ว ${nextCount} / ${activeRound.targetCount} อัน`);
      }
    } else {
      // Clicked a distractor!
      soundEffects.playIncorrect(soundVolume);
      setHintMessage(`เอ๊ะ... อันนี้คือ "${item.name}" นะจ๊ะ หาเฉพาะ "${activeRound.targetName}" ${activeRound.targetEmoji} น้า`);
      speakText(`อันนี้คือ ${item.name} จ้า หา ${activeRound.targetName} นะจ๊ะ`, 'th', soundVolume);
    }
  };

  const handleNextLevel = () => {
    soundEffects.playTap(soundVolume);
    if (currentLevelIndex < roundList.length - 1) {
      setCurrentLevelIndex((i) => i + 1);
    } else {
      setCurrentLevelIndex(0);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Level Header Selector */}
      <div className="w-full mb-3">
        <SkillGameLevelSelector
          totalLevels={roundList.length}
          currentIndex={currentLevelIndex}
          onSelectLevel={(idx) => {
            soundEffects.playTap(soundVolume);
            setCurrentLevelIndex(idx);
          }}
          prefix="ด่าน"
          colorTheme="teal"
          badgeSubtitle={`คะแนน: ${score} | สมาธิ: ${collectedCount}/${activeRound.targetCount}`}
        />
      </div>

      {/* Main Game Container */}
      <div className="w-full max-w-2xl bg-white rounded-3xl p-4 sm:p-6 border-3 border-teal-200 shadow-md flex flex-col items-center">
        {/* Title & Pedagogical EF Badge */}
        <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-teal-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                {activeRound.title}
              </h2>
              <p className="text-xs text-teal-800 font-bold">
                {activeRound.instruction}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-teal-100 text-teal-900 border border-teal-300 px-3 py-1 rounded-2xl text-xs font-black">
            <Target className="w-4 h-4 text-teal-700" />
            <span>Selective Attention (สมาธิจดจ่อ)</span>
          </div>
        </div>

        {/* Target Mission Bar & "เริ่มเล่นเกม" Button */}
        <div className="w-full bg-slate-50 border-2 border-dashed border-teal-300 rounded-2xl p-3.5 sm:p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl border-2 border-teal-300 flex items-center justify-center text-3xl shadow-xs">
              {activeRound.targetEmoji}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500">เป้าหมายที่ต้องค้นหา:</div>
              <div className="text-sm sm:text-base font-black text-teal-950 mt-0.5">
                {activeRound.targetName} ({collectedCount} / {activeRound.targetCount} ผล)
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {gameState === 'success' ? (
              <button
                type="button"
                onClick={handleNextLevel}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>ด่านถัดไป</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartGame}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:text-slate-900 bg-white text-xs font-bold cursor-pointer hover:bg-slate-50 shadow-2xs"
                title="สลับตำแหน่งและเริ่มใหม่"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>เริ่มรอบใหม่</span>
              </button>
            )}
          </div>
        </div>

        {/* Hint Banner */}
        <div className="w-full text-xs font-bold text-slate-600 bg-teal-50/70 border border-teal-200 px-3 py-1.5 rounded-xl mb-4 text-center">
          {hintMessage}
        </div>

        {/* Interactive Focus Board */}
        <div className="w-full grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5 sm:gap-3.5 p-3 sm:p-4 bg-gradient-to-b from-slate-50 to-teal-50/40 rounded-3xl border-2 border-teal-200">
            {items.map((item) => {
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`btn-focus-item-${item.id}`}
                  onClick={() => handleItemClick(item)}
                  disabled={item.isCollected}
                  className={`h-16 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-3xl sm:text-4xl transition-all cursor-pointer select-none relative ${
                    item.isCollected
                      ? 'bg-emerald-100 border-emerald-300 opacity-40 scale-90'
                      : 'bg-white border-slate-200 hover:border-teal-400 hover:scale-108 active:scale-95 shadow-xs hover:shadow-md'
                  }`}
                >
                  <span className={item.isCollected ? 'grayscale' : ''}>{item.emoji}</span>
                  {item.isCollected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

        {/* Educational EF Tip Bar */}
        <div className="mt-4 w-full bg-teal-50 border border-teal-200 rounded-2xl p-3 flex items-start gap-2.5">
          <Brain className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <div className="text-xs text-teal-950 font-medium">
            <strong>ทักษะสมอง EF ที่ได้ฝึก:</strong> การจดจ่อใส่ใจ (Focus / Selective Attention) ช่วยให้เด็กรู้จักเลือกใส่ใจเฉพาะสิ่งที่เกี่ยวข้องและมีประโยชน์ ละเลยสิ่งรบกวนรอบตัว ซึ่งเป็นพื้นฐานสำคัญของการเรียนรู้ในห้องเรียน
          </div>
        </div>
      </div>
    </div>
  );
};
