'use client';
import React, { useMemo } from 'react';
import CardSmall from '@/components/card/SmallCard';
import { Heading2 } from '@muzammil328/ui';
import { useBooks } from '@/hooks';

export default function SubjectWiseMcqs() {
  const {
    data: booksData,
    isLoading: loading,
    error,
  } = useBooks({
    status: 'active',
    page: 1,
    limit: 100,
    sort: 'name',
    sortDirection: 'asc',
  });

  const uniqueSubjects = useMemo(() => {
    const rawData = booksData?.data || [];
    if (!Array.isArray(rawData) || rawData.length === 0) return [];
    const subjectSet = new Set<string>();
    rawData.forEach((book: { name?: string }) => {
      if (book.name) subjectSet.add(book.name);
    });
    return Array.from(subjectSet).sort();
  }, [booksData]);

  if (loading) {
    return (
      <div>
        <Heading2>Subjects Wise MCQs</Heading2>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error || !uniqueSubjects.length) {
    return (
      <div>
        <Heading2>Subjects Wise MCQs</Heading2>
        <p className="text-gray-500">No subjects available</p>
      </div>
    );
  }

  return (
    <div>
      <Heading2>Subjects Wise MCQs</Heading2>
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {uniqueSubjects.map(subject => (
          <CardSmall
            key={subject}
            title={subject}
            link={`explore-topics/${subject.toLowerCase().replace(/\s+/g, '-')}`}
          />
        ))}
      </div>
    </div>
  );
}
