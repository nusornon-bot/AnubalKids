import React, { useState } from 'react';
import { Download, Share, PlusSquare, X, CheckCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'compact';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'compact',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  // If already running standalone, no need to prompt installation
  if (isInstalled) {
    return null;
  }

  // If not installable and not iOS, don't show unless user can install
  if (!isInstallable && !isIOS) {
    return null;
  }

  const handleClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
    } else {
      await install();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-black text-xs transition-all cursor-pointer shadow-2xs active:scale-95 ${
          variant === 'primary'
            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xs'
            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
        } ${className}`}
        title="ติดตั้งแอปลงเครื่องเพื่อเล่นแบบออฟไลน์และเปิดได้เร็วขึ้น"
      >
        <Download className="w-3.5 h-3.5" />
        <span>ติดตั้งแอป</span>
      </button>

      {/* iOS Installation Instruction Modal */}
      {showIOSModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setShowIOSModal(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border-3 border-emerald-200 text-slate-800 flex flex-col gap-4 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <h3 className="text-base font-black text-slate-900">ติดตั้งบน iPhone / iPad</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-bold">
              ติดตั้งเพื่อเล่นเต็มจอ ไม่ต้องต่อเน็ต และเปิดใช้งานได้สะดวกรวดเร็ว:
            </p>

            <ol className="space-y-3 text-xs text-slate-700 font-bold bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200">
              <li className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                  1
                </span>
                <span className="flex items-center gap-1.5">
                  แตะปุ่มแชร์ <Share className="w-4 h-4 text-sky-600" /> ที่แถบเมนู Safari
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                  2
                </span>
                <span className="flex items-center gap-1.5">
                  เลื่อนลงแล้วเลือก <PlusSquare className="w-4 h-4 text-emerald-600" /> &quot;เพิ่มไปยังหน้าจอโฮม&quot;
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                  3
                </span>
                <span>แตะ &quot;เพิ่ม (Add)&quot; ที่มุมขวาบน พร้อมเล่นได้ทันที!</span>
              </li>
            </ol>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all cursor-pointer shadow-xs active:scale-95"
            >
              เข้าใจแล้ว
            </button>
          </div>
        </div>
      )}
    </>
  );
};
