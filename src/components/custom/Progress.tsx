import { Indicator, Root } from '@radix-ui/react-progress';
import type React from 'react';
import { cn } from '@/lib/clsx';

type ProgressSegment = {
  value: number;
  color?: string;
  key: number;
};

type ProgressProps = React.ComponentProps<typeof Root> & {
  segments: ProgressSegment[];
};

const Progress = ({ className, segments, ...props }: ProgressProps) => {
  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <Root
      className={cn(
        'relative flex h-2 w-full overflow-hidden rounded-sm bg-background',
        className
      )}
      data-slot="progress"
      {...props}
    >
      {segments.map((segment) => (
        <Indicator
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={totalValue}
          className="h-full rounded-sm transition-all duration-500"
          data-slot={`progress-indicator-${segment.key}`}
          key={segment.key}
          role="progressbar"
          style={{
            flex: `${segment.value}% 0 0`,
            backgroundColor: segment.color || 'var(--accent)',
          }}
        />
      ))}
    </Root>
  );
};

Progress.displayName = 'Progress';

export default Progress;
