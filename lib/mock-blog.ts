export type BlogCategory = 'recipes' | 'tips' | 'nutrition' | 'sustainability';

export type BlogTag =
  | 'seasonal'
  | 'vegetables'
  | 'organic'
  | 'pantry'
  | 'coffee'
  | 'pets'
  | 'meal-prep'
  | 'zero-waste';

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  tags: BlogTag[];
  authorSlug: string;
  image: string;
  author: string;
  publishedAt: string;
  readTimeMinutes: number;
  featured?: boolean;
};

export type BlogAuthor = {
  slug: string;
  name: string;
  avatar: string;
};

const IMAGE_BASE = '/images/products/mock';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'recipes',
  'tips',
  'nutrition',
  'sustainability',
];

export const BLOG_TAGS: BlogTag[] = [
  'seasonal',
  'vegetables',
  'organic',
  'pantry',
  'coffee',
  'pets',
  'meal-prep',
  'zero-waste',
];

export const BLOG_AUTHORS: BlogAuthor[] = [
  {
    slug: 'ariadne-team',
    name: 'Ariadne Team',
    avatar: `${IMAGE_BASE}/fruits-a.jpg`,
  },
  {
    slug: 'martina-k',
    name: 'Martina K.',
    avatar: `${IMAGE_BASE}/organic_quinoa.jpeg`,
  },
  {
    slug: 'tomas-v',
    name: 'Tomáš V.',
    avatar: `${IMAGE_BASE}/roast_ground_cofee.jpeg`,
  },
  {
    slug: 'lucia-h',
    name: 'Lucia H.',
    avatar: `${IMAGE_BASE}/cherry_tomatoes.jpeg`,
  },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'seasonal-spring-produce',
    category: 'recipes',
    tags: ['seasonal', 'vegetables', 'meal-prep'],
    authorSlug: 'ariadne-team',
    image: `${IMAGE_BASE}/fresh_broccoli.jpg`,
    author: 'Ariadne Team',
    publishedAt: '2026-03-18',
    readTimeMinutes: 5,
    featured: true,
  },
  {
    slug: 'organic-pantry-essentials',
    category: 'tips',
    tags: ['organic', 'pantry'],
    authorSlug: 'martina-k',
    image: `${IMAGE_BASE}/organic_quinoa.jpeg`,
    author: 'Martina K.',
    publishedAt: '2026-03-12',
    readTimeMinutes: 6,
  },
  {
    slug: 'coffee-at-home',
    category: 'tips',
    tags: ['coffee', 'pantry'],
    authorSlug: 'tomas-v',
    image: `${IMAGE_BASE}/roast_ground_cofee.jpeg`,
    author: 'Tomáš V.',
    publishedAt: '2026-03-05',
    readTimeMinutes: 4,
  },
  {
    slug: 'pet-food-guide',
    category: 'nutrition',
    tags: ['pets', 'organic'],
    authorSlug: 'ariadne-team',
    image: `${IMAGE_BASE}/dry_dog_food.jpeg`,
    author: 'Ariadne Team',
    publishedAt: '2026-02-28',
    readTimeMinutes: 7,
  },
  {
    slug: 'meal-prep-basics',
    category: 'recipes',
    tags: ['meal-prep', 'vegetables'],
    authorSlug: 'lucia-h',
    image: `${IMAGE_BASE}/cherry_tomatoes.jpeg`,
    author: 'Lucia H.',
    publishedAt: '2026-02-20',
    readTimeMinutes: 8,
    featured: true,
  },
  {
    slug: 'reduce-food-waste',
    category: 'sustainability',
    tags: ['zero-waste', 'seasonal'],
    authorSlug: 'ariadne-team',
    image: `${IMAGE_BASE}/valencia_oranges.jpeg`,
    author: 'Ariadne Team',
    publishedAt: '2026-02-14',
    readTimeMinutes: 5,
  },
];

export function isBlogCategory(value: string): value is BlogCategory {
  return BLOG_CATEGORIES.includes(value as BlogCategory);
}

export function isBlogTag(value: string): value is BlogTag {
  return BLOG_TAGS.includes(value as BlogTag);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return MOCK_BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return MOCK_BLOG_POSTS.filter((post) => post.category === category);
}

export function getBlogPostsByTag(tag: BlogTag): BlogPost[] {
  return MOCK_BLOG_POSTS.filter((post) => post.tags.includes(tag));
}

export function getBlogAuthorBySlug(slug: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((author) => author.slug === slug);
}

export function getBlogPostsByAuthor(authorSlug: string): BlogPost[] {
  return MOCK_BLOG_POSTS.filter((post) => post.authorSlug === authorSlug);
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | undefined;
  next: BlogPost | undefined;
} {
  const index = MOCK_BLOG_POSTS.findIndex((post) => post.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? MOCK_BLOG_POSTS[index - 1] : undefined,
    next: index < MOCK_BLOG_POSTS.length - 1 ? MOCK_BLOG_POSTS[index + 1] : undefined,
  };
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return MOCK_BLOG_POSTS.slice(0, limit);
  return MOCK_BLOG_POSTS.filter(
    (post) => post.slug !== slug && post.category === current.category
  ).slice(0, limit);
}

export function countPostsByCategory(): Record<BlogCategory, number> {
  return BLOG_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = getBlogPostsByCategory(category).length;
      return acc;
    },
    {} as Record<BlogCategory, number>
  );
}

export function countPostsByTag(): Record<BlogTag, number> {
  return BLOG_TAGS.reduce(
    (acc, tag) => {
      acc[tag] = getBlogPostsByTag(tag).length;
      return acc;
    },
    {} as Record<BlogTag, number>
  );
}

export function countPostsByAuthor(): Record<string, number> {
  return BLOG_AUTHORS.reduce<Record<string, number>>((acc, author) => {
    acc[author.slug] = getBlogPostsByAuthor(author.slug).length;
    return acc;
  }, {});
}

export type BlogArchiveFilter =
  | { type: 'all' }
  | { type: 'category'; category: BlogCategory }
  | { type: 'tag'; tag: BlogTag }
  | { type: 'author'; authorSlug: string };

export function getArchivePosts(filter: BlogArchiveFilter): BlogPost[] {
  switch (filter.type) {
    case 'all':
      return [...MOCK_BLOG_POSTS];
    case 'category':
      return getBlogPostsByCategory(filter.category);
    case 'tag':
      return getBlogPostsByTag(filter.tag);
    case 'author':
      return getBlogPostsByAuthor(filter.authorSlug);
  }
}

export function getArchiveBasePath(filter: BlogArchiveFilter): string {
  switch (filter.type) {
    case 'all':
      return '/blog';
    case 'category':
      return `/blog/category/${filter.category}`;
    case 'tag':
      return `/blog/tag/${filter.tag}`;
    case 'author':
      return `/blog/author/${filter.authorSlug}`;
  }
}
