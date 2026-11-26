import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Grade, HandPoint, ChildProfile } from '../../types';
import { soundEffects, speakText, isAudioMuted } from '../../services/audioService';
import {
  THAI_44_CONSONANTS_META,
  ThaiConsonantDef,
  ENGLISH_26_LETTERS_META,
  EnglishLetterDef,
  TracingCheckpoint,
} from '../../data/handTracingData';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  RotateCcw,
  Volume2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Grid,
  Star,
  Video,
  VideoOff,
  Search,
  X,
  Compass,
  PenTool,
  Languages,
} from 'lucide-react';

export type AlphabetType = 'thai' | 'english';
export type EnglishCase = 'uppercase' | 'lowercase';
export type ThaiClassFilter = 'all' | 'mid' | 'high' | 'low';

interface ThaiHandwritingViewProps {
  currentGrade?: Grade;
  soundVolume?: number;
  onEarnStar?: () => void;
  externalHandPoint?: HandPoint | null;
  onClose?: () => void;
  studentProfile?: ChildProfile | null;
  initialAlphabet?: AlphabetType;
  initialCase?: EnglishCase;
}

// Tone class sets for Thai Consonants
const MID_CONSONANTS = new Set(['ก', 'จ', 'ด', 'ต', 'บ', 'ป', 'อ', 'ฎ', 'ฏ']);
const HIGH_CONSONANTS = new Set(['ข', 'ฃ', 'ฉ', 'ฐ', 'ถ', 'ผ', 'ฝ', 'ศ', 'ษ', 'ส', 'ห']);

function getConsonantClass(char: string): { type: ThaiClassFilter; label: string; badgeColor: string } {
  if (MID_CONSONANTS.has(char)) {
    return { type: 'mid', label: 'อักษรกลาง (9 ตัว)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  }
  if (HIGH_CONSONANTS.has(char)) {
    return { type: 'high', label: 'อักษรสูง (11 ตัว)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' };
  }
  return { type: 'low', label: 'อักษรต่ำ (24 ตัว)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' };
}

// Brush Colors
const BRUSH_PALETTE = [
  { id: 'rainbow', name: 'สายรุ้งนีออน 🌈', color: '#ec4899' },
  { id: 'blue', name: 'หมึกน้ำเงิน 🔵', color: '#2563eb' },
  { id: 'emerald', name: 'มรกตสดใส 🌿', color: '#059669' },
  { id: 'purple', name: 'ม่วงลาเวนเดอร์ 💜', color: '#9333ea' },
  { id: 'ruby', name: 'แดงทับทิม 🔴', color: '#e11d48' },
  { id: 'gold', name: 'ทองประกาย ✨', color: '#d97706' },
  { id: 'black', name: 'หมึกดำคัดลายมือ 🖋️', color: '#1e293b' },
];

const BRUSH_SIZES = [
  { id: 'pencil', label: 'ดินสอ', size: 9, iconSize: 'w-2 h-2' },
  { id: 'pen', label: 'ปากกา', size: 14, iconSize: 'w-3 h-3' },
  { id: 'marker', label: 'พู่กัน', size: 22, iconSize: 'w-4 h-4' },
];

export const ThaiHandwritingView: React.FC<ThaiHandwritingViewProps> = ({
  currentGrade = 'K2',
  soundVolume = 0.8,
  onEarnStar,
  externalHandPoint = null,
  onClose,
  studentProfile,
  initialAlphabet = 'thai',
  initialCase = 'uppercase',
}) => {
  // Activity Language Mode: 'thai' (44 Consonants) vs 'english' (26 Letters)
  const [alphabetType, setAlphabetType] = useState<AlphabetType>(initialAlphabet);
  const [englishCase, setEnglishCase] = useState<EnglishCase>(initialCase);

  // Indices
  const [consonantIndex, setConsonantIndex] = useState(0);
  const [englishIndex, setEnglishIndex] = useState(0);

  // Active Item resolution
  const activeThai: ThaiConsonantDef = THAI_44_CONSONANTS_META[consonantIndex] || THAI_44_CONSONANTS_META[0];
  const activeEng: EnglishLetterDef = ENGLISH_26_LETTERS_META[englishIndex] || ENGLISH_26_LETTERS_META[0];

  const isThai = alphabetType === 'thai';

  // Active letter attributes
  const activeChar = isThai
    ? activeThai.char
    : englishCase === 'uppercase'
    ? activeEng.letter
    : activeEng.letter.toLowerCase();

  const activeTitle = isThai
    ? activeThai.name
    : `Letter ${activeChar} (${activeEng.word})`;

  const activeSubname = isThai
    ? activeThai.subname
    : `${activeChar} is for ${activeEng.word} ${activeEng.emoji}`;

  const activeCheckpoints: TracingCheckpoint[] = useMemo(() => {
    if (isThai) {
      return activeThai.checkpoints;
    }
    return englishCase === 'uppercase' ? activeEng.upCheckpoints : activeEng.lowCheckpoints;
  }, [isThai, activeThai, activeEng, englishCase]);

  // Brush settings
  const [selectedColorId, setSelectedColorId] = useState('rainbow');
  const [brushSize, setBrushSize] = useState<number>(14);

  // Tracing Progress
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState(0);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [earnedStars, setEarnedStars] = useState<number>(0);
  const [lastHitBubble, setLastHitBubble] = useState<{ text: string; x: number; y: number; key: number } | null>(null);

  // Hand tracking local camera state
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [cameraStatus, setCameraStatus] = useState<'starting' | 'active' | 'denied' | 'unsupported'>('starting');
  const [localHandPoint, setLocalHandPoint] = useState<HandPoint | null>(null);
  const effectiveHandPoint = externalHandPoint || localHandPoint;

  // Buffer of user traced points for precision evaluation
  const tracedPointsRef = useRef<Array<{ x: number; y: number }>>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const miniVideoRef = useRef<HTMLVideoElement | null>(null);
  const isPointerDownRef = useRef(false);

  // Demo playback animation state
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const demoAnimRef = useRef<number | null>(null);
  const [demoPencilPos, setDemoPencilPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  // Drawer modal
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerThaiFilter, setDrawerThaiFilter] = useState<ThaiClassFilter>('all');

  // Storage keys for progress
  const thaiStorageKey = studentProfile
    ? `thai_handwriting_progress_${studentProfile.id}`
    : 'thai_handwriting_progress_guest';

  const engStorageKey = studentProfile
    ? `english_handwriting_progress_${studentProfile.id}`
    : 'english_handwriting_progress_guest';

  // Thai progress
  const [thaiProgressMap, setThaiProgressMap] = useState<Record<string, { stars: number; highAccuracy: number }>>(() => {
    try {
      const saved = localStorage.getItem(thaiStorageKey);
      return saved ? (JSON.parse(saved) as Record<string, { stars: number; highAccuracy: number }>) : {};
    } catch {
      return {};
    }
  });

  // English progress
  const [engProgressMap, setEngProgressMap] = useState<Record<string, { stars: number; highAccuracy: number }>>(() => {
    try {
      const saved = localStorage.getItem(engStorageKey);
      return saved ? (JSON.parse(saved) as Record<string, { stars: number; highAccuracy: number }>) : {};
    } catch {
      return {};
    }
  });

  // Master Progress Calculations
  const totalMasteredCount = useMemo(() => {
    const targetMap = isThai ? thaiProgressMap : engProgressMap;
    const entries = Object.values(targetMap) as Array<{ stars: number; highAccuracy: number }>;
    return entries.filter((p) => p.stars >= 2).length;
  }, [isThai, thaiProgressMap, engProgressMap]);

  const totalCollectedStars = useMemo(() => {
    const targetMap = isThai ? thaiProgressMap : engProgressMap;
    const entries = Object.values(targetMap) as Array<{ stars: number; highAccuracy: number }>;
    return entries.reduce((acc, curr) => acc + (curr.stars || 0), 0);
  }, [isThai, thaiProgressMap, engProgressMap]);

  // Voice speech helper
  const speakVoice = useCallback(
    (text: string, forceLang?: 'th' | 'en') => {
      if (soundVolume <= 0.01 || isAudioMuted()) return;
      const lang = forceLang || (isThai ? 'th' : 'en');
      try {
        speakText(text, lang, 'adult_female');
      } catch {
        // audio fallback
      }
    },
    [soundVolume, isThai]
  );

  // Pronounce active character upon selection or case toggle
  useEffect(() => {
    // Reset state
    setCurrentCheckpointIndex(0);
    setCompletedCheckpoints([]);
    setIsCompleted(false);
    setAccuracyScore(null);
    setEarnedStars(0);
    setLastHitBubble(null);
    tracedPointsRef.current = [];
    setIsDemoPlaying(false);
    if (demoAnimRef.current) cancelAnimationFrame(demoAnimRef.current);
    setDemoPencilPos({ x: 0, y: 0, visible: false });

    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Pronounce letter phonics / Thai name
    const timer = setTimeout(() => {
      if (isThai) {
        speakVoice(`${activeThai.name} ${activeThai.subname} • ${activeThai.voice}`, 'th');
      } else {
        speakVoice(
          `Letter ${activeChar}! ${activeChar} is for ${activeEng.word}! ${activeChar} says ${activeEng.thaiSound || activeEng.phonics}.`,
          'en'
        );
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [isThai, consonantIndex, englishIndex, englishCase, activeThai, activeEng, activeChar, speakVoice]);

  // Local MediaPipe Camera Initializer
  useEffect(() => {
    if (!isCameraActive) {
      setCameraStatus('denied');
      setLocalHandPoint(null);
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

            setLocalHandPoint({
              x: smoothX,
              y: smoothY,
              screenX: smoothX * window.innerWidth,
              screenY: smoothY * window.innerHeight,
              isPointing: true,
              isPinching: false,
              confidence: 0.9,
            });
          } else {
            setLocalHandPoint(null);
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

        const video = miniVideoRef.current;
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
            if (isMounted) {
              animId = requestAnimationFrame(processFrame);
            }
          };

          animId = requestAnimationFrame(processFrame);
        }
      } catch (err) {
        console.warn('Hand tracking init notice:', err);
        setCameraStatus('denied');
      }
    }

    initCamera();

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [isCameraActive]);

  // Canvas paint brush
  const drawBrushPoint = useCallback(
    (canvasX: number, canvasY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const activeColor =
        selectedColorId === 'rainbow'
          ? `hsl(${(Date.now() / 8) % 360}, 92%, 55%)`
          : BRUSH_PALETTE.find((b) => b.id === selectedColorId)?.color || '#2563eb';

      ctx.save();
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = activeColor;
      ctx.shadowColor = activeColor;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();

      tracedPointsRef.current.push({
        x: (canvasX / canvas.width) * 100,
        y: (canvasY / canvas.height) * 100,
      });
    },
    [selectedColorId, brushSize]
  );

  // Checkpoint collision & speech when passing checkpoints
  const checkHitCheckpoint = useCallback(
    (normX: number, normY: number) => {
      if (isCompleted || isDemoPlaying) return;

      const checkpoints = activeCheckpoints;
      const targetCp = checkpoints[currentCheckpointIndex];
      if (!targetCp) return;

      const dx = normX * 100 - targetCp.x;
      const dy = normY * 100 - targetCp.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Tolerance radius: 14%
      if (dist < 14) {
        const nextIndex = currentCheckpointIndex + 1;
        setCompletedCheckpoints((prev) => [...prev, targetCp.order]);
        setCurrentCheckpointIndex(nextIndex);
        soundEffects.playCorrect(soundVolume);

        // Vocal readout as child passes each checkpoint
        if (!isThai) {
          // Read out letter sound or phonics word on checkpoint hit
          if (nextIndex === 1) {
            speakVoice(`Letter ${activeChar}`, 'en');
          } else if (nextIndex === checkpoints.length) {
            speakVoice(`${activeEng.word}!`, 'en');
          } else {
            speakVoice(`${activeChar}!`, 'en');
          }
          setLastHitBubble({
            text: `${activeChar} • ${activeEng.phonics || activeEng.word} ${activeEng.emoji}`,
            x: targetCp.x,
            y: targetCp.y,
            key: Date.now(),
          });
        } else {
          speakVoice(`จุดที่ ${targetCp.label} เก่งมากจ้า!`, 'th');
          setLastHitBubble({
            text: `${activeThai.name} ${activeThai.emoji}`,
            x: targetCp.x,
            y: targetCp.y,
            key: Date.now(),
          });
        }

        // All checkpoints reached
        if (nextIndex >= checkpoints.length) {
          setIsCompleted(true);

          // Calculate accuracy score
          let totalDev = 0;
          const userPoints = tracedPointsRef.current;
          checkpoints.forEach((cp) => {
            let minDist = 100;
            userPoints.forEach((up) => {
              const d = Math.sqrt(Math.pow(up.x - cp.x, 2) + Math.pow(up.y - cp.y, 2));
              if (d < minDist) minDist = d;
            });
            totalDev += Math.min(minDist, 25);
          });

          const avgDev = totalDev / checkpoints.length;
          const score = Math.max(72, Math.min(99, Math.round(100 - avgDev * 1.5)));
          setAccuracyScore(score);

          const stars = score >= 88 ? 3 : score >= 76 ? 2 : 1;
          setEarnedStars(stars);

          // Save progress
          if (isThai) {
            setThaiProgressMap((prev) => {
              const prevEntry = prev[activeChar] || { stars: 0, highAccuracy: 0 };
              const updated = {
                ...prev,
                [activeChar]: {
                  stars: Math.max(prevEntry.stars, stars),
                  highAccuracy: Math.max(prevEntry.highAccuracy, score),
                },
              };
              try {
                localStorage.setItem(thaiStorageKey, JSON.stringify(updated));
              } catch {
                // ignore
              }
              return updated;
            });
          } else {
            const key = `${activeChar}-${englishCase}`;
            setEngProgressMap((prev) => {
              const prevEntry = prev[key] || { stars: 0, highAccuracy: 0 };
              const updated = {
                ...prev,
                [key]: {
                  stars: Math.max(prevEntry.stars, stars),
                  highAccuracy: Math.max(prevEntry.highAccuracy, score),
                },
              };
              try {
                localStorage.setItem(engStorageKey, JSON.stringify(updated));
              } catch {
                // ignore
              }
              return updated;
            });
          }

          soundEffects.playVictory(soundVolume);
          if (onEarnStar) onEarnStar();

          confetti({
            particleCount: 85,
            spread: 90,
            origin: { y: 0.55 },
          });

          if (!isThai) {
            speakVoice(
              `Super job! You wrote letter ${activeChar}! ${activeChar} is for ${activeEng.word}! Accuracy ${score} percent! You earned ${stars} stars!`,
              'en'
            );
          } else {
            speakVoice(
              `ยอดเยี่ยมที่สุดเลยจ้า! คัดลายมือ ${activeTitle} สำเร็จแล้ว ได้คะแนนความแม่นยำ ${score} เปอร์เซ็นต์ รับไปเลย ${stars} ดาวทอง!`,
              'th'
            );
          }
        }
      }
    },
    [
      isCompleted,
      isDemoPlaying,
      activeCheckpoints,
      currentCheckpointIndex,
      soundVolume,
      isThai,
      activeChar,
      activeEng,
      activeTitle,
      englishCase,
      thaiStorageKey,
      engStorageKey,
      onEarnStar,
      speakVoice,
    ]
  );

  // Map HandPoint to Canvas
  useEffect(() => {
    if (!effectiveHandPoint || !boardRef.current || !canvasRef.current) return;
    const board = boardRef.current.getBoundingClientRect();
    const canvas = canvasRef.current;

    const normX = (effectiveHandPoint.screenX - board.left) / board.width;
    const normY = (effectiveHandPoint.screenY - board.top) / board.height;

    if (normX >= 0 && normX <= 1 && normY >= 0 && normY <= 1) {
      drawBrushPoint(normX * canvas.width, normY * canvas.height);
      checkHitCheckpoint(normX, normY);
    }
  }, [effectiveHandPoint, drawBrushPoint, checkHitCheckpoint]);

  // Pointer Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isPointerDownRef.current = true;
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDownRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width;
    const normY = (e.clientY - rect.top) / rect.height;

    if (normX >= 0 && normX <= 1 && normY >= 0 && normY <= 1) {
      drawBrushPoint(normX * canvas.width, normY * canvas.height);
      checkHitCheckpoint(normX, normY);
    }
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
  };

  // Reset current letter canvas
  const handleResetCanvas = () => {
    soundEffects.playTap(soundVolume);
    setCurrentCheckpointIndex(0);
    setCompletedCheckpoints([]);
    setIsCompleted(false);
    setAccuracyScore(null);
    setEarnedStars(0);
    tracedPointsRef.current = [];

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Demonstration playback
  const handleToggleDemo = () => {
    soundEffects.playTap(soundVolume);
    if (isDemoPlaying) {
      setIsDemoPlaying(false);
      if (demoAnimRef.current) cancelAnimationFrame(demoAnimRef.current);
      setDemoPencilPos({ x: 0, y: 0, visible: false });
      return;
    }

    handleResetCanvas();
    setIsDemoPlaying(true);

    if (isThai) {
      speakVoice(`ดูตัวอย่างวิธีเขียน ${activeThai.name} จากจุดที่ 1 ม้วนหัวก่อนนะจ๊ะ`, 'th');
    } else {
      speakVoice(`Watch how to trace letter ${activeChar}! Follow step 1!`, 'en');
    }

    const checkpoints = activeCheckpoints;
    if (checkpoints.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let startTime: number | null = null;
    const totalDuration = checkpoints.length * 1050; // ms

    const animateDemo = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / totalDuration);

      const segmentProgress = progress * (checkpoints.length - 1);
      const segIndex = Math.floor(segmentProgress);
      const segT = segmentProgress - segIndex;

      const p0 = checkpoints[segIndex] || checkpoints[0];
      const p1 = checkpoints[Math.min(checkpoints.length - 1, segIndex + 1)] || p0;

      const curX = p0.x + (p1.x - p0.x) * segT;
      const curY = p0.y + (p1.y - p0.y) * segT;

      ctx.save();
      ctx.beginPath();
      ctx.arc((curX / 100) * canvas.width, (curY / 100) * canvas.height, 6, 0, Math.PI * 2);
      ctx.fillStyle = isThai ? 'rgba(245, 158, 11, 0.45)' : 'rgba(79, 70, 229, 0.45)';
      ctx.fill();
      ctx.restore();

      setDemoPencilPos({ x: curX, y: curY, visible: true });

      if (progress < 1) {
        demoAnimRef.current = requestAnimationFrame(animateDemo);
      } else {
        setIsDemoPlaying(false);
        setDemoPencilPos({ x: 0, y: 0, visible: false });
        if (isThai) {
          speakVoice(`ลองฝึกเขียนเองด้วยนิ้วมือได้เลยจ้า!`, 'th');
        } else {
          speakVoice(`Now try tracing letter ${activeChar} with your finger!`, 'en');
        }
      }
    };

    demoAnimRef.current = requestAnimationFrame(animateDemo);
  };

  // Next & Previous Navigation
  const handleNextItem = () => {
    soundEffects.playTap(soundVolume);
    if (isThai) {
      if (consonantIndex < THAI_44_CONSONANTS_META.length - 1) {
        setConsonantIndex((prev) => prev + 1);
      } else {
        setConsonantIndex(0);
      }
    } else {
      if (englishIndex < ENGLISH_26_LETTERS_META.length - 1) {
        setEnglishIndex((prev) => prev + 1);
      } else {
        setEnglishIndex(0);
      }
    }
  };

  const handlePrevItem = () => {
    soundEffects.playTap(soundVolume);
    if (isThai) {
      if (consonantIndex > 0) {
        setConsonantIndex((prev) => prev - 1);
      } else {
        setConsonantIndex(THAI_44_CONSONANTS_META.length - 1);
      }
    } else {
      if (englishIndex > 0) {
        setEnglishIndex((prev) => prev - 1);
      } else {
        setEnglishIndex(ENGLISH_26_LETTERS_META.length - 1);
      }
    }
  };

  // Vector dashed path string
  const vectorDashedPath = useMemo(() => {
    const cps = activeCheckpoints;
    if (!cps || cps.length === 0) return '';
    return cps.map((cp, idx) => `${idx === 0 ? 'M' : 'L'} ${cp.x},${cp.y}`).join(' ');
  }, [activeCheckpoints]);

  // Drawer filtered items
  const filteredThaiItems = useMemo(() => {
    return THAI_44_CONSONANTS_META.filter((c) => {
      const matches =
        c.char.includes(searchQuery) ||
        c.name.includes(searchQuery) ||
        c.subname.includes(searchQuery);

      if (!matches) return false;
      if (drawerThaiFilter === 'all') return true;
      const cls = getConsonantClass(c.char);
      return cls.type === drawerThaiFilter;
    });
  }, [searchQuery, drawerThaiFilter]);

  const filteredEngItems = useMemo(() => {
    return ENGLISH_26_LETTERS_META.filter((e) => {
      const q = searchQuery.toLowerCase();
      return (
        e.letter.toLowerCase().includes(q) ||
        e.word.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-3 sm:gap-4 select-none animate-in fade-in duration-200">
      {/* Top Alphabet & Language Switcher Tabs */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 p-1.5 bg-slate-100 rounded-3xl border border-slate-200 shadow-2xs">
        {/* Language Tabs: Thai 44 vs English 26 */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setAlphabetType('thai');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              isThai
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <span>🇹🇭</span>
            <span>พยัญชนะไทย (ก-ฮ 44 ตัว)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setAlphabetType('english');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              !isThai
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <span>🔤</span>
            <span>เขียนตัวอักษรภาษาอังกฤษ (A-Z 26 ตัว)</span>
          </button>
        </div>

        {/* Thai Triyang (อักษร 3 หมู่: กลาง สูง ต่ำ) Quick Filter (สอดคล้องกับหน่วยที่ ๑ สพฐ.) */}
        {isThai && (
          <div className="flex items-center gap-1 bg-white border border-amber-200 p-1 rounded-2xl shadow-2xs flex-wrap">
            <span className="text-[10px] font-bold text-slate-500 px-1 hidden sm:inline">ไตรยางศ์:</span>
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setDrawerThaiFilter('all');
              }}
              className={`px-2 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                drawerThaiFilter === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-amber-50'
              }`}
            >
              ครบ ๔๔ ตัว
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setDrawerThaiFilter('mid');
                const midIdx = THAI_44_CONSONANTS_META.findIndex((c) => MID_CONSONANTS.has(c.char));
                if (midIdx !== -1) setConsonantIndex(midIdx);
              }}
              className={`px-2 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                drawerThaiFilter === 'mid'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:bg-emerald-50'
              }`}
            >
              อักษรกลาง (๙)
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setDrawerThaiFilter('high');
                const highIdx = THAI_44_CONSONANTS_META.findIndex((c) => HIGH_CONSONANTS.has(c.char));
                if (highIdx !== -1) setConsonantIndex(highIdx);
              }}
              className={`px-2 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                drawerThaiFilter === 'high'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-amber-50'
              }`}
            >
              อักษรสูง (๑๑)
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setDrawerThaiFilter('low');
                const lowIdx = THAI_44_CONSONANTS_META.findIndex((c) => !MID_CONSONANTS.has(c.char) && !HIGH_CONSONANTS.has(c.char));
                if (lowIdx !== -1) setConsonantIndex(lowIdx);
              }}
              className={`px-2 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                drawerThaiFilter === 'low'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-900 hover:bg-blue-50'
              }`}
            >
              อักษรต่ำ (๒๔)
            </button>
          </div>
        )}

        {/* English Uppercase vs Lowercase Toggle (Visible when in English mode) */}
        {!isThai && (
          <div className="flex items-center gap-1 bg-white border border-indigo-200 p-1 rounded-2xl shadow-2xs">
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setEnglishCase('uppercase');
              }}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                englishCase === 'uppercase'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-900 hover:bg-indigo-50'
              }`}
            >
              <span>🔠 พิมพ์ใหญ่ (A-Z)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setEnglishCase('lowercase');
              }}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                englishCase === 'lowercase'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-900 hover:bg-indigo-50'
              }`}
            >
              <span>🔡 พิมพ์เล็ก (a-z)</span>
            </button>
          </div>
        )}
      </div>

      {/* Letter Banner Card */}
      <div className="w-full bg-white rounded-3xl p-3 sm:p-4 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Letter Icon & Identity */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-white flex items-center justify-center text-3xl sm:text-4xl font-black shadow-md border-2 shrink-0 ${
              isThai
                ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 border-amber-300'
                : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 border-indigo-300'
            }`}
          >
            {activeChar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                {activeTitle}
              </h1>
              {isThai ? (
                <span
                  className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border ${
                    getConsonantClass(activeThai.char).badgeColor
                  }`}
                >
                  {getConsonantClass(activeThai.char).label.split(' ')[0]}
                </span>
              ) : (
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">
                    {englishCase === 'uppercase' ? 'Uppercase' : 'Lowercase'}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 font-mono">
                    Phonics {activeEng.phonics} ({activeEng.thaiSound})
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5 flex items-center gap-1.5">
              <span>{activeSubname}</span>
              <span className="text-slate-300">•</span>
              <span className={`font-bold ${isThai ? 'text-amber-700' : 'text-indigo-700'}`}>
                {isThai ? `ตัวที่ ${consonantIndex + 1} / 44` : `Letter ${englishIndex + 1} / 26`}
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls & Star Progress */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          {/* Phonics & Audio Pronunciation Button */}
          <button
            type="button"
            onClick={() => {
              if (isThai) {
                speakVoice(`${activeThai.name} ${activeThai.subname} • ${activeThai.voice}`, 'th');
              } else {
                speakVoice(
                  `Letter ${activeChar}! ${activeChar} is for ${activeEng.word}! ${activeChar} says ${activeEng.thaiSound || activeEng.phonics}.`,
                  'en'
                );
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black shadow-2xs transition-all active:scale-95 cursor-pointer ${
              isThai
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-300'
            }`}
            title="ฟังเสียงอ่านออกเสียงพยัญชนะ/ตัวอักษร"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">ฟังเสียงอ่าน</span>
          </button>

          {/* Quick Selection Grid Drawer */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setShowDrawer(true);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-white text-xs font-black shadow-xs transition-all active:scale-95 cursor-pointer ${
              isThai
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700'
            }`}
            title="เปิดเลือกตัวอักษร"
          >
            <Grid className="w-4 h-4 text-white" />
            <span>
              {isThai
                ? `เลือกตัวอักษร (${consonantIndex + 1}/44)`
                : `เลือกตัวอักษร (${englishIndex + 1}/26)`}
            </span>
          </button>

          {/* Stars Collected Pill */}
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-xl border border-amber-300 text-xs font-black text-amber-900 shadow-2xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{totalCollectedStars} ดาว</span>
            <span className="text-slate-300">|</span>
            <span className="text-[11px] text-slate-600">
              {totalMasteredCount}/{isThai ? '44' : '26'} สำเร็จ
            </span>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              title="ปิดหน้าต่าง"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Handwriting Arena */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* Left: Interactive Canvas Workbook */}
        <div className="lg:col-span-8 flex flex-col items-center gap-3">
          {/* Top Stage Bar */}
          <div
            className={`w-full border rounded-2xl p-2.5 px-3.5 flex items-center justify-between text-xs font-bold gap-2 ${
              isThai
                ? 'bg-amber-50/90 border-amber-200 text-amber-950'
                : 'bg-indigo-50/90 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">✍️</span>
              <span>
                {isCompleted
                  ? '✨ ยอดเยี่ยมมาก! คัดลายมือสำเร็จเรียบร้อยแล้ว'
                  : currentCheckpointIndex === 0
                  ? isThai
                    ? 'เริ่มที่จุด 1: ม้วนหัวกลมๆ ตามลูกศร'
                    : `Start at Point 1: Trace along the guide line`
                  : `ลากต่อไปยังจุดที่ ${currentCheckpointIndex + 1}`}
              </span>
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handlePrevItem}
                className="p-1 px-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-black cursor-pointer transition-colors"
                title="ตัวก่อนหน้า"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextItem}
                className="p-1 px-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-black cursor-pointer transition-colors"
                title="ตัวถัดไป"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Board Container */}
          <div
            ref={boardRef}
            className={`relative w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden border-4 shadow-xl select-none touch-none cursor-crosshair group ${
              isThai
                ? 'border-amber-300 bg-[#FCFBF7]'
                : 'border-indigo-300 bg-[#FAFAFE]'
            }`}
          >
            {/* Guidelines Ruling SVG Background */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85"
            >
              {isThai ? (
                /* Authentic Thai 5-Line Calligraphy Guidelines */
                <>
                  <line x1="0" y1="18" x2="100" y2="18" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="0" y1="34" x2="100" y2="34" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="0" y1="52" x2="100" y2="52" stroke="#cbd5e1" strokeWidth="0.9" strokeDasharray="3 3" />
                  <line x1="0" y1="78" x2="100" y2="78" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="0" y1="92" x2="100" y2="92" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="3 3" />
                  <text x="3" y="76" fontSize="3" fill="#94a3b8" fontWeight="bold">เส้นฐาน</text>
                </>
              ) : (
                /* Authentic English 4-Line Primary School Handwriting Guidelines */
                <>
                  {/* Top Ascender / Headline (Sky Blue) */}
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#38bdf8" strokeWidth="1.2" />
                  <text x="3" y="18" fontSize="2.8" fill="#0284c7" fontWeight="bold">Headline</text>

                  {/* Mean Line / Midline (Dashed Sky Blue) */}
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="3" y="48" fontSize="2.8" fill="#0284c7" fontWeight="bold">Midline</text>

                  {/* Baseline (Coral / Red Solid Line) */}
                  <line x1="0" y1="80" x2="100" y2="80" stroke="#f87171" strokeWidth="1.6" />
                  <text x="3" y="78" fontSize="2.8" fill="#dc2626" fontWeight="bold">Baseline</text>

                  {/* Descender Line (Sky Blue) */}
                  <line x1="0" y1="94" x2="100" y2="94" stroke="#38bdf8" strokeWidth="1" />
                  <text x="3" y="93" fontSize="2.8" fill="#0284c7" fontWeight="bold">Descender</text>

                  {/* Vertical center alignment */}
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#e0e7ff" strokeWidth="0.8" strokeDasharray="3 3" />
                </>
              )}
            </svg>

            {/* Dashed Letter Outline & Checkpoints Overlay */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            >
              {/* Dashed Letter Guide Text */}
              <text
                x="50"
                y={isThai ? '58' : englishCase === 'uppercase' ? '68' : '72'}
                textAnchor="middle"
                fontSize={isThai ? '64' : englishCase === 'uppercase' ? '70' : '62'}
                fontWeight="bold"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="4"
                strokeDasharray="4 4"
                strokeLinecap="round"
                className={isThai ? 'font-serif select-none' : 'font-sans select-none'}
              >
                {activeChar}
              </text>

              {/* Stroke Order Path with Directional Dashes */}
              <path
                d={vectorDashedPath}
                fill="none"
                stroke={isThai ? '#94a3b8' : '#818cf8'}
                strokeWidth="3.2"
                strokeDasharray="6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-75"
              />

              {/* Checkpoint Nodes with Numbers */}
              {activeCheckpoints.map((cp, idx) => {
                const isTarget = currentCheckpointIndex === idx;
                const isDone = completedCheckpoints.includes(cp.order);

                return (
                  <g key={`cp-${cp.order}`} transform={`translate(${cp.x}, ${cp.y})`}>
                    {/* Pulsing Target Ring on next point */}
                    {isTarget && !isCompleted && (
                      <circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill={isThai ? '#f59e0b' : '#6366f1'}
                        opacity="0.35"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Circle */}
                    <circle
                      cx="0"
                      cy="0"
                      r="5.5"
                      fill={
                        isDone
                          ? '#10b981'
                          : isTarget
                          ? isThai
                            ? '#f59e0b'
                            : '#6366f1'
                          : '#ffffff'
                      }
                      stroke={
                        isDone
                          ? '#059669'
                          : isTarget
                          ? isThai
                            ? '#d97706'
                            : '#4f46e5'
                          : '#94a3b8'
                      }
                      strokeWidth="1.8"
                      className="transition-colors shadow-sm"
                    />

                    {/* Step Number */}
                    <text
                      x="0"
                      y="1.8"
                      textAnchor="middle"
                      fontSize="4.2"
                      fontWeight="900"
                      fill={isDone || isTarget ? '#ffffff' : '#475569'}
                      className="pointer-events-none"
                    >
                      {cp.order}
                    </text>

                    {/* Step 1 badge */}
                    {cp.order === 1 && !isDone && (
                      <g transform="translate(0, -9)">
                        <rect
                          x="-9"
                          y="-4"
                          width="18"
                          height="7"
                          rx="3.5"
                          fill={isThai ? '#f59e0b' : '#4f46e5'}
                        />
                        <text
                          x="0"
                          y="0.8"
                          textAnchor="middle"
                          fontSize="3"
                          fontWeight="bold"
                          fill="#ffffff"
                        >
                          {isThai ? 'ม้วนหัว' : 'Start'}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Demo Animated Pencil */}
            {demoPencilPos.visible && (
              <div
                className="absolute z-25 pointer-events-none transition-transform duration-75"
                style={{
                  left: `${demoPencilPos.x}%`,
                  top: `${demoPencilPos.y}%`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div className="flex flex-col items-center animate-bounce">
                  <span className="text-2xl drop-shadow-md">✏️</span>
                </div>
              </div>
            )}

            {/* Live Drawing HTML5 Canvas */}
            <canvas
              ref={canvasRef}
              width={640}
              height={640}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="absolute inset-0 w-full h-full z-20"
            />

            {/* Hand Pointer Glow Cursor */}
            {effectiveHandPoint && boardRef.current && (
              <div
                className="absolute pointer-events-none z-30 transition-transform duration-75"
                style={{
                  left: `${Math.max(0, Math.min(100, ((effectiveHandPoint.screenX - boardRef.current.getBoundingClientRect().left) / boardRef.current.getBoundingClientRect().width) * 100))}%`,
                  top: `${Math.max(0, Math.min(100, ((effectiveHandPoint.screenY - boardRef.current.getBoundingClientRect().top) / boardRef.current.getBoundingClientRect().height) * 100))}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-8 h-8 rounded-full animate-ping absolute ${
                      isThai ? 'bg-amber-400/40' : 'bg-indigo-400/40'
                    }`}
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs ${
                      isThai
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                    }`}
                  >
                    ✍️
                  </div>
                </div>
              </div>
            )}

            {/* Mini PIP Video Feed */}
            {isCameraActive && (
              <div className="absolute bottom-2 right-2 z-25 w-20 h-16 sm:w-24 sm:h-20 bg-black/70 rounded-xl overflow-hidden border-2 border-white/80 shadow-md">
                <video
                  ref={miniVideoRef}
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
                <div className="absolute top-1 left-1 flex items-center gap-1 bg-black/60 px-1 py-0.5 rounded text-[8px] text-white font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>กล้อง</span>
                </div>
              </div>
            )}

            {/* Checkpoint Hit Vocalization Bubble */}
            {lastHitBubble && (
              <div
                key={lastHitBubble.key}
                style={{
                  left: `${lastHitBubble.x}%`,
                  top: `${Math.max(10, lastHitBubble.y - 12)}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-full pointer-events-none z-35 animate-in zoom-in-75 slide-in-from-bottom-2 duration-150"
              >
                <div
                  className={`text-white font-black text-xs sm:text-sm px-3 py-1.5 rounded-2xl shadow-xl border-2 border-white flex items-center gap-1.5 whitespace-nowrap animate-bounce ${
                    isThai
                      ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600'
                      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
                  }`}
                >
                  <span className="text-base">{isThai ? '🇹🇭' : '🔤'}</span>
                  <span>{lastHitBubble.text}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 max-w-[480px]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleDemo}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer ${
                  isDemoPlaying
                    ? 'bg-amber-600 text-white'
                    : isThai
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
                title="ดูตัวอย่างการเขียนตัวนี้"
              >
                {isDemoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isDemoPlaying ? 'หยุดสาธิต' : 'ดูวิธีเขียน (สาธิต) ▶️'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetCanvas}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer border border-slate-300"
                title="ล้างเส้นวาดและเขียนใหม่"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>เขียนใหม่</span>
              </button>
            </div>

            {/* Camera / Touch Switcher Toggle */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsCameraActive((prev) => !prev)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  isCameraActive
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
                title={isCameraActive ? 'เปิดโหมดกล้องจับมือ Hand Tracking อยู่' : 'สลับเปิดโหมดกล้องจับมือ'}
              >
                {isCameraActive ? <Video className="w-3.5 h-3.5 text-emerald-600" /> : <VideoOff className="w-3.5 h-3.5 text-slate-500" />}
                <span className="text-[11px]">{isCameraActive ? 'กล้องเปิด' : 'ใช้สัมผัส'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Accuracy Result & Color Palette Tools */}
        <div className="lg:col-span-4 flex flex-col gap-3.5">
          {/* Accuracy & Mastery Score Card */}
          <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>คะแนนความแม่นยำในการลากเส้น</span>
              </h3>
              <span className="text-[10px] font-bold text-slate-500">
                {completedCheckpoints.length}/{activeCheckpoints.length} จุด
              </span>
            </div>

            {accuracyScore !== null ? (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-300 rounded-2xl p-4 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  {[1, 2, 3].map((starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-7 h-7 ${
                        starIdx <= earnedStars
                          ? 'fill-amber-400 text-amber-500 animate-bounce'
                          : 'fill-slate-200 text-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="text-4xl font-black text-emerald-700 leading-none">
                  {accuracyScore}%
                </div>
                <div className="text-xs font-black text-emerald-900 mt-1">
                  {earnedStars === 3
                    ? isThai
                      ? '🌟 ยอดเยี่ยมที่สุด! ลายมือสวยงาม'
                      : '🌟 Excellent! Beautiful Handwriting!'
                    : earnedStars === 2
                    ? isThai
                      ? '👍 เก่งมาก! ลากเส้นแม่นยำ'
                      : '👍 Great job! Very accurate!'
                    : isThai
                    ? '💡 พยายามได้ดี ฝึกอีกนิดนะจ๊ะ'
                    : '💡 Good effort! Keep practicing!'}
                </div>

                <button
                  type="button"
                  onClick={handleNextItem}
                  className="mt-3 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>ฝึกตัวถัดไป</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-4 border border-dashed border-slate-200 flex flex-col items-center text-center">
                <span className="text-2xl mb-1">✍️</span>
                <span className="text-xs font-bold text-slate-700">กำลังฝึกเขียน...</span>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  ลากผ่านจุดนำทางให้ครบ ระบบจะประเมินคะแนนความแม่นยำอัตโนมัติ
                </p>
                <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(completedCheckpoints.length / Math.max(1, activeCheckpoints.length)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Ink Color Selector */}
          <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col gap-2.5">
            <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <span>🎨</span>
              <span>เลือกสีน้ำหมึกคัดลายมือ</span>
            </h3>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {BRUSH_PALETTE.map((brush) => (
                <button
                  key={brush.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    setSelectedColorId(brush.id);
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    selectedColorId === brush.id
                      ? 'ring-3 ring-emerald-400 scale-110 shadow-sm'
                      : 'hover:scale-105 opacity-85'
                  }`}
                  style={{ backgroundColor: brush.color }}
                  title={brush.name}
                >
                  {selectedColorId === brush.id && <span className="text-xs text-white font-bold">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Brush Thickness Selector */}
          <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col gap-2.5">
            <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <PenTool className="w-4 h-4 text-slate-600" />
              <span>ขนาดหัวดินสอ / พู่กัน</span>
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {BRUSH_SIZES.map((sz) => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    setBrushSize(sz.size);
                  }}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    brushSize === sz.size
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-400 shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className={`rounded-full bg-slate-700 ${sz.iconSize}`} />
                  <span>{sz.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Educational Note */}
          <div
            className={`border rounded-3xl p-3.5 text-xs font-medium ${
              isThai
                ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <span>💡</span>
              <span>{isThai ? `เกร็ดความรู้: ${activeTitle}` : `Phonics Guide: Letter ${activeChar}`}</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {isThai
                ? `${getConsonantClass(activeThai.char).label}: เริ่มต้นด้วยการม้วนหัวกลม แล้วลากตามลูกศร`
                : `${activeChar} is for ${activeEng.word} ${activeEng.emoji}! Keep letters sitting comfortably on the red baseline.`}
            </p>
          </div>
        </div>
      </div>

      {/* Grid Drawer Modal (Consonants ก-ฮ & Letters A-Z) */}
      {showDrawer && (
        <div
          id="handwriting-drawer-overlay"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDrawer(false);
          }}
        >
          <div className="bg-white rounded-3xl p-4 sm:p-6 max-w-2xl w-full shadow-2xl border-4 border-amber-300 max-h-[90vh] flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{isThai ? '🇹🇭' : '🔤'}</span>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {isThai
                      ? 'เลือกพยัญชนะไทย (ก ถึง ฮ ครบ 44 ตัว)'
                      : `เลือกตัวอักษรภาษาอังกฤษ (A ถึง Z ทั้ง 26 ตัว)`}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    คลิกเลือกตัวอักษรที่ต้องการฝึกคัดลายมือ
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDrawer(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Chips & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
              {isThai ? (
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-black">
                  {(
                    [
                      { id: 'all' as ThaiClassFilter, label: 'ทั้งหมด (44)' },
                      { id: 'mid' as ThaiClassFilter, label: 'อักษรกลาง (9)' },
                      { id: 'high' as ThaiClassFilter, label: 'อักษรสูง (11)' },
                      { id: 'low' as ThaiClassFilter, label: 'อักษรต่ำ (24)' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setDrawerThaiFilter(tab.id)}
                      className={`px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        drawerThaiFilter === tab.id
                          ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-black">
                  <span className="text-indigo-900 font-bold">หมวดหมู่:</span>
                  <span className="px-2.5 py-1 rounded-xl bg-indigo-100 text-indigo-900 border border-indigo-200 font-black">
                    A to Z (26 Letters)
                  </span>
                </div>
              )}

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาตัวอักษร..."
                  className="pl-8 pr-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-40"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 overflow-y-auto max-h-[50vh] p-1">
              {isThai
                ? filteredThaiItems.map((item) => {
                    const idx = THAI_44_CONSONANTS_META.findIndex((c) => c.char === item.char);
                    const isCurrent = idx === consonantIndex;
                    const progress = thaiProgressMap[item.char];

                    return (
                      <button
                        key={item.char}
                        type="button"
                        onClick={() => {
                          soundEffects.playTap(soundVolume);
                          setConsonantIndex(idx);
                          setShowDrawer(false);
                        }}
                        className={`p-2.5 rounded-2xl flex flex-col items-center justify-between border-2 transition-all cursor-pointer relative ${
                          isCurrent
                            ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-300 scale-105 shadow-md'
                            : 'bg-white hover:bg-amber-50/70 border-slate-200 shadow-2xs'
                        }`}
                      >
                        <span className="text-2xl font-black text-slate-900 leading-none">
                          {item.char}
                        </span>
                        <span className="text-[10px] font-bold text-slate-600 truncate max-w-full mt-1">
                          {item.name.replace(item.char, '').trim()}
                        </span>

                        {progress && progress.stars > 0 && (
                          <div className="flex items-center gap-0.5 mt-1">
                            {[1, 2, 3].map((s) => (
                              <Star
                                key={s}
                                className={`w-2.5 h-2.5 ${
                                  s <= progress.stars
                                    ? 'fill-amber-400 text-amber-500'
                                    : 'fill-slate-200 text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })
                : filteredEngItems.map((item) => {
                    const idx = ENGLISH_26_LETTERS_META.findIndex((e) => e.letter === item.letter);
                    const isCurrent = idx === englishIndex;
                    const displayLetter =
                      englishCase === 'uppercase' ? item.letter : item.letter.toLowerCase();
                    const key = `${displayLetter}-${englishCase}`;
                    const progress = engProgressMap[key];

                    return (
                      <button
                        key={item.letter}
                        type="button"
                        onClick={() => {
                          soundEffects.playTap(soundVolume);
                          setEnglishIndex(idx);
                          setShowDrawer(false);
                        }}
                        className={`p-2.5 rounded-2xl flex flex-col items-center justify-between border-2 transition-all cursor-pointer relative ${
                          isCurrent
                            ? 'bg-indigo-100 border-indigo-600 ring-2 ring-indigo-300 scale-105 shadow-md'
                            : 'bg-white hover:bg-indigo-50/70 border-slate-200 shadow-2xs'
                        }`}
                      >
                        <span className="text-2xl font-black text-slate-900 leading-none">
                          {displayLetter}
                        </span>
                        <span className="text-[10px] font-bold text-indigo-700 truncate max-w-full mt-1">
                          {item.word} {item.emoji}
                        </span>

                        {progress && progress.stars > 0 && (
                          <div className="flex items-center gap-0.5 mt-1">
                            {[1, 2, 3].map((s) => (
                              <Star
                                key={s}
                                className={`w-2.5 h-2.5 ${
                                  s <= progress.stars
                                    ? 'fill-amber-400 text-amber-500'
                                    : 'fill-slate-200 text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
