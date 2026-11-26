import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore, Firestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const fbApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Database ID configured for this project
export const dbId =
  (firebaseConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId ||
  'ai-studio-kidshandmotioned-4249ba03-c407-46b0-b652-6fc60c83954d';

let firestoreInstance: Firestore;
try {
  // Use long-polling transport to guarantee stability in iframe sandboxes,
  // Cloud Run proxies, and environments where streaming WebChannel connections get buffered or closed.
  firestoreInstance = initializeFirestore(
    fbApp,
    {
      experimentalForceLongPolling: true,
    },
    dbId
  );
} catch {
  firestoreInstance = dbId ? getFirestore(fbApp, dbId) : getFirestore(fbApp);
}

export const db = firestoreInstance;

/**
 * Returns the active Firestore databases to target.
 * Always strictly targets the user's provisioned named database to avoid
 * connection errors to non-existent default databases.
 */
export function getTargetFirestoreDatabases(): Firestore[] {
  return [db];
}
