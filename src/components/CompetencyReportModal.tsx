import React, { useRef, useState, useMemo } from 'react';
import {
  FileText,
  FileDown,
  Download,
  Printer,
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  School,
  UserCheck,
  Star,
  Award,
  ChevronRight,
  TrendingUp,
  Brain,
  Heart,
  Share2,
  Edit3,
  Target,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { ChildProfile, Grade, Subject } from '../types';
import { exportStudentGrowthReportToPdf, exportStudentGrowthReportToPng } from '../utils/studentGrowthPdfExport';
import { exportCompetencyAssessmentSummaryToPdf } from '../utils/competencyAssessmentSummaryPdf';
import { storageService } from '../services/storageService';
import { CBE_COMPETENCIES_LIST } from '../data/skills';
import { IndividualCompetencyTrendChart } from './IndividualCompetencyTrendChart';

export interface CompetencyReportModalProps {
  profile: ChildProfile;
  profiles?: ChildProfile[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProfile?: (profileId: string) => void;
  onOpenEarlyChildhoodReport?: () => void;
  autoDownloadOnOpen?: boolean;
}

export interface CompetencyBenchmark {
  levelKey: 'level_4' | 'level_3' | 'level_2' | 'level_1' | 'untested';
  stars: number;
  levelNumber: number;
  levelLabel: string;
  levelShort: string;
  badgeBg: string;
  barColor: string;
  evalText: string;
}

export const CompetencyReportModal: React.FC<CompetencyReportModalProps> = ({
  profile,
  profiles = [],
  isOpen,
  onClose,
  onSelectProfile,
  onOpenEarlyChildhoodReport,
  autoDownloadOnOpen = false,
}) => {
  const reportRef = useRef<HTMLDivElement | null>(null);

  // School and Administrative configuration
  const savedConfig = useMemo(() => storageService.getCertificateConfig(), []);
  const [schoolName, setSchoolName] = useState<string>(
    savedConfig.schoolName || 'โรงเรียนสาธิตพัฒนาการประถมศึกษา'
  );
  const [teacherName, setTeacherName] = useState<string>(
    savedConfig.teacherName || 'ครูปิยะนันท์ การุณย์'
  );
  const [directorName, setDirectorName] = useState<string>(
    savedConfig.directorName || 'ดร.สมชาย นาวาพัฒนา'
  );
  const [academicTerm, setAcademicTerm] = useState<string>('ปีการศึกษา 2569 / ภาคเรียนที่ 1');
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);
  const [showTrendChart, setShowTrendChart] = useState<boolean>(true);

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportStatus, setExportStatus] = useState<string>('');

  const reportDate = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  // Filter available primary profiles for quick student switcher
  const primaryProfiles = useMemo(() => {
    return profiles.filter((p) => ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(p.grade));
  }, [profiles]);

  // Compute 6 CBE Competencies statistics from history
  const history = profile.history || [];

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
    // 1. Self-Management (CBE1)
    if (h.selfManagementScore !== undefined) {
      totalSelfMgmtS += h.selfManagementScore;
      totalSelfMgmtQ += h.selfManagementTotal || 0;
    } else if (h.citizenshipScore !== undefined) {
      totalSelfMgmtS += h.citizenshipScore;
      totalSelfMgmtQ += h.citizenshipTotal || 0;
    }

    // 2. Higher-Order Thinking (CBE2)
    if (h.higherOrderThinkingScore !== undefined) {
      totalHotS += h.higherOrderThinkingScore;
      totalHotQ += h.higherOrderThinkingTotal || 0;
    } else if (h.problemSolvingScore !== undefined) {
      totalHotS += h.problemSolvingScore;
      totalHotQ += h.problemSolvingTotal || 0;
    }

    // 3. Communication (CBE3)
    if (h.communicationScore !== undefined) {
      totalCommS += h.communicationScore;
      totalCommQ += h.communicationTotal || 0;
    } else {
      const litS = h.literacyScore ?? h.thaiScore ?? 0;
      const litQ = h.literacyTotal ?? h.thaiTotal ?? 0;
      totalCommS += litS;
      totalCommQ += litQ;
    }

    // 4. Teamwork & Collaboration (CBE4)
    if (h.teamworkScore !== undefined) {
      totalTeamS += h.teamworkScore;
      totalTeamQ += h.teamworkTotal || 0;
    } else if (h.socioEmotionalScore !== undefined) {
      totalTeamS += h.socioEmotionalScore;
      totalTeamQ += h.socioEmotionalTotal || 0;
    }

    // 5. Active Citizenship (CBE5)
    if (h.activeCitizenshipScore !== undefined) {
      totalActiveCitS += h.activeCitizenshipScore;
      totalActiveCitQ += h.activeCitizenshipTotal || 0;
    } else if (h.citizenshipScore !== undefined) {
      totalActiveCitS += h.citizenshipScore;
      totalActiveCitQ += h.citizenshipTotal || 0;
    }

    // 6. Sustainable Living (CBE6)
    if (h.sustainableLivingScore !== undefined) {
      totalSustS += h.sustainableLivingScore;
      totalSustQ += h.sustainableLivingTotal || 0;
    } else {
      const inqS = h.inquiryScore ?? h.scienceScore ?? 0;
      const inqQ = h.inquiryTotal ?? h.scienceTotal ?? 0;
      totalSustS += inqS;
      totalSustQ += inqQ;
    }
  });

  // Calculate percentage rates
  const selfMgmtRate = totalSelfMgmtQ > 0 ? Math.round((totalSelfMgmtS / totalSelfMgmtQ) * 100) : null;
  const hotRate = totalHotQ > 0 ? Math.round((totalHotS / totalHotQ) * 100) : null;
  const commRate = totalCommQ > 0 ? Math.round((totalCommS / totalCommQ) * 100) : null;
  const teamRate = totalTeamQ > 0 ? Math.round((totalTeamS / totalTeamQ) * 100) : null;
  const activeCitRate = totalActiveCitQ > 0 ? Math.round((totalActiveCitS / totalActiveCitQ) * 100) : null;
  const sustRate = totalSustQ > 0 ? Math.round((totalSustS / totalSustQ) * 100) : null;

  const totalAllQ =
    totalSelfMgmtQ +
    totalHotQ +
    totalCommQ +
    totalTeamQ +
    totalActiveCitQ +
    totalSustQ;
  const totalAllS =
    totalSelfMgmtS +
    totalHotS +
    totalCommS +
    totalTeamS +
    totalActiveCitS +
    totalSustS;

  const overallRate = totalAllQ > 0 ? Math.round((totalAllS / totalAllQ) * 100) : null;

  // Thai Ministry of Education CBE Assessment Benchmark (เกณฑ์การประเมินสมรรถนะ สพฐ. 4 ระดับ)
  const getCbeBenchmark = (rate: number | null, total: number): CompetencyBenchmark => {
    if (total === 0 || rate === null) {
      return {
        levelKey: 'untested',
        stars: 0,
        levelNumber: 0,
        levelLabel: 'รอประเมิน (ยังไม่มีประวัติแบบฝึกหัด)',
        levelShort: 'รอประเมิน',
        badgeBg: 'bg-slate-100 text-slate-600 border-slate-300',
        barColor: 'from-slate-300 to-slate-400',
        evalText: 'ยังไม่มีข้อมูลการฝึกทำกิจกรรมในสมรรถนะนี้ แนะนำให้เริ่มฝึกฝนผ่านกิจกรรมการเรียนรู้',
      };
    }
    if (rate >= 80) {
      return {
        levelKey: 'level_4',
        stars: 4,
        levelNumber: 4,
        levelLabel: 'ระดับ 4: เชี่ยวชาญ / ดีเยี่ยม (80-100%)',
        levelShort: 'เชี่ยวชาญ (ระดับ 4)',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        barColor: 'from-emerald-400 to-emerald-600',
        evalText: 'ปฏิบัติได้อย่างคล่องแคล่ว มีความเข้าใจเชิงลึก สามารถประยุกต์ใช้ในสถานการณ์ใหม่ได้อย่างมีประสิทธิภาพและเป็นแบบอย่างได้',
      };
    }
    if (rate >= 70) {
      return {
        levelKey: 'level_3',
        stars: 3,
        levelNumber: 3,
        levelLabel: 'ระดับ 3: คล่องแคล่ว / ดี (70-79%)',
        levelShort: 'คล่องแคล่ว (ระดับ 3)',
        badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
        barColor: 'from-blue-400 to-blue-600',
        evalText: 'ปฏิบัติได้ถูกต้องตามเกณฑ์มาตรฐาน มีความมั่นใจ และสามารถแก้ไขปัญหาเฉพาะหน้าได้ด้วยตนเองเป็นส่วนใหญ่',
      };
    }
    if (rate >= 60) {
      return {
        levelKey: 'level_2',
        stars: 2,
        levelNumber: 2,
        levelLabel: 'ระดับ 2: กำลังพัฒนา / ตามเกณฑ์ (60-69%)',
        levelShort: 'กำลังพัฒนา (ระดับ 2)',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
        barColor: 'from-amber-400 to-amber-600',
        evalText: 'ปฏิบัติได้ตามคำแนะนำ มีความเข้าใจพื้นฐาน ต้องการคำชี้แนะและการฝึกฝนเพิ่มเติมเป็นระยะเพื่อความสม่ำเสมอ',
      };
    }
    return {
      levelKey: 'level_1',
      stars: 1,
      levelNumber: 1,
      levelLabel: 'ระดับ 1: เริ่มต้น / ควรส่งเสริม (<60%)',
      levelShort: 'เริ่มต้น (ระดับ 1)',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
      barColor: 'from-rose-400 to-rose-600',
      evalText: 'อยู่ในขั้นเริ่มต้นเรียนรู้ ควรได้รับการฝึกฝนเพิ่มเติมผ่านสถานการณ์จำลอง การลงมือปฏิบัติจริง และคำแนะนำอย่างใกล้ชิด',
    };
  };

  // Structured Competencies Data array
  const competenciesData = useMemo(() => [
    {
      code: 'CBE1',
      id: 'self_management' as Subject,
      title: 'การจัดการตนเอง',
      engTitle: 'Self-Management',
      curriculumDomain: 'สมรรถนะการนำตนเองและสุขภาวะ',
      focus: 'การรู้จักตนเอง เห็นคุณค่า จัดการอารมณ์และความเครียด ตั้งเป้าหมาย วางแผนเวลา ดูแลสุขภาพ และกำกับตนเอง',
      score: totalSelfMgmtS,
      total: totalSelfMgmtQ,
      rate: selfMgmtRate,
      icon: '🎯',
      colorClass: 'text-blue-600',
      badgeBg: 'bg-blue-50 border-blue-200 text-blue-700',
      benchmark: getCbeBenchmark(selfMgmtRate, totalSelfMgmtQ),
      indicators: [
        'รู้จักและเห็นคุณค่าในตนเอง',
        'จัดการอารมณ์และเผชิญปัญหาอย่างมีสติ',
        'วางแผนเวลาและความรับผิดชอบในชีวิตประจำวัน',
        'มีสุขอนามัยและการดูแลสุขภาพที่เหมาะสม',
      ],
      parentAdvice: 'ฝึกให้ลูกเขียนตารางกิจวัตรประจำวันด้วยตนเอง สอนการเก็บที่นอน และเปิดโอกาสให้ช่วยตัดสินใจเรื่องส่วนตัว',
    },
    {
      code: 'CBE2',
      id: 'higher_order_thinking' as Subject,
      title: 'การคิดขั้นสูง',
      engTitle: 'Higher-Order Thinking',
      curriculumDomain: 'สมรรถนะกระบวนการคิดและแก้ปัญหาเชิงระบบ',
      focus: 'การคิดวิเคราะห์ คิดวิพากษ์ คิดสร้างสรรค์ และแก้ปัญหาอย่างเป็นระบบบนฐานข้อมูลและเหตุผลที่ถูกต้องรอบด้าน',
      score: totalHotS,
      total: totalHotQ,
      rate: hotRate,
      icon: '🧠',
      colorClass: 'text-violet-600',
      badgeBg: 'bg-violet-50 border-violet-200 text-violet-700',
      benchmark: getCbeBenchmark(hotRate, totalHotQ),
      indicators: [
        'วิเคราะห์แยกแยะข้อเท็จจริงและความคิดเห็น',
        'สืบเสาะและตรวจสอบข้อมูลด้วยเหตุผล',
        'คิดสร้างสรรค์และออกแบบทางเลือกใหม่',
        'แก้ปัญหาตามกระบวนการเชิงระบบ',
      ],
      parentAdvice: 'ชวนตั้งคำถาม "ทำไม" และ "ถ้าเป็นแบบนี้จะเกิดอะไรขึ้น" เมื่ออ่านข่าวหรือดูสารคดีร่วมกัน',
    },
    {
      code: 'CBE3',
      id: 'communication' as Subject,
      title: 'การสื่อสาร',
      engTitle: 'Communication',
      curriculumDomain: 'สมรรถนะภาษาและการสื่อสารร่วมสมัย',
      focus: 'การรับสารและส่งสารด้วยภาษาและสัญลักษณ์ที่หลากหลาย ถ่ายทอดความคิด ความรู้สึก และเจตนาได้อย่างชัดเจน สุภาพ และสร้างสรรค์',
      score: totalCommS,
      total: totalCommQ,
      rate: commRate,
      icon: '💬',
      colorClass: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      benchmark: getCbeBenchmark(commRate, totalCommQ),
      indicators: [
        'ฟังและอ่านอย่างตั้งใจจับใจความสำคัญ',
        'พูดและเขียนถ่ายทอดความคิดได้อย่างกระจ่าง',
        'ใช้ภาษาและกิริยาท่าทางสุภาพถูกกาลเทศะ',
        'สื่อสารผ่านสื่อดิจิทัลอย่างปลอดภัยและสร้างสรรค์',
      ],
      parentAdvice: 'เปิดพื้นที่ให้ลูกได้เล่าเรื่องราวที่โรงเรียนในแต่ละวัน ฝึกการรับฟังโดยไม่แทรก และชื่นชมการอธิบายด้วยเหตุผล',
    },
    {
      code: 'CBE4',
      id: 'teamwork_collaboration' as Subject,
      title: 'การรวมพลังทำงานเป็นทีม',
      engTitle: 'Teamwork & Collaboration',
      curriculumDomain: 'สมรรถนะมนุษยสัมพันธ์และการทำงานร่วมกัน',
      focus: 'การเป็นสมาชิกที่ดีของทีม บทบาทผู้นำและผู้ตามที่ยืดหยุ่น รับฟังและแลกเปลี่ยนอย่างสร้างสรรค์ แก้ไขความขัดแย้ง และร่วมมือสู่เป้าหมาย',
      score: totalTeamS,
      total: totalTeamQ,
      rate: teamRate,
      icon: '🤝',
      colorClass: 'text-amber-600',
      badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
      benchmark: getCbeBenchmark(teamRate, totalTeamQ),
      indicators: [
        'เคารพความหลากหลายและรับฟังความคิดเห็นผู้อื่น',
        'ปฏิบัติหน้าที่ในฐานะผู้นำและผู้ตามที่ดี',
        'ประสานงานและช่วยเหลือเพื่อนร่วมงาน',
        'จัดการความขัดแย้งด้วยสันติวิธีและการเจรจา',
      ],
      parentAdvice: 'จัดกิจกรรมทำงานบ้านร่วมกันในครอบครัว เล่นบอร์ดเกมที่ต้องร่วมมือกัน และส่งเสริมกิจกรรมกลุ่มกับเพื่อน',
    },
    {
      code: 'CBE5',
      id: 'active_citizenship' as Subject,
      title: 'การเป็นพลเมืองที่เข้มแข็ง',
      engTitle: 'Active Citizenship',
      curriculumDomain: 'สมรรถนะความเป็นพลเมืองและจิตสาธารณะ',
      focus: 'ความภาคภูมิใจในความเป็นไทย เคารพกติกา สิทธิเสรีภาพ มีจิตสาธารณะ เสียสละ และมีส่วนร่วมในการแก้ปัญหาและพัฒนาชุมชน',
      score: totalActiveCitS,
      total: totalActiveCitQ,
      rate: activeCitRate,
      icon: '🏛️',
      colorClass: 'text-rose-600',
      badgeBg: 'bg-rose-50 border-rose-200 text-rose-700',
      benchmark: getCbeBenchmark(activeCitRate, totalActiveCitQ),
      indicators: [
        'ปฏิบัติตามกฎกติกาของโรงเรียนและสังคม',
        'เคารพสิทธิ เสรีภาพ และความเสมอภาคของผู้อื่น',
        'มีความซื่อสัตย์สุจริตและยึดมั่นในคุณธรรม',
        'มีจิตสาธารณะและมีส่วนร่วมในกิจกรรมบำเพ็ญประโยชน์',
      ],
      parentAdvice: 'ชวนลูกมีส่วนร่วมในกิจกรรมจิตอาสา ปลูกฝังการเคารพกฎจราจร และการพูดคุยเกี่ยวกับสิทธิและความรับผิดชอบ',
    },
    {
      code: 'CBE6',
      id: 'sustainable_living' as Subject,
      title: 'การอยู่ร่วมกับธรรมชาติและวิทยาการอย่างยั่งยืน',
      engTitle: 'Sustainable Living with Nature & Tech',
      curriculumDomain: 'สมรรถนะสิ่งแวดล้อม วิทยาศาสตร์ และนวัตกรรมดิจิทัล',
      focus: 'ความเข้าใจความสัมพันธ์ระหว่างมนุษย์ ธรรมชาติ และเทคโนโลยี ใช้เทคโนโลยีอย่างรู้เท่าทัน ปลอดภัย อนุรักษ์ทรัพยากร และสร้างวิถีชีวิตยั่งยืน',
      score: totalSustS,
      total: totalSustQ,
      rate: sustRate,
      icon: '🌿',
      colorClass: 'text-teal-600',
      badgeBg: 'bg-teal-50 border-teal-200 text-teal-700',
      benchmark: getCbeBenchmark(sustRate, totalSustQ),
      indicators: [
        'เข้าใจระบบนิเวศและการอนุรักษ์สิ่งแวดล้อม',
        'คัดแยกขยะ ลดการใช้พลาสติก และประหยัดพลังงาน',
        'ใช้เทคโนโลยีสารสนเทศอย่างปลอดภัยและมีจริยธรรม',
        'ตระหนักถึงผลกระทบของการกระทำต่อโลกในอนาคต',
      ],
      parentAdvice: 'พาลูกปลูกต้นไม้ แยกขยะในบ้าน ฝึกปิดน้ำ-ปิดไฟเมื่อไม่ใช้ และให้คำแนะนำเรื่องการใช้อุปกรณ์ดิจิทัลอย่างปลอดภัย',
    },
  ], [
    totalSelfMgmtS, totalSelfMgmtQ, selfMgmtRate,
    totalHotS, totalHotQ, hotRate,
    totalCommS, totalCommQ, commRate,
    totalTeamS, totalTeamQ, teamRate,
    totalActiveCitS, totalActiveCitQ, activeCitRate,
    totalSustS, totalSustQ, sustRate,
  ]);

  const overallBenchmark = getCbeBenchmark(overallRate, totalAllQ);

  const level4Count = competenciesData.filter((c) => c.benchmark.levelKey === 'level_4').length;
  const level3Count = competenciesData.filter((c) => c.benchmark.levelKey === 'level_3').length;
  const level2Count = competenciesData.filter((c) => c.benchmark.levelKey === 'level_2').length;
  const level1Count = competenciesData.filter((c) => c.benchmark.levelKey === 'level_1').length;

  // Qualitative Synthesis
  const qualitativeSummary = useMemo(() => {
    const strengths = competenciesData
      .filter((c) => c.benchmark.levelKey === 'level_4' || c.benchmark.levelKey === 'level_3')
      .map((c) => `${c.icon} ${c.title} (${c.rate || 0}%)`);

    const needsFocus = competenciesData
      .filter((c) => c.benchmark.levelKey === 'level_1' || c.benchmark.levelKey === 'level_2')
      .map((c) => `${c.icon} ${c.title} (${c.rate || 0}%)`);

    let guidance = '';
    if (overallRate && overallRate >= 80) {
      guidance =
        'ผู้เรียนแสดงออกถึงสมรรถนะหลักทั้ง 6 ด้านในระดับเชี่ยวชาญยอดเยี่ยม สามารถบูรณาการความรู้ ทักษะ และเจตคติไปประยุกต์ใช้ในการแก้ปัญหาในชีวิตจริงได้อย่างมีประสิทธิภาพ ครูและผู้ปกครองควรส่งเสริมให้เป็นผู้นำกิจกรรมโครงงาน และสนับสนุนการเรียนรู้เชิงลึก';
    } else if (overallRate && overallRate >= 70) {
      guidance =
        'ผู้เรียนมีความคล่องแคล่วในสมรรถนะหลัก ปฏิบัติงานและตอบสนองต่อสถานการณ์ตามเกณฑ์มาตรฐานได้เป็นอย่างดี แนะนำให้เปิดโอกาสให้ฝึกการตัดสินใจในสถานการณ์ที่ซับซ้อนยิ่งขึ้น และเพิ่มการทำงานร่วมกับเพื่อนที่หลากหลาย';
    } else if (overallRate && overallRate >= 60) {
      guidance =
        'ผู้เรียนอยู่ในระดับกำลังพัฒนา มีความเข้าใจพื้นฐานที่ดี แนะนำให้จัดกิจกรรมแบบ Active Learning เน้นการลงมือปฏิบัติ และให้ข้อเสนอแนะเชิงบวกสม่ำเสมอ เพื่อเสริมสร้างความมั่นใจในการแสดงออกทางความคิดและการสื่อสาร';
    } else {
      guidance =
        'แนะนำให้ร่วมมือกันอย่างใกล้ชิดระหว่างบ้านและโรงเรียน จัดกิจกรรมการเรียนรู้จากประสบการณ์ตรง (Experiential Learning) ใช้สถานการณ์ใกล้ตัวเป็นโจทย์ในการฝึกฝน และเสริมแรงทางบวกเพื่อสร้างทัศนคติที่ดีต่อการพัฒนาตนเอง';
    }

    return {
      strengths: strengths.length > 0 ? strengths : ['พร้อมสำหรับการเริ่มต้นพัฒนาสมรรถนะหลักระดับประถมศึกษา'],
      needsFocus: needsFocus.length > 0 ? needsFocus : ['ส่งเสริมต่อยอดการสร้างสรรค์นวัตกรรมและการแก้ปัญหาขั้นสูง'],
      guidance,
    };
  }, [competenciesData, overallRate]);

  // Export to PDF handler using jsPDF for Parent Assessment Summary
  const handleExportPdf = async () => {
    if (!reportRef.current) return;
    try {
      setIsExporting(true);
      setExportStatus('กำลังจัดเตรียมเอกสารสรุปผลการประเมินสมรรถนะสำหรับผู้ปกครอง (A4 PDF)...');
      const filename = `สรุปผลการประเมินสมรรถนะ_${profile.name}_${profile.grade}_สำหรับผู้ปกครอง.pdf`;
      await exportCompetencyAssessmentSummaryToPdf(reportRef.current, {
        filename,
        studentName: profile.name,
        grade: gradeLabel,
        schoolName: schoolName,
        pixelRatio: 2.8,
        onProgress: (status) => setExportStatus(status),
      });
      setTimeout(() => {
        setIsExporting(false);
        setExportStatus('');
      }, 1500);
    } catch (error) {
      console.error('PDF export error:', error);
      setExportStatus('เกิดข้อผิดพลาดในการสร้าง PDF สามารถใช้ปุ่มพิมพ์รายงานแทนได้');
      setTimeout(() => setIsExporting(false), 3000);
    }
  };

  // Export to PNG handler
  const handleExportPng = async () => {
    if (!reportRef.current) return;
    try {
      setIsExporting(true);
      setExportStatus('กำลังส่งออกไฟล์รูปภาพ PNG...');
      const filename = `รายงานสมรรถนะ_ป1-ป3_${profile.name}_${profile.grade}.png`;
      await exportStudentGrowthReportToPng(reportRef.current, filename);
      setTimeout(() => {
        setIsExporting(false);
        setExportStatus('');
      }, 1500);
    } catch (error) {
      console.error('PNG export error:', error);
      setExportStatus('เกิดข้อผิดพลาดในการส่งออกภาพ');
      setTimeout(() => setIsExporting(false), 3000);
    }
  };

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // Auto download on open if requested
  React.useEffect(() => {
    if (isOpen && autoDownloadOnOpen && reportRef.current) {
      const timer = setTimeout(() => {
        handleExportPdf();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoDownloadOnOpen]);

  if (!isOpen) return null;

  const isKindergartenProfile = ['K1', 'K2', 'K3'].includes(profile.grade);

  // Grade translation
  const gradeLabel =
    profile.grade === 'P1'
      ? 'ประถมศึกษาปีที่ 1 (ป.1)'
      : profile.grade === 'P2'
      ? 'ประถมศึกษาปีที่ 2 (ป.2)'
      : profile.grade === 'P3'
      ? 'ประถมศึกษาปีที่ 3 (ป.3)'
      : profile.grade === 'P4'
      ? 'ประถมศึกษาปีที่ 4 (ป.4)'
      : profile.grade === 'P5'
      ? 'ประถมศึกษาปีที่ 5 (ป.5)'
      : profile.grade === 'P6'
      ? 'ประถมศึกษาปีที่ 6 (ป.6)'
      : profile.grade;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:overflow-visible"
      role="dialog"
      aria-modal="true"
      aria-labelledby="competency-report-modal-title"
    >
      <div className="bg-slate-100 rounded-3xl shadow-2xl w-full max-w-5xl my-auto overflow-hidden flex flex-col max-h-[96vh] print:max-h-none print:shadow-none print:bg-white print:rounded-none">
        {/* Top Control Bar (Hidden on print) */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-3.5 sm:p-4 px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-md no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-xl shadow-inner border border-white/20">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 id="competency-report-modal-title" className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>แบบรายงานสรุปผลการประเมินสมรรถนะหลัก 6 ด้าน</span>
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-500/50 text-indigo-100 border border-indigo-300/30">
                  CBE Primary (ป.1 - ป.6)
                </span>
              </div>
              <p className="text-xs text-indigo-200 font-medium">
                รายงานสรุปสมรรถนะรายบุคคลของ {profile.name} ({gradeLabel}) • ฉบับทางการ A4
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {primaryProfiles.length > 1 && onSelectProfile && (
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-xl border border-white/20">
                <span className="text-[11px] text-indigo-200">สลับนักเรียน:</span>
                <select
                  value={profile.id}
                  onChange={(e) => onSelectProfile(e.target.value)}
                  className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer"
                >
                  {primaryProfiles.map((p) => (
                    <option key={p.id} value={p.id} className="bg-indigo-900 text-white">
                      {p.name} ({p.grade})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {onOpenEarlyChildhoodReport && (
              <button
                type="button"
                onClick={onOpenEarlyChildhoodReport}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer"
                title="สลับไปดูแบบรายงาน 8 ทักษะปฐมวัย"
              >
                <span>🧸</span>
                <span className="hidden md:inline">รายงาน 8 ทักษะปฐมวัย</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowTrendChart(!showTrendChart)}
              className={`p-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                showTrendChart
                  ? 'bg-purple-600 text-white border-purple-400 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
              }`}
              title="เปิด/ปิดกราฟแนวโน้มพัฒนาการ 30 วัน"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">กราฟแนวโน้ม 30 วัน</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCustomizer(!showCustomizer)}
              className={`p-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                showCustomizer
                  ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
              }`}
              title="แก้ไขข้อมูลโรงเรียนและผู้ลงนาม"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ปรับแต่งข้อมูล</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer"
              title="พิมพ์เอกสารรายงานสมรรถนะ"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">พิมพ์</span>
            </button>

            {/* Dedicated PDF Export Button for Parents (jsPDF) */}
            <button
              type="button"
              id="btn-competency-pdf-export"
              onClick={handleExportPdf}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-black shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50 border border-emerald-300/40"
              title="ส่งออกเอกสารสรุปผลการประเมินสมรรถนะสำหรับผู้ปกครองเป็น PDF (A4) ด้วย jsPDF"
            >
              <FileDown className="w-4 h-4 text-emerald-100" />
              <span>{isExporting ? 'กำลังสร้าง PDF...' : 'PDF Export'}</span>
              <span className="hidden sm:inline text-[10px] font-bold bg-white/20 px-1.5 py-0.2 rounded-md">
                สรุปสำหรับผู้ปกครอง
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-rose-500/80 text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer ml-1"
              aria-label="ปิดหน้าต่างรายงานสมรรถนะ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customizer Drawer */}
        {showCustomizer && (
          <div className="bg-amber-50/95 border-b border-amber-200 p-4 px-6 no-print transition-all animate-fadeIn">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                  <School className="w-4 h-4" />
                  <span>ปรับแต่งข้อมูลหัวรายงานและผู้ลงนาม (สำหรับเอกสารฉบับทางการ)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCustomizer(false)}
                  className="text-amber-800 text-xs font-bold hover:underline"
                >
                  ปิดกล่องแก้ไข
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ชื่อโรงเรียน / สถานศึกษา</label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-amber-300 bg-white text-slate-900 font-semibold focus:outline-indigo-500"
                    placeholder="เช่น โรงเรียนสาธิตประถมศึกษา"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ปีการศึกษา / ภาคเรียน</label>
                  <input
                    type="text"
                    value={academicTerm}
                    onChange={(e) => setAcademicTerm(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-amber-300 bg-white text-slate-900 font-semibold focus:outline-indigo-500"
                    placeholder="เช่น ปีการศึกษา 2569 / ภาคเรียนที่ 1"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ชื่อครูประจำชั้น / ผู้ประเมิน</label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-amber-300 bg-white text-slate-900 font-semibold focus:outline-indigo-500"
                    placeholder="เช่น ครูปิยะนันท์ การุณย์"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ชื่อผู้อำนวยการ / ผู้บริหาร</label>
                  <input
                    type="text"
                    value={directorName}
                    onChange={(e) => setDirectorName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-amber-300 bg-white text-slate-900 font-semibold focus:outline-indigo-500"
                    placeholder="เช่น ดร.สมชาย นาวาพัฒนา"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Status Banner */}
        {exportStatus && (
          <div className="bg-indigo-600 text-white text-xs font-black py-2 px-4 text-center animate-pulse no-print">
            {exportStatus}
          </div>
        )}

        {/* Scrollable Printable Document Container */}
        <div className="overflow-y-auto p-3 sm:p-6 print:p-0 print:overflow-visible flex-1">
          {isKindergartenProfile ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto my-6 shadow-sm border border-amber-200 flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 text-amber-700 flex items-center justify-center text-4xl mb-4 shadow-sm animate-bounce">
                🧸
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 mb-2">
                ผู้เรียนระดับชั้นปฐมวัย ({profile.grade})
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
                {profile.name} อยู่ในระดับชั้น {profile.grade}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium max-w-lg">
                ตามเกณฑ์มาตรฐาน สพฐ. <strong>แบบรายงานสมรรถนะหลัก ๖ ด้าน (CBE)</strong> จัดทำขึ้นเฉพาะสำหรับผู้เรียนระดับชั้นประถมศึกษา (ป.๑ - ป.๓) 
                <br className="hidden sm:inline" />
                ระบบจะไม่สร้างรายงานสมรรถนะประถมสำหรับเด็กปฐมวัย เพื่อให้เป็นไปตามเกณฑ์พัฒนาการตามช่วงวัย ๓ - ๖ ปี
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                {onOpenEarlyChildhoodReport && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenEarlyChildhoodReport();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>🧸</span>
                    <span>เปิดสมุดรายงานพัฒนาการปฐมวัย (อ.๑ - อ.๓)</span>
                  </button>
                )}
                {primaryProfiles.length > 0 && onSelectProfile && (
                  <button
                    type="button"
                    onClick={() => onSelectProfile(primaryProfiles[0].id)}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-sm border border-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>🎓</span>
                    <span>สลับดูนักเรียนชั้นประถม ({primaryProfiles[0].name})</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* A4 Printable Document Root */
            <div
              ref={reportRef}
              className="growth-report-page bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 sm:p-8 md:p-10 max-w-4xl mx-auto print:border-none print:shadow-none print:p-8 print:max-w-none text-slate-900"
              style={{ minHeight: '297mm' }}
            >
              {/* 1. Official Header with Ministry & CBE Emblem */}
              <div className="border-b-2 border-indigo-900 pb-5 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-700 to-purple-800 text-white flex items-center justify-center text-3xl shadow-md border-2 border-indigo-200 shrink-0">
                    🎓
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">
                        หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน (ฐานสมรรถนะ)
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        เกณฑ์ สพฐ. 4 ระดับ
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                        ฉบับสรุปสำหรับผู้ปกครอง (Parent Summary)
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-black text-indigo-950 mt-1 leading-snug">
                      แบบรายงานสรุปผลการประเมินสมรรถนะหลักผู้เรียน
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                      Competency-Based Education Assessment Report • สำหรับผู้ปกครอง (Key Stage 1: P.1 - P.3)
                    </p>
                    <p className="text-xs text-indigo-700 font-bold mt-0.5">
                      {schoolName} • {academicTerm}
                    </p>
                  </div>
                </div>

                {/* Document Reference Stamp */}
                <div className="text-right shrink-0 hidden sm:block">
                  <div className="inline-block border-2 border-indigo-900/40 rounded-xl p-2 px-3 text-center bg-indigo-50/40">
                    <div className="text-[10px] font-black text-indigo-950 uppercase tracking-widest">
                      เอกสารประเมินทางการ
                    </div>
                    <div className="text-xs font-black text-indigo-800 mt-0.5">
                      CBE-ASSESS-{profile.grade}
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium mt-0.5">
                      วันที่ออกรายงาน: {reportDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Metadata Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">ชื่อ-นามสกุล ผู้เรียน:</span>
                  <span className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                    <span>{profile.avatar}</span>
                    <span>{profile.name}</span>
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">ระดับชั้น / กลุ่มการเรียน:</span>
                  <span className="font-black text-indigo-950 text-sm">{gradeLabel}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">รหัสประจำตัวผู้เรียน:</span>
                  <span className="font-bold text-slate-800 font-mono">
                    {profile.id ? `STD-${profile.id.substring(0, 8).toUpperCase()}` : 'STD-AUTO2026'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">ครูประจำชั้น / ผู้ประเมิน:</span>
                  <span className="font-bold text-slate-800">{teacherName}</span>
                </div>
              </div>
            </div>

            {/* 2. Overall Competency Achievement Summary Card */}
            <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col items-center justify-center shrink-0 shadow-md border-2 border-white">
                    <span className="text-2xl sm:text-3xl font-black">
                      {overallRate !== null ? `${overallRate}%` : '-'}
                    </span>
                    <span className="text-[10px] font-black uppercase text-indigo-200">คะแนนเฉลี่ย</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-indigo-900">
                        ผลการประเมินสมรรถนะภาพรวม (Overall CBE Level):
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-black border shadow-2xs ${overallBenchmark.badgeBg}`}>
                        {overallBenchmark.levelLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 my-1.5">
                      {[1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= overallBenchmark.stars
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-black text-slate-700 ml-1.5">
                        {overallBenchmark.levelShort}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium leading-relaxed mt-1">
                      {overallBenchmark.evalText}
                    </p>
                  </div>
                </div>

                {/* Level Distribution Summary Chips */}
                <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-indigo-200/80 shrink-0 flex md:flex-col gap-2 justify-around">
                  <div className="text-[11px] font-black text-slate-700 mb-0.5 hidden md:block">
                    สถิติการบรรลุสมรรถนะ (6 ด้าน):
                  </div>
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                      เชี่ยวชาญ: {level4Count}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-blue-100 text-blue-800 font-bold border border-blue-200">
                      คล่องแคล่ว: {level3Count}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800 font-bold border border-amber-200">
                      กำลังพัฒนา: {level2Count}
                    </span>
                    {level1Count > 0 && (
                      <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 font-bold border border-rose-200">
                        เริ่มต้น: {level1Count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Detailed Competency Breakdown Table (6 Core Competencies) */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-black text-indigo-950 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-600" />
                  <span>ตารางวิเคราะห์ผลการประเมินจำแนกตาม 6 สมรรถนะหลัก (CBE Core Competencies)</span>
                </h3>
                <span className="text-[10px] text-slate-500 font-bold">
                  ข้อคำถามสะสมรวม: {totalAllQ} ข้อ • ผ่านเกณฑ์ {totalAllS} ข้อ
                </span>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-indigo-950 text-white font-black text-[11px]">
                      <th className="py-2.5 px-3 w-16 text-center">รหัส</th>
                      <th className="py-2.5 px-3">สมรรถนะหลัก / ขอบข่ายและพฤติกรรมบ่งชี้</th>
                      <th className="py-2.5 px-3 w-28 text-center">คะแนน / ร้อยละ</th>
                      <th className="py-2.5 px-3 w-36 text-center">ระดับสมรรถนะ</th>
                      <th className="py-2.5 px-3 hidden sm:table-cell">ผลการประเมินเชิงคุณภาพ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {competenciesData.map((comp, idx) => {
                      const bm = comp.benchmark;
                      return (
                        <tr
                          key={comp.code}
                          className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70 hover:bg-slate-50'}
                        >
                          {/* Code & Icon */}
                          <td className="py-3 px-3 text-center align-top">
                            <span className="inline-block px-2 py-1 rounded-lg text-xs font-black bg-indigo-100 text-indigo-900 border border-indigo-300">
                              {comp.code}
                            </span>
                            <div className="text-xl mt-1">{comp.icon}</div>
                          </td>

                          {/* Competency Name & Domain */}
                          <td className="py-3 px-3 align-top">
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-slate-900 text-sm">
                                {comp.title}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium">
                                ({comp.engTitle})
                              </span>
                            </div>
                            <div className="text-[11px] text-indigo-700 font-bold mt-0.5">
                              {comp.curriculumDomain}
                            </div>
                            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed line-clamp-2">
                              {comp.focus}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {comp.indicators.map((ind, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200"
                                >
                                  • {ind}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Score & Rate */}
                          <td className="py-3 px-3 align-top text-center">
                            <div className="font-black text-sm text-slate-900">
                              {comp.rate !== null ? `${comp.rate}%` : '-'}
                            </div>
                            <div className="text-[10px] text-slate-500 font-bold mt-0.5">
                              {comp.score}/{comp.total} ข้อ
                            </div>
                            {/* Mini Progress Bar */}
                            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${bm.barColor} rounded-full transition-all`}
                                style={{ width: `${comp.rate || 0}%` }}
                              />
                            </div>
                          </td>

                          {/* Level Badge & Stars */}
                          <td className="py-3 px-3 align-top text-center">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black border ${bm.badgeBg}`}>
                              {bm.levelShort}
                            </span>
                            <div className="flex items-center justify-center gap-0.5 mt-1.5">
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
                          </td>

                          {/* Qualitative Narrative */}
                          <td className="py-3 px-3 align-top hidden sm:table-cell">
                            <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                              {bm.evalText}
                            </p>
                            <div className="mt-2 p-1.5 rounded-lg bg-amber-50/80 border border-amber-200/70 text-[10px] text-amber-900">
                              <span className="font-bold">💡 ข้อแนะนำ:</span> {comp.parentAdvice}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Individual Competency Trend Chart (Recharts 30-Day Trend) */}
            {showTrendChart && (
              <div className="mb-6">
                <IndividualCompetencyTrendChart
                  profile={profile}
                  days={30}
                  title="แนวโน้มพัฒนาการสมรรถนะรายบุคคลย้อนหลัง 30 วัน (Individual Competency Trend)"
                />
              </div>
            )}

            {/* 5. Qualitative Synthesis & Recommendations (จุดเด่น & โอกาสการพัฒนา) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Strengths Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-900 font-black text-xs mb-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>สมรรถนะที่โดดเด่นและเป็นจุดแข็ง (Key Competency Strengths)</span>
                </div>
                <div className="space-y-1.5 text-xs text-emerald-950 font-medium">
                  {qualitativeSummary.strengths.map((str, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Opportunities Card */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-black text-xs mb-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>สมรรถนะที่ควรส่งเสริมและต่อยอด (Growth Opportunities)</span>
                </div>
                <div className="space-y-1.5 text-xs text-amber-950 font-medium">
                  {qualitativeSummary.needsFocus.map((opp, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{opp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pedagogical Guidance for Teachers and Parents */}
            <div className="mb-6 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-xs">
              <div className="flex items-center gap-2 text-indigo-950 font-black mb-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>แนวทางการจัดการเรียนรู้ฐานสมรรถนะ (Competency-Based Pedagogical Guidance)</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {qualitativeSummary.guidance}
              </p>
            </div>

            {/* Parent Assessment Guidance & Home Activities */}
            <div className="mb-6 p-4.5 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-teal-50/60 to-blue-50/80 border-2 border-emerald-200 text-xs shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-emerald-950 font-black">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>คำแนะนำสำหรับผู้ปกครองในการส่งเสริมและต่อยอดสมรรถนะที่บ้าน (Home Guidance for Parents)</span>
                </div>
                <span className="text-[10px] bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full">
                  ความร่วมมือบ้านและโรงเรียน
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed mb-3">
                การพัฒนาสมรรถนะของเด็กวัยประถมศึกษาตอนต้นจะเกิดขึ้นได้เต็มศักยภาพเมื่อบ้านและโรงเรียนร่วมมือกันอย่างต่อเนื่อง ผู้ปกครองสามารถนำข้อสังเกตจากรายงานฉบับนี้ไปปรับใช้ในชีวิตประจำวันได้ดังนี้:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-[11px]">
                <div className="p-2.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="font-black text-blue-900 flex items-center gap-1 mb-1">
                    <span>🎯</span>
                    <span>การจัดการตนเอง:</span>
                  </div>
                  <span className="text-slate-600">ฝึกตั้งเป้าหมายประจำวัน จัดตารางเวลาทำการบ้าน และเปิดโอกาสให้เด็กได้เลือกตัดสินใจด้วยตนเอง</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="font-black text-purple-900 flex items-center gap-1 mb-1">
                    <span>🧠</span>
                    <span>การคิดขั้นสูง:</span>
                  </div>
                  <span className="text-slate-600">ชวนคุยด้วยคำถามปลายเปิด "เพราะเหตุใด" และ "ถ้าเป็นลูกจะแก้ปัญหานี้อย่างไร" ในสถานการณ์จริง</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="font-black text-emerald-900 flex items-center gap-1 mb-1">
                    <span>💬</span>
                    <span>การสื่อสาร:</span>
                  </div>
                  <span className="text-slate-600">รับฟังความรู้สึกของเด็กอย่างตั้งใจโดยไม่ตัดสิน พร้อมส่งเสริมให้แสดงความคิดเห็นด้วยความสุภาพ</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="font-black text-amber-900 flex items-center gap-1 mb-1">
                    <span>🤝</span>
                    <span>การทำงานเป็นทีม:</span>
                  </div>
                  <span className="text-slate-600">มอบหมายงานบ้านที่ต้องทำร่วมกับคนในครอบครัว เช่น ทำอาหาร ปลูกต้นไม้ หรือจัดห้องร่วมกัน</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="font-black text-rose-900 flex items-center gap-1 mb-1">
                    <span>🏛️</span>
                    <span>พลเมืองที่เข้มแข็ง:</span>
                  </div>
                  <span className="text-slate-600">เป็นแบบอย่างในการเคารพกติกา มีน้ำใจช่วยเหลือผู้อื่น และรู้จักการแบ่งปันในชุมชน</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="font-black text-teal-900 flex items-center gap-1 mb-1">
                    <span>🌿</span>
                    <span>อยู่ร่วมกับธรรมชาติ:</span>
                  </div>
                  <span className="text-slate-600">พาลูกสัมผัสธรรมชาติ คัดแยกขยะ ปิดไฟประหยัดพลังงาน และใช้อุปกรณ์ดิจิทัลอย่างรู้เวลา</span>
                </div>
              </div>
            </div>

            {/* 5. Official Signatures and Certification Area */}
            <div className="border-t-2 border-slate-300 pt-6 mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center text-xs">
                {/* Teacher Signature */}
                <div className="flex flex-col items-center">
                  <div className="w-36 sm:w-44 border-b border-slate-400 mb-2 h-10 flex items-end justify-center pb-1">
                    <span className="font-serif italic text-slate-600 text-sm">{teacherName}</span>
                  </div>
                  <span className="font-bold text-slate-800">({teacherName})</span>
                  <span className="text-slate-500 text-[10px] mt-0.5">ครูประจำชั้น / ผู้ประเมินสมรรถนะ</span>
                  <span className="text-slate-400 text-[9px] mt-0.5">วันที่: {reportDate}</span>
                </div>

                {/* Official School Seal Stamp */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-indigo-300 flex flex-col items-center justify-center text-indigo-400 p-1">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500 mb-0.5" />
                    <span className="text-[8px] font-black uppercase text-indigo-700">ตราประทับ</span>
                    <span className="text-[7px] text-slate-500">สถานศึกษา</span>
                  </div>
                </div>

                {/* Director Signature */}
                <div className="flex flex-col items-center">
                  <div className="w-36 sm:w-44 border-b border-slate-400 mb-2 h-10 flex items-end justify-center pb-1">
                    <span className="font-serif italic text-slate-600 text-sm">{directorName}</span>
                  </div>
                  <span className="font-bold text-slate-800">({directorName})</span>
                  <span className="text-slate-500 text-[10px] mt-0.5">ผู้อำนวยการสถานศึกษา / ผู้บริหาร</span>
                  <span className="text-slate-400 text-[9px] mt-0.5">วันที่: {reportDate}</span>
                </div>

                {/* Parent Acknowledgment Signature */}
                <div className="flex flex-col items-center">
                  <div className="w-36 sm:w-44 border-b border-slate-400 mb-2 h-10 flex items-end justify-center pb-1">
                    <span className="text-slate-300 text-xs italic">ลงชื่อผู้ปกครอง</span>
                  </div>
                  <span className="font-bold text-slate-800">(..................................................)</span>
                  <span className="text-slate-500 text-[10px] mt-0.5">ผู้ปกครองรับทราบผลการประเมิน</span>
                  <span className="text-slate-400 text-[9px] mt-0.5">วันที่: ...... / ...... / ..........</span>
                </div>
              </div>

              {/* Bottom Verification Footer */}
              <div className="flex flex-wrap items-center justify-between text-[9px] text-slate-400 font-medium border-t border-slate-200 mt-6 pt-3">
                <span>
                  เอกสารนี้ประมวลผลจากระบบประเมินสมรรถนะผู้เรียนอัตโนมัติ (CBE Assessment & Practice System)
                </span>
                <span>
                  รหัสตรวจสอบเอกสาร: CBE-{profile.id ? profile.id.substring(0, 8).toUpperCase() : 'AUTH'}-{new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
          )}
        </div>

        {/* Bottom Floating Control Bar (Hidden on print) */}
        {!isKindergartenProfile && (
          <div className="bg-white border-t border-slate-200 p-3 sm:p-4 px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-lg no-print">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>พร้อมส่งออกเอกสารรายงานสมรรถนะมาตรฐานสำหรับผู้ปกครองขนาด A4 หรือพิมพ์ได้ทันที</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleExportPng}
                disabled={isExporting}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-300 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>ส่งออกภาพ PNG</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>พิมพ์รายงาน (Print)</span>
              </button>

              {/* Dedicated Bottom PDF Export Button */}
              <button
                type="button"
                id="btn-bottom-competency-pdf-export"
                onClick={handleExportPdf}
                disabled={isExporting}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                title="ส่งออกและดาวน์โหลดเอกสารสรุปผลการประเมินสำหรับผู้ปกครอง (PDF Export ด้วย jsPDF)"
              >
                <FileDown className="w-4 h-4 text-emerald-200" />
                <span>
                  {isExporting
                    ? 'กำลังประมวลผล PDF...'
                    : 'PDF Export • สรุปประเมินสำหรับผู้ปกครอง (A4)'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
