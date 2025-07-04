'use client';

import {
	ColumnDef,
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
import { DataTable } from '@/components/ui/data-table';

import { Transaction } from './Columns';
import TableFilter from './TableFilter';
import TableFilterByCategory from './TableFilterByCategory';
import TablePagination from './TablePagination';
import TableSorting from './TableSorting';

interface TransactionsTableProps {
	data: Transaction[];
	columns: ColumnDef<Transaction, unknown>[];
}

const TransactionsTable = ({ columns, data }: TransactionsTableProps) => {
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
			<CardHeader className='flex-row items-end justify-between space-y-0 gap-x-6'>
				<TableFilter table={table} />
				<div className='flex items-center gap-x-6'>
					<TableSorting table={table} />
					<TableFilterByCategory table={table} />
				</div>
			</CardHeader>
			<CardContent>
				<DataTable table={table} columns={columns} />
			</CardContent>
			<CardFooter className='h-16 items-end justify-between'>
				<TablePagination table={table} />
			</CardFooter>
		</Card>
	);
};

export default TransactionsTable;
