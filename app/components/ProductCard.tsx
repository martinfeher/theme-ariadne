'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { Link, useRouter } from '@/i18n/navigation';
import { Heart, Shuffle } from 'lucide-react';
import { IoAdd } from 'react-icons/io5';
import { FaMinus } from "react-icons/fa6";

import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare, MAX_COMPARE_PRODUCTS } from '../context/CompareContext';
import ProductQuickViewModal, { type ModalTab } from './ProductQuickViewModal';
import OrganicBadge from './OrganicBadge';
import DiscountBadge, { getDiscountPercent } from './DiscountBadge';
import { useProductI18n } from '@/app/hooks/useProductI18n';
import { vendorHref } from '@/lib/mock-vendors';

interface ProductCardProps {
  product: Product;
  allProducts?: Product[];
  size?: 'small' | 'medium';
  /** When true, card click opens the full product page instead of quick view. */
  linkToProductPage?: boolean;
}

function getSimilarProducts(current: Product, all: Product[]): Product[] {
  return all
    .filter((p) => p.id !== current.id)
    .filter((p) => {
      if (p.category === current.category) return true;
      const a = new Set(current.categories ?? []);
      const b = new Set(p.categories ?? []);
      for (const x of a) {
        if (x !== 'all' && b.has(x)) return true;
      }
      return false;
    })
    .slice(0, 4);
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  allProducts = [],
  size = 'medium',
  linkToProductPage = false,
}) => {
  const t = useTranslations('ProductCard');
  const router = useRouter();
  const { getProductName } = useProductI18n();
  const productName = getProductName(product);
  const formatPrice = useFormatCurrency();
  const { addItem, removeOne, getQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare, canAdd } = useCompare();
  const wishlisted = isInWishlist(product.id);
  const compared = isInCompare(product.id);
  const compareDisabled = !canAdd(product.id) && !compared;
  const inStock = product.inStock !== false;
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<ModalTab>('description');

  const similarProducts = useMemo(
    () => getSimilarProducts(product, allProducts),
    [product, allProducts]
  );

  const openQuickView = () => {
    setModalTab('description');
    setModalOpen(true);
  };

  const handleCardClick = () => {
    if (linkToProductPage) {
      router.push(`/product/${product.id}`);
      return;
    }
    openQuickView();
  };

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'hot':
        return 'bg-red-500 text-white';
      case 'sale':
        return 'bg-green-500 text-white';
      case 'new':
        return 'bg-green-500 text-white';
      case 'discount':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const productCartCounter = getQuantity(product.id);
  const discountPercent = getDiscountPercent(product.price, product.oldPrice);
  const isSmall = size === 'small';
  const badgeSize = isSmall ? 'xs' : 'md';
  const cartSliderHeight = isSmall ? 34 : 37;
  const minusBtnSize = isSmall ? 34 : 36;

  const addToCart = () => {
    if (!inStock) return;
    addItem(product, 1);
  };

  const removeFromCart = () => {
    removeOne(product.id);
  };

  const handleCompareIconClick = useCallback(
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
    [
      compareDisabled,
      compared,
      product,
      addToCompare,
      removeFromCompare,
    ]
  )

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className={`flex items-center ${isSmall ? 'scale-90 origin-left' : ''}`}>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`fill-current ${
                isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'
              } ${
                i < filledStars
                  ? 'text-yellow-400'
                  : i === filledStars && hasHalfStar
                    ? 'text-yellow-400'
                    : 'text-gray-300'
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        <span className={`text-gray-500 ml-1.5 ${isSmall ? 'text-xs' : 'text-sm'}`}>
          ({product.ratingCount})
        </span>
      </div>
    );
  };

  return (
    <>
      <article
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer"
        onClick={handleCardClick}
      >
        <div
          className="relative overflow-hidden rounded-t-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-square">
            <Image
              src={isHovered && product.hoverImage ? product.hoverImage : product.image}
              alt={productName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div
            className={`relative flex justify-end items-center ${isSmall ? '-mt-12' : '-mt-[50px]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {inStock ? (
              <>
                <button
                  type="button"
                  className={`flex items-center justify-center bg-green-500 text-white transition-colors z-40 cursor-pointer rounded-full ${
                    isSmall
                      ? 'mr-1 mb-[7px] p-1.5'
                      : 'mr-[7px] mb-[8px] space-x-1 px-1.5 py-1.5 text-sm'
                  }`}
                  onClick={() => addToCart()}
                >
                  {productCartCounter === 0 && (
                    <IoAdd className={isSmall ? 'h-5 w-5' : 'h-6 w-6'} aria-hidden />
                  )}
                  {productCartCounter > 0 && (
                    <div
                      className={`flex items-center justify-center cursor-pointer z-100 ${
                        isSmall ? 'h-5 w-5 text-xs' : 'h-6 w-6 text-[16px]'
                      }`}
                    >
                      {productCartCounter}
                    </div>
                  )}
                </button>
                {productCartCounter > 0 && (
                  <div className="pointer-events-none">
                    <div
                      className="absolute top-0 right-[10px] rounded-full bg-[#d8e7fb] opacity-92"
                      style={{
                        height: cartSliderHeight,
                        width: isSmall ? '88%' : '93.5%',
                      }}
                    />
                    <div
                      className={`absolute top-0 right-[0.5%] flex items-center space-x-1 text-white mr-4 mb-4 transition-colors z-100 cursor-pointer rounded-full ${
                        isSmall ? 'text-xs' : 'text-sm'
                      }`}
                      style={{
                        height: cartSliderHeight,
                        width: isSmall ? '80%' : '90%',
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      aria-label={t('removeFromCart')}
                    >
                      <button
                        type="button"
                        aria-label={t('removeFromCart')}
                        onClick={() => removeFromCart()}
                        className="bg-green-500 -ml-1 rounded-full flex items-center justify-center z-200 cursor-pointer pointer-events-auto"
                        style={{ width: minusBtnSize, height: minusBtnSize }}
                      >
                        <FaMinus className={isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <span
                className={`rounded-full bg-[#03ac85] font-semibold text-white z-40 ${
                  isSmall
                    ? 'mr-1 mb-1 px-2 py-0.5 text-[10px] leading-tight'
                    : 'mr-[7px] mb-[8px] px-3 py-[5px] text-xs'
                }`}
              >
                {t('outStock')}
              </span>
            )}
          </div>
          {discountPercent != null && (
            <div
              className={`absolute z-30 pointer-events-none ${
                isSmall ? 'top-1.5 right-1.5' : 'top-3 right-3'
              }`}
            >
              <DiscountBadge percent={discountPercent} size={badgeSize} />
            </div>
          )}

          <div
            className={`absolute flex flex-col opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 ${
              isSmall ? 'right-1.5 space-y-1' : 'right-3 space-y-2'
            } ${
              discountPercent != null
                ? isSmall
                  ? 'top-[34px]'
                  : 'top-12'
                : isSmall
                  ? 'top-2'
                  : 'top-3'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={`bg-white rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer ${
                isSmall ? 'h-7 w-7' : 'h-8 w-8'
              } ${
                wishlisted
                  ? 'text-red-500 hover:bg-red-50'
                  : 'hover:bg-red-50 hover:text-red-500'
              }`}
              aria-label={wishlisted ? t('removeWishlist') : t('addWishlist')}
              aria-pressed={wishlisted}
              onClick={() => toggleWishlist(product)}
            >
              <Heart
                className={`${isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'} ${wishlisted ? 'fill-current' : ''}`}
                aria-hidden
              />
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
              className={`rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer ${
                isSmall ? 'h-7 w-7' : 'h-8 w-8'
              } ${
                compared
                  ? 'bg-green-50 text-green-600 ring-1 ring-green-200'
                  : compareDisabled
                    ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                    : 'bg-white hover:text-green-500 text-gray-700'
              }`}
              aria-label={compared ? t('removeCompare') : t('addCompare')}
              aria-pressed={compared}
              onClick={handleCompareIconClick}
            >
              <Shuffle className={isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden />
            </button>
          </div>

          {inStock && product.badge && (
            <div className={`absolute pointer-events-none ${isSmall ? 'top-1.5 left-1.5' : 'top-3 left-3'}`}>
              <span
                className={`font-medium rounded ${
                  isSmall ? 'px-1.5 py-0.5 text-[10px] leading-tight' : 'px-2 py-1 text-xs'
                } ${getBadgeStyles(product.badge.type)}`}
              >
                {product.badge.text}
              </span>
            </div>
          )}

          {product.organic && (
            <div
              className={`absolute pointer-events-none ${isSmall ? 'left-1.5' : 'left-3'} ${
                inStock && product.badge
                  ? isSmall
                    ? 'top-6'
                    : 'top-11'
                  : isSmall
                    ? 'top-1.5'
                    : 'top-3'
              }`}
            >
              <OrganicBadge size={badgeSize} />
            </div>
          )}
        </div>

        <div className={isSmall ? 'p-2.5' : 'p-4'}>
          <Link
            href={`/category/${product.categories?.find((c) => c !== 'all') ?? 'all'}`}
            onClick={(e) => e.stopPropagation()}
            className={`text-gray-500 hover:text-green-500 transition-colors ${
              isSmall ? 'text-xs' : 'text-sm'
            }`}
          >
            {product.category}
          </Link>

          <h3
            className={`text-gray-800 group-hover:text-green-500 transition-colors line-clamp-2 ${
              isSmall ? 'mt-1 mb-1 text-sm leading-snug' : 'mt-2 mb-2'
            }`}
          >
            {productName}
          </h3>

          <div className={isSmall ? 'mb-1' : 'mb-2'}>{renderStars(product.rating)}</div>

          <div className={isSmall ? 'mb-2' : 'mb-3'} onClick={(e) => e.stopPropagation()}>
            <span className={`text-gray-500 ${isSmall ? 'text-xs' : 'text-sm'}`}>
              {t('by')}{' '}
              <Link
                href={vendorHref(product.vendor)}
                className="text-green-500 hover:text-green-600"
              >
                {product.vendor}
              </Link>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className={`font-semibold text-green-500 ${isSmall ? 'text-base' : 'text-lg'}`}
              >
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className={`text-gray-400 line-through ${isSmall ? 'text-xs' : 'text-sm'}`}>
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>

      {!linkToProductPage && (
        <ProductQuickViewModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          product={product}
          similarProducts={similarProducts}
          activeTab={modalTab}
          onTabChange={setModalTab}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
};

export default ProductCard;
