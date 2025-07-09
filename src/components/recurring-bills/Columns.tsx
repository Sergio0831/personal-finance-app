'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { IconBillDue, IconBillPaid } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { getBillStatus } from '@/lib/bill-status';
import { cn } from '@/lib/clsx';
import { formatAmount, formatDueDay } from '@/lib/format';

export type RecurringBill = {
  id: string;
  avatar?: string;
  name: string;
  date: Date;
  amount: number;
};

export const columns: ColumnDef<RecurringBill>[] = [
  {
    accessorKey: 'name',
    sortingFn: 'alphanumeric',
    header: () => <div className="md:px-4">Bill Title</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      const day = date.getDate();
      const formattedDate = formatDueDay(day);
      const status = getBillStatus(date);

      return (
        <div>
          <div className="flex items-center gap-4 max-sm:mb-2 md:px-4">
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
            <span className="font-bold text-preset-4">{row.original.name}</span>
          </div>
          <div className="flex items-center gap-2 sm:hidden">
            <span
              className={cn(
                'text-xs',
                status === 'paid' ? 'text-accent' : 'text-muted'
              )}
            >
              {formattedDate}
            </span>
            {status === 'paid' && <IconBillPaid className="size-4" />}
            {status === 'dueSoon' && <IconBillDue className="size-4" />}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    sortingFn: (a, b) =>
      new Date(b.original.date).getDate() - new Date(a.original.date).getDate(),
    header: () => <div>Due Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      const day = date.getDate();
      const formattedDate = formatDueDay(day);
      const status = getBillStatus(date);

      return (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-xs',
              status === 'paid' ? 'text-accent' : 'text-muted'
            )}
          >
            {formattedDate}
          </span>
          {status === 'paid' && <IconBillPaid className="size-4" />}
          {status === 'dueSoon' && <IconBillDue className="size-4" />}
        </div>
      );
    },
    meta: {
      className: 'hidden sm:table-cell',
    },
  },
  {
    accessorKey: 'amount',
    sortingFn: 'basic',
    header: () => <div className="text-right md:px-4">Amount</div>,
    cell: ({ row }) => {
      const amount = Math.abs(Number.parseFloat(row.getValue('amount')));
      const formattedAmount = formatAmount(amount);
      const status = getBillStatus(new Date(row.getValue('date')));

      return (
        <div className="text-right md:px-4">
          <span
            className={cn(
              'font-bold text-sm',
              status === 'dueSoon' ? 'text-destructive' : 'text-foreground'
            )}
          >
            {formattedAmount}
          </span>
        </div>
      );
    },
  },
];
