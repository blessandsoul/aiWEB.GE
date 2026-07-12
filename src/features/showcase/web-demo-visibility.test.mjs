import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const COMPONENT_FILES = ['WebLiveUpdate.tsx', 'WebMobileLead.tsx'];

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

  observer.trigger(false);
  assert.equal(playCount, 0);

  observer.trigger(true);
  observer.trigger(true);
  assert.equal(playCount, 1);
  assert.equal(observer.disconnectCount(), 1);

  cleanup();
  assert.equal(observer.disconnectCount(), 1);
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

for (const componentFile of COMPONENT_FILES) {
  test(`${componentFile} wires its own visible root through the shared gate`, () => {
    const source = readFileSync(new URL(componentFile, import.meta.url), 'utf8');

    assert.match(source, /import \{ startTimelineWhenVisible \} from '\.\/web-demo-visibility\.mjs';/);
    assert.match(source, /const sectionRef = useRef<HTMLDivElement \| null>\(null\);/);
    assert.match(
      source,
      /startTimelineWhenVisible\(\{[\s\S]*?node: sectionRef\.current,[\s\S]*?play: player\.play,[\s\S]*?\}\)/,
    );
    assert.match(source, /ref=\{sectionRef\}/);
    assert.doesNotMatch(source, /player\.play\(\)/);
  });
}

function createObserverHarness() {
  let callback = null;
  let currentNode = null;
  let currentOptions = null;
  let disconnects = 0;

  return {
    create(nextCallback, options) {
      callback = nextCallback;
      currentOptions = options;
      return {
        observe(node) {
          currentNode = node;
        },
        disconnect() {
          disconnects += 1;
          callback = null;
        },
      };
    },
    trigger(isIntersecting) {
      callback?.([{ isIntersecting }]);
    },
    observedNode: () => currentNode,
    options: () => currentOptions,
    disconnectCount: () => disconnects,
  };
}
