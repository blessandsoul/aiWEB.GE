module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/config/site.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
 */ __turbopack_context__.s([
    "SITE",
    ()=>SITE
]);
const SITE = {
    /** Machine key. Lands on <html data-product> and is the deploy smoke-test hook. */ key: "aiweb",
    domain: "aiweb.ge",
    baseUrl: "https://aiweb.ge",
    /** Rendered as <prefix><mark> by the nav, hero, footer and wordmark band. */ wordmark: {
        prefix: "ai",
        mark: "WEB"
    },
    /** The product colour. src/app/brand.css is generated from this; keep them in step. */ brandHex: "#06b6d4",
    /** Three hexes the hero grainient shader interpolates: soft, brand, accent. */ shader: [
        "#a5f3fc",
        "#06b6d4",
        "#22d3ee"
    ],
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
   */ defaultLocale: "ka",
    locales: [
        "ka",
        "en",
        "ru"
    ],
    /** PWA manifest. Not locale-aware (Next metadata routes are build-time). English. */ manifest: {
        name: "aiWEB",
        short: "aiWEB",
        description: "Business websites built and maintained by aiNOW.",
        background: "#fbfcfc",
        theme: "#06b6d4"
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
   */ seo: {
        disambiguating: "aiWEB is aiNOW's website creation and maintenance service for businesses in Georgia. aiNOW plans the site, prepares the copy, builds the mobile and desktop pages, and handles updates under an agreed care plan. It is not a DIY builder or a customer-chat service.",
        serviceType: "Business website design, build, and ongoing maintenance",
        audienceName: "Georgian small businesses: clinics, restaurants, construction firms, auto services, tourism, shops",
        areaServed: "GE",
        knowsAbout: [
            "Business websites",
            "Mobile website design",
            "Website copy",
            "Website performance",
            "Website maintenance",
            "Local business information",
            "Search-friendly site structure",
            "Website forms"
        ],
        features: [
            "Scope, schedule and care terms agreed before work starts",
            "A working preview reviewed on a real page before launch",
            "Website copy prepared by aiNOW and approved by the business",
            "Mobile and desktop layouts checked before launch",
            "Forms, buttons and contact paths tested before launch",
            "Agreed updates and technical care handled after launch",
            "Structured content that search systems can understand"
        ],
        boundary: "aiWEB creates and maintains the website. aiSTAFF handles written customer messages. aiCALL manages the phone-call process.",
        limits: [
            "aiNOW does not promise a specific Google ranking.",
            "aiNOW does not promise that an assistant will mention or cite the website.",
            "Search visibility depends on the market, content and other factors outside the website build.",
            "Performance recommendations require measurement of the actual website and its third-party services."
        ],
        commitment: "aiNOW agrees the scope, schedule, ownership, handover and care terms before work starts.",
        summary: "aiWEB is aiNOW's website service for businesses in Georgia. aiNOW plans the pages, prepares the copy, builds the site, checks it with the client and handles agreed updates after launch. The business keeps control of the content, domain and approval process."
    }
};
}),
"[project]/src/i18n/routing.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "routing",
    ()=>routing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware] (ecmascript) <export default as defineRouting>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/site.ts [middleware] (ecmascript)");
;
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["SITE"].locales
    ],
    defaultLocale: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["SITE"].defaultLocale,
    localePrefix: "as-needed",
    localeDetection: false
});
}),
"[project]/src/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/middleware/middleware.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/routing.ts [middleware] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["routing"]);
const config = {
    matcher: [
        "/((?!api|_next|_vercel|.*\\..*).*)"
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5001af78._.js.map