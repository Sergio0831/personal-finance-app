'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { IconPot } from '@/assets/icons';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from '@/components/ui/data-list';
import { Separator } from '@/components/ui/separator';
import { BudgetChart } from '@/features/budgets/components';
import { calculateSpent } from '@/features/budgets/utils';
import { useGetOverviewQuery } from '@/graphql/generated/output';
import { cn } from '@/lib/clsx';
import { formatAmount, formatDate } from '@/lib/format';
import OverviewCard from './OverviewCard';

const overviewCards = [
  {
    title: 'Current Balance',
    value: 4836,
  },
  {
    title: 'Income',
    value: 3814.25,
  },
  {
    title: 'Expenses',
    value: 1700.5,
  },
];

const OverviewMain = () => {
  const { data, loading } = useGetOverviewQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  const transactions = data?.recentTransactions;
  const recurringBills = data?.recurringBills;
  const budgets = data?.budgets;

  return (
    <main className="grid @min-3xl:grid-cols-12 gap-6">
      {/* Overview cards start */}
      <div className="col-span-12 mb-8 grid @min-2xl:grid-flow-col gap-6">
        {overviewCards.map((card, index) => (
          <Card
            className={cn('sm:p-6', index === 0 && 'bg-foreground text-white')}
            key={card.title}
          >
            <CardTitle className="mb-4">
              <h2 className="text-preset-4">{card.title}</h2>
            </CardTitle>
            <CardContent>
              <p className="text-preset-1">{formatAmount(card.value)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Overview cards end */}

      {/* Pots and Transactions div strart*/}
      <div className="@min-3xl:col-span-7 col-span-12 grid gap-6">
        {/* Overview pots card start */}
        <OverviewCard
          className="col-span-12 gap-6"
          contentClassName="flex flex-wrap gap-5"
          href="/pots"
          title="Pots"
        >
          <div className="flex flex-1 items-center gap-x-4 rounded-xl bg-background p-4">
            <IconPot className="size-10" />
            <div>
              <h3 className="mb-3 text-muted text-preset-4">Total Saved</h3>
              <span className="text-preset-1">{formatAmount(850, false)}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data?.pots
              .map((pot) => (
                <div className="flex flex-1/2 gap-x-4" key={pot.id}>
                  <Separator
                    className="mr-4 w-1 rounded-md"
                    orientation="vertical"
                    style={{ backgroundColor: pot.theme }}
                  />
                  <div className="grid gap-y-1">
                    <span className="text-muted text-preset-5">{pot.name}</span>
                    <span className="font-bold text-preset-4">
                      {formatAmount(pot.total, false)}
                    </span>
                  </div>
                </div>
              ))
              .slice(0, 4)}
          </div>
        </OverviewCard>
        {/* Overview pots card end */}
        {/* Overview transactions card start */}
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
                      <Image
                        alt={name}
                        className="rounded-full"
                        height={40}
                        src={avatar}
                        width={40}
                      />
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
        {/* Overview transactions card end */}
      </div>
      {/* Pots and Transactions div end*/}

      {/* Budgets and Bills div start*/}
      <div className="@min-3xl:col-span-5 col-span-12 grid gap-6">
        {/* Overview budgets card start */}
        <OverviewCard
          contentClassName="flex gap-y-4 flex-col @min-5xl:flex-row"
          href="/budgets"
          title="Budgets"
        >
          <BudgetChart budgets={budgets?.slice(0, 4)} />
          <DataList
            className="grid @max-5xl:grid-cols-2 gap-4"
            orientation={'vertical'}
          >
            {budgets
              ?.map((budget) => {
                const { id, category, theme, lastTransactions } = budget;

                const spent = calculateSpent(lastTransactions);

                return (
                  <div className="flex items-center gap-x-4" key={id}>
                    <Separator
                      className="w-1 rounded-md"
                      orientation="vertical"
                      style={{ backgroundColor: theme }}
                    />
                    <DataListItem>
                      <DataListLabel className="mb-1">
                        <span className="text-muted text-preset-4">
                          {category}
                        </span>
                      </DataListLabel>
                      <DataListValue>
                        <span className="font-bold text-preset-3">
                          {formatAmount(spent)}
                        </span>
                      </DataListValue>
                    </DataListItem>
                  </div>
                );
              })
              .slice(0, 4)}
          </DataList>
        </OverviewCard>
        {/* Overview budgets card end */}
        {/* Overview recurring bills card start */}
        <OverviewCard href="/recurring-bills" title="Recurring Bills">
          <DataList>
            <DataListItem className="mb-3 flex items-center justify-between rounded-md border-l-4 border-l-accent bg-background px-4 py-5 text-preset-4">
              <DataListLabel>Paid Bills</DataListLabel>
              <DataListValue>
                {formatAmount(recurringBills?.paidBills.total ?? 190)}
              </DataListValue>
            </DataListItem>
            <DataListItem className="mb-3 flex items-center justify-between rounded-md border-l-4 border-l-yellow bg-background px-4 py-5 text-preset-4">
              <DataListLabel>Total Upcoming</DataListLabel>
              <DataListValue>
                {formatAmount(recurringBills?.totalUpcoming.total ?? 194.98)}
              </DataListValue>
            </DataListItem>
            <DataListItem className="flex items-center justify-between rounded-md border-l-4 border-l-cyan bg-background px-4 py-5 text-preset-4">
              <DataListLabel>Due Soon</DataListLabel>
              <DataListValue>
                {formatAmount(recurringBills?.dueSoon.total ?? 59.98)}
              </DataListValue>
            </DataListItem>
          </DataList>
        </OverviewCard>
        {/* Overview recurring bills card end */}
      </div>
      {/* Budgets and Bills div end*/}
    </main>
  );
};

export default OverviewMain;
