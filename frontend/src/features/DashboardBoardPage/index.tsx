'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@muzammil328/ui';

import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { BoardTable } from '@/features/DashboardBoardPage/BoardTable';

import { useBoards } from '@/hooks';

import type { Status, SortOrder } from '@muzammil328/education-packages/types';
import { StatusEnum } from '@muzammil328/education-packages/enums';
import { SlidersHorizontal } from 'lucide-react';

import { DashboardPageHeader } from '@/components/DashboardPageHeader';
import { BoardModal } from '@/features/DashboardBoardPage/BoardModal';

export default function DashboardBoardPage({
  status: queryStatus = 'active',
  sort: querySort,
  order: queryOrder = 'asc',
}: {
  status?: Status;
  sort?: string;
  order?: SortOrder;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);

  const [sortField, setSortField] = useState<'name' | 'status' | 'createdAt' | 'updatedAt'>(
    (querySort as 'name' | 'status' | 'createdAt' | 'updatedAt') || 'name'
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(queryOrder);
  const [status, setStatus] = useState<Status>(queryStatus);

  const updateURL = useCallback(
    (newStatus: Status, newSort: string | undefined, newOrder: SortOrder) => {
      const params = new URLSearchParams();
      if (newStatus && newStatus !== 'active') params.set('status', newStatus);
      if (newSort) params.set('sort', newSort);
      if (newOrder && newOrder !== 'asc') params.set('order', newOrder);
      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : '', { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    const urlStatus = searchParams.get('status') as Status | null;
    const urlSort = searchParams.get('sort') as
      | 'name'
      | 'status'
      | 'createdAt'
      | 'updatedAt'
      | null;
    const urlOrder = searchParams.get('order') as SortOrder | null;

    if (urlStatus && urlStatus !== status) setStatus(urlStatus);
    if (urlSort && urlSort !== sortField) setSortField(urlSort);
    if (urlOrder && urlOrder !== sortOrder) setSortOrder(urlOrder);
  }, [searchParams, sortField, sortOrder, status]);

  const handleStatusChange = (value: string) => {
    const newStatus = value as Status;
    setStatus(newStatus);
    setPage(1);
    updateURL(newStatus, sortField, sortOrder);
  };

  const handleSortFieldChange = (value: string) => {
    setSortField(value as 'name' | 'status' | 'createdAt' | 'updatedAt');
    setPage(1);
    updateURL(status, value, sortOrder);
  };

  const {
    data: responseData,
    isLoading,
    error,
  } = useBoards({
    status,
    page,
    limit,
    sort: sortField,
    sortDirection: sortOrder,
  });

  const boardData = responseData?.data ?? [];

  const paginationData = {
    totalRecords: responseData?.pagination?.totalRecords ?? 0,
    totalPages: responseData?.pagination?.totalPages ?? 1,
    currentPage: responseData?.pagination?.page ?? 1,
    limit: responseData?.pagination?.pageSize ?? 10,
  };

  if (error) {
    return <p className="text-red-500">Failed to load boards</p>;
  }

  return (
    <div>
      <DashboardPageHeader
        title="Board Management"
        description="Define and configure academic board types and offerings"
        action={
          <BoardModal mode="add" isOpen={isAddBoardOpen} onOpenChange={setIsAddBoardOpen} />
        }
      />
      <div className="border rounded-md pb-3">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search boards..."
          className="py-2 px-3 focus:outline-none h-12"
        />

        <div className="flex items-center gap-4">
          <div className="space-y-2 w-32">
            <Select onValueChange={handleStatusChange} value={status}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
                <SelectContent>
                  <SelectItem value={StatusEnum.Active}>Active</SelectItem>
                  <SelectItem value={StatusEnum.Inactive}>Inactive</SelectItem>
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

      <BoardTable data={boardData} isLoading={isLoading} />
      <DataTablePagination
        canPreviousPage={paginationData.currentPage > 1}
        canNextPage={paginationData.currentPage < paginationData.totalPages}
        previousPage={() => setPage(p => Math.max(1, p - 1))}
        nextPage={() => setPage(p => Math.min(paginationData.totalPages, p + 1))}
        selectedRows={boardData.length}
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
