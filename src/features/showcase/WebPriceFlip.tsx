'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

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

  const work = mode === 'once' ? ONCE_WORK : WORK;

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl lg:ml-0">
        <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
          {t('eyebrow')}
        </span>
        <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">
          {t('heading')}
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#525252]">
          {t('subtitle')}
        </p>

        {/* the switch */}
        <div className="mt-8 inline-flex rounded-full bg-[#f0f0f0] p-1">
          {(['once', 'monthly'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={cn(
                'min-h-[44px] rounded-full px-6 text-[14px] font-semibold',
                'transition-[transform,background-color,color] duration-150 ease-out',
                'active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
                mode === m ? 'bg-white text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'text-neutral-900/50',
              )}
            >
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

          <div className="mt-1 flex items-baseline justify-between text-[11px] uppercase tracking-wide text-neutral-900/35">
            <span>{t('launch')}</span>
            <span>
              {MONTHS} {t('month')}
            </span>
          </div>
        </div>

        <motion.p
          key={mode}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            'mt-6 max-w-xl text-pretty text-[15px] leading-relaxed',
            mode === 'once' ? 'text-neutral-900/70' : 'text-neutral-900',
          )}
        >
          {t(`${mode}End`)}
        </motion.p>

        <p className="mt-4 text-[12px] leading-relaxed text-[#737373]">{t('note')}</p>
      </div>
    </SectionContainer>
  );
}
