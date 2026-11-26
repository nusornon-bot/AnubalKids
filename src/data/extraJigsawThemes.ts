import { JigsawArtTheme } from './jigsawImages';

const toDataUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

// 1. Cute Baby Elephant
export const SVG_ELEPHANT = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="eleBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E0F2FE" />
      <stop offset="100%" stop-color="#FEF3C7" />
    </linearGradient>
    <linearGradient id="eleBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#94A3B8" />
      <stop offset="100%" stop-color="#64748B" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="36" fill="url(#eleBg)" />
  <circle cx="200" cy="220" r="110" fill="url(#eleBody)" />
  <circle cx="130" cy="180" r="45" fill="#CBD5E1" />
  <circle cx="270" cy="180" r="45" fill="#CBD5E1" />
  <circle cx="170" cy="190" r="12" fill="#0F172A" />
  <circle cx="230" cy="190" r="12" fill="#0F172A" />
  <circle cx="173" cy="187" r="4" fill="#FFFFFF" />
  <circle cx="233" cy="187" r="4" fill="#FFFFFF" />
  <path d="M 185 220 Q 200 270 230 250 Q 240 230 220 220" fill="none" stroke="#64748B" stroke-width="24" stroke-linecap="round" />
  <circle cx="150" cy="225" r="15" fill="#FDA4AF" opacity="0.6" />
  <circle cx="250" cy="225" r="15" fill="#FDA4AF" opacity="0.6" />
</svg>
`);

// 2. Cute Panda
export const SVG_PANDA = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="panBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DCFCE7" />
      <stop offset="100%" stop-color="#ECFCCB" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="36" fill="url(#panBg)" />
  <circle cx="130" cy="130" r="35" fill="#1E293B" />
  <circle cx="270" cy="130" r="35" fill="#1E293B" />
  <circle cx="200" cy="220" r="115" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="4" />
  <ellipse cx="160" cy="200" rx="25" ry="32" fill="#1E293B" transform="rotate(-15 160 200)" />
  <ellipse cx="240" cy="200" rx="25" ry="32" fill="#1E293B" transform="rotate(15 240 200)" />
  <circle cx="165" cy="195" r="8" fill="#FFFFFF" />
  <circle cx="235" cy="195" r="8" fill="#FFFFFF" />
  <ellipse cx="200" cy="235" rx="14" ry="10" fill="#1E293B" />
  <path d="M 190 250 Q 200 260 210 250" stroke="#1E293B" stroke-width="5" fill="none" stroke-linecap="round" />
  <rect x="250" y="220" width="16" height="120" rx="8" fill="#22C55E" transform="rotate(25 250 220)" />
</svg>
`);

// 3. Yellow Submarine
export const SVG_SUBMARINE = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="subBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284C7" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="36" fill="url(#subBg)" />
  <ellipse cx="200" cy="230" rx="140" ry="70" fill="#FACC15" />
  <rect x="170" y="130" width="40" height="40" rx="6" fill="#EAB308" />
  <path d="M 190 130 L 190 90 L 220 90" stroke="#EAB308" stroke-width="12" fill="none" stroke-linecap="round" />
  <circle cx="140" cy="230" r="22" fill="#38BDF8" stroke="#FFFFFF" stroke-width="4" />
  <circle cx="200" cy="230" r="22" fill="#38BDF8" stroke="#FFFFFF" stroke-width="4" />
  <circle cx="260" cy="230" r="22" fill="#38BDF8" stroke="#FFFFFF" stroke-width="4" />
  <circle cx="60" cy="200" r="10" fill="#38BDF8" opacity="0.6" />
  <circle cx="90" cy="150" r="14" fill="#38BDF8" opacity="0.5" />
</svg>
`);

// 4. Magic Unicorn
export const SVG_UNICORN = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="uniBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDF4FF" />
      <stop offset="100%" stop-color="#FCE7F3" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="36" fill="url(#uniBg)" />
  <polygon points="200,50 185,140 215,140" fill="#FBBF24" stroke="#F59E0B" stroke-width="2" />
  <circle cx="200" cy="210" r="85" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="3" />
  <polygon points="140,120 160,165 130,165" fill="#FFFFFF" stroke="#F472B6" stroke-width="3" />
  <polygon points="260,120 240,165 270,165" fill="#FFFFFF" stroke="#F472B6" stroke-width="3" />
  <circle cx="170" cy="200" r="8" fill="#1E293B" />
  <circle cx="230" cy="200" r="8" fill="#1E293B" />
  <ellipse cx="200" cy="245" rx="30" ry="18" fill="#FBCFE8" />
  <circle cx="190" cy="245" r="3" fill="#DB2777" />
  <circle cx="210" cy="245" r="3" fill="#DB2777" />
  <path d="M 120 210 Q 90 250 120 280" fill="none" stroke="#C084FC" stroke-width="14" stroke-linecap="round" />
</svg>
`);

// 5. Little Train
export const SVG_TRAIN = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="trnBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="100%" stop-color="#FED7AA" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="36" fill="url(#trnBg)" />
  <rect x="70" y="160" width="160" height="110" rx="12" fill="#EF4444" />
  <rect x="210" y="110" width="120" height="160" rx="14" fill="#3B82F6" />
  <rect x="235" y="130" width="70" height="60" rx="8" fill="#BAE6FD" />
  <rect x="100" y="100" width="35" height="60" rx="6" fill="#F59E0B" />
  <circle cx="120" cy="285" r="30" fill="#334155" stroke="#94A3B8" stroke-width="6" />
  <circle cx="200" cy="285" r="30" fill="#334155" stroke="#94A3B8" stroke-width="6" />
  <circle cx="280" cy="285" r="30" fill="#334155" stroke="#94A3B8" stroke-width="6" />
  <rect x="50" y="315" width="300" height="12" rx="4" fill="#78350F" />
</svg>
`);

// 6. Fire Engine
export const SVG_FIRETRUCK = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="ftBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE4E6" />
      <stop offset="100%" stop-color="#FEE2E2" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="36" fill="url(#ftBg)" />
  <rect x="60" y="150" width="280" height="120" rx="16" fill="#DC2626" />
  <rect x="240" y="160" width="90" height="60" rx="8" fill="#BAE6FD" />
  <line x1="90" y1="130" x2="280" y2="130" stroke="#CBD5E1" stroke-width="12" stroke-linecap="round" />
  <circle cx="260" cy="115" r="14" fill="#3B82F6" />
  <circle cx="120" cy="275" r="32" fill="#1E293B" stroke="#E2E8F0" stroke-width="6" />
  <circle cx="270" cy="275" r="32" fill="#1E293B" stroke="#E2E8F0" stroke-width="6" />
</svg>
`);

// 7. Honey Bee Garden
export const SVG_HONEYBEE = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="beeBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ECFDF5" />
      <stop offset="100%" stop-color="#FEF9C3" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="36" fill="url(#beeBg)" />
  <ellipse cx="170" cy="130" rx="35" ry="50" fill="#E0F2FE" opacity="0.8" transform="rotate(-30 170 130)" />
  <ellipse cx="230" cy="130" rx="35" ry="50" fill="#E0F2FE" opacity="0.8" transform="rotate(30 230 130)" />
  <ellipse cx="200" cy="220" rx="90" ry="70" fill="#FBBF24" />
  <path d="M 180 152 L 180 288" stroke="#1E293B" stroke-width="18" />
  <path d="M 220 152 L 220 288" stroke="#1E293B" stroke-width="18" />
  <circle cx="145" cy="205" r="9" fill="#1E293B" />
  <circle cx="130" cy="225" r="10" fill="#FDA4AF" />
</svg>
`);

// 8. Happy Dolphin
export const SVG_DOLPHIN = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="dolBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E0F2FE" />
      <stop offset="100%" stop-color="#BAE6FD" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="36" fill="url(#dolBg)" />
  <path d="M 90 260 Q 150 120 260 160 Q 320 190 330 230 Q 240 200 180 270 Z" fill="#0284C7" />
  <polygon points="190,135 220,100 225,145" fill="#0284C7" />
  <circle cx="280" cy="180" r="7" fill="#0F172A" />
  <circle cx="282" cy="178" r="2.5" fill="#FFFFFF" />
  <path d="M 50 320 Q 100 300 150 320 T 250 320 T 350 320" fill="none" stroke="#38BDF8" stroke-width="8" stroke-linecap="round" />
</svg>
`);

// 9. Farm Tractor
export const SVG_TRACTOR = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="trcBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF3C7" />
      <stop offset="100%" stop-color="#DCFCE7" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="36" fill="url(#trcBg)" />
  <rect x="90" y="160" width="90" height="90" rx="10" fill="#16A34A" />
  <rect x="170" y="190" width="120" height="60" rx="8" fill="#22C55E" />
  <rect x="105" y="175" width="50" height="40" rx="6" fill="#BAE6FD" />
  <circle cx="120" cy="270" r="48" fill="#1E293B" stroke="#E2E8F0" stroke-width="8" />
  <circle cx="260" cy="285" r="30" fill="#1E293B" stroke="#E2E8F0" stroke-width="6" />
</svg>
`);

// 10. Princess Rainbow Castle
export const SVG_RAINBOW_CASTLE = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="casBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE7F3" />
      <stop offset="100%" stop-color="#EDE9FE" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="36" fill="url(#casBg)" />
  <path d="M 50 200 A 150 150 0 0 1 350 200" fill="none" stroke="#F43F5E" stroke-width="10" opacity="0.6" />
  <path d="M 60 200 A 140 140 0 0 1 340 200" fill="none" stroke="#FBBF24" stroke-width="10" opacity="0.6" />
  <path d="M 70 200 A 130 130 0 0 1 330 200" fill="none" stroke="#3B82F6" stroke-width="10" opacity="0.6" />
  <rect x="140" y="190" width="120" height="110" rx="10" fill="#F472B6" />
  <rect x="100" y="160" width="45" height="140" rx="6" fill="#EC4899" />
  <rect x="255" y="160" width="45" height="140" rx="6" fill="#EC4899" />
  <polygon points="122,100 95,160 150,160" fill="#8B5CF6" />
  <polygon points="277,100 250,160 305,160" fill="#8B5CF6" />
  <polygon points="200,120 160,190 240,190" fill="#A855F7" />
  <path d="M 180 300 A 20 20 0 0 1 220 300 Z" fill="#831843" />
</svg>
`);

export const EXTRA_JIGSAW_THEMES: JigsawArtTheme[] = [
  {
    id: 'theme-elephant',
    name: 'ลูกช้างพ่นน้ำแสนสุข',
    emoji: '🐘',
    category: 'สัตว์ป่าเพื่อนรัก',
    imageUrl: SVG_ELEPHANT,
    recommendedGrade: 'all',
    defaultGrid: { cols: 2, rows: 2 },
  },
  {
    id: 'theme-panda',
    name: 'แพนด้าน้อยกินไผ่เขียว',
    emoji: '🐼',
    category: 'สัตว์ป่าเพื่อนรัก',
    imageUrl: SVG_PANDA,
    recommendedGrade: 'K1',
    defaultGrid: { cols: 2, rows: 2 },
  },
  {
    id: 'theme-submarine',
    name: 'เรือดำน้ำสำรวจปะการัง',
    emoji: '🤿',
    category: 'ยานพาหนะและการเดินทาง',
    imageUrl: SVG_SUBMARINE,
    recommendedGrade: 'K2',
    defaultGrid: { cols: 3, rows: 3 },
  },
  {
    id: 'theme-unicorn',
    name: 'ยูนิคอร์นในแดนเวทมนตร์',
    emoji: '🦄',
    category: 'เทพนิยายแฟนตาซี',
    imageUrl: SVG_UNICORN,
    recommendedGrade: 'K2',
    defaultGrid: { cols: 3, rows: 3 },
  },
  {
    id: 'theme-train',
    name: 'รถไฟขบวนเล็กฉึกฉัก',
    emoji: '🚂',
    category: 'ยานพาหนะและการเดินทาง',
    imageUrl: SVG_TRAIN,
    recommendedGrade: 'K1',
    defaultGrid: { cols: 2, rows: 2 },
  },
  {
    id: 'theme-firetruck',
    name: 'รถดับเพลิงฮีโร่ตัวจริง',
    emoji: '🚒',
    category: 'ยานพาหนะและการเดินทาง',
    imageUrl: SVG_FIRETRUCK,
    recommendedGrade: 'K2',
    defaultGrid: { cols: 3, rows: 3 },
  },
  {
    id: 'theme-honeybee',
    name: 'ผึ้งน้อยในสวนดอกไม้',
    emoji: '🐝',
    category: 'ธรรมชาติและแมลง',
    imageUrl: SVG_HONEYBEE,
    recommendedGrade: 'K1',
    defaultGrid: { cols: 2, rows: 2 },
  },
  {
    id: 'theme-dolphin',
    name: 'โลมากระโดดเล่นคลื่น',
    emoji: '🐬',
    category: 'สัตว์น้ำแสนน่ารัก',
    imageUrl: SVG_DOLPHIN,
    recommendedGrade: 'K3',
    defaultGrid: { cols: 3, rows: 3 },
  },
  {
    id: 'theme-tractor',
    name: 'รถแทรกเตอร์ฟาร์มแสนสุข',
    emoji: '🚜',
    category: 'ฟาร์มและสวนดอกไม้',
    imageUrl: SVG_TRACTOR,
    recommendedGrade: 'K2',
    defaultGrid: { cols: 3, rows: 3 },
  },
  {
    id: 'theme-rainbow-castle',
    name: 'ปราสาทสายรุ้ง 7 สี',
    emoji: '🏰',
    category: 'เทพนิยายแฟนตาซี',
    imageUrl: SVG_RAINBOW_CASTLE,
    recommendedGrade: 'K3',
    defaultGrid: { cols: 3, rows: 3 },
  },
];
