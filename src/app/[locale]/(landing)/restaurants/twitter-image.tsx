import { locales } from "@/i18n/config";
import { ogAlt, ogSize, restaurantsOgImage } from "@/components/restaurants/og-image";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return restaurantsOgImage(locale);
}
