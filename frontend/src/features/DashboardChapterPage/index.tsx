'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Para, SelectContent, SelectItem, Select, SelectTrigger, SelectValue } from '@muzammil328/ui';
import { SlidersHorizontal } from 'lucide-react';

import { ChapterTable } from '@/features/DashboardChapterPage/ChapterTable';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';

import { useChapters } from '@/hooks';
import type { Status, SortOrder } from '@muzammil328/education-packages/types';
import { StatusEnum } from '@muzammil328/education-packages/enums';

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

  const paginationData = {
    totalRecords: responseData?.pagination?.totalRecords ?? 0,
    totalPages: responseData?.pagination?.totalPages ?? 1,
    currentPage: responseData?.pagination?.page ?? 1,
    limit: responseData?.pagination?.pageSize ?? 10,
  };

  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Para className="text-red-500 mb-2">Failed to load chapters</Para>
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
    <div>
      <DashboardPageHeader
        title="Chapter Management"
        description="Organize chapters across books and academic subjects"
        action={
          <Button onClick={() => setIsAddChapterOpen(true)} size="lg">
            Add Chapter
          </Button>
        }
      />
      <div className="border rounded-md pb-3">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search chapters..."
            className="py-2 px-3 focus:outline-none h-12"
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
