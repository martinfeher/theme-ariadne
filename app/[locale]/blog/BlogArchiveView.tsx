'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid, List } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import BlogCard, { BlogListItem } from '@/app/components/blog/BlogCard';
import BlogSidebar from '@/app/components/blog/BlogSidebar';
import { useBlogI18n } from '@/app/hooks/useBlogI18n';
import {
  getArchiveBasePath,
  getArchivePosts,
  getBlogAuthorBySlug,
  type BlogArchiveFilter,
} from '@/lib/mock-blog';

type BlogArchiveViewProps = {
  filter: BlogArchiveFilter;
  initialLayout: 'grid' | 'list';
};

export default function BlogArchiveView({ filter, initialLayout }: BlogArchiveViewProps) {
  const t = useTranslations('Blog');
  const tHeader = useTranslations('Header');
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    getBlogTitle,
    getBlogExcerpt,
    getBlogCategoryLabel,
    getBlogCategoryDescription,
    getBlogTagLabel,
    getBlogTagDescription,
    getBlogAuthorName,
    getBlogAuthorRole,
    getBlogAuthorBio,
  } = useBlogI18n();

  const searchQuery = searchParams.get('q')?.trim().toLowerCase() ?? '';
  const basePath = getArchiveBasePath(filter);
  const layout = initialLayout;

  const author =
    filter.type === 'author' ? getBlogAuthorBySlug(filter.authorSlug) : undefined;

  const filteredPosts = useMemo(() => {
    let posts = getArchivePosts(filter);
    if (searchQuery) {
      posts = posts.filter((post) => {
        const title = getBlogTitle(post.slug).toLowerCase();
        const excerpt = getBlogExcerpt(post.slug).toLowerCase();
        return title.includes(searchQuery) || excerpt.includes(searchQuery);
      });
    }
    return posts;
  }, [filter, searchQuery, getBlogTitle, getBlogExcerpt]);

  const { title, subtitle, breadcrumbCurrent } = useMemo(() => {
    switch (filter.type) {
      case 'all':
        return {
          title: t('title'),
          subtitle: t('subtitle'),
          breadcrumbCurrent: t('breadcrumbBlog'),
        };
      case 'category':
        return {
          title: getBlogCategoryLabel(filter.category),
          subtitle: getBlogCategoryDescription(filter.category),
          breadcrumbCurrent: getBlogCategoryLabel(filter.category),
        };
      case 'tag':
        return {
          title: getBlogTagLabel(filter.tag),
          subtitle: getBlogTagDescription(filter.tag),
          breadcrumbCurrent: getBlogTagLabel(filter.tag),
        };
      case 'author':
        return {
          title: getBlogAuthorName(filter.authorSlug),
          subtitle: getBlogAuthorBio(filter.authorSlug),
          breadcrumbCurrent: getBlogAuthorName(filter.authorSlug),
        };
    }
  }, [
    filter,
    t,
    getBlogCategoryLabel,
    getBlogCategoryDescription,
    getBlogTagLabel,
    getBlogTagDescription,
    getBlogAuthorName,
    getBlogAuthorBio,
  ]);

  const activeCategory = filter.type === 'category' ? filter.category : null;
  const activeTag = filter.type === 'tag' ? filter.tag : null;

  const handleSearch = (query: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    const listBase = layout === 'list' ? `${basePath}/list` : basePath;
    router.push(params.toString() ? `${listBase}?${params.toString()}` : listBase);
  };

  const clearHref =
    filter.type === 'all'
      ? '/blog'
      : filter.type === 'category'
        ? `/blog/category/${filter.category}`
        : filter.type === 'tag'
          ? `/blog/tag/${filter.tag}`
          : `/blog/author/${filter.authorSlug}`;

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
            {filter.type === 'category' && (
              <>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="hover:text-green-700">
                    {t('breadcrumbCategories')}
                  </Link>
                </li>
              </>
            )}
            {filter.type === 'tag' && (
              <>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="hover:text-green-700">
                    {t('breadcrumbTags')}
                  </Link>
                </li>
              </>
            )}
            {filter.type === 'author' && (
              <>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="hover:text-green-700">
                    {t('breadcrumbAuthors')}
                  </Link>
                </li>
              </>
            )}
            {filter.type !== 'all' && (
              <>
                <li aria-hidden>/</li>
                <li className="font-medium text-gray-800">{breadcrumbCurrent}</li>
              </>
            )}
            {filter.type === 'all' && (
              <li className="font-medium text-gray-800">{breadcrumbCurrent}</li>
            )}
          </ol>
        </nav>

        {filter.type === 'author' && author && (
          <div className="mt-6 flex flex-col items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gray-100">
              <Image
                src={author.avatar}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                {getBlogAuthorRole(filter.authorSlug)}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-gray-900">{title}</h1>
              <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
              <p className="mt-2 text-sm font-medium text-gray-500">
                {t('postsCount', { count: filteredPosts.length })}
              </p>
            </div>
          </div>
        )}

        <div
          className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
            filter.type === 'author' ? 'mt-8' : 'mt-6'
          }`}
        >
          {filter.type !== 'author' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">{subtitle}</p>
              {filter.type !== 'all' && (
                <p className="mt-2 text-sm font-medium text-gray-500">
                  {t('postsCount', { count: filteredPosts.length })}
                </p>
              )}
            </div>
          )}

          {filter.type === 'author' && <div className="hidden sm:block sm:flex-1" />}

          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
            <Link
              href={buildLayoutHref(basePath, 'grid', searchParams)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                layout === 'grid'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-green-600'
              }`}
              aria-current={layout === 'grid' ? 'page' : undefined}
            >
              <LayoutGrid className="h-4 w-4" aria-hidden />
              {t('gridView')}
            </Link>
            <Link
              href={buildLayoutHref(basePath, 'list', searchParams)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                layout === 'list'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-green-600'
              }`}
              aria-current={layout === 'list' ? 'page' : undefined}
            >
              <List className="h-4 w-4" aria-hidden />
              {t('listView')}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {filteredPosts.length === 0 ? (
              <div className="rounded-xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
                <p className="text-gray-600">{t('noResults')}</p>
                <Link
                  href={clearHref}
                  className="mt-4 inline-flex text-sm font-semibold text-green-600 hover:text-green-700"
                >
                  {t('clearFilters')}
                </Link>
              </div>
            ) : layout === 'grid' ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {filteredPosts.map((post) => (
                  <BlogListItem key={post.slug} post={post} />
                ))}
              </div>
            )}

            {searchQuery && filteredPosts.length > 0 && (
              <p className="mt-6 text-sm text-gray-500">
                {t('resultsFor', { query: searchQuery, count: filteredPosts.length })}
              </p>
            )}
          </div>

          <div className="lg:col-span-1">
            <BlogSidebar
              activeCategory={activeCategory}
              activeTag={activeTag}
              activeAuthorSlug={filter.type === 'author' ? filter.authorSlug : null}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </main>
    </PageShell>
  );
}

function buildLayoutHref(
  basePath: string,
  layout: 'grid' | 'list',
  searchParams: URLSearchParams
) {
  const path = layout === 'list' ? `${basePath}/list` : basePath;
  const qs = searchParams.toString();
  return qs ? `${path}?${qs}` : path;
}
