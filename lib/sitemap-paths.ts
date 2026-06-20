import { MOCK_BLOG_POSTS, BLOG_AUTHORS, BLOG_CATEGORIES, BLOG_TAGS } from '@/lib/mock-blog';
import { MOCK_VENDORS } from '@/lib/mock-vendors';
import { CATEGORY_SHOP_SLUGS } from '@/lib/category-shop';
import { MOCK_PRODUCTS } from '@/lib/mock-products';

export type SitemapPathEntry = {
  path: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  lastModified?: Date;
};

const HOME_SLUGS = ['home-1', 'home-2', 'home-3', 'home-4'] as const;

/** All indexable pathname patterns for the storefront (locale-agnostic). */
export function getSitemapPathEntries(): SitemapPathEntry[] {
  const entries: SitemapPathEntry[] = [
    { path: '/', changeFrequency: 'daily', priority: 1 },
    { path: '/deals', changeFrequency: 'daily', priority: 0.8 },
    { path: '/search', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/compare', changeFrequency: 'weekly', priority: 0.5 },
    { path: '/wishlist', changeFrequency: 'weekly', priority: 0.5 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/refund-policy', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/about-2', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/vendors', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/vouchers', changeFrequency: 'weekly', priority: 0.5 },
    { path: '/shop/list', changeFrequency: 'daily', priority: 0.8 },
    { path: '/checkout', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/shop-invoice', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/order-tracking', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/account', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/account/settings', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/pages', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
    { path: '/blog/list', changeFrequency: 'weekly', priority: 0.6 },
  ];

  for (const slug of HOME_SLUGS) {
    entries.push({
      path: `/home/${slug}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  for (const slug of CATEGORY_SHOP_SLUGS) {
    entries.push({
      path: `/category/${slug}`,
      changeFrequency: 'daily',
      priority: 0.8,
    });
  }

  for (const product of MOCK_PRODUCTS) {
    entries.push({
      path: `/product/${product.id}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  for (const post of MOCK_BLOG_POSTS) {
    entries.push({
      path: `/blog/${post.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
      lastModified: new Date(`${post.publishedAt}T12:00:00`),
    });
  }

  for (const category of BLOG_CATEGORIES) {
    entries.push(
      {
        path: `/blog/category/${category}`,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      {
        path: `/blog/category/${category}/list`,
        changeFrequency: 'weekly',
        priority: 0.5,
      }
    );
  }

  for (const tag of BLOG_TAGS) {
    entries.push(
      {
        path: `/blog/tag/${tag}`,
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        path: `/blog/tag/${tag}/list`,
        changeFrequency: 'weekly',
        priority: 0.4,
      }
    );
  }

  for (const author of BLOG_AUTHORS) {
    entries.push(
      {
        path: `/blog/author/${author.slug}`,
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        path: `/blog/author/${author.slug}/list`,
        changeFrequency: 'weekly',
        priority: 0.4,
      }
    );
  }

  for (const vendor of MOCK_VENDORS) {
    entries.push({
      path: `/vendor/${vendor.slug}`,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  return entries;
}
