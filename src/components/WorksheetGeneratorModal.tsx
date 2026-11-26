import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  Loader2,
  Image as ImageIcon,
  Shuffle,
  Plus,
  Minus,
  Sparkles,
  Search,
} from 'lucide-react';
import { Grade, Subject, Question, CurriculumMode } from '../types';
import { QUESTIONS } from '../data/questions';
import { generateMultiPagePdf, captureFullElementImage } from '../utils/pdfExport';
import { SKILLS_LIST, CBE_COMPETENCIES_LIST, THAI_PHONICS_UNITS_LIST, getSkillBySubject } from '../data/skills';
import { soundEffects } from '../services/audioService';
import { getCurriculumTheme } from '../utils/curriculumTheme';

interface WorksheetGeneratorModalProps {
  currentGrade: Grade;
  isOpen: boolean;
  onClose: () => void;
  questions?: Question[];
  curriculumMode?: CurriculumMode;
}

/**
 * คำชี้แจงตามทักษะที่เลือก
 */
const getWorksheetInstruction = (subject: Subject | 'all'): string => {
  switch (subject) {
    // -------------------------------------------------------------
    // หลักสูตรที่ ๓: 10 หน่วยแจกลูกสะกดคำ สพฐ. (ป.1 - ป.6)
    // -------------------------------------------------------------
    case 'phonics_consonant':
      return 'คำชี้แจง (หน่วยที่ ๑ รูปและเสียงพยัญชนะ): ให้นักเรียนสังเกตรูปพยัญชนะ เสียงพยัญชนะ และการจัดหมู่อักษรกลาง อักษรสูง อักษรต่ำ (ไตรยางศ์) แล้วเลือกคำตอบที่ถูกต้องที่สุด';
    case 'phonics_vowel':
      return 'คำชี้แจง (หน่วยที่ ๒ รูปและเสียงสระ): ให้นักเรียนสังเกตรูปสระ เสียงสระสั้น-ยาว และตำแหน่งของสระ แล้วเลือกคำตอบที่ถูกต้องที่สุด';
    case 'phonics_tone':
      return 'คำชี้แจง (หน่วยที่ ๓ รูปและเสียงวรรณยุกต์): ให้นักเรียนสังเกตรูปวรรณยุกต์ ๔ รูป และเสียงวรรณยุกต์ ๕ เสียง แล้วเลือกคำตอบที่ถูกต้องที่สุด';
    case 'phonics_korkaa':
      return 'คำชี้แจง (หน่วยที่ ๔ การแจกลูกสะกดคำในแม่ ก กา): ให้นักเรียนอ่านแจกลูกสะกดคำที่ไม่มีตัวสะกด ทั้งแบบยึดพยัญชนะและยึดสระ แล้วเลือกคำตอบที่ถูกต้อง';
    case 'phonics_tone_korkaa':
      return 'คำชี้แจง (หน่วยที่ ๕ การผันวรรณยุกต์คำในแม่ ก กา): ให้นักเรียนผันเสียงวรรณยุกต์คำแม่ ก กา ตามอักษร ๓ หมู่ แล้วเลือกคำตอบที่ถูกต้อง';
    case 'phonics_direct_spelling':
      return 'คำชี้แจง (หน่วยที่ ๖ การแจกลูกสะกดคำตรงตามมาตรา): ให้นักเรียนอ่านแจกลูกสะกดคำที่มีตัวสะกดตรงตามมาตราทั้ง ๘ มาตรา แล้วเลือกคำตอบที่ถูกต้อง';
    case 'phonics_tone_spelling':
      return 'คำชี้แจง (หน่วยที่ ๗ การผันวรรณยุกต์คำตรงตามมาตรา): ให้นักเรียนจำแนกคำเป็น-คำตาย และผันวรรณยุกต์คำที่มีตัวสะกด แล้วเลือกคำตอบที่ถูกต้อง';
    case 'phonics_indirect_spelling':
      return 'คำชี้แจง (หน่วยที่ ๘ การแจกลูกสะกดคำไม่ตรงตามมาตรา): ให้นักเรียนพิจารณาเสียงตัวสะกดและคำไม่ตรงตามมาตรา (แม่กก กด กบ กน) แล้วเลือกคำตอบที่ถูกต้อง';
    case 'phonics_cluster':
      return 'คำชี้แจง (หน่วยที่ ๙ การแจกลูกสะกดคำที่มีอักษรควบ): ให้นักเรียนอ่านออกเสียงและวิเคราะห์คำควบกล้ำแท้และควบไม่แท้ แล้วเลือกคำตอบที่ถูกต้อง';
    case 'phonics_leading_consonant':
      return 'คำชี้แจง (หน่วยที่ ๑๐ การแจกลูกสะกดคำที่มีอักษรนำ): ให้นักเรียนอ่านออกเสียงแจกลูกสะกดคำอักษรนำ ห นำ และอักษรนำ ๒ พยางค์ แล้วเลือกคำตอบที่ถูกต้อง';

    // -------------------------------------------------------------
    // หลักสูตรที่ ๒: 6 สมรรถนะหลักสูตร CBE (ป.1 - ป.3)
    // -------------------------------------------------------------
    case 'self_management':
      return 'คำชี้แจง (สมรรถนะการจัดการตนเอง): ให้นักเรียนพิจารณาสถานการณ์ การวางแผน ความรับผิดชอบ และการควบคุมอารมณ์ แล้วเลือกคำตอบที่เหมาะสมที่สุด';
    case 'higher_order_thinking':
      return 'คำชี้แจง (สมรรถนะการคิดขั้นสูง): ให้นักเรียนวิเคราะห์เหตุผล แก้ปัญหาอย่างเป็นระบบ และคิดสร้างสรรค์ แล้วเลือกวิธีแก้ปัญหาที่ดีที่สุด';
    case 'communication':
      return 'คำชี้แจง (สมรรถนะการสื่อสาร): ให้นักเรียนอ่านสถานการณ์การสื่อสาร การรับฟัง และการถ่ายทอดความคิด แล้วเลือกคำตอบที่ถูกต้องสร้างสรรค์';
    case 'teamwork_collaboration':
      return 'คำชี้แจง (สมรรถนะการรวมพลังทำงานเป็นทีม): ให้นักเรียนพิจารณาสถานการณ์การทำงานร่วมกัน การรับฟังความเห็น และการช่วยเหลือผู้อื่น';
    case 'active_citizenship':
      return 'คำชี้แจง (สมรรถนะการเป็นพลเมืองที่เข้มแข็ง): ให้นักเรียนพิจารณาการปฏิบัติตามกฎกติกา ความซื่อสัตย์ และจิตสาธารณะต่อส่วนรวม';
    case 'sustainable_living':
      return 'คำชี้แจง (สมรรถนะการอยู่ร่วมกับธรรมชาติอย่างยั่งยืน): ให้นักเรียนสังเกตสิ่งแวดล้อม การดูแลธรรมชาติ และการใช้ทรัพยากรอย่างคุ้มค่า';

    // -------------------------------------------------------------
    // หลักสูตรที่ ๑: 8 ทักษะพัฒนาการปฐมวัย (อ.1 - อ.3)
    // -------------------------------------------------------------
    case 'literacy':
    case 'thai':
      return 'คำชี้แจง (ทักษะภาษาและการรู้หนังสือ): ให้นักเรียนอ่านภาพ สัญลักษณ์ หรือพยัญชนะ แล้วกากบาท (X) หรือระบายสีวงกลมเลือกคำตอบที่ถูกต้องที่สุด';
    case 'math':
      return 'คำชี้แจง (ทักษะการคิดรวบยอดและคณิตศาสตร์): ให้นักเรียนนับจำนวน สังเกตตัวเลข รูปทรง หรือแบบรูป แล้วกากบาท (X) หรือระบายสีวงกลมเลือกลงในช่องคำตอบที่ถูกต้อง';
    case 'problem_solving':
      return 'คำชี้แจง (ทักษะการคิดแก้ปัญหาและตัดสินใจ): ให้นักเรียนพิจารณาสถานการณ์และเหตุผล แล้วกากบาท (X) หรือระบายสีวงกลมเลือกวิธีแก้ปัญหาที่เหมาะสมที่สุด';
    case 'inquiry':
    case 'science':
      return 'คำชี้แจง (ทักษะการแสวงหาความรู้และวิทยาศาสตร์): ให้นักเรียนสังเกตภาพ สำรวจธรรมชาติรอบตัว แล้วกากบาท (X) หรือระบายสีวงกลมเลือกคำตอบที่ถูกต้อง';
    case 'creativity':
      return 'คำชี้แจง (ทักษะจินตนาการและความคิดสร้างสรรค์): ให้นักเรียนสังเกตสีสัน รูปร่าง และภาพสร้างสรรค์ แล้วกากบาท (X) หรือระบายสีวงกลมเลือกคำตอบที่ถูกต้องตามความคิดสร้างสรรค์';
    case 'physical_health':
      return 'คำชี้แจง (ทักษะสุขภาวะทางกายและสุขอนามัย): ให้นักเรียนสังเกตพฤติกรรมสุขภาพ อาหาร และการดูแลตนเอง แล้วกากบาท (X) หรือระบายสีวงกลมเลือกคำตอบที่ถูกต้องตามสุขอนามัย';
    case 'socio_emotional':
      return 'คำชี้แจง (ทักษะอารมณ์ จิตใจ และสังคม): ให้นักเรียนสังเกตสีหน้า อารมณ์ และการอยู่ร่วมกัน แล้วกากบาท (X) หรือระบายสีวงกลมเลือกคำตอบที่แสดงความมีน้ำใจและเข้าใจอารมณ์';
    case 'citizenship':
      return 'คำชี้แจง (ทักษะความเป็นพลเมืองและความเป็นไทย): ให้นักเรียนสังเกตวัฒนธรรม กฎกติกา และวิถีชีวิตไทย แล้วกากบาท (X) หรือระบายสีวงกลมเลือกคำตอบที่ถูกต้อง';
    case 'english':
      return 'คำชี้แจง (ทักษะภาษาอังกฤษพื้นฐาน): ให้นักเรียนสังเกตภาพ ตัวอักษรภาษาอังกฤษ และคำศัพท์ แล้วกากบาท (X) หรือระบายสีวงกลมเลือกคำตอบที่ถูกต้อง';
    default:
      return 'คำชี้แจง: ให้นักเรียนพิจารณาภาพข้อสอบแต่ละข้อ แล้วกากบาท (X) หรือระบายสีวงกลมลงในช่องคำตอบที่ถูกต้องที่สุดเพียงคำตอบเดียว';
  }
};

export type WorksheetCurriculumTab = 'all' | 'early_childhood' | 'cbe_primary' | 'thai_phonics';

export const WorksheetGeneratorModal: React.FC<WorksheetGeneratorModalProps> = ({
  currentGrade,
  isOpen,
  onClose,
  questions = QUESTIONS,
  curriculumMode = 'early_childhood',
}) => {
  const currTheme = getCurriculumTheme(curriculumMode);
  const [curriculumTab, setCurriculumTab] = useState<WorksheetCurriculumTab>(() => {
    if (curriculumMode) return curriculumMode;
    if (['P4', 'P5', 'P6'].includes(currentGrade)) return 'thai_phonics';
    if (['P1', 'P2', 'P3'].includes(currentGrade)) return 'thai_phonics';
    return 'early_childhood';
  });
  const [selectedGrade, setSelectedGrade] = useState<Grade>(currentGrade);
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [shuffleKey, setShuffleKey] = useState<number>(1);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [pdfMessage, setPdfMessage] = useState<string | null>(null);
  const [isShufflingAnim, setIsShufflingAnim] = useState(false);

  // Sync tab with selectedGrade when grade changes
  const isSelectedGradePrimary = selectedGrade.startsWith('P');
  const isSelectedPhonics = selectedSubject.startsWith('phonics_') || (isSelectedGradePrimary && curriculumTab === 'thai_phonics');
  const isSelectedCbe =
    ['self_management', 'higher_order_thinking', 'communication', 'teamwork_collaboration', 'active_citizenship', 'sustainable_living'].includes(selectedSubject) ||
    (['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(selectedGrade) && curriculumTab === 'cbe_primary');

  const worksheetPaperRef = useRef<HTMLDivElement>(null);

  // Filter pool based on grade, subject & search keyword
  const allMatched = useMemo(() => {
    return questions.filter((q) => {
      const gradeMatch = q.grade === selectedGrade;
      const subjectMatch =
        selectedSubject === 'all' ||
        q.subject === selectedSubject ||
        (selectedSubject === 'literacy' && q.subject === 'thai') ||
        (selectedSubject === 'inquiry' && q.subject === 'science');
      const keyword = searchKeyword.trim().toLowerCase();
      const keywordMatch =
        !keyword ||
        q.question.th.toLowerCase().includes(keyword) ||
        (q.explanation && q.explanation.th.toLowerCase().includes(keyword));
      return gradeMatch && subjectMatch && keywordMatch;
    });
  }, [questions, selectedGrade, selectedSubject, searchKeyword]);

  // Automatically randomize questions whenever the modal opens or filter changes
  useEffect(() => {
    if (isOpen) {
      setShuffleKey((k) => k + 1);
    }
  }, [isOpen]);

  // Adjust question count if pool size is smaller than requested
  useEffect(() => {
    if (allMatched.length > 0 && questionCount > allMatched.length) {
      setQuestionCount(allMatched.length);
    }
  }, [allMatched.length, questionCount]);

  // True randomized questions using Fisher-Yates shuffle
  const shuffledPool = useMemo(() => {
    const list = [...allMatched];
    // Fisher-Yates unbiased shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMatched, shuffleKey]);

  // Clamped filtered questions
  const safeCount = Math.max(1, Math.min(questionCount, shuffledPool.length || 1));
  const filtered = useMemo(() => {
    return shuffledPool.slice(0, safeCount);
  }, [shuffledPool, safeCount]);

  const gradeNames: Record<Grade, string> = {
    K1: 'อนุบาล 1 (อายุ 3-4 ปี)',
    K2: 'อนุบาล 2 (อายุ 4-5 ปี)',
    K3: 'อนุบาล 3 (อายุ 5-6 ปี)',
    P1: 'ประถมศึกษาปีที่ 1 (ป.1)',
    P2: 'ประถมศึกษาปีที่ 2 (ป.2)',
    P3: 'ประถมศึกษาปีที่ 3 (ป.3)',
    P4: 'ประถมศึกษาปีที่ 4 (ป.4)',
    P5: 'ประถมศึกษาปีที่ 5 (ป.5)',
    P6: 'ประถมศึกษาปีที่ 6 (ป.6)',
  };

  const handleShuffle = () => {
    try {
      soundEffects.playTap(0.6);
    } catch {
      // Audio fallback
    }
    setIsShufflingAnim(true);
    setShuffleKey((k) => k + 1);
    setPdfMessage('สุ่มข้อสอบชุดใหม่เรียบร้อยแล้ว! 🎲✨');
    setTimeout(() => {
      setIsShufflingAnim(false);
    }, 600);
    setTimeout(() => {
      setPdfMessage(null);
    }, 2500);
  };

  const handleCountChange = (newCount: number) => {
    const maxAvailable = allMatched.length || 1;
    const clamped = Math.max(1, Math.min(maxAvailable, newCount));
    setQuestionCount(clamped);
    if (newCount > maxAvailable) {
      setPdfMessage(`มีข้อสอบในหมวดนี้ทั้งหมด ${maxAvailable} ข้อ (ปรับเป็น ${maxAvailable} ข้อ)`);
      setTimeout(() => setPdfMessage(null), 2500);
    }
  };

  const handlePrint = () => {
    try {
      soundEffects.playTap(0.6);
    } catch {
      // Audio fallback
    }
    document.body.classList.add('printing-worksheet');
    window.focus();
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-worksheet');
    }, 1000);
  };

  const handleDownloadPng = async () => {
    if (!worksheetPaperRef.current) return;
    try {
      setIsExportingPng(true);
      setPdfMessage('กำลังจัดสร้างภาพ PNG คุณภาพสูงแบบเต็มแผ่น...');
      const dataUrl = await captureFullElementImage(worksheetPaperRef.current, {
        pixelRatio: 2,
        backgroundColor: '#FFFFFF',
      });
      const link = document.createElement('a');
      link.download = `ใบงาน_${selectedGrade}_${selectedSubject}_${filtered.length}ข้อ_เต็มแผ่น.png`;
      link.href = dataUrl;
      link.click();
      setPdfMessage('บันทึกรูปภาพ PNG ครบถ้วนสมบูรณ์แล้ว! 🎉');
      setTimeout(() => setPdfMessage(null), 3000);
    } catch (err) {
      console.error('PNG error:', err);
      setPdfMessage('เกิดข้อผิดพลาดในการบันทึกภาพ');
      setTimeout(() => setPdfMessage(null), 3000);
    } finally {
      setIsExportingPng(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!worksheetPaperRef.current) return;
    try {
      setIsGeneratingPdf(true);
      setPdfMessage('กำลังจัดสร้างเอกสาร PDF คุณภาพสูง (A4)...');

      const pdfTitle = isSelectedPhonics
        ? `ใบงานการอ่านเขียน โดยการแจกลูกสะกดคำ สพฐ. (${gradeNames[selectedGrade]})`
        : isSelectedCbe
        ? `ใบงานพัฒนาสมรรถนะผู้เรียน CBE (${gradeNames[selectedGrade]})`
        : `ใบงานเสริมทักษะปฐมวัย (${gradeNames[selectedGrade]}) • อนุบาลคิดส์ คิดส์`;

      await generateMultiPagePdf(worksheetPaperRef.current, {
        filename: `ใบงาน_${selectedGrade}_${selectedSubject}_${filtered.length}ข้อ_สมบูรณ์.pdf`,
        onProgress: (msg) => setPdfMessage(msg),
        footerTitle: pdfTitle,
      });

      setPdfMessage('ดาวน์โหลดเอกสาร PDF ครบทุกหน้าสมบูรณ์แล้ว! 🎉');
      setTimeout(() => setPdfMessage(null), 3500);
    } catch (err) {
      console.error('PDF generation error:', err);
      setPdfMessage('เกิดข้อผิดพลาดในการสร้าง PDF สามารถกดพิมพ์ทางเครื่องพิมพ์ได้โดยตรง');
      setTimeout(() => setPdfMessage(null), 4000);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="worksheet-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
    >
      <div className={`bg-white rounded-3xl shadow-2xl max-w-4xl w-full border-4 ${currTheme.modalBorder} ring-2 ${currTheme.modalRing} overflow-hidden my-auto max-h-[96vh] flex flex-col`}>
        {/* Controls Bar (Hidden during actual print) */}
        <div className={`no-print ${currTheme.modalHeaderBg} p-4 flex flex-col gap-2.5 text-white shrink-0 shadow-md transition-colors`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-1 bg-white/20 rounded-2xl border border-white/30">🖨️</span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black font-display tracking-tight">
                    ระบบสร้างใบงานพิมพ์ A4 / PDF (ครบทั้ง ๓ หลักสูตร)
                  </h2>
                  <span className="text-[11px] font-bold bg-white/25 px-2 py-0.5 rounded-full text-emerald-50">
                    ออฟไลน์ & ใบงานห้องเรียน
                  </span>
                </div>
                <p className="text-xs text-emerald-100 font-medium mt-0.5">
                  จัดพิมพ์แบบฝึกหัดน่ารักๆ สุ่มข้อสอบอัตโนมัติ ครอบคลุมปฐมวัย (อ.1-3), สมรรถนะ CBE (ป.1-3) และแจกลูกสะกดคำ (ป.1-6)
                </p>
              </div>
            </div>
            <button
              id="btn-close-worksheet-modal"
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Curriculum Selection Segmented Pills */}
          <div className="flex items-center gap-1.5 bg-black/15 p-1 rounded-2xl self-start flex-wrap text-xs font-black">
            <button
              type="button"
              onClick={() => {
                setCurriculumTab('all');
                setShuffleKey((k) => k + 1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                curriculumTab === 'all'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>✨ ครบ ๓ หลักสูตร</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCurriculumTab('early_childhood');
                if (selectedGrade.startsWith('P')) setSelectedGrade('K2');
                if (selectedSubject.startsWith('phonics_') || selectedSubject.startsWith('cbe_')) setSelectedSubject('all');
                setShuffleKey((k) => k + 1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                curriculumTab === 'early_childhood'
                  ? 'bg-white text-sky-950 shadow-xs font-black'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>🧸 ๑. ปฐมวัย (อ.1-3)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCurriculumTab('cbe_primary');
                if (!['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(selectedGrade)) setSelectedGrade('P1');
                if (selectedSubject.startsWith('phonics_')) setSelectedSubject('all');
                setShuffleKey((k) => k + 1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                curriculumTab === 'cbe_primary'
                  ? 'bg-white text-indigo-950 shadow-xs font-black'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>🎓 ๒. สมรรถนะ CBE (ป.1-6)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCurriculumTab('thai_phonics');
                if (selectedGrade.startsWith('K')) setSelectedGrade('P1');
                if (selectedSubject.startsWith('cbe_')) setSelectedSubject('all');
                setShuffleKey((k) => k + 1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                curriculumTab === 'thai_phonics'
                  ? 'bg-white text-teal-950 shadow-xs font-black'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>📖 ๓. แจกลูกสะกดคำ สพฐ. (ป.1-6)</span>
            </button>
          </div>
        </div>

        {/* Filter Selection & Action Controls (No print) */}
        <div className="no-print bg-emerald-50/90 p-3 sm:p-4 border-b border-emerald-200 flex flex-col gap-3 text-xs shrink-0">
          {/* Row 1: Grade, Subject, Question Count with Custom Input & Shuffle Button */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {/* Grade selector */}
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <span>ระดับชั้น:</span>
                <select
                  value={selectedGrade}
                  onChange={(e) => {
                    setSelectedGrade(e.target.value as Grade);
                    setShuffleKey((k) => k + 1);
                  }}
                  className="bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none cursor-pointer shadow-2xs"
                >
                  {(curriculumTab === 'all' || curriculumTab === 'early_childhood') && (
                    <optgroup label="ระดับปฐมวัย (Early Childhood)">
                      <option value="K1">อนุบาล 1 (K1)</option>
                      <option value="K2">อนุบาล 2 (K2)</option>
                      <option value="K3">อนุบาล 3 (K3)</option>
                    </optgroup>
                  )}
                  {(curriculumTab === 'all' || curriculumTab === 'cbe_primary' || curriculumTab === 'thai_phonics') && (
                    <optgroup
                      label={
                        curriculumTab === 'cbe_primary'
                          ? 'ระดับประถมศึกษา ฐานสมรรถนะ (ป.1 - ป.6)'
                          : 'ระดับประถมศึกษา แจกลูกสะกดคำ (ป.1 - ป.6)'
                      }
                    >
                      <option value="P1">ประถมศึกษาปีที่ 1 (ป.1)</option>
                      <option value="P2">ประถมศึกษาปีที่ 2 (ป.2)</option>
                      <option value="P3">ประถมศึกษาปีที่ 3 (ป.3)</option>
                      <option value="P4">ประถมศึกษาปีที่ 4 (ป.4)</option>
                      <option value="P5">ประถมศึกษาปีที่ 5 (ป.5)</option>
                      <option value="P6">ประถมศึกษาปีที่ 6 (ป.6)</option>
                    </optgroup>
                  )}
                </select>
              </div>

              {/* Subject / Skill selector */}
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <span>ทักษะ/หน่วยการเรียนรู้:</span>
                <select
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value as Subject | 'all');
                    setShuffleKey((k) => k + 1);
                  }}
                  className="bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none cursor-pointer shadow-2xs max-w-[240px]"
                >
                  <option value="all">รวมครบทุกทักษะ ({questions.length} ข้อ)</option>
                  {(curriculumTab === 'all' || curriculumTab === 'thai_phonics') && (
                    <optgroup label="หลักสูตรที่ ๓: 10 หน่วยแจกลูกสะกดคำ สพฐ. (ป.1 - ป.6)">
                      {THAI_PHONICS_UNITS_LIST.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.code} {unit.shortName.th} {unit.icon}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {(curriculumTab === 'all' || curriculumTab === 'early_childhood') && (
                    <optgroup label="หลักสูตรที่ ๑: 8 ทักษะพัฒนาการปฐมวัย">
                      {SKILLS_LIST.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.code} {skill.shortName.th} {skill.icon}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {(curriculumTab === 'all' || curriculumTab === 'cbe_primary') && (
                    <optgroup label="หลักสูตรที่ ๒: 6 สมรรถนะหลัก (ป.1 - ป.6)">
                      {CBE_COMPETENCIES_LIST.map((cbe) => (
                        <option key={cbe.id} value={cbe.id}>
                          {cbe.code} {cbe.shortName.th} {cbe.icon}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              {/* Search keyword input */}
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="ค้นหาโจทย์/คำ..."
                  className="pl-8 pr-6 py-1.5 text-xs bg-white border border-emerald-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-32 sm:w-40 font-semibold"
                />
                {searchKeyword && (
                  <button
                    onClick={() => setSearchKeyword('')}
                    className="absolute right-2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Question Count Input & Controls (Custom Number of Questions) */}
              <div className="flex items-center gap-2 bg-white border border-emerald-300 rounded-xl px-2.5 py-1 shadow-2xs">
                <span className="font-bold text-slate-700">ระบุจำนวนข้อ:</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleCountChange(safeCount - 1)}
                    disabled={safeCount <= 1}
                    className="w-6 h-6 rounded-lg bg-emerald-100 hover:bg-emerald-200 disabled:opacity-40 text-emerald-900 flex items-center justify-center font-black cursor-pointer transition-all active:scale-95"
                    title="ลดจำนวนข้อ"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <input
                    type="number"
                    min={1}
                    max={Math.max(1, allMatched.length)}
                    value={questionCount}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) {
                        handleCountChange(val);
                      }
                    }}
                    className="w-12 text-center font-black text-slate-900 text-sm bg-emerald-50/50 rounded border border-emerald-200 py-0.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    title="พิมพ์ระบุจำนวนข้อที่ต้องการ"
                  />

                  <button
                    type="button"
                    onClick={() => handleCountChange(safeCount + 1)}
                    disabled={safeCount >= allMatched.length}
                    className="w-6 h-6 rounded-lg bg-emerald-100 hover:bg-emerald-200 disabled:opacity-40 text-emerald-900 flex items-center justify-center font-black cursor-pointer transition-all active:scale-95"
                    title="เพิ่มจำนวนข้อ"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  (จาก {allMatched.length} ข้อ)
                </span>
              </div>

              {/* Interactive Shuffle Button */}
              <button
                type="button"
                id="btn-shuffle-worksheet"
                onClick={handleShuffle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs border border-amber-300 shadow-sm active:scale-95 cursor-pointer transition-all"
                title="สุ่มข้อสอบชุดใหม่ไม่ซ้ำเดิมทันที"
              >
                <Shuffle
                  className={`w-3.5 h-3.5 text-slate-950 transition-transform duration-500 ${
                    isShufflingAnim ? 'rotate-180 scale-125' : ''
                  }`}
                />
                <span>สุ่มข้อสอบใหม่</span>
              </button>
            </div>

            {/* Answer key toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700 select-none bg-white px-2.5 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
              <input
                type="checkbox"
                checked={showAnswerKey}
                onChange={(e) => setShowAnswerKey(e.target.checked)}
                className="accent-emerald-600 rounded"
              />
              <span>เฉลยคำตอบ (สำหรับครู)</span>
            </label>
          </div>

          {/* Row 2: Quick count presets (4, 5, 6, 8, 10, 15, 20 ข้อ) and Export buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-emerald-200/80">
            {/* Quick Count Preset Pills: เพิ่ม 5 ข้อ, 15 ข้อ, 20 ข้อ และ ลบ "ทั้งหมด" */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-600 mr-1">เลือกด่วน:</span>
              {[
                { label: '4 ข้อ (1 หน้า)', count: 4 },
                { label: '5 ข้อ', count: 5 },
                { label: '6 ข้อ', count: 6 },
                { label: '8 ข้อ (2 หน้า)', count: 8 },
                { label: '10 ข้อ', count: 10 },
                { label: '15 ข้อ', count: 15 },
                { label: '20 ข้อ', count: 20 },
              ].map((preset) => {
                const isSelected = safeCount === preset.count;
                const isOverPool = allMatched.length > 0 && preset.count > allMatched.length;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleCountChange(preset.count)}
                    title={isOverPool ? `หมวดนี้มีข้อสอบทั้งหมด ${allMatched.length} ข้อ` : undefined}
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isOverPool
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-400 border border-slate-200'
                        : 'bg-white hover:bg-emerald-100 text-slate-700 border border-emerald-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Action buttons (Download PDF, Save PNG, Direct Print) */}
            <div className="flex items-center gap-2">
              <button
                id="btn-download-pdf"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf || isExportingPng}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-3.5 py-2 rounded-xl border-b-3 border-indigo-800 active:translate-y-0.5 active:border-b-0 shadow-md cursor-pointer disabled:opacity-50 transition-all"
              >
                {isGeneratingPdf ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{isGeneratingPdf ? 'กำลังสร้าง...' : 'ดาวน์โหลด PDF'}</span>
              </button>

              <button
                id="btn-download-png"
                onClick={handleDownloadPng}
                disabled={isGeneratingPdf || isExportingPng}
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-black px-3.5 py-2 rounded-xl border-b-3 border-amber-700 active:translate-y-0.5 active:border-b-0 shadow-md cursor-pointer disabled:opacity-50 transition-all"
              >
                {isExportingPng ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ImageIcon className="w-4 h-4" />
                )}
                <span>{isExportingPng ? 'กำลังสร้างภาพ...' : 'บันทึกภาพ PNG'}</span>
              </button>

              <button
                id="btn-trigger-print"
                onClick={handlePrint}
                disabled={isGeneratingPdf || isExportingPng}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl border-b-3 border-emerald-800 active:translate-y-0.5 active:border-b-0 shadow-md cursor-pointer transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>พิมพ์ใบงาน (Print)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feedback message banner if any */}
        {pdfMessage && (
          <div className="no-print bg-emerald-100 border-b border-emerald-300 text-emerald-900 px-4 py-2 text-xs font-bold flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{pdfMessage}</span>
            </span>
          </div>
        )}

        {/* Document completeness audit bar */}
        <div className="no-print bg-emerald-50/90 px-4 py-2 border-b border-emerald-200 flex items-center justify-between text-[11px] font-bold text-emerald-800">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              มาตรฐาน A4 • มีช่องห้องและเลขที่ • เว้นช่องคะแนนเต็มสำหรับคุณครู • สุ่มข้อสอบ {filtered.length} ข้อ • {showAnswerKey ? 'พร้อมเฉลยในตัว' : 'สำหรับนักเรียนทำจริง'} • ส่วนท้ายลงชื่อผู้ตรวจ
            </span>
          </div>
          <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full text-[10px]">
            🎲 สุ่มรอบที่ #{shuffleKey}
          </span>
        </div>

        {/* Printable A4 Paper Area */}
        <div
          ref={worksheetPaperRef}
          className="printable-document p-6 md:p-8 overflow-y-auto flex-1 bg-white text-slate-900 font-sans print:overflow-visible print:p-4"
        >
          {/* Printable Page Header */}
          <div className="printable-page-header border-b-2 border-dashed border-slate-400 pb-4 mb-5 break-inside-avoid">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xl font-black text-slate-900 font-display flex items-center gap-2 flex-wrap">
                <img src="/favicon.svg" alt="Logo" className="w-8 h-8 rounded-full border border-blue-200" />
                <span>
                  {isSelectedPhonics
                    ? 'แบบฝึกหัดการสอนอ่านเขียน โดยการแจกลูกสะกดคำ (สพฐ.)'
                    : isSelectedCbe
                    ? 'แบบฝึกพัฒนาสมรรถนะผู้เรียน (CBE Competency)'
                    : 'แบบฝึกหัดเสริมทักษะปฐมวัย'}
                </span>
                <span className="text-xs font-normal border border-slate-400 px-2 py-0.5 rounded-full">
                  ระดับชั้น {gradeNames[selectedGrade]}
                </span>
                {selectedSubject !== 'all' && (() => {
                  const sk = getSkillBySubject(selectedSubject);
                  return (
                    <span className="text-xs font-bold bg-emerald-50 border border-emerald-300 text-emerald-900 px-2.5 py-0.5 rounded-full print:border-slate-400 print:text-slate-800 print:bg-slate-100">
                      {sk.icon} {sk.shortName.th}
                    </span>
                  );
                })()}
              </div>

              {/* คะแนนเต็มให้เว้นว่างไว้สำหรับคุณครูผู้สอน */}
              <div className="border-2 border-dashed border-slate-400 rounded-xl px-3.5 py-1.5 bg-slate-50 flex items-center gap-3 text-xs font-bold text-slate-700">
                <div>
                  คะแนนเต็ม: <span className="border-b-2 border-dotted border-slate-600 inline-block w-14 text-center"></span> คะแนน
                </div>
                <div className="border-l border-slate-300 pl-3">
                  คะแนนที่ได้: <span className="border-b-2 border-dotted border-slate-600 inline-block w-14 text-center"></span> คะแนน
                </div>
              </div>
            </div>

            {/* Student Info Lines: ปรับคำนำหน้าระดับชั้น อนุบาล/ประถมศึกษา ให้ถูกต้อง */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-3 text-xs font-semibold text-slate-700 mt-3 pt-2.5 border-t border-slate-300">
              <div className="flex items-center gap-1 min-w-[210px]">
                <span>ชื่อ - นามสกุล:</span>
                <span className="border-b border-dotted border-slate-500 inline-block flex-1 min-w-[130px]"></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>{selectedGrade.startsWith('P') ? 'ชั้นประถมศึกษาปีที่:' : 'ชั้นอนุบาลปีที่:'}</span>
                <span className="font-bold text-slate-900 underline px-0.5">
                  {selectedGrade.startsWith('P')
                    ? selectedGrade.replace('P', '')
                    : selectedGrade.replace('K', '')}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>ห้อง:</span>
                <span className="border-b border-dotted border-slate-500 inline-block w-14 text-center"></span>
              </div>
              <div className="flex items-center gap-1">
                <span>เลขที่:</span>
                <span className="border-b border-dotted border-slate-500 inline-block w-14 text-center"></span>
              </div>
              <div className="flex items-center gap-1 min-w-[130px]">
                <span>วันที่:</span>
                <span className="border-b border-dotted border-slate-500 inline-block flex-1 min-w-[80px]"></span>
              </div>
            </div>

            {/* คำชี้แจงที่สอดคล้องกับทักษะที่เลือก */}
            <div className="text-[11px] sm:text-xs text-slate-600 mt-2.5 font-medium bg-emerald-50/50 p-2 rounded-lg border border-emerald-200/60 print:bg-transparent print:border-none print:p-0 print:text-slate-600 italic">
              {getWorksheetInstruction(selectedSubject)}
            </div>
          </div>

          {/* Questions Grid */}
          <div className="space-y-5">
            {filtered.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="worksheet-question-card p-3.5 rounded-xl border border-slate-300 bg-slate-50/50 break-inside-avoid"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-black text-sm text-slate-800">
                      ข้อ {index + 1}. {item.question.th}
                    </div>
                    {(() => {
                      const sk = getSkillBySubject(item.subject);
                      return (
                        <span className="text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold px-2 py-0.5 rounded-full shrink-0 ml-2">
                          {sk.icon} {sk.code} {sk.shortName.th}
                        </span>
                      );
                    })()}
                  </div>

                  {/* Illustration */}
                  <div className="flex items-center justify-center gap-3 py-2 text-3xl select-none">
                    <span>{item.illustration}</span>
                    {item.illustrationSubtitle && (
                      <span className="text-xs text-slate-600 font-medium">
                        ({item.illustrationSubtitle.th})
                      </span>
                    )}
                  </div>

                  {/* Multiple Choice Checkboxes */}
                  <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-200">
                    {item.options.map((opt) => {
                      const isCorrect = opt.id === item.correctOptionId;
                      return (
                        <div
                          key={opt.id}
                          className={`p-2 rounded-lg border flex items-center gap-2 text-xs font-bold ${
                            showAnswerKey && isCorrect
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-400'
                              : 'border-slate-300 bg-white text-slate-700'
                          }`}
                        >
                          <div className="w-4 h-4 rounded-full border-2 border-slate-400 shrink-0 flex items-center justify-center">
                            {showAnswerKey && isCorrect && (
                              <div className="w-2 h-2 rounded-full bg-emerald-600" />
                            )}
                          </div>
                          <span>{opt.icon}</span>
                          <span className="truncate">{opt.label.th}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Printable Page Footer */}
          <div className="worksheet-page-signature mt-8 pt-4 border-t border-dashed border-slate-300 flex items-center justify-between text-xs text-slate-500 break-inside-avoid">
            <div>โรงเรียน: ................................................................</div>
            <div>ลงชื่อผู้ตรวจ: ................................................................</div>
          </div>
        </div>
      </div>
    </div>
  );
};
