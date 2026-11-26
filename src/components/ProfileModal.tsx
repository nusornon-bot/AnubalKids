import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  UserPlus,
  Check,
  Award,
  Trash2,
  AlertTriangle,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cloud,
  RefreshCw,
  Pencil,
  Lock,
  Shield,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Palette,
  CheckCircle2,
  Trophy,
  Eye,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { ChildProfile, Grade, CurriculumMode } from '../types';
import { sortProfilesByLatest } from '../services/cloudSyncService';
import { canEditProfile, canDeleteProfile, isProfileCreatedOnThisDevice } from '../services/deviceService';
import { soundEffects } from '../services/audioService';
import { AdminAuthModal } from './AdminAuthModal';
import { AvatarEditor } from './AvatarEditor';
import {
  getAvatarColorOption,
  AVATAR_COLOR_OPTIONS,
  DISNEY_AND_MARVEL_AVATARS,
  DISNEY_AVATARS,
  MARVEL_AVATARS,
  DisneyMarvelAvatarItem,
  getAvatarUnlockStatus,
  AvatarUnlockStatus,
} from '../utils/avatarUtils';
import { getCurriculumTheme } from '../utils/curriculumTheme';

interface ProfileModalProps {
  profiles: ChildProfile[];
  activeProfileId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectProfile: (profileId: string) => void;
  onCreateProfile: (name: string, grade: Grade, avatar: string, avatarBg?: string) => void;
  onUpdateProfile?: (
    profileId: string,
    updates: {
      name: string;
      grade: Grade;
      avatar: string;
      avatarBg?: string;
      unlockedAvatars?: string[];
    }
  ) => void;
  onDeleteProfile?: (profileId: string) => void;
  onSyncProfiles?: () => Promise<void>;
  onOpenStreakModal?: (profile: ChildProfile) => void;
  currentUser?: User | null;
  isAdmin?: boolean;
  curriculumMode?: CurriculumMode;
  onSelectCurriculumMode?: (mode: CurriculumMode, rememberChoice: boolean) => void;
}

const AVATAR_OPTIONS = [
  '🐰', '🦁', '🚀', '🐼', '🦄', '🐯', '🐥', '🦖', '🐬', '🐶', '🦊', '🐨',
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

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profiles,
  activeProfileId,
  isOpen,
  onClose,
  onSelectProfile,
  onCreateProfile,
  onUpdateProfile,
  onDeleteProfile,
  onSyncProfiles,
  onOpenStreakModal,
  currentUser = null,
  isAdmin = false,
  curriculumMode = 'early_childhood',
  onSelectCurriculumMode,
}) => {
  const [modalCurriculum, setModalCurriculum] = useState<CurriculumMode>(curriculumMode);
  const currTheme = getCurriculumTheme(modalCurriculum || curriculumMode);
  const [isCreating, setIsCreating] = useState(false);
  const [editingProfile, setEditingProfile] = useState<ChildProfile | null>(null);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState<Grade>(curriculumMode === 'cbe_primary' ? 'P1' : 'K1');
  const [selectedAvatar, setSelectedAvatar] = useState('🐰');
  const [selectedAvatarBg, setSelectedAvatarBg] = useState('amber');
  const [editName, setEditName] = useState('');
  const [editGrade, setEditGrade] = useState<Grade>('K1');
  const [editAvatar, setEditAvatar] = useState('🐰');
  const [editAvatarBg, setEditAvatarBg] = useState('amber');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteFeedback, setDeleteFeedback] = useState<string | null>(null);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [showAdminAuthModal, setShowAdminAuthModal] = useState(false);
  const [adminAuthTargetProfile, setAdminAuthTargetProfile] = useState<ChildProfile | null>(null);

  // Sub-panel state: 'profiles' list vs 'avatar-selection' Disney & Marvel sub-panel
  const [activeSubPanel, setActiveSubPanel] = useState<'profiles' | 'avatar-selection'>('profiles');
  const [avatarTargetProfileId, setAvatarTargetProfileId] = useState<string>(activeProfileId);
  const [avatarCategoryFilter, setAvatarCategoryFilter] = useState<'all' | 'disney' | 'marvel'>('all');
  const [avatarLockFilter, setAvatarLockFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [avatarSearchQuery, setAvatarSearchQuery] = useState('');
  const [avatarSuccessToast, setAvatarSuccessToast] = useState<string | null>(null);
  const [selectedLockedChar, setSelectedLockedChar] = useState<{
    char: DisneyMarvelAvatarItem;
    status: AvatarUnlockStatus;
  } | null>(null);
  const [previewAvatarItem, setPreviewAvatarItem] = useState<{
    emoji: string;
    name: string;
    category?: 'disney' | 'marvel';
  } | null>(null);

  // Exciting Avatar Animations: Bounce, Slide, and Unlock Celebrations
  const [avatarAnimationMode, setAvatarAnimationMode] = useState<'bounce' | 'slide' | 'combo'>('bounce');
  const [animatingAvatar, setAnimatingAvatar] = useState<{
    emoji: string;
    type: 'bounce' | 'slide';
    key: number;
  } | null>(null);
  const [unlockCelebrationChar, setUnlockCelebrationChar] = useState<{
    char: DisneyMarvelAvatarItem;
    key: number;
  } | null>(null);
  const [previewAnimType, setPreviewAnimType] = useState<'bounce' | 'slide'>('bounce');
  const [previewAnimKey, setPreviewAnimKey] = useState<number>(0);

  // Target profile for Avatar Selection sub-panel
  const currentTargetProfile = useMemo(() => {
    return (
      profiles.find((p) => p.id === avatarTargetProfileId) ||
      profiles.find((p) => p.id === activeProfileId) ||
      profiles[0]
    );
  }, [profiles, avatarTargetProfileId, activeProfileId]);

  // Unlock stats for current target profile
  const unlockStats = useMemo(() => {
    let unlocked = 0;
    for (const c of DISNEY_AND_MARVEL_AVATARS) {
      if (getAvatarUnlockStatus(c.emoji, currentTargetProfile).unlocked) {
        unlocked++;
      }
    }
    const total = DISNEY_AND_MARVEL_AVATARS.length;
    return {
      unlocked,
      locked: total - unlocked,
      total,
      percent: Math.round((unlocked / total) * 100),
    };
  }, [currentTargetProfile]);

  // Filtered characters for Avatar Selection grid
  const displayedCharacters = useMemo(() => {
    let list = DISNEY_AND_MARVEL_AVATARS;
    if (avatarCategoryFilter === 'disney') {
      list = list.filter((c) => c.category === 'disney');
    } else if (avatarCategoryFilter === 'marvel') {
      list = list.filter((c) => c.category === 'marvel');
    }

    if (avatarLockFilter === 'unlocked') {
      list = list.filter(
        (c) => getAvatarUnlockStatus(c.emoji, currentTargetProfile).unlocked
      );
    } else if (avatarLockFilter === 'locked') {
      list = list.filter(
        (c) => !getAvatarUnlockStatus(c.emoji, currentTargetProfile).unlocked
      );
    }

    const q = avatarSearchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) => c.name.toLowerCase().includes(q) || c.emoji.includes(q)
      );
    }
    return list;
  }, [avatarCategoryFilter, avatarLockFilter, avatarSearchQuery, currentTargetProfile]);

  const triggerAvatarAnimation = (emoji: string, forceType?: 'bounce' | 'slide') => {
    let animType: 'bounce' | 'slide' = 'bounce';
    if (forceType) {
      animType = forceType;
    } else if (avatarAnimationMode === 'combo') {
      animType = Math.random() > 0.5 ? 'bounce' : 'slide';
    } else {
      animType = avatarAnimationMode;
    }
    setAnimatingAvatar({ emoji, type: animType, key: Date.now() });
  };

  const handleSelectCharacter = (
    character: DisneyMarvelAvatarItem,
    targetProfile: ChildProfile
  ) => {
    if (!canEditProfile(targetProfile, isAdmin)) {
      setAdminAuthTargetProfile(targetProfile);
      setShowAdminAuthModal(true);
      return;
    }

    const unlockStatus = getAvatarUnlockStatus(character.emoji, targetProfile);
    if (!unlockStatus.unlocked) {
      try {
        soundEffects.playIncorrect(0.6);
      } catch {}
      setSelectedLockedChar({ char: character, status: unlockStatus });
      return;
    }

    try {
      soundEffects.playVictory(0.65);
    } catch {}

    try {
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.55 },
      });
    } catch {}

    // Choose animation type and trigger exciting bounce/slide
    let chosenType: 'bounce' | 'slide' = 'bounce';
    if (avatarAnimationMode === 'combo') {
      chosenType = Math.random() > 0.5 ? 'bounce' : 'slide';
    } else {
      chosenType = avatarAnimationMode;
    }
    setAnimatingAvatar({ emoji: character.emoji, type: chosenType, key: Date.now() });

    const recommendedColor =
      targetProfile.avatarBg && targetProfile.avatarBg !== 'amber'
        ? targetProfile.avatarBg
        : character.category === 'marvel'
        ? 'marvel_red'
        : 'disney_gold';

    if (onUpdateProfile) {
      onUpdateProfile(targetProfile.id, {
        name: targetProfile.name,
        grade: targetProfile.grade,
        avatar: character.emoji,
        avatarBg: recommendedColor,
      });
    }

    const effectBadge = chosenType === 'bounce' ? '🦘 เด้งดึ๋ง!' : '🚀 เลื่อนสไลด์!';
    setAvatarSuccessToast(
      `${effectBadge} สลับอวาตาร์ของ "${targetProfile.name}" เป็น "${character.name}" สำเร็จแล้ว! ✨`
    );
    setTimeout(() => setAvatarSuccessToast(null), 3500);
  };

  const handleUnlockCharacter = (
    character: DisneyMarvelAvatarItem,
    targetProfile: ChildProfile,
    autoEquip: boolean = true
  ) => {
    if (!canEditProfile(targetProfile, isAdmin)) {
      setAdminAuthTargetProfile(targetProfile);
      setShowAdminAuthModal(true);
      return;
    }

    const currentUnlocked = targetProfile.unlockedAvatars || [];
    const updatedUnlocked = Array.from(new Set([...currentUnlocked, character.emoji]));

    try {
      soundEffects.playVictory(0.9);
    } catch {}

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.45 },
      });
    } catch {}

    // Close locked details modal
    setSelectedLockedChar(null);

    // Launch Grand Unlock Celebration Modal
    setUnlockCelebrationChar({ char: character, key: Date.now() });

    const recommendedColor =
      targetProfile.avatarBg && targetProfile.avatarBg !== 'amber'
        ? targetProfile.avatarBg
        : character.category === 'marvel'
        ? 'marvel_red'
        : 'disney_gold';

    if (onUpdateProfile) {
      onUpdateProfile(targetProfile.id, {
        name: targetProfile.name,
        grade: targetProfile.grade,
        avatar: autoEquip ? character.emoji : targetProfile.avatar,
        avatarBg: autoEquip ? recommendedColor : targetProfile.avatarBg,
        unlockedAvatars: updatedUnlocked,
      });
    }

    // Trigger triumphant bounce animation on the unlocked avatar
    triggerAvatarAnimation(character.emoji, 'bounce');
  };

  const handleSelectAvatarBg = (colorId: string, targetProfile: ChildProfile) => {
    if (!canEditProfile(targetProfile, isAdmin)) {
      setAdminAuthTargetProfile(targetProfile);
      setShowAdminAuthModal(true);
      return;
    }
    try {
      soundEffects.playTap(0.7);
    } catch {}
    if (onUpdateProfile) {
      onUpdateProfile(targetProfile.id, {
        name: targetProfile.name,
        grade: targetProfile.grade,
        avatar: targetProfile.avatar,
        avatarBg: colorId,
      });
    }
  };

  // Search, Filter & Pagination states (9 profiles per page, sorted by latest)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'ALL' | Grade | 'PRIMARY'>('ALL');
  const [sortBy, setSortBy] = useState<'latest' | 'score' | 'name'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Sync with prop when curriculumMode changes
  React.useEffect(() => {
    if (curriculumMode) {
      setModalCurriculum(curriculumMode);
      setNewGrade(curriculumMode === 'cbe_primary' ? 'P1' : 'K1');
    }
  }, [curriculumMode]);

  // Filter and sort profiles with strict curriculum separation
  const filteredProfiles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = profiles.filter((p) => {
      // 1. Strict Curriculum System Segregation
      if (modalCurriculum === 'cbe_primary') {
        if (!['P1', 'P2', 'P3'].includes(p.grade)) return false;
      } else if (modalCurriculum === 'thai_phonics') {
        if (!['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(p.grade)) return false;
      } else if (modalCurriculum === 'early_childhood') {
        if (!['K1', 'K2', 'K3'].includes(p.grade)) return false;
      }

      // 2. Grade filter
      if (selectedGradeFilter !== 'ALL') {
        if (selectedGradeFilter === 'PRIMARY') {
          if (!p.grade.startsWith('P')) return false;
        } else if (p.grade !== selectedGradeFilter) {
          return false;
        }
      }

      // Search term
      if (q) {
        const nameMatch = (p.name || '').toLowerCase().includes(q);
        const gradeStr = (p.grade || '').toLowerCase();
        const gradeMatch =
          gradeStr.includes(q) ||
          (q.includes('1') && (gradeStr === 'k1' || gradeStr === 'p1')) ||
          (q.includes('2') && (gradeStr === 'k2' || gradeStr === 'p2')) ||
          (q.includes('3') && (gradeStr === 'k3' || gradeStr === 'p3')) ||
          (q.includes('4') && gradeStr === 'p4') ||
          (q.includes('5') && gradeStr === 'p5') ||
          (q.includes('6') && gradeStr === 'p6') ||
          (q.includes('อนุบาล') && gradeStr.startsWith('k')) ||
          (q.includes('อ.') && gradeStr.startsWith('k')) ||
          (q.includes('ประถม') && gradeStr.startsWith('p')) ||
          (q.includes('ป.') && gradeStr.startsWith('p'));
        const idMatch = (p.id || '').toLowerCase().includes(q);
        return nameMatch || gradeMatch || idMatch;
      }
      return true;
    });

    // Default sorting: Latest
    if (sortBy === 'latest') {
      list = sortProfilesByLatest(list);
    } else if (sortBy === 'score') {
      list = [...list].sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => (a.name || '').localeCompare(b.name || '', 'th'));
    }

    return list;
  }, [profiles, searchQuery, selectedGradeFilter, sortBy, modalCurriculum]);

  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / ITEMS_PER_PAGE));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (!isOpen) return null;

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
    setDeleteFeedback('กำลังซิงค์โปรไฟล์กับคลาวด์...');

    const timer = setTimeout(() => {
      setIsSyncingCloud(false);
      setDeleteFeedback('ซิงค์โปรไฟล์เรียบร้อยแล้ว ☁️✨');
      setTimeout(() => setDeleteFeedback(null), 2500);
    }, 4500);

    try {
      await onSyncProfiles();
      clearTimeout(timer);
      setDeleteFeedback('ซิงค์โปรไฟล์สำเร็จ! ☁️✨');
      setTimeout(() => setDeleteFeedback(null), 2500);
    } catch {
      clearTimeout(timer);
      setDeleteFeedback('บันทึกในเครื่องเรียบร้อยแล้ว');
      setTimeout(() => setDeleteFeedback(null), 2500);
    } finally {
      setIsSyncingCloud(false);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onCreateProfile(newName, newGrade, selectedAvatar, selectedAvatarBg);
    setNewName('');
    setSelectedAvatar('🐰');
    setSelectedAvatarBg('amber');
    setIsCreating(false);
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
      setDeleteFeedback('ไม่สามารถลบได้ เนื่องจากต้องมีโปรไฟล์อย่างน้อย 1 คน');
      setTimeout(() => setDeleteFeedback(null), 3500);
      return;
    }
    setDeleteConfirmId(profileId);
  };

  const handleConfirmDelete = (e: React.MouseEvent, profileId: string) => {
    e.stopPropagation();
    if (onDeleteProfile) {
      onDeleteProfile(profileId);
      setDeleteFeedback('ลบโปรไฟล์เรียบร้อยแล้ว');
      setTimeout(() => setDeleteFeedback(null), 3000);
    }
    setDeleteConfirmId(null);
  };

  const handleStartEdit = (e: React.MouseEvent, profile: ChildProfile) => {
    e.stopPropagation();
    if (!canEditProfile(profile, isAdmin)) {
      setAdminAuthTargetProfile(profile);
      setShowAdminAuthModal(true);
      return;
    }
    setEditingProfile(profile);
    setEditName(profile.name);
    setEditGrade(profile.grade);
    setEditAvatar(profile.avatar || '🐰');
    setEditAvatarBg(profile.avatarBg || 'amber');
    setIsCreating(false);
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
    setDeleteFeedback(`แก้ไขโปรไฟล์ "${trimmed}" เรียบร้อยแล้ว ✨`);
    setTimeout(() => setDeleteFeedback(null), 3500);
    setEditingProfile(null);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmId(null);
  };

  if (!isOpen) return null;

  return (
    <div
      id="profile-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3"
    >
      <div className={`bg-white rounded-3xl shadow-2xl max-w-4xl w-full border-4 ${currTheme.modalBorder} ring-2 ${currTheme.modalRing} overflow-hidden max-h-[92vh] flex flex-col`}>
        {/* Header */}
        <div className={`${currTheme.modalHeaderBg} p-3.5 sm:p-4 flex items-center justify-between text-white transition-colors`}>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl">👥</span>
            <div>
              <h2 className="text-base sm:text-lg font-black font-display">
                โปรไฟล์เด็ก ({currTheme.shortName} · ห้องเรียน / ที่บ้าน)
              </h2>
              <div className={`flex items-center gap-2 text-xs ${currTheme.modalHeaderSubtext} font-medium`}>
                <span>แสดง 9 คน/หน้า เรียงตามลำดับล่าสุด</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-100 font-bold">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  ซิงค์อัตโนมัติ Cloud
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {isAdmin ? (
              <button
                type="button"
                onClick={() => {
                  setAdminAuthTargetProfile(null);
                  setShowAdminAuthModal(true);
                }}
                className="flex items-center gap-1 text-[11px] font-black bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-xl cursor-pointer"
                title="สิทธิ์ผู้ดูแลระบบ: แก้ไขโปรไฟล์ได้ทุกเครื่อง"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ผู้ดูแลระบบ</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAdminAuthTargetProfile(null);
                  setShowAdminAuthModal(true);
                }}
                className="flex items-center gap-1 text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-xl cursor-pointer"
                title="เข้าสู่ระบบผู้ดูแลระบบเพื่อแก้ไขโปรไฟล์ข้ามเครื่อง"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">โหมดผู้ดูแล</span>
              </button>
            )}
            {onSyncProfiles && (
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncingCloud}
                title="ซิงค์โปรไฟล์กับฐานข้อมูลคลาวด์"
                className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncingCloud ? 'animate-spin' : ''}`} />
              </button>
            )}
            <button
              id="btn-close-profile-modal"
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-panel Navigation Bar: Profiles vs Avatar Selection */}
        <div className="bg-amber-500/10 border-b border-amber-200/80 px-3.5 sm:px-5 py-2 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 p-1 bg-white/90 rounded-2xl border border-amber-200 shadow-2xs">
            <button
              type="button"
              id="tab-profiles-list"
              onClick={() => {
                setActiveSubPanel('profiles');
                setIsCreating(false);
                setEditingProfile(null);
                try {
                  soundEffects.playTap(0.5);
                } catch {}
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubPanel === 'profiles'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>👥</span>
              <span>รายชื่อโปรไฟล์</span>
              <span className="text-[10px] opacity-80">({profiles.length})</span>
            </button>
            <button
              type="button"
              id="tab-avatar-selection"
              onClick={() => {
                setActiveSubPanel('avatar-selection');
                setIsCreating(false);
                setEditingProfile(null);
                try {
                  soundEffects.playTap(0.5);
                } catch {}
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer relative ${
                activeSubPanel === 'avatar-selection'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-xs'
                  : 'text-slate-700 hover:text-amber-900 hover:bg-amber-100/50'
              }`}
            >
              <span className="text-sm">🏰🦸</span>
              <span>เลือกอวาตาร์ดิสนีย์ & มาร์เวล</span>
              <span className="text-[10px] font-black bg-rose-500 text-white px-1.5 py-0.2 rounded-full uppercase tracking-wider animate-pulse">
                ใหม่!
              </span>
            </button>
          </div>

          {currentTargetProfile && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white/80 px-2.5 py-1 rounded-xl border border-amber-200/70">
              <span className="text-slate-400">โปรไฟล์ที่กำลังเลือก:</span>
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <span>{currentTargetProfile.avatar}</span>
                <span>{currentTargetProfile.name}</span>
              </span>
            </div>
          )}
        </div>

        {/* Profiles List or Create Form */}
        <div className="p-3.5 sm:p-5 overflow-y-auto flex-1 bg-slate-50">
          {deleteFeedback && (
            <div className="mb-3 p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{deleteFeedback}</span>
            </div>
          )}

          {activeSubPanel === 'avatar-selection' ? (
            /* Avatar Selection Sub-panel */
            <div className="space-y-4">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-3.5 sm:p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-xs rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    🏰🦸
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black font-display tracking-tight">
                        Avatar Selection (เลือกอวาตาร์ดิสนีย์ & มาร์เวล)
                      </h3>
                      <span className="text-[10px] bg-white/30 text-white font-extrabold px-2 py-0.5 rounded-full">
                        38 ตัวละคร
                      </span>
                    </div>
                    <p className="text-xs text-amber-100 font-medium">
                      แตะที่ตัวการ์ตูนดิสนีย์หรือซูเปอร์ฮีโร่มาร์เวลเพื่อเปลี่ยนอวาตาร์ให้โปรไฟล์ได้ทันที 1-คลิก
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="btn-back-to-profiles-list"
                  onClick={() => {
                    setActiveSubPanel('profiles');
                    try {
                      soundEffects.playTap(0.5);
                    } catch {}
                  }}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 active:scale-95 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>กลับหน้ารายชื่อ</span>
                </button>
              </div>

              {/* Success Feedback Toast */}
              {avatarSuccessToast && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs sm:text-sm font-bold flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-200 shrink-0" />
                    <span>{avatarSuccessToast}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAvatarSuccessToast(null)}
                    className="text-white/80 hover:text-white p-1 rounded-lg cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Target Profile Switcher & Live Avatar Preview */}
              {currentTargetProfile && (
                <div className="bg-white p-3.5 rounded-2xl border-2 border-amber-300 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Live Avatar Preview Box & Profile Info */}
                    <div className="flex items-center gap-3">
                      {(() => {
                        const colorCfg = getAvatarColorOption(currentTargetProfile.avatarBg);
                        const isCurrentlyAnimating = animatingAvatar?.emoji === currentTargetProfile.avatar;
                        const animClass = isCurrentlyAnimating
                          ? animatingAvatar.type === 'slide'
                            ? 'animate-avatar-slide'
                            : 'animate-avatar-bounce'
                          : '';

                        return (
                          <div className="relative shrink-0">
                            {/* Expanding Ripple Wave when animated */}
                            {isCurrentlyAnimating && (
                              <div
                                key={`ripple-${animatingAvatar.key}`}
                                className="absolute inset-0 rounded-2xl border-4 border-amber-400 animate-avatar-ripple pointer-events-none"
                              />
                            )}

                            {/* Floating Sparkles when animated */}
                            {isCurrentlyAnimating && (
                              <div
                                key={`sparkles-${animatingAvatar.key}`}
                                className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none z-20"
                              >
                                <span className="text-sm animate-avatar-sparkle">✨</span>
                                <span className="text-xs animate-avatar-sparkle [animation-delay:100ms]">⭐</span>
                                <span className="text-sm animate-avatar-sparkle [animation-delay:200ms]">🎉</span>
                              </div>
                            )}

                            <div
                              id="live-avatar-preview-box"
                              onClick={() => {
                                const matched = DISNEY_AND_MARVEL_AVATARS.find((a) => a.emoji === currentTargetProfile.avatar);
                                setPreviewAvatarItem({
                                  emoji: currentTargetProfile.avatar,
                                  name: matched ? matched.name : currentTargetProfile.name,
                                  category: matched?.category,
                                });
                                triggerAvatarAnimation(currentTargetProfile.avatar);
                                try {
                                  soundEffects.playVictory(0.5);
                                } catch {}
                              }}
                              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${colorCfg.bgClass} ${colorCfg.borderClass} border-2 flex items-center justify-center text-3xl sm:text-4xl shadow-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer relative group shrink-0 select-none ${
                                isCurrentlyAnimating ? 'ring-4 ring-amber-400 shadow-lg' : ''
                              }`}
                              title="คลิกเพื่อดูตัวอย่างอวาตาร์แบบเต็ม หรือแตะเพื่อทดสอบเอฟเฟกต์เด้ง/สไลด์"
                            >
                              <span
                                key={`live-avatar-icon-${currentTargetProfile.avatar}-${animatingAvatar?.key || 0}`}
                                className={`inline-block ${animClass}`}
                              >
                                {currentTargetProfile.avatar}
                              </span>
                              <div className="absolute inset-0 bg-black/25 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Eye className="w-5 h-5 text-white drop-shadow" />
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>ภาพตัวอย่างอวาตาร์ (Avatar Preview)</span>
                          {/* Live Animation Trigger Pill */}
                          <button
                            type="button"
                            onClick={() => {
                              triggerAvatarAnimation(currentTargetProfile.avatar);
                              try {
                                soundEffects.playVictory(0.5);
                              } catch {}
                            }}
                            className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-all cursor-pointer flex items-center gap-0.5 active:scale-95"
                            title="แตะเพื่อเล่นเอฟเฟกต์อนิเมชั่นอวาตาร์"
                          >
                            <span>{avatarAnimationMode === 'slide' ? '🚀 สไลด์' : '🦘 เด้ง'}</span>
                          </button>
                        </div>
                        <div className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                          <span>{currentTargetProfile.name}</span>
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            {currentTargetProfile.grade === 'K1'
                              ? 'อนุบาล 1'
                              : currentTargetProfile.grade === 'K2'
                              ? 'อนุบาล 2'
                              : 'อนุบาล 3'}
                          </span>
                          {currentTargetProfile.id === activeProfileId && (
                            <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                              ผู้เล่นหลัก
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          สีพื้นหลัง: <strong className="text-slate-700 font-bold">{getAvatarColorOption(currentTargetProfile.avatarBg).name}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                      {/* Direct Preview Button */}
                      <button
                        type="button"
                        id="btn-preview-avatar-main"
                        onClick={() => {
                          const matched = DISNEY_AND_MARVEL_AVATARS.find((a) => a.emoji === currentTargetProfile.avatar);
                          setPreviewAvatarItem({
                            emoji: currentTargetProfile.avatar,
                            name: matched ? matched.name : currentTargetProfile.name,
                            category: matched?.category,
                          });
                          try {
                            soundEffects.playTap(0.6);
                          } catch {}
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
                        title="เปิดดูตัวอย่างหน้าจออวาตาร์แบบเต็ม (Avatar Preview Modal)"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>ดูตัวอย่าง (Preview)</span>
                      </button>

                      {/* Quick Profile Switcher (if multiple profiles exist) */}
                      {profiles.length > 1 && (
                        <div className="flex items-center gap-1 overflow-x-auto">
                          <span className="text-[10px] font-bold text-slate-500 shrink-0">เด็ก:</span>
                          {profiles.map((p) => {
                            const isSelected = p.id === currentTargetProfile.id;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                id={`btn-subpanel-select-target-${p.id}`}
                                onClick={() => {
                                  setAvatarTargetProfileId(p.id);
                                  try {
                                    soundEffects.playTap(0.5);
                                  } catch {}
                                }}
                                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-amber-400 text-amber-950 shadow-2xs font-black'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                <span>{p.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Background Color Palette */}
                  <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Palette className="w-3.5 h-3.5 text-amber-600" />
                      <span>สีพื้นหลังอวาตาร์:</span>
                      <span className="text-[11px] font-normal text-slate-400">
                        ({getAvatarColorOption(currentTargetProfile.avatarBg).name})
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {AVATAR_COLOR_OPTIONS.map((col) => {
                        const isColSelected = col.id === (currentTargetProfile.avatarBg || 'amber');
                        return (
                          <button
                            key={col.id}
                            type="button"
                            id={`btn-avatar-subpanel-color-${col.id}`}
                            onClick={() => handleSelectAvatarBg(col.id, currentTargetProfile)}
                            title={col.name}
                            className={`w-6 h-6 rounded-lg ${col.bgClass} ${col.borderClass} border-2 flex items-center justify-center transition-all cursor-pointer ${
                              isColSelected
                                ? 'ring-2 ring-amber-500 scale-110 shadow-xs'
                                : 'hover:scale-105 opacity-80 hover:opacity-100'
                            }`}
                          >
                            {isColSelected && <Check className="w-3 h-3 text-slate-800 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Unlock Progress Banner */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-base shadow-2xs shrink-0">
                    🏆
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <span>ความคืบหน้าการปลดล็อกอวาตาร์</span>
                      <span className="text-[11px] bg-amber-200/90 text-amber-950 px-2 py-0.2 rounded-full font-bold">
                        {unlockStats.unlocked} / {unlockStats.total} ตัว ({unlockStats.percent}%)
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      คะแนนสะสมของ {currentTargetProfile.name}:{' '}
                      <strong className="text-amber-800 font-bold">
                        {currentTargetProfile.totalScore.toLocaleString()}
                      </strong>{' '}
                      คะแนน • พิชิตแล้ว{' '}
                      <strong className="text-orange-700 font-bold">
                        {currentTargetProfile.badges?.length || 0}
                      </strong>{' '}
                      เหรียญตรา
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-48 flex flex-col gap-1 shrink-0">
                  <div className="w-full bg-amber-200/60 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${unlockStats.percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Category & Lock Filter Pills + Animation Effect Switcher + Search Input */}
              <div className="bg-white p-2.5 rounded-2xl border border-slate-200 flex flex-col gap-2">
                {/* Animation Mode Switcher Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/70 border border-amber-200">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-950">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>เอฟเฟกต์อนิเมชั่นเมื่อเลือก/ปลดล็อก:</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      id="btn-anim-mode-bounce"
                      onClick={() => {
                        setAvatarAnimationMode('bounce');
                        triggerAvatarAnimation(currentTargetProfile.avatar, 'bounce');
                        try {
                          soundEffects.playVictory(0.5);
                        } catch {}
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                        avatarAnimationMode === 'bounce'
                          ? 'bg-amber-500 text-white shadow-xs scale-102 ring-1 ring-amber-600'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-100'
                      }`}
                      title="อนิเมชั่นเด้งดึ๋งตื่นเต้น (Bounce Effect)"
                    >
                      <span>🦘 เด้งดึ๋ง</span>
                    </button>

                    <button
                      type="button"
                      id="btn-anim-mode-slide"
                      onClick={() => {
                        setAvatarAnimationMode('slide');
                        triggerAvatarAnimation(currentTargetProfile.avatar, 'slide');
                        try {
                          soundEffects.playVictory(0.5);
                        } catch {}
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                        avatarAnimationMode === 'slide'
                          ? 'bg-amber-500 text-white shadow-xs scale-102 ring-1 ring-amber-600'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-100'
                      }`}
                      title="อนิเมชั่นเลื่อนสไลด์ตื่นเต้น (Slide In Effect)"
                    >
                      <span>🚀 เลื่อนสไลด์</span>
                    </button>

                    <button
                      type="button"
                      id="btn-anim-mode-combo"
                      onClick={() => {
                        setAvatarAnimationMode('combo');
                        triggerAvatarAnimation(
                          currentTargetProfile.avatar,
                          Math.random() > 0.5 ? 'bounce' : 'slide'
                        );
                        try {
                          soundEffects.playVictory(0.5);
                        } catch {}
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                        avatarAnimationMode === 'combo'
                          ? 'bg-amber-500 text-white shadow-xs scale-102 ring-1 ring-amber-600'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-100'
                      }`}
                      title="สลับทั้งเด้งและสไลด์แบบสุ่ม (Combo / Random)"
                    >
                      <span>✨ สลับคู่ (Combo)</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    <button
                      type="button"
                      id="btn-filter-avatar-all"
                      onClick={() => {
                        setAvatarCategoryFilter('all');
                        try {
                          soundEffects.playTap(0.5);
                        } catch {}
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        avatarCategoryFilter === 'all'
                          ? 'bg-amber-400 text-amber-950 shadow-2xs ring-1 ring-amber-500'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>🌟 ทั้งหมด</span>
                      <span className="text-[10px] opacity-75">({DISNEY_AND_MARVEL_AVATARS.length})</span>
                    </button>

                    <button
                      type="button"
                      id="btn-filter-avatar-disney"
                      onClick={() => {
                        setAvatarCategoryFilter('disney');
                        try {
                          soundEffects.playTap(0.5);
                        } catch {}
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        avatarCategoryFilter === 'disney'
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 shadow-2xs ring-1 ring-amber-500'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>🏰 นิทานดิสนีย์</span>
                      <span className="text-[10px] font-black bg-amber-500/20 text-amber-900 px-1.5 py-0.2 rounded-full">
                        {DISNEY_AVATARS.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      id="btn-filter-avatar-marvel"
                      onClick={() => {
                        setAvatarCategoryFilter('marvel');
                        try {
                          soundEffects.playTap(0.5);
                        } catch {}
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        avatarCategoryFilter === 'marvel'
                          ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-2xs ring-1 ring-red-400'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>🦸‍♂️ ฮีโร่มาร์เวล</span>
                      <span className="text-[10px] font-black bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-full">
                        {MARVEL_AVATARS.length}
                      </span>
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-56">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="input-search-avatar-grid"
                      type="text"
                      value={avatarSearchQuery}
                      onChange={(e) => setAvatarSearchQuery(e.target.value)}
                      placeholder="ค้นหา เช่น สไปเดอร์, เอลซ่า..."
                      className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    {avatarSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setAvatarSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub-Filter: Lock Status Filter */}
                <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-100 overflow-x-auto text-xs">
                  <span className="text-[11px] font-bold text-slate-400 shrink-0">สถานะ:</span>
                  <button
                    type="button"
                    onClick={() => setAvatarLockFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                      avatarLockFilter === 'all'
                        ? 'bg-slate-800 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ทั้งหมด
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarLockFilter('unlocked')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                      avatarLockFilter === 'unlocked'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <span>✨ ปลดล็อกแล้ว</span>
                    <span className="text-[10px] opacity-80">({unlockStats.unlocked})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarLockFilter('locked')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                      avatarLockFilter === 'locked'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    <Lock className="w-2.5 h-2.5" />
                    <span>ยังล็อคอยู่</span>
                    <span className="text-[10px] opacity-80">({unlockStats.locked})</span>
                  </button>
                </div>
              </div>

              {/* Grid of Disney & Marvel Character Cards */}
              {displayedCharacters.length === 0 ? (
                <div className="py-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                  <div className="text-3xl mb-1">🔍</div>
                  <p className="text-sm font-black text-slate-700">ไม่พบตัวละครที่ตรงกับเงื่อนไข</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ลองเปลี่ยนคำค้นหา หรือเลือกตัวกรองสถานะเป็น "ทั้งหมด"
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-[46vh] overflow-y-auto p-1">
                  {displayedCharacters.map((char) => {
                    const isCurrent = currentTargetProfile?.avatar === char.emoji;
                    const isDisney = char.category === 'disney';
                    const unlockStatus = getAvatarUnlockStatus(char.emoji, currentTargetProfile);
                    const isLocked = !unlockStatus.unlocked;
                    const isCurrentlyAnimating = animatingAvatar?.emoji === char.emoji;
                    const cardAnimClass = isCurrentlyAnimating
                      ? animatingAvatar.type === 'slide'
                        ? 'animate-avatar-slide'
                        : 'animate-avatar-bounce'
                      : '';

                    return (
                      <button
                        key={`${char.category}-${char.emoji}-${char.name}`}
                        type="button"
                        id={`btn-select-avatar-${char.category}-${char.emoji}`}
                        onClick={() => {
                          if (currentTargetProfile) {
                            handleSelectCharacter(char, currentTargetProfile);
                          }
                        }}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 text-center group relative ${
                          isCurrentlyAnimating
                            ? 'bg-gradient-to-b from-amber-100 to-orange-100 border-amber-500 ring-4 ring-amber-400 shadow-lg scale-105 z-10'
                            : isCurrent
                            ? 'bg-gradient-to-b from-amber-50 to-orange-50 border-amber-500 ring-2 ring-amber-400 shadow-md scale-102'
                            : isLocked
                            ? 'bg-slate-50/90 border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 opacity-75 hover:opacity-95'
                            : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 hover:shadow-xs hover:scale-102'
                        }`}
                      >
                        {/* Active Badge */}
                        {isCurrent && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs z-10 animate-pulse">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                            <span>ใช้อยู่</span>
                          </div>
                        )}

                        {/* Lock Badge if locked */}
                        {isLocked && !isCurrent && (
                          <div className="absolute -top-2 -right-2 bg-slate-800 text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs z-10">
                            <Lock className="w-2.5 h-2.5" />
                            <span>ล็อค</span>
                          </div>
                        )}

                        {/* Franchise Tag & Quick Preview Button */}
                        <div className="w-full flex items-center justify-between gap-1">
                          <span
                            className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-md ${
                              isDisney
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isDisney ? '🏰 ดิสนีย์' : '🦸‍♂️ มาร์เวล'}
                          </span>

                          <button
                            type="button"
                            id={`btn-preview-card-${char.emoji}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewAvatarItem(char);
                              try {
                                soundEffects.playTap(0.5);
                              } catch {}
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
                            title={`ดูตัวอย่าง ${char.name} (Preview)`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Large Emoji Visual with Bounce / Slide animation */}
                        <div
                          key={`card-emoji-${char.emoji}-${isCurrentlyAnimating ? animatingAvatar?.key : 'idle'}`}
                          className={`text-3.5xl sm:text-4xl my-0.5 transition-transform group-hover:scale-115 duration-200 select-none ${cardAnimClass} ${
                            isLocked ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-90' : ''
                          }`}
                        >
                          {char.emoji}
                        </div>

                        {/* Character Name & Status */}
                        <div className="w-full">
                          <div className="text-xs font-black text-slate-800 group-hover:text-amber-700 line-clamp-1">
                            {char.name}
                          </div>
                          {isCurrent ? (
                            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                              อวาตาร์ปัจจุบัน
                            </div>
                          ) : isLocked ? (
                            <div className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-1 py-0.5 mt-0.5 font-bold truncate flex items-center justify-center gap-0.5">
                              <Lock className="w-2.5 h-2.5 shrink-0" />
                              <span className="truncate">
                                {unlockStatus.requirement?.badgeId
                                  ? `${unlockStatus.requirement.badgeIcon || '🏆'} ${unlockStatus.requirement.badgeName}`
                                  : `${unlockStatus.neededScore} คะแนน`}
                              </span>
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-400 mt-0.5 font-medium group-hover:text-amber-600">
                              แตะเพื่อเปลี่ยน
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Sub-panel Bottom Bar */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 font-medium">
                  แสดง {displayedCharacters.length} ตัวละคร (ดิสนีย์ {DISNEY_AVATARS.length} • มาร์เวล {MARVEL_AVATARS.length})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubPanel('profiles');
                      try {
                        soundEffects.playTap(0.5);
                      } catch {}
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    กลับหน้ารายชื่อโปรไฟล์
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black shadow-xs cursor-pointer"
                  >
                    เสร็จสิ้น
                  </button>
                </div>
              </div>
            </div>
          ) : !isCreating && !editingProfile ? (
            <div className="space-y-3">
              {/* Curriculum Selector Tabs inside Profile Modal */}
              <div className="flex items-center justify-between gap-1.5 sm:gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  id="btn-modal-curriculum-early"
                  onClick={() => {
                    setModalCurriculum('early_childhood');
                    setSelectedGradeFilter('ALL');
                    setCurrentPage(1);
                    setNewGrade('K1');
                    if (onSelectCurriculumMode) onSelectCurriculumMode('early_childhood', true);
                  }}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    modalCurriculum === 'early_childhood'
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🧸</span>
                  <span className="truncate">ปฐมวัย (อ.1-3)</span>
                </button>
                <button
                  type="button"
                  id="btn-modal-curriculum-cbe"
                  onClick={() => {
                    setModalCurriculum('cbe_primary');
                    setSelectedGradeFilter('ALL');
                    setCurrentPage(1);
                    setNewGrade('P1');
                    if (onSelectCurriculumMode) onSelectCurriculumMode('cbe_primary', true);
                  }}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    modalCurriculum === 'cbe_primary'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🎓</span>
                  <span className="truncate">สมรรถนะ (ป.1-3)</span>
                </button>
                <button
                  type="button"
                  id="btn-modal-curriculum-phonics"
                  onClick={() => {
                    setModalCurriculum('thai_phonics');
                    setSelectedGradeFilter('ALL');
                    setCurrentPage(1);
                    setNewGrade('P1');
                    if (onSelectCurriculumMode) onSelectCurriculumMode('thai_phonics', true);
                  }}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    modalCurriculum === 'thai_phonics'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>📖</span>
                  <span className="truncate">แจกลูกสะกดคำ (ป.1-6)</span>
                </button>
              </div>

              {/* Search & Action Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-white p-2 rounded-2xl border border-slate-200">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="input-search-profile-modal"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder={
                      modalCurriculum === 'thai_phonics'
                        ? 'ค้นหาชื่อนักเรียนอ่านแจกลูกสะกดคำ เช่น ป.1, ป.6...'
                        : modalCurriculum === 'cbe_primary'
                        ? 'ค้นหาชื่อนักเรียนประถม เช่น น้องภูผา, ป.1...'
                        : 'ค้นหาชื่อเด็กปฐมวัย เช่น น้องต้นหม่อน, อ.1...'
                    }
                    className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => handleSearchChange('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Grade Filter Pills & New Profile Button */}
                <div className="flex flex-wrap items-center gap-1.5 justify-between sm:justify-end">
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleGradeFilterChange('ALL')}
                      className={`text-[11px] font-black px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        selectedGradeFilter === 'ALL'
                          ? modalCurriculum === 'thai_phonics'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : modalCurriculum === 'cbe_primary'
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'bg-amber-400 text-amber-950 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      ทั้งหมด
                    </button>
                    {modalCurriculum === 'thai_phonics' ? (
                      (['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as Grade[]).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => handleGradeFilterChange(g)}
                          className={`text-[11px] font-black px-2 py-1 rounded-lg transition-all cursor-pointer ${
                            selectedGradeFilter === g
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {g === 'P1' ? 'ป.1' : g === 'P2' ? 'ป.2' : g === 'P3' ? 'ป.3' : g === 'P4' ? 'ป.4' : g === 'P5' ? 'ป.5' : 'ป.6'}
                        </button>
                      ))
                    ) : modalCurriculum === 'cbe_primary' ? (
                      (['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as Grade[]).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => handleGradeFilterChange(g)}
                          className={`text-[11px] font-black px-2 py-1 rounded-lg transition-all cursor-pointer ${
                            selectedGradeFilter === g
                              ? 'bg-indigo-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {`ป.${g.slice(1)}`}
                        </button>
                      ))
                    ) : (
                      (['K1', 'K2', 'K3'] as Grade[]).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => handleGradeFilterChange(g)}
                          className={`text-[11px] font-black px-2 py-1 rounded-lg transition-all cursor-pointer ${
                            selectedGradeFilter === g
                              ? 'bg-amber-400 text-amber-950 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {g === 'K1' ? 'อ.1' : g === 'K2' ? 'อ.2' : 'อ.3'}
                        </button>
                      ))
                    )}
                  </div>

                  <button
                    id="btn-show-add-profile"
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ เพิ่มเด็กใหม่</span>
                  </button>
                </div>
              </div>

              {/* Profiles Grid (9 per page, 3x3) */}
              {paginatedProfiles.length === 0 ? (
                <div className="py-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                  <div className="text-3xl mb-1">🔍</div>
                  <p className="text-sm font-black text-slate-700">ไม่พบโปรไฟล์ที่ค้นหา</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {searchQuery ? `ไม่พบ "${searchQuery}"` : 'ยังไม่มีโปรไฟล์ในหมวดหมู่นี้'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {paginatedProfiles.map((profile) => {
                    const isActive = profile.id === activeProfileId;
                    const isConfirming = deleteConfirmId === profile.id;
                    const canEdit = canEditProfile(profile, isAdmin);
                    const isOwnDevice = isProfileCreatedOnThisDevice(profile);
                    const colorCfg = getAvatarColorOption(profile.avatarBg);

                    return (
                      <div
                        key={profile.id}
                        id={`profile-card-${profile.id}`}
                        onClick={() => {
                          if (!isConfirming) {
                            onSelectProfile(profile.id);
                            onClose();
                          }
                        }}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 group relative ${
                          isActive
                            ? `${currTheme.accentSurface} ${currTheme.modalBorder} ring-2 ${currTheme.modalRing} shadow-md translate-y-[-1px]`
                            : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs'
                        }`}
                      >
                        {/* Top: Avatar + Name (Full width, no truncation) + Active Check */}
                        <div className="flex items-start gap-3 w-full">
                          <div
                            className={`w-12 h-12 ${colorCfg.bgClass} ${colorCfg.borderClass} rounded-2xl shadow-xs border-2 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform`}
                          >
                            <span>{profile.avatar}</span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-1.5">
                              {onOpenStreakModal ? (
                                <button
                                  type="button"
                                  id={`btn-modal-profile-streak-${profile.id}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenStreakModal(profile);
                                  }}
                                  className="font-black text-slate-900 hover:text-amber-600 text-sm sm:text-base leading-tight break-words flex items-center gap-1.5 group/pname cursor-pointer text-left transition-colors"
                                  title="คลิกเพื่อดูปฏิทิน 30-Day Learning Streak Tracker"
                                >
                                  <span className="font-black break-words">{profile.name}</span>
                                  {profile.streakDays > 0 && (
                                    <span className="inline-flex items-center text-[10px] font-black bg-amber-100 group-hover/pname:bg-amber-200 text-amber-800 px-1.5 py-0.2 rounded-md shrink-0">
                                      🔥 {profile.streakDays}
                                    </span>
                                  )}
                                </button>
                              ) : (
                                <h4 className="font-black text-slate-900 text-sm sm:text-base leading-tight break-words">
                                  {profile.name}
                                </h4>
                              )}

                              {isActive && (
                                <div className={`w-6 h-6 ${currTheme.accentBg} rounded-lg flex items-center justify-center text-white shadow-2xs shrink-0`} title="โปรไฟล์ที่เลือกใช้งานอยู่">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                              <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full shrink-0">
                                {profile.grade === 'K1'
                                  ? 'อ.1'
                                  : profile.grade === 'K2'
                                  ? 'อ.2'
                                  : profile.grade === 'K3'
                                  ? 'อ.3'
                                  : profile.grade === 'P1'
                                  ? 'ป.1'
                                  : profile.grade === 'P2'
                                  ? 'ป.2'
                                  : profile.grade === 'P3'
                                  ? 'ป.3'
                                  : profile.grade === 'P4'
                                  ? 'ป.4'
                                  : profile.grade === 'P5'
                                  ? 'ป.5'
                                  : profile.grade === 'P6'
                                  ? 'ป.6'
                                  : profile.grade}
                              </span>
                              <span className="text-xs text-amber-700 font-bold shrink-0">
                                🪙 {profile.totalScore}
                              </span>
                              {!isOwnDevice && (
                                <span
                                  className="text-[9px] bg-amber-100/90 text-amber-800 font-bold px-1.5 py-0.2 rounded shrink-0"
                                  title={`สร้างจาก: ${profile.createdDeviceName || 'อุปกรณ์อื่น'}`}
                                >
                                  📱 {profile.createdDeviceName || 'เครื่องอื่น'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row: Timestamp + Action Buttons */}
                        <div
                          className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 w-full text-xs text-slate-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                            <Clock className="w-3 h-3 shrink-0 text-slate-400" />
                            <span>{formatLastActive(profile)}</span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {isConfirming ? (
                              <div className="flex items-center gap-1 bg-rose-50 border border-rose-300 p-1 rounded-xl">
                                <button
                                  id={`btn-confirm-delete-${profile.id}`}
                                  onClick={(e) => handleConfirmDelete(e, profile.id)}
                                  className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black px-2 py-0.5 rounded-lg cursor-pointer"
                                >
                                  ลบ
                                </button>
                                <button
                                  id={`btn-cancel-delete-${profile.id}`}
                                  onClick={handleCancelDelete}
                                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded-lg cursor-pointer"
                                >
                                  ไม่
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 bg-slate-50 p-0.5 rounded-xl border border-slate-200">
                                {/* Quick Avatar Selection button */}
                                <button
                                  type="button"
                                  id={`btn-open-avatar-subpanel-${profile.id}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setAvatarTargetProfileId(profile.id);
                                    setActiveSubPanel('avatar-selection');
                                    try {
                                      soundEffects.playTap(0.6);
                                    } catch {}
                                  }}
                                  title="เลือกอวาตาร์ดิสนีย์ & มาร์เวล สำหรับโปรไฟล์นี้"
                                  className="p-1 text-amber-600 hover:text-amber-800 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                </button>
                                {canEdit ? (
                                  <button
                                    id={`btn-edit-modal-profile-${profile.id}`}
                                    onClick={(e) => handleStartEdit(e, profile)}
                                    title="แก้ไขโปรไฟล์นี้"
                                    className="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    id={`btn-edit-modal-profile-locked-${profile.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setAdminAuthTargetProfile(profile);
                                      setShowAdminAuthModal(true);
                                    }}
                                    title="สร้างจากอุปกรณ์อื่น: คลิกเพื่อเข้าสู่ระบบผู้ดูแลเพื่อแก้ไข"
                                    className="p-1 text-amber-600 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <Lock className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {canDeleteProfile(profile, isAdmin) ? (
                                  <button
                                    id={`btn-delete-profile-${profile.id}`}
                                    onClick={(e) => handleTriggerDelete(e, profile.id)}
                                    title="ลบโปรไฟล์นี้"
                                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    id={`btn-delete-profile-locked-${profile.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setAdminAuthTargetProfile(profile);
                                      setShowAdminAuthModal(true);
                                    }}
                                    title="สร้างจากอุปกรณ์อื่น: ลบได้เฉพาะจากเครื่องต้นทาง หรือผู้ดูแลระบบ"
                                    className="p-1 text-slate-300 hover:text-amber-600 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <Lock className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination Controls */}
              <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                <span className="text-slate-600 font-medium">
                  แสดง {filteredProfiles.length > 0 ? startIndex + 1 : 0} -{' '}
                  {Math.min(startIndex + ITEMS_PER_PAGE, filteredProfiles.length)} จาก {filteredProfiles.length} คน
                  (หน้า {validPage}/{totalPages})
                </span>

                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={validPage <= 1}
                      className="px-2 py-1 rounded-lg text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-6 h-6 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          validPage === pageNum
                            ? 'bg-amber-400 text-amber-950 shadow-2xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={validPage >= totalPages}
                      className="px-2 py-1 rounded-lg text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : editingProfile ? (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">✏️</span>
                <div>
                  <h3 className="text-sm font-black text-slate-800">
                    แก้ไขโปรไฟล์: {editingProfile.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    ปรับเปลี่ยนชื่อ ระดับชั้น หรือปรับแต่งอวาตาร์และสีพื้นหลังประจำตัว
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ชื่อหรือชื่อเล่นของเด็ก
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น น้องมินนี่, น้องกัปตัน..."
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-sm font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    ระดับชั้นการศึกษา ({modalCurriculum === 'thai_phonics' ? 'ประถม ป.1 - ป.6' : modalCurriculum === 'cbe_primary' ? 'ประถม ป.1 - ป.6' : 'ปฐมวัย อ.1 - อ.3'})
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {modalCurriculum === 'thai_phonics' ? 'หลักสูตรการสอนอ่านเขียนแจกลูกสะกดคำ สพฐ.' : modalCurriculum === 'cbe_primary' ? 'หลักสูตรสถานศึกษาฐานสมรรถนะ' : 'หลักสูตรการศึกษาปฐมวัย'}
                  </span>
                </div>
                <div className={`grid gap-2 ${(modalCurriculum === 'thai_phonics' || modalCurriculum === 'cbe_primary') ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-3'}`}>
                  {(modalCurriculum === 'thai_phonics' || modalCurriculum === 'cbe_primary'
                    ? (['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as Grade[])
                    : (['K1', 'K2', 'K3'] as Grade[])
                  ).map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => setEditGrade(grade)}
                      className={`py-2 px-1.5 rounded-xl border-2 font-bold text-xs cursor-pointer transition-all text-center ${
                        editGrade === grade
                          ? modalCurriculum === 'cbe_primary'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs ring-2 ring-indigo-200'
                            : 'border-amber-500 bg-amber-100 text-amber-900 shadow-xs ring-2 ring-amber-200'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-black text-sm">{grade}</div>
                      <div className="text-[10px] opacity-80 leading-tight mt-0.5">
                        {grade.startsWith('P')
                          ? `ป.${grade.slice(1)}`
                          : grade === 'K1'
                          ? 'อ.1 (3-4 ปี)'
                          : grade === 'K2'
                          ? 'อ.2 (4-5 ปี)'
                          : 'อ.3 (5-6 ปี)'}
                      </div>
                    </button>
                  ))}
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

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProfile(null)}
                  className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-100 cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl text-xs shadow-md cursor-pointer"
                >
                  บันทึกการแก้ไข
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-black text-slate-800">
                  สร้างโปรไฟล์นักเรียนคนใหม่
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  modalCurriculum === 'thai_phonics'
                    ? 'bg-emerald-100 text-emerald-800'
                    : modalCurriculum === 'cbe_primary'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-sky-100 text-sky-800'
                }`}>
                  {modalCurriculum === 'thai_phonics' ? '📖 โซนแจกลูกสะกดคำ (ป.1 - ป.6)' : modalCurriculum === 'cbe_primary' ? '🎓 โซนประถม (ป.1 - ป.6)' : '🧸 โซนปฐมวัย (อ.1 - อ.3)'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ชื่อหรือชื่อเล่นของเด็ก
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น น้องมินนี่, น้องกัปตัน..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ระดับชั้นการศึกษา ({modalCurriculum === 'thai_phonics' ? 'ประถม ป.1 - ป.6' : modalCurriculum === 'cbe_primary' ? 'ประถม ป.1 - ป.6' : 'ปฐมวัย อ.1 - อ.3'})
                </label>
                <div className={`grid gap-2 ${(modalCurriculum === 'thai_phonics' || modalCurriculum === 'cbe_primary') ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-3'}`}>
                  {(modalCurriculum === 'thai_phonics' || modalCurriculum === 'cbe_primary'
                    ? (['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as Grade[])
                    : (['K1', 'K2', 'K3'] as Grade[])
                  ).map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => setNewGrade(grade)}
                      className={`py-2 px-1.5 rounded-xl border-2 font-bold text-xs cursor-pointer transition-all text-center ${
                        newGrade === grade
                          ? modalCurriculum === 'thai_phonics'
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs ring-2 ring-emerald-200'
                            : modalCurriculum === 'cbe_primary'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs ring-2 ring-indigo-200'
                            : 'border-amber-500 bg-amber-100 text-amber-900 shadow-xs ring-2 ring-amber-200'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-black text-sm">{grade}</div>
                      <div className="text-[10px] opacity-80 leading-tight mt-0.5">
                        {grade === 'K1'
                          ? 'อ.1 (3-4 ปี)'
                          : grade === 'K2'
                          ? 'อ.2 (4-5 ปี)'
                          : grade === 'K3'
                          ? 'อ.3 (5-6 ปี)'
                          : grade === 'P1'
                          ? 'ป.1 (6-7 ปี)'
                          : grade === 'P2'
                          ? 'ป.2 (7-8 ปี)'
                          : grade === 'P3'
                          ? 'ป.3 (8-9 ปี)'
                          : grade === 'P4'
                          ? 'ป.4 (9-10 ปี)'
                          : grade === 'P5'
                          ? 'ป.5 (10-11 ปี)'
                          : 'ป.6 (11-12 ปี)'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar & Color Customizer */}
              <AvatarEditor
                selectedEmoji={selectedAvatar}
                selectedColorId={selectedAvatarBg}
                onChangeEmoji={setSelectedAvatar}
                onChangeColor={setSelectedAvatarBg}
                previewName={newName || 'นักเรียนคนใหม่'}
                profile={null}
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-100 cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl text-xs shadow-md cursor-pointer"
                >
                  บันทึกโปรไฟล์
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Locked Character Requirement Details Modal */}
      {selectedLockedChar && (
        <div
          id="modal-avatar-locked-details"
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-[75] flex items-center justify-center p-3 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedLockedChar(null);
            }
          }}
        >
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border-4 border-amber-300 text-center space-y-4 animate-in zoom-in-95 relative">
            <button
              type="button"
              id="btn-close-locked-avatar-x"
              onClick={() => setSelectedLockedChar(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Character Visual */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-5xl shadow-inner relative">
                <span>{selectedLockedChar.char.emoji}</span>
                <div className="absolute -bottom-1 -right-1 bg-slate-800 text-amber-300 p-1.5 rounded-full shadow-md">
                  <Lock className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-2.5">
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    selectedLockedChar.char.category === 'disney'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {selectedLockedChar.char.category === 'disney'
                    ? '🏰 นิทานดิสนีย์'
                    : '🦸‍♂️ ฮีโร่มาร์เวล'}
                </span>
                <h4 className="text-lg font-black text-slate-800 mt-1">
                  {selectedLockedChar.char.name}
                </h4>
              </div>
            </div>

            {/* Requirement Card */}
            <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200 text-left space-y-2.5">
              <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>เงื่อนไขในการปลดล็อก:</span>
              </div>

              <div className="text-xs font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-amber-100 shadow-2xs">
                {selectedLockedChar.status.requirement?.descriptionTh || selectedLockedChar.status.reasonTh}
              </div>

              {/* Progress if score requirement */}
              {selectedLockedChar.status.neededScore && selectedLockedChar.status.neededScore > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-600">
                    <span>คะแนนของ {currentTargetProfile.name}:</span>
                    <span className="font-black text-amber-900">
                      {selectedLockedChar.status.currentScore.toLocaleString()} /{' '}
                      {selectedLockedChar.status.neededScore.toLocaleString()} คะแนน
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${selectedLockedChar.status.progressPercent}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-right font-bold text-amber-700">
                    ขาดอีก{' '}
                    {(selectedLockedChar.status.neededScore - selectedLockedChar.status.currentScore > 0
                      ? selectedLockedChar.status.neededScore - selectedLockedChar.status.currentScore
                      : 0
                    ).toLocaleString()}{' '}
                    คะแนน
                  </div>
                </div>
              )}

              {/* Badge info if badge requirement */}
              {selectedLockedChar.status.requirement?.badgeId && (
                <div className="pt-1.5 border-t border-amber-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-slate-600">
                    เหรียญตรา {selectedLockedChar.status.requirement.badgeIcon}:
                  </span>
                  <span
                    className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                      selectedLockedChar.status.hasBadge
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {selectedLockedChar.status.hasBadge ? 'พิชิตแล้ว ✓' : 'ยังไม่ได้รับ'}
                  </span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-500">
              💡 แนะนำ: ชวนน้อง {currentTargetProfile.name} เล่นเกมตอบคำถามเพื่อสะสมคะแนนและเหรียญรางวัลพิเศษ!
            </p>

            {/* Action Buttons: Unlock & Close */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                id="btn-unlock-avatar-celebration"
                onClick={() => {
                  if (currentTargetProfile) {
                    handleUnlockCharacter(selectedLockedChar.char, currentTargetProfile, true);
                  }
                }}
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-amber-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-all transform hover:scale-102 active:scale-98 flex items-center justify-center gap-1.5"
                title="ปลดล็อกตัวละครนี้และแสดงเอฟเฟกต์เฉลิมฉลอง"
              >
                <Sparkles className="w-4 h-4 text-amber-900" />
                <span>🎉 ปลดล็อกตัวละครนี้และใช้งานทันที!</span>
              </button>

              <button
                type="button"
                id="btn-close-locked-avatar-modal"
                onClick={() => setSelectedLockedChar(null)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition-all"
              >
                รับทราบ / ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Avatar Live Preview Modal */}
      {previewAvatarItem && (
        <div
          id="modal-avatar-full-preview"
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-[80] flex items-center justify-center p-3 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setPreviewAvatarItem(null);
            }
          }}
        >
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl border-4 border-amber-300 space-y-4 animate-in zoom-in-95 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              id="btn-close-full-avatar-preview"
              onClick={() => setPreviewAvatarItem(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>ตัวอย่างหน้าจอจริงของอวาตาร์ (Avatar Preview)</span>
              </div>
              <h3 className="text-lg font-black text-slate-800">
                {previewAvatarItem.name}
              </h3>
            </div>

            {/* Giant Avatar Showcase with interactive bounce / slide test */}
            {(() => {
              const colorCfg = getAvatarColorOption(currentTargetProfile?.avatarBg || 'amber');
              const unlockStatus = getAvatarUnlockStatus(previewAvatarItem.emoji, currentTargetProfile);
              const isSelectedCurrent = currentTargetProfile?.avatar === previewAvatarItem.emoji;

              return (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center py-4 bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-2xl border border-amber-200">
                    <div
                      key={`preview-avatar-showcase-${previewAnimKey}`}
                      className={`w-24 h-24 rounded-3xl ${colorCfg.bgClass} ${colorCfg.borderClass} border-4 flex items-center justify-center text-6xl shadow-xl transition-transform hover:scale-110 select-none ${
                        previewAnimType === 'slide' ? 'animate-avatar-slide' : 'animate-avatar-bounce'
                      }`}
                    >
                      <span>{previewAvatarItem.emoji}</span>
                    </div>

                    {/* Interactive Animation Test Buttons */}
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <button
                        type="button"
                        id="btn-test-preview-bounce"
                        onClick={() => {
                          setPreviewAnimType('bounce');
                          setPreviewAnimKey(Date.now());
                          try {
                            soundEffects.playVictory(0.5);
                          } catch {}
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 shadow-2xs active:scale-95 ${
                          previewAnimType === 'bounce'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                        }`}
                      >
                        <span>🦘 ทดสอบเด้ง (Bounce)</span>
                      </button>

                      <button
                        type="button"
                        id="btn-test-preview-slide"
                        onClick={() => {
                          setPreviewAnimType('slide');
                          setPreviewAnimKey(Date.now());
                          try {
                            soundEffects.playVictory(0.5);
                          } catch {}
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 shadow-2xs active:scale-95 ${
                          previewAnimType === 'slide'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                        }`}
                      >
                        <span>🚀 ทดสอบสไลด์ (Slide)</span>
                      </button>
                    </div>

                    <div className="mt-2 text-center">
                      <span className="text-xs font-bold text-slate-700">
                        สีพื้นหลังปัจจุบัน: <strong className="text-amber-800">{colorCfg.name}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Real World Mockups */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-amber-600" />
                      <span>ตัวอย่างเมื่อนำไปแสดงในจุดต่างๆ:</span>
                    </div>

                    {/* 1. Header Bar Mockup */}
                    <div className="p-2.5 rounded-xl bg-slate-900 text-white flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${colorCfg.bgClass} flex items-center justify-center text-lg`}>
                          <span>{previewAvatarItem.emoji}</span>
                        </div>
                        <div className="text-left">
                          <div className="text-[11px] font-black">{currentTargetProfile?.name || 'หนูน้อย'}</div>
                          <div className="text-[9px] text-amber-400 font-bold">แถบเมนูด้านบน (Header Bar)</div>
                        </div>
                      </div>
                      <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                        🪙 {currentTargetProfile?.totalScore || 0}
                      </span>
                    </div>

                    {/* 2. Game HUD Mockup */}
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${colorCfg.bgClass} flex items-center justify-center text-lg border border-amber-300`}>
                          <span>{previewAvatarItem.emoji}</span>
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">หน้าจอระหว่างเล่นเกม</div>
                          <div className="text-[10px] text-slate-500">ตอบคำถาม & ติดตามคะแนน</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-black bg-emerald-100 px-2 py-0.5 rounded-lg">
                        ระดับ {currentTargetProfile?.grade || 'K1'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewAvatarItem(null)}
                      className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-100 cursor-pointer"
                    >
                      ปิดตัวอย่าง
                    </button>

                    {unlockStatus.unlocked ? (
                      <button
                        type="button"
                        id="btn-apply-preview-avatar"
                        onClick={() => {
                          if (currentTargetProfile) {
                            handleSelectCharacter(
                              {
                                emoji: previewAvatarItem.emoji,
                                name: previewAvatarItem.name,
                                category: previewAvatarItem.category || 'disney',
                              },
                              currentTargetProfile
                            );
                            setPreviewAvatarItem(null);
                          }
                        }}
                        disabled={isSelectedCurrent}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                          isSelectedCurrent
                            ? 'bg-slate-200 text-slate-500 cursor-default'
                            : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white active:scale-95'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span>{isSelectedCurrent ? 'กำลังใช้อยู่แล้ว' : 'เลือกใช้อวาตาร์นี้!'}</span>
                      </button>
                    ) : (
                      <div className="flex-1 flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const charObj: DisneyMarvelAvatarItem = {
                              emoji: previewAvatarItem.emoji,
                              name: previewAvatarItem.name,
                              category: previewAvatarItem.category || 'disney',
                            };
                            setPreviewAvatarItem(null);
                            setSelectedLockedChar({ char: charObj, status: unlockStatus });
                          }}
                          className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-900 text-amber-300 rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>ดูเงื่อนไข</span>
                        </button>
                        <button
                          type="button"
                          id="btn-unlock-from-preview"
                          onClick={() => {
                            if (currentTargetProfile) {
                              handleUnlockCharacter(
                                {
                                  emoji: previewAvatarItem.emoji,
                                  name: previewAvatarItem.name,
                                  category: previewAvatarItem.category || 'disney',
                                },
                                currentTargetProfile,
                                true
                              );
                              setPreviewAvatarItem(null);
                            }
                          }}
                          className="flex-1 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-950 font-black rounded-xl text-xs shadow-md flex items-center justify-center gap-1 cursor-pointer"
                          title="ปลดล็อกตัวละครนี้ทันที"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>ปลดล็อกเลย!</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Grand Unlock Celebration Modal */}
      {unlockCelebrationChar && (
        <div
          id="modal-avatar-unlock-celebration"
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-[90] flex items-center justify-center p-3 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setUnlockCelebrationChar(null);
            }
          }}
        >
          <div className="bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border-4 border-yellow-300 text-center text-white space-y-4 animate-in zoom-in-95 relative overflow-hidden">
            {/* Rotating Sunburst behind the icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
              <div className="w-96 h-96 rounded-full bg-radial from-yellow-200 to-transparent animate-avatar-sunburst" />
            </div>

            <button
              type="button"
              id="btn-close-unlock-celebration"
              onClick={() => setUnlockCelebrationChar(null)}
              className="absolute top-3 right-3 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/20 cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Banner */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-300 text-amber-950 text-xs font-black shadow-md uppercase tracking-wider mb-2 animate-bounce">
                <span>🏆 UNLOCKED NEW HERO!</span>
              </div>
              <h3 className="text-2xl font-black drop-shadow-md">
                ปลดล็อกตัวละครใหม่สำเร็จ!
              </h3>
              <p className="text-xs text-yellow-100 font-bold mt-1">
                {unlockCelebrationChar.char.category === 'disney'
                  ? '🏰 เจ้าหญิงและนิทานดิสนีย์'
                  : '🦸‍♂️ ซูเปอร์ฮีโร่มาร์เวล'}
              </p>
            </div>

            {/* Giant Animated Character Showcase */}
            <div className="relative z-10 py-3 flex flex-col items-center justify-center">
              {/* Golden Glow Rings */}
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-yellow-300 blur-xl opacity-60 animate-avatar-glow" />
                <div className="w-28 h-28 rounded-3xl bg-white text-slate-900 border-4 border-yellow-200 flex items-center justify-center text-7xl shadow-2xl relative z-10 animate-avatar-unlock select-none">
                  <span>{unlockCelebrationChar.char.emoji}</span>
                </div>
              </div>
              <div className="mt-3 text-lg font-black text-yellow-100 drop-shadow">
                "{unlockCelebrationChar.char.name}"
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 space-y-2 pt-1">
              <button
                type="button"
                id="btn-equip-unlocked-char"
                onClick={() => {
                  if (currentTargetProfile) {
                    handleSelectCharacter(unlockCelebrationChar.char, currentTargetProfile);
                  }
                  setUnlockCelebrationChar(null);
                }}
                className="w-full py-3 bg-yellow-300 hover:bg-yellow-200 text-amber-950 font-black text-sm rounded-2xl shadow-lg cursor-pointer transition-all transform hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
              >
                <span>⚡ ใช้งานตัวละครนี้ทันที!</span>
              </button>

              <button
                type="button"
                onClick={() => setUnlockCelebrationChar(null)}
                className="w-full py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl cursor-pointer transition-all"
              >
                เก็บไว้ก่อน / ปิด
              </button>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

