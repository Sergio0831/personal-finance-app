import { createYoga } from 'graphql-yoga';

import { createContext } from '@/gql/context';
import { schema } from '@/gql/schema';

interface NextContext {
	params: Promise<Record<string, string>>;
}

const { handleRequest } = createYoga<NextContext>({
	schema,
	context: createContext,
	// While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
	graphqlEndpoint: '/api/graphql',

	// Yoga needs to know how to create a valid Next response
	fetchAPI: { Response }
});

export {
	handleRequest as GET,
	handleRequest as POST,
	handleRequest as OPTIONS
};
