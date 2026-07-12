export function startTimelineWhenVisible({
  node,
  reducedMotion,
  play,
  createObserver = undefined,
}) {
  let hasPlayed = false;
  let observer = null;

  const playOnce = () => {
    if (hasPlayed) return false;
    hasPlayed = true;
    play();
    return true;
  };

  const disconnect = () => {
    observer?.disconnect();
    observer = null;
  };

  const observerFactory = createObserver ?? (
    typeof IntersectionObserver === 'undefined'
      ? null
      : (callback, options) => new IntersectionObserver(callback, options)
  );

  if (reducedMotion || !node || !observerFactory) {
    playOnce();
    return disconnect;
  }

  observer = observerFactory(
    ([entry]) => {
      if (!entry?.isIntersecting || !playOnce()) return;
      disconnect();
    },
    { threshold: 0.35 },
  );
  observer.observe(node);

  return disconnect;
}
