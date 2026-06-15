'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, toast } from '@muzammil328/ui';
import { FormProps } from '@muzammil328/education-packages/types';
import {
  useSubHeadingById,
  useCreateSubHeading,
  useUpdateSubHeading,
} from '@/hooks/use-subHeading';
import { subHeadingCreateSchema, type SubHeadingCreateInput } from '@muzammil328/education-packages';
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

  const form = useForm<SubHeadingCreateInput>({
    resolver: zodResolver(subHeadingCreateSchema),
    defaultValues: {
      name: '',
      classId: '',
      bookId: '',
      chapterId: '',
      headingId: '',
      status: 'active' as const,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if ((isEdit || isView) && subHeadingData) {
      const item = subHeadingData.data;
      form.reset({
        name: item.name || '',
        classId: String(item.classId || item.class?.classId || ''),
        bookId: String(item.bookId || item.book?.bookId || ''),
        chapterId: String(item.chapterId || item.chapter?.chapterId || ''),
        headingId: String(item.headingId || item.heading?.headingId || ''),
        status: (item.status as 'active' | 'inactive') || 'active',
        order: item.order,
      });
    }
    if (!isOpen) {
      form.reset({
        name: '',
        classId: '',
        bookId: '',
        chapterId: '',
        headingId: '',
        status: 'active' as const,
      });
    }
  }, [subHeadingData, form, isEdit, isView, isOpen]);

  const onSubmit = (values: SubHeadingCreateInput) => {
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
  const submitLabel = isEdit ? 'Update SubHeading' : isView ? '' : 'Add SubHeading';
  const isInitialLoading = (isEdit || isView) && isOpen && !subHeadingData;

  if (isInitialLoading || (isLoadingSubHeading && !subHeadingData)) {
    return <SubHeadingModalSkeleton />;
  }

  const item = subHeadingData?.data;
  const viewProps = isView && item
    ? {
        ...form.getValues(),
        class: item.class,
        book: item.book,
        chapter: item.chapter,
        heading: item.heading,
      }
    : form.getValues();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isView ? (
          <SubHeadingModalView formValues={viewProps} />
        ) : (
          <SubHeadingModalForm
            initialSelection={
              item
                ? {
                    classId: String(item.classId || item.class?.classId || ''),
                    className: item.class?.name,
                    bookId: String(item.bookId || item.book?.bookId || ''),
                    bookName: item.book?.name,
                    chapterId: String(item.chapterId || item.chapter?.chapterId || ''),
                    chapterName: item.chapter?.name,
                    headingId: String(item.headingId || item.heading?.headingId || ''),
                    headingName: item.heading?.name,
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
