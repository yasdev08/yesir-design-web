import { ViewTransition, type ReactNode } from "react";

/** Wraps each page so route changes crossfade/rise (see ::view-transition rules in globals.css). */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
