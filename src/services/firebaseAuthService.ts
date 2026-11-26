import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import { fbApp } from './firebaseDb';
import { REMOVED_FROM_SIGNIN_EMAILS } from './authPermissionService';

export const auth = getAuth(fbApp);

// Standard Google Auth Provider (non-sensitive scopes - does not trigger Google verification block)
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

let cachedAccessToken: string | null = null;
let isSigningIn = false;

/**
 * Initialize auth listener
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      const email = user.email?.toLowerCase().trim();
      if (email && REMOVED_FROM_SIGNIN_EMAILS.some((r) => r.toLowerCase().trim() === email)) {
        console.warn(`Sign-in rejected: ${email} is in REMOVED_FROM_SIGNIN_EMAILS`);
        await signOut(auth);
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
        return;
      }
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken || '');
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Trigger Google Sign-In with popup (Standard safe Google Auth)
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email?.toLowerCase().trim();
    if (email && REMOVED_FROM_SIGNIN_EMAILS.some((r) => r.toLowerCase().trim() === email)) {
      await signOut(auth);
      cachedAccessToken = null;
      throw new Error(`บัญชี ${result.user.email} ถูกนำออกจากระบบและไม่อนุญาตให้เข้าสู่ระบบ (People who can sign in to your app)`);
    }

    const credential = GoogleAuthProvider.credentialFromResult(result);
    cachedAccessToken = credential?.accessToken || '';
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: unknown) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Get current in-memory access token
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Logout
 */
export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};
