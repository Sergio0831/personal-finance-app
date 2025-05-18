import { auth } from '@/features/auth/auth';

export default auth(() => {});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
	]
};

// import NextAuth from 'next-auth';
// import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/lib/routes';
// import { authConfig } from './auth.config';
// export const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiRoute) {
//     return undefined;
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return undefined;
//   }

//   if (!isLoggedIn && !isPublicRoutes) {
//     return Response.redirect(new URL('/signin', nextUrl));
//   }

//   return undefined;
// });

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };
