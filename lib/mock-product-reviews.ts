export type ProductReview = {
  id: string;
  productId: number;
  author: string;
  rating: number;
  date: string;
  /** User-submitted review copy (demo only, session state). */
  title?: string;
  body?: string;
};

const REVIEWS: ProductReview[] = [
  {
    id: '21-1',
    productId: 21,
    author: 'Martina K.',
    rating: 5,
    date: '2026-05-02',
  },
  {
    id: '21-2',
    productId: 21,
    author: 'Tomáš V.',
    rating: 5,
    date: '2026-04-18',
  },
  {
    id: '21-3',
    productId: 21,
    author: 'Lucia H.',
    rating: 4,
    date: '2026-04-05',
  },
  {
    id: '21-4',
    productId: 21,
    author: 'Peter N.',
    rating: 5,
    date: '2026-03-22',
  },
  {
    id: '21-5',
    productId: 21,
    author: 'Eva S.',
    rating: 4,
    date: '2026-03-10',
  },
  {
    id: '11-1',
    productId: 11,
    author: 'Jana R.',
    rating: 5,
    date: '2026-04-28',
  },
  {
    id: '11-2',
    productId: 11,
    author: 'Marek D.',
    rating: 4,
    date: '2026-04-11',
  },
  {
    id: '13-1',
    productId: 13,
    author: 'Andrea P.',
    rating: 5,
    date: '2026-05-08',
  },
  {
    id: '13-2',
    productId: 13,
    author: 'Filip B.',
    rating: 4,
    date: '2026-04-20',
  },
  {
    id: '6-1',
    productId: 6,
    author: 'Zuzana L.',
    rating: 4,
    date: '2026-04-15',
  },
  {
    id: '6-2',
    productId: 6,
    author: 'Oliver T.',
    rating: 5,
    date: '2026-03-30',
  },
];

const FALLBACK_IDS = ['fb-1', 'fb-2', 'fb-3'] as const;

export function getReviewsForProduct(productId: number): ProductReview[] {
  const specific = REVIEWS.filter((r) => r.productId === productId);
  if (specific.length > 0) return specific;

  return FALLBACK_IDS.map((id, index) => ({
    id: `${productId}-${id}`,
    productId,
    author: ['Anna M.', 'Chris W.', 'Nina F.'][index],
    rating: [5, 4, 4][index],
    date: ['2026-04-10', '2026-03-28', '2026-03-15'][index],
  }));
}

export function getRatingDistribution(reviews: ProductReview[]) {
  const counts = [0, 0, 0, 0, 0];
  for (const review of reviews) {
    const star = Math.min(5, Math.max(1, Math.round(review.rating)));
    counts[star - 1] += 1;
  }
  const total = reviews.length || 1;
  return [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: counts[star - 1],
    percent: Math.round((counts[star - 1] / total) * 100),
  }));
}

export function averageRating(reviews: ProductReview[], fallback = 4.5): number {
  if (reviews.length === 0) return fallback;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
