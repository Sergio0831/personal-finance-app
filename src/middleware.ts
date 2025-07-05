import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

import { authRoutes, DEFAULT_LOGIN_REDIRECT, protectedRoutes } from './routes';

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = getSessionCookie(req);

  const res = NextResponse.next();

  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isOnAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (!isLoggedIn && isOnProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isLoggedIn && isOnAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
