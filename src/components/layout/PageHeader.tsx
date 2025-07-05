import type { ComponentProps } from 'react';

import { UserButton } from '@/components/user';

import { cn } from '@/lib/clsx';

interface PageHeaderProps extends ComponentProps<'header'> {
  title: string;
}

const PageHeader = ({ className, title, ...rest }: PageHeaderProps) => {
  return (
    <header
      {...rest}
      className={cn(
        'mb-8 flex items-center justify-between sm:py-2',
        className
      )}
    >
      <h1 className="select-none text-preset-1">{title}</h1>
      <UserButton />
    </header>
  );
};

export default PageHeader;
