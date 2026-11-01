import type { Metadata } from "next";
import { Suspense } from "react";
import { localePath } from "@/i18n/config";
import { getDictionary, getI18n, getLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { getChannels } from "@/lib/contact";
import { serviceGroups } from "@/lib/form-props";
import { routes } from "@/lib/routes";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { Eyebrow } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { QuoteFormWithParams } from "@/components/forms/QuoteFormWithParams";
import { Breadcrumbs } from "@/components/sections/PageHero";
import { PageTransition } from "@/components/layout/PageTransition";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  return buildMetadata({ locale, path: routes.quote, title: t.quotePage.metaTitle, description: t.quotePage.metaDescription });
}

export default async function QuotePage() {
  const { locale, t, c } = await getI18n();
  const q = t.quotePage;
  const channels = getChannels(t);
  const formProps = {
    locale,
    t: t.form,
    serviceGroups: serviceGroups(c),
    privacy: { text: q.privacy, link: q.privacyLink, href: localePath(locale, routes.privacy) },
  };

  return (
    <PageTransition>
      <section className="relative overflow-hidden pb-section-sm pt-36 md:pt-44">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <div className="container-site relative">
          <Breadcrumbs label={t.common.breadcrumbHome} items={[{ href: localePath(locale, "/"), name: t.common.breadcrumbHome }, { name: q.eyebrow }]} />
          <div className="mt-10 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>{q.eyebrow}</Eyebrow>
                <h1 className="mt-7 text-h1 font-medium">
                  {q.title} <em className="accent text-signal-soft">{q.titleAccent}</em>
                </h1>
                <p className="mt-6 max-w-md text-lead text-fg-muted">{q.lead}</p>
                <div className="mt-12">
                  <p className="font-mono text-eyebrow uppercase text-fg-subtle">{q.stepsTitle}</p>
                  <ol className="mt-5 space-y-4">
                    {q.steps.map((step, i) => (
                      <li key={step} className="flex gap-4">
                        <span className="font-mono text-xs leading-7 text-signal-soft">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-fg-muted">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                {channels.length > 0 && (
                  <ul className="mt-12 flex flex-wrap gap-2">
                    {channels.map((ch) => (
                      <li key={ch.kind}>
                        <a href={ch.href} {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-11 items-center gap-2 border border-line-strong px-4 text-sm text-fg-muted hover:border-signal-soft hover:text-fg">
                          <ChannelIcon kind={ch.kind} className={ch.kind === "whatsapp" ? "text-[#25d366]" : "text-signal-soft"} />
                          {ch.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="border border-line bg-ink-950/80 p-6 backdrop-blur md:p-10">
                <Suspense fallback={<LeadForm kind="quote" {...formProps} />}>
                  <QuoteFormWithParams {...formProps} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
