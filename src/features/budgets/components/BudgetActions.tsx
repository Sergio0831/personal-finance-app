'use client';

import { useState } from 'react';
import { OptionsMenu } from '@/components/custom';

const BudgetActions = () => {
  const [isBudgetEditOpen, setIsEditBudgetOpen] = useState(false);
  const [isDeleteBudgetOpen, setIsDeleteBudgetOpen] = useState(false);

  return (
    <OptionsMenu
      deleteLabel="Delete Budget"
      editLabel="Edit Budget"
      onDelete={() => setIsDeleteBudgetOpen(true)}
      onEdit={() => setIsEditBudgetOpen(true)}
    />
  );
};

export default BudgetActions;
