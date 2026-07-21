import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import test from 'node:test';

const showcaseUrl = new URL('.', import.meta.url);
const files = readdirSync(showcaseUrl)
  .filter((file) => file.endsWith('.tsx'))
  .map((file) => new URL(file, showcaseUrl));
files.push(new URL('../home/components/LandingHero.tsx', import.meta.url));

const banned = [
  /(?:placeholder:)?text-neutral-900\/(?:[0-5]\d?|\[(?:0?\.)?[0-5]\d*\])/gu,
  /text-(?:white|black)\/(?:[0-4]\d?|\[(?:0?\.)?[0-4]\d*\])/gu,
];

test('semantic showcase and hero labels never use failing text opacity utilities', () => {
  for (const url of files) {
    const source = readFileSync(url, 'utf8').replace(/<Ico\b[\s\S]*?\/>/gu, '');
    const failures = banned.flatMap((pattern) => source.match(pattern) ?? []);
    assert.deepEqual(failures, [], `${url.pathname}: ${failures.join(', ')}`);
  }
});

test('speed comparison never fades a whole card of semantic text', () => {
  const source = readFileSync(new URL('./WebSpeedDuel.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /contentOpacity/u);
  assert.doesNotMatch(source, /animate=\{\{\s*opacity:\s*contentOpacity/u);
});

test('inactive controls use the darker semantic ink on tinted surfaces', () => {
  const lead = readFileSync(new URL('./WebMobileLead.tsx', import.meta.url), 'utf8');
  const pricing = readFileSync(new URL('./WebPriceFlip.tsx', import.meta.url), 'utf8');
  assert.match(lead, /bg-neutral-900\/\[0\.07\] text-\[#4B5563\]/u);
  assert.match(pricing, /: 'text-\[#4B5563\]'/u);
});
