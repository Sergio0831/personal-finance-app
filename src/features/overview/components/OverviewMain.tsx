'use client';

import { useGetOverviewQuery } from '@/graphql/generated/output';
import getOverviewTotals from '../utils';
import OverviewBills from './OverviewBills';
import OverviewBudgets from './OverviewBudgets';
import OverviewPots from './OverviewPots';
import OverviewSummaryCards from './OverviewSummaryCards';
import OverviewTransactions from './OverviewTransactions';

const OverviewMain = () => {
  const { data, loading, error } = useGetOverviewQuery();

  if (error) {
    return <div>Error loading overview data</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { transactions, recentTransactions, recurringBills, budgets, pots } =
    data;

  const { balance, expenses, income } = getOverviewTotals(transactions);

  const overviewCards = [
    {
      title: 'Current Balance',
      value: balance,
    },
    {
      title: 'Income',
      value: expenses,
    },
    {
      title: 'Expenses',
      value: income,
    },
  ];

  return (
    <main className="grid @min-3xl:grid-cols-12 gap-6">
      {/* Overview summary cards */}
      <OverviewSummaryCards
        className="col-span-12 mb-8 @min-2xl:grid-flow-col"
        overviewCards={overviewCards}
      />
      <div className="@min-3xl:col-span-7 col-span-12 grid gap-6">
        {/* Overview pots */}
        <OverviewPots pots={pots} />

        {/* Overview transactions */}
        <OverviewTransactions transactions={recentTransactions} />
      </div>

      <div className="@min-3xl:col-span-5 col-span-12 grid gap-6">
        {/* Overview budgets */}
        <OverviewBudgets budgets={budgets} />

        {/* Overview recurring bills */}
        <OverviewBills recurringBills={recurringBills} />
      </div>
    </main>
  );
};

export default OverviewMain;
