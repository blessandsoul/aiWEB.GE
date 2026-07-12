export const LIVE_UPDATE_STAGES = ['request', 'editing', 'refreshing', 'published'];

export const MOBILE_LEAD_STAGES = [
  'visiting',
  'service-selected',
  'submitted',
  'delivered',
];

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

    const interval = duration / (stages.length - 1);
    timers = stages.slice(1).map((stage, index) =>
      setTimeoutFn(() => onStage(stage), interval * (index + 1)),
    );
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
