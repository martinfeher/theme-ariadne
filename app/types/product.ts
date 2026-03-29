export interface Product {
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
  categories?: string[];
  description?: string;
  /** When false, product is treated as out of stock (wishlist / shop UI). Defaults to in stock if omitted. */
  inStock?: boolean;
}
