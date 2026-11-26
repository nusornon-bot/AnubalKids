import React, { useState, useEffect } from 'react';
import {
  FileCode,
  Copy,
  Check,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  AlertCircle,
  Sparkles,
  Database,
  Edit3,
  Save,
  Undo,
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Question } from '../../types';

interface LocalStorageJSONViewerProps {
  onQuestionsChange: () => void;
  showToast: (msg: string) => void;
  onNavigateToAdd?: () => void;
}

export const LocalStorageJSONViewer: React.FC<LocalStorageJSONViewerProps> = ({
  onQuestionsChange,
  showToast,
  onNavigateToAdd,
}) => {
  const [jsonText, setJsonText] = useState<string>('');
  const [isEditingRaw, setIsEditingRaw] = useState(false);
  const [rawDraft, setRawDraft] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [stats, setStats] = useState(storageService.getCustomQuestionsStorageStats());

  const refreshFromStorage = () => {
    const raw = storageService.getCustomQuestionsRawJSON();
    setJsonText(raw);
    setRawDraft(raw);
    setStats(storageService.getCustomQuestionsStorageStats());
    setValidationError(null);
  };

  useEffect(() => {
    refreshFromStorage();
  }, []);

  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setIsCopied(true);
      showToast('คัดลอก JSON ลงคลิปบอร์ดเรียบร้อยแล้ว 📋');
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      showToast('ไม่สามารถคัดลอกได้ กรุณาเลือกข้อความแล้วคัดลอกเอง');
    }
  };

  const handleDownloadJSON = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonText);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      const dateStr = new Date().toISOString().slice(0, 10);
      downloadAnchor.setAttribute('download', `kinder_custom_questions_${dateStr}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('ดาวน์โหลดไฟล์ JSON สำเร็จแล้ว 📥');
    } catch {
      showToast('เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const res = storageService.saveCustomQuestionsRawJSON(content);
        if (res.success) {
          refreshFromStorage();
          onQuestionsChange();
          showToast(`นำเข้าข้อสอบสำเร็จ ${res.count} ข้อ ลงใน Local Storage JSON 🎉`);
        } else {
          setValidationError(res.error || 'ไฟล์ JSON ไม่ถูกต้อง');
          showToast(`เกิดข้อผิดพลาด: ${res.error}`);
        }
      } catch (err: any) {
        showToast('ไม่สามารถอ่านไฟล์ JSON ได้ กรุณาตรวจสอบไฟล์');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSaveRawEdit = () => {
    setValidationError(null);
    const res = storageService.saveCustomQuestionsRawJSON(rawDraft);
    if (res.success) {
      setIsEditingRaw(false);
      refreshFromStorage();
      onQuestionsChange();
      showToast(`บันทึก JSON ลง Local Storage เรียบร้อยแล้ว (${res.count} ข้อ) ✨`);
    } else {
      setValidationError(res.error || 'รูปแบบ JSON ไม่ถูกต้อง');
    }
  };

  const handleClearCustomQuestions = () => {
    if (
      confirm(
        'คุณแน่ใจหรือไม่ว่าต้องการลบข้อสอบที่สร้างเองทั้งหมดใน Local Storage? (ข้อสอบเริ่มต้นของระบบจะไม่ได้รับผลกระทบ)'
      )
    ) {
      storageService.clearCustomQuestionsOnly();
      refreshFromStorage();
      onQuestionsChange();
      showToast('ล้างข้อสอบที่สร้างเองใน Local Storage เรียบร้อยแล้ว');
    }
  };

  const handleLoadSampleQuestions = () => {
    const sampleQuestions: Question[] = [
      {
        id: `custom-sample-1-${Date.now()}`,
        grade: 'K1',
        subject: 'literacy',
        difficulty: 1,
        question: {
          th: 'พยัญชนะไทยตัวแรกคือตัวอะไรเอ่ย?',
          en: 'What is the first letter of the Thai alphabet?',
          zh: '泰语字母表的第一个字母是什么？',
        },
        illustration: '🐔',
        illustrationSubtitle: { th: 'ก ไก่ กุ๊กกุ๊ก', en: 'Kor Kai (Chicken)', zh: '母鸡' },
        options: [
          { id: 'opt-1-1', label: { th: 'ก. ไก่', en: 'Kor Kai', zh: '鸡' }, icon: '🐔' },
          { id: 'opt-1-2', label: { th: 'ข. ไข่', en: 'Khor Khai', zh: '蛋' }, icon: '🥚' },
          { id: 'opt-1-3', label: { th: 'ค. ควาย', en: 'Khor Khway', zh: '水牛' }, icon: '🐃' },
        ],
        correctOptionId: 'opt-1-1',
        explanation: {
          th: 'เก่งมากครับ! ก. ไก่ คือพยัญชนะไทยตัวแรก',
          en: 'Great job! Kor Kai is the first Thai consonant.',
          zh: '太棒了！Kor Kai 是泰语的第一个辅音字母。',
        },
        isCustom: true,
        updatedAt: new Date().toISOString(),
      },
      {
        id: `custom-sample-2-${Date.now()}`,
        grade: 'K2',
        subject: 'math',
        difficulty: 2,
        question: {
          th: 'มีแอปเปิ้ล 3 ผล คุณแม่ให้อีก 2 ผล รวมมีกี่ผล?',
          en: 'You have 3 apples, mom gives 2 more. How many in total?',
          zh: '你有3个苹果，妈妈又给了2个，一共有几个？',
        },
        illustration: '🍎 🍎 🍎 + 🍎 🍎',
        illustrationSubtitle: { th: '3 + 2 = ?', en: '3 + 2 = ?', zh: '3 + 2 = ?' },
        options: [
          { id: 'opt-2-1', label: { th: '4 ผล', en: '4 apples', zh: '4个' }, icon: '4️⃣' },
          { id: 'opt-2-2', label: { th: '5 ผล', en: '5 apples', zh: '5个' }, icon: '5️⃣' },
          { id: 'opt-2-3', label: { th: '6 ผล', en: '6 apples', zh: '6个' }, icon: '6️⃣' },
        ],
        correctOptionId: 'opt-2-2',
        explanation: {
          th: 'ยอดเยี่ยมมากครับ! 3 บวก 2 ได้เท่ากับ 5 ผล',
          en: 'Awesome! 3 + 2 = 5 apples.',
          zh: '真聪明！3加2等于5个苹果。',
        },
        isCustom: true,
        updatedAt: new Date().toISOString(),
      },
    ];

    const res = storageService.saveCustomQuestionsRawJSON(JSON.stringify(sampleQuestions, null, 2));
    if (res.success) {
      refreshFromStorage();
      onQuestionsChange();
      showToast('โหลดตัวอย่างข้อสอบผู้ปกครองสำเร็จ 🎉');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-800 flex items-center gap-2">
                <span>จัดการข้อมูล Local Storage JSON</span>
                <span className="text-[11px] font-mono font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-md">
                  {stats.keyName}
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                ข้อสอบที่ผู้ปกครองและคุณครูสร้างจะถูกบันทึกลงในเครื่อง (Browser LocalStorage) โดยตรง
                สามารถเปิดดู แก้ไข คัดลอก ส่งออก หรือนำเข้าไฟล์ JSON ได้อย่างอิสระ
              </p>
            </div>
          </div>

          {/* Metrics Pill */}
          <div className="flex items-center gap-2 shrink-0 bg-white px-3 py-2 rounded-xl border border-amber-200 shadow-2xs">
            <div className="text-center pr-2 border-r border-slate-100">
              <div className="text-xs font-black text-amber-600">{stats.customCount}</div>
              <div className="text-[10px] text-slate-400 font-bold">ข้อในเครื่อง</div>
            </div>
            <div className="text-center pl-1">
              <div className="text-xs font-black text-slate-700">{stats.sizeKb} KB</div>
              <div className="text-[10px] text-slate-400 font-bold">ขนาดข้อมูล</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar actions */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyJSON}
            className="bg-white hover:bg-slate-50 text-slate-700 font-black text-xs px-3 py-2 rounded-xl border border-slate-300 shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            title="คัดลอกโค้ด JSON ทั้งหมดลงคลิปบอร์ด"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{isCopied ? 'คัดลอกแล้ว!' : 'คัดลอก JSON'}</span>
          </button>

          {/* Download JSON Button */}
          <button
            type="button"
            onClick={handleDownloadJSON}
            className="bg-white hover:bg-slate-50 text-slate-700 font-black text-xs px-3 py-2 rounded-xl border border-slate-300 shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            title="ดาวน์โหลดไฟล์ .json ลงเครื่อง"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>ดาวน์โหลด JSON</span>
          </button>

          {/* Import JSON File */}
          <label className="bg-white hover:bg-slate-50 text-slate-700 font-black text-xs px-3 py-2 rounded-xl border border-slate-300 shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>นำเข้าไฟล์ JSON</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Toggle Edit Raw Mode */}
          {isEditingRaw ? (
            <button
              type="button"
              onClick={handleSaveRawEdit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>บันทึก JSON ดิบ</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsEditingRaw(true);
                setRawDraft(jsonText);
              }}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-black text-xs px-3 py-2 rounded-xl border border-indigo-200 shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              <Edit3 className="w-4 h-4 text-indigo-600" />
              <span>แก้ไข JSON ดิบ</span>
            </button>
          )}

          {isEditingRaw && (
            <button
              type="button"
              onClick={() => {
                setIsEditingRaw(false);
                setRawDraft(jsonText);
                setValidationError(null);
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs px-3 py-2 rounded-xl border border-slate-300 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Undo className="w-4 h-4" />
              <span>ยกเลิก</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <button
            type="button"
            onClick={refreshFromStorage}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="รีเฟรชข้อมูลจาก Local Storage"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Load Sample Button (if empty) */}
          {stats.customCount === 0 && (
            <button
              type="button"
              onClick={handleLoadSampleQuestions}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-xs px-3 py-1.5 rounded-xl border border-amber-300 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>ใส่ตัวอย่างข้อสอบ</span>
            </button>
          )}

          {/* Clear Button */}
          {stats.customCount > 0 && (
            <button
              type="button"
              onClick={handleClearCustomQuestions}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-3 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1 cursor-pointer transition-colors"
              title="ลบเฉพาะข้อสอบที่สร้างเองใน Local Storage"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>ล้าง JSON</span>
            </button>
          )}
        </div>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-800 font-bold animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-black">พบข้อผิดพลาดในรูปแบบ JSON:</span> {validationError}
          </div>
        </div>
      )}

      {/* Editor / Viewer Card */}
      <div className="bg-slate-900 rounded-2xl border-2 border-slate-700 overflow-hidden shadow-inner flex flex-col">
        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300 font-mono">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-amber-300">
              {isEditingRaw ? 'กำลังแก้ไข JSON ดิบ (Raw Editor Mode)' : 'JSON ใน LocalStorage (Read Mode)'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {stats.customCount} คำถาม • {stats.sizeBytes.toLocaleString()} ไบต์
          </span>
        </div>

        {isEditingRaw ? (
          <div className="p-3">
            <textarea
              value={rawDraft}
              onChange={(e) => {
                setRawDraft(e.target.value);
                setValidationError(null);
              }}
              rows={18}
              spellCheck={false}
              className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-y leading-relaxed"
              placeholder='[ { "id": "custom-1", "question": { "th": "..." }, ... } ]'
            />
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center justify-between">
              <span>💡 คำแนะนำ: รูปแบบต้องเป็น Array [...] ของคำถาม โดยมีฟิลด์ question, options, correctOptionId</span>
              <button
                type="button"
                onClick={handleSaveRawEdit}
                className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
              >
                บันทึกการแก้ไข
              </button>
            </p>
          </div>
        ) : (
          <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-[420px] overflow-y-auto leading-relaxed selection:bg-amber-500 selection:text-slate-950">
            {jsonText === '[]' ? (
              <span className="text-slate-500 italic">
                ยังไม่มีข้อสอบที่สร้างเองใน Local Storage (กดปุ่ม &quot;สร้างข้อสอบใหม่&quot; หรือ &quot;ใส่ตัวอย่างข้อสอบ&quot; เพื่อเริ่มต้น)
              </span>
            ) : (
              jsonText
            )}
          </pre>
        )}
      </div>

      {/* Helper Footer */}
      {stats.customCount === 0 && onNavigateToAdd && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-center">
          <p className="text-xs text-amber-900 font-bold mb-2">
            ยังไม่มีข้อสอบใน Local Storage คุณพ่อคุณแม่สามารถเริ่มสร้างข้อสอบชุดแรกได้ทันที!
          </p>
          <button
            type="button"
            onClick={onNavigateToAdd}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs px-4 py-2 rounded-xl shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            ➕ เริ่มสร้างข้อสอบใหม่สำหรับเด็ก
          </button>
        </div>
      )}
    </div>
  );
};
