import { Ico } from '@/components/common/Ico';
import { Link } from '@/i18n/navigation';

import type { PricingOffer, PricingPageCopy } from './types';
import { PricingDisclosure } from './PricingDisclosure';

interface PricingOfferExplorerProps {
  offers: readonly PricingOffer[];
  copy: Pick<
    PricingPageCopy,
    | 'includedLabel'
    | 'excludedLabel'
    | 'eligibilityLabel'
    | 'driversLabel'
    | 'allowanceLabel'
    | 'overageLabel'
    | 'setupLabel'
    | 'priceOnRequest'
    | 'recommendedLabel'
  >;
}

export function formatPrice(price: NonNullable<PricingOffer['price']>): string {
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: Number.isInteger(price.amount) ? 0 : 2,
  }).format(price.amount);
  return `${formatted} ${price.currency === 'GEL' ? '₾' : price.currency}`;
}

export function PricingOfferExplorer({
  offers,
  copy,
}: PricingOfferExplorerProps): React.ReactElement {
  if (offers.length === 0) {
    return <div className="pricing-empty" role="status" />;
  }

  return (
    <div className="pricing-explorer pricing-plan-grid" data-pricing-plans>
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
                <>
                  <strong>{formatPrice(offer.price)}</strong>
                  {offer.price.unit ? <small>{offer.price.unit}</small> : null}
                </>
              ) : (
                <strong className="pricing-plan-card__request-price">
                  {copy.priceOnRequest}
                </strong>
              )}
            </div>
            <span className="pricing-plan-card__summary">{offer.summary}</span>
          </header>

          <OfferList
            label={copy.includedLabel}
            values={offer.included}
            icon="solar:check-circle-bold-duotone"
            tone="positive"
          />

          {offer.mode === 'project' ? (
            <OfferList
              label={copy.driversLabel}
              values={offer.estimateDrivers}
              icon="solar:settings-bold-duotone"
              tone="brand"
            />
          ) : null}

          {offer.mode === 'pilot' ? (
            <OfferList
              label={copy.eligibilityLabel}
              values={offer.eligibility}
              icon="solar:checklist-minimalistic-bold-duotone"
              tone="brand"
            />
          ) : null}

          <PricingDisclosure label={copy.excludedLabel}>
            <OfferList
              label=""
              values={offer.excluded}
              icon="solar:close-circle-bold-duotone"
              tone="neutral"
            />
          </PricingDisclosure>

          {'allowance' in offer && offer.allowance ? (
            <DetailLine label={copy.allowanceLabel} value={offer.allowance} />
          ) : null}
          {'overageRule' in offer && offer.overageRule ? (
            <DetailLine label={copy.overageLabel} value={offer.overageRule} />
          ) : null}
          {'setupPrice' in offer && offer.setupPrice ? (
            <DetailLine label={copy.setupLabel} value={formatPrice(offer.setupPrice)} />
          ) : null}

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

function OfferList({
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

function DetailLine({
  label,
  value,
}: {
  label: string;
  value: string;
}): React.ReactElement {
  return (
    <div className="pricing-detail-line">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
