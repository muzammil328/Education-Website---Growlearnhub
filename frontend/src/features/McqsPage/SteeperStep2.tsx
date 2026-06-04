'use client';

import { useState } from 'react';
import { Button } from '@muzammil328/ui';
import { Plus, Trash2 } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { McqBulkImport } from './McqBulkImport';
import { Step1Data } from './index';
import { EntityStatus, Difficulty } from '@muzammil328/education-packages/enums';

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
  difficulty: `${Difficulty}`;
  status: `${EntityStatus}`;
}

interface SteepperStep2Props {
  questions: Question[];
  onNext: (q: Question[]) => void;
  onBack: () => void;
  step1Data: Step1Data;
}

export function SteepperStep2({ questions, onNext, onBack, step1Data }: SteepperStep2Props) {
  const [localQuestions, setLocalQuestions] = useState<Question[]>(questions);

  const addQuestion = () => {
    setLocalQuestions([
      ...localQuestions,
      {
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
        explanation: '',
        difficulty: 'medium',
        status: step1Data.status || 'active',
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (localQuestions.length > 1) {
      setLocalQuestions(localQuestions.filter((_, i) => i !== index));
    }
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const newOptions = localQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    const updated = [...localQuestions];
    updated[qIndex] = { ...updated[qIndex], options: newOptions };
    if (updated[qIndex].correctOption >= newOptions.length) {
      updated[qIndex].correctOption = 0;
    }
    setLocalQuestions(updated);
  };

  const addOption = (qIndex: number) => {
    const updated = [...localQuestions];
    updated[qIndex] = {
      ...updated[qIndex],
      options: [...updated[qIndex].options, ''],
    };
    setLocalQuestions(updated);
  };

  const handleBulkImport = (importedQuestions: Question[]) => {
    setLocalQuestions([...localQuestions, ...importedQuestions]);
  };

  const handleNext = () => {
    const isValid = localQuestions.every(
      q => q.question.trim() && q.options.filter(o => o.trim()).length >= 2
    );
    if (!isValid) {
      alert('Please fill all questions with at least 2 options');
      return;
    }
    onNext(localQuestions);
  };

  return (
    <div className="space-y-6">
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Questions</h3>
          <div className="flex gap-2">
            <McqBulkImport onImport={handleBulkImport} />
            <Button type="button" variant="outline" onClick={addQuestion}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>

        {localQuestions.map((question, questionIndex) => (
          <div key={questionIndex} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Question {questionIndex + 1}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeQuestion(questionIndex)}
                disabled={localQuestions.length <= 1}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-medium">Question Text *</span>
                <textarea
                  value={question.question}
                  onChange={e => {
                    const updated = [...localQuestions];
                    updated[questionIndex] = {
                      ...updated[questionIndex],
                      question: e.target.value,
                    };
                    setLocalQuestions(updated);
                  }}
                  placeholder="Enter your question"
                  className="w-full min-h-15 px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <span className="text-sm font-medium">Options *</span>
                <div className="space-y-2 mt-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correctOption-${questionIndex}`}
                        checked={question.correctOption === optionIndex}
                        onChange={() => {
                          const updated = [...localQuestions];
                          updated[questionIndex] = {
                            ...updated[questionIndex],
                            correctOption: optionIndex,
                          };
                          setLocalQuestions(updated);
                        }}
                        className="w-4 h-4"
                      />
                      <input
                        value={option}
                        onChange={e => {
                          const updated = [...localQuestions];
                          updated[questionIndex].options[optionIndex] = e.target.value;
                          setLocalQuestions(updated);
                        }}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="flex-1 px-3 py-2 border rounded-md"
                      />
                      {question.options.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOption(questionIndex, optionIndex)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => addOption(questionIndex)}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">Explanation</span>
                <textarea
                  value={question.explanation}
                  onChange={e => {
                    const updated = [...localQuestions];
                    updated[questionIndex] = {
                      ...updated[questionIndex],
                      explanation: e.target.value,
                    };
                    setLocalQuestions(updated);
                  }}
                  placeholder="Explain the correct answer"
                  className="w-full min-h-15 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium">Difficulty</span>
                  <select
                    value={question.difficulty}
                    onChange={e => {
                      const updated = [...localQuestions];
                      updated[questionIndex] = {
                        ...updated[questionIndex],
                        difficulty: e.target.value as 'easy' | 'medium' | 'hard',
                      };
                      setLocalQuestions(updated);
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value={Difficulty.EASY}>Easy</option>
                    <option value={Difficulty.MEDIUM}>Medium</option>
                    <option value={Difficulty.HARD}>Hard</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium">Status</span>
                  <select
                    value={question.status}
                    onChange={e => {
                      const updated = [...localQuestions];
                      updated[questionIndex] = {
                        ...updated[questionIndex],
                        status: e.target.value as 'active' | 'inactive',
                      };
                      setLocalQuestions(updated);
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value={EntityStatus.ACTIVE}>Active</option>
                    <option value={EntityStatus.INACTIVE}>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button type="button" onClick={onBack} variant="outline">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button type="button" onClick={handleNext}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
