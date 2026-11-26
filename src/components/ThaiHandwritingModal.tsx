import React from 'react';
import { Grade, HandPoint, ChildProfile } from '../types';
import { ThaiHandwritingView, AlphabetType, EnglishCase } from './skillgames/ThaiHandwritingView';
import { X, Sparkles } from 'lucide-react';

interface ThaiHandwritingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade?: Grade;
  soundVolume?: number;
  onEarnStar?: () => void;
  externalHandPoint?: HandPoint | null;
  studentProfile?: ChildProfile | null;
  initialAlphabet?: AlphabetType;
  initialCase?: EnglishCase;
}

export const ThaiHandwritingModal: React.FC<ThaiHandwritingModalProps> = ({
  isOpen,
  onClose,
  currentGrade = 'K2',
  soundVolume = 0.8,
  onEarnStar,
  externalHandPoint = null,
  studentProfile = null,
  initialAlphabet = 'thai',
  initialCase = 'uppercase',
}) => {
  if (!isOpen) return null;

  const isEnglish = initialAlphabet === 'english';

  return (
    <div
      id="thai-handwriting-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[95vh] border-3 ${
          isEnglish ? 'border-indigo-300' : 'border-amber-300'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`p-3.5 sm:p-4 text-white flex items-center justify-between gap-3 shrink-0 shadow-sm ${
            isEnglish
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700'
              : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
              {isEnglish ? '🔤' : '✍️'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black leading-tight">
                  {isEnglish
                    ? 'การเขียนตัวอักษรภาษาอังกฤษ (Hand Tracking A-Z)'
                    : 'การเขียนคัดลายมือไทย (Hand Tracking)'}
                </h2>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1 uppercase">
                  <Sparkles className="w-3 h-3 text-yellow-200" />
                  <span>
                    {isEnglish ? 'A-Z 26 ตัว (พิมพ์ใหญ่/เล็ก)' : 'ก ถึง ฮ 44 ตัว'}
                  </span>
                </span>
              </div>
              <p
                className={`text-[11px] font-medium ${
                  isEnglish ? 'text-indigo-100' : 'text-amber-100'
                }`}
              >
                {isEnglish
                  ? 'ฝึกเขียนตัวอักษรภาษาอังกฤษ A-Z บนหน้าจอด้วยกล้องจับมือ พร้อมเสียงอ่านออกเสียง Phonics และคำศัพท์'
                  : 'ฝึกเขียนพยัญชนะไทยบนหน้าจอด้วยกล้องจับมือ มีเส้นประนำทาง 5 เส้น และระบบประเมินความแม่นยำ'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="ปิดหน้าต่างคัดลายมือ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div
          className={`p-3 sm:p-5 overflow-y-auto flex-1 bg-gradient-to-b ${
            isEnglish ? 'from-indigo-50/20 to-white' : 'from-amber-50/20 to-white'
          }`}
        >
          <ThaiHandwritingView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={onEarnStar}
            externalHandPoint={externalHandPoint}
            onClose={onClose}
            studentProfile={studentProfile}
            initialAlphabet={initialAlphabet}
            initialCase={initialCase}
          />
        </div>
      </div>
    </div>
  );
};
