import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  MessageSquare,
  Search,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  Pin,
  Send,
  Baby,
  GraduationCap,
  Lightbulb,
  HelpCircle,
  Users,
  Check,
  Tag,
  ShieldCheck,
  Shield,
  ChevronDown,
  ChevronUp,
  Bookmark,
  RefreshCw,
  BookOpen,
  Trash2,
  Edit3,
  Lock,
  Unlock,
  AlertTriangle,
  KeyRound,
  RotateCcw,
  LogIn,
  LogOut,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  discussionService,
  DiscussionPost,
  DiscussionCategory,
  DiscussionTargetCurriculum,
  DiscussionAuthorRole,
} from '../services/discussionService';
import {
  DISCUSSION_ADMIN_EMAILS,
  isDiscussionAdmin,
} from '../services/authPermissionService';
import { googleSignIn, logout } from '../services/firebaseAuthService';
import { CurriculumMode } from '../types';
import { soundEffects } from '../services/audioService';

export interface ClassroomDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  curriculumMode?: CurriculumMode;
  currentProfileName?: string;
  currentUser?: User | null;
  isAdmin?: boolean;
  soundVolume?: number;
}

const CATEGORY_TABS: { key: DiscussionCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'ทั้งหมด', icon: '🌟' },
  { key: 'early_childhood', label: 'เทคนิคปฐมวัย (8 ทักษะ)', icon: '🧸' },
  { key: 'cbe_primary', label: 'พัฒนา 6 สมรรถนะ (สพฐ.)', icon: '🎓' },
  { key: 'activity_ideas', label: 'ไอเดียกิจกรรมที่บ้าน & รร.', icon: '💡' },
  { key: 'parenting_qa', label: 'ปรึกษาพัฒนาการ & สมาธิ', icon: '❓' },
];

const PRESET_TAGS = [
  '6 สมรรถนะ สพฐ.',
  'กล้ามเนื้อมัดเล็ก',
  'การคิดขั้นสูง',
  'Hand Tracing',
  'คัดลายมือ ก-ฮ',
  'Daily Mission',
  'สำรวจธรรมชาติ',
  'ลดการติดจอ',
  'การจัดการตนเอง',
  'สมาธิสั้น',
  'Active Learning',
];

export const ClassroomDiscussionModal: React.FC<ClassroomDiscussionModalProps> = ({
  isOpen,
  onClose,
  curriculumMode = 'early_childhood',
  currentProfileName = 'คุณครู / ผู้ปกครอง',
  currentUser = null,
  isAdmin = false,
  soundVolume = 0.6,
}) => {
  const [discussions, setDiscussions] = useState<DiscussionPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<DiscussionCategory | 'all'>('all');
  const [curriculumFilter, setCurriculumFilter] = useState<'all' | 'early_childhood' | 'cbe_primary'>(() => {
    return curriculumMode === 'cbe_primary' ? 'cbe_primary' : 'all';
  });
  const [searchQuery, setSearchQuery] = useState('');

  // 3 Authorized Admin Emails Verification
  const isAuthorizedAdmin = useMemo(() => {
    return isDiscussionAdmin(currentUser?.email);
  }, [currentUser]);

  // Admin Mode state
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => isAuthorizedAdmin);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);

  // Admin filter: 'all' | 'pinned_only' | 'locked_only'
  const [adminFilter, setAdminFilter] = useState<'all' | 'pinned_only' | 'locked_only'>('all');

  // Creation form state
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<DiscussionCategory>('early_childhood');
  const [newTargetCurriculum, setNewTargetCurriculum] = useState<DiscussionTargetCurriculum>(
    curriculumMode === 'cbe_primary' ? 'cbe_primary' : 'early_childhood'
  );
  const [newAuthorName, setNewAuthorName] = useState(currentProfileName || 'คุณครู/ผู้ปกครอง');
  const [newAuthorRole, setNewAuthorRole] = useState<DiscussionAuthorRole>(isAuthorizedAdmin ? 'teacher' : 'parent');
  const [newAuthorAvatar, setNewAuthorAvatar] = useState('🍎');
  const [newPracticalTips, setNewPracticalTips] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit post state (Admin feature)
  const [editingPost, setEditingPost] = useState<DiscussionPost | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState<DiscussionCategory>('early_childhood');
  const [editTargetCurriculum, setEditTargetCurriculum] = useState<DiscussionTargetCurriculum>('both');
  const [editPracticalTips, setEditPracticalTips] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete post confirmation dialog state (Admin feature)
  const [postToDelete, setPostToDelete] = useState<DiscussionPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset confirmation dialog state
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Expanded replies state
  const [expandedPostIds, setExpandedPostIds] = useState<Set<string>>(new Set(['disc-cbe-competency-guide']));
  const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({});
  const [replyRoleMap, setReplyRoleMap] = useState<Record<string, DiscussionAuthorRole>>({});
  const [copiedTipId, setCopiedTipId] = useState<string | null>(null);

  // Real-time synchronization state with Cloud Firestore
  const [syncStatus, setSyncStatus] = useState<{ isConnected: boolean; lastSyncedAt: Date | null }>({
    isConnected: true,
    lastSyncedAt: new Date(),
  });

  // Manual refresh helper
  const handleManualRefresh = async () => {
    setIsLoading(true);
    try {
      const data = await discussionService.fetchDiscussions();
      setDiscussions(data);
      setSyncStatus({ isConnected: true, lastSyncedAt: new Date() });
    } catch (e) {
      console.warn('Error refreshing discussions', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Subscribe to real-time Cloud Firestore updates automatically
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    setIsAdminMode(isAuthorizedAdmin);
    if (curriculumMode === 'cbe_primary') {
      setNewCategory('cbe_primary');
      setNewTargetCurriculum('cbe_primary');
    } else {
      setNewCategory('early_childhood');
      setNewTargetCurriculum('early_childhood');
    }

    const unsubscribe = discussionService.subscribeDiscussions(
      (updatedPosts) => {
        setDiscussions(updatedPosts);
        setIsLoading(false);
      },
      (status) => {
        setSyncStatus(status);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [isOpen, curriculumMode, isAuthorizedAdmin]);

  // Sync admin mode when currentUser changes
  useEffect(() => {
    if (isAuthorizedAdmin) {
      setIsAdminMode(true);
    }
  }, [isAuthorizedAdmin]);

  // Filtered discussions
  const filteredDiscussions = useMemo(() => {
    return discussions.filter((post) => {
      // Admin filter
      if (isAdminMode && isAuthorizedAdmin) {
        if (adminFilter === 'pinned_only' && !post.isPinned) return false;
        if (adminFilter === 'locked_only' && !post.isLocked) return false;
      }
      // Category filter
      if (activeCategory !== 'all' && post.category !== activeCategory) {
        return false;
      }
      // Curriculum filter
      if (curriculumFilter !== 'all') {
        if (post.targetCurriculum !== 'both' && post.targetCurriculum !== curriculumFilter) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesContent = post.content.toLowerCase().includes(q);
        const matchesAuthor = post.authorName.toLowerCase().includes(q);
        const matchesTag = post.tags && post.tags.some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesContent || matchesAuthor || matchesTag;
      }
      return true;
    });
  }, [discussions, activeCategory, curriculumFilter, searchQuery, isAdminMode, isAuthorizedAdmin, adminFilter]);

  if (!isOpen) return null;

  // Handle Google Sign In for Admin
  const handleAdminGoogleSignIn = async () => {
    setIsLoggingIn(true);
    setAuthErrorMessage(null);
    try {
      const res = await googleSignIn();
      const signedEmail = res.user.email?.toLowerCase().trim();
      if (isDiscussionAdmin(signedEmail)) {
        soundEffects.playSuccess(soundVolume);
        setIsAdminMode(true);
        setShowAdminLoginModal(false);
      } else {
        soundEffects.playIncorrect(soundVolume);
        setAuthErrorMessage(
          `บัญชี "${res.user.email}" ไม่มีสิทธิ์จัดการกระทู้ กรุณาเข้าสู่ระบบด้วย 1 ใน 3 อีเมลที่กำหนดเท่านั้น`
        );
      }
    } catch (err: any) {
      console.warn('Admin login error', err);
      setAuthErrorMessage(err.message || 'ไม่สามารถลงชื่อเข้าใช้ด้วย Google ได้');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleAdminLogout = async () => {
    try {
      await logout();
      setIsAdminMode(false);
      setShowAdminLoginModal(false);
      soundEffects.playTap(soundVolume);
    } catch (e) {
      console.warn('Logout error', e);
    }
  };

  // Toggle Like on Post
  const handleLikePost = async (postId: string) => {
    soundEffects.playTap(soundVolume);
    const result = await discussionService.toggleLikePost(postId);
    setDiscussions((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: result.count, likedByMe: result.liked } : p))
    );
  };

  // Toggle Like on Reply
  const handleLikeReply = async (discussionId: string, replyId: string) => {
    soundEffects.playTap(soundVolume);
    const result = await discussionService.toggleLikeReply(discussionId, replyId);
    setDiscussions((prev) =>
      prev.map((p) => {
        if (p.id === discussionId && p.replies) {
          return {
            ...p,
            replies: p.replies.map((r) =>
              r.id === replyId ? { ...r, likes: result.count, likedByMe: result.liked } : r
            ),
          };
        }
        return p;
      })
    );
  };

  // Toggle Replies accordion
  const handleToggleReplies = (postId: string) => {
    soundEffects.playTap(soundVolume);
    setExpandedPostIds((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  // Submit Reply
  const handleSendReply = async (discussionId: string) => {
    const text = (replyInputMap[discussionId] || '').trim();
    if (!text) return;

    soundEffects.playSuccess(soundVolume);
    const role = replyRoleMap[discussionId] || (isAdminMode && isAuthorizedAdmin ? 'teacher' : 'parent');
    const avatar = role === 'teacher' ? '🍎' : role === 'specialist' ? '👩‍🏫' : role === 'admin' ? '🛡️' : '🏡';

    const newReply = await discussionService.addReply(discussionId, {
      authorName: currentProfileName || (role === 'teacher' ? 'คุณครู' : 'ผู้ปกครอง'),
      authorRole: role,
      authorAvatar: avatar,
      content: text,
    });

    setDiscussions((prev) =>
      prev.map((p) => {
        if (p.id === discussionId) {
          const replies = p.replies || [];
          return {
            ...p,
            replyCount: replies.length + 1,
            replies: [...replies, newReply],
          };
        }
        return p;
      })
    );

    setReplyInputMap((prev) => ({ ...prev, [discussionId]: '' }));
    setExpandedPostIds((prev) => new Set(prev).add(discussionId));
  };

  // Admin Action: Delete Reply
  const handleDeleteReply = async (discussionId: string, replyId: string) => {
    if (!isAuthorizedAdmin) return;
    soundEffects.playTap(soundVolume);
    if (!window.confirm('คุณต้องการลบความคิดเห็นนี้ใช่หรือไม่?')) return;

    await discussionService.deleteReply(discussionId, replyId);
    setDiscussions((prev) =>
      prev.map((p) => {
        if (p.id === discussionId && p.replies) {
          const filtered = p.replies.filter((r) => r.id !== replyId);
          return {
            ...p,
            replyCount: Math.max(0, filtered.length),
            replies: filtered,
          };
        }
        return p;
      })
    );
  };

  // Admin Action: Toggle Pin Post
  const handleTogglePin = async (postId: string) => {
    if (!isAuthorizedAdmin) return;
    soundEffects.playTap(soundVolume);
    const newPinned = await discussionService.togglePinDiscussion(postId);
    setDiscussions((prev) => {
      const updated = prev.map((p) => (p.id === postId ? { ...p, isPinned: newPinned } : p));
      updated.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      return updated;
    });
  };

  // Admin Action: Toggle Lock Comments
  const handleToggleLock = async (postId: string) => {
    if (!isAuthorizedAdmin) return;
    soundEffects.playTap(soundVolume);
    const newLocked = await discussionService.toggleLockDiscussion(postId);
    setDiscussions((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isLocked: newLocked } : p))
    );
  };

  // Admin Action: Start Editing Post
  const handleStartEditPost = (post: DiscussionPost) => {
    if (!isAuthorizedAdmin) return;
    soundEffects.playTap(soundVolume);
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditCategory(post.category);
    setEditTargetCurriculum(post.targetCurriculum);
    setEditPracticalTips(post.practicalTips || '');
    setEditTags(post.tags || []);
  };

  // Admin Action: Save Edited Post
  const handleSaveEditPostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthorizedAdmin || !editingPost || !editTitle.trim() || !editContent.trim()) return;

    setIsSavingEdit(true);
    soundEffects.playSuccess(soundVolume);

    try {
      const updated = await discussionService.updateDiscussion(editingPost.id, {
        title: editTitle.trim(),
        content: editContent.trim(),
        category: editCategory,
        targetCurriculum: editTargetCurriculum,
        practicalTips: editPracticalTips.trim() || undefined,
        tags: editTags,
      });

      if (updated) {
        setDiscussions((prev) => prev.map((p) => (p.id === editingPost.id ? updated : p)));
      }
      setEditingPost(null);
    } catch (err) {
      console.warn('Error updating discussion', err);
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Admin Action: Confirm Delete Post
  const handleConfirmDeletePost = async () => {
    if (!isAuthorizedAdmin || !postToDelete) return;
    setIsDeleting(true);
    soundEffects.playSuccess(soundVolume);

    try {
      await discussionService.deleteDiscussion(postToDelete.id);
      setDiscussions((prev) => prev.filter((p) => p.id !== postToDelete.id));
      setPostToDelete(null);
    } catch (err) {
      console.warn('Error deleting discussion', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Admin Action: Reset to default discussions
  const handleResetToDefault = async () => {
    if (!isAuthorizedAdmin) return;
    soundEffects.playSuccess(soundVolume);
    const resetList = await discussionService.resetToDefaultDiscussions();
    setDiscussions(resetList);
    setShowResetConfirm(false);
  };

  // Tag selection helper
  const handleToggleTag = (tag: string) => {
    soundEffects.playTap(soundVolume);
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleAddCustomTag = () => {
    if (customTagInput.trim() && !selectedTags.includes(customTagInput.trim())) {
      setSelectedTags((prev) => [...prev, customTagInput.trim()]);
      setCustomTagInput('');
    }
  };

  // Create new post submit
  const handleCreatePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsSubmitting(true);
    soundEffects.playSuccess(soundVolume);

    try {
      const created = await discussionService.createDiscussion({
        title: newTitle.trim(),
        content: newContent.trim(),
        category: newCategory,
        targetCurriculum: newTargetCurriculum,
        authorName: newAuthorName.trim() || (isAuthorizedAdmin ? 'ผู้ดูแลระบบ' : 'คุณครู/ผู้ปกครอง'),
        authorRole: newAuthorRole,
        authorAvatar: newAuthorAvatar,
        tags: selectedTags.length > 0 ? selectedTags : ['เทคนิคการสอน'],
        practicalTips: newPracticalTips.trim() || undefined,
      });

      setDiscussions((prev) => [created, ...prev]);
      // Reset form
      setNewTitle('');
      setNewContent('');
      setNewPracticalTips('');
      setSelectedTags([]);
      setIsCreatingPost(false);
      setExpandedPostIds((prev) => new Set(prev).add(created.id));
    } catch (err) {
      console.warn('Error creating discussion post', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTip = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedTipId(id);
      setTimeout(() => setCopiedTipId(null), 2000);
      soundEffects.playTap(soundVolume);
    } catch (e) {
      console.warn('Clipboard error', e);
    }
  };

  const getRoleBadge = (role: DiscussionAuthorRole) => {
    switch (role) {
      case 'teacher':
        return { label: 'คุณครู 🍎', bg: 'bg-emerald-100 border-emerald-300 text-emerald-800' };
      case 'specialist':
        return { label: 'ผู้เชี่ยวชาญ 👩‍🏫', bg: 'bg-indigo-100 border-indigo-300 text-indigo-800' };
      case 'parent':
        return { label: 'ผู้ปกครอง 🏡', bg: 'bg-amber-100 border-amber-300 text-amber-800' };
      case 'admin':
        return { label: 'ผู้ดูแลระบบ 🛡️', bg: 'bg-purple-100 border-purple-300 text-purple-800' };
      default:
        return { label: 'สมาชิก', bg: 'bg-slate-100 border-slate-300 text-slate-800' };
    }
  };

  return (
    <div
      id="classroom-discussion-modal"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-indigo-100 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-700 via-blue-600 to-teal-600 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner border border-white/30 shrink-0">
              💬
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-black font-display tracking-tight">
                  Classroom Discussion & Forum
                </h2>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  เวทีเสวนาครู & ผู้ปกครอง ✨
                </span>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 text-[10px] font-black shadow-xs"
                  title="ข้อมูลกระทู้ซิงค์กับ Cloud Firestore แบบ Real-time อัตโนมัติ"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>ซิงค์ฐานข้อมูลอัตโนมัติ (Live Sync)</span>
                </div>
                {isAdminMode && isAuthorizedAdmin && (
                  <span className="bg-purple-500/90 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border border-purple-300 flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3 h-3 text-white" />
                    <span>ผู้ดูแลระบบ: {currentUser?.email}</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-indigo-100 font-medium line-clamp-1 mt-0.5">
                แลกเปลี่ยนเทคนิคการสอน ไอเดียกิจกรรม และแนวทางพัฒนาสมรรถนะผู้เรียน
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Admin Management Auth Button */}
            {!isAuthorizedAdmin ? (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setAuthErrorMessage(null);
                  setShowAdminLoginModal(true);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                title="เข้าสู่ระบบผู้ดูแลระบบ (เปิดให้เฉพาะ 3 บัญชีที่กำหนด)"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">จัดการกระทู้ (Admin)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playTap(soundVolume);
                  setShowAdminLoginModal(true);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-900 text-purple-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 border border-purple-400/40"
                title="ดูข้อมูลบัญชีผู้ดูแลระบบ"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">สิทธิ์ผู้ดูแลระบบ ✓</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={isLoading}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              title="รีเฟรชข้อมูลกับ Cloud Firestore"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Management Toolbar Bar (Shown ONLY when Authorized Admin is active) */}
        {isAdminMode && isAuthorizedAdmin && (
          <div className="px-4 py-2.5 bg-purple-50/90 border-b border-purple-200/90 flex items-center justify-between gap-2 flex-wrap text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-purple-950 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                <span>แถบควบคุมผู้ดูแลระบบ ({currentUser?.email}):</span>
              </span>

              {/* Filter pinned or locked */}
              <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-purple-200">
                <button
                  type="button"
                  onClick={() => setAdminFilter('all')}
                  className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                    adminFilter === 'all'
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'text-purple-800 hover:bg-purple-50'
                  }`}
                >
                  ทั้งหมด ({discussions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAdminFilter('pinned_only')}
                  className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer flex items-center gap-1 ${
                    adminFilter === 'pinned_only'
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'text-purple-800 hover:bg-purple-50'
                  }`}
                >
                  <Pin className="w-3 h-3" />
                  <span>ปักหมุด ({discussions.filter((d) => d.isPinned).length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAdminFilter('locked_only')}
                  className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer flex items-center gap-1 ${
                    adminFilter === 'locked_only'
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'text-purple-800 hover:bg-purple-50'
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  <span>ล็อกตอบกลับ ({discussions.filter((d) => d.isLocked).length})</span>
                </button>
              </div>

              {/* Live sync badge in toolbar */}
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100/90 text-emerald-800 border border-emerald-300 rounded-xl font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>ซิงค์ Firestore อัตโนมัติ (Real-time Sync Active)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-2.5 py-1 bg-white hover:bg-rose-50 text-rose-700 hover:text-rose-900 rounded-xl font-bold border border-rose-200 text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                title="รีเซ็ตกระทู้เป็นค่าเริ่มต้นและบันทึกลงฐานข้อมูลอัตโนมัติ"
              >
                <RotateCcw className="w-3 h-3" />
                <span>คืนค่ากระทู้เริ่มต้น</span>
              </button>
            </div>
          </div>
        )}

        {/* Filter Controls & Search Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200/90 flex flex-col gap-3 shrink-0">
          {/* Top category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_TABS.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    setActiveCategory(cat.key);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search, Zone Switcher, and New Post Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาเทคนิคการสอน, สมรรถนะ, หรือชื่อคุณครู/ผู้ปกครอง..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-indigo-400 font-medium"
                />
              </div>

              {/* Zone Filter */}
              <select
                value={curriculumFilter}
                onChange={(e) => {
                  soundEffects.playTap(soundVolume);
                  setCurriculumFilter(e.target.value as any);
                }}
                className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-bold focus:outline-none cursor-pointer shrink-0"
              >
                <option value="all">ทุกหลักสูตร</option>
                <option value="early_childhood">🧸 โซนปฐมวัย (อ.1-3)</option>
                <option value="cbe_primary">🎓 โซนสมรรถนะ (ป.1-3)</option>
              </select>
            </div>

            {/* Create Post Button */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playTap(soundVolume);
                setIsCreatingPost((prev) => !prev);
              }}
              className="w-full sm:w-auto px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>{isCreatingPost ? 'ยกเลิกเขียนกระทู้' : 'แชร์เทคนิค / ตั้งกระทู้ใหม่'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
          {/* Post Creation Form Drawer */}
          {isCreatingPost && (
            <form
              onSubmit={handleCreatePostSubmit}
              className="bg-gradient-to-br from-indigo-50/70 via-white to-teal-50/70 rounded-3xl p-4 sm:p-5 border-2 border-indigo-200 shadow-sm flex flex-col gap-3 animate-in fade-in duration-200"
            >
              <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
                <span className="text-xs sm:text-sm font-black text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>แบ่งปันเทคนิคการสอน หรือ ไอเดียพัฒนาสมรรถนะ</span>
                </span>
                <span className="text-[10px] text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded-full">
                  ครู & ผู้ปกครองแลกเปลี่ยนกัน
                </span>
              </div>

              {/* Title Input */}
              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">
                  หัวข้อกระทู้ / ประเด็นหลัก <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="เช่น เทคนิคฝึกเด็ก ป.1 ให้คิดเชื่อมโยงกับชีวิตประจำวัน, กิจกรรมลากเส้นคลายเกร็งมือน้องอนุบาล 2"
                  className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Author & Role Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[11px] font-black text-slate-700 block mb-1">
                    ชื่อผู้แบ่งปัน
                  </label>
                  <input
                    type="text"
                    value={newAuthorName}
                    onChange={(e) => setNewAuthorName(e.target.value)}
                    placeholder="เช่น ครูวิภาภรณ์ / แม่น้องเอลซ่า"
                    className="w-full p-2 bg-white rounded-xl border border-slate-300 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-700 block mb-1">
                    บทบาทของคุณ
                  </label>
                  <select
                    value={newAuthorRole}
                    onChange={(e) => {
                      const role = e.target.value as DiscussionAuthorRole;
                      setNewAuthorRole(role);
                      if (role === 'teacher') setNewAuthorAvatar('🍎');
                      else if (role === 'specialist') setNewAuthorAvatar('👩‍🏫');
                      else if (role === 'admin') setNewAuthorAvatar('🛡️');
                      else setNewAuthorAvatar('🏡');
                    }}
                    className="w-full p-2 bg-white rounded-xl border border-slate-300 text-xs text-slate-800 font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="teacher">คุณครู (Teacher) 🍎</option>
                    <option value="parent">ผู้ปกครอง (Parent) 🏡</option>
                    <option value="specialist">ผู้เชี่ยวชาญ / ศึกษานิเทศก์ 👩‍🏫</option>
                    {isAuthorizedAdmin && <option value="admin">ผู้ดูแลระบบ (Admin) 🛡️</option>}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-700 block mb-1">
                    หมวดหมู่
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as DiscussionCategory)}
                    className="w-full p-2 bg-white rounded-xl border border-slate-300 text-xs text-slate-800 font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="early_childhood">🧸 เทคนิคปฐมวัย (8 ทักษะ)</option>
                    <option value="cbe_primary">🎓 พัฒนา 6 สมรรถนะ (สพฐ.)</option>
                    <option value="activity_ideas">💡 ไอเดียกิจกรรมที่บ้าน & รร.</option>
                    <option value="parenting_qa">❓ ปรึกษาพัฒนาการ & สมาธิ</option>
                    <option value="general">🌟 แลกเปลี่ยนทั่วไป</option>
                  </select>
                </div>
              </div>

              {/* Target Curriculum */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[11px] font-black text-slate-700">กลุ่มเป้าหมาย:</span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="targetCurriculum"
                    checked={newTargetCurriculum === 'early_childhood'}
                    onChange={() => setNewTargetCurriculum('early_childhood')}
                    className="text-indigo-600"
                  />
                  <span>🧸 ปฐมวัย (อ.1-3)</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="targetCurriculum"
                    checked={newTargetCurriculum === 'cbe_primary'}
                    onChange={() => setNewTargetCurriculum('cbe_primary')}
                    className="text-indigo-600"
                  />
                  <span>🎓 สมรรถนะ (ป.1-3)</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="targetCurriculum"
                    checked={newTargetCurriculum === 'both'}
                    onChange={() => setNewTargetCurriculum('both')}
                    className="text-indigo-600"
                  />
                  <span>🌟 ใช้ได้ทั้งสองระดับ</span>
                </label>
              </div>

              {/* Detailed Content */}
              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">
                  เนื้อหา / เทคนิคการสอน หรือ ข้อสังเกต <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="อธิบายขั้นตอนการจัดกิจกรรม สิ่งที่เด็กตอบสนอง หรือวิธีที่ใช้แล้วได้ผลจริง..."
                  className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Practical Tips Box */}
              <div>
                <label className="text-[11px] font-black text-amber-800 flex items-center gap-1 mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>เคล็ดลับสั้นๆ ที่นำไปใช้ได้ทันที (Practical Tip)</span>
                </label>
                <input
                  type="text"
                  value={newPracticalTips}
                  onChange={(e) => setNewPracticalTips(e.target.value)}
                  placeholder="เช่น เริ่มต้นด้วยการชวนดูนิทาน AI 3 นาที เพื่อเปิดประเด็นคำถามก่อนทำกิจกรรมจริง"
                  className="w-full p-2 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Tag Selector */}
              <div>
                <label className="text-[11px] font-black text-slate-700 block mb-1">
                  แท็กที่เกี่ยวข้อง (เลือกได้หลายข้อ)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {PRESET_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-1.5 max-w-xs">
                  <input
                    type="text"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomTag();
                      }
                    }}
                    placeholder="พิมพ์แท็กเองแล้วกดเพิ่ม..."
                    className="flex-1 p-1.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomTag}
                    className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    เพิ่มแท็ก
                  </button>
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-indigo-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingPost(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white text-xs font-black shadow-xs transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'กำลังบันทึก...' : 'โพสต์กระทู้ทันที'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Edit Post Modal (Admin feature) */}
          {editingPost && isAuthorizedAdmin && (
            <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
              <form
                onSubmit={handleSaveEditPostSubmit}
                className="bg-white rounded-3xl p-5 border-2 border-purple-300 shadow-2xl max-w-2xl w-full flex flex-col gap-3.5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-2 border-b border-purple-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-black">
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        แก้ไขกระทู้ (สิทธิ์ผู้ดูแลระบบ: {currentUser?.email})
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        โพสต์โดย: {editingPost.authorName}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    หัวข้อกระทู้
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-black text-slate-700 block mb-1">
                      หมวดหมู่
                    </label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value as DiscussionCategory)}
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="early_childhood">🧸 เทคนิคปฐมวัย (8 ทักษะ)</option>
                      <option value="cbe_primary">🎓 พัฒนา 6 สมรรถนะ (สพฐ.)</option>
                      <option value="activity_ideas">💡 ไอเดียกิจกรรมที่บ้าน & รร.</option>
                      <option value="parenting_qa">❓ ปรึกษาพัฒนาการ & สมาธิ</option>
                      <option value="general">🌟 แลกเปลี่ยนทั่วไป</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-700 block mb-1">
                      ระดับชั้นเป้าหมาย
                    </label>
                    <select
                      value={editTargetCurriculum}
                      onChange={(e) => setEditTargetCurriculum(e.target.value as DiscussionTargetCurriculum)}
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="both">🌟 ใช้ได้ทั้งสองระดับ</option>
                      <option value="early_childhood">🧸 ปฐมวัย (อ.1-3)</option>
                      <option value="cbe_primary">🎓 สมรรถนะ (ป.1-3)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    เนื้อหา / คำอธิบายเทคนิค
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-amber-800 flex items-center gap-1 mb-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>เคล็ดลับปฏิบัติจริง (Actionable Tip)</span>
                  </label>
                  <input
                    type="text"
                    value={editPracticalTips}
                    onChange={(e) => setEditPracticalTips(e.target.value)}
                    className="w-full p-2 bg-amber-50/70 border border-amber-200 rounded-xl text-xs font-medium text-slate-800"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingEdit}
                    className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-xs transition-colors flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isSavingEdit ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Delete Confirmation Modal (Admin feature) */}
          {postToDelete && isAuthorizedAdmin && (
            <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-5 border-2 border-rose-200 shadow-2xl max-w-sm w-full flex flex-col gap-3 animate-in zoom-in-95 duration-150">
                <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <h4 className="text-base font-black text-slate-900">
                    ยืนยันการลบกระทู้นี้?
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    &quot;{postToDelete.title}&quot;
                  </p>
                  <p className="text-[11px] text-rose-600 font-bold mt-1.5">
                    ข้อความและความคิดเห็นทั้งหมดในกระทู้นี้จะถูกลบออกจากระบบอย่างถาวร
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setPostToDelete(null)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDeletePost}
                    disabled={isDeleting}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isDeleting ? 'กำลังลบ...' : 'ยืนยันลบ'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reset Discussions Confirmation Modal */}
          {showResetConfirm && isAuthorizedAdmin && (
            <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-2xl max-w-sm w-full flex flex-col gap-3 animate-in zoom-in-95 duration-150">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl mx-auto">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <h4 className="text-base font-black text-slate-900">
                    คืนค่ากระทู้เริ่มต้นทั้งหมด?
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    ระบบจะนำกระทู้แนะนำและตัวอย่างมาตรฐานกลับมาใช้งานใหม่
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-xs"
                  >
                    ยืนยันคืนค่า
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Discussion List */}
          {filteredDiscussions.length === 0 ? (
            <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-6">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-30 text-indigo-400" />
              <h4 className="text-sm font-black text-slate-700">ยังไม่พบหัวข้อเสวนาในหมวดนี้</h4>
              <p className="text-xs text-slate-400 mt-1">
                คลิกปุ่ม &quot;แชร์เทคนิค / ตั้งกระทู้ใหม่&quot; ด้านบนเพื่อเป็นคนแรกที่แบ่งปันไอเดีย!
              </p>
            </div>
          ) : (
            filteredDiscussions.map((post) => {
              const isExpanded = expandedPostIds.has(post.id);
              const roleBadge = getRoleBadge(post.authorRole);
              const replies = post.replies || [];

              return (
                <div
                  key={post.id}
                  className={`rounded-3xl border transition-all ${
                    post.isPinned
                      ? 'bg-gradient-to-br from-amber-50/50 via-white to-indigo-50/40 border-amber-300/80 shadow-xs ring-1 ring-amber-200'
                      : 'bg-white border-slate-200 hover:border-indigo-200 shadow-2xs'
                  }`}
                >
                  <div className="p-4 sm:p-5 flex flex-col gap-3">
                    {/* Top Row: Author info, Role, Pinned status, Curriculum + ADMIN ACTIONS */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-2xs shrink-0">
                          {post.authorAvatar || '💬'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs sm:text-sm font-black text-slate-900">
                              {post.authorName}
                            </span>
                            <span
                              className={`text-[9px] font-black px-1.5 py-0.2 rounded-md border ${roleBadge.bg}`}
                            >
                              {roleBadge.label}
                            </span>
                            {post.isPinned && (
                              <span className="bg-amber-100 text-amber-900 text-[9px] font-black px-2 py-0.2 rounded-full border border-amber-300 flex items-center gap-1">
                                <Pin className="w-2.5 h-2.5" />
                                <span>แนะนำ</span>
                              </span>
                            )}
                            {post.isLocked && (
                              <span className="bg-slate-200 text-slate-700 text-[9px] font-black px-2 py-0.2 rounded-full flex items-center gap-1">
                                <Lock className="w-2.5 h-2.5" />
                                <span>ล็อกตอบกลับ</span>
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(post.createdAt).toLocaleDateString('th-TH', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })} น.
                          </span>
                        </div>
                      </div>

                      {/* Curriculum Badge & ADMIN ACTION BUTTONS */}
                      <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                        {post.targetCurriculum === 'cbe_primary' ? (
                          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            <span>สมรรถนะ (ป.1-3)</span>
                          </span>
                        ) : post.targetCurriculum === 'early_childhood' ? (
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                            <Baby className="w-3 h-3" />
                            <span>ปฐมวัย (อ.1-3)</span>
                          </span>
                        ) : (
                          <span className="bg-teal-50 text-teal-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-teal-200 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>ใช้ร่วมกัน</span>
                          </span>
                        )}

                        {/* ADMIN ACTIONS TOOLBAR ON POST (Visible ONLY to the 3 Authorized Admin Emails) */}
                        {isAdminMode && isAuthorizedAdmin && (
                          <div className="flex items-center gap-1 bg-purple-50 p-1 rounded-xl border border-purple-200 ml-1">
                            {/* Pin / Unpin button */}
                            <button
                              type="button"
                              onClick={() => handleTogglePin(post.id)}
                              className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                post.isPinned
                                  ? 'bg-amber-400 text-amber-950 shadow-2xs'
                                  : 'text-purple-700 hover:bg-purple-200'
                              }`}
                              title={post.isPinned ? 'ถอนการปักหมุดกระทู้' : 'ปักหมุดกระทู้แนะนำ'}
                            >
                              <Pin className="w-3.5 h-3.5" />
                            </button>

                            {/* Lock / Unlock comments button */}
                            <button
                              type="button"
                              onClick={() => handleToggleLock(post.id)}
                              className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                post.isLocked
                                  ? 'bg-slate-700 text-white shadow-2xs'
                                  : 'text-purple-700 hover:bg-purple-200'
                              }`}
                              title={post.isLocked ? 'ปลดล็อกเปิดรับความคิดเห็น' : 'ล็อกปิดรับความคิดเห็น'}
                            >
                              {post.isLocked ? (
                                <Lock className="w-3.5 h-3.5 text-white" />
                              ) : (
                                <Unlock className="w-3.5 h-3.5 text-purple-700" />
                              )}
                            </button>

                            {/* Edit Post button */}
                            <button
                              type="button"
                              onClick={() => handleStartEditPost(post)}
                              className="p-1.5 rounded-lg text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                              title="แก้ไขเนื้อหากระทู้"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Post button */}
                            <button
                              type="button"
                              onClick={() => setPostToDelete(post)}
                              className="p-1.5 rounded-lg text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                              title="ลบกระทู้นี้ออกจากระบบ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                      {post.title}
                    </h3>

                    {/* Post Content */}
                    <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Practical Tips Box (if provided) */}
                    {post.practicalTips && (
                      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-2.5 sm:p-3 flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <span className="text-base shrink-0 mt-0.5">💡</span>
                          <div>
                            <span className="text-[10px] font-black text-amber-900 uppercase tracking-wide block">
                              เคล็ดลับปฏิบัติจริง (Actionable Tip):
                            </span>
                            <span className="text-xs text-amber-950 font-medium">
                              {post.practicalTips}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyTip(post.practicalTips!, post.id)}
                          className="shrink-0 p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-black transition-colors cursor-pointer flex items-center gap-1"
                          title="คัดลอกข้อความเคล็ดลับ"
                        >
                          {copiedTipId === post.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span className="text-emerald-800">คัดลอกแล้ว</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3 h-3" />
                              <span className="hidden sm:inline">นำไปใช้</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md hover:bg-slate-200 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom Action Bar: Likes, Reply Toggle */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <div className="flex items-center gap-3">
                        {/* Like Button */}
                        <button
                          type="button"
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all cursor-pointer font-black text-xs ${
                            post.likedByMe
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : 'hover:bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              post.likedByMe ? 'fill-rose-500 text-rose-500' : ''
                            }`}
                          />
                          <span>{post.likes || 0}</span>
                          <span className="hidden sm:inline text-[11px] font-normal">ถูกใจ</span>
                        </button>

                        {/* Reply Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleReplies(post.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer font-black text-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{replies.length}</span>
                          <span className="text-[11px] font-normal">ความคิดเห็น</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleReplies(post.id)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-black flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>{isExpanded ? 'ย่อความคิดเห็น' : 'ดูความคิดเห็น / ตอบกลับ'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Replies Drawer */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-slate-50/60 rounded-b-3xl flex flex-col gap-3 animate-in fade-in duration-150">
                      <div className="text-xs font-black text-slate-700 flex items-center gap-1.5 pt-2">
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        <span>ความคิดเห็นและการแลกเปลี่ยน ({replies.length} ข้อความ):</span>
                      </div>

                      {/* Replies List */}
                      {replies.length === 0 ? (
                        <p className="text-xs text-slate-400 italic py-2 text-center">
                          ยังไม่มีความคิดเห็น มาร่วมเป็นคนแรกที่แลกเปลี่ยนเทคนิคกันครับ!
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {replies.map((reply) => {
                            const repRoleBadge = getRoleBadge(reply.authorRole);
                            return (
                              <div
                                key={reply.id}
                                className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs flex flex-col gap-1.5"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-sm shrink-0">
                                      {reply.authorAvatar || '💬'}
                                    </div>
                                    <span className="text-xs font-black text-slate-800">
                                      {reply.authorName}
                                    </span>
                                    <span
                                      className={`text-[8px] font-black px-1.5 py-0.2 rounded-md border ${repRoleBadge.bg}`}
                                    >
                                      {repRoleBadge.label}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-slate-400">
                                      {new Date(reply.createdAt).toLocaleDateString('th-TH', {
                                        day: 'numeric',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })} น.
                                    </span>

                                    <button
                                      type="button"
                                      onClick={() => handleLikeReply(post.id, reply.id)}
                                      className={`p-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold ${
                                        reply.likedByMe
                                          ? 'text-rose-600 font-black'
                                          : 'text-slate-400 hover:text-slate-700'
                                      }`}
                                      title="ถูกใจความคิดเห็นนี้"
                                    >
                                      <Heart
                                        className={`w-3 h-3 ${
                                          reply.likedByMe ? 'fill-rose-500 text-rose-500' : ''
                                        }`}
                                      />
                                      <span>{reply.likes || 0}</span>
                                    </button>

                                    {/* Admin Action: Delete Reply (Visible only to authorized admin) */}
                                    {isAdminMode && isAuthorizedAdmin && (
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteReply(post.id, reply.id)}
                                        className="p-1 text-slate-300 hover:text-rose-600 rounded transition-colors cursor-pointer"
                                        title="ลบความคิดเห็นนี้ (ผู้ดูแลระบบ)"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                </div>

                                <p className="text-xs text-slate-700 pl-9 leading-relaxed font-normal">
                                  {reply.content}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Reply Input Box (or Locked Notice) */}
                      {post.isLocked ? (
                        <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-2xl text-center text-xs text-slate-500 font-bold flex items-center justify-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          <span>กระทู้นี้ถูกปิดรับความคิดเห็นเพิ่มเติมโดยผู้ดูแลระบบ</span>
                        </div>
                      ) : (
                        <div className="mt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <select
                            value={replyRoleMap[post.id] || (isAdminMode && isAuthorizedAdmin ? 'teacher' : 'parent')}
                            onChange={(e) =>
                              setReplyRoleMap((prev) => ({
                                ...prev,
                                [post.id]: e.target.value as DiscussionAuthorRole,
                              }))
                            }
                            className="bg-white border border-slate-300 rounded-xl px-2 py-2 text-xs text-slate-700 font-bold focus:outline-none cursor-pointer shrink-0"
                          >
                            <option value="teacher">ครู 🍎</option>
                            <option value="parent">ผู้ปกครอง 🏡</option>
                            <option value="specialist">ผู้เชี่ยวชาญ 👩‍🏫</option>
                            {isAuthorizedAdmin && <option value="admin">ผู้ดูแลระบบ 🛡️</option>}
                          </select>

                          <div className="relative flex-1">
                            <input
                              type="text"
                              value={replyInputMap[post.id] || ''}
                              onChange={(e) =>
                                setReplyInputMap((prev) => ({
                                  ...prev,
                                  [post.id]: e.target.value,
                                }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleSendReply(post.id);
                                }
                              }}
                              placeholder="เขียนตอบกลับ หรือ แบ่งปันเทคนิคเพิ่มเติม..."
                              className="w-full pl-3 pr-10 py-2 bg-white rounded-xl border border-slate-300 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleSendReply(post.id)}
                              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shadow-2xs"
                              title="ส่งความคิดเห็น"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {isAuthorizedAdmin
                ? `โหมดผู้ดูแลระบบ: ${currentUser?.email} (มีสิทธิ์ปักหมุด แก้ไข ล็อก และลบกระทู้)`
                : 'พื้นที่ปลอดภัยสำหรับครูและผู้ปกครอง แลกเปลี่ยนเพื่อการพัฒนาเด็กอย่างรอบด้าน'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>

      {/* Admin Authorization / Login Modal (เปิดให้เฉพาะ 3 บัญชีอีเมลนี้เท่านั้น) */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 z-70 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-purple-300 shadow-2xl max-w-md w-full flex flex-col gap-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-purple-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900">
                    การจัดการกระทู้สำหรับผู้ดูแลระบบ
                  </h4>
                  <p className="text-[11px] text-purple-700 font-bold">
                    สิทธิ์เฉพาะผู้ดูแลระบบโรงเรียนและผู้พัฒนาระบบ
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAdminLoginModal(false);
                  setAuthErrorMessage(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of 3 Allowed Emails Notice */}
            <div className="bg-purple-50/90 rounded-2xl p-3.5 border border-purple-200">
              <span className="text-xs font-black text-purple-950 flex items-center gap-1.5 mb-2">
                <Mail className="w-4 h-4 text-purple-700" />
                <span>เปิดให้เฉพาะ 3 บัญชีอีเมลนี้เท่านั้น:</span>
              </span>
              <ul className="space-y-1.5 text-xs">
                {DISCUSSION_ADMIN_EMAILS.map((email, idx) => {
                  const isCurrent = currentUser?.email?.toLowerCase().trim() === email.toLowerCase().trim();
                  return (
                    <li
                      key={idx}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl border font-mono text-[11px] ${
                        isCurrent
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
                          : 'bg-white text-purple-900 border-purple-150'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-emerald-600' : 'text-purple-400'}`} />
                        <span className="truncate">{email}</span>
                      </span>
                      {isCurrent && (
                        <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.2 rounded font-sans shrink-0">
                          เข้าใช้อยู่
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Current Auth Status & Actions */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs">
              <span className="text-slate-500 font-medium block mb-1">สถานะการลงชื่อเข้าใช้:</span>
              {currentUser ? (
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-bold text-slate-800 truncate font-mono text-[11px]">
                      {currentUser.email}
                    </span>
                  </div>
                  {isAuthorizedAdmin ? (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                      มีสิทธิ์ผู้ดูแลระบบ ✓
                    </span>
                  ) : (
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md font-bold">
                      ไม่มีสิทธิ์จัดการ
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-slate-400 italic">ยังไม่ได้ลงชื่อเข้าใช้ด้วยบัญชี Google</span>
              )}
            </div>

            {/* Error Message */}
            {authErrorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-medium flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{authErrorMessage}</span>
              </div>
            )}

            {/* Login / Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              {!isAuthorizedAdmin ? (
                <button
                  type="button"
                  onClick={handleAdminGoogleSignIn}
                  disabled={isLoggingIn}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white rounded-2xl text-xs font-black shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isLoggingIn ? 'กำลังเข้าสู่ระบบ Google...' : 'ลงชื่อเข้าใช้ด้วยบัญชี Google ที่ได้รับอนุญาต'}</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminMode(true);
                      setShowAdminLoginModal(false);
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>เริ่มจัดการกระทู้</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAdminLogout}
                    className="w-full py-2 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>ออกจากระบบ</span>
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowAdminLoginModal(false);
                  setAuthErrorMessage(null);
                }}
                className="w-full py-2 text-slate-500 hover:text-slate-700 text-xs font-bold transition-colors"
              >
                ปิดหน้าต่างนี้
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
