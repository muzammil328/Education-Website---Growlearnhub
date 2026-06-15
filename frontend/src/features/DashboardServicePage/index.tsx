'use client';
import React, { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Para, SelectContent, SelectItem, Select, SelectTrigger, SelectValue } from '@muzammil328/ui';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';

import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { ServiceTable } from '@/features/DashboardServicePage/ServiceTable';
import { ServiceModal } from '@/features/DashboardServicePage/ServiceModal';
import { useServices } from '@/hooks/use-service';

import type {
  DashboardServiceTableProps,
  Status,
  SortOrder,
} from '@muzammil328/education-packages/types';
import { StatusEnum } from '@muzammil328/education-packages/enums';
import { SlidersHorizontal } from 'lucide-react';

type DashboardServicePageProps = {
  status?: Status;
  sort?: string;
  order?: SortOrder;
};

export default function DashboardServicePage({
  status: queryStatus,
  sort: querySort,
  order: queryOrder = 'asc',
}: DashboardServicePageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');

  const [sortField, setSortField] = useState<'name' | 'status' | 'createdAt' | 'updatedAt'>(
    (querySort as 'name' | 'status' | 'createdAt' | 'updatedAt') || 'createdAt'
  );
  const [sortOrder] = useState<SortOrder>(queryOrder);

  const [isServiceViewOpen, setIsServiceViewOpen] = useState(false);
  const [isServiceEditOpen, setIsServiceEditOpen] = useState(false);
  const [isServiceAddOpen, setIsServiceAddOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const [status, setStatus] = useState<Status>(() => {
    const urlStatus = searchParams.get('status');
    return (urlStatus as Status) || queryStatus || 'active';
  });

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
    setSortField(value as 'name' | 'status' | 'createdAt' | 'updatedAt');
    setPage(1);
    updateURL(status, value, sortOrder);
  };

  const {
    data: responseData,
    isLoading,
    error,
  } = useServices({ status, page, limit, sort: sortField, sortDirection: sortOrder, search });

  const serviceData = (responseData?.data ?? []) as DashboardServiceTableProps[];

  const paginationData = {
    totalRecords: responseData?.pagination?.totalRecords ?? 0,
    totalPages: responseData?.pagination?.totalPages ?? 1,
    currentPage: responseData?.pagination?.page ?? 1,
    limit: responseData?.pagination?.pageSize ?? 10,
  };

  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Para className="text-red-500 mb-2">Failed to load services</Para>
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
        title="Service Management"
        description="Define and configure academic service types and offerings"
        action={<ServiceModal mode="add" isOpen={isServiceAddOpen} onOpenChange={setIsServiceAddOpen} />}
      />
      <div className="border rounded-md pb-3">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search services..."
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
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <ServiceTable
          data={serviceData}
          isLoading={isLoading}
          isServiceViewOpen={isServiceViewOpen}
          setIsServiceViewOpen={setIsServiceViewOpen}
          isServiceEditOpen={isServiceEditOpen}
          setIsServiceEditOpen={setIsServiceEditOpen}
          selectedServiceId={selectedServiceId}
          setSelectedServiceId={setSelectedServiceId}
        />
        <DataTablePagination
          canPreviousPage={paginationData.currentPage > 1}
          canNextPage={paginationData.currentPage < paginationData.totalPages}
          previousPage={() => setPage(p => Math.max(1, p - 1))}
          nextPage={() => setPage(p => Math.min(paginationData.totalPages, p + 1))}
          selectedRows={serviceData.length}
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
