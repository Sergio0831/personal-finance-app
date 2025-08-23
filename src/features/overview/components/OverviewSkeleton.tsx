import { Skeleton } from '@/components/ui/skeleton';

const OverviewSkeleton = () => {
  return (
    <main className="grid h-dvh @min-3xl:grid-cols-12 grid-rows-[min-content_1fr] gap-6">
      <div className="col-span-12 grid @min-2xl:grid-flow-col gap-6">
        {['1', '2', '3'].map((i) => (
          <Skeleton className="h-30 bg-muted/60" key={i} />
        ))}
      </div>
      <div className="@min-3xl:col-span-7 col-span-12 grid h-full gap-6">
        {['1', '2'].map((i) => (
          <Skeleton className="col-span-12 h-full bg-muted/60" key={i} />
        ))}
      </div>
      <div className="@min-3xl:col-span-5 col-span-12 grid h-full gap-6">
        {['1', '2'].map((i) => (
          <Skeleton className="col-span-12 h-full bg-muted/60" key={i} />
        ))}
      </div>
    </main>
  );
};

export default OverviewSkeleton;
