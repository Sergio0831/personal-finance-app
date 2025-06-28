'use client';

import * as React from 'react';

import { cn } from '@/lib/clsx';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
	return (
		<div
			data-slot='table-container'
			className='relative w-full overflow-x-auto'
		>
			<table
				data-slot='table'
				className={cn('w-full caption-bottom', className)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	return (
		<thead
			data-slot='table-header'
			className={cn(
				'[&_tr]:border-grey-100 [&_tr]:text-preset-5 [&_tr]:border-b',
				className
			)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	return (
		<tbody
			data-slot='table-body'
			className={cn(
				'[&_tr]:border-t-grey-100 [&_tr]:border-t [&_tr:first-child]:border-0',
				className
			)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			data-slot='table-footer'
			className={cn(
				'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
				className
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			data-slot='table-row'
			className={cn(
				'hover:bg-muted/20 data-[state=selected]:bg-muted transition-colors',
				className
			)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot='table-head'
			className={cn(
				'text-muted py-3 text-left align-middle font-normal',
				className
			)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			data-slot='table-cell'
			className={cn('py-4 align-middle', className)}
			{...props}
		/>
	);
}

function TableCaption({
	className,
	...props
}: React.ComponentProps<'caption'>) {
	return (
		<caption
			data-slot='table-caption'
			className={cn('text-muted-foreground mt-4', className)}
			{...props}
		/>
	);
}

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption
};
