import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageShell from '@/app/components/PageShell';
import ProductDetailView from '@/app/components/ProductDetailView';
import {
  getProductById,
  getProductsExcept,
  MOCK_PRODUCTS,
} from '@/lib/mock-products';
import { getProductDescription, getProductName } from '@/lib/product-i18n';
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
  const tMeta = await getTranslations({ locale, namespace: 'Meta' });
  if (!product) {
    return { title: tMeta('title') };
  }
  const tNames = await getTranslations({ locale, namespace: 'Products.names' });
  const tDescriptions = await getTranslations({ locale, namespace: 'Products.descriptions' });
  const name = getProductName(product, tNames);
  const description = getProductDescription(product, tDescriptions) ?? name;
  return {
    title: `${name} | ${tMeta('title')}`,
    description,
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
    <PageShell>
      <ProductDetailView
        product={product}
        relatedProducts={relatedProducts}
        newProductsSidebar={newProductsSidebar}
      />
    </PageShell>
  );
}
