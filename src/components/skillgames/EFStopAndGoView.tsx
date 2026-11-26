import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Grade } from '../../types';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  Brain,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertOctagon,
  ShieldCheck,
  Zap,
  Sparkles,
  Trophy,
  ArrowRight,
  Flame,
} from 'lucide-react';

interface EFStopAndGoViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
  gameStartedKey?: number;
}

interface SignalRound {
  id: string;
  type: 'go' | 'stop';
  title: string;
  emoji: string;
  instruction: string;
  timeLimitSec: number;
}

const SIGNAL_ROUNDS_CONFIG: Partial<Record<Grade, SignalRound[]>> & { K1: SignalRound[]; K2: SignalRound[]; K3: SignalRound[] } = {
  K1: [
    { id: 'k1_1', type: 'go', title: 'ด่าน 1: รถไฟแล่นฉิว 🚂', emoji: '🚂', instruction: 'ไฟเขียว! รถไฟมาแล้ว รีบแตะเลยจ้า!', timeLimitSec: 3.5 },
    { id: 'k1_2', type: 'stop', title: 'ด่าน 2: สัญญาณไฟแดง 🛑', emoji: '🛑', instruction: 'ไฟแดง! หยุดก่อนนะ ห้ามแตะเด็ดขาด!', timeLimitSec: 2.8 },
    { id: 'k1_3', type: 'go', title: 'ด่าน 3: ลูกบอลเด้งดึ๋ง ⚽', emoji: '⚽', instruction: 'ไฟเขียว! ลูกบอลมาแล้ว แตะเลย!', timeLimitSec: 3.2 },
    { id: 'k1_4', type: 'stop', title: 'ด่าน 4: ระฆังเตือนหยุด 🔔', emoji: '🛑', instruction: 'ไฟแดง! หยุดนิ่งๆ อดทนไว้จ้า!', timeLimitSec: 2.6 },
    { id: 'k1_5', type: 'go', title: 'ด่าน 5: เครื่องบินเหินฟ้า ✈️', emoji: '✈️', instruction: 'ไฟเขียว! เครื่องบินบินมา รีบแตะเลย!', timeLimitSec: 3.0 },
    { id: 'k1_6', type: 'stop', title: 'ด่าน 6: สัญญาณไฟแดง 🛑', emoji: '🛑', instruction: 'ไฟแดง! ห้ามแตะน้า นับ 1-2-3 ในใจ!', timeLimitSec: 2.5 },
    { id: 'k1_7', type: 'go', title: 'ด่าน 7: เป็ดน้อยว่ายน้ำ 🦆', emoji: '🦆', instruction: 'ไฟเขียว! เป็ดน้อยมา แตะได้เลย!', timeLimitSec: 2.8 },
    { id: 'k1_8', type: 'stop', title: 'ด่าน 8: สัญญาณหยุดพัก 🛑', emoji: '🛑', instruction: 'ไฟแดง! ยับยั้งใจไว้ ไม่แตะเด็ดขาด!', timeLimitSec: 2.5 },
    { id: 'k1_9', type: 'go', title: 'ด่าน 9: กระต่ายกระโดด 🐰', emoji: '🐰', instruction: 'ไฟเขียว! กระต่ายเริงร่า แตะเร็วเข้า!', timeLimitSec: 2.8 },
    { id: 'k1_10', type: 'stop', title: 'ด่าน 10: หมีน้อยหลับปุ๋ย 🐻', emoji: '🛑', instruction: 'ไฟแดง! หมีน้อยหลับอยู่ อย่าปลุกนะ!', timeLimitSec: 2.4 },
    { id: 'k1_11', type: 'go', title: 'ด่าน 11: เรือใบแล่นลม ⛵', emoji: '⛵', instruction: 'ไฟเขียว! เรือใบลอยมา รีบแตะเลย!', timeLimitSec: 2.7 },
    { id: 'k1_12', type: 'stop', title: 'ด่าน 12: ป้ายเตือนระวัง ⚠️', emoji: '🛑', instruction: 'ไฟแดง! สัญญาณหยุด คิดก่อนกดนะจ๊ะ!', timeLimitSec: 2.4 },
    { id: 'k1_13', type: 'go', title: 'ด่าน 13: แอปเปิ้ลแสนหวาน 🍎', emoji: '🍎', instruction: 'ไฟเขียว! เก็บแอปเปิ้ล แตะทันที!', timeLimitSec: 2.6 },
    { id: 'k1_14', type: 'stop', title: 'ด่าน 14: สัญญาณมือหยุด ✋', emoji: '🛑', instruction: 'ไฟแดง! ยกมือค้างไว้ ห้ามแตะน้า!', timeLimitSec: 2.3 },
    { id: 'k1_15', type: 'go', title: 'ด่าน 15: ผีเสื้อแสนสวย 🦋', emoji: '🦋', instruction: 'ไฟเขียว! ผีเสื้อบินมา แตะได้เลย!', timeLimitSec: 2.5 },
    { id: 'k1_16', type: 'stop', title: 'ด่าน 16: ไฟแดงระวัง 🛑', emoji: '🛑', instruction: 'ไฟแดง! สูดหายใจลึกๆ ยับยั้งชั่งใจ!', timeLimitSec: 2.3 },
    { id: 'k1_17', type: 'go', title: 'ด่าน 17: ดวงดาวส่องแสง ⭐', emoji: '⭐', instruction: 'ไฟเขียว! คว้าดวงดาวสีทอง แตะเร็ว!', timeLimitSec: 2.4 },
    { id: 'k1_18', type: 'stop', title: 'ด่าน 18: พักเหนื่อยชั่วคราว 🛑', emoji: '🛑', instruction: 'ไฟแดง! ควบคุมนิ้วมือ ห้ามกดนะจ๊ะ!', timeLimitSec: 2.2 },
    { id: 'k1_19', type: 'go', title: 'ด่าน 19: ลูกโป่งสวรรค์ 🎈', emoji: '🎈', instruction: 'ไฟเขียว! ลูกโป่งลอยขึ้นฟ้า แตะด่วน!', timeLimitSec: 2.3 },
    { id: 'k1_20', type: 'stop', title: 'ด่าน 20: มหาปราการไฟแดง 🛑', emoji: '🛑', instruction: 'ไฟแดงด่านสุดท้าย! สุดยอดการยับยั้งใจ!', timeLimitSec: 2.2 },
  ],
  K2: [
    { id: 'k2_1', type: 'go', title: 'ด่าน 1: กระต่ายกระโดด 🐰', emoji: '🐰', instruction: 'กระต่ายน่ารัก! แตะให้ทันนะจ๊ะ', timeLimitSec: 2.5 },
    { id: 'k2_2', type: 'stop', title: 'ด่าน 2: เต่าชวนพัก 🐢', emoji: '🐢', instruction: 'เต่าบอกให้หยุด! ห้ามแตะเด็ดขาดนะ', timeLimitSec: 2.2 },
    { id: 'k2_3', type: 'go', title: 'ด่าน 3: รถสปอร์ตสีแดง 🚗', emoji: '🚗', instruction: 'ไฟเขียวฉิว! รีบแตะเลย', timeLimitSec: 2.4 },
    { id: 'k2_4', type: 'stop', title: 'ด่าน 4: ป้ายหยุดฉุกเฉิน ⛔', emoji: '⛔', instruction: 'ป้ายหยุด! หยุดคิดก่อนกด อดทนไว้', timeLimitSec: 2.2 },
    { id: 'k2_5', type: 'go', title: 'ด่าน 5: ดาวตกแวววาว ⭐', emoji: '⭐', instruction: 'ดาวตกมาแล้ว! แตะรับดาวเร็ว', timeLimitSec: 2.3 },
    { id: 'k2_6', type: 'stop', title: 'ด่าน 6: หมีน้อยหลับปุ๋ย 🐻', emoji: '🐻', instruction: 'หมีหลับอยู่ อย่าปลุกนะ! ห้ามแตะ', timeLimitSec: 2.1 },
    { id: 'k2_7', type: 'go', title: 'ด่าน 7: สายรุ้งสดใส 🌈', emoji: '🌈', instruction: 'สายรุ้งโผล่มาแล้ว แตะด่วน!', timeLimitSec: 2.2 },
    { id: 'k2_8', type: 'stop', title: 'ด่าน 8: ไฟแดงเตือนภัย 🛑', emoji: '🛑', instruction: 'ไฟแดงแจ๋! ควบคุมตัวเอง ห้ามแตะนะ', timeLimitSec: 2.0 },
    { id: 'k2_9', type: 'go', title: 'ด่าน 9: โลมาพุ่งทะยาน 🐬', emoji: '🐬', instruction: 'ไฟเขียวโลมา! แตะทันใจก่อนดำน้ำ', timeLimitSec: 2.1 },
    { id: 'k2_10', type: 'stop', title: 'ด่าน 10: สัญญาณไซเรน 🚨', emoji: '🚨', instruction: 'ไซเรนแดง! ยับยั้งมือไว้ นิ่งสงบ!', timeLimitSec: 2.0 },
    { id: 'k2_11', type: 'go', title: 'ด่าน 11: เฮลิคอปเตอร์ 🚁', emoji: '🚁', instruction: 'ไฟเขียวบินฉิว! แตะคว้าเฮลิคอปเตอร์', timeLimitSec: 2.0 },
    { id: 'k2_12', type: 'stop', title: 'ด่าน 12: กบจำศีล 🐸', emoji: '🛑', instruction: 'กบหยุดนิ่ง! ห้ามแตะ หายใจเข้าลึกๆ', timeLimitSec: 1.9 },
    { id: 'k2_13', type: 'go', title: 'ด่าน 13: เชอร์รีหวานฉ่ำ 🍒', emoji: '🍒', instruction: 'ไฟเขียวผลไม้! แตะเก็บเชอร์รีเลย', timeLimitSec: 2.0 },
    { id: 'k2_14', type: 'stop', title: 'ด่าน 14: โคมไฟแดง 🏮', emoji: '🏮', instruction: 'ไฟแดงสว่าง! ยับยั้งชั่งใจ Stop & Think', timeLimitSec: 1.9 },
    { id: 'k2_15', type: 'go', title: 'ด่าน 15: เสือดาววิ่งไว 🐆', emoji: '🐆', instruction: 'ความไวสูง! เสือดาวมาแล้ว แตะด่วน!', timeLimitSec: 1.9 },
    { id: 'k2_16', type: 'stop', title: 'ด่าน 16: กำแพงหินแกร่ง 🧱', emoji: '🛑', instruction: 'กำแพงกั้น! หยุดทันควัน ห้ามแตะนะ!', timeLimitSec: 1.8 },
    { id: 'k2_17', type: 'go', title: 'ด่าน 17: ยานเหาะวิเศษ 🛸', emoji: '🛸', instruction: 'ไฟเขียวยานอวกาศ! แตะรับพลังวิเศษ', timeLimitSec: 1.8 },
    { id: 'k2_18', type: 'stop', title: 'ด่าน 18: ระฆังเงียบงัน 🔔', emoji: '🛑', instruction: 'สัญญาณหยุดเข้มงวด! อดทนรอเวลา', timeLimitSec: 1.8 },
    { id: 'k2_19', type: 'go', title: 'ด่าน 19: มงกุฎเจ้าหญิง 👑', emoji: '👑', instruction: 'มงกุฎทองคำ! แตะสวมมงกุฎเร็วเข้า!', timeLimitSec: 1.8 },
    { id: 'k2_20', type: 'stop', title: 'ด่าน 20: สุดยอดไฟแดง 20 ด่าน 🛑', emoji: '🛑', instruction: 'ด่าน 20 ปิดท้าย! แสดงพลังยับยั้งใจ EF!', timeLimitSec: 1.7 },
  ],
  K3: [
    { id: 'k3_1', type: 'go', title: 'ด่าน 1: จรวดพุ่งทะยาน 🚀', emoji: '🚀', instruction: 'ไฟเขียวจรวด! แตะทันทีแบบสายฟ้าแลบ', timeLimitSec: 2.0 },
    { id: 'k3_2', type: 'stop', title: 'ด่าน 2: สัญญาณห้ามสัมผัส 🚫', emoji: '🚫', instruction: 'สัญญาณห้าม! ยับยั้งชั่งใจ หยุดนิ่ง!', timeLimitSec: 1.8 },
    { id: 'k3_3', type: 'go', title: 'ด่าน 3: สิงโตเจ้าป่า 🦁', emoji: '🦁', instruction: 'สัตว์คำรามไฟเขียว! แตะเลย', timeLimitSec: 1.9 },
    { id: 'k3_4', type: 'stop', title: 'ด่าน 4: งูพิษชูคอ 🐍', emoji: '🐍', instruction: 'อันตราย! ห้ามแตะเด็ดขาดนะจ๊ะ', timeLimitSec: 1.7 },
    { id: 'k3_5', type: 'go', title: 'ด่าน 5: ลูกแก้ววิเศษ 🔮', emoji: '🔮', instruction: 'แตะลูกแก้วรับพลังความไว!', timeLimitSec: 1.8 },
    { id: 'k3_6', type: 'stop', title: 'ด่าน 6: ระเบิดเวลา 💣', emoji: '💣', instruction: 'หยุดมือด่วน! อย่าแตะระเบิดน้า', timeLimitSec: 1.7 },
    { id: 'k3_7', type: 'go', title: 'ด่าน 7: ทองคำส่องแสง 🏆', emoji: '🏆', instruction: 'ถ้วยรางวัลมาแล้ว แตะคว้าเลย!', timeLimitSec: 1.7 },
    { id: 'k3_8', type: 'stop', title: 'ด่าน 8: ไฟแดงเตือนภัย 🛑', emoji: '🛑', instruction: 'ไฟแดง! ทดสอบพลังควบคุมตนเอง EF', timeLimitSec: 1.6 },
    { id: 'k3_9', type: 'go', title: 'ด่าน 9: นกอินทรีโฉบ 🦅', emoji: '🦅', instruction: 'อินทรีเหินเวหา! ตอบสนองฉับไว แตะ!', timeLimitSec: 1.6 },
    { id: 'k3_10', type: 'stop', title: 'ด่าน 10: เขตหวงห้าม ⛔', emoji: '⛔', instruction: 'ป้ายห้ามเข้า! หยุดมือทันที อย่าเผลอ', timeLimitSec: 1.5 },
    { id: 'k3_11', type: 'go', title: 'ด่าน 11: อุกกาบาตเพลิง ☄️', emoji: '☄️', instruction: 'ไฟเขียวสายฟ้า! แตะสกัดอุกกาบาต', timeLimitSec: 1.6 },
    { id: 'k3_12', type: 'stop', title: 'ด่าน 12: ดักจับความเงียบ 🤫', emoji: '🛑', instruction: 'เงียบสนิท! ห้ามขยับนิ้ว ยับยั้งใจไว้', timeLimitSec: 1.5 },
    { id: 'k3_13', type: 'go', title: 'ด่าน 13: ฉลามสายฟ้า 🦈', emoji: '🦈', instruction: 'ฉลามว่ายไวมาก! แตะคว้าคะแนนด่วน!', timeLimitSec: 1.5 },
    { id: 'k3_14', type: 'stop', title: 'ด่าน 14: โซนอันตราย ⚠️', emoji: '🛑', instruction: 'หยุดฉุกเฉิน! ทดสอบสมองส่วนหน้า EF', timeLimitSec: 1.5 },
    { id: 'k3_15', type: 'go', title: 'ด่าน 15: เพชรประกายแสง 💎', emoji: '💎', instruction: 'เพชรเจิดจรัส! แตะคว้าเพชรเม็ดงาม', timeLimitSec: 1.5 },
    { id: 'k3_16', type: 'stop', title: 'ด่าน 16: กับดักลวงตา 🕸️', emoji: '🛑', instruction: 'ภาพลวงตา! ยับยั้งความอยากกด หยุดนิ่ง', timeLimitSec: 1.4 },
    { id: 'k3_17', type: 'go', title: 'ด่าน 17: คลื่นเสียงโซนิค ⚡', emoji: '⚡', instruction: 'ความเร็วเหนือแสง! แตะทันทีที่เห็น!', timeLimitSec: 1.4 },
    { id: 'k3_18', type: 'stop', title: 'ด่าน 18: แช่แข็งฉับพลัน ❄️', emoji: '🛑', instruction: 'น้ำแข็งเกาะ! หยุดนิ่ง ห้ามแตะเด็ดขาด!', timeLimitSec: 1.4 },
    { id: 'k3_19', type: 'go', title: 'ด่าน 19: ซูเปอร์โนวา 🌟', emoji: '🌟', instruction: 'แสงสว่างวาบ! แตะเก็บดาวซูเปอร์โนวา', timeLimitSec: 1.4 },
    { id: 'k3_20', type: 'stop', title: 'ด่าน 20: ไฟแดงแห่งแชมเปี้ยน 🛑', emoji: '🛑', instruction: 'ไฟแดงด่านสุดท้าย! สุดยอดการควบคุมตนเอง 20 ด่าน!', timeLimitSec: 1.3 },
  ],
};

export const EFStopAndGoView: React.FC<EFStopAndGoViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
  gameStartedKey,
}) => {
  const roundList = SIGNAL_ROUNDS_CONFIG[currentGrade] || SIGNAL_ROUNDS_CONFIG.K2;
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const activeSignal = roundList[currentLevelIndex] || roundList[0];

  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'active' | 'success' | 'fail'>('idle');
  const [timeLeft, setTimeLeft] = useState(activeSignal.timeLimitSec);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const timerRef = useRef<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  // When round or grade changes, reset to idle
  useEffect(() => {
    clearTimer();
    setGameState('idle');
    setTimeLeft(activeSignal.timeLimitSec);
    setFeedbackText('กดปุ่ม "เริ่มสัญญาณ" เพื่อเตรียมพร้อมรับสัญญาณ');
  }, [currentLevelIndex, currentGrade, gameStartedKey, activeSignal.timeLimitSec]);

  // Start the signal round
  const handleStartGame = useCallback(() => {
    clearTimer();
    soundEffects.playTap(soundVolume);
    setGameState('waiting');
    setFeedbackText('เตรียมตัวให้ดี... รอสัญญาณนะจ๊ะ!');
    speakText('เตรียมพร้อมนะจ๊ะ รอสัญญาณ!', 'th', soundVolume);

    // Random wait between 1.2s and 2.5s before signal appears
    const randomWaitMs = 1200 + Math.random() * 1300;

    timerRef.current = setTimeout(() => {
      setGameState('active');
      setTimeLeft(activeSignal.timeLimitSec);

      if (activeSignal.type === 'go') {
        soundEffects.playLevelUp(soundVolume);
        setFeedbackText('🟢 ไฟเขียว! รีบแตะเลยจ้า!');
        speakText('ไฟเขียว แตะเลย!', 'th', soundVolume);
      } else {
        soundEffects.playIncorrect(soundVolume);
        setFeedbackText('🔴 ไฟแดง! หยุดนิ่งๆ ห้ามแตะนะจ๊ะ!');
        speakText('ไฟแดง หยุด ห้ามแตะนะ!', 'th', soundVolume);
      }

      // Countdown for active signal
      const intervalMs = 100;
      let remaining = activeSignal.timeLimitSec;

      const countdownTimer = setInterval(() => {
        remaining -= intervalMs / 1000;
        setTimeLeft(Math.max(0, Number(remaining.toFixed(1))));

        if (remaining <= 0) {
          clearInterval(countdownTimer);

          // Evaluated when time runs out:
          if (activeSignal.type === 'stop') {
            // Success! Child refrained from tapping (Inhibitory control passed!)
            soundEffects.playVictory(soundVolume);
            confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
            setGameState('success');
            setScore((s) => s + 15);
            setStreak((st) => st + 1);
            setFeedbackText('🎉 เก่งมาก! ยับยั้งใจสำเร็จ ไม่แตะตอนไฟแดง');
            speakText('ยอดเยี่ยมมากจ้า ยับยั้งชั่งใจได้สำเร็จ!', 'th', soundVolume);
            if (onEarnStar) onEarnStar();
          } else {
            // Fail: Child didn't tap in time for 'go'
            soundEffects.playIncorrect(soundVolume);
            setGameState('fail');
            setStreak(0);
            setFeedbackText('⏰ หมดเวลาแล้วจ้า รถไฟแล่นผ่านไปแล้ว ไม่เป็นไรน้า');
            speakText('หมดเวลาจ้า ลองใหม่อีกครั้งนะ!', 'th', soundVolume);
          }
        }
      }, intervalMs);

      timerRef.current = countdownTimer;
    }, randomWaitMs);
  }, [activeSignal, soundVolume, onEarnStar]);

  // Handle tap on the main signal area
  const handleSignalTap = () => {
    if (gameState !== 'active') return;

    clearTimer();

    if (activeSignal.type === 'go') {
      // Correct! Child tapped on Go!
      soundEffects.playVictory(soundVolume);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      setGameState('success');
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
      setFeedbackText('⚡ ว่องไวมาก! แตะได้ทันเวลาพอดี');
      speakText('ว่องไวมากจ้า ยอดเยี่ยมเลย!', 'th', soundVolume);
      if (onEarnStar) onEarnStar();
    } else {
      // Mistake! Child tapped on Stop! (Inhibitory failure)
      soundEffects.playIncorrect(soundVolume);
      setGameState('fail');
      setStreak(0);
      setFeedbackText('⚠️ เอ๊ะ... ไฟแดงอยู่นะจ๊ะ ต้องหยุดคิดก่อนกด!');
      speakText('ไฟแดงอยู่นะจ๊ะ ต้องยับยั้งใจไว้ก่อนน้า!', 'th', soundVolume);
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
          colorTheme="rose"
          badgeSubtitle={`คะแนน: ${score} | สมาธิสตรีค: ${streak} 🔥`}
        />
      </div>

      {/* Main Game Arena */}
      <div className="w-full max-w-2xl bg-white rounded-3xl p-4 sm:p-6 border-3 border-rose-200 shadow-md flex flex-col items-center">
        {/* Title & Pedagogical EF Badge */}
        <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-rose-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🚦</span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                {activeSignal.title}
              </h2>
              <p className="text-xs text-rose-700 font-bold">
                {activeSignal.instruction}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-rose-100 text-rose-900 border border-rose-300 px-3 py-1 rounded-2xl text-xs font-black">
            <ShieldCheck className="w-4 h-4 text-rose-700" />
            <span>Inhibitory Control (ยับยั้งชั่งใจ)</span>
          </div>
        </div>

        {/* Status Prompt & Primary "เริ่มเล่นเกม" Button */}
        <div className="w-full bg-slate-50 border-2 border-dashed border-rose-300 rounded-2xl p-3.5 sm:p-4 mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="text-xs font-bold text-slate-500">สถานะสัญญาณ:</div>
            <div className="text-sm sm:text-base font-black text-slate-800 mt-0.5">
              {feedbackText}
            </div>
          </div>

          {/* Primary Action Button: เริ่มเล่นเกม */}
          <div className="flex items-center gap-2 shrink-0">
            {gameState === 'idle' || gameState === 'fail' ? (
              <button
                type="button"
                id="btn-start-stop-go-game"
                onClick={handleStartGame}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 animate-bounce hover:animate-none"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>เริ่มสัญญาณ 🚦</span>
              </button>
            ) : gameState === 'success' ? (
              <button
                type="button"
                onClick={handleNextLevel}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>ด่านถัดไป</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="text-xs font-black text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl">
                ⏱️ เหลือเวลา: {timeLeft} วิ
              </div>
            )}
          </div>
        </div>

        {/* Big Interactive Signal Screen */}
        <div
          onClick={handleSignalTap}
          className={`w-full max-w-md h-64 sm:h-72 rounded-3xl border-4 flex flex-col items-center justify-center gap-3 transition-all select-none cursor-pointer shadow-lg relative overflow-hidden ${
            gameState === 'idle'
              ? 'bg-slate-100 border-slate-300'
              : gameState === 'waiting'
              ? 'bg-amber-50 border-amber-300 animate-pulse'
              : gameState === 'active' && activeSignal.type === 'go'
              ? 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200 scale-102 ring-4 ring-emerald-300'
              : gameState === 'active' && activeSignal.type === 'stop'
              ? 'bg-rose-500 border-rose-600 text-white shadow-rose-200 scale-102 ring-4 ring-rose-300'
              : gameState === 'success'
              ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
              : 'bg-rose-100 border-rose-400 text-rose-950'
          }`}
        >
          {gameState === 'idle' && (
            <div className="flex flex-col items-center text-slate-400">
              <span className="text-6xl mb-2">🚦</span>
              <span className="text-sm font-black">พร้อมทดสอบทักษะยับยั้งชั่งใจ</span>
              <span className="text-xs font-medium text-slate-500 mt-1">กดปุ่ม "เริ่มสัญญาณ" ด้านบนเพื่อเริ่ม</span>
            </div>
          )}

          {gameState === 'waiting' && (
            <div className="flex flex-col items-center text-amber-800">
              <span className="text-6xl animate-spin mb-2">⏳</span>
              <span className="text-lg font-black">หายใจเข้าลึกๆ...</span>
              <span className="text-xs font-bold text-amber-700">จ้องมองหน้าจอให้ดี</span>
            </div>
          )}

          {gameState === 'active' && (
            <div className="flex flex-col items-center animate-in zoom-in-75 duration-150">
              <span className="text-7xl sm:text-8xl mb-2 filter drop-shadow-md">
                {activeSignal.emoji}
              </span>
              <span className="text-2xl sm:text-3xl font-black tracking-tight">
                {activeSignal.type === 'go' ? 'แตะเลย! (GO!)' : 'หยุด! ห้ามแตะ (STOP!)'}
              </span>
              <div className="mt-2 text-xs font-black bg-black/20 px-3 py-1 rounded-full">
                เวลา: {timeLeft} วินาที
              </div>
            </div>
          )}

          {gameState === 'success' && (
            <div className="flex flex-col items-center text-emerald-800 animate-in zoom-in duration-200">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-1" />
              <span className="text-xl font-black">ผ่านด่านสำเร็จ! +15 คะแนน</span>
              <span className="text-xs font-bold text-emerald-700 mt-1">
                {activeSignal.type === 'stop'
                  ? 'คุณหนูควบคุมตนเองได้ดีเยี่ยม ไม่เผลอกด'
                  : 'ตอบสนองได้รวดเร็วทันใจ'}
              </span>
            </div>
          )}

          {gameState === 'fail' && (
            <div className="flex flex-col items-center text-rose-800 animate-in shake duration-200">
              <AlertOctagon className="w-16 h-16 text-rose-600 mb-1" />
              <span className="text-lg font-black">พลาดไปนิดเดียวจ้า</span>
              <span className="text-xs font-bold text-rose-700 mt-1">
                {activeSignal.type === 'stop'
                  ? 'ไฟแดงต้องอดทนไม่แตะนะจ๊ะ ลองใหม่อีกครั้ง!'
                  : 'แตะไม่ทันเวลา ไม่เป็นไรน้า'}
              </span>
            </div>
          )}
        </div>

        {/* Educational EF Tip Bar */}
        <div className="mt-5 w-full bg-rose-50 border border-rose-200 rounded-2xl p-3 flex items-start gap-2.5">
          <Brain className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-950 font-medium">
            <strong>ทักษะสมอง EF ที่ได้ฝึก:</strong> การยับยั้งชั่งใจ (Inhibitory Control) เป็นทักษะสำคัญที่ช่วยให้เด็กหยุดคิดก่อนทำ รู้จักอดทนรอคอย และควบคุมตนเองเมื่อเจอกับสิ่งเร้า
          </div>
        </div>
      </div>
    </div>
  );
};
