'use client';

import { EmptyState } from '@/components/custom';
import { useGetAllPotsQuery } from '@/graphql/generated/output';
import Pot from './Pot';
import PotsSkeleton from './PotsSkeleton';

const PotsView = () => {
  const { data, loading, error } = useGetAllPotsQuery();

  if (loading) {
    return <PotsSkeleton />;
  }

  if (error) {
    <EmptyState
      description="There was a problem fetching your pots. Please try again later."
      error={true}
      title="Error Loading Pots"
    />;
  }

  if (!data || data?.pots.length === 0) {
    return (
      <EmptyState
        description="Your pots will appear here once you create them."
        title="No Pots Yet"
      />
    );
  }

  const pots = data.pots;

  return (
    <main className="grid @3xl:grid-cols-2 gap-6">
      {pots?.map((pot) => (
        <Pot key={pot.id} {...pot} />
      ))}
    </main>
  );
};

export default PotsView;
