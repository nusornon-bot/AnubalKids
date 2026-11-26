import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  Download,
  Printer,
  X,
  Sparkles,
  CheckCircle2,
  Edit3,
  Calendar,
  School,
  UserCheck,
  FileImage,
  Star,
  ShieldCheck,
  Upload,
  Image as ImageIcon,
  Trash2,
  RotateCcw,
  Building2,
  Check,
  Eye,
  Type,
  Share2,
  Copy,
} from 'lucide-react';
import { ChildProfile } from '../types';
import {
  ProfileMilestoneSummary,
  evaluateProfileMilestones,
  formatGradeThai,
  generateCertificateNumber,
} from '../services/masteryMilestones';
import {
  exportCertificateToPdf,
  exportCertificateToPng,
  getCertificateFile,
} from '../utils/certificatePdfExport';
import { CertificateSocialShareModal } from './CertificateSocialShareModal';
import { storageService, CertificateConfig, DEFAULT_CERTIFICATE_CONFIG } from '../services/storageService';
import { PRESET_EMBLEMS, SchoolEmblemRenderer } from '../data/certificateEmblems';

interface CertificateOfAchievementModalProps {
  profile: ChildProfile;
  isOpen: boolean;
  onClose: () => void;
  initialMilestoneId?: string;
}

export const CertificateOfAchievementModal: React.FC<CertificateOfAchievementModalProps> = ({
  profile,
  isOpen,
  onClose,
  initialMilestoneId,
}) => {
  const summary: ProfileMilestoneSummary = evaluateProfileMilestones(profile);
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Selected milestone to display
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(() => {
    if (initialMilestoneId) return initialMilestoneId;
    return summary.primaryMilestone.id;
  });

  // Customizer fields for official printing loaded from local storage
  const [config, setConfig] = useState<CertificateConfig>(() => storageService.getCertificateConfig());
  const [schoolName, setSchoolName] = useState<string>(config.schoolName);
  const [teacherName, setTeacherName] = useState<string>(config.teacherName);
  const [directorName, setDirectorName] = useState<string>(config.directorName || 'ดร.สมชาย การศึกษา');
  const [directorTitle, setDirectorTitle] = useState<string>(config.directorTitle || 'ผู้อำนวยการสถานศึกษา');
  const [schoolLogoUrl, setSchoolLogoUrl] = useState<string>(config.schoolLogoUrl || '');
  const [schoolLogoPreset, setSchoolLogoPreset] = useState<string>(config.schoolLogoPreset || 'emblem-torch');
  const [showSchoolLogo, setShowSchoolLogo] = useState<boolean>(config.showSchoolLogo ?? true);
  const [fontFamily, setFontFamily] = useState<'sarabun' | 'prompt' | 'kanit'>(config.fontFamily || 'sarabun');
  const [fontScale, setFontScale] = useState<'compact' | 'standard' | 'large'>(config.fontScale || 'standard');

  const [issueDate, setIssueDate] = useState<string>(() => {
    const today = new Date();
    return today.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string>('');
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);
  const [customizerTab, setCustomizerTab] = useState<'info' | 'typography' | 'logo'>('info');
  const [showSocialShareModal, setShowSocialShareModal] = useState<boolean>(false);

  // Keep selected milestone in sync with props
  useEffect(() => {
    if (initialMilestoneId) {
      setSelectedMilestoneId(initialMilestoneId);
    } else {
      setSelectedMilestoneId(summary.primaryMilestone.id);
    }
  }, [initialMilestoneId, profile.id]);

  // Fire celebratory confetti when modal opens
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899', '#3B82F6'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentMilestone =
    summary.milestones.find((m) => m.id === selectedMilestoneId) ||
    summary.primaryMilestone;

  const certNumber = generateCertificateNumber(profile.id, currentMilestone.id);

  // Helper to persist customization settings
  const persistConfig = (patch: Partial<CertificateConfig>) => {
    const updated = storageService.saveCertificateConfig(patch);
    setConfig(updated);
  };

  // Upload Custom School Logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง (PNG, JPG, SVG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        // Optimize & resize to max 320x320 for light footprint and crisp rendering
        const maxDim = 320;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/png');
          setSchoolLogoUrl(dataUrl);
          persistConfig({ schoolLogoUrl: dataUrl, showSchoolLogo: true });
        } else {
          setSchoolLogoUrl(result);
          persistConfig({ schoolLogoUrl: result, showSchoolLogo: true });
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCustomLogo = () => {
    setSchoolLogoUrl('');
    persistConfig({ schoolLogoUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectPresetLogo = (presetId: string) => {
    setSchoolLogoPreset(presetId);
    setSchoolLogoUrl(''); // Clear custom logo to switch back to preset
    persistConfig({ schoolLogoPreset: presetId, schoolLogoUrl: '' });
  };

  const handleResetToDefaults = () => {
    const def = DEFAULT_CERTIFICATE_CONFIG;
    setSchoolName(def.schoolName);
    setTeacherName(def.teacherName);
    setDirectorName(def.directorName);
    setDirectorTitle(def.directorTitle);
    setSchoolLogoUrl(def.schoolLogoUrl || '');
    setSchoolLogoPreset(def.schoolLogoPreset || 'emblem-torch');
    setShowSchoolLogo(def.showSchoolLogo);
    setFontFamily(def.fontFamily || 'sarabun');
    setFontScale(def.fontScale || 'standard');
    storageService.saveCertificateConfig(def);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Export to PDF
  const handleDownloadPdf = async () => {
    if (!certificateRef.current || isExporting) return;
    setIsExporting(true);
    setExportMessage('กำลังสร้างไฟล์เกียรติบัตร PDF ขนาด A4 แนวนอน...');

    try {
      const cleanName = profile.name.replace(/\s+/g, '_');
      const filename = `เกียรติบัตร_${cleanName}_${currentMilestone.id}.pdf`;
      await exportCertificateToPdf(certificateRef.current, {
        filename,
        pixelRatio: 3,
        onProgress: (msg) => setExportMessage(msg),
      });
      setExportMessage('ดาวน์โหลดสำเร็จเรียบร้อย! 🎉');
      setTimeout(() => {
        setIsExporting(false);
        setExportMessage('');
      }, 2000);
    } catch (err) {
      console.error('Certificate PDF export error:', err);
      setExportMessage('เกิดข้อผิดพลาดในการดาวน์โหลด PDF');
      setTimeout(() => {
        setIsExporting(false);
        setExportMessage('');
      }, 3000);
    }
  };

  // Export to PNG
  const handleDownloadPng = async () => {
    if (!certificateRef.current || isExporting) return;
    setIsExporting(true);
    setExportMessage('กำลังบันทึกภาพเกียรติบัตรความละเอียดสูง...');

    try {
      const cleanName = profile.name.replace(/\s+/g, '_');
      const filename = `เกียรติบัตร_${cleanName}_${currentMilestone.id}.png`;
      await exportCertificateToPng(certificateRef.current, filename);
      setExportMessage('บันทึกภาพสำเร็จเรียบร้อย! 🖼️');
      setTimeout(() => {
        setIsExporting(false);
        setExportMessage('');
      }, 2000);
    } catch (err) {
      console.error('Certificate PNG export error:', err);
      setExportMessage('เกิดข้อผิดพลาดในการบันทึกภาพ');
      setTimeout(() => {
        setIsExporting(false);
        setExportMessage('');
      }, 3000);
    }
  };

  // Share Achievement via Web Share API (with Image and Text snippet)
  const handleShareAchievement = async () => {
    if (!certificateRef.current || isExporting) return;
    setIsExporting(true);
    setExportMessage('กำลังเตรียมเกียรติบัตรและข้อความสรุปความสำเร็จสำหรับแชร์...');

    const cleanName = profile.name.replace(/\s+/g, '_');
    const filename = `เกียรติบัตร_${cleanName}_${currentMilestone.id}.png`;

    const shareTitle = `เกียรติบัตรความสำเร็จ: ${profile.name} - ${currentMilestone.title} 🏆`;
    const shareText = `🎉 ขอแสดงความยินดีกับ "${profile.name}" (ระดับชั้น ${formatGradeThai(profile.grade)})!
🏆 ได้รับเกียรติบัตร "${currentMilestone.title}" ${currentMilestone.icon}
🌟 ระดับความสำเร็จ: ${currentMilestone.badgeLabel}
📖 มาตรฐานผลงาน: ${currentMilestone.citationText}
⭐ เกณฑ์ความเชี่ยวชาญ: ${currentMilestone.criteriaText}
⭐ คะแนนรวม: ${profile.totalScore || 0} คะแนน | ตอบถูกสะสม: ${profile.totalQuestions || 0} ข้อ
🔥 เรียนรู้อย่างต่อเนื่อง: ${profile.streakDays || 1} วัน
📜 เลขที่เกียรติบัตร: ${certNumber}
🏫 ${schoolName || 'ระบบมาตรฐานปฐมวัยแห่งชาติ'}

🎮 มาร่วมเรียนรู้และพัฒนาทักษะปฐมวัยไปด้วยกัน!`;

    try {
      // Check if navigator.share is available
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        let fileShared = false;

        try {
          // Attempt to generate certificate PNG file
          const certFile = await getCertificateFile(certificateRef.current, filename, 2);

          // Test if sharing files is supported by this device/browser
          if (navigator.canShare && navigator.canShare({ files: [certFile] })) {
            await navigator.share({
              title: shareTitle,
              text: shareText,
              files: [certFile],
            });
            fileShared = true;
          }
        } catch (fileErr: any) {
          if (fileErr?.name === 'AbortError') {
            setIsExporting(false);
            setExportMessage('');
            return;
          }
          console.warn('File sharing not supported or failed, trying text share:', fileErr);
        }

        // If file sharing was not supported on this platform, share text and link
        if (!fileShared) {
          await navigator.share({
            title: shareTitle,
            text: shareText,
            url: window.location.href,
          });
        }

        setExportMessage('แชร์ความสำเร็จสำเร็จเรียบร้อย! 🎉');
        setTimeout(() => {
          setIsExporting(false);
          setExportMessage('');
        }, 2000);
      } else {
        // Fallback for browsers without Web Share API:
        // Copy summary text to clipboard and download PNG image
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareText);
        }
        await exportCertificateToPng(certificateRef.current, filename);

        setExportMessage('คัดลอกข้อความสรุป & บันทึกภาพเกียรติบัตรแล้ว! สามารถนำไปวางแชร์ได้ทันที 📋🖼️');
        setTimeout(() => {
          setIsExporting(false);
          setExportMessage('');
        }, 3500);
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        // User cancelled share dialog
        setIsExporting(false);
        setExportMessage('');
        return;
      }

      console.error('Share achievement error:', err);
      // Fallback: Copy to clipboard
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareText);
          setExportMessage('คัดลอกข้อความสรุปความสำเร็จลงคลิปบอร์ดแล้ว! 📋');
        } else {
          setExportMessage('เกิดข้อผิดพลาดในการแชร์');
        }
      } catch {
        setExportMessage('เกิดข้อผิดพลาดในการแชร์');
      }

      setTimeout(() => {
        setIsExporting(false);
        setExportMessage('');
      }, 3000);
    }
  };

  // Direct Browser Print with Landscape A4 layout injection
  const handlePrint = () => {
    const styleId = 'certificate-dynamic-print-style';
    let style = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
    style.innerHTML = `@page { size: landscape !important; margin: 0 !important; }`;

    window.print();

    setTimeout(() => {
      style?.remove();
    }, 1500);
  };

  // Trigger manual confetti
  const handleCelebrate = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899', '#3B82F6'],
      });
    } catch {
      // Ignore
    }
  };

  return (
    <div
      id="certificate-modal-backdrop"
      className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
    >
      <div className="bg-slate-900 text-slate-100 rounded-3xl shadow-2xl max-w-5xl w-full border border-amber-500/30 overflow-hidden my-auto max-h-[96vh] flex flex-col">
        {/* Modal Header Bar */}
        <div className="no-certificate-export bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl filter drop-shadow-sm">🏆</span>
            <div>
              <h2 className="text-base sm:text-lg font-black font-display text-white flex items-center gap-2">
                <span>เกียรติบัตรแสดงความสำเร็จ & มาตรฐานความเชี่ยวชาญ</span>
                <span className="hidden sm:inline-block bg-white/20 text-white text-[11px] px-2 py-0.5 rounded-full font-bold">
                  Print-Ready A4
                </span>
              </h2>
              <p className="text-xs text-amber-100 font-medium">
                {profile.name} • ระดับชั้น {profile.grade} • ปลดล็อกแล้ว {summary.unlockedCount} / {summary.totalMilestones} เกียรติบัตร
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCelebrate}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-black transition-all flex items-center gap-1 cursor-pointer"
              title="ยิงพลุเฉลิมฉลอง"
            >
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span className="hidden sm:inline">ฉลอง</span>
            </button>
            <button
              type="button"
              id="btn-close-certificate-modal"
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Milestone Selector Tabs & Actions Toolbar */}
        <div className="no-certificate-export bg-slate-800 border-b border-slate-700 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          {/* Milestone Dropdown / Picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <Award className="w-4 h-4" /> เลือกเกียรติบัตร:
            </span>
            <select
              value={selectedMilestoneId}
              onChange={(e) => setSelectedMilestoneId(e.target.value)}
              className="bg-slate-900 border border-amber-500/40 rounded-xl px-3 py-1.5 text-xs font-black text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer w-auto max-w-full"
            >
              <optgroup label="🌟 เกียรติบัตรที่ปลดล็อกแล้ว">
                {summary.unlockedMilestones.map((m) => (
                  <option key={m.id} value={m.id}>
                    ✓ {m.icon} {m.title}
                  </option>
                ))}
              </optgroup>
              {summary.milestones.filter((m) => !m.isUnlocked).length > 0 && (
                <optgroup label="🔒 เกียรติบัตรขั้นถัดไป (ตัวอย่างผลงาน)">
                  {summary.milestones
                    .filter((m) => !m.isUnlocked)
                    .map((m) => (
                      <option key={m.id} value={m.id}>
                        🔒 {m.icon} {m.title} ({m.criteriaText})
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <button
              type="button"
              id="btn-toggle-certificate-customizer"
              onClick={() => setShowCustomizer(!showCustomizer)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                showCustomizer
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>ปรับแต่งชื่อ ผอ./โลโก้</span>
            </button>

            {/* Share to Social Button (Web Share API) */}
            <button
              type="button"
              id="btn-share-to-social"
              onClick={() => setShowSocialShareModal(true)}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer group"
              title="แชร์เกียรติบัตรและความสำเร็จสู่โซเชียลมีเดีย (Web Share API, LINE, Facebook, คัดลอกรูปภาพ)"
            >
              <Share2 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>แชร์สู่โซเชียล</span>
              <span className="hidden sm:inline-block bg-slate-950/20 text-slate-950 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                ภาพ HD 📱
              </span>
            </button>

            <button
              type="button"
              id="btn-download-certificate-pdf"
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all cursor-pointer"
              title="บันทึกเป็นรูปภาพ PNG"
            >
              <FileImage className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">รูปภาพ PNG</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all cursor-pointer"
              title="สั่งพิมพ์ผ่านเครื่องพิมพ์ (Print)"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">พิมพ์ทันที</span>
            </button>
          </div>
        </div>

        {/* Customizer Form Drawer */}
        {showCustomizer && (
          <div
            id="certificate-customizer-panel"
            className="no-certificate-export bg-slate-800/95 border-b border-slate-700 p-3 sm:p-4 animate-in slide-in-from-top-2 text-xs"
          >
            {/* Customizer Sub-tabs */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/80">
              <div className="flex items-center flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCustomizerTab('info')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    customizerTab === 'info'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>ข้อมูลสถานศึกษา & ผู้อำนวยการ</span>
                </button>

                <button
                  type="button"
                  id="btn-customizer-tab-typography"
                  onClick={() => setCustomizerTab('typography')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    customizerTab === 'typography'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>รูปแบบฟอนต์ & การจัดหน้า</span>
                </button>

                <button
                  type="button"
                  id="btn-customizer-tab-logo"
                  onClick={() => setCustomizerTab('logo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    customizerTab === 'logo'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>ตราสัญลักษณ์ / โลโก้สถานศึกษา</span>
                  {schoolLogoUrl && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="อัปโหลดโลโก้แล้ว" />
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleResetToDefaults}
                className="text-slate-400 hover:text-amber-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                title="คืนค่าเป็นค่าเริ่มต้น"
              >
                <RotateCcw className="w-3 h-3" />
                <span>รีเซ็ตค่าเริ่มต้น</span>
              </button>
            </div>

            {/* Tab 1: Info (School, Director, Teacher, Date) */}
            {customizerTab === 'info' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* School Name */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <School className="w-3.5 h-3.5 text-amber-400" /> ชื่อโรงเรียน / ศูนย์พัฒนาเด็กเล็ก:
                  </label>
                  <input
                    type="text"
                    id="input-certificate-school-name"
                    value={schoolName}
                    onChange={(e) => {
                      setSchoolName(e.target.value);
                      persistConfig({ schoolName: e.target.value });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-400 text-xs"
                    placeholder="เช่น โรงเรียนอนุบาลพัฒนาการปฐมวัย"
                  />
                </div>

                {/* Director Name */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" /> ชื่อผู้อำนวยการสถานศึกษา:
                  </label>
                  <input
                    type="text"
                    id="input-certificate-director-name"
                    value={directorName}
                    onChange={(e) => {
                      setDirectorName(e.target.value);
                      persistConfig({ directorName: e.target.value });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-400 text-xs font-semibold"
                    placeholder="เช่น ดร.สมชาย การศึกษา"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">ระบุชื่อและคำนำหน้า จะปรากฏในช่องลงนามขวา</p>
                </div>

                {/* Director Title */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" /> ตำแหน่งผู้บริหาร / ผู้ลงนาม:
                  </label>
                  <input
                    type="text"
                    id="input-certificate-director-title"
                    value={directorTitle}
                    onChange={(e) => {
                      setDirectorTitle(e.target.value);
                      persistConfig({ directorTitle: e.target.value });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-400 text-xs"
                    placeholder="เช่น ผู้อำนวยการสถานศึกษา"
                  />
                </div>

                {/* Teacher Name */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" /> ชื่อครูประจำชั้น / ผู้สอน:
                  </label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => {
                      setTeacherName(e.target.value);
                      persistConfig({ teacherName: e.target.value });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-400 text-xs"
                    placeholder="เช่น คุณครูประจำชั้น"
                  />
                </div>

                {/* Issue Date */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> วันที่ระบุในเกียรติบัตร:
                  </label>
                  <input
                    type="text"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Typography & Layout Style (Anti-Overflow & Proper Thai Fonts) */}
            {customizerTab === 'typography' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Font 1: Sarabun */}
                  <button
                    type="button"
                    onClick={() => {
                      setFontFamily('sarabun');
                      persistConfig({ fontFamily: 'sarabun' });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      fontFamily === 'sarabun'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-sm ring-1 ring-amber-400/50'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs flex items-center gap-1.5">
                        <span className="text-amber-400 font-serif font-black">TH</span> สารบรรณ (Sarabun)
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded">
                        มาตรฐาน สพฐ.
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mb-2">
                      ฟอนต์ทางการไทยแท้ สระและวรรณยุกต์สมบูรณ์แบบ กะทัดรัด ป้องกันการล้นบรรทัด 100%
                    </p>
                    <div
                      className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px] text-center font-normal text-slate-200"
                      style={{ fontFamily: "'Sarabun', 'Prompt', sans-serif" }}
                    >
                      ประกาศนียบัตรเชิดชูเกียรติ พ.ศ. ๒๕๖๙
                    </div>
                    {fontFamily === 'sarabun' && (
                      <div className="absolute top-2.5 right-2 text-amber-400">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>

                  {/* Font 2: Prompt */}
                  <button
                    type="button"
                    onClick={() => {
                      setFontFamily('prompt');
                      persistConfig({ fontFamily: 'prompt' });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      fontFamily === 'prompt'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-sm ring-1 ring-amber-400/50'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs flex items-center gap-1.5">
                        <span className="text-amber-400 font-black">P</span> พร้อมต์ (Prompt)
                      </span>
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.5 rounded">
                        โมเดิร์นร่วมสมัย
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mb-2">
                      ฟอนต์สไตล์โมเดิร์นร่วมสมัย อ่านง่าย คมชัด ทันสมัย โดดเด่นทั้งจอภาพและสิ่งพิมพ์
                    </p>
                    <div
                      className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px] text-center font-normal text-slate-200"
                      style={{ fontFamily: "'Prompt', sans-serif" }}
                    >
                      Certificate of Early Childhood Mastery
                    </div>
                    {fontFamily === 'prompt' && (
                      <div className="absolute top-2.5 right-2 text-amber-400">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>

                  {/* Font 3: Kanit */}
                  <button
                    type="button"
                    onClick={() => {
                      setFontFamily('kanit');
                      persistConfig({ fontFamily: 'kanit' });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      fontFamily === 'kanit'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-sm ring-1 ring-amber-400/50'
                        : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs flex items-center gap-1.5">
                        <span className="text-amber-400 font-black">K</span> คณิต (Kanit)
                      </span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">
                        เรขาคณิตมน
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mb-2">
                      ทรงเรขาคณิตมน ตัวหนาเด่น ชัดเจน อบอุ่น เหมาะกับกิจกรรมปฐมวัย
                    </p>
                    <div
                      className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px] text-center font-normal text-slate-200"
                      style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                      รางวัลเกียรติบัตรระดับยอดเยี่ยม 🏆
                    </div>
                    {fontFamily === 'kanit' && (
                      <div className="absolute top-2.5 right-2 text-amber-400">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                </div>

                {/* Font Scaling & Fit Safeguards */}
                <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> สัดส่วนขนาดตัวอักษรเพื่อความสมบูรณ์แบบ (Font Scaling)
                    </h4>
                    <p className="text-[10.5px] text-slate-400 mt-0.5">
                      แสดงชื่อ-นามสกุล ข้อมูลสถานศึกษา และระดับเกียรติบัตรครบถ้วน 100% ไม่มีการตัดทอนหรือจำกัดความยาว
                    </p>
                  </div>

                  <div className="inline-flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setFontScale('compact');
                        persistConfig({ fontScale: 'compact' });
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        fontScale === 'compact'
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="ย่อขนาดลงเล็กน้อย สำหรับโรงเรียนหรือชื่อ-นามสกุลที่ยาวเป็นพิเศษ"
                    >
                      กะทัดรัด (Compact)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFontScale('standard');
                        persistConfig({ fontScale: 'standard' });
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        fontScale === 'standard'
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="สัดส่วนมาตรฐานทางการ สวยงามและสมดุลที่สุด"
                    >
                      มาตรฐาน (Standard)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFontScale('large');
                        persistConfig({ fontScale: 'large' });
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        fontScale === 'large'
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="ตัวอักษรใหญ่ชัดเจน สำหรับชื่อสั้นและต้องการความโดดเด่น"
                    >
                      ตัวโตเด่น (Large)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Logo & Emblems (Custom Upload + Presets) */}
            {customizerTab === 'logo' && (
              <div className="space-y-3">
                {/* Logo visibility switch */}
                <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-slate-200">แสดงตราสัญลักษณ์สถานศึกษาบนเกียรติบัตร</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !showSchoolLogo;
                      setShowSchoolLogo(next);
                      persistConfig({ showSchoolLogo: next });
                    }}
                    className={`px-3 py-1 rounded-full font-black text-xs transition-all cursor-pointer ${
                      showSchoolLogo
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {showSchoolLogo ? '✓ แสดงอยู่' : 'ซ่อนไว้'}
                  </button>
                </div>

                {showSchoolLogo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Upload Custom Logo Section */}
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                      <h4 className="font-black text-amber-400 text-xs mb-2 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" /> อัปโหลดตราโรงเรียนของคุณเอง (Custom Logo)
                      </h4>

                      {schoolLogoUrl ? (
                        <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-emerald-500/40">
                          <img
                            src={schoolLogoUrl}
                            alt="ตราโรงเรียนที่อัปโหลด"
                            className="w-14 h-14 object-contain rounded-lg bg-white p-1 shadow-sm border border-slate-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-emerald-400 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> กำลังใช้งานโลโก้ที่อัปโหลด
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              ภาพคมชัดและถูกบันทึกลงในระบบเรียบร้อย
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-bold cursor-pointer transition-colors"
                              >
                                เปลี่ยนภาพ
                              </button>
                              <button
                                type="button"
                                onClick={handleRemoveCustomLogo}
                                className="px-2 py-1 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3 h-3" /> ลบโลโก้
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-3 border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-xl transition-colors">
                          <ImageIcon className="w-8 h-8 text-slate-500 mx-auto mb-1.5" />
                          <p className="text-xs font-bold text-slate-300">
                            คลิกเพื่ออัปโหลดตราสัญลักษณ์โรงเรียน
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5 mb-2">
                            รองรับไฟล์ PNG, JPG, SVG (แนะนำพื้นหลังโปร่งใส)
                          </p>
                          <button
                            type="button"
                            id="btn-upload-school-logo"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-black transition-all cursor-pointer"
                          >
                            เลือกไฟล์รูปภาพ
                          </button>
                        </div>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </div>

                    {/* Choose Standard Preset Emblems */}
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                      <h4 className="font-black text-amber-400 text-xs mb-2 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" /> หรือเลือกตราสัญลักษณ์มาตรฐาน (5 แบบ)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                        {PRESET_EMBLEMS.map((emblem) => {
                          const isSelected = !schoolLogoUrl && schoolLogoPreset === emblem.id;
                          return (
                            <button
                              key={emblem.id}
                              type="button"
                              onClick={() => handleSelectPresetLogo(emblem.id)}
                              className={`p-2 rounded-lg text-left flex items-center gap-2 border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-xs'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                              }`}
                            >
                              <div className="shrink-0">
                                <SchoolEmblemRenderer presetId={emblem.id} size={36} className="w-9 h-9" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-black truncate">{emblem.name}</p>
                                <p className="text-[9px] text-slate-500 truncate">{emblem.description}</p>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Export Progress Notification */}
        {exportMessage && (
          <div className="no-certificate-export bg-amber-500 text-slate-950 px-4 py-2 text-xs font-black flex items-center justify-center gap-2 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>{exportMessage}</span>
          </div>
        )}

        {/* Notice for Locked Milestone */}
        {!currentMilestone.isUnlocked && (
          <div className="no-certificate-export bg-amber-950/70 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>🔒</span>
              <span>
                <strong>เกียรติบัตรนี้ยังไม่ปลดล็อก:</strong> เกณฑ์คือ {currentMilestone.criteriaText} (ปัจจุบันทำได้: {currentMilestone.currentValue} / {currentMilestone.targetValue})
              </span>
            </span>
            <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
              โหมดพรีวิวตัวอย่าง
            </span>
          </div>
        )}

        {/* Scrollable Container with Certificate Preview */}
        <div className="p-3 sm:p-6 overflow-y-auto flex-1 bg-slate-950/80 flex items-center justify-center">
          {/* Outer scaling wrapper so the A4 Landscape fits beautifully on all screens */}
          <div className="w-full max-w-[940px] flex justify-center">
            {(() => {
              const activeFontFamilyCss =
                fontFamily === 'sarabun'
                  ? "'Sarabun', 'Prompt', system-ui, sans-serif"
                  : fontFamily === 'prompt'
                  ? "'Prompt', 'Sarabun', system-ui, sans-serif"
                  : "'Kanit', 'Prompt', system-ui, sans-serif";

              const nameLength = (profile.name || '').length;
              const isLongName = nameLength > 20;
              const isVeryLongName = nameLength > 32;

              const schoolNameLength = (schoolName || '').length;
              const isLongSchool = schoolNameLength > 32;

              const milestoneTitleLength = (currentMilestone.title || '').length;
              const isLongMilestone = milestoneTitleLength > 22;
              const isVeryLongMilestone = milestoneTitleLength > 30;

              const scales = {
                compact: {
                  containerPad: 'p-3 sm:p-5 md:p-6',
                  schoolText: isLongSchool
                    ? 'text-[8.5px] sm:text-[9.5px] md:text-[10.5px]'
                    : 'text-[10px] sm:text-[11px] md:text-xs',
                  certTitle: 'text-base sm:text-xl md:text-2xl',
                  certSubtitle: 'text-[7.5px] sm:text-[8.5px] md:text-[9.5px]',
                  taglineText: 'text-[7px] sm:text-[8px] md:text-[8.5px]',
                  headerDivider: 'my-1 sm:my-1.5',
                  recipientPrompt: 'text-[10px] sm:text-xs',
                  studentName: isVeryLongName
                    ? 'text-sm sm:text-base md:text-lg'
                    : isLongName
                    ? 'text-base sm:text-lg md:text-xl'
                    : 'text-lg sm:text-xl md:text-2xl',
                  avatar: 'text-xl sm:text-2xl',
                  gradeText: 'text-[10px] sm:text-xs',
                  milestoneTitle: isVeryLongMilestone
                    ? 'text-[8px] sm:text-[9px] px-2 py-0.5'
                    : isLongMilestone
                    ? 'text-[9px] sm:text-[10px] px-2.5 py-0.5'
                    : 'text-[10px] sm:text-xs px-2.5 py-0.5',
                  citationText: 'text-[9.5px] sm:text-[10.5px] md:text-[11.5px] leading-snug',
                  pillsText: 'text-[8px] sm:text-[9px]',
                  signaturesPad: 'pt-1.5 sm:pt-2',
                  signatureSlotHeight: 'h-5 sm:h-7',
                  signatureText: 'text-[10px] sm:text-xs',
                  signatureRoleText: 'text-[8px] sm:text-[9px]',
                  sealBox: 'w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12',
                  sealText: 'text-[6px] sm:text-[7.5px]',
                  sealStars: 'text-[6px] sm:text-[7px]',
                  sealRibbon: 'text-xs sm:text-sm -bottom-2',
                  dateText: 'text-[7.5px] sm:text-[8px] mt-1',
                  serialBar: 'mt-1 pt-0.5 text-[6.5px] sm:text-[7.5px]',
                },
                standard: {
                  containerPad: 'p-4 sm:p-6 md:p-7',
                  schoolText: isLongSchool
                    ? 'text-[9.5px] sm:text-[10.5px] md:text-[11.5px]'
                    : 'text-[11px] sm:text-xs md:text-xs',
                  certTitle: 'text-lg sm:text-2xl md:text-[26px]',
                  certSubtitle: 'text-[8px] sm:text-[9.5px] md:text-[10px]',
                  taglineText: 'text-[7.5px] sm:text-[8.5px] md:text-[9px]',
                  headerDivider: 'my-1 sm:my-2',
                  recipientPrompt: 'text-[11px] sm:text-xs md:text-sm',
                  studentName: isVeryLongName
                    ? 'text-base sm:text-lg md:text-xl'
                    : isLongName
                    ? 'text-lg sm:text-xl md:text-[24px]'
                    : 'text-xl sm:text-2xl md:text-[28px]',
                  avatar: 'text-2xl sm:text-3xl',
                  gradeText: 'text-[11px] sm:text-xs md:text-sm',
                  milestoneTitle: isVeryLongMilestone
                    ? 'text-[8.5px] sm:text-[9.5px] md:text-[10px] px-2.5 py-0.5'
                    : isLongMilestone
                    ? 'text-[9.5px] sm:text-[10.5px] md:text-[11px] px-2.5 py-0.5 sm:py-1'
                    : 'text-[10.5px] sm:text-xs px-3 py-0.5 sm:py-1',
                  citationText: 'text-[10px] sm:text-[11.5px] md:text-xs leading-normal',
                  pillsText: 'text-[8.5px] sm:text-[9.5px] md:text-[10px]',
                  signaturesPad: 'pt-2 sm:pt-3',
                  signatureSlotHeight: 'h-6 sm:h-8',
                  signatureText: 'text-[11px] sm:text-xs md:text-sm',
                  signatureRoleText: 'text-[8.5px] sm:text-[9.5px] md:text-[10px]',
                  sealBox: 'w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14',
                  sealText: 'text-[7px] sm:text-[8.5px]',
                  sealStars: 'text-[6.5px] sm:text-[8px]',
                  sealRibbon: 'text-xs sm:text-base -bottom-2',
                  dateText: 'text-[7.5px] sm:text-[8.5px] mt-1',
                  serialBar: 'mt-1.5 pt-1 text-[7px] sm:text-[8px]',
                },
                large: {
                  containerPad: 'p-4 sm:p-6 md:p-8',
                  schoolText: isLongSchool
                    ? 'text-[10.5px] sm:text-xs md:text-sm'
                    : 'text-xs sm:text-sm',
                  certTitle: 'text-xl sm:text-2xl md:text-3xl',
                  certSubtitle: 'text-[9px] sm:text-[10.5px] md:text-xs',
                  taglineText: 'text-[8px] sm:text-[9.5px] md:text-[10px]',
                  headerDivider: 'my-1.5 sm:my-2.5',
                  recipientPrompt: 'text-xs sm:text-sm',
                  studentName: isVeryLongName
                    ? 'text-lg sm:text-xl md:text-2xl'
                    : isLongName
                    ? 'text-xl sm:text-2xl md:text-[28px]'
                    : 'text-2xl sm:text-3xl md:text-4xl',
                  avatar: 'text-2xl sm:text-3xl md:text-4xl',
                  gradeText: 'text-xs sm:text-sm md:text-base',
                  milestoneTitle: isVeryLongMilestone
                    ? 'text-[9.5px] sm:text-[10.5px] md:text-xs px-3 py-0.5 sm:py-1'
                    : isLongMilestone
                    ? 'text-[10.5px] sm:text-xs md:text-sm px-3 py-1'
                    : 'text-xs sm:text-sm px-3.5 py-1',
                  citationText: 'text-[11px] sm:text-xs md:text-sm leading-relaxed',
                  pillsText: 'text-[9px] sm:text-[10.5px]',
                  signaturesPad: 'pt-2.5 sm:pt-3.5',
                  signatureSlotHeight: 'h-6 sm:h-8',
                  signatureText: 'text-xs sm:text-sm md:text-base',
                  signatureRoleText: 'text-[9.5px] sm:text-xs',
                  sealBox: 'w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15',
                  sealText: 'text-[7.5px] sm:text-[9px]',
                  sealStars: 'text-[7px] sm:text-[8.5px]',
                  sealRibbon: 'text-sm sm:text-base -bottom-2.5',
                  dateText: 'text-[8px] sm:text-[9px] mt-1.5',
                  serialBar: 'mt-2 pt-1 text-[7.5px] sm:text-[8.5px]',
                },
              }[fontScale];

              return (
                /*
                  CERTIFICATE OFFICIAL A4 PRINT CANVAS
                  Dimensions: 940px x 665px (Aspect ratio ~ 1.414 Landscape A4)
                */
                <div
                  id="certificate-print-area"
                  ref={certificateRef}
                  className={`w-full aspect-[1.414/1] bg-[#FFFDF9] text-slate-800 rounded-lg ${scales.containerPad} relative overflow-hidden shadow-2xl flex flex-col justify-between select-none`}
                  style={{
                    fontFamily: activeFontFamilyCss,
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Outer Classical Royal Navy & Gold Filigree Border */}
                  <div
                    className="absolute inset-2 sm:inset-3 md:inset-4 border-4 border-[#0F172A] pointer-events-none rounded-sm"
                    style={{
                      boxShadow: 'inset 0 0 0 2px #D97706, 0 0 0 1px #B45309',
                    }}
                  />

                  {/* Inner Double Inset Gold Fillet */}
                  <div
                    className="absolute inset-4 sm:inset-5 md:inset-7 border border-[#D97706] pointer-events-none opacity-80"
                    style={{
                      outline: '1px solid #F59E0B',
                      outlineOffset: '2px',
                    }}
                  />

                  {/* Corner Ornate Accents (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
                  <div className="absolute top-5 left-5 sm:top-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-amber-600 pointer-events-none" />
                  <div className="absolute top-5 right-5 sm:top-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-amber-600 pointer-events-none" />
                  <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-amber-600 pointer-events-none" />
                  <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-amber-600 pointer-events-none" />

                  {/* Faint Guilloche / Watermark Background Texture */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center text-[120px] font-black text-amber-900 select-none">
                    🏅
                  </div>

                  {/* 1. TOP HEADER SECTION */}
                  <div className="relative z-10 text-center pt-0.5 sm:pt-1">
                    {/* Official School Logo / Emblem */}
                    {showSchoolLogo && (
                      <div className="flex items-center justify-center mb-1 sm:mb-1.5">
                        <SchoolEmblemRenderer
                          presetId={schoolLogoPreset}
                          customLogoUrl={schoolLogoUrl}
                          size={fontScale === 'compact' ? 46 : fontScale === 'large' ? 58 : 52}
                          className="w-11 h-11 sm:w-13 sm:h-13"
                        />
                      </div>
                    )}

                    {/* Institutional / School Title (No Truncate, Full Text) */}
                    <div className={`${scales.schoolText} font-black tracking-wide uppercase text-slate-800 mb-0.5 w-full mx-auto px-2 leading-snug`}>
                      {schoolName}
                    </div>

                    {/* Main Certificate Title (Dual Thai & English) */}
                    <h1 className={`${scales.certTitle} font-bold tracking-tight text-[#0F172A] leading-snug`}>
                      ประกาศนียบัตรเชิดชูเกียรติ
                    </h1>
                    <div className={`${scales.certSubtitle} font-black tracking-[0.16em] text-amber-700 uppercase mt-0.5 whitespace-nowrap`}>
                      CERTIFICATE OF EARLY CHILDHOOD MASTERY
                    </div>

                    <div className={`${scales.taglineText} text-slate-500 font-medium mt-0.5 w-full mx-auto px-2 leading-tight`}>
                      ระบบประเมินทักษะปฐมวัยตามหลักสูตรแกนกลางการศึกษาปฐมวัย กระทรวงศึกษาธิการ
                    </div>

                    {/* Decorative Center Golden Divider */}
                    <div className={`flex items-center justify-center gap-2 ${scales.headerDivider}`}>
                      <div className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-amber-500" />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-amber-500" />
                      <div className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-amber-500" />
                    </div>
                  </div>

                  {/* 2. BODY / RECIPIENT SECTION */}
                  <div className="relative z-10 text-center my-auto px-3 sm:px-8">
                    <p className={`${scales.recipientPrompt} text-slate-600 font-normal italic whitespace-nowrap`}>
                      ขอมอบเกียรติบัตรฉบับนี้ไว้เพื่อแสดงว่า
                    </p>

                    {/* Student Name with Avatar & Royal Underline */}
                    <div className="my-1 sm:my-2 inline-flex flex-col items-center max-w-full">
                      <div className="flex items-center justify-center gap-2 max-w-full">
                        <span className={scales.avatar}>{profile.avatar}</span>
                        <h2 className={`${scales.studentName} font-bold text-[#0F172A] tracking-normal whitespace-nowrap`}>
                          {profile.name}
                        </h2>
                      </div>
                      <div className="h-0.5 sm:h-1 w-full min-w-[200px] max-w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-0.5 sm:mt-1" />
                    </div>

                    {/* Student Grade */}
                    <p className={`${scales.gradeText} font-bold text-amber-800 whitespace-nowrap`}>
                      ระดับชั้น {formatGradeThai(profile.grade)}
                    </p>

                    {/* Milestone Title & Description Citation (Certificate Level - No Truncate, Full Text, No Wrap) */}
                    <div className="mt-1 sm:mt-2 w-full mx-auto space-y-0.5 sm:space-y-1 px-2 flex flex-col items-center">
                      <div className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 bg-amber-50 border border-amber-300 rounded-full ${scales.milestoneTitle} font-bold text-amber-900 shadow-2xs whitespace-nowrap`}>
                        <span className="shrink-0 text-amber-500 select-none">✨</span>
                        <span className="whitespace-nowrap">{currentMilestone.title}</span>
                        <span className="shrink-0 text-amber-500 select-none">✨</span>
                      </div>
                      <p className={`${scales.citationText} text-slate-700 font-normal pt-0.5 w-full max-w-2xl mx-auto break-words px-2`}>
                        {currentMilestone.citationText}
                      </p>
                    </div>

                    {/* Achievement Highlight Metric Pills */}
                    <div className={`flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 ${scales.pillsText}`}>
                      {currentMilestone.accuracy !== undefined && (
                        <div className="bg-emerald-50 text-emerald-900 border border-emerald-300 px-2 sm:px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0 whitespace-nowrap">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>ความแม่นยำ: {currentMilestone.accuracy}%</span>
                        </div>
                      )}
                      <div className="bg-amber-50 text-amber-900 border border-amber-300 px-2 sm:px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0 whitespace-nowrap">
                        <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                        <span>คะแนนสะสม: {profile.totalScore || summary.totalScore} คะแนน</span>
                      </div>
                      <div className="bg-indigo-50 text-indigo-900 border border-indigo-300 px-2 sm:px-2.5 py-0.5 rounded-full font-bold shrink-0 whitespace-nowrap">
                        📝 ทำแบบฝึกหัด: {profile.totalQuestions || summary.totalQuestions} ข้อ
                      </div>
                      {profile.streakDays > 0 && (
                        <div className="bg-orange-50 text-orange-900 border border-orange-300 px-2 sm:px-2.5 py-0.5 rounded-full font-bold shrink-0 whitespace-nowrap">
                          🔥 สตรีค: {profile.streakDays} วัน
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3. BOTTOM SIGNATURES & OFFICIAL SEAL SECTION */}
                  <div className={`relative z-10 ${scales.signaturesPad} border-t border-amber-200/80 mt-auto`}>
                    <div className="grid grid-cols-3 items-end gap-1 sm:gap-2 text-center">
                      {/* Left Signature: Class Teacher */}
                      <div className="flex flex-col items-center min-w-0">
                        <div className={`${scales.signatureSlotHeight} flex items-end justify-center w-full`}>
                          <span className={`italic text-slate-700 ${scales.signatureText} border-b border-dotted border-slate-500 px-2 sm:px-4 pb-0.5 whitespace-nowrap`}>
                            ({teacherName})
                          </span>
                        </div>
                        <p className={`${scales.signatureRoleText} font-bold text-slate-800 mt-1 whitespace-nowrap`}>
                          ครูประจำชั้น / ผู้ประเมิน
                        </p>
                        <p className="text-[7.5px] sm:text-[8.5px] text-slate-500 w-full px-1 leading-tight">
                          {schoolName}
                        </p>
                      </div>

                      {/* Center: Golden Rosette Seal of Excellence */}
                      <div className="flex flex-col items-center justify-center">
                        <div className={`${scales.sealBox} rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 p-0.5 shadow-md flex items-center justify-center relative`}>
                          <div className="w-full h-full rounded-full border border-white/80 flex flex-col items-center justify-center text-center text-amber-950 p-0.5">
                            <span className={`${scales.sealText} font-black tracking-wider uppercase`}>
                              SEAL OF
                            </span>
                            <span className={`${scales.sealText} font-black tracking-tight text-amber-900`}>
                              EXCELLENCE
                            </span>
                            <div className={`${scales.sealStars} flex items-center gap-0.5 text-amber-700`}>
                              ★★★★★
                            </div>
                          </div>
                          {/* Ribbon Tail */}
                          <div className={`absolute ${scales.sealRibbon} filter drop-shadow-xs`}>
                            🎖️
                          </div>
                        </div>
                        <div className={`${scales.dateText} font-bold text-slate-500 whitespace-nowrap`}>
                          วันที่ออกเกียรติบัตร: {issueDate}
                        </div>
                      </div>

                      {/* Right Signature: Principal / Director (ผู้อำนวยการสถานศึกษา) */}
                      <div className="flex flex-col items-center min-w-0">
                        <div className={`${scales.signatureSlotHeight} flex items-end justify-center w-full`}>
                          <span className={`italic text-slate-700 ${scales.signatureText} border-b border-dotted border-slate-500 px-2 sm:px-4 pb-0.5 whitespace-nowrap`}>
                            ({directorName})
                          </span>
                        </div>
                        <p className={`${scales.signatureRoleText} font-bold text-slate-800 mt-1 whitespace-nowrap`}>
                          {directorTitle}
                        </p>
                        <p className="text-[7.5px] sm:text-[8.5px] text-slate-500 w-full px-1 leading-tight">
                          {schoolName}
                        </p>
                      </div>
                    </div>

                    {/* Serial Number & Official Registry Bar */}
                    <div className={`flex items-center justify-between ${scales.serialBar} text-slate-400 font-mono border-t border-slate-100 px-1`}>
                      <span className="shrink-0">รหัสรับรอง: {certNumber}</span>
                      <span className="text-right">ระบบมาตรฐานปฐมวัยแห่งชาติ</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Modal Bottom Advisory Bar */}
        <div className="no-certificate-export bg-slate-900 border-t border-slate-800 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              เกียรติบัตรถูกจัดรูปแบบตามมาตรฐาน A4 แนวนอน (Landscape 297×210 mm) พร้อมฟอนต์ไทยคมชัดสำหรับพิมพ์หรือแนบพอร์ตโฟลิโอ
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-bottom-share-to-social"
              onClick={() => setShowSocialShareModal(true)}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              title="แชร์ความสำเร็จและเกียรติบัตรสู่โซเชียลมีเดีย (Web Share API)"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>แชร์สู่โซเชียล (Share to Social)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>

        {/* Dedicated Social Share Modal with Web Share API & Image Sharing */}
        <CertificateSocialShareModal
          isOpen={showSocialShareModal}
          onClose={() => setShowSocialShareModal(false)}
          profile={profile}
          currentMilestone={currentMilestone}
          certificateRef={certificateRef}
          certNumber={certNumber}
          schoolName={schoolName}
        />
      </div>
    </div>
  );
};
