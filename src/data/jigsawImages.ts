// SVG Illustrations encoded as Data URIs for Preschool Jigsaw Puzzle Game
import { EXTRA_JIGSAW_THEMES } from './extraJigsawThemes';

const toDataUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

// 1. Cute Baby Blue Whale spouting water (Exact match to user's screenshot)
export const SVG_WHALE = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="whaleBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E0E7FF" />
      <stop offset="35%" stop-color="#CCFBF1" />
      <stop offset="70%" stop-color="#E0F2FE" />
      <stop offset="100%" stop-color="#FCE7F3" />
    </linearGradient>
    <linearGradient id="whaleBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA" />
      <stop offset="60%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
    <linearGradient id="whaleBelly" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#CFFAFE" />
    </linearGradient>
    <linearGradient id="spoutWater" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0284C7" />
      <stop offset="60%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#BAE6FD" />
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0284C7" flood-opacity="0.2" />
    </filter>
  </defs>

  <!-- Pastel Background with Rounded Corners -->
  <rect width="400" height="400" rx="36" fill="url(#whaleBg)" />

  <!-- Background Ambient Floating Bubbles -->
  <circle cx="80" cy="120" r="14" fill="#38BDF8" opacity="0.3" />
  <circle cx="110" cy="80" r="8" fill="#38BDF8" opacity="0.4" />
  <circle cx="340" cy="140" r="12" fill="#38BDF8" opacity="0.25" />
  <circle cx="360" cy="280" r="16" fill="#38BDF8" opacity="0.25" />
  <circle cx="60" cy="300" r="10" fill="#38BDF8" opacity="0.3" />

  <!-- Whale Main Body & Shadow -->
  <g filter="url(#softShadow)">
    <!-- Whale Tail (Upcurved right) -->
    <path d="M 270 230 C 310 210, 340 180, 360 130 C 340 145, 315 150, 290 160 C 310 120, 315 100, 305 90 C 290 100, 275 130, 260 170 C 245 190, 240 210, 240 220 Z" fill="url(#whaleBody)" />
    <!-- Whale Tail Fin Top Wing -->
    <path d="M 360 130 C 375 105, 365 85, 345 95 C 330 105, 320 125, 315 145 C 335 140, 350 135, 360 130 Z" fill="#38BDF8" />

    <!-- Whale Chubby Body -->
    <path d="M 70 240 C 65 170, 140 135, 230 140 C 290 145, 315 190, 290 250 C 270 290, 200 305, 130 295 C 90 290, 72 270, 70 240 Z" fill="url(#whaleBody)" />

    <!-- Whale Light Belly -->
    <path d="M 75 250 C 72 220, 100 210, 140 220 C 180 230, 220 260, 250 280 C 220 298, 170 302, 120 295 C 90 290, 78 275, 75 250 Z" fill="url(#whaleBelly)" />

    <!-- Whale Side Flipper Fin -->
    <path d="M 175 245 C 195 245, 215 265, 205 285 C 190 295, 170 285, 160 270 C 158 255, 165 245, 175 245 Z" fill="#2563EB" opacity="0.85" />
    <path d="M 175 245 C 190 245, 205 260, 195 278 C 185 285, 170 278, 165 265 Z" fill="#60A5FA" />
  </g>

  <!-- Whale Eye (Cute Kawaii with shine) -->
  <ellipse cx="145" cy="195" rx="7" ry="11" fill="#1E293B" />
  <circle cx="147" cy="192" r="3.5" fill="#FFFFFF" />
  <circle cx="143" cy="201" r="1.5" fill="#FFFFFF" />

  <!-- Whale Sweet Smile -->
  <path d="M 105 220 Q 120 232 135 224" stroke="#1E3A8A" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.7" />

  <!-- Whale Rosy Pink Cheek -->
  <ellipse cx="120" cy="225" rx="10" ry="6" fill="#F43F5E" opacity="0.35" />

  <!-- Water Spout Stream & Splash Droplets on Top -->
  <g>
    <!-- Center Main Spout Stem -->
    <path d="M 175 140 C 172 110, 160 85, 140 70 C 155 70, 175 85, 180 110 C 185 85, 205 70, 220 70 C 200 85, 188 110, 185 140 Z" fill="url(#spoutWater)" />
    <!-- Left Droplet Fountain -->
    <path d="M 140 70 C 120 70, 105 85, 100 105 C 110 100, 125 90, 138 80 Z" fill="#38BDF8" />
    <!-- Right Droplet Fountain -->
    <path d="M 220 70 C 240 70, 255 85, 260 105 C 250 100, 235 90, 222 80 Z" fill="#38BDF8" />

    <!-- Cute Droplets Airborne -->
    <circle cx="130" cy="55" r="9" fill="#38BDF8" />
    <circle cx="133" cy="52" r="3" fill="#FFFFFF" />

    <circle cx="180" cy="45" r="12" fill="#38BDF8" />
    <circle cx="184" cy="41" r="4" fill="#FFFFFF" />

    <circle cx="230" cy="55" r="9" fill="#38BDF8" />
    <circle cx="233" cy="52" r="3" fill="#FFFFFF" />

    <circle cx="100" cy="75" r="6" fill="#7DD3FC" />
    <circle cx="260" cy="75" r="6" fill="#7DD3FC" />
    <circle cx="205" cy="35" r="5" fill="#BAE6FD" />
  </g>
</svg>
`);

// 2. Cute Baby Bunny in Carrot Garden
export const SVG_BUNNY = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bunnyBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF3C7" />
      <stop offset="50%" stop-color="#DCFCE7" />
      <stop offset="100%" stop-color="#FFEDD5" />
    </linearGradient>
    <linearGradient id="bunnyWhite" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
    <linearGradient id="carrotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FB923C" />
      <stop offset="100%" stop-color="#EA580C" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" rx="36" fill="url(#bunnyBg)" />

  <!-- Soft Hills -->
  <path d="M 0 320 Q 200 270 400 320 L 400 400 L 0 400 Z" fill="#86EFAC" opacity="0.6" />

  <!-- Bunny Ears -->
  <g>
    <!-- Left Ear -->
    <ellipse cx="140" cy="110" rx="22" ry="75" transform="rotate(-15 140 110)" fill="url(#bunnyWhite)" />
    <ellipse cx="140" cy="110" rx="12" ry="55" transform="rotate(-15 140 110)" fill="#FBCFE8" />

    <!-- Right Ear -->
    <ellipse cx="260" cy="110" rx="22" ry="75" transform="rotate(15 260 110)" fill="url(#bunnyWhite)" />
    <ellipse cx="260" cy="110" rx="12" ry="55" transform="rotate(15 260 110)" fill="#FBCFE8" />
  </g>

  <!-- Bunny Chubby Body -->
  <ellipse cx="200" cy="270" rx="95" ry="90" fill="url(#bunnyWhite)" />

  <!-- Bunny Head -->
  <circle cx="200" cy="190" r="75" fill="url(#bunnyWhite)" />

  <!-- Big Carrot Held -->
  <g transform="rotate(25 210 260)">
    <!-- Carrot leaves -->
    <path d="M 195 210 C 185 190, 175 180, 160 185 C 180 195, 190 205, 195 210 Z" fill="#22C55E" />
    <path d="M 200 210 C 200 185, 205 175, 215 175 C 210 190, 205 205, 200 210 Z" fill="#16A34A" />
    <path d="M 205 210 C 220 190, 230 185, 240 190 C 225 200, 215 205, 205 210 Z" fill="#22C55E" />
    <!-- Carrot Cone -->
    <path d="M 180 220 C 225 220, 230 230, 215 310 C 205 330, 195 330, 185 310 C 170 230, 175 220, 180 220 Z" fill="url(#carrotGrad)" />
    <!-- Carrot ridges -->
    <line x1="188" y1="245" x2="212" y2="245" stroke="#C2410C" stroke-width="3" stroke-linecap="round" />
    <line x1="192" y1="275" x2="208" y2="275" stroke="#C2410C" stroke-width="3" stroke-linecap="round" />
  </g>

  <!-- Bunny Eyes -->
  <ellipse cx="170" cy="180" rx="8" ry="12" fill="#1E293B" />
  <circle cx="172" cy="177" r="4" fill="#FFFFFF" />
  <ellipse cx="230" cy="180" rx="8" ry="12" fill="#1E293B" />
  <circle cx="232" cy="177" r="4" fill="#FFFFFF" />

  <!-- Bunny Nose & Mouth -->
  <polygon points="195,198 205,198 200,205" fill="#F43F5E" />
  <path d="M 193 205 Q 200 212 200 215 Q 200 212 207 205" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round" />

  <!-- Rosy Cheeks -->
  <circle cx="150" cy="200" r="12" fill="#F43F5E" opacity="0.3" />
  <circle cx="250" cy="200" r="12" fill="#F43F5E" opacity="0.3" />

  <!-- Paws holding carrot -->
  <ellipse cx="160" cy="255" rx="16" ry="12" fill="url(#bunnyWhite)" />
  <ellipse cx="240" cy="255" rx="16" ry="12" fill="url(#bunnyWhite)" />

  <!-- Flowers in Meadow -->
  <circle cx="60" cy="340" r="8" fill="#F43F5E" />
  <circle cx="60" cy="340" r="4" fill="#FDE047" />
  <circle cx="340" cy="330" r="8" fill="#A855F7" />
  <circle cx="340" cy="330" r="4" fill="#FDE047" />
</svg>
`);

// 3. Cute Friendly Baby Lion in Sunny Savanna
export const SVG_LION = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="lionBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="60%" stop-color="#FED7AA" />
      <stop offset="100%" stop-color="#FDBA74" />
    </linearGradient>
    <linearGradient id="lionMane" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FB923C" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="lionFace" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="100%" stop-color="#FACC15" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" rx="36" fill="url(#lionBg)" />

  <!-- Golden Sun -->
  <circle cx="320" cy="80" r="35" fill="#FBBF24" opacity="0.6" />

  <!-- Lion Big Fluffy Mane (Sun petal shape) -->
  <g transform="translate(200, 195)">
    <circle cx="0" cy="0" r="115" fill="url(#lionMane)" />
    <!-- Mane Flower Petals -->
    <circle cx="0" cy="-115" r="28" fill="#EA580C" />
    <circle cx="81" cy="-81" r="28" fill="#EA580C" />
    <circle cx="115" cy="0" r="28" fill="#EA580C" />
    <circle cx="81" cy="81" r="28" fill="#EA580C" />
    <circle cx="0" cy="115" r="28" fill="#EA580C" />
    <circle cx="-81" cy="81" r="28" fill="#EA580C" />
    <circle cx="-115" cy="0" r="28" fill="#EA580C" />
    <circle cx="-81" cy="-81" r="28" fill="#EA580C" />
  </g>

  <!-- Lion Body -->
  <path d="M 130 270 Q 200 240 270 270 L 290 360 L 110 360 Z" fill="url(#lionFace)" />
  <ellipse cx="200" cy="325" rx="45" ry="35" fill="#FEF08A" />

  <!-- Lion Ears -->
  <circle cx="130" cy="120" r="25" fill="#F59E0B" />
  <circle cx="130" cy="120" r="14" fill="#FEF08A" />
  <circle cx="270" cy="120" r="25" fill="#F59E0B" />
  <circle cx="270" cy="120" r="14" fill="#FEF08A" />

  <!-- Lion Round Face -->
  <circle cx="200" cy="195" r="75" fill="url(#lionFace)" />

  <!-- Eyes -->
  <ellipse cx="170" cy="180" rx="9" ry="13" fill="#1E293B" />
  <circle cx="173" cy="176" r="4" fill="#FFFFFF" />
  <ellipse cx="230" cy="180" rx="9" ry="13" fill="#1E293B" />
  <circle cx="233" cy="176" r="4" fill="#FFFFFF" />

  <!-- Nose & Whiskers -->
  <polygon points="190,205 210,205 200,215" fill="#78350F" />
  <path d="M 190 218 Q 200 225 200 230 Q 200 225 210 218" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round" />

  <!-- Whiskers -->
  <line x1="145" y1="210" x2="120" y2="205" stroke="#92400E" stroke-width="2.5" stroke-linecap="round" />
  <line x1="145" y1="220" x2="120" y2="225" stroke="#92400E" stroke-width="2.5" stroke-linecap="round" />
  <line x1="255" y1="210" x2="280" y2="205" stroke="#92400E" stroke-width="2.5" stroke-linecap="round" />
  <line x1="255" y1="220" x2="280" y2="225" stroke="#92400E" stroke-width="2.5" stroke-linecap="round" />

  <!-- Rosy Cheeks -->
  <circle cx="150" cy="205" r="12" fill="#F43F5E" opacity="0.35" />
  <circle cx="250" cy="205" r="12" fill="#F43F5E" opacity="0.35" />
</svg>
`);

// 4. Cute Space Rocket flying among stars and moon
export const SVG_ROCKET = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="spaceBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E1B4B" />
      <stop offset="60%" stop-color="#312E81" />
      <stop offset="100%" stop-color="#4C1D95" />
    </linearGradient>
    <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="70%" stop-color="#E2E8F0" />
      <stop offset="100%" stop-color="#CBD5E1" />
    </linearGradient>
    <linearGradient id="rocketFire" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FACC15" />
      <stop offset="60%" stop-color="#F97316" />
      <stop offset="100%" stop-color="#EF4444" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" rx="36" fill="url(#spaceBg)" />

  <!-- Golden Moon with craters -->
  <circle cx="320" cy="90" r="40" fill="#FDE047" />
  <circle cx="305" cy="80" r="8" fill="#FACC15" />
  <circle cx="330" cy="110" r="10" fill="#FACC15" />

  <!-- Stars -->
  <polygon points="80,70 85,82 98,82 87,90 91,102 80,94 69,102 73,90 62,82 75,82" fill="#FDE047" />
  <polygon points="320,290 323,298 332,298 325,304 327,312 320,307 313,312 315,304 308,298 317,298" fill="#FDE047" />
  <circle cx="120" cy="160" r="4" fill="#FFFFFF" opacity="0.8" />
  <circle cx="270" cy="190" r="3" fill="#FFFFFF" opacity="0.8" />
  <circle cx="70" cy="280" r="5" fill="#38BDF8" opacity="0.8" />

  <!-- Cute Saturn Planet -->
  <ellipse cx="90" cy="330" rx="28" ry="10" transform="rotate(-20 90 330)" fill="#F472B6" opacity="0.5" />
  <circle cx="90" cy="330" r="18" fill="#FB7185" />

  <!-- Rocket Group angled towards top-right -->
  <g transform="translate(190, 190) rotate(35)">
    <!-- Rocket Thruster Fire -->
    <path d="M -20 90 Q 0 160 0 170 Q 0 160 20 90 Z" fill="url(#rocketFire)" />
    <path d="M -10 90 Q 0 135 0 140 Q 0 135 10 90 Z" fill="#FEF08A" />

    <!-- Rocket Wings -->
    <path d="M -30 40 L -70 95 L -30 85 Z" fill="#EF4444" />
    <path d="M 30 40 L 70 95 L 30 85 Z" fill="#EF4444" />

    <!-- Rocket Body -->
    <path d="M 0 -100 C 45 -50, 40 40, 35 90 L -35 90 C -40 40, -45 -50, 0 -100 Z" fill="url(#rocketBody)" />

    <!-- Rocket Red Nose Cone -->
    <path d="M 0 -100 C 25 -70, 28 -50, 26 -40 L -26 -40 C -28 -50, -25 -70, 0 -100 Z" fill="#EF4444" />

    <!-- Round Porthole Window -->
    <circle cx="0" cy="0" r="24" fill="#0284C7" />
    <circle cx="0" cy="0" r="19" fill="#38BDF8" />
    <!-- Window Glint -->
    <ellipse cx="-5" cy="-5" rx="10" ry="6" transform="rotate(-30 -5 -5)" fill="#FFFFFF" opacity="0.7" />

    <!-- Smiling cute astronaut/alien waving in window -->
    <circle cx="0" cy="3" r="11" fill="#FEF08A" />
    <circle cx="-3" cy="2" r="1.5" fill="#1E293B" />
    <circle cx="3" cy="2" r="1.5" fill="#1E293B" />
    <path d="M -3 7 Q 0 9 3 7" stroke="#1E293B" stroke-width="1" fill="none" />
  </g>
</svg>
`);

// 5. Cute Baby Dinosaur with Palm & Baby Volcano
export const SVG_DINO = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="dinoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E0F2FE" />
      <stop offset="60%" stop-color="#DCFCE7" />
      <stop offset="100%" stop-color="#FEF9C3" />
    </linearGradient>
    <linearGradient id="dinoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ADE80" />
      <stop offset="100%" stop-color="#16A34A" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" rx="36" fill="url(#dinoBg)" />

  <!-- Distant Volcano -->
  <polygon points="30,280 80,180 130,280" fill="#94A3B8" />
  <ellipse cx="80" cy="180" rx="12" ry="4" fill="#F87171" />
  <!-- Smoke puff -->
  <circle cx="85" cy="155" r="10" fill="#CBD5E1" opacity="0.7" />
  <circle cx="95" cy="135" r="14" fill="#CBD5E1" opacity="0.6" />

  <!-- Ground -->
  <path d="M 0 310 Q 200 280 400 310 L 400 400 L 0 400 Z" fill="#86EFAC" />

  <!-- Dino Long Neck & Body -->
  <g>
    <!-- Tail (curves left) -->
    <path d="M 120 280 C 80 285, 40 260, 30 220 C 50 250, 90 260, 130 260 Z" fill="url(#dinoGreen)" />

    <!-- Chubby Body -->
    <ellipse cx="200" cy="270" rx="80" ry="55" fill="url(#dinoGreen)" />

    <!-- Belly -->
    <ellipse cx="205" cy="285" rx="55" ry="35" fill="#FEF08A" />

    <!-- Back Spine Plates -->
    <polygon points="150,225 160,205 170,225" fill="#F59E0B" />
    <polygon points="180,220 190,195 200,220" fill="#F59E0B" />
    <polygon points="210,220 220,195 230,220" fill="#F59E0B" />

    <!-- Legs -->
    <rect x="140" y="295" width="28" height="45" rx="12" fill="#15803D" />
    <rect x="220" y="295" width="28" height="45" rx="12" fill="#15803D" />

    <!-- Long Curving Neck & Head -->
    <path d="M 235 270 C 270 240, 275 160, 260 110 C 275 105, 310 110, 320 135 C 315 165, 290 240, 270 275 Z" fill="url(#dinoGreen)" />
    <!-- Head -->
    <ellipse cx="290" cy="115" rx="35" ry="25" fill="url(#dinoGreen)" />

    <!-- Eye -->
    <circle cx="295" cy="108" r="7" fill="#1E293B" />
    <circle cx="297" cy="106" r="2.5" fill="#FFFFFF" />

    <!-- Smile -->
    <path d="M 305 125 Q 315 130 325 122" stroke="#14532D" stroke-width="2.5" stroke-linecap="round" fill="none" />

    <!-- Rosy Cheek -->
    <circle cx="280" cy="122" r="8" fill="#F43F5E" opacity="0.4" />
  </g>
</svg>
`);

// 6. Cute Yellow School Bus under a Rainbow
export const SVG_SCHOOL_BUS = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="busBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E0F2FE" />
      <stop offset="60%" stop-color="#BAE6FD" />
      <stop offset="100%" stop-color="#FEF08A" />
    </linearGradient>
    <linearGradient id="busYellow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="100%" stop-color="#EAB308" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" rx="36" fill="url(#busBg)" />

  <!-- Rainbow Arc in Sky -->
  <g opacity="0.6">
    <circle cx="200" cy="300" r="190" stroke="#F87171" stroke-width="10" fill="none" />
    <circle cx="200" cy="300" r="180" stroke="#FB923C" stroke-width="10" fill="none" />
    <circle cx="200" cy="300" r="170" stroke="#FDE047" stroke-width="10" fill="none" />
    <circle cx="200" cy="300" r="160" stroke="#4ADE80" stroke-width="10" fill="none" />
    <circle cx="200" cy="300" r="150" stroke="#38BDF8" stroke-width="10" fill="none" />
  </g>

  <!-- Green Road Hill -->
  <path d="M 0 310 Q 200 270 400 310 L 400 400 L 0 400 Z" fill="#4ADE80" />
  <rect x="0" y="340" width="400" height="60" fill="#64748B" />
  <line x1="20" y1="370" x2="80" y2="370" stroke="#FEF08A" stroke-width="6" stroke-linecap="round" />
  <line x1="160" y1="370" x2="220" y2="370" stroke="#FEF08A" stroke-width="6" stroke-linecap="round" />
  <line x1="300" y1="370" x2="360" y2="370" stroke="#FEF08A" stroke-width="6" stroke-linecap="round" />

  <!-- Yellow School Bus -->
  <g transform="translate(60, 180)">
    <!-- Bus Main Box Body -->
    <rect x="0" y="0" width="280" height="120" rx="24" fill="url(#busYellow)" />
    <!-- Front engine bump -->
    <path d="M 240 40 L 275 55 C 285 65, 285 100, 275 110 L 240 110 Z" fill="url(#busYellow)" />

    <!-- Black Side Stripe -->
    <rect x="0" y="80" width="275" height="12" fill="#1E293B" />

    <!-- Windows with sky reflections -->
    <rect x="25" y="20" width="40" height="45" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" />
    <rect x="80" y="20" width="40" height="45" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" />
    <rect x="135" y="20" width="40" height="45" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" />
    <rect x="190" y="20" width="45" height="45" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" />

    <!-- Front Windshield -->
    <path d="M 240 20 L 265 45 L 240 45 Z" fill="#E0F2FE" />

    <!-- Bus Smile & Headlights -->
    <circle cx="275" cy="85" r="10" fill="#FEF08A" stroke="#CA8A04" stroke-width="2" />
    <path d="M 255 105 Q 265 112 275 105" stroke="#713F12" stroke-width="3" stroke-linecap="round" fill="none" />

    <!-- Wheels -->
    <g transform="translate(55, 120)">
      <circle cx="0" cy="0" r="26" fill="#1E293B" />
      <circle cx="0" cy="0" r="14" fill="#94A3B8" />
      <circle cx="0" cy="0" r="6" fill="#1E293B" />
    </g>
    <g transform="translate(210, 120)">
      <circle cx="0" cy="0" r="26" fill="#1E293B" />
      <circle cx="0" cy="0" r="14" fill="#94A3B8" />
      <circle cx="0" cy="0" r="6" fill="#1E293B" />
    </g>
  </g>
</svg>
`);

// Puzzle themes list for the jigsaw game
export interface JigsawArtTheme {
  id: string;
  name: string;
  emoji: string;
  category: string;
  imageUrl: string;
  recommendedGrade: 'K1' | 'K2' | 'K3' | 'all';
  defaultGrid: { cols: number; rows: number };
}

export const JIGSAW_ART_THEMES: JigsawArtTheme[] = [
  {
    id: 'theme-whale',
    name: 'น้องวาฬสีฟ้าพ่นน้ำ',
    emoji: '🐳',
    category: 'สัตว์น้ำแสนน่ารัก',
    imageUrl: SVG_WHALE,
    recommendedGrade: 'all',
    defaultGrid: { cols: 3, rows: 3 }, // 3x3 exact match to user screenshot!
  },
  {
    id: 'theme-bunny',
    name: 'กระต่ายน้อยกับแครอท',
    emoji: '🐰',
    category: 'ฟาร์มและสวนดอกไม้',
    imageUrl: SVG_BUNNY,
    recommendedGrade: 'K1',
    defaultGrid: { cols: 2, rows: 2 },
  },
  {
    id: 'theme-lion',
    name: 'ลูกสิงโตเจ้าป่าใจดี',
    emoji: '🦁',
    category: 'สัตว์ป่าซาฟารี',
    imageUrl: SVG_LION,
    recommendedGrade: 'K2',
    defaultGrid: { cols: 3, rows: 3 },
  },
  {
    id: 'theme-rocket',
    name: 'ยานอวกาศสู่ดวงดาว',
    emoji: '🚀',
    category: 'อวกาศและวิทยาศาสตร์',
    imageUrl: SVG_ROCKET,
    recommendedGrade: 'K3',
    defaultGrid: { cols: 3, rows: 3 },
  },
  {
    id: 'theme-dino',
    name: 'ไดโนเสาร์น้อยคอยาว',
    emoji: '🦕',
    category: 'โลกล้านปี',
    imageUrl: SVG_DINO,
    recommendedGrade: 'K2',
    defaultGrid: { cols: 3, rows: 3 },
  },
  {
    id: 'theme-bus',
    name: 'รถโรงเรียนสีเหลืองสดใส',
    emoji: '🚌',
    category: 'ยานพาหนะและการเดินทาง',
    imageUrl: SVG_SCHOOL_BUS,
    recommendedGrade: 'all',
    defaultGrid: { cols: 3, rows: 3 },
  },
  ...EXTRA_JIGSAW_THEMES,
];
