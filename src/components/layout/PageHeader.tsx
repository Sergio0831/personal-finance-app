'use client';

import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import { UserButton } from '@/components/user';
import { cn } from '@/lib/clsx';
import { Button } from '../ui/button';

interface PageHeaderProps extends ComponentProps<'header'> {
  title: string;
}

const PageHeader = ({ className, title, ...rest }: PageHeaderProps) => {
  const pathName = usePathname();

  return (
    <header
      {...rest}
      className={cn(
        'mb-8 flex items-center justify-between sm:py-2',
        className
      )}
    >
      <h1 className="select-none text-preset-1">{title}</h1>
      <div className="flex items-center gap-x-4">
        {(pathName === '/pots' || pathName === '/budgets') && (
          <Button>
            + Add New {pathName === '/budgets' ? 'Budget' : 'Pot'}
          </Button>
        )}
        <UserButton />
      </div>
    </header>
  );
};

export default PageHeader;
