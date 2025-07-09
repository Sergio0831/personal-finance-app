'use client';

import { RecurringBillsIcon } from '@/assets/icons';
import { useGetAllRecurringBillsQuery } from '@/graphql/generated/output';
import { formatAmount } from '@/lib/format';
import { columns } from './Columns';
import { RecurringBillsSkeleton } from './RecurringBillsSkeleton';
import RecurringBillsTable from './RecurringBillsTable';

const RecurringBillsView = () => {
  const { data, loading } = useGetAllRecurringBillsQuery();

  if (loading) {
    return <RecurringBillsSkeleton />;
  }

  const recurringBills = data?.recurringBills;

  return (
    <main className="flex gap-6 max-md:flex-col">
      <div className="basis flex flex-2/5 gap-4 max-sm:flex-col md:flex-col">
        <div className="w-full rounded-xl bg-foreground p-6 text-white max-sm:flex max-sm:items-center max-sm:gap-x-5">
          <RecurringBillsIcon className="size-10 sm:mb-8" />
          <div>
            <h2 className="mb-3 text-preset-4">Total Bills</h2>
            <span className="text-preset-1">
              {formatAmount(recurringBills?.totalBills ?? 0)}
            </span>
          </div>
        </div>
        <div className="w-full rounded-xl bg-card p-6 text-foreground">
          <h2 className="mb-4 text-preset-3">Summary</h2>
          <ul className="grid gap-y-4 [&_li:not(:first-child)]:border-t [&_li:not(:first-child)]:border-t-grey-100 [&_li:not(:first-child)]:pt-4">
            <li className="flex justify-between">
              <span className="text-muted text-preset-5">Paid Bills</span>
              <span className="font-bold text-preset-5">{`${recurringBills?.paidBills?.count ?? 0} (${formatAmount(recurringBills?.paidBills?.total ?? 0)})`}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted text-preset-5">Total Upcoming</span>
              <span className="font-bold text-preset-5">
                {`${recurringBills?.totalUpcoming?.count ?? 0} (${formatAmount(recurringBills?.totalUpcoming?.total ?? 0)})`}
              </span>
            </li>
            <li className="flex justify-between text-destructive">
              <span className="text-preset-5">Due Soon</span>
              <span className="font-bold text-preset-5">{`${recurringBills?.dueSoon?.count ?? 0} (${formatAmount(recurringBills?.dueSoon?.total ?? 0)})`}</span>
            </li>
          </ul>
        </div>
      </div>
      <RecurringBillsTable
        columns={columns}
        data={recurringBills?.recurringBills || []}
      />
    </main>
  );
};

export default RecurringBillsView;
