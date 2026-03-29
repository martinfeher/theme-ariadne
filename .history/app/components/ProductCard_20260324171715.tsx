'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Shuffle, Eye } from 'lucide-react';
import { IoAdd, IoTrashOutline } from "react-icons/io5";
// import { IoTrashOutline } from "react-icons/io5";

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
  const [productCartCounter, setProductCartCounter] = useState(0);

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

  const addToCart = (productId: number) => {
    setClickAddToCart(true);
    setProductCartCounter(productCartCounter + 1);
    // console.log('addToCart', productId);
  }

  const removeFromCart = (productId: number) => {
    setClickAddToCart(false);
  }

  const [clickAddToCart, setClickAddToCart] = useState(false);

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
          <div className="relative flex justify-end items-center -mt-[50px]">
            <button
              className="flex items-center space-x-1 bg-green-500 text-white px-1.5 py-1.5 mr-4 mb-4 transition-colors text-sm z-100 cursor-pointer rounded-full"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product.id);
              }}
            >
              {!productCartCounter
                <IoAdd className="w-6 h-6" />
              }
                {productCartCounter > 0 && (
                  <div>{productCartCounter}</div>
                )}
            </button>
            {clickAddToCart && (
              <div>
                <div className="absolute top-0 right-[10px] h-[37px] w-[260px] bg-green-500 rounded-full"></div>
                <button
                  className="absolute top-0 right-[10px] h-[37px] w-[238px] flex items-center space-x-1 text-white px-1.5 py-1.5 mr-4 mb-4 transition-colors text-sm z-100 cursor-pointer rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromCart(product.id);
                  }}
                  aria-label="Remove from cart"
                >
                  <IoTrashOutline className="w-6 h-6" />
                </button>
              </div>
            )}
            {/* <div className="absolute top-0 right-[10px] h-[37px] w-[260px] bg-green-500 rounded-full"></div>
            <button className="absolute top-0 right-[10px] h-[37px] w-[238px] flex items-center space-x-1 text-white px-1.5 py-1.5 mr-4 mb-4 transition-colors text-sm z-[100] cursor-pointer rounded-full" onClick={() => addToCart(product.id)}>
               <IoTrashOutline className="w-6 h-6" />
            </button> */}
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
          
     
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
