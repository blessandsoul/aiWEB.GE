"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { AiNowSectionFrame } from "./AiNowSectionFrame";
import { AiNowImage } from "./AiNowImage";
import { AiNowDisclosure } from "./AiNowDisclosure";

type RadarModel = {
  readonly name: string;
  readonly lab: string;
};

type Provider = {
  readonly lab: string;
  readonly mark: string | null;
  readonly wordmark: string;
  readonly tone: string;
};

const providers: readonly Provider[] = [
  { lab: "Brief", mark: null, wordmark: "Brief", tone: "openai" },
  { lab: "Pages", mark: null, wordmark: "Pages", tone: "anthropic" },
  { lab: "Review", mark: null, wordmark: "Review", tone: "google" },
  { lab: "Care", mark: null, wordmark: "Care", tone: "xai" },
  { lab: "Content", mark: null, wordmark: "Content", tone: "mistral" },
  { lab: "Mobile", mark: null, wordmark: "Mobile", tone: "deepseek" },
  { lab: "Forms", mark: null, wordmark: "Forms", tone: "meta" },
  { lab: "Launch", mark: null, wordmark: "Launch", tone: "qwen" },
  { lab: "SEO", mark: null, wordmark: "SEO", tone: "cohere" },
  { lab: "Integrations", mark: null, wordmark: "Integrations", tone: "zai" },
  { lab: "Ownership", mark: null, wordmark: "Ownership", tone: "kimi" },
];

const AIWEB_PROVIDER_FUNCTIONS = {
  ka: { Brief: "ბრიფი", Pages: "გვერდები", Review: "გადახედვა", Care: "მოვლა", Content: "კონტენტი", Mobile: "მობილური", Forms: "ფორმები", Launch: "გაშვება", SEO: "ტექნიკური SEO", Integrations: "ინტეგრაციები", Ownership: "ჩაბარება" },
  en: { Brief: "Brief", Pages: "Pages", Review: "Review", Care: "Care", Content: "Content", Mobile: "Mobile", Forms: "Forms", Launch: "Launch", SEO: "Technical SEO", Integrations: "Integrations", Ownership: "Handover" },
  ru: { Brief: "Бриф", Pages: "Страницы", Review: "Проверка", Care: "Поддержка", Content: "Контент", Mobile: "Мобильная версия", Forms: "Формы", Launch: "Запуск", SEO: "Технический SEO", Integrations: "Интеграции", Ownership: "Передача" },
} as const;

const copyByLocale = {
  ka: {
    eyebrow: "ნახეთ სამუშაო ვერსია",
    title: "გამოქვეყნებამდე ნახეთ, როგორ მუშაობს თქვენი საიტი.",
    description: "ვამოწმებთ გვერდებს, ფორმებსა და მობილურ ვერსიას. სამუშაო ვერსიას თქვენც ნახავთ.",
    radar: "საიტზე მუშაობის ძირითადი მიმართულებები",
    moreTechnologies: "დამატებითი დეტალები",
    jevKicker: "თქვენი გადახედვა",
    jevTitle: "გამოქვეყნებამდე",
    jevDescription: "გამოქვეყნებამდე ცვლილებებს თქვენთან შევათანხმებთ. საძიებო შედეგებში პოზიცია და გაყიდვები გარანტირებული არ არის.",
    trustLabel: "ბრიფი, ხარისხი და თანხმობა",
    brand: { established: "aiWEB · aiNOW", title: "ბრიფი. აწყობა. გადახედვა.", location: "თბილისი / aiNOW-ის გუნდი", language: "თქვენი ინფორმაცია. საიტის შექმნა და მოვლა." },
    trust: [
      { value: "ბრიფი", label: "ბიზნესის მიზანი და მოქმედება", detail: "საიტი იწყება იმ მოქმედებით, რომელიც კლიენტმა უნდა შეასრულოს.", image: "/images/aiweb/hero-website-workflow-v1.png" },
      { value: "გვერდები", label: "სტრუქტურა და ტექსტი", detail: "სერვისები, ფასები, ფოტოები და საკონტაქტო ინფორმაცია შეთანხმებულ შინაარსს შეესაბამება.", image: "/images/aiweb/pages-content-v1.png" },
      { value: "გადახედვა", label: "რეალური ეკრანები", detail: "მობილური და დესკტოპის სამუშაო ვერსიები გაშვებამდე მოწმდება.", image: "/images/aiweb/review-mobile-desktop-v1.png" },
      { value: "მოვლა", label: "შეთანხმებული განახლებები", detail: "მცირე ცვლილებები და შემოწმებები შეთანხმებული მოვლის ფარგლებში სრულდება.", image: "/images/aiweb/care-backup-v1.png" },
    ],
  },
  en: {
    eyebrow: "See the working version",
    title: "See your website before it goes live.",
    description: "We check the pages, forms and mobile layout. You review the working version before publication.",
    radar: "The main areas of work on your website",
    moreTechnologies: "More detail",
    jevKicker: "Your review",
    jevTitle: "Before publication",
    jevDescription: "We agree on changes with you before publishing. Search rankings and sales are not guaranteed.",
    trustLabel: "Brief, quality and approval",
    brand: { established: "aiWEB · aiNOW", title: "BRIEF. BUILD. REVIEW.", location: "Tbilisi / aiNOW team", language: "Your information. Website creation and care." },
    trust: [
      { value: "Brief", label: "Business goal and action", detail: "The site starts from the action the customer should take.", image: "/images/aiweb/hero-website-workflow-v1.png" },
      { value: "Pages", label: "Structure and content", detail: "Services, prices, visuals and contact details stay within the agreed scope.", image: "/images/aiweb/pages-content-v1.png" },
      { value: "Review", label: "Real screens", detail: "The working mobile and desktop versions are checked before launch.", image: "/images/aiweb/review-mobile-desktop-v1.png" },
      { value: "Care", label: "Agreed updates", detail: "Small changes and checks stay within the agreed care scope.", image: "/images/aiweb/care-backup-v1.png" },
    ],
  },
  ru: {
    eyebrow: "Сначала рабочая версия",
    title: "Посмотрите, как работает ваш сайт, до публикации.",
    description: "Проверяем страницы, формы и мобильную версию. Вы сможете посмотреть рабочую версию сайта.",
    radar: "Что входит в работу над сайтом",
    moreTechnologies: "Подробнее",
    jevKicker: "Ваша проверка",
    jevTitle: "До публикации",
    jevDescription: "Изменения согласуем до публикации. Позиции в поиске и продажи не гарантируются.",
    trustLabel: "Бриф, качество и утверждение",
    brand: { established: "aiWEB · aiNOW", title: "БРИФ. СБОРКА. ПРОВЕРКА.", location: "Тбилиси / команда aiNOW", language: "Ваша информация. Создание и поддержка сайта." },
    trust: [
      { value: "Бриф", label: "Цель бизнеса и действие", detail: "Сайт начинается с действия, которое должен совершить клиент.", image: "/images/aiweb/hero-website-workflow-v1.png" },
      { value: "Страницы", label: "Структура и контент", detail: "Услуги, цены, фотографии и контактные данные соответствуют согласованному содержанию.", image: "/images/aiweb/pages-content-v1.png" },
      { value: "Проверка", label: "Реальные экраны", detail: "Рабочие версии сайта для мобильных устройств и компьютера проверяются до запуска.", image: "/images/aiweb/review-mobile-desktop-v1.png" },
      { value: "Поддержка", label: "Согласованные обновления", detail: "Небольшие изменения и проверки выполняются в рамках согласованного объёма поддержки.", image: "/images/aiweb/care-backup-v1.png" },
    ],
  },
} as const;

function getCopy(locale: string) {
  if (locale === "en" || locale === "ru") return copyByLocale[locale];
  if (["de", "tr", "fa", "zh"].includes(locale)) return copyByLocale.en;
  return copyByLocale.ka;
}

export function AiNowModelProof() {
  const locale = useLocale();
  const copy = getCopy(locale);
  const functions = AIWEB_PROVIDER_FUNCTIONS[locale === "ka" || locale === "ru" ? locale : "en"];

  const modelNames = useMemo(() => {
    return (provider: Provider) => functions[provider.lab as keyof typeof functions] ?? provider.wordmark;
  }, [functions]);

  const renderProvider = (provider: Provider) => (
    <div className={`ainow-model-stage__provider ainow-model-stage__provider--${provider.tone}`} key={provider.lab} title={`${provider.wordmark}: ${modelNames(provider)}`}>
      <span className="ainow-model-stage__provider-mark" aria-hidden="true">
        {provider.mark ? (
          <AiNowImage
            src={provider.mark}
            alt=""
            width={18}
            height={18}
            frameClassName="inline-flex size-[18px]"
            className="size-full object-contain"
            unoptimized
          />
        ) : (
          <span className="ainow-model-stage__wordmark">{provider.wordmark.slice(0, 1)}</span>
        )}
      </span>
      <span className="ainow-model-stage__provider-copy">
        <span className="ainow-model-stage__provider-lab">{provider.wordmark}</span>
        <span className="ainow-model-stage__provider-model">{modelNames(provider)}</span>
      </span>
    </div>
  );

  return (
    <AiNowSectionFrame
      id="model-architecture"
      hasLaser={false}
      showTicks={false}
      containerClassName="px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
    >
      <section className="ainow-model-stage" aria-labelledby="ainow-model-stage-title">
        <div className="ainow-model-stage__intro">
          <div className="ainow-model-stage__eyebrow">
            <span className="ainow-model-stage__status" aria-hidden="true" />
            <span>{copy.eyebrow}</span>
          </div>
          <h2 id="ainow-model-stage-title">{copy.title}</h2>
          <p>{copy.description}</p>
        </div>

        <div
          className="ainow-model-stage__decision ainow-model-stage__visual-card"
        >
          <AiNowImage
            className="ainow-model-stage__decision-image"
            src="/images/aiweb/decision-approval-v1.png"
            alt=""
            fill
            frameClassName="absolute inset-0"
            sizes="(max-width: 767px) 100vw, 40vw"
          />
          <div className="ainow-model-stage__decision-scrim" aria-hidden="true" />
          <div className="ainow-model-stage__decision-content">
            <div className="ainow-model-stage__decision-copy">
              <span>{copy.jevKicker}</span>
              <strong>{copy.jevTitle}</strong>
              <p>{copy.jevDescription}</p>
            </div>
          </div>
        </div>

        <div
          className="ainow-model-stage__catalog ainow-model-stage__visual-card"
          aria-label={copy.radar}
        >
          <AiNowImage
            className="ainow-model-stage__catalog-image"
            src="/images/aiweb/review-mobile-desktop-v1.png"
            alt=""
            fill
            frameClassName="absolute inset-0"
            sizes="(max-width: 767px) 100vw, 58vw"
          />
          <div className="ainow-model-stage__catalog-scrim" aria-hidden="true" />
          <div className="ainow-model-stage__catalog-content">
            <div className="ainow-model-stage__catalog-heading">
              <span>{copy.radar}</span>
            </div>
            <div className="ainow-model-stage__providers" data-model-provider-group="primary">
              {providers.slice(0, 4).map(renderProvider)}
            </div>
            <AiNowDisclosure
              title={copy.moreTechnologies}
              className="mt-2 border-t border-slate-200/60 [&>button]:min-h-10 [&>button]:py-2 [&>button]:text-xs dark:border-white/10"
            >
              <div className="ainow-model-stage__providers pb-1" data-model-provider-group="additional">
                {providers.slice(4).map(renderProvider)}
              </div>
            </AiNowDisclosure>
          </div>
        </div>

        <dl className="ainow-model-stage__trust" aria-label={copy.trustLabel} tabIndex={0}>
          {copy.trust.map((item, index) => (
            <div className={`ainow-model-stage__trust-item${index === 3 ? " ainow-model-stage__trust-item--always-on" : ""}`} key={item.value}>
              <AiNowImage
                className="ainow-model-stage__trust-image"
                src={item.image}
                alt=""
                fill
                frameClassName="absolute inset-0"
                sizes="(max-width: 767px) 82vw, (max-width: 1040px) 25vw, 30vw"
              />
              <div className="ainow-model-stage__trust-copy">
                <dt>{item.value}</dt>
                <dd>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <section className="ainow-model-stage__brand ainow-model-stage__visual-card" aria-label={copy.brand.title}>
          <AiNowImage
            className="ainow-model-stage__brand-image"
            src="/images/aiweb/decision-approval-v1.png"
            alt=""
            fill
            frameClassName="absolute inset-0"
            sizes="(max-width: 767px) 100vw, 100vw"
          />
          <div className="ainow-model-stage__brand-scrim" aria-hidden="true" />
          <div className="ainow-model-stage__brand-copy">
            <span>{copy.brand.established}</span>
            <h3>{copy.brand.title}</h3>
            <p>{copy.brand.language}</p>
            <small>{copy.brand.location}</small>
          </div>
        </section>
      </section>
    </AiNowSectionFrame>
  );
}
