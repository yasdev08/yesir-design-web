"use client";

import { useSearchParams } from "next/navigation";
import { serviceSlugs } from "@/content/catalog";
import { LeadForm } from "./LeadForm";

type Props = Omit<React.ComponentProps<typeof LeadForm>, "initialService" | "kind">;

/** Pre-selects the service from `?service=<slug>` (links from service pages). */
export function QuoteFormWithParams(props: Props) {
  const requested = useSearchParams().get("service") ?? "";
  const initialService = (serviceSlugs as readonly string[]).includes(requested) ? requested : "";
  return <LeadForm key={initialService} kind="quote" initialService={initialService} {...props} />;
}
