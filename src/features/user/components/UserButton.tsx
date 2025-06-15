'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import apolloClient from '@/lib/apollo-client';
import { signOut } from '@/lib/auth-client';

import UserAvatar from './UserAvatar';

const UserButton = () => {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onSuccess: () => {
					toast.success('You have logged out. See you soon!');
					router.push('/login');
					apolloClient.clearStore();
				},
				onError: () => {}
			}
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='p-0'>
				<Button
					size='sm'
					variant='destructive'
					onClick={handleSignOut}
					disabled={isPending}
					aria-label='Sign out'
					asChild
				>
					<DropdownMenuItem className='text-destructive-foreground text-sm'>
						Logout
					</DropdownMenuItem>
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserButton;
