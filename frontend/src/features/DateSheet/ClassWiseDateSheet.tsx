'use client';

import React from 'react';
import CardSmall from '@/components/card/SmallCard';
import { Heading2, Para } from '@muzammil328/ui';
import { useClassByNames } from '@/hooks';

interface ClassItem {
  name: string;
  slug: string;
}

interface ClassesResponse {
  data: ClassItem[];
}

export default function ClassWiseDateSheet(): React.ReactElement {
  const {
    data: classesData,
    isLoading,
    error,
  } = useClassByNames('', 'date-sheet', 'active') as {
    data: ClassesResponse | undefined;
    isLoading: boolean;
    error: Error | null;
  };

  console.log('Class-wise date sheet data:', classesData);

  if (isLoading) {
    return (
      <section>
        <Heading2>Class-wise Date Sheets</Heading2>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <Heading2>Class-wise Date Sheets</Heading2>
        <Para className="my-4 text-sm text-red-600">
          We couldn’t load the date sheet categories right now. Please try again shortly.
        </Para>
      </section>
    );
  }

  if (!classesData?.data?.length) {
    return (
      <section>
        <Heading2>Class-wise Date Sheets</Heading2>
        <Para className="my-4 text-sm text-gray-600">
          Date sheet categories are not available at the moment.
        </Para>
      </section>
    );
  }

  return (
    <section>
      <Heading2>Class-wise Date Sheets</Heading2>
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {classesData.data.map(item => (
          <CardSmall key={item.name} title={item.name} link={`${item.slug}/date-sheet`} />
        ))}
      </div>
    </section>
  );
}
