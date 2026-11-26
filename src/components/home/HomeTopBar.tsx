import React from 'react';
import { Shield, ShieldCheck, Cloud, RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { User } from 'firebase/auth';
import { CurriculumMode } from '../../types';

interface HomeTopBarProps {
  effectiveMode: 'touch' | 'hand';
  onToggleControlMode?: () => void;
  onOpenHandCalibration?: () => void;
  onOpenDiagnostics: () => void;
  isAdmin?: boolean;
  onOpenAdminAuth: () => void;
  onSyncProfiles?: () => Promise<void>;
  isSyncingCloud: boolean;
  curriculumMode?: CurriculumMode;
  onOpenCurriculumSwitch?: () => void;
}

export const HomeTopBar: React.FC<HomeTopBarProps> = ({
  effectiveMode,
  onToggleControlMode,
  onOpenHandCalibration,
  onOpenDiagnostics,
  isAdmin,
  onOpenAdminAuth,
  onSyncProfiles,
  isSyncingCloud,
  curriculumMode = 'early_childhood',
  onOpenCurriculumSwitch,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 mb-1">
      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs font-medium text-slate-600 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-200/90 shadow-2xs">
        <span className="flex items-center gap-1 font-bold text-slate-700">
          <span>{effectiveMode === 'touch' ? '📱' : '🖐️'}</span>
          <span>{effectiveMode === 'touch' ? 'โหมดสัมผัส' : 'โหมดกล้องจับมือ'}</span>
        </span>

        {onToggleControlMode && (
          <>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={onToggleControlMode}
              className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer"
              title="สลับโหมดควบคุม"
            >
              สลับเป็น {effectiveMode === 'touch' ? '🖐️ กล้อง' : '📱 สัมผัส'}
            </button>
          </>
        )}

        {onOpenHandCalibration && effectiveMode === 'hand' && (
          <>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              id="btn-calibrate-hand-start"
              onClick={onOpenHandCalibration}
              className="text-amber-700 hover:text-amber-900 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
              title="ปรับเทียบกล้อง"
            >
              <span>🎯</span>
              <span>ปรับเทียบมือ</span>
            </button>
          </>
        )}

        <span className="text-slate-300">·</span>
        <button
          type="button"
          onClick={onOpenDiagnostics}
          className="text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
          title="ตรวจสอบความพร้อมของอุปกรณ์"
        >
          ตรวจสเปก
        </button>

        {/* Admin Login shortcut */}
        <span className="text-slate-300">·</span>
        {isAdmin ? (
          <button
            type="button"
            id="btn-admin-status-badge"
            onClick={onOpenAdminAuth}
            className="flex items-center gap-1 text-[11px] font-black text-amber-900 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-lg border border-amber-300 cursor-pointer"
            title="สิทธิ์ผู้ดูแลระบบ"
          >
            <ShieldCheck className="w-3 h-3 text-amber-600" />
            <span>ผู้ดูแลระบบ</span>
          </button>
        ) : (
          <button
            type="button"
            id="btn-admin-login-start"
            onClick={onOpenAdminAuth}
            className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer"
            title="เข้าสู่ระบบผู้ดูแลระบบ"
          >
            <Shield className="w-3 h-3 text-slate-400" />
            <span>โหมดครู</span>
          </button>
        )}

        {onSyncProfiles && (
          <>
            <span className="text-slate-300">·</span>
            <button
              id="btn-start-sync-cloud"
              type="button"
              onClick={onSyncProfiles}
              disabled={isSyncingCloud}
              className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer disabled:opacity-50"
              title="ซิงค์ข้อมูลกับคลาวด์"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncingCloud ? 'animate-spin text-emerald-600' : ''}`} />
              <span className="hidden sm:inline">ซิงค์คลาวด์</span>
            </button>
          </>
        )}

        {/* Dedicated Curriculum Switcher Pill */}
        {onOpenCurriculumSwitch && (
          <>
            <span className="text-slate-300">·</span>
            <button
              id="btn-switch-curriculum-mode"
              type="button"
              onClick={onOpenCurriculumSwitch}
              className={`flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full border transition-all active:scale-95 cursor-pointer shadow-xs ${
                curriculumMode === 'thai_phonics'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-700 hover:brightness-110'
                  : curriculumMode === 'cbe_primary'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-700 hover:brightness-110'
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-blue-600 hover:brightness-110'
              }`}
              title="คลิกเพื่อสลับระหว่างหลักสูตร 8 ทักษะปฐมวัย, ฐานสมรรถนะ ป.1-ป.3, และการแจกลูกสะกดคำ สพฐ."
            >
              <span>{curriculumMode === 'thai_phonics' ? '📖' : curriculumMode === 'cbe_primary' ? '🎓' : '🧸'}</span>
              <span>
                {curriculumMode === 'thai_phonics'
                  ? 'ระบบ: แจกลูกสะกดคำ สพฐ.'
                  : curriculumMode === 'cbe_primary'
                  ? 'ระบบ: สมรรถนะ ป.1-ป.3'
                  : 'ระบบ: 8 ทักษะ อ.1-อ.3'}
              </span>
              <span className="text-[10px] bg-white/20 px-1 rounded-sm ml-0.5">สลับ ⇄</span>
            </button>
          </>
        )}
      </div>

      {/* Main App Title */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3 text-center">
        <img
          src="/favicon.svg"
          alt="App Logo"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl shadow-2xs border border-blue-200 shrink-0"
        />
        <div>
          {curriculumMode === 'thai_phonics' ? (
            <>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
                <span>การสอนอ่านเขียนโดยการแจกลูกสะกดคำ</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xl border border-emerald-200 text-sm sm:text-base md:text-lg">
                  ๑๐ หน่วย สพฐ.
                </span>
              </h1>
              <p className="text-[11px] sm:text-xs text-emerald-800 font-medium mt-0.5">
                สถาบันภาษาไทย สำนักวิชาการและมาตรฐานการศึกษา สพฐ. · คลังข้อสอบ 3,600+ ข้อ (ป.1 - ป.6)
              </p>
            </>
          ) : curriculumMode === 'cbe_primary' ? (
            <>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
                <span>ระบบการเรียนรู้ฐานสมรรถนะ</span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-xl border border-indigo-200 text-sm sm:text-base md:text-lg">
                  ป.1 - ป.6
                </span>
              </h1>
              <p className="text-[11px] sm:text-xs text-indigo-700 font-medium mt-0.5">
                เน้นการลงมือปฏิบัติ 6 สมรรถนะหลัก (CBE) · กิจกรรม Interactive 5 นาที · คลังข้อสอบ 4,500 ข้อ (ป.1 - ป.6)
              </p>
            </>
          ) : (
            <>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
                <span>อนุบาลคิดส์ คิดส์ 🌟</span>
                <span className="text-blue-600">Kids Hand Motion</span>
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-xl border border-amber-200 text-sm sm:text-base">
                  อ.1 - อ.3
                </span>
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-600 font-medium mt-0.5">
                สื่อการเรียนรู้ปฐมวัย พัฒนา 8 ทักษะหลัก เสริมพัฒนาการผ่านการสัมผัสและกล้องตรวจจับมือ · คลังข้อสอบ 4,400+ ข้อ (อ.1 - อ.3)
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
