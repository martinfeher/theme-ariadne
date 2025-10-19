'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';

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
  categories: string[];
}

const PopularProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'milks-dairies', name: 'Milks & Dairies' },
    { id: 'coffees-teas', name: 'Coffees & Teas' },
    { id: 'pet-foods', name: 'Pet Foods' },
    { id: 'meats', name: 'Meats' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
  ];

  // Sample product data - you can replace this with actual data from your API
  const products: Product[] = [
    {
      id: 1,
      name: 'Seeds of Change Organic Quinoa, Brown, & Red Rice',
      category: 'Snack',
      price: 28.85,
      oldPrice: 32.8,
      rating: 4.5,
      ratingCount: 4.0,
      vendor: 'NestFood',
      image: '/shop/thumbnail-3.jpg',
      hoverImage: '/shop/thumbnail-2.jpg',
      badge: { type: 'hot', text: 'Hot' },
      categories: ['all', 'vegetables']
    },
    {
      id: 2,
      name: 'All Natural Italian-Style Chicken Meatballs',
      category: 'Hodo Foods',
      price: 52.85,
      oldPrice: 55.8,
      rating: 4.0,
      ratingCount: 3.5,
      vendor: 'Stouffer',
      image: '/shop/thumbnail-2.jpg',
      hoverImage: '/shop/thumbnail-3.jpg',
      badge: { type: 'sale', text: 'Sale' },
      categories: ['all', 'meats']
    },
    {
      id: 3,
      name: "Angie's Boomchickapop Sweet & Salty Kettle Corn",
      category: 'Snack',
      price: 48.85,
      oldPrice: 52.8,
      rating: 4.25,
      ratingCount: 4.0,
      vendor: 'StarKist',
      image: '/shop/thumbnail-3.jpg',
      badge: { type: 'new', text: 'New' },
      categories: ['all', 'coffees-teas']
    },
    {
      id: 4,
      name: 'Foster Farms Takeout Crispy Classic Buffalo Wings',
      category: 'Vegetables',
      price: 17.85,
      oldPrice: 19.8,
      rating: 4.5,
      ratingCount: 4.0,
      vendor: 'NestFood',
      image: '/shop/thumbnail-2.jpg',
      categories: ['all', 'vegetables']
    },
    {
      id: 5,
      name: 'Blue Diamond Almonds Lightly Salted Vegetables',
      category: 'Pet Foods',
      price: 23.85,
      oldPrice: 25.8,
      rating: 4.5,
      ratingCount: 4.0,
      vendor: 'NestFood',
      image: '/shop/thumbnail-3.jpg',
      badge: { type: 'discount', text: '-14%' },
      categories: ['all', 'pet-foods']
    },
    {
      id: 6,
      name: 'Chobani Complete Vanilla Greek Yogurt',
      category: 'Hodo Foods',
      price: 54.85,
      oldPrice: 67.8,
      rating: 4.0,
      ratingCount: 3.5,
      vendor: 'Stouffer',
      image: '/shop/thumbnail-2.jpg',
      categories: ['all', 'milks-dairies']
    },
    {
      id: 7,
      name: 'Canada Dry Ginger Ale – 2 L Bottle',
      category: 'Beverages',
      price: 32.85,
      oldPrice: 33.8,
      rating: 4.0,
      ratingCount: 3.5,
      vendor: 'NestFood',
      image: '/shop/thumbnail-3.jpg',
      categories: ['all', 'coffees-teas']
    },
    {
      id: 8,
      name: 'Encore Seafoods Stuffed Alaskan Salmon',
      category: 'Seafood',
      price: 35.85,
      oldPrice: 37.8,
      rating: 4.0,
      ratingCount: 3.5,
      vendor: 'NestFood',
      image: '/shop/thumbnail-2.jpg',
      categories: ['all', 'meats']
    },
    {
      id: 9,
      name: 'Gorton\'s Beer Battered Fish Fillets',
      category: 'Seafood',
      price: 23.85,
      oldPrice: 25.8,
      rating: 4.0,
      ratingCount: 3.5,
      vendor: 'Old El Paso',
      image: '/shop/thumbnail-3.jpg',
      categories: ['all', 'meats']
    },
    {
      id: 10,
      name: 'Haagen-Dazs Caramel Cone Ice Cream Keto',
      category: 'Cream',
      price: 22.85,
      oldPrice: 24.8,
      rating: 4.0,
      ratingCount: 3.5,
      vendor: 'Tyson',
      image: '/shop/thumbnail-2.jpg',
      categories: ['all', 'milks-dairies']
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.categories.includes(activeTab));

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Popular Products</h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Show more products if filtered results are less than total */}
        {filteredProducts.length < products.length && activeTab !== 'all' && (
          <div className="text-center mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
