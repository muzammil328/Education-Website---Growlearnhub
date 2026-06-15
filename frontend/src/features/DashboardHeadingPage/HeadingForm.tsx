'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, toast } from '@muzammil328/ui';
import { ArrowLeft } from 'lucide-react';
import { FormProps } from '@muzammil328/education-packages/types';
import { useHeadingById, useCreateHeading, useUpdateHeading } from '@/hooks';
import { headingCreateSchema, type CreateHeadingInput } from '@muzammil328/education-packages';
import { HeadingModalSkeleton } from './HeadingModalSkeleton';
import HeadingModalView from './HeadingModalView';
import HeadingModalForm from './HeadingModalForm';
import HeadingTypeSelector, { type HeadingType } from './HeadingTypeSelector';
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

  const [headingType, setHeadingType] = useState<HeadingType | null>(null);

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
      const classId = String(headingResponse.class?.classId || headingResponse.classId || '');
      form.reset({
        name: headingResponse.name || '',
        classId,
        bookId: String(headingResponse.book?.bookId || headingResponse.bookId || ''),
        chapterId: String(headingResponse.chapter?.chapterId || headingResponse.chapterId || ''),
        status: (headingResponse.status || 'active') as 'active' | 'inactive',
        order: headingResponse.order,
      });
      setHeadingType(classId ? 'class' : 'subject');
    }
  }, [headingResponse, form.reset, isEdit, isView]);

  useEffect(() => {
    if (!isOpen && !isEdit && !isView) {
      setHeadingType(null);
      form.reset({
        name: '',
        classId: '',
        bookId: '',
        chapterId: '',
        status: 'active',
      });
    }
  }, [isOpen, isEdit, isView, form]);

  const handleSelectHeadingType = (type: HeadingType) => {
    setHeadingType(type);
  };

  const handleBack = () => {
    setHeadingType(null);
    form.reset({
      name: '',
      classId: '',
      bookId: '',
      chapterId: '',
      status: 'active',
    });
  };

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

  if (!isEdit && !isView && !headingType) {
    return (
      <div className="space-y-4">
        <HeadingTypeSelector onSelect={handleSelectHeadingType} />
        <div className="flex justify-end">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isView ? (
          <HeadingModalView formValues={viewData} />
        ) : (
          <>
            {!isEdit && (
              <Button type="button" variant="ghost" size="sm" onClick={handleBack} className="-ml-2">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            )}
            <HeadingModalForm
              headingType={headingType ?? 'class'}
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
          </>
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
