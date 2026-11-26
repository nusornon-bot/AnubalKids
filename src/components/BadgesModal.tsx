import React, { useState } from 'react';
import { X, Trophy, Lock, Sparkles, CheckCircle2, Compass, LayoutGrid, Eye, HelpCircle } from 'lucide-react';
import { INITIAL_BADGES } from '../services/storageService';
import { Badge, ChildProfile, Language, Subject } from '../types';
import { LearningJourneyMap } from './LearningJourneyMap';
import { soundEffects } from '../services/audioService';

interface BadgesModalProps {
  profile: ChildProfile;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  soundVolume?: number;
  onPlaySubject?: (subject: Subject) => void;
  onOpenCertificate?: (milestoneId?: string) => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  profile,
  isOpen,
  onClose,
  language,
  soundVolume = 0.8,
  onPlaySubject,
  onOpenCertificate,
}) => {
  // Default to the 'journey_map' view moving away from just a list view
  const [viewMode, setViewMode] = useState<'journey_map' | 'badges_grid'>('journey_map');
  const [selectedGridFilter, setSelectedGridFilter] = useState<'all' | 'unlocked' | 'locked' | 'secret'>('all');

  if (!isOpen) return null;

  const unlockedCount = profile.badges.length;

  return (
    <div
      id="badges-modal-backdrop"
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundEffects.playTap(soundVolume);
          onClose();
        }
      }}
    >
      <div className="bg-slate-900 rounded-3xl shadow-2xl max-w-4xl lg:max-w-5xl w-full border-4 border-amber-400 overflow-hidden max-h-[94vh] flex flex-col animate-in zoom-in-95">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 p-3 sm:p-4 flex flex-wrap items-center justify-between text-white shadow-md gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl animate-bounce">🏆</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black font-display tracking-tight text-white drop-shadow-xs">
                  หอเกียรติยศ & แผนที่การผจญภัยการเรียนรู้
                </h2>
                <span className="text-[10px] font-black bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-300/40">
                  {unlockedCount} / {INITIAL_BADGES.length} เหรียญ
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                สำรวจเส้นทางการเรียนรู้ 8 ทักษะหลัก ค้นพบสมบัติและเหรียญรางวัลลับ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Segmented Controls */}
            <div className="bg-black/30 p-1 rounded-xl flex items-center gap-1 border border-white/20">
              <button
                type="button"
                id="btn-view-journey-map"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setViewMode('journey_map');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  viewMode === 'journey_map'
                    ? 'bg-white text-slate-950 shadow-md scale-102'
                    : 'text-amber-100 hover:text-white hover:bg-white/10'
                }`}
                title="มุมมองแผนที่การผจญภัย (Journey Map View)"
              >
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                <span>แผนที่ผจญภัย</span>
              </button>

              <button
                type="button"
                id="btn-view-badges-grid"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setViewMode('badges_grid');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  viewMode === 'badges_grid'
                    ? 'bg-white text-slate-950 shadow-md scale-102'
                    : 'text-amber-100 hover:text-white hover:bg-white/10'
                }`}
                title="มุมมองตารางเหรียญรางวัล (Badges Grid View)"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
                <span>ตารางเหรียญ</span>
              </button>
            </div>

            <button
              id="btn-close-badges-modal"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                onClose();
              }}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-hidden flex flex-col bg-slate-900">
          {viewMode === 'journey_map' ? (
            /* VIEW 1: The Learning Journey Map Visualization */
            <div className="flex-1 overflow-hidden h-full">
              <LearningJourneyMap
                profile={profile}
                language={language}
                soundVolume={soundVolume}
                onPlaySubject={(subj) => {
                  onClose();
                  if (onPlaySubject) onPlaySubject(subj);
                }}
                onOpenCertificate={onOpenCertificate}
              />
            </div>
          ) : (
            /* VIEW 2: The Badges Grid with Filter Tabs */
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950 space-y-4">
              {/* Filter Pills */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-bold">ตัวกรอง:</span>
                  {(['all', 'unlocked', 'locked', 'secret'] as const).map((filterKey) => (
                    <button
                      key={filterKey}
                      type="button"
                      onClick={() => {
                        soundEffects.playTap(soundVolume);
                        setSelectedGridFilter(filterKey);
                      }}
                      className={`px-3 py-1 rounded-xl font-black text-xs transition-all cursor-pointer ${
                        selectedGridFilter === filterKey
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {filterKey === 'all'
                        ? 'ทั้งหมด'
                        : filterKey === 'unlocked'
                        ? `ปลดล็อกแล้ว (${unlockedCount})`
                        : filterKey === 'locked'
                        ? `รอปลดล็อก (${INITIAL_BADGES.length - unlockedCount})`
                        : 'เหรียญลับ 🗝️'}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    setViewMode('journey_map');
                  }}
                  className="text-xs font-black text-amber-400 hover:text-amber-300 flex items-center gap-1 underline cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>สลับไปดูแผนที่การผจญภัย (Journey Map) ➜</span>
                </button>
              </div>

              {/* Badges Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {INITIAL_BADGES.filter((badge) => {
                  const isUnlocked = profile.badges.includes(badge.id);
                  if (selectedGridFilter === 'unlocked') return isUnlocked;
                  if (selectedGridFilter === 'locked') return !isUnlocked;
                  if (selectedGridFilter === 'secret') {
                    return (
                      badge.id.includes('master') ||
                      badge.id.includes('genius') ||
                      badge.id.includes('superstar') ||
                      badge.id.includes('streak_14') ||
                      badge.id.includes('streak_21') ||
                      badge.id.includes('streak_30') ||
                      badge.id.includes('magic_finger') ||
                      badge.id.includes('combo_10')
                    );
                  }
                  return true;
                }).map((badge: Badge) => {
                  const isUnlocked = profile.badges.includes(badge.id);
                  const isSecretBadge =
                    badge.id.includes('master') ||
                    badge.id.includes('genius') ||
                    badge.id.includes('streak_21') ||
                    badge.id.includes('streak_30') ||
                    badge.id.includes('magic_finger') ||
                    badge.id.includes('combo_10');

                  return (
                    <div
                      key={badge.id}
                      id={`badge-card-${badge.id}`}
                      className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 relative overflow-hidden select-none ${
                        isUnlocked
                          ? 'bg-gradient-to-br from-amber-500/20 via-slate-800 to-slate-900 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                          : isSecretBadge
                          ? 'bg-slate-900 border-purple-800/80 opacity-80 hover:opacity-100'
                          : 'bg-slate-900/60 border-slate-800 opacity-60 hover:opacity-90'
                      }`}
                    >
                      {/* Badge Icon */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                          isUnlocked
                            ? 'bg-gradient-to-tr from-amber-300 to-yellow-200 shadow-sm ring-2 ring-amber-400 animate-pulse text-slate-950'
                            : isSecretBadge
                            ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                            : 'bg-slate-800 text-slate-600 grayscale'
                        }`}
                      >
                        {isUnlocked ? badge.icon : isSecretBadge ? '🗝️' : '🔒'}
                      </div>

                      {/* Badge Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <h4
                            className={`font-black text-sm truncate ${
                              isUnlocked
                                ? 'text-amber-300'
                                : isSecretBadge
                                ? 'text-purple-300'
                                : 'text-slate-300'
                            }`}
                          >
                            {!isUnlocked && isSecretBadge
                              ? '??? รางวัลลับซ่อนอยู่'
                              : badge.title[language] || badge.title.th}
                          </h4>
                          {isUnlocked && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 leading-snug line-clamp-2">
                          {!isUnlocked && isSecretBadge
                            ? 'ฝึกฝนสะสมทักษะตามเป้าหมายของวิชาเพื่อเปิดเผยความลับนี้'
                            : badge.description[language] || badge.description.th}
                        </p>

                        {/* Status badge */}
                        <div className="mt-2 flex items-center justify-between">
                          {isUnlocked ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40">
                              <Sparkles className="w-2.5 h-2.5" /> ปลดล็อกแล้ว!
                            </span>
                          ) : isSecretBadge ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-600/40">
                              <span>🌫️</span>
                              <span>รางวัลลับ</span>
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
                              <Lock className="w-2.5 h-2.5" />
                              <span>ยังไม่ปลดล็อก</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
