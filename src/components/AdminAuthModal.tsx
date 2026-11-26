import React, { useState } from 'react';
import { Shield, ShieldCheck, ShieldAlert, X, LogIn, LogOut, Loader2, CheckCircle2 } from 'lucide-react';
import { User } from 'firebase/auth';
import { googleSignIn, logout } from '../services/firebaseAuthService';
import { isUserAdmin } from '../services/authPermissionService';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  targetProfileName?: string;
  onAuthChanged?: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  targetProfileName,
  onAuthChanged,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const isAdmin = isUserAdmin(currentUser);

  const handleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (!isUserAdmin(res.user)) {
        setErrorMessage(
          `บัญชี ${res.user.email} ไม่มีสิทธิ์ผู้ดูแลระบบ กรุณาใช้บัญชีที่ได้รับอนุญาต (เช่น nusornon@gmail.com)`
        );
      } else {
        if (onAuthChanged) onAuthChanged();
      }
    } catch (err: any) {
      console.error('Admin login error:', err);
      setErrorMessage(err.message || 'ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await logout();
      if (onAuthChanged) onAuthChanged();
    } catch (err: any) {
      console.error('Logout error:', err);
      setErrorMessage('เกิดข้อผิดพลาดในการออกจากระบบ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="admin-auth-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="admin-auth-modal-dialog"
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full border-4 border-amber-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
              {isAdmin ? <ShieldCheck className="w-6 h-6 text-white" /> : <Shield className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h3 className="text-base font-black font-display">ระบบยืนยันสิทธิ์ผู้ดูแลระบบ</h3>
              <p className="text-xs text-amber-100">Administrator Access Control</p>
            </div>
          </div>
          <button
            type="button"
            id="btn-close-admin-auth-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {targetProfileName && !isAdmin && (
            <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
              <span className="text-base leading-none">🔒</span>
              <div>
                <p className="font-bold">
                  โปรไฟล์ &ldquo;{targetProfileName}&rdquo; ถูกสร้างจากอุปกรณ์เครื่องอื่น
                </p>
                <p className="text-amber-800 mt-0.5">
                  ตามนโยบายความปลอดภัย สามารถแก้ไขได้เฉพาะจากเครื่องที่สร้างเท่านั้น หรือเข้าสู่ระบบในฐานะผู้ดูแลระบบเพื่อแก้ไขได้ทุกโปรไฟล์
                </p>
              </div>
            </div>
          )}

          {/* Current Auth Status Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">สถานะปัจจุบัน:</span>
              {isAdmin ? (
                <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ผู้ดูแลระบบ (Admin)
                </span>
              ) : currentUser ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  ผู้ใช้ทั่วไป
                </span>
              ) : (
                <span className="text-xs font-bold text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded-full">
                  ยังไม่ได้เข้าสู่ระบบ
                </span>
              )}
            </div>

            {currentUser ? (
              <div className="space-y-1 text-xs text-slate-700 font-medium">
                <p className="truncate">
                  <strong className="font-bold">ชื่อผู้ใช้:</strong> {currentUser.displayName || 'Google User'}
                </p>
                <p className="truncate">
                  <strong className="font-bold">อีเมล:</strong> {currentUser.email}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-600">
                เข้าสู่ระบบด้วยบัญชี Google ของผู้ดูแลระบบเพื่อปลดล็อกการแก้ไขโปรไฟล์จากทุกเครื่อง
              </p>
            )}
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isAdmin ? (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  สิทธิ์ผู้ดูแลระบบพร้อมใช้งาน
                </p>
                <p className="mt-1 text-emerald-700">
                  คุณสามารถแก้ไขและจัดการโปรไฟล์นักเรียนได้ทั้งหมด ทุกเครื่อง และจัดการคลังข้อสอบได้เต็มรูปแบบ
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  id="btn-admin-auth-done"
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black rounded-xl cursor-pointer shadow-xs transition-colors"
                >
                  ดำเนินการต่อ
                </button>
                <button
                  type="button"
                  id="btn-admin-auth-signout"
                  onClick={handleSignOut}
                  disabled={isLoading}
                  className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                  ออกจากระบบ
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                type="button"
                id="btn-admin-auth-google-signin"
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-black rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                <span>เข้าสู่ระบบด้วย Google (ผู้ดูแลระบบ)</span>
              </button>

              {currentUser && (
                <button
                  type="button"
                  id="btn-admin-switch-account"
                  onClick={handleSignOut}
                  disabled={isLoading}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  สลับบัญชี Google
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
