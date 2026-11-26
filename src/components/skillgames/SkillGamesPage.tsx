import React, { useState, useCallback, useMemo } from 'react';
import { Grade, ChildProfile, GameSettings } from '../../types';
import { MatchingGameView } from './MatchingGameView';
import { SequenceSortingView } from './SequenceSortingView';
import { JigsawPuzzleView } from './JigsawPuzzleView';
import { RuleBasedGameView } from './RuleBasedGameView';
import { MazePathView } from './MazePathView';
import { ShadowTangramView } from './ShadowTangramView';
import { SpotDifferencesView } from './SpotDifferencesView';
import { AuditoryRhythmView } from './AuditoryRhythmView';
import { WhatsMissingView } from './WhatsMissingView';
import { EmotionSocialView } from './EmotionSocialView';
import { BalanceMathView } from './BalanceMathView';
import { BodyMovementView } from './BodyMovementView';
import { CalmMindView } from './CalmMindView';
import { SocialMannersView } from './SocialMannersView';
import { BrainFlexView } from './BrainFlexView';
import { EFSequenceMemoryView } from './EFSequenceMemoryView';
import { EFStopAndGoView } from './EFStopAndGoView';
import { EFFocusDistractionView } from './EFFocusDistractionView';
import { SocialSharingView } from './SocialSharingView';
import { SocialEmpathyHelpingView } from './SocialEmpathyHelpingView';
import { EmotionDetectiveView } from './EmotionDetectiveView';
import { MindfulNatureArtView } from './MindfulNatureArtView';
import { FineMotorTracingView } from './FineMotorTracingView';
import { RhythmGrossMotorView } from './RhythmGrossMotorView';
import { soundEffects, speakText } from '../../services/audioService';
import {
  triggerRoundSuccessConfetti,
  triggerInteractiveConfetti,
} from '../../utils/confettiCelebration';
import { PendingSyncIndicator } from '../PendingSyncIndicator';
import { PWAInstallButton } from '../PWAInstallButton';
import { LearningBuddyMascot } from '../LearningBuddyMascot';
import { recordSkillGameSessionDual } from '../../services/cloudSyncService';
import { ClassroomRoom, updateStudentPresence } from '../../services/classroomRoomService';
import { PreGameStoryModal } from '../PreGameStoryModal';
import {
  ArrowLeft,
  Sparkles,
  Gamepad2,
  Puzzle,
  Layers,
  ShieldCheck,
  Award,
  Volume2,
  VolumeX,
  Compass,
  Eye,
  Search,
  Music,
  Wand2,
  Heart,
  Scale,
  Filter,
  Play,
  Brain,
  Target,
  Zap,
} from 'lucide-react';

export type SkillGameCategory =
  | 'matching'
  | 'sequence_sorting'
  | 'jigsaw'
  | 'rules'
  | 'maze_path'
  | 'shadow_tangram'
  | 'spot_differences'
  | 'auditory_rhythm'
  | 'whats_missing'
  | 'emotion_social'
  | 'balance_math'
  | 'body_movement'
  | 'calm_mind'
  | 'social_manners'
  | 'brain_flex'
  | 'ef_sequence_memory'
  | 'ef_stop_and_go'
  | 'ef_focus_distraction'
  | 'social_sharing'
  | 'social_empathy_helping'
  | 'emotion_detective'
  | 'mindful_nature_art'
  | 'fine_motor_tracing'
  | 'rhythm_gross_motor';

export type DevelopmentalDomainFilter =
  | 'all'
  | 'physical'
  | 'emotional'
  | 'social'
  | 'intellectual'
  | 'ef';

interface SkillGamesPageProps {
  currentGrade: Grade;
  onGradeChange: (grade: Grade) => void;
  onReturnToHome: () => void;
  studentProfile?: { name: string; grade: Grade; avatar?: string; avatarBg?: string } | ChildProfile | null;
  isGuestMode?: boolean;
  onSwitchProfile?: () => void;
  soundVolume: number;
  settings?: GameSettings;
  onToggleSound?: () => void;
  onOpenFunFacts?: () => void;
  onOpenClassroomRoom?: () => void;
  activeClassroomRoom?: ClassroomRoom | null;
}

const DEFAULT_SKILL_SETTINGS: GameSettings = {
  dwellTimeSeconds: 1.2,
  questionsPerRound: 10,
  selectedSubjects: ['math'],
  theme: 'sunny',
  voicePersona: 'child_girl',
  language: 'th',
  autoSpeak: true,
  soundVolume: 0.8,
  cameraMirrored: true,
  showCameraFeed: true,
  handPointerScale: 1,
  controlMode: 'auto',
};

export const SkillGamesPage: React.FC<SkillGamesPageProps> = ({
  currentGrade,
  onGradeChange,
  onReturnToHome,
  studentProfile,
  isGuestMode = false,
  onSwitchProfile,
  soundVolume,
  settings,
  onToggleSound,
  onOpenFunFacts,
  onOpenClassroomRoom,
  activeClassroomRoom,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillGameCategory>('matching');
  const [domainFilter, setDomainFilter] = useState<DevelopmentalDomainFilter>('all');
  const [totalStarsEarned, setTotalStarsEarned] = useState<number>(0);
  const [gameStartedKey, setGameStartedKey] = useState<number>(0);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const effectiveMascotSettings = useMemo(
    () => ({
      ...(settings || DEFAULT_SKILL_SETTINGS),
      soundVolume,
    }),
    [settings, soundVolume]
  );


  const handleEarnStar = useCallback(() => {
    setTotalStarsEarned((prev) => prev + 1);

    // Particle confetti animation celebrating round completion
    triggerRoundSuccessConfetti({
      starCount: 3,
      isPerfect: true,
      origin: { x: 0.5, y: 0.5 },
    });

    if (!isGuestMode && studentProfile && 'id' in studentProfile) {
      recordSkillGameSessionDual(studentProfile as ChildProfile, selectedCategory, 1, 1, 30).catch((e) => {
        console.warn('Error recording skill game session:', e);
      });

      if (activeClassroomRoom) {
        updateStudentPresence(activeClassroomRoom.roomId, (studentProfile as ChildProfile).id, {
          starsEarned: totalStarsEarned + 1,
          currentGame: `เกม: ${selectedCategory}`,
          status: 'active',
        });
      }
    }
  }, [studentProfile, isGuestMode, selectedCategory, activeClassroomRoom, totalStarsEarned]);

  const handleSelectCategory = (cat: SkillGameCategory) => {
    soundEffects.playTap(soundVolume);
    setSelectedCategory(cat);
    setGameStartedKey((k) => k + 1);

    if (activeClassroomRoom && studentProfile && 'id' in studentProfile) {
      updateStudentPresence(activeClassroomRoom.roomId, (studentProfile as ChildProfile).id, {
        currentGame: `เกม: ${cat}`,
        currentLevel: 'เลือกด่าน',
        status: 'active',
      });
    }
  };

  const categories = useMemo(() => [
    // 1. Matching
    {
      id: 'matching' as SkillGameCategory,
      title: 'จับคู่ภาพเหมือน & สัมพันธ์',
      subtitle: 'ฝึกความจำและการสังเกตภาพ',
      icon: '🧩',
      domain: 'intellectual' as const,
      domainLabel: 'สติปัญญา / EF',
      domainColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      activeBorder: 'border-indigo-500 ring-3 ring-indigo-300',
      accentColor: 'from-indigo-500 to-blue-600',
    },
    // 2. Sequence & Sorting
    {
      id: 'sequence_sorting' as SkillGameCategory,
      title: 'เรียงลำดับ & จัดหมวดหมู่',
      subtitle: 'วงจรชีวิต ขนาด และแยกสิ่งของ',
      icon: '🔢',
      domain: 'intellectual' as const,
      domainLabel: 'สติปัญญา / วิทยาศาสตร์',
      domainColor: 'bg-amber-100 text-amber-800 border-amber-200',
      activeBorder: 'border-amber-500 ring-3 ring-amber-300',
      accentColor: 'from-amber-500 to-orange-600',
    },
    // 3. Jigsaw
    {
      id: 'jigsaw' as SkillGameCategory,
      title: 'ต่อภาพ (จิ๊กซอว์)',
      subtitle: 'ต่อภาพ 4, 6, 9 ชิ้น มิติสัมพันธ์',
      icon: '🖼️',
      domain: 'intellectual' as const,
      domainLabel: 'มิติสัมพันธ์ / ศิลปะ',
      domainColor: 'bg-teal-100 text-teal-800 border-teal-200',
      activeBorder: 'border-teal-500 ring-3 ring-teal-300',
      accentColor: 'from-teal-500 to-emerald-600',
    },
    // 4. Rule-Based
    {
      id: 'rules' as SkillGameCategory,
      title: 'เกมตามกฎกติกาง่าย ๆ',
      subtitle: 'คุณครูหมีสั่งว่า & ไฟเขียวไฟแดง',
      icon: '🚦',
      domain: 'physical' as const,
      domainLabel: 'ร่างกาย / ยับยั้งชั่งใจ',
      domainColor: 'bg-rose-100 text-rose-800 border-rose-200',
      activeBorder: 'border-rose-500 ring-3 ring-rose-300',
      accentColor: 'from-rose-500 to-pink-600',
    },
    // 5. Maze & Path Tracing
    {
      id: 'maze_path' as SkillGameCategory,
      title: 'เขาวงกต & ลากเส้นตามรอย',
      subtitle: 'พาสัตว์น้อยเดินทาง กล้ามเนื้อมัดเล็ก',
      icon: '🧭',
      domain: 'physical' as const,
      domainLabel: 'กล้ามเนื้อมัดเล็ก / ร่างกาย',
      domainColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      activeBorder: 'border-emerald-500 ring-3 ring-emerald-300',
      accentColor: 'from-emerald-500 to-teal-600',
    },
    // 6. Shadow & Tangram
    {
      id: 'shadow_tangram' as SkillGameCategory,
      title: 'เงาปริศนา & แทนแกรม',
      subtitle: 'ทายภาพเงา และประกอบรูปทรงเรขาคณิต',
      icon: '👤',
      domain: 'intellectual' as const,
      domainLabel: 'สติปัญญา / รูปทรง',
      domainColor: 'bg-purple-100 text-purple-800 border-purple-200',
      activeBorder: 'border-purple-500 ring-3 ring-purple-300',
      accentColor: 'from-purple-500 to-indigo-600',
    },
    // 7. Spot the Differences
    {
      id: 'spot_differences' as SkillGameCategory,
      title: 'จับผิดภาพ & ค้นหาสิ่งของ',
      subtitle: 'เปรียบเทียบ 2 ภาพ สายตาและการสังเกต',
      icon: '🔍',
      domain: 'intellectual' as const,
      domainLabel: 'สืบเสาะ / สังเกต',
      domainColor: 'bg-amber-100 text-amber-800 border-amber-200',
      activeBorder: 'border-amber-500 ring-3 ring-amber-300',
      accentColor: 'from-amber-500 to-yellow-600',
    },
    // 8. Auditory Discrimination & Rhythm
    {
      id: 'auditory_rhythm' as SkillGameCategory,
      title: 'ฟังเสียง & เคาะจังหวะ',
      subtitle: 'ทายเสียงสัตว์/ยานพาหนะ และเคาะโน้ตดนตรี',
      icon: '🎵',
      domain: 'emotional' as const,
      domainLabel: 'อารมณ์ / สุนทรียภาพ',
      domainColor: 'bg-rose-100 text-rose-800 border-rose-200',
      activeBorder: 'border-rose-500 ring-3 ring-rose-300',
      accentColor: 'from-rose-500 to-pink-600',
    },
    // 9. What's Missing & Working Memory
    {
      id: 'whats_missing' as SkillGameCategory,
      title: 'อะไรเอ่ยหายไป? (EF)',
      subtitle: 'ผ้าคลุมเวทมนตร์ ฝึกความจำขณะทำงาน',
      icon: '🪄',
      domain: 'ef' as const,
      domainLabel: 'Working Memory (EF)',
      domainColor: 'bg-teal-100 text-teal-800 border-teal-200',
      activeBorder: 'border-teal-500 ring-3 ring-teal-300',
      accentColor: 'from-teal-500 to-cyan-600',
    },
    // 10. Social-Emotional Learning
    {
      id: 'emotion_social' as SkillGameCategory,
      title: 'เข้าใจอารมณ์ & สถานการณ์',
      subtitle: 'อ่านสีหน้าความรู้สึก และจำลองน้ำใจแบ่งปัน',
      icon: '💖',
      domain: 'social' as const,
      domainLabel: 'สังคม / อารมณ์-จิตใจ',
      domainColor: 'bg-pink-100 text-pink-800 border-pink-200',
      activeBorder: 'border-pink-500 ring-3 ring-pink-300',
      accentColor: 'from-pink-500 to-rose-600',
    },
    // 11. Balance & Pre-Math Scale
    {
      id: 'balance_math' as SkillGameCategory,
      title: 'ตราชั่งน้ำหนัก & คณิตปฐมวัย',
      subtitle: 'หนักกว่า-เบากว่า ตราชั่งสองแขนสมดุล',
      icon: '⚖️',
      domain: 'intellectual' as const,
      domainLabel: 'คณิตศาสตร์ / ตรรกะ',
      domainColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      activeBorder: 'border-indigo-600 ring-3 ring-indigo-300',
      accentColor: 'from-indigo-600 to-blue-700',
    },
    // 12. Body Movement (ร่างกาย)
    {
      id: 'body_movement' as SkillGameCategory,
      title: 'กายบริหาร & ท่าทางหรรษา',
      subtitle: '22 ท่าสัตว์แสนสนุก พร้อมภาพจำลองประกอบ',
      icon: '🏃',
      domain: 'physical' as const,
      domainLabel: 'ร่างกาย / มอเตอร์',
      domainColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      activeBorder: 'border-emerald-500 ring-3 ring-emerald-300',
      accentColor: 'from-emerald-500 to-teal-600',
    },
    // 13. Calm Mind (อารมณ์)
    {
      id: 'calm_mind' as SkillGameCategory,
      title: 'คลายใจ & ลมหายใจสุขสันต์',
      subtitle: '22 กิจกรรมลมหายใจ ขวดดาว คลายอารมณ์',
      icon: '💖',
      domain: 'emotional' as const,
      domainLabel: 'อารมณ์ / ผ่อนคลาย',
      domainColor: 'bg-pink-100 text-pink-800 border-pink-200',
      activeBorder: 'border-pink-500 ring-3 ring-pink-300',
      accentColor: 'from-pink-500 to-rose-600',
    },
    // 14. Social Manners (สังคม)
    {
      id: 'social_manners' as SkillGameCategory,
      title: 'มารยาทดี & เพื่อนรักแบ่งปัน',
      subtitle: '22 สถานการณ์จำลอง ช่วยเหลือ แบ่งปันน้ำใจ',
      icon: '🤝',
      domain: 'social' as const,
      domainLabel: 'สังคม / มารยาทน้ำใจ',
      domainColor: 'bg-violet-100 text-violet-800 border-violet-200',
      activeBorder: 'border-violet-500 ring-3 ring-violet-300',
      accentColor: 'from-violet-500 to-purple-600',
    },
    // 15. Brain Flex EF (ทักษะสมอง)
    {
      id: 'brain_flex' as SkillGameCategory,
      title: 'ยืดหยุ่นความคิด & กฎตรงข้าม',
      subtitle: '23 ภารกิจกฎตรงข้าม สลับกติกา ทักษะสมอง EF',
      icon: '🧠',
      domain: 'ef' as const,
      domainLabel: 'ยืดหยุ่นความคิด EF',
      domainColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      activeBorder: 'border-cyan-500 ring-3 ring-cyan-300',
      accentColor: 'from-cyan-500 to-teal-600',
    },
    // 16. EF Sequence Memory (ความจำลำดับภาพ-เสียง)
    {
      id: 'ef_sequence_memory' as SkillGameCategory,
      title: 'จำลำดับเสียง & สัตว์ดนตรี',
      subtitle: 'ฝึกความจำขณะทำงาน Working Memory จำลำดับ 2-6 ขั้น',
      icon: '🎵',
      domain: 'ef' as const,
      domainLabel: 'ความจำลำดับ EF',
      domainColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      activeBorder: 'border-cyan-500 ring-3 ring-cyan-300',
      accentColor: 'from-cyan-500 to-blue-600',
    },
    // 17. EF Stop & Go (ยับยั้งชั่งใจ & ไฟเขียวไฟแดง)
    {
      id: 'ef_stop_and_go' as SkillGameCategory,
      title: 'ยับยั้งใจ & ไฟเขียวไฟแดง',
      subtitle: 'ฝึกควบคุมตนเอง ยับยั้งชั่งใจ Stop & Think รอคอย',
      icon: '🚦',
      domain: 'ef' as const,
      domainLabel: 'ยับยั้งชั่งใจ EF',
      domainColor: 'bg-rose-100 text-rose-800 border-rose-200',
      activeBorder: 'border-rose-500 ring-3 ring-rose-300',
      accentColor: 'from-rose-500 to-red-600',
    },
    // 18. EF Focus & Distraction (สมาธิจดจ่อ & คัดกรองตัวรบกวน)
    {
      id: 'ef_focus_distraction' as SkillGameCategory,
      title: 'สมาธิตามล่า & คัดกรองตัวกวน',
      subtitle: 'ฝึกสมาธิจดจ่อ ไม่ว่อกแว่ก Selective Attention',
      icon: '🎯',
      domain: 'ef' as const,
      domainLabel: 'สมาธิจดจ่อ EF',
      domainColor: 'bg-teal-100 text-teal-800 border-teal-200',
      activeBorder: 'border-teal-500 ring-3 ring-teal-300',
      accentColor: 'from-teal-500 to-emerald-600',
    },
    // 19. Social Sharing (สังคม & น้ำใจ)
    {
      id: 'social_sharing' as SkillGameCategory,
      title: 'เกมแบ่งปัน & จัดของร่วมมือ',
      subtitle: 'ฝึกแบ่งปันของเล่นและขนมอย่างเท่าเทียม',
      icon: '🤝',
      domain: 'social' as const,
      domainLabel: 'สังคม / แบ่งปันน้ำใจ',
      domainColor: 'bg-violet-100 text-violet-800 border-violet-200',
      activeBorder: 'border-violet-500 ring-3 ring-violet-300',
      accentColor: 'from-violet-500 to-pink-600',
    },
    // 20. Social Empathy & Helping (สังคม & น้ำใจ)
    {
      id: 'social_empathy_helping' as SkillGameCategory,
      title: 'อาสาช่วยเหลือ & น้ำใจเพื่อนรัก',
      subtitle: 'สังเกตสถานการณ์ ยื่นมือช่วยเหลือด้วยความอ่อนโยน',
      icon: '🤲',
      domain: 'social' as const,
      domainLabel: 'สังคม / จิตอาสาช่วยเหลือ',
      domainColor: 'bg-pink-100 text-pink-800 border-pink-200',
      activeBorder: 'border-pink-500 ring-3 ring-pink-300',
      accentColor: 'from-pink-500 to-rose-600',
    },
    // 21. Emotion Detective (อารมณ์ - จิตใจ)
    {
      id: 'emotion_detective' as SkillGameCategory,
      title: 'นักสืบสีหน้า & วงล้อความรู้สึก',
      subtitle: 'อ่านอารมณ์สีหน้าแววตา และวิธีดูแลใจตนเอง',
      icon: '🔍',
      domain: 'emotional' as const,
      domainLabel: 'อารมณ์ / รู้เท่าทันใจ',
      domainColor: 'bg-rose-100 text-rose-800 border-rose-200',
      activeBorder: 'border-rose-500 ring-3 ring-rose-300',
      accentColor: 'from-rose-500 to-pink-600',
    },
    // 22. Mindful Nature Art (อารมณ์ - จิตใจ)
    {
      id: 'mindful_nature_art' as SkillGameCategory,
      title: 'สุนทรียภาพ & ศิลปะผ่อนคลาย',
      subtitle: 'ฟังเสียงธรรมชาติ ผ่อนคลายอารมณ์และจิตใจ',
      icon: '🌸',
      domain: 'emotional' as const,
      domainLabel: 'อารมณ์ / สุนทรียภาพสงบ',
      domainColor: 'bg-pink-100 text-pink-800 border-pink-200',
      activeBorder: 'border-pink-500 ring-3 ring-pink-300',
      accentColor: 'from-pink-500 to-teal-600',
    },
    // 23. Fine Motor Tracing (ร่างกาย & มอเตอร์)
    {
      id: 'fine_motor_tracing' as SkillGameCategory,
      title: 'ลากเส้นประสานตา & นิ้วมือ',
      subtitle: 'พัฒนากล้ามเนื้อมัดเล็ก ประสานสายตาและมือ',
      icon: '🧭',
      domain: 'physical' as const,
      domainLabel: 'กล้ามเนื้อมัดเล็ก / มอเตอร์',
      domainColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      activeBorder: 'border-emerald-500 ring-3 ring-emerald-300',
      accentColor: 'from-emerald-500 to-teal-600',
    },
    // 24. Rhythm Gross Motor (ร่างกาย & มอเตอร์)
    {
      id: 'rhythm_gross_motor' as SkillGameCategory,
      title: 'จังหวะขยับกาย & ทรงตัวกระโดด',
      subtitle: 'ขยับร่างกายตามจังหวะ กระโดดและทรงตัว',
      icon: '🏃',
      domain: 'physical' as const,
      domainLabel: 'กล้ามเนื้อมัดใหญ่ / ทรงตัว',
      domainColor: 'bg-teal-100 text-teal-800 border-teal-200',
      activeBorder: 'border-teal-500 ring-3 ring-teal-300',
      accentColor: 'from-teal-500 to-blue-600',
    },
  ], []);

  const filteredCategories = useMemo(() => {
    if (domainFilter === 'all') return categories;
    return categories.filter((c) => c.domain === domainFilter);
  }, [categories, domainFilter]);


  const domainTabs = [
    { id: 'all' as DevelopmentalDomainFilter, label: 'ทั้งหมด (24)', icon: '🌟' },
    { id: 'physical' as DevelopmentalDomainFilter, label: '🏃 ร่างกาย & มอเตอร์ (5 หมวด)', icon: '🏃' },
    { id: 'emotional' as DevelopmentalDomainFilter, label: '💖 อารมณ์-จิตใจ (4 หมวด)', icon: '💖' },
    { id: 'social' as DevelopmentalDomainFilter, label: '🤝 สังคม & น้ำใจ (4 หมวด)', icon: '🤝' },
    { id: 'intellectual' as DevelopmentalDomainFilter, label: '💡 สติปัญญา & คณิต (6)', icon: '💡' },
    { id: 'ef' as DevelopmentalDomainFilter, label: '🧠 ทักษะสมอง EF (5 หมวด)', icon: '🧠' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-indigo-50/50 to-pink-100/40 p-3 sm:p-5 md:p-6 flex flex-col items-center">
      {/* Top Header Navigation Bar */}
      <header className="w-full max-w-6xl bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 border-3 border-indigo-200 shadow-md flex flex-wrap items-center justify-between gap-3 mb-4">
        {/* Back Button & App Title */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              onReturnToHome();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border-2 border-slate-300 hover:border-indigo-300 font-black text-xs sm:text-sm transition-all cursor-pointer active:scale-95 shadow-2xs"
            title="กลับไปหน้าแบบประเมิน / หน้าหลัก"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้าหลัก</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">🎮</span>
            <div>
              <h1 className="text-sm sm:text-base md:text-lg font-black text-slate-800 leading-tight">
                ศูนย์เกมการศึกษา & ฝึกทักษะปฐมวัย (24 หมวดหมู่)
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-500 font-bold hidden sm:block">
                ครอบคลุม 4 ด้านพัฒนาการปฐมวัย และ ทักษะสมอง Executive Function (EF ครบทุกมิติ)
              </p>
            </div>
          </div>
        </div>

        {/* Grade Selection & Star Rewards */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Grade Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-300">
            {(['K1', 'K2', 'K3'] as Grade[]).map((g) => {
              const label = g === 'K1' ? 'อนุบาล 1' : g === 'K2' ? 'อนุบาล 2' : 'อนุบาล 3';
              const isSelected = g === currentGrade;

              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    soundEffects.playTap(soundVolume);
                    onGradeChange(g);
                  }}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Stars Counter with Interactive Particle Confetti Celebration */}
          <button
            type="button"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (rect.left + rect.width / 2) / window.innerWidth;
              const y = (rect.top + rect.height / 2) / window.innerHeight;
              soundEffects.playVictory(soundVolume);
              triggerInteractiveConfetti(x, y);
            }}
            className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-2xl font-black text-xs shadow-2xs transition-transform active:scale-95 cursor-pointer"
            title="คลิกเพื่อจุดพลุฉลองดาวสะสม!"
          >
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 animate-spin-slow" />
            <span>{totalStarsEarned} ดาวสะสม</span>
          </button>

          {/* Offline & Pending Sync Status Indicator */}
          <PendingSyncIndicator />

          {/* PWA Install Button */}
          <PWAInstallButton className="hidden sm:flex" />

          {/* Sound Toggle */}
          {onToggleSound && (
            <button
              type="button"
              id="btn-skill-games-toggle-sound"
              onClick={onToggleSound}
              className={`p-2 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                soundVolume > 0
                  ? 'border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-700'
                  : 'border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-600 animate-pulse'
              }`}
              title={
                soundVolume > 0
                  ? 'เปิดเสียงอยู่ • คลิกเพื่อปิดเสียง หรือกดปุ่ม M บนแป้นพิมพ์'
                  : 'ปิดเสียงอยู่ • คลิกเพื่อเปิดเสียง หรือกดปุ่ม M บนแป้นพิมพ์'
              }
            >
              {soundVolume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <kbd className="hidden sm:inline-block text-[9px] font-black px-1 py-0.2 rounded bg-slate-800 text-amber-300">
                M
              </kbd>
            </button>
          )}

          {/* Fun Facts Button */}
          {onOpenFunFacts && (
            <button
              type="button"
              id="btn-skill-games-fun-facts"
              onClick={onOpenFunFacts}
              className="w-8 h-8 sm:w-9 sm:h-9 bg-amber-400 hover:bg-amber-500 rounded-2xl flex items-center justify-center border border-amber-500 shadow-2xs text-white text-sm hover:scale-105 active:scale-95 cursor-pointer transition-all animate-pulse hover:animate-none"
              title="เกร็ดความรู้ชวนคิด (Fun Facts)"
            >
              💡
            </button>
          )}

          {/* Classroom Virtual Room Button */}
          {onOpenClassroomRoom && (
            <button
              type="button"
              id="btn-skill-games-classroom-room"
              onClick={onOpenClassroomRoom}
              className={`px-2.5 sm:px-3 py-1.5 rounded-2xl border flex items-center gap-1.5 font-black text-xs transition-all cursor-pointer shadow-2xs ${
                activeClassroomRoom
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-700'
                  : 'bg-white hover:bg-indigo-50 border-indigo-300 text-indigo-900'
              }`}
              title="ห้องเรียนจำลอง Real-time: สร้างห้องเรียน, แสดงสถานะเด็กสดๆ และแดชบอร์ดหลักสำหรับครู"
            >
              <span>🏫</span>
              {activeClassroomRoom ? (
                <>
                  <span className="hidden sm:inline font-bold">ห้อง:</span>
                  <span className="max-w-[70px] sm:max-w-[100px] truncate">{activeClassroomRoom.name.split(' ')[0]}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping shrink-0" />
                </>
              ) : (
                <span className="hidden sm:inline">ห้องเรียนสด</span>
              )}
            </button>
          )}

          {/* Pre-Game AI Story Button */}
          <button
            type="button"
            id="btn-skill-games-story"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setIsStoryModalOpen(true);
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-black text-xs flex items-center gap-1.5 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer transition-all"
            title="ฟังนิทานสั้น AI 8 ทักษะหลัก พร้อมเสียงพากย์อัตโนมัติ"
          >
            <span>📖</span>
            <span className="hidden sm:inline">นิทานก่อนเล่น AI</span>
          </button>

          {/* Active Profile or Guest Indicator with Switch Profile button */}
          <div className="flex items-center">
            {isGuestMode || !studentProfile ? (
              <button
                type="button"
                onClick={onSwitchProfile}
                className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1.5 rounded-2xl text-xs font-black text-emerald-800 transition-all cursor-pointer shadow-2xs group"
                title="คลิกเพื่อเลือกหรือสร้างโปรไฟล์นักเรียน"
              >
                <span className="text-sm">🎈</span>
                <span className="hidden sm:inline">โหมดผู้มาเยือน (Guest)</span>
                <span className="inline sm:hidden">ผู้มาเยือน</span>
                {onSwitchProfile && (
                  <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-md font-bold group-hover:bg-emerald-700">
                    เลือกโปรไฟล์
                  </span>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={onSwitchProfile}
                className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1.5 rounded-2xl text-xs font-black text-indigo-900 transition-all cursor-pointer shadow-2xs group"
                title="คลิกเพื่อสลับหรือสร้างโปรไฟล์ใหม่"
              >
                <span className="text-sm">{studentProfile.avatar || '👦'}</span>
                <span className="max-w-24 sm:max-w-32 truncate">{studentProfile.name}</span>
                {onSwitchProfile && (
                  <span className="text-[10px] text-indigo-600 bg-white/80 group-hover:bg-indigo-600 group-hover:text-white px-1.5 py-0.2 rounded-md border border-indigo-200 transition-colors">
                    สลับ
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Developmental Domain Filter Tabs */}
      <div className="w-full max-w-6xl flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {domainTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              soundEffects.playTap(soundVolume);
              setDomainFilter(tab.id);
            }}
            className={`px-3.5 py-1.5 rounded-2xl font-black text-xs whitespace-nowrap border transition-all cursor-pointer ${
              domainFilter === tab.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm scale-102'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Specialized EF 5-Pillars Guide Banner (Displayed when EF filter is active) */}
      {domainFilter === 'ef' && (
        <div className="w-full max-w-6xl bg-gradient-to-r from-cyan-50 via-teal-50 to-indigo-50 border-2 border-cyan-200 rounded-3xl p-3 sm:p-4 mb-3 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5 pb-2 border-b border-cyan-200/60">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-cyan-950">
                  ทักษะสมองเพื่อความสำเร็จ Executive Function (EF) สำหรับปฐมวัย (5 หมวดหมู่ย่อย)
                </h3>
                <p className="text-[10px] text-slate-500 font-medium">
                  พัฒนาสมองส่วนหน้า: ความจำใช้งาน, ยับยั้งชั่งใจ, สมาธิจดจ่อ และความยืดหยุ่นทางความคิด
                </p>
              </div>
            </div>
            <span className="text-[10px] font-black text-cyan-800 bg-white px-2.5 py-1 rounded-full border border-cyan-300 shadow-2xs">
              🌟 ครบทั้ง 3 กลุ่ม 5 ทักษะหลัก
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
            <div className="bg-white/90 p-2 rounded-2xl border border-cyan-100 flex items-center gap-2 shadow-2xs">
              <span className="text-xl shrink-0">🪄</span>
              <div className="min-w-0">
                <div className="font-black text-cyan-950 text-[11px] truncate">1. ความจำใช้งาน</div>
                <div className="text-[9px] text-slate-500 truncate">ผ้าคลุม อะไรหายไป</div>
              </div>
            </div>

            <div className="bg-white/90 p-2 rounded-2xl border border-cyan-100 flex items-center gap-2 shadow-2xs">
              <span className="text-xl shrink-0">🎵</span>
              <div className="min-w-0">
                <div className="font-black text-cyan-950 text-[11px] truncate">2. จำลำดับภาพเสียง</div>
                <div className="text-[9px] text-slate-500 truncate">สัตว์ดนตรี 2-6 ลำดับ</div>
              </div>
            </div>

            <div className="bg-white/90 p-2 rounded-2xl border border-rose-100 flex items-center gap-2 shadow-2xs">
              <span className="text-xl shrink-0">🚦</span>
              <div className="min-w-0">
                <div className="font-black text-rose-950 text-[11px] truncate">3. ยับยั้งชั่งใจ</div>
                <div className="text-[9px] text-slate-500 truncate">ไฟเขียวไฟแดง หยุดคิด</div>
              </div>
            </div>

            <div className="bg-white/90 p-2 rounded-2xl border border-cyan-100 flex items-center gap-2 shadow-2xs">
              <span className="text-xl shrink-0">🧠</span>
              <div className="min-w-0">
                <div className="font-black text-cyan-950 text-[11px] truncate">4. ยืดหยุ่นความคิด</div>
                <div className="text-[9px] text-slate-500 truncate">กฎตรงข้าม สลับเงื่อนไข</div>
              </div>
            </div>

            <div className="bg-white/90 p-2 rounded-2xl border border-teal-100 flex items-center gap-2 shadow-2xs">
              <span className="text-xl shrink-0">🎯</span>
              <div className="min-w-0">
                <div className="font-black text-teal-950 text-[11px] truncate">5. สมาธิจดจ่อ</div>
                <div className="text-[9px] text-slate-500 truncate">คัดกรองตัวรบกวน</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 18 Game Categories Grid */}
      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-4">
        {filteredCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              id={`btn-skill-cat-${cat.id}`}
              onClick={() => handleSelectCategory(cat.id)}
              className={`p-3 rounded-3xl border-3 transition-all cursor-pointer flex flex-col items-start justify-between min-h-[110px] text-left select-none relative ${
                isSelected
                  ? `bg-white ${cat.activeBorder} shadow-lg scale-102 z-10`
                  : 'bg-white/85 hover:bg-white border-slate-200 hover:border-slate-300 shadow-xs hover:scale-101'
              }`}
            >
              <div className="w-full flex items-center justify-between mb-1">
                <span className="text-2xl sm:text-3xl">{cat.icon}</span>
                {isSelected ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-200 animate-ping" />
                ) : (
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full border ${cat.domainColor}`}>
                    {cat.domainLabel.split('/')[0]}
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-xs sm:text-sm font-black text-slate-800 line-clamp-1">
                  {cat.title}
                </h2>
                <p className="text-[10px] text-slate-500 font-bold line-clamp-1 mt-0.5">
                  {cat.subtitle}
                </p>
              </div>

              {isSelected && (
                <div className={`w-full h-1 bg-gradient-to-r ${cat.accentColor} rounded-full mt-2`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Game Content View Body */}
      <main
        id="skill-game-arena"
        className="w-full max-w-6xl bg-white/90 backdrop-blur-xs rounded-3xl p-4 sm:p-6 border-2 border-indigo-100 shadow-sm min-h-[520px] flex flex-col justify-start"
      >
        {selectedCategory === 'matching' && (
          <MatchingGameView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'sequence_sorting' && (
          <SequenceSortingView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'jigsaw' && (
          <JigsawPuzzleView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
            onExit={onReturnToHome}
          />
        )}

        {selectedCategory === 'rules' && (
          <RuleBasedGameView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'maze_path' && (
          <MazePathView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'shadow_tangram' && (
          <ShadowTangramView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'spot_differences' && (
          <SpotDifferencesView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
            onExit={onReturnToHome}
          />
        )}

        {selectedCategory === 'auditory_rhythm' && (
          <AuditoryRhythmView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'whats_missing' && (
          <WhatsMissingView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'emotion_social' && (
          <EmotionSocialView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
            onExit={onReturnToHome}
          />
        )}

        {selectedCategory === 'balance_math' && (
          <BalanceMathView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'body_movement' && (
          <BodyMovementView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'calm_mind' && (
          <CalmMindView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'social_manners' && (
          <SocialMannersView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'brain_flex' && (
          <BrainFlexView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'ef_sequence_memory' && (
          <EFSequenceMemoryView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
            gameStartedKey={gameStartedKey}
          />
        )}

        {selectedCategory === 'ef_stop_and_go' && (
          <EFStopAndGoView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
            gameStartedKey={gameStartedKey}
          />
        )}

        {selectedCategory === 'ef_focus_distraction' && (
          <EFFocusDistractionView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
            gameStartedKey={gameStartedKey}
          />
        )}

        {selectedCategory === 'social_sharing' && (
          <SocialSharingView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'social_empathy_helping' && (
          <SocialEmpathyHelpingView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'emotion_detective' && (
          <EmotionDetectiveView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'mindful_nature_art' && (
          <MindfulNatureArtView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'fine_motor_tracing' && (
          <FineMotorTracingView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}

        {selectedCategory === 'rhythm_gross_motor' && (
          <RhythmGrossMotorView
            currentGrade={currentGrade}
            soundVolume={soundVolume}
            onEarnStar={handleEarnStar}
          />
        )}
      </main>

      {/* Footer Encouragement */}
      <footer className="w-full max-w-6xl mt-4 py-3 text-center text-xs font-bold text-slate-500">
        ออกแบบตามหลักสูตรการศึกษาปฐมวัย พ.ศ. 2560 และมาตรฐานทักษะสมองเพื่อความสำเร็จ Executive Function (EF)
      </footer>

      {/* Floating Learning Buddy Mascot - Always displaying new gameplay tips continuously */}
      <LearningBuddyMascot
        settings={effectiveMascotSettings}
        effectiveMode="touch"
        customCategory={selectedCategory}
      />

      {/* Pre-Game AI Story Modal */}
      <PreGameStoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        onProceedToGame={() => setIsStoryModalOpen(false)}
        primarySubject={
          selectedCategory === 'matching' || selectedCategory === 'balance_math'
            ? 'math'
            : selectedCategory === 'body_movement' || selectedCategory === 'fine_motor_tracing' || selectedCategory === 'rhythm_gross_motor'
            ? 'physical_health'
            : selectedCategory === 'calm_mind' || selectedCategory === 'emotion_detective' || selectedCategory === 'mindful_nature_art'
            ? 'socio_emotional'
            : selectedCategory === 'social_manners' || selectedCategory === 'social_sharing' || selectedCategory === 'social_empathy_helping'
            ? 'citizenship'
            : selectedCategory === 'spot_differences' || selectedCategory === 'whats_missing'
            ? 'inquiry'
            : selectedCategory === 'auditory_rhythm' || selectedCategory === 'jigsaw'
            ? 'creativity'
            : 'problem_solving'
        }
        currentGrade={currentGrade}
        childName={studentProfile?.name || 'น้องคนเก่ง'}
        soundVolume={soundVolume}
      />
    </div>
  );
};
