import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout';
import { TransactionsView } from '@/features/transactions/components';

export const metadata: Metadata = {
  title: 'Transactions',
  description:
    'Stay on top of your spending with a detailed transaction history.',
};

const TransactionsPage = () => {
  return (
    <>
      <PageHeader title="Transactions" />
      <TransactionsView />
    </>
  );
};

export default TransactionsPage;
