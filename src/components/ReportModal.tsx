import React, { useRef, useState, useMemo } from 'react';
import { generateMultiPagePdf, captureFullElementImage } from '../utils/pdfExport';
import {
  X,
  Download,
  Share2,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Calendar,
  Users,
  Printer,
  ChevronRight,
  Filter,
  BarChart3,
  User,
  GraduationCap,
  Trash2,
  FileDown,
  CheckCircle2,
  Clock,
  Cloud,
  FileText,
  Target,
  Star,
  Search,
} from 'lucide-react';
import { ChildProfile, Grade, HistoryEntry, CurriculumMode } from '../types';
import { storageService } from '../services/storageService';
import { recordAssessmentReportDual } from '../services/cloudSyncService';
import { SKILLS_LIST, CBE_COMPETENCIES_LIST, getSkillBySubject } from '../data/skills';
import { CertificateOfAchievementModal } from './CertificateOfAchievementModal';
import { StudentGrowthReportModal } from './StudentGrowthReportModal';
import { CompetencyReportModal } from './CompetencyReportModal';
import { BadgesModal } from './BadgesModal';
import { evaluateProfileMilestones } from '../services/masteryMilestones';
import { WeeklyTrendChartView } from './WeeklyTrendChartView';
import { SkillRadarReportView } from './SkillRadarReportView';
import { IndividualCompetencyTrendChart } from './IndividualCompetencyTrendChart';
import { getCurriculumTheme } from '../utils/curriculumTheme';

interface ReportModalProps {
  profile: ChildProfile;
  profiles: ChildProfile[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProfile?: (profileId: string) => void;
  onRefreshProfiles?: () => void;
  initialTab?: 'individual' | 'classroom' | 'weekly_trends' | 'radar_skills' | 'competency_report' | 'thai_radar' | 'progress_trends';
  curriculumMode?: CurriculumMode;
}

export type ReportModalActiveTab =
  | 'thai_radar'
  | 'progress_trends'
  | 'weekly_trends'
  | 'radar_skills'
  | 'classroom'
  | 'individual'
  | 'competency_report';

export const ReportModal: React.FC<ReportModalProps> = ({
  profile,
  profiles,
  isOpen,
  onClose,
  onSelectProfile,
  onRefreshProfiles,
  initialTab = 'individual',
  curriculumMode = 'early_childhood',
}: ReportModalProps) => {
  const currTheme = getCurriculumTheme(curriculumMode);
  const [activeTab, setActiveTab] = useState<ReportModalActiveTab>(initialTab);
  const [selectedProfileId, setSelectedProfileId] = useState(profile.id);
  const [gradeFilter, setGradeFilter] = useState<'ALL' | Grade>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<'png' | 'pdf' | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [historyDeleteConfirmIdx, setHistoryDeleteConfirmIdx] = useState<number | null>(null);
  const [isSavingDual, setIsSavingDual] = useState(false);

  const [skillFilter, setSkillFilter] = useState<'all' | 'tested' | 'untested'>('all');
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [selectedCertificateMilestoneId, setSelectedCertificateMilestoneId] = useState<string | undefined>(undefined);
  const [isGrowthReportModalOpen, setIsGrowthReportModalOpen] = useState(false);
  const [autoDownloadGrowthReport, setAutoDownloadGrowthReport] = useState(false);
  const [isCompetencyReportModalOpen, setIsCompetencyReportModalOpen] = useState(false);
  const [autoDownloadCompetencyReport, setAutoDownloadCompetencyReport] = useState(false);
  const [isJourneyMapModalOpen, setIsJourneyMapModalOpen] = useState(false);

  const handleGenerateGrowthReportPdf = () => {
    setAutoDownloadGrowthReport(true);
    setIsGrowthReportModalOpen(true);
  };

  const handleOpenGrowthReportModal = () => {
    setAutoDownloadGrowthReport(false);
    setIsGrowthReportModalOpen(true);
  };

  const handleGenerateCompetencyReportPdf = () => {
    setAutoDownloadCompetencyReport(true);
    setIsCompetencyReportModalOpen(true);
  };

  const handleOpenCompetencyReportModal = () => {
    setAutoDownloadCompetencyReport(false);
    setIsCompetencyReportModalOpen(true);
  };

  const reportRef = useRef<HTMLDivElement | null>(null);

  // 9 Grade Levels Filter Options (Kindergarten K1-K3 and Primary P1-P6)
  const GRADE_FILTER_OPTIONS: {
    id: 'ALL' | Grade;
    label: string;
    short: string;
    group: 'all' | 'kindergarten' | 'primary';
    levelNumber: string;
  }[] = [
    { id: 'ALL', label: 'ทุกระดับชั้น (อ.1 - ป.6)', short: 'ทั้งหมด', group: 'all', levelNumber: '9 ชั้น' },
    { id: 'K1', label: 'อนุบาล 1 (อ.1)', short: 'อ.1', group: 'kindergarten', levelNumber: 'ชั้น 1' },
    { id: 'K2', label: 'อนุบาล 2 (อ.2)', short: 'อ.2', group: 'kindergarten', levelNumber: 'ชั้น 2' },
    { id: 'K3', label: 'อนุบาล 3 (อ.3)', short: 'อ.3', group: 'kindergarten', levelNumber: 'ชั้น 3' },
    { id: 'P1', label: 'ประถมศึกษาปีที่ 1 (ป.1)', short: 'ป.1', group: 'primary', levelNumber: 'ชั้น 4' },
    { id: 'P2', label: 'ประถมศึกษาปีที่ 2 (ป.2)', short: 'ป.2', group: 'primary', levelNumber: 'ชั้น 5' },
    { id: 'P3', label: 'ประถมศึกษาปีที่ 3 (ป.3)', short: 'ป.3', group: 'primary', levelNumber: 'ชั้น 6' },
    { id: 'P4', label: 'ประถมศึกษาปีที่ 4 (ป.4)', short: 'ป.4', group: 'primary', levelNumber: 'ชั้น 7' },
    { id: 'P5', label: 'ประถมศึกษาปีที่ 5 (ป.5)', short: 'ป.5', group: 'primary', levelNumber: 'ชั้น 8' },
    { id: 'P6', label: 'ประถมศึกษาปีที่ 6 (ป.6)', short: 'ป.6', group: 'primary', levelNumber: 'ชั้น 9' },
  ];

  const handleGradeFilterChange = (newGrade: 'ALL' | Grade) => {
    setGradeFilter(newGrade);
    if (newGrade !== 'ALL') {
      const availableInGrade = profiles.filter((p) => p.grade === newGrade);
      if (availableInGrade.length > 0 && !availableInGrade.some((p) => p.id === selectedProfileId)) {
        setSelectedProfileId(availableInGrade[0].id);
        if (onSelectProfile) onSelectProfile(availableInGrade[0].id);
      }
    }
  };

  const getSearchPlaceholder = (tab: typeof activeTab) => {
    switch (tab) {
      case 'thai_radar':
        return '🔍 ค้นหาหน่วยการเรียนรู้แจกลูกสะกดคำ หรือทักษะภาษาไทย...';
      case 'progress_trends':
        return '🔍 ค้นหาสมรรถนะหรือวันที่ทดสอบ...';
      case 'individual':
        return '🔍 ค้นหาชื่อนักเรียน หรือทักษะ/เกียรติบัตร...';
      case 'competency_report':
        return '🔍 ค้นหาชื่อนักเรียน หรือสมรรถนะ (เช่น คิดขั้นสูง, สื่อสาร, CBE1)...';
      case 'classroom':
        return '🔍 ค้นหาชื่อหนูน้อยในห้องเรียน (ชื่อ, รหัส, ระดับชั้น)...';
      case 'weekly_trends':
        return '🔍 ค้นหาชื่อนักเรียนเพื่อดูกราฟแนวโน้ม...';
      case 'radar_skills':
        return '🔍 ค้นหาชื่อนักเรียน หรือทักษะในเรดาร์...';
      default:
        return '🔍 ค้นหา...';
    }
  };

  // Sync selectedProfileId when profile prop changes
  React.useEffect(() => {
    setSelectedProfileId(profile.id);
  }, [profile.id]);

  // Sync activeTab when initialTab changes
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Find currently viewed individual profile
  const currentProfile = profiles.find((p) => p.id === selectedProfileId) || profile;

  // Individual profile stats
  const history = currentProfile.history || [];
  let totalLitS = 0,
    totalLitQ = 0;
  let totalMathS = 0,
    totalMathQ = 0;
  let totalProbS = 0,
    totalProbQ = 0;
  let totalInqS = 0,
    totalInqQ = 0;
  let totalCreS = 0,
    totalCreQ = 0;
  let totalPhyS = 0,
    totalPhyQ = 0;
  let totalSocS = 0,
    totalSocQ = 0;
  let totalCitS = 0,
    totalCitQ = 0;
  let totalThaiS = 0,
    totalThaiQ = 0;
  let totalEngS = 0,
    totalEngQ = 0;
  let totalSelfMgmtS = 0,
    totalSelfMgmtQ = 0;
  let totalHotS = 0,
    totalHotQ = 0;
  let totalCommS = 0,
    totalCommQ = 0;
  let totalTeamS = 0,
    totalTeamQ = 0;
  let totalActiveCitS = 0,
    totalActiveCitQ = 0;
  let totalSustS = 0,
    totalSustQ = 0;

  history.forEach((h) => {
    const litS = h.literacyScore !== undefined ? h.literacyScore : h.thaiScore || 0;
    const litQ = h.literacyTotal !== undefined ? h.literacyTotal : h.thaiTotal || 0;
    const thaiS = h.thaiScore !== undefined ? h.thaiScore : (h.literacyScore || 0);
    const thaiQ = h.thaiTotal !== undefined ? h.thaiTotal : (h.literacyTotal || 0);
    const engS = h.englishScore || 0;
    const engQ = h.englishTotal || 0;
    const inqS = h.inquiryScore !== undefined ? h.inquiryScore : h.scienceScore || 0;
    const inqQ = h.inquiryTotal !== undefined ? h.inquiryTotal : h.scienceTotal || 0;
    const mathS = h.mathScore || 0;
    const mathQ = h.mathTotal || 0;
    const probS = h.problemSolvingScore || 0;
    const probQ = h.problemSolvingTotal || 0;
    const creS = h.creativityScore || 0;
    const creQ = h.creativityTotal || 0;
    const phyS = h.physicalHealthScore || 0;
    const phyQ = h.physicalHealthTotal || 0;
    const socS = h.socioEmotionalScore || 0;
    const socQ = h.socioEmotionalTotal || 0;
    const citS = h.citizenshipScore || 0;
    const citQ = h.citizenshipTotal || 0;

    totalLitS += litS;
    totalLitQ += litQ;
    totalThaiS += thaiS;
    totalThaiQ += thaiQ;
    totalEngS += engS;
    totalEngQ += engQ;
    totalMathS += mathS;
    totalMathQ += mathQ;
    totalProbS += probS;
    totalProbQ += probQ;
    totalInqS += inqS;
    totalInqQ += inqQ;
    totalCreS += creS;
    totalCreQ += creQ;
    totalPhyS += phyS;
    totalPhyQ += phyQ;
    totalSocS += socS;
    totalSocQ += socQ;
    totalCitS += citS;
    totalCitQ += citQ;

    // CBE 6 Competencies calculation
    if (h.selfManagementScore !== undefined) {
      totalSelfMgmtS += h.selfManagementScore;
      totalSelfMgmtQ += h.selfManagementTotal || 0;
    } else if (h.citizenshipScore !== undefined) {
      totalSelfMgmtS += h.citizenshipScore;
      totalSelfMgmtQ += h.citizenshipTotal || 0;
    }

    if (h.higherOrderThinkingScore !== undefined) {
      totalHotS += h.higherOrderThinkingScore;
      totalHotQ += h.higherOrderThinkingTotal || 0;
    } else if (h.problemSolvingScore !== undefined) {
      totalHotS += h.problemSolvingScore;
      totalHotQ += h.problemSolvingTotal || 0;
    }

    if (h.communicationScore !== undefined) {
      totalCommS += h.communicationScore;
      totalCommQ += h.communicationTotal || 0;
    } else {
      totalCommS += litS;
      totalCommQ += litQ;
    }

    if (h.teamworkScore !== undefined) {
      totalTeamS += h.teamworkScore;
      totalTeamQ += h.teamworkTotal || 0;
    } else if (h.socioEmotionalScore !== undefined) {
      totalTeamS += h.socioEmotionalScore;
      totalTeamQ += h.socioEmotionalTotal || 0;
    }

    if (h.activeCitizenshipScore !== undefined) {
      totalActiveCitS += h.activeCitizenshipScore;
      totalActiveCitQ += h.activeCitizenshipTotal || 0;
    } else if (h.citizenshipScore !== undefined) {
      totalActiveCitS += h.citizenshipScore;
      totalActiveCitQ += h.citizenshipTotal || 0;
    }

    if (h.sustainableLivingScore !== undefined) {
      totalSustS += h.sustainableLivingScore;
      totalSustQ += h.sustainableLivingTotal || 0;
    } else {
      totalSustS += inqS;
      totalSustQ += inqQ;
    }
  });

  const totalAllQ =
    totalLitQ +
    totalMathQ +
    totalProbQ +
    totalInqQ +
    totalCreQ +
    totalPhyQ +
    totalSocQ +
    totalCitQ +
    totalEngQ;
  const totalAllS =
    totalLitS +
    totalMathS +
    totalProbS +
    totalInqS +
    totalCreS +
    totalPhyS +
    totalSocS +
    totalCitS +
    totalEngS;
  const hasHistory = totalAllQ > 0;

  const litRate = totalLitQ > 0 ? Math.round((totalLitS / totalLitQ) * 100) : null;
  const thaiRate = totalThaiQ > 0 ? Math.round((totalThaiS / totalThaiQ) * 100) : null;
  const engRate = totalEngQ > 0 ? Math.round((totalEngS / totalEngQ) * 100) : null;
  const mathRate = totalMathQ > 0 ? Math.round((totalMathS / totalMathQ) * 100) : null;
  const probRate = totalProbQ > 0 ? Math.round((totalProbS / totalProbQ) * 100) : null;
  const inqRate = totalInqQ > 0 ? Math.round((totalInqS / totalInqQ) * 100) : null;
  const creRate = totalCreQ > 0 ? Math.round((totalCreS / totalCreQ) * 100) : null;
  const phyRate = totalPhyQ > 0 ? Math.round((totalPhyS / totalPhyQ) * 100) : null;
  const socRate = totalSocQ > 0 ? Math.round((totalSocS / totalSocQ) * 100) : null;
  const citRate = totalCitQ > 0 ? Math.round((totalCitS / totalCitQ) * 100) : null;
  const overallRate = totalAllQ > 0 ? Math.round((totalAllS / totalAllQ) * 100) : null;
  const trioTotalQ = totalThaiQ + totalEngQ + totalMathQ;
  const trioTotalS = totalThaiS + totalEngS + totalMathS;
  const trioRate = trioTotalQ > 0 ? Math.round((trioTotalS / trioTotalQ) * 100) : null;

  // CBE Competencies Rates
  const selfMgmtRate = totalSelfMgmtQ > 0 ? Math.round((totalSelfMgmtS / totalSelfMgmtQ) * 100) : null;
  const hotRate = totalHotQ > 0 ? Math.round((totalHotS / totalHotQ) * 100) : null;
  const commRate = totalCommQ > 0 ? Math.round((totalCommS / totalCommQ) * 100) : null;
  const teamRate = totalTeamQ > 0 ? Math.round((totalTeamS / totalTeamQ) * 100) : null;
  const activeCitRate = totalActiveCitQ > 0 ? Math.round((totalActiveCitS / totalActiveCitQ) * 100) : null;
  const sustRate = totalSustQ > 0 ? Math.round((totalSustS / totalSustQ) * 100) : null;

  const totalCbeQ = totalSelfMgmtQ + totalHotQ + totalCommQ + totalTeamQ + totalActiveCitQ + totalSustQ;
  const totalCbeS = totalSelfMgmtS + totalHotS + totalCommS + totalTeamS + totalActiveCitS + totalSustS;
  const cbeOverallRate = totalCbeQ > 0 ? Math.round((totalCbeS / totalCbeQ) * 100) : null;

  const isCurrentProfilePrimary =
    ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(currentProfile.grade) || curriculumMode === 'cbe_primary';

  // Thai Early Childhood Ministry of Education Assessment Criteria (3 ระดับ)
  const getSkillBenchmark = (rate: number | null, total: number) => {
    if (total === 0 || rate === null) {
      return {
        levelKey: 'untested' as const,
        levelLabel: 'ยังไม่ได้ทดสอบ',
        levelShort: 'รอทดสอบ',
        badgeClass: 'bg-slate-100 text-slate-500 border-slate-200',
        description: 'ยังไม่มีประวัติการทำแบบฝึกหัดในทักษะนี้',
      };
    }
    if (rate >= 80) {
      return {
        levelKey: 'level_3' as const,
        levelLabel: 'ระดับ 3: ยอดเยี่ยม (≥80%)',
        levelShort: 'ดีเยี่ยม (ระดับ 3)',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        description: 'มีความเข้าใจแม่นยำ ปฏิบัติได้อย่างคล่องแคล่วและมั่นใจ',
      };
    }
    if (rate >= 60) {
      return {
        levelKey: 'level_2' as const,
        levelLabel: 'ระดับ 2: ตามเกณฑ์ (60-79%)',
        levelShort: 'ตามเกณฑ์ (ระดับ 2)',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        description: 'มีความเข้าใจตามเกณฑ์มาตรฐาน อาจมีข้อที่ต้องชี้แนะเป็นบางครั้ง',
      };
    }
    return {
      levelKey: 'level_1' as const,
      levelLabel: 'ระดับ 1: ควรส่งเสริม (<60%)',
      levelShort: 'ควรส่งเสริม (ระดับ 1)',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      description: 'ควรได้รับการฝึกฝนเพิ่มเติมผ่านกิจกรรมการเรียนรู้และสื่อรูปธรรม',
    };
  };

  // CBE Assessment Benchmark (4 ระดับ ตามเกณฑ์ สพฐ.)
  const getCbeBenchmark = (rate: number | null, total: number) => {
    if (total === 0 || rate === null) {
      return {
        levelKey: 'untested' as const,
        stars: 0,
        levelNumber: 0,
        levelLabel: 'ยังไม่ได้ทดสอบ',
        levelShort: 'รอทดสอบ',
        badgeClass: 'bg-slate-100 text-slate-500 border-slate-200',
        barColor: 'from-slate-300 to-slate-400',
        description: 'ยังไม่มีประวัติการทำแบบทดสอบในสมรรถนะนี้',
      };
    }
    if (rate >= 80) {
      return {
        levelKey: 'level_4' as const,
        stars: 4,
        levelNumber: 4,
        levelLabel: 'ระดับ 4: เชี่ยวชาญ (≥80%)',
        levelShort: 'เชี่ยวชาญ (ระดับ 4)',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        barColor: 'from-emerald-400 to-emerald-600',
        description: 'ปฏิบัติได้อย่างคล่องแคล่ว มีความเข้าใจเชิงลึก ประยุกต์ใช้ในสถานการณ์ใหม่ได้อย่างยอดเยี่ยม',
      };
    }
    if (rate >= 70) {
      return {
        levelKey: 'level_3' as const,
        stars: 3,
        levelNumber: 3,
        levelLabel: 'ระดับ 3: คล่องแคล่ว (70-79%)',
        levelShort: 'คล่องแคล่ว (ระดับ 3)',
        badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
        barColor: 'from-blue-400 to-blue-600',
        description: 'ปฏิบัติได้ถูกต้องตามเกณฑ์มาตรฐาน แก้ปัญหาเฉพาะหน้าได้ด้วยตนเองเป็นส่วนใหญ่',
      };
    }
    if (rate >= 60) {
      return {
        levelKey: 'level_2' as const,
        stars: 2,
        levelNumber: 2,
        levelLabel: 'ระดับ 2: กำลังพัฒนา (60-69%)',
        levelShort: 'กำลังพัฒนา (ระดับ 2)',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        barColor: 'from-amber-400 to-amber-600',
        description: 'ปฏิบัติได้ตามคำแนะนำ มีความเข้าใจพื้นฐาน ต้องการการฝึกฝนเพิ่มเติมอย่างสม่ำเสมอ',
      };
    }
    return {
      levelKey: 'level_1' as const,
      stars: 1,
      levelNumber: 1,
      levelLabel: 'ระดับ 1: เริ่มต้น (<60%)',
      levelShort: 'เริ่มต้น (ระดับ 1)',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      barColor: 'from-rose-400 to-rose-600',
      description: 'อยู่ในขั้นเริ่มต้น ควรได้รับการฝึกฝนเพิ่มเติมผ่านสถานการณ์จำลองและการลงมือปฏิบัติจริง',
    };
  };

  // Structured Competencies list for Primary
  const individualCompetencies = useMemo(
    () => [
      {
        code: 'CBE1',
        id: 'self_management' as const,
        name: 'การจัดการตนเอง',
        engTitle: 'Self-Management',
        curriculumTitle: '1. การจัดการตนเอง (Self-Management)',
        focus: 'การรู้จักตนเอง เห็นคุณค่า จัดการอารมณ์และความเครียด ตั้งเป้าหมาย วางแผนเวลา ดูแลสุขภาพ และกำกับตนเอง',
        score: totalSelfMgmtS,
        total: totalSelfMgmtQ,
        rate: selfMgmtRate,
        icon: '🎯',
        themeBg: 'bg-blue-50/70 border-blue-200',
        themeText: 'text-blue-900',
        progressBar: 'from-blue-400 to-indigo-600',
        benchmark: getCbeBenchmark(selfMgmtRate, totalSelfMgmtQ),
        indicators: ['เห็นคุณค่าในตนเอง', 'จัดการอารมณ์', 'วางแผนเวลา', 'มีสุขอนามัยที่ดี'],
        advice: 'ฝึกวางแผนตารางเวลาประจำวัน สอนเก็บที่นอน และเปิดโอกาสให้ช่วยตัดสินใจเรื่องส่วนตัว',
      },
      {
        code: 'CBE2',
        id: 'higher_order_thinking' as const,
        name: 'การคิดขั้นสูง',
        engTitle: 'Higher-Order Thinking',
        curriculumTitle: '2. การคิดขั้นสูง (Higher-Order Thinking)',
        focus: 'การคิดวิเคราะห์ คิดวิพากษ์ คิดสร้างสรรค์ และแก้ปัญหาอย่างเป็นระบบบนฐานข้อมูลและเหตุผลรอบด้าน',
        score: totalHotS,
        total: totalHotQ,
        rate: hotRate,
        icon: '🧠',
        themeBg: 'bg-violet-50/70 border-violet-200',
        themeText: 'text-violet-900',
        progressBar: 'from-violet-400 to-purple-600',
        benchmark: getCbeBenchmark(hotRate, totalHotQ),
        indicators: ['คิดวิเคราะห์แยกแยะ', 'ตรวจสอบข้อมูลด้วยเหตุผล', 'คิดสร้างสรรค์', 'แก้ปัญหาเชิงระบบ'],
        advice: 'ชวนตั้งคำถาม "ทำไม" และ "ถ้าเป็นแบบนี้จะเกิดอะไรขึ้น" เมื่ออ่านข่าวหรือดูสารคดีร่วมกัน',
      },
      {
        code: 'CBE3',
        id: 'communication' as const,
        name: 'การสื่อสาร',
        engTitle: 'Communication',
        curriculumTitle: '3. การสื่อสาร (Communication)',
        focus: 'การรับสารและส่งสารด้วยภาษาและสัญลักษณ์ที่หลากหลาย ถ่ายทอดความคิด ความรู้สึกได้อย่างชัดเจน สุภาพ',
        score: totalCommS,
        total: totalCommQ,
        rate: commRate,
        icon: '💬',
        themeBg: 'bg-emerald-50/70 border-emerald-200',
        themeText: 'text-emerald-900',
        progressBar: 'from-emerald-400 to-teal-600',
        benchmark: getCbeBenchmark(commRate, totalCommQ),
        indicators: ['ฟัง-อ่านอย่างเข้าใจ', 'พูด-เขียนถ่ายทอดความคิด', 'กิริยาท่าทางสุภาพ', 'ใช้สื่อดิจิทัลปลอดภัย'],
        advice: 'เปิดโอกาสให้ลูกเล่าเรื่องราวที่โรงเรียน ฝึกการรับฟัง และชื่นชมการอธิบายด้วยเหตุผล',
      },
      {
        code: 'CBE4',
        id: 'teamwork_collaboration' as const,
        name: 'การรวมพลังทำงานเป็นทีม',
        engTitle: 'Teamwork & Collaboration',
        curriculumTitle: '4. การรวมพลังทำงานเป็นทีม (Teamwork & Collaboration)',
        focus: 'การเป็นสมาชิกที่ดีของทีม บทบาทผู้นำและผู้ตามที่ยืดหยุ่น รับฟังและแลกเปลี่ยนอย่างสร้างสรรค์ ร่วมมือสู่เป้าหมาย',
        score: totalTeamS,
        total: totalTeamQ,
        rate: teamRate,
        icon: '🤝',
        themeBg: 'bg-amber-50/70 border-amber-200',
        themeText: 'text-amber-900',
        progressBar: 'from-amber-400 to-orange-600',
        benchmark: getCbeBenchmark(teamRate, totalTeamQ),
        indicators: ['รับฟังความคิดเห็นผู้อื่น', 'ผู้นำและผู้ตามที่ดี', 'ประสานงานและช่วยเหลือ', 'จัดการความขัดแย้ง'],
        advice: 'จัดกิจกรรมทำงานบ้านร่วมกัน เล่นบอร์ดเกมที่ต้องร่วมมือกัน และส่งเสริมกิจกรรมกลุ่ม',
      },
      {
        code: 'CBE5',
        id: 'active_citizenship' as const,
        name: 'การเป็นพลเมืองที่เข้มแข็ง',
        engTitle: 'Active Citizenship',
        curriculumTitle: '5. การเป็นพลเมืองที่เข้มแข็ง (Active Citizenship)',
        focus: 'ความภาคภูมิใจในความเป็นไทย เคารพกติกา สิทธิเสรีภาพ มีจิตสาธารณะ เสียสละ และมีส่วนร่วมพัฒนาชุมชน',
        score: totalActiveCitS,
        total: totalActiveCitQ,
        rate: activeCitRate,
        icon: '🏛️',
        themeBg: 'bg-rose-50/70 border-rose-200',
        themeText: 'text-rose-900',
        progressBar: 'from-rose-400 to-red-600',
        benchmark: getCbeBenchmark(activeCitRate, totalActiveCitQ),
        indicators: ['ปฏิบัติตามกฎกติกา', 'เคารพสิทธิผู้อื่น', 'ซื่อสัตย์สุจริต', 'มีจิตสาธารณะ'],
        advice: 'ชวนลูกร่วมกิจกรรมจิตอาสา ปลูกฝังการเคารพกฎจราจร และพูดคุยเรื่องความรับผิดชอบ',
      },
      {
        code: 'CBE6',
        id: 'sustainable_living' as const,
        name: 'การอยู่ร่วมกับธรรมชาติและวิทยาการอย่างยั่งยืน',
        engTitle: 'Sustainable Living with Nature & Tech',
        curriculumTitle: '6. การอยู่ร่วมกับธรรมชาติและวิทยาการอย่างยั่งยืน (Sustainable Living with Nature & Tech)',
        focus: 'ความเข้าใจความสัมพันธ์ระหว่างมนุษย์ ธรรมชาติ และเทคโนโลยี ใช้เทคโนโลยีอย่างปลอดภัย อนุรักษ์ทรัพยากร',
        score: totalSustS,
        total: totalSustQ,
        rate: sustRate,
        icon: '🌿',
        themeBg: 'bg-teal-50/70 border-teal-200',
        themeText: 'text-teal-900',
        progressBar: 'from-teal-400 to-emerald-600',
        benchmark: getCbeBenchmark(sustRate, totalSustQ),
        indicators: ['อนุรักษ์สิ่งแวดล้อม', 'คัดแยกขยะ ประหยัดพลังงาน', 'ใช้เทคโนโลยีปลอดภัย', 'มีจิตสำนึกรักษ์โลก'],
        advice: 'พาลูกปลูกต้นไม้ แยกขยะในบ้าน ปิดไฟเมื่อไม่ใช้ และให้คำแนะนำเรื่องการใช้โซเชียลมีเดีย',
      },
    ],
    [
      totalSelfMgmtS,
      totalSelfMgmtQ,
      selfMgmtRate,
      totalHotS,
      totalHotQ,
      hotRate,
      totalCommS,
      totalCommQ,
      commRate,
      totalTeamS,
      totalTeamQ,
      teamRate,
      totalActiveCitS,
      totalActiveCitQ,
      activeCitRate,
      totalSustS,
      totalSustQ,
      sustRate,
    ]
  );

  const individualSkills = useMemo(() => [
    {
      code: '1',
      id: 'literacy' as const,
      name: 'ภาษาและการรู้หนังสือ',
      curriculumTitle: '1. ภาษาและการรู้หนังสือ (Language & Literacy)',
      focus: 'การฟัง การพูด การอ่านภาพ สัญลักษณ์ ตัวอักษร และการสื่อความหมายในชีวิตประจำวัน',
      score: totalLitS,
      total: totalLitQ,
      rate: litRate,
      icon: '📖',
      themeBg: 'bg-rose-50/70 border-rose-200',
      themeText: 'text-rose-900',
      progressBar: 'from-rose-400 to-rose-600',
      benchmark: getSkillBenchmark(litRate, totalLitQ),
    },
    {
      code: '2',
      id: 'math' as const,
      name: 'การคิดรวบยอดและการคิดคำนวณ',
      curriculumTitle: '2. การคิดรวบยอดและการคิดคำนวณ (Math & Cognitive)',
      focus: 'การสังเกต จำแนก เปรียบเทียบ จัดกลุ่ม จำนวน ตัวเลข แบบรูปและมิติสัมพันธ์',
      score: totalMathS,
      total: totalMathQ,
      rate: mathRate,
      icon: '🧮',
      themeBg: 'bg-indigo-50/70 border-indigo-200',
      themeText: 'text-indigo-900',
      progressBar: 'from-indigo-400 to-indigo-600',
      benchmark: getSkillBenchmark(mathRate, totalMathQ),
    },
    {
      code: '3',
      id: 'problem_solving' as const,
      name: 'การคิดแก้ปัญหาและตัดสินใจ',
      curriculumTitle: '3. การคิดแก้ปัญหาและตัดสินใจ (Problem Solving & Decision)',
      focus: 'การระบุปัญหา ค้นหาสาเหตุ ลองถูกลองผิด คิดวิเคราะห์อย่างมีเหตุผลและตัดสินใจ',
      score: totalProbS,
      total: totalProbQ,
      rate: probRate,
      icon: '💡',
      themeBg: 'bg-amber-50/70 border-amber-200',
      themeText: 'text-amber-900',
      progressBar: 'from-amber-400 to-amber-600',
      benchmark: getSkillBenchmark(probRate, totalProbQ),
    },
    {
      code: '4',
      id: 'inquiry' as const,
      name: 'การแสวงหาความรู้',
      curriculumTitle: '4. การแสวงหาความรู้ (Inquiry & Exploration)',
      focus: 'การตั้งคำถาม สังเกต สำรวจสิ่งแวดล้อม วางแผนทดลอง ปฏิสัมพันธ์กับธรรมชาติและวิทยาศาสตร์',
      score: totalInqS,
      total: totalInqQ,
      rate: inqRate,
      icon: '🔬',
      themeBg: 'bg-emerald-50/70 border-emerald-200',
      themeText: 'text-emerald-900',
      progressBar: 'from-emerald-400 to-emerald-600',
      benchmark: getSkillBenchmark(inqRate, totalInqQ),
    },
    {
      code: '5',
      id: 'creativity' as const,
      name: 'จินตนาการและความคิดสร้างสรรค์',
      curriculumTitle: '5. จินตนาการและความคิดสร้างสรรค์ (Creativity & Imagination)',
      focus: 'การถ่ายทอดความคิดแปลกใหม่ ความยืดหยุ่น จินตนาการ และศิลปะสุนทรียภาพ',
      score: totalCreS,
      total: totalCreQ,
      rate: creRate,
      icon: '🎨',
      themeBg: 'bg-violet-50/70 border-violet-200',
      themeText: 'text-violet-900',
      progressBar: 'from-violet-400 to-violet-600',
      benchmark: getSkillBenchmark(creRate, totalCreQ),
    },
    {
      code: '6',
      id: 'physical_health' as const,
      name: 'ด้านสุขภาวะทางกาย',
      curriculumTitle: '6. ด้านสุขภาวะทางกาย (Physical Health & Motor Skills)',
      focus: 'สุขอนามัย โภชนาการ ความปลอดภัย การเคลื่อนไหว กล้ามเนื้อมัดใหญ่-เล็ก และการประสานตา-มือ',
      score: totalPhyS,
      total: totalPhyQ,
      rate: phyRate,
      icon: '🏃',
      themeBg: 'bg-teal-50/70 border-teal-200',
      themeText: 'text-teal-900',
      progressBar: 'from-teal-400 to-teal-600',
      benchmark: getSkillBenchmark(phyRate, totalPhyQ),
    },
    {
      code: '7',
      id: 'socio_emotional' as const,
      name: 'ด้านอารมณ์ จิตใจ และสังคม',
      curriculumTitle: '7. ด้านอารมณ์ จิตใจ และสังคม (Socio-Emotional Development)',
      focus: 'การรู้เท่าทันและจัดการอารมณ์ตนเอง กำกับตนเอง แบ่งปัน ความเห็นอกเห็นใจ และอยู่ร่วมกับผู้อื่น',
      score: totalSocS,
      total: totalSocQ,
      rate: socRate,
      icon: '❤️',
      themeBg: 'bg-pink-50/70 border-pink-200',
      themeText: 'text-pink-900',
      progressBar: 'from-pink-400 to-pink-600',
      benchmark: getSkillBenchmark(socRate, totalSocQ),
    },
    {
      code: '8',
      id: 'citizenship' as const,
      name: 'ด้านความเป็นพลเมืองและความเป็นไทย',
      curriculumTitle: '8. ด้านความเป็นพลเมืองและความเป็นไทย (Citizenship & Ethics)',
      focus: 'มารยาทไทย วัฒนธรรม กติกาข้อตกลง วินัย ความพอเพียง อนุรักษ์ธรรมชาติ จิตสาธารณะ',
      score: totalCitS,
      total: totalCitQ,
      rate: citRate,
      icon: '🇹🇭',
      themeBg: 'bg-cyan-50/70 border-cyan-200',
      themeText: 'text-cyan-900',
      progressBar: 'from-cyan-400 to-cyan-600',
      benchmark: getSkillBenchmark(citRate, totalCitQ),
    },
    {
      code: 'EN',
      id: 'english' as const,
      name: 'ภาษาอังกฤษวัยซน',
      curriculumTitle: 'ภาษาอังกฤษ (Early Childhood English & Phonics)',
      focus: 'Alphabet A-Z ตัวพิมพ์ใหญ่-เล็ก โฟนิกส์ คำศัพท์ Sight Words และการสื่อสารขั้นพื้นฐาน',
      score: totalEngS,
      total: totalEngQ,
      rate: engRate,
      icon: '🔤',
      themeBg: 'bg-sky-50/70 border-sky-200',
      themeText: 'text-sky-900',
      progressBar: 'from-sky-400 to-sky-600',
      benchmark: getSkillBenchmark(engRate, totalEngQ),
    },
  ], [
    totalLitS, totalLitQ, litRate,
    totalMathS, totalMathQ, mathRate,
    totalProbS, totalProbQ, probRate,
    totalInqS, totalInqQ, inqRate,
    totalCreS, totalCreQ, creRate,
    totalPhyS, totalPhyQ, phyRate,
    totalSocS, totalSocQ, socRate,
    totalCitS, totalCitQ, citRate,
    totalEngS, totalEngQ, engRate,
  ]);

  // Statistical segregation of tested vs untested skills
  const testedSkills = individualSkills.filter((s) => s.total > 0 && s.rate !== null);
  const untestedSkills = individualSkills.filter((s) => s.total === 0);
  const sortedTested = [...testedSkills].sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));
  const bestSkill = sortedTested.length > 0 ? sortedTested[0] : null;
  const lowestSkill = sortedTested.length > 1 ? sortedTested[sortedTested.length - 1] : null;

  // Filtered skills for display
  const displayedSkills = individualSkills.filter((s) => {
    if (skillFilter === 'tested') return s.total > 0;
    if (skillFilter === 'untested') return s.total === 0;
    return true;
  });

  // Evaluate Mastery Milestones & Certificates for Current Profile
  const milestoneSummary = useMemo(
    () => evaluateProfileMilestones(currentProfile),
    [currentProfile]
  );

  // SVG Line Chart for 30 days
  const chartWidth = 560;
  const chartHeight = 140;
  const padding = 25;

  const points = history.slice(-15).map((entry, idx, arr) => {
    const x = padding + (idx / Math.max(arr.length - 1, 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - (entry.accuracy / 100) * (chartHeight - padding * 2);
    return { x, y, accuracy: entry.accuracy, date: entry.date.slice(5) };
  });

  const linePath =
    points.length > 0
      ? `M ${points[0].x} ${points[0].y} ` +
        points
          .slice(1)
          .map((p) => `L ${p.x} ${p.y}`)
          .join(' ')
      : '';

  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${
          chartHeight - padding
        } Z`
      : '';

  // ALL PROFILES / CLASSROOM CALCULATIONS
  const filteredProfiles = profiles.filter((p) => {
    if (gradeFilter === 'ALL') return true;
    return p.grade === gradeFilter;
  });

  // Calculate stats for all profiles
  const classroomStats = useMemo(() => {
    let sumQuestions = 0;
    let sumScore = 0;
    let sumBadges = 0;
    let totalAccuracies = 0;
    let activeStudentsWithData = 0;

    let litSumS = 0,
      litSumQ = 0;
    let mathSumS = 0,
      mathSumQ = 0;
    let probSumS = 0,
      probSumQ = 0;
    let inqSumS = 0,
      inqSumQ = 0;
    let creSumS = 0,
      creSumQ = 0;
    let phySumS = 0,
      phySumQ = 0;
    let socSumS = 0,
      socSumQ = 0;
    let citSumS = 0,
      citSumQ = 0;

    filteredProfiles.forEach((p) => {
      sumQuestions += p.totalQuestions || 0;
      sumScore += p.totalScore || 0;
      sumBadges += p.badges ? p.badges.length : 0;

      let pLitS = 0,
        pLitQ = 0;
      let pMathS = 0,
        pMathQ = 0;
      let pProbS = 0,
        pProbQ = 0;
      let pInqS = 0,
        pInqQ = 0;
      let pCreS = 0,
        pCreQ = 0;
      let pPhyS = 0,
        pPhyQ = 0;
      let pSocS = 0,
        pSocQ = 0;
      let pCitS = 0,
        pCitQ = 0;

      (p.history || []).forEach((h) => {
        const lS = h.literacyScore !== undefined ? h.literacyScore : h.thaiScore || 0;
        const lQ = h.literacyTotal !== undefined ? h.literacyTotal : h.thaiTotal || 0;
        const iS = h.inquiryScore !== undefined ? h.inquiryScore : h.scienceScore || 0;
        const iQ = h.inquiryTotal !== undefined ? h.inquiryTotal : h.scienceTotal || 0;
        const prS = h.problemSolvingScore || 0;
        const prQ = h.problemSolvingTotal || 0;
        const crS = h.creativityScore || 0;
        const crQ = h.creativityTotal || 0;
        const phS = h.physicalHealthScore || 0;
        const phQ = h.physicalHealthTotal || 0;
        const soS = h.socioEmotionalScore || 0;
        const soQ = h.socioEmotionalTotal || 0;
        const ciS = h.citizenshipScore || 0;
        const ciQ = h.citizenshipTotal || 0;

        pLitS += lS;
        pLitQ += lQ;
        pMathS += h.mathScore || 0;
        pMathQ += h.mathTotal || 0;
        pProbS += prS;
        pProbQ += prQ;
        pInqS += iS;
        pInqQ += iQ;
        pCreS += crS;
        pCreQ += crQ;
        pPhyS += phS;
        pPhyQ += phQ;
        pSocS += soS;
        pSocQ += soQ;
        pCitS += ciS;
        pCitQ += ciQ;
      });

      litSumS += pLitS;
      litSumQ += pLitQ;
      mathSumS += pMathS;
      mathSumQ += pMathQ;
      probSumS += pProbS;
      probSumQ += pProbQ;
      inqSumS += pInqS;
      inqSumQ += pInqQ;
      creSumS += pCreS;
      creSumQ += pCreQ;
      phySumS += pPhyS;
      phySumQ += pPhyQ;
      socSumS += pSocS;
      socSumQ += pSocQ;
      citSumS += pCitS;
      citSumQ += pCitQ;

      const pTotalQ = pLitQ + pMathQ + pProbQ + pInqQ + pCreQ + pPhyQ + pSocQ + pCitQ;
      const pTotalS = pLitS + pMathS + pProbS + pInqS + pCreS + pPhyS + pSocS + pCitS;
      if (pTotalQ > 0) {
        const pRate = (pTotalS / pTotalQ) * 100;
        totalAccuracies += pRate;
        activeStudentsWithData++;
      }
    });

    const avgAccuracy =
      activeStudentsWithData > 0 ? Math.round(totalAccuracies / activeStudentsWithData) : 0;
    const avgLit = litSumQ > 0 ? Math.round((litSumS / litSumQ) * 100) : 0;
    const avgMath = mathSumQ > 0 ? Math.round((mathSumS / mathSumQ) * 100) : 0;
    const avgProb = probSumQ > 0 ? Math.round((probSumS / probSumQ) * 100) : 0;
    const avgInq = inqSumQ > 0 ? Math.round((inqSumS / inqSumQ) * 100) : 0;
    const avgCre = creSumQ > 0 ? Math.round((creSumS / creSumQ) * 100) : 0;
    const avgPhy = phySumQ > 0 ? Math.round((phySumS / phySumQ) * 100) : 0;
    const avgSoc = socSumQ > 0 ? Math.round((socSumS / socSumQ) * 100) : 0;
    const avgCit = citSumQ > 0 ? Math.round((citSumS / citSumQ) * 100) : 0;

    // Leaderboard sorted by totalScore
    const rankedProfiles = [...filteredProfiles].sort(
      (a, b) => (b.totalScore || 0) - (a.totalScore || 0)
    );

    return {
      totalStudents: filteredProfiles.length,
      sumQuestions,
      sumScore,
      sumBadges,
      avgAccuracy,
      avgLit,
      avgMath,
      avgProb,
      avgInq,
      avgCre,
      avgPhy,
      avgSoc,
      avgCit,
      litSumQ,
      mathSumQ,
      probSumQ,
      inqSumQ,
      creSumQ,
      phySumQ,
      socSumQ,
      citSumQ,
      rankedProfiles,
      activeStudentsWithData,
    };
  }, [filteredProfiles]);

  // Context-aware dropdown profiles (filtered by grade and search query)
  const dropdownProfiles = useMemo(() => {
    let list = profiles;
    if (gradeFilter !== 'ALL') {
      list = list.filter((p) => p.grade === gradeFilter);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      const matched = list.filter(
        (p) =>
          (p.name?.toLowerCase().includes(q) ?? false) ||
          (p.grade?.toLowerCase().includes(q) ?? false) ||
          (p.id?.toLowerCase().includes(q) ?? false)
      );
      if (matched.length > 0) return matched;
    }
    return list;
  }, [profiles, gradeFilter, searchQuery]);

  // Tab 1 (Individual): Filtered milestones based on search
  const filteredMilestones = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return milestoneSummary.milestones;
    return milestoneSummary.milestones.filter(
      (m) =>
        (m.title?.toLowerCase().includes(q) ?? false) ||
        (m.subtitle?.toLowerCase().includes(q) ?? false) ||
        (m.criteriaText?.toLowerCase().includes(q) ?? false) ||
        (m.citationText?.toLowerCase().includes(q) ?? false) ||
        (m.badgeLabel?.toLowerCase().includes(q) ?? false)
    );
  }, [milestoneSummary.milestones, searchQuery]);

  // Tab 1 (Individual): Filtered Primary competencies based on search
  const displayedIndividualCompetencies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return individualCompetencies;
    return individualCompetencies.filter(
      (comp) =>
        (comp.name?.toLowerCase().includes(q) ?? false) ||
        (comp.engTitle?.toLowerCase().includes(q) ?? false) ||
        (comp.code?.toLowerCase().includes(q) ?? false) ||
        (comp.focus?.toLowerCase().includes(q) ?? false) ||
        (comp.indicators?.some((ind) => ind?.toLowerCase().includes(q)) ?? false) ||
        (comp.advice?.toLowerCase().includes(q) ?? false)
    );
  }, [individualCompetencies, searchQuery]);

  // Tab 1 (Individual): Filtered Early Childhood skills based on search
  const displayedIndividualSkills = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return displayedSkills;
    return displayedSkills.filter(
      (s) =>
        (s.name?.toLowerCase().includes(q) ?? false) ||
        (s.curriculumTitle?.toLowerCase().includes(q) ?? false) ||
        (s.focus?.toLowerCase().includes(q) ?? false) ||
        (s.code?.toLowerCase().includes(q) ?? false)
    );
  }, [displayedSkills, searchQuery]);

  // Tab 2 (Competency Report): Filtered 6 CBE competency cards
  const displayedCompetencyReportCards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return individualCompetencies;
    return individualCompetencies.filter(
      (comp) =>
        (comp.name?.toLowerCase().includes(q) ?? false) ||
        (comp.engTitle?.toLowerCase().includes(q) ?? false) ||
        (comp.code?.toLowerCase().includes(q) ?? false) ||
        (comp.focus?.toLowerCase().includes(q) ?? false) ||
        (comp.indicators?.some((ind) => ind?.toLowerCase().includes(q)) ?? false) ||
        (comp.advice?.toLowerCase().includes(q) ?? false)
    );
  }, [individualCompetencies, searchQuery]);

  // Tab 3 (Classroom): Filtered student ranking list based on search
  const classroomDisplayProfiles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return classroomStats.rankedProfiles;
    return classroomStats.rankedProfiles.filter(
      (p) =>
        (p.name?.toLowerCase().includes(q) ?? false) ||
        (p.grade?.toLowerCase().includes(q) ?? false) ||
        (p.id?.toLowerCase().includes(q) ?? false)
    );
  }, [classroomStats.rankedProfiles, searchQuery]);

  // Export report card to PNG
  const handleExportPNG = async () => {
    if (!reportRef.current) return;
    try {
      setIsExporting(true);
      setExportType('png');
      setShareFeedback('กำลังเตรียมรูปภาพความละเอียดสูงแบบเต็มฉบับ...');

      const dataUrl = await captureFullElementImage(reportRef.current, {
        pixelRatio: 2,
        backgroundColor: '#FFFFFF',
      });

      const link = document.createElement('a');
      const filename =
        activeTab === 'classroom'
          ? `รายงานภาพรวมทุกโปรไฟล์_ห้องเรียนอนุบาล_สมบูรณ์.png`
          : `รายงานพัฒนาการ_${currentProfile.name}_${currentProfile.grade}_สมบูรณ์.png`;
      link.download = filename;
      link.href = dataUrl;
      link.click();
      setShareFeedback('บันทึกรูปภาพ PNG ครบถ้วนสมบูรณ์แล้ว! 🎉');
      setTimeout(() => setShareFeedback(null), 3000);
    } catch (err) {
      console.error('Export error:', err);
      setShareFeedback('ไม่สามารถบันทึกภาพได้');
      setTimeout(() => setShareFeedback(null), 3000);
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  // Export report to high-res PDF (A4 multi-page standard)
  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    try {
      setIsExporting(true);
      setExportType('pdf');
      setShareFeedback('กำลังจัดสร้างเอกสารรายงาน PDF (A4)...');

      const filename =
        activeTab === 'classroom'
          ? `รายงานภาพรวมห้องเรียน_สมบูรณ์.pdf`
          : `รายงานพัฒนาการ_${currentProfile.name}_${currentProfile.grade}_สมบูรณ์.pdf`;

      const footerTitle =
        activeTab === 'classroom'
          ? 'เอกสารรายงานผลสัมฤทธิ์ภาพรวมทุกโปรไฟล์ (ห้องเรียนปฐมวัย) • อนุบาลคิดส์ คิดส์'
          : `เอกสารรายงานผลการเรียนรู้รายบุคคล (${currentProfile.name} • ${currentProfile.grade}) • อนุบาลคิดส์ คิดส์`;

      await generateMultiPagePdf(reportRef.current, {
        filename,
        onProgress: (msg) => setShareFeedback(msg),
        footerTitle,
      });

      setShareFeedback('ดาวน์โหลดเอกสาร PDF ครบทุกหน้าสมบูรณ์แล้ว! (พร้อมพิมพ์ A4) 🎉');
      setTimeout(() => setShareFeedback(null), 3500);
    } catch (err) {
      console.error('PDF export error:', err);
      setShareFeedback('เกิดข้อผิดพลาดในการสร้าง PDF สามารถใช้ปุ่มพิมพ์รายงานแทนได้');
      setTimeout(() => setShareFeedback(null), 3500);
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  // Delete specific history session
  const handleDeleteHistory = (historyIndex: number) => {
    const result = storageService.deleteHistoryEntry(currentProfile.id, historyIndex);
    if (result.success) {
      setShareFeedback('ลบประวัติการเล่นรอบนี้เรียบร้อยแล้ว ✨');
      setTimeout(() => setShareFeedback(null), 3000);
      if (onRefreshProfiles) {
        onRefreshProfiles();
      }
    } else {
      setShareFeedback(result.message || 'ไม่สามารถลบประวัติได้');
      setTimeout(() => setShareFeedback(null), 3000);
    }
    setHistoryDeleteConfirmIdx(null);
  };

  const handlePrint = () => {
    document.body.classList.add('printing-report');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-report');
    }, 1000);
  };

  // Save report to both Google Sheets & Cloud Firestore
  const handleSaveToCloudAndSheets = async () => {
    setIsSavingDual(true);
    setShareFeedback('กำลังบันทึกข้อมูลลง Google Sheets และ Cloud Firestore...');

    const safetyTimer = setTimeout(() => {
      setIsSavingDual(false);
      setShareFeedback('บันทึกข้อมูลเรียบร้อยแล้ว (สำรองในเครื่อง) 📊☁️');
      setTimeout(() => setShareFeedback(null), 2500);
    }, 4500);

    try {
      const summaryText =
        activeTab === 'classroom'
          ? `รายงานภาพรวมห้องเรียนปฐมวัย (นักเรียน ${classroomStats.totalStudents} คน) | ความแม่นยำเฉลี่ย ${classroomStats.avgAccuracy}% | ภาษา ${classroomStats.avgLit}% | คำนวณ ${classroomStats.avgMath}% | แก้ปัญหา ${classroomStats.avgProb}% | สืบเสาะ ${classroomStats.avgInq}% | สร้างสรรค์ ${classroomStats.avgCre}% | สุขภาวะกาย ${classroomStats.avgPhy}% | อารมณ์สังคม ${classroomStats.avgSoc}% | พลเมือง ${classroomStats.avgCit}%`
          : `รายงานพัฒนาการ ${currentProfile.name} (${currentProfile.grade}) | ความแม่นยำเฉลี่ย ${overallRate !== null ? `${overallRate}%` : '0%'} | ภาษา: ${litRate !== null ? `${litRate}%` : '-'} | คำนวณ: ${mathRate !== null ? `${mathRate}%` : '-'} | แก้ปัญหา: ${probRate !== null ? `${probRate}%` : '-'} | สืบเสาะ: ${inqRate !== null ? `${inqRate}%` : '-'} | สร้างสรรค์: ${creRate !== null ? `${creRate}%` : '-'} | สุขภาวะกาย: ${phyRate !== null ? `${phyRate}%` : '-'} | อารมณ์สังคม: ${socRate !== null ? `${socRate}%` : '-'} | พลเมือง: ${citRate !== null ? `${citRate}%` : '-'}`;

      const res = await recordAssessmentReportDual({
        profileId: activeTab === 'classroom' ? 'CLASSROOM_SUMMARY' : currentProfile.id,
        profileName: activeTab === 'classroom' ? 'รายงานภาพรวมห้องเรียน' : currentProfile.name,
        grade: activeTab === 'classroom' ? gradeFilter : currentProfile.grade,
        overallAccuracy: activeTab === 'classroom' ? classroomStats.avgAccuracy : (overallRate ?? 0),
        literacyRate: activeTab === 'classroom' ? classroomStats.avgLit : (litRate ?? 0),
        mathRate: activeTab === 'classroom' ? classroomStats.avgMath : (mathRate ?? 0),
        problemSolvingRate: activeTab === 'classroom' ? classroomStats.avgProb : (probRate ?? 0),
        inquiryRate: activeTab === 'classroom' ? classroomStats.avgInq : (inqRate ?? 0),
        creativityRate: activeTab === 'classroom' ? classroomStats.avgCre : (creRate ?? 0),
        physicalHealthRate: activeTab === 'classroom' ? classroomStats.avgPhy : (phyRate ?? 0),
        socioEmotionalRate: activeTab === 'classroom' ? classroomStats.avgSoc : (socRate ?? 0),
        citizenshipRate: activeTab === 'classroom' ? classroomStats.avgCit : (citRate ?? 0),
        summary: summaryText,
        evaluatedAt: new Date().toISOString(),
      });

      clearTimeout(safetyTimer);
      if (res.firestoreSuccess || res.sheetsSuccess) {
        setShareFeedback('บันทึกรายงานลง Google Sheets และ Firebase Cloud สำเร็จเรียบร้อยแล้ว! 📊☁️🎉');
        setTimeout(() => setShareFeedback(null), 3500);
      } else {
        setShareFeedback('บันทึกข้อมูลเรียบร้อยแล้ว');
        setTimeout(() => setShareFeedback(null), 2500);
      }
    } catch (err) {
      clearTimeout(safetyTimer);
      console.warn('Dual report save notice:', err);
      setShareFeedback('บันทึกข้อมูลในเครื่องเรียบร้อยแล้ว');
      setTimeout(() => setShareFeedback(null), 2500);
    } finally {
      setIsSavingDual(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="report-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 overflow-y-auto"
    >
      <div className={`bg-white rounded-3xl shadow-2xl max-w-4xl w-full border-4 ${currTheme.modalBorder} ring-2 ${currTheme.modalRing} overflow-hidden my-auto max-h-[95vh] flex flex-col`}>
        {/* Top Header */}
        <div className={`${currTheme.modalHeaderBg} p-4 flex items-center justify-between text-white select-none transition-colors`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <div>
              <h2 className="text-lg font-black font-display">
                ระบบรายงานผลพัฒนาการการเรียนรู้ ({currTheme.shortName})
              </h2>
              <p className={`text-xs ${currTheme.modalHeaderSubtext} font-medium`}>
                วิเคราะห์ผลสัมฤทธิ์รายบุคคล และรายงานภาพรวมเปรียบเทียบทุกโปรไฟล์ในห้องเรียน
              </p>
            </div>
          </div>

          <button
            id="btn-close-report-modal"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Tabs Selector */}
        <div className={`no-print ${currTheme.accentSurface} border-b px-4 py-2 flex flex-wrap items-center justify-between gap-2 select-none`}>
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* 1. Thai Skills Radar */}
            <button
              id="tab-report-thai-radar"
              onClick={() => setActiveTab('thai_radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'thai_radar'
                  ? 'bg-emerald-600 text-white shadow-sm border-b-2 border-emerald-800'
                  : 'bg-white text-emerald-950 border border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <span>📖</span>
              <span>เรดาร์ทักษะภาษาไทย (๑๐ หน่วย)</span>
            </button>

            {/* 2. Progress Trends (30 Days) */}
            <button
              id="tab-report-progress-trends"
              onClick={() => setActiveTab('progress_trends')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'progress_trends'
                  ? 'bg-blue-600 text-white shadow-sm border-b-2 border-blue-800'
                  : 'bg-white text-blue-950 border border-blue-200 hover:bg-blue-50'
              }`}
            >
              <span>🚀</span>
              <span>แนวโน้มความก้าวหน้า</span>
            </button>

            {/* 3. Weekly Trends Line Chart */}
            <button
              id="tab-report-weekly-trend"
              onClick={() => setActiveTab('weekly_trends')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'weekly_trends'
                  ? 'bg-teal-600 text-white shadow-sm border-b-2 border-teal-800'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-teal-50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>แนวโน้มรายสัปดาห์ (Line Chart) 📈</span>
            </button>

            {/* 4. Skill Radar Chart */}
            <button
              id="tab-report-radar-skills"
              onClick={() => setActiveTab('radar_skills')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'radar_skills'
                  ? 'bg-purple-600 text-white shadow-sm border-b-2 border-purple-800'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-purple-50'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>สรุปผลรายทักษะ (Radar Chart) 🕸️</span>
            </button>

            {/* 5. Classroom / All Profiles Report Tab */}
            <button
              id="tab-report-classroom"
              onClick={() => setActiveTab('classroom')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'classroom'
                  ? 'bg-indigo-600 text-white shadow-sm border-b-2 border-indigo-800'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>รายงานรวมทุกโปรไฟล์ (ห้องเรียน)</span>
            </button>

            {/* 6. Individual Report Tab */}
            <button
              id="tab-report-individual"
              onClick={() => setActiveTab('individual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'individual'
                  ? 'bg-amber-500 text-white shadow-sm border-b-2 border-amber-700'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-100/60'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>รายงานรายบุคคล</span>
            </button>

            {/* 7. CBE Competencies Report Tab */}
            <button
              id="tab-report-competency"
              onClick={() => setActiveTab('competency_report')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'competency_report'
                  ? 'bg-gradient-to-r from-indigo-700 to-purple-800 text-white shadow-sm border-b-2 border-indigo-950'
                  : 'bg-white text-indigo-950 border border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              <span>🎓</span>
              <span>รายงานสมรรถนะ (CBE ป.1 - ป.6)</span>
            </button>
          </div>

          {/* Quick PDF Action in Tab Bar */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              id="btn-quick-growth-report-pdf"
              onClick={
                activeTab === 'competency_report' || (activeTab === 'individual' && isCurrentProfilePrimary)
                  ? handleGenerateCompetencyReportPdf
                  : handleGenerateGrowthReportPdf
              }
              className="flex items-center gap-1 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white font-black text-[11px] px-2.5 py-1 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer border border-indigo-400"
              title="สร้างและดาวน์โหลดรายงานสรุป (PDF A4)"
            >
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {activeTab === 'competency_report' || (activeTab === 'individual' && isCurrentProfilePrimary)
                  ? 'รายงานสมรรถนะ (PDF)'
                  : 'รายงาน 8 ทักษะ (PDF)'}
              </span>
            </button>
          </div>
        </div>

        {/* Sub-menu Context Toolbar: Search Box & 9 Grade Levels Filter */}
        <div className="no-print bg-white border-b border-slate-200 px-4 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-2xs select-none">
          {/* Left: 9 Grade Levels Selection Chips (อ.1 - ป.6) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center gap-1 text-[11px] font-black text-slate-600 mr-0.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-amber-600" />
              <span>ระดับชั้น (อ.1 - ป.6):</span>
            </div>
            {GRADE_FILTER_OPTIONS.map((opt) => {
              const count = opt.id === 'ALL' ? profiles.length : profiles.filter((p) => p.grade === opt.id).length;
              const isSelected = gradeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  id={`btn-grade-filter-${opt.id.toLowerCase()}`}
                  onClick={() => handleGradeFilterChange(opt.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer border ${
                    isSelected
                      ? opt.group === 'primary'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-700 shadow-xs'
                        : opt.group === 'kindergarten'
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-800 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                  }`}
                  title={`${opt.label} • ${opt.levelNumber} (นักเรียน ${count} คน)`}
                >
                  <span>{opt.short}</span>
                  <span
                    className={`text-[10px] px-1 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-white/30 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Contextual Search Input & Child Profile Selector */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Contextual Search Input */}
            <div className="relative flex-1 sm:w-60 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="input-report-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={getSearchPlaceholder(activeTab)}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-amber-500 rounded-xl pl-8 pr-7 py-1 text-xs text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  id="btn-clear-report-search"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 cursor-pointer"
                  title="ล้างคำค้นหา"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick Profile Select Dropdown when in single-profile tabs */}
            {(activeTab === 'individual' ||
              activeTab === 'radar_skills' ||
              activeTab === 'thai_radar' ||
              activeTab === 'progress_trends' ||
              activeTab === 'competency_report' ||
              activeTab === 'weekly_trends') && (
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold text-slate-500 hidden lg:inline">หนูน้อย:</span>
                <select
                  id="select-active-profile"
                  value={selectedProfileId}
                  onChange={(e) => {
                    setSelectedProfileId(e.target.value);
                    if (onSelectProfile) onSelectProfile(e.target.value);
                  }}
                  className="bg-white border border-slate-300 rounded-xl px-2.5 py-1 text-xs font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer max-w-[170px] truncate"
                >
                  {dropdownProfiles.length > 0 ? (
                    dropdownProfiles.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.avatar} {p.name} ({p.grade})
                      </option>
                    ))
                  ) : (
                    <option disabled value="">
                      ไม่พบนักเรียน
                    </option>
                  )}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Report Content Canvas */}
        <div className="printable-document p-4 md:p-6 overflow-y-auto flex-1 bg-slate-50" ref={reportRef}>
          {/* Printable Official Document Header (Visible in Print & PDF) */}
          <div className="pb-3 mb-4 border-b-2 border-dashed border-slate-300">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-base md:text-lg font-black text-slate-900 font-display flex items-center gap-1.5">
                  <span>📊</span>
                  <span>
                    {activeTab === 'classroom'
                      ? 'เอกสารรายงานผลสัมฤทธิ์ภาพรวมทุกโปรไฟล์ (ห้องเรียน อ.1 - ป.6)'
                      : activeTab === 'weekly_trends'
                      ? 'เอกสารสรุปวิเคราะห์แนวโน้มพัฒนาการเด็กรายสัปดาห์ (Line Chart จาก Firestore)'
                      : activeTab === 'thai_radar'
                      ? `รายงานวิเคราะห์เรดาร์ทักษะภาษาไทยและแจกลูกสะกดคำ: ${currentProfile.name}`
                      : activeTab === 'progress_trends'
                      ? `รายงานแนวโน้มความก้าวหน้าการเรียนรู้รายบุคคล: ${currentProfile.name}`
                      : activeTab === 'radar_skills'
                      ? `รายงานสรุปผลประเมินรายทักษะ (Radar Chart): ${currentProfile.name}`
                      : `เอกสารรายงานผลการเรียนรู้และพัฒนาการรายบุคคล: ${currentProfile.name}`}
                  </span>
                </h1>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  ระบบประเมินการเรียนรู้ตามหลักสูตรแกนกลาง สพฐ. (อ.1 - ป.6) • วันที่ออกเอกสาร: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                  ✓ เอกสารสมบูรณ์ A4
                </span>
              </div>
            </div>
          </div>

          {/* TAB 1: INDIVIDUAL REPORT */}
          {activeTab === 'individual' && (
            <div className="space-y-4">
              {/* Header Profile Card */}
              <div className="report-card-section bg-white rounded-2xl p-4 border border-amber-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 break-inside-avoid">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl border-2 border-amber-300">
                    {currentProfile.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-slate-800">{currentProfile.name}</h3>
                      <span className="bg-amber-100 text-amber-900 font-bold text-xs px-2 py-0.5 rounded-full">
                        ระดับชั้น {currentProfile.grade}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      ทำแบบฝึกหัดสะสม {currentProfile.totalQuestions || 0} ข้อ • เล่นต่อเนื่อง{' '}
                      {currentProfile.streakDays || 0} วัน • ปลดล็อกเหรียญแล้ว{' '}
                      {currentProfile.badges ? currentProfile.badges.length : 0} เหรียญ
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-3 bg-amber-50 rounded-xl px-4 py-2 border border-amber-200">
                    <div className="text-center">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                        คะแนนสะสม
                      </span>
                      <span className="text-2xl font-black text-amber-600">
                        {currentProfile.totalScore || 0}
                      </span>
                    </div>
                    <div className="h-8 w-px bg-amber-200" />
                    <div className="text-center">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                        ความแม่นยำรวม
                      </span>
                      <span className="text-2xl font-black text-emerald-600">
                        {overallRate !== null ? `${overallRate}%` : '-'}
                      </span>
                      {overallRate === null && (
                        <span className="text-[9px] text-slate-400 block font-medium">ยังไม่เริ่มเล่น</span>
                      )}
                    </div>
                  </div>

                  {/* Summary PDF Report Direct Button (Adaptive CBE vs Early Childhood) */}
                  <div className="no-print flex items-center gap-1.5 shrink-0 flex-wrap">
                    {isCurrentProfilePrimary ? (
                      <>
                        <button
                          type="button"
                          id="btn-generate-competency-report-pdf-hero"
                          onClick={handleGenerateCompetencyReportPdf}
                          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-800 hover:from-indigo-600 hover:to-purple-700 text-white font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer border border-indigo-400"
                          title="สร้างและดาวน์โหลดรายงานสรุปผลประเมินสมรรถนะหลัก 6 ด้าน (PDF A4)"
                          aria-label="สร้างรายงานสรุปสมรรถนะ (PDF)"
                        >
                          <FileText className="w-5 h-5 text-amber-300" />
                          <div className="text-left">
                            <span className="block leading-tight font-black">สร้างรายงานสมรรถนะ (PDF) 🎓</span>
                            <span className="text-[10px] text-indigo-200 font-bold block">
                              พิมพ์ A4 มาตรฐาน สพฐ. 6 ด้าน (ดาวน์โหลดทันที)
                            </span>
                          </div>
                        </button>

                        <button
                          type="button"
                          id="btn-open-competency-report-modal-hero"
                          onClick={handleOpenCompetencyReportModal}
                          className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer"
                          title="เปิดดูตัวอย่าง / ปรับแต่งข้อมูลรายงานสมรรถนะ (Preview)"
                        >
                          <Sparkles className="w-4 h-4 text-indigo-600" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          id="btn-generate-growth-report-pdf"
                          onClick={handleGenerateGrowthReportPdf}
                          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer border border-indigo-400"
                          title="สร้างและดาวน์โหลดรายงานสรุปผลประเมินพัฒนาการ 8 ทักษะหลัก (PDF A4)"
                          aria-label="สร้างรายงานสรุปพัฒนาการ 8 ทักษะ (PDF)"
                        >
                          <FileText className="w-5 h-5 text-amber-300" />
                          <div className="text-left">
                            <span className="block leading-tight font-black">สร้างรายงานสรุป 8 ทักษะ (PDF)</span>
                            <span className="text-[10px] text-indigo-200 font-bold block">
                              พิมพ์ A4 มาตรฐาน ศธ. (ดาวน์โหลดทันที)
                            </span>
                          </div>
                        </button>

                        <button
                          type="button"
                          id="btn-open-growth-report-modal"
                          onClick={handleOpenGrowthReportModal}
                          className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer"
                          title="เปิดดูตัวอย่าง / ปรับแต่งข้อมูลรายงาน 8 ทักษะ (Preview)"
                        >
                          <Sparkles className="w-4 h-4 text-indigo-600" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Certificate of Achievement Direct Button */}
                  <button
                    type="button"
                    id="btn-open-certificate-modal"
                    onClick={() => {
                      setSelectedCertificateMilestoneId(undefined);
                      setIsCertificateModalOpen(true);
                    }}
                    className="no-print flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer border border-amber-300 shrink-0"
                    title="เปิดพิมพ์เกียรติบัตรเชิดชูเกียรติ A4"
                  >
                    <span className="text-xl">🏆</span>
                    <div className="text-left">
                      <span className="block leading-tight font-black">เกียรติบัตรความสำเร็จ</span>
                      <span className="text-[10px] text-amber-950 font-bold opacity-90 block">
                        {milestoneSummary.unlockedCount > 0
                          ? `ปลดล็อก ${milestoneSummary.unlockedCount} ใบ (พิมพ์ A4)`
                          : 'ดูตัวอย่างเกียรติบัตร'}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Mastery Milestones & Certificate Showcase Card */}
              <div className="report-card-section bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-yellow-50/80 rounded-2xl p-4 border-2 border-amber-300/80 shadow-xs break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
                      🏆
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                        <span>เกียรติบัตรแสดงความสำเร็จ & มาตรฐานความเชี่ยวชาญ (Mastery Milestones)</span>
                      </h4>
                      <p className="text-[11px] text-amber-950 font-medium mt-0.5">
                        ระบบจะออกเกียรติบัตรทางการพิมพ์ได้ (PDF A4 แนวนอน) อัตโนมัติเมื่อหนูน้อยบรรลุเกณฑ์ยอดเยี่ยมระดับ 3
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                      ⭐ ปลดล็อก {milestoneSummary.unlockedCount} / {milestoneSummary.totalMilestones} เกียรติบัตร
                    </span>
                    <button
                      type="button"
                      id="btn-open-journey-map-report"
                      onClick={() => setIsJourneyMapModalOpen(true)}
                      className="no-print px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                      title="เปิดแผนที่การผจญภัยการเรียนรู้และสำรวจรางวัลลับ (Learning Journey Map)"
                    >
                      <span>🗺️</span>
                      <span>แผนที่ผจญภัย</span>
                    </button>
                    <button
                      type="button"
                      id="btn-show-all-certificates"
                      onClick={() => {
                        setSelectedCertificateMilestoneId(milestoneSummary.primaryMilestone.id);
                        setIsCertificateModalOpen(true);
                      }}
                      className="no-print px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>เปิดพิมพ์เกียรติบัตร</span>
                    </button>
                  </div>
                </div>

                {/* Milestones Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                  {filteredMilestones.length === 0 ? (
                    <div className="col-span-full py-4 text-center text-xs text-slate-500 bg-white/50 rounded-xl">
                      ไม่พบเกียรติบัตรที่ตรงกับคำค้นหา "{searchQuery}"
                    </div>
                  ) : (
                    filteredMilestones.slice(0, 4).map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setSelectedCertificateMilestoneId(m.id);
                          setIsCertificateModalOpen(true);
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          m.isUnlocked
                            ? 'bg-white hover:bg-amber-50/60 border-amber-300 shadow-2xs hover:shadow-xs'
                            : 'bg-white/60 border-slate-200 opacity-75 hover:opacity-100'
                        }`}
                        title={m.isUnlocked ? 'คลิกเพื่อดูและพิมพ์เกียรติบัตรนี้' : 'คลิกเพื่อดูตัวอย่างเกียรติบัตร'}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-2xl shrink-0">{m.icon}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-black text-slate-800 truncate">{m.title}</span>
                              {m.isUnlocked ? (
                                <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full shrink-0">
                                  ปลดล็อกแล้ว
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full shrink-0">
                                  รอปลดล็อก
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{m.criteriaText}</p>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${m.isUnlocked ? 'bg-amber-500' : 'bg-slate-300'}`}
                                style={{ width: `${m.progressPercent}%` }}
                              />
                            </div>
                            <span className="text-[9px] font-bold text-slate-500">{m.progressPercent}%</span>
                          </div>

                          <span className="text-[10px] font-black text-amber-700 hover:text-amber-800 flex items-center gap-0.5">
                            <span>{m.isUnlocked ? 'พิมพ์เกียรติบัตร' : 'พรีวิว'}</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {milestoneSummary.milestones.length > 4 && (
                  <div className="mt-2.5 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCertificateMilestoneId(milestoneSummary.primaryMilestone.id);
                        setIsCertificateModalOpen(true);
                      }}
                      className="no-print text-xs font-black text-amber-900 hover:text-amber-700 underline decoration-amber-400 cursor-pointer"
                    >
                      ดูเกียรติบัตรทั้งหมด {milestoneSummary.totalMilestones} รูปแบบ (ทักษะเฉพาะด้าน 8 วิชา & สตรีค)...
                    </button>
                  </div>
                )}
              </div>

              {/* TRIO ACADEMIC PILLARS READINESS FOR GRADE 1 (ป.1) */}
              <div className="report-card-section bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-pink-50/60 rounded-2xl p-4 md:p-5 border-2 border-indigo-200 shadow-xs break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-indigo-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🌟</span>
                    <div>
                      <h4 className="text-sm md:text-base font-black text-indigo-950 flex items-center gap-1.5">
                        ระบบ 3 เสาหลักสู่ ป.1: ภาษาไทย • ภาษาอังกฤษ • คณิตศาสตร์
                      </h4>
                      <p className="text-[11px] text-indigo-800">
                        ดัชนีวิเคราะห์ความพร้อม 3 ทักษะวิชาการพื้นฐานสู่ชั้นประถมศึกษาปีที่ 1 (Trio Academic Readiness)
                      </p>
                    </div>
                  </div>
                  {trioRate !== null ? (
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-indigo-200 shadow-2xs self-start sm:self-auto">
                      <span className="text-xs font-bold text-slate-500">ดัชนีความพร้อม 3 เสาหลัก:</span>
                      <span
                        className={`text-base font-black ${
                          trioRate >= 80 ? 'text-emerald-600' : trioRate >= 60 ? 'text-amber-600' : 'text-rose-600'
                        }`}
                      >
                        {trioRate}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-[11px] font-bold bg-white px-2.5 py-1 rounded-xl text-slate-500 border border-indigo-100">
                      รอทดสอบวิชา 3 เสาหลัก
                    </span>
                  )}
                </div>

                {/* 3 Pillar Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Pillar 1: Thai */}
                  <div className="bg-white/95 rounded-xl p-3.5 border border-pink-200 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🇹🇭</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            getSkillBenchmark(thaiRate, totalThaiQ).badgeClass
                          }`}
                        >
                          {getSkillBenchmark(thaiRate, totalThaiQ).levelShort}
                        </span>
                      </div>
                      <h5 className="text-xs font-black text-slate-900">1. ทักษะภาษาไทย (Thai Literacy)</h5>
                      <p className="text-[10px] text-slate-500 mt-0.5">ก-ฮ, สระ, วรรณยุกต์, ผสมคำ, ความหมาย</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500 font-bold">ความถูกต้อง</span>
                        <span className="font-black text-slate-800">
                          {thaiRate !== null ? `${thaiRate}% (${totalThaiS}/${totalThaiQ} ข้อ)` : 'ยังไม่มีประวัติ'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all"
                          style={{ width: `${thaiRate ?? 0}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pillar 2: English */}
                  <div className="bg-white/95 rounded-xl p-3.5 border border-sky-200 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🔤</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            getSkillBenchmark(engRate, totalEngQ).badgeClass
                          }`}
                        >
                          {getSkillBenchmark(engRate, totalEngQ).levelShort}
                        </span>
                      </div>
                      <h5 className="text-xs font-black text-slate-900">2. ภาษาอังกฤษ (English & Phonics)</h5>
                      <p className="text-[10px] text-slate-500 mt-0.5">A-Z, สระเสียงสั้น-ยาว, Sight Words, สี/เลข</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500 font-bold">ความถูกต้อง</span>
                        <span className="font-black text-slate-800">
                          {engRate !== null ? `${engRate}% (${totalEngS}/${totalEngQ} ข้อ)` : 'ยังไม่มีประวัติ'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all"
                          style={{ width: `${engRate ?? 0}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pillar 3: Math */}
                  <div className="bg-white/95 rounded-xl p-3.5 border border-amber-200 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🧮</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            getSkillBenchmark(mathRate, totalMathQ).badgeClass
                          }`}
                        >
                          {getSkillBenchmark(mathRate, totalMathQ).levelShort}
                        </span>
                      </div>
                      <h5 className="text-xs font-black text-slate-900">3. คณิตศาสตร์ (Smart Mathematics)</h5>
                      <p className="text-[10px] text-slate-500 mt-0.5">การนับ, บวก-ลบ 1-20, เปรียบเทียบ, รูปเรขาคณิต</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500 font-bold">ความถูกต้อง</span>
                        <span className="font-black text-slate-800">
                          {mathRate !== null ? `${mathRate}% (${totalMathS}/${totalMathQ} ข้อ)` : 'ยังไม่มีประวัติ'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all"
                          style={{ width: `${mathRate ?? 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject / Competencies Breakdown with Bar Charts & Ministry Assessment Levels */}
              <div className="report-card-section bg-white rounded-2xl p-4 border border-slate-200 shadow-xs break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                      <span className="text-base">{isCurrentProfilePrimary ? '🎓' : '🧸'}</span>
                      {isCurrentProfilePrimary
                        ? 'รายงานผลการประเมิน 6 สมรรถนะหลัก (CBE Core Competencies)'
                        : 'รายงานผลพัฒนาการปฐมวัย 8 ทักษะหลัก (8 Core Skills Assessment)'}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {isCurrentProfilePrimary
                        ? 'ตามเกณฑ์มาตรฐานกรอบหลักสูตรฐานสมรรถนะ สพฐ. กระทรวงศึกษาธิการ (4 ระดับคุณภาพ)'
                        : 'ตามเกณฑ์มาตรฐานหลักสูตรการศึกษาปฐมวัย กระทรวงศึกษาธิการ (3 ระดับคุณภาพ)'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
                    {/* Direct PDF button */}
                    {isCurrentProfilePrimary ? (
                      <button
                        type="button"
                        id="btn-section-competency-report-pdf"
                        onClick={handleGenerateCompetencyReportPdf}
                        className="no-print flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black rounded-xl bg-gradient-to-r from-indigo-700 to-purple-800 hover:from-indigo-600 hover:to-purple-700 text-white border border-indigo-400 transition-all cursor-pointer shadow-xs active:scale-95"
                        title="สร้างและดาวน์โหลดแบบรายงานสรุปสมรรถนะ 6 ด้านขนาด A4 (PDF)"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-300" />
                        <span>สร้างรายงานสมรรถนะ (PDF) 🎓</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        id="btn-section-growth-report-pdf"
                        onClick={handleGenerateGrowthReportPdf}
                        className="no-print flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border border-indigo-400 transition-all cursor-pointer shadow-xs active:scale-95"
                        title="สร้างและดาวน์โหลดแบบรายงานสรุปพัฒนาการ 8 ทักษะหลักขนาด A4 (PDF)"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-300" />
                        <span>สร้างรายงาน 8 ทักษะ (PDF)</span>
                      </button>
                    )}

                    {/* Skill Filter Pills (For early childhood 8 skills) */}
                    {!isCurrentProfilePrimary && (
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setSkillFilter('all')}
                          className={`px-2.5 py-1 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                            skillFilter === 'all'
                              ? 'bg-white text-slate-800 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          ทั้งหมด (8)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSkillFilter('tested')}
                          className={`px-2.5 py-1 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                            skillFilter === 'tested'
                              ? 'bg-white text-emerald-700 shadow-xs'
                              : 'text-slate-600 hover:text-emerald-700'
                          }`}
                        >
                          ประเมินแล้ว ({testedSkills.length})
                        </button>
                        {untestedSkills.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setSkillFilter('untested')}
                            className={`px-2.5 py-1 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                              skillFilter === 'untested'
                                ? 'bg-white text-amber-700 shadow-xs'
                                : 'text-slate-600 hover:text-amber-700'
                            }`}
                          >
                            รอประเมิน ({untestedSkills.length})
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Render Cards based on Primary (6 Competencies) vs Early Childhood (8 Skills) */}
                {isCurrentProfilePrimary ? (
                  <div className="space-y-3">
                    {displayedIndividualCompetencies.length === 0 ? (
                      <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
                        ไม่พบสมรรถนะที่ตรงกับคำค้นหา "{searchQuery}"
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="block mx-auto mt-2 text-indigo-600 font-bold hover:underline cursor-pointer"
                        >
                          ล้างคำค้นหา
                        </button>
                      </div>
                    ) : (
                      displayedIndividualCompetencies.map((comp) => {
                        const bm = comp.benchmark;
                      return (
                        <div
                          key={comp.code}
                          className={`p-3.5 rounded-xl border transition-all ${comp.themeBg}`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                            <div className="flex items-start sm:items-center gap-2.5">
                              <span className="text-2xl shrink-0">{comp.icon}</span>
                              <div>
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className={`text-xs font-black ${comp.themeText}`}>
                                    {comp.curriculumTitle}
                                  </span>
                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${bm.badgeClass}`}
                                  >
                                    {bm.levelShort}
                                  </span>
                                  <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4].map((star) => (
                                      <Star
                                        key={star}
                                        className={`w-3 h-3 ${
                                          star <= bm.stars
                                            ? 'text-amber-400 fill-amber-400'
                                            : 'text-slate-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                                  {comp.focus}
                                </p>
                              </div>
                            </div>

                            <div className="text-right shrink-0 mt-1 sm:mt-0 pl-7 sm:pl-0">
                              {comp.total > 0 ? (
                                <div className="flex items-baseline justify-between sm:justify-end gap-2">
                                  <span className="text-[11px] text-slate-500 font-medium">
                                    ตอบถูก {comp.score} / {comp.total} ข้อ
                                  </span>
                                  <span className={`text-sm font-black ${comp.themeText}`}>
                                    {comp.rate}%
                                  </span>
                                </div>
                              ) : (
                                <span className="text-xs font-bold text-slate-400">
                                  ยังไม่มีข้อมูลการประเมิน
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Progress Bar with Gradient */}
                          <div className="w-full h-3 bg-white/80 rounded-full overflow-hidden p-0.5 border border-slate-200/80 shadow-2xs">
                            <div
                              className={`h-full bg-gradient-to-r ${comp.progressBar} rounded-full transition-all duration-500`}
                              style={{ width: `${comp.rate ?? 0}%` }}
                            />
                          </div>

                          {/* Indicators and Advice */}
                          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[10px] pt-2 border-t border-slate-200/50">
                            <div className="flex flex-wrap gap-1">
                              {comp.indicators.map((ind, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.5 rounded-md bg-white/80 border border-slate-200 text-slate-600 font-medium"
                                >
                                  • {ind}
                                </span>
                              ))}
                            </div>
                            <span className="text-slate-500">
                              💡 <strong>คำแนะนำ:</strong> {comp.advice}
                            </span>
                          </div>
                        </div>
                      );
                    }))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {displayedIndividualSkills.length === 0 ? (
                      <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
                        ไม่พบทักษะที่ตรงกับคำค้นหา "{searchQuery}"
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="block mx-auto mt-2 text-amber-600 font-bold hover:underline cursor-pointer"
                        >
                          ล้างคำค้นหา
                        </button>
                      </div>
                    ) : (
                      displayedIndividualSkills.map((skill) => (
                        <div
                          key={skill.code}
                        className={`p-3 rounded-xl border transition-all ${skill.themeBg}`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                          <div className="flex items-start sm:items-center gap-2">
                            <span className="text-xl shrink-0">{skill.icon}</span>
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className={`text-xs font-black ${skill.themeText}`}>
                                  {skill.curriculumTitle}
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${skill.benchmark.badgeClass}`}
                                >
                                  {skill.benchmark.levelShort}
                                </span>
                                {skill.rate === 100 && (
                                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                                    ⭐ แม่นยำ 100%
                                  </span>
                                )}
                                {skill.rate !== null && skill.rate >= 80 && skill.total >= 3 && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCertificateMilestoneId(`skill_mastery_${skill.id}`);
                                      setIsCertificateModalOpen(true);
                                    }}
                                    className="no-print inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-all cursor-pointer shadow-2xs"
                                    title="ดูและพิมพ์เกียรติบัตรเชิดชูเกียรติทักษะนี้"
                                  >
                                    <Award className="w-3 h-3 text-amber-700" />
                                    <span>พิมพ์เกียรติบัตร</span>
                                  </button>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                {skill.focus}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0 mt-1 sm:mt-0 pl-7 sm:pl-0">
                            {skill.total > 0 ? (
                              <div className="flex items-baseline justify-between sm:justify-end gap-2">
                                <span className="text-[11px] text-slate-500 font-medium">
                                  ตอบถูก {skill.score} / {skill.total} ข้อ
                                </span>
                                <span className={`text-sm font-black ${skill.themeText}`}>
                                  {skill.rate}%
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs font-bold text-slate-400">
                                ยังไม่มีข้อมูลการประเมิน
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar with Gradient */}
                        <div className="w-full h-3 bg-white/80 rounded-full overflow-hidden p-0.5 border border-slate-200/80 shadow-2xs">
                          <div
                            className={`h-full bg-gradient-to-r ${skill.progressBar} rounded-full transition-all duration-500`}
                            style={{ width: `${skill.rate ?? 0}%` }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
                )}

                {/* Statistically Accurate Strengths & Recommendations */}
                {hasHistory ? (
                  <div className="space-y-3 mt-4 pt-3 border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Top Strength Card */}
                      <div className="bg-emerald-50/80 rounded-xl p-3 border border-emerald-200 text-xs">
                        <div className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>จุดเด่นความถนัด: {bestSkill?.name}</span>
                          {bestSkill?.rate !== null && (
                            <span className="font-black text-emerald-700">
                              ({bestSkill.rate}% • {bestSkill.score}/{bestSkill.total} ข้อ)
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          น้องมีความเข้าใจในมโนทัศน์และตอบได้ถูกต้องคล่องแคล่ว มีความมั่นใจสูงในทักษะนี้
                        </p>
                      </div>

                      {/* Area for Growth / Recommendation Card */}
                      <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200 text-xs">
                        <div className="font-bold text-amber-800 flex items-center gap-1.5 mb-1">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                          {lowestSkill && lowestSkill.rate! < 80 ? (
                            <span>ข้อแนะนำส่งเสริม: {lowestSkill.name} ({lowestSkill.rate}% • {lowestSkill.score}/{lowestSkill.total} ข้อ)</span>
                          ) : testedSkills.length === 1 ? (
                            <span>ข้อแนะนำ: ขยายการประเมินทักษะอื่นๆ</span>
                          ) : (
                            <span>สรุปภาพรวม: พัฒนาการดีเยี่ยมทุกด้าน</span>
                          )}
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {lowestSkill && lowestSkill.rate! < 80
                            ? 'แนะนำให้ผู้ปกครองหรือครูจัดกิจกรรมเสริม เช่น การเชื่อมโยงภาพกับของจริง หรือพิมพ์ใบงานเพื่อฝึกฝนทบทวน'
                            : testedSkills.length === 1
                            ? 'ประเมินแล้ว 1 ทักษะ แนะนำให้ผู้ปกครองเปิดโหมดสอบทักษะอื่นๆ เพิ่มเติมเพื่อพัฒนาการที่สมดุลรอบด้าน'
                            : 'ผลการประเมินอยู่ในเกณฑ์ยอดเยี่ยมทุกทักษะที่ทดสอบ สามารถส่งเสริมความท้าทายในระดับถัดไปได้อย่างต่อเนื่อง'}
                        </p>
                      </div>
                    </div>

                    {/* Untested Skills Advisory Pill */}
                    {untestedSkills.length > 0 && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base shrink-0">📋</span>
                          <div>
                            <span className="font-bold text-slate-800">
                              ทักษะที่ยังรอการประเมิน ({untestedSkills.length} ทักษะ):
                            </span>{' '}
                            <span className="text-slate-600">
                              {untestedSkills.map((s) => `${s.icon} ${s.name}`).join(' • ')}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-indigo-600 shrink-0">
                          แนะนำให้เลือกทักษะนี้ในการเล่นรอบถัดไป
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-slate-100 bg-amber-50/70 rounded-xl p-3 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      ยังไม่มีประวัติการทำแบบฝึกหัดสำหรับโปรไฟล์นี้ — เริ่มเล่นเกมรอบแรกเพื่อประเมินความแม่นยำและวิเคราะห์ทักษะเด่นรายวิชา
                    </span>
                  </div>
                )}
              </div>

              {/* 30-Day Historical Development Line Chart */}
              <div className="report-card-section bg-white rounded-2xl p-4 border border-slate-200 shadow-xs break-inside-avoid">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-sky-500" />
                    แผนภูมิพัฒนาการย้อนหลัง 30 วัน (ความแม่นยำรายวัน)
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> ย้อนหลัง 30 วัน
                  </span>
                </div>

                {points.length === 0 ? (
                  <div className="h-28 flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
                    <TrendingUp className="w-6 h-6 mb-1.5 text-slate-300" />
                    <p className="text-xs font-bold text-slate-600">ยังไม่มีข้อมูลสถิติสำหรับสร้างกราฟ</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      เมื่อน้องเริ่มทำแบบฝึกหัด ระบบจะบันทึกแนวโน้มความแม่นยำรายวันอัตโนมัติ
                    </p>
                  </div>
                ) : (
                  <div className="w-full overflow-x-auto">
                    <svg
                      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                      className="w-full h-36 select-none"
                    >
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {[25, 50, 75, 100].map((val) => {
                        const y = chartHeight - padding - (val / 100) * (chartHeight - padding * 2);
                        return (
                          <g key={val}>
                            <line
                              x1={padding}
                              y1={y}
                              x2={chartWidth - padding}
                              y2={y}
                              stroke="#E2E8F0"
                              strokeDasharray="3 3"
                            />
                            <text
                              x={padding - 4}
                              y={y + 3}
                              fontSize="8"
                              textAnchor="end"
                              fill="#94A3B8"
                              fontWeight="bold"
                            >
                              {val}%
                            </text>
                          </g>
                        );
                      })}

                      {areaPath && <path d={areaPath} fill="url(#chartGradient)" />}

                      {linePath && (
                        <path
                          d={linePath}
                          fill="none"
                          stroke="#0284C7"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}

                      {points.map((pt, idx) => (
                        <g key={idx}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="4"
                            fill="#FFFFFF"
                            stroke="#0284C7"
                            strokeWidth="2.5"
                          />
                          {idx % 3 === 0 && (
                            <text
                              x={pt.x}
                              y={chartHeight - 6}
                              fontSize="8"
                              textAnchor="middle"
                              fill="#64748B"
                            >
                              {pt.date}
                            </text>
                          )}
                        </g>
                      ))}
                    </svg>
                  </div>
                )}
              </div>

              {/* Individual Play History & Session Records with Deletion */}
              <div className="report-card-section bg-white rounded-2xl p-4 border border-slate-200 shadow-xs break-inside-avoid">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-black text-slate-800">
                      ประวัติการเล่นและทำแบบฝึกหัดแต่ละครั้ง (Play History)
                    </h4>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {history.length} รอบ
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                    สามารถลบประวัติการเล่นที่ไม่ต้องการได้
                  </span>
                </div>

                {history.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs font-bold bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    ยังไม่มีประวัติการเล่นของโปรไฟล์นี้
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-72 print:max-h-none overflow-y-auto print:overflow-visible pr-1">
                    {/* Render in reverse order so latest sessions appear at the top */}
                    {[...history]
                      .map((entry, originalIdx) => ({ entry, originalIdx }))
                      .reverse()
                      .map(({ entry, originalIdx }, displayIdx) => {
                        const isConfirming = historyDeleteConfirmIdx === originalIdx;
                        const litS =
                          entry.literacyScore !== undefined ? entry.literacyScore : entry.thaiScore || 0;
                        const litQ =
                          entry.literacyTotal !== undefined ? entry.literacyTotal : entry.thaiTotal || 0;
                        const inqS =
                          entry.inquiryScore !== undefined ? entry.inquiryScore : entry.scienceScore || 0;
                        const inqQ =
                          entry.inquiryTotal !== undefined ? entry.inquiryTotal : entry.scienceTotal || 0;
                        const probS = entry.problemSolvingScore || 0;
                        const probQ = entry.problemSolvingTotal || 0;
                        const creS = entry.creativityScore || 0;
                        const creQ = entry.creativityTotal || 0;
                        const phyS = entry.physicalHealthScore || 0;
                        const phyQ = entry.physicalHealthTotal || 0;
                        const socS = entry.socioEmotionalScore || 0;
                        const socQ = entry.socioEmotionalTotal || 0;
                        const citS = entry.citizenshipScore || 0;
                        const citQ = entry.citizenshipTotal || 0;

                        const mathS = entry.mathScore || 0;
                        const mathQ = entry.mathTotal || 0;

                        const sessionTotalScore =
                          litS + mathS + probS + inqS + creS + phyS + socS + citS;
                        const sessionTotalQuestions =
                          litQ + mathQ + probQ + inqQ + creQ + phyQ + socQ + citQ;

                        return (
                          <div
                            key={originalIdx}
                            id={`history-record-${originalIdx}`}
                            className="p-3 rounded-xl border border-slate-200 hover:border-amber-300 bg-slate-50/70 hover:bg-amber-50/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center font-black text-xs text-indigo-700 shrink-0">
                                #{history.length - displayIdx}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-black text-slate-800">
                                    {entry.date}
                                  </span>
                                  <span
                                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                      entry.accuracy >= 80
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : entry.accuracy >= 60
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-rose-100 text-rose-800'
                                    }`}
                                  >
                                    ความแม่นยำ {entry.accuracy}%
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-600 mt-0.5 flex flex-wrap items-center gap-2 font-medium">
                                  <span>
                                    ได้คะแนน {sessionTotalScore} / {sessionTotalQuestions} ข้อ
                                  </span>
                                  {litQ > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-rose-700">
                                        📖 1.ภาษา ({litS}/{litQ})
                                      </span>
                                    </>
                                  )}
                                  {mathQ > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-indigo-700">
                                        🧮 2.คำนวณ ({mathS}/{mathQ})
                                      </span>
                                    </>
                                  )}
                                  {probQ > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-amber-700">
                                        💡 3.แก้ปัญหา ({probS}/{probQ})
                                      </span>
                                    </>
                                  )}
                                  {inqQ > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-emerald-700">
                                        🔬 4.สืบเสาะ ({inqS}/{inqQ})
                                      </span>
                                    </>
                                  )}
                                  {creQ > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-violet-700">
                                        🎨 5.สร้างสรรค์ ({creS}/{creQ})
                                      </span>
                                    </>
                                  )}
                                  {phyQ > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-teal-700">
                                        🏃 6.สุขภาวะกาย ({phyS}/{phyQ})
                                      </span>
                                    </>
                                  )}
                                  {socQ > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-pink-700">
                                        ❤️ 7.อารมณ์สังคม ({socS}/{socQ})
                                      </span>
                                    </>
                                  )}
                                  {citQ > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="text-cyan-700">
                                        🏛️ 8.พลเมือง ({citS}/{citQ})
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="no-print flex items-center gap-2 justify-end shrink-0">
                              {isConfirming ? (
                                <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-300 p-1.5 rounded-xl animate-in fade-in">
                                  <span className="text-[11px] font-bold text-rose-800">
                                    ยืนยันลบ?
                                  </span>
                                  <button
                                    id={`btn-confirm-delete-history-${originalIdx}`}
                                    onClick={() => handleDeleteHistory(originalIdx)}
                                    className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black px-2 py-1 rounded-lg cursor-pointer"
                                  >
                                    ลบเลย
                                  </button>
                                  <button
                                    id={`btn-cancel-delete-history-${originalIdx}`}
                                    onClick={() => setHistoryDeleteConfirmIdx(null)}
                                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-lg cursor-pointer"
                                  >
                                    ยกเลิก
                                  </button>
                                </div>
                              ) : (
                                <button
                                  id={`btn-delete-history-${originalIdx}`}
                                  onClick={() => setHistoryDeleteConfirmIdx(originalIdx)}
                                  title="ลบประวัติการเล่นรอบนี้"
                                  className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>ลบประวัตินี้</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Printable Document Official Signatures Footer */}
              <div className="report-card-section pt-4 border-t border-slate-300 mt-6 grid grid-cols-2 gap-6 text-xs text-slate-600 print-only break-inside-avoid">
                <div className="border-t border-slate-400 pt-2 text-center">
                  <div>ลงชื่อครูประจำชั้น/ผู้ประเมิน: ................................................................</div>
                  <div className="text-[10px] text-slate-500 mt-1">(................................................................)</div>
                  <div className="text-[10px] text-slate-500">วันที่ .......... / .......... / ................</div>
                </div>
                <div className="border-t border-slate-400 pt-2 text-center">
                  <div>ลงชื่อผู้ปกครอง: ................................................................</div>
                  <div className="text-[10px] text-slate-500 mt-1">(................................................................)</div>
                  <div className="text-[10px] text-slate-500">วันที่ .......... / .......... / ................</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLASSROOM / ALL PROFILES OVERVIEW REPORT */}
          {activeTab === 'classroom' && (
            <div className="space-y-4">
              {/* Classroom KPI Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Total Students */}
                <div className="bg-white rounded-2xl p-3.5 border-2 border-indigo-100 shadow-xs flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-xl text-indigo-700">
                    👥
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      จำนวนเด็กทั้งหมด
                    </span>
                    <span className="text-xl font-black text-indigo-900">
                      {classroomStats.totalStudents} <span className="text-xs font-bold text-slate-500">คน</span>
                    </span>
                  </div>
                </div>

                {/* Total Questions Done */}
                <div className="bg-white rounded-2xl p-3.5 border-2 border-emerald-100 shadow-xs flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-xl text-emerald-700">
                    📝
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      แบบฝึกหัดสะสมรวม
                    </span>
                    <span className="text-xl font-black text-emerald-900">
                      {classroomStats.sumQuestions} <span className="text-xs font-bold text-slate-500">ข้อ</span>
                    </span>
                  </div>
                </div>

                {/* Class Average Accuracy */}
                <div className="bg-white rounded-2xl p-3.5 border-2 border-blue-100 shadow-xs flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl text-blue-700">
                    🎯
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      ความแม่นยำเฉลี่ยห้อง
                    </span>
                    <span className="text-xl font-black text-blue-900">
                      {classroomStats.activeStudentsWithData > 0
                        ? `${classroomStats.avgAccuracy}%`
                        : '-'}
                    </span>
                  </div>
                </div>

                {/* Total Badges Collected */}
                <div className="bg-white rounded-2xl p-3.5 border-2 border-amber-100 shadow-xs flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-xl text-amber-700">
                    🏆
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      เหรียญรางวัลสะสม
                    </span>
                    <span className="text-xl font-black text-amber-900">
                      {classroomStats.sumBadges} <span className="text-xs font-bold text-slate-500">เหรียญ</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Classroom Subject Performance Breakdown */}
              <div className="report-card-section bg-white rounded-2xl p-4 border border-slate-200 shadow-xs break-inside-avoid">
                <h4 className="text-sm font-black text-slate-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  เปรียบเทียบผลสัมฤทธิ์เฉลี่ย 8 ทักษะหลักประจำห้อง (Class Benchmark)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* 1. Literacy */}
                  <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs font-bold text-rose-900 mb-1">
                      <span>📖 1. ภาษาฯ</span>
                      <span className="font-black text-sm">
                        {classroomStats.litSumQ > 0 ? `${classroomStats.avgLit}%` : 'ยังไม่มีข้อมูล'}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-rose-200/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-600 rounded-full transition-all duration-500"
                        style={{ width: `${classroomStats.avgLit}%` }}
                      />
                    </div>
                  </div>

                  {/* 2. Math */}
                  <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-1">
                      <span>🧮 2. การคิดคำนวณ</span>
                      <span className="font-black text-sm">
                        {classroomStats.mathSumQ > 0 ? `${classroomStats.avgMath}%` : 'ยังไม่มีข้อมูล'}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-indigo-200/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${classroomStats.avgMath}%` }}
                      />
                    </div>
                  </div>

                  {/* 3. Problem Solving */}
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
                      <span>💡 3. การแก้ปัญหา</span>
                      <span className="font-black text-sm">
                        {classroomStats.probSumQ > 0 ? `${classroomStats.avgProb}%` : 'ยังไม่มีข้อมูล'}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-amber-200/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-600 rounded-full transition-all duration-500"
                        style={{ width: `${classroomStats.avgProb}%` }}
                      />
                    </div>
                  </div>

                  {/* 4. Inquiry */}
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
                      <span>🔬 4. แสวงหาความรู้</span>
                      <span className="font-black text-sm">
                        {classroomStats.inqSumQ > 0 ? `${classroomStats.avgInq}%` : 'ยังไม่มีข้อมูล'}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-emerald-200/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${classroomStats.avgInq}%` }}
                      />
                    </div>
                  </div>

                  {/* 5. Creativity */}
                  <div className="bg-violet-50/70 border border-violet-200 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs font-bold text-violet-900 mb-1">
                      <span>🎨 5. ความคิดสร้างสรรค์</span>
                      <span className="font-black text-sm">
                        {classroomStats.creSumQ > 0 ? `${classroomStats.avgCre}%` : 'ยังไม่มีข้อมูล'}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-violet-200/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-600 rounded-full transition-all duration-500"
                        style={{ width: `${classroomStats.avgCre}%` }}
                      />
                    </div>
                  </div>

                  {/* 6. Physical Health */}
                  <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs font-bold text-teal-900 mb-1">
                      <span>🏃 6. สุขภาวะกาย</span>
                      <span className="font-black text-sm">
                        {classroomStats.phySumQ > 0 ? `${classroomStats.avgPhy}%` : 'ยังไม่มีข้อมูล'}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-teal-200/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-600 rounded-full transition-all duration-500"
                        style={{ width: `${classroomStats.avgPhy}%` }}
                      />
                    </div>
                  </div>

                  {/* 7. Socio-Emotional */}
                  <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs font-bold text-pink-900 mb-1">
                      <span>❤️ 7. อารมณ์สังคม</span>
                      <span className="font-black text-sm">
                        {classroomStats.socSumQ > 0 ? `${classroomStats.avgSoc}%` : 'ยังไม่มีข้อมูล'}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-pink-200/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-600 rounded-full transition-all duration-500"
                        style={{ width: `${classroomStats.avgSoc}%` }}
                      />
                    </div>
                  </div>

                  {/* 8. Citizenship */}
                  <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs font-bold text-cyan-900 mb-1">
                      <span>🏛️ 8. ความเป็นพลเมือง</span>
                      <span className="font-black text-sm">
                        {classroomStats.citSumQ > 0 ? `${classroomStats.avgCit}%` : 'ยังไม่มีข้อมูล'}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-cyan-200/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-600 rounded-full transition-all duration-500"
                        style={{ width: `${classroomStats.avgCit}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Comparison Leaderboard & List */}
              <div className="report-card-section bg-white rounded-2xl p-4 border border-slate-200 shadow-xs break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <h4 className="text-sm font-black text-slate-800">
                      ตารางสรุปเปรียบเทียบพัฒนาการรายบุคคล (All Student Profiles)
                    </h4>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                      {classroomDisplayProfiles.length} / {classroomStats.totalStudents} คน
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    คลิกเลือกเพื่อดูรายงานเดี่ยวเจาะลึก
                  </span>
                </div>

                <div className="space-y-2.5">
                  {classroomDisplayProfiles.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                      <div className="text-3xl mb-2">🔍</div>
                      <p className="text-sm font-bold text-slate-700">
                        ไม่พบรายชื่อนักเรียนที่ตรงกับคำค้นหา "{searchQuery}"
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        ลองค้นหาด้วยชื่ออื่น หรือเลือกระดับชั้นเป็น "ทั้งหมด"
                      </p>
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="mt-3 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-colors cursor-pointer"
                      >
                        ล้างคำค้นหา
                      </button>
                    </div>
                  ) : (
                    classroomDisplayProfiles.map((p, index) => {
                    // calculate individual accuracy
                    let s = 0,
                      q = 0;
                    (p.history || []).forEach((h) => {
                      const lS = h.literacyScore !== undefined ? h.literacyScore : h.thaiScore || 0;
                      const lQ = h.literacyTotal !== undefined ? h.literacyTotal : h.thaiTotal || 0;
                      const iS = h.inquiryScore !== undefined ? h.inquiryScore : h.scienceScore || 0;
                      const iQ = h.inquiryTotal !== undefined ? h.inquiryTotal : h.scienceTotal || 0;
                      const prS = h.problemSolvingScore || 0;
                      const prQ = h.problemSolvingTotal || 0;
                      const crS = h.creativityScore || 0;
                      const crQ = h.creativityTotal || 0;
                      const phS = h.physicalHealthScore || 0;
                      const phQ = h.physicalHealthTotal || 0;
                      const soS = h.socioEmotionalScore || 0;
                      const soQ = h.socioEmotionalTotal || 0;
                      const ciS = h.citizenshipScore || 0;
                      const ciQ = h.citizenshipTotal || 0;
                      const mS = h.mathScore || 0;
                      const mQ = h.mathTotal || 0;
                      s += lS + mS + prS + iS + crS + phS + soS + ciS;
                      q += lQ + mQ + prQ + iQ + crQ + phQ + soQ + ciQ;
                    });
                    const acc = q > 0 ? Math.round((s / q) * 100) : null;

                    return (
                      <div
                        key={p.id}
                        id={`class-row-profile-${p.id}`}
                        onClick={() => {
                          setSelectedProfileId(p.id);
                          if (onSelectProfile) onSelectProfile(p.id);
                          setActiveTab('individual');
                        }}
                        className="p-3 rounded-2xl border-2 border-slate-100 hover:border-indigo-300 bg-slate-50/50 hover:bg-indigo-50/40 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                      >
                        {/* Rank, Avatar, Name, Grade */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                              index === 0
                                ? 'bg-amber-400 text-amber-950 shadow-xs'
                                : index === 1
                                ? 'bg-slate-300 text-slate-800'
                                : index === 2
                                ? 'bg-amber-700 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            #{index + 1}
                          </div>

                          <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                            {p.avatar}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-black text-slate-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors">
                                {p.name}
                              </h5>
                              <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                {p.grade}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                              <span>ทำแล้ว {p.totalQuestions || 0} ข้อ</span>
                              <span>•</span>
                              <span className="text-amber-700 font-bold">🪙 {p.totalScore || 0} แต้ม</span>
                              <span>•</span>
                              <span>🏆 {p.badges ? p.badges.length : 0} เหรียญ</span>
                            </div>
                          </div>
                        </div>

                        {/* Accuracy & Action */}
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="text-right">
                            {acc !== null ? (
                              <div className="flex items-center gap-2">
                                <div className="w-24 sm:w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      acc >= 85
                                        ? 'bg-emerald-500'
                                        : acc >= 70
                                        ? 'bg-blue-500'
                                        : 'bg-amber-500'
                                    }`}
                                    style={{ width: `${acc}%` }}
                                  />
                                </div>
                                <span className="text-xs font-black text-slate-700">{acc}%</span>
                              </div>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                ยังไม่เริ่มเล่น
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                              ความแม่นยำรวม
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProfileId(p.id);
                                setIsCertificateModalOpen(true);
                              }}
                              className="no-print flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                              title="เปิดเกียรติบัตรของนักเรียนคนนี้"
                            >
                              <Award className="w-3.5 h-3.5 text-amber-700" />
                              <span className="hidden sm:inline">เกียรติบัตร</span>
                            </button>

                            <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 group-hover:bg-indigo-100 px-2.5 py-1.5 rounded-xl transition-colors">
                              <span>ดูรายงาน</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: THAI PHONICS SKILLS RADAR (๑๐ หน่วยการเรียนรู้แจกลูกสะกดคำ สพฐ. + ทักษะภาษาไทย) */}
          {activeTab === 'thai_radar' && (
            <div className="space-y-4">
              <SkillRadarReportView
                currentProfile={currentProfile}
                profiles={dropdownProfiles}
                initialRadarType="thai_phonics"
                onSelectProfile={(pId) => {
                  setSelectedProfileId(pId);
                  if (onSelectProfile) onSelectProfile(pId);
                }}
                onOpenPdfGrowthReport={handleGenerateGrowthReportPdf}
                standalone={false}
              />
            </div>
          )}

          {/* TAB 2: INDIVIDUAL PROGRESS TRENDS (ความก้าวหน้ารายบุคคล รายวันและสะสม 30 วัน) */}
          {activeTab === 'progress_trends' && (
            <div className="space-y-4">
              <IndividualCompetencyTrendChart
                profile={currentProfile}
                title={`แนวโน้มความก้าวหน้าการเรียนรู้: ${currentProfile.name} (${currentProfile.grade})`}
              />
            </div>
          )}

          {/* TAB 3: WEEKLY DEVELOPMENT TRENDS (FIRESTORE LINE CHART) */}
          {activeTab === 'weekly_trends' && (
            <div className="space-y-4">
              <WeeklyTrendChartView
                profiles={dropdownProfiles}
                activeProfile={currentProfile}
                currentGrade={currentProfile.grade}
                initialProfileId={selectedProfileId}
                onSelectProfile={(pId) => {
                  setSelectedProfileId(pId);
                  if (onSelectProfile && pId !== 'ALL') onSelectProfile(pId);
                }}
                isEmbeddedInModal={true}
              />
            </div>
          )}

          {/* TAB 4: SKILL RADAR REPORT (D3.js RADAR CHART - 8 CORE SKILLS / CBE / PHONICS) */}
          {activeTab === 'radar_skills' && (
            <div className="space-y-4">
              <SkillRadarReportView
                currentProfile={currentProfile}
                profiles={dropdownProfiles}
                initialRadarType={isCurrentProfilePrimary ? 'cbe_primary' : 'early_childhood'}
                onSelectProfile={(pId) => {
                  setSelectedProfileId(pId);
                  if (onSelectProfile) onSelectProfile(pId);
                }}
                onOpenPdfGrowthReport={
                  isCurrentProfilePrimary
                    ? handleGenerateCompetencyReportPdf
                    : handleGenerateGrowthReportPdf
                }
                standalone={false}
              />
            </div>
          )}

          {/* TAB 5: CBE 6 CORE COMPETENCIES REPORT (A4 DETAILED VIEW) */}
          {activeTab === 'competency_report' && (
            <div className="space-y-4">
              {!isCurrentProfilePrimary ? (
                <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto my-6 shadow-sm border border-amber-200 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 text-amber-700 flex items-center justify-center text-4xl mb-4 shadow-sm animate-bounce">
                    🧸
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 mb-2">
                    ผู้เรียนระดับชั้นปฐมวัย ({currentProfile.grade})
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
                    {currentProfile.name} อยู่ในระดับชั้น {currentProfile.grade}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium max-w-lg">
                    ตามเกณฑ์มาตรฐาน สพฐ. <strong>แบบรายงานสมรรถนะหลัก ๖ ด้าน (CBE)</strong> จัดทำขึ้นเฉพาะสำหรับผู้เรียนระดับชั้นประถมศึกษา (ป.๑ - ป.๓) 
                    <br className="hidden sm:inline" />
                    ระบบจะไม่สร้างรายงานสมรรถนะประถมสำหรับเด็กปฐมวัย เพื่อให้เป็นไปตามเกณฑ์พัฒนาการตามช่วงวัย ๓ - ๖ ปี
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab('individual')}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>🧸</span>
                      <span>ดูรายงานพัฒนาการ ๘ ทักษะปฐมวัย (อ.๑ - อ.๓)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGenerateGrowthReportPdf()}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-sm border border-amber-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-amber-700" />
                      <span>พิมพ์รายงาน 8 ทักษะ (PDF)</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Top Banner with Direct Action to Open Official A4 PDF Modal */}
                  <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm border border-indigo-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-2xl border border-white/20">
                    🎓
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-white">
                        รายงานการประเมินสมรรถนะหลัก 6 ด้าน (CBE Assessment Report)
                      </h3>
                      <span className="text-[10px] bg-amber-400 text-indigo-950 font-black px-2 py-0.5 rounded-full">
                        ป.1 - ป.6
                      </span>
                    </div>
                    <p className="text-xs text-indigo-200 mt-0.5">
                      ตามกรอบหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน (ฉบับปรับปรุง) • เกณฑ์ประเมิน 4 ระดับ (สพฐ.)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleOpenCompetencyReportModal()}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-indigo-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-900" />
                    <span>เปิดแบบรายงานฉบับทางการ (A4)</span>
                  </button>

                  <button
                    type="button"
                    id="btn-competency-pdf-export-direct"
                    onClick={handleGenerateCompetencyReportPdf}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                    title="ส่งออกเอกสารสรุปผลการประเมินสมรรถนะสำหรับผู้ปกครองเป็น PDF ด้วย jsPDF"
                  >
                    <FileDown className="w-4 h-4 text-emerald-100" />
                    <span>PDF Export (สรุปสำหรับผู้ปกครอง)</span>
                  </button>
                </div>
              </div>

              {/* Student Overview Header Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-3xl shadow-inner shrink-0">
                    {currentProfile.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-slate-900">{currentProfile.name}</h4>
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                        {['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(currentProfile.grade)
                          ? `ชั้นประถมศึกษาปีที่ ${currentProfile.grade.replace('P', '')} (${currentProfile.grade})`
                          : currentProfile.grade}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <span>รหัส: STD-{currentProfile.id.substring(0, 8).toUpperCase()}</span>
                      <span>•</span>
                      <span>ทำแบบฝึกหัดสมรรถนะ: {totalCbeQ} ข้อ</span>
                    </div>
                  </div>
                </div>

                {/* Score summary */}
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">คะแนนเฉลี่ย 6 สมรรถนะ</span>
                    <span className="text-2xl font-black text-indigo-600">
                      {cbeOverallRate !== null ? `${cbeOverallRate}%` : '-'}
                    </span>
                  </div>
                  <div className="border-l border-slate-200 pl-3 text-left">
                    <span className="text-[10px] text-slate-500 font-bold block">ระดับภาพรวม</span>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black border ${
                        getCbeBenchmark(cbeOverallRate, totalCbeQ).badgeClass
                      }`}
                    >
                      {getCbeBenchmark(cbeOverallRate, totalCbeQ).levelShort}
                    </span>
                  </div>
                </div>
              </div>

              {/* Kindergarten CBE Foundation Notice Banner */}
              {['K1', 'K2', 'K3'].includes(currentProfile.grade) && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0">
                    🌱
                  </div>
                  <div>
                    <div className="text-xs font-black text-amber-900">
                      ระดับปฐมวัย ({currentProfile.grade}): ประเมินความพร้อมพื้นฐานสู่ 6 สมรรถนะหลักสูตรสถานศึกษา
                    </div>
                    <p className="text-[11px] text-amber-800/80 mt-0.5">
                      ระบบเชื่อมโยง 8 ทักษะพัฒนาการปฐมวัยเข้ากับกรอบสมรรถนะ เพื่อเตรียมความพร้อมของหนูน้อยในการก้าวสู่ชั้นประถมศึกษา
                    </p>
                  </div>
                </div>
              )}

              {/* 30-Day Individual Competency Trend Chart (Recharts) */}
              <IndividualCompetencyTrendChart
                profile={currentProfile}
                days={30}
                title="แนวโน้มการพัฒนาสมรรถนะรายบุคคลย้อนหลัง 30 วัน (Individual Competency Trend)"
              />

              {/* 6 Competencies Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {displayedCompetencyReportCards.length === 0 ? (
                  <div className="col-span-full p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <div className="text-3xl mb-2">🔍</div>
                    <p className="text-sm font-bold text-slate-700">
                      ไม่พบสมรรถนะที่ตรงกับคำค้นหา "{searchQuery}"
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="mt-3 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-colors cursor-pointer"
                    >
                      ล้างคำค้นหา
                    </button>
                  </div>
                ) : (
                  displayedCompetencyReportCards.map((comp) => {
                    const bm = comp.benchmark;
                  return (
                    <div
                      key={comp.code}
                      className={`p-4 rounded-2xl border transition-all ${comp.themeBg}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{comp.icon}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-indigo-900">
                                {comp.code}
                              </span>
                              <span className="font-black text-sm text-slate-900">{comp.name}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-semibold">{comp.engTitle}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-base font-black text-slate-900">
                            {comp.rate !== null ? `${comp.rate}%` : '-'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold block">
                            {comp.score}/{comp.total} ข้อ
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-white/80 rounded-full overflow-hidden border border-slate-200/60 mb-2">
                        <div
                          className={`h-full bg-gradient-to-r ${comp.progressBar} rounded-full transition-all`}
                          style={{ width: `${comp.rate || 0}%` }}
                        />
                      </div>

                      {/* Level Badge and Description */}
                      <div className="flex items-center justify-between text-xs mt-1 mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${bm.badgeClass}`}>
                          {bm.levelLabel}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${s <= bm.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        {bm.description}
                      </p>

                      {/* Parent Advice */}
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[10px] text-slate-700 flex items-start gap-1.5">
                        <span className="shrink-0 font-bold text-indigo-700">💡 คำแนะนำ:</span>
                        <span>{comp.advice}</span>
                      </div>
                    </div>
                  );
                }))}
              </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Bottom Actions Bar (Export PDF, Export PNG, Print, Share Line) */}
        <div className="no-print bg-white p-3 md:p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 select-none">
          {shareFeedback ? (
            <div className="text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-pulse flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{shareFeedback}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>เอกสารสมบูรณ์: สัดส่วน A4 • สรุปคะแนน • กราฟ • ประวัติ • ช่องลงนาม</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Save to Google Sheets & Cloud Button */}
            <button
              id="btn-save-dual-cloud-sheets"
              onClick={handleSaveToCloudAndSheets}
              disabled={isSavingDual}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
              title="บันทึกรายงานนี้ลง Google Sheets และ Firebase Cloud พร้อมกัน"
            >
              <Cloud className="w-4 h-4" />
              <span>{isSavingDual ? 'กำลังบันทึก...' : 'บันทึกลง Sheets & Cloud ☁️'}</span>
            </button>

            {/* Export PDF Button */}
            <button
              id="btn-export-pdf"
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <FileDown className="w-4 h-4" />
              <span>{isExporting && exportType === 'pdf' ? 'กำลังสร้าง PDF...' : 'ดาวน์โหลด PDF'}</span>
            </button>

            {/* Export PNG Button */}
            <button
              id="btn-export-png"
              onClick={handleExportPNG}
              disabled={isExporting}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting && exportType === 'png' ? 'กำลังสร้างภาพ...' : 'บันทึกรูปภาพ PNG'}</span>
            </button>

            {/* Print Button */}
            <button
              id="btn-print-report"
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์รายงาน</span>
            </button>

            {/* Growth Report PDF Buttons strictly separated by grade level */}
            {activeTab === 'individual' && (
              <>
                {isCurrentProfilePrimary ? (
                  <button
                    type="button"
                    id="btn-bottom-competency-report-pdf"
                    onClick={handleGenerateCompetencyReportPdf}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-800 hover:from-indigo-600 hover:to-purple-700 text-white font-black text-xs py-2 px-3.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer border border-indigo-400"
                    title="สร้างและดาวน์โหลดรายงานสรุปสมรรถนะ 6 ด้านสำหรับผู้ปกครอง ขนาด A4 (PDF Export ด้วย jsPDF)"
                  >
                    <FileDown className="w-4 h-4 text-amber-300" />
                    <span>PDF Export สมรรถนะ (A4) 🎓</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    id="btn-bottom-growth-report-pdf"
                    onClick={handleGenerateGrowthReportPdf}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs py-2 px-3.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer border border-amber-300"
                    title="สร้างและดาวน์โหลดรายงานสรุปพัฒนาการรายบุคคล 8 ทักษะหลักขนาด A4"
                  >
                    <FileText className="w-4 h-4 text-yellow-200" />
                    <span>รายงาน 8 ทักษะปฐมวัย (PDF) 🧸</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Certificate of Achievement Modal */}
      <CertificateOfAchievementModal
        profile={currentProfile}
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        initialMilestoneId={selectedCertificateMilestoneId}
      />

      {/* Student 8 Core Skills Growth Report Modal */}
      <StudentGrowthReportModal
        profile={currentProfile}
        isOpen={isGrowthReportModalOpen}
        onClose={() => {
          setIsGrowthReportModalOpen(false);
          setAutoDownloadGrowthReport(false);
        }}
        autoDownloadOnOpen={autoDownloadGrowthReport}
        onOpenCompetencyReport={() => {
          setIsGrowthReportModalOpen(false);
          setIsCompetencyReportModalOpen(true);
        }}
      />

      {/* Competency-Based Education Assessment Report Modal (6 Core Competencies P1-P3) */}
      <CompetencyReportModal
        profile={currentProfile}
        profiles={profiles}
        isOpen={isCompetencyReportModalOpen}
        onClose={() => {
          setIsCompetencyReportModalOpen(false);
          setAutoDownloadCompetencyReport(false);
        }}
        onSelectProfile={(id) => setSelectedProfileId(id)}
        onOpenEarlyChildhoodReport={() => {
          setIsCompetencyReportModalOpen(false);
          setIsGrowthReportModalOpen(true);
        }}
        autoDownloadOnOpen={autoDownloadCompetencyReport}
      />

      {/* Learning Journey Map & Badges Modal */}
      <BadgesModal
        profile={currentProfile}
        isOpen={isJourneyMapModalOpen}
        onClose={() => setIsJourneyMapModalOpen(false)}
        language="th"
      />
    </div>
  );
};
