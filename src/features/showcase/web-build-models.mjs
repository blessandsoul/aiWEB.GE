export const BUILD_INDUSTRIES = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'];

export const WEB_BUILD_OBSERVER_GEOMETRY = Object.freeze({
  threshold: 0.35,
  targetHeightPx: 96,
});

export function measureVerticalIntersectionRatio({ targetHeightPx, visibleHeightPx }) {
  const targetHeight = Number(targetHeightPx);
  const visibleHeight = Number(visibleHeightPx);
  if (!Number.isFinite(targetHeight) || targetHeight <= 0) return 0;
  if (!Number.isFinite(visibleHeight) || visibleHeight <= 0) return 0;
  return Math.min(visibleHeight, targetHeight) / targetHeight;
}

const PREVIEWS = {
  i1: {
    theme: { accent: '#2563eb', soft: '#eaf2ff', ink: '#10213d', surface: '#f8fbff' },
    visual: 'appointment-card',
    heroIcon: 'solar:calendar-mark-bold-duotone',
    serviceIcons: [
      'solar:user-check-rounded-bold-duotone',
      'solar:shield-check-bold-duotone',
      'solar:phone-bold-duotone',
    ],
    proofIcon: 'solar:shield-check-bold-duotone',
  },
  i2: {
    theme: { accent: '#c2410c', soft: '#fff1e8', ink: '#32170d', surface: '#fffaf6' },
    visual: 'menu-reservation',
    heroIcon: 'solar:heart-bold-duotone',
    serviceIcons: [
      'solar:gallery-bold-duotone',
      'solar:phone-bold-duotone',
      'solar:calendar-mark-bold-duotone',
    ],
    proofIcon: 'solar:user-check-rounded-bold-duotone',
  },
  i3: {
    theme: { accent: '#d97706', soft: '#fff6df', ink: '#2d210f', surface: '#fffcf4' },
    visual: 'project-estimate',
    heroIcon: 'solar:settings-bold-duotone',
    serviceIcons: [
      'solar:settings-bold-duotone',
      'solar:calculator-bold-duotone',
      'solar:gallery-round-bold-duotone',
    ],
    proofIcon: 'solar:shield-check-bold-duotone',
  },
  i4: {
    theme: { accent: '#dc2626', soft: '#fff0f0', ink: '#301313', surface: '#fffafa' },
    visual: 'service-status',
    heroIcon: 'solar:settings-bold-duotone',
    serviceIcons: [
      'solar:settings-bold-duotone',
      'solar:bolt-bold-duotone',
      'solar:clock-circle-bold-duotone',
    ],
    proofIcon: 'solar:check-circle-bold-duotone',
  },
  i5: {
    theme: { accent: '#db2777', soft: '#fff0f7', ink: '#321323', surface: '#fffafd' },
    visual: 'stylist-booking',
    heroIcon: 'solar:calendar-mark-bold-duotone',
    serviceIcons: [
      'solar:user-check-rounded-bold-duotone',
      'solar:heart-bold-duotone',
      'solar:camera-bold-duotone',
    ],
    proofIcon: 'solar:calendar-mark-bold-duotone',
  },
  i6: {
    theme: { accent: '#0f766e', soft: '#e8faf7', ink: '#0f2d2a', surface: '#f7fffd' },
    visual: 'tour-itinerary',
    heroIcon: 'solar:global-bold-duotone',
    serviceIcons: [
      'solar:camera-bold-duotone',
      'solar:calendar-mark-bold-duotone',
      'solar:user-check-rounded-bold-duotone',
    ],
    proofIcon: 'solar:shield-check-bold-duotone',
  },
};

export function normalizeBusinessName(value) {
  const name = String(value ?? '').trim().replace(/\s+/gu, ' ');
  return name
    ? { name, fictional: false }
    : { name: 'Sample Studio', fictional: true };
}

export function buildPreview(industry, businessName) {
  const id = BUILD_INDUSTRIES.includes(industry) ? industry : BUILD_INDUSTRIES[0];
  const config = PREVIEWS[id];
  const normalized = normalizeBusinessName(businessName);

  return {
    industry: id,
    businessName: normalized.name,
    fictional: normalized.fictional,
    domain: `${slugifyDomain(normalized.name)}.ge`,
    theme: config.theme,
    hero: {
      titleKey: `h1_${id}`,
      subtitleKey: `sub_${id}`,
      visual: config.visual,
      icon: config.heroIcon,
    },
    services: config.serviceIcons.map((icon, index) => ({
      labelKey: `s${index + 1}_${id}`,
      icon,
    })),
    proof: {
      labelKey: `proof_${id}`,
      valueKey: `proofValue_${id}`,
      icon: config.proofIcon,
    },
    contact: {
      phone: '+995 32 2XX XX XX',
      addressKey: `address_${id}`,
      icon: 'solar:phone-bold-duotone',
    },
    cta: {
      labelKey: `cta_${id}`,
      icon: 'solar:arrow-right-bold-duotone',
    },
  };
}

export function joinAnimatedWords(value) {
  return String(value ?? '').trim().split(/\s+/u).filter(Boolean).join(' ');
}

function slugifyDomain(value) {
  const ascii = String(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/^-+|-+$/gu, '')
    .slice(0, 24);
  return ascii || 'sample-site';
}
