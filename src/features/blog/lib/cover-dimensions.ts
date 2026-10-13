export type CoverDimensions = { width: number; height: number }

const COVER_DIMENSIONS: Record<string, CoverDimensions> = {
    "/images/aiweb/blog/headless-cms-architecture-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/how-to-choose-website-platform-for-small-business-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/website-analytics-setup-before-launch-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/website-content-preparation-before-development-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/website-cost-factors-without-quoting-price-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/website-development-process-from-brief-to-launch-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/website-forms-and-crm-integration-checklist-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/website-launch-checklist-for-business-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/website-performance-budget-before-launch-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/website-redesign-vs-new-website-decision-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/wordpress-legacy-site-rescue-before-rebuild-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/wordpress-migration-admin-and-editing-workflow-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/wordpress-migration-content-audit-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/wordpress-migration-domain-hosting-ownership-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/wordpress-migration-multilingual-site-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/wordpress-migration-seo-redirect-checklist-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/wordpress-migration-staging-and-cutover-plan-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/wordpress-migration-without-losing-leads-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/wordpress-plugin-dependency-migration-plan-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aiweb/blog/wordpress-to-nextjs-migration-guide-for-business-glass-v1.png": { width: 1536, height: 1024 },
}

export function getCoverDimensions(coverPath: string): CoverDimensions | undefined {
    return Object.hasOwn(COVER_DIMENSIONS, coverPath) ? COVER_DIMENSIONS[coverPath] : undefined
}
