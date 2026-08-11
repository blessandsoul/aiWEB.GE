import type { ProductPagesConfig } from '@/features/product-pages/types';

export const PRODUCT_PAGES = {
  pricing: { status: 'public', mode: 'project' },
  contact: { status: 'public' },
  blog: { status: 'off' },
  integrations: {
    status: 'public',
    records: [
      { id: 'website', name: 'Website', icon: 'solar:global-bold-duotone', category: 'development', connection: 'direct', status: 'available', dataFlow: 'websiteEvents' },
      { id: 'analytics', name: 'Analytics', icon: 'solar:chart-2-bold-duotone', category: 'businessSystems', connection: 'custom', status: 'customSetup', dataFlow: 'analyticsMetrics' },
      { id: 'forms', name: 'Forms', icon: 'solar:letter-bold-duotone', category: 'businessSystems', connection: 'custom', status: 'customSetup', dataFlow: 'forms' },
      { id: 'domain', name: 'Domain', icon: 'solar:server-bold-duotone', category: 'development', connection: 'custom', status: 'customSetup', dataFlow: 'domainSettings' },
    ],
  },
  security: { status: 'public' },
  privacy: { status: 'public' },
  terms: { status: 'public' },
  cookies: { status: 'off' },
  solutions: { status: 'off', slugs: [] },
  localeNamespaces: {
    ka: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
    en: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
    ru: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
  },
} as const satisfies ProductPagesConfig;
