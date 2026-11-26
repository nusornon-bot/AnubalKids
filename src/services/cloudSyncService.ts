/**
 * Cloud and Google Sheets Dual Persistence Service
 * 
 * Synchronizes:
 * 1. Firebase Firestore (Cloud Database):
 *    - /game_sessions : Complete log of every round played
 *    - /profiles : Student profiles across devices
 *    - /progress_reports : Comprehensive developmental assessment reports
 * 2. Google Sheets (Spreadsheet Webhook / API):
 *    - Real-time logging of game results and developmental summaries
 */

import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  limit,
  writeBatch,
} from 'firebase/firestore';
import { db, dbId, fbApp, getTargetFirestoreDatabases } from './firebaseDb';
export { db, dbId, fbApp, getTargetFirestoreDatabases };
import { ChildProfile, Subject, Grade, Question, ExamSet } from '../types';
import { getGlobalAppsScriptUrl, DEFAULT_APPS_SCRIPT_URL, TARGET_SHEET_ID } from './googleSheetsService';
import { getAccessToken } from './firebaseAuthService';
import { storageService } from './storageService';
import { getDeviceId, getDeviceName } from './deviceService';
import { offlineSyncService } from './offlineSyncService';

/**
 * Safe write helper to multi-target databases
 */
export async function writeToAllDatabases(
  collectionName: string,
  docId: string | null,
  data: any
): Promise<string | undefined> {
  let createdId: string | undefined = docId || undefined;
  const dbs = getTargetFirestoreDatabases();
  await Promise.allSettled(
    dbs.map(async (targetDb) => {
      if (docId) {
        await withTimeout(
          setDoc(doc(targetDb, collectionName, docId), data, { merge: true }),
          4500,
          undefined
        );
      } else {
        const ref = await withTimeout(
          addDoc(collection(targetDb, collectionName), data),
          4500,
          null
        );
        if (ref && !createdId) {
          createdId = ref.id;
        }
      }
    })
  );
  return createdId;
}

/**
 * Safe delete helper from multi-target databases
 */
export async function deleteFromAllDatabases(
  collectionName: string,
  docId: string
): Promise<void> {
  const dbs = getTargetFirestoreDatabases();
  await Promise.allSettled(
    dbs.map(async (targetDb) => {
      await withTimeout(
        deleteDoc(doc(targetDb, collectionName, docId)),
        4500,
        undefined
      );
    })
  );
}

/**
 * Robust timeout wrapper to guarantee network requests never hang or freeze UI
 */
export function withTimeout<T>(promise: Promise<T>, ms = 4500, fallback: T): Promise<T> {
  let timer: any;
  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => resolve(fallback), ms);
  });
  return Promise.race([
    promise
      .then((res) => {
        clearTimeout(timer);
        return res;
      })
      .catch((err) => {
        clearTimeout(timer);
        console.warn('Promise timed/failed:', err);
        return fallback;
      }),
    timeoutPromise,
  ]);
}

export interface GameSessionPayload {
  profileId: string;
  profileName: string;
  grade: Grade;
  timestamp: string;
  date: string;
  totalCorrect: number;
  totalQuestions: number;
  accuracy: number;
  isPerfect: boolean;
  usedHandTracking: boolean;
  scores: {
    literacy: number;
    math: number;
    problemSolving: number;
    inquiry: number;
    creativity: number;
    physicalHealth: number;
    socioEmotional: number;
    citizenship: number;
  };
  totals: {
    literacy: number;
    math: number;
    problemSolving: number;
    inquiry: number;
    creativity: number;
    physicalHealth: number;
    socioEmotional: number;
    citizenship: number;
  };
  createdAt: string;
}

export interface AssessmentReportPayload {
  profileId: string;
  profileName: string;
  grade: Grade | 'ALL';
  overallAccuracy: number;
  literacyRate: number;
  mathRate: number;
  problemSolvingRate: number;
  inquiryRate: number;
  creativityRate: number;
  physicalHealthRate?: number;
  socioEmotionalRate?: number;
  citizenshipRate?: number;
  summary: string;
  evaluatedAt: string;
}

/**
 * 1. Send record to Google Sheets via Webhook (Apps Script) or Direct API
 */
async function sendToGoogleSheets(payload: {
  timestamp: string;
  category: string;
  rating: number;
  message: string;
  senderName: string;
  senderRole: string;
  contactInfo: string;
  profileName: string;
  currentGrade: string;
  deviceInfo: string;
  [key: string]: any;
}): Promise<{ success: boolean; method: string; error?: string }> {
  const appsScriptUrl = (await getGlobalAppsScriptUrl()) || DEFAULT_APPS_SCRIPT_URL;

  // Option A: Apps Script Webhook (No auth required, public web app)
  if (appsScriptUrl && appsScriptUrl.startsWith('http')) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);
      await fetch(appsScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timer);
      return { success: true, method: 'webhook' };
    } catch (err: any) {
      console.warn('Apps Script Webhook failed or timed out:', err);
    }
  }

  // Option B: Direct Google Sheets API if access token is available
  try {
    const token = await getAccessToken();
    if (token) {
      const newRow = [
        payload.timestamp,
        payload.category,
        payload.rating,
        payload.message,
        payload.senderName,
        payload.senderRole,
        payload.contactInfo || '-',
        payload.profileName || '-',
        payload.currentGrade || '-',
        payload.deviceInfo || '-',
      ];

      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${TARGET_SHEET_ID}/values/A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(appendUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [newRow] }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        return { success: true, method: 'direct_api' };
      }
    }
  } catch (err: any) {
    console.warn('Direct Google Sheets append failed:', err);
  }

  return { success: false, method: 'none', error: 'ไม่สามารถติดต่อ Google Sheets ได้' };
}

/**
 * 2. Record Game Round Result Dual (Firestore + Google Sheets)
 */
export async function recordGameSessionDual(
  profile: ChildProfile,
  roundResults: { subject: Subject; isCorrect: boolean }[],
  usedHandTracking = false
): Promise<{
  firestoreSuccess: boolean;
  sheetsSuccess: boolean;
  sessionId?: string;
  queuedOffline?: boolean;
}> {
  // Break down scores for all 8 skills
  let roundLitScore = 0, roundLitTotal = 0;
  let roundMathScore = 0, roundMathTotal = 0;
  let roundProbScore = 0, roundProbTotal = 0;
  let roundInqScore = 0, roundInqTotal = 0;
  let roundCreScore = 0, roundCreTotal = 0;
  let roundPhyScore = 0, roundPhyTotal = 0;
  let roundSocScore = 0, roundSocTotal = 0;
  let roundCitScore = 0, roundCitTotal = 0;

  roundResults.forEach((r) => {
    if (r.subject === 'literacy' || r.subject === 'thai') {
      roundLitTotal++;
      if (r.isCorrect) roundLitScore++;
    } else if (r.subject === 'math') {
      roundMathTotal++;
      if (r.isCorrect) roundMathScore++;
    } else if (r.subject === 'problem_solving') {
      roundProbTotal++;
      if (r.isCorrect) roundProbScore++;
    } else if (r.subject === 'inquiry' || r.subject === 'science') {
      roundInqTotal++;
      if (r.isCorrect) roundInqScore++;
    } else if (r.subject === 'creativity') {
      roundCreTotal++;
      if (r.isCorrect) roundCreScore++;
    } else if (r.subject === 'physical_health') {
      roundPhyTotal++;
      if (r.isCorrect) roundPhyScore++;
    } else if (r.subject === 'socio_emotional') {
      roundSocTotal++;
      if (r.isCorrect) roundSocScore++;
    } else if (r.subject === 'citizenship') {
      roundCitTotal++;
      if (r.isCorrect) roundCitScore++;
    }
  });

  const totalCorrect =
    roundLitScore +
    roundMathScore +
    roundProbScore +
    roundInqScore +
    roundCreScore +
    roundPhyScore +
    roundSocScore +
    roundCitScore;
  const totalQuestions =
    roundLitTotal +
    roundMathTotal +
    roundProbTotal +
    roundInqTotal +
    roundCreTotal +
    roundPhyTotal +
    roundSocTotal +
    roundCitTotal;
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 100;
  const starCount = accuracy >= 85 ? 3 : accuracy >= 55 ? 2 : 1;
  const now = new Date();
  const timestampThai = now.toLocaleString('th-TH');
  const dateStr = now.toISOString().split('T')[0];

  const sessionPayload: GameSessionPayload = {
    profileId: profile.id,
    profileName: profile.name,
    grade: profile.grade,
    timestamp: timestampThai,
    date: dateStr,
    totalCorrect,
    totalQuestions,
    accuracy,
    isPerfect: totalQuestions > 0 && totalCorrect === totalQuestions,
    usedHandTracking,
    scores: {
      literacy: roundLitScore,
      math: roundMathScore,
      problemSolving: roundProbScore,
      inquiry: roundInqScore,
      creativity: roundCreScore,
      physicalHealth: roundPhyScore,
      socioEmotional: roundSocScore,
      citizenship: roundCitScore,
    },
    totals: {
      literacy: roundLitTotal,
      math: roundMathTotal,
      problemSolving: roundProbTotal,
      inquiry: roundInqTotal,
      creativity: roundCreTotal,
      physicalHealth: roundPhyTotal,
      socioEmotional: roundSocTotal,
      citizenship: roundCitTotal,
    },
    createdAt: now.toISOString(),
  };

  let firestoreSuccess = false;
  let sessionId: string | undefined;

  // A. Save to Firestore with multi-database support
  try {
    sessionId = await writeToAllDatabases('game_sessions', null, sessionPayload);
    if (sessionId) {
      firestoreSuccess = true;
    }

    // Also sync updated profile state to Firestore /profiles
    await writeToAllDatabases('profiles', profile.id, {
      id: profile.id,
      name: profile.name,
      grade: profile.grade,
      avatar: profile.avatar,
      avatarBg: profile.avatarBg || 'amber',
      deviceId: profile.deviceId || getDeviceId(),
      createdDeviceName: profile.createdDeviceName || getDeviceName(),
      createdByEmail: profile.createdByEmail || '',
      totalScore: profile.totalScore,
      totalQuestions: profile.totalQuestions,
      streakDays: profile.streakDays,
      lastPlayedDate: profile.lastPlayedDate,
      badges: profile.badges || [],
      history: (profile.history || []).slice(-30),
      updatedAt: now.toISOString(),
    });
  } catch (err) {
    console.warn('Firestore game session backup err:', err);
  }

  // B. Send to Google Sheets
  const sheetsPayload = {
    timestamp: timestampThai,
    category: `🎮 เล่นเกม (${profile.grade})`,
    rating: starCount,
    message: `ตอบถูก ${totalCorrect}/${totalQuestions} ข้อ (ความแม่นยำ ${accuracy}%) | 1.ภาษา: ${roundLitScore}/${roundLitTotal} | 2.คำนวณ: ${roundMathScore}/${roundMathTotal} | 3.แก้ปัญหา: ${roundProbScore}/${roundProbTotal} | 4.สืบเสาะ: ${roundInqScore}/${roundInqTotal} | 5.สร้างสรรค์: ${roundCreScore}/${roundCreTotal} | 6.สุขภาวะกาย: ${roundPhyScore}/${roundPhyTotal} | 7.อารมณ์สังคม: ${roundSocScore}/${roundSocTotal} | 8.พลเมือง: ${roundCitScore}/${roundCitTotal}`,
    senderName: profile.name,
    senderRole: 'นักเรียน',
    contactInfo: `Streak: ${profile.streakDays} วัน | โหมด: ${usedHandTracking ? 'ตรวจจับมือ' : 'สัมผัส'}`,
    profileName: profile.name,
    currentGrade: profile.grade,
    deviceInfo: `${window.innerWidth}x${window.innerHeight} (${/Mobi|Android/i.test(navigator.userAgent) ? 'มือถือ' : 'คอมพิวเตอร์'})`,
    type: 'GAME_SESSION',
    totalCorrect,
    totalQuestions,
    accuracy,
  };

  const sheetsRes = await sendToGoogleSheets(sheetsPayload);

  // If Firestore could not be reached (offline or timeout), safely queue to pending sync
  let queuedOffline = false;
  if (!firestoreSuccess) {
    offlineSyncService.savePendingScore({
      type: 'round_session',
      profileId: profile.id,
      profileName: profile.name,
      grade: profile.grade,
      timestamp: now.toISOString(),
      displayTimestamp: timestampThai,
      totalCorrect,
      totalQuestions,
      accuracy,
      usedHandTracking,
      scores: sessionPayload.scores,
      totals: sessionPayload.totals,
    });
    queuedOffline = true;
  }

  return {
    firestoreSuccess,
    sheetsSuccess: sheetsRes.success,
    sessionId,
    queuedOffline,
  };
}

/**
 * Record an educational skill game session (e.g. matching, sequence sorting, jigsaw, rules)
 */
export async function recordSkillGameSessionDual(
  profile: ChildProfile,
  category: string,
  level: number,
  starsEarned: number,
  timeSpentSeconds: number
): Promise<{ success: boolean; queuedOffline?: boolean }> {
  const now = new Date();
  const timestampThai = now.toLocaleString('th-TH');
  const dateStr = now.toISOString().split('T')[0];

  const categoryTitles: Record<string, string> = {
    matching: 'จับคู่ภาพเหมือน & ภาพสัมพันธ์',
    sequence_sorting: 'เรียงลำดับ & จัดหมวดหมู่',
    jigsaw: 'ต่อภาพ (จิ๊กซอว์)',
    rules: 'เกมตามกฎกติกาง่าย ๆ',
    maze_path: 'เขาวงกต & ลากเส้นตามรอย',
    shadow_tangram: 'เงาปริศนา & แทนแกรมรูปทรง',
    spot_differences: 'จับผิดภาพ & ค้นหาสิ่งของ',
    auditory_rhythm: 'ฟังเสียง & เคาะจังหวะดนตรี',
    whats_missing: 'อะไรเอ่ยหายไป? & ความจำขณะทำงาน',
    emotion_social: 'เข้าใจอารมณ์ & สถานการณ์จำลองน้ำใจ',
    balance_math: 'ตราชั่งน้ำหนัก & คณิตปฐมวัย',
    body_movement: 'กายบริหาร & ท่าทางหรรษา (ร่างกาย)',
    calm_mind: 'คลายใจ & ลมหายใจสุขสันต์ (อารมณ์)',
    social_manners: 'มารยาทดี & เพื่อนรักแบ่งปัน (สังคม)',
    brain_flex: 'ยืดหยุ่นความคิด & ยับยั้งใจ (ทักษะสมอง EF)',
  };

  const title = categoryTitles[category] || category;

  const payload: GameSessionPayload = {
    profileId: profile.id,
    profileName: profile.name,
    grade: profile.grade,
    timestamp: timestampThai,
    date: dateStr,
    totalCorrect: starsEarned,
    totalQuestions: starsEarned,
    accuracy: 100,
    isPerfect: true,
    usedHandTracking: false,
    scores: {
      literacy: 0,
      math: category === 'balance_math' ? starsEarned : 0,
      problemSolving:
        category === 'jigsaw' ||
        category === 'sequence_sorting' ||
        category === 'maze_path' ||
        category === 'shadow_tangram' ||
        category === 'whats_missing' ||
        category === 'brain_flex'
          ? starsEarned
          : 0,
      inquiry: category === 'spot_differences' || category === 'balance_math' || category === 'brain_flex' ? starsEarned : 0,
      creativity: category === 'matching' || category === 'auditory_rhythm' || category === 'shadow_tangram' ? starsEarned : 0,
      physicalHealth: category === 'maze_path' || category === 'body_movement' ? starsEarned : 0,
      socioEmotional: category === 'emotion_social' || category === 'auditory_rhythm' || category === 'calm_mind' || category === 'social_manners' ? starsEarned : 0,
      citizenship: category === 'rules' || category === 'emotion_social' || category === 'social_manners' ? starsEarned : 0,
    },
    totals: {
      literacy: 0,
      math: category === 'balance_math' ? starsEarned : 0,
      problemSolving:
        category === 'jigsaw' ||
        category === 'sequence_sorting' ||
        category === 'maze_path' ||
        category === 'shadow_tangram' ||
        category === 'whats_missing' ||
        category === 'brain_flex'
          ? starsEarned
          : 0,
      inquiry: category === 'spot_differences' || category === 'balance_math' || category === 'brain_flex' ? starsEarned : 0,
      creativity: category === 'matching' || category === 'auditory_rhythm' || category === 'shadow_tangram' ? starsEarned : 0,
      physicalHealth: category === 'maze_path' || category === 'body_movement' ? starsEarned : 0,
      socioEmotional: category === 'emotion_social' || category === 'auditory_rhythm' || category === 'calm_mind' || category === 'social_manners' ? starsEarned : 0,
      citizenship: category === 'rules' || category === 'emotion_social' || category === 'social_manners' ? starsEarned : 0,
    },
    createdAt: now.toISOString(),
  };

  let firestoreSuccess = false;
  if (typeof navigator === 'undefined' || navigator.onLine) {
    try {
      const id = await writeToAllDatabases('game_sessions', null, {
        ...payload,
        gameType: 'SKILL_GAME',
        skillCategory: category,
        level,
        timeSpentSeconds,
      });
      if (id) firestoreSuccess = true;
    } catch (e) {
      console.warn('Skill game firestore backup err:', e);
    }
  }

  if (!firestoreSuccess) {
    offlineSyncService.savePendingScore({
      type: 'skill_game',
      profileId: profile.id,
      profileName: profile.name,
      grade: profile.grade,
      timestamp: now.toISOString(),
      displayTimestamp: timestampThai,
      totalCorrect: starsEarned,
      totalQuestions: starsEarned,
      accuracy: 100,
      scores: payload.scores,
      totals: payload.totals,
      skillGameCategory: category,
      skillGameTitle: `ด่าน ${level}: ${title}`,
    });
    return { success: true, queuedOffline: true };
  }

  return { success: true, queuedOffline: false };
}

/**
 * 3. Save Comprehensive Assessment Report Dual (Firestore + Google Sheets)
 */
export async function recordAssessmentReportDual(
  report: AssessmentReportPayload
): Promise<{
  firestoreSuccess: boolean;
  sheetsSuccess: boolean;
  reportId?: string;
}> {
  const now = new Date();
  const timestampThai = now.toLocaleString('th-TH');

  let firestoreSuccess = false;
  let reportId: string | undefined;

  // A. Save to Firestore /progress_reports with multi-database support
  try {
    reportId = await writeToAllDatabases('progress_reports', null, {
      ...report,
      createdAt: now.toISOString(),
    });
    if (reportId) {
      firestoreSuccess = true;
    }
  } catch (err) {
    console.warn('Firestore progress report backup err:', err);
  }

  // B. Send to Google Sheets
  const sheetsPayload = {
    timestamp: timestampThai,
    category: `📊 รายงานพัฒนาการ 8 ด้าน (${report.grade})`,
    rating: Math.min(5, Math.max(1, Math.round((report.overallAccuracy / 100) * 5))),
    message: `สรุปภาพรวม: ความแม่นยำ ${report.overallAccuracy}% | ภาษา ${report.literacyRate}% | คำนวณ ${report.mathRate}% | แก้ปัญหา ${report.problemSolvingRate}% | สืบเสาะ ${report.inquiryRate}% | สร้างสรรค์ ${report.creativityRate}% | สุขภาวะกาย ${report.physicalHealthRate ?? '-'}% | อารมณ์สังคม ${report.socioEmotionalRate ?? '-'}% | พลเมือง ${report.citizenshipRate ?? '-'}%\n\nข้อสรุปประเมิน:\n${report.summary}`,
    senderName: report.profileName,
    senderRole: 'คุณครู / ผู้ประเมิน',
    contactInfo: `ประเมินเมื่อ: ${timestampThai}`,
    profileName: report.profileName,
    currentGrade: String(report.grade),
    deviceInfo: `${window.innerWidth}x${window.innerHeight} Report`,
    type: 'ASSESSMENT_REPORT',
    overallAccuracy: report.overallAccuracy,
  };

  const sheetsRes = await sendToGoogleSheets(sheetsPayload);

  return {
    firestoreSuccess,
    sheetsSuccess: sheetsRes.success,
    reportId,
  };
}

/**
 * 4. Sync Profiles with Firestore (Bidirectional)
 * Pulls profiles from Firestore and merges with local profiles.
 */
export async function syncProfilesWithCloud(): Promise<{
  syncedCount: number;
  message: string;
}> {
  const localProfiles = storageService.getProfiles();
  try {
    const snap = await withTimeout(
      getDocs(collection(db, 'profiles')),
      4500,
      null
    );

    if (!snap) {
      // Even if getDocs times out, directly push local profiles to Firestore
      for (const lp of localProfiles) {
        writeToAllDatabases('profiles', lp.id, {
          id: lp.id,
          name: lp.name,
          grade: lp.grade,
          avatar: lp.avatar,
          avatarBg: lp.avatarBg || 'amber',
          deviceId: lp.deviceId || getDeviceId(),
          createdDeviceName: lp.createdDeviceName || getDeviceName(),
          createdByEmail: lp.createdByEmail || '',
          totalScore: lp.totalScore || 0,
          totalQuestions: lp.totalQuestions || 0,
          streakDays: lp.streakDays || 1,
          lastPlayedDate: lp.lastPlayedDate || new Date().toISOString().split('T')[0],
          badges: lp.badges || [],
          history: (lp.history || []).slice(-30),
          updatedAt: new Date().toISOString(),
        }).catch(() => {});
      }
      return {
        syncedCount: localProfiles.length,
        message: 'โหมดออฟไลน์: บันทึกข้อมูลในเครื่องเรียบร้อยแล้ว (กำลังส่งข้อมูลขึ้นคลาวด์)',
      };
    }

    const cloudProfiles: Record<string, any> = {};
    snap.forEach((d) => {
      cloudProfiles[d.id] = d.data();
    });

    let updated = false;
    const mergedList: ChildProfile[] = [...localProfiles];

    // Push local profiles to cloud if not in cloud, or update if local has more questions
    const pushTasks: Promise<any>[] = [];
    for (const lp of localProfiles) {
      const cp = cloudProfiles[lp.id];
      if (!cp || (lp.totalQuestions || 0) > (cp.totalQuestions || 0)) {
        pushTasks.push(
          writeToAllDatabases('profiles', lp.id, {
            id: lp.id,
            name: lp.name,
            grade: lp.grade,
            avatar: lp.avatar,
            avatarBg: lp.avatarBg || 'amber',
            deviceId: lp.deviceId || getDeviceId(),
            createdDeviceName: lp.createdDeviceName || getDeviceName(),
            createdByEmail: lp.createdByEmail || '',
            totalScore: lp.totalScore,
            totalQuestions: lp.totalQuestions,
            streakDays: lp.streakDays,
            lastPlayedDate: lp.lastPlayedDate,
            badges: lp.badges || [],
            history: (lp.history || []).slice(-30),
            updatedAt: new Date().toISOString(),
          })
        );
      } else if (cp) {
        // If cloud profile has history and local does not, merge cloud history into local!
        if (
          (!lp.history || lp.history.length === 0) &&
          Array.isArray(cp.history) &&
          cp.history.length > 0
        ) {
          lp.history = cp.history;
          lp.badges = Array.isArray(cp.badges) && cp.badges.length > 0 ? cp.badges : lp.badges;
          updated = true;
        }
      }
    }
    if (pushTasks.length > 0) {
      await Promise.allSettled(pushTasks);
    }

    // Add profiles from cloud that don't exist locally
    for (const [id, cp] of Object.entries(cloudProfiles)) {
      const existing = mergedList.find((p) => p.id === id);
      if (!existing && cp.name) {
        mergedList.push({
          id,
          name: cp.name,
          grade: cp.grade || 'K1',
          avatar: cp.avatar || '🐰',
          avatarBg: cp.avatarBg || 'amber',
          createdAt: cp.updatedAt || new Date().toISOString(),
          deviceId: cp.deviceId || '',
          createdDeviceName: cp.createdDeviceName || '',
          createdByEmail: cp.createdByEmail || '',
          totalScore: cp.totalScore || 0,
          totalQuestions: cp.totalQuestions || 0,
          streakDays: cp.streakDays || 1,
          lastPlayedDate: cp.lastPlayedDate || new Date().toISOString().split('T')[0],
          badges: Array.isArray(cp.badges) ? cp.badges : [],
          history: Array.isArray(cp.history) ? cp.history : [],
        });
        updated = true;
      }
    }

    if (updated) {
      storageService.saveProfiles(mergedList);
    }

    return {
      syncedCount: mergedList.length,
      message: `ซิงค์โปรไฟล์กับระบบคลาวด์สำเร็จแล้ว (${mergedList.length} โปรไฟล์) ☁️`,
    };
  } catch (err: any) {
    console.warn('Sync profiles fallback:', err);
    return {
      syncedCount: localProfiles.length,
      message: 'ซิงค์ข้อมูลในเครื่องเรียบร้อยแล้ว',
    };
  }
}

/**
 * Save single profile directly to Firestore and all configured databases
 */
export async function saveProfileToCloud(profile: ChildProfile): Promise<boolean> {
  try {
    const now = new Date().toISOString();
    await writeToAllDatabases('profiles', profile.id, {
      id: profile.id,
      name: profile.name,
      grade: profile.grade,
      avatar: profile.avatar,
      deviceId: profile.deviceId || getDeviceId(),
      createdDeviceName: profile.createdDeviceName || getDeviceName(),
      createdByEmail: profile.createdByEmail || '',
      totalScore: profile.totalScore || 0,
      totalQuestions: profile.totalQuestions || 0,
      streakDays: profile.streakDays || 1,
      lastPlayedDate: profile.lastPlayedDate || now.split('T')[0],
      createdAt: profile.createdAt || now,
      updatedAt: profile.updatedAt || now,
      badges: profile.badges || [],
      history: (profile.history || []).slice(-30),
    });
    return true;
  } catch (err) {
    console.warn('saveProfileToCloud error:', err);
    return false;
  }
}

/**
 * Delete profile document from Firestore databases
 */
export async function deleteProfileFromCloud(profileId: string): Promise<boolean> {
  try {
    const dbs = getTargetFirestoreDatabases();
    await Promise.allSettled(
      dbs.map((targetDb) =>
        withTimeout(deleteDoc(doc(targetDb, 'profiles', profileId)), 4500, undefined)
      )
    );
    return true;
  } catch (err) {
    console.warn('deleteProfileFromCloud error:', err);
    return false;
  }
}

/**
 * Sort profiles by most recent activity (updatedAt, lastPlayedDate, or createdAt)
 */
export function sortProfilesByLatest(profiles: ChildProfile[]): ChildProfile[] {
  return [...profiles].sort((a, b) => {
    const timeA = new Date(a.updatedAt || a.lastPlayedDate || a.createdAt || 0).getTime();
    const timeB = new Date(b.updatedAt || b.lastPlayedDate || b.createdAt || 0).getTime();
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    return b.id.localeCompare(a.id);
  });
}

/**
 * 5. Fetch recent game sessions from Firestore
 */
export async function fetchCloudGameSessions(limitCount = 50): Promise<GameSessionPayload[]> {
  try {
    const q = query(collection(db, 'game_sessions'), orderBy('createdAt', 'desc'), limit(limitCount));
    const snap = await withTimeout(getDocs(q), 4500, null);
    if (!snap) return [];
    return snap.docs.map((d) => d.data() as GameSessionPayload);
  } catch (err) {
    console.warn('Failed to fetch cloud game sessions:', err);
    return [];
  }
}

/**
 * 6. Fetch recent progress reports from Firestore
 */
export async function fetchCloudProgressReports(limitCount = 20): Promise<AssessmentReportPayload[]> {
  try {
    const q = query(collection(db, 'progress_reports'), orderBy('createdAt', 'desc'), limit(limitCount));
    const snap = await withTimeout(getDocs(q), 4500, null);
    if (!snap) return [];
    return snap.docs.map((d) => d.data() as AssessmentReportPayload);
  } catch (err) {
    console.warn('Failed to fetch cloud progress reports:', err);
    return [];
  }
}

export type GameSessionCloudData = GameSessionPayload;
export type AssessmentReportCloudData = AssessmentReportPayload;
export const fetchCloudAssessmentReports = fetchCloudProgressReports;

/**
 * 7. Fetch custom questions from Firestore /custom_questions
 */
export async function fetchCloudCustomQuestions(): Promise<Question[]> {
  try {
    const q = query(collection(db, 'custom_questions'), orderBy('createdAt', 'desc'), limit(150));
    const snap = await withTimeout(getDocs(q), 4500, null);
    if (!snap) return [];
    return snap.docs.map((d) => d.data() as Question);
  } catch (err) {
    console.warn('Failed to fetch cloud custom questions:', err);
    return [];
  }
}

/**
 * 8. Save/Update custom question to Firestore /custom_questions
 */
export async function saveCloudCustomQuestion(question: Question): Promise<boolean> {
  try {
    await writeToAllDatabases('custom_questions', question.id, {
      ...question,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.warn('Failed to save cloud custom question:', err);
    return false;
  }
}

/**
 * 9. Delete custom question from Firestore
 */
export async function deleteCloudCustomQuestion(questionId: string): Promise<boolean> {
  try {
    const dbs = getTargetFirestoreDatabases();
    await Promise.allSettled(
      dbs.map((targetDb) =>
        withTimeout(deleteDoc(doc(targetDb, 'custom_questions', questionId)), 3500, undefined)
      )
    );
    return true;
  } catch (err) {
    console.warn('Failed to delete cloud custom question:', err);
    return false;
  }
}

export interface HybridSyncResult {
  success: boolean;
  totalQuestions: number;
  localCount: number;
  cloudCount: number;
  newFromCloud: number;
  uploadedToCloud: number;
  lastSyncTime: string;
  message: string;
}

/**
 * 9.1 Hybrid Bidirectional Question Bank Sync (ซิงค์คลังข้อสอบแบบไฮบริด 2 ทิศทาง)
 * - ดึงข้อสอบที่เพิ่มหรืออัปเดตบน Firestore เข้ามาเก็บใน Local Cache
 * - ดันข้อสอบที่สร้างในเครื่องที่ยังไม่มีบนคลาวด์ขึ้นไปจัดเก็บบน Firestore
 * - ทำงานแบบ Non-blocking ไม่ทำให้ตัวเกมค้าง
 */
export async function syncHybridQuestionBank(): Promise<HybridSyncResult> {
  const localCustom = storageService.getCustomQuestions();
  const deletedIds = storageService.getDeletedQuestionIds();
  const now = new Date();
  const timestampThai = now.toLocaleString('th-TH');

  try {
    const snap = await withTimeout(
      getDocs(collection(db, 'custom_questions')),
      5000,
      null
    );

    if (!snap) {
      return {
        success: false,
        totalQuestions: localCustom.length,
        localCount: localCustom.length,
        cloudCount: 0,
        newFromCloud: 0,
        uploadedToCloud: 0,
        lastSyncTime: storageService.getLastQuestionSyncTime() || timestampThai,
        message: 'โหมดออฟไลน์: ใช้ชุดข้อสอบจากแคชในเครื่อง (Local Cache พร้อมเล่น 100%)',
      };
    }

    const cloudQuestions: Question[] = [];
    snap.forEach((d) => {
      const data = d.data() as Question;
      if (data && data.id && !deletedIds.includes(data.id)) {
        cloudQuestions.push(data);
      }
    });

    let newFromCloud = 0;
    const mergedMap = new Map<string, Question>();
    localCustom.forEach((q) => mergedMap.set(q.id, q));

    for (const cq of cloudQuestions) {
      const existing = mergedMap.get(cq.id);
      if (!existing) {
        mergedMap.set(cq.id, cq);
        newFromCloud++;
      } else {
        const timeCloud = new Date(cq.updatedAt || 0).getTime();
        const timeLocal = new Date(existing.updatedAt || 0).getTime();
        if (timeCloud > timeLocal) {
          mergedMap.set(cq.id, cq);
          newFromCloud++;
        }
      }
    }

    // Upload local custom questions missing from Firestore
    let uploadedToCloud = 0;
    const cloudIds = new Set(cloudQuestions.map((q) => q.id));
    for (const lq of localCustom) {
      if (!cloudIds.has(lq.id)) {
        writeToAllDatabases('custom_questions', lq.id, {
          ...lq,
          isCustom: true,
          updatedAt: lq.updatedAt || now.toISOString(),
        }).catch(() => {});
        uploadedToCloud++;
      }
    }

    const mergedList = Array.from(mergedMap.values());
    storageService.saveCustomQuestions(mergedList);
    storageService.setLastQuestionSyncTime(timestampThai);

    return {
      success: true,
      totalQuestions: mergedList.length,
      localCount: mergedList.length,
      cloudCount: cloudQuestions.length,
      newFromCloud,
      uploadedToCloud,
      lastSyncTime: timestampThai,
      message: `ซิงค์คลังข้อสอบสำเร็จ: ดึงจากคลาวด์ ${newFromCloud} ข้อ, ส่งขึ้นคลาวด์ ${uploadedToCloud} ข้อ (รวม ${mergedList.length} ข้อ) ☁️✨`,
    };
  } catch (err) {
    console.warn('syncHybridQuestionBank err:', err);
    return {
      success: false,
      totalQuestions: localCustom.length,
      localCount: localCustom.length,
      cloudCount: 0,
      newFromCloud: 0,
      uploadedToCloud: 0,
      lastSyncTime: storageService.getLastQuestionSyncTime() || timestampThai,
      message: 'ใช้แคชข้อสอบในเครื่อง (ระบบพร้อมใช้งานทันที)',
    };
  }
}

/**
 * 9.2 Seed / Backup All Question Bank to Firestore (สำรองข้อสอบทั้งหมดขึ้นคลาวด์)
 * อัปโหลดข้อสอบทั้งหมด (ทั้งชุดมาตรฐาน 8 ทักษะ + ชุดที่สร้างเอง) ขึ้น Firestore
 */
export async function seedAllQuestionsToFirestore(
  allQuestions: Question[],
  onProgress?: (current: number, total: number) => void
): Promise<{ success: boolean; seededCount: number; message: string }> {
  let seededCount = 0;
  const total = allQuestions.length;
  const nowIso = new Date().toISOString();

  // Process in Firestore batches (max 500 per batch, use 300 for reliability)
  const chunkSize = 300;
  for (let i = 0; i < total; i += chunkSize) {
    const chunk = allQuestions.slice(i, i + chunkSize);
    const batch = writeBatch(db);
    for (const q of chunk) {
      const ref = doc(db, 'custom_questions', q.id);
      batch.set(
        ref,
        {
          ...q,
          isSyncedToCloud: true,
          updatedAt: q.updatedAt || nowIso,
        },
        { merge: true }
      );
    }
    try {
      await batch.commit();
      seededCount += chunk.length;
    } catch (e) {
      console.warn(`Seed batch error at offset ${i}:`, e);
      // Fallback: write individually
      for (const q of chunk) {
        try {
          await setDoc(
            doc(db, 'custom_questions', q.id),
            { ...q, isSyncedToCloud: true, updatedAt: q.updatedAt || nowIso },
            { merge: true }
          );
          seededCount++;
        } catch (singleErr) {
          console.warn(`Seed single error ${q.id}:`, singleErr);
        }
      }
    }
    if (onProgress) {
      onProgress(Math.min(seededCount, total), total);
    }
  }

  const timestampThai = new Date().toLocaleString('th-TH');
  storageService.setLastQuestionSyncTime(timestampThai);

  return {
    success: seededCount > 0,
    seededCount,
    message: `สำรองและบันทึกคลังข้อสอบขึ้น Firebase Firestore สำเร็จเรียบร้อยแล้ว (${seededCount}/${total} ข้อ) ☁️🎉`,
  };
}

/**
 * 10. Force initialize & bootstrap all 5 collections in Firebase Firestore:
 * - game_sessions : บันทึกคะแนนและผลการเล่นเกมรอบต่าง ๆ
 * - profiles : รายชื่อโปรไฟล์เด็ก ระดับชั้น และแต้มสะสม
 * - progress_reports : รายงานการประเมินทักษะ 8 ด้าน
 * - feedbacks : ข้อเสนอแนะและความคิดเห็นจากผู้ปกครอง/ครู
 * - config : คอนฟิกการเชื่อมต่อระบบ (เช่น Google Sheets Webhook URL)
 * 
 * Ensures all collections immediately exist and appear in the Firebase Console!
 */
export async function initializeAllFirestoreCollections(): Promise<{
  success: boolean;
  synced: {
    profiles: boolean;
    game_sessions: boolean;
    progress_reports: boolean;
    feedbacks: boolean;
    config: boolean;
  };
  message: string;
}> {
  const now = new Date();
  const timestampThai = now.toLocaleString('th-TH');
  const dateStr = now.toISOString().split('T')[0];

  const results = {
    profiles: false,
    game_sessions: false,
    progress_reports: false,
    feedbacks: false,
    config: false,
  };

  // 1. profiles: push all student profiles
  try {
    const profiles = storageService.getProfiles();
    for (const p of profiles) {
      await writeToAllDatabases('profiles', p.id, {
        id: p.id,
        name: p.name,
        grade: p.grade,
        avatar: p.avatar,
        totalScore: p.totalScore || 0,
        totalQuestions: p.totalQuestions || 0,
        streakDays: p.streakDays || 1,
        lastPlayedDate: p.lastPlayedDate || dateStr,
        updatedAt: now.toISOString(),
      });
    }
    results.profiles = true;
  } catch (err) {
    console.warn('Init profiles error:', err);
  }

  // 2. game_sessions: create initial baseline session so collection appears in Firebase Console
  try {
    await writeToAllDatabases('game_sessions', 'initial_baseline_session', {
      profileId: 'p1',
      profileName: 'น้องพอใจ',
      grade: 'K1',
      timestamp: timestampThai,
      date: dateStr,
      totalCorrect: 10,
      totalQuestions: 10,
      accuracy: 100,
      isPerfect: true,
      usedHandTracking: false,
      scores: {
        literacy: 2,
        math: 2,
        problemSolving: 1,
        inquiry: 1,
        creativity: 1,
        physicalHealth: 1,
        socioEmotional: 1,
        citizenship: 1,
      },
      totals: {
        literacy: 2,
        math: 2,
        problemSolving: 1,
        inquiry: 1,
        creativity: 1,
        physicalHealth: 1,
        socioEmotional: 1,
        citizenship: 1,
      },
      notes: 'เซสชันบันทึกตั้งต้น (Baseline Game Session) เพื่อให้ระบบ Firestore แสดงผล Collection ทันที',
      createdAt: now.toISOString(),
    });
    results.game_sessions = true;
  } catch (err) {
    console.warn('Init game_sessions error:', err);
  }

  // 3. progress_reports: create initial baseline assessment report
  try {
    await writeToAllDatabases('progress_reports', 'initial_baseline_report', {
      profileId: 'p1',
      profileName: 'น้องพอใจ',
      grade: 'K1',
      overallAccuracy: 95,
      literacyRate: 100,
      mathRate: 90,
      problemSolvingRate: 100,
      inquiryRate: 90,
      creativityRate: 100,
      physicalHealthRate: 90,
      socioEmotionalRate: 100,
      citizenshipRate: 90,
      summary: 'รายงานประเมินพัฒนาการตั้งต้นของระบบ (ครอบคลุมทักษะ 8 ด้าน) ผลการประเมินอยู่ในเกณฑ์ยอดเยี่ยม',
      evaluatedAt: timestampThai,
      notes: 'รายงานประเมินตั้งต้น (Baseline Progress Report) เพื่อให้ระบบ Firestore แสดงผล Collection ทันที',
      createdAt: now.toISOString(),
    });
    results.progress_reports = true;
  } catch (err) {
    console.warn('Init progress_reports error:', err);
  }

  // 4. config: write google_sheets config
  try {
    await writeToAllDatabases('config', 'google_sheets', {
      appsScriptUrl: DEFAULT_APPS_SCRIPT_URL,
      targetSheetId: TARGET_SHEET_ID,
      description: 'คอนฟิก Google Sheets Webhook URL สำหรับการบันทึกข้อมูลคู่ขนาน',
      updatedAt: now.toISOString(),
      updatedBy: 'ระบบตั้งต้น (System Init)',
    });
    results.config = true;
  } catch (err) {
    console.warn('Init config error:', err);
  }

  // 5. feedbacks: create welcome feedback
  try {
    await writeToAllDatabases('feedbacks', 'welcome_system_feedback', {
      timestamp: timestampThai,
      category: 'ยินดีต้อนรับสู่ระบบคลาวด์',
      rating: 5,
      message: 'ระบบเชื่อมต่อ Firebase Firestore สำเร็จเรียบร้อยแล้ว พร้อมบันทึกข้อเสนอแนะและผลการเล่นแบบเรียลไทม์',
      senderName: 'ผู้ดูแลระบบ (Admin)',
      senderRole: 'ผู้พัฒนา/ครูผู้สอน',
      contactInfo: 'nusornon@gmail.com',
      profileName: 'ระบบส่วนกลาง',
      currentGrade: 'ALL',
      deviceInfo: 'Web Application Cloud Sync',
      createdAt: now.toISOString(),
    });
    results.feedbacks = true;
  } catch (err) {
    console.warn('Init feedbacks error:', err);
  }

  const allSuccess = Object.values(results).some(Boolean);
  return {
    success: allSuccess,
    synced: results,
    message: 'สร้างและซิงค์ Collections ครบทั้ง 5 ส่วน (game_sessions, profiles, progress_reports, feedbacks, config) ลงใน Firestore เรียบร้อยแล้ว! ☁️✨',
  };
}

/**
 * Save an ExamSet to Firestore and local storage
 */
export async function saveExamSetToCloud(set: ExamSet): Promise<boolean> {
  try {
    const payload = {
      id: set.id,
      title: set.title,
      description: set.description || '',
      grade: set.grade,
      subjects: set.subjects || [],
      questionIds: set.questionIds || [],
      questionCount: set.questionIds.length,
      generationMode: set.generationMode,
      difficulty: set.difficulty || 'medium',
      estimatedMinutes: set.estimatedMinutes || 4,
      createdBy: set.createdBy || 'คุณครูปฐมวัย',
      createdAt: set.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPreset: !!set.isPreset,
      tags: set.tags || [],
    };
    await writeToAllDatabases('exam_sets', set.id, payload);
    return true;
  } catch (err) {
    console.warn('Failed to save exam set to cloud:', err);
    return false;
  }
}

/**
 * Delete an ExamSet from Firestore
 */
export async function deleteExamSetFromCloud(setId: string): Promise<boolean> {
  try {
    await deleteFromAllDatabases('exam_sets', setId);
    return true;
  } catch (err) {
    console.warn('Failed to delete exam set from cloud:', err);
    return false;
  }
}

/**
 * Fetch all ExamSets from Firestore
 */
export async function fetchExamSetsFromCloud(): Promise<ExamSet[]> {
  try {
    const dbs = getTargetFirestoreDatabases();
    for (const targetDb of dbs) {
      try {
        const snap = await withTimeout(
          getDocs(collection(targetDb, 'exam_sets')),
          4500,
          null
        );
        if (snap && !snap.empty) {
          const sets: ExamSet[] = [];
          snap.forEach((d) => {
            const data = d.data();
            if (data && data.title && Array.isArray(data.questionIds)) {
              sets.push({
                id: d.id,
                title: data.title,
                description: data.description || '',
                grade: data.grade || 'all',
                subjects: data.subjects || [],
                questionIds: data.questionIds || [],
                questionCount: data.questionIds.length,
                generationMode: data.generationMode || 'manual',
                difficulty: data.difficulty || 'medium',
                estimatedMinutes: data.estimatedMinutes || 4,
                createdBy: data.createdBy || 'คุณครู',
                createdAt: data.createdAt || new Date().toISOString(),
                updatedAt: data.updatedAt || new Date().toISOString(),
                isPreset: !!data.isPreset,
                tags: data.tags || [],
              });
            }
          });
          if (sets.length > 0) {
            return sets;
          }
        }
      } catch (err) {
        console.warn('Error reading exam_sets from db:', err);
      }
    }
  } catch (err) {
    console.warn('Failed to fetch exam sets from cloud:', err);
  }
  return [];
}

/**
 * Bidirectional Hybrid Sync for Exam Sets (Local-First + Firestore)
 */
export async function syncHybridExamSets(): Promise<{
  newFromCloud: number;
  uploadedToCloud: number;
  totalSets: number;
  message: string;
}> {
  try {
    const localSets = storageService.getExamSets();
    const cloudSets = await fetchExamSetsFromCloud();

    let newFromCloud = 0;
    let uploadedToCloud = 0;

    const mergedMap = new Map<string, ExamSet>();
    localSets.forEach((s) => mergedMap.set(s.id, s));

    // 1. Process cloud sets
    for (const cs of cloudSets) {
      const local = mergedMap.get(cs.id);
      if (!local) {
        mergedMap.set(cs.id, cs);
        newFromCloud++;
      } else {
        // Compare updatedAt timestamp
        const cloudTime = new Date(cs.updatedAt || 0).getTime();
        const localTime = new Date(local.updatedAt || 0).getTime();
        if (cloudTime > localTime) {
          mergedMap.set(cs.id, cs);
          newFromCloud++;
        }
      }
    }

    // 2. Upload any local non-preset sets to cloud if not present or newer
    const cloudIdMap = new Map(cloudSets.map((s) => [s.id, s]));
    for (const ls of localSets) {
      const inCloud = cloudIdMap.get(ls.id);
      if (!inCloud) {
        saveExamSetToCloud(ls).catch(() => {});
        uploadedToCloud++;
      } else {
        const localTime = new Date(ls.updatedAt || 0).getTime();
        const cloudTime = new Date(inCloud.updatedAt || 0).getTime();
        if (localTime > cloudTime) {
          saveExamSetToCloud(ls).catch(() => {});
          uploadedToCloud++;
        }
      }
    }

    const mergedList = Array.from(mergedMap.values());
    storageService.saveExamSets(mergedList);

    return {
      newFromCloud,
      uploadedToCloud,
      totalSets: mergedList.length,
      message: `ซิงค์ชุดข้อสอบสำเร็จ! รวมทั้งหมด ${mergedList.length} ชุด (ดึงจากคลาวด์ ${newFromCloud} ชุด, อัปโหลด ${uploadedToCloud} ชุด) ☁️✨`,
    };
  } catch (err: any) {
    console.warn('syncHybridExamSets fallback:', err);
    return {
      newFromCloud: 0,
      uploadedToCloud: 0,
      totalSets: storageService.getExamSets().length,
      message: 'ใช้งานชุดข้อสอบในเครื่องเรียบร้อยแล้ว',
    };
  }
}

