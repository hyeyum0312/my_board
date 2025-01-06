import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export async function POST(req: Request) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  console.log('Refresh Token from Cookie:', refreshToken);
  console.log('REFRESH_TOKEN_SECRET:', REFRESH_TOKEN_SECRET);

  if (!refreshToken) {
    return NextResponse.json(
      { message: 'Refresh token not found' },
      { status: 401 },
    );
  }

  try {
    // 디코딩 및 검증 디버깅
    const parts = refreshToken.split('.');

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET!, {
      algorithms: ['HS256'], // 명시적으로 알고리즘 설정
    }) as jwt.JwtPayload;

    console.log('Decoded Refresh Token:', decoded);

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      ACCESS_TOKEN_SECRET!,
      { expiresIn: '15m' },
    );

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('JWT Verification Error:', err);

    if (err instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { message: 'Refresh token expired' },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: 'Invalid refresh token' },
      { status: 403 },
    );
  }
}
