// app/auth/login/layout.tsx
'use client';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div>
      <h1>로그인/회원가입 페이지 레이아웃</h1>
      <div>{children}</div>
    </div>
  );
}
