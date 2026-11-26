import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export interface CompetencyPdfOptions {
  filename?: string;
  studentName?: string;
  grade?: string;
  schoolName?: string;
  onProgress?: (status: string) => void;
  pixelRatio?: number;
}

/**
 * Export the Competency Assessment Summary report DOM element to a professional,
 * high-resolution A4 PDF document for parents to download using jsPDF.
 *
 * Standard A4 Portrait Dimensions: 210mm x 297mm
 */
export async function exportCompetencyAssessmentSummaryToPdf(
  element: HTMLElement,
  options?: CompetencyPdfOptions
): Promise<void> {
  const studentName = options?.studentName || 'นักเรียน';
  const grade = options?.grade || 'ประถมศึกษา';
  const defaultFilename = `สรุปผลการประเมินสมรรถนะ_${studentName}_${grade}_สำหรับผู้ปกครอง.pdf`;
  const filename = options?.filename || defaultFilename;
  const pixelRatio = options?.pixelRatio ?? 2.8;
  const onProgress = options?.onProgress;

  onProgress?.('กำลังเตรียมโครงสร้างเอกสารสรุปผลการประเมินสมรรถนะสำหรับผู้ปกครอง...');

  // Ensure all Thai web fonts and system fonts are ready
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Font fallback
    }
  }

  // Small delay to allow any pending charts or SVGs to finish settling
  await new Promise((resolve) => setTimeout(resolve, 150));

  onProgress?.('กำลังเรนเดอร์เอกสาร A4 ความละเอียดสูง (300 DPI Ultra-Sharp)...');

  // Check if explicit page containers exist (.growth-report-page or .competency-report-page)
  const explicitPages = Array.from(
    element.querySelectorAll<HTMLElement>('.growth-report-page, .competency-report-page')
  );

  const a4WidthMm = 210;
  const a4HeightMm = 297;

  if (explicitPages.length > 1) {
    // Multi-page pre-divided layout
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    pdf.setProperties({
      title: `แบบรายงานสรุปผลการประเมินสมรรถนะหลัก 6 ด้าน - ${studentName}`,
      subject: 'เอกสารสรุปผลการประเมินสมรรถนะผู้เรียนสำหรับผู้ปกครอง (Parent Assessment Summary)',
      author: options?.schoolName || 'สถานศึกษา สพฐ.',
      keywords: 'CBE, Competency Assessment, Parent Summary, Report Card, Primary Education',
      creator: 'ระบบประเมินสมรรถนะผู้เรียนอัตโนมัติ',
    });

    for (let i = 0; i < explicitPages.length; i++) {
      onProgress?.(`กำลังสร้างหน้าเอกสาร ${i + 1} จาก ${explicitPages.length}...`);
      const pageEl = explicitPages[i];
      const pageDataUrl = await toPng(pageEl, {
        pixelRatio,
        backgroundColor: '#FFFFFF',
        cacheBust: true,
        quality: 1.0,
        skipFonts: true,
        filter: (node) => {
          if (node instanceof HTMLElement && (node.classList.contains('no-print') || node.tagName === 'BUTTON')) {
            return false;
          }
          return true;
        },
      });

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(pageDataUrl, 'PNG', 0, 0, a4WidthMm, a4HeightMm, undefined, 'FAST');
    }

    onProgress?.('กำลังบันทึกและดาวน์โหลดไฟล์ PDF...');
    pdf.save(filename);
    onProgress?.('ดาวน์โหลดเอกสารสรุปสำหรับผู้ปกครองสำเร็จเรียบร้อย! 🎉');
    return;
  }

  // Single-element capture with dynamic multi-page slicing to preserve full report content
  const dataUrl = await toPng(element, {
    pixelRatio,
    backgroundColor: '#FFFFFF',
    cacheBust: true,
    quality: 1.0,
    skipFonts: true,
    filter: (node) => {
      if (node instanceof HTMLElement && (node.classList.contains('no-print') || node.tagName === 'BUTTON')) {
        return false;
      }
      return true;
    },
  });

  const img = new Image();
  img.src = dataUrl;
  await new Promise((resolve, reject) => {
    img.onload = () => resolve(true);
    img.onerror = (err) => reject(err);
  });

  const imgWidth = img.width;
  const imgHeight = img.height;
  const ratio = a4WidthMm / imgWidth;
  const totalHeightMm = imgHeight * ratio;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  pdf.setProperties({
    title: `แบบรายงานสรุปผลการประเมินสมรรถนะหลัก 6 ด้าน - ${studentName}`,
    subject: 'เอกสารสรุปผลการประเมินสมรรถนะผู้เรียนสำหรับผู้ปกครอง (Parent Assessment Summary)',
    author: options?.schoolName || 'สถานศึกษา สพฐ.',
    keywords: 'CBE, Competency Assessment, Parent Summary, Report Card, Primary Education',
    creator: 'ระบบประเมินสมรรถนะผู้เรียนอัตโนมัติ',
  });

  if (totalHeightMm <= a4HeightMm + 5) {
    // Fits neatly on a single standard A4 page
    pdf.addImage(dataUrl, 'PNG', 0, 0, a4WidthMm, totalHeightMm, undefined, 'FAST');
  } else {
    // Multi-page proportional slice
    const pxPerPage = imgWidth * (a4HeightMm / a4WidthMm);
    const pageCount = Math.ceil(imgHeight / pxPerPage);

    for (let page = 0; page < pageCount; page++) {
      onProgress?.(`กำลังจัดรูปเล่มหน้า A4 (หน้า ${page + 1}/${pageCount})...`);
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

        // Add subtle bottom page number footer
        ctx.fillStyle = '#94A3B8';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(
          `เอกสารสรุปประเมินสำหรับผู้ปกครอง • หน้า ${page + 1} จาก ${pageCount}`,
          canvas.width - 60,
          canvas.height - 30
        );
      }

      const pageData = canvas.toDataURL('image/png', 1.0);

      if (page > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(pageData, 'PNG', 0, 0, a4WidthMm, a4HeightMm, undefined, 'FAST');
    }
  }

  onProgress?.('กำลังบันทึกและดาวน์โหลดไฟล์ PDF...');
  pdf.save(filename);
  onProgress?.('ดาวน์โหลดเอกสารสรุปสำหรับผู้ปกครองสำเร็จเรียบร้อย! 🎉');
}
