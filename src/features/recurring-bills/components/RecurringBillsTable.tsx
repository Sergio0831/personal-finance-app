'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { TableFilter, TableSorting } from '@/components/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import type { RecurringBill } from './Columns';

interface RecurringBillsTableProps {
  data: RecurringBill[];
  columns: ColumnDef<RecurringBill, unknown>[];
  isLoading?: boolean;
}

const RecurringBillsTable = ({ columns, data }: RecurringBillsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
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
      <CardHeader className="flex-row justify-between gap-x-6 space-y-0 max-sm:items-center sm:items-end">
        <TableFilter table={table} />
        <TableSorting table={table} />
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} table={table} />
      </CardContent>
    </Card>
  );
};

export default RecurringBillsTable;
