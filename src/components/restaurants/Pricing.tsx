import { Check } from "lucide-react";
import { digitalPresence, express, formatDA, qrOnly } from "@/content/pricing";
import type { RestaurantsCopy } from "@/content/restaurants-copy";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { WaLink } from "./ContactLinks";

export function Pricing({ copy, locale }: { copy: RestaurantsCopy; locale: Locale }) {
  const p = copy.pricing;
  return (
    <section id="tarifs" aria-labelledby="pricing-title" className="bg-lp-surface text-lp-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-lp-blue rtl:tracking-normal">{p.eyebrow}</p>
        <h2 id="pricing-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl rtl:tracking-normal">{p.title}</h2>
        <p className="mt-2 text-lp-muted-dark">{p.sub}</p>

        <ul className="mt-10 grid gap-4 md:grid-cols-3 md:items-stretch">
          {digitalPresence.packs.map((pack) => {
            const price = formatDA(pack.price, locale);
            const highlighted = Boolean(pack.recommended);
            return (
              <li
                key={pack.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-white p-6",
                  highlighted ? "border-2 border-lp-blue shadow-[0_20px_50px_-20px_rgb(42_77_255/0.45)]" : "border-zinc-200",
                )}
              >
                {highlighted && (
                  <span className="absolute -top-3 start-6 rounded-full bg-lp-blue px-3 py-1 text-xs font-bold tracking-wider text-white rtl:tracking-normal">
                    {p.recommended}
                  </span>
                )}
                <h3 className="text-xl font-semibold">{pack.name}</h3>
                <p className="mt-3 text-4xl font-bold tracking-tight" dir={locale === "ar" ? undefined : "ltr"}>
                  <span className="sr-only">{pack.name}: </span>
                  {price}
                </p>
                <ul className="mt-6 space-y-3 text-[0.97rem]">
                  {[p.qr, p.screens(pack.screens), p.video4k].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-lp-blue" strokeWidth={2.25} />
                      {item}
                    </li>
                  ))}
                </ul>
                <WaLink
                  message={copy.messages.pack(pack.name, price)}
                  track={`pricing-${pack.id}`}
                  variant={highlighted ? "primary" : "outline"}
                  className="mt-8 w-full"
                >
                  {p.cta(pack.name)}
                </WaLink>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-lg font-semibold">{p.qrOnlyLine}</p>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm text-lp-muted-dark">
              {qrOnly.tiers.map((tier) => (
                <li key={tier.name} className="rounded-full border border-zinc-200 px-3 py-1.5">
                  {tier.name} · <span dir={locale === "ar" ? undefined : "ltr"}>{formatDA(tier.price, locale)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-lg font-semibold">{p.monthly}</p>
            <p className="mt-1 text-sm text-lp-muted-dark">{p.monthlyIncludes}</p>
            <p className="mt-4 font-medium">{p.payment}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-dashed border-lp-blue/50 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold">{p.expressTitle}</p>
            <p className="mt-1 text-sm text-lp-muted-dark">{p.expressSub}</p>
          </div>
          <a
            href={express.url}
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-lp-blue px-5 py-2.5 text-sm font-semibold text-lp-blue hover:bg-lp-blue hover:text-white"
          >
            {p.expressCta}
          </a>
        </div>
        <ul className="mt-6 space-y-1 text-sm text-lp-muted-dark">
          <li>{p.tvNote}</li>
          <li>{p.delay}</li>
        </ul>
      </div>
    </section>
  );
}
