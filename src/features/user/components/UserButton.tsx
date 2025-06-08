'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import UserAvatar from './UserAvatar';

const UserButton = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<Button size='sm' onClick={() => signOut()} asChild>
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserButton;
