'use client';
import React, { Suspense } from 'react';
import './ErrorBoundary.scss';
import { CardQuizWithLinkLoader } from '@/components/card/CardQuiz/CardQuizWithLink';

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
        <p className="error-message">{error.message}.</p>
        {/* <div className="error-details">
                    <p>{error.message}</p>
                </div> */}
      </div>
    );
  }

  return <Suspense fallback={<div>Loading questions...</div>}>{children}</Suspense>;
}
