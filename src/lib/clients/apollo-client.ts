import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
	uri: '/api/graphql',
	cache: new InMemoryCache(),
	credentials: 'include'
});

export default apolloClient;
