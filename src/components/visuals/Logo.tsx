import { cn } from "@/lib/cn";

/**
 * Official YESIR DESIGN mark, vectorised from the brand logo.
 * Coordinates in a 172 × 181 box: a blue left arm and a white right arm/stem
 * with its characteristic notch.
 */
export const MARK = {
  width: 172,
  height: 181,
  blue: [[0, 0.75], [47.5, 0.75], [75.75, 44], [53.25, 79]] as [number, number][],
  white: [
    [130.75, 0], [172, 0], [105, 100.75], [105, 123.25], [65.75, 180.75],
    [65.75, 96.5], [92.5, 59.5], [102.5, 70.75], [102.5, 49.5], [100.75, 46.5],
  ] as [number, number][],
};

export const BRAND_BLUE = "#2b63f0";

export const markPoints = (pts: [number, number][], s = 1, ox = 0, oy = 0) =>
  pts.map(([x, y]) => `${(x * s + ox).toFixed(2)},${(y * s + oy).toFixed(2)}`).join(" ");

/** The mark alone (favicon-like contexts, decorative uses). */
export function LogoMark({ className, mono = false }: { className?: string; mono?: boolean }) {
  return (
    <svg viewBox={`0 0 ${MARK.width} ${MARK.height}`} className={cn("shrink-0", className)} aria-hidden focusable="false">
      <polygon points={markPoints(MARK.blue)} fill={mono ? "currentColor" : BRAND_BLUE} />
      <polygon points={markPoints(MARK.white)} fill={mono ? "currentColor" : "#f2f5fa"} />
    </svg>
  );
}

/**
 * Full lockup: mark + "YESIR" + "DESIGN", proportions taken from the brand file.
 * The wordmark uses Michroma (loaded via next/font as --font-michroma);
 * textLength pins each word to its exact width in the original artwork.
 */
export function Logo({ className, title = "YESIR DESIGN" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="38 134 720 186" className={cn("h-9 w-auto shrink-0", className)} role="img" aria-label={title} direction="ltr">
      <g transform="translate(40.5 138)">
        <polygon points={markPoints(MARK.blue)} fill={BRAND_BLUE} />
        <polygon points={markPoints(MARK.white)} fill="#f2f5fa" />
      </g>
      <g style={{ fontFamily: "var(--font-michroma), 'Eurostile', 'Arial Black', sans-serif" }}>
        <text x="266" y="239" fontSize="82" fill="#f2f5fa" textLength="490" lengthAdjust="spacingAndGlyphs">
          YESIR
        </text>
        <text x="273" y="295" fontSize="34" fill={BRAND_BLUE} textLength="481" lengthAdjust="spacing">
          DESIGN
        </text>
      </g>
    </svg>
  );
}
