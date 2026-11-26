import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export interface MultiPagePdfOptions {
  filename: string;
  onProgress?: (msg: string) => void;
  marginMm?: number;
  quality?: number;
  pixelRatio?: number;
  footerTitle?: string;
}

export interface CaptureOptions {
  pixelRatio?: number;
  backgroundColor?: string;
}

export interface ContentBox {
  top: number;
  bottom: number;
  height: number;
  isForceBreakBefore: boolean;
}

export interface LayoutCaptureResult {
  dataUrl: string;
  avoidBoxes: ContentBox[];
  targetWidth: number;
  targetHeight: number;
}

/**
 * Capture full unclipped DOM element to high-res PNG along with layout geometry
 * of all cards and sections so they can be neatly split across pages without cutting.
 */
export async function captureDocumentWithLayout(
  element: HTMLElement,
  options?: CaptureOptions
): Promise<LayoutCaptureResult> {
  const pixelRatio = options?.pixelRatio ?? 2;
  const backgroundColor = options?.backgroundColor ?? '#FFFFFF';

  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Font readiness fallback
    }
  }

  // 1. Store original styles of root element
  const originalStyle = {
    height: element.style.height,
    maxHeight: element.style.maxHeight,
    overflow: element.style.overflow,
    position: element.style.position,
    width: element.style.width,
  };

  // 2. Find all scrollable/constrained children
  const constrainedElements = Array.from(
    element.querySelectorAll<HTMLElement>(
      '.overflow-y-auto, .overflow-x-auto, [class*="max-h-"], [class*="overflow-"]'
    )
  );
  const childStyles = constrainedElements.map((el) => ({
    maxHeight: el.style.maxHeight,
    overflow: el.style.overflow,
    overflowY: el.style.overflowY,
    overflowX: el.style.overflowX,
    height: el.style.height,
  }));

  // 3. Find print-only elements (such as signatures) to display them during export
  const printOnlyElements = Array.from(
    element.querySelectorAll<HTMLElement>('.print-only')
  );
  const printOnlyStyles = printOnlyElements.map((el) => el.style.display);

  // 4. Find UI elements that shouldn't be in official export (like action buttons, trash buttons)
  const noExportElements = Array.from(
    element.querySelectorAll<HTMLElement>(
      '.no-print, button, [title*="ลบประวัติ"], [id*="btn-delete"], [id*="btn-confirm-delete"]'
    )
  );
  const noExportStyles = noExportElements.map((el) => el.style.display);

  try {
    // Temporarily unconstrain root element
    element.style.height = 'auto';
    element.style.maxHeight = 'none';
    element.style.overflow = 'visible';

    // Temporarily unconstrain all children
    constrainedElements.forEach((el) => {
      el.style.maxHeight = 'none';
      el.style.overflow = 'visible';
      el.style.overflowY = 'visible';
      el.style.overflowX = 'visible';
      el.style.height = 'auto';
    });

    // Make print-only sections visible in exported PDF & PNG
    printOnlyElements.forEach((el) => {
      el.style.display = 'grid';
    });

    // Hide interactive buttons in official export
    noExportElements.forEach((el) => {
      el.style.display = 'none';
    });

    // Wait brief frames for layout reflow and rendering
    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => setTimeout(r, 60));

    const targetWidth = element.scrollWidth || element.offsetWidth || 800;
    const targetHeight = Math.max(element.scrollHeight, element.offsetHeight, 600);
    const containerRect = element.getBoundingClientRect();

    // Collect all bounding boxes of content cards and sections that should NOT be split across pages
    const avoidSelector = [
      '.break-inside-avoid',
      '.worksheet-question-card',
      '.report-card-section',
      'tr',
      'table',
      '.printable-page-header',
      '.worksheet-page-signature',
      '.print-only',
      '.avoid-page-break',
      '[data-break-inside="avoid"]',
      '.space-y-4 > div',
      '.space-y-5 > div',
      '.space-y-6 > div',
    ].join(', ');

    const rawNodes = Array.from(element.querySelectorAll<HTMLElement>(avoidSelector));
    const seenNodes = new Set<HTMLElement>();
    const avoidBoxes: ContentBox[] = [];

    for (const node of rawNodes) {
      if (seenNodes.has(node)) continue;
      seenNodes.add(node);

      const r = node.getBoundingClientRect();
      const top = r.top - containerRect.top;
      const bottom = r.bottom - containerRect.top;
      const height = r.height;

      if (height > 18) {
        avoidBoxes.push({
          top,
          bottom,
          height,
          isForceBreakBefore:
            node.classList.contains('page-break-before') ||
            node.classList.contains('print-page-break'),
        });
      }
    }

    // Sort avoid boxes in reading order
    avoidBoxes.sort((a, b) => a.top - b.top);

    const imgData = await toPng(element, {
      quality: 1,
      pixelRatio,
      backgroundColor,
      width: targetWidth,
      height: targetHeight,
      skipFonts: true,
      style: {
        height: `${targetHeight}px`,
        maxHeight: 'none',
        overflow: 'visible',
      },
    });

    return {
      dataUrl: imgData,
      avoidBoxes,
      targetWidth,
      targetHeight,
    };
  } finally {
    // Restore all original styles
    element.style.height = originalStyle.height;
    element.style.maxHeight = originalStyle.maxHeight;
    element.style.overflow = originalStyle.overflow;
    element.style.position = originalStyle.position;
    element.style.width = originalStyle.width;

    constrainedElements.forEach((el, i) => {
      el.style.maxHeight = childStyles[i].maxHeight;
      el.style.overflow = childStyles[i].overflow;
      el.style.overflowY = childStyles[i].overflowY;
      el.style.overflowX = childStyles[i].overflowX;
      el.style.height = childStyles[i].height;
    });

    printOnlyElements.forEach((el, i) => {
      el.style.display = printOnlyStyles[i];
    });

    noExportElements.forEach((el, i) => {
      el.style.display = noExportStyles[i];
    });
  }
}

/**
 * Capture full unclipped DOM element to high-res PNG (backwards-compatible helper)
 */
export async function captureFullElementImage(
  element: HTMLElement,
  options?: CaptureOptions
): Promise<string> {
  const result = await captureDocumentWithLayout(element, options);
  return result.dataUrl;
}

/**
 * High-fidelity Multi-page PDF Generator
 * Intelligently divides content across standard A4 pages without slicing questions,
 * tables, or cards in half.
 * Also renders headers and footers using HTML5 Canvas for 100% crisp Thai font compatibility
 * without corrupting Thai text in jsPDF.
 */
export async function generateMultiPagePdf(
  element: HTMLElement,
  options: MultiPagePdfOptions
): Promise<void> {
  const {
    filename,
    onProgress,
    marginMm = 10,
    pixelRatio = 2,
    footerTitle = 'ระบบการศึกษาปฐมวัย คิดส์ คิดส์ (Kids Hand Motion EduGame)',
  } = options;

  onProgress?.('กำลังเตรียมฟอนต์และเรนเดอร์ภาพความละเอียดสูงแบบเต็มฉบับ...');

  // Capture element at full natural height with layout box metadata
  const { dataUrl, avoidBoxes, targetHeight } = await captureDocumentWithLayout(element, {
    pixelRatio,
    backgroundColor: '#FFFFFF',
  });

  onProgress?.('กำลังวิเคราะห์โครงสร้างและคำนวณการแบ่งหน้า A4 อัจฉริยะ...');

  // Load image into HTMLImageElement to read exact pixel dimensions
  const img = new Image();
  img.src = dataUrl;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (err) => reject(err);
  });

  const pageWidth = 210; // A4 standard width in mm
  const pageHeight = 297; // A4 standard height in mm
  const printableWidth = pageWidth - marginMm * 2; // 190mm
  const printableHeight = pageHeight - marginMm * 2; // 277mm

  // Reserve space for bottom page footer (8mm)
  const footerReservedMm = 8;
  const contentMaxHeightMm = printableHeight - footerReservedMm;

  // Calculate mm-to-pixel ratio on the rendered image
  const pxPerMm = img.width / printableWidth;
  const maxPageHeightInPx = Math.floor(contentMaxHeightMm * pxPerMm);
  const totalHeightInPx = img.height;

  // Scale avoid boxes from DOM coordinates to rendered image coordinates
  const scale = img.height / targetHeight;
  const scaledBoxes: ContentBox[] = avoidBoxes.map((b) => ({
    top: Math.round(b.top * scale),
    bottom: Math.round(b.bottom * scale),
    height: Math.round(b.height * scale),
    isForceBreakBefore: b.isForceBreakBefore,
  }));

  // Smart Content-Aware Page Slicing Algorithm
  const pageSlices: { y: number; height: number }[] = [];
  let currentY = 0;

  while (currentY < totalHeightInPx) {
    const remainingHeight = totalHeightInPx - currentY;

    // If remaining content fits comfortably within a single page
    if (remainingHeight <= maxPageHeightInPx) {
      pageSlices.push({ y: currentY, height: remainingHeight });
      break;
    }

    // Nominal target cut line for this page
    const nominalCut = currentY + maxPageHeightInPx;
    let chosenCut = nominalCut;

    // Check if any card/section is intersected by nominalCut
    const intersectedBoxes = scaledBoxes.filter(
      (box) => box.top < nominalCut && box.bottom > nominalCut && box.top > currentY
    );

    if (intersectedBoxes.length > 0) {
      // Find the top of the earliest intersected box
      const earliestTop = Math.min(...intersectedBoxes.map((b) => b.top));

      // Only move cut point backward if page retains substantial content (at least 20% of page height)
      if (earliestTop - currentY > maxPageHeightInPx * 0.2) {
        // Cut cleanly before the card with a small 10px margin
        chosenCut = Math.max(currentY + 40, earliestTop - 10);
      }
    }

    // Check if any box between currentY and chosenCut requests forceBreakBefore
    const forceBreakBox = scaledBoxes.find(
      (box) => box.isForceBreakBefore && box.top > currentY + 40 && box.top < chosenCut
    );
    if (forceBreakBox) {
      chosenCut = forceBreakBox.top - 10;
    }

    const sliceHeight = chosenCut - currentY;
    pageSlices.push({ y: currentY, height: sliceHeight });
    currentY = chosenCut;
  }

  const totalPages = Math.max(1, pageSlices.length);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    onProgress?.(`กำลังจัดหน้าเอกสาร A4 สวยงาม (หน้า ${pageIndex + 1} จาก ${totalPages})...`);

    const slice = pageSlices[pageIndex];

    // 1. Create temporary canvas for this page slice
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = img.width;
    pageCanvas.height = slice.height;
    const ctx = pageCanvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(
        img,
        0,
        slice.y,
        img.width,
        slice.height,
        0,
        0,
        img.width,
        slice.height
      );
    }

    const sliceData = pageCanvas.toDataURL('image/png', 1.0);
    const sliceHeightMm = slice.height / pxPerMm;

    if (pageIndex > 0) {
      pdf.addPage('a4', 'portrait');
    }

    // 2. Render image slice onto A4 page
    pdf.addImage(
      sliceData,
      'PNG',
      marginMm,
      marginMm,
      printableWidth,
      sliceHeightMm,
      undefined,
      'FAST'
    );

    // 3. Render high-res Thai footer using Canvas 2D
    // (This guarantees 100% correct Thai typography and eliminates corrupt jsPDF font glyphs)
    const footerCanvas = document.createElement('canvas');
    footerCanvas.width = img.width;
    footerCanvas.height = Math.round(7 * pxPerMm);
    const fctx = footerCanvas.getContext('2d');

    if (fctx) {
      fctx.fillStyle = '#FFFFFF';
      fctx.fillRect(0, 0, footerCanvas.width, footerCanvas.height);

      // Subtle top divider line
      fctx.strokeStyle = '#CBD5E1';
      fctx.lineWidth = 1.5;
      fctx.beginPath();
      fctx.moveTo(0, 1);
      fctx.lineTo(footerCanvas.width, 1);
      fctx.stroke();

      // Thai typography setup
      const fontSizePx = Math.max(12, Math.round(3.2 * pxPerMm));
      fctx.font = `500 ${fontSizePx}px 'Prompt', 'Kanit', sans-serif`;
      fctx.fillStyle = '#64748B';
      fctx.textBaseline = 'middle';

      const textY = footerCanvas.height / 2 + 1;

      // Left footer: document title
      if (footerTitle) {
        fctx.textAlign = 'left';
        fctx.fillText(footerTitle, 4, textY);
      }

      // Right footer: page number
      const pageText = `หน้า ${pageIndex + 1} จากทั้งหมด ${totalPages} หน้า`;
      fctx.textAlign = 'right';
      fctx.fillText(pageText, footerCanvas.width - 4, textY);

      const footerData = footerCanvas.toDataURL('image/png', 1.0);
      pdf.addImage(
        footerData,
        'PNG',
        marginMm,
        pageHeight - marginMm - 6,
        printableWidth,
        6,
        undefined,
        'FAST'
      );
    }
  }

  onProgress?.('กำลังบันทึกและส่งมอบไฟล์ PDF...');
  pdf.save(filename);
}
