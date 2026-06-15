'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Para,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from '@muzammil328/ui';
import { ArrowLeft, Edit, Plus, Trash2, Upload, X } from 'lucide-react';
import { useDropdownBooks, useDropdownChapters, useDropdownClasses } from '@/hooks';
import { useBulkCreateHeadings } from '@/hooks';
import { DropdownSkeleton } from '@/components/DropdownSkeleton';
import { ImportRowsModal } from '@/components/ImportRowsModal';
import HeadingTypeSelector, { type HeadingType } from './HeadingTypeSelector';

interface BulkAddHeadingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'type' | 'form';

interface Row {
  name: string;
  order: string;
  status: 'active' | 'inactive';
}

interface ChapterGroup {
  chapterId: string;
  chapterName: string;
  rows: Row[];
}

const emptyRow = (): Row => ({ name: '', order: '', status: 'active' });

// ─── Nested Chapter Heading Modal ─────────────────────────────────────────────
function ChapterHeadingModal({
  isOpen,
  onOpenChange,
  chapters,
  initialChapterId,
  initialRows,
  onSave,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  chapters: { value: string; label: string }[];
  initialChapterId?: string;
  initialRows?: Row[];
  onSave: (chapterId: string, chapterName: string, rows: Row[]) => void;
}) {
  const [chapterId, setChapterId] = useState(initialChapterId || '');
  const [rows, setRows] = useState<Row[]>(
    initialRows?.length ? initialRows : [emptyRow(), emptyRow()]
  );

  useEffect(() => {
    if (isOpen) {
      setChapterId(initialChapterId || '');
      setRows(initialRows?.length ? initialRows : [emptyRow(), emptyRow()]);
    }
  }, [isOpen, initialChapterId, initialRows]);

  const selectedChapter = chapters.find(c => c.value === chapterId);

  const updateRow = <K extends keyof Row>(index: number, field: K, value: Row[K]) => {
    setRows(prev => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const addRow = () => setRows(prev => [...prev, emptyRow()]);

  const removeRow = (index: number) =>
    setRows(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

  const handleSave = () => {
    if (!chapterId) {
      toast.error('Please select a chapter');
      return;
    }
    const validRows = rows.filter(r => r.name.trim());
    if (validRows.length === 0) {
      toast.error('Please add at least one heading name');
      return;
    }
    const chapterName = selectedChapter?.label || chapterId;
    onSave(chapterId, chapterName, validRows);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => { if (!open) onOpenChange(false); }}>
      <DialogContent className="fixed left-1/2 top-1/2 z-[60] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Headings for Chapter</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Chapter</Label>
            <Select onValueChange={setChapterId} value={chapterId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Chapter" />
              </SelectTrigger>
              <SelectContent>
                {chapters.map(c => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Headings</Label>
            <div className="space-y-2">
              {rows.map((row, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Heading name ${index + 1}`}
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
            <Button type="button" variant="outline" size="sm" onClick={addRow}>
              <Plus className="h-4 w-4 mr-1" /> Add Row
            </Button>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Bulk Add Heading Modal ──────────────────────────────────────────────
export function BulkAddHeadingModal({ isOpen, onOpenChange }: BulkAddHeadingModalProps) {
  const [step, setStep] = useState<Step>('type');
  const [headingType, setHeadingType] = useState<HeadingType | null>(null);

  // Class-based state
  const [classId, setClassId] = useState('');
  const [bookId, setBookId] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [rows, setRows] = useState<Row[]>([emptyRow(), emptyRow()]);
  const [chapterGroups, setChapterGroups] = useState<ChapterGroup[]>([]);

  // Subject-based state
  const [subjectBookId, setSubjectBookId] = useState('');
  const [subjectRows, setSubjectRows] = useState<Row[]>([emptyRow(), emptyRow()]);

  // Nested modal state
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [editingChapterGroup, setEditingChapterGroup] = useState<{
    chapterId: string;
    rows: Row[];
  } | null>(null);

  // Import modal state
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importContext, setImportContext] = useState<'class' | 'subject'>('class');

  // Data fetching
  const { data: classData, isLoading: classLoading } = useDropdownClasses(headingType === 'class');
  const { data: bookData, isLoading: bookLoading } = useDropdownBooks(
    headingType === 'class' && classId ? { classId } : undefined,
    { enabled: headingType === 'class' && Boolean(classId) }
  );
  const { data: chapterData, isLoading: chapterLoading } = useDropdownChapters(
    headingType === 'class' && bookId ? { bookId, classId } : undefined,
    { enabled: headingType === 'class' && Boolean(bookId) }
  );
  const { data: subjectBookData, isLoading: subjectBookLoading } = useDropdownBooks(
    { noClass: true },
    { enabled: headingType === 'subject' }
  );

  const bulkCreate = useBulkCreateHeadings();

  const classOptions = useMemo(() => classData || [], [classData]);
  const bookOptions = useMemo(() => bookData || [], [bookData]);
  const chapterOptions = useMemo(() => chapterData || [], [chapterData]);
  const subjectBookOptions = useMemo(() => subjectBookData || [], [subjectBookData]);

  const reset = () => {
    setStep('type');
    setHeadingType(null);
    setClassId('');
    setBookId('');
    setChapterId('');
    setRows([emptyRow(), emptyRow()]);
    setChapterGroups([]);
    setSubjectBookId('');
    setSubjectRows([emptyRow(), emptyRow()]);
    setEditingChapterGroup(null);
    setIsChapterModalOpen(false);
    setIsImportOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) reset();
    onOpenChange(open);
  };

  const handleSelectType = (type: HeadingType) => {
    setHeadingType(type);
    setStep('form');
  };

  const handleBackToType = () => {
    setStep('type');
    setHeadingType(null);
    setClassId('');
    setBookId('');
    setChapterId('');
    setRows([emptyRow(), emptyRow()]);
    setChapterGroups([]);
    setSubjectBookId('');
    setSubjectRows([emptyRow(), emptyRow()]);
  };

  // ─── Class-based handlers ──────────────────────────────────────────────────
  const handleClassChange = (value: string) => {
    setClassId(value);
    setBookId('');
    setChapterId('');
    setRows([emptyRow(), emptyRow()]);
    setChapterGroups([]);
  };

  const handleBookChange = (value: string) => {
    setBookId(value);
    setChapterId('');
    setRows([emptyRow(), emptyRow()]);
    setChapterGroups([]);
  };

  const updateRow = <K extends keyof Row>(index: number, field: K, value: Row[K]) => {
    setRows(prev => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const addRow = () => setRows(prev => [...prev, emptyRow()]);

  const removeRow = (index: number) =>
    setRows(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

  const handleImportRows = (imported: { name: string; order: string }[]) => {
    if (importContext === 'class') {
      setRows(imported.map(row => ({ name: row.name, order: row.order, status: 'active' })));
    } else {
      setSubjectRows(imported.map(row => ({ name: row.name, order: row.order, status: 'active' })));
    }
  };

  // ─── Subject-based handlers ────────────────────────────────────────────────
  const updateSubjectRow = <K extends keyof Row>(index: number, field: K, value: Row[K]) => {
    setSubjectRows(prev => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const addSubjectRow = () => setSubjectRows(prev => [...prev, emptyRow()]);

  const removeSubjectRow = (index: number) =>
    setSubjectRows(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

  // ─── Chapter group handlers ────────────────────────────────────────────────
  const handleOpenChapterModal = (chapterId?: string) => {
    if (chapterId) {
      const existing = chapterGroups.find(g => g.chapterId === chapterId);
      setEditingChapterGroup({
        chapterId,
        rows: existing?.rows || [],
      });
    } else {
      setEditingChapterGroup(null);
    }
    setIsChapterModalOpen(true);
  };

  const handleSaveChapterGroup = (chapterId: string, chapterName: string, rows: Row[]) => {
    setChapterGroups(prev => {
      const idx = prev.findIndex(g => g.chapterId === chapterId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { chapterId, chapterName, rows };
        return updated;
      }
      return [...prev, { chapterId, chapterName, rows }];
    });
  };

  const handleDeleteChapterGroup = (chapterId: string) => {
    setChapterGroups(prev => prev.filter(g => g.chapterId !== chapterId));
  };

  const handleEditChapterGroup = (group: ChapterGroup) => {
    setEditingChapterGroup({ chapterId: group.chapterId, rows: group.rows });
    setIsChapterModalOpen(true);
  };

  // ─── Submit ────────────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (headingType === 'class') {
        if (!classId || !bookId) {
          toast.error('Please select Class and Book');
          setIsSubmitting(false);
          return;
        }

        if (chapterId) {
          const items = rows
            .map(r => ({
              name: r.name.trim(),
              order: r.order ? Number(r.order) : undefined,
              status: r.status,
            }))
            .filter(r => r.name.length > 0);

          if (items.length === 0) {
            toast.error('Please add at least one heading name');
            setIsSubmitting(false);
            return;
          }

          const response = await bulkCreate.mutateAsync({
            classId,
            bookId,
            chapterId,
            items,
          });

          if (response.errorCount > 0) {
            response.errors?.forEach(err => toast.error(`Row ${err.row}: ${err.message}`));
          }
        } else {
          if (chapterGroups.length === 0) {
            toast.error('Please add headings for at least one chapter');
            setIsSubmitting(false);
            return;
          }

          for (const group of chapterGroups) {
            const items = group.rows.map(r => ({
              name: r.name.trim(),
              order: r.order ? Number(r.order) : undefined,
              status: r.status,
            }));

            const response = await bulkCreate.mutateAsync({
              classId,
              bookId,
              chapterId: group.chapterId,
              items,
            });

            if (response.errorCount > 0) {
              response.errors?.forEach(err =>
                toast.error(`Chapter "${group.chapterName}" Row ${err.row}: ${err.message}`)
              );
            }
          }
        }
      } else {
        if (!subjectBookId) {
          toast.error('Please select a Book');
          setIsSubmitting(false);
          return;
        }

        const items = subjectRows
          .map(r => ({
            name: r.name.trim(),
            order: r.order ? Number(r.order) : undefined,
            status: r.status,
          }))
          .filter(r => r.name.length > 0);

        if (items.length === 0) {
          toast.error('Please add at least one heading name');
          setIsSubmitting(false);
          return;
        }

        const response = await bulkCreate.mutateAsync({
          bookId: subjectBookId,
          items,
        });

        if (response.errorCount > 0) {
          response.errors?.forEach(err => toast.error(`Row ${err.row}: ${err.message}`));
        }
      }

      toast.success('Headings created successfully');
      handleOpenChange(false);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create headings');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Render: Type Selection ────────────────────────────────────────────────
  if (step === 'type') {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-xl">
          <DialogHeader>
            <DialogTitle>Bulk Add Headings</DialogTitle>
          </DialogHeader>
          <HeadingTypeSelector onSelect={handleSelectType} />
          <div className="flex justify-end pt-2">
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ─── Render: Class-Based Form ──────────────────────────────────────────────
  if (headingType === 'class') {
    const hasBook = Boolean(bookId);
    const hasChapter = Boolean(chapterId);

    return (
      <>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Bulk Add Headings</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Button type="button" variant="ghost" size="sm" onClick={handleBackToType} className="-ml-2">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>

              <div className="grid grid-cols-3 gap-4">
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
                  <Select onValueChange={handleBookChange} value={bookId} disabled={!classId || bookLoading}>
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
                  <Select onValueChange={setChapterId} value={chapterId} disabled={!bookId || chapterLoading}>
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
              </div>

              {hasBook && !hasChapter && (
                <div className="space-y-3">
                  <Label>Headings by Chapter</Label>

                  {chapterGroups.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {chapterGroups.map(group => (
                        <Card key={group.chapterId} className="relative">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <Para className="font-medium">{group.chapterName}</Para>
                                <Para className="text-sm text-muted-foreground">
                                  {group.rows.length} heading{group.rows.length !== 1 ? 's' : ''}
                                </Para>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button type="button" variant="ghost" size="sm" onClick={() => handleEditChapterGroup(group)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => handleDeleteChapterGroup(group.chapterId)}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    {chapterLoading ? (
                      <DropdownSkeleton />
                    ) : (
                      chapterOptions.map(ch => {
                        const hasGroup = chapterGroups.some(g => g.chapterId === ch.value);
                        return (
                          <div key={ch.value} className="flex items-center justify-between border rounded-md p-3">
                            <span className="text-sm font-medium">{ch.label}</span>
                            {hasGroup ? (
                              <Para className="text-xs text-muted-foreground">
                                {chapterGroups.find(g => g.chapterId === ch.value)?.rows.length || 0} headings added
                              </Para>
                            ) : (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenChapterModal(ch.value)}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add Headings for Chapter
                              </Button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {hasBook && hasChapter && (
                <div className="space-y-2">
                  <Label>Headings</Label>
                  <div className="space-y-2">
                    {rows.map((row, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          placeholder={`Heading name ${index + 1}`}
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
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImportContext('class');
                        setIsImportOpen(true);
                      }}
                    >
                      <Upload className="h-4 w-4 mr-1" /> Import
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting || !hasBook}>
                  {isSubmitting ? 'Saving...' : 'Save Headings'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <ChapterHeadingModal
          isOpen={isChapterModalOpen}
          onOpenChange={setIsChapterModalOpen}
          chapters={chapterOptions}
          initialChapterId={editingChapterGroup?.chapterId}
          initialRows={editingChapterGroup?.rows}
          onSave={handleSaveChapterGroup}
        />

        <ImportRowsModal
          isOpen={isImportOpen}
          onOpenChange={setIsImportOpen}
          onImport={handleImportRows}
          title="Import Headings"
        />
      </>
    );
  }

  // ─── Render: Subject-Based Form ────────────────────────────────────────────
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Add Headings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Button type="button" variant="ghost" size="sm" onClick={handleBackToType} className="-ml-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>

          <div className="space-y-2">
            <Label>Book</Label>
            <Select onValueChange={setSubjectBookId} value={subjectBookId} disabled={subjectBookLoading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Book" />
              </SelectTrigger>
              <SelectContent>
                {subjectBookOptions.map(item => (
                  <SelectItem key={item.value} value={item.value || ''}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {subjectBookId && (
            <div className="space-y-2">
              <Label>Headings</Label>
              <div className="space-y-2">
                {subjectRows.map((row, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder={`Heading name ${index + 1}`}
                      value={row.name}
                      onChange={e => updateSubjectRow(index, 'name', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Order"
                      value={row.order}
                      onChange={e => updateSubjectRow(index, 'order', e.target.value)}
                      className="w-24"
                    />
                    <Select
                      onValueChange={value => updateSubjectRow(index, 'status', value as Row['status'])}
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
                      onClick={() => removeSubjectRow(index)}
                      disabled={subjectRows.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={addSubjectRow}>
                  <Plus className="h-4 w-4 mr-1" /> Add Row
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImportContext('subject');
                    setIsImportOpen(true);
                  }}
                >
                  <Upload className="h-4 w-4 mr-1" /> Import
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={isSubmitting || !subjectBookId}>
              {isSubmitting ? 'Saving...' : 'Save Headings'}
            </Button>
          </div>
        </div>

        <ImportRowsModal
          isOpen={isImportOpen}
          onOpenChange={setIsImportOpen}
          onImport={handleImportRows}
          title="Import Headings"
        />
      </DialogContent>
    </Dialog>
  );
}
