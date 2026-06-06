'use client';
import React from 'react';
import Link from 'next/link';
import { useSubheadings } from '@/hooks';

type SubHeadingListItem = {
  subHeadingId: string;
  name: string;
};

export default function OnlineTestSubHeadingView({
  book,
  heading,
}: {
  book: string;
  heading: string;
}) {
  void book;
  void heading;
  const { data: subHeadingsData } = useSubheadings({
    page: 1,
    limit: 100,
    sort: 'name',
  });
  return (
    <div>
      {subHeadingsData?.data?.data?.map((data: SubHeadingListItem) => (
        <div
          className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          key={data.subHeadingId}
        >
          <Link
            href={`/live/online-test?mode=online-test&subHeading=${data.subHeadingId}&heading=${subHeadingsData.data.headingId}`}
          >
            {data.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
