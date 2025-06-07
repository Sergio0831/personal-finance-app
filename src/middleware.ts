import { NextResponse } from 'next/server';

import { auth } from './auth';
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	apiPrefix,
	authRoutes,
	publicRoutes
} from './routes';

export default auth(req => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
	const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isApiAuthRoute) {
		return undefined;
	}

	if (isApiRoute) {
		return undefined;
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return undefined;
	}

	if (!isLoggedIn && !isPublicRoutes) {
		return NextResponse.redirect(new URL('/login', nextUrl));
	}

	return undefined;
});

export const config = {
	matcher: [
		// Skip Next.js internals, static files, and NextAuth routes
		'/((?!_next|api/auth|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
	]
};
