"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { consentStore, GA_ID, hasConsentTools, META_PIXEL_ID, trackContactClick, type Consent } from "@/lib/analytics";

const useConsent = () =>
  useSyncExternalStore<Consent | "unknown">(consentStore.subscribe, consentStore.get, () => "unknown");

interface Labels {
  text: string;
  accept: string;
  decline: string;
  policy: string;
}

/**
 * Site-wide analytics: cookieless Vercel analytics always, cookie-based tools
 * (GA4, Meta Pixel) only after consent, plus contact-click tracking.
 */
export function Analytics({ labels, policyHref }: { labels: Labels; policyHref: string }) {
  const consent = useConsent();
  const granted = consent === "granted";
  const pathname = usePathname();
  const firstPath = useRef(true);

  // Contact clicks anywhere on the site (WhatsApp, tel:, mailto:) — one delegated listener.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const channel = href.startsWith("https://wa.me") ? "whatsapp" : href.startsWith("tel:") ? "phone" : href.startsWith("mailto:") ? "email" : null;
      if (!channel) return;
      const location = a.closest("header") ? "header" : a.closest("footer") ? "footer" : a.closest("dialog") ? "mobile_menu" : a.closest("[data-contact-bar]") ? "contact_bar" : window.location.pathname;
      trackContactClick({ channel, location });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Meta Pixel page views on client-side navigation (GA4 tracks history changes itself).
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />

      {granted && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {granted && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}

      {hasConsentTools && consent === null && <ConsentBanner labels={labels} policyHref={policyHref} />}
    </>
  );
}

function ConsentBanner({ labels, policyHref }: { labels: Labels; policyHref: string }) {
  return (
    <div
      role="region"
      aria-label={labels.policy}
      className="fixed inset-x-3 bottom-[5.5rem] z-[60] border border-line-strong bg-ink-900 p-5 shadow-2xl shadow-black/60 md:inset-x-auto md:bottom-6 md:end-6 md:max-w-md"
    >
      <p className="text-sm text-fg-muted">
        {labels.text}{" "}
        <Link href={policyHref} className="link-underline text-fg">
          {labels.policy}
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => consentStore.set("granted")} className="h-11 flex-1 bg-signal px-4 text-sm font-medium text-white hover:bg-signal-strong">
          {labels.accept}
        </button>
        <button type="button" onClick={() => consentStore.set("denied")} className="h-11 flex-1 border border-line-strong px-4 text-sm text-fg hover:border-signal-soft">
          {labels.decline}
        </button>
      </div>
    </div>
  );
}

/** Footer link that clears the stored choice so the banner shows again. */
export function ManageConsentButton({ label }: { label: string }) {
  if (!hasConsentTools) return null;
  return (
    <button
      type="button"
      onClick={() => {
        // Withdrawing consent: reset the choice and reload so already-loaded tags stop.
        const wasGranted = consentStore.get() === "granted";
        consentStore.set(null);
        if (wasGranted) window.location.reload();
      }}
      className="hover:text-fg"
    >
      {label}
    </button>
  );
}
