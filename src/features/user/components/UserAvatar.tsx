'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

import { useSession } from '@/lib/auth-client';

import GeneratedAvatar from './GeneratedAvatar';

const UserAvatar = () => {
	const { data, isPending } = useSession();

	if (isPending || !data?.user) {
		return <Skeleton className='h-10 w-10 rounded-full' />;
	}

	const user = data.user;

	return user.image ? (
		<Avatar>
			<AvatarImage src={user.image} alt='User Avatar' />
		</Avatar>
	) : (
		<GeneratedAvatar seed={user.name || 'user'} variant='initials' />
	);
};

export default UserAvatar;
