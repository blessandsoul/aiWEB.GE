import type { ProductPagesConfig } from '@/features/product-pages/types';

export const PRODUCT_PAGES = {
  pricing: { status: 'public', mode: 'project' },
  contact: { status: 'public' },
  blog: { status: 'public' },
  integrations: {
    status: 'public',
    records: [
      { id: 'website', name: 'Website', icon: 'solar:global-bold-duotone', category: 'development', connection: 'direct', status: 'available', dataFlow: 'websiteEvents' },
      { id: 'analytics', name: 'Analytics', icon: 'solar:chart-2-bold-duotone', category: 'businessSystems', connection: 'custom', status: 'customSetup', dataFlow: 'analyticsMetrics' },
      { id: 'forms', name: 'Forms', icon: 'solar:letter-bold-duotone', category: 'businessSystems', connection: 'custom', status: 'customSetup', dataFlow: 'forms' },
      { id: 'domain', name: 'Domain', icon: 'solar:server-bold-duotone', category: 'development', connection: 'custom', status: 'customSetup', dataFlow: 'domainSettings' },
      {
        id: 'tiktok-events',
        name: 'TikTok Pixel and Events API',
        icon: 'solar:videocamera-record-bold-duotone',
        category: 'contentAndAdvertising',
        connection: 'planned',
        status: 'planned',
        dataFlow: 'websiteEvents',
        machineDescription:
          'TikTok Pixel, Events API measurement and public video embeds are planned and are not currently available.',
        requirements: [
          'TikTok for Business approval',
          'Advertiser authorization and approved scopes',
          'Eligible account and regional availability',
        ],
        officialSources: [
          'https://ads.tiktok.com/help/article/events-api?lang=en',
          'https://developers.tiktok.com/doc/embed-videos/',
        ],
      },
    ],
  },
  security: { status: 'public' },
  privacy: { status: 'public' },
  terms: { status: 'public' },
  cookies: { status: 'off' },
  solutions: { status: 'off', slugs: [] },
  localeNamespaces: {
    ka: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.blog', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
    en: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.blog', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
    ru: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.blog', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
  },
} as const satisfies ProductPagesConfig;
