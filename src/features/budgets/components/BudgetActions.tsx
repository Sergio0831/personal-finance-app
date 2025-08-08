'use client';

import { useState } from 'react';
import { OptionsMenu } from '@/components/custom';
import ResponsiveModal from '@/components/custom/ResponsiveModal';
import { Button } from '@/components/ui/button';

const BudgetActions = () => {
  const [isBudgetEditOpen, setIsEditBudgetOpen] = useState(false);
  const [isDeleteBudgetOpen, setIsDeleteBudgetOpen] = useState(false);

  return (
    <>
      <ResponsiveModal
        description="If your saving targets change, feel free to update your pots."
        isOpen={isBudgetEditOpen}
        setIsOpen={setIsEditBudgetOpen}
        title="Edit Pot"
      >
        <EditPotForm
          id={id}
          name={name}
          setIsOpen={setIsEditBudgetOpen}
          target={target}
          theme={theme}
        />
      </ResponsiveModal>
      <ResponsiveModal
        description="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
        isOpen={isDeleteBudgetOpen}
        setIsOpen={setIsDeleteBudgetOpen}
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
          onClick={() => setIsDeleteBudgetOpen(false)}
          variant="ghost"
        >
          No, Go Back
        </Button>
      </ResponsiveModal>
      <OptionsMenu
        deleteLabel="Delete Budget"
        editLabel="Edit Budget"
        onDelete={() => setIsDeleteBudgetOpen(true)}
        onEdit={() => setIsEditBudgetOpen(true)}
      />
    </>
  );
};

export default BudgetActions;
