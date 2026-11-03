import type { RestaurantsCopy } from "@/content/restaurants-copy";
import { CallLink, WaLink } from "./ContactLinks";

export function Hero({ copy }: { copy: RestaurantsCopy }) {
  const h = copy.hero;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="bg-blueprint bg-blueprint-fade absolute inset-0" />
      <div aria-hidden className="glow-blob absolute -end-40 -top-56 size-[42rem] [--glow-alpha:0.22]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:pb-16 sm:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-lp-sky rtl:tracking-normal">{h.eyebrow}</p>
        <h1 id="hero-title" className="mt-4 max-w-3xl text-[clamp(2rem,7.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] rtl:leading-[1.3] rtl:tracking-normal">
          {h.title}
        </h1>
        <p className="mt-5 text-lg text-lp-muted sm:text-xl">{h.sub}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WaLink message={copy.messages.base} track="hero" className="w-full text-lg sm:w-auto">
            {h.cta}
          </WaLink>
          <CallLink track="hero" className="w-full sm:w-auto">
            {h.call}
          </CallLink>
        </div>
        <p className="mt-5 text-sm text-lp-muted">{h.priceHint}</p>
      </div>
    </section>
  );
}
