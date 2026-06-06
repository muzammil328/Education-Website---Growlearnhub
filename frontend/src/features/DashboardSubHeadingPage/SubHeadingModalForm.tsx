'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { SelectField } from '@/components/ui/select-field'
import { DropdownLoader } from '@muzammil328/ui'
import { FormString, FormNumber, Label } from '@muzammil328/ui';
import { useDropdownClasses } from '@/hooks/use-public';
import { useDropdownBooks } from '@/hooks/use-public';
import { useDropdownChapters } from '@/hooks/use-chapter';
import { useDropdownHeadings } from '@/hooks/use-heading';
import { DropdownSkeleton } from '@/components/DropdownSkeleton';

interface SubHeadingModalFormProps {
  initialSelection?: {
    classId?: string;
    className?: string;
    bookId?: string;
    bookName?: string;
    chapterId?: string;
    chapterName?: string;
    headingId?: string;
    headingName?: string;
  };
}

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownItem {
  value?: string;
  label?: string;
}

export default function SubHeadingModalForm({ initialSelection }: SubHeadingModalFormProps) {
  const { setValue } = useFormContext();
  const selectedClassId = useWatch({ name: 'classId' });
  const selectedBookId = useWatch({ name: 'bookId' });
  const selectedChapterId = useWatch({ name: 'chapterId' });
  const selectedHeadingId = useWatch({ name: 'headingId' });
  const effectiveClassId = selectedClassId || initialSelection?.classId;
  const effectiveBookId = selectedBookId || initialSelection?.bookId;
  const effectiveChapterId = selectedChapterId || initialSelection?.chapterId;

  const classIdMounted = useRef(false);
  const bookIdMounted = useRef(false);
  const chapterIdMounted = useRef(false);
  const didHydrateInitialSelection = useRef(false);
  const previousClassId = useRef<string | undefined>(undefined);
  const previousBookId = useRef<string | undefined>(undefined);
  const previousChapterId = useRef<string | undefined>(undefined);

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

  const {
    data: headingData,
    isLoading: headingLoading,
    error: headingError,
  } = useDropdownHeadings(
    effectiveChapterId
      ? { classId: effectiveClassId, bookId: effectiveBookId, chapterId: effectiveChapterId }
      : undefined
  );

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

    if (!selectedHeadingId && initialSelection.headingId) {
      setValue('headingId', initialSelection.headingId, { shouldValidate: false });
    }
  }, [
    initialSelection,
    selectedClassId,
    selectedBookId,
    selectedChapterId,
    selectedHeadingId,
    setValue,
  ]);

  useEffect(() => {
    if (!selectedClassId) {
      previousClassId.current = undefined;
      previousBookId.current = undefined;
      previousChapterId.current = undefined;
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
      setValue('headingId', '');
    }

    previousClassId.current = selectedClassId;
  }, [selectedClassId, setValue]);

  useEffect(() => {
    if (!selectedBookId) {
      previousBookId.current = undefined;
      previousChapterId.current = undefined;
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
      setValue('headingId', '');
    }

    previousBookId.current = selectedBookId;
  }, [selectedBookId, setValue]);

  useEffect(() => {
    if (!selectedChapterId) {
      previousChapterId.current = undefined;
      return;
    }

    if (!chapterIdMounted.current) {
      chapterIdMounted.current = true;
      previousChapterId.current = selectedChapterId;
      return;
    }
    const didChapterChangeFromExistingValue =
      Boolean(previousChapterId.current) && previousChapterId.current !== selectedChapterId;

    if (didChapterChangeFromExistingValue) {
      setValue('headingId', '');
    }

    previousChapterId.current = selectedChapterId;
  }, [selectedChapterId, setValue]);

  const classOptions = useMemo(() => {
    const options: DropdownOption[] = (classData || []).map((item: DropdownItem) => ({
      value: item.value || '',
      label: item.label || 'Unnamed Class',
    }));

    if (
      initialSelection?.classId &&
      initialSelection.className &&
      !options.some((option: DropdownOption) => option.value === initialSelection.classId)
    ) {
      options.unshift({ value: initialSelection.classId, label: initialSelection.className });
    }

    return options;
  }, [classData, initialSelection?.classId, initialSelection?.className]);

  const bookOptions = useMemo(() => {
    const options: DropdownOption[] = (bookData || []).map((item: DropdownItem) => ({
      value: item.value || '',
      label: item.label || 'Unnamed Book',
    }));

    if (
      initialSelection?.bookId &&
      initialSelection.bookName &&
      !options.some((option: DropdownOption) => option.value === initialSelection.bookId)
    ) {
      options.unshift({ value: initialSelection.bookId, label: initialSelection.bookName });
    }

    return options;
  }, [bookData, initialSelection?.bookId, initialSelection?.bookName]);

  const chapterOptions = useMemo(() => {
    const options: DropdownOption[] = (chapterData || []).map((item: DropdownItem) => ({
      value: item.value || '',
      label: item.label || 'Unnamed Chapter',
    }));

    if (
      initialSelection?.chapterId &&
      initialSelection.chapterName &&
      !options.some((option: DropdownOption) => option.value === initialSelection.chapterId)
    ) {
      options.unshift({ value: initialSelection.chapterId, label: initialSelection.chapterName });
    }

    return options;
  }, [chapterData, initialSelection?.chapterId, initialSelection?.chapterName]);

  const headingOptions = useMemo(() => {
    const options: DropdownOption[] = (headingData || []).map((item: DropdownItem) => ({
      value: item.value || '',
      label: item.label || 'Unnamed Heading',
    }));

    if (
      initialSelection?.headingId &&
      initialSelection.headingName &&
      !options.some((option: DropdownOption) => option.value === initialSelection.headingId)
    ) {
      options.unshift({ value: initialSelection.headingId, label: initialSelection.headingName });
    }

    return options;
  }, [headingData, initialSelection?.headingId, initialSelection?.headingName]);

  return (
    <div>
      <FormString name="name" label="Name" placeholder="Enter SubHeading Name" />

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
          <div>
            <Label>Book</Label>
            <p className="text-sm text-muted-foreground py-2">Select a class first</p>
          </div>
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
          <div>
            <Label>Chapter</Label>
            <p className="text-sm text-muted-foreground py-2">Select a book first</p>
          </div>
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

      <div className="space-y-2">
        {!effectiveChapterId ? (
          <div>
            <Label>Heading</Label>
            <p className="text-sm text-muted-foreground py-2">Select a chapter first</p>
          </div>
        ) : headingLoading ? (
          <DropdownSkeleton />
        ) : (
          <DropdownLoader
            isLoading={headingLoading}
            error={headingError}
            isEmpty={headingOptions.length === 0}
            emptyMessage="No active headings found for this chapter."
          >
            <SelectField
              name="headingId"
              label="Heading"
              placeholder="Select Heading Name"
              options={headingOptions}
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
    </div>
  );
}
