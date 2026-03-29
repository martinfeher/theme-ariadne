import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | Nest',
  description: 'Search products in our store',
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
