'use client';

import React, { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import type { Product } from '@/app/types/product';
import {
  averageRating,
  getRatingDistribution,
  getReviewsForProduct,
  type ProductReview,
} from '@/lib/mock-product-reviews';

const ACCENT = '#3BB77E';

function StarRow({
  rating,
  size = 'sm',
}: {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const filled = Math.floor(rating);
  const iconClass =
    size === 'lg' ? 'h-6 w-6' : size === 'md' ? 'h-5 w-5' : 'h-4 w-4';

  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${iconClass} ${
            i < filled ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
          }`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function InteractiveStars({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div className="flex items-center gap-1" role="group" aria-label={label}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="cursor-pointer rounded p-0.5 text-amber-400 transition-transform hover:scale-110"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
          aria-label={`${star} stars`}
        >
          <Star
            className={`h-6 w-6 ${
              star <= active ? 'fill-amber-400' : 'fill-gray-200 text-gray-200'
            }`}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

function formatReviewDate(date: string, locale: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ProductReviews({ product }: { product: Product }) {
  const t = useTranslations('ProductDetail');
  const locale = useLocale();

  const catalogReviews = useMemo(() => getReviewsForProduct(product.id), [product.id]);
  const [localReviews, setLocalReviews] = useState<ProductReview[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formBody, setFormBody] = useState('');

  const reviews = useMemo(
    () => [...localReviews, ...catalogReviews],
    [catalogReviews, localReviews]
  );

  const avg = averageRating(reviews, product.rating);
  const distribution = getRatingDistribution(reviews);

  const getReviewTitle = (review: ProductReview) => {
    if (review.title) return review.title;
    if (review.id.includes('-fb-')) {
      return t('reviewItems.fallback.title');
    }
    return t(`reviewItems.${review.id}.title` as Parameters<typeof t>[0]);
  };

  const getReviewBody = (review: ProductReview) => {
    if (review.body) return review.body;
    if (review.id.includes('-fb-')) {
      return t('reviewItems.fallback.body');
    }
    return t(`reviewItems.${review.id}.body` as Parameters<typeof t>[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formTitle.trim() || !formBody.trim()) return;

    setLocalReviews((prev) => [
      {
        id: `local-${Date.now()}`,
        productId: product.id,
        author: formName.trim(),
        rating: formRating,
        date: new Date().toISOString().slice(0, 10),
        title: formTitle.trim(),
        body: formBody.trim(),
      },
      ...prev,
    ]);
    setSubmitted(true);
    setFormName('');
    setFormTitle('');
    setFormBody('');
    setFormRating(5);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,220px)_1fr]">
        <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-5 text-center lg:text-left">
          <p className="text-4xl font-bold text-gray-900">{avg.toFixed(1)}</p>
          <div className="mt-2 flex justify-center lg:justify-start">
            <StarRow rating={avg} size="md" />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {t('reviewsBasedOn', { count: reviews.length })}
          </p>
        </div>

        <div className="space-y-2">
          {distribution.map(({ star, count, percent }) => (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span className="w-10 shrink-0 text-gray-600">
                {star} {t('reviewsStar')}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${percent}%`, backgroundColor: ACCENT }}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-gray-500">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <ul className="divide-y divide-gray-100">
        {reviews.map((review) => (
          <li key={review.id} className="py-6 first:pt-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900">{review.author}</p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {formatReviewDate(review.date, locale)}
                </p>
              </div>
              <StarRow rating={review.rating} />
            </div>
            <h4 className="mt-3 text-sm font-semibold text-gray-900">
              {getReviewTitle(review)}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {getReviewBody(review)}
            </p>
          </li>
        ))}
      </ul>

      <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-900">{t('reviewsWriteTitle')}</h3>
        <p className="mt-1 text-sm text-gray-500">{t('reviewsWriteHint')}</p>

        {submitted && (
          <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
            {t('reviewsSubmitSuccess')}
          </p>
        )}

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="review-name" className="mb-1.5 block text-sm font-medium text-gray-700">
              {t('reviewsFormName')}
            </label>
            <input
              id="review-name"
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              placeholder={t('reviewsFormNamePlaceholder')}
            />
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-gray-700">
              {t('reviewsFormRating')}
            </span>
            <InteractiveStars
              value={formRating}
              onChange={setFormRating}
              label={t('reviewsFormRating')}
            />
          </div>

          <div>
            <label htmlFor="review-title" className="mb-1.5 block text-sm font-medium text-gray-700">
              {t('reviewsFormTitle')}
            </label>
            <input
              id="review-title"
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              placeholder={t('reviewsFormTitlePlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="review-body" className="mb-1.5 block text-sm font-medium text-gray-700">
              {t('reviewsFormBody')}
            </label>
            <textarea
              id="review-body"
              rows={4}
              value={formBody}
              onChange={(e) => setFormBody(e.target.value)}
              className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              placeholder={t('reviewsFormBodyPlaceholder')}
            />
          </div>

          <button
            type="submit"
            className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: ACCENT }}
          >
            {t('reviewsFormSubmit')}
          </button>
        </form>
      </div>
    </div>
  );
}
