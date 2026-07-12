'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';
import { cn } from '@/lib/utils';
import {
  WEB_PRICE_TIMING,
  createTimedStatePlayer,
} from './web-demo-models.mjs';

/* =========================================================================
   WebPriceFlip: the argument made without a price.

   The owner's instinct is that paying once is cheaper than paying monthly. Over 24 months
   that instinct is arithmetically reasonable and strategically wrong, and no paragraph is
   going to convince him of it.

   So the widget stops arguing and shows him the shape. Two identical timelines. On the
   pay-once side the work stops at week two and the rest of the timeline is empty, because
   that is what actually happens. On the monthly side the small, boring jobs keep landing:
   a price changed, a page added, a form fixed, an SSL renewed.

   No number appears anywhere in it, deliberately. The point is not that monthly is cheaper.
   The point is what you get in month eleven.
   ========================================================================= */

const MONTHS = 24;

/* When each job lands on the monthly plan. Irregular on purpose: real maintenance is lumpy,
   and an evenly spaced row of ticks would read as a decoration rather than a record. */
const WORK: { m: number; key: string }[] = [
  { m: 1, key: 'w2' },
  { m: 2, key: 'w3' },
  { m: 4, key: 'w1' },
  { m: 5, key: 'w4' },
  { m: 7, key: 'w2' },
  { m: 9, key: 'w8' },
  { m: 11, key: 'w5' },
  { m: 12, key: 'w6' },
  { m: 14, key: 'w2' },
  { m: 15, key: 'w1' },
  { m: 17, key: 'w3' },
  { m: 18, key: 'w7' },
  { m: 20, key: 'w2' },
  { m: 21, key: 'w4' },
  { m: 23, key: 'w1' },
];

/* The one-off plan. Two things happen, then nothing does. */
const ONCE_WORK: { m: number; key: string }[] = [
  { m: 0, key: 'w1' },
  { m: 1, key: 'w4' },
];

type Mode = 'once' | 'monthly';

export function WebPriceFlip() {
  const t = useTranslations('product.flip');
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>('once');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);

  useEffect(() => {
    const target = rootRef.current;
    if (!target) return;
    const player = createTimedStatePlayer({
      timing: WEB_PRICE_TIMING,
      onState: (nextMode: Mode) => setMode(nextMode),
    });
    const controller = createDemoLoop({
      target,
      reducedMotion: Boolean(reduced),
      threshold: 0.35,
      cycleMs: WEB_PRICE_TIMING.cycleMs,
      holdMs: WEB_PRICE_TIMING.holdMs,
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

  const chooseMode = (next: Mode) => {
    controllerRef.current?.takeControl();
    setMode(next);
  };

  const work = mode === 'once' ? ONCE_WORK : WORK;

  return (
    <SectionContainer className="py-20 md:py-28">
      <div ref={rootRef} className="mx-auto min-w-0 max-w-5xl lg:ml-0">
        <div className="flex min-w-0 flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <span className="text-[12px] tracking-wide text-neutral-900/40">
              {t('eyebrow')}
            </span>
            <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">
              {t('heading')}
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#525252]">
              {t('subtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => controllerRef.current?.replay()}
            className="inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.12)] transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
          >
            <Ico name="solar:refresh-bold-duotone" className="h-5 w-5" />
            {t('replay')}
          </button>
        </div>

        {/* the switch */}
        <div className="mt-8 inline-flex rounded-full bg-[#f0f0f0] p-1">
          {(['once', 'monthly'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => chooseMode(m)}
              aria-pressed={mode === m}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-[14px] font-semibold sm:px-6',
                'transition-[transform,background-color,color] duration-150 ease-out',
                'active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
                mode === m ? 'bg-white text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'text-neutral-900/50',
              )}
            >
              <Ico
                name={m === 'once' ? 'solar:rocket-bold-duotone' : 'solar:refresh-bold-duotone'}
                className="h-4 w-4"
              />
              {t(m)}
            </button>
          ))}
        </div>

        <p className="mt-5 text-[14px] font-medium text-neutral-900/60">{t(`${mode}Label`)}</p>

        {/* the timeline */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-[#fafafa] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-7">
          <div className="flex items-end gap-[3px]" style={{ height: 148 }}>
            {Array.from({ length: MONTHS }, (_, i) => {
              const jobs = work.filter((w) => w.m === i);
              const has = jobs.length > 0;
              return (
                <div key={i} className="group relative flex-1">
                  <motion.div
                    // scaleY only: no height animation, so nothing here triggers layout
                    initial={false}
                    animate={{ scaleY: has ? 1 : 0.06 }}
                    transition={{
                      duration: reduced ? 0 : 0.34,
                      delay: reduced ? 0 : i * 0.018,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="origin-bottom rounded-t-[3px]"
                    style={{
                      height: 120,
                      background: has ? 'var(--brand)' : '#e0e0e0',
                    }}
                  />
                  {has && (
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 md:block">
                      {t(jobs[0].key)}
                    </span>
                  )}
                  <span className="mt-2 block text-center text-[9px] tabular-nums text-neutral-900/25">
                    {i % 6 === 0 ? i : ''}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-1 flex items-baseline justify-between text-[11px] tracking-wide text-neutral-900/35">
            <span>{t('launch')}</span>
            <span>
              {MONTHS} {t('month')}
            </span>
          </div>
        </div>

        <motion.div
          key={mode}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            'mt-6 flex max-w-2xl min-w-0 items-start gap-3 rounded-2xl p-4 text-pretty text-[15px] leading-relaxed',
            mode === 'once' ? 'bg-neutral-900/[0.04] text-neutral-900/70' : 'bg-[var(--brand)]/10 text-neutral-900',
          )}
        >
          <Ico
            name={mode === 'once' ? 'solar:clock-circle-bold-duotone' : 'solar:shield-check-bold-duotone'}
            className="mt-0.5 h-5 w-5 text-[var(--brand-ink)]"
          />
          <p>{t(`${mode}End`)}</p>
        </motion.div>

        <p className="mt-4 text-[12px] leading-relaxed text-[#737373]">{t('note')}</p>
      </div>
    </SectionContainer>
  );
}
