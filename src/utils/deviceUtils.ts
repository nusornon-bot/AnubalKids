import { useState, useEffect } from 'react';
import { ControlMode } from '../types';

/**
 * ตรวจจับว่าอุปกรณ์ปัจจุบันเป็นโทรศัพท์มือถือ (Smartphone / Mobile Screen) หรือไม่
 * โดยตรวจสอบทั้ง User Agent, Touch Points และขนาดหน้าจอแบบ Real-time
 */
export function detectIsMobilePhone(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  // 1. ตรวจสอบ User Agent ของโทรศัพท์มือถือ
  const ua = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
  const phoneUARegex = /iPhone|iPod|Android.*Mobile|webOS|BlackBerry|IEMobile|Opera Mini|mobile/i;
  const isMobileUA = phoneUARegex.test(ua);

  // 2. ตรวจสอบความสามารถหน้าจอสัมผัส (Touch capabilities)
  const hasTouch =
    (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0) ||
    'ontouchstart' in window ||
    (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  // 3. ตรวจสอบมิติหน้าจอ (ด้านที่สั้นที่สุดของมือถือมักไม่เกิน 600px ทั้งแนวตั้งและแนวนอน)
  const screenWidth = window.innerWidth || window.screen?.width || 0;
  const screenHeight = window.innerHeight || window.screen?.height || 0;
  const minDimension = Math.min(screenWidth, screenHeight);

  // ถ้าเป็น Mobile UA หรือเป็นจอสัมผัสที่มีขนาดหน้าจอด้านสั้น <= 640px ให้ถือว่าเป็นโทรศัพท์มือถือ
  if (isMobileUA) {
    return true;
  }

  if (hasTouch && minDimension > 0 && minDimension <= 640) {
    return true;
  }

  return false;
}

/**
 * Hook สำหรับติดตามการเปลี่ยนแปลงขนาดหน้าจอและกำหนดโหมดควบคุมเกมแบบ Reactive
 */
export function useDeviceMode(controlMode: ControlMode = 'auto') {
  const [isMobilePhone, setIsMobilePhone] = useState<boolean>(() => detectIsMobilePhone());

  useEffect(() => {
    const handleDeviceChange = () => {
      const isMobile = detectIsMobilePhone();
      setIsMobilePhone(isMobile);
    };

    window.addEventListener('resize', handleDeviceChange);
    window.addEventListener('orientationchange', handleDeviceChange);

    // Initial re-check after mount
    const timer = setTimeout(handleDeviceChange, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleDeviceChange);
      window.removeEventListener('orientationchange', handleDeviceChange);
    };
  }, []);

  // คำนวณโหมดการควบคุมที่มีผลใช้งานจริง (Effective Mode)
  // 'auto': หากเป็นโทรศัพท์มือถือ -> ใช้ 'touch' (แตะหน้าจอทันที), หากเป็นคอมพิวเตอร์ -> ใช้ 'hand' (จับภาพมือ)
  const effectiveMode: 'touch' | 'hand' =
    controlMode === 'auto'
      ? isMobilePhone
        ? 'touch'
        : 'hand'
      : controlMode;

  const isAutoSwitched = controlMode === 'auto' && isMobilePhone;

  return {
    isMobilePhone,
    effectiveMode,
    isAutoSwitched,
  };
}
