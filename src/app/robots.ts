import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * AI crawlers explicitly welcomed so the agency can be found and cited by
 * AI assistants and AI search (ChatGPT, Claude, Perplexity, Gemini, Copilot…).
 * They are already covered by "*", but some only trust an explicit rule.
 */
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (Gemini / AI Overviews training opt-in)
  "Google-Extended",
  // Apple, Meta, Microsoft, Amazon, Mistral, DuckDuckGo, Common Crawl
  "Applebot",
  "Applebot-Extended",
  "meta-externalagent",
  "Bingbot",
  "Amazonbot",
  "MistralAI-User",
  "DuckAssistBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  const isProduction = siteConfig.url.startsWith("https://") && process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
