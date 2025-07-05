export const SERVER_URL =
  typeof window === 'undefined'
    ? `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000'}/api/graphql`
    : '/api/graphql';
