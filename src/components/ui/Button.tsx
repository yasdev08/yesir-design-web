import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 whitespace-nowrap font-medium transition-[background-color,border-color,color,transform] duration-300 ease-out select-none disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-white hover:bg-signal-strong active:translate-y-px shadow-[0_0_0_1px_rgb(91_140_255/0.4),0_10px_40px_-12px_rgb(47_107_255/0.7)]",
  secondary:
    "border border-line-strong text-fg hover:border-signal-soft hover:text-white bg-transparent",
  ghost: "text-fg hover:text-signal-soft px-0!",
  light: "bg-paper text-ink-text hover:bg-white",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem] rounded-xs",
  lg: "h-14 px-7 text-base rounded-xs",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Directional arrow that flips in RTL and nudges forward on hover. */
export function Arrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden
      strokeWidth={1.75}
      className={cn(
        "size-[1.1em] shrink-0 transition-transform duration-300 ease-out rtl:-scale-x-100 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1",
        className,
      )}
    />
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  icon?: ReactNode;
};

export function ButtonLink({ variant = "primary", size = "md", className, arrow, icon, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {icon}
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

type AnchorButtonProps = ComponentProps<"a"> & { variant?: Variant; size?: Size; icon?: ReactNode; arrow?: boolean };

/** External links (WhatsApp, tel:, mailto:). */
export function AnchorButton({ variant = "secondary", size = "md", className, icon, arrow, children, ...props }: AnchorButtonProps) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {icon}
      <span>{children}</span>
      {arrow && <Arrow />}
    </a>
  );
}
