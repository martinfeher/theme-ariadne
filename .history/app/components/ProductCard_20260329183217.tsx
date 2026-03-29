'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Shuffle } from 'lucide-react';
import { IoAdd } from 'react-icons/io5';
import { FaMinus } from "react-icons/fa6";

import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductQuickViewModal, { type ModalTab } from './ProductQuickViewModal';

interface ProductCardProps {
  product: Product;
  allProducts?: Product[];
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

const ProductCard: React.FC<ProductCardProps> = ({ product, allProducts = [] }) => {
  const { addItem, removeOne, getQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
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

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'hot':
        return 'bg-red-500 text-white';
      case 'sale':
        return 'bg-blue-500 text-white';
      case 'new':
        return 'bg-green-500 text-white';
      case 'discount':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const productCartCounter = getQuantity(product.id);

  const addToCart = () => {
    addItem(product, 1);
  };

  const removeFromCart = () => {
    removeOne(product.id);
  };

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 fill-current ${
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
        <span className="text-sm text-gray-500 ml-2">({product.ratingCount})</span>
      </div>
    );
  };

  return (
    <>
      <article
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer"
        onClick={openQuickView}
      >
        <div
          className="relative overflow-hidden rounded-t-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-square">
            <Image
              src={isHovered && product.hoverImage ? product.hoverImage : product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div
            className="relative flex justify-end items-center -mt-[50px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="flex items-center justify-center mr-[9px] mb-[10px] space-x-1 bg-green-500 text-white px-1.5 py-1.5 transition-colors text-sm z-[100] cursor-pointer rounded-full"
              // onClick={() => addToCart()}
            >
              {productCartCounter === 0 && (
                <IoAdd className="w-6 h-6 cursor-pointer" />
              )}
              {productCartCounter > 0 && (
                <div className="w-6 h-6 text-[16px] cursor-pointer" onClick={() => addToCart()}>{productCartCounter}</div>
              )}
            </button>
            {productCartCounter > 0 && (
              <div>
                <div className="absolute top-0 right-[10px] h-[37px] w-[260px] bg-slate-200 rounded-full" />
                <div
                  className="absolute top-0 right-[10px] h-[37px] w-[238px] flex items-center space-x-1 text-white mr-4 mb-4 transition-colors text-sm z-[100] cursor-pointer rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  aria-label="Remove from cart"
                >
                  <button
                    type="button"
                    aria-label="Remove from cart"
                    onClick={() => removeFromCart()}
                    className="bg-green-500 -ml-1 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div
            className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transition-colors ${
                wishlisted
                  ? 'text-red-500 hover:bg-red-50'
                  : 'hover:bg-red-50 hover:text-red-500'
              }`}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={wishlisted}
              onClick={() => toggleWishlist(product)}
            >
              <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-50 hover:text-blue-500 transition-colors"
              aria-label="Compare"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>

          {product.badge && (
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className={`px-2 py-1 text-xs font-medium rounded ${getBadgeStyles(product.badge.type)}`}>
                {product.badge.text}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <Link
            href={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-gray-500 hover:text-green-500 transition-colors"
          >
            {product.category}
          </Link>

          <h3 className="mt-2 mb-2 text-gray-800 group-hover:text-green-500 transition-colors line-clamp-2">
            {product.name}
          </h3>

          <div className="mb-2">{renderStars(product.rating)}</div>

          <div className="mb-3" onClick={(e) => e.stopPropagation()}>
            <span className="text-sm text-gray-500">
              By{' '}
              <Link
                href={`/vendor/${product.vendor.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-green-500 hover:text-green-600"
              >
                {product.vendor}
              </Link>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-green-500">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>

      <ProductQuickViewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        similarProducts={similarProducts}
        activeTab={modalTab}
        onTabChange={setModalTab}
        onAddToCart={addToCart}
      />
    </>
  );
};

export default ProductCard;
