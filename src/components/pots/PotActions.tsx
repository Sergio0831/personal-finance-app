import { IconEllipsis } from '@/assets/icons';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';

const PotActions = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="size-5 text-gray-300" size="icon" variant="ghost">
        <IconEllipsis />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem className="focus:bg-foreground/10">
        <Button className="font-normal text-sm" size="sm" variant="ghost">
          Edit Pot
        </Button>
      </DropdownMenuItem>
      <Separator />
      <DropdownMenuItem variant="destructive">
        <Button
          className="font-normal text-sm hover:text-destructive/70"
          size="sm"
          variant="ghost"
        >
          Delete Pot
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default PotActions;
