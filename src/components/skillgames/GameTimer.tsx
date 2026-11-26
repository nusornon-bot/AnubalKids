import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Clock, Pause, Play, RotateCcw } from 'lucide-react';

export interface GameTimerHandle {
  seconds: number;
  formattedTime: string;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}

interface GameTimerProps {
  isRunning: boolean;
  onTick?: (seconds: number) => void;
  onReset?: () => void;
  onComplete?: () => void;
  direction?: 'up' | 'down';
  initialSeconds?: number;
  className?: string;
  showControls?: boolean;
}

export const GameTimer: React.FC<GameTimerProps> = ({
  isRunning,
  onTick,
  onReset,
  onComplete,
  direction = 'up',
  initialSeconds = 0,
  className = '',
  showControls = false,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);

  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const secondsRef = useRef(initialSeconds);

  useEffect(() => {
    secondsRef.current = initialSeconds;
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const timer = setInterval(() => {
      if (direction === 'down') {
        const next = Math.max(0, secondsRef.current - 1);
        secondsRef.current = next;
        setSeconds(next);

        if (onTickRef.current) {
          onTickRef.current(next);
        }

        if (next === 0) {
          clearInterval(timer);
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }
      } else {
        const next = secondsRef.current + 1;
        secondsRef.current = next;
        setSeconds(next);

        if (onTickRef.current) {
          onTickRef.current(next);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isPaused, direction]);

  const handleReset = useCallback(() => {
    secondsRef.current = initialSeconds;
    setSeconds(initialSeconds);
    setIsPaused(false);
    if (onReset) onReset();
  }, [initialSeconds, onReset]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-sky-50 border border-sky-200 text-sky-900 px-3 py-1.5 rounded-xl font-black text-xs shadow-2xs ${className}`}
      title="เวลานับเดินหน้าในการเล่นด่านนี้"
    >
      <Clock className={`w-3.5 h-3.5 text-sky-600 ${isRunning && !isPaused ? 'animate-pulse' : ''}`} />
      <span className="font-mono text-xs sm:text-sm tracking-wide text-sky-700 font-bold">
        {formatTime(seconds)}
      </span>

      {showControls && (
        <div className="flex items-center gap-1 ml-1 border-l border-sky-200 pl-1.5">
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="p-1 hover:bg-sky-200/60 rounded text-sky-700 transition-colors cursor-pointer"
            title={isPaused ? 'เริ่มจับเวลาต่อ' : 'พักเวลาชั่วคราว'}
          >
            {isPaused ? <Play className="w-3 h-3 fill-sky-600 text-sky-600" /> : <Pause className="w-3 h-3 fill-sky-600 text-sky-600" />}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-1 hover:bg-sky-200/60 rounded text-sky-700 transition-colors cursor-pointer"
            title="รีเซ็ตเวลาเป็น 00:00"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export function formatSecondsToMinutes(totalSec: number): string {
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  if (mins === 0) {
    return `${secs} วินาที`;
  }
  return `${mins} นาที ${secs > 0 ? `${secs} วินาที` : ''}`;
}
