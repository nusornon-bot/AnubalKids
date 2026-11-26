import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Grade } from '../../types';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  Brain,
  RotateCcw,
  Sparkles,
  Volume2,
  Play,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Flame,
  Music,
} from 'lucide-react';

interface EFSequenceMemoryViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
  gameStartedKey?: number;
}

interface PadItem {
  id: string;
  emoji: string;
  name: string;
  soundFreq: number;
  color: string;
  glowColor: string;
  activeColor: string;
}

const PAD_ITEMS: PadItem[] = [
  {
    id: 'pad_dog',
    emoji: '🐶',
    name: 'น้องหมา (โฮ่งๆ)',
    soundFreq: 261.63, // C4
    color: 'bg-amber-400 border-amber-500 text-amber-950',
    glowColor: 'shadow-amber-300 ring-amber-400',
    activeColor: 'bg-amber-300 scale-105 ring-4 ring-amber-400 shadow-xl',
  },
  {
    id: 'pad_cat',
    emoji: '🐱',
    name: 'น้องแมว (เหมียวๆ)',
    soundFreq: 329.63, // E4
    color: 'bg-rose-400 border-rose-500 text-rose-950',
    glowColor: 'shadow-rose-300 ring-rose-400',
    activeColor: 'bg-rose-300 scale-105 ring-4 ring-rose-400 shadow-xl',
  },
  {
    id: 'pad_frog',
    emoji: '🐸',
    name: 'กบน้อย (อ๊บๆ)',
    soundFreq: 392.0, // G4
    color: 'bg-emerald-400 border-emerald-500 text-emerald-950',
    glowColor: 'shadow-emerald-300 ring-emerald-400',
    activeColor: 'bg-emerald-300 scale-105 ring-4 ring-emerald-400 shadow-xl',
  },
  {
    id: 'pad_chick',
    emoji: '🐥',
    name: 'ลูกเจี๊ยบ (จิ๊บๆ)',
    soundFreq: 523.25, // C5
    color: 'bg-sky-400 border-sky-500 text-sky-950',
    glowColor: 'shadow-sky-300 ring-sky-400',
    activeColor: 'bg-sky-300 scale-105 ring-4 ring-sky-400 shadow-xl',
  },
];

interface RoundConfig {
  level: number;
  sequenceLength: number;
  speedMs: number;
  title: string;
  tip: string;
}

const ROUNDS_BY_GRADE: Partial<Record<Grade, RoundConfig[]>> & { K1: RoundConfig[]; K2: RoundConfig[]; K3: RoundConfig[] } = {
  K1: [
    { level: 1, sequenceLength: 2, speedMs: 1100, title: 'ด่าน 1: เริ่มต้น 2 ลำดับ', tip: 'ตั้งใจดูและฟังเสียงสัตว์ 2 ตัวนะจ๊ะ' },
    { level: 2, sequenceLength: 2, speedMs: 1050, title: 'ด่าน 2: สัตว์น้อยน่ารัก 2 ลำดับ', tip: 'จำว่าตัวไหนร้องก่อนและหลัง' },
    { level: 3, sequenceLength: 2, speedMs: 1000, title: 'ด่าน 3: สวนสัตว์หรรษา 2 ลำดับ', tip: 'สังเกตแสงไฟกระพริบและเสียงสัตว์' },
    { level: 4, sequenceLength: 3, speedMs: 1000, title: 'ด่าน 4: ก้าวสู่อีกขั้น 3 ลำดับ', tip: 'เพิ่มเป็น 3 ตัวแล้ว สู้ๆ นะ!' },
    { level: 5, sequenceLength: 3, speedMs: 950, title: 'ด่าน 5: จังหวะแสนสนุก 3 ลำดับ', tip: 'จำภาพตามลำดับที่สว่างขึ้นมา' },
    { level: 6, sequenceLength: 3, speedMs: 950, title: 'ด่าน 6: เสียงดนตรีเพื่อนรัก 3 ลำดับ', tip: 'ฟังให้ดี หมา แมว กบ หรือลูกเจี๊ยบ' },
    { level: 7, sequenceLength: 3, speedMs: 900, title: 'ด่าน 7: ท้าทายสมาธิ 3 ลำดับ', tip: 'เก่งมากจ้า จำ 3 ตัวให้แม่นยำ' },
    { level: 8, sequenceLength: 3, speedMs: 900, title: 'ด่าน 8: ก้าวหน้ามั่นคง 3 ลำดับ', tip: 'ท่องชื่อสัตว์ในใจทีละตัวนะลูก' },
    { level: 9, sequenceLength: 4, speedMs: 900, title: 'ด่าน 9: สุดยอดสมองไว 4 ลำดับ', tip: 'ลองจำ 4 ตัวดูนะ หนูทำได้แน่นอน!' },
    { level: 10, sequenceLength: 4, speedMs: 880, title: 'ด่าน 10: เสียงเพลงต่อเนื่อง 4 ลำดับ', tip: 'ทบทวนในใจก่อนกด' },
    { level: 11, sequenceLength: 4, speedMs: 850, title: 'ด่าน 11: ท่วงทำนองเพื่อนรัก 4 ลำดับ', tip: 'จับคู่เสียงกับปุ่มสีสดใส' },
    { level: 12, sequenceLength: 4, speedMs: 830, title: 'ด่าน 12: สายฝนแห่งเสียงเพลง 4 ลำดับ', tip: 'ฝึกความจำขณะทำงาน Working Memory' },
    { level: 13, sequenceLength: 4, speedMs: 800, title: 'ด่าน 13: ขบวนพาเหรดสัตว์ 4 ลำดับ', tip: 'จำจังหวะการเดินของขบวนสัตว์' },
    { level: 14, sequenceLength: 4, speedMs: 800, title: 'ด่าน 14: ปรมาจารย์ความจำ 4 ลำดับ', tip: 'ความจำขณะทำงาน EF แข็งแกร่งมาก' },
    { level: 15, sequenceLength: 4, speedMs: 780, title: 'ด่าน 15: เมโลดี้มหัศจรรย์ 4 ลำดับ', tip: 'ควบคุมสายตาไม่ให้วอกแวก' },
    { level: 16, sequenceLength: 5, speedMs: 820, title: 'ด่าน 16: ท้าทายระดับสูง 5 ลำดับ', tip: '5 ลำดับแห่งความตั้งใจ สมาธิแน่วแน่' },
    { level: 17, sequenceLength: 5, speedMs: 800, title: 'ด่าน 17: ดวงดาวนำทาง 5 ลำดับ', tip: 'จดจ่อที่ปุ่มไฟกระพริบทีละดวง' },
    { level: 18, sequenceLength: 5, speedMs: 780, title: 'ด่าน 18: วงซิมโฟนีย์ 5 ลำดับ', tip: 'สมองน้อยพร้อมเชื่อมโยงเสียงดนตรี' },
    { level: 19, sequenceLength: 5, speedMs: 750, title: 'ด่าน 19: ซูเปอร์สมาธิ 5 ลำดับ', tip: 'ใกล้ถึงเป้าหมายสูงสุดแล้ว สู้เต็มที่' },
    { level: 20, sequenceLength: 5, speedMs: 720, title: 'ด่าน 20: แชมเปี้ยนจำเสียง 20 ด่าน', tip: 'สุดยอดอัจฉริยะตัวน้อย พิชิตครบ 20 ด่าน!' },
  ],
  K2: [
    { level: 1, sequenceLength: 3, speedMs: 900, title: 'ด่าน 1: อุ่นเครื่อง 3 ลำดับ', tip: 'จำเสียงดนตรี 3 สัตว์แสนรู้' },
    { level: 2, sequenceLength: 3, speedMs: 850, title: 'ด่าน 2: จังหวะกระปรี้กระเปร่า 3 ลำดับ', tip: 'แตะตามให้ครบถ้วนนะ' },
    { level: 3, sequenceLength: 3, speedMs: 820, title: 'ด่าน 3: สมาธิว่องไว 3 ลำดับ', tip: 'ฟังและกดตามทันทีอย่างมั่นใจ' },
    { level: 4, sequenceLength: 4, speedMs: 850, title: 'ด่าน 4: เพิ่มพลังความจำ 4 ลำดับ', tip: '4 ลำดับต่อเนื่อง ท่องในใจเบาๆ' },
    { level: 5, sequenceLength: 4, speedMs: 800, title: 'ด่าน 5: เมโลดี้มหัศจรรย์ 4 ลำดับ', tip: 'ใช้หูฟังและสายตาพร้อมกัน' },
    { level: 6, sequenceLength: 4, speedMs: 780, title: 'ด่าน 6: ว่องไวแม่นยำ 4 ลำดับ', tip: 'ควบคุมสายตาไม่ให้วอกแวก' },
    { level: 7, sequenceLength: 4, speedMs: 750, title: 'ด่าน 7: เสียงร้องประสาน 4 ลำดับ', tip: 'จำสัตว์ 4 ตัวได้อย่างแม่นยำ' },
    { level: 8, sequenceLength: 4, speedMs: 720, title: 'ด่าน 8: ซ้อมใหญ่สมองไว 4 ลำดับ', tip: 'เตรียมพร้อมสำหรับ 5 ลำดับ' },
    { level: 9, sequenceLength: 5, speedMs: 780, title: 'ด่าน 9: ก้าวสู่ 5 ลำดับขั้นสูง', tip: '5 ลำดับมาแล้ว ตั้งสมาธิให้ดี!' },
    { level: 10, sequenceLength: 5, speedMs: 750, title: 'ด่าน 10: ท้าทายระดับสูง 5 ลำดับ', tip: 'สุดยอดไปเลย 5 ลำดับ!' },
    { level: 11, sequenceLength: 5, speedMs: 720, title: 'ด่าน 11: ดนตรีหรรษา 5 ลำดับ', tip: 'ฝึกฝน Working Memory ชั้นยอด' },
    { level: 12, sequenceLength: 5, speedMs: 700, title: 'ด่าน 12: เจ้าแห่งความจำเสียง 5 ลำดับ', tip: 'จำได้ครบถ้วน ชนะเลิศ!' },
    { level: 13, sequenceLength: 5, speedMs: 680, title: 'ด่าน 13: เมโลดี้คลื่นเสียง 5 ลำดับ', tip: 'นิ่งสงบ จดจ่อ สมาธิไม่หลุด' },
    { level: 14, sequenceLength: 5, speedMs: 650, title: 'ด่าน 14: ปราการแห่งสมาธิ 5 ลำดับ', tip: 'ตอบสนองอย่างรวดเร็วและถูกต้อง' },
    { level: 15, sequenceLength: 5, speedMs: 620, title: 'ด่าน 15: คอรัสสัตว์ป่า 5 ลำดับ', tip: 'เสียงดนตรีนำทางความจำ' },
    { level: 16, sequenceLength: 6, speedMs: 700, title: 'ด่าน 16: สุดยอดท้าทาย 6 ลำดับ', tip: 'เพิ่มเป็น 6 ลำดับ ก้าวสู่อัจฉริยะ!' },
    { level: 17, sequenceLength: 6, speedMs: 680, title: 'ด่าน 17: พาเหรดแห่งความจำ 6 ลำดับ', tip: 'จับกลุ่มจำ 3 ตัวแรก และ 3 ตัวหลัง' },
    { level: 18, sequenceLength: 6, speedMs: 650, title: 'ด่าน 18: พลังสมองทองคำ 6 ลำดับ', tip: 'ความจำขณะทำงาน EF แข็งแกร่งมาก' },
    { level: 19, sequenceLength: 6, speedMs: 620, title: 'ด่าน 19: ไฮสปีดเมโลดี้ 6 ลำดับ', tip: 'อีกก้าวเดียวจะคว้าชัยชนะสูงสุด!' },
    { level: 20, sequenceLength: 6, speedMs: 600, title: 'ด่าน 20: มหาแชมเปี้ยน 20 ด่าน K2', tip: 'สุดยอดพลังสมอง EF พิชิต 20 ด่านสมบูรณ์แบบ!' },
  ],
  K3: [
    { level: 1, sequenceLength: 3, speedMs: 800, title: 'ด่าน 1: เริ่มต้น 3 ลำดับฉับไว', tip: 'วอร์มอัปสมองวัย 5-6 ขวบ' },
    { level: 2, sequenceLength: 4, speedMs: 750, title: 'ด่าน 2: วงดนตรีสัตว์ 4 ลำดับ', tip: 'จำลำดับเสียงให้แม่นยำ' },
    { level: 3, sequenceLength: 4, speedMs: 720, title: 'ด่าน 3: จังหวะกระชับ 4 ลำดับ', tip: 'ตอบสนองอย่างรวดเร็ว' },
    { level: 4, sequenceLength: 4, speedMs: 700, title: 'ด่าน 4: ความเร็วสูง 4 ลำดับ', tip: 'ตอบสนองอย่างมั่นใจ' },
    { level: 5, sequenceLength: 5, speedMs: 720, title: 'ด่าน 5: ทักษะสมอง EF 5 ลำดับ', tip: '5 ลำดับเต็ม ฝึกสมองส่วนหน้า' },
    { level: 6, sequenceLength: 5, speedMs: 680, title: 'ด่าน 6: จังหวะซิมโฟนี 5 ลำดับ', tip: 'สังเกตและฟังอย่างตั้งใจ' },
    { level: 7, sequenceLength: 5, speedMs: 650, title: 'ด่าน 7: เสียงสะท้อนแห่งป่า 5 ลำดับ', tip: 'จำคู่เสียงและภาพอย่างเป็นระบบ' },
    { level: 8, sequenceLength: 5, speedMs: 620, title: 'ด่าน 8: มิติแห่งเสียง 5 ลำดับ', tip: 'สมาธิต่อเนื่อง ไม่ยอมแพ้' },
    { level: 9, sequenceLength: 6, speedMs: 680, title: 'ด่าน 9: ซูเปอร์ท้าทาย 6 ลำดับ', tip: '6 ลำดับสุดยอดอัจฉริยะ!' },
    { level: 10, sequenceLength: 6, speedMs: 650, title: 'ด่าน 10: มหัศจรรย์สายฟ้า 6 ลำดับ', tip: 'สมาธิต่อเนื่อง จำแบบแบ่งท่อน' },
    { level: 11, sequenceLength: 6, speedMs: 620, title: 'ด่าน 11: ท่วงทำนองไร้พ่าย 6 ลำดับ', tip: 'ท่องจำในใจขณะฟัง' },
    { level: 12, sequenceLength: 6, speedMs: 600, title: 'ด่าน 12: ปรากฏการณ์ความจำ 6 ลำดับ', tip: 'ควบคุมตัวเองไม่ให้รีบกดก่อนฟังจบ' },
    { level: 13, sequenceLength: 6, speedMs: 580, title: 'ด่าน 13: ซิมโฟนีอวกาศ 6 ลำดับ', tip: 'ความเร็วสูง สมาธิคมชัด' },
    { level: 14, sequenceLength: 6, speedMs: 550, title: 'ด่าน 14: แชมเปี้ยน EF 6 ลำดับ', tip: 'ทักษะ Working Memory ระดับยอดเยี่ยม!' },
    { level: 15, sequenceLength: 7, speedMs: 620, title: 'ด่าน 15: ก้าวข้ามขีดจำกัด 7 ลำดับ', tip: '7 ลำดับระดับเทพ ท่องจำกลุ่ม 3-2-2' },
    { level: 16, sequenceLength: 7, speedMs: 600, title: 'ด่าน 16: บทเพลงดวงดาว 7 ลำดับ', tip: 'จดจ่อขั้นสูงสุด ไม่มีอะไรกวนใจ' },
    { level: 17, sequenceLength: 7, speedMs: 580, title: 'ด่าน 17: คลื่นเสียงอัจฉริยะ 7 ลำดับ', tip: 'สายตากวาดมองปุ่มอย่างว่องไว' },
    { level: 18, sequenceLength: 7, speedMs: 550, title: 'ด่าน 18: พลังสมองขั้นสูงสุด 7 ลำดับ', tip: 'Working Memory แข็งแกร่งระดับแถวหน้า' },
    { level: 19, sequenceLength: 7, speedMs: 520, title: 'ด่าน 19: ซูเปอร์โซนิค 7 ลำดับ', tip: 'ด่านก่อนชิงแชมป์ ตั้งใจเต็มร้อย!' },
    { level: 20, sequenceLength: 7, speedMs: 500, title: 'ด่าน 20: ปรมาจารย์ EF สูงสุด 20 ด่าน', tip: 'สุดยอดอัจฉริยะจำเสียง 20 ด่านเต็ม! รับถ้วยทองเกียรติยศ!' },
  ],
};

export const EFSequenceMemoryView: React.FC<EFSequenceMemoryViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
  gameStartedKey,
}) => {
  const rounds = ROUNDS_BY_GRADE[currentGrade] || ROUNDS_BY_GRADE.K2;
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const activeRound = rounds[currentLevelIndex] || rounds[0];

  const [sequence, setSequence] = useState<string[]>([]);
  const [playerInput, setPlayerInput] = useState<string[]>([]);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [activePadId, setActivePadId] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'player_turn' | 'success' | 'fail'>('idle');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const playTone = useCallback((freq: number) => {
    if (soundVolume <= 0) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(soundVolume * 0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch {
      // ignore
    }
  }, [soundVolume]);

  const flashPad = useCallback((padId: string) => {
    const pad = PAD_ITEMS.find((p) => p.id === padId);
    if (pad) {
      setActivePadId(padId);
      playTone(pad.soundFreq);
      const t = setTimeout(() => {
        setActivePadId(null);
      }, 350);
      timersRef.current.push(t);
    }
  }, [playTone]);

  // Generate random sequence for this round
  const generateNewSequence = useCallback(() => {
    const newSeq: string[] = [];
    for (let i = 0; i < activeRound.sequenceLength; i++) {
      const randomPad = PAD_ITEMS[Math.floor(Math.random() * PAD_ITEMS.length)];
      newSeq.push(randomPad.id);
    }
    return newSeq;
  }, [activeRound.sequenceLength]);

  // Play the sequence demo to the child
  const playSequenceDemo = useCallback((seq: string[]) => {
    clearAllTimers();
    setIsPlayingDemo(true);
    setGameState('showing');
    setPlayerInput([]);

    seq.forEach((padId, index) => {
      const delay = 600 + index * activeRound.speedMs;
      const t = setTimeout(() => {
        flashPad(padId);
      }, delay);
      timersRef.current.push(t);
    });

    const finishDelay = 600 + seq.length * activeRound.speedMs + 400;
    const tFinish = setTimeout(() => {
      setIsPlayingDemo(false);
      setGameState('player_turn');
      speakText('ถึงตาหนูแล้วจ้า แตะตามลำดับเลย!', 'th', soundVolume);
    }, finishDelay);
    timersRef.current.push(tFinish);
  }, [activeRound.speedMs, flashPad, soundVolume]);

  // Start round
  const handleStartRound = useCallback(() => {
    soundEffects.playTap(soundVolume);
    const newSeq = generateNewSequence();
    setSequence(newSeq);
    playSequenceDemo(newSeq);
  }, [generateNewSequence, playSequenceDemo, soundVolume]);

  // Reset or initialize on level change
  useEffect(() => {
    clearAllTimers();
    setGameState('idle');
    setSequence([]);
    setPlayerInput([]);
    setActivePadId(null);
  }, [currentLevelIndex, currentGrade, gameStartedKey]);

  // Handle player pad tap
  const handlePadClick = (padId: string) => {
    if (gameState !== 'player_turn' || isPlayingDemo) return;

    flashPad(padId);
    soundEffects.playTap(soundVolume);

    const nextIndex = playerInput.length;
    const expectedPadId = sequence[nextIndex];
    const newPlayerInput = [...playerInput, padId];
    setPlayerInput(newPlayerInput);

    if (padId !== expectedPadId) {
      // Wrong tap
      soundEffects.playIncorrect(soundVolume);
      setGameState('fail');
      setStreak(0);
      speakText('เอ๊ะ ลำดับยังไม่ตรงจ้า ลองกดเริ่มเล่นใหม่นะ!', 'th', soundVolume);
      return;
    }

    // Correct tap so far
    if (newPlayerInput.length === sequence.length) {
      // Completed full sequence!
      soundEffects.playVictory(soundVolume);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      setGameState('success');
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
      speakText('เก่งมากจ้า! จำได้ครบถ้วนเลย', 'th', soundVolume);

      if (onEarnStar) {
        onEarnStar();
      }
    }
  };

  const handleNextLevel = () => {
    soundEffects.playTap(soundVolume);
    if (currentLevelIndex < rounds.length - 1) {
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
          totalLevels={rounds.length}
          currentIndex={currentLevelIndex}
          onSelectLevel={(idx) => {
            soundEffects.playTap(soundVolume);
            setCurrentLevelIndex(idx);
          }}
          prefix="ด่าน"
          colorTheme="cyan"
          badgeSubtitle={`คะแนน: ${score} | สตรีค: ${streak} 🔥`}
        />
      </div>

      {/* Game Card Container */}
      <div className="w-full max-w-2xl bg-white rounded-3xl p-4 sm:p-6 border-3 border-cyan-200 shadow-md flex flex-col items-center">
        {/* Title & Pedagogical EF Badge */}
        <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-cyan-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎵</span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                {activeRound.title}
              </h2>
              <p className="text-xs text-cyan-800 font-bold">
                {activeRound.tip}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-cyan-100 text-cyan-900 border border-cyan-300 px-3 py-1 rounded-2xl text-xs font-black">
            <Brain className="w-4 h-4 text-cyan-700" />
            <span>Working Memory (EF)</span>
          </div>
        </div>

        {/* Status Prompt & Primary "เริ่มเล่นเกม" Button */}
        <div className="w-full bg-slate-50 border-2 border-dashed border-cyan-300 rounded-2xl p-3.5 sm:p-4 mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="text-xs font-bold text-slate-500">สถานะเกม:</div>
            <div className="text-sm sm:text-base font-black text-slate-800 mt-0.5">
              {gameState === 'idle' && 'กดปุ่ม "ฟังเสียงลำดับ" เพื่อดูและฟังจังหวะสัตว์'}
              {gameState === 'showing' && '👀 สังเกตและฟังลำดับให้ดีนะจ๊ะ...'}
              {gameState === 'player_turn' && (
                <span className="text-emerald-700 flex items-center gap-1.5 justify-center sm:justify-start">
                  <span>👉 แตะสัตว์ตามลำดับ:</span>
                  <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-lg text-xs font-black">
                    {playerInput.length} / {sequence.length}
                  </span>
                </span>
              )}
              {gameState === 'success' && (
                <span className="text-emerald-600 flex items-center gap-1 justify-center sm:justify-start">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>ยอดเยี่ยมมาก! ความจำถูกต้อง 100%</span>
                </span>
              )}
              {gameState === 'fail' && (
                <span className="text-rose-600">
                  เอ๊ะ... ลำดับยังไม่ถูกจ้า ไม่เป็นไรน้า ลองใหม่อีกครั้ง!
                </span>
              )}
            </div>
          </div>

          {/* Primary Action Button: ฟังเสียงลำดับ */}
          <div className="flex items-center gap-2 shrink-0">
            {gameState === 'idle' || gameState === 'fail' ? (
              <button
                type="button"
                id="btn-start-sequence-memory-game"
                onClick={handleStartRound}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 animate-bounce hover:animate-none"
              >
                <Music className="w-5 h-5" />
                <span>ฟังเสียงลำดับ 🎵</span>
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
              <button
                type="button"
                onClick={handleStartRound}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-900 bg-white text-xs font-bold cursor-pointer"
                title="เริ่มเล่นรอบนี้ใหม่"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>เล่นใหม่</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Interactive Musical EF Pads */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 w-full max-w-md my-2">
          {PAD_ITEMS.map((pad) => {
            const isActive = activePadId === pad.id;

            return (
              <button
                key={pad.id}
                type="button"
                id={`btn-ef-pad-${pad.id}`}
                onClick={() => handlePadClick(pad.id)}
                disabled={gameState !== 'player_turn' || isPlayingDemo}
                className={`p-4 sm:p-6 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer select-none min-h-[120px] sm:min-h-[140px] ${
                  pad.color
                } ${
                  isActive ? pad.activeColor : 'hover:scale-103 shadow-md hover:shadow-lg active:scale-95'
                } ${
                  gameState !== 'player_turn' && !isActive
                    ? 'opacity-85 cursor-not-allowed'
                    : ''
                }`}
              >
                <span className={`text-4xl sm:text-5xl transition-transform ${isActive ? 'scale-125' : ''}`}>
                  {pad.emoji}
                </span>
                <span className="font-black text-xs sm:text-sm tracking-tight">
                  {pad.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sequence Progress Dots */}
        {sequence.length > 0 && (
          <div className="mt-5 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">ความคืบหน้า:</span>
            <div className="flex items-center gap-1.5">
              {sequence.map((padId, idx) => {
                const isGuessed = idx < playerInput.length;
                const isNext = idx === playerInput.length && gameState === 'player_turn';

                return (
                  <div
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                      isGuessed
                        ? 'bg-emerald-500 border-emerald-600 scale-110'
                        : isNext
                        ? 'bg-amber-300 border-amber-500 animate-ping'
                        : 'bg-slate-200 border-slate-300'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
