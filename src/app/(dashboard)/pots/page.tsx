import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout';
import { PotsView } from '@/features/pots/components';

export const metadata: Metadata = {
  title: 'Pots',
  description:
    'Pots help you save smarter by separating money for what matters most.',
};

const PotsPage = () => {
  return (
    <>
      <PageHeader title="Pots" />
      <PotsView />
    </>
  );
};

export default PotsPage;
