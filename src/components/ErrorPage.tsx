// components/ErrorFallback.tsx
import React from 'react';

interface ErrorFallbackProps {
  title?: string; // 기본 제목
  message?: string; // 기본 메시지
  buttonText?: string; // 버튼 텍스트
  buttonLink?: string; // 버튼 링크 (기본값은 홈으로 설정)
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title = '문제가 발생했습니다!',
  message = '죄송합니다. 페이지를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  buttonText = '홈으로 돌아가기',
  buttonLink = '/',
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
      <a href={buttonLink}>
        <button>{buttonText}</button>
      </a>
    </div>
  );
};

export default ErrorFallback;
