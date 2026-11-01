import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, index, className, tone = "dark" }: { children: ReactNode; index?: string; className?: string; tone?: "dark" | "light" }) {
  return (
    <p className={cn("flex items-center gap-3 font-mono text-eyebrow uppercase", tone === "light" ? "text-signal-strong" : "text-signal-soft", className)}>
      {index && <span className="text-fg-subtle">{index}</span>}
      <span aria-hidden className="h-px w-8 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  accent,
  lead,
  className,
  as: Tag = "h2",
  tone = "dark",
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  accent?: ReactNode;
  lead?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("max-w-3xl", className)} data-reveal>
      {eyebrow && <Eyebrow index={index} tone={tone}>{eyebrow}</Eyebrow>}
      <Tag className={cn("mt-6 font-medium", Tag === "h1" ? "text-h1" : "text-h2", tone === "light" ? "text-ink-text" : "text-fg")}>
        {title}
        {accent && (
          <>
            {" "}
            <em className={cn("accent", tone === "light" ? "text-signal" : "text-signal-soft")}>{accent}</em>
          </>
        )}
      </Tag>
      {lead && (
        <p className={cn("mt-6 max-w-2xl text-lead", tone === "light" ? "text-ink-text-muted" : "text-fg-muted")}>{lead}</p>
      )}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "dark",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "dark" | "light" | "raised";
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative py-section",
        tone === "light" && "bg-paper text-ink-text",
        tone === "raised" && "bg-ink-900",
        className,
      )}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}
