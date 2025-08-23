'use client';

import { EmptyState } from '@/components/custom';
import { useGetAllTransactionsQuery } from '@/graphql/generated/output';
import { columns } from './Columns';
import TransactionsSkeleton from './TransactionsSkeleton';
import TransactionsTable from './TransactionsTable';

const TransactionsView = () => {
  const { data, loading, error } = useGetAllTransactionsQuery();

  if (loading) {
    return <TransactionsSkeleton />;
  }

  if (error) {
    <EmptyState
      description="There was a problem fetching your transactions. Please try again later."
      error={true}
      title="Error Loading Transactions"
    />;
  }

  if (!data || data?.transactions.length === 0) {
    return (
      <EmptyState
        description="Your transactions will appear here once you create them."
        title="No Transactions Yet"
      />
    );
  }

  const transactions = data.transactions;

  return (
    <main>
      <TransactionsTable columns={columns} data={transactions || []} />
    </main>
  );
};

export default TransactionsView;
