/**
 * Image processing utilities for Question Management (Local Storage optimized)
 */

export interface ProcessedImageResult {
  dataUrl: string;
  width: number;
  height: number;
  sizeKb: number;
}

/**
 * Compresses and resizes an image file to a compact Data URL for Local Storage storage
 * Keeps image file size small (15 - 50 KB) to prevent exceeding browser localStorage limits.
 */
export async function processAndCompressImage(
  file: File,
  maxDimension = 500,
  quality = 0.82
): Promise<ProcessedImageResult> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('ไฟล์ที่เลือกไม่ใช่รูปภาพ กรุณาเลือกไฟล์รูปภาพ (PNG, JPG, WebP, GIF)'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio preserving resize
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('ไม่สามารถประมวลผลภาพบน Canvas ได้'));
          return;
        }

        // Draw with smooth interpolation
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer image/webp if supported, fallback to image/jpeg
        let dataUrl: string;
        try {
          dataUrl = canvas.toDataURL('image/webp', quality);
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }
        } catch {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        const sizeKb = Math.round((dataUrl.length * 3) / 4 / 1024);
        resolve({
          dataUrl,
          width,
          height,
          sizeKb,
        });
      };

      img.onerror = () => {
        reject(new Error('ไม่สามารถเปิดรูปภาพได้ กรุณาลองเลือกรูปภาพอื่น'));
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('ไม่สามารถอ่านไฟล์ได้ กรุณาลองใหม่อีกครั้ง'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Checks if a string is a valid image source (Data URL, Web URL, or SVG)
 */
export function isImageUrl(str?: string | null): boolean {
  if (!str || typeof str !== 'string') return false;
  const s = str.trim();
  return (
    s.startsWith('data:image/') ||
    s.startsWith('http://') ||
    s.startsWith('https://') ||
    s.startsWith('blob:') ||
    s.startsWith('/') ||
    s.endsWith('.png') ||
    s.endsWith('.jpg') ||
    s.endsWith('.jpeg') ||
    s.endsWith('.webp') ||
    s.endsWith('.svg')
  );
}

/**
 * Curated educational preset stickers and emojis for early childhood
 */
export interface EducationalPresetItem {
  id: string;
  name: string;
  symbol: string;
  category: 'animals' | 'fruits' | 'shapes' | 'numbers' | 'vehicles' | 'emotions' | 'nature' | 'objects';
}

export const EDUCATIONAL_STICKER_PRESETS: EducationalPresetItem[] = [
  // Animals
  { id: 'cat', name: 'แมวน้อย', symbol: '🐱', category: 'animals' },
  { id: 'dog', name: 'สุนัข', symbol: '🐶', category: 'animals' },
  { id: 'rabbit', name: 'กระต่าย', symbol: '🐰', category: 'animals' },
  { id: 'elephant', name: 'ช้าง', symbol: '🐘', category: 'animals' },
  { id: 'lion', name: 'สิงโต', symbol: '🦁', category: 'animals' },
  { id: 'tiger', name: 'เสือ', symbol: '🐯', category: 'animals' },
  { id: 'chicken', name: 'ไก่', symbol: '🐔', category: 'animals' },
  { id: 'duck', name: 'เป็ด', symbol: '🦆', category: 'animals' },
  { id: 'fish', name: 'ปลา', symbol: '🐟', category: 'animals' },
  { id: 'turtle', name: 'เต่า', symbol: '🐢', category: 'animals' },
  { id: 'bird', name: 'นก', symbol: '🐦', category: 'animals' },
  { id: 'monkey', name: 'ลิง', symbol: '🐵', category: 'animals' },

  // Fruits & Food
  { id: 'apple', name: 'แอปเปิ้ล', symbol: '🍎', category: 'fruits' },
  { id: 'banana', name: 'กล้วย', symbol: '🍌', category: 'fruits' },
  { id: 'orange', name: 'ส้ม', symbol: '🍊', category: 'fruits' },
  { id: 'watermelon', name: 'แตงโม', symbol: '🍉', category: 'fruits' },
  { id: 'strawberry', name: 'สตรอว์เบอร์รี', symbol: '🍓', category: 'fruits' },
  { id: 'grape', name: 'องุ่น', symbol: '🍇', category: 'fruits' },
  { id: 'carrot', name: 'แครอท', symbol: '🥕', category: 'fruits' },
  { id: 'milk', name: 'นมสด', symbol: '🥛', category: 'fruits' },
  { id: 'egg', name: 'ไข่ไก่', symbol: '🥚', category: 'fruits' },

  // Shapes & Geometry
  { id: 'circle_red', name: 'วงกลมสีแดง', symbol: '🔴', category: 'shapes' },
  { id: 'circle_blue', name: 'วงกลมสีฟ้า', symbol: '🔵', category: 'shapes' },
  { id: 'square_green', name: 'สี่เหลี่ยมสีเขียว', symbol: '🟩', category: 'shapes' },
  { id: 'square_yellow', name: 'สี่เหลี่ยมสีเหลือง', symbol: '🟨', category: 'shapes' },
  { id: 'triangle_red', name: 'สามเหลี่ยม', symbol: '🔺', category: 'shapes' },
  { id: 'star_gold', name: 'ดาวสีทอง', symbol: '⭐', category: 'shapes' },
  { id: 'diamond_blue', name: 'ข้าวหลามตัด', symbol: '🔷', category: 'shapes' },
  { id: 'heart_pink', name: 'หัวใจ', symbol: '💖', category: 'shapes' },

  // Numbers & Counting
  { id: 'num_1', name: 'เลข 1', symbol: '1️⃣', category: 'numbers' },
  { id: 'num_2', name: 'เลข 2', symbol: '2️⃣', category: 'numbers' },
  { id: 'num_3', name: 'เลข 3', symbol: '3️⃣', category: 'numbers' },
  { id: 'num_4', name: 'เลข 4', symbol: '4️⃣', category: 'numbers' },
  { id: 'num_5', name: 'เลข 5', symbol: '5️⃣', category: 'numbers' },
  { id: 'num_6', name: 'เลข 6', symbol: '6️⃣', category: 'numbers' },
  { id: 'num_7', name: 'เลข 7', symbol: '7️⃣', category: 'numbers' },
  { id: 'num_8', name: 'เลข 8', symbol: '8️⃣', category: 'numbers' },
  { id: 'num_9', name: 'เลข 9', symbol: '9️⃣', category: 'numbers' },
  { id: 'num_10', name: 'เลข 10', symbol: '🔟', category: 'numbers' },

  // Vehicles
  { id: 'car', name: 'รถยนต์', symbol: '🚗', category: 'vehicles' },
  { id: 'bus', name: 'รถบัส', symbol: '🚌', category: 'vehicles' },
  { id: 'train', name: 'รถไฟ', symbol: '🚂', category: 'vehicles' },
  { id: 'airplane', name: 'เครื่องบิน', symbol: '✈️', category: 'vehicles' },
  { id: 'boat', name: 'เรือ', symbol: '⛵', category: 'vehicles' },
  { id: 'bicycle', name: 'จักรยาน', symbol: '🚲', category: 'vehicles' },
  { id: 'rocket', name: 'จรวด', symbol: '🚀', category: 'vehicles' },

  // Emotions
  { id: 'happy', name: 'มีความสุข / ดีใจ', symbol: '😊', category: 'emotions' },
  { id: 'sad', name: 'เศร้าใจ / ร้องไห้', symbol: '😢', category: 'emotions' },
  { id: 'angry', name: 'โกรธ', symbol: '😡', category: 'emotions' },
  { id: 'surprised', name: 'ประหลาดใจ / ว้าว', symbol: '😲', category: 'emotions' },
  { id: 'laugh', name: 'หัวเราะร่าเริง', symbol: '😄', category: 'emotions' },
  { id: 'gentle', name: 'ใจดี / ยิ้มแย้ม', symbol: '🥰', category: 'emotions' },

  // Nature
  { id: 'sun', name: 'พระอาทิตย์', symbol: '☀️', category: 'nature' },
  { id: 'rain', name: 'ฝนตก', symbol: '🌧️', category: 'nature' },
  { id: 'tree', name: 'ต้นไม้', symbol: '🌳', category: 'nature' },
  { id: 'flower', name: 'ดอกไม้', symbol: '🌸', category: 'nature' },
  { id: 'rainbow', name: 'สายรุ้ง', symbol: '🌈', category: 'nature' },
  { id: 'moon', name: 'พระจันทร์', symbol: '🌙', category: 'nature' },

  // Objects & School
  { id: 'book', name: 'หนังสือ', symbol: '📖', category: 'objects' },
  { id: 'pencil', name: 'ดินสอ', symbol: '✏️', category: 'objects' },
  { id: 'scissors', name: 'กรรไกร', symbol: '✂️', category: 'objects' },
  { id: 'brush', name: 'พู่กันระบายสี', symbol: '🎨', category: 'objects' },
  { id: 'clock', name: 'นาฬิกา', symbol: '⏰', category: 'objects' },
  { id: 'ball', name: 'ลูกบอล', symbol: '⚽', category: 'objects' },
];
