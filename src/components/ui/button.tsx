import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap text-preset-4 font-bold transition-colors ring-offset-card  focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
	{
		variants: {
			variant: {
				primary:
					'bg-foreground text-white hover:bg-gray-500 focus-visible:bg-gray-500',
				secondary:
					'bg-background text-foreground border border-transparent hover:bg-transparent hover:border-foreground focus-visible:bg-transparent focus-visible:border-foreground',
				outline:
					'bg-transparent border border-foreground hover:bg-background focus-visible:bg-background hover:border-transparent focus-visible:border-transparent',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-red-400 focus-visible:bg-red-400',
				link: 'text-foreground underline-offset-4 underline hover:text-muted focus-visible:text-muted',
				ghost: 'bg-transparent text-foreground hover:text-muted focus-visible:text-muted'
			},
			size: {
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
				link: ''
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'lg'
		}
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
