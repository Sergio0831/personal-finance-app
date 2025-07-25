'use client';

import { Fallback, Image, Root } from '@radix-ui/react-avatar';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/clsx';

function Avatar({ className, ...props }: ComponentProps<typeof Root>) {
  return (
    <Root
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: ComponentProps<typeof Image>) {
  return (
    <Image
      className={cn('aspect-square size-full', className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: ComponentProps<typeof Fallback>) {
  return (
    <Fallback
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-accent text-white',
        className
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
