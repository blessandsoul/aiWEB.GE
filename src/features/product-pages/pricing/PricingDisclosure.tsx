'use client';

import { useId, useState, type ReactNode } from 'react';

interface PricingDisclosureProps {
  label: string;
  children: ReactNode;
}

export function PricingDisclosure({
  label,
  children,
}: PricingDisclosureProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div className={`pricing-card-disclosure${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="pricing-card-disclosure__trigger"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{label}</span>
      </button>
      <div
        id={contentId}
        className="pricing-card-disclosure__content"
        role="region"
        aria-hidden={!open}
      >
        {children}
      </div>
    </div>
  );
}
