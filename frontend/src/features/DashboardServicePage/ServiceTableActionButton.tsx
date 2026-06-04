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

interface ServiceTableActionButtonProps {
  serviceId: string;
  setDeleteConfirmId: (id: string | null) => void;
  deleteServiceMutation: {
    isPending: boolean;
  };
  onView: () => void;
  onEdit: () => void;
}

export default function ServiceTableActionButton({
  serviceId,
  setDeleteConfirmId,
  deleteServiceMutation,
  onView,
  onEdit,
}: ServiceTableActionButtonProps) {
  const handleDeleteClick = (serviceId: string) => {
    setDeleteConfirmId(serviceId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem className="cursor-pointer" onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
          <PenLine className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => handleDeleteClick(serviceId)}
          disabled={deleteServiceMutation.isPending}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
