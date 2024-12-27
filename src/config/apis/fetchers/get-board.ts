'use server';

import { APIEndpoints } from '@/config/apis/api-end-points';
import { ApiResult } from '../types/api-result';
import { fetchAPI } from '../fetch-api';

const { url } = APIEndpoints.board.list;

export const getBoard = async (): Promise<ApiResult<any>> => {
  if (process.env.MOCKING === 'true') {
    // MOCKING이 true일 경우 MSW에서 mock 데이터를 반환
    console.log('Using mock data for board.');
    return fetchAPI(url); // MSW가 처리하는 URL로 호출
  }

  // 실제 백엔드 호출
  return fetchAPI(url);
};
