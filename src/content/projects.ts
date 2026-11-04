import type { Locale } from "@/i18n/config";

type L = Record<Locale, string>;

/**
 * Restaurant projects shown on /restaurants (published with the clients' permission).
 * Media paths are relative to /public. Missing files are detected at build time and
 * replaced by a neutral "image à ajouter" placeholder, so the build never breaks.
 */
export interface RestaurantProject {
  slug: "maison-crousty" | "wonder-food" | "meat-love" | "bendenia-food";
  name: string;
  kind: L;
  line: L;
  /** Muted looping reel (H.264 MP4, ≤ 3 MB). */
  video?: string;
  poster: string;
  cover: string;
  /** Extra captures shown under the cover, with their aspect ratio. */
  gallery?: { aspect: "16/9" | "9/16"; images: string[] };
  live?: string;
}

export const restaurantProjects: RestaurantProject[] = [
  {
    slug: "maison-crousty",
    name: "Maison Crousty",
    kind: { fr: "Fast-food · 3 écrans TV animés en 4K", en: "Fast food · 3 animated 4K TV screens", ar: "أكل سريع · 3 شاشات عرض متحرّكة بدقّة 4K" },
    line: { fr: "Vos plats bougent, votre carte se lit de loin.", en: "Your dishes move, your menu reads from across the room.", ar: "أطباقك تتحرّك، وقائمتك تُقرأ من بعيد." },
    video: "/projects/maison-crousty/reel.mp4",
    poster: "/projects/maison-crousty/poster.jpg",
    cover: "/projects/maison-crousty/cover.jpg",
    gallery: { aspect: "16/9", images: ["/projects/maison-crousty/screen-2.jpg", "/projects/maison-crousty/screen-3.jpg"] },
  },
  {
    slug: "wonder-food",
    name: "Wonder Food's Maraval",
    kind: { fr: "Oran · menu QR", en: "Oran · QR menu", ar: "وهران · قائمة QR" },
    line: {
      fr: "Votre menu sur le téléphone de vos clients, en un scan.",
      en: "Your menu on your customers' phones, in one scan.",
      ar: "قائمتك على هاتف زبائنك، بمسحة واحدة.",
    },
    video: "/projects/wonder-food/reel.mp4",
    poster: "/projects/wonder-food/poster.jpg",
    cover: "/projects/wonder-food/cover.jpg",
  },
  {
    slug: "meat-love",
    name: "Meat Love",
    kind: { fr: "Menu mobile", en: "Mobile menu", ar: "قائمة على الهاتف" },
    line: {
      fr: "Menu mobile avec photos, prix, français et arabe, bouton d'appel.",
      en: "Mobile menu with photos, prices, French and Arabic, and a call button.",
      ar: "قائمة على الهاتف بالصور والأسعار، بالفرنسية والعربية، مع زرّ اتصال.",
    },
    cover: "/projects/meat-love/cover.jpg",
    poster: "/projects/meat-love/cover.jpg",
    live: "https://meat-love-hazel.vercel.app",
  },
  {
    slug: "bendenia-food",
    name: "Bendenia Food",
    kind: { fr: "Commande WhatsApp + plaque QR", en: "WhatsApp ordering + QR plate", ar: "طلب عبر واتساب + لوحة QR" },
    line: {
      fr: "Page de commande WhatsApp + plaque QR en plexi.",
      en: "WhatsApp ordering page + acrylic QR plate.",
      ar: "صفحة طلب عبر واتساب + لوحة QR من البليكسي.",
    },
    cover: "/projects/bendenia-food/cover.jpg",
    poster: "/projects/bendenia-food/cover.jpg",
    live: "https://bendenia-food.vercel.app",
  },
];
