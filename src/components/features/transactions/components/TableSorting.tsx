import { Table } from '@tanstack/react-table';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

interface TableSortingProps<TData> {
	table: Table<TData>;
}

const TableSorting = <TData,>({ table }: TableSortingProps<TData>) => {
	return (
		<div className='flex items-center gap-x-2'>
			<span className='text-preset-4 text-muted'>Sort by</span>
			<Select
				onValueChange={value => {
					const [id, dir] = value.split('-');
					table.setSorting([{ id, desc: dir === 'desc' }]);
				}}
				// value={table.getState().sorting[0]?.id}
			>
				<SelectTrigger className='data-[size=default]:h-[45px]'>
					<SelectValue
						defaultValue={table.getState().sorting[0]?.id ?? 'Latest'}
						placeholder='Latest'
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='date-desc'>Latest</SelectItem>
					<SelectItem value='date-asc'>Oldest</SelectItem>
					<SelectItem value='name-asc'>A to Z</SelectItem>
					<SelectItem value='name-desc'>Z to A</SelectItem>
					<SelectItem value='amount-desc'>Highest</SelectItem>
					<SelectItem value='amount-asc'>Lowest</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default TableSorting;
