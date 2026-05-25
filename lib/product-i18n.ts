import type { Product } from '@/app/types/product';

type ProductTextFields = Pick<Product, 'id' | 'name' | 'description'>;

export function productTranslationKey(id: number): string {
  return String(id);
}

/** Client hook companion — pass `useTranslations('Products.names')` / descriptions. */
export function getProductName(
  product: Pick<Product, 'id' | 'name'>,
  tNames: (key: string) => string
): string {
  return tNames(productTranslationKey(product.id));
}

export function getProductDescription(
  product: ProductTextFields,
  tDescriptions: (key: string) => string
): string | undefined {
  const translated = tDescriptions(productTranslationKey(product.id)).trim();
  return translated || product.description?.trim();
}
