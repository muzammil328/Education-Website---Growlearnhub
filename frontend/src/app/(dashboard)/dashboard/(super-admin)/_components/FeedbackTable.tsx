'use client';

import React, { useState } from 'react';
import { Heading1, Para, Skeleton, TableBody, TableCell, TableHeader, TableHead, TableRoot as Table, TableRow } from '@muzammil328/ui';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { useFeedback } from '@/hooks/use-feedback';
import { useUpdateFeedbackStatus } from '@/hooks/use-feedback';

type FeedbackType = 'contact' | 'bug-report' | 'feature-request' | 'share-story';
type FeedbackStatus = 'pending' | 'resolved' | 'rejected';

interface FeedbackTableProps {
  type: FeedbackType;
  title: string;
}

const STATUS_COLORS: Record<FeedbackStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export default function FeedbackTable({ type, title }: FeedbackTableProps) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useFeedback({ type, page, limit });
  const { mutate: updateStatus } = useUpdateFeedbackStatus();

  const rows = data?.data ?? [];
  const pagination = data?.pagination;

  const handleStatusChange = (id: string, status: FeedbackStatus) => {
    updateStatus({ id, status });
  };

  return (
    <div className="space-y-4">
      <Heading1 className="text-xl font-semibold text-foreground">{title}</Heading1>

      <div className="border rounded-md pb-3">
        <Table className="mt-0">
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No submissions yet.
                </TableCell>
              </TableRow>
            ) : (
              rows.map(row => (
                <TableRow key={row.feedbackId}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{row.email}</TableCell>
                  <TableCell className="max-w-xs">
                    <Para className="text-sm text-muted-foreground line-clamp-2">{row.message}</Para>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[row.status as FeedbackStatus]}`}>
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(row.createdAt).toLocaleDateString('en-PK', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <select
                      value={row.status}
                      onChange={e => handleStatusChange(row.feedbackId, e.target.value as FeedbackStatus)}
                      className="text-xs rounded border border-border bg-background px-2 py-1 text-foreground focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {pagination && (
          <div className="border-t pt-3 px-2">
            <DataTablePagination
              canPreviousPage={page > 1}
              canNextPage={page < pagination.totalPages}
              previousPage={() => setPage(p => Math.max(1, p - 1))}
              nextPage={() => setPage(p => p + 1)}
              selectedRows={rows.length}
              totalRows={pagination.totalRecords}
              pageCount={pagination.totalPages}
              pageIndex={page - 1}
              pageSize={limit}
              setPage={p => setPage(p + 1)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
