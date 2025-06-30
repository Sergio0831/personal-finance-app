import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';

import { Search } from '@/assets/icons';

interface TableFilterProps<TData> {
	table: Table<TData>;
}

const TableFilter = <TData,>({ table }: TableFilterProps<TData>) => {
	return (
		<div className='relative w-full max-w-xs'>
			<Input
				placeholder='Search transaction'
				type='search'
				aria-label='Search transaction'
				value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
				onChange={event =>
					table.getColumn('name')?.setFilterValue(event.target.value)
				}
				className='pr-13'
			/>
			<span className='absolute inset-y-0 end-0 flex items-center pr-5'>
				<Search className='size-4' />
			</span>
		</div>
	);
};

export default TableFilter;
