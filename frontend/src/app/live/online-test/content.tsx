'use client';
import { useSearchParams } from 'next/navigation';
import LivePreviewOnlineTest from '@/features/LivePreviewOnlineTest';

export default function LiveOnlineTestContent() {
  const searchParams = useSearchParams();

  const classSlug = searchParams.get('class') || undefined;
  const bookSlug = searchParams.get('book') || undefined;
  const chapterSlug = searchParams.get('chapter') || undefined;
  const headingSlug = searchParams.get('heading') || undefined;
  const subHeadingSlug = searchParams.get('subHeading') || undefined;

  return (
    <LivePreviewOnlineTest
      classSlug={classSlug}
      bookSlug={bookSlug}
      chapterSlug={chapterSlug}
      headingSlug={headingSlug}
      subHeadingSlug={subHeadingSlug}
    />
  );
}
