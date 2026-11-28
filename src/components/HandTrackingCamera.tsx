import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, RefreshCw, Hand, CameraOff, Video } from 'lucide-react';
import { GameSettings, HandPoint } from '../types';

interface HandTrackingCameraProps {
  settings: GameSettings;
  onHandMove: (point: HandPoint | null) => void;
  isGameActive: boolean;
}

declare global {
  interface Window {
    Hands?: new (config: { locateFile: (file: string) => string }) => {
      setOptions: (options: Record<string, unknown>) => void;
      onResults: (callback: (results: MediaPipeResults) => void) => void;
      send: (data: { image: HTMLVideoElement }) => Promise<void>;
      close: () => void;
    };
  }
}

interface Landmark {
  x: number;
  y: number;
  z: number;
}

interface MediaPipeResults {
  multiHandLandmarks?: Landmark[][];
  image?: HTMLVideoElement;
}

export const HandTrackingCamera: React.FC<HandTrackingCameraProps> = ({
  settings,
  onHandMove,
  isGameActive,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraState, setCameraState] = useState<'starting' | 'active' | 'denied' | 'unsupported'>('starting');
  const [handDetected, setHandDetected] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const prevPointRef = useRef<{ x: number; y: number } | null>(null);
  const handsInstanceRef = useRef<{ close: () => void; send: (data: { image: HTMLVideoElement }) => Promise<void> } | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const onHandMoveRef = useRef(onHandMove);
  useEffect(() => {
    onHandMoveRef.current = onHandMove;
  });

  const handleRetryCamera = useCallback(() => {
    setCameraState('starting');
    setRetryCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    let isProcessing = false;

    async function initCameraAndHands() {
      if (!settings.showCameraFeed) {
        setCameraState('denied');
        return;
      }

      setCameraState('starting');

      // 1. Wait for MediaPipe Hands script to load
      let retries = 0;
      while (!window.Hands && retries < 25) {
        await new Promise((r) => setTimeout(r, 200));
        retries++;
      }

      if (!isMounted) return;

      if (!window.Hands || !navigator.mediaDevices?.getUserMedia) {
        setCameraState('unsupported');
        return;
      }

      try {
        // 2. Initialize MediaPipe Hands
        const hands = new window.Hands({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((results: MediaPipeResults) => {
          if (!isMounted) return;

          // Draw skeleton on miniature canvas
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.save();
              ctx.clearRect(0, 0, canvas.width, canvas.height);

              if (settings.cameraMirrored) {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
              }

              if (results.image) {
                ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
              }

              if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                const landmarks = results.multiHandLandmarks[0];

                // Draw landmarks
                ctx.fillStyle = '#10B981';
                ctx.strokeStyle = '#34D399';
                ctx.lineWidth = 2;

                landmarks.forEach((pt, idx) => {
                  const px = pt.x * canvas.width;
                  const py = pt.y * canvas.height;
                  ctx.beginPath();
                  // highlight index finger tip (8)
                  if (idx === 8) {
                    ctx.fillStyle = '#EF4444';
                    ctx.arc(px, py, 6, 0, 2 * Math.PI);
                  } else {
                    ctx.fillStyle = '#F59E0B';
                    ctx.arc(px, py, 3, 0, 2 * Math.PI);
                  }
                  ctx.fill();
                });
              }
              ctx.restore();
            }
          }

          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            setHandDetected(true);
            const landmarks = results.multiHandLandmarks[0];
            const indexTip = landmarks[8]; // Index finger tip
            const thumbTip = landmarks[4];

            // Normalize coordinate
            let rawX = indexTip.x;
            if (settings.cameraMirrored) {
              rawX = 1 - rawX;
            }
            const rawY = indexTip.y;

            // Exponential smoothing (low-pass filter) to keep pointer smooth
            let smoothX = rawX;
            let smoothY = rawY;
            if (prevPointRef.current) {
              const alpha = 0.35; // responsiveness vs smoothness
              smoothX = prevPointRef.current.x * (1 - alpha) + rawX * alpha;
              smoothY = prevPointRef.current.y * (1 - alpha) + rawY * alpha;
            }
            prevPointRef.current = { x: smoothX, y: smoothY };

            // Check pinch (distance between thumb and index)
            const dx = indexTip.x - thumbTip.x;
            const dy = indexTip.y - thumbTip.y;
            const pinchDist = Math.sqrt(dx * dx + dy * dy);
            const isPinching = pinchDist < 0.08;

            const screenX = smoothX * window.innerWidth;
            const screenY = smoothY * window.innerHeight;

            onHandMoveRef.current({
              x: smoothX,
              y: smoothY,
              screenX,
              screenY,
              isPointing: true,
              isPinching,
              confidence: 0.9,
            });
          } else {
            setHandDetected(false);
            prevPointRef.current = null;
            onHandMoveRef.current(null);
          }
        });

        handsInstanceRef.current = hands;

        // 3. Acquire Camera Video Stream natively with graceful timeout & constraints fallback
        let stream: MediaStream | null = null;
        try {
          // Attempt getUserMedia with standard video constraints
          const mediaPromise = navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 320 },
              height: { ideal: 240 },
              facingMode: 'user',
            },
            audio: false,
          });

          // Timeout promise to prevent hanging if browser delays permissions prompt
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('UserMedia timeout')), 7000);
          });

          stream = await Promise.race([mediaPromise, timeoutPromise]);
        } catch {
          // Fallback to minimal constraint if ideal constraints fail or timeout
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: false,
            });
          } catch (fallbackErr) {
            console.warn('Camera access unavailable, falling back to mouse/touch mode:', fallbackErr);
            if (isMounted) setCameraState('denied');
            return;
          }
        }

        if (!isMounted || !stream) {
          if (stream) {
            stream.getTracks().forEach((t) => t.stop());
          }
          return;
        }

        mediaStreamRef.current = stream;

        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.setAttribute('playsinline', 'true');
          video.setAttribute('muted', 'true');
          try {
            await video.play();
          } catch {
            // Autoplay policies might catch this, safe to ignore
          }

          if (isMounted) {
            setCameraState('active');
          }

          // 4. Smooth continuous frame processing loop
          const onFrame = async () => {
            if (!isMounted) return;
            const currentVideo = videoRef.current;
            const currentHands = handsInstanceRef.current;

            if (
              currentVideo &&
              currentHands &&
              currentVideo.readyState >= 2 &&
              !isProcessing &&
              !currentVideo.paused
            ) {
              isProcessing = true;
              try {
                await currentHands.send({ image: currentVideo });
              } catch {
                // Drop frame safely if busy
              } finally {
                isProcessing = false;
              }
            }
            if (isMounted) {
              animFrameIdRef.current = requestAnimationFrame(onFrame);
            }
          };

          animFrameIdRef.current = requestAnimationFrame(onFrame);
        }
      } catch (err) {
        console.warn('Camera initialization completed with fallback:', err);
        if (isMounted) {
          setCameraState('denied');
        }
      }
    }

    initCameraAndHands();

    return () => {
      isMounted = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      if (handsInstanceRef.current) {
        try {
          handsInstanceRef.current.close();
        } catch {
          // ignore
        }
        handsInstanceRef.current = null;
      }
    };
  }, [settings.cameraMirrored, settings.showCameraFeed, retryCount]);

  return (
    <div
      id="hand-tracking-widget"
      className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${
        !settings.showCameraFeed && 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-amber-300 p-2 overflow-hidden flex flex-col items-center">
        {/* Header bar of camera widget */}
        <div className="w-full flex items-center justify-between px-2 py-1 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                handDetected
                  ? 'bg-emerald-500 ring-2 ring-emerald-300 animate-pulse'
                  : cameraState === 'active'
                  ? 'bg-amber-400'
                  : 'bg-rose-500'
              }`}
            />
            <span>
              {handDetected
                ? 'ตรวจพบมือแล้ว! ✨'
                : cameraState === 'active'
                ? 'ชูนิ้วชี้ขึ้นมาเลย ☝️'
                : 'โหมดสัมผัส/เมาส์'}
            </span>
          </div>
          <button
            id="btn-toggle-cam-minimize"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
            title="ย่อ/ขยายกล้อง"
          >
            {isMinimized ? '➕' : '➖'}
          </button>
        </div>

        {/* Video & Canvas */}
        {!isMinimized && (
          <div className="relative w-44 h-32 bg-slate-900 rounded-xl overflow-hidden mt-1 border border-slate-200">
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-px h-px opacity-0 pointer-events-none"
              autoPlay
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              width={240}
              height={180}
              className="w-full h-full object-cover"
            />

            {cameraState === 'starting' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 text-white text-xs gap-1.5 p-2 text-center">
                <RefreshCw className="w-5 h-5 animate-spin text-amber-400" />
                <span className="font-bold">กำลังเชื่อมต่อกล้อง...</span>
                <span className="text-[10px] text-slate-300">หรือแตะจอ/ใช้เมาส์เล่นได้เลย</span>
              </div>
            )}

            {cameraState === 'denied' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-50 text-amber-900 p-2 text-center text-xs gap-1">
                <Hand className="w-5 h-5 text-amber-500 animate-bounce" />
                <span className="font-bold text-[11px]">ใช้เมาส์หรือแตะจอได้ทันที</span>
                <span className="text-[10px] text-slate-500">ขยับเมาส์ค้างเพื่อจำลองนิ้วมือ</span>
                <button
                  id="btn-retry-camera"
                  onClick={handleRetryCamera}
                  className="mt-1 flex items-center gap-1 text-[10px] bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold px-2 py-0.5 rounded-md transition-all cursor-pointer"
                >
                  <Video className="w-3 h-3" />
                  <span>ลองเปิดกล้องใหม่</span>
                </button>
              </div>
            )}

            {cameraState === 'unsupported' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-700 p-2 text-center text-xs gap-1">
                <CameraOff className="w-5 h-5 text-slate-400" />
                <span className="font-bold text-[11px]">ไม่พบอุปกรณ์กล้อง</span>
                <span className="text-[10px] text-slate-500">แตะหน้าจอหรือคลิกเพื่อเล่น</span>
              </div>
            )}
          </div>
        )}

        <div className="w-full px-1 pt-1.5 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-amber-500" />
            ค้าง {settings.dwellTimeSeconds} วิ
          </span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">
            Hand Track
          </span>
        </div>
      </div>
    </div>
  );
};
