import React from 'react';
import './LoginDialog.scss';
import Input from '../../atom/Input';
import Button from '../../atom/Button';
import { useLoginForm } from '@/app/(auth)/_hooks/useLoginHook';

export const LoginDialog: React.FC = () => {
  const { username, setUsername, password, setPassword, error, handleSubmit } =
    useLoginForm((username: string, password: string) => {
      console.log('Form submitted:', { username, password });
    });

  return (
    <div className="login-dialog">
      <h2 className="login-dialog__title">Login</h2>
      <div></div>
      <form className="login-dialog__form" onSubmit={handleSubmit}>
        {error && <div className="login-dialog__error">{error}</div>}
        <Input
          size="medium"
          type="text"
          state="default"
          placeholder="아이디를 입력하세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          size="medium"
          type="password"
          state="default"
          placeholder="패스워드를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button color="primary" size="medium" type="submit">
          Login
        </Button>
      </form>
      <div className="login-dialog__auth">
        <Button color="link" href="/password">
          비밀번호 재설정
        </Button>
        <Button color="link" href="/signup">
          회원가입
        </Button>
      </div>
    </div>
  );
};
