'use client';
import React, { useMemo } from 'react';
import { useDropdownClasses } from '@/hooks';
import { useDropdownBooks } from '@/hooks';
import { useDropdownChapters } from '@/hooks';
import { useDropdownHeadings } from '@/hooks';
import { useDropdownSubHeadings } from '@/hooks';
import { StatusEnum } from '@muzammil328/education-packages/enums';

interface McqModalFormProps {
  form: {
    watch: (field: string) => unknown;
    setValue: (field: string, value: unknown) => void;
  };
  isView?: boolean;
  isOpen?: boolean;
}

export function McqModalForm({ form, isView, isOpen = true }: McqModalFormProps) {
  const { data: classesData, isLoading: classesLoading } = useDropdownClasses(isOpen);
  const { data: booksData, isLoading: booksLoading } = useDropdownBooks(undefined, {
    enabled: isOpen,
  });
  const { data: chaptersData, isLoading: chaptersLoading } = useDropdownChapters(undefined, {
    enabled: isOpen,
  });
  const { data: headingsData, isLoading: headingsLoading } = useDropdownHeadings(undefined, {
    enabled: isOpen,
  });
  const { data: subHeadingsData, isLoading: subHeadingsLoading } = useDropdownSubHeadings(
    undefined,
    { enabled: isOpen }
  );

  const classes = useMemo(() => {
    if (!classesData) return [];
    return classesData.map((item: { value?: string; label?: string }) => ({
      value: item.value || '',
      label: item.label || 'Unnamed Class',
    }));
  }, [classesData]);

  const books = useMemo(() => {
    if (!booksData) return [];
    return booksData.map((item: { value?: string; label?: string }) => ({
      value: item.value || '',
      label: item.label || 'Unnamed Book',
    }));
  }, [booksData]);

  const chapters = useMemo(() => {
    if (!chaptersData) return [];
    return chaptersData.map((item: { value?: string; label?: string }) => ({
      value: item.value || '',
      label: item.label || 'Unnamed Chapter',
    }));
  }, [chaptersData]);

  const headings = useMemo(() => {
    if (!headingsData) return [];
    return headingsData.map((item: { value?: string; label?: string }) => ({
      value: item.value || '',
      label: item.label || 'Unnamed Heading',
    }));
  }, [headingsData]);

  const subHeadings = useMemo(() => {
    if (!subHeadingsData) return [];
    return subHeadingsData.map((item: { value?: string; label?: string }) => ({
      value: item.value || '',
      label: item.label || 'Unnamed Sub Heading',
    }));
  }, [subHeadingsData]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-sm font-medium">Class *</span>
          <select
            value={form.watch('classId')}
            onChange={e => form.setValue('classId', e.target.value)}
            disabled={isView || classesLoading}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Class</option>
            {classes.map((item: { value: string; label: string }) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Book *</span>
          <select
            value={form.watch('bookId')}
            onChange={e => form.setValue('bookId', e.target.value)}
            disabled={isView || booksLoading}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Book</option>
            {books.map((item: { value: string; label: string }) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Chapter *</span>
          <select
            value={form.watch('chapterId')}
            onChange={e => form.setValue('chapterId', e.target.value)}
            disabled={isView || chaptersLoading}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Chapter</option>
            {chapters.map((item: { value: string; label: string }) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Heading</span>
          <select
            value={form.watch('headingId') || ''}
            onChange={e => form.setValue('headingId', e.target.value)}
            disabled={isView || headingsLoading}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Heading</option>
            {headings.map((item: { value: string; label: string }) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Sub Heading</span>
          <select
            value={form.watch('subHeadingId') || ''}
            onChange={e => form.setValue('subHeadingId', e.target.value)}
            disabled={isView || subHeadingsLoading}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Sub Heading</option>
            {subHeadings.map((item: { value: string; label: string }) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Status</span>
          <select
            value={form.watch('status')}
            onChange={e => form.setValue('status', e.target.value)}
            disabled={isView}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value={StatusEnum.Active}>Active</option>
            <option value={StatusEnum.Inactive}>Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
}
