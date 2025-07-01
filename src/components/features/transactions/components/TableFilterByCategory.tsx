import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

import { type Category } from '@/generated/prisma';

import { type Transaction } from './Columns';
import { type TableProps } from './TransactionsTable';

const categories: Category[] = [
	'General',
	'DiningOut',
	'Groceries',
	'Entertainment',
	'Transportation',
	'Shopping',
	'Lifestyle',
	'PersonalCare',
	'Education',
	'Bills'
];

const TableFilterByCategory = ({ table }: TableProps<Transaction>) => {
	const handleChange = (value: string) => {
		if (value === 'all') {
			table.getColumn('category')?.setFilterValue(undefined);
		} else {
			table.getColumn('category')?.setFilterValue(value);
		}
	};

	return (
		<div className='flex items-center gap-x-2'>
			<span className='text-preset-4 text-muted'>Category</span>
			<Select
				value={
					(table.getColumn('category')?.getFilterValue() as string) ?? 'all'
				}
				onValueChange={handleChange}
			>
				<SelectTrigger className='data-[size=default]:h-[45px]'>
					<SelectValue placeholder='All Transactions' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>All Transactions</SelectItem>
					{categories.map(cat => (
						<SelectItem key={cat} value={cat}>
							{cat}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default TableFilterByCategory;
