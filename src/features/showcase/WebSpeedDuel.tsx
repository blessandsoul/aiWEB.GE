'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';
import { cn } from '@/lib/utils';
import { SPEED_FEEL_GRID_TEMPLATE } from './web-speed-layout.mjs';

type Feel = 'slow' | 'ok' | 'fast';

const FEELS: Feel[] = ['slow', 'ok', 'fast'];
const CYCLE_MS = 7_000;

export function WebSpeedDuel() {
  const t = useTranslations('product.speed');
  const reduced = useReducedMotion();
  const [feel, setFeel] = useState<Feel>('slow');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const stop = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const reset = useCallback(() => {
    stop();
    setFeel('slow');
  }, [stop]);

  const play = useCallback(() => {
    reset();
    timersRef.current = [
      setTimeout(() => setFeel('ok'), 2_300),
      setTimeout(() => setFeel('fast'), 4_700),
    ];
  }, [reset]);

  const showFinal = useCallback(() => {
    stop();
    setFeel('fast');
  }, [stop]);

  useEffect(() => {
    const target = rootRef.current;
    if (!target) return;

    const controller = createDemoLoop({
      target,
      reducedMotion: Boolean(reduced),
      threshold: 0.35,
      cycleMs: CYCLE_MS,
      holdMs: 2_000,
      play,
      showFinal,
      reset,
      stop,
    });
    controllerRef.current = controller;

    return () => {
      controller.cleanup();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [play, reduced, reset, showFinal, stop]);

  const chooseFeel = (nextFeel: Feel) => {
    controllerRef.current?.takeControl();
    setFeel(nextFeel);
  };

  return (
    <SectionContainer className="py-20 md:py-28">
      <div
        ref={rootRef}
        className="min-w-0 overflow-hidden rounded-[32px] bg-[#0e0e11] p-5 text-white shadow-[0_34px_80px_-48px_rgba(0,0,0,0.7)] sm:p-7 md:p-10 lg:p-12"
      >
        <div className="grid min-w-0 gap-10 xl:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] xl:gap-14">
          <div className="min-w-0">
            <span className="text-[12px] uppercase tracking-wide text-white/40">
              {t('eyebrow')}
            </span>
            <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl">
              {t('heading')}
            </h2>
            <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-white/55">
              {t('subtitle')}
            </p>

            <div className="mt-7 min-w-0 rounded-2xl bg-white/[0.05] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] sm:p-4">
              <span className="block text-[12px] font-semibold text-white/55">{t('yours')}</span>
              <div
                className="mt-3 grid min-w-0 gap-2"
                style={{ gridTemplateColumns: SPEED_FEEL_GRID_TEMPLATE }}
              >
                {FEELS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => chooseFeel(item)}
                    aria-pressed={feel === item}
                    className={cn(
                      'min-h-[44px] min-w-0 rounded-xl px-3 text-[13px] font-semibold',
                      'transition-[transform,background-color,color] duration-150 active:scale-[0.97]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e11]',
                      feel === item
                        ? 'bg-[var(--brand)] text-[#0e0e11]'
                        : 'bg-white/[0.06] text-white/60 md:hover:bg-white/10',
                    )}
                  >
                    {t(item)}
                  </button>
                ))}
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              <li className="flex min-w-0 items-start gap-3 text-[13px] leading-relaxed text-white/65">
                <Ico name="solar:smartphone-bold-duotone" className="mt-0.5 h-5 w-5 text-[var(--brand)]" />
                <span>{t('check1')}</span>
              </li>
              <li className="flex min-w-0 items-start gap-3 text-[13px] leading-relaxed text-white/65">
                <Ico name="solar:gallery-bold-duotone" className="mt-0.5 h-5 w-5 text-[var(--brand)]" />
                <span>{t('check2')}</span>
              </li>
              <li className="flex min-w-0 items-start gap-3 text-[13px] leading-relaxed text-white/65">
                <Ico name="solar:shield-check-bold-duotone" className="mt-0.5 h-5 w-5 text-[var(--brand)]" />
                <span>{t('check3')}</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => controllerRef.current?.replay()}
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-bold text-[#0e0e11] transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e11]"
            >
              <Ico name="solar:refresh-bold-duotone" className="h-5 w-5" />
              {t('replay')}
            </button>
          </div>

          <div className="min-w-0 rounded-3xl bg-white/[0.04] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] sm:p-5 md:p-6">
            <div className="grid min-w-0 gap-3 md:grid-cols-2">
              <BrowserCard
                label={t('currentLabel')}
                siteName={t('siteName')}
                feel={feel}
                variant="current"
                reduced={Boolean(reduced)}
              />
              <BrowserCard
                label={t('improvedLabel')}
                siteName={t('siteName')}
                feel="fast"
                variant="improved"
                reduced={Boolean(reduced)}
              />
            </div>

            <motion.div
              key={feel}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
              aria-live="polite"
              className="mt-3 flex min-w-0 items-start gap-3 rounded-2xl bg-[var(--brand)] p-4 text-[#0e0e11] sm:items-center sm:p-5"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0e0e11]/10">
                <Ico name="solar:bolt-bold-duotone" className="h-6 w-6" />
              </span>
              <p className="min-w-0 text-pretty text-[13px] font-bold leading-relaxed sm:text-[14px]">
                {t(`result_${feel}`)}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function BrowserCard({
  label,
  siteName,
  feel,
  variant,
  reduced,
}: {
  label: string;
  siteName: string;
  feel: Feel;
  variant: 'current' | 'improved';
  reduced: boolean;
}) {
  const progress = feel === 'slow' ? 34 : feel === 'ok' ? 68 : 100;
  const contentOpacity = feel === 'slow' ? 0.24 : feel === 'ok' ? 0.62 : 1;
  const highlighted = variant === 'improved';

  return (
    <div
      className={cn(
        'min-w-0 overflow-hidden rounded-2xl bg-white text-[#0e0e11]',
        highlighted && 'shadow-[0_0_0_2px_var(--brand),0_20px_45px_-30px_var(--brand)]',
      )}
    >
      <div className="flex min-w-0 items-center gap-2 border-b border-neutral-900/[0.07] bg-[#f7f7f8] px-3 py-3">
        <span className="flex shrink-0 gap-1" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-neutral-900/10" />
          <span className="h-2 w-2 rounded-full bg-neutral-900/10" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[10px] font-semibold text-neutral-900/40">
          {label}
        </span>
        <Ico
          name={highlighted ? 'solar:bolt-bold-duotone' : 'solar:clock-circle-bold-duotone'}
          className={cn('h-4 w-4', highlighted ? 'text-[var(--brand)]' : 'text-neutral-900/30')}
        />
      </div>

      <div className="h-1 bg-neutral-900/[0.06]">
        <motion.span
          className="block h-full bg-[var(--brand)]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: reduced ? 0 : 0.5, ease: 'easeOut' }}
        />
      </div>

      <motion.div
        animate={{ opacity: contentOpacity }}
        transition={{ duration: reduced ? 0 : 0.35 }}
        className="min-h-[292px] p-4 sm:p-5"
      >
        <div className="flex items-center justify-between gap-3 border-b border-neutral-900/[0.06] pb-3">
          <span className="flex items-center gap-2 text-[11px] font-extrabold">
            <Ico name="solar:global-bold-duotone" className="h-4 w-4 text-[var(--brand)]" />
            {siteName}
          </span>
          <span className="h-2 w-14 rounded-full bg-neutral-900/10" aria-hidden="true" />
        </div>

        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_72px] items-center gap-3">
          <span className="min-w-0">
            <span className="block h-3 w-full max-w-32 rounded-full bg-neutral-900/80" />
            <span className="mt-2 block h-3 w-4/5 rounded-full bg-neutral-900/80" />
            <span className="mt-3 block h-2 w-full rounded-full bg-neutral-900/10" />
            <span className="mt-2 block h-2 w-3/4 rounded-full bg-neutral-900/10" />
          </span>
          <span className="flex aspect-square items-center justify-center rounded-2xl bg-[var(--brand)]/15 text-[var(--brand)]">
            <Ico name="solar:gallery-bold-duotone" className="h-8 w-8" />
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {['solar:calendar-mark-bold-duotone', 'solar:user-check-rounded-bold-duotone', 'solar:phone-bold-duotone'].map((icon) => (
            <span key={icon} className="flex min-h-[58px] items-center justify-center rounded-xl bg-neutral-900/[0.04] text-[var(--brand)]">
              <Ico name={icon} className="h-5 w-5" />
            </span>
          ))}
        </div>

        <span className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#0e0e11] text-white">
          <Ico name="solar:arrow-right-bold-duotone" className="h-5 w-5" />
        </span>
      </motion.div>
    </div>
  );
}
