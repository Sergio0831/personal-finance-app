'use client';

import { useGetAllTransactionsQuery } from '@/graphql/generated/output';

import { columns } from './Columns';
import TransactionsTable from './TransactionsTable';

const TransactionsView = () => {
	const { data, loading } = useGetAllTransactionsQuery();
	if (loading || !data?.transactions) {
		return <div>Loading...</div>;
	}
	return <TransactionsTable columns={columns} data={data.transactions} />;
};

export default TransactionsView;
