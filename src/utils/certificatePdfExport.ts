import jsPDF from 'jspdf';
import { toPng, toBlob } from 'html-to-image';

export interface CertificateExportOptions {
  filename?: string;
  onProgress?: (status: string) => void;
  pixelRatio?: number;
}

/**
 * Export the Certificate element to a high-resolution A4 Landscape PDF
 * A4 Landscape dimensions: 297mm x 210mm
 */
export async function exportCertificateToPdf(
  element: HTMLElement,
  options?: CertificateExportOptions
): Promise<void> {
  const filename = options?.filename || 'Certificate_of_Achievement.pdf';
  const pixelRatio = options?.pixelRatio ?? 3; // 3x for ultra-sharp print output
  const onProgress = options?.onProgress;

  onProgress?.('กำลังเตรียมแบบฟอร์มเกียรติบัตร...');

  // Ensure all web fonts are fully loaded
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Font readiness fallback
    }
  }

  onProgress?.('กำลังเรนเดอร์ภาพความละเอียดสูง (300 DPI)...');

  // Capture high-res PNG image of the certificate container
  const dataUrl = await toPng(element, {
    pixelRatio,
    backgroundColor: '#FFFDF9',
    cacheBust: true,
    quality: 1.0,
    skipFonts: true,
    filter: (node) => {
      // Exclude interactive controls with .no-certificate-export class if any
      if (node instanceof HTMLElement && node.classList.contains('no-certificate-export')) {
        return false;
      }
      return true;
    },
  });

  onProgress?.('กำลังสร้างไฟล์ PDF ขนาด A4 แนวนอน...');

  // Initialize jsPDF in Landscape A4 (297 x 210 mm)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Add the high-res certificate image filling the exact A4 landscape page
  pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210, undefined, 'FAST');

  onProgress?.('เสร็จสิ้น! กำลังดาวน์โหลด...');
  pdf.save(filename);
}

/**
 * Export the Certificate element directly to high-res PNG for easy sharing
 */
export async function exportCertificateToPng(
  element: HTMLElement,
  filename = 'Certificate_of_Achievement.png'
): Promise<void> {
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Font readiness fallback
    }
  }

  const dataUrl = await toPng(element, {
    pixelRatio: 3,
    backgroundColor: '#FFFDF9',
    cacheBust: true,
    quality: 1.0,
    skipFonts: true,
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Render the certificate element into a high-res Blob for Web Share API or upload
 */
export async function getCertificateBlob(
  element: HTMLElement,
  pixelRatio = 2
): Promise<Blob> {
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Font readiness fallback
    }
  }

  const blob = await toBlob(element, {
    pixelRatio,
    backgroundColor: '#FFFDF9',
    cacheBust: true,
    quality: 0.95,
    skipFonts: true,
    filter: (node) => {
      if (node instanceof HTMLElement && node.classList.contains('no-certificate-export')) {
        return false;
      }
      return true;
    },
  });

  if (!blob) {
    throw new Error('Failed to generate certificate image blob');
  }

  return blob;
}

/**
 * Render the certificate element into a File object ready for Web Share API (navigator.share)
 */
export async function getCertificateFile(
  element: HTMLElement,
  filename = 'Certificate_of_Achievement.png',
  pixelRatio = 2
): Promise<File> {
  const blob = await getCertificateBlob(element, pixelRatio);
  return new File([blob], filename, { type: 'image/png' });
}

/**
 * Render the certificate element into a Data URL (PNG) for preview
 */
export async function getCertificateDataUrl(
  element: HTMLElement,
  pixelRatio = 2
): Promise<string> {
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Font readiness fallback
    }
  }

  return await toPng(element, {
    pixelRatio,
    backgroundColor: '#FFFDF9',
    cacheBust: true,
    quality: 0.95,
    skipFonts: true,
    filter: (node) => {
      if (node instanceof HTMLElement && node.classList.contains('no-certificate-export')) {
        return false;
      }
      return true;
    },
  });
}

/**
 * Copy certificate image directly to clipboard using ClipboardItem
 */
export async function copyCertificateImageToClipboard(
  element: HTMLElement,
  pixelRatio = 2
): Promise<boolean> {
  if (
    typeof window === 'undefined' ||
    !navigator.clipboard?.write ||
    typeof ClipboardItem === 'undefined'
  ) {
    throw new Error('เบราว์เซอร์นี้ไม่รองรับการคัดลอกรูปภาพลงคลิปบอร์ดโดยตรง');
  }

  const blob = await getCertificateBlob(element, pixelRatio);
  const item = new ClipboardItem({ 'image/png': blob });
  await navigator.clipboard.write([item]);
  return true;
}

export interface WebShareCertificateOptions {
  title: string;
  text: string;
  url?: string;
  filename?: string;
  pixelRatio?: number;
}

export interface WebShareResult {
  success: boolean;
  sharedWithFile: boolean;
  cancelled?: boolean;
  error?: string;
}

/**
 * Check if Web Share API is available on current environment
 */
export function isWebShareSupported(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

/**
 * Check if Web Share API supports file sharing on current environment
 */
export function isWebShareFileSupported(): boolean {
  if (!isWebShareSupported() || typeof navigator.canShare !== 'function') {
    return false;
  }
  try {
    const dummyFile = new File([''], 'test.png', { type: 'image/png' });
    return navigator.canShare({ files: [dummyFile] });
  } catch {
    return false;
  }
}

/**
 * Share certificate using the Web Share API with image file and fallback
 */
export async function shareCertificateViaWebShare(
  element: HTMLElement,
  options: WebShareCertificateOptions
): Promise<WebShareResult> {
  if (!isWebShareSupported()) {
    return {
      success: false,
      sharedWithFile: false,
      error: 'เบราว์เซอร์หรืออุปกรณ์นี้ไม่รองรับ Web Share API',
    };
  }

  const filename = options.filename || 'Certificate_of_Achievement.png';
  let certFile: File | null = null;

  try {
    certFile = await getCertificateFile(element, filename, options.pixelRatio ?? 2);
  } catch (err: any) {
    console.warn('Could not generate certificate image file for Web Share:', err);
  }

  // 1. Try sharing with image file
  if (certFile) {
    const shareDataWithFile: ShareData = {
      title: options.title,
      text: options.text,
      files: [certFile],
    };

    const canShareFiles =
      typeof navigator.canShare === 'function'
        ? navigator.canShare(shareDataWithFile)
        : true;

    if (canShareFiles) {
      try {
        await navigator.share(shareDataWithFile);
        return { success: true, sharedWithFile: true };
      } catch (err: any) {
        if (err?.name === 'AbortError') {
          return { success: false, sharedWithFile: true, cancelled: true };
        }
        console.warn('Failed sharing with file and text, trying file only:', err);
        try {
          await navigator.share({
            title: options.title,
            files: [certFile],
          });
          return { success: true, sharedWithFile: true };
        } catch (innerErr: any) {
          if (innerErr?.name === 'AbortError') {
            return { success: false, sharedWithFile: true, cancelled: true };
          }
          console.warn('File-only sharing failed, falling back to text/URL:', innerErr);
        }
      }
    }
  }

  // 2. Fallback to sharing text and URL if file sharing wasn't supported
  try {
    await navigator.share({
      title: options.title,
      text: options.text,
      url: options.url || (typeof window !== 'undefined' ? window.location.href : undefined),
    });
    return { success: true, sharedWithFile: false };
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return { success: false, sharedWithFile: false, cancelled: true };
    }
    return {
      success: false,
      sharedWithFile: false,
      error: err?.message || 'เกิดข้อผิดพลาดในการแชร์',
    };
  }
}
