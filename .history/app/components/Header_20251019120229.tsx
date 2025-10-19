'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Combobox } from "@/components/ui/combobox"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { name: 'Milks and Dairies', icon: '/icons/category-1.svg' },
    { name: 'Clothing & beauty', icon: '/icons/category-2.svg' },
    { name: 'Pet Foods & Toy', icon: '/icons/category-3.svg' },
    { name: 'Baking material', icon: '/icons/category-4.svg' },
    { name: 'Fresh Fruit', icon: '/icons/category-5.svg' },
    { name: 'Wines & Drinks', icon: '/icons/category-6.svg' },
    { name: 'Fresh Seafood', icon: '/icons/category-7.svg' },
    { name: 'Fast food', icon: '/icons/category-8.svg' },
    { name: 'Vegetables', icon: '/icons/category-9.svg' },
    { name: 'Bread and Juice', icon: '/icons/category-10.svg' },
  ];

  const cartItems = [
    { id: 1, name: 'Daisy Casual Bag', price: 800, quantity: 1, image: '/shop/thumbnail-3.jpg' },
    { id: 2, name: 'Corduroy Shirts', price: 3200, quantity: 1, image: '/shop/thumbnail-2.jpg' },
  ];

  const newsItems = [
    '100% Secure delivery without contacting the courier',
    'Supper Value Deals - Save more with coupons',
    'Trendy 25silver jewelry, save up 35% off today'
  ];

  return (
    <header className="header-area header-style-1 header-height-2">
      {/* Mobile Promotion */}
      <div className="bg-green-500 text-white text-center py-2 text-sm lg:hidden">
        <span>Grand opening, <strong>up to 15%</strong> off all items. Only <strong>3 days</strong> left</span>
      </div>

      {/* Header Middle */}
      <div className="hidden lg:block py-4 bg-[#ecede2]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src="/logo.svg" alt="Nest" width={120} height={40} className="h-10 w-auto" />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {/* Category Dropdown */}
                <div className="relative border-r border-gray-200">
                  <Combobox
                    options={[
                      { value: "all", label: "All Categories" },
                      { value: "milks-dairies", label: "Milks and Dairies" },
                      { value: "wines-alcohol", label: "Wines & Alcohol" },
                      { value: "clothing-beauty", label: "Clothing & Beauty" },
                      { value: "pet-foods-toy", label: "Pet Foods & Toy" },
                      { value: "fast-food", label: "Fast food" },
                      { value: "baking-material", label: "Baking material" },
                      { value: "vegetables", label: "Vegetables" },
                      { value: "fresh-seafood", label: "Fresh Seafood" },
                      { value: "noodles-rice", label: "Noodles & Rice" },
                      { value: "ice-cream", label: "Ice cream" }
                    ]}
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    placeholder="All Categories"
                    className="w-44 border-0 rounded-none bg-transparent"
                  />
                </div>
                
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="flex-1 px-4 py-3 text-sm border-0 focus:outline-none focus:ring-0 bg-transparent placeholder-gray-400"
                />
                
                {/* Search Button */}
                <button className="bg-green-500 text-white px-6 py-3 hover:bg-green-600 transition-colors flex items-center justify-center" aria-label="Search products">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-6">
              {/* Location */}
              <div className="relative">
                <select className="bg-gray-100 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-green-500" aria-label="Select your location">
                  <option>Your Location</option>
                  <option>Alabama</option>
                  <option>Alaska</option>
                  <option>Arizona</option>
                  <option>Delaware</option>
                  <option>Florida</option>
                </select>
              </div>

              {/* Compare */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Link href="/compare" className="text-gray-600 hover:text-green-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                  </Link>
                </div>
                <span className="text-xs text-gray-500 mt-1">Compare</span>
              </div>

              {/* Wishlist */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Link href="/wishlist" className="text-gray-600 hover:text-green-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">6</span>
                  </Link>
                </div>
                <span className="text-xs text-gray-500 mt-1">Wishlist</span>
              </div>

             

              {/* Account */}
              <div className="flex flex-col items-center relative">
                <div className="relative">
                  <button 
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="text-gray-600 hover:text-green-500"
                    aria-label="Account menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                </div>
                <span className="text-xs text-gray-500 mt-1">Account</span>

                {/* Account Dropdown */}
                {isAccountOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                    <div className="py-2">
                      <Link href="/account" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        My Account
                      </Link>
                      <Link href="/order-tracking" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Order Tracking
                      </Link>
                      <Link href="/vouchers" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        My Voucher
                      </Link>
                      <Link href="/wishlist" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        My Wishlist
                      </Link>
                      <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Settings
                      </Link>
                      <hr className="my-2" />
                      <Link href="/login" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                        Sign Out
                      </Link>
                    </div>
                  </div>
                )}

                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Bottom - Navigation */}
      <div className="bg-white border-t sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <div className="lg:hidden">
              <Link href="/">
                <Image src="/logo.svg" alt="Nest" width={100} height={32} className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Categories Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  aria-label="Browse all categories"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Browse All Categories</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Categories Dropdown Menu */}
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      {categories.map((category, index) => (
                        <Link 
                          key={index}
                          href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 transition-colors"
                        >
                          <Image src={category.icon} alt={category.name} width={24} height={24} />
                          <span className="text-sm text-gray-700">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Main Navigation */}
              <nav className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Image src="/icons/icon-hot.svg" alt="Hot" width={16} height={16} />
                  <Link href="/deals" className="text-red-500 font-medium hover:text-red-600">Deals</Link>
                </div>
                
                <div className="relative group">
                  <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-green-500 font-medium">
                    <span>Home</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>

                <Link href="/about" className="text-gray-700 hover:text-green-500 font-medium">About</Link>
                
                <div className="relative group">
                  <Link href="/shop" className="flex items-center space-x-1 text-gray-700 hover:text-green-500 font-medium">
                    <span>Shop</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>

                <div className="relative group">
                  <Link href="/vendors" className="flex items-center space-x-1 text-gray-700 hover:text-green-500 font-medium">
                    <span>Vendors</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>

                <div className="relative group">
                  <Link href="/blog" className="flex items-center space-x-1 text-gray-700 hover:text-green-500 font-medium">
                    <span>Blog</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>

                <div className="relative group">
                  <Link href="/pages" className="flex items-center space-x-1 text-gray-700 hover:text-green-500 font-medium">
                    <span>Pages</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>

                <Link href="/contact" className="text-gray-700 hover:text-green-500 font-medium">Contact</Link>
              </nav>
            </div>

            {/* Hotline */}
            <div className="hidden lg:flex items-center space-x-3">
              <Image src="/icons/icon-headphone.svg" alt="Support" width={24} height={24} />
              <div>
                <p className="text-lg font-bold text-green-500">1900 - 888</p>
                <p className="text-xs text-gray-500">24/7 Support Center</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col space-y-1"
              aria-label="Toggle mobile menu"
            >
              <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-4">
              <Link href="/wishlist" className="relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">4</span>
              </Link>
              <Link href="/cart" className="relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded-r-lg" aria-label="Search products">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                <Link href="/" className="block py-2 text-gray-700 hover:text-green-500 font-medium">Home</Link>
                <Link href="/about" className="block py-2 text-gray-700 hover:text-green-500 font-medium">About</Link>
                <Link href="/shop" className="block py-2 text-gray-700 hover:text-green-500 font-medium">Shop</Link>
                <Link href="/vendors" className="block py-2 text-gray-700 hover:text-green-500 font-medium">Vendors</Link>
                <Link href="/blog" className="block py-2 text-gray-700 hover:text-green-500 font-medium">Blog</Link>
                <Link href="/contact" className="block py-2 text-gray-700 hover:text-green-500 font-medium">Contact</Link>
              </nav>

              {/* Mobile Account Links */}
              <div className="border-t pt-4 space-y-2">
                <Link href="/account" className="block py-2 text-gray-600 hover:text-green-500">My Account</Link>
                <Link href="/order-tracking" className="block py-2 text-gray-600 hover:text-green-500">Order Tracking</Link>
                <Link href="/wishlist" className="block py-2 text-gray-600 hover:text-green-500">Wishlist</Link>
                <Link href="/compare" className="block py-2 text-gray-600 hover:text-green-500">Compare</Link>
              </div>

              {/* Mobile Support */}
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">Need help? Call Us:</p>
                <p className="text-lg font-bold text-green-500">+ 1800 900</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
