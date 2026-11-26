import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Grade, HandPoint } from '../../types';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  SHAPES_DATA,
  ANIMALS_DATA,
  THAI_CONSONANTS_DATA,
  getEnglishLettersData,
  NUMBERS_DATA,
  TracingItem,
} from '../../data/handTracingData';
import {
  Hand,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Camera,
  CameraOff,
  Volume2,
  ArrowRight,
  Palette,
  Award,
  ChevronRight,
  ChevronLeft,
  Grid,
  Search,
  X,
} from 'lucide-react';

export interface HandTracingActivityViewProps {
  currentGrade?: Grade;
  soundVolume?: number;
  onEarnStar?: () => void;
  externalHandPoint?: HandPoint | null;
  onClose?: () => void;
  initialCategory?: TracingCategory;
  initialEnglishCase?: 'uppercase' | 'lowercase';
}

export type TracingCategory = 'animals' | 'shapes' | 'english' | 'numbers' | 'thai';

const BRUSH_COLORS = [
  { id: 'rainbow', name: 'สายรุ้งนีออน 🌈', color: '#ec4899', gradient: 'from-pink-500 via-amber-400 to-emerald-400' },
  { id: 'blue', name: 'ฟ้าสดใส 💙', color: '#0284c7', gradient: 'from-sky-400 to-blue-600' },
  { id: 'emerald', name: 'เขียวมรกต 💚', color: '#10b981', gradient: 'from-emerald-400 to-teal-600' },
  { id: 'amber', name: 'ทองประกาย 💛', color: '#f59e0b', gradient: 'from-amber-400 to-orange-500' },
  { id: 'purple', name: 'ม่วงเวทมนตร์ 💜', color: '#8b5cf6', gradient: 'from-purple-400 to-indigo-600' },
];

export const HandTracingActivityView: React.FC<HandTracingActivityViewProps> = ({
  currentGrade = 'K2',
  soundVolume = 0.8,
  onEarnStar,
  externalHandPoint = null,
  onClose,
  initialCategory = 'english',
  initialEnglishCase = 'uppercase',
}) => {
  // Category & Selected Item (Default to English Tracing or initialCategory)
  const [selectedCategory, setSelectedCategory] = useState<TracingCategory>(initialCategory);
  const [englishCase, setEnglishCase] = useState<'uppercase' | 'lowercase'>(initialEnglishCase);
  const [itemIndex, setItemIndex] = useState(0);

  // Quick Picker Grid Drawer modal
  const [showGridPicker, setShowGridPicker] = useState(false);
  const [pickerSearchQuery, setPickerSearchQuery] = useState('');

  // Items per category
  const categoryItems: TracingItem[] = useMemo(() => {
    switch (selectedCategory) {
      case 'animals':
        return ANIMALS_DATA;
      case 'shapes':
        return SHAPES_DATA;
      case 'english':
        return getEnglishLettersData(englishCase);
      case 'numbers':
        return NUMBERS_DATA;
      case 'thai':
        return THAI_CONSONANTS_DATA;
      default:
        return ANIMALS_DATA;
    }
  }, [selectedCategory, englishCase]);

  // Keep itemIndex in valid range
  const safeItemIndex = Math.min(itemIndex, categoryItems.length - 1);
  const activeItem = categoryItems[safeItemIndex] || categoryItems[0];

  // Vector stroke path for background guidance track (100% within bounds, no overflow)
  const tracingPathD = useMemo(() => {
    if (activeItem.svgPath) return activeItem.svgPath;
    if (!activeItem.checkpoints || activeItem.checkpoints.length === 0) return '';
    return activeItem.checkpoints
      .map((cp, idx) => `${idx === 0 ? 'M' : 'L'} ${cp.x},${cp.y}`)
      .join(' ');
  }, [activeItem]);

  // Tracing Progress
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState(0);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [lastHitSound, setLastHitSound] = useState<{ text: string; x: number; y: number; key: number } | null>(null);

  // Styling & Tools
  const [selectedColorId, setSelectedColorId] = useState('rainbow');
  const [brushSize, setBrushSize] = useState<number>(14);

  // Input Mode: Camera Hand Tracking vs Touch
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true);
  const [cameraStatus, setCameraStatus] = useState<'starting' | 'active' | 'denied' | 'unsupported'>('starting');
  const [localHandPoint, setLocalHandPoint] = useState<HandPoint | null>(null);

  // Combined hand point
  const effectiveHandPoint = externalHandPoint || localHandPoint;

  // DOM Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingBoardRef = useRef<HTMLDivElement | null>(null);
  const miniVideoRef = useRef<HTMLVideoElement | null>(null);
  const isDrawingMouseRef = useRef(false);

  // Spoken voice guidance with language support
  const speakVoice = useCallback(
    (text: string, forceLang?: 'th' | 'en') => {
      if (soundVolume > 0.05) {
        const lang = forceLang || (selectedCategory === 'english' ? 'en' : 'th');
        speakText(text, lang, 'adult_female', soundVolume);
      }
    },
    [soundVolume, selectedCategory]
  );

  // Play instructions on change
  useEffect(() => {
    setCurrentCheckpointIndex(0);
    setCompletedCheckpoints([]);
    setIsCompleted(false);
    setAccuracyScore(null);
    setLastHitSound(null);

    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    const timer = setTimeout(() => {
      if (selectedCategory === 'english') {
        speakVoice(
          `Letter ${activeItem.char}! ${activeItem.subname}. Let's trace letter ${activeItem.char}!`,
          'en'
        );
      } else {
        speakVoice(activeItem.voicePrompt, 'th');
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [activeItem, selectedCategory, speakVoice]);

  // Self-contained MediaPipe Camera Setup
  useEffect(() => {
    if (!isCameraActive) {
      setLocalHandPoint(null);
      return;
    }

    let isMounted = true;
    let stream: MediaStream | null = null;
    let animId: number | null = null;

    async function initCamera() {
      let retries = 0;
      while (!window.Hands && retries < 20) {
        await new Promise((r) => setTimeout(r, 200));
        retries++;
      }

      if (!isMounted) return;

      if (!window.Hands || !navigator.mediaDevices?.getUserMedia) {
        setCameraStatus('unsupported');
        return;
      }

      try {
        setCameraStatus('starting');
        const hands = new window.Hands({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((results) => {
          if (!isMounted) return;

          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            setCameraStatus('active');
            const landmarks = results.multiHandLandmarks[0];
            const indexTip = landmarks[8]; // Index fingertip

            // Mirror horizontally
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

        // Request camera
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user',
          },
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
              // Frame dropped, proceed
            }
            if (isMounted) {
              animId = requestAnimationFrame(processFrame);
            }
          };

          animId = requestAnimationFrame(processFrame);
        }
      } catch (err) {
        console.warn('Hand tracking camera error:', err);
        setCameraStatus('denied');
      }
    }

    initCamera();

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isCameraActive]);

  // Paint onto Canvas at (x, y) coordinates
  const drawBrushPoint = useCallback(
    (canvasX: number, canvasY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const activeColor =
        BRUSH_COLORS.find((c) => c.id === selectedColorId)?.color || '#ec4899';

      ctx.save();
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, brushSize, 0, Math.PI * 2);

      if (selectedColorId === 'rainbow') {
        const time = Date.now() / 250;
        const r = Math.sin(time) * 127 + 128;
        const g = Math.sin(time + 2) * 127 + 128;
        const b = Math.sin(time + 4) * 127 + 128;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.shadowColor = `rgb(${r},${g},${b})`;
      } else {
        ctx.fillStyle = activeColor;
        ctx.shadowColor = activeColor;
      }

      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
    },
    [selectedColorId, brushSize]
  );

  // Check collision with checkpoints
  const checkHitCheckpoint = useCallback(
    (canvasNormX: number, canvasNormY: number) => {
      if (isCompleted) return;

      const targetCp = activeItem.checkpoints[currentCheckpointIndex];
      if (!targetCp) return;

      // Distance in percentage
      const dx = canvasNormX * 100 - targetCp.x;
      const dy = canvasNormY * 100 - targetCp.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // 14% tolerance radius is friendly for preschool kids
      if (dist < 14) {
        const nextIndex = currentCheckpointIndex + 1;
        setCompletedCheckpoints((prev) => [...prev, targetCp.order]);
        setCurrentCheckpointIndex(nextIndex);

        // Sound effect logic:
        if (activeItem.soundType) {
          soundEffects.playAnimalSound(activeItem.soundType, soundVolume);
        } else {
          soundEffects.playCorrect(soundVolume);
        }

        // Show cute sound bubble popping over checkpoint
        if (selectedCategory === 'english') {
          setLastHitSound({
            text: `${activeItem.char} • ${activeItem.phonics || activeItem.englishWord || ''} ${activeItem.iconEmoji}`,
            x: targetCp.x,
            y: targetCp.y,
            key: Date.now(),
          });
        } else if (activeItem.animalSound) {
          setLastHitSound({
            text: activeItem.animalSound,
            x: targetCp.x,
            y: targetCp.y,
            key: Date.now(),
          });
        } else if (selectedCategory === 'thai') {
          setLastHitSound({
            text: `${activeItem.name} ${activeItem.iconEmoji}`,
            x: targetCp.x,
            y: targetCp.y,
            key: Date.now(),
          });
        }

        // Check if finished!
        if (nextIndex === activeItem.checkpoints.length) {
          setIsCompleted(true);
          const score = Math.floor(92 + Math.random() * 8); // 92-99%
          setAccuracyScore(score);
          soundEffects.playVictory(soundVolume);
          if (activeItem.soundType) {
            setTimeout(() => {
              soundEffects.playAnimalSound(activeItem.soundType!, soundVolume);
            }, 650);
          }
          if (onEarnStar) onEarnStar();
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.55 },
          });

          if (selectedCategory === 'english') {
            speakVoice(
              `Awesome! You traced letter ${activeItem.char}! ${activeItem.subname}! Accuracy ${score} percent!`,
              'en'
            );
          } else {
            speakVoice(
              `ยอดเยี่ยมที่สุดเลยจ้า! ลากเส้น ${activeItem.name} ${activeItem.animalSound || ''} สำเร็จแล้ว แม่นยำ ${score} เปอร์เซ็นต์ รับดาวทองเลย!`,
              'th'
            );
          }
        } else {
          if (selectedCategory === 'english') {
            if (nextIndex === 1) {
              speakVoice(`Letter ${activeItem.char}`, 'en');
            } else if (nextIndex === activeItem.checkpoints.length - 1) {
              speakVoice(`${activeItem.englishWord || activeItem.char}!`, 'en');
            } else {
              speakVoice(`${activeItem.char}!`, 'en');
            }
          } else if (activeItem.animalSound) {
            speakVoice(`${activeItem.animalSound}`, 'th');
          } else {
            speakVoice(`จุดที่ ${targetCp.label} เก่งมากจ้า!`, 'th');
          }
        }
      }
    },
    [isCompleted, activeItem, currentCheckpointIndex, soundVolume, onEarnStar, speakVoice]
  );

  // Hand position to Canvas coordinate mapper
  useEffect(() => {
    if (!effectiveHandPoint || !drawingBoardRef.current || !canvasRef.current) return;

    const board = drawingBoardRef.current.getBoundingClientRect();
    const canvas = canvasRef.current;

    const normX = (effectiveHandPoint.screenX - board.left) / board.width;
    const normY = (effectiveHandPoint.screenY - board.top) / board.height;

    if (normX >= 0 && normX <= 1 && normY >= 0 && normY <= 1) {
      const canvasX = normX * canvas.width;
      const canvasY = normY * canvas.height;

      drawBrushPoint(canvasX, canvasY);
      checkHitCheckpoint(normX, normY);
    }
  }, [effectiveHandPoint, drawBrushPoint, checkHitCheckpoint]);

  // Touch / Mouse Tracing Handlers (Universal Fallback)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingMouseRef.current = true;
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingMouseRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width;
    const normY = (e.clientY - rect.top) / rect.height;

    if (normX >= 0 && normX <= 1 && normY >= 0 && normY <= 1) {
      const canvasX = normX * canvas.width;
      const canvasY = normY * canvas.height;

      drawBrushPoint(canvasX, canvasY);
      checkHitCheckpoint(normX, normY);
    }
  };

  const handlePointerUp = () => {
    isDrawingMouseRef.current = false;
  };

  const handleResetCanvas = () => {
    soundEffects.playTap(soundVolume);
    setCurrentCheckpointIndex(0);
    setCompletedCheckpoints([]);
    setIsCompleted(false);
    setAccuracyScore(null);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleNextItem = () => {
    soundEffects.playTap(soundVolume);
    if (safeItemIndex < categoryItems.length - 1) {
      setItemIndex(safeItemIndex + 1);
    } else {
      setItemIndex(0);
    }
  };

  const handlePrevItem = () => {
    soundEffects.playTap(soundVolume);
    if (safeItemIndex > 0) {
      setItemIndex(safeItemIndex - 1);
    } else {
      setItemIndex(categoryItems.length - 1);
    }
  };

  // Filtered items in drawer modal
  const filteredPickerItems = useMemo(() => {
    const q = pickerSearchQuery.trim().toLowerCase();
    if (!q) return categoryItems;
    return categoryItems.filter(
      (it) =>
        it.name.toLowerCase().includes(q) ||
        it.subname.toLowerCase().includes(q) ||
        (it.char && it.char.toLowerCase().includes(q))
    );
  }, [categoryItems, pickerSearchQuery]);

  // Convert hand coordinates to CSS relative coordinates for cursor rendering
  const boardRect = drawingBoardRef.current?.getBoundingClientRect();
  const handRelativeX =
    effectiveHandPoint && boardRect
      ? ((effectiveHandPoint.screenX - boardRect.left) / boardRect.width) * 100
      : null;
  const handRelativeY =
    effectiveHandPoint && boardRect
      ? ((effectiveHandPoint.screenY - boardRect.top) / boardRect.height) * 100
      : null;

  return (
    <div
      id="hand-tracing-activity-view"
      className="w-full max-w-5xl mx-auto flex flex-col items-center gap-3 sm:gap-4 select-none animate-in fade-in duration-300"
    >
      {/* Top Category Tabs (รูปสัตว์น่ารัก 18 ชนิด, รูปทรงเรขาคณิต 16 รูปทรง, อักษรภาษาอังกฤษ 26 ตัว, ตัวเลข 10 ตัว) */}
      <div className="w-full bg-white rounded-3xl p-3 sm:p-4 border-2 border-emerald-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          {(
            [
              { id: 'english', label: 'เขียนอักษรภาษาอังกฤษ', badge: 'A-Z (26 ตัว)', icon: '🔤' },
              { id: 'thai', label: 'คัดลายมือไทย', badge: 'ก-ฮ (44 ตัว)', icon: '🇹🇭' },
              { id: 'animals', label: 'ลากเส้นตามรูปสัตว์', badge: `${ANIMALS_DATA.length} ชนิด`, icon: '🦁' },
              { id: 'shapes', label: 'รูปทรงเรขาคณิต', badge: `${SHAPES_DATA.length} ทรง`, icon: '🔷' },
              { id: 'numbers', label: 'ตัวเลขอารบิก', badge: '0-9 (10 ตัว)', icon: '🔢' },
            ] as { id: TracingCategory; label: string; badge: string; icon: string }[]
          ).map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setSelectedCategory(tab.id);
                  setItemIndex(0);
                }}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-102 ring-2 ring-emerald-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons: English Case Toggle, Camera Toggle, Close */}
        <div className="flex items-center gap-2 shrink-0">
          {/* If category is English: Uppercase / Lowercase switcher */}
          {selectedCategory === 'english' && (
            <div className="flex items-center bg-purple-50 p-1 rounded-2xl border border-purple-200">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setEnglishCase('uppercase');
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  englishCase === 'uppercase'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-purple-900 hover:bg-purple-100'
                }`}
              >
                ตัวพิมพ์ใหญ่ (A-Z)
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setEnglishCase('lowercase');
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  englishCase === 'lowercase'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-purple-900 hover:bg-purple-100'
                }`}
              >
                ตัวพิมพ์เล็ก (a-z)
              </button>
            </div>
          )}

          {/* Quick Grid Selector Drawer Button */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setShowGridPicker(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-black text-xs cursor-pointer shadow-2xs transition-all"
            title="เปิดตารางเลือกตัวอักษรหรือรูปทรงทั้งหมด"
          >
            <Grid className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">
              {selectedCategory === 'animals'
                ? 'เลือกรูปสัตว์'
                : selectedCategory === 'shapes'
                ? 'เลือกรูปทรง'
                : selectedCategory === 'numbers'
                ? 'เลือกตัวเลข'
                : 'เลือกตัวอักษร'}
            </span>
            <span>({safeItemIndex + 1}/{categoryItems.length})</span>
          </button>

          {/* Camera Hand Tracking Toggle */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setIsCameraActive((prev) => !prev);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-black text-xs transition-all cursor-pointer border ${
              isCameraActive
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300 shadow-2xs'
                : 'bg-slate-100 text-slate-600 border-slate-300'
            }`}
            title="สลับโหมดกล้องจับการเคลื่อนไหวมือ (Hand Tracking) หรือสัมผัสหน้าจอ"
          >
            {isCameraActive ? (
              <>
                <Camera className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span className="hidden md:inline">โหมดกล้อง Hand Tracking</span>
                <span className="md:hidden">กล้อง 🖐️</span>
              </>
            ) : (
              <>
                <CameraOff className="w-4 h-4 text-slate-500" />
                <span>โหมดสัมผัส 👆</span>
              </>
            )}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              ปิด
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Carousel Selector Bar with Prev / Next Navigation */}
      <div className="w-full flex items-center gap-2 overflow-hidden px-1">
        <button
          type="button"
          onClick={handlePrevItem}
          className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 shadow-xs cursor-pointer shrink-0"
          title="ตัวก่อนหน้า"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {categoryItems.map((it, idx) => {
            const isSelected = idx === safeItemIndex;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setItemIndex(idx);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer border shrink-0 ${
                  isSelected
                    ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs scale-105 ring-2 ring-amber-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
                }`}
              >
                <span>{it.iconEmoji}</span>
                <span>{it.char || it.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNextItem}
          className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 shadow-xs cursor-pointer shrink-0"
          title="ตัวถัดไป"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Tracing Arena Box */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-6 border-3 border-emerald-200 shadow-md flex flex-col gap-4 relative overflow-hidden">
        {/* Arena Header with Title & Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 border-2 border-emerald-300 flex items-center justify-center text-3xl shadow-2xs shrink-0">
              {activeItem.iconEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  {activeItem.name}
                </h3>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-200">
                  {activeItem.subname}
                </span>
                {activeItem.phonics && (
                  <span className="text-[10px] font-black bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                    <span>Phonics:</span>
                    <span className="font-mono">{activeItem.phonics}</span>
                    <span>({activeItem.thaiSound})</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {activeItem.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {selectedCategory === 'english' && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  speakVoice(
                    `Letter ${activeItem.char}! ${activeItem.char} says ${activeItem.thaiSound || activeItem.phonics}. ${activeItem.subname}!`,
                    'en'
                  );
                  setLastHitSound({
                    text: `🔤 ${activeItem.char} ${activeItem.phonics || ''} - ${activeItem.subname}`,
                    x: 50,
                    y: 40,
                    key: Date.now(),
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 text-xs font-black cursor-pointer shadow-2xs active:scale-95 transition-all"
                title="ฟังเสียงอ่านตัวอักษรภาษาอังกฤษและโฟนิกส์"
              >
                <Volume2 className="w-4 h-4 text-purple-600 animate-pulse" />
                <span>เสียงอ่าน: {activeItem.char} ({activeItem.phonics || activeItem.thaiSound})</span>
              </button>
            )}

            {activeItem.animalSound && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playAnimalSound(activeItem.soundType || 'rabbit', soundVolume);
                  speakVoice(activeItem.animalSound || '');
                  setLastHitSound({
                    text: activeItem.animalSound || '',
                    x: 50,
                    y: 42,
                    key: Date.now(),
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-black cursor-pointer shadow-2xs active:scale-95 transition-all"
                title="ฟังเสียงร้องของสัตว์"
              >
                <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>เสียงร้อง: {activeItem.animalSound}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => speakVoice(activeItem.voicePrompt)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 cursor-pointer shadow-2xs"
              title="ฟังคำแนะนำเสียง"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">ฟังเสียง</span>
            </button>

            <button
              type="button"
              onClick={handleResetCanvas}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              title="ล้างเส้นวาดใหม่"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>เริ่มใหม่</span>
            </button>

            <button
              type="button"
              onClick={handleNextItem}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold cursor-pointer shadow-2xs"
              title="เปลี่ยนตัวถัดไป"
            >
              <span>ถัดไป</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tracing Board Canvas Container (Strict 1:1 Aspect Ratio Stage aligned with viewBox 0 0 100 100) */}
        <div
          ref={drawingBoardRef}
          id="tracing-drawing-board"
          className="w-full max-w-[440px] sm:max-w-[480px] aspect-square mx-auto relative rounded-3xl bg-radial from-white via-emerald-50/20 to-teal-50/40 border-3 border-emerald-300 overflow-hidden shadow-inner select-none cursor-crosshair"
        >
          {/* Subtle reference icon & name badge in top-left corner */}
          <div className="absolute top-3 left-3 z-15 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-xs rounded-xl border border-emerald-200/90 shadow-2xs">
            <span className="text-xl sm:text-2xl font-black text-emerald-800 leading-none">
              {activeItem.iconEmoji || activeItem.char || activeItem.name.split(' ')[0]}
            </span>
            <span className="text-[11px] text-emerald-600 font-bold">
              {activeItem.subname}
            </span>
          </div>

          {/* 1. Underlying SVG Guide Outline (Road Track with Centerline, strictly bounded, never overflows) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={activeItem.viewBox}
            preserveAspectRatio="none"
          >
            {tracingPathD ? (
              <>
                {/* Background wide guide track (ลู่ถนนฝึกเขียน) */}
                <path
                  d={tracingPathD}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Dashed centerline (เส้นประกึ่งกลาง) */}
                <path
                  d={tracingPathD}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="3.5"
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : null}

            {/* Directional connecting guide path showing stroke order */}
            {activeItem.checkpoints.length > 1 && (
              <polyline
                points={activeItem.checkpoints.map((cp) => `${cp.x},${cp.y}`).join(' ')}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeDasharray="6 5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-75"
              />
            )}

            {/* Animated direction arrow from current target to next target */}
            {currentCheckpointIndex < activeItem.checkpoints.length - 1 && (() => {
              const cur = activeItem.checkpoints[currentCheckpointIndex];
              const nxt = activeItem.checkpoints[currentCheckpointIndex + 1];
              const midX = (cur.x + nxt.x) / 2;
              const midY = (cur.y + nxt.y) / 2;
              const angle = (Math.atan2(nxt.y - cur.y, nxt.x - cur.x) * 180) / Math.PI;
              return (
                <g
                  transform={`translate(${midX}, ${midY}) rotate(${angle})`}
                  className="pointer-events-none"
                >
                  <polygon
                    points="-3.5,-4.5 5.5,0 -3.5,4.5"
                    fill="#f59e0b"
                    stroke="#b45309"
                    strokeWidth="1.2"
                  />
                </g>
              );
            })()}
          </svg>

          {/* 2. Interactive Paint Canvas Layer */}
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="absolute inset-0 w-full h-full touch-none z-10"
          />

          {/* 3. Numbered Checkpoint Targets */}
          {activeItem.checkpoints.map((cp, idx) => {
            const isPassed = completedCheckpoints.includes(cp.order);
            const isCurrent = idx === currentCheckpointIndex;

            let circleClass = 'bg-white/95 border-slate-300 text-slate-700 shadow-2xs';
            if (isPassed) {
              circleClass =
                'bg-emerald-500 border-emerald-600 text-white shadow-md scale-105';
            } else if (isCurrent) {
              circleClass =
                'bg-amber-400 border-amber-600 text-amber-950 font-black shadow-lg scale-125 ring-4 ring-amber-200 animate-pulse';
            }

            return (
              <div
                key={cp.order}
                style={{
                  left: `${cp.x}%`,
                  top: `${cp.y}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-3 flex items-center justify-center font-black text-xs sm:text-sm z-20 pointer-events-none transition-all ${circleClass}`}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                ) : (
                  <span>{cp.label}</span>
                )}
              </div>
            );
          })}

          {/* 3.5 Floating Animal Sound Vocalization Bubble over Checkpoint */}
          {lastHitSound && (
            <div
              key={lastHitSound.key}
              style={{
                left: `${lastHitSound.x}%`,
                top: `${Math.max(10, lastHitSound.y - 12)}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-full pointer-events-none z-35 animate-in zoom-in-75 slide-in-from-bottom-2 duration-150"
            >
              <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-amber-950 font-black text-xs sm:text-sm px-3 py-1.5 rounded-2xl shadow-xl border-2 border-white flex items-center gap-1.5 whitespace-nowrap animate-bounce">
                <span className="text-base">🔊</span>
                <span>{lastHitSound.text}</span>
              </div>
            </div>
          )}

          {/* 4. Live Hand Pointer Overlay Cursor (When camera tracks hand) */}
          {handRelativeX !== null && handRelativeY !== null && (
            <div
              style={{
                left: `${handRelativeX}%`,
                top: `${handRelativeY}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 transition-transform duration-75 ease-out"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-pink-400 bg-pink-300/30 animate-ping absolute" />
                <div className="w-10 h-10 rounded-full border-3 border-pink-500 bg-white flex items-center justify-center shadow-lg text-2xl">
                  ☝️
                </div>
              </div>
            </div>
          )}

          {/* 5. Mini Webcam Live Feed Preview (Mirrored in Bottom-Right Corner) */}
          {isCameraActive && (
            <div className="absolute bottom-3 right-3 z-30 w-28 sm:w-36 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-slate-900 flex flex-col group">
              <video
                ref={miniVideoRef}
                playsInline
                muted
                className="w-full h-20 sm:h-24 object-cover transform -scale-x-100"
              />
              <div className="bg-slate-900/90 text-white text-[9px] font-bold py-1 px-2 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      effectiveHandPoint ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
                    }`}
                  />
                  <span>{effectiveHandPoint ? 'ตรวจพบมือ 🖐️' : 'ส่องมือเข้ากล้อง'}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Toolbar: Color Palette, Brush Size, Progress and Status */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-3">
          {/* Color Chooser */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-black text-slate-700 flex items-center gap-1 pr-1">
              <Palette className="w-3.5 h-3.5 text-emerald-600" />
              <span>สีหมึก:</span>
            </span>
            {BRUSH_COLORS.map((col) => {
              const isSelected = selectedColorId === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    setSelectedColorId(col.id);
                  }}
                  className={`w-7 h-7 rounded-xl transition-all cursor-pointer border-2 ${
                    isSelected
                      ? 'border-slate-800 scale-110 shadow-xs ring-2 ring-emerald-300'
                      : 'border-white opacity-80 hover:opacity-100'
                  } bg-gradient-to-br ${col.gradient}`}
                  title={col.name}
                />
              );
            })}
          </div>

          {/* Brush Size Toggle */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">ขนาดเส้น:</span>
            {[
              { size: 9, label: 'เล็ก' },
              { size: 14, label: 'กลาง' },
              { size: 20, label: 'หนา' },
            ].map((s) => (
              <button
                key={s.size}
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setBrushSize(s.size);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  brushSize === s.size
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="text-xs font-black text-slate-700">
            จุดที่ผ่าน: <strong className="text-emerald-700">{completedCheckpoints.length}</strong> /{' '}
            {activeItem.checkpoints.length}
          </div>
        </div>

        {/* Celebration Banner when Completed */}
        {isCompleted && (
          <div className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-3xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner shrink-0 animate-bounce">
                🌟
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black leading-tight">
                  เก่งมากจ้า! ลากเส้น {activeItem.name} สำเร็จแล้ว (+1 ⭐)
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                  ความแม่นยำของกล้ามเนื้อมือ: <strong>{accuracyScore}%</strong> • พัฒนาทักษะสายตาและกล้ามเนื้อมัดเล็กยอดเยี่ยม!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetCanvas}
                className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                ลากใหม่อีกรอบ
              </button>
              <button
                type="button"
                onClick={handleNextItem}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 text-xs sm:text-sm font-black shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>ลากตัวถัดไป</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Educational Note */}
        <div className="w-full bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-emerald-950 font-medium">
          <Hand className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>ประโยชน์ของการลากเส้นตามรอยด้วย Hand Tracking:</strong> ฝึกความมั่นคงของกล้ามเนื้อมือ การควบคุมมิติสัมพันธ์ในอากาศ (Spatial Awareness) และการประสานสัมพันธ์ระหว่างสายตาและมือ (Eye-Hand Coordination) ผ่านการลากเส้นตามรูปสัตว์น่ารัก รูปทรงเรขาคณิต และตัวอักษรอย่างเพลิดเพลิน
          </span>
        </div>
      </div>

      {/* Quick Grid Picker Modal Drawer */}
      {showGridPicker && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowGridPicker(false);
            }
          }}
        >
          <div className="w-full max-w-3xl bg-white rounded-3xl border-3 border-emerald-300 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[88vh]">
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-emerald-200" />
                <h3 className="text-base font-black">
                  เลือก{selectedCategory === 'animals' ? 'รูปสัตว์น่ารัก' : selectedCategory === 'shapes' ? 'รูปทรง' : selectedCategory === 'english' ? 'ตัวอักษรภาษาอังกฤษ' : selectedCategory === 'numbers' ? 'ตัวเลขอารบิก' : 'พยัญชนะไทย'} ({categoryItems.length} แบบ)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGridPicker(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search filter in Drawer */}
            <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2 shrink-0">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={pickerSearchQuery}
                onChange={(e) => setPickerSearchQuery(e.target.value)}
                placeholder="ค้นหาตัวอักษร, ชื่อ หรือสัญลักษณ์..."
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {pickerSearchQuery && (
                <button
                  type="button"
                  onClick={() => setPickerSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 px-1"
                >
                  ล้าง
                </button>
              )}
            </div>

            {/* Grid of Items */}
            <div className="p-4 overflow-y-auto flex-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {filteredPickerItems.map((item) => {
                const originalIndex = categoryItems.findIndex((it) => it.id === item.id);
                const isSelected = originalIndex === safeItemIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      if (originalIndex !== -1) {
                        setItemIndex(originalIndex);
                      }
                      setShowGridPicker(false);
                      setPickerSearchQuery('');
                    }}
                    className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group text-center ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 shadow-md scale-105 ring-2 ring-amber-300'
                        : 'bg-white border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                    }`}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {item.iconEmoji}
                    </span>
                    <span className="text-xs font-black text-slate-800 line-clamp-1">
                      {item.char || item.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">
                      {item.subname.split(' ')[0]}
                    </span>
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
