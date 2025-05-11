'use client';

import { useGetUserQuery } from '@/generated/graphql/graphql-types';

import Image from 'next/image';

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
      <Image
        src={data?.user?.image || ''}
        width={60}
        height={60}
        className="rounded-full"
        alt="User Image"
      />
    </div>
  );
};

export default User;
