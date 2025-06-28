import TransactionsView from '@/components/features/transactions/components/TransactionsView';
import { PageHeader } from '@/components/layout';

const TransactionsPage = async () => {
	return (
		<>
			<PageHeader title='Transactions' />
			<TransactionsView />
		</>
	);
};

export default TransactionsPage;
