import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('Middleware is running');
  console.log('Requested Path:', req.nextUrl.pathname); // 요청 경로 확인
  console.log('Cookies:', req.cookies); // 모든 쿠키 출력

  const response = NextResponse.next();
  response.headers.set('X-Middleware-Debug', 'Active');

  const debugUrl = new URL(req.url);
  debugUrl.searchParams.set('debug', 'already-logged-in');

  const token = req.cookies.get('token')?.value;
  console.log('Token:', token);

  if (req.nextUrl.pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 로그인하지 않은 사용자 차단
  if (req.nextUrl.pathname.startsWith('/board') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 대시보드 보호
  if (req.nextUrl.pathname.startsWith('/') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ['/', '/board/:path*', '/auth/login'],
// };
export const config = {
  matcher: ['/'],
};
