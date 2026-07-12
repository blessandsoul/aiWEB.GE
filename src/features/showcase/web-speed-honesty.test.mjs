import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(
  new URL('./WebSpeedDuel.tsx', import.meta.url),
  'utf8',
);

test('speed demo avoids borrowed uplift and hidden revenue assumptions', () => {
  assert.doesNotMatch(
    source,
    /Deloitte|DELOITTE_UPLIFT|RECOVERABLE|0\.084|0\.02|monthlyRevenue|\bgain\b|perMonth/u,
  );
  assert.doesNotMatch(source, /type=["']range["']/u);
});

test('speed demo explains a visual before-and-after with bundled icons', () => {
  assert.match(source, /<Ico\b/u);
  assert.match(source, /t\(['"]currentLabel['"]\)/u);
  assert.match(source, /t\(['"]improvedLabel['"]\)/u);
  assert.match(source, /`result_\$\{feel\}`/u);
  assert.ok((source.match(/t\(['"]check[123]['"]\)/gu) ?? []).length >= 3);
});

test('speed comparison still autoplays, loops, replays and yields to visitor input', () => {
  assert.match(source, /createDemoLoop/u);
  assert.match(source, /cycleMs:\s*CYCLE_MS/u);
  assert.match(source, /holdMs:\s*2_000/u);
  assert.match(source, /\.takeControl\(\)/u);
  assert.match(source, /\.replay\(\)/u);
});
