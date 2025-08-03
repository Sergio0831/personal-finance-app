'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { OptionsMenu } from '@/components/custom';
import ResponsiveModal from '@/components/custom/ResponsiveModal';
import { Button } from '@/components/ui/button';
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
  const [isEditPotOpen, setIsEditPotOpen] = useState(false);
  const [isDeletePotOpen, setIsDeletePotOpen] = useState(false);
  const [deletePotMutation, { loading }] = useDeletePotMutation({
    variables: {
      id,
    },
    onCompleted: () => {
      setIsDeletePotOpen(false);
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
        isOpen={isEditPotOpen}
        setIsOpen={setIsEditPotOpen}
        title="Edit Pot"
      >
        <EditPotForm
          id={id}
          name={name}
          setIsOpen={setIsEditPotOpen}
          target={target}
          theme={theme}
        />
      </ResponsiveModal>
      <ResponsiveModal
        description="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
        isOpen={isDeletePotOpen}
        setIsOpen={setIsDeletePotOpen}
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
          onClick={() => setIsDeletePotOpen(false)}
          variant="ghost"
        >
          No, Go Back
        </Button>
      </ResponsiveModal>
      <OptionsMenu
        deleteLabel="Delete Pot"
        editLabel="Edit Pot"
        onDelete={() => setIsDeletePotOpen(true)}
        onEdit={() => setIsEditPotOpen(true)}
      />
    </>
  );
};

export default PotActions;
