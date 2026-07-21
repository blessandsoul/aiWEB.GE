/**
 * THE ONE FILE THAT DIFFERS PER LANDING.
 *
 * Everything else in this repo is shared with the other aiNOW product landings and is kept in
 * sync from `landing-template/` by `python scripts/landings.py sync`. If you find yourself
 * editing a shared file to make THIS site different, stop: the difference belongs here, or in
 * src/messages/*.json, or in this site's own widgets under src/features/showcase/.
 *
 * Per-site, never synced: src/config/site.ts, src/app/brand.css, src/messages/*.json,
 * src/features/showcase/**, src/features/home/components/LandingShowcase.tsx,
 * .impeccable/config.json, public/**.
 */

export const SITE = {
  /** Machine key. Lands on <html data-product> and is the deploy smoke-test hook. */
  key: "aiweb",

  domain: "aiweb.ge",
  baseUrl: "https://aiweb.ge",

  /** Rendered as <prefix><mark> by the nav, hero, footer and wordmark band. */
  wordmark: { prefix: "ai", mark: "WEB" },

  /** The product colour. src/app/brand.css is generated from this; keep them in step. */
  brandHex: "#00b8f0",

  /** Three hexes the hero grainient shader interpolates: soft, brand, accent. */
  shader: ["#c8f5ff", "#00b8f0", "#0077ff"] as [string, string, string],

  /**
   * i18n.
   *
   * `defaultLocale` is the UNPREFIXED locale (next-intl `localePrefix: "as-needed"`), so it
   * decides the URL shape: the default lives at `/`, the others at `/<locale>`. The Georgian
   * landings use "ka"; the export landings (aiapp, vibecoding) use "en".
   *
   * It is NOT the same question as "is this locale Georgian". That stays a literal
   * `locale === "ka"` check wherever it appears, because it drives the Georgian font and the OG
   * locale tag, and Georgian is still an offered locale even on an EN-default site. Do not
   * find-replace one for the other.
   */
  defaultLocale: "ka",
  locales: ["ka", "en", "ru"],

  /** PWA manifest. Not locale-aware (Next metadata routes are build-time). English. */
  manifest: {
    name: "aiWEB",
    short: "aiWEB",
    description: "Business websites built and maintained by aiNOW.",
    background: "#fbfcfc",
    theme: "#06b6d4",
  },
  /**
   * The machine-readable half of the page.
   *
   * StructuredData.tsx turns this into the JSON-LD entity graph and /llms.txt turns it
   * into prose. Between them they decide whether ChatGPT, Perplexity and Gemini can
   * recommend this domain, or whether they have to guess and therefore stay quiet.
   *
   * `boundary` names the sibling product that owns the adjacent job, so our own six
   * domains stop competing for the same query and a model can route a question
   * correctly. `limits` states what we cannot do, which looks like a mistake and is the
   * opposite: an assistant will not stake an answer on a page that claims to do
   * everything, and it will happily cite one that draws its own edges.
   */
  seo: {
    disambiguating:
      "aiWEB is aiNOW's website creation and maintenance service for businesses in Georgia. aiNOW plans the site, prepares the copy, builds the mobile and desktop pages, and handles updates under an agreed care plan. It is not a DIY builder or a customer-chat service.",
    serviceType: "Business website design, build, and ongoing maintenance",
    audienceName:
      "Georgian small businesses: clinics, restaurants, construction firms, auto services, tourism, shops",
    areaServed: "GE",
    knowsAbout: [
      "Business websites",
      "Mobile website design",
      "Website copy",
      "Website performance",
      "Website maintenance",
      "Local business information",
      "Search-friendly site structure",
      "Website forms",
    ],
    features: [
      "Scope, schedule and care terms agreed before work starts",
      "A working preview reviewed on a real page before launch",
      "Website copy prepared by aiNOW and approved by the business",
      "Mobile and desktop layouts checked before launch",
      "Forms, buttons and contact paths tested before launch",
      "Agreed updates and technical care handled after launch",
      "Structured content that search systems can understand",
    ],
    boundary:
      "aiWEB creates and maintains the website. aiSTAFF handles written customer messages. aiCALL manages the phone-call process.",
    limits: [
      "aiNOW does not promise a specific Google ranking.",
      "aiNOW does not promise that an assistant will mention or cite the website.",
      "Search visibility depends on the market, content and other factors outside the website build.",
      "Performance recommendations require measurement of the actual website and its third-party services.",
    ],
    commitment:
      "aiNOW agrees the scope, schedule, ownership, handover and care terms before work starts.",
    summary:
      "aiWEB is aiNOW's website service for businesses in Georgia. aiNOW plans the pages, prepares the copy, builds the site, checks it with the client and handles agreed updates after launch. The business keeps control of the content, domain and approval process.",
  },
} as const;

export type SiteConfig = typeof SITE;
