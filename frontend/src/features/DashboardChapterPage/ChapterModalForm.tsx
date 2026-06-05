'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { SelectField } from '@/components/ui/select-field'
import { DropdownLoader } from '@muzammil328/ui'
import { Label, FormString, FormNumber } from '@muzammil328/ui';
import { useDropdownClasses } from '@/hooks';
import { useDropdownBooks } from '@/hooks';
import { DropdownSkeleton } from '@/components/DropdownSkeleton';

export default function ChapterModalForm({ isOpen = true }: { isOpen?: boolean }) {
  const {
    data: classData,
    isLoading: isLoadingClasses,
    error: classesError,
  } = useDropdownClasses(isOpen);

  const {
    data: bookData,
    isLoading: isLoadingBooks,
    error: booksError,
  } = useDropdownBooks(undefined, { enabled: isOpen });

  const classOptions = useMemo(() => {
    if (!classData) return [];
    return classData.map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Class',
    }));
  }, [classData]);

  const bookOptions = useMemo(() => {
    if (!bookData) return [];
    return bookData.map(item => ({
      value: item.value || '',
      label: item.label || 'Unnamed Book',
    }));
  }, [bookData]);

  return (
    <React.Fragment>
      <FormString name="name" label="Name" placeholder="Enter Chapter Name" />

      <div className="space-y-2">
        {isLoadingClasses ? (
          <DropdownSkeleton />
        ) : (
          <React.Fragment>
            <Label>Class</Label>
            <DropdownLoader
              isLoading={isLoadingClasses}
              error={classesError}
              isEmpty={classOptions.length === 0}
              emptyMessage="No active classes found."
            >
              <SelectField name="classId" placeholder="Select class" options={classOptions} />
            </DropdownLoader>
          </React.Fragment>
        )}
      </div>

      <div className="space-y-2">
        {!selectedClassId ? (
          <React.Fragment>
            <Label>Book</Label>
            <p className="text-sm text-muted-foreground py-2">Select a class first</p>
          </React.Fragment>
        ) : isLoadingBooks ? (
          <DropdownSkeleton />
        ) : (
          <React.Fragment>
            <Label>Book</Label>
            <DropdownLoader
              isLoading={isLoadingBooks}
              error={booksError}
              isEmpty={bookOptions.length === 0}
              emptyMessage="No active books found for this class."
            >
              <SelectField name="bookId" placeholder="Select book" options={bookOptions} />
            </DropdownLoader>
          </React.Fragment>
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
    </React.Fragment>
  );
}
