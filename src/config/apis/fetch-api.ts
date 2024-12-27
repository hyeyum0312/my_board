import { ApiResult } from './types/api-result';

export const fetchAPI = async <T>(
  url: string,
  reqInit?: RequestInit,
  handleError?: (error: unknown) => ApiResult<T>,
): Promise<ApiResult<T>> => {
  try {
    // Correct the base URL when MOCKING is enabled
    const requestUrl =
      process.env.MOCKING === 'true'
        ? `http://localhost:3000${url}` // Assuming local development server is running on port 3000
        : url;

    const res = await fetch(requestUrl, reqInit);

    // Check if the response is not HTML (status 200) and parse it as JSON
    if (
      res.ok &&
      res.headers.get('Content-Type')?.includes('application/json')
    ) {
      const data = await res.json();
      return {
        status: 'success',
        data,
      };
    } else {
      // Handle non-JSON responses (e.g., HTML error pages)
      const text = await res.text();
      console.error('Error response:', text);
      throw new Error('Received non-JSON response');
    }
  } catch (error) {
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
