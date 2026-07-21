import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { joinAnimatedWords } from '../features/showcase/web-build-models.mjs';

const LOCALE_PATHS = {
  en: new URL('./en.json', import.meta.url),
  ka: new URL('./ka.json', import.meta.url),
  ru: new URL('./ru.json', import.meta.url),
};

const SITE_CONFIG_PATH = new URL('../config/site.ts', import.meta.url);
const INDUSTRIES = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'];

const EXPECTED_KEYS = {
  seo: ['description', 'title'],
  hero: [
    'audience',
    'commitment',
    'ctaCall',
    'ctaResults',
    'lead',
    'owner',
    'role',
    'signedBy',
    'sub',
    'taglinePrefix',
    'taglineWorks',
    'typewriterPrefill',
    'typewriterWords',
  ],
  work: [
    'eyebrow',
    'headingAccent',
    'headingPre',
    ...Array.from({ length: 6 }, (_, index) => [
      `s${index + 1}Desc`,
      `s${index + 1}Tag`,
      `s${index + 1}Title`,
    ]).flat(),
  ],
  faq: [
    'headingAccent',
    'headingPre',
    'subtitle',
    ...Array.from({ length: 14 }, (_, index) => [`q${index + 1}`, `a${index + 1}`]).flat(),
  ],
  cta: ['heading', 'orWrite', 'phoneLabel', 'phoneNote', 'phoneSubmit', 'subtitle'],
  wordmark: ['line'],
  capabilities: [
    'eyebrow',
    'intro',
    'outcomeLabel',
    'title',
    ...Array.from({ length: 5 }, (_, index) => [
      `items.${index + 1}.description`,
      `items.${index + 1}.result`,
      `items.${index + 1}.title`,
    ]).flat(),
  ],
  heroStory: [
    'badge',
    'bridge',
    'bridgeLabel',
    'businessLabel',
    'businessValue',
    'detailOne',
    'detailTwo',
    'input',
    'inputLabel',
    'productAction',
    'productLabel',
    'replay',
    'result',
    'resultLabel',
  ],
  build: [
    'buildBtn',
    'building',
    'contactLabel',
    'cta',
    'done',
    'eyebrow',
    'heading',
    'industryLabel',
    'namePlaceholder',
    'nav1',
    'nav2',
    'nav3',
    'previewLabel',
    'progressLabel',
    'ready',
    'rebuild',
    'replay',
    'sampleBadge',
    'sampleName',
    'servicesLabel',
    'speedLabel',
    'subtitle',
    ...INDUSTRIES,
    ...INDUSTRIES.flatMap((industry) => [
      `address_${industry}`,
      `cta_${industry}`,
      `h1_${industry}`,
      `proof_${industry}`,
      `proofValue_${industry}`,
      `s1_${industry}`,
      `s2_${industry}`,
      `s3_${industry}`,
      `sub_${industry}`,
    ]),
  ],
  liveUpdate: [
    'editing',
    'eyebrow',
    'heading',
    'newValue',
    'oldValue',
    'outcome',
    'published',
    'refreshing',
    'replay',
    'request',
    'subtitle',
  ],
  speed: [
    'check1',
    'check2',
    'check3',
    'currentLabel',
    'eyebrow',
    'fast',
    'heading',
    'improvedLabel',
    'note',
    'ok',
    'quote',
    'replay',
    'result_fast',
    'result_ok',
    'result_slow',
    'siteName',
    'slow',
    'source',
    'subtitle',
    'yours',
  ],
  flip: [
    'eyebrow',
    'heading',
    'launch',
    'month',
    'monthly',
    'monthlyEnd',
    'monthlyLabel',
    'note',
    'once',
    'onceEnd',
    'onceLabel',
    'replay',
    'subtitle',
    ...Array.from({ length: 8 }, (_, index) => `w${index + 1}`),
  ],
  mobileLead: [
    'eyebrow',
    'fictional',
    'formSent',
    'heading',
    'leadCreated',
    'outcome',
    'ownerInbox',
    'replay',
    'selected',
    'service',
    'subtitle',
    'visitor',
  ],
  proof: ['brand', 'cta', 'h1', 'nav1', 'nav2', 'replay', 's1', 's2', 'speed', 'sub', 'url'],
};

const locales = Object.fromEntries(
  Object.entries(LOCALE_PATHS).map(([locale, path]) => [
    locale,
    JSON.parse(readFileSync(path, 'utf8')),
  ]),
);

for (const [namespace, expectedKeys] of Object.entries(EXPECTED_KEYS)) {
  test(`product.${namespace} has the same complete key paths in en, ka, and ru`, () => {
    const pathsByLocale = Object.fromEntries(
      Object.entries(locales).map(([locale, messages]) => {
        const value = messages.product?.[namespace];
        assert.ok(value, `${locale}.json is missing product.${namespace}`);
        return [locale, collectLeafPaths(value)];
      }),
    );

    assert.deepEqual(pathsByLocale.en, [...expectedKeys].sort());
    assert.deepEqual(pathsByLocale.ka, pathsByLocale.en);
    assert.deepEqual(pathsByLocale.ru, pathsByLocale.en);
  });
}

test('Georgian animated preview headings keep real whitespace', () => {
  for (const industry of INDUSTRIES) {
    const heading = locales.ka.product.build[`h1_${industry}`];
    const reassembled = joinAnimatedWords(heading);

    assert.equal(reassembled, heading);
    assert.match(reassembled, /\s/u, `${industry} heading must contain visible word spacing`);
  }
});

test('Georgian public showcase copy contains no Cyrillic characters', () => {
  assert.doesNotMatch(JSON.stringify(locales.ka), /[\u0400-\u04ff]/u);
});

test('showcase copy contains no long dash or middle dash', () => {
  for (const [locale, messages] of Object.entries(locales)) {
    assert.doesNotMatch(
      JSON.stringify(messages),
      /[—–]/u,
      `${locale} showcase copy contains a long dash`,
    );
  }

  assert.doesNotMatch(readFileSync(SITE_CONFIG_PATH, 'utf8'), /[—–]/u);
});

test('speed copy contains no borrowed percentage claim', () => {
  for (const [locale, messages] of Object.entries(locales)) {
    const copy = JSON.stringify(messages.product.speed);
    assert.doesNotMatch(copy, /Deloitte|Milliseconds Make Millions|%/iu, `${locale} speed copy`);
  }
});

test('speed locale contract no longer carries hidden-revenue calculator fields', () => {
  const retiredKeys = ['visitors', 'ticket', 'result', 'perMonth'];

  for (const [locale, messages] of Object.entries(locales)) {
    for (const key of retiredKeys) {
      assert.equal(
        Object.hasOwn(messages.product.speed, key),
        false,
        `${locale}.product.speed.${key} must stay retired`,
      );
    }
  }
});

test('Georgian showcase components never force visitor copy to uppercase', () => {
  const components = [
    'HeroProof.tsx',
    'WebBuildLive.tsx',
    'WebLiveUpdate.tsx',
    'WebMobileLead.tsx',
    'WebPriceFlip.tsx',
    'WebSpeedDuel.tsx',
  ];

  for (const file of components) {
    const source = readFileSync(
      new URL(`../features/showcase/${file}`, import.meta.url),
      'utf8',
    );
    assert.doesNotMatch(source, /\buppercase\b/u, file);
  }
});

test('aiNOW owns the public commitments instead of a personal signer', () => {
  const personalSigner = {
    en: /(?<![\p{L}])(?:Andrew|I|me|my|we|us|our)(?![\p{L}])/iu,
    ka: /(?<![\p{L}])(?:ენდრიუ|მე|ჩემი|ჩვენ|ჩვენი)(?![\p{L}])/u,
    ru: /(?<![\p{L}])(?:Эндрю|я|меня|мне|мой|мы|нас|нам|наш)(?![\p{L}])/iu,
  };

  for (const [locale, messages] of Object.entries(locales)) {
    assert.match(messages.product.hero.signedBy, /aiNOW/u);
    const visitorCopy = collectStringValues(selectShowcaseCopy(messages)).join('\n');
    assert.doesNotMatch(visitorCopy, personalSigner[locale]);
  }
});

test('machine-readable aiWEB copy avoids stale guarantees and aggressive positioning', () => {
  const config = readFileSync(SITE_CONFIG_PATH, 'utf8');
  assert.doesNotMatch(
    config,
    /10 working days|first month (?:is )?free|nothing to pay upfront|build is (?:the )?cheap part/iu,
  );
});

test('sticky-header CTA labels stay short enough for the mobile nav slot', () => {
  const maximumCharacters = { en: 12, ka: 14, ru: 12 };

  for (const [locale, messages] of Object.entries(locales)) {
    const label = messages.landingNav.cta;
    assert.ok(
      [...label].length <= maximumCharacters[locale],
      `${locale} landingNav.cta is too long for the mobile header: ${label}`,
    );
  }
});

function selectShowcaseCopy(messages) {
  return Object.fromEntries(
    Object.keys(EXPECTED_KEYS).map((namespace) => [namespace, messages.product[namespace]]),
  );
}

function collectLeafPaths(value, prefix = '') {
  return Object.entries(value)
    .flatMap(([key, child]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return child && typeof child === 'object' ? collectLeafPaths(child, path) : path;
    })
    .sort();
}

function collectStringValues(value) {
  return Object.values(value).flatMap((child) =>
    child && typeof child === 'object' ? collectStringValues(child) : [String(child)],
  );
}
