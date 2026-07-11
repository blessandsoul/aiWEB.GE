'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

/* =========================================================================
   WebBuildLive: the signature.

   A stranger has five seconds. In those five seconds this has to say "they build the
   site, and the site is fast", without him reading a single sentence. So we do not tell
   him. He types his own business name, presses one button, and watches the thing assemble
   in a browser chrome while a speed gauge climbs beside it.

   The whole page is pre-written per industry in a const. There is no API call and there is
   no model running: this is a choreography, not a demo of a generator, and pretending
   otherwise would be the kind of lie the rest of this site is built to avoid.

   Craft notes: every animated property is transform or opacity, so nothing here triggers
   layout. The stagger is 100ms between groups and 80ms between words, which is the house
   rule. Reduced motion drops the choreography and prints the finished page at once, which
   is the correct behaviour: the information still lands, only the theatre goes.
   ========================================================================= */

const INDUSTRIES = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'] as const;
type Industry = (typeof INDUSTRIES)[number];

/* The build timeline, in ms from the press. Each stage is one semantic chunk of the page,
   which is what makes the assembly read as a page being born rather than a loading bar. */
const STAGE = {
  chrome: 0,
  nav: 260,
  h1: 620,
  sub: 1500,
  cards: 1950,
  cta: 2700,
  done: 3400,
} as const;

const SPEED_TARGET = 96;
const SPEED_MS = 2600;

export function WebBuildLive() {
  const t = useTranslations('product.build');
  const reduced = useReducedMotion();

  const [name, setName] = useState('');
  const [industry, setIndustry] = useState<Industry>('i1');
  const [stage, setStage] = useState(-1); // -1 idle, else ms elapsed
  const [speed, setSpeed] = useState(0);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const raf = useRef<number | null>(null);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
  }, []);

  useEffect(() => clear, [clear]);

  const build = useCallback(() => {
    clear();
    setStage(0);
    setSpeed(0);

    if (reduced) {
      setStage(STAGE.done);
      setSpeed(SPEED_TARGET);
      return;
    }

    Object.values(STAGE).forEach((ms) => {
      timers.current.push(setTimeout(() => setStage(ms), ms));
    });

    const t0 = performance.now();
    const tick = () => {
      const p = Math.min((performance.now() - t0) / SPEED_MS, 1);
      // ease-out cubic: the needle leaps and settles, the way a real measurement does
      setSpeed(Math.round(SPEED_TARGET * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [clear, reduced]);

  const at = (ms: number) => stage >= ms;
  const running = stage >= 0 && stage < STAGE.done;
  const finished = stage >= STAGE.done;

  const brand = name.trim() || t('namePlaceholder');
  const h1 = t(`h1_${industry}`);
  const words = h1.split(' ');

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-14">
        {/* LEFT: the controls. Deliberately small and quiet: the boldness is spent on the right. */}
        <div>
          <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">
            {t('heading')}
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#525252]">
            {t('subtitle')}
          </p>

          <div className="mt-8">
            <label className="block">
              <span className="sr-only">{t('namePlaceholder')}</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('namePlaceholder')}
                className="h-12 w-full rounded-xl bg-white px-4 text-[15px] text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] outline-none transition-[box-shadow] duration-150 ease-out placeholder:text-neutral-900/35 focus-visible:shadow-[0_0_0_2px_var(--brand)]"
              />
            </label>

            <span className="mt-5 block text-[13px] font-medium text-neutral-900/60">
              {t('industryLabel')}
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {INDUSTRIES.map((i) => {
                const on = i === industry;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndustry(i)}
                    aria-pressed={on}
                    className={cn(
                      'min-h-[40px] rounded-full px-4 text-[13px] font-medium',
                      'transition-[transform,background-color,box-shadow] duration-150 ease-out',
                      'active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
                      on
                        ? 'bg-[var(--brand)] text-white shadow-none'
                        : 'bg-white text-[#525252] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] md:hover:bg-[#f4f4f4]',
                    )}
                  >
                    {t(i)}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={build}
              disabled={running}
              className={cn(
                'mt-7 inline-flex h-14 w-full items-center justify-center rounded-full text-[15px] font-bold text-white',
                'transition-[transform,filter] duration-150 ease-out active:scale-[0.96] md:hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
                running && 'opacity-70',
              )}
              style={{ background: 'var(--brand)' }}
            >
              {running ? t('building') : finished ? t('rebuild') : t('buildBtn')}
            </button>
          </div>
        </div>

        {/* RIGHT: the browser + the gauge. This is the five seconds the page lives or dies on. */}
        <div>
          <div className="flex items-start gap-4">
            {/* Browser chrome */}
            <div className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_18px_40px_-24px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2 border-b border-[#ececec] bg-[#fafafa] px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e5e5e5]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e5e5e5]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e5e5e5]" />
                </span>
                <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-[12px] text-neutral-900/40 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
                  {slugify(brand)}.ge
                </span>
              </div>

              <div className="relative min-h-[420px] px-6 py-6 md:min-h-[460px] md:px-8">
                {stage < 0 && (
                  <div className="absolute inset-0 flex items-center justify-center px-8">
                    <p className="max-w-xs text-pretty text-center text-[14px] leading-relaxed text-neutral-900/30">
                      {t('subtitle')}
                    </p>
                  </div>
                )}

                {/* nav */}
                <Chunk show={at(STAGE.nav)} reduced={reduced}>
                  <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-4">
                    <span className="truncate font-display text-[15px] font-extrabold tracking-tight text-neutral-900">
                      {brand}
                    </span>
                    <span className="hidden gap-5 text-[12px] text-neutral-900/50 sm:flex">
                      <span>{t('nav1')}</span>
                      <span>{t('nav2')}</span>
                      <span>{t('nav3')}</span>
                    </span>
                  </div>
                </Chunk>

                {/* h1, typewritten word by word at 80ms, which is the house stagger for a title */}
                <div className="mt-7 min-h-[76px]">
                  {at(STAGE.h1) && (
                    <h3 className="text-balance font-display text-[26px] font-extrabold leading-[1.12] tracking-tight text-neutral-900 md:text-[32px]">
                      {words.map((w, i) => (
                        <motion.span
                          key={i}
                          initial={reduced ? false : { opacity: 0, y: 10, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          transition={{ delay: reduced ? 0 : i * 0.08, duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                          className="mr-[0.28em] inline-block"
                        >
                          {w}
                        </motion.span>
                      ))}
                    </h3>
                  )}
                </div>

                <Chunk show={at(STAGE.sub)} reduced={reduced}>
                  <p className="mt-3 max-w-md text-pretty text-[14px] leading-relaxed text-[#525252]">
                    {t(`sub_${industry}`)}
                  </p>
                </Chunk>

                {/* three service cards. NOT an equal grid-cols-3 row: the first card is wide. */}
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[1, 2, 3].map((n, i) => (
                    <Chunk
                      key={n}
                      show={at(STAGE.cards)}
                      reduced={reduced}
                      delay={i * 0.1}
                      className={i === 0 ? 'col-span-2' : ''}
                    >
                      <div className="h-full rounded-xl bg-[#fafafa] p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
                        <span
                          className="mb-3 block h-1 w-8 rounded-full"
                          style={{ background: 'var(--brand)' }}
                          aria-hidden="true"
                        />
                        <span className="text-[13px] font-semibold text-neutral-900">
                          {t(`s${n}_${industry}`)}
                        </span>
                      </div>
                    </Chunk>
                  ))}
                  <Chunk show={at(STAGE.cta)} reduced={reduced} delay={0.06}>
                    <div
                      className="flex h-full min-h-[64px] items-center justify-center rounded-xl px-3 text-center text-[13px] font-bold text-white"
                      style={{ background: 'var(--brand)' }}
                    >
                      {t('cta')}
                    </div>
                  </Chunk>
                </div>

                <AnimatePresence>
                  {finished && (
                    <motion.p
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="mt-7 border-t border-[#f0f0f0] pt-4 text-pretty text-[13px] leading-relaxed text-[#737373]"
                    >
                      {t('done')}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* the gauge, climbing while the page builds */}
            <div className="hidden w-[104px] shrink-0 rounded-2xl bg-[#0e0e11] px-3 py-5 text-center md:block">
              <Gauge value={speed} />
              <span className="mt-3 block text-[10px] uppercase leading-tight tracking-wide text-white/35">
                {t('speedLabel')}
              </span>
            </div>
          </div>

          {/* the gauge again, under the browser, on a phone */}
          <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#0e0e11] px-5 py-4 md:hidden">
            <Gauge value={speed} compact />
            <span className="text-[11px] uppercase tracking-wide text-white/35">
              {t('speedLabel')}
            </span>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function Chunk({
  show,
  reduced,
  delay = 0,
  className,
  children,
}: {
  show: boolean;
  reduced: boolean | null;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  if (!show) return <div className={cn('invisible', className)}>{children}</div>;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: reduced ? 0 : delay, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* A ring, drawn with strokeDashoffset so only a transform-free paint changes. tabular-nums on
   the digits, because the value counts up and proportional numerals would make it jitter. */
function Gauge({ value, compact = false }: { value: number; compact?: boolean }) {
  const R = compact ? 22 : 34;
  const C = 2 * Math.PI * R;
  const size = compact ? 56 : 84;
  return (
    <span className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={compact ? 5 : 7}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={R}
          fill="none"
          stroke="var(--brand)"
          strokeWidth={compact ? 5 : 7}
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C - (C * value) / 100}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 90ms linear' }}
        />
      </svg>
      <span
        className={cn(
          'absolute font-display font-extrabold tabular-nums text-white',
          compact ? 'text-[15px]' : 'text-[22px]',
        )}
      >
        {value}
      </span>
    </span>
  );
}

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 18) || 'yourbusiness'
  );
}
