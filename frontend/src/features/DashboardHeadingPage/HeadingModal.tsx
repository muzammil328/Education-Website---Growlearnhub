'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { ModalProps } from '@muzammil328/education-packages/types';
import { HeadingForm } from './HeadingForm';
import { Eye, PenLine } from 'lucide-react';

export interface DashboardHeadingModalProps extends ModalProps {
  headingId?: string;
}

export function HeadingModal({
  mode,
  headingId,
  trigger,
  triggerLabel,
  title,
  isOpen,
  onOpenChange,
}: DashboardHeadingModalProps) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const resolvedTrigger =
    trigger ||
    triggerLabel ||
    (isEdit ? (
      <PenLine className="h-4 w-4" />
    ) : isView ? (
      <Eye className="h-4 w-4" />
    ) : (
      'Add Heading'
    ));
  const resolvedTitle =
    title || (isEdit ? 'Edit Heading' : isView ? 'View Heading' : 'Add New Heading');

  const handleOpenChange = (open: boolean) => {
    if (onOpenChange) onOpenChange(open);
  };

  return (
    <>
      {trigger === null ? null : trigger ? (
        <div onClick={() => handleOpenChange(true)}>{trigger}</div>
      ) : (
        <Button
          onClick={() => handleOpenChange(true)}
          disabled={(isEdit || isView) && !headingId}
          size={isEdit || isView ? 'sm' : 'lg'}
          variant={isEdit || isView ? 'ghost' : 'default'}
        >
          {resolvedTrigger}
        </Button>
      )}
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{resolvedTitle}</DialogTitle>
            </DialogHeader>
            <HeadingForm
              key={`${mode}-${headingId ?? 'new'}-${isOpen ? 'open' : 'closed'}`}
              isOpen={isOpen}
              setIsOpen={handleOpenChange}
              headingId={headingId}
              onClose={() => handleOpenChange(false)}
              mode={mode}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
