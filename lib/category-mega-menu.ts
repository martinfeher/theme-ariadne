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
  /** Optional label override under Header.megaSidebarLabels */
  labelKey?: string;
  sidebarImage: string;
  subgroups: MegaMenuSubGroup[];
};

const IMG = '/images/products/mock';

/** Sidebar entries for the desktop hover mega menu. */
export const MEGA_MENU_SIDEBAR: MegaMenuSidebarItem[] = [
  {
    categorySlug: 'fruits',
    labelKey: 'produce',
    sidebarImage: `${IMG}/bananas.jpeg`,
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
    categorySlug: 'meats',
    labelKey: 'meatsSeafood',
    sidebarImage: `${IMG}/vegetables-b.jpg`,
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
    categorySlug: 'milks-dairies',
    labelKey: 'dairy',
    sidebarImage: `${IMG}/vanilla_greek_yogurt.jpeg`,
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
    categorySlug: 'baking-material',
    labelKey: 'bakery',
    sidebarImage: `${IMG}/white_bread.jpeg`,
    subgroups: [
      {
        slug: 'baking-material',
        image: `${IMG}/white_bread.jpeg`,
        sampleLinkKeys: ['breadRolls', 'pastries', 'bakingIngredients'],
      },
      {
        slug: 'baking-material',
        image: `${IMG}/organic_quinoa.jpeg`,
        sampleLinkKeys: ['cakes', 'crispbread', 'glutenFreeBakery'],
      },
    ],
  },
  {
    categorySlug: 'coffees-teas',
    labelKey: 'drinks',
    sidebarImage: `${IMG}/roast_ground_cofee.jpeg`,
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
    categorySlug: 'pet-foods',
    labelKey: 'pets',
    sidebarImage: `${IMG}/dry_dog_food.jpeg`,
    subgroups: [
      {
        slug: 'pet-foods',
        image: `${IMG}/cat_kibble.jpeg`,
        sampleLinkKeys: ['dogFood', 'catFood', 'treats'],
      },
      {
        slug: 'pet-foods',
        image: `${IMG}/dog_treats.jpeg`,
        sampleLinkKeys: ['wetFood', 'petCare', 'organicPetFood'],
      },
    ],
  },
  {
    categorySlug: 'vegetables',
    sidebarImage: `${IMG}/cherry_tomatoes.jpeg`,
    subgroups: [
      {
        slug: 'vegetables',
        image: `${IMG}/cherry_tomatoes.jpeg`,
        sampleLinkKeys: ['saladGreens', 'rootVegetables', 'tomatoesPeppers'],
      },
      {
        slug: 'fruits',
        image: `${IMG}/granny_smith_apples.jpeg`,
        sampleLinkKeys: ['citrus', 'berries', 'seasonalFruit'],
      },
    ],
  },
  {
    categorySlug: 'fresh-seafood',
    sidebarImage: `${IMG}/fresh_broccoli.jpg`,
    subgroups: [
      {
        slug: 'fresh-seafood',
        image: `${IMG}/fresh_broccoli.jpg`,
        sampleLinkKeys: ['fishFillets', 'shellfish', 'smokedFish'],
      },
      {
        slug: 'meats',
        image: `${IMG}/vegetables-b.jpg`,
        sampleLinkKeys: ['poultry', 'beefVeal', 'grillMeat'],
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
