'use client';

import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { DeleteModal } from '@muzammil328/ui';
import { Skeleton } from '@muzammil328/ui';
import { toast } from '@muzammil328/ui';
import { FolderOpen } from 'lucide-react';
import { useDeleteChapter } from '@/hooks';
import { type RouterOutputs, type TrpcError } from '@/trpc/trpc';
import ChapterTableActionButton from './ChapterTableActionButton';
import { ChapterModal } from './ChapterModal';

interface ChapterTableProps {
  data: {
    chapterId: string;
    name: string;
    className: string;
    bookName: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
  }[];
  isLoading?: boolean;
  isChapterViewOpen?: boolean;
  setIsChapterViewOpen?: (open: boolean) => void;
  isChapterEditOpen?: boolean;
  setIsChapterEditOpen?: (open: boolean) => void;
  selectedChapterId?: string | null;
  setSelectedChapterId?: (id: string | null) => void;
  isAddChapterOpen?: boolean;
  setIsAddChapterOpen?: (open: boolean) => void;
}

export function ChapterTable({
  data = [],
  isLoading,
  isChapterViewOpen,
  setIsChapterViewOpen,
  isChapterEditOpen,
  setIsChapterEditOpen,
  selectedChapterId,
  setSelectedChapterId,
  isAddChapterOpen,
  setIsAddChapterOpen,
}: ChapterTableProps) {
  const deleteChapterMutation = useDeleteChapter();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    deleteChapterMutation.mutate(
      { id: deleteConfirmId },
      {
        onSuccess: (response: RouterOutputs['chapter']['delete']) => {
          toast.success(response.message || 'Chapter deleted successfully');
        },
        onError: (error: TrpcError) => {
          toast.error(error.message || 'Failed to delete chapter');
        },
      }
    );
    setDeleteConfirmId(null);
  };

  const handleView = (chapterId: string) => {
    if (setSelectedChapterId) setSelectedChapterId(chapterId);
    if (setIsChapterViewOpen) setIsChapterViewOpen(true);
  };

  const handleEdit = (chapterId: string) => {
    if (setSelectedChapterId) setSelectedChapterId(chapterId);
    if (setIsChapterEditOpen) setIsChapterEditOpen(true);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <>
      <Table className="mt-0">
        <TableHeader className="bg-gray-100 dark:bg-gray-800">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class Name</TableHead>
            <TableHead>Book Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 7 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 7 }).map((__, i) => (
                  <TableCell key={i}>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map(chapterItem => (
              <TableRow key={chapterItem.chapterId}>
                <TableCell>{chapterItem.name}</TableCell>
                <TableCell>{chapterItem.className}</TableCell>
                <TableCell>{chapterItem.bookName}</TableCell>
                <TableCell>{chapterItem.status}</TableCell>
                <TableCell>{formatDate(chapterItem.createdAt)}</TableCell>
                <TableCell>{formatDate(chapterItem.updatedAt)}</TableCell>
                <TableCell className="text-right">
                  <ChapterTableActionButton
                    chapterId={chapterItem.chapterId}
                    setDeleteConfirmId={setDeleteConfirmId}
                    deleteChapterMutation={deleteChapterMutation}
                    onView={() => handleView(chapterItem.chapterId)}
                    onEdit={() => handleEdit(chapterItem.chapterId)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="flex flex-col items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 p-6 mb-4">
                    <FolderOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No Chapters Available
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-sm">
                    There are currently no chapters added. Once chapters are created, they will
                    appear here.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ChapterModal
        mode="view"
        chapterId={selectedChapterId ?? undefined}
        isOpen={isChapterViewOpen}
        onOpenChange={open => {
          if (setIsChapterViewOpen) setIsChapterViewOpen(open);
        }}
        trigger={null}
      />

      <ChapterModal
        mode="edit"
        chapterId={selectedChapterId ?? undefined}
        isOpen={isChapterEditOpen}
        onOpenChange={open => {
          if (setIsChapterEditOpen) setIsChapterEditOpen(open);
        }}
        trigger={null}
      />

      <ChapterModal
        mode="add"
        isOpen={isAddChapterOpen}
        onOpenChange={setIsAddChapterOpen}
        trigger={null}
      />

      <DeleteModal
        open={deleteConfirmId !== null}
        onOpenChange={open => !open && setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Chapter"
        description="Are you sure you want to delete this chapter? This action cannot be undone."
        isLoading={deleteChapterMutation.isPending}
      />
    </>
  );
}
