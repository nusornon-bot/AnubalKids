import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Camera,
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Upload,
  CheckCircle2,
  Sparkles,
  Trophy,
  Compass,
  Trees,
  Search,
  BookOpen,
  Calendar,
  Volume2,
  Trash2,
  Plus,
  Minus,
  Check,
  ChevronRight,
  ArrowLeft,
  Eye,
  Star,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChildProfile, OutdoorMission, OutdoorMissionSubmission, Subject, VoicePersona } from '../types';
import { OUTDOOR_MISSIONS } from '../data/outdoorMissions';
import { storageService } from '../services/storageService';
import { soundEffects, speakText, stopSpeaking } from '../services/audioService';

interface OutdoorLearningAdventureModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: ChildProfile;
  soundVolume?: number;
  voicePersona?: VoicePersona;
  onMissionSubmitted?: () => void;
}

type TabType = 'missions' | 'journal';

export const OutdoorLearningAdventureModal: React.FC<OutdoorLearningAdventureModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
  soundVolume = 0.6,
  voicePersona = 'child_girl',
  onMissionSubmitted,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('missions');
  const [selectedMission, setSelectedMission] = useState<OutdoorMission | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Submissions list
  const [submissions, setSubmissions] = useState<OutdoorMissionSubmission[]>([]);

  // Evidence capture states
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mission notes & count value
  const [countValue, setCountValue] = useState<number>(3);
  const [notes, setNotes] = useState<string>('');
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  // Celebration state
  const [justSubmittedMission, setJustSubmittedMission] = useState<OutdoorMissionSubmission | null>(null);

  // Load submissions
  const loadSubmissions = () => {
    if (activeProfile?.id) {
      const records = storageService.getOutdoorMissionSubmissions(activeProfile.id);
      setSubmissions(records);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadSubmissions();
    }
  }, [isOpen, activeProfile?.id]);

  // Clean up camera stream and recording on unmount/close
  useEffect(() => {
    return () => {
      stopCamera();
      stopRecording();
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
      }
    };
  }, []);

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraError(null);
      setIsCameraActive(true);
      soundEffects.playTap(soundVolume);
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError('ไม่สามารถเปิดกล้องได้ กรุณาอนุญาตสิทธิ์การเข้าถึงกล้อง หรือกดเลือกไฟล์ภาพจากเครื่องแทน');
      setIsCameraActive(false);
    }
  };

  const capturePhotoFromCamera = () => {
    if (!videoRef.current) return;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setPhotoDataUrl(dataUrl);
        soundEffects.playSuccess(soundVolume);
      }
      stopCamera();
    } catch (e) {
      console.warn('Capture error:', e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoDataUrl(event.target.result as string);
          soundEffects.playSuccess(soundVolume);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Audio recording logic
  const startRecording = async () => {
    try {
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
        setAudioBlobUrl(null);
      }
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlobUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      setMicError(null);
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      soundEffects.playTap(soundVolume);

      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 60) {
            // max 60s
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone error:', err);
      setMicError('ไม่สามารถเข้าถึงไมโครโฟนได้ กรุณาอนุญาตสิทธิ์การใช้งานไมโครโฟนในเบราว์เซอร์');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    soundEffects.playTap(soundVolume);
  };

  const togglePlayAudio = () => {
    if (!audioBlobUrl) return;
    if (!audioElementRef.current) {
      audioElementRef.current = new Audio(audioBlobUrl);
      audioElementRef.current.onended = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioElementRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioElementRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  const handleSelectMission = (mission: OutdoorMission) => {
    stopCamera();
    stopRecording();
    setSelectedMission(mission);
    setPhotoDataUrl(null);
    setAudioBlobUrl(null);
    setNotes('');
    setCheckedSteps({});
    setCountValue(mission.category === 'counting' ? 3 : 1);
    soundEffects.playTap(soundVolume);
  };

  const handleBackToList = () => {
    stopCamera();
    stopRecording();
    setSelectedMission(null);
    setJustSubmittedMission(null);
  };

  const handleSubmitMission = () => {
    if (!selectedMission || !activeProfile) return;

    soundEffects.playVictory(soundVolume);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }

    const submission: OutdoorMissionSubmission = {
      id: `outdoor_${Date.now()}`,
      missionId: selectedMission.id,
      missionTitle: selectedMission.title,
      profileId: activeProfile.id,
      profileName: activeProfile.name,
      completedAt: new Date().toISOString(),
      photoUrl: photoDataUrl || undefined,
      audioUrl: audioBlobUrl || undefined,
      audioDurationSeconds: recordingSeconds > 0 ? recordingSeconds : undefined,
      countValue: selectedMission.category === 'counting' ? countValue : undefined,
      notes: notes.trim() || undefined,
      stars: 3,
      pointsEarned: selectedMission.pointsReward,
    };

    storageService.saveOutdoorMissionSubmission(submission);
    setJustSubmittedMission(submission);
    loadSubmissions();

    if (onMissionSubmitted) {
      onMissionSubmitted();
    }
  };

  const filteredMissions = OUTDOOR_MISSIONS.filter((m) => {
    const matchCategory = categoryFilter === 'all' || m.category === categoryFilter;
    const matchSearch =
      !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.targetPrompt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const completedMissionIds = new Set(submissions.map((s) => s.missionId));

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-3 sm:pt-6 md:pt-8 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border-4 border-emerald-300 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 my-auto sm:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 p-4 sm:p-5 text-white relative shrink-0 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl sm:text-3xl shadow-inner shrink-0">
              🌿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-2xl font-black font-display tracking-tight text-white drop-shadow-xs">
                  Outdoor Learning Adventure
                </h2>
                <span className="bg-emerald-400 text-emerald-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                  นักสำรวจธรรมชาติ 🔍
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                ภารกิจสังเกตสิ่งแวดล้อมรอบตัวเด็ก บันทึกภาพถ่ายและเสียง สำหรับ {activeProfile.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="bg-emerald-50/80 px-4 pt-2.5 border-b border-emerald-100 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab('missions');
              handleBackToList();
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-black rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'missions' && !selectedMission
                ? 'bg-white text-emerald-800 shadow-xs border-t-2 border-x-2 border-emerald-300'
                : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100/50'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>ภารกิจสำรวจธรรมชาติ ({OUTDOOR_MISSIONS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('journal');
              setSelectedMission(null);
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-black rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'journal'
                ? 'bg-white text-emerald-800 shadow-xs border-t-2 border-x-2 border-emerald-300'
                : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100/50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>สมุดบันทึกนักสำรวจ ({submissions.length})</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 min-h-0 bg-slate-50/50">
          {/* VIEW 1: Missions List */}
          {activeTab === 'missions' && !selectedMission && (
            <div className="space-y-4">
              {/* Category Pills & Search */}
              <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
                  {[
                    { id: 'all', label: 'ทั้งหมด' },
                    { id: 'counting', label: '🌳 การนับ' },
                    { id: 'color', label: '🌸 สีสัน' },
                    { id: 'observation', label: '🔍 สังเกตรูปทรง' },
                    { id: 'sound', label: '👂 เสียงธรรมชาติ' },
                    { id: 'texture', label: '🖐️ ผิวสัมผัส' },
                    { id: 'living_things', label: '🐛 สิ่งมีชีวิต' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                        categoryFilter === cat.id
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ค้นหาภารกิจ..."
                    className="w-full pl-8 pr-3 py-1.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Missions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredMissions.map((m) => {
                  const isDone = completedMissionIds.has(m.id);
                  return (
                    <div
                      key={m.id}
                      onClick={() => handleSelectMission(m)}
                      className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                            {m.icon}
                          </div>
                          <div className="flex items-center gap-1.5">
                            {isDone && (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                สำเร็จแล้ว
                              </span>
                            )}
                            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                              +{m.pointsReward} คะแนน ⭐
                            </span>
                          </div>
                        </div>

                        <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                          {m.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-semibold line-clamp-1 mt-0.5">
                          {m.subtitle}
                        </p>
                        <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-1.5 leading-relaxed">
                          {m.targetPrompt}
                        </p>

                        {/* Skills / Competencies Developed Badges */}
                        {m.skillsDeveloped && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1 text-[11px]">
                            <div className="flex items-center gap-1.5 text-rose-700 bg-rose-50/80 px-2 py-0.5 rounded-lg font-bold">
                              <span className="shrink-0">🌸 ปฐมวัย:</span>
                              <span className="truncate">{m.skillsDeveloped.earlyChildhood}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded-lg font-bold">
                              <span className="shrink-0">🏫 สมรรถนะ CBE:</span>
                              <span className="truncate">{m.skillsDeveloped.cbeCompetency}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <span>📸 ถ่ายรูป</span>
                          <span>•</span>
                          <span>🎙️ อัดเสียง</span>
                        </div>
                        <span className="text-xs font-black text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1">
                          <span>เริ่มภารกิจ</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 2: Active Mission Execution & Submission */}
          {activeTab === 'missions' && selectedMission && !justSubmittedMission && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleBackToList}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>กลับไปหน้ารวมภารกิจ</span>
              </button>

              {/* Mission Header Card */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 rounded-2xl p-4 sm:p-5 border-2 border-emerald-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md border-2 border-emerald-300 flex items-center justify-center text-3xl shrink-0">
                    {selectedMission.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        {selectedMission.title}
                      </span>
                      <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-amber-300">
                        รางวัล: +{selectedMission.pointsReward} คะแนน ⭐
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-900 font-bold mt-1">
                      {selectedMission.targetPrompt}
                    </p>

                    {/* Active Mission Skills / Competencies Developed */}
                    {selectedMission.skillsDeveloped && (
                      <div className="mt-3 p-2.5 bg-white/90 backdrop-blur-xs rounded-xl border border-emerald-200 shadow-2xs flex flex-col gap-1.5 text-xs">
                        <div className="flex items-start gap-2 font-bold text-rose-800">
                          <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md text-[10px] font-black shrink-0">
                            🌸 ทักษะปฐมวัย
                          </span>
                          <span>{selectedMission.skillsDeveloped.earlyChildhood}</span>
                        </div>
                        <div className="flex items-start gap-2 font-bold text-blue-800">
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md text-[10px] font-black shrink-0">
                            🏫 สมรรถนะหลักสูตร CBE
                          </span>
                          <span>{selectedMission.skillsDeveloped.cbeCompetency}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Steps Checklist */}
                <div className="mt-4 pt-3 border-t border-emerald-200/60 space-y-1.5">
                  <span className="text-xs font-black text-emerald-900 block mb-1">
                    📋 ขั้นตอนการสำรวจ:
                  </span>
                  {selectedMission.guideSteps.map((step, idx) => (
                    <label
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(checkedSteps[idx])}
                        onChange={() => {
                          setCheckedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
                          soundEffects.playTap(soundVolume);
                        }}
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className={checkedSteps[idx] ? 'line-through text-slate-400' : ''}>
                        {step}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Evidence Submission Area (Photo & Voice) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Photo Capture Section */}
                <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-emerald-600" />
                        <span>1. บันทึกภาพถ่าย (Photo)</span>
                      </h4>
                      {photoDataUrl && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          มีรูปแล้ว ✓
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mb-3">
                      ถ่ายภาพสิ่งที่ค้นพบจากกล้อง หรือเลือกรูปจากเครื่อง
                    </p>

                    {cameraError && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-2.5 rounded-xl mb-2 font-medium">
                        ⚠️ {cameraError}
                      </div>
                    )}

                    {/* Camera view or Photo preview */}
                    {isCameraActive ? (
                      <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center mb-2">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={capturePhotoFromCamera}
                          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-emerald-700 font-black px-4 py-2 rounded-full shadow-lg text-xs flex items-center gap-1.5 cursor-pointer hover:bg-emerald-50"
                        >
                          <Camera className="w-4 h-4" />
                          <span>กดถ่ายภาพ 📸</span>
                        </button>
                      </div>
                    ) : photoDataUrl ? (
                      <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-video flex items-center justify-center mb-2 group border border-slate-200">
                        <img src={photoDataUrl} alt="รูปที่ถ่าย" className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => setPhotoDataUrl(null)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer hover:bg-rose-600 transition-colors"
                          title="ลบรูป"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="rounded-xl border-2 border-dashed border-slate-200 p-4 text-center bg-slate-50/50 mb-2">
                        <Camera className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                        <span className="text-xs text-slate-400 font-medium block">
                          ยังไม่มีภาพถ่าย
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    {!isCameraActive ? (
                      <button
                        type="button"
                        onClick={startCamera}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>เปิดกล้องถ่ายภาพ</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>ปิดกล้อง</span>
                      </button>
                    )}

                    <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>เลือกไฟล์</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* 2. Voice Recording Section */}
                <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <Mic className="w-4 h-4 text-emerald-600" />
                        <span>2. บันทึกเสียงเล่า (Voice Note)</span>
                      </h4>
                      {audioBlobUrl && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          มีเสียงแล้ว ✓
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mb-3">
                      กดอัดเสียงให้หนูน้อยเล่าสิ่งที่เห็น หรือเลียนแบบเสียงธรรมชาติ
                    </p>

                    {micError && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-2.5 rounded-xl mb-2 font-medium">
                        ⚠️ {micError}
                      </div>
                    )}

                    <div className="rounded-xl border-2 border-slate-200 p-4 bg-slate-50 text-center mb-2 flex flex-col items-center justify-center min-h-[120px]">
                      {isRecording ? (
                        <div className="space-y-2">
                          <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center text-xl animate-pulse mx-auto shadow-md">
                            🎙️
                          </div>
                          <div className="text-rose-600 font-black text-sm animate-bounce">
                            กำลังบันทึกเสียง... ({recordingSeconds} วินาที)
                          </div>
                          <span className="text-[10px] text-slate-400">
                            เล่าสิ่งที่หนูน้อยค้นพบได้เลยจ้า
                          </span>
                        </div>
                      ) : audioBlobUrl ? (
                        <div className="space-y-2 w-full">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg mx-auto">
                            🎵
                          </div>
                          <span className="text-xs font-bold text-slate-700 block">
                            บันทึกเสียงเรียบร้อยแล้ว ({recordingSeconds} วินาที)
                          </span>
                          <button
                            type="button"
                            onClick={togglePlayAudio}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-4 rounded-full text-xs flex items-center justify-center gap-1.5 mx-auto cursor-pointer shadow-xs"
                          >
                            {isPlayingAudio ? (
                              <>
                                <Pause className="w-3.5 h-3.5" />
                                <span>หยุดฟัง</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-white" />
                                <span>ฟังเสียงที่อัดไว้ ▶</span>
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <Mic className="w-8 h-8 text-slate-300 mx-auto" />
                          <span className="text-xs text-slate-400 font-medium block">
                            กดปุ่มด้านล่างเพื่อเริ่มอัดเสียง
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startRecording}
                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{audioBlobUrl ? 'อัดเสียงใหม่' : 'เริ่มอัดเสียง 🎙️'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer animate-pulse"
                      >
                        <MicOff className="w-3.5 h-3.5" />
                        <span>หยุดบันทึก (เสร็จแล้ว) ⏹️</span>
                      </button>
                    )}

                    {audioBlobUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setAudioBlobUrl(null);
                          setRecordingSeconds(0);
                        }}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 cursor-pointer"
                        title="ลบเสียง"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Notes & Count Value */}
              <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-xs space-y-3">
                {selectedMission.category === 'counting' && (
                  <div className="flex items-center justify-between gap-3 bg-amber-50 p-3 rounded-xl border border-amber-200">
                    <div>
                      <span className="text-xs font-black text-amber-950 block">
                        🔢 จำนวนที่สำรวจนับได้:
                      </span>
                      <span className="text-[11px] text-amber-800 font-medium">
                        (เช่น นับต้นไม้ได้กี่ต้น หรือเก็บใบไม้ได้กี่ใบ)
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setCountValue((prev) => Math.max(1, prev - 1))}
                        className="w-8 h-8 rounded-full bg-white border border-amber-300 text-amber-900 font-black flex items-center justify-center cursor-pointer shadow-xs active:scale-90"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl font-black text-amber-900 min-w-[32px] text-center">
                        {countValue}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCountValue((prev) => prev + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-amber-300 text-amber-900 font-black flex items-center justify-center cursor-pointer shadow-xs active:scale-90"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    ✍️ บันทึกความประทับใจ / ข้อความจากหนูน้อยหรือผู้ปกครอง (ถ้ามี):
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="เช่น วันนี้หนูเจอต้นไม้ใหญ่ 5 ต้น ใบไม้สีเขียวเข้ม และดอกชบาสีแดงสวยมากค่ะ"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleBackToList}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>

                <button
                  type="button"
                  id="btn-submit-outdoor-mission"
                  onClick={handleSubmitMission}
                  disabled={!photoDataUrl && !audioBlobUrl && !notes.trim()}
                  className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                    photoDataUrl || audioBlobUrl || notes.trim()
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white hover:shadow-lg active:scale-98'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ส่งภารกิจนักสำรวจธรรมชาติ! (+{selectedMission.pointsReward} คะแนน) 🚀</span>
                </button>
              </div>
            </div>
          )}

          {/* VIEW 3: Celebration after submission */}
          {justSubmittedMission && (
            <div className="text-center py-8 px-4 bg-white rounded-3xl border-2 border-emerald-300 shadow-md space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto shadow-inner animate-bounce">
                🌿
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  ยินดีด้วยนะคนเก่ง! 🎉
                </h3>
                <p className="text-sm text-emerald-800 font-bold mt-1">
                  ส่งภารกิจ "{justSubmittedMission.missionTitle}" สำเร็จเรียบร้อยแล้ว!
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black text-sm px-4 py-1.5 rounded-full border border-amber-300">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>ได้รับคะแนนสะสมพิเศษ +{justSubmittedMission.pointsEarned} คะแนน ⭐</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setJustSubmittedMission(null);
                    setSelectedMission(null);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-5 rounded-xl text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  ทำภารกิจอื่นต่อ 🚀
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setJustSubmittedMission(null);
                    setSelectedMission(null);
                    setActiveTab('journal');
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-black py-2.5 px-5 rounded-xl text-xs sm:text-sm cursor-pointer"
                >
                  ดูสมุดบันทึกนักสำรวจ 📖
                </button>
              </div>
            </div>
          )}

          {/* VIEW 4: Explorer's Nature Journal / Gallery */}
          {activeTab === 'journal' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 font-display flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>สมุดบันทึกนักสำรวจธรรมชาติ (Nature Explorer Journal)</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    รวมภาพถ่ายและเสียงบันทึกการสำรวจของ {activeProfile.name}
                  </p>
                </div>

                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  สำเร็จแล้ว {submissions.length} ภารกิจ
                </span>
              </div>

              {submissions.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200 p-6 space-y-3">
                  <Compass className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-xs sm:text-sm text-slate-500 font-bold">
                    ยังไม่มีบันทึกการสำรวจธรรมชาติ ชวนหนูน้อยออกไปทำภารกิจแรกกันเถอะ!
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('missions')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2 px-4 rounded-xl text-xs cursor-pointer shadow-xs"
                  >
                    เลือกทำภารกิจเลย 🌿
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-white rounded-2xl p-3.5 border-2 border-slate-200 shadow-xs flex flex-col justify-between space-y-2.5"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1">
                            {sub.missionTitle}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                            {new Date(sub.completedAt).toLocaleDateString('th-TH', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>

                        {/* Photo Thumbnail */}
                        {sub.photoUrl && (
                          <div className="rounded-xl overflow-hidden aspect-video bg-slate-100 mb-2 border border-slate-200">
                            <img
                              src={sub.photoUrl}
                              alt={sub.missionTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Audio Player if present */}
                        {sub.audioUrl && (
                          <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200 flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                              <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>เสียงบันทึก ({sub.audioDurationSeconds || 0} วินาที)</span>
                            </div>
                            <audio controls src={sub.audioUrl} className="h-7 max-w-[150px]" />
                          </div>
                        )}

                        {/* Count or Notes */}
                        {sub.countValue !== undefined && (
                          <div className="text-xs text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-bold mb-1">
                            🔢 จำนวนที่สำรวจนับได้: {sub.countValue}
                          </div>
                        )}

                        {sub.notes && (
                          <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
                            "{sub.notes}"
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-amber-500 font-black">
                          ⭐⭐⭐ 3 ดาว
                        </span>
                        <span className="text-emerald-700 font-black">
                          +{sub.pointsEarned} คะแนน
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5">
            <span>🌿 ส่งเสริมการสังเกตธรรมชาติ ประสาทสัมผัส และสิ่งแวดล้อมปฐมวัย</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer transition-colors"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
