import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'default-access-key';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'default-refresh-key';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    // 사용자 검색
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 },
      );
    }

    // JWT 생성
    const access_token = jwt.sign({ email }, ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
    const refresh_token = jwt.sign({ email }, REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    // `refresh_token`을 쿠키에 저장
    const response = NextResponse.json({
      message: 'Login successful',
      access_token,
    });

    response.cookies.set('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7일
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during login:', error.message);
    } else {
      console.error('Error during login:', error);
    }
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: (error as Error).message || error,
      },
      { status: 500 },
    );
  }
}
