# YESIR DESIGN — Website

Multilingual (FR · AR · EN) marketing website for **YESIR DESIGN**, a creative and digital agency in Algeria.
Built with Next.js 16 (App Router, Cache Components), TypeScript and Tailwind CSS v4.

French is the default language. Arabic is fully right-to-left. Every page is statically prerendered;
the only server code is the lead-submission Server Action.

---

## Architecture

```
src/
├── app/
│   ├── [locale]/                 # Root layout per locale (lang/dir, fonts, header, footer)
│   │   ├── page.tsx              # Home
│   │   ├── services/             # Services overview + [slug] service pages
│   │   ├── projets/              # Portfolio + [slug] project template
│   │   ├── agence/               # About
│   │   ├── contact/              # Contact (form + configured channels)
│   │   ├── devis/                # Quote request (supports ?service=<slug>)
│   │   ├── confidentialite/      # Privacy policy
│   │   ├── conditions/           # Terms & conditions
│   │   ├── opengraph-image.tsx   # Generated OG image per locale
│   │   ├── not-found.tsx         # Localized 404
│   │   └── [...rest]/            # Unknown paths → localized 404
│   ├── actions/leads.ts          # Server Action: anti-spam, rate limit, validation, delivery
│   ├── sitemap.ts · robots.ts (AI crawlers allowed) · llms.txt/ · manifest.ts · icon.svg
│   └── globals.css               # Design system (tokens, type scale, motion)
├── proxy.ts                      # Redirects unprefixed URLs to a locale (Accept-Language, default fr)
├── config/site.ts                # Business config from env vars (contacts, address, socials)
├── content/
│   ├── catalog.ts                # Language-independent structure: categories, services, projects, statuses
│   ├── copy/{fr,ar,en}.ts        # Localized service / category / project copy
│   └── legal/{fr,ar,en}.ts       # Legal pages copy
├── i18n/
│   ├── config.ts                 # Locales, direction, helpers
│   ├── server.ts                 # getI18n() via next/root-params
│   └── dictionaries/{fr,ar,en}.ts# UI strings (fr.ts defines the type)
├── lib/                          # SEO/metadata, JSON-LD schemas, lead validation & delivery, routes
└── components/
    ├── layout/                   # Header (CSS mega menu), MobileMenu (<dialog>), LanguageSwitcher, Footer, MobileContactBar
    ├── sections/                 # PageHero, CtaBand, Faq (<details>), LegalPage
    ├── portfolio/                # ProjectCard, ProjectFilter
    ├── forms/                    # LeadForm (quote + contact)
    ├── ui/                       # Button, Section, StatusBadge, ChannelIcon
    └── visuals/                  # Logo (official mark, vectorised), HeroVisual, ProjectCover, CategoryGlyph
```

**Design principles**

- **Tokens** live in `src/app/globals.css` (`@theme`): ink/navy surfaces, electric blue `signal`, fluid type scale
  (`text-display`, `text-h1`…), spacing (`py-section`), easing curves. Arabic swaps fonts and neutralises Latin tracking.
- **Minimal client JavaScript.** Scroll reveals and the header background use CSS scroll-driven animations; the FAQ
  uses `<details>`; the desktop mega-menu is CSS-only; page transitions use React `<ViewTransition>`.
  Client components are limited to: mobile menu, language switcher, active nav link, portfolio filter and forms.
- **Dependencies:** `next`, `react`, `lucide-react`. Nothing else at runtime.
- **No fabricated content.** Contact channels render only when configured. Projects display an explicit status
  (completed / concept / internal product / in progress). Covers are labelled illustrations until real visuals are added.

## Logo

The official logo is vectorised in `src/components/visuals/Logo.tsx` (`MARK` polygons + Michroma wordmark),
so it stays sharp at every size and sits on the site background without a box. The same mark drives the favicon
(`src/app/icon.svg`), the Open Graph image, the hero sign letter and the brand project cover.
If you receive the source vector (SVG/AI/PDF) from the designer, replace the `MARK` coordinates with its paths.

## Installation

Requirements: Node.js 20.9+ (tested on 22).

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000 → redirects to /fr
```

## Commands

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Development server                            |
| `npm run build`     | Production build (prerenders all pages)       |
| `npm start`         | Serve the production build                    |
| `npm run lint`      | ESLint                                        |
| `npm run typecheck` | Generate route types and run `tsc --noEmit`   |

## Environment variables

See `.env.example` for the full annotated list.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | build | Custom domain for canonical, hreflang, sitemap, OG. On Vercel, falls back to the project's production domain (`VERCEL_PROJECT_PRODUCTION_URL`) when unset. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | build | `false` blocks crawlers. Vercel preview deployments are always blocked automatically; production is always allowed. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | build | WhatsApp number, digits only (`2136…`). Enables every WhatsApp button. |
| `NEXT_PUBLIC_PHONE_NUMBER` / `NEXT_PUBLIC_CONTACT_EMAIL` | build | Click-to-call and email links. |
| `NEXT_PUBLIC_LEGAL_NAME`, `NEXT_PUBLIC_BUSINESS_*` | build | Legal entity and address (also added to LocalBusiness schema). |
| `NEXT_PUBLIC_*_URL` | build | Social profiles. |
| `LEADS_WEBHOOK_URL` / `LEADS_WEBHOOK_SECRET` | runtime | Send leads to n8n/Make/Zapier, HMAC-signed. |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | runtime | Store leads in Supabase (`supabase/migrations/0001_leads.sql`). |
| `RESEND_API_KEY` / `LEADS_EMAIL_TO` / `LEADS_EMAIL_FROM` | runtime | Email notification for each lead. |

`NEXT_PUBLIC_*` values are inlined at build time — rebuild after changing them.

### How form submission works

1. Client-side validation (shared rules in `src/lib/leads.ts`) gives instant, accessible feedback.
2. The Server Action re-validates everything, checks a honeypot field and a minimum fill time, and rate-limits per IP
   (5 submissions / 10 min, in memory — add a shared limiter or WAF rule for multi-instance hosting).
3. The lead is sent to **every configured channel** in parallel. The visitor sees a success message (with a reference
   and an optional "follow up on WhatsApp" link) **only if at least one channel confirmed receipt**.
   With no channel configured, the form says sending is unavailable and the server logs the configuration error.

For Supabase: run `supabase/migrations/0001_leads.sql` in the SQL editor, then set `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` (server-side only — never expose it as `NEXT_PUBLIC_`).

## Deployment

**Vercel (recommended):** import the repository, add the environment variables (Production and Preview), deploy.
Preview deployments are kept out of search engines automatically.

**Self-hosted (Node):**

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://www.your-domain.dz npm run build
npm start   # port 3000; put Nginx/Caddy with HTTPS in front
```

Cache Components requires the Node.js runtime (no static export, no edge runtime).
After the first deployment, submit `https://<domain>/sitemap.xml` in Google Search Console.

## Adding or editing a portfolio project

1. Add the slug to `projectSlugs` and an entry in `projects` in `src/content/catalog.ts`:
   - `category`: `web | signage | marketing | automation | products`
   - `status`: `completed | concept | internal | in-progress` — **must reflect reality**, it is shown publicly
   - `services`: related service slugs · `cover`: SVG illustration variant · `featured`: show on the home page
   - `images`: real visuals, e.g. `[{ src: "/projects/my-project/home.webp", width: 1600, height: 1000 }]`
     (files in `public/projects/…`). The first image replaces the illustration; others form a gallery.
   - `url`: optional live link (with the client's agreement)
2. Add the localized copy under `projects` in `src/content/copy/fr.ts`, `ar.ts` and `en.ts`
   (TypeScript fails the build if a language is missing).
3. Optionally list the project in a service's `related` array.

## Editing services

- Structure (categories, order, tier, which services belong where, related projects): `src/content/catalog.ts`.
  Tiers drive the visual hierarchy: `core` (large), `growth` (wide), `systems` (compact).
- Wording (titles, SEO title/description, problems, deliverables, process, client types): `src/content/copy/{locale}.ts`.
- A new service needs a slug in `serviceSlugs`, an entry in `services`, a place in a category, and copy in all three
  languages. Its page, sitemap entry, navigation and quote-form option are generated automatically.

## Editing translations

- UI strings: `src/i18n/dictionaries/fr.ts` is the reference; `ar.ts` and `en.ts` are type-checked against it.
- French typography uses non-breaking spaces before `: ; ? !` (` `).
- Arabic uses `dir="rtl"`; prefer logical Tailwind utilities (`ms-`, `pe-`, `start-`, `text-start`) in new components.
- Routes use French slugs in every language (`/ar/services/creation-site-web`), defined in `src/lib/routes.ts`.

## Before going live — checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL`, contact variables and at least one lead delivery channel, then submit a test lead.
- [ ] Confirm each project's **status** and description in `catalog.ts` / `copy/*` and add real visuals.
- [ ] Have the privacy policy and terms (`src/content/legal/*`) reviewed by a legal professional and complete the legal entity details.
- [ ] Register the domain in Google Search Console and create/verify the Google Business Profile.
