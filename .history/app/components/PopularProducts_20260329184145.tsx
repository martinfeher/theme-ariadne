'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';

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
      image: '/images/shop/thumbnail-3.jpg',
      hoverImage: '/images/shop/thumbnail-2.jpg',
      badge: { type: 'hot', text: 'Hot' },
      categories: ['all', 'vegetables'],
      description:
        'Organic whole grains blend of quinoa, brown rice, and red rice—ready in minutes and perfect as a side or bowl base.',
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
      image: '/images/shop/thumbnail-2.jpg',
      hoverImage: '/images/shop/thumbnail-3.jpg',
      badge: { type: 'sale', text: 'Sale' },
      categories: ['all', 'meats'],
      description:
        'Fully cooked Italian-style chicken meatballs with simple ingredients—great for pasta, subs, or weeknight dinners.',
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
      image: '/images/shop/thumbnail-3.jpg',
      badge: { type: 'new', text: 'New' },
      categories: ['all', 'coffees-teas'],
      inStock: false,
      description:
        'Sweet and salty kettle corn with a light crunch—an easy snack for movie nights or lunchboxes.',
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
      image: '/images/shop/thumbnail-2.jpg',
      categories: ['all', 'vegetables'],
      description:
        'Crispy classic buffalo wings with bold flavor—heat and serve for game day or a quick appetizer.',
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
      image: '/images/shop/thumbnail-3.jpg',
      badge: { type: 'discount', text: '-14%' },
      categories: ['all', 'pet-foods'],
      description:
        'Lightly salted almonds with a satisfying crunch—portion-friendly snacking with simple ingredients.',
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
      image: '/images/shop/thumbnail-2.jpg',
      categories: ['all', 'milks-dairies'],
      description:
        'Creamy Greek yogurt with vanilla flavor and extra protein to keep you full through the day.',
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
      image: '/images/shop/thumbnail-3.jpg',
      categories: ['all', 'coffees-teas'],
      description:
        'Crisp ginger ale in a large bottle—ideal for mixing, parties, or keeping the fridge stocked.',
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
      image: '/images/shop/thumbnail-2.jpg',
      categories: ['all', 'meats'],
      inStock: false,
      description:
        'Wild Alaskan salmon stuffed with a savory seafood blend—bake from frozen for an easy entrée.',
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
      image: '/images/shop/thumbnail-3.jpg',
      categories: ['all', 'meats'],
      description:
        'Beer-battered white fish fillets with a golden crust—family-friendly fish and chips at home.',
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
      image: '/images/shop/thumbnail-2.jpg',
      categories: ['all', 'milks-dairies'],
      description:
        'Rich caramel cone ice cream—indulgent dessert with swirls and crunchy cone pieces in every scoop.',
    },
  ];

  const filteredProducts =
    activeTab === 'all'
      ? products
      : products.filter((product) => product.categories?.includes(activeTab) ?? false);

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
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 cur ${
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
            <ProductCard key={product.id} product={product} allProducts={products} />
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
