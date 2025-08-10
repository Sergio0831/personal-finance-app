import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const BudgetsSkeleton = () => {
  return (
    <main className="grid @min-3xl:grid-cols-12 gap-6">
      <Card className="@min-3xl:col-span-5 self-start">
        <div className="flex h-70 w-full items-center justify-center">
          <Skeleton className="h-60 w-60 rounded-full border-[2.5rem] border-muted/20" />
        </div>
        <CardContent>
          <Skeleton className="mb-6 h-8 bg-muted/20" />
          <div className="grid gap-y-4">
            {['1', '2', '3', '4', '5'].map((id) => (
              <Skeleton className="h-8 bg-muted/20" key={id} />
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="@min-3xl:col-span-7 grid gap-6">
        {['1', '2'].map((id) => (
          <Card className="grid gap-y-5" key={id}>
            <Skeleton className="h-6 bg-muted/20" />
            <Skeleton className="h-32 bg-muted/20" />
            <Skeleton className="h-62 bg-muted/20" />
          </Card>
        ))}
      </div>
    </main>
  );
};

export default BudgetsSkeleton;
