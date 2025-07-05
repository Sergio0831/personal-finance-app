import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/clsx';

const alertVariants = cva(
  'relative flex w-full items-baseline rounded-lg border px-4 py-3 text-preset-4 has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'border-destructive/20 bg-destructive/10 text-destructive [&>svg]:text-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'line-clamp-1 min-h-4 font-medium tracking-tight',
        className
      )}
      data-slot="alert-title"
      {...props}
    />
  );
}

export { Alert, AlertTitle };
