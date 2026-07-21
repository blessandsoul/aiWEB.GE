import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('./WebBuildLive.tsx', import.meta.url), 'utf8');

test('builder preview paints a meaningful stable site before autoplay', () => {
  assert.match(source, /const STARTER_STAGE = BUILD_STAGE\.services;/);
  assert.match(source, /useState(?:<number>)?\(STARTER_STAGE\)/);
  assert.match(source, /useState\(STARTER_PROGRESS\)/);
  assert.match(source, /const visibleStage = Math\.max\(stage, STARTER_STAGE\);/);
  assert.match(source, /STARTER_PROGRESS \+ nextProgress \* \(100 - STARTER_PROGRESS\)/);
  assert.doesNotMatch(source, /setProgress\(0\)/);
  assert.doesNotMatch(source, /setStage\(-1\)/);
});
