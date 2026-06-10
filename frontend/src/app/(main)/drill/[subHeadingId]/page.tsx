import { Suspense } from 'react';
import FocusedDrillClient from './FocusedDrillClient';

interface Props {
  params: Promise<{ subHeadingId: string }>;
}

export default async function FocusedDrillPage({ params }: Props) {
  const { subHeadingId } = await params;
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <FocusedDrillClient subHeadingId={subHeadingId} />
    </Suspense>
  );
}
