import React, { useEffect } from 'react';
import { Volume2, VolumeX, X, Keyboard } from 'lucide-react';

interface ClassroomAudioMuteHudProps {
  isMuted: boolean;
  volume: number;
  onDismiss: () => void;
  onToggleMute: () => void;
}

export const ClassroomAudioMuteHud: React.FC<ClassroomAudioMuteHudProps> = ({
  isMuted,
  volume,
  onDismiss,
  onToggleMute,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 2600);
    return () => clearTimeout(timer);
  }, [isMuted, volume, onDismiss]);

  return (
    <aside
      aria-label="Classroom sound status"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] max-w-[92vw] sm:max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-200 pointer-events-auto select-none"
    >
      <div
        className={`rounded-2xl p-3 sm:p-3.5 shadow-2xl border-2 sm:border-3 backdrop-blur-md flex items-center justify-between gap-3 transition-colors ${
          isMuted
            ? 'bg-slate-900/95 text-white border-rose-500 shadow-rose-950/40'
            : 'bg-emerald-950/95 text-white border-emerald-400 shadow-emerald-950/40'
        }`}
      >
        {/* Status Icon */}
        <div
          onClick={onToggleMute}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 cursor-pointer transition-transform active:scale-90 ${
            isMuted
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
          }`}
          title="คลิกเพื่อสลับสถานะเสียง"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <Volume2 className="w-6 h-6 stroke-[2.5]" />
          )}
        </div>

        {/* Text information */}
        <div className="flex-1 min-w-0" onClick={onToggleMute}>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs sm:text-sm font-black tracking-wide uppercase ${
                isMuted ? 'text-rose-300' : 'text-emerald-300'
              }`}
            >
              {isMuted ? '🔇 ปิดเสียงทั้งระบบแล้ว' : '🔊 เปิดเสียงแล้ว'}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.2 rounded-md bg-white/10 text-slate-200 hidden xs:inline-block">
              {isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-snug mt-0.5 truncate">
            {isMuted
              ? 'โหมดจัดการเสียงในห้องเรียน • เสียงเกมและเสียงพูดปิดสนิท'
              : 'พร้อมใช้งานสื่อการสอน • เสียงเอฟเฟกต์และเสียงอ่านเปิดปกติ'}
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400 font-bold">
            <Keyboard className="w-3 h-3 text-amber-300 shrink-0" />
            <span>
              กดปุ่ม <kbd className="px-1.5 py-0.5 bg-amber-400 text-slate-950 font-black rounded-md text-[10px] shadow-xs">M</kbd> บนแป้นพิมพ์เพื่อสลับเปิด-ปิดเสียงได้ตลอดเวลา
            </span>
          </div>
        </div>

        {/* Hotkey badge and Close Button */}
        <div className="flex items-center gap-1.5 shrink-0 pl-1 border-l border-white/10">
          <button
            type="button"
            onClick={onDismiss}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="ปิดการแจ้งเตือน"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
