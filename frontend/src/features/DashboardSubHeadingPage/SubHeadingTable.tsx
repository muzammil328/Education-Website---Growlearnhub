'use client';

import React, { useState } from 'react';
import { DeleteModal, Heading3, Para, Skeleton, TableBody, TableCell, TableHeader, TableHead, TableRoot as Table, TableRow, toast } from '@muzammil328/ui';
import { FolderOpen } from 'lucide-react';
import { useDeleteSubHeading } from '@/hooks';
import type { DashboardSubHeadingTableProps } from '@/types/subHeading.types';
import SubHeadingTableActionButton from './SubHeadingTableActionButton';
import { SubHeadingModal } from './SubHeadingModal';

interface SubHeadingTableProps {
  data: DashboardSubHeadingTableProps[];
  isLoading?: boolean;
  isSubHeadingViewOpen?: boolean;
  setIsSubHeadingViewOpen?: (open: boolean) => void;
  isSubHeadingEditOpen?: boolean;
  setIsSubHeadingEditOpen?: (open: boolean) => void;
  selectedSubHeadingId?: string | null;
  setSelectedSubHeadingId?: (id: string | null) => void;
  isAddSubHeadingOpen?: boolean;
  setIsAddSubHeadingOpen?: (open: boolean) => void;
}

export function SubHeadingTable({
  data = [],
  isLoading,
  isSubHeadingViewOpen,
  setIsSubHeadingViewOpen,
  isSubHeadingEditOpen,
  setIsSubHeadingEditOpen,
  selectedSubHeadingId,
  setSelectedSubHeadingId,
  isAddSubHeadingOpen,
  setIsAddSubHeadingOpen,
}: SubHeadingTableProps) {
  const deleteSubHeadingMutation = useDeleteSubHeading();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    deleteSubHeadingMutation.mutate(
      { id: deleteConfirmId },
      {
        onSuccess: response => {
          toast.success(response.message || 'SubHeading deleted successfully');
        },
        onError: error => {
          toast.error(error.message || 'Failed to delete subHeading');
        },
      }
    );
    setDeleteConfirmId(null);
  };

  const handleView = (subHeadingId: string) => {
    if (setSelectedSubHeadingId) setSelectedSubHeadingId(subHeadingId);
    if (setIsSubHeadingViewOpen) setIsSubHeadingViewOpen(true);
  };

  const handleEdit = (subHeadingId: string) => {
    if (setSelectedSubHeadingId) setSelectedSubHeadingId(subHeadingId);
    if (setIsSubHeadingEditOpen) setIsSubHeadingEditOpen(true);
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
            <TableHead>Heading Name</TableHead>
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
                {Array.from({ length: 9 }).map((__, i) => (
                  <TableCell key={i}>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map(subHeadingItem => (
              <TableRow key={subHeadingItem.subHeadingId}>
                <TableCell>{subHeadingItem.name}</TableCell>
                <TableCell>{subHeadingItem.className}</TableCell>
                <TableCell>{subHeadingItem.bookName}</TableCell>
                <TableCell>{subHeadingItem.chapterName}</TableCell>
                <TableCell>{subHeadingItem.headingName}</TableCell>
                <TableCell>{subHeadingItem.status}</TableCell>
                <TableCell>{formatDate(subHeadingItem.createdAt)}</TableCell>
                <TableCell>{formatDate(subHeadingItem.updatedAt)}</TableCell>
                <TableCell className="text-right">
                  <SubHeadingTableActionButton
                    subHeadingId={subHeadingItem.subHeadingId}
                    setDeleteConfirmId={setDeleteConfirmId}
                    deleteSubHeadingMutation={deleteSubHeadingMutation}
                    onView={() => handleView(subHeadingItem.subHeadingId)}
                    onEdit={() => handleEdit(subHeadingItem.subHeadingId)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9}>
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="flex flex-col items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 p-6 mb-4">
                    <FolderOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <Heading3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No SubHeadings Available
                  </Heading3>
                  <Para className="text-sm text-muted-foreground text-center max-w-sm">
                    There are currently no subheadings added. Once subheadings are created, they
                    will appear here.
                  </Para>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <SubHeadingModal
        mode="view"
        subHeadingId={selectedSubHeadingId ?? undefined}
        isOpen={isSubHeadingViewOpen}
        onOpenChange={open => {
          if (setIsSubHeadingViewOpen) setIsSubHeadingViewOpen(open);
          if (!open && setSelectedSubHeadingId) setSelectedSubHeadingId(null);
        }}
        trigger={null}
      />

      <SubHeadingModal
        mode="edit"
        subHeadingId={selectedSubHeadingId ?? undefined}
        isOpen={isSubHeadingEditOpen}
        onOpenChange={open => {
          if (setIsSubHeadingEditOpen) setIsSubHeadingEditOpen(open);
          if (!open && setSelectedSubHeadingId) setSelectedSubHeadingId(null);
        }}
        trigger={null}
      />

      <SubHeadingModal
        mode="add"
        isOpen={isAddSubHeadingOpen}
        onOpenChange={setIsAddSubHeadingOpen}
        trigger={null}
      />

      <DeleteModal
        open={deleteConfirmId !== null}
        onOpenChange={open => !open && setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete SubHeading"
        description="Are you sure you want to delete this subHeading? This action cannot be undone."
        isLoading={deleteSubHeadingMutation.isPending}
        className="bg-background"
      />
    </>
  );
}
