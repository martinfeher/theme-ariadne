'use client';

import { useTranslations } from 'next-intl';
import type { Product } from '@/app/types/product';
import { getProductDescription, getProductName } from '@/lib/product-i18n';

export function useProductI18n() {
  const tNames = useTranslations('Products.names');
  const tDescriptions = useTranslations('Products.descriptions');

  return {
    getProductName: (product: Pick<Product, 'id' | 'name'>) =>
      getProductName(product, tNames),
    getProductDescription: (product: Pick<Product, 'id' | 'name' | 'description'>) =>
      getProductDescription(product, tDescriptions),
  };
}
