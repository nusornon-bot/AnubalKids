/**
 * Weekly Development Trend Analytics Service (Firestore Powered)
 * 
 * Fetches game session history from Firebase Firestore (/game_sessions),
 * aggregates data into weekly buckets (จันทร์-อาทิตย์), calculates accuracy and score
 * progress across the 8 early childhood developmental skills, and provides
 * insights for Line Chart visualization.
 */

import { collection, getDocs, query, orderBy, limit, addDoc } from 'firebase/firestore';
import { db, getTargetFirestoreDatabases, withTimeout } from './cloudSyncService';
import { GameSessionPayload } from './cloudSyncService';
import { storageService } from './storageService';
import { ChildProfile, Subject, Grade } from '../types';
import { SKILLS_LIST } from '../data/skills';

export interface WeeklySkillStat {
  skillId: Subject;
  skillName: string;
  icon: string;
  color: string;
  dotColor: string;
  correctCount: number;
  totalQuestions: number;
  accuracy: number; // 0 - 100
  deltaFromPreviousWeek: number | null; // percentage points +/-
  isTested: boolean;
}

export interface WeeklyDataBucket {
  weekKey: string; // YYYY-MM-DD of Monday
  weekNumber: number; // 1, 2, 3...
  weekLabel: string; // e.g. "สัปดาห์ที่ 1"
  dateRangeLabel: string; // e.g. "8/9 - 14/9"
  fullDateLabel: string; // e.g. "8 ก.ย. - 14 ก.ย. 2567"
  startDate: string; // ISO date
  endDate: string; // ISO date
  sessionCount: number;
  totalCorrect: number;
  totalQuestions: number;
  overallAccuracy: number; // 0 - 100
  skills: Record<Subject, WeeklySkillStat>;
}

export interface WeeklyTrendAnalysisResult {
  buckets: WeeklyDataBucket[];
  totalSessions: number;
  totalQuestions: number;
  averageAccuracy: number;
  dataSource: 'firestore' | 'local_fallback';
  cloudSessionCount: number;
  topImprovedSkill?: {
    skill: Subject;
    name: string;
    icon: string;
    improvement: number;
  };
  highestSkill?: {
    skill: Subject;
    name: string;
    icon: string;
    averageAccuracy: number;
  };
  needsSupportSkill?: {
    skill: Subject;
    name: string;
    icon: string;
    averageAccuracy: number;
    recommendation: string;
  };
  pedagogicalInsights: string[];
}

/**
 * Helper to get Monday 00:00:00 and Sunday 23:59:59 of a given date
 */
export function getMondayOfWeek(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  // Sunday is 0, make it 7 for Monday-based calculation
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export function formatThaiDateRange(monday: Date, sunday: Date): { short: string; full: string } {
  const thaiMonthsShort = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];
  const startDay = monday.getDate();
  const startMonth = thaiMonthsShort[monday.getMonth()];
  const endDay = sunday.getDate();
  const endMonth = thaiMonthsShort[sunday.getMonth()];
  const yearBe = (monday.getFullYear() + 543).toString().slice(-2);

  const short = `${startDay}/${monday.getMonth() + 1} - ${endDay}/${sunday.getMonth() + 1}`;
  const full = startMonth === endMonth
    ? `${startDay} - ${endDay} ${startMonth} ${yearBe}`
    : `${startDay} ${startMonth} - ${endDay} ${endMonth} ${yearBe}`;

  return { short, full };
}

/**
 * Standard colors for the 8 skills
 */
export const SKILL_COLORS: Record<Subject, { color: string; bg: string; dot: string; name: string; icon: string }> = {
  literacy: { color: '#e11d48', bg: 'bg-rose-50', dot: 'bg-rose-500', name: 'ภาษาและการรู้หนังสือ', icon: '📖' },
  math: { color: '#4f46e5', bg: 'bg-indigo-50', dot: 'bg-indigo-500', name: 'คณิตศาสตร์และการคำนวณ', icon: '🧮' },
  problem_solving: { color: '#d97706', bg: 'bg-amber-50', dot: 'bg-amber-500', name: 'การคิดแก้ปัญหา', icon: '🧩' },
  inquiry: { color: '#0284c7', bg: 'bg-sky-50', dot: 'bg-sky-500', name: 'วิทยาศาสตร์และสืบเสาะ', icon: '🔬' },
  creativity: { color: '#c026d3', bg: 'bg-fuchsia-50', dot: 'bg-fuchsia-500', name: 'ความคิดสร้างสรรค์', icon: '🎨' },
  physical_health: { color: '#059669', bg: 'bg-emerald-50', dot: 'bg-emerald-500', name: 'สุขภาวะทางกาย', icon: '🏃' },
  socio_emotional: { color: '#7c3aed', bg: 'bg-purple-50', dot: 'bg-purple-500', name: 'อารมณ์และสังคม', icon: '❤️' },
  citizenship: { color: '#ea580c', bg: 'bg-orange-50', dot: 'bg-orange-500', name: 'คุณธรรมพลเมือง', icon: '🤝' },
  // Optional aliases
  thai: { color: '#e11d48', bg: 'bg-rose-50', dot: 'bg-rose-500', name: 'ภาษาไทย', icon: '📖' },
  english: { color: '#2563eb', bg: 'bg-blue-50', dot: 'bg-blue-500', name: 'ภาษาอังกฤษ', icon: '🔤' },
  science: { color: '#0284c7', bg: 'bg-sky-50', dot: 'bg-sky-500', name: 'วิทยาศาสตร์', icon: '🔬' },
  // 6 CBE Competencies
  self_management: { color: '#2563eb', bg: 'bg-blue-50', dot: 'bg-blue-500', name: 'การจัดการตนเอง', icon: '🎯' },
  higher_order_thinking: { color: '#7c3aed', bg: 'bg-purple-50', dot: 'bg-purple-500', name: 'การคิดขั้นสูง', icon: '🧠' },
  communication: { color: '#059669', bg: 'bg-emerald-50', dot: 'bg-emerald-500', name: 'การสื่อสาร', icon: '💬' },
  teamwork_collaboration: { color: '#d97706', bg: 'bg-amber-50', dot: 'bg-amber-500', name: 'การรวมพลังทำงานเป็นทีม', icon: '🤝' },
  active_citizenship: { color: '#e11d48', bg: 'bg-rose-50', dot: 'bg-rose-500', name: 'การเป็นพลเมืองที่เข้มแข็ง', icon: '🏛️' },
  sustainable_living: { color: '#0d9488', bg: 'bg-teal-50', dot: 'bg-teal-500', name: 'อยู่ร่วมกับธรรมชาติและวิทยาการ', icon: '🌿' },
  // 10 Thai Phonics Units (สพฐ.)
  phonics_consonant: { color: '#059669', bg: 'bg-emerald-50', dot: 'bg-emerald-500', name: 'รูปและเสียงพยัญชนะ', icon: '🗣️' },
  phonics_vowel: { color: '#2563eb', bg: 'bg-blue-50', dot: 'bg-blue-500', name: 'รูปและเสียงสระ', icon: '🔤' },
  phonics_tone: { color: '#d97706', bg: 'bg-amber-50', dot: 'bg-amber-500', name: 'รูปและเสียงวรรณยุกต์', icon: '🎶' },
  phonics_korkaa: { color: '#0d9488', bg: 'bg-teal-50', dot: 'bg-teal-500', name: 'สะกดคำแม่ ก กา', icon: '🐣' },
  phonics_tone_korkaa: { color: '#7c3aed', bg: 'bg-purple-50', dot: 'bg-purple-500', name: 'ผันวรรณยุกต์แม่ ก กา', icon: '📈' },
  phonics_direct_spelling: { color: '#4f46e5', bg: 'bg-indigo-50', dot: 'bg-indigo-500', name: 'สะกดตรงตามมาตรา', icon: '🎯' },
  phonics_tone_spelling: { color: '#ea580c', bg: 'bg-orange-50', dot: 'bg-orange-500', name: 'ผันวรรณยุกต์มีตัวสะกด', icon: '🎼' },
  phonics_indirect_spelling: { color: '#e11d48', bg: 'bg-rose-50', dot: 'bg-rose-500', name: 'สะกดไม่ตรงตามมาตรา', icon: '🧩' },
  phonics_cluster: { color: '#c026d3', bg: 'bg-fuchsia-50', dot: 'bg-fuchsia-500', name: 'คำที่มีอักษรควบ', icon: '🤝' },
  phonics_leading_consonant: { color: '#0284c7', bg: 'bg-sky-50', dot: 'bg-sky-500', name: 'คำที่มีอักษรนำ', icon: '👑' },
};

/**
 * Extract scores from session with multi-structure support
 */
function extractSessionSkillScores(s: any): { scores: Record<Subject, number>; totals: Record<Subject, number> } {
  const scores: Record<Subject, number> = {
    literacy: 0,
    math: 0,
    problem_solving: 0,
    inquiry: 0,
    creativity: 0,
    physical_health: 0,
    socio_emotional: 0,
    citizenship: 0,
    thai: 0,
    english: 0,
    science: 0,
    self_management: 0,
    higher_order_thinking: 0,
    communication: 0,
    teamwork_collaboration: 0,
    active_citizenship: 0,
    sustainable_living: 0,
    phonics_consonant: s.phonicsConsonantScore !== undefined ? s.phonicsConsonantScore : 0,
    phonics_vowel: s.phonicsVowelScore !== undefined ? s.phonicsVowelScore : 0,
    phonics_tone: s.phonicsToneScore !== undefined ? s.phonicsToneScore : 0,
    phonics_korkaa: s.phonicsKorkaaScore !== undefined ? s.phonicsKorkaaScore : 0,
    phonics_tone_korkaa: s.phonicsToneKorkaaScore !== undefined ? s.phonicsToneKorkaaScore : 0,
    phonics_direct_spelling: s.phonicsDirectSpellingScore !== undefined ? s.phonicsDirectSpellingScore : 0,
    phonics_tone_spelling: s.phonicsToneSpellingScore !== undefined ? s.phonicsToneSpellingScore : 0,
    phonics_indirect_spelling: s.phonicsIndirectSpellingScore !== undefined ? s.phonicsIndirectSpellingScore : 0,
    phonics_cluster: s.phonicsClusterScore !== undefined ? s.phonicsClusterScore : 0,
    phonics_leading_consonant: s.phonicsLeadingConsonantScore !== undefined ? s.phonicsLeadingConsonantScore : 0,
  };
  const totals: Record<Subject, number> = {
    literacy: 0,
    math: 0,
    problem_solving: 0,
    inquiry: 0,
    creativity: 0,
    physical_health: 0,
    socio_emotional: 0,
    citizenship: 0,
    thai: 0,
    english: 0,
    science: 0,
    self_management: 0,
    higher_order_thinking: 0,
    communication: 0,
    teamwork_collaboration: 0,
    active_citizenship: 0,
    sustainable_living: 0,
    phonics_consonant: s.phonicsConsonantTotal !== undefined ? s.phonicsConsonantTotal : 0,
    phonics_vowel: s.phonicsVowelTotal !== undefined ? s.phonicsVowelTotal : 0,
    phonics_tone: s.phonicsToneTotal !== undefined ? s.phonicsToneTotal : 0,
    phonics_korkaa: s.phonicsKorkaaTotal !== undefined ? s.phonicsKorkaaTotal : 0,
    phonics_tone_korkaa: s.phonicsToneKorkaaTotal !== undefined ? s.phonicsToneKorkaaTotal : 0,
    phonics_direct_spelling: s.phonicsDirectSpellingTotal !== undefined ? s.phonicsDirectSpellingTotal : 0,
    phonics_tone_spelling: s.phonicsToneSpellingTotal !== undefined ? s.phonicsToneSpellingTotal : 0,
    phonics_indirect_spelling: s.phonicsIndirectSpellingTotal !== undefined ? s.phonicsIndirectSpellingTotal : 0,
    phonics_cluster: s.phonicsClusterTotal !== undefined ? s.phonicsClusterTotal : 0,
    phonics_leading_consonant: s.phonicsLeadingConsonantTotal !== undefined ? s.phonicsLeadingConsonantTotal : 0,
  };

  // Check nested scores object
  if (s.scores && s.totals) {
    scores.literacy = s.scores.literacy ?? s.scores.thai ?? 0;
    totals.literacy = s.totals.literacy ?? s.totals.thai ?? 0;

    scores.math = s.scores.math ?? 0;
    totals.math = s.totals.math ?? 0;

    scores.problem_solving = s.scores.problemSolving ?? s.scores.problem_solving ?? 0;
    totals.problem_solving = s.totals.problemSolving ?? s.totals.problem_solving ?? 0;

    scores.inquiry = s.scores.inquiry ?? s.scores.science ?? 0;
    totals.inquiry = s.totals.inquiry ?? s.totals.science ?? 0;

    scores.creativity = s.scores.creativity ?? 0;
    totals.creativity = s.totals.creativity ?? 0;

    scores.physical_health = s.scores.physicalHealth ?? s.scores.physical_health ?? 0;
    totals.physical_health = s.totals.physicalHealth ?? s.totals.physical_health ?? 0;

    scores.socio_emotional = s.scores.socioEmotional ?? s.scores.socio_emotional ?? 0;
    totals.socio_emotional = s.totals.socioEmotional ?? s.totals.socio_emotional ?? 0;

    scores.citizenship = s.scores.citizenship ?? 0;
    totals.citizenship = s.totals.citizenship ?? 0;
  } else {
    // Check flat structure (from profile history or alternative log)
    scores.literacy = s.literacyScore ?? s.thaiScore ?? 0;
    totals.literacy = s.literacyTotal ?? s.thaiTotal ?? 0;

    scores.math = s.mathScore ?? 0;
    totals.math = s.mathTotal ?? 0;

    scores.problem_solving = s.problemSolvingScore ?? 0;
    totals.problem_solving = s.problemSolvingTotal ?? 0;

    scores.inquiry = s.inquiryScore ?? s.scienceScore ?? 0;
    totals.inquiry = s.inquiryTotal ?? s.scienceTotal ?? 0;

    scores.creativity = s.creativityScore ?? 0;
    totals.creativity = s.creativityTotal ?? 0;

    scores.physical_health = s.physicalHealthScore ?? 0;
    totals.physical_health = s.physicalHealthTotal ?? 0;

    scores.socio_emotional = s.socioEmotionalScore ?? 0;
    totals.socio_emotional = s.socioEmotionalTotal ?? 0;

    scores.citizenship = s.citizenshipScore ?? 0;
    totals.citizenship = s.citizenshipTotal ?? 0;
  }

  return { scores, totals };
}

// In-memory cache for game_sessions from Firestore to avoid repetitive 5-second network roundtrips
let cachedCloudSessions: any[] | null = null;
let lastCloudFetchTime = 0;
const CLOUD_CACHE_TTL_MS = 60_000; // 60 seconds TTL

export function invalidateWeeklyTrendCache(): void {
  cachedCloudSessions = null;
  lastCloudFetchTime = 0;
}

/**
 * Fetch and build Weekly Trend Analytics from Firestore
 */
export async function fetchWeeklyDevelopmentTrendAnalysis(options?: {
  profileId?: string;
  grade?: Grade | 'ALL';
  maxWeeks?: number; // 4, 8, 12, or undefined for all
  forceRefresh?: boolean;
}): Promise<WeeklyTrendAnalysisResult> {
  const { profileId, grade, maxWeeks = 8, forceRefresh = false } = options || {};
  let allRawSessions: any[] = [];
  let dataSource: 'firestore' | 'local_fallback' = 'firestore';
  let cloudSessionCount = 0;

  const now = Date.now();
  const isCacheValid = !forceRefresh && cachedCloudSessions !== null && now - lastCloudFetchTime < CLOUD_CACHE_TTL_MS;

  if (isCacheValid && cachedCloudSessions) {
    allRawSessions = [...cachedCloudSessions];
    cloudSessionCount = allRawSessions.length;
  } else {
    // 1. Fetch from Firestore /game_sessions with responsive 2.5s timeout
    try {
      const q = query(
        collection(db, 'game_sessions'),
        orderBy('createdAt', 'desc'),
        limit(250)
      );
      const snap = await withTimeout(getDocs(q), 2500, null);
      if (snap && !snap.empty) {
        snap.forEach((d) => {
          const data = d.data();
          allRawSessions.push({ ...data, _id: d.id });
        });
        cloudSessionCount = allRawSessions.length;
        cachedCloudSessions = [...allRawSessions];
        lastCloudFetchTime = Date.now();
      }
    } catch (err) {
      console.warn('Could not fetch from Firestore /game_sessions:', err);
    }
  }

  // 2. If no cloud data or offline, merge/fallback with local profile history
  if (allRawSessions.length === 0) {
    dataSource = 'local_fallback';
    const localProfiles = storageService.getProfiles();
    localProfiles.forEach((p) => {
      (p.history || []).forEach((h) => {
        const sumScores =
          (h.literacyScore ?? h.thaiScore ?? 0) +
          (h.mathScore ?? 0) +
          (h.problemSolvingScore ?? 0) +
          (h.inquiryScore ?? h.scienceScore ?? 0) +
          (h.creativityScore ?? 0) +
          (h.physicalHealthScore ?? 0) +
          (h.socioEmotionalScore ?? 0) +
          (h.citizenshipScore ?? 0);

        const sumTotals =
          (h.literacyTotal ?? h.thaiTotal ?? 0) +
          (h.mathTotal ?? 0) +
          (h.problemSolvingTotal ?? 0) +
          (h.inquiryTotal ?? h.scienceTotal ?? 0) +
          (h.creativityTotal ?? 0) +
          (h.physicalHealthTotal ?? 0) +
          (h.socioEmotionalTotal ?? 0) +
          (h.citizenshipTotal ?? 0);

        allRawSessions.push({
          profileId: p.id,
          profileName: p.name,
          grade: p.grade,
          date: h.date,
          createdAt: h.date,
          totalCorrect: sumScores,
          totalQuestions: sumTotals > 0 ? sumTotals : 10,
          accuracy: h.accuracy ?? (sumTotals > 0 ? Math.round((sumScores / sumTotals) * 100) : 0),
          literacyScore: h.literacyScore ?? h.thaiScore ?? 0,
          literacyTotal: h.literacyTotal ?? h.thaiTotal ?? 0,
          mathScore: h.mathScore ?? 0,
          mathTotal: h.mathTotal ?? 0,
          problemSolvingScore: h.problemSolvingScore ?? 0,
          problemSolvingTotal: h.problemSolvingTotal ?? 0,
          inquiryScore: h.inquiryScore ?? h.scienceScore ?? 0,
          inquiryTotal: h.inquiryTotal ?? h.scienceTotal ?? 0,
          creativityScore: h.creativityScore ?? 0,
          creativityTotal: h.creativityTotal ?? 0,
          physicalHealthScore: h.physicalHealthScore ?? 0,
          physicalHealthTotal: h.physicalHealthTotal ?? 0,
          socioEmotionalScore: h.socioEmotionalScore ?? 0,
          socioEmotionalTotal: h.socioEmotionalTotal ?? 0,
          citizenshipScore: h.citizenshipScore ?? 0,
          citizenshipTotal: h.citizenshipTotal ?? 0,
          // 6 CBE Competencies
          selfManagementScore: h.selfManagementScore,
          selfManagementTotal: h.selfManagementTotal,
          higherOrderThinkingScore: h.higherOrderThinkingScore,
          higherOrderThinkingTotal: h.higherOrderThinkingTotal,
          communicationScore: h.communicationScore,
          communicationTotal: h.communicationTotal,
          teamworkScore: h.teamworkScore,
          teamworkTotal: h.teamworkTotal,
          activeCitizenshipScore: h.activeCitizenshipScore,
          activeCitizenshipTotal: h.activeCitizenshipTotal,
          sustainableLivingScore: h.sustainableLivingScore,
          sustainableLivingTotal: h.sustainableLivingTotal,
          // 10 Thai Phonics Units
          phonicsConsonantScore: h.phonicsConsonantScore,
          phonicsConsonantTotal: h.phonicsConsonantTotal,
          phonicsVowelScore: h.phonicsVowelScore,
          phonicsVowelTotal: h.phonicsVowelTotal,
          phonicsToneScore: h.phonicsToneScore,
          phonicsToneTotal: h.phonicsToneTotal,
          phonicsKorkaaScore: h.phonicsKorkaaScore,
          phonicsKorkaaTotal: h.phonicsKorkaaTotal,
          phonicsToneKorkaaScore: h.phonicsToneKorkaaScore,
          phonicsToneKorkaaTotal: h.phonicsToneKorkaaTotal,
          phonicsDirectSpellingScore: h.phonicsDirectSpellingScore,
          phonicsDirectSpellingTotal: h.phonicsDirectSpellingTotal,
          phonicsToneSpellingScore: h.phonicsToneSpellingScore,
          phonicsToneSpellingTotal: h.phonicsToneSpellingTotal,
          phonicsIndirectSpellingScore: h.phonicsIndirectSpellingScore,
          phonicsIndirectSpellingTotal: h.phonicsIndirectSpellingTotal,
          phonicsClusterScore: h.phonicsClusterScore,
          phonicsClusterTotal: h.phonicsClusterTotal,
          phonicsLeadingConsonantScore: h.phonicsLeadingConsonantScore,
          phonicsLeadingConsonantTotal: h.phonicsLeadingConsonantTotal,
        });
      });
    });
  }

  // 3. Filter sessions by profileId and/or grade if requested
  let filteredSessions = allRawSessions;
  if (profileId && profileId !== 'ALL') {
    filteredSessions = filteredSessions.filter((s) => s.profileId === profileId);
  }
  if (grade && grade !== 'ALL') {
    filteredSessions = filteredSessions.filter((s) => s.grade === grade);
  }

  // If filteredSessions is empty but a profile was selected, pull from that profile's local history
  if (filteredSessions.length === 0 && profileId && profileId !== 'ALL') {
    const localProfiles = storageService.getProfiles();
    const targetProfile = localProfiles.find((p) => p.id === profileId);
    if (targetProfile && targetProfile.history && targetProfile.history.length > 0) {
      targetProfile.history.forEach((h) => {
        const sumScores =
          (h.literacyScore ?? h.thaiScore ?? 0) +
          (h.mathScore ?? 0) +
          (h.problemSolvingScore ?? 0) +
          (h.inquiryScore ?? h.scienceScore ?? 0) +
          (h.creativityScore ?? 0) +
          (h.physicalHealthScore ?? 0) +
          (h.socioEmotionalScore ?? 0) +
          (h.citizenshipScore ?? 0);

        const sumTotals =
          (h.literacyTotal ?? h.thaiTotal ?? 0) +
          (h.mathTotal ?? 0) +
          (h.problemSolvingTotal ?? 0) +
          (h.inquiryTotal ?? h.scienceTotal ?? 0) +
          (h.creativityTotal ?? 0) +
          (h.physicalHealthTotal ?? 0) +
          (h.socioEmotionalTotal ?? 0) +
          (h.citizenshipTotal ?? 0);

        filteredSessions.push({
          profileId: targetProfile.id,
          profileName: targetProfile.name,
          grade: targetProfile.grade,
          date: h.date,
          createdAt: h.date,
          totalCorrect: sumScores,
          totalQuestions: sumTotals > 0 ? sumTotals : 10,
          accuracy: h.accuracy ?? (sumTotals > 0 ? Math.round((sumScores / sumTotals) * 100) : 0),
          literacyScore: h.literacyScore ?? h.thaiScore ?? 0,
          literacyTotal: h.literacyTotal ?? h.thaiTotal ?? 0,
          mathScore: h.mathScore ?? 0,
          mathTotal: h.mathTotal ?? 0,
          problemSolvingScore: h.problemSolvingScore ?? 0,
          problemSolvingTotal: h.problemSolvingTotal ?? 0,
          inquiryScore: h.inquiryScore ?? h.scienceScore ?? 0,
          inquiryTotal: h.inquiryTotal ?? h.scienceTotal ?? 0,
          creativityScore: h.creativityScore ?? 0,
          creativityTotal: h.creativityTotal ?? 0,
          physicalHealthScore: h.physicalHealthScore ?? 0,
          physicalHealthTotal: h.physicalHealthTotal ?? 0,
          socioEmotionalScore: h.socioEmotionalScore ?? 0,
          socioEmotionalTotal: h.socioEmotionalTotal ?? 0,
          citizenshipScore: h.citizenshipScore ?? 0,
          citizenshipTotal: h.citizenshipTotal ?? 0,
          selfManagementScore: h.selfManagementScore,
          selfManagementTotal: h.selfManagementTotal,
          higherOrderThinkingScore: h.higherOrderThinkingScore,
          higherOrderThinkingTotal: h.higherOrderThinkingTotal,
          communicationScore: h.communicationScore,
          communicationTotal: h.communicationTotal,
          teamworkScore: h.teamworkScore,
          teamworkTotal: h.teamworkTotal,
          activeCitizenshipScore: h.activeCitizenshipScore,
          activeCitizenshipTotal: h.activeCitizenshipTotal,
          sustainableLivingScore: h.sustainableLivingScore,
          sustainableLivingTotal: h.sustainableLivingTotal,
          phonicsConsonantScore: h.phonicsConsonantScore,
          phonicsConsonantTotal: h.phonicsConsonantTotal,
          phonicsVowelScore: h.phonicsVowelScore,
          phonicsVowelTotal: h.phonicsVowelTotal,
          phonicsToneScore: h.phonicsToneScore,
          phonicsToneTotal: h.phonicsToneTotal,
          phonicsKorkaaScore: h.phonicsKorkaaScore,
          phonicsKorkaaTotal: h.phonicsKorkaaTotal,
          phonicsToneKorkaaScore: h.phonicsToneKorkaaScore,
          phonicsToneKorkaaTotal: h.phonicsToneKorkaaTotal,
          phonicsDirectSpellingScore: h.phonicsDirectSpellingScore,
          phonicsDirectSpellingTotal: h.phonicsDirectSpellingTotal,
          phonicsToneSpellingScore: h.phonicsToneSpellingScore,
          phonicsToneSpellingTotal: h.phonicsToneSpellingTotal,
          phonicsIndirectSpellingScore: h.phonicsIndirectSpellingScore,
          phonicsIndirectSpellingTotal: h.phonicsIndirectSpellingTotal,
          phonicsClusterScore: h.phonicsClusterScore,
          phonicsClusterTotal: h.phonicsClusterTotal,
          phonicsLeadingConsonantScore: h.phonicsLeadingConsonantScore,
          phonicsLeadingConsonantTotal: h.phonicsLeadingConsonantTotal,
        });
      });
    }
  }

  // 4. Group by Monday-based Calendar Week
  const weeklyMap = new Map<string, {
    monday: Date;
    sunday: Date;
    sessions: any[];
  }>();

  filteredSessions.forEach((s) => {
    const rawDate = s.createdAt || s.date || s.timestamp;
    const sessionDate = rawDate ? new Date(rawDate) : new Date();
    if (isNaN(sessionDate.getTime())) return;

    const monday = getMondayOfWeek(sessionDate);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const weekKey = monday.toISOString().split('T')[0];

    if (!weeklyMap.has(weekKey)) {
      weeklyMap.set(weekKey, { monday, sunday, sessions: [] });
    }
    weeklyMap.get(weekKey)!.sessions.push(s);
  });

  // Sort weeks chronologically ascending
  const sortedWeekKeys = Array.from(weeklyMap.keys()).sort();
  // Take latest maxWeeks if specified
  const targetWeekKeys = maxWeeks ? sortedWeekKeys.slice(-maxWeeks) : sortedWeekKeys;

  const coreSkills: Subject[] = [
    'literacy',
    'math',
    'problem_solving',
    'inquiry',
    'creativity',
    'physical_health',
    'socio_emotional',
    'citizenship',
  ];

  const buckets: WeeklyDataBucket[] = [];
  let previousBucket: WeeklyDataBucket | null = null;
  let overallTotalCorrect = 0;
  let overallTotalQuestions = 0;
  let overallSessionCount = 0;

  targetWeekKeys.forEach((weekKey, index) => {
    const data = weeklyMap.get(weekKey)!;
    const { short, full } = formatThaiDateRange(data.monday, data.sunday);

    let weekCorrect = 0;
    let weekQuestions = 0;

    const skillAgg: Record<Subject, { correct: number; total: number }> = {
      literacy: { correct: 0, total: 0 },
      math: { correct: 0, total: 0 },
      problem_solving: { correct: 0, total: 0 },
      inquiry: { correct: 0, total: 0 },
      creativity: { correct: 0, total: 0 },
      physical_health: { correct: 0, total: 0 },
      socio_emotional: { correct: 0, total: 0 },
      citizenship: { correct: 0, total: 0 },
      thai: { correct: 0, total: 0 },
      english: { correct: 0, total: 0 },
      science: { correct: 0, total: 0 },
      self_management: { correct: 0, total: 0 },
      higher_order_thinking: { correct: 0, total: 0 },
      communication: { correct: 0, total: 0 },
      teamwork_collaboration: { correct: 0, total: 0 },
      active_citizenship: { correct: 0, total: 0 },
      sustainable_living: { correct: 0, total: 0 },
      phonics_consonant: { correct: 0, total: 0 },
      phonics_vowel: { correct: 0, total: 0 },
      phonics_tone: { correct: 0, total: 0 },
      phonics_korkaa: { correct: 0, total: 0 },
      phonics_tone_korkaa: { correct: 0, total: 0 },
      phonics_direct_spelling: { correct: 0, total: 0 },
      phonics_tone_spelling: { correct: 0, total: 0 },
      phonics_indirect_spelling: { correct: 0, total: 0 },
      phonics_cluster: { correct: 0, total: 0 },
      phonics_leading_consonant: { correct: 0, total: 0 },
    };

    data.sessions.forEach((s) => {
      const { scores, totals } = extractSessionSkillScores(s);
      coreSkills.forEach((skill) => {
        skillAgg[skill].correct += scores[skill] || 0;
        skillAgg[skill].total += totals[skill] || 0;
      });

      weekCorrect += s.totalCorrect || 0;
      weekQuestions += s.totalQuestions || 0;
    });

    const weeklyAccuracy = weekQuestions > 0 ? Math.round((weekCorrect / weekQuestions) * 100) : 0;
    overallTotalCorrect += weekCorrect;
    overallTotalQuestions += weekQuestions;
    overallSessionCount += data.sessions.length;

    const skillsRecord: Record<Subject, WeeklySkillStat> = {} as any;

    coreSkills.forEach((skill) => {
      const agg = skillAgg[skill];
      const accuracy = agg.total > 0 ? Math.round((agg.correct / agg.total) * 100) : 0;
      const isTested = agg.total > 0;

      let delta: number | null = null;
      if (previousBucket && previousBucket.skills[skill]?.isTested && isTested) {
        delta = accuracy - previousBucket.skills[skill].accuracy;
      }

      skillsRecord[skill] = {
        skillId: skill,
        skillName: SKILL_COLORS[skill].name,
        icon: SKILL_COLORS[skill].icon,
        color: SKILL_COLORS[skill].color,
        dotColor: SKILL_COLORS[skill].dot,
        correctCount: agg.correct,
        totalQuestions: agg.total,
        accuracy,
        deltaFromPreviousWeek: delta,
        isTested,
      };
    });

    const bucket: WeeklyDataBucket = {
      weekKey,
      weekNumber: index + 1,
      weekLabel: `สัปดาห์ ${index + 1}`,
      dateRangeLabel: short,
      fullDateLabel: full,
      startDate: data.monday.toISOString(),
      endDate: data.sunday.toISOString(),
      sessionCount: data.sessions.length,
      totalCorrect: weekCorrect,
      totalQuestions: weekQuestions,
      overallAccuracy: weeklyAccuracy,
      skills: skillsRecord,
    };

    buckets.push(bucket);
    previousBucket = bucket;
  });

  // 5. Calculate Insights: Top Improved, Highest, Needs Support
  let topImprovedSkill: WeeklyTrendAnalysisResult['topImprovedSkill'];
  let highestSkill: WeeklyTrendAnalysisResult['highestSkill'];
  let needsSupportSkill: WeeklyTrendAnalysisResult['needsSupportSkill'];

  if (buckets.length >= 2) {
    const firstBucket = buckets[0];
    const latestBucket = buckets[buckets.length - 1];

    let maxImprovement = -999;
    coreSkills.forEach((skill) => {
      const startAcc = firstBucket.skills[skill]?.isTested ? firstBucket.skills[skill].accuracy : null;
      const endAcc = latestBucket.skills[skill]?.isTested ? latestBucket.skills[skill].accuracy : null;
      if (startAcc !== null && endAcc !== null) {
        const diff = endAcc - startAcc;
        if (diff > maxImprovement && diff > 0) {
          maxImprovement = diff;
          topImprovedSkill = {
            skill,
            name: SKILL_COLORS[skill].name,
            icon: SKILL_COLORS[skill].icon,
            improvement: diff,
          };
        }
      }
    });
  }

  // Calculate overall average per skill across all weeks
  const skillOverallStats: Record<Subject, { totalCorrect: number; totalQuestions: number }> = {} as any;
  coreSkills.forEach((s) => (skillOverallStats[s] = { totalCorrect: 0, totalQuestions: 0 }));

  buckets.forEach((b) => {
    coreSkills.forEach((s) => {
      skillOverallStats[s].totalCorrect += b.skills[s].correctCount;
      skillOverallStats[s].totalQuestions += b.skills[s].totalQuestions;
    });
  });

  let highestAcc = -1;
  let lowestAcc = 101;

  coreSkills.forEach((skill) => {
    const st = skillOverallStats[skill];
    if (st.totalQuestions > 0) {
      const avg = Math.round((st.totalCorrect / st.totalQuestions) * 100);
      if (avg > highestAcc) {
        highestAcc = avg;
        highestSkill = {
          skill,
          name: SKILL_COLORS[skill].name,
          icon: SKILL_COLORS[skill].icon,
          averageAccuracy: avg,
        };
      }
      if (avg < lowestAcc) {
        lowestAcc = avg;
        needsSupportSkill = {
          skill,
          name: SKILL_COLORS[skill].name,
          icon: SKILL_COLORS[skill].icon,
          averageAccuracy: avg,
          recommendation: getRecommendationForSkill(skill),
        };
      }
    }
  });

  // 6. Pedagogical Insights
  const pedagogicalInsights: string[] = [];
  if (topImprovedSkill) {
    pedagogicalInsights.push(
      `🌟 ทักษะ "${topImprovedSkill.name}" มีการพัฒนาอย่างก้าวกระโดดขึ้นถึง +${topImprovedSkill.improvement}% จากสัปดาห์เริ่มต้น`
    );
  }
  if (highestSkill) {
    pedagogicalInsights.push(
      `🏆 จุดแข็งที่โดดเด่นสม่ำเสมอคือ "${highestSkill.name}" ด้วยคะแนนเฉลี่ย ${highestSkill.averageAccuracy}%`
    );
  }
  if (needsSupportSkill && needsSupportSkill.averageAccuracy < 70) {
    pedagogicalInsights.push(
      `💡 ควรส่งเสริมเพิ่มเติมในด้าน "${needsSupportSkill.name}" (เฉลี่ย ${needsSupportSkill.averageAccuracy}%) - ${needsSupportSkill.recommendation}`
    );
  }
  if (buckets.length >= 2) {
    const firstAcc = buckets[0].overallAccuracy;
    const lastAcc = buckets[buckets.length - 1].overallAccuracy;
    const diff = lastAcc - firstAcc;
    if (diff > 0) {
      pedagogicalInsights.push(
        `📈 ภาพรวมพัฒนาการทั้ง 8 ด้านมีแนวโน้มสูงขึ้นอย่างต่อเนื่อง (+${diff}% ในช่วง ${buckets.length} สัปดาห์)`
      );
    } else if (diff === 0) {
      pedagogicalInsights.push(`✨ พัฒนาการของเด็กรักษามาตรฐานความเสถียรได้อย่างสม่ำเสมอ`);
    }
  }

  const averageAccuracy = overallTotalQuestions > 0 ? Math.round((overallTotalCorrect / overallTotalQuestions) * 100) : 0;

  return {
    buckets,
    totalSessions: overallSessionCount,
    totalQuestions: overallTotalQuestions,
    averageAccuracy,
    dataSource,
    cloudSessionCount,
    topImprovedSkill,
    highestSkill,
    needsSupportSkill,
    pedagogicalInsights,
  };
}

/**
 * Recommendations for skills needing reinforcement
 */
function getRecommendationForSkill(skill: Subject): string {
  switch (skill) {
    case 'literacy':
      return 'เน้นการอ่านนิทานร่วมกัน ชี้ชวนดูตัวอักษร และฝึกสนทนาบรรยายภาพผ่านคำถามปลายเปิด';
    case 'math':
      return 'ชวนเล่นกิจกรรมนับสิ่งของรอบตัว จัดหมวดหมู่ของเล่นตามขนาด-สี และเปรียบเทียบจำนวน';
    case 'problem_solving':
      return 'ส่งเสริมการเล่นตัวต่อ ปริศนาเขาวงกต และกระตุ้นให้เด็กลองคิดวิธีแก้ปัญหาด้วยตนเอง';
    case 'inquiry':
      return 'พาสำรวจธรรมชาติรอบตัว ทดลองผสมสี สังเกตการลอย-จมของสิ่งของ และตั้งข้อสงสัยชวนคิด';
    case 'creativity':
      return 'เปิดโอกาสให้วาดรูป ระบายสี ปั้นดินน้ำมัน หรือเล่าเรื่องตามจินตนาการโดยอิสระ';
    case 'physical_health':
      return 'จัดกิจกรรมเคลื่อนไหวประกอบจังหวะ เคลื่อนไหวร่างกาย วิ่ง กระโดด และประสานสัมพันธ์มือและสายตา';
    case 'socio_emotional':
      return 'ฝึกระบุและพูดถึงอารมณ์ความรู้สึก เล่นบทบาทสมมติ และฝึกแบ่งปันรอคอยตามลำดับ';
    case 'citizenship':
      return 'ปลูกฝังการเก็บของเล่นเข้าที่ การปฏิบัติตามกติกาง่าย ๆ ในห้องเรียน และการช่วยเหลือผู้อื่น';
    default:
      return 'จัดกิจกรรมการเรียนรู้ผ่านการเล่นที่สอดคล้องกับความสนใจของเด็ก';
  }
}

/**
 * Seed realistic weekly game session samples to Firestore (6 Weeks of progressive learning)
 */
export async function seedDemoWeeklySessionsToFirestore(
  targetProfile: ChildProfile
): Promise<{ success: boolean; count: number; message: string }> {
  const dbs = getTargetFirestoreDatabases();
  const now = new Date();
  const demoWeeks = 6;
  let seededCount = 0;

  // Generate 2-3 sessions per week over the past 6 weeks
  for (let w = demoWeeks - 1; w >= 0; w--) {
    const weekOffsetDays = w * 7;
    const sessionCountThisWeek = 2;

    for (let sIdx = 0; sIdx < sessionCountThisWeek; sIdx++) {
      const sessionDate = new Date(now);
      sessionDate.setDate(now.getDate() - weekOffsetDays + (sIdx * 3));
      const isoDate = sessionDate.toISOString();
      const dateStr = isoDate.split('T')[0];
      const thaiTimestamp = sessionDate.toLocaleString('th-TH');

      // Progression curve: skill accuracies improve over time
      const progressionRatio = (demoWeeks - w) / demoWeeks; // 0.16 -> 1.0
      const baseLit = Math.min(3, Math.round(1 + progressionRatio * 2));
      const baseMath = Math.min(3, Math.round(1 + progressionRatio * 1.8));
      const baseProb = Math.min(3, Math.round(1 + progressionRatio * 2.2));
      const baseInq = Math.min(3, Math.round(2 + progressionRatio * 1.0));
      const baseCre = 3;
      const basePhy = Math.min(3, Math.round(2 + progressionRatio * 1.0));
      const baseSoc = Math.min(3, Math.round(1 + progressionRatio * 2.0));
      const baseCit = Math.min(3, Math.round(2 + progressionRatio * 1.0));

      const totalCorrect = baseLit + baseMath + baseProb + baseInq + baseCre + basePhy + baseSoc + baseCit;
      const totalQuestions = 24;
      const accuracy = Math.round((totalCorrect / totalQuestions) * 100);

      const payload: GameSessionPayload = {
        profileId: targetProfile.id,
        profileName: targetProfile.name,
        grade: targetProfile.grade,
        timestamp: thaiTimestamp,
        date: dateStr,
        totalCorrect,
        totalQuestions,
        accuracy,
        isPerfect: totalCorrect === totalQuestions,
        usedHandTracking: sIdx % 2 === 0,
        scores: {
          literacy: baseLit,
          math: baseMath,
          problemSolving: baseProb,
          inquiry: baseInq,
          creativity: baseCre,
          physicalHealth: basePhy,
          socioEmotional: baseSoc,
          citizenship: baseCit,
        },
        totals: {
          literacy: 3,
          math: 3,
          problemSolving: 3,
          inquiry: 3,
          creativity: 3,
          physicalHealth: 3,
          socioEmotional: 3,
          citizenship: 3,
        },
        createdAt: isoDate,
      };

      try {
        await Promise.allSettled(
          dbs.map((tdb) => addDoc(collection(tdb, 'game_sessions'), payload))
        );
        seededCount++;
      } catch (e) {
        console.warn('Seed session err:', e);
      }
    }
  }

  invalidateWeeklyTrendCache();

  return {
    success: seededCount > 0,
    count: seededCount,
    message: `สร้างและจำลองข้อมูลพัฒนาการ 6 สัปดาห์ขึ้น Firebase Firestore สำเร็จเรียบร้อย (${seededCount} รอบการเล่น) 📈✨`,
  };
}
