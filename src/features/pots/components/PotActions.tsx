'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { IconEllipsis } from '@/assets/icons';
import ResponsiveModal from '@/components/custom/ResponsiveModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { EditPotForm } from '@/features/pots/components';
import { useDeletePotMutation } from '@/graphql/generated/output';

const PotActions = ({
  id,
  name,
  target,
  theme,
}: {
  id: string;
  name: string;
  target: number;
  theme: string;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletePotMutation, { loading }] = useDeletePotMutation({
    variables: {
      id,
    },
    onCompleted: () => {
      setIsDeleteOpen(false);
      toast.success(`Pot '${name}' deleted successfully!`);
    },
    refetchQueries: ['GetAllPots'],
    onError: (error) => {
      toast.error(`Error deleting pot: ${error.message}`);
    },
  });
  return (
    <>
      <ResponsiveModal
        description="If your saving targets change, feel free to update your pots."
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Pot"
      >
        <EditPotForm
          id={id}
          name={name}
          setIsOpen={setIsEditOpen}
          target={target}
          theme={theme}
        />
      </ResponsiveModal>
      <ResponsiveModal
        description="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title={`Delete \u2018${name}\u2019?`}
      >
        <Button
          disabled={loading}
          onClick={() => deletePotMutation()}
          variant="destructive"
        >
          Yes, Confirm Deletion
        </Button>
        <Button
          className="h-min w-full p-0 font-normal text-muted hover:text-foreground"
          onClick={() => setIsDeleteOpen(false)}
          variant="ghost"
        >
          No, Go Back
        </Button>
      </ResponsiveModal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-5 text-gray-300" size="icon" variant="ghost">
            <IconEllipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="focus:bg-foreground/10"
            onClick={() => setIsEditOpen(true)}
          >
            Edit Pot
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem
            onClick={() => setIsDeleteOpen(true)}
            variant="destructive"
          >
            Delete Pot
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PotActions;
