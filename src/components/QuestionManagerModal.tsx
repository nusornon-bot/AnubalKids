import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Search,
  Filter,
  CheckCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Cloud,
  Check,
  AlertCircle,
  Download,
  Upload,
  Layers,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Lock,
  Shield,
  ShieldCheck,
  ShieldAlert,
  LogOut,
  Users,
  User as UserIcon,
  RefreshCw,
  Zap,
  Database,
  Server,
  CloudUpload,
  ArrowUpDown,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, googleSignIn, logout } from '../services/firebaseAuthService';
import {
  isEmailAuthorized,
  getAuthorizedEmails,
  addAuthorizedEmail,
  removeAuthorizedEmail,
  DEFAULT_AUTHORIZED_EMAILS,
} from '../services/authPermissionService';
import { Grade, Question, Subject, SkillCode, ExamSet } from '../types';
import { isImageUrl } from '../utils/imageUtils';
import { ParentQuestionEditor } from './questionmanager/ParentQuestionEditor';
import { LocalStorageJSONViewer } from './questionmanager/LocalStorageJSONViewer';
import { AIQuestionSuggesterPanel } from './questionmanager/AIQuestionSuggesterPanel';
import { SKILLS_LIST } from '../data/skills';
import { storageService } from '../services/storageService';
import {
  saveCloudCustomQuestion,
  deleteCloudCustomQuestion,
  fetchCloudCustomQuestions,
  syncHybridQuestionBank,
  seedAllQuestionsToFirestore,
} from '../services/cloudSyncService';
import { CSVImportModal } from './CSVImportModal';
import {
  generateSampleCSVTemplate,
  exportQuestionsToCSV,
  downloadCSV,
} from '../utils/csvQuestionParser';
import { getCurriculumTheme } from '../utils/curriculumTheme';
import { CurriculumMode } from '../types';

interface QuestionManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  allQuestions: Question[];
  onQuestionsChange: () => void;
  onOpenExamSetBuilder?: () => void;
  initialTab?: 'list' | 'add' | 'json' | 'stats' | 'cloud' | 'admins' | 'ai_suggester';
  onPlayExamSet?: (examSet: ExamSet) => void;
  curriculumMode?: CurriculumMode;
}

export const QuestionManagerModal: React.FC<QuestionManagerModalProps> = ({
  isOpen,
  onClose,
  allQuestions,
  onQuestionsChange,
  onOpenExamSetBuilder,
  initialTab = 'list',
  onPlayExamSet,
  curriculumMode = 'early_childhood',
}) => {
  const currTheme = getCurriculumTheme(curriculumMode);
  // Authentication & Authorization state
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authorizedEmailsList, setAuthorizedEmailsList] = useState<string[]>(getAuthorizedEmails());
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adminActionStatus, setAdminActionStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Browse Mode (ให้เปิดดูคลังข้อสอบและจัดการ Local Storage JSON ได้โดยตรง)
  const [isBrowseMode, setIsBrowseMode] = useState(true);

  // Navigation / Tab state ('list' | 'add' | 'json' | 'stats' | 'cloud' | 'admins' | 'ai_suggester')
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'json' | 'stats' | 'cloud' | 'admins' | 'ai_suggester'>(initialTab);

  // Sync initialTab whenever modal opens with a requested tab
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);
  const [filterGrade, setFilterGrade] = useState<'all' | Grade>('all');
  const [filterSubject, setFilterSubject] = useState<'all' | Subject>('all');
  const [filterSource, setFilterSource] = useState<'all' | 'custom' | 'builtin'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Notification / Feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => storageService.getLastQuestionSyncTime());

  // Cloud bulk seeding progress
  const [isSeedingCloud, setIsSeedingCloud] = useState(false);
  const [seedProgress, setSeedProgress] = useState<{ current: number; total: number } | null>(null);

  // CSV Import Modal State
  const [isCSVImportOpen, setIsCSVImportOpen] = useState(false);

  // Form State for Adding / Editing
  const [formGrade, setFormGrade] = useState<Grade>('K1');
  const [formSubject, setFormSubject] = useState<Subject>('literacy');
  const [formSkillCode, setFormSkillCode] = useState<SkillCode>('1');
  const [formDifficulty, setFormDifficulty] = useState<1 | 2 | 3>(1);
  const [formQuestionTh, setFormQuestionTh] = useState('');
  const [formQuestionEn, setFormQuestionEn] = useState('');
  const [formIllustration, setFormIllustration] = useState('⭐');
  const [formIllustrationSubtitle, setFormIllustrationSubtitle] = useState('');
  const [formExplanationTh, setFormExplanationTh] = useState('');

  // 3 Options
  const [opt1LabelTh, setOpt1LabelTh] = useState('');
  const [opt1Icon, setOpt1Icon] = useState('🍎');
  const [opt2LabelTh, setOpt2LabelTh] = useState('');
  const [opt2Icon, setOpt2Icon] = useState('🍌');
  const [opt3LabelTh, setOpt3LabelTh] = useState('');
  const [opt3Icon, setOpt3Icon] = useState('🍊');
  const [correctIndex, setCorrectIndex] = useState<0 | 1 | 2>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open form for a new question
  const handleOpenAdd = () => {
    setEditingQuestion(null);
    setFormGrade('K1');
    setFormSubject('literacy');
    setFormSkillCode('1');
    setFormDifficulty(1);
    setFormQuestionTh('');
    setFormQuestionEn('');
    setFormIllustration('⭐');
    setFormIllustrationSubtitle('');
    setFormExplanationTh('');
    setOpt1LabelTh('');
    setOpt1Icon('🍎');
    setOpt2LabelTh('');
    setOpt2Icon('🍌');
    setOpt3LabelTh('');
    setOpt3Icon('🍊');
    setCorrectIndex(0);
    setActiveTab('add');
  };

  // Open form to edit existing question
  const handleStartEdit = (q: Question) => {
    setEditingQuestion(q);
    setFormGrade(q.grade);
    setFormSubject(q.subject);
    setFormSkillCode(q.skillCode || '1');
    setFormDifficulty(q.difficulty);
    setFormQuestionTh(q.question.th || '');
    setFormQuestionEn(q.question.en || '');
    setFormIllustration(q.illustration || '⭐');
    setFormIllustrationSubtitle(q.illustrationSubtitle?.th || '');
    setFormExplanationTh(q.explanation.th || '');

    if (q.options.length >= 3) {
      setOpt1LabelTh(q.options[0].label.th || '');
      setOpt1Icon(q.options[0].icon || '');
      setOpt2LabelTh(q.options[1].label.th || '');
      setOpt2Icon(q.options[1].icon || '');
      setOpt3LabelTh(q.options[2].label.th || '');
      setOpt3Icon(q.options[2].icon || '');

      const corrIdx = q.options.findIndex((opt) => opt.id === q.correctOptionId);
      setCorrectIndex(corrIdx >= 0 ? (corrIdx as 0 | 1 | 2) : 0);
    }
    setActiveTab('add');
  };

  // Save form (Add or Edit)
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestionTh.trim()) {
      showToast('กรุณาระบุคำถามภาษาไทย');
      return;
    }
    if (!opt1LabelTh.trim() || !opt2LabelTh.trim() || !opt3LabelTh.trim()) {
      showToast('กรุณากรอกตัวเลือกทั้ง 3 ข้อให้ครบถ้วน');
      return;
    }

    const optIds = [
      editingQuestion?.options[0]?.id || `opt-1-${Date.now()}`,
      editingQuestion?.options[1]?.id || `opt-2-${Date.now()}`,
      editingQuestion?.options[2]?.id || `opt-3-${Date.now()}`,
    ];

    const questionData: Question = {
      id: editingQuestion ? editingQuestion.id : `custom-${Date.now()}`,
      grade: formGrade,
      subject: formSubject,
      skillCode: formSkillCode,
      difficulty: formDifficulty,
      question: {
        th: formQuestionTh.trim(),
        en: formQuestionEn.trim() || formQuestionTh.trim(),
        zh: formQuestionTh.trim(),
      },
      illustration: formIllustration.trim() || '⭐',
      illustrationSubtitle: formIllustrationSubtitle.trim()
        ? {
            th: formIllustrationSubtitle.trim(),
            en: formIllustrationSubtitle.trim(),
            zh: formIllustrationSubtitle.trim(),
          }
        : undefined,
      options: [
        {
          id: optIds[0],
          label: { th: opt1LabelTh.trim(), en: opt1LabelTh.trim(), zh: opt1LabelTh.trim() },
          icon: opt1Icon.trim() || undefined,
        },
        {
          id: optIds[1],
          label: { th: opt2LabelTh.trim(), en: opt2LabelTh.trim(), zh: opt2LabelTh.trim() },
          icon: opt2Icon.trim() || undefined,
        },
        {
          id: optIds[2],
          label: { th: opt3LabelTh.trim(), en: opt3LabelTh.trim(), zh: opt3LabelTh.trim() },
          icon: opt3Icon.trim() || undefined,
        },
      ],
      correctOptionId: optIds[correctIndex],
      explanation: {
        th:
          formExplanationTh.trim() ||
          `ยอดเยี่ยมมากเลยครับ! คำตอบที่ถูกต้องคือ "${[opt1LabelTh, opt2LabelTh, opt3LabelTh][correctIndex]}"`,
        en: 'Well done! That is the correct answer!',
        zh: '太棒了！答对了！',
      },
      isCustom: true,
      updatedAt: new Date().toISOString(),
    };

    if (editingQuestion) {
      storageService.updateQuestion(editingQuestion.id, questionData);
      showToast('แก้ไขข้อสอบเรียบร้อยแล้ว ✨');
    } else {
      storageService.addCustomQuestion(questionData);
      showToast('เพิ่มข้อสอบใหม่เรียบร้อยแล้ว 🎉');
    }

    // Attempt saving to cloud asynchronously
    saveCloudCustomQuestion(questionData).catch(() => {});

    onQuestionsChange();
    setActiveTab('list');
  };

  // Delete question
  const handleDeleteQuestion = async (q: Question) => {
    // Custom questions in local storage can be deleted directly by parents/teachers
    if (!q.isCustom && (!currentUser || !isAuthorized)) {
      showToast('🔒 เฉพาะอีเมลผู้ดูแลระบบที่ได้รับสิทธิ์เท่านั้นที่สามารถลบข้อสอบตั้งต้นของระบบได้');
      return;
    }

    if (confirm(`คุณครูหรือผู้ปกครองต้องการลบข้อสอบ "${q.question.th}" ใช่หรือไม่?`)) {
      storageService.deleteQuestion(q.id);
      if (q.isCustom) {
        deleteCloudCustomQuestion(q.id).catch(() => {});
      }
      onQuestionsChange();
      showToast('ลบข้อสอบเรียบร้อยแล้ว');
    }
  };

  // Sync with Cloud Firestore using Hybrid Bidirectional Strategy
  const handleSyncCloudQuestions = async () => {
    setIsCloudSyncing(true);
    showToast('กำลังซิงค์คลังข้อสอบแบบไฮบริดกับ Firebase Firestore...');
    try {
      const res = await syncHybridQuestionBank();
      setLastSyncTime(res.lastSyncTime);
      onQuestionsChange();
      showToast(res.message);
    } catch {
      showToast('ไม่สามารถเชื่อมต่อคลาวด์ได้ในขณะนี้ ใช้แคชในเครื่องแทน');
    } finally {
      setIsCloudSyncing(false);
    }
  };

  // Seed / Backup all questions to Firebase Firestore
  const handleSeedAllToCloud = async () => {
    if (!currentUser || !isAuthorized) {
      showToast('🔒 กรุณาลงชื่อเข้าใช้ด้วยบัญชีผู้ดูแลเพื่อสำรองข้อมูลขึ้นคลาวด์');
      return;
    }

    const confirmed = confirm(
      `คุณครูกำลังจะส่งออกและสำรองข้อสอบทั้งหมด (${allQuestions.length} ข้อ ครอบคลุม 8 ทักษะ) ขึ้นสู่ Firebase Firestore Collection "custom_questions" ใช่หรือไม่?`
    );
    if (!confirmed) return;

    setIsSeedingCloud(true);
    setSeedProgress({ current: 0, total: allQuestions.length });
    try {
      const res = await seedAllQuestionsToFirestore(allQuestions, (curr, tot) => {
        setSeedProgress({ current: curr, total: tot });
      });
      setLastSyncTime(storageService.getLastQuestionSyncTime());
      onQuestionsChange();
      showToast(res.message);
    } catch (err) {
      console.error('Seed cloud error:', err);
      showToast('เกิดข้อผิดพลาดในการสำรองข้อสอบขึ้นคลาวด์');
    } finally {
      setIsSeedingCloud(false);
      setSeedProgress(null);
    }
  };

  // Export questions to JSON
  const handleExportJSON = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allQuestions, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `kids_edugame_questions_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('ส่งออกไฟล์แบบทดสอบสำเร็จ 🎉');
    } catch {
      showToast('เกิดข้อผิดพลาดในการส่งออกไฟล์');
    }
  };

  // Import questions from JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser || !isAuthorized) {
      showToast('🔒 กรุณาลงชื่อเข้าใช้ด้วยบัญชีผู้ดูแลเพื่อนำเข้าข้อสอบ');
      return;
    }
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!Array.isArray(parsed)) {
          showToast('ไฟล์ JSON ไม่ถูกต้อง (ต้องเป็น Array ของคำถาม)');
          return;
        }

        const validQuestions: Question[] = [];
        for (const item of parsed) {
          if (item && item.id && item.question && item.options) {
            validQuestions.push({
              ...item,
              isCustom: true,
              updatedAt: new Date().toISOString(),
            });
          }
        }

        if (validQuestions.length === 0) {
          showToast('ไม่พบข้อมูลคำถามที่ถูกต้องในไฟล์');
          return;
        }

        const local = storageService.getCustomQuestions();
        const map = new Map<string, Question>();
        local.forEach((q) => map.set(q.id, q));
        validQuestions.forEach((q) => map.set(q.id, q));

        const merged = Array.from(map.values());
        storageService.saveCustomQuestions(merged);
        onQuestionsChange();
        showToast(`นำเข้าข้อสอบสำเร็จ ${validQuestions.length} ข้อ 🎉`);

        // Also push to Firestore
        syncHybridQuestionBank().catch(() => {});
      } catch {
        showToast('ไม่สามารถอ่านไฟล์ JSON ได้ กรุณาตรวจสอบรูปแบบ');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Download Sample CSV template
  const handleDownloadSampleCSV = () => {
    try {
      const sampleContent = generateSampleCSVTemplate();
      downloadCSV(sampleContent, 'sample_questions_template.csv');
      showToast('ดาวน์โหลดตัวอย่างไฟล์ CSV เรียบร้อยแล้ว (เปิดใน Excel ได้ทันที) 📥');
    } catch (err) {
      console.error('Download sample CSV error:', err);
      showToast('เกิดข้อผิดพลาดในการดาวน์โหลดตัวอย่าง CSV');
    }
  };

  // Export questions to CSV
  const handleExportCSV = () => {
    try {
      if (allQuestions.length === 0) {
        showToast('ไม่มีข้อสอบในระบบที่จะส่งออก');
        return;
      }
      const csvContent = exportQuestionsToCSV(allQuestions);
      const dateStr = new Date().toISOString().slice(0, 10);
      downloadCSV(csvContent, `questions_backup_${dateStr}.csv`);
      showToast(`ส่งออกข้อสอบทั้งหมด ${allQuestions.length} ข้อเป็นไฟล์ CSV สำเร็จ 🎉`);
    } catch (err) {
      console.error('Export CSV error:', err);
      showToast('เกิดข้อผิดพลาดในการส่งออกไฟล์ CSV');
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (confirm('คำเตือน: คุณต้องการคืนค่าแบบทดสอบทั้งหมดกลับเป็นค่าเริ่มต้นของระบบใช่หรือไม่? (ข้อสอบที่สร้างเองจะถูกลบ)')) {
      storageService.resetQuestionsToDefault();
      setLastSyncTime('');
      onQuestionsChange();
      showToast('คืนค่าแบบทดสอบเริ่มต้นสำเร็จแล้ว');
    }
  };

  // Ensure unique questions list by ID to prevent any duplicate key errors in React
  const uniqueQuestions = useMemo(() => {
    const map = new Map<string, Question>();
    for (const q of allQuestions) {
      if (q && q.id && !map.has(q.id)) {
        map.set(q.id, q);
      }
    }
    return Array.from(map.values());
  }, [allQuestions]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return uniqueQuestions.filter((q) => {
      if (filterGrade !== 'all' && q.grade !== filterGrade) return false;
      if (filterSubject !== 'all' && q.subject !== filterSubject) return false;
      if (filterSource === 'custom' && !q.isCustom) return false;
      if (filterSource === 'builtin' && q.isCustom) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const textTh = (q.question.th || '').toLowerCase();
        const textEn = (q.question.en || '').toLowerCase();
        const ill = (q.illustration || '').toLowerCase();
        return textTh.includes(query) || textEn.includes(query) || ill.includes(query);
      }
      return true;
    });
  }, [uniqueQuestions, filterGrade, filterSubject, filterSource, searchQuery]);

  // Skill definitions map
  const skillMap = useMemo(() => {
    const map = new Map<Subject, (typeof SKILLS_LIST)[0]>();
    SKILLS_LIST.forEach((s) => map.set(s.id, s));
    return map;
  }, []);

  // Summary counts
  const customCount = uniqueQuestions.filter((q) => q.isCustom).length;
  const k1Count = uniqueQuestions.filter((q) => q.grade === 'K1').length;
  const k2Count = uniqueQuestions.filter((q) => q.grade === 'K2').length;
  const k3Count = uniqueQuestions.filter((q) => q.grade === 'K3').length;

  // Pagination State (แสดงหน้าละ 10 ข้อ)
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filter or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterGrade, filterSubject, filterSource, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedQuestions = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * PAGE_SIZE;
    return filteredQuestions.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredQuestions, validCurrentPage]);

  // Auth Listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setCurrentUser(u);
      setAuthorizedEmailsList(getAuthorizedEmails());
    });
    return () => unsub();
  }, []);

  // Check if current user is authorized
  const isAuthorized = useMemo(() => {
    return isEmailAuthorized(currentUser?.email);
  }, [currentUser, authorizedEmailsList]);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const res = await googleSignIn();
      setCurrentUser(res.user);
      const authorized = isEmailAuthorized(res.user.email);
      if (!authorized) {
        setAuthError(`อีเมล ${res.user.email} ไม่ได้รับสิทธิ์จัดการแบบทดสอบ`);
      } else {
        showToast(`ยินดีต้อนรับ: ${res.user.email}`);
      }
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      if (errorObj?.code !== 'auth/popup-closed-by-user') {
        setAuthError('เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null);
      showToast('ออกจากระบบเรียบร้อยแล้ว');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Handle Add Authorized Email
  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;
    const res = addAuthorizedEmail(newAdminEmail.trim());
    if (res.success) {
      setAuthorizedEmailsList(getAuthorizedEmails());
      setNewAdminEmail('');
      setAdminActionStatus({ type: 'success', message: res.message });
      showToast(res.message);
    } else {
      setAdminActionStatus({ type: 'error', message: res.message });
    }
  };

  // Handle Remove Authorized Email
  const handleRemoveEmail = (emailToRemove: string) => {
    if (confirm(`คุณต้องการลบสิทธิ์การเข้าถึงของอีเมล ${emailToRemove} ใช่หรือไม่?`)) {
      const res = removeAuthorizedEmail(emailToRemove);
      if (res.success) {
        setAuthorizedEmailsList(getAuthorizedEmails());
        setAdminActionStatus({ type: 'success', message: res.message });
        showToast(res.message);
      } else {
        setAdminActionStatus({ type: 'error', message: res.message });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-question-manager"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn"
    >
      <div className={`bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border-4 ${currTheme.modalBorder} ring-2 ${currTheme.modalRing} overflow-hidden my-auto`}>
        {/* Modal Header */}
        <div className={`${currTheme.modalHeaderBg} p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-md transition-colors`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xs rounded-2xl flex items-center justify-center text-2xl border-2 border-white/30 shadow-inner">
              📝
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                <span>ระบบบริหารจัดการแบบทดสอบ ({currTheme.shortName})</span>
                <span className="bg-white/20 text-xs px-2.5 py-0.5 rounded-full border border-white/30 font-medium">
                  {allQuestions.length} ข้อ
                </span>
              </h2>
              <p className={`${currTheme.modalHeaderSubtext} text-xs sm:text-sm font-medium`}>
                เพิ่ม แก้ไข ลบ และปรับแต่งแบบทดสอบตามหลักสูตร {currTheme.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
            title="ปิดหน้าต่าง"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="bg-emerald-500 text-white px-4 py-2 text-sm font-bold flex items-center justify-between animate-fadeIn">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SECURITY GATE: SHOWN ONLY IF NOT AUTHORIZED AND NOT IN BROWSE MODE */}
        {!isAuthorized && !isBrowseMode ? (
          !currentUser ? (
            /* GATE 1: NOT SIGNED IN */
            <div className="p-6 sm:p-12 flex-1 flex flex-col items-center justify-center text-center overflow-y-auto">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center shadow-inner mb-5 border-2 border-amber-300">
                <Lock className="w-10 h-10 text-amber-600" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
                ระบบคลังข้อสอบแบบไฮบริด (Hybrid Question Bank)
              </h3>
              <p className="text-slate-600 text-sm max-w-md mb-6 leading-relaxed">
                จัดเก็บแบบทดสอบ 8 ทักษะหลักด้วยระบบแคชออฟไลน์ในเครื่องและซิงค์ Firebase Firestore อัตโนมัติ
              </p>

              <div className="w-full max-w-md bg-amber-50/90 border-2 border-amber-200 rounded-2xl p-4 mb-5 text-left shadow-2xs">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <p className="font-black text-amber-950 mb-1">
                      ระบบสิทธิ์ความปลอดภัยคลังข้อสอบ
                    </p>
                    <p>
                      สงวนสิทธิ์การแก้ไข/ลบข้อสอบเฉพาะบัญชีผู้ดูแลระบบที่ได้รับมอบหมายเท่านั้น เช่น{' '}
                      <strong className="font-mono text-amber-950 font-black bg-amber-200/70 px-1 py-0.5 rounded">
                        nusornon@gmail.com
                      </strong>
                    </p>
                  </div>
                </div>
              </div>

              {authError && (
                <div className="w-full max-w-md bg-rose-50 border-2 border-rose-200 text-rose-800 rounded-2xl p-3 mb-4 text-xs font-bold flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="w-full max-w-md flex flex-col gap-3">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isAuthenticating}
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 font-black py-3.5 px-6 rounded-2xl border-2 border-slate-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin text-amber-500" />
                      <span>กำลังเชื่อมต่อกับ Google...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span className="text-sm">ลงชื่อเข้าใช้ด้วย Google (สิทธิ์ผู้ดูแล)</span>
                    </>
                  )}
                </button>

                {/* Read-only Browse mode option */}
                <button
                  type="button"
                  onClick={() => setIsBrowseMode(true)}
                  className="w-full bg-amber-100/80 hover:bg-amber-100 text-amber-900 font-black py-3 px-4 rounded-2xl border-2 border-amber-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-98"
                >
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span className="text-xs sm:text-sm">เข้าชมคลังข้อสอบ 8 ทักษะ (โหมดอ่านอย่างเดียว) 👀</span>
                </button>
              </div>

              <div className="mt-6">
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-slate-800 text-xs font-medium underline cursor-pointer"
                >
                  กลับหน้าหลัก (ปิดหน้าต่าง)
                </button>
              </div>
            </div>
          ) : (
            /* GATE 2: SIGNED IN BUT NOT AUTHORIZED */
            <div className="p-6 sm:p-12 flex-1 flex flex-col items-center justify-center text-center overflow-y-auto">
              <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center shadow-inner mb-5 border-2 border-rose-300">
                <ShieldAlert className="w-10 h-10 text-rose-600" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
                ไม่มีสิทธิ์เข้าถึงการจัดการแบบทดสอบ
              </h3>
              <p className="text-slate-600 text-sm max-w-md mb-6">
                เฉพาะอีเมลที่กำหนดเท่านั้น จึงจะสามารถจัดการแบบทดสอบได้
              </p>

              <div className="w-full max-w-md bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 sm:p-5 mb-5 text-left shadow-2xs">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border-2 border-rose-300 object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-rose-200 text-rose-800 rounded-full flex items-center justify-center text-lg font-black shrink-0">
                      {currentUser.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black text-slate-800 truncate">
                      {currentUser.displayName || 'ผู้ใช้งาน Google'}
                    </p>
                    <p className="text-xs font-mono text-rose-700 truncate font-bold">
                      {currentUser.email}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-1 bg-rose-200 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-md">
                      <Lock className="w-3 h-3" /> สิทธิ์อ่านอย่างเดียว
                    </span>
                  </div>
                </div>

                <p className="text-xs text-rose-800 mt-3 pt-3 border-t border-rose-200 leading-relaxed">
                  ขออภัยครับ อีเมล <strong className="font-mono text-rose-950 font-bold">{currentUser.email}</strong> ไม่ได้อยู่ในรายชื่อผู้ดูแลระบบ แต่คุณสามารถเปิดดูคลังข้อสอบและสถิติในโหมดอ่านอย่างเดียวได้
                </p>
              </div>

              <div className="w-full max-w-md flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setIsBrowseMode(true)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-98"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>เปิดดูคลังข้อสอบ (โหมดอ่านอย่างเดียว) 👀</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isAuthenticating}
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>สลับบัญชี Google อื่น</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>ออกจากระบบ</span>
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-slate-800 text-xs font-medium underline cursor-pointer"
                >
                  กลับหน้าหลัก (ปิดหน้าต่าง)
                </button>
              </div>
            </div>
          )
        ) : (
          /* AUTHORIZED ADMIN OR BROWSE MODE VIEW */
          <>
            {/* Mode Notice Banner */}
            {!isAuthorized && (
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-4 py-2.5 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-sm shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏡</span>
                  <span>
                    <strong>โหมดผู้ปกครอง & คุณครู (Local Storage Mode):</strong> สามารถเพิ่มข้อสอบรูปภาพ/ข้อความ และจัดการ JSON ลงในเครื่องได้โดยตรง
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleGoogleSignIn();
                    }}
                    className="bg-white text-amber-900 hover:bg-amber-50 text-[11px] font-black px-3 py-1 rounded-lg cursor-pointer shadow-xs"
                  >
                    เข้าสู่ระบบ Google เพื่อซิงค์คลาวด์ ☁️
                  </button>
                </div>
              </div>
            )}
            {/* Navigation Tabs & Actions Bar */}
            <div className="bg-amber-50/70 border-b border-amber-100 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setActiveTab('list')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'list'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>คลังแบบทดสอบ ({filteredQuestions.length})</span>
                </button>
                <button
                  onClick={handleOpenAdd}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'add'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>{editingQuestion ? 'แก้ไขข้อสอบ' : 'สร้างข้อสอบใหม่'}</span>
                </button>
                <button
                  id="tab-btn-ai-suggester"
                  onClick={() => setActiveTab('ai_suggester')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'ai_suggester'
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-md'
                      : 'bg-white text-purple-900 hover:bg-purple-50 border border-purple-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI สร้างข้อสอบ (CBE)</span>
                  <span className="text-[10px] bg-amber-400 text-indigo-950 font-black px-1.5 py-0.2 rounded-full">
                    Gemini ✨
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('json')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'json'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
                  }`}
                  title="ดู แก้ไข คัดลอก และนำเข้าข้อมูล Local Storage JSON โดยตรง"
                >
                  <Database className="w-4 h-4" />
                  <span>Local Storage JSON</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">
                    💾
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'stats'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>สถิติทักษะ 8 ด้าน</span>
                </button>
                <button
                  onClick={() => setActiveTab('cloud')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'cloud'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
                  }`}
                >
                  <Cloud className="w-4 h-4" />
                  <span>คลังไฮบริด & คลาวด์</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">
                    ⚡☁️
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('admins')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'admins'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>สิทธิ์อีเมล ({authorizedEmailsList.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Admin or Viewer identity badge */}
                {currentUser ? (
                  <div className="flex items-center gap-1.5 bg-emerald-100/90 border border-emerald-300 px-2.5 py-1 rounded-xl shadow-2xs">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span
                      className="text-[11px] font-mono font-bold text-emerald-900 truncate max-w-[140px] sm:max-w-[180px]"
                      title={currentUser.email || ''}
                    >
                      {currentUser.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer p-0.5 ml-0.5 transition-colors"
                      title="ออกจากระบบ"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-amber-100/90 border border-amber-300 px-2.5 py-1 rounded-xl shadow-2xs">
                    <span className="text-xs">👀</span>
                    <span className="text-[11px] font-bold text-amber-900">
                      โหมดอ่านอย่างเดียว
                    </span>
                  </div>
                )}

                {onOpenExamSetBuilder && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenExamSetBuilder();
                    }}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                    title="เปิดระบบจัดชุดข้อสอบ (Quiz Sets) - Auto & Manual"
                  >
                    <span>📚</span>
                    <span>จัดชุดข้อสอบ (ครู)</span>
                  </button>
                )}

                <button
                  onClick={() => setIsCSVImportOpen(true)}
                  className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95 transition-all"
                  title="นำเข้าข้อสอบจากไฟล์ CSV (Excel / Google Sheets)"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>นำเข้า CSV</span>
                </button>
                <button
                  onClick={handleDownloadSampleCSV}
                  className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                  title="ดาวน์โหลดตัวอย่างไฟล์ CSV (sample_questions_template.csv)"
                >
                  <Download className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">ตัวอย่าง CSV</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-2.5 py-1.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                  title="ส่งออกข้อสอบทั้งหมดเป็นไฟล์ CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden md:inline">ส่งออก CSV</span>
                </button>
                <button
                  onClick={handleSyncCloudQuestions}
                  disabled={isCloudSyncing}
                  className="px-3 py-1.5 bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
                  title="ซิงค์แบบทดสอบแบบสองทิศทางกับ Firebase Firestore"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{isCloudSyncing ? 'กำลังซิงค์...' : 'ซิงค์ไฮบริด'}</span>
                </button>
                <button
                  onClick={handleExportJSON}
                  className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                  title="ส่งออกข้อสอบทั้งหมดเป็นไฟล์ JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">ส่งออก JSON</span>
                </button>
                <button
                  onClick={handleResetToDefault}
                  className="px-2.5 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                  title="คืนค่าแบบทดสอบเป็นค่าเริ่มต้น"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">คืนค่าเริ่มต้น</span>
                </button>
              </div>
            </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: LIST VIEW */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              {/* Cloud Seeding Progress Banner */}
              {isSeedingCloud && seedProgress && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-2xl shadow-md animate-pulse">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-black mb-2">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      กำลังสำรองข้อสอบทั้งหมดขึ้น Firebase Firestore Collection "custom_questions"...
                    </span>
                    <span>
                      {seedProgress.current} / {seedProgress.total} ข้อ ({Math.round((seedProgress.current / seedProgress.total) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden p-0.5 border border-white/20">
                    <div
                      className="bg-white h-full rounded-full transition-all duration-150"
                      style={{ width: `${Math.round((seedProgress.current / seedProgress.total) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Hybrid Question Bank Status Banner */}
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200 p-3.5 sm:p-4 rounded-2xl shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
                    ⚡
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black text-amber-950">
                        คลังข้อสอบระบบไฮบริด (Hybrid Local-First & Cloud)
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> ออนไลน์ & ซิงค์ได้
                      </span>
                    </div>
                    <p className="text-xs text-amber-800/90 mt-0.5">
                      รวมทั้งหมด <strong className="text-amber-950">{allQuestions.length} ข้อ</strong> (มาตรฐาน {allQuestions.length - customCount} ข้อ + กำหนดเอง {customCount} ข้อ) • ซิงค์ล่าสุด: {lastSyncTime ? new Date(lastSyncTime).toLocaleDateString('th-TH') + ' ' + new Date(lastSyncTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) : 'ยังไม่เคยซิงค์'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end flex-wrap">
                  <button
                    type="button"
                    id="btn-shortcut-ai-suggester"
                    onClick={() => setActiveTab('ai_suggester')}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
                    title="สร้างชุดข้อสอบประเมินสมรรถนะด้วย Gemini AI"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>AI สร้างข้อสอบ CBE ✨</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cloud')}
                    className="px-3 py-1.5 bg-amber-200/80 hover:bg-amber-200 text-amber-950 border border-amber-300 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-95"
                  >
                    <Cloud className="w-3.5 h-3.5 text-amber-800" />
                    <span>จัดการคลังไฮบริด ☁️</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSyncCloudQuestions}
                    disabled={isCloudSyncing}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin' : ''}`} />
                    <span>{isCloudSyncing ? 'กำลังซิงค์...' : 'ซิงค์ทันที'}</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                {/* Search Bar */}
                <div className="sm:col-span-4 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ค้นหาข้อความคำถาม หรือสัญลักษณ์..."
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Grade Filter */}
                <div className="sm:col-span-3">
                  <select
                    value={filterGrade}
                    onChange={(e) => setFilterGrade(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="all">ทุกระดับชั้น (อ.1 - ป.6)</option>
                    <optgroup label="ระดับปฐมวัย (Early Childhood)">
                      <option value="K1">อนุบาล 1 (3-4 ขวบ)</option>
                      <option value="K2">อนุบาล 2 (4-5 ขวบ)</option>
                      <option value="K3">อนุบาล 3 (5-6 ขวบ)</option>
                    </optgroup>
                    <optgroup label="ระดับประถมศึกษา (Primary P1 - P6)">
                      <option value="P1">ประถมศึกษาปีที่ 1 (ป.1)</option>
                      <option value="P2">ประถมศึกษาปีที่ 2 (ป.2)</option>
                      <option value="P3">ประถมศึกษาปีที่ 3 (ป.3)</option>
                      <option value="P4">ประถมศึกษาปีที่ 4 (ป.4)</option>
                      <option value="P5">ประถมศึกษาปีที่ 5 (ป.5)</option>
                      <option value="P6">ประถมศึกษาปีที่ 6 (ป.6)</option>
                    </optgroup>
                  </select>
                </div>

                {/* Subject Filter */}
                <div className="sm:col-span-3">
                  <select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="all">ทุกทักษะและหน่วยการเรียนรู้</option>
                    <optgroup label="หลักสูตรที่ ๑: 8 ทักษะพัฒนาการปฐมวัย">
                      <option value="literacy">1. ภาษาและการรู้หนังสือ</option>
                      <option value="math">2. การคิดรวบยอดและคำนวณ</option>
                      <option value="problem_solving">3. การคิดแก้ปัญหาและตัดสินใจ</option>
                      <option value="inquiry">4. การแสวงหาความรู้</option>
                      <option value="creativity">5. จินตนาการและความคิดสร้างสรรค์</option>
                      <option value="physical_health">6. สุขภาวะทางกายและการเคลื่อนไหว</option>
                      <option value="socio_emotional">7. อารมณ์ จิตใจ และสังคม</option>
                      <option value="citizenship">8. ความเป็นพลเมืองและคุณธรรม</option>
                    </optgroup>
                    <optgroup label="หลักสูตรที่ ๓: 10 หน่วยแจกลูกสะกดคำ สพฐ. (ป.1 - ป.6)">
                      <option value="phonics_consonant">หน่วย ๑: รูปและเสียงพยัญชนะ</option>
                      <option value="phonics_vowel">หน่วย ๒: รูปและเสียงสระ</option>
                      <option value="phonics_tone">หน่วย ๓: รูปและเสียงวรรณยุกต์</option>
                      <option value="phonics_korkaa">หน่วย ๔: แจกลูกสะกดคำแม่ ก กา</option>
                      <option value="phonics_tone_korkaa">หน่วย ๕: ผันวรรณยุกต์แม่ ก กา</option>
                      <option value="phonics_direct_spelling">หน่วย ๖: ตัวสะกดตรงตามมาตรา</option>
                      <option value="phonics_tone_spelling">หน่วย ๗: ผันวรรณยุกต์ตรงตามมาตรา</option>
                      <option value="phonics_indirect_spelling">หน่วย ๘: ตัวสะกดไม่ตรงตามมาตรา</option>
                      <option value="phonics_cluster">หน่วย ๙: แจกลูกคำที่มีอักษรควบ</option>
                      <option value="phonics_leading_consonant">หน่วย ๑๐: แจกลูกคำที่มีอักษรนำ</option>
                    </optgroup>
                    <optgroup label="หลักสูตรที่ ๒: 6 สมรรถนะประถมศึกษา (CBE Primary)">
                      <option value="self_management">1. การจัดการตนเอง</option>
                      <option value="higher_order_thinking">2. การคิดขั้นสูง</option>
                      <option value="communication">3. การสื่อสาร</option>
                      <option value="teamwork_collaboration">4. การรวมพลังทำงานเป็นทีม</option>
                      <option value="active_citizenship">5. การเป็นพลเมืองที่เข้มแข็ง</option>
                      <option value="sustainable_living">6. การอยู่ร่วมกับธรรมชาติ</option>
                    </optgroup>
                  </select>
                </div>

                {/* Custom / Built-in Filter */}
                <div className="sm:col-span-2">
                  <select
                    value={filterSource}
                    onChange={(e) => setFilterSource(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="custom">สร้างเอง ({customCount})</option>
                    <option value="builtin">แบบมาตรฐาน</option>
                  </select>
                </div>
              </div>

              {/* Questions List Header & Pagination Bar (Top) */}
              {filteredQuestions.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-slate-50 px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">
                      แสดงข้อที่ <strong className="text-amber-700">{(validCurrentPage - 1) * PAGE_SIZE + 1}</strong> ถึง{' '}
                      <strong className="text-amber-700">
                        {Math.min(validCurrentPage * PAGE_SIZE, filteredQuestions.length)}
                      </strong>{' '}
                      จากทั้งหมด <strong className="text-slate-900">{filteredQuestions.length}</strong> ข้อ
                    </span>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-md border border-amber-200">
                      หน้าละ 10 ข้อ
                    </span>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500 font-medium mr-1 hidden sm:inline">
                        หน้า {validCurrentPage} / {totalPages}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentPage(1)}
                        disabled={validCurrentPage === 1}
                        className="p-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                        title="หน้าแรก"
                      >
                        <ChevronsLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={validCurrentPage === 1}
                        className="p-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                        title="หน้าก่อนหน้า"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={validCurrentPage === totalPages}
                        className="p-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                        title="หน้าถัดไป"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={validCurrentPage === totalPages}
                        className="p-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                        title="หน้าสุดท้าย"
                      >
                        <ChevronsRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Questions List */}
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <p className="text-4xl mb-2">🔍</p>
                  <p className="text-base font-bold text-slate-700">ไม่พบแบบทดสอบที่ตรงกับเงื่อนไขการค้นหา</p>
                  <p className="text-xs text-slate-500 mt-1">ลองเปลี่ยนตัวกรอง หรือคลิก "สร้างข้อสอบใหม่" เพื่อเพิ่มข้อสอบ</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {paginatedQuestions.map((q, idx) => {
                    const globalIdx = (validCurrentPage - 1) * PAGE_SIZE + idx + 1;
                    const skill = skillMap.get(q.subject);
                    return (
                      <div
                        key={`${q.id}_${idx}`}
                        className="bg-white p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                      >
                        {/* Left: Illustration & Basic Info */}
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex flex-col items-center gap-1 shrink-0">
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl overflow-hidden p-1">
                              {isImageUrl(q.illustration) ? (
                                <img
                                  src={q.illustration}
                                  alt="Illustration"
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                q.illustration
                              )}
                            </div>
                            <span className="text-[10px] font-black text-slate-400">
                              #{globalIdx}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                                  q.grade === 'K1'
                                    ? 'bg-rose-100 text-rose-700'
                                    : q.grade === 'K2'
                                    ? 'bg-sky-100 text-sky-700'
                                    : 'bg-emerald-100 text-emerald-700'
                                }`}
                              >
                                {q.grade === 'K1' ? 'อ.1 (3-4 ขวบ)' : q.grade === 'K2' ? 'อ.2 (4-5 ขวบ)' : 'อ.3 (5-6 ขวบ)'}
                              </span>

                              {skill && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${skill.badgeBg} ${skill.badgeText} border ${skill.badgeBorder}`}>
                                  {skill.icon} {skill.shortName.th}
                                </span>
                              )}

                              <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                ระดับ {'⭐'.repeat(q.difficulty)}
                              </span>

                              {q.isCustom && (
                                <span className="text-[10px] font-black bg-amber-500 text-white px-2 py-0.5 rounded-md shadow-xs">
                                  ✨ คุณครูสร้างเอง
                                </span>
                              )}
                            </div>

                            {/* Question Thai Text */}
                            <h4 className="text-sm sm:text-base font-black text-slate-800 line-clamp-2">
                              {q.question.th}
                            </h4>

                            {/* Options Preview */}
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              {q.options.map((opt, optIdx) => {
                                const isCorrect = opt.id === q.correctOptionId;
                                return (
                                  <div
                                    key={`${q.id}_opt_${opt.id || optIdx}`}
                                    className={`text-xs px-2.5 py-1 rounded-xl flex items-center gap-1 border ${
                                      isCorrect
                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-black'
                                        : 'bg-slate-50 border-slate-200 text-slate-600'
                                    }`}
                                  >
                                    {isCorrect && <Check className="w-3 h-3 text-emerald-600 shrink-0" />}
                                    {opt.icon && (
                                      isImageUrl(opt.icon) ? (
                                        <img
                                          src={opt.icon}
                                          alt=""
                                          className="w-4 h-4 object-cover rounded-md shrink-0 inline-block"
                                        />
                                      ) : (
                                        <span>{opt.icon}</span>
                                      )
                                    )}
                                    <span>{opt.label.th}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => handleStartEdit(q)}
                            className="p-2 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 rounded-xl transition-colors cursor-pointer"
                            title="แก้ไขข้อสอบนี้"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(q)}
                            className="p-2 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-xl transition-colors cursor-pointer"
                            title="ลบข้อสอบนี้"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bottom Pagination Bar */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50/60 p-3 rounded-2xl border border-amber-200 text-xs text-slate-700 mt-2">
                  <div className="text-slate-600 font-medium">
                    หน้า <strong>{validCurrentPage}</strong> จากทั้งหมด <strong>{totalPages}</strong> หน้า (แสดงหน้าละ 10 ข้อ)
                  </div>

                  <div className="flex items-center gap-1 flex-wrap justify-center">
                    <button
                      type="button"
                      onClick={() => setCurrentPage(1)}
                      disabled={validCurrentPage === 1}
                      className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                      title="หน้าแรก"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={validCurrentPage === 1}
                      className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                      title="หน้าก่อนหน้า"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page Numbers with Smart Ellipsis */}
                    <div className="flex items-center gap-1 mx-1">
                      {(() => {
                        const pages: (number | string)[] = [];
                        if (totalPages <= 7) {
                          for (let i = 1; i <= totalPages; i++) pages.push(i);
                        } else {
                          pages.push(1);
                          if (validCurrentPage > 3) pages.push('...');
                          const start = Math.max(2, validCurrentPage - 1);
                          const end = Math.min(totalPages - 1, validCurrentPage + 1);
                          for (let i = start; i <= end; i++) pages.push(i);
                          if (validCurrentPage < totalPages - 2) pages.push('...');
                          pages.push(totalPages);
                        }

                        return pages.map((page, pIdx) => {
                          if (page === '...') {
                            return (
                              <span key={`dots-${pIdx}`} className="px-1 text-slate-400 font-bold">
                                ...
                              </span>
                            );
                          }
                          const isCurrent = page === validCurrentPage;
                          return (
                            <button
                              key={`p-${page}`}
                              type="button"
                              onClick={() => setCurrentPage(Number(page))}
                              className={`min-w-7 h-7 px-2 text-xs font-black rounded-lg transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-amber-500 text-white shadow-xs'
                                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-100/50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        });
                      })()}
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={validCurrentPage === totalPages}
                      className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                      title="หน้าถัดไป"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={validCurrentPage === totalPages}
                      className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                      title="หน้าสุดท้าย"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADD / EDIT FORM (PARENT & TEACHER EMPOWERED) */}
          {activeTab === 'add' && (
            <ParentQuestionEditor
              editingQuestion={editingQuestion}
              onSaved={(_savedQ) => {
                onQuestionsChange();
                setEditingQuestion(null);
                setActiveTab('list');
              }}
              onCancel={() => {
                setEditingQuestion(null);
                setActiveTab('list');
              }}
              onViewJSON={() => setActiveTab('json')}
              showToast={showToast}
            />
          )}

          {/* TAB: LOCAL STORAGE JSON VIEWER & RAW EDITOR */}
          {activeTab === 'json' && (
            <LocalStorageJSONViewer
              onQuestionsChange={onQuestionsChange}
              showToast={showToast}
              onNavigateToAdd={() => {
                setEditingQuestion(null);
                setActiveTab('add');
              }}
            />
          )}

          {/* TAB 3: STATS & OVERVIEW */}
          {activeTab === 'stats' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-center">
                  <p className="text-xs font-bold text-amber-700">ข้อสอบทั้งหมด</p>
                  <p className="text-3xl font-black text-amber-900 mt-1">{allQuestions.length}</p>
                  <p className="text-[11px] text-amber-600 mt-0.5">ในระบบขณะนี้</p>
                </div>
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-center">
                  <p className="text-xs font-bold text-rose-700">อนุบาล 1 (K1)</p>
                  <p className="text-3xl font-black text-rose-900 mt-1">{k1Count}</p>
                  <p className="text-[11px] text-rose-600 mt-0.5">3-4 ขวบ</p>
                </div>
                <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl text-center">
                  <p className="text-xs font-bold text-sky-700">อนุบาล 2 (K2)</p>
                  <p className="text-3xl font-black text-sky-900 mt-1">{k2Count}</p>
                  <p className="text-[11px] text-sky-600 mt-0.5">4-5 ขวบ</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center">
                  <p className="text-xs font-bold text-emerald-700">อนุบาล 3 (K3)</p>
                  <p className="text-3xl font-black text-emerald-900 mt-1">{k3Count}</p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">5-6 ขวบ</p>
                </div>
              </div>

              {/* Skills breakdown table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-black text-sm text-slate-800">
                  สัดส่วนข้อสอบจำแนกตามทักษะหลัก 8 ด้าน
                </div>
                <div className="divide-y divide-slate-100">
                  {SKILLS_LIST.map((skill) => {
                    const count = allQuestions.filter((q) => q.subject === skill.id).length;
                    const percent = Math.round((count / (allQuestions.length || 1)) * 100);
                    return (
                      <div key={skill.id} className="p-3.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{skill.icon}</span>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{skill.name.th}</p>
                            <p className="text-xs text-slate-500">{skill.skillsFocus.slice(0, 2).join(', ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <div className="w-24 bg-slate-100 rounded-full h-2.5 overflow-hidden hidden sm:block">
                            <div
                              className="bg-amber-500 h-full rounded-full"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="text-sm font-black text-slate-700 min-w-[50px]">
                            {count} ข้อ ({percent}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB: HYBRID QUESTION BANK & CLOUD ARCHITECTURE */}
          {activeTab === 'cloud' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Architecture Banner */}
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-white/20 text-white text-xs font-black px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> ระบบไฮบริด (Hybrid Architecture)
                    </span>
                    <span className="bg-white/20 text-white text-xs font-black px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Cloud className="w-3.5 h-3.5" /> Firebase Firestore
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black mb-1.5">
                    ระบบคลังข้อสอบแบบไฮบริด (Hybrid Question Bank)
                  </h3>
                  <p className="text-amber-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    ออกแบบด้วยแนวคิด Local-First แคชข้อสอบในเครื่องเพื่อความรวดเร็วและเล่นออฟไลน์ได้ 100% พร้อมเชื่อมต่อ Firebase Firestore เพื่อให้คุณครูและผู้ปกครองสามารถอัปเดตหรือเพิ่มข้อสอบใหม่จากระยะไกลได้ทันทีโดยไม่ต้องติดตั้งหรืออัปเดตแอปใหม่
                  </p>
                </div>
              </div>

              {/* Seeding Progress Bar */}
              {isSeedingCloud && seedProgress && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-2xl shadow-md animate-pulse">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-black mb-2">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      กำลังสำรองข้อสอบทั้งหมดขึ้น Firestore...
                    </span>
                    <span>
                      {seedProgress.current} / {seedProgress.total} ข้อ ({Math.round((seedProgress.current / seedProgress.total) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden p-0.5 border border-white/20">
                    <div
                      className="bg-white h-full rounded-full transition-all duration-150"
                      style={{ width: `${Math.round((seedProgress.current / seedProgress.total) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* 3 Core Architecture Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-amber-200 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl mb-3">
                    ⚡
                  </div>
                  <h4 className="text-sm font-black text-slate-800 mb-1">
                    1. Local-First (เล่นออฟไลน์ได้ 100%)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ข้อสอบหลัก 8 ทักษะถูกบันทึกและแคชไว้ในเครื่อง โหลดเกมได้ทันทีแบบไม่มีความหน่วง แม้ไม่มีสัญญาณอินเทอร์เน็ตก็เล่นได้ลื่นไหล
                  </p>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-sky-200 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-xl mb-3">
                    ☁️
                  </div>
                  <h4 className="text-sm font-black text-slate-800 mb-1">
                    2. Cloud Firestore (อัปเดตจากระยะไกล)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    จัดเก็บคลังข้อสอบบนคลาวด์ Firestore คุณครูสามารถเพิ่มข้อสอบใหม่หรือปรับปรุงข้อสอบเดิมได้จากอุปกรณ์ใดก็ได้
                  </p>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-emerald-200 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl mb-3">
                    🔄
                  </div>
                  <h4 className="text-sm font-black text-slate-800 mb-1">
                    3. Smart Merge & Auto Sync
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ระบบซิงค์สองทิศทางอัจฉริยะ เปรียบเทียบเวลาอัปเดตล่าสุด (Timestamp) เพื่อผสานข้อสอบใหม่เข้ากับแคชในเครื่องโดยอัตโนมัติ
                  </p>
                </div>
              </div>

              {/* Status and Metrics Overview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
                <h4 className="text-sm font-black text-slate-800 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-500" />
                  สถานะคลังข้อสอบและฐานข้อมูลปัจจุบัน
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                    <p className="text-[11px] font-bold text-slate-500">ข้อสอบในแคชเครื่อง</p>
                    <p className="text-2xl font-black text-slate-800 mt-0.5">{allQuestions.length} ข้อ</p>
                    <p className="text-[10px] text-slate-400">พร้อมเล่นทันที</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                    <p className="text-[11px] font-bold text-amber-700">ข้อสอบที่คุณครูสร้าง</p>
                    <p className="text-2xl font-black text-amber-900 mt-0.5">{customCount} ข้อ</p>
                    <p className="text-[10px] text-amber-600">พร้อมส่งขึ้นคลาวด์</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                    <p className="text-[11px] font-bold text-emerald-700">ข้อสอบมาตรฐาน</p>
                    <p className="text-2xl font-black text-emerald-900 mt-0.5">{allQuestions.length - customCount} ข้อ</p>
                    <p className="text-[10px] text-emerald-600">8 ทักษะครอบคลุม</p>
                  </div>
                  <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl">
                    <p className="text-[11px] font-bold text-sky-700">ซิงค์ล่าสุด</p>
                    <p className="text-xs font-black text-sky-900 mt-2 truncate" title={lastSyncTime || 'ยังไม่เคยซิงค์'}>
                      {lastSyncTime
                        ? new Date(lastSyncTime).toLocaleDateString('th-TH') + ' ' + new Date(lastSyncTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
                        : 'ยังไม่เคยซิงค์'}
                    </p>
                    <p className="text-[10px] text-sky-600 mt-0.5">Firebase Firestore</p>
                  </div>
                </div>
              </div>

              {/* Action Control Panel */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                <h4 className="text-sm font-black text-slate-800 mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4 text-amber-600" />
                  คำสั่งจัดการระบบคลาวด์และการสำรองข้อมูล
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Action 1: Hybrid Sync */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 font-black text-xs text-slate-800">
                        <RefreshCw className="w-4 h-4 text-sky-500" />
                        <span>ซิงค์สองทิศทาง (Bidirectional Sync)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        ดึงข้อสอบใหม่จาก Firestore เข้ามาในเครื่อง พร้อมอัปโหลดข้อสอบที่คุณครูเพิ่มไว้ขึ้นสู่คลาวด์
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSyncCloudQuestions}
                      disabled={isCloudSyncing}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-black py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-98 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin' : ''}`} />
                      <span>{isCloudSyncing ? 'กำลังซิงค์ข้อมูล...' : 'เริ่มซิงค์คลาวด์ทันที'}</span>
                    </button>
                  </div>

                  {/* Action 2: Seed All Questions to Firestore */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 font-black text-xs text-slate-800">
                        <CloudUpload className="w-4 h-4 text-amber-500" />
                        <span>สำรองข้อสอบทั้งหมดขึ้นคลาวด์ (Seed to Cloud)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        อัปโหลดคลังข้อสอบทั้งหมดทั้ง {allQuestions.length} ข้อขึ้นสู่ Firestore Collection "custom_questions"
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSeedAllToCloud}
                      disabled={isSeedingCloud || isCloudSyncing}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-black py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-98 disabled:opacity-50"
                    >
                      <CloudUpload className="w-3.5 h-3.5" />
                      <span>{isSeedingCloud ? 'กำลังอัปโหลด...' : 'สำรองข้อสอบทั้งหมดขึ้นคลาวด์'}</span>
                    </button>
                  </div>

                  {/* Action 3: Export JSON */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 font-black text-xs text-slate-800">
                        <Download className="w-4 h-4 text-emerald-500" />
                        <span>ส่งออกไฟล์สำรอง (Export JSON)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        ดาวน์โหลดไฟล์ .json ของคลังข้อสอบทั้งหมดเพื่อเก็บไว้เป็นไฟล์สำรองในเครื่องคอมพิวเตอร์
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleExportJSON}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-98"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลดไฟล์ JSON</span>
                    </button>
                  </div>

                  {/* Action 4: Import JSON */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 font-black text-xs text-slate-800">
                        <Upload className="w-4 h-4 text-purple-500" />
                        <span>นำเข้าแบบทดสอบ (Import JSON)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        นำเข้าชุดข้อสอบจากไฟล์ .json เข้าสู่คลังข้อสอบของแอปพลิเคชัน
                      </p>
                    </div>
                    <label className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs font-black py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-98 text-center">
                      <Upload className="w-3.5 h-3.5" />
                      <span>เลือกไฟล์ JSON เพื่อนำเข้า</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportJSON}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Action 5: Import CSV */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3.5 rounded-xl border-2 border-emerald-300 flex flex-col justify-between gap-3 shadow-xs">
                    <div>
                      <div className="flex items-center gap-2 font-black text-xs text-emerald-900">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <span>นำเข้าข้อสอบจากไฟล์ CSV (Bulk Import)</span>
                      </div>
                      <p className="text-[11px] text-emerald-800/80 mt-1 leading-relaxed">
                        นำเข้าข้อสอบจำนวนมากจากไฟล์ Excel หรือ Google Sheets พร้อมระบบพรีวิวก่อนบันทึก
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCSVImportOpen(true)}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-98"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>เปิดระบบนำเข้าไฟล์ CSV 📄</span>
                    </button>
                  </div>

                  {/* Action 6: Download CSV Template */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 font-black text-xs text-slate-800">
                        <Download className="w-4 h-4 text-amber-500" />
                        <span>ดาวน์โหลดตัวอย่างไฟล์ CSV (Template)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        ดาวน์โหลดไฟล์ตัวอย่างที่มีคอลัมน์มาตรฐานพร้อมคำอธิบายเพื่อนำไปกรอกข้อสอบใน Excel
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadSampleCSV}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-black py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-98"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลดตัวอย่าง CSV (UTF-8)</span>
                    </button>
                  </div>

                  {/* Action 7: Export CSV */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 font-black text-xs text-slate-800">
                        <FileSpreadsheet className="w-4 h-4 text-sky-500" />
                        <span>ส่งออกเป็นไฟล์ CSV (Export CSV)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        ส่งออกข้อสอบทั้งหมดทั้ง {allQuestions.length} ข้อในรูปแบบตาราง CSV เพื่อนำไปเปิดแก้ไขใน Excel
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-black py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-98"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลดไฟล์ CSV ทั้งหมด</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AUTHORIZED ADMIN EMAILS MANAGEMENT */}
          {activeTab === 'admins' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header banner */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0">
                    👥
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
                      <span>จัดการสิทธิ์อีเมลผู้ดูแลคลังแบบทดสอบ</span>
                      <span className="bg-amber-200 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-bold">
                        {authorizedEmailsList.length} บัญชี
                      </span>
                    </h3>
                    <p className="text-xs text-amber-800 mt-0.5">
                      เฉพาะบัญชีอีเมลที่กำหนดในหน้านี้เท่านั้น จึงจะสามารถเข้าถึงระบบบริหารจัดการข้อสอบ (เพิ่ม/แก้ไข/ลบ) ได้
                    </p>
                  </div>
                </div>
              </div>

              {adminActionStatus && (
                <div
                  className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-between ${
                    adminActionStatus.type === 'success'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-rose-50 border-rose-300 text-rose-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {adminActionStatus.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{adminActionStatus.message}</span>
                  </div>
                  <button
                    onClick={() => setAdminActionStatus(null)}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Form: Add new authorized email */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
                <h4 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-600" />
                  <span>เพิ่มอีเมลผู้ดูแลหรือคุณครูคนใหม่</span>
                </h4>
                <form onSubmit={handleAddEmail} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      placeholder="ระบุอีเมล Google ของคุณครู เช่น teacher@gmail.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none font-mono"
                      required
                    />
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 active:scale-98"
                  >
                    <Plus className="w-4 h-4" />
                    <span>เพิ่มสิทธิ์</span>
                  </button>
                </form>
                <p className="text-[11px] text-slate-500 mt-2">
                  * ผู้ที่ได้รับสิทธิ์จะต้องลงชื่อเข้าใช้ด้วยบัญชี Google ตรงกับอีเมลที่ระบุ จึงจะสามารถเข้าถึงได้
                </p>
              </div>

              {/* Authorized Emails List */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-black text-sm text-slate-800 flex items-center justify-between">
                  <span>รายชื่ออีเมลที่ได้รับอนุญาตให้จัดการแบบทดสอบ</span>
                  <span className="text-xs font-normal text-slate-500">
                    ทั้งหมด {authorizedEmailsList.length} อีเมล
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {authorizedEmailsList.map((email) => {
                    const isPrimary = DEFAULT_AUTHORIZED_EMAILS.some(
                      (d) => d.toLowerCase().trim() === email.toLowerCase().trim()
                    );
                    const isCurrentSession = currentUser?.email?.toLowerCase().trim() === email.toLowerCase().trim();

                    return (
                      <div
                        key={email}
                        className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                              isPrimary
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {isPrimary ? '👑' : '👤'}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 truncate">
                                {email}
                              </span>
                              {isPrimary && (
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300">
                                  ⭐ ผู้ดูแลหลัก (Primary Admin)
                                </span>
                              )}
                              {isCurrentSession && (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-300">
                                  คุณ (กำลังใช้งาน)
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {isPrimary ? 'กำหนดโดยระบบ ไม่สามารถลบได้' : 'ได้รับอนุญาตให้เพิ่ม แก้ไข และลบแบบทดสอบ'}
                            </p>
                          </div>
                        </div>

                        {!isPrimary && (
                          <button
                            onClick={() => handleRemoveEmail(email)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title={`ลบสิทธิ์ของ ${email}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB: AI-POWERED CBE QUESTION SUGGESTER (GEMINI 3.8 FLASH) */}
          {activeTab === 'ai_suggester' && (
            <AIQuestionSuggesterPanel
              onQuestionsSaved={() => {
                onQuestionsChange();
                showToast('บันทึกคำถามประเมินสมรรถนะสู่คลังข้อสอบเรียบร้อยแล้ว! 🎉');
              }}
              onOpenExamSetBuilder={onOpenExamSetBuilder}
              onViewQuestionBank={() => setActiveTab('list')}
              onPlayExamSet={(examSet) => {
                if (onPlayExamSet) {
                  onClose();
                  onPlayExamSet(examSet);
                }
              }}
            />
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>ข้อสอบทั้งหมดจะถูกบันทึกในเครื่องและซิงค์ไปยัง Firebase Cloud อัตโนมัติ</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors cursor-pointer"
          >
            ปิด
          </button>
        </div>

        {/* CSV Import Modal */}
        <CSVImportModal
          isOpen={isCSVImportOpen}
          onClose={() => setIsCSVImportOpen(false)}
          onSuccess={(count) => {
            onQuestionsChange();
            showToast(`นำเข้าข้อสอบจากไฟล์ CSV สำเร็จเรียบร้อย ${count} ข้อ 🎉`);
          }}
          isAuthorized={isAuthorized}
        />
      </>
    )}
      </div>
    </div>
  );
};
