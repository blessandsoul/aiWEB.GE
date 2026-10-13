"use client";

import React from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { AiNowSectionFrame } from "./AiNowSectionFrame";
import { AiNowIconTile } from "@/components/common/AiNowIconTile";
import {
  AnimatedArrowRightIcon,
} from "./AiNowAnimatedIcons";
import { getAiNowHomeCopy } from "./AiNowHomeCopy";
import { AiNowImage } from "./AiNowImage";
import { getOwnCategoryFeatures } from "./own-category-features";

interface ProductItem {
  id: string;
  name: string;
  gradient: string;
  shadow: string;
  href: string;
}

interface CategoryCard {
  id: string;
  sceneImage: string;
  products: ProductItem[];
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "communication",
    sceneImage: "/images/aiweb/brief-customer-action-v1.png",
    products: [
      {
        id: "aichats",
        name: "Brief",
        gradient: "from-blue-600 to-blue-700",
        shadow: "rgba(37, 99, 235, 0.35)",
        href: "#hero",
      },
      {
        id: "aicall",
        name: "Primary action",
        gradient: "from-sky-500 to-blue-700",
        shadow: "rgba(56, 189, 248, 0.35)",
        href: "#process",
      },
    ],
  },
  {
    id: "marketing",
    sceneImage: "/images/aiweb/pages-content-v1.png",
    products: [
      {
        id: "aicontent",
        name: "Pages",
        gradient: "from-blue-600 to-indigo-700",
        shadow: "rgba(37, 99, 235, 0.35)",
        href: "#categories",
      },
      {
        id: "aiads",
        name: "Content",
        gradient: "from-sky-500 to-blue-700",
        shadow: "rgba(56, 189, 248, 0.35)",
        href: "#categories",
      },
      {
        id: "aimusic",
        name: "Visuals",
        gradient: "from-indigo-500 to-blue-700",
        shadow: "rgba(37, 99, 235, 0.35)",
        href: "#categories",
      },
    ],
  },
  {
    id: "internal",
    sceneImage: "/images/aiweb/review-mobile-desktop-v1.png",
    products: [
      {
        id: "aistaff",
        name: "Review",
        gradient: "from-blue-600 to-indigo-700",
        shadow: "rgba(37, 99, 235, 0.35)",
        href: "#model-architecture",
      },
      {
        id: "aibrain",
        name: "Mobile check",
        gradient: "from-sky-500 to-blue-700",
        shadow: "rgba(56, 189, 248, 0.35)",
        href: "#model-architecture",
      },
      {
        id: "aioffice",
        name: "Forms",
        gradient: "from-indigo-500 to-blue-700",
        shadow: "rgba(37, 99, 235, 0.35)",
        href: "#model-architecture",
      },
      {
        id: "aidocs",
        name: "Launch checks",
        gradient: "from-sky-500 to-blue-700",
        shadow: "rgba(56, 189, 248, 0.35)",
        href: "#model-architecture",
      },
    ],
  },
  {
    id: "products",
    sceneImage: "/images/aiweb/care-backup-v1.png",
    products: [
      {
        id: "aiweb",
        name: "Care",
        gradient: "from-blue-600 to-indigo-700",
        shadow: "rgba(37, 99, 235, 0.35)",
        href: "#process",
      },
      {
        id: "aiapp",
        name: "Backups",
        gradient: "from-sky-500 to-blue-700",
        shadow: "rgba(56, 189, 248, 0.35)",
        href: "#process",
      },
      {
        id: "vibecoding",
        name: "Small changes",
        gradient: "from-indigo-500 to-blue-700",
        shadow: "rgba(37, 99, 235, 0.35)",
        href: "#cta",
      },
    ],
  },
];

export function AiNowCategoryMatrix({ conversationHref = "#cta" }: { conversationHref?: string } = {}) {
  const locale = useLocale();
  const copy = getAiNowHomeCopy(locale);
  const ownFeatures = getOwnCategoryFeatures(locale);
  const categories = CATEGORIES.map((category) => {
    const localized = copy.categories.items[category.id as keyof typeof copy.categories.items];
    return {
      ...category,
      title: localized.title,
      subtitle: localized.subtitle,
      products: category.products.map((product) => ({
        ...product,
        name: ownFeatures[product.id]?.name ?? product.name,
        href: conversationHref,
        desc: ownFeatures[product.id]?.description ?? localized.products[product.id],
      })),
    };
  });

  return (
    <AiNowSectionFrame
      id="categories"
      className="ainow-blueprint-bg"
      laserDelay={1}
      laserSpeed={10}
      showTicks={true}
      containerClassName="px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="relative w-full">
        {/* Section Header: Left Title + Right Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-black/[0.08] dark:border-white/10 gap-4">
          <div>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {copy.categories.title}
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
            {copy.categories.description}
          </p>
        </div>

        {/* 2x2 Bento Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((cat) => {
            const catStyles: Record<string, { borderHover: string; textHover: string }> = {
              communication: {
                borderHover: "hover:border-blue-500/40",
                textHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
              },
              marketing: {
                borderHover: "hover:border-pink-500/40",
                textHover: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
              },
              internal: {
                borderHover: "hover:border-purple-500/40",
                textHover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
              },
              products: {
                borderHover: "hover:border-emerald-500/40",
                textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
              },
            };
            const style = catStyles[cat.id] || catStyles.communication;

            return (
              <div
                key={cat.id}
                className={`group relative flex flex-col justify-between rounded-2xl dodo-glass-card p-6 sm:p-7 shadow-lg hover:shadow-2xl ${style.borderHover} transition-all duration-300 overflow-hidden`}
              >
                {/* Category Header: Left Text + Right 3D Graphic (no icon box, only picture) */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-headline font-semibold text-lg sm:text-xl text-slate-900 dark:text-white ${style.textHover} transition-colors`}>
                        {cat.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                        {cat.subtitle}
                      </p>
                    </div>

                    {/* Bespoke 3D Foreground Scene (only picture, no square icon) */}
                    <div className="relative shrink-0 size-16 sm:size-20 pointer-events-none -mr-1 -mt-1">
                      <AiNowImage
                        fill
                        src={cat.sceneImage}
                        alt={cat.title}
                        sizes="(min-width: 640px) 80px, 64px"
                        frameClassName="absolute inset-0"
                        className="size-full object-contain filter drop-shadow-lg group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Product Rows with Authentic Glossy SVG Icon Tiles */}
                  <div className="mt-6 divide-y divide-black/[0.05] dark:divide-white/5 border-t border-black/[0.06] dark:border-white/10">
                    {cat.products.map((prod) => (
                      <Link
                        key={prod.id}
                        href={prod.href}
                        className="flex items-center justify-between py-3 px-2.5 -mx-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-all group/item"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Official Glossy 3D SVG Icon Tile */}
                          <AiNowIconTile
                            iconId={prod.id}
                            size="sm"
                            bgGradient={prod.gradient}
                            shadowColor={prod.shadow}
                            alt={prod.name}
                            className="group-hover/item:scale-105 transition-transform"
                          />

                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2.5 min-w-0">
                            <span className="font-mono font-bold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors shrink-0">
                              {prod.name}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-normal truncate">
                              {prod.desc}
                            </span>
                          </div>
                        </div>

                        <AnimatedArrowRightIcon size={16} className="size-4 text-slate-400 dark:text-slate-500 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Source trust-claim showcase is intentionally not carried into aiWEB without current evidence. */}
        {/* Source trust-claim showcase is intentionally not carried into aiWEB without current evidence. */}
      </div>
    </AiNowSectionFrame>
  );
}
