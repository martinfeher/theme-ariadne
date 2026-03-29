'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';
import { fetchProducts } from '@/lib/fetch-products';

const PopularProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ok' | 'error'>('loading');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'milks-dairies', name: 'Milks & Dairies' },
    { id: 'coffees-teas', name: 'Coffees & Teas' },
    { id: 'pet-foods', name: 'Pet Foods' },
    { id: 'meats', name: 'Meats' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
  ];

  useEffect(() => {
    let cancelled = false;
    setLoadState('loading');
    fetchProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data.products);
          setLoadState('ok');
        }
      })
      .catch(() => {
        if (!cancelled) setLoadState('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts =
    activeTab === 'all'
      ? products
      : products.filter((product) => product.categories?.includes(activeTab) ?? false);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Popular Products</h2>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  activeTab === category.id
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-500'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loadState === 'loading' && (
          <p className="text-center text-gray-500 py-12">Loading products…</p>
        )}
        {loadState === 'error' && (
          <p className="text-center text-red-600 py-12">
            Could not load products. Please refresh the page.
          </p>
        )}
        {loadState === 'ok' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  allProducts={products}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 py-12">
                No products in this category yet.
              </p>
            )}

            {filteredProducts.length < products.length && activeTab !== 'all' && (
              <div className="text-center mt-8">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  View All Products
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
