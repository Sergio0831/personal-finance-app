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

type InputWithLabelProps<T> = {
  label: string;
  nameInSchema: Path<T>;
  error: FieldError | undefined;
  charsLeft?: number;
} & InputHTMLAttributes<HTMLInputElement>;

const InputWithLabel = <T,>({
  label,
  nameInSchema,
  error,
  className,
  disabled,
  charsLeft,
  ...props
}: InputWithLabelProps<T>) => {
  const { control } = useFormContext();

  const showCharsLeft = typeof charsLeft === 'number' && !error;

  return (
    <FormField
      control={control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <Input
              aria-label={field.name}
              className={cn(className)}
              disabled={disabled}
              error={error}
              id={field.name}
              {...field}
              {...props}
            />
          </FormControl>
          {showCharsLeft && (
            <p
              className={cn(
                'mt-1 text-right text-xs',
                charsLeft === 0 ? 'text-destructive' : 'text-muted'
              )}
            >
              {charsLeft} {charsLeft === 1 ? 'character' : 'characters'} left
            </p>
          )}
          <FormMessage id={field.name} />
        </FormItem>
      )}
    />
  );
};

export default InputWithLabel;
