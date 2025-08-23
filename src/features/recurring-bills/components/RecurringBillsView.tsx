'use client';

import { RecurringBillsIcon } from '@/assets/icons';
import { EmptyState } from '@/components/custom';
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from '@/components/ui/data-list';
import { Separator } from '@/components/ui/separator';
import { useGetAllRecurringBillsQuery } from '@/graphql/generated/output';
import { formatAmount } from '@/lib/format';
import { columns } from './Columns';
import RecurringBillsSkeleton from './RecurringBillsSkeleton';
import RecurringBillsTable from './RecurringBillsTable';

const RecurringBillsView = () => {
  const { data, loading, error } = useGetAllRecurringBillsQuery();

  if (loading) {
    return <RecurringBillsSkeleton />;
  }

  if (error) {
    <EmptyState
      description="There was a problem fetching your recurring bills. Please try again later."
      error={true}
      title="Error Loading Recurring Bills"
    />;
  }

  if (!data?.recurringBills) {
    return (
      <EmptyState
        description="Your recurring bills will appear here once you create them."
        title="No Recurring Bills Yet"
      />
    );
  }

  const { dueSoon, paidBills, totalBills, recurringBills, totalUpcoming } =
    data.recurringBills;

  return (
    <main className="grid @min-3xl:grid-cols-12 gap-6">
      <div className="@min-3xl:col-span-4 flex gap-4 self-start max-sm:flex-col md:flex-col">
        <div className="w-full rounded-xl bg-foreground p-6 text-white max-sm:flex max-sm:items-center max-sm:gap-x-5">
          <RecurringBillsIcon className="size-10 sm:mb-8" />
          <div>
            <h2 className="mb-3 text-preset-4">Total Bills</h2>
            <span className="text-preset-1">
              {formatAmount(totalBills ?? 0)}
            </span>
          </div>
        </div>
        <div className="w-full rounded-xl bg-card p-6 text-foreground">
          <h2 className="mb-4 text-preset-3">Summary</h2>
          <DataList className="gap-y-4" size="xs">
            <DataListItem>
              <DataListLabel>Paid Bills</DataListLabel>
              <DataListValue>
                {`${paidBills.count ?? 0} (${formatAmount(paidBills.total ?? 0)})`}
              </DataListValue>
            </DataListItem>
            <Separator />
            <DataListItem>
              <DataListLabel>Total Upcoming</DataListLabel>
              <DataListValue>
                {`${totalUpcoming.count ?? 0} (${formatAmount(totalUpcoming.total ?? 0)})`}
              </DataListValue>
            </DataListItem>
            <Separator />
            <DataListItem>
              <DataListLabel className="text-destructive">
                Due Soon
              </DataListLabel>
              <DataListValue className="text-destructive">
                {`${dueSoon.count ?? 0} (${formatAmount(dueSoon.total ?? 0)})`}
              </DataListValue>
            </DataListItem>
          </DataList>
        </div>
      </div>
      <RecurringBillsTable
        className="@min-3xl:col-span-8"
        columns={columns}
        data={recurringBills || []}
      />
    </main>
  );
};

export default RecurringBillsView;
