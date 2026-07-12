import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { createDemoLoop } from '../home/components/lib/demo-loop.mjs';

const COMPONENTS = [
  'WebLiveUpdate.tsx',
  'WebMobileLead.tsx',
  'WebSpeedDuel.tsx',
  'WebPriceFlip.tsx',
  'HeroProof.tsx',
];
const BUNDLED_ICON_COMPONENTS = ['WebLiveUpdate.tsx', 'WebMobileLead.tsx'];
const solarIconRegistry = readFileSync(
  new URL('../../components/common/solar-icons.ts', import.meta.url),
  'utf8',
);

test('aiWEB stories use the canonical visible loop instead of the one-shot gate', () => {
  for (const file of COMPONENTS) {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    assert.match(source, /createDemoLoop/u, file);
    assert.doesNotMatch(source, /startTimelineWhenVisible/u, file);
  }
});

test('speed and price samples permanently yield to visitor input', () => {
  for (const file of ['WebSpeedDuel.tsx', 'WebPriceFlip.tsx']) {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    assert.match(source, /takeControl\(\)/u, file);
  }
});

test('live update and mobile lead use only bundled Solar Ico components', () => {
  for (const file of BUNDLED_ICON_COMPONENTS) {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /from ['"]lucide-react['"]/u, file);
    assert.match(
      source,
      /import\s+\{\s*Ico\s*\}\s+from\s+['"]@\/components\/common\/Ico['"]/u,
      file,
    );
    assert.doesNotMatch(
      source,
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}✓✔✕→←➜]/u,
      file,
    );

    const iconNames = new Set(source.match(/solar:[a-z0-9-]+/gu) ?? []);
    assert.ok(iconNames.size >= 4, `${file} should use semantic Solar icons`);
    for (const iconName of iconNames) {
      const key = iconName.slice('solar:'.length);
      assert.match(solarIconRegistry, new RegExp(`"${key}":`, 'u'), iconName);
    }
  }
});

test('canonical loop repeats a 7200ms story after a 2000ms hold only while visible', () => {
  const harness = createHarness();
  const observer = harness.observers[0];

  assert.deepEqual(observer.options, { threshold: 0.35 });
  observer.emit(0.34, true);
  assert.deepEqual(harness.calls, []);

  observer.emit(0.35, true);
  assert.deepEqual(harness.calls, ['play']);
  assert.equal(harness.clock.pending()[0].delay, 9_200);

  harness.clock.fire(harness.clock.pending()[0].id);
  assert.deepEqual(harness.calls, ['play', 'stop', 'reset', 'play']);

  observer.emit(0, false);
  assert.deepEqual(harness.calls.slice(-2), ['stop', 'reset']);
  assert.equal(harness.clock.pending().length, 0);

  observer.emit(0.8, true);
  assert.equal(harness.calls.at(-1), 'play');
});

test('hidden state resets autoplay, controlled state stops without restarting, and reduced motion is static', () => {
  const harness = createHarness();
  const observer = harness.observers[0];
  observer.emit(0.8, true);

  harness.page.setHidden(true);
  assert.deepEqual(harness.calls.slice(-2), ['stop', 'reset']);
  harness.page.setHidden(false);
  assert.equal(harness.calls.at(-1), 'play');

  harness.controller.takeControl();
  const callsAfterControl = harness.calls.length;
  harness.page.setHidden(true);
  assert.equal(harness.calls.at(-1), 'stop');
  harness.page.setHidden(false);
  observer.emit(0, false);
  observer.emit(0.8, true);
  assert.equal(harness.calls.filter((item) => item === 'play').length, 2);
  assert.ok(harness.calls.length > callsAfterControl);

  const reducedCalls = [];
  createDemoLoop({
    target: {},
    reducedMotion: true,
    cycleMs: 7_200,
    play: () => reducedCalls.push('play'),
    showFinal: () => reducedCalls.push('final'),
    reset: () => reducedCalls.push('reset'),
    stop: () => reducedCalls.push('stop'),
    Observer: class { constructor() { throw new Error('no observer in reduced motion'); } },
  });
  assert.deepEqual(reducedCalls, ['final']);
});

function createHarness() {
  const calls = [];
  const observers = [];
  const listeners = new Map();
  let nextId = 1;
  const jobs = new Map();

  class Observer {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.target = null;
      observers.push(this);
    }
    observe(target) { this.target = target; }
    disconnect() {}
    emit(intersectionRatio, isIntersecting = intersectionRatio > 0) {
      this.callback([{ target: this.target, intersectionRatio, isIntersecting }]);
    }
  }

  const page = {
    hidden: false,
    addEventListener(type, callback) { listeners.set(type, callback); },
    removeEventListener(type, callback) {
      if (listeners.get(type) === callback) listeners.delete(type);
    },
    setHidden(hidden) {
      this.hidden = hidden;
      listeners.get('visibilitychange')?.();
    },
  };

  const clock = {
    schedule(callback, delay) {
      const id = nextId++;
      jobs.set(id, { id, callback, delay, cancelled: false });
      return id;
    },
    cancel(id) {
      const job = jobs.get(id);
      if (job) job.cancelled = true;
    },
    pending() {
      return [...jobs.values()].filter((job) => !job.cancelled);
    },
    fire(id) {
      const job = jobs.get(id);
      assert.ok(job);
      jobs.delete(id);
      if (!job.cancelled) job.callback();
    },
  };

  const target = { id: 'web-demo' };
  const controller = createDemoLoop({
    target,
    cycleMs: 7_200,
    holdMs: 2_000,
    play: () => calls.push('play'),
    showFinal: () => calls.push('final'),
    reset: () => calls.push('reset'),
    stop: () => calls.push('stop'),
    Observer,
    pageDocument: page,
    schedule: clock.schedule,
    cancelScheduled: clock.cancel,
  });

  return { calls, observers, page, clock, controller };
}
