import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";

/** Neutral stand-in shown when a project image or video has not been added yet. */
export function MediaPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 bg-lp-ink-2 text-sm text-lp-muted", className)}>
      <ImageOff aria-hidden className="size-6" strokeWidth={1.5} />
      <span>{label}</span>
    </div>
  );
}
