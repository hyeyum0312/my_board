import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export function middleware(req: NextRequest) {
  const refresh_token = req.cookies.get('refresh_token')?.value;
  console.log('Token:', refresh_token);

  if (refresh_token) {
    try {
      // 리프레시 토큰 검증
      jwt.verify(refresh_token, REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.log('Refresh token error:', err);

      // 토큰이 만료되었거나 유효하지 않은 경우 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/login') && refresh_token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/board') && !refresh_token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (
    req.nextUrl.pathname.startsWith('/') &&
    !refresh_token &&
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
