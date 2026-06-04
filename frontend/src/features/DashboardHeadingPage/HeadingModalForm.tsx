'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { SelectField } from '@/components/ui/select-field'
import { DropdownLoader } from '@muzammil328/ui'
import { FormString, FormNumber, Label } from '@muzammil328/ui/forms';
import { useDropdownClasses } from '@/hooks';
import { useDropdownBooks } from '@/hooks';
import { useDropdownChapters } from '@/hooks';
import { DropdownSkeleton } from '@/components/DropdownSkeleton';

interface HeadingModalFormProps {
  initialSelection?: {
    classId?: string;
    className?: string;
    bookId?: string;
    bookName?: string;
    chapterId?: string;
    chapterName?: string;
  };
}

export default function HeadingModalForm({ initialSelection }: HeadingModalFormProps) {
  const { setValue } = useFormContext();
  const selectedClassId = useWatch({ name: 'classId' });
  const selectedBookId = useWatch({ name: 'bookId' });
  const selectedChapterId = useWatch({ name: 'chapterId' });
  const effectiveClassId = selectedClassId || initialSelection?.classId;
  const effectiveBookId = selectedBookId || initialSelection?.bookId;

  const classIdMounted = useRef(false);
  const bookIdMounted = useRef(false);
  const didHydrateInitialSelection = useRef(false);
  const previousClassId = useRef<string | undefined>(undefined);
  const previousBookId = useRef<string | undefined>(undefined);

  const { data: classData, isLoading: classLoading, error: classError } = useDropdownClasses();

  const {
    data: bookData,
    isLoading: bookLoading,
    error: bookError,
  } = useDropdownBooks(effectiveClassId ? { classId: effectiveClassId } : undefined);

  const {
    data: chapterData,
    isLoading: chapterLoading,
    error: chapterError,
  } = useDropdownChapters(effectiveBookId ? { bookId: effectiveBookId } : undefined);

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

    if (!selectedChapterId && initialSelection.chapterId) {
      setValue('chapterId', initialSelection.chapterId, { shouldValidate: false });
    }
  }, [initialSelection, selectedClassId, selectedBookId, selectedChapterId, setValue]);

  useEffect(() => {
    if (!selectedClassId) {
      previousClassId.current = undefined;
      previousBookId.current = undefined;
      return;
    }

    if (!classIdMounted.current) {
      classIdMounted.current = true;
      previousClassId.current = selectedClassId;
      return;
    }
    const didClassChangeFromExistingValue =
      Boolean(previousClassId.current) && previousClassId.current !== selectedClassId;

    if (didClassChangeFromExistingValue) {
      setValue('bookId', '');
      setValue('chapterId', '');
    }

    previousClassId.current = selectedClassId;
  }, [selectedClassId, setValue]);

  useEffect(() => {
    if (!selectedBookId) {
      previousBookId.current = undefined;
      return;
    }

    if (!bookIdMounted.current) {
      bookIdMounted.current = true;
      previousBookId.current = selectedBookId;
      return;
    }
    const didBookChangeFromExistingValue =
      Boolean(previousBookId.current) && previousBookId.current !== selectedBookId;

    if (didBookChangeFromExistingValue) {
      setValue('chapterId', '');
    }

    previousBookId.current = selectedBookId;
  }, [selectedBookId, setValue]);

  const classOptions = useMemo(() => {
    const options = (classData || []).map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Class',
    }));

    if (
      initialSelection?.classId &&
      initialSelection.className &&
      !options.some(option => option.value === initialSelection.classId)
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
      !options.some(option => option.value === initialSelection.bookId)
    ) {
      options.unshift({ value: initialSelection.bookId, label: initialSelection.bookName });
    }

    return options;
  }, [bookData, initialSelection?.bookId, initialSelection?.bookName]);

  const chapterOptions = useMemo(() => {
    const options = (chapterData || []).map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Chapter',
    }));

    if (
      initialSelection?.chapterId &&
      initialSelection.chapterName &&
      !options.some(option => option.value === initialSelection.chapterId)
    ) {
      options.unshift({ value: initialSelection.chapterId, label: initialSelection.chapterName });
    }

    return options;
  }, [chapterData, initialSelection?.chapterId, initialSelection?.chapterName]);

  return (
    <React.Fragment>
      <FormString name="name" label="Name" placeholder="Enter Heading Name" />

      <div className="space-y-2">
        {classLoading ? (
          <DropdownSkeleton />
        ) : (
          <DropdownLoader
            isLoading={classLoading}
            error={classError}
            isEmpty={classOptions.length === 0}
            emptyMessage="No active classes found."
          >
            <SelectField
              name="classId"
              label="Class"
              placeholder="Select Class Name"
              options={classOptions}
            />
          </DropdownLoader>
        )}
      </div>

      <div className="space-y-2">
        {!effectiveClassId ? (
          <React.Fragment>
            <Label>Book</Label>
            <p className="text-sm text-muted-foreground py-2">Select a class first</p>
          </React.Fragment>
        ) : bookLoading ? (
          <DropdownSkeleton />
        ) : (
          <DropdownLoader
            isLoading={bookLoading}
            error={bookError}
            isEmpty={bookOptions.length === 0}
            emptyMessage="No active books found for this class."
          >
            <SelectField
              name="bookId"
              label="Book"
              placeholder="Select Book Name"
              options={bookOptions}
            />
          </DropdownLoader>
        )}
      </div>

      <div className="space-y-2">
        {!effectiveBookId ? (
          <React.Fragment>
            <Label>Chapter</Label>
            <p className="text-sm text-muted-foreground py-2">Select a book first</p>
          </React.Fragment>
        ) : chapterLoading ? (
          <DropdownSkeleton />
        ) : (
          <DropdownLoader
            isLoading={chapterLoading}
            error={chapterError}
            isEmpty={chapterOptions.length === 0}
            emptyMessage="No active chapters found for this book."
          >
            <SelectField
              name="chapterId"
              label="Chapter"
              placeholder="Select Chapter Name"
              options={chapterOptions}
            />
          </DropdownLoader>
        )}
      </div>

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
    </React.Fragment>
  );
}
