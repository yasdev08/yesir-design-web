import { ImageResponse } from "next/og";
import { locales } from "@/i18n/config";

export const alt = "YESIR DESIGN — Agence créative et digitale en Algérie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Latin-only text so the image renders identically for every locale.
const taglines: Record<string, string> = {
  fr: "Du pixel à la façade.",
  en: "From pixel to facade.",
  ar: "Web · Ads · Automation · Signage",
};

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pts = "0,0 28,0 50,36 72,0 100,0 64,59 64,120 36,120 36,59";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#04060c", color: "#f2f5fa", padding: 72, position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", right: -120, top: -160, width: 700, height: 700, borderRadius: 700, background: "rgba(47,107,255,0.28)", filter: "blur(120px)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="56" height="64" viewBox="-4 -26 136 150">
              <polygon points={pts} transform="translate(26,-22)" fill="none" stroke="#2f6bff" strokeWidth="5" />
              <polygon points={pts} fill="#f2f5fa" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>YESIR</span>
              <span style={{ fontSize: 14, letterSpacing: 10, color: "#a3aec4" }}>DESIGN</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 92, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>{taglines[locale] ?? taglines.fr}</span>
            <span style={{ marginTop: 28, fontSize: 28, color: "#a3aec4" }}>Web · Meta & Google Ads · Automation · Signage — Algeria</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
