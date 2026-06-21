import type { Product } from '@/app/types/product';

export const FRESH_IN_SEASON_TAG = 'fresh-in-season';

export function getFreshInSeasonProducts(products: Product[]): Product[] {
  return products.filter((p) => p.categories?.includes(FRESH_IN_SEASON_TAG));
}
