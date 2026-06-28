import type { Product } from '@/app/types/product';

/**
 * Mock product photos live under /public/images/products/mock/.
 * Sourced from Pexels and Flickr (Creative Commons) for demo use only.
 */
const MOCK_IMAGE_BASE = '/images/products/mock';

const VANILLA_YOGURT_IMAGE = `${MOCK_IMAGE_BASE}/p2-yogurt.jpeg`;

function mockProductImage(file: string): { image: string; hoverImage: string } {
  const path = `${MOCK_IMAGE_BASE}/${file}`;
  return { image: path, hoverImage: path };
}

const CATEGORY_MEDIA: Record<string, { image: string; hoverImage: string }> = {
  vegetables: mockProductImage('organic_quinoa.jpeg'),
  'coffees-teas': mockProductImage('roast_ground_cofee.jpeg'),
  'pet-foods': mockProductImage('adult-chicken-rice-dog-food.jpeg'),
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
    id: 36,
    name: 'Green Bell Peppers',
    category: 'Fresh Vegetables',
    price: 2.19,
    rating: 4.5,
    ratingCount: 12,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables'],
    description: 'Crisp green bell peppers with a mild, sweet flavor—great raw or roasted.',
    organic: false,
    ...mockProductImage('green-bell-peppers.jpeg'),
  },
  {
    id: 37,
    name: 'Fresh Cauliflower Head',
    category: 'Fresh Vegetables',
    price: 3.29,
    rating: 4.6,
    ratingCount: 7,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables'],
    description: 'Firm white cauliflower florets ideal for roasting, mashing, or rice bowls.',
    organic: true,
    ...mockProductImage('cauliflower.jpeg'),
  },
  {
    id: 34,
    name: 'Tomatoes',
    category: 'Fresh Vegetables',
    price: 2.79,
    oldPrice: 3.49,
    rating: 4.6,
    ratingCount: 13,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables', 'weekly-deals', 'fresh-in-season'],
    description: 'Plump vine-ripened tomatoes with rich flavor for sauces, salads, and sandwiches.',
    inStock: true,
    organic: false,
    ...mockProductImage('tomatoes.png'),
  },
  {
    id: 38,
    name: 'Fresh Blueberries',
    category: 'Fresh Fruit',
    price: 5.49,
    rating: 4.8,
    ratingCount: 22,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits', 'popular-products', 'fresh-in-season', 'top-selling'],
    description: 'Plump sweet blueberries with a natural bloom—ideal for snacking, baking, and smoothies.',
    organic: false,
    ...mockProductImage('fv-blueberries.jpeg'),
  },
  {
    id: 39,
    name: 'Brussels Sprouts',
    category: 'Fresh Vegetables',
    price: 3.29,
    rating: 4.5,
    ratingCount: 10,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables', 'fresh-in-season'],
    description: 'Tight, bright green Brussels sprouts perfect for roasting, sautéing, or shaving into salads.',
    organic: false,
    ...mockProductImage('fv-brussels-sprouts.jpeg'),
  },
  {
    id: 40,
    name: 'Clementines',
    category: 'Fresh Fruit',
    price: 4.29,
    oldPrice: 4.99,
    rating: 4.7,
    ratingCount: 16,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits', 'popular-products', 'weekly-deals', 'fresh-in-season'],
    description: 'Easy-peel clementines with juicy segments—sweet, portable, and lunchbox-ready.',
    organic: true,
    ...mockProductImage('fv-clementines.jpeg'),
  },
  {
    id: 41,
    name: 'Medjool Dates',
    category: 'Fresh Fruit',
    price: 6.99,
    rating: 4.6,
    ratingCount: 14,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits'],
    description: 'Soft, caramel-sweet Medjool dates—great for energy bites, baking, and natural snacking.',
    organic: false,
    ...mockProductImage('fv-dates.jpeg'),
  },
  {
    id: 42,
    name: 'Fresh Green Beans',
    category: 'Fresh Vegetables',
    price: 2.99,
    rating: 4.6,
    ratingCount: 11,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables', 'popular-products', 'fresh-in-season'],
    description: 'Crisp tender green beans with a clean snap—steam, stir-fry, or blanch for sides.',
    organic: true,
    ...mockProductImage('fv-green-beans.jpeg'),
  },
  {
    id: 43,
    name: 'Fresh Limes',
    category: 'Fresh Fruit',
    price: 1.99,
    rating: 4.5,
    ratingCount: 9,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits'],
    description: 'Bright, fragrant limes for dressings, marinades, cocktails, and finishing dishes.',
    organic: false,
    ...mockProductImage('fv-limes.jpeg'),
  },
  {
    id: 44,
    name: 'Ripe Mango',
    category: 'Fresh Fruit',
    price: 2.49,
    rating: 4.8,
    ratingCount: 19,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits', 'popular-products', 'fresh-in-season', 'top-selling'],
    description: 'Sun-ripened mango with golden flesh and tropical sweetness—perfect fresh or in salsas.',
    organic: true,
    ...mockProductImage('fv-mango.jpeg'),
  },
  {
    id: 45,
    name: 'Baby Carrots',
    category: 'Fresh Vegetables',
    price: 2.79,
    rating: 4.4,
    ratingCount: 15,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables', 'fresh-in-season'],
    description: 'Sweet, crunchy baby carrots—ready to snack, roast, or add to soups and stews.',
    organic: false,
    ...mockProductImage('fv-baby-carrots.jpeg'),
  },
  {
    id: 46,
    name: 'Fresh Lemons',
    category: 'Fresh Fruit',
    price: 2.49,
    rating: 4.6,
    ratingCount: 12,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits', 'fresh-in-season'],
    description: 'Juicy yellow lemons with bright acidity for cooking, baking, and fresh drinks.',
    organic: true,
    ...mockProductImage('fv-lemons.jpeg'),
  },
  {
    id: 47,
    name: 'Fresh Mint',
    category: 'Fresh Vegetables',
    price: 1.99,
    rating: 4.7,
    ratingCount: 8,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables', 'fresh-in-season'],
    description: 'Fragrant mint leaves for teas, salads, sauces, and garnishing summer dishes.',
    organic: true,
    ...mockProductImage('fv-mint.jpeg'),
  },
  {
    id: 48,
    name: 'Butter Lettuce',
    category: 'Fresh Vegetables',
    price: 2.19,
    rating: 4.5,
    ratingCount: 7,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables', 'fresh-in-season'],
    description: 'Soft, cup-shaped butter lettuce with a mild flavor—ideal for wraps and salads.',
    organic: true,
    ...mockProductImage('fv-lettuce.jpeg'),
  },
  {
    id: 49,
    name: 'Garden Strawberries',
    category: 'Fresh Fruit',
    price: 4.99,
    oldPrice: 5.99,
    rating: 4.9,
    ratingCount: 24,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits', 'popular-products', 'weekly-deals', 'fresh-in-season', 'top-selling'],
    description: 'Ruby-red strawberries with green tops—sweet, juicy, and perfect for desserts.',
    organic: true,
    ...mockProductImage('fv-strawberries.jpeg'),
  },
  {
    id: 50,
    name: 'Organic Baby Spinach',
    category: 'Fresh Vegetables',
    price: 3.49,
    rating: 4.7,
    ratingCount: 18,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables', 'popular-products', 'fresh-in-season'],
    description:
      'Tender organic baby spinach in a ready-to-use clamshell—ideal for salads, smoothies, and sautés.',
    organic: true,
    ...mockProductImage('p2-spinach.jpeg'),
  },
  {
    id: 51,
    name: 'Zespri Kiwifruit',
    category: 'Fresh Fruit',
    price: 2.99,
    rating: 4.6,
    ratingCount: 13,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits', 'fresh-in-season'],
    description:
      'Fuzzy green kiwifruit with bright, tangy-sweet flesh—perfect for fruit bowls and snacking.',
    organic: true,
    ...mockProductImage('p2-kiwi.jpeg'),
  },
  {
    id: 52,
    name: 'Seeds of Change Organic Quinoa',
    category: 'Pantry',
    price: 6.49,
    oldPrice: 7.99,
    rating: 4.8,
    ratingCount: 26,
    vendor: 'Ariadne Foods',
    categories: ['all', 'vegetables', 'popular-products', 'weekly-deals', 'top-selling'],
    description:
      'Organic quinoa ready in minutes—light, fluffy, and perfect as a side or grain bowl base.',
    organic: true,
    ...mockProductImage('p2-quinoa.jpeg'),
  },
  {
    id: 53,
    name: 'Organic Vanilla Yogurt',
    category: 'Milks & Dairies',
    price: 5.99,
    rating: 4.5,
    ratingCount: 21,
    vendor: 'Stouffer',
    categories: ['all', 'milks-dairies', 'popular-products', 'top-selling'],
    description:
      'Creamy organic vanilla yogurt with real vanilla—great for breakfast, parfaits, and baking.',
    organic: true,
    ...mockProductImage('p2-yogurt.jpeg'),
  },
  {
    id: 54,
    name: 'Fresh Navel Oranges',
    category: 'Fresh Fruit',
    price: 4.59,
    rating: 4.7,
    ratingCount: 17,
    vendor: 'Ariadne Foods',
    categories: ['all', 'fruits', 'popular-products', 'fresh-in-season'],
    description:
      'Juicy navel oranges with easy-to-peel skin and sweet segments—perfect for fresh juice or snacking.',
    organic: true,
    ...mockProductImage('p2-oranges.jpeg'),
  },
  {
    id: 55,
    name: 'Organic Green Tea',
    category: 'Coffees & Teas',
    price: 4.29,
    rating: 4.6,
    ratingCount: 15,
    vendor: 'Ariadne Teas',
    categories: ['all', 'coffees-teas', 'drinks'],
    description:
      'Light organic green tea in convenient tea bags—clean, refreshing, and perfect hot or iced.',
    organic: true,
    ...mockProductImage('p2-green-tea.jpeg'),
  },
  {
    id: 56,
    name: 'Organic Jasmine Green Tea',
    category: 'Coffees & Teas',
    price: 4.49,
    rating: 4.7,
    ratingCount: 12,
    vendor: 'Ariadne Teas',
    categories: ['all', 'coffees-teas', 'drinks'],
    description:
      'Fragrant jasmine-scented green tea bags with a floral aroma and smooth, mellow cup.',
    organic: true,
    ...mockProductImage('p2-jasmine-tea.jpeg'),
  },
  {
    id: 57,
    name: 'Adult Chicken & Rice Dry Dog Food',
    category: 'Pet Foods',
    price: 18.99,
    rating: 4.8,
    ratingCount: 31,
    vendor: 'Ariadne Pet',
    categories: ['all', 'pet-foods', 'popular-products'],
    description:
      'Complete nutrition dry kibble for adult dogs—real chicken and rice formula in a 4 lb bag.',
    ...mockProductImage('adult-chicken-rice-dog-food.jpeg'),
  },
  {
    id: 58,
    name: 'High Protein Beef Wet Dog Food',
    category: 'Pet Foods',
    price: 2.49,
    rating: 4.7,
    ratingCount: 22,
    vendor: 'Ariadne Pet',
    categories: ['all', 'pet-foods'],
    description:
      'Premium wet dog food with beef flavor—high-protein recipe in a convenient single-serving can.',
    ...mockProductImage('high-protein-beef-dog-food.jpeg'),
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