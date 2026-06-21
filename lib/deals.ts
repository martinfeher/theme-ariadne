import type { Product } from '@/app/types/product';
import { getDiscountPercent } from '@/lib/product-discount';

export function isDealProduct(product: Product): boolean {
  return getDiscountPercent(product.price, product.oldPrice) != null;
}

export function getDealDiscount(product: Product): number {
  return getDiscountPercent(product.price, product.oldPrice) ?? 0;
}

export function getDealProducts(products: Product[]): Product[] {
  return products
    .filter(isDealProduct)
    .sort((a, b) => getDealDiscount(b) - getDealDiscount(a));
}

export function getWeeklyDealProducts(products: Product[]): Product[] {
  return getDealProducts(products).filter((p) =>
    p.categories?.includes('weekly-deals')
  );
}

export function getFeaturedDeal(products: Product[]): Product | undefined {
  const deals = getDealProducts(products);
  return deals.find((p) => p.inStock !== false) ?? deals[0];
}

export function getDealSavings(product: Product): number {
  if (product.oldPrice == null || product.oldPrice <= product.price) return 0;
  return product.oldPrice - product.price;
}

/** Demo end date for weekly deals banner — next Sunday after build reference date. */
export function getDealsEndDate(): Date {
  return new Date('2026-06-07T23:59:59');
}

export type DealSort = 'discount' | 'priceAsc' | 'priceDesc';

export function sortDealProducts(products: Product[], sort: DealSort): Product[] {
  const list = [...products];
  switch (sort) {
    case 'priceAsc':
      return list.sort((a, b) => a.price - b.price);
    case 'priceDesc':
      return list.sort((a, b) => b.price - a.price);
    default:
      return list.sort((a, b) => getDealDiscount(b) - getDealDiscount(a));
  }
}

export const DEAL_CATEGORY_TABS = [
  'all',
  'fruits',
  'vegetables',
  'milks-dairies',
  'coffees-teas',
] as const;

export type DealCategoryTab = (typeof DEAL_CATEGORY_TABS)[number];
