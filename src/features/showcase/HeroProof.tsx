'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';

import { Ico } from '@/components/common/Ico';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';

import './hero-web-command.css';

const CYCLE_MS = 6_200;
const PHASE_DELAYS = [650, 1_850, 3_150, 4_700] as const;
const FINAL_PHASE = 4;

type DemoController = ReturnType<typeof createDemoLoop>;

export function HeroProof(): React.ReactElement {
  const t = useTranslations('product.heroStory');
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [manualRequest, setManualRequest] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<DemoController | null>(null);
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const stop = useCallback((): void => {
    for (const timer of timersRef.current) clearTimeout(timer);
    timersRef.current = [];
  }, []);

  const reset = useCallback((): void => {
    stop();
    setManualRequest(null);
    setPhase(0);
  }, [stop]);

  const play = useCallback((): void => {
    reset();
    timersRef.current = PHASE_DELAYS.map((delay, index) => (
      setTimeout(() => setPhase(index + 1), delay)
    ));
  }, [reset]);

  const showFinal = useCallback((): void => {
    stop();
    setPhase(FINAL_PHASE);
  }, [stop]);

  useEffect(() => {
    const target = rootRef.current;
    if (!target) return undefined;

    const controller = createDemoLoop({
      target,
      reducedMotion: Boolean(reducedMotion),
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
      stop();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [play, reducedMotion, reset, showFinal, stop]);

  const priceUpdated = phase >= 2;
  const categoryAdded = phase >= FINAL_PHASE;
  const processing = phase === 1 || phase === 3;
  const currentRequest = phase >= 2 ? t('requestCategory') : t('requestPrice');
  const visibleRequest = manualRequest ?? currentRequest;
  const status = phase === 0
    ? t('statusReady')
    : phase === 1
      ? t('statusPrice')
      : phase === 2
        ? t('statusPriceDone')
        : phase === 3
          ? t('statusCategory')
          : t('statusComplete');

  const runVisibleCommand = (): void => {
    controllerRef.current?.takeControl();
    stop();

    const normalizedRequest = visibleRequest.toLocaleLowerCase();
    const categoryIntent = normalizedRequest.includes(t('menuSale').toLocaleLowerCase());
    const workingPhase = categoryIntent ? 3 : 1;
    const completePhase = categoryIntent ? FINAL_PHASE : 2;

    setManualRequest(null);
    setPhase(workingPhase);
    timersRef.current = [
      setTimeout(() => setPhase(completePhase), 900),
    ];
  };

  return (
    <div
      ref={rootRef}
      className="web-command-demo"
      data-hero-demo="true"
      data-landing-demo="true"
      data-demo-id="aiweb-hero-story"
      data-demo-detail={`phase-${phase}`}
      aria-live="off"
    >
      <div className="web-command-head">
        <span className="web-command-badge">
          <span className="web-command-live-dot" aria-hidden="true" />
          {t('badge')}
        </span>
        <span className="web-command-product">
          <Ico name="solar:global-bold-duotone" className="h-4 w-4" />
          aiWEB
        </span>
      </div>

      <form
        className="web-command-composer"
        onSubmit={(event) => {
          event.preventDefault();
          runVisibleCommand();
        }}
      >
        <span className="web-command-composer-icon" aria-hidden="true">
          <Ico name="solar:chat-round-dots-bold-duotone" className="h-[18px] w-[18px]" />
        </span>
        <span className="web-command-input">
          <span className="web-command-input-label">{t('inputLabel')}</span>
          <textarea
            key={currentRequest}
            className="web-command-request"
            value={visibleRequest}
            rows={2}
            aria-label={t('inputLabel')}
            onFocus={() => controllerRef.current?.takeControl()}
            onChange={(event) => {
              controllerRef.current?.takeControl();
              setManualRequest(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
          />
        </span>
        <button
          type="submit"
          className="web-command-send"
          aria-label={t('send')}
        >
          <Ico name="solar:arrow-right-bold-duotone" className="h-[18px] w-[18px]" />
        </button>
      </form>

      <div className="web-command-status" data-processing={processing ? 'true' : 'false'}>
        <span className="web-command-status-icon" aria-hidden="true">
          <Ico
            name={processing ? 'solar:refresh-bold-duotone' : 'solar:check-circle-bold-duotone'}
            className="h-[17px] w-[17px]"
          />
        </span>
        <span className="web-command-status-copy">
          <strong>{status}</strong>
          <small>{t('statusNote')}</small>
        </span>
      </div>

      <div className="web-command-browser" aria-label={t('previewLabel')}>
        <div className="web-command-browser-bar">
          <span className="web-command-window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="web-command-url">
            <Ico name="solar:global-bold-duotone" className="h-3.5 w-3.5" />
            {t('url')}
          </span>
          <span
            className="web-command-saved"
            data-visible={categoryAdded ? 'true' : 'false'}
          >
            <Ico name="solar:check-circle-bold-duotone" className="h-3.5 w-3.5" />
            {t('saved')}
          </span>
        </div>

        <div className="web-command-site">
          <div className="web-command-site-nav">
            <strong>{t('storeName')}</strong>
            <nav aria-label={t('menuLabel')}>
              <span>{t('menuHome')}</span>
              <span>{t('menuProducts')}</span>
              <span
                className="web-command-new-category"
                data-visible={categoryAdded ? 'true' : 'false'}
              >
                {t('menuSale')}
              </span>
            </nav>
          </div>

          <div className="web-command-product-card">
            <div className="web-command-product-visual" aria-hidden="true">
              <Image
                src="/images/web-demo/moisturizer-product.webp"
                alt=""
                fill
                preload
                sizes="(max-width: 350px) 72px, (max-width: 640px) 82px, 140px"
                className="web-command-product-photo"
              />
            </div>

            <div className="web-command-product-copy">
              <span className="web-command-kicker">{t('productKicker')}</span>
              <strong>{t('productName')}</strong>
              <p>{t('productDescription')}</p>
              <div className="web-command-price-row">
                <span
                  className="web-command-old-price"
                  data-visible={priceUpdated ? 'true' : 'false'}
                >
                  {t('priceBefore')}
                </span>
                <span
                  className="web-command-price"
                  data-updated={priceUpdated ? 'true' : 'false'}
                >
                  {priceUpdated ? t('priceAfter') : t('priceBefore')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="web-command-foot">
        <span className="web-command-result" data-visible={phase >= 2 ? 'true' : 'false'}>
          <Ico name="solar:check-circle-bold-duotone" className="h-4 w-4" />
          {categoryAdded ? t('resultComplete') : t('resultPrice')}
        </span>
        <button
          type="button"
          className="web-command-replay"
          onClick={() => controllerRef.current?.replay()}
          data-demo-replay="true"
        >
          <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
          {t('replay')}
        </button>
      </div>
    </div>
  );
}
