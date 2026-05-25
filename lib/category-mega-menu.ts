import type { CategoryShopSlug } from '@/lib/category-shop';

export type MegaMenuLink = {
  slug: CategoryShopSlug | 'all';
};

export type MegaMenuColumn = {
  /** Header.megaMenu.* translation key */
  titleKey: string;
  /** Category slug for the column title link */
  categorySlug: CategoryShopSlug | 'all';
  links: MegaMenuLink[];
};

/** Mega menu columns shown under Browse Categories. */
export const MEGA_MENU_COLUMNS: MegaMenuColumn[] = [
  {
    titleKey: 'megaFreshProduce',
    categorySlug: 'fruits',
    links: [
      { slug: 'fruits' },
      { slug: 'vegetables' },
      { slug: 'meats' },
      { slug: 'fresh-seafood' },
    ],
  },
  {
    titleKey: 'megaBreakfastDairy',
    categorySlug: 'milks-dairies',
    links: [
      { slug: 'milks-dairies' },
      { slug: 'coffees-teas' },
      { slug: 'baking-material' },
    ],
  },
  {
    titleKey: 'megaPantryPets',
    categorySlug: 'pet-foods',
    links: [
      { slug: 'pet-foods' },
      { slug: 'baking-material' },
      { slug: 'coffees-teas' },
      { slug: 'all' },
    ],
  },
];

export function categoryHref(slug: CategoryShopSlug | 'all') {
  return slug === 'all' ? '/category/all' : `/category/${slug}`;
}
