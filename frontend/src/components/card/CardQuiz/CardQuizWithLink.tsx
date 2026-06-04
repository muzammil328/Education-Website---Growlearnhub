import React from 'react';
import Link from 'next/link';
import './cardQuiz.scss';
import { Skeleton } from '@muzammil328/ui';

export interface SingleQuiz {
  name: string;
  slug: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}
export default function CardQuizWithLink({ name, slug, options }: SingleQuiz) {
  return (
    <Link href={`/mcqs-point/${slug}/`}>
      <div className="cardquiz mx-2 my-3">
        <h3>{name}</h3>
        <ul>
          {options?.map((opt: { text: string; isCorrect: boolean }, index: number) => (
            <li key={index}>{opt.text}</li>
          ))}
        </ul>
        <span className="correctOption">
          The correct option is: {options.find(opt => opt.isCorrect)?.text}
        </span>
      </div>
    </Link>
  );
}

export function CardQuizWithLinkLoader() {
  return (
    <div className="border p-4 rounded-md space-y-4 mt-6">
      <Skeleton className="w-full h-[40px] rounded-md" />
      <Skeleton className="w-40 h-[20px] rounded-md" />
      <Skeleton className="w-40 h-[20px] rounded-md" />
      <Skeleton className="w-40 h-[20px] rounded-md" />
      <Skeleton className="w-40 h-[20px] rounded-md" />
      <Skeleton className="w-1/2 h-[32px] rounded-md" />
    </div>
  );
}
