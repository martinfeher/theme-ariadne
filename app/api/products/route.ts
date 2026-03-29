import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS, filterMockProducts } from '@/lib/mock-products';

/**
 * Mock products API.
 * Query: `q` or `search` — filter by name, description, category, vendor (case-insensitive).
 * Query: `category` — filter by category id (e.g. vegetables, milks-dairies); use `all` or omit for all.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') ?? searchParams.get('search');
  const category = searchParams.get('category');

  const products = filterMockProducts(MOCK_PRODUCTS, { q, category });

  return NextResponse.json({ products, total: products.length });
}
