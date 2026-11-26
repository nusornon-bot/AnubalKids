import React, { useState, useEffect, useCallback } from 'react';
import { Lock, X, Delete, Check, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { storageService, DEFAULT_PARENT_PIN } from '../services/storageService';
import { soundEffects } from '../services/audioService';

interface ParentPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
  actionLabel?: string;
  soundVolume?: number;
}

export const ParentPinModal: React.FC<ParentPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'ยืนยันรหัส PIN ผู้ปกครอง (Parent Zone)',
  description = 'กรุณากรอกรหัส PIN 4 หลักเพื่อยืนยันการดำเนินการที่มีความสำคัญ',
  actionLabel = 'ยืนยัน',
  soundVolume = 0.7,
}) => {
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showDigits, setShowDigits] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPin('');
      setIsError(false);
      setErrorMsg('');
      setIsShaking(false);
    }
  }, [isOpen]);

  const verifyPin = useCallback(
    (pinToTest: string) => {
      if (storageService.verifyParentPin(pinToTest)) {
        soundEffects.playCorrect(soundVolume);
        setIsError(false);
        onSuccess();
        onClose();
      } else {
        soundEffects.playIncorrect(soundVolume);
        setIsError(true);
        setErrorMsg(`รหัส PIN 4 หลักไม่ถูกต้อง (รหัสเริ่มต้นคือ ${DEFAULT_PARENT_PIN})`);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setPin('');
      }
    },
    [onClose, onSuccess, soundVolume]
  );

  const handleDigitPress = useCallback(
    (digit: string) => {
      if (pin.length >= 4) return;
      soundEffects.playTap(soundVolume);
      setIsError(false);
      const nextPin = pin + digit;
      setPin(nextPin);

      // Auto-verify when 4th digit is entered
      if (nextPin.length === 4) {
        setTimeout(() => {
          verifyPin(nextPin);
        }, 120);
      }
    },
    [pin, soundVolume, verifyPin]
  );

  const handleDelete = useCallback(() => {
    if (pin.length === 0) return;
    soundEffects.playTap(soundVolume);
    setIsError(false);
    setPin((prev) => prev.slice(0, -1));
  }, [pin.length, soundVolume]);

  const handleClear = useCallback(() => {
    soundEffects.playTap(soundVolume);
    setPin('');
    setIsError(false);
    setErrorMsg('');
  }, [soundVolume]);

  // Keyboard support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigitPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && pin.length === 4) {
        verifyPin(pin);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDelete, handleDigitPress, isOpen, onClose, pin, verifyPin]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200"
    >
      <div
        className={`w-full max-w-sm bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col transition-all ${
          isShaking ? 'animate-shake' : 'animate-in zoom-in-95 duration-200'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-xl shadow-xs">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-100 flex items-center gap-1">
                <span>🛡️ PARENT ZONE SECURITY</span>
              </div>
              <h3 className="text-sm sm:text-base font-black truncate">{title}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col items-center bg-slate-50 select-none">
          <p className="text-xs text-slate-600 text-center font-medium mb-4 max-w-xs leading-relaxed">
            {description}
          </p>

          {/* 4 Digit Boxes */}
          <div className="flex items-center gap-3 mb-2">
            {[0, 1, 2, 3].map((index) => {
              const digit = pin[index];
              const isFilled = digit !== undefined;
              return (
                <div
                  key={index}
                  className={`w-12 h-14 sm:w-13 sm:h-15 rounded-2xl flex items-center justify-center text-2xl font-black transition-all border-2 ${
                    isFilled
                      ? 'border-amber-500 bg-white text-slate-900 shadow-xs scale-105 ring-2 ring-amber-200'
                      : 'border-slate-200 bg-white/80 text-slate-400'
                  }`}
                >
                  {isFilled ? (showDigits ? digit : '●') : ''}
                </div>
              );
            })}
          </div>

          {/* Toggle show/hide PIN digits */}
          <button
            type="button"
            onClick={() => setShowDigits(!showDigits)}
            className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 mb-3 py-1 px-2.5 rounded-lg hover:bg-slate-200/60 cursor-pointer transition-colors"
          >
            {showDigits ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-amber-600" />}
            <span>{showDigits ? 'ซ่อนตัวเลข PIN' : 'แสดงตัวเลข PIN'}</span>
          </button>

          {/* Error Message */}
          {isError && (
            <div className="w-full bg-rose-50 border border-rose-300 rounded-xl px-3 py-1.5 mb-3 flex items-center gap-2 text-rose-700 text-xs font-bold animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Numeric Keypad */}
          <div className="w-full max-w-[260px] grid grid-cols-3 gap-2 mt-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleDigitPress(num)}
                className="h-12 rounded-2xl bg-white hover:bg-amber-50 border border-slate-200 text-slate-800 font-black text-lg shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              >
                {num}
              </button>
            ))}

            {/* Clear Button */}
            <button
              type="button"
              onClick={handleClear}
              className="h-12 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 font-bold text-xs shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              ล้าง
            </button>

            {/* Zero */}
            <button
              type="button"
              onClick={() => handleDigitPress('0')}
              className="h-12 rounded-2xl bg-white hover:bg-amber-50 border border-slate-200 text-slate-800 font-black text-lg shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              0
            </button>

            {/* Backspace Delete */}
            <button
              type="button"
              onClick={handleDelete}
              className="h-12 rounded-2xl bg-white hover:bg-rose-50 border border-slate-200 text-slate-600 hover:text-rose-600 font-bold text-sm shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              title="ลบตัวเลขล่าสุด"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>

          {/* Hint Footer */}
          <div className="mt-4 pt-3 border-t border-slate-200 w-full flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>PIN เริ่มต้น: <strong>1234</strong></span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900 font-bold cursor-pointer hover:underline"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
