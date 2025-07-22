import { CaretLeft, CaretRight } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import type { TableProps } from '@/components/ui/data-table';
import { ELLIPSIS, usePaginationRange } from '@/hooks/usePaginationRange';
import { cn } from '@/lib/clsx';
import type { Transaction } from '../transactions/Columns';

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
        <span className="@max-xl:hidden">Prev</span>
        <span className="sr-only">Go to previous page</span>
      </Button>
      <div className="flex @md:hidden items-center gap-2">
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
      <div className="flex @max-md:hidden items-center gap-2">
        {table.getPageOptions().map((pageIndex) => (
          <Button
            className={cn(
              pageIndex === table.getState().pagination.pageIndex &&
                'bg-foreground text-white hover:bg-foreground'
            )}
            key={pageIndex}
            onClick={() => table.setPageIndex(pageIndex)}
            size="icon"
            value={`${pageIndex + 1}`}
            variant="outline"
          >
            {pageIndex + 1}
          </Button>
        ))}
      </div>{' '}
      <Button
        className="h-10 px-4"
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
        variant="outline"
      >
        <span className="@max-xl:hidden">Next</span>
        <CaretRight />
        <span className="sr-only">Go to next page</span>
      </Button>
    </>
  );
};

export default TablePagination;
