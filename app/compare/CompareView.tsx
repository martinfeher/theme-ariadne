'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import { useCompare, MAX_COMPARE_PRODUCTS } from '../context/CompareContext';
import type { Product } from '../types/product';

function isInStock(product: Product) {
  return product.inStock !== false;
}

function StarRating({ rating, ratingCount }: { rating: number; ratingCount: number }) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex flex-wrap items-center justify-center gap-0.5">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 fill-current sm:h-5 sm:w-5 ${
              i < filledStars
                ? 'text-yellow-400'
                : i === filledStars && hasHalfStar
                  ? 'text-yellow-400'
                  : 'text-gray-300'
            }`}
            viewBox="0 0 20 20"
            aria-hidden
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-500">({ratingCount})</span>
    </div>
  );
}

function descriptionText(product: Product) {
  const d = product.description?.trim();
  if (d) return d;
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
}

const labelCell =
  'w-[140px] min-w-[120px] border border-gray-200 bg-gray-50 px-3 py-6 text-center text-sm font-medium text-gray-600 sm:w-[160px]';
const dataCell =
  'min-w-[200px] border border-gray-200 px-4 py-6 text-center align-middle sm:min-w-[220px]';

export default function CompareView() {
  const { items, removeFromCompare, clearCompare } = useCompare();

  const subtitle =
    items.length === 0 ? (
      <>Add up to {MAX_COMPARE_PRODUCTS} products to compare side by side.</>
    ) : items.length === 1 ? (
      <>
        There is <span className="font-semibold text-green-600">1</span> product
        to compare.
      </>
    ) : (
      <>
        There are{' '}
        <span className="font-semibold text-green-600">{items.length}</span>{' '}
        products to compare.
      </>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-green-600" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                Home
              </Link>
            </li>
            <li className="text-gray-400" aria-hidden>
              /
            </li>
            <li>
              <Link href="/" className="hover:text-green-700">
                Shop
              </Link>
            </li>
            <li className="text-gray-400" aria-hidden>
              /
            </li>
            <li className="font-medium text-green-600">Compare</li>
          </ol>
        </nav>

        <header className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Products Compare
            </h1>
            <p className="mt-2 text-base text-gray-500">{subtitle}</p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="self-start text-sm font-medium text-gray-600 underline-offset-2 hover:text-green-600 hover:underline sm:self-auto"
            >
              Clear all
            </button>
          )}
        </header>

        {items.length === 0 ? (
          <div className="mt-12 rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <p className="text-gray-600">
              Your compare list is empty. Use the compare icon on product cards to add
              items (max {MAX_COMPARE_PRODUCTS}).
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-600"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <tbody>
                <tr>
                  <th scope="row" className={labelCell}>
                    Preview
                  </th>
                  {items.map((product) => (
                    <td key={product.id} className={dataCell}>
                      <div className="mx-auto flex max-w-[200px] flex-col items-center">
                        <Link
                          href={`/product/${product.id}`}
                          className="relative block aspect-square w-full max-w-[180px] overflow-hidden rounded-lg border border-gray-200 bg-white"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-2"
                            sizes="180px"
                          />
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className={labelCell}>
                    Name
                  </th>
                  {items.map((product) => (
                    <td key={product.id} className={dataCell}>
                      <Link
                        href={`/product/${product.id}`}
                        className="font-semibold text-gray-900 hover:text-green-600 line-clamp-3"
                      >
                        {product.name}
                      </Link>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className={labelCell}>
                    Price
                  </th>
                  {items.map((product) => (
                    <td key={product.id} className={dataCell}>
                      <span className="text-xl font-bold text-green-600 tabular-nums sm:text-2xl">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.oldPrice != null && (
                        <span className="mt-1 block text-sm text-gray-400 line-through">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className={labelCell}>
                    Rating
                  </th>
                  {items.map((product) => (
                    <td key={product.id} className={dataCell}>
                      <StarRating
                        rating={product.rating}
                        ratingCount={product.ratingCount}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className={labelCell}>
                    Description
                  </th>
                  {items.map((product) => (
                    <td key={product.id} className={dataCell}>
                      <p className="mx-auto max-w-xs text-center text-sm leading-relaxed text-gray-500">
                        {descriptionText(product)}
                      </p>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className={labelCell}>
                    Stock status
                  </th>
                  {items.map((product) => (
                    <td key={product.id} className={dataCell}>
                      {isInStock(product) ? (
                        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800">
                          Out of stock
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className={labelCell}>
                    Remove
                  </th>
                  {items.map((product) => (
                    <td key={product.id} className={dataCell}>
                      <button
                        type="button"
                        onClick={() => removeFromCompare(product.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
