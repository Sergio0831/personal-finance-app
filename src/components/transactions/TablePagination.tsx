import { CaretLeft, CaretRight } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import type { TableProps } from '@/components/ui/data-table';
import { ELLIPSIS, usePaginationRange } from '@/hooks/usePaginationRange';
import { cn } from '@/lib/clsx';
import type { Transaction } from './Columns';

const TablePagination = ({ table }: TableProps<Transaction>) => {
  const range = usePaginationRange(table);

  return (
    <>
      <Button
        className="h-10 px-4"
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
        variant="outline"
      >
        <CaretLeft />
        <span className="hidden sm:block">Prev</span>
        <span className="sr-only">Go to previous page</span>
      </Button>

      <div className="flex items-center gap-2 md:hidden">
        {range.map((page) =>
          page === ELLIPSIS ? (
            <span className="px-2" key={page}>
              …
            </span>
          ) : (
            <Button
              className={cn(
                page - 1 === table.getState().pagination.pageIndex &&
                  'bg-foreground text-white hover:bg-foreground'
              )}
              key={page}
              onClick={() => table.setPageIndex(page - 1)}
              size="icon"
              value={`${page}`}
              variant="outline"
            >
              {page}
            </Button>
          )
        )}
      </div>
      <div className="flex items-center gap-2 max-md:hidden">
        {table.getPageOptions().map((pageSize) => (
          <Button
            className={cn(
              pageSize === table.getState().pagination.pageIndex &&
                'bg-foreground text-white hover:bg-foreground'
            )}
            key={pageSize}
            onClick={() => table.setPageIndex(pageSize)}
            size="icon"
            value={`${pageSize + 1}`}
            variant="outline"
          >
            {pageSize + 1}
          </Button>
        ))}
      </div>
      <Button
        className="h-10 px-4"
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
        variant="outline"
      >
        <span className="hidden sm:block">Next</span>
        <CaretRight />
        <span className="sr-only">Go to next page</span>
      </Button>
    </>
  );
};

export default TablePagination;
