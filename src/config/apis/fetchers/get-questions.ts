'use server';

import { APIEndpoints } from '@/config/apis/api-end-points';
import { ApiResult } from '../types/api-result';
import { QuestionsPresentation } from '../presentation/questions';
import { QuestionsResponse } from '../types/response/questions';
import { fetchAPI } from '../fetch-api';

const { url } = APIEndpoints.question.list;

export const getQuestions = async (): Promise<
  ApiResult<QuestionsPresentation>
> => {
  const result = await fetchAPI<QuestionsResponse>(url);

  if (result.status === 'error') {
    return result as ApiResult<QuestionsPresentation>;
  }

  try {
    const presentation = QuestionsPresentation.from(result.data);
    return {
      ...result,
      data: presentation,
    };
  } catch (error) {
    console.error('변환에 실패했습니다.', error);
    return {
      status: 'error',
      data: null as unknown as QuestionsPresentation,
    };
  }
};
