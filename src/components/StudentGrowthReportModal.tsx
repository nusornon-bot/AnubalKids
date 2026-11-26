import React, { useRef, useState, useMemo } from 'react';
import {
  FileText,
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
} from 'lucide-react';
import { ChildProfile, Grade } from '../types';
import { exportStudentGrowthReportToPdf, exportStudentGrowthReportToPng } from '../utils/studentGrowthPdfExport';
import { storageService } from '../services/storageService';

export interface StudentGrowthReportModalProps {
  profile: ChildProfile;
  isOpen: boolean;
  onClose: () => void;
  autoDownloadOnOpen?: boolean;
  onOpenCompetencyReport?: () => void;
}

export const StudentGrowthReportModal: React.FC<StudentGrowthReportModalProps> = ({
  profile,
  isOpen,
  onClose,
  autoDownloadOnOpen = false,
  onOpenCompetencyReport,
}) => {
  const reportRef = useRef<HTMLDivElement | null>(null);

  // Load or fallback config for school/teacher
  const savedConfig = useMemo(() => storageService.getCertificateConfig(), []);
  const [schoolName, setSchoolName] = useState<string>(
    savedConfig.schoolName || 'โรงเรียนอนุบาลสาธิตพัฒนาการปฐมวัย'
  );
  const [teacherName, setTeacherName] = useState<string>(
    savedConfig.teacherName || 'ครูปิยะนันท์ การุณย์'
  );
  const [directorName, setDirectorName] = useState<string>(
    savedConfig.directorName || 'ดร.สมชาย นาวาพัฒนา'
  );
  const [academicTerm, setAcademicTerm] = useState<string>('ปีการศึกษา 2569 / ภาคเรียนที่ 1');
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);

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

  // Compute 8 core skills statistics from profile.history
  const history = profile.history || [];

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

  history.forEach((h) => {
    totalLitS += h.literacyScore !== undefined ? h.literacyScore : h.thaiScore || 0;
    totalLitQ += h.literacyTotal !== undefined ? h.literacyTotal : h.thaiTotal || 0;
    totalMathS += h.mathScore || 0;
    totalMathQ += h.mathTotal || 0;
    totalProbS += h.problemSolvingScore || 0;
    totalProbQ += h.problemSolvingTotal || 0;
    totalInqS += h.inquiryScore !== undefined ? h.inquiryScore : h.scienceScore || 0;
    totalInqQ += h.inquiryTotal !== undefined ? h.inquiryTotal : h.scienceTotal || 0;
    totalCreS += h.creativityScore || 0;
    totalCreQ += h.creativityTotal || 0;
    totalPhyS += h.physicalHealthScore || 0;
    totalPhyQ += h.physicalHealthTotal || 0;
    totalSocS += h.socioEmotionalScore || 0;
    totalSocQ += h.socioEmotionalTotal || 0;
    totalCitS += h.citizenshipScore || 0;
    totalCitQ += h.citizenshipTotal || 0;
  });

  const totalAllQ =
    totalLitQ +
    totalMathQ +
    totalProbQ +
    totalInqQ +
    totalCreQ +
    totalPhyQ +
    totalSocQ +
    totalCitQ;
  const totalAllS =
    totalLitS +
    totalMathS +
    totalProbS +
    totalInqS +
    totalCreS +
    totalPhyS +
    totalSocS +
    totalCitS;

  const litRate = totalLitQ > 0 ? Math.round((totalLitS / totalLitQ) * 100) : null;
  const mathRate = totalMathQ > 0 ? Math.round((totalMathS / totalMathQ) * 100) : null;
  const probRate = totalProbQ > 0 ? Math.round((totalProbS / totalProbQ) * 100) : null;
  const inqRate = totalInqQ > 0 ? Math.round((totalInqS / totalInqQ) * 100) : null;
  const creRate = totalCreQ > 0 ? Math.round((totalCreS / totalCreQ) * 100) : null;
  const phyRate = totalPhyQ > 0 ? Math.round((totalPhyS / totalPhyQ) * 100) : null;
  const socRate = totalSocQ > 0 ? Math.round((totalSocS / totalSocQ) * 100) : null;
  const citRate = totalCitQ > 0 ? Math.round((totalCitS / totalCitQ) * 100) : null;
  const overallRate = totalAllQ > 0 ? Math.round((totalAllS / totalAllQ) * 100) : null;

  // Thai Ministry of Education Early Childhood Benchmark function
  const getBenchmark = (rate: number | null, total: number) => {
    if (total === 0 || rate === null) {
      return {
        levelKey: 'untested' as const,
        stars: 0,
        levelNumber: 0,
        levelLabel: 'รอประเมิน (ยังไม่มีประวัติ)',
        levelShort: 'รอประเมิน',
        badgeBg: 'bg-slate-100 text-slate-600 border-slate-300',
        barColor: 'from-slate-300 to-slate-400',
        evalText: 'ยังไม่มีข้อมูลการฝึกทำกิจกรรมในทักษะนี้ แนะนำให้เริ่มฝึกฝนเพื่อประเมินพัฒนาการ',
      };
    }
    if (rate >= 80) {
      return {
        levelKey: 'level_3' as const,
        stars: 3,
        levelNumber: 3,
        levelLabel: 'ระดับ 3: ดีเยี่ยม (80-100%)',
        levelShort: 'ดีเยี่ยม (ระดับ 3)',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        barColor: 'from-emerald-400 to-emerald-600',
        evalText: 'มีความเข้าใจแม่นยำ ปฏิบัติได้อย่างคล่องแคล่ว มั่นใจและสามารถนำไปประยุกต์ใช้ได้ดีเยี่ยม',
      };
    }
    if (rate >= 60) {
      return {
        levelKey: 'level_2' as const,
        stars: 2,
        levelNumber: 2,
        levelLabel: 'ระดับ 2: ตามเกณฑ์ (60-79%)',
        levelShort: 'ตามเกณฑ์ (ระดับ 2)',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
        barColor: 'from-amber-400 to-amber-600',
        evalText: 'มีความเข้าใจตามเกณฑ์มาตรฐานหลักสูตร อาจมีข้อที่ต้องชี้แนะเป็นบางครั้งเพื่อความมั่นใจ',
      };
    }
    return {
      levelKey: 'level_1' as const,
      stars: 1,
      levelNumber: 1,
      levelLabel: 'ระดับ 1: ควรส่งเสริม (<60%)',
      levelShort: 'ควรส่งเสริม (ระดับ 1)',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
      barColor: 'from-rose-400 to-rose-600',
      evalText: 'ควรได้รับการฝึกฝนเพิ่มเติมผ่านกิจกรรมการเรียนรู้ ประสบการณ์จริง และสื่อรูปธรรม',
    };
  };

  const coreSkillsData = useMemo(
    () => [
      {
        code: '1',
        title: 'ภาษาและการรู้หนังสือ',
        engTitle: 'Language & Early Literacy',
        curriculumDomain: 'ทักษะทางภาษาและวรรณกรรม',
        focus: 'การฟัง การพูด การอ่านภาพ สัญลักษณ์ ตัวอักษร และการสื่อความหมายในชีวิตประจำวัน',
        score: totalLitS,
        total: totalLitQ,
        rate: litRate,
        icon: '📖',
        benchmark: getBenchmark(litRate, totalLitQ),
      },
      {
        code: '2',
        title: 'การคิดรวบยอดและการคิดคำนวณ',
        engTitle: 'Math & Conceptual Thinking',
        curriculumDomain: 'ทักษะคณิตศาสตร์ปฐมวัย',
        focus: 'การสังเกต จำแนก เปรียบเทียบ จัดกลุ่ม จำนวน ตัวเลข แบบรูปและมิติสัมพันธ์',
        score: totalMathS,
        total: totalMathQ,
        rate: mathRate,
        icon: '🧮',
        benchmark: getBenchmark(mathRate, totalMathQ),
      },
      {
        code: '3',
        title: 'การคิดแก้ปัญหาและตัดสินใจ',
        engTitle: 'Problem Solving & Decision',
        curriculumDomain: 'ทักษะกระบวนการคิดและตัดสินใจ',
        focus: 'การระบุปัญหา ค้นหาสาเหตุ ลองถูกลองผิด คิดวิเคราะห์อย่างมีเหตุผลและตัดสินใจ',
        score: totalProbS,
        total: totalProbQ,
        rate: probRate,
        icon: '💡',
        benchmark: getBenchmark(probRate, totalProbQ),
      },
      {
        code: '4',
        title: 'การแสวงหาความรู้',
        engTitle: 'Inquiry & Exploration',
        curriculumDomain: 'ทักษะกระบวนการทางวิทยาศาสตร์',
        focus: 'การตั้งคำถาม สังเกต สำรวจสิ่งแวดล้อม วางแผนทดลอง ปฏิสัมพันธ์กับธรรมชาติและสิ่งรอบตัว',
        score: totalInqS,
        total: totalInqQ,
        rate: inqRate,
        icon: '🔬',
        benchmark: getBenchmark(inqRate, totalInqQ),
      },
      {
        code: '5',
        title: 'จินตนาการและความคิดสร้างสรรค์',
        engTitle: 'Creativity & Imagination',
        curriculumDomain: 'ความคิดสร้างสรรค์และสุนทรียภาพ',
        focus: 'การถ่ายทอดความคิดแปลกใหม่ ความยืดหยุ่นทางความคิด จินตนาการ และศิลปะ',
        score: totalCreS,
        total: totalCreQ,
        rate: creRate,
        icon: '🎨',
        benchmark: getBenchmark(creRate, totalCreQ),
      },
      {
        code: '6',
        title: 'ด้านสุขภาวะทางกาย',
        engTitle: 'Physical Health & Motor Skills',
        curriculumDomain: 'พัฒนาการด้านร่างกายและการเคลื่อนไหว',
        focus: 'สุขอนามัย โภชนาการ ความปลอดภัย การเคลื่อนไหว กล้ามเนื้อมัดใหญ่-เล็ก และการประสานตา-มือ',
        score: totalPhyS,
        total: totalPhyQ,
        rate: phyRate,
        icon: '🏃',
        benchmark: getBenchmark(phyRate, totalPhyQ),
      },
      {
        code: '7',
        title: 'ด้านอารมณ์ จิตใจ และสังคม',
        engTitle: 'Socio-Emotional Development',
        curriculumDomain: 'พัฒนาการด้านอารมณ์ จิตใจ และสังคม',
        focus: 'การรู้เท่าทันและจัดการอารมณ์ตนเอง การกำกับตนเอง การแบ่งปัน ความเห็นอกเห็นใจ และการอยู่ร่วมกับผู้อื่น',
        score: totalSocS,
        total: totalSocQ,
        rate: socRate,
        icon: '❤️',
        benchmark: getBenchmark(socRate, totalSocQ),
      },
      {
        code: '8',
        title: 'ด้านความเป็นพลเมืองและความเป็นไทย',
        engTitle: 'Citizenship & Cultural Ethics',
        curriculumDomain: 'คุณธรรม จริยธรรม และความเป็นพลเมือง',
        focus: 'มารยาทไทย วัฒนธรรม กติกาข้อตกลง วินัย ความพอเพียง การอนุรักษ์ธรรมชาติ และจิตสาธารณะ',
        score: totalCitS,
        total: totalCitQ,
        rate: citRate,
        icon: '🇹🇭',
        benchmark: getBenchmark(citRate, totalCitQ),
      },
    ],
    [
      totalLitS,
      totalLitQ,
      litRate,
      totalMathS,
      totalMathQ,
      mathRate,
      totalProbS,
      totalProbQ,
      probRate,
      totalInqS,
      totalInqQ,
      inqRate,
      totalCreS,
      totalCreQ,
      creRate,
      totalPhyS,
      totalPhyQ,
      phyRate,
      totalSocS,
      totalSocQ,
      socRate,
      totalCitS,
      totalCitQ,
      citRate,
    ]
  );

  const overallBenchmark = getBenchmark(overallRate, totalAllQ);

  const level3Skills = coreSkillsData.filter((s) => s.benchmark.levelKey === 'level_3');
  const level2Skills = coreSkillsData.filter((s) => s.benchmark.levelKey === 'level_2');
  const level1Skills = coreSkillsData.filter((s) => s.benchmark.levelKey === 'level_1');
  const level3Count = level3Skills.length;

  // Qualitative growth advice
  const growthRecommendations = useMemo(() => {
    const recs: { strengths: string[]; opportunities: string[]; guidance: string } = {
      strengths: [],
      opportunities: [],
      guidance: '',
    };

    if (level3Skills.length > 0) {
      recs.strengths = level3Skills.map((s) => `${s.icon} ${s.title}`);
    } else if (level2Skills.length > 0) {
      recs.strengths = level2Skills.map((s) => `${s.icon} ${s.title}`);
    } else {
      recs.strengths = ['พร้อมสำหรับการเริ่มต้นพัฒนาทักษะปฐมวัย'];
    }

    if (level1Skills.length > 0) {
      recs.opportunities = level1Skills.map((s) => `${s.icon} ${s.title}`);
    } else if (level2Skills.length > 0) {
      recs.opportunities = level2Skills.map((s) => `${s.icon} ${s.title}`);
    } else {
      recs.opportunities = ['ส่งเสริมต่อยอดสู่ระดับสร้างสรรค์ขั้นสูงและการคิดวิเคราะห์'];
    }

    if (overallRate && overallRate >= 80) {
      recs.guidance =
        'ผู้เรียนมีพัฒนาการครอบคลุม 8 ทักษะหลักในเกณฑ์ยอดเยี่ยม มีความมั่นใจสูง แนะนำให้จัดกิจกรรมต่อยอดการแก้ปัญหาในสถานการณ์จริง และส่งเสริมบทบาทผู้นำกลุ่ม';
    } else if (overallRate && overallRate >= 60) {
      recs.guidance =
        'ผู้เรียนมีพัฒนาการผ่านเกณฑ์มาตรฐานในระดับดี แนะนำให้ฝึกฝนกิจกรรมซ้ำอย่างสม่ำเสมอผ่านสื่อของจริงและการเล่นแบบมีเป้าหมายเพื่อยกระดับความแม่นยำ';
    } else {
      recs.guidance =
        'แนะนำให้ร่วมมือกันระหว่างบ้านและโรงเรียน จัดกิจกรรมการเรียนรู้ผ่านการเล่น (Play-based Learning) เน้นการลงมือปฏิบัติจริง และให้กำลังใจเชิงบวกสม่ำเสมอ';
    }

    return recs;
  }, [level3Skills, level2Skills, level1Skills, overallRate]);

  // Handle Export to A4 PDF
  const handleExportPdf = async () => {
    if (!reportRef.current) return;
    try {
      setIsExporting(true);
      setExportStatus('กำลังสร้างเอกสารรายงาน PDF (A4)...');
      const filename = `รายงานพัฒนาการ_8ทักษะ_${profile.name}_${profile.grade}.pdf`;
      await exportStudentGrowthReportToPdf(reportRef.current, {
        filename,
        onProgress: (status) => setExportStatus(status),
      });
      setExportStatus('ดาวน์โหลดเอกสาร PDF สำเร็จแล้ว!');
      setTimeout(() => {
        setIsExporting(false);
        setExportStatus('');
      }, 2000);
    } catch (error) {
      console.error('Error generating growth report PDF:', error);
      setExportStatus('เกิดข้อผิดพลาดในการสร้าง PDF สามารถใช้ปุ่มพิมพ์รายงานแทนได้');
      setIsExporting(false);
    }
  };

  // Auto-download PDF on modal open if requested (strictly only for Kindergarten)
  const isPrimaryProfile = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(profile.grade);
  const hasAutoExportedRef = useRef<boolean>(false);
  React.useEffect(() => {
    if (isOpen && autoDownloadOnOpen && !hasAutoExportedRef.current && !isPrimaryProfile) {
      hasAutoExportedRef.current = true;
      const timer = setTimeout(() => {
        handleExportPdf();
      }, 350);
      return () => clearTimeout(timer);
    }
    if (!isOpen) {
      hasAutoExportedRef.current = false;
    }
  }, [isOpen, autoDownloadOnOpen, isPrimaryProfile]);

  // Handle Export to PNG
  const handleExportPng = async () => {
    if (!reportRef.current) return;
    try {
      setIsExporting(true);
      setExportStatus('กำลังบันทึกภาพ PNG...');
      const filename = `รายงานพัฒนาการ_8ทักษะ_${profile.name}_${profile.grade}.png`;
      await exportStudentGrowthReportToPng(reportRef.current, filename);
      setExportStatus('บันทึกรูปภาพเรียบร้อย!');
      setTimeout(() => {
        setIsExporting(false);
        setExportStatus('');
      }, 1500);
    } catch (error) {
      console.error('Error exporting PNG:', error);
      setIsExporting(false);
    }
  };

  // Handle Native Print
  const handlePrint = () => {
    document.body.classList.add('printing-growth-report');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-growth-report');
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div
      id="student-growth-report-modal"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isExporting) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 print:max-h-none print:shadow-none print:border-none print:rounded-none">
        {/* Modal Top Chrome (Non-Printable) */}
        <div className="no-print bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 text-white p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-indigo-950 flex items-center justify-center font-black text-xl shadow-xs">
              📄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  แบบรายงานสรุปผลการประเมินพัฒนาการ 8 ทักษะหลัก
                </h3>
                <span className="text-[10px] font-black bg-amber-400 text-indigo-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {isPrimaryProfile ? 'เฉพาะปฐมวัย' : 'PDF A4'}
                </span>
              </div>
              <p className="text-xs text-indigo-200 font-medium">
                รายงานสรุปพัฒนาการรายบุคคลของ {profile.name} (ระดับชั้น {profile.grade})
                ตามหลักสูตรการศึกษาปฐมวัย พ.ศ. 2560
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            {onOpenCompetencyReport && (
              <button
                type="button"
                id="btn-switch-to-competency-report"
                onClick={onOpenCompetencyReport}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer border border-purple-400 shadow-xs"
                title="สลับไปดูแบบรายงานสมรรถนะ 6 ด้าน (ป.1 - ป.3)"
              >
                <span>🎓</span>
                <span className="hidden sm:inline">รายงานสมรรถนะ</span>
              </button>
            )}

            {!isPrimaryProfile && (
              <>
                <button
                  type="button"
                  id="btn-toggle-report-customizer"
                  onClick={() => setShowCustomizer((prev) => !prev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer border border-indigo-400/40"
                  title="ตั้งค่าชื่อโรงเรียน / ครูประจำชั้น / ภาคเรียน"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                  <span>{showCustomizer ? 'ซ่อนการตั้งค่า' : 'ตั้งค่าหัวเอกสาร'}</span>
                </button>

                <button
                  type="button"
                  id="btn-download-growth-pdf-top"
                  onClick={handleExportPdf}
                  disabled={isExporting}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-xs transition-all active:scale-95 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'กำลังสร้าง PDF...' : 'ดาวน์โหลด PDF'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-2 text-indigo-200 hover:text-white hover:bg-indigo-600/60 rounded-xl transition-colors cursor-pointer"
                  title="พิมพ์เอกสาร A4"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </>
            )}

            <button
              type="button"
              id="btn-close-growth-report-modal"
              onClick={onClose}
              disabled={isExporting}
              className="p-2 text-indigo-200 hover:text-white hover:bg-rose-600/80 rounded-xl transition-colors cursor-pointer"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Export Status Toast */}
        {exportStatus && (
          <div className="no-print bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-900 font-bold">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
              {exportStatus}
            </span>
          </div>
        )}

        {/* Customizer Drawer (Non-Printable) */}
        {showCustomizer && (
          <div className="no-print bg-slate-50 border-b border-slate-200 p-4 transition-all animate-in slide-in-from-top-2">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>🛠️ ตั้งค่าข้อมูลหัวเอกสารทางการ (Official Document Settings)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">ชื่อโรงเรียน / ศูนย์เด็กเล็ก</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="เช่น โรงเรียนอนุบาลสาธิต"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">ปีการศึกษา / ภาคเรียน</label>
                <input
                  type="text"
                  value={academicTerm}
                  onChange={(e) => setAcademicTerm(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="เช่น ปีการศึกษา 2569 / ภาคเรียนที่ 1"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">ชื่อครูประจำชั้น / ผู้ประเมิน</label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="เช่น ครูปิยะนันท์ การุณย์"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">ชื่อผู้อำนวยการสถานศึกษา</label>
                <input
                  type="text"
                  value={directorName}
                  onChange={(e) => setDirectorName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="เช่น ดร.สมชาย นาวาพัฒนา"
                />
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Printable Document Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 print:bg-white print:p-0 print:overflow-visible">
          {isPrimaryProfile ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto my-6 shadow-sm border border-indigo-200 flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-indigo-100 border-2 border-indigo-300 text-indigo-700 flex items-center justify-center text-4xl mb-4 shadow-sm animate-bounce">
                🎓
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-900 border border-indigo-300 mb-2">
                ผู้เรียนระดับชั้นประถมศึกษา ({profile.grade})
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
                {profile.name} อยู่ในระดับชั้น {profile.grade}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium max-w-lg">
                ตามเกณฑ์มาตรฐาน สพฐ. <strong>แบบรายงานพัฒนาการ ๘ ทักษะหลัก</strong> จัดทำขึ้นเฉพาะสำหรับผู้เรียนระดับปฐมวัย (อ.๑ - อ.๓) 
                <br className="hidden sm:inline" />
                ระบบจะไม่สร้างรายงานพัฒนาการปฐมวัยสำหรับนักเรียนระดับประถมศึกษา (ป.๑ - ป.๖) เพื่อให้สอดคล้องกับหลักสูตรสถานศึกษาฐานสมรรถนะ (CBE) และ ปพ.๕
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                {onOpenCompetencyReport && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCompetencyReport();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>🎓</span>
                    <span>เปิดรายงานสมรรถนะหลัก ๖ ด้าน (CBE ป.๑ - ป.๓)</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 transition-all cursor-pointer"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          ) : (
            /* A4 Document Paper Sheet */
            <div
              id="student-growth-report-content"
              ref={reportRef}
              className="w-full max-w-[800px] mx-auto bg-white rounded-2xl shadow-md border border-slate-300 p-6 sm:p-8 flex flex-col gap-5 print:shadow-none print:border-none print:p-6 print:rounded-none"
              style={{ minHeight: '1080px' }}
            >
            {/* 1. Official Header */}
            <div className="flex items-center justify-between border-b-2 border-indigo-900/80 pb-4">
              <div className="flex items-center gap-3">
                {/* Official Ministry Emblem Style Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center text-3xl shadow-sm border border-amber-300 shrink-0">
                  🏛️
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
                    แบบรายงานสรุปผลการประเมินพัฒนาการปฐมวัย 8 ทักษะหลัก
                  </h1>
                  <h2 className="text-xs sm:text-sm font-bold text-indigo-900 mt-0.5">
                    ตามเกณฑ์มาตรฐานหลักสูตรการศึกษาปฐมวัย พุทธศักราช 2560 กระทรวงศึกษาธิการ
                  </h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {schoolName} • {academicTerm}
                  </p>
                </div>
              </div>

              {/* Assessment Date Pill */}
              <div className="text-right shrink-0">
                <div className="inline-block bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-200">
                  <span>วันที่ประเมิน: {reportDate}</span>
                </div>
                <span className="block text-[9px] text-slate-400 mt-1 font-mono">
                  REF: GR-8SKILLS-{profile.id.slice(0, 6).toUpperCase()}
                </span>
              </div>
            </div>

            {/* 2. Student Profile & Summary Card */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-gradient-to-br from-slate-50 via-indigo-50/20 to-amber-50/30 rounded-2xl p-4 border border-indigo-100">
              <div className="sm:col-span-8 flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-xs shrink-0">
                  {profile.avatar || '👶'}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-black text-slate-900">{profile.name}</h3>
                    <span className="bg-indigo-100 text-indigo-900 font-bold text-xs px-2.5 py-0.5 rounded-full border border-indigo-200">
                      ระดับชั้น {profile.grade} (ปฐมวัย)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    รหัสนักเรียน: <span className="font-mono font-bold">{profile.id.slice(0, 8)}</span> •{' '}
                    ทำกิจกรรมสะสม: <span className="font-bold text-indigo-700">{profile.totalQuestions || 0} ข้อ</span> •{' '}
                    เรียนรู้ต่อเนื่อง: <span className="font-bold text-amber-700">{profile.streakDays || 0} วัน</span>
                  </p>
                </div>
              </div>

              {/* Overall Accuracy & Mastery Score */}
              <div className="sm:col-span-4 flex items-center justify-around sm:justify-end gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">คะแนนสะสม</span>
                  <span className="text-xl font-black text-amber-600">{profile.totalScore || 0}</span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">ความถูกต้องรวม</span>
                  <span className="text-xl font-black text-emerald-600">
                    {overallRate !== null ? `${overallRate}%` : '-'}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Overall Benchmark Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌟</span>
                <div>
                  <span className="font-black text-amber-950">ระดับคุณภาพพัฒนาการโดยรวม: </span>
                  <span className="font-black text-amber-800 underline decoration-amber-400 ml-1">
                    {overallBenchmark.levelLabel}
                  </span>
                  <p className="text-[11px] text-amber-900 mt-0.5">
                    บรรลุเกณฑ์ระดับ 3 (ดีเยี่ยม) แล้ว {level3Count} จาก 8 ทักษะหลักหลักสูตรปฐมวัย
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-bold text-slate-500">เกณฑ์ประเมิน ศธ.:</span>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                  ระดับ 3 (≥80%)
                </span>
                <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-300">
                  ระดับ 2 (60-79%)
                </span>
                <span className="inline-block bg-rose-100 text-rose-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-rose-300">
                  ระดับ 1 (&lt;60%)
                </span>
              </div>
            </div>

            {/* 4. The 8 Core Skills Assessment Matrix (Main Table / Cards) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>ผลการประเมินแยกตาม 8 ทักษะหลัก (8 Core Skills Assessment Matrix)</span>
                </h4>
                <span className="text-[11px] font-bold text-slate-500">8 สมรรถนะสำคัญ</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {coreSkillsData.map((skill) => {
                  const b = skill.benchmark;
                  return (
                    <div
                      key={skill.code}
                      className="bg-white rounded-xl border border-slate-200 p-3 hover:border-indigo-300 transition-all shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        {/* Top row: Skill name + Badge */}
                        <div className="flex items-start justify-between gap-1.5 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xl shrink-0">{skill.icon}</span>
                            <div>
                              <h5 className="text-xs font-black text-slate-900 leading-tight">
                                {skill.code}. {skill.title}
                              </h5>
                              <span className="text-[10px] text-slate-400 block font-medium">
                                {skill.engTitle}
                              </span>
                            </div>
                          </div>

                          {/* Quality Level Badge */}
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full border shrink-0 ${b.badgeBg}`}
                          >
                            {b.levelShort}
                          </span>
                        </div>

                        {/* Focus description */}
                        <p className="text-[10.5px] text-slate-600 leading-relaxed mb-2 line-clamp-2">
                          {skill.focus}
                        </p>
                      </div>

                      {/* Progress Bar & Stats */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                          <span className="text-slate-500">
                            {skill.total > 0
                              ? `ทำถูกต้อง ${skill.score}/${skill.total} ข้อ`
                              : 'ยังไม่ทำแบบฝึกหัด'}
                          </span>
                          <span
                            className={`font-black ${
                              skill.rate !== null && skill.rate >= 80
                                ? 'text-emerald-700'
                                : skill.rate !== null && skill.rate >= 60
                                ? 'text-amber-700'
                                : skill.rate !== null
                                ? 'text-rose-700'
                                : 'text-slate-400'
                            }`}
                          >
                            {skill.rate !== null ? `${skill.rate}%` : '-'}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${b.barColor} rounded-full transition-all`}
                            style={{ width: `${skill.rate ?? 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Qualitative Growth Analysis & Recommendations */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-3">
              <h4 className="font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>สรุปการวิเคราะห์พัฒนาการและแนวทางส่งเสริม (Growth Analysis & Guidance)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Strengths */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5">
                  <span className="font-black text-emerald-900 block mb-1">
                    🌟 จุดเด่นด้านพัฒนาการ (Key Strengths):
                  </span>
                  <div className="flex flex-wrap gap-1 text-[11px] text-emerald-800">
                    {growthRecommendations.strengths.map((str, idx) => (
                      <span key={idx} className="bg-white/90 px-2 py-0.5 rounded-md border border-emerald-300 font-bold">
                        {str}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Growth Opportunities */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5">
                  <span className="font-black text-amber-900 block mb-1">
                    🌱 ทักษะที่ควรส่งเสริมต่อเนื่อง (Opportunities for Growth):
                  </span>
                  <div className="flex flex-wrap gap-1 text-[11px] text-amber-800">
                    {growthRecommendations.opportunities.map((opp, idx) => (
                      <span key={idx} className="bg-white/90 px-2 py-0.5 rounded-md border border-amber-300 font-bold">
                        {opp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Collaborative Guidance */}
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-2.5">
                <span className="font-black text-indigo-900 block mb-1">
                  🤝 คำแนะนำสำหรับครูและผู้ปกครอง (Parent-Teacher Collaborative Notes):
                </span>
                <p className="text-[11px] text-indigo-950 leading-relaxed font-medium">
                  {growthRecommendations.guidance}
                </p>
              </div>
            </div>

            {/* 6. Official Signatures Section */}
            <div className="pt-4 border-t-2 border-slate-300 mt-2 grid grid-cols-3 gap-4 text-center text-xs text-slate-600">
              {/* Teacher */}
              <div className="space-y-1">
                <div className="h-10 border-b border-dashed border-slate-400 mx-4" />
                <span className="font-bold text-slate-800 block text-[11px]">
                  ({teacherName})
                </span>
                <span className="text-[10px] text-slate-500 block">ครูประจำชั้น / ผู้ประเมิน</span>
                <span className="text-[9px] text-slate-400 block font-mono">วันที่ ....../....../......</span>
              </div>

              {/* Parent */}
              <div className="space-y-1">
                <div className="h-10 border-b border-dashed border-slate-400 mx-4" />
                <span className="font-bold text-slate-800 block text-[11px]">
                  (......................................................)
                </span>
                <span className="text-[10px] text-slate-500 block">ผู้ปกครองรับทราบผล</span>
                <span className="text-[9px] text-slate-400 block font-mono">วันที่ ....../....../......</span>
              </div>

              {/* Director */}
              <div className="space-y-1">
                <div className="h-10 border-b border-dashed border-slate-400 mx-4" />
                <span className="font-bold text-slate-800 block text-[11px]">
                  ({directorName})
                </span>
                <span className="text-[10px] text-slate-500 block">ผู้อำนวยการสถานศึกษา</span>
                <span className="text-[9px] text-slate-400 block font-mono">วันที่ ....../....../......</span>
              </div>
            </div>

            {/* 7. Footer note */}
            <div className="text-center pt-2 border-t border-slate-100 text-[10px] text-slate-400">
              เอกสารนี้สร้างขึ้นโดยระบบประเมินพัฒนาการปฐมวัยอัจฉริยะ Kids Hand Motion Education • อ้างอิงตามหลักสูตรการศึกษาปฐมวัย พ.ศ. 2560 (8 ทักษะหลัก)
            </div>
          </div>
          )}
        </div>

        {/* Modal Bottom Actions Bar (Non-Printable) */}
        {!isPrimaryProfile && (
          <div className="no-print bg-white p-3 sm:p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-bold hidden sm:inline">
                เอกสารจัดรูปแบบพร้อมพิมพ์และบันทึก A4 แนวตั้ง (Portrait)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Download PNG */}
              <button
                type="button"
                id="btn-export-growth-png"
                onClick={handleExportPng}
                disabled={isExporting}
                className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                บันทึกเป็นรูปภาพ (PNG)
              </button>

              {/* Print Button */}
              <button
                type="button"
                id="btn-print-growth-report-bottom"
                onClick={handlePrint}
                disabled={isExporting}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-all active:scale-95 shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>พิมพ์รายงาน (Print)</span>
              </button>

              {/* Main Action: Download PDF */}
              <button
                type="button"
                id="btn-download-growth-pdf-bottom"
                onClick={handleExportPdf}
                disabled={isExporting}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-500 hover:to-indigo-600 text-white font-black text-xs transition-all active:scale-95 shadow-md cursor-pointer disabled:opacity-50"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>{isExporting ? 'กำลังประมวลผล PDF...' : 'ดาวน์โหลดรายงาน PDF (A4)'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
