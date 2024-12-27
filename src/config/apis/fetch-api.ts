import { ApiResult } from './types/api-result';

/**
 * Backend API를 호출하는 함수
 * fetch결과 값을 ApiResult로 변환하여 반환
 */
export const fetchAPI = async <T>(
  url: string,
  reqInit?: RequestInit,
  handleError?: (error: unknown) => ApiResult<T>,
): Promise<ApiResult<T>> => {
  try {
    const res = await fetch(url, reqInit);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = (await res.json()) as T;
    return {
      data: data,
      status: 'success',
    };
  } catch (error: unknown) {
    console.error(error);
    if (handleError) {
      return handleError(error);
    }
    return {
      status: 'error',
      data: null as unknown as T,
      message: '서버 에러가 발생했습니다. 다시 시도해주세요.',
    };
  }
};
