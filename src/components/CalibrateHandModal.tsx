import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Hand,
  CheckCircle2,
  X,
  RotateCcw,
  Sparkles,
  Camera,
  Volume2,
  ArrowRight,
  Crosshair,
  Sliders,
  Maximize2,
  Minimize2,
  Info,
} from 'lucide-react';
import { GameSettings, HandPoint } from '../types';
import { soundEffects, speakText } from '../services/audioService';

interface CalibrateHandModalProps {
  isOpen: boolean;
  onClose: () => void;
  handPoint: HandPoint | null;
  settings: GameSettings;
  onUpdateSettings?: (newSettings: GameSettings) => void;
  onCalibrationComplete?: () => void;
}

export const CalibrateHandModal: React.FC<CalibrateHandModalProps> = ({
  isOpen,
  onClose,
  handPoint,
  settings,
  onUpdateSettings,
  onCalibrationComplete,
}) => {
  // Calibration hold progress: 0 to 100%
  const [progress, setProgress] = useState(0);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [lastTickTime, setLastTickTime] = useState(0);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  // Center target parameters in normalized coords
  const targetX = 0.5;
  const targetY = 0.5;
  const targetRadius = 0.16; // 16% of frame radius for tolerance

  // Calculate distance from hand to target center
  const handDist = handPoint
    ? Math.sqrt(Math.pow(handPoint.x - targetX, 2) + Math.pow(handPoint.y - targetY, 2))
    : null;

  const isInsideCenter = handDist !== null && handDist <= targetRadius;

  // Spoken voice guidance helper
  const speakInstruction = useCallback(
    (text: string) => {
      if (settings.soundVolume > 0.01) {
        speakText(text, settings.language, settings.voicePersona, settings.soundVolume);
      }
    },
    [settings.language, settings.voicePersona, settings.soundVolume]
  );

  // Play instruction on modal open
  useEffect(() => {
    if (isOpen) {
      setIsCalibrated(false);
      setProgress(0);
      const timer = setTimeout(() => {
        speakInstruction('ชูมือขึ้นมา แล้ววางมือไว้ตรงกลางวงกลมนะจ๊ะ');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, speakInstruction]);

  // Calibration progress timer loop
  useEffect(() => {
    if (!isOpen || isCalibrated) return;

    if (!handPoint || !isInsideCenter) {
      // Hand left the target or is not detected: slowly decay or reset
      setProgress((prev) => Math.max(0, prev - 4));
      return;
    }

    // Hand is inside center! Increment progress smoothly
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5; // ~1.5s total to reach 100%

        // Sound tick feedback every 25%
        const now = Date.now();
        if (next % 25 === 0 && now - lastTickTime > 200) {
          if (settings.soundVolume > 0.01) {
            soundEffects.playTick(settings.soundVolume);
          }
          setLastTickTime(now);
        }

        if (next >= 100) {
          setIsCalibrated(true);
          // Play celebration
          if (settings.soundVolume > 0.01) {
            soundEffects.playSuccess(settings.soundVolume);
          }
          try {
            confetti({
              particleCount: 65,
              spread: 75,
              origin: { y: 0.55 },
              colors: ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6'],
            });
          } catch {
            // Graceful fallback
          }

          speakInstruction('เก่งมากจ้า! ปรับเทียบมือสำเร็จแล้ว กล้องพร้อมจับมือแล้ว');

          if (onCalibrationComplete) {
            onCalibrationComplete();
          }

          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isOpen, handPoint, isInsideCenter, isCalibrated, settings.soundVolume, lastTickTime, onCalibrationComplete, speakInstruction]);

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Determine directional guidance text & arrow
  let guidanceText = 'ชูมือขึ้นมาให้กล้องเห็นนะจ๊ะ 🖐️';
  let guidanceIcon = '👀';
  let guidanceDirection: 'center' | 'left' | 'right' | 'up' | 'down' = 'center';

  if (!handPoint) {
    guidanceText = 'กำลังมองหามือ... ชูมือข้างที่ถนัดขึ้นมาตรงหน้ากล้องนะจ๊ะ';
    guidanceIcon = '🖐️';
  } else if (isInsideCenter) {
    guidanceText = isCalibrated
      ? 'ยอดเยี่ยมมาก! กล้องจับมือได้แม่นยำแล้ว 🎉'
      : `ดีมากเลยจ้า! ถือมือนิ่งๆ ไว้ตรงกลางนะ (${Math.round(progress)}%)`;
    guidanceIcon = isCalibrated ? '🎉' : '🎯';
    guidanceDirection = 'center';
  } else {
    // Determine which direction to move
    const dx = handPoint.x - targetX;
    const dy = handPoint.y - targetY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < -0.1) {
        guidanceText = 'ขยับมือไปทางขวาอีกนิดนะ ➡️';
        guidanceDirection = 'right';
      } else if (dx > 0.1) {
        guidanceText = 'ขยับมือไปทางซ้ายอีกนิดนะ ⬅️';
        guidanceDirection = 'left';
      }
    } else {
      if (dy < -0.1) {
        guidanceText = 'ขยับมือลงมาอีกนิดนะ ⬇️';
        guidanceDirection = 'down';
      } else if (dy > 0.1) {
        guidanceText = 'ยกมือสูงขึ้นอีกนิดนะ ⬆️';
        guidanceDirection = 'up';
      }
    }
    guidanceIcon = '👉';
  }

  return (
    <div
      id="calibrate-hand-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200 select-none overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="calibrate-hand-modal-content"
        className="bg-white rounded-3xl sm:rounded-4xl shadow-2xl border-4 border-amber-300 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col my-auto relative"
      >
        {/* Playful Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 p-4 sm:p-5 text-white flex items-center justify-between border-b-4 border-amber-600 relative shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner border border-white/30">
              🖐️
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg sm:text-xl font-black font-display text-white tracking-wide drop-shadow-xs">
                  ปรับเทียบกล้องจับมือ (Calibrate Hand)
                </h2>
                <span className="bg-white/25 text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-white/30 hidden xs:inline">
                  สำหรับเด็กเล็ก
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-50 font-semibold">
                ชูมือวางไว้ตรงกลางกรอบวงกลม เพื่อให้กล้องตอบสนองแม่นยำที่สุด
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              id="btn-voice-prompt-calibrate"
              onClick={() => speakInstruction(guidanceText)}
              className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
              title="ฟังคำแนะนำเสียง"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              type="button"
              id="btn-close-calibrate-hand-modal"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 text-lg font-black"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive Calibration Viewfinder Stage */}
        <div className="p-4 sm:p-6 flex flex-col items-center gap-4 bg-slate-50">
          {/* Main Visual Frame */}
          <div
            id="calibration-viewfinder-frame"
            className={`relative w-full aspect-[4/3] max-w-md rounded-3xl overflow-hidden border-4 transition-all duration-300 shadow-inner flex items-center justify-center ${
              isCalibrated
                ? 'bg-gradient-to-b from-emerald-50 to-teal-100 border-emerald-400 ring-4 ring-emerald-300/40'
                : isInsideCenter
                ? 'bg-gradient-to-b from-amber-50 to-yellow-100 border-amber-400 ring-4 ring-amber-300/40'
                : 'bg-slate-900 border-slate-300'
            }`}
          >
            {/* Background Grid Lines & Crosshairs */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="w-full h-1/2 border-b border-white border-dashed" />
              <div className="h-full w-1/2 border-r border-white border-dashed absolute top-0 left-0" />
            </div>

            {/* Corner Alignment Brackets */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-4 border-l-4 border-amber-400/80 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 border-amber-400/80 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 border-amber-400/80 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-4 border-r-4 border-amber-400/80 rounded-br-lg pointer-events-none" />

            {/* Center Target Zone Ring */}
            <div
              className={`relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                isCalibrated
                  ? 'border-6 border-emerald-500 bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                  : isInsideCenter
                  ? 'border-6 border-amber-400 bg-amber-400/25 shadow-[0_0_25px_rgba(245,158,11,0.5)] scale-105'
                  : 'border-4 border-dashed border-white/60 bg-white/10'
              }`}
            >
              {/* Animated Rippling Pulse Ring when holding inside center */}
              {isInsideCenter && !isCalibrated && (
                <div className="absolute inset-0 rounded-full border-4 border-amber-300 animate-ping opacity-40" />
              )}

              {/* Progress Pie / Ring around target */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke={isCalibrated ? '#10B981' : '#F59E0B'}
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-100"
                />
              </svg>

              {/* Center Silhouette Icon & Text */}
              <div className="flex flex-col items-center justify-center text-center p-2 z-20">
                {isCalibrated ? (
                  <>
                    <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-600 animate-bounce" />
                    <span className="text-xs sm:text-sm font-black text-emerald-900 mt-1">
                      ปรับเทียบเสร็จแล้ว!
                    </span>
                  </>
                ) : (
                  <>
                    <div
                      className={`text-5xl sm:text-6xl transition-transform duration-200 ${
                        isInsideCenter ? 'scale-110 text-amber-500 animate-pulse' : 'text-white/80'
                      }`}
                    >
                      🖐️
                    </div>
                    <span
                      className={`text-xs font-black mt-1 ${
                        isInsideCenter ? 'text-amber-950 font-display' : 'text-white/90 drop-shadow-xs'
                      }`}
                    >
                      {isInsideCenter ? `วางค้างไว้ (${Math.round(progress)}%)` : 'วางมือตรงนี้'}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Live Detected Hand Pointer Dot */}
            {handPoint && (
              <div
                className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
                style={{
                  left: `${handPoint.x * 100}%`,
                  top: `${handPoint.y * 100}%`,
                }}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-colors border-2 ${
                    isInsideCenter
                      ? 'bg-emerald-400 text-emerald-950 border-white ring-4 ring-emerald-300 animate-pulse'
                      : 'bg-amber-400 text-amber-950 border-white ring-2 ring-amber-200'
                  }`}
                >
                  <span className="text-xl sm:text-2xl">🖐️</span>
                </div>
              </div>
            )}

            {/* Directional Guidance Arrows when Hand is detected outside center */}
            {handPoint && !isInsideCenter && (
              <div className="absolute z-20 pointer-events-none">
                {guidanceDirection === 'left' && (
                  <div className="text-3xl text-amber-300 animate-bounce">⬅️</div>
                )}
                {guidanceDirection === 'right' && (
                  <div className="text-3xl text-amber-300 animate-bounce">➡️</div>
                )}
                {guidanceDirection === 'up' && (
                  <div className="text-3xl text-amber-300 animate-bounce">⬆️</div>
                )}
                {guidanceDirection === 'down' && (
                  <div className="text-3xl text-amber-300 animate-bounce">⬇️</div>
                )}
              </div>
            )}
          </div>

          {/* Real-time Guidance Banner */}
          <div
            className={`w-full rounded-2xl p-3 sm:p-4 text-center transition-all border-2 flex items-center justify-center gap-2.5 shadow-xs ${
              isCalibrated
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : isInsideCenter
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-blue-50 border-blue-300 text-blue-900'
            }`}
          >
            <span className="text-2xl shrink-0">{guidanceIcon}</span>
            <div className="text-xs sm:text-sm font-black font-display leading-snug">
              {guidanceText}
            </div>
          </div>

          {/* Quick Diagnostics & Setup Tips for Teachers and Parents */}
          <div className="w-full bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>คำแนะนำเพื่อความแม่นยำสำหรับเด็กเล็ก (3-6 ขวบ)</span>
              </span>
              <button
                type="button"
                onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{showSettingsDrawer ? 'ซ่อนการปรับแต่ง' : 'ปรับแต่งเพิ่มเติม'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
              <div className="flex items-start gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span>📏</span>
                <span>
                  <strong>ระยะที่เหมาะสม:</strong> ห่างจากกล้องประมาณ 50-70 ซม. (หนึ่งช่วงแขนของเด็ก)
                </span>
              </div>
              <div className="flex items-start gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span>💡</span>
                <span>
                  <strong>แสงสว่าง:</strong> ควรมีแสงสว่างส่องที่ฝ่ามือชัดเจน หลีกเลี่ยงแสงย้อนด้านหลัง
                </span>
              </div>
              <div className="flex items-start gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span>🖐️</span>
                <span>
                  <strong>ท่าทางมือ:</strong> หงายหรือคว่ำฝ่ามือตรงๆ เข้าหากล้อง กางนิ้วเล็กน้อย
                </span>
              </div>
            </div>

            {/* Optional Teacher/Parent Fine-Tuning Drawer */}
            {showSettingsDrawer && onUpdateSettings && (
              <div className="mt-3 pt-3 border-t border-slate-200 space-y-3 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="text-xs">
                    <span className="font-bold text-slate-800">กลับภาพกล้องซ้าย-ขวา (Camera Mirroring):</span>
                    <p className="text-[10px] text-slate-500">
                      {settings.cameraMirrored
                        ? 'กำลังเปิดอยู่ (ขยับมือขวาจะตรงกับขวาบนหน้าจอเหมือนกระจก)'
                        : 'กำลังปิดอยู่'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateSettings({
                        ...settings,
                        cameraMirrored: !settings.cameraMirrored,
                      })
                    }
                    className={`px-3 py-1 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                      settings.cameraMirrored
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    {settings.cameraMirrored ? 'เปิดโหมดกระจกเงา ✅' : 'ปิดโหมดกระจกเงา ❌'}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="text-xs">
                    <span className="font-bold text-slate-800">ขนาดเคอร์เซอร์พอยน์เตอร์มือ:</span>
                    <p className="text-[10px] text-slate-500">
                      ปรับขนาดมือให้เด็กเล็กมองเห็นและชี้ตอบคำถามได้ง่ายขึ้น
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[
                      { scale: 1.0, label: 'ปกติ' },
                      { scale: 1.25, label: 'ใหญ่ ⭐' },
                      { scale: 1.5, label: 'ใหญ่พิเศษ 🌟' },
                    ].map((opt) => (
                      <button
                        key={opt.scale}
                        type="button"
                        onClick={() =>
                          onUpdateSettings({
                            ...settings,
                            handPointerScale: opt.scale,
                          })
                        }
                        className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                          Math.abs(settings.handPointerScale - opt.scale) < 0.05
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex flex-col xs:flex-row items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            id="btn-recalibrate-again"
            onClick={() => {
              setIsCalibrated(false);
              setProgress(0);
              speakInstruction('ลองอีกครั้งนะจ๊ะ ชูมือแล้ววางไว้ตรงกลางวงกลม');
            }}
            className="w-full xs:w-auto px-4 py-2.5 rounded-2xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-black cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>ปรับเทียบใหม่อีกครั้ง</span>
          </button>

          <button
            type="button"
            id="btn-confirm-hand-calibrated"
            onClick={onClose}
            className={`w-full xs:w-auto px-6 py-2.5 rounded-2xl text-white text-xs sm:text-sm font-black shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2 ${
              isCalibrated
                ? 'bg-emerald-600 hover:bg-emerald-700 border-b-4 border-emerald-800'
                : 'bg-blue-600 hover:bg-blue-700 border-b-4 border-blue-800'
            }`}
          >
            <span>{isCalibrated ? 'พร้อมเล่นแล้ว! 🚀' : 'เสร็จสิ้น / ปิดหน้าต่าง'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
