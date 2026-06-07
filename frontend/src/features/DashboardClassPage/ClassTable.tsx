'use client';
import React, { useState } from 'react';
import { TableRoot as Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Skeleton, toast } from '@muzammil328/ui';
import { DeleteModal } from '@muzammil328/ui';
import { FolderOpen } from 'lucide-react';
import { useDeleteClass } from '@/hooks';
import type { DashboardClassTableProps as ClassRow } from '@/types/class.types';
import TableActionButton from './ClassTableActionButton';
import { ClassModal } from './ClassModal';

interface ClassTableProps {
  data: ClassRow[];
  isLoading?: boolean;
  isClassViewOpen?: boolean;
  setIsClassViewOpen?: (open: boolean) => void;
  isClassEditOpen?: boolean;
  setIsClassEditOpen?: (open: boolean) => void;
  selectedClassId?: string | null;
  setSelectedClassId?: (id: string | null) => void;
}

export function ClassTable({
  data = [],
  isLoading,
  isClassViewOpen,
  setIsClassViewOpen,
  isClassEditOpen,
  setIsClassEditOpen,
  selectedClassId,
  setSelectedClassId,
}: ClassTableProps) {
  const deleteClassMutation = useDeleteClass();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    deleteClassMutation.mutate(
      { id: deleteConfirmId },
      {
        onSuccess: (response: { message?: string }) => {
          toast.success(response.message || 'Class deleted successfully');
        },
        onError: (error: { message?: string }) => {
          toast.error(error.message || 'Failed to delete class');
        },
      }
    );
    setDeleteConfirmId(null);
  };

  const handleView = (classId: string) => {
    if (setSelectedClassId) setSelectedClassId(classId);
    if (setIsClassViewOpen) setIsClassViewOpen(true);
  };

  const handleEdit = (classId: string) => {
    if (setSelectedClassId) setSelectedClassId(classId);
    if (setIsClassEditOpen) setIsClassEditOpen(true);
  };

  return (
    <>
      <Table className="mt-0">
        <TableHeader className="bg-gray-100 dark:bg-gray-800">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Service Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
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
            data.map(classItem => (
              <TableRow key={classItem.classId}>
                <TableCell>{classItem.name}</TableCell>
                <TableCell>{classItem.serviceName?.join(', ')}</TableCell>
                <TableCell>{classItem.status}</TableCell>
                <TableCell className="text-right">
                  <TableActionButton
                    classId={classItem.classId}
                    setDeleteConfirmId={setDeleteConfirmId}
                    deleteClassMutation={deleteClassMutation}
                    onView={() => handleView(classItem.classId)}
                    onEdit={() => handleEdit(classItem.classId)}
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
                    No Classes Available
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-sm">
                    There are currently no classes added. Once classes are created, they will appear
                    here.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ClassModal
        mode="view"
        classId={selectedClassId ?? undefined}
        isOpen={isClassViewOpen}
        onOpenChange={open => {
          if (setIsClassViewOpen) setIsClassViewOpen(open);
          if (!open && setSelectedClassId) setSelectedClassId(null);
        }}
        trigger={null}
      />

      <ClassModal
        mode="edit"
        classId={selectedClassId ?? undefined}
        isOpen={isClassEditOpen}
        onOpenChange={open => {
          if (setIsClassEditOpen) setIsClassEditOpen(open);
          if (!open && setSelectedClassId) setSelectedClassId(null);
        }}
        trigger={null}
      />

      <DeleteModal
        open={deleteConfirmId !== null}
        onOpenChange={open => !open && setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Class"
        description="Are you sure you want to delete this class? This action cannot be undone."
        isLoading={deleteClassMutation.isPending}
        className="bg-background"
      />
    </>
  );
}
