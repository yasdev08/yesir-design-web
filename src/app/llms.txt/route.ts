import { categories, projects } from "@/content/catalog";
import { siteConfig } from "@/config/site";
import fr from "@/content/copy/fr";
import en from "@/content/copy/en";
import { routes } from "@/lib/routes";

/**
 * /llms.txt — a plain-text, factual summary of the site for AI assistants
 * (https://llmstxt.org). Generated from the same content as the pages, so it
 * never drifts from what the website says.
 */
export function GET() {
  const url = (locale: string, path: string) => `${siteConfig.url}/${locale}${path === "/" ? "" : path}`;
  const { contact } = siteConfig;
  const statusLabel = { completed: "completed client project", concept: "concept", internal: "internal product", "in-progress": "in progress" };

  const lines = [
    `# ${siteConfig.name}`,
    "",
    "> Creative and digital agency in Algeria. Websites and e-commerce, Meta & Google advertising, local SEO, WhatsApp and workflow automation, illuminated signage and storefronts, print, QR digital menus and digital products. Serving businesses in Mascara, Oran, Algiers and across Algeria. Website in French (default), Arabic and English.",
    "",
    "Project statuses on this site are explicit (completed / concept / internal product / in progress); no testimonials or results are claimed.",
    "",
    "## Main pages",
    `- [Home (FR)](${url("fr", "/")})`,
    `- [Home (EN)](${url("en", "/")})`,
    `- [Home (AR)](${url("ar", "/")})`,
    `- [Services](${url("fr", routes.services)})`,
    `- [Projects](${url("fr", routes.projects)})`,
    `- [About the agency](${url("fr", routes.about)})`,
    `- [Request a quote](${url("fr", routes.quote)})`,
    `- [Restaurants: animated TV menu + QR menu, prices and examples](${url("fr", routes.restaurants)})`,
    `- [Contact](${url("fr", routes.contact)})`,
    "",
    "## Services",
    ...categories.flatMap((cat) => [
      "",
      `### ${en.categories[cat.id].name} (${fr.categories[cat.id].name})`,
      en.categories[cat.id].description,
      ...cat.services.map((slug) => `- [${en.services[slug].name}](${url("fr", routes.service(slug))}): ${en.services[slug].short}`),
    ]),
    "",
    "## Projects",
    ...projects.map((p) => `- [${en.projects[p.slug].name}](${url("fr", routes.project(p.slug))}) — ${en.projects[p.slug].kind}, ${statusLabel[p.status]}. ${en.projects[p.slug].summary}`),
    "",
    "## Contact",
    `- Quote form: ${url("fr", routes.quote)}`,
    ...(contact.whatsapp ? [`- WhatsApp: +${contact.whatsapp}`] : []),
    ...(contact.phone ? [`- Phone: ${contact.phone}`] : []),
    ...(contact.email ? [`- Email: ${contact.email}`] : []),
    "",
    "## Optional",
    `- [Sitemap](${siteConfig.url}/sitemap.xml)`,
    `- [Privacy policy](${url("en", routes.privacy)})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
