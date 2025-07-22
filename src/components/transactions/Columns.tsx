'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Avatar } from '@/components/ui/avatar';
import type { Category } from '@/generated/prisma';
import { useTransactionInfo } from '@/hooks/useTransactionInfo';
import { cn } from '@/lib/clsx';

export type Transaction = {
  id: string;
  avatar?: string;
  name: string;
  category?: Category;
  date: Date;
  amount: number;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'name',
    sortingFn: 'alphanumeric',
    header: () => <div className="@xl:px-4">Recipient / Sender</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4 @xl:px-4">
          <Avatar>
            <Image
              alt={row.original.name}
              height={40}
              src={
                row.original.avatar
                  ? row.original.avatar
                  : '/images/avatars/bytewise.jpg'
              }
              width={40}
            />
          </Avatar>
          <div>
            <span className="font-bold text-preset-4">{row.original.name}</span>
            <span className="block @xl:hidden text-muted text-preset-5">
              {row.original.category}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center text-muted text-preset-5">
          {row.original.category}
        </div>
      );
    },
    meta: {
      className: 'hidden @xl:table-cell',
    },
  },
  {
    accessorKey: 'date',
    sortingFn: 'datetime',
    header: () => <div className="text-center">Transaction Date</div>,
    cell: ({ row }) => {
      const { formattedDate } = useTransactionInfo(row);

      return (
        <div className="text-center text-muted text-preset-5">
          {row.original.date ? formattedDate : '29 Aug 2024'}
        </div>
      );
    },
    meta: {
      className: 'hidden @xl:table-cell',
    },
  },
  {
    accessorKey: 'amount',
    sortingFn: 'basic',
    header: () => <div className="text-right md:px-4">Amount</div>,
    cell: ({ row }) => {
      const { isPositive, formattedAmount, formattedDate } =
        useTransactionInfo(row);

      return (
        <div className="text-right md:px-4">
          <span
            className={cn(
              'font-bold text-sm',
              isPositive ? 'text-accent' : 'text-foreground'
            )}
          >
            {formattedAmount}
          </span>
          <span className="block @xl:hidden text-muted text-preset-5">
            {row.original.date ? formattedDate : '29 Aug 2024'}
          </span>
        </div>
      );
    },
  },
];
