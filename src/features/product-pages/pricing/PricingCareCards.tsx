import { Ico } from '@/components/common/Ico';
import { Link } from '@/i18n/navigation';

import { formatPrice } from './PricingOfferExplorer';
import { PricingDisclosure } from './PricingDisclosure';
import type { PricingCareOffer, PricingPageCopy } from './types';

interface PricingCareCardsProps {
  offers: readonly PricingCareOffer[];
  copy: Pick<
    PricingPageCopy,
    'includedLabel' | 'excludedLabel' | 'driversLabel' | 'priceOnRequest' | 'recommendedLabel'
  >;
}

export function PricingCareCards({ offers, copy }: PricingCareCardsProps): React.ReactElement {
  return (
    <div className="pricing-care-grid" data-pricing-care>
      {offers.map((offer) => (
        <article
          key={offer.id}
          className={`pricing-plan-card pricing-plan-card--${offer.id}${offer.recommended ? ' pricing-plan-card--recommended' : ''}`}
          data-plan-id={offer.id}
        >
          {offer.recommended ? (
            <span className="pricing-plan-card__badge">
              <Ico name="solar:star-bold-duotone" aria-hidden="true" />
              {copy.recommendedLabel}
            </span>
          ) : null}
          <header className="pricing-plan-card__header">
            <p>{offer.billingLabel}</p>
            <h3>{offer.name}</h3>
            <div className="pricing-plan-card__price">
              {offer.price ? (
                <strong>{formatPrice(offer.price)}</strong>
              ) : (
                <strong className="pricing-plan-card__request-price">{copy.priceOnRequest}</strong>
              )}
            </div>
            <span className="pricing-plan-card__summary">{offer.summary}</span>
          </header>

          <CareList
            label={copy.includedLabel}
            values={offer.included}
            icon="solar:check-circle-bold-duotone"
            tone="positive"
          />
          <CareList
            label={copy.driversLabel}
            values={offer.scope}
            icon="solar:settings-bold-duotone"
            tone="brand"
          />
          <PricingDisclosure label={copy.excludedLabel}>
            <CareList
              label=""
              values={offer.excluded}
              icon="solar:close-circle-bold-duotone"
              tone="neutral"
            />
          </PricingDisclosure>

          <div className="pricing-plan-card__action-wrap">
            <Link
              href={offer.actionHref ?? '/contact'}
              className={`product-page-button pricing-plan-card__action ${offer.recommended ? 'product-page-button--primary' : 'product-page-button--secondary'}`}
            >
              {offer.actionLabel}
              <Ico name="solar:arrow-right-bold-duotone" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function CareList({
  label,
  values,
  icon,
  tone,
}: {
  label: string;
  values: readonly string[];
  icon: string;
  tone: 'positive' | 'neutral' | 'brand';
}): React.ReactElement {
  return (
    <div className={`pricing-offer-list pricing-offer-list--${tone}`}>
      {label ? <h4>{label}</h4> : null}
      <ul>
        {values.map((value) => (
          <li key={value}>
            <Ico name={icon} aria-hidden="true" />
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
