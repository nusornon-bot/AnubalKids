import React, { useState } from 'react';
import {
  X,
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Award,
} from 'lucide-react';
import { soundEffects, speakText } from '../services/audioService';

interface DiagnosticQuestion {
  id: number;
  question: string;
  word: string;
  options: string[];
  correctIndex: number;
  category: 'vowel_change' | 'indirect_final' | 'tone_rules' | 'cluster' | 'silent_mark';
  categoryName: string;
  explanation: string;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    question: 'คำว่า "กางเกง" พยางค์หลัง มีตัวสะกดอยู่ในมาตราใด?',
    word: 'กางเกง',
    options: ['แม่กม', 'แม่กง', 'แม่เกย', 'แม่กบ'],
    correctIndex: 1,
    category: 'indirect_final',
    categoryName: 'มาตราตัวสะกด',
    explanation: 'คำว่า เกง สะกดด้วย ง งู อยู่ในมาตราแม่กง',
  },
  {
    id: 2,
    question: 'คำว่า "เดิน" ใช้รูปสระใดที่เกิดการเปลี่ยนรูป?',
    word: 'เดิน',
    options: ['สระเออ (อ เปลี่ยนเป็นสระอิ)', 'สระเอีย', 'สระอัว', 'สระเอะ'],
    correctIndex: 0,
    category: 'vowel_change',
    categoryName: 'สระเปลี่ยนรูป/ลดรูป',
    explanation: 'สระเออ เมื่อมีตัวสะกด ตัว อ จะเปลี่ยนรูปเป็นสระอิ เช่น ด-เออ-น -> เดิน',
  },
  {
    id: 3,
    question: 'คำว่า "กล้วย" พยัญชนะต้นคู่ "กล" จัดเป็นคำประเภทใด?',
    word: 'กล้วย',
    options: ['อักษรนำ', 'คำควบแท้', 'คำควบไม่แท้', 'พยัญชนะเดี่ยว'],
    correctIndex: 1,
    category: 'cluster',
    categoryName: 'คำควบกล้ำ',
    explanation: 'ออกเสียง ก และ ล พร้อมกัน จัดเป็นอักษรควบแท้',
  },
  {
    id: 4,
    question: 'คำว่า "ม้า" เป็นอักษรต่ำ เมื่อใส่ไม้โท จะออกเสียงวรรณยุกต์ใด?',
    word: 'ม้า',
    options: ['เสียงโท', 'เสียงตรี', 'เสียงเอก', 'เสียงจัตวา'],
    correctIndex: 1,
    category: 'tone_rules',
    categoryName: 'การผันวรรณยุกต์อักษรต่ำ',
    explanation: 'อักษรต่ำ รูปวรรณยุกต์โท จะออกเสียงเป็น "เสียงตรี"',
  },
  {
    id: 5,
    question: 'คำว่า "จันทร์" เครื่องหมายบน ทร์ เรียกว่าอะไร และทำหน้าที่อะไร?',
    word: 'จันทร์',
    options: [
      'ทัณฑฆาต (ไม่ออกเสียงตัวอักษรนั้น)',
      'ไม้ไต่คู้ (ทำให้เสียงสั้น)',
      'นฤคหิต (เสียงสระอำ)',
      'ยามักการ',
    ],
    correctIndex: 0,
    category: 'silent_mark',
    categoryName: 'ตัวการันต์ / ทัณฑฆาต',
    explanation: 'เครื่องหมายทัณฑฆาต ( ์ ) กำกับบนพยัญชนะเพื่อไม่ออกเสียงพยัญชนะตัวนั้น',
  },
];

interface DiagnosticRemedialModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  onOpenWorksheets?: () => void;
  soundVolume?: number;
}

export const DiagnosticRemedialModal: React.FC<DiagnosticRemedialModalProps> = ({
  isOpen,
  onClose,
  studentName = 'นักเรียน',
  onOpenWorksheets,
  soundVolume = 1,
}) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentQ = DIAGNOSTIC_QUESTIONS[questionIndex];

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    soundEffects.play('pop');
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);
    setSelectedOption(null);

    if (questionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentStep('result');
      soundEffects.play('success');
    }
  };

  // Calculate Weak Points
  const weakCategories: string[] = [];
  const correctCount = userAnswers.reduce((count, ans, idx) => {
    const q = DIAGNOSTIC_QUESTIONS[idx];
    if (ans === q.correctIndex) {
      return count + 1;
    } else {
      if (!weakCategories.includes(q.categoryName)) {
        weakCategories.push(q.categoryName);
      }
      return count;
    }
  }, 0);

  const handlePrintRemedialSheet = () => {
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
      <div className="w-full max-w-2xl bg-white rounded-3xl border-3 border-amber-300 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-4 sm:p-5 text-white flex items-center justify-between gap-3 shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black">
                  ระบบวินิจฉัยจุดอ่อน & แผนสอนซ่อมเสริม (Diagnostic & Remedial Engine)
                </h2>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-200" />
                  <span>Personalized</span>
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                ค้นหาจุดสะดุดการอ่านเขียนภาษาไทยรายบุคคล พร้อมจัดทำชุดฝึกและใบงานซ่อมเสริมทันที
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

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {currentStep === 'intro' && (
            <div className="text-center space-y-4 py-4">
              <div className="w-20 h-20 bg-amber-100 text-amber-700 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-inner border border-amber-200">
                🔍
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-800">
                  แบบวินิจฉัยความแม่นยำภาษาไทย 5 ข้อสั้น
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  ระบบจะตรวจสอบว่านักเรียนมีความแม่นยำในจุดใด และจุดใดที่ยังสับสน (สระลดรูป, ตัวสะกด, วรรณยุกต์, คำควบกล้ำ, การันต์) เพื่อวางแผนซ่อมเสริมให้ตรงจุด
                </p>
              </div>

              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-left text-xs text-amber-900 space-y-1.5 max-w-md mx-auto">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <Target className="w-4 h-4 text-amber-600" />
                  <span>สิ่งที่จะได้รับหลังทำแบบทดสอบ:</span>
                </div>
                <p>• รายงานวิเคราะห์จุดที่มักสับสนรายบุคคล</p>
                <p>• แผนการสอนซ่อมเสริมเฉพาะบุคคล (Custom Remedial Plan)</p>
                <p>• สิทธิ์พิมพ์ใบงานซ่อมเสริมตรงจุด 1 คลิก</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEffects.play('pop');
                  setCurrentStep('quiz');
                }}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black rounded-2xl shadow-lg transition-all cursor-pointer transform hover:scale-105 active:scale-95"
              >
                เริ่มการวินิจฉัย (5 ข้อ)
              </button>
            </div>
          )}

          {currentStep === 'quiz' && (
            <div className="space-y-5">
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                <span>
                  ข้อที่ {questionIndex + 1} จาก {DIAGNOSTIC_QUESTIONS.length}
                </span>
                <span className="text-amber-600 bg-amber-100 px-2 py-0.5 rounded-md">
                  หมวด: {currentQ.categoryName}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{
                    width: `${((questionIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Card */}
              <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 text-center">
                <div className="text-3xl font-black text-gray-900 mb-2">{currentQ.word}</div>
                <h4 className="text-sm sm:text-base font-bold text-gray-800 leading-relaxed">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = selectedOption === oIdx;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(oIdx)}
                      className={`p-3.5 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-amber-400 hover:bg-amber-50/30'
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          isSelected ? 'bg-white text-amber-600' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {oIdx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>
                    {questionIndex === DIAGNOSTIC_QUESTIONS.length - 1 ? 'ดูผลการวินิจฉัย' : 'ข้อถัดไป'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 'result' && (
            <div className="space-y-5">
              {/* Result Summary Banner */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-5 text-white text-center shadow-lg">
                <span className="text-3xl">🏆</span>
                <h3 className="text-lg font-black mt-1">ผลการวินิจฉัยของ {studentName}</h3>
                <div className="text-2xl font-black my-1">
                  ได้ {correctCount} / {DIAGNOSTIC_QUESTIONS.length} คะแนน
                </div>
                <p className="text-xs text-emerald-100 font-medium">
                  {correctCount >= 4
                    ? 'ระดับความพร้อมยอดเยี่ยม! เข้าใจหลักการแจกลูกสะกดคำได้อย่างแม่นยำ'
                    : 'พบจุดที่ควรเสริมความมั่นใจเพิ่มเติม สามารถดูแผนซ่อมเสริมด้านล่างได้เลยครับ'}
                </p>
              </div>

              {/* Weak Points & Remedial Plan */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs space-y-3">
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-amber-600" />
                  <span>วิเคราะห์จุดที่ควรซ่อมเสริม (Remedial Focus Areas)</span>
                </h4>

                {weakCategories.length === 0 ? (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>ไม่พบจุดติดขัดร้ายแรง แนะนำให้เริ่มฝึกแจกลูกสะกดคำในระดับชั้นถัดไปได้ทันที!</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {weakCategories.map((cat, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs"
                      >
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-black text-rose-900">{cat}</div>
                          <div className="text-gray-600 text-[11px] mt-0.5">
                            แนะนำให้ฝึกซ้ำด้วยแบบฝึกหัดแจกลูกสะกดคำรหัสสี และฟังเสียงอ่านประกอบ
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 1-Click Remedial Worksheet Action */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-black text-amber-900">
                    📄 ใบงานซ่อมเสริมเฉพาะบุคคล (Remedial Worksheet PDF)
                  </h5>
                  <p className="text-[11px] text-amber-800">
                    สร้างชุดแบบฝึกหัดเฉพาะจุดอ่อนข้างต้น สำหรับนำไปพิมพ์ให้เด็กฝึกทำต่อ
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrintRemedialSheet}
                    className="px-4 py-2 bg-white hover:bg-gray-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>พิมพ์ใบงานนี้</span>
                  </button>
                  {onOpenWorksheets && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenWorksheets();
                      }}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <FileText className="w-4 h-4" />
                      <span>คลังใบงาน สพฐ. ทั้งหมด</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep('quiz');
                    setQuestionIndex(0);
                    setUserAnswers([]);
                  }}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>ทำแบบวินิจฉัยใหม่อีกครั้ง</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-xs font-black cursor-pointer shadow-md"
                >
                  เสร็จสิ้น
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
