import React, { useState } from 'react';
import {
  X,
  Clock,
  Palette,
  Volume2,
  VolumeX,
  Globe,
  Sliders,
  ShieldAlert,
  Check,
  Camera,
  Layers,
  Sparkles,
  Music,
  CheckCircle2,
  Smartphone,
  Hand,
  MousePointer,
  MessageSquare,
  Loader2,
  Inbox,
  RefreshCw,
  Cloud,
  Database,
  Table,
  Lightbulb,
  Minus,
  Plus,
  Star,
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  Trash2,
  BookOpen,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { ControlMode, GameSettings, Language, Subject, ThemeMode, VoicePersona, CurriculumMode, ChildProfile } from '../types';
import { soundEffects, speakText, getAvailableVoices } from '../services/audioService';
import { storageService, DEFAULT_PARENT_PIN } from '../services/storageService';
import {
  fetchCloudFeedbacks,
  GoogleSheetsFeedbackPayload,
} from '../services/googleSheetsService';
import {
  fetchCloudGameSessions,
  fetchCloudAssessmentReports,
  initializeAllFirestoreCollections,
  GameSessionCloudData,
  AssessmentReportCloudData,
} from '../services/cloudSyncService';
import { SKILLS_LIST, TRIO_PILLARS, CORE_5_SKILL_IDS } from '../data/skills';
import { getDeviceName } from '../services/deviceService';
import { DeviceCompatibilityModal } from './DeviceCompatibilityModal';
import { ParentPinModal } from './ParentPinModal';
import { ChangeParentPinModal } from './ChangeParentPinModal';

export interface ThemePaletteOption {
  id: ThemeMode;
  nameTh: string;
  nameEn: string;
  icon: string;
  tagline: string;
  description: string;
  swatches: Array<{
    name: string;
    hex: string;
    bgClass: string;
    borderClass: string;
  }>;
  preview: {
    containerClass: string;
    cardClass: string;
    cardBorder: string;
    textClass: string;
    accentBtnClass: string;
    optionClass: string;
    optionActiveClass: string;
  };
}

export const THEME_PALETTES: ThemePaletteOption[] = [
  {
    id: 'sunny',
    nameTh: 'แดดสดใส',
    nameEn: 'Sunny',
    icon: '☀️',
    tagline: 'อบอุ่น สดใส สนุกสนาน',
    description: 'โทนสีเหลืองอำพันและส้ม พลังงานบวก เหมาะสำหรับเรียนรู้ในเวลากลางวัน',
    swatches: [
      { name: 'พื้นหลัง', hex: '#FEF3C7', bgClass: 'bg-amber-100', borderClass: 'border-amber-300' },
      { name: 'การ์ด', hex: '#FFFFFF', bgClass: 'bg-white', borderClass: 'border-slate-200' },
      { name: 'สีหลัก', hex: '#F59E0B', bgClass: 'bg-amber-500', borderClass: 'border-amber-600' },
      { name: 'สีเน้น', hex: '#EA580C', bgClass: 'bg-orange-600', borderClass: 'border-orange-700' },
      { name: 'ตัวอักษร', hex: '#1E293B', bgClass: 'bg-slate-800', borderClass: 'border-slate-900' },
    ],
    preview: {
      containerClass: 'bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-50',
      cardClass: 'bg-white/95 shadow-2xs',
      cardBorder: 'border-amber-200/90',
      textClass: 'text-slate-900',
      accentBtnClass: 'bg-amber-500 text-white',
      optionClass: 'bg-amber-50/80 text-amber-950 border-amber-200',
      optionActiveClass: 'bg-amber-500 text-white border-amber-600 shadow-2xs',
    },
  },
  {
    id: 'ocean',
    nameTh: 'มหาสมุทร',
    nameEn: 'Ocean',
    icon: '🌊',
    tagline: 'สงบนิ่ง ผ่อนคลาย เสริมสมาธิ',
    description: 'โทนสีฟ้าครามและน้ำเงินทะเลลึก ช่วยให้จิตใจนิ่งและจดจ่อกับการเรียนรู้ได้นานขึ้น',
    swatches: [
      { name: 'พื้นหลัง', hex: '#E0F2FE', bgClass: 'bg-sky-100', borderClass: 'border-sky-300' },
      { name: 'การ์ด', hex: '#FFFFFF', bgClass: 'bg-white', borderClass: 'border-slate-200' },
      { name: 'สีหลัก', hex: '#0284C7', bgClass: 'bg-sky-600', borderClass: 'border-sky-700' },
      { name: 'สีเน้น', hex: '#0369A1', bgClass: 'bg-blue-700', borderClass: 'border-blue-800' },
      { name: 'ตัวอักษร', hex: '#0F172A', bgClass: 'bg-slate-900', borderClass: 'border-slate-950' },
    ],
    preview: {
      containerClass: 'bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-50',
      cardClass: 'bg-white/95 shadow-2xs',
      cardBorder: 'border-sky-200/90',
      textClass: 'text-slate-900',
      accentBtnClass: 'bg-sky-600 text-white',
      optionClass: 'bg-sky-50/80 text-sky-950 border-sky-200',
      optionActiveClass: 'bg-sky-600 text-white border-sky-700 shadow-2xs',
    },
  },
  {
    id: 'forest',
    nameTh: 'ป่าเวทมนตร์',
    nameEn: 'Forest',
    icon: '🌲',
    tagline: 'สบายตา อิงธรรมชาติ',
    description: 'โทนสีเขียวมรกตและมินต์ ช่วยผ่อนคลายกล้ามเนื้อสายตาจากหน้าจออุปกรณ์',
    swatches: [
      { name: 'พื้นหลัง', hex: '#D1FAE5', bgClass: 'bg-emerald-100', borderClass: 'border-emerald-300' },
      { name: 'การ์ด', hex: '#FFFFFF', bgClass: 'bg-white', borderClass: 'border-slate-200' },
      { name: 'สีหลัก', hex: '#10B981', bgClass: 'bg-emerald-500', borderClass: 'border-emerald-600' },
      { name: 'สีเน้น', hex: '#059669', bgClass: 'bg-emerald-700', borderClass: 'border-emerald-800' },
      { name: 'ตัวอักษร', hex: '#064E3B', bgClass: 'bg-emerald-950', borderClass: 'border-black' },
    ],
    preview: {
      containerClass: 'bg-gradient-to-br from-emerald-100 via-teal-50 to-green-50',
      cardClass: 'bg-white/95 shadow-2xs',
      cardBorder: 'border-emerald-200/90',
      textClass: 'text-emerald-950',
      accentBtnClass: 'bg-emerald-600 text-white',
      optionClass: 'bg-emerald-50/80 text-emerald-950 border-emerald-200',
      optionActiveClass: 'bg-emerald-600 text-white border-emerald-700 shadow-2xs',
    },
  },
  {
    id: 'galaxy',
    nameTh: 'อวกาศ',
    nameEn: 'Galaxy',
    icon: '🚀',
    tagline: 'จินตนาการ ลึกลับ น่าค้นหา',
    description: 'โทนสีม่วงเนบิวลาและครามอวกาศ จุดประกายความคิดสร้างสรรค์และความอยากรู้อยากเห็น',
    swatches: [
      { name: 'พื้นหลัง', hex: '#E0E7FF', bgClass: 'bg-indigo-100', borderClass: 'border-indigo-300' },
      { name: 'การ์ด', hex: '#FFFFFF', bgClass: 'bg-white', borderClass: 'border-slate-200' },
      { name: 'สีหลัก', hex: '#6366F1', bgClass: 'bg-indigo-500', borderClass: 'border-indigo-600' },
      { name: 'สีเน้น', hex: '#8B5CF6', bgClass: 'bg-purple-600', borderClass: 'border-purple-700' },
      { name: 'ตัวอักษร', hex: '#1E1B4B', bgClass: 'bg-indigo-950', borderClass: 'border-black' },
    ],
    preview: {
      containerClass: 'bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-50',
      cardClass: 'bg-white/95 shadow-2xs',
      cardBorder: 'border-indigo-200/90',
      textClass: 'text-indigo-950',
      accentBtnClass: 'bg-indigo-600 text-white',
      optionClass: 'bg-indigo-50/80 text-indigo-950 border-indigo-200',
      optionActiveClass: 'bg-indigo-600 text-white border-indigo-700 shadow-2xs',
    },
  },
  {
    id: 'dark',
    nameTh: 'ถนอมสายตา',
    nameEn: 'Dark',
    icon: '🌙',
    tagline: 'ลดแสงจ้า โหมดกลางคืน',
    description: 'โทนสีมืดมิดไนท์สเลท ลดแสงสีฟ้าและแสงสะท้อน เหมาะสำหรับทบทวนบทเรียนช่วงค่ำ',
    swatches: [
      { name: 'พื้นหลัง', hex: '#0F172A', bgClass: 'bg-slate-900', borderClass: 'border-slate-700' },
      { name: 'การ์ด', hex: '#1E293B', bgClass: 'bg-slate-800', borderClass: 'border-slate-700' },
      { name: 'สีหลัก', hex: '#38BDF8', bgClass: 'bg-sky-400', borderClass: 'border-sky-500' },
      { name: 'สีเน้น', hex: '#F59E0B', bgClass: 'bg-amber-400', borderClass: 'border-amber-500' },
      { name: 'ตัวอักษร', hex: '#F8FAFC', bgClass: 'bg-slate-50', borderClass: 'border-slate-200' },
    ],
    preview: {
      containerClass: 'bg-slate-900',
      cardClass: 'bg-slate-800/95 shadow-2xs',
      cardBorder: 'border-slate-700',
      textClass: 'text-slate-100',
      accentBtnClass: 'bg-sky-400 text-slate-900',
      optionClass: 'bg-slate-800 text-slate-200 border-slate-700',
      optionActiveClass: 'bg-sky-400 text-slate-900 border-sky-400 font-black shadow-2xs',
    },
  },
];

interface ParentSettingsModalProps {
  settings: GameSettings;
  isOpen: boolean;
  onClose: () => void;
  onSaveSettings: (settings: GameSettings) => void;
  onOpenFeedback?: () => void;
  onOpenQuestionManager?: () => void;
  onOpenHandCalibration?: () => void;
  curriculumMode?: CurriculumMode;
  onSelectCurriculumMode?: (mode: CurriculumMode, rememberChoice: boolean) => void;
  profiles?: ChildProfile[];
  onDeleteProfile?: (profileId: string) => void;
  activeProfile?: ChildProfile;
}

export const ParentSettingsModal: React.FC<ParentSettingsModalProps> = ({
  settings,
  isOpen,
  onClose,
  onSaveSettings,
  onOpenFeedback,
  onOpenQuestionManager,
  onOpenHandCalibration,
  curriculumMode = 'early_childhood',
  onSelectCurriculumMode,
  profiles = [],
  onDeleteProfile,
  activeProfile,
}) => {
  // Simple Parental Gate: simple math problem to verify adult
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [gateNum1] = useState(8);
  const [gateNum2] = useState(6);
  const [gateAnswer, setGateAnswer] = useState('');
  const [gateError, setGateError] = useState(false);

  // Local draft state
  const [current, setCurrent] = useState<GameSettings>({ ...settings });
  const [activeTab, setActiveTab] = useState<'general' | 'parent_zone' | 'cloud'>('general');
  const [currentCurriculum, setCurrentCurriculum] = useState<CurriculumMode>(curriculumMode);
  const [previewSelectedOption, setPreviewSelectedOption] = useState<'a' | 'b'>('a');

  // Sync currentCurriculum when prop updates
  React.useEffect(() => {
    setCurrentCurriculum(curriculumMode);
  }, [curriculumMode]);

  // 4-Digit PIN Protection state for sensitive actions
  const [pinModalConfig, setPinModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    action: () => void;
  } | null>(null);
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [showGatePinModal, setShowGatePinModal] = useState(false);
  const [parentZoneFeedback, setParentZoneFeedback] = useState<string | null>(null);

  // Sensitive Operation 1: Curriculum Modification (requires 4-digit PIN)
  const handleRequestCurriculumChange = (newMode: CurriculumMode, titleTh: string) => {
    if (newMode === currentCurriculum) return;
    setPinModalConfig({
      isOpen: true,
      title: 'ยืนยันการเปลี่ยนหลักสูตรการศึกษา (PIN 4 หลัก)',
      description: `คุณต้องการเปลี่ยนหลักสูตรการศึกษาเป็น "${titleTh}" ใช่หรือไม่? ระบบจะปรับโครงสร้างข้อสอบและสมรรถนะตามหลักสูตร กรุณากรอกรหัส PIN 4 หลักเพื่อยืนยัน`,
      action: () => {
        if (onSelectCurriculumMode) {
          onSelectCurriculumMode(newMode, true);
        }
        storageService.setCurriculumMode(newMode);
        setCurrentCurriculum(newMode);
        soundEffects.playVictory(current.soundVolume);
        setParentZoneFeedback(`เปลี่ยนหลักสูตรเป็น "${titleTh}" เรียบร้อยแล้ว! 🎓✨`);
        setTimeout(() => setParentZoneFeedback(null), 3500);
      },
    });
  };

  // Sensitive Operation 2: Profile Deletion (requires 4-digit PIN)
  const handleRequestDeleteProfile = (targetProfile: ChildProfile) => {
    setPinModalConfig({
      isOpen: true,
      title: 'ยืนยันการลบโปรไฟล์ผู้เรียน (PIN 4 หลัก)',
      description: `⚠️ คำเตือน: คุณต้องการลบโปรไฟล์ "${targetProfile.name}" (${targetProfile.grade}) ออกจากระบบใช่หรือไม่? ข้อมูลคะแนนและประวัติจะถูกลบอย่างถาวร กรุณากรอกรหัส PIN 4 หลักเพื่อยืนยัน`,
      action: () => {
        if (onDeleteProfile) {
          onDeleteProfile(targetProfile.id);
        }
        soundEffects.playCorrect(current.soundVolume);
        setParentZoneFeedback(`ลบโปรไฟล์ "${targetProfile.name}" เรียบร้อยแล้ว 🗑️`);
        setTimeout(() => setParentZoneFeedback(null), 3500);
      },
    });
  };

  const [showInbox, setShowInbox] = useState(false);
  const [showDeviceDiagnostics, setShowDeviceDiagnostics] = useState(false);
  const [cloudTab, setCloudTab] = useState<'feedbacks' | 'sessions' | 'reports'>('feedbacks');
  const [cloudFeedbacks, setCloudFeedbacks] = useState<GoogleSheetsFeedbackPayload[]>([]);
  const [cloudSessions, setCloudSessions] = useState<GameSessionCloudData[]>([]);
  const [cloudReports, setCloudReports] = useState<AssessmentReportCloudData[]>([]);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(false);
  const [bootstrapResult, setBootstrapResult] = useState<string | null>(null);

  // Handler to force bootstrap all 5 collections into Firestore
  const handleBootstrapCollections = async () => {
    setIsBootstrapping(true);
    setBootstrapResult(null);
    try {
      const res = await initializeAllFirestoreCollections();
      setBootstrapResult(res.message);
      handleLoadCloudFeedbacks();
    } catch {
      setBootstrapResult('เกิดข้อผิดพลาดในการเชื่อมต่อคลาวด์ โปรดลองใหม่อีกครั้ง');
    } finally {
      setIsBootstrapping(false);
    }
  };

  // Handler to load cloud feedbacks with safety timeout
  const handleLoadCloudFeedbacks = async () => {
    setIsLoadingFeedbacks(true);
    const safetyTimer = setTimeout(() => {
      setIsLoadingFeedbacks(false);
    }, 4500);

    try {
      if (cloudTab === 'feedbacks') {
        const items = await fetchCloudFeedbacks();
        setCloudFeedbacks(items);
      } else if (cloudTab === 'sessions') {
        const items = await fetchCloudGameSessions();
        setCloudSessions(items);
      } else if (cloudTab === 'reports') {
        const items = await fetchCloudAssessmentReports();
        setCloudReports(items);
      }
    } catch (err) {
      console.warn('Load cloud data error:', err);
    } finally {
      clearTimeout(safetyTimer);
      setIsLoadingFeedbacks(false);
    }
  };

  // Reload when cloudTab changes if inbox is shown
  React.useEffect(() => {
    if (showInbox) {
      handleLoadCloudFeedbacks();
    }
  }, [cloudTab, showInbox]);

  if (!isOpen) return null;

  const verifyGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(gateAnswer, 10) === gateNum1 + gateNum2) {
      setIsUnlocked(true);
      setGateError(false);
    } else {
      setGateError(true);
      setGateAnswer('');
    }
  };

  const handleSave = () => {
    onSaveSettings(current);
    onClose();
  };

  const toggleSubject = (subject: Subject) => {
    const exists = current.selectedSubjects.includes(subject);
    if (exists && current.selectedSubjects.length === 1) {
      return; // Must select at least one subject
    }
    const updated = exists
      ? current.selectedSubjects.filter((s) => s !== subject)
      : [...current.selectedSubjects, subject];
    setCurrent({ ...current, selectedSubjects: updated });
  };

  const testVoiceSample = (persona: VoicePersona, lang: Language) => {
    const sampleText: Record<VoicePersona, Record<Language, string>> = {
      child_boy: {
        th: 'สวัสดีครับเพื่อนๆ! มาเล่นเกมแสนสนุกและฝึกคิดเลขด้วยกันนะ',
        en: "Hello friends! Let's play fun games and learn together!",
        zh: '小朋友们好！我们一起快乐做游戏吧！',
      },
      child_girl: {
        th: 'สวัสดีค่ะเพื่อนๆ! มาร่วมสำรวจบทเรียนแสนน่ารักไปด้วยกันนะคะ',
        en: "Hi there! Let's explore wonderful lessons together!",
        zh: '大家好！我们一起来快乐学习吧！',
      },
      adult_male: {
        th: 'สวัสดีครับ วันนี้เราจะมาฝึกทักษะและเสริมสร้างจินตนาการไปพร้อมกัน',
        en: 'Hello everyone! Today we will sharpen our minds and have fun.',
        zh: '大家好！今天我们一起练习逻辑思维，快乐成长。',
      },
      adult_female: {
        th: 'สวัสดีจ้ะเด็กๆ วันนี้คุณครูมีโจทย์แสนสนุกมาให้ร่วมค้นหาคำตอบจ้า',
        en: 'Hello dear children! Teacher has wonderful questions for you today.',
        zh: '小朋友们好！老师今天给你们带来了很有趣的题目哦。',
      },
    };
    speakText(sampleText[persona][lang], lang, persona, current.soundVolume);
  };

  return (
    <div
      id="parent-settings-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border-4 border-amber-300 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <div>
              <h2 className="text-lg font-black font-display">โหมดตั้งค่าสำหรับผู้ปกครอง / คุณครู</h2>
              <p className="text-xs text-amber-100 font-medium">
                ปรับแต่งการตรวจจับมือ เวลา Dwell ธีม และเนื้อหาบทเรียน
              </p>
            </div>
          </div>
          <button
            id="btn-close-settings-modal"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Parental Gate Check (Anti-child tampering) */}
        {!isUnlocked ? (
          <div className="p-6 flex flex-col items-center justify-center text-center bg-amber-50/50 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl mb-3">
              🔒
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-1">
              ระบบป้องกันเด็กกดเล่น (Parental Gate)
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mb-4">
              กรุณาคำนวณผลบวกด้านล่างเพื่อยืนยันว่าท่านเป็นผู้ปกครองหรือคุณครู
            </p>

            <form onSubmit={verifyGate} className="flex flex-col items-center gap-3 w-full max-w-xs">
              <div className="bg-white px-5 py-3 rounded-2xl border-2 border-amber-300 shadow-sm text-2xl font-black text-slate-800">
                {gateNum1} + {gateNum2} = ?
              </div>
              <input
                type="number"
                autoFocus
                placeholder="พิมพ์คำตอบ..."
                value={gateAnswer}
                onChange={(e) => setGateAnswer(e.target.value)}
                className="w-full text-center text-lg font-black py-2.5 px-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-400 focus:outline-none bg-white"
              />
              {gateError && (
                <span className="text-xs text-rose-500 font-bold">
                  คำตอบยังไม่ถูกต้อง ลองใหม่อีกครั้งนะ
                </span>
              )}
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm shadow-md transition-transform active:scale-98 cursor-pointer"
              >
                เข้าสู่หน้าตั้งค่า
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-amber-200/60 w-full max-w-xs flex items-center justify-center">
              <button
                type="button"
                onClick={() => setShowGatePinModal(true)}
                className="text-xs font-black text-amber-800 hover:text-amber-950 flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 transition-colors cursor-pointer"
              >
                <Key className="w-3.5 h-3.5 text-amber-700" />
                <span>หรือปลดล็อกด้วย PIN 4 หลัก (Parent Zone)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Actual Settings Form */
          <div className="p-4 md:p-6 overflow-y-auto flex-1 bg-slate-50 space-y-4">
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-2xl text-xs font-black select-none sticky top-0 z-10 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(current.soundVolume);
                  setActiveTab('general');
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'general'
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>⚙️ ทั่วไป</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(current.soundVolume);
                  setActiveTab('parent_zone');
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'parent_zone'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                    : 'text-amber-900 hover:bg-amber-100/50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>โซนผู้ปกครอง (Parent Zone 🔒)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(current.soundVolume);
                  setActiveTab('cloud');
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'cloud'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>☁️ คลาวด์ & ชีต</span>
              </button>
            </div>

            {/* Parent Zone Feedback Alert Banner */}
            {parentZoneFeedback && (
              <div className="bg-emerald-100 border-2 border-emerald-300 text-emerald-950 px-4 py-2.5 rounded-2xl text-xs font-black flex items-center justify-between gap-2 shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{parentZoneFeedback}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setParentZoneFeedback(null)}
                  className="text-emerald-700 hover:text-emerald-900 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* TAB 1: General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* Parent Zone Quick Banner */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🛡️</span>
                    <div>
                      <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                        <span>โซนผู้ปกครอง (Parent Zone): ควบคุมการเปลี่ยนหลักสูตรและลบโปรไฟล์</span>
                        <span className="bg-amber-200 text-amber-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">PIN 4 หลัก</span>
                      </div>
                      <div className="text-[11px] text-amber-800">
                        หลักสูตรปัจจุบัน: {currentCurriculum === 'cbe_primary' ? 'ฐานสมรรถนะ (ป.1-ป.3)' : currentCurriculum === 'thai_phonics' ? 'แจกลูกสะกดคำ สพฐ.' : 'ปฐมวัย (8 ทักษะ)'}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(current.soundVolume);
                      setActiveTab('parent_zone');
                    }}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black shadow-2xs cursor-pointer transition-all shrink-0"
                  >
                    เปิดโซนผู้ปกครอง 🔒
                  </button>
                </div>

                {/* Setting: Control Mode (Automatic Mobile Phone Switch) */}
                <div className="bg-white p-4 rounded-2xl border-2 border-amber-300/80 shadow-xs bg-gradient-to-br from-white to-amber-50/40">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-amber-500" />
                  โหมดการควบคุมเกมและการเล่น (Control Mode)
                </label>
                <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                  {current.controlMode === 'auto'
                    ? '⚡ สลับอัตโนมัติ'
                    : current.controlMode === 'touch'
                    ? '📱 สัมผัสหน้าจอ'
                    : '🖐️ กล้องจับมือ'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                เลือกระบบควบคุม: แนะนำเลือก <strong>&quot;อัตโนมัติ&quot;</strong> เพื่อให้ระบบเปลี่ยนเป็นโหมดสัมผัสหน้าจอทันทีเมื่อเล่นด้วยโทรศัพท์มือถือ
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    id: 'auto',
                    title: '⚡ อัตโนมัติ (แนะนำ)',
                    subtitle: 'มือถือ = แตะสัมผัส / คอมฯ = กล้อง',
                    desc: 'เปลี่ยนเป็นโหมดสัมผัสแตะคำตอบทันทีเมื่อเปิดด้วยโทรศัพท์มือถือ',
                    icon: '📱',
                    badge: 'ยอดนิยม',
                  },
                  {
                    id: 'touch',
                    title: '👆 สัมผัสหน้าจอ (Touch)',
                    subtitle: 'แตะตอบทันที ไม่ใช้กล้อง',
                    desc: 'แตะการ์ดคำตอบได้ทันที ประหยัดแบตเตอรี่ เหมาะกับโทรศัพท์และแท็บเล็ต',
                    icon: '👆',
                  },
                  {
                    id: 'hand',
                    title: '🖐️ จับภาพมือ (Camera)',
                    subtitle: 'เปิดกล้องชี้ค้าง 1.2 วินาที',
                    desc: 'ชูนิ้วชี้หน้ากล้องเว็บแคม เหมาะกับคอมพิวเตอร์และโน้ตบุ๊ก',
                    icon: '🖐️',
                  },
                ].map((item) => {
                  const isSelected = (current.controlMode || 'auto') === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCurrent({ ...current, controlMode: item.id as ControlMode })}
                      className={`p-3 rounded-xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between relative ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/90 ring-2 ring-amber-300 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {item.badge && (
                        <span className="absolute -top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                          {item.badge}
                        </span>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5 font-black text-xs text-slate-800">
                          <span>{item.icon}</span>
                          <span>{item.title}</span>
                        </div>
                        <div className="text-[11px] font-bold text-amber-700 mt-0.5">
                          {item.subtitle}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-end">
                        {isSelected ? (
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> ใช้งานอยู่
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium">คลิกเพื่อเลือก</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Device Compatibility & Diagnostics Quick Trigger */}
              <div className="mt-3 pt-2.5 border-t border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>อุปกรณ์ปัจจุบัน: <strong>{getDeviceName()}</strong></span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {onOpenHandCalibration && (
                    <button
                      type="button"
                      id="btn-parent-settings-calibrate-hand"
                      onClick={() => {
                        onOpenHandCalibration();
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-98"
                      title="ปรับเทียบกล้องจับมือสำหรับเด็กเล็ก"
                    >
                      <span>🎯 ปรับเทียบกล้องจับมือ (Calibrate Hand)</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowDeviceDiagnostics(true)}
                    className="px-3 py-1.5 bg-white hover:bg-amber-100/70 border border-amber-300 text-amber-900 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-98"
                  >
                    <span>🔍 ตรวจสอบการรองรับอุปกรณ์ (Diagnostics)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Setting 1: Dwell Time Duration */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  เวลาค้างนิ้วชี้ (Dwell Time)
                </label>
                <span className="text-sm font-black text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  {current.dwellTimeSeconds} วินาที
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2">
                เวลาที่ต้องชี้ค้างไว้เหนือนิ้วมือเพื่อเลือกคำตอบ (เริ่มต้น 1.2 วินาที)
              </p>
              <input
                type="range"
                min="0.6"
                max="2.5"
                step="0.1"
                value={current.dwellTimeSeconds}
                onChange={(e) =>
                  setCurrent({ ...current, dwellTimeSeconds: parseFloat(e.target.value) })
                }
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                <span>0.6 วิ (ไวพิเศษ)</span>
                <span className="text-amber-600 font-black">1.2 วิ (แนะนำ)</span>
                <span>2.5 วิ (สำหรับเด็กเล็ก)</span>
              </div>
            </div>

            {/* Setting 2: 8 Early Childhood Skills & 3 Pillars */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              {/* Trio Pillars Special Section */}
              <div className="bg-gradient-to-r from-rose-50 via-sky-50 to-amber-50 border-2 border-indigo-200 rounded-2xl p-3.5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌟</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-800">
                        ระบบ 3 เสาหลักสู่ ป.1: ภาษาไทย • ภาษาอังกฤษ • คณิตศาสตร์
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        พัฒนาทักษะวิชาการหลักอย่างเข้มข้นและสมดุล เพื่อความพร้อมรอบด้าน
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrent({ ...current, selectedSubjects: ['thai', 'english', 'math'] });
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-2xs cursor-pointer transition-all"
                  >
                    เลือกเฉพาะ 3 เสาหลักนี้
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {TRIO_PILLARS.map((pillar) => {
                    const isSelected =
                      current.selectedSubjects.includes(pillar.subject) ||
                      (pillar.subject === 'thai' && current.selectedSubjects.includes('literacy'));
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => toggleSubject(pillar.subject)}
                        className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-indigo-500 shadow-2xs ring-2 ring-indigo-200'
                            : 'bg-white/60 border-slate-200 hover:border-slate-300 opacity-75'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xl">{pillar.icon}</span>
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {isSelected ? '✓ เลือกแล้ว' : '+ คลิกเลือก'}
                          </span>
                        </div>
                        <p className="text-xs font-black text-slate-900">
                          {pillar.title[current.language] || pillar.title.th}
                        </p>
                        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                          {pillar.subtitle[current.language] || pillar.subtitle.th}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 8 Early Childhood Skills */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="text-sm font-black text-slate-800 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-500" />
                      ทักษะพัฒนาการปฐมวัย (ครบทั้ง 8 ทักษะ)
                    </label>
                    <span className="text-[11px] text-slate-500">แสดง 2 แถว แถวละ 4 ทักษะ</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrent({ ...current, selectedSubjects: [...CORE_5_SKILL_IDS] });
                      }}
                      className="text-xs font-black text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg cursor-pointer flex items-center gap-1"
                    >
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      <span>🌟 พัฒนาการ 5 ด้านหลัก</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const allIds: Subject[] = SKILLS_LIST.map((s) => s.id);
                        const isAllSelected = allIds.every((id) => current.selectedSubjects.includes(id));
                        if (isAllSelected) {
                          setCurrent({ ...current, selectedSubjects: ['literacy'] });
                        } else {
                          setCurrent({ ...current, selectedSubjects: allIds });
                        }
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg cursor-pointer"
                    >
                      {SKILLS_LIST.every((s) => current.selectedSubjects.includes(s.id))
                        ? 'รีเซ็ต'
                        : '✨ ครบทั้ง 8 ทักษะ'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {SKILLS_LIST.map((skill) => {
                    const isChecked =
                      current.selectedSubjects.includes(skill.id) ||
                      (skill.id === 'literacy' && (current.selectedSubjects.includes('thai') || current.selectedSubjects.includes('literacy'))) ||
                      (skill.id === 'inquiry' && current.selectedSubjects.includes('science'));

                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => toggleSubject(skill.id)}
                        className={`p-2.5 rounded-xl border-2 text-left flex items-start gap-2.5 cursor-pointer transition-all ${
                          isChecked
                            ? 'border-indigo-500 bg-indigo-50/70 text-indigo-950 shadow-2xs'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 mt-0.5 ${
                            isChecked ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {isChecked ? <Check className="w-4 h-4" /> : skill.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-black text-xs">
                              {skill.code}. {skill.shortName[current.language] || skill.shortName.th}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                            {skill.skillsFocus[0]}, {skill.skillsFocus[1]}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Setting 3: Questions per skill and round */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <label className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-500" />
                  จำนวนข้อสอบของแต่ละทักษะ (กำหนดได้อิสระ)
                </label>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  รวม {current.selectedSubjects.length * (current.questionsPerSkill || 3)} ข้อ ({current.selectedSubjects.length} ทักษะ)
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                กำหนดจำนวนข้อสอบของแต่ละทักษะที่ต้องการสอบ สามารถพิมพ์ระบุตัวเลข หรือกดปุ่มลัดเพื่อปรับได้ทันที
              </p>

              {/* Stepper + Input + Presets */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Stepper controls */}
                <div className="flex items-center bg-slate-50 rounded-xl border border-slate-300 shadow-2xs p-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      const cur = current.questionsPerSkill || 3;
                      const next = Math.max(1, cur - 1);
                      setCurrent({
                        ...current,
                        questionsPerSkill: next,
                        questionsPerRound: current.selectedSubjects.length * next,
                      });
                    }}
                    disabled={(current.questionsPerSkill || 3) <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    title="ลดจำนวนข้อ"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={current.questionsPerSkill || 3}
                    onChange={(e) => {
                      const val = Math.max(1, Math.min(20, parseInt(e.target.value) || 1));
                      setCurrent({
                        ...current,
                        questionsPerSkill: val,
                        questionsPerRound: current.selectedSubjects.length * val,
                      });
                    }}
                    className="w-12 text-center font-black text-slate-900 text-sm bg-transparent border-0 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const cur = current.questionsPerSkill || 3;
                      const next = Math.min(20, cur + 1);
                      setCurrent({
                        ...current,
                        questionsPerSkill: next,
                        questionsPerRound: current.selectedSubjects.length * next,
                      });
                    }}
                    disabled={(current.questionsPerSkill || 3) >= 20}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    title="เพิ่มจำนวนข้อ"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Preset Pills */}
                {[1, 2, 3, 5, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() =>
                      setCurrent({
                        ...current,
                        questionsPerSkill: num,
                        questionsPerRound: current.selectedSubjects.length * num,
                      })
                    }
                    className={`py-1.5 px-3 rounded-xl border-2 font-black text-xs cursor-pointer transition-all ${
                      (current.questionsPerSkill || 3) === num
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-2xs scale-105'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {num} ข้อ / ทักษะ
                  </button>
                ))}
              </div>
            </div>

            {/* Setting: Adaptive Difficulty Algorithm */}
            <div className="bg-gradient-to-br from-indigo-50/70 to-purple-50/70 p-4 rounded-2xl border-2 border-indigo-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black text-indigo-950 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  อัลกอริทึมปรับระดับความยากอัตโนมัติ (Adaptive Difficulty)
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setCurrent({
                      ...current,
                      enableAdaptiveDifficulty: current.enableAdaptiveDifficulty === false ? true : false,
                    })
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    current.enableAdaptiveDifficulty !== false ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      current.enableAdaptiveDifficulty !== false ? 'left-5.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                ระบบวิเคราะห์ความสามารถขณะเล่นแบบเรียลไทม์:
                หากเด็ก <span className="font-bold text-emerald-700">ตอบถูกติดต่อกัน 3 ข้อ</span> ระบบจะเพิ่มระดับความยากของคำถามในข้อถัดไปโดยอัตโนมัติ (+1 ระดับ)
                และหาก <span className="font-bold text-rose-600">ตอบผิด</span> ระบบจะปรับลดระดับความยากลง (-1 ระดับ) เพื่อรักษาความสนุกและระดับความท้าทายให้เหมาะสม
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="bg-white/90 p-2 rounded-xl border border-indigo-100 text-center text-[11px]">
                  <div className="font-black text-emerald-700">🌱 ระดับง่าย (L1)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">พื้นฐาน & ความมั่นใจ</div>
                </div>
                <div className="bg-white/90 p-2 rounded-xl border border-indigo-100 text-center text-[11px]">
                  <div className="font-black text-amber-700">⚡ ระดับปานกลาง (L2)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">ฝึกคิดเชื่อมโยง</div>
                </div>
                <div className="bg-white/90 p-2 rounded-xl border border-indigo-100 text-center text-[11px]">
                  <div className="font-black text-purple-700">🔥 ระดับท้าทาย (L3)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">แก้ปัญหาซับซ้อน</div>
                </div>
              </div>
            </div>

            {/* Setting: Educational Fun Facts before new game session */}
            <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/70 p-4 rounded-2xl border-2 border-amber-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black text-amber-950 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  แสดงเกร็ดความรู้ (Fun Facts) ชวนคิดก่อนเริ่มเกม
                </label>
                <button
                  type="button"
                  id="btn-toggle-fun-facts"
                  onClick={() =>
                    setCurrent({
                      ...current,
                      showFunFacts: current.showFunFacts === false ? true : false,
                    })
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    current.showFunFacts !== false ? 'bg-amber-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      current.showFunFacts !== false ? 'left-5.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                แสดงการ์ดเกร็ดความรู้วิทยาศาสตร์ สัตว์โลก ร่างกาย และธรรมชาติที่เข้าใจง่าย พร้อมเสียงเล่า เพื่อกระตุ้นความอยากรู้อยากเห็นก่อนเข้าสู่บทเรียน
              </p>
            </div>

            {/* Setting 4: Audio, Voice Persona & Speech Synthesis Suite */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              {/* Volume and Auto-Speak Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-black text-slate-800 flex items-center gap-2">
                      {current.soundVolume > 0 ? (
                        <Volume2 className="w-4 h-4 text-purple-600" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-rose-500" />
                      )}
                      ระดับความดังเสียง (Sound Volume)
                    </label>
                    <span className="text-xs font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                      {Math.round(current.soundVolume * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={current.soundVolume}
                      onChange={(e) => {
                        const newVol = parseFloat(e.target.value);
                        setCurrent({ ...current, soundVolume: newVol });
                      }}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setCurrent({
                          ...current,
                          soundVolume: current.soundVolume > 0 ? 0 : 0.8,
                        })
                      }
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                      title={current.soundVolume > 0 ? 'ปิดเสียง' : 'เปิดเสียง'}
                    >
                      {current.soundVolume > 0 ? (
                        <Volume2 className="w-4 h-4 text-purple-600" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-rose-500" />
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-purple-700 font-semibold mt-1.5 flex items-center gap-1.5">
                    <span>💡 ทิปสำหรับครู: กดปุ่ม</span>
                    <kbd className="px-1.5 py-0.5 bg-slate-800 text-amber-300 font-black rounded text-[10px]">M</kbd>
                    <span>บนคีย์บอร์ดได้ทุกเมื่อเพื่อปิดหรือเปิดเสียงทันที</span>
                  </p>
                </div>

                {/* Auto Speak Toggle */}
                <div className="sm:border-l sm:border-slate-200 sm:pl-4 flex items-center justify-between sm:justify-start gap-3">
                  <div>
                    <span className="text-xs font-black text-slate-800 block">
                      อ่านคำถามอัตโนมัติ
                    </span>
                    <span className="text-[10px] text-slate-500">
                      เมื่อเริ่มข้อใหม่
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrent({ ...current, autoSpeak: !current.autoSpeak })
                    }
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      current.autoSpeak ? 'bg-purple-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                        current.autoSpeak ? 'left-5.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Persona Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-black text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    รูปแบบเสียงอ่านธรรมชาติ (TTS Voice Personas)
                  </label>
                  <button
                    type="button"
                    onClick={() => testVoiceSample(current.voicePersona, current.language)}
                    className="text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 px-2.5 py-1 rounded-full cursor-pointer flex items-center gap-1 transition-transform active:scale-95"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> ฟังตัวอย่างเสียงนี้
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      id: 'child_boy',
                      label: 'เด็กชาย 👦',
                      desc: 'สดใส ร่าเริง เป็นเพื่อนวัยเดียวกัน',
                    },
                    {
                      id: 'child_girl',
                      label: 'เด็กหญิง 👧',
                      desc: 'เสียงหวาน น่ารัก เป็นกันเอง',
                    },
                    {
                      id: 'adult_male',
                      label: 'ผู้ใหญ่ชาย 👨',
                      desc: 'เสียงอบอุ่น ใจดี ชัดถ้อยชัดคำ',
                    },
                    {
                      id: 'adult_female',
                      label: 'คุณครูหญิง 👩‍🏫',
                      desc: 'เสียงคุณครูใจดี นุ่มนวล ชวนฟัง (แนะนำ)',
                    },
                  ].map((item) => {
                    const isSelected = current.voicePersona === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() =>
                          setCurrent({ ...current, voicePersona: item.id as VoicePersona })
                        }
                        className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-300 shadow-2xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs text-slate-800">
                            {item.label}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              testVoiceSample(item.id as VoicePersona, current.language);
                            }}
                            className="p-1 rounded-md text-purple-600 hover:bg-purple-200 text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                            title="ลองฟังเสียงนี้"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span className="hidden sm:inline">ลองฟัง</span>
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sound Effects Synthesizer Quick Testing Suite */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-amber-500" />
                    ทดสอบเอฟเฟกต์เสียงสังเคราะห์ (Web Audio API)
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    คลิกเพื่อทดสอบ
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  <button
                    type="button"
                    onClick={() => soundEffects.playSuccess(current.soundVolume)}
                    className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-center font-bold text-[11px] cursor-pointer transition-transform active:scale-95"
                  >
                    <div>🔔</div>
                    <div className="truncate">ตอบถูก</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => soundEffects.playIncorrect(current.soundVolume)}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-center font-bold text-[11px] cursor-pointer transition-transform active:scale-95"
                  >
                    <div>💡</div>
                    <div className="truncate">ลองใหม่</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => soundEffects.playVictory(current.soundVolume)}
                    className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-center font-bold text-[11px] cursor-pointer transition-transform active:scale-95"
                  >
                    <div>🎉</div>
                    <div className="truncate">ชนะรอบ</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => soundEffects.playTick(0.8, current.soundVolume)}
                    className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-center font-bold text-[11px] cursor-pointer transition-transform active:scale-95"
                  >
                    <div>⏱️</div>
                    <div className="truncate">นับเวลา</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => soundEffects.playTap(current.soundVolume)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-center font-bold text-[11px] cursor-pointer transition-transform active:scale-95"
                  >
                    <div>👆</div>
                    <div className="truncate">แตะปุ่ม</div>
                  </button>
                </div>
              </div>

              {/* Audio Format & Speech Verification Status */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ตรวจสอบความถูกต้องของรูปแบบเสียง: ระบบสมบูรณ์ 100%</span>
                </div>
                <span className="text-slate-500 font-medium text-[10px] hidden sm:inline">
                  Web Audio + SpeechSynthesis ({getAvailableVoices().length || 'พร้อม'} เสียง)
                </span>
              </div>
            </div>

            {/* Setting 5: Language Selector */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <label className="text-sm font-black text-slate-800 flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-sky-500" />
                ภาษาของเกมและเสียงอ่าน (Language)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'th', label: 'ภาษาไทย 🇹🇭' },
                  { id: 'en', label: 'English 🇺🇸' },
                  { id: 'zh', label: '中文 🇨🇳' },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setCurrent({ ...current, language: lang.id as Language })}
                    className={`py-2 px-3 rounded-xl border-2 font-bold text-xs cursor-pointer transition-all ${
                      current.language === lang.id
                        ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Setting 6: Color Theme & Night Mode with Color Palette Preview Grid */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-sm font-black text-slate-800 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-pink-500" />
                    <span>ธีมสีของเกมและโหมดกลางคืน (Color Theme & Night Mode)</span>
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5">
                    เลือกพาเลทสีที่เหมาะกับสภาพแวดล้อมและสายตาของเด็ก ระบบจะแสดงตัวอย่างสีจริงทันทีก่อนบันทึก
                  </p>
                </div>
                <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 px-2.5 py-1 rounded-xl text-xs font-bold text-slate-700">
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>ธีมที่เลือก: </span>
                  <span className="text-amber-700 font-black">
                    {THEME_PALETTES.find((t) => t.id === current.theme)?.nameTh || current.theme}
                  </span>
                </div>
              </div>

              {/* Theme Preview Cards Grid (5 Themes) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {THEME_PALETTES.map((theme) => {
                  const isSelected = current.theme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      id={`btn-theme-${theme.id}`}
                      onClick={() => {
                        soundEffects.playTap(current.soundVolume);
                        setCurrent({ ...current, theme: theme.id });
                      }}
                      className={`p-3 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between gap-2.5 relative group ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-300 shadow-sm scale-[1.01]'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Theme Title & Icon */}
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-lg shrink-0">{theme.icon}</span>
                            <div className="min-w-0">
                              <div className="font-black text-xs text-slate-800 truncate">
                                {theme.nameTh}
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium truncate">
                                {theme.nameEn}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>

                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                          {theme.tagline}
                        </p>
                      </div>

                      {/* Small Color Palette Swatch Strip */}
                      <div className="space-y-1">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                          <span>พาเลทสี (Palette)</span>
                          <span className="text-[8px] text-slate-400 font-mono">5 เฉด</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-100 justify-between">
                          {theme.swatches.map((swatch, idx) => (
                            <div
                              key={idx}
                              title={`${swatch.name}: ${swatch.hex}`}
                              className="group/swatch relative flex flex-col items-center"
                            >
                              <div
                                className={`w-5 h-5 rounded-lg border shadow-2xs transition-transform group-hover/swatch:scale-115 ${swatch.bgClass} ${swatch.borderClass}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Miniature UI Screen Wireframe Preview */}
                      <div
                        className={`w-full p-2 rounded-xl border transition-all overflow-hidden ${theme.preview.containerClass} ${theme.preview.cardBorder}`}
                      >
                        {/* Mini top bar */}
                        <div className="flex items-center justify-between pb-1 mb-1 border-b border-black/5 dark:border-white/10 text-[9px]">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span className={`font-black text-[8px] truncate ${theme.preview.textClass}`}>
                              {theme.nameTh}
                            </span>
                          </div>
                          <span className="text-[8px] opacity-70">⭐ 100</span>
                        </div>

                        {/* Mini question card */}
                        <div className={`p-1.5 rounded-lg border text-[8px] ${theme.preview.cardClass} ${theme.preview.cardBorder}`}>
                          <div className={`font-bold truncate text-[8px] ${theme.preview.textClass}`}>
                            🐱 โจทย์ตัวอย่าง
                          </div>
                          <div className="grid grid-cols-2 gap-1 mt-1">
                            <div className={`px-1 py-0.5 rounded text-[7px] font-bold text-center truncate ${theme.preview.optionActiveClass}`}>
                              คำตอบ A
                            </div>
                            <div className={`px-1 py-0.5 rounded text-[7px] font-medium text-center truncate border ${theme.preview.optionClass}`}>
                              คำตอบ B
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Selection Button / Badge */}
                      <div className="pt-1 border-t border-slate-100 flex items-center justify-center">
                        {isSelected ? (
                          <span className="text-[11px] font-black text-amber-700 flex items-center gap-1">
                            <Check className="w-3 h-3 text-amber-600" />
                            กำลังเลือกใช้งาน
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-bold group-hover:text-slate-800">
                            คลิกเพื่อเลือก
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Live Interactive Simulation Showcase Box */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>ตัวอย่างมุมมองจำลองจริงของธีม &quot;{THEME_PALETTES.find((t) => t.id === current.theme)?.nameTh}&quot; (Live Preview)</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    คลิกทดสอบตัวเลือกจำลองได้ทันที
                  </span>
                </div>

                {/* Simulation Screen View */}
                {(() => {
                  const activeTheme = THEME_PALETTES.find((t) => t.id === current.theme) || THEME_PALETTES[0];
                  return (
                    <div
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-300 shadow-xs ${activeTheme.preview.containerClass} ${current.theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
                    >
                      {/* Top Bar in Simulation */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-black/10 dark:border-white/10 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-white/90 dark:bg-slate-800 flex items-center justify-center text-base shadow-2xs border border-black/5 dark:border-white/10">
                            {activeProfile?.avatar || '🐰'}
                          </div>
                          <div>
                            <div className={`font-black text-xs ${activeTheme.preview.textClass}`}>
                              {activeProfile?.name || 'น้องผู้เรียน'}
                            </div>
                            <div className="text-[10px] opacity-75">
                              {current.theme === 'dark' ? '🌙 โหมดถนอมสายตาสำหรับกลางคืน' : `🎨 ธีม${activeTheme.nameTh} (${activeTheme.tagline})`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <span className="flex items-center gap-1 bg-white/80 dark:bg-slate-800/90 px-2 py-1 rounded-xl border border-black/5 dark:border-white/10 shadow-2xs">
                            <span className="text-amber-500">⭐</span>
                            <span className={activeTheme.preview.textClass}>150 คะแนน</span>
                          </span>
                          <span className="flex items-center gap-1 bg-white/80 dark:bg-slate-800/90 px-2 py-1 rounded-xl border border-black/5 dark:border-white/10 shadow-2xs">
                            <span className="text-orange-500">🔥</span>
                            <span className={activeTheme.preview.textClass}>5 วันต่อเนื่อง</span>
                          </span>
                        </div>
                      </div>

                      {/* Quiz Card in Simulation */}
                      <div className={`mt-3 p-3.5 rounded-2xl border ${activeTheme.preview.cardClass} ${activeTheme.preview.cardBorder}`}>
                        <div className="flex items-center justify-between text-[11px] font-bold opacity-75 mb-1.5">
                          <span>ข้อที่ ๑ จาก ๕ ข้อ</span>
                          <span className="text-[10px] bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full font-bold">
                            ทักษะภาษาและการรู้หนังสือ
                          </span>
                        </div>

                        <div className={`text-sm sm:text-base font-black mb-3 ${activeTheme.preview.textClass}`}>
                          🐱 สัตว์ชนิดนี้คือตัวอะไร และมีเสียงร้องอย่างไร?
                        </div>

                        {/* Interactive Sample Option Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => {
                              soundEffects.playCorrect(current.soundVolume);
                              setPreviewSelectedOption('a');
                            }}
                            className={`p-2.5 sm:p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2.5 ${
                              previewSelectedOption === 'a'
                                ? activeTheme.preview.optionActiveClass + ' ring-2 ring-offset-1 shadow-xs'
                                : activeTheme.preview.optionClass + ' hover:opacity-90'
                            }`}
                          >
                            <span className="text-xl">🐱</span>
                            <div className="text-left flex-1 min-w-0">
                              <div className="font-black text-xs sm:text-sm truncate">แมวเหมียว</div>
                              <div className="text-[10px] opacity-80 truncate">ส่งเสียงร้อง เหมียว เหมียว</div>
                            </div>
                            {previewSelectedOption === 'a' && (
                              <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              soundEffects.playTap(current.soundVolume);
                              setPreviewSelectedOption('b');
                            }}
                            className={`p-2.5 sm:p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2.5 ${
                              previewSelectedOption === 'b'
                                ? activeTheme.preview.optionActiveClass + ' ring-2 ring-offset-1 shadow-xs'
                                : activeTheme.preview.optionClass + ' hover:opacity-90'
                            }`}
                          >
                            <span className="text-xl">🐶</span>
                            <div className="text-left flex-1 min-w-0">
                              <div className="font-black text-xs sm:text-sm truncate">สุนัข</div>
                              <div className="text-[10px] opacity-80 truncate">ส่งเสียงร้อง โฮ่ง โฮ่ง</div>
                            </div>
                            {previewSelectedOption === 'b' && (
                              <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Simulation Footer Note */}
                      <div className="mt-2.5 flex items-center justify-between text-[11px] opacity-75">
                        <span className="flex items-center gap-1">
                          <span>💡</span>
                          <span>ลองคลิกเลือกตัวเลือกจำลองด้านบนเพื่อดูการแสดงผลและความสบายตาจริง</span>
                        </span>
                        <span className="font-black">
                          {activeTheme.nameTh} ({activeTheme.nameEn})
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Setting 7: Camera Mirroring */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
              <div>
                <label className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-500" />
                  กระจกเงากล้อง (Camera Mirroring)
                </label>
                <p className="text-xs text-slate-500">
                  กลับภาพซ้าย-ขวาให้ตรงกับท่าทางของเด็กเหมือนส่องกระจก
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurrent({ ...current, cameraMirrored: !current.cameraMirrored })}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  current.cameraMirrored ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                    current.cameraMirrored ? 'left-6.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Setting 8: Hybrid Question Manager (ระบบคลังข้อสอบแบบไฮบริด) */}
            {onOpenQuestionManager && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border-2 border-amber-300 shadow-2xs flex items-center justify-between gap-3">
                <div>
                  <label className="text-sm font-black text-amber-950 flex items-center gap-2 flex-wrap">
                    <span className="text-lg">📝</span>
                    <span>ระบบคลังข้อสอบแบบไฮบริด (Hybrid Question Bank)</span>
                    <span className="bg-amber-200 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-md border border-amber-300 flex items-center gap-1">
                      ⚡ แคชในเครื่อง + ☁️ Firestore
                    </span>
                  </label>
                  <p className="text-xs text-amber-800 mt-0.5">
                    จัดเก็บและซิงค์คลังข้อสอบ 8 ทักษะหลัก พร้อมเปิดดูโหมดอ่าน หรือเข้าสู่ระบบด้วยอีเมลที่ได้รับมอบหมายเพื่อแก้ไข
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenQuestionManager();
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-black px-4 py-2 rounded-xl border-b-2 border-amber-700 shadow-xs cursor-pointer transition-all shrink-0 flex items-center gap-1.5"
                >
                  <span>เปิดคลังข้อสอบ 📝</span>
                </button>
              </div>
            )}

            {/* Setting 9: Direct Feedback to Developer */}
            {onOpenFeedback && (
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-2xl border-2 border-teal-300 shadow-2xs flex items-center justify-between gap-3">
                <div>
                  <label className="text-sm font-black text-teal-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-teal-600" />
                    ส่งข้อเสนอแนะถึงผู้พัฒนา (บันทึกลง Google Sheets)
                  </label>
                  <p className="text-xs text-teal-700">
                    แจ้งปัญหาการใช้งาน แนะนำคำถาม หรือติชมให้กำลังใจ ข้อมูลจะถูกจัดเก็บลงใน Google Sheets โดยตรง
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenFeedback();
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-black px-4 py-2 rounded-xl border-b-2 border-teal-800 shadow-xs cursor-pointer transition-all shrink-0"
                >
                  ส่งข้อเสนอแนะ 💬
                </button>
              </div>
            )}
              </div>
            )}

            {/* TAB 2: โซนผู้ปกครอง (Parent Zone - Protected by 4-digit PIN) */}
            {activeTab === 'parent_zone' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Parent Zone Security Status Card */}
                <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                        🛡️
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-black text-slate-900">
                            โซนความปลอดภัยสำหรับผู้ปกครอง (Parent Zone)
                          </h3>
                          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-600" />
                            <span>คุ้มครองด้วย PIN 4 หลัก</span>
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          การดำเนินการสำคัญ เช่น การเปลี่ยนหลักสูตร หรือการลบโปรไฟล์ จะต้องยืนยันรหัส PIN 4 หลักเสมอ เพื่อป้องกันเด็กกดเล่น
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowChangePinModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-300 font-black text-xs flex items-center gap-1.5 shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <Key className="w-3.5 h-3.5 text-amber-600" />
                      <span>เปลี่ยนรหัส PIN (เริ่มต้น: {DEFAULT_PARENT_PIN})</span>
                    </button>
                  </div>
                </div>

                {/* Sensitive Operation 1: Curriculum Modification */}
                <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <span>๑. การเปลี่ยนหลักสูตรการศึกษา (Curriculum Modification)</span>
                        <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.2 rounded-full border border-rose-200">
                          🔒 ต้องใช้ PIN
                        </span>
                      </label>
                      <p className="text-xs text-slate-500 mt-0.5">
                        เลือกหลักสูตรที่สอดคล้องกับชั้นเรียนของเด็ก ระบบจะปรับทักษะ ข้อสอบ และเกณฑ์การประเมิน
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      {
                        id: 'early_childhood' as CurriculumMode,
                        title: '🌿 ปฐมวัย (Early Childhood)',
                        subtitle: '8 ทักษะพัฒนาการ & EF',
                        desc: 'ประเมิน 4 ด้าน 8 ทักษะหลัก เหมาะสำหรับ อนุบาล 1 - อนุบาล 3',
                        badge: 'อนุบาล 1-3',
                      },
                      {
                        id: 'cbe_primary' as CurriculumMode,
                        title: '🎓 ฐานสมรรถนะ (CBE Primary)',
                        subtitle: '6 สมรรถนะหลักสูตรใหม่',
                        desc: 'ประเมิน 6 สมรรถนะสำคัญ สพฐ. เหมาะสำหรับ ประถมศึกษา ป.1 - ป.3',
                        badge: 'ประถม ป.1-3',
                      },
                      {
                        id: 'thai_phonics' as CurriculumMode,
                        title: '📖 แจกลูกสะกดคำ (Thai Phonics)',
                        subtitle: '10 หน่วยการสอน สพฐ.',
                        desc: 'ฝึกอ่านเขียนภาษาไทยด้วยการแจกลูกสะกดคำ สพฐ. คลังข้อสอบ 3,600+ ข้อ',
                        badge: 'อ่านออกเขียนได้',
                      },
                    ].map((item) => {
                      const isActive = currentCurriculum === item.id;
                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                            isActive
                              ? 'border-indigo-500 bg-indigo-50/70 ring-2 ring-indigo-200 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-black text-slate-800">{item.title}</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                                {item.badge}
                              </span>
                            </div>
                            <div className="text-[11px] font-bold text-indigo-700">{item.subtitle}</div>
                            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                            {isActive ? (
                              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> กำลังใช้งาน
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleRequestCurriculumChange(item.id, item.title)}
                                className="w-full py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-center gap-1 shadow-2xs cursor-pointer transition-all active:scale-95"
                              >
                                <Lock className="w-3 h-3" />
                                <span>เปลี่ยนเป็นหลักสูตรนี้ (ใส่ PIN)</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sensitive Operation 2: Student Profile Deletion */}
                <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <Trash2 className="w-4 h-4 text-rose-500" />
                        <span>๒. จัดการและลบโปรไฟล์ผู้เรียน (Profile Deletion)</span>
                        <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.2 rounded-full border border-rose-200">
                          🔒 ต้องใช้ PIN
                        </span>
                      </label>
                      <p className="text-xs text-slate-500 mt-0.5">
                        ลบโปรไฟล์ผู้เรียนที่ไม่ได้ใช้งาน การลบจะทำให้คะแนนสะสมและประวัติถูกล้างอย่างถาวร
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      ทั้งหมด {profiles.length} คน
                    </span>
                  </div>

                  {profiles.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                      ไม่พบรายชื่อผู้เรียนในเครื่อง
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                      {profiles.map((p) => {
                        const isCurrentlyActive = activeProfile?.id === p.id;
                        return (
                          <div
                            key={p.id}
                            className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 flex items-center justify-between gap-3 shadow-2xs transition-all"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0">
                                {p.avatar || '⭐'}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-xs font-black text-slate-800 truncate">{p.name}</span>
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                                    {p.grade}
                                  </span>
                                  {isCurrentlyActive && (
                                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                      ใช้อยู่
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-500 mt-0.5">
                                  ⭐ {p.totalScore || 0} คะแนน · 🔥 {p.streakDays || 0} วัน
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRequestDeleteProfile(p)}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-900 border border-rose-200 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all active:scale-95 shrink-0"
                              title={`ลบโปรไฟล์ ${p.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>ลบ</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: Dual Persistence Hub (Google Sheets + Firebase Firestore) */}
            {activeTab === 'cloud' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">☁️📊</span>
                  <div>
                    <h4 className="text-sm font-black text-emerald-950 flex items-center gap-2">
                      <span>ระบบบันทึกและเชื่อมต่อข้อมูลคู่ขนาน (Google Sheets & Cloud Firestore)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      ข้อมูลผลการเล่น รายงานพัฒนาการ และข้อเสนอแนะ จะถูกจัดเก็บลงทั้ง Google Sheets และ Firebase Cloud พร้อมกัน
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!showInbox) {
                      handleLoadCloudFeedbacks();
                    }
                    setShowInbox(!showInbox);
                  }}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors shadow-2xs self-start sm:self-auto"
                >
                  <Inbox className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{showInbox ? 'ซ่อนข้อมูลคลาวด์' : 'ดูข้อมูลคลาวด์ & ชีต'}</span>
                </button>
              </div>

              {/* Status Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5 flex items-center gap-2">
                  <span className="text-base">📊</span>
                  <div className="min-w-0">
                    <div className="font-bold text-emerald-950 flex items-center gap-1">
                      <span>Google Sheets (สเปรดชีต)</span>
                      <span className="bg-emerald-200 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                        เชื่อมต่อแล้ว
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-600 truncate">
                      บันทึกสถิติรายรอบ, รายงานพัฒนาการ และข้อคิดเห็น
                    </div>
                  </div>
                </div>

                <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-2.5 flex items-center gap-2">
                  <span className="text-base">☁️</span>
                  <div className="min-w-0">
                    <div className="font-bold text-sky-950 flex items-center gap-1">
                      <span>Firebase Cloud Firestore</span>
                      <span className="bg-sky-200 text-sky-800 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                        เชื่อมต่อแล้ว
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-600 truncate">
                      จัดเก็บโปรไฟล์, ประวัติการเล่นเกม และความคืบหน้าระดับชาติ
                    </div>
                  </div>
                </div>
              </div>

              {/* Bootstrap & Synchronize All 5 Firestore Collections Card */}
              <div className="bg-gradient-to-r from-sky-50 via-indigo-50/60 to-white border border-sky-200 rounded-2xl p-3.5 space-y-2.5 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <div className="font-black text-sky-950 text-xs flex items-center gap-1.5">
                      <span>⚡ สั่งสร้าง & ซิงค์ 5 Collections บน Firebase Firestore ทันที</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      ใน Firebase Console จะแสดงชื่อ Collection ให้เห็นก็ต่อเมื่อมีข้อมูลเอกสารอย่างน้อย 1 รายการ กดปุ่มนี้เพื่อส่งข้อมูลตั้งต้นลง Firestore ให้ครบทั้ง 5 ส่วนทันที
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleBootstrapCollections}
                    disabled={isBootstrapping}
                    className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-black text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shrink-0 self-start sm:self-auto"
                  >
                    {isBootstrapping ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>กำลังส่งข้อมูลขึ้น Firestore...</span>
                      </>
                    ) : (
                      <>
                        <Cloud className="w-3.5 h-3.5" />
                        <span>ซิงค์สร้าง 5 Collections ทันที</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Checklist of 5 Collections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-700 bg-white/90 px-2.5 py-1.5 rounded-lg border border-sky-100 shadow-2xs">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="font-mono font-bold text-sky-900">game_sessions</span>
                    <span className="text-slate-500 text-[10px]">: บันทึกผลการเล่นรอบต่าง ๆ</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 bg-white/90 px-2.5 py-1.5 rounded-lg border border-sky-100 shadow-2xs">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="font-mono font-bold text-sky-900">profiles</span>
                    <span className="text-slate-500 text-[10px]">: โปรไฟล์เด็ก & แต้มสะสม</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 bg-white/90 px-2.5 py-1.5 rounded-lg border border-sky-100 shadow-2xs">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="font-mono font-bold text-sky-900">progress_reports</span>
                    <span className="text-slate-500 text-[10px]">: รายงานประเมินทักษะ 8 ด้าน</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 bg-white/90 px-2.5 py-1.5 rounded-lg border border-sky-100 shadow-2xs">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="font-mono font-bold text-sky-900">feedbacks</span>
                    <span className="text-slate-500 text-[10px]">: ข้อเสนอแนะผู้ปกครอง/ครู</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 bg-white/90 px-2.5 py-1.5 rounded-lg border border-sky-100 shadow-2xs sm:col-span-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="font-mono font-bold text-sky-900">config</span>
                    <span className="text-slate-500 text-[10px]">: คอนฟิกการเชื่อมต่อระบบ (เช่น Google Sheets Webhook URL)</span>
                  </div>
                </div>

                {bootstrapResult && (
                  <div className="bg-emerald-100/90 border border-emerald-300 text-emerald-950 px-3 py-2 rounded-xl text-xs font-bold flex items-start gap-2 shadow-2xs animate-in fade-in">
                    <span className="text-base leading-none">🎉</span>
                    <div>
                      <div>{bootstrapResult}</div>
                      <div className="text-[11px] font-normal text-emerald-800 mt-0.5">
                        เมื่อเปิดหน้า Firebase Console แถบเมนูด้านซ้าย แล้วกด Refresh หน้าเว็บ (F5) จะพบคอลเลกชันครบทั้งหมดทันที
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cloud Inbox / Data Viewer Content */}
              {showInbox && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2.5 mt-2">
                  {/* Tabs selector */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCloudTab('feedbacks')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          cloudTab === 'feedbacks'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        💬 ข้อเสนอแนะ ({cloudFeedbacks.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setCloudTab('sessions')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          cloudTab === 'sessions'
                            ? 'bg-sky-600 text-white shadow-2xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        🎮 ผลการเล่นคลาวด์ ({cloudSessions.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setCloudTab('reports')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          cloudTab === 'reports'
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        📈 รายงานพัฒนาการ ({cloudReports.length})
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleLoadCloudFeedbacks}
                      disabled={isLoadingFeedbacks}
                      className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 text-xs font-bold cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFeedbacks ? 'animate-spin' : ''}`} />
                      <span>รีเฟรช</span>
                    </button>
                  </div>

                  {isLoadingFeedbacks ? (
                    <div className="py-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                      <span>กำลังโหลดข้อมูลจากคลาวด์และชีต...</span>
                    </div>
                  ) : cloudTab === 'feedbacks' ? (
                    cloudFeedbacks.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500">
                        ยังไม่มีข้อเสนอแนะที่ส่งเข้ามา หรือกำลังรอข้อมูลชุดแรก
                      </div>
                    ) : (
                      <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                        {cloudFeedbacks.map((fb, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs space-y-1 shadow-2xs"
                          >
                            <div className="flex items-center justify-between text-[11px] text-slate-500">
                              <span className="font-bold text-slate-700">{fb.senderName} ({fb.senderRole})</span>
                              <span>{fb.timestamp}</span>
                            </div>
                            <div className="flex items-center gap-1 text-amber-500 text-[11px]">
                              {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                              <span className="text-slate-500 ml-1.5 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">
                                {fb.category}
                              </span>
                            </div>
                            <p className="text-slate-800 text-xs break-words">{fb.message}</p>
                            {fb.contactInfo && fb.contactInfo !== '-' && (
                              <div className="text-[10px] text-slate-500 pt-0.5 border-t border-slate-100">
                                ติดต่อ: {fb.contactInfo}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  ) : cloudTab === 'sessions' ? (
                    cloudSessions.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500">
                        ยังไม่มีประวัติการเล่นที่บันทึกลงคลาวด์ (จะบันทึกอัตโนมัติเมื่อเล่นจบแต่ละรอบ)
                      </div>
                    ) : (
                      <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                        {cloudSessions.map((s, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs space-y-1 shadow-2xs"
                          >
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-slate-800">
                                {s.profileName} ({s.grade})
                              </span>
                              <span className="text-slate-400 text-[10px]">
                                {new Date(s.playedAt).toLocaleDateString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                                ตอบถูก {s.correctCount}/{s.totalQuestions}
                              </span>
                              <span className="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                                ความแม่นยำ {s.accuracyRate}%
                              </span>
                              <span className="text-slate-500 text-[10px]">
                                {s.usedHandTracking ? '🖐️ โหมดมือ' : '👆 สัมผัส'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    cloudReports.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500">
                        ยังไม่มีรายงานที่บันทึกลงคลาวด์ (กดปุ่ม &quot;บันทึกลง Sheets &amp; Cloud&quot; ในหน้ารายงานเพื่อบันทึก)
                      </div>
                    ) : (
                      <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                        {cloudReports.map((r, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs space-y-1 shadow-2xs"
                          >
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-indigo-900">{r.profileName} ({r.grade})</span>
                              <span className="text-slate-400 text-[10px]">
                                {new Date(r.evaluatedAt).toLocaleDateString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <div className="text-[11px] font-bold text-slate-700">
                              ความแม่นยำรวม: {r.overallAccuracy}% | ภาษา: {r.literacyRate}% | คิดคำนวณ: {r.mathRate}% | แก้ปัญหา: {r.problemSolvingRate}%
                            </div>
                            <p className="text-slate-500 text-[11px] truncate">{r.summary}</p>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
          </div>
        )}

        {/* Footer */}
        {isUnlocked && (
          <div className="bg-white p-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md transition-transform active:scale-98 cursor-pointer"
            >
              บันทึกการตั้งค่า
            </button>
          </div>
        )}
      </div>

      {/* 4-Digit PIN Verification Modal for Sensitive Actions */}
      {pinModalConfig && (
        <ParentPinModal
          isOpen={pinModalConfig.isOpen}
          onClose={() => setPinModalConfig(null)}
          onSuccess={pinModalConfig.action}
          title={pinModalConfig.title}
          description={pinModalConfig.description}
          soundVolume={current.soundVolume}
        />
      )}

      {/* 4-Digit PIN Modal for Parental Gate Unlocking */}
      {showGatePinModal && (
        <ParentPinModal
          isOpen={showGatePinModal}
          onClose={() => setShowGatePinModal(false)}
          onSuccess={() => {
            setIsUnlocked(true);
            setShowGatePinModal(false);
          }}
          title="ปลดล็อกโหมดตั้งค่า (Parent PIN)"
          description="กรุณากรอกรหัส PIN 4 หลักเพื่อเข้าสู่หน้าตั้งค่าสำหรับผู้ปกครอง"
          soundVolume={current.soundVolume}
        />
      )}

      {/* Change PIN Modal */}
      {showChangePinModal && (
        <ChangeParentPinModal
          isOpen={showChangePinModal}
          onClose={() => setShowChangePinModal(false)}
          soundVolume={current.soundVolume}
        />
      )}

      {/* Device Compatibility Diagnostics Modal */}
      <DeviceCompatibilityModal
        isOpen={showDeviceDiagnostics}
        onClose={() => setShowDeviceDiagnostics(false)}
        currentControlMode={current.controlMode}
        onSelectControlMode={(mode) => setCurrent({ ...current, controlMode: mode })}
        language={current.language}
      />
    </div>
  );
};
