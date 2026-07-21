'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';
import { cn } from '@/lib/utils';
import {
  MOBILE_LEAD_STAGES,
  createTimelinePlayer,
  mobileLeadFrame,
} from './web-demo-models.mjs';

const STEP_KEYS = ['visitor', 'selected', 'formSent', 'leadCreated'] as const;
const CYCLE_MS = 7_200;

export function WebMobileLead() {
  const t = useTranslations('product.mobileLead');
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<string>(MOBILE_LEAD_STAGES[0]);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const player = createTimelinePlayer({
      stages: MOBILE_LEAD_STAGES,
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

  const frame = mobileLeadFrame(stage);
  const activeIndex = MOBILE_LEAD_STAGES.indexOf(stage);

  return (
    <SectionContainer className="py-16 md:py-24 lg:py-28">
      <div
        ref={sectionRef}
        data-landing-demo="web-mobile-lead"
        data-demo-id="web-mobile-lead"
        data-demo-detail={stage}
        aria-live="off"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="text-[12px] tracking-wide text-[#667085]">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-balance font-display text-[30px] font-extrabold leading-[1.1] tracking-tight text-[#101828] md:text-[36px] md:leading-[1.12]">
            {t('heading')}
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4B5563]">
            {t('subtitle')}
          </p>
        </div>
        <button
          type="button"
          onClick={() => controllerRef.current?.replay()}
          data-demo-replay
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.12)] transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
        >
          <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
          {t('replay')}
        </button>
        </div>

        <div
          className="mt-10 min-w-0 overflow-hidden rounded-3xl p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-7"
          style={{ background: 'color-mix(in srgb, var(--brand) 8%, white)' }}
        >
        <ol className="grid grid-cols-4 gap-2" aria-label={t('heading')}>
          {MOBILE_LEAD_STAGES.map((item, index) => (
            <li
              key={item}
              aria-current={item === stage ? 'step' : undefined}
              className="min-w-0 text-center"
            >
              <span
                className={cn(
                  'mx-auto block h-2.5 w-2.5 rounded-full transition-colors duration-200',
                  index <= activeIndex ? 'bg-[var(--brand)]' : 'bg-neutral-900/15',
                )}
              />
              <span className={cn('mt-2 block break-words text-[10px] leading-tight md:text-[11px]', item === stage ? 'font-semibold text-neutral-900' : 'text-[#667085]')}>
                {t(STEP_KEYS[index])}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-7 grid items-center gap-4 md:grid-cols-[minmax(220px,300px)_80px_minmax(260px,1fr)] md:justify-center">
          <div className="mx-auto w-full max-w-[300px] rounded-[2rem] bg-[#0e0e11] p-2 shadow-[0_20px_44px_-28px_rgba(0,0,0,0.5)]">
            <div className="rounded-[1.55rem] bg-white p-5">
              <div className="mx-auto h-1.5 w-14 rounded-full bg-neutral-900/15" aria-hidden="true" />
              <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold text-[#667085]">
                <Ico name="solar:smartphone-bold-duotone" className="h-4 w-4" />
                {t('visitor')}
              </div>
              <div className={cn('mt-5 rounded-2xl p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-colors duration-300', frame.serviceSelected && 'bg-[var(--brand)]/10 shadow-[0_0_0_2px_var(--brand)]')}>
                <span className="text-[13px] font-bold text-neutral-900">{t('service')}</span>
                <span className="mt-3 block min-h-[17px]">
                  <motion.span
                    aria-hidden={!frame.serviceSelected}
                    initial={false}
                    animate={{
                      opacity: frame.serviceSelected ? 1 : 0,
                      transform: frame.serviceSelected ? 'translateY(0)' : 'translateY(5px)',
                    }}
                    transition={{ duration: reduced ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="flex items-center gap-2 text-[11px] font-semibold text-neutral-900/65"
                  >
                    <Ico name="solar:check-circle-bold-duotone" className="h-3.5 w-3.5" />
                    {t('selected')}
                  </motion.span>
                </span>
              </div>
              <div className="mt-4 rounded-xl bg-[#fafafa] px-4 py-3 text-[12px] tabular-nums text-[#667085]">
                {frame.phone}
              </div>
              <div className={cn('mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full text-[12px] font-bold transition-colors duration-300', frame.formStatus === 'sent' ? 'bg-[#0e0e11] text-white' : 'bg-neutral-900/[0.07] text-[#4B5563]')}>
                <Ico name="solar:arrow-right-bold-duotone" className="h-3.5 w-3.5" />
                {t('formSent')}
              </div>
              <p className="mt-4 text-center text-[10px] leading-relaxed text-[#667085]">{t('fictional')}</p>
            </div>
          </div>

          <div className="relative flex h-14 items-center justify-center md:h-28" aria-hidden="true">
            <span className="absolute h-full w-px bg-neutral-900/10 md:h-px md:w-full" />
            {frame.formStatus === 'sent' && (
              <motion.span
                key={`transfer-${stage}`}
                initial={reduced ? false : { transform: 'translateY(-20px)', opacity: 0 }}
                animate={{ transform: 'translateY(0)', opacity: 1 }}
                className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-[#0e0e11] shadow-[0_0_18px_color-mix(in_srgb,var(--brand)_65%,transparent)]"
              >
                <Ico name="solar:arrow-down-bold-duotone" className="h-[17px] w-[17px] md:hidden" />
                <Ico name="solar:arrow-right-bold-duotone" className="hidden h-[17px] w-[17px] md:block" />
              </motion.span>
            )}
          </div>

          <div className="min-h-[285px] rounded-2xl bg-[#0e0e11] p-5 text-white shadow-[0_20px_44px_-30px_rgba(0,0,0,0.55)] md:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-white/65">
                <Ico name="solar:chat-round-dots-bold-duotone" className="h-4 w-4" />
                {t('ownerInbox')}
              </span>
              <span className={cn('flex h-8 w-8 items-center justify-center rounded-full', frame.ownerInbox === 'new-lead' ? 'bg-[var(--brand)] text-[#0e0e11]' : 'bg-white/[0.06] text-[#A3A3A3]')}>
                <Ico name="solar:user-plus-rounded-bold-duotone" className="h-3.5 w-3.5" />
              </span>
            </div>
            <div className="relative mt-5 min-h-[168px]" aria-live="off">
              <motion.div
                aria-hidden={frame.ownerInbox !== 'new-lead'}
                initial={false}
                animate={{
                  opacity: frame.ownerInbox === 'new-lead' ? 1 : 0,
                  transform: frame.ownerInbox === 'new-lead' ? 'translateY(0)' : 'translateY(10px)',
                }}
                transition={{ duration: reduced ? 0 : 0.24, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 rounded-2xl bg-white p-5 text-neutral-900"
              >
                <span className="flex items-center gap-2 text-[12px] font-bold text-[var(--brand-ink)]">
                  <Ico name="solar:check-circle-bold-duotone" className="h-3.5 w-3.5" />
                  {t('leadCreated')}
                </span>
                <p className="mt-4 text-[14px] font-bold">{t('service')}</p>
                <p className="mt-2 text-[12px] tabular-nums text-[#667085]">{frame.phone}</p>
                <p className="mt-5 border-t border-neutral-900/[0.07] pt-4 text-[13px] font-semibold leading-relaxed">{t('outcome')}</p>
              </motion.div>
              <motion.div
                aria-hidden="true"
                initial={false}
                animate={{ opacity: frame.ownerInbox === 'new-lead' ? 0 : 1 }}
                transition={{ duration: reduced ? 0 : 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 space-y-3"
              >
                {[0, 1, 2].map((item) => (
                  <span key={item} className="block h-12 rounded-xl bg-white/[0.045]" />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        <p data-demo-outcome className="mt-6 text-pretty text-[13px] font-semibold leading-relaxed text-[#4B5563]">
          {t('outcome')}
        </p>
        </div>
      </div>
    </SectionContainer>
  );
}
