'use client';
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { DeleteModal } from '@muzammil328/ui';
import { Skeleton } from '@muzammil328/ui';
import { toast } from '@muzammil328/ui';
import { FolderOpen } from 'lucide-react';
import { useDeleteBook } from '@/hooks';
import { type RouterOutputs, type TrpcError } from '@/trpc/trpc';
import BookTableActionButton from './BookTableActionButton';
import { BookModal } from './BookModal';

interface BookTableProps {
  data: {
    bookId: string;
    name: string;
    className: string;
    status: string;
  }[];
  isLoading?: boolean;
  isBookViewOpen?: boolean;
  setIsBookViewOpen?: (open: boolean) => void;
  isBookEditOpen?: boolean;
  setIsBookEditOpen?: (open: boolean) => void;
  selectedBookId?: string | null;
  setSelectedBookId?: (id: string | null) => void;
  isAddBookOpen?: boolean;
  setIsAddBookOpen?: (open: boolean) => void;
}

export function BookTable({
  data = [],
  isLoading,
  isBookViewOpen,
  setIsBookViewOpen,
  isBookEditOpen,
  setIsBookEditOpen,
  selectedBookId,
  setSelectedBookId,
  isAddBookOpen,
  setIsAddBookOpen,
}: BookTableProps) {
  const deleteBookMutation = useDeleteBook();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;

    deleteBookMutation.mutate(
      { id: deleteConfirmId },
      {
        onSuccess: (response: RouterOutputs['book']['delete']) => {
          toast.success(response.message || 'Book deleted successfully');
        },
        onError: (error: TrpcError) => {
          toast.error(error.message || 'Failed to delete book');
        },
      }
    );
    setDeleteConfirmId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  const handleView = (bookId: string) => {
    if (setSelectedBookId) setSelectedBookId(bookId);
    if (setIsBookViewOpen) setIsBookViewOpen(true);
  };

  const handleEdit = (bookId: string) => {
    if (setSelectedBookId) setSelectedBookId(bookId);
    if (setIsBookEditOpen) setIsBookEditOpen(true);
  };

  return (
    <>
      <Table className="mt-0">
        <TableHeader className="bg-gray-100 dark:bg-gray-800">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 7 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-10 ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map(bookItem => (
              <TableRow key={bookItem.bookId}>
                <TableCell>{bookItem.name}</TableCell>
                <TableCell>{bookItem?.className}</TableCell>
                <TableCell>{bookItem.status}</TableCell>
                <TableCell className="text-right">
                  <BookTableActionButton
                    bookId={bookItem.bookId}
                    setDeleteConfirmId={setDeleteConfirmId}
                    deleteBookMutation={deleteBookMutation}
                    onView={() => handleView(bookItem.bookId)}
                    onEdit={() => handleEdit(bookItem.bookId)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="flex flex-col items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 p-6 mb-4">
                    <FolderOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No Books Available
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-sm">
                    There are currently no books added. Once books are created, they will appear
                    here.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <BookModal
        mode="view"
        bookId={selectedBookId ?? undefined}
        isOpen={isBookViewOpen}
        onOpenChange={open => {
          if (setIsBookViewOpen) setIsBookViewOpen(open);
        }}
        trigger={null}
      />

      <BookModal
        mode="edit"
        bookId={selectedBookId ?? undefined}
        isOpen={isBookEditOpen}
        onOpenChange={open => {
          if (setIsBookEditOpen) setIsBookEditOpen(open);
        }}
        trigger={null}
      />

      <BookModal mode="add" isOpen={isAddBookOpen} onOpenChange={setIsAddBookOpen} trigger={null} />

      <DeleteModal
        open={deleteConfirmId !== null}
        onOpenChange={open => !open && handleDeleteCancel()}
        onConfirm={handleDeleteConfirm}
        title="Delete Book"
        description="Are you sure you want to delete this book? This action cannot be undone."
        isLoading={deleteBookMutation.isPending}
      />
    </>
  );
}
