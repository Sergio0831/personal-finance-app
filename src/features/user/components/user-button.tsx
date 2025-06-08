'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import UserAvatar from './user-avatar';

const UserButton = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<Button onClick={() => signOut()}>
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserButton;
