// app/auth/login/layout.tsx
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
