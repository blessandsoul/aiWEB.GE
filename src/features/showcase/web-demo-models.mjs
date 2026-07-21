export const LIVE_UPDATE_STAGES = ['request', 'editing', 'refreshing', 'published'];

export const MOBILE_LEAD_STAGES = [
  'visiting',
  'service-selected',
  'submitted',
  'delivered',
];

const BUILD_STAGES = Object.freeze({
  chrome: 0,
  nav: 520,
  hero: 1_180,
  visual: 2_100,
  services: 3_050,
  proof: 4_150,
  contact: 4_950,
  done: 7_200,
});

export const WEB_BUILD_TIMING = Object.freeze({
  cycleMs: 7_200,
  holdMs: 2_000,
  stages: BUILD_STAGES,
  transitions: Object.freeze(
    Object.values(BUILD_STAGES).map((state) => Object.freeze({ at: state, state })),
  ),
});

export const WEB_SPEED_TIMING = Object.freeze({
  cycleMs: 7_000,
  holdMs: 2_000,
  transitions: Object.freeze([
    Object.freeze({ at: 0, state: 'slow' }),
    Object.freeze({ at: 900, state: 'ok' }),
    Object.freeze({ at: 7_000, state: 'fast' }),
  ]),
});

export const WEB_PRICE_TIMING = Object.freeze({
  cycleMs: 6_400,
  holdMs: 2_000,
  transitions: Object.freeze([
    Object.freeze({ at: 0, state: 'once' }),
    Object.freeze({ at: 900, state: 'monthly' }),
    Object.freeze({ at: 3_200, state: 'once' }),
    Object.freeze({ at: 6_400, state: 'monthly' }),
  ]),
});

const LIVE_UPDATE_FRAMES = {
  request: {
    editorVersion: 'old',
    liveVersion: 'old',
    status: 'request',
    resultKey: null,
  },
  editing: {
    editorVersion: 'editing',
    liveVersion: 'old',
    status: 'editing',
    resultKey: null,
  },
  refreshing: {
    editorVersion: 'new',
    liveVersion: 'old',
    status: 'refreshing',
    resultKey: null,
  },
  published: {
    editorVersion: 'new',
    liveVersion: 'new',
    status: 'published',
    resultKey: 'published',
  },
};

const MOBILE_LEAD_BASE = {
  visit: 'phone',
  phone: '+995 5XX XXX XXX',
  fictional: true,
};

const MOBILE_LEAD_FRAMES = {
  visiting: {
    ...MOBILE_LEAD_BASE,
    serviceSelected: false,
    formStatus: 'idle',
    ownerInbox: 'empty',
    resultKey: null,
  },
  'service-selected': {
    ...MOBILE_LEAD_BASE,
    serviceSelected: true,
    formStatus: 'idle',
    ownerInbox: 'empty',
    resultKey: null,
  },
  submitted: {
    ...MOBILE_LEAD_BASE,
    serviceSelected: true,
    formStatus: 'sent',
    ownerInbox: 'empty',
    resultKey: null,
  },
  delivered: {
    ...MOBILE_LEAD_BASE,
    serviceSelected: true,
    formStatus: 'sent',
    ownerInbox: 'new-lead',
    resultKey: 'leadCreated',
  },
};

export function nextStage(stages, current) {
  if (stages.length === 0) return undefined;

  const currentIndex = stages.indexOf(current);
  if (currentIndex < 0) return stages[0];

  return stages[Math.min(currentIndex + 1, stages.length - 1)];
}

export function liveUpdateFrame(stage) {
  return LIVE_UPDATE_FRAMES[stage] ?? LIVE_UPDATE_FRAMES.request;
}

export function mobileLeadFrame(stage) {
  return MOBILE_LEAD_FRAMES[stage] ?? MOBILE_LEAD_FRAMES.visiting;
}

export function createTimelinePlayer({
  stages,
  onStage,
  duration = 7_200,
  reducedMotion = false,
  setTimeoutFn = setTimeout,
  clearTimeoutFn = clearTimeout,
}) {
  let timers = [];

  const cancel = () => {
    timers.forEach((timer) => clearTimeoutFn(timer));
    timers = [];
  };

  const play = () => {
    cancel();
    if (stages.length === 0) return;

    if (reducedMotion) {
      onStage(stages[stages.length - 1]);
      return;
    }

    onStage(stages[0]);
    if (stages.length === 1) return;

    const firstChangeAt = Math.min(900, duration);
    const remainingTransitions = stages.length - 1;
    timers = stages.slice(1).map((stage, index) => {
      const progress = remainingTransitions === 1 ? 1 : index / (remainingTransitions - 1);
      const at = firstChangeAt + (duration - firstChangeAt) * progress;
      return setTimeoutFn(() => onStage(stage), at);
    });
  };

  const reset = () => {
    cancel();
    if (stages.length > 0) onStage(stages[0]);
  };

  const showFinal = () => {
    cancel();
    if (stages.length > 0) onStage(stages[stages.length - 1]);
  };

  return {
    play,
    replay: play,
    cancel,
    reset,
    showFinal,
  };
}

export function createTimedStatePlayer({
  timing,
  onState,
  setTimeoutFn = setTimeout,
  clearTimeoutFn = clearTimeout,
}) {
  let timers = [];
  const transitions = timing?.transitions ?? [];

  const cancel = () => {
    timers.forEach((timer) => clearTimeoutFn(timer));
    timers = [];
  };

  const play = () => {
    cancel();
    if (transitions.length === 0) return;

    const [first, ...rest] = transitions;
    onState(first.state);
    timers = rest.map(({ at, state }) =>
      setTimeoutFn(() => onState(state), at),
    );
  };

  const reset = () => {
    cancel();
    if (transitions.length > 0) onState(transitions[0].state);
  };

  const showFinal = () => {
    cancel();
    if (transitions.length > 0) onState(transitions.at(-1).state);
  };

  return { play, replay: play, cancel, reset, showFinal };
}
