import { HttpResponse } from 'msw';
import { makeHandler } from '../utils';
import { APIEndpoints } from '@/constants/api-end-points';
import { mockQuestions } from '../data/mock-question';

const { url, method } = APIEndpoints.question.list;
const questionsHandler = makeHandler({
  method,
  path: url,
  resolver: () => {
    return HttpResponse.json({
      questions: mockQuestions,
      total: mockQuestions.length,
    });
  },
});

export const questionHandlers = [questionsHandler];
