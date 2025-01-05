import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (token) {
    redirect('/'); // 토큰이 있으면 대시보드로 리다이렉트
  }

  return <div>{children}</div>;
}
