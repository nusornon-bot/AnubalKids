/**
 * Offline Score Storage and Background Cloud Synchronization Service
 * 
 * Strategy:
 * 1. Ensures basic game functionality and score recording persist locally in localStorage
 *    even when offline (No network / weak signal in classrooms).
 * 2. Queues pending score sessions into a local queue (`kinder_edugame_pending_scores`).
 * 3. Automatically synchronizes pending records to Firebase Firestore and Google Sheets
 *    when network connectivity returns or when the user initiates manual sync.
 * 4. Dispatches reactive events so UI components can display real-time 'Pending Sync' indicators.
 */

import { Grade } from '../types';
import { storageService } from './storageService';
import {
  writeToAllDatabases,
  withTimeout,
  GameSessionPayload,
} from './cloudSyncService';
import { getDeviceId, getDeviceName } from './deviceService';

export interface PendingScoreItem {
  id: string;
  type: 'round_session' | 'skill_game';
  profileId: string;
  profileName: string;
  grade: Grade;
  timestamp: string; // ISO string
  displayTimestamp: string; // Readable Thai format
  totalCorrect: number;
  totalQuestions: number;
  accuracy: number;
  usedHandTracking?: boolean;
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
  skillGameCategory?: string;
  skillGameTitle?: string;
  createdAt: string;
  retryCount?: number;
  lastError?: string;
}

const PENDING_SCORES_KEY = 'kinder_edugame_pending_scores';
const PENDING_CHANGE_EVENT = 'kinder_edugame_pending_scores_changed';

class OfflineSyncService {
  private isSyncing = false;
  private autoSyncTimer: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.scheduleAutoSync(1500);
      });
    }
  }

  /**
   * Retrieve all locally queued pending scores
   */
  getPendingScores(): PendingScoreItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(PENDING_SCORES_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Failed to parse pending scores:', e);
      return [];
    }
  }

  /**
   * Save a score session to the pending offline queue
   */
  savePendingScore(item: Omit<PendingScoreItem, 'id' | 'createdAt'>): PendingScoreItem {
    const list = this.getPendingScores();
    const newItem: PendingScoreItem = {
      ...item,
      id: `pending-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      retryCount: 0,
    };

    list.unshift(newItem);
    this.persistList(list);
    this.notifySubscribers();

    // If currently online, attempt auto sync
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      this.scheduleAutoSync(2000);
    }

    return newItem;
  }

  /**
   * Remove an item from the pending queue by id
   */
  removePendingScore(id: string): void {
    const list = this.getPendingScores();
    const updated = list.filter((item) => item.id !== id);
    this.persistList(updated);
    this.notifySubscribers();
  }

  /**
   * Clear all pending scores
   */
  clearAllPending(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(PENDING_SCORES_KEY);
    this.notifySubscribers();
  }

  /**
   * Count how many scores are waiting to sync
   */
  getPendingCount(): number {
    return this.getPendingScores().length;
  }

  /**
   * Subscribe to changes in the pending scores list
   */
  subscribe(callback: (items: PendingScoreItem[]) => void): () => void {
    const handler = () => {
      callback(this.getPendingScores());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener(PENDING_CHANGE_EVENT, handler);
      window.addEventListener('storage', (e) => {
        if (e.key === PENDING_SCORES_KEY) {
          handler();
        }
      });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener(PENDING_CHANGE_EVENT, handler);
      }
    };
  }

  /**
   * Synchronize all pending items to Firebase Firestore and Google Sheets
   */
  async syncPendingScores(): Promise<{
    syncedCount: number;
    remainingCount: number;
    success: boolean;
    errors: string[];
  }> {
    if (this.isSyncing) {
      return {
        syncedCount: 0,
        remainingCount: this.getPendingCount(),
        success: false,
        errors: ['กำลังซิงก์ข้อมูลอยู่แล้ว กรุณารอสักครู่'],
      };
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return {
        syncedCount: 0,
        remainingCount: this.getPendingCount(),
        success: false,
        errors: ['อุปกรณ์ยังคงอยู่ในโหมดออฟไลน์ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'],
      };
    }

    this.isSyncing = true;
    const items = this.getPendingScores();
    if (items.length === 0) {
      this.isSyncing = false;
      return { syncedCount: 0, remainingCount: 0, success: true, errors: [] };
    }

    const errors: string[] = [];
    let syncedCount = 0;
    const successfullySyncedIds: string[] = [];

    try {
      for (const item of items) {
        try {
          const sessionPayload: GameSessionPayload = {
            profileId: item.profileId,
            profileName: item.profileName,
            grade: item.grade,
            timestamp: item.displayTimestamp,
            date: item.timestamp.split('T')[0],
            totalCorrect: item.totalCorrect,
            totalQuestions: item.totalQuestions,
            accuracy: item.accuracy,
            isPerfect: item.totalQuestions > 0 && item.totalCorrect === item.totalQuestions,
            usedHandTracking: Boolean(item.usedHandTracking),
            scores: item.scores,
            totals: item.totals,
            createdAt: item.createdAt,
          };

          // 1. Write session to Firestore multi-databases
          const sessionId = await writeToAllDatabases('game_sessions', null, sessionPayload);

          // 2. Also ensure cloud profile is updated
          const profiles = storageService.getProfiles();
          const profile = profiles.find((p) => p.id === item.profileId);
          if (profile) {
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
              updatedAt: new Date().toISOString(),
            });
          }

          if (sessionId) {
            syncedCount++;
            successfullySyncedIds.push(item.id);
          } else {
            item.retryCount = (item.retryCount || 0) + 1;
            item.lastError = 'ไม่สามารถบันทึกลง Firestore ได้';
          }
        } catch (itemErr: any) {
          console.warn(`Failed to sync pending item ${item.id}:`, itemErr);
          item.retryCount = (item.retryCount || 0) + 1;
          item.lastError = itemErr?.message || 'ข้อผิดพลาดเครือข่าย';
          errors.push(itemErr?.message || 'ข้อผิดพลาดในการเชื่อมต่อ');
        }
      }

      // Remove successfully synced items
      if (successfullySyncedIds.length > 0) {
        const remaining = items.filter((it) => !successfullySyncedIds.includes(it.id));
        this.persistList(remaining);
        this.notifySubscribers();
      }
    } finally {
      this.isSyncing = false;
    }

    const remainingCount = this.getPendingCount();
    return {
      syncedCount,
      remainingCount,
      success: remainingCount === 0,
      errors,
    };
  }

  private persistList(list: PendingScoreItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(PENDING_SCORES_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to persist pending scores to localStorage:', e);
    }
  }

  private notifySubscribers(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PENDING_CHANGE_EVENT));
    }
  }

  private scheduleAutoSync(delayMs: number): void {
    if (this.autoSyncTimer) {
      clearTimeout(this.autoSyncTimer);
    }
    this.autoSyncTimer = setTimeout(() => {
      this.syncPendingScores().catch((err) => {
        console.warn('Auto sync pending scores notice:', err);
      });
    }, delayMs);
  }
}

export const offlineSyncService = new OfflineSyncService();
