import { PageHeader } from '@/components/layout';
import { RecurringBillsView } from '@/features/recurring-bills/components';

const RecurringBillsPage = () => {
  return (
    <>
      <PageHeader title="Recurring Bills" />
      <RecurringBillsView />
    </>
  );
};

export default RecurringBillsPage;
