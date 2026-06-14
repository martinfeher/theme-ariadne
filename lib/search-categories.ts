/** Category slugs available in the header search bar filter. */
export const SEARCH_CATEGORY_SLUGS = [
  'all',
  'vegetables',
  'wines-alcohol',
  'clothing-beauty',
  'fast-food',
  'baking-material',
  'fresh-seafood',
  'noodles-rice',
  'ice-cream',
  'coffees-teas',
  'pet-foods',
  'meats',
  'fruits',
  'milks-dairies',
] as const;

export type SearchCategorySlug = (typeof SEARCH_CATEGORY_SLUGS)[number];

const SEARCH_CATEGORY_ICON_MAP: Record<string, string> = {
  all: '/icons/category-10.svg',
  'milks-dairies': '/icons/category-1.svg',
  'clothing-beauty': '/icons/category-3.svg',
  'baking-material': '/icons/category-4.svg',
  vegetables: '/icons/category-5.svg',
  'fresh-seafood': '/icons/category-7.svg',
  'noodles-rice': '/icons/category-9.svg',
  'ice-cream': '/icons/category-10.svg',
  'coffees-teas': '/icons/category-6.svg',
  'fast-food': '/icons/category-4.svg',
  'pet-foods': '/icons/category-3.svg',
  'wines-alcohol': '/icons/category-2.svg',
  meats: '/icons/category-8.svg',
  fruits: '/icons/category-5.svg',
};

export function getSearchCategoryIcon(slug: string): string {
  return SEARCH_CATEGORY_ICON_MAP[slug] ?? '/icons/category-10.svg';
}

export const RECENT_CATEGORIES_STORAGE_KEY = 'ariadne-search-recent-categories';

export const DEFAULT_RECENT_CATEGORY_SLUGS = ['vegetables', 'coffees-teas'] as const;
