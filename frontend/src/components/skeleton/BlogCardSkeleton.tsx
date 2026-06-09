import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@muzammil328/ui';

export function BlogCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* image placeholder */}
      <div className="aspect-video w-full animate-pulse bg-muted" />
      <CardHeader className="pb-2">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-5 w-full animate-pulse rounded bg-muted" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent className="pb-2 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
      </CardFooter>
    </Card>
  );
}

export function BlogCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
