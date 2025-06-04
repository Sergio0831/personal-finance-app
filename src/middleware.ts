import { auth } from './auth';
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes
} from './routes';

export default auth(req => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isApiRoute) {
		// Allow access to API routes without authentication
		return undefined;
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return undefined;
	}

	if (!isLoggedIn && !isPublicRoutes) {
		return Response.redirect(new URL('/login', nextUrl));
	}

	return undefined;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)'
	]
};
