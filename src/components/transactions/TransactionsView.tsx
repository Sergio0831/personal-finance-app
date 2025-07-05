'use client';

import { useGetAllTransactionsQuery } from '@/graphql/generated/output';

import { columns } from './Columns';
import TransactionsTable from './TransactionsTable';

const TransactionsView = () => {
  const { data, loading } = useGetAllTransactionsQuery();

  return (
    <TransactionsTable
      columns={columns}
      data={data?.transactions || []}
      isLoading={loading}
    />
  );
};

export default TransactionsView;
