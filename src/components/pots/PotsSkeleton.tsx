'use client';

import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const PotsSkeleton = () => {
  return (
    <main className="grid gap-6 md:grid-cols-2">
      {['1', '2', '3', '4'].map((id) => (
        <Card className="flex flex-col gap-y-8" key={id}>
          <Skeleton className="h-8" />
          <Skeleton className="h-24" />
          <Skeleton className="h-13" />
        </Card>
      ))}
    </main>
  );
};

export default PotsSkeleton;
