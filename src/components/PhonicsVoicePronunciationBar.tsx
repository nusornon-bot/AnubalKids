import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Star, CheckCircle2, RotateCcw, HelpCircle, AudioWaveform as Waveform } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, GameSettings } from '../types';
import { soundEffects, speakText, stopSpeaking } from '../services/audioService';
import { storageService } from '../services/storageService';

interface PhonicsVoicePronunciationBarProps {
  question: Question;
  settings: GameSettings;
  soundVolume?: number;
  onStarsAwarded?: (stars: number) => void;
}

export function extractTargetSpellingWord(question: Question): string | null {
  if (!question) return null;
  const th = question.question?.th || '';

  // 1. Quoted word: 'กา', "ปลา", 'แม่', 'กรรไกร'
  const quoteMatch = th.match(/['"“‘]([ก-๙]+)['"”’]/);
  if (quoteMatch && quoteMatch[1] && quoteMatch[1].length <= 15) {
    return quoteMatch[1].trim();
  }

  // 2. "คำว่า X"
  const wordMatch = th.match(/คำว่า\s*([ก-๙]+)/);
  if (wordMatch && wordMatch[1] && wordMatch[1].length <= 15) {
    return wordMatch[1].trim();
  }

  // 3. "สะกดคำว่า X" or "สะกด X"
  const spellMatch = th.match(/สะกด(?:คำว่า)?\s*([ก-๙]+)/);
  if (spellMatch && spellMatch[1] && spellMatch[1].length <= 15) {
    return spellMatch[1].trim();
  }

  // 4. "สระ X"
  const vowelMatch = th.match(/สระ\s*([ก-๙]+)/);
  if (vowelMatch && vowelMatch[1] && vowelMatch[1].length <= 10) {
    return vowelMatch[1].trim();
  }

  // 5. Correct option label if short and suitable Thai word
  const correctOption = question.options?.find((o) => o.id === question.correctOptionId);
  const correctLabel = correctOption?.label?.th?.trim() || '';
  if (
    correctLabel &&
    correctLabel.length >= 1 &&
    correctLabel.length <= 12 &&
    !correctLabel.includes('สระเสียง') &&
    !correctLabel.includes('ตัวเลือก') &&
    !correctLabel.includes('ถูกต้อง') &&
    !correctLabel.includes('ข้อ')
  ) {
    return correctLabel;
  }

  // 6. First option label if simple word
  if (question.options && question.options[0]?.label?.th) {
    const optLabel = question.options[0].label.th.trim();
    if (optLabel.length >= 1 && optLabel.length <= 8 && !optLabel.includes('สระเสียง')) {
      return optLabel;
    }
  }

  return null;
}

function cleanThaiText(text: string): string {
  return text.replace(/[^\u0E00-\u0E7Fa-zA-Z0-9]/g, '').trim().toLowerCase();
}

function awardStarToProfile(starCount: number = 1): void {
  try {
    const profiles = storageService.getProfiles();
    const active = storageService.getActiveProfile();
    if (active) {
      const idx = profiles.findIndex((p) => p.id === active.id);
      if (idx !== -1) {
        profiles[idx].totalScore = (profiles[idx].totalScore || 0) + starCount;
        storageService.saveProfiles(profiles);
      }
    }
  } catch (err) {
    console.warn('Unable to persist voice star award:', err);
  }
}

export const PhonicsVoicePronunciationBar: React.FC<PhonicsVoicePronunciationBarProps> = ({
  question,
  settings,
  soundVolume = 0.8,
  onStarsAwarded,
}) => {
  const isPhonics =
    question.subject?.startsWith('phonics_') ||
    settings.curriculumMode === 'thai_phonics';

  const targetWord = extractTargetSpellingWord(question);

  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [evaluationResult, setEvaluationResult] = useState<'idle' | 'success' | 'retry' | 'unsupported'>('idle');
  const [hasAwardedStar, setHasAwardedStar] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Reset state when question changes
  useEffect(() => {
    setIsListening(false);
    setSpokenTranscript('');
    setEvaluationResult('idle');
    setHasAwardedStar(false);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }
  }, [question.id]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
      stopSpeaking();
    };
  }, []);

  if (!isPhonics || !targetWord) {
    return null;
  }

  const handlePlayModelAudio = () => {
    stopSpeaking();
    setAudioPlaying(true);
    soundEffects.playTap(soundVolume);
    speakText(
      targetWord,
      'th',
      settings.voicePersona,
      soundVolume
    );
    setTimeout(() => setAudioPlaying(false), 1500);
  };

  const handleStartListening = () => {
    stopSpeaking();
    setSpokenTranscript('');
    setEvaluationResult('idle');
    soundEffects.playTap(soundVolume);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setEvaluationResult('unsupported');
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'th-TH';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript?.trim() || '';
        setSpokenTranscript(transcript);
        evaluateSpeech(transcript);
        setIsListening(false);
      };

      recognition.onerror = (e: any) => {
        console.warn('SpeechRecognition error:', e?.error);
        setIsListening(false);
        if (e?.error === 'not-allowed' || e?.error === 'service-not-allowed') {
          setEvaluationResult('unsupported');
        } else if (e?.error === 'no-speech') {
          setEvaluationResult('retry');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Failed to start speech recognition:', err);
      setIsListening(false);
      setEvaluationResult('unsupported');
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  };

  const evaluateSpeech = (transcript: string) => {
    const cleanSpoken = cleanThaiText(transcript);
    const cleanTarget = cleanThaiText(targetWord);

    if (!cleanSpoken || !cleanTarget) {
      setEvaluationResult('retry');
      return;
    }

    // Match conditions: exact match, includes, or spoken includes target
    const isDirectMatch =
      cleanSpoken === cleanTarget ||
      cleanSpoken.includes(cleanTarget) ||
      cleanTarget.includes(cleanSpoken);

    if (isDirectMatch) {
      setEvaluationResult('success');
      soundEffects.playVictory(soundVolume);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899'],
        });
      } catch {
        // ignore
      }

      if (!hasAwardedStar) {
        setHasAwardedStar(true);
        awardStarToProfile(1);
        onStarsAwarded?.(1);
      }
    } else {
      setEvaluationResult('retry');
      soundEffects.playTap(soundVolume);
    }
  };

  // Fallback simulation for unsupported environments
  const handleSimulateSuccessfulPractice = () => {
    soundEffects.playTap(soundVolume);
    setSpokenTranscript(targetWord);
    setEvaluationResult('success');
    soundEffects.playVictory(soundVolume);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.65 },
      });
    } catch {
      // ignore
    }
    if (!hasAwardedStar) {
      setHasAwardedStar(true);
      awardStarToProfile(1);
      onStarsAwarded?.(1);
    }
  };

  return (
    <div
      id="phonics-voice-pronunciation-widget"
      className="w-full my-2 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-2xl border-2 border-emerald-300 p-2.5 sm:p-3 shadow-xs transition-all"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        {/* Left: Target Word & Phonics Guidance */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-lg shadow-xs shrink-0">
            🎙️
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-200/90 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300">
                ฝึกอ่านออกเสียงคำสะกด
              </span>
              {hasAwardedStar && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-black bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full shadow-2xs animate-bounce">
                  <Star className="w-3 h-3 fill-amber-950 text-amber-950" />
                  <span>+1 ดาวโบนัส</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                คำที่กำลังสะกด:
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-900 px-2.5 py-0.5 bg-white rounded-lg border border-emerald-300 shadow-2xs tracking-wide">
                &ldquo;{targetWord}&rdquo;
              </span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Voice Buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 flex-wrap">
          {/* Listen model audio button */}
          <button
            type="button"
            id="btn-voice-listen-model"
            onClick={handlePlayModelAudio}
            className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer flex items-center gap-1 shadow-2xs active:scale-95 ${
              audioPlaying
                ? 'bg-sky-200 text-sky-900 border-sky-400 ring-2 ring-sky-300'
                : 'bg-white hover:bg-sky-50 text-sky-800 border-sky-300'
            }`}
            title="ฟังเสียงอ่านต้นแบบคำนี้"
          >
            <Volume2 className="w-3.5 h-3.5 text-sky-600" />
            <span>ฟังเสียงคำนี้</span>
          </button>

          {/* Microphone speak button */}
          {!isListening ? (
            <button
              type="button"
              id="btn-voice-start-mic"
              onClick={handleStartListening}
              className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-2 border-emerald-600 shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              title="กดเพื่อออกเสียงคำนี้ใส่ไมค์"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>กดไมค์เพื่อฝึกพูด</span>
            </button>
          ) : (
            <button
              type="button"
              id="btn-voice-stop-mic"
              onClick={handleStopListening}
              className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-rose-500 hover:bg-rose-600 text-white border-2 border-rose-600 shadow-sm transition-all cursor-pointer flex items-center gap-1.5 animate-pulse active:scale-95"
              title="กำลังฟังเสียง... กดเพื่อยกเลิก"
            >
              <MicOff className="w-3.5 h-3.5" />
              <span>กำลังฟัง... (กดเพื่อหยุด)</span>
            </button>
          )}
        </div>
      </div>

      {/* Listening Wave & Progress Alert */}
      {isListening && (
        <div className="mt-2 bg-rose-50 border border-rose-200 rounded-xl p-2 flex items-center justify-between text-xs text-rose-800 animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="font-black">กำลังฟังเสียงหนูอ่านคำว่า &ldquo;{targetWord}&rdquo;... พูดใส่ไมค์ได้เลยจ้า 🎙️</span>
          </div>
          <span className="text-[10px] bg-rose-200/80 text-rose-900 px-2 py-0.5 rounded-md font-bold">
            Web Speech API (th-TH)
          </span>
        </div>
      )}

      {/* Evaluation Results Banner */}
      {evaluationResult === 'success' && (
        <div className="mt-2 bg-emerald-100/90 border border-emerald-400 rounded-xl p-2 flex items-center justify-between gap-2 text-xs text-emerald-950 animate-in slide-in-from-top-1">
          <div className="flex items-center gap-2 flex-wrap">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-black">
              🎉 ยอดเยี่ยมมาก! ออกเสียงถูกต้องชัดเจน: &ldquo;{spokenTranscript || targetWord}&rdquo;
            </span>
          </div>
          <div className="flex items-center gap-1 bg-amber-400 text-amber-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-xs shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
            <span>+1 ดาว ⭐</span>
          </div>
        </div>
      )}

      {evaluationResult === 'retry' && (
        <div className="mt-2 bg-amber-100/90 border border-amber-400 rounded-xl p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-amber-950 animate-in slide-in-from-top-1">
          <div className="flex items-center gap-2 flex-wrap">
            <RotateCcw className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              ได้ยินว่า <strong className="font-black">&ldquo;{spokenTranscript || '...'}&rdquo;</strong> (ยังไม่ตรงกับคำว่า &ldquo;{targetWord}&rdquo;)
            </span>
          </div>
          <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={handlePlayModelAudio}
              className="text-[11px] font-bold bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-lg cursor-pointer"
            >
              🔊 ฟังตัวอย่าง
            </button>
            <button
              type="button"
              onClick={handleStartListening}
              className="text-[11px] font-black bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-0.5 rounded-lg cursor-pointer shadow-2xs"
            >
              🎤 ลองพูดใหม่อีกครั้ง
            </button>
          </div>
        </div>
      )}

      {evaluationResult === 'unsupported' && (
        <div className="mt-2 bg-slate-100 border border-slate-300 rounded-xl p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-700 animate-in fade-in">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
            <span>เบราว์เซอร์ยังไม่ได้อนุญาตไมโครโฟน หรือไมค์ยังไม่พร้อมใช้งาน</span>
          </div>
          <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={handlePlayModelAudio}
              className="text-[11px] font-bold bg-white text-slate-800 border border-slate-300 px-2.5 py-0.5 rounded-lg cursor-pointer"
            >
              🔊 ฟังเสียงอ่าน
            </button>
            <button
              type="button"
              onClick={handleSimulateSuccessfulPractice}
              className="text-[11px] font-black bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-0.5 rounded-lg cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
              <span>ฝึกอ่านออกเสียงแล้ว (+1 ดาว)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
