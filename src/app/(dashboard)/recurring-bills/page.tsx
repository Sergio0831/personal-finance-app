import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout';
import { RecurringBillsView } from '@/features/recurring-bills/components';

export const metadata: Metadata = {
  title: 'Recurring Bills',
  description:
    'Keep track of subscriptions, utilities, and monthly bills in one place.',
};

const RecurringBillsPage = () => {
  return (
    <>
      <PageHeader title="Recurring Bills" />
      <RecurringBillsView />
    </>
  );
};

export default RecurringBillsPage;
