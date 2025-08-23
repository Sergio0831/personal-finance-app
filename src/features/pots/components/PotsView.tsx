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
    return (
      <EmptyState
        description="There was a problem fetching your pots. Please try again later."
        error
        title="Error Loading Pots"
      />
    );
  }

  if (!data?.pots.length) {
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
