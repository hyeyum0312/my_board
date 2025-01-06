import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

console.log('웨안돼');

export function middleware(request: NextRequest) {
  console.log('Middleware executed for:', request.nextUrl.pathname);

  const refreshToken = request.cookies.get('refresh_token');

  console.log('refreshToken', refreshToken);

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/board', '/board/[id]'],
};
