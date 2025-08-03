// components/OptionsMenu.tsx
'use client';

import { IconEllipsis } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

interface OptionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  editLabel?: string;
  deleteLabel?: string;
}

const OptionsMenu = ({
  onEdit,
  onDelete,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
}: OptionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-5 text-gray-300" size="icon" variant="ghost">
          <IconEllipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="focus:bg-foreground/10" onClick={onEdit}>
          {editLabel}
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          className="text-red-500 text-sm focus:bg-red-50"
          onClick={onDelete}
        >
          {deleteLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsMenu;
