'use client';

import { LoginDialog } from '@/components/ui/organisms/auth/Login.Form';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginDialog />
    </div>
  );
}
