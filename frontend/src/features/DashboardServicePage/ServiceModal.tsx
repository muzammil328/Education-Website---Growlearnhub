'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { ModalProps } from '@muzammil328/education-packages/types';
import { ServiceForm } from './ServiceForm';
import { Eye, PenLine } from 'lucide-react';

export interface DashboardServiceModalProps extends ModalProps {
  serviceId?: string;
}

export function ServiceModal({
  mode,
  serviceId,
  trigger,
  triggerLabel,
  title,
  isOpen,
  onOpenChange,
}: DashboardServiceModalProps) {
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
      'Add Service'
    ));
  const resolvedTitle =
    title || (isEdit ? 'Edit Service' : isView ? 'View Service' : 'Add New Service');

  return (
    <div>
      {trigger === null ? null : trigger ? (
        <div onClick={() => onOpenChange?.(true)}>{trigger}</div>
      ) : (
        <Button
          onClick={() => onOpenChange?.(true)}
          disabled={(isEdit || isView) && !serviceId}
          size={isEdit || isView ? 'sm' : 'lg'}
          variant={isEdit || isView ? 'ghost' : 'default'}
        >
          {resolvedTrigger}
        </Button>
      )}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{resolvedTitle}</DialogTitle>
          </DialogHeader>
          <ServiceForm
            isOpen={isOpen}
            setIsOpen={onOpenChange}
            serviceId={serviceId}
            onClose={() => onOpenChange?.(false)}
            mode={mode}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
