import { HttpResponse } from 'msw';
import { APIEndpoints } from '@/constants/api-end-points';
import { makeHandler } from '../utils';
import { mockQuestions } from '@/mocks/data/mock-question';

// GET 요청 핸들러
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

// POST 요청 핸들러
const { url: postUrl, method: postMethod } = APIEndpoints.question.create;
const postQuestionHandler = makeHandler({
  method: postMethod,
  path: postUrl,
  resolver: (req) => {
    const newQuestion = req.body; // 요청 본문에서 새로운 질문 데이터 받기
    mockQuestions.push(newQuestion); // 새 질문 목록에 추가
    return HttpResponse.json(newQuestion, { status: 201 }); // 새로 추가된 질문 응답
  },
});

export const questionHandlers = [questionsHandler, postQuestionHandler];
