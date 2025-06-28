'use client';

import { useSuspenseQuery } from '@apollo/client';

import '@/graphql/generated/output';
import {
	GetAllTransactionsDocument,
	GetAllTransactionsQuery
} from '@/graphql/generated/output';

import { columns } from './Columns';
import TransactionsTable from './TransactionsTable';

const TransactionsView = () => {
	const { data } = useSuspenseQuery<GetAllTransactionsQuery>(
		GetAllTransactionsDocument
	);

	// if (loading || !data?.transactions) {
	// 	return <div>Loading...</div>;
	// }

	return <TransactionsTable columns={columns} data={data.transactions} />;
};

export default TransactionsView;
