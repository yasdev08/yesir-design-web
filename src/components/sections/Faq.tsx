import { Plus } from "lucide-react";

/** Accessible accordion on native <details> — works without JavaScript. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="faq-item group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-start text-lg font-medium text-fg transition-colors hover:text-signal-soft md:text-xl">
            <span>{item.q}</span>
            <Plus aria-hidden strokeWidth={1.5} className="faq-icon mt-1 size-5 shrink-0 text-signal-soft transition-transform duration-300" />
          </summary>
          <p className="max-w-3xl pb-7 pe-10 text-fg-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
