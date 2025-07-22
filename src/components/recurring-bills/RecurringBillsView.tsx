'use client';

import { RecurringBillsIcon } from '@/assets/icons';
import { useGetAllRecurringBillsQuery } from '@/graphql/generated/output';
import { formatAmount } from '@/lib/format';
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from '../ui/data-list';
import { Separator } from '../ui/separator';
import { columns } from './Columns';
import RecurringBillsSkeleton from './RecurringBillsSkeleton';
import RecurringBillsTable from './RecurringBillsTable';

const RecurringBillsView = () => {
  const { data, loading } = useGetAllRecurringBillsQuery();

  if (loading) {
    return <RecurringBillsSkeleton />;
  }

  const recurringBills = data?.recurringBills;

  return (
    <main className="flex @max-3xl:flex-col gap-6">
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
          <DataList className="gap-y-4" size="xs">
            <DataListItem>
              <DataListLabel>Paid Bills</DataListLabel>
              <DataListValue>
                {`${recurringBills?.paidBills?.count ?? 0} (${formatAmount(recurringBills?.paidBills?.total ?? 0)})`}
              </DataListValue>
            </DataListItem>
            <Separator />
            <DataListItem>
              <DataListLabel>Total Upcoming</DataListLabel>
              <DataListValue>
                {`${recurringBills?.totalUpcoming?.count ?? 0} (${formatAmount(recurringBills?.totalUpcoming?.total ?? 0)})`}
              </DataListValue>
            </DataListItem>
            <Separator />
            <DataListItem>
              <DataListLabel className="text-destructive">
                Due Soon
              </DataListLabel>
              <DataListValue className="text-destructive">
                {`${recurringBills?.dueSoon?.count ?? 0} (${formatAmount(recurringBills?.dueSoon?.total ?? 0)})`}
              </DataListValue>
            </DataListItem>
          </DataList>
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
