'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { ModalProps } from '@muzammil328/education-packages/types';
import { BoardForm } from './BoardForm';
import { Eye, PenLine } from 'lucide-react';

export interface DashboardBoardModalProps extends ModalProps {
  boardId?: string;
}

export function BoardModal({
  mode,
  boardId,
  trigger,
  triggerLabel,
  title,
  isOpen: isOpenProp,
  onOpenChange,
}: DashboardBoardModalProps) {
  const [isOpenLocal, setIsOpenLocal] = useState(false);

  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? !!isOpenProp : isOpenLocal;
  const setIsOpen = isControlled ? (onOpenChange ?? (() => {})) : setIsOpenLocal;

  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const resolvedTrigger =
    trigger ||
    triggerLabel ||
    (isEdit ? <PenLine className="h-4 w-4" /> : isView ? <Eye className="h-4 w-4" /> : 'Add Board');
  const resolvedTitle = title || (isEdit ? 'Edit Board' : isView ? 'View Board' : 'Add New Board');

  return (
    <div>
      {trigger === null ? null : trigger ? (
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          disabled={(isEdit || isView) && !boardId}
          size={isEdit || isView ? 'sm' : 'lg'}
          variant={isEdit || isView ? 'ghost' : 'default'}
        >
          {resolvedTrigger}
        </Button>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{resolvedTitle}</DialogTitle>
          </DialogHeader>
          <BoardForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            boardId={boardId}
            onClose={() => setIsOpen(false)}
            mode={mode}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
