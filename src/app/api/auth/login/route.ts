import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  console.log('req', req);

  try {
    const { email, password } = await req.json();

    // 사용자 검색
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // JWT 생성
    const token = jwt.sign(
      { email },
      SECRET_KEY,
      { expiresIn: '1h' }, // 유효 기간 설정
    );

    // HttpOnly 쿠키 설정
    const response = NextResponse.json({ message: 'Login successful', token });
    // response.cookies.set('token', token, {
    //   httpOnly: true,
    //   secure: false,
    //   path: '/', // 모든 경로에서 쿠키 접근 가능
    //   maxAge: 60 * 60, // 1시간
    // });
    response.headers.set(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure: false; SameSite=Lax`,
    );

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
