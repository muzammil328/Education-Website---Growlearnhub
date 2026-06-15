'use client';

import React, { useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from '@muzammil328/ui';
import { Plus, Trash2, Upload } from 'lucide-react';
import {
  useDropdownClasses,
  useDropdownBooks,
  useDropdownChapters,
  useDropdownHeadings,
  useBulkCreateSubHeadings,
} from '@/hooks';
import { ImportRowsModal } from '@/components/ImportRowsModal';

interface BulkAddSubHeadingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Row {
  name: string;
  order: string;
  status: 'active' | 'inactive';
}

const emptyRow = (): Row => ({ name: '', order: '', status: 'active' });

export function BulkAddSubHeadingModal({ isOpen, onOpenChange }: BulkAddSubHeadingModalProps) {
  const [classId, setClassId] = useState('');
  const [bookId, setBookId] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [headingId, setHeadingId] = useState('');
  const [rows, setRows] = useState<Row[]>([emptyRow(), emptyRow()]);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const { data: classData, isLoading: classLoading } = useDropdownClasses();
  const { data: bookData, isLoading: bookLoading } = useDropdownBooks(
    classId ? { classId } : undefined
  );
  const { data: chapterData, isLoading: chapterLoading } = useDropdownChapters(
    bookId ? { bookId, classId } : undefined
  );
  const { data: headingData, isLoading: headingLoading } = useDropdownHeadings(
    chapterId ? { classId, bookId, chapterId } : undefined
  );

  const bulkCreateMutation = useBulkCreateSubHeadings();

  const classOptions = useMemo(() => classData || [], [classData]);
  const bookOptions = useMemo(() => bookData || [], [bookData]);
  const chapterOptions = useMemo(() => chapterData || [], [chapterData]);
  const headingOptions = useMemo(() => headingData || [], [headingData]);

  const reset = () => {
    setClassId('');
    setBookId('');
    setChapterId('');
    setHeadingId('');
    setRows([emptyRow(), emptyRow()]);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) reset();
    onOpenChange(open);
  };

  const handleClassChange = (value: string) => {
    setClassId(value);
    setBookId('');
    setChapterId('');
    setHeadingId('');
  };

  const handleBookChange = (value: string) => {
    setBookId(value);
    setChapterId('');
    setHeadingId('');
  };

  const handleChapterChange = (value: string) => {
    setChapterId(value);
    setHeadingId('');
  };

  const updateRow = <K extends keyof Row>(index: number, field: K, value: Row[K]) => {
    setRows(prev => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const addRow = () => setRows(prev => [...prev, emptyRow()]);

  const removeRow = (index: number) =>
    setRows(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

  const handleImportRows = (imported: { name: string; order: string }[]) => {
    setRows(imported.map(row => ({ name: row.name, order: row.order, status: 'active' })));
  };

  const handleSubmit = () => {
    if (!classId || !bookId || !chapterId || !headingId) {
      toast.error('Please select Class, Book, Chapter and Heading');
      return;
    }

    const items = rows
      .map(row => ({
        name: row.name.trim(),
        order: row.order ? Number(row.order) : undefined,
        status: row.status,
      }))
      .filter(row => row.name.length > 0);

    if (items.length === 0) {
      toast.error('Please add at least one subheading name');
      return;
    }

    bulkCreateMutation.mutate(
      { classId, bookId, chapterId, headingId, items },
      {
        onSuccess: response => {
          toast.success(response.message || 'SubHeadings created successfully');
          if (response.errorCount > 0) {
            response.errors.forEach(err => toast.error(`Row ${err.row}: ${err.message}`));
          }
          handleOpenChange(false);
        },
        onError: (error: { message?: string }) => {
          toast.error(error.message || 'Failed to create subheadings');
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Add SubHeadings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Class</Label>
              <Select onValueChange={handleClassChange} value={classId} disabled={classLoading}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.map(item => (
                    <SelectItem key={item.value} value={item.value || ''}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Book</Label>
              <Select
                onValueChange={handleBookChange}
                value={bookId}
                disabled={!classId || bookLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Book" />
                </SelectTrigger>
                <SelectContent>
                  {bookOptions.map(item => (
                    <SelectItem key={item.value} value={item.value || ''}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Chapter</Label>
              <Select
                onValueChange={handleChapterChange}
                value={chapterId}
                disabled={!bookId || chapterLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Chapter" />
                </SelectTrigger>
                <SelectContent>
                  {chapterOptions.map(item => (
                    <SelectItem key={item.value} value={item.value || ''}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Heading</Label>
              <Select
                onValueChange={setHeadingId}
                value={headingId}
                disabled={!chapterId || headingLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Heading" />
                </SelectTrigger>
                <SelectContent>
                  {headingOptions.map(item => (
                    <SelectItem key={item.value} value={item.value || ''}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>SubHeadings</Label>
            <div className="space-y-2">
              {rows.map((row, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`SubHeading name ${index + 1}`}
                    value={row.name}
                    onChange={e => updateRow(index, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Order"
                    value={row.order}
                    onChange={e => updateRow(index, 'order', e.target.value)}
                    className="w-24"
                  />
                  <Select
                    onValueChange={value => updateRow(index, 'status', value as Row['status'])}
                    value={row.status}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRow(index)}
                    disabled={rows.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={addRow}>
                <Plus className="h-4 w-4 mr-1" /> Add Row
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setIsImportOpen(true)}>
                <Upload className="h-4 w-4 mr-1" /> Import
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={bulkCreateMutation.isPending}>
              {bulkCreateMutation.isPending ? 'Saving...' : 'Save SubHeadings'}
            </Button>
          </div>
        </div>
      </DialogContent>

      <ImportRowsModal
        isOpen={isImportOpen}
        onOpenChange={setIsImportOpen}
        onImport={handleImportRows}
        title="Import SubHeadings"
      />
    </Dialog>
  );
}
