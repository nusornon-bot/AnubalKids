import React from 'react';

export interface PresetEmblem {
  id: string;
  name: string;
  description: string;
  category: 'official' | 'kindergarten' | 'academic';
}

export const PRESET_EMBLEMS: PresetEmblem[] = [
  {
    id: 'emblem-torch',
    name: 'คบเพลิงปัญญา & ตำราเรียน',
    description: 'สัญลักษณ์มาตรฐานการศึกษา คบเพลิงส่องทางปัญญาและช่อชัยพฤกษ์',
    category: 'official',
  },
  {
    id: 'emblem-crest',
    name: 'ตราโล่เกียรติยศวิชาการ',
    description: 'โล่เกียรติภูมิ ดวงดาราแห่งความสำเร็จ และแถบโบว์รางวัล',
    category: 'academic',
  },
  {
    id: 'emblem-kinder',
    name: 'ต้นกล้าปฐมวัย & ตะวันยิ้ม',
    description: 'สัญลักษณ์การเติบโตสมวัย พัฒนาการ 4 ด้านของเด็กปฐมวัย',
    category: 'kindergarten',
  },
  {
    id: 'emblem-lotus',
    name: 'บัวหลวงเกียรติคุณไทย',
    description: 'ดอกบัวหลวงพ้นน้ำ สัญลักษณ์แห่งความบริสุทธิ์และปัญญาญาณ',
    category: 'official',
  },
  {
    id: 'emblem-schoolhouse',
    name: 'สถาบันการศึกษา & ระฆังทอง',
    description: 'บ้านหลังที่สองแห่งการเรียนรู้ อบอุ่น ปลอดภัย พัฒนาการสมบูรณ์',
    category: 'kindergarten',
  },
];

interface EmblemProps {
  className?: string;
  size?: number;
}

export const EmblemTorch: React.FC<EmblemProps> = ({ className = 'w-14 h-14', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer Laurel Wreath */}
    <circle cx="50" cy="50" r="46" stroke="#D97706" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
    <circle cx="50" cy="50" r="42" stroke="#B45309" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="40" fill="#FEF3C7" fillOpacity="0.35" />
    {/* Golden Laurel Leaves Left */}
    <path
      d="M26 62C24 55 24 45 28 36C29 39 31 43 31 47C31 52 29 58 26 62Z"
      fill="#D97706"
    />
    <path
      d="M32 72C28 66 28 58 31 51C33 54 36 58 36 62C36 66 34 70 32 72Z"
      fill="#F59E0B"
    />
    <path
      d="M23 48C21 41 23 33 28 26C28 30 30 35 29 39C27 42 25 45 23 48Z"
      fill="#B45309"
    />
    {/* Golden Laurel Leaves Right */}
    <path
      d="M74 62C76 55 76 45 72 36C71 39 69 43 69 47C69 52 71 58 74 62Z"
      fill="#D97706"
    />
    <path
      d="M68 72C72 66 72 58 69 51C67 54 64 58 64 62C64 66 66 70 68 72Z"
      fill="#F59E0B"
    />
    <path
      d="M77 48C79 41 77 33 72 26C72 30 70 35 71 39C73 42 75 45 77 48Z"
      fill="#B45309"
    />
    {/* Open Book Foundation */}
    <path
      d="M32 73C38 71 45 72 50 75C55 72 62 71 68 73V81C62 79 55 80 50 83C45 80 38 79 32 81V73Z"
      fill="#1E293B"
    />
    <path
      d="M33 74C38 72 45 73 50 76C55 73 62 72 67 74V80C62 78 55 79 50 82C45 79 38 78 33 80V74Z"
      fill="#F8FAFC"
    />
    {/* Torch Body */}
    <path d="M47 48L45 72H55L53 48H47Z" fill="#D97706" stroke="#92400E" strokeWidth="1" />
    <path d="M43 46H57V49H43V46Z" fill="#F59E0B" />
    <path d="M41 42H59V46H41V42Z" fill="#D97706" />
    {/* Flaming Fire */}
    <path
      d="M50 16C50 16 57 24 57 32C57 37 54 42 50 42C46 42 43 37 43 32C43 24 50 16 50 16Z"
      fill="#EF4444"
    />
    <path
      d="M50 22C50 22 54 28 54 33C54 36.5 52 40 50 40C48 40 46 36.5 46 33C46 28 50 22 50 22Z"
      fill="#F59E0B"
    />
    <path
      d="M50 28C50 28 52 32 52 35C52 37 51 39 50 39C49 39 48 37 48 35C48 32 50 28 50 28Z"
      fill="#FEF08A"
    />
    {/* Center Golden Star */}
    <polygon
      points="50,48 51.5,52 56,52 52.5,54.5 54,59 50,56 46,59 47.5,54.5 44,52 48.5,52"
      fill="#FEF08A"
    />
  </svg>
);

export const EmblemCrest: React.FC<EmblemProps> = ({ className = 'w-14 h-14', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Shield Outline */}
    <path
      d="M50 10L78 20V50C78 68 66 84 50 92C34 84 22 68 22 50V20L50 10Z"
      fill="#0F172A"
      stroke="#D97706"
      strokeWidth="2.5"
    />
    <path
      d="M50 14L74 23V50C74 65 64 79 50 87C36 79 26 65 26 50V23L50 14Z"
      fill="#FFFBEB"
    />
    {/* Inner Shield Split */}
    <path d="M50 15V86C62 79 72 66 72 50V24L50 15Z" fill="#FEF3C7" />
    {/* Graduation Mortarboard */}
    <polygon points="50,26 68,34 50,42 32,34" fill="#0F172A" />
    <polygon points="50,29 64,34 50,40 36,34" fill="#D97706" />
    <path d="M42 41V47C42 49 46 51 50 51C54 51 58 49 58 47V41" fill="#0F172A" />
    {/* Tassel */}
    <path d="M64 35L67 43C67 46 65 47 64 47" stroke="#EF4444" strokeWidth="1.5" />
    {/* Big Five-pointed Star */}
    <polygon
      points="50,52 53.5,60 62,60.5 55.5,65.5 58,74 50,69 42,74 44.5,65.5 38,60.5 46.5,60"
      fill="#D97706"
      stroke="#B45309"
      strokeWidth="1"
    />
    <polygon
      points="50,55 52.5,61 58,61.5 53.5,65 55.5,71 50,67.5 44.5,71 46.5,65 42,61.5 47.5,61"
      fill="#FBBF24"
    />
  </svg>
);

export const EmblemKindergarten: React.FC<EmblemProps> = ({ className = 'w-14 h-14', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Cheerful Badge Ring */}
    <circle cx="50" cy="50" r="46" fill="#FEF9C3" stroke="#F59E0B" strokeWidth="3" />
    <circle cx="50" cy="50" r="41" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
    {/* Sunburst in Top Corner */}
    <circle cx="34" cy="34" r="12" fill="#FBBF24" />
    <path d="M34 16V20M34 48V52M16 34H20M48 34H52M21 21L24 24M44 44L47 47M47 21L44 24M21 47L24 44" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    {/* Sprout & Hands of Growth */}
    <path
      d="M30 78C35 70 42 66 50 66C58 66 65 70 70 78C62 82 50 83 30 78Z"
      fill="#059669"
    />
    <path
      d="M50 66V46M50 46C44 44 38 38 40 30C48 30 50 38 50 46ZM50 46C56 44 62 38 60 30C52 30 50 38 50 46Z"
      fill="#10B981"
      stroke="#047857"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Cute Flower Petals */}
    <circle cx="50" cy="28" r="4" fill="#EC4899" />
    <circle cx="50" cy="28" r="2" fill="#FDE047" />
    {/* Rainbow Arc */}
    <path d="M26 60C26 42 36 30 50 30C64 30 74 42 74 60" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M30 63C30 48 38 36 50 36C62 36 70 48 70 63" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
  </svg>
);

export const EmblemLotus: React.FC<EmblemProps> = ({ className = 'w-14 h-14', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Classical Thai Style Octagonal Ornament */}
    <circle cx="50" cy="50" r="46" fill="#FFFDF7" stroke="#B45309" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="42" stroke="#D97706" strokeWidth="1" strokeDasharray="3 2" />
    {/* Water Waves Base */}
    <path
      d="M26 76C32 74 38 78 44 76C50 74 56 78 62 76C68 74 74 76 74 76"
      stroke="#3B82F6"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M30 81C36 79 42 83 48 81C54 79 60 83 66 81C70 80 72 81 72 81"
      stroke="#60A5FA"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Lotus Petals */}
    {/* Outer Left Petal */}
    <path
      d="M50 68C38 68 28 56 30 44C36 46 44 54 50 68Z"
      fill="#F472B6"
      stroke="#BE185D"
      strokeWidth="1.2"
    />
    {/* Outer Right Petal */}
    <path
      d="M50 68C62 68 72 56 70 44C64 46 56 54 50 68Z"
      fill="#F472B6"
      stroke="#BE185D"
      strokeWidth="1.2"
    />
    {/* Mid Left Petal */}
    <path
      d="M50 69C40 65 34 50 40 36C45 42 48 54 50 69Z"
      fill="#FB7185"
      stroke="#9F1239"
      strokeWidth="1.2"
    />
    {/* Mid Right Petal */}
    <path
      d="M50 69C60 65 66 50 60 36C55 42 52 54 50 69Z"
      fill="#FB7185"
      stroke="#9F1239"
      strokeWidth="1.2"
    />
    {/* Center Main Petal (Blooming upward) */}
    <path
      d="M50 22C46 36 44 54 50 70C56 54 54 36 50 22Z"
      fill="#FDE047"
      stroke="#B45309"
      strokeWidth="1.5"
    />
    {/* Glow Droplet at Spire */}
    <circle cx="50" cy="18" r="3" fill="#F59E0B" />
  </svg>
);

export const EmblemSchoolhouse: React.FC<EmblemProps> = ({ className = 'w-14 h-14', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Circle Crest Frame */}
    <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="41" stroke="#F59E0B" strokeWidth="1.5" />
    {/* Ground & Grass */}
    <path d="M20 78H80V84H20V78Z" fill="#10B981" />
    {/* Schoolhouse Building */}
    <rect x="32" y="48" width="36" height="30" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />
    {/* Building Roof */}
    <polygon points="50,30 26,48 74,48" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
    {/* Bell Tower */}
    <rect x="44" y="18" width="12" height="14" fill="#F1F5F9" stroke="#334155" strokeWidth="1.2" />
    <polygon points="50,10 42,18 58,18" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
    {/* Golden Bell */}
    <circle cx="50" cy="24" r="2.5" fill="#F59E0B" />
    {/* School Door & Windows */}
    <path d="M46 64H54V78H46V64Z" fill="#92400E" />
    <rect x="36" y="54" width="6" height="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
    <rect x="58" y="54" width="6" height="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
    {/* Mini Thai Flag on Top */}
    <line x1="50" y1="10" x2="50" y2="4" stroke="#64748B" strokeWidth="1" />
    <rect x="50" y="4" width="7" height="1" fill="#EF4444" />
    <rect x="50" y="5" width="7" height="1" fill="#F8FAFC" />
    <rect x="50" y="6" width="7" height="1.5" fill="#2563EB" />
    <rect x="50" y="7.5" width="7" height="1" fill="#F8FAFC" />
    <rect x="50" y="8.5" width="7" height="1" fill="#EF4444" />
  </svg>
);

export const SchoolEmblemRenderer: React.FC<{
  presetId?: string;
  customLogoUrl?: string;
  className?: string;
  size?: number;
}> = ({ presetId = 'emblem-torch', customLogoUrl, className = 'w-14 h-14', size = 56 }) => {
  if (customLogoUrl && customLogoUrl.trim() !== '') {
    return (
      <img
        src={customLogoUrl}
        alt="ตราสัญลักษณ์สถานศึกษา"
        className={`${className} object-contain rounded-full bg-white shadow-xs border border-amber-300/60 p-0.5`}
        style={{ width: `${size}px`, height: `${size}px` }}
        crossOrigin="anonymous"
      />
    );
  }

  switch (presetId) {
    case 'emblem-crest':
      return <EmblemCrest className={className} size={size} />;
    case 'emblem-kinder':
      return <EmblemKindergarten className={className} size={size} />;
    case 'emblem-lotus':
      return <EmblemLotus className={className} size={size} />;
    case 'emblem-schoolhouse':
      return <EmblemSchoolhouse className={className} size={size} />;
    case 'emblem-torch':
    default:
      return <EmblemTorch className={className} size={size} />;
  }
};
