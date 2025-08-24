import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout';
import { BudgetsView } from '@/features/budgets/components';

export const metadata: Metadata = {
  title: 'Budgets',
  description:
    'Create budgets for categories that matter most and monitor your spending.',
};

const BudgetsPage = () => {
  return (
    <>
      <PageHeader title="Budgets" />
      <BudgetsView />
    </>
  );
};

export default BudgetsPage;
