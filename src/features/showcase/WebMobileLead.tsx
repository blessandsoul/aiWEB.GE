'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Bell, Check, Inbox, RotateCcw, Send, Smartphone } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';
import {
  MOBILE_LEAD_STAGES,
  createTimelinePlayer,
  mobileLeadFrame,
} from './web-demo-models.mjs';
import { startTimelineWhenVisible } from './web-demo-visibility.mjs';

const STEP_KEYS = ['visitor', 'selected', 'formSent', 'leadCreated'] as const;

export function WebMobileLead() {
  const t = useTranslations('product.mobileLead');
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<string>(MOBILE_LEAD_STAGES[0]);
  const playerRef = useRef<{ replay: () => void; cancel: () => void } | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const player = createTimelinePlayer({
      stages: MOBILE_LEAD_STAGES,
      reducedMotion: Boolean(reduced),
      onStage: (nextStage: string) => setStage(nextStage),
    });

    playerRef.current = player;
    const stopVisibility = startTimelineWhenVisible({
      node: sectionRef.current,
      reducedMotion: Boolean(reduced),
      play: player.play,
    });

    return () => {
      stopVisibility();
      player.cancel();
      if (playerRef.current === player) playerRef.current = null;
    };
  }, [reduced]);

  const frame = mobileLeadFrame(stage);
  const activeIndex = MOBILE_LEAD_STAGES.indexOf(stage);

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">
            {t('heading')}
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#525252]">
            {t('subtitle')}
          </p>
        </div>
        <button
          type="button"
          onClick={() => playerRef.current?.replay()}
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.12)] transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
        >
          <RotateCcw size={15} aria-hidden="true" />
          {t('replay')}
        </button>
      </div>

      <div
        ref={sectionRef}
        className="mt-10 overflow-hidden rounded-3xl p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-7"
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
              <span className={cn('mt-2 line-clamp-2 text-[10px] leading-tight md:text-[11px]', item === stage ? 'font-semibold text-neutral-900' : 'text-neutral-900/35')}>
                {t(STEP_KEYS[index])}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-7 grid items-center gap-4 md:grid-cols-[minmax(220px,300px)_80px_minmax(260px,1fr)] md:justify-center">
          <div className="mx-auto w-full max-w-[300px] rounded-[2rem] bg-[#0e0e11] p-2 shadow-[0_20px_44px_-28px_rgba(0,0,0,0.5)]">
            <div className="rounded-[1.55rem] bg-white p-5">
              <div className="mx-auto h-1.5 w-14 rounded-full bg-neutral-900/15" aria-hidden="true" />
              <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold text-neutral-900/55">
                <Smartphone size={15} aria-hidden="true" />
                {t('visitor')}
              </div>
              <div className={cn('mt-5 rounded-2xl p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-colors duration-300', frame.serviceSelected && 'bg-[var(--brand)]/10 shadow-[0_0_0_2px_var(--brand)]')}>
                <span className="text-[13px] font-bold text-neutral-900">{t('service')}</span>
                {frame.serviceSelected && (
                  <motion.span initial={reduced ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-neutral-900/65">
                    <Check size={13} aria-hidden="true" />
                    {t('selected')}
                  </motion.span>
                )}
              </div>
              <div className="mt-4 rounded-xl bg-[#fafafa] px-4 py-3 text-[12px] tabular-nums text-neutral-900/50">
                {frame.phone}
              </div>
              <div className={cn('mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full text-[12px] font-bold transition-colors duration-300', frame.formStatus === 'sent' ? 'bg-[#0e0e11] text-white' : 'bg-neutral-900/[0.07] text-neutral-900/35')}>
                <Send size={14} aria-hidden="true" />
                {t('formSent')}
              </div>
              <p className="mt-4 text-center text-[10px] leading-relaxed text-neutral-900/35">{t('fictional')}</p>
            </div>
          </div>

          <div className="relative flex h-14 items-center justify-center md:h-28" aria-hidden="true">
            <span className="absolute h-full w-px bg-neutral-900/10 md:h-px md:w-full" />
            {frame.formStatus === 'sent' && (
              <motion.span
                key={`transfer-${stage}`}
                initial={reduced ? false : { y: -20, x: 0, opacity: 0 }}
                animate={{ y: 0, x: 0, opacity: 1 }}
                className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-[#0e0e11] shadow-[0_0_18px_color-mix(in_srgb,var(--brand)_65%,transparent)]"
              >
                <ArrowDown className="md:hidden" size={17} />
                <ArrowRight className="hidden md:block" size={17} />
              </motion.span>
            )}
          </div>

          <div className="min-h-[285px] rounded-2xl bg-[#0e0e11] p-5 text-white shadow-[0_20px_44px_-30px_rgba(0,0,0,0.55)] md:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-white/65">
                <Inbox size={16} aria-hidden="true" />
                {t('ownerInbox')}
              </span>
              <span className={cn('flex h-8 w-8 items-center justify-center rounded-full', frame.ownerInbox === 'new-lead' ? 'bg-[var(--brand)] text-[#0e0e11]' : 'bg-white/[0.06] text-white/30')}>
                <Bell size={14} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-5" aria-live="polite">
              <AnimatePresence mode="wait">
                {frame.ownerInbox === 'new-lead' ? (
                  <motion.div
                    key="lead"
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-white p-5 text-neutral-900"
                  >
                    <span className="flex items-center gap-2 text-[12px] font-bold text-[var(--brand-ink)]">
                      <Check size={14} aria-hidden="true" />
                      {t('leadCreated')}
                    </span>
                    <p className="mt-4 text-[14px] font-bold">{t('service')}</p>
                    <p className="mt-2 text-[12px] tabular-nums text-neutral-900/45">{frame.phone}</p>
                    <p className="mt-5 border-t border-neutral-900/[0.07] pt-4 text-[13px] font-semibold leading-relaxed">{t('outcome')}</p>
                  </motion.div>
                ) : (
                  <motion.div key="empty" exit={{ opacity: 0 }} className="space-y-3" aria-hidden="true">
                    {[0, 1, 2].map((item) => (
                      <span key={item} className="block h-12 rounded-xl bg-white/[0.045]" />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
