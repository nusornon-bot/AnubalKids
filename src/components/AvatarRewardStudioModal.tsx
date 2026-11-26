import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  ShoppingBag,
  Palette,
  Check,
  Star,
  Zap,
  Lock,
  ChevronRight,
  Smile,
} from 'lucide-react';
import { soundEffects, speakText } from '../services/audioService';
import confetti from 'canvas-confetti';

export interface PenEffect {
  id: string;
  name: string;
  description: string;
  colors: string[];
  particleType: 'stars' | 'rainbow' | 'glow' | 'nature' | 'bubbles';
  cost: number;
  previewClass: string;
}

export const PEN_EFFECTS: PenEffect[] = [
  {
    id: 'rainbow_glow',
    name: '🌈 หมึกสายรุ้งนีออน',
    description: 'เส้นลากเรืองแสงเปลี่ยนสี 7 สีตามจังหวะนิ้วมือ',
    colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
    particleType: 'rainbow',
    cost: 0,
    previewClass: 'from-rose-500 via-amber-400 to-blue-500',
  },
  {
    id: 'golden_stardust',
    name: '✨ ละอองดาวประกายทอง',
    description: 'ทิ้งประกายดาวระยิบระยับเวลาลากเส้นกลางอากาศ',
    colors: ['#fbbf24', '#f59e0b', '#fef08a'],
    particleType: 'stars',
    cost: 15,
    previewClass: 'from-amber-300 via-yellow-400 to-amber-500',
  },
  {
    id: 'cosmic_galaxy',
    name: '🌌 ทางช้างเผือกอวกาศ',
    description: 'หมึกสีม่วงครามกาแล็กซีพร้อมแสงนีออนละมุนตา',
    colors: ['#8b5cf6', '#6366f1', '#ec4899'],
    particleType: 'glow',
    cost: 25,
    previewClass: 'from-purple-500 via-indigo-500 to-pink-500',
  },
  {
    id: 'forest_nature',
    name: '🍃 ธรรมชาติใบไม้วิเศษ',
    description: 'เส้นสีเขียวมรกตสดชื่น เหมาะกับการคัดคำธรรมชาติ',
    colors: ['#10b981', '#059669', '#34d399'],
    particleType: 'nature',
    cost: 20,
    previewClass: 'from-emerald-400 via-green-500 to-teal-500',
  },
];

interface AvatarItem {
  id: string;
  name: string;
  icon: string;
  category: 'hat' | 'outfit' | 'badge';
  cost: number;
}

const AVATAR_ITEMS: AvatarItem[] = [
  { id: 'hat_astro', name: 'หมวกนักบินอวกาศ', icon: '👨‍🚀', category: 'hat', cost: 0 },
  { id: 'hat_grad', name: 'หมวกบัณฑิตน้อย', icon: '🎓', category: 'hat', cost: 10 },
  { id: 'hat_crown', name: 'มงกุฎยอดนักสะกด', icon: '👑', category: 'hat', cost: 20 },
  { id: 'hat_wizard', name: 'หมวกพ่อมดเวทมนตร์', icon: '🧙', category: 'hat', cost: 30 },
  { id: 'suit_detective', name: 'ชุดยอดนักสืบ', icon: '🕵️', category: 'outfit', cost: 15 },
  { id: 'suit_superhero', name: 'ชุดซูเปอร์ฮีโร่', icon: '🦸', category: 'outfit', cost: 25 },
  { id: 'badge_star', name: 'เข็มกลัดดาวประกาย', icon: '⭐', category: 'badge', cost: 5 },
  { id: 'badge_medal', name: 'เหรียญทองเกียรติยศ', icon: '🥇', category: 'badge', cost: 15 },
];

interface AvatarRewardStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStars?: number;
  onDeductStars?: (amount: number) => void;
}

export const AvatarRewardStudioModal: React.FC<AvatarRewardStudioModalProps> = ({
  isOpen,
  onClose,
  userStars = 120,
  onDeductStars,
}) => {
  const [activeTab, setActiveTab] = useState<'pen' | 'avatar'>('pen');
  const [currentPen, setCurrentPen] = useState<string>(() => {
    return localStorage.getItem('air_writing_pen_effect') || 'rainbow_glow';
  });
  const [equippedHat, setEquippedHat] = useState<string>(() => {
    return localStorage.getItem('avatar_equipped_hat') || 'hat_astro';
  });
  const [unlockedItems, setUnlockedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('avatar_unlocked_items');
      return saved ? JSON.parse(saved) : ['rainbow_glow', 'hat_astro'];
    } catch {
      return ['rainbow_glow', 'hat_astro'];
    }
  });

  if (!isOpen) return null;

  const handleSelectPen = (pen: PenEffect) => {
    if (unlockedItems.includes(pen.id)) {
      setCurrentPen(pen.id);
      localStorage.setItem('air_writing_pen_effect', pen.id);
      soundEffects.play('pop');
      speakText(`เลือกใช้ ${pen.name} เรียบร้อยแล้วครับ`);
    } else {
      if (userStars >= pen.cost) {
        if (onDeductStars) onDeductStars(pen.cost);
        const newUnlocked = [...unlockedItems, pen.id];
        setUnlockedItems(newUnlocked);
        localStorage.setItem('avatar_unlocked_items', JSON.stringify(newUnlocked));
        setCurrentPen(pen.id);
        localStorage.setItem('air_writing_pen_effect', pen.id);
        soundEffects.play('success');
        confetti({ particleCount: 40, spread: 60 });
        speakText(`ปลดล็อก ${pen.name} สำเร็จ!`);
      } else {
        soundEffects.play('incorrect');
        speakText('ดาวยังไม่พอครับ สะสมดาวจากการฝึกสะกดคำเพิ่มนะครับ');
      }
    }
  };

  const handleSelectAvatarItem = (item: AvatarItem) => {
    if (unlockedItems.includes(item.id)) {
      setEquippedHat(item.id);
      localStorage.setItem('avatar_equipped_hat', item.id);
      soundEffects.play('pop');
    } else {
      if (userStars >= item.cost) {
        if (onDeductStars) onDeductStars(item.cost);
        const newUnlocked = [...unlockedItems, item.id];
        setUnlockedItems(newUnlocked);
        localStorage.setItem('avatar_unlocked_items', JSON.stringify(newUnlocked));
        setEquippedHat(item.id);
        localStorage.setItem('avatar_equipped_hat', item.id);
        soundEffects.play('success');
        confetti({ particleCount: 40, spread: 60 });
      } else {
        soundEffects.play('incorrect');
      }
    }
  };

  const currentHatObj = AVATAR_ITEMS.find((i) => i.id === equippedHat);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl bg-white rounded-3xl border-3 border-amber-300 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 p-4 sm:p-5 text-white flex items-center justify-between gap-3 shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
              🌟
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black">
                  ร้านค้าดาว & ห้องแต่งตัว Avatar (Reward Studio)
                </h2>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-200" />
                  <span>Gamification</span>
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                นำดาวจากการฝึกสะกดคำและคัดลายมือ มาปลดล็อกปากกา Air-Writing นีออน และตกแต่งตัวละคร
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/30 text-amber-200 font-black text-sm">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>{userStars} ดาว</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-4 pt-3 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('pen')}
            className={`px-5 py-2.5 rounded-t-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'pen'
                ? 'bg-white text-indigo-700 border-t-2 border-x-2 border-indigo-400 shadow-xs'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>เอฟเฟกต์ปากกา Air-Writing</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('avatar')}
            className={`px-5 py-2.5 rounded-t-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'avatar'
                ? 'bg-white text-indigo-700 border-t-2 border-x-2 border-indigo-400 shadow-xs'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>แต่งตัวมาสคอต (Avatar)</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'pen' ? (
            <div className="space-y-4">
              <div className="text-xs text-gray-500 font-medium">
                เลือกเอฟเฟกต์หมึกที่จะปรากฏบนหน้าจอขณะใช้นิ้วมือเขียนแจกลูกสะกดคำกลางอากาศ (Air-Writing)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PEN_EFFECTS.map((pen) => {
                  const isUnlocked = unlockedItems.includes(pen.id);
                  const isCurrent = currentPen === pen.id;

                  return (
                    <div
                      key={pen.id}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'border-indigo-500 bg-indigo-50/50 shadow-md ring-2 ring-indigo-300'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div>
                        {/* Gradient preview line */}
                        <div
                          className={`w-full h-3 rounded-full bg-gradient-to-r ${pen.previewClass} mb-3 shadow-inner`}
                        />
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black text-gray-800">{pen.name}</h4>
                          {isCurrent && (
                            <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>กำลังใช้งาน</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{pen.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-600">
                          {isUnlocked ? 'ปลดล็อกแล้ว' : `ราคา ${pen.cost} ⭐`}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleSelectPen(pen)}
                          className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-gray-100 text-gray-500 cursor-default'
                              : isUnlocked
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                              : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                          }`}
                        >
                          {isCurrent ? 'ใช้งานอยู่' : isUnlocked ? 'เลือกใช้' : 'ปลดล็อก'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Avatar Live Preview */}
              <div className="flex items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl border border-amber-200 shadow-inner">
                <div className="relative flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-200 border-4 border-white shadow-xl flex items-center justify-center text-6xl relative">
                    <span>{currentHatObj?.icon || '🧒'}</span>
                  </div>
                  <div className="mt-3 bg-white px-4 py-1 rounded-full border border-amber-200 text-xs font-black text-amber-900 shadow-xs">
                    มาสคอตประจำตัวผู้เรียน
                  </div>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {AVATAR_ITEMS.map((item) => {
                  const isUnlocked = unlockedItems.includes(item.id);
                  const isEquipped = equippedHat === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectAvatarItem(item)}
                      className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                        isEquipped
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <span className="text-4xl my-1">{item.icon}</span>
                      <div className="text-xs font-bold text-gray-800">{item.name}</div>
                      <div className="text-[11px] text-gray-500 mt-1">
                        {isUnlocked ? (
                          <span className="text-emerald-600 font-bold">มีแล้ว</span>
                        ) : (
                          <span className="text-amber-600 font-bold">{item.cost} ⭐</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600 shrink-0">
          <span>ฝึกฝนทุกวันเพื่อรับเหรียญและดาวสะสมเพิ่มขึ้น!</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl cursor-pointer"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
