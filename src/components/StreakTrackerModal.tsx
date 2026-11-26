import React from 'react';
import { X, Flame, Award, Calendar } from 'lucide-react';
import { ChildProfile, Language } from '../types';
import { StreakTrackerCard } from './StreakTrackerCard';

interface StreakTrackerModalProps {
  profile: ChildProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onStartGame: () => void;
  soundVolume: number;
  onOpenBadges?: () => void;
  language?: Language;
}

export const StreakTrackerModal: React.FC<StreakTrackerModalProps> = ({
  profile,
  isOpen,
  onClose,
  onStartGame,
  soundVolume,
  onOpenBadges,
  language,
}) => {
  if (!isOpen || !profile) return null;

  return (
    <div
      id="streak-tracker-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-start justify-center p-2 sm:p-4 pt-4 sm:pt-8 md:pt-12 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="streak-tracker-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border-4 border-amber-300 overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200 my-auto sm:my-0"
      >
        {/* Modal Top Header Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-3.5 sm:p-4.5 flex items-center justify-between text-white shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl sm:text-3xl shadow-inner shrink-0">
              <span>{profile.avatar}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>{profile.name}</span>
                  <span className="text-xs font-bold bg-white/25 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    {profile.grade === 'K1'
                      ? 'อนุบาล 1'
                      : profile.grade === 'K2'
                      ? 'อนุบาล 2'
                      : profile.grade === 'K3'
                      ? 'อนุบาล 3'
                      : profile.grade}
                  </span>
                </h2>
              </div>
              <p className="text-xs text-amber-100 font-medium flex items-center gap-1 mt-0.5">
                <Flame className="w-3.5 h-3.5 fill-amber-200 text-amber-200 animate-pulse" />
                <span>บันทึกความสม่ำเสมอ & สตรีคการเรียนรู้ 30 วัน</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenBadges && (
              <button
                type="button"
                id="btn-streak-modal-open-badges"
                onClick={() => {
                  onClose();
                  onOpenBadges();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-black transition-all cursor-pointer border border-white/30 shadow-2xs"
                title="ดูเหรียญรางวัลสะสมทั้งหมด"
              >
                <Award className="w-3.5 h-3.5" />
                <span>เหรียญรางวัล</span>
              </button>
            )}

            <button
              type="button"
              id="btn-close-streak-tracker-modal"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Container with Scroll */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 bg-slate-50/70 space-y-3">
          <StreakTrackerCard
            profile={profile}
            onStartGame={() => {
              onClose();
              onStartGame();
            }}
            soundVolume={soundVolume}
            onOpenBadges={onOpenBadges}
            language={language}
          />
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-2 shrink-0">
          <span className="text-[11px] text-slate-500 font-medium">
            💡 แตะที่ช่องวันที่ในปฏิทินเพื่อดูผลคะแนนและทักษะที่ฝึกฝนในวันนั้น
          </span>
          <button
            type="button"
            id="btn-streak-modal-close-footer"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
