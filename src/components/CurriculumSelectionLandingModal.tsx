import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Target,
  ArrowRight,
  CheckCircle2,
  Users,
  Compass,
  Check,
  Award,
  Layers,
  GraduationCap,
  Baby,
  Clock,
  Hand,
  Brain,
  X,
} from 'lucide-react';
import { CurriculumMode } from '../types';
import { soundEffects } from '../services/audioService';

export interface CurriculumSelectionLandingModalProps {
  isOpen: boolean;
  currentMode: CurriculumMode;
  onSelectMode: (mode: CurriculumMode, rememberChoice: boolean) => void;
  onClose?: () => void;
  canDismiss?: boolean;
  soundVolume?: number;
}

export const CurriculumSelectionLandingModal: React.FC<CurriculumSelectionLandingModalProps> = ({
  isOpen,
  currentMode,
  onSelectMode,
  onClose,
  canDismiss = true,
  soundVolume = 0.7,
}) => {
  const [selected, setSelected] = useState<CurriculumMode>(currentMode);
  const [rememberChoice, setRememberChoice] = useState(true);

  if (!isOpen) return null;

  const handleSelect = (mode: CurriculumMode) => {
    setSelected(mode);
    soundEffects.playTap(soundVolume);
    onSelectMode(mode, rememberChoice);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="curriculum-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-md animate-in fade-in"
    >
      <div className="bg-white rounded-3xl sm:rounded-4xl shadow-2xl border-2 sm:border-4 border-indigo-100 w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white p-5 sm:p-6 text-center relative shrink-0">
          {canDismiss && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="inline-flex items-center gap-2 bg-white/20 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-xs mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>เลือกระบบหลักสูตรการศึกษา (๓ หลักสูตรหลัก)</span>
          </div>

          <h2
            id="curriculum-gate-title"
            className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight"
          >
            ยินดีต้อนรับสู่ระบบการเรียนรู้ดิจิทัล
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto mt-1 font-medium">
            โปรดเลือกหลักสูตรที่ต้องการใช้งาน โดยระบบจะแยกการบริหารจัดการ, นักเรียน, คลังข้อสอบ และรายงานออกจากกันอย่างชัดเจน
          </p>
        </div>

        {/* Modal Body: Three Distinct Curriculum Cards */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5 bg-slate-50/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* ======================================================== */}
            {/* OPTION 1: พัฒนา 8 ทักษะ ระดับ อ.1 - อ.3 (ปฐมวัย)           */}
            {/* ======================================================== */}
            <div
              onClick={() => handleSelect('early_childhood')}
              className={`rounded-3xl p-5 border-3 transition-all cursor-pointer flex flex-col justify-between gap-4 relative overflow-hidden group ${
                selected === 'early_childhood'
                  ? 'bg-gradient-to-b from-sky-50 via-white to-sky-50/50 border-sky-500 shadow-xl ring-4 ring-sky-200'
                  : 'bg-white hover:bg-sky-50/30 border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Top pill badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-800 border border-sky-200">
                  <Baby className="w-3.5 h-3.5" />
                  <span>อนุบาล 1 - 3 (อายุ 3 - 6 ปี)</span>
                </span>
                {selected === 'early_childhood' && (
                  <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                    ✓
                  </span>
                )}
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-500 text-white flex items-center justify-center text-3xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  🧸
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
                    พัฒนา 8 ทักษะ อ.1 - อ.3
                  </h3>
                  <p className="text-xs text-sky-700 font-bold mt-0.5">
                    หลักสูตรการศึกษาปฐมวัย & เตรียมความพร้อม
                  </p>
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="bg-sky-50/70 p-3.5 rounded-2xl border border-sky-100/90 flex flex-col gap-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="text-sky-600 font-black">✓</span>
                  <span><strong>8 ทักษะพัฒนาการหลัก:</strong> ภาษา, คณิต, แก้ปัญหา, สืบเสาะ, สร้างสรรค์, สุขภาพ, อารมณ์, พลเมือง</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sky-600 font-black">✓</span>
                  <span><strong>3 เสาหลักสู่ ป.1:</strong> ภาษาไทย, ภาษาอังกฤษ, คณิตศาสตร์ปฐมวัย</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sky-600 font-black">✓</span>
                  <span><strong>นิทาน AI:</strong> ภาพประกอบพร้อมเสียงพากย์</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sky-600 font-black">✓</span>
                  <span><strong>Hand Tracking:</strong> ลากเส้นตามรอยรูปทรง & คัด ก-ฮ</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sky-600 font-black">✓</span>
                  <span><strong>เรดาร์ 4 ด้าน:</strong> รายงานพัฒนาการและคลังข้อสอบ 4,400+ ข้อ (อ.1 - อ.3)</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('early_childhood');
                }}
                className={`w-full py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer ${
                  selected === 'early_childhood'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sky-200'
                    : 'bg-slate-100 hover:bg-sky-500 hover:text-white text-slate-700'
                }`}
              >
                <span>เข้าสู่ระบบ 8 ทักษะ (อ.1 - อ.3)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* ======================================================== */}
            {/* OPTION 2: สมรรถนะ ป.1 - ป.3 (ประถมศึกษา)                  */}
            {/* ======================================================== */}
            <div
              onClick={() => handleSelect('cbe_primary')}
              className={`rounded-3xl p-5 border-3 transition-all cursor-pointer flex flex-col justify-between gap-4 relative overflow-hidden group ${
                selected === 'cbe_primary'
                  ? 'bg-gradient-to-b from-indigo-50 via-white to-purple-50/50 border-indigo-600 shadow-xl ring-4 ring-indigo-200'
                  : 'bg-white hover:bg-indigo-50/30 border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Top pill badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-200">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>ประถมศึกษา 1 - 3 (อายุ 6 - 9 ปี)</span>
                </span>
                {selected === 'cbe_primary' && (
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                    ✓
                  </span>
                )}
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center text-3xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  🎓
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                    สมรรถนะ ป.1 - ป.6
                  </h3>
                  <p className="text-xs text-indigo-700 font-bold mt-0.5">
                    หลักสูตรสถานศึกษาฐานสมรรถนะ (6 ด้าน)
                  </p>
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-100/90 flex flex-col gap-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-black">✓</span>
                  <span><strong>6 สมรรถนะหลัก:</strong> จัดการตนเอง, คิดขั้นสูง, สื่อสาร, ทำงานเป็นทีม, พลเมือง, วิทยาการ</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-black">✓</span>
                  <span><strong>กิจกรรม Interactive:</strong> คู่มือเสริมสมรรถนะขั้นตอนละ 5 นาที</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-black">✓</span>
                  <span><strong>คลังข้อสอบ 4,500 ข้อ:</strong> ป.1 - ป.6 ระดับละ 750 ข้อ (สมรรถนะละ 750 ข้อ)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-black">✓</span>
                  <span><strong>เกณฑ์รูบริก:</strong> เริ่มต้น / กำลังพัฒนา / สามารถ</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-black">✓</span>
                  <span><strong>เรดาร์สมรรถนะ:</strong> รายงาน 6 ด้านและใบงานบูรณาการ</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('cbe_primary');
                }}
                className={`w-full py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer ${
                  selected === 'cbe_primary'
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white shadow-indigo-200'
                    : 'bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700'
                }`}
              >
                <span>เข้าสู่ระบบสมรรถนะ (ป.1 - ป.6)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* ======================================================== */}
            {/* OPTION 3: การสอนอ่านเขียน โดยการแจกลูกสะกดคำ (สพฐ.)         */}
            {/* ======================================================== */}
            <div
              onClick={() => handleSelect('thai_phonics')}
              className={`rounded-3xl p-5 border-3 transition-all cursor-pointer flex flex-col justify-between gap-4 relative overflow-hidden group ${
                selected === 'thai_phonics'
                  ? 'bg-gradient-to-b from-emerald-50 via-white to-teal-50/50 border-emerald-600 shadow-xl ring-4 ring-emerald-200'
                  : 'bg-white hover:bg-emerald-50/30 border-slate-200/90 hover:border-emerald-300 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Top pill badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>คู่มืออ่านออกเขียนได้ สพฐ. (๑๐ หน่วย)</span>
                </span>
                {selected === 'thai_phonics' && (
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                    ✓
                  </span>
                )}
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center text-3xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  📖
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
                    แจกลูกสะกดคำ ๑๐ หน่วย (ป.๑ - ป.๖)
                  </h3>
                  <p className="text-xs text-emerald-700 font-bold mt-0.5">
                    คู่มือการสอนอ่านเขียน โดยการแจกลูกสะกดคำ สพฐ. · คลังข้อสอบ 3,600+ ข้อ
                  </p>
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100/90 flex flex-col gap-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">✓</span>
                  <span><strong>หน่วย ๑-๓:</strong> รูปและเสียงพยัญชนะ ๔๔ ตัว, ไตรยางศ์ ๓ หมู่, สระ, วรรณยุกต์</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">✓</span>
                  <span><strong>หน่วย ๔-๕:</strong> แจกลูกสะกดคำและผันวรรณยุกต์ในแม่ ก กา</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">✓</span>
                  <span><strong>หน่วย ๖-๗:</strong> ตัวสะกดตรงตามมาตรา ๘ มาตรา (กง กน กม เกย เกอว กก กด กบ)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">✓</span>
                  <span><strong>หน่วย ๘:</strong> ตัวสะกดไม่ตรงตามมาตรา (แม่กก กด กบ กน)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">✓</span>
                  <span><strong>หน่วย ๙-๑๐:</strong> อักษรควบแท้/ไม่แท้, อ นำ ย & ห นำ อักษรต่ำ</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('thai_phonics');
                }}
                className={`w-full py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer ${
                  selected === 'thai_phonics'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-emerald-200'
                    : 'bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700'
                }`}
              >
                <span>เข้าสู่ระบบแจกลูกสะกดคำ (สพฐ.)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Footer note & Remember toggle */}
          <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <label className="flex items-center gap-2 text-xs text-slate-600 font-bold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberChoice}
                onChange={(e) => setRememberChoice(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span>จำตัวเลือกนี้ไว้เป็นค่าเริ่มต้น (สามารถสลับหลักสูตรได้ตลอดเวลาจากเมนูด้านบน)</span>
            </label>

            <span className="text-[11px] text-slate-400 font-medium">
              💡 ครูและผู้ปกครองสามารถสลับหลักสูตรไปมาได้โดยไม่สูญเสียข้อมูล
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
