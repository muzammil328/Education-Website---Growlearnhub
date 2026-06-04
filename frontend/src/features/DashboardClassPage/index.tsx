'use client';
import React, { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@muzammil328/ui/forms';

import { ClassTable } from '@/features/DashboardClassPage/ClassTable';
import { DataTablePagination } from '@/components/ui/data-table-pagination';

import { useClasses } from '@/hooks';

import { DashboardClassPageProps } from '@/types/class.types';
import { SlidersHorizontal } from 'lucide-react';
import { ClassModal } from './ClassModal';
import { DynamicBreadcrumb } from '@/components/ui/dynamic-breadcrumb';
import { Status, SortOrder } from '@muzammil328/education-packages/types';
import { EntityStatus } from '@muzammil328/education-packages/enums';

export default function DashboardClassPage({
  status: queryStatus,
  sort: querySort,
  order: queryOrder = 'asc',
}: DashboardClassPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');

  const [sortField, setSortField] = useState(querySort);
  const [sortOrder] = useState<SortOrder>(queryOrder);

  const [status, setStatus] = useState<Status>(() => {
    const urlStatus = searchParams.get('status');
    return (urlStatus as Status) || queryStatus || 'active';
  });

  const [isClassViewOpen, setIsClassViewOpen] = useState(false);
  const [isClassEditOpen, setIsClassEditOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const updateURL = useCallback(
    (newStatus: Status, newSort: string | undefined, newOrder: SortOrder) => {
      const params = new URLSearchParams();
      params.set('status', newStatus);
      if (newSort) params.set('sort', newSort);
      if (newOrder && newOrder !== 'asc') params.set('order', newOrder);
      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : '', { scroll: false });
    },
    [router]
  );

  const handleStatusChange = (value: string) => {
    const newStatus = value as Status;
    setStatus(newStatus);
    setPage(1);
    updateURL(newStatus, sortField, sortOrder);
  };

  const handleSortFieldChange = (value: string) => {
    setSortField(value);
    setPage(1);
    updateURL(status, value, sortOrder);
  };

  const {
    data: responseData,
    isLoading,
    error,
  } = useClasses({
    status,
    page,
    limit,
    sort: sortField,
    sortDirection: sortOrder,
    search,
  });

  const classData = responseData?.data ?? [];

  const paginationData = responseData?.pagination ?? {
    totalRecords: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  };

  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-red-500 mb-2">Failed to load classes</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Click to retry
        </button>
      </div>
    );
  }

  return (
    <div className="border rounded-md pb-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold pb-2">Class Management</h1>
          <DynamicBreadcrumb />
        </div>
        <ClassModal mode="add" isOpen={isAddClassOpen} onOpenChange={setIsAddClassOpen} />
      </div>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search classes..."
          className="py-2 px-3 focus:outline-none h-12 border rounded-md"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <div className="space-y-2 w-32">
            <Select onValueChange={handleStatusChange} value={status}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
                <SelectContent>
                  <SelectItem value={EntityStatus.ACTIVE}>Active</SelectItem>
                  <SelectItem value={EntityStatus.INACTIVE}>Inactive</SelectItem>
                </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Select onValueChange={handleSortFieldChange} value={sortField || 'name'}>
              <SelectTrigger className="w-full">
                <SlidersHorizontal className="h-4 w-4" />
                <SelectValue placeholder="Select Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <ClassTable
        data={classData}
        isLoading={isLoading}
        isClassViewOpen={isClassViewOpen}
        setIsClassViewOpen={setIsClassViewOpen}
        isClassEditOpen={isClassEditOpen}
        setIsClassEditOpen={setIsClassEditOpen}
        selectedClassId={selectedClassId}
        setSelectedClassId={setSelectedClassId}
      />
      <div className="border-t pt-3 px-2">
        <DataTablePagination
          canPreviousPage={paginationData.currentPage > 1}
          canNextPage={paginationData.currentPage < paginationData.totalPages}
          previousPage={() => setPage(p => Math.max(1, p - 1))}
          nextPage={() => setPage(p => Math.min(paginationData.totalPages, p + 1))}
          selectedRows={classData.length}
          totalRows={paginationData.totalRecords}
          pageCount={paginationData.totalPages}
          pageIndex={paginationData.currentPage - 1}
          pageSize={paginationData.limit}
          setPage={page => setPage(page + 1)}
        />
      </div>
    </div>
  );
}
