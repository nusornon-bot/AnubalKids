import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Star,
  Award,
  ArrowRight,
  TrendingUp,
  BookOpen,
  PenTool,
  Brain,
  Mic,
  Palette,
  Target,
  FileCheck,
  QrCode,
} from 'lucide-react';
import { ChildProfile, Grade } from '../../types';
import confetti from 'canvas-confetti';
import { soundEffects, speakText, isAudioMuted } from '../../services/audioService';

interface SynergyQuestsCardProps {
  onOpenAirWriting: () => void;
  onOpenWordBuilder: () => void;
  onOpenHolisticReport: () => void;
  onOpenCompetencyActivities?: () => void;
  onOpenColorPhonics?: () => void;
  onOpenVoicePhonics?: () => void;
  onOpenDiagnostic?: () => void;
  onOpenAvatarShop?: () => void;
  onOpenOfficialReport?: () => void;
  onOpenHomeSchool?: () => void;
  currentGrade?: Grade;
  studentProfile?: ChildProfile | null;
  onEarnStar?: () => void;
  soundVolume?: number;
}

export const SynergyQuestsCard: React.FC<SynergyQuestsCardProps> = ({
  onOpenAirWriting,
  onOpenWordBuilder,
  onOpenHolisticReport,
  onOpenCompetencyActivities,
  onOpenColorPhonics,
  onOpenVoicePhonics,
  onOpenDiagnostic,
  onOpenAvatarShop,
  onOpenOfficialReport,
  onOpenHomeSchool,
  currentGrade = 'P1',
  studentProfile,
  onEarnStar,
  soundVolume = 0.8,
}) => {
  const [quest1Done, setQuest1Done] = useState(false);
  const [quest2Done, setQuest2Done] = useState(false);
  const [quest3Done, setQuest3Done] = useState(false);
  const [claimedReward, setClaimedReward] = useState(false);

  const completedCount = (quest1Done ? 1 : 0) + (quest2Done ? 1 : 0) + (quest3Done ? 1 : 0);
  const allCompleted = completedCount === 3;

  const handleClaimReward = () => {
    if (claimedReward || !allCompleted) return;
    setClaimedReward(true);
    soundEffects.playVictory(soundVolume);
    if (onEarnStar) {
      onEarnStar();
      onEarnStar();
      onEarnStar();
    }
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
    });
    if (soundVolume > 0.01 && !isAudioMuted()) {
      speakText('ยินดีด้วย! คุณพิชิตภารกิจ ๓ ประสานประจำวันสำเร็จ ได้รับ ๓ ดาวและเหรียญผู้เรียนรู้รอบด้าน', 'th', 'adult_female');
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-amber-500/10 via-teal-500/10 to-indigo-500/10 rounded-3xl p-5 border-2 border-amber-300 shadow-sm transition-all hover:shadow-md">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center text-2xl shadow-md">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">
                ภารกิจ ๓ ประสาน (Cross-Curriculum Daily Quest)
              </span>
              <span className="text-xs text-slate-500">บูรณาการ ๓ หลักสูตร</span>
            </div>
            <h3 className="text-lg font-black text-slate-800">
              ภารกิจเชื่อมโยง: กล้ามเนื้อมือ x แจกลูกสะกดคำ x สมรรถนะชีวิต
            </h3>
          </div>
        </div>

        {/* Quick Report Link */}
        <button
          onClick={onOpenHolisticReport}
          className="px-4 py-2 rounded-xl bg-white hover:bg-teal-50 text-teal-800 border border-teal-300 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:scale-102"
        >
          <TrendingUp className="w-4 h-4 text-teal-600" />
          <span>🌟 แฟ้มสะสมงาน อ.๑ - ป.๖</span>
        </button>
      </div>

      {/* 3 Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
        {/* Quest 1 */}
        <div
          onClick={() => {
            onOpenAirWriting();
            setQuest1Done(true);
          }}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            quest1Done
              ? 'bg-emerald-50/80 border-emerald-400 shadow-xs'
              : 'bg-white hover:bg-amber-50/50 border-amber-200 hover:border-amber-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
              ๑. ปฐมวัย & สพฐ.
            </span>
            {quest1Done ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300" />
            )}
          </div>
          <h4 className="text-sm font-black text-slate-800 mb-1 flex items-center gap-1.5">
            <PenTool className="w-4 h-4 text-amber-600" />
            <span>Air-Writing กลางอากาศ</span>
          </h4>
          <p className="text-xs text-slate-500">
            ลากเส้นรูปสระหรือพยัญชนะด้วยนิ้วมือกลางอากาศ ๑ ตัว
          </p>
          <div className="mt-2 text-[11px] font-bold text-amber-700 flex items-center gap-1">
            <span>คลิกเพื่อเริ่มฝึก</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Quest 2 */}
        <div
          onClick={() => {
            onOpenWordBuilder();
            setQuest2Done(true);
          }}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            quest2Done
              ? 'bg-emerald-50/80 border-emerald-400 shadow-xs'
              : 'bg-white hover:bg-purple-50/50 border-purple-200 hover:border-purple-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
              ๒. สพฐ. แจกลูกสะกดคำ
            </span>
            {quest2Done ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300" />
            )}
          </div>
          <h4 className="text-sm font-black text-slate-800 mb-1 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>มินิเกมต่อคำ EF</span>
          </h4>
          <p className="text-xs text-slate-500">
            จัดเรียงโครงสร้างคำหรือเติมส่วนที่หายไป ๑ ข้อ
          </p>
          <div className="mt-2 text-[11px] font-bold text-purple-700 flex items-center gap-1">
            <span>คลิกเพื่อเริ่มเล่น</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Quest 3 */}
        <div
          onClick={() => {
            if (onOpenCompetencyActivities) onOpenCompetencyActivities();
            setQuest3Done(true);
          }}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            quest3Done
              ? 'bg-emerald-50/80 border-emerald-400 shadow-xs'
              : 'bg-white hover:bg-indigo-50/50 border-indigo-200 hover:border-indigo-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
              ๓. สมรรถนะ CBE
            </span>
            {quest3Done ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300" />
            )}
          </div>
          <h4 className="text-sm font-black text-slate-800 mb-1 flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-indigo-600" />
            <span>ภารกิจสมรรถนะชีวิต</span>
          </h4>
          <p className="text-xs text-slate-500">
            ฝึกการจัดการตนเอง คิดวิเคราะห์ หรือสำรวจสิ่งแวดล้อม
          </p>
          <div className="mt-2 text-[11px] font-bold text-indigo-700 flex items-center gap-1">
            <span>คลิกเพื่อเข้าทำ</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Progress & Reward Claim */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-36 bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-500"
              style={{ width: `${(completedCount / 3) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-700">
            ความคืบหน้าภารกิจ: {completedCount}/3 ข้อ
          </span>
        </div>

        <button
          onClick={handleClaimReward}
          disabled={!allCompleted || claimedReward}
          className={`px-5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-sm ${
            claimedReward
              ? 'bg-emerald-100 text-emerald-800 cursor-default'
              : allCompleted
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 animate-pulse hover:scale-105 shadow-md ring-2 ring-amber-300'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{claimedReward ? '✓ รับรางวัลแล้ว (๓ ดาว + เหรียญ)' : 'รับรางวัลประจำวัน ⭐⭐⭐'}</span>
        </button>
      </div>
      {/* New Enhanced Synergy Tools Bar */}
      <div className="pt-3 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2">
        <div className="text-[11px] font-black text-amber-900 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>เครื่องมือเสริมการเรียนรู้อัจฉริยะ:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {onOpenColorPhonics && (
            <button
              type="button"
              onClick={onOpenColorPhonics}
              className="px-2.5 py-1 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-xs"
            >
              <Palette className="w-3 h-3 text-blue-600" />
              <span>รหัสสีแจกลูกคำ</span>
            </button>
          )}
          {onOpenVoicePhonics && (
            <button
              type="button"
              onClick={onOpenVoicePhonics}
              className="px-2.5 py-1 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-xs"
            >
              <Mic className="w-3 h-3 text-emerald-600" />
              <span>ฝึกพูดผ่านไมค์</span>
            </button>
          )}
          {onOpenDiagnostic && (
            <button
              type="button"
              onClick={onOpenDiagnostic}
              className="px-2.5 py-1 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-xs"
            >
              <Target className="w-3 h-3 text-rose-600" />
              <span>วินิจฉัยจุดอ่อน</span>
            </button>
          )}
          {onOpenAvatarShop && (
            <button
              type="button"
              onClick={onOpenAvatarShop}
              className="px-2.5 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-xs"
            >
              <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
              <span>ร้านค้าดาว & ปากกานีออน</span>
            </button>
          )}
          {onOpenOfficialReport && (
            <button
              type="button"
              onClick={onOpenOfficialReport}
              className="px-2.5 py-1 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-xs"
            >
              <FileCheck className="w-3 h-3 text-indigo-600" />
              <span>รายงาน สพฐ.</span>
            </button>
          )}
          {onOpenHomeSchool && (
            <button
              type="button"
              onClick={onOpenHomeSchool}
              className="px-2.5 py-1 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-800 text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-xs"
            >
              <QrCode className="w-3 h-3 text-teal-600" />
              <span>การบ้าน QR</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
