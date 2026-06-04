import React, { Suspense } from 'react';
import OnlineTestHeadingView from './OnlineTestHeadingView';
import { OnlineTestPageSkeleton } from '@/components/QuizSkeleton';

export default function OnlineTestHeadingPage({ book }: { book: string }) {
  return (
    <Suspense fallback={<OnlineTestPageSkeleton />}>
      <OnlineTestHeadingView book={book} />
    </Suspense>
  );
}
