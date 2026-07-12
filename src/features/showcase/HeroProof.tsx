'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';

/* The hero shows a small example site assembling. The ring is build progress,
   not a performance score or a promise about a visitor's future website. */

const CYCLE_MS = 6_200;
const PROGRESS_COMPLETE = 100;

export function HeroProof() {
  const t = useTranslations('product.proof');
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const reset = useCallback(() => {
    stop();
    setStage(0);
    setProgress(0);
  }, [stop]);

  const play = useCallback(() => {
    reset();
    [900, 1_900, 3_200, 4_800].forEach((milliseconds, index) => {
      timersRef.current.push(setTimeout(() => setStage(index + 1), milliseconds));
    });

    const startedAt = performance.now();
    const tick = () => {
      const sequenceProgress = Math.min((performance.now() - startedAt) / 5_600, 1);
      setProgress(Math.round(PROGRESS_COMPLETE * (1 - Math.pow(1 - sequenceProgress, 3))));
      if (sequenceProgress < 1) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [reset]);

  const showFinal = useCallback(() => {
    stop();
    setStage(4);
    setProgress(PROGRESS_COMPLETE);
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

  const C = 2 * Math.PI * 26;

  return (
    <div ref={rootRef} className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
      {/* the browser */}
      <div className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_28px_60px_-40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 border-b border-[#ececec] bg-[#fafafa] px-3.5 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
            <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
            <span className="h-2 w-2 rounded-full bg-[#e5e5e5]" />
          </span>
          <span className="ml-1 min-w-0 flex-1 truncate rounded-md bg-white px-2.5 py-1 font-mono text-[10.5px] text-neutral-900/35 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
            {t('url')}
          </span>
        </div>

        <div className="min-h-[248px] px-5 py-5">
          <Chunk on={stage >= 1} reduced={reduced}>
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <span className="font-display text-[13px] font-extrabold tracking-tight text-neutral-900">
                {t('brand')}
              </span>
              <span className="hidden gap-4 text-[10.5px] text-neutral-900/45 sm:flex">
                <span>{t('nav1')}</span>
                <span>{t('nav2')}</span>
              </span>
            </div>
          </Chunk>

          <Chunk on={stage >= 2} reduced={reduced} delay={0.05}>
            <h3 className="mt-5 text-balance font-display text-[21px] font-extrabold leading-[1.14] tracking-tight text-neutral-900">
              {t('h1')}
            </h3>
            <p className="mt-2 text-pretty text-[12px] leading-relaxed text-[#525252]">{t('sub')}</p>
          </Chunk>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[1, 2].map((n, i) => (
              <Chunk
                key={n}
                on={stage >= 3}
                reduced={reduced}
                delay={i * 0.08}
                className={i === 0 ? 'col-span-2' : ''}
              >
                <div className="h-full rounded-lg bg-[#fafafa] p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
                  <span
                    className="mb-2 block h-1 w-6 rounded-full"
                    style={{ background: 'var(--brand)' }}
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-semibold text-neutral-900">{t(`s${n}`)}</span>
                </div>
              </Chunk>
            ))}
            <Chunk on={stage >= 4} reduced={reduced} delay={0.06}>
              <div
                className="flex h-full min-h-[54px] items-center justify-center rounded-lg px-2 text-center text-[11px] font-bold text-white"
                style={{ background: 'var(--brand)' }}
              >
                {t('cta')}
              </div>
            </Chunk>
          </div>
        </div>
      </div>

      {/* the gauge */}
      <div className="flex w-full shrink-0 flex-row items-center rounded-2xl bg-[#0e0e11] px-4 py-3 text-left sm:w-auto sm:flex-col sm:px-3 sm:py-4 sm:text-center">
        <span className="relative inline-flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C - (C * progress) / 100}
              transform="rotate(-90 32 32)"
              style={{ transition: 'stroke-dashoffset 90ms linear' }}
            />
          </svg>
          <span className="absolute font-display text-[17px] font-extrabold tabular-nums text-white">
            {progress}
          </span>
        </span>
        <span className="ml-3 block text-[9px] leading-tight tracking-wide text-white/35 sm:ml-0 sm:mt-2">
          {t('speed')}
        </span>
        <button
          type="button"
          onClick={() => controllerRef.current?.replay()}
          aria-label={t('replay')}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-xl text-white/55 transition-[transform,color] duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] sm:ml-0 sm:mt-2 md:hover:text-white"
        >
          <Ico name="solar:refresh-bold-duotone" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function Chunk({
  on,
  reduced,
  delay = 0,
  className,
  children,
}: {
  on: boolean;
  reduced: boolean | null;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={
        on
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 10, filter: 'blur(4px)' }
      }
      transition={{ delay: reduced ? 0 : delay, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
