"use client";

import { useState, type ReactNode } from "react";
import type { CategoryId } from "@/content/catalog";
import { cn } from "@/lib/cn";

interface Props {
  label: string;
  allLabel: string;
  emptyLabel: string;
  filters: { id: CategoryId; label: string; count: number }[];
  /** Cards are rendered on the server; the client only toggles visibility. */
  items: { category: CategoryId; node: ReactNode; key: string }[];
}

export function ProjectFilter({ label, allLabel, emptyLabel, filters, items }: Props) {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const visible = items.filter((i) => active === "all" || i.category === active);
  const options = [{ id: "all" as const, label: allLabel, count: items.length }, ...filters];

  return (
    <div>
      <div role="group" aria-label={label} className="-mx-[var(--spacing-gutter)] flex gap-2 overflow-x-auto px-[var(--spacing-gutter)] pb-2 [scrollbar-width:none]">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            aria-pressed={active === opt.id}
            onClick={() => setActive(opt.id)}
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-2 border px-4 text-sm transition-colors",
              active === opt.id ? "border-signal bg-signal text-white" : "border-line-strong text-fg-muted hover:border-signal-soft hover:text-fg",
            )}
          >
            {opt.label}
            <span className={cn("font-mono text-xs", active === opt.id ? "text-white/70" : "text-fg-subtle")}>{opt.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{visible.length}</p>
      {visible.length === 0 ? (
        <p className="mt-16 text-fg-muted">{emptyLabel}</p>
      ) : (
        <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {visible.map((item) => (
            <li key={item.key}>{item.node}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
