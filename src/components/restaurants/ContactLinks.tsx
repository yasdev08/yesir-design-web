import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { telHref, waHref } from "@/content/business";
import { WhatsAppIcon } from "@/components/ui/ChannelIcon";
import { cn } from "@/lib/cn";

/**
 * WhatsApp link with a prefilled message. Works without JavaScript; when JS runs,
 * the landing tracker appends the campaign reference and fires the Pixel "Contact"
 * event using `data-track` (the section name).
 */
export function WaLink({
  message,
  track,
  children,
  className,
  variant = "primary",
  ariaLabel,
}: {
  message: string;
  track: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "light";
  ariaLabel?: string;
}) {
  return (
    <a
      href={waHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-wa={message}
      data-track={track}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex min-h-14 items-center justify-center gap-3 rounded-lg px-6 text-base font-semibold transition-colors focus-visible:outline-offset-4",
        variant === "primary" && "bg-lp-blue text-white shadow-[0_10px_30px_-10px_rgb(42_77_255/0.8)] hover:bg-lp-blue-hover",
        variant === "outline" && "border-2 border-lp-blue text-lp-blue hover:bg-lp-blue hover:text-white",
        variant === "light" && "bg-white text-lp-ink hover:bg-lp-surface",
        className,
      )}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      <span>{children}</span>
    </a>
  );
}

export function CallLink({ track, children, className }: { track: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={telHref}
      data-track={track}
      className={cn(
        "inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-white/25 px-6 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/5",
        className,
      )}
    >
      <Phone aria-hidden className="size-5 shrink-0" strokeWidth={2} />
      <span>{children}</span>
    </a>
  );
}
