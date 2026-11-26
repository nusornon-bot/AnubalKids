import React, { useState } from 'react';
import { Sparkles, Dices, Check, Lock, X, AlertCircle } from 'lucide-react';
import {
  AVATAR_COLOR_OPTIONS,
  AVATAR_ICON_CATEGORIES,
  ALL_AVATAR_ICONS,
  getAvatarColorOption,
  getRandomAvatarPair,
  getAvatarUnlockStatus,
} from '../utils/avatarUtils';
import { soundEffects } from '../services/audioService';

interface AvatarEditorProps {
  selectedEmoji: string;
  selectedColorId: string;
  onChangeEmoji: (emoji: string) => void;
  onChangeColor: (colorId: string) => void;
  previewName?: string;
  showPreview?: boolean;
  className?: string;
  profile?: { totalScore?: number; badges?: string[] } | null;
}

export const AvatarEditor: React.FC<AvatarEditorProps> = ({
  selectedEmoji,
  selectedColorId,
  onChangeEmoji,
  onChangeColor,
  previewName,
  showPreview = true,
  className = '',
  profile = null,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lockNotice, setLockNotice] = useState<{ name: string; reason: string; icon: string } | null>(null);
  const [isLivePreviewVisible, setIsLivePreviewVisible] = useState<boolean>(showPreview);
  const [animKey, setAnimKey] = useState<number>(0);
  const [animType, setAnimType] = useState<'bounce' | 'slide'>('bounce');

  const currentColor = getAvatarColorOption(selectedColorId);
  const currentIconObj = ALL_AVATAR_ICONS.find((i) => i.emoji === selectedEmoji);

  const displayedIcons =
    activeCategory === 'all'
      ? ALL_AVATAR_ICONS
      : AVATAR_ICON_CATEGORIES.find((c) => c.id === activeCategory)?.items || ALL_AVATAR_ICONS;

  const handleRandomize = () => {
    // Only pick from icons that are unlocked for this profile
    const unlockedIcons = ALL_AVATAR_ICONS.filter(
      (i) => getAvatarUnlockStatus(i.emoji, profile).unlocked
    );
    const chosenIcon =
      unlockedIcons.length > 0
        ? unlockedIcons[Math.floor(Math.random() * unlockedIcons.length)]
        : getRandomAvatarPair();
    const randomColor =
      AVATAR_COLOR_OPTIONS[Math.floor(Math.random() * AVATAR_COLOR_OPTIONS.length)];

    setAnimType(Math.random() > 0.5 ? 'bounce' : 'slide');
    setAnimKey(Date.now());
    onChangeEmoji(chosenIcon.emoji);
    onChangeColor(randomColor.id);
  };

  return (
    <div className={`space-y-3.5 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200 ${className}`}>
      {/* Live Avatar Preview Header */}
      {isLivePreviewVisible && (
        <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border-2 border-amber-300 shadow-2xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <div
              id="avatar-editor-preview"
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${currentColor.bgClass} ${currentColor.borderClass} border-2 flex items-center justify-center text-3xl sm:text-4xl shadow-md transition-all duration-300 transform hover:scale-105 select-none shrink-0`}
            >
              <span
                key={`avatar-editor-preview-${selectedEmoji}-${animKey}`}
                className={`inline-block ${animType === 'slide' ? 'animate-avatar-slide' : 'animate-avatar-bounce'}`}
              >
                {selectedEmoji}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>ภาพตัวอย่างอวาตาร์ (Avatar Preview)</span>
              </div>
              <div className="text-sm font-black text-slate-800">
                {previewName ? `${previewName}` : 'โปรไฟล์นักเรียน'}
              </div>
              <div className="text-[11px] font-semibold text-slate-500 mt-0.5 flex items-center gap-1">
                <span>{currentIconObj?.name || 'การ์ตูน'}</span>
                <span>•</span>
                <span className="font-bold text-slate-700">{currentColor.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              id="btn-random-avatar"
              onClick={handleRandomize}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-black rounded-xl shadow-xs hover:shadow transition-all cursor-pointer shrink-0"
              title="สุ่มสีและไอคอนน่ารักๆ อัตโนมัติ"
            >
              <Dices className="w-4 h-4" />
              <span className="hidden sm:inline">สุ่มสไตล์</span>
            </button>
          </div>
        </div>
      )}

      {/* 1. Background Color Picker */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <span>🎨 เลือกสีพื้นหลัง</span>
            <span className="text-[10px] font-normal text-slate-400">({currentColor.name})</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsLivePreviewVisible(!isLivePreviewVisible)}
              className="text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              title="สลับแสดง/ซ่อนภาพตัวอย่างอวาตาร์"
            >
              <span>👁️ {isLivePreviewVisible ? 'ซ่อนตัวอย่าง' : 'ดูตัวอย่าง (Preview)'}</span>
            </button>

            {!isLivePreviewVisible && (
              <button
                type="button"
                id="btn-random-avatar"
                onClick={handleRandomize}
                className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold rounded-lg transition-all cursor-pointer"
                title="สุ่มสีและไอคอนน่ารักๆ อัตโนมัติ"
              >
                <Dices className="w-3.5 h-3.5 text-amber-700" />
                <span>สุ่มสไตล์</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-xl border border-slate-200">
          {AVATAR_COLOR_OPTIONS.map((color) => {
            const isSelected = color.id === currentColor.id;
            return (
              <button
                key={color.id}
                type="button"
                id={`btn-avatar-color-${color.id}`}
                onClick={() => onChangeColor(color.id)}
                title={color.name}
                className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  color.bgClass
                } ${color.borderClass} border-2 ${
                  isSelected
                    ? 'ring-2 ring-amber-500 ring-offset-2 scale-110 shadow-xs'
                    : 'hover:scale-105 hover:opacity-90'
                }`}
              >
                {isSelected && (
                  <Check className="w-4 h-4 text-slate-800 stroke-[3] drop-shadow-xs" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Character / Icon Picker */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1 shrink-0">
            <span>✨ เลือกการ์ตูนประจำตัว</span>
            <span className="text-[10px] font-normal text-slate-400">({displayedIcons.length} แบบ)</span>
          </label>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 max-w-full">
            <button
              type="button"
              id="btn-avatar-cat-all"
              onClick={() => setActiveCategory('all')}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-amber-400 text-amber-950 shadow-2xs font-black ring-1 ring-amber-500'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              ทั้งหมด ({ALL_AVATAR_ICONS.length})
            </button>
            {AVATAR_ICON_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                id={`btn-avatar-cat-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-amber-950 shadow-2xs font-black ring-1 ring-amber-500'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
                title={cat.name}
              >
                <span>{cat.icon}</span>
                <span className="whitespace-nowrap">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lock Notice Banner if clicked locked icon */}
        {lockNotice && (
          <div className="mb-2 p-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 text-xs flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-lg shrink-0">{lockNotice.icon}</span>
              <div className="min-w-0">
                <span className="font-black">{lockNotice.name}</span>
                <span className="text-[11px] text-amber-800 ml-1">🔒 {lockNotice.reason}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLockNotice(null)}
              className="text-amber-800 hover:text-amber-950 p-1 rounded-md shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Icons Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5 p-2 bg-white rounded-xl border border-slate-200 max-h-44 overflow-y-auto">
          {displayedIcons.map(({ emoji, name }, index) => {
            const isSelected = emoji === selectedEmoji;
            const unlockStatus = getAvatarUnlockStatus(emoji, profile);
            const isLocked = !unlockStatus.unlocked;

            return (
              <button
                key={`avatar-icon-${activeCategory}-${emoji}-${index}`}
                type="button"
                id={`btn-avatar-icon-${emoji}-${index}`}
                onClick={() => {
                  if (isLocked) {
                    try {
                      soundEffects.playIncorrect(0.5);
                    } catch {}
                    setLockNotice({
                      name,
                      reason: unlockStatus.reasonTh,
                      icon: emoji,
                    });
                    return;
                  }
                  setLockNotice(null);
                  setAnimType(Math.random() > 0.5 ? 'bounce' : 'slide');
                  setAnimKey(Date.now());
                  onChangeEmoji(emoji);
                }}
                title={isLocked ? `🔒 ${name} (${unlockStatus.reasonTh})` : name}
                className={`relative text-2xl h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? `${currentColor.bgClass} ${currentColor.borderClass} border-2 scale-110 shadow-xs ring-2 ring-amber-400`
                    : isLocked
                    ? 'border-slate-200 bg-slate-100/90 hover:bg-slate-200 opacity-60 hover:opacity-85'
                    : 'border-slate-100 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span className={isLocked ? 'grayscale' : ''}>{emoji}</span>
                {isLocked && (
                  <div className="absolute -top-1 -right-1 bg-slate-800 text-amber-300 p-0.5 rounded-full shadow-2xs">
                    <Lock className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
