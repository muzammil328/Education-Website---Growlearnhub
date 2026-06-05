'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@muzammil328/ui';
import { Form } from '@muzammil328/ui';
import { useBoardById, useCreateBoard, useUpdateBoard } from '@/hooks';
import { type RouterOutputs, type TrpcError } from '@/trpc/trpc';
import { BoardSchema, type BoardFormValues } from '@muzammil328/education-packages';
import { BoardModalSkeleton } from './BoardModalSkeleton';
import BoardModalView from './BoardModalView';
import BoardModalForm from './BoardModalForm';
import { ModalFormActionButton } from '@/components/ModalFormActionButton';
import { FormProps } from '@muzammil328/education-packages/types';

interface DashboardBoardFormProps extends FormProps {
  boardId?: string;
}

export function BoardForm({
  isOpen,
  setIsOpen,
  boardId,
  onClose,
  mode = 'add',
}: DashboardBoardFormProps) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const createBoardMutation = useCreateBoard();
  const updateBoardMutation = useUpdateBoard();

  const { data: boardData, isLoading: isLoadingBoard } = useBoardById(
    (isEdit || isView) && isOpen ? boardId : undefined
  );

  const editDefaults = (() => {
    if ((isEdit || isView) && boardData) {
      const rawData = boardData as Record<string, unknown>;
      const board = Array.isArray(rawData) ? rawData[0] : rawData;
      if (board) {
        return {
          name: board.name || '',
          slug: board.slug || '',
          classId: Array.isArray(board.serviceId)
            ? board.serviceId[0] || ''
            : board.serviceId || '',
          description: board.description || '',
          status: (board.status || 'active') as 'active' | 'inactive',
        };
      }
    }
    return {
      name: '',
      slug: '',
      classId: '',
      description: '',
      status: 'active' as const,
    };
  })();

  const form = useForm<BoardFormValues>({
    resolver: zodResolver(BoardSchema),
    defaultValues: editDefaults,
    mode: 'onChange',
  });

  const onSubmit = (values: BoardFormValues) => {
    const submitData = {
      ...values,
      classId: Array.isArray(values.classId) ? values.classId[0] : values.classId || '',
    };

    if (isEdit && boardId) {
      updateBoardMutation.mutate(
        { id: boardId, updates: submitData },
        {
          onSuccess: (response: RouterOutputs['board']['update']) => {
            toast.success(response.message || 'Board updated successfully');
            if (setIsOpen) setIsOpen(false);
          },
          onError: (error: TrpcError) => {
            toast.error(error.message || 'Failed to update board');
          },
        }
      );
      return;
    }

    createBoardMutation.mutate(submitData, {
      onSuccess: (response: RouterOutputs['board']['create']) => {
        toast.success(response.message || 'Board created successfully');
        form.reset();
        if (setIsOpen) setIsOpen(false);
      },
      onError: (error: TrpcError) => {
        toast.error(error.message || 'Failed to create board');
      },
    });
  };

  const isLoading = createBoardMutation.isPending || updateBoardMutation.isPending;
  const formValues = form.getValues();
  const submitLabel = isEdit ? 'Update Board' : isView ? '' : 'Add Board';

  if (isLoadingBoard && !boardData) {
    return <BoardModalSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isView ? <BoardModalView formValues={formValues} /> : <BoardModalForm isOpen={isOpen} />}
        <ModalFormActionButton
          onClose={onClose}
          label={submitLabel}
          view={isView}
          loading={isLoading}
        />
      </form>
    </Form>
  );
}
