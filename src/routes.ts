/**
 * An array of protected routes
 * These routes will redirect not logged in user to /   login page
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
  '/overview',
  '/transactions',
  '/budgets',
  '/pots',
  '/recurring-bills',
];

/**
 * An array of authentication routes
 * These routes will redirect logged in user to /overview page
 * @type {string[]}
 */
export const authRoutes: string[] = ['/login', '/register'];

/**
 * The prefix for API authentication routes
 * Prefix used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The prefix for GraphQL routes
 * Prefix used for API purposes
 * @type {string}
 */
export const apiPrefix: string = '/api/graphql';

/**
 * Default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/overview';
