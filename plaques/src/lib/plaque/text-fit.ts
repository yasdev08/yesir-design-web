import { CAIRO_METRICS, LATIN_CHARS, MONTSERRAT_WIDTHS } from "./font-metrics";
import type { FontRef } from "./types";

/**
 * Returns the advance width of `text` for a font size of 1 (i.e. in ems).
 * The default implementation uses metric tables measured from the real fonts,
 * so it works identically on the server and in the browser.
 * The configurator can inject a canvas-based measurer for pixel-exact results.
 */
export type TextMeasurer = (text: string, font: FontRef, weight: number) => number;

const latinIndex = new Map<string, number>();
[...LATIN_CHARS].forEach((ch, i) => latinIndex.set(ch, i));

function nearestWeight(available: number[], weight: number): number {
  return available.reduce((best, w) => (Math.abs(w - weight) < Math.abs(best - weight) ? w : best), available[0]);
}

const ARABIC_LETTER = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
const ARABIC_MARK = /[ً-ٰٟۖ-ۭ]/;

export const estimateTextWidth: TextMeasurer = (text, font, weight) => {
  const latinTable = MONTSERRAT_WIDTHS[nearestWeight([400, 500, 600, 700, 800], weight)];
  const cairo = CAIRO_METRICS[nearestWeight([400, 500, 600, 700], weight)];
  let width = 0;
  for (const ch of text) {
    if (font === "arabic") {
      if (ARABIC_MARK.test(ch)) continue;
      // Contextual shaping makes letter widths vary a lot: use a conservative average.
      if (ARABIC_LETTER.test(ch)) width += cairo.avg * 1.15;
      else if (ch === " " || ch === "\u00A0") width += cairo.space;
      else if (/\d/.test(ch)) width += cairo.digit;
      else width += (latinTable[latinIndex.get(ch) ?? -1] ?? 600) * 0.95;
    } else {
      width += latinTable[latinIndex.get(ch === "\u00A0" ? " " : ch) ?? -1] ?? 650;
    }
  }
  // Small safety margin: kerning and rendering differences must never cause an overflow.
  return (width / 1000) * 1.03;
};

export interface FitOptions {
  /** Box size in user units (mm). */
  width: number;
  height: number;
  maxSize: number;
  maxLines: number;
  lineHeight: number;
  /** Extra spacing between letters, in em. */
  tracking: number;
  font: FontRef;
  weight: number;
  measure: TextMeasurer;
}

export interface FitResult {
  lines: string[];
  fontSize: number;
}

function lineWidth(line: string, o: FitOptions): number {
  const chars = [...line].length;
  return o.measure(line, o.font, o.weight) + o.tracking * Math.max(0, chars - 1);
}

/** Candidate ways to split `text` into `n` lines. Explicit breaks ("—", "|") are preferred. */
interface Candidate {
  lines: string[];
  /** Natural break (e.g. after "—"): wins unless another split is clearly bigger. */
  preferred?: boolean;
}

function splitCandidates(text: string, n: number): Candidate[] {
  if (n === 1) return [{ lines: [text] }];
  const out: Candidate[] = [];
  // Preferred break: the em dash separating days and times.
  const dash = text.indexOf(" — ");
  if (n === 2 && dash > 0) out.push({ lines: [text.slice(0, dash).trim(), text.slice(dash + 3).trim()], preferred: true });
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < n) return out;
  if (n === 2) {
    for (let i = 1; i < words.length; i++) out.push({ lines: [words.slice(0, i).join(" "), words.slice(i).join(" ")] });
  } else {
    // Greedy balanced split for 3+ lines.
    const target = text.length / n;
    const lines: string[] = [];
    let current: string[] = [];
    for (const w of words) {
      const candidate = [...current, w].join(" ");
      if (current.length && candidate.length > target && lines.length < n - 1) {
        lines.push(current.join(" "));
        current = [w];
      } else current.push(w);
    }
    lines.push(current.join(" "));
    out.push({ lines });
  }
  return out.map((c) => ({ ...c, lines: c.lines.map((l) => l.replace(/^[—–-]\s*/, "")) }));
}

/**
 * Finds the largest font size (≤ maxSize) at which `text` fits the box, wrapping on
 * up to `maxLines` lines. The result never overflows: if needed the size goes below
 * any "comfortable" minimum rather than spilling out of the zone.
 */
export function fitText(text: string, o: FitOptions): FitResult {
  let best: FitResult = { lines: [text], fontSize: 0 };
  for (let n = 1; n <= o.maxLines; n++) {
    // Best split for this line count. A natural break (after "—") wins
    // unless another split allows a clearly bigger size (> 25 %).
    let bestN: FitResult | null = null;
    let natural: FitResult | null = null;
    for (const { lines, preferred } of splitCandidates(text, n)) {
      const widest = Math.max(...lines.map((l) => lineWidth(l, o)));
      const byWidth = widest > 0 ? o.width / widest : o.maxSize;
      const byHeight = o.height / (n * o.lineHeight);
      const fit = { lines, fontSize: Math.min(o.maxSize, byWidth, byHeight) };
      if (preferred) natural = fit;
      if (!bestN || fit.fontSize > bestN.fontSize) bestN = fit;
    }
    if (natural && bestN && natural.fontSize * 1.25 >= bestN.fontSize) bestN = natural;
    // Fewer lines win unless wrapping gives a clearly bigger size (> 12 %).
    if (bestN && bestN.fontSize > best.fontSize * (n > 1 ? 1.12 : 1)) best = bestN;
  }
  return best;
}
