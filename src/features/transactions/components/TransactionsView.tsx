'use client';

import { toast } from 'sonner';
import { useGetAllTransactionsQuery } from '@/graphql/generated/output';
import { columns } from './Columns';
import TransactionsTable from './TransactionsTable';

const TransactionsView = () => {
  const { data, loading, error } = useGetAllTransactionsQuery();

  if (error) {
    return toast.error('Unable to load transactions.');
  }

  return (
    <main>
      <TransactionsTable
        columns={columns}
        data={data?.transactions || []}
        isLoading={loading}
      />
    </main>
  );
};

export default TransactionsView;
