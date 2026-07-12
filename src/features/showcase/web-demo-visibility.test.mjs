import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const COMPONENTS = [
  {
    file: 'WebLiveUpdate.tsx',
    root: /<div ref=\{sectionRef\} className="grid items-center gap-10/,
  },
  {
    file: 'WebMobileLead.tsx',
    root: /<div\s+ref=\{sectionRef\}\s+className="mt-10 overflow-hidden rounded-3xl/,
  },
];

test('timeline stays stopped until its section intersects, then plays exactly once', async () => {
  const { startTimelineWhenVisible } = await import('./web-demo-visibility.mjs');
  const observer = createObserverHarness();
  const node = { id: 'demo-section' };
  let playCount = 0;

  const cleanup = startTimelineWhenVisible({
    node,
    reducedMotion: false,
    play: () => {
      playCount += 1;
    },
    createObserver: observer.create,
  });

  assert.equal(playCount, 0);
  assert.equal(observer.observedNode(), node);
  assert.deepEqual(observer.options(), { threshold: 0.35 });

  observer.trigger(0, false);
  assert.equal(playCount, 0);

  observer.trigger(0, true, 0.34);
  assert.equal(playCount, 0);

  observer.trigger(0, true, 0.35);
  observer.trigger(0, true, 1);
  assert.equal(playCount, 1);
  assert.equal(observer.disconnectCount(), 1);

  cleanup();
  assert.equal(observer.disconnectCount(), 1);
});

test('cleanup invalidates a queued callback and disconnects only once', async () => {
  const { startTimelineWhenVisible } = await import('./web-demo-visibility.mjs');
  const observer = createObserverHarness();
  let playCount = 0;

  const cleanup = startTimelineWhenVisible({
    node: { id: 'demo-section' },
    reducedMotion: false,
    play: () => {
      playCount += 1;
    },
    createObserver: observer.create,
  });

  cleanup();
  cleanup();
  observer.trigger(0, true, 0.35);

  assert.equal(playCount, 0);
  assert.equal(observer.disconnectCount(0), 1);
});

test('Strict Mode cleanup isolates a stale setup from the replacement setup', async () => {
  const { startTimelineWhenVisible } = await import('./web-demo-visibility.mjs');
  const observer = createObserverHarness();
  let stalePlays = 0;
  let currentPlays = 0;

  const cleanupStale = startTimelineWhenVisible({
    node: { id: 'stale-section' },
    reducedMotion: false,
    play: () => {
      stalePlays += 1;
    },
    createObserver: observer.create,
  });
  cleanupStale();

  const cleanupCurrent = startTimelineWhenVisible({
    node: { id: 'current-section' },
    reducedMotion: false,
    play: () => {
      currentPlays += 1;
    },
    createObserver: observer.create,
  });

  observer.trigger(0, true, 0.35);
  observer.trigger(1, true, 0.35);
  observer.trigger(0, true, 1);

  assert.equal(stalePlays, 0);
  assert.equal(currentPlays, 1);
  assert.equal(observer.disconnectCount(0), 1);
  assert.equal(observer.disconnectCount(1), 1);

  cleanupCurrent();
});

test('reduced motion emits the player result immediately without creating an observer', async () => {
  const { startTimelineWhenVisible } = await import('./web-demo-visibility.mjs');
  let playCount = 0;
  let observerCount = 0;

  const cleanup = startTimelineWhenVisible({
    node: { id: 'demo-section' },
    reducedMotion: true,
    play: () => {
      playCount += 1;
    },
    createObserver: () => {
      observerCount += 1;
      throw new Error('reduced motion must not create an observer');
    },
  });

  assert.equal(playCount, 1);
  assert.equal(observerCount, 0);
  cleanup();
});

test('missing IntersectionObserver falls back to an immediate first pass', async () => {
  const { startTimelineWhenVisible } = await import('./web-demo-visibility.mjs');
  let playCount = 0;

  assert.equal(typeof globalThis.IntersectionObserver, 'undefined');
  const cleanup = startTimelineWhenVisible({
    node: { id: 'demo-section' },
    reducedMotion: false,
    play: () => {
      playCount += 1;
    },
  });

  assert.equal(playCount, 1);
  cleanup();
});

for (const { file, root } of COMPONENTS) {
  test(`${file} wires its real box through the shared gate`, () => {
    const source = readFileSync(new URL(file, import.meta.url), 'utf8');

    assert.match(source, /import \{ startTimelineWhenVisible \} from '\.\/web-demo-visibility\.mjs';/);
    assert.match(source, /const sectionRef = useRef<HTMLDivElement \| null>\(null\);/);
    assert.match(
      source,
      /startTimelineWhenVisible\(\{[\s\S]*?node: sectionRef\.current,[\s\S]*?play: player\.play,[\s\S]*?\}\)/,
    );
    assert.match(source, root);
    assert.match(source, /stopVisibility\(\);[\s\S]*?player\.cancel\(\);/);
    assert.doesNotMatch(source, /player\.play\(\)/);
  });
}

function createObserverHarness() {
  const observers = [];

  return {
    create(nextCallback, options) {
      const observer = {
        callback: nextCallback,
        node: null,
        options,
        disconnects: 0,
      };
      observers.push(observer);
      return {
        observe(node) {
          observer.node = node;
        },
        disconnect() {
          observer.disconnects += 1;
        },
      };
    },
    trigger(index, isIntersecting, intersectionRatio = isIntersecting ? 1 : 0) {
      observers[index]?.callback([{ isIntersecting, intersectionRatio }]);
    },
    observedNode: (index = 0) => observers[index]?.node,
    options: (index = 0) => observers[index]?.options,
    disconnectCount: (index = 0) => observers[index]?.disconnects ?? 0,
  };
}
