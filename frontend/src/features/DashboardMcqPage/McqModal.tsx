'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { McqForm } from '@/features/DashboardMcqPage/McqForm';
import { ModalProps } from '@muzammil328/education-packages/types';
import { Eye, PenLine } from 'lucide-react';

export interface DashboardMcqModalProps extends ModalProps {
  mcqId?: string;
}

export function McqModal({ mode, mcqId, trigger, triggerLabel, title }: DashboardMcqModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const resolvedTrigger =
    trigger ||
    triggerLabel ||
    (isEdit ? <PenLine className="h-4 w-4" /> : isView ? <Eye className="h-4 w-4" /> : 'Add MCQ');
  const resolvedTitle = title || (isEdit ? 'Edit MCQ' : isView ? 'View MCQ' : 'Add New MCQ');

  return (
    <div>
      {trigger ? (
        <Button onClick={() => setIsOpen(true)}>{resolvedTrigger}</Button>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          disabled={(isEdit || isView) && !mcqId}
          size={isEdit || isView ? 'sm' : 'lg'}
          variant={isEdit || isView ? 'ghost' : 'default'}
        >
          {resolvedTrigger}
        </Button>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{resolvedTitle}</DialogTitle>
          </DialogHeader>
          <McqForm
            isOpen={isOpen}
            mcqId={mcqId}
            onClose={() => setIsOpen(false)}
            mode={mode}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
