'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

import { useSession } from '@/lib/auth-client';
import { getInitials } from '@/lib/get-initials';

const UserAvatar = () => {
  const { data, isPending } = useSession();

  if (isPending || !data?.user) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  const user = data.user;

  return (
    <Avatar>
      <AvatarImage
        alt="User Avatar"
        src={user.image ? user.image : getInitials(user.name)}
      />
      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
