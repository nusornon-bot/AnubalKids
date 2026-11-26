import React from 'react';

export interface SceneProps {
  variant: 'left' | 'right';
  foundDifferenceIds: string[];
  activeDifferenceIds?: string[];
}

export const isDifferenceAltered = (
  variant: 'left' | 'right',
  diffId: string,
  activeDifferenceIds?: string[]
): boolean => {
  if (variant === 'left') return false;
  if (!activeDifferenceIds || activeDifferenceIds.length === 0) return true;
  return activeDifferenceIds.includes(diffId);
};

// =========================================================================
// SCENE 1: โต๊ะเครื่องหอมน้ำมันมะกรูด (Herbal Bottles Scene)
// =========================================================================
export const HerbalBottlesScene: React.FC<SceneProps> = ({ variant, activeDifferenceIds }) => {
  const isAltered = (id: string) => isDifferenceAltered(variant, id, activeDifferenceIds);

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8cfa8" />
          <stop offset="50%" stopColor="#dcb888" />
          <stop offset="100%" stopColor="#c89f6c" />
        </linearGradient>
        <pattern id="woodGrain" width="50" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 Q25 8 50 10" stroke="#b88f5c" strokeWidth="1" opacity="0.3" fill="none" />
          <path d="M0 5 Q25 7 50 5" stroke="#cf9e6a" strokeWidth="0.8" opacity="0.25" fill="none" />
        </pattern>
        <linearGradient id="oilClear" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#fde68a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="purpleOil" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
          <stop offset="40%" stopColor="#a855f7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="glassGloss" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="ceramicJars" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d4a3e" />
          <stop offset="50%" stopColor="#253026" />
          <stop offset="100%" stopColor="#151b16" />
        </linearGradient>
        <linearGradient id="corkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d99f6b" />
          <stop offset="50%" stopColor="#b47945" />
          <stop offset="100%" stopColor="#8d5423" />
        </linearGradient>
        <linearGradient id="amberGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9a3412" />
          <stop offset="50%" stopColor="#7c2d12" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
        <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="50%" stopColor="#65a30d" />
          <stop offset="100%" stopColor="#3f6212" />
        </linearGradient>
      </defs>

      {/* Wooden Table Top */}
      <rect width="500" height="500" rx="20" fill="url(#woodGrad)" />
      <rect width="500" height="500" fill="url(#woodGrain)" />
      <path d="M 0 320 L 500 320" stroke="#a16207" strokeWidth="1.5" opacity="0.3" />

      {/* Background Soft Shadows */}
      <ellipse cx="250" cy="400" rx="200" ry="40" fill="#78350f" opacity="0.15" />

      {/* Candidate 5: Back Ceramic Jar Left (28%, 42%) -> cx: 140, cy: 210 */}
      <g id="ceramic-jar-left">
        <ellipse cx="140" cy="270" rx="36" ry="12" fill="#78350f" opacity="0.3" />
        <path d="M 115 160 Q 105 210 110 260 Q 140 275 170 260 Q 175 210 165 160 Z" fill="url(#ceramicJars)" />
        <ellipse cx="140" cy="160" rx="25" ry="8" fill="#1e293b" />
        <ellipse cx="140" cy="155" rx="18" ry="6" fill="#475569" />
        {isAltered('diff-ceramic-jar-accent') && (
          <path d="M 112 210 Q 140 220 168 210" stroke="#fef08a" strokeWidth="6" fill="none" opacity="0.9" />
        )}
      </g>

      {/* Amber Dropper Bottle (Left-Center) */}
      <g id="amber-bottle">
        <ellipse cx="170" cy="240" rx="22" ry="8" fill="#78350f" opacity="0.3" />
        <rect x="152" y="140" width="36" height="95" rx="8" fill="url(#amberGlass)" />

        {/* Candidate 6: Dropper Bottle Label (34%, 37%) -> cx: 170, cy: 185 */}
        <rect x="156" y="165" width="28" height="45" rx="2" fill="#fef3c7" opacity="0.85" />
        {isAltered('diff-dropper-label') ? (
          <g>
            <circle cx="170" cy="182" r="5" fill="#16a34a" />
            <path d="M 170 182 Q 176 180 178 174" stroke="#15803d" strokeWidth="1.5" fill="none" />
            <line x1="162" y1="195" x2="178" y2="195" stroke="#94a3b8" strokeWidth="1.5" />
          </g>
        ) : (
          <g>
            <line x1="160" y1="175" x2="180" y2="175" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="160" y1="183" x2="180" y2="183" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="160" y1="191" x2="180" y2="191" stroke="#0284c7" strokeWidth="1.5" />
          </g>
        )}

        {/* Candidate 3: Dropper Cap (34%, 24%) -> cx: 170, cy: 122 */}
        {isAltered('diff-amber-cap') ? (
          <g>
            <rect x="160" y="105" width="20" height="35" rx="3" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="170" cy="115" r="4" fill="#fef08a" />
          </g>
        ) : (
          <rect x="160" y="105" width="20" height="35" rx="3" fill="#18181b" />
        )}
      </g>

      {/* Candidate 4: Wooden Spoon with Lime (17%, 73%) -> cx: 85, cy: 365 */}
      <g id="spoon-lime">
        <ellipse cx="90" cy="380" rx="55" ry="15" fill="#78350f" opacity="0.25" />
        <path d="M 30 420 Q 60 400 90 380 Q 120 360 140 375 Q 120 400 80 415 Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
        <circle cx="85" cy="365" r="28" fill="url(#limeGrad)" />
        <circle cx="75" cy="355" r="3" fill="#4d7c0f" opacity="0.6" />
        <circle cx="95" cy="360" r="3.5" fill="#4d7c0f" opacity="0.6" />
        <circle cx="82" cy="375" r="2.5" fill="#4d7c0f" opacity="0.6" />
        {/* Leaf on Lime */}
        {!isAltered('diff-spoon-lime') && (
          <path d="M 85 337 Q 95 320 110 326 Q 105 340 85 337 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
        )}
      </g>

      {/* Main Glass Flask in Center */}
      <g id="main-glass-bottle">
        <ellipse cx="250" cy="385" rx="65" ry="18" fill="#78350f" opacity="0.4" />
        <path
          d="M 230 200 Q 210 240 185 280 Q 165 315 170 355 Q 175 390 250 390 Q 325 390 330 355 Q 335 315 315 280 Q 290 240 270 200 Z"
          fill="#f8fafc"
          fillOpacity="0.25"
          stroke="#cbd5e1"
          strokeWidth="2.5"
        />
        <rect x="233" y="160" width="34" height="42" rx="4" fill="url(#corkGrad)" />
        <ellipse cx="250" cy="160" rx="17" ry="6" fill="#f6d5a8" />
        <ellipse cx="250" cy="202" rx="20" ry="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

        {/* Candidate 2: Twine String around Flask Neck (54%, 44%) -> cx: 270, cy: 220 */}
        <path d="M 228 220 Q 250 225 272 220" stroke="#f1f5f9" strokeWidth="3" fill="none" />
        {isAltered('diff-string-cork') ? (
          <g>
            <path d="M 270 220 Q 310 215 330 200" stroke="#fef08a" strokeWidth="3" fill="none" />
            <path d="M 270 220 Q 310 235 335 245" stroke="#fef08a" strokeWidth="3" fill="none" />
            <ellipse cx="270" cy="220" rx="6" ry="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          </g>
        ) : (
          <path d="M 270 220 Q 330 240 370 220" stroke="#f8fafc" strokeWidth="2.5" fill="none" />
        )}

        {/* Label Tag */}
        <path d="M 225 280 L 275 276 L 270 335 L 222 340 Z" fill="#ffffff" opacity="0.9" stroke="#e2e8f0" strokeWidth="1" />
        <line x1="235" y1="295" x2="265" y2="293" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="235" y1="305" x2="260" y2="303" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />

        {/* Liquid Layer inside Glass */}
        <path
          d="M 200 290 Q 175 325 175 350 Q 180 380 250 382 Q 320 380 325 350 Q 325 325 300 290 Z"
          fill="url(#oilClear)"
        />

        {/* Candidate 1: Purple Liquid Layer at the Bottom (50%, 72%) -> cx: 250, cy: 360 */}
        {isAltered('diff-purple-liquid') ? (
          <path
            d="M 178 342 Q 250 336 322 342 Q 325 365 315 378 Q 285 385 250 385 Q 215 385 185 378 Q 175 365 178 342 Z"
            fill="url(#oilClear)"
            opacity="0.95"
          />
        ) : (
          <path
            d="M 178 342 Q 250 332 322 342 Q 325 365 315 378 Q 285 385 250 385 Q 215 385 185 378 Q 175 365 178 342 Z"
            fill="url(#purpleOil)"
          />
        )}

        <path d="M 200 260 Q 185 300 185 340" stroke="url(#glassGloss)" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M 305 270 Q 315 305 310 340" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
      </g>

      {/* Candidate 7: Wood Grain Swirl Knot (88%, 84%) -> cx: 440, cy: 420 */}
      {isAltered('diff-table-wood-grain') && (
        <g transform="translate(440, 420)">
          <ellipse cx="0" cy="0" rx="18" ry="12" fill="none" stroke="#78350f" strokeWidth="2.5" opacity="0.75" />
          <ellipse cx="0" cy="0" rx="10" ry="7" fill="none" stroke="#92400e" strokeWidth="2" opacity="0.8" />
          <circle cx="0" cy="0" r="3.5" fill="#451a03" />
        </g>
      )}
    </svg>
  );
};

// =========================================================================
// SCENE 2: ฟาร์มสัตว์แสนสุข (Farm Scene)
// =========================================================================
export const FarmScene: React.FC<SceneProps> = ({ variant, activeDifferenceIds }) => {
  const isAltered = (id: string) => isDifferenceAltered(variant, id, activeDifferenceIds);

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="farmSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id="hillGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      <rect width="500" height="500" rx="20" fill="url(#farmSky)" />
      <path d="M 250 80 Q 270 60 290 80 Q 310 70 325 85 Q 330 100 310 105 Q 260 110 250 80 Z" fill="#ffffff" opacity="0.85" />

      {/* Candidate 1: Sun (18%, 18%) -> cx: 90, cy: 90 */}
      <g id="farm-sun">
        <circle cx="90" cy="90" r="42" fill="#facc15" stroke="#eab308" strokeWidth="3" />
        <line x1="90" y1="36" x2="90" y2="20" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
        <line x1="90" y1="144" x2="90" y2="160" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
        <line x1="36" y1="90" x2="20" y2="90" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
        <line x1="144" y1="90" x2="160" y2="90" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
        {isAltered('diff-sun') ? (
          <g>
            <path d="M 68 82 Q 78 80 88 84 L 88 94 Q 78 98 68 94 Z" fill="#18181b" />
            <path d="M 92 84 Q 102 80 112 82 L 112 94 Q 102 98 92 94 Z" fill="#18181b" />
            <line x1="88" y1="84" x2="92" y2="84" stroke="#18181b" strokeWidth="3" />
            <line x1="68" y1="84" x2="56" y2="82" stroke="#18181b" strokeWidth="2.5" />
            <line x1="112" y1="84" x2="124" y2="82" stroke="#18181b" strokeWidth="2.5" />
            <path d="M 80 108 Q 90 116 100 108" stroke="#713f12" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            <circle cx="78" cy="84" r="5" fill="#713f12" />
            <circle cx="102" cy="84" r="5" fill="#713f12" />
            <path d="M 78 102 Q 90 115 102 102" stroke="#713f12" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <circle cx="70" cy="94" r="4" fill="#f87171" opacity="0.6" />
            <circle cx="110" cy="94" r="4" fill="#f87171" opacity="0.6" />
          </g>
        )}
      </g>

      {/* Rolling Hills */}
      <path d="M 0 260 Q 150 200 300 240 Q 420 270 500 220 L 500 500 L 0 500 Z" fill="url(#hillGrad1)" />
      <path d="M 0 320 Q 180 290 350 330 Q 440 350 500 320 L 500 500 L 0 500 Z" fill="url(#hillGrad2)" />

      {/* Red Barn (Candidate 4: Barn roof feature at 32%, 39% -> cx: 160, cy: 195) */}
      <g id="barn">
        <path d="M 120 230 L 160 195 L 200 230 L 200 280 L 120 280 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
        <polygon points="120,230 160,195 200,230" fill="#b91c1c" />
        <rect x="145" y="245" width="30" height="35" fill="#ffffff" />
        <line x1="145" y1="245" x2="175" y2="280" stroke="#dc2626" strokeWidth="2" />
        <line x1="175" y1="245" x2="145" y2="280" stroke="#dc2626" strokeWidth="2" />
        {/* Weathervane vs Windmill */}
        {isAltered('diff-barn-roof') ? (
          <g transform="translate(160, 185)">
            <line x1="0" y1="10" x2="0" y2="-12" stroke="#78350f" strokeWidth="2.5" />
            <ellipse cx="0" cy="-14" rx="8" ry="6" fill="#f97316" />
            <polygon points="6,-14 12,-16 6,-12" fill="#ef4444" />
          </g>
        ) : (
          <g transform="translate(160, 185)">
            <circle cx="0" cy="0" r="4" fill="#18181b" />
            <line x1="-15" y1="-15" x2="15" y2="15" stroke="#facc15" strokeWidth="3" />
            <line x1="-15" y1="15" x2="15" y2="-15" stroke="#facc15" strokeWidth="3" />
          </g>
        )}
      </g>

      {/* Wooden Fence */}
      <line x1="20" y1="360" x2="480" y2="360" stroke="#d97706" strokeWidth="5" />
      <line x1="20" y1="385" x2="480" y2="385" stroke="#d97706" strokeWidth="5" />
      {[50, 110, 170, 230, 290, 350, 410, 470].map((x) => (
        <rect key={x} x={x - 6} y="340" width="12" height="60" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
      ))}

      {/* Candidate 3: Apple Tree (82%, 28%) -> cx: 410, cy: 140 */}
      <g id="farm-tree">
        <rect x="390" y="160" width="35" height="150" fill="#78350f" rx="6" />
        <circle cx="410" cy="140" r="75" fill="#15803d" stroke="#166534" strokeWidth="3" />
        <circle cx="370" cy="120" r="50" fill="#16a34a" />
        <circle cx="445" cy="125" r="50" fill="#22c55e" />
        {isAltered('diff-apple') ? (
          <g>
            <circle cx="380" cy="130" r="14" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
            <circle cx="380" cy="122" r="2.5" fill="#15803d" />
            <circle cx="425" cy="115" r="14" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
            <circle cx="435" cy="155" r="14" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
          </g>
        ) : (
          <g>
            <circle cx="380" cy="130" r="14" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
            <path d="M 380 116 Q 384 110 388 114" stroke="#713f12" strokeWidth="2" fill="none" />
            <circle cx="425" cy="115" r="14" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
            <circle cx="435" cy="155" r="14" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
          </g>
        )}
      </g>

      {/* Candidate 7: Hay Bale on Meadow (70%, 65%) -> cx: 350, cy: 325 */}
      <g id="hay-bale" transform="translate(325, 305)">
        <ellipse cx="25" cy="20" rx="25" ry="16" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
        {isAltered('diff-hay-bale') ? (
          <g>
            <path d="M 5 20 Q 25 15 45 20" stroke="#ef4444" strokeWidth="4" fill="none" />
            <circle cx="25" cy="18" r="4" fill="#dc2626" />
          </g>
        ) : (
          <path d="M 5 20 Q 25 15 45 20" stroke="#78350f" strokeWidth="3" fill="none" />
        )}
      </g>

      {/* Candidate 2: Cow in Meadow (50%, 55%) -> cx: 250, cy: 275 */}
      <g id="farm-cow" transform="translate(160, 230)">
        <ellipse cx="90" cy="140" rx="75" ry="18" fill="#14532d" opacity="0.3" />
        <rect x="45" y="80" width="16" height="55" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="45" y="125" width="16" height="12" rx="3" fill="#334155" />
        <rect x="75" y="80" width="16" height="55" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="75" y="125" width="16" height="12" rx="3" fill="#334155" />
        <rect x="110" y="80" width="16" height="55" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="110" y="125" width="16" height="12" rx="3" fill="#334155" />
        <ellipse cx="90" cy="75" rx="55" ry="40" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M 60 55 Q 80 45 75 75 Q 60 85 60 55 Z" fill="#1e293b" />
        <path d="M 105 60 Q 125 70 120 90 Q 100 95 105 60 Z" fill="#1e293b" />
        <ellipse cx="140" cy="45" rx="26" ry="24" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <ellipse cx="152" cy="54" rx="16" ry="12" fill="#fbcfe8" />
        <circle cx="146" cy="54" r="3" fill="#be185d" />
        <circle cx="156" cy="54" r="3" fill="#be185d" />
        <circle cx="136" cy="38" r="4" fill="#0f172a" />
        <path d="M 125 24 Q 130 12 136 20" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" fill="none" />
        <ellipse cx="120" cy="35" rx="10" ry="5" fill="#fbcfe8" transform="rotate(-30, 120, 35)" />
        <path d="M 125 60 Q 135 68 142 62" stroke="#991b1b" strokeWidth="4" fill="none" />
        {isAltered('diff-cow') ? (
          <g>
            <path d="M 127 68 L 141 68 L 144 82 L 124 82 Z" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
            <circle cx="134" cy="84" r="3" fill="#713f12" />
          </g>
        ) : (
          <g>
            <circle cx="134" cy="70" r="5" fill="#ef4444" />
            <path d="M 134 70 L 124 64 L 126 76 Z" fill="#dc2626" />
            <path d="M 134 70 L 144 64 L 142 76 Z" fill="#dc2626" />
          </g>
        )}
      </g>

      {/* Candidate 5: Flower beside Fence (85%, 75%) -> cx: 425, cy: 375 */}
      <g id="fence-flower" transform="translate(425, 375)">
        <line x1="0" y1="20" x2="0" y2="0" stroke="#16a34a" strokeWidth="3" />
        {isAltered('diff-fence-flower') ? (
          <circle cx="0" cy="0" r="10" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
        ) : (
          <g>
            <circle cx="0" cy="0" r="12" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="5" fill="#78350f" />
          </g>
        )}
      </g>

      {/* Candidate 6: Chicks on Ground (22%, 82%) -> cx: 110, cy: 410 */}
      <g id="farm-chicks" transform="translate(110, 410)">
        <circle cx="-12" cy="0" r="9" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
        <circle cx="-7" cy="-2" r="1.5" fill="#18181b" />
        <polygon points="-3,-2 2,-1 -3,0" fill="#f97316" />
        {isAltered('diff-chick-corn') ? (
          <text x="5" y="0" fontSize="10" fill="#64748b" fontWeight="bold">zZ</text>
        ) : (
          <g>
            <circle cx="14" cy="0" r="9" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="10" cy="-2" r="1.5" fill="#18181b" />
            <polygon points="5,-2 0,-1 5,0" fill="#f97316" />
          </g>
        )}
      </g>
    </svg>
  );
};

// =========================================================================
// SCENE 3: สวนสาธารณะร่มรื่น (Park Scene)
// =========================================================================
export const ParkScene: React.FC<SceneProps> = ({ variant, activeDifferenceIds }) => {
  const isAltered = (id: string) => isDifferenceAltered(variant, id, activeDifferenceIds);

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="parkSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#f0f9ff" />
        </linearGradient>
      </defs>

      <rect width="500" height="500" rx="20" fill="url(#parkSky)" />
      <path d="M 0 240 Q 250 200 500 240 L 500 500 L 0 500 Z" fill="#86efac" />
      <path d="M 0 300 Q 200 280 500 320 L 500 500 L 0 500 Z" fill="#4ade80" />

      {/* Candidate 1: Kite (20%, 20%) -> cx: 100, cy: 100 */}
      <g id="park-kite">
        <path d="M 100 60 L 130 100 L 100 140 L 70 100 Z" fill={isAltered('diff-kite') ? '#eab308' : '#ef4444'} stroke={isAltered('diff-kite') ? '#ca8a04' : '#b91c1c'} strokeWidth="2.5" />
        <line x1="70" y1="100" x2="130" y2="100" stroke="#ffffff" strokeWidth="2" />
        <line x1="100" y1="60" x2="100" y2="140" stroke="#ffffff" strokeWidth="2" />
        <path d="M 100 140 Q 90 170 110 200 Q 120 220 105 240" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="4 2" />
        <circle cx="95" cy="170" r="5" fill="#f43f5e" />
        <circle cx="112" cy="205" r="5" fill="#3b82f6" />
      </g>

      {/* Big Shade Tree Left */}
      <rect x="50" y="220" width="30" height="120" fill="#78350f" rx="4" />
      <circle cx="65" cy="210" r="60" fill="#15803d" />

      {/* Candidate 5: Bird Nest on Right Tree (85%, 25%) -> cx: 425, cy: 125 */}
      <g id="park-tree-right">
        <rect x="410" y="160" width="30" height="150" fill="#78350f" rx="4" />
        <circle cx="425" cy="130" r="65" fill="#16a34a" />
        {!isAltered('diff-tree-nest') && (
          <g transform="translate(425, 125)">
            <ellipse cx="0" cy="5" rx="16" ry="8" fill="#78350f" />
            <circle cx="-5" cy="0" r="4" fill="#38bdf8" />
            <circle cx="5" cy="0" r="4" fill="#38bdf8" />
          </g>
        )}
      </g>

      {/* Candidate 4: Fountain Jets in Background (50%, 45%) -> cx: 250, cy: 225 */}
      <g id="park-fountain" transform="translate(250, 225)">
        <ellipse cx="0" cy="15" rx="40" ry="12" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
        <ellipse cx="0" cy="5" rx="20" ry="6" fill="#94a3b8" />
        {isAltered('diff-fountain-jet') ? (
          <g stroke="#ffffff" strokeWidth="2.5" fill="none">
            <path d="M 0 5 Q 0 -35 0 -45" />
            <path d="M 0 5 Q -15 -30 -25 -20" />
            <path d="M 0 5 Q 15 -30 25 -20" />
            <path d="M 0 5 Q -25 -20 -35 -10" />
            <path d="M 0 5 Q 25 -20 35 -10" />
          </g>
        ) : (
          <g stroke="#ffffff" strokeWidth="2.5" fill="none">
            <path d="M 0 5 Q 0 -30 0 -40" />
            <path d="M 0 5 Q -15 -25 -25 -15" />
            <path d="M 0 5 Q 15 -25 25 -15" />
          </g>
        )}
      </g>

      {/* Candidate 6: Bicycle near tree (18%, 62%) -> cx: 90, cy: 310 */}
      <g id="park-bicycle" transform="translate(90, 310)">
        <circle cx="-18" cy="15" r="14" fill="none" stroke="#475569" strokeWidth="2.5" />
        <circle cx="18" cy="15" r="14" fill="none" stroke="#475569" strokeWidth="2.5" />
        <line x1="-18" y1="15" x2="0" y2="15" stroke="#0284c7" strokeWidth="2.5" />
        <line x1="0" y1="15" x2="-6" y2="0" stroke="#0284c7" strokeWidth="2.5" />
        <line x1="-6" y1="0" x2="12" y2="0" stroke="#0284c7" strokeWidth="2.5" />
        <line x1="12" y1="0" x2="18" y2="15" stroke="#0284c7" strokeWidth="2.5" />
        {isAltered('diff-park-bicycle') ? (
          <circle cx="14" cy="-5" r="4.5" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
        ) : (
          <circle cx="12" cy="-5" r="3.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
        )}
      </g>

      {/* Candidate 2: Puppy on Lawn (50%, 68%) -> cx: 250, cy: 340 */}
      <g id="park-dog" transform="translate(200, 300)">
        <ellipse cx="50" cy="55" rx="35" ry="24" fill="#d97706" />
        <circle cx="28" cy="35" r="22" fill="#d97706" />
        <ellipse cx="16" cy="40" rx="12" ry="9" fill="#fde68a" />
        <circle cx="10" cy="37" r="4" fill="#18181b" />
        <circle cx="24" cy="30" r="3" fill="#18181b" />
        <rect x="25" y="70" width="10" height="20" rx="4" fill="#b45309" />
        <rect x="55" y="70" width="10" height="20" rx="4" fill="#b45309" />
        <path d="M 80 50 Q 100 40 95 25" stroke="#d97706" strokeWidth="6" strokeLinecap="round" fill="none" />
        {isAltered('diff-dog') ? (
          <ellipse cx="38" cy="28" rx="8" ry="16" fill="#92400e" transform="rotate(25, 38, 28)" />
        ) : (
          <g>
            <path d="M 15 22 Q 28 12 40 22" fill="#2563eb" />
            <path d="M 8 24 L 20 22" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* Candidate 3: Park Bench on Right (78%, 62%) -> cx: 390, cy: 310 */}
      <g id="park-bench">
        <rect x="330" y="270" width="120" height="15" rx="4" fill="#a16207" stroke="#713f12" strokeWidth="2" />
        <rect x="330" y="295" width="120" height="15" rx="4" fill="#a16207" stroke="#713f12" strokeWidth="2" />
        <line x1="345" y1="310" x2="345" y2="350" stroke="#334155" strokeWidth="5" />
        <line x1="435" y1="310" x2="435" y2="350" stroke="#334155" strokeWidth="5" />
        {isAltered('diff-bench') ? (
          <g transform="translate(390, 275)">
            <circle cx="16" cy="16" r="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <polygon points="16,8 23,13 20,21 12,21 9,13" fill="#0f172a" />
          </g>
        ) : (
          <g transform="translate(370, 275)">
            <path d="M 0 10 Q 18 2 36 10 L 36 24 Q 18 16 0 24 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M 36 10 Q 54 2 72 10 L 72 24 Q 54 16 36 24 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="36" y1="10" x2="36" y2="24" stroke="#475569" strokeWidth="2" />
          </g>
        )}
      </g>

      {/* Candidate 7: Tulip Flower Bed Foreground (38%, 88%) -> cx: 190, cy: 440 */}
      <g id="tulip-bed" transform="translate(190, 440)">
        <ellipse cx="0" cy="10" rx="30" ry="8" fill="#78350f" opacity="0.3" />
        {[-15, 0, 15].map((xOff, i) => (
          <g key={i} transform={`translate(${xOff}, 0)`}>
            <line x1="0" y1="10" x2="0" y2="0" stroke="#16a34a" strokeWidth="2.5" />
            <path
              d="M -6 0 Q 0 -12 6 0 Z"
              fill={isAltered('diff-tulip-bed') ? '#f472b6' : '#facc15'}
              stroke={isAltered('diff-tulip-bed') ? '#db2777' : '#ca8a04'}
              strokeWidth="1"
            />
          </g>
        ))}
      </g>
    </svg>
  );
};

// =========================================================================
// SCENE 4: โลกใต้ท้องทะเลลึก (Ocean Scene)
// =========================================================================
export const OceanScene: React.FC<SceneProps> = ({ variant, activeDifferenceIds }) => {
  const isAltered = (id: string) => isDifferenceAltered(variant, id, activeDifferenceIds);

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="deepOcean" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="50%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
      </defs>

      <rect width="500" height="500" rx="20" fill="url(#deepOcean)" />
      <path d="M 0 420 Q 200 390 500 410 L 500 500 L 0 500 Z" fill="#fde68a" />
      <path d="M 50 440 Q 30 360 60 300 Q 80 370 70 440 Z" fill="#059669" />
      <path d="M 430 430 Q 460 350 440 280 Q 420 360 440 430 Z" fill="#10b981" />

      {/* Candidate 2: Submarine (50%, 28%) -> cx: 250, cy: 140 */}
      <g id="ocean-sub" transform="translate(160, 90)">
        <ellipse cx="90" cy="50" rx="75" ry="42" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
        <rect x="75" y="5" width="28" height="25" rx="4" fill="#eab308" />
        <path d="M 85 5 L 85 -10 L 102 -10" stroke="#ca8a04" strokeWidth="5" strokeLinecap="round" fill="none" />
        <polygon points="10,35 10,65 20,50" fill="#f97316" />
        {isAltered('diff-sub') ? (
          <path d="M 100 58 L 88 46 A 8 8 0 0 1 100 37 A 8 8 0 0 1 112 46 Z" fill="#f43f5e" stroke="#ffffff" strokeWidth="3" />
        ) : (
          <circle cx="100" cy="50" r="18" fill="#38bdf8" stroke="#ffffff" strokeWidth="3.5" />
        )}
      </g>

      {/* Candidate 4: Sea Turtle Swimming (76%, 24%) -> cx: 380, cy: 120 */}
      <g id="sea-turtle" transform="translate(380, 120)">
        <ellipse cx="0" cy="0" rx="28" ry="20" fill={isAltered('diff-sea-turtle') ? '#b45309' : '#15803d'} stroke={isAltered('diff-sea-turtle') ? '#78350f' : '#14532d'} strokeWidth="2" />
        <circle cx="28" cy="0" r="9" fill={isAltered('diff-sea-turtle') ? '#d97706' : '#22c55e'} />
        <ellipse cx="10" cy="-22" rx="14" ry="7" fill={isAltered('diff-sea-turtle') ? '#d97706' : '#22c55e'} transform="rotate(-30, 10, -22)" />
        <ellipse cx="10" cy="22" rx="14" ry="7" fill={isAltered('diff-sea-turtle') ? '#d97706' : '#22c55e'} transform="rotate(30, 10, 22)" />
      </g>

      {/* Candidate 5: Small Bioluminescent Jellyfish (22%, 32%) -> cx: 110, cy: 160 */}
      <g id="jelly-glow" transform="translate(110, 160)">
        <ellipse cx="0" cy="0" rx="18" ry="14" fill="#38bdf8" opacity="0.8" />
        <path d="M -10 10 Q -5 28 -10 38" stroke="#38bdf8" strokeWidth="2" fill="none" />
        <path d="M 0 10 Q 5 28 0 38" stroke="#38bdf8" strokeWidth="2" fill="none" />
        <path d="M 10 10 Q 5 28 10 38" stroke="#38bdf8" strokeWidth="2" fill="none" />
        {isAltered('diff-jellyfish-glow') && (
          <g fill="#facc15">
            <circle cx="-5" cy="20" r="2.5" />
            <circle cx="5" cy="25" r="2.5" />
            <circle cx="0" cy="32" r="2" />
          </g>
        )}
      </g>

      {/* Candidate 3: Jellyfish on Right (80%, 40%) -> cx: 400, cy: 200 */}
      <g id="ocean-jelly">
        <ellipse cx="400" cy="190" rx="32" ry="24" fill={isAltered('diff-jelly') ? '#38bdf8' : '#f472b6'} opacity="0.85" />
        <path d="M 375 205 Q 380 240 375 260" stroke={isAltered('diff-jelly') ? '#38bdf8' : '#f472b6'} strokeWidth="3" fill="none" />
        <path d="M 390 205 Q 395 245 390 265" stroke={isAltered('diff-jelly') ? '#38bdf8' : '#f472b6'} strokeWidth="3" fill="none" />
        <path d="M 410 205 Q 405 245 410 265" stroke={isAltered('diff-jelly') ? '#38bdf8' : '#f472b6'} strokeWidth="3" fill="none" />
        <path d="M 425 205 Q 420 240 425 260" stroke={isAltered('diff-jelly') ? '#38bdf8' : '#f472b6'} strokeWidth="3" fill="none" />
      </g>

      {/* Candidate 1: Crab on Sand (25%, 75%) -> cx: 125, cy: 375 */}
      <g id="ocean-crab" transform="translate(85, 345)">
        <ellipse cx="40" cy="35" rx="30" ry="20" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
        <path d="M 18 20 Q 5 10 5 0 Q 20 0 25 15" fill="#dc2626" />
        <path d="M 62 20 Q 75 10 75 0 Q 60 0 55 15" fill="#dc2626" />
        {isAltered('diff-crab') ? (
          <g>
            <rect x="22" y="15" width="36" height="15" rx="6" fill="#0284c7" stroke="#ffffff" strokeWidth="2" opacity="0.9" />
            <path d="M 52 22 L 68 22 L 68 -5" stroke="#facc15" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          <g>
            <circle cx="30" cy="22" r="5" fill="#ffffff" />
            <circle cx="30" cy="22" r="2.5" fill="#000000" />
            <circle cx="50" cy="22" r="5" fill="#ffffff" />
            <circle cx="50" cy="22" r="2.5" fill="#000000" />
            <path d="M 32 38 Q 40 44 48 38" stroke="#7f1d1d" strokeWidth="2.5" fill="none" />
          </g>
        )}
      </g>

      {/* Candidate 6: Clam Shell with Pearl (55%, 88%) -> cx: 275, cy: 440 */}
      <g id="clam-shell" transform="translate(275, 440)">
        <ellipse cx="0" cy="8" rx="24" ry="12" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
        {!isAltered('diff-clam-shell') ? (
          <circle cx="0" cy="4" r="7" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1.5" />
        ) : (
          <path d="M -24 8 Q 0 -6 24 8" stroke="#db2777" strokeWidth="2" fill="none" />
        )}
      </g>

      {/* Candidate 7: Anchor on Seafloor (88%, 85%) -> cx: 440, cy: 425 */}
      <g id="anchor" transform="translate(440, 425)">
        <line x1="0" y1="-25" x2="0" y2="20" stroke="#64748b" strokeWidth="5" />
        <circle cx="0" cy="-28" r="6" fill="none" stroke="#64748b" strokeWidth="3" />
        <path d="M -22 8 Q 0 30 22 8" stroke="#64748b" strokeWidth="5" fill="none" />
        {!isAltered('diff-anchor-chain') && (
          <path d="M -12 12 Q -8 0 -5 18" stroke="#10b981" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        )}
      </g>
    </svg>
  );
};

// =========================================================================
// SCENE 5: สถานีอวกาศดวงดาว (Space Scene)
// =========================================================================
export const SpaceScene: React.FC<SceneProps> = ({ variant, activeDifferenceIds }) => {
  const isAltered = (id: string) => isDifferenceAltered(variant, id, activeDifferenceIds);

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="spaceDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="60%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
      </defs>

      <rect width="500" height="500" rx="20" fill="url(#spaceDark)" />
      {[
        [50, 40], [120, 80], [220, 40], [310, 90], [440, 50], [90, 160], [420, 180]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 3 : 2} fill="#ffffff" opacity={0.8} />
      ))}

      {/* Candidate 6: Shooting Meteor (45%, 12%) -> cx: 225, cy: 60 */}
      {!isAltered('diff-shooting-star') && (
        <g transform="translate(225, 60)">
          <line x1="-30" y1="-15" x2="30" y2="15" stroke="url(#shootingGrad)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="30" cy="15" r="4" fill="#ffffff" />
          <defs>
            <linearGradient id="shootingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
            </linearGradient>
          </defs>
        </g>
      )}

      {/* Candidate 4: Rocket Ship (20%, 18%) -> cx: 100, cy: 90 */}
      <g id="space-rocket" transform="translate(100, 90)">
        <polygon points="-8,10 0,-25 8,10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <circle cx="0" cy="-6" r="4" fill="#0284c7" />
        <polygon points="-8,8 -16,18 -8,14" fill="#ef4444" />
        <polygon points="8,8 16,18 8,14" fill="#ef4444" />
        {/* Exhaust Flame */}
        <polygon
          points="-6,12 0,28 6,12"
          fill={isAltered('diff-rocket-flame') ? '#38bdf8' : '#f97316'}
        />
      </g>

      {/* Moon Surface */}
      <path d="M 0 380 Q 250 340 500 380 L 500 500 L 0 500 Z" fill="#94a3b8" />
      <ellipse cx="140" cy="420" rx="35" ry="12" fill="#64748b" opacity="0.6" />
      <ellipse cx="360" cy="440" rx="45" ry="15" fill="#64748b" opacity="0.6" />

      {/* Candidate 2: Saturn (78%, 22%) -> cx: 390, cy: 110 */}
      <g id="space-saturn">
        <circle cx="390" cy="110" r="38" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
        {isAltered('diff-saturn-ring') ? (
          <circle cx="400" cy="98" r="8" fill="#d97706" opacity="0.6" />
        ) : (
          <ellipse cx="390" cy="110" rx="65" ry="14" fill="none" stroke="#fde68a" strokeWidth="7" opacity="0.85" transform="rotate(-20, 390, 110)" />
        )}
      </g>

      {/* Candidate 5: Space Station Solar Panel (52%, 26%) -> cx: 260, cy: 130 */}
      <g id="space-station" transform="translate(260, 130)">
        <circle cx="0" cy="0" r="10" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
        <line x1="-35" y1="0" x2="35" y2="0" stroke="#94a3b8" strokeWidth="3" />
        <rect x="-35" y="-8" width="18" height="16" rx="2" fill={isAltered('diff-solar-panel') ? '#eab308' : '#2563eb'} />
        <rect x="17" y="-8" width="18" height="16" rx="2" fill={isAltered('diff-solar-panel') ? '#eab308' : '#2563eb'} />
      </g>

      {/* Candidate 3: Astronaut (48%, 40%) -> cx: 240, cy: 200 */}
      <g id="space-astronaut" transform="translate(180, 140)">
        <rect x="35" y="90" width="50" height="70" rx="15" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
        <rect x="30" y="150" width="22" height="50" rx="8" fill="#e2e8f0" />
        <rect x="68" y="150" width="22" height="50" rx="8" fill="#e2e8f0" />
        <rect x="5" y="95" width="25" height="45" rx="8" fill="#e2e8f0" transform="rotate(25, 20, 95)" />
        <rect x="90" y="95" width="25" height="45" rx="8" fill="#e2e8f0" transform="rotate(-25, 100, 95)" />
        <circle cx="60" cy="55" r="42" fill="#ffffff" stroke="#94a3b8" strokeWidth="3.5" />
        <ellipse cx="60" cy="55" rx="28" ry="22" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
        {isAltered('diff-helmet-star') ? (
          <path d="M 60 40 L 52 30 A 5 5 0 0 1 60 23 A 5 5 0 0 1 68 30 Z" fill="#f43f5e" />
        ) : (
          <polygon points="60,20 64,28 73,29 66,35 68,44 60,39 52,44 54,35 47,29 56,28" fill="#facc15" />
        )}
      </g>

      {/* Candidate 1: Moon Flag (20%, 65%) -> cx: 100, cy: 325 */}
      <g id="space-flag">
        <line x1="100" y1="270" x2="100" y2="380" stroke="#cbd5e1" strokeWidth="4" />
        {isAltered('diff-flag') ? (
          <polygon points="100,270 150,290 100,310" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
        ) : (
          <polygon points="100,270 150,290 100,310" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
        )}
      </g>

      {/* Candidate 7: Satellite Dish on Moon (85%, 78%) -> cx: 425, cy: 390 */}
      <g id="satellite-dish" transform="translate(425, 390)">
        <line x1="0" y1="0" x2="0" y2="-20" stroke="#334155" strokeWidth="3" />
        {isAltered('diff-satellite-dish') ? (
          <path d="M 16 -30 A 18 18 0 0 1 -10 -15" stroke="#f8fafc" strokeWidth="5" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M -16 -30 A 18 18 0 0 0 10 -15" stroke="#f8fafc" strokeWidth="5" fill="none" strokeLinecap="round" />
        )}
      </g>
    </svg>
  );
};

// =========================================================================
// SCENE 6: ครัวขนมหวานเบเกอรี่ (Bakery Scene)
// =========================================================================
export const BakeryScene: React.FC<SceneProps> = ({ variant, activeDifferenceIds }) => {
  const isAltered = (id: string) => isDifferenceAltered(variant, id, activeDifferenceIds);

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bakeryWall" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fdf2f8" />
          <stop offset="100%" stopColor="#fce7f3" />
        </linearGradient>
      </defs>

      <rect width="500" height="500" rx="20" fill="url(#bakeryWall)" />

      {/* Candidate 6: Bakery Menu Sign (18%, 25%) -> cx: 90, cy: 125 */}
      <g id="bakery-menu" transform="translate(90, 125)">
        <rect x="-35" y="-30" width="70" height="60" rx="5" fill="#78350f" stroke="#451a03" strokeWidth="3" />
        <rect x="-30" y="-25" width="60" height="50" rx="3" fill="#1e293b" />
        {isAltered('diff-bakery-sign') ? (
          <path d="M 0 5 L -8 -5 A 5 5 0 0 1 0 -12 A 5 5 0 0 1 8 -5 Z" fill="#f43f5e" />
        ) : (
          <g>
            <polygon points="-8,5 -5,12 5,12 8,5" fill="#38bdf8" />
            <circle cx="0" cy="0" r="8" fill="#ffffff" />
            <circle cx="0" cy="-4" r="3" fill="#ef4444" />
          </g>
        )}
      </g>

      {/* Candidate 7: Wall Oven Light (85%, 35%) -> cx: 425, cy: 175 */}
      <g id="bakery-oven" transform="translate(425, 175)">
        <rect x="-40" y="-45" width="80" height="90" rx="6" fill="#cbd5e1" stroke="#64748b" strokeWidth="3" />
        <rect x="-30" y="-30" width="60" height="60" rx="4" fill={isAltered('diff-oven-glow') ? '#1e293b' : '#ea580c'} />
        {!isAltered('diff-oven-glow') && (
          <ellipse cx="0" cy="5" rx="16" ry="10" fill="#fef08a" opacity="0.9" />
        )}
      </g>

      {/* Kitchen Counter */}
      <rect x="0" y="320" width="500" height="180" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
      <rect x="0" y="305" width="500" height="25" fill="#fcd34d" stroke="#f59e0b" strokeWidth="2" />

      {/* Tiered Cake in Center (Candidate 1: Cake topper at 50%, 35% -> cx: 250, cy: 175) */}
      <g id="bakery-cake" transform="translate(170, 160)">
        <ellipse cx="80" cy="155" rx="75" ry="14" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
        <rect x="25" y="90" width="110" height="55" rx="10" fill="#fb7185" />
        <path d="M 25 105 Q 40 120 55 105 Q 70 125 85 105 Q 100 120 115 105 Q 130 115 135 105" stroke="#ffffff" strokeWidth="6" fill="none" />
        <rect x="45" y="45" width="70" height="50" rx="8" fill="#fda4af" />
        {isAltered('diff-cherry') ? (
          <g>
            <polygon points="70,18 90,18 80,40" fill="#dc2626" />
            <polygon points="68,16 75,10 80,16 85,10 92,16" fill="#16a34a" />
          </g>
        ) : (
          <g>
            <circle cx="80" cy="30" r="16" fill="#e11d48" stroke="#9f1239" strokeWidth="2" />
            <path d="M 80 15 Q 92 0 102 5" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* Candidate 2: Cupcake (22%, 65%) -> cx: 110, cy: 325 */}
      <g id="bakery-cupcake" transform="translate(75, 270)">
        <polygon points="10,40 20,80 50,80 60,40" fill={isAltered('diff-cupcake') ? '#f472b6' : '#38bdf8'} stroke="#0284c7" strokeWidth="2" />
        <ellipse cx="35" cy="35" rx="26" ry="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <circle cx="35" cy="22" r="6" fill="#f43f5e" />
      </g>

      {/* Candidate 5: Cake Candles (32%, 78%) -> cx: 160, cy: 390 */}
      <g id="cake-candles" transform="translate(160, 390)">
        {isAltered('diff-cake-candles') ? (
          <g>
            {[-20, -10, 0, 10, 20].map((x, i) => (
              <g key={i} transform={`translate(${x}, 0)`}>
                <line x1="0" y1="0" x2="0" y2="-18" stroke="#a855f7" strokeWidth="2" />
                <circle cx="0" cy="-21" r="2.5" fill="#facc15" />
              </g>
            ))}
          </g>
        ) : (
          <g>
            {[-12, 0, 12].map((x, i) => (
              <g key={i} transform={`translate(${x}, 0)`}>
                <line x1="0" y1="0" x2="0" y2="-18" stroke="#0284c7" strokeWidth="2.5" />
                <circle cx="0" cy="-21" r="3" fill="#f97316" />
              </g>
            ))}
          </g>
        )}
      </g>

      {/* Candidate 4: Pastry Tray Croissants / Baguette (65%, 75%) -> cx: 325, cy: 375 */}
      <g id="pastry-tray" transform="translate(325, 375)">
        <ellipse cx="0" cy="5" rx="35" ry="12" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
        {isAltered('diff-croissant-tray') ? (
          <ellipse cx="0" cy="-2" rx="26" ry="8" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
        ) : (
          <g>
            <path d="M -16 2 Q -8 -10 0 2" stroke="#eab308" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 4 2 Q 12 -10 20 2" stroke="#eab308" strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>
        )}
      </g>

      {/* Candidate 3: Young Chef Ribbon (78%, 55%) -> cx: 390, cy: 275 */}
      <g id="bakery-chef" transform="translate(330, 200)">
        <path d="M 35 30 Q 15 10 35 -10 Q 60 -25 85 -10 Q 105 10 85 30 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
        <rect x="35" y="25" width="50" height="20" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="60" cy="65" r="24" fill="#fed7aa" />
        <circle cx="52" cy="62" r="3" fill="#18181b" />
        <circle cx="68" cy="62" r="3" fill="#18181b" />
        <path d="M 54 75 Q 60 80 66 75" stroke="#9a3412" strokeWidth="2" fill="none" />
        <rect x="35" y="90" width="50" height="60" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        {isAltered('diff-chef-hat') ? (
          <g>
            <circle cx="60" cy="95" r="6" fill="#10b981" />
            <polygon points="60,95 48,88 50,102" fill="#059669" />
            <polygon points="60,95 72,88 70,102" fill="#059669" />
          </g>
        ) : (
          <g>
            <circle cx="60" cy="95" r="6" fill="#ef4444" />
            <polygon points="60,95 48,88 50,102" fill="#dc2626" />
            <polygon points="60,95 72,88 70,102" fill="#dc2626" />
          </g>
        )}
      </g>
    </svg>
  );
};

// =========================================================================
// SCENE 7: ห้องเรียนปฐมวัย (Classroom Scene)
// =========================================================================
export const ClassroomScene: React.FC<SceneProps> = ({ variant, activeDifferenceIds }) => {
  const isAltered = (id: string) => isDifferenceAltered(variant, id, activeDifferenceIds);

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="classWall" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fef08a" />
        </linearGradient>
      </defs>

      <rect width="500" height="500" rx="20" fill="url(#classWall)" />
      <rect x="0" y="360" width="500" height="140" fill="#fde047" stroke="#eab308" strokeWidth="2" />

      {/* Blackboard in Middle (Candidate 4: Blackboard Star at 50%, 18% -> cx: 250, cy: 90) */}
      <rect x="180" y="50" width="280" height="150" rx="8" fill="#166534" stroke="#a16207" strokeWidth="8" />
      <text x="210" y="110" fill="#ffffff" fontSize="24" fontWeight="bold">ABC 1 2 3</text>
      <text x="210" y="145" fill="#fde047" fontSize="18">🌟 สุขสันต์วันเรียนรู้</text>
      {isAltered('diff-blackboard-star') ? (
        <g transform="translate(250, 90)">
          <circle cx="0" cy="0" r="12" fill="#facc15" />
          <circle cx="-4" cy="-2" r="2" fill="#713f12" />
          <circle cx="4" cy="-2" r="2" fill="#713f12" />
        </g>
      ) : (
        <polygon points="250,75 254,85 264,86 256,93 259,103 250,97 241,103 244,93 236,86 246,85" fill="#fef08a" />
      )}

      {/* Candidate 1: Wall Clock (25%, 22%) -> cx: 125, cy: 110 */}
      <g id="class-clock">
        <circle cx="100" cy="90" r="38" fill="#ffffff" stroke="#0284c7" strokeWidth="5" />
        <circle cx="100" cy="90" r="3" fill="#000000" />
        {isAltered('diff-clock') ? (
          <g>
            <line x1="100" y1="90" x2="100" y2="68" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
            <line x1="100" y1="90" x2="100" y2="62" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            <line x1="100" y1="90" x2="78" y2="90" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
            <line x1="100" y1="90" x2="100" y2="65" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* Candidate 7: Backpack on Hook (12%, 45%) -> cx: 60, cy: 225 */}
      <g id="backpack" transform="translate(60, 225)">
        <circle cx="0" cy="-25" r="4" fill="#334155" />
        <rect x="-16" y="-18" width="32" height="42" rx="8" fill={isAltered('diff-backpack-hook') ? '#10b981' : '#facc15'} stroke="#713f12" strokeWidth="1.5" />
        <rect x="-10" y="2" width="20" height="14" rx="3" fill="#ffffff" opacity="0.8" />
      </g>

      {/* Teacher Desk in Center */}
      <rect x="120" y="300" width="260" height="80" rx="6" fill="#b45309" stroke="#78350f" strokeWidth="2" />

      {/* Candidate 5: Book Stack on Desk (20%, 65%) -> cx: 100, cy: 325 */}
      <g id="book-stack" transform="translate(100, 325)">
        <rect x="0" y="14" width="45" height="10" rx="2" fill="#10b981" />
        <rect x="2" y="4" width="40" height="10" rx="2" fill={isAltered('diff-book-stack') ? '#0284c7' : '#ef4444'} />
      </g>

      {/* Candidate 2: Globe on Desk (50%, 55%) -> cx: 250, cy: 275 */}
      <g id="class-globe">
        <line x1="250" y1="280" x2="250" y2="305" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="250" cy="308" rx="20" ry="6" fill="#334155" />
        <circle cx="250" cy="255" r="30" fill={isAltered('diff-globe') ? '#10b981' : '#0284c7'} stroke="#475569" strokeWidth="3" />
        <path d="M 235 245 Q 245 235 260 248 Q 255 265 240 260 Z" fill="#84cc16" opacity={isAltered('diff-globe') ? 0.4 : 0.9} />
      </g>

      {/* Candidate 3: Crayon Box (76%, 68%) -> cx: 380, cy: 340 */}
      <g id="class-crayons" transform="translate(350, 310)">
        <rect x="10" y="30" width="60" height="50" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        {isAltered('diff-crayons') ? (
          <g>
            <rect x="14" y="10" width="7" height="30" rx="1.5" fill="#ef4444" />
            <rect x="24" y="10" width="7" height="30" rx="1.5" fill="#f97316" />
            <rect x="34" y="10" width="7" height="30" rx="1.5" fill="#eab308" />
            <rect x="44" y="10" width="7" height="30" rx="1.5" fill="#10b981" />
            <rect x="54" y="10" width="7" height="30" rx="1.5" fill="#8b5cf6" />
          </g>
        ) : (
          <g>
            <rect x="18" y="10" width="10" height="30" rx="2" fill="#ef4444" />
            <rect x="34" y="10" width="10" height="30" rx="2" fill="#3b82f6" />
            <rect x="50" y="10" width="10" height="30" rx="2" fill="#10b981" />
          </g>
        )}
      </g>

      {/* Candidate 6: Plant Pot (82%, 68%) -> cx: 410, cy: 340 */}
      <g id="plant-pot" transform="translate(420, 310)">
        <polygon points="-12,40 -8,60 8,60 12,40" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
        {isAltered('diff-plant-pot') ? (
          <ellipse cx="0" cy="30" rx="8" ry="12" fill="#15803d" />
        ) : (
          <g>
            <circle cx="0" cy="32" r="7" fill="#f472b6" />
            <circle cx="0" cy="32" r="3" fill="#facc15" />
          </g>
        )}
      </g>
    </svg>
  );
};

// =========================================================================
// SCENE 8: หุบเขาไดโนเสาร์ (Dino Valley Scene)
// =========================================================================
export const DinoValleyScene: React.FC<SceneProps> = ({ variant, activeDifferenceIds }) => {
  const isAltered = (id: string) => isDifferenceAltered(variant, id, activeDifferenceIds);

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dinoSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>
      </defs>

      <rect width="500" height="500" rx="20" fill="url(#dinoSky)" />

      {/* Candidate 7: Flying Pterodactyl (60%, 18%) -> cx: 300, cy: 90 */}
      <g id="pterodactyl" transform="translate(300, 90)">
        {isAltered('diff-pterodactyl-sky') ? (
          <path d="M -20 0 Q -10 -15 0 -5 Q 10 -15 20 0 Z" fill="#ffffff" opacity="0.8" />
        ) : (
          <path d="M -24 -6 Q 0 -18 24 -6 Q 10 -2 0 4 Q -10 -2 -24 -6 Z" fill="#b45309" />
        )}
      </g>

      {/* Candidate 1: Volcano on Left (22%, 25%) -> cx: 110, cy: 125 */}
      <g id="dino-volcano">
        <polygon points="30,220 110,100 190,220" fill="#78350f" stroke="#451a03" strokeWidth="2" />
        {isAltered('diff-volcano') ? (
          <g>
            <polygon points="90,130 110,100 130,130" fill="#dc2626" />
            <path d="M 110 95 Q 120 60 100 40 Q 80 20 110 10" stroke="#71717a" strokeWidth="12" fill="none" opacity="0.6" strokeLinecap="round" />
            <circle cx="118" cy="80" r="5" fill="#f97316" />
            <circle cx="95" cy="70" r="4" fill="#ef4444" />
          </g>
        ) : (
          <polygon points="90,130 110,100 130,130" fill="#f8fafc" />
        )}
      </g>

      {/* Candidate 6: Cycad Palm with Coconuts (85%, 42%) -> cx: 425, cy: 210 */}
      <g id="palm-tree" transform="translate(425, 210)">
        <path d="M 0 100 Q 15 50 0 0" stroke="#78350f" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M 0 0 Q -25 -25 -40 -15" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M 0 0 Q 25 -25 40 -15" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" fill="none" />
        {!isAltered('diff-palm-coconuts') && (
          <g fill="#451a03">
            <circle cx="-5" cy="5" r="4.5" />
            <circle cx="5" cy="5" r="4.5" />
            <circle cx="0" cy="11" r="4" />
          </g>
        )}
      </g>

      {/* Prehistoric Ground */}
      <path d="M 0 320 Q 250 280 500 320 L 500 500 L 0 500 Z" fill="#65a30d" />

      {/* Gentle Long-Neck Dinosaur Center-Left */}
      <g id="long-neck-dino" transform="translate(180, 200)">
        <ellipse cx="100" cy="140" rx="60" ry="40" fill="#10b981" />
        <rect x="70" y="160" width="18" height="50" rx="6" fill="#059669" />
        <rect x="120" y="160" width="18" height="50" rx="6" fill="#059669" />
        <path d="M 60 130 Q 30 60 45 20 Q 55 10 65 25 Q 60 60 85 130 Z" fill="#10b981" />
        <circle cx="48" cy="20" r="14" fill="#10b981" />
        <circle cx="42" cy="18" r="3" fill="#ffffff" />
        <circle cx="42" cy="18" r="1.5" fill="#000000" />
      </g>

      {/* Candidate 4: Stegosaurus Back Plates (72%, 58%) -> cx: 360, cy: 290 */}
      <g id="stego-plates" transform="translate(360, 290)">
        {isAltered('diff-stego-plates') ? (
          <g fill="#a855f7">
            <polygon points="-15,0 -10,-14 -5,0" />
            <polygon points="-5,0 0,-18 5,0" />
            <polygon points="5,0 10,-14 15,0" />
          </g>
        ) : (
          <g fill="#f97316">
            <polygon points="-15,0 -10,-14 -5,0" />
            <polygon points="-5,0 0,-18 5,0" />
            <polygon points="5,0 10,-14 15,0" />
          </g>
        )}
      </g>

      {/* Candidate 2: Fern vs Flower (50%, 62%) -> cx: 250, cy: 310 */}
      <g id="dino-plant">
        {isAltered('diff-fern') ? (
          <g transform="translate(230, 290)">
            <line x1="20" y1="50" x2="20" y2="20" stroke="#16a34a" strokeWidth="4" />
            <circle cx="20" cy="20" r="14" fill="#a855f7" />
            <circle cx="20" cy="20" r="6" fill="#facc15" />
          </g>
        ) : (
          <g transform="translate(230, 290)">
            <path d="M 20 50 Q 5 20 0 0 Q 15 20 20 50" fill="#15803d" />
            <path d="M 20 50 Q 35 20 40 0 Q 25 20 20 50" fill="#15803d" />
          </g>
        )}
      </g>

      {/* Candidate 3: Dino Nest & Egg (76%, 70%) -> cx: 380, cy: 350 */}
      <g id="dino-egg" transform="translate(340, 310)">
        <ellipse cx="40" cy="55" rx="42" ry="16" fill="#78350f" />
        {isAltered('diff-dino-egg') ? (
          <g>
            <ellipse cx="40" cy="45" rx="22" ry="24" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="40" cy="26" r="14" fill="#84cc16" />
            <circle cx="35" cy="24" r="3" fill="#000000" />
            <circle cx="45" cy="24" r="3" fill="#000000" />
          </g>
        ) : (
          <g>
            <ellipse cx="40" cy="38" rx="22" ry="30" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="34" cy="32" r="4" fill="#84cc16" />
            <circle cx="48" cy="44" r="5" fill="#84cc16" />
          </g>
        )}
      </g>

      {/* Candidate 5: Dinosaur Footprint on Mud (42%, 85%) -> cx: 210, cy: 425 */}
      <g id="dino-footprint" transform="translate(210, 425)">
        {!isAltered('diff-dino-footprint') && (
          <g fill="#4d7c0f" opacity="0.8">
            <ellipse cx="0" cy="4" rx="10" ry="7" />
            <circle cx="-9" cy="-6" r="4" />
            <circle cx="0" cy="-9" r="4.5" />
            <circle cx="9" cy="-6" r="4" />
          </g>
        )}
      </g>
    </svg>
  );
};

// =========================================================================
// SCENE 9: สวนผลไม้ฉ่ำหวาน (Fruit Garden Scene)
// =========================================================================
export const FruitGardenScene: React.FC<SceneProps> = ({ variant, activeDifferenceIds }) => {
  const isAltered = (id: string) => isDifferenceAltered(variant, id, activeDifferenceIds);

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="orchardSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#ffedd5" />
        </linearGradient>
      </defs>

      <rect width="500" height="500" rx="20" fill="url(#orchardSky)" />

      {/* Candidate 5: Lemon on Tree (15%, 22%) -> cx: 75, cy: 110 */}
      <g id="lemon-branch" transform="translate(75, 110)">
        <path d="M -30 -30 Q 0 -15 30 0" stroke="#78350f" strokeWidth="6" fill="none" strokeLinecap="round" />
        <ellipse cx="0" cy="10" rx="16" ry="20" fill={isAltered('diff-lemon-tree') ? '#65a30d' : '#facc15'} stroke="#ca8a04" strokeWidth="1.5" />
      </g>

      {/* Orchard Grass & Table */}
      <path d="M 0 300 Q 250 270 500 300 L 500 500 L 0 500 Z" fill="#86efac" />
      <rect x="60" y="320" width="380" height="150" rx="10" fill="#b45309" stroke="#78350f" strokeWidth="3" />

      {/* Candidate 1: Butterfly (25%, 35%) -> cx: 125, cy: 175 */}
      <g id="fruit-butterfly" transform="translate(100, 150)">
        <ellipse cx="25" cy="25" rx="3" ry="12" fill="#18181b" />
        {isAltered('diff-butterfly-basket') ? (
          <g>
            <ellipse cx="14" cy="18" rx="12" ry="8" fill="#facc15" />
            <ellipse cx="36" cy="18" rx="12" ry="8" fill="#facc15" />
            <ellipse cx="16" cy="30" rx="9" ry="6" fill="#eab308" />
            <ellipse cx="34" cy="30" rx="9" ry="6" fill="#eab308" />
          </g>
        ) : (
          <g>
            <ellipse cx="14" cy="18" rx="12" ry="8" fill="#38bdf8" />
            <ellipse cx="36" cy="18" rx="12" ry="8" fill="#38bdf8" />
            <ellipse cx="16" cy="30" rx="9" ry="6" fill="#0284c7" />
            <ellipse cx="34" cy="30" rx="9" ry="6" fill="#0284c7" />
          </g>
        )}
      </g>

      {/* Picnic Basket */}
      <path d="M 180 320 Q 250 250 320 320 Z" fill="#d97706" stroke="#92400e" strokeWidth="2" />
      <rect x="170" y="320" width="160" height="40" rx="6" fill="#b45309" />

      {/* Candidate 3: Bananas in Basket (76%, 45%) -> cx: 380, cy: 225 */}
      <g id="fruit-bananas" transform="translate(340, 200)">
        <path d="M 10 40 Q 30 15 50 30" stroke="#facc15" strokeWidth="12" strokeLinecap="round" fill="none" />
        {!isAltered('diff-banana-count') && (
          <path d="M 14 55 Q 35 30 55 45" stroke="#eab308" strokeWidth="12" strokeLinecap="round" fill="none" />
        )}
      </g>

      {/* Candidate 4: Strawberry Platter (35%, 75%) -> cx: 175, cy: 375 */}
      <g id="strawberry-treat" transform="translate(175, 375)">
        <ellipse cx="0" cy="5" rx="18" ry="8" fill="#ffffff" opacity="0.9" />
        {isAltered('diff-strawberry-plate') ? (
          <g>
            <circle cx="-6" cy="2" r="6" fill="#ef4444" />
            <circle cx="6" cy="2" r="6" fill="#ef4444" />
            <path d="M -6 2 Q 0 -10 6 2" stroke="#15803d" strokeWidth="2" fill="none" />
          </g>
        ) : (
          <polygon points="-8,-4 8,-4 0,10" fill="#ef4444" />
        )}
      </g>

      {/* Candidate 2: Watermelon Plate (50%, 65%) -> cx: 250, cy: 325 */}
      <g id="fruit-watermelon" transform="translate(200, 310)">
        <ellipse cx="50" cy="50" rx="45" ry="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M 20 45 Q 50 75 80 45 Z" fill="#15803d" />
        {isAltered('diff-watermelon') ? (
          <g>
            <path d="M 24 45 Q 50 70 76 45 Z" fill="#facc15" />
            <circle cx="40" cy="50" r="2" fill="#000000" />
            <circle cx="50" cy="54" r="2" fill="#000000" />
            <circle cx="60" cy="50" r="2" fill="#000000" />
          </g>
        ) : (
          <g>
            <path d="M 24 45 Q 50 70 76 45 Z" fill="#ef4444" />
            <circle cx="40" cy="50" r="2" fill="#000000" />
            <circle cx="50" cy="54" r="2" fill="#000000" />
            <circle cx="60" cy="50" r="2" fill="#000000" />
          </g>
        )}
      </g>

      {/* Candidate 6: Grapes in Bowl (68%, 70%) -> cx: 340, cy: 350 */}
      <g id="grapes-bowl" transform="translate(340, 350)">
        <ellipse cx="0" cy="10" rx="20" ry="8" fill="#e2e8f0" />
        {[-8, 0, 8, -4, 4].map((gx, i) => (
          <circle
            key={i}
            cx={gx}
            cy={i < 3 ? 0 : 8}
            r="6"
            fill={isAltered('diff-grape-bunch') ? '#84cc16' : '#7e22ce'}
          />
        ))}
      </g>

      {/* Candidate 7: Watering Can (85%, 80%) -> cx: 425, cy: 400 */}
      <g id="watering-can" transform="translate(425, 400)">
        <rect x="-15" y="-12" width="30" height="24" rx="4" fill={isAltered('diff-watering-garden') ? '#f97316' : '#38bdf8'} />
        <line x1="15" y1="0" x2="28" y2="-10" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <path d="M -15 -8 Q -24 0 -15 8" stroke="#64748b" strokeWidth="3" fill="none" />
      </g>
    </svg>
  );
};

// =========================================================================
// SCENE 10: ปราสาทเจ้าหญิงสายรุ้ง (Fairytale Castle Scene)
// =========================================================================
export const FairytaleCastleScene: React.FC<SceneProps> = ({ variant, activeDifferenceIds }) => {
  const isAltered = (id: string) => isDifferenceAltered(variant, id, activeDifferenceIds);

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="castleSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ede9fe" />
          <stop offset="100%" stopColor="#fbcfe8" />
        </linearGradient>
      </defs>

      <rect width="500" height="500" rx="20" fill="url(#castleSky)" />

      {/* Rainbow Arc */}
      <path d="M -50 300 Q 250 -50 550 300" stroke="#f43f5e" strokeWidth="8" fill="none" opacity="0.6" />
      <path d="M -50 308 Q 250 -42 550 308" stroke="#fb923c" strokeWidth="8" fill="none" opacity="0.6" />
      <path d="M -50 316 Q 250 -34 550 316" stroke="#facc15" strokeWidth="8" fill="none" opacity="0.6" />
      <path d="M -50 324 Q 250 -26 550 324" stroke="#4ade80" strokeWidth="8" fill="none" opacity="0.6" />
      <path d="M -50 332 Q 250 -18 550 332" stroke="#38bdf8" strokeWidth="8" fill="none" opacity="0.6" />

      {/* Candidate 6: Magic Sparkle Stars along Rainbow (68%, 25%) -> cx: 340, cy: 125 */}
      <g id="sparkle-stars" transform="translate(340, 125)">
        {[[-15, -10], [15, 10], [5, -20]].map(([sx, sy], i) => (
          <circle
            key={i}
            cx={sx}
            cy={sy}
            r="4"
            fill={isAltered('diff-sparkle-stars') ? '#38bdf8' : '#facc15'}
          />
        ))}
      </g>

      {/* Candidate 3: Rainbow Cloud on Right (80%, 32%) -> cx: 400, cy: 160 */}
      <g id="castle-cloud">
        <circle cx="390" cy="160" r="25" fill="#ffffff" />
        <circle cx="415" cy="155" r="28" fill="#ffffff" />
        <circle cx="435" cy="165" r="22" fill="#ffffff" />
        {isAltered('diff-rainbow-cloud') && (
          <g>
            <polygon points="400,195 403,203 411,204 405,210 407,218 400,214 393,218 395,210 389,204 397,203" fill="#facc15" />
            <polygon points="425,190 427,196 433,197 428,202 430,208 425,205 420,208 421,202 417,197 423,196" fill="#facc15" />
          </g>
        )}
      </g>

      {/* Castle Base & Spire */}
      <rect x="180" y="240" width="140" height="180" fill="#f3e8ff" stroke="#c084fc" strokeWidth="2" />
      <rect x="150" y="200" width="40" height="220" fill="#e9d5ff" stroke="#c084fc" strokeWidth="2" />
      <polygon points="150,200 170,120 190,200" fill="#c084fc" />
      <rect x="310" y="200" width="40" height="220" fill="#e9d5ff" stroke="#c084fc" strokeWidth="2" />
      <polygon points="310,200 330,120 350,200" fill="#c084fc" />
      <polygon points="210,240 250,90 290,240" fill="#a855f7" />

      {/* Candidate 1: Castle Flag on Central Spire (50%, 14%) -> cx: 250, cy: 70 */}
      <g id="castle-flag">
        <line x1="250" y1="90" x2="250" y2="45" stroke="#9333ea" strokeWidth="3" />
        {isAltered('diff-castle-flag') ? (
          <polygon points="250,45 285,60 250,75" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
        ) : (
          <polygon points="250,45 285,60 250,75" fill="#f43f5e" />
        )}
      </g>

      {/* Candidate 5: Floating Magic Wand (35%, 48%) -> cx: 175, cy: 240 */}
      <g id="magic-wand" transform="translate(175, 240)">
        <line x1="-12" y1="18" x2="12" y2="-18" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        {isAltered('diff-magic-wand') ? (
          <path d="M 12 -18 L 8 -24 A 4 4 0 0 1 14 -28 A 4 4 0 0 1 20 -24 Z" fill="#ec4899" />
        ) : (
          <polygon points="12,-25 15,-18 22,-18 17,-13 19,-6 12,-10 5,-6 7,-13 2,-18 9,-18" fill="#facc15" />
        )}
      </g>

      {/* Candidate 4: Castle Arched Door (50%, 72%) -> cx: 250, cy: 360 */}
      <g id="castle-door" transform="translate(250, 360)">
        <path d="M -25 40 L -25 0 Q 0 -30 25 0 L 25 40 Z" fill={isAltered('diff-castle-door') ? '#fef08a' : '#78350f'} stroke="#451a03" strokeWidth="2" />
        {isAltered('diff-castle-door') ? (
          <line x1="0" y1="-20" x2="0" y2="40" stroke="#ca8a04" strokeWidth="2.5" />
        ) : (
          <circle cx="-10" cy="15" r="3" fill="#facc15" />
        )}
      </g>

      {/* Candidate 2: Unicorn vs Horse on Meadow (22%, 65%) -> cx: 110, cy: 325 */}
      <g id="castle-unicorn" transform="translate(60, 270)">
        <ellipse cx="60" cy="70" rx="40" ry="26" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="35" y="85" width="10" height="40" rx="4" fill="#f1f5f9" />
        <rect x="75" y="85" width="10" height="40" rx="4" fill="#f1f5f9" />
        <path d="M 40 70 Q 20 40 30 15 Q 40 10 50 20 Q 55 45 65 70 Z" fill="#f8fafc" />
        <circle cx="28" cy="22" r="14" fill="#f8fafc" />
        <circle cx="22" cy="20" r="2.5" fill="#000000" />
        {!isAltered('diff-unicorn-horn') && (
          <polygon points="25,12 30,-15 35,12" fill="#ec4899" stroke="#f472b6" strokeWidth="1.5" />
        )}
      </g>

      {/* Candidate 7: Swan / Duck in Moat (75%, 78%) -> cx: 375, cy: 390 */}
      <g id="swan-moat" transform="translate(375, 390)">
        <ellipse cx="0" cy="8" rx="25" ry="8" fill="#38bdf8" opacity="0.6" />
        {isAltered('diff-swan-moat') ? (
          <g>
            <ellipse cx="0" cy="0" rx="14" ry="10" fill="#facc15" />
            <circle cx="-8" cy="-5" r="7" fill="#facc15" />
            <polygon points="-15,-4 -20,-3 -15,-1" fill="#f97316" />
          </g>
        ) : (
          <g>
            <ellipse cx="0" cy="0" rx="16" ry="11" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M -8 0 Q -12 -18 -6 -20 Q 0 -18 -4 0" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="-8,-18 -14,-17 -8,-15" fill="#f97316" />
          </g>
        )}
      </g>
    </svg>
  );
};

import { ExtraSpotSceneRenderer } from './extraSpotScenes';

// =========================================================================
// UNIFIED SCENE RENDERER FOR ALL 20 LEVELS
// =========================================================================
export const SpotSceneRenderer: React.FC<{
  levelId: string;
  variant: 'left' | 'right';
  foundDifferenceIds: string[];
  activeDifferenceIds?: string[];
}> = ({ levelId, variant, foundDifferenceIds, activeDifferenceIds }) => {
  if (levelId.startsWith('spot-ext-')) {
    return (
      <ExtraSpotSceneRenderer
        levelId={levelId}
        variant={variant}
        foundDifferenceIds={foundDifferenceIds}
        activeDifferenceIds={activeDifferenceIds}
      />
    );
  }

  switch (levelId) {
    case 'spot-herbal-bottles':
      return <HerbalBottlesScene variant={variant} foundDifferenceIds={foundDifferenceIds} activeDifferenceIds={activeDifferenceIds} />;
    case 'spot-k1-farm':
      return <FarmScene variant={variant} foundDifferenceIds={foundDifferenceIds} activeDifferenceIds={activeDifferenceIds} />;
    case 'spot-k2-park':
      return <ParkScene variant={variant} foundDifferenceIds={foundDifferenceIds} activeDifferenceIds={activeDifferenceIds} />;
    case 'spot-k3-ocean':
      return <OceanScene variant={variant} foundDifferenceIds={foundDifferenceIds} activeDifferenceIds={activeDifferenceIds} />;
    case 'spot-space-station':
      return <SpaceScene variant={variant} foundDifferenceIds={foundDifferenceIds} activeDifferenceIds={activeDifferenceIds} />;
    case 'spot-bakery':
      return <BakeryScene variant={variant} foundDifferenceIds={foundDifferenceIds} activeDifferenceIds={activeDifferenceIds} />;
    case 'spot-classroom':
      return <ClassroomScene variant={variant} foundDifferenceIds={foundDifferenceIds} activeDifferenceIds={activeDifferenceIds} />;
    case 'spot-dino-valley':
      return <DinoValleyScene variant={variant} foundDifferenceIds={foundDifferenceIds} activeDifferenceIds={activeDifferenceIds} />;
    case 'spot-fruit-garden':
      return <FruitGardenScene variant={variant} foundDifferenceIds={foundDifferenceIds} activeDifferenceIds={activeDifferenceIds} />;
    case 'spot-fairytale-castle':
      return <FairytaleCastleScene variant={variant} foundDifferenceIds={foundDifferenceIds} activeDifferenceIds={activeDifferenceIds} />;
    default:
      return <HerbalBottlesScene variant={variant} foundDifferenceIds={foundDifferenceIds} activeDifferenceIds={activeDifferenceIds} />;
  }
};
