"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

/** Desktop links with aria-current based on the current path. */
export function NavLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex h-10 items-center text-[0.95rem] text-fg-muted transition-colors hover:text-fg aria-[current=page]:text-fg",
        "after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-500 aria-[current=page]:after:scale-x-100 rtl:after:origin-right",
        className,
      )}
    >
      {children}
    </Link>
  );
}
