import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getI18n, getLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { getChannels } from "@/lib/contact";
import { routes } from "@/lib/routes";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumbs, PageHero } from "@/components/sections/PageHero";
import { PageTransition } from "@/components/layout/PageTransition";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  return buildMetadata({ locale, path: routes.contact, title: t.contactPage.metaTitle, description: t.contactPage.metaDescription });
}

export default async function ContactPage() {
  const { locale, t } = await getI18n();
  const cp = t.contactPage;
  const channels = getChannels(t);
  const { address } = siteConfig;

  return (
    <PageTransition>
      <PageHero
        eyebrow={cp.eyebrow}
        title={cp.title}
        accent={cp.titleAccent}
        lead={cp.lead}
        breadcrumbs={<Breadcrumbs label={t.common.breadcrumbHome} items={[{ href: localePath(locale, "/"), name: t.common.breadcrumbHome }, { name: t.nav.contact }]} />}
      />
      <section className="py-section-sm">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-5">
            <div>
              <Eyebrow index="01">{cp.channelsTitle}</Eyebrow>
              {channels.length > 0 ? (
                <ul className="mt-8 border-t border-line">
                  {channels.map((ch) => (
                    <li key={ch.kind} className="border-b border-line">
                      <a href={ch.href} {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group/btn group flex items-center justify-between gap-6 py-6">
                        <span className="flex items-center gap-4">
                          <span className="inline-flex size-11 items-center justify-center border border-line-strong">
                            <ChannelIcon kind={ch.kind} className={ch.kind === "whatsapp" ? "size-5 text-[#25d366]" : "size-5 text-signal-soft"} />
                          </span>
                          <span>
                            <span className="block font-mono text-xs uppercase text-fg-subtle">{ch.label}</span>
                            <span className="mt-1 block text-lg text-fg transition-colors group-hover:text-signal-soft" dir="ltr">{ch.value}</span>
                          </span>
                        </span>
                        <Arrow className="text-fg-subtle" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-8 text-fg-muted">{cp.noChannels}</p>
              )}
            </div>
            <div>
              <Eyebrow index="02">{cp.areaTitle}</Eyebrow>
              {address.city && (
                <address className="mt-6 not-italic text-fg">
                  {[address.street, [address.postalCode, address.city].filter(Boolean).join(" "), address.region].filter(Boolean).map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
              )}
              <p className="mt-4 text-fg-muted">{t.about.areaText}</p>
            </div>
            <div className="border border-line bg-ink-900 p-6">
              <p className="text-fg">{cp.quoteHint}</p>
              <Link href={localePath(locale, routes.quote)} className="group/btn mt-3 inline-flex items-center gap-3 text-signal-soft hover:text-fg">
                {cp.quoteHintLink}
                <Arrow />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="border border-line bg-ink-950 p-6 md:p-10">
              <h2 className="mb-8 text-h3 font-medium">{cp.formTitle}</h2>
              <LeadForm
                kind="contact"
                locale={locale}
                t={t.form}
                privacy={{ text: t.quotePage.privacy, link: t.quotePage.privacyLink, href: localePath(locale, routes.privacy) }}
              />
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
