'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectField } from '@/components/ui/select-field'
import { DropdownLoader, FormNumber, FormString, Label, Para } from '@muzammil328/ui'
import { useDropdownClasses, useDropdownBooks } from '@/hooks';
import { DropdownSkeleton } from '@/components/DropdownSkeleton';

export default function ChapterModalForm({
  isOpen = true,
  initialSelection,
}: {
  isOpen?: boolean;
  initialSelection?: {
    classId?: string;
    className?: string;
    bookId?: string;
    bookName?: string;
  };
}) {
  const {
    data: classData,
    isLoading: isLoadingClasses,
    error: classesError,
  } = useDropdownClasses(isOpen);

  const { watch, setValue } = useFormContext();
  const selectedClassId = watch('classId');
  const selectedBookId = watch('bookId');

  const {
    data: bookData,
    isLoading: isLoadingBooks,
    error: booksError,
  } = useDropdownBooks(
    selectedClassId ? { classId: selectedClassId } : undefined,
    { enabled: isOpen && Boolean(selectedClassId) }
  );

  const classOptions = useMemo(() => {
    const options = (classData || []).map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Class',
    }));
    if (
      initialSelection?.classId &&
      initialSelection.className &&
      !options.some(o => o.value === initialSelection.classId)
    ) {
      options.unshift({ value: initialSelection.classId, label: initialSelection.className });
    }
    return options;
  }, [classData, initialSelection?.classId, initialSelection?.className]);

  const bookOptions = useMemo(() => {
    const options = (bookData || []).map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Book',
    }));
    if (
      initialSelection?.bookId &&
      initialSelection.bookName &&
      !options.some(o => o.value === initialSelection.bookId)
    ) {
      options.unshift({ value: initialSelection.bookId, label: initialSelection.bookName });
    }
    return options;
  }, [bookData, initialSelection?.bookId, initialSelection?.bookName]);

  const didHydrateInitialSelection = useRef(false);

  useEffect(() => {
    if (didHydrateInitialSelection.current || !initialSelection) {
      return;
    }

    didHydrateInitialSelection.current = true;

    if (!selectedClassId && initialSelection.classId) {
      setValue('classId', initialSelection.classId, { shouldValidate: false });
    }

    if (!selectedBookId && initialSelection.bookId) {
      setValue('bookId', initialSelection.bookId, { shouldValidate: false });
    }
  }, [initialSelection, selectedClassId, selectedBookId, setValue]);

  return (
    <div>
      <FormString name="name" label="Name" placeholder="Enter Chapter Name" />

      <div className="space-y-2">
        {isLoadingClasses ? (
          <DropdownSkeleton />
        ) : (
          <div>
            <Label>Class</Label>
            <DropdownLoader
              isLoading={isLoadingClasses}
              error={classesError}
              isEmpty={classOptions.length === 0}
              emptyMessage="No active classes found."
            >
              <SelectField key={initialSelection?.classId || 'class'} name="classId" placeholder="Select class" options={classOptions} />
            </DropdownLoader>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {!selectedClassId ? (
          <div>
            <Label>Book</Label>
            <Para className="text-sm text-muted-foreground py-2">Select a class first</Para>
          </div>
        ) : isLoadingBooks ? (
          <DropdownSkeleton />
        ) : (
          <div>
            <Label>Book</Label>
            <DropdownLoader
              isLoading={isLoadingBooks}
              error={booksError}
              isEmpty={bookOptions.length === 0}
              emptyMessage="No active books found for this class."
            >
              <SelectField key={initialSelection?.bookId || 'book'} name="bookId" placeholder="Select book" options={bookOptions} />
            </DropdownLoader>
          </div>
        )}
      </div>

      <FormString
        name="description"
        label="Description"
        placeholder="Enter chapter description (optional)"
      />
      <FormString name="content" label="Content" placeholder="Enter chapter content (optional)" />

      <div className="grid grid-cols-2 gap-4">
        <FormNumber name="order" label="Order" placeholder="Enter display order" />
      </div>

      <SelectField
        name="status"
        label="Status"
        placeholder="Select Status"
        options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />
    </div>
  );
}
