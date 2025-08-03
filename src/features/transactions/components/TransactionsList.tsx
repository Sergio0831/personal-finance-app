'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { CaretRight } from '@/assets/icons';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from '@/components/ui/data-list';
import { Separator } from '@/components/ui/separator';
import type { Transaction } from '@/generated/prisma';
import { cn } from '@/lib/clsx';
import { formatAmount, formatDate } from '@/lib/format';

type TransactionProps = Pick<
  Transaction,
  'id' | 'avatar' | 'name' | 'amount' | 'date'
>;

type TransactionsListProps = {
  transactions: TransactionProps[];
  title: string;
  href?: string;
  className?: string;
};

const TransactionsList = ({
  transactions,
  title,
  href = '/transactions',
  className,
}: TransactionsListProps) => {
  return (
    <Card className={cn('grid', className)}>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <h3 className="text-preset-3">{title}</h3>
          <Link
            className="flex items-center gap-x-3 text-muted text-preset-4 transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/60"
            href={href}
          >
            See All
            <CaretRight className="size-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <DataList>
          {transactions.map((transaction, index, array) => {
            const { id, avatar, name, amount, date } = transaction;

            return (
              <Fragment key={id}>
                <DataListItem>
                  <DataListLabel className="flex items-center gap-x-4">
                    <Image
                      alt={name}
                      className="rounded-full"
                      height={32}
                      src={avatar}
                      width={32}
                    />
                    <h4 className="font-bold text-foreground text-preset-5">
                      {name}
                    </h4>
                  </DataListLabel>
                  <DataListValue className="grid gap-y-1 text-preset-5">
                    <span className="text-right font-bold">
                      {formatAmount(amount)}
                    </span>
                    <span className="font-normal text-muted">
                      {formatDate(date)}
                    </span>
                  </DataListValue>
                </DataListItem>
                {index !== array.length - 1 && (
                  <Separator className="my-3 bg-gray-500/15" />
                )}
              </Fragment>
            );
          })}
        </DataList>
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
