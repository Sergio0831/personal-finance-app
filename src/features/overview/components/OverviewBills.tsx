import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from '@/components/ui/data-list';
import { formatAmount } from '@/lib/format';
import OverviewCard from './OverviewCard';

export type RecurringBills = {
  paidBills: { total: number };
  totalUpcoming: { total: number };
  dueSoon: { total: number };
};

type OverviewBillsProps = {
  recurringBills?: RecurringBills;
};

const OverviewBills = ({ recurringBills }: OverviewBillsProps) => {
  if (!recurringBills) {
    return (
      <OverviewCard className="col-span-12 grid gap-6" title="Recurring Bills">
        <div className="py-4 text-center font-normal text-muted text-preset-3">
          No recurring bills available.
        </div>
      </OverviewCard>
    );
  }

  const { paidBills, totalUpcoming, dueSoon } = recurringBills;
  const paidTotal = paidBills.total || 0;
  const upcomingTotal = totalUpcoming.total || 0;
  const dueSoonTotal = dueSoon.total || 0;

  return (
    <OverviewCard href="/recurring-bills" title="Recurring Bills">
      <DataList className="grid gap-y-3">
        <DataListItem className="flex items-center justify-between rounded-md border-l-4 border-l-accent bg-background px-4 py-5 text-preset-4">
          <DataListLabel>Paid Bills</DataListLabel>
          <DataListValue>{formatAmount(paidTotal)}</DataListValue>
        </DataListItem>
        <DataListItem className="flex items-center justify-between rounded-md border-l-4 border-l-yellow bg-background px-4 py-5 text-preset-4">
          <DataListLabel>Total Upcoming</DataListLabel>
          <DataListValue>{formatAmount(upcomingTotal)}</DataListValue>
        </DataListItem>
        <DataListItem className="flex items-center justify-between rounded-md border-l-4 border-l-cyan bg-background px-4 py-5 text-preset-4">
          <DataListLabel>Due Soon</DataListLabel>
          <DataListValue>{formatAmount(dueSoonTotal)}</DataListValue>
        </DataListItem>
      </DataList>
    </OverviewCard>
  );
};

export default OverviewBills;
