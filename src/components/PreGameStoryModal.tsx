import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Grade, Subject, CurriculumMode } from '../types';
import { PreGameStory, fetchOrGeneratePreGameStory, CURATED_STORIES } from '../services/storyService';
import { soundEffects, speakText, stopSpeaking } from '../services/audioService';
import { SKILLS_LIST, CBE_COMPETENCIES_LIST, THAI_PHONICS_UNITS_LIST } from '../data/skills';
import { THAI_PHONICS_STORIES } from '../data/thaiPhonicsStories';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Wand2,
} from 'lucide-react';

interface PreGameStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToGame: () => void;
  primarySubject: Subject;
  currentGrade: Grade;
  childName: string;
  soundVolume: number;
  curriculumMode?: CurriculumMode;
}

export const PreGameStoryModal: React.FC<PreGameStoryModalProps> = ({
  isOpen,
  onClose,
  onProceedToGame,
  primarySubject,
  currentGrade,
  childName,
  soundVolume,
  curriculumMode = 'early_childhood',
}) => {
  const [curriculumTab, setCurriculumTab] = useState<CurriculumMode>(() => {
    if (curriculumMode === 'thai_phonics' || ['P4', 'P5', 'P6'].includes(currentGrade)) return 'thai_phonics';
    if (curriculumMode === 'cbe_primary') return 'cbe_primary';
    return 'early_childhood';
  });

  const isCbeMode = curriculumTab === 'cbe_primary';
  const isPhonicsMode = curriculumTab === 'thai_phonics';

  const activeSkillsList = useMemo(() => {
    if (curriculumTab === 'thai_phonics') return THAI_PHONICS_UNITS_LIST;
    if (curriculumTab === 'cbe_primary') return CBE_COMPETENCIES_LIST;
    return SKILLS_LIST;
  }, [curriculumTab]);

  const [selectedSubject, setSelectedSubject] = useState<Subject>(() => {
    if (curriculumTab === 'thai_phonics') return 'phonics_consonant';
    if (curriculumTab === 'cbe_primary') return 'self_management';
    return primarySubject || 'literacy';
  });
  const [story, setStory] = useState<PreGameStory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  // Sync selectedSubject with primarySubject when opening or when curriculumMode changes
  useEffect(() => {
    if (isOpen) {
      if (curriculumTab === 'thai_phonics') {
        const isPhonics = THAI_PHONICS_UNITS_LIST.some((u) => u.id === primarySubject);
        setSelectedSubject(isPhonics ? primarySubject : 'phonics_consonant');
      } else if (curriculumTab === 'cbe_primary') {
        const isCbe = CBE_COMPETENCIES_LIST.some((c) => c.id === primarySubject);
        setSelectedSubject(isCbe ? primarySubject : 'self_management');
      } else {
        const isPreschool = SKILLS_LIST.some((s) => s.id === primarySubject);
        setSelectedSubject(isPreschool ? primarySubject : 'literacy');
      }
    }
  }, [isOpen, primarySubject, curriculumTab]);

  // Load story when subject or grade changes
  const loadStory = useCallback(
    async (subj: Subject, forceAi = false) => {
      setIsLoading(true);
      setActiveParagraphIndex(0);
      stopSpeaking();

      try {
        if (curriculumTab === 'thai_phonics' && THAI_PHONICS_STORIES[subj]) {
          const phStory = THAI_PHONICS_STORIES[subj];
          setStory({
            ...phStory,
            grade: currentGrade,
            title: phStory.title.replace('น้องคนเก่ง', childName || 'น้องคนเก่ง'),
          });
          setIsLoading(false);
          return;
        }

        const fetched = await fetchOrGeneratePreGameStory(
          subj,
          currentGrade,
          childName || 'น้องคนเก่ง',
          curriculumTab
        );
        setStory(fetched);
      } catch (e) {
        console.warn('Story loading error:', e);
        const fallback =
          THAI_PHONICS_STORIES[subj] ||
          CURATED_STORIES[subj] ||
          (curriculumTab === 'cbe_primary' ? CURATED_STORIES.self_management : CURATED_STORIES.math);
        setStory({ ...fallback, grade: currentGrade });
      } finally {
        setIsLoading(false);
      }
    },
    [currentGrade, childName, curriculumTab]
  );

  useEffect(() => {
    if (isOpen) {
      loadStory(selectedSubject);
    } else {
      stopSpeaking();
      setIsPlayingAudio(false);
    }
  }, [isOpen, selectedSubject, loadStory]);

  // Auto-speak current paragraph when active paragraph changes and isPlayingAudio is on
  useEffect(() => {
    if (isOpen && story && story.paragraphs[activeParagraphIndex] && isPlayingAudio && soundVolume > 0) {
      const paragraph = story.paragraphs[activeParagraphIndex];
      const textToSpeak = `${paragraph.text}`;

      speakText(textToSpeak, 'th', 'adult_female', soundVolume);
    }
  }, [isOpen, story, activeParagraphIndex, isPlayingAudio, soundVolume]);

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      if (story && story.paragraphs[activeParagraphIndex]) {
        speakText(story.paragraphs[activeParagraphIndex].text, 'th', 'adult_female', soundVolume);
      }
    }
  };

  const handleNextParagraph = () => {
    soundEffects.playTap(soundVolume);
    if (!story) return;

    if (activeParagraphIndex < story.paragraphs.length - 1) {
      setActiveParagraphIndex((prev) => prev + 1);
    } else {
      // Reached the end! Confetti celebrate
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      speakText(`จบแล้วจ้า! ข้อคิดจากนิทาน: ${story.moral}`, 'th', 'adult_female', soundVolume);
    }
  };

  const handlePrevParagraph = () => {
    soundEffects.playTap(soundVolume);
    if (activeParagraphIndex > 0) {
      setActiveParagraphIndex((prev) => prev - 1);
    }
  };

  const handleSelectSkillTab = (subj: Subject) => {
    soundEffects.playTap(soundVolume);
    setSelectedSubject(subj);
  };

  const handleRegenerateAiStory = () => {
    soundEffects.playTap(soundVolume);
    loadStory(selectedSubject, true);
  };

  const handleFinishAndStartGame = () => {
    stopSpeaking();
    soundEffects.playVictory(soundVolume);
    onProceedToGame();
  };

  if (!isOpen) return null;

  return (
    <div
      id="pre-game-story-modal"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-4 pt-3 sm:pt-6 md:pt-10 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          stopSpeaking();
          onClose();
        }
      }}
    >
      <div className="w-full max-w-3xl bg-white rounded-3xl border-3 border-amber-300 shadow-2xl overflow-hidden flex flex-col my-auto sm:my-0 max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 p-3.5 sm:p-4 text-white flex items-center justify-between gap-3 shadow-sm shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black leading-tight">
                  {isPhonicsMode
                    ? 'นิทานสระและมาตราตัวสะกด (แจกลูกสะกดคำ สพฐ.)'
                    : isCbeMode
                    ? 'นิทานก่อนเล่น: เสริมสมรรถนะหลักสูตรสถานศึกษา'
                    : 'นิทานก่อนเล่น: เสริมทักษะปฐมวัย'}
                </h2>
                <span className="text-[10px] font-black bg-white/25 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Story</span>
                </span>
              </div>
              <p className="text-[11px] text-amber-100 font-medium">
                {isPhonicsMode
                  ? 'ฟังนิทานสระและตัวสะกดแสนสนุก สร้างบริบทความเข้าใจคำก่อนเริ่มฝึกแจกลูกสะกดคำ'
                  : isCbeMode
                  ? 'ฟังนิทานสั้นสร้างแรงบันดาลใจและเชื่อมโยง 6 สมรรถนะสำคัญก่อนเริ่มเข้าสู่บทเรียน'
                  : 'ฟังนิทานสั้นสร้างแรงบันดาลใจและดึงดูดความสนใจก่อนเริ่มเข้าสู่บทเรียน'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="ปิดหน้าต่างนิทาน"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Curriculum Selector Bar for PreGame Story */}
        <div className="bg-amber-100/90 border-b border-amber-300 p-2 sm:p-2.5 flex items-center justify-between gap-2 overflow-x-auto shrink-0 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-black text-amber-950 whitespace-nowrap pl-1">เลือกหลักสูตร:</span>
            <button
              type="button"
              onClick={() => {
                setCurriculumTab('early_childhood');
                setSelectedSubject('literacy');
                handleSelectSkillTab('literacy');
              }}
              className={`px-2.5 py-1 rounded-xl font-black transition-all cursor-pointer flex items-center gap-1 ${
                curriculumTab === 'early_childhood'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-amber-200'
              }`}
            >
              <span>🧸</span>
              <span>ปฐมวัย (๘ ทักษะ)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurriculumTab('cbe_primary');
                setSelectedSubject('self_management');
                handleSelectSkillTab('self_management');
              }}
              className={`px-2.5 py-1 rounded-xl font-black transition-all cursor-pointer flex items-center gap-1 ${
                curriculumTab === 'cbe_primary'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-200'
              }`}
            >
              <span>🎓</span>
              <span>สมรรถนะ CBE (๖ ด้าน)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurriculumTab('thai_phonics');
                setSelectedSubject('phonics_consonant');
                handleSelectSkillTab('phonics_consonant');
              }}
              className={`px-2.5 py-1 rounded-xl font-black transition-all cursor-pointer flex items-center gap-1 ${
                curriculumTab === 'thai_phonics'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-emerald-200'
              }`}
            >
              <span>📖</span>
              <span>แจกลูกสะกดคำ สพฐ. (๑๐ หน่วย)</span>
            </button>
          </div>
        </div>

        {/* Skills / Units Switcher Bar */}
        <div className="bg-amber-50/80 border-b border-amber-200 p-2 sm:p-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-xs font-black text-amber-950 whitespace-nowrap pl-1 pr-1.5 flex items-center gap-1">
            <span>
              {curriculumTab === 'thai_phonics'
                ? '๑๐ หน่วย สพฐ.:'
                : curriculumTab === 'cbe_primary'
                ? '๖ สมรรถนะ:'
                : '๘ ทักษะปฐมวัย:'}
            </span>
          </span>
          {activeSkillsList.map((sk) => {
            const isSelected = selectedSubject === sk.id;
            return (
              <button
                key={sk.id}
                type="button"
                onClick={() => handleSelectSkillTab(sk.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? curriculumTab === 'thai_phonics'
                      ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                      : curriculumTab === 'cbe_primary'
                      ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-300'
                      : 'bg-amber-500 text-white shadow-xs scale-102 ring-2 ring-amber-300'
                    : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200/80'
                }`}
              >
                <span>{sk.icon}</span>
                <span>{sk.shortName.th}</span>
              </button>
            );
          })}
        </div>

        {/* Storybook Body Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4 bg-gradient-to-b from-amber-50/30 to-white">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
              <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
              <div className="text-sm font-black text-slate-700">
                ✨ คุณครู AI กำลังแต่งนิทานแสนสนุกให้ {childName}...
              </div>
              <p className="text-xs text-slate-400">
                สร้างเรื่องราวเฉพาะบุคคลตามระดับชั้นและทักษะที่เลือก
              </p>
            </div>
          ) : story ? (
            <>
              {/* Story Title & Meta Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-amber-100 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-xs shrink-0 animate-bounce hover:animate-none">
                    {story.heroEmoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <span className="text-[10px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                        {story.skillTag}
                      </span>
                      {story.isAiGenerated && (
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-0.5">
                          <Wand2 className="w-3 h-3 text-purple-500" />
                          <span>แต่งสดโดย AI</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-xl font-black text-slate-900 mt-1 leading-snug">
                      {story.title}
                    </h3>
                  </div>
                </div>

                {/* Audio and AI Re-generate buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleToggleAudio}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                      isPlayingAudio
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                    }`}
                    title={isPlayingAudio ? 'หยุดเสียงชั่วคราว' : 'เปิดเสียงพากย์อัตโนมัติ'}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-600" />
                        <span>กำลังเล่า</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-4 h-4 text-slate-500" />
                        <span>ปิดเสียง</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleRegenerateAiStory}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                    title="ให้ AI แต่งนิทานเรื่องใหม่"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-purple-600" />
                    <span className="hidden sm:inline">แต่งเรื่องใหม่</span>
                  </button>
                </div>
              </div>

              {/* Storybook Illustrated Page Viewer */}
              <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-200 shadow-sm flex flex-col items-center text-center gap-4 relative">
                {/* Paragraph Emoji Showcase */}
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 flex items-center justify-center text-5xl shadow-xs animate-in zoom-in-75 duration-200">
                  {story.paragraphs[activeParagraphIndex]?.emoji || '📖'}
                </div>

                {/* Spoken Text Display with Warm Preschool Styling */}
                <div className="min-h-[90px] flex items-center justify-center">
                  <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed max-w-xl">
                    "{story.paragraphs[activeParagraphIndex]?.text}"
                  </p>
                </div>

                {/* Pagination Dots & Navigation Controls */}
                <div className="w-full flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                  <button
                    type="button"
                    onClick={handlePrevParagraph}
                    disabled={activeParagraphIndex === 0}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>ก่อนหน้า</span>
                  </button>

                  {/* Progress Dots */}
                  <div className="flex items-center gap-1.5">
                    {story.paragraphs.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          soundEffects.playTap(soundVolume);
                          setActiveParagraphIndex(idx);
                        }}
                        className={`transition-all rounded-full cursor-pointer ${
                          idx === activeParagraphIndex
                            ? 'w-6 h-2.5 bg-amber-500'
                            : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300'
                        }`}
                        title={`ย่อหน้าที่ ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextParagraph}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    <span>
                      {activeParagraphIndex === story.paragraphs.length - 1
                        ? 'จบเรื่อง'
                        : 'ถัดไป'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Moral & Character takeaway box */}
              <div className="w-full bg-gradient-to-r from-amber-100/70 via-orange-50 to-pink-100/70 border border-amber-300 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-amber-950">
                <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 fill-rose-300" />
                <div>
                  <strong>💡 ข้อคิดจากนิทาน:</strong> {story.moral}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              stopSpeaking();
              onProceedToGame();
            }}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            ข้ามไปเล่นเกมเลย &gt;&gt;
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm cursor-pointer"
            >
              กลับหน้าเลือก
            </button>

            <button
              type="button"
              id="btn-story-start-game-now"
              onClick={handleFinishAndStartGame}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <span>🚀 เข้าสู่บทเรียนเลย!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
