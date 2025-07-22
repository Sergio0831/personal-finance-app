'use client';

import { useGetAllTransactionsQuery } from '@/graphql/generated/output';

import { columns } from './Columns';
import TransactionsTable from './TransactionsTable';

const TransactionsView = () => {
  const { data, loading } = useGetAllTransactionsQuery();

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
