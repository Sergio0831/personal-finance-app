import { type ComponentProps, forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';

import { cn } from '@/lib/clsx';

export interface InputProps extends ComponentProps<'input'> {
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        aria-invalid={!!error}
        className={cn(
          error
            ? 'border-destructive'
            : 'border-input hover:border-muted focus-visible:border-input-active',
          'flex h-11 w-full rounded-md border bg-card px-5 py-3 text-preset-4 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
