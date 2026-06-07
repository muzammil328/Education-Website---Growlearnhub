'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@muzammil328/ui';
import { Form } from '@muzammil328/ui';
import { useChapterById, useCreateChapter, useUpdateChapter } from '@/hooks';
import { chapterCreateSchema, type ChapterCreateInput } from '@muzammil328/education-packages';
import { ChapterModalSkeleton } from './ChapterModalSkeleton';
import ChapterModalView from './ChapterModalView';
import ChapterModalForm from './ChapterModalForm';
import { ModalFormActionButton } from '@/components/ModalFormActionButton';
import { FormProps } from '@muzammil328/education-packages/types';

interface DashboardChapterFormProps extends FormProps {
  chapterId?: string;
}

export function ChapterForm({
  isOpen,
  setIsOpen,
  chapterId,
  onClose,
  mode = 'add',
}: DashboardChapterFormProps) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const createChapterMutation = useCreateChapter();
  const updateChapterMutation = useUpdateChapter();

  const { data: chapterData, isLoading: isLoadingChapter } = useChapterById(
    (isEdit || isView) && isOpen ? chapterId : undefined
  );

  const form = useForm<ChapterCreateInput>({
    resolver: zodResolver(chapterCreateSchema),
    defaultValues: {
      name: '',
      classId: '',
      bookId: '',
      description: '',
      content: '',
      status: 'active',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if ((isEdit || isView) && chapterData) {
      const item = chapterData.data;
      form.reset({
        name: item.name || '',
        classId: String(item.classId || item.class?.classId || ''),
        bookId: String(item.bookId || item.book?.bookId || ''),
        description: item.description || '',
        content: item.content || '',
        status: (item.status as 'active' | 'inactive') || 'active',
        order: item.order,
      });
    }
    if (!isOpen) {
      form.reset({
        name: '',
        classId: '',
        bookId: '',
        description: '',
        content: '',
        status: 'active',
      });
    }
  }, [chapterData, form, isEdit, isView, isOpen]);

  const onSubmit = (values: ChapterCreateInput) => {
    if (isEdit && chapterId) {
      updateChapterMutation.mutate(
        { id: chapterId, updates: values },
        {
          onSuccess: (response: { message?: string }) => {
            toast.success(response.message || 'Chapter updated successfully');
            if (setIsOpen) setIsOpen(false);
          },
          onError: (error: { message?: string }) => {
            toast.error(error.message || 'Failed to update chapter');
          },
        }
      );
      return;
    }

    createChapterMutation.mutate(values, {
      onSuccess: (response: { message?: string }) => {
        toast.success(response.message || 'Chapter created successfully');
        form.reset();
        if (setIsOpen) setIsOpen(false);
      },
      onError: (error: { message?: string }) => {
        toast.error(error.message || 'Failed to create chapter');
      },
    });
  };

  const isLoading = createChapterMutation.isPending || updateChapterMutation.isPending;

  // Show skeleton while loading chapter data (for edit/view mode)
  const isInitialLoading = (isEdit || isView) && isOpen && !chapterData;

  const viewData = isView && chapterData ? chapterData.data : form.getValues();
  const submitLabel = isEdit ? 'Update Chapter' : isView ? '' : 'Add Chapter';

  if (isInitialLoading) {
    return <ChapterModalSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isView ? <ChapterModalView formValues={viewData} /> : <ChapterModalForm isOpen={isOpen} initialSelection={chapterData?.data ? { classId: chapterData.data.classId || chapterData.data.class?.classId, className: chapterData.data.class?.name, bookId: chapterData.data.bookId || chapterData.data.book?.bookId, bookName: chapterData.data.book?.name } : undefined} />}
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
