import React from 'react';
import { Grade, HandPoint } from '../types';
import { HandTracingActivityView, TracingCategory } from './skillgames/HandTracingActivityView';
import { X, Sparkles, Hand } from 'lucide-react';

interface HandTracingActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade?: Grade;
  soundVolume?: number;
  onEarnStar?: () => void;
  externalHandPoint?: HandPoint | null;
  initialCategory?: TracingCategory;
  initialEnglishCase?: 'uppercase' | 'lowercase';
}

export const HandTracingActivityModal: React.FC<HandTracingActivityModalProps> = ({
  isOpen,
  onClose,
  currentGrade = 'K2',
  soundVolume = 0.8,
  onEarnStar,
  externalHandPoint,
  initialCategory,
  initialEnglishCase,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="hand-tracing-activity-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-5xl bg-white rounded-3xl border-3 border-emerald-300 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-3.5 sm:p-4 text-white flex items-center justify-between gap-3 shrink-0 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
              🖐️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black leading-tight">
                  กิจกรรมลากเส้นตามรอย: กล้องจับมือ Hand Tracking
                </h2>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1 uppercase">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>AI Motion</span>
                </span>
              </div>
              <p className="text-[11px] text-emerald-100 font-medium">
                ฝึกควบคุมกล้ามเนื้อมือผ่านการลากเส้นตามรูปสัตว์น่ารัก รูปทรงเรขาคณิต และตัวอักษร
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="ปิดหน้าต่างกิจกรรม"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: HandTracingActivityView */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 bg-gradient-to-b from-emerald-50/20 to-white">
          <HandTracingActivityView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={onEarnStar}
            externalHandPoint={externalHandPoint}
            onClose={onClose}
            initialCategory={initialCategory}
            initialEnglishCase={initialEnglishCase}
          />
        </div>
      </div>
    </div>
  );
};
