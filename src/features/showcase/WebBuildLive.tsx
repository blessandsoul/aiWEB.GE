'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';
import { cn } from '@/lib/utils';
import {
  BUILD_INDUSTRIES,
  WEB_BUILD_OBSERVER_GEOMETRY,
  buildPreview,
  joinAnimatedWords,
} from './web-build-models.mjs';
import {
  WEB_BUILD_TIMING,
  createTimedStatePlayer,
} from './web-demo-models.mjs';

type Industry = 'i1' | 'i2' | 'i3' | 'i4' | 'i5' | 'i6';

const INDUSTRIES = BUILD_INDUSTRIES as Industry[];
const BUILD_STAGE = WEB_BUILD_TIMING.stages;
const STARTER_STAGE = BUILD_STAGE.services;
const STARTER_PROGRESS = Math.round((STARTER_STAGE / WEB_BUILD_TIMING.cycleMs) * 100);

export function WebBuildLive() {
  const t = useTranslations('product.build');
  const reduced = useReducedMotion();
  const observerRef = useRef<HTMLSpanElement | null>(null);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);
  const visitorLockedRef = useRef(false);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState<Industry>('i3');
  // The preview is a product proof, not an empty loading canvas. Keep a complete
  // starter site visible before the observer fires and while the loop rewinds;
  // autoplay then adds proof, contact and the finished state without reflow.
  const [stage, setStage] = useState<number>(STARTER_STAGE);
  const [progress, setProgress] = useState(STARTER_PROGRESS);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const player = createTimedStatePlayer({
      timing: WEB_BUILD_TIMING,
      onState: (nextStage: number) => setStage(nextStage),
    });
    let raf: number | null = null;

    const stop = () => {
      player.cancel();
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      setPlaying(false);
    };

    const reset = () => {
      stop();
      setStage(STARTER_STAGE);
      setProgress(STARTER_PROGRESS);
    };

    const showFinal = () => {
      stop();
      player.showFinal();
      setProgress(100);
    };

    const play = () => {
      stop();
      setPlaying(true);

      player.play();
      setProgress(STARTER_PROGRESS);

      const startedAt = performance.now();
      const tick = () => {
        const elapsed = performance.now() - startedAt;
        const nextProgress = Math.min(elapsed / WEB_BUILD_TIMING.cycleMs, 1);
        setProgress(
          Math.round(
            STARTER_PROGRESS + nextProgress * (100 - STARTER_PROGRESS),
          ),
        );
        if (nextProgress < 1) raf = requestAnimationFrame(tick);
        else raf = null;
      };
      raf = requestAnimationFrame(tick);
    };

    const controller = createDemoLoop({
      target,
      reducedMotion: Boolean(reduced),
      threshold: WEB_BUILD_OBSERVER_GEOMETRY.threshold,
      cycleMs: WEB_BUILD_TIMING.cycleMs,
      holdMs: WEB_BUILD_TIMING.holdMs,
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
  }, [reduced]);

  const preview = useMemo(() => buildPreview(industry, name), [industry, name]);
  const displayName = preview.fictional ? t('sampleName') : preview.businessName;
  const heading = joinAnimatedWords(t(preview.hero.titleKey));
  const words = heading.split(' ');
  const visibleStage = Math.max(stage, STARTER_STAGE);
  const at = (milliseconds: number) => visibleStage >= milliseconds;
  const finished = stage >= BUILD_STAGE.done;

  const handleNameChange = (nextName: string) => {
    visitorLockedRef.current = true;
    controllerRef.current?.takeControl();
    setName(nextName);
    setStage(BUILD_STAGE.done);
    setProgress(100);
  };

  const handleIndustryChange = (nextIndustry: Industry) => {
    visitorLockedRef.current = true;
    controllerRef.current?.takeControl();
    setIndustry(nextIndustry);
    setStage(BUILD_STAGE.done);
    setProgress(100);
  };

  const previewStyle = {
    '--preview-accent': preview.theme.accent,
    '--preview-soft': preview.theme.soft,
    '--preview-ink': preview.theme.ink,
    '--preview-surface': preview.theme.surface,
  } as CSSProperties;

  return (
    <SectionContainer className="py-16 md:py-24 lg:py-28">
      <div
        data-landing-demo="web-build-live"
        data-demo-id="web-build-live"
        data-demo-detail={stage}
        aria-live="off"
        className="relative min-w-0"
      >
        <span
          ref={observerRef}
          data-web-build-observer
          className="pointer-events-none absolute left-0 top-[40%] z-0 block w-full -translate-y-1/2"
          style={{ height: WEB_BUILD_OBSERVER_GEOMETRY.targetHeightPx }}
          aria-hidden="true"
        />
        <div className="relative z-[1] grid min-w-0 items-start gap-10 xl:grid-cols-[minmax(300px,380px)_minmax(0,1fr)] xl:gap-14">
          <div className="min-w-0 xl:sticky xl:top-24">
          <span className="text-[12px] tracking-wide text-[#667085]">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 max-w-xl text-balance font-display text-[30px] font-extrabold leading-[1.1] tracking-tight text-[#101828] md:text-[36px] md:leading-[1.12]">
            {t('heading')}
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4B5563]">
            {t('subtitle')}
          </p>

          <div className="mt-8 min-w-0 rounded-3xl bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_22px_50px_-38px_rgba(0,0,0,0.4)] sm:p-5">
            <label className="block min-w-0">
              <span className="mb-2 block text-[13px] font-semibold text-neutral-900/65">
                {t('namePlaceholder')}
              </span>
              <span className="relative block min-w-0">
                <Ico
                  name="solar:pen-2-bold-duotone"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]"
                />
                <input
                  value={name}
                  onChange={(event) => handleNameChange(event.target.value)}
                  placeholder={t('sampleName')}
                  className="h-12 w-full min-w-0 rounded-xl bg-[#fafafa] pl-12 pr-4 text-[15px] text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] outline-none transition-[box-shadow,background-color] duration-150 placeholder:text-[#667085] focus-visible:bg-white focus-visible:shadow-[0_0_0_2px_var(--brand)]"
                />
              </span>
            </label>

            <span className="mt-5 block text-[13px] font-semibold text-neutral-900/65">
              {t('industryLabel')}
            </span>
            <div className="mt-3 flex min-w-0 flex-wrap gap-2">
              {INDUSTRIES.map((item) => {
                const selected = item === industry;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleIndustryChange(item)}
                    aria-pressed={selected}
                    className={cn(
                      'min-h-11 rounded-full px-4 text-[13px] font-semibold',
                      'transition-[transform,background-color,box-shadow,color] duration-150 active:scale-[0.96]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
                      selected
                        ? 'bg-neutral-950 text-white'
                        : 'bg-[#fafafa] text-[#525252] shadow-[0_0_0_1px_rgba(0,0,0,0.07)] md:hover:bg-[#f1f1f1]',
                    )}
                  >
                    {t(item)}
                  </button>
                );
              })}
            </div>

            <div
              data-web-build-status
              className={cn(
                'mt-5 flex min-h-11 items-center gap-3 rounded-xl px-4 text-[13px] font-semibold transition-[background-color,color] duration-200 ease-out',
                playing
                  ? 'bg-[color-mix(in_srgb,var(--brand)_12%,white)] text-[var(--brand-ink)]'
                  : 'bg-[#F7F8FA] text-[#4B5563]',
              )}
              aria-live="off"
            >
              <Ico
                name={playing ? 'solar:settings-bold-duotone' : 'solar:check-circle-bold-duotone'}
                className={cn('h-5 w-5 shrink-0', playing && !reduced && 'animate-spin')}
              />
              <span className="min-w-0 flex-1 break-words">
                {playing ? t('building') : finished ? t('rebuild') : t('buildBtn')}
              </span>
              <span className="shrink-0 font-mono text-[12px] tabular-nums">{progress}%</span>
            </div>

            <button
              type="button"
              onClick={() => controllerRef.current?.replay()}
              aria-label={t('replay')}
              data-demo-replay
              style={{ minHeight: 48 }}
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-cta)] px-5 text-center text-[15px] font-bold text-white transition-[transform,filter] duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 md:hover:brightness-110"
            >
              <Ico
                name={playing ? 'solar:settings-bold-duotone' : 'solar:refresh-bold-duotone'}
                className={cn('h-5 w-5', playing && !reduced && 'animate-spin')}
              />
              {playing ? t('building') : finished ? t('rebuild') : t('buildBtn')}
            </button>
          </div>
        </div>

          <div className="min-w-0" style={previewStyle}>
          <div className="mb-3 flex min-w-0 flex-col items-start gap-2 px-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="flex min-w-0 items-center gap-2 text-[12px] font-semibold text-[#667085]">
              <Ico name="solar:monitor-bold-duotone" className="h-4 w-4" />
              <span>{t('previewLabel')}</span>
            </span>
            {preview.fictional && (
              <span className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full bg-neutral-900/[0.05] px-3 text-[11px] font-semibold text-[#5F6875]">
                <Ico name="solar:shield-check-bold-duotone" className="h-4 w-4" />
                {t('sampleBadge')}
              </span>
            )}
          </div>

          <div className="min-w-0 overflow-hidden rounded-[28px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_36px_80px_-48px_rgba(0,0,0,0.5)]">
            <div className="flex min-w-0 items-center gap-3 border-b border-neutral-900/[0.07] bg-[#f7f7f8] px-3 py-3 sm:px-5">
              <span className="hidden shrink-0 gap-1.5 sm:flex" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-900/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-900/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-900/10" />
              </span>
              <span className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg bg-white px-3 text-[11px] text-[#667085] shadow-[0_0_0_1px_rgba(0,0,0,0.05)] sm:text-[12px]">
                <Ico name="solar:global-bold-duotone" className="h-4 w-4 shrink-0" />
                <span className="min-w-0 break-all">{preview.domain}</span>
              </span>
            </div>

            <div className="min-w-0 bg-[var(--preview-surface)] p-3 sm:p-5 md:p-7">
              <StageChunk show={at(BUILD_STAGE.nav)} reduced={reduced}>
                <nav className="flex min-w-0 items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] sm:px-5">
                  <span className="min-w-0 break-words font-display text-[15px] font-extrabold tracking-tight text-[var(--preview-ink)]">
                    {displayName}
                  </span>
                  <span className="hidden shrink-0 items-center gap-5 text-[11px] font-medium text-[#667085] sm:flex">
                    <span>{t('nav1')}</span>
                    <span>{t('nav2')}</span>
                    <span>{t('nav3')}</span>
                  </span>
                </nav>
              </StageChunk>

              <div className="mt-3 grid min-w-0 gap-3 md:grid-cols-[minmax(0,1.08fr)_minmax(210px,0.92fr)] md:gap-4">
                <StageChunk show={at(BUILD_STAGE.hero)} reduced={reduced}>
                  <div className="flex h-full min-w-0 flex-col justify-between rounded-3xl bg-white p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] sm:p-7">
                    <div className="min-w-0">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--preview-soft)] text-[var(--preview-accent)]">
                        <Ico name={preview.hero.icon} className="h-6 w-6" />
                      </span>
                      <h3 className="mt-5 min-h-[91px] max-w-lg text-balance font-display text-[28px] font-extrabold leading-[1.08] tracking-tight text-[var(--preview-ink)] sm:min-h-[147px] sm:text-[34px] lg:min-h-[111px]">
                        {words.map((word, index) => (
                          <motion.span
                            key={`${word}-${index}`}
                            initial={reduced ? false : { opacity: 0, transform: 'translateY(9px)', filter: 'blur(4px)' }}
                            animate={{ opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' }}
                            transition={{ delay: reduced ? 0 : index * 0.07, duration: 0.28 }}
                            className="inline-block"
                          >
                            {word}{index < words.length - 1 ? ' ' : ''}
                          </motion.span>
                        ))}
                      </h3>
                      <p className="mt-3 max-w-lg text-pretty text-[13px] leading-relaxed text-[#667085] sm:text-[14px]">
                        {t(preview.hero.subtitleKey)}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex min-h-11 w-fit max-w-full items-center gap-2 rounded-full bg-[var(--preview-ink)] px-5 text-center text-[12px] font-bold text-white">
                      {t(preview.cta.labelKey)}
                      <Ico name={preview.cta.icon} className="h-4 w-4" />
                    </span>
                  </div>
                </StageChunk>

                <StageChunk show={at(BUILD_STAGE.visual)} reduced={reduced} delay={0.06}>
                  <PreviewVisual
                    visual={preview.hero.visual}
                    icon={preview.hero.icon}
                    services={preview.services.map((service: { labelKey: string }) => t(service.labelKey))}
                  />
                </StageChunk>
              </div>

              <StageChunk show={at(BUILD_STAGE.services)} reduced={reduced}>
                <section className="mt-3 min-w-0 rounded-3xl bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] sm:p-5">
                  <span className="text-[10px] font-bold tracking-[0.14em] text-[#667085]">
                    {t('servicesLabel')}
                  </span>
                  <div className="mt-3 grid min-w-0 gap-2 sm:grid-cols-3">
                    {preview.services.map((service: { labelKey: string; icon: string }) => (
                      <div
                        key={service.labelKey}
                        className="flex min-h-[76px] min-w-0 items-center gap-3 rounded-2xl bg-[var(--preview-soft)] px-4 py-3 text-[var(--preview-ink)]"
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/75 text-[var(--preview-accent)]">
                          <Ico name={service.icon} className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 text-[12px] font-bold leading-snug">
                          {t(service.labelKey)}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </StageChunk>

              <div className="mt-3 grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <StageChunk show={at(BUILD_STAGE.proof)} reduced={reduced}>
                  <div className="flex min-h-[119px] min-w-0 items-center gap-4 rounded-3xl bg-[var(--preview-ink)] p-5 text-white sm:min-h-[112px]">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[var(--preview-accent)]">
                      <Ico name={preview.proof.icon} className="h-6 w-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-medium text-white/50">
                        {t(preview.proof.labelKey)}
                      </span>
                      <span className="mt-1 block text-pretty text-[14px] font-bold leading-snug">
                        {t(preview.proof.valueKey)}
                      </span>
                    </span>
                  </div>
                </StageChunk>

                <StageChunk show={at(BUILD_STAGE.contact)} reduced={reduced} delay={0.06}>
                  <div className="flex min-h-[112px] min-w-0 flex-col justify-center rounded-3xl bg-white p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
                    <span className="text-[10px] font-bold tracking-[0.14em] text-[#667085]">
                      {t('contactLabel')}
                    </span>
                    <span className="mt-3 flex min-w-0 items-center gap-2 text-[12px] font-bold text-[var(--preview-ink)]">
                      <Ico name={preview.contact.icon} className="h-4 w-4 text-[var(--preview-accent)]" />
                      <span className="min-w-0 break-all">{preview.contact.phone}</span>
                    </span>
                    <span className="mt-2 flex min-w-0 items-center gap-2 text-[11px] text-[#667085]">
                      <Ico name="solar:global-bold-duotone" className="h-4 w-4 text-[var(--preview-accent)]" />
                      <span className="min-w-0 break-words">{t(preview.contact.addressKey)}</span>
                    </span>
                  </div>
                </StageChunk>
              </div>

              <StageChunk show={at(BUILD_STAGE.done)} reduced={reduced}>
                <div className="mt-3 flex min-w-0 flex-col gap-3 rounded-3xl bg-[var(--preview-ink)] p-4 text-white sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <span className="flex min-w-0 items-center gap-3">
                    <Ico name="solar:check-circle-bold-duotone" className="h-6 w-6 shrink-0" />
                    <span className="min-w-0 text-pretty text-[13px] font-bold leading-snug">
                      {t('ready')}
                    </span>
                  </span>
                  <span className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-[12px] font-bold text-[var(--preview-ink)]">
                    {t(preview.cta.labelKey)}
                    <Ico name={preview.cta.icon} className="h-4 w-4" />
                  </span>
                </div>
              </StageChunk>
            </div>
          </div>

          <div className="mt-4 min-w-0 rounded-2xl bg-white px-4 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] sm:px-5">
            <div className="flex min-w-0 items-center justify-between gap-3 text-[11px] font-semibold text-[#667085]">
              <span className="min-w-0 break-words">{t('progressLabel')}</span>
              <span className="shrink-0 tabular-nums text-neutral-900/65">{progress}%</span>
            </div>
            <div
              role="progressbar"
              aria-label={t('progressLabel')}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-900/[0.07]"
            >
              <motion.span
                className="block h-full w-full origin-left rounded-full bg-[var(--preview-accent)]"
                animate={{ transform: `scaleX(${progress / 100})` }}
                transition={{ duration: reduced ? 0 : 0.18, ease: 'easeOut' }}
              />
            </div>
          </div>
          <p data-demo-outcome className="mt-3 text-pretty text-[13px] font-semibold leading-relaxed text-[#4B5563]">
            {t('ready')}
          </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function StageChunk({
  show,
  reduced,
  delay = 0,
  children,
}: {
  show: boolean;
  reduced: boolean | null;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={
        show
          ? { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' }
          : { opacity: 0, transform: 'translateY(10px)', filter: 'blur(5px)' }
      }
      transition={{ delay: reduced ? 0 : delay, duration: reduced ? 0 : 0.28 }}
      className={cn('min-w-0', !show && 'pointer-events-none')}
      aria-hidden={!show}
    >
      {children}
    </motion.div>
  );
}

function PreviewVisual({
  visual,
  icon,
  services,
}: {
  visual: string;
  icon: string;
  services: string[];
}) {
  const shell = 'h-full min-h-[292px] min-w-0 overflow-hidden rounded-3xl bg-[var(--preview-soft)] p-4 text-[var(--preview-ink)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] sm:p-5 md:min-h-[248px]';

  if (visual === 'appointment-card') {
    return (
      <div className={shell}>
        <VisualTitle icon={icon} label={services[0]} />
        <div className="mt-5 grid grid-cols-2 gap-2">
          {['09:30', '11:00', '13:30', '16:00'].map((time, index) => (
            <span
              key={time}
              className={cn(
                'flex min-h-11 items-center justify-center rounded-xl bg-white text-[12px] font-bold',
                index === 1 && 'bg-[var(--preview-accent)] text-[var(--preview-ink)]',
              )}
            >
              {time}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/75 p-3 text-[11px] font-semibold">
          <Ico name="solar:user-check-rounded-bold-duotone" className="h-5 w-5 text-[var(--preview-accent)]" />
          <span className="min-w-0 break-words">{services[1]}</span>
        </div>
      </div>
    );
  }

  if (visual === 'menu-reservation') {
    return (
      <div className={shell}>
        <VisualTitle icon={icon} label={services[0]} />
        <div className="mt-4 space-y-2">
          {services.map((service, index) => (
            <div key={service} className="flex min-h-11 items-center justify-between gap-3 rounded-xl bg-white px-3">
              <span className="min-w-0 break-words text-[11px] font-bold">{service}</span>
              <span
                className="h-2 rounded-full bg-[var(--preview-accent)]/20"
                style={{ width: `${30 + index * 9}px` }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
        <div className="mt-3 h-11 rounded-xl bg-[var(--preview-accent)]" aria-hidden="true" />
      </div>
    );
  }

  if (visual === 'project-estimate') {
    return (
      <div className={shell}>
        <VisualTitle icon={icon} label={services[1]} />
        <div className="mt-4 rounded-2xl bg-white p-4">
          {[76, 52, 88].map((width, index) => (
            <div key={width} className={cn('flex items-center gap-3', index > 0 && 'mt-4')}>
              <Ico name="solar:check-circle-bold-duotone" className="h-5 w-5 text-[var(--preview-accent)]" />
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-900/[0.07]">
                <span
                  className="block h-full rounded-full bg-[var(--preview-accent)]"
                  style={{ width: `${width}%` }}
                />
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 break-words text-[11px] font-bold">{services[2]}</p>
      </div>
    );
  }

  if (visual === 'service-status') {
    const icons = ['solar:settings-bold-duotone', 'solar:bolt-bold-duotone', 'solar:check-circle-bold-duotone'];
    return (
      <div className={shell}>
        <VisualTitle icon={icon} label={services[0]} />
        <div className="mt-4 space-y-2">
          {services.map((service, index) => (
            <div key={service} className="flex min-h-[52px] items-center gap-3 rounded-xl bg-white px-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--preview-soft)] text-[var(--preview-accent)]">
                <Ico name={icons[index]} className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1 break-words text-[11px] font-bold">{service}</span>
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--preview-accent)]" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual === 'stylist-booking') {
    return (
      <div className={shell}>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--preview-accent)]">
            <Ico name="solar:user-check-rounded-bold-duotone" className="h-7 w-7" />
          </span>
          <span className="min-w-0">
            <span className="block break-words text-[12px] font-extrabold">{services[0]}</span>
            <span className="mt-1 block break-words text-[10px] text-[#667085]">{services[1]}</span>
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {services.map((service, index) => (
            <span key={service} className="flex aspect-square items-center justify-center rounded-xl bg-white text-[var(--preview-accent)]">
              <Ico
                name={index === 2 ? 'solar:camera-bold-duotone' : 'solar:gallery-bold-duotone'}
                className="h-6 w-6"
              />
            </span>
          ))}
        </div>
        <div className="mt-3 h-11 rounded-xl bg-[var(--preview-accent)]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={shell}>
      <VisualTitle icon={icon} label={services[0]} />
      <div className="relative mt-5 space-y-3 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:w-px before:bg-[var(--preview-accent)]/25">
        {services.map((service, index) => (
          <div key={service} className="relative flex min-h-11 items-center gap-3 rounded-xl bg-white px-3">
            <span className="relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--preview-accent)] text-white">
              <Ico
                name={index === 0 ? 'solar:global-bold-duotone' : index === 1 ? 'solar:camera-bold-duotone' : 'solar:calendar-mark-bold-duotone'}
                className="h-4 w-4"
              />
            </span>
            <span className="min-w-0 break-words text-[11px] font-bold">{service}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualTitle({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--preview-accent)]">
        <Ico name={icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0 break-words text-[12px] font-extrabold">{label}</span>
    </div>
  );
}
