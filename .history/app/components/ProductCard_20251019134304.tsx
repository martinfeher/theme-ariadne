'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Shuffle, Eye, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  ratingCount: number;
  vendor: string;
  image: string;
  hoverImage?: string;
  badge?: {
    type: 'hot' | 'sale' | 'new' | 'discount';
    text: string;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const renderStars = (rating: number) => {
    const percentage = (rating / 5) * 100;
    return (
      <div className="flex items-center">
        <div className="relative">
          <div className="flex text-gray-300">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <div 
            className="absolute top-0 left-0 flex text-yellow-400 overflow-hidden"
            style={{ width: `${percentage}%` }}
          >
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500 ml-2">({product.ratingCount})</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <div 
        className="relative overflow-hidden rounded-t-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-square">
            <Image
              src={isHovered && product.hoverImage ? product.hoverImage : product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Product Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-50 hover:text-blue-500 transition-colors"
            aria-label="Compare"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded ${getBadgeStyles(product.badge.type)}`}>
              {product.badge.text}
            </span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-4">
        {/* Category */}
        <Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}>
          <span className="text-sm text-gray-500 hover:text-green-500 transition-colors">
            {product.category}
          </span>
        </Link>

        {/* Product Name */}
        <h3 className="mt-2 mb-2">
          <Link href={`/product/${product.id}`} className="text-gray-800 hover:text-green-500 transition-colors line-clamp-2">
            {product.name}
          </Link>
        </h3>

        {/* Rating */}
        <div className="mb-2">
          {renderStars(product.rating)}
        </div>

        {/* Vendor */}
        <div className="mb-3">
          <span className="text-sm text-gray-500">
            By{' '}
            <Link href={`/vendor/${product.vendor.toLowerCase().replace(/\s+/g, '-')}`} className="text-green-500 hover:text-green-600">
              {product.vendor}
            </Link>
          </span>
        </div>

        {/* Price and Add to Cart */}
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
          
          <button className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 transition-colors text-sm">
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
