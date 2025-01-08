import * as Yup from 'yup';

export const email = Yup.string()
  .email('유효한 이메일 주소를 입력하세요.')
  .required('이메일을 입력하세요.');
export const password = Yup.string()
  .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
  .required('비밀번호를 입력하세요.');
