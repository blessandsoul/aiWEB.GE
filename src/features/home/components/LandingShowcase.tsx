'use client';

import { useTranslations } from 'next-intl';

import { ProductCapabilities } from './ProductCapabilities';

const CAPABILITY_ICONS = [
  'solar:global-bold-duotone',
  'solar:pen-new-square-bold-duotone',
  'solar:bolt-bold-duotone',
  'solar:smartphone-bold-duotone',
  'solar:settings-bold-duotone',
] as const;

export function LandingShowcase(): React.ReactElement {
  const t = useTranslations('product.capabilities');

  return (
    <ProductCapabilities
      eyebrow={t('eyebrow')}
      title={t('title')}
      intro={t('intro')}
      outcomeLabel={t('outcomeLabel')}
      items={CAPABILITY_ICONS.map((icon, index) => {
        const item = String(index + 1);
        return {
          icon,
          title: t(`items.${item}.title`),
          description: t(`items.${item}.description`),
          result: t(`items.${item}.result`),
        };
      })}
    />
  );
}
