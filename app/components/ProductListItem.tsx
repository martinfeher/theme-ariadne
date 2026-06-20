'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Heart, Minus, Plus, Shuffle, ShoppingCart } from 'lucide-react';
import type { Product } from '@/app/types/product';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { useCompare, MAX_COMPARE_PRODUCTS } from '@/app/context/CompareContext';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { useProductI18n } from '@/app/hooks/useProductI18n';
import { vendorHref } from '@/lib/mock-vendors';
import { getDiscountPercent } from '@/lib/product-discount';
import OrganicBadge from './OrganicBadge';
import DiscountBadge from './DiscountBadge';

type ProductListItemProps = {
  product: Product;
  flyToCartOnAdd?: boolean;
};

function StarRow({ rating, count }: { rating: number; count: number }) {
  const filled = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <svg
            key={i}
            className={`h-3.5 w-3.5 ${
              i < filled
                ? 'text-amber-400 fill-amber-400'
                : i === filled && hasHalfStar
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-200 fill-gray-200'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}

export default function ProductListItem({ product, flyToCartOnAdd = false }: ProductListItemProps) {
  const t = useTranslations('ProductCard');
  const tList = useTranslations('ShopList');
  const { getProductName, getProductDescription } = useProductI18n();
  const productName = getProductName(product);
  const description = getProductDescription(product);
  const formatPrice = useFormatCurrency();
  const { addItem, removeOne, getQuantity, flyToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare, canAdd } = useCompare();
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const inStock = product.inStock !== false;
  const wishlisted = isInWishlist(product.id);
  const compared = isInCompare(product.id);
  const compareDisabled = !canAdd(product.id) && !compared;
  const quantity = getQuantity(product.id);
  const discountPercent = getDiscountPercent(product.price, product.oldPrice);

  const categorySlug = useMemo(
    () => product.categories?.find((c) => c !== 'all') ?? 'all',
    [product.categories]
  );

  const addToCart = useCallback(() => {
    if (!inStock) return;
    const isFirstAdd = quantity === 0;
    if (flyToCartOnAdd && isFirstAdd && imageRef.current) {
      flyToCart(product.image, imageRef.current.getBoundingClientRect());
    }
    addItem(product, 1);
  }, [addItem, flyToCart, flyToCartOnAdd, inStock, product, quantity]);

  const handleCompareClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (compareDisabled) return;
      if (compared) {
        removeFromCompare(product.id);
      } else {
        addToCompare(product);
      }
    },
    [addToCompare, compareDisabled, compared, product, removeFromCompare]
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md sm:flex-row">
      <Link
        href={`/product/${product.id}`}
        className="relative block w-full shrink-0 overflow-hidden bg-gray-50 sm:w-44 md:w-52 lg:w-56"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={imageRef} className="relative aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[168px]">
          <Image
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 224px"
          />
        </div>
        {discountPercent != null && (
          <div className="absolute right-2 top-2 z-10">
            <DiscountBadge percent={discountPercent} size="xs" />
          </div>
        )}
        {product.organic && (
          <div className="absolute left-2 top-2 z-10">
            <OrganicBadge size="xs" />
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <Link
            href={`/category/${categorySlug}`}
            className="text-xs font-medium uppercase tracking-wide text-gray-500 transition-colors hover:text-green-600"
          >
            {product.category}
          </Link>
          <h3 className="mt-1 text-base font-semibold text-gray-900 transition-colors group-hover:text-green-600 sm:text-lg">
            <Link href={`/product/${product.id}`} className="line-clamp-2">
              {productName}
            </Link>
          </h3>
          {description && (
            <p className="mt-2 line-clamp-2 text-sm text-gray-600">{description}</p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <StarRow rating={product.rating} count={product.ratingCount} />
            <span className="text-sm text-gray-500">
              {t('by')}{' '}
              <Link
                href={vendorHref(product.vendor)}
                className="font-medium text-green-600 hover:text-green-700"
              >
                {product.vendor}
              </Link>
            </span>
            {!inStock && (
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                {t('outStock')}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-gray-100 pt-4">
          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-bold text-green-600">{formatPrice(product.price)}</span>
              {product.oldPrice != null && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                wishlisted
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500'
              }`}
              aria-label={wishlisted ? t('removeWishlist') : t('addWishlist')}
              aria-pressed={wishlisted}
              onClick={() => toggleWishlist(product)}
            >
              <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} aria-hidden />
            </button>
            <button
              type="button"
              disabled={compareDisabled}
              title={
                compareDisabled
                  ? t('compareFull', { max: MAX_COMPARE_PRODUCTS })
                  : compared
                    ? t('removeCompare')
                    : t('addCompare')
              }
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                compared
                  ? 'border-green-200 bg-green-50 text-green-600'
                  : compareDisabled
                    ? 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-green-200 hover:bg-green-50 hover:text-green-600'
              }`}
              aria-label={compared ? t('removeCompare') : t('addCompare')}
              aria-pressed={compared}
              onClick={handleCompareClick}
            >
              <Shuffle className="h-4 w-4" aria-hidden />
            </button>

            {inStock ? (
              quantity > 0 ? (
                <div className="inline-flex items-center rounded-lg border border-green-200 bg-green-50">
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center text-green-700 transition-colors hover:bg-green-100 cursor-pointer"
                    aria-label={t('removeFromCart')}
                    onClick={() => removeOne(product.id)}
                  >
                    <Minus className="h-4 w-4" aria-hidden />
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-green-700">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center text-green-700 transition-colors hover:bg-green-100 cursor-pointer"
                    aria-label={tList('addToCart')}
                    onClick={addToCart}
                  >
                    <Plus className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-600 cursor-pointer"
                  onClick={addToCart}
                >
                  <ShoppingCart className="h-4 w-4" aria-hidden />
                  {tList('addToCart')}
                </button>
              )
            ) : (
              <Link
                href={`/product/${product.id}`}
                className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-green-200 hover:text-green-600"
              >
                {tList('viewProduct')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
