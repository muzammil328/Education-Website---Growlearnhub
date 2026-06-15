'use client';

import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Heading3, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, toast } from '@muzammil328/ui';
import {
  useDropdownClasses,
  useDropdownBooks,
  useDropdownChapters,
  useDropdownHeadings,
  useDropdownSubHeadings,
  useCreateMcqs,
  useUpdateMcqs,
} from '@/hooks';
import { StatusEnum, DifficultyEnum } from '@muzammil328/education-packages/enums';
import { Plus, Trash2 } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
  examinersNote: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'active' | 'inactive';
}

interface FormValues {
  classId: string;
  bookId: string;
  chapterId: string;
  headingId: string;
  subHeadingId: string;
  status: 'active' | 'inactive';
  questions: Question[];
}

interface McqFormProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  mcqId?: string;
  onClose?: () => void;
  mode?: 'add' | 'edit' | 'view';
  initialData?: {
    classId?: string;
    bookId?: string;
    chapterId?: string;
    headingId?: string;
    subHeadingId?: string;
    status?: 'active' | 'inactive';
    questions?: Question[];
  };
}

export function McqForm({ isOpen, mcqId, onClose, mode, initialData }: McqFormProps) {
  const isView = mode === 'view';
  const dropdownsEnabled = isOpen ?? true;

  const createMcqsMutation = useCreateMcqs();
  const updateMcqsMutation = useUpdateMcqs();

  const form = useForm<FormValues>({
    defaultValues: {
      classId: initialData?.classId || '',
      bookId: initialData?.bookId || '',
      chapterId: initialData?.chapterId || '',
      headingId: initialData?.headingId || '',
      subHeadingId: initialData?.subHeadingId || '',
      status: initialData?.status || 'active',
      questions: initialData?.questions || [
        {
          question: '',
          options: ['', '', '', ''],
          correctOption: 0,
          explanation: '',
          examinersNote: '',
          difficulty: 'medium',
          status: 'active',
        },
      ],
    },
  });

  const { data: classesData, isLoading: classesLoading } = useDropdownClasses(dropdownsEnabled);
  const { data: booksData, isLoading: booksLoading } = useDropdownBooks(undefined, {
    enabled: dropdownsEnabled,
  });
  const { data: chaptersData, isLoading: chaptersLoading } = useDropdownChapters(undefined, {
    enabled: dropdownsEnabled,
  });
  const { data: headingsData, isLoading: headingsLoading } = useDropdownHeadings(undefined, {
    enabled: dropdownsEnabled,
  });
  const { data: subHeadingsData, isLoading: subHeadingsLoading } = useDropdownSubHeadings(
    undefined,
    { enabled: dropdownsEnabled }
  );

  const classes = useMemo(() => {
    if (!classesData) return [];
    return classesData.map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Class',
    }));
  }, [classesData]);

  const books = useMemo(() => {
    if (!booksData) return [];
    return booksData.map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Book',
    }));
  }, [booksData]);

  const chapters = useMemo(() => {
    if (!chaptersData) return [];
    return chaptersData.map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Chapter',
    }));
  }, [chaptersData]);

  const headings = useMemo(() => {
    if (!headingsData) return [];
    return headingsData.map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Heading',
    }));
  }, [headingsData]);

  const subHeadings = useMemo(() => {
    if (!subHeadingsData) return [];
    return subHeadingsData.map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Sub Heading',
    }));
  }, [subHeadingsData]);

  const addQuestion = () => {
    const questions = form.getValues('questions');
    form.setValue('questions', [
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
        explanation: '',
        difficulty: 'medium',
        status: 'active',
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    const questions = form.getValues('questions');
    if (questions.length > 1) {
      form.setValue(
        'questions',
        questions.filter((_, i) => i !== index)
      );
    }
  };

  const onSubmit = (values: FormValues) => {
    if (mcqId) {
      updateMcqsMutation.mutate(
        { id: mcqId, updates: values },
        {
          onSuccess: response => {
            toast.success(response.message || 'MCQ updated successfully');
            onClose?.();
          },
          onError: error => {
            toast.error(error.message || 'Failed to update MCQ');
          },
        }
      );
    } else {
      createMcqsMutation.mutate(values, {
        onSuccess: response => {
          toast.success(response.message || 'MCQ created successfully');
          form.reset();
          onClose?.();
        },
        onError: error => {
          toast.error(error.message || 'Failed to create MCQ');
        },
      });
    }
  };

  const isLoading = createMcqsMutation.isPending || updateMcqsMutation.isPending;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-sm font-medium">Class *</span>
          <Select
            onValueChange={value => form.setValue('classId', value)}
            value={form.watch('classId')}
            disabled={isView || classesLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Book *</span>
          <Select
            onValueChange={value => form.setValue('bookId', value)}
            value={form.watch('bookId')}
            disabled={isView || booksLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Book" />
            </SelectTrigger>
            <SelectContent>
              {books.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Chapter *</span>
          <Select
            onValueChange={value => form.setValue('chapterId', value)}
            value={form.watch('chapterId')}
            disabled={isView || chaptersLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Chapter" />
            </SelectTrigger>
            <SelectContent>
              {chapters.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Heading</span>
          <Select
            onValueChange={value => form.setValue('headingId', value)}
            value={form.watch('headingId') || ''}
            disabled={isView || headingsLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Heading" />
            </SelectTrigger>
            <SelectContent>
              {headings.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Sub Heading</span>
          <Select
            onValueChange={value => form.setValue('subHeadingId', value)}
            value={form.watch('subHeadingId') || ''}
            disabled={isView || subHeadingsLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Sub Heading" />
            </SelectTrigger>
            <SelectContent>
              {subHeadings.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Status</span>
          <Select
            onValueChange={value => form.setValue('status', value as 'active' | 'inactive')}
            value={form.watch('status')}
            disabled={isView}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={StatusEnum.Active}>Active</SelectItem>
              <SelectItem value={StatusEnum.Inactive}>Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Heading3 className="text-lg font-semibold">Questions</Heading3>
          {!isView && (
            <Button type="button" variant="outline" onClick={addQuestion}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          )}
        </div>

        {form.watch('questions')?.map((question, questionIndex) => (
          <div key={questionIndex} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Question {questionIndex + 1}</span>
              {!isView && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuestion(questionIndex)}
                  disabled={form.watch('questions').length <= 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-medium">Question Text *</span>
                <Textarea
                  value={question.question}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    form.setValue(`questions.${questionIndex}.question`, e.target.value)
                  }
                  placeholder="Enter your question"
                  disabled={isView}
                />
              </div>

              <div>
                <span className="text-sm font-medium">Options *</span>
                <div className="space-y-2 mt-2">
                  {question.options.map((option: string, optionIndex: number) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correctOption-${questionIndex}`}
                        checked={question.correctOption === optionIndex}
                        onChange={() =>
                          form.setValue(`questions.${questionIndex}.correctOption`, optionIndex)
                        }
                        disabled={isView}
                        className="w-4 h-4"
                      />
                      <Input
                        value={option}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          form.setValue(
                            `questions.${questionIndex}.options.${optionIndex}`,
                            e.target.value
                          )
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                        disabled={isView}
                        className="flex-1"
                      />
                      {!isView && question.options.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newOptions = question.options.filter((_, i) => i !== optionIndex);
                            form.setValue(`questions.${questionIndex}.options`, newOptions);
                            if (question.correctOption >= newOptions.length) {
                              form.setValue(`questions.${questionIndex}.correctOption`, 0);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {!isView && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newOptions = [...question.options, ''];
                      form.setValue(`questions.${questionIndex}.options`, newOptions);
                    }}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Option
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">Explanation</span>
                <Textarea
                  value={question.explanation}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    form.setValue(`questions.${questionIndex}.explanation`, e.target.value)
                  }
                  placeholder="Explain the correct answer"
                  disabled={isView}
                />
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">Examiner&apos;s Note <span className="text-muted-foreground font-normal">(optional)</span></span>
                <Textarea
                  value={question.examinersNote}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    form.setValue(`questions.${questionIndex}.examinersNote`, e.target.value)
                  }
                  placeholder="Why is this distractor tempting? What trap is the examiner setting?"
                  disabled={isView}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium">Difficulty</span>
                  <Select
                    onValueChange={value =>
                      form.setValue(
                        `questions.${questionIndex}.difficulty`,
                        value as 'easy' | 'medium' | 'hard'
                      )
                    }
                    value={question.difficulty}
                    disabled={isView}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={DifficultyEnum.EASY}>Easy</SelectItem>
                      <SelectItem value={DifficultyEnum.MEDIUM}>Medium</SelectItem>
                      <SelectItem value={DifficultyEnum.HARD}>Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium">Question Status</span>
                  <Select
                    onValueChange={value =>
                      form.setValue(
                        `questions.${questionIndex}.status`,
                        value as 'active' | 'inactive'
                      )
                    }
                    value={question.status}
                    disabled={isView}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={StatusEnum.Active}>Active</SelectItem>
                      <SelectItem value={StatusEnum.Inactive}>Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" onClick={onClose} disabled={isLoading} variant="outline">
          Cancel
        </Button>
        {!isView && (
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : mcqId ? 'Update MCQ' : 'Add MCQ'}
          </Button>
        )}
      </div>
    </form>
  );
}
