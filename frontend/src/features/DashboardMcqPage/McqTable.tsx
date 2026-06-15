'use client';
import React, { useState } from 'react';
import { DeleteModal, Skeleton, TableBody, TableCell, TableHead, TableHeader, TableRoot as Table, TableRow, toast } from '@muzammil328/ui';
import { useDeleteMcqs } from '@/hooks/use-mcqs';
import type { McqItem } from '@/types/mcqs.types';
import TableActionButton from './McqTableActionButton';

interface McqTableProps {
  data: McqItem[];
  isLoading?: boolean;
}

export function McqTable({ data = [], isLoading }: McqTableProps) {
  const deleteMcqsMutation = useDeleteMcqs();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;

    deleteMcqsMutation.mutate(
      { id: deleteConfirmId },
      {
        onSuccess: response => {
          toast.success(response.message || 'MCQ deleted successfully');
        },
        onError: error => {
          toast.error(error.message || 'Failed to delete MCQ');
        },
      }
    );
    setDeleteConfirmId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  return (
    <>
      <Table className="mt-0">
        <TableHeader className="bg-gray-100 dark:bg-gray-800">
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Chapter</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-10 ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map(mcq => (
              <TableRow key={mcq.mcqId}>
                <TableCell className="max-w-xs truncate" title={mcq.question}>
                  {mcq.question}
                </TableCell>
                <TableCell>{mcq.className || '-'}</TableCell>
                <TableCell>{mcq.bookName || '-'}</TableCell>
                <TableCell>{mcq.chapterName || '-'}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      mcq.difficulty === 'easy'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : mcq.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {mcq.difficulty || 'medium'}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      mcq.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {mcq.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <TableActionButton
                    mcqId={mcq.mcqId}
                    setDeleteConfirmId={setDeleteConfirmId}
                    deleteMcqsMutation={deleteMcqsMutation}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center" colSpan={7}>
                No MCQs available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DeleteModal
        open={deleteConfirmId !== null}
        onOpenChange={open => !open && handleDeleteCancel()}
        onConfirm={handleDeleteConfirm}
        title="Delete MCQ"
        description="Are you sure you want to delete this MCQ? This action cannot be undone."
        isLoading={deleteMcqsMutation.isPending}
        className="bg-background"
      />
    </>
  );
}
