import React, { Suspense } from 'react';
import OnlineTestSubHeadingView from './OnlineTestSubHeadingView';
import { OnlineTestPageSkeleton } from '@/components/QuizSkeleton';

export default function OnlineTestSubHeadingPage({
  book,
  heading,
}: {
  book: string;
  heading: string;
}) {
  return (
    <div>
      <Suspense fallback={<OnlineTestPageSkeleton />}>
        <OnlineTestSubHeadingView book={book} heading={heading} />
      </Suspense>
    </div>
  );
}
