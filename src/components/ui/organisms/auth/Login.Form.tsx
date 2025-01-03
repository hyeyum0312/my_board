'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../../atom/Input';
import Button from '../../atom/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter(); // Next.js의 useRouter 훅

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // 에러 초기화

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 쿠키 포함
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
        return;
      }

      setSuccess(result.message);
      // 로그인 성공 시 홈 화면으로 이동
      router.push('/');
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            이메일
          </label>
          <Input
            type="text"
            id="email"
            placeholder="이메일을 입력하세요"
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

        <div className="flex items-center justify-between">
          <Button type="submit">로그인</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
