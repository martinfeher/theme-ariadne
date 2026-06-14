'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import BlogCard from '@/app/components/blog/BlogCard';
import BlogSidebar from '@/app/components/blog/BlogSidebar';
import { useBlogI18n } from '@/app/hooks/useBlogI18n';
import {
  getAdjacentPosts,
  getRelatedPosts,
  type BlogPost,
} from '@/lib/mock-blog';

function formatDate(date: string, locale: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

type BlogPostViewProps = {
  post: BlogPost;
  sidebar: boolean;
};

export default function BlogPostView({ post, sidebar }: BlogPostViewProps) {
  const t = useTranslations('Blog');
  const tHeader = useTranslations('Header');
  const locale = useLocale();
  const { getBlogTitle, getBlogExcerpt, getBlogContent, getBlogCategoryLabel, getBlogAuthorName, getBlogTagLabel } = useBlogI18n();

  const title = getBlogTitle(post.slug);
  const paragraphs = getBlogContent(post.slug);
  const { prev, next } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post.slug);

  const layoutToggleHref = sidebar ? `/blog/${post.slug}/full` : `/blog/${post.slug}`;
  const layoutToggleLabel = sidebar ? t('viewFullWidth') : t('viewWithSidebar');

  return (
    <PageShell>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-green-600" aria-label={t('breadcrumbNav')}>
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                {tHeader('home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog" className="hover:text-green-700">
                {t('breadcrumbBlog')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="line-clamp-1 font-medium text-gray-800">{title}</li>
          </ol>
        </nav>

        <div className="mt-4 flex justify-end">
          <Link
            href={layoutToggleHref}
            className="text-sm font-medium text-green-600 hover:text-green-700"
          >
            {layoutToggleLabel}
          </Link>
        </div>

        <div className={`mt-6 grid gap-8 ${sidebar ? 'lg:grid-cols-4' : ''}`}>
          <article className={sidebar ? 'lg:col-span-3' : 'mx-auto w-full max-w-3xl'}>
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <div className="relative aspect-[21/9] bg-gray-100">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <Link
                  href={`/blog/category/${post.category}`}
                  className="text-xs font-semibold uppercase tracking-wide text-green-600 hover:text-green-700"
                >
                  {getBlogCategoryLabel(post.category)}
                </Link>

                <h1 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                  {title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
                  <Link
                    href={`/blog/author/${post.authorSlug}`}
                    className="inline-flex items-center gap-1.5 hover:text-green-600"
                  >
                    <User className="h-4 w-4" aria-hidden />
                    {getBlogAuthorName(post.authorSlug)}
                  </Link>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" aria-hidden />
                    {formatDate(post.publishedAt, locale)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" aria-hidden />
                    {t('readTime', { minutes: post.readTimeMinutes })}
                  </span>
                </div>

                <p className="mt-6 text-lg leading-relaxed text-gray-700">{getBlogExcerpt(post.slug)}</p>

                <div className="prose prose-gray mt-8 max-w-none space-y-5 text-gray-700">
                  {paragraphs.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-8">
                  <span className="text-sm font-medium text-gray-700">{t('tagsLabel')}:</span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-100"
                    >
                      {getBlogTagLabel(tag)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {(prev || next) && (
              <nav
                className="mt-6 grid gap-4 sm:grid-cols-2"
                aria-label={t('postNavigation')}
              >
                {prev ? (
                  <PostNavLink post={prev} direction="prev" />
                ) : (
                  <div />
                )}
                {next ? <PostNavLink post={next} direction="next" /> : null}
              </nav>
            )}
          </article>

          {sidebar && (
            <div className="lg:col-span-1">
              <BlogSidebar activeCategory={post.category} currentSlug={post.slug} />
            </div>
          )}
        </div>

        {related.length > 0 && (
          <section className={`mt-12 ${sidebar ? '' : 'mx-auto max-w-5xl'}`}>
            <h2 className="text-xl font-bold text-gray-900">{t('relatedPosts')}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </main>
    </PageShell>
  );
}

function PostNavLink({
  post,
  direction,
}: {
  post: BlogPost;
  direction: 'prev' | 'next';
}) {
  const t = useTranslations('Blog');
  const { getBlogTitle } = useBlogI18n();
  const title = getBlogTitle(post.slug);
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
        direction === 'next' ? 'sm:flex-row-reverse sm:text-right' : ''
      }`}
    >
      <Icon className="h-5 w-5 shrink-0 text-green-500" aria-hidden />
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {direction === 'prev' ? t('previousPost') : t('nextPost')}
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-green-600">
          {title}
        </p>
      </div>
    </Link>
  );
}
