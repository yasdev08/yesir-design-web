import type { ProjectStatus } from "@/content/catalog";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { cn } from "@/lib/cn";

const dot: Record<ProjectStatus, string> = {
  completed: "bg-success",
  concept: "bg-warning",
  internal: "bg-signal",
  "in-progress": "bg-cyan",
};

export function StatusBadge({ status, t, className }: { status: ProjectStatus; t: Dictionary; className?: string }) {
  return (
    <span
      title={t.statusHelp[status]}
      className={cn("inline-flex items-center gap-2 border border-line-strong bg-ink-950/70 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-fg-muted backdrop-blur", className)}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", dot[status])} />
      {t.status[status]}
    </span>
  );
}
