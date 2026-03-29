import type { Product } from '@/app/types/product';

export type ProductsApiResponse = {
  products: Product[];
  total: number;
};

export async function fetchProducts(params?: {
  q?: string;
  category?: string;
}): Promise<ProductsApiResponse> {
  const sp = new URLSearchParams();
  if (params?.q?.trim()) sp.set('q', params.q.trim());
  if (params?.category?.trim() && params.category !== 'all') {
    sp.set('category', params.category.trim());
  }

  const query = sp.toString();
  const url = query ? `/api/products?${query}` : '/api/products';

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Products request failed: ${res.status}`);
  }
  return res.json() as Promise<ProductsApiResponse>;
}
