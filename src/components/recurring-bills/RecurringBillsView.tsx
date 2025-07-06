'use client';

import { RecurringBillsIcon } from '@/assets/icons';
import { useGetAllRecurringBillsQuery } from '@/graphql/generated/output';

const RecurringBillsView = () => {
  const { data, loading } = useGetAllRecurringBillsQuery();

  const recurringBills = data?.recurringBills;

  return (
    <main className="flex gap-6">
      <div className="flex gap-4 md:flex-col">
        <div className="rounded-xl bg-foreground p-6 text-white">
          <RecurringBillsIcon className="mb-8 size-10" />
          <div>
            <h2 className="mb-3 text-preset-4">Total Bills</h2>
            <span className="text-preset-1">{`$${recurringBills?.totalBills}`}</span>
          </div>
        </div>
        <div className="rounded-xl bg-card p-6 text-foreground">
          <h2 className="mb-4 text-preset-3">Summary</h2>
          <ul className="grid gap-y-4 [&_li:first-child]:border-0 [&_li:not(:first-child)]:pt-4 [&_li]:border-t [&_li]:border-t-grey-100">
            <li className="flex justify-between">
              <span className="text-muted text-preset-5">Paid Bills</span>
              <span className="font-bold text-preset-5">{`${recurringBills?.paidBills.count} (${recurringBills?.paidBills.total})`}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted text-preset-5">Total Upcoming</span>
              <span className="font-bold text-preset-5">{`${recurringBills?.totalUpcoming.count} (${recurringBills?.totalUpcoming.total})`}</span>
            </li>
            <li className="flex justify-between text-destructive">
              <span className="text-preset-5">Due Soon</span>
              <span className="font-bold text-preset-5">{`${recurringBills?.dueSoon.count} (${recurringBills?.dueSoon.total})`}</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default RecurringBillsView;
