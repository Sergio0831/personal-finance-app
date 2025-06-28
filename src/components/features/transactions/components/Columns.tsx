'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { Category } from '@/generated/prisma';

type Transaction = {
	id: string;
	avatar?: string;
	name: string;
	category?: Category;
	date: Date;
	amount: number;
};
export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: 'name',
		header: () => <div className='md:px-4'>Recipient / Sender</div>,
		cell: ({ row }) => {
			return (
				<div className='flex items-center gap-4 md:px-4'>
					<Avatar>
						<AvatarImage src={row.original.avatar} alt={row.original.name} />
					</Avatar>
					<span className='text-preset-4 font-bold'>{row.original.name}</span>
				</div>
			);
		}
	},
	{
		accessorKey: 'category',
		header: () => <div className='text-center'>Category</div>,
		cell: ({ row }) => {
			return (
				<div className='text-preset-5 text-muted text-center'>
					{row.original.category}
				</div>
			);
		}
	},
	{
		accessorKey: 'date',
		header: () => <div className='text-center'>Transaction Date</div>,
		cell: ({ row }) => {
			const isoDate = row.original.date!;
			const date = new Date(isoDate);

			const formattedDate = new Intl.DateTimeFormat('en-GB', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			}).format(date);

			return (
				<div className='text-preset-5 text-muted text-center'>
					{!row.original.date ? '29 Aug 2024' : formattedDate}
				</div>
			);
		}
	},
	{
		accessorKey: 'amount',
		header: () => <div className='text-right md:px-4'>Amount</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD'
			}).format(amount);

			return (
				<div className='text-preset-4 text-right font-bold md:px-4'>
					{formatted}
				</div>
			);
		}
	}
];
