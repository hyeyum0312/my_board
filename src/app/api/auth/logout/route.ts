import { NextResponse } from 'next/server';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export async function POST() {
  if (!REFRESH_TOKEN_SECRET) {
    return NextResponse.json(
      { error: 'Environment variable REFRESH_TOKEN_SECRET is not defined' },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.set('refresh_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: new Date(0), // 쿠키 만료
  });

  return response;
}
