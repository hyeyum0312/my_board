'use client';

import React from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../../stores/authStore';
import { loginSchema } from '@/app/(auth)/validations/loginSchema';
import Button from '../../atom/Button';
import { loginUser } from '@/lib/api/login';
import { FormikField } from '../../molecule/FormikField';

export const LoginForm = () => {
  const router = useRouter();
  const { setLoggedIn, setAccessToken } = useAuthStore();

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting, setFieldError }: any,
  ) => {
    setSubmitting(true);

    const { ok, data, error } = await loginUser(values);

    if (ok && data) {
      setLoggedIn(true);
      setAccessToken(data.access_token);
      router.push('/');
    } else {
      setFieldError('email', error || '아이디 또는 비밀번호를 확인하세요.');
      setLoggedIn(false);
    }

    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="w-full max-w-sm p-6 bg-white ">
              {/* 이메일 필드 */}
              <FormikField
                name="email"
                type="text"
                placeholder="아이디를 입력하세요"
                label="아이디"
              />

              {/* 비밀번호 필드 */}
              <FormikField
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                label="비밀번호"
              />

              {/* 로그인 버튼 */}
              <div className="flex items-center justify-between mt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      로그인 중...
                    </span>
                  ) : (
                    '로그인'
                  )}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
