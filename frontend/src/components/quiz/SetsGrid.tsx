'use client';

import { useState } from 'react';
import { MCQSet } from '@/data/dummy-mcq-data';
import QuizCard from './QuizCard';
import QuizModal from './QuizModal';
import { Heading2, Para } from '@muzammil328/ui';

interface SetsGridProps {
  sets: MCQSet[];
  title?: string;
}

export default function SetsGrid({ sets, title = 'Available Sets' }: SetsGridProps) {
  const [selectedSet, setSelectedSet] = useState<MCQSet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartQuiz = (set: MCQSet) => {
    setSelectedSet(set);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSet(null);
  };

  if (sets.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        No sets available for this selection.
      </div>
    );
  }

  return (
    <div>
      <Heading2 style={{ marginBottom: '20px' }}>{title}</Heading2>
      <Para style={{ marginBottom: '20px', color: '#666' }}>Total sets: {sets.length}</Para>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {sets.map(set => (
          <QuizCard key={set.id} set={set} onStartQuiz={handleStartQuiz} />
        ))}
      </div>

      {selectedSet && (
        <QuizModal set={selectedSet} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
}
