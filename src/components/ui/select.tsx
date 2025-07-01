'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import { cn } from '@/lib/clsx';

import { CaretDown } from '@/assets/icons';

function Select({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot='select' {...props} />;
}

function SelectGroup({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot='select-group' {...props} />;
}

function SelectValue({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot='select-value' {...props} />;
}

function SelectTrigger({
	className,
	size = 'default',
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: 'sm' | 'default';
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot='select-trigger'
			data-size={size}
			className={cn(
				"group border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex w-fit cursor-pointer items-center justify-between gap-4 rounded-md border bg-transparent px-5 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<CaretDown className='group-data-[state=open]:animate-in group-data-[state=closed]:animate-out size-3 transition-transform group-data-[state=open]:rotate-180' />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	position = 'popper',
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot='select-content'
				className={cn(
					'bg-card text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[7rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md px-5 py-3 shadow-md',
					position === 'popper' &&
						'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
					className
				)}
				position={position}
				{...props}
			>
				<SelectPrimitive.Viewport
					className={cn(
						'p-1',
						position === 'popper' &&
							'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot='select-item'
			className={cn(
				'border-grey-100 relative w-full cursor-pointer border-b pb-3 text-sm outline-hidden transition-transform select-none not-[last-child]:mb-3 hover:font-bold focus-visible:font-bold data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:font-bold',
				className
			)}
			{...props}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
};
