'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { OptionsMenu } from '@/components/custom';
import ResponsiveModal from '@/components/custom/ResponsiveModal';
import { Button } from '@/components/ui/button';
import {
  type Category,
  useDeleteBudgetMutation,
} from '@/graphql/generated/output';
import EditBudgetForm from './EditBudgetForm';

const BudgetActions = ({
  id,
  category,
  maximum,
  theme,
}: {
  id: string;
  category: Category;
  maximum: number;
  theme: string;
}) => {
  const [isBudgetEditOpen, setIsEditBudgetOpen] = useState(false);
  const [isDeleteBudgetOpen, setIsDeleteBudgetOpen] = useState(false);

  const [deleteBudgetMutation, { loading }] = useDeleteBudgetMutation({
    variables: {
      id,
    },
    onCompleted: () => {
      setIsDeleteBudgetOpen(false);
      // toast.success(`Budget '${category}' deleted successfully!`);
    },
    refetchQueries: ['GetAllBudgets'],
    onError: (error) => {
      toast.error(`Error deleting budget: ${error.message}`);
    },
  });

  return (
    <>
      <ResponsiveModal
        description="As your budgets change, feel free to update your spending limits."
        isOpen={isBudgetEditOpen}
        setIsOpen={setIsEditBudgetOpen}
        title="Edit Budget"
      >
        <div>Edit Budget Form</div>
        <EditBudgetForm
          category={category}
          id={id}
          maximum={maximum}
          setIsOpen={setIsEditBudgetOpen}
          theme={theme}
        />
      </ResponsiveModal>
      <ResponsiveModal
        description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
        isOpen={isDeleteBudgetOpen}
        setIsOpen={setIsDeleteBudgetOpen}
        title={`Delete \u2018${category}\u2019?`}
      >
        <Button
          disabled={loading}
          onClick={() => deleteBudgetMutation()}
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
