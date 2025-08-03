'use client';

import { Fragment } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from '@/components/ui/data-list';
import { Separator } from '@/components/ui/separator';
import { useGetAllBudgetsQuery } from '@/graphql/generated/output';
import Budget from './Budget';
import BudgetChart from './BudgetChart';
import BudgetsSkeleton from './BudgetsSkeleton';

const BudgetsView = () => {
  const { data, loading } = useGetAllBudgetsQuery();

  const budgets = data?.budgets;

  if (loading) {
    return <BudgetsSkeleton />;
  }

  return (
    <main className="grid @min-3xl:grid-cols-12 gap-6">
      <Card className="@min-3xl:col-span-5 self-start">
        <BudgetChart />
        <CardContent>
          <h2 className="mb-6 text-preset-2">Spending Summary</h2>
          <DataList>
            {budgets?.map((budget, index, array) => {
              const { id, category, theme, maximum, lastTransactions } = budget;

              const spent = lastTransactions.reduce(
                (total, transaction) =>
                  total + Math.abs(transaction.amount || 0),
                0
              );

              return (
                <Fragment key={id}>
                  <DataListItem>
                    <DataListLabel>dasd</DataListLabel>
                    <DataListValue>asdas</DataListValue>
                  </DataListItem>
                  {index !== array.length - 1 && <Separator className="my-4" />}
                </Fragment>
              );
            })}
          </DataList>
        </CardContent>
      </Card>
      <div className="@min-3xl:col-span-7 grid gap-6">
        {budgets?.map((budget) => (
          <Budget key={budget.id} {...budget} />
        ))}
      </div>
    </main>
  );
};

export default BudgetsView;
