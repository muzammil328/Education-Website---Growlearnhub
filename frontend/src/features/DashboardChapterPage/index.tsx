'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { Plus, SlidersHorizontal } from 'lucide-react';

import { ChapterTable } from '@/features/DashboardChapterPage/ChapterTable';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { DynamicBreadcrumb } from '@/components/ui/dynamic-breadcrumb';

import { useChapters } from '@/hooks';
import type { Status, SortOrder } from '@muzammil328/education-packages/types';
import { EntityStatus } from '@muzammil328/education-packages/enums';

interface DashboardChapterPageProps {
  status?: Status;
  sort?: string;
  order?: SortOrder;
}

export default function ChapterPage({
  status: queryStatus,
  sort: querySort,
  order: queryOrder = 'asc',
}: DashboardChapterPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(() => {
    const urlPage = searchParams.get('page');
    return urlPage ? parseInt(urlPage, 10) : 1;
  });
  const [limit] = useState(10);
  const [search, setSearch] = useState('');

  const [sortField, setSortField] = useState(querySort || 'createdAt');
  const [sortOrder] = useState<SortOrder>(queryOrder || 'desc');

  const [status, setStatus] = useState<Status>(() => {
    const urlStatus = searchParams.get('status');
    return (urlStatus as Status) || queryStatus || 'active';
  });

  const [isChapterViewOpen, setIsChapterViewOpen] = useState(false);
  const [isChapterEditOpen, setIsChapterEditOpen] = useState(false);
  const [isAddChapterOpen, setIsAddChapterOpen] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  const prevUrlRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (prevUrlRef.current === null) {
      prevUrlRef.current = searchParams.toString();
      return;
    }
    const currentUrl = searchParams.toString();
    if (currentUrl !== prevUrlRef.current) {
      prevUrlRef.current = currentUrl;
      const urlPage = searchParams.get('page');
      setPage(urlPage ? parseInt(urlPage, 10) : 1);
      const urlStatus = searchParams.get('status');
      if (urlStatus) setStatus(urlStatus as Status);
    }
  }, [searchParams]);

  const updateURL = useCallback(
    (newStatus: Status, newSort: string | undefined, newOrder: SortOrder, newPage?: number) => {
      const params = new URLSearchParams();
      params.set('status', newStatus);
      if (newSort) params.set('sort', newSort);
      if (newOrder && newOrder !== 'asc') params.set('order', newOrder);
      if (newPage) params.set('page', String(newPage));
      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : '', { scroll: false });
    },
    [router]
  );

  const handleStatusChange = (value: string) => {
    const newStatus = value as Status;
    setStatus(newStatus);
    setPage(1);
    updateURL(newStatus, sortField, sortOrder, 1);
  };

  const handleSortFieldChange = (value: string) => {
    setSortField(value);
    setPage(1);
    updateURL(status, value, sortOrder, 1);
  };

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      updateURL(status, sortField, sortOrder, newPage);
    },
    [status, sortField, sortOrder, updateURL]
  );

  const {
    data: responseData,
    isLoading,
    error,
  } = useChapters({
    status,
    page,
    limit,
    sort: sortField || 'name',
    sortDirection: sortOrder,
    search,
  });

  const chapterData = responseData?.data ?? [];

  const paginationData = responseData?.pagination ?? {
    totalRecords: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  };

  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-red-500 mb-2">Failed to load chapters</p>
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
    <div className="border rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold pb-2">Chapter Management</h1>
          <DynamicBreadcrumb />
        </div>
        <Button onClick={() => setIsAddChapterOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Chapter
        </Button>
      </div>

      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search chapters..."
              className="py-2 px-3 focus:outline-none h-10 w-64 border rounded-md"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
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
                  <SelectItem value="className">Class Name</SelectItem>
                  <SelectItem value="bookName">Book Name</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="createdAt">Created Date</SelectItem>
                  <SelectItem value="updatedAt">Updated Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <ChapterTable
        data={chapterData}
        isLoading={isLoading}
        isChapterViewOpen={isChapterViewOpen}
        setIsChapterViewOpen={setIsChapterViewOpen}
        isChapterEditOpen={isChapterEditOpen}
        setIsChapterEditOpen={setIsChapterEditOpen}
        selectedChapterId={selectedChapterId}
        setSelectedChapterId={setSelectedChapterId}
        isAddChapterOpen={isAddChapterOpen}
        setIsAddChapterOpen={setIsAddChapterOpen}
      />

      <div className="border-t p-4">
        <DataTablePagination
          canPreviousPage={paginationData.currentPage > 1}
          canNextPage={paginationData.currentPage < paginationData.totalPages}
          previousPage={() => setPage(p => Math.max(1, p - 1))}
          nextPage={() => setPage(p => Math.min(paginationData.totalPages, p + 1))}
          selectedRows={chapterData.length}
          totalRows={paginationData.totalRecords}
          pageCount={paginationData.totalPages}
          pageIndex={paginationData.currentPage - 1}
          pageSize={paginationData.limit}
          setPage={handlePageChange}
        />
      </div>
    </div>
  );
}
