'use client';

import React, { useState } from 'react';
import { TableRoot as Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Skeleton } from '@muzammil328/ui';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { useComments, useDeleteComment } from '@/hooks/use-comment';
import { Trash2 } from 'lucide-react';
import { toast } from '@muzammil328/ui';

export default function Page() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useComments({ page, limit });
  const { mutate: deleteComment } = useDeleteComment();

  const rows = data?.data ?? [];
  const pagination = data?.pagination;

  const handleDelete = (id: string) => {
    deleteComment({ id }, {
      onSuccess: () => toast.success('Comment deleted'),
      onError: (err) => toast.error(err.message || 'Failed to delete'),
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-foreground">Comments</h1>
      <div className="border rounded-md pb-3">
        <Table className="mt-0">
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Page</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">No comments yet.</TableCell>
              </TableRow>
            ) : (
              rows.map(row => (
                <TableRow key={row.commentId}>
                  <TableCell className="font-medium">{row.firstName} {row.lastName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.email}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-muted-foreground line-clamp-2">{row.message}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[120px] truncate">
                    {row.pageUrl ? (
                      <a href={row.pageUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary truncate block">
                        {row.pageUrl}
                      </a>
                    ) : '—'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(row.createdAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => handleDelete(row.commentId)}
                      className="rounded p-1 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
