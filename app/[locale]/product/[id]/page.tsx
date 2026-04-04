import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/app/components/Header';
import ProductDetailView from '@/app/components/ProductDetailView';
import {
  getProductById,
  getProductsExcept,
  MOCK_PRODUCTS,
} from '@/lib/mock-products';
import { routing } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; id: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    MOCK_PRODUCTS.map((p) => ({ locale, id: String(p.id) }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const product = getProductById(Number(id));
  const t = await getTranslations({ locale, namespace: 'Meta' });
  if (!product) {
    return { title: t('title') };
  }
  return {
    title: `${product.name} | ${t('title')}`,
    description: product.description ?? product.name,
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    notFound();
  }

  const product = getProductById(numericId);
  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsExcept(product.id, 12);
  const newProductsSidebar = getProductsExcept(product.id, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductDetailView
        product={product}
        relatedProducts={relatedProducts}
        newProductsSidebar={newProductsSidebar}
      />
    </div>
  );
}
