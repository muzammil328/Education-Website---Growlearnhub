'use client';

import React, { useState, useEffect } from 'react';
import { Mcq, QuizAnswer, QuizResult } from '../online-tests/OnlineTestTypes';
import { RadioGroup, RadioGroupItem, Button, Progress, Card, CardContent, CardDescription, CardHeader, CardTitle,  } from '@muzammil328/ui'
import { Label, Checkbox } from '@muzammil328/ui/forms';
import { Clock, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { cn } from '@muzammil328/ui';

interface QuizProps {
  mcqs: Mcq[];
  onComplete: (result: QuizResult) => void;
  timeLimit?: number; // in seconds
}

export const Quiz: React.FC<QuizProps> = ({ mcqs, onComplete, timeLimit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit || 0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentMcq = mcqs[currentIndex];
  const progress = ((currentIndex + 1) / mcqs.length) * 100;

  // Timer effect
  useEffect(() => {
    if (timeLimit && timeRemaining > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, timeLimit, isSubmitted]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (optionId: string, isMultiple = false) => {
    const existingAnswer = answers.find(a => a.mcqId === currentMcq.id);

    if (isMultiple) {
      // Multiple choice - toggle option
      const selectedIds = existingAnswer?.selectedOptionIds || [];
      const newSelectedIds = selectedIds.includes(optionId)
        ? selectedIds.filter(id => id !== optionId)
        : [...selectedIds, optionId];

      setAnswers(prev => {
        const filtered = prev.filter(a => a.mcqId !== currentMcq.id);
        return [...filtered, { mcqId: currentMcq.id, selectedOptionIds: newSelectedIds }];
      });
    } else {
      // Single choice
      setAnswers(prev => {
        const filtered = prev.filter(a => a.mcqId !== currentMcq.id);
        return [...filtered, { mcqId: currentMcq.id, selectedOptionIds: [optionId] }];
      });
    }
  };

  const getCurrentAnswer = (): string[] => {
    return answers.find(a => a.mcqId === currentMcq.id)?.selectedOptionIds || [];
  };

  const handleNext = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    setIsSubmitted(true);

    // Calculate results
    let correctAnswers = 0;
    let wrongAnswers = 0;

    const resultAnswers = mcqs.map(mcq => {
      const userAnswer = answers.find(a => a.mcqId === mcq.id);
      const selectedOptionIds = userAnswer?.selectedOptionIds || [];
      const correctOptionIds = mcq.options.filter(opt => opt.isCorrect).map(opt => opt.id);

      // Check if answer is correct
      const isCorrect =
        selectedOptionIds.length === correctOptionIds.length &&
        selectedOptionIds.every(id => correctOptionIds.includes(id)) &&
        correctOptionIds.every(id => selectedOptionIds.includes(id));

      if (isCorrect) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }

      return {
        mcq,
        selectedOptionIds,
        isCorrect,
        correctOptionIds,
      };
    });

    const totalQuestions = mcqs.length;
    const score = correctAnswers;
    const percentage = Math.round((score / totalQuestions) * 100);

    const quizResult: QuizResult = {
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      score,
      percentage,
      answers: resultAnswers,
    };

    setResult(quizResult);
  };

  if (isSubmitted && result) {
    return (
      <div className="space-y-6">
        <Card className="border-primary">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
            <CardDescription className="text-lg">
              Your Score:{' '}
              <span className="font-bold text-primary">
                {result.score}/{result.totalQuestions}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="text-2xl font-bold text-primary">{result.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="text-2xl font-bold text-destructive">{result.wrongAnswers}</div>
                <div className="text-sm text-muted-foreground">Wrong</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <div className="text-2xl font-bold">{result.percentage}%</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Answers</h3>
              {result.answers.map((answer, idx) => (
                <Card
                  key={answer.mcq.id}
                  className={cn(
                    'border-2',
                    answer.isCorrect ? 'border-green-500' : 'border-red-500'
                  )}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">
                        {idx + 1}. {answer.mcq.name}
                      </CardTitle>
                      {answer.isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    {answer.mcq.description && (
                      <CardDescription>{answer.mcq.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {answer.mcq.options.map(option => {
                      const isSelected = answer.selectedOptionIds.includes(option.id);
                      const isCorrect = option.isCorrect;
                      const showCorrect = !answer.isCorrect && isCorrect;

                      return (
                        <div
                          key={option.id}
                          className={cn(
                            'rounded-lg border p-3',
                            isSelected && !isCorrect && 'border-red-500 bg-red-50 dark:bg-red-950',
                            showCorrect && 'border-green-500 bg-green-50 dark:bg-green-950',
                            isSelected &&
                              isCorrect &&
                              'border-green-500 bg-green-50 dark:bg-green-950'
                          )}
                        >
                          <div className="flex items-center space-x-2">
                            {isSelected && (
                              <span className="text-xs font-semibold">Your Answer</span>
                            )}
                            {showCorrect && (
                              <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                Correct Answer
                              </span>
                            )}
                            <span>{option.text}</span>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button onClick={() => onComplete(result)} className="flex-1 w-full sm:w-auto">
                Finish
              </Button>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentIndex(0);
                  setAnswers([]);
                  setResult(null);
                  setTimeRemaining(timeLimit || 0);
                }}
                className="flex-1 w-full sm:w-auto"
              >
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentAnswer = getCurrentAnswer();
  const hasMultipleCorrect = currentMcq.options.filter(opt => opt.isCorrect).length > 1;

  return (
    <div className="space-y-6">
      {/* Progress Bar - Mobile First */}
      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <span className="text-sm font-medium">
                Question {currentIndex + 1} of {mcqs.length}
              </span>
              {timeLimit && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span
                    className={cn(
                      timeRemaining < 60 && 'text-destructive font-semibold',
                      'tabular-nums'
                    )}
                  >
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground self-end sm:self-auto">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2 sm:h-4" />
        </CardContent>
      </Card>

      {/* Question Card - Mobile First */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl leading-tight">
            {currentIndex + 1}. {currentMcq.name}
          </CardTitle>
          {currentMcq.description && (
            <CardDescription className="text-sm sm:text-base mt-2">
              {currentMcq.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {hasMultipleCorrect ? (
            // Multiple choice (checkbox) - Mobile optimized
            <div className="space-y-2 sm:space-y-3">
              {currentMcq.options.map(option => {
                const isSelected = currentAnswer.includes(option.id);
                return (
                  <div
                    key={option.id}
                    className={cn(
                      'flex items-start space-x-2 sm:space-x-3 rounded-lg border p-3 sm:p-4 transition-colors',
                      isSelected && 'border-primary bg-primary/5',
                      'hover:bg-accent cursor-pointer'
                    )}
                    onClick={() => handleAnswerChange(option.id, true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleAnswerChange(option.id, true);
                      }
                    }}
                  >
                    <Checkbox
                      id={option.id}
                      checked={isSelected}
                      onCheckedChange={() => handleAnswerChange(option.id, true)}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer text-sm sm:text-base font-normal leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.text}
                    </Label>
                  </div>
                );
              })}
            </div>
          ) : (
            // Single choice (radio) - Mobile optimized
            <RadioGroup
              value={currentAnswer[0] || ''}
              onValueChange={value => handleAnswerChange(value, false)}
              className="space-y-2 sm:space-y-3"
            >
              {currentMcq.options.map(option => (
                <div
                  key={option.id}
                  className={cn(
                    'flex items-start space-x-2 sm:space-x-3 rounded-lg border p-3 sm:p-4 transition-colors cursor-pointer',
                    currentAnswer.includes(option.id) && 'border-primary bg-primary/5',
                    'hover:bg-accent'
                  )}
                  onClick={() => handleAnswerChange(option.id, false)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleAnswerChange(option.id, false);
                    }
                  }}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 cursor-pointer text-sm sm:text-base font-normal leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons - Mobile First */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          Previous
        </Button>
        <div className="flex gap-2 w-full sm:w-auto order-1 sm:order-2">
          {currentIndex === mcqs.length - 1 ? (
            <Button onClick={handleSubmit} className="bg-primary w-full sm:w-auto">
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={currentAnswer.length === 0}
              className="w-full sm:w-auto"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
