import { siteConfig } from "@/config/site";
import { localePath, localeMeta, type Locale } from "@/i18n/config";
import { absoluteUrl } from "./seo";

const orgId = () => `${siteConfig.url}/#organization`;

/**
 * ProfessionalService schema. Only verifiable facts are emitted: the address
 * and contact points appear only when configured through environment variables;
 * the cities served are declared as `areaServed`, not as office locations.
 */
export function organizationSchema(locale: Locale, description: string, services: string[]) {
  const { address, contact, social } = siteConfig;
  const hasAddress = Boolean(address.city);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId(),
    name: siteConfig.name,
    url: absoluteUrl(localePath(locale, "/")),
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl(`${localePath(locale, "/")}/opengraph-image`),
    description,
    inLanguage: localeMeta[locale].htmlLang,
    areaServed: [
      ...siteConfig.serviceArea.map((name) => ({ "@type": "City", name })),
      { "@type": "Country", name: "Algérie" },
    ],
    knowsAbout: services,
    sameAs: Object.values(social).filter(Boolean),
  };
  if (hasAddress) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressRegion: address.region,
      addressCountry: "DZ",
    };
  }
  if (contact.phone) data.telephone = contact.phone;
  if (contact.email) data.email = contact.email;
  if (contact.phone || contact.whatsapp) {
    data.contactPoint = {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: contact.phone ?? `+${contact.whatsapp}`,
      availableLanguage: ["French", "Arabic", "English"],
    };
  }
  return data;
}

export function breadcrumbSchema(items: { name: string; path: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path)),
    })),
  };
}

export function serviceSchema({ name, description, path, locale, category }: { name: string; description: string; path: string; locale: Locale; category: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: category,
    url: absoluteUrl(localePath(locale, path)),
    provider: { "@id": orgId() },
    areaServed: { "@type": "Country", name: "Algérie" },
    inLanguage: localeMeta[locale].htmlLang,
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
