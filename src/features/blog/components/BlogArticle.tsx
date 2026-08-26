import { Ico } from '@/components/common/Ico';
import { SITE } from '@/config/site';
import { Link } from '@/i18n/navigation';

import { extractHeadings } from '../lib/blog';
import { getBlogCopy } from '../lib/copy';

import type { BlogPost, BlogPostMeta } from '../types';

import './blog.css';

function formatDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'ka' ? 'ka-GE' : locale === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${date}T12:00:00Z`));
}

function getArticleCta(locale: string) {
  if (locale === 'ka') {
    return {
      title: 'ეს საკითხი თქვენს საიტზეც გაქვთ მოსაგვარებელი?',
      body: 'aiWEB ქმნის და უვლის ბიზნეს საიტს: მომსახურება, ფასები, საკონტაქტო გზა და განახლება ერთ გასაგებ სისტემაშია.',
      action: 'გაიგეთ, რა საიტი გჭირდებათ',
    };
  }
  if (locale === 'ru') {
    return {
      title: 'Эту задачу нужно решить и на вашем сайте?',
      body: 'aiWEB создаёт и поддерживает бизнес-сайт: услуги, цены, контакты и обновления собраны в одной понятной системе.',
      action: 'Узнать, какой сайт нужен',
    };
  }
  return {
    title: 'Need to solve this on your own website?',
    body: 'aiWEB builds and maintains business websites with services, prices, contact paths and updates in one clear system.',
    action: 'Plan your website',
  };
}

export function BlogArticle({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPostMeta[];
}) {
  const copy = getBlogCopy(post.locale);
  const headings = extractHeadings(post.content);
  const cta = getArticleCta(post.locale);

  return (
    <article className="product-article" data-blog-article="true">
      <header className="article-header" data-family-shell="true">
        <Link href="/blog" className="article-back">
          <Ico name="solar:arrow-left-linear" aria-hidden="true" />
          {copy.back}
        </Link>
        <div className="article-tags">
          {post.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <h1>{post.title}</h1>
        <p className="article-deck">{post.excerpt}</p>
        <div className="article-byline">
          <span>{post.author.name}</span>
          {post.author.role ? <span>{post.author.role}</span> : null}
          <time dateTime={post.updated}>{copy.updated} {formatDate(post.updated, post.locale)}</time>
          <span>{copy.minRead}: {post.readTime}</span>
        </div>
      </header>

      <div className="article-cover" data-family-shell="true" aria-hidden="true">
        <div className="article-cover-grid" />
        <div className="wordmark-3d article-cover-mark">
          <span className="wm-prefix">{SITE.wordmark.prefix}</span>
          <span className="wm-mark">{SITE.wordmark.mark}</span>
          <span className="wm-accent" />
        </div>
        <Ico name="solar:document-text-bold-duotone" />
      </div>

      <div className="article-layout" data-family-shell="true">
        <div className="article-prose" dangerouslySetInnerHTML={{ __html: post.content }} />
        {headings.length > 1 ? (
          <aside className="article-toc" aria-label={copy.contents}>
            <p>{copy.contents}</p>
            <ol>
              {headings.map((heading) => (
                <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>
              ))}
            </ol>
          </aside>
        ) : null}
      </div>

      <section
        className="article-business-cta"
        data-family-shell="true"
        data-business-cta="true"
        data-product-bridge="true"
        aria-labelledby="article-business-cta"
      >
        <h2 id="article-business-cta">{cta.title}</h2>
        <p>{cta.body}</p>
        <Link href="/contact">{cta.action}<Ico name="solar:arrow-right-linear" aria-hidden="true" /></Link>
      </section>

      {post.sources.length > 0 ? (
        <section className="article-sources" data-family-shell="true" aria-labelledby="article-sources-heading">
          <h2 id="article-sources-heading">{copy.sources}</h2>
          <ol>
            {post.sources.map((source) => (
              <li key={source}><a href={source} target="_blank" rel="noopener noreferrer">{source}</a></li>
            ))}
          </ol>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="article-related" data-family-shell="true" aria-labelledby="article-related-heading">
          <h2 id="article-related-heading">{copy.related}</h2>
          <div className="article-related-grid">
            {related.map((item) => (
              <Link href={`/blog/${item.slug}`} key={item.slug}>
                <span>{item.cluster}</span>
                <h3>{item.title}</h3>
                <Ico name="solar:arrow-right-linear" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
