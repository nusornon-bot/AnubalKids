import React, { useState, useEffect } from 'react';
import {
  ClassroomRoom,
  listenClassroomRoom,
  requestStudentHelp,
  resolveStudentHelp,
  leaveClassroomRoom,
} from '../services/classroomRoomService';
import { ChildProfile } from '../types';
import { soundEffects, speakText } from '../services/audioService';
import confetti from 'canvas-confetti';
import {
  School,
  HelpCircle,
  LogOut,
  Bell,
  Heart,
  Sparkles,
  Award,
  CheckCircle2,
  X,
  Volume2,
} from 'lucide-react';

interface ClassroomStudentLiveHudProps {
  room: ClassroomRoom;
  studentProfile: ChildProfile;
  soundVolume: number;
  onLeaveRoom: () => void;
  onOpenRoomDashboard?: () => void;
}

export const ClassroomStudentLiveHud: React.FC<ClassroomStudentLiveHudProps> = ({
  room,
  studentProfile,
  soundVolume,
  onLeaveRoom,
  onOpenRoomDashboard,
}) => {
  const [liveRoom, setLiveRoom] = useState<ClassroomRoom>(room);
  const [isHelpRequested, setIsHelpRequested] = useState(false);
  const [showHelpSuccessModal, setShowHelpSuccessModal] = useState(false);
  const [incomingCheer, setIncomingCheer] = useState<{
    type: string;
    message: string;
  } | null>(null);
  const [incomingAlert, setIncomingAlert] = useState<{
    type: string;
    message: string;
  } | null>(null);

  // Listen to live room updates (cheers, broadcast bells)
  useEffect(() => {
    const unsub = listenClassroomRoom(room.roomId, (updatedRoom) => {
      if (!updatedRoom || updatedRoom.status === 'closed') {
        speakText('ห้องเรียนจำลองปิดแล้วจ้ะ', 'th', soundVolume);
        onLeaveRoom();
        return;
      }

      setLiveRoom(updatedRoom);

      // Check incoming teacher cheer
      if (updatedRoom.teacherCheer) {
        const cheer = updatedRoom.teacherCheer;
        const isTargetedToMe =
          !cheer.targetStudentId || cheer.targetStudentId === studentProfile.id;
        const isRecent = Date.now() - cheer.timestamp < 10000;

        if (isTargetedToMe && isRecent) {
          setIncomingCheer({
            type: cheer.type,
            message: cheer.message,
          });
          soundEffects.playVictory(soundVolume);
          confetti({ particleCount: 60, spread: 80, origin: { y: 0.3 } });
          speakText(cheer.message || 'คุณครูส่งกำลังใจมาให้จ้า!', 'th', soundVolume);

          // Auto dismiss cheer popup
          setTimeout(() => {
            setIncomingCheer(null);
          }, 4500);
        }
      }

      // Check incoming broadcast attention bell
      if (updatedRoom.broadcastAlert) {
        const alert = updatedRoom.broadcastAlert;
        const isRecent = Date.now() - alert.timestamp < 10000;

        if (isRecent) {
          setIncomingAlert({
            type: alert.type,
            message: alert.message,
          });
          soundEffects.playSuccess(soundVolume);
          speakText(alert.message || 'คุณครูสั่นกระดิ่งรวมสมาธิ', 'th', soundVolume);

          setTimeout(() => {
            setIncomingAlert(null);
          }, 5000);
        }
      }
    });

    return () => unsub();
  }, [room.roomId, studentProfile.id, soundVolume, onLeaveRoom]);

  const handleRequestHelp = async () => {
    soundEffects.playTap(soundVolume);
    setIsHelpRequested(true);
    setShowHelpSuccessModal(true);
    speakText('ยกมือบอกคุณครูแล้วจ้ะ คุณครูจะมาช่วยดูนะ', 'th', soundVolume);

    try {
      await requestStudentHelp(
        room.roomId,
        studentProfile.id,
        `${studentProfile.name} ยกมือต้องการให้คุณครูช่วยดูข้อนี้ค่ะ`
      );
    } catch (e) {
      console.warn('Failed to send help request:', e);
    }
  };

  const handleCancelHelp = async () => {
    soundEffects.playTap(soundVolume);
    setIsHelpRequested(false);
    setShowHelpSuccessModal(false);
    try {
      await resolveStudentHelp(room.roomId, studentProfile.id);
    } catch (e) {
      console.warn('Failed to cancel help request:', e);
    }
  };

  return (
    <>
      {/* Floating Student Classroom Banner (Fixed at top or below main header) */}
      <aside
        aria-label="แถบสถานะห้องเรียนจำลอง"
        className="fixed top-2.5 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw] bg-white/95 backdrop-blur-md border-2 border-indigo-300 shadow-lg rounded-2xl sm:rounded-full px-3 py-1.5 flex items-center justify-between gap-2.5 sm:gap-3.5 transition-all text-xs select-none"
      >
        {/* Room Info */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-200 animate-ping shrink-0" />
          <div className="flex items-center gap-1 text-slate-800 font-black">
            <span className="text-sm">🏫</span>
            <span className="hidden sm:inline font-bold text-slate-600">ห้อง:</span>
            <span className="text-indigo-700 max-w-[120px] sm:max-w-[180px] truncate">
              {liveRoom.name}
            </span>
          </div>

          <span className="bg-indigo-100 text-indigo-900 font-black px-2 py-0.5 rounded-lg text-[10px] sm:text-xs tracking-wider">
            {liveRoom.roomCode}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Raise Hand Button */}
          {!isHelpRequested ? (
            <button
              type="button"
              onClick={handleRequestHelp}
              className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-[11px] sm:text-xs shadow-2xs border border-amber-500 flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
              title="ยกมือขอให้คุณครูช่วยเหลือ"
            >
              <span>🙋</span>
              <span className="hidden sm:inline">ยกมือขอความช่วยเหลือ</span>
              <span className="sm:hidden">ยกมือ</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCancelHelp}
              className="px-2.5 py-1 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-[11px] sm:text-xs shadow-2xs border border-rose-600 flex items-center gap-1 transition-all active:scale-95 cursor-pointer animate-pulse"
              title="ยกเลิกการขอความช่วยเหลือ"
            >
              <span>✋</span>
              <span>กำลังรอคุณครู</span>
            </button>
          )}

          {/* Teacher Dashboard Shortcut (if teacher) */}
          {onOpenRoomDashboard && (
            <button
              type="button"
              onClick={onOpenRoomDashboard}
              className="px-2.5 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[11px] sm:text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
              title="เปิดแดชบอร์ดคุณครู"
            >
              จอครู 🖥️
            </button>
          )}

          {/* Leave Room Button */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              leaveClassroomRoom(room.roomId, studentProfile.id);
              onLeaveRoom();
            }}
            className="p-1 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="ออกจากห้องเรียนจำลอง"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Incoming Cheer Overlay Modal */}
      {incomingCheer && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
          <div className="pointer-events-auto bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-white max-w-sm w-full text-center flex flex-col items-center gap-3 animate-bounce">
            <span className="text-6xl animate-pulse">
              {incomingCheer.type === 'heart'
                ? '💖'
                : incomingCheer.type === 'star'
                ? '⭐'
                : incomingCheer.type === 'clap'
                ? '👏'
                : '🎉'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black">คุณครูส่งกำลังใจมาให้!</h3>
            <p className="text-sm font-bold text-pink-100">
              "{incomingCheer.message || 'เก่งสุดยอดเลยคนเก่ง สู้ๆ นะคะ!'}"
            </p>
          </div>
        </div>
      )}

      {/* Incoming Attention Bell Modal */}
      {incomingAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-amber-400 max-w-sm w-full text-center flex flex-col items-center gap-3 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-5xl shadow-inner animate-pulse">
              🔔
            </div>
            <h3 className="text-xl font-black text-slate-800">
              คุณครูสั่นกระดิ่งเรียกสมาธิ!
            </h3>
            <p className="text-sm font-bold text-slate-600">
              "{incomingAlert.message || 'เด็กๆ จ๋า หยุดมือสักครู่และฟังคุณครูนะจ๊ะ'}"
            </p>
            <button
              type="button"
              onClick={() => setIncomingAlert(null)}
              className="mt-2 px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              รับทราบครับ / ค่ะ 🙏
            </button>
          </div>
        </div>
      )}

      {/* Help Sent Confirmation Toast */}
      {showHelpSuccessModal && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-slate-900 border-2 border-white shadow-xl px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs font-black animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>ส่งสัญญาณยกมือบอกคุณครูเรียบร้อยแล้วจ้ะ รอสักครู่นะ!</span>
          <button
            type="button"
            onClick={() => setShowHelpSuccessModal(false)}
            className="p-1 rounded-lg hover:bg-amber-600/30 text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
};
