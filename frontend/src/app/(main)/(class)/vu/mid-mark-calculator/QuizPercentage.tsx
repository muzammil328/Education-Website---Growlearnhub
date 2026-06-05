import React, { useEffect, useState } from 'react';
import { Input, Label } from '@muzammil328/ui';

interface QuizPercentageProps {
  calculatedQuiz: number;
  setCalculatedQuiz: (value: number) => void;
  totalQuiz: number;
  quizPercentage: number;
  setTotalQuiz: (value: number) => void;
  setQuizPercentage: (value: number) => void;
}

export default function QuizPercentage({
  calculatedQuiz,
  setCalculatedQuiz,
  totalQuiz,
  quizPercentage,
  setTotalQuiz,
  setQuizPercentage,
}: QuizPercentageProps) {
  const [obtainedQuiz, setObtainedQuiz] = useState<number>(0);

  const calculateQuizPercentage = (
    obtainedQuiz: number,
    totalQuiz: number,
    quizPercentage: number
  ): number => {
    if (totalQuiz === 0) {
      return 0;
    }

    return (obtainedQuiz / totalQuiz) * ((quizPercentage / 100) * 100);
  };
  useEffect(() => {
    const data1 = calculateQuizPercentage(obtainedQuiz, totalQuiz, quizPercentage);

    // If data1 is not undefined or null, update calculatedQuiz
    if (data1 !== undefined && data1 !== null) {
      setCalculatedQuiz(data1);
    }

    // If obtainedQuiz is null, reset calculatedQuiz to null (or a default value)
    if (obtainedQuiz === null) {
      setCalculatedQuiz(0); // or another value like 0 or '' if needed
    }
  }, [obtainedQuiz, quizPercentage, totalQuiz]);
  return (
    <div>
      <span className="mr-2 text-gray-400">Quiz Percentage:</span>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        <div className="my-2">
          <Label htmlFor="quizPercentage" />
          <Input
            name="quizPercentage"
            type="number"
            value={quizPercentage || ''}
            placeholder="Quiz Percentage"
            onChange={e => setQuizPercentage(parseInt(e.target.value))}
          />
        </div>
        <div className="my-2">
          <Label htmlFor="totalQuiz" />
          <Input
            name="totalQuiz"
            type="number"
            value={totalQuiz || ''}
            placeholder="Total Quiz Marks"
            onChange={e => setTotalQuiz(parseInt(e.target.value))}
          />
        </div>
        <div className="my-2">
          <Label htmlFor="obtainedQuiz" />
          <Input
            name="obtainedQuiz"
            type="number"
            value={obtainedQuiz || ''}
            placeholder="Obtained Quiz Marks"
            onChange={e => setObtainedQuiz(parseInt(e.target.value))}
          />
        </div>
        <span className="flex items-center justify-center">{calculatedQuiz}</span>
      </div>
    </div>
  );
}
