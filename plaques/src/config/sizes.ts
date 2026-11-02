/**
 * Plaque formats. Dimensions are in millimetres and drive the SVG viewBox,
 * so an exported SVG is at real scale (1 user unit = 1 mm).
 * Plaques are landscape: width is the long side.
 */
export const sizes = [
  { id: "30x40", label: "30 × 40 cm", widthMm: 400, heightMm: 300 },
  { id: "40x60", label: "40 × 60 cm", widthMm: 600, heightMm: 400 },
] as const;

export type SizeId = (typeof sizes)[number]["id"];
export type PlaqueSize = (typeof sizes)[number];

export const defaultSizeId: SizeId = "30x40";

export function getSize(id: SizeId): PlaqueSize {
  return sizes.find((s) => s.id === id) ?? sizes[0];
}
