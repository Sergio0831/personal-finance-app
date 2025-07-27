import type { ReactNode } from 'react';
import { cn } from '@/lib/clsx';
import { formatAmount } from '@/lib/format';

type PotProgressProps = {
  total: number;
  percentage: string;
  label: string;
  target: number;
  className?: string;
  children: ReactNode;
};

const PotProgress = ({
  total,
  percentage,
  label,
  target,
  className,
  children,
}: PotProgressProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <span className="text-muted text-preset-4">{label}</span>
        <span className="text-preset-1">{formatAmount(total)}</span>
      </div>
      {children}
      <div>
        <div className="flex items-center justify-between text-muted text-preset-5">
          <span className={cn('font-bold', className)}>{percentage}%</span>
          <span>Target of {formatAmount(target)}</span>
        </div>
      </div>
    </div>
  );
};

export default PotProgress;
