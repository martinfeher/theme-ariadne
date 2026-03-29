import type { Metadata } from 'next';
import WishlistView from './WishlistView';

export const metadata: Metadata = {
  title: 'Your Wishlist | Nest',
  description: 'View and manage your saved products',
};

export default function WishlistPage() {
  return <WishlistView />;
}
