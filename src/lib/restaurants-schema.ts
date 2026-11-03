import { business } from "@/content/business";
import { digitalPresence, qrOnly } from "@/content/pricing";
import type { RestaurantsCopy } from "@/content/restaurants-copy";
import { localeMeta, localePath, type Locale } from "@/i18n/config";
import { absoluteUrl } from "./seo";

/** LocalBusiness + FAQPage + BreadcrumbList for /restaurants. */
export function restaurantsSchema(locale: Locale, copy: RestaurantsCopy, homeLabel: string) {
  const url = absoluteUrl(localePath(locale, "/restaurants"));
  const offer = (name: string, price: number) => ({
    "@type": "Offer",
    name,
    price,
    priceCurrency: "DZD",
    url,
  });
  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${absoluteUrl("/")}#localbusiness`,
      name: business.name,
      slogan: business.tagline[locale],
      description: copy.metaDescription,
      url,
      image: `${url}/opengraph-image`,
      logo: absoluteUrl("/icon.svg"),
      telephone: business.phone.e164,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${business.address.street}, ${business.address.district}`,
        addressLocality: business.address.city,
        addressCountry: business.address.country,
      },
      openingHours: business.hours.schema,
      areaServed: business.serviceArea.schema.map((name, i) => ({ "@type": i === 0 ? "City" : "Country", name })),
      priceRange: "35000–99000 DZD",
      inLanguage: localeMeta[locale].htmlLang,
      makesOffer: [
        ...digitalPresence.packs.map((p) => offer(`${digitalPresence.name} ${p.name}`, p.price)),
        ...qrOnly.tiers.map((t) => offer(`Menu QR ${t.name}`, t.price)),
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: absoluteUrl(localePath(locale, "/")) },
        { "@type": "ListItem", position: 2, name: copy.hero.eyebrow.split("·")[0].trim(), item: url },
      ],
    },
  ];
}
