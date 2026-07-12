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
const webBuildSource = readFileSync(
  new URL('./WebBuildLive.tsx', import.meta.url),
  'utf8',
);
const heroProofSource = readFileSync(
  new URL('./HeroProof.tsx', import.meta.url),
  'utf8',
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

test('site builder stays one column through tablet and only splits at xl', () => {
  assert.match(
    webBuildSource,
    /\bxl:grid-cols-\[[^'"`]+\]/u,
    'the control/preview split must not begin before the xl breakpoint',
  );
  assert.doesNotMatch(
    webBuildSource,
    /\blg:grid-cols-\[minmax\(280px,360px\)_1fr\]/u,
    'the old narrow 360px control column is not tablet-safe',
  );

  const minWidthGuards = webBuildSource.match(/\bmin-w-0\b/gu) ?? [];
  assert.ok(
    minWidthGuards.length >= 3,
    'the outer grid and both grid children need min-w-0 overflow guards',
  );
  assert.match(
    webBuildSource,
    /mb-3 flex min-w-0 flex-col[^'"`]*sm:flex-row/u,
    'preview title and sample badge must stack before the sm breakpoint',
  );
});

test('site builder controls retain at least 44px touch targets', () => {
  assert.doesNotMatch(
    webBuildSource,
    /\bmin-h-\[40px\](?![\w-])/u,
    '40px industry pills are below the family touch-target contract',
  );
  assert.match(
    webBuildSource,
    /<input[\s\S]{0,700}(?:\b(?:h-11|h-12|h-14|min-h-11)\b|\bmin-h-\[44px\](?![\w-]))/u,
    'the business-name input needs a 44px-or-taller hit area',
  );
  assert.match(
    webBuildSource,
    /aria-pressed=\{[^}]+\}[\s\S]{0,500}(?:\b(?:h-11|h-12|h-14|min-h-11)\b|\bmin-h-\[44px\](?![\w-]))/u,
    'every industry choice needs a 44px-or-taller hit area',
  );
});

test('generated browser preview has a complete professional business-page hierarchy', () => {
  assert.match(webBuildSource, /from ['"]\.\/web-build-models\.mjs['"]/u);
  assert.match(webBuildSource, /\bbuildPreview\s*\(/u);
  assert.match(webBuildSource, /<nav\b/u, 'the preview needs compact navigation');
  assert.match(webBuildSource, /preview\.hero\./u, 'the preview needs an industry hero');
  assert.match(
    webBuildSource,
    /preview\.services\.map\s*\(/u,
    'all three model-backed service cards must render',
  );
  assert.match(webBuildSource, /name=\{service\.icon\}/u);
  assert.match(webBuildSource, /preview\.proof\./u, 'the preview needs visible trust proof');
  assert.match(webBuildSource, /preview\.contact\./u, 'the preview needs contact details');
  assert.match(webBuildSource, /preview\.cta\./u, 'the preview needs a primary CTA');
  assert.match(webBuildSource, /preview\.domain\b/u, 'the browser chrome needs the generated domain');
});

test('site builder uses the bundled Solar Ico registry and no raw decorative glyphs', () => {
  assert.match(
    webBuildSource,
    /import\s+\{\s*Ico\s*\}\s+from\s+['"]@\/components\/common\/Ico['"]/u,
  );
  assert.ok((webBuildSource.match(/<Ico\b/gu) ?? []).length >= 4);
  assert.doesNotMatch(
    webBuildSource,
    /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}✓✔✕→←➜]/u,
    'visitor-facing meaning must use Ico, not emoji or typed status/arrow glyphs',
  );
});

test('site builder uses the canonical visible autoplay loop with replay and manual control', () => {
  assert.match(
    webBuildSource,
    /import\s+\{\s*createDemoLoop\s*\}\s+from\s+['"]@\/features\/home\/components\/lib\/demo-loop\.mjs['"]/u,
  );
  assert.match(webBuildSource, /\bcreateDemoLoop\s*\(\s*\{/u);
  assert.match(
    webBuildSource,
    /threshold:\s*WEB_BUILD_OBSERVER_GEOMETRY\.threshold/u,
  );
  assert.match(webBuildSource, /cycleMs:\s*WEB_BUILD_TIMING\.cycleMs/u);
  assert.match(webBuildSource, /holdMs:\s*WEB_BUILD_TIMING\.holdMs/u);
  assert.match(webBuildSource, /reducedMotion:\s*Boolean\(reduced\)/u);
  assert.match(webBuildSource, /showFinal\s*[:,]/u);
  assert.match(webBuildSource, /reset\s*[:,]/u);
  assert.match(webBuildSource, /stop\s*[:,]/u);
  assert.match(webBuildSource, /\.cleanup\s*\(\s*\)/u);
  assert.match(webBuildSource, /\.replay\s*\(\s*\)/u);
  assert.match(webBuildSource, /t\(['"]replay['"]\)/u);
  assert.doesNotMatch(webBuildSource, /\bhasPlayed\b/u);

  const directControlCalls = webBuildSource.match(/\.takeControl\s*\(\s*\)/gu) ?? [];
  const delegatedControlCalls = webBuildSource.match(/\btakeControl\s*\(\s*\)\s*;/gu) ?? [];
  assert.ok(
    directControlCalls.length >= 2 || delegatedControlCalls.length >= 2,
    'name and industry interactions must both stop autoplay before changing visitor values',
  );
});

test('site builder observes a compact sticky sentinel instead of its full mobile grid', () => {
  assert.match(webBuildSource, /const\s+observerRef\s*=\s*useRef/u);
  assert.match(webBuildSource, /const\s+target\s*=\s*observerRef\.current/u);
  assert.doesNotMatch(webBuildSource, /const\s+target\s*=\s*sectionRef\.current/u);
  assert.match(
    webBuildSource,
    /ref=\{observerRef\}[\s\S]{0,500}data-web-build-observer/u,
  );
  assert.match(
    webBuildSource,
    /data-web-build-observer[\s\S]{0,500}\bsticky\b[\s\S]{0,500}\btop-/u,
    'the compact target should remain visible while the tall builder is in view',
  );
  assert.match(
    webBuildSource,
    /height:\s*WEB_BUILD_OBSERVER_GEOMETRY\.targetHeightPx/u,
    'the rendered sentinel must consume the tested geometry contract',
  );
});

test('animated heading renders real spaces and removes the old fake score', () => {
  assert.match(
    webBuildSource,
    /\{word\}\s*\{index\s*<\s*words\.length\s*-\s*1\s*\?\s*['"] ['"]\s*:\s*['"]['"]\}/u,
    'animated words must include real text-node spaces',
  );
  assert.doesNotMatch(webBuildSource, /mr-\[0\.28em\]/u);
  assert.doesNotMatch(webBuildSource, /\bSPEED_TARGET\b|\b96\b/u);
});

test('hero proof gives the browser full mobile width and moves progress below it', () => {
  assert.match(heroProofSource, /\bflex-col\b[^'"`]*\bsm:flex-row\b/u);
  assert.match(heroProofSource, /\bw-full\b[^'"`]*\bsm:w-auto\b/u);
  assert.doesNotMatch(
    heroProofSource,
    /className=["'][^"']*\bflex\s+min-w-0\s+items-start\s+gap/u,
  );
});
