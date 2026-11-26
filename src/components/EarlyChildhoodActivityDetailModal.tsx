import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  CheckCircle2,
  Star,
  Clock,
  Sparkles,
  Play,
  RotateCcw,
  Pause,
  Award,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Gamepad2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EarlyChildhoodActivity, Grade, Subject, VoicePersona } from '../types';
import { soundEffects, speakText, stopSpeaking } from '../services/audioService';
import { storageService, Completed8SkillActivityRecord } from '../services/storageService';

interface EarlyChildhoodActivityDetailModalProps {
  activity: EarlyChildhoodActivity | null;
  isOpen: boolean;
  onClose: () => void;
  onStartActivityGame: (skillId: Subject) => void;
  activeProfileName: string;
  activeProfileId?: string;
  soundVolume?: number;
  voicePersona?: VoicePersona;
  onActivityCompleted?: () => void;
}

export const EarlyChildhoodActivityDetailModal: React.FC<EarlyChildhoodActivityDetailModalProps> = ({
  activity,
  isOpen,
  onClose,
  onStartActivityGame,
  activeProfileName,
  activeProfileId,
  soundVolume = 0.6,
  voicePersona = 'child_girl',
  onActivityCompleted,
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingTextId, setSpeakingTextId] = useState<string | null>(null);

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 mins default
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Completion state
  const [isCompleted, setIsCompleted] = useState(false);

  // Check if previously completed
  useEffect(() => {
    if (activity && activeProfileId) {
      const records = storageService.getCompleted8SkillActivities(activeProfileId);
      const done = records.some((r) => r.activityId === activity.id);
      setIsCompleted(done);
    }
  }, [activity, activeProfileId]);

  // Reset steps on activity change
  useEffect(() => {
    if (activity) {
      setCompletedSteps({});
      setTimerSeconds((activity.totalDurationMinutes || 10) * 60);
      setIsTimerRunning(false);
      stopSpeaking();
      setIsSpeaking(false);
      setSpeakingTextId(null);
    }
  }, [activity]);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            soundEffects.playVictory(soundVolume);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, soundVolume]);

  if (!isOpen || !activity) return null;

  const allStepsChecked =
    activity.steps.length > 0 &&
    activity.steps.every((s) => completedSteps[s.stepNumber]);

  const toggleStep = (stepNumber: number) => {
    soundEffects.playTap(soundVolume);
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const handleSpeak = (text: string, id: string) => {
    if (isSpeaking && speakingTextId === id) {
      stopSpeaking();
      setIsSpeaking(false);
      setSpeakingTextId(null);
      return;
    }
    stopSpeaking();
    setIsSpeaking(true);
    setSpeakingTextId(id);
    speakText(text, 'th', (voicePersona as VoicePersona) || 'child_girl', soundVolume);
  };

  const handleCompleteActivity = () => {
    if (!activeProfileId || !activity) return;

    soundEffects.playVictory(soundVolume);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }

    const record: Completed8SkillActivityRecord = {
      activityId: activity.id,
      skillId: activity.skillId,
      profileId: activeProfileId,
      completedAt: new Date().toISOString(),
      stars: 3,
    };
    storageService.saveCompleted8SkillActivity(activeProfileId, record);
    setIsCompleted(true);
    if (onActivityCompleted) {
      onActivityCompleted();
    }
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border-4 border-amber-300 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner shrink-0 border border-white/30">
              {activity.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded-full bg-white/30 border border-white/40">
                  ทักษะที่ {activity.skillCode}: {activity.skillNameTh}
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-amber-900/30">
                  ⏱️ {activity.totalDurationMinutes} นาที
                </span>
                {isCompleted && (
                  <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3" /> สำเร็จแล้ว ⭐⭐⭐
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-xl font-black truncate mt-1 text-white drop-shadow-xs">
                {activity.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 flex items-center justify-center text-white cursor-pointer transition-all shrink-0 ml-2 border border-white/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Subtitle & Learning Goal */}
          <div className="bg-amber-50/80 rounded-2xl p-3 sm:p-4 border border-amber-200 space-y-2">
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {activity.subtitle}
            </p>
            <div className="text-[11px] sm:text-xs text-amber-950 font-bold flex items-start gap-1.5 pt-1 border-t border-amber-200/80">
              <BookOpen className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong className="font-black text-amber-900">จุดประสงค์ตามหลักสูตรปฐมวัย:</strong> {activity.objective}
              </span>
            </div>
          </div>

          {/* Fun Challenge Callout */}
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 border-2 border-purple-200 rounded-2xl p-3.5 flex items-start gap-3">
            <span className="text-2xl shrink-0 p-1 bg-white rounded-xl shadow-2xs border border-purple-100">🎯</span>
            <div className="min-w-0">
              <span className="text-[11px] font-black uppercase text-purple-700 tracking-wider">
                ภารกิจท้าทายพิเศษ (Fun Challenge)
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                {activity.funChallenge}
              </p>
            </div>
          </div>

          {/* Materials Checklist */}
          {activity.materials && activity.materials.length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-3 sm:p-3.5 border border-slate-200">
              <span className="text-xs font-black text-slate-700 block mb-2">
                📦 อุปกรณ์และสื่อที่ใช้ (หาง่ายรอบตัว):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activity.materials.map((mat, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold bg-white text-slate-700 px-2.5 py-1 rounded-xl border border-slate-200 shadow-2xs"
                  >
                    • {mat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Timer Widget */}
          <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center text-lg font-black shrink-0">
                ⏱️
              </div>
              <div>
                <span className="text-[11px] font-black text-sky-900 block">
                  ตัวจับเวลากิจกรรมแสนสนุก
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-800">
                  {formatTime(timerSeconds)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setIsTimerRunning((prev) => !prev);
                }}
                className={`text-xs font-black px-3 py-1.5 rounded-xl cursor-pointer flex items-center gap-1 transition-all ${
                  isTimerRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'พักเวลา' : 'เริ่มจับเวลา'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setIsTimerRunning(false);
                  setTimerSeconds((activity.totalDurationMinutes || 10) * 60);
                }}
                className="p-1.5 bg-white text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl cursor-pointer"
                title="รีเซ็ตเวลา"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>3 ขั้นตอนการลงมือทำกิจกรรม (แตะเพื่อเช็กความสำเร็จ):</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-500">
                {Object.values(completedSteps).filter(Boolean).length}/{activity.steps.length} ขั้นตอน
              </span>
            </div>

            {activity.steps.map((step) => {
              const isChecked = Boolean(completedSteps[step.stepNumber]);
              const stepSpeakText = `${step.title}. ภารกิจของหนู: ${step.kidMission}. กิจกรรมสนุก: ${step.funAction}`;

              return (
                <div
                  key={step.stepNumber}
                  className={`rounded-2xl p-3 sm:p-4 border-2 transition-all ${
                    isChecked
                      ? 'bg-emerald-50/90 border-emerald-300 shadow-inner'
                      : 'bg-white border-slate-200 hover:border-amber-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleStep(step.stepNumber)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-600 text-white font-black'
                          : 'bg-slate-100 hover:bg-amber-100 text-slate-600 border border-slate-300'
                      }`}
                      title={isChecked ? 'เสร็จแล้ว' : 'แตะเพื่อเช็กว่าทำเสร็จ'}
                    >
                      {isChecked ? <CheckCircle2 className="w-5 h-5" /> : step.stepNumber}
                    </button>

                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                          {step.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleSpeak(stepSpeakText, `step-${step.stepNumber}`)}
                          className={`p-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                            isSpeaking && speakingTextId === `step-${step.stepNumber}`
                              ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                              : 'bg-amber-100/80 hover:bg-amber-200 text-amber-900 border-amber-300'
                          }`}
                          title="ฟังเสียงอ่านให้ฟัง"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span className="text-[10px] hidden sm:inline">อ่านออกเสียง</span>
                        </button>
                      </div>

                      <div className="bg-white/80 rounded-xl p-2.5 border border-slate-200/80 space-y-1 text-xs">
                        <div className="text-slate-800 font-bold flex items-start gap-1">
                          <span className="text-amber-600 shrink-0">🎯</span>
                          <span><strong>ภารกิจของหนู:</strong> {step.kidMission}</span>
                        </div>
                        <div className="text-indigo-900 font-medium flex items-start gap-1">
                          <span className="text-indigo-600 shrink-0">🤸</span>
                          <span><strong>ท่าทางสนุก:</strong> {step.funAction}</span>
                        </div>
                      </div>

                      <div className="text-[10px] sm:text-[11px] text-slate-500 flex items-start gap-1 pt-0.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span><strong>คำแนะนำสำหรับครู/ผู้ปกครอง:</strong> {step.parentTeacherTip}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Celebration Card */}
          <div className="bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 border-2 border-amber-300 rounded-2xl p-4 text-center space-y-2.5">
            <div className="flex items-center justify-center gap-1.5 text-amber-600 text-lg">
              <Star className="w-6 h-6 fill-amber-400 text-amber-500 animate-bounce" />
              <Star className="w-7 h-7 fill-amber-400 text-amber-500 animate-bounce delay-100" />
              <Star className="w-6 h-6 fill-amber-400 text-amber-500 animate-bounce delay-200" />
            </div>

            <h4 className="text-sm sm:text-base font-black text-amber-950">
              {isCompleted
                ? `เก่งมาก! ${activeProfileName} พิชิตกิจกรรมนี้สำเร็จแล้ว ⭐⭐⭐`
                : allStepsChecked
                ? `ทำครบทุกขั้นตอนแล้ว! แตะเพื่อรับดาวความสำเร็จสำหรับ ${activeProfileName}`
                : `ทำกิจกรรมร่วมกันให้ครบทั้ง 3 ขั้นตอน แล้วกดรับ 3 ดาวสะสม`}
            </h4>

            <button
              type="button"
              id="btn-claim-activity-stars"
              onClick={handleCompleteActivity}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm cursor-pointer transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 mx-auto ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{isCompleted ? '✓ บันทึกสำเร็จแล้ว (รับ 3 ดาว ⭐)' : '🎉 พิชิตกิจกรรมสำเร็จ! รับ 3 ดาว ⭐'}</span>
            </button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>

          <button
            type="button"
            id="btn-start-activity-direct-quiz"
            onClick={() => {
              onClose();
              onStartActivityGame(activity.skillId);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>เริ่มทำแบบทดสอบทักษะนี้ทันที (5 ข้อ) →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
