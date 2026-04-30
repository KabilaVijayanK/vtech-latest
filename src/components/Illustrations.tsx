// Distinct abstract industrial SVG icons per product. All use currentColor for primary lines.
import { JSX } from "react";

const base = "w-full h-full";
const stroke = "hsl(var(--primary))";
const ink = "hsl(var(--text-primary))";
const muted = "hsl(var(--text-muted))";

type Props = { className?: string };

export const ConveyorHero = ({ className = "" }: Props) => (
  <svg viewBox="0 0 600 480" className={className} fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="600" height="480" fill="url(#hg)" />
    {/* Grid */}
    <g opacity="0.35" stroke="hsl(var(--primary))" strokeWidth="0.5">
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="480" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} />
      ))}
    </g>
    {/* Conveyor frame */}
    <g>
      {/* legs */}
      <rect x="80" y="320" width="8" height="100" fill={ink} />
      <rect x="500" y="320" width="8" height="100" fill={ink} />
      <rect x="290" y="340" width="8" height="80" fill={ink} />
      {/* belt frame */}
      <rect x="60" y="220" width="480" height="100" rx="4" fill="white" stroke={ink} strokeWidth="2" />
      {/* rollers */}
      <circle cx="100" cy="270" r="40" fill="white" stroke={stroke} strokeWidth="3" />
      <circle cx="500" cy="270" r="40" fill="white" stroke={stroke} strokeWidth="3" />
      <circle cx="100" cy="270" r="6" fill={stroke} />
      <circle cx="500" cy="270" r="6" fill={stroke} />
      {/* belt */}
      <path d="M100 230 L500 230" stroke={stroke} strokeWidth="3" />
      <path d="M100 310 L500 310" stroke={stroke} strokeWidth="3" />
      <path d="M100 230 A40 40 0 0 0 60 270 A40 40 0 0 0 100 310" stroke={stroke} strokeWidth="3" />
      <path d="M500 230 A40 40 0 0 1 540 270 A40 40 0 0 1 500 310" stroke={stroke} strokeWidth="3" />
      {/* moving dashes */}
      <path className="belt-dash" d="M110 245 L490 245" stroke="hsl(var(--primary-dark))" strokeWidth="2" />
      <path className="belt-dash" d="M490 295 L110 295" stroke="hsl(var(--primary-dark))" strokeWidth="2" />
      {/* boxes on belt */}
      <g>
        <rect x="180" y="190" width="50" height="40" fill="hsl(var(--primary))" />
        <rect x="280" y="195" width="40" height="35" fill="hsl(var(--primary-dark))" />
        <rect x="380" y="185" width="55" height="45" fill="hsl(var(--primary))" />
        <rect x="180" y="190" width="50" height="40" fill="none" stroke={ink} strokeWidth="1.5" />
        <rect x="280" y="195" width="40" height="35" fill="none" stroke={ink} strokeWidth="1.5" />
        <rect x="380" y="185" width="55" height="45" fill="none" stroke={ink} strokeWidth="1.5" />
      </g>
      {/* annotations */}
      <g stroke={muted} strokeWidth="1" fontSize="10" fontFamily="Barlow, sans-serif" fill={muted}>
        <line x1="60" y1="160" x2="540" y2="160" />
        <line x1="60" y1="155" x2="60" y2="165" />
        <line x1="540" y1="155" x2="540" y2="165" />
        <text x="280" y="152" textAnchor="middle" letterSpacing="2">CUSTOM LENGTH</text>
      </g>
    </g>
  </svg>
);

// Common wrapper for product icons
const PIcon = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <svg viewBox="0 0 200 140" className={base} fill="none" aria-hidden="true">
    <rect x="0" y="0" width="200" height="140" fill="hsl(var(--primary-tint))" opacity="0.4" />
    {children}
  </svg>
);

export const IconSlatChain = () => (
  <PIcon>
    <g stroke={stroke} strokeWidth="2">
      <rect x="20" y="60" width="160" height="30" fill="white" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={22 + i * 20} y="62" width="18" height="26" fill="hsl(var(--primary-tint))" />
      ))}
      <circle cx="30" cy="75" r="14" fill="white" />
      <circle cx="170" cy="75" r="14" fill="white" />
      <circle cx="30" cy="75" r="3" fill={stroke} />
      <circle cx="170" cy="75" r="3" fill={stroke} />
      <line x1="20" y1="105" x2="180" y2="105" stroke={ink} />
    </g>
  </PIcon>
);

export const IconRoller = () => (
  <PIcon>
    <g stroke={stroke} strokeWidth="2">
      <rect x="14" y="58" width="172" height="34" fill="white" />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={28 + i * 19} cy="75" r="9" fill="white" stroke={stroke} />
      ))}
      <line x1="14" y1="105" x2="186" y2="105" stroke={ink} />
      <rect x="60" y="36" width="40" height="22" fill="hsl(var(--primary))" />
      <rect x="110" y="40" width="34" height="18" fill="hsl(var(--primary-dark))" />
    </g>
  </PIcon>
);

export const IconBelt = () => (
  <PIcon>
    <g stroke={stroke} strokeWidth="2">
      <circle cx="34" cy="75" r="20" fill="white" />
      <circle cx="166" cy="75" r="20" fill="white" />
      <line x1="34" y1="55" x2="166" y2="55" />
      <line x1="34" y1="95" x2="166" y2="95" />
      <path d="M34 55 A20 20 0 0 0 14 75 A20 20 0 0 0 34 95" />
      <path d="M166 55 A20 20 0 0 1 186 75 A20 20 0 0 1 166 95" />
      <circle cx="34" cy="75" r="4" fill={stroke} />
      <circle cx="166" cy="75" r="4" fill={stroke} />
      <rect x="80" y="38" width="40" height="17" fill="hsl(var(--primary))" />
    </g>
  </PIcon>
);

export const IconModular = () => (
  <PIcon>
    <g stroke={stroke} strokeWidth="2" fill="white">
      <path d="M20 90 Q60 50 100 70 T180 60" strokeWidth="22" stroke="hsl(var(--primary-tint))" fill="none" />
      <path d="M20 90 Q60 50 100 70 T180 60" />
      {Array.from({ length: 12 }).map((_, i) => {
        const t = i / 11;
        const x = 20 + 160 * t;
        const y = 90 - 40 * Math.sin(Math.PI * t);
        return <circle key={i} cx={x} cy={y} r="2.5" fill={stroke} stroke="none" />;
      })}
    </g>
  </PIcon>
);

export const IconTurntable = () => (
  <PIcon>
    <g stroke={stroke} strokeWidth="2">
      <circle cx="100" cy="75" r="40" fill="white" />
      <circle cx="100" cy="75" r="28" fill="hsl(var(--primary-tint))" />
      <line x1="100" y1="35" x2="100" y2="115" />
      <line x1="60" y1="75" x2="140" y2="75" />
      <path d="M100 35 A40 40 0 0 1 140 75" stroke={ink} strokeWidth="3" fill="none" />
      <polygon points="138,68 148,75 138,82" fill={ink} />
      <rect x="14" y="68" width="36" height="14" fill="hsl(var(--primary))" />
      <rect x="150" y="68" width="36" height="14" fill="hsl(var(--primary-dark))" />
    </g>
  </PIcon>
);

export const IconCooling = () => (
  <PIcon>
    <g stroke={stroke} strokeWidth="2">
      <rect x="18" y="50" width="164" height="50" fill="white" />
      <line x1="18" y1="65" x2="182" y2="65" />
      <line x1="18" y1="85" x2="182" y2="85" />
      {[40, 70, 100, 130, 160].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 30 Q${x + 5} 38 ${x} 46`} stroke="hsl(var(--primary-dark))" fill="none" />
          <path d={`M${x + 8} 30 Q${x + 13} 38 ${x + 8} 46`} stroke="hsl(var(--primary-dark))" fill="none" />
        </g>
      ))}
      <line x1="18" y1="110" x2="182" y2="110" stroke={ink} />
    </g>
  </PIcon>
);

export const IconIncline = () => (
  <PIcon>
    <g stroke={stroke} strokeWidth="2">
      <path d="M20 110 L180 30" strokeWidth="14" stroke="hsl(var(--primary-tint))" />
      <path d="M20 110 L180 30" />
      <circle cx="24" cy="110" r="10" fill="white" />
      <circle cx="180" cy="30" r="10" fill="white" />
      <rect x="70" y="60" width="20" height="20" fill="hsl(var(--primary))" transform="rotate(-26 80 70)" />
      <rect x="120" y="38" width="20" height="20" fill="hsl(var(--primary-dark))" transform="rotate(-26 130 48)" />
      <line x1="20" y1="120" x2="180" y2="120" stroke={ink} />
    </g>
  </PIcon>
);

export const IconIdler = () => (
  <PIcon>
    <g stroke={stroke} strokeWidth="2">
      <line x1="14" y1="55" x2="186" y2="40" stroke={ink} strokeDasharray="2 3" />
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i}>
          <circle cx={22 + i * 18} cy={75 - i * 1.4} r="7" fill="white" stroke={stroke} />
          <line x1={22 + i * 18} y1={88 - i * 1.4} x2={22 + i * 18} y2={108} stroke={ink} />
        </g>
      ))}
      <line x1="14" y1="120" x2="186" y2="120" stroke={ink} />
    </g>
  </PIcon>
);

export const IconBagClose = () => (
  <PIcon>
    <g stroke={stroke} strokeWidth="2">
      <rect x="18" y="60" width="120" height="34" fill="white" />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={28 + i * 20} cy="77" r="7" fill="white" stroke={stroke} />
      ))}
      <rect x="60" y="32" width="36" height="28" fill="hsl(var(--primary))" />
      <path d="M60 32 L78 22 L96 32" stroke={ink} fill="none" />
      <rect x="138" y="38" width="42" height="58" fill="white" stroke={ink} />
      <line x1="148" y1="50" x2="172" y2="50" />
      <line x1="148" y1="60" x2="172" y2="60" />
      <circle cx="160" cy="78" r="8" fill="hsl(var(--primary))" />
      <line x1="18" y1="105" x2="182" y2="105" stroke={ink} />
    </g>
  </PIcon>
);

export const PRODUCT_ICON: Record<string, () => JSX.Element> = {
  "slat-chain": IconSlatChain,
  roller: IconRoller,
  belt: IconBelt,
  modular: IconModular,
  turntable: IconTurntable,
  cooling: IconCooling,
  incline: IconIncline,
  idler: IconIdler,
  "bag-closing": IconBagClose,
};

// Pillar icons
export const IconPrecision = () => (
  <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
    <circle cx="24" cy="24" r="11" stroke="currentColor" strokeWidth="2" />
    <circle cx="24" cy="24" r="4" fill="currentColor" />
    <line x1="24" y1="2" x2="24" y2="10" stroke="currentColor" strokeWidth="2" />
    <line x1="24" y1="38" x2="24" y2="46" stroke="currentColor" strokeWidth="2" />
    <line x1="2" y1="24" x2="10" y2="24" stroke="currentColor" strokeWidth="2" />
    <line x1="38" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const IconShield = () => (
  <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" aria-hidden="true">
    <path d="M24 4 L42 12 V24 C42 34 34 42 24 44 C14 42 6 34 6 24 V12 Z" stroke="currentColor" strokeWidth="2" />
    <path d="M16 24 L22 30 L34 18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const IconHandshake = () => (
  <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" aria-hidden="true">
    <path d="M4 22 L12 14 L22 22 L18 28 L10 28 Z" stroke="currentColor" strokeWidth="2" />
    <path d="M44 22 L36 14 L26 22 L30 28 L38 28 Z" stroke="currentColor" strokeWidth="2" />
    <path d="M18 28 L24 34 L30 28" stroke="currentColor" strokeWidth="2" />
    <path d="M22 22 L26 26 L30 22" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const DiagonalPattern = ({ className = "" }: Props) => (
  <svg className={className} aria-hidden="true">
    <defs>
      <pattern id="diag" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="14" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#diag)" />
  </svg>
);
