import {
  type ColumnDef,
  flexRender,
  type Table as ReactTableInstance,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { cn } from '@/lib/clsx';
import { Skeleton } from './skeleton';

export interface TableProps<TData> {
  table: ReactTableInstance<TData>;
}

export interface DataTableProps<TData, TValue> extends TableProps<TData> {
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
}

export const DataTable = <TData, TValue>({
  table,
  columns,
  isLoading,
}: DataTableProps<TData, TValue>) => {
  const rowCount = isLoading ? 10 : table.getRowModel().rows.length;

  return (
    <Table>
      <TableHeader className="max-md:line-clamp-0 max-md:h-0">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  className={cn(header.column.columnDef.meta?.className)}
                  key={header.id}
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
        {(() => {
          if (isLoading) {
            return [...new Array(rowCount)].map((_, rowIndex) => {
              const skeletonKey = `skeleton-${columns.map((col) => col.id || col.header).join('-')}-${rowIndex}`;
              return (
                <TableRow key={skeletonKey}>
                  {columns.map((col, colIndex) => (
                    <TableCell
                      className={cn(col.meta?.className, 'px-4')}
                      key={`skeleton-cell-${col.id || col.header}-${colIndex}`}
                    >
                      <Skeleton className="h-10 w-full py-4" />
                    </TableCell>
                  ))}
                </TableRow>
              );
            });
          }
          if (table.getRowModel().rows.length) {
            return table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() && 'selected'}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className={cn(cell.column.columnDef.meta?.className)}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ));
          }
          return (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                No results.
              </TableCell>
            </TableRow>
          );
        })()}
      </TableBody>
    </Table>
  );
};
