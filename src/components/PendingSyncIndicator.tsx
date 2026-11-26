import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Wifi,
  WifiOff,
  Cloud,
  CloudOff,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Database,
  ChevronRight,
} from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { offlineSyncService, PendingScoreItem } from '../services/offlineSyncService';

interface PendingSyncIndicatorProps {
  className?: string;
  variant?: 'header' | 'floating' | 'compact';
}

export const PendingSyncIndicator: React.FC<PendingSyncIndicatorProps> = ({
  className = '',
  variant = 'header',
}) => {
  const isOnline = useOnlineStatus();
  const [pendingItems, setPendingItems] = useState<PendingScoreItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    // Initial load
    setPendingItems(offlineSyncService.getPendingScores());

    // Subscribe to changes in pending queue
    const unsubscribe = offlineSyncService.subscribe((items) => {
      setPendingItems(items);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleManualSync = async () => {
    if (!isOnline) {
      setSyncFeedback({
        type: 'error',
        message: 'อุปกรณ์ยังไม่มีการเชื่อมต่ออินเทอร์เน็ต กรุณาลองใหม่อีกครั้งเมื่อออนไลน์',
      });
      return;
    }

    setIsSyncing(true);
    setSyncFeedback({ type: null, message: '' });

    try {
      const result = await offlineSyncService.syncPendingScores();
      if (result.success) {
        setSyncFeedback({
          type: 'success',
          message: `ซิงก์ข้อมูลสำเร็จเรียบร้อยแล้ว (${result.syncedCount} รายการ)`,
        });
        setTimeout(() => {
          if (offlineSyncService.getPendingCount() === 0) {
            setIsModalOpen(false);
          }
        }, 1500);
      } else {
        setSyncFeedback({
          type: 'error',
          message: result.errors[0] || 'การซิงก์ยังไม่สมบูรณ์ จะลองใหม่โดยอัตโนมัติ',
        });
      }
    } catch (err: any) {
      setSyncFeedback({
        type: 'error',
        message: err?.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const pendingCount = pendingItems.length;

  return (
    <>
      <div className={`flex items-center gap-1.5 ${className}`}>
        {/* Offline Badge */}
        {!isOnline && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-800 text-xs font-black hover:bg-amber-500/25 transition-all cursor-pointer shadow-2xs"
            title="ทำงานในโหมดออฟไลน์: บันทึกคะแนนและเล่นเกมได้ตามปกติ"
          >
            <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="hidden sm:inline">โหมดออฟไลน์</span>
            <span className="sm:hidden">ออฟไลน์</span>
          </button>
        )}

        {/* Pending Sync Badge (If items are waiting) */}
        {pendingCount > 0 ? (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-500 text-white text-xs font-black hover:bg-orange-600 active:scale-95 transition-all cursor-pointer shadow-xs animate-bounce sm:animate-none"
            title={`${pendingCount} รายการคะแนนรอบันทึกขึ้นคลาวด์ คลิกเพื่อดูรายละเอียดหรือซิงก์`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>รอซิงก์ ({pendingCount})</span>
            <span className="w-2 h-2 rounded-full bg-white animate-ping hidden sm:inline-block" />
          </button>
        ) : isOnline && variant !== 'compact' ? (
          /* Online and all Synced subtle badge */
          <div
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold"
            title="ระบบเชื่อมต่ออินเทอร์เน็ตแล้ว ข้อมูลทั้งหมดได้รับการซิงก์เรียบร้อย"
          >
            <Cloud className="w-3.5 h-3.5 text-emerald-600" />
            <span>ออนไลน์ (ซิงก์ครบ)</span>
          </div>
        ) : null}
      </div>

      {/* Pending Sync Modal Details - Rendered in Portal to avoid stacking context issues */}
      {isModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border-3 border-amber-200 overflow-hidden flex flex-col max-h-[85vh] animate-scale-up relative z-[100000]"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/20 rounded-2xl backdrop-blur-xs">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black leading-tight">
                    สถานะการซิงก์คะแนน (Sync Status)
                  </h3>
                  <p className="text-xs text-amber-100 font-bold">
                    {isOnline ? '🟢 เชื่อมต่ออินเทอร์เน็ตแล้ว' : '🔴 กำลังอยู่ในโหมดออฟไลน์ (ไม่มีเน็ต)'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="ปิด"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Offline Reassurance Notice */}
            <div className="p-4 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <div className="p-1 bg-amber-200 text-amber-800 rounded-lg mt-0.5 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-black text-amber-950 mb-0.5">
                  ความปลอดภัยของคะแนน & การเรียนรู้
                </p>
                <p className="leading-relaxed">
                  ระบบอนุบาลคิดส์คิดส์รองรับการเล่นแบบออฟไลน์เต็มรูปแบบ แม้ไม่มีอินเทอร์เน็ต
                  คะแนนรอบเล่น เกียรติบัตร และดาวสะสมของเด็ก ๆ จะถูกบันทึกไว้ในอุปกรณ์นี้อย่างปลอดภัย
                  และจะอัปโหลดอัตโนมัติเมื่อกลับมาออนไลน์
                </p>
              </div>
            </div>

            {/* Pending List Body */}
            <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-100">
              {pendingItems.length === 0 ? (
                <div className="py-8 text-center flex flex-col items-center justify-center text-slate-500">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-black text-slate-700">ข้อมูลทั้งหมดได้รับการซิงก์ครบถ้วนแล้ว</p>
                  <p className="text-xs text-slate-400 mt-1">ไม่มีคะแนนค้างอยู่ในคิวออฟไลน์</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-black text-slate-500 px-1">
                    <span>รายการรอซิงก์ ({pendingItems.length} รอบ)</span>
                    <span>บันทึกในเครื่อง</span>
                  </div>

                  {pendingItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 transition-all flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 font-black flex items-center justify-center text-sm shrink-0">
                          {item.type === 'skill_game' ? '🎮' : '⭐'}
                        </div>
                        <div>
                          <div className="font-black text-slate-800 flex items-center gap-1.5">
                            <span>{item.profileName}</span>
                            <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                              {item.grade}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{item.displayTimestamp || item.timestamp.split('T')[0]}</span>
                            <span>•</span>
                            <span>
                              {item.skillGameTitle ||
                                `ตอบถูก ${item.totalCorrect}/${item.totalQuestions} ข้อ`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span>รอซิงก์</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sync Feedback Message */}
            {syncFeedback.message && (
              <div
                className={`p-3 text-xs font-bold border-t flex items-center gap-2 ${
                  syncFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {syncFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{syncFeedback.message}</span>
              </div>
            )}

            {/* Modal Footer Controls */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>

              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing || pendingCount === 0 || !isOnline}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs transition-all cursor-pointer shadow-xs ${
                  isSyncing || pendingCount === 0 || !isOnline
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white active:scale-95'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'กำลังซิงก์ข้อมูล...' : 'ซิงก์ข้อมูลทันที (Sync Now)'}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
