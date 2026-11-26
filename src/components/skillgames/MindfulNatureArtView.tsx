import React, { useState, useEffect } from 'react';
import { Grade } from '../../types';
import { soundEffects, speakText } from '../../services/audioService';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Volume2,
  Wind,
  Sun,
  CloudRain,
  Moon,
  Flower2,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

interface MindfulNatureArtViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

interface NatureScene {
  id: string;
  name: string;
  emoji: string;
  bgGradient: string;
  ambientSoundDesc: string;
  voiceGuide: string;
  interactiveElements: { id: number; emoji: string; name: string; x: number; y: number }[];
  affirmation: string;
}

const NATURE_SCENES: NatureScene[] = [
  {
    id: 'flower-garden',
    name: 'สวนดอกไม้และผีเสื้อแสนสุข',
    emoji: '🌸',
    bgGradient: 'from-pink-100 via-rose-50 to-emerald-100',
    ambientSoundDesc: 'เสียงลมอ่อนพัดผ่านยอดหญ้าและเสียงกระดิ่งลมแผ่วเบา',
    voiceGuide: 'ยินดีต้อนรับสู่สวนดอกไม้แสนสงบ แตะที่เหล่าผีเสื้อและดอกไม้เพื่อส่งความสุขและฟังเสียงกังวานใสนะจ๊ะ',
    interactiveElements: [
      { id: 1, emoji: '🦋', name: 'ผีเสื้อสีฟ้า', x: 20, y: 30 },
      { id: 2, emoji: '🌸', name: 'ซากุระ', x: 75, y: 25 },
      { id: 3, emoji: '🌷', name: 'ทิวลิป', x: 30, y: 70 },
      { id: 4, emoji: '🦋', name: 'ผีเสื้อสีทอง', x: 65, y: 65 },
      { id: 5, emoji: '🌼', name: 'เดซี่', x: 50, y: 45 },
    ],
    affirmation: 'จิตใจของฉันสดชื่น เบิกบานเหมือนดอกไม้รับแสงแดดยามเช้า',
  },
  {
    id: 'ocean-breeze',
    name: 'หาดทรายขาวและเกลียวคลื่น',
    emoji: '🌊',
    bgGradient: 'from-cyan-100 via-sky-50 to-amber-100',
    ambientSoundDesc: 'เสียงคลื่นทะเลซัดสาดซ่าเบาๆ คลายกังวล',
    voiceGuide: 'ฟังเสียงคลื่นทะเลซัดสาดซู่ซ่า แตะเก็บเปลือกหอยและปลาดาว ให้คลื่นพัดพาความเหนื่อยล้าออกไปนะจ๊ะ',
    interactiveElements: [
      { id: 1, emoji: '🐚', name: 'เปลือกหอยมุก', x: 25, y: 35 },
      { id: 2, emoji: '⭐', name: 'ปลาดาวสีส้ม', x: 70, y: 30 },
      { id: 3, emoji: '🐬', name: 'โลมาแสนรู้', x: 45, y: 60 },
      { id: 4, emoji: '🦀', name: 'ปูเฉวน้อย', x: 20, y: 75 },
      { id: 5, emoji: '🐚', name: 'หอยเกลียว', x: 80, y: 70 },
    ],
    affirmation: 'ฉันสงบนิ่งและมีพลังดั่งท้องทะเลกว้างใหญ่',
  },
  {
    id: 'night-sky',
    name: 'ฟากฟ้าราตรีและแสงดาวระยิบระยับ',
    emoji: '🌌',
    bgGradient: 'from-indigo-900 via-purple-900 to-slate-900 text-white',
    ambientSoundDesc: 'เสียงจิ้งหรีดเรไรร้องกล่อมใต้แสงจันทร์นวล',
    voiceGuide: 'เงยหน้ามองท้องฟ้ายามค่ำคืน แตะดวงดาวเพื่อจุดแสงสว่างและส่งคำอธิษฐานแสนดีงามในใจ',
    interactiveElements: [
      { id: 1, emoji: '⭐', name: 'ดาวประกายพรึก', x: 30, y: 25 },
      { id: 2, emoji: '🌙', name: 'พระจันทร์เสี้ยว', x: 75, y: 20 },
      { id: 3, emoji: '✨', name: 'ประกายดาว', x: 50, y: 50 },
      { id: 4, emoji: '🦉', name: 'นกฮูกใจดี', x: 20, y: 65 },
      { id: 5, emoji: '🌟', name: 'ดาวตกแห่งความหวัง', x: 70, y: 70 },
    ],
    affirmation: 'ฉันรู้สึกปลอดภัย อบอุ่นใจ และพร้อมพักผ่อนอย่างมีความสุข',
  },
];

export const MindfulNatureArtView: React.FC<MindfulNatureArtViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const activeScene = NATURE_SCENES[selectedSceneIndex];

  // Track tapped peaceful elements in this scene
  const [tappedElements, setTappedElements] = useState<number[]>([]);
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('in');
  const [selectedHeartColor, setSelectedHeartColor] = useState<string>('pink');

  useEffect(() => {
    setTappedElements([]);
    if (soundVolume > 0) {
      speakText(`${activeScene.name}. ${activeScene.voiceGuide}`, 'th', soundVolume);
    }
  }, [activeScene, soundVolume]);

  // Breathing pacer cycle (4s in, 2s hold, 4s out)
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathPhase((prev) => (prev === 'in' ? 'hold' : prev === 'hold' ? 'out' : 'in'));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleTapElement = (id: number) => {
    soundEffects.playTap(soundVolume);

    if (!tappedElements.includes(id)) {
      const updated = [...tappedElements, id];
      setTappedElements(updated);

      if (updated.length === activeScene.interactiveElements.length) {
        soundEffects.playVictory(soundVolume);
        if (onEarnStar) onEarnStar();
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        speakText(
          `ยอดเยี่ยมมากเลยจ้า! เก็บรวบรวมประกายแสงธรรมชาติครบแล้ว! ${activeScene.affirmation}`,
          'th',
          soundVolume
        );
      }
    }
  };

  const handleSelectHeartColor = (colorName: string, label: string) => {
    soundEffects.playTap(soundVolume);
    setSelectedHeartColor(colorName);
    speakText(`หัวใจของฉันเลือกสี${label} รู้สึกดีจังเลย`, 'th', soundVolume);
  };

  const isSceneComplete = tappedElements.length === activeScene.interactiveElements.length;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
      {/* Nature Scenes Switcher Tabs */}
      <div className="w-full flex items-center justify-center gap-2 flex-wrap">
        {NATURE_SCENES.map((scene, idx) => {
          const isSelected = selectedSceneIndex === idx;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setSelectedSceneIndex(idx);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer shadow-2xs ${
                isSelected
                  ? 'bg-rose-500 text-white ring-3 ring-rose-200 scale-102'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200'
              }`}
            >
              <span>{scene.emoji}</span>
              <span>{scene.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Peaceful Art Container */}
      <div
        className={`w-full rounded-3xl p-5 sm:p-7 border-2 border-rose-200 shadow-md flex flex-col items-center gap-5 transition-all bg-gradient-to-b ${activeScene.bgGradient}`}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-black/10 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{activeScene.emoji}</span>
            <div>
              <h2 className="text-base sm:text-lg font-black leading-tight">
                {activeScene.name}
              </h2>
              <div className="text-xs opacity-80 font-medium">
                {activeScene.ambientSoundDesc}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => speakText(activeScene.voiceGuide, 'th', soundVolume)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-800 text-xs font-bold border border-black/10 cursor-pointer shadow-2xs"
            title="ฟังเสียงบรรยาย"
          >
            <Volume2 className="w-4 h-4" />
            <span>ฟังเสียงชวนสมาธิ</span>
          </button>
        </div>

        {/* Breathing Circle Pacer */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex items-center justify-center">
            <div
              className={`rounded-full flex items-center justify-center transition-all duration-1000 shadow-lg ${
                breathPhase === 'in'
                  ? 'w-24 h-24 sm:w-28 sm:h-28 bg-rose-400/90 scale-110'
                  : breathPhase === 'hold'
                  ? 'w-24 h-24 sm:w-28 sm:h-28 bg-amber-400/90 scale-110 animate-pulse'
                  : 'w-20 h-20 sm:w-22 sm:h-22 bg-teal-400/90 scale-95'
              }`}
            >
              <div className="text-white font-black text-xs sm:text-sm text-center px-1">
                {breathPhase === 'in' && 'หายใจเข้า... 🌸'}
                {breathPhase === 'hold' && 'กลั้นไว้เบาๆ ✨'}
                {breathPhase === 'out' && 'ผ่อนลมหายใจ... 🍃'}
              </div>
            </div>
          </div>
          <div className="text-[11px] font-bold opacity-80">
            สูดลมหายใจตามจังหวะวงกลม ให้ใจสงบและผ่อนคลาย
          </div>
        </div>

        {/* Interactive Nature Touch Canvas */}
        <div className="w-full relative h-64 sm:h-72 rounded-3xl bg-white/50 backdrop-blur-xs border-2 border-dashed border-black/15 overflow-hidden shadow-inner flex items-center justify-center select-none">
          <div className="absolute top-2.5 left-3 text-[11px] font-black opacity-70">
            แตะสัมผัสสิ่งมีชีวิตในภาพ ({tappedElements.length}/{activeScene.interactiveElements.length})
          </div>

          {activeScene.interactiveElements.map((el) => {
            const isTapped = tappedElements.includes(el.id);
            return (
              <button
                key={el.id}
                type="button"
                onClick={() => handleTapElement(el.id)}
                style={{ top: `${el.y}%`, left: `${el.x}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all cursor-pointer ${
                  isTapped
                    ? 'scale-125 bg-amber-300 text-amber-950 ring-4 ring-amber-100 animate-bounce'
                    : 'scale-100 hover:scale-120 bg-white/80 text-slate-800 shadow-sm'
                }`}
                title={el.name}
              >
                <span className="text-3xl sm:text-4xl">{el.emoji}</span>
              </button>
            );
          })}
        </div>

        {/* Color Mood Palette */}
        <div className="w-full bg-white/80 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-800">
          <div className="text-xs font-black flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-300" />
            <span>วันนี้หัวใจของหนูอยากเติมสีอะไรให้เบิกบาน?</span>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'pink', colorClass: 'bg-pink-400', label: 'ชมพูอ่อนโยน' },
              { id: 'sky', colorClass: 'bg-sky-400', label: 'ฟ้าสงบสุข' },
              { id: 'emerald', colorClass: 'bg-emerald-400', label: 'เขียวสดชื่น' },
              { id: 'amber', colorClass: 'bg-amber-400', label: 'ส้มอบอุ่น' },
            ].map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => handleSelectHeartColor(col.id, col.label)}
                className={`w-7 h-7 rounded-full ${col.colorClass} border-2 border-white shadow-2xs transition-transform cursor-pointer ${
                  selectedHeartColor === col.id ? 'scale-125 ring-2 ring-slate-800' : 'hover:scale-110'
                }`}
                title={`เลือกสี${col.label}`}
              />
            ))}
          </div>
        </div>

        {/* Completion Star Reward */}
        {isSceneComplete && (
          <div className="w-full bg-white/95 rounded-2xl p-3.5 border-2 border-emerald-400 shadow-sm flex items-center justify-between gap-3 text-slate-900 animate-in zoom-in-95">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌟</span>
              <div>
                <div className="text-xs sm:text-sm font-black text-emerald-800">
                  เก่งมากจ้า! สัมผัสครบทุกจุด รับดาวแห่งความสงบสุข +1 ดาว ⭐
                </div>
                <div className="text-[11px] text-slate-600 font-medium">
                  {activeScene.affirmation}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setSelectedSceneIndex((prev) => (prev + 1) % NATURE_SCENES.length);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 cursor-pointer shadow-xs"
            >
              ดูฉากถัดไป
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
