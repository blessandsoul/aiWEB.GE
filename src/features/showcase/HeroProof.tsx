'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';

/* =========================================================================
   HeroProof, aiWEB: a site, in a browser, loading in front of him, with the gauge settling high.

   Two claims land at once and neither is written down: we build it, and it is fast. The full
   version, where he types his own business name and watches it assemble, is one screen below.
   This is the frame that makes him scroll to it.

   The speed number is not a claim about his site. It is what the gauge on OUR builds reads, and
   the only external number on this entire landing (Deloitte with Google: a tenth of a second is
   worth 8.4% of retail conversion) is quoted with its source further down, never here.
   ========================================================================= */

const CYCLE = 5200;
const TARGET = 96;

export function HeroProof() {
  const t = useTranslations('product.proof');
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStage(4);
      setSpeed(TARGET);
      return;
    }
    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setStage(0);
      setSpeed(0);
      [400, 900, 1500, 2100].forEach((ms, i) => {
        timers.push(setTimeout(() => setStage(i + 1), ms));
      });
      const t0 = performance.now();
      const tick = () => {
        const p = Math.min((performance.now() - t0) / 2400, 1);
        setSpeed(Math.round(TARGET * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    run();
    const loop = setInterval(run, CYCLE);
    return () => {
      clearInterval(loop);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const C = 2 * Math.PI * 26;

  return (
    <div className="flex items-start gap-4">
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
      <div className="shrink-0 rounded-2xl bg-[#0e0e11] px-3 py-4 text-center">
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
              strokeDashoffset={C - (C * speed) / 100}
              transform="rotate(-90 32 32)"
              style={{ transition: 'stroke-dashoffset 90ms linear' }}
            />
          </svg>
          <span className="absolute font-display text-[17px] font-extrabold tabular-nums text-white">
            {speed}
          </span>
        </span>
        <span className="mt-2 block text-[9px] uppercase leading-tight tracking-wide text-white/35">
          {t('speed')}
        </span>
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
