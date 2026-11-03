import { ImageResponse } from "next/og";
import { business } from "@/content/business";
import { digitalPresence, formatDA } from "@/content/pricing";
import { BRAND_BLUE, MARK, markPoints } from "@/components/visuals/Logo";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Menu TV animé + menu QR pour votre restaurant — YESIR DESIGN, Oran";

/**
 * Link-preview image (WhatsApp, Facebook, Instagram, X). Latin text only so it
 * renders with the built-in font in every locale; the Arabic page uses the
 * French image.
 */
export function restaurantsOgImage(locale: string) {
  const en = locale === "en";
  const title = en ? ["Animated TV menu", "+ mobile QR menu"] : ["Menu TV animé", "+ menu QR mobile"];
  const sub = en ? "for your restaurant · Oran & all of Algeria" : "pour votre restaurant · Oran & toute l'Algérie";
  const from = `${en ? "From" : "Dès"} ${formatDA(digitalPresence.packs[0].price, en ? "en" : "fr")}`;
  const cta = en ? "Send MENU on WhatsApp" : "Écrivez MENU sur WhatsApp";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: business.colors.ink, color: "#fff", padding: 64, fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 14, background: business.colors.blue }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="59" viewBox={`0 0 ${MARK.width} ${MARK.height}`}>
            <polygon points={markPoints(MARK.blue)} fill={BRAND_BLUE} />
            <polygon points={markPoints(MARK.white)} fill="#ffffff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: 7 }}>YESIR</span>
            <span style={{ fontSize: 13, letterSpacing: 12, color: business.colors.lightBlue }}>DESIGN</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2 }}>{title[0]}</span>
          <span style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2, color: business.colors.lightBlue }}>{title[1]}</span>
          <span style={{ marginTop: 18, fontSize: 34, color: "#c8ccd6" }}>{sub}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ display: "flex", background: business.colors.blue, borderRadius: 14, padding: "16px 28px", fontSize: 32, fontWeight: 700 }}>{cta}</span>
          <span style={{ fontSize: 30, color: business.colors.lightBlue, fontWeight: 600 }}>{from}</span>
          <span style={{ fontSize: 30, color: "#c8ccd6", marginLeft: "auto" }}>{business.phone.display}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
