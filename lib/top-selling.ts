import type { Product } from '@/app/types/product';

export const TOP_SELLING_TAG = 'top-selling';

/** One row at the xl breakpoint (5 columns). */
export const TOP_SELLING_ROW_SIZE = 5;

export function getTopSellingProducts(products: Product[]): Product[] {
  return products
    .filter((p) => p.categories?.includes(TOP_SELLING_TAG))
    .sort((a, b) => b.ratingCount - a.ratingCount)
    .slice(0, TOP_SELLING_ROW_SIZE);
}
