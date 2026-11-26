import React, { useState, useEffect, useMemo } from 'react';
import { Grade } from '../../types';
import {
  AUDITORY_QUESTIONS,
  AuditoryQuestion,
  RHYTHM_PADS,
  RhythmPad,
} from '../../data/skillGamesDataNew';
import { soundEffects, speakText, isAudioMuted } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { SkillGameLevelSelector } from './SkillGameLevelSelector';
import {
  Volume2,
  Music,
  Disc,
  Play,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Headphones,
} from 'lucide-react';

interface AuditoryRhythmViewProps {
  currentGrade: Grade;
  soundVolume: number;
  onEarnStar?: () => void;
}

export const AuditoryRhythmView: React.FC<AuditoryRhythmViewProps> = ({
  currentGrade,
  soundVolume,
  onEarnStar,
}) => {
  const [subMode, setSubMode] = useState<'guess_sound' | 'rhythm_pad'>('guess_sound');

  // --- Mode 1: Guess the sound ---
  const availableSoundQuestions = useMemo(() => {
    return AUDITORY_QUESTIONS;
  }, []);

  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const activeSoundQ: AuditoryQuestion =
    availableSoundQuestions[currentSoundIndex] ||
    availableSoundQuestions[0] ||
    AUDITORY_QUESTIONS[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSoundCorrect, setIsSoundCorrect] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Play synthesized frequency acoustic pattern
  const playSynthesizedPattern = (freqs: number[]) => {
    if (soundVolume <= 0.01 || isAudioMuted()) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.2);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.2);
        gain.gain.linearRampToValueAtTime(soundVolume * 0.3, now + idx * 0.2 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.2 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.2);
        osc.stop(now + idx * 0.2 + 0.26);
      });
    } catch {
      // ignore
    }
  };

  const handlePlaySoundPrompt = () => {
    if (soundVolume <= 0.01 || isAudioMuted()) return;
    setIsPlayingAudio(true);
    soundEffects.playTap(soundVolume);
    playSynthesizedPattern(activeSoundQ.audioPitchPattern);

    setTimeout(() => {
      speakText(activeSoundQ.soundPromptThai, 'th', soundVolume);
      setIsPlayingAudio(false);
    }, 400);
  };

  useEffect(() => {
    setSelectedOptionId(null);
    setIsSoundCorrect(false);
    if (subMode === 'guess_sound') {
      handlePlaySoundPrompt();
    }
  }, [activeSoundQ, subMode]);

  const handleSelectSoundOption = (optId: string) => {
    if (isSoundCorrect) return;
    soundEffects.playTap(soundVolume);
    setSelectedOptionId(optId);

    if (optId === activeSoundQ.correctOptionId) {
      setIsSoundCorrect(true);
      soundEffects.playSuccess(soundVolume);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      speakText(activeSoundQ.revealedStory, 'th', soundVolume);
      if (onEarnStar) onEarnStar();
    } else {
      soundEffects.playIncorrect(soundVolume);
      speakText('ยังไม่ใช่จ้ะ ลองกดฟังเสียงอีกครั้งดูนะ', 'th', soundVolume);
    }
  };

  const handleNextSound = () => {
    soundEffects.playTap(soundVolume);
    if (currentSoundIndex < availableSoundQuestions.length - 1) {
      setCurrentSoundIndex((prev) => prev + 1);
    } else {
      setCurrentSoundIndex(0);
    }
  };

  // --- Mode 2: Rhythm Repeater ---
  const sequenceLength = currentGrade === 'K1' ? 2 : currentGrade === 'K2' ? 3 : 4;
  const [targetSequence, setTargetSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [activeFlashingPad, setActiveFlashingPad] = useState<string | null>(null);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [isRhythmSuccess, setIsRhythmSuccess] = useState(false);

  // Play pad tone
  const playPadTone = (freq: number) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(soundVolume * 0.35, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch {
      // ignore
    }
  };

  // Start new rhythm round
  const generateNewRhythm = () => {
    const pads = ['pad-red', 'pad-yellow', 'pad-green', 'pad-blue'];
    const newSeq: string[] = [];
    for (let i = 0; i < sequenceLength; i++) {
      const randomPad = pads[Math.floor(Math.random() * pads.length)];
      newSeq.push(randomPad);
    }
    setTargetSequence(newSeq);
    setPlayerSequence([]);
    setIsRhythmSuccess(false);

    // Playback sequence with delay
    setIsShowingSequence(true);
    speakText('ฟังและจำจังหวะให้ดีนะจ๊ะ', 'th', soundVolume);

    newSeq.forEach((padId, index) => {
      setTimeout(() => {
        const pad = RHYTHM_PADS.find((p) => p.id === padId);
        if (pad) {
          playPadTone(pad.freq);
          setActiveFlashingPad(padId);
          setTimeout(() => setActiveFlashingPad(null), 300);
        }

        if (index === newSeq.length - 1) {
          setTimeout(() => {
            setIsShowingSequence(false);
            speakText('ตาหนูเคาะตามจังหวะแล้ว!', 'th', soundVolume);
          }, 400);
        }
      }, 1000 + index * 600);
    });
  };

  useEffect(() => {
    if (subMode === 'rhythm_pad') {
      generateNewRhythm();
    }
  }, [subMode, currentGrade]);

  const handlePadClick = (pad: RhythmPad) => {
    if (isShowingSequence || isRhythmSuccess) return;

    playPadTone(pad.freq);
    setActiveFlashingPad(pad.id);
    setTimeout(() => setActiveFlashingPad(null), 200);

    const newPlayerSeq = [...playerSequence, pad.id];
    setPlayerSequence(newPlayerSeq);

    const currentStep = newPlayerSeq.length - 1;

    // Check if matching target
    if (newPlayerSeq[currentStep] !== targetSequence[currentStep]) {
      soundEffects.playIncorrect(soundVolume);
      speakText('จังหวะยังไม่ตรงจ้ะ ลองฟังใหม่อีกรอบนะ', 'th', soundVolume);
      setPlayerSequence([]);
      return;
    }

    // Check if finished sequence
    if (newPlayerSeq.length === targetSequence.length) {
      setIsRhythmSuccess(true);
      soundEffects.playVictory(soundVolume);
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      speakText('ยอดเยี่ยมมาก! เคาะตามจังหวะได้ถูกต้องครบถ้วน', 'th', soundVolume);
      if (onEarnStar) onEarnStar();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-3">
      {/* Sub-Mode Switcher */}
      <div className="w-full bg-white rounded-3xl p-3 sm:p-4 border-3 border-rose-200 shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setSubMode('guess_sound');
            }}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              subMode === 'guess_sound'
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-rose-50'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>1. ฟังเสียงทายปริศนา</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setSubMode('rhythm_pad');
            }}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              subMode === 'rhythm_pad'
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-rose-50'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>2. เคาะจังหวะตามตัวโน้ต</span>
          </button>
        </div>
      </div>

      {subMode === 'guess_sound' && (
        <SkillGameLevelSelector
          totalLevels={availableSoundQuestions.length}
          currentIndex={currentSoundIndex}
          onSelectLevel={(idx) => {
            soundEffects.playTap(soundVolume);
            setCurrentSoundIndex(idx);
          }}
          prefix="ข้อ"
          colorTheme="rose"
          badgeSubtitle={activeSoundQ.soundTitle}
        />
      )}

      {/* ========================================= */}
      {/* SUB-MODE 1: GUESS THE SOUND               */}
      {/* ========================================= */}
      {subMode === 'guess_sound' && (
        <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border-3 border-rose-200 shadow-md flex flex-col items-center gap-5">
          <div className="text-center">
            <h2 className="text-base sm:text-lg font-black text-slate-800 flex items-center justify-center gap-2">
              <span>🎵</span>
              <span>{activeSoundQ.soundTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 font-bold mt-0.5">
              กดฟังเสียง แล้วเลือกว่าเป็นเสียงของสิ่งใด
            </p>
          </div>

          {/* Big Audio Play Button */}
          <button
            type="button"
            onClick={handlePlaySoundPrompt}
            className={`w-36 h-36 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer border-4 border-white ring-4 ring-rose-200 ${
              isPlayingAudio ? 'animate-pulse scale-105 ring-8 ring-rose-300' : ''
            }`}
          >
            <Volume2 className="w-12 h-12" />
            <span className="text-xs font-black">กดฟังเสียง 🔊</span>
          </button>

          {/* Speech Text Box */}
          <div className="w-full max-w-md bg-rose-50 border-2 border-rose-300 rounded-2xl p-3 text-center text-xs sm:text-sm font-black text-rose-900">
            "{activeSoundQ.soundPromptThai}"
          </div>

          {/* Options Grid with Audio Button on Each Option */}
          <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeSoundQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isCorrect = opt.id === activeSoundQ.correctOptionId;

              return (
                <div
                  key={opt.id}
                  onClick={() => !isSoundCorrect && handleSelectSoundOption(opt.id)}
                  className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm relative group ${opt.color} ${
                    isSelected
                      ? isCorrect
                        ? 'border-emerald-500 ring-4 ring-emerald-300 scale-105'
                        : 'border-rose-400 ring-2 ring-rose-200'
                      : 'border-slate-200 hover:border-rose-300'
                  }`}
                >
                  {/* Speaker Button to listen to option label */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(opt.label, 'th', soundVolume);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-700 hover:text-rose-600 shadow-xs transition-colors"
                    title={`ฟังเสียง ${opt.label}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-5xl">{opt.icon}</span>
                  <span className="text-xs sm:text-sm font-black text-slate-800 text-center">
                    {opt.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Correct feedback */}
          {isSoundCorrect && (
            <div className="flex flex-col items-center gap-3">
              <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-900 rounded-2xl p-3 text-center text-xs sm:text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{activeSoundQ.revealedStory}</span>
              </div>

              <button
                type="button"
                onClick={handleNextSound}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer animate-bounce"
              >
                <span>ไปเสียงถัดไป</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================= */}
      {/* SUB-MODE 2: RHYTHM PADS REPEATER          */}
      {/* ========================================= */}
      {subMode === 'rhythm_pad' && (
        <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border-3 border-rose-200 shadow-md flex flex-col items-center gap-5">
          <div className="text-center">
            <h2 className="text-base sm:text-lg font-black text-slate-800 flex items-center justify-center gap-2">
              <span>🥁</span>
              <span>เคาะจังหวะตามลำดับ ({sequenceLength} จังหวะ)</span>
            </h2>
            <p className="text-xs text-slate-500 font-bold mt-0.5">
              ฟังเสียงโน้ตและดูไฟกระพริบ แล้วเคาะตามลำดับให้ถูกต้อง
            </p>
          </div>

          {/* Sequence Visual Indicator */}
          <div className="flex items-center gap-2">
            {targetSequence.map((padId, i) => {
              const pad = RHYTHM_PADS.find((p) => p.id === padId);
              const isPlayed = i < playerSequence.length;
              return (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all ${
                    isPlayed
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-100 text-slate-400 border-slate-300'
                  }`}
                >
                  <span className="text-xs font-black">{i + 1}</span>
                </div>
              );
            })}
          </div>

          {/* Rhythm Pads Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm">
            {RHYTHM_PADS.map((pad) => {
              const isFlashing = activeFlashingPad === pad.id;
              return (
                <button
                  key={pad.id}
                  type="button"
                  onClick={() => handlePadClick(pad)}
                  disabled={isShowingSequence}
                  className={`h-28 sm:h-32 rounded-3xl font-black text-sm flex flex-col items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed ${
                    isFlashing ? pad.activeColorClass : pad.colorClass
                  }`}
                >
                  <span className="text-3xl">{pad.icon}</span>
                  <span className="text-xs sm:text-sm font-black">{pad.name}</span>
                </button>
              );
            })}
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={generateNewRhythm}
              disabled={isShowingSequence}
              className="px-5 py-2.5 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-black text-xs sm:text-sm border border-rose-300 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ฟังจังหวะอีกครั้ง</span>
            </button>
          </div>

          {/* Success message */}
          {isRhythmSuccess && (
            <div className="bg-emerald-500 text-white rounded-3xl p-4 shadow-md flex items-center gap-3 animate-bounce">
              <span className="text-2xl">🎉</span>
              <span className="text-sm font-black">เก่งมาก! เคาะตามจังหวะถูกต้องทั้งหมดแล้ว</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
