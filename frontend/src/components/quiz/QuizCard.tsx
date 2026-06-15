'use client';

import { MCQSet } from '@/data/dummy-mcq-data';
import { Heading3, Para } from '@muzammil328/ui';

interface QuizCardProps {
  set: MCQSet;
  onStartQuiz: (set: MCQSet) => void;
}

export default function QuizCard({ set, onStartQuiz }: QuizCardProps) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        cursor: 'pointer',
        backgroundColor: '#fff',
      }}
      onClick={() => onStartQuiz(set)}
    >
      <Heading3>{set.name}</Heading3>
      <Para>{set.mcqs.length} Questions</Para>
      <button
        style={{
          marginTop: '8px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Start Quiz
      </button>
    </div>
  );
}
