'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@muzammil328/ui';
import { Form } from '@muzammil328/ui';
import { FormProps } from '@muzammil328/education-packages/types';
import {
  useSubHeadingById,
  useCreateSubHeading,
  useUpdateSubHeading,
} from '@/hooks/use-subHeading';
import { SubHeadingSchema, type SubHeadingFormValues } from '@muzammil328/education-packages';
import { SubHeadingModalSkeleton } from './SubHeadingModalSkeleton';
import SubHeadingModalView from './SubHeadingModalView';
import SubHeadingModalForm from './SubHeadingModalForm';
import { ModalFormActionButton } from '@/components/ModalFormActionButton';

interface DashboardSubHeadingFormProps extends FormProps {
  subHeadingId?: string;
}

export function SubHeadingForm({
  isOpen,
  setIsOpen,
  subHeadingId,
  onClose,
  mode = 'add',
}: DashboardSubHeadingFormProps) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const createSubHeadingMutation = useCreateSubHeading();
  const updateSubHeadingMutation = useUpdateSubHeading();

  const { data: subHeadingData, isLoading: isLoadingSubHeading } = useSubHeadingById(
    (isEdit || isView) && isOpen ? subHeadingId : undefined
  );

  const editDefaults =
    (isEdit || isView) && subHeadingData
      ? {
          name: subHeadingData.name || '',
          classId: String(subHeadingData.class?.classId || subHeadingData.classId || ''),
          bookId: String(subHeadingData.book?.bookId || subHeadingData.bookId || ''),
          chapterId: String(subHeadingData.chapter?.chapterId || subHeadingData.chapterId || ''),
          headingId: String(subHeadingData.heading?.headingId || subHeadingData.headingId || ''),
          status: (subHeadingData.status || 'active') as 'active' | 'inactive',
          order: subHeadingData.order,
        }
      : {
          name: '',
          classId: '',
          bookId: '',
          chapterId: '',
          headingId: '',
          status: 'active' as const,
        };

  const form = useForm<SubHeadingFormValues>({
    resolver: zodResolver(SubHeadingSchema),
    defaultValues: editDefaults,
    mode: 'onChange',
  });

  const onSubmit = (values: SubHeadingFormValues) => {
    if (isEdit && subHeadingId) {
      updateSubHeadingMutation.mutate(
        { id: subHeadingId, updates: values },
        {
          onSuccess: (response: { message?: string }) => {
            toast.success(response.message || 'SubHeading updated successfully');
            if (setIsOpen) setIsOpen(false);
          },
          onError: (error: { message?: string }) => {
            toast.error(error.message || 'Failed to update subHeading');
          },
        }
      );
      return;
    }

    createSubHeadingMutation.mutate(values, {
      onSuccess: (response: { message?: string }) => {
        toast.success(response.message || 'SubHeading created successfully');
        form.reset();
        if (setIsOpen) setIsOpen(false);
      },
      onError: (error: { message?: string }) => {
        toast.error(error.message || 'Failed to create subHeading');
      },
    });
  };

  const isLoading = createSubHeadingMutation.isPending || updateSubHeadingMutation.isPending;
  const formValues = form.getValues();
  const submitLabel = isEdit ? 'Update SubHeading' : isView ? '' : 'Add SubHeading';
  const isInitialLoading = (isEdit || isView) && isOpen && !subHeadingData;

  if (isInitialLoading || (isLoadingSubHeading && !subHeadingData)) {
    return <SubHeadingModalSkeleton />;
  }

  const viewProps =
    isView && subHeadingData
      ? {
          ...formValues,
          class: subHeadingData.class,
          book: subHeadingData.book,
          chapter: subHeadingData.chapter,
          heading: subHeadingData.heading,
        }
      : formValues;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isView ? (
          <SubHeadingModalView formValues={viewProps} />
        ) : (
          <SubHeadingModalForm
            initialSelection={
              subHeadingData
                ? {
                    classId: String(subHeadingData.class?.classId || subHeadingData.classId || ''),
                    className: subHeadingData.class?.className,
                    bookId: String(subHeadingData.book?.bookId || subHeadingData.bookId || ''),
                    bookName: subHeadingData.book?.bookName,
                    chapterId: String(
                      subHeadingData.chapter?.chapterId || subHeadingData.chapterId || ''
                    ),
                    chapterName: subHeadingData.chapter?.chapterName,
                    headingId: String(
                      subHeadingData.heading?.headingId || subHeadingData.headingId || ''
                    ),
                    headingName: subHeadingData.heading?.headingName,
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
