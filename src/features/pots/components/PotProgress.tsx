import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/clsx';
import { formatAmount } from '@/lib/format';

type PotProgressProps = {
  total: number;
  theme: string;
  progress: number;
  percentage: string;
  label: string;
  target: number;
  className: string;
};

const PotProgress = ({
  total,
  theme,
  progress,
  percentage,
  label,
  target,
  className,
}: PotProgressProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <span className="text-muted text-preset-4">{label}</span>
        <span className="text-preset-1">{formatAmount(total)}</span>
      </div>
      <Progress color={theme} value={progress} />
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
