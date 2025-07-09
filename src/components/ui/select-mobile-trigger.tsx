import { Icon, Trigger } from '@radix-ui/react-select';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/clsx';

const SelectMobileTrigger = ({
  className,
  children,
  ...props
}: ComponentProps<typeof Trigger>) => {
  return (
    <Trigger
      className={cn(
        'relative cursor-pointer outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/60',
        className
      )}
      {...props}
    >
      <Icon asChild>{children}</Icon>
    </Trigger>
  );
};

export default SelectMobileTrigger;
