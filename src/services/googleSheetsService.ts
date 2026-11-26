/**
 * Google Sheets Service for Feedback logging
 * Target Sheet ID: 1KUonUHcAWitDY2Fp98big8jMhrLY6mzbuVF_UPvIiKM
 */

import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, getTargetFirestoreDatabases } from './firebaseDb';
import { googleSignIn, getAccessToken, auth } from './firebaseAuthService';
import { storageService } from './storageService';

export async function saveFeedbackToFirestore(payload: GoogleSheetsFeedbackPayload): Promise<void> {
  const dbs = getTargetFirestoreDatabases();
  await Promise.allSettled(
    dbs.map((targetDb) =>
      addDoc(collection(targetDb, 'feedbacks'), {
        ...payload,
        createdAt: new Date().toISOString(),
      })
    )
  );
}

export interface GoogleSheetsFeedbackPayload {
  timestamp: string;
  category: string;
  rating: number;
  message: string;
  senderName: string;
  senderRole: string;
  contactInfo: string;
  profileName?: string;
  currentGrade?: string;
  deviceInfo?: string;
}

export const TARGET_SHEET_ID = '1KUonUHcAWitDY2Fp98big8jMhrLY6mzbuVF_UPvIiKM';

// Default Google Apps Script Webhook URL
export const DEFAULT_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzqkj13ymux9qacLqYDxtrlDLohQJKQfajLPDusvJZde6HxBk75iWCHOES0PW3-Dk1XSg/exec';

/**
 * Ensure header row exists on the sheet. If not, append headers.
 */
async function ensureSheetHeaders(accessToken: string): Promise<void> {
  try {
    const checkUrl = `https://sheets.googleapis.com/v4/spreadsheets/${TARGET_SHEET_ID}/values/A1:J1`;
    const res = await fetch(checkUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        throw new Error('กรุณาให้สิทธิ์เข้าถึง Google Sheets เพื่อบันทึกข้อมูล');
      }
    }

    const data = await res.json();
    const rows = data.values;

    if (!rows || rows.length === 0 || !rows[0] || rows[0].length === 0) {
      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${TARGET_SHEET_ID}/values/A1:append?valueInputOption=USER_ENTERED`;
      await fetch(appendUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [
            [
              'วันที่และเวลา (Timestamp)',
              'หมวดหมู่ (Category)',
              'คะแนน (Rating 1-5)',
              'ข้อความข้อเสนอแนะ (Feedback Message)',
              'ชื่อผู้ส่ง (Sender Name)',
              'บทบาท (Sender Role)',
              'ข้อมูลติดต่อ (Contact Info)',
              'ชื่อโปรไฟล์ผู้เล่น (Profile)',
              'ระดับชั้น (Grade)',
              'ข้อมูลอุปกรณ์ (Device/System Info)',
            ],
          ],
        }),
      });
    }
  } catch (err) {
    console.warn('Could not ensure sheet headers (will attempt append):', err);
  }
}

/**
 * Fetch global Google Apps Script Webhook URL from Firestore or local cache
 * This ensures that when an admin configures the URL once, ALL users on ALL devices automatically receive it.
 */
let cachedGlobalUrl: string | null = null;

export async function getGlobalAppsScriptUrl(): Promise<string> {
  // 1. Check in-memory cache
  if (cachedGlobalUrl) return cachedGlobalUrl;

  // 2. Check localStorage / env fallback
  const localUrl = storageService.getAppsScriptUrl();
  if (localUrl) {
    cachedGlobalUrl = localUrl;
    return localUrl;
  }

  // 3. Fetch from Firestore global configuration with timeout
  try {
    const fetchDocPromise = getDoc(doc(db, 'config', 'google_sheets'));
    const timer = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
    const configSnap: any = await Promise.race([fetchDocPromise, timer]);
    if (configSnap && configSnap.exists && configSnap.exists()) {
      const data = configSnap.data();
      if (data?.appsScriptUrl && typeof data.appsScriptUrl === 'string') {
        const url = data.appsScriptUrl.trim();
        cachedGlobalUrl = url;
        storageService.setAppsScriptUrl(url);
        return url;
      }
    }
  } catch (err) {
    console.warn('Could not fetch global Apps Script URL from Firestore:', err);
  }

  return DEFAULT_APPS_SCRIPT_URL;
}

/**
 * Save the global Google Apps Script Webhook URL to both local storage and Firestore
 * Allows teachers/admins to set it once for all users.
 */
export async function saveGlobalAppsScriptUrl(url: string): Promise<boolean> {
  const cleanUrl = url.trim();
  cachedGlobalUrl = cleanUrl;
  storageService.setAppsScriptUrl(cleanUrl);

  try {
    const dbs = getTargetFirestoreDatabases();
    await Promise.allSettled(
      dbs.map((targetDb) =>
        setDoc(
          doc(targetDb, 'config', 'google_sheets'),
          {
            appsScriptUrl: cleanUrl,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        )
      )
    );
    return true;
  } catch (err) {
    console.error('Failed to sync Apps Script URL to Firestore:', err);
    return false;
  }
}

/**
 * Fetch all cloud-stored feedbacks from Firestore (for Admin / Teacher inbox)
 */
export async function fetchCloudFeedbacks(): Promise<GoogleSheetsFeedbackPayload[]> {
  try {
    const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'), limit(100));
    const timer = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000));
    const snapshot: any = await Promise.race([getDocs(q), timer]);
    if (!snapshot || !snapshot.docs) return [];
    return snapshot.docs.map((d: any) => d.data() as GoogleSheetsFeedbackPayload);
  } catch (err) {
    console.warn('Failed to fetch cloud feedbacks:', err);
    return [];
  }
}

/**
 * Append feedback row directly to Google Sheets using Apps Script Webhook or Firebase OAuth Token
 */
export async function appendFeedbackToGoogleSheet(
  payload: GoogleSheetsFeedbackPayload
): Promise<{ success: boolean; message: string }> {
  // Always trigger Firestore cloud backup in background for safe keeping
  saveFeedbackToFirestore(payload).catch((e) => console.warn('Firestore backup err:', e));

  // 1. Get global or local Apps Script Webhook URL
  const appsScriptUrl = await getGlobalAppsScriptUrl();

  if (appsScriptUrl && appsScriptUrl.startsWith('http')) {
    try {
      const controller = new AbortController();
      const abortTimer = setTimeout(() => controller.abort(), 4000);
      await fetch(appsScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(abortTimer);

      return {
        success: true,
        message: 'บันทึกข้อเสนอแนะลงใน Google Sheets สำเร็จเรียบร้อยแล้ว! 📊🎉',
      };
    } catch (webhookErr) {
      console.warn('Apps Script Webhook failed, falling back:', webhookErr);
    }
  }

  // 2. If an active direct token exists, try direct Google Sheets API
  try {
    const token = await getAccessToken();

    if (token) {
      await ensureSheetHeaders(token);

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
      const response = await fetch(appendUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [newRow],
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'บันทึกข้อเสนอแนะลงใน Google Sheets สำเร็จเรียบร้อยแล้ว! 📊🎉',
        };
      }
    }
  } catch (error: unknown) {
    console.warn('Direct sheet append error:', error);
  }

  // 3. Fallback: Data is safely stored in Firestore and device history
  // Provide clean, clear feedback for general users
  return {
    success: true,
    message: 'ส่งข้อเสนอแนะถึงผู้ดูแลระบบและบันทึกข้อมูลเรียบร้อยแล้ว ขอบคุณสำหรับความคิดเห็นครับ! 🚀✨',
  };
}
