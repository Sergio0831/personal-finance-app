'use client';

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table';
import { useState } from 'react';

import TableFilter from './TableFilter';
import TablePagination from './TablePagination';
import TableView from './TableView';

interface TransactionsTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

const TransactionsTable = <TData, TValue>({
	columns,
	data
}: TransactionsTableProps<TData, TValue>) => {
	const [sorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data: data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters
		}
	});

	return (
		<div className='mb-13 grid w-full gap-y-6 overflow-x-auto rounded-xl bg-white p-6 sm:mb-18 sm:p-8 md:mb-0'>
			<div>
				<TableFilter table={table} />
			</div>
			<TableView table={table} columns={columns} />
			<TablePagination table={table} />
		</div>
	);
};

export default TransactionsTable;
