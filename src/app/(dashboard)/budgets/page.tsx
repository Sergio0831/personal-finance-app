import { PageHeader } from '@/components/layout';
import { BudgetsView } from '@/features/budgets/components';

const BudgetsPage = () => {
  return (
    <>
      <PageHeader title="Budgets" />
      <BudgetsView />
    </>
  );
};

export default BudgetsPage;
