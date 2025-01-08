import { LoginForm } from '@/components/ui/organisms/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">로그인</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          아이디와 비밀번호를 입력해주세요.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
