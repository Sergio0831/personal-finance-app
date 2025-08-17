import { PageHeader } from '@/components/layout';
import { OverviewMain } from '@/features/overview/components';

const OverviewPage = () => {
  return (
    <>
      <PageHeader title="Overview" />
      <OverviewMain />
    </>
  );
};

export default OverviewPage;
