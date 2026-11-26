import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export interface GrowthReportPdfOptions {
  filename?: string;
  onProgress?: (status: string) => void;
  pixelRatio?: number;
}

/**
 * Export the Student 8 Core Skills Growth Report DOM element to a high-resolution A4 Portrait PDF.
 * Standard A4 Portrait dimensions: 210mm x 297mm
 */
export async function exportStudentGrowthReportToPdf(
  element: HTMLElement,
  options?: GrowthReportPdfOptions
): Promise<void> {
  const filename = options?.filename || 'Student_Growth_Report_8_Core_Skills.pdf';
  const pixelRatio = options?.pixelRatio ?? 2.5;
  const onProgress = options?.onProgress;

  onProgress?.('กำลังเตรียมโครงสร้างเอกสารรายงานพัฒนาการ 8 ทักษะหลัก...');

  // Ensure all web fonts are loaded
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Font readiness fallback
    }
  }

  onProgress?.('กำลังเรนเดอร์เอกสารความละเอียดสูง (300 DPI)...');

  // Check for multi-page containers
  const pages = Array.from(element.querySelectorAll<HTMLElement>('.growth-report-page'));

  if (pages.length > 0) {
    // Multi-page specific rendering
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    for (let i = 0; i < pages.length; i++) {
      onProgress?.(`กำลังสร้างหน้า ${i + 1} จาก ${pages.length}...`);
      const pageEl = pages[i];
      const pageDataUrl = await toPng(pageEl, {
        pixelRatio,
        backgroundColor: '#FFFFFF',
        cacheBust: true,
        quality: 1.0,
        skipFonts: true,
        filter: (node) => {
          if (node instanceof HTMLElement && node.classList.contains('no-print')) {
            return false;
          }
          return true;
        },
      });

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(pageDataUrl, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
    }

    onProgress?.('กำลังบันทึกไฟล์ PDF...');
    pdf.save(filename);
    onProgress?.('ดาวน์โหลดสำเร็จเรียบร้อย!');
    return;
  }

  // Single-element rendering with dynamic height or page splitting
  const dataUrl = await toPng(element, {
    pixelRatio,
    backgroundColor: '#FFFFFF',
    cacheBust: true,
    quality: 1.0,
    skipFonts: true,
    filter: (node) => {
      if (node instanceof HTMLElement && node.classList.contains('no-print')) {
        return false;
      }
      return true;
    },
  });

  // Calculate height to see if multi-page is needed
  const img = new Image();
  img.src = dataUrl;
  await new Promise((resolve, reject) => {
    img.onload = () => resolve(true);
    img.onerror = (err) => reject(err);
  });

  const imgWidth = img.width;
  const imgHeight = img.height;
  const a4WidthMm = 210;
  const a4HeightMm = 297;
  const ratio = a4WidthMm / imgWidth;
  const totalHeightMm = imgHeight * ratio;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  if (totalHeightMm <= a4HeightMm + 5) {
    // Fits on single A4 page
    pdf.addImage(dataUrl, 'PNG', 0, 0, a4WidthMm, totalHeightMm, undefined, 'FAST');
  } else {
    // Multi-page split
    const pageCount = Math.ceil(totalHeightMm / a4HeightMm);
    const pxPerPage = imgWidth * (a4HeightMm / a4WidthMm);

    for (let page = 0; page < pageCount; page++) {
      onProgress?.(`กำลังจัดระเบียบหน้า A4 (หน้า ${page + 1}/${pageCount})...`);
      const srcY = page * pxPerPage;
      const srcHeight = Math.min(pxPerPage, imgHeight - srcY);

      const canvas = document.createElement('canvas');
      canvas.width = imgWidth;
      canvas.height = pxPerPage;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, srcY, imgWidth, srcHeight, 0, 0, imgWidth, srcHeight);
      }

      const pageData = canvas.toDataURL('image/png', 1.0);

      if (page > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(pageData, 'PNG', 0, 0, a4WidthMm, a4HeightMm, undefined, 'FAST');
    }
  }

  onProgress?.('กำลังบันทึกไฟล์ PDF...');
  pdf.save(filename);
  onProgress?.('ดาวน์โหลดสำเร็จเรียบร้อย!');
}

/**
 * Export the report element directly to PNG image
 */
export async function exportStudentGrowthReportToPng(
  element: HTMLElement,
  filename = 'Student_Growth_Report_8_Core_Skills.png'
): Promise<void> {
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Font readiness fallback
    }
  }

  const dataUrl = await toPng(element, {
    pixelRatio: 2.5,
    backgroundColor: '#FFFFFF',
    cacheBust: true,
    quality: 1.0,
    skipFonts: true,
    filter: (node) => {
      if (node instanceof HTMLElement && node.classList.contains('no-print')) {
        return false;
      }
      return true;
    },
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
