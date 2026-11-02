import type { ColorRef, FontRef, Slot } from "@/lib/plaque/types";

/**
 * Plaque templates.
 *
 * Coordinates are percentages so one template works for every size:
 *   - x / w are % of the plaque WIDTH, y / h are % of the plaque HEIGHT;
 *   - sizes (font sizes, stroke widths, radii, icon size) are % of the plaque HEIGHT.
 * Text zones are boxes: their text is auto-fitted (shrunk, optionally wrapped) to stay inside.
 * A zone whose slot is empty is simply not drawn.
 *
 * Plexiglas standoffs sit in the corners (about 8 % of the height from each edge):
 * keep text out of those corners.
 *
 * To add a template: append an object to `templates`. No component change is needed.
 */

export type Shape =
  | { type: "rect"; x: number; y: number; w: number; h: number; fill: ColorRef; opacity?: number }
  /** Rectangle inset equally on all sides (in % of height): borders and frames. */
  | { type: "frame"; inset: number; stroke: ColorRef; strokeWidth: number; radius?: number; fill?: ColorRef }
  | { type: "line"; x1: number; y1: number; x2: number; y2: number; stroke: ColorRef; strokeWidth: number }
  | { type: "circle"; cx: number; cy: number; r: number; fill: ColorRef; stroke?: ColorRef; strokeWidth?: number };

export interface TextZone {
  slot: Slot;
  x: number;
  y: number;
  w: number;
  h: number;
  align: "left" | "center" | "right";
  font: FontRef;
  weight: number;
  color: ColorRef;
  /** Maximum font size (% of height). The text shrinks below it when needed. */
  size: number;
  maxLines?: number;
  uppercase?: boolean;
  /** Letter spacing in em. */
  tracking?: number;
}

export interface IconZone {
  cx: number;
  cy: number;
  /** % of height. */
  size: number;
  color: ColorRef;
}

export interface PlaqueTemplate {
  id: string;
  name: string;
  description: string;
  background: ColorRef;
  shapes: Shape[];
  icon: IconZone | null;
  zones: TextZone[];
}

export const templates: PlaqueTemplate[] = [
  {
    id: "classique",
    name: "Classique",
    description: "Composition centrée et double filet : la plaque traditionnelle, sobre et intemporelle.",
    background: "paper",
    shapes: [
      { type: "frame", inset: 3.2, stroke: "ink", strokeWidth: 0.7, radius: 1.2 },
      { type: "frame", inset: 4.8, stroke: "accent", strokeWidth: 0.3, radius: 0.6 },
      { type: "line", x1: 40, y1: 58.5, x2: 60, y2: 58.5, stroke: "accent", strokeWidth: 0.45 },
    ],
    icon: { cx: 50, cy: 17, size: 15, color: "accent" },
    zones: [
      { slot: "name", x: 14, y: 26, w: 72, h: 14, align: "center", font: "latin", weight: 700, color: "ink", size: 10.5, maxLines: 2 },
      { slot: "titleFr", x: 14, y: 40.5, w: 72, h: 7, align: "center", font: "latin", weight: 600, color: "accent", size: 4.8, uppercase: true, tracking: 0.08 },
      { slot: "titleAr", x: 14, y: 47.5, w: 72, h: 9, align: "center", font: "arabic", weight: 700, color: "ink", size: 5.6 },
      { slot: "specialty", x: 14, y: 61, w: 72, h: 6, align: "center", font: "latin", weight: 500, color: "muted", size: 3.6 },
      { slot: "hoursFr", x: 14, y: 67.5, w: 72, h: 8.5, align: "center", font: "latin", weight: 500, color: "ink", size: 3.3, maxLines: 2 },
      { slot: "hoursAr", x: 14, y: 76, w: 72, h: 6.5, align: "center", font: "arabic", weight: 600, color: "ink", size: 3.5 },
      { slot: "contact", x: 16, y: 83.5, w: 68, h: 6, align: "center", font: "latin", weight: 600, color: "accent", size: 3.3 },
    ],
  },
  {
    id: "moderne",
    name: "Moderne",
    description: "Panneau latéral à la couleur de votre spécialité et typographie alignée à gauche.",
    background: "paper",
    shapes: [
      { type: "rect", x: 0, y: 0, w: 30, h: 100, fill: "accent" },
      { type: "line", x1: 8, y1: 58, x2: 22, y2: 58, stroke: "paper", strokeWidth: 0.4 },
      { type: "rect", x: 36, y: 32.5, w: 7, h: 1.1, fill: "accent" },
      { type: "line", x1: 36, y1: 66, x2: 90, y2: 66, stroke: "line", strokeWidth: 0.3 },
    ],
    icon: { cx: 15, cy: 36, size: 22, color: "paper" },
    zones: [
      { slot: "name", x: 36, y: 13, w: 54, h: 17, align: "left", font: "latin", weight: 800, color: "ink", size: 10, maxLines: 2 },
      { slot: "titleFr", x: 36, y: 36.5, w: 54, h: 7.5, align: "left", font: "latin", weight: 600, color: "accent", size: 4.8, uppercase: true, tracking: 0.06 },
      { slot: "titleAr", x: 36, y: 44, w: 54, h: 9.5, align: "left", font: "arabic", weight: 700, color: "ink", size: 5.8 },
      { slot: "specialty", x: 36, y: 56, w: 54, h: 7, align: "left", font: "latin", weight: 500, color: "muted", size: 3.6 },
      { slot: "hoursFr", x: 36, y: 68.5, w: 54, h: 9, align: "left", font: "latin", weight: 500, color: "ink", size: 3.3, maxLines: 2 },
      { slot: "hoursAr", x: 36, y: 77.5, w: 54, h: 9, align: "left", font: "arabic", weight: 600, color: "ink", size: 3.4, maxLines: 2 },
      { slot: "address", x: 36, y: 87, w: 54, h: 5.5, align: "left", font: "latin", weight: 500, color: "muted", size: 3.2 },
      { slot: "phone", x: 4, y: 62, w: 22, h: 6, align: "center", font: "latin", weight: 700, color: "paper", size: 3.6 },
    ],
  },
  {
    id: "bandeau",
    name: "Bandeau",
    description: "Bandeau bleu nuit en tête, médaillon à la couleur du métier et pied de plaque contrasté.",
    background: "paper",
    shapes: [
      { type: "rect", x: 0, y: 0, w: 100, h: 34, fill: "ink" },
      { type: "rect", x: 0, y: 34, w: 100, h: 2.2, fill: "accent" },
      { type: "circle", cx: 50, cy: 36, r: 9.5, fill: "paper", stroke: "accent", strokeWidth: 0.9 },
      { type: "rect", x: 0, y: 86, w: 100, h: 14, fill: "accent" },
    ],
    icon: { cx: 50, cy: 36, size: 11, color: "accent" },
    zones: [
      { slot: "name", x: 14, y: 5.5, w: 72, h: 15, align: "center", font: "latin", weight: 800, color: "paper", size: 9.5, maxLines: 2 },
      { slot: "titleFr", x: 14, y: 19.5, w: 72, h: 6.5, align: "center", font: "latin", weight: 600, color: "#C9D3E3", size: 4.2, uppercase: true, tracking: 0.12 },
      { slot: "titleAr", x: 12, y: 47, w: 76, h: 9.5, align: "center", font: "arabic", weight: 700, color: "ink", size: 5.8 },
      { slot: "specialty", x: 14, y: 56.5, w: 72, h: 6, align: "center", font: "latin", weight: 500, color: "accent", size: 3.6 },
      { slot: "hoursFr", x: 12, y: 63.5, w: 76, h: 8.5, align: "center", font: "latin", weight: 500, color: "ink", size: 3.3, maxLines: 2 },
      { slot: "hoursAr", x: 12, y: 72.5, w: 76, h: 6.5, align: "center", font: "arabic", weight: 600, color: "ink", size: 3.5 },
      { slot: "contact", x: 15, y: 88.5, w: 70, h: 9, align: "center", font: "latin", weight: 700, color: "paper", size: 3.6 },
    ],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Beaucoup d'air, un filet fin et deux colonnes : français à gauche, arabe à droite.",
    background: "paper",
    shapes: [
      { type: "line", x1: 10, y1: 39, x2: 90, y2: 39, stroke: "line", strokeWidth: 0.3 },
      { type: "line", x1: 46, y1: 39, x2: 54, y2: 39, stroke: "accent", strokeWidth: 0.8 },
      { type: "line", x1: 50, y1: 45, x2: 50, y2: 72, stroke: "line", strokeWidth: 0.3 },
      { type: "line", x1: 30, y1: 79, x2: 70, y2: 79, stroke: "line", strokeWidth: 0.3 },
    ],
    icon: { cx: 50, cy: 13, size: 10, color: "accent" },
    zones: [
      { slot: "name", x: 12, y: 21, w: 76, h: 14, align: "center", font: "latin", weight: 600, color: "ink", size: 9.5, maxLines: 2, tracking: 0.01 },
      { slot: "titleFr", x: 10, y: 44, w: 37, h: 8, align: "left", font: "latin", weight: 700, color: "accent", size: 4.6, maxLines: 2 },
      { slot: "specialty", x: 10, y: 52.5, w: 37, h: 7, align: "left", font: "latin", weight: 500, color: "muted", size: 3.3, maxLines: 2 },
      { slot: "hoursFr", x: 10, y: 60.5, w: 37, h: 11.5, align: "left", font: "latin", weight: 500, color: "ink", size: 3.2, maxLines: 3 },
      { slot: "titleAr", x: 53, y: 44, w: 37, h: 14, align: "right", font: "arabic", weight: 700, color: "accent", size: 5.4, maxLines: 2 },
      { slot: "hoursAr", x: 53, y: 60.5, w: 37, h: 11.5, align: "right", font: "arabic", weight: 600, color: "ink", size: 3.4, maxLines: 2 },
      { slot: "contact", x: 14, y: 82, w: 72, h: 6.5, align: "center", font: "latin", weight: 500, color: "ink", size: 3.3 },
    ],
  },
];

export const defaultTemplateId = "classique";

export function getTemplate(id: string): PlaqueTemplate {
  return templates.find((t) => t.id === id) ?? templates[0];
}
