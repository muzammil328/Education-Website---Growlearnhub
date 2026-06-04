'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { ModalProps } from '@muzammil328/education-packages/types';
import { SubHeadingForm } from './SubHeadingForm';
import { Eye, PenLine } from 'lucide-react';

export interface DashboardSubHeadingModalProps extends ModalProps {
  subHeadingId?: string;
}

export function SubHeadingModal({
  mode,
  subHeadingId,
  trigger,
  triggerLabel,
  title,
  isOpen,
  onOpenChange,
}: DashboardSubHeadingModalProps) {
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
      'Add SubHeading'
    ));
  const resolvedTitle =
    title || (isEdit ? 'Edit SubHeading' : isView ? 'View SubHeading' : 'Add New SubHeading');

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
          disabled={(isEdit || isView) && !subHeadingId}
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
            <SubHeadingForm
              isOpen={isOpen}
              setIsOpen={handleOpenChange}
              subHeadingId={subHeadingId}
              onClose={() => handleOpenChange(false)}
              mode={mode}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
