import { ChildProfile } from '../types';

const DEVICE_ID_KEY = 'kids_edugame_device_id';
const DEVICE_NAME_KEY = 'kids_edugame_device_name';

/**
 * ดึงหรือสร้างรหัสประจำอุปกรณ์ (Persistent Device ID)
 * เพื่อใช้ระบุเครื่องที่สร้างโปรไฟล์
 */
export function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id || id.trim().length === 0) {
      // สร้างรหัสประจำเครื่องเฉพาะตัว
      const randomPart = Math.random().toString(36).substring(2, 10);
      const timePart = Date.now().toString(36);
      id = `dev-${timePart}-${randomPart}`;
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return 'dev-fallback-local';
  }
}

/**
 * ดึงหรือตรวจจับชื่อของอุปกรณ์ปัจจุบัน
 */
export function getDeviceName(): string {
  try {
    const custom = localStorage.getItem(DEVICE_NAME_KEY);
    if (custom && custom.trim().length > 0) return custom.trim();

    const ua = navigator.userAgent || '';
    let detected = 'คอมพิวเตอร์ (Desktop)';
    if (/iPad|Macintosh/i.test(ua) && 'ontouchend' in document) {
      detected = 'ไอแพด (iPad)';
    } else if (/Tablet|iPad/i.test(ua)) {
      detected = 'แท็บเล็ต (Tablet)';
    } else if (/iPhone/i.test(ua)) {
      detected = 'ไอโฟน (iPhone)';
    } else if (/Android/i.test(ua)) {
      detected = /Mobile/i.test(ua) ? 'มือถือแอนดรอยด์ (Android Phone)' : 'แท็บเล็ตแอนดรอยด์ (Android Tablet)';
    } else if (/Windows/i.test(ua)) {
      detected = 'คอมพิวเตอร์ Windows (PC)';
    } else if (/Mac/i.test(ua)) {
      detected = 'คอมพิวเตอร์ Mac';
    } else if (/Linux/i.test(ua)) {
      detected = 'คอมพิวเตอร์ Linux';
    }
    return detected;
  } catch {
    return 'อุปกรณ์นี้ (This Device)';
  }
}

/**
 * บันทึกชื่ออุปกรณ์ที่ผู้ใช้กำหนดเอง (Custom Device Label)
 */
export function saveCustomDeviceName(name: string): void {
  try {
    if (name && name.trim()) {
      localStorage.setItem(DEVICE_NAME_KEY, name.trim());
    } else {
      localStorage.removeItem(DEVICE_NAME_KEY);
    }
  } catch (e) {
    console.warn('Cannot save device name to localStorage', e);
  }
}

/**
 * ตรวจสอบและวิเคราะห์ข้อมูลความเข้ากันได้ของอุปกรณ์ปัจจุบัน (Device Diagnostics)
 */
export function getDeviceDiagnostics(): import('../types').DeviceDiagnosticInfo {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const vendor = typeof navigator !== 'undefined' ? navigator.vendor || '' : '';

  // 1. ตรวจจับระบบปฏิบัติการ (OS)
  let osName = 'ระบบปฏิบัติการทั่วไป';
  if (/iPad|Macintosh/i.test(ua) && typeof document !== 'undefined' && 'ontouchend' in document) {
    osName = 'iPadOS (Apple iPad)';
  } else if (/iPhone/i.test(ua)) {
    osName = 'iOS (Apple iPhone)';
  } else if (/Android/i.test(ua)) {
    osName = 'Android OS';
  } else if (/CrOS/i.test(ua)) {
    osName = 'Chrome OS';
  } else if (/Mac/i.test(ua)) {
    osName = 'macOS (Apple Mac)';
  } else if (/Windows/i.test(ua)) {
    osName = 'Microsoft Windows';
  } else if (/Linux/i.test(ua)) {
    osName = 'Linux OS';
  }

  // 2. ตรวจจับเบราว์เซอร์
  let browserName = 'เว็บเบราว์เซอร์';
  if (/Edg/i.test(ua)) {
    browserName = 'Microsoft Edge';
  } else if (/Chrome/i.test(ua) && !/Edg/i.test(ua) && !/OPR/i.test(ua)) {
    browserName = 'Google Chrome';
  } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
    browserName = 'Apple Safari';
  } else if (/Firefox/i.test(ua)) {
    browserName = 'Mozilla Firefox';
  } else if (/OPR|Opera/i.test(ua)) {
    browserName = 'Opera Browser';
  } else if (/SamsungBrowser/i.test(ua)) {
    browserName = 'Samsung Internet';
  }

  // 3. คุณสมบัติการสัมผัสและพอยน์เตอร์
  const maxTouchPoints = typeof navigator !== 'undefined' ? navigator.maxTouchPoints || 0 : 0;
  const hasTouch =
    maxTouchPoints > 0 ||
    (typeof window !== 'undefined' && 'ontouchstart' in window) ||
    (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  const isCoarsePointer =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(pointer: coarse)').matches
      : hasTouch;

  const hasHover =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(hover: hover)').matches
      : !hasTouch;

  // 4. ขนาดหน้าจอและมิติ
  const screenWidth = typeof window !== 'undefined' ? window.screen?.width || window.innerWidth || 0 : 0;
  const screenHeight = typeof window !== 'undefined' ? window.screen?.height || window.innerHeight || 0 : 0;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth || 0 : 0;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight || 0 : 0;
  const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const orientation = viewportWidth >= viewportHeight ? 'landscape' : 'portrait';

  // 5. จัดหมวดหมู่อุปกรณ์ (Device Category)
  let deviceCategory: import('../types').DeviceCategory = 'desktop';
  const phoneUARegex = /iPhone|iPod|Android.*Mobile|webOS|BlackBerry|IEMobile|Opera Mini|mobile/i;
  const isPhoneUA = phoneUARegex.test(ua);
  const minDim = Math.min(viewportWidth, viewportHeight);

  if (hasTouch && (viewportWidth >= 1600 || screenWidth >= 1600) && !isPhoneUA) {
    deviceCategory = 'smartboard';
  } else if (isPhoneUA || (hasTouch && minDim > 0 && minDim <= 640)) {
    deviceCategory = 'smartphone';
  } else if (/iPad|Tablet/i.test(ua) || (hasTouch && (minDim > 640 || viewportWidth <= 1366))) {
    deviceCategory = 'tablet';
  } else {
    deviceCategory = 'desktop';
  }

  // 6. ตรวจสอบการสนับสนุนกล้อง (MediaDevices / getUserMedia)
  const hasCameraSupport =
    typeof navigator !== 'undefined' &&
    !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  // 7. ตรวจสอบ Web Audio API
  const hasWebAudio =
    typeof window !== 'undefined' &&
    !!(window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext);

  // 8. ตรวจสอบ Web Speech API (TTS)
  const hasSpeechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window;
  let availableVoicesCount = 0;
  let hasThaiVoice = false;
  if (hasSpeechSynthesis) {
    try {
      const voices = window.speechSynthesis.getVoices();
      availableVoicesCount = voices.length;
      hasThaiVoice = voices.some((v) => v.lang.toLowerCase().includes('th'));
    } catch {
      // Ignored
    }
  }

  // 9. ตรวจสอบ LocalStorage
  let hasLocalStorage = false;
  try {
    const testKey = '__test_ls__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    hasLocalStorage = true;
  } catch {
    hasLocalStorage = false;
  }

  // 10. สถานะเครือข่าย
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine !== false : true;

  // 11. โหมดควบคุมที่แนะนำ
  const recommendedControlMode: 'touch' | 'hand' =
    deviceCategory === 'smartphone' || deviceCategory === 'tablet' || deviceCategory === 'smartboard'
      ? 'touch'
      : 'hand';

  // 12. ประเมินคะแนนความพร้อม (Compatibility Score: 0 - 100)
  let score = 100;
  const recommendations: string[] = [];

  if (!hasCameraSupport) {
    score -= 15;
    recommendations.push('เบราว์เซอร์ไม่รองรับกล้องเว็บแคม (ระบบจะปรับเป็นโหมดสัมผัสหน้าจอให้โดยอัตโนมัติ)');
  }

  if (!hasWebAudio) {
    score -= 10;
    recommendations.push('ไม่พบ Web Audio API ระบบอาจเล่นเสียงเอฟเฟกต์สังเคราะห์ไม่ได้');
  }

  if (!hasSpeechSynthesis) {
    score -= 10;
    recommendations.push('ไม่พบ Web Speech API เสียงอ่านโจทย์ภาษาไทยอาจไม่ทำงานบนเบราว์เซอร์นี้');
  } else if (!hasThaiVoice && availableVoicesCount > 0) {
    recommendations.push('ไม่พบชุดเสียงภาษาไทยในเครื่อง (ระบบจะพยายามออกเสียงให้ดีที่สุดตามที่เครื่องรองรับ)');
  }

  if (deviceCategory === 'smartphone') {
    recommendations.push('แนะนำใช้ "โหมดสัมผัสหน้าจอ (Touch)" สำหรับโทรศัพท์มือถือ เพื่อความสะดวกและคล่องตัวสูงสุด');
    if (orientation === 'portrait') {
      recommendations.push('แนะนำถือเครื่องในแนวตั้งเพื่อให้อ่านตัวหนังสือและปุ่มคำตอบได้สะดวก');
    }
  } else if (deviceCategory === 'tablet') {
    recommendations.push('แท็บเล็ต/iPad เหมาะอย่างยิ่งสำหรับเด็กปฐมวัย สามารถใช้ได้ทั้งโหมดสัมผัสและตั้งโต๊ะเพื่อจับภาพมือ');
  } else if (deviceCategory === 'smartboard') {
    recommendations.push('ตรวจพบหน้าจอสัมผัสขนาดใหญ่หรือ Smart Board เหมาะสำหรับการจัดกิจกรรมกลุ่มในชั้นเรียน');
  } else {
    recommendations.push('คอมพิวเตอร์และโน้ตบุ๊กพร้อมใช้งานโหมดกล้องจับภาพมือ (MediaPipe Hand Tracking)');
  }

  if (!hasLocalStorage) {
    score -= 20;
    recommendations.push('LocalStorage ถูกปิดกั้น ข้อมูลคะแนนและสถิติอาจไม่ถูกบันทึกเมื่อปิดหน้าต่าง');
  }

  return {
    deviceId: getDeviceId(),
    deviceName: getDeviceName(),
    deviceCategory,
    osName,
    browserName,
    screenWidth,
    screenHeight,
    viewportWidth,
    viewportHeight,
    devicePixelRatio: Number(devicePixelRatio.toFixed(2)),
    orientation,
    hasTouch,
    maxTouchPoints,
    hasHover,
    isCoarsePointer,
    hasCameraSupport,
    hasWebAudio,
    hasSpeechSynthesis,
    availableVoicesCount,
    hasThaiVoice,
    hasLocalStorage,
    isOnline,
    recommendedControlMode,
    compatibilityScore: Math.max(0, score),
    recommendations,
  };
}


/**
 * ตรวจสอบว่าโปรไฟล์นี้ถูกสร้างขึ้นบนอุปกรณ์ปัจจุบันนี้หรือไม่
 */
export function isProfileCreatedOnThisDevice(profile?: ChildProfile | null): boolean {
  if (!profile) return false;
  const currentDevId = getDeviceId();
  // หากโปรไฟล์มี deviceId ให้เปรียบเทียบกับเครื่องปัจจุบัน
  if (profile.deviceId) {
    return profile.deviceId === currentDevId;
  }
  // กรณีโปรไฟล์เดิมที่สร้างก่อนมีระบบ deviceId ให้ถือเป็นของเครื่องนี้หากบันทึกอยู่ในเครื่อง
  return true;
}

/**
 * ตรวจสอบสิทธิ์ว่าสามารถแก้ไขโปรไฟล์นี้ได้หรือไม่
 * เงื่อนไข:
 * 1. ผู้ดูแลระบบ (Admin) สามารถแก้ไขได้ทุกโปรไฟล์
 * 2. หากไม่ใช่ Admin จะแก้ไขได้เฉพาะโปรไฟล์ที่สร้างจากอุปกรณ์นี้เท่านั้น
 */
export function canEditProfile(profile?: ChildProfile | null, isAdmin = false): boolean {
  if (!profile) return false;
  if (isAdmin) return true;
  return isProfileCreatedOnThisDevice(profile);
}

/**
 * ตรวจสอบสิทธิ์ว่าสามารถลบโปรไฟล์นี้ได้หรือไม่ (ใช้หลักการเดียวกัน)
 */
export function canDeleteProfile(profile?: ChildProfile | null, isAdmin = false): boolean {
  if (!profile) return false;
  if (isAdmin) return true;
  return isProfileCreatedOnThisDevice(profile);
}
