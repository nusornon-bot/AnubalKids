import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SkillGameLevelSelectorProps {
  totalLevels?: number;
  currentIndex?: number;
  // Alternative / legacy props
  levels?: { level: number; name?: string }[];
  currentLevel?: number;
  accentColor?: string;
  onSelectLevel: (indexOrLevel: number) => void;
  prefix?: string; // 'ด่าน' | 'ข้อ' | 'แบบ' | 'ภาพ'
  colorTheme?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'teal' | 'purple' | 'pink' | 'cyan' | 'blue' | 'violet';
  customLabels?: string[]; // optional custom title for each item
  showNavigationArrows?: boolean;
  className?: string;
  badgeSubtitle?: string; // optional extra info like "คะแนน 5/10"
}

export const SkillGameLevelSelector: React.FC<SkillGameLevelSelectorProps> = ({
  totalLevels,
  currentIndex,
  levels,
  currentLevel,
  accentColor,
  onSelectLevel,
  prefix = 'ข้อ',
  colorTheme = 'indigo',
  customLabels,
  showNavigationArrows = true,
  className = '',
  badgeSubtitle,
}) => {
  const isOneBased = currentLevel !== undefined && currentIndex === undefined;
  const effectiveTotal = totalLevels ?? (levels ? levels.length : 0);
  const effectiveIndex = currentIndex ?? (currentLevel !== undefined ? Math.max(0, currentLevel - 1) : 0);
  const effectiveThemeKey = (accentColor as any) || colorTheme;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keep itemRefs length in sync
  itemRefs.current = itemRefs.current.slice(0, effectiveTotal);

  // Auto-scroll active button into center view
  useEffect(() => {
    const activeBtn = itemRefs.current[effectiveIndex];
    if (activeBtn && scrollContainerRef.current) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [effectiveIndex]);

  const handleSelect = (idx: number) => {
    if (isOneBased) {
      onSelectLevel(idx + 1);
    } else {
      onSelectLevel(idx);
    }
  };

  const handlePrev = () => {
    if (effectiveIndex > 0) {
      handleSelect(effectiveIndex - 1);
    }
  };

  const handleNext = () => {
    if (effectiveIndex < effectiveTotal - 1) {
      handleSelect(effectiveIndex + 1);
    }
  };

  // Color mappings
  const themeClasses: Record<string, { active: string; badge: string; ring: string }> = {
    indigo: {
      active: 'bg-indigo-600 text-white border-indigo-700 shadow-sm shadow-indigo-200',
      badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      ring: 'focus:ring-indigo-300',
    },
    emerald: {
      active: 'bg-emerald-600 text-white border-emerald-700 shadow-sm shadow-emerald-200',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      ring: 'focus:ring-emerald-300',
    },
    amber: {
      active: 'bg-amber-500 text-white border-amber-600 shadow-sm shadow-amber-200',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      ring: 'focus:ring-amber-300',
    },
    rose: {
      active: 'bg-rose-500 text-white border-rose-600 shadow-sm shadow-rose-200',
      badge: 'bg-rose-100 text-rose-900 border-rose-300',
      ring: 'focus:ring-rose-300',
    },
    teal: {
      active: 'bg-teal-600 text-white border-teal-700 shadow-sm shadow-teal-200',
      badge: 'bg-teal-100 text-teal-900 border-teal-300',
      ring: 'focus:ring-teal-300',
    },
    purple: {
      active: 'bg-purple-600 text-white border-purple-700 shadow-sm shadow-purple-200',
      badge: 'bg-purple-100 text-purple-900 border-purple-300',
      ring: 'focus:ring-purple-300',
    },
    pink: {
      active: 'bg-pink-500 text-white border-pink-600 shadow-sm shadow-pink-200',
      badge: 'bg-pink-100 text-pink-900 border-pink-300',
      ring: 'focus:ring-pink-300',
    },
    cyan: {
      active: 'bg-cyan-600 text-white border-cyan-700 shadow-sm shadow-cyan-200',
      badge: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      ring: 'focus:ring-cyan-300',
    },
    blue: {
      active: 'bg-blue-600 text-white border-blue-700 shadow-sm shadow-blue-200',
      badge: 'bg-blue-100 text-blue-900 border-blue-300',
      ring: 'focus:ring-blue-300',
    },
    violet: {
      active: 'bg-violet-600 text-white border-violet-700 shadow-sm shadow-violet-200',
      badge: 'bg-violet-100 text-violet-900 border-violet-300',
      ring: 'focus:ring-violet-300',
    },
  };

  const currentTheme = themeClasses[effectiveThemeKey as keyof typeof themeClasses] || themeClasses.indigo;

  if (effectiveTotal <= 1) return null;

  return (
    <div
      className={`w-full flex flex-col sm:flex-row items-center justify-between gap-2 bg-slate-50/90 rounded-2xl p-2 sm:p-2.5 border border-slate-200 ${className}`}
    >
      {/* Indicator & Jump buttons for Mobile/Tablet */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-xl border ${currentTheme.badge} whitespace-nowrap shadow-2xs`}
          >
            {prefix} {effectiveIndex + 1} / {effectiveTotal}
          </span>
          {badgeSubtitle && (
            <span className="text-[11px] font-bold text-slate-500 hidden sm:inline-block">
              {badgeSubtitle}
            </span>
          )}
        </div>

        {/* Prev / Next Jump Buttons (especially convenient on mobile touch screens) */}
        {showNavigationArrows && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              disabled={effectiveIndex <= 0}
              className="p-1 sm:p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-2xs"
              title={`${prefix}ก่อนหน้า`}
              aria-label={`${prefix}ก่อนหน้า`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={effectiveIndex >= effectiveTotal - 1}
              className="p-1 sm:p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-2xs"
              title={`${prefix}ถัดไป`}
              aria-label={`${prefix}ถัดไป`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Scrollable Level Chips */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-1.5 overflow-x-auto w-full max-w-full pb-1 pt-0.5 px-0.5 no-scrollbar touch-pan-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {Array.from({ length: effectiveTotal }).map((_, idx) => {
          const isCurrent = idx === effectiveIndex;
          const label = customLabels && customLabels[idx] ? customLabels[idx] : `${idx + 1}`;

          return (
            <button
              key={idx}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`flex-shrink-0 min-w-[34px] sm:min-w-[38px] h-[32px] sm:h-[36px] px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center border ${
                isCurrent
                  ? `${currentTheme.active} scale-105 z-10`
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 active:scale-95'
              }`}
              title={`${prefix}ที่ ${idx + 1}${customLabels && customLabels[idx] ? `: ${customLabels[idx]}` : ''}`}
              aria-label={`${prefix}ที่ ${idx + 1}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
