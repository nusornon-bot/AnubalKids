import { CurriculumMode } from '../types';

export interface CurriculumThemeConfig {
  id: CurriculumMode;
  name: string;
  shortName: string;
  emoji: string;
  gradeRange: string;
  
  // Base color family name
  colorFamily: 'sky' | 'indigo' | 'emerald';

  // Navigation Header styling
  headerBorder: string;
  headerCurriculumPill: string;
  headerActiveGradeTab: string;
  headerGradeContainer: string;

  // Modal container & header styling
  modalBorder: string;
  modalRing: string;
  modalHeaderBg: string;
  modalHeaderSubtext: string;
  modalBadge: string;
  modalCloseBtn: string;

  // Buttons & CTAs
  primaryButton: string;
  secondaryButton: string;
  accentPillActive: string;
  accentPillInactive: string;

  // Tabs & Segmented controls
  tabActive: string;
  tabInactive: string;

  // Accent text & surfaces
  accentText: string;
  accentBg: string;
  accentSurface: string;

  // Overall App Background Tint (for sunny/default theme)
  appBackgroundTint: string;
}

export const CURRICULUM_THEMES: Record<CurriculumMode, CurriculumThemeConfig> = {
  early_childhood: {
    id: 'early_childhood',
    name: '๑. พัฒนาการปฐมวัย (อ.๑ - อ.๓)',
    shortName: 'ปฐมวัย',
    emoji: '🧸',
    gradeRange: 'อ.๑ - อ.๓',
    colorFamily: 'sky',

    // Header styling
    headerBorder: 'border-sky-200',
    headerCurriculumPill: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-600 shadow-sky-100',
    headerActiveGradeTab: 'bg-sky-500 text-white shadow-xs border-b-2 border-sky-700',
    headerGradeContainer: 'bg-sky-50/90 border-2 border-sky-200 text-sky-800',

    // Modal styling
    modalBorder: 'border-sky-300',
    modalRing: 'ring-sky-200',
    modalHeaderBg: 'bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600',
    modalHeaderSubtext: 'text-sky-100',
    modalBadge: 'bg-sky-100 text-sky-900 border border-sky-200',
    modalCloseBtn: 'bg-white/20 hover:bg-white/30 text-white',

    // Action buttons
    primaryButton: 'bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md shadow-sky-200',
    secondaryButton: 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300',
    accentPillActive: 'bg-sky-500 text-white shadow-2xs',
    accentPillInactive: 'bg-white text-slate-700 border border-slate-200 hover:bg-sky-50',

    // Tabs
    tabActive: 'bg-white text-sky-950 shadow-xs border border-sky-300',
    tabInactive: 'text-slate-600 hover:text-slate-900 hover:bg-white/50',

    // Accent
    accentText: 'text-sky-700',
    accentBg: 'bg-sky-500',
    accentSurface: 'bg-sky-50/80 border-sky-200',

    // App background
    appBackgroundTint: 'bg-gradient-to-br from-sky-50/70 via-blue-50/40 to-[#F0F9FF]',
  },

  cbe_primary: {
    id: 'cbe_primary',
    name: '๒. สถานศึกษาฐานสมรรถนะ (ป.๑ - ป.๖)',
    shortName: 'สมรรถนะ',
    emoji: '🎓',
    gradeRange: 'ป.๑ - ป.๖',
    colorFamily: 'indigo',

    // Header styling
    headerBorder: 'border-indigo-200',
    headerCurriculumPill: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-700 shadow-indigo-100',
    headerActiveGradeTab: 'bg-indigo-600 text-white shadow-xs border-b-2 border-indigo-800',
    headerGradeContainer: 'bg-indigo-50/90 border-2 border-indigo-200 text-indigo-800',

    // Modal styling
    modalBorder: 'border-indigo-300',
    modalRing: 'ring-indigo-200',
    modalHeaderBg: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700',
    modalHeaderSubtext: 'text-indigo-100',
    modalBadge: 'bg-indigo-100 text-indigo-900 border border-indigo-200',
    modalCloseBtn: 'bg-white/20 hover:bg-white/30 text-white',

    // Action buttons
    primaryButton: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-200',
    secondaryButton: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-300',
    accentPillActive: 'bg-indigo-600 text-white shadow-2xs',
    accentPillInactive: 'bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50',

    // Tabs
    tabActive: 'bg-white text-indigo-950 shadow-xs border border-indigo-300',
    tabInactive: 'text-slate-600 hover:text-slate-900 hover:bg-white/50',

    // Accent
    accentText: 'text-indigo-700',
    accentBg: 'bg-indigo-600',
    accentSurface: 'bg-indigo-50/80 border-indigo-200',

    // App background
    appBackgroundTint: 'bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-[#F0F9FF]',
  },

  thai_phonics: {
    id: 'thai_phonics',
    name: '๓. แจกลูกสะกดคำ สพฐ. (๑๐ หน่วย)',
    shortName: 'แจกลูกสะกดคำ',
    emoji: '📖',
    gradeRange: 'ป.๑ - ป.๖',
    colorFamily: 'emerald',

    // Header styling
    headerBorder: 'border-emerald-200',
    headerCurriculumPill: 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-700 shadow-emerald-100',
    headerActiveGradeTab: 'bg-emerald-600 text-white shadow-xs border-b-2 border-emerald-800',
    headerGradeContainer: 'bg-emerald-50/90 border-2 border-emerald-200 text-emerald-800',

    // Modal styling
    modalBorder: 'border-emerald-300',
    modalRing: 'ring-emerald-200',
    modalHeaderBg: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700',
    modalHeaderSubtext: 'text-emerald-100',
    modalBadge: 'bg-emerald-100 text-emerald-900 border border-emerald-200',
    modalCloseBtn: 'bg-white/20 hover:bg-white/30 text-white',

    // Action buttons
    primaryButton: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-200',
    secondaryButton: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300',
    accentPillActive: 'bg-emerald-600 text-white shadow-2xs',
    accentPillInactive: 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50',

    // Tabs
    tabActive: 'bg-white text-emerald-950 shadow-xs border border-emerald-300',
    tabInactive: 'text-slate-600 hover:text-slate-900 hover:bg-white/50',

    // Accent
    accentText: 'text-emerald-700',
    accentBg: 'bg-emerald-600',
    accentSurface: 'bg-emerald-50/80 border-emerald-200',

    // App background
    appBackgroundTint: 'bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-[#F0F9FF]',
  },
};

export function getCurriculumTheme(mode?: CurriculumMode | string | null): CurriculumThemeConfig {
  if (mode && (mode as CurriculumMode) in CURRICULUM_THEMES) {
    return CURRICULUM_THEMES[mode as CurriculumMode];
  }
  return CURRICULUM_THEMES.early_childhood;
}
