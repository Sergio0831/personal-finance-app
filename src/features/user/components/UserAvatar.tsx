'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

import { useGetUserQuery } from '@/graphql/generated/output';

import GeneratedAvatar from './GeneratedAvatar';

const UserAvatar = () => {
	const { data, loading } = useGetUserQuery();

	const user = data?.user;

	if (loading || !user) {
		return <Skeleton className='h-10 w-10 rounded-full' />;
	}

	return user.image ? (
		<Avatar>
			<AvatarImage src={user.image} alt='User Avatar' />
		</Avatar>
	) : (
		<GeneratedAvatar seed={user.name || 'user'} variant='initials' />
	);
};

export default UserAvatar;
