'use client';

import React, { useState } from 'react';
import Input from '../../atom/Input';
import Button from '../../atom/Button';
import { loginUser } from '@/lib/api/login';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../../stores/authStore';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { setLoggedIn, setAccessToken } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setError(null); // 에러 상태 초기화
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ok, data, error } = await loginUser(formData);

    if (ok && data) {
      setLoggedIn(true);
      setAccessToken(data.access_token);
      router.push('/');
    } else {
      setError(error || '로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
      setLoggedIn(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            아이디
          </label>
          <Input
            type="text"
            id="email"
            placeholder="아이디를 입력하세요"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            비밀번호
          </label>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <Button type="submit">로그인</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
