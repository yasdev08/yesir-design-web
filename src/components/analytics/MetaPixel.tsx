"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { PIXEL_ID, storedUtm, trackPixel } from "@/lib/meta-pixel";

/**
 * Site-wide Meta Pixel:
 * - PageView on first load and on every client-side navigation
 * - Contact on every WhatsApp (wa.me) or phone (tel:) click, with
 *   content_name = the link's data-track section (or "site")
 * fbevents.js loads when the browser is idle; queued events are replayed.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!PIXEL_ID || last.current === pathname) return;
    last.current = pathname;
    trackPixel("PageView");
  }, [pathname]);

  useEffect(() => {
    if (!PIXEL_ID) return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const kind = href.startsWith("https://wa.me/") ? "whatsapp" : href.startsWith("tel:") ? "phone" : null;
      if (!kind) return;
      trackPixel("Contact", { content_name: link.dataset.track ?? "site", content_category: kind, page: window.location.pathname, ...storedUtm() });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!PIXEL_ID) return null;
  return (
    <>
      <Script id="meta-pixel" src="https://connect.facebook.net/en_US/fbevents.js" strategy="lazyOnload" />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
