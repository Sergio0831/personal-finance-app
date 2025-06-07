'use client';

import { signOut } from 'next-auth/react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { useGetUserQuery } from '@/graphql/generated/output';

import { GeneratedAvatar } from './generated-avatar';

const User = () => {
	const { data, loading } = useGetUserQuery();

	if (loading || !data?.user) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>User Information</h1>
			<p>ID: {data?.user?.id}</p>
			<p>Name: {data?.user?.name}</p>
			<p>Email: {data?.user?.email}</p>
			{data.user.image ? (
				<Avatar>
					<AvatarImage src={data.user.image} alt='User Avatar' />
				</Avatar>
			) : (
				<GeneratedAvatar seed={data.user.name || 'user'} variant='initials' />
			)}
			<Button onClick={() => signOut()}>Log Out</Button>
		</div>
	);
};

export default User;
