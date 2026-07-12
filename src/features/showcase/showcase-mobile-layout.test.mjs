import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  SPEED_FEEL_GRID_TEMPLATE,
  SPEED_FEEL_LAYOUT,
  measureSpeedFeelLayout,
} from './web-speed-layout.mjs';

const kaMessages = JSON.parse(
  readFileSync(new URL('../../messages/ka.json', import.meta.url), 'utf8'),
);

// Text bounds measured in the production browser with the real Georgian font at 390 px.
// If the labels change, refresh these measurements before accepting the new geometry.
const GEORGIAN_LABEL_METRICS = [
  { key: 'slow', text: 'მტკივნეული', widthPx: 86.671875 },
  { key: 'ok', text: 'ნორმალური', widthPx: 86.40625 },
  { key: 'fast', text: 'მყისიერი', widthPx: 65.671875 },
];

const labelWidthsPx = GEORGIAN_LABEL_METRICS.map(({ key, text, widthPx }) => {
  assert.equal(kaMessages.product.speed[key], text);
  return widthPx;
});

test('390px calculator keeps every Georgian label inside its own control', () => {
  const layout = measureSpeedFeelLayout({
    controlsWidthPx: 262,
    labelWidthsPx,
  });

  assert.equal(layout.columns, 1);
  assert.equal(layout.buttonWidthPx, 262);
  assert.ok(layout.labels.every(({ contained }) => contained));
  assert.ok(layout.labels.every(({ padded }) => padded));
});

test('1280px calculator retains three equal desktop controls', () => {
  const layout = measureSpeedFeelLayout({
    controlsWidthPx: 435.15625,
    labelWidthsPx,
  });

  assert.equal(layout.columns, 3);
  assert.equal(layout.buttonWidthPx, 139.71875);
  assert.ok(layout.labels.every(({ contained }) => contained));
  assert.ok(layout.labels.every(({ padded }) => padded));
});

test('responsive control model preserves the tap target and intrinsic grid contract', () => {
  assert.ok(SPEED_FEEL_LAYOUT.minTapHeightPx >= 44);
  assert.equal(
    SPEED_FEEL_GRID_TEMPLATE,
    'repeat(auto-fit, minmax(min(100%, 128px), 1fr))',
  );
});
