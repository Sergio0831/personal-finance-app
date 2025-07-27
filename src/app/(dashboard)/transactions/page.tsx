import { PageHeader } from '@/components/layout';
import { TransactionsView } from '@/features/transactions/components';

const TransactionsPage = () => {
  return (
    <>
      <PageHeader title="Transactions" />
      <TransactionsView />
    </>
  );
};

export default TransactionsPage;
