/** Slugs supported by `/category/[slug]` (aligned with catalog `categories` and header search). */
export const CATEGORY_SHOP_SLUGS = [
  'all',
  'milks-dairies',
  'vegetables',
  'meats',
  'fruits',
  'coffees-teas',
  'pet-foods',
  'baking-material',
  'fresh-seafood',
] as const;

export type CategoryShopSlug = (typeof CATEGORY_SHOP_SLUGS)[number];

export function isCategoryShopSlug(s: string): s is CategoryShopSlug {
  return (CATEGORY_SHOP_SLUGS as readonly string[]).includes(s);
}

export const CATEGORY_SIDEBAR_ICONS: { slug: string; icon: string }[] = [
  { slug: 'milks-dairies', icon: '/icons/category-1.svg' },
  { slug: 'vegetables', icon: '/icons/category-5.svg' },
  { slug: 'meats', icon: '/icons/category-8.svg' },
  { slug: 'fruits', icon: '/icons/category-5.svg' },
  { slug: 'coffees-teas', icon: '/icons/category-6.svg' },
  { slug: 'pet-foods', icon: '/icons/category-3.svg' },
  { slug: 'baking-material', icon: '/icons/category-4.svg' },
  { slug: 'fresh-seafood', icon: '/icons/category-7.svg' },
];
