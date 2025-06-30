import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

// import { ELLIPSIS, usePaginationRange } from '@/hooks/usePaginationRange';

import { cn } from '@/lib/clsx';

import { CaretLeft, CaretRight } from '@/assets/icons';

interface TransactionsTableProps<TData> {
	table: Table<TData>;
}

const TablePagination = <TData,>({ table }: TransactionsTableProps<TData>) => {
	// const range = usePaginationRange(table);

	return (
		<>
			<Button
				variant='outline'
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
				className='h-10 px-4'
			>
				<CaretLeft />
				<span className='hidden sm:block'>Prev</span>
				<span className='sr-only'>Go to previous page</span>
			</Button>
			<div className='flex gap-2'>
				{/* {range.map(page =>
					page === ELLIPSIS ? (
						<span key={page} className='px-2'>
							…
						</span>
					) : (
						<Button
							key={page}
							value={`${page}`}
							size='icon'
							variant='outline'
							onClick={() => table.setPageIndex(page - 1)}
							className={cn(
								page - 1 === table.getState().pagination.pageIndex &&
									'bg-foreground hover:bg-foreground text-white'
							)}
						>
							{page}
						</Button>
					)
				)} */}
				{table.getPageOptions().map(pageSize => (
					<Button
						key={pageSize}
						value={`${pageSize + 1}`}
						variant='outline'
						size='icon'
						className={cn(
							pageSize === table.getState().pagination.pageIndex &&
								'bg-foreground hover:none text-white'
						)}
						onClick={() => table.setPageIndex(pageSize)}
					>
						{pageSize + 1}
					</Button>
				))}
			</div>
			<Button
				variant='outline'
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
				className='h-10 px-4'
			>
				<span className='hidden sm:block'>Next</span>
				<CaretRight />
				<span className='sr-only'>Go to next page</span>
			</Button>
		</>
	);
};

export default TablePagination;
