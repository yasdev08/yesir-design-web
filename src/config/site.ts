/**
 * Central business configuration.
 *
 * Every contact channel is driven by environment variables so that no phone
 * number, address or account is ever hard-coded or invented. A channel that is
 * not configured is simply not rendered (no dead buttons).
 */

const clean = (value: string | undefined) => {
  const v = value?.trim();
  return v ? v : undefined;
};

/**
 * Public site URL, in order of preference:
 * 1. NEXT_PUBLIC_SITE_URL (your custom domain),
 * 2. the production domain Vercel exposes automatically on every build,
 * 3. localhost for local development.
 * This means canonical URLs, the sitemap and robots.txt are correct on Vercel
 * even before NEXT_PUBLIC_SITE_URL is configured.
 */
function resolveSiteUrl() {
  const explicit = clean(process.env.NEXT_PUBLIC_SITE_URL);
  const vercel = clean(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? clean(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL);
  const url = explicit ?? (vercel ? `https://${vercel.replace(/^https?:\/\//, "")}` : "http://localhost:3000");
  return url.replace(/\/$/, "");
}

/**
 * Search engines and AI crawlers are allowed everywhere except on Vercel
 * preview deployments, or when NEXT_PUBLIC_ALLOW_INDEXING is explicitly "false".
 */
export const allowIndexing =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false" &&
  (process.env.VERCEL_ENV ?? process.env.NEXT_PUBLIC_VERCEL_ENV) !== "preview";

const digits = (value: string | undefined) => clean(value)?.replace(/[^\d]/g, "") || undefined;

export const siteConfig = {
  name: "YESIR DESIGN",
  /** Absolute production URL, used for canonical URLs, sitemap and Open Graph. */
  url: resolveSiteUrl(),
  /** Legal entity name for legal pages (defaults to the brand name). */
  legalName: clean(process.env.NEXT_PUBLIC_LEGAL_NAME) ?? "YESIR DESIGN",
  contact: {
    /** International format without "+" (e.g. 2136XXXXXXXX). */
    whatsapp: digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
    /** Displayed and dialled phone number, international format recommended (+213...). */
    phone: clean(process.env.NEXT_PUBLIC_PHONE_NUMBER),
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  },
  address: {
    street: clean(process.env.NEXT_PUBLIC_BUSINESS_STREET),
    city: clean(process.env.NEXT_PUBLIC_BUSINESS_CITY),
    postalCode: clean(process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE),
    region: clean(process.env.NEXT_PUBLIC_BUSINESS_REGION),
  },
  social: {
    instagram: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    facebook: clean(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    linkedin: clean(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    tiktok: clean(process.env.NEXT_PUBLIC_TIKTOK_URL),
  },
  /** Cities the agency serves (service area — not office locations). */
  serviceArea: ["Mascara", "Oran", "Alger"],
} as const;

export const hasAnyDirectChannel = Boolean(
  siteConfig.contact.whatsapp || siteConfig.contact.phone || siteConfig.contact.email,
);

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(message?: string) {
  const number = siteConfig.contact.whatsapp;
  if (!number) return undefined;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}
