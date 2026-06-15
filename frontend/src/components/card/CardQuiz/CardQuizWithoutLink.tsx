import React from 'react';
import './cardQuiz.scss';
import { Heading2 } from '@muzammil328/ui';

export default function CardQuizWithoutLink({
  name,
  options,
  description,
  tags,
}: {
  name: string;
  options: { text: string; isCorrect: boolean }[];
  description: string;
  tags: string[];
}) {
  return (
    <div className=" my-4 rounded-lg border border-border bg-background/50 p-4 mx-4">
      <Heading2 className="mb-2 text-xl font-semibold text-destructive">{name}</Heading2>

      {/* Display the list of options */}
      <ul className="mb-4 list-disc pl-5">
        {options?.map((opt, index) => (
          <li key={index} className="mb-1 text-primary capitalize">
            {opt.text}
          </li>
        ))}
      </ul>

      {/* Display the correct option */}
      <div className="correctOption mb-2 font-medium text-primary">
        The correct option is:{' '}
        <span className="capitalize">{options?.find(opt => opt.isCorrect)?.text}</span>
      </div>

      {/* Display additional paragraph content if available */}
      {description && (
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="description text-slate-500 py-3"
        ></div>
      )}

      {/* Display tags if parsedTags has items */}
      {tags?.length > 0 && (
        <div className="tags mt-2 text-sm text-gray-500">
          {tags?.map((tag: string, index: number) => (
            <span
              key={index}
              className="mr-2 capitalize inline-block rounded-md bg-background/50 border border-border px-3 py-1 text-sm text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
