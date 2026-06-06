'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { ModalProps } from '@muzammil328/education-packages/types';
import { ChapterForm } from './ChapterForm';
import { Eye, PenLine } from 'lucide-react';
import { useState } from 'react';

export interface DashboardChapterModalProps extends ModalProps {
  chapterId?: string;
}

export function ChapterModal({
  mode,
  chapterId,
  trigger,
  triggerLabel,
  title,
  isOpen,
  onOpenChange,
}: DashboardChapterModalProps) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';
  const [openCount, setOpenCount] = useState(0);

  const resolvedTrigger =
    trigger ||
    triggerLabel ||
    (isEdit ? (
      <PenLine className="h-4 w-4" />
    ) : isView ? (
      <Eye className="h-4 w-4" />
    ) : (
      'Add Chapter'
    ));
  const resolvedTitle =
    title || (isEdit ? 'Edit Chapter' : isView ? 'View Chapter' : 'Add New Chapter');

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setOpenCount(prev => prev + 1);
    }
    if (onOpenChange) onOpenChange(open);
  };

  return (
    <div>
      {trigger === null ? null : trigger ? (
        <div onClick={() => handleOpenChange(true)}>{trigger}</div>
      ) : (
        <Button
          onClick={() => handleOpenChange(true)}
          disabled={(isEdit || isView) && !chapterId}
          size={isEdit || isView ? 'sm' : 'lg'}
          variant={isEdit || isView ? 'ghost' : 'default'}
        >
          {resolvedTrigger}
        </Button>
      )}
      <Dialog open={!!isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{resolvedTitle}</DialogTitle>
          </DialogHeader>
          <ChapterForm
            key={`${mode}-${chapterId ?? 'new'}-${openCount}`}
            isOpen={isOpen}
            setIsOpen={handleOpenChange}
            chapterId={chapterId}
            onClose={() => handleOpenChange(false)}
            mode={mode}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
