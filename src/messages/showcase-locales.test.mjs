import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const LOCALE_PATHS = {
  en: new URL('./en.json', import.meta.url),
  ka: new URL('./ka.json', import.meta.url),
  ru: new URL('./ru.json', import.meta.url),
};

const EXPECTED_KEYS = {
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

    assert.deepEqual(pathsByLocale.en, expectedKeys);
    assert.deepEqual(pathsByLocale.ka, pathsByLocale.en);
    assert.deepEqual(pathsByLocale.ru, pathsByLocale.en);
  });
}

function collectLeafPaths(value, prefix = '') {
  return Object.entries(value)
    .flatMap(([key, child]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return child && typeof child === 'object' ? collectLeafPaths(child, path) : path;
    })
    .sort();
}
