'use client';

import Image from 'next/image';

import { logout } from '@/features/auth/actions';

import { Button } from '@/components/ui/button';

import { useGetUserQuery } from '@/graphql/generated/output';

const User = () => {
	const { data, loading } = useGetUserQuery();

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>User Information</h1>
			<p>ID: {data?.user?.id}</p>
			<p>Name: {data?.user?.name}</p>
			<p>Email: {data?.user?.email}</p>
			{data?.user?.image ? (
				<Image
					src={data?.user?.image}
					width={60}
					height={60}
					className='rounded-full'
					alt='User Image'
				/>
			) : (
				<div>No image available</div>
			)}
			<Button onClick={logout}>Log Out</Button>
		</div>
	);
};

export default User;
