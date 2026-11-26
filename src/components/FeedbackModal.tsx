import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  Copy,
  Check,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Table,
  Loader2,
  Lock,
  User as UserIcon,
  LogOut,
} from 'lucide-react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FeedbackCategory, FeedbackItem } from '../types';
import { storageService } from '../services/storageService';
import { soundEffects } from '../services/audioService';
import {
  appendFeedbackToGoogleSheet,
  TARGET_SHEET_ID,
  GoogleSheetsFeedbackPayload,
} from '../services/googleSheetsService';
import { googleSignIn, getAccessToken, auth, logout } from '../services/firebaseAuthService';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundVolume?: number;
  currentProfileName?: string;
  currentGrade?: string;
}

const CATEGORY_OPTIONS: { id: FeedbackCategory; label: string; icon: string; desc: string }[] = [
  { id: 'general', label: 'ข้อเสนอแนะทั่วไป', icon: '🌟', desc: 'ความคิดเห็นหรือคำแนะนำทั่วไปในการใช้งาน' },
  { id: 'new_features', label: 'เสนอโจทย์/ทักษะใหม่', icon: '💡', desc: 'อยากให้เพิ่มข้อสอบ หรือทักษะระดับอนุบาลใด' },
  { id: 'bug', label: 'แจ้งปัญหา / บั๊ก', icon: '🐛', desc: 'พบข้อผิดพลาด การแสดงผล หรือระบบค้าง' },
  { id: 'control', label: 'กล้องจับมือ / สัมผัส', icon: '🖐️', desc: 'ความแม่นยำของ Hand Tracking หรือการแตะจอ' },
  { id: 'classroom', label: 'ใช้ในห้องเรียน / โรงเรียน', icon: '🏫', desc: 'ข้อแนะนำสำหรับครูนำไปสอนในห้องเรียน' },
  { id: 'appreciation', label: 'คำชมเชย / กำลังใจ', icon: '💖', desc: 'ส่งกำลังใจให้ทีมงานผู้พัฒนา' },
];

const RATING_LABELS: Record<number, { text: string; emoji: string }> = {
  5: { text: 'ยอดเยี่ยมมาก ประทับใจ!', emoji: '🤩' },
  4: { text: 'ดีมาก มีประโยชน์', emoji: '😊' },
  3: { text: 'ปานกลาง พอใช้ได้', emoji: '🙂' },
  2: { text: 'ควรปรับปรุงบางจุด', emoji: '😐' },
  1: { text: 'พบปัญหาเยอะ ต้องการแก้ไข', emoji: '🥺' },
};

const QUICK_PROMPTS = [
  'แอปน่ารักมาก เด็กๆ ชอบโหมดกล้องจับมือมากครับ',
  'อยากให้เพิ่มโจทย์ภาษาไทยสำหรับ อ.3 เพิ่มเติม',
  'อยากให้เพิ่มหมวดหมู่วิทยาศาสตร์และการทดลอง',
  'การตอบสนองบนหน้าจอมือถือลื่นไหลดีมากครับ',
];

export const getRoleThaiName = (role: 'parent' | 'teacher' | 'student' | 'other' | string): string => {
  switch (role) {
    case 'other':
      return 'ผู้ใช้งานทั่วไป / ประชาชน';
    case 'parent':
      return 'ผู้ปกครอง';
    case 'teacher':
      return 'คุณครู / บุคลากรการศึกษา';
    case 'student':
      return 'นักเรียน / ผู้เรียน';
    default:
      return 'ผู้ใช้งานทั่วไป';
  }
};

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  soundVolume = 0.8,
  currentProfileName = 'น้องนักเรียน',
  currentGrade = 'K1',
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');

  // Form Fields
  const [category, setCategory] = useState<FeedbackCategory>('general');
  const [rating, setRating] = useState<number>(5);
  const [senderName, setSenderName] = useState<string>('');
  const [senderRole, setSenderRole] = useState<'parent' | 'teacher' | 'student' | 'other'>('other');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attachDeviceInfo, setAttachDeviceInfo] = useState<boolean>(true);

  // States
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [isSendingToSheet, setIsSendingToSheet] = useState<boolean>(false);
  const [sheetSubmitStatus, setSheetSubmitStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    msg: string;
  }>({ type: 'idle', msg: '' });
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);

  // Listen to Google Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setCurrentUser(u);
    });
    return () => unsub();
  }, []);

  // Load History on open
  useEffect(() => {
    if (isOpen) {
      setFeedbackHistory(storageService.getFeedbacks());
      setSubmittedSuccess(false);
      setSheetSubmitStatus({ type: 'idle', msg: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Build device diagnostic summary
  const getDeviceInfoString = () => {
    const ua = navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const windowRes = `${window.innerWidth}x${window.innerHeight}`;
    return `Device: ${isMobile ? 'Mobile' : 'Desktop'} | Screen: ${screenRes} | Window: ${windowRes} | Language: ${navigator.language}`;
  };

  // Build raw feedback text for clipboard
  const buildFullFeedbackPayload = () => {
    const catObj = CATEGORY_OPTIONS.find((c) => c.id === category);
    const stars = '⭐'.repeat(rating);
    const roleThai = getRoleThaiName(senderRole);

    const senderFallback = senderRole === 'other' ? 'ผู้ใช้งานทั่วไป' : 'ผู้ใช้งาน';
    return `📢 [Kids EduGame] ข้อเสนอแนะถึงผู้พัฒนา
-----------------------------------------
หมวดหมู่: ${catObj?.icon} ${catObj?.label}
คะแนนความพึงพอใจ: ${stars} (${rating}/5)
ผู้ส่ง: ${senderName.trim() || senderFallback} (${roleThai})
ข้อมูลติดต่อ: ${contactInfo.trim() || '-'}
โปรไฟล์ผู้เล่น: ${currentProfileName} (${currentGrade})

ข้อความข้อเสนอแนะ:
${message.trim()}

${attachDeviceInfo ? `ข้อมูลอุปกรณ์:\n${getDeviceInfoString()}` : ''}
วันที่ส่ง: ${new Date().toLocaleString('th-TH')}
-----------------------------------------`;
  };

  // Save Local only
  const handleSaveLocal = () => {
    if (!message.trim()) {
      alert('กรุณากรอกข้อความข้อเสนอแนะก่อนบันทึกครับ');
      return;
    }

    const senderFallback = senderRole === 'other' ? 'ผู้ใช้งานทั่วไป' : 'ผู้ใช้งาน';
    const newItem: FeedbackItem = {
      id: `fb-${Date.now()}`,
      category,
      rating,
      message: message.trim(),
      senderName: senderName.trim() || senderFallback,
      senderRole,
      contactInfo: contactInfo.trim(),
      createdAt: new Date().toISOString(),
      deviceInfo: attachDeviceInfo ? getDeviceInfoString() : undefined,
      sentViaEmail: false,
    };

    const updated = storageService.saveFeedback(newItem);
    setFeedbackHistory(updated);
    soundEffects.playTap(soundVolume);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setActiveTab('history');
    }, 1200);
  };

  // Send directly to Google Sheets using Firebase OAuth Token
  const handleSendToGoogleSheet = async () => {
    if (!message.trim()) {
      alert('กรุณากรอกข้อความข้อเสนอแนะก่อนกดส่งครับ');
      return;
    }

    setIsSendingToSheet(true);
    setSheetSubmitStatus({ type: 'idle', msg: '' });

    // Save locally first
    const newItem: FeedbackItem = {
      id: `fb-${Date.now()}`,
      category,
      rating,
      message: message.trim(),
      senderName: senderName.trim() || 'ผู้ใช้งาน',
      senderRole,
      contactInfo: contactInfo.trim(),
      createdAt: new Date().toISOString(),
      deviceInfo: attachDeviceInfo ? getDeviceInfoString() : undefined,
      sentViaEmail: false,
    };
    const updated = storageService.saveFeedback(newItem);
    setFeedbackHistory(updated);

    const catObj = CATEGORY_OPTIONS.find((c) => c.id === category);
    const roleThai = getRoleThaiName(senderRole);

    const senderFallback = senderRole === 'other' ? 'ผู้ใช้งานทั่วไป' : 'ผู้ใช้งาน';
    const payload: GoogleSheetsFeedbackPayload = {
      timestamp: new Date().toLocaleString('th-TH'),
      category: `${catObj?.icon || ''} ${catObj?.label || category}`,
      rating,
      message: message.trim(),
      senderName: senderName.trim() || senderFallback,
      senderRole: roleThai,
      contactInfo: contactInfo.trim(),
      profileName: currentProfileName,
      currentGrade: currentGrade,
      deviceInfo: attachDeviceInfo ? getDeviceInfoString() : undefined,
    };

    const result = await appendFeedbackToGoogleSheet(payload);
    setIsSendingToSheet(false);

    if (result.success) {
      soundEffects.playTap(soundVolume);
      setSubmittedSuccess(true);
      setMessage('');
      setSheetSubmitStatus({
        type: 'success',
        msg: result.message || 'บันทึกข้อมูลข้อเสนอแนะสำเร็จเรียบร้อยแล้ว!',
      });
      setTimeout(() => {
        setActiveTab('history');
      }, 1600);
    } else {
      setSheetSubmitStatus({
        type: 'error',
        msg: result.message || 'บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือคัดลอกข้อความ',
      });
    }
  };

  // Copy to clipboard
  const handleCopyClipboard = () => {
    const fullContent = buildFullFeedbackPayload();
    navigator.clipboard
      .writeText(fullContent)
      .then(() => {
        setCopySuccess(true);
        soundEffects.playTap(soundVolume);
        setTimeout(() => setCopySuccess(false), 2500);
      })
      .catch(() => {
        alert('ไม่สามารถคัดลอกได้อัตโนมัติ กรุณากดเลือกและคัดลอกด้วยตนเอง');
      });
  };

  // Delete a history item
  const handleDeleteFeedback = (id: string) => {
    if (confirm('คุณต้องการลบรายการข้อเสนอแนะนี้ใช่หรือไม่?')) {
      const updated = storageService.deleteFeedback(id);
      setFeedbackHistory(updated);
      soundEffects.playTap(soundVolume);
    }
  };

  return (
    <div
      id="feedback-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border-2 sm:border-4 border-emerald-300 overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-3.5 sm:p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-xs shrink-0">
              💬
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-display leading-tight flex items-center gap-1.5">
                <span>ระบบ Feedback บันทึกลง Google Sheets</span>
                <span className="text-[10px] bg-white/30 text-white font-bold px-2 py-0.5 rounded-full">
                  Direct Sync
                </span>
              </h2>
              <p className="text-xs text-emerald-100 font-medium">
                ส่งความคิดเห็น คำแนะนำ หรือแจ้งบั๊ก จัดเก็บตรงสู่ Google Sheets
              </p>
            </div>
          </div>
          <button
            id="btn-close-feedback"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer transition-colors"
            title="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Nav / Tabs Strip */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-900 shrink-0">
          <div className="flex items-center gap-2 font-bold text-emerald-800">
            <Table className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Google Sheets Target:</span>
            <span className="font-mono bg-emerald-100/80 px-1.5 py-0.5 rounded text-[11px]">
              1KUonUHc...IiKM
            </span>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-emerald-200">
            <button
              onClick={() => {
                setActiveTab('form');
                soundEffects.playTap(soundVolume);
              }}
              className={`px-3 py-1 rounded-lg font-black text-xs cursor-pointer transition-all ${
                activeTab === 'form'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              ✏️ เขียนข้อเสนอแนะ
            </button>
            <button
              onClick={() => {
                setActiveTab('history');
                soundEffects.playTap(soundVolume);
              }}
              className={`px-3 py-1 rounded-lg font-black text-xs cursor-pointer transition-all ${
                activeTab === 'history'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              📂 ประวัติที่เคยส่ง ({feedbackHistory.length})
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-5 overflow-y-auto flex-1 overscroll-contain">
          {activeTab === 'form' ? (
            <div className="space-y-4">
              {/* Submission Success Alert */}
              {submittedSuccess && (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 flex items-center gap-3 text-emerald-900 animate-in fade-in">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div className="text-xs">
                    <p className="font-black text-sm">
                      {sheetSubmitStatus.type === 'success'
                        ? 'บันทึกเข้า Google Sheets เรียบร้อยแล้ว! 📊🎉'
                        : 'บันทึกข้อเสนอแนะเรียบร้อยแล้ว ขอบคุณมากครับ! 🎉'}
                    </p>
                    <p className="text-emerald-700">
                      {sheetSubmitStatus.type === 'success'
                        ? 'ข้อมูลของคุณถูกบันทึกส่งตรงเข้า Google Sheets เรียบร้อยแล้ว'
                        : 'ระบบได้บันทึกข้อความไว้ในประวัติเรียบร้อยแล้ว'}
                    </p>
                  </div>
                </div>
              )}

              {/* Google Sheet Status Notification if any */}
              {sheetSubmitStatus.type === 'error' && (
                <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-3 flex items-center gap-3 text-rose-900 animate-in fade-in">
                  <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  <div className="text-xs">
                    <p className="font-black text-sm">ไม่สามารถบันทึกเข้า Google Sheets ได้</p>
                    <p className="text-rose-700">{sheetSubmitStatus.msg}</p>
                    <p className="text-slate-600 mt-0.5">
                      💡 ข้อมูลยังคงถูกบันทึกไว้ในประวัติเครื่อง และคุณสามารถกดปุ่ม "คัดลอกข้อความ" เพื่อนำไปส่งได้ครับ
                    </p>
                  </div>
                </div>
              )}

              {/* Target Sheet Info & Account Status Badge */}
              <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3 text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-950 font-medium">
                  <span className="text-base">📊</span>
                  <div className="flex-1">
                    <span className="font-bold text-emerald-900">
                      บันทึกข้อเสนอแนะลง Google Sheets
                    </span>
                    <p className="text-[11px] text-emerald-700">
                      เปิดสิทธิ์ให้ผู้ใช้งานทั่วไปสามารถส่งข้อเสนอแนะบันทึกลงสเปรดชีตได้โดยตรง
                    </p>
                  </div>
                </div>

                {/* Google Account Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-emerald-100 text-[11px]">
                  {currentUser ? (
                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>เข้าสู่ระบบ Google: <strong className="font-semibold">{currentUser.email}</strong></span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <UserIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>ผู้ใช้งานทั่วไป (สามารถส่งข้อเสนอแนะได้ทันที)</span>
                    </div>
                  )}

                  {currentUser ? (
                    <button
                      type="button"
                      onClick={async () => {
                        await logout();
                        soundEffects.playTap(soundVolume);
                      }}
                      className="text-[10px] text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-rose-200 shadow-2xs hover:bg-rose-50 cursor-pointer"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>ออกจากระบบ</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await googleSignIn();
                          soundEffects.playTap(soundVolume);
                        } catch (err: any) {
                          console.warn('Sign-in cancelled or error', err);
                        }
                      }}
                      className="text-[10px] text-slate-600 hover:text-emerald-900 font-medium flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 cursor-pointer"
                      title="เข้าสู่ระบบ Google หากต้องการระบุอีเมลผู้ส่ง"
                    >
                      <UserIcon className="w-3 h-3 text-slate-400" />
                      <span>ลงชื่อเข้าใช้ Google (ทางเลือก)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Rating Section (1-5 Stars) */}
              <div>
                <label className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <span>1. ระดับความพึงพอใจในการใช้งาน</span>
                  <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setRating(star);
                        soundEffects.playTap(soundVolume);
                      }}
                      className="p-1 hover:scale-125 active:scale-95 transition-transform cursor-pointer"
                      title={`${star} ดาว`}
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <div className="ml-2 pl-2 border-l border-slate-300 text-xs font-black text-amber-700 flex items-center gap-1">
                    <span className="text-base">{RATING_LABELS[rating]?.emoji}</span>
                    <span>{RATING_LABELS[rating]?.text}</span>
                  </div>
                </div>
              </div>

              {/* Category Options */}
              <div>
                <label className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <span>2. หัวข้อหรือเรื่องที่ต้องการแจ้ง</span>
                  <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id);
                        soundEffects.playTap(soundVolume);
                      }}
                      className={`p-2.5 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between ${
                        category === cat.id
                          ? 'border-emerald-500 bg-emerald-50/80 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-black text-xs text-slate-800 mb-0.5">
                        <span className="text-base">{cat.icon}</span>
                        <span>{cat.label}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{cat.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Select */}
              <div>
                <label className="text-xs sm:text-sm font-black text-slate-800 block mb-1.5">
                  3. คุณกำลังใช้งานในฐานะใด
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'other', label: '👤 ผู้ใช้งานทั่วไป / ประชาชน' },
                    { id: 'parent', label: '👨‍👩‍👧 ผู้ปกครอง' },
                    { id: 'teacher', label: '👩‍🏫 คุณครู / บุคลากรการศึกษา' },
                    { id: 'student', label: '🧒 นักเรียน / ผู้เรียน' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setSenderRole(r.id as any);
                        soundEffects.playTap(soundVolume);
                      }}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-bold cursor-pointer text-center transition-all ${
                        senderRole === r.id
                          ? 'border-emerald-500 bg-emerald-600 text-white font-black shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name and Contact Info Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    ชื่อผู้ส่ง (หรือชื่อคุณครู/ผู้ปกครอง)
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="เช่น ผู้ปกครองน้องต้นหม่อน, ครูเพ็ญศรี"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    เบอร์ติดต่อ หรือ LINE ID (ไม่บังคับ)
                  </label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="สำหรับติดต่อกลับกรณีแจ้งปัญหา"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Feedback Message Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1">
                    <span>ข้อความข้อเสนอแนะ / ปัญหาที่ต้องการแจ้ง</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">{message.length} ตัวอักษร</span>
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="พิมพ์ความคิดเห็นของท่านที่นี่ เช่น ข้อดีที่ชอบ, โจทย์ที่อยากให้เสริม, ปัญหาหน้าจอ หรือฟังก์ชันที่อยากได้เพิ่ม..."
                  className="w-full p-3 text-xs sm:text-sm rounded-2xl border-2 border-slate-300 focus:border-emerald-500 focus:outline-none resize-none leading-relaxed"
                />

                {/* Quick Prompts */}
                <div className="mt-2">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    💡 ข้อความตัวอย่างด่วน (แตะเพื่อใส่):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setMessage((prev) => (prev ? `${prev} ${prompt}` : prompt));
                          soundEffects.playTap(soundVolume);
                        }}
                        className="text-[10px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer transition-colors text-left"
                      >
                        + {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Device diagnostic info checkbox */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={attachDeviceInfo}
                    onChange={(e) => setAttachDeviceInfo(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded-md focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-700 font-medium">
                    แนบข้อมูลระบบอัตโนมัติ (ขนาดหน้าจอ / ชนิดอุปกรณ์) เพื่อช่วยแก้ปัญหาได้ตรงจุด
                  </span>
                </label>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {/iPhone|Android/i.test(navigator.userAgent) ? '📱 Mobile' : '💻 Desktop'}
                </span>
              </div>
            </div>
          ) : (
            /* History Tab */
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-black text-slate-800">
                  ประวัติข้อเสนอแนะที่บันทึกไว้ในเครื่อง ({feedbackHistory.length} รายการ)
                </h3>
                {feedbackHistory.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('คุณต้องการล้างประวัติข้อเสนอแนะทั้งหมดหรือไม่?')) {
                        storageService.clearFeedbacks();
                        setFeedbackHistory([]);
                        soundEffects.playTap(soundVolume);
                      }
                    }}
                    className="text-[11px] text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>ล้างทั้งหมด</span>
                  </button>
                )}
              </div>

              {feedbackHistory.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <span className="text-4xl block mb-2">📭</span>
                  <p className="text-sm font-bold text-slate-600">ยังไม่มีประวัติข้อเสนอแนะ</p>
                  <p className="text-xs text-slate-400 mt-1">
                    เมื่อคุณส่งข้อเสนอแนะ รายการจะถูกบันทึกไว้ที่นี่อัตโนมัติ
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {feedbackHistory.map((item) => {
                    const catObj = CATEGORY_OPTIONS.find((c) => c.id === item.category);
                    return (
                      <div
                        key={item.id}
                        className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs text-xs space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{catObj?.icon || '💬'}</span>
                            <div>
                              <div className="font-black text-slate-800">
                                {catObj?.label || item.category}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {new Date(item.createdAt).toLocaleString('th-TH')} • โดย {item.senderName}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex text-amber-400 text-sm">
                              {'★'.repeat(item.rating)}
                              {'☆'.repeat(5 - item.rating)}
                            </div>
                            <button
                              onClick={() => handleDeleteFeedback(item.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                              title="ลบรายการนี้"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium whitespace-pre-wrap">
                          {item.message}
                        </p>

                        <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.message);
                              alert('คัดลอกข้อความแล้ว');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-bold text-[11px] flex items-center gap-1 hover:bg-slate-200 cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                            <span>คัดลอก</span>
                          </button>

                          <button
                            onClick={async () => {
                              const roleThai = getRoleThaiName(item.senderRole);
                              const res = await appendFeedbackToGoogleSheet({
                                timestamp: new Date(item.createdAt).toLocaleString('th-TH'),
                                category: `${catObj?.icon || ''} ${catObj?.label || item.category}`,
                                rating: item.rating,
                                message: item.message,
                                senderName: item.senderName,
                                senderRole: roleThai,
                                contactInfo: item.contactInfo || '',
                                profileName: currentProfileName,
                                currentGrade: currentGrade,
                                deviceInfo: item.deviceInfo,
                              });
                              if (res.success) {
                                alert('ส่งข้อเสนอแนะนี้ไปยัง Google Sheets สำเร็จเรียบร้อยแล้ว!');
                              } else {
                                alert(`ส่งไม่สำเร็จ: ${res.message}`);
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1 hover:bg-emerald-700 cursor-pointer"
                            title="ส่งรายการนี้ไปยัง Google Sheets"
                          >
                            <Table className="w-3 h-3" />
                            <span>ส่งลงชีต</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions (Only in Form tab) */}
        {activeTab === 'form' && (
          <div className="bg-slate-50 p-3 sm:p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyClipboard}
              className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
              title="คัดลอกข้อความไปวางใน LINE หรือแชท"
            >
              {copySuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">คัดลอกเรียบร้อย!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span>คัดลอกข้อความ</span>
                </>
              )}
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleSaveLocal}
                className="py-2.5 px-3.5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-bold text-xs flex items-center gap-1 cursor-pointer shadow-2xs transition-all"
                title="บันทึกไว้ในประวัติของเครื่อง"
              >
                <span>💾 บันทึกในเครื่อง</span>
              </button>

              <button
                type="button"
                id="btn-submit-feedback-sheets"
                onClick={handleSendToGoogleSheet}
                disabled={isSendingToSheet}
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-98 border-b-2 sm:border-b-4 border-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
                title="ส่งข้อเสนอแนะและบันทึกตรงเข้า Google Sheets ทันที"
              >
                {isSendingToSheet ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>กำลังบันทึกลงชีต...</span>
                  </>
                ) : (
                  <>
                    <Table className="w-4 h-4" />
                    <span>บันทึกลง Google Sheets 🚀</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
