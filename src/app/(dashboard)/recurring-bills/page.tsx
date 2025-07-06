import { PageHeader } from '@/components/layout';
import { RecurringBillsView } from '@/components/recurring-bills';

const RecurringBillsPage = () => {
  return (
    <>
      <PageHeader title="Recurring Bills" />
      <RecurringBillsView />
    </>
  );
};

export default RecurringBillsPage;
