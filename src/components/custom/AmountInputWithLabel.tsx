'use client';

import type { InputHTMLAttributes } from 'react';
import { type FieldError, type Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/clsx';

type AmountInputWithLabelProps<T> = {
  label: string;
  nameInSchema: Path<T>;
  error: FieldError | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

const AmountInputWithLabel = <T,>({
  label,
  nameInSchema,
  error,
  className,
  disabled,
  ...props
}: AmountInputWithLabelProps<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <div className="relative flex items-center">
              <span className="absolute start-5 text-input text-sm">$</span>
              <Input
                aria-label={field.name}
                className={cn('pl-10', className)}
                disabled={disabled}
                error={error}
                id={field.name}
                {...field}
                {...props}
              />
            </div>
          </FormControl>
          <FormMessage id={field.name} />
        </FormItem>
      )}
    />
  );
};

export default AmountInputWithLabel;
