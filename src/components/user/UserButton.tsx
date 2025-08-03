'use client';

import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { signOut } from '@/lib/auth-client';

import UserAvatar from './UserAvatar';

const UserButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const client = useApolloClient();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onSuccess: async () => {
          await client.clearStore();
          toast.success('You have logged out. See you soon!');

          router.push('/login');
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <DropdownMenuItem
          aria-label="Sign out"
          className="text-destructive-foreground text-sm"
          disabled={isPending}
          onClick={handleSignOut}
          variant="destructive"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
