import type { CoverVariant } from "@/content/catalog";
import { Y_POINTS } from "./Logo";

/**
 * Art-directed SVG covers used until real project visuals are supplied.
 * They are always labelled as illustrations in the UI — never presented as
 * screenshots of delivered work.
 */

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const C = {
  bg: "#080c17",
  bg2: "#0c1222",
  panel: "#111a2f",
  line: "#26334f",
  signal: "#2f6bff",
  soft: "#8fb0ff",
  cyan: "#6fd3ff",
  fg: "#f2f5fa",
  muted: "#6d7a94",
};

function Frame({ id, children, label }: { id: string; children: React.ReactNode; label?: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.75" cy="0.15" r="1">
          <stop offset="0" stopColor="#13234d" />
          <stop offset="0.55" stopColor={C.bg} />
          <stop offset="1" stopColor="#04060c" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={C.soft} strokeOpacity="0.06" />
        </pattern>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width="800" height="600" fill={`url(#${id}-bg)`} />
      <rect width="800" height="600" fill={`url(#${id}-grid)`} />
      {children}
      {label && (
        <text x="40" y="560" fill={C.muted} fontFamily="ui-monospace, monospace" fontSize="14" letterSpacing="3">
          {label.toUpperCase()}
        </text>
      )}
    </>
  );
}

function QR({ x, y, size, seed }: { x: number; y: number; size: number; seed: number }) {
  const n = 21;
  const cell = size / n;
  const r = rng(seed);
  const finder = (fx: number, fy: number) => (
    <g key={`${fx}-${fy}`}>
      <rect x={x + fx * cell} y={y + fy * cell} width={cell * 7} height={cell * 7} fill={C.fg} />
      <rect x={x + (fx + 1) * cell} y={y + (fy + 1) * cell} width={cell * 5} height={cell * 5} fill={C.bg} />
      <rect x={x + (fx + 2) * cell} y={y + (fy + 2) * cell} width={cell * 3} height={cell * 3} fill={C.fg} />
    </g>
  );
  const cells = [];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const inFinder = (i < 8 && j < 8) || (i > 12 && j < 8) || (i < 8 && j > 12);
      if (!inFinder && r() > 0.52) cells.push(<rect key={`${i}-${j}`} x={x + i * cell} y={y + j * cell} width={cell} height={cell} fill={C.fg} />);
    }
  return (
    <g>
      <rect x={x - cell} y={y - cell} width={size + cell * 2} height={size + cell * 2} fill={C.bg} />
      {cells}
      {finder(0, 0)}
      {finder(14, 0)}
      {finder(0, 14)}
    </g>
  );
}

function WebCover({ id, label }: { id: string; label?: string }) {
  return (
    <Frame id={id} label={label}>
      <ellipse cx="560" cy="200" rx="200" ry="120" fill={C.signal} opacity="0.35" filter={`url(#${id}-glow)`} />
      <g transform="translate(120 80)">
        <rect width="560" height="400" rx="6" fill={C.bg2} stroke={C.line} />
        <rect width="560" height="34" rx="6" fill={C.panel} />
        {[0, 1, 2].map((i) => <circle key={i} cx={20 + i * 16} cy="17" r="4.5" fill={C.line} />)}
        <rect x="120" y="11" width="320" height="12" rx="6" fill={C.bg} />
        <rect x="32" y="62" width="70" height="10" fill={C.fg} />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={300 + i * 52} y="64" width="38" height="6" fill={C.muted} />)}
        <rect x="32" y="112" width="280" height="30" fill={C.fg} />
        <rect x="32" y="152" width="220" height="30" fill={C.fg} />
        <rect x="32" y="200" width="250" height="8" fill={C.muted} />
        <rect x="32" y="216" width="200" height="8" fill={C.muted} />
        <rect x="32" y="248" width="120" height="36" fill={C.signal} />
        <rect x="164" y="248" width="100" height="36" fill="none" stroke={C.line} />
        <rect x="336" y="104" width="196" height="196" fill={C.panel} />
        <rect x="336" y="104" width="196" height="196" fill={C.signal} opacity="0.18" />
        <path d="M356 270 L410 200 L450 245 L480 215 L512 270 Z" fill={C.soft} opacity="0.5" />
        <circle cx="480" cy="150" r="16" fill={C.cyan} opacity="0.7" />
        {[0, 1, 2].map((i) => <rect key={i} x={32 + i * 172} y="330" width="156" height="46" fill={C.panel} />)}
      </g>
      <g transform="translate(600 300)">
        <rect width="130" height="240" rx="16" fill={C.bg} stroke={C.soft} strokeOpacity="0.5" />
        <rect x="14" y="30" width="60" height="8" fill={C.fg} />
        <rect x="14" y="54" width="100" height="16" fill={C.fg} />
        <rect x="14" y="76" width="80" height="16" fill={C.fg} />
        <rect x="14" y="104" width="102" height="70" fill={C.panel} />
        <rect x="14" y="188" width="102" height="28" fill={C.signal} />
      </g>
    </Frame>
  );
}

function MenuCover({ id, label }: { id: string; label?: string }) {
  return (
    <Frame id={id} label={label}>
      <g transform="translate(330 70)">
        <rect width="420" height="250" rx="4" fill={C.bg2} stroke={C.line} />
        <rect x="20" y="20" width="120" height="14" fill={C.soft} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(20 ${60 + i * 34})`}>
            <rect width={140 + ((i * 37) % 60)} height="10" fill={C.fg} opacity="0.85" />
            <rect x="330" width="50" height="10" fill={C.signal} />
          </g>
        ))}
        <rect x="200" y="240" width="20" height="40" fill={C.line} />
        <rect x="150" y="278" width="120" height="6" fill={C.line} />
      </g>
      <ellipse cx="250" cy="330" rx="150" ry="200" fill={C.signal} opacity="0.3" filter={`url(#${id}-glow)`} />
      <g transform="translate(150 110)">
        <rect width="200" height="390" rx="26" fill={C.bg} stroke={C.soft} strokeOpacity="0.6" strokeWidth="1.5" />
        <rect x="70" y="14" width="60" height="8" rx="4" fill={C.panel} />
        <rect x="20" y="44" width="160" height="70" fill={C.signal} opacity="0.35" />
        <rect x="20" y="128" width="70" height="10" fill={C.fg} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(20 ${156 + i * 42})`}>
            <rect width="34" height="34" fill={C.panel} />
            <rect x="44" y="6" width={70 - (i % 3) * 10} height="8" fill={C.fg} />
            <rect x="44" y="20" width="50" height="6" fill={C.muted} />
            <rect x="130" y="8" width="30" height="8" fill={C.soft} />
          </g>
        ))}
      </g>
      <QR x={430} y={360} size={150} seed={7} />
    </Frame>
  );
}

function Editor3DCover({ id, label }: { id: string; label?: string }) {
  const s = 2.1;
  const o = { x: 300, y: 150 };
  const d = { x: 38, y: -30 };
  const p = ([x, y]: [number, number], dx = 0, dy = 0) => `${x * s + o.x + dx},${y * s + o.y + dy}`;
  return (
    <Frame id={id} label={label}>
      <g stroke={C.soft} strokeOpacity="0.14">
        {Array.from({ length: 13 }, (_, i) => <line key={`v${i}`} x1={400 + (i - 6) * 40} y1="460" x2={400 + (i - 6) * 120} y2="600" />)}
        {[460, 490, 530, 580].map((y) => <line key={y} x1="0" y1={y} x2="800" y2={y} />)}
      </g>
      <polygon points={Y_POINTS.map((v) => p(v)).join(" ")} fill={C.signal} opacity="0.5" filter={`url(#${id}-glow)`} />
      {Y_POINTS.map((v, i) => {
        const w = Y_POINTS[(i + 1) % Y_POINTS.length];
        return <polygon key={i} points={[p(v), p(w), p(w, d.x, d.y), p(v, d.x, d.y)].join(" ")} fill="#101b38" stroke={C.soft} strokeOpacity="0.6" />;
      })}
      <polygon points={Y_POINTS.map((v) => p(v)).join(" ")} fill={C.fg} stroke={C.cyan} strokeWidth="1.5" />
      <g transform="translate(250 430)" strokeWidth="3" strokeLinecap="round">
        <line x1="0" y1="0" x2="70" y2="0" stroke={C.signal} />
        <line x1="0" y1="0" x2="0" y2="-70" stroke={C.cyan} />
        <line x1="0" y1="0" x2="-40" y2="30" stroke={C.fg} />
        <circle r="6" fill={C.fg} />
      </g>
      <g transform="translate(600 60)">
        <rect width="170" height="300" fill={C.bg2} stroke={C.line} />
        <rect x="16" y="18" width="80" height="8" fill={C.fg} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(16 ${54 + i * 58})`}>
            <rect width="60" height="6" fill={C.muted} />
            <rect y="20" width="138" height="4" fill={C.line} />
            <rect y="20" width={40 + i * 26} height="4" fill={C.signal} />
            <circle cx={40 + i * 26} cy="22" r="7" fill={C.fg} />
          </g>
        ))}
      </g>
      <g transform="translate(40 40)">
        <rect width="54" height="200" fill={C.bg2} stroke={C.line} />
        {[0, 1, 2, 3].map((i) => <rect key={i} x="14" y={16 + i * 46} width="26" height="26" fill={i === 1 ? C.signal : C.panel} />)}
      </g>
      <text x="600" y="395" fill={C.soft} fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="2">logo.svg — 38 MM</text>
    </Frame>
  );
}

function PosCover({ id, label }: { id: string; label?: string }) {
  const r = rng(42);
  const bars = Array.from({ length: 12 }, () => 40 + r() * 120);
  return (
    <Frame id={id} label={label}>
      <g transform="translate(60 60)">
        <rect width="680" height="440" rx="6" fill={C.bg2} stroke={C.line} />
        <rect width="140" height="440" fill={C.panel} />
        <rect x="20" y="24" width="70" height="12" fill={C.fg} />
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x="20" y={74 + i * 36} width={i === 1 ? 100 : 80} height="10" fill={i === 1 ? C.signal : C.muted} opacity={i === 1 ? 1 : 0.6} />)}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${168 + i * 166} 28)`}>
            <rect width="150" height="80" fill={C.panel} />
            <rect x="16" y="18" width="60" height="6" fill={C.muted} />
            <rect x="16" y="38" width={70 + i * 10} height="18" fill={C.fg} />
          </g>
        ))}
        <g transform="translate(168 132)">
          <rect width="316" height="200" fill={C.panel} />
          {bars.map((h, i) => (
            <rect key={i} x={18 + i * 24} y={180 - h} width="14" height={h} fill={i === 9 ? C.cyan : C.signal} opacity={i === 9 ? 1 : 0.75} />
          ))}
        </g>
        <g transform="translate(500 132)">
          <rect width="150" height="280" fill={C.panel} />
          {Array.from({ length: 7 }, (_, i) => (
            <g key={i} transform={`translate(14 ${18 + i * 30})`}>
              <rect width={60 + ((i * 23) % 40)} height="7" fill={C.fg} opacity="0.8" />
              <rect x="96" width="26" height="7" fill={C.soft} />
            </g>
          ))}
          <rect x="14" y="236" width="122" height="30" fill={C.signal} />
        </g>
        <g transform="translate(168 352)">
          {Array.from({ length: 46 }, (_, i) => (
            <rect key={i} x={i * 6.8} y="0" width={r() > 0.5 ? 3 : 1.5} height="52" fill={C.fg} opacity="0.85" />
          ))}
        </g>
      </g>
    </Frame>
  );
}

function PharmacyCover({ id, label }: { id: string; label?: string }) {
  const cross = "M-30 -90 H30 V-30 H90 V30 H30 V90 H-30 V30 H-90 V-30 H-30 Z";
  return (
    <Frame id={id} label={label}>
      <g transform="translate(260 280)">
        <path d={cross} fill={C.cyan} opacity="0.55" filter={`url(#${id}-glow)`} />
        <path d={cross} transform="translate(16 -14)" fill="#0f2140" stroke={C.soft} strokeOpacity="0.6" />
        <path d={cross} fill={C.fg} stroke={C.cyan} strokeWidth="2" />
        <path d={cross} fill="none" stroke={C.signal} strokeWidth="1" transform="scale(0.78)" />
      </g>
      <g stroke={C.soft} strokeOpacity="0.35" strokeDasharray="4 6">
        <line x1="360" y1="240" x2="500" y2="150" />
        <line x1="360" y1="320" x2="500" y2="380" />
      </g>
      <g transform="translate(500 90)">
        <rect width="240" height="150" fill={C.bg2} stroke={C.line} />
        <rect x="18" y="20" width="90" height="10" fill={C.fg} />
        <path d="M30 120 C 60 60, 100 60, 120 90 S 180 120, 220 60" fill="none" stroke={C.signal} strokeWidth="2" />
        <circle cx="200" cy="40" r="10" fill={C.cyan} />
        <path d="M200 52 L200 64" stroke={C.cyan} strokeWidth="2" />
      </g>
      <g transform="translate(500 300)">
        <rect width="240" height="200" fill={C.bg2} stroke={C.line} />
        <rect x="18" y="18" width="150" height="34" rx="10" fill={C.panel} />
        <rect x="72" y="66" width="150" height="34" rx="10" fill={C.signal} opacity="0.85" />
        <rect x="18" y="114" width="120" height="34" rx="10" fill={C.panel} />
        <rect x="18" y="164" width="204" height="20" fill={C.line} />
      </g>
    </Frame>
  );
}

function BrandCover({ id, label }: { id: string; label?: string }) {
  const s = 1.6;
  return (
    <Frame id={id} label={label}>
      <ellipse cx="300" cy="300" rx="220" ry="160" fill={C.signal} opacity="0.35" filter={`url(#${id}-glow)`} />
      <g transform="translate(110 120)">
        <rect width="380" height="360" fill={C.bg2} stroke={C.line} />
        <g transform="translate(40 40)">
          <polygon points={Y_POINTS.map(([x, y]) => `${x * s + 24},${y * s - 18}`).join(" ")} fill="none" stroke={C.signal} strokeWidth="1.5" />
          <polygon points={Y_POINTS.map(([x, y]) => `${x * s},${y * s}`).join(" ")} fill={C.fg} />
        </g>
        <text x="40" y="300" fill={C.fg} fontFamily="ui-sans-serif, system-ui" fontSize="54" fontWeight="600" letterSpacing="-2">YESIR</text>
        <text x="42" y="330" fill={C.muted} fontFamily="ui-monospace, monospace" fontSize="14" letterSpacing="9">DESIGN</text>
      </g>
      <g transform="translate(540 90)">
        <rect width="200" height="380" rx="22" fill={C.bg} stroke={C.soft} strokeOpacity="0.5" />
        <rect x="16" y="40" width="168" height="168" fill={C.signal} />
        <rect x="32" y="128" width="110" height="20" fill={C.fg} />
        <rect x="32" y="158" width="80" height="20" fill={C.fg} />
        <rect x="16" y="226" width="120" height="10" fill={C.fg} />
        <rect x="16" y="246" width="150" height="8" fill={C.muted} />
        <rect x="16" y="300" width="168" height="40" fill={C.panel} stroke={C.line} />
      </g>
    </Frame>
  );
}

export function ProjectCover({
  variant,
  label,
  alt,
  className,
  id,
}: {
  variant: CoverVariant;
  label?: string;
  alt: string;
  className?: string;
  /** Unique id prefix (SVG defs) — must be unique on the page. */
  id: string;
}) {
  const Cover = { web: WebCover, menu: MenuCover, editor3d: Editor3DCover, pos: PosCover, pharmacy: PharmacyCover, brand: BrandCover }[variant];
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label={alt} preserveAspectRatio="xMidYMid slice" direction="ltr">
      <Cover id={id} label={label} />
    </svg>
  );
}
