'use client';

import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

import apolloClient from '@/lib/clients/apollo-client';

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
