import type { Locale } from "@/i18n/config";

type L = Record<Locale, string>;

export interface Pack {
  id: "essentiel" | "pro" | "premium";
  name: string;
  price: number;
  screens: number;
  recommended?: boolean;
}

/** Pack "Digital Presence" = animated TV menu + mobile QR menu. */
export const digitalPresence = {
  name: "Digital Presence",
  packs: [
    { id: "essentiel", name: "Essentiel", price: 59000, screens: 1 },
    { id: "pro", name: "Pro", price: 79000, screens: 2, recommended: true },
    { id: "premium", name: "Premium", price: 99000, screens: 3 },
  ] satisfies Pack[],
};

/** QR menu on its own. */
export const qrOnly = {
  from: 35000,
  tiers: [
    { name: "Starter", price: 35000 },
    { name: "Standard", price: 50000 },
    { name: "Premium", price: 75000 },
  ],
};

/** Entry offer: ready-made template in the client's colours + 1 printed plexi stand. Ordered on the express page. */
export const express = {
  url: "https://yesir-led-sign.vercel.app/qr",
  menu: 9900,
  rdv: 7900,
  extraStand: 2500,
};

export const monthlyPlan = {
  price: 3000,
  includes: { fr: "hébergement + mises à jour de prix", en: "hosting + price updates", ar: "الاستضافة + تحديث الأسعار" } satisfies L,
};

export const payment = {
  depositPercent: 50,
  label: {
    fr: "50 % au démarrage, 50 % à la livraison",
    en: "50% to start, 50% on delivery",
    ar: "50 % عند الانطلاق، و50 % عند التسليم",
  } satisfies L,
};

/** "59 000 DA" (fr) · "59,000 DA" (en) · "59 000 دج" (ar) — always Latin digits. */
export function formatDA(amount: number, locale: Locale) {
  const n = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, locale === "en" ? "," : " ");
  return locale === "ar" ? `${n} دج` : `${n} DA`;
}
