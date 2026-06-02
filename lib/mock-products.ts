import type { Product } from '@/app/types/product';

/**
 * Mock product photos live under /public/images/products/mock/.
 * Sourced from Pexels and Flickr (Creative Commons) for demo use only.
 */
const MOCK_IMAGE_BASE = '/images/products/mock';

const VANILLA_YOGURT_IMAGE =
  'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600&q=80';

function mockProductImage(file: string): { image: string; hoverImage: string } {
  const path = `${MOCK_IMAGE_BASE}/${file}`;
  return { image: path, hoverImage: path };
}

const CATEGORY_MEDIA: Record<string, { image: string; hoverImage: string }> = {
  vegetables: mockProductImage('organic_quinoa.jpeg'),
  'coffees-teas': mockProductImage('roast_ground_cofee.jpeg'),
  'pet-foods': mockProductImage('dry_dog_food.jpeg'),
  'jam-jelly': mockProductImage('strawberry_fruit.jpg'),
  'milks-dairies': {
    image: VANILLA_YOGURT_IMAGE,
    hoverImage: VANILLA_YOGURT_IMAGE,
  },
  fruits: mockProductImage('granny_smith_apples.jpeg'),
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
    organic: false,
    ...mockProductImage('organic_quinoa.jpeg'),
  },
  {
    id: 19,
    name: 'Fresh Broccoli Crowns',
    category: 'Fresh Vegetables',
    price: 2.99,
    rating: 4.6,
    ratingCount: 11,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables'],
    description: 'Crisp green broccoli crowns, perfect for steaming, roasting, or stir-fries.',
    organic: true,
    ...mockProductImage('fresh_broccoli.jpg'),
  },
  {
    id: 21,
    name: 'Vine-Ripened Cherry Tomatoes',
    category: 'Fresh Vegetables',
    price: 3.49,
    oldPrice: 4.29,
    rating: 4.7,
    ratingCount: 8,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables'],
    description: 'Juicy cherry tomatoes picked at peak ripeness for salads and pasta.',
    inStock: true,
    organic: true,
    ...mockProductImage('cherry_tomatoes.jpeg'),
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
    organic: true,
    ...mockProductImage('granny_smith_apples.jpeg'),
  },
  {
    id: 16,
    name: 'Fresh Strawberries',
    category: 'Fresh Fruit',
    price: 4.49,
    oldPrice: 5.99,
    rating: 4.8,
    ratingCount: 9,
    vendor: 'Ariadne Foods',
    description: 'Sweet ripe strawberries, ideal for desserts, smoothies, or eating fresh.',
    inStock: false,
    organic: true,
    ...mockProductImage('strawberry_fruit.jpg'),
  },
  {
    id: 17,
    name: 'Organic Bananas',
    category: 'Fresh Fruit',
    price: 2.29,
    rating: 4.5,
    ratingCount: 14,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits'],
    description: 'Naturally ripened organic bananas, great for breakfast bowls and baking.',
    organic: true,
    ...mockProductImage('bananas.jpeg'),
  },
  {
    id: 18,
    name: 'Valencia Oranges',
    category: 'Fresh Fruit',
    price: 3.79,
    rating: 4.6,
    ratingCount: 8,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits'],
    description: 'Juicy Valencia oranges with a bright citrus flavor—perfect for fresh juice.',
    organic: true,
    ...mockProductImage('valencia_oranges.jpeg'),
  },
  {
    id: 13,
    name: 'Medium Roast Ground Coffee',
    category: 'Coffees & Teas',
    price: 5,
    rating: 4.6,
    ratingCount: 12,
    vendor: 'Starbucks',
    categories: ['all', 'coffees-teas', 'drinks', 'popular-products'],
    description: 'Smooth balanced medium roast ground coffee for drip or pour-over.',
    ...mockProductImage('roast_ground_cofee.jpeg'),
  },
  {
    id: 26,
    name: 'Dark Roast Whole Bean Coffee',
    category: 'Coffees & Teas',
    price: 14.99,
    oldPrice: 17.99,
    rating: 4.8,
    ratingCount: 28,
    vendor: 'Ariadne Roasters',
    categories: ['all', 'coffees-teas', 'drinks', 'popular-products'],
    description:
      'Rich whole bean blend with notes of dark chocolate—freshly roasted for a bold morning cup.',
    inStock: false,
    ...mockProductImage('whole_bean_coffee.jpeg'),
  },
  {
    id: 27,
    name: 'Organic Green Tea',
    category: 'Coffees & Teas',
    price: 8.49,
    rating: 4.6,
    ratingCount: 19,
    vendor: 'Ariadne Teas',
    categories: ['all', 'coffees-teas', 'drinks', 'popular-products'],
    description:
      'Light and refreshing green tea with a clean finish—perfect hot or iced.',
    organic: true,
    ...mockProductImage('organic_green_tea.jpeg'),
  },
  {
    id: 28,
    name: 'Jasmine Pearl Green Tea',
    category: 'Coffees & Teas',
    price: 11.99,
    rating: 4.7,
    ratingCount: 14,
    vendor: 'Ariadne Teas',
    categories: ['all', 'coffees-teas', 'drinks', 'popular-products'],
    description:
      'Hand-rolled jasmine pearls that unfurl for a fragrant, floral cup with multiple infusions.',
    ...mockProductImage('jasmine_tea.jpeg'),
  },
  {
    id: 29,
    name: 'Dark Roast Espresso',
    category: 'Coffees & Teas',
    price: 12.49,
    rating: 4.5,
    ratingCount: 21,
    vendor: 'Ariadne Roasters',
    categories: ['all', 'coffees-teas', 'drinks', 'popular-products'],
    inStock: false,
    description:
      'Intense dark roast espresso with a thick crema—ideal for lattes and straight shots.',
    ...mockProductImage('dark_roast_espresso.jpeg'),
  },
  {
    id: 15,
    name: 'White Bread',
    category: 'Bread and Juice',
    price: 3.29,
    rating: 4.0,
    ratingCount: 17,
    inStock: true,
    vendor: 'Wonder',
    categories: ['all', 'baking-material'],
    description: 'Soft classic sandwich bread for everyday toast and lunches.',
    ...mediaForCategories(['all', 'baking-material']),
  },
  {
    id: 31,
    name: 'Strawberry Jam',
    category: 'Jam & Jelly',
    price: 4.79,
    oldPrice: 5.99,
    rating: 4.7,
    ratingCount: 18,
    vendor: 'Ariadne Foods',
    categories: ['all', 'jam-jelly', 'popular-products'],
    description: 'Sweet strawberry jam made from ripe berries—perfect on toast or in desserts.',
    ...mediaForCategories(['all', 'jam-jelly']),
  },
  {
    id: 32,
    name: 'Apricot Fruit Spread',
    category: 'Jam & Jelly',
    price: 4.49,
    rating: 4.6,
    ratingCount: 12,
    vendor: 'Ariadne Foods',
    categories: ['all', 'jam-jelly', 'popular-products'],
    description: 'A bright apricot spread with a smooth texture—great for pastries and breakfast bowls.',
    ...mediaForCategories(['all', 'jam-jelly']),
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