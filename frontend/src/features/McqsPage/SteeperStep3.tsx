'use client';

import { Button } from '@muzammil328/ui';
import { ChevronLeft } from 'lucide-react';
import { Step1Data } from './index';

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'active' | 'inactive';
}

interface SteepperStep3Props {
  step1Data: Step1Data;
  questions: Question[];
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export function SteepperStep3({
  step1Data,
  questions,
  onSubmit,
  onBack,
  isLoading,
}: SteepperStep3Props) {
  const getStatusLabel = (status: string) => {
    return status === 'active' ? 'Active' : 'Inactive';
  };

  const getDifficultyLabel = (difficulty: string) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Class</span>
            <p className="font-medium">
              {step1Data.className || step1Data.classId || 'Not selected'}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Book</span>
            <p className="font-medium">
              {step1Data.bookName || step1Data.bookId || 'Not selected'}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Chapter</span>
            <p className="font-medium">
              {step1Data.chapterName || step1Data.chapterId || 'Not selected'}
            </p>
          </div>
          {step1Data.headingName && (
            <div>
              <span className="text-sm text-gray-500">Heading</span>
              <p className="font-medium">{step1Data.headingName}</p>
            </div>
          )}
          {step1Data.subHeadingName && (
            <div>
              <span className="text-sm text-gray-500">Sub Heading</span>
              <p className="font-medium">{step1Data.subHeadingName}</p>
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Questions Summary ({questions.length} total)</h3>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="border rounded p-3 bg-white">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">Question {index + 1}</span>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                    {getDifficultyLabel(question.difficulty)}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      question.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {getStatusLabel(question.status)}
                  </span>
                </div>
              </div>
              <p className="text-sm mb-2">{question.question}</p>
              <div className="space-y-1">
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`text-sm p-1 rounded ${
                      optIndex === question.correctOption
                        ? 'bg-green-50 text-green-800 font-medium'
                        : ''
                    }`}
                  >
                    {String.fromCharCode(65 + optIndex)}. {option}
                    {optIndex === question.correctOption && ' ✓'}
                  </div>
                ))}
              </div>
              {question.explanation && (
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button type="button" onClick={onBack} variant="outline">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button type="button" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? 'Creating...' : `Create ${questions.length} MCQ(s)`}
        </Button>
      </div>
    </div>
  );
}
