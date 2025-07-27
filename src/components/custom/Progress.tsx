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
  return (
    <Root
      className={cn(
        'relative flex h-2 w-full gap-[2px] overflow-hidden rounded-sm bg-background',
        className
      )}
      data-slot="progress"
      {...props}
    >
      {segments.map((segment) => (
        <Indicator
          className="h-full rounded-sm transition-all duration-500"
          data-slot={`progress-indicator-${segment.key}`}
          key={segment.key}
          style={{
            width: `${segment.value}%`,
            backgroundColor: segment.color || 'var(--accent)',
          }}
        />
      ))}
    </Root>
  );
};

Progress.displayName = 'Progress';

export default Progress;
