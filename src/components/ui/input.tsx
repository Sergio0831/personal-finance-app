import { type ComponentProps, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import { cn } from '@/lib/utils';

export interface InputProps extends ComponentProps<'input'> {
	error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, error, ...props }, ref) => {
		return (
			<input
				type={type}
				aria-invalid={!!error}
				className={cn(
					error
						? 'border-destructive'
						: 'border-input hover:border-muted focus-visible:border-input-active',
					'text-preset-4 bg-card flex h-11 w-full rounded-md border px-3 py-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input };
