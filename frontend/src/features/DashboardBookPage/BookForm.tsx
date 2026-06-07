'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@muzammil328/ui';
import { Form } from '@muzammil328/ui';
import { useBookById, useCreateBook, useUpdateBook } from '@/hooks';
import { bookCreateSchema, type BookCreateInput } from '@muzammil328/education-packages';
import { BookModalSkeleton } from './BookModalSkeleton';
import BookModalView from './BookModalView';
import BookModalForm from './BookModalForm';
import { ModalFormActionButton } from '@/components/ModalFormActionButton';
import { FormProps } from '@muzammil328/education-packages/types';

export interface DashboardBookFormProps extends FormProps {
  bookId?: string;
}

export function BookForm({
  isOpen,
  setIsOpen,
  bookId,
  onClose,
  mode = 'add',
}: DashboardBookFormProps) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();

  const { data: bookData } = useBookById(
    (isEdit || isView) && isOpen ? bookId : undefined
  );

  const form = useForm<BookCreateInput>({
    resolver: zodResolver(bookCreateSchema),
    defaultValues: {
      name: '',
      code: '',
      classId: '',
      description: '',
      status: 'active',
      components: [],
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if ((isEdit || isView) && bookData) {
      const item = bookData.data;
      form.reset({
        name: item.name || '',
        code: item.code || '',
        classId: String(item.classId || item.class?.classId || ''),
        description: item.description || '',
        status: (item.status as 'active' | 'inactive') || 'active',
        creditHours: item.creditHours,
        fileId: item.fileId,
        pages: item.pages,
        image: item.image,
        totalWeight: item.totalWeight,
        components: item.components ?? [],
      });
    }
    if (!isOpen) {
      form.reset({
        name: '',
        code: '',
        classId: '',
        description: '',
        status: 'active',
        components: [],
      });
    }
  }, [bookData, form, isEdit, isView, isOpen]);

  const onSubmit = (values: BookCreateInput) => {
    const submitData = {
      ...values,
      classId: values.classId,
    };

    if (isEdit && bookId) {
      updateBookMutation.mutate(
        { id: bookId, updates: submitData },
        {
          onSuccess: (response: { message?: string }) => {
            toast.success(response.message || 'Book updated successfully');
            if (setIsOpen) setIsOpen(false);
          },
          onError: (error: { message?: string }) => {
            toast.error(error.message || 'Failed to update book');
          },
        }
      );
      return;
    }

    createBookMutation.mutate(submitData, {
      onSuccess: (response: { message?: string }) => {
        toast.success(response.message || 'Book created successfully');
        form.reset();
        if (setIsOpen) setIsOpen(false);
      },
      onError: (error: { message?: string }) => {
        toast.error(error.message || 'Failed to create book');
      },
    });
  };

  const isLoading = createBookMutation.isPending || updateBookMutation.isPending;

  // Show skeleton while loading book data or class dropdown (for edit/view mode)
  const isInitialLoading = (isEdit || isView) && isOpen && !bookData;

  // Use bookData if available (from API), otherwise use form values
  const viewData = isView && bookData ? bookData.data : form.getValues();
  const submitLabel = isEdit ? 'Update Book' : isView ? '' : 'Add Book';

  if (isInitialLoading) {
    return <BookModalSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isView ? <BookModalView formValues={viewData} /> : <BookModalForm isOpen={isOpen} initialSelection={bookData?.data ? { classId: bookData.data.classId || bookData.data.class?.classId, className: bookData.data.class?.name } : undefined} />}
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
