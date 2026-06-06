'use client';

import React, { useState } from 'react';
import { TableRoot as Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@muzammil328/ui';
import { DeleteModal } from '@muzammil328/ui';
import { Skeleton } from '@muzammil328/ui';
import { toast } from '@muzammil328/ui';
import { FolderOpen } from 'lucide-react';
import type { DashboardServiceTableProps } from '@muzammil328/education-packages/types';
import ServiceTableActionButton from './ServiceTableActionButton';
import { ServiceModal } from './ServiceModal';

interface ServiceTableProps {
  data: DashboardServiceTableProps[];
  isLoading?: boolean;
  isServiceViewOpen: boolean;
  setIsServiceViewOpen: (open: boolean) => void;
  isServiceEditOpen: boolean;
  setIsServiceEditOpen: (open: boolean) => void;
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
}

export function ServiceTable({
  data = [],
  isLoading,
  isServiceViewOpen,
  setIsServiceViewOpen,
  isServiceEditOpen,
  setIsServiceEditOpen,
  selectedServiceId,
  setSelectedServiceId,
}: ServiceTableProps) {
  const deleteServiceMutation = useDeleteService();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;

    deleteServiceMutation.mutate(
      { id: deleteConfirmId },
      {
        onSuccess: response => {
          toast.success(response.message || 'Service deleted successfully');
        },
        onError: error => {
          toast.error(error.message || 'Failed to delete service');
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
            <TableHead>Name</TableHead>
            <TableHead>Class Name</TableHead>
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
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-10 ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map(serviceItem => (
              <TableRow key={serviceItem.serviceId}>
                <TableCell>{serviceItem.name}</TableCell>
                <TableCell>{serviceItem.className.join(', ')}</TableCell>
                <TableCell>{serviceItem.status}</TableCell>
                <TableCell className="text-right">
                  <ServiceTableActionButton
                    serviceId={serviceItem.serviceId}
                    setDeleteConfirmId={setDeleteConfirmId}
                    deleteServiceMutation={deleteServiceMutation}
                    onView={() => {
                      setSelectedServiceId(serviceItem.serviceId);
                      setIsServiceViewOpen(true);
                    }}
                    onEdit={() => {
                      setSelectedServiceId(serviceItem.serviceId);
                      setIsServiceEditOpen(true);
                    }}
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
                    No Services Available
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-sm">
                    There are currently no services added. Once services are created, they will
                    appear here.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ServiceModal
        mode="view"
        serviceId={selectedServiceId ?? undefined}
        isOpen={isServiceViewOpen}
        onOpenChange={open => {
          setIsServiceViewOpen(open);
          if (!open) setSelectedServiceId(null);
        }}
        trigger={null}
      />

      <ServiceModal
        mode="edit"
        serviceId={selectedServiceId ?? undefined}
        isOpen={isServiceEditOpen}
        onOpenChange={open => {
          setIsServiceEditOpen(open);
          if (!open) setSelectedServiceId(null);
        }}
        trigger={null}
      />

      <DeleteModal
        open={deleteConfirmId !== null}
        onOpenChange={open => !open && handleDeleteCancel()}
        onConfirm={handleDeleteConfirm}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        isLoading={deleteServiceMutation.isPending}
        className="bg-background"
      />
    </>
  );
}
