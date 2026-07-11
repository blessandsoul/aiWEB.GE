import assert from 'node:assert/strict';
import test from 'node:test';

import {
  LIVE_UPDATE_STAGES,
  MOBILE_LEAD_STAGES,
  createTimelinePlayer,
  liveUpdateFrame,
  mobileLeadFrame,
  nextStage,
} from './web-demo-models.mjs';

test('the live-update and mobile-lead sequences stay in their narrative order', () => {
  assert.deepEqual(LIVE_UPDATE_STAGES, ['request', 'editing', 'refreshing', 'published']);
  assert.deepEqual(MOBILE_LEAD_STAGES, [
    'visiting',
    'service-selected',
    'submitted',
    'delivered',
  ]);

  assert.equal(nextStage(LIVE_UPDATE_STAGES, 'request'), 'editing');
  assert.equal(nextStage(LIVE_UPDATE_STAGES, 'published'), 'published');
  assert.equal(nextStage(MOBILE_LEAD_STAGES, 'missing'), 'visiting');
});

test('live update ends with the new version published', () => {
  assert.deepEqual(liveUpdateFrame('published'), {
    editorVersion: 'new',
    liveVersion: 'new',
    status: 'published',
    resultKey: 'published',
  });
});

test('live update keeps the public page old until publishing finishes', () => {
  assert.deepEqual(liveUpdateFrame('request'), {
    editorVersion: 'old',
    liveVersion: 'old',
    status: 'request',
    resultKey: null,
  });
  assert.deepEqual(liveUpdateFrame('editing'), {
    editorVersion: 'editing',
    liveVersion: 'old',
    status: 'editing',
    resultKey: null,
  });
  assert.deepEqual(liveUpdateFrame('refreshing'), {
    editorVersion: 'new',
    liveVersion: 'old',
    status: 'refreshing',
    resultKey: null,
  });
});

test('mobile visit ends in an owner lead with fictional redacted data', () => {
  const frame = mobileLeadFrame('delivered');

  assert.equal(frame.ownerInbox, 'new-lead');
  assert.match(frame.phone, /X/);
  assert.equal(frame.resultKey, 'leadCreated');
  assert.equal(frame.fictional, true);
});

test('mobile lead only reaches the owner after the form is sent', () => {
  assert.deepEqual(mobileLeadFrame('visiting'), {
    visit: 'phone',
    serviceSelected: false,
    formStatus: 'idle',
    ownerInbox: 'empty',
    phone: '+995 5XX XXX XXX',
    fictional: true,
    resultKey: null,
  });
  assert.deepEqual(mobileLeadFrame('service-selected'), {
    visit: 'phone',
    serviceSelected: true,
    formStatus: 'idle',
    ownerInbox: 'empty',
    phone: '+995 5XX XXX XXX',
    fictional: true,
    resultKey: null,
  });
  assert.deepEqual(mobileLeadFrame('submitted'), {
    visit: 'phone',
    serviceSelected: true,
    formStatus: 'sent',
    ownerInbox: 'empty',
    phone: '+995 5XX XXX XXX',
    fictional: true,
    resultKey: null,
  });
});

test('timeline completes one automatic pass in exactly 7,200 ms', () => {
  const clock = createManualClock();
  const emitted = [];
  const player = createTimelinePlayer({
    stages: LIVE_UPDATE_STAGES,
    duration: 7_200,
    onStage: (stage) => emitted.push(stage),
    setTimeoutFn: clock.setTimeoutFn,
    clearTimeoutFn: clock.clearTimeoutFn,
  });

  player.play();
  assert.deepEqual(emitted, ['request']);

  clock.advanceBy(7_199);
  assert.deepEqual(emitted, ['request', 'editing', 'refreshing']);

  clock.advanceBy(1);
  assert.deepEqual(emitted, LIVE_UPDATE_STAGES);
  assert.equal(clock.pendingCount(), 0);
});

test('replay cancels the old pass and resets to the first stage', () => {
  const clock = createManualClock();
  const emitted = [];
  const player = createTimelinePlayer({
    stages: MOBILE_LEAD_STAGES,
    duration: 7_200,
    onStage: (stage) => emitted.push(stage),
    setTimeoutFn: clock.setTimeoutFn,
    clearTimeoutFn: clock.clearTimeoutFn,
  });

  player.play();
  clock.advanceBy(2_400);
  assert.deepEqual(emitted, ['visiting', 'service-selected']);

  player.replay();
  assert.deepEqual(emitted, ['visiting', 'service-selected', 'visiting']);
  assert.equal(clock.pendingCount(), 3);

  clock.advanceBy(7_200);
  assert.deepEqual(emitted, [
    'visiting',
    'service-selected',
    'visiting',
    'service-selected',
    'submitted',
    'delivered',
  ]);
});

test('cancel removes every outstanding timeline timer', () => {
  const clock = createManualClock();
  const emitted = [];
  const player = createTimelinePlayer({
    stages: LIVE_UPDATE_STAGES,
    onStage: (stage) => emitted.push(stage),
    setTimeoutFn: clock.setTimeoutFn,
    clearTimeoutFn: clock.clearTimeoutFn,
  });

  player.play();
  assert.equal(clock.pendingCount(), 3);

  player.cancel();
  assert.equal(clock.pendingCount(), 0);
  clock.advanceBy(20_000);
  assert.deepEqual(emitted, ['request']);
});

test('reduced motion emits only the final state and schedules nothing', () => {
  const clock = createManualClock();
  const emitted = [];
  const player = createTimelinePlayer({
    stages: LIVE_UPDATE_STAGES,
    reducedMotion: true,
    onStage: (stage) => emitted.push(stage),
    setTimeoutFn: clock.setTimeoutFn,
    clearTimeoutFn: clock.clearTimeoutFn,
  });

  player.play();

  assert.deepEqual(emitted, ['published']);
  assert.equal(clock.pendingCount(), 0);
});

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
    setTimeoutFn,
    clearTimeoutFn,
    advanceBy,
    pendingCount: () => jobs.size,
  };
}
