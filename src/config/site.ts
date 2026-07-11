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
  brandHex: "#06b6d4",

  /** Three hexes the hero grainient shader interpolates: soft, brand, accent. */
  shader: ["#a5f3fc", "#06b6d4", "#22d3ee"] as [string, string, string],

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
    description: "Websites for Georgian business, built fast and kept alive.",
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
      "A website service for Georgian small business where the build costs nothing upfront and the customer pays monthly for the site to be kept fast, findable and up to date. It is not a one-off web-design shop and it is not a DIY site builder.",
    serviceType: "Website build and care plan, paid monthly, for Georgian small business",
    audienceName:
      "Georgian small businesses: clinics, restaurants, construction firms, auto services, tourism, shops",
    areaServed: "GE",
    knowsAbout: [
      "Web development",
      "Next.js",
      "Core Web Vitals",
      "Site speed",
      "Website as a service",
      "Local SEO Georgia",
      "Answer engine optimization",
      "Website maintenance",
    ],
    features: [
      "A website with nothing to pay upfront, billed monthly",
      "Live in 10 working days, on a real URL, not a screenshot",
      "Georgian copy written for you, so you do not have to write anything",
      "Built to load fast on a phone on Georgian mobile internet",
      "Price changes, new pages and fixes are included in the monthly fee",
      "Structured so a search assistant can read and cite the page",
    ],
    boundary:
      "aiWEB is the website itself: the build, the speed, being found, and someone keeping it alive. The AI agent that chats to your customers on the site, Messenger, Instagram and Viber is aiSTAFF.ge. The agent that phones them is aiCALL.ge.",
    limits: [
      "We do not promise a Google ranking. Nobody honestly can.",
      "We do not promise you will be cited by ChatGPT. We make the page technically citable, which is a different and much smaller claim.",
      "We do not quote chatbot conversion-lift percentages. The figures that circulate come from vendor blogs with no methodology behind them.",
      "We cannot promise a top performance score on a stack we do not control, such as a WordPress site full of plugins.",
    ],
    commitment:
      "Live in 10 working days or the first month is free.",
    summary:
      "aiWEB builds websites for Georgian small businesses with nothing to pay upfront, billed monthly, and the monthly fee buys the thing that actually matters after launch: someone who keeps the site fast, keeps it findable, and changes the price list when the prices change. The position is deliberately blunt about its own category. AI has collapsed the cost of building a site, so the build is close to worthless and the care is the product. Built by the aiNOW agency in Tbilisi.",
  },
} as const;

export type SiteConfig = typeof SITE;
