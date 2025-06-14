'use client';

import { type InputHTMLAttributes, useState } from 'react';
import { type FieldError, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/clsx';

import { HidePassword, ShowPassword } from '@/assets/icons';

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

	const toggleVisibility = () => setIsVisible(prev => !prev);

	return (
		<FormField
			control={control}
			name={nameInSchema}
			render={({ field }) => (
				<FormItem className='mb-8'>
					<FormLabel htmlFor={field.name}>{label}</FormLabel>
					<FormControl>
						<div className='relative'>
							<Input
								type={isVisible ? 'text' : 'password'}
								disabled={disabled}
								aria-label={field.name}
								id={field.name}
								error={error}
								className={cn('pr-12', className)}
								{...field}
								{...props}
							/>
							<Button
								variant='ghost'
								type='button'
								onClick={toggleVisibility}
								aria-label={isVisible ? 'Hide password' : 'Show password'}
								aria-pressed={isVisible}
								aria-controls='password'
								className='absolute inset-y-0 end-0 pr-5 pl-4'
							>
								{isVisible ? <HidePassword /> : <ShowPassword />}
							</Button>
						</div>
					</FormControl>
					{showPasswordHint && (
						<p className='text-preset-4 text-muted text-right'>
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
