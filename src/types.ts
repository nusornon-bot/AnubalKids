export type Grade = 'K1' | 'K2' | 'K3' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6'; // อนุบาล 1-3 และ ประถมศึกษา 1-6
export const PRIMARY_GRADES: Grade[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
export const KINDERGARTEN_GRADES: Grade[] = ['K1', 'K2', 'K3'];
export const ALL_GRADES: Grade[] = ['K1', 'K2', 'K3', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
export function isPrimaryGrade(grade?: string): boolean {
  return typeof grade === 'string' && (grade.startsWith('P') || PRIMARY_GRADES.includes(grade as Grade));
}
export type CurriculumMode = 'early_childhood' | 'cbe_primary' | 'thai_phonics'; // ปฐมวัย (8 ทักษะ), ฐานสมรรถนะ (6 สมรรถนะ), หรือ แจกลูกสะกดคำ สพฐ. (10 หน่วย)
export type SkillCode =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '4.1'
  | '4.2'
  | '4.3'
  | '4.4'
  | '4.5'
  | 'CBE1'
  | 'CBE2'
  | 'CBE3'
  | 'CBE4'
  | 'CBE5'
  | 'CBE6'
  | 'TP1'
  | 'TP2'
  | 'TP3'
  | 'TP4'
  | 'TP5'
  | 'TP6'
  | 'TP7'
  | 'TP8'
  | 'TP9'
  | 'TP10';

export type Subject =
  // 8 ทักษะพัฒนาการปฐมวัย (Early Childhood)
  | 'literacy' // 1 ภาษาและการรู้หนังสือ
  | 'math' // 2 การคิดรวบยอดและการคิดคำนวณ
  | 'problem_solving' // 3 การคิดแก้ปัญหาและตัดสินใจ
  | 'inquiry' // 4 การแสวงหาความรู้
  | 'creativity' // 5 จินตนาการและความคิดสร้างสรรค์
  | 'physical_health' // 6 ด้านสุขภาวะทางกาย
  | 'socio_emotional' // 7 ด้านอารมณ์ จิตใจ และสังคม
  | 'citizenship' // 8 ด้านความเป็นพลเมืองและความเป็นไทย
  | 'science' // alias for inquiry
  | 'thai' // alias for literacy / ภาษาไทย
  | 'english' // ภาษาอังกฤษ (English Language)
  // 6 สมรรถนะหลักสูตรสถานศึกษาฐานสมรรถนะ (CBE Primary P1-P3)
  | 'self_management' // สมรรถนะที่ 1: การจัดการตนเอง
  | 'higher_order_thinking' // สมรรถนะที่ 2: การคิดขั้นสูง
  | 'communication' // สมรรถนะที่ 3: การสื่อสาร
  | 'teamwork_collaboration' // สมรรถนะที่ 4: การรวมพลังทำงานเป็นทีม
  | 'active_citizenship' // สมรรถนะที่ 5: การเป็นพลเมืองที่เข้มแข็ง
  | 'sustainable_living' // สมรรถนะที่ 6: การอยู่ร่วมกับธรรมชาติและวิทยาการอย่างยั่งยืน
  // 10 หน่วยการสอนอ่านเขียนโดยการแจกลูกสะกดคำ สพฐ. (Thai Phonics)
  | 'phonics_consonant' // หน่วยที่ ๑ รูปและเสียงพยัญชนะ
  | 'phonics_vowel' // หน่วยที่ ๒ รูปและเสียงสระ
  | 'phonics_tone' // หน่วยที่ ๓ รูปและเสียงวรรณยุกต์
  | 'phonics_korkaa' // หน่วยที่ ๔ การแจกลูกสะกดคำในแม่ ก กา
  | 'phonics_tone_korkaa' // หน่วยที่ ๕ การผันวรรณยุกต์คำในแม่ ก กา
  | 'phonics_direct_spelling' // หน่วยที่ ๖ การแจกลูกสะกดคำที่มีตัวสะกดตรงตามมาตรา
  | 'phonics_tone_spelling' // หน่วยที่ ๗ การผันวรรณยุกต์คำที่มีตัวสะกดตรงตามมาตรา
  | 'phonics_indirect_spelling' // หน่วยที่ ๘ การแจกลูกสะกดคำที่มีตัวสะกดไม่ตรงตามมาตรา
  | 'phonics_cluster' // หน่วยที่ ๙ การแจกลูกสะกดคำที่มีอักษรควบ
  | 'phonics_leading_consonant'; // หน่วยที่ ๑๐ การแจกลูกสะกดคำที่มีอักษรนำ

export type Language = 'th' | 'en' | 'zh';
export type VoicePersona = 'child_boy' | 'child_girl' | 'adult_male' | 'adult_female';
export type ThemeMode = 'sunny' | 'ocean' | 'forest' | 'galaxy' | 'dark';
export type ControlMode = 'auto' | 'touch' | 'hand';

export interface QuestionOption {
  id: string;
  label: Record<Language, string>;
  icon?: string;
  subtext?: string;
}

export interface Question {
  id: string;
  grade: Grade;
  subject: Subject;
  skillCode?: SkillCode;
  difficulty: 1 | 2 | 3;
  question: Record<Language, string>;
  illustration: string; // large emoji or icon combination
  illustrationSubtitle?: Record<Language, string>;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: Record<Language, string>;
  isCustom?: boolean; // Added by teacher/parent
  createdAt?: string;
  updatedAt?: string;
}

export interface Badge {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface HistoryEntry {
  date: string; // YYYY-MM-DD
  // 8 Early Childhood Skills
  literacyScore?: number;
  literacyTotal?: number;
  mathScore: number;
  mathTotal: number;
  problemSolvingScore?: number;
  problemSolvingTotal?: number;
  inquiryScore?: number;
  inquiryTotal?: number;
  creativityScore?: number;
  creativityTotal?: number;
  physicalHealthScore?: number;
  physicalHealthTotal?: number;
  socioEmotionalScore?: number;
  socioEmotionalTotal?: number;
  citizenshipScore?: number;
  citizenshipTotal?: number;
  // 6 Competencies (หลักสูตรสถานศึกษาฐานสมรรถนะ ป.1-ป.3)
  selfManagementScore?: number;
  selfManagementTotal?: number;
  higherOrderThinkingScore?: number;
  higherOrderThinkingTotal?: number;
  communicationScore?: number;
  communicationTotal?: number;
  teamworkScore?: number;
  teamworkTotal?: number;
  activeCitizenshipScore?: number;
  activeCitizenshipTotal?: number;
  sustainableLivingScore?: number;
  sustainableLivingTotal?: number;
  // 10 Thai Phonics Units (คู่มือการสอนอ่านเขียนโดยการแจกลูกสะกดคำ สพฐ.)
  phonicsConsonantScore?: number;
  phonicsConsonantTotal?: number;
  phonicsVowelScore?: number;
  phonicsVowelTotal?: number;
  phonicsToneScore?: number;
  phonicsToneTotal?: number;
  phonicsKorkaaScore?: number;
  phonicsKorkaaTotal?: number;
  phonicsToneKorkaaScore?: number;
  phonicsToneKorkaaTotal?: number;
  phonicsDirectSpellingScore?: number;
  phonicsDirectSpellingTotal?: number;
  phonicsToneSpellingScore?: number;
  phonicsToneSpellingTotal?: number;
  phonicsIndirectSpellingScore?: number;
  phonicsIndirectSpellingTotal?: number;
  phonicsClusterScore?: number;
  phonicsClusterTotal?: number;
  phonicsLeadingConsonantScore?: number;
  phonicsLeadingConsonantTotal?: number;
  // Legacy fields
  scienceScore: number;
  scienceTotal: number;
  thaiScore: number;
  thaiTotal: number;
  englishScore?: number;
  englishTotal?: number;
  accuracy: number;
}

export interface DailyMissionState {
  date: string; // YYYY-MM-DD
  subject: Subject;
  completed: boolean;
  bonusPoints: number; // e.g. 50 bonus points
  completedAt?: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  grade: Grade;
  avatar: string;
  avatarBg?: string; // background color id (e.g. 'amber', 'sky', 'emerald', 'pink', etc.)
  createdAt: string;
  updatedAt?: string;
  deviceId?: string; // รหัสระบุเครื่องที่สร้างโปรไฟล์
  createdDeviceName?: string; // ชื่อประเภทอุปกรณ์ เช่น คอมพิวเตอร์, ไอแพด
  createdByEmail?: string; // บัญชีผู้สร้าง (หากล็อกอิน)
  totalScore: number;
  totalQuestions: number;
  streakDays: number;
  lastPlayedDate: string;
  badges: string[]; // badge IDs
  unlockedAvatars?: string[]; // list of unlocked avatar emojis (Disney, Marvel, special achievements)
  history: HistoryEntry[];
  dailyMission?: DailyMissionState;
}

export interface GameSettings {
  dwellTimeSeconds: number; // default 1.2s
  questionsPerRound: number; // total or per round
  questionsPerSkill?: number; // e.g. 3, 6, 9 (questions per skill)
  selectedSubjects: Subject[];
  theme: ThemeMode;
  voicePersona: VoicePersona;
  language: Language;
  autoSpeak: boolean;
  soundVolume: number;
  cameraMirrored: boolean;
  showCameraFeed: boolean;
  handPointerScale: number;
  controlMode: ControlMode; // 'auto' | 'touch' | 'hand'
  curriculumMode?: CurriculumMode; // 'early_childhood' | 'cbe_primary'
  enableAdaptiveDifficulty?: boolean; // ปรับระดับความยากคำถามอัตโนมัติตามทักษะของเด็ก (ถูก 3 ข้อติดเพิ่มระดับ, ผิดลดระดับ)
  showFunFacts?: boolean; // แสดงเกร็ดความรู้ชวนคิด (Fun Facts) ก่อนเริ่มรอบการเล่นใหม่
  parentPin?: string; // รหัส PIN 4 หลักสำหรับโซนผู้ปกครอง (Parent Zone)
}

export interface HandPoint {
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
  screenX: number;
  screenY: number;
  isPointing: boolean;
  isPinching: boolean;
  confidence: number;
}

export type FeedbackCategory =
  | 'general' // ข้อเสนอแนะทั่วไป
  | 'bug' // แจ้งปัญหา / บั๊ก
  | 'new_features' // เสนอแนะคำถามหรือทักษะใหม่
  | 'control' // เกี่ยวกับการจับมือหรือสัมผัสหน้าจอ
  | 'classroom' // การนำไปใช้ในโรงเรียน/ห้องเรียน
  | 'appreciation'; // คำชมเชยและกำลังใจ

export interface FeedbackItem {
  id: string;
  category: FeedbackCategory;
  rating: number; // 1 to 5
  message: string;
  senderName: string;
  senderRole: 'parent' | 'teacher' | 'student' | 'other';
  contactInfo?: string; // email, line, or phone
  createdAt: string; // ISO string
  deviceInfo?: string;
  sentViaEmail?: boolean;
}

export type ExamGenerationMode = 'auto' | 'manual';

export interface ExamSet {
  id: string;
  title: string;
  description?: string;
  grade: Grade | 'all';
  subjects: Subject[]; // List of subjects covered in this set
  questionIds: string[]; // List of Question IDs in display order
  questionCount: number;
  generationMode: ExamGenerationMode; // 'auto' (จัดแบบอัตโนมัติ) | 'manual' (จัดแบบแมนนวล)
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
  estimatedMinutes?: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  isPreset?: boolean; // System curated presets
  tags?: string[];
}

export type DeviceCategory = 'smartphone' | 'tablet' | 'desktop' | 'smartboard';

export interface DeviceDiagnosticInfo {
  deviceId: string;
  deviceName: string;
  deviceCategory: DeviceCategory;
  osName: string;
  browserName: string;
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  orientation: 'portrait' | 'landscape';
  hasTouch: boolean;
  maxTouchPoints: number;
  hasHover: boolean;
  isCoarsePointer: boolean;
  hasCameraSupport: boolean;
  hasWebAudio: boolean;
  hasSpeechSynthesis: boolean;
  availableVoicesCount: number;
  hasThaiVoice: boolean;
  hasLocalStorage: boolean;
  isOnline: boolean;
  recommendedControlMode: 'touch' | 'hand';
  compatibilityScore: number;
  recommendations: string[];
}

export interface CompetencyActivityStep {
  stepNumber: number;
  title: string;
  durationMinutes: number; // 5 minutes per step
  teacherGuide: {
    goal: string;
    actions: string[];
    promptQuestions: string[];
    observationTips: string[];
  };
  kidMission: {
    missionTitle: string;
    actionSteps: string[];
    interactiveChallenge: string;
    checklistItems: string[];
  };
  reflectionPrompt: string;
}

export interface CompetencyActivity {
  id: string;
  competencyId: Subject; // 'self_management' | 'higher_order_thinking' | 'communication' | 'teamwork_collaboration' | 'active_citizenship' | 'sustainable_living'
  competencyCode: string; // 'CBE1' - 'CBE6'
  title: string;
  subtitle: string;
  gradeLevels: Grade[]; // e.g. ['P1', 'P2', 'P3']
  icon: string;
  badgeColor: string;
  category: 'classroom' | 'outdoor' | 'unplugged' | 'maker' | 'dialogue';
  objective: string;
  materials: string[];
  totalDurationMinutes: number;
  steps: CompetencyActivityStep[];
  assessmentRubric: {
    indicator: string;
    beginning: string;
    developing: string;
    proficient: string;
  };
}

export interface EarlyChildhoodActivityStep {
  stepNumber: number;
  title: string;
  durationMinutes: number;
  kidMission: string;
  funAction: string;
  parentTeacherTip: string;
}

export interface EarlyChildhoodActivity {
  id: string;
  skillId: Subject; // 'literacy' | 'math' | 'problem_solving' | 'inquiry' | 'creativity' | 'physical_health' | 'socio_emotional' | 'citizenship'
  skillCode: SkillCode; // '1' - '8'
  skillNameTh: string;
  title: string;
  subtitle: string;
  gradeLevels: Grade[]; // ['K1', 'K2', 'K3']
  icon: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  objective: string;
  materials: string[];
  totalDurationMinutes: number;
  funChallenge: string;
  steps: EarlyChildhoodActivityStep[];
  interactiveQuestionsCount: number;
}

export interface Completed8SkillActivityRecord {
  activityId: string;
  skillId: Subject;
  profileId: string;
  completedAt: string;
  stars: number;
}

export interface WeeklyChallengeState {
  weekKey: string; // e.g. "2026-W42"
  profileId: string;
  bestSkill: Subject;
  bestScore: number;
  attemptsCount: number;
  lastPlayedDate?: string;
  targetScore: number;
  isRecordBroken?: boolean;
}

export interface WeeklyChallengeAwardResult {
  weekKey: string;
  skill: Subject;
  skillTitleTh: string;
  roundScore: number;
  previousBestScore: number;
  newBestScore: number;
  isNewRecord: boolean;
  bonusPoints: number;
  isFirstAttempt?: boolean;
}

export interface OutdoorMission {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  skillId: Subject;
  category: 'observation' | 'counting' | 'color' | 'sound' | 'texture' | 'living_things';
  difficulty: 'easy' | 'medium' | 'fun';
  targetPrompt: string;
  guideSteps: string[];
  suggestedTags: string[];
  pointsReward: number;
  skillsDeveloped?: {
    earlyChildhood: string; // e.g. "ทักษะที่ 4: การแสวงหาความรู้ & วิทยาศาสตร์"
    cbeCompetency: string; // e.g. "สมรรถนะที่ 6: การอยู่ร่วมกับธรรมชาติและวิทยาการอย่างยั่งยืน"
  };
}

export interface OutdoorMissionSubmission {
  id: string;
  missionId: string;
  missionTitle: string;
  profileId: string;
  profileName: string;
  completedAt: string;
  photoUrl?: string;
  audioUrl?: string;
  audioDurationSeconds?: number;
  countValue?: number;
  notes?: string;
  stars: number;
  pointsEarned: number;
}



