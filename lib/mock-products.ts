import type { Product } from '@/app/types/product';

/**
 * Mock catalog for the demo API. Single source of truth for product listings and search.
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Seeds of Change Organic Quinoa, Brown, & Red Rice',
    category: 'Snack',
    price: 28.85,
    oldPrice: 32.8,
    rating: 4.5,
    ratingCount: 4.0,
    vendor: 'NestFood',
    image: '/images/shop/thumbnail-3.jpg',
    hoverImage: '/images/shop/thumbnail-2.jpg',
    badge: { type: 'hot', text: 'Hot' },
    categories: ['all', 'vegetables'],
    description:
      'Organic whole grains blend of quinoa, brown rice, and red rice—ready in minutes and perfect as a side or bowl base.',
  },
  {
    id: 2,
    name: 'All Natural Italian-Style Chicken Meatballs',
    category: 'Hodo Foods',
    price: 52.85,
    oldPrice: 55.8,
    rating: 4.0,
    ratingCount: 3.5,
    vendor: 'Stouffer',
    image: '/images/shop/thumbnail-2.jpg',
    hoverImage: '/images/shop/thumbnail-3.jpg',
    badge: { type: 'sale', text: 'Sale' },
    categories: ['all', 'meats'],
    description:
      'Fully cooked Italian-style chicken meatballs with simple ingredients—great for pasta, subs, or weeknight dinners.',
  },
  {
    id: 3,
    name: "Angie's Boomchickapop Sweet & Salty Kettle Corn",
    category: 'Snack',
    price: 48.85,
    oldPrice: 52.8,
    rating: 4.25,
    ratingCount: 4.0,
    vendor: 'StarKist',
    image: '/images/shop/thumbnail-3.jpg',
    badge: { type: 'new', text: 'New' },
    categories: ['all', 'coffees-teas'],
    inStock: false,
    description:
      'Sweet and salty kettle corn with a light crunch—an easy snack for movie nights or lunchboxes.',
  },
  {
    id: 4,
    name: 'Foster Farms Takeout Crispy Classic Buffalo Wings',
    category: 'Vegetables',
    price: 17.85,
    oldPrice: 19.8,
    rating: 4.5,
    ratingCount: 4.0,
    vendor: 'NestFood',
    image: '/images/shop/thumbnail-2.jpg',
    categories: ['all', 'vegetables'],
    description:
      'Crispy classic buffalo wings with bold flavor—heat and serve for game day or a quick appetizer.',
  },
  {
    id: 5,
    name: 'Blue Diamond Almonds Lightly Salted Vegetables',
    category: 'Pet Foods',
    price: 23.85,
    oldPrice: 25.8,
    rating: 4.5,
    ratingCount: 4.0,
    vendor: 'NestFood',
    image: '/images/shop/thumbnail-3.jpg',
    badge: { type: 'discount', text: '-14%' },
    categories: ['all', 'pet-foods'],
    description:
      'Lightly salted almonds with a satisfying crunch—portion-friendly snacking with simple ingredients.',
  },
  {
    id: 6,
    name: 'Chobani Complete Vanilla Greek Yogurt',
    category: 'Hodo Foods',
    price: 54.85,
    oldPrice: 67.8,
    rating: 4.0,
    ratingCount: 3.5,
    vendor: 'Stouffer',
    image: '/images/shop/thumbnail-2.jpg',
    categories: ['all', 'milks-dairies'],
    description:
      'Creamy Greek yogurt with vanilla flavor and extra protein to keep you full through the day.',
  },
  {
    id: 7,
    name: 'Canada Dry Ginger Ale – 2 L Bottle',
    category: 'Beverages',
    price: 32.85,
    oldPrice: 33.8,
    rating: 4.0,
    ratingCount: 3.5,
    vendor: 'NestFood',
    image: '/images/shop/thumbnail-3.jpg',
    categories: ['all', 'coffees-teas'],
    description:
      'Crisp ginger ale in a large bottle—ideal for mixing, parties, or keeping the fridge stocked.',
  },
  {
    id: 8,
    name: 'Encore Seafoods Stuffed Alaskan Salmon',
    category: 'Seafood',
    price: 35.85,
    oldPrice: 37.8,
    rating: 4.0,
    ratingCount: 3.5,
    vendor: 'NestFood',
    image: '/images/shop/thumbnail-2.jpg',
    categories: ['all', 'meats'],
    inStock: false,
    description:
      'Wild Alaskan salmon stuffed with a savory seafood blend—bake from frozen for an easy entrée.',
  },
  {
    id: 9,
    name: "Gorton's Beer Battered Fish Fillets",
    category: 'Seafood',
    price: 23.85,
    oldPrice: 25.8,
    rating: 4.0,
    ratingCount: 3.5,
    vendor: 'Old El Paso',
    image: '/images/shop/thumbnail-3.jpg',
    categories: ['all', 'meats'],
    description:
      'Beer-battered white fish fillets with a golden crust—family-friendly fish and chips at home.',
  },
  {
    id: 10,
    name: 'Haagen-Dazs Caramel Cone Ice Cream Keto',
    category: 'Cream',
    price: 22.85,
    oldPrice: 24.8,
    rating: 4.0,
    ratingCount: 3.5,
    vendor: 'Tyson',
    image: '/images/shop/thumbnail-2.jpg',
    categories: ['all', 'milks-dairies'],
    description:
      'Rich caramel cone ice cream—indulgent dessert with swirls and crunchy cone pieces in every scoop.',
  },
  {
    id: 11,
    name: 'Organic Fuji Apples 3 lb Bag',
    category: 'Fresh Fruit',
    price: 6.99,
    rating: 4.7,
    ratingCount: 128,
    vendor: 'NestFood',
    image: '/images/shop/thumbnail-3.jpg',
    categories: ['all', 'fruits'],
    description:
      'Crisp sweet Fuji apples, perfect for snacking, baking, or lunch boxes.',
  },
  {
    id: 12,
    name: 'Barilla Whole Grain Spaghetti',
    category: 'Baking material',
    price: 2.51,
    rating: 4.3,
    ratingCount: 89,
    vendor: 'Barilla',
    image: '/images/shop/thumbnail-2.jpg',
    categories: ['all', 'baking-material'],
    description:
      'Nutty whole grain pasta that holds sauce beautifully—ready in about 9 minutes.',
  },
  {
    id: 13,
    name: 'Starbucks Medium Roast Ground Coffee',
    category: 'Coffees & Teas',
    price: 12.0,
    rating: 4.6,
    ratingCount: 121,
    vendor: 'Starbucks',
    image: '/images/shop/thumbnail-3.jpg',
    categories: ['all', 'coffees-teas'],
    description:
      'Smooth balanced medium roast ground coffee for drip or pour-over.',
  },
  {
    id: 14,
    name: 'Fresh Atlantic Salmon Fillet',
    category: 'Fresh Seafood',
    price: 18.5,
    rating: 4.4,
    ratingCount: 56,
    vendor: 'OceanCatch',
    image: '/images/shop/thumbnail-2.jpg',
    categories: ['all', 'fresh-seafood'],
    description:
      'Skin-on salmon fillet, rich in omega-3—grill, bake, or pan-sear.',
  },
  {
    id: 15,
    name: 'Wonder Classic White Bread',
    category: 'Bread and Juice',
    price: 3.29,
    rating: 4.0,
    ratingCount: 210,
    vendor: 'Wonder',
    image: '/images/shop/thumbnail-3.jpg',
    categories: ['all', 'baking-material'],
    description:
      'Soft classic sandwich bread for everyday toast and lunches.',
  },
];

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
      const haystack = [
        p.name,
        p.description ?? '',
        p.category,
        p.vendor,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  return list;
}
