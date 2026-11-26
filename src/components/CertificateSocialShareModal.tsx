import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Share2,
  X,
  Copy,
  Check,
  Download,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Smartphone,
  ShieldCheck,
  Award,
  Loader2,
  AlertCircle,
  Send,
} from 'lucide-react';
import { ChildProfile } from '../types';
import { MasteryMilestone, formatGradeThai } from '../services/masteryMilestones';
import {
  getCertificateDataUrl,
  copyCertificateImageToClipboard,
  exportCertificateToPng,
  shareCertificateViaWebShare,
  isWebShareSupported,
  isWebShareFileSupported,
} from '../utils/certificatePdfExport';

interface CertificateSocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ChildProfile;
  currentMilestone: MasteryMilestone;
  certificateRef: React.RefObject<HTMLDivElement | null>;
  certNumber: string;
  schoolName: string;
}

export const CertificateSocialShareModal: React.FC<CertificateSocialShareModalProps> = ({
  isOpen,
  onClose,
  profile,
  currentMilestone,
  certificateRef,
  certNumber,
  schoolName,
}) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
  const [isGeneratingPreview, setIsGeneratingPreview] = useState<boolean>(false);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [shareStatusMessage, setShareStatusMessage] = useState<string>('');
  const [shareStatusType, setShareStatusType] = useState<'info' | 'success' | 'error'>('info');

  const [copiedCaptionToast, setCopiedCaptionToast] = useState<boolean>(false);
  const [copiedImageToast, setCopiedImageToast] = useState<boolean>(false);

  // Generate rich default celebratory caption
  const defaultCaption = `🎉 ขอแสดงความยินดีกับน้อง "${profile.name}" (ระดับชั้น ${formatGradeThai(profile.grade)})!
🏆 ได้รับเกียรติบัตร "${currentMilestone.title}" ${currentMilestone.icon}
🌟 ระดับความสำเร็จ: ${currentMilestone.badgeLabel}
📖 มาตรฐานหลักสูตร: ${currentMilestone.citationText}
⭐ เกณฑ์ความเชี่ยวชาญ: ${currentMilestone.criteriaText}
⭐ คะแนนสะสม: ${profile.totalScore || 0} คะแนน | ตอบถูกสะสม: ${profile.totalQuestions || 0} ข้อ
🔥 การเรียนรู้อย่างต่อเนื่อง: ${profile.streakDays || 1} วัน
📜 เลขที่เกียรติบัตร: ${certNumber}
🏫 ${schoolName || 'ระบบมาตรฐานปฐมวัยแห่งชาติ'}

#เด็กปฐมวัย #เกียรติบัตรความสำเร็จ #EFปฐมวัย #การเรียนรู้ปฐมวัย`;

  const [customCaption, setCustomCaption] = useState<string>(defaultCaption);

  const webShareAvailable = isWebShareSupported();
  const webShareFileAvailable = isWebShareFileSupported();

  // Reset & generate certificate image preview when modal opens
  useEffect(() => {
    if (!isOpen) {
      setShareStatusMessage('');
      setCopiedCaptionToast(false);
      setCopiedImageToast(false);
      return;
    }

    setCustomCaption(defaultCaption);

    if (certificateRef.current) {
      setIsGeneratingPreview(true);
      getCertificateDataUrl(certificateRef.current, 1.5)
        .then((url) => {
          setPreviewImageUrl(url);
          setIsGeneratingPreview(false);
        })
        .catch((err) => {
          console.warn('Could not generate preview data url:', err);
          setIsGeneratingPreview(false);
        });
    }
  }, [isOpen, currentMilestone.id, profile.name]);

  if (!isOpen) return null;

  const cleanName = profile.name.replace(/\s+/g, '_');
  const filename = `เกียรติบัตร_${cleanName}_${currentMilestone.id}.png`;
  const shareTitle = `เกียรติบัตรความสำเร็จ: ${profile.name} - ${currentMilestone.title} 🏆`;

  // 1. Primary Action: Web Share API with Certificate Image File
  const handleWebShare = async () => {
    if (!certificateRef.current || isSharing) return;

    setIsSharing(true);
    setShareStatusType('info');
    setShareStatusMessage('กำลังเตรียมเกียรติบัตรและเปิดระบบแชร์ของอุปกรณ์...');

    try {
      const result = await shareCertificateViaWebShare(certificateRef.current, {
        title: shareTitle,
        text: customCaption,
        filename,
        pixelRatio: 2,
      });

      if (result.success) {
        setShareStatusType('success');
        setShareStatusMessage(
          result.sharedWithFile
            ? 'แชร์เกียรติบัตรพร้อมรูปภาพสำเร็จเรียบร้อย! 🎉'
            : 'แชร์ข้อความสรุปความสำเร็จเรียบร้อย! 🌟'
        );
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#F59E0B', '#6366F1', '#EC4899', '#06C755'],
          });
        } catch {
          // ignore
        }
      } else if (result.cancelled) {
        setShareStatusMessage('');
      } else {
        setShareStatusType('error');
        setShareStatusMessage(result.error || 'ไม่สามารถเปิดระบบแชร์ได้ กรุณาใช้ปุ่มโซเชียลด้านล่าง');
      }
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        setShareStatusType('error');
        setShareStatusMessage('เกิดข้อผิดพลาดในการแชร์ กรุณาลองแชร์ผ่านปุ่ม LINE หรือ Facebook ด้านล่าง');
      } else {
        setShareStatusMessage('');
      }
    } finally {
      setIsSharing(false);
    }
  };

  // 2. Direct LINE Share
  const handleShareLine = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const lineText = `${customCaption}\n\nดูเกียรติบัตรและร่วมเรียนรู้ได้ที่: ${currentUrl}`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(lineText)}`;
    window.open(lineUrl, '_blank', 'noopener,noreferrer');
  };

  // 3. Direct Facebook Share
  const handleShareFacebook = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(customCaption)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  // 4. Direct X (Twitter) Share
  const handleShareTwitter = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(customCaption)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  // 5. Direct WhatsApp Share
  const handleShareWhatsApp = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const waText = `${customCaption}\n\n${currentUrl}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // 6. Direct Telegram Share
  const handleShareTelegram = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(customCaption)}`;
    window.open(tgUrl, '_blank', 'noopener,noreferrer');
  };

  // 7. Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!certificateRef.current) return;
    try {
      setShareStatusType('info');
      setShareStatusMessage('กำลังคัดลอกรูปภาพเกียรติบัตร...');
      await copyCertificateImageToClipboard(certificateRef.current, 2);
      setCopiedImageToast(true);
      setShareStatusType('success');
      setShareStatusMessage('คัดลอกรูปภาพเกียรติบัตรสำเร็จ! สามารถกดวาง (Ctrl+V) ใน LINE หรือ Facebook ได้ทันที 🖼️');
      setTimeout(() => setCopiedImageToast(false), 3000);
    } catch (err: any) {
      console.warn('Copy image error:', err);
      // Fallback: download PNG image instead
      await exportCertificateToPng(certificateRef.current, filename);
      setShareStatusType('info');
      setShareStatusMessage('เบราว์เซอร์นี้ไม่รองรับการวางรูปภาพโดยตรง ได้บันทึกไฟล์ภาพ PNG ลงเครื่องแล้ว 📥');
    }
  };

  // 8. Copy Text Caption
  const handleCopyCaption = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(customCaption);
      }
      setCopiedCaptionToast(true);
      setShareStatusType('success');
      setShareStatusMessage('คัดลอกข้อความสรุปความสำเร็จลงคลิปบอร์ดแล้ว! 📋');
      setTimeout(() => setCopiedCaptionToast(false), 3000);
    } catch {
      setShareStatusType('error');
      setShareStatusMessage('ไม่สามารถคัดลอกข้อความได้');
    }
  };

  // 9. Save High-Res PNG Image
  const handleSavePng = async () => {
    if (!certificateRef.current) return;
    try {
      setShareStatusType('info');
      setShareStatusMessage('กำลังบันทึกภาพเกียรติบัตรความละเอียดสูง...');
      await exportCertificateToPng(certificateRef.current, filename);
      setShareStatusType('success');
      setShareStatusMessage('บันทึกรูปภาพเกียรติบัตรสำเร็จแล้ว! 🖼️');
      setTimeout(() => setShareStatusMessage(''), 2500);
    } catch (err) {
      console.error(err);
      setShareStatusType('error');
      setShareStatusMessage('เกิดข้อผิดพลาดในการบันทึกภาพ');
    }
  };

  return (
    <div
      id="certificate-social-share-backdrop"
      className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[60] flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-slate-900 border border-emerald-500/40 text-slate-100 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-5 py-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-xl shadow-xs">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-white font-display">
                  แชร์สู่โซเชียลมีเดีย (Share to Social)
                </h3>
                <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-200" />
                  Web Share API
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium">
                แบ่งปันความภาคภูมิใจและเกียรติบัตรของน้อง {profile.name} พร้อมภาพ HD
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-close-social-share-modal"
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            title="ปิดหน้าต่างแชร์"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Toast Banner if any */}
        {shareStatusMessage && (
          <div
            className={`px-4 py-2 text-xs font-bold flex items-center justify-between gap-2 border-b shrink-0 ${
              shareStatusType === 'success'
                ? 'bg-emerald-950/80 text-emerald-200 border-emerald-800'
                : shareStatusType === 'error'
                ? 'bg-rose-950/80 text-rose-200 border-rose-800'
                : 'bg-cyan-950/80 text-cyan-200 border-cyan-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {shareStatusType === 'success' ? (
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : shareStatusType === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
              )}
              <span>{shareStatusMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setShareStatusMessage('')}
              className="text-xs opacity-75 hover:opacity-100 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Main 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column: Certificate Preview (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950/60 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-3">
              <div className="w-full flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold flex items-center gap-1.5 text-amber-400">
                  <ImageIcon className="w-3.5 h-3.5" />
                  ภาพเกียรติบัตรที่จะแชร์
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
                  A4 Landscape HD
                </span>
              </div>

              {/* Preview Canvas/Image */}
              <div className="w-full aspect-[297/210] rounded-xl overflow-hidden bg-slate-900 border border-amber-500/30 shadow-md flex items-center justify-center relative group">
                {isGeneratingPreview ? (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
                    <span className="text-xs">กำลังสร้างตัวอย่างภาพ...</span>
                  </div>
                ) : previewImageUrl ? (
                  <>
                    <img
                      src={previewImageUrl}
                      alt="Certificate Preview"
                      className="w-full h-full object-cover transition-transform group-hover:scale-102 duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={handleSavePng}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1 shadow-md cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>บันทึก PNG</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4 text-xs text-slate-400">
                    พร้อมส่งภาพเกียรติบัตรความละเอียดสูง
                  </div>
                )}
              </div>

              {/* Certificate Quick Info */}
              <div className="w-full bg-slate-900/90 rounded-xl p-2.5 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-200">
                  <span className="truncate">{currentMilestone.title}</span>
                  <span className="text-amber-400 shrink-0">{currentMilestone.badgeLabel}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>ผู้รับ: {profile.name}</span>
                  <span>รหัส: {certNumber}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Sharing Options & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* 1. Primary Feature: Native Web Share API Button */}
              <div className="bg-gradient-to-br from-emerald-950/70 via-teal-950/40 to-slate-900 border-2 border-emerald-500/50 rounded-2xl p-4 shadow-lg space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚀</span>
                    <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                      ระบบแชร์หลักของอุปกรณ์ (Native Web Share)
                    </span>
                  </div>
                  {webShareAvailable ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/40 border border-emerald-700/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      อุปกรณ์รองรับ Web Share
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                      โหมดเบราว์เซอร์เดสก์ท็อป
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  id="btn-invoke-web-share-api"
                  onClick={handleWebShare}
                  disabled={isSharing}
                  className="w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black p-3.5 sm:p-4 rounded-2xl shadow-lg flex items-center justify-between transition-all active:scale-98 disabled:opacity-50 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950/15 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      <Smartphone className="w-5 h-5 text-slate-950" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm sm:text-base font-black flex items-center gap-2">
                        <span>แชร์ผ่าน Web Share API ทันที</span>
                        <span className="text-[10px] bg-slate-950 text-emerald-300 px-2 py-0.5 rounded-md font-bold">
                          พร้อมรูปภาพ 🖼️
                        </span>
                      </div>
                      <div className="text-xs text-slate-900/90 font-medium">
                        ส่งเข้า LINE, Facebook, IG Stories, AirDrop, หรือบันทึกลงอัลบั้ม
                      </div>
                    </div>
                  </div>
                  <Share2 className="w-5 h-5 text-slate-950 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                  💡 <strong>เคล็ดลับ:</strong> ระบบจะแนบไฟล์รูปภาพเกียรติบัตรความละเอียดสูงคู่กับข้อความสรุปผลงาน
                  ช่วยให้ผู้ปกครองแชร์เข้าแอปต่าง ๆ ในเครื่องได้ในคลิกเดียว
                </p>
              </div>

              {/* 2. Direct 1-Click Social Media Platforms */}
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  หรือแชร์ตรงไปยังโซเชียลมีเดียชั้นนำ (1-Click Social Share):
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* LINE Button */}
                  <button
                    type="button"
                    id="btn-social-share-line"
                    onClick={handleShareLine}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-black transition-all shadow-sm active:scale-95 cursor-pointer"
                    title="แชร์ข้อความและลิงก์ไปยัง LINE หรือกลุ่มครอบครัว"
                  >
                    <span className="text-sm font-bold">💬</span>
                    <span>LINE</span>
                  </button>

                  {/* Facebook Button */}
                  <button
                    type="button"
                    id="btn-social-share-facebook"
                    onClick={handleShareFacebook}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-black transition-all shadow-sm active:scale-95 cursor-pointer"
                    title="แชร์ไปยัง Facebook โพสต์หรือสตอรี่"
                  >
                    <span className="text-sm font-bold">f</span>
                    <span>Facebook</span>
                  </button>

                  {/* X (Twitter) Button */}
                  <button
                    type="button"
                    id="btn-social-share-twitter"
                    onClick={handleShareTwitter}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-black hover:bg-slate-800 border border-slate-700 text-white text-xs font-black transition-all shadow-sm active:scale-95 cursor-pointer"
                    title="แชร์ไปยัง X (Twitter)"
                  >
                    <span className="text-sm font-bold">𝕏</span>
                    <span>X (Twitter)</span>
                  </button>

                  {/* WhatsApp Button */}
                  <button
                    type="button"
                    id="btn-social-share-whatsapp"
                    onClick={handleShareWhatsApp}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black transition-all shadow-sm active:scale-95 cursor-pointer"
                    title="ส่งเข้าแชท WhatsApp"
                  >
                    <span className="text-sm font-bold">📱</span>
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* 3. Clipboard & File Utilities */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {/* Copy Image Button */}
                <button
                  type="button"
                  id="btn-copy-certificate-image"
                  onClick={handleCopyImage}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                    copiedImageToast
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                  title="คัดลอกรูปภาพเกียรติบัตรลงคลิปบอร์ด เพื่อนำไปกด Paste (Ctrl+V) ได้ทันที"
                >
                  {copiedImageToast ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>{copiedImageToast ? 'คัดลอกรูปแล้ว!' : 'คัดลอกรูปภาพ'}</span>
                </button>

                {/* Copy Text Button */}
                <button
                  type="button"
                  id="btn-copy-certificate-caption"
                  onClick={handleCopyCaption}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                    copiedCaptionToast
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                  title="คัดลอกข้อความสรุปผลงานความสำเร็จ"
                >
                  {copiedCaptionToast ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span>{copiedCaptionToast ? 'คัดลอกข้อความแล้ว!' : 'คัดลอกข้อความ'}</span>
                </button>

                {/* Save PNG Button */}
                <button
                  type="button"
                  id="btn-save-certificate-png"
                  onClick={handleSavePng}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all cursor-pointer"
                  title="บันทึกรูปภาพ PNG ลงในเครื่อง"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>บันทึกภาพ PNG</span>
                </button>
              </div>

              {/* 4. Caption Preview & Edit Box */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold flex items-center gap-1">
                    <span>✏️</span> ปรับแต่งข้อความสำหรับแชร์ (Editable Caption):
                  </span>
                  <button
                    type="button"
                    onClick={() => setCustomCaption(defaultCaption)}
                    className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                  >
                    รีเซ็ตข้อความเริ่มต้น
                  </button>
                </div>
                <textarea
                  value={customCaption}
                  onChange={(e) => setCustomCaption(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-400 font-sans leading-relaxed resize-none"
                  placeholder="เขียนข้อความชื่นชมความสำเร็จของน้อง..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950/80 border-t border-slate-800 px-5 py-3 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>มาตรฐานปฐมวัยแห่งชาติ • ระบบเกียรติบัตรดิจิทัล</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
