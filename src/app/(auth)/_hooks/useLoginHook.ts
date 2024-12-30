import { useState } from 'react';
import { UseLoginFormReturn } from '../_types/login';

export function useLoginForm(
  onSubmit: (username: string, password: string) => void,
): UseLoginFormReturn {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    setError('');
    onSubmit(username, password); // 상위 컴포넌트 또는 API 호출 로직 실행
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit,
  };
}
