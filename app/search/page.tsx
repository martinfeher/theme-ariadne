import { Suspense } from 'react';
import SearchResults from './SearchResults';

function SearchFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 text-gray-500">
        Loading search…
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResults />
    </Suspense>
  );
}
