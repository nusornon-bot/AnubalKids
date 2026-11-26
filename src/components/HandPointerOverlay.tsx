import React from 'react';
import { HandPoint } from '../types';

interface HandPointerOverlayProps {
  point: HandPoint | null;
  dwellProgress: number; // 0 to 1
  isHoveringTarget: boolean;
  scale?: number;
}

export const HandPointerOverlay: React.FC<HandPointerOverlayProps> = ({
  point,
  dwellProgress,
  isHoveringTarget,
  scale = 1.0,
}) => {
  if (!point) return null;

  const radius = 28 * scale;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - dwellProgress * circumference;

  return (
    <div
      id="hand-pointer-overlay"
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${point.screenX}px`,
        top: `${point.screenY}px`,
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Dwell Circular Progress Ring in Vibrant Pink/Gold */}
        <svg
          className="transform -rotate-90"
          width={(radius + 10) * 2}
          height={(radius + 10) * 2}
        >
          {/* Background circle track */}
          <circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            fill="transparent"
            stroke="rgba(244, 114, 182, 0.25)"
            strokeWidth="5"
          />
          {/* Dwell fill bar */}
          <circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            fill={isHoveringTarget ? 'rgba(244, 114, 182, 0.15)' : 'transparent'}
            stroke={dwellProgress > 0.85 ? '#10B981' : '#DB2777'}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-75"
          />
        </svg>

        {/* Center glowing indicator matching Vibrant theme */}
        <div
          className={`absolute flex items-center justify-center rounded-full transition-all duration-150 border-4 border-pink-400 bg-pink-100/60 shadow-lg ${
            isHoveringTarget
              ? 'w-13 h-13 scale-110 ring-4 ring-pink-300 shadow-pink-500/40 animate-pulse'
              : 'w-11 h-11'
          }`}
        >
          <div className="w-8 h-8 rounded-full border-t-4 border-pink-600 rotate-[45deg] absolute" />
          <div className="text-3xl select-none absolute -bottom-7 -right-3 transform rotate-[-10deg] drop-shadow-md">
            {dwellProgress >= 1 ? '✨' : '☝️'}
          </div>
        </div>

        {/* Floating Dwell time badge */}
        {isHoveringTarget && dwellProgress > 0 && (
          <div className="absolute -bottom-10 bg-pink-600 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-lg whitespace-nowrap border-2 border-white animate-bounce">
            {Math.round(dwellProgress * 100)}%
          </div>
        )}
      </div>
    </div>
  );
};
