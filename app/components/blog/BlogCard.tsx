'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, Clock, User } from 'lucide-react';
import type { BlogPost } from '@/lib/mock-blog';
import { useBlogI18n } from '@/app/hooks/useBlogI18n';

function formatDate(date: string, locale: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations('Blog');
  const locale = useLocale();
  const { getBlogTitle, getBlogExcerpt, getBlogCategoryLabel, getBlogAuthorName } = useBlogI18n();

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {post.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white">
              {t('featured')}
            </span>
          )}
        </div>
      </Link>
      <div className="p-5">
        <Link
          href={`/blog/category/${post.category}`}
          className="text-xs font-semibold uppercase tracking-wide text-green-600 hover:text-green-700"
        >
          {getBlogCategoryLabel(post.category)}
        </Link>
        <h2 className="mt-2 text-lg font-bold leading-snug text-gray-900">
          <Link href={`/blog/${post.slug}`} className="hover:text-green-600">
            {getBlogTitle(post.slug)}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{getBlogExcerpt(post.slug)}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            {formatDate(post.publishedAt, locale)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {t('readTime', { minutes: post.readTimeMinutes })}
          </span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex text-sm font-semibold text-green-600 hover:text-green-700"
        >
          {t('readMore')} →
        </Link>
      </div>
    </article>
  );
}

export function BlogListItem({ post }: BlogCardProps) {
  const t = useTranslations('Blog');
  const locale = useLocale();
  const { getBlogTitle, getBlogExcerpt, getBlogCategoryLabel, getBlogAuthorName } = useBlogI18n();

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md sm:flex-row">
      <Link
        href={`/blog/${post.slug}`}
        className="relative aspect-[16/10] shrink-0 overflow-hidden bg-gray-100 sm:aspect-auto sm:w-64 lg:w-72"
      >
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 288px"
        />
        {post.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white">
            {t('featured')}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Link
          href={`/blog/category/${post.category}`}
          className="text-xs font-semibold uppercase tracking-wide text-green-600 hover:text-green-700"
        >
          {getBlogCategoryLabel(post.category)}
        </Link>
        <h2 className="mt-2 text-xl font-bold text-gray-900">
          <Link href={`/blog/${post.slug}`} className="hover:text-green-600">
            {getBlogTitle(post.slug)}
          </Link>
        </h2>
        <p className="mt-2 flex-1 text-sm text-gray-600 sm:line-clamp-3">{getBlogExcerpt(post.slug)}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <User className="h-3.5 w-3.5" aria-hidden />
              <Link href={`/blog/author/${post.authorSlug}`} className="hover:text-green-600">
                {getBlogAuthorName(post.authorSlug)}
              </Link>
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {formatDate(post.publishedAt, locale)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {t('readTime', { minutes: post.readTimeMinutes })}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-semibold text-green-600 hover:text-green-700"
          >
            {t('readMore')} →
          </Link>
        </div>
      </div>
    </article>
  );
}
