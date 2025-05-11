'use client';

import apolloClient from '@/lib/clients/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
