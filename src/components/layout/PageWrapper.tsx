import type { ComponentProps } from 'react';

import { cn } from '@/lib/clsx';

const PageWrapper = ({
  className,
  children,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        '@container mb-13 w-full px-4 py-6 sm:mb-18 sm:px-10 sm:py-8 md:mb-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
