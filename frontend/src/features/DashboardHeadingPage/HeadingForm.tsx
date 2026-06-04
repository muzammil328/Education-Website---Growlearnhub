'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@muzammil328/ui';
import { Form } from '@muzammil328/ui/forms';
import { FormProps } from '@muzammil328/education-packages/types';
import { useHeadingById, useCreateHeading, useUpdateHeading } from '@/hooks';
import { HeadingSchema, type HeadingFormValues } from '@muzammil328/education-packages';
import { HeadingModalSkeleton } from './HeadingModalSkeleton';
import HeadingModalView from './HeadingModalView';
import HeadingModalForm from './HeadingModalForm';
import { ModalFormActionButton } from '@/components/ModalFormActionButton';

interface DashboardHeadingFormProps extends FormProps {
  headingId?: string;
}

export function HeadingForm({
  isOpen,
  setIsOpen,
  headingId,
  onClose,
  mode = 'add',
}: DashboardHeadingFormProps) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const createHeadingMutation = useCreateHeading();
  const updateHeadingMutation = useUpdateHeading();

  const { data: headingData, isLoading: isLoadingHeading } = useHeadingById(
    (isEdit || isView) && isOpen ? headingId : undefined
  );

  const editDefaults =
    (isEdit || isView) && headingData
      ? {
          name: headingData.name || '',
          classId: String(headingData.class?.classId || headingData.classId || ''),
          bookId: String(headingData.book?.bookId || headingData.bookId || ''),
          chapterId: String(headingData.chapter?.chapterId || headingData.chapterId || ''),
          status: (headingData.status || 'active') as 'active' | 'inactive',
          order: headingData.order,
        }
      : {
          name: '',
          classId: '',
          bookId: '',
          chapterId: '',
          status: 'active' as const,
        };

  const form = useForm<HeadingFormValues>({
    resolver: zodResolver(HeadingSchema),
    defaultValues: editDefaults,
    mode: 'onChange',
  });

  const onSubmit = (values: HeadingFormValues) => {
    if (isEdit && headingId) {
      updateHeadingMutation.mutate(
        { id: headingId, updates: values },
        {
          onSuccess: (response: { message?: string }) => {
            toast.success(response.message || 'Heading updated successfully');
            if (setIsOpen) setIsOpen(false);
          },
          onError: (error: { message?: string }) => {
            toast.error(error.message || 'Failed to update heading');
          },
        }
      );
      return;
    }

    createHeadingMutation.mutate(values, {
      onSuccess: (response: { message?: string }) => {
        toast.success(response.message || 'Heading created successfully');
        form.reset();
        if (setIsOpen) setIsOpen(false);
      },
      onError: (error: { message?: string }) => {
        toast.error(error.message || 'Failed to create heading');
      },
    });
  };

  const isLoading = createHeadingMutation.isPending || updateHeadingMutation.isPending;
  const viewData = isView && headingData ? headingData : form.getValues();
  const submitLabel = isEdit ? 'Update Heading' : isView ? '' : 'Add Heading';
  const isInitialLoading = (isEdit || isView) && isOpen && !headingData;

  if (isInitialLoading || (isLoadingHeading && !headingData)) {
    return <HeadingModalSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isView ? (
          <HeadingModalView formValues={viewData} />
        ) : (
          <HeadingModalForm
            initialSelection={
              headingData
                ? {
                    classId: headingData.class?.classId || headingData.classId,
                    className: headingData.class?.className,
                    bookId: headingData.book?.bookId || headingData.bookId,
                    bookName: headingData.book?.bookName,
                    chapterId: headingData.chapter?.chapterId || headingData.chapterId,
                    chapterName: headingData.chapter?.chapterName,
                  }
                : undefined
            }
          />
        )}
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
