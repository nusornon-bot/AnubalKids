import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Tablet,
  Laptop,
  Tv,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Volume2,
  Camera,
  Fingerprint,
  RefreshCw,
  X,
  Sparkles,
  Info,
  Sliders,
  Maximize,
  Edit2,
  Check,
} from 'lucide-react';
import {
  getDeviceDiagnostics,
  saveCustomDeviceName,
  getDeviceName,
} from '../services/deviceService';
import { DeviceDiagnosticInfo, ControlMode, Language } from '../types';
import { soundEffects, speakText } from '../services/audioService';

interface DeviceCompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentControlMode?: ControlMode;
  onSelectControlMode?: (mode: ControlMode) => void;
  language?: Language;
}

export const DeviceCompatibilityModal: React.FC<DeviceCompatibilityModalProps> = ({
  isOpen,
  onClose,
  currentControlMode = 'auto',
  onSelectControlMode,
  language = 'th',
}) => {
  const [diag, setDiag] = useState<DeviceDiagnosticInfo | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [customNameInput, setCustomNameInput] = useState('');
  const [cameraTestState, setCameraTestState] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [cameraTestMessage, setCameraTestMessage] = useState<string>('');
  const [soundTestPlayed, setSoundTestPlayed] = useState(false);
  const [speechTestPlayed, setSpeechTestPlayed] = useState(false);
  const [touchTestHits, setTouchTestHits] = useState<number>(0);

  const refreshDiagnostics = () => {
    const info = getDeviceDiagnostics();
    setDiag(info);
    setCustomNameInput(info.deviceName);
  };

  useEffect(() => {
    if (isOpen) {
      refreshDiagnostics();
      setCameraTestState('idle');
      setCameraTestMessage('');
      setSoundTestPlayed(false);
      setSpeechTestPlayed(false);
      setTouchTestHits(0);
    }
  }, [isOpen]);

  if (!isOpen || !diag) return null;

  const handleSaveDeviceName = (e: React.FormEvent) => {
    e.preventDefault();
    saveCustomDeviceName(customNameInput);
    setIsEditingName(false);
    refreshDiagnostics();
    soundEffects.playTap(0.4);
  };

  const handleTestCamera = async () => {
    setCameraTestState('testing');
    setCameraTestMessage('กำลังเรียกขออนุญาตกล้อง...');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraTestState('error');
        setCameraTestMessage('เบราว์เซอร์ไม่รองรับกล้อง (getUserMedia)');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 320 } },
        audio: false,
      });
      // Stop stream immediately after successful acquisition
      stream.getTracks().forEach((track) => track.stop());
      setCameraTestState('success');
      setCameraTestMessage('เชื่อมต่อกล้องสำเร็จ พร้อมใช้งานโหมดจับภาพมือ');
      soundEffects.playSuccess(0.5);
    } catch (err: unknown) {
      setCameraTestState('error');
      const errorStr = err instanceof Error ? err.name : 'UnknownError';
      if (errorStr === 'NotAllowedError' || errorStr === 'PermissionDeniedError') {
        setCameraTestMessage('ถูกปฏิเสธสิทธิ์เข้าถึงกล้อง (กรุณากดอนุญาตกล้องที่แถบ URL)');
      } else if (errorStr === 'NotFoundError' || errorStr === 'DevicesNotFoundError') {
        setCameraTestMessage('ไม่พบอุปกรณ์กล้องบนเครื่องนี้');
      } else {
        setCameraTestMessage('ไม่สามารถเปิดกล้องได้: ' + errorStr);
      }
    }
  };

  const handleTestSound = () => {
    soundEffects.unlockAudio();
    soundEffects.playSuccess(0.6);
    setSoundTestPlayed(true);
  };

  const handleTestSpeech = () => {
    soundEffects.unlockAudio();
    const testPhrase =
      language === 'en'
        ? 'Welcome to Kids Hand Motion EduGame! Audio is working great.'
        : language === 'zh'
        ? '欢迎来到儿童互动学习游戏！语音播放正常。'
        : 'ยินดีต้อนรับสู่เกมการศึกษา คิดส์ คิดส์! ระบบเสียงภาษาไทยทำงานสมบูรณ์แบบครับ';
    speakText(testPhrase, (language || 'th') as Language, 'adult_female', 0.85);
    setSpeechTestPlayed(true);
  };

  const getDeviceIcon = () => {
    switch (diag.deviceCategory) {
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-blue-500" />;
      case 'tablet':
        return <Tablet className="w-6 h-6 text-purple-500" />;
      case 'smartboard':
        return <Tv className="w-6 h-6 text-emerald-500" />;
      case 'desktop':
      default:
        return <Laptop className="w-6 h-6 text-amber-500" />;
    }
  };

  const getDeviceCategoryLabel = () => {
    switch (diag.deviceCategory) {
      case 'smartphone':
        return 'โทรศัพท์มือถือ (Smartphone)';
      case 'tablet':
        return 'แท็บเล็ต / iPad (Tablet)';
      case 'smartboard':
        return 'หน้าจอสัมผัสขนาดใหญ่ / Smart Board';
      case 'desktop':
      default:
        return 'คอมพิวเตอร์ / โน้ตบุ๊ก (Desktop / Laptop)';
    }
  };

  return (
    <div
      id="device-compatibility-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 pt-3 sm:pt-6 md:pt-8 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 w-full max-w-2xl overflow-hidden my-auto sm:my-0 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xs border border-white/30 text-2xl shadow-inner">
              📱
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black font-display tracking-wide drop-shadow-xs">
                ตรวจสอบการรองรับอุปกรณ์ (Device Diagnostics)
              </h2>
              <p className="text-xs text-amber-100 font-medium">
                ตรวจจับคุณสมบัติฮาร์ดแวร์ หน้าจอ กล้อง ระบบเสียง และการสัมผัส
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-xs"
            title="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-slate-800 text-sm flex-1">
          {/* Summary Card: Compatibility Score & Category */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border-2 border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <div className="w-13 h-13 bg-white rounded-2xl shadow-xs border-2 border-amber-300 flex items-center justify-center shrink-0">
                {getDeviceIcon()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-800 text-base">
                    {getDeviceCategoryLabel()}
                  </span>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {diag.orientation === 'portrait' ? 'แนวตั้ง 📱' : 'แนวนอน 💻'}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  {diag.osName} • {diag.browserName}
                </div>
              </div>
            </div>

            {/* Score Ring */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-amber-200 shadow-xs shrink-0">
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ความพร้อมใช้งาน</div>
                <div className="text-xs font-black text-emerald-600">
                  {diag.compatibilityScore >= 90 ? 'สมบูรณ์แบบ 100%' : 'ใช้งานได้ดี'}
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-sm shadow-xs">
                {diag.compatibilityScore}
              </div>
            </div>
          </div>

          {/* Device Identifier & Label Editing */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Fingerprint className="w-4 h-4 text-indigo-500" />
                <span>ชื่อและรหัสอุปกรณ์ (ใช้กำหนดสิทธิ์สร้าง/แก้ไขโปรไฟล์):</span>
              </div>
              {!isEditingName && (
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" /> ตั้งชื่อเครื่อง
                </button>
              )}
            </div>

            {isEditingName ? (
              <form onSubmit={handleSaveDeviceName} className="flex gap-2 items-center mt-1">
                <input
                  type="text"
                  value={customNameInput}
                  onChange={(e) => setCustomNameInput(e.target.value)}
                  placeholder="เช่น iPad ครูเปิ้ล, แท็บเล็ตห้องอนุบาล 2"
                  className="flex-1 px-3 py-1.5 text-xs bg-white border-2 border-amber-400 rounded-xl font-bold focus:outline-hidden focus:ring-2 focus:ring-amber-300"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-500 text-white font-bold text-xs rounded-xl hover:bg-amber-600 cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" /> บันทึก
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="px-2.5 py-1.5 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-300 cursor-pointer"
                >
                  ยกเลิก
                </button>
              </form>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="font-black text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  🏷️ {diag.deviceName}
                </div>
                <div className="font-mono text-[11px] text-slate-500">
                  ID: <span className="font-bold text-slate-700">{diag.deviceId}</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Hardware & Diagnostics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Touchscreen & Pointer */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <span>👆</span>
                  <span>ระบบสัมผัส (Touchscreen)</span>
                </div>
                {diag.hasTouch ? (
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> รองรับ ({diag.maxTouchPoints || 1} จุด)
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    เมาส์ / พอยน์เตอร์
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500">
                {diag.hasTouch
                  ? `ตรวจพบหน้าจอสัมผัส รองรับการแตะหน้าจอทันที (${diag.isCoarsePointer ? 'นิ้วสัมผัส' : 'ปากกาสไตลัส'})`
                  : 'ใช้อุปกรณ์ชี้ตำแหน่งแบบละเอียด (เมาส์ / แทร็กแพด) พร้อมโหมดจับมือ'}
              </div>
              {/* Mini Touch Test Box */}
              <button
                type="button"
                onClick={() => {
                  setTouchTestHits((prev) => prev + 1);
                  soundEffects.playTap(0.4);
                }}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold text-blue-700 text-center cursor-pointer transition-colors active:scale-98"
              >
                {touchTestHits > 0
                  ? `แตะทดสอบสัมผัสแล้ว ${touchTestHits} ครั้ง 👍`
                  : 'แตะที่นี่เพื่อทดสอบความไวสัมผัส 👆'}
              </button>
            </div>

            {/* 2. Camera & WebCam */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <span>🖐️</span>
                  <span>กล้องจับภาพมือ (Camera)</span>
                </div>
                {diag.hasCameraSupport ? (
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> รองรับ
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> ไม่พบกล้อง
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500">
                MediaDevices API & MediaPipe Hands สำหรับโหมดชูนิ้วตอบคำถาม
              </div>
              <button
                type="button"
                onClick={handleTestCamera}
                disabled={cameraTestState === 'testing'}
                className={`w-full py-2 rounded-xl text-xs font-bold text-center cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                  cameraTestState === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : cameraTestState === 'error'
                    ? 'bg-rose-50 text-rose-700 border border-rose-300'
                    : 'bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                {cameraTestState === 'testing'
                  ? 'กำลังทดสอบกล้อง...'
                  : cameraTestState === 'success'
                  ? 'กล้องทำงานปกติ ✅'
                  : 'กดทดสอบกล้องหน้า 📷'}
              </button>
              {cameraTestMessage && (
                <div className="text-[10px] font-bold text-slate-600 mt-0.5">{cameraTestMessage}</div>
              )}
            </div>

            {/* 3. Audio & Voice Pronunciation */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <Volume2 className="w-4 h-4 text-emerald-500" />
                  <span>ระบบเสียง & เสียงอ่านโจทย์</span>
                </div>
                {diag.hasWebAudio ? (
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Web Audio OK
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    เตือน
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500">
                เสียงเอฟเฟกต์สังเคราะห์ และเสียงสังเคราะห์อ่านคำถามภาษาไทย ({diag.availableVoicesCount} เสียงในเครื่อง)
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={handleTestSound}
                  className="py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-[11px] font-bold text-emerald-800 text-center cursor-pointer transition-colors"
                >
                  {soundTestPlayed ? 'เสียงติดแล้ว 🔔' : 'ทดสอบเสียงระฆัง'}
                </button>
                <button
                  type="button"
                  onClick={handleTestSpeech}
                  className="py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-[11px] font-bold text-indigo-800 text-center cursor-pointer transition-colors"
                >
                  {speechTestPlayed ? 'เสียงอ่านโจทย์ 🔊' : 'ทดสอบเสียงอ่านไทย'}
                </button>
              </div>
            </div>

            {/* 4. Screen Metrics & DPI */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <Maximize className="w-4 h-4 text-blue-500" />
                  <span>ขนาดหน้าจอ & ความละเอียด</span>
                </div>
                <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  DPR {diag.devicePixelRatio}x
                </span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                <div>
                  หน้าจอ: <strong>{diag.screenWidth} × {diag.screenHeight} px</strong>
                </div>
                <div>
                  พื้นที่แสดงผลจริง: <strong>{diag.viewportWidth} × {diag.viewportHeight} px</strong>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-200">
                รองรับมาตรฐาน Responsive เต็มรูปแบบ (ปุ่มขนาด ≥ 44px สำหรับเด็กเล็ก)
              </div>
            </div>
          </div>

          {/* Recommended Control Mode Switcher */}
          <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-700" />
                <span className="font-black text-xs text-slate-800">
                  โหมดควบคุมการเล่นเกมที่แนะนำสำหรับเครื่องนี้:
                </span>
              </div>
              <span className="text-[11px] font-black text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full">
                {diag.recommendedControlMode === 'touch' ? '📱 แนะนำโหมดสัมผัส' : '🖐️ แนะนำโหมดกล้อง'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'auto', title: '⚡ อัตโนมัติ', desc: 'ปรับตามอุปกรณ์' },
                { id: 'touch', title: '📱 โหมดสัมผัส', desc: 'แตะตอบทันที' },
                { id: 'hand', title: '🖐️ โหมดกล้อง', desc: 'จับมือด้วยกล้อง' },
              ].map((opt) => {
                const isSelected = currentControlMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      if (onSelectControlMode) {
                        onSelectControlMode(opt.id as ControlMode);
                        soundEffects.playTap(0.4);
                      }
                    }}
                    className={`p-2.5 rounded-xl border-2 text-center cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-white shadow-xs ring-2 ring-amber-300'
                        : 'border-slate-200 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="font-black text-xs text-slate-800">{opt.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                    {isSelected && (
                      <div className="text-[9px] font-black text-emerald-600 mt-1">✓ กำลังใช้</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recommendations List */}
          {diag.recommendations.length > 0 && (
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                <span>คำแนะนำสำหรับการใช้งานอุปกรณ์นี้:</span>
              </div>
              <ul className="space-y-1 text-[11px] text-blue-800 pl-4 list-disc">
                {diag.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={refreshDiagnostics}
            className="text-xs font-bold text-slate-600 hover:text-slate-800 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> ตรวจสอบใหม่อีกครั้ง
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs sm:text-sm rounded-xl hover:from-amber-600 hover:to-orange-600 shadow-md cursor-pointer transition-transform active:scale-95"
          >
            ตกลง / ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
