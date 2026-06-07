'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@muzammil328/ui';
import { Form } from '@muzammil328/ui';
import { FormProps } from '@muzammil328/education-packages/types';
import { useHeadingById, useCreateHeading, useUpdateHeading } from '@/hooks';
import { headingCreateSchema, type CreateHeadingInput } from '@muzammil328/education-packages';
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

  const headingResponse = headingData?.data;

  const form = useForm<CreateHeadingInput>({
    resolver: zodResolver(headingCreateSchema),
    defaultValues: {
      name: '',
      classId: '',
      bookId: '',
      chapterId: '',
      status: 'active',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (headingResponse) {
      form.reset({
        name: headingResponse.name || '',
        classId: String(headingResponse.class?.classId || headingResponse.classId || ''),
        bookId: String(headingResponse.book?.bookId || headingResponse.bookId || ''),
        chapterId: String(headingResponse.chapter?.chapterId || headingResponse.chapterId || ''),
        status: (headingResponse.status || 'active') as 'active' | 'inactive',
        order: headingResponse.order,
      });
    }
  }, [headingResponse, form.reset, isEdit, isView]);

  const onSubmit = (values: CreateHeadingInput) => {
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
  const viewData = isView && headingResponse ? headingResponse : form.getValues();
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
              headingResponse
                ? {
                    classId: headingResponse.class?.classId || headingResponse.classId,
                    className: headingResponse.class?.name,
                    bookId: headingResponse.book?.bookId || headingResponse.bookId,
                    bookName: headingResponse.book?.name,
                    chapterId: headingResponse.chapter?.chapterId || headingResponse.chapterId,
                    chapterName: headingResponse.chapter?.name,
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
