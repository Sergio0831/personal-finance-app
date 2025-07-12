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

export interface TableProps<TData> {
  table: ReactTableInstance<TData>;
}

export interface DataTableProps<TData, TValue> extends TableProps<TData> {
  columns: ColumnDef<TData, TValue>[];
}

export const DataTable = <TData, TValue>({
  table,
  columns,
}: DataTableProps<TData, TValue>) => {
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
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
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
          ))
        ) : (
          <TableRow>
            <TableCell className="h-24 text-center" colSpan={columns.length}>
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
