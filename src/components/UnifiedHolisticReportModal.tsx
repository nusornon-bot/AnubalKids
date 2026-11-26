import React, { useState } from 'react';
import {
  X,
  Award,
  Sparkles,
  Printer,
  TrendingUp,
  Brain,
  BookOpen,
  Heart,
  Smile,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  BarChart3,
  Users,
} from 'lucide-react';
import { ChildProfile, Grade } from '../types';

interface UnifiedHolisticReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentProfile?: ChildProfile | null;
  currentGrade?: Grade;
}

export const UnifiedHolisticReportModal: React.FC<UnifiedHolisticReportModalProps> = ({
  isOpen,
  onClose,
  studentProfile,
  currentGrade = 'P1',
}) => {
  const [activeTab, setActiveTab] = useState<'holistic' | 'k_early' | 'cbe' | 'phonics'>('holistic');

  const studentName = studentProfile?.name || 'น้องฟ้าใส ปัญญาดี';
  const gradeLabel = currentGrade.startsWith('K')
    ? `ชั้นอนุบาลปีที่ ${currentGrade.replace('K', '')}`
    : `ชั้นประถมศึกษาปีที่ ${currentGrade.replace('P', '')}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-cyan-800 to-indigo-900 text-white p-5 flex items-center justify-between shadow-md print:bg-white print:text-black">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
              🌟
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950">
                  ระบบแฟ้มสะสมงานผู้เรียนองค์รวม (Holistic Portfolio)
                </span>
                <span className="text-xs text-white/80">อ.๑ - ป.๖ (K-6 Continuous Growth)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                รายงานพัฒนาการองค์รวม: {studentName} ({gradeLabel})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              title="พิมพ์เอกสารแฟ้มสะสมงาน A4"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์รายงาน A4</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors text-white/90 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="bg-slate-100 p-2 sm:px-6 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('holistic')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                activeTab === 'holistic'
                  ? 'bg-teal-700 text-white ring-2 ring-teal-300'
                  : 'bg-white text-slate-700 hover:bg-teal-50'
              }`}
            >
              <span>🌟</span>
              <span>ภาพรวม ๓ เสาหลัก (อ.๑ - ป.๖)</span>
            </button>

            <button
              onClick={() => setActiveTab('k_early')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                activeTab === 'k_early'
                  ? 'bg-amber-600 text-white ring-2 ring-amber-300'
                  : 'bg-white text-slate-700 hover:bg-amber-50'
              }`}
            >
              <span>🧸</span>
              <span>๑. ความพร้อมปฐมวัย (๘ ทักษะ)</span>
            </button>

            <button
              onClick={() => setActiveTab('phonics')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                activeTab === 'phonics'
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                  : 'bg-white text-slate-700 hover:bg-emerald-50'
              }`}
            >
              <span>📖</span>
              <span>๒. แจกลูกสะกดคำ สพฐ. (๑๐ หน่วย)</span>
            </button>

            <button
              onClick={() => setActiveTab('cbe')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                activeTab === 'cbe'
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                  : 'bg-white text-slate-700 hover:bg-indigo-50'
              }`}
            >
              <span>🎓</span>
              <span>๓. สมรรถนะผู้เรียน CBE (๖ ด้าน)</span>
            </button>
          </div>
        </div>

        {/* Scrollable Report Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* HOLISTIC TAB */}
          {activeTab === 'holistic' && (
            <>
              {/* Continuous Journey Progression */}
              <div className="bg-gradient-to-r from-slate-50 via-teal-50/50 to-indigo-50/50 p-5 rounded-2xl border border-teal-100 shadow-sm">
                <h3 className="text-sm font-black text-slate-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  <span>เส้นทางพัฒนาการต่อเนื่องตลอดช่วงวัย (Continuous Learning Roadmap)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Stage 1: Kindergarten */}
                  <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-black">
                        ๑
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm">ปฐมวัย (อ.๑ - อ.๓)</h4>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">
                      ความพร้อมกล้ามเนื้อมือ สายตาสัมพันธ์กับมือ อารมณ์ สังคม และสมาธิ
                    </p>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[94%]" />
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 mt-1 block">
                      ระดับความพร้อม: 94% (ยอดเยี่ยม)
                    </span>
                  </div>

                  {/* Stage 2: Lower Primary */}
                  <div className="p-4 bg-white rounded-xl border border-emerald-200 shadow-xs ring-2 ring-emerald-400/40">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-black">
                        ๒
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm">ประถมต้น (ป.๑ - ป.๓)</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        ระดับปัจจุบัน
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">
                      อ่านออกเขียนได้ด้วยการแจกลูกสะกดคำ สพฐ. ควบคู่กับสมรรถนะการใช้ชีวิต
                    </p>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[88%]" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 mt-1 block">
                      ความเชี่ยวชาญการสะกดคำ: 88% (ดีเยี่ยม)
                    </span>
                  </div>

                  {/* Stage 3: Upper Primary */}
                  <div className="p-4 bg-white rounded-xl border border-indigo-200 shadow-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center text-sm font-black">
                        ๓
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm">ประถมปลาย (ป.๔ - ป.๖)</h4>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">
                      การแก้ปัญหาซับซ้อน การสื่อสารเชิงวิพากษ์ และความเป็นพลเมืองเข้มแข็ง
                    </p>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full w-[82%]" />
                    </div>
                    <span className="text-[11px] font-bold text-indigo-700 mt-1 block">
                      สมรรถนะขั้นสูง: 82% (พร้อมก้าวหน้า)
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Pillars Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Pillar 1 */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-200 text-amber-900">
                        เสาที่ ๑: ปฐมวัย
                      </span>
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="font-black text-slate-800 text-base mb-1">พัฒนาการ ๘ ด้าน</h4>
                    <p className="text-xs text-slate-600 mb-4">
                      กล้ามเนื้อมือผ่านการลากเส้น Air-Writing, สมาธิ, มิติสัมพันธ์ และสติปัญญา
                    </p>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span>กล้ามเนื้อมือ & คัดลายมือ:</span>
                        <b className="text-amber-800">95%</b>
                      </div>
                      <div className="flex justify-between">
                        <span>การคิดรวบยอด & ตรรกะ:</span>
                        <b className="text-amber-800">92%</b>
                      </div>
                      <div className="flex justify-between">
                        <span>อารมณ์และสังคม:</span>
                        <b className="text-amber-800">90%</b>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-200 text-center">
                    <span className="text-xs font-black text-amber-900">ระดับความพร้อม: ยอดเยี่ยม ⭐⭐⭐</span>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-900">
                        เสาที่ ๒: สพฐ. แจกลูกสะกดคำ
                      </span>
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h4 className="font-black text-slate-800 text-base mb-1">ความรอบรู้ภาษาไทย (๑๐ หน่วย)</h4>
                    <p className="text-xs text-slate-600 mb-4">
                      ผันวรรณยุกต์ ตัวสะกดตรง/ไม่ตรงมาตรา คำควบกล้ำ และอักษรนำ
                    </p>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span>พยัญชนะ สระ วรรณยุกต์:</span>
                        <b className="text-emerald-800">98%</b>
                      </div>
                      <div className="flex justify-between">
                        <span>ตัวสะกดตรง/ไม่ตรงมาตรา:</span>
                        <b className="text-emerald-800">86%</b>
                      </div>
                      <div className="flex justify-between">
                        <span>คำควบกล้ำ & อักษรนำ:</span>
                        <b className="text-emerald-800">84%</b>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-emerald-200 text-center">
                    <span className="text-xs font-black text-emerald-900">
                      ระดับการรู้หนังสือ: อ่านคล่องเขียนได้ 🌟
                    </span>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-200 text-indigo-900">
                        เสาที่ ๓: CBE สมรรถนะ
                      </span>
                      <Brain className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h4 className="font-black text-slate-800 text-base mb-1">๖ สมรรถนะหลักสากล</h4>
                    <p className="text-xs text-slate-600 mb-4">
                      การจัดการตนเอง, การคิดขั้นสูง, การสื่อสาร, การรวมพลังทำงานเป็นทีม
                    </p>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span>การจัดการตนเอง (Self-Reg):</span>
                        <b className="text-indigo-800">90%</b>
                      </div>
                      <div className="flex justify-between">
                        <span>การคิดขั้นสูง (Thinking):</span>
                        <b className="text-indigo-800">85%</b>
                      </div>
                      <div className="flex justify-between">
                        <span>การรวมพลังทำงานเป็นทีม:</span>
                        <b className="text-indigo-800">88%</b>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-indigo-200 text-center">
                    <span className="text-xs font-black text-indigo-900">ระดับสมรรถนะ: เชี่ยวชาญ (Proficient) 🎯</span>
                  </div>
                </div>
              </div>

              {/* Qualitative Observations & Next Action Plan */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h4 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-2">
                  <Smile className="w-4 h-4 text-teal-600" />
                  <span>บันทึกความเห็นของครูผู้สอนและแนวทางเสริมพลัง (Teacher's Growth Notes)</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  นักเรียนมีความก้าวหน้าอย่างโดดเด่นในการผสมคำแจกลูกสะกดคำ สามารถแยกแยะเสียงพยัญชนะต้นและสระได้อย่างแม่นยำ
                  มีสมาธิจดจ่อและควบคุมกล้ามเนื้อมือได้ดีผ่านการฝึก Air-Writing และมินิเกม
                  แนะนำให้ส่งเสริมการอ่านคำประสมที่มีตัวสะกดไม่ตรงมาตราเพิ่มเติมในหน่วยที่ ๘ และคำควบกล้ำ ร, ล, ว เพื่อต่อยอดสู่การสื่อสารขั้นสูง
                </p>
              </div>
            </>
          )}

          {/* DETAIL TABS FOR INDIVIDUAL CURRICULUMS */}
          {activeTab === 'k_early' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-800">ผลการประเมิน ๘ ทักษะพัฒนาการปฐมวัย</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { name: '๑. ภาษาและการรู้หนังสือ', score: 94, status: 'ยอดเยี่ยม' },
                  { name: '๒. การคิดรวบยอดและการคิดเชิงคณิตศาสตร์', score: 92, status: 'ยอดเยี่ยม' },
                  { name: '๓. การคิดแก้ปัญหาและการตัดสินใจ', score: 88, status: 'ดีมาก' },
                  { name: '๔. การแสวงหาความรู้', score: 90, status: 'ยอดเยี่ยม' },
                  { name: '๕. จินตนาการและความคิดสร้างสรรค์', score: 95, status: 'ยอดเยี่ยม' },
                  { name: '๖. ร่างกาย สุขนิสัย และกล้ามเนื้อ (Hand Tracking)', score: 96, status: 'ยอดเยี่ยม' },
                  { name: '๗. อารมณ์ ความรู้สึก และจิตใจ', score: 89, status: 'ดีมาก' },
                  { name: '๘. สังคม การอยู่ร่วมกับผู้อื่น', score: 91, status: 'ยอดเยี่ยม' },
                ].map((s) => (
                  <div key={s.name} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <span className="font-semibold text-slate-700">{s.name}</span>
                    <span className="font-bold text-amber-700">{s.score}% ({s.status})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'phonics' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-800">ผลการประเมินการแจกลูกสะกดคำ สพฐ. (๑๐ หน่วย)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { unit: 'หน่วย ๑: พยัญชนะไทย ๔๔ ตัว', score: 100 },
                  { unit: 'หน่วย ๒: สระ ๓๒ เสียง ๑๖ รูป', score: 96 },
                  { unit: 'หน่วย ๓: วรรณยุกต์ ๔ รูป ๕ เสียง', score: 92 },
                  { unit: 'หน่วย ๔: แจกลูกสะกดคำแม่ ก กา', score: 95 },
                  { unit: 'หน่วย ๕: ผันวรรณยุกต์อักษร ๓ หมู่', score: 88 },
                  { unit: 'หน่วย ๖: ตัวสะกดตรงมาตรา (กง กม เกย เกอว)', score: 90 },
                  { unit: 'หน่วย ๗: ผันวรรณยุกต์คำมีตัวสะกด', score: 86 },
                  { unit: 'หน่วย ๘: ตัวสะกดไม่ตรงมาตรา (กก กด กบ กน)', score: 84 },
                  { unit: 'หน่วย ๙: คำควบกล้ำและอักษรนำ', score: 82 },
                  { unit: 'หน่วย ๑๐: คำประสมและความหมาย', score: 89 },
                ].map((u) => (
                  <div key={u.unit} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex justify-between items-center">
                    <span className="font-semibold text-emerald-900">{u.unit}</span>
                    <span className="font-bold text-emerald-800">{u.score}% ผ่านเกณฑ์</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cbe' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-800">ผลการประเมิน ๖ สมรรถนะผู้เรียน CBE</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { name: 'สมรรถนะที่ ๑: การจัดการตนเอง (Self-Management)', level: 'ระดับเชี่ยวชาญ (Level 3)' },
                  { name: 'สมรรถนะที่ ๒: การคิดขั้นสูง (Higher-Order Thinking)', level: 'ระดับคล่องแคล่ว (Level 3)' },
                  { name: 'สมรรถนะที่ ๓: การสื่อสาร (Communication)', level: 'ระดับคล่องแคล่ว (Level 3)' },
                  { name: 'สมรรถนะที่ ๔: การรวมพลังทำงานเป็นทีม (Teamwork)', level: 'ระดับเชี่ยวชาญ (Level 4)' },
                  { name: 'สมรรถนะที่ ๕: การเป็นพลเมืองที่เข้มแข็ง (Active Citizenship)', level: 'ระดับเข้าใจ (Level 2)' },
                  { name: 'สมรรถนะที่ ๖: การอยู่ร่วมกับธรรมชาติ (Sustainable Living)', level: 'ระดับคล่องแคล่ว (Level 3)' },
                ].map((c) => (
                  <div key={c.name} className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200 flex justify-between items-center">
                    <span className="font-semibold text-indigo-900">{c.name}</span>
                    <span className="font-bold text-indigo-800">{c.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>สถาบันภาษาไทย สพฐ. & สำนักงานเลขาธิการสภาการศึกษา (สกศ.) กระทรวงศึกษาธิการ</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
