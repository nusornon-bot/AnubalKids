import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChildProfile, Grade, Subject } from '../types';
import {
  SKILLS_LIST,
  CBE_COMPETENCIES_LIST,
  THAI_PHONICS_UNITS_LIST,
  SkillDefinition,
} from '../data/skills';
import { SkillRadarChartView, SkillRadarDataPoint } from './SkillRadarChartView';
import {
  FileText,
  Download,
  Share2,
  Printer,
  Sparkles,
  Award,
  TrendingUp,
  Target,
  Compass,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Heart,
  BookOpen,
  Calendar,
  Users,
  ChevronRight,
  Info,
} from 'lucide-react';
import { generateMultiPagePdf, captureFullElementImage } from '../utils/pdfExport';

export type RadarChartType = 'thai_phonics' | 'early_childhood' | 'cbe_primary';

interface SkillRadarReportViewProps {
  currentProfile: ChildProfile;
  profiles: ChildProfile[];
  onSelectProfile?: (profileId: string) => void;
  onOpenPdfGrowthReport?: () => void;
  standalone?: boolean;
  initialRadarType?: RadarChartType;
}

export const SkillRadarReportView: React.FC<SkillRadarReportViewProps> = ({
  currentProfile,
  profiles,
  onSelectProfile,
  onOpenPdfGrowthReport,
  standalone = false,
  initialRadarType,
}) => {
  const [radarType, setRadarType] = useState<RadarChartType>(() => {
    if (initialRadarType) return initialRadarType;
    if (['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(currentProfile.grade)) {
      return 'cbe_primary';
    }
    return 'early_childhood';
  });

  useEffect(() => {
    if (initialRadarType) {
      setRadarType(initialRadarType);
    }
  }, [initialRadarType]);

  const [showBenchmark, setShowBenchmark] = useState(true);
  const [showClassAverage, setShowClassAverage] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<Subject | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const reportContainerRef = useRef<HTMLDivElement | null>(null);

  // Compute 8 core skills statistics from history for the current profile
  const radarData: SkillRadarDataPoint[] = useMemo(() => {
    const history = currentProfile.history || [];

    // Sum scores per subject
    const stats: Record<Subject, { correct: number; total: number }> = {
      literacy: { correct: 0, total: 0 },
      math: { correct: 0, total: 0 },
      problem_solving: { correct: 0, total: 0 },
      inquiry: { correct: 0, total: 0 },
      creativity: { correct: 0, total: 0 },
      physical_health: { correct: 0, total: 0 },
      socio_emotional: { correct: 0, total: 0 },
      citizenship: { correct: 0, total: 0 },
      science: { correct: 0, total: 0 },
      thai: { correct: 0, total: 0 },
      english: { correct: 0, total: 0 },
      self_management: { correct: 0, total: 0 },
      higher_order_thinking: { correct: 0, total: 0 },
      communication: { correct: 0, total: 0 },
      teamwork_collaboration: { correct: 0, total: 0 },
      active_citizenship: { correct: 0, total: 0 },
      sustainable_living: { correct: 0, total: 0 },
      phonics_consonant: { correct: 0, total: 0 },
      phonics_vowel: { correct: 0, total: 0 },
      phonics_tone: { correct: 0, total: 0 },
      phonics_korkaa: { correct: 0, total: 0 },
      phonics_tone_korkaa: { correct: 0, total: 0 },
      phonics_direct_spelling: { correct: 0, total: 0 },
      phonics_tone_spelling: { correct: 0, total: 0 },
      phonics_indirect_spelling: { correct: 0, total: 0 },
      phonics_cluster: { correct: 0, total: 0 },
      phonics_leading_consonant: { correct: 0, total: 0 },
    };

    history.forEach((h) => {
      // 1. Literacy (รวม thai + literacy)
      const litC = h.literacyScore ?? h.thaiScore ?? 0;
      const litT = h.literacyTotal ?? h.thaiTotal ?? 0;
      stats.literacy.correct += litC;
      stats.literacy.total += litT;
      stats.thai.correct += h.thaiScore ?? litC;
      stats.thai.total += h.thaiTotal ?? litT;
      stats.english.correct += h.englishScore ?? 0;
      stats.english.total += h.englishTotal ?? 0;

      // 2. Math
      stats.math.correct += h.mathScore ?? 0;
      stats.math.total += h.mathTotal ?? 0;

      // 3. Problem solving
      stats.problem_solving.correct += h.problemSolvingScore ?? 0;
      stats.problem_solving.total += h.problemSolvingTotal ?? 0;

      // 4. Inquiry / Science
      const inqC = h.inquiryScore ?? h.scienceScore ?? 0;
      const inqT = h.inquiryTotal ?? h.scienceTotal ?? 0;
      stats.inquiry.correct += inqC;
      stats.inquiry.total += inqT;
      stats.science.correct += h.scienceScore ?? inqC;
      stats.science.total += h.scienceTotal ?? inqT;

      // 5. Creativity
      stats.creativity.correct += h.creativityScore ?? 0;
      stats.creativity.total += h.creativityTotal ?? 0;

      // 6. Physical health
      stats.physical_health.correct += h.physicalHealthScore ?? 0;
      stats.physical_health.total += h.physicalHealthTotal ?? 0;

      // 7. Socio-emotional
      stats.socio_emotional.correct += h.socioEmotionalScore ?? 0;
      stats.socio_emotional.total += h.socioEmotionalTotal ?? 0;

      // 8. Citizenship
      stats.citizenship.correct += h.citizenshipScore ?? 0;
      stats.citizenship.total += h.citizenshipTotal ?? 0;

      // 6 CBE Competencies
      stats.self_management.correct += h.selfManagementScore ?? (h.citizenshipScore ?? 0);
      stats.self_management.total += h.selfManagementTotal ?? (h.citizenshipTotal ?? 0);
      stats.higher_order_thinking.correct += h.higherOrderThinkingScore ?? (h.problemSolvingScore ?? 0);
      stats.higher_order_thinking.total += h.higherOrderThinkingTotal ?? (h.problemSolvingTotal ?? 0);
      stats.communication.correct += h.communicationScore ?? litC;
      stats.communication.total += h.communicationTotal ?? litT;
      stats.teamwork_collaboration.correct += h.teamworkScore ?? (h.socioEmotionalScore ?? 0);
      stats.teamwork_collaboration.total += h.teamworkTotal ?? (h.socioEmotionalTotal ?? 0);
      stats.active_citizenship.correct += h.activeCitizenshipScore ?? (h.citizenshipScore ?? 0);
      stats.active_citizenship.total += h.activeCitizenshipTotal ?? (h.citizenshipTotal ?? 0);
      stats.sustainable_living.correct += h.sustainableLivingScore ?? inqC;
      stats.sustainable_living.total += h.sustainableLivingTotal ?? inqT;

      // 10 Thai Phonics Units (แจกลูกสะกดคำ สพฐ.)
      stats.phonics_consonant.correct += h.phonicsConsonantScore ?? litC;
      stats.phonics_consonant.total += h.phonicsConsonantTotal ?? litT;
      stats.phonics_vowel.correct += h.phonicsVowelScore ?? litC;
      stats.phonics_vowel.total += h.phonicsVowelTotal ?? litT;
      stats.phonics_tone.correct += h.phonicsToneScore ?? litC;
      stats.phonics_tone.total += h.phonicsToneTotal ?? litT;
      stats.phonics_korkaa.correct += h.phonicsKorkaaScore ?? litC;
      stats.phonics_korkaa.total += h.phonicsKorkaaTotal ?? litT;
      stats.phonics_tone_korkaa.correct += h.phonicsToneKorkaaScore ?? litC;
      stats.phonics_tone_korkaa.total += h.phonicsToneKorkaaTotal ?? litT;
      stats.phonics_direct_spelling.correct += h.phonicsDirectSpellingScore ?? litC;
      stats.phonics_direct_spelling.total += h.phonicsDirectSpellingTotal ?? litT;
      stats.phonics_tone_spelling.correct += h.phonicsToneSpellingScore ?? litC;
      stats.phonics_tone_spelling.total += h.phonicsToneSpellingTotal ?? litT;
      stats.phonics_indirect_spelling.correct += h.phonicsIndirectSpellingScore ?? litC;
      stats.phonics_indirect_spelling.total += h.phonicsIndirectSpellingTotal ?? litT;
      stats.phonics_cluster.correct += h.phonicsClusterScore ?? litC;
      stats.phonics_cluster.total += h.phonicsClusterTotal ?? litT;
      stats.phonics_leading_consonant.correct += h.phonicsLeadingConsonantScore ?? litC;
      stats.phonics_leading_consonant.total += h.phonicsLeadingConsonantTotal ?? litT;
    });

    // Compute classroom averages for all skills
    const classStats: Record<Subject, { correct: number; total: number }> = {
      literacy: { correct: 0, total: 0 },
      math: { correct: 0, total: 0 },
      problem_solving: { correct: 0, total: 0 },
      inquiry: { correct: 0, total: 0 },
      creativity: { correct: 0, total: 0 },
      physical_health: { correct: 0, total: 0 },
      socio_emotional: { correct: 0, total: 0 },
      citizenship: { correct: 0, total: 0 },
      science: { correct: 0, total: 0 },
      thai: { correct: 0, total: 0 },
      english: { correct: 0, total: 0 },
      self_management: { correct: 0, total: 0 },
      higher_order_thinking: { correct: 0, total: 0 },
      communication: { correct: 0, total: 0 },
      teamwork_collaboration: { correct: 0, total: 0 },
      active_citizenship: { correct: 0, total: 0 },
      sustainable_living: { correct: 0, total: 0 },
      phonics_consonant: { correct: 0, total: 0 },
      phonics_vowel: { correct: 0, total: 0 },
      phonics_tone: { correct: 0, total: 0 },
      phonics_korkaa: { correct: 0, total: 0 },
      phonics_tone_korkaa: { correct: 0, total: 0 },
      phonics_direct_spelling: { correct: 0, total: 0 },
      phonics_tone_spelling: { correct: 0, total: 0 },
      phonics_indirect_spelling: { correct: 0, total: 0 },
      phonics_cluster: { correct: 0, total: 0 },
      phonics_leading_consonant: { correct: 0, total: 0 },
    };

    profiles.forEach((p) => {
      (p.history || []).forEach((h) => {
        const cLit = h.literacyScore ?? h.thaiScore ?? 0;
        const tLit = h.literacyTotal ?? h.thaiTotal ?? 0;
        classStats.literacy.correct += cLit;
        classStats.literacy.total += tLit;
        classStats.thai.correct += h.thaiScore ?? cLit;
        classStats.thai.total += h.thaiTotal ?? tLit;
        classStats.math.correct += h.mathScore ?? 0;
        classStats.math.total += h.mathTotal ?? 0;
        classStats.problem_solving.correct += h.problemSolvingScore ?? 0;
        classStats.problem_solving.total += h.problemSolvingTotal ?? 0;
        classStats.inquiry.correct += h.inquiryScore ?? h.scienceScore ?? 0;
        classStats.inquiry.total += h.inquiryTotal ?? h.scienceTotal ?? 0;
        classStats.creativity.correct += h.creativityScore ?? 0;
        classStats.creativity.total += h.creativityTotal ?? 0;
        classStats.physical_health.correct += h.physicalHealthScore ?? 0;
        classStats.physical_health.total += h.physicalHealthTotal ?? 0;
        classStats.socio_emotional.correct += h.socioEmotionalScore ?? 0;
        classStats.socio_emotional.total += h.socioEmotionalTotal ?? 0;
        classStats.citizenship.correct += h.citizenshipScore ?? 0;
        classStats.citizenship.total += h.citizenshipTotal ?? 0;

        // CBE
        classStats.self_management.correct += h.selfManagementScore ?? (h.citizenshipScore ?? 0);
        classStats.self_management.total += h.selfManagementTotal ?? (h.citizenshipTotal ?? 0);
        classStats.higher_order_thinking.correct += h.higherOrderThinkingScore ?? (h.problemSolvingScore ?? 0);
        classStats.higher_order_thinking.total += h.higherOrderThinkingTotal ?? (h.problemSolvingTotal ?? 0);
        classStats.communication.correct += h.communicationScore ?? cLit;
        classStats.communication.total += h.communicationTotal ?? tLit;
        classStats.teamwork_collaboration.correct += h.teamworkScore ?? (h.socioEmotionalScore ?? 0);
        classStats.teamwork_collaboration.total += h.teamworkTotal ?? (h.socioEmotionalTotal ?? 0);
        classStats.active_citizenship.correct += h.activeCitizenshipScore ?? (h.citizenshipScore ?? 0);
        classStats.active_citizenship.total += h.activeCitizenshipTotal ?? (h.citizenshipTotal ?? 0);
        classStats.sustainable_living.correct += h.sustainableLivingScore ?? (h.inquiryScore ?? 0);
        classStats.sustainable_living.total += h.sustainableLivingTotal ?? (h.inquiryTotal ?? 0);

        // Phonics
        classStats.phonics_consonant.correct += h.phonicsConsonantScore ?? cLit;
        classStats.phonics_consonant.total += h.phonicsConsonantTotal ?? tLit;
        classStats.phonics_vowel.correct += h.phonicsVowelScore ?? cLit;
        classStats.phonics_vowel.total += h.phonicsVowelTotal ?? tLit;
        classStats.phonics_tone.correct += h.phonicsToneScore ?? cLit;
        classStats.phonics_tone.total += h.phonicsToneTotal ?? tLit;
        classStats.phonics_korkaa.correct += h.phonicsKorkaaScore ?? cLit;
        classStats.phonics_korkaa.total += h.phonicsKorkaaTotal ?? tLit;
        classStats.phonics_tone_korkaa.correct += h.phonicsToneKorkaaScore ?? cLit;
        classStats.phonics_tone_korkaa.total += h.phonicsToneKorkaaTotal ?? tLit;
        classStats.phonics_direct_spelling.correct += h.phonicsDirectSpellingScore ?? cLit;
        classStats.phonics_direct_spelling.total += h.phonicsDirectSpellingTotal ?? tLit;
        classStats.phonics_tone_spelling.correct += h.phonicsToneSpellingScore ?? cLit;
        classStats.phonics_tone_spelling.total += h.phonicsToneSpellingTotal ?? tLit;
        classStats.phonics_indirect_spelling.correct += h.phonicsIndirectSpellingScore ?? cLit;
        classStats.phonics_indirect_spelling.total += h.phonicsIndirectSpellingTotal ?? tLit;
        classStats.phonics_cluster.correct += h.phonicsClusterScore ?? cLit;
        classStats.phonics_cluster.total += h.phonicsClusterTotal ?? tLit;
        classStats.phonics_leading_consonant.correct += h.phonicsLeadingConsonantScore ?? cLit;
        classStats.phonics_leading_consonant.total += h.phonicsLeadingConsonantTotal ?? tLit;
      });
    });

    // Baseline fallback values for demonstration if child hasn't answered yet
    const hasAnyHistory = Object.values(stats).some((s) => s.total > 0);

    // Baseline template scores per skill
    const defaultPreviewScores: Record<Subject, number> = {
      literacy: 85,
      math: 80,
      problem_solving: 75,
      inquiry: 82,
      creativity: 90,
      physical_health: 88,
      socio_emotional: 84,
      citizenship: 78,
      science: 82,
      thai: 85,
      english: 80,
      self_management: 85,
      higher_order_thinking: 82,
      communication: 88,
      teamwork_collaboration: 84,
      active_citizenship: 80,
      sustainable_living: 86,
      phonics_consonant: 85,
      phonics_vowel: 85,
      phonics_tone: 80,
      phonics_korkaa: 82,
      phonics_tone_korkaa: 80,
      phonics_direct_spelling: 82,
      phonics_tone_spelling: 80,
      phonics_indirect_spelling: 78,
      phonics_cluster: 80,
      phonics_leading_consonant: 80,
    };

    // Age benchmarks per Grade across all 9 levels (อ.1 - ป.6)
    const gradeBenchmark =
      currentProfile.grade === 'P6'
        ? 90
        : currentProfile.grade === 'P5'
        ? 88
        : currentProfile.grade === 'P4'
        ? 85
        : currentProfile.grade === 'P3'
        ? 85
        : currentProfile.grade === 'P2'
        ? 82
        : currentProfile.grade === 'P1'
        ? 80
        : currentProfile.grade === 'K3'
        ? 80
        : currentProfile.grade === 'K2'
        ? 75
        : 70;

    // Tailored parent advice dictionary
    const parentAdvices: Record<Subject, string> = {
      literacy: 'อ่านนิทานภาพร่วมกันวันละ 10-15 นาที ชวนพูดคุยถาม-ตอบเกี่ยวกับเรื่องราว และสังเกตตัวอักษรบนป้ายรอบบ้าน',
      math: 'ชวนนับสิ่งของใกล้ตัว เช่น ผลไม้หรือช้อนส้อม เล่นเกมเปรียบเทียบขนาด ใหญ่-เล็ก สูง-เตี้ย และจัดหมวดหมู่ของเล่น',
      problem_solving: 'เปิดโอกาสให้หนูน้อยลองคิดแก้ปัญหาด้วยตนเองก่อน เช่น ตัวต่อไม่พอดี หรือหาวิธีเก็บของเล่นเข้ากล่อง',
      inquiry: 'พาสังเกตธรรมชาติรอบตัว ใบไม้ ผีเสื้อ ชวนตั้งคำถาม "ทำไม" และสังเกตการเปลี่ยนแปลง เช่น น้ำแข็งละลาย',
      creativity: 'สนับสนุนการวาดรูป ปั้นดินน้ำมัน เล่นสมมติเปิดร้านค้า และชื่นชมจินตนาการโดยไม่จำกัดกรอบความคิด',
      physical_health: 'ส่งเสริมการเคลื่อนไหวร่างกาย กระโดด ปีนป่าย และฝึกกล้ามเนื้อมัดเล็กด้วยการจับกรรไกรปลายมนหรือร้อยลูกปัด',
      socio_emotional: 'รับฟังและช่วยลูกสะท้อนอารมณ์ ("หนูกำลังรู้สึกอย่างไร") สอนการแบ่งปัน และฝึกการรอคอยตามลำดับ',
      citizenship: 'ฝึกการไหว้ ทักทาย ขอบคุณ ขอโทษ มีวินัยเก็บของหลังเล่นเสร็จ และปลูกฝังความภาคภูมิใจในวัฒนธรรมไทย',
      science: 'พาสังเกตสิ่งแวดล้อม และสำรวจปรากฏการณ์ธรรมชาติใกล้ตัว',
      thai: 'อ่านนิทานภาษาไทยและฝึกการฟังพูดสื่อสารอย่างมั่นใจ',
      english: 'ฟังเพลงภาษาอังกฤษสนุกๆ และฝึกคำศัพท์สิ่งของรอบตัว',
      self_management: 'ชวนวางแผนตารางเวลาประจำวัน ฝึกการจัดการตนเอง รับผิดชอบการบ้าน และดูแลสุขภาพกายใจ',
      higher_order_thinking: 'ฝึกคิดวิเคราะห์ ตั้งคำถามเชิงลึก แก้ปัญหาด้วยกระบวนการทางวิทยาศาสตร์และเหตุผล',
      communication: 'ส่งเสริมการจับใจความจากการอ่าน ฟัง และฝึกนำเสนอความคิดเห็นอย่างมั่นใจและสุภาพ',
      teamwork_collaboration: 'ส่งเสริมกิจกรรมกลุ่ม การรับฟังความคิดเห็นของเพื่อน และการแบ่งปันบทบาทหน้าที่ในทีม',
      active_citizenship: 'สร้างจิตสำนึกพลเมืองดี การเคารพกติกาโรงเรียน ความซื่อสัตย์ และการช่วยเหลือชุมชน',
      sustainable_living: 'เรียนรู้การคัดแยกขยะ ประหยัดพลังงาน รักษาต้นไม้ และใช้เทคโนโลยีอย่างปลอดภัยรู้เท่าทัน',
      phonics_consonant: 'ฝึกออกเสียงพยัญชนะไทยให้ตรงตามเสียงแท้และสังเกตรูปพยัญชนะทั้ง ๔๔ ตัว',
      phonics_vowel: 'ฝึกจดจำรูปและเสียงสระสั้น-ยาว พร้อมเข้าใจตำแหน่งสระบน ล่าง หน้า หลัง',
      phonics_tone: 'ฝึกแยกแยะรูปและเสียงวรรณยุกต์ทั้ง ๕ เสียง และฝึกไล่ระดับเสียง',
      phonics_korkaa: 'ฝึกแจกลูกสะกดคำในแม่ ก กา นำพยัญชนะประสมกับสระอย่างเป็นระบบ',
      phonics_tone_korkaa: 'ฝึกผันเสียงวรรณยุกต์คำในแม่ ก กา ตามหมู่อักษรสูง กลาง ต่ำ',
      phonics_direct_spelling: 'ฝึกสะกดคำตรงตามมาตราตัวสะกดทั้ง ๘ มาตรา',
      phonics_tone_spelling: 'ฝึกผันวรรณยุกต์คำที่มีตัวสะกดตามหมู่อักษรและคำเป็นคำตาย',
      phonics_indirect_spelling: 'ฝึกอ่านเขียนคำที่มีตัวสะกดไม่ตรงตามมาตราอย่างแม่นยำ',
      phonics_cluster: 'ฝึกออกเสียงคำควบกล้ำแท้และสังเกตคำควบไม่แท้ในชีวิตประจำวัน',
      phonics_leading_consonant: 'ฝึกอ่านคำอักษรนำ ห นำ และ อ นำ ย พร้อมเข้าใจการออกเสียง ๒ พยางค์',
    };

    const targetList =
      radarType === 'thai_phonics'
        ? THAI_PHONICS_UNITS_LIST
        : radarType === 'cbe_primary'
        ? CBE_COMPETENCIES_LIST
        : SKILLS_LIST;

    return targetList.map((skill) => {
      const st = stats[skill.id];
      const cl = classStats[skill.id];

      // Calculate score rate (or use friendly baseline if no questions answered yet)
      const computedScore = st.total > 0 ? Math.round((st.correct / st.total) * 100) : hasAnyHistory ? 0 : defaultPreviewScores[skill.id];

      const classAvg = cl.total > 0 ? Math.round((cl.correct / cl.total) * 100) : 74;

      return {
        id: skill.id,
        name: skill.name.th,
        shortName: skill.shortName.th,
        icon: skill.icon,
        code: skill.code,
        color: skill.colorClass,
        score: computedScore,
        totalQuestions: st.total,
        correctQuestions: st.correct,
        benchmarkScore: gradeBenchmark,
        classAverageScore: classAvg,
        description: skill.description,
        skillsFocus: skill.skillsFocus,
        recommendation: parentAdvices[skill.id] || 'ส่งเสริมการเรียนรู้ผ่านการเล่นอย่างสม่ำเสมอ',
      };
    });
  }, [currentProfile, profiles, radarType]);

  // Overall Statistics
  const overallStats = useMemo(() => {
    const totalQ = radarData.reduce((acc, curr) => acc + curr.totalQuestions, 0);
    const totalC = radarData.reduce((acc, curr) => acc + curr.correctQuestions, 0);
    const averageScore = Math.round(radarData.reduce((acc, curr) => acc + curr.score, 0) / radarData.length);
    const masteredCount = radarData.filter((d) => d.score >= 80).length;
    const isPreview = totalQ === 0;

    // Top strengths (sorted descending)
    const sortedSkills = [...radarData].sort((a, b) => b.score - a.score);
    const topStrengths = sortedSkills.slice(0, 3);
    const growthAreas = sortedSkills.slice(-2).reverse();

    return {
      totalQuestions: totalQ,
      correctQuestions: totalC,
      averageScore,
      masteredCount,
      isPreview,
      topStrengths,
      growthAreas,
    };
  }, [radarData]);

  // Currently focused skill detail (either selected or top strength)
  const activeSkillDetail = useMemo(() => {
    if (selectedSkillId) {
      return radarData.find((d) => d.id === selectedSkillId) || radarData[0];
    }
    return radarData[0];
  }, [selectedSkillId, radarData]);

  // Export handlers
  const handleDownloadPdf = async () => {
    if (!reportContainerRef.current) return;
    setIsExporting(true);
    setShareFeedback('กำลังเตรียมไฟล์ PDF รายงานสรุป 8 ทักษะ...');
    try {
      await generateMultiPagePdf(reportContainerRef.current, {
        filename: `รายงานสรุปพัฒนาการ_8ทักษะ_${currentProfile.name}_${currentProfile.grade}.pdf`,
        footerTitle: `รายงานสรุปผลประเมินพัฒนาการ 8 ทักษะหลัก • ${currentProfile.name} (${currentProfile.grade})`,
        marginMm: 8,
      });
      setShareFeedback('ดาวน์โหลด PDF สำเร็จแล้ว!');
    } catch {
      setShareFeedback('ไม่สามารถดาวน์โหลด PDF ได้ โปรดลองใหม่อีกครั้ง');
    } finally {
      setIsExporting(false);
      setTimeout(() => setShareFeedback(null), 3000);
    }
  };

  const handleDownloadImage = async () => {
    if (!reportContainerRef.current) return;
    setIsExporting(true);
    setShareFeedback('กำลังจับภาพกราฟใยแมงมุม...');
    try {
      const dataUrl = await captureFullElementImage(reportContainerRef.current);
      const link = document.createElement('a');
      link.download = `กราฟใยแมงมุม_8ทักษะ_${currentProfile.name}.png`;
      link.href = dataUrl;
      link.click();
      setShareFeedback('บันทึกรูปภาพสำเร็จแล้ว!');
    } catch {
      setShareFeedback('ไม่สามารถบันทึกรูปภาพได้');
    } finally {
      setIsExporting(false);
      setTimeout(() => setShareFeedback(null), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col gap-4 select-none animate-in fade-in duration-200">
      {/* Radar Mode Switcher Tabs */}
      <div className="w-full bg-slate-100 p-1.5 rounded-2xl flex flex-wrap sm:flex-nowrap items-center gap-1.5 border border-slate-200 shadow-2xs">
        <button
          type="button"
          onClick={() => {
            setRadarType('thai_phonics');
            setSelectedSkillId(null);
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
            radarType === 'thai_phonics'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-800 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>๑. เรดาร์ทักษะภาษาไทย (๑๐ หน่วย สพฐ.)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setRadarType('early_childhood');
            setSelectedSkillId(null);
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
            radarType === 'early_childhood'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-800 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50 hover:text-purple-800'
          }`}
        >
          <span>🧸</span>
          <span>๒. เรดาร์ ๘ ทักษะพัฒนาการ (ปฐมวัย)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setRadarType('cbe_primary');
            setSelectedSkillId(null);
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
            radarType === 'cbe_primary'
              ? 'bg-gradient-to-r from-indigo-700 to-purple-800 text-white border-indigo-900 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-50 hover:text-indigo-800'
          }`}
        >
          <span>🎓</span>
          <span>๓. เรดาร์ ๖ สมรรถนะหลัก (CBE ป.1 - ป.6)</span>
        </button>
      </div>

      {/* Top Action Control Toolbar */}
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Profile Switcher & Child Identity */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
            {currentProfile.avatar || '🧒'}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                {currentProfile.name}
              </h3>
              <span className="text-[10px] font-black bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-full border border-indigo-200">
                {currentProfile.grade}
              </span>

              {profiles.length > 1 && onSelectProfile && (
                <select
                  value={currentProfile.id}
                  onChange={(e) => onSelectProfile(e.target.value)}
                  className="text-[11px] font-bold bg-slate-100 border border-slate-300 rounded-lg px-2 py-0.5 text-slate-800 cursor-pointer ml-1 outline-none"
                >
                  {profiles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.grade})
                    </option>
                  ))}
                </select>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              {radarType === 'thai_phonics'
                ? 'รายงานวิเคราะห์เรดาร์ทักษะภาษาไทยและการแจกลูกสะกดคำ ๑๐ หน่วย สพฐ. (อ.1 - ป.6)'
                : radarType === 'cbe_primary'
                ? 'รายงานวิเคราะห์เรดาร์ 6 สมรรถนะหลักตามหลักสูตรสถานศึกษาฐานสมรรถนะ (CBE ป.1 - ป.6)'
                : 'รายงานสรุปผลประเมินพัฒนาการ 8 ทักษะหลักตามเกณฑ์มาตรฐานปฐมวัย สพฐ.'}
            </p>
          </div>
        </div>

        {/* View Toggles & Export Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          {/* Toggle Benchmark Line */}
          <button
            type="button"
            onClick={() => setShowBenchmark((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
              showBenchmark
                ? 'bg-amber-100 text-amber-950 border-amber-300 shadow-2xs'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
            title="เปิด/ปิด เกณฑ์มาตรฐานปฐมวัย (75%)"
          >
            <Target className="w-3.5 h-3.5 text-amber-600" />
            <span>เกณฑ์มาตรฐาน</span>
          </button>

          {/* Toggle Class Average */}
          <button
            type="button"
            onClick={() => setShowClassAverage((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
              showClassAverage
                ? 'bg-purple-100 text-purple-950 border-purple-300 shadow-2xs'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
            title="เปิด/ปิด ค่าเฉลี่ยของเพื่อนร่วมชั้น"
          >
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>เฉลี่ยห้องเรียน</span>
          </button>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-black shadow-xs cursor-pointer active:scale-95 transition-all"
            title="ดาวน์โหลดรายงานสรุปพัฒนาการ 8 ทักษะ (PDF)"
          >
            <Download className="w-3.5 h-3.5 text-purple-200" />
            <span>PDF</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
            title="พิมพ์รายงาน"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
          </button>
        </div>
      </div>

      {shareFeedback && (
        <div className="w-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold px-3 py-2 rounded-xl text-center shadow-xs animate-in fade-in">
          {shareFeedback}
        </div>
      )}

      {/* Main Printable Content Container */}
      <div
        ref={reportContainerRef}
        id="skill-radar-report-document"
        className="w-full bg-white rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-slate-200 shadow-sm flex flex-col gap-6"
      >
        {/* Document Header for Official Print/PDF */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center text-2xl shadow-sm">
              🕸️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-slate-900">
                  รายงานสรุปผลรายทักษะปฐมวัย (8 Core Skills Radar Report)
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                ประเมินความพร้อมและพัฒนาการรอบด้านตามหลักสูตรการศึกษาปฐมวัย พ.ศ. 2560
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-600 self-end sm:self-center">
            <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-xl">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </span>
          </div>
        </div>

        {/* 1. Summary Quick Metric Cards (4 Pillars) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Average Mastery */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between text-xs font-black text-emerald-900">
              <span>ความก้าวหน้ารวม</span>
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-800">
                {overallStats.averageScore}%
              </span>
              <span className="text-[11px] text-emerald-700 font-bold">
                {overallStats.averageScore >= 80 ? 'ดีเยี่ยม 🌟' : overallStats.averageScore >= 60 ? 'กำลังพัฒนา 👍' : 'ควรส่งเสริม 💡'}
              </span>
            </div>
            <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, overallStats.averageScore)}%` }}
              />
            </div>
          </div>

          {/* Mastered Skills Count */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between text-xs font-black text-purple-900">
              <span>ทักษะระดับยอดเยี่ยม</span>
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-purple-800">
                {overallStats.masteredCount}
              </span>
              <span className="text-[11px] text-purple-600 font-bold">/ 8 ทักษะหลัก</span>
            </div>
            <div className="text-[10px] text-purple-700 mt-1 font-semibold">
              ระดับ 3 (เกณฑ์คะแนน ≥ 80%)
            </div>
          </div>

          {/* Total Questions Done */}
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between text-xs font-black text-blue-900">
              <span>ข้อสอบและภารกิจ</span>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-blue-800">
                {overallStats.totalQuestions}
              </span>
              <span className="text-[11px] text-blue-600 font-bold">ข้อที่ทำ</span>
            </div>
            <div className="text-[10px] text-blue-700 mt-1 font-semibold">
              ตอบถูกต้อง {overallStats.correctQuestions} ข้อ
            </div>
          </div>

          {/* Child's Grade & Benchmark */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between text-xs font-black text-amber-900">
              <span>เกณฑ์เป้าหมายวัย</span>
              <Target className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-amber-800">
                {currentProfile.grade === 'K3' ? '80%' : currentProfile.grade === 'K2' ? '75%' : '70%'}
              </span>
              <span className="text-[11px] text-amber-700 font-bold">ชั้น {currentProfile.grade}</span>
            </div>
            <div className="text-[10px] text-amber-700 mt-1 font-semibold">
              เทียบเคียงเกณฑ์มาตรฐานปฐมวัย
            </div>
          </div>
        </div>

        {/* Preview Mode Notice if no history yet */}
        {overallStats.isPreview && (
          <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-3 sm:p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed font-medium">
              <strong className="font-black">💡 คำแนะนำ:</strong> ขณะนี้เป็นข้อมูลจำลองเพื่อแสดงตัวอย่างรูปแบบรายงานใยแมงมุม เมื่อหนูน้อยเริ่มทำแบบทดสอบหรือเล่นเกมการศึกษาในแอปพลิเคชัน ระบบจะประมวลผลคะแนนจริงและอัปเดตลงในกราฟใยแมงมุมนี้โดยอัตโนมัติ
            </div>
          </div>
        )}

        {/* 2. Interactive D3.js Radar Chart & Spotlight Detail Panel */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Radar Chart Visual (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-50/70 border border-slate-200 rounded-3xl p-4 sm:p-6 relative">
            <div className="w-full flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">🕸️</span>
                <span className="text-xs sm:text-sm font-black text-slate-800">
                  กราฟใยแมงมุมมิติสัมพันธ์ 8 ทักษะ (D3.js Radar Visualization)
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                แตะที่จุดเพื่อดูรายละเอียด
              </span>
            </div>

            {/* D3 SVG Chart */}
            <SkillRadarChartView
              data={radarData}
              childName={currentProfile.name}
              showBenchmark={showBenchmark}
              showClassAverage={showClassAverage}
              selectedSkillId={selectedSkillId}
              onSelectSkill={(skill) => setSelectedSkillId(skill.id)}
            />
          </div>

          {/* Focused Skill Detail Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-5 border-2 border-purple-200 shadow-sm flex flex-col gap-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200 flex items-center justify-center text-2xl shadow-2xs">
                    {activeSkillDetail.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                      ทักษะที่ {activeSkillDetail.code}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 leading-tight mt-0.5">
                      {activeSkillDetail.name}
                    </h4>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-purple-900">
                    {activeSkillDetail.score}%
                  </span>
                  <div className="text-[10px] font-bold text-slate-500">ความแม่นยำ</div>
                </div>
              </div>

              {/* Skill Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {activeSkillDetail.description}
              </p>

              {/* Sub-skills Focus */}
              <div>
                <div className="text-[11px] font-black text-slate-700 mb-1.5">
                  หัวข้อย่อยที่พัฒนา (Sub-skills Focus):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkillDetail.skillsFocus.map((f, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold bg-white text-slate-700 px-2.5 py-1 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>{f}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Parenting Recommendation Box */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-black text-amber-950">
                    คำแนะนำสำหรับผู้ปกครองจัดกิจกรรมที่บ้าน:
                  </div>
                  <p className="text-[11px] text-amber-900 leading-relaxed mt-1 font-medium">
                    {activeSkillDetail.recommendation}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Summary of Strengths and Growth Areas */}
            <div className="grid grid-cols-2 gap-3">
              {/* Strengths */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 flex flex-col gap-1.5">
                <div className="flex items-center gap-1 text-xs font-black text-emerald-950">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>จุดเด่นของหนูน้อย</span>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {overallStats.topStrengths.slice(0, 2).map((s) => (
                    <div key={s.id} className="flex items-center justify-between text-[11px] font-bold text-emerald-900">
                      <span className="truncate">{s.icon} {s.shortName}</span>
                      <span className="text-emerald-700 shrink-0">{s.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Focus */}
              <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-3 flex flex-col gap-1.5">
                <div className="flex items-center gap-1 text-xs font-black text-purple-950">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
                  <span>ส่งเสริมเพิ่มเติม</span>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {overallStats.growthAreas.map((s) => (
                    <div key={s.id} className="flex items-center justify-between text-[11px] font-bold text-purple-900">
                      <span className="truncate">{s.icon} {s.shortName}</span>
                      <span className="text-purple-700 shrink-0">{s.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Detailed 8 Skills Grid Matrix Cards */}
        <div className="w-full flex flex-col gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <span>📊</span>
              <span>ผลการประเมินแยกตาม 8 ทักษะหลัก (Detailed 8 Core Skills Matrix)</span>
            </h3>
            <span className="text-xs text-slate-500 font-bold">
              คลิกการ์ดเพื่อดูบนกราฟ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {radarData.map((skill) => {
              const isSelected = selectedSkillId === skill.id;
              const isExcellent = skill.score >= 80;
              const isModerate = skill.score >= 50 && skill.score < 80;

              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-purple-50/80 border-purple-500 shadow-md ring-2 ring-purple-200 scale-102'
                      : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-lg shrink-0">
                        {skill.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-slate-400">
                          ทักษะที่ {skill.code}
                        </div>
                        <h5 className="text-xs font-black text-slate-900 truncate">
                          {skill.shortName}
                        </h5>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                        isExcellent
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isModerate
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isExcellent ? 'ระดับ 3 (ดีเยี่ยม)' : isModerate ? 'ระดับ 2 (ปานกลาง)' : 'ระดับ 1 (ปรับปรุง)'}
                    </span>
                  </div>

                  {/* Progress Bar & Scores */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-black mb-1">
                      <span className="text-slate-600">คะแนน:</span>
                      <span className={isExcellent ? 'text-emerald-700' : 'text-slate-800'}>
                        {skill.score}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isExcellent ? 'bg-emerald-500' : isModerate ? 'bg-amber-500' : 'bg-slate-400'
                        }`}
                        style={{ width: `${Math.min(100, skill.score)}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {skill.recommendation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Parent Comprehensive Overview & Recommendations */}
        <div className="w-full bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-3xl p-5 border border-purple-200 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-black text-purple-950">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>บทสรุปและแนวทางการส่งเสริมสำหรับผู้ปกครอง (Parent Enrichment Strategy)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-purple-100 flex flex-col gap-1">
              <span className="font-black text-emerald-800 flex items-center gap-1">
                <span>🌟</span>
                <span>ส่งเสริมจุดเด่นให้เปล่งประกาย</span>
              </span>
              <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
                หนูน้อยแสดงศักยภาพโดดเด่นในด้าน <strong>{overallStats.topStrengths[0]?.shortName}</strong> ชื่นชมในความพยายาม และมอบหมายภารกิจสนุกๆ ให้ลูกได้แสดงความสามารถอย่างมั่นใจ
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-purple-100 flex flex-col gap-1">
              <span className="font-black text-indigo-800 flex items-center gap-1">
                <span>🌱</span>
                <span>พัฒนาการเรียนรู้ผ่านการเล่น</span>
              </span>
              <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
                เน้นการเรียนรู้แบบ Play-based Learning ไม่เร่งรัดหรือกดดัน ให้ลูกได้ฝึกจับสัมผัส เคลื่อนไหวร่างกาย และสนทนาโต้ตอบอย่างมีความสุขทุกวัน
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-purple-100 flex flex-col gap-1">
              <span className="font-black text-purple-800 flex items-center gap-1">
                <span>🤝</span>
                <span>ความร่วมมือระหว่างบ้านและโรงเรียน</span>
              </span>
              <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
                สามารถนำผลประเมิน 8 ทักษะนี้ไปแลกเปลี่ยนกับคุณครูประจำชั้น เพื่อออกแบบกิจกรรมส่งเสริมพัฒนาการของหนูน้อยให้สอดคล้องกันทั้งที่บ้านและห้องเรียน
              </p>
            </div>
          </div>
        </div>

        {/* 5. Document Footer Sign-off */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-200 text-xs text-slate-500 gap-2">
          <span>
            เอกสารนี้สร้างขึ้นโดยระบบ Kids Hand Motion Education • อ้างอิงตามหลักสูตรการศึกษาปฐมวัย พ.ศ. 2560
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-purple-800">
              {currentProfile.name} • อนุบาล {currentProfile.grade}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
