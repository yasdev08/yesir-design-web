import { Plus } from "lucide-react";
import type { RestaurantsCopy } from "@/content/restaurants-copy";

/** Native <details> accordion: accessible and works without JavaScript. */
export function Faq({ copy }: { copy: RestaurantsCopy }) {
  const f = copy.faq;
  return (
    <section aria-labelledby="faq-title" className="bg-lp-surface text-lp-ink">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <h2 id="faq-title" className="text-3xl font-semibold tracking-tight sm:text-4xl rtl:tracking-normal">{f.eyebrow}</h2>
        <div className="mt-8 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
          {f.items.map((item) => (
            <details key={item.q} className="faq-item group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-start text-lg font-semibold">
                <span>{item.q}</span>
                <Plus aria-hidden className="faq-icon size-5 shrink-0 text-lp-blue transition-transform duration-200" strokeWidth={2.25} />
              </summary>
              <p className="px-5 pb-5 text-lp-muted-dark">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
