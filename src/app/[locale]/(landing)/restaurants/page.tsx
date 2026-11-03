import { restaurantsCopy } from "@/content/restaurants-copy";
import { getLocale } from "@/i18n/server";
import { Hero } from "@/components/restaurants/Hero";
import { Proof } from "@/components/restaurants/Proof";
import { Pricing } from "@/components/restaurants/Pricing";
import { Projects } from "@/components/restaurants/Projects";
import { Steps } from "@/components/restaurants/Steps";
import { Faq } from "@/components/restaurants/Faq";
import { FinalCta } from "@/components/restaurants/FinalCta";

export default async function RestaurantsPage() {
  const locale = await getLocale();
  const copy = restaurantsCopy(locale);
  return (
    <>
      <Hero copy={copy} />
      <Proof copy={copy} locale={locale} />
      <Pricing copy={copy} locale={locale} />
      <Projects copy={copy} locale={locale} />
      <Steps copy={copy} />
      <Faq copy={copy} />
      <FinalCta copy={copy} locale={locale} />
    </>
  );
}
