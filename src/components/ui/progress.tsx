'use client';

import { Indicator, Root } from '@radix-ui/react-progress';
import type React from 'react';
import { cn } from '@/lib/clsx';

function Progress({
  className,
  value,
  color,
  ...props
}: React.ComponentProps<typeof Root> & { color?: string }) {
  return (
    <Root
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-sm bg-background',
        className
      )}
      data-slot="progress"
      {...props}
    >
      <Indicator
        className="h-full w-full flex-1 transition-all"
        data-slot="progress-indicator"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: color || 'var(--accent)',
        }}
      />
    </Root>
  );
}

export { Progress };
