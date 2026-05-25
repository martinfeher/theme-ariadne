'use client';

import { useTranslations } from 'next-intl';
import {
  getBlogAuthorBio,
  getBlogAuthorName,
  getBlogAuthorRole,
  getBlogCategoryDescription,
  getBlogCategoryLabel,
  getBlogContent,
  getBlogExcerpt,
  getBlogTagDescription,
  getBlogTagLabel,
  getBlogTitle,
} from '@/lib/blog-i18n';

export function useBlogI18n() {
  const t = useTranslations('Blog');

  return {
    getBlogTitle: (slug: string) => getBlogTitle(slug, t),
    getBlogExcerpt: (slug: string) => getBlogExcerpt(slug, t),
    getBlogContent: (slug: string) => getBlogContent(slug, t),
    getBlogCategoryLabel: (category: Parameters<typeof getBlogCategoryLabel>[0]) =>
      getBlogCategoryLabel(category, t),
    getBlogCategoryDescription: (category: Parameters<typeof getBlogCategoryDescription>[0]) =>
      getBlogCategoryDescription(category, t),
    getBlogTagLabel: (tag: Parameters<typeof getBlogTagLabel>[0]) => getBlogTagLabel(tag, t),
    getBlogTagDescription: (tag: Parameters<typeof getBlogTagDescription>[0]) =>
      getBlogTagDescription(tag, t),
    getBlogAuthorName: (authorSlug: string) => getBlogAuthorName(authorSlug, t),
    getBlogAuthorRole: (authorSlug: string) => getBlogAuthorRole(authorSlug, t),
    getBlogAuthorBio: (authorSlug: string) => getBlogAuthorBio(authorSlug, t),
  };
}
