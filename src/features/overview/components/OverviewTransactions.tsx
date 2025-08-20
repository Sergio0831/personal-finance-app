import { Fragment } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from '@/components/ui/data-list';
import { Separator } from '@/components/ui/separator';
import type { Transaction } from '@/features/transactions/components';
import { cn } from '@/lib/clsx';
import { formatAmount, formatDate } from '@/lib/format';
import OverviewCard from './OverviewCard';

type OverviewTransactionsProps = {
  transactions?: Transaction[];
};

const OverviewTransactions = ({ transactions }: OverviewTransactionsProps) => {
  if (!transactions || transactions.length === 0) {
    return (
      <OverviewCard className="col-span-12 grid gap-6" title="Transactions">
        <div className="py-4 text-center font-normal text-muted text-preset-3">
          No transactions available.
        </div>
      </OverviewCard>
    );
  }

  return (
    <OverviewCard
      className="col-span-12 grid gap-6"
      href="/transactions"
      title="Transactions"
    >
      <DataList>
        {transactions?.map((transaction, index, array) => {
          const { id, avatar, name, amount, date } = transaction;
          const isPositive = amount > 0;

          return (
            <Fragment key={id}>
              <DataListItem>
                <DataListLabel className="flex items-center gap-x-4">
                  <Avatar>
                    <AvatarImage alt={name} src={avatar} />
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                  <h4 className="font-bold text-foreground text-preset-4">
                    {name}
                  </h4>
                </DataListLabel>
                <DataListValue className="grid gap-y-2">
                  <span
                    className={cn(
                      'text-right font-bold text-sm',
                      isPositive ? 'text-accent' : 'text-foreground'
                    )}
                  >
                    {isPositive
                      ? `+${formatAmount(amount)}`
                      : `-${formatAmount(amount)}`}
                  </span>
                  <span className="font-normal text-muted text-preset-5">
                    {formatDate(date)}
                  </span>
                </DataListValue>
              </DataListItem>
              {index !== array.length - 1 && (
                <Separator className="my-5 bg-gray-100" />
              )}
            </Fragment>
          );
        })}
      </DataList>
    </OverviewCard>
  );
};

export default OverviewTransactions;
