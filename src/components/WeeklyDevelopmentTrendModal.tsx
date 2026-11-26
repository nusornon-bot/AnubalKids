import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X, Cloud } from 'lucide-react';
import { ChildProfile, Grade, CurriculumMode } from '../types';
import { WeeklyTrendChartView } from './WeeklyTrendChartView';
import { getCurriculumTheme } from '../utils/curriculumTheme';

interface WeeklyDevelopmentTrendModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: ChildProfile[];
  activeProfile: ChildProfile;
  currentGrade: Grade;
  soundVolume?: number;
  onSelectProfile?: (profileId: string) => void;
  curriculumMode?: CurriculumMode;
}

export const WeeklyDevelopmentTrendModal: React.FC<WeeklyDevelopmentTrendModalProps> = React.memo(({
  isOpen,
  onClose,
  profiles,
  activeProfile,
  currentGrade,
  onSelectProfile,
  curriculumMode = 'early_childhood',
}) => {
  const currTheme = getCurriculumTheme(curriculumMode);
  if (!isOpen) return null;

  // Local selection state inside the modal to isolate UI changes from triggering heavy global re-renders
  const [modalProfileId, setModalProfileId] = useState<string>(activeProfile.id);

  // Sync modalProfileId only when the modal is opened (not on every outside activeProfile reference change)
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setModalProfileId(activeProfile.id);
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, activeProfile.id]);

  // Stable handler for profile changes from within the trends view
  const handleProfileSelect = useCallback(
    (newProfileId: string) => {
      if (newProfileId === modalProfileId) return;
      setModalProfileId(newProfileId);

      // Only notify parent if an actual student profile (not 'ALL') was chosen and differs from active
      if (newProfileId !== 'ALL' && newProfileId !== activeProfile.id && onSelectProfile) {
        onSelectProfile(newProfileId);
      }
    },
    [modalProfileId, activeProfile.id, onSelectProfile]
  );

  // Safely resolve the currently focused profile
  const focusedProfile = useMemo(() => {
    if (modalProfileId === 'ALL') return activeProfile;
    return profiles.find((p) => p.id === modalProfileId) || activeProfile;
  }, [modalProfileId, profiles, activeProfile]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className={`relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-4 ${currTheme.modalBorder} ring-2 ${currTheme.modalRing} overflow-hidden flex flex-col max-h-[94vh]`}>
        {/* Header Bar */}
        <div className={`${currTheme.modalHeaderBg} text-white p-4 sm:p-5 flex items-center justify-between shrink-0 shadow-md transition-colors`}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner text-2xl">
              📈
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-wide drop-shadow-xs">
                  สรุปวิเคราะห์แนวโน้มพัฒนาการเด็กรายสัปดาห์ ({currTheme.shortName})
                </h2>
                <span className="bg-teal-900/60 text-teal-200 text-xs font-black px-2.5 py-0.5 rounded-full border border-teal-400/40 flex items-center gap-1">
                  <Cloud className="w-3 h-3" />
                  Firestore Live
                </span>
              </div>
              <p className="text-xs sm:text-sm text-teal-100 font-medium">
                วิเคราะห์ความก้าวหน้าของคะแนนและความแม่นยำในแต่ละทักษะปฐมวัย 8 ด้านตามลำดับสัปดาห์
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl transition-all cursor-pointer hover:rotate-90"
            title="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Scrollable Trend Chart View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 text-slate-800">
          <WeeklyTrendChartView
            profiles={profiles}
            activeProfile={focusedProfile}
            currentGrade={focusedProfile.grade || currentGrade}
            initialProfileId={modalProfileId}
            onSelectProfile={handleProfileSelect}
          />
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-5 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
});
