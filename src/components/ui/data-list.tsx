'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/lib/clsx';

const DataListOrientationContext = React.createContext<
  'horizontal' | 'vertical'
>('horizontal');

const dataListVariants = cva('overflow-hidden text-left font-normal', {
  variants: {
    orientation: {
      horizontal: 'flex flex-col',
      vertical: 'flex flex-col',
    },
    size: {
      default: 'text-base',
      xs: 'text-xs',
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'default',
  },
});

export interface DataListProps
  extends React.HTMLAttributes<HTMLDListElement>,
    VariantProps<typeof dataListVariants> {
  asChild?: boolean;
}

const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  (
    { className, orientation = 'horizontal', size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'dl';

    return (
      <DataListOrientationContext.Provider value={orientation || 'horizontal'}>
        <Comp
          className={cn(dataListVariants({ orientation, size }), className)}
          ref={ref}
          {...props}
        />
      </DataListOrientationContext.Provider>
    );
  }
);
DataList.displayName = 'DataList';

const DataListItem = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  const orientation = React.useContext(DataListOrientationContext);

  return (
    <div
      className={cn(
        className,
        'flex justify-between',
        orientation === 'horizontal' ? 'items-center' : 'flex-col'
      )}
      ref={ref}
      {...props}
    />
  );
});
DataListItem.displayName = 'DataListItem';

const DataListLabel = React.forwardRef<
  React.ElementRef<'dt'>,
  React.ComponentPropsWithoutRef<'dt'>
>(({ className, ...props }, ref) => (
  <dt className={cn('text-muted', className)} ref={ref} {...props} />
));
DataListLabel.displayName = 'DataListLabel';

export interface DataListValueProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DataListValue = React.forwardRef<
  React.ElementRef<'dd'>,
  React.ComponentPropsWithoutRef<'dd'>
>(({ className, ...props }, ref) => (
  <dd className={cn('font-bold', className)} ref={ref} {...props} />
));
DataListValue.displayName = 'DataListValue';

export { DataList, DataListItem, DataListLabel, DataListValue };
