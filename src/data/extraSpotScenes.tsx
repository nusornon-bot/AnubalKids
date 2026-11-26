import React from 'react';
import { SceneProps } from './spotScenesSvg';

export const ExtraSpotSceneRenderer: React.FC<{
  levelId: string;
  variant: 'left' | 'right';
  foundDifferenceIds: string[];
  activeDifferenceIds?: string[];
}> = ({ levelId, variant, foundDifferenceIds, activeDifferenceIds }) => {
  const isLeft = variant === 'left';
  const isAltered = (id: string) => !isLeft && (!activeDifferenceIds || activeDifferenceIds.includes(id));

  switch (levelId) {
    // ==========================================
    // 11. ตู้ปลาอควาเรียมใต้ทะเลลึก 🐠
    // ==========================================
    case 'spot-ext-11-aquarium':
      return (
        <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="aquaBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="40%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
          </defs>

          {/* Deep Ocean Water Background */}
          <rect width="500" height="500" rx="24" fill="url(#aquaBg)" />

          {/* Ambient Caustic Light Rays from Top */}
          <polygon points="60,0 120,0 200,500 110,500" fill="#ffffff" opacity="0.08" />
          <polygon points="260,0 340,0 440,500 320,500" fill="#ffffff" opacity="0.07" />

          {/* Distant Seaweeds (Candidate 5: kelp branch at 10%, 48%) */}
          {isAltered('diff-kelp-branch') ? (
            <path d="M 40 460 Q 15 380 35 290 Q 20 220 35 160" stroke="#10b981" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.5" />
          ) : (
            <path d="M 40 460 Q 20 340 50 240 Q 20 180 40 120" stroke="#065f46" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.4" />
          )}
          <path d="M 460 460 Q 480 320 450 200 Q 470 140 450 90" stroke="#065f46" strokeWidth="16" strokeLinecap="round" fill="none" opacity="0.4" />

          {/* Sandy Seabed with Dunes */}
          <path d="M 0 410 Q 150 375 300 415 T 500 400 L 500 500 L 0 500 Z" fill="url(#sandGrad)" />
          <ellipse cx="250" cy="470" rx="220" ry="25" fill="#a16207" opacity="0.15" />

          {/* Sea Shells and Pebbles on Sand (Candidate 7: snail at 38%, 88%) */}
          <circle cx="180" cy="445" r="6" fill="#e2e8f0" />
          {isAltered('diff-sand-snail') ? (
            <g transform="translate(195, 442)">
              <circle cx="0" cy="0" r="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
              <path d="M -3 0 Q 0 -4 3 0 Q 0 4 -3 0" fill="#be185d" />
            </g>
          ) : (
            <circle cx="195" cy="450" r="4" fill="#cbd5e1" />
          )}
          <circle cx="320" cy="435" r="5" fill="#fed7aa" />

          {/* Left Rock & Coral Reef Structure */}
          <path d="M 0 500 L 0 350 Q 70 330 110 370 Q 140 420 160 500 Z" fill="#64748b" />
          <path d="M 50 350 Q 70 290 85 270 Q 110 320 95 360" fill="url(#coralGrad)" />
          <path d="M 20 370 Q 10 310 30 280 Q 50 330 35 380" fill="#fb7185" />

          {/* Clownfish Swimming */}
          <g transform="translate(180, 180)">
            <ellipse cx="0" cy="0" rx="26" ry="16" fill="#f97316" />
            <polygon points="-20,0 -34,-12 -34,12" fill="#ea580c" />
            <path d="M -8 -15 Q -4 0 -8 15" stroke="#ffffff" strokeWidth="6" fill="none" />
            <path d="M 6 -13 Q 10 0 6 13" stroke="#ffffff" strokeWidth="6" fill="none" />
            <circle cx="15" cy="-4" r="3.5" fill="#ffffff" />
            <circle cx="16" cy="-4" r="1.8" fill="#0f172a" />
          </g>

          {/* Yellow Tang (Candidate 4: tang stripe at 76%, 44%) */}
          <g transform="translate(380, 220)">
            <ellipse cx="0" cy="0" rx="22" ry="18" fill="#facc15" />
            <polygon points="18,0 30,-10 30,10" fill="#eab308" />
            <circle cx="-10" cy="-3" r="3" fill="#0f172a" />
            {isAltered('diff-tang-stripe') && (
              <g>
                <path d="M -2 -14 L -2 14" stroke="#0284c7" strokeWidth="3" />
                <path d="M 6 -12 L 6 12" stroke="#0284c7" strokeWidth="3" />
              </g>
            )}
          </g>

          {/* Sunken Treasure Chest (Candidate 6: gems at 76%, 87%) */}
          <g transform="translate(380, 435)">
            <rect x="-40" y="-25" width="80" height="50" rx="6" fill="#78350f" stroke="#451a03" strokeWidth="3" />
            <path d="M -40 -25 Q 0 -45 40 -25" fill="#92400e" stroke="#451a03" strokeWidth="3" />
            <rect x="-6" y="-10" width="12" height="16" rx="2" fill="#eab308" stroke="#713f12" strokeWidth="2" />
            {isAltered('diff-treasure-gems') ? (
              <g>
                <circle cx="-16" cy="-28" r="5" fill="#f43f5e" />
                <polygon points="12,-32 16,-24 8,-24" fill="#3b82f6" />
                <polygon points="-4,-35 0,-26 -8,-26" fill="#10b981" />
              </g>
            ) : (
              <g>
                <circle cx="-12" cy="-28" r="4" fill="#facc15" />
                <circle cx="2" cy="-30" r="4" fill="#facc15" />
                <circle cx="14" cy="-27" r="4" fill="#facc15" />
              </g>
            )}
          </g>

          {/* DIFFERENCE 1: Starfish on Rock (25%, 80%) */}
          <g transform="translate(125, 400)">
            {!isAltered('diff-starfish-color') ? (
              <g>
                <polygon points="0,-26 8,-9 26,-9 12,3 17,21 0,11 -17,21 -12,3 -26,-9 -8,-9" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
                <circle cx="0" cy="0" r="5" fill="#ffedd5" />
                <circle cx="-10" cy="-4" r="2" fill="#ffedd5" />
                <circle cx="10" cy="-4" r="2" fill="#ffedd5" />
              </g>
            ) : (
              <g>
                <polygon points="0,-26 8,-9 26,-9 12,3 17,21 0,11 -17,21 -12,3 -26,-9 -8,-9" fill="#ec4899" stroke="#be185d" strokeWidth="2" />
                <circle cx="-5" cy="-2" r="2.5" fill="#831843" />
                <circle cx="5" cy="-2" r="2.5" fill="#831843" />
                <path d="M -4 4 Q 0 8 4 4" stroke="#831843" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            )}
          </g>

          {/* DIFFERENCE 2: Clam Shell Pearl (75%, 72%) */}
          <g transform="translate(375, 360)">
            {!isAltered('diff-clam-pearl') ? (
              <g>
                <path d="M -28 10 Q 0 -22 28 10 Q 0 25 -28 10 Z" fill="#f472b6" stroke="#9d174d" strokeWidth="2" />
                <path d="M -24 6 Q 0 -30 24 6" fill="#fbcfe8" opacity="0.7" />
                <circle cx="0" cy="4" r="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
                <circle cx="-3" cy="1" r="3" fill="#ffffff" />
                <polygon points="0,-8 2,-4 6,-4 3,0 4,4 0,2 -4,4 -3,0 -6,-4 -2,-4" fill="#fef08a" opacity="0.8" transform="scale(0.8)" />
              </g>
            ) : (
              <g>
                <path d="M -28 10 Q 0 -22 28 10 Q 0 25 -28 10 Z" fill="#f472b6" stroke="#9d174d" strokeWidth="2" />
                <path d="M -24 6 Q 0 -30 24 6" fill="#fbcfe8" opacity="0.7" />
                <ellipse cx="0" cy="6" rx="12" ry="6" fill="#db2777" opacity="0.4" />
              </g>
            )}
          </g>

          {/* DIFFERENCE 3: Bubbles Count (50%, 25%) */}
          <g transform="translate(250, 125)">
            {!isAltered('diff-bubbles-count') ? (
              <g>
                <circle cx="-25" cy="-15" r="11" fill="#ffffff" opacity="0.4" stroke="#ffffff" strokeWidth="2" />
                <circle cx="0" cy="20" r="15" fill="#ffffff" opacity="0.45" stroke="#ffffff" strokeWidth="2" />
                <circle cx="22" cy="-20" r="9" fill="#ffffff" opacity="0.4" stroke="#ffffff" strokeWidth="1.5" />
              </g>
            ) : (
              <g>
                <circle cx="-25" cy="-15" r="11" fill="#ffffff" opacity="0.4" stroke="#ffffff" strokeWidth="2" />
                <circle cx="0" cy="20" r="15" fill="#ffffff" opacity="0.45" stroke="#ffffff" strokeWidth="2" />
                <circle cx="22" cy="-20" r="9" fill="#ffffff" opacity="0.4" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="-15" cy="45" r="12" fill="#ffffff" opacity="0.4" stroke="#ffffff" strokeWidth="2" />
                <circle cx="28" cy="15" r="8" fill="#ffffff" opacity="0.4" stroke="#ffffff" strokeWidth="1.5" />
              </g>
            )}
          </g>
        </svg>
      );

    // ==========================================
    // 12. ห้องครัวคุณแม่ทำคุกกี้แสนหอม 🍪 (USER IMAGE!)
    // ==========================================
    case 'spot-ext-12-kitchen':
      return (
        <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="kitchenWall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
            <linearGradient id="counterTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <pattern id="subwayTiles" width="50" height="25" patternUnits="userSpaceOnUse">
              <rect width="50" height="25" fill="#fffbeb" />
              <path d="M 0 25 L 50 25 M 50 0 L 50 25" stroke="#fde68a" strokeWidth="1.5" />
            </pattern>
          </defs>

          {/* Wall Tiles Background */}
          <rect width="500" height="500" rx="24" fill="url(#kitchenWall)" />
          <rect width="500" height="280" fill="url(#subwayTiles)" opacity="0.55" />

          {/* Sunlit Kitchen Window (Candidate 5: curtains at 42%, 20%) */}
          <g transform="translate(250, 100)">
            <rect x="-70" y="-65" width="140" height="110" rx="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="8" />
            <line x1="0" y1="-65" x2="0" y2="45" stroke="#ffffff" strokeWidth="4" />
            <line x1="-70" y1="-10" x2="70" y2="-10" stroke="#ffffff" strokeWidth="4" />
            <circle cx="35" cy="-25" r="20" fill="#fef08a" opacity="0.8" />
            <path d="M -70 45 Q -20 15 25 35 Q 50 20 70 45 Z" fill="#86efac" />
            {/* Gingham Curtains (Red vs Yellow) */}
            <path d="M -70 -65 L -35 -65 L -55 20 L -70 20 Z" fill={isAltered('diff-curtain-tie') ? '#facc15' : '#f87171'} opacity="0.9" />
            <path d="M 70 -65 L 35 -65 L 55 20 L 70 20 Z" fill={isAltered('diff-curtain-tie') ? '#facc15' : '#f87171'} opacity="0.9" />
          </g>

          {/* Wooden Kitchen Shelf (Candidate 4: spice jar at 16%, 20%) */}
          <g transform="translate(80, 110)">
            <rect x="-60" y="0" width="120" height="12" rx="4" fill="#92400e" />
            <rect x="-45" y="-26" width="16" height="26" rx="3" fill={isAltered('diff-shelf-spice') ? '#a855f7' : '#f97316'} />
            <rect x="-22" y="-32" width="18" height="32" rx="3" fill="#10b981" />
            <rect x="2" y="-22" width="14" height="22" rx="3" fill="#a855f7" />
            <rect x="22" y="-28" width="18" height="28" rx="3" fill="#eab308" />
          </g>

          {/* Kitchen Countertop */}
          <rect x="0" y="280" width="500" height="220" fill="#f59e0b" opacity="0.2" />
          <rect x="0" y="270" width="500" height="32" rx="4" fill="url(#counterTop)" />
          <rect x="0" y="302" width="500" height="198" rx="4" fill="#fef3c7" />
          <line x1="0" y1="302" x2="500" y2="302" stroke="#78350f" strokeWidth="2" />

          {/* Lower Cupboard Panels (Candidate 6: knob at 40%, 80%) */}
          <rect x="40" y="330" width="180" height="140" rx="10" fill="#ffffff" stroke="#fde68a" strokeWidth="3" />
          <circle cx="200" cy="400" r="7" fill={isAltered('diff-cupboard-knob') ? '#10b981' : '#d97706'} />
          <rect x="280" y="330" width="180" height="140" rx="10" fill="#ffffff" stroke="#fde68a" strokeWidth="3" />
          <circle cx="300" cy="400" r="7" fill={isAltered('diff-cupboard-knob') ? '#10b981' : '#d97706'} />

          {/* Cutting Board & Lemon (Candidate 7: lemon at 18%, 68%) */}
          <rect x="60" y="320" width="140" height="95" rx="8" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
          {!isAltered('diff-cutting-board-lemon') && (
            <g transform="translate(90, 340)">
              <ellipse cx="0" cy="0" rx="12" ry="8" fill="#facc15" stroke="#eab308" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="6" fill="#fef08a" />
            </g>
          )}

          {/* DIFFERENCE 1: Cookie Toppings (30%, 65%) */}
          <g transform="translate(150, 325)">
            <rect x="-38" y="-50" width="76" height="95" rx="14" fill="#e0f2fe" opacity="0.85" stroke="#38bdf8" strokeWidth="3" />
            <ellipse cx="0" cy="-50" rx="28" ry="10" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
            <circle cx="0" cy="-62" r="8" fill="#0284c7" />

            <circle cx="-12" cy="15" r="20" fill="#d97706" stroke="#92400e" strokeWidth="2" />
            <circle cx="14" cy="10" r="20" fill="#d97706" stroke="#92400e" strokeWidth="2" />
            <circle cx="0" cy="-15" r="20" fill="#d97706" stroke="#92400e" strokeWidth="2" />

            {!isAltered('diff-cookie-topping') ? (
              <g>
                <circle cx="-15" cy="-18" r="3.5" fill="#451a03" />
                <circle cx="4" cy="-22" r="3.5" fill="#451a03" />
                <circle cx="-2" cy="-8" r="3" fill="#451a03" />
                <circle cx="-20" cy="10" r="3.5" fill="#451a03" />
                <circle cx="-6" cy="22" r="3.5" fill="#451a03" />
                <circle cx="12" cy="4" r="3.5" fill="#451a03" />
                <circle cx="22" cy="16" r="3.5" fill="#451a03" />
              </g>
            ) : (
              <g>
                <circle cx="-5" cy="-16" r="1.5" fill="#fef3c7" />
                <circle cx="6" cy="-10" r="1.5" fill="#fef3c7" />
                <circle cx="-10" cy="14" r="1.5" fill="#fef3c7" />
                <circle cx="14" cy="16" r="1.5" fill="#fef3c7" />
              </g>
            )}
            <path d="M -28 -35 L -28 35" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
          </g>

          {/* DIFFERENCE 2: Teapot Steam (70%, 30%) */}
          <g transform="translate(350, 235)">
            <ellipse cx="0" cy="35" rx="45" ry="12" fill="#475569" opacity="0.5" />
            <ellipse cx="0" cy="10" rx="46" ry="36" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
            <path d="M -28 -20 Q 0 -35 28 -20" fill="#1e40af" />
            <circle cx="0" cy="-30" r="7" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <path d="M 35 15 Q 60 5 65 -15 L 55 -15 Q 48 5 28 2" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            <path d="M -35 10 Q -65 -5 -40 -25 Q -25 -32 -10 -24" stroke="#1e3a8a" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M -8 10 A 5 5 0 0 1 0 7 A 5 5 0 0 1 8 10 Q 0 18 -8 10 Z" fill="#ffffff" opacity="0.9" />
          </g>

          {/* Steam swirling up from spout */}
          <g transform="translate(408, 205)">
            {!isAltered('diff-teapot-steam') && (
              <g>
                <path d="M 0 0 Q -15 -35 5 -60 Q -12 -85 0 -115" stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.75" />
                <path d="M 8 -15 Q -5 -45 10 -75" stroke="#cbd5e1" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
                <circle cx="-2" cy="-125" r="4" fill="#94a3b8" opacity="0.5" />
              </g>
            )}
          </g>

          {/* DIFFERENCE 3: Apple Tray Color (50%, 75%) */}
          <g transform="translate(250, 375)">
            <ellipse cx="0" cy="22" rx="65" ry="16" fill="#94a3b8" opacity="0.35" />
            <ellipse cx="0" cy="16" rx="60" ry="14" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2.5" />
            <ellipse cx="-24" cy="6" rx="16" ry="16" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
            <path d="M 12 10 Q 28 4 38 12 Q 28 18 12 10 Z" fill="#facc15" stroke="#eab308" strokeWidth="1.5" />

            {!isAltered('diff-apple-tray') ? (
              <g>
                <circle cx="0" cy="0" r="18" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
                <circle cx="-4" cy="-4" r="4" fill="#fca5a5" opacity="0.8" />
                <path d="M 0 -18 Q 4 -26 10 -22" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 2 -22 Q 12 -28 8 -18 Z" fill="#22c55e" />
              </g>
            ) : (
              <g>
                <circle cx="0" cy="0" r="18" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                <circle cx="-4" cy="-4" r="4" fill="#86efac" opacity="0.8" />
                <path d="M 0 -18 Q 4 -26 10 -22" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 2 -22 Q 12 -28 8 -18 Z" fill="#15803d" />
              </g>
            )}
          </g>
        </svg>
      );

    // ==========================================
    // 13. สนามเด็กเล่นชิงช้าและกระดานลื่น 🛝
    // ==========================================
    case 'spot-ext-13-playground':
      return (
        <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="playSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <linearGradient id="grassHill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* Sunny Sky & Clouds (Candidate 6: cloud heart at 85%, 18%) */}
          <rect width="500" height="500" rx="24" fill="url(#playSky)" />
          <ellipse cx="90" cy="80" rx="40" ry="18" fill="#ffffff" opacity="0.85" />
          <ellipse cx="120" cy="75" rx="30" ry="22" fill="#ffffff" opacity="0.9" />
          {isAltered('diff-cloud-heart') ? (
            <path d="M 420 85 A 15 15 0 0 0 405 70 A 15 15 0 0 0 390 85 Q 405 105 420 85 Z" fill="#ffffff" opacity="0.95" transform="scale(1.5) translate(-140, -25)" />
          ) : (
            <ellipse cx="420" cy="90" rx="45" ry="20" fill="#ffffff" opacity="0.85" />
          )}

          {/* Green Hills in Background */}
          <path d="M -20 280 Q 140 210 320 270 Q 430 240 520 290 L 520 500 L -20 500 Z" fill="url(#grassHill)" />
          <path d="M 0 350 Q 200 320 500 360 L 500 500 L 0 500 Z" fill="#16a34a" />

          {/* Sunflower (Candidate 7: sunflower at 15%, 82%) */}
          <g transform="translate(75, 410)">
            <circle cx="0" cy="0" r="10" fill={isAltered('diff-grass-sunflower') ? '#ef4444' : '#eab308'} />
            <circle cx="0" cy="0" r="5" fill="#78350f" />
          </g>

          {/* Playground Wooden Platform & Slide (Candidate 4: slide steps at 18%, 52%) */}
          <g transform="translate(175, 230)">
            <rect x="-45" y="-80" width="12" height="160" rx="3" fill="#b45309" />
            <rect x="35" y="-80" width="12" height="160" rx="3" fill="#b45309" />
            <rect x="-55" y="-20" width="112" height="14" rx="3" fill={isAltered('diff-slide-steps') ? '#10b981' : '#d97706'} />
            <polygon points="0,-120 -60,-80 60,-80" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
            <path d="M 35 -15 Q 120 40 100 110 Q 90 140 40 140" stroke="#0284c7" strokeWidth="34" strokeLinecap="round" fill="none" />
            <path d="M 35 -15 Q 120 40 100 110 Q 90 140 40 140" stroke="#38bdf8" strokeWidth="26" strokeLinecap="round" fill="none" />
          </g>

          {/* DIFFERENCE 1: Slide Flag (35%, 20%) */}
          <g transform="translate(175, 100)">
            <line x1="0" y1="0" x2="0" y2="-35" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            {!isAltered('diff-slide-flag') ? (
              <polygon points="0,-35 42,-22 0,-9" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
            ) : (
              <polygon points="0,-35 42,-22 0,-9" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
            )}
          </g>

          {/* Sandpit & Sandcastle (Candidate 5: sand castle star at 62%, 78%) */}
          <ellipse cx="360" cy="420" rx="115" ry="48" fill="#ca8a04" opacity="0.3" />
          <ellipse cx="360" cy="415" rx="110" ry="44" fill="#fef08a" stroke="#d97706" strokeWidth="4" />
          <g transform="translate(340, 400)">
            <rect x="-25" y="-20" width="50" height="35" fill="#facc15" />
            <polygon points="-25,-20 0,-40 25,-20" fill="#eab308" />
            {isAltered('diff-sand-castle-star') ? (
              <circle cx="0" cy="-48" r="6" fill="#ec4899" />
            ) : (
              <circle cx="0" cy="-10" r="5" fill="#ca8a04" opacity="0.5" />
            )}
          </g>

          {/* DIFFERENCE 2: Sand Bucket (80%, 80%) */}
          <g transform="translate(400, 400)">
            {!isAltered('diff-sand-bucket') ? (
              <g>
                <polygon points="-20,-16 20,-16 14,20 -14,20" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
                <path d="M -18 -16 Q 0 -35 18 -16" stroke="#ca8a04" strokeWidth="3" fill="none" />
                <rect x="5" y="-28" width="6" height="36" rx="2" fill="#eab308" transform="rotate(25, 5, -28)" />
              </g>
            ) : (
              <g>
                <polygon points="-20,-16 20,-16 14,20 -14,20" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                <path d="M -18 -16 Q 0 -35 18 -16" stroke="#94a3b8" strokeWidth="3" fill="none" />
                <rect x="5" y="-28" width="6" height="36" rx="2" fill="#f59e0b" transform="rotate(25, 5, -28)" />
              </g>
            )}
          </g>

          {/* DIFFERENCE 3: Sky Kite / Birds (65%, 15%) */}
          <g transform="translate(325, 75)">
            {!isAltered('diff-kite-sky') ? (
              <g>
                <polygon points="0,-26 22,0 0,26 -22,0" fill="#a855f7" stroke="#6b21a8" strokeWidth="2" />
                <polygon points="0,-26 22,0 0,0" fill="#ec4899" />
                <polygon points="-22,0 0,26 0,0" fill="#3b82f6" />
                <path d="M 0 26 Q 15 45 0 65 Q 20 85 5 105" stroke="#64748b" strokeWidth="2" fill="none" />
                <polygon points="12,45 20,40 18,50" fill="#f59e0b" />
                <polygon points="-2,65 6,60 4,70" fill="#ef4444" />
              </g>
            ) : (
              <g>
                <path d="M -22 -5 Q -10 -22 0 -5 Q 10 -22 22 -5" stroke="#1e293b" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 10 20 Q 20 5 30 20 Q 40 5 50 20" stroke="#1e293b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </g>
            )}
          </g>
        </svg>
      );

    // ==========================================
    // 14. ปิคนิคใต้ร่มไม้ในสวนสาธารณะ 🧺
    // ==========================================
    case 'spot-ext-14-picnic':
      return (
        <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="picnicSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#bbf7d0" />
            </linearGradient>
            <pattern id="gingham" width="28" height="28" patternUnits="userSpaceOnUse">
              <rect width="28" height="28" fill="#ffffff" />
              <rect width="14" height="28" fill="#f87171" opacity="0.5" />
              <rect width="28" height="14" fill="#f87171" opacity="0.5" />
            </pattern>
          </defs>

          {/* Sky & Tree Canopy (Candidate 6: tree red apple at 82%, 15%) */}
          <rect width="500" height="500" rx="24" fill="url(#picnicSky)" />
          <path d="M 0 0 Q 250 -40 500 0 L 500 120 Q 250 80 0 120 Z" fill="#15803d" />
          {isAltered('diff-tree-red-apple') ? (
            <circle cx="410" cy="75" r="8" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
          ) : null}

          {/* Park Lawn */}
          <rect x="0" y="240" width="500" height="260" fill="#22c55e" />

          {/* Picnic Gingham Blanket */}
          <g transform="translate(250, 360)">
            <ellipse cx="0" cy="30" rx="210" ry="85" fill="#166534" opacity="0.3" />
            <ellipse cx="0" cy="20" rx="200" ry="80" fill="url(#gingham)" stroke="#ef4444" strokeWidth="4" />
          </g>

          {/* Ladybug on Blanket (Candidate 7: at 30%, 86%) */}
          {isAltered('diff-ladybug-blanket') ? (
            <g transform="translate(150, 430)">
              <circle cx="0" cy="0" r="5" fill="#facc15" />
              <circle cx="0" cy="0" r="1.5" fill="#000000" />
            </g>
          ) : (
            <g transform="translate(150, 430)">
              <circle cx="0" cy="0" r="5" fill="#ef4444" />
              <circle cx="0" cy="0" r="1.5" fill="#000000" />
            </g>
          )}

          {/* Sandwich & Cheese (Candidate 4: at 42%, 72%) */}
          <g transform="translate(210, 360)">
            <polygon points="-30,10 0,-20 30,10" fill="#fed7aa" stroke="#ca8a04" strokeWidth="2" />
            {isAltered('diff-sandwich-cheese') ? (
              <polygon points="-10,2 15,-10 5,14" fill="#facc15" />
            ) : null}
          </g>

          {/* Wicker Picnic Basket (Candidate 5: basket napkin at 82%, 48%) */}
          <g transform="translate(410, 240)">
            <rect x="-35" y="-10" width="70" height="50" rx="8" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
            <path d="M -30 -10 Q 0 -35 30 -10" stroke="#78350f" strokeWidth="4" fill="none" />
            {isAltered('diff-basket-napkin') ? (
              <path d="M -25 -8 Q 0 10 25 -8" fill="#38bdf8" />
            ) : (
              <path d="M -25 -8 Q 0 10 25 -8" fill="#ffffff" />
            )}
          </g>

          {/* DIFFERENCE 1: Butterfly on Wildflower (20%, 35%) */}
          <g transform="translate(100, 175)">
            <circle cx="0" cy="18" r="8" fill="#facc15" />
            {!isAltered('diff-butterfly-wing') ? (
              <g>
                <path d="M 0 0 Q -18 -20 -18 0 Q -18 15 0 0" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                <path d="M 0 0 Q 18 -20 18 0 Q 18 15 0 0" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
              </g>
            ) : (
              <g>
                <path d="M 0 0 Q -18 -20 -18 0 Q -18 15 0 0" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
                <path d="M 0 0 Q 18 -20 18 0 Q 18 15 0 0" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
              </g>
            )}
          </g>

          {/* DIFFERENCE 2: Juice Glass & Straw (55%, 60%) */}
          <g transform="translate(275, 300)">
            <rect x="-16" y="-30" width="32" height="60" rx="6" fill="#fed7aa" opacity="0.85" stroke="#f97316" strokeWidth="2" />
            {!isAltered('diff-drink-straw') && (
              <line x1="0" y1="-30" x2="14" y2="-55" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
            )}
          </g>

          {/* DIFFERENCE 3: Cupcake Topping (78%, 68%) */}
          <g transform="translate(390, 340)">
            <polygon points="-18,15 18,15 14,-8 -14,-8" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
            <ellipse cx="0" cy="-12" rx="18" ry="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
            {!isAltered('diff-cupcake-cherry') ? (
              <circle cx="0" cy="-22" r="6" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
            ) : (
              <polygon points="0,-28 6,-18 -6,-18" fill="#f43f5e" />
            )}
          </g>
        </svg>
      );

    // ==========================================
    // 15. สวนสัตว์ซาฟารีเพื่อนรัก 🦒
    // ==========================================
    case 'spot-ext-15-safari':
      return (
        <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="safariSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>
          </defs>

          {/* Savanna Horizon */}
          <rect width="500" height="500" rx="24" fill="url(#safariSky)" />
          <rect x="0" y="270" width="500" height="230" fill="#eab308" />

          {/* Acacia Silhouettes & Birds (Candidate 4: at 18%, 28%) */}
          <g transform="translate(90, 140)">
            <path d="M 0 130 L 0 50 Q -30 20 -60 10 M 0 50 Q 30 20 60 10" stroke="#713f12" strokeWidth="6" fill="none" />
            <ellipse cx="-60" cy="10" rx="35" ry="12" fill="#854d0e" />
            <ellipse cx="0" cy="20" rx="45" ry="14" fill="#854d0e" />
            <ellipse cx="60" cy="10" rx="35" ry="12" fill="#854d0e" />
            {isAltered('diff-acacia-birds') ? (
              <g transform="translate(0, -30)">
                <path d="M -10 0 Q 0 -8 10 0" stroke="#451a03" strokeWidth="2" fill="none" />
              </g>
            ) : (
              <g transform="translate(0, -30)">
                <path d="M -20 0 Q -10 -8 0 0 M 10 -5 Q 20 -13 30 -5 M -5 10 Q 5 2 15 10" stroke="#451a03" strokeWidth="2" fill="none" />
              </g>
            )}
          </g>

          {/* Waterhole (Candidate 6: lily at 50%, 85%) */}
          <ellipse cx="250" cy="425" rx="120" ry="35" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          {isAltered('diff-waterhole-lily') ? (
            <ellipse cx="250" cy="425" rx="14" ry="8" fill="#16a34a" />
          ) : (
            <circle cx="250" cy="425" r="8" fill="#ec4899" />
          )}

          {/* Jeep Wheel Track (Candidate 7: wheel tracks at 25%, 85%) */}
          {isAltered('diff-safari-jeep-wheel') && (
            <g stroke="#a16207" strokeWidth="4" strokeDasharray="6,4">
              <line x1="80" y1="410" x2="160" y2="440" />
              <line x1="95" y1="418" x2="175" y2="448" />
            </g>
          )}

          {/* Giraffe (Candidate 1: spots at 40%, 45%) */}
          <g transform="translate(200, 225)">
            <rect x="-10" y="-80" width="20" height="150" rx="8" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="0" cy="-90" r="16" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            {!isAltered('diff-giraffe-spot') ? (
              <g fill="#ca8a04">
                <polygon points="0,-40 3,-30 12,-30 5,-24 7,-16 0,-20 -7,-16 -5,-24 -12,-30 -3,-30" transform="scale(0.8)" />
                <polygon points="0,0 3,10 12,10 5,16 7,24 0,20 -7,24 -5,16 -12,10 -3,10" transform="scale(0.8)" />
              </g>
            ) : (
              <g fill="#ca8a04">
                <circle cx="0" cy="-30" r="6" />
                <circle cx="0" cy="10" r="7" />
              </g>
            )}
          </g>

          {/* DIFFERENCE 2: Safari Sun (80%, 15%) */}
          <g transform="translate(400, 75)">
            <circle cx="0" cy="0" r="32" fill="#f97316" stroke="#ea580c" strokeWidth="3" />
            {!isAltered('diff-sun-glasses') ? (
              <g fill="#000000">
                <rect x="-18" y="-6" width="14" height="10" rx="2" />
                <rect x="4" y="-6" width="14" height="10" rx="2" />
                <line x1="-4" y1="-2" x2="4" y2="-2" stroke="#000000" strokeWidth="2" />
              </g>
            ) : (
              <g>
                <circle cx="-10" cy="-4" r="3" fill="#000000" />
                <circle cx="10" cy="-4" r="3" fill="#000000" />
                <path d="M -6 6 Q 0 12 6 6" stroke="#000000" strokeWidth="2" fill="none" />
              </g>
            )}
          </g>

          {/* Zebra & Bird (Candidate 3: bird at 70%, 65% / Candidate 5: tail at 85%, 68%) */}
          <g transform="translate(350, 325)">
            <ellipse cx="0" cy="0" rx="45" ry="26" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <line x1="-20" y1="-20" x2="-20" y2="20" stroke="#000000" strokeWidth="5" />
            <line x1="0" y1="-24" x2="0" y2="24" stroke="#000000" strokeWidth="5" />
            <line x1="20" y1="-20" x2="20" y2="20" stroke="#000000" strokeWidth="5" />

            {!isAltered('diff-zebra-stripes-tail') ? (
              <line x1="45" y1="5" x2="65" y2="20" stroke="#000000" strokeWidth="4" />
            ) : (
              <line x1="45" y1="5" x2="65" y2="20" stroke="#ffffff" strokeWidth="4" />
            )}

            {!isAltered('diff-bird-back') && (
              <g transform="translate(0, -32)">
                <circle cx="0" cy="0" r="6" fill="#ef4444" />
                <polygon points="5,0 12,2 5,4" fill="#facc15" />
              </g>
            )}
          </g>
        </svg>
      );

    // ==========================================
    // 16. สถานีดับเพลิงพร้อมปฏิบัติการ 🚒
    // ==========================================
    case 'spot-ext-16-fire-station':
      return (
        <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Station Interior */}
          <rect width="500" height="500" rx="24" fill="#fee2e2" />
          <rect x="0" y="320" width="500" height="180" fill="#94a3b8" />

          {/* Clock (Candidate 5: at 50%, 12%) */}
          <g transform="translate(250, 60)">
            <circle cx="0" cy="0" r="24" fill="#ffffff" stroke="#dc2626" strokeWidth="3" />
            {isAltered('diff-station-clock-time') ? (
              <g stroke="#000000" strokeWidth="2.5" strokeLinecap="round">
                <line x1="0" y1="0" x2="0" y2="-16" />
                <line x1="0" y1="0" x2="14" y2="0" />
              </g>
            ) : (
              <g stroke="#000000" strokeWidth="2.5" strokeLinecap="round">
                <line x1="0" y1="0" x2="0" y2="-16" />
                <line x1="0" y1="0" x2="0" y2="10" />
              </g>
            )}
          </g>

          {/* Fire Pole (Candidate 4: at 88%, 35%) */}
          <line x1="440" y1="0" x2="440" y2="500" stroke={isAltered('diff-fire-pole-brass') ? '#cbd5e1' : '#eab308'} strokeWidth="8" />

          {/* Boots (Candidate 7: at 12%, 78%) */}
          <g transform="translate(60, 390)">
            <rect x="0" y="0" width="22" height="34" rx="4" fill={isAltered('diff-fire-boots') ? '#1e293b' : '#facc15'} />
          </g>

          {/* Fire Truck Body */}
          <g transform="translate(250, 240)">
            <rect x="-140" y="-40" width="280" height="110" rx="14" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
            <rect x="60" y="-30" width="60" height="40" rx="6" fill="#bae6fd" />
            <circle cx="-80" cy="70" r="24" fill="#1e293b" stroke="#64748b" strokeWidth="6" />
            <circle cx="80" cy="70" r="24" fill="#1e293b" stroke="#64748b" strokeWidth="6" />
          </g>

          {/* Siren Light (Candidate 1: at 50%, 30%) */}
          <g transform="translate(250, 150)">
            <polygon points="-15,0 15,0 10,-24 -10,-24" fill={!isAltered('diff-siren-light') ? '#ef4444' : '#3b82f6'} />
          </g>

          {/* Rescue Ladder (Candidate 3: rungs at 20%, 40%) */}
          <g transform="translate(100, 200)">
            <line x1="0" y1="0" x2="60" y2="-40" stroke="#e2e8f0" strokeWidth="4" />
            <line x1="0" y1="18" x2="60" y2="-22" stroke="#e2e8f0" strokeWidth="4" />
            {!isAltered('diff-ladder-rung') ? (
              <g stroke="#e2e8f0" strokeWidth="3">
                <line x1="10" y1="-4" x2="10" y2="14" />
                <line x1="22" y1="-12" x2="22" y2="6" />
                <line x1="34" y1="-20" x2="34" y2="-2" />
                <line x1="46" y1="-28" x2="46" y2="-10" />
                <line x1="56" y1="-36" x2="56" y2="-18" />
              </g>
            ) : (
              <g stroke="#e2e8f0" strokeWidth="3">
                <line x1="15" y1="-7" x2="15" y2="11" />
                <line x1="30" y1="-17" x2="30" y2="1" />
                <line x1="45" y1="-27" x2="45" y2="-9" />
              </g>
            )}
          </g>

          {/* Hose Nozzle (Candidate 6: at 65%, 68%) */}
          <circle cx="325" cy="340" r="14" fill="#64748b" />
          <line x1="325" y1="340" x2="345" y2="340" stroke={isAltered('diff-hose-reel-nozzle') ? '#1e293b' : '#eab308'} strokeWidth="5" />

          {/* Dalmatian Dog (Candidate 2: collar at 82%, 75%) */}
          <g transform="translate(410, 375)">
            <ellipse cx="0" cy="15" rx="24" ry="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="-14" cy="-5" r="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="-16" cy="-6" r="3" fill="#000000" />
            <circle cx="4" cy="10" r="3" fill="#000000" />
            <circle cx="12" cy="18" r="2.5" fill="#000000" />
            <rect x="-18" y="2" width="12" height="5" rx="1.5" fill={!isAltered('diff-dog-collar') ? '#ef4444' : '#eab308'} />
          </g>
        </svg>
      );

    // ==========================================
    // 17. ท้องฟ้าจำลองดูดาวตอนกลางคืน 🌌
    // ==========================================
    case 'spot-ext-17-planetarium':
      return (
        <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cosmicBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="60%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#31104b" />
            </linearGradient>
          </defs>

          {/* Deep Space Background */}
          <rect width="500" height="500" rx="24" fill="url(#cosmicBg)" />

          {/* Shooting Star Trail (Candidate 4: at 55%, 15%) */}
          {isAltered('diff-shooting-star-trail') ? (
            <line x1="240" y1="60" x2="310" y2="85" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <line x1="240" y1="60" x2="310" y2="85" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          )}

          {/* Ursa Major Constellation (Candidate 6: at 82%, 52%) */}
          <g transform="translate(410, 260)" stroke={isAltered('diff-ursa-major-stars') ? '#facc15' : '#38bdf8'} strokeWidth="1.5" fill="#ffffff">
            <line x1="-30" y1="-20" x2="-10" y2="-10" />
            <line x1="-10" y1="-10" x2="10" y2="-5" />
            <circle cx="-30" cy="-20" r="3" />
            <circle cx="-10" cy="-10" r="3" />
            <circle cx="10" cy="-5" r="3" />
          </g>

          {/* Dome Window (Candidate 5: at 18%, 68%) */}
          <ellipse cx="90" cy="340" rx="40" ry="24" fill={isAltered('diff-dome-aperture') ? '#10b981' : '#9333ea'} opacity="0.6" />

          {/* Orbiting Satellite (Candidate 7: at 38%, 45%) */}
          <g transform="translate(190, 225)">
            <rect x="-8" y="-8" width="16" height="16" fill="#cbd5e1" />
            <line x1="-20" y1="0" x2="20" y2="0" stroke={isAltered('diff-orbit-satellite') ? '#f97316' : '#38bdf8'} strokeWidth="4" />
          </g>

          {/* DIFFERENCE 1: Saturn Rings (25%, 25%) */}
          <g transform="translate(125, 125)">
            <circle cx="0" cy="0" r="24" fill="#fed7aa" />
            <ellipse cx="0" cy="0" rx="42" ry="10" stroke={!isAltered('diff-saturn-rings') ? '#c084fc' : '#facc15'} strokeWidth="5" fill="none" transform="rotate(-20)" />
          </g>

          {/* DIFFERENCE 2: Moon Phase (78%, 20%) */}
          <g transform="translate(390, 100)">
            {!isAltered('diff-moon-phase') ? (
              <path d="M 0 -26 A 26 26 0 0 1 20 18 A 20 20 0 0 0 0 -26" fill="#fef08a" />
            ) : (
              <circle cx="0" cy="0" r="26" fill="#fef08a" />
            )}
          </g>

          {/* DIFFERENCE 3: Telescope Body (50%, 70%) */}
          <g transform="translate(250, 350)">
            <line x1="-35" y1="80" x2="0" y2="0" stroke="#78350f" strokeWidth="6" />
            <line x1="35" y1="80" x2="0" y2="0" stroke="#78350f" strokeWidth="6" />
            <rect x="-18" y="-70" width="36" height="110" rx="8" fill={!isAltered('diff-telescope-focus') ? '#1e3a8a' : '#f8fafc'} stroke="#cbd5e1" strokeWidth="3" transform="rotate(35)" />
          </g>
        </svg>
      );

    // ==========================================
    // 18. ห้องศิลปะวาดภาพระบายสี 🎨
    // ==========================================
    case 'spot-ext-18-art-studio':
      return (
        <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <rect width="500" height="500" rx="24" fill="#fff1f2" />

          {/* Wall Frame (Candidate 4: at 18%, 25%) */}
          <g transform="translate(90, 125)">
            <rect x="-35" y="-25" width="70" height="50" rx="4" fill="#ffffff" stroke="#b45309" strokeWidth="4" />
            {isAltered('diff-gallery-frame-art') ? (
              <polygon points="0,-12 16,10 -16,10" fill="#38bdf8" />
            ) : (
              <circle cx="0" cy="0" r="12" fill="#f97316" />
            )}
          </g>

          {/* Rinse Water Color (Candidate 5: at 42%, 75%) */}
          <g transform="translate(210, 375)">
            <rect x="-14" y="-20" width="28" height="40" rx="6" fill={isAltered('diff-rinse-water-color') ? '#f472b6' : '#38bdf8'} opacity="0.75" />
          </g>

          {/* Apron Pocket (Candidate 6: at 68%, 65%) */}
          <g transform="translate(340, 325)">
            <rect x="-15" y="-15" width="30" height="30" rx="4" fill="#e2e8f0" />
            {isAltered('diff-artist-apron-pocket') ? (
              <rect x="-5" y="-22" width="10" height="14" rx="2" fill="#ec4899" />
            ) : (
              <line x1="0" y1="-26" x2="0" y2="-5" stroke="#1e293b" strokeWidth="3" />
            )}
          </g>

          {/* Paint Tube (Candidate 7: at 85%, 85%) */}
          <g transform="translate(425, 425)">
            <rect x="-12" y="-6" width="24" height="12" rx="2" fill="#cbd5e1" />
            <circle cx="15" cy="0" r="4" fill={isAltered('diff-paint-tube-cap') ? '#facc15' : '#ef4444'} />
          </g>

          {/* Easel Canvas & Flower (Candidate 2: at 55%, 35%) */}
          <g transform="translate(275, 175)">
            <rect x="-50" y="-50" width="100" height="100" rx="6" fill="#ffffff" stroke="#ca8a04" strokeWidth="4" />
            <circle cx="0" cy="0" r="10" fill="#facc15" />
            {!isAltered('diff-canvas-flower') ? (
              <g fill="#ec4899">
                <circle cx="0" cy="-20" r="10" />
                <circle cx="20" cy="0" r="10" />
                <circle cx="0" cy="20" r="10" />
                <circle cx="-20" cy="0" r="10" />
              </g>
            ) : (
              <g fill="#f97316">
                <circle cx="0" cy="-20" r="8" />
                <circle cx="18" cy="-10" r="8" />
                <circle cx="18" cy="10" r="8" />
                <circle cx="0" cy="20" r="8" />
                <circle cx="-18" cy="10" r="8" />
                <circle cx="-18" cy="-10" r="8" />
              </g>
            )}
          </g>

          {/* DIFFERENCE 1: Palette Paint (30%, 65%) */}
          <g transform="translate(150, 325)">
            <ellipse cx="0" cy="0" rx="42" ry="28" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="-20" cy="-8" r="6" fill="#ef4444" />
            <circle cx="0" cy="-14" r="6" fill="#3b82f6" />
            <circle cx="20" cy="-8" r="6" fill={!isAltered('diff-palette-colors') ? '#a855f7' : '#84cc16'} />
          </g>

          {/* DIFFERENCE 3: Brushes in Jar (80%, 70%) */}
          <g transform="translate(400, 350)">
            <rect x="-20" y="0" width="40" height="50" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
            <line x1="-10" y1="0" x2="-20" y2="-30" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            <line x1="0" y1="0" x2="0" y2="-35" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            <line x1="10" y1="0" x2="20" y2="-30" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            {isAltered('diff-brush-holder') && (
              <line x1="-5" y1="0" x2="-8" y2="-40" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
            )}
          </g>
        </svg>
      );

    // ==========================================
    // 19. แปลงผักสวนครัวไฮโดรโปนิกส์ 🥬
    // ==========================================
    case 'spot-ext-19-garden-hydro':
      return (
        <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <rect width="500" height="500" rx="24" fill="#f0fdf4" />

          {/* Roof Vent (Candidate 6: at 50%, 15%) */}
          <g transform="translate(250, 75)">
            <circle cx="0" cy="0" r="20" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
            <line x1="-16" y1="0" x2="16" y2="0" stroke="#334155" strokeWidth="3" />
            <line x1="0" y1="-16" x2="0" y2="16" stroke="#334155" strokeWidth="3" />
            {isAltered('diff-greenhouse-roof-vent') ? null : (
              <line x1="-12" y1="-12" x2="12" y2="12" stroke="#334155" strokeWidth="2" />
            )}
          </g>

          {/* Pressure Gauge (Candidate 5: at 42%, 35%) */}
          <g transform="translate(210, 175)">
            <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
            <line x1="0" y1="0" x2={isAltered('diff-hydro-pressure-gauge') ? '8' : '-8'} y2="-8" stroke="#ef4444" strokeWidth="2" />
          </g>

          {/* Sprout Cup (Candidate 7: at 15%, 48%) */}
          <g transform="translate(75, 240)">
            <rect x="-12" y="-10" width="24" height="20" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill={isAltered('diff-sprout-cup-label') ? '#ec4899' : '#16a34a'} />
          </g>

          {/* Hydro PVC Pipes & Lettuce */}
          <g transform="translate(250, 270)">
            <rect x="-200" y="-20" width="400" height="40" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <circle cx="-120" cy="0" r="22" fill="#22c55e" />
            <circle cx="0" cy="0" r="22" fill="#22c55e" />
            <circle cx="120" cy="0" r="22" fill="#22c55e" />
          </g>

          {/* Cherry Tomatoes (Candidate 4: at 75%, 68%) */}
          <g transform="translate(375, 340)">
            <circle cx="-8" cy="0" r="10" fill={isAltered('diff-cherry-tomato-bunch') ? '#f97316' : '#ef4444'} />
            <circle cx="8" cy="0" r="10" fill={isAltered('diff-cherry-tomato-bunch') ? '#f97316' : '#ef4444'} />
          </g>

          {/* DIFFERENCE 1: Watering Can (22%, 75%) */}
          <g transform="translate(110, 375)">
            <rect x="-25" y="-15" width="50" height="35" rx="6" fill={!isAltered('diff-watering-can') ? '#65a30d' : '#38bdf8'} />
            <line x1="25" y1="0" x2="45" y2="-15" stroke="#475569" strokeWidth="4" />
          </g>

          {/* DIFFERENCE 2: Caterpillar (58%, 62%) */}
          <g transform="translate(290, 310)">
            {!isAltered('diff-caterpillar-leaf') && (
              <g fill="#84cc16">
                <circle cx="-8" cy="0" r="5" />
                <circle cx="0" cy="0" r="5" />
                <circle cx="8" cy="0" r="5" />
              </g>
            )}
          </g>

          {/* DIFFERENCE 3: Ladybug (80%, 40%) */}
          <g transform="translate(400, 200)">
            <circle cx="0" cy="0" r="12" fill={!isAltered('diff-ladybug-spots') ? '#ef4444' : '#eab308'} />
            <circle cx="-3" cy="-3" r="2" fill="#000000" />
            <circle cx="3" cy="3" r="2" fill="#000000" />
          </g>
        </svg>
      );

    // ==========================================
    // 20. เมืองจราจรปลอดภัยมีวินัย 🚦
    // ==========================================
    case 'spot-ext-20-traffic-city':
      return (
        <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <rect width="500" height="500" rx="24" fill="#e0f2fe" />
          <rect x="0" y="300" width="500" height="200" fill="#334155" />

          {/* Antenna on Skyscraper (Candidate 5: at 20%, 18%) */}
          <g transform="translate(100, 90)">
            <rect x="-30" y="40" width="60" height="170" fill="#64748b" />
            <line x1="0" y1="40" x2="0" y2="-20" stroke="#1e293b" strokeWidth="3" />
            <circle cx="0" cy="-22" r="4" fill={isAltered('diff-skyscraper-antenna') ? '#38bdf8' : '#ef4444'} />
          </g>

          {/* Sidewalk Shade Tree (Candidate 6: at 85%, 65%) */}
          <g transform="translate(425, 325)">
            <rect x="-6" y="0" width="12" height="40" fill="#78350f" />
            {isAltered('diff-sidewalk-shade-tree') ? (
              <polygon points="0,-45 28,0 -28,0" fill="#15803d" />
            ) : (
              <circle cx="0" cy="-20" r="28" fill="#16a34a" />
            )}
          </g>

          {/* Bike Pavement Icon (Candidate 7: at 15%, 80%) */}
          <g transform="translate(75, 400)">
            {isAltered('diff-bicycle-lane-icon') ? (
              <polygon points="0,-10 12,0 0,10 -12,0" fill="#ffffff" />
            ) : (
              <circle cx="0" cy="0" r="10" stroke="#10b981" strokeWidth="3" fill="none" />
            )}
          </g>

          {/* School Bus & Headlamp (Candidate 4: at 52%, 52%) */}
          <g transform="translate(260, 260)">
            <rect x="-80" y="-30" width="160" height="65" rx="10" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
            <circle cx="-50" cy="35" r="15" fill="#0f172a" />
            <circle cx="50" cy="35" r="15" fill="#0f172a" />
            {isAltered('diff-school-bus-lamp') ? (
              <rect x="74" y="5" width="8" height="14" fill="#ffffff" />
            ) : (
              <circle cx="78" cy="10" r="7" fill="#ffffff" />
            )}
          </g>

          {/* DIFFERENCE 1: Traffic Light (75%, 25%) */}
          <g transform="translate(375, 125)">
            <rect x="-14" y="-35" width="28" height="70" rx="6" fill="#1e293b" stroke="#000000" strokeWidth="2" />
            <circle cx="0" cy="-18" r="8" fill={isAltered('diff-traffic-light') ? '#ef4444' : '#334155'} />
            <circle cx="0" cy="0" r="8" fill="#334155" />
            <circle cx="0" cy="18" r="8" fill={!isAltered('diff-traffic-light') ? '#22c55e' : '#334155'} />
          </g>

          {/* DIFFERENCE 2: Zebra Crosswalk (50%, 78%) */}
          <g transform="translate(250, 390)">
            <rect x="-180" y="-8" width="50" height="16" fill="#ffffff" />
            <rect x="-60" y="-8" width="50" height="16" fill="#ffffff" />
            <rect x="60" y="-8" width="50" height="16" fill="#ffffff" />
            {!isAltered('diff-zebra-stripes') && (
              <g fill="#cbd5e1">
                <circle cx="-35" cy="0" r="4" />
                <circle cx="85" cy="0" r="4" />
              </g>
            )}
          </g>

          {/* DIFFERENCE 3: Crosswalk Patrol Flag (28%, 55%) */}
          <g transform="translate(140, 275)">
            <circle cx="0" cy="-20" r="10" fill="#fed7aa" />
            <rect x="-8" y="-10" width="16" height="30" fill="#3b82f6" />
            {!isAltered('diff-crosswalk-flag') ? (
              <polygon points="12,-15 35,-5 12,5" fill="#f97316" />
            ) : (
              <polygon points="12,-15 28,-15 34,-5 28,5 12,5" fill="#dc2626" />
            )}
          </g>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <rect width="500" height="500" fill="#f1f5f9" />
          <text x="250" y="250" textAnchor="middle" fill="#64748b" fontSize="20" fontWeight="bold">
            ฉากพิเศษ {levelId}
          </text>
        </svg>
      );
  }
};
