'use client';

import { type InputHTMLAttributes } from 'react';
import { type FieldError, useFormContext } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

type InputWithLabelProps<T> = {
	label: string;
	nameInSchema: keyof T & string;
	error: FieldError | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

const InputWithLabel = <T,>({
	label,
	nameInSchema,
	error,
	className,
	disabled,
	...props
}: InputWithLabelProps<T>) => {
	const { control } = useFormContext();

	return (
		<FormField
			control={control}
			name={nameInSchema}
			render={({ field }) => (
				<FormItem className='mb-4'>
					<FormLabel htmlFor={field.name}>{label}</FormLabel>
					<FormControl>
						<Input
							disabled={disabled}
							aria-label={field.name}
							id={field.name}
							error={error}
							className={cn(className)}
							{...field}
							{...props}
						/>
					</FormControl>
					<FormMessage id={field.name} />
				</FormItem>
			)}
		/>
	);
};

export default InputWithLabel;
