import type { RestaurantsCopy } from "@/content/restaurants-copy";

export function Steps({ copy }: { copy: RestaurantsCopy }) {
  const s = copy.steps;
  return (
    <section aria-labelledby="steps-title" className="border-y border-lp-line bg-lp-ink-2">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-lp-sky rtl:tracking-normal">{s.eyebrow}</p>
        <h2 id="steps-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl rtl:tracking-normal">{s.title}</h2>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-lp-line bg-lp-line sm:grid-cols-2 lg:grid-cols-5">
          {s.items.map((step, i) => (
            <li key={step.title} className="bg-lp-ink p-6">
              <span className="font-mono text-sm font-semibold text-lp-sky" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-lp-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
