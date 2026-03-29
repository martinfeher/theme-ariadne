import type { Metadata } from 'next';
import CompareView from './CompareView';

export const metadata: Metadata = {
  title: 'Products Compare | Nest',
  description: 'Compare product features, prices, and ratings side by side',
};

export default function ComparePage() {
  return <CompareView />;
}
