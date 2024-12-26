'use server';

import { fetchAPI } from '@/apis/fetch-api';
import { ApiResult } from '@/apis/types/api-result';
import { QuestionsResponse } from '@/apis/types/response/questions';
import { APIEndpoints } from '@/constants/api-end-points';
import { QuestionsPresentation } from '@/apis/presentation/questions';

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
