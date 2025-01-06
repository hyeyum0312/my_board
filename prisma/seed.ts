import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash('securepassword', 10);

    // 회원 정보 추가
    const user = await prisma.user.create({
      data: {
        email: 'testuser@example.com',
        password: hashedPassword,
      },
    });

    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    // Prisma 연결 종료
    await prisma.$disconnect();
  }
}

main();

// npx tsx prisma/seed.ts
// npx prisma studio
