"use client";

import { useEffect } from "react";
import { waHref } from "@/content/business";
import { PIXEL_ID, trackPixel, UTM_STORAGE_KEY } from "@/lib/meta-pixel";

const UTM_KEYS = ["utm_source", "utm_campaign", "utm_content"] as const;

function readUtm(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = Object.fromEntries(
    UTM_KEYS.map((k) => [k, params.get(k)?.replace(/[\u0000-\u001f<>]/g, "").slice(0, 80)]).filter(([, v]) => v),
  ) as Record<string, string>;
  try {
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) ?? "{}");
  } catch {
    return fromUrl; // storage blocked (private mode, in-app browsers)
  }
}

/**
 * Landing-page extras (PageView and Contact are handled site-wide by <MetaPixel>):
 * - ViewContent on load
 * - UTM parameters kept in sessionStorage; "[réf: <utm_campaign>]" appended to WhatsApp messages
 */
export function Tracking({ contentName }: { contentName: string }) {
  useEffect(() => {
    const utm = readUtm();
    const campaign = utm.utm_campaign;
    const withRef = (a: HTMLAnchorElement) => {
      if (campaign && a.dataset.wa) a.href = waHref(`${a.dataset.wa} [réf: ${campaign}]`);
    };
    document.querySelectorAll<HTMLAnchorElement>("a[data-wa]").forEach(withRef);
    if (PIXEL_ID) trackPixel("ViewContent", { content_name: contentName, content_category: "landing", ...utm });

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-wa]");
      if (link) withRef(link);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [contentName]);

  return null;
}
