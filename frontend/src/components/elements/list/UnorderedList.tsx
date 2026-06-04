import React from 'react';
import { Para } from '@muzammil328/ui';

interface ListItem {
  title?: string; // Optional title
  description: string; // Required description
}

interface UnorderedListProps {
  items: ListItem[]; // Array of list items
}

export default function UnorderedList({ items }: UnorderedListProps) {
  return (
    <div>
      <ul className="my-5 list-disc pl-6">
        {items.map((item, index) => (
          <li key={index} className="pb-1">
            {item.title && <strong className="text-lg text-primary">{item.title}:</strong>}
            <Para>{item.description}</Para>
          </li>
        ))}
      </ul>
    </div>
  );
}
