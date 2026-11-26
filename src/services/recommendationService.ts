import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db, withTimeout } from './cloudSyncService';
import { storageService } from './storageService';
import { Subject, ChildProfile, CurriculumMode } from '../types';
import { SKILLS_LIST, getSkillBySubject, CBE_COMPETENCIES_LIST } from '../data/skills';

export interface SubjectStat {
  subject: Subject;
  score: number;
  total: number;
  accuracy: number | null;
  wrongCount: number;
}

export interface SkillRecommendation {
  subject: Subject;
  rank: 1 | 2; // 1 = คะแนนต่ำสุดอันดับ 1, 2 = คะแนนต่ำสุดอันดับ 2
  score: number;
  total: number;
  accuracy: number | null;
  status: 'critical' | 'needs_practice' | 'untested' | 'mastered';
  title: string;
  shortName: string;
  code: string;
  icon: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  reason: string;
  pedagogicalTip: string;
  isCbe?: boolean;
}

export interface RecommendationResult {
  profileId: string;
  profileName: string;
  recommendations: SkillRecommendation[];
  allStats: Record<Subject, SubjectStat>;
  hasCloudData: boolean;
  totalSessionsAnalyzed: number;
  analyzedAt: string;
  curriculumMode: CurriculumMode;
  isCbe: boolean;
}

const PEDAGOGICAL_TIPS: Record<Subject, string> = {
  literacy: 'ส่งเสริมการฟังนิทาน ชวนคุยโต้ตอบ และเล่นเกมทายภาพสัญลักษณ์เพื่อขยายคลังคำศัพท์',
  math: 'ฝึกเปรียบเทียบสิ่งของรอบตัว จัดหมวดหมู่ นับจำนวน และสังเกตรูปร่างแบบรูป',
  problem_solving: 'กระตุ้นให้ลองผิดลองถูก ถามคำถามปลายเปิด "ถ้า...จะเกิดอะไรขึ้น" และคิดหาทางออก',
  inquiry: 'ชวนสังเกตธรรมชาติรอบตัว สัตว์ พืช อากาศ และทดลองสังเกตสิ่งแปลกใหม่ด้วยความสงสัยใคร่รู้',
  creativity: 'ให้เสรีภาพในการวาดภาพ เล่าเรื่องตามจินตนาการ และเคาะจังหวะดนตรีอย่างสนุกสนาน',
  physical_health: 'ฝึกสุขนิสัยการกิน การล้างมือ การพักผ่อน และการเคลื่อนไหวร่างกายอย่างปลอดภัย',
  socio_emotional: 'ช่วยสะท้อนอารมณ์ "หนูกำลังรู้สึกอย่างไร" ฝึกการรอคอย การแบ่งปัน และการให้อภัย',
  citizenship: 'ปลูกฝังการทิ้งขยะให้ลงถัง การเคารพข้อตกลงส่วนรวม และการดูแลรักษาสิ่งแวดล้อม',
  science: 'ชวนสังเกตธรรมชาติรอบตัว สัตว์ พืช อากาศ และทดลองสังเกตสิ่งแปลกใหม่ด้วยความสงสัยใคร่รู้',
  thai: 'ส่งเสริมการฟังนิทาน ชวนคุยโต้ตอบ และเล่นเกมทายภาพสัญลักษณ์เพื่อขยายคลังคำศัพท์',
  english: 'ฝึกออกเสียงโฟนิกส์ตัวอักษร ร้องเพลงภาษาอังกฤษสั้นๆ และจับคู่ภาพกับคำศัพท์ Sight Words ในชีวิตประจำวัน',
  // 6 CBE Competencies
  self_management: 'ฝึกการตั้งเป้าหมายประจำวัน การวางแผนตารางเวลา และการดูแลสุขอนามัยด้วยตนเอง',
  higher_order_thinking: 'ฝึกการคิดวิเคราะห์ แยกแยะข้อเท็จจริง แก้ปัญหาด้วยเหตุผล และคิดสร้างสรรค์สิ่งใหม่',
  communication: 'ฝึกการฟังอย่างตั้งใจ การแสดงความคิดเห็นอย่างสุภาพ และการใช้ภาษาสื่อสารชัดเจน',
  teamwork_collaboration: 'ส่งเสริมการทำงานกลุ่ม การแบ่งหน้าที่ การรับฟังผู้อื่น และการแก้ปัญหาอย่างสันติ',
  active_citizenship: 'ปลูกฝังความรับผิดชอบต่อส่วนรวม จิตอาสา การเคารพกฎกติกา และวิถีประชาธิปไตย',
  sustainable_living: 'เรียนรู้การอนุรักษ์ธรรมชาติ ประหยัดพลังงาน แยกขยะ และใช้เทคโนโลยีดิจิทัลอย่างปลอดภัย',
  // 10 Thai Phonics Units (สพฐ.)
  phonics_consonant: 'ฝึกออกเสียงพยัญชนะไทยให้ตรงตามเสียงแท้ เช่น กอ ขอ คอ และจำแนกไตรยางศ์ อักษร 3 หมู่',
  phonics_vowel: 'ฝึกจดจำรูปสระและเปล่งเสียงสระสั้น-ยาวอย่างชัดเจน พร้อมเข้าใจตำแหน่งสระหน้า หลัง บน ล่าง',
  phonics_tone: 'ฝึกจำแนกรูปวรรณยุกต์ทั้ง ๔ รูป (่ ้ ๊ ๋) และทำความเข้าใจเสียงวรรณยุกต์ทั้ง ๕ เสียง',
  phonics_korkaa: 'ฝึกแจกลูกสะกดคำในมาตราแม่ ก กา นำพยัญชนะมาประสมกับสระอย่างเป็นระบบและอ่านออกเสียงชัดถ้อยชัดคำ',
  phonics_tone_korkaa: 'ฝึกผันเสียงวรรณยุกต์คำในแม่ ก กา ตามหมู่อักษรสูง อักษรกลาง อักษรต่ำ ให้ตรงตามระดับเสียง',
  phonics_direct_spelling: 'ฝึกสะกดคำตรงตามมาตราตัวสะกด ๘ มาตรา (กง กม เกย เกอว กก กด กบ กน) โดยใช้ตัวสะกดตรงรูป',
  phonics_tone_spelling: 'ฝึกผันวรรณยุกต์คำที่มีตัวสะกด โดยสังเกตคำเป็น-คำตาย และหมู่อักษร 3 หมู่',
  phonics_indirect_spelling: 'ฝึกอ่านเขียนคำที่มีตัวสะกดไม่ตรงตามมาตรา จำแนกกลุ่มพยัญชนะสะกดในมาตรากด กบ กน กก',
  phonics_cluster: 'ฝึกออกเสียงคำควบกล้ำแท้ (ร, ล, ว) ให้กลมกลืนพร้อมกัน และสังเกตคำควบไม่แท้ที่ออกเสียงเฉพาะตัวหน้าหรือเปลี่ยนเป็นเสียง ซ',
  phonics_leading_consonant: 'ฝึกอ่านคำอักษรนำ ห นำ และ อ นำ ย รวมถึงคำสองพยางค์ที่ออกเสียงพยางค์แรก อะ กึ่งเสียง และพยางค์หลังผันตามอักษรนำ',
};

const EARLY_CHILDHOOD_SUBJECTS: Subject[] = [
  'literacy',
  'math',
  'problem_solving',
  'inquiry',
  'creativity',
  'physical_health',
  'socio_emotional',
  'citizenship',
];

const CBE_SUBJECTS: Subject[] = [
  'self_management',
  'higher_order_thinking',
  'communication',
  'teamwork_collaboration',
  'active_citizenship',
  'sustainable_living',
];

const THAI_PHONICS_SUBJECTS: Subject[] = [
  'phonics_consonant',
  'phonics_vowel',
  'phonics_tone',
  'phonics_korkaa',
  'phonics_tone_korkaa',
  'phonics_direct_spelling',
  'phonics_tone_spelling',
  'phonics_indirect_spelling',
  'phonics_cluster',
  'phonics_leading_consonant',
];

/**
 * Fetch and aggregate student performance from Firestore database (game_sessions & profiles)
 * filtered and aligned according to the active curriculum mode (8 skills vs 6 CBE competencies).
 */
export async function getStudentRecommendationFromFirestore(
  profileId: string,
  profileName?: string,
  curriculumMode: CurriculumMode = 'early_childhood'
): Promise<RecommendationResult> {
  const isCbe = curriculumMode === 'cbe_primary';
  const isPhonics = curriculumMode === 'thai_phonics';

  const statsMap: Record<Subject, { score: number; total: number }> = {
    literacy: { score: 0, total: 0 },
    math: { score: 0, total: 0 },
    problem_solving: { score: 0, total: 0 },
    inquiry: { score: 0, total: 0 },
    creativity: { score: 0, total: 0 },
    physical_health: { score: 0, total: 0 },
    socio_emotional: { score: 0, total: 0 },
    citizenship: { score: 0, total: 0 },
    science: { score: 0, total: 0 },
    thai: { score: 0, total: 0 },
    english: { score: 0, total: 0 },
    self_management: { score: 0, total: 0 },
    higher_order_thinking: { score: 0, total: 0 },
    communication: { score: 0, total: 0 },
    teamwork_collaboration: { score: 0, total: 0 },
    active_citizenship: { score: 0, total: 0 },
    sustainable_living: { score: 0, total: 0 },
    phonics_consonant: { score: 0, total: 0 },
    phonics_vowel: { score: 0, total: 0 },
    phonics_tone: { score: 0, total: 0 },
    phonics_korkaa: { score: 0, total: 0 },
    phonics_tone_korkaa: { score: 0, total: 0 },
    phonics_direct_spelling: { score: 0, total: 0 },
    phonics_tone_spelling: { score: 0, total: 0 },
    phonics_indirect_spelling: { score: 0, total: 0 },
    phonics_cluster: { score: 0, total: 0 },
    phonics_leading_consonant: { score: 0, total: 0 },
  };

  let sessionCount = 0;
  let hasCloudData = false;

  // 1. Fetch from Firestore /profiles/{profileId} document
  try {
    const profileDocRef = doc(db, 'profiles', profileId);
    const profileDoc = await withTimeout(getDoc(profileDocRef), 3500, null);
    if (profileDoc && profileDoc.exists()) {
      const data = profileDoc.data();
      const history = Array.isArray(data.history) ? data.history : [];
      if (history.length > 0) {
        hasCloudData = true;
        sessionCount += history.length;
        history.forEach((h: any) => {
          const litS = h.literacyScore ?? h.thaiScore ?? 0;
          const litT = h.literacyTotal ?? h.thaiTotal ?? 0;
          const inqS = h.inquiryScore ?? h.scienceScore ?? 0;
          const inqT = h.inquiryTotal ?? h.scienceTotal ?? 0;

          statsMap.literacy.score += litS;
          statsMap.literacy.total += litT;
          statsMap.math.score += h.mathScore || 0;
          statsMap.math.total += h.mathTotal || 0;
          statsMap.problem_solving.score += h.problemSolvingScore || 0;
          statsMap.problem_solving.total += h.problemSolvingTotal || 0;
          statsMap.inquiry.score += inqS;
          statsMap.inquiry.total += inqT;
          statsMap.creativity.score += h.creativityScore || 0;
          statsMap.creativity.total += h.creativityTotal || 0;
          statsMap.physical_health.score += h.physicalHealthScore || 0;
          statsMap.physical_health.total += h.physicalHealthTotal || 0;
          statsMap.socio_emotional.score += h.socioEmotionalScore || 0;
          statsMap.socio_emotional.total += h.socioEmotionalTotal || 0;
          statsMap.citizenship.score += h.citizenshipScore || 0;
          statsMap.citizenship.total += h.citizenshipTotal || 0;

          // CBE Competencies
          statsMap.self_management.score += h.selfManagementScore || h.self_managementScore || 0;
          statsMap.self_management.total += h.selfManagementTotal || h.self_managementTotal || 0;
          statsMap.higher_order_thinking.score += h.higherOrderThinkingScore || h.higher_order_thinkingScore || 0;
          statsMap.higher_order_thinking.total += h.higherOrderThinkingTotal || h.higher_order_thinkingTotal || 0;
          statsMap.communication.score += h.communicationScore || 0;
          statsMap.communication.total += h.communicationTotal || 0;
          statsMap.teamwork_collaboration.score += h.teamworkScore || h.teamwork_collaborationScore || 0;
          statsMap.teamwork_collaboration.total += h.teamworkTotal || h.teamwork_collaborationTotal || 0;
          statsMap.active_citizenship.score += h.activeCitizenshipScore || h.active_citizenshipScore || 0;
          statsMap.active_citizenship.total += h.activeCitizenshipTotal || h.active_citizenshipTotal || 0;
          statsMap.sustainable_living.score += h.sustainableLivingScore || h.sustainable_livingScore || 0;
          statsMap.sustainable_living.total += h.sustainableLivingTotal || h.sustainable_livingTotal || 0;
        });
      }
    }
  } catch (err) {
    console.warn('[Recommendation] Firestore profile doc query fallback:', err);
  }

  // 2. Also check Firestore /game_sessions (if no history in profile, or to supplement)
  try {
    const sessionsCol = collection(db, 'game_sessions');
    let q = query(
      sessionsCol,
      where('profileId', '==', profileId),
      orderBy('createdAt', 'desc'),
      limit(30)
    );

    let snap = await withTimeout(getDocs(q), 3500, null);

    // Fallback: if no sessions found by ID, query recent sessions and match by profileId or profileName
    if (!snap || snap.empty) {
      const recentQ = query(sessionsCol, orderBy('createdAt', 'desc'), limit(40));
      const recentSnap = await withTimeout(getDocs(recentQ), 3500, null);
      if (recentSnap && !recentSnap.empty) {
        const matchingDocs = recentSnap.docs.filter((d) => {
          const data = d.data();
          return data.profileId === profileId || (profileName && data.profileName === profileName);
        });
        if (matchingDocs.length > 0) {
          snap = { ...recentSnap, docs: matchingDocs, empty: false } as any;
        }
      }
    }

    // If profile had 0 history, use game_sessions
    if (sessionCount === 0 && snap && !snap.empty) {
      hasCloudData = true;
      snap.docs.forEach((docSnap) => {
        const d = docSnap.data();
        sessionCount++;
        const s = d.scores || {};
        const t = d.totals || {};

        statsMap.literacy.score += (s.literacy || 0) + (s.thai || 0);
        statsMap.literacy.total += (t.literacy || 0) + (t.thai || 0);
        statsMap.math.score += s.math || 0;
        statsMap.math.total += t.math || 0;
        statsMap.problem_solving.score += s.problemSolving || s.problem_solving || 0;
        statsMap.problem_solving.total += t.problemSolving || t.problem_solving || 0;
        statsMap.inquiry.score += (s.inquiry || 0) + (s.science || 0);
        statsMap.inquiry.total += (t.inquiry || 0) + (t.science || 0);
        statsMap.creativity.score += s.creativity || 0;
        statsMap.creativity.total += t.creativity || 0;
        statsMap.physical_health.score += s.physicalHealth || s.physical_health || 0;
        statsMap.physical_health.total += t.physicalHealth || t.physical_health || 0;
        statsMap.socio_emotional.score += s.socioEmotional || s.socio_emotional || 0;
        statsMap.socio_emotional.total += t.socioEmotional || t.socio_emotional || 0;
        statsMap.citizenship.score += s.citizenship || 0;
        statsMap.citizenship.total += t.citizenship || 0;
        statsMap.english.score += s.english || 0;
        statsMap.english.total += t.english || 0;

        // CBE Competencies
        statsMap.self_management.score += s.self_management || s.selfManagement || 0;
        statsMap.self_management.total += t.self_management || t.selfManagement || 0;
        statsMap.higher_order_thinking.score += s.higher_order_thinking || s.higherOrderThinking || 0;
        statsMap.higher_order_thinking.total += t.higher_order_thinking || t.higherOrderThinking || 0;
        statsMap.communication.score += s.communication || 0;
        statsMap.communication.total += t.communication || 0;
        statsMap.teamwork_collaboration.score += s.teamwork_collaboration || s.teamwork || 0;
        statsMap.teamwork_collaboration.total += t.teamwork_collaboration || t.teamwork || 0;
        statsMap.active_citizenship.score += s.active_citizenship || s.activeCitizenship || 0;
        statsMap.active_citizenship.total += t.active_citizenship || t.activeCitizenship || 0;
        statsMap.sustainable_living.score += s.sustainable_living || s.sustainableLiving || 0;
        statsMap.sustainable_living.total += t.sustainable_living || t.sustainableLiving || 0;
      });
    }
  } catch (err) {
    console.warn('[Recommendation] Firestore game_sessions query fallback:', err);
  }

  // 3. Fallback to local profile history if Firestore is unreachable or offline
  if (sessionCount === 0) {
    const localProfiles = storageService.getProfiles();
    const local = localProfiles.find((p) => p.id === profileId);
    if (local && local.history && local.history.length > 0) {
      sessionCount = local.history.length;
      local.history.forEach((h: any) => {
        const litS = h.literacyScore ?? h.thaiScore ?? 0;
        const litT = h.literacyTotal ?? h.thaiTotal ?? 0;
        const inqS = h.inquiryScore ?? h.scienceScore ?? 0;
        const inqT = h.inquiryTotal ?? h.scienceTotal ?? 0;

        statsMap.literacy.score += litS;
        statsMap.literacy.total += litT;
        statsMap.math.score += h.mathScore || 0;
        statsMap.math.total += h.mathTotal || 0;
        statsMap.problem_solving.score += h.problemSolvingScore || 0;
        statsMap.problem_solving.total += h.problemSolvingTotal || 0;
        statsMap.inquiry.score += inqS;
        statsMap.inquiry.total += inqT;
        statsMap.creativity.score += h.creativityScore || 0;
        statsMap.creativity.total += h.creativityTotal || 0;
        statsMap.physical_health.score += h.physicalHealthScore || 0;
        statsMap.physical_health.total += h.physicalHealthTotal || 0;
        statsMap.socio_emotional.score += h.socioEmotionalScore || 0;
        statsMap.socio_emotional.total += h.socioEmotionalTotal || 0;
        statsMap.citizenship.score += h.citizenshipScore || 0;
        statsMap.citizenship.total += h.citizenshipTotal || 0;
        statsMap.english.score += h.englishScore || 0;
        statsMap.english.total += h.englishTotal || 0;

        // CBE Competencies
        statsMap.self_management.score += h.selfManagementScore || h.self_managementScore || 0;
        statsMap.self_management.total += h.selfManagementTotal || h.self_managementTotal || 0;
        statsMap.higher_order_thinking.score += h.higherOrderThinkingScore || h.higher_order_thinkingScore || 0;
        statsMap.higher_order_thinking.total += h.higherOrderThinkingTotal || h.higher_order_thinkingTotal || 0;
        statsMap.communication.score += h.communicationScore || 0;
        statsMap.communication.total += h.communicationTotal || 0;
        statsMap.teamwork_collaboration.score += h.teamworkScore || h.teamwork_collaborationScore || 0;
        statsMap.teamwork_collaboration.total += h.teamworkTotal || h.teamwork_collaborationTotal || 0;
        statsMap.active_citizenship.score += h.activeCitizenshipScore || h.active_citizenshipScore || 0;
        statsMap.active_citizenship.total += h.activeCitizenshipTotal || h.active_citizenshipTotal || 0;
        statsMap.sustainable_living.score += h.sustainableLivingScore || h.sustainable_livingScore || 0;
        statsMap.sustainable_living.total += h.sustainableLivingTotal || h.sustainable_livingTotal || 0;
      });
    }
  }

  // Filter candidate subjects based on curriculum mode
  const targetSubjects = isPhonics
    ? THAI_PHONICS_SUBJECTS
    : isCbe
    ? CBE_SUBJECTS
    : EARLY_CHILDHOOD_SUBJECTS;

  // Build subject stats array
  const allStats: Record<Subject, SubjectStat> = {} as any;
  const statsList: SubjectStat[] = [];

  targetSubjects.forEach((subj) => {
    const s = statsMap[subj] || { score: 0, total: 0 };
    const accuracy = s.total > 0 ? Math.round((s.score / s.total) * 100) : null;
    const stat: SubjectStat = {
      subject: subj,
      score: s.score,
      total: s.total,
      accuracy,
      wrongCount: Math.max(0, s.total - s.score),
    };
    allStats[subj] = stat;
    statsList.push(stat);
  });

  // Execute Core Recommendation Algorithm:
  // Identify the lowest 2 scoring subjects (สมรรถนะ/วิชาที่เด็กมีคะแนนต่ำสุด 2 อันดับแรก)
  const recommendations = calculateLowestTwoSkills(statsList, profileName || 'หนูน้อย', isCbe);

  return {
    profileId,
    profileName: profileName || 'หนูน้อย',
    recommendations,
    allStats,
    hasCloudData,
    totalSessionsAnalyzed: sessionCount,
    analyzedAt: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
    curriculumMode,
    isCbe,
  };
}

/**
 * Pure recommendation ranking algorithm:
 * Determines the lowest 2 scoring subjects/competencies from subject stats.
 */
export function calculateLowestTwoSkills(
  statsList: SubjectStat[],
  studentName = 'หนูน้อย',
  isCbe = false
): SkillRecommendation[] {
  // Partition into tested and untested
  const tested = statsList.filter((s) => s.total > 0);
  const untested = statsList.filter((s) => s.total === 0);

  // Sort tested subjects by lowest performance:
  // 1. Lower accuracy ascending (e.g. 20% before 50%)
  // 2. Higher number of wrong answers descending (e.g. 5 mistakes before 2 mistakes)
  // 3. Higher total attempted questions descending
  tested.sort((a, b) => {
    const accA = a.accuracy ?? 100;
    const accB = b.accuracy ?? 100;
    if (accA !== accB) return accA - accB;
    if (b.wrongCount !== a.wrongCount) return b.wrongCount - a.wrongCount;
    return b.total - a.total;
  });

  let selectedStats: { stat: SubjectStat; rank: 1 | 2; isUntested?: boolean }[] = [];

  if (tested.length >= 2) {
    // Child has at least 2 tested subjects
    // If all tested subjects have 100% accuracy and there are untested subjects,
    // recommend untested subjects to broaden development!
    const areAllPerfect = tested.every((t) => t.accuracy === 100);
    if (areAllPerfect && untested.length > 0) {
      if (untested.length >= 2) {
        selectedStats = [
          { stat: untested[0], rank: 1, isUntested: true },
          { stat: untested[1], rank: 2, isUntested: true },
        ];
      } else {
        selectedStats = [
          { stat: tested[0], rank: 1 },
          { stat: untested[0], rank: 2, isUntested: true },
        ];
      }
    } else {
      // Normal case: Lowest 2 scoring subjects!
      selectedStats = [
        { stat: tested[0], rank: 1 },
        { stat: tested[1], rank: 2 },
      ];
    }
  } else if (tested.length === 1) {
    // 1 tested subject, fill remaining from untested
    selectedStats.push({ stat: tested[0], rank: 1 });
    const fallbackUntested = untested[0] || statsList.find((s) => s.subject !== tested[0].subject)!;
    selectedStats.push({ stat: fallbackUntested, rank: 2, isUntested: untested.length > 0 });
  } else {
    // 0 tested subjects:
    // If CBE primary: recommend core foundational competencies (Self-Management + Higher-Order Thinking)
    // If early childhood: recommend foundational skills (Literacy + Math)
    if (isCbe) {
      const selfMgmt = statsList.find((s) => s.subject === 'self_management') || statsList[0];
      const hot = statsList.find((s) => s.subject === 'higher_order_thinking') || statsList[1] || statsList[0];
      selectedStats = [
        { stat: selfMgmt, rank: 1, isUntested: true },
        { stat: hot, rank: 2, isUntested: true },
      ];
    } else {
      const lit = statsList.find((s) => s.subject === 'literacy') || statsList[0];
      const math = statsList.find((s) => s.subject === 'math') || statsList[1] || statsList[0];
      selectedStats = [
        { stat: lit, rank: 1, isUntested: true },
        { stat: math, rank: 2, isUntested: true },
      ];
    }
  }

  const subjectNoun = isCbe ? 'สมรรถนะ' : 'ทักษะ';

  // Map to detailed SkillRecommendation objects
  return selectedStats.map(({ stat, rank, isUntested }) => {
    const skillDef = getSkillBySubject(stat.subject);
    const tip = PEDAGOGICAL_TIPS[stat.subject] || 'ฝึกฝนผ่านกิจกรรมและการเรียนรู้เชิงรุกที่สนุกสนาน';

    let status: SkillRecommendation['status'] = 'needs_practice';
    let reason = '';

    if (isUntested || stat.total === 0) {
      status = 'untested';
      reason = `ยังไม่มีประวัติการสอบใน${subjectNoun}นี้บนระบบ แนะนำเริ่มฝึกฝนเพื่อเสริมสร้างพัฒนาการ`;
    } else if (stat.accuracy !== null && stat.accuracy < 60) {
      status = 'critical';
      reason = `คะแนนความแม่นยำ ${stat.accuracy}% (ตอบถูก ${stat.score}/${stat.total} ข้อ, มีข้อควรทบทวน ${stat.wrongCount} ข้อ) เป็น${subjectNoun}คะแนนต่ำสุดอันดับ ${rank}`;
    } else if (stat.accuracy !== null && stat.accuracy < 80) {
      status = 'needs_practice';
      reason = `คะแนนความแม่นยำ ${stat.accuracy}% (ตอบถูก ${stat.score}/${stat.total} ข้อ) แนะนำทบทวนเพื่อให้เชี่ยวชาญระดับดีเยี่ยม`;
    } else {
      status = 'mastered';
      reason = `คะแนนเต็มหรือระดับดีเยี่ยม (${stat.accuracy}%) แนะนำฝึกฝนสม่ำเสมอเพื่อรักษาความชำนาญ`;
    }

    return {
      subject: stat.subject,
      rank,
      score: stat.score,
      total: stat.total,
      accuracy: stat.accuracy,
      status,
      title: skillDef.name.th,
      shortName: skillDef.shortName.th,
      code: skillDef.code,
      icon: skillDef.icon,
      badgeBg: skillDef.badgeBg,
      badgeBorder: skillDef.badgeBorder,
      badgeText: skillDef.badgeText,
      reason,
      pedagogicalTip: tip,
      isCbe,
    };
  });
}
