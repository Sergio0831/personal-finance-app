import { createYoga } from 'graphql-yoga';

import { createContext } from '@/graphql/context';
import { schema } from '@/graphql/schema';

const { handleRequest } = createYoga({
  schema,
  context: createContext,
  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',

  graphiql: process.env.NODE_ENV === 'development',

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export const GET = (req: Request) => handleRequest(req, {});
export const POST = (req: Request) => handleRequest(req, {});
export const OPTIONS = (req: Request) => handleRequest(req, {});
