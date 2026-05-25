'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Search } from 'lucide-react';
import {
  BLOG_AUTHORS,
  BLOG_CATEGORIES,
  BLOG_TAGS,
  MOCK_BLOG_POSTS,
  countPostsByCategory,
  countPostsByAuthor,
  countPostsByTag,
  type BlogCategory,
  type BlogPost,
  type BlogTag,
} from '@/lib/mock-blog';
import { useBlogI18n } from '@/app/hooks/useBlogI18n';

function formatDate(date: string, locale: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  });
}

type BlogSidebarProps = {
  activeCategory?: BlogCategory | null;
  activeTag?: BlogTag | null;
  activeAuthorSlug?: string | null;
  currentSlug?: string;
  onSearch?: (query: string) => void;
};

export default function BlogSidebar({
  activeCategory = null,
  activeTag = null,
  activeAuthorSlug = null,
  currentSlug,
  onSearch,
}: BlogSidebarProps) {
  const t = useTranslations('Blog');
  const locale = useLocale();
  const {
    getBlogTitle,
    getBlogCategoryLabel,
    getBlogTagLabel,
    getBlogAuthorName,
  } = useBlogI18n();
  const categoryCounts = countPostsByCategory();
  const tagCounts = countPostsByTag();
  const authorCounts = countPostsByAuthor();

  const recentPosts = MOCK_BLOG_POSTS.filter((post) => post.slug !== currentSlug).slice(0, 4);
  const popularTags = BLOG_TAGS.filter((tag) => tagCounts[tag] > 0).slice(0, 8);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const query = String(data.get('q') ?? '').trim();
    onSearch?.(query);
  };

  return (
    <aside className="space-y-6">
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">{t('search')}</h2>
        <form className="mt-3 flex gap-2" onSubmit={handleSearch}>
          <label htmlFor="blog-sidebar-search" className="sr-only">
            {t('searchPlaceholder')}
          </label>
          <input
            id="blog-sidebar-search"
            name="q"
            type="search"
            placeholder={t('searchPlaceholder')}
            className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
          />
          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer"
            aria-label={t('search')}
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">{t('categoryHeading')}</h2>
        <ul className="mt-3 space-y-1">
          <li>
            <Link
              href="/blog"
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                !activeCategory
                  ? 'bg-green-50 font-medium text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
              }`}
            >
              <span>{t('allCategories')}</span>
              <span className="text-xs text-gray-400">{MOCK_BLOG_POSTS.length}</span>
            </Link>
          </li>
          {BLOG_CATEGORIES.map((category) => (
            <li key={category}>
              <Link
                href={`/blog/category/${category}`}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeCategory === category
                    ? 'bg-green-50 font-medium text-green-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                }`}
              >
                <span>{getBlogCategoryLabel(category)}</span>
                <span className="text-xs text-gray-400">{categoryCounts[category]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">{t('tagHeading')}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag}`}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-green-500 text-white'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              {getBlogTagLabel(tag)}
              <span className="ml-1 opacity-70">{tagCounts[tag]}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">{t('authorsHeading')}</h2>
        <ul className="mt-3 space-y-3">
          {BLOG_AUTHORS.map((author) => (
            <li key={author.slug}>
              <Link
                href={`/blog/author/${author.slug}`}
                className={`group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors ${
                  activeAuthorSlug === author.slug ? 'bg-green-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100">
                  <Image src={author.avatar} alt="" fill className="object-cover" sizes="36px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-medium ${
                      activeAuthorSlug === author.slug
                        ? 'text-green-700'
                        : 'text-gray-900 group-hover:text-green-600'
                    }`}
                  >
                    {getBlogAuthorName(author.slug)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t('postsCount', { count: authorCounts[author.slug] ?? 0 })}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">{t('recentPosts')}</h2>
        <ul className="mt-3 space-y-4">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <RecentPostItem
                post={post}
                locale={locale}
                title={getBlogTitle(post.slug)}
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function RecentPostItem({
  post,
  locale,
  title,
}: {
  post: BlogPost;
  locale: string;
  title: string;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image src={post.image} alt="" fill className="object-cover" sizes="56px" />
      </div>
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-green-600">
          {title}
        </p>
        <p className="mt-0.5 text-xs text-gray-500">{formatDate(post.publishedAt, locale)}</p>
      </div>
    </Link>
  );
}
