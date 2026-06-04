'use client';

import { useState, useMemo } from 'react';
import { Button } from '@muzammil328/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@muzammil328/ui/forms';
import {
  useDropdownClasses,
  useDropdownBooks,
  useDropdownChapters,
  useDropdownHeadings,
  useDropdownSubHeadings,
} from '@/hooks';
import { ChevronRight } from 'lucide-react';

interface Step1Data {
  classId: string;
  bookId: string;
  chapterId: string;
  headingId: string;
  subHeadingId: string;
  className?: string;
  bookName?: string;
  chapterName?: string;
  headingName?: string;
  subHeadingName?: string;
}

interface SteepperStep1Props {
  initialData: Step1Data;
  onNext: (data: Step1Data) => void;
}

export function SteepperStep1({ initialData, onNext }: SteepperStep1Props) {
  const [formData, setFormData] = useState<Step1Data>(initialData);

  const { data: classesData, isLoading: classesLoading } = useDropdownClasses();
  const { data: booksData, isLoading: booksLoading } = useDropdownBooks({
    classId: formData.classId,
  });
  const { data: chaptersData, isLoading: chaptersLoading } = useDropdownChapters({
    bookId: formData.bookId,
  });
  const { data: headingsData, isLoading: headingsLoading } = useDropdownHeadings({
    classId: formData.classId,
    bookId: formData.bookId,
    chapterId: formData.chapterId,
  });
  const { data: subHeadingsData, isLoading: subHeadingsLoading } = useDropdownSubHeadings({
    classId: formData.classId,
    bookId: formData.bookId,
    chapterId: formData.chapterId,
    headingId: formData.headingId,
  });

  const classes = useMemo(
    () =>
      classesData?.map(item => ({
        value: item.value || '',
        label: item.label || 'Unnamed Class',
      })) || [],
    [classesData]
  );

  const books = useMemo(
    () =>
      booksData?.map(item => ({
        value: item.value || '',
        label: item.label || 'Unnamed Book',
      })) || [],
    [booksData]
  );

  const chapters = useMemo(
    () =>
      chaptersData?.map(item => ({
        value: item.value || '',
        label: item.label || 'Unnamed Chapter',
      })) || [],
    [chaptersData]
  );

  const headings = useMemo(
    () =>
      headingsData?.map(item => ({
        value: item.value || '',
        label: item.label || 'Unnamed Heading',
      })) || [],
    [headingsData]
  );

  const subHeadings = useMemo(
    () =>
      subHeadingsData?.map(item => ({
        value: item.value || '',
        label: item.label || 'Unnamed Sub Heading',
      })) || [],
    [subHeadingsData]
  );

  const handleChange = (field: keyof Step1Data, value: string) => {
    const updates: Partial<Step1Data> = { [field]: value };

    // Clear child selections when parent changes
    if (field === 'classId') {
      updates.bookId = '';
      updates.chapterId = '';
      updates.headingId = '';
      updates.subHeadingId = '';
    } else if (field === 'bookId') {
      updates.chapterId = '';
      updates.headingId = '';
      updates.subHeadingId = '';
    } else if (field === 'chapterId') {
      updates.headingId = '';
      updates.subHeadingId = '';
    } else if (field === 'headingId') {
      updates.subHeadingId = '';
    }

    setFormData(prev => ({ ...prev, ...updates }));
  };

  const canProceed = formData.classId && formData.bookId && formData.chapterId;

  const handleNext = () => {
    if (!canProceed) {
      alert('Please fill all required fields (Class, Book, Chapter)');
      return;
    }
    onNext({
      ...formData,
      className: classes.find(c => c.value === formData.classId)?.label || '',
      bookName: books.find(b => b.value === formData.bookId)?.label || '',
      chapterName: chapters.find(c => c.value === formData.chapterId)?.label || '',
      headingName: headings.find(h => h.value === formData.headingId)?.label || '',
      subHeadingName: subHeadings.find(s => s.value === formData.subHeadingId)?.label || '',
    });
  };

  const isLoading =
    classesLoading || booksLoading || chaptersLoading || headingsLoading || subHeadingsLoading;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-sm font-medium">Class *</span>
          <Select
            onValueChange={value => handleChange('classId', value)}
            value={formData.classId}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {formData.classId && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Book *</span>
            <Select
              onValueChange={value => handleChange('bookId', value)}
              value={formData.bookId}
              disabled={isLoading || booksLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Book" />
              </SelectTrigger>
              <SelectContent>
                {books.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {formData.bookId && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Chapter *</span>
            <Select
              onValueChange={value => handleChange('chapterId', value)}
              value={formData.chapterId}
              disabled={isLoading || chaptersLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Chapter" />
              </SelectTrigger>
              <SelectContent>
                {chapters.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {formData.chapterId && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Heading</span>
            <Select
              onValueChange={value => handleChange('headingId', value)}
              value={formData.headingId}
              disabled={isLoading || headingsLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Heading" />
              </SelectTrigger>
              <SelectContent>
                {headings.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {formData.headingId && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Sub Heading</span>
            <Select
              onValueChange={value => handleChange('subHeadingId', value)}
              value={formData.subHeadingId}
              disabled={isLoading || subHeadingsLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Sub Heading" />
              </SelectTrigger>
              <SelectContent>
                {subHeadings.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleNext} disabled={!canProceed} className="flex items-center gap-2">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
