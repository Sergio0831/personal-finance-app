import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/clsx';

const alertVariants = cva(
	'relative w-full rounded-lg border px-4 py-3 text-preset-4 flex has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 items-baseline [&>svg]:text-current',
	{
		variants: {
			variant: {
				default: 'bg-card text-card-foreground',
				destructive:
					'text-destructive bg-destructive/10 [&>svg]:text-current border-destructive/20'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot='alert'
			role='alert'
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='alert-title'
			className={cn(
				'line-clamp-1 min-h-4 font-medium tracking-tight',
				className
			)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle };
