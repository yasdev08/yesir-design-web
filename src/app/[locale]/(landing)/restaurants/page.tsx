import type { Metadata } from "next";
import { restaurantsCopy } from "@/content/restaurants-copy";
import { getDictionary, getLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { restaurantsSchema } from "@/lib/restaurants-schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/restaurants/Hero";
import { Proof } from "@/components/restaurants/Proof";
import { Pricing } from "@/components/restaurants/Pricing";
import { Projects } from "@/components/restaurants/Projects";
import { Steps } from "@/components/restaurants/Steps";
import { Faq } from "@/components/restaurants/Faq";
import { FinalCta } from "@/components/restaurants/FinalCta";
import { FloatingWhatsApp } from "@/components/restaurants/FloatingWhatsApp";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = restaurantsCopy(locale);
  return buildMetadata({ locale, path: "/restaurants", title: copy.metaTitle, description: copy.metaDescription, absoluteTitle: true });
}

export default async function RestaurantsPage() {
  const locale = await getLocale();
  const copy = restaurantsCopy(locale);
  const t = getDictionary(locale);
  return (
    <>
      <Hero copy={copy} />
      <Proof copy={copy} locale={locale} />
      <Pricing copy={copy} locale={locale} />
      <Projects copy={copy} locale={locale} />
      <Steps copy={copy} />
      <Faq copy={copy} />
      <FinalCta copy={copy} locale={locale} />
      <FloatingWhatsApp copy={copy} />
      <JsonLd data={restaurantsSchema(locale, copy, t.nav.home)} />
    </>
  );
}
