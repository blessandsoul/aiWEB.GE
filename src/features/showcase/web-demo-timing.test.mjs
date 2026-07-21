import assert from 'node:assert/strict';
import test from 'node:test';

import { createDemoLoop } from '../home/components/lib/demo-loop.mjs';
import * as demoModels from './web-demo-models.mjs';

const TIMING_EXPORTS = [
  'WEB_BUILD_TIMING',
  'WEB_SPEED_TIMING',
  'WEB_PRICE_TIMING',
];

test('component-consumed timelines hold their actual final state for exactly 2000ms', () => {
  assert.equal(typeof demoModels.createTimedStatePlayer, 'function');

  for (const exportName of TIMING_EXPORTS) {
    const timing = demoModels[exportName];
    assert.ok(timing, `${exportName} must be exported for its component and tests`);
    assert.equal(timing.holdMs, 2_000);
    assert.ok(timing.cycleMs >= 6_000 && timing.cycleMs <= 10_000);
    assert.equal(timing.transitions[0].at, 0);
    assert.ok(
      timing.transitions.length === 1 || timing.transitions[1].at <= 900,
      `${exportName} must show its first visible state change within 900ms`,
    );
    assert.equal(timing.transitions.at(-1).at, timing.cycleMs);

    const clock = createManualClock();
    const states = [];
    const player = demoModels.createTimedStatePlayer({
      timing,
      onState: (state) => states.push({ state, at: clock.now() }),
      setTimeoutFn: clock.setTimeoutFn,
      clearTimeoutFn: clock.clearTimeoutFn,
    });
    const observers = [];
    createDemoLoop({
      target: { id: exportName },
      threshold: 0.35,
      cycleMs: timing.cycleMs,
      holdMs: timing.holdMs,
      play: player.play,
      showFinal: player.showFinal,
      reset: player.reset,
      stop: player.cancel,
      Observer: createObserverClass(observers),
      pageDocument: createVisibleDocument(),
      schedule: clock.setTimeoutFn,
      cancelScheduled: clock.clearTimeoutFn,
    });

    observers[0].emit(0.35);
    const finalState = timing.transitions.at(-1).state;

    clock.advanceBy(timing.cycleMs - 1);
    assert.notEqual(states.at(-1).state, finalState, `${exportName} reached final early`);

    clock.advanceBy(1);
    assert.deepEqual(states.at(-1), { state: finalState, at: timing.cycleMs });

    const emissionsAtFinal = states.length;
    clock.advanceBy(timing.holdMs - 1);
    assert.equal(states.length, emissionsAtFinal, `${exportName} reset before the hold ended`);

    clock.advanceBy(1);
    const firstState = timing.transitions[0].state;
    assert.equal(states.at(-1).state, firstState);
    assert.equal(states.at(-1).at, timing.cycleMs + timing.holdMs);
  }
});

function createObserverClass(observers) {
  return class Observer {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.target = null;
      observers.push(this);
    }

    observe(target) {
      this.target = target;
    }

    disconnect() {}

    emit(intersectionRatio) {
      this.callback([{
        target: this.target,
        intersectionRatio,
        isIntersecting: intersectionRatio > 0,
      }]);
    }
  };
}

function createVisibleDocument() {
  return {
    hidden: false,
    addEventListener() {},
    removeEventListener() {},
  };
}

function createManualClock() {
  let now = 0;
  let nextId = 1;
  const jobs = new Map();

  const setTimeoutFn = (callback, delay) => {
    const id = nextId;
    nextId += 1;
    jobs.set(id, { callback, dueAt: now + delay });
    return id;
  };

  const clearTimeoutFn = (id) => {
    jobs.delete(id);
  };

  const advanceBy = (milliseconds) => {
    const target = now + milliseconds;

    while (true) {
      const nextJob = [...jobs.entries()]
        .filter(([, job]) => job.dueAt <= target)
        .sort((a, b) => a[1].dueAt - b[1].dueAt || a[0] - b[0])[0];
      if (!nextJob) break;

      const [id, job] = nextJob;
      jobs.delete(id);
      now = job.dueAt;
      job.callback();
    }

    now = target;
  };

  return {
    now: () => now,
    setTimeoutFn,
    clearTimeoutFn,
    advanceBy,
  };
}
