import { Skeleton } from '../ui/skeleton';

const TransactionTableSkeleton = () => {
  return (
    <div className="w-full space-y-3">
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((id) => (
        <div
          className="flex h-20 items-center justify-between rounded-md bg-muted/20 px-4 py-3"
          key={`skeleton-row-${id}`}
        >
          <Skeleton className="h-10 w-1/3 bg-grey-300" />
          <Skeleton className="h-10 w-1/5 bg-grey-300" />
          <Skeleton className="h-10 w-1/6 bg-grey-300" />
          <Skeleton className="h-10 w-1/6 bg-grey-300" />
        </div>
      ))}
    </div>
  );
};

export default TransactionTableSkeleton;
