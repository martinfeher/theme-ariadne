import type { BlogAuthor, BlogCategory, BlogPost, BlogTag } from '@/lib/mock-blog';

type BlogTextTranslator = (key: string) => string;

export function getBlogTitle(slug: string, t: BlogTextTranslator): string {
  return t(`posts.${slug}.title`);
}

export function getBlogExcerpt(slug: string, t: BlogTextTranslator): string {
  return t(`posts.${slug}.excerpt`);
}

export function getBlogContent(slug: string, t: BlogTextTranslator): string[] {
  const content = t(`posts.${slug}.content`);
  return content.split('\n\n').map((p) => p.trim()).filter(Boolean);
}

export function getBlogCategoryLabel(
  category: BlogPost['category'],
  t: BlogTextTranslator
): string {
  return t(`categories.${category}`);
}

export function getBlogCategoryDescription(
  category: BlogCategory,
  t: BlogTextTranslator
): string {
  return t(`categoryDescriptions.${category}`);
}

export function getBlogTagLabel(tag: BlogTag, t: BlogTextTranslator): string {
  return t(`tagNames.${tag}`);
}

export function getBlogTagDescription(tag: BlogTag, t: BlogTextTranslator): string {
  return t(`tagDescriptions.${tag}`);
}

export function getBlogAuthorName(authorSlug: string, t: BlogTextTranslator): string {
  return t(`authors.${authorSlug}.name`);
}

export function getBlogAuthorRole(authorSlug: string, t: BlogTextTranslator): string {
  return t(`authors.${authorSlug}.role`);
}

export function getBlogAuthorBio(authorSlug: string, t: BlogTextTranslator): string {
  return t(`authors.${authorSlug}.bio`);
}

export function getBlogAuthorDisplayName(
  author: BlogAuthor,
  t: BlogTextTranslator
): string {
  const translated = getBlogAuthorName(author.slug, t);
  return translated || author.name;
}
