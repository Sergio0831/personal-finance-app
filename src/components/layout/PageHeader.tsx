'use client';

import { usePathname } from 'next/navigation';
import { type ComponentProps, useState } from 'react';
import { UserButton } from '@/components/user';
import { AddNewBudgetForm } from '@/features/budgets/components';
import { AddNewPotForm } from '@/features/pots/components';
import { cn } from '@/lib/clsx';
import ResponsiveModal from '../custom/ResponsiveModal';
import { Button } from '../ui/button';

interface PageHeaderProps extends ComponentProps<'header'> {
  title: string;
}

const PageHeader = ({ className, title, ...rest }: PageHeaderProps) => {
  const pathName = usePathname();
  const isPotPage = pathName === '/pots';
  const isBudgetPage = pathName === '/budgets';

  const [isPotModalOpen, setIsPotModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  const handleModalOpen = () => {
    if (isBudgetPage) {
      setIsBudgetModalOpen(true);
    } else if (isPotPage) {
      setIsPotModalOpen(true);
    }
  };

  return (
    <>
      {isPotPage && (
        <ResponsiveModal
          description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
          isOpen={isPotModalOpen}
          setIsOpen={setIsPotModalOpen}
          title="Add New Pot"
        >
          <AddNewPotForm setIsOpen={setIsPotModalOpen} />
        </ResponsiveModal>
      )}
      {isBudgetPage && (
        <ResponsiveModal
          description="Choose a category to set a spending budget. These categories can help you monitor spending."
          isOpen={isBudgetModalOpen}
          setIsOpen={setIsBudgetModalOpen}
          title="Add New Budget"
        >
          <AddNewBudgetForm />
        </ResponsiveModal>
      )}
      <header
        {...rest}
        className={cn(
          'mb-8 flex items-center justify-between sm:py-2',
          className
        )}
      >
        <h1 className="select-none text-preset-1">{title}</h1>
        <div className="flex items-center gap-x-4">
          {(isPotPage || isBudgetPage) && (
            <Button onClick={handleModalOpen}>
              + Add New {isBudgetPage ? 'Budget' : 'Pot'}
            </Button>
          )}
          <UserButton />
        </div>
      </header>
    </>
  );
};

export default PageHeader;
