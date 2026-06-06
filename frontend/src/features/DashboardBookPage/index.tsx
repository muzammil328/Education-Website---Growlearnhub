'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { Plus } from 'lucide-react';

import { DataTablePagination } from '@/components/ui/data-table-pagination';

import { useBooks } from '@/hooks';

import { SlidersHorizontal } from 'lucide-react';
import { DynamicBreadcrumb } from '@/components/ui/dynamic-breadcrumb';
import { BookTable } from './BookTable';
import { StatusEnum } from '@muzammil328/education-packages';

export default function BookPage({
  status: queryStatus,
  sort: querySort,
  order: queryOrder = 'asc',
}: {
  status?: StatusEnum;
  sort?: string;
  order?: SortOrder;
}) {
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

  const [isBookViewOpen, setIsBookViewOpen] = useState(false);
  const [isBookEditOpen, setIsBookEditOpen] = useState(false);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  // Sync page and status from URL ONLY on browser back/forward navigation
  const prevUrlRef = React.useRef<string | null>(null);

  useEffect(() => {
    // Initialize on first render
    if (prevUrlRef.current === null) {
      prevUrlRef.current = searchParams.toString();
      return;
    }

    const currentUrl = searchParams.toString();

    // Only sync when URL actually changes (browser navigation)
    if (currentUrl !== prevUrlRef.current) {
      prevUrlRef.current = currentUrl;

      // Sync page from URL
      const urlPage = searchParams.get('page');
      const newPage = urlPage ? parseInt(urlPage, 10) : 1;
      setPage(newPage);

      // Sync status from URL
      const urlStatus = searchParams.get('status');
      if (urlStatus) {
        setStatus(urlStatus as Status);
      }
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
  } = useBooks({
    status,
    page,
    limit,
    sort: sortField || 'name',
    sortDirection: sortOrder,
    search,
  });

  const bookData = responseData?.data ?? [];

  const paginationData = responseData?.pagination ?? {
    totalRecords: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  };

  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-red-500 mb-2">Failed to load books</p>
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
          <h1 className="text-3xl font-bold pb-2">Book Management</h1>
          <DynamicBreadcrumb />
        </div>
        <Button onClick={() => setIsAddBookOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </div>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search books..."
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
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="createdAt">Created Date</SelectItem>
                  <SelectItem value="updatedAt">Updated Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <BookTable
        data={bookData}
        isLoading={isLoading}
        isBookViewOpen={isBookViewOpen}
        setIsBookViewOpen={setIsBookViewOpen}
        isBookEditOpen={isBookEditOpen}
        setIsBookEditOpen={setIsBookEditOpen}
        selectedBookId={selectedBookId}
        setSelectedBookId={setSelectedBookId}
        isAddBookOpen={isAddBookOpen}
        setIsAddBookOpen={setIsAddBookOpen}
      />

      <div className="border-t p-4">
        <DataTablePagination
          canPreviousPage={paginationData.currentPage > 1}
          canNextPage={paginationData.currentPage < paginationData.totalPages}
          previousPage={() => setPage(p => Math.max(1, p - 1))}
          nextPage={() => setPage(p => Math.min(paginationData.totalPages, p + 1))}
          selectedRows={bookData.length}
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
