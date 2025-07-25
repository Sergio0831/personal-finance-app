import { createYoga } from 'graphql-yoga';

import { createContext } from '@/graphql/context';
import { schema } from '@/graphql/schema';

interface NextContext {
  params: Record<string, string>;
}
const { handleRequest } = createYoga<NextContext>({
  schema,
  context: createContext,
  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',

  graphiql: process.env.NODE_ENV === 'development',

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
