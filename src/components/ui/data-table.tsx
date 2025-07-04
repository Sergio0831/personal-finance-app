import {
	type ColumnDef,
	type Table as ReactTableInstance,
	flexRender
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';

import { cn } from '@/lib/clsx';

export interface TableProps<TData> {
	table: ReactTableInstance<TData>;
}

export interface DataTableProps<TData, TValue> extends TableProps<TData> {
	columns: ColumnDef<TData, TValue>[];
}

export const DataTable = <TData, TValue>({
	table,
	columns
}: DataTableProps<TData, TValue>) => {
	return (
		<Table>
			<TableHeader className='hidden sm:table-header-group'>
				{table.getHeaderGroups().map(headerGroup => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map(header => {
							return (
								<TableHead
									key={header.id}
									className={cn(header.column.columnDef.meta?.className)}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</TableHead>
							);
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map(row => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && 'selected'}
						>
							{row.getVisibleCells().map(cell => (
								<TableCell
									key={cell.id}
									className={cn(cell.column.columnDef.meta?.className)}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className='h-24 text-center'>
							No results.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
