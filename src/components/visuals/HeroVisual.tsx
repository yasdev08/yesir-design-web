import { BRAND_BLUE, MARK } from "./Logo";

/**
 * "Du pixel à la façade": the YESIR mark rasterised into a low-resolution
 * pixel grid, projected into a physical illuminated channel letter drawn like
 * a fabrication blueprint. Pure SVG + CSS animation (no JavaScript).
 */

type Pt = [number, number];

function inside([x, y]: Pt, poly: Pt[]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const COLS = 14;
const ROWS = 15;
/** Sample the mark at each cell centre → "b" (blue), "w" (white) or empty. */
const PIXELS = Array.from({ length: ROWS }, (_, r) =>
  Array.from({ length: COLS }, (_, c) => {
    const p: Pt = [((c + 0.5) / COLS) * MARK.width, ((r + 0.5) / ROWS) * MARK.height];
    return inside(p, MARK.blue) ? "b" : inside(p, MARK.white) ? "w" : "";
  }),
);

const S = 1.8; // scale of the physical letter
const O = { x: 262, y: 200 }; // front-face origin
const D = { x: 28, y: -24 }; // extrusion depth

const pt = ([x, y]: Pt, dx = 0, dy = 0): Pt => [x * S + O.x + dx, y * S + O.y + dy];
const poly = (pts: Pt[], dx = 0, dy = 0) => pts.map((p) => pt(p, dx, dy).join(",")).join(" ");

function Returns({ pts }: { pts: Pt[] }) {
  return (
    <>
      {pts.map((p, i) => {
        const q = pts[(i + 1) % pts.length];
        const quad = [pt(p), pt(q), pt(q, D.x, D.y), pt(p, D.x, D.y)];
        return (
          <polygon
            key={i}
            points={quad.map((v) => v.join(",")).join(" ")}
            fill="url(#hv-side)"
            stroke="#5b8cff"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        );
      })}
    </>
  );
}

export function HeroVisual({ title }: { title: string }) {
  const pitch = 13;
  const grid = { x: 36, y: 48 };
  const W = MARK.width * S;
  const H = MARK.height * S;
  const [tlx, tly] = pt(MARK.blue[0]);
  const [trx, try_] = pt(MARK.white[1]);
  const [bx, by] = pt(MARK.white[4]);
  const [sx, sy] = pt(MARK.white[3]);

  return (
    <svg viewBox="0 0 640 640" className="h-auto w-full" role="img" aria-label={title} direction="ltr">
      <defs>
        <linearGradient id="hv-white" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c9d6f5" />
        </linearGradient>
        <linearGradient id="hv-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b8cff" />
          <stop offset="1" stopColor={BRAND_BLUE} />
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

      {/* Pixel mark — the digital origin */}
      <g>
        {PIXELS.flatMap((row, r) =>
          row.map((cell, c) => (
            <rect
              key={`${r}-${c}`}
              x={grid.x + c * pitch}
              y={grid.y + r * pitch}
              width={10}
              height={10}
              fill={cell === "b" ? BRAND_BLUE : cell === "w" ? "#f2f5fa" : "#8fb0ff"}
              fillOpacity={cell ? 1 : 0.06}
              className={cell ? "animate-pixel" : undefined}
              style={cell ? { animationDelay: `${((r * 7 + c * 13) % 23) * 0.21}s` } : undefined}
            />
          )),
        )}
        <text x={grid.x} y={grid.y - 16} className="fill-fg-subtle font-mono" fontSize="11" letterSpacing="1.5">
          {COLS} × {ROWS} PX
        </text>
      </g>

      {/* Projection lines from pixel to physical letter */}
      <g stroke="#8fb0ff" strokeOpacity="0.28" strokeDasharray="3 5" strokeWidth="1">
        <line x1={grid.x} y1={grid.y} x2={tlx} y2={tly} />
        <line x1={grid.x + COLS * pitch - 3} y1={grid.y} x2={trx} y2={try_} />
        <line x1={grid.x + 5 * pitch} y1={grid.y + ROWS * pitch - 3} x2={bx} y2={by} />
        <line x1={grid.x + 8 * pitch} y1={grid.y + 10 * pitch} x2={sx} y2={sy} />
      </g>

      {/* Physical channel letter */}
      <g className="animate-power-on">
        <polygon points={poly(MARK.white)} fill="#2f6bff" opacity="0.45" filter="url(#hv-glow)" />
        <polygon points={poly(MARK.blue)} fill={BRAND_BLUE} opacity="0.7" filter="url(#hv-glow)" />
        <Returns pts={MARK.blue} />
        <Returns pts={MARK.white} />
        <polygon points={poly(MARK.blue)} fill="url(#hv-blue)" stroke="#8fb0ff" strokeWidth="1" strokeLinejoin="round" />
        <polygon points={poly(MARK.white)} fill="url(#hv-white)" stroke="#ffffff" strokeWidth="1" strokeLinejoin="round" />
      </g>

      {/* Dimension lines */}
      <g className="fill-fg-subtle font-mono" fontSize="11" letterSpacing="1">
        <g stroke="#6d7a94" strokeWidth="1">
          <line x1="612" y1={O.y} x2="612" y2={O.y + H} />
          <line x1="606" y1={O.y} x2="618" y2={O.y} />
          <line x1="606" y1={O.y + H} x2="618" y2={O.y + H} />
          <line x1={O.x} y1="568" x2={O.x + W} y2="568" />
          <line x1={O.x} y1="562" x2={O.x} y2="574" />
          <line x1={O.x + W} y1="562" x2={O.x + W} y2="574" />
        </g>
        <text x="626" y={O.y + H / 2} transform={`rotate(90 626 ${O.y + H / 2})`} textAnchor="middle">1200 MM</text>
        <text x={O.x + W / 2} y="590" textAnchor="middle">1140 MM</text>
        <text x={sx + 14} y={sy + 4}>LED 6500K</text>
        <text x={trx + D.x} y={try_ + D.y - 12} textAnchor="end">DEPTH 100</text>
        <text x={grid.x} y={grid.y + ROWS * pitch + 24}>{BRAND_BLUE.toUpperCase()}</text>
      </g>
    </svg>
  );
}
