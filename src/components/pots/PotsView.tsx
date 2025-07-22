'use client';

import { useGetAllPotsQuery } from '@/graphql/generated/output';
import Pot from './Pot';
import PotsSkeleton from './PotsSkeleton';

const PotsView = () => {
  const { data, loading } = useGetAllPotsQuery();

  const pots = data?.pots;

  if (loading) {
    return <PotsSkeleton />;
  }

  return (
    <main className="grid @3xl:grid-cols-2 gap-6">
      {pots?.map((pot) => (
        <Pot key={pot.id} {...pot} />
      ))}
    </main>
  );
};

export default PotsView;
