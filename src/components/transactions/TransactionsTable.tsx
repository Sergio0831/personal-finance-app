'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import TableFilter from '../table/TableFilter';
import TableFilterByCategory from '../table/TableFilterByCategory';
import TablePagination from '../table/TablePagination';
import TableSorting from '../table/TableSorting';
import type { Transaction } from './Columns';
import TransactionTableSkeleton from './TransactionTableSkeleton';

interface TransactionsTableProps {
  data: Transaction[];
  columns: ColumnDef<Transaction, unknown>[];
  isLoading?: boolean;
}

const TransactionsTable = ({
  columns,
  data,
  isLoading,
}: TransactionsTableProps) => {
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
      columnFilters,
    },
  });

  return (
    <Card className="mb-13 grid w-full gap-y-6 overflow-x-auto sm:mb-18 md:mb-0">
      {isLoading ? (
        <TransactionTableSkeleton />
      ) : (
        <>
          <CardHeader className="flex-row justify-between gap-x-6 space-y-0 sm:items-end">
            <TableFilter table={table} />
            <div className="flex items-center gap-x-6">
              <TableSorting table={table} />
              <TableFilterByCategory table={table} />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} table={table} />
          </CardContent>
          <CardFooter className="h-16 items-end justify-between">
            <TablePagination table={table} />
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default TransactionsTable;
