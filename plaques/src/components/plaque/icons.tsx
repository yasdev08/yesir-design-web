import type { ReactNode } from "react";

/**
 * Original profession pictograms, drawn on a 100 × 100 grid.
 * Line icons use `currentColor` strokes; filled shapes use `currentColor` fill.
 * To add a pictogram: add an entry here, then reference its id in config/professions.ts.
 */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function star(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? inner : outer;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

export const icons = {
  heart: (
    <>
      <path {...S} d="M50 86C20 64 8 47 8 32 8 19 18 10 30 10c9 0 16 5 20 12 4-7 11-12 20-12 12 0 22 9 22 22 0 15-12 32-42 54Z" />
      <path {...S} strokeWidth={5} d="M18 48h16l6-12 8 26 7-22 5 8h22" />
    </>
  ),
  tooth: (
    <path
      {...S}
      d="M30 12c-12 0-18 10-16 22 2 12 8 18 10 28 2 12 4 28 12 28 7 0 7-20 14-24 7 4 7 24 14 24 8 0 10-16 12-28 2-10 8-16 10-28 2-12-4-22-16-22-9 0-13 5-20 5s-11-5-20-5Z"
    />
  ),
  stethoscope: (
    <>
      <path {...S} d="M28 10v24c0 14 8 22 18 22s18-8 18-22V10M22 10h12M58 10h12" />
      <path {...S} d="M46 56v14c0 12 10 18 20 18s16-8 16-18v-8" />
      <circle {...S} cx="82" cy="54" r="8" />
    </>
  ),
  child: (
    <>
      <circle {...S} cx="50" cy="38" r="22" />
      <path {...S} d="M44 16c3-6 13-6 13 2" />
      <circle cx="42" cy="38" r="3.2" fill="currentColor" />
      <circle cx="58" cy="38" r="3.2" fill="currentColor" />
      <path {...S} strokeWidth={5} d="M42 47q8 7 16 0" />
      <path {...S} d="M26 92c2-16 12-26 24-26s22 10 24 26" />
    </>
  ),
  venus: (
    <>
      <circle {...S} cx="50" cy="36" r="24" />
      <path {...S} d="M50 60v32M36 78h28" />
      <path fill="currentColor" d="M50 46c-8-6-13-10-13-15 0-4 3-7 6.5-7 3 0 5 1.6 6.5 4 1.5-2.4 3.5-4 6.5-4 3.5 0 6.5 3 6.5 7 0 5-5 9-13 15Z" />
    </>
  ),
  eye: (
    <>
      <path {...S} d="M6 50c14-24 74-24 88 0-14 24-74 24-88 0Z" />
      <circle {...S} cx="50" cy="50" r="15" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </>
  ),
  scales: (
    <>
      <path {...S} d="M50 18v68M32 88h36M16 28h68" />
      <circle cx="50" cy="13" r="5" fill="currentColor" />
      <path {...S} strokeWidth={4} d="M22 28 12 56M22 28l10 28M78 28 68 56M78 28l10 28" />
      <path {...S} d="M8 56q14 16 28 0ZM64 56q14 16 28 0Z" />
    </>
  ),
  quill: (
    <>
      <path {...S} d="M84 8C56 14 34 38 26 74l6 2c10-26 28-46 52-68Z" />
      <path {...S} strokeWidth={4} d="M84 8C64 28 46 50 29 75" />
      <path {...S} d="M26 76l-6 14M38 90h48" />
    </>
  ),
  gavel: (
    <>
      <g transform="rotate(-40 45 38)" {...S}>
        <rect x="24" y="28" width="42" height="20" rx="4" />
        <rect x="18" y="23" width="8" height="30" rx="3" />
        <rect x="64" y="23" width="8" height="30" rx="3" />
      </g>
      <path {...S} d="M53 47l28 31" />
      <path {...S} d="M12 90h44M18 90v-8h32v8" />
    </>
  ),
  pharmacy: <path fill="currentColor" d="M37 8h26v29h29v26H63v29H37V63H8V37h29Z" />,
  badge: (
    <>
      <circle {...S} cx="50" cy="50" r="40" />
      <polygon fill="currentColor" points={star(50, 51, 24, 10)} />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconId = keyof typeof icons;

export const iconIds = Object.keys(icons) as IconId[];

/** Renders a pictogram centred on (cx, cy) with the given size, inside an SVG. */
export function PlaqueIcon({ id, cx, cy, size, color }: { id: IconId; cx: number; cy: number; size: number; color: string }) {
  const s = size / 100;
  return (
    <g transform={`translate(${cx - size / 2} ${cy - size / 2}) scale(${s})`} color={color} style={{ color }}>
      {icons[id] ?? icons.badge}
    </g>
  );
}
