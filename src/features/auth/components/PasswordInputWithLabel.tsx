'use client';

import { type InputHTMLAttributes, useState } from 'react';
import { type FieldError, useFormContext } from 'react-hook-form';
import { HidePassword, ShowPassword } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/clsx';

type PasswordInputWithLabelProps<T> = {
  label: string;
  nameInSchema: keyof T & string;
  error: FieldError | undefined;
  createPassword?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const PasswordInputWithLabel = <T,>({
  label,
  nameInSchema,
  error,
  className,
  disabled,
  createPassword,
  ...props
}: PasswordInputWithLabelProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const { control } = useFormContext();

  const showPasswordHint = createPassword && !error;

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <FormField
      control={control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="mb-8">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                aria-label={field.name}
                className={cn('pr-12', className)}
                disabled={disabled}
                error={error}
                id={field.name}
                type={isVisible ? 'text' : 'password'}
                {...field}
                {...props}
              />
              <Button
                aria-controls={field.name}
                aria-label={isVisible ? 'Hide password' : 'Show password'}
                aria-pressed={isVisible}
                className="absolute inset-y-0 end-0 pr-5 pl-4"
                onClick={toggleVisibility}
                type="button"
                variant="ghost"
              >
                {isVisible ? <HidePassword /> : <ShowPassword />}
              </Button>
            </div>
          </FormControl>
          {showPasswordHint && (
            <p className="text-right text-muted text-preset-4">
              Passwords must be at least 6 characters
            </p>
          )}
          <FormMessage id={field.name} />
        </FormItem>
      )}
    />
  );
};

export default PasswordInputWithLabel;
