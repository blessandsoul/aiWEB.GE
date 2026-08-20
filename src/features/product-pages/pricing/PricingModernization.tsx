import { Ico } from '@/components/common/Ico';
import { Link } from '@/i18n/navigation';

import type { PricingPageCopy } from './types';

interface PricingModernizationProps {
  copy: Pick<
    PricingPageCopy,
    | 'modernizationLegacyLabel'
    | 'modernizationLegacyText'
    | 'modernizationModernLabel'
    | 'modernizationModernText'
    | 'modernizationAiLabel'
    | 'modernizationAiText'
    | 'modernizationSteps'
    | 'modernizationCta'
  >;
}

export function PricingModernization({
  copy,
}: PricingModernizationProps): React.ReactElement {
  return (
    <div className="pricing-modernization">
      <div className="pricing-modernization__visual" aria-label={copy.modernizationModernLabel}>
        <div className="pricing-modernization__system pricing-modernization__system--legacy">
          <span className="pricing-modernization__system-icon">
            <Ico name="solar:server-bold-duotone" aria-hidden="true" />
          </span>
          <div>
            <strong>{copy.modernizationLegacyLabel}</strong>
            <span>{copy.modernizationLegacyText}</span>
          </div>
        </div>
        <div className="pricing-modernization__bridge" aria-hidden="true">
          <Ico name="solar:arrow-right-bold-duotone" />
        </div>
        <div className="pricing-modernization__system pricing-modernization__system--modern">
          <span className="pricing-modernization__system-icon">
            <Ico name="solar:server-square-cloud-bold-duotone" aria-hidden="true" />
          </span>
          <div>
            <strong>{copy.modernizationModernLabel}</strong>
            <span>{copy.modernizationModernText}</span>
          </div>
        </div>
        <div className="pricing-modernization__ai-chip">
          <Ico name="solar:cpu-bold-duotone" aria-hidden="true" />
          <span>
            <strong>{copy.modernizationAiLabel}</strong>
            <small>{copy.modernizationAiText}</small>
          </span>
        </div>
      </div>

      <ol className="pricing-modernization__steps">
        {copy.modernizationSteps.map((step, index) => (
          <li key={step.title}>
            <span className="pricing-modernization__step-icon">
              <Ico name={step.icon} aria-hidden="true" />
            </span>
            <span className="pricing-modernization__step-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="pricing-modernization__step-copy">
              <strong>{step.title}</strong>
              <span>{step.description}</span>
            </span>
          </li>
        ))}
      </ol>

      <Link
        href="/contact"
        className="product-page-button product-page-button--secondary pricing-modernization__cta"
      >
        {copy.modernizationCta}
        <Ico name="solar:arrow-right-bold-duotone" aria-hidden="true" />
      </Link>
    </div>
  );
}
