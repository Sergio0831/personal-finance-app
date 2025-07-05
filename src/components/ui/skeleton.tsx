import { cn } from '@/lib/clsx';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-grey-300', className)}
      {...props}
    />
  );
}

export { Skeleton };
