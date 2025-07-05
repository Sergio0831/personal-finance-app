'use client';

import { botttsNeutral, initials } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { cn } from '@/lib/clsx';

type GeneratedAvatarProps = {
  className?: string;
  seed?: string;
  variant?: 'botttsNeutral' | 'initials';
};

const GeneratedAvatar = ({
  className,
  seed,
  variant,
}: GeneratedAvatarProps) => {
  let avatar: ReturnType<typeof createAvatar>;

  if (variant === 'botttsNeutral') {
    avatar = createAvatar(botttsNeutral, {
      seed,
    });
  } else {
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 42,
    });
  }

  return (
    <Avatar className={cn('h-10 w-10', className)}>
      <AvatarImage alt="Generated Avatar" src={avatar.toDataUri()} />
      <AvatarFallback>{seed?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default GeneratedAvatar;
