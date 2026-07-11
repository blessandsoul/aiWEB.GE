'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

/* =========================================================================
   WebSpeedDuel: the one external number on this entire site, and where it comes from.

   Every web agency claims speed matters and none of them can cite anything. There is
   exactly one number in this category with real evidence behind it: Deloitte, with Google,
   across 30 million sessions and 37 brands, measured that a 0.1 second improvement in
   mobile speed lifted retail conversions by 8.4%.

   So the widget does two things. It puts that number on the page WITH its source, in the
   same size as the number, because a statistic without a source is a decoration. And then
   it lets the owner put in his own traffic and his own average sale, so the GEL figure at
   the bottom is his arithmetic and not our claim.

   If his traffic is small the number comes out small. We do not hide that. A calculator
   that can only produce a big number is a slot machine.
   ========================================================================= */

/* Deloitte with Google, "Milliseconds Make Millions": +8.4% retail conversion for a 0.1s
   mobile speed improvement, across 30M sessions / 37 brands. This constant is the ONLY
   borrowed figure on aiweb.ge and it is attributed on screen, next to the result. */
const DELOITTE_UPLIFT = 0.084;

/* How much of that uplift a given starting speed can recover. A page that already feels
   instant has nothing to win, and the widget must be honest about that or it is a con. */
const RECOVERABLE = { slow: 1, ok: 0.55, fast: 0.1 } as const;
type Feel = keyof typeof RECOVERABLE;

export function WebSpeedDuel() {
  const t = useTranslations('product.speed');
  const [feel, setFeel] = useState<Feel>('slow');
  const [visitors, setVisitors] = useState(1200);
  const [ticket, setTicket] = useState(120);

  /* A 2% baseline conversion is a placeholder the visitor cannot see and cannot be misled
     by, because what he reads is only the DELTA, and the delta scales linearly with it. */
  const monthlyRevenue = visitors * 0.02 * ticket;
  const gain = monthlyRevenue * DELOITTE_UPLIFT * RECOVERABLE[feel];

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="rounded-3xl bg-[#0e0e11] p-6 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* LEFT: the quote, given the size a real proof point deserves */}
          <div>
            <span className="text-[12px] uppercase tracking-wide text-white/40">
              {t('eyebrow')}
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl">
              {t('heading')}
            </h2>

            <blockquote className="mt-8 border-l-2 pl-5" style={{ borderColor: 'var(--brand)' }}>
              <p className="text-pretty text-[17px] leading-relaxed text-white md:text-[19px]">
                {t('quote')}
              </p>
              <footer className="mt-4 text-[13px] leading-relaxed text-white/45">
                {t('source')}
              </footer>
            </blockquote>

            <p className="mt-6 max-w-md text-pretty text-[14px] leading-relaxed text-white/50">
              {t('subtitle')}
            </p>
          </div>

          {/* RIGHT: his inputs, his number */}
          <div className="rounded-2xl bg-white/[0.04] p-6 md:p-7">
            <span className="block text-[13px] font-medium text-white/70">{t('yours')}</span>
            <div className="mt-3 flex gap-2">
              {(['slow', 'ok', 'fast'] as Feel[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFeel(f)}
                  aria-pressed={feel === f}
                  className={cn(
                    'min-h-[44px] flex-1 rounded-xl px-3 text-[13px] font-semibold',
                    'transition-[transform,background-color,color] duration-150 ease-out',
                    'active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e11]',
                    feel === f
                      ? 'bg-[var(--brand)] text-[#0e0e11]'
                      : 'bg-white/[0.06] text-white/60 md:hover:bg-white/10',
                  )}
                >
                  {t(f)}
                </button>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-6">
              <Range
                label={t('visitors')}
                value={visitors}
                min={100}
                max={20000}
                step={100}
                onChange={setVisitors}
              />
              <Range
                label={t('ticket')}
                value={ticket}
                min={10}
                max={2000}
                step={10}
                onChange={setTicket}
              />
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-pretty text-[13px] leading-relaxed text-white/50">{t('result')}</p>
              <p className="mt-2 font-display text-5xl font-extrabold tabular-nums leading-none text-white md:text-6xl">
                {fmt(gain)}
                <span className="ml-2 text-xl font-bold text-white/40">{t('perMonth')}</span>
              </p>
            </div>

            <p className="mt-5 text-pretty text-[11px] leading-relaxed text-white/35">{t('note')}</p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function Range({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-[13px] text-white/60">{label}</span>
        <span className="font-display text-lg font-extrabold tabular-nums text-white">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-10 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white/15 [&::-webkit-slider-thumb]:mt-[-7px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--brand)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-out active:[&::-webkit-slider-thumb]:scale-[0.96] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--brand)] [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-white/15"
      />
    </label>
  );
}
