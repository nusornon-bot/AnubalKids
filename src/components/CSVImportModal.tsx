import React, { useState, useRef, useMemo } from 'react';
import {
  X,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Eye,
  CheckSquare,
  Square,
  Sparkles,
  Cloud,
} from 'lucide-react';
import { Question, Grade, Subject } from '../types';
import { SKILLS_LIST } from '../data/skills';
import {
  parseQuestionsFromCSV,
  generateSampleCSVTemplate,
  downloadCSV,
  CSVParseResult,
} from '../utils/csvQuestionParser';
import { storageService } from '../services/storageService';
import { syncHybridQuestionBank, db } from '../services/cloudSyncService';
import { doc, writeBatch } from 'firebase/firestore';

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (importedCount: number) => void;
  isAuthorized: boolean;
}

export const CSVImportModal: React.FC<CSVImportModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  isAuthorized,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parseResult, setParseResult] = useState<CSVParseResult | null>(null);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const [autoSyncCloud, setAutoSyncCloud] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState<string | null>(null);
  const [previewFilterSubject, setPreviewFilterSubject] = useState<'all' | Subject>('all');
  const [previewFilterGrade, setPreviewFilterGrade] = useState<'all' | Grade>('all');
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Skill definitions map
  const skillMap = useMemo(() => {
    const map = new Map<Subject, (typeof SKILLS_LIST)[0]>();
    SKILLS_LIST.forEach((s) => map.set(s.id, s));
    return map;
  }, []);

  if (!isOpen) return null;

  // Handle file selection
  const handleFile = (file: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
      alert('กรุณาเลือกไฟล์ที่มีนามสกุล .csv เท่านั้นครับ');
      return;
    }

    setSelectedFile(file);
    setIsProcessing(true);
    setProcessStatus('กำลังอ่านและวิเคราะห์ไฟล์ CSV...');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const result = parseQuestionsFromCSV(text);
        setParseResult(result);

        // Select all valid questions by default
        const allIds = new Set<string>(result.questions.map((q) => q.id));
        setSelectedQuestionIds(allIds);

        setIsProcessing(false);
        setProcessStatus(null);
      } catch (err) {
        console.error('CSV Parsing error:', err);
        setParseResult({
          questions: [],
          errors: ['เกิดข้อผิดพลาดในการอ่านไฟล์ กรุณาตรวจสอบว่าเป็นไฟล์ CSV ที่ถูกต้อง'],
          warnings: [],
          totalRows: 0,
        });
        setIsProcessing(false);
        setProcessStatus(null);
      }
    };

    reader.onerror = () => {
      alert('ไม่สามารถอ่านไฟล์ได้ กรุณาลองใหม่อีกครั้ง');
      setIsProcessing(false);
      setProcessStatus(null);
    };

    // Read as UTF-8 text
    reader.readAsText(file, 'UTF-8');
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Download Sample CSV
  const handleDownloadSample = () => {
    const csvContent = generateSampleCSVTemplate();
    downloadCSV(csvContent, 'sample_questions_template.csv');
  };

  // Selection toggle
  const toggleQuestionSelection = (id: string) => {
    const next = new Set(selectedQuestionIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedQuestionIds(next);
  };

  const selectAll = () => {
    if (!parseResult) return;
    setSelectedQuestionIds(new Set(parseResult.questions.map((q) => q.id)));
  };

  const deselectAll = () => {
    setSelectedQuestionIds(new Set());
  };

  // Filtered preview questions
  const filteredPreviewQuestions = useMemo(() => {
    if (!parseResult) return [];
    return parseResult.questions.filter((q) => {
      if (previewFilterGrade !== 'all' && q.grade !== previewFilterGrade) return false;
      if (previewFilterSubject !== 'all' && q.subject !== previewFilterSubject) return false;
      return true;
    });
  }, [parseResult, previewFilterGrade, previewFilterSubject]);

  // Execute Import
  const handleConfirmImport = async () => {
    if (!parseResult || selectedQuestionIds.size === 0) return;
    if (!isAuthorized) {
      alert('🔒 เฉพาะผู้ดูแลระบบที่ได้รับอนุญาตเท่านั้นที่สามารถนำเข้าข้อสอบได้');
      return;
    }

    const questionsToImport = parseResult.questions.filter((q) =>
      selectedQuestionIds.has(q.id)
    );

    if (questionsToImport.length === 0) {
      alert('กรุณาเลือกข้อสอบอย่างน้อย 1 ข้อเพื่อนำเข้า');
      return;
    }

    setIsProcessing(true);
    setProcessStatus(`กำลังบันทึกข้อสอบ ${questionsToImport.length} ข้อลงในคลัง...`);

    try {
      let finalCustomList: Question[] = [];

      if (importMode === 'replace') {
        finalCustomList = questionsToImport;
      } else {
        const existing = storageService.getCustomQuestions();
        const map = new Map<string, Question>();
        existing.forEach((q) => map.set(q.id, q));
        questionsToImport.forEach((q) => map.set(q.id, q));
        finalCustomList = Array.from(map.values());
      }

      // Save to localStorage
      storageService.saveCustomQuestions(finalCustomList);

      // Auto sync to Firestore if enabled
      if (autoSyncCloud) {
        setProcessStatus('กำลังซิงค์และสำรองขึ้น Firebase Firestore Collection "custom_questions"...');
        try {
          // Write directly in chunks to ensure newly imported questions are in Firestore
          const nowIso = new Date().toISOString();
          const chunkSize = 250;
          for (let i = 0; i < questionsToImport.length; i += chunkSize) {
            const chunk = questionsToImport.slice(i, i + chunkSize);
            const batch = writeBatch(db);
            for (const q of chunk) {
              const ref = doc(db, 'custom_questions', q.id);
              batch.set(
                ref,
                {
                  ...q,
                  isSyncedToCloud: true,
                  updatedAt: nowIso,
                  importedAt: nowIso,
                },
                { merge: true }
              );
            }
            await batch.commit();
          }

          // Also trigger hybrid sync in background
          syncHybridQuestionBank().catch(() => {});
        } catch (cloudErr) {
          console.warn('Direct Firestore batch sync error during CSV import:', cloudErr);
        }
      }

      setIsProcessing(false);
      setProcessStatus(null);
      onSuccess(questionsToImport.length);
      onClose();
    } catch (err) {
      console.error('Import save error:', err);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
      setIsProcessing(false);
      setProcessStatus(null);
    }
  };

  return (
    <div
      id="modal-csv-import"
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border-4 border-emerald-200 overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xs rounded-2xl flex items-center justify-center text-2xl border-2 border-white/30 shadow-inner">
              <FileSpreadsheet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                <span>นำเข้าแบบทดสอบจากไฟล์ CSV</span>
                <span className="bg-white/20 text-xs px-2.5 py-0.5 rounded-full border border-white/30 font-medium">
                  Bulk CSV Import
                </span>
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm font-medium">
                เพิ่มข้อสอบจำนวนมากได้อย่างรวดเร็วผ่าน Excel หรือ Google Sheets รองรับภาษาไทย 100%
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

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Step 1: Download Template Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
                📄
              </div>
              <div>
                <h3 className="text-sm font-black text-amber-950 flex items-center gap-1.5">
                  <span>ยังไม่มีรูปแบบไฟล์? ดาวน์โหลดตัวอย่างไฟล์ CSV ที่นี่</span>
                  <span className="bg-amber-200 text-amber-900 text-[10px] font-black px-1.5 py-0.2 rounded">
                    UTF-8 พร้อมเปิดใน Excel
                  </span>
                </h3>
                <p className="text-xs text-amber-800/90 mt-0.5">
                  ไฟล์ตัวอย่างมีหัวตารางภาษาอังกฤษมาตรฐาน พร้อมตัวอย่างข้อสอบครบทุกระดับชั้น อ.1-อ.3 และ 8 ทักษะหลัก
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadSample}
              className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95 shrink-0 self-stretch sm:self-auto justify-center"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลดตัวอย่าง CSV 📥</span>
            </button>
          </div>

          {/* Step 2: Drag & Drop Zone */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1.5 flex items-center justify-between">
              <span>เลือกหรือลากไฟล์ CSV ที่ต้องการนำเข้า</span>
              {selectedFile && (
                <span className="text-emerald-600 font-bold text-[11px]">
                  เลือกไฟล์แล้ว: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </span>
              )}
            </label>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-emerald-500 bg-emerald-50 scale-[1.01]'
                  : selectedFile
                  ? 'border-emerald-400 bg-emerald-50/50'
                  : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-3xl shadow-inner">
                <Upload className="w-8 h-8 text-emerald-600" />
              </div>

              <p className="text-sm font-black text-slate-800 mb-1">
                คลิกเพื่อเลือกไฟล์ หรือลากไฟล์ CSV มาวางที่นี่
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                รองรับไฟล์นามสกุล <strong>.csv</strong> ที่บันทึกด้วยการเข้ารหัส UTF-8 (ทั้งจาก Microsoft Excel, Google Sheets, หรือ Numbers)
              </p>

              {selectedFile && (
                <div className="mt-3 inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 text-xs font-black px-3 py-1.5 rounded-xl border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{selectedFile.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Loading Indicator */}
          {isProcessing && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-center gap-3 text-emerald-800 text-sm font-bold animate-pulse">
              <RefreshCw className="w-5 h-5 animate-spin text-emerald-600" />
              <span>{processStatus || 'กำลังประมวลผลข้อมูล...'}</span>
            </div>
          )}

          {/* Step 3: Parse Results & Validation Report */}
          {parseResult && !isProcessing && (
            <div className="space-y-4 animate-fadeIn">
              {/* Metric stats card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                  <p className="text-[11px] font-bold text-slate-500">แถวข้อมูลทั้งหมด</p>
                  <p className="text-2xl font-black text-slate-800 mt-0.5">{parseResult.totalRows} แถว</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                  <p className="text-[11px] font-bold text-emerald-700">ข้อสอบที่ถูกต้อง</p>
                  <p className="text-2xl font-black text-emerald-900 mt-0.5">
                    {parseResult.questions.length} ข้อ
                  </p>
                </div>
                <div className={`p-3 rounded-xl border ${parseResult.errors.length > 0 ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'}`}>
                  <p className={`text-[11px] font-bold ${parseResult.errors.length > 0 ? 'text-rose-700' : 'text-slate-500'}`}>
                    ข้อผิดพลาด
                  </p>
                  <p className={`text-2xl font-black mt-0.5 ${parseResult.errors.length > 0 ? 'text-rose-800' : 'text-slate-800'}`}>
                    {parseResult.errors.length} จุด
                  </p>
                </div>
                <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl">
                  <p className="text-[11px] font-bold text-sky-700">เลือกนำเข้า</p>
                  <p className="text-2xl font-black text-sky-900 mt-0.5">
                    {selectedQuestionIds.size} ข้อ
                  </p>
                </div>
              </div>

              {/* Error messages if any */}
              {parseResult.errors.length > 0 && (
                <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 text-xs">
                  <div className="flex items-center justify-between font-black text-rose-900 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      พบข้อผิดพลาดที่ไม่สามารถนำเข้าได้ {parseResult.errors.length} จุด
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowErrorDetails(!showErrorDetails)}
                      className="text-rose-700 hover:text-rose-900 underline cursor-pointer"
                    >
                      {showErrorDetails ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียดทั้งหมด'}
                    </button>
                  </div>
                  <p className="text-rose-700 mb-2">
                    แถวที่มีข้อผิดพลาดจะไม่ถูกนำเข้า ระบบจะนำเข้าเฉพาะข้อสอบที่ข้อมูลครบถ้วนเท่านั้น
                  </p>
                  {showErrorDetails && (
                    <ul className="list-disc pl-5 space-y-1 text-rose-800 max-h-36 overflow-y-auto">
                      {parseResult.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Warning messages if any */}
              {parseResult.warnings.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">ข้อควรทราบ: </span>
                    {parseResult.warnings.slice(0, 3).join(' • ')}
                    {parseResult.warnings.length > 3 && ` และอีก ${parseResult.warnings.length - 3} จุด`}
                  </div>
                </div>
              )}

              {/* Step 4: Preview Table */}
              {parseResult.questions.length > 0 && (
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-sm font-black text-slate-800">
                        พรีวิวข้อสอบที่จะนำเข้า ({filteredPreviewQuestions.length} ข้อ)
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      {/* Filter Grade */}
                      <select
                        value={previewFilterGrade}
                        onChange={(e) => setPreviewFilterGrade(e.target.value as 'all' | Grade)}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700"
                      >
                        <option value="all">ทุกระดับชั้น</option>
                        <option value="K1">อ.1</option>
                        <option value="K2">อ.2</option>
                        <option value="K3">อ.3</option>
                      </select>

                      {/* Filter Subject */}
                      <select
                        value={previewFilterSubject}
                        onChange={(e) => setPreviewFilterSubject(e.target.value as 'all' | Subject)}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700"
                      >
                        <option value="all">ทุกทักษะ</option>
                        <option value="literacy">1. ภาษา</option>
                        <option value="math">2. คณิต</option>
                        <option value="problem_solving">3. แก้ปัญหา</option>
                        <option value="inquiry">4. สืบเสาะ</option>
                        <option value="creativity">5. สร้างสรรค์</option>
                        <option value="physical_health">6. กาย</option>
                        <option value="socio_emotional">7. อารมณ์</option>
                        <option value="citizenship">8. พลเมือง</option>
                      </select>

                      {/* Select/Deselect all buttons */}
                      <button
                        type="button"
                        onClick={selectAll}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                      >
                        เลือกทั้งหมด
                      </button>
                      <span>|</span>
                      <button
                        type="button"
                        onClick={deselectAll}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                      >
                        ยกเลิกการเลือก
                      </button>
                    </div>
                  </div>

                  {/* Questions Preview Cards */}
                  <div className="max-h-64 sm:max-h-80 overflow-y-auto space-y-2 pr-1">
                    {filteredPreviewQuestions.map((q, idx) => {
                      const isSelected = selectedQuestionIds.has(q.id);
                      const skill = skillMap.get(q.subject);

                      return (
                        <div
                          key={`${q.id}_${idx}`}
                          onClick={() => toggleQuestionSelection(q.id)}
                          className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? 'bg-emerald-50/60 border-emerald-300'
                              : 'bg-slate-50/60 border-slate-200 opacity-60'
                          }`}
                        >
                          <div className="mt-0.5 text-emerald-700">
                            {isSelected ? (
                              <CheckSquare className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-400" />
                            )}
                          </div>

                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shrink-0">
                            {q.illustration || '❓'}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap mb-1">
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                                  q.grade === 'K1'
                                    ? 'bg-rose-100 text-rose-700'
                                    : q.grade === 'K2'
                                    ? 'bg-sky-100 text-sky-700'
                                    : 'bg-emerald-100 text-emerald-700'
                                }`}
                              >
                                {q.grade === 'K1' ? 'อ.1' : q.grade === 'K2' ? 'อ.2' : 'อ.3'}
                              </span>

                              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                                {skill?.title.th || q.subject}
                              </span>

                              <span className="text-[10px] text-amber-500 font-bold">
                                {'⭐'.repeat(q.difficulty)}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm font-black text-slate-800 truncate">
                              {q.question.th}
                            </p>

                            {/* Options with correct highlighted */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 mt-2">
                              {q.options.map((opt, optIdx) => {
                                const isCorrect = q.correctOptionId === opt.id || q.correctOptionId === String(optIdx + 1);
                                return (
                                  <div
                                    key={opt.id}
                                    className={`px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 truncate border ${
                                      isCorrect
                                        ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-black'
                                        : 'bg-white border-slate-200 text-slate-600'
                                    }`}
                                  >
                                    <span className="text-xs">{opt.icon}</span>
                                    <span className="truncate">{opt.label.th}</span>
                                    {isCorrect && (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto shrink-0" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 5: Options (Append vs Replace) and Cloud Auto-Sync */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  ตัวเลือกการนำเข้าและบันทึก
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Option: Append */}
                  <label
                    className={`p-3 rounded-xl border-2 flex items-start gap-2.5 cursor-pointer transition-all ${
                      importMode === 'append'
                        ? 'bg-white border-emerald-500 shadow-xs'
                        : 'bg-slate-100/50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'append'}
                      onChange={() => setImportMode('append')}
                      className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <p className="font-black text-slate-800">
                        เพิ่มต่อท้าย / รวมกับข้อสอบเดิม (แนะนำ)
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        เก็บข้อสอบที่คุณครูเคยสร้างไว้ทั้งหมด แล้วนำเข้าข้อสอบใหม่เพิ่มเข้าไป
                      </p>
                    </div>
                  </label>

                  {/* Option: Replace */}
                  <label
                    className={`p-3 rounded-xl border-2 flex items-start gap-2.5 cursor-pointer transition-all ${
                      importMode === 'replace'
                        ? 'bg-white border-rose-500 shadow-xs'
                        : 'bg-slate-100/50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'replace'}
                      onChange={() => setImportMode('replace')}
                      className="mt-0.5 text-rose-600 focus:ring-rose-500"
                    />
                    <div>
                      <p className="font-black text-slate-800">
                        แทนที่ข้อสอบที่คุณครูสร้างทั้งหมด
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        ลบข้อสอบที่คุณครูเคยสร้างไว้ แล้วใช้ชุดข้อสอบใหม่จากไฟล์ CSV นี้เท่านั้น
                      </p>
                    </div>
                  </label>
                </div>

                {/* Cloud Auto Sync Checkbox */}
                <div className="pt-2 border-t border-slate-200">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={autoSyncCloud}
                      onChange={(e) => setAutoSyncCloud(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Cloud className="w-4 h-4 text-sky-500" />
                      <span>ซิงค์และสำรองขึ้น Firebase Firestore ทันที (Dual-Save) ☁️</span>
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-500 pl-6.5 mt-0.5">
                    ข้อสอบจะถูกส่งขึ้น Firestore คอลเลกชัน "custom_questions" ทำให้อุปกรณ์อื่นของคุณครูดึงไปใช้ได้ทันที
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Help & Column Guidelines Accordion */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs">
            <h4 className="font-black text-slate-800 flex items-center gap-1.5 mb-2">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>คำอธิบายชื่อคอลัมน์ในไฟล์ CSV</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div>
                <strong className="text-slate-800">grade:</strong> K1, K2, K3 (หรือ อ.1, อ.2, อ.3)
              </div>
              <div>
                <strong className="text-slate-800">subject:</strong> literacy, math, problem_solving, inquiry, creativity, physical_health, socio_emotional, citizenship
              </div>
              <div>
                <strong className="text-slate-800">difficulty:</strong> 1 (ง่าย), 2 (ปานกลาง), 3 (ท้าทาย)
              </div>
              <div>
                <strong className="text-slate-800">correct_option:</strong> 1, 2, หรือ 3
              </div>
              <div className="sm:col-span-2">
                <strong className="text-slate-800">opt1_text_th, opt2_text_th, opt3_text_th:</strong> ตัวเลือกทั้ง 3 ข้อ
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-300 text-xs sm:text-sm cursor-pointer transition-all active:scale-95"
          >
            ยกเลิก
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleDownloadSample}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-black rounded-xl border border-amber-300 text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-amber-700" />
              <span>ตัวอย่าง CSV</span>
            </button>

            <button
              type="button"
              onClick={handleConfirmImport}
              disabled={
                isProcessing ||
                !parseResult ||
                parseResult.questions.length === 0 ||
                selectedQuestionIds.size === 0
              }
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>
                {isProcessing
                  ? 'กำลังบันทึก...'
                  : `ยืนยันนำเข้าข้อสอบ (${selectedQuestionIds.size} ข้อ) 🚀`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
