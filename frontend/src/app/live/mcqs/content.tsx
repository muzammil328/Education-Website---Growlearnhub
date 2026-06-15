'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMcqsBySlug } from '@/hooks/use-public';
import LivePreviewMcqs from '@/features/LivePreviewMcqs';
import UserLayout from '@/components/layout/UserLayout';
import { Heading2, Para } from '@muzammil328/ui';

const PAGE_TITLE = 'MCQs Practice | GrowLearnHub';

export default function LiveMcqsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const classSlug = searchParams.get('class') || undefined;
  const bookSlug = searchParams.get('book') || undefined;
  const chapterSlug = searchParams.get('chapter') || undefined;
  const headingSlug = searchParams.get('heading') || undefined;
  const subHeadingSlug = searchParams.get('subHeading') || undefined;

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useMcqsBySlug(
    classSlug,
    bookSlug,
    chapterSlug,
    headingSlug,
    subHeadingSlug,
    page,
    limit
  );

  const mcqs = Array.isArray(data?.data) ? data.data : [];
  const totalPages = data?.pagination?.totalPages ?? 0;

  if (isLoading) {
    return (
      <UserLayout title={PAGE_TITLE}>
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <Para className="text-foreground/60 font-medium">Loading questions...</Para>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout title={PAGE_TITLE}>
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <Heading2 className="text-xl font-semibold text-foreground">Error Loading Questions</Heading2>
          <Para className="text-foreground/60 text-sm">{error.message}</Para>
          <button onClick={() => router.back()} className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition text-sm font-medium">
            Go Back
          </button>
        </div>
      </UserLayout>
    );
  }

  if (mcqs.length === 0) {
    return (
      <UserLayout title={PAGE_TITLE}>
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <Heading2 className="text-xl font-semibold text-foreground">No Questions Found</Heading2>
          <Para className="text-foreground/60 text-sm">There are no MCQs available for the selected criteria.</Para>
          <button onClick={() => router.back()} className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition text-sm font-medium">
            Go Back
          </button>
        </div>
      </UserLayout>
    );
  }

  return (
    <LivePreviewMcqs
      mcqs={mcqs}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}
