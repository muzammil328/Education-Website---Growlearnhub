'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@muzammil328/ui';
import { Form } from '@muzammil328/ui/forms';
import { useChapterById, useCreateChapter, useUpdateChapter } from '@/hooks';
import { ChapterSchema, type ChapterFormValues } from '@muzammil328/education-packages';
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

  const editDefaults: ChapterFormValues =
    (isEdit || isView) && chapterData
      ? {
          name: chapterData.name || '',
          classId: String(chapterData.classId || chapterData.class?.classId || ''),
          bookId: String(chapterData.bookId || chapterData.book?.bookId || ''),
          description: chapterData.description || '',
          content: chapterData.content || '',
          status: (chapterData.status || 'active') as 'active' | 'inactive',
          order: chapterData.order,
        }
      : {
          name: '',
          classId: '',
          bookId: '',
          description: '',
          content: '',
          status: 'active',
        };

  const form = useForm<ChapterFormValues>({
    resolver: zodResolver(ChapterSchema),
    defaultValues: editDefaults,
    mode: 'onChange',
  });

  useEffect(() => {
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
  }, [isOpen, form]);

  useEffect(() => {
    if ((isEdit || isView) && isOpen && chapterData) {
      form.reset({
        name: chapterData.name || '',
        classId: String(chapterData.classId || chapterData.class?.classId || ''),
        bookId: String(chapterData.bookId || chapterData.book?.bookId || ''),
        description: chapterData.description || '',
        content: chapterData.content || '',
        status: (chapterData.status || 'active') as 'active' | 'inactive',
        order: chapterData.order,
      });
    }
  }, [isEdit, isView, isOpen, chapterData, form]);

  const onSubmit = (values: ChapterFormValues) => {
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
  const isInitialLoading = (isEdit || isView) && isOpen && isLoadingChapter;

  const viewData = isView && chapterData ? chapterData : form.getValues();
  const submitLabel = isEdit ? 'Update Chapter' : isView ? '' : 'Add Chapter';

  if (isInitialLoading) {
    return <ChapterModalSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isView ? <ChapterModalView formValues={formValues} /> : <ChapterModalForm isOpen={isOpen} />}
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
