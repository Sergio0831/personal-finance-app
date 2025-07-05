'use client';

import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
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
        <Button
          aria-label="Sign out"
          asChild
          disabled={isPending}
          onClick={handleSignOut}
          size="sm"
          variant="destructive"
        >
          <DropdownMenuItem className="text-destructive-foreground text-sm">
            Logout
          </DropdownMenuItem>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
