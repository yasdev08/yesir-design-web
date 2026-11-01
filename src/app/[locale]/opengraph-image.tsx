import { ImageResponse } from "next/og";
import { locales } from "@/i18n/config";
import { BRAND_BLUE, MARK, markPoints } from "@/components/visuals/Logo";

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
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#04060c", color: "#f2f5fa", padding: 72, position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", right: -120, top: -160, width: 700, height: 700, borderRadius: 700, background: "rgba(47,107,255,0.28)", filter: "blur(120px)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="64" height="67" viewBox={`0 0 ${MARK.width} ${MARK.height}`}>
              <polygon points={markPoints(MARK.blue)} fill={BRAND_BLUE} />
              <polygon points={markPoints(MARK.white)} fill="#f2f5fa" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 8 }}>YESIR</span>
              <span style={{ fontSize: 14, letterSpacing: 14, color: BRAND_BLUE }}>DESIGN</span>
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
