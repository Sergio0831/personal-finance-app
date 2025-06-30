'use client';

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';
import { useState } from 'react';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from '@/components/ui/card';

import TableFilter from './TableFilter';
import TablePagination from './TablePagination';
import TableSorting from './TableSorting';
import TableView from './TableView';

interface TransactionsTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

const TransactionsTable = <TData, TValue>({
	columns,
	data
}: TransactionsTableProps<TData, TValue>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data: data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
			columnFilters
		}
	});

	return (
		<Card className='mb-13 grid w-full gap-y-6 overflow-x-auto sm:mb-18 md:mb-0'>
			<CardHeader className='flex-row justify-between space-y-0'>
				<TableFilter table={table} />
				<div>
					<TableSorting table={table} />
				</div>
			</CardHeader>
			<CardContent>
				<TableView table={table} columns={columns} />
			</CardContent>
			<CardFooter className='h-16 items-end justify-between'>
				<TablePagination table={table} />
			</CardFooter>
		</Card>
	);
};

export default TransactionsTable;
