/**
 * Conversion tracking shared by every analytics provider.
 *
 * - Vercel Web Analytics: cookieless, always on (custom events need a Vercel Pro plan;
 *   on Hobby the call is simply ignored).
 * - Google Analytics 4 and Meta Pixel: only present after the visitor accepted
 *   cookies, so the calls below are no-ops until then.
 */
import { track as vercelTrack } from "@vercel/analytics";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || undefined;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || undefined;
/** True when at least one cookie-based tool is configured (the consent banner is then needed). */
export const hasConsentTools = Boolean(GA_ID || META_PIXEL_ID);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

type Params = Record<string, string | number | undefined>;

/** A failing or extension-replaced tracker must never break the page (e.g. the form success screen). */
function safely(fn: () => unknown) {
  try {
    fn();
  } catch {}
}

function clean(params: Params) {
  return Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined)) as Record<string, string | number>;
}

/** A quote or contact form was successfully delivered. */
export function trackLead(params: { kind: "quote" | "contact"; service?: string; budget?: string; locale: string }) {
  const p = clean(params);
  safely(() => vercelTrack("lead", p));
  safely(() => window.gtag?.("event", "generate_lead", { ...p, form: params.kind }));
  safely(() => window.fbq?.("track", "Lead", { content_name: params.kind, content_category: params.service }));
}

/** A WhatsApp, phone or email link was clicked. */
export function trackContactClick(params: { channel: "whatsapp" | "phone" | "email"; location: string }) {
  const p = clean(params);
  safely(() => vercelTrack("contact_click", p));
  safely(() => window.gtag?.("event", "contact_click", p));
  safely(() => window.fbq?.("track", "Contact", { content_name: params.channel }));
}

/* ---- Cookie consent (stored per browser) ------------------------------- */

export type Consent = "granted" | "denied" | null;
const KEY = "yd-consent";
const listeners = new Set<() => void>();
/** In-memory copy, so the choice still applies for this visit when localStorage is blocked. */
let memory: Consent = null;

export const consentStore = {
  get(): Consent {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "granted" || v === "denied") return v;
    } catch {}
    return memory;
  },
  set(value: Exclude<Consent, null> | null) {
    memory = value;
    try {
      if (value) localStorage.setItem(KEY, value);
      else localStorage.removeItem(KEY);
    } catch {}
    listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
