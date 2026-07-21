'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';
import { cn } from '@/lib/utils';
import {
  LIVE_UPDATE_STAGES,
  createTimelinePlayer,
  liveUpdateFrame,
} from './web-demo-models.mjs';

const STEP_ICONS = [
  'solar:chat-round-dots-bold-duotone',
  'solar:pen-new-square-bold-duotone',
  'solar:refresh-bold-duotone',
  'solar:check-circle-bold-duotone',
] as const;
const CYCLE_MS = 7_200;

export function WebLiveUpdate() {
  const t = useTranslations('product.liveUpdate');
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<string>(LIVE_UPDATE_STAGES[0]);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const player = createTimelinePlayer({
      stages: LIVE_UPDATE_STAGES,
      duration: CYCLE_MS,
      onStage: (nextStage: string) => setStage(nextStage),
    });

    const target = sectionRef.current;
    if (!target) return;

    const controller = createDemoLoop({
      target,
      reducedMotion: Boolean(reduced),
      threshold: 0.35,
      cycleMs: CYCLE_MS,
      holdMs: 2_000,
      play: player.play,
      showFinal: player.showFinal,
      reset: player.reset,
      stop: player.cancel,
    });
    controllerRef.current = controller;

    return () => {
      controller.cleanup();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [reduced]);

  const frame = liveUpdateFrame(stage);
  const activeIndex = LIVE_UPDATE_STAGES.indexOf(stage);
  const editorValue = frame.editorVersion === 'old' ? t('oldValue') : t('newValue');
  const liveValue = frame.liveVersion === 'old' ? t('oldValue') : t('newValue');

  return (
    <SectionContainer className="py-16 md:py-24 lg:py-28">
      <div
        ref={sectionRef}
        data-landing-demo="web-live-update"
        data-demo-id="web-live-update"
        data-demo-detail={stage}
        aria-live="off"
        className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(260px,360px)_1fr] lg:gap-14"
      >
        <div className="min-w-0">
          <span className="text-[12px] tracking-wide text-[#667085]">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-balance font-display text-[30px] font-extrabold leading-[1.1] tracking-tight text-[#101828] md:text-[36px] md:leading-[1.12]">
            {t('heading')}
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#4B5563]">
            {t('subtitle')}
          </p>

          <ol className="mt-7 space-y-3" aria-label={t('heading')}>
            {LIVE_UPDATE_STAGES.map((item, index) => {
              const reached = index <= activeIndex;
              return (
                <li
                  key={item}
                  aria-current={item === stage ? 'step' : undefined}
                  className={cn(
                    'flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] transition-colors duration-200',
                    item === stage ? 'bg-white text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.07)]' : 'text-[#667085]',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                      reached ? 'bg-[var(--brand)] text-[#0e0e11]' : 'bg-neutral-900/[0.06]',
                    )}
                  >
                    <Ico name={STEP_ICONS[index]} className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 break-words">
                    {item === 'request' ? t('request') : t(item)}
                  </span>
                </li>
              );
            })}
          </ol>

          <button
            type="button"
            onClick={() => controllerRef.current?.replay()}
            data-demo-replay
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.12)] transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
          >
            <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
            {t('replay')}
          </button>
          <p data-demo-outcome className="mt-4 text-pretty text-[13px] font-semibold leading-relaxed text-[#4B5563]">
            {t('outcome')}
          </p>
        </div>

        <div className="min-w-0 overflow-hidden rounded-3xl bg-[#0e0e11] p-4 text-white shadow-[0_24px_60px_-34px_rgba(0,0,0,0.55)] md:p-7">
          <motion.div
            key={`request-${stage}`}
            initial={reduced ? false : { opacity: 0.55, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="ml-auto max-w-[330px] rounded-2xl rounded-tr-sm bg-white px-4 py-3 text-[13px] leading-relaxed text-neutral-900"
          >
            <span className="mb-2 flex items-center gap-2 text-[11px] font-semibold tracking-wide text-[#667085]">
              <Ico name="solar:chat-round-dots-bold-duotone" className="h-3.5 w-3.5" />
              {t('eyebrow')}
            </span>
            {t('request')}
          </motion.div>

          <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] md:items-stretch">
            <div className="rounded-2xl bg-white/[0.06] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
              <div className="flex min-h-10 items-center gap-2 text-[12px] text-white/55 md:min-h-8">
                <Ico name="solar:pen-new-square-bold-duotone" className="h-4 w-4" />
                <span>{stage === 'request' ? t('request') : t(frame.status)}</span>
              </div>
              <div className="mt-5 rounded-xl bg-white p-5 text-neutral-900">
                <span className="block h-2 w-20 rounded-full bg-neutral-900/10" aria-hidden="true" />
                <span className="mt-3 block h-2 w-32 rounded-full bg-neutral-900/10" aria-hidden="true" />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={editorValue}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: reduced ? 0 : 0.24 }}
                    className="mt-8 font-display text-3xl font-extrabold tabular-nums"
                  >
                    {editorValue}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex min-h-11 items-center justify-center" aria-hidden="true">
              <Ico
                name="solar:arrow-right-bold-duotone"
                className="h-[22px] w-[22px] rotate-90 text-[var(--brand)] md:rotate-0"
              />
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-white text-neutral-900">
              <div className="flex items-center gap-2 border-b border-neutral-900/[0.06] bg-[#fafafa] px-4 py-3">
                <Ico name="solar:global-bold-duotone" className="h-3.5 w-3.5 text-neutral-900/35" />
                <span className="text-[11px] text-[#667085]">yourclinic.ge</span>
              </div>
              <div className="relative min-h-[190px] p-5">
                <span className="block h-2 w-24 rounded-full bg-neutral-900/10" aria-hidden="true" />
                <span className="mt-3 block h-2 w-36 rounded-full bg-neutral-900/10" aria-hidden="true" />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={liveValue}
                    initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: reduced ? 0 : 0.28 }}
                    className="mt-8 font-display text-3xl font-extrabold tabular-nums"
                  >
                    {liveValue}
                  </motion.p>
                </AnimatePresence>
                {stage === 'refreshing' && (
                  <motion.span
                    initial={reduced ? false : { transform: 'translateY(-16px)' }}
                    animate={{ transform: 'translateY(150px)' }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-x-0 top-0 h-px bg-[var(--brand)] shadow-[0_0_18px_var(--brand)]"
                    aria-hidden="true"
                  />
                )}
                {stage === 'published' && (
                  <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[var(--brand)] px-3 py-1 text-[11px] font-bold text-[#0e0e11]">
                    <Ico name="solar:check-circle-bold-duotone" className="h-3 w-3" />
                    {t('published')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 min-h-[58px]" aria-live="off">
            {frame.resultKey && (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[58px] items-center gap-3 rounded-2xl bg-[var(--brand)] px-4 text-[14px] font-bold text-[#0e0e11]"
              >
                <Ico name="solar:check-circle-bold-duotone" className="h-[18px] w-[18px]" />
                {t('outcome')}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
