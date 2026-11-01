import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

export function Breadcrumbs({ items, label }: { items: { href?: string; name: string }[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-fg-subtle">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {i > 0 && <ChevronRight aria-hidden className="size-3 rtl:-scale-x-100" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-fg">{item.name}</Link>
            ) : (
              <span aria-current="page" className="text-fg-muted">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  index,
  title,
  accent,
  lead,
  breadcrumbs,
  children,
  aside,
  className,
}: {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  accent?: ReactNode;
  lead?: ReactNode;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-line pb-16 pt-36 md:pb-24 md:pt-44", className)}>
      <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
      <div aria-hidden className="glow-blob absolute -top-80 end-[-20%] size-[56rem]" />
      <div className="container-site relative">
        {breadcrumbs && <div className="mb-10">{breadcrumbs}</div>}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className={aside ? "lg:col-span-8" : "lg:col-span-10"}>
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
            <h1 className="mt-7 text-h1 font-medium">
              {title}
              {accent && (
                <>
                  {" "}
                  <em className="accent text-signal-soft">{accent}</em>
                </>
              )}
            </h1>
            {lead && <p className="mt-8 max-w-2xl text-lead text-fg-muted">{lead}</p>}
            {children}
          </div>
          {aside && <div className="lg:col-span-4">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
