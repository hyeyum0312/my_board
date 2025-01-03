'use client';

import React, { useState } from 'react';
import Input from '../../atom/Input';
import Button from '../../atom/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('폼 제출 데이터:', formData);

    if (!formData.username || !formData.password) {
      console.log('error: Email and password are required');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            아이디
          </label>
          <Input
            type="text"
            id="username"
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
