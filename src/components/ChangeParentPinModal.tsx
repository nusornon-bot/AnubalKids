import React, { useState } from 'react';
import { Key, X, Check, AlertCircle, ShieldCheck } from 'lucide-react';
import { storageService, DEFAULT_PARENT_PIN } from '../services/storageService';
import { soundEffects } from '../services/audioService';

interface ChangeParentPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundVolume?: number;
}

export const ChangeParentPinModal: React.FC<ChangeParentPinModalProps> = ({
  isOpen,
  onClose,
  soundVolume = 0.7,
}) => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // 1. Verify current PIN
    if (!storageService.verifyParentPin(currentPin)) {
      soundEffects.playIncorrect(soundVolume);
      setErrorMsg(`รหัส PIN ปัจจุบันไม่ถูกต้อง (รหัสเริ่มต้น: ${DEFAULT_PARENT_PIN})`);
      return;
    }

    // 2. Validate new PIN format
    if (!/^\d{4}$/.test(newPin)) {
      soundEffects.playIncorrect(soundVolume);
      setErrorMsg('รหัส PIN ใหม่ต้องเป็นตัวเลข 4 หลักเท่านั้น');
      return;
    }

    // 3. Confirm matches
    if (newPin !== confirmPin) {
      soundEffects.playIncorrect(soundVolume);
      setErrorMsg('รหัส PIN ใหม่ทั้งสองช่องไม่ตรงกัน');
      return;
    }

    // 4. Save
    const ok = storageService.setParentPin(newPin);
    if (ok) {
      soundEffects.playCorrect(soundVolume);
      setSuccessMsg('เปลี่ยนรหัส PIN 4 หลักเรียบร้อยแล้ว! 🔒✨');
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setErrorMsg('เกิดข้อผิดพลาดในการบันทึก โปรดลองใหม่อีกครั้ง');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-70 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-xl shadow-xs">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-100">
                PARENT ZONE PIN
              </div>
              <h3 className="text-base font-black">เปลี่ยนรหัส PIN 4 หลัก</h3>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3.5 bg-slate-50">
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">
              1. รหัส PIN ปัจจุบัน:
            </label>
            <input
              type="password"
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
              autoFocus
              placeholder="กรอก PIN เดิม (เริ่มต้น: 1234)"
              value={currentPin}
              onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, ''))}
              className="w-full text-center text-lg font-black tracking-widest py-2 px-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">
              2. รหัส PIN ใหม่ (4 หลัก):
            </label>
            <input
              type="password"
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="ตัวเลข 4 หลัก เช่น 5678"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
              className="w-full text-center text-lg font-black tracking-widest py-2 px-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">
              3. ยืนยันรหัส PIN ใหม่อีกครั้ง:
            </label>
            <input
              type="password"
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="กรอก PIN ใหม่อีกครั้ง"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              className="w-full text-center text-lg font-black tracking-widest py-2 px-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-300 rounded-xl px-3 py-2 flex items-center gap-2 text-rose-700 text-xs font-bold animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2 flex items-center gap-2 text-emerald-800 text-xs font-bold animate-in fade-in">
              <Check className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-black text-xs shadow-md transition-all cursor-pointer"
            >
              บันทึก PIN ใหม่ 🔒
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
