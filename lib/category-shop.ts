/** Slugs supported by `/category/[slug]` (aligned with catalog `categories` and header search). */
export const CATEGORY_SHOP_SLUGS = [
  'all',
  'popular-products',
  'milks-dairies',
  'drinks',
  'jam-jelly',
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

/** Subcategory label keys live under `Header.megaSubLinks`. */
export type CategorySidebarSubcategory = {
  slug: CategoryShopSlug;
  labelKey: string;
};

export type CategorySidebarGroup = {
  slug: CategoryShopSlug;
  icon: string;
  subcategories: CategorySidebarSubcategory[];
};

/** Sidebar category tree — parent rows with optional subcategory links. */
export const CATEGORY_SIDEBAR_TREE: CategorySidebarGroup[] = [
  {
    slug: 'vegetables',
    icon: '/icons/category-5.svg',
    subcategories: [
      { slug: 'vegetables', labelKey: 'saladGreens' },
      { slug: 'vegetables', labelKey: 'rootVegetables' },
      { slug: 'vegetables', labelKey: 'tomatoesPeppers' },
      { slug: 'vegetables', labelKey: 'herbs' },
    ],
  },
  {
    slug: 'fruits',
    icon: '/icons/category-5.svg',
    subcategories: [
      { slug: 'fruits', labelKey: 'citrus' },
      { slug: 'fruits', labelKey: 'berries' },
      { slug: 'fruits', labelKey: 'applesPears' },
      { slug: 'fruits', labelKey: 'seasonalFruit' },
    ],
  },
  {
    slug: 'popular-products',
    icon: '/icons/category-10.svg',
    subcategories: [],
  },
  {
    slug: 'milks-dairies',
    icon: '/icons/category-1.svg',
    subcategories: [
      { slug: 'milks-dairies', labelKey: 'milk' },
      { slug: 'milks-dairies', labelKey: 'yogurt' },
      { slug: 'milks-dairies', labelKey: 'cheese' },
      { slug: 'milks-dairies', labelKey: 'butter' },
    ],
  },
  {
    slug: 'drinks',
    icon: '/icons/category-6.svg',
    subcategories: [
      { slug: 'drinks', labelKey: 'coldDrinks' },
      { slug: 'drinks', labelKey: 'tea' },
      { slug: 'drinks', labelKey: 'herbalTea' },
    ],
  },
  {
    slug: 'jam-jelly',
    icon: '/icons/category-5.svg',
    subcategories: [
      { slug: 'jam-jelly', labelKey: 'berries' },
      { slug: 'jam-jelly', labelKey: 'seasonalFruit' },
    ],
  },
  {
    slug: 'meats',
    icon: '/icons/category-8.svg',
    subcategories: [
      { slug: 'meats', labelKey: 'poultry' },
      { slug: 'meats', labelKey: 'beefVeal' },
      { slug: 'meats', labelKey: 'porkLamb' },
      { slug: 'meats', labelKey: 'grillMeat' },
    ],
  },
  {
    slug: 'coffees-teas',
    icon: '/icons/category-6.svg',
    subcategories: [
      { slug: 'coffees-teas', labelKey: 'groundCoffee' },
      { slug: 'coffees-teas', labelKey: 'wholeBean' },
      { slug: 'coffees-teas', labelKey: 'tea' },
      { slug: 'coffees-teas', labelKey: 'herbalTea' },
    ],
  },
  {
    slug: 'pet-foods',
    icon: '/icons/category-3.svg',
    subcategories: [
      { slug: 'pet-foods', labelKey: 'dogFood' },
      { slug: 'pet-foods', labelKey: 'catFood' },
      { slug: 'pet-foods', labelKey: 'wetFood' },
      { slug: 'pet-foods', labelKey: 'treats' },
    ],
  },
  {
    slug: 'baking-material',
    icon: '/icons/category-4.svg',
    subcategories: [
      { slug: 'baking-material', labelKey: 'breadRolls' },
      { slug: 'baking-material', labelKey: 'bakingIngredients' },
      { slug: 'baking-material', labelKey: 'pastries' },
      { slug: 'baking-material', labelKey: 'crispbread' },
    ],
  },
  {
    slug: 'fresh-seafood',
    icon: '/icons/category-7.svg',
    subcategories: [
      { slug: 'fresh-seafood', labelKey: 'fishFillets' },
      { slug: 'fresh-seafood', labelKey: 'shellfish' },
      { slug: 'fresh-seafood', labelKey: 'smokedFish' },
    ],
  },
];

export const CATEGORY_SIDEBAR_ICONS: { slug: string; icon: string }[] =
  CATEGORY_SIDEBAR_TREE.map(({ slug, icon }) => ({ slug, icon }));

export function findCategorySidebarGroup(slug: string): CategorySidebarGroup | undefined {
  return CATEGORY_SIDEBAR_TREE.find(
    (group) =>
      group.slug === slug || group.subcategories.some((sub) => sub.slug === slug)
  );
}
