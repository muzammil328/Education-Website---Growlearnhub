'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@muzammil328/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@muzammil328/ui';
import { DataTablePagination } from '@/components/ui/data-table-pagination';

import { useMcqs } from '@/hooks/use-mcqs';
import type { Status } from '@muzammil328/education-packages/types';
import { EntityStatus } from '@muzammil328/education-packages/enums';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { McqModal } from './McqModal';
import { McqTable } from './McqTable';
import type { SortOrder } from '@muzammil328/education-packages/types';

type DashboardMcqsPageProps = {
  status?: Status;
  sort?: string;
  order?: SortOrder;
};

export default function DashboardMcqsPage({
  status: queryStatus = 'active',
  sort: querySort,
  order: queryOrder = 'asc',
}: DashboardMcqsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [sortField, setSortField] = useState<
    'question' | 'status' | 'createdAt' | 'updatedAt' | 'difficulty'
  >((querySort as 'question' | 'status' | 'createdAt' | 'updatedAt' | 'difficulty') || 'question');
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
    const urlSort = searchParams.get('sort');
    const urlOrder = searchParams.get('order') as SortOrder | null;

    if (urlStatus && urlStatus !== status) setStatus(urlStatus);
    if (urlSort && urlSort !== sortField)
      setSortField(urlSort as 'question' | 'status' | 'createdAt' | 'updatedAt' | 'difficulty');
    if (urlOrder && urlOrder !== sortOrder) setSortOrder(urlOrder);
  }, [searchParams, sortField, sortOrder, status]);

  const handleStatusChange = (value: string) => {
    const newStatus = value as Status;
    setStatus(newStatus);
    setPage(1);
    updateURL(newStatus, sortField, sortOrder);
  };

  const handleSortFieldChange = (value: string) => {
    setSortField(value as 'question' | 'status' | 'createdAt' | 'updatedAt' | 'difficulty');
    setPage(1);
    updateURL(status, value, sortOrder);
  };

  const {
    data: responseData,
    isLoading,
    error,
  } = useMcqs({
    status,
    page,
    limit,
    sort: sortField,
    sortDirection: sortOrder,
  });

  const mcqData = responseData?.data ?? [];

  const paginationData = responseData?.pagination ?? {
    totalRecords: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  };

  if (error) {
    return <p className="text-red-500">Failed to load MCQs</p>;
  }

  return (
    <div className="border rounded-md pb-3">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search MCQs..."
          className="py-2 px-3 focus:outline-none h-12"
        />

        <div className="flex items-center gap-4">
          <div className="space-y-2 w-32">
            <Select onValueChange={handleStatusChange} value={status}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value={EntityStatus.ACTIVE}>Active</SelectItem>
                <SelectItem value={EntityStatus.INACTIVE}>Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Select onValueChange={handleSortFieldChange} value={sortField || 'question'}>
              <SelectTrigger className="w-full">
                <SlidersHorizontal className="h-4 w-4" />
                <SelectValue placeholder="Select Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="question">Question</SelectItem>
                <SelectItem value="createdAt">Created At</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <McqModal
            mode="add"
            trigger={
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add MCQ
              </Button>
            }
          />
        </div>
      </div>

      <McqTable data={mcqData} isLoading={isLoading} />
      <div className="border-t pt-3 px-2">
        <DataTablePagination
          canPreviousPage={paginationData.currentPage > 1}
          canNextPage={paginationData.currentPage < paginationData.totalPages}
          previousPage={() => setPage(p => Math.max(1, p - 1))}
          nextPage={() => setPage(p => Math.min(paginationData.totalPages, p + 1))}
          selectedRows={mcqData.length}
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
