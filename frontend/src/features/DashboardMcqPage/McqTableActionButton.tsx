import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@muzammil328/ui';
import { Button } from '@muzammil328/ui';
import { Eye, PenLine, Trash2, MoreHorizontal } from 'lucide-react';
import { McqModal } from './McqModal';

export default function TableActionButton({
  mcqId,
  setDeleteConfirmId,
  deleteMcqsMutation,
}: {
  mcqId: string;
  setDeleteConfirmId: (id: string | null) => void;
  deleteMcqsMutation: {
    isPending: boolean;
  };
}) {
  const handleDeleteClick = (mcqId: string) => {
    setDeleteConfirmId(mcqId);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <McqModal
          mode="view"
          mcqId={mcqId}
          trigger={
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          }
        />
        <McqsModal
          mode="edit"
          mcqId={mcqId}
          trigger={
            <DropdownMenuItem className="cursor-pointer">
              <PenLine className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          }
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => handleDeleteClick(mcqId)}
          disabled={deleteMcqsMutation.isPending}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
