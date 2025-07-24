import { PageHeader } from '@/components/layout';
import { PotsView } from '@/features/pots/components';

const PotsPage = () => {
  return (
    <>
      <PageHeader title="Pots" />
      <PotsView />
    </>
  );
};

export default PotsPage;
