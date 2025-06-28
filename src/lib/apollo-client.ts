// apollo-client.ts
import { HttpLink } from '@apollo/client';
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient
} from '@apollo/client-integration-nextjs';

import { SERVER_URL } from './get-server-url';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: SERVER_URL,

			fetchOptions: {
				credentials: 'include'
			}
		})
	});
});
