import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('Requested Path:', req.nextUrl.pathname); // 요청 경로 확인
  console.log('Cookies:', req.cookies); // 모든 쿠키 출력

  const token = req.cookies.get('token')?.value;
  console.log('Token:', token);

  // 로그인하지 않은 사용자 차단
  if (req.nextUrl.pathname.startsWith('/board') && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // 로그인 했을 경우 홈화면으로 이동
  if (req.nextUrl.pathname.startsWith('/auth/login') && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 대시보드 보호
  if (req.nextUrl.pathname.startsWith('/') && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/board/:path*', '/auth/login'], // 보호할 경로
};
