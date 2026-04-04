import type { Product } from '@/app/types/product';

/**
 * Mock product photos live under /public/images/products/mock/.
 * Sourced from Unsplash (https://unsplash.com/license) for demo use only.
 */
const MOCK_IMAGE_BASE = '/images/products/mock';

const CATEGORY_MEDIA: Record<string, { image: string; hoverImage: string }> = {
  vegetables: {
    image: `${MOCK_IMAGE_BASE}/organic_quinoa.jpeg`,
    hoverImage: `${MOCK_IMAGE_BASE}/organic_quinoa.jpeg`,
  },
  'coffees-teas': {
    image: `${MOCK_IMAGE_BASE}/roast_ground_cofee.jpeg`,
    hoverImage: `${MOCK_IMAGE_BASE}/roast_ground_cofee.jpeg`,
  },
  'pet-foods': {
    image: `${MOCK_IMAGE_BASE}/pet-foods-a.jpg`,
    hoverImage: `${MOCK_IMAGE_BASE}/pet-foods-a.jpg`,
  },
  'milks-dairies': {
    image: `${MOCK_IMAGE_BASE}/vanilla_greek_yogurt.jpeg`,
    hoverImage: `${MOCK_IMAGE_BASE}/vanilla_greek_yogurt.jpeg`,
  },
  fruits: {
    image: `${MOCK_IMAGE_BASE}/granny_smith_apples.jpeg`,
    hoverImage: `${MOCK_IMAGE_BASE}/granny_smith_apples.jpeg`,
  },
  'baking-material': {
    image: `${MOCK_IMAGE_BASE}/white_bread.jpeg`,
    hoverImage: `${MOCK_IMAGE_BASE}/white_bread.jpeg`,
  },
};

/** Uses the first `categories` slug after `all` to pick hero + hover images. */
export function mediaForCategories(
  categories: string[] | undefined
): { image: string; hoverImage: string } {
  const slug = categories?.find((c) => c !== 'all');
  if (slug && CATEGORY_MEDIA[slug]) {
    return CATEGORY_MEDIA[slug];
  }
  return CATEGORY_MEDIA.vegetables;
}

/**
 * Mock catalog for the demo API. Single source of truth for product listings and search.
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Seeds of Change Organic Quinoa, Brown, & Red Rice',
    category: 'Snack',
    price: 6.30,
    oldPrice: 8,
    rating: 4.5,
    ratingCount: 4.0,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables'],
    description:
      'Organic whole grains blend of quinoa, brown rice, and red rice—ready in minutes and perfect as a side or bowl base.',
    ...mediaForCategories(['all', 'vegetables']),
  },
  {
    id: 6,
    name: 'Vanilla Yogurt',
    category: 'Hodo Foods',
    price: 9.50,
    oldPrice: 12,
    rating: 4.0,
    ratingCount: 7,
    vendor: 'Stouffer',
    categories: ['all', 'milks-dairies'],
    description:
      'Creamy Greek yogurt with vanilla flavor and extra protein to keep you full through the day.',
    ...mediaForCategories(['all', 'milks-dairies']),
  },
  {
    id: 11,
    name: 'Granny Smith Apples',
    category: 'Fresh Fruit',
    price: 3.99,
    rating: 4.7,
    ratingCount: 5,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits'],
    description: 'Crisp sweet Fuji apples, perfect for snacking, baking, or lunch boxes.',
    ...mediaForCategories(['all', 'fruits']),
  },
  {
    id: 13,
    name: 'Medium Roast Ground Coffee',
    category: 'Coffees & Teas',
    price: 5,
    rating: 4.6,
    ratingCount: 12,
    vendor: 'Starbucks',
    categories: ['all', 'coffees-teas'],
    description: 'Smooth balanced medium roast ground coffee for drip or pour-over.',
    ...mediaForCategories(['all', 'coffees-teas']),
  },
  {
    id: 15,
    name: 'White Bread',
    category: 'Bread and Juice',
    price: 3.29,
    rating: 4.0,
    ratingCount: 17,
    vendor: 'Wonder',
    categories: ['all', 'baking-material'],
    description: 'Soft classic sandwich bread for everyday toast and lunches.',
    ...mediaForCategories(['all', 'baking-material']),
  },
];

export function getProductById(id: number): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export function countProductsWithCategorySlug(slug: string): number {
  return MOCK_PRODUCTS.filter((p) => p.categories?.includes(slug)).length;
}

/** Other products for “new products” / gallery thumbs (stable order). */
export function getProductsExcept(id: number, limit: number): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.id !== id).slice(0, limit);
}

export function filterMockProducts(
  products: Product[],
  opts: { q?: string | null; category?: string | null }
): Product[] {
  let list = [...products];

  const category = opts.category?.trim();
  if (category && category !== 'all') {
    list = list.filter((p) => p.categories?.includes(category) ?? false);
  }

  const q = opts.q?.trim().toLowerCase();
  if (q) {
    list = list.filter((p) => {
      const haystack = [p.name, p.description ?? '', p.category, p.vendor]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  return list;
}