'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { Plus, SlidersHorizontal } from 'lucide-react';

import { SubHeadingTable } from '@/features/DashboardSubHeadingPage/SubHeadingTable';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';

import { useSubheadings } from '@/hooks';

import { SortOrder, Status } from '@muzammil328/education-packages/types';
import { StatusEnum } from '@muzammil328/education-packages/enums';

type DashboardSubHeadingPageProps = {
  status?: Status;
  sort?: string;
  order?: SortOrder;
};

export default function DashboardSubHeadingPage({
  status: queryStatus = 'active',
  sort: querySort,
  order: queryOrder = 'asc',
}: DashboardSubHeadingPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(() => {
    const urlPage = searchParams.get('page');
    return urlPage ? parseInt(urlPage, 10) : 1;
  });
  const [limit] = useState(10);
  const [search, setSearch] = useState('');

  const [sortField, setSortField] = useState<
    'name' | 'status' | 'createdAt' | 'updatedAt' | 'order'
  >((querySort as 'name' | 'status' | 'createdAt' | 'updatedAt' | 'order') || 'createdAt');
  const [sortOrder] = useState<SortOrder>(queryOrder);
  const [status, setStatus] = useState<Status>(() => {
    const urlStatus = searchParams.get('status') as Status | null;
    return urlStatus || queryStatus;
  });

  const [isSubHeadingViewOpen, setIsSubHeadingViewOpen] = useState(false);
  const [isSubHeadingEditOpen, setIsSubHeadingEditOpen] = useState(false);
  const [isAddSubHeadingOpen, setIsAddSubHeadingOpen] = useState(false);
  const [selectedSubHeadingId, setSelectedSubHeadingId] = useState<string | null>(null);

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
      const urlStatus = searchParams.get('status') as Status | null;
      if (urlStatus) setStatus(urlStatus);
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
    setSortField(value as 'name' | 'status' | 'createdAt' | 'updatedAt' | 'order');
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
  } = useSubheadings({
    status,
    page,
    limit,
    sort: sortField,
    sortDirection: sortOrder,
    search,
  });

  const subHeadingData = Array.isArray(responseData?.data) ? responseData.data : [];

  const paginationData = {
    totalRecords: responseData?.pagination?.totalRecords ?? 0,
    totalPages: responseData?.pagination?.totalPages ?? 1,
    currentPage: responseData?.pagination?.page ?? 1,
    limit: responseData?.pagination?.pageSize ?? 10,
  };

  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-red-500 mb-2">Failed to load subheadings</p>
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
        title="Sub Heading Management"
        description="Break down headings into focused sub-topics for deeper learning"
        action={
          <Button onClick={() => setIsAddSubHeadingOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add SubHeading
          </Button>
        }
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search subheadings..."
      >
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
              <SelectItem value="chapterName">Chapter Name</SelectItem>
              <SelectItem value="headingName">Heading Name</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="createdAt">Created Date</SelectItem>
              <SelectItem value="updatedAt">Updated Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DashboardPageHeader>
      <div className="border rounded-md">

        <SubHeadingTable
          data={subHeadingData}
          isLoading={isLoading}
          isSubHeadingViewOpen={isSubHeadingViewOpen}
          setIsSubHeadingViewOpen={setIsSubHeadingViewOpen}
          isSubHeadingEditOpen={isSubHeadingEditOpen}
          setIsSubHeadingEditOpen={setIsSubHeadingEditOpen}
          selectedSubHeadingId={selectedSubHeadingId}
          setSelectedSubHeadingId={setSelectedSubHeadingId}
          isAddSubHeadingOpen={isAddSubHeadingOpen}
          setIsAddSubHeadingOpen={setIsAddSubHeadingOpen}
        />

        <div className="border-t p-4">
          <DataTablePagination
            canPreviousPage={paginationData.currentPage > 1}
            canNextPage={paginationData.currentPage < paginationData.totalPages}
            previousPage={() => setPage(p => Math.max(1, p - 1))}
            nextPage={() => setPage(p => Math.min(paginationData.totalPages, p + 1))}
            selectedRows={subHeadingData.length}
            totalRows={paginationData.totalRecords}
            pageCount={paginationData.totalPages}
            pageIndex={paginationData.currentPage - 1}
            pageSize={paginationData.limit}
            setPage={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
