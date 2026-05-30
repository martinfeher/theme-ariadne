import type { CategoryShopSlug } from '@/lib/category-shop';

export type MegaMenuLink = {
  slug: CategoryShopSlug | 'all';
};

export type MegaMenuColumn = {
  titleKey: string;
  categorySlug: CategoryShopSlug | 'all';
  links: MegaMenuLink[];
};

export type MegaMenuSubGroup = {
  slug: CategoryShopSlug | 'all';
  image: string;
  /** Translation keys under Header.megaSubLinks */
  sampleLinkKeys: string[];
};

export type MegaMenuSidebarItem = {
  categorySlug: CategoryShopSlug;
  /** Label under Header.megaSidebarLabels */
  labelKey: string;
  icon: string;
  subgroups: MegaMenuSubGroup[];
};

const IMG = '/images/products/mock';

/** Sidebar entries — order matches the desktop mega menu layout. */
export const MEGA_MENU_SIDEBAR: MegaMenuSidebarItem[] = [
  {
    categorySlug: 'meats',
    labelKey: 'fishMeat',
    icon: '/icons/category-7.svg',
    subgroups: [
      {
        slug: 'meats',
        image: `${IMG}/vegetables-b.jpg`,
        sampleLinkKeys: ['poultry', 'beefVeal', 'porkLamb'],
      },
      {
        slug: 'fresh-seafood',
        image: `${IMG}/cherry_tomatoes.jpeg`,
        sampleLinkKeys: ['fishFillets', 'shellfish', 'smokedFish'],
      },
      {
        slug: 'meats',
        image: `${IMG}/fresh_broccoli.jpg`,
        sampleLinkKeys: ['grillMeat', 'mincedMeat', 'coldCuts'],
      },
      {
        slug: 'fresh-seafood',
        image: `${IMG}/valencia_oranges.jpeg`,
        sampleLinkKeys: ['organicMeat', 'readyToCook', 'specialtyCuts'],
      },
    ],
  },
  {
    categorySlug: 'fruits',
    labelKey: 'fruitsVegetable',
    icon: '/icons/category-5.svg',
    subgroups: [
      {
        slug: 'fruits',
        image: `${IMG}/strawberry_fruit.jpg`,
        sampleLinkKeys: ['citrus', 'berries', 'applesPears'],
      },
      {
        slug: 'vegetables',
        image: `${IMG}/fresh_broccoli.jpg`,
        sampleLinkKeys: ['saladGreens', 'rootVegetables', 'tomatoesPeppers'],
      },
      {
        slug: 'fruits',
        image: `${IMG}/valencia_oranges.jpeg`,
        sampleLinkKeys: ['seasonalFruit', 'organicFruit', 'exoticFruit'],
      },
      {
        slug: 'vegetables',
        image: `${IMG}/organic_carrots.jpeg`,
        sampleLinkKeys: ['herbs', 'preparedSalads', 'frozenVegetables'],
      },
    ],
  },
  {
    categorySlug: 'baking-material',
    labelKey: 'cookingEssentials',
    icon: '/icons/category-4.svg',
    subgroups: [
      {
        slug: 'baking-material',
        image: `${IMG}/organic_quinoa.jpeg`,
        sampleLinkKeys: ['bakingIngredients', 'breadRolls', 'crispbread'],
      },
      {
        slug: 'vegetables',
        image: `${IMG}/cherry_tomatoes.jpeg`,
        sampleLinkKeys: ['rootVegetables', 'herbs', 'tomatoesPeppers'],
      },
    ],
  },
  {
    categorySlug: 'baking-material',
    labelKey: 'biscuitsCakes',
    icon: '/icons/category-10.svg',
    subgroups: [
      {
        slug: 'baking-material',
        image: `${IMG}/white_bread.jpeg`,
        sampleLinkKeys: ['breadRolls', 'pastries', 'cakes'],
      },
      {
        slug: 'baking-material',
        image: `${IMG}/organic_quinoa.jpeg`,
        sampleLinkKeys: ['crispbread', 'glutenFreeBakery', 'bakingIngredients'],
      },
    ],
  },
  {
    categorySlug: 'vegetables',
    labelKey: 'householdTools',
    icon: '/icons/category-9.svg',
    subgroups: [
      {
        slug: 'vegetables',
        image: `${IMG}/fresh_broccoli.jpg`,
        sampleLinkKeys: ['saladGreens', 'rootVegetables', 'herbs'],
      },
      {
        slug: 'baking-material',
        image: `${IMG}/white_bread.jpeg`,
        sampleLinkKeys: ['breadRolls', 'crispbread', 'bakingIngredients'],
      },
    ],
  },
  {
    categorySlug: 'pet-foods',
    labelKey: 'petCare',
    icon: '/icons/category-3.svg',
    subgroups: [
      {
        slug: 'pet-foods',
        image: `${IMG}/dry_dog_food.jpeg`,
        sampleLinkKeys: ['dogFood', 'catFood', 'treats'],
      },
      {
        slug: 'pet-foods',
        image: `${IMG}/cat_kibble.jpeg`,
        sampleLinkKeys: ['wetFood', 'petCare', 'organicPetFood'],
      },
    ],
  },
  {
    categorySlug: 'milks-dairies',
    labelKey: 'beautyHealth',
    icon: '/icons/category-2.svg',
    subgroups: [
      {
        slug: 'milks-dairies',
        image: `${IMG}/vanilla_greek_yogurt.jpeg`,
        sampleLinkKeys: ['yogurt', 'plantBasedDairy', 'cheese'],
      },
      {
        slug: 'fruits',
        image: `${IMG}/bananas.jpeg`,
        sampleLinkKeys: ['organicFruit', 'berries', 'seasonalFruit'],
      },
    ],
  },
  {
    categorySlug: 'fruits',
    labelKey: 'jamJelly',
    icon: '/icons/category-5.svg',
    subgroups: [
      {
        slug: 'fruits',
        image: `${IMG}/strawberry_fruit.jpg`,
        sampleLinkKeys: ['berries', 'seasonalFruit', 'exoticFruit'],
      },
      {
        slug: 'baking-material',
        image: `${IMG}/white_bread.jpeg`,
        sampleLinkKeys: ['pastries', 'cakes', 'bakingIngredients'],
      },
    ],
  },
  {
    categorySlug: 'milks-dairies',
    labelKey: 'milkDairy',
    icon: '/icons/category-1.svg',
    subgroups: [
      {
        slug: 'milks-dairies',
        image: `${IMG}/vanilla_greek_yogurt.jpeg`,
        sampleLinkKeys: ['milk', 'yogurt', 'cheese'],
      },
      {
        slug: 'milks-dairies',
        image: `${IMG}/white_bread.jpeg`,
        sampleLinkKeys: ['butter', 'eggs', 'plantBasedDairy'],
      },
    ],
  },
  {
    categorySlug: 'coffees-teas',
    labelKey: 'drinks',
    icon: '/icons/category-6.svg',
    subgroups: [
      {
        slug: 'coffees-teas',
        image: `${IMG}/whole_bean_coffee.jpeg`,
        sampleLinkKeys: ['groundCoffee', 'wholeBean', 'instantCoffee'],
      },
      {
        slug: 'coffees-teas',
        image: `${IMG}/organic_green_tea.jpeg`,
        sampleLinkKeys: ['tea', 'herbalTea', 'coldDrinks'],
      },
    ],
  },
  {
    categorySlug: 'milks-dairies',
    labelKey: 'breakfast',
    icon: '/icons/category-10.svg',
    subgroups: [
      {
        slug: 'milks-dairies',
        image: `${IMG}/vanilla_greek_yogurt.jpeg`,
        sampleLinkKeys: ['milk', 'yogurt', 'eggs'],
      },
      {
        slug: 'baking-material',
        image: `${IMG}/white_bread.jpeg`,
        sampleLinkKeys: ['breadRolls', 'pastries', 'crispbread'],
      },
      {
        slug: 'coffees-teas',
        image: `${IMG}/roast_ground_cofee.jpeg`,
        sampleLinkKeys: ['groundCoffee', 'instantCoffee', 'tea'],
      },
      {
        slug: 'fruits',
        image: `${IMG}/bananas.jpeg`,
        sampleLinkKeys: ['citrus', 'berries', 'applesPears'],
      },
    ],
  },
];

/** Mega menu columns shown under Browse Categories (compact dropdown). */
export const MEGA_MENU_COLUMNS: MegaMenuColumn[] = [
  {
    titleKey: 'megaFreshProduce',
    categorySlug: 'fruits',
    links: [{ slug: 'fruits' }, { slug: 'vegetables' }, { slug: 'meats' }, { slug: 'fresh-seafood' }],
  },
  {
    titleKey: 'megaBreakfastDairy',
    categorySlug: 'milks-dairies',
    links: [{ slug: 'milks-dairies' }, { slug: 'coffees-teas' }, { slug: 'baking-material' }],
  },
  {
    titleKey: 'megaPantryPets',
    categorySlug: 'pet-foods',
    links: [{ slug: 'pet-foods' }, { slug: 'baking-material' }, { slug: 'coffees-teas' }, { slug: 'all' }],
  },
];

export function categoryHref(slug: CategoryShopSlug | 'all') {
  return slug === 'all' ? '/category/all' : `/category/${slug}`;
}
