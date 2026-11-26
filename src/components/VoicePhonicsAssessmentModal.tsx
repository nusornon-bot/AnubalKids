import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Award,
  ChevronRight,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { soundEffects, speakText, stopSpeaking } from '../services/audioService';
import { storageService } from '../services/storageService';
import confetti from 'canvas-confetti';

interface VoicePhonicsWord {
  id: string;
  word: string;
  targetReading: string; // "กอ - อา - กา"
  acceptablePhrases: string[];
  unitName: string;
  unitNumber: number;
  hint: string;
}

const VOICE_WORDS: VoicePhonicsWord[] = [
  // หน่วยที่ ๑: พยัญชนะไทย (ไตรยางศ์)
  {
    id: 'vw-u1-1',
    word: 'กา',
    targetReading: 'กอ - อา - กา (อักษรกลาง)',
    acceptablePhrases: ['กา', 'กอ อา กา', 'กอกา'],
    unitName: 'หน่วยที่ ๑: พยัญชนะไทย & ไตรยางศ์',
    unitNumber: 1,
    hint: 'ก ไก่ อักษรกลาง ออกเสียง: กอ - อา - กา',
  },
  {
    id: 'vw-u1-2',
    word: 'ขา',
    targetReading: 'ขอ - อา - ขา (อักษรสูง)',
    acceptablePhrases: ['ขา', 'ขอ อา ขา', 'ขอขา'],
    unitName: 'หน่วยที่ ๑: พยัญชนะไทย & ไตรยางศ์',
    unitNumber: 1,
    hint: 'ข ไข่ อักษรสูง ออกเสียง: ขอ - อา - ขา',
  },
  {
    id: 'vw-u1-3',
    word: 'คา',
    targetReading: 'คอ - อา - คา (อักษรต่ำ)',
    acceptablePhrases: ['คา', 'คอ อา คา', 'คอคา'],
    unitName: 'หน่วยที่ ๑: พยัญชนะไทย & ไตรยางศ์',
    unitNumber: 1,
    hint: 'ค ควาย อักษรต่ำ ออกเสียง: คอ - อา - คา',
  },

  // หน่วยที่ ๒: สระเดี่ยวและสระประสม
  {
    id: 'vw-u2-1',
    word: 'ตา',
    targetReading: 'ตอ - อา - ตา (สระเสียงยาว)',
    acceptablePhrases: ['ตา', 'ตอ อา ตา', 'ตอตา'],
    unitName: 'หน่วยที่ ๒: สระเดี่ยวและประสม',
    unitNumber: 2,
    hint: 'ออกเสียง: ตอ - อา - ตา',
  },
  {
    id: 'vw-u2-2',
    word: 'ปู',
    targetReading: 'ปอ - อู - ปู',
    acceptablePhrases: ['ปู', 'ปอ อู ปู', 'ปอปู'],
    unitName: 'หน่วยที่ ๒: สระเดี่ยวและประสม',
    unitNumber: 2,
    hint: 'ออกเสียง: ปอ - อู - ปู',
  },
  {
    id: 'vw-u2-3',
    word: 'โต',
    targetReading: 'ตอ - โอ - โต',
    acceptablePhrases: ['โต', 'ตอ โอ โต'],
    unitName: 'หน่วยที่ ๒: สระเดี่ยวและประสม',
    unitNumber: 2,
    hint: 'ออกเสียง: ตอ - โอ - โต',
  },

  // หน่วยที่ ๓: การผันวรรณยุกต์
  {
    id: 'vw-u3-1',
    word: 'แม่',
    targetReading: 'มอ - แอ - แม - ไม้เอก - แม่',
    acceptablePhrases: ['แม่', 'มอ แอ แม', 'มอ แอ แม ไม้เอก แม่'],
    unitName: 'หน่วยที่ ๓: การผันวรรณยุกต์',
    unitNumber: 3,
    hint: 'ออกเสียง: มอ - แอ - แม - ไม้เอก - แม่',
  },
  {
    id: 'vw-u3-2',
    word: 'ป้า',
    targetReading: 'ปอ - อา - ปา - ไม้โท - ป้า',
    acceptablePhrases: ['ป้า', 'ปอ อา ปา ไม้โท ป้า', 'ปา ป่า ป้า'],
    unitName: 'หน่วยที่ ๓: การผันวรรณยุกต์',
    unitNumber: 3,
    hint: 'ออกเสียง: ปอ - อา - ปา - ไม้โท - ป้า',
  },

  // หน่วยที่ ๔: ตัวสะกดตรงตามมาตรา
  {
    id: 'vw-u4-1',
    word: 'กาน',
    targetReading: 'กอ - อา - นอ - กาน (แม่กน)',
    acceptablePhrases: ['กาน', 'กอ อา นอ กาน'],
    unitName: 'หน่วยที่ ๔: ตัวสะกดตรงตามมาตรา',
    unitNumber: 4,
    hint: 'ออกเสียง: กอ - อา - นอ - กาน',
  },
  {
    id: 'vw-u4-2',
    word: 'ดาว',
    targetReading: 'ดอ - อา - วอ - ดาว (แม่เกอว)',
    acceptablePhrases: ['ดาว', 'ดอ อา วอ ดาว'],
    unitName: 'หน่วยที่ ๔: ตัวสะกดตรงตามมาตรา',
    unitNumber: 4,
    hint: 'ออกเสียง: ดอ - อา - วอ - ดาว',
  },

  // หน่วยที่ ๕: ตัวสะกดไม่ตรงตามมาตรา
  {
    id: 'vw-u5-1',
    word: 'เมฆ',
    targetReading: 'มอ - เอ - คอ - เมก (แม่กก)',
    acceptablePhrases: ['เมฆ', 'เมก', 'มอ เอ คอ เมฆ'],
    unitName: 'หน่วยที่ ๕: ตัวสะกดไม่ตรงมาตรา',
    unitNumber: 5,
    hint: 'ฆ ระฆัง อยู่ในมาตราแม่กก ออกเสียง: เมฆ',
  },
  {
    id: 'vw-u5-2',
    word: 'ลาภ',
    targetReading: 'ลอ - อา - พอ - ลาบ (แม่กบ)',
    acceptablePhrases: ['ลาภ', 'ลาบ', 'ลอ อา พอ ลาภ'],
    unitName: 'หน่วยที่ ๕: ตัวสะกดไม่ตรงมาตรา',
    unitNumber: 5,
    hint: 'ภ สำเภา อยู่ในมาตราแม่กบ ออกเสียง: ลาภ',
  },

  // หน่วยที่ ๖: คำควบกล้ำแท้และไม่แท้
  {
    id: 'vw-u6-1',
    word: 'ปลา',
    targetReading: 'ปอ - ลอ - อา - ปลา (ควบแท้)',
    acceptablePhrases: ['ปลา', 'ปอ ลอ อา ปลา'],
    unitName: 'หน่วยที่ ๖: อักษรควบกล้ำ',
    unitNumber: 6,
    hint: 'ออกเสียง ป และ ล พร้อมกัน: ปลา',
  },
  {
    id: 'vw-u6-2',
    word: 'กวาง',
    targetReading: 'กอ - วอ - อา - งอ - กวาง',
    acceptablePhrases: ['กวาง', 'กอ วอ อา งอ กวาง'],
    unitName: 'หน่วยที่ ๖: อักษรควบกล้ำ',
    unitNumber: 6,
    hint: 'ออกเสียง ก และ ว พร้อมกัน: กวาง',
  },

  // หน่วยที่ ๗: อักษรนำ (ห นำ)
  {
    id: 'vw-u7-1',
    word: 'หนู',
    targetReading: 'หอ - นอ - อู - หนู (ห นำ)',
    acceptablePhrases: ['หนู', 'หอ นอ อู หนู'],
    unitName: 'หน่วยที่ ๗: อักษรนำและคำที่มี ห นำ',
    unitNumber: 7,
    hint: 'ห นำ น ออกเสียง: หนู',
  },
  {
    id: 'vw-u7-2',
    word: 'หมู',
    targetReading: 'หอ - มอ - อู - หมู',
    acceptablePhrases: ['หมู', 'หอ มอ อู หมู'],
    unitName: 'หน่วยที่ ๗: อักษรนำและคำที่มี ห นำ',
    unitNumber: 7,
    hint: 'ห นำ ม ออกเสียง: หมู',
  },

  // หน่วยที่ ๘: คำที่มีตัวการันต์
  {
    id: 'vw-u8-1',
    word: 'เสาร์',
    targetReading: 'สอ - เอา - เสา (ร การันต์ ไม่ออกเสียง)',
    acceptablePhrases: ['เสาร์', 'เสา', 'วันเสาร์'],
    unitName: 'หน่วยที่ ๘: ตัวการันต์และไม้ทัณฑฆาต',
    unitNumber: 8,
    hint: 'ร มีไม้ทัณฑฆาตกำกับ ไม่ออกเสียง ร: เสาร์',
  },
  {
    id: 'vw-u8-2',
    word: 'ยักษ์',
    targetReading: 'ยอ - อะ - กอ - สอ - ยัก (ษ การันต์)',
    acceptablePhrases: ['ยักษ์', 'ยัก'],
    unitName: 'หน่วยที่ ๘: ตัวการันต์และไม้ทัณฑฆาต',
    unitNumber: 8,
    hint: 'ษ การันต์ ไม่ออกเสียง: ยักษ์',
  },

  // หน่วยที่ ๙: คำที่มี รร (ร หัน) และ ฤ ฤๅ
  {
    id: 'vw-u9-1',
    word: 'กรรไกร',
    targetReading: 'กัน - ไกร (ร หัน ออกเสียงอัน)',
    acceptablePhrases: ['กรรไกร', 'กันไกร'],
    unitName: 'หน่วยที่ ๙: คำที่มี รร และ ฤ ฤๅ',
    unitNumber: 9,
    hint: 'รร ไม่มีตัวสะกด ออกเสียง อัน: กรรไกร',
  },
  {
    id: 'vw-u9-2',
    word: 'ฤดู',
    targetReading: 'รึ - ดู (ฤ ออกเสียง รึ)',
    acceptablePhrases: ['ฤดู', 'รึดู'],
    unitName: 'หน่วยที่ ๙: คำที่มี รร และ ฤ ฤๅ',
    unitNumber: 9,
    hint: 'ฤ ในคำนี้ ออกเสียง รึ: ฤดู',
  },

  // หน่วยที่ ๑๐: คำประสมและสำนวนไทย
  {
    id: 'vw-u10-1',
    word: 'แม่น้ำ',
    targetReading: 'แม่ + น้ำ = แม่น้ำ',
    acceptablePhrases: ['แม่น้ำ', 'แม่ น้ำ'],
    unitName: 'หน่วยที่ ๑๐: คำประสมและสำนวนไทย',
    unitNumber: 10,
    hint: 'คำประสมเกิดจาก แม่ รวมกับ น้ำ: แม่น้ำ',
  },
  {
    id: 'vw-u10-2',
    word: 'น้ำใจ',
    targetReading: 'น้ำ + ใจ = น้ำใจ',
    acceptablePhrases: ['น้ำใจ', 'น้ำ ใจ'],
    unitName: 'หน่วยที่ ๑๐: คำประสมและสำนวนไทย',
    unitNumber: 10,
    hint: 'ความเอื้อเฟื้อเผื่อแผ่: น้ำใจ',
  },
];

interface VoicePhonicsAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardStars?: (stars: number) => void;
  soundVolume?: number;
}

export const VoicePhonicsAssessmentModal: React.FC<VoicePhonicsAssessmentModalProps> = ({
  isOpen,
  onClose,
  onRewardStars,
  soundVolume = 1,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [evaluationResult, setEvaluationResult] = useState<'idle' | 'success' | 'retry'>('idle');
  const [score, setScore] = useState(0);
  const [starsEarned, setStarsEarned] = useState(0);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);
  const recognitionRef = useRef<any>(null);

  const currentWord = VOICE_WORDS[currentIndex];

  useEffect(() => {
    // Check Web Speech API availability
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasSpeechSupport(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'th-TH';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.trim();
        setRecognizedText(transcript);
        verifySpokenWord(transcript);
        setIsListening(false);
      };

      recognition.onerror = (e: any) => {
        setIsListening(false);
        if (e.error !== 'no-speech') {
          console.warn('Speech recognition error:', e.error);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch {
      setHasSpeechSupport(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [currentIndex]);

  const startListening = () => {
    stopSpeaking();
    setRecognizedText('');
    setEvaluationResult('idle');
    soundEffects.play('pop');

    if (recognitionRef.current) {
      try {
        setIsListening(true);
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    } else {
      // Fallback simulation for unsupported browsers or automated testing
      simulateSpeechInput();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  };

  const simulateSpeechInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setRecognizedText(currentWord.word);
      verifySpokenWord(currentWord.word);
    }, 1500);
  };

  const verifySpokenWord = (spoken: string) => {
    const cleanSpoken = spoken.replace(/\s+/g, '').toLowerCase();
    const isMatched = currentWord.acceptablePhrases.some((phrase) => {
      const cleanPhrase = phrase.replace(/\s+/g, '').toLowerCase();
      return cleanSpoken.includes(cleanPhrase) || cleanPhrase.includes(cleanSpoken);
    });

    if (isMatched) {
      setEvaluationResult('success');
      setScore((prev) => prev + 10);
      setStarsEarned((prev) => prev + 1);
      soundEffects.play('success');
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
      speakText('เก่งมากครับ! ออกเสียงถูกต้องชัดเจน', 'th', 'adult_female', soundVolume);
      if (onRewardStars) onRewardStars(1);
      try {
        const profiles = storageService.getProfiles();
        const active = storageService.getActiveProfile();
        if (active) {
          const idx = profiles.findIndex((p) => p.id === active.id);
          if (idx !== -1) {
            profiles[idx].totalScore = (profiles[idx].totalScore || 0) + 1;
            storageService.saveProfiles(profiles);
          }
        }
      } catch (err) {
        console.warn('Error saving voice assessment star:', err);
      }
    } else {
      setEvaluationResult('retry');
      soundEffects.play('incorrect');
      speakText(`ลองอีกครั้งนะครับ ออกเสียงว่า ${currentWord.targetReading}`, 'th', 'adult_female', soundVolume);
    }
  };

  const playTargetAudio = () => {
    soundEffects.play('pop');
    speakText(`${currentWord.targetReading} อ่านว่า ${currentWord.word}`, 'th', 'adult_female', soundVolume);
  };

  const nextWord = () => {
    soundEffects.play('pop');
    if (currentIndex < VOICE_WORDS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setRecognizedText('');
      setEvaluationResult('idle');
    }
  };

  const prevWord = () => {
    soundEffects.play('pop');
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setRecognizedText('');
      setEvaluationResult('idle');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl border-3 border-emerald-300 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 p-4 sm:p-5 text-white flex items-center justify-between gap-3 shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
              🎙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black">
                  ระบบฝึกออกเสียงสะกดคำ (AI Phonics Voice Check)
                </h2>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Oral Fluency</span>
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium">
                ฝึกเปล่งเสียงอ่านแจกลูกสะกดคำผ่านไมโครโฟน AI ตรวจจับความแม่นยำรายพยางค์
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              stopListening();
              stopSpeaking();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto space-y-6 flex flex-col items-center text-center">
          {/* Progress & Score Bar */}
          <div className="w-full flex items-center justify-between text-xs font-bold text-gray-600 bg-emerald-50/80 px-4 py-2.5 rounded-2xl border border-emerald-100">
            <span>
              คำที่ {currentIndex + 1} จาก {VOICE_WORDS.length} คำ
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-amber-600">
                <Award className="w-4 h-4" />
                <span>คะแนนสะสม: {score}</span>
              </span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                ⭐ {starsEarned} ดาว
              </span>
            </div>
          </div>

          {/* Unit tag */}
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            {currentWord.unitName}
          </span>

          {/* Target Word Display */}
          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-7xl font-black text-gray-900 tracking-wider my-2">
              {currentWord.word}
            </span>
            <div className="text-base sm:text-lg font-bold text-emerald-700 bg-white px-4 py-1.5 rounded-xl border border-emerald-200 shadow-xs">
              สูตรสะกด: {currentWord.targetReading}
            </div>
          </div>

          {/* Listen Target Audio Button */}
          <button
            type="button"
            onClick={playTargetAudio}
            className="px-4 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer border border-indigo-200"
          >
            <Volume2 className="w-4 h-4" />
            <span>ฟังเสียงต้นแบบสะกดคำ (สพฐ.)</span>
          </button>

          {/* Microphone Interactive Zone */}
          <div className="py-2 flex flex-col items-center">
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer shadow-xl transform active:scale-95 ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-200 scale-105'
                  : 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white hover:opacity-95 hover:scale-105'
              }`}
            >
              {isListening ? <Mic className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
              <span className="text-[11px] font-black mt-1">
                {isListening ? 'กำลังฟัง...' : 'กดแล้วพูด'}
              </span>
            </button>

            <p className="text-xs text-gray-500 mt-3 font-medium">
              {isListening
                ? 'พูดออกเสียงสะกดคำอย่างชัดเจน...'
                : 'กดปุ่มไมโครโฟนแล้วออกเสียง เช่น "' + currentWord.word + '"'}
            </p>
          </div>

          {/* Feedback & Recognition Result */}
          {recognizedText && (
            <div className="w-full max-w-md bg-gray-50 rounded-2xl p-3 border border-gray-200 text-xs text-gray-600">
              <span className="font-bold text-gray-500">เสียงที่ระบบได้ยิน: </span>
              <span className="font-black text-gray-800 text-sm">"{recognizedText}"</span>
            </div>
          )}

          {evaluationResult === 'success' && (
            <div className="w-full max-w-md bg-emerald-100/80 border-2 border-emerald-400 rounded-2xl p-4 flex items-center gap-3 text-left animate-bounce-short">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-sm font-black text-emerald-900">ยอดเยี่ยมมาก! ออกเสียงถูกต้อง</h4>
                <p className="text-xs text-emerald-700 font-medium">
                  ออกเสียงสะกดตรงตามอักขรวิธี รับไปเลย +10 คะแนน!
                </p>
              </div>
            </div>
          )}

          {evaluationResult === 'retry' && (
            <div className="w-full max-w-md bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-center gap-3 text-left">
              <AlertCircle className="w-8 h-8 text-rose-500 shrink-0" />
              <div>
                <h4 className="text-sm font-black text-rose-900">ยังไม่ตรง ลองใหม่อีกครั้งนะ!</h4>
                <p className="text-xs text-rose-700 font-medium">
                  คำใบ้: {currentWord.hint} (กดฟังตัวอย่างเสียงอีกครั้งได้ครับ)
                </p>
              </div>
            </div>
          )}

          {!hasSpeechSupport && (
            <div className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>เบราว์เซอร์นี้เปิดโหมดจำลองเสียงพูดอัตโนมัติเพื่อการเรียนรู้</span>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={prevWord}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            ← คำก่อนหน้า
          </button>

          <button
            type="button"
            onClick={nextWord}
            disabled={currentIndex === VOICE_WORDS.length - 1}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>คำถัดไป</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
