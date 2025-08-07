'use client';

import { Card, CardContent } from '@/components/ui/card';

import { useGetAllBudgetsQuery } from '@/graphql/generated/output';
import Budget from './Budget';
import BudgetChart from './BudgetChart';
import BudgetsSkeleton from './BudgetsSkeleton';
import SpendingSummary from './SpendingSummary';

const BudgetsView = () => {
  const { data, loading } = useGetAllBudgetsQuery();

  const budgets = data?.budgets;

  if (loading) {
    return <BudgetsSkeleton />;
  }

  return (
    <main className="grid @min-3xl:grid-cols-12 gap-6">
      <Card className="@min-3xl:col-span-5 self-start">
        <BudgetChart budgets={budgets} />
        <CardContent>
          <h2 className="mb-6 text-preset-2">Spending Summary</h2>
          <SpendingSummary budgets={budgets} />
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
