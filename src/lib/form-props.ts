import { categories } from "@/content/catalog";
import type { ContentCopy } from "@/content/copy/types";
import type { ServiceGroup } from "@/components/forms/LeadForm";

export function serviceGroups(c: ContentCopy): ServiceGroup[] {
  return categories.map((cat) => ({
    label: c.categories[cat.id].name,
    options: cat.services.map((slug) => ({ value: slug, label: c.services[slug].name })),
  }));
}
