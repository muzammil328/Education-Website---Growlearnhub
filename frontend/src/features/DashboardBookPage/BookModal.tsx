'use client';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from '@muzammil328/ui';
import { ModalProps } from '@muzammil328/education-packages/types';
import { BookForm } from './BookForm';
import { Eye, PenLine } from 'lucide-react';
import { useState } from 'react';

export interface DashboardBookModalProps extends ModalProps {
  bookId?: string;
}

export function BookModal({
  mode,
  bookId,
  trigger,
  triggerLabel,
  title,
  isOpen,
  onOpenChange,
}: DashboardBookModalProps) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';
  const [openCount, setOpenCount] = useState(0);

  const resolvedTrigger =
    trigger ||
    triggerLabel ||
    (isEdit ? <PenLine className="h-4 w-4" /> : isView ? <Eye className="h-4 w-4" /> : 'Add Book');
  const resolvedTitle = title || (isEdit ? 'Edit Book' : isView ? 'View Book' : 'Add New Book');

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setOpenCount(prev => prev + 1);
    }
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  return (
    <div>
      {trigger === null ? null : trigger ? (
        <div onClick={() => handleOpenChange(true)}>{trigger}</div>
      ) : (
        <Button
          onClick={() => handleOpenChange(true)}
          disabled={(isEdit || isView) && !bookId}
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
          <BookForm
            key={`${mode}-${bookId || 'new'}-${openCount}`}
            isOpen={isOpen}
            setIsOpen={handleOpenChange}
            bookId={bookId}
            onClose={() => handleOpenChange(false)}
            mode={mode}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
