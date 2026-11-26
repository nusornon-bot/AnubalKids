/**
 * Service for Managing Authorized Emails for Question Management
 * สิทธิ์การเข้าถึงระบบบริหารจัดการแบบทดสอบ (เฉพาะอีเมลที่กำหนดเท่านั้น)
 */

export const DEFAULT_AUTHORIZED_EMAILS: string[] = [
  'nusornon@gmail.com', // อีเมลผู้ดูแลหลักที่ได้รับมอบหมาย
  'nusorn.not@anubalnara.ac.th',
  'webmaster@anubalnara.ac.th',
];

/**
 * รายชื่อ 3 บัญชีอีเมลที่ได้รับอนุญาตให้จัดการกระทู้ Classroom Discussion
 */
export const DISCUSSION_ADMIN_EMAILS: string[] = [
  'nusornon@gmail.com',
  'nusorn.not@anubalnara.ac.th',
  'webmaster@anubalnara.ac.th',
];

/**
 * ตรวจสอบสิทธิ์ผู้ดูแลระบบสำหรับการจัดการกระทู้ (เฉพาะ 3 บัญชีที่กำหนด)
 */
export function isDiscussionAdmin(emailOrUser?: string | { email?: string | null } | null): boolean {
  if (!emailOrUser) return false;
  const email = typeof emailOrUser === 'string' ? emailOrUser : emailOrUser.email;
  if (!email || typeof email !== 'string') return false;
  const clean = email.toLowerCase().trim();
  return DISCUSSION_ADMIN_EMAILS.some((adm) => adm.toLowerCase().trim() === clean);
}

/**
 * รายชื่ออีเมลที่ถูกนำออกจากสิทธิ์การเข้าสู่ระบบ (People who can sign in to your app - Removed)
 */
export const REMOVED_FROM_SIGNIN_EMAILS: string[] = [
  'anatee.see@anubalnara.ac.th',
  'panaprai.man@anubalnara.ac.th',
];

const STORAGE_KEY_AUTHORIZED_EMAILS = 'kids_edugame_authorized_emails';

/**
 * ดึงรายชื่ออีเมลที่ได้รับอนุญาตทั้งหมด (รวมค่าเริ่มต้นและที่บันทึกเพิ่มเติม พร้อมตัดอีเมลที่ถูกนำออก)
 */
export function getAuthorizedEmails(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_AUTHORIZED_EMAILS);
    const set = new Set<string>();

    DEFAULT_AUTHORIZED_EMAILS.forEach((e) => set.add(e.toLowerCase().trim()));

    if (stored) {
      const parsed: string[] = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        parsed.forEach((e) => {
          if (typeof e === 'string' && e.trim().length > 0) {
            set.add(e.toLowerCase().trim());
          }
        });
      }
    }

    // ตัดอีเมลที่ถูกระบุให้นำออก (Removed from sign-in) ทั้งหมด
    REMOVED_FROM_SIGNIN_EMAILS.forEach((removed) => {
      set.delete(removed.toLowerCase().trim());
    });

    const result = Array.from(set);

    // อัปเดต localStorage ให้ตรงกันเสมอ
    if (stored) {
      localStorage.setItem(STORAGE_KEY_AUTHORIZED_EMAILS, JSON.stringify(result));
    }

    return result;
  } catch (err) {
    console.error('Error reading authorized emails:', err);
    return DEFAULT_AUTHORIZED_EMAILS.filter(
      (e) => !REMOVED_FROM_SIGNIN_EMAILS.includes(e.toLowerCase().trim())
    );
  }
}

/**
 * ตรวจสอบว่าอีเมลนี้ได้รับอนุญาตให้จัดการแบบทดสอบและดูแลระบบหรือไม่
 */
export function isEmailAuthorized(email?: string | null): boolean {
  if (!email || typeof email !== 'string') return false;
  const cleanEmail = email.toLowerCase().trim();
  if (!cleanEmail) return false;

  // หากเป็นอีเมลที่ถูกนำออก ให้ปฏิเสธการเข้าถึงทันที
  if (REMOVED_FROM_SIGNIN_EMAILS.some((r) => r.toLowerCase().trim() === cleanEmail)) {
    return false;
  }

  const list = getAuthorizedEmails();
  return list.some((allowed) => allowed.toLowerCase().trim() === cleanEmail);
}

/**
 * ตรวจสอบสถานะว่าผู้ใช้เป็นผู้ดูแลระบบ (Administrator) หรือไม่
 */
export function isUserAdmin(user?: { email?: string | null } | null): boolean {
  if (!user || !user.email) return false;
  return isEmailAuthorized(user.email);
}

/**
 * เพิ่มอีเมลผู้ดูแลคนใหม่
 */
export function addAuthorizedEmail(email: string): { success: boolean; message: string } {
  const clean = email.toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(clean)) {
    return { success: false, message: 'รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง' };
  }

  if (REMOVED_FROM_SIGNIN_EMAILS.some((r) => r.toLowerCase().trim() === clean)) {
    return { success: false, message: `อีเมล ${clean} ถูกนำออกจากระบบและไม่อนุญาตให้ลงชื่อเข้าใช้` };
  }

  const current = getAuthorizedEmails();
  if (current.includes(clean)) {
    return { success: false, message: 'อีเมลนี้มีอยู่ในรายชื่อที่ได้รับอนุญาตแล้ว' };
  }

  try {
    const updated = [...current, clean];
    localStorage.setItem(STORAGE_KEY_AUTHORIZED_EMAILS, JSON.stringify(updated));
    return { success: true, message: `เพิ่มอีเมล ${clean} เรียบร้อยแล้ว` };
  } catch (err) {
    console.error('Error saving authorized email:', err);
    return { success: false, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' };
  }
}

/**
 * ลบอีเมลออกจากรายชื่อที่ได้รับอนุญาต (ไม่อนุญาตให้ลบอีเมลหลัก)
 */
export function removeAuthorizedEmail(email: string): { success: boolean; message: string } {
  const clean = email.toLowerCase().trim();
  const isDefault = DEFAULT_AUTHORIZED_EMAILS.some((d) => d.toLowerCase().trim() === clean);
  if (isDefault) {
    return { success: false, message: 'ไม่สามารถลบอีเมลผู้ดูแลหลัก (nusornon@gmail.com) ได้' };
  }

  try {
    const current = getAuthorizedEmails();
    const updated = current.filter((e) => e !== clean);
    localStorage.setItem(STORAGE_KEY_AUTHORIZED_EMAILS, JSON.stringify(updated));
    return { success: true, message: `ลบสิทธิ์ของอีเมล ${clean} เรียบร้อยแล้ว` };
  } catch (err) {
    console.error('Error deleting authorized email:', err);
    return { success: false, message: 'เกิดข้อผิดพลาดในการลบข้อมูล' };
  }
}
