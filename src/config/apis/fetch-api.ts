import { ApiResult } from './types/api-result';

export const fetchAPI = async <T>(
  url: string,
  reqInit?: RequestInit,
  handleError?: (error: unknown) => ApiResult<T>,
): Promise<ApiResult<T>> => {
  try {
    if (process.env.MOCKING === 'true') {
      // MOCKING이 true일 때는 MSW에서 데이터를 반환하도록 처리
      console.log(`Mocking API: ${url}`);
      const res = await fetch(url, reqInit);
      const data = (await res.json()) as T;
      return {
        status: 'success',
        data,
      };
    }

    // MOCKING이 false일 때는 실제 백엔드 서버에서 데이터를 가져옵니다.
    const res = await fetch(url, reqInit);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = (await res.json()) as T;
    return {
      status: 'success',
      data,
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
