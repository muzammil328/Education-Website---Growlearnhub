'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@muzammil328/ui';
import { Form } from '@muzammil328/ui';
import { useBookByBookId, useCreateBook, useUpdateBook } from '@/hooks';
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

  const { data: bookData } = useBookByBookId(
    (isEdit || isView) && isOpen ? bookId : undefined
  );

  const editDefaults: BookCreateInput =
    (isEdit || isView) && bookData
      ? {
          name: bookData.name || '',
          code: bookData.code || '',
          classId: String(bookData.classId || bookData.class?.classId || ''),
          description: bookData.description || '',
          status: (bookData.status || 'active') as 'active' | 'inactive',
          creditHours: bookData.creditHours,
          fileId: bookData.fileId,
          pages: bookData.pages,
          image: bookData.image,
          totalWeight: bookData.totalWeight,
          components: bookData.components ?? [],
        }
      : {
          name: '',
          code: '',
          classId: '',
          description: '',
          status: 'active',
          components: [],
        };

  const form = useForm<BookCreateInput>({
    resolver: zodResolver(bookCreateSchema),
    defaultValues: editDefaults,
    mode: 'onChange',
  });

  useEffect(() => {
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
  }, [isOpen, form]);

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
  const viewData = isView && bookData ? bookData : form.getValues();
  const submitLabel = isEdit ? 'Update Book' : isView ? '' : 'Add Book';

  if (isInitialLoading) {
    return <BookModalSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isView ? <BookModalView formValues={viewData} /> : <BookModalForm />}
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
