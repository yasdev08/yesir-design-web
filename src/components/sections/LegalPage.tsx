import { siteConfig } from "@/config/site";
import { localeMeta, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import type { LegalSection } from "@/content/legal/types";
import { Breadcrumbs, PageHero } from "./PageHero";

const fill = (text: string) => text.replaceAll("{brand}", siteConfig.name).replaceAll("{legal}", siteConfig.legalName);

export function LegalPage({ locale, t, title, intro, sections, updated }: { locale: Locale; t: Dictionary; title: string; intro: string; sections: LegalSection[]; updated: string }) {
  const date = new Intl.DateTimeFormat(localeMeta[locale].htmlLang, { dateStyle: "long", timeZone: "UTC", numberingSystem: "latn" }).format(new Date(updated));
  return (
    <>
      <PageHero
        eyebrow={t.footer.legalTitle}
        title={title}
        lead={fill(intro)}
        breadcrumbs={<Breadcrumbs label={t.common.breadcrumbHome} items={[{ href: localePath(locale, "/"), name: t.common.breadcrumbHome }, { name: title }]} />}
      >
        <p className="mt-8 font-mono text-xs text-fg-subtle">
          {t.legal.updated} — <time dateTime={updated}>{date}</time>
        </p>
      </PageHero>
      <div className="container-site py-section-sm">
        <div className="max-w-prose space-y-12">
          {sections.map((section, i) => (
            <section key={section.title} aria-labelledby={`legal-${i}`}>
              <h2 id={`legal-${i}`} className="flex items-baseline gap-4 text-h3 font-medium">
                <span className="font-mono text-xs text-signal-soft">{String(i + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-fg-muted">
                {section.paragraphs.map((p) => (
                  <p key={p}>{fill(p)}</p>
                ))}
                {section.list && (
                  <ul className="space-y-2 ps-5 marker:text-signal-soft [list-style:square]">
                    {section.list.map((item) => (
                      <li key={item}>{fill(item)}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
