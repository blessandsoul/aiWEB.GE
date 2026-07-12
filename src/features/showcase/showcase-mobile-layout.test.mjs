import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const speedDuelSource = readFileSync(new URL('./WebSpeedDuel.tsx', import.meta.url), 'utf8');

test('speed calculator can shrink its panel and segmented controls inside a mobile card', () => {
  assert.match(
    speedDuelSource,
    /className="min-w-0 rounded-2xl bg-white\/\[0\.04\] p-6 md:p-7"/,
  );
  assert.match(speedDuelSource, /'min-h-\[44px\] min-w-0 flex-1 rounded-xl/);
});
