"use client";

import Script from "next/script";
import { useEffect } from "react";
import { waHref } from "@/content/business";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[][]; loaded?: boolean; version?: string; push?: unknown };
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
const UTM_KEYS = ["utm_source", "utm_campaign", "utm_content"] as const;
const STORAGE_KEY = "yd_utm";

/** Standard Meta Pixel stub: queues calls until fbevents.js arrives. */
function ensureFbq() {
  if (window.fbq) return window.fbq;
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
  return fbq;
}

function readUtm(): Partial<Record<(typeof UTM_KEYS)[number], string>> {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = Object.fromEntries(
    UTM_KEYS.map((k) => [k, params.get(k)?.replace(/[\u0000-\u001f<>]/g, "").slice(0, 80)]).filter(([, v]) => v),
  );
  try {
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return fromUrl; // storage blocked (private mode, in-app browsers)
  }
}

/**
 * Landing-page tracking:
 * - Meta Pixel (no-op without NEXT_PUBLIC_META_PIXEL_ID): PageView + ViewContent on load,
 *   Contact on every WhatsApp / phone click with content_name = the button's section.
 * - UTM parameters kept in sessionStorage; "[réf: <utm_campaign>]" appended to WhatsApp messages.
 */
export function Tracking({ contentName }: { contentName: string }) {
  useEffect(() => {
    const utm = readUtm();
    const campaign = utm.utm_campaign;

    if (campaign) {
      document.querySelectorAll<HTMLAnchorElement>("a[data-wa]").forEach((a) => {
        a.href = waHref(`${a.dataset.wa} [réf: ${campaign}]`);
      });
    }

    if (PIXEL_ID) {
      const fbq = ensureFbq();
      fbq("init", PIXEL_ID);
      fbq("track", "PageView");
      fbq("track", "ViewContent", { content_name: contentName, content_category: "landing", ...utm });
    }

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-track]");
      if (!link) return;
      if (campaign && link.dataset.wa) link.href = waHref(`${link.dataset.wa} [réf: ${campaign}]`);
      if (PIXEL_ID) {
        window.fbq?.("track", "Contact", {
          content_name: link.dataset.track,
          content_category: link.dataset.wa ? "whatsapp" : "phone",
          ...utm,
        });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [contentName]);

  if (!PIXEL_ID) return null;
  return (
    <>
      {/* fbevents.js loads when the browser is idle; events queued by the stub above are replayed. */}
      <Script id="meta-pixel" src="https://connect.facebook.net/en_US/fbevents.js" strategy="lazyOnload" />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
