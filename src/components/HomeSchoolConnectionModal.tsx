import React, { useState } from 'react';
import {
  X,
  QrCode,
  Smartphone,
  Heart,
  Share2,
  Printer,
  Sparkles,
  BookOpen,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface HomeSchoolConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  gradeLevel?: string;
  todaySummary?: {
    phonicsUnit: string;
    wordsLearned: number;
    handwritingScore: number;
    starsCollected: number;
  };
}

export const HomeSchoolConnectionModal: React.FC<HomeSchoolConnectionModalProps> = ({
  isOpen,
  onClose,
  studentName = 'น้องต้นกล้า',
  gradeLevel = 'ป.๑',
  todaySummary = {
    phonicsUnit: 'หน่วยที่ ๔: มาตราตัวสะกดตรงมาตรา (แม่กน, แม่เกย)',
    wordsLearned: 12,
    handwritingScore: 92,
    starsCollected: 15,
  },
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    soundEffects.play('pop');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrintHomework = () => {
    soundEffects.play('pop');
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl border-3 border-teal-300 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 p-4 sm:p-5 text-white flex items-center justify-between gap-3 shadow-md shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
              📱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black">
                  เชื่อมโยงการบ้านสู่ผู้ปกครอง (Home-School Connection)
                </h2>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>QR Code & Coaching</span>
                </span>
              </div>
              <p className="text-xs text-teal-100 font-medium">
                ให้ผู้ปกครองสแกนเปิดดูสรุปพัฒนาการประจำวัน พร้อมภารกิจการบ้านเสริมที่บ้าน
              </p>
            </div>
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

        {/* Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-gray-800">
          {/* Top QR & Quick Access Card */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-5 border-2 border-teal-200 flex flex-col sm:flex-row items-center gap-5">
            {/* SVG Visual QR Code representation */}
            <div className="bg-white p-3 rounded-2xl border-2 border-teal-300 shadow-md shrink-0 flex flex-col items-center">
              <svg
                className="w-32 h-32"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Visual QR Pattern */}
                <rect width="100" height="100" fill="white" />
                {/* Top-Left Position marker */}
                <rect x="10" y="10" width="25" height="25" rx="3" fill="#0f766e" />
                <rect x="15" y="15" width="15" height="15" rx="2" fill="white" />
                <rect x="18" y="18" width="9" height="9" rx="1" fill="#0f766e" />
                {/* Top-Right Position marker */}
                <rect x="65" y="10" width="25" height="25" rx="3" fill="#0f766e" />
                <rect x="70" y="15" width="15" height="15" rx="2" fill="white" />
                <rect x="73" y="18" width="9" height="9" rx="1" fill="#0f766e" />
                {/* Bottom-Left Position marker */}
                <rect x="10" y="65" width="25" height="25" rx="3" fill="#0f766e" />
                <rect x="15" y="70" width="15" height="15" rx="2" fill="white" />
                <rect x="18" y="73" width="9" height="9" rx="1" fill="#0f766e" />
                {/* Decorative Data Nodes */}
                <rect x="40" y="12" width="6" height="6" fill="#0f766e" />
                <rect x="50" y="18" width="8" height="8" fill="#0f766e" />
                <rect x="42" y="30" width="10" height="6" fill="#0f766e" />
                <rect x="58" y="30" width="6" height="6" fill="#0f766e" />
                <rect x="40" y="44" width="8" height="8" fill="#0f766e" />
                <rect x="52" y="48" width="8" height="8" fill="#0f766e" />
                <rect x="66" y="44" width="8" height="6" fill="#0f766e" />
                <rect x="78" y="52" width="10" height="6" fill="#0f766e" />
                <rect x="40" y="66" width="6" height="10" fill="#0f766e" />
                <rect x="50" y="70" width="12" height="6" fill="#0f766e" />
                <rect x="66" y="66" width="6" height="6" fill="#0f766e" />
                <rect x="78" y="72" width="8" height="8" fill="#0f766e" />
                <rect x="88" y="66" width="4" height="4" fill="#0f766e" />
                {/* Center mascot icon */}
                <circle cx="50" cy="50" r="8" fill="#f59e0b" />
                <text x="50" y="53" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">
                  ★
                </text>
              </svg>
              <span className="text-[10px] font-black text-teal-800 mt-1 flex items-center gap-1">
                <QrCode className="w-3 h-3" />
                <span>สแกนด้วยกล้องมือถือ</span>
              </span>
            </div>

            {/* Explanatory text */}
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-base font-black text-teal-950">
                เปิดรายงานประจำวันของ {studentName} ({gradeLevel})
              </h3>
              <p className="text-xs text-teal-800 leading-relaxed font-medium">
                ผู้ปกครองเปิดกล้องโทรศัพท์มือถือส่องที่ QR Code เพื่อดูสถิติการเรียน ผลงานคัดลายมือ และรับฟังเสียงอ่านของน้องได้ทันที
              </p>
              <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3.5 py-1.5 bg-white hover:bg-gray-50 border border-teal-300 rounded-xl text-xs font-bold text-teal-900 flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'คัดลอกลิงก์แล้ว!' : 'คัดลอกลิงก์ส่ง LINE'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Today's Learning Recap */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
            <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>สรุปสิ่งที่เรียนรู้ในวันนี้</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 text-center">
                <div className="text-gray-500 font-bold text-[11px]">บทเรียนหลัก</div>
                <div className="font-black text-teal-900 mt-1 truncate">แม่กน & แม่เกย</div>
              </div>
              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 text-center">
                <div className="text-gray-500 font-bold text-[11px]">สะกดคำสำเร็จ</div>
                <div className="font-black text-teal-900 mt-1">{todaySummary.wordsLearned} คำ</div>
              </div>
              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 text-center">
                <div className="text-gray-500 font-bold text-[11px]">ความแม่นยำคัดมือ</div>
                <div className="font-black text-emerald-700 mt-1">{todaySummary.handwritingScore}%</div>
              </div>
              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 text-center">
                <div className="text-gray-500 font-bold text-[11px]">ดาวสะสมวันนี้</div>
                <div className="font-black text-amber-600 mt-1">+{todaySummary.starsCollected} ⭐</div>
              </div>
            </div>
          </div>

          {/* Parent Coaching Tip & Family Mission */}
          <div className="bg-amber-50 rounded-2xl border-2 border-amber-200 p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-950 font-black text-xs sm:text-sm">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>ภารกิจครอบครัวชวนคุย & เคล็ดลับการสอนสะกดคำ (Parent Coaching Tip)</span>
            </div>

            <div className="text-xs text-amber-900 space-y-2 leading-relaxed">
              <p>
                <strong>🏠 ภารกิจสนุกที่บ้าน:</strong> ลองชวนน้องตามหาของใช้หรือของกินในบ้านที่มีเสียงสะกดแม่เกย (มี ย ยักษ์ สะกด) เช่น <em>"ถ้วย, กล้วย, เนย, ควาย"</em> วันละ ๓ คำ เพื่อเชื่อมโยงคำศัพท์กับชีวิตจริง
              </p>
              <p>
                <strong>💡 เคล็ดลับ สพฐ.:</strong> เวลาสอนน้องสะกดคำ ให้เน้นออกเสียงพยัญชนะต้นก่อน เช่น <em>"กอ - อา - นอ - กาน"</em> แทนการสะกดแบบเดิม (กอ-นอ-อา) เพื่อให้น้องมองเห็นโครงสร้างคำและจำรูปสระได้ง่ายขึ้นครับ
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3 text-xs text-gray-600 print:hidden shrink-0">
          <button
            type="button"
            onClick={handlePrintHomework}
            className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์ใบภารกิจครอบครัว</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl cursor-pointer shadow-sm"
          >
            เรียบร้อย
          </button>
        </div>
      </div>
    </div>
  );
};
