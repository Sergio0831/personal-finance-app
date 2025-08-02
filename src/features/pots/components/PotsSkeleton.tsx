'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PotsSkeleton = () => {
  return (
    <main className="grid @3xl:grid-cols-2 gap-6">
      {['1', '2', '3', '4'].map((id) => (
        <Card className="flex flex-col gap-y-8" key={id}>
          <Skeleton className="h-8 bg-muted/20" />
          <Skeleton className="h-24 bg-muted/20" />
          <Skeleton className="h-[3.25rem] bg-muted/20" />
        </Card>
      ))}
    </main>
  );
};

export default PotsSkeleton;
