'use client';

import React, { useState } from 'react';
import Input from '../../atom/Input';
import Button from '../../atom/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6글자 이상이어야 합니다.');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 쿠키를 포함
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
        return;
      }

      setSuccess(result.message);
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

        <div className="flex items-center justify-between">
          <Button type="submit">로그인</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
