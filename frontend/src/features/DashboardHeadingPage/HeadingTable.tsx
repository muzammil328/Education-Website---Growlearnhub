'use client';

import React, { useState } from 'react';
import { DeleteModal, Heading3, Para, Skeleton, TableBody, TableCell, TableHeader, TableHead, TableRoot as Table, TableRow, toast } from '@muzammil328/ui';
import { FolderOpen } from 'lucide-react';
import { useDeleteHeading } from '@/hooks';
import type { DashboardHeadingTableProps } from '@/types/heading.types';
import HeadingTableActionButton from './HeadingTableActionButton';
import { HeadingModal } from './HeadingModal';

interface HeadingTableProps {
  data: DashboardHeadingTableProps[];
  isLoading?: boolean;
  isHeadingViewOpen?: boolean;
  setIsHeadingViewOpen?: (open: boolean) => void;
  isHeadingEditOpen?: boolean;
  setIsHeadingEditOpen?: (open: boolean) => void;
  selectedHeadingId?: string | null;
  setSelectedHeadingId?: (id: string | null) => void;
  isAddHeadingOpen?: boolean;
  setIsAddHeadingOpen?: (open: boolean) => void;
}

export function HeadingTable({
  data = [],
  isLoading,
  isHeadingViewOpen,
  setIsHeadingViewOpen,
  isHeadingEditOpen,
  setIsHeadingEditOpen,
  selectedHeadingId,
  setSelectedHeadingId,
  isAddHeadingOpen,
  setIsAddHeadingOpen,
}: HeadingTableProps) {
  const deleteHeadingMutation = useDeleteHeading();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    deleteHeadingMutation.mutate(
      { id: deleteConfirmId },
      {
        onSuccess: response => {
          toast.success(response.message || 'Heading deleted successfully');
        },
        onError: error => {
          toast.error(error.message || 'Failed to delete heading');
        },
      }
    );
    setDeleteConfirmId(null);
  };

  const handleView = (headingId: string) => {
    if (setSelectedHeadingId) setSelectedHeadingId(headingId);
    if (setIsHeadingViewOpen) setIsHeadingViewOpen(true);
  };

  const handleEdit = (headingId: string) => {
    if (setSelectedHeadingId) setSelectedHeadingId(headingId);
    if (setIsHeadingEditOpen) setIsHeadingEditOpen(true);
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
            <TableHead>Chapter Name</TableHead>
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
                {Array.from({ length: 8 }).map((__, i) => (
                  <TableCell key={i}>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map(headingItem => (
              <TableRow key={headingItem.headingId}>
                <TableCell>{headingItem.name}</TableCell>
                <TableCell>{headingItem.className}</TableCell>
                <TableCell>{headingItem.bookName}</TableCell>
                <TableCell>{headingItem.chapterName}</TableCell>
                <TableCell>{headingItem.status}</TableCell>
                <TableCell>{formatDate(headingItem.createdAt)}</TableCell>
                <TableCell>{formatDate(headingItem.updatedAt)}</TableCell>
                <TableCell className="text-right">
                  <HeadingTableActionButton
                    headingId={headingItem.headingId}
                    setDeleteConfirmId={setDeleteConfirmId}
                    deleteHeadingMutation={deleteHeadingMutation}
                    onView={() => handleView(headingItem.headingId)}
                    onEdit={() => handleEdit(headingItem.headingId)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8}>
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="flex flex-col items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 p-6 mb-4">
                    <FolderOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <Heading3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No Headings Available
                  </Heading3>
                  <Para className="text-sm text-muted-foreground text-center max-w-sm">
                    There are currently no headings added. Once headings are created, they will
                    appear here.
                  </Para>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <HeadingModal
        mode="view"
        headingId={selectedHeadingId ?? undefined}
        isOpen={isHeadingViewOpen}
        onOpenChange={open => {
          if (setIsHeadingViewOpen) setIsHeadingViewOpen(open);
        }}
        trigger={null}
      />

      <HeadingModal
        mode="edit"
        headingId={selectedHeadingId ?? undefined}
        isOpen={isHeadingEditOpen}
        onOpenChange={open => {
          if (setIsHeadingEditOpen) setIsHeadingEditOpen(open);
        }}
        trigger={null}
      />

      <HeadingModal
        mode="add"
        isOpen={isAddHeadingOpen}
        onOpenChange={setIsAddHeadingOpen}
        trigger={null}
      />

      <DeleteModal
        open={deleteConfirmId !== null}
        onOpenChange={open => !open && setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Heading"
        description="Are you sure you want to delete this heading? This action cannot be undone."
        isLoading={deleteHeadingMutation.isPending}
        className="bg-background"
      />
    </>
  );
}
