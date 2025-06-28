'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { Avatar } from '@/components/ui/avatar';

import { cn } from '@/lib/clsx';
import { formatAmount, formatDate } from '@/lib/format';

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
						<Image
							src={
								row.original.avatar
									? row.original.avatar
									: '/images/avatars/bytewise.jpg'
							}
							width={40}
							height={40}
							alt={row.original.name}
						/>
					</Avatar>
					<div>
						<span className='text-preset-4 font-bold'>{row.original.name}</span>
						<span className='text-preset-5 text-muted block sm:hidden'>
							{row.original.category}
						</span>
					</div>
				</div>
			);
		}
	},
	{
		accessorKey: 'category',
		header: () => <div className='text-center'>Category</div>,
		cell: ({ row }) => {
			return (
				<div className='text-preset-5 text-muted hidden text-center sm:block'>
					{row.original.category}
				</div>
			);
		}
	},
	{
		accessorKey: 'date',
		header: () => <div className='text-center'>Transaction Date</div>,
		cell: ({ row }) => {
			const formattedDate = formatDate(row.original.date!);

			return (
				<div className='text-preset-5 text-muted hidden text-center sm:block'>
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
			const formatted = formatAmount(amount);
			const isPositive = amount > 0;
			const displayAmount = isPositive ? `+${formatted}` : formatted;

			const formattedDate = formatDate(row.original.date!);

			return (
				<div className='text-right md:px-4'>
					<span
						className={cn(
							'text-sm font-bold',
							isPositive ? 'text-accent' : 'text-foreground'
						)}
					>
						{displayAmount}
					</span>
					<span className='text-preset-5 text-muted block sm:hidden'>
						{!row.original.date ? '29 Aug 2024' : formattedDate}
					</span>
				</div>
			);
		}
	}
];
