import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('Middleware is running');
  console.log('Requested Path:', req.nextUrl.pathname);
  console.log('Cookies:', req.cookies);

  const token = req.cookies.get('token')?.value;
  console.log('Token:', token);

  if (req.nextUrl.pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/board') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (
    req.nextUrl.pathname.startsWith('/') &&
    !token &&
    req.nextUrl.pathname !== '/login'
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const response = NextResponse.next();
  response.headers.set('X-Middleware-Debug', 'Middleware is active');
  return response;
}

export const config = {
  matcher: ['/', '/board/:path*', '/auth/login'],
};
