'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, BookOpen } from 'lucide-react';
import { Heading2, Para } from '@muzammil328/ui';

const BOARDS = [
  'Lahore Board',
  'Faisalabad Board',
  'Rawalpindi Board',
  'Gujranwala Board',
  'Multan Board',
  'Bahawalpur Board',
  'DG Khan Board',
  'Sahiwal Board',
  'Sargodha Board',
  'FBISE (Federal Board)',
  'Other',
];

const schema = z.object({
  examName: z.string().min(1, 'Exam name is required'),
  year: z
    .number({ invalid_type_error: 'Year must be a number' })
    .min(2000)
    .max(new Date().getFullYear() + 1),
  board: z.string().min(1, 'Board is required'),
  additionalNote: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  questionText?: string;
}

export default function McqExamReportDrawer({ open, onClose, questionText }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { year: new Date().getFullYear() },
  });

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      reset({ year: new Date().getFullYear() });
    }
  }, [open, reset]);

  const onSubmit = async (_data: FormValues) => {
    // TODO: wire to tRPC mutation when backend endpoint exists
    await new Promise(r => setTimeout(r, 400));
    setSubmitted(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex justify-end bg-black/40"
    >
      <div className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-background shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <Heading2 className="text-base font-semibold text-foreground">Report Exam Appearance</Heading2>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-foreground/60 hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 px-5 py-6 space-y-5">
          {questionText && (
            <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm text-foreground/80 line-clamp-3">
              <span className="font-medium text-foreground">Q: </span>
              {questionText}
            </div>
          )}

          {submitted ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-300">
              <Para className="font-medium">Thank you for your report!</Para>
              <Para className="mt-1 text-green-700 dark:text-green-400">
                This helps us tag MCQs with their past paper appearances.
              </Para>
              <button
                onClick={onClose}
                className="mt-3 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Para className="text-sm text-foreground/70">
                Help us track which past papers this question appeared in. Your input improves the
                experience for all students.
              </Para>

              {/* Exam Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Exam / Paper Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('examName')}
                  placeholder="e.g. Lahore Board Annual Exam"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {errors.examName && (
                  <Para className="mt-1 text-xs text-red-500">{errors.examName.message}</Para>
                )}
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('year', { valueAsNumber: true })}
                  type="number"
                  min={2000}
                  max={new Date().getFullYear() + 1}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {errors.year && (
                  <Para className="mt-1 text-xs text-red-500">{errors.year.message}</Para>
                )}
              </div>

              {/* Board */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Board <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('board')}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select board...</option>
                  {BOARDS.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {errors.board && (
                  <Para className="mt-1 text-xs text-red-500">{errors.board.message}</Para>
                )}
              </div>

              {/* Additional Note */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Additional Note <span className="text-foreground/40 font-normal">(optional)</span>
                </label>
                <textarea
                  {...register('additionalNote')}
                  rows={3}
                  placeholder="e.g. appeared in Section B, Q3..."
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
