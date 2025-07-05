import { PageHeader } from '@/components/layout';
import { TransactionsView } from '@/components/transactions';

const TransactionsPage = () => {
  return (
    <>
      <PageHeader title="Transactions" />
      <TransactionsView />
    </>
  );
};

export default TransactionsPage;
