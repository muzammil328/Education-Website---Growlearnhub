'use client';

import { MCQSet } from '@/data/dummy-mcq-data';

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
      <h3>{set.name}</h3>
      <p>{set.mcqs.length} Questions</p>
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
