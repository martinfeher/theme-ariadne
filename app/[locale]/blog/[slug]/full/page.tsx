import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import BlogPostView from '../BlogPostView';
import { getBlogPostBySlug, MOCK_BLOG_POSTS } from '@/lib/mock-blog';
import { getBlogTitle } from '@/lib/blog-i18n';
import { routing } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    MOCK_BLOG_POSTS.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    const t = await getTranslations({ locale, namespace: 'Meta' });
    return { title: t('title') };
  }
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const title = getBlogTitle(slug, t);
  const excerpt = t(`posts.${slug}.excerpt`);
  return {
    title: `${title} | WebAriadne`,
    description: excerpt,
  };
}

export default async function BlogPostFullPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} sidebar={false} />;
}
