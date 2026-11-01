import { Y_POINTS } from "./Logo";

/**
 * "Du pixel à la façade": a low-resolution pixel Y is projected into a
 * physical, illuminated channel letter, drawn like a fabrication blueprint.
 * Pure SVG + CSS animation (no JavaScript).
 */

const PIXEL_MASK = [
  "XX.....XX",
  ".XX...XX.",
  "..XX.XX..",
  "...XXX...",
  "...XXX...",
  "...XXX...",
  "...XXX...",
  "...XXX...",
  "...XXX...",
  "...XXX...",
  "...XXX...",
];

const S = 3; // scale of the big letter
const O = { x: 262, y: 184 }; // front-face origin
const D = { x: 30, y: -24 }; // extrusion depth

const pt = ([x, y]: [number, number], dx = 0, dy = 0) => [x * S + O.x + dx, y * S + O.y + dy] as const;
const poly = (dx = 0, dy = 0) => Y_POINTS.map((p) => pt(p, dx, dy).join(",")).join(" ");

export function HeroVisual({ title }: { title: string }) {
  const pitch = 20;
  const grid = { x: 36, y: 48 };
  return (
    <svg viewBox="0 0 640 640" className="h-auto w-full" role="img" aria-label={title} direction="ltr">
      <defs>
        <linearGradient id="hv-face" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#dfe8ff" />
          <stop offset="0.55" stopColor="#8fb0ff" />
          <stop offset="1" stopColor="#2f6bff" />
        </linearGradient>
        <linearGradient id="hv-side" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a2a55" />
          <stop offset="1" stopColor="#0b1328" />
        </linearGradient>
        <filter id="hv-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <pattern id="hv-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#8fb0ff" strokeOpacity="0.07" />
        </pattern>
      </defs>

      <rect width="640" height="640" fill="url(#hv-grid)" />

      {/* Pixel Y — the digital origin */}
      <g>
        {PIXEL_MASK.flatMap((row, r) =>
          row.split("").map((cell, c) => {
            const lit = cell === "X";
            return (
              <rect
                key={`${r}-${c}`}
                x={grid.x + c * pitch}
                y={grid.y + r * pitch}
                width={14}
                height={14}
                fill={lit ? "#2f6bff" : "#8fb0ff"}
                fillOpacity={lit ? 1 : 0.06}
                className={lit ? "animate-pixel" : undefined}
                style={lit ? { animationDelay: `${((r * 7 + c * 13) % 23) * 0.21}s` } : undefined}
              />
            );
          }),
        )}
        <text x={grid.x} y={grid.y - 16} className="fill-fg-subtle font-mono" fontSize="11" letterSpacing="1.5">
          9 × 11 PX
        </text>
      </g>

      {/* Projection lines from pixel to physical letter */}
      <g stroke="#8fb0ff" strokeOpacity="0.28" strokeDasharray="3 5" strokeWidth="1">
        <line x1={grid.x} y1={grid.y} x2={pt(Y_POINTS[0])[0]} y2={pt(Y_POINTS[0])[1]} />
        <line x1={grid.x + 9 * pitch - 6} y1={grid.y} x2={pt(Y_POINTS[4])[0]} y2={pt(Y_POINTS[4])[1]} />
        <line x1={grid.x + 3 * pitch} y1={grid.y + 11 * pitch - 6} x2={pt(Y_POINTS[8], 0, 0)[0]} y2={pt(Y_POINTS[7])[1]} />
        <line x1={grid.x + 6 * pitch - 6} y1={grid.y + 11 * pitch - 6} x2={pt(Y_POINTS[6])[0]} y2={pt(Y_POINTS[6])[1]} />
      </g>

      {/* Physical channel letter */}
      <g className="animate-power-on">
        <polygon points={poly()} fill="#2f6bff" opacity="0.55" filter="url(#hv-glow)" />
        {/* returns (sides) */}
        {Y_POINTS.map((p, i) => {
          const q = Y_POINTS[(i + 1) % Y_POINTS.length];
          const a = pt(p), b = pt(q), c = pt(q, D.x, D.y), d = pt(p, D.x, D.y);
          return (
            <polygon
              key={i}
              points={[a, b, c, d].map((v) => v.join(",")).join(" ")}
              fill="url(#hv-side)"
              stroke="#5b8cff"
              strokeOpacity="0.55"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          );
        })}
        <polygon points={poly()} fill="url(#hv-face)" stroke="#dfe8ff" strokeWidth="1.2" strokeLinejoin="round" />
      </g>

      {/* Dimension lines */}
      <g className="fill-fg-subtle font-mono" fontSize="11" letterSpacing="1">
        <g stroke="#6d7a94" strokeWidth="1">
          <line x1="602" y1={O.y} x2="602" y2={O.y + 120 * S} />
          <line x1="596" y1={O.y} x2="608" y2={O.y} />
          <line x1="596" y1={O.y + 120 * S} x2="608" y2={O.y + 120 * S} />
          <line x1={O.x} y1="590" x2={O.x + 100 * S} y2="590" />
          <line x1={O.x} y1="584" x2={O.x} y2="596" />
          <line x1={O.x + 100 * S} y1="584" x2={O.x + 100 * S} y2="596" />
        </g>
        <text x="616" y={O.y + 60 * S} transform={`rotate(90 616 ${O.y + 60 * S})`} textAnchor="middle">1200 MM</text>
        <text x={O.x + 50 * S} y="612" textAnchor="middle">1000 MM</text>
        <text x={pt(Y_POINTS[6])[0] + 14} y={pt(Y_POINTS[6])[1] - 10}>LED 6500K</text>
        <text x={pt(Y_POINTS[4])[0] - 4} y={pt(Y_POINTS[4], D.x, D.y)[1] - 14} textAnchor="end">DEPTH 100</text>
        <text x={grid.x} y={grid.y + 11 * pitch + 24}>#2F6BFF</text>
      </g>
    </svg>
  );
}
