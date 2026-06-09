import React from 'react';

export function SmallCardSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
      <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
    </div>
  );
}

export function SmallCardSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SmallCardSkeleton key={i} />
      ))}
    </div>
  );
}
