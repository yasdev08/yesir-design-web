"use client";

import { business } from "@/content/business";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[][]; loaded?: boolean; version?: string; push?: unknown };
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
    __ydPixelInit?: boolean;
  }
}

/** Env var wins; otherwise the ID stored in business.ts. Empty string disables the Pixel. */
export const PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? business.metaPixelId).trim();

export const UTM_STORAGE_KEY = "yd_utm";

/** Official Meta stub (queues calls until fbevents.js arrives) + a single init. Idempotent. */
export function ensurePixel(): Fbq | undefined {
  if (!PIXEL_ID || typeof window === "undefined") return undefined;
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq = fbq;
  }
  if (!window.__ydPixelInit) {
    window.fbq("init", PIXEL_ID);
    window.__ydPixelInit = true;
  }
  return window.fbq;
}

export function trackPixel(event: string, params?: Record<string, unknown>) {
  ensurePixel()?.("track", event, params);
}

export function storedUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}
