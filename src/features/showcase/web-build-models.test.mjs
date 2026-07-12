import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  BUILD_INDUSTRIES,
  buildPreview,
  joinAnimatedWords,
  normalizeBusinessName,
} from './web-build-models.mjs';

const solarIconRegistry = readFileSync(
  new URL('../../components/common/solar-icons.ts', import.meta.url),
  'utf8',
);

test('all six industries produce a complete professional preview contract', () => {
  assert.deepEqual(BUILD_INDUSTRIES, ['i1', 'i2', 'i3', 'i4', 'i5', 'i6']);
  const accents = new Set();
  const visuals = new Set();

  for (const industry of BUILD_INDUSTRIES) {
    const preview = buildPreview(industry, 'ainow');
    assert.equal(preview.businessName, 'ainow');
    assert.ok(preview.domain.endsWith('.ge'));
    assert.match(preview.theme.accent, /^#[0-9a-f]{6}$/iu);
    assert.ok(preview.theme.soft);
    assert.ok(preview.theme.ink);
    assert.ok(preview.hero.titleKey);
    assert.ok(preview.hero.subtitleKey);
    assert.ok(preview.hero.visual);
    assert.match(preview.hero.icon, /^solar:/u);
    assert.equal(preview.services.length, 3);
    assert.ok(preview.services.every((service) => service.icon.startsWith('solar:')));
    assert.ok(preview.proof.labelKey);
    assert.match(preview.proof.icon, /^solar:/u);
    assert.match(preview.contact.phone, /^\+995/u);
    assert.ok(preview.contact.addressKey);
    assert.match(preview.contact.icon, /^solar:/u);
    assert.ok(preview.cta.labelKey);
    assert.match(preview.cta.icon, /^solar:/u);
    const icons = [
      preview.hero.icon,
      ...preview.services.map((service) => service.icon),
      preview.proof.icon,
      preview.contact.icon,
      preview.cta.icon,
    ];
    for (const iconName of icons) {
      const key = iconName.slice('solar:'.length);
      assert.match(solarIconRegistry, new RegExp(`"${key}":`, 'u'), iconName);
    }
    accents.add(preview.theme.accent);
    visuals.add(preview.hero.visual);
  }

  assert.equal(accents.size, 6);
  assert.equal(visuals.size, 6);
});

test('fictional default is explicit and visitor names are preserved', () => {
  const fictional = normalizeBusinessName('');
  assert.equal(fictional.fictional, true);
  assert.ok(fictional.name.length > 0);

  const visitor = normalizeBusinessName('  ჩემი სახლი  ');
  assert.deepEqual(visitor, { name: 'ჩემი სახლი', fictional: false });
  assert.equal(buildPreview('i3', visitor.name).businessName, 'ჩემი სახლი');
});

test('animated Georgian headings preserve real whitespace', () => {
  assert.equal(
    joinAnimatedWords('აშენებული ისე, რომ იდგეს'),
    'აშენებული ისე, რომ იდგეს',
  );
  assert.equal(joinAnimatedWords('  ერთი   ორი  '), 'ერთი ორი');
});
