import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { GameScreen } from './components/GameScreen';
import { StartProfileScreen } from './components/StartProfileScreen';
import { HandTrackingCamera } from './components/HandTrackingCamera';
import { HandPointerOverlay } from './components/HandPointerOverlay';
import { ReportModal } from './components/ReportModal';
import { ProfileModal } from './components/ProfileModal';
import { BadgesModal } from './components/BadgesModal';
import { ParentSettingsModal } from './components/ParentSettingsModal';
import { WorksheetGeneratorModal } from './components/WorksheetGeneratorModal';
import { SkillSelectModal } from './components/SkillSelectModal';
import { FeedbackModal } from './components/FeedbackModal';
import { QuestionManagerModal } from './components/QuestionManagerModal';
import { ExamSetBuilderModal } from './components/ExamSetBuilderModal';
import { ExamSetSelectorModal } from './components/ExamSetSelectorModal';
import { StreakTrackerModal } from './components/StreakTrackerModal';
import { TopPerformersModal } from './components/TopPerformersModal';
import { SkillGamesPage } from './components/skillgames/SkillGamesPage';
import { SkillGamesProfileGateModal } from './components/skillgames/SkillGamesProfileGateModal';
import { FunFactModal } from './components/FunFactModal';
import { WeeklyDevelopmentTrendModal } from './components/WeeklyDevelopmentTrendModal';
import { ThaiHandwritingModal } from './components/ThaiHandwritingModal';
import { ClassroomAudioMuteHud } from './components/ClassroomAudioMuteHud';
import { CalibrateHandModal } from './components/CalibrateHandModal';
import { ClassroomJoinModal } from './components/ClassroomJoinModal';
import { ClassroomLiveDashboardModal } from './components/ClassroomLiveDashboardModal';
import { ClassroomStudentLiveHud } from './components/ClassroomStudentLiveHud';
import { DailyLoginRewardModal } from './components/DailyLoginRewardModal';
import { CompetencyActivitiesModal } from './components/CompetencyActivitiesModal';
import { CurriculumSelectionLandingModal } from './components/CurriculumSelectionLandingModal';
import { ClassroomDiscussionModal } from './components/ClassroomDiscussionModal';
import { getCurriculumTheme } from './utils/curriculumTheme';
import {
  ClassroomRoom,
  getStudentActiveRoom,
  getTeacherActiveRoom,
  clearStudentActiveRoom,
  clearTeacherActiveRoom,
  updateStudentPresence,
} from './services/classroomRoomService';

import { QUESTIONS } from './data/questions';
import { THAI_PHONICS_UNIT_IDS } from './data/skills';
import { storageService, DEFAULT_SETTINGS } from './services/storageService';
import {
  recordGameSessionDual,
  syncProfilesWithCloud,
  initializeAllFirestoreCollections,
  syncHybridQuestionBank,
  syncHybridExamSets,
  writeToAllDatabases,
  deleteFromAllDatabases,
  saveProfileToCloud,
} from './services/cloudSyncService';
import { Badge, ChildProfile, ControlMode, ExamSet, GameSettings, Grade, HandPoint, Question, Subject, ThemeMode, CurriculumMode, WeeklyChallengeAwardResult } from './types';
import { soundEffects, speakText, stopSpeaking, setAudioMuted, isAudioMuted } from './services/audioService';
import { useDeviceMode } from './utils/deviceUtils';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebaseAuthService';
import { isUserAdmin } from './services/authPermissionService';
import { canEditProfile, canDeleteProfile } from './services/deviceService';
import {
  AdaptiveState,
  DifficultyLevel,
  createInitialAdaptiveState,
  applyAnswerToAdaptiveState,
  pickAdaptiveQuestion,
  generateRoundSubjectPlan,
} from './services/adaptiveDifficultyService';
import { DailyMissionAwardResult } from './services/dailyMissionService';
import { canClaimDailyReward, DailyRewardClaimResult } from './services/dailyLoginRewardService';
import { recordWeeklyChallengeAttempt } from './services/weeklyChallengeService';

export default function App() {
  // Persistence state
  const [settings, setSettings] = useState<GameSettings>(() => storageService.getSettings());
  const [profiles, setProfiles] = useState<ChildProfile[]>(() => storageService.getProfiles());
  const [activeProfile, setActiveProfile] = useState<ChildProfile>(() => storageService.getActiveProfile());
  const [currentGrade, setCurrentGrade] = useState<Grade>(activeProfile.grade || 'K1');

  // Game start gate & state
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [roundComplete, setRoundComplete] = useState(false);
  const [roundResults, setRoundResults] = useState<{ question: Question; isCorrect: boolean }[]>([]);

  // Adaptive Difficulty algorithm state & dynamic round questions
  const [adaptiveState, setAdaptiveState] = useState<AdaptiveState>(() =>
    createInitialAdaptiveState(currentGrade, undefined, settings.enableAdaptiveDifficulty !== false)
  );
  const [roundQuestions, setRoundQuestions] = useState<Question[]>([]);

  // Hand tracking and dwell
  const [handPoint, setHandPoint] = useState<HandPoint | null>(null);
  const [dwellProgress, setDwellProgress] = useState(0);
  const [isHoveringTarget, setIsHoveringTarget] = useState(false);

  // Modals state
  const [showDailyLoginModal, setShowDailyLoginModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportModalTab, setReportModalTab] = useState<'individual' | 'classroom' | 'weekly_trends' | 'radar_skills' | 'competency_report' | 'thai_radar' | 'progress_trends'>('individual');
  const [showWeeklyTrendModal, setShowWeeklyTrendModal] = useState(false);
  const [showThaiHandwritingModal, setShowThaiHandwritingModal] = useState(false);
  const [handwritingInitialAlphabet, setHandwritingInitialAlphabet] = useState<'thai' | 'english'>('thai');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showFunFactModal, setShowFunFactModal] = useState(false);
  const [funFactTarget, setFunFactTarget] = useState<'quiz' | 'skill_games' | 'general'>('quiz');
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [streakModalProfile, setStreakModalProfile] = useState<ChildProfile | null>(null);
  const [showTopPerformersModal, setShowTopPerformersModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showCalibrateHandModal, setShowCalibrateHandModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showWorksheetModal, setShowWorksheetModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showQuestionManagerModal, setShowQuestionManagerModal] = useState(false);
  const [questionManagerInitialTab, setQuestionManagerInitialTab] = useState<'list' | 'add' | 'json' | 'stats' | 'cloud' | 'admins' | 'ai_suggester'>('list');
  const [showExamSetSelector, setShowExamSetSelector] = useState(false);
  const [showExamSetBuilder, setShowExamSetBuilder] = useState(false);
  const [showSkillGames, setShowSkillGames] = useState(false);
  const [showSkillGamesProfileGate, setShowSkillGamesProfileGate] = useState(false);
  const [isSkillGamesGuestMode, setIsSkillGamesGuestMode] = useState(false);
  const [showCompetencyActivitiesModal, setShowCompetencyActivitiesModal] = useState(false);
  const [curriculumMode, setCurriculumMode] = useState<CurriculumMode>(() => storageService.getCurriculumMode());
  // Show curriculum selection landing modal on app launch if not chosen in current browser session
  const [showCurriculumLandingModal, setShowCurriculumLandingModal] = useState<boolean>(() => {
    try {
      const sessionChosen = sessionStorage.getItem('kinder_session_curriculum_chosen');
      if (sessionChosen === 'true') return false;
      return true;
    } catch {
      return true;
    }
  });
  const [activeExamSet, setActiveExamSet] = useState<ExamSet | null>(() => storageService.getActiveExamSet());

  // Classroom Virtual Room states & real-time presence
  const [showClassroomJoinModal, setShowClassroomJoinModal] = useState(false);
  const [showClassroomDashboardModal, setShowClassroomDashboardModal] = useState(false);
  const [showClassroomDiscussionModal, setShowClassroomDiscussionModal] = useState(false);
  const [studentActiveRoom, setStudentActiveRoom] = useState<ClassroomRoom | null>(() => getStudentActiveRoom());
  const [teacherActiveRoom, setTeacherActiveRoom] = useState<ClassroomRoom | null>(() => getTeacherActiveRoom());

  const handleOpenClassroomRoom = useCallback(() => {
    // If teacher already has an active room, give them the option to jump straight to dashboard or join modal
    if (teacherActiveRoom) {
      setShowClassroomDashboardModal(true);
    } else {
      setShowClassroomJoinModal(true);
    }
  }, [teacherActiveRoom]);

  const handleJoinedAsStudent = useCallback((room: ClassroomRoom) => {
    setStudentActiveRoom(room);
    setShowClassroomJoinModal(false);
  }, []);

  const handleOpenTeacherDashboard = useCallback((room: ClassroomRoom) => {
    setTeacherActiveRoom(room);
    setShowClassroomJoinModal(false);
    setShowClassroomDashboardModal(true);
  }, []);

  const handleLeaveStudentRoom = useCallback(() => {
    setStudentActiveRoom(null);
    clearStudentActiveRoom();
  }, []);

  const handleRoomClosedByTeacher = useCallback(() => {
    setTeacherActiveRoom(null);
    clearTeacherActiveRoom();
    setShowClassroomDashboardModal(false);
  }, []);

  // Dynamic Question Repository (Static + Custom - Deleted)
  const [questionsVersion, setQuestionsVersion] = useState(0);
  const allAvailableQuestions = useMemo(() => {
    const custom = storageService.getCustomQuestions();
    const deletedIds = new Set(storageService.getDeletedQuestionIds());
    const builtInActive = QUESTIONS.filter((q) => !deletedIds.has(q.id));
    
    // Deduplicate by unique question ID.
    // Built-in questions are seeded first; custom overrides if having same ID.
    const questionMap = new Map<string, Question>();
    for (const q of builtInActive) {
      questionMap.set(q.id, q);
    }
    for (const q of custom) {
      if (!deletedIds.has(q.id)) {
        questionMap.set(q.id, q);
      }
    }
    return Array.from(questionMap.values());
  }, [questionsVersion]);

  // Badge notification toast
  const [unlockedToast, setUnlockedToast] = useState<Badge | null>(null);
  const [roundUnlockedBadges, setRoundUnlockedBadges] = useState<Badge[]>([]);

  // Daily Mission reward notification state
  const [dailyMissionAwarded, setDailyMissionAwarded] = useState<DailyMissionAwardResult | null>(null);
  const [dailyMissionToast, setDailyMissionToast] = useState<DailyMissionAwardResult | null>(null);

  // Weekly Challenge state
  const [weeklyChallengeAwarded, setWeeklyChallengeAwarded] = useState<WeeklyChallengeAwardResult | null>(null);
  const [activeWeeklyChallengeSkill, setActiveWeeklyChallengeSkill] = useState<Subject | null>(null);

  // Dual-Save (Google Sheets + Firebase Cloud) state
  const [dualSaveStatus, setDualSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Firebase Auth & Admin Role
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const isAdmin = useMemo(() => isUserAdmin(currentUser), [currentUser]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setCurrentUser(u);
    });
    return () => unsub();
  }, []);

  // Sync profiles & ensure 5 core Firestore collections exist on boot
  useEffect(() => {
    syncProfilesWithCloud()
      .then((res) => {
        if (res.syncedCount > 0) {
          setProfiles(storageService.getProfiles());
          setActiveProfile(storageService.getActiveProfile());
        }
      })
      .catch((err) => {
        console.warn('Initial profile cloud sync:', err);
      });

    // Ensure all 5 collections (game_sessions, profiles, progress_reports, feedbacks, config) exist in Firestore
    initializeAllFirestoreCollections()
      .then((res) => {
        if (res.success) {
          console.log('Firebase collections initialized:', res.message);
        }
      })
      .catch((err) => {
        console.warn('Firebase collections bootstrap warning:', err);
      });

    // Background Hybrid Question Bank sync with Firestore
    syncHybridQuestionBank()
      .then((res) => {
        if (res.newFromCloud > 0) {
          setQuestionsVersion((v) => v + 1);
          console.log(`[Hybrid Question Bank] Synced ${res.newFromCloud} new questions from Firestore`);
        }
      })
      .catch((err) => {
        console.warn('Initial hybrid question bank sync warning:', err);
      });

    // Background Hybrid Exam Sets sync with Firestore
    syncHybridExamSets()
      .then((res) => {
        if (res.newFromCloud > 0) {
          console.log(`[Exam Sets] Synced ${res.newFromCloud} new sets from Firestore`);
        }
      })
      .catch((err) => {
        console.warn('Initial exam sets sync warning:', err);
      });
  }, []);

  // Auto-show Daily Login reward popup on app boot if student has an unclaimed reward today
  useEffect(() => {
    if (activeProfile && canClaimDailyReward(activeProfile)) {
      const timer = setTimeout(() => {
        setShowDailyLoginModal(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-unlock Web Audio API on first user interaction (Mobile Safari / Android Chrome gesture requirement)
  useEffect(() => {
    const unlock = () => {
      soundEffects.unlockAudio();
    };
    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true, passive: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  // Device & control mode detection (Auto mobile touch vs hand camera)
  const { isMobilePhone, effectiveMode, isAutoSwitched } = useDeviceMode(settings.controlMode);
  const [hasDismissedMobileBanner, setHasDismissedMobileBanner] = useState(false);

  // Clear hand tracking point when entering touch mode
  useEffect(() => {
    if (effectiveMode === 'touch') {
      setHandPoint(null);
      setDwellProgress(0);
      setIsHoveringTarget(false);
    }
  }, [effectiveMode]);

  // Fast toggle control mode handler
  const handleToggleControlMode = useCallback(() => {
    const nextMode: ControlMode = effectiveMode === 'touch' ? 'hand' : 'touch';
    const updated: GameSettings = { ...settings, controlMode: nextMode };
    storageService.saveSettings(updated);
    setSettings(updated);
    soundEffects.playTap(settings.soundVolume);
  }, [effectiveMode, settings]);

  // Exam set selection handler
  const handleSelectExamSet = useCallback((set: ExamSet | null) => {
    setActiveExamSet(set);
    storageService.setActiveExamSetId(set ? set.id : null);
    const targetGrade = set && set.grade !== 'all' ? set.grade : currentGrade;
    if (set && set.grade !== 'all') {
      setCurrentGrade(set.grade);
    }
    setQuestionIndex(0);
    setRoundComplete(false);
    setRoundResults([]);
    // Initialize round questions
    initializeRoundQuestions(targetGrade, settings.selectedSubjects, settings.questionsPerSkill || 3, set);
  }, [currentGrade, settings.questionsPerSkill, settings.selectedSubjects]);

  // Dynamic initializer for round questions adhering to Adaptive Difficulty
  const initializeRoundQuestions = useCallback(
    (
      grade: Grade,
      subjects: Subject[],
      perSkill: number = settings.questionsPerSkill || 3,
      examSet: ExamSet | null = activeExamSet,
      forcedDifficulty?: DifficultyLevel
    ) => {
      const nextAdaptive = createInitialAdaptiveState(
        grade,
        forcedDifficulty,
        settings.enableAdaptiveDifficulty !== false
      );
      setAdaptiveState(nextAdaptive);
      setQuestionIndex(0);
      setRoundComplete(false);
      setRoundResults([]);
      setDailyMissionAwarded(null);

      if (examSet && examSet.questionIds && examSet.questionIds.length > 0) {
        const qMap = new Map<string, Question>(allAvailableQuestions.map((q) => [q.id, q]));
        const list: Question[] = [];
        examSet.questionIds.forEach((id) => {
          const found = qMap.get(id);
          if (found) list.push(found);
        });
        if (list.length > 0) {
          setRoundQuestions(list);
          return list;
        }
      }

      const plan = generateRoundSubjectPlan(subjects, perSkill);
      const questions: Question[] = [];
      const usedIds = new Set<string>();

      for (let i = 0; i < plan.length; i++) {
        const targetSub = plan[i];
        const q = pickAdaptiveQuestion({
          allQuestions: allAvailableQuestions,
          usedQuestionIds: usedIds,
          targetSubject: targetSub,
          targetGrade: grade,
          targetDifficulty: nextAdaptive.currentDifficulty,
          activeExamSet: examSet,
        });
        questions.push(q);
        usedIds.add(q.id);
      }

      setRoundQuestions(questions);
      return questions;
    },
    [activeExamSet, allAvailableQuestions, settings.enableAdaptiveDifficulty, settings.questionsPerSkill]
  );

  // Auto-initialize questions once when question bank is loaded
  const hasInitializedQuestionsRef = useRef(false);

  useEffect(() => {
    if (allAvailableQuestions.length > 0 && !hasInitializedQuestionsRef.current) {
      hasInitializedQuestionsRef.current = true;
      initializeRoundQuestions(
        currentGrade,
        settings.selectedSubjects,
        settings.questionsPerSkill || 3,
        activeExamSet
      );
    }
  }, [
    allAvailableQuestions.length,
    currentGrade,
    settings.questionsPerSkill,
    activeExamSet,
    initializeRoundQuestions,
  ]);

  // Filter and order questions by active exam set OR current grade & selected subjects
  const currentQuestions = useMemo(() => {
    // 1. If an active Exam Set is chosen by teacher/player, pick those specific questions in order
    if (activeExamSet && activeExamSet.questionIds && activeExamSet.questionIds.length > 0) {
      const qMap = new Map<string, Question>(allAvailableQuestions.map((q) => [q.id, q]));
      const list: Question[] = [];
      activeExamSet.questionIds.forEach((id) => {
        const found = qMap.get(id);
        if (found) {
          list.push(found);
        }
      });
      if (list.length > 0) {
        return list;
      }
    }

    // 2. Default: filter by current grade & selected subjects
    const matched = allAvailableQuestions.filter((q) => {
      const matchGrade = q.grade === currentGrade;
      const matchSubject = settings.selectedSubjects.includes(q.subject);
      return matchGrade && matchSubject;
    });

    // Subject developmental order (1 to 8 + CBE 1 to 6)
    const subjectOrder: Record<Subject, number> = {
      literacy: 1,
      thai: 1,
      english: 2,
      math: 3,
      problem_solving: 4,
      inquiry: 5,
      science: 5,
      creativity: 6,
      physical_health: 7,
      socio_emotional: 8,
      citizenship: 9,
      // 6 CBE Competencies
      self_management: 10,
      higher_order_thinking: 11,
      communication: 12,
      teamwork_collaboration: 13,
      active_citizenship: 14,
      sustainable_living: 15,
      // 10 Thai Phonics Units (สพฐ.)
      phonics_consonant: 20,
      phonics_vowel: 21,
      phonics_tone: 22,
      phonics_korkaa: 23,
      phonics_tone_korkaa: 24,
      phonics_direct_spelling: 25,
      phonics_tone_spelling: 26,
      phonics_indirect_spelling: 27,
      phonics_cluster: 28,
      phonics_leading_consonant: 29,
    };

    // Sort by subject order then difficulty
    const sorted = [...matched].sort((a, b) => {
      const ordA = subjectOrder[a.subject] || 99;
      const ordB = subjectOrder[b.subject] || 99;
      if (ordA !== ordB) return ordA - ordB;
      return a.difficulty - b.difficulty;
    });

    // If questionsPerRound is less than full selected skill count, allow testing all questions per selected skill
    const targetCount = Math.max(settings.questionsPerRound, settings.selectedSubjects.length * (settings.questionsPerSkill || 3));
    return sorted.slice(0, targetCount);
  }, [activeExamSet, allAvailableQuestions, currentGrade, settings.selectedSubjects, settings.questionsPerRound, settings.questionsPerSkill]);

  const effectiveRoundQuestions = roundQuestions.length > 0 ? roundQuestions : currentQuestions;
  const currentQuestion = effectiveRoundQuestions[questionIndex] || effectiveRoundQuestions[0] || QUESTIONS[0];
  const totalQuestionsInRound = effectiveRoundQuestions.length;

  // Skill change handler
  const handleSkillChange = useCallback((subjects: Subject[]) => {
    if (subjects.length === 0) return;
    const perSkill = settings.questionsPerSkill || 3;
    const updated: GameSettings = {
      ...settings,
      selectedSubjects: subjects,
      questionsPerRound: subjects.length * perSkill,
    };
    storageService.saveSettings(updated);
    setSettings(updated);
    initializeRoundQuestions(currentGrade, subjects, perSkill, activeExamSet);
  }, [activeExamSet, currentGrade, initializeRoundQuestions, settings]);

  // Questions per skill count change handler (Configurable questions count)
  const handleChangeQuestionsPerSkill = useCallback((count: number) => {
    const validCount = Math.max(1, Math.min(20, count));
    const updated: GameSettings = {
      ...settings,
      questionsPerSkill: validCount,
      questionsPerRound: settings.selectedSubjects.length * validCount,
    };
    storageService.saveSettings(updated);
    setSettings(updated);
    initializeRoundQuestions(currentGrade, settings.selectedSubjects, validCount, activeExamSet);
  }, [activeExamSet, currentGrade, initializeRoundQuestions, settings]);

  // Grade switch handler
  const handleGradeChange = useCallback((grade: Grade) => {
    setCurrentGrade(grade);
    initializeRoundQuestions(grade, settings.selectedSubjects, settings.questionsPerSkill || 3, activeExamSet);
  }, [activeExamSet, initializeRoundQuestions, settings.questionsPerSkill, settings.selectedSubjects]);

  // Profile switch handler
  const handleSelectProfile = useCallback((profileId: string) => {
    if (!profileId || profileId === 'ALL') return;
    if (profileId === activeProfile.id) return;
    storageService.setActiveProfile(profileId);
    const p = profiles.find((item) => item.id === profileId);
    if (p) {
      setActiveProfile(p);
      setCurrentGrade(p.grade);
      initializeRoundQuestions(p.grade, settings.selectedSubjects, settings.questionsPerSkill || 3, activeExamSet);
      if (canClaimDailyReward(p) && !showWeeklyTrendModal && !showReportModal) {
        setShowDailyLoginModal(true);
      }
    }
  }, [activeExamSet, activeProfile.id, initializeRoundQuestions, profiles, settings.questionsPerSkill, settings.selectedSubjects, showWeeklyTrendModal, showReportModal]);

  // Dedicated curriculum mode handler ensuring strict system separation
  const handleSelectCurriculumMode = useCallback(
    (mode: CurriculumMode, rememberChoice: boolean) => {
      setCurriculumMode(mode);
      storageService.setCurriculumMode(mode);
      try {
        sessionStorage.setItem('kinder_session_curriculum_chosen', 'true');
        if (rememberChoice) {
          storageService.setChosenCurriculum(true);
        }
      } catch (e) {
        console.warn('Session storage write error:', e);
      }
      setShowCurriculumLandingModal(false);

      if (mode === 'thai_phonics') {
        // 1. Grade alignment for Thai Phonics (P1-P6, default P1)
        if (!['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(currentGrade)) {
          handleGradeChange('P1');
        }
        // 2. Active Profile alignment: switch to a Primary student profile if in Kindergarten
        if (['K1', 'K2', 'K3'].includes(activeProfile.grade)) {
          const pProfile = profiles.find((p) => ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(p.grade));
          if (pProfile) {
            handleSelectProfile(pProfile.id);
          }
        }
        // 3. Subjects alignment: switch to 10 Thai Phonics units
        handleSkillChange([...THAI_PHONICS_UNIT_IDS]);
      } else if (mode === 'cbe_primary') {
        // 1. Grade alignment for Primary CBE
        if (!['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(currentGrade)) {
          handleGradeChange('P1');
        }
        // 2. Active Profile alignment: switch to a Primary student profile
        if (['K1', 'K2', 'K3'].includes(activeProfile.grade)) {
          const pProfile = profiles.find((p) => ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(p.grade));
          if (pProfile) {
            handleSelectProfile(pProfile.id);
          }
        }
        // 3. Subjects alignment: switch to 6 CBE competencies
        const cbeSubjects: Subject[] = [
          'self_management',
          'higher_order_thinking',
          'communication',
          'teamwork_collaboration',
          'active_citizenship',
          'sustainable_living',
        ];
        handleSkillChange(cbeSubjects);
      } else {
        // 1. Grade alignment for Early Childhood
        if (!['K1', 'K2', 'K3'].includes(currentGrade)) {
          handleGradeChange('K2');
        }
        // 2. Active Profile alignment: switch to a Kindergarten child profile
        if (['P1', 'P2', 'P3'].includes(activeProfile.grade)) {
          const kProfile = profiles.find((p) => ['K1', 'K2', 'K3'].includes(p.grade));
          if (kProfile) {
            handleSelectProfile(kProfile.id);
          }
        }
        // 3. Subjects alignment: switch to 8 developmental skills
        const kSubjects: Subject[] = [
          'literacy',
          'math',
          'problem_solving',
          'inquiry',
          'creativity',
          'physical_health',
          'socio_emotional',
          'citizenship',
        ];
        handleSkillChange(kSubjects);
      }
    },
    [currentGrade, activeProfile.grade, profiles, handleGradeChange, handleSelectProfile, handleSkillChange]
  );

  const handleDailyRewardClaimed = useCallback((result: DailyRewardClaimResult) => {
    setActiveProfile(result.updatedProfile);
    setProfiles(storageService.getProfiles());
    setScore(result.updatedProfile.totalScore || 0);
  }, []);

  const handleCreateProfile = useCallback(
    (name: string, grade: Grade, avatar: string, avatarBg: string = 'amber') => {
      const newP = storageService.createProfile(name, grade, avatar, avatarBg);
      const updatedProfiles = storageService.getProfiles();
      setProfiles(updatedProfiles);
      setActiveProfile(newP);
      setCurrentGrade(grade);
      setQuestionIndex(0);
      setRoundComplete(false);
      setRoundResults([]);

      // Auto-sync new profile to Firestore
      writeToAllDatabases('profiles', newP.id, {
        id: newP.id,
        name: newP.name,
        grade: newP.grade,
        avatar: newP.avatar,
        avatarBg: newP.avatarBg || 'amber',
        totalScore: newP.totalScore || 0,
        totalQuestions: newP.totalQuestions || 0,
        streakDays: newP.streakDays || 1,
        lastPlayedDate: newP.lastPlayedDate || new Date().toISOString().split('T')[0],
        createdAt: newP.createdAt,
        updatedAt: new Date().toISOString(),
      }).catch((err) => console.warn('Auto-sync created profile to Firestore:', err));
    },
    []
  );

  const handleDeleteProfile = useCallback((profileId: string) => {
    const allProfiles = storageService.getProfiles();
    const target = allProfiles.find((p) => p.id === profileId);
    if (target && !canDeleteProfile(target, isAdmin)) {
      console.warn('Profile cannot be deleted on this device without admin rights');
      return;
    }

    const result = storageService.deleteProfile(profileId);
    if (result.success) {
      const remaining = storageService.getProfiles();
      const active = storageService.getActiveProfile();
      setProfiles(remaining);
      setActiveProfile(active);
      setCurrentGrade(active.grade);

      // Auto-sync deleted profile to Firestore
      deleteFromAllDatabases('profiles', profileId).catch((err) =>
        console.warn('Auto-sync deleted profile from Firestore:', err)
      );
    }
  }, []);

  const handleUpdateProfile = useCallback(
    (
      profileId: string,
      updates: { name: string; grade: Grade; avatar: string; avatarBg?: string; unlockedAvatars?: string[] }
    ) => {
      const allProfiles = storageService.getProfiles();
      const target = allProfiles.find((p) => p.id === profileId);
      if (!target) return;

      if (!canEditProfile(target, isAdmin)) {
        console.warn('Profile cannot be edited on this device without admin rights');
        return;
      }

      const trimmedName = updates.name.trim();
      const updated: ChildProfile = {
        ...target,
        name: trimmedName || target.name,
        grade: updates.grade,
        avatar: updates.avatar,
        avatarBg: updates.avatarBg || target.avatarBg || 'amber',
        unlockedAvatars: updates.unlockedAvatars !== undefined ? updates.unlockedAvatars : (target.unlockedAvatars || []),
        updatedAt: new Date().toISOString(),
      };

      storageService.updateProfile(updated);
      const refreshed = storageService.getProfiles();
      setProfiles(refreshed);

      if (activeProfile.id === profileId) {
        setActiveProfile(updated);
        if (currentGrade !== updates.grade) {
          setCurrentGrade(updates.grade);
          initializeRoundQuestions(
            updates.grade,
            settings.selectedSubjects,
            settings.questionsPerSkill || 3,
            activeExamSet
          );
        }
      }

      // Auto-sync updated profile to Firestore
      writeToAllDatabases('profiles', updated.id, {
        id: updated.id,
        name: updated.name,
        grade: updated.grade,
        avatar: updated.avatar,
        avatarBg: updated.avatarBg || 'amber',
        deviceId: updated.deviceId || '',
        createdDeviceName: updated.createdDeviceName || '',
        createdByEmail: updated.createdByEmail || '',
        totalScore: updated.totalScore,
        totalQuestions: updated.totalQuestions,
        streakDays: updated.streakDays,
        lastPlayedDate: updated.lastPlayedDate,
        badges: updated.badges || [],
        history: (updated.history || []).slice(-30),
        updatedAt: updated.updatedAt,
      }).catch((err) => console.warn('Auto-sync updated profile to Firestore:', err));
    },
    [
      activeExamSet,
      activeProfile.id,
      currentGrade,
      initializeRoundQuestions,
      isAdmin,
      settings.questionsPerSkill,
      settings.selectedSubjects,
    ]
  );

  const handleRefreshData = useCallback(() => {
    setProfiles(storageService.getProfiles());
    setActiveProfile(storageService.getActiveProfile());
  }, []);

  // Proceed directly to Skill Games Hub
  const proceedToSkillGames = useCallback(() => {
    setShowSkillGames(true);
    setShowFunFactModal(false);
  }, []);

  // Open Skill Games with Fun Fact transition
  const handleOpenSkillGames = useCallback(() => {
    if (settings.showFunFacts !== false) {
      setFunFactTarget('skill_games');
      setShowFunFactModal(true);
    } else {
      proceedToSkillGames();
    }
  }, [settings.showFunFacts, proceedToSkillGames]);

  // Skill Games Profile Gate Handlers
  const handleOpenSkillGamesGate = useCallback(() => {
    setShowSkillGamesProfileGate(true);
  }, []);

  const handleSelectProfileAndEnterSkillGames = useCallback(
    (profileId: string) => {
      handleSelectProfile(profileId);
      setIsSkillGamesGuestMode(false);
      setShowSkillGamesProfileGate(false);
      if (settings.showFunFacts !== false) {
        setFunFactTarget('skill_games');
        setShowFunFactModal(true);
      } else {
        proceedToSkillGames();
      }
    },
    [handleSelectProfile, proceedToSkillGames, settings.showFunFacts]
  );

  const handleCreateProfileAndEnterSkillGames = useCallback(
    (name: string, grade: Grade, avatar: string, avatarBg: string) => {
      handleCreateProfile(name, grade, avatar, avatarBg);
      setIsSkillGamesGuestMode(false);
      setShowSkillGamesProfileGate(false);
      if (settings.showFunFacts !== false) {
        setFunFactTarget('skill_games');
        setShowFunFactModal(true);
      } else {
        proceedToSkillGames();
      }
    },
    [handleCreateProfile, proceedToSkillGames, settings.showFunFacts]
  );

  const handleEnterSkillGamesAsGuest = useCallback(
    (guestGrade: Grade) => {
      setIsSkillGamesGuestMode(true);
      setCurrentGrade(guestGrade);
      setShowSkillGamesProfileGate(false);
      if (settings.showFunFacts !== false) {
        setFunFactTarget('skill_games');
        setShowFunFactModal(true);
      } else {
        proceedToSkillGames();
      }
    },
    [proceedToSkillGames, settings.showFunFacts]
  );

  // Replay speech
  const handleReplaySpeech = useCallback(() => {
    if (currentQuestion) {
      const text = currentQuestion.question[settings.language] || currentQuestion.question.th;
      speakText(text, settings.language, settings.voicePersona, settings.soundVolume);
    }
  }, [currentQuestion, settings.language, settings.voicePersona, settings.soundVolume]);

  // Answer selected with Adaptive Difficulty adjustment
  const handleAnswerSelected = useCallback(
    (_optionId: string, isCorrect: boolean) => {
      setCurrentStreak((prev) => (isCorrect ? prev + 1 : 0));
      if (isCorrect) {
        setScore((prev) => prev + 10);
      }
      setRoundResults((prev) => [...prev, { question: currentQuestion, isCorrect }]);

      // Sync Real-time presence to Classroom Virtual Room
      if (studentActiveRoom && activeProfile) {
        updateStudentPresence(studentActiveRoom.roomId, activeProfile.id, {
          currentGame: activeExamSet ? `ชุดสอบ: ${activeExamSet.title}` : 'แบบประเมินหลัก',
          currentLevel: `ข้อที่ ${questionIndex + 1}/${totalQuestionsInRound}`,
          score: score + (isCorrect ? 10 : 0),
          status: 'active',
        });
      }

      // Process Adaptive Difficulty
      if (settings.enableAdaptiveDifficulty !== false) {
        const { nextState } = applyAnswerToAdaptiveState(
          adaptiveState,
          isCorrect,
          (currentQuestion.difficulty as DifficultyLevel) || 1,
          settings.soundVolume
        );
        setAdaptiveState(nextState);

        // Dynamically select the next question matching updated adaptive difficulty
        const nextIndex = questionIndex + 1;
        const currentList = roundQuestions.length > 0 ? roundQuestions : currentQuestions;
        if (nextIndex < currentList.length) {
          const plan = generateRoundSubjectPlan(
            settings.selectedSubjects,
            settings.questionsPerSkill || 3
          );
          const targetSub =
            plan[nextIndex] ||
            currentList[nextIndex]?.subject ||
            settings.selectedSubjects[0];

          const usedIds = new Set<string>();
          roundResults.forEach((r) => usedIds.add(r.question.id));
          usedIds.add(currentQuestion.id);

          const adaptedQuestion = pickAdaptiveQuestion({
            allQuestions: allAvailableQuestions,
            usedQuestionIds: usedIds,
            targetSubject: targetSub,
            targetGrade: currentGrade,
            targetDifficulty: nextState.currentDifficulty,
            activeExamSet,
          });

          setRoundQuestions((prev) => {
            const list = prev.length > 0 ? [...prev] : [...currentQuestions];
            list[nextIndex] = adaptedQuestion;
            return list;
          });
        }
      }
    },
    [
      adaptiveState,
      allAvailableQuestions,
      currentGrade,
      currentQuestion,
      currentQuestions,
      questionIndex,
      roundQuestions,
      roundResults,
      settings.enableAdaptiveDifficulty,
      settings.questionsPerSkill,
      settings.selectedSubjects,
      settings.soundVolume,
      activeExamSet,
    ]
  );

  // Next question
  const handleNextQuestion = useCallback(() => {
    if (questionIndex + 1 >= totalQuestionsInRound) {
      // Finish round
      setRoundComplete(true);
      soundEffects.playVictory(settings.soundVolume);

      // Record to storage and check badges
      const records = roundResults.map((r) => ({
        subject: r.question.subject,
        isCorrect: r.isCorrect,
      }));

      const { newlyUnlockedBadges, dailyMissionAwarded: missionAwarded } =
        storageService.recordRoundResult(
          activeProfile.id,
          records,
          Boolean(handPoint?.isPointing)
        );

      setRoundUnlockedBadges(newlyUnlockedBadges);

      if (missionAwarded) {
        setDailyMissionAwarded(missionAwarded);
        setDailyMissionToast(missionAwarded);
        setTimeout(() => setDailyMissionToast(null), 5000);
      }

      if (activeWeeklyChallengeSkill) {
        const correctCount = records.filter((r) => r.isCorrect).length;
        const roundScore = correctCount * 10;
        const weeklyAward = recordWeeklyChallengeAttempt(
          activeProfile,
          roundScore,
          activeWeeklyChallengeSkill
        );
        setWeeklyChallengeAwarded(weeklyAward);
      }

      // Refresh active profile
      const updatedProfile = storageService.getActiveProfile();
      setActiveProfile(updatedProfile);
      setProfiles(storageService.getProfiles());

      if (newlyUnlockedBadges.length > 0) {
        setUnlockedToast(newlyUnlockedBadges[0]);
        setTimeout(() => setUnlockedToast(null), 4500);
      }

      // Record simultaneously to Firebase Firestore & Google Sheets with safety timer
      setDualSaveStatus('saving');
      const safetySaveTimer = setTimeout(() => {
        setDualSaveStatus('saved');
      }, 4000);

      recordGameSessionDual(
        updatedProfile,
        records,
        Boolean(handPoint?.isPointing)
      )
        .then(() => {
          clearTimeout(safetySaveTimer);
          setDualSaveStatus('saved');
        })
        .catch((err) => {
          clearTimeout(safetySaveTimer);
          console.warn('Dual record session notice:', err);
          setDualSaveStatus('saved');
        });
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  }, [
    activeProfile.id,
    totalQuestionsInRound,
    handPoint?.isPointing,
    questionIndex,
    roundResults,
    settings.soundVolume,
  ]);

  const handleRestartRound = useCallback(() => {
    setRoundUnlockedBadges([]);
    setWeeklyChallengeAwarded(null);
    if (activeWeeklyChallengeSkill) {
      initializeRoundQuestions(
        currentGrade,
        [activeWeeklyChallengeSkill],
        Math.max(5, settings.questionsPerSkill || 3),
        null
      );
    } else {
      initializeRoundQuestions(
        currentGrade,
        settings.selectedSubjects,
        settings.questionsPerSkill || 3,
        activeExamSet
      );
    }
    setScore(0);
    setCurrentStreak(0);
  }, [
    activeWeeklyChallengeSkill,
    currentGrade,
    settings.selectedSubjects,
    settings.questionsPerSkill,
    activeExamSet,
    initializeRoundQuestions,
  ]);

  const executeStartGame = useCallback(() => {
    setRoundUnlockedBadges([]);
    setActiveWeeklyChallengeSkill(null);
    setWeeklyChallengeAwarded(null);
    initializeRoundQuestions(
      currentGrade,
      settings.selectedSubjects,
      settings.questionsPerSkill || 3,
      activeExamSet
    );
    setScore(0);
    setCurrentStreak(0);
    setIsGameStarted(true);
    setShowFunFactModal(false);
  }, [
    currentGrade,
    settings.selectedSubjects,
    settings.questionsPerSkill,
    activeExamSet,
    initializeRoundQuestions,
  ]);

  const handleStartWeeklyChallenge = useCallback((skill: Subject) => {
    setActiveExamSet(null);
    setActiveWeeklyChallengeSkill(skill);
    setWeeklyChallengeAwarded(null);
    setRoundUnlockedBadges([]);
    const count = Math.max(5, settings.questionsPerSkill || 3);
    initializeRoundQuestions(currentGrade, [skill], count, null);
    setScore(0);
    setCurrentStreak(0);
    setIsGameStarted(true);
    setShowFunFactModal(false);
  }, [currentGrade, initializeRoundQuestions, settings.questionsPerSkill]);

  const handleStartGame = useCallback(() => {
    if (settings.showFunFacts !== false) {
      setFunFactTarget('quiz');
      setShowFunFactModal(true);
    } else {
      executeStartGame();
    }
  }, [settings.showFunFacts, executeStartGame]);

  const handleOpenGeneralFunFacts = useCallback(() => {
    setFunFactTarget('general');
    setShowFunFactModal(true);
  }, []);

  const handleOpenReport = useCallback((tab: 'individual' | 'classroom' | 'weekly_trends' | 'radar_skills' | 'competency_report' = 'individual') => {
    setReportModalTab(tab);
    setShowReportModal(true);
  }, []);

  const handleOpenCompetencyReport = useCallback(() => {
    handleOpenReport('competency_report');
  }, [handleOpenReport]);

  const handleOpenSkillRadarReport = useCallback(() => {
    handleOpenReport('radar_skills');
  }, [handleOpenReport]);

  const handleOpenThaiHandwriting = useCallback(() => {
    setHandwritingInitialAlphabet('thai');
    setShowThaiHandwritingModal(true);
  }, []);

  const handleOpenEnglishHandwriting = useCallback(() => {
    setHandwritingInitialAlphabet('english');
    setShowThaiHandwritingModal(true);
  }, []);

  const handleOpenAIQuestionSuggester = useCallback(() => {
    setQuestionManagerInitialTab('ai_suggester');
    setShowQuestionManagerModal(true);
  }, []);

  // Master Teacher Audio Mute / Unmute state & HUD
  const [muteHudState, setMuteHudState] = useState<{ isMuted: boolean; volume: number } | null>(null);
  const previousVolumeRef = useRef<number>(settings.soundVolume > 0.01 ? settings.soundVolume : 0.8);

  // Sync internal audio service mute flag with current soundVolume
  useEffect(() => {
    const isMuted = settings.soundVolume <= 0.01;
    setAudioMuted(isMuted);
    if (!isMuted) {
      previousVolumeRef.current = settings.soundVolume;
    }
  }, [settings.soundVolume]);

  // Master Audio Toggle Handler (Instant mute/unmute for teachers in classroom)
  const handleToggleGlobalSound = useCallback(() => {
    const isCurrentlyMuted = settings.soundVolume <= 0.01 || isAudioMuted();
    if (!isCurrentlyMuted) {
      // Mute everything immediately: cut audio effects & speech synthesis
      previousVolumeRef.current = settings.soundVolume > 0.01 ? settings.soundVolume : 0.8;
      const updated: GameSettings = { ...settings, soundVolume: 0 };
      storageService.saveSettings(updated);
      setSettings(updated);
      setAudioMuted(true);
      stopSpeaking();
      setMuteHudState({ isMuted: true, volume: 0 });
    } else {
      // Unmute and restore previous sound volume level
      const restoreVol = previousVolumeRef.current > 0.01 ? previousVolumeRef.current : 0.8;
      const updated: GameSettings = { ...settings, soundVolume: restoreVol };
      storageService.saveSettings(updated);
      setSettings(updated);
      setAudioMuted(false);
      soundEffects.playTap(restoreVol);
      setMuteHudState({ isMuted: false, volume: restoreVol });
    }
  }, [settings]);

  // Global Keyboard Hotkey (Press 'M' key to instantly mute/unmute)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystroke if focused in an input/textarea/select or contentEditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Check for 'm' or 'M' without modifier keys (Ctrl, Alt, Meta)
      if (
        (e.key === 'm' || e.key === 'M' || e.code === 'KeyM') &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        e.preventDefault();
        handleToggleGlobalSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleGlobalSound]);

  // Settings update
  const handleSaveSettings = useCallback((newSettings: GameSettings) => {
    setSettings(newSettings);
    storageService.saveSettings(newSettings);
  }, []);

  // Stable dwell progress handler to prevent infinite re-renders
  const handleDwellProgressChange = useCallback((progress: number, isHovering: boolean) => {
    setDwellProgress((prev) => {
      if (progress === 0 && prev === 0) return 0;
      if (Math.abs(prev - progress) < 0.01 && progress < 1) return prev;
      return progress;
    });
    setIsHoveringTarget((prev) => (prev !== isHovering ? isHovering : prev));
  }, []);

  // Mouse fallback tracking so testing without camera is instant (only in hand mode)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (effectiveMode === 'touch') return;
    setHandPoint((prev) => {
      if (prev && prev.confidence >= 0.8) {
        return prev;
      }
      return {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        screenX: e.clientX,
        screenY: e.clientY,
        isPointing: true,
        isPinching: false,
        confidence: 0.5,
      };
    });
  }, [effectiveMode]);

  const handleSyncProfiles = useCallback(async () => {
    try {
      await syncProfilesWithCloud();
    } catch (err) {
      console.warn('Sync profiles handler caught:', err);
    } finally {
      setProfiles(storageService.getProfiles());
      setActiveProfile(storageService.getActiveProfile());
    }
  }, []);

  const currTheme = getCurriculumTheme(curriculumMode);

  // Theme styling based on Vibrant Palette with dynamic curriculum ambient tint
  const themeClasses: Record<ThemeMode, string> = {
    sunny: `${currTheme.appBackgroundTint} text-[#1E293B] transition-colors duration-500`,
    ocean: 'bg-gradient-to-br from-sky-100 via-blue-50 to-[#F0F9FF] text-[#1E293B]',
    forest: 'bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-50 text-[#1E293B]',
    galaxy: 'bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-50 text-[#1E293B]',
    dark: 'bg-slate-900 text-slate-100',
  };

  return (
    <div
      id="app-root-container"
      onMouseMove={handleMouseMove}
      className={`min-h-[100dvh] w-full flex flex-col justify-between overflow-x-hidden overflow-y-auto relative p-1.5 sm:p-2 md:p-3 font-sans ${
        themeClasses[settings.theme] || themeClasses.sunny
      }`}
    >
      {/* Mobile Auto-Detection Notification Banner (dismissible) */}
      {isAutoSwitched && !hasDismissedMobileBanner && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-white px-4 py-1.5 rounded-full shadow-lg border border-amber-300 text-xs font-black flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span>📱</span>
          <span>ตรวจพบโทรศัพท์มือถือ: เปิดโหมดสัมผัสหน้าจออัตโนมัติ (แตะตอบได้ทันที ไม่ต้องใช้กล้อง)</span>
          <button
            type="button"
            onClick={() => setHasDismissedMobileBanner(true)}
            className="ml-1 text-white/80 hover:text-white p-0.5 rounded-full cursor-pointer"
            title="ปิดการแจ้งเตือน"
          >
            ✕
          </button>
        </div>
      )}

      {showSkillGames ? (
        /* Dedicated Skill Games Page (เกมการศึกษา & ฝึกทักษะ K1-K3) */
        <div
          key="skill-games-view"
          id="skill-games-view-container"
          className="w-full flex-1 min-h-0 flex flex-col animate-screen-slide-in"
        >
          <SkillGamesPage
            currentGrade={currentGrade}
            onGradeChange={handleGradeChange}
            onReturnToHome={() => setShowSkillGames(false)}
            studentProfile={isSkillGamesGuestMode ? null : activeProfile}
            isGuestMode={isSkillGamesGuestMode}
            onSwitchProfile={handleOpenSkillGamesGate}
            soundVolume={settings.soundVolume}
            settings={settings}
            onToggleSound={handleToggleGlobalSound}
            onOpenFunFacts={handleOpenGeneralFunFacts}
            onOpenClassroomRoom={handleOpenClassroomRoom}
            activeClassroomRoom={studentActiveRoom || teacherActiveRoom}
          />
        </div>
      ) : !isGameStarted ? (
        /* Welcome & Profile Selection Gate with "เริ่มเล่นเกม" Button */
        <div
          key="start-profile-view"
          id="start-profile-view-container"
          className="w-full flex-1 min-h-0 flex flex-col justify-between animate-screen-slide-in"
        >
          <StartProfileScreen
            profiles={profiles}
            activeProfile={activeProfile}
            currentGrade={currentGrade}
            selectedSubjects={settings.selectedSubjects}
            activeExamSet={activeExamSet}
            currentUser={currentUser}
            isAdmin={isAdmin}
            onOpenExamSets={() => setShowExamSetSelector(true)}
            onOpenTeacherBuilder={() => setShowExamSetBuilder(true)}
            onClearActiveExamSet={() => handleSelectExamSet(null)}
            onSkillChange={handleSkillChange}
            onSelectProfile={handleSelectProfile}
            onCreateProfile={handleCreateProfile}
            onUpdateProfile={handleUpdateProfile}
            onDeleteProfile={handleDeleteProfile}
            onGradeChange={handleGradeChange}
            onStartGame={handleStartGame}
            onOpenClassReport={() => handleOpenReport('classroom')}
            onOpenWorksheets={() => setShowWorksheetModal(true)}
            onOpenSkillGames={handleOpenSkillGames}
            onOpenClassroomRoom={handleOpenClassroomRoom}
            activeClassroomRoom={studentActiveRoom || teacherActiveRoom}
            onOpenTopPerformers={() => setShowTopPerformersModal(true)}
            onOpenSettings={() => setShowSettingsModal(true)}
            onOpenQuestionManager={() => setShowQuestionManagerModal(true)}
            onOpenBadges={() => setShowBadgesModal(true)}
            onOpenFeedback={() => setShowFeedbackModal(true)}
            onOpenFunFacts={handleOpenGeneralFunFacts}
            onOpenWeeklyTrends={() => setShowWeeklyTrendModal(true)}
            onOpenSkillRadarReport={handleOpenSkillRadarReport}
            onOpenThaiHandwriting={handleOpenThaiHandwriting}
            onOpenEnglishHandwriting={handleOpenEnglishHandwriting}
            onSyncProfiles={handleSyncProfiles}
            soundVolume={settings.soundVolume}
            voicePersona={settings.voicePersona}
            onToggleSound={handleToggleGlobalSound}
            questionsPerSkill={settings.questionsPerSkill || 3}
            onChangeQuestionsPerSkill={handleChangeQuestionsPerSkill}
            effectiveMode={effectiveMode}
            isAutoSwitched={isAutoSwitched}
            onToggleControlMode={handleToggleControlMode}
            onOpenHandCalibration={() => setShowCalibrateHandModal(true)}
            onOpenDailyLogin={() => setShowDailyLoginModal(true)}
            hasUnclaimedDailyReward={canClaimDailyReward(activeProfile)}
            onOpenCompetencyActivities={() => setShowCompetencyActivitiesModal(true)}
            curriculumMode={curriculumMode}
            onOpenCurriculumSwitch={() => setShowCurriculumLandingModal(true)}
            onSelectCurriculumMode={handleSelectCurriculumMode}
            onOpenCompetencyReport={handleOpenCompetencyReport}
            onOpenAIQuestionSuggester={handleOpenAIQuestionSuggester}
            onOpenClassroomDiscussion={() => setShowClassroomDiscussionModal(true)}
            onStartWeeklyChallenge={handleStartWeeklyChallenge}
            onProfileUpdated={(updated) => {
              setActiveProfile(updated);
              setProfiles(storageService.getProfiles());
            }}
          />
        </div>
      ) : (
        <div
          key="game-stage-view"
          id="game-stage-view-container"
          className="w-full flex-1 min-h-0 flex flex-col justify-between animate-screen-slide-in"
        >
          {/* Top Landscape Header Navigation */}
          <HeaderBar
            activeProfile={activeProfile}
            settings={settings}
            score={score}
            currentStreak={currentStreak}
            currentGrade={currentGrade}
            activeExamSet={activeExamSet}
            onGradeChange={handleGradeChange}
            onOpenProfiles={() => setShowProfileModal(true)}
            onOpenStreakModal={() => {
              setStreakModalProfile(activeProfile);
              setShowStreakModal(true);
            }}
            onOpenExamSets={() => setShowExamSetSelector(true)}
            onOpenSkillSelect={() => setShowSkillModal(true)}
            onOpenBadges={() => setShowBadgesModal(true)}
            onOpenTopPerformers={() => setShowTopPerformersModal(true)}
            onOpenReport={() => handleOpenReport('individual')}
            onOpenSkillRadarReport={handleOpenSkillRadarReport}
            onOpenSettings={() => setShowSettingsModal(true)}
            onOpenWorksheets={() => setShowWorksheetModal(true)}
            onOpenSkillGames={handleOpenSkillGames}
            onOpenThaiHandwriting={handleOpenThaiHandwriting}
            onOpenEnglishHandwriting={handleOpenEnglishHandwriting}
            onOpenClassroomRoom={handleOpenClassroomRoom}
            activeClassroomRoom={studentActiveRoom || teacherActiveRoom}
            onOpenQuestionManager={() => setShowQuestionManagerModal(true)}
            onOpenFeedback={() => setShowFeedbackModal(true)}
            onOpenFunFacts={handleOpenGeneralFunFacts}
            onOpenWeeklyTrends={() => setShowWeeklyTrendModal(true)}
            onToggleSound={handleToggleGlobalSound}
            onToggleCamera={() =>
              handleSaveSettings({ ...settings, showCameraFeed: !settings.showCameraFeed })
            }
            onReplaySpeech={handleReplaySpeech}
            onReturnToHome={() => setIsGameStarted(false)}
            effectiveMode={effectiveMode}
            isAutoSwitched={isAutoSwitched}
            onToggleControlMode={handleToggleControlMode}
            onOpenHandCalibration={() => setShowCalibrateHandModal(true)}
            onOpenDailyLogin={() => setShowDailyLoginModal(true)}
            hasUnclaimedDailyReward={canClaimDailyReward(activeProfile)}
            onOpenCompetencyActivities={() => setShowCompetencyActivitiesModal(true)}
            curriculumMode={curriculumMode}
            onOpenCurriculumSwitch={() => setShowCurriculumLandingModal(true)}
            onOpenCompetencyReport={handleOpenCompetencyReport}
          />

          {/* Main Educational Gameplay Stage */}
          <GameScreen
            question={currentQuestion}
            questionNumber={questionIndex + 1}
            totalQuestions={totalQuestionsInRound}
            settings={settings}
            handPoint={handPoint}
            onDwellProgressChange={handleDwellProgressChange}
            onAnswerSelected={handleAnswerSelected}
            onNextQuestion={handleNextQuestion}
            roundComplete={roundComplete}
            roundResults={roundResults}
            onRestartRound={handleRestartRound}
            onOpenReport={() => handleOpenReport('individual')}
            onReturnToHome={() => setIsGameStarted(false)}
            effectiveMode={effectiveMode}
            isAutoSwitched={isAutoSwitched}
            dualSaveStatus={dualSaveStatus}
            adaptiveState={adaptiveState}
            dailyMissionAwarded={dailyMissionAwarded}
            weeklyChallengeAwarded={weeklyChallengeAwarded}
            activeWeeklyChallengeSkill={activeWeeklyChallengeSkill}
            newlyUnlockedBadges={roundUnlockedBadges}
            onOpenBadges={() => setShowBadgesModal(true)}
            currentStreak={currentStreak}
            onToggleSound={handleToggleGlobalSound}
          />
        </div>
      )}

      {/* Floating Animated Hand Pointer Overlay (Only in Hand Mode, hidden when Calibrate Modal is open) */}
      {effectiveMode === 'hand' && !showCalibrateHandModal && (
        <HandPointerOverlay
          point={handPoint}
          dwellProgress={dwellProgress}
          isHoveringTarget={isHoveringTarget}
          scale={settings.handPointerScale}
        />
      )}

      {/* MediaPipe Webcam Tracking Engine (Active in Hand Mode or during Hand Calibration) */}
      {(effectiveMode === 'hand' || showCalibrateHandModal) && (
        <HandTrackingCamera
          settings={settings}
          onHandMove={setHandPoint}
          isGameActive={(isGameStarted && !roundComplete) || showCalibrateHandModal}
        />
      )}

      {/* Daily Mission Completed Toast Notification */}
      {dailyMissionToast && (
        <div
          id="daily-mission-toast"
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white px-6 py-3.5 rounded-2xl shadow-2xl border-2 border-white/80 flex items-center gap-3 animate-in bounce-in duration-300"
        >
          <span className="text-3xl animate-bounce">🎯</span>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-emerald-100 flex items-center gap-1">
              <span>🌟 ภารกิจประจำวันสำเร็จ!</span>
              <span className="bg-white/20 px-2 py-0.2 rounded-full">หมวด: {dailyMissionToast.skillTitleTh}</span>
            </div>
            <div className="text-sm font-black text-white">
              ได้รับคะแนนโบนัสสะสม +{dailyMissionToast.bonusPoints} คะแนนพิเศษเข้าโปรไฟล์เรียบร้อย! 🎉
            </div>
          </div>
        </div>
      )}

      {/* Unlocked Badge Toast Notification */}
      {unlockedToast && (
        <div
          id="badge-unlocked-toast"
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 text-amber-950 px-6 py-3 rounded-2xl shadow-2xl border-2 border-white flex items-center gap-3 animate-in bounce-in duration-300"
        >
          <span className="text-3xl animate-bounce">{unlockedToast.icon}</span>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-900">
              🎉 ปลดล็อกเหรียญรางวัลใหม่!
            </div>
            <div className="text-sm font-black">
              {unlockedToast.title[settings.language] || unlockedToast.title.th}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ReportModal
        profile={activeProfile}
        profiles={profiles}
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSelectProfile={handleSelectProfile}
        onRefreshProfiles={handleRefreshData}
        initialTab={reportModalTab}
        curriculumMode={curriculumMode}
      />

      <WeeklyDevelopmentTrendModal
        isOpen={showWeeklyTrendModal}
        onClose={() => setShowWeeklyTrendModal(false)}
        profiles={profiles}
        activeProfile={activeProfile}
        currentGrade={currentGrade}
        soundVolume={settings.soundVolume}
        onSelectProfile={handleSelectProfile}
        curriculumMode={curriculumMode}
      />

      <ThaiHandwritingModal
        isOpen={showThaiHandwritingModal}
        onClose={() => setShowThaiHandwritingModal(false)}
        currentGrade={currentGrade}
        soundVolume={settings.soundVolume}
        externalHandPoint={handPoint}
        studentProfile={activeProfile}
        initialAlphabet={handwritingInitialAlphabet}
      />

      <ProfileModal
        profiles={profiles}
        activeProfileId={activeProfile.id}
        isOpen={showProfileModal}
        currentUser={currentUser}
        isAdmin={isAdmin}
        curriculumMode={curriculumMode}
        onSelectCurriculumMode={handleSelectCurriculumMode}
        onClose={() => setShowProfileModal(false)}
        onSelectProfile={handleSelectProfile}
        onCreateProfile={handleCreateProfile}
        onUpdateProfile={handleUpdateProfile}
        onDeleteProfile={handleDeleteProfile}
        onSyncProfiles={handleSyncProfiles}
        onOpenStreakModal={(prof) => {
          setStreakModalProfile(prof);
          setShowStreakModal(true);
        }}
      />

      <BadgesModal
        profile={activeProfile}
        isOpen={showBadgesModal}
        onClose={() => setShowBadgesModal(false)}
        language={settings.language}
        soundVolume={settings.soundVolume}
        onPlaySubject={(subj) => {
          setShowBadgesModal(false);
          setSettings((prev) => ({
            ...prev,
            selectedSubjects: [subj],
          }));
          handleStartGame();
        }}
        onOpenCertificate={() => {
          setShowBadgesModal(false);
          setShowReportModal(true);
        }}
      />

      <ParentSettingsModal
        settings={settings}
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onSaveSettings={handleSaveSettings}
        onOpenFeedback={() => setShowFeedbackModal(true)}
        onOpenQuestionManager={() => setShowQuestionManagerModal(true)}
        onOpenHandCalibration={() => setShowCalibrateHandModal(true)}
        curriculumMode={curriculumMode}
        onSelectCurriculumMode={handleSelectCurriculumMode}
        profiles={profiles}
        onDeleteProfile={handleDeleteProfile}
        activeProfile={activeProfile}
      />

      {/* Hand Tracking Calibration Modal for Children & Teachers */}
      <CalibrateHandModal
        isOpen={showCalibrateHandModal}
        onClose={() => setShowCalibrateHandModal(false)}
        handPoint={handPoint}
        settings={settings}
        onUpdateSettings={handleSaveSettings}
      />

      <QuestionManagerModal
        isOpen={showQuestionManagerModal}
        onClose={() => setShowQuestionManagerModal(false)}
        allQuestions={allAvailableQuestions}
        onQuestionsChange={() => setQuestionsVersion((v) => v + 1)}
        onOpenExamSetBuilder={() => setShowExamSetBuilder(true)}
        initialTab={questionManagerInitialTab}
        onPlayExamSet={(examSet) => {
          handleSelectExamSet(examSet);
          setIsGameStarted(true);
          setShowQuestionManagerModal(false);
          setShowExamSetBuilder(false);
        }}
        curriculumMode={curriculumMode}
      />

      <ExamSetSelectorModal
        isOpen={showExamSetSelector}
        onClose={() => setShowExamSetSelector(false)}
        currentGrade={currentGrade}
        activeExamSetId={activeExamSet ? activeExamSet.id : null}
        allQuestions={allAvailableQuestions}
        onSelectExamSet={handleSelectExamSet}
        onOpenTeacherBuilder={() => setShowExamSetBuilder(true)}
        curriculumMode={curriculumMode}
      />

      <ExamSetBuilderModal
        isOpen={showExamSetBuilder}
        onClose={() => setShowExamSetBuilder(false)}
        allQuestions={allAvailableQuestions}
        currentGrade={currentGrade}
        onSelectAndPlayExamSet={(set) => {
          handleSelectExamSet(set);
          setIsGameStarted(true);
        }}
        onOpenAIGenerator={handleOpenAIQuestionSuggester}
      />

      <WorksheetGeneratorModal
        currentGrade={currentGrade}
        isOpen={showWorksheetModal}
        onClose={() => setShowWorksheetModal(false)}
        questions={allAvailableQuestions}
        curriculumMode={curriculumMode}
      />

      <SkillSelectModal
        isOpen={showSkillModal}
        onClose={() => setShowSkillModal(false)}
        selectedSubjects={settings.selectedSubjects}
        onApplySkills={handleSkillChange}
        currentGrade={currentGrade}
        soundVolume={settings.soundVolume}
        questionsPerSkill={settings.questionsPerSkill || 3}
        onChangeQuestionsPerSkill={handleChangeQuestionsPerSkill}
      />

      {/* Feedback to Developer Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        soundVolume={settings.soundVolume}
        currentProfileName={activeProfile.name}
        currentGrade={activeProfile.grade}
      />

      {/* 30-Day Learning Streak Tracker Modal */}
      <StreakTrackerModal
        profile={streakModalProfile || activeProfile}
        isOpen={showStreakModal}
        onClose={() => setShowStreakModal(false)}
        onStartGame={() => {
          setShowStreakModal(false);
          setIsGameStarted(true);
        }}
        soundVolume={settings.soundVolume}
        onOpenBadges={() => {
          setShowStreakModal(false);
          setShowBadgesModal(true);
        }}
      />

      {/* Top Performers Anonymous Classroom Leaderboard Modal */}
      <TopPerformersModal
        isOpen={showTopPerformersModal}
        onClose={() => setShowTopPerformersModal(false)}
        profiles={profiles}
        activeProfile={activeProfile}
        soundVolume={settings.soundVolume}
        onSelectProfile={handleSelectProfile}
        curriculumMode={curriculumMode}
      />

      {/* Skill Games Profile Gate Modal (Select Profile / Create New / Guest Mode) */}
      <SkillGamesProfileGateModal
        isOpen={showSkillGamesProfileGate}
        onClose={() => setShowSkillGamesProfileGate(false)}
        profiles={profiles}
        activeProfile={activeProfile}
        currentGrade={currentGrade}
        onSelectProfileAndEnter={handleSelectProfileAndEnterSkillGames}
        onCreateProfileAndEnter={handleCreateProfileAndEnterSkillGames}
        onEnterAsGuest={handleEnterSkillGamesAsGuest}
        soundVolume={settings.soundVolume}
      />

      {/* Educational Fun Facts Modal to Spark Curiosity */}
      <FunFactModal
        isOpen={showFunFactModal}
        targetContext={funFactTarget}
        onClose={() => setShowFunFactModal(false)}
        onStartGame={() => {
          if (funFactTarget === 'skill_games') {
            proceedToSkillGames();
          } else if (funFactTarget === 'quiz') {
            executeStartGame();
          } else {
            setShowFunFactModal(false);
          }
        }}
        language={settings.language}
        voicePersona={settings.voicePersona}
        soundVolume={settings.soundVolume}
        autoSpeak={settings.autoSpeak}
      />

      {/* Classroom Teacher Audio Mute HUD */}
      {muteHudState && (
        <ClassroomAudioMuteHud
          isMuted={muteHudState.isMuted}
          volume={muteHudState.volume}
          onDismiss={() => setMuteHudState(null)}
          onToggleMute={handleToggleGlobalSound}
        />
      )}

      {/* Classroom Student Live HUD (when connected to a room as student) */}
      {studentActiveRoom && activeProfile && (
        <ClassroomStudentLiveHud
          room={studentActiveRoom}
          studentProfile={activeProfile}
          soundVolume={settings.soundVolume}
          onLeaveRoom={handleLeaveStudentRoom}
          onOpenRoomDashboard={() => setShowClassroomJoinModal(true)}
        />
      )}

      {/* Classroom Live Dashboard Modal (Teacher Room Control Center) */}
      {showClassroomDashboardModal && teacherActiveRoom && (
        <ClassroomLiveDashboardModal
          room={teacherActiveRoom}
          soundVolume={settings.soundVolume}
          onClose={() => setShowClassroomDashboardModal(false)}
          onRoomClosed={handleRoomClosedByTeacher}
        />
      )}

      {/* Classroom Join & Create Modal */}
      {showClassroomJoinModal && (
        <ClassroomJoinModal
          activeProfile={activeProfile}
          soundVolume={settings.soundVolume}
          onClose={() => setShowClassroomJoinModal(false)}
          onJoinedAsStudent={handleJoinedAsStudent}
          onOpenTeacherDashboard={handleOpenTeacherDashboard}
        />
      )}

      {/* Daily Login Reward Modal */}
      <DailyLoginRewardModal
        isOpen={showDailyLoginModal}
        onClose={() => setShowDailyLoginModal(false)}
        profile={activeProfile}
        onRewardClaimed={handleDailyRewardClaimed}
        onStartGame={() => {
          setShowDailyLoginModal(false);
          handleStartGame();
        }}
        soundVolume={settings.soundVolume}
        voicePersona={settings.voicePersona}
      />

      {/* Competency Hands-on Activities Modal (6 Core Competencies with Interactive 5-Minute Steps) */}
      <CompetencyActivitiesModal
        isOpen={showCompetencyActivitiesModal}
        onClose={() => setShowCompetencyActivitiesModal(false)}
        currentGrade={currentGrade}
        activeProfileName={activeProfile.name}
        activeProfileId={activeProfile.id}
        soundVolume={settings.soundVolume}
        voicePersona={settings.voicePersona}
      />

      {/* Curriculum Selection Landing Modal (เลือกหลักสูตร: พัฒนา 8 ทักษะ อ.1-อ.3 หรือ สมรรถนะ ป.1-ป.3 เมื่อเปิดแอป) */}
      <CurriculumSelectionLandingModal
        isOpen={showCurriculumLandingModal}
        currentMode={curriculumMode}
        onSelectMode={handleSelectCurriculumMode}
        onClose={() => setShowCurriculumLandingModal(false)}
        canDismiss={true}
        soundVolume={settings.soundVolume}
      />

      {/* Classroom Discussion Modal: แลกเปลี่ยนเทคนิคการสอน & แนวทางพัฒนาสมรรถนะ */}
      <ClassroomDiscussionModal
        isOpen={showClassroomDiscussionModal}
        onClose={() => setShowClassroomDiscussionModal(false)}
        curriculumMode={curriculumMode}
        currentProfileName={activeProfile.name}
        currentUser={currentUser}
        isAdmin={isAdmin}
        soundVolume={settings.soundVolume}
      />
    </div>
  );
}
