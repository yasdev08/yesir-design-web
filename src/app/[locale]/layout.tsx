import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Instrument_Serif, Inter_Tight, JetBrains_Mono, Michroma } from "next/font/google";
import { siteConfig } from "@/config/site";
import { localeMeta, locales } from "@/i18n/config";
import { getContent, getDictionary, getLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import "../globals.css";

const interTight = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--font-inter-tight", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin", "latin-ext"], weight: "400", style: ["italic", "normal"], variable: "--font-instrument-serif", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
const michroma = Michroma({ subsets: ["latin"], weight: "400", variable: "--font-michroma", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600"], variable: "--font-plex-arabic", display: "swap", preload: false });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    ...buildMetadata({ locale, path: "/", title: t.meta.title, description: t.meta.description, absoluteTitle: true }),
    title: { default: t.meta.title, template: t.meta.titleTemplate },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#04060c",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const c = getContent(locale);
  const meta = localeMeta[locale];
  const fontVars = [interTight.variable, instrumentSerif.variable, jetbrainsMono.variable, plexArabic.variable, michroma.variable].join(" ");

  return (
    <html lang={meta.htmlLang} dir={meta.dir} className={fontVars}>
      <body>
        <a
          href="#main"
          className="fixed start-4 top-4 z-[100] -translate-y-24 bg-signal px-4 py-3 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          {t.nav.skip}
        </a>
        {children}
        <JsonLd data={organizationSchema(locale, t.meta.description, Object.values(c.services).map((s) => s.name))} />
      </body>
    </html>
  );
}
