import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  X,
  Sparkles,
  RotateCcw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Star,
  Video,
  VideoOff,
  PenTool,
  CheckCircle2,
  Award,
  Layers,
  BookOpen,
} from 'lucide-react';
import {
  THAI_16_VOWELS_META,
  THAI_PHONICS_WORDS_META,
  ThaiVowelDef,
  ThaiPhonicsWordDef,
} from '../data/thaiPhonicsTracingData';
import { THAI_44_CONSONANTS_META, ThaiConsonantDef, TracingCheckpoint } from '../data/handTracingData';
import { speakText, isAudioMuted, soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';

interface ThaiPhonicsAirWritingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEarnStar?: () => void;
  soundVolume?: number;
}

type ModeTab = 'vowels' | 'consonants' | 'words';

const MID_CONSONANTS = new Set(['ก', 'จ', 'ด', 'ต', 'บ', 'ป', 'อ', 'ฎ', 'ฏ']);
const HIGH_CONSONANTS = new Set(['ข', 'ฃ', 'ฉ', 'ฐ', 'ถ', 'ผ', 'ฝ', 'ศ', 'ษ', 'ส', 'ห']);

export const ThaiPhonicsAirWritingModal: React.FC<ThaiPhonicsAirWritingModalProps> = ({
  isOpen,
  onClose,
  onEarnStar,
  soundVolume = 0.8,
}) => {
  const [activeTab, setActiveTab] = useState<ModeTab>('vowels');
  const [vowelIndex, setVowelIndex] = useState(0);
  const [consonantIndex, setConsonantIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Brush settings
  const [brushColor, setBrushColor] = useState(() => {
    const pen = localStorage.getItem('air_writing_pen_effect');
    if (pen === 'golden_stardust') return '#f59e0b';
    if (pen === 'cosmic_galaxy') return '#8b5cf6';
    if (pen === 'forest_nature') return '#10b981';
    return '#2563eb';
  });
  const [brushSize, setBrushSize] = useState(14);

  // Tracing progress
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState(0);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);

  // Hand tracking via webcam
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'starting' | 'active' | 'unsupported' | 'denied'>('idle');
  const [handPoint, setHandPoint] = useState<{ x: number; y: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isPointerDownRef = useRef(false);
  const tracedPointsRef = useRef<Array<{ x: number; y: number }>>([]);

  // Active definition
  const activeVowel = THAI_16_VOWELS_META[vowelIndex] || THAI_16_VOWELS_META[0];
  const activeConsonant = THAI_44_CONSONANTS_META[consonantIndex] || THAI_44_CONSONANTS_META[0];
  const activeWord = THAI_PHONICS_WORDS_META[wordIndex] || THAI_PHONICS_WORDS_META[0];

  const currentItem = useMemo(() => {
    if (activeTab === 'vowels') {
      return {
        id: activeVowel.char,
        display: `—${activeVowel.char}`,
        title: activeVowel.name,
        subtitle: activeVowel.subname,
        soundDesc: activeVowel.sound,
        checkpoints: activeVowel.checkpoints,
      };
    }
    if (activeTab === 'consonants') {
      const cls = MID_CONSONANTS.has(activeConsonant.char)
        ? 'อักษรกลาง (๙ ตัว)'
        : HIGH_CONSONANTS.has(activeConsonant.char)
        ? 'อักษรสูง (๑๑ ตัว)'
        : 'อักษรต่ำ (๒๔ ตัว)';
      return {
        id: activeConsonant.char,
        display: activeConsonant.char,
        title: activeConsonant.name,
        subtitle: `${activeConsonant.subname} • ${cls}`,
        soundDesc: activeConsonant.voice,
        checkpoints: activeConsonant.checkpoints,
      };
    }
    return {
      id: activeWord.word,
      display: activeWord.word,
      title: `คำว่า "${activeWord.word}" ${activeWord.emoji}`,
      subtitle: `${activeWord.unitName} (${activeWord.breakdown})`,
      soundDesc: `สะกดว่า ${activeWord.breakdown} อ่านว่า ${activeWord.word}`,
      checkpoints: activeWord.checkpoints,
    };
  }, [activeTab, activeVowel, activeConsonant, activeWord]);

  // Voice narration
  const speakCurrent = useCallback(() => {
    if (soundVolume <= 0.01 || isAudioMuted()) return;
    try {
      speakText(`${currentItem.title}. ${currentItem.soundDesc}`, 'th', 'adult_female');
    } catch {
      // fallback
    }
  }, [currentItem, soundVolume]);

  // Reset drawing when item changes
  useEffect(() => {
    setCurrentCheckpointIndex(0);
    setCompletedCheckpoints([]);
    setIsCompleted(false);
    setAccuracyScore(null);
    tracedPointsRef.current = [];

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    const timer = setTimeout(() => {
      speakCurrent();
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab, vowelIndex, consonantIndex, wordIndex, speakCurrent]);

  // Handle pointer down/move/up
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isPointerDownRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    tracedPointsRef.current.push({ x, y });
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = brushColor;
      const activePen = localStorage.getItem('air_writing_pen_effect');
      ctx.shadowBlur = activePen ? 12 : 4;
      ctx.shadowColor = brushColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
    checkCheckpointHit(x, y, rect.width, rect.height);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDownRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    tracedPointsRef.current.push({ x, y });
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    checkCheckpointHit(x, y, rect.width, rect.height);
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
  };

  // Checkpoint validation
  const checkCheckpointHit = (px: number, py: number, width: number, height: number) => {
    if (isCompleted || !currentItem.checkpoints) return;
    const nextTarget = currentItem.checkpoints[currentCheckpointIndex];
    if (!nextTarget) return;

    const targetX = (nextTarget.x / 100) * width;
    const targetY = (nextTarget.y / 100) * height;
    const dist = Math.hypot(px - targetX, py - targetY);

    // Hit tolerance (around 48px)
    if (dist <= 48) {
      soundEffects.playTap(soundVolume);
      const newCompleted = [...completedCheckpoints, currentCheckpointIndex];
      setCompletedCheckpoints(newCompleted);

      if (currentCheckpointIndex + 1 < currentItem.checkpoints.length) {
        setCurrentCheckpointIndex(currentCheckpointIndex + 1);
      } else {
        // Completed all checkpoints!
        setIsCompleted(true);
        const score = Math.min(100, Math.max(85, Math.floor(90 + Math.random() * 10)));
        setAccuracyScore(score);
        soundEffects.playVictory(soundVolume);
        onEarnStar?.();

        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });

        if (soundVolume > 0.01 && !isAudioMuted()) {
          speakText(`ยอดเยี่ยมมาก! เขียน ${currentItem.title} สำเร็จแล้ว`, 'th', 'adult_female');
        }
      }
    }
  };

  // Webcam Hand Tracking
  useEffect(() => {
    if (!isOpen || !isCameraActive) {
      setHandPoint(null);
      setCameraStatus('idle');
      return;
    }

    let isMounted = true;
    let stream: MediaStream | null = null;
    let animId: number | null = null;

    async function initCamera() {
      try {
        setCameraStatus('starting');
        const win = window as unknown as {
          Hands?: new (config: { locateFile: (file: string) => string }) => {
            setOptions: (opts: unknown) => void;
            onResults: (cb: (results: { multiHandLandmarks?: Array<Array<{ x: number; y: number; z: number }>> }) => void) => void;
            send: (input: { image: HTMLVideoElement }) => Promise<void>;
          };
        };

        if (!win.Hands) {
          setCameraStatus('unsupported');
          return;
        }

        const hands = new win.Hands({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`,
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 0,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((results) => {
          if (!isMounted) return;
          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const indexTip = results.multiHandLandmarks[0][8];
            const smoothX = 1 - indexTip.x;
            const smoothY = indexTip.y;
            setHandPoint({ x: smoothX, y: smoothY });

            // Air-writing hit check on canvas
            const canvas = canvasRef.current;
            if (canvas) {
              const rect = canvas.getBoundingClientRect();
              const canvasX = smoothX * rect.width;
              const canvasY = smoothY * rect.height;
              checkCheckpointHit(canvasX, canvasY, rect.width, rect.height);
            }
          } else {
            setHandPoint(null);
          }
        });

        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 480 }, height: { ideal: 360 }, facingMode: 'user' },
          audio: false,
        });

        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play();
          setCameraStatus('active');

          const processFrame = async () => {
            if (!isMounted || !video || video.paused || video.ended) return;
            try {
              await hands.send({ image: video });
            } catch {
              // frame dropped
            }
            if (isMounted) animId = requestAnimationFrame(processFrame);
          };
          animId = requestAnimationFrame(processFrame);
        }
      } catch (err) {
        console.warn('Air-writing camera notice:', err);
        setCameraStatus('denied');
      }
    }

    initCamera();

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [isOpen, isCameraActive]);

  // Clear canvas
  const handleClear = () => {
    setCurrentCheckpointIndex(0);
    setCompletedCheckpoints([]);
    setIsCompleted(false);
    setAccuracyScore(null);
    tracedPointsRef.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Next / Previous
  const handlePrev = () => {
    if (activeTab === 'vowels') {
      setVowelIndex((prev) => (prev > 0 ? prev - 1 : THAI_16_VOWELS_META.length - 1));
    } else if (activeTab === 'consonants') {
      setConsonantIndex((prev) => (prev > 0 ? prev - 1 : THAI_44_CONSONANTS_META.length - 1));
    } else {
      setWordIndex((prev) => (prev > 0 ? prev - 1 : THAI_PHONICS_WORDS_META.length - 1));
    }
  };

  const handleNext = () => {
    if (activeTab === 'vowels') {
      setVowelIndex((prev) => (prev + 1) % THAI_16_VOWELS_META.length);
    } else if (activeTab === 'consonants') {
      setConsonantIndex((prev) => (prev + 1) % THAI_44_CONSONANTS_META.length);
    } else {
      setWordIndex((prev) => (prev + 1) % THAI_PHONICS_WORDS_META.length);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
              ✍️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-900 shadow-sm">
                  บูรณาการ สพฐ. & ปฐมวัย
                </span>
                <span className="text-xs text-white/80">Air-Writing Phonics Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                คัดลายมือแจกลูกสะกดคำ & ลากเส้นกลางอากาศ
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white/90 hover:text-white"
            title="ปิดหน้าต่าง"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="bg-slate-100 p-2 sm:px-6 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('vowels')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                activeTab === 'vowels'
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                  : 'bg-white text-slate-700 hover:bg-emerald-50'
              }`}
            >
              <span>💧</span>
              <span>สระ ๑๖ รูป (หน่วยที่ ๒)</span>
            </button>

            <button
              onClick={() => setActiveTab('consonants')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                activeTab === 'consonants'
                  ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                  : 'bg-white text-slate-700 hover:bg-blue-50'
              }`}
            >
              <span>🔤</span>
              <span>พยัญชนะ ๔๔ ตัว (อักษร ๓ หมู่)</span>
            </button>

            <button
              onClick={() => setActiveTab('words')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                activeTab === 'words'
                  ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                  : 'bg-white text-slate-700 hover:bg-purple-50'
              }`}
            >
              <span>📖</span>
              <span>คำแจกลูกสะกดคำ (ป.๑-๓)</span>
            </button>
          </div>

          {/* Camera toggle */}
          <button
            onClick={() => setIsCameraActive(!isCameraActive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isCameraActive
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
            }`}
            title="เปิดกล้องตรวจจับการเคลื่อนไหวนิ้วมือกลางอากาศ"
          >
            {isCameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            <span>{isCameraActive ? 'กำลังใช้กล้องตรวจจับมือ' : 'เขียนกลางอากาศ (เปิดกล้อง)'}</span>
          </button>
        </div>

        {/* Workspace Canvas & Information */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Left / Center Board: Character Drawing Canvas */}
          <div className="md:col-span-8 flex flex-col items-center">
            {/* Active Word/Char Banner */}
            <div className="w-full flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-sm"
                  title="ตัวก่อนหน้า"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                    {currentItem.title}
                    <button
                      onClick={speakCurrent}
                      className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                      title="ฟังเสียงสะกดคำ"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </h3>
                  <p className="text-xs font-medium text-slate-500">{currentItem.subtitle}</p>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-sm"
                title="ตัวถัดไป"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Tracing Canvas Frame */}
            <div
              ref={boardRef}
              className="relative w-full max-w-md aspect-[4/3] bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl border-4 border-amber-300 shadow-inner flex items-center justify-center overflow-hidden touch-none select-none cursor-crosshair"
            >
              {/* Background Guide Character */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 select-none">
                <span className="text-[120px] sm:text-[150px] font-black text-slate-800 tracking-wider">
                  {currentItem.display}
                </span>
              </div>

              {/* Tracing Checkpoint Dots */}
              {currentItem.checkpoints?.map((cp, idx) => {
                const isHit = completedCheckpoints.includes(idx);
                const isNext = idx === currentCheckpointIndex;
                return (
                  <div
                    key={idx}
                    style={{ left: `${cp.x}%`, top: `${cp.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all shadow-md ${
                      isHit
                        ? 'bg-emerald-500 text-white scale-90 ring-4 ring-emerald-200'
                        : isNext
                        ? 'bg-rose-500 text-white scale-110 animate-bounce ring-4 ring-rose-300'
                        : 'bg-white/90 text-slate-700 border-2 border-slate-300'
                    }`}
                  >
                    {isHit ? '✓' : cp.label}
                  </div>
                );
              })}

              {/* Drawing Canvas */}
              <canvas
                ref={canvasRef}
                width={450}
                height={338}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="absolute inset-0 w-full h-full z-10"
              />

              {/* Hand Tracking Cursor */}
              {handPoint && (
                <div
                  style={{ left: `${handPoint.x * 100}%`, top: `${handPoint.y * 100}%` }}
                  className="absolute pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-400/80 border-2 border-white shadow-lg flex items-center justify-center animate-ping"
                >
                  <span className="text-xs">👆</span>
                </div>
              )}

              {/* Completion Overlay */}
              {isCompleted && (
                <div className="absolute inset-0 z-30 bg-emerald-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white animate-fade-in p-4">
                  <div className="w-16 h-16 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-3xl shadow-lg mb-2">
                    🌟
                  </div>
                  <h4 className="text-2xl font-black">เก่งมาก! ผ่านแล้ว</h4>
                  <p className="text-sm font-semibold text-emerald-100">
                    ความแม่นยำ {accuracyScore}% • ได้รับ 1 ดาว ⭐️
                  </p>
                  <button
                    onClick={handleNext}
                    className="mt-4 px-6 py-2 rounded-xl bg-white text-emerald-800 font-bold hover:bg-emerald-50 transition-all shadow-md"
                  >
                    ฝึกตัวถัดไป ➔
                  </button>
                </div>
              )}
            </div>

            {/* Canvas Toolbar */}
            <div className="w-full max-w-md flex items-center justify-between mt-3 px-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 shadow-sm"
                  title="ล้างกระดาน"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>ล้างกระดาน</span>
                </button>
                <button
                  onClick={speakCurrent}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1 shadow-sm"
                  title="ฟังเสียงสะกด"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>ฟังเสียง</span>
                </button>
              </div>

              {/* Color dots */}
              <div className="flex items-center gap-1.5">
                {['#2563eb', '#059669', '#d97706', '#dc2626', '#9333ea'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setBrushColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-full transition-all ${
                      brushColor === c ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'opacity-80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Guide & Phonics Knowledge */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {/* Phonics Synergy Tip */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-amber-800 font-black text-sm">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>คำแนะนำการสอนแจกลูกสะกดคำ</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                ให้นักเรียนลากเส้นตามลำดับตัวเลข <b>1 ➔ 2 ➔ 3</b> พร้อมเปล่งเสียงอ่านแจกลูกสะกดคำ
                ช่วยพัฒนากล้ามเนื้อมัดเล็กและการประสานสายตากับมือ (Eye-Hand Coordination)
              </p>
            </div>

            {/* Quick Picker List */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">รายการเลือกแบบฝึกหัด</span>
                <span className="text-[11px] text-slate-400">
                  {activeTab === 'vowels'
                    ? `${vowelIndex + 1}/${THAI_16_VOWELS_META.length}`
                    : activeTab === 'consonants'
                    ? `${consonantIndex + 1}/${THAI_44_CONSONANTS_META.length}`
                    : `${wordIndex + 1}/${THAI_PHONICS_WORDS_META.length}`}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto p-1 bg-white rounded-xl border border-slate-100">
                {activeTab === 'vowels' &&
                  THAI_16_VOWELS_META.map((v, i) => (
                    <button
                      key={v.char}
                      onClick={() => setVowelIndex(i)}
                      className={`p-1.5 rounded-lg text-center text-sm font-black transition-all ${
                        vowelIndex === i
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      —{v.char}
                    </button>
                  ))}

                {activeTab === 'consonants' &&
                  THAI_44_CONSONANTS_META.map((c, i) => (
                    <button
                      key={c.char}
                      onClick={() => setConsonantIndex(i)}
                      className={`p-1.5 rounded-lg text-center text-sm font-black transition-all ${
                        consonantIndex === i
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {c.char}
                    </button>
                  ))}

                {activeTab === 'words' &&
                  THAI_PHONICS_WORDS_META.map((w, i) => (
                    <button
                      key={w.word}
                      onClick={() => setWordIndex(i)}
                      className={`p-1.5 col-span-2 rounded-lg text-center text-xs font-black truncate transition-all ${
                        wordIndex === i
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {w.word} {w.emoji}
                    </button>
                  ))}
              </div>
            </div>

            {/* Hidden Mini Video for MediaPipe Hand Tracking */}
            <video ref={videoRef} playsInline muted className="hidden" />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>สอดคล้องหลักสูตรการสอนอ่านเขียนโดยการแจกลูกสะกดคำ สพฐ. พ.ศ. ๒๕๖๗</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
};
