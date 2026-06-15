'use client';
import React, { Suspense } from 'react';
import './ErrorBoundary.scss';
import { CardQuizWithLinkLoader } from '@/components/card/CardQuiz/CardQuizWithLink';
import { Para } from '@muzammil328/ui';

interface McqsErrorBoundaryProps {
  error: Error | null;
  loading: boolean;
  children: React.ReactNode;
}

export function McqsSuspenseErrorBoundary({ error, loading, children }: McqsErrorBoundaryProps) {
  if (loading) {
    return <CardQuizWithLinkLoader />;
  }

  if (error) {
    return (
      <div className="error-container mt-3">
        <Para className="error-message">{error.message}.</Para>
        {/* <div className="error-details">
                    <Para>{error.message}</Para>
                </div> */}
      </div>
    );
  }

  return <Suspense fallback={<div>Loading questions...</div>}>{children}</Suspense>;
}
