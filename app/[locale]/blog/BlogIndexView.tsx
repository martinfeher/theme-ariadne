'use client';

import { Suspense } from 'react';
import BlogArchiveView from './BlogArchiveView';

type BlogIndexViewProps = {
  initialLayout: 'grid' | 'list';
};

export default function BlogIndexView({ initialLayout }: BlogIndexViewProps) {
  return (
    <Suspense fallback={null}>
      <BlogArchiveView filter={{ type: 'all' }} initialLayout={initialLayout} />
    </Suspense>
  );
}
