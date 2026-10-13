import ka from '../data/aiweb-secondary-ka.json';
import en from '../data/aiweb-secondary-en.json';
import ru from '../data/aiweb-secondary-ru.json';
import { createServiceTemplateCopy } from './service-template-copy';

export const AIWEB_SECONDARY_LOCALES = ['ka', 'en', 'ru'] as const;
export type AiWebSecondaryKind = 'integrations' | 'security';
const content = { ka, en, ru };
const records = [
  { id: 'website', status: 'available', connection: 'direct', flow: 'websiteEvents' },
  { id: 'analytics', status: 'customSetup', connection: 'custom', flow: 'analyticsMetrics' },
  { id: 'forms', status: 'customSetup', connection: 'custom', flow: 'forms' },
  { id: 'domain', status: 'customSetup', connection: 'custom', flow: 'domainSettings' },
  { id: 'tiktok-events', status: 'planned', connection: 'planned', flow: 'websiteEvents' },
] as const;

export function getAiWebSecondaryLocale(locale: string): keyof typeof content {
  return locale === 'ka' || locale === 'ru' ? locale : 'en';
}

export function getAiWebSecondaryTemplateCopy(locale: string, kind: AiWebSecondaryKind) {
  const contentLocale = getAiWebSecondaryLocale(locale);
  const messages = content[contentLocale];
  const replace = (text: string, platform = '') => text.replaceAll('{product}', 'aiWEB').replaceAll('{platform}', platform);
  const security = messages.security;
  const steps = [1, 2, 3, 4].map((index) => ({
    title: security.flow[`s${index}Title` as keyof typeof security.flow],
    description: security.flow[`s${index}Description` as keyof typeof security.flow],
  }));
  const controls = ['sourceAccess', 'actions', 'approval', 'retention', 'deletion', 'escalation'] as const;
  if (kind === 'security') {
    const copy = createServiceTemplateCopy({
      title: replace(security.title), body: replace(security.lead),
      heroEyebrow: security.eyebrow, heroTitle: 'aiWEB', heroTitleAccent: security.eyebrow,
      showcaseLabel: security.labels.control,
      showcaseTitles: controls.map((key) => security.controls[key].title),
      showcaseItems: controls.map((key) => replace(security.controls[key].description)),
      stepItems: steps, howTitle: security.flow.title,
      nodeTitle: security.flow.title, nodeSubtitle: security.flow.intro,
      nodeStatLabels: [security.flow.title, security.controls.title, security.limitations.title],
      nodeStatValues: ['4', '6', '3'],
      faqTitle: security.controls.title,
      faq: controls.map((key) => ({ q: security.controls[key].title, a: replace(security.controls[key].description) })),
      cta: { cta: security.cta.label },
      article: {
        sections: [{ h: security.limitations.title, p: [security.limitations.item1, security.limitations.item2, security.limitations.item3].join(' ') }],
        aeoH: replace(security.title), aeoBody: replace(security.lead),
      },
    });
    return { ...copy, seoTitle: replace(security.seoTitle), seoDescription: replace(security.seoDescription) };
  }
  const integration = messages.integrations;
  const plannedMeasurement = {
    ka: 'TikTok Pixel-ისა და Events API-ის ინტეგრაცია დაგეგმილია; ამ ეტაპზე ხელმისაწვდომი არ არის.',
    en: 'TikTok Pixel and Events API integration is planned and is not currently available.',
    ru: 'Интеграция TikTok Pixel и Events API запланирована и сейчас недоступна.',
  };
  const recordDetails = records.map((record) => {
    const platform = record.id === 'tiktok-events' ? 'TikTok Pixel / Events API' : integration.platforms[record.id];
    return { title: platform, body: record.id === 'tiktok-events' ? plannedMeasurement[contentLocale] : `${integration.status[record.status]} · ${integration.connections[record.connection]}. ${replace(integration.flows[record.flow], platform)}` };
  });
  const copy = createServiceTemplateCopy({
    title: replace(integration.title), body: integration.lead,
    heroEyebrow: integration.eyebrow, heroTitle: 'aiWEB', heroTitleAccent: integration.eyebrow,
    showcaseLabel: integration.eyebrow,
    showcaseTitles: recordDetails.map((record) => record.title),
    showcaseItems: recordDetails.map((record) => record.body),
    stepItems: steps, howTitle: security.flow.title,
    nodeTitle: security.flow.title, nodeSubtitle: integration.ledger.intro,
    nodeStatLabels: [integration.status.available, integration.status.customSetup, integration.status.planned],
    nodeStatValues: ['1', '3', '1'],
    faqTitle: integration.ledger.title,
    faq: recordDetails.map((record) => ({ q: record.title, a: record.body })),
    cta: { cta: integration.cta.label },
    article: { sections: [{ h: integration.ledger.title, p: integration.ledger.intro }], aeoH: replace(integration.title), aeoBody: integration.lead },
  });
  return { ...copy, seoTitle: replace(integration.seoTitle), seoDescription: replace(integration.seoDescription) };
}
