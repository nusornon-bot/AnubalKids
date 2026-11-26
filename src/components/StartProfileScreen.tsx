import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Play,
  UserPlus,
  Users,
  Award,
  Crown,
  BarChart3,
  Printer,
  Settings,
  Sparkles,
  Check,
  Flame,
  Gamepad2,
  BookOpen,
  Trash2,
  AlertTriangle,
  MessageSquare,
  Cloud,
  RefreshCw,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowUpDown,
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
  TrendingDown,
  Pencil,
  Lock,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Volume2,
  VolumeX,
  Minus,
  Plus,
  Star,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { ChildProfile, Grade, Subject, ExamSet, CurriculumMode, VoicePersona, PRIMARY_GRADES } from '../types';
import { soundEffects } from '../services/audioService';
import { SKILLS_LIST, CORE_5_SKILL_IDS } from '../data/skills';
import { sortProfilesByLatest } from '../services/cloudSyncService';
import {
  getStudentRecommendationFromFirestore,
  RecommendationResult,
} from '../services/recommendationService';
import { StreakTrackerModal } from './StreakTrackerModal';
import { canEditProfile, canDeleteProfile, isProfileCreatedOnThisDevice } from '../services/deviceService';
import { AdminAuthModal } from './AdminAuthModal';
import { AvatarEditor } from './AvatarEditor';
import { getAvatarColorOption } from '../utils/avatarUtils';
import { getCurriculumTheme } from '../utils/curriculumTheme';
import { DeviceCompatibilityModal } from './DeviceCompatibilityModal';
import { DailyMissionWidget } from './DailyMissionWidget';
import { PendingSyncIndicator } from './PendingSyncIndicator';
import { PWAInstallButton } from './PWAInstallButton';
import { ClassroomRoom } from '../services/classroomRoomService';
import { HomeTopBar } from './home/HomeTopBar';
import { OriginalHomeProfilesSection } from './home/OriginalHomeProfilesSection';
import { LearningConfigSection } from './home/LearningConfigSection';
import { SmartAssistantSection } from './home/SmartAssistantSection';
import { TeacherParentToolsPanel } from './home/TeacherParentToolsPanel';
import { PreGameStoryModal } from './PreGameStoryModal';
import { HandTracingActivityModal } from './HandTracingActivityModal';
import { EarlyChildhoodActivitiesSection } from './home/EarlyChildhoodActivitiesSection';
import { WeeklyChallengeSection } from './home/WeeklyChallengeSection';
import { OutdoorLearningAdventureModal } from './OutdoorLearningAdventureModal';
import { UserActivityHistoryPanel } from './home/UserActivityHistoryPanel';
import { EarlyChildhoodActivitiesModal } from './EarlyChildhoodActivitiesModal';
import { CompetencyActivitiesSection } from './home/CompetencyActivitiesSection';
import { ThaiPhonicsAirWritingModal } from './ThaiPhonicsAirWritingModal';
import { ThaiPhonicsWordBuilderView } from './skillgames/ThaiPhonicsWordBuilderView';
import { UnifiedHolisticReportModal } from './UnifiedHolisticReportModal';
import { SynergyQuestsCard } from './home/SynergyQuestsCard';
import { MultiColorPhonicsModal } from './MultiColorPhonicsModal';
import { VoicePhonicsAssessmentModal } from './VoicePhonicsAssessmentModal';
import { DiagnosticRemedialModal } from './DiagnosticRemedialModal';
import { OfficialMOEReportModal } from './OfficialMOEReportModal';
import { AvatarRewardStudioModal } from './AvatarRewardStudioModal';
import { HomeSchoolConnectionModal } from './HomeSchoolConnectionModal';
import { MiniChallengeWidget } from './home/MiniChallengeWidget';
import { DashboardCardsGrid } from './home/DashboardCardsGrid';

interface StartProfileScreenProps {
  profiles: ChildProfile[];
  activeProfile: ChildProfile;
  currentGrade: Grade;
  selectedSubjects: Subject[];
  activeExamSet?: ExamSet | null;
  onOpenExamSets?: () => void;
  onOpenTeacherBuilder?: () => void;
  onClearActiveExamSet?: () => void;
  onSkillChange: (subjects: Subject[]) => void;
  onSelectProfile: (profileId: string) => void;
  onCreateProfile: (name: string, grade: Grade, avatar: string, avatarBg?: string) => void;
  onUpdateProfile?: (
    profileId: string,
    updates: { name: string; grade: Grade; avatar: string; avatarBg?: string }
  ) => void;
  onDeleteProfile?: (profileId: string) => void;
  onGradeChange: (grade: Grade) => void;
  onStartGame: () => void;
  onOpenClassReport: () => void;
  onOpenWorksheets: () => void;
  onOpenSkillGames?: () => void;
  onOpenClassroomRoom?: () => void;
  activeClassroomRoom?: ClassroomRoom | null;
  onOpenTopPerformers?: () => void;
  onOpenSettings: () => void;
  onOpenQuestionManager?: () => void;
  onOpenBadges: () => void;
  onOpenFeedback?: () => void;
  onOpenFunFacts?: () => void;
  onOpenWeeklyTrends?: () => void;
  onOpenSkillRadarReport?: () => void;
  onOpenThaiHandwriting?: () => void;
  onOpenEnglishHandwriting?: () => void;
  onSyncProfiles?: () => Promise<void>;
  soundVolume: number;
  onToggleSound?: () => void;
  questionsPerSkill?: number;
  onChangeQuestionsPerSkill?: (count: number) => void;
  effectiveMode?: 'touch' | 'hand';
  isAutoSwitched?: boolean;
  onToggleControlMode?: () => void;
  onOpenHandCalibration?: () => void;
  currentUser?: User | null;
  isAdmin?: boolean;
  onOpenDailyLogin?: () => void;
  hasUnclaimedDailyReward?: boolean;
  onOpenCompetencyActivities?: () => void;
  onOpenCompetencyReport?: () => void;
  onOpenAIQuestionSuggester?: () => void;
  onOpenClassroomDiscussion?: () => void;
  curriculumMode?: CurriculumMode;
  onOpenCurriculumSwitch?: () => void;
  onSelectCurriculumMode?: (mode: CurriculumMode, rememberChoice: boolean) => void;
  voicePersona?: VoicePersona;
  onStartWeeklyChallenge?: (skill: Subject) => void;
  onProfileUpdated?: (updated: ChildProfile) => void;
}

const AVATAR_OPTIONS = [
  '🐰', '🦁', '🚀', '🐼', '🦄', '🐯', '🐥', '🦖', '🐬', '🐶', '🦊', '🐨', '🐻', '🐵', '🐱', '⭐',
  '👸', '❄️', '☃️', '🧜‍♀️', '🧚', '🧞', '🏰', '🕷️', '🤖', '🛡️', '⚡', '🔨', '💪', '🦸‍♂️', '🦸‍♀️'
];

function formatLastActive(profile: ChildProfile): string {
  const dateStr = profile.updatedAt || profile.lastPlayedDate || profile.createdAt;
  if (!dateStr) return 'เพิ่งสร้าง';
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    if (isNaN(diffMs) || diffMs < 0) return 'ล่าสุด';
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 2) return 'เมื่อสักครู่';
    if (diffMinutes < 60) return `${diffMinutes} นาทีที่แล้ว`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} ชม.ที่แล้ว`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'เมื่อวานนี้';
    if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
    return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
  } catch {
    return dateStr;
  }
}

export const StartProfileScreen: React.FC<StartProfileScreenProps> = ({
  profiles,
  activeProfile,
  currentGrade,
  selectedSubjects,
  activeExamSet,
  onOpenExamSets,
  onOpenTeacherBuilder,
  onClearActiveExamSet,
  onSkillChange,
  onSelectProfile,
  onCreateProfile,
  onUpdateProfile,
  onDeleteProfile,
  onGradeChange,
  onStartGame,
  onOpenClassReport,
  onOpenWorksheets,
  onOpenSkillGames,
  onOpenClassroomRoom,
  activeClassroomRoom,
  onOpenTopPerformers,
  onOpenSettings,
  onOpenQuestionManager,
  onOpenBadges,
  onOpenFeedback,
  onOpenFunFacts,
  onOpenWeeklyTrends,
  onOpenSkillRadarReport,
  onOpenThaiHandwriting,
  onOpenEnglishHandwriting,
  onSyncProfiles,
  soundVolume,
  onToggleSound,
  questionsPerSkill = 3,
  onChangeQuestionsPerSkill,
  effectiveMode = 'hand',
  isAutoSwitched = false,
  onToggleControlMode,
  onOpenHandCalibration,
  currentUser = null,
  isAdmin = false,
  onOpenDailyLogin,
  hasUnclaimedDailyReward = false,
  onOpenCompetencyActivities,
  onOpenCompetencyReport,
  onOpenAIQuestionSuggester,
  onOpenClassroomDiscussion,
  curriculumMode = 'early_childhood',
  onOpenCurriculumSwitch,
  onSelectCurriculumMode,
  voicePersona = 'child_girl',
  onStartWeeklyChallenge,
  onProfileUpdated,
}) => {
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const currTheme = getCurriculumTheme(curriculumMode);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState<Grade>(() => (curriculumMode === 'cbe_primary' ? 'P1' : 'K1'));
  const [selectedAvatar, setSelectedAvatar] = useState('🐰');
  const [selectedAvatarBg, setSelectedAvatarBg] = useState('amber');
  const [editingProfile, setEditingProfile] = useState<ChildProfile | null>(null);
  const [editName, setEditName] = useState('');
  const [editGrade, setEditGrade] = useState<Grade>(() => (curriculumMode === 'cbe_primary' ? 'P1' : 'K1'));
  const [editAvatar, setEditAvatar] = useState('🐰');
  const [editAvatarBg, setEditAvatarBg] = useState('amber');

  // Keep newGrade aligned when curriculumMode toggles
  useEffect(() => {
    if (curriculumMode === 'cbe_primary' && ['K1', 'K2', 'K3'].includes(newGrade)) {
      setNewGrade('P1');
    } else if (curriculumMode === 'early_childhood' && ['P1', 'P2', 'P3'].includes(newGrade)) {
      setNewGrade('K1');
    }
  }, [curriculumMode, newGrade]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [showAdminAuthModal, setShowAdminAuthModal] = useState(false);
  const [adminAuthTargetProfile, setAdminAuthTargetProfile] = useState<ChildProfile | null>(null);
  const [showDeviceDiagnostics, setShowDeviceDiagnostics] = useState(false);

  // 30-Day Learning Streak Tracker Popup state
  const [streakModalProfile, setStreakModalProfile] = useState<ChildProfile | null>(null);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);

  // Pre-Game AI Story Modal state
  const [isPreGameStoryOpen, setIsPreGameStoryOpen] = useState(false);

  // Hand Tracing Activity Modal state
  const [isHandTracingModalOpen, setIsHandTracingModalOpen] = useState(false);

  // Outdoor Learning Adventure Modal state
  const [isOutdoorAdventureOpen, setIsOutdoorAdventureOpen] = useState(false);

  // Early Childhood 8 Skills Activities List Modal state
  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);

  // Cross-Curriculum Synergy Modals
  const [showAirWritingModal, setShowAirWritingModal] = useState(false);
  const [showWordBuilderModal, setShowWordBuilderModal] = useState(false);
  const [showHolisticReportModal, setShowHolisticReportModal] = useState(false);
  const [showColorPhonicsModal, setShowColorPhonicsModal] = useState(false);
  const [showVoicePhonicsModal, setShowVoicePhonicsModal] = useState(false);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [showAvatarShopModal, setShowAvatarShopModal] = useState(false);
  const [showOfficialReportModal, setShowOfficialReportModal] = useState(false);
  const [showHomeSchoolModal, setShowHomeSchoolModal] = useState(false);

  // Categorized Home Tabs: 'cards_grid' | 'learn' | 'missions' | 'profiles'
  const [activeHomeTab, setActiveHomeTab] = useState<'cards_grid' | 'learn' | 'missions' | 'profiles'>('cards_grid');

  const handleOpenStreakModal = (e: React.MouseEvent, targetProfile: ChildProfile) => {
    e.stopPropagation();
    soundEffects.playTap(soundVolume);
    onSelectProfile(targetProfile.id);
    setStreakModalProfile(targetProfile);
    setIsStreakModalOpen(true);
  };

  // Skill cards view toggle (default false for clean, uncluttered, step-by-step look)
  const [showAllSkillDetails, setShowAllSkillDetails] = useState(false);
  const [showTeacherPanel, setShowTeacherPanel] = useState(false);
  const [showSmartAssistant, setShowSmartAssistant] = useState(false);
  const [showActivityHistory, setShowActivityHistory] = useState(false);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const [showRecommendationDetail, setShowRecommendationDetail] = useState(false);

  // Search, Filter, Sort & Pagination state (9 profiles per page, sorted by latest)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'ALL' | Grade | 'PRIMARY'>('ALL');
  const [sortBy, setSortBy] = useState<'latest' | 'score' | 'name'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Reset grade filter when curriculumMode switches to prevent cross-curriculum filter states
  useEffect(() => {
    setSelectedGradeFilter('ALL');
    setCurrentPage(1);
  }, [curriculumMode]);

  // Filtered and sorted profiles list with strict system separation
  const filteredProfiles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = profiles.filter((p) => {
      // 1. Strict Curriculum System Segregation (แยกระบบบริหารจัดการออกจากกันอย่างชัดเจน)
      if (curriculumMode === 'cbe_primary') {
        if (!['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(p.grade)) return false;
      } else if (curriculumMode === 'thai_phonics') {
        if (!['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(p.grade)) return false;
      } else {
        if (!['K1', 'K2', 'K3'].includes(p.grade)) return false;
      }

      // 2. Grade filter within active curriculum
      if (selectedGradeFilter !== 'ALL') {
        if (selectedGradeFilter === 'PRIMARY') {
          if (!p.grade.startsWith('P')) return false;
        } else if (p.grade !== selectedGradeFilter) {
          return false;
        }
      }

      // 3. Search term
      if (q) {
        const nameMatch = (p.name || '').toLowerCase().includes(q);
        const gradeStr = (p.grade || '').toLowerCase();
        const gradeMatch =
          gradeStr.includes(q) ||
          (q.includes('1') && (gradeStr === 'k1' || gradeStr === 'p1')) ||
          (q.includes('2') && (gradeStr === 'k2' || gradeStr === 'p2')) ||
          (q.includes('3') && (gradeStr === 'k3' || gradeStr === 'p3')) ||
          (q.includes('อนุบาล') && gradeStr.startsWith('k')) ||
          (q.includes('อ.') && gradeStr.startsWith('k')) ||
          (q.includes('ประถม') && gradeStr.startsWith('p')) ||
          (q.includes('ป.') && gradeStr.startsWith('p'));
        const idMatch = (p.id || '').toLowerCase().includes(q);
        return nameMatch || gradeMatch || idMatch;
      }
      return true;
    });

    // Default: Sort by latest updated/created/played
    if (sortBy === 'latest') {
      list = sortProfilesByLatest(list);
    } else if (sortBy === 'score') {
      list = [...list].sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => (a.name || '').localeCompare(b.name || '', 'th'));
    }

    return list;
  }, [profiles, curriculumMode, searchQuery, selectedGradeFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / ITEMS_PER_PAGE));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleGradeFilterChange = (filter: 'ALL' | Grade | 'PRIMARY') => {
    setSelectedGradeFilter(filter);
    setCurrentPage(1);
  };

  const handleManualSync = async () => {
    if (!onSyncProfiles || isSyncingCloud) return;
    setIsSyncingCloud(true);
    setFeedbackMsg('กำลังซิงค์โปรไฟล์กับคลาวด์...');

    // Safety fallback timer: guarantee isSyncingCloud is cleared within 4.5s
    const safetyTimer = setTimeout(() => {
      setIsSyncingCloud(false);
      setFeedbackMsg('ซิงค์ข้อมูลโปรไฟล์เรียบร้อยแล้ว ☁️✨');
      setTimeout(() => setFeedbackMsg(null), 2500);
    }, 4500);

    try {
      await onSyncProfiles();
      clearTimeout(safetyTimer);
      setFeedbackMsg('ซิงค์โปรไฟล์กับคลาวด์สำเร็จ! ☁️✨');
      setTimeout(() => setFeedbackMsg(null), 2500);
    } catch {
      clearTimeout(safetyTimer);
      setFeedbackMsg('ซิงค์ข้อมูลในเครื่องเรียบร้อยแล้ว (โหมดออฟไลน์)');
      setTimeout(() => setFeedbackMsg(null), 2500);
    } finally {
      setIsSyncingCloud(false);
    }
  };

  const handleStart = () => {
    soundEffects.playCorrect(soundVolume);
    onStartGame();
  };

  const handleStartDailyMission = (missionSubject: Subject) => {
    if (onClearActiveExamSet) {
      onClearActiveExamSet();
    }
    onSkillChange([missionSubject]);
    soundEffects.playCorrect(soundVolume);
    onStartGame();
  };

  const handleStartActivitySkill = (skillId: Subject) => {
    if (onClearActiveExamSet) {
      onClearActiveExamSet();
    }
    onSkillChange([skillId]);
    soundEffects.playCorrect(soundVolume);
    onStartGame();
  };

  const handleStartWeeklyChallenge = (skillId: Subject) => {
    if (onStartWeeklyChallenge) {
      onStartWeeklyChallenge(skillId);
      return;
    }
    if (onClearActiveExamSet) {
      onClearActiveExamSet();
    }
    onSkillChange([skillId]);
    soundEffects.playVictory(soundVolume);
    onStartGame();
  };

  const handleSelectDailyMissionSubject = (missionSubject: Subject) => {
    if (selectedSubjects.includes(missionSubject)) {
      if (selectedSubjects.length > 1) {
        onSkillChange(selectedSubjects.filter((s) => s !== missionSubject));
      }
    } else {
      onSkillChange([...selectedSubjects, missionSubject]);
    }
  };

  const handleStartEditProfile = (profile: ChildProfile, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!canEditProfile(profile, isAdmin)) {
      setAdminAuthTargetProfile(profile);
      setShowAdminAuthModal(true);
      return;
    }
    soundEffects.playTap(soundVolume);
    setEditingProfile(profile);
    setEditName(profile.name);
    setEditGrade(profile.grade);
    setEditAvatar(profile.avatar || '🐰');
    setEditAvatarBg(profile.avatarBg || 'amber');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile || !editName.trim()) return;
    const trimmed = editName.trim();
    if (onUpdateProfile) {
      onUpdateProfile(editingProfile.id, {
        name: trimmed,
        grade: editGrade,
        avatar: editAvatar,
        avatarBg: editAvatarBg,
      });
    }
    soundEffects.playCorrect(soundVolume);
    setFeedbackMsg(`แก้ไขโปรไฟล์ "${trimmed}" สำเร็จแล้ว ✨`);
    setTimeout(() => setFeedbackMsg(null), 3500);
    setEditingProfile(null);
  };

  const handleProfileClick = (p: ChildProfile) => {
    if (deleteConfirmId === p.id) return;
    soundEffects.playTap(soundVolume);
    onSelectProfile(p.id);
  };

  const handleTriggerDelete = (e: React.MouseEvent, profileId: string) => {
    e.stopPropagation();
    const target = profiles.find((p) => p.id === profileId);
    if (target && !canDeleteProfile(target, isAdmin)) {
      setAdminAuthTargetProfile(target);
      setShowAdminAuthModal(true);
      return;
    }
    if (profiles.length <= 1) {
      setFeedbackMsg('ไม่สามารถลบได้ เนื่องจากต้องมีโปรไฟล์อย่างน้อย 1 คน');
      setTimeout(() => setFeedbackMsg(null), 3500);
      return;
    }
    setDeleteConfirmId(profileId);
  };

  const handleConfirmDelete = (e: React.MouseEvent, profileId: string) => {
    e.stopPropagation();
    if (onDeleteProfile) {
      onDeleteProfile(profileId);
      setFeedbackMsg('ลบโปรไฟล์เรียบร้อยแล้ว');
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
    setDeleteConfirmId(null);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmId(null);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onCreateProfile(newName.trim(), newGrade, selectedAvatar, selectedAvatarBg);
    setNewName('');
    setIsCreatingProfile(false);
    soundEffects.playTap(soundVolume);
  };

  const handleSkillToggle = (subjectId: Subject) => {
    soundEffects.playTap(soundVolume);
    if (selectedSubjects.includes(subjectId)) {
      if (selectedSubjects.length === 1) return; // Keep at least one
      onSkillChange(selectedSubjects.filter((s) => s !== subjectId));
    } else {
      onSkillChange([...selectedSubjects, subjectId]);
    }
  };

  const handleSkillSelectAll = () => {
    soundEffects.playCorrect(soundVolume);
    onSkillChange(SKILLS_LIST.map((s) => s.id));
  };

  const handleSelectCore5 = () => {
    soundEffects.playCorrect(soundVolume);
    onSkillChange([...CORE_5_SKILL_IDS]);
  };

  const handleCountChange = (newCount: number) => {
    const valid = Math.max(1, Math.min(20, Math.round(newCount)));
    soundEffects.playTap(soundVolume);
    if (onChangeQuestionsPerSkill) {
      onChangeQuestionsPerSkill(valid);
    }
  };

  const isCore5Selected =
    selectedSubjects.length === 5 &&
    CORE_5_SKILL_IDS.every((s) => selectedSubjects.includes(s));

  const handleSkillSelectOnly = (subjectId: Subject) => {
    soundEffects.playTap(soundVolume);
    onSkillChange([subjectId]);
  };

  // Smart Recommendation Algorithm state (Firestore Lowest 2 Scoring Skills)
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [isLoadingRec, setIsLoadingRec] = useState<boolean>(false);
  const [recFeedback, setRecFeedback] = useState<string | null>(null);

  const fetchRecommendations = useCallback(
    async (profileId: string, profileName?: string) => {
      setIsLoadingRec(true);
      try {
        const result = await getStudentRecommendationFromFirestore(
          profileId,
          profileName,
          curriculumMode as CurriculumMode
        );
        setRecommendation(result);
      } catch (err) {
        console.warn('[StartProfileScreen] Recommendation fetch error:', err);
      } finally {
        setIsLoadingRec(false);
      }
    },
    [curriculumMode]
  );

  useEffect(() => {
    if (activeProfile?.id) {
      fetchRecommendations(activeProfile.id, activeProfile.name);
    }
  }, [activeProfile?.id, activeProfile?.name, curriculumMode, fetchRecommendations]);

  const handleSelectBothRecommendedSkills = () => {
    if (!recommendation || recommendation.recommendations.length < 2) return;
    const sub1 = recommendation.recommendations[0].subject;
    const sub2 = recommendation.recommendations[1].subject;
    const isCbe = curriculumMode === 'cbe_primary' || ['P1', 'P2', 'P3'].includes(activeProfile.grade);
    const itemNoun = isCbe ? 'สมรรถนะ' : 'ทักษะ';
    soundEffects.playCorrect(soundVolume);
    onSkillChange([sub1, sub2]);
    setRecFeedback(
      `🎯 เลือก 2 ${itemNoun}ที่ควรฝึกฝนเรียบร้อย: "${recommendation.recommendations[0].shortName}" และ "${recommendation.recommendations[1].shortName}"`
    );
    setTimeout(() => setRecFeedback(null), 3500);
  };

  const handleToggleRecommendedSkill = (subject: Subject) => {
    soundEffects.playTap(soundVolume);
    if (selectedSubjects.includes(subject)) {
      if (selectedSubjects.length === 1) return;
      onSkillChange(selectedSubjects.filter((s) => s !== subject));
    } else {
      onSkillChange([...selectedSubjects, subject]);
    }
  };

  const isBothRecommendedSelected = useMemo(() => {
    if (!recommendation || recommendation.recommendations.length < 2) return false;
    const r1 = recommendation.recommendations[0].subject;
    const r2 = recommendation.recommendations[1].subject;
    return (
      selectedSubjects.length === 2 &&
      selectedSubjects.includes(r1) &&
      selectedSubjects.includes(r2)
    );
  }, [recommendation, selectedSubjects]);

  return (
    <div
      id="start-profile-screen"
      className="w-full flex-1 flex flex-col items-center justify-start py-2.5 sm:py-4 px-2.5 sm:px-4 md:px-6 max-w-7xl mx-auto select-none gap-3 sm:gap-4"
    >
      {/* Clean Top Bar: Control mode, Calibrate, Diagnostics, Sync & Title */}
      <HomeTopBar
        effectiveMode={effectiveMode}
        onToggleControlMode={onToggleControlMode}
        onOpenHandCalibration={onOpenHandCalibration}
        onOpenDiagnostics={() => setShowDeviceDiagnostics(true)}
        isAdmin={isAdmin}
        onOpenAdminAuth={() => {
          setAdminAuthTargetProfile(null);
          setShowAdminAuthModal(true);
        }}
        onSyncProfiles={onSyncProfiles ? handleManualSync : undefined}
        isSyncingCloud={isSyncingCloud}
        curriculumMode={curriculumMode}
        onOpenCurriculumSwitch={onOpenCurriculumSwitch}
      />

      {/* 🏛️ Dual-Curriculum Primary Navigation Zone (แถบสลับหลักสูตรแบบ Segmented กระชับ สบายตา) */}
      <nav
        aria-label="เลือกหลักสูตรการเรียนรู้"
        className="w-full max-w-6xl bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-1.5 overflow-hidden box-border"
      >
        {/* Zone 1: Early Childhood (ปฐมวัย อ.1 - อ.3) */}
        <button
          type="button"
          id="btn-zone-early-childhood"
          onClick={() => {
            if (curriculumMode !== 'early_childhood') {
              soundEffects.playTap(soundVolume);
              if (onSelectCurriculumMode) {
                onSelectCurriculumMode('early_childhood', true);
              } else if (onOpenCurriculumSwitch) {
                onOpenCurriculumSwitch();
              }
            }
          }}
          className={`w-full py-2 px-3 rounded-xl transition-all cursor-pointer text-left sm:text-center flex items-center sm:justify-center gap-2 border ${
            curriculumMode === 'early_childhood'
              ? 'bg-white text-sky-950 border-sky-300 shadow-xs ring-1 ring-sky-200 font-black'
              : 'text-slate-600 border-transparent hover:bg-white/60 hover:text-slate-900 font-bold'
          }`}
        >
          <span className="text-base shrink-0">🧸</span>
          <span className="text-xs sm:text-sm truncate">๑. ปฐมวัย (อ.๑ - อ.๓)</span>
          {curriculumMode === 'early_childhood' && (
            <span className="text-[10px] font-black text-sky-600 ml-auto sm:ml-0 shrink-0">
              กำลังเลือก ✓
            </span>
          )}
        </button>

        {/* Zone 2: CBE Primary (ประถม ป.1 - ป.6) */}
        <button
          type="button"
          id="btn-zone-cbe-primary"
          onClick={() => {
            if (curriculumMode !== 'cbe_primary') {
              soundEffects.playTap(soundVolume);
              if (onSelectCurriculumMode) {
                onSelectCurriculumMode('cbe_primary', true);
              } else if (onOpenCurriculumSwitch) {
                onOpenCurriculumSwitch();
              }
            }
          }}
          className={`w-full py-2 px-3 rounded-xl transition-all cursor-pointer text-left sm:text-center flex items-center sm:justify-center gap-2 border ${
            curriculumMode === 'cbe_primary'
              ? 'bg-white text-indigo-950 border-indigo-300 shadow-xs ring-1 ring-indigo-200 font-black'
              : 'text-slate-600 border-transparent hover:bg-white/60 hover:text-slate-900 font-bold'
          }`}
        >
          <span className="text-base shrink-0">🎓</span>
          <span className="text-xs sm:text-sm truncate">๒. สมรรถนะ CBE (ป.๑ - ป.๖)</span>
          {curriculumMode === 'cbe_primary' && (
            <span className="text-[10px] font-black text-indigo-600 ml-auto sm:ml-0 shrink-0">
              กำลังเลือก ✓
            </span>
          )}
        </button>

        {/* Zone 3: Thai Phonics (การแจกลูกสะกดคำ ๑๐ หน่วย สพฐ.) */}
        <button
          type="button"
          id="btn-zone-thai-phonics"
          onClick={() => {
            if (curriculumMode !== 'thai_phonics') {
              soundEffects.playTap(soundVolume);
              if (onSelectCurriculumMode) {
                onSelectCurriculumMode('thai_phonics', true);
              } else if (onOpenCurriculumSwitch) {
                onOpenCurriculumSwitch();
              }
            }
          }}
          className={`w-full py-2 px-3 rounded-xl transition-all cursor-pointer text-left sm:text-center flex items-center sm:justify-center gap-2 border ${
            curriculumMode === 'thai_phonics'
              ? 'bg-white text-emerald-950 border-emerald-300 shadow-xs ring-1 ring-emerald-200 font-black'
              : 'text-slate-600 border-transparent hover:bg-white/60 hover:text-slate-900 font-bold'
          }`}
        >
          <span className="text-base shrink-0">📖</span>
          <span className="text-xs sm:text-sm truncate">๓. แจกลูกสะกดคำ (๑๐ หน่วย)</span>
          {curriculumMode === 'thai_phonics' && (
            <span className="text-[10px] font-black text-emerald-600 ml-auto sm:ml-0 shrink-0">
              กำลังเลือก ✓
            </span>
          )}
        </button>
      </nav>

      {/* 🧭 Header Utilities: Guided Steps indicator & Teacher / Parent Tools Toggle */}
      <div className="w-full max-w-6xl flex items-center justify-between gap-3 px-1 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            เส้นทาง 3 ขั้นตอน
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500 hidden sm:inline">ตรวจสอบผู้เรียน → เลือกสิ่งที่อยากฝึก → เริ่มเล่นทันที</span>
        </div>

        <button
          type="button"
          id="btn-toggle-teacher-tools"
          onClick={() => setShowTeacherPanel((v) => !v)}
          className={`px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
            showTeacherPanel
              ? 'bg-indigo-50 border-indigo-300 text-indigo-900 ring-1 ring-indigo-200'
              : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-700'
          }`}
          title="เครื่องมือสำหรับครูและผู้ปกครอง เช่น พิมพ์ใบงาน, ผลคะแนน, และจัดการข้อสอบ"
        >
          <span>🛠️</span>
          <span>{showTeacherPanel ? 'ซ่อนเครื่องมือครู/ผู้ปกครอง' : 'เครื่องมือคุณครู & ผู้ปกครอง'}</span>
          <span className="text-[10px] text-slate-400">{showTeacherPanel ? '▴' : '▾'}</span>
        </button>
      </div>

      {/* 2-Column Split Layout or Centered Clean Layout */}
      <div className={`w-full ${showTeacherPanel ? 'grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start' : 'max-w-6xl mx-auto flex flex-col gap-4'}`}>
        {/* ส่วนหลัก: การเรียนรู้และโปรไฟล์เด็ก */}
        <section
          aria-label="โปรไฟล์เด็กและการเลือกเกรด"
          className={`${showTeacherPanel ? 'lg:col-span-7 xl:col-span-8' : 'w-full'} flex flex-col gap-4`}
        >
          <div className="w-full bg-white rounded-3xl p-3.5 sm:p-5 md:p-6 shadow-sm border border-slate-200/90 flex flex-col gap-4">
            {/* Active Learner Summary Strip (สะอาดตา ไร้ pill แข็ง) */}
            <div className="w-full bg-slate-50/80 hover:bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 flex items-center justify-between gap-3 shadow-2xs transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                  {activeProfile.avatar || '⭐'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap text-slate-900">
                    <span className="text-sm sm:text-base font-black truncate">
                      {activeProfile.name}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-bold text-slate-700">
                      {currentGrade === 'K1'
                        ? 'อนุบาล 1'
                        : currentGrade === 'K2'
                        ? 'อนุบาล 2'
                        : currentGrade === 'K3'
                        ? 'อนุบาล 3'
                        : currentGrade === 'P1'
                        ? 'ประถมศึกษาปีที่ 1'
                        : currentGrade === 'P2'
                        ? 'ประถมศึกษาปีที่ 2'
                        : currentGrade === 'P3'
                        ? 'ประถมศึกษาปีที่ 3'
                        : currentGrade === 'P4'
                        ? 'ประถมศึกษาปีที่ 4'
                        : currentGrade === 'P5'
                        ? 'ประถมศึกษาปีที่ 5'
                        : 'ประถมศึกษาปีที่ 6'}
                    </span>
                    <span className="text-slate-300 hidden sm:inline">·</span>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {effectiveMode === 'touch' ? 'โหมดสัมผัส' : 'โหมดตรวจจับมือ (กล้อง)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                    <span className="text-amber-700 font-bold">⭐ {activeProfile.totalScore || 0} คะแนน</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-orange-700 font-bold">🔥 {activeProfile.streakDays || 0} วันต่อเนื่อง</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setActiveHomeTab((prev) => (prev === 'profiles' ? 'learn' : 'profiles'));
                }}
                className="bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-slate-200/90 shadow-2xs transition-all cursor-pointer shrink-0"
              >
                <span>👥</span>
                <span>{activeHomeTab === 'profiles' ? 'กลับหน้าเรียน' : 'สลับผู้เรียน'}</span>
              </button>
            </div>

            {/* Categorized Navigation Segmented Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 w-full overflow-x-auto text-xs sm:text-sm">
              <button
                type="button"
                id="tab-home-cards-grid"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setActiveHomeTab('cards_grid');
                }}
                className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeHomeTab === 'cards_grid'
                    ? currTheme.tabActive
                    : currTheme.tabInactive
                }`}
              >
                <span>🗂️</span>
                <span>หน้าแรก (Cards Grid)</span>
              </button>

              <button
                type="button"
                id="tab-home-learn"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setActiveHomeTab('learn');
                }}
                className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeHomeTab === 'learn'
                    ? 'bg-white text-blue-900 shadow-xs border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <span>🎮</span>
                <span>ขั้นตอนเริ่มเล่น</span>
              </button>

              <button
                type="button"
                id="tab-home-missions"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setActiveHomeTab('missions');
                }}
                className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap relative ${
                  activeHomeTab === 'missions'
                    ? 'bg-white text-emerald-900 shadow-xs border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <span>🌟</span>
                <span>ภารกิจ & กิจกรรม</span>
                {hasUnclaimedDailyReward && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping ml-0.5" />
                )}
              </button>

              <button
                type="button"
                id="tab-home-profiles"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setActiveHomeTab('profiles');
                }}
                className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeHomeTab === 'profiles'
                    ? 'bg-white text-amber-900 shadow-xs border border-amber-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <span>👥</span>
                <span>จัดการผู้เรียน</span>
              </button>
            </div>

            {/* TAB 0: 🗂️ การจัดวางองค์ประกอบแบบ Cards Grid ที่ชัดเจน 3 ส่วนหลัก */}
            {activeHomeTab === 'cards_grid' && (
              <DashboardCardsGrid
                activeProfile={activeProfile}
                currentGrade={currentGrade}
                onGradeChange={onGradeChange}
                curriculumMode={curriculumMode}
                onSelectCurriculumMode={onSelectCurriculumMode}
                onOpenCurriculumSwitch={onOpenCurriculumSwitch}
                selectedSubjects={selectedSubjects}
                onSkillChange={onSkillChange}
                questionsPerSkill={questionsPerSkill}
                onCountChange={handleCountChange}
                activeExamSet={activeExamSet}
                onOpenExamSets={onOpenExamSets}
                onClearActiveExamSet={onClearActiveExamSet}
                onStart={handleStart}
                onOpenProfiles={() => setActiveHomeTab('profiles')}
                soundVolume={soundVolume}
                effectiveMode={effectiveMode}
                voicePersona={voicePersona}
                onProfileUpdated={onProfileUpdated}
                recommendation={recommendation}
                isLoadingRec={isLoadingRec}
                recFeedback={recFeedback}
                onSelectBothRecommended={handleSelectBothRecommendedSkills}
                isBothRecommendedSelected={isBothRecommendedSelected}
                onRefreshRecommendations={() => fetchRecommendations(activeProfile.id, activeProfile.name)}
                onOpenSkillGames={onOpenSkillGames}
                onOpenThaiHandwriting={onOpenThaiHandwriting}
                onOpenEnglishHandwriting={onOpenEnglishHandwriting}
                onOpenAirWriting={() => setShowAirWritingModal(true)}
                onOpenWordBuilder={() => setShowWordBuilderModal(true)}
                onOpenPreGameStory={() => setIsPreGameStoryOpen(true)}
                onOpenOutdoorAdventure={() => setIsOutdoorAdventureOpen(true)}
                onOpenCompetencyActivities={onOpenCompetencyActivities}
                onOpenActivitiesModal={() => setIsActivitiesModalOpen(true)}
                onOpenHandTracing={() => setIsHandTracingModalOpen(true)}
                onStartWeeklyChallenge={handleStartWeeklyChallenge}
                onOpenClassReport={onOpenClassReport}
                onOpenSkillRadarReport={onOpenSkillRadarReport}
                onOpenWeeklyTrends={onOpenWeeklyTrends}
                onOpenBadges={onOpenBadges}
                onOpenTopPerformers={onOpenTopPerformers}
                onOpenWorksheets={onOpenWorksheets}
                onOpenQuestionManager={onOpenQuestionManager}
                onOpenOfficialReport={() => setShowOfficialReportModal(true)}
                onOpenHolisticReport={() => setShowHolisticReportModal(true)}
                onOpenCompetencyReport={onOpenCompetencyReport}
                onOpenDiagnostic={() => setShowDiagnosticModal(true)}
                badgeCount={activeProfile.badges?.length || 0}
                onOpenClassroomRoom={onOpenClassroomRoom}
                activeClassroomRoom={activeClassroomRoom}
              />
            )}

            {/* TAB 1: โหมดเรียนรู้ & เริ่มเล่น (3 ขั้นตอน เข้าใจง่าย สบายตา ไร้ความสับสน) */}
            {activeHomeTab === 'learn' && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-150">
                {/* 📍 ขั้นตอนที่ ๑: ตรวจสอบผู้เรียน & เลือกระดับชั้น (Step 1) */}
                <div className="bg-slate-50/90 p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
                        1
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-800">
                        ขั้นตอนที่ ๑: ผู้เรียน & เลือกระดับชั้น
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playTap(soundVolume);
                        setActiveHomeTab('profiles');
                      }}
                      className="bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-slate-200/90 shadow-2xs transition-all cursor-pointer shrink-0"
                    >
                      <span>👥</span>
                      <span>สลับผู้เรียน</span>
                    </button>
                  </div>

                  {/* Active child info & quick grade selector */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                        {activeProfile.avatar || '⭐'}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-black text-slate-900 truncate">{activeProfile.name}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <span className="text-amber-700 font-bold">⭐ {activeProfile.totalScore || 0} คะแนน</span>
                          <span>·</span>
                          <span className="text-orange-700 font-bold">🔥 {activeProfile.streakDays || 0} วันต่อเนื่อง</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Grade Selector Bar */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-slate-500 mr-1">ระดับชั้น:</span>
                      {curriculumMode === 'early_childhood' ? (
                        (['K1', 'K2', 'K3'] as Grade[]).map((grade) => (
                          <button
                            key={grade}
                            type="button"
                            onClick={() => onGradeChange(grade)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                              currentGrade === grade
                                ? 'bg-blue-600 text-white border-blue-700 shadow-2xs ring-1 ring-blue-300'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {grade === 'K1' ? 'อนุบาล 1' : grade === 'K2' ? 'อนุบาล 2' : 'อนุบาล 3'}
                          </button>
                        ))
                      ) : (
                        PRIMARY_GRADES.map((grade) => (
                          <button
                            key={grade}
                            type="button"
                            onClick={() => onGradeChange(grade)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                              currentGrade === grade
                                ? (curriculumMode === 'thai_phonics' ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs ring-1 ring-emerald-300' : 'bg-indigo-600 text-white border-indigo-700 shadow-2xs ring-1 ring-indigo-300')
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {`ป.${grade.slice(1)}`}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* 📍 ขั้นตอนที่ ๒: เลือกทักษะการเรียนรู้ (Step 2) */}
                <div className="bg-slate-50/90 p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
                        2
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-800">
                        ขั้นตอนที่ ๒: เลือกเนื้อหาและทักษะที่จะฝึกฝน
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-xl border border-slate-200">
                      เลือกแล้ว {selectedSubjects.length} {curriculumMode === 'thai_phonics' ? 'หน่วย' : curriculumMode === 'cbe_primary' ? 'สมรรถนะ' : 'ทักษะ'} ({selectedSubjects.length * questionsPerSkill} ข้อ)
                    </span>
                  </div>

                  {/* 2. การเลือกเกรด & ทักษะการเรียนรู้ (Grade Selector & Learning Skills) */}
                  <LearningConfigSection
                    currentGrade={currentGrade}
                    onGradeChange={onGradeChange}
                    selectedSubjects={selectedSubjects}
                    onSkillChange={onSkillChange}
                    questionsPerSkill={questionsPerSkill}
                    onCountChange={handleCountChange}
                    activeExamSet={activeExamSet}
                    onOpenExamSets={onOpenExamSets}
                    onClearActiveExamSet={onClearActiveExamSet}
                    recommendation={recommendation}
                    showAllSkillDetails={showAllSkillDetails}
                    onToggleSkillDetails={() => setShowAllSkillDetails((v) => !v)}
                    soundVolume={soundVolume}
                    onOpenCompetencyActivities={onOpenCompetencyActivities}
                    onOpenActivitiesModal={() => setIsActivitiesModalOpen(true)}
                    onOpenWorksheets={onOpenWorksheets}
                    onOpenThaiHandwriting={onOpenThaiHandwriting}
                    onOpenClassroomRoom={onOpenClassroomRoom}
                    onOpenAirWriting={() => setShowAirWritingModal(true)}
                    onOpenWordBuilder={() => setShowWordBuilderModal(true)}
                    onOpenHolisticReport={() => setShowHolisticReportModal(true)}
                    curriculumMode={curriculumMode}
                  />

                  {/* 3. คำแนะนำทักษะอัจฉริยะ (AI Insights แบบพับเก็บได้ เพื่อความสบายตา) */}
                  <div className="w-full bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setShowSmartAssistant((v) => !v)}
                      className="w-full p-2.5 sm:p-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base">💡</span>
                        <div className="min-w-0">
                          <span className="text-xs font-black text-slate-800">
                            คำแนะนำการเรียนรู้อัจฉริยะเฉพาะบุคคล (AI Insights)
                          </span>
                          <p className="text-[11px] text-slate-500 truncate">
                            วิเคราะห์จุดแข็งและทักษะที่ควรฝึกฝนเพิ่มเติมสำหรับ {activeProfile.name}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg shrink-0">
                        {showSmartAssistant ? 'ซ่อน ▴' : 'ดูคำแนะนำ ▾'}
                      </span>
                    </button>
                    {showSmartAssistant && (
                      <div className="p-3 pt-0 border-t border-slate-100">
                        <SmartAssistantSection
                          activeProfile={activeProfile}
                          selectedSubjects={selectedSubjects}
                          onSelectSubject={handleSelectDailyMissionSubject}
                          onStartMissionDirectly={handleStartDailyMission}
                          soundVolume={soundVolume}
                          recommendation={recommendation}
                          isLoadingRec={isLoadingRec}
                          recFeedback={recFeedback}
                          onSelectBothRecommended={handleSelectBothRecommendedSkills}
                          isBothRecommendedSelected={isBothRecommendedSelected}
                          onRefreshRecommendations={() => fetchRecommendations(activeProfile.id, activeProfile.name)}
                          curriculumMode={curriculumMode}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 📍 ขั้นตอนที่ ๓: เริ่มเล่นทันที (Step 3: Play!) */}
                <div className="bg-gradient-to-b from-blue-50/70 via-indigo-50/50 to-white p-4 sm:p-5 rounded-2xl border-2 border-blue-200/90 flex flex-col items-center gap-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
                      3
                    </span>
                    <span className="text-xs sm:text-sm font-black text-indigo-950">
                      ขั้นตอนที่ ๓: เริ่มเล่นเกมทันที!
                    </span>
                  </div>

                  <div className="w-full max-w-lg flex flex-col gap-2.5">
                    {/* Primary Big Start Button */}
                    <button
                      id="btn-start-game-main"
                      onClick={handleStart}
                      className={`w-full ${currTheme.primaryButton} font-black py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-3 active:scale-98 shadow-md hover:shadow-lg`}
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                        <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                      </div>
                      <div className="text-left leading-tight">
                        <div className="text-base sm:text-lg font-black">
                          {activeExamSet
                            ? 'เริ่มทำชุดข้อสอบ 🚀'
                            : `เริ่มเล่นเกมเลย! (${selectedSubjects.length * questionsPerSkill} ข้อ)`}
                        </div>
                        <div className="text-[11px] text-white/90 font-medium">
                          {currTheme.shortName} · เล่นสนุกและฝึกสมอง
                        </div>
                      </div>
                    </button>

                    {/* Secondary Companion Actions */}
                    <div className="grid grid-cols-2 gap-2.5 w-full">
                      <button
                        id="btn-open-pre-game-story"
                        type="button"
                        onClick={() => {
                          soundEffects.playTap(soundVolume);
                          setIsPreGameStoryOpen(true);
                        }}
                        className="w-full px-3 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-black rounded-xl sm:rounded-2xl shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98 text-xs sm:text-sm"
                        title="ฟังนิทานสั้นสร้างแรงบันดาลใจและดึงดูดความสนใจเด็กก่อนเข้าสู่บทเรียน พร้อมเสียงพากย์อัตโนมัติ"
                      >
                        <span className="text-base">📖</span>
                        <span className="truncate">นิทานก่อนเล่น AI ✨</span>
                      </button>

                      <button
                        id="btn-open-outdoor-adventure"
                        type="button"
                        onClick={() => {
                          soundEffects.playTap(soundVolume);
                          setIsOutdoorAdventureOpen(true);
                        }}
                        className="w-full px-3 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black rounded-xl sm:rounded-2xl shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98 text-xs sm:text-sm"
                        title="ภารกิจการสังเกตสิ่งแวดล้อมรอบตัวเด็ก เช่น นับจำนวนต้นไม้หรือสีดอกไม้ พร้อมบันทึกภาพถ่ายและเสียง"
                      >
                        <span className="text-base">🌿</span>
                        <span className="truncate">สำรวจธรรมชาติ 🔍</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-600 font-medium text-center">
                    พร้อมเล่น: <strong className="text-slate-900">{activeProfile.name}</strong> •{' '}
                    <span className="text-blue-700 font-bold">
                      {currentGrade === 'K1'
                        ? 'อนุบาล 1'
                        : currentGrade === 'K2'
                        ? 'อนุบาล 2'
                        : currentGrade === 'K3'
                        ? 'อนุบาล 3'
                        : `ประถม ${currentGrade.slice(1)}`}
                    </span>{' '}
                    • {selectedSubjects.length}{' '}
                    {curriculumMode === 'thai_phonics'
                      ? 'หน่วยการเรียนรู้'
                      : curriculumMode === 'cbe_primary'
                      ? 'สมรรถนะ'
                      : 'ทักษะ'}{' '}
                    ({selectedSubjects.length * questionsPerSkill} ข้อ) •{' '}
                    <span className="text-amber-800 font-bold">
                      {effectiveMode === 'touch' ? 'โหมดสัมผัส' : 'โหมดกล้อง'}
                    </span>
                  </p>
                </div>

                {/* 🎁 กิจกรรมและภารกิจพิเศษวันนี้ (Mini-Challenge & Daily Quest Highlight) */}
                <div className="w-full bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/90 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <span>🎁</span>
                      <span>ภารกิจพิเศษ & มินิชาเลนจ์วันนี้</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playTap(soundVolume);
                        setActiveHomeTab('missions');
                      }}
                      className="text-xs font-bold text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-xl border border-amber-200 shadow-2xs transition-all cursor-pointer"
                    >
                      ดูภารกิจทั้งหมด {hasUnclaimedDailyReward ? '⭐ มีรางวัล!' : '→'}
                    </button>
                  </div>

                  {/* 🎲 มินิชาเลนจ์พิเศษแบบสุ่ม (Surprise Mini-Challenge Widget) */}
                  <MiniChallengeWidget
                    activeProfile={activeProfile}
                    soundVolume={soundVolume}
                    voicePersona={voicePersona}
                    onProfileUpdated={onProfileUpdated}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: ภารกิจ & กิจกรรมพิเศษ (Missions & Challenges) */}
            {activeHomeTab === 'missions' && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-150">
                {/* 1. รางวัลล็อกอินประจำวัน (Daily Login Reward Banner) */}
                {onOpenDailyLogin && (
                  <div className="w-full">
                    <button
                      type="button"
                      id="btn-daily-login-start-screen"
                      onClick={onOpenDailyLogin}
                      className={`w-full p-3 sm:p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-98 ${
                        hasUnclaimedDailyReward
                          ? 'bg-gradient-to-r from-amber-100 via-orange-50 to-yellow-100 border-amber-400 hover:border-amber-500 animate-pulse hover:animate-none'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                      title="รางวัลล็อกอินประจำวัน: รับดาวโบนัสความสม่ำเสมอ"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center text-xl shadow-xs shrink-0">
                          🎁
                        </div>
                        <div className="text-left min-w-0 truncate">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs sm:text-sm font-black text-slate-800">
                              รางวัลล็อกอินประจำวัน (Daily Login)
                            </span>
                            {hasUnclaimedDailyReward ? (
                              <span className="text-[10px] font-black text-rose-700 bg-rose-100 px-2 py-0.2 rounded-full animate-bounce">
                                พร้อมรับดาว! ⭐
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                                รับแล้ววันนี้ ✓
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                            {hasUnclaimedDailyReward
                              ? `คลิกเพื่อเปิดกล่องของขวัญและรับดาวโบนัสสำหรับ ${activeProfile.name}`
                              : 'สะสมดาวโบนัสความสม่ำเสมอ พรุ่งนี้กลับมาใหม่นะ!'}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-1 text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200">
                        <span>เปิดดู</span>
                        <span>→</span>
                      </div>
                    </button>
                  </div>
                )}

                {/* 2. Cross-Curriculum Daily Synergy Quest Card */}
                <SynergyQuestsCard
                  onOpenAirWriting={() => setShowAirWritingModal(true)}
                  onOpenWordBuilder={() => setShowWordBuilderModal(true)}
                  onOpenHolisticReport={() => setShowHolisticReportModal(true)}
                  onOpenCompetencyActivities={onOpenCompetencyActivities}
                  onOpenColorPhonics={() => setShowColorPhonicsModal(true)}
                  onOpenVoicePhonics={() => setShowVoicePhonicsModal(true)}
                  onOpenDiagnostic={() => setShowDiagnosticModal(true)}
                  onOpenAvatarShop={() => setShowAvatarShopModal(true)}
                  onOpenOfficialReport={() => setShowOfficialReportModal(true)}
                  onOpenHomeSchool={() => setShowHomeSchoolModal(true)}
                  currentGrade={activeProfile.grade || currentGrade}
                  studentProfile={activeProfile}
                  onEarnStar={() => soundEffects.playVictory(soundVolume)}
                  soundVolume={soundVolume}
                />

                {/* 2. มินิชาเลนจ์พิเศษแบบสุ่ม (Surprise Mini-Challenge Widget) */}
                <MiniChallengeWidget
                  activeProfile={activeProfile}
                  soundVolume={soundVolume}
                  voicePersona={voicePersona}
                  onProfileUpdated={onProfileUpdated}
                />

                {/* 3. โหมดท้าทายประจำสัปดาห์ (Weekly Challenge) */}
                <WeeklyChallengeSection
                  activeProfile={activeProfile}
                  curriculumMode={curriculumMode}
                  onStartWeeklyChallenge={handleStartWeeklyChallenge}
                  soundVolume={soundVolume}
                />

                {/* 3. Outdoor Learning Adventure Launcher Card */}
                <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 rounded-2xl p-4 border-2 border-emerald-300 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white border-2 border-emerald-300 flex items-center justify-center text-2xl shadow-xs shrink-0">
                      🌿
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm font-black text-emerald-950 font-display">
                          Outdoor Learning Adventure
                        </h4>
                        <span className="bg-emerald-200 text-emerald-900 text-[10px] font-black px-2 py-0.2 rounded-full">
                          สำรวจธรรมชาติ 📸🎙️
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        ภารกิจสังเกตสิ่งแวดล้อมรอบตัว เช่น นับต้นไม้หรือสีดอกไม้ พร้อมบันทึกภาพถ่ายและเสียง
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playTap(soundVolume);
                      setIsOutdoorAdventureOpen(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    <span>เริ่มสำรวจเลย 🌿</span>
                    <span>→</span>
                  </button>
                </div>

                {/* 4. เมื่อเข้าสู่ระบบฐานสมรรถนะ ให้แสดง กิจกรรมเสริมสมรรถนะ แทน กิจกรรมพัฒนา 8 ทักษะ */}
                {curriculumMode === 'cbe_primary' || ['P1', 'P2', 'P3'].includes(currentGrade) ? (
                  <CompetencyActivitiesSection
                    currentGrade={currentGrade}
                    activeProfileName={activeProfile.name}
                    activeProfileId={activeProfile.id}
                    onStartActivityCompetency={handleStartActivitySkill}
                    onOpenFullModal={onOpenCompetencyActivities}
                    soundVolume={soundVolume}
                    voicePersona={voicePersona}
                  />
                ) : (
                  <EarlyChildhoodActivitiesSection
                    currentGrade={currentGrade}
                    activeProfileName={activeProfile.name}
                    activeProfileId={activeProfile.id}
                    onStartActivitySkill={handleStartActivitySkill}
                    soundVolume={soundVolume}
                    voicePersona={voicePersona}
                  />
                )}
              </div>
            )}

            {/* TAB 3: จัดการรายชื่อผู้เรียน (Manage Students) */}
            {activeHomeTab === 'profiles' && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-150">
                <OriginalHomeProfilesSection
                  curriculumMode={curriculumMode}
                  isAdmin={isAdmin}
                  onOpenAdminAuth={(targetProfile) => {
                    setAdminAuthTargetProfile(targetProfile || null);
                    setShowAdminAuthModal(true);
                  }}
                  onSyncProfiles={onSyncProfiles ? handleManualSync : undefined}
                  isSyncingCloud={isSyncingCloud}
                  onOpenTopPerformers={onOpenTopPerformers}
                  isCreatingProfile={isCreatingProfile}
                  onStartCreateProfile={() => setIsCreatingProfile(true)}
                  onCancelCreateProfile={() => setIsCreatingProfile(false)}
                  onCreateSubmit={handleCreateSubmit}
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  selectedGradeFilter={selectedGradeFilter}
                  onGradeFilterChange={handleGradeFilterChange}
                  sortBy={sortBy}
                  onSortByChange={setSortBy}
                  filteredProfiles={filteredProfiles}
                  paginatedProfiles={paginatedProfiles}
                  activeProfile={activeProfile}
                  onSelectProfile={(p) => {
                    onSelectProfile(p.id);
                    setActiveHomeTab('learn');
                  }}
                  onOpenStreakModal={handleOpenStreakModal}
                  onStartEditProfile={handleStartEditProfile}
                  deleteConfirmId={deleteConfirmId}
                  onTriggerDelete={handleTriggerDelete}
                  onConfirmDelete={handleConfirmDelete}
                  onCancelDelete={handleCancelDelete}
                  startIndex={startIndex}
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalPages={totalPages}
                  validPage={validPage}
                  onPageChange={setCurrentPage}
                  newName={newName}
                  onNewNameChange={setNewName}
                  newGrade={newGrade}
                  onNewGradeChange={setNewGrade}
                  selectedAvatar={selectedAvatar}
                  onSelectedAvatarChange={setSelectedAvatar}
                  selectedAvatarBg={selectedAvatarBg}
                  onSelectedAvatarBgChange={setSelectedAvatarBg}
                  feedbackMsg={feedbackMsg}
                  formatLastActive={formatLastActive}
                />
              </div>
            )}

            {/* Primary CTA when in missions or profiles tab */}
            {activeHomeTab !== 'learn' && activeHomeTab !== 'cards_grid' && (
              <div className="pt-3 border-t border-slate-100 flex flex-col items-center gap-2.5 w-full">
                <div className="w-full max-w-lg flex flex-col gap-2.5">
                  <button
                    id="btn-start-game-main-alt"
                    onClick={handleStart}
                    className={`w-full ${currTheme.primaryButton} font-black py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2.5 active:scale-98 whitespace-nowrap`}
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white ml-0.5" />
                    </div>
                    <span className="text-base sm:text-lg font-black leading-none whitespace-nowrap">
                      {activeExamSet
                        ? 'เริ่มทำชุดข้อสอบ 🚀'
                        : `เริ่มเล่นเกม (${currTheme.shortName})`}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ประวัติการเข้าใช้งานล่าสุด (แบบพับเก็บได้ สบายตา ไม่เกะกะ) */}
          <div className="w-full bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/90 shadow-2xs">
            <button
              type="button"
              id="btn-toggle-activity-history"
              onClick={() => setShowActivityHistory((v) => !v)}
              className="w-full flex items-center justify-between text-left hover:bg-slate-50 p-2 rounded-2xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">📜</span>
                <span className="text-xs sm:text-sm font-black text-slate-800">
                  ประวัติการเข้าใช้งานล่าสุด ({profiles.length} ผู้เรียน)
                </span>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl">
                {showActivityHistory ? 'ซ่อนประวัติ ▴' : 'แสดงประวัติ ▾'}
              </span>
            </button>
            {showActivityHistory && (
              <div className="pt-3 border-t border-slate-100 animate-in fade-in duration-150">
                <UserActivityHistoryPanel
                  profiles={profiles}
                  activeProfileId={activeProfile.id}
                  onSelectProfile={onSelectProfile}
                  soundVolume={soundVolume}
                  curriculumMode={curriculumMode}
                />
              </div>
            )}
          </div>
        </section>

        {/* ส่วนขวา: เครื่องมือครูและผู้ปกครอง (แสดงเมื่อผู้ใช้กดเปิดแผงเครื่องมือ) */}
        {showTeacherPanel && (
          <section
            aria-label="เครื่องมือครูและผู้ปกครอง"
            className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 lg:sticky lg:top-4 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <span>🛠️</span>
                <span>แผงเครื่องมือคุณครู & ผู้ปกครอง</span>
              </span>
              <button
                type="button"
                onClick={() => setShowTeacherPanel(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2.5 py-1 rounded-xl hover:bg-slate-100 cursor-pointer border border-slate-200"
              >
                ✕ ซ่อนแผง
              </button>
            </div>
            <TeacherParentToolsPanel
              curriculumMode={curriculumMode}
              onOpenClassroomRoom={onOpenClassroomRoom}
              activeClassroomRoom={activeClassroomRoom}
              onOpenClassReport={onOpenClassReport}
              onOpenWeeklyTrends={onOpenWeeklyTrends}
              onOpenSkillRadarReport={onOpenSkillRadarReport}
              onOpenExamSets={onOpenExamSets}
              onOpenWorksheets={onOpenWorksheets}
              onOpenQuestionManager={onOpenQuestionManager}
              onOpenSettings={onOpenSettings}
              onOpenFeedback={onOpenFeedback}
              isAdmin={isAdmin}
              onOpenAdminAuth={(targetProfile) => {
                setAdminAuthTargetProfile(targetProfile || null);
                setShowAdminAuthModal(true);
              }}
              onSyncProfiles={onSyncProfiles ? handleManualSync : undefined}
              isSyncingCloud={isSyncingCloud}
              onOpenSkillGames={onOpenSkillGames}
              onOpenBadges={onOpenBadges}
              badgeCount={activeProfile.badges?.length || 0}
              onOpenFunFacts={onOpenFunFacts}
              onOpenTopPerformers={onOpenTopPerformers}
              onOpenPreGameStory={() => setIsPreGameStoryOpen(true)}
              onOpenHandTracing={() => setIsHandTracingModalOpen(true)}
              onOpenThaiHandwriting={onOpenThaiHandwriting}
              onOpenEnglishHandwriting={onOpenEnglishHandwriting}
              onOpenCompetencyActivities={onOpenCompetencyActivities}
              onOpenCompetencyReport={onOpenCompetencyReport}
              onOpenAIQuestionSuggester={onOpenAIQuestionSuggester}
              onOpenOutdoorAdventure={() => setIsOutdoorAdventureOpen(true)}
              onOpenClassroomDiscussion={onOpenClassroomDiscussion}
              onOpenAirWriting={() => setShowAirWritingModal(true)}
              onOpenWordBuilder={() => setShowWordBuilderModal(true)}
              onOpenHolisticReport={() => setShowHolisticReportModal(true)}
              onOpenColorPhonics={() => setShowColorPhonicsModal(true)}
              onOpenVoicePhonics={() => setShowVoicePhonicsModal(true)}
              onOpenDiagnostic={() => setShowDiagnosticModal(true)}
              onOpenAvatarShop={() => setShowAvatarShopModal(true)}
              onOpenOfficialReport={() => setShowOfficialReportModal(true)}
              onOpenHomeSchool={() => setShowHomeSchoolModal(true)}
            />
          </section>
        )}
      </div>

      {/* Edit Profile Modal Dialog */}
      {editingProfile && (
        <div
          id="edit-profile-modal-overlay"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-4 pt-4 sm:pt-8 md:pt-12 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditingProfile(null);
            }
          }}
        >
          <div
            id="edit-profile-modal"
            className="bg-white rounded-3xl p-4 sm:p-6 max-w-lg w-full shadow-2xl border-2 border-amber-300 relative animate-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              id="btn-close-edit-profile-modal"
              onClick={() => setEditingProfile(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              title="ปิด"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-xl shrink-0">
                ✏️
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-800">
                  แก้ไขโปรไฟล์ผู้เล่น
                </h3>
                <p className="text-xs text-slate-500">
                  ปรับปรุงชื่อเล่น ระดับชั้น หรืออวาตาร์ตัวการ์ตูน
                </p>
              </div>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3.5">
              <div>
                <label htmlFor="input-edit-profile-name" className="block text-xs font-bold text-slate-700 mb-1">
                  ชื่อหรือชื่อเล่นของเด็ก <span className="text-rose-500">*</span>
                </label>
                <input
                  id="input-edit-profile-name"
                  type="text"
                  required
                  maxLength={30}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="เช่น น้องมินนี่, น้องกัปตัน..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ระดับชั้น
                </label>
                <div className={`grid ${(curriculumMode === 'thai_phonics' || curriculumMode === 'cbe_primary') ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-3'} gap-2`}>
                  {(curriculumMode === 'thai_phonics' || curriculumMode === 'cbe_primary'
                    ? (['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as Grade[])
                    : (['K1', 'K2', 'K3'] as Grade[])
                  ).map((g) => {
                    const isSelected = editGrade === g;
                    const label = g.startsWith('P') ? `ป.${g.slice(1)}` : g === 'K1' ? 'อนุบาล 1' : g === 'K2' ? 'อนุบาล 2' : 'อนุบาล 3';
                    return (
                      <button
                        key={g}
                        type="button"
                        id={`btn-edit-grade-${g}`}
                        onClick={() => setEditGrade(g)}
                        className={`py-2 px-2 rounded-xl text-xs font-black border transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                          isSelected
                            ? curriculumMode === 'thai_phonics'
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                              : curriculumMode === 'cbe_primary'
                              ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                              : 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>{label}</span>
                        <span className={`text-[10px] ${isSelected ? 'opacity-90' : 'opacity-70'}`}>({g})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Avatar & Color Customizer */}
              <AvatarEditor
                selectedEmoji={editAvatar}
                selectedColorId={editAvatarBg}
                onChangeEmoji={setEditAvatar}
                onChangeColor={setEditAvatarBg}
                previewName={editName || editingProfile.name}
                profile={editingProfile}
              />

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  id="btn-cancel-edit-profile"
                  onClick={() => setEditingProfile(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  id="btn-submit-edit-profile"
                  className="px-5 py-2 text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-teal-700 text-white rounded-xl shadow-md border-b-2 border-amber-700 active:translate-y-0.5 cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>บันทึกการแก้ไข</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 30-Day Learning Streak Tracker Popup Modal */}
      <StreakTrackerModal
        profile={streakModalProfile || activeProfile}
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        onStartGame={handleStart}
        soundVolume={soundVolume}
        onOpenBadges={onOpenBadges}
      />

      {/* Admin Authentication & Privilege Modal */}
      <AdminAuthModal
        isOpen={showAdminAuthModal}
        onClose={() => {
          setShowAdminAuthModal(false);
          setAdminAuthTargetProfile(null);
        }}
        currentUser={currentUser}
        targetProfileName={adminAuthTargetProfile?.name}
      />

      {/* Device Compatibility & Diagnostics Modal */}
      <DeviceCompatibilityModal
        isOpen={showDeviceDiagnostics}
        onClose={() => setShowDeviceDiagnostics(false)}
        currentControlMode={effectiveMode}
        onSelectControlMode={(mode) => {
          if (onToggleControlMode && mode !== effectiveMode) {
            onToggleControlMode();
          }
        }}
      />

      {/* Pre-Game AI Story Modal with Auto-Voice Narration */}
      <PreGameStoryModal
        isOpen={isPreGameStoryOpen}
        onClose={() => setIsPreGameStoryOpen(false)}
        onProceedToGame={() => {
          setIsPreGameStoryOpen(false);
          handleStart();
        }}
        primarySubject={selectedSubjects[0] || 'math'}
        currentGrade={activeProfile.grade || currentGrade}
        childName={activeProfile.name}
        soundVolume={soundVolume}
        curriculumMode={curriculumMode}
      />

      {/* Hand Tracing Activity Modal */}
      <HandTracingActivityModal
        isOpen={isHandTracingModalOpen}
        onClose={() => setIsHandTracingModalOpen(false)}
        currentGrade={activeProfile.grade || currentGrade}
        soundVolume={soundVolume}
      />

      {/* Outdoor Learning Adventure Modal */}
      <OutdoorLearningAdventureModal
        isOpen={isOutdoorAdventureOpen}
        onClose={() => setIsOutdoorAdventureOpen(false)}
        activeProfile={activeProfile}
        soundVolume={soundVolume}
        voicePersona={voicePersona}
        onMissionSubmitted={() => {
          if (onSyncProfiles) onSyncProfiles();
        }}
      />

      {/* 8 Skills Early Childhood Activities List Modal */}
      <EarlyChildhoodActivitiesModal
        isOpen={isActivitiesModalOpen}
        onClose={() => setIsActivitiesModalOpen(false)}
        currentGrade={activeProfile.grade || currentGrade}
        activeProfileName={activeProfile.name}
        activeProfileId={activeProfile.id}
        onStartActivitySkill={handleStartActivitySkill}
        soundVolume={soundVolume}
        voicePersona={voicePersona}
      />

      {/* ✍️ Thai Phonics Air-Writing Modal */}
      <ThaiPhonicsAirWritingModal
        isOpen={showAirWritingModal}
        onClose={() => setShowAirWritingModal(false)}
        onEarnStar={() => soundEffects.playVictory(soundVolume)}
        soundVolume={soundVolume}
      />

      {/* 🧩 Thai Phonics Word Builder EF Mini-Games Modal */}
      {showWordBuilderModal && (
        <ThaiPhonicsWordBuilderView
          onClose={() => setShowWordBuilderModal(false)}
          onEarnStar={() => {
            if (soundEffects.playVictory) soundEffects.playVictory();
          }}
          soundVolume={soundVolume}
        />
      )}

      {/* 🌟 Unified Holistic Report Modal (K1 - P6) */}
      <UnifiedHolisticReportModal
        isOpen={showHolisticReportModal}
        onClose={() => setShowHolisticReportModal(false)}
        studentProfile={activeProfile}
        currentGrade={activeProfile.grade || currentGrade}
      />

      {/* 🎨 1. Multi-Color Phonics UDL Modal */}
      <MultiColorPhonicsModal
        isOpen={showColorPhonicsModal}
        onClose={() => setShowColorPhonicsModal(false)}
        soundVolume={soundVolume}
      />

      {/* 🎙️ 2. AI Voice Phonics Check Modal */}
      <VoicePhonicsAssessmentModal
        isOpen={showVoicePhonicsModal}
        onClose={() => setShowVoicePhonicsModal(false)}
        onRewardStars={() => soundEffects.playVictory(soundVolume)}
        soundVolume={soundVolume}
      />

      {/* 🎯 3. Diagnostic & Remedial Engine Modal */}
      <DiagnosticRemedialModal
        isOpen={showDiagnosticModal}
        onClose={() => setShowDiagnosticModal(false)}
        studentName={activeProfile.name}
        onOpenWorksheets={onOpenWorksheets}
        soundVolume={soundVolume}
      />

      {/* 🌟 4. Avatar Reward Studio & Air-Writing Pen Effects */}
      <AvatarRewardStudioModal
        isOpen={showAvatarShopModal}
        onClose={() => setShowAvatarShopModal(false)}
        userStars={activeProfile.points || 120}
      />

      {/* 📄 5. Official MOE Assessment Report Modal (ปพ.๕ / วPA) */}
      <OfficialMOEReportModal
        isOpen={showOfficialReportModal}
        onClose={() => setShowOfficialReportModal(false)}
        studentName={activeProfile.name}
        gradeLevel={activeProfile.grade || currentGrade}
      />

      {/* 📱 6. Home-School Connection QR Modal */}
      <HomeSchoolConnectionModal
        isOpen={showHomeSchoolModal}
        onClose={() => setShowHomeSchoolModal(false)}
        studentName={activeProfile.name}
        gradeLevel={activeProfile.grade || currentGrade}
      />
    </div>
  );
};
