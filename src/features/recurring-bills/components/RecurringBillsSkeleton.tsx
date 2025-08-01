import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const RecurringBillsSkeleton = () => {
  return (
    <main className="flex @max-3xl:flex-col gap-6">
      {/* Left panel */}
      <div className="flex basis-2/5 gap-4 max-sm:flex-col md:flex-col">
        {/* Total Bills Card */}
        <div className="w-full rounded-xl bg-muted/20 p-6 max-sm:flex max-sm:items-center max-sm:gap-x-5">
          <Skeleton className="h-10 w-10 rounded-full bg-gray-300 sm:mb-8" />
          <div>
            <Skeleton className="mb-3 h-4 bg-gray-300" />
            <Skeleton className="h-10 bg-gray-300" />
          </div>
        </div>
        {/* Summary Card */}
        <div className="w-full rounded-xl bg-muted/20 p-6 ">
          <Skeleton className="mb-4 h-5 w-1/4 bg-gray-300" />
          <ul className="grid gap-y-4">
            {[1, 2, 3].map((i) => (
              <li
                className="flex items-center justify-between border-gray-100 border-t pt-4"
                key={i}
              >
                <Skeleton className="h-4 w-1/3 bg-gray-300" />
                <Skeleton className="h-4 w-1/4 bg-gray-300" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Table skeleton */}
      <Card className="w-full">
        <div className="w-full space-y-3">
          {['1', '2', '3', '4', '5', '6', '7', '8'].map((id) => (
            <div
              className="flex h-20 items-center justify-between rounded-md bg-muted/20 px-4 py-3"
              key={`skeleton-row-${id}`}
            >
              <Skeleton className="h-10 w-1/3 bg-gray-300" />
              <Skeleton className="h-10 w-1/5 bg-gray-300" />
              <Skeleton className="h-10 w-1/6 bg-gray-300" />
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
};

export default RecurringBillsSkeleton;
