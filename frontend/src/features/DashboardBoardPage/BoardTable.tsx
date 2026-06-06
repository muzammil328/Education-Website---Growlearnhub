'use client';

import React, { useState } from 'react';
import { TableRoot as Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@muzammil328/ui';
import { DeleteModal } from '@muzammil328/ui';
import { Skeleton } from '@muzammil328/ui';
import { toast } from '@muzammil328/ui';
import { useDeleteBoard } from '@/hooks';
import { type RouterOutputs, type TrpcError } from '@/trpc/trpc';
import BoardTableActionButton from './BoardTableActionButton';
import { BoardModal } from './BoardModal';

interface BoardTableProps {
  data: {
    boardId: string;
    name: string;
    className: string;
    status: string;
  }[];
  isLoading?: boolean;
}

export function BoardTable({ data = [], isLoading }: BoardTableProps) {
  const deleteBoardMutation = useDeleteBoard();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [isBoardViewOpen, setIsBoardViewOpen] = useState(false);
  const [isBoardEditOpen, setIsBoardEditOpen] = useState(false);

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;

    deleteBoardMutation.mutate(
      { id: deleteConfirmId },
      {
        onSuccess: (response: RouterOutputs['board']['delete']) => {
          toast.success(response.message || 'Board deleted successfully');
        },
        onError: (error: TrpcError) => {
          toast.error(error.message || 'Failed to delete board');
        },
      }
    );
    setDeleteConfirmId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  return (
    <>
      <Table className="mt-0">
        <TableHeader className="bg-gray-100 dark:bg-gray-800">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 7 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-10 ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map(boardItem => (
              <TableRow key={boardItem.boardId}>
                <TableCell>{boardItem.name}</TableCell>
                <TableCell>{boardItem.className}</TableCell>
                <TableCell>{boardItem.status}</TableCell>
                <TableCell className="text-right">
                  <BoardTableActionButton
                    boardId={boardItem.boardId}
                    setDeleteConfirmId={setDeleteConfirmId}
                    deleteBoardMutation={deleteBoardMutation}
                    onView={() => { setSelectedBoardId(boardItem.boardId); setIsBoardViewOpen(true); }}
                    onEdit={() => { setSelectedBoardId(boardItem.boardId); setIsBoardEditOpen(true); }}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center" colSpan={4}>
                No boards available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <BoardModal
        mode="view"
        boardId={selectedBoardId ?? undefined}
        isOpen={isBoardViewOpen}
        onOpenChange={open => { setIsBoardViewOpen(open); if (!open) setSelectedBoardId(null); }}
        trigger={null}
      />

      <BoardModal
        mode="edit"
        boardId={selectedBoardId ?? undefined}
        isOpen={isBoardEditOpen}
        onOpenChange={open => { setIsBoardEditOpen(open); if (!open) setSelectedBoardId(null); }}
        trigger={null}
      />

      <DeleteModal
        open={deleteConfirmId !== null}
        onOpenChange={open => !open && handleDeleteCancel()}
        onConfirm={handleDeleteConfirm}
        title="Delete Board"
        description="Are you sure you want to delete this board? This action cannot be undone."
        isLoading={deleteBoardMutation.isPending}
        className="bg-background"
      />
    </>
  );
}
