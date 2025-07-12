'use client';

import { Root } from '@radix-ui/react-separator';
import React from 'react';

import { cn } from '@/lib/clsx';

const Separator = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <Root
      className={cn(
        'shrink-0 bg-gray-100',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      decorative={decorative}
      orientation={orientation}
      ref={ref}
      {...props}
    />
  )
);
Separator.displayName = Root.displayName;

export { Separator };
