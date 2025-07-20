'use client';

import {
  Content,
  Group,
  Icon,
  Item,
  ItemText,
  Portal,
  Root,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';
import type React from 'react';
import { CaretDown } from '@/assets/icons';
import { cn } from '@/lib/clsx';

function Select({ ...props }: React.ComponentProps<typeof Root>) {
  return <Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof Group>) {
  return <Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof Value>) {
  return <Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof Trigger> & {
  size?: 'sm' | 'default' | 'lg';
}) {
  return (
    <Trigger
      className={cn(
        "group flex w-fit cursor-pointer items-center justify-between gap-4 whitespace-nowrap rounded-md border border-input bg-transparent px-5 py-2 text-sm outline-none transition-[color,box-shadow] hover:border-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[size=default]:h-9 data-[size=lg]:h-11 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-size={size}
      data-slot="select-trigger"
      {...props}
    >
      {children}
      <Icon asChild>
        <CaretDown className="size-3 transition-transform group-data-[state=open]:rotate-180 group-data-[state=closed]:animate-out group-data-[state=open]:animate-in" />
      </Icon>
    </Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[7rem] origin-(--radix-select-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md bg-card px-5 py-3 text-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in',
          position === 'popper' &&
            'data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1',
          className
        )}
        data-slot="select-content"
        position={position}
        {...props}
      >
        <Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
          )}
        >
          {children}
        </Viewport>
      </Content>
    </Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Item>) {
  return (
    <Item
      className={cn(
        'relative mb-3 w-full cursor-pointer select-none border-grey-100 border-b pb-3 text-sm outline-hidden transition-transform last:mb-0 last:border-0 hover:font-bold focus-visible:font-bold data-[disabled]:pointer-events-none data-[state=checked]:font-bold data-[disabled]:opacity-50',
        className
      )}
      data-slot="select-item"
      {...props}
    >
      <ItemText>{children}</ItemText>
    </Item>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
};
