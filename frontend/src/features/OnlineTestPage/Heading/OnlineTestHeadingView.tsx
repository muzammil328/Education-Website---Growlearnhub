'use client';
import React from 'react';
import { useHeadings } from '@/hooks';
import Link from 'next/link';

type HeadingListItem = {
  headingId: string;
  slug: string;
  name: string;
};

export default function OnlineTestHeadingView({ book }: { book: string }) {
  void book;
  const { data } = useHeadings({
    page: 1,
    limit: 100,
    sort: 'name',
  });
  return (
    <div className="">
      {data?.data.map((data: HeadingListItem) => (
        <div
          className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          key={data.headingId}
        >
          <Link href={data.slug}>{data.name}</Link>
        </div>
      ))}
    </div>
  );
}
