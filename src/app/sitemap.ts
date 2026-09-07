import type { MetadataRoute } from "next";
import { getAvailableLocales, getDefaultAvailableLocale, getPost, getPostSlugs, getPosts } from "@/features/blog/lib/blog";
import { INDEXED_LOCALES, buildAlternates, localeUrl } from "@/i18n/seo-locales";
import {
  PUBLIC_ROUTES,
  isPublicRoute,
} from "@/features/product-pages/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  // Empty locale indexes are noindex and must not be advertised.
  const blogLocales = INDEXED_LOCALES.filter((locale) => getPosts(locale).length > 0);
  for (const route of PUBLIC_ROUTES) {
    if (route.path === "/privacy" || route.path === "/terms" || route.path === "/cookies") continue;
    const path = route.path === "/" ? "" : route.path;
    for (const locale of route.path === "/blog" ? blogLocales : INDEXED_LOCALES) {
      entries.push({
        url: localeUrl(locale, path),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: route.path === "/blog"
            ? Object.fromEntries([
              ...blogLocales.map((loc) => [loc, localeUrl(loc, path)]),
              ...(blogLocales[0] ? [['x-default', localeUrl(blogLocales[0], path)]] : []),
            ])
            : buildAlternates(path, locale).languages,
        },
      });
    }
  }

  if (!isPublicRoute('/blog')) return entries;

  for (const slug of getPostSlugs()) {
    const path = `/blog/${slug}`;
    const available = getAvailableLocales(slug);
    const languages: Record<string, string> = {};
    for (const locale of available) languages[locale] = localeUrl(locale, path);
    const defaultAvailable = getDefaultAvailableLocale(slug);
    if (defaultAvailable) languages["x-default"] = localeUrl(defaultAvailable, path);

    for (const locale of available) {
      const post = getPost(slug, locale);
      if (!post?.indexable) continue;
      entries.push({
        url: localeUrl(locale, path),
        lastModified: post.updated ? new Date(`${post.updated}T12:00:00Z`) : undefined,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      });
    }
  }
  return entries;
}
