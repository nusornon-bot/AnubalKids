import React from 'react';
import { Sparkles, Trophy, CheckCircle2, Play, Plus, Check, Clock, Calendar } from 'lucide-react';
import { ChildProfile, Subject, CurriculumMode } from '../types';
import { getDailyMissionDetails, DAILY_MISSION_BONUS_POINTS } from '../services/dailyMissionService';
import { soundEffects } from '../services/audioService';

interface DailyMissionWidgetProps {
  activeProfile: ChildProfile;
  selectedSubjects: Subject[];
  onSelectSubject: (subject: Subject) => void;
  onStartMissionDirectly: (subject: Subject) => void;
  soundVolume?: number;
  curriculumMode?: CurriculumMode;
}

export const DailyMissionWidget: React.FC<DailyMissionWidgetProps> = ({
  activeProfile,
  selectedSubjects,
  onSelectSubject,
  onStartMissionDirectly,
  soundVolume = 0.6,
  curriculumMode,
}) => {
  const mission = getDailyMissionDetails(activeProfile, undefined, curriculumMode);
  const isSubjectSelected = selectedSubjects.includes(mission.subject);

  const handleStartMission = () => {
    soundEffects.playTap(soundVolume);
    onStartMissionDirectly(mission.subject);
  };

  const handleToggleSubject = () => {
    soundEffects.playTap(soundVolume);
    onSelectSubject(mission.subject);
  };

  // Format completed timestamp if available
  const formattedCompletedTime = React.useMemo(() => {
    if (!mission.completedAt) return null;
    try {
      const d = new Date(mission.completedAt);
      return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
    } catch {
      return null;
    }
  }, [mission.completedAt]);

  return (
    <div
      id="daily-mission-widget"
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 shadow-md bg-gradient-to-br from-amber-50 via-orange-50/80 to-rose-50/70 border-amber-300"
    >
      {/* Decorative background glow circle */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-orange-400/15 rounded-full blur-2xl pointer-events-none" />

      <div className="p-3.5 sm:p-5 relative z-10">
        {/* Top Header Row: Title + Date Badge + Curriculum Badge + Bonus Reward Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-lg sm:text-xl shadow-xs shrink-0">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                  ภารกิจประจำวัน (Daily Mission)
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-black bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300/80">
                  <Calendar className="w-3 h-3" />
                  <span>{mission.formattedDateTh}</span>
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full border ${
                    mission.isCbe
                      ? 'bg-purple-100 text-purple-900 border-purple-200'
                      : 'bg-sky-100 text-sky-900 border-sky-200'
                  }`}
                >
                  <span>{mission.isCbe ? '🎓 สมรรถนะ CBE (ป.1-ป.3)' : '🧸 8 ทักษะ (อ.1-อ.3)'}</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
                ภารกิจพิเศษสำหรับ <span className="font-bold text-amber-950">{activeProfile.name}</span> • รีเซ็ตทุกวันตามหลักสูตร
              </p>
            </div>
          </div>

          {/* Bonus Points Reward Tag */}
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-xs border border-amber-300 shrink-0">
            <Trophy className="w-3.5 h-3.5 text-yellow-200" />
            <span className="text-xs font-black">+{DAILY_MISSION_BONUS_POINTS} แต้มโบนัส</span>
            <Sparkles className="w-3 h-3 text-yellow-200 animate-pulse" />
          </div>
        </div>

        {/* Main Mission Card Body */}
        <div
          className={`rounded-2xl p-3 sm:p-4 border-2 transition-all ${
            mission.isCompleted
              ? 'bg-emerald-50/95 border-emerald-300 text-emerald-950 shadow-inner'
              : 'bg-white/95 border-amber-200 text-slate-800 shadow-2xs'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Left: Skill / Competency Details */}
            <div className="flex items-start sm:items-center gap-3">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-xs border-2 ${
                  mission.isCompleted
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                    : 'bg-amber-100 border-amber-300 text-amber-900'
                }`}
              >
                {mission.skill.icon}
              </div>

              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {mission.isCbe
                      ? `สมรรถนะที่ ${mission.skill.code.replace('CBE', '')} จาก 6 ด้าน`
                      : `ทักษะที่ ${mission.skill.code} จาก 8 ด้าน`}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-200">
                    {mission.isCbe ? `สมรรถนะ: ${mission.skill.shortName.th}` : `หมวด: ${mission.skill.shortName.th}`}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  {mission.skill.name.th}
                </h4>

                <p className="text-xs text-slate-600 font-medium">
                  {mission.isCompleted ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      พิชิตคำถาม{mission.isCbe ? 'สมรรถนะนี้' : 'หมวดนี้'}ครบ 1 รอบวันนี้แล้ว
                      {formattedCompletedTime && ` (${formattedCompletedTime})`}
                    </span>
                  ) : (
                    <span>
                      {mission.description}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Right: Actions / Completed Status */}
            <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto justify-end">
              {mission.isCompleted ? (
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-300 font-black text-xs shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>สำเร็จแล้ววันนี้ (+{DAILY_MISSION_BONUS_POINTS} แต้ม) 🎉</span>
                  </div>

                  <button
                    type="button"
                    id="btn-replay-daily-mission"
                    onClick={handleStartMission}
                    className="w-full sm:w-auto text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs active:scale-98"
                    title={mission.isCbe ? 'ฝึกฝนสมรรถนะประจำวันอีกครั้ง' : 'เล่นทบทวนวิชาประจำวันอีกครั้ง'}
                  >
                    <Play className="w-3 h-3 text-slate-600 fill-slate-600" />
                    <span>เล่นฝึกฝนซ้ำอีกรอบ</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                  {/* Toggle select button */}
                  <button
                    type="button"
                    id="btn-select-mission-subject"
                    onClick={handleToggleSubject}
                    className={`text-xs font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs active:scale-98 ${
                      isSubjectSelected
                        ? 'bg-amber-100 text-amber-900 border-amber-400 font-black'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                    title={
                      isSubjectSelected
                        ? mission.isCbe
                          ? 'สมรรถนะนี้ถูกเลือกอยู่ในแบบทดสอบแล้ว'
                          : 'วิชานี้ถูกเลือกอยู่ในแบบทดสอบแล้ว'
                        : mission.isCbe
                        ? 'เพิ่มสมรรถนะนี้เข้าแบบทดสอบ'
                        : 'เพิ่มวิชานี้เข้าแบบทดสอบ'
                    }
                  >
                    {isSubjectSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-amber-700 stroke-[3]" />
                        <span>{mission.isCbe ? 'เลือกสมรรถนะนี้แล้ว' : 'เลือกวิชานี้แล้ว'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>{mission.isCbe ? 'เลือกสมรรถนะนี้' : 'เลือกวิชานี้'}</span>
                      </>
                    )}
                  </button>

                  {/* Primary Start Mission Button */}
                  <button
                    type="button"
                    id="btn-start-daily-mission-now"
                    onClick={handleStartMission}
                    className="text-xs sm:text-sm font-black px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-2 border-amber-600 shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
                    title={`เริ่มเล่นข้อสอบ${mission.isCbe ? 'สมรรถนะ' : 'หมวด'}ประจำวันนี้ทันที`}
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>🎯 รับคำท้า & เริ่มภารกิจเลย!</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Guidance Note */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 px-1 font-medium">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
            <span>
              {mission.isCompleted
                ? mission.isCbe
                  ? 'ภารกิจใหม่จะสลับเป็นสมรรถนะถัดไปในวันพรุ่งนี้ เพื่อพัฒนา 6 สมรรถนะหลัก (CBE) อย่างรอบด้าน'
                  : 'ภารกิจใหม่จะสลับเป็นวิชาถัดไปในวันพรุ่งนี้ เพื่อฝึกฝนพัฒนาการครบทั้ง 8 ด้านอย่างสมดุล'
                : 'ทำภารกิจสำเร็จสะสมจะได้รับเหรียญตรา "ผู้พิชิตภารกิจประจำวัน" 🎯'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400">
            <Clock className="w-3 h-3" />
            <span>สลับ{mission.isCbe ? 'สมรรถนะ' : 'วิชา'}ใหม่อัตโนมัติทุกวัน</span>
          </div>
        </div>
      </div>
    </div>
  );
};
