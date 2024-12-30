// src/app/(auth)/_hooks/useLoginHook.ts
import { useState } from 'react';

export function useLoginForm(
  onSubmit: (username: string, password: string) => void,
) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // 기존 에러 초기화
    if (!username || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    onSubmit(username, password);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    setError,
    handleSubmit,
  };
}
