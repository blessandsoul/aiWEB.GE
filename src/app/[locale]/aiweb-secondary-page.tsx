import type { Metadata } from 'next';
import { PRODUCT_OG_IMAGE } from "@/lib/product-og";
import { buildAlternates, pageRobots } from '@/i18n/seo-locales';
import { previewRobots } from '@/lib/landing-clone-preview';
import { ServiceSchemaForPage } from '@/components/seo/ServiceSchemaForPage';
import { ServiceHero } from '@/features/services/components/ServiceHero';
import { AutomationNodes } from '@/features/services/components/AutomationNodes';
import { AutomationShowcase } from '@/features/services/components/AutomationShowcase';
import { SeoArticle } from '@/features/services/components/SeoArticle';
import { ServiceFaq } from '@/features/services/components/ServiceFaq';
import { RelatedCases } from '@/features/projects/components/RelatedCases';
import { ServiceCTA } from '@/features/services/components/ServiceCTA';
import { AIWEB_SECONDARY_LOCALES, getAiWebSecondaryLocale, getAiWebSecondaryTemplateCopy, type AiWebSecondaryKind } from '@/features/services/components/aiweb-secondary-copy';

export function aiWebSecondaryMetadata(locale: string, kind: AiWebSecondaryKind): Metadata {
  const copy = getAiWebSecondaryTemplateCopy(locale, kind);
  return {
    title: { absolute: `${copy.seoTitle} | aiWEB` }, description: copy.seoDescription,
    alternates: buildAlternates(`/${kind}`, getAiWebSecondaryLocale(locale), AIWEB_SECONDARY_LOCALES),
    robots: previewRobots(pageRobots(`/${kind}`, locale, AIWEB_SECONDARY_LOCALES)),
    openGraph: { title: copy.seoTitle, description: copy.seoDescription, images: [PRODUCT_OG_IMAGE] },
  };
}

export async function AiWebSecondaryPage({ locale, kind }: { locale: string; kind: AiWebSecondaryKind }) {
  const copy = getAiWebSecondaryTemplateCopy(locale, kind);
  return <>
    <ServiceSchemaForPage locale={getAiWebSecondaryLocale(locale)} copy={copy.schema} siteName="aiWEB" siteUrl="https://aiweb.ge" path={`/${kind}`} serviceType={kind === 'integrations' ? 'Website Integrations' : 'Website Access and Data Controls'} />
    <ServiceHero copy={copy.hero} />
    <AutomationNodes copy={copy.nodes} />
    <AutomationShowcase cards={copy.showcase.cards} steps={copy.showcase.steps} howTitle={copy.showcase.howTitle} />
    <SeoArticle data={copy.article} />
    <ServiceFaq title={copy.faqTitle} items={copy.faq} />
    <RelatedCases serviceSlug={kind} locale={locale} />
    <ServiceCTA copy={copy.cta} />
  </>;
}
