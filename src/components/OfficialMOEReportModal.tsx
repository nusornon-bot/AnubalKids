import React, { useRef } from 'react';
import { X, Printer, Download, Award, CheckCircle, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { soundEffects } from '../services/audioService';

interface OfficialMOEReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  gradeLevel?: string;
  schoolName?: string;
  academicYear?: string;
}

export const OfficialMOEReportModal: React.FC<OfficialMOEReportModalProps> = ({
  isOpen,
  onClose,
  studentName = 'ด.ช. พลวัฒน์ ปรีชาญ (น้องต้นกล้า)',
  gradeLevel = 'P1',
  schoolName = 'โรงเรียนอนุบาลและประถมศึกษาสาธิต สพฐ.',
  academicYear = '๒๕๖๙',
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundEffects.play('pop');
    window.print();
  };

  // Determine stage strictly based on gradeLevel
  const isKindergarten =
    ['K1', 'K2', 'K3'].includes(gradeLevel) ||
    gradeLevel.includes('อนุบาล') ||
    gradeLevel.includes('อ.');

  const isLowerPrimary =
    ['P1', 'P2', 'P3'].includes(gradeLevel) ||
    gradeLevel.includes('ป.1') ||
    gradeLevel.includes('ป.2') ||
    gradeLevel.includes('ป.3');

  const isUpperPrimary =
    ['P4', 'P5', 'P6'].includes(gradeLevel) ||
    gradeLevel.includes('ป.4') ||
    gradeLevel.includes('ป.5') ||
    gradeLevel.includes('ป.6');

  // Friendly formatted grade string
  const formattedGrade = isKindergarten
    ? gradeLevel === 'K1'
      ? 'ชั้นอนุบาลปีที่ ๑ (อ.๑)'
      : gradeLevel === 'K2'
      ? 'ชั้นอนุบาลปีที่ ๒ (อ.๒)'
      : gradeLevel === 'K3'
      ? 'ชั้นอนุบาลปีที่ ๓ (อ.๓)'
      : gradeLevel
    : isLowerPrimary
    ? gradeLevel === 'P1'
      ? 'ชั้นประถมศึกษาปีที่ ๑ (ป.๑)'
      : gradeLevel === 'P2'
      ? 'ชั้นประถมศึกษาปีที่ ๒ (ป.๒)'
      : gradeLevel === 'P3'
      ? 'ชั้นประถมศึกษาปีที่ ๓ (ป.๓)'
      : gradeLevel
    : isUpperPrimary
    ? gradeLevel === 'P4'
      ? 'ชั้นประถมศึกษาปีที่ ๔ (ป.๔)'
      : gradeLevel === 'P5'
      ? 'ชั้นประถมศึกษาปีที่ ๕ (ป.๕)'
      : gradeLevel === 'P6'
      ? 'ชั้นประถมศึกษาปีที่ ๖ (ป.๖)'
      : gradeLevel
    : gradeLevel;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl border-3 border-indigo-300 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-4 sm:p-5 text-white flex items-center justify-between gap-3 shadow-md shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
              📄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black">
                  {isKindergarten
                    ? 'สมุดรายงานประจำตัวนักเรียนปฐมวัย (อ.๑ - อ.๓)'
                    : isLowerPrimary
                    ? 'แบบรายงานผลการประเมินสมรรถนะและการเรียนรู้ (ปพ.๕ / วPA)'
                    : 'แบบรายงานผลสัมฤทธิ์ทางการเรียนและการแจกลูกสะกดคำ (ปพ.๕)'}
                </h2>
                <span className="text-[10px] font-black bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>
                    {isKindergarten
                      ? 'หลักสูตรปฐมวัย พ.ศ. ๒๕๖๐'
                      : isLowerPrimary
                      ? 'CBE ๖ สมรรถนะ & สพฐ. ๑๐ หน่วย'
                      : 'สพฐ. ป.๔ - ป.๖'}
                  </span>
                </span>
              </div>
              <p className="text-xs text-indigo-100 font-medium">
                {isKindergarten
                  ? 'รายงานผลการประเมินพัฒนาการ ๔ ด้าน และ ๘ ทักษะหลัก เกณฑ์ ๓ ระดับมาตรฐาน สพฐ.'
                  : isLowerPrimary
                  ? 'เอกสารทางการสรุปสมรรถนะหลัก ๖ ด้าน และการแจกลูกสะกดคำ ๑๐ หน่วยการเรียนรู้'
                  : 'เอกสารทางการสรุปผลสัมฤทธิ์กลุ่มสาระการเรียนรู้ภาษาไทยและการสะกดคำ'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ / บันทึก PDF (A4)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div
          ref={printRef}
          className="p-6 sm:p-10 overflow-y-auto space-y-6 flex-1 bg-white text-gray-900 print:p-0 print:m-0 print:overflow-visible font-sans"
        >
          {/* Official Letterhead */}
          <div className="text-center border-b-2 border-gray-800 pb-4 space-y-1">
            <div className="text-2xl font-black tracking-wide text-gray-900">
              {isKindergarten
                ? 'แบบรายงานผลการประเมินพัฒนาการนักเรียนปฐมวัย (สมุดรายงานประจำตัวนักเรียน)'
                : isLowerPrimary
                ? 'แบบรายงานผลการประเมินสมรรถนะสำคัญและผลสัมฤทธิ์ทางการเรียน (ปพ.๕ / วPA)'
                : 'แบบรายงานผลสัมฤทธิ์ทางการเรียนและการแจกลูกสะกดคำชั้นประถมศึกษา (ปพ.๕)'}
            </div>
            <div className="text-sm font-bold text-gray-700">
              {isKindergarten
                ? 'ตามหลักสูตรการศึกษาปฐมวัย พุทธศักราช ๒๕๖๐ (ระดับชั้นอนุบาลปีที่ ๑ - ๓)'
                : isLowerPrimary
                ? 'ตามกรอบหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน (ฐานสมรรถนะ CBE) และคู่มือการแจกลูกสะกดคำ สพฐ.'
                : 'ตามหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน และคู่มือการจัดการเรียนรู้ภาษาไทย สพฐ.'}
            </div>
            <div className="text-xs text-gray-600 font-medium">
              สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.) กระทรวงศึกษาธิการ
            </div>
          </div>

          {/* Student & School Profile Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-300 text-xs">
            <div>
              <span className="font-bold text-gray-600 block">ชื่อ-นามสกุล:</span>
              <span className="font-black text-gray-900 text-sm">{studentName}</span>
            </div>
            <div>
              <span className="font-bold text-gray-600 block">ระดับชั้น:</span>
              <span className="font-black text-indigo-900 text-sm">{formattedGrade}</span>
            </div>
            <div>
              <span className="font-bold text-gray-600 block">สถานศึกษา:</span>
              <span className="font-black text-gray-900">{schoolName}</span>
            </div>
            <div>
              <span className="font-bold text-gray-600 block">ปีการศึกษา:</span>
              <span className="font-black text-gray-900">{academicYear}</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CASE 1: KINDERGARTEN (อ.1 - อ.3) ONLY                    */}
          {/* ======================================================== */}
          {isKindergarten && (
            <div className="space-y-5">
              {/* Early Childhood 4 Domains */}
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-blue-900 uppercase tracking-wide bg-blue-50 px-3 py-1.5 rounded-lg border-l-4 border-blue-600">
                  ๑. ผลการประเมินพัฒนาการ ๔ ด้าน (ตามหลักสูตรการศึกษาปฐมวัย พ.ศ. ๒๕๖๐)
                </h3>
                <table className="w-full text-left text-xs border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 border-b border-gray-300 text-gray-700 font-black">
                    <tr>
                      <th className="p-2 border-r border-gray-300">ด้านพัฒนาการ</th>
                      <th className="p-2 border-r border-gray-300 text-center w-24">คะแนนร้อยละ</th>
                      <th className="p-2 border-r border-gray-300 text-center w-28">ระดับคุณภาพ</th>
                      <th className="p-2 text-left">พฤติกรรมบ่งชี้สำคัญตามช่วงวัย</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-bold">๑. ด้านร่างกาย (Physical)</td>
                      <td className="p-2 border-r border-gray-300 text-center font-bold">๙๐%</td>
                      <td className="p-2 border-r border-gray-300 text-center font-bold text-emerald-700">ดีเยี่ยม (๓)</td>
                      <td className="p-2 text-gray-700">กล้ามเนื้อมัดเล็กแข็งแรง ลากเส้นตามรอยได้อย่างมั่นคง ประสานสายตามือดี</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-bold">๒. ด้านอารมณ์ จิตใจ (Emotional)</td>
                      <td className="p-2 border-r border-gray-300 text-center font-bold">๙๒%</td>
                      <td className="p-2 border-r border-gray-300 text-center font-bold text-emerald-700">ดีเยี่ยม (๓)</td>
                      <td className="p-2 text-gray-700">ร่าเริงแจ่มใส มีความมั่นใจในตนเอง ชื่นชอบกิจกรรมศิลปะและดนตรี</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-bold">๓. ด้านสังคม (Social)</td>
                      <td className="p-2 border-r border-gray-300 text-center font-bold">๘๘%</td>
                      <td className="p-2 border-r border-gray-300 text-center font-bold text-emerald-700">ดีเยี่ยม (๓)</td>
                      <td className="p-2 text-gray-700">ปฏิบัติตามข้อตกลงของห้องเรียนได้ดี มีวินัย และเล่นร่วมกับเพื่อนอย่างมีน้ำใจ</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-bold">๔. ด้านสติปัญญา (Cognitive)</td>
                      <td className="p-2 border-r border-gray-300 text-center font-bold">๘๖%</td>
                      <td className="p-2 border-r border-gray-300 text-center font-bold text-blue-700">ดี (๒)</td>
                      <td className="p-2 text-gray-700">จดจำรูปทรง ตัวอักษรพื้นฐาน เชื่อมโยงเหตุผลง่ายๆ และสื่อสารได้ชัดเจน</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 8 Core Skills Summary */}
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-amber-900 uppercase tracking-wide bg-amber-50 px-3 py-1.5 rounded-lg border-l-4 border-amber-600">
                  ๒. สรุปผลการประเมิน ๘ ทักษะพัฒนาการหลัก & ทักษะสมอง EF
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">ภาษาและการรู้หนังสือ</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ดีเยี่ยม (๓)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">คณิตศาสตร์ปฐมวัย</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ดีเยี่ยม (๓)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">การคิดรวบยอด & แก้ปัญหา</div>
                    <div className="font-black text-blue-700 text-sm mt-1">ดี (๒)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">วิทยาศาสตร์และการสังเกต</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ดีเยี่ยม (๓)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">ความคิดสร้างสรรค์</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ดีเยี่ยม (๓)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">สุขภาวะ & กล้ามเนื้อมือ</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ดีเยี่ยม (๓)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">อารมณ์ จิตใจ สังคม</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ดีเยี่ยม (๓)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">ความเป็นพลเมือง & ความเป็นไทย</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ดีเยี่ยม (๓)</div>
                  </div>
                </div>
              </div>

              {/* Kindergarten Teacher Remarks */}
              <div className="border border-gray-300 rounded-xl p-4 bg-gray-50 space-y-1 text-xs">
                <span className="font-black text-gray-800 block">
                  ความคิดเห็นและข้อเสนอแนะครูประจำชั้นปฐมวัย:
                </span>
                <p className="text-gray-700 leading-relaxed">
                  ผู้เรียนมีพัฒนาการโดยรวมในเกณฑ์ดีเยี่ยม มีความพร้อมในการเรียนรู้สูง สามารถใช้มือลากเส้นรูปทรงเรขาคณิตและเส้นพื้นฐานได้อย่างคล่องแคล่ว มีปฏิสัมพันธ์ที่ดีกับเพื่อน แนะนำให้ผู้ปกครองชวนพูดคุย เล่านิทานก่อนนอน และเปิดโอกาสให้ช่วยเหลือตนเองในกิจวัตรประจำวันอย่างสม่ำเสมอ
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CASE 2: PRIMARY P.1 - P.3 (ประถมศึกษาตอนต้น)               */}
          {/* ======================================================== */}
          {isLowerPrimary && (
            <div className="space-y-5">
              {/* Section 1: CBE 6 Competencies */}
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-purple-900 uppercase tracking-wide bg-purple-50 px-3 py-1.5 rounded-lg border-l-4 border-purple-600">
                  ๑. ผลการประเมิน ๖ สมรรถนะหลัก (หลักสูตรฐานสมรรถนะ CBE ตามเกณฑ์ สพฐ. ๔ ระดับคุณภาพ)
                </h3>
                <table className="w-full text-left text-xs border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 border-b border-gray-300 text-gray-700 font-black">
                    <tr>
                      <th className="p-2 border-r border-gray-300">สมรรถนะหลักสำคัญ</th>
                      <th className="p-2 border-r border-gray-300 text-center w-28">ระดับสมรรถนะ</th>
                      <th className="p-2 text-left">พฤติกรรมบ่งชี้สำคัญตามสถานการณ์จริง</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-bold">๑. การจัดการตนเอง (Self-Management)</td>
                      <td className="p-2 border-r border-gray-300 text-center font-black text-emerald-700">เชี่ยวชาญ (๔)</td>
                      <td className="p-2 text-gray-600">วางแผนเวลา ทำงานที่ได้รับมอบหมายเสร็จตามกำหนด และควบคุมสมาธิได้ดี</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-bold">๒. การคิดขั้นสูง (Higher-Order Thinking)</td>
                      <td className="p-2 border-r border-gray-300 text-center font-black text-blue-700">สามารถ (๓)</td>
                      <td className="p-2 text-gray-600">วิเคราะห์ข้อมูล แยกแยะข้อเท็จจริง และแก้ปัญหาเฉพาะหน้าได้อย่างมีเหตุผล</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-bold">๓. การสื่อสาร (Communication)</td>
                      <td className="p-2 border-r border-gray-300 text-center font-black text-emerald-700">เชี่ยวชาญ (๔)</td>
                      <td className="p-2 text-gray-600">อ่านออกเสียงชัดเจน เขียนถ่ายทอดความคิด และรับฟังความคิดเห็นของผู้อื่น</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-bold">๔. การรวมพลังทำงานเป็นทีม (Teamwork)</td>
                      <td className="p-2 border-r border-gray-300 text-center font-black text-blue-700">สามารถ (๓)</td>
                      <td className="p-2 text-gray-600">ร่วมกิจกรรมกลุ่ม Live Classroom ประสานงานและช่วยเหลือเพื่อนร่วมชั้น</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-bold">๕. การเป็นพลเมืองที่เข้มแข็ง (Active Citizenship)</td>
                      <td className="p-2 border-r border-gray-300 text-center font-black text-emerald-700">เชี่ยวชาญ (๔)</td>
                      <td className="p-2 text-gray-600">ปฏิบัติตามกฎกติกาของโรงเรียน มีจิตสาธารณะ และมีความซื่อสัตย์สุจริต</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-bold">๖. การอยู่ร่วมกับธรรมชาติยั่งยืน (Sustainable Living)</td>
                      <td className="p-2 border-r border-gray-300 text-center font-black text-emerald-700">เชี่ยวชาญ (๔)</td>
                      <td className="p-2 text-gray-600">ตระหนักถึงสิ่งแวดล้อม คัดแยกขยะ ประหยัดพลังงาน และใช้เทคโนโลยีปลอดภัย</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 2: Phonics 10 Units */}
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-emerald-900 uppercase tracking-wide bg-emerald-50 px-3 py-1.5 rounded-lg border-l-4 border-emerald-600">
                  ๒. ผลสัมฤทธิ์การแจกลูกสะกดคำ สพฐ. (อ่านออกเขียนได้ ๑๐ หน่วยการเรียนรู้)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">หน่วย ๑-๓: สระ/วรรณยุกต์</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ผ่านดีเยี่ยม (๙๕%)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">หน่วย ๔: ตรงมาตรา</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ผ่านดีเยี่ยม (๙๐%)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">หน่วย ๕: ไม่ตรงมาตรา</div>
                    <div className="font-black text-blue-700 text-sm mt-1">ผ่านเกณฑ์ (๘๕%)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">หน่วย ๖-๗: ควบกล้ำ/อักษรนำ</div>
                    <div className="font-black text-blue-700 text-sm mt-1">ผ่านเกณฑ์ (๘๒%)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">หน่วย ๘-๑๐: การันต์/ความหมาย</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ผ่านดีเยี่ยม (๘๘%)</div>
                  </div>
                </div>
              </div>

              {/* Primary Teacher Remarks */}
              <div className="border border-gray-300 rounded-xl p-4 bg-gray-50 space-y-1 text-xs">
                <span className="font-black text-gray-800 block">
                  ความคิดเห็นและข้อเสนอแนะของครูประจำชั้นประถมศึกษา:
                </span>
                <p className="text-gray-700 leading-relaxed">
                  ผู้เรียนมีสมรรถนะการจัดการตนเองและการสื่อสารในเกณฑ์เชี่ยวชาญ สามารถสะกดคำและอ่านออกเสียงแจกลูกได้อย่างถูกต้องแม่นยำ แนะนำให้ฝึกฝนการเขียนคำควบกล้ำไม่แท้และการผันวรรณยุกต์คำตายเพิ่มเติมเพื่อต่อยอดสู่ระดับภาษาขั้นสูง
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CASE 3: PRIMARY P.4 - P.6 (ประถมศึกษาตอนปลาย)              */}
          {/* ======================================================== */}
          {isUpperPrimary && (
            <div className="space-y-5">
              {/* Phonics & Thai Language Curriculum */}
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-emerald-900 uppercase tracking-wide bg-emerald-50 px-3 py-1.5 rounded-lg border-l-4 border-emerald-600">
                  ๑. ผลสัมฤทธิ์หลักภาษาไทยและการแจกลูกสะกดคำ สพฐ. (ป.๔ - ป.๖)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">มาตราตัวสะกด & คำพ้อง</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ผ่านดีเยี่ยม (๙๔%)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">คำสมาส-สนธิ / ภาษาต่างประเทศ</div>
                    <div className="font-black text-blue-700 text-sm mt-1">ผ่านเกณฑ์ (๘๕%)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">การเขียนเชิงสร้างสรรค์</div>
                    <div className="font-black text-emerald-700 text-sm mt-1">ผ่านดีเยี่ยม (๙๐%)</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-center">
                    <div className="font-bold text-gray-600">การวิเคราะห์และสรุปความ</div>
                    <div className="font-black text-blue-700 text-sm mt-1">ผ่านเกณฑ์ (๘๘%)</div>
                  </div>
                </div>
              </div>

              {/* Upper Primary Teacher Remarks */}
              <div className="border border-gray-300 rounded-xl p-4 bg-gray-50 space-y-1 text-xs">
                <span className="font-black text-gray-800 block">
                  ความคิดเห็นและข้อเสนอแนะของครูประจำชั้นประถมศึกษาตอนปลาย:
                </span>
                <p className="text-gray-700 leading-relaxed">
                  ผู้เรียนมีความเชี่ยวชาญด้านหลักภาษา การแจกลูกสะกดคำที่ซับซ้อน และการสื่อความหมาย สามารถนำความรู้ไปประยุกต์ใช้ในการเขียนบทความและการสื่อสารในชีวิตประจำวันได้อย่างดีเยี่ยม
                </p>
              </div>
            </div>
          )}

          {/* Official Signature Lines */}
          <div className="grid grid-cols-3 gap-6 pt-6 text-center text-xs">
            <div className="space-y-8">
              <div>ลงชื่อ......................................................</div>
              <div>( .................................................... )<br />ครูประจำชั้น / ผู้ประเมิน</div>
            </div>
            <div className="space-y-8">
              <div>ลงชื่อ......................................................</div>
              <div>( .................................................... )<br />ผู้ปกครองนักเรียน</div>
            </div>
            <div className="space-y-8">
              <div>ลงชื่อ......................................................</div>
              <div>( .................................................... )<br />ผู้อำนวยการสถานศึกษา</div>
            </div>
          </div>
        </div>

        {/* Footer in UI view */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 print:hidden shrink-0">
          <span>รองรับการพิมพ์บนกระดาษมาตรฐาน A4 หรือจัดเก็บเข้าแฟ้ม ปพ.๕ ดิจิทัล</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl cursor-pointer"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
