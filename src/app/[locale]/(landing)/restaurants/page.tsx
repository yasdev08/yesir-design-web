import { restaurantsCopy } from "@/content/restaurants-copy";
import { getLocale } from "@/i18n/server";
import { Hero } from "@/components/restaurants/Hero";
import { Proof } from "@/components/restaurants/Proof";

export default async function RestaurantsPage() {
  const locale = await getLocale();
  const copy = restaurantsCopy(locale);
  return (
    <>
      <Hero copy={copy} />
      <Proof copy={copy} locale={locale} />
    </>
  );
}
