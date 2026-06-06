'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { Eye, PenLine, Trash2, MoreHorizontal } from 'lucide-react';

export default function ClassTableActionButton({
  onDelete,
  deleteClassMutation,
  onView,
  onEdit,
}: {
  onDelete: () => void;
  deleteClassMutation: {
    isPending: boolean;
  };
  onView?: () => void;
  onEdit?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTimeout(() => onView?.(), 0)}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTimeout(() => onEdit?.(), 0)}>
          <PenLine className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => setTimeout(() => onDelete(), 0)}
          disabled={deleteClassMutation.isPending}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
